import React from 'react'
import { PhaseInfo } from '../../data/phases'
import { formatGermanDate } from '../../utils/dateUtils'

interface HeaderProps {
  phase: PhaseInfo
  weekNumber: number
}

export const Header: React.FC<HeaderProps> = ({ phase, weekNumber }) => {
  const today = new Date()
  return (
    <header className="bg-navy-700 border-b border-gray-700 px-4 py-3 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">🧠 NeuroStack</h1>
          <p className="text-xs text-gray-400">{formatGermanDate(today)}</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="px-3 py-1 rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: phase.color }}
          >
            {phase.emoji} Phase {phase.phase} • Woche {weekNumber}
          </span>
        </div>
      </div>
    </header>
  )
}
