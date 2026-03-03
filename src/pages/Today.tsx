import React from 'react'
import { PhaseState } from '../hooks/usePhase'
import { CyclingStatus } from '../hooks/useCycling'
import { useChecklist } from '../hooks/useChecklist'
import { ProgressBar } from '../components/checklist/ProgressBar'
import { WarningBanner } from '../components/checklist/WarningBanner'
import { ChecklistSection } from '../components/checklist/ChecklistSection'
import { getTodayString } from '../utils/dateUtils'
import { MORNING_ROUTINE, EVENING_ROUTINE } from '../data/checklists'

interface TodayProps {
  phaseState: PhaseState
  cycling: CyclingStatus
}

const Today: React.FC<TodayProps> = ({ phaseState, cycling }) => {
  const date = getTodayString()
  const { checklist, toggle, loading } = useChecklist(phaseState.phase.phase, cycling, date)

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-gray-500">⏳ Lade...</div>
  }

  return (
    <div className="pb-4">
      <ProgressBar completed={checklist.completed} total={checklist.total} phaseColor={phaseState.phase.color} />
      <WarningBanner cycling={cycling} phase={phaseState.phase.phase} />

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
