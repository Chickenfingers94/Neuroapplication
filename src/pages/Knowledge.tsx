import React, { useState } from 'react'
import { SupplementCard } from '../components/knowledge/SupplementCard'
import { SUPPLEMENTS } from '../data/supplements'

type FilterCategory = 'Alle' | 'Grundversorgung' | 'Neurorestorative' | 'Nootropikum' | 'Schlaf'
type FilterPhase = 'Alle' | '1' | '2' | '3'

const Knowledge: React.FC = () => {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>('Alle')
  const [phaseFilter, setPhaseFilter] = useState<FilterPhase>('Alle')

  const filtered = SUPPLEMENTS.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.mechanism.toLowerCase().includes(search.toLowerCase()) ||
      s.effects.toLowerCase().includes(search.toLowerCase())
    const matchCat = categoryFilter === 'Alle' || s.category === categoryFilter
    const matchPhase = phaseFilter === 'Alle' || String(s.phase) === phaseFilter
    return matchSearch && matchCat && matchPhase
  })

  const categories: FilterCategory[] = ['Alle', 'Grundversorgung', 'Neurorestorative', 'Nootropikum', 'Schlaf']
  const phases: FilterPhase[] = ['Alle', '1', '2', '3']

  const categoryColors: Record<string, string> = {
    'Alle': '#4361ee',
    'Grundversorgung': '#4361ee',
    'Neurorestorative': '#10b981',
    'Nootropikum': '#f59e0b',
    'Schlaf': '#8b5cf6',
  }

  return (
    <div className="px-4 py-4 space-y-4 pb-8">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">🧠 Wissensdatenbank</h2>

      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Supplement suchen..."
          className="w-full bg-navy-700 border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {categories.map(cat => {
          const isActive = categoryFilter === cat
          const color = categoryColors[cat] ?? '#4361ee'
          return (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={
                isActive
                  ? { backgroundColor: color, color: '#fff', boxShadow: `0 0 10px ${color}60` }
                  : { backgroundColor: 'rgba(255,255,255,0.07)', color: '#9ca3af' }
              }
            >
              {cat}
            </button>
          )
        })}
      </div>

      <div className="flex gap-2">
        {phases.map(p => (
          <button
            key={p}
            onClick={() => setPhaseFilter(p)}
            className={`flex-1 py-1.5 rounded-full text-xs font-semibold transition-all ${
              phaseFilter === p ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            {p === 'Alle' ? 'Alle Phasen' : `Phase ${p}`}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-500">{filtered.length} Supplements gefunden</p>

      <div className="space-y-3">
        {filtered.map(s => (
          <SupplementCard key={s.id} supplement={s} />
        ))}
      </div>
    </div>
  )
}

export default Knowledge
