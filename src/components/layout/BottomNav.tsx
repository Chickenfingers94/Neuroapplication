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
    <nav className="fixed bottom-0 left-0 right-0 bg-navy-800 border-t border-gray-700 z-50" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex items-center justify-around h-16">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-colors ${
              active === tab.id ? 'text-blue-400' : 'text-gray-500 hover:text-gray-300'
            }`}
            style={{ minWidth: 44, minHeight: 44 }}
          >
            <span className="text-xl">{tab.emoji}</span>
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
