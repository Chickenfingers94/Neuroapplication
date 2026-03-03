import React from 'react'

interface ScoreSliderProps {
  label: string
  emoji: string
  value: number
  onChange: (v: number) => void
  color?: string
}

export const ScoreSlider: React.FC<ScoreSliderProps> = ({ label, emoji, value, onChange, color }) => {
  const getColor = (v: number) => {
    if (color) return color
    if (v >= 8) return '#10b981'
    if (v >= 5) return '#f59e0b'
    return '#ef4444'
  }
  const trackColor = getColor(value)
  const pct = ((value - 1) / 9) * 100

  return (
    <div className="bg-navy-700/80 rounded-2xl p-4 border border-white/5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{emoji}</span>
          <span className="font-semibold text-white">{label}</span>
        </div>
        <span
          className="text-2xl font-extrabold tabular-nums min-w-[2rem] text-right"
          style={{ color: trackColor }}
        >
          {value}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={1}
          max={10}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${trackColor} ${pct}%, rgba(255,255,255,0.1) ${pct}%)`,
          }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-600 mt-1.5 px-0.5">
        <span>1</span>
        <span>5</span>
        <span>10</span>
      </div>
    </div>
  )
}
