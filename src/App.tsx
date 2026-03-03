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

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('today')
  const phaseState = usePhase()
  const cycling = useCycling(phaseState.startDate)

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  if (phaseState.loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-navy-800">
        <div className="text-center">
          <div className="text-5xl mb-4">🧠</div>
          <div className="text-white font-bold text-xl">NeuroStack</div>
          <div className="text-gray-400 text-sm mt-2">Laden...</div>
        </div>
      </div>
    )
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'today': return <Today phaseState={phaseState} cycling={cycling} />
      case 'tracking': return <Tracking />
      case 'cycling': return <Cycling cycling={cycling} phaseState={phaseState} />
      case 'knowledge': return <Knowledge />
      case 'settings': return <Settings />
      default: return <Today phaseState={phaseState} cycling={cycling} />
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
