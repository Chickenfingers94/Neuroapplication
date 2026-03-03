import React from 'react'
import { CyclingStatus } from '../../hooks/useCycling'
import { INTERACTION_WARNINGS, SYNERGY_NOTES } from '../../data/interactions'
import { Phase } from '../../data/supplements'

interface ConflictBannerProps {
  cycling: CyclingStatus
  phase: Phase
}

export const ConflictBanner: React.FC<ConflictBannerProps> = ({ cycling, phase }) => {
  if (phase < 2) return null

  const activeConditions: string[] = []
  if (cycling.isMethylenblauDay) activeConditions.push('methylenblau')
  if (cycling.isLSDDay) activeConditions.push('lsd')
  if (cycling.is9MeBCDay) activeConditions.push('9mebc')
  if (cycling.isTAK653Allowed) activeConditions.push('tak653')
  if (cycling.isPhenylpiracetamAllowed && phase >= 3) activeConditions.push('phenylpiracetam')
  if (cycling.isDihexaDay && phase >= 3) activeConditions.push('dihexa')
  // Always show caution notes for supplements that may be taken
  if (phase >= 1) activeConditions.push('zink', '5htp', 'bromantane')

  const dangers = INTERACTION_WARNINGS.filter(w => w.level === 'danger' && activeConditions.includes(w.condition))
  const cautions = INTERACTION_WARNINGS.filter(w => w.level === 'caution' && activeConditions.includes(w.condition))

  // 9-Me-BC UV/Winter specific warning
  const show9MeBCWarning = cycling.is9MeBCDay

  const activeSynergies = SYNERGY_NOTES.filter(s => {
    if (s.id === 'lm-dihexa') return cycling.isDihexaDay && phase >= 3
    if (s.id === 'creat-cdp') return phase >= 2
    if (s.id === 'ltyrosin-bromantane') return cycling.isBromantaneDay && phase >= 2
    if (s.id === 'ltyrosin-p5p') return phase >= 1
    if (s.id === 'nac-taurin') return phase >= 1
    if (s.id === 'omega3-ps') return phase >= 1
    return phase >= 1
  })

  if (dangers.length === 0 && cautions.length === 0 && !show9MeBCWarning && activeSynergies.length === 0) return null

  return (
    <div className="px-4 py-2 space-y-2">
      {/* Absolute contraindications */}
      {dangers.map(w => (
        <div
          key={w.id}
          className="flex items-start gap-2 p-3 rounded-xl text-sm font-medium bg-red-900/50 text-red-200 border border-red-700 animate-pulse-border"
        >
          <span className="text-base flex-shrink-0">{w.emoji}</span>
          <span>{w.message}</span>
        </div>
      ))}

      {/* 9-Me-BC UV winter warning */}
      {show9MeBCWarning && (
        <div className="flex items-start gap-2 p-3 rounded-xl text-sm font-medium bg-orange-900/50 text-orange-200 border border-orange-700/60">
          <span className="text-base flex-shrink-0">☀️</span>
          <span>
            <strong>9-Me-BC Tag:</strong> UV-Licht strikt meiden! Sonnencreme + bedeckte Haut empfohlen.
            Tipp: Wintermonate bevorzugt für 9-Me-BC Zyklen.
          </span>
        </div>
      )}

      {/* Caution notes */}
      {cautions.map(w => (
        <div
          key={w.id}
          className="flex items-start gap-2 p-3 rounded-xl text-sm font-medium bg-yellow-900/40 text-yellow-200 border border-yellow-700/60"
        >
          <span className="text-base flex-shrink-0">{w.emoji}</span>
          <span>{w.message}</span>
        </div>
      ))}

      {/* Synergy notes */}
      {activeSynergies.map(s => (
        <div key={s.id} className="flex items-start gap-2 p-3 rounded-xl text-sm font-medium bg-gradient-to-r from-green-900/40 to-navy-700 text-green-200 border border-green-700/50">
          <span className="text-base flex-shrink-0">{s.emoji}</span>
          <span>{s.message}</span>
        </div>
      ))}
    </div>
  )
}
