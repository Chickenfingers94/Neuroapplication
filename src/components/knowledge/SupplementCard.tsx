import React, { useState } from 'react'
import { Supplement } from '../../data/supplements'

interface SupplementCardProps {
  supplement: Supplement
}

const CATEGORY_STYLES: Record<string, { pill: string; dot: string }> = {
  'Grundversorgung': { pill: 'bg-blue-900/50 text-blue-300 border-blue-700/40', dot: '#4361ee' },
  'Neurorestorative': { pill: 'bg-purple-900/50 text-purple-300 border-purple-700/40', dot: '#8b5cf6' },
  'Nootropikum': { pill: 'bg-amber-900/50 text-amber-300 border-amber-700/40', dot: '#f59e0b' },
  'Schlaf': { pill: 'bg-indigo-900/50 text-indigo-300 border-indigo-700/40', dot: '#6366f1' },
}

const PHASE_COLORS: Record<number, string> = {
  1: '#4361ee',
  2: '#f59e0b',
  3: '#ef4444',
}

export const SupplementCard: React.FC<SupplementCardProps> = ({ supplement }) => {
  const [expanded, setExpanded] = useState(false)
  const catStyle = CATEGORY_STYLES[supplement.category] ?? { pill: 'bg-gray-700 text-gray-300 border-gray-600', dot: '#6b7280' }
  const phaseColor = PHASE_COLORS[supplement.phase] ?? '#6b7280'

  return (
    <div className={`bg-navy-700/80 rounded-2xl border border-white/5 overflow-hidden transition-all duration-200 ${expanded ? 'shadow-lg' : ''}`}>
      <button
        className="w-full flex items-center gap-3 p-4 text-left active:bg-navy-600/60 transition-colors"
        onClick={() => setExpanded(!expanded)}
        style={{ minHeight: 68 }}
      >
        <span className="text-2xl flex-shrink-0">{supplement.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-white">{supplement.name}</div>
          <div className="text-xs text-gray-500 mt-0.5">{supplement.dose}</div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${catStyle.pill}`}>
            {supplement.category}
          </span>
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ backgroundColor: phaseColor }}
          >
            {supplement.phase}
          </span>
          <span className={`text-gray-400 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>▾</span>
        </div>
      </button>
      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-white/5 pt-3 animate-fade-in">
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Wirkungsweise</h4>
            <p className="text-sm text-gray-300 leading-relaxed">{supplement.mechanism}</p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Effekte</h4>
            <p className="text-sm text-gray-300 leading-relaxed">{supplement.effects}</p>
          </div>
          {supplement.cycling && (
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Cycling</h4>
              <p className="text-sm text-amber-300 leading-relaxed">{supplement.cycling}</p>
            </div>
          )}
          {supplement.interactions && supplement.interactions.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">⚠️ Interaktionen</h4>
              <p className="text-sm text-red-300 leading-relaxed">Nicht kombinieren mit: {supplement.interactions.join(', ')}</p>
            </div>
          )}
          <div className="flex gap-2 flex-wrap pt-1">
            <span className="text-xs bg-navy-900/60 border border-white/10 px-2.5 py-1 rounded-full text-gray-400">
              {supplement.timeOfDay.join(' + ')}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
