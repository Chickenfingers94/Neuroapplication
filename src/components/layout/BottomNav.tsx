import React from 'react'

interface Tab {
  id: string
  label: string
  emoji: string
}

const TABS: Tab[] = [
  { id: 'today', label: 'Heute', emoji: '🏠' },
  { id: 'tracking', label: 'Tracking', emoji: '📊' },
  { id: 'cycling', label: 'Cycling', emoji: '🔄' },
  { id: 'calendar', label: 'Kalender', emoji: '📅' },
  { id: 'todo', label: 'ToDo', emoji: '✅' },
  { id: 'knowledge', label: 'Wissen', emoji: '🧠' },
  { id: 'settings', label: 'Mehr', emoji: '⚙️' }
]

interface BottomNavProps {
  active: string
  onChange: (tab: string) => void
}

export const BottomNav: React.FC<BottomNavProps> = ({ active, onChange }) => {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        backgroundColor: 'rgba(26, 26, 46, 0.85)',
      }}
    >
      <div className="flex items-center justify-around h-14">
        {TABS.map(tab => {
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-0 transition-all duration-200 relative ${
                isActive ? 'text-blue-400 scale-105' : 'text-gray-500 hover:text-gray-300 active:scale-95'
              }`}
              style={{ minWidth: 40, minHeight: 48 }}
            >
              {isActive && (
                <span className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-400 rounded-full" />
              )}
              <span className="text-lg leading-none">{tab.emoji}</span>
              <span className="text-xs font-medium mt-0.5">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
