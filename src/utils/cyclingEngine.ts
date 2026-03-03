import { daysBetween } from './dateUtils'

export type CycleStatus = 'on' | 'off' | 'pause' | 'not_started'

export interface CycleResult {
  status: CycleStatus
  daysUntilNext: number
  cycleDay: number
  cycleInfo: string
}

export function getBromantaneCycle(startDate: Date, currentDate: Date): CycleResult {
  const dayOfWeek = currentDate.getDay()
  const totalDays = daysBetween(startDate, currentDate)
  const cycleLength = 10 * 7
  const posInCycle = totalDays % cycleLength
  const weekInCycle = Math.floor(posInCycle / 7) + 1
  
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    const daysUntilMon = dayOfWeek === 0 ? 1 : 2
    return { status: 'off', daysUntilNext: daysUntilMon, cycleDay: posInCycle, cycleInfo: `Woche ${weekInCycle}/10 – Wochenende (OFF)` }
  }
  
  if (weekInCycle <= 8) {
    return { status: 'on', daysUntilNext: 0, cycleDay: posInCycle, cycleInfo: `Woche ${weekInCycle}/10 – Aktiv` }
  } else {
    const daysRemaining = cycleLength - posInCycle
    return { status: 'pause', daysUntilNext: daysRemaining, cycleDay: posInCycle, cycleInfo: `Woche ${weekInCycle}/10 – Pause` }
  }
}

export function get9MeBCCycle(startDate: Date, currentDate: Date): CycleResult {
  const dayOfWeek = currentDate.getDay()
  const totalDays = daysBetween(startDate, currentDate)
  const cycleLength = 6 * 7
  const posInCycle = totalDays % cycleLength
  const weekInCycle = Math.floor(posInCycle / 7) + 1
  
  if (weekInCycle <= 2) {
    if (dayOfWeek === 1 || dayOfWeek === 4) {
      return { status: 'on', daysUntilNext: 0, cycleDay: posInCycle, cycleInfo: `Woche ${weekInCycle}/6 – Aktiv (Mo/Do)` }
    }
    return { status: 'off', daysUntilNext: 0, cycleDay: posInCycle, cycleInfo: `Woche ${weekInCycle}/6 – Kein Einnahmetag` }
  } else {
    const daysRemaining = cycleLength - posInCycle
    return { status: 'pause', daysUntilNext: daysRemaining, cycleDay: posInCycle, cycleInfo: `Woche ${weekInCycle}/6 – Pause (${daysRemaining} Tage)` }
  }
}

export function getDihexaCycle(startDate: Date, currentDate: Date): CycleResult {
  const totalDays = daysBetween(startDate, currentDate)
  const cycleLength = 8 * 7
  const posInCycle = totalDays % cycleLength
  const weekInCycle = Math.floor(posInCycle / 7) + 1
  
  if (weekInCycle <= 4) {
    return { status: 'on', daysUntilNext: 0, cycleDay: posInCycle, cycleInfo: `Woche ${weekInCycle}/8 – Aktiv` }
  } else {
    const daysRemaining = cycleLength - posInCycle
    return { status: 'pause', daysUntilNext: daysRemaining, cycleDay: posInCycle, cycleInfo: `Woche ${weekInCycle}/8 – Pause (${daysRemaining} Tage)` }
  }
}

export function getLSDCycle(startDate: Date, currentDate: Date): CycleResult {
  const totalDays = daysBetween(startDate, currentDate)
  const posInCycle = totalDays % 3
  
  if (posInCycle === 0) {
    return { status: 'on', daysUntilNext: 0, cycleDay: posInCycle, cycleInfo: 'Fadiman Tag 1 – Einnahme' }
  } else {
    const daysRemaining = 3 - posInCycle
    return { status: 'off', daysUntilNext: daysRemaining, cycleDay: posInCycle, cycleInfo: `Fadiman Tag ${posInCycle + 1} – Pause (${daysRemaining} Tage)` }
  }
}

export function getMethylenblauStatus(currentDate: Date): CycleResult {
  const dayOfWeek = currentDate.getDay()
  if (dayOfWeek === 1 || dayOfWeek === 4) {
    return { status: 'on', daysUntilNext: 0, cycleDay: dayOfWeek, cycleInfo: 'Einnahmetag (Mo/Do)' }
  }
  const nextDay = dayOfWeek < 1 ? 1 : (dayOfWeek < 4 ? 4 : 8)
  const days = nextDay - dayOfWeek
  return { status: 'off', daysUntilNext: days, cycleDay: dayOfWeek, cycleInfo: `Kein Einnahmetag (${days} Tage bis nächste)` }
}
