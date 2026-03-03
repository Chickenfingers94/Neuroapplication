import React, { useState } from 'react'
import { Supplement } from '../../data/supplements'
import { SUPPLEMENTS } from '../../data/supplements'

interface SupplementCardProps {
  supplement: Supplement
}

const RISK_LABELS: Record<string, { label: string; className: string }> = {
  safe: { label: 'Sicher', className: 'bg-green-900/40 text-green-400 border border-green-700/50' },
  monitored: { label: 'Überwacht', className: 'bg-amber-900/40 text-amber-400 border border-amber-700/50' },
  experimental: { label: 'Experimentell', className: 'bg-orange-900/40 text-orange-400 border border-orange-700/50' },
  'research-only': { label: 'Forschung', className: 'bg-red-900/40 text-red-400 border border-red-700/50' }
}

export const SupplementCard: React.FC<SupplementCardProps> = ({ supplement }) => {
  const [expanded, setExpanded] = useState(false)
  const categoryColors: Record<string, string> = {
    'Grundversorgung': '#4361ee',
    'Neurorestorative': '#10b981',
    'Nootropikum': '#f59e0b',
    'Schlaf': '#8b5cf6'
  }

  const riskBadge = supplement.riskLevel ? RISK_LABELS[supplement.riskLevel] : null
  const synergySupplements = supplement.synergiesWith
    ? supplement.synergiesWith.map(id => SUPPLEMENTS.find(s => s.id === id)).filter(Boolean) as Supplement[]
    : []

  return (
    <div className="bg-navy-700 rounded-xl border border-gray-700 overflow-hidden">
      <button
        className="w-full flex items-center gap-3 p-4 text-left active:bg-navy-600 transition-colors"
        onClick={() => setExpanded(!expanded)}
        style={{ minHeight: 64 }}
      >
        <span className="text-2xl flex-shrink-0">{supplement.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-white">{supplement.name}</div>
          <div className="text-xs text-gray-400">{supplement.dose}</div>
          {supplement.timingNote && (
            <div className="text-xs text-blue-400 italic mt-0.5">{supplement.timingNote}</div>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 flex-wrap justify-end">
          {riskBadge && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${riskBadge.className}`}>
              {riskBadge.label}
            </span>
          )}
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ backgroundColor: `${categoryColors[supplement.category]}20`, color: categoryColors[supplement.category] }}
          >
            {supplement.category}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-700 text-gray-300">
            Ph.{supplement.phase}
          </span>
          <span className={`text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}>▾</span>
        </div>
      </button>
      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-gray-700 pt-3">
          {supplement.criticalNote && (
            <div className="p-3 rounded-lg bg-red-900/40 border border-red-700/60 text-sm text-red-200">
              {supplement.criticalNote}
            </div>
          )}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Wirkungsweise</h4>
            <p className="text-sm text-gray-300">{supplement.mechanism}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Effekte</h4>
            <p className="text-sm text-gray-300">{supplement.effects}</p>
          </div>
          {supplement.timingNote && (
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">⏰ Timing</h4>
              <p className="text-sm text-blue-300 italic">{supplement.timingNote}</p>
            </div>
          )}
          {supplement.cycling && (
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Cycling</h4>
              <p className="text-sm text-yellow-300">{supplement.cycling}</p>
            </div>
          )}
          {supplement.interactions && supplement.interactions.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">⚠️ Interaktionen</h4>
              <p className="text-sm text-red-300">Nicht kombinieren mit: {supplement.interactions.join(', ')}</p>
            </div>
          )}
          {synergySupplements.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">✅ Synergien</h4>
              <div className="flex flex-wrap gap-2">
                {synergySupplements.map(s => (
                  <span key={s.id} className="text-xs px-2 py-1 rounded-full bg-green-900/40 text-green-300 border border-green-700/50">
                    {s.emoji} {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-2 flex-wrap">
            <span className="text-xs bg-gray-700 px-2 py-1 rounded-full text-gray-300">
              {supplement.timeOfDay.join(' + ')}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
