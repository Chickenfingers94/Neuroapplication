import React from 'react'
import { CyclingStatus } from '../../hooks/useCycling'
import { Phase } from '../../data/supplements'

interface CyclingCalendarProps {
  cycling: CyclingStatus
  phase: Phase
}

interface SubstanceRow {
  id: string
  name: string
  emoji: string
  status: 'on' | 'off' | 'pause' | 'not_started' | 'not_available'
  info: string
  color: string
  minPhase: Phase
}

export const CyclingCalendar: React.FC<CyclingCalendarProps> = ({ cycling, phase }) => {
  const substances: SubstanceRow[] = [
    { id: 'methylenblau', name: 'Methylenblau', emoji: '🔵', status: cycling.isMethylenblauDay ? 'on' : 'off', info: cycling.methylenblau.cycleInfo, color: '#4361ee', minPhase: 2 },
    { id: 'bromantane', name: 'Bromantane', emoji: '🔶', status: cycling.bromantane.status, info: cycling.bromantane.cycleInfo, color: '#f59e0b', minPhase: 2 },
    { id: '9mebc', name: '9-Me-BC', emoji: '🌱', status: cycling['9mebc'].status, info: cycling['9mebc'].cycleInfo, color: '#10b981', minPhase: 3 },
    { id: 'dihexa', name: 'Dihexa', emoji: '💎', status: cycling.dihexa.status, info: cycling.dihexa.cycleInfo, color: '#ef4444', minPhase: 3 },
    { id: 'lsd', name: 'LSD Mikrodosis', emoji: '🌈', status: cycling.lsd.status, info: cycling.lsd.cycleInfo, color: '#8b5cf6', minPhase: 3 },
    { id: 'phenylpiracetam', name: 'Phenylpiracetam', emoji: '🚀', status: cycling.isPhenylpiracetamAllowed ? 'on' : 'off', info: cycling.isPhenylpiracetamAllowed ? 'Einnahmetag' : 'Kein Einnahmetag', color: '#ef4444', minPhase: 3 },
    { id: 'tak653', name: 'TAK-653', emoji: '⚗️', status: cycling.isTAK653Allowed ? 'on' : 'off', info: cycling.isTAK653Allowed ? 'Einnahmetag' : 'Kein Einnahmetag', color: '#ef4444', minPhase: 3 },
  ]

  const statusConfig = {
    on: { label: 'AKTIV', bg: 'from-emerald-900/60 to-teal-950/40', text: 'text-emerald-300', border: 'border-emerald-700/50', badge: 'bg-emerald-900/80 text-emerald-300 border-emerald-700/50', dot: '#10b981' },
    off: { label: 'AUS', bg: 'from-navy-900/60 to-navy-950/40', text: 'text-gray-500', border: 'border-white/5', badge: 'bg-navy-900/60 text-gray-500 border-white/10', dot: '#374151' },
    pause: { label: 'PAUSE', bg: 'from-amber-900/60 to-amber-950/40', text: 'text-amber-300', border: 'border-amber-700/50', badge: 'bg-amber-900/80 text-amber-300 border-amber-700/50', dot: '#f59e0b' },
    not_started: { label: 'N/A', bg: 'from-navy-900/40 to-navy-950/20', text: 'text-gray-600', border: 'border-white/5', badge: 'bg-navy-900/40 text-gray-600 border-white/5', dot: '#1f2937' },
    not_available: { label: 'N/A', bg: 'from-navy-900/40 to-navy-950/20', text: 'text-gray-600', border: 'border-white/5', badge: 'bg-navy-900/40 text-gray-600 border-white/5', dot: '#1f2937' },
  }

  return (
    <div className="space-y-3">
      {substances.map(sub => {
        if (sub.minPhase > phase) {
          return (
            <div key={sub.id} className="bg-navy-900/30 rounded-2xl border border-white/5 p-4 opacity-40">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{sub.emoji}</span>
                <div>
                  <div className="font-medium text-gray-500">{sub.name}</div>
                  <div className="text-xs text-gray-700">Verfügbar ab Phase {sub.minPhase}</div>
                </div>
                <span
                  className="ml-auto text-xs px-2.5 py-1 rounded-full font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: sub.color + '40', color: sub.color }}
                >
                  Phase {sub.minPhase}
                </span>
              </div>
            </div>
          )
        }

        const cfg = statusConfig[sub.status]
        return (
          <div
            key={sub.id}
            className={`rounded-2xl border p-4 bg-gradient-to-r ${cfg.bg} ${cfg.border} transition-all duration-200`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{sub.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white">{sub.name}</div>
                <div className={`text-xs mt-0.5 ${cfg.text}`}>{sub.info}</div>
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold flex-shrink-0 ${cfg.badge}`}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.dot }} />
                {cfg.label}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
