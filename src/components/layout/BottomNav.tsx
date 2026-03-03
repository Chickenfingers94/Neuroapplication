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
  { id: 'knowledge', label: 'Wissen', emoji: '🧠' },
  { id: 'settings', label: 'Einstellungen', emoji: '⚙️' }
]

interface BottomNavProps {
  active: string
  onChange: (tab: string) => void
}

export const BottomNav: React.FC<BottomNavProps> = ({ active, onChange }) => {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center justify-around h-16">
        {TABS.map(tab => {
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-all duration-200 relative ${
                isActive ? 'text-blue-400' : 'text-gray-500 hover:text-gray-300'
              }`}
              style={{ minWidth: 48 }}
            >
              {isActive && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-8 rounded-full bg-blue-400 animate-scale-in"
                  style={{ boxShadow: '0 0 8px rgba(96,165,250,0.8)' }}
                />
              )}
              <span className={`text-xl transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>{tab.emoji}</span>
              <span className={`text-xs font-medium transition-colors duration-200 ${isActive ? 'text-blue-400 font-semibold' : ''}`}>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
