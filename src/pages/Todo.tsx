import React, { useState, useEffect } from 'react'
import { TodoItem, getAllTodos, addTodo, updateTodo, deleteTodo } from '../db/database'
import { parseDateString } from '../utils/dateUtils'

const PRIORITY_COLORS: Record<string, string> = {
  low: 'text-gray-400 border-gray-600',
  medium: 'text-yellow-400 border-yellow-700',
  high: 'text-red-400 border-red-700'
}

const PRIORITY_LABELS: Record<string, string> = {
  low: 'Niedrig',
  medium: 'Mittel',
  high: 'Hoch'
}

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [newTitle, setNewTitle] = useState('')
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [newDueDate, setNewDueDate] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState<'all' | 'open' | 'done'>('open')

  const loadTodos = async () => {
    const items = await getAllTodos()
    setTodos(items)
  }

  useEffect(() => { loadTodos() }, [])

  const handleAdd = async () => {
    if (!newTitle.trim()) return
    await addTodo({
      title: newTitle.trim(),
      completed: false,
      priority: newPriority,
      dueDate: newDueDate || undefined,
      tags: [],
      createdAt: Date.now()
    })
    setNewTitle('')
    setNewDueDate('')
    setNewPriority('medium')
    setShowForm(false)
    loadTodos()
  }

  const handleToggle = async (todo: TodoItem) => {
    if (!todo.id) return
    await updateTodo(todo.id, {
      completed: !todo.completed,
      completedAt: !todo.completed ? Date.now() : undefined
    })
    loadTodos()
  }

  const handleDelete = async (id: number) => {
    await deleteTodo(id)
    loadTodos()
  }

  const filtered = todos.filter(t => {
    if (filter === 'open') return !t.completed
    if (filter === 'done') return t.completed
    return true
  })

  const openCount = todos.filter(t => !t.completed).length
  const doneCount = todos.filter(t => t.completed).length

  return (
    <div className="px-4 py-4 space-y-4 pb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">✅ ToDo-Liste</h2>
        <button
          onClick={() => setShowForm(v => !v)}
          className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4 py-2 text-sm font-semibold transition-all active:scale-95"
        >
          {showForm ? '✕ Abbrechen' : '+ Neu'}
        </button>
      </div>

      {/* Stats */}
      <div className="flex gap-3">
        <div className="flex-1 bg-navy-700 rounded-lg border border-gray-700 p-3 text-center">
          <div className="text-lg font-bold text-blue-400">{openCount}</div>
          <div className="text-xs text-gray-500">Offen</div>
        </div>
        <div className="flex-1 bg-navy-700 rounded-lg border border-gray-700 p-3 text-center">
          <div className="text-lg font-bold text-green-400">{doneCount}</div>
          <div className="text-xs text-gray-500">Erledigt</div>
        </div>
      </div>

      {/* New todo form */}
      {showForm && (
        <div className="bg-navy-700 rounded-xl border border-gray-700 p-4 space-y-3 animate-fadeIn">
          <h3 className="font-semibold text-white">Neue Aufgabe</h3>
          <input
            type="text"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="Aufgabe eingeben..."
            className="w-full bg-navy-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
          />
          <div className="flex gap-2">
            <select
              value={newPriority}
              onChange={e => setNewPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="flex-1 bg-navy-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="low">🟢 Niedrig</option>
              <option value="medium">🟡 Mittel</option>
              <option value="high">🔴 Hoch</option>
            </select>
            <input
              type="date"
              value={newDueDate}
              onChange={e => setNewDueDate(e.target.value)}
              className="flex-1 bg-navy-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button
            onClick={handleAdd}
            disabled={!newTitle.trim()}
            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ➕ Aufgabe hinzufügen
          </button>
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(['open', 'done', 'all'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === f ? 'bg-blue-600 text-white' : 'bg-navy-700 text-gray-400 border border-gray-700 hover:text-gray-300'
            }`}
          >
            {f === 'open' ? 'Offen' : f === 'done' ? 'Erledigt' : 'Alle'}
          </button>
        ))}
      </div>

      {/* Todo list */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            {filter === 'open' ? '🎉 Alle Aufgaben erledigt!' : 'Keine Aufgaben gefunden.'}
          </div>
        )}
        {filtered.map(todo => (
          <div
            key={todo.id}
            className={`bg-navy-700 rounded-xl border p-3 flex items-start gap-3 transition-all ${
              todo.completed ? 'border-gray-700/50 opacity-60' : `border-gray-700 ${PRIORITY_COLORS[todo.priority]}`
            }`}
          >
            <button
              onClick={() => handleToggle(todo)}
              className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                todo.completed ? 'bg-green-600 border-green-600' : 'border-gray-500 hover:border-blue-400'
              }`}
            >
              {todo.completed && <span className="text-white text-xs">✓</span>}
            </button>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                {todo.title}
              </p>
              <div className="flex gap-2 mt-1 flex-wrap">
                <span className={`text-xs px-1.5 py-0.5 rounded border ${PRIORITY_COLORS[todo.priority]} bg-navy-800`}>
                  {PRIORITY_LABELS[todo.priority]}
                </span>
                {todo.dueDate && (
                  <span className="text-xs text-gray-500">
                    📅 {parseDateString(todo.dueDate).toLocaleDateString('de-DE', { day: 'numeric', month: 'short' })}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => todo.id && handleDelete(todo.id)}
              className="text-gray-600 hover:text-red-400 transition-colors p-1 text-xs"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Todo
