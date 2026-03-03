import React from 'react'
import { PhaseInfo } from '../../data/phases'
import { formatGermanDate } from '../../utils/dateUtils'

interface HeaderProps {
  phase: PhaseInfo
  weekNumber: number
}

const PHASE_GRADIENTS: Record<number, string> = {
  1: 'from-blue-900/80 to-navy-700',
  2: 'from-amber-900/60 to-navy-700',
  3: 'from-red-900/60 to-navy-700',
}

export const Header: React.FC<HeaderProps> = ({ phase, weekNumber }) => {
  const today = new Date()
  const gradient = PHASE_GRADIENTS[phase.phase] ?? 'from-navy-700 to-navy-700'
  return (
    <header className={`bg-gradient-to-r ${gradient} border-b border-white/10 px-4 py-3 sticky top-0 z-40`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white tracking-tight">🧠 NeuroStack</h1>
          <p className="text-xs text-gray-400 font-medium">{formatGermanDate(today)}</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
            style={{ backgroundColor: phase.color, boxShadow: `0 0 12px ${phase.color}60` }}
          >
            {phase.emoji} Phase {phase.phase} • Woche {weekNumber}
          </span>
        </div>
      </div>
    </header>
  )
}
