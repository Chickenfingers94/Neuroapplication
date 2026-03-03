export interface PhaseInfo {
  phase: 1 | 2 | 3
  name: string
  weekStart: number
  weekEnd: number | null
  description: string
  color: string
  emoji: string
}

export const PHASES: PhaseInfo[] = [
  {
    phase: 1,
    name: 'Fundament',
    weekStart: 1,
    weekEnd: 4,
    description: 'Grundversorgung etablieren, Basis legen',
    color: '#4361ee',
    emoji: '🏗️'
  },
  {
    phase: 2,
    name: 'Aufbau',
    weekStart: 5,
    weekEnd: 12,
    description: 'Kognitive Verstärkung, Cycling einführen',
    color: '#f59e0b',
    emoji: '⚡'
  },
  {
    phase: 3,
    name: 'Optimierung',
    weekStart: 13,
    weekEnd: null,
    description: 'Fortgeschrittene Nootropika, Maximum Performance',
    color: '#ef4444',
    emoji: '🚀'
  }
]

export function getPhaseForWeek(week: number): PhaseInfo {
  if (week <= 4) return PHASES[0]
  if (week <= 12) return PHASES[1]
  return PHASES[2]
}
