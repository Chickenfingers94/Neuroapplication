import React from 'react'
import { PhaseInfo } from '../../data/phases'
import { formatGermanDate } from '../../utils/dateUtils'

interface HeaderProps {
  phase: PhaseInfo
  weekNumber: number
}

export const Header: React.FC<HeaderProps> = ({ phase, weekNumber }) => {
  const today = new Date()
  const phaseColorMap: Record<number, { bg: string; glow: string; accent: string }> = {
    1: { bg: 'from-blue-900/60 to-navy-800', glow: 'rgba(67,97,238,0.5)', accent: '#4361ee' },
    2: { bg: 'from-amber-900/60 to-navy-800', glow: 'rgba(245,158,11,0.5)', accent: '#f59e0b' },
    3: { bg: 'from-red-900/60 to-navy-800', glow: 'rgba(239,68,68,0.5)', accent: '#ef4444' },
  }
  const pc = phaseColorMap[phase.phase] ?? phaseColorMap[1]

  return (
    <header className={`bg-gradient-to-r ${pc.bg} border-b border-white/5 px-4 py-3 sticky top-0 z-40 backdrop-blur-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-extrabold text-white tracking-tight">🧠 NeuroStack</h1>
          <p className="text-xs text-gray-400 mt-0.5">{formatGermanDate(today)}</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg animate-fade-in"
            style={{ backgroundColor: pc.accent, boxShadow: `0 0 12px ${pc.glow}` }}
          >
            {phase.emoji} Phase {phase.phase} · Woche {weekNumber}
          </span>
        </div>
      </div>
      {/* Phase accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-500"
        style={{ background: `linear-gradient(to right, ${pc.accent}00, ${pc.accent}, ${pc.accent}00)` }}
      />
    </header>
  )
}
