import React from 'react'
import { HabitWithStatus } from '../../hooks/useHabits'

interface HabitGridProps {
  habits: HabitWithStatus[]
  onToggle: (id: string) => void
}

export const HabitGrid: React.FC<HabitGridProps> = ({ habits, onToggle }) => {
  const scheduled = habits.filter(h => h.isScheduledToday)
  const completed = scheduled.filter(h => h.isCompletedToday).length

  if (scheduled.length === 0) return null

  return (
    <div className="px-4 mt-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">✅</span>
        <h3 className="font-semibold text-gray-100 text-base">Gewohnheiten</h3>
        <span className="text-xs text-gray-500 ml-auto font-medium">{completed}/{scheduled.length}</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {scheduled.map(habit => (
          <button
            key={habit.id}
            onClick={() => onToggle(habit.id)}
            className={`flex items-center gap-2 p-3 rounded-xl border transition-all text-left active:scale-95 ${
              habit.isCompletedToday
                ? 'bg-gradient-to-r from-green-900/50 to-navy-700 border-green-700/60'
                : 'bg-navy-700 border-gray-700/60 hover:border-gray-500'
            }`}
          >
            <span className="text-xl flex-shrink-0">{habit.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className={`text-xs font-medium truncate ${habit.isCompletedToday ? 'text-green-300 line-through' : 'text-white'}`}>
                {habit.name}
              </div>
              {habit.targetValue && habit.unit && (
                <div className="text-xs text-gray-500">{habit.targetValue} {habit.unit}</div>
              )}
            </div>
            {habit.streakEnabled && habit.currentStreak > 0 && (
              <span className="text-xs text-amber-400 flex-shrink-0">🔥{habit.currentStreak}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
