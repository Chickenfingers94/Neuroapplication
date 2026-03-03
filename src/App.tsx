import React, { useState, useEffect } from 'react'
import { BottomNav } from './components/layout/BottomNav'
import { Header } from './components/layout/Header'
import { usePhase } from './hooks/usePhase'
import { useCycling } from './hooks/useCycling'
import Today from './pages/Today'
import Tracking from './pages/Tracking'
import Cycling from './pages/Cycling'
import Knowledge from './pages/Knowledge'
import Settings from './pages/Settings'
import Calendar from './pages/Calendar'
import Todo from './pages/Todo'
import { getSetting } from './db/database'

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('today')
  const phaseState = usePhase()
  const cycling = useCycling(phaseState.startDate)
  const [strategy, setStrategy] = useState<'conservative' | 'experimental'>('conservative')

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  useEffect(() => {
    getSetting('protocolStrategy').then(v => {
      if (v === 'experimental') setStrategy('experimental')
    })
  }, [])

  if (phaseState.loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-navy-900">
        <div className="text-center animate-slideUp">
          <div className="text-6xl mb-4 animate-pulse-glow inline-block">🧠</div>
          <div className="text-2xl font-bold text-white tracking-tight">NeuroStack</div>
          <div className="text-sm text-gray-400 mt-2 font-medium">Laden...</div>
          <div className="mt-4 flex justify-center gap-1">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    )
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'today': return <Today phaseState={phaseState} cycling={cycling} strategy={strategy} />
      case 'tracking': return <Tracking />
      case 'cycling': return <Cycling cycling={cycling} phaseState={phaseState} />
      case 'knowledge': return <Knowledge />
      case 'settings': return <Settings />
      case 'calendar': return <Calendar />
      case 'todo': return <Todo />
      default: return <Today phaseState={phaseState} cycling={cycling} strategy={strategy} />
    }
  }

  return (
    <div className="min-h-screen bg-navy-800 dark">
      <Header phase={phaseState.phase} weekNumber={phaseState.weekNumber} />
      <main className="overflow-y-auto" style={{ paddingBottom: '5rem', minHeight: 'calc(100vh - 64px)' }}>
        {renderPage()}
      </main>
      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  )
}

export default App
