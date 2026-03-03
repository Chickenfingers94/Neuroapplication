import React from 'react'
import { ChecklistItem } from '../../hooks/useChecklist'

interface ChecklistSectionProps {
  title: string
  emoji: string
  items: ChecklistItem[]
  onToggle: (itemId: string) => void
}

export const ChecklistSection: React.FC<ChecklistSectionProps> = ({ title, emoji, items, onToggle }) => {
  if (items.length === 0) return null
  const done = items.filter(i => i.completed && !i.disabled).length
  const available = items.filter(i => !i.disabled).length

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 px-4 py-2 border-l-2 border-blue-500/50 ml-4 mr-4 rounded-sm">
        <span className="text-lg">{emoji}</span>
        <h3 className="font-semibold text-gray-100 text-base">{title}</h3>
        <span className="text-xs text-gray-500 ml-auto font-medium">{done}/{available}</span>
      </div>
      <div className="space-y-2 px-4">
        {items.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => !item.disabled && onToggle(item.id)}
            disabled={item.disabled}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left animate-fadeIn ${
              item.disabled
                ? 'bg-gray-800/50 border-gray-700 opacity-50 cursor-not-allowed'
                : item.completed
                ? 'bg-gradient-to-r from-green-900/50 to-navy-700 border-green-700/60'
                : 'bg-navy-700 border-gray-700/60 hover:border-gray-500 active:scale-95'
            }`}
            style={{ minHeight: 56, animationDelay: `${idx * 40}ms` }}
          >
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
              item.disabled ? 'border-gray-600' : item.completed ? 'bg-green-500 border-green-500 shadow-lg shadow-green-500/40' : 'border-gray-500'
            }`}>
              {item.completed && !item.disabled && (
                <span className="text-white text-xs animate-scale-in">✓</span>
              )}
            </div>
            <span className="text-lg flex-shrink-0">{item.supplement.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className={`text-sm font-medium ${item.disabled ? 'text-gray-500' : item.completed ? 'text-green-300 line-through' : 'text-white'}`}>
                {item.supplement.name}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {item.disabled ? item.disabledReason : item.supplement.dose}
                {item.isOptional && !item.disabled && ' • Optional'}
              </div>
            </div>
            {item.supplement.isOptional && !item.disabled && (
              <span className="text-xs bg-gray-700 px-2 py-0.5 rounded-full text-gray-400 flex-shrink-0">opt.</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
