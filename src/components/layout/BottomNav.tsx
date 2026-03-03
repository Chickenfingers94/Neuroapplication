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
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        backgroundColor: 'rgba(26, 26, 46, 0.85)',
      }}
    >
      <div className="flex items-center justify-around h-16">
        {TABS.map(tab => {
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-all duration-200 relative ${
                isActive ? 'text-blue-400 scale-105' : 'text-gray-500 hover:text-gray-300 active:scale-95'
              }`}
              style={{ minWidth: 48, minHeight: 48 }}
            >
              {isActive && (
                <span className="absolute top-1.5 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-blue-400 rounded-full" />
              )}
              <span className="text-xl">{tab.emoji}</span>
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
