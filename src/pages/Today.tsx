import React, { useState, useEffect } from 'react'
import { PhaseState } from '../hooks/usePhase'
import { CyclingStatus } from '../hooks/useCycling'
import { useChecklist } from '../hooks/useChecklist'
import { ProgressBar } from '../components/checklist/ProgressBar'
import { WarningBanner } from '../components/checklist/WarningBanner'
import { ChecklistSection } from '../components/checklist/ChecklistSection'
import { getTodayString } from '../utils/dateUtils'
import { MORNING_ROUTINE, EVENING_ROUTINE } from '../data/checklists'
import { db } from '../db/database'

interface TodayProps {
  phaseState: PhaseState
  cycling: CyclingStatus
}

const Today: React.FC<TodayProps> = ({ phaseState, cycling }) => {
  const date = getTodayString()
  const { checklist, toggle, loading } = useChecklist(phaseState.phase.phase, cycling, date)
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    async function calcStreak() {
      const logs = await db.dailyLogs.orderBy('date').reverse().limit(30).toArray()
      const logDates = new Set(logs.map(l => l.date))
      let count = 0
      const today = new Date()
      for (let i = 0; i < 30; i++) {
        const d = new Date(today)
        d.setDate(d.getDate() - i)
        const dateStr = d.toISOString().split('T')[0]
        if (logDates.has(dateStr)) count++
        else if (i > 0) break
      }
      setStreak(count)
    }
    calcStreak()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-gray-500">⏳ Lade...</div>
  }

  return (
    <div className="pb-4">
      {streak > 0 && (
        <div className="mx-4 mt-3 mb-1 flex items-center gap-2 bg-gradient-to-r from-amber-900/40 to-amber-950/20 border border-amber-700/30 rounded-2xl px-4 py-2.5 animate-fade-in">
          <span className="text-xl">🔥</span>
          <div>
            <span className="text-sm font-bold text-amber-300">{streak} Tage Streak</span>
            <span className="text-xs text-amber-600 ml-2">Weiter so!</span>
          </div>
        </div>
      )}
      <ProgressBar completed={checklist.completed} total={checklist.total} />
      <WarningBanner cycling={cycling} phase={phaseState.phase.phase} />

      <ChecklistSection title="Morgens" emoji="☀️" items={checklist.morgens} onToggle={toggle} />
      <ChecklistSection title="Nachmittags ~14:00" emoji="🌤️" items={checklist.nachmittags} onToggle={toggle} />
      <ChecklistSection title="Abends (1h vor Schlaf)" emoji="🌙" items={checklist.abends} onToggle={toggle} />

      <div className="px-4 mt-2 mb-4">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4" />
        <h3 className="font-bold text-gray-200 flex items-center gap-2 mb-3 text-sm uppercase tracking-wide">
          <span>📋</span> Tages-Routinen
        </h3>
        <div className="space-y-3">
          <div className="bg-navy-700/80 rounded-2xl border border-white/5 p-4">
            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
              <span>{MORNING_ROUTINE.emoji}</span>
              <span>{MORNING_ROUTINE.title}</span>
              <span className="ml-auto text-xs text-amber-400 bg-amber-900/30 px-2 py-0.5 rounded-full">☀️ Morgens</span>
            </h4>
            <div className="space-y-2">
              {MORNING_ROUTINE.items.map(item => (
                <div key={item.id} className="flex items-center gap-2.5 text-sm text-gray-300 py-1">
                  <span className="text-base">{item.emoji}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-navy-700/80 rounded-2xl border border-white/5 p-4">
            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
              <span>{EVENING_ROUTINE.emoji}</span>
              <span>{EVENING_ROUTINE.title}</span>
              <span className="ml-auto text-xs text-indigo-400 bg-indigo-900/30 px-2 py-0.5 rounded-full">🌙 Abends</span>
            </h4>
            <div className="space-y-2">
              {EVENING_ROUTINE.items.map(item => (
                <div key={item.id} className="flex items-center gap-2.5 text-sm text-gray-300 py-1">
                  <span className="text-base">{item.emoji}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Today
