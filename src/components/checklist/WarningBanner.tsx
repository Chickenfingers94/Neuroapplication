import React from 'react'
import { CyclingStatus } from '../../hooks/useCycling'
import { INTERACTION_WARNINGS, SYNERGY_NOTES } from '../../data/interactions'
import { Phase } from '../../data/supplements'

interface WarningBannerProps {
  cycling: CyclingStatus
  phase: Phase
}

export const WarningBanner: React.FC<WarningBannerProps> = ({ cycling, phase }) => {
  if (phase < 2) return null

  const activeConditions: string[] = []
  if (cycling.isMethylenblauDay) activeConditions.push('methylenblau')
  if (cycling.isLSDDay) activeConditions.push('lsd')
  if (cycling.is9MeBCDay) activeConditions.push('9mebc')
  if (cycling.isTAK653Allowed) activeConditions.push('tak653')
  if (cycling.isPhenylpiracetamAllowed && phase >= 3) activeConditions.push('phenylpiracetam')

  const warnings = INTERACTION_WARNINGS.filter(w => activeConditions.includes(w.condition))
  const synergies: typeof SYNERGY_NOTES = []
  if (phase >= 2) synergies.push(SYNERGY_NOTES[0])
  if (phase >= 3 && cycling.isDihexaDay) synergies.push(SYNERGY_NOTES[1])

  if (warnings.length === 0 && synergies.length === 0) return null

  return (
    <div className="px-4 py-3 space-y-2">
      {warnings.map(w => (
        <div
          key={w.id}
          className={`flex items-start gap-2 p-3 rounded-xl text-sm font-medium ${
            w.level === 'danger' ? 'bg-red-900/50 text-red-200 border border-red-700' : 'bg-yellow-900/50 text-yellow-200 border border-yellow-700'
          }`}
        >
          <span className="text-base flex-shrink-0">{w.emoji}</span>
          <span>{w.message}</span>
        </div>
      ))}
      {synergies.map(s => (
        <div key={s.id} className="flex items-start gap-2 p-3 rounded-xl text-sm font-medium bg-green-900/50 text-green-200 border border-green-700">
          <span className="text-base flex-shrink-0">{s.emoji}</span>
          <span>{s.message}</span>
        </div>
      ))}
    </div>
  )
}
