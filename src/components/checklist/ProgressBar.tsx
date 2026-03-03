import React from 'react'

interface ProgressBarProps {
  completed: number
  total: number
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ completed, total }) => {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  const gradientColor = pct === 100 ? 'from-emerald-500 to-teal-400' : 'from-blue-600 to-indigo-400'
  const glowColor = pct === 100 ? 'rgba(16,185,129,0.4)' : 'rgba(67,97,238,0.4)'

  return (
    <div className="px-4 py-4 bg-gradient-to-b from-navy-700/80 to-navy-800/60 border-b border-white/5 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-300">Tagesfortschritt</span>
        <span className="text-sm font-bold text-white">{completed}/{total} · <span className="text-blue-400">{pct}%</span></span>
      </div>
      <div className="w-full bg-navy-900/80 rounded-full h-3 overflow-hidden relative">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradientColor} transition-all duration-700 ease-out`}
          style={{ width: `${pct}%`, boxShadow: `0 0 10px ${glowColor}` }}
        />
      </div>
      {pct === 100 && (
        <p className="text-center text-xs text-emerald-400 mt-2 font-semibold animate-fade-in">
          🎉 Alle Supplements eingenommen!
        </p>
      )}
    </div>
  )
}
