import React, { useState, useEffect } from 'react'
import { PhaseState } from '../hooks/usePhase'
import { CyclingStatus } from '../hooks/useCycling'
import { useChecklist } from '../hooks/useChecklist'
import { ProgressBar } from '../components/checklist/ProgressBar'
import { WarningBanner } from '../components/checklist/WarningBanner'
import { ConflictBanner } from '../components/checklist/ConflictBanner'
import { ChecklistSection } from '../components/checklist/ChecklistSection'
import { getTodayString } from '../utils/dateUtils'
import { MORNING_ROUTINE, EVENING_ROUTINE } from '../data/checklists'
import { db } from '../db/database'

function formatLocalDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

interface TodayProps {
  phaseState: PhaseState
  cycling: CyclingStatus
  strategy: 'conservative' | 'experimental'
}

const Today: React.FC<TodayProps> = ({ phaseState, cycling, strategy }) => {
  const date = getTodayString()
  const { checklist, toggle, loading } = useChecklist(phaseState.phase.phase, cycling, date, strategy)
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
        const dateStr = formatLocalDate(d)
        if (logDates.has(dateStr)) count++
        else break
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
      {strategy === 'experimental' && (
        <div className="mx-4 mt-2 flex items-center gap-2 bg-orange-900/30 border border-orange-700/40 rounded-xl px-3 py-2 text-xs text-orange-300">
          <span>⚗️</span>
          <span>Experimenteller Modus aktiv – Dihexa inklusive. Strenge Selbstbeobachtung erforderlich.</span>
        </div>
      )}
      <ProgressBar completed={checklist.completed} total={checklist.total} phaseColor={phaseState.phase.color} />
      <WarningBanner cycling={cycling} phase={phaseState.phase.phase} />
      <ConflictBanner cycling={cycling} phase={phaseState.phase.phase} />

      <ChecklistSection title="Morgens" emoji="☀️" items={checklist.morgens} onToggle={toggle} />
      <ChecklistSection title="Nachmittags ~14:00" emoji="🌤️" items={checklist.nachmittags} onToggle={toggle} />
      <ChecklistSection title="Abends (1h vor Schlaf)" emoji="🌙" items={checklist.abends} onToggle={toggle} />

      <div className="px-4 mt-4 space-y-3">
        <h3 className="font-semibold text-gray-300 flex items-center gap-2">
          <span>📋</span> Tages-Routinen
        </h3>
        <div className="bg-navy-700 rounded-xl border border-gray-700 p-4">
          <h4 className="font-medium text-white mb-3 flex items-center gap-2">
            <span>{MORNING_ROUTINE.emoji}</span> {MORNING_ROUTINE.title}
          </h4>
          <div className="space-y-2">
            {MORNING_ROUTINE.items.map(item => (
              <div key={item.id} className="flex items-center gap-2 text-sm text-gray-300">
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-navy-700 rounded-xl border border-gray-700 p-4">
          <h4 className="font-medium text-white mb-3 flex items-center gap-2">
            <span>{EVENING_ROUTINE.emoji}</span> {EVENING_ROUTINE.title}
          </h4>
          <div className="space-y-2">
            {EVENING_ROUTINE.items.map(item => (
              <div key={item.id} className="flex items-center gap-2 text-sm text-gray-300">
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Today
