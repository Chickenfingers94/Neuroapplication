import React, { useState } from 'react'
import { SupplementCard } from '../components/knowledge/SupplementCard'
import { SUPPLEMENTS } from '../data/supplements'

type FilterCategory = 'Alle' | 'Grundversorgung' | 'Neurorestorative' | 'Nootropikum' | 'Schlaf'
type FilterPhase = 'Alle' | '1' | '2' | '3'

const categoryStyles: Record<string, { active: string; dot: string }> = {
  'Alle': { active: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white', dot: '#4361ee' },
  'Grundversorgung': { active: 'bg-gradient-to-r from-blue-700 to-blue-600 text-white', dot: '#4361ee' },
  'Neurorestorative': { active: 'bg-gradient-to-r from-purple-700 to-purple-600 text-white', dot: '#8b5cf6' },
  'Nootropikum': { active: 'bg-gradient-to-r from-amber-700 to-amber-600 text-white', dot: '#f59e0b' },
  'Schlaf': { active: 'bg-gradient-to-r from-indigo-700 to-indigo-600 text-white', dot: '#6366f1' },
}

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

  return (
    <div className="px-4 py-4 space-y-4 pb-8">
      <h2 className="text-xl font-extrabold text-white flex items-center gap-2">🧠 Wissensdatenbank</h2>

      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">🔍</span>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Supplement suchen..."
          className="w-full bg-navy-700/80 border border-white/10 rounded-2xl pl-10 pr-4 py-3.5 text-white placeholder-gray-600 text-sm focus:border-blue-500/60 focus:outline-none transition-colors"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {categories.map(cat => {
          const style = categoryStyles[cat] ?? categoryStyles['Alle']
          const isActive = categoryFilter === cat
          return (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                isActive ? style.active : 'bg-navy-700/60 text-gray-400 hover:bg-navy-600/60 border border-white/5'
              }`}
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
            className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
              phaseFilter === p
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                : 'bg-navy-700/60 text-gray-400 hover:bg-navy-600/60 border border-white/5'
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
