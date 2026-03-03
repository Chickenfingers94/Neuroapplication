import React from 'react'

interface ProgressBarProps {
  completed: number
  total: number
  phaseColor?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ completed, total, phaseColor = '#4361ee' }) => {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  const isDone = pct === 100
  const fillColor = isDone ? '#10b981' : phaseColor
  const glowColor = isDone ? 'rgba(16,185,129,0.4)' : `${phaseColor}66`

  return (
    <div className="px-4 py-3 bg-navy-700 border-b border-white/5">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-semibold text-gray-300">Tagesfortschritt</span>
        <span className="text-sm font-bold text-white">{completed}/{total} eingenommen</span>
      </div>
      <div className="relative w-full bg-gray-700/60 rounded-full h-3 overflow-hidden">
        <div
          className="h-3 rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${fillColor}cc, ${fillColor})`,
            boxShadow: pct > 0 ? `0 0 10px ${glowColor}` : 'none',
          }}
        />
        {pct > 0 && pct < 100 && (
          <span className="absolute right-2 top-0 h-full flex items-center text-[10px] font-bold text-white/80">
            {pct}%
          </span>
        )}
      </div>
      {isDone && (
        <p className="text-center text-xs text-green-400 mt-1.5 font-semibold animate-fadeIn">
          🎉 Alle Supplements eingenommen!
        </p>
      )}
    </div>
  )
}
