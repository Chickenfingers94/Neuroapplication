import React from 'react'

interface ProgressBarProps {
  completed: number
  total: number
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ completed, total }) => {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  return (
    <div className="px-4 py-3 bg-navy-700 border-b border-gray-700">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-gray-300">Tagesfortschritt</span>
        <span className="text-sm font-bold text-white">{completed}/{total} eingenommen</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div
          className="h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: pct === 100 ? '#10b981' : '#4361ee' }}
        />
      </div>
      {pct === 100 && (
        <p className="text-center text-xs text-green-400 mt-1.5 font-medium">🎉 Alle Supplements eingenommen!</p>
      )}
    </div>
  )
}
