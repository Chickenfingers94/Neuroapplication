import React from 'react'

interface ScoreSliderProps {
  label: string
  emoji: string
  value: number
  onChange: (v: number) => void
}

export const ScoreSlider: React.FC<ScoreSliderProps> = ({ label, emoji, value, onChange }) => {
  const getColor = (v: number) => {
    if (v >= 8) return '#10b981'
    if (v >= 5) return '#f59e0b'
    return '#ef4444'
  }
  return (
    <div className="bg-navy-700 rounded-xl p-4 border border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{emoji}</span>
          <span className="font-medium text-white">{label}</span>
        </div>
        <span className="text-2xl font-bold" style={{ color: getColor(value) }}>{value}</span>
      </div>
      <input
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer"
        style={{ accentColor: getColor(value) }}
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>1</span>
        <span>5</span>
        <span>10</span>
      </div>
    </div>
  )
}
