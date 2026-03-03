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
          className={`flex items-start gap-3 p-4 rounded-2xl text-sm font-medium animate-attention ${
            w.level === 'danger'
              ? 'bg-gradient-to-r from-red-900/70 to-red-950/50 text-red-200 border border-red-700/60'
              : 'bg-gradient-to-r from-amber-900/70 to-amber-950/50 text-amber-200 border border-amber-700/60'
          }`}
          style={{ boxShadow: w.level === 'danger' ? '0 0 16px rgba(239,68,68,0.15)' : '0 0 16px rgba(245,158,11,0.15)' }}
        >
          <span className="text-xl flex-shrink-0">{w.emoji}</span>
          <span className="leading-relaxed">{w.message}</span>
        </div>
      ))}
      {synergies.map(s => (
        <div
          key={s.id}
          className="flex items-start gap-3 p-4 rounded-2xl text-sm font-medium bg-gradient-to-r from-emerald-900/70 to-teal-950/50 text-emerald-200 border border-emerald-700/60"
          style={{ boxShadow: '0 0 16px rgba(16,185,129,0.15)' }}
        >
          <span className="text-xl flex-shrink-0">{s.emoji}</span>
          <span className="leading-relaxed">{s.message}</span>
        </div>
      ))}
    </div>
  )
}
