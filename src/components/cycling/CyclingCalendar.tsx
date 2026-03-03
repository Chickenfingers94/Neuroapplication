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
    on: { label: 'AKTIV', bg: 'bg-green-900/50', text: 'text-green-300', border: 'border-green-700', dot: '#10b981' },
    off: { label: 'AUS', bg: 'bg-gray-800/50', text: 'text-gray-400', border: 'border-gray-700', dot: '#6b7280' },
    pause: { label: 'PAUSE', bg: 'bg-yellow-900/50', text: 'text-yellow-300', border: 'border-yellow-700', dot: '#f59e0b' },
    not_started: { label: 'N/A', bg: 'bg-gray-800/50', text: 'text-gray-500', border: 'border-gray-800', dot: '#374151' },
    not_available: { label: 'N/A', bg: 'bg-gray-800/50', text: 'text-gray-500', border: 'border-gray-800', dot: '#374151' }
  }

  return (
    <div className="space-y-3">
      {substances.map(sub => {
        if (sub.minPhase > phase) {
          return (
            <div key={sub.id} className="bg-gray-800/30 rounded-xl border border-gray-800 p-4 opacity-50">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{sub.emoji}</span>
                <div>
                  <div className="font-medium text-gray-500">{sub.name}</div>
                  <div className="text-xs text-gray-600">Verfügbar ab Phase {sub.minPhase}</div>
                </div>
                <span className="ml-auto text-xs bg-gray-700 px-2 py-1 rounded-full text-gray-500">Phase {sub.minPhase}</span>
              </div>
            </div>
          )
        }

        const cfg = statusConfig[sub.status]
        return (
          <div
            key={sub.id}
            className={`rounded-xl border p-4 ${cfg.bg} ${cfg.border} overflow-hidden relative`}
            style={{ borderLeft: `3px solid ${cfg.dot}` }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{sub.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white">{sub.name}</div>
                <div className={`text-xs ${cfg.text} mt-0.5 font-medium`}>{sub.info}</div>
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold ${cfg.bg} ${cfg.text} ${cfg.border}`}>
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
