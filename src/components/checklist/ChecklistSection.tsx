import React from 'react'
import { ChecklistItem } from '../../hooks/useChecklist'

interface ChecklistSectionProps {
  title: string
  emoji: string
  items: ChecklistItem[]
  onToggle: (itemId: string) => void
}

export const ChecklistSection: React.FC<ChecklistSectionProps> = ({ title, emoji, items, onToggle }) => {
  if (items.length === 0) return null
  const done = items.filter(i => i.completed && !i.disabled).length
  const available = items.filter(i => !i.disabled).length

  return (
    <div className="mb-5 animate-fade-in">
      <div className="flex items-center gap-2 px-4 py-2">
        <span className="text-lg">{emoji}</span>
        <h3 className="font-bold text-gray-100 text-sm uppercase tracking-wide">{title}</h3>
        <span className="text-xs text-gray-500 ml-auto bg-navy-900/60 px-2 py-0.5 rounded-full">{done}/{available}</span>
      </div>
      <div className="space-y-2 px-4">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => !item.disabled && onToggle(item.id)}
            disabled={item.disabled}
            className={`w-full flex items-center gap-3 p-4 rounded-2xl border transition-all duration-200 text-left ${
              item.disabled
                ? 'bg-navy-900/40 border-white/5 opacity-40 cursor-not-allowed'
                : item.completed
                ? 'bg-gradient-to-r from-emerald-900/60 to-teal-900/40 border-emerald-700/50'
                : 'bg-navy-700/80 border-white/10 hover:border-blue-500/40 active:scale-[0.98]'
            }`}
            style={{ minHeight: 60 }}
          >
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
              item.disabled
                ? 'border-gray-700'
                : item.completed
                ? 'bg-emerald-500 border-emerald-500 scale-110'
                : 'border-gray-500'
            }`}>
              {item.completed && !item.disabled && <span className="text-white text-xs font-bold">✓</span>}
            </div>
            <span className={`text-xl flex-shrink-0 transition-transform duration-200 ${item.completed && !item.disabled ? 'scale-110' : ''}`}>
              {item.supplement.emoji}
            </span>
            <div className="flex-1 min-w-0">
              <div className={`text-sm font-semibold ${
                item.disabled ? 'text-gray-600' : item.completed ? 'text-emerald-300 line-through decoration-emerald-600' : 'text-white'
              }`}>
                {item.supplement.name}
              </div>
              <div className={`text-xs mt-0.5 ${item.disabled ? 'text-gray-700' : item.completed ? 'text-emerald-600' : 'text-gray-400'}`}>
                {item.disabled ? item.disabledReason : item.supplement.dose}
                {item.isOptional && !item.disabled && ' • Optional'}
              </div>
            </div>
            {item.supplement.isOptional && !item.disabled && (
              <span className="text-xs bg-navy-900/60 border border-white/10 px-2 py-0.5 rounded-full text-gray-400 flex-shrink-0">opt.</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
