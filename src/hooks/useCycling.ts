import { useMemo } from 'react'
import { getBromantaneCycle, get9MeBCCycle, getDihexaCycle, getLSDCycle, getMethylenblauStatus, CycleResult } from '../utils/cyclingEngine'
import { getDayOfWeek } from '../utils/dateUtils'

export interface CyclingStatus {
  bromantane: CycleResult
  methylenblau: CycleResult
  '9mebc': CycleResult
  dihexa: CycleResult
  lsd: CycleResult
  isMethylenblauDay: boolean
  isLSDDay: boolean
  is9MeBCDay: boolean
  isDihexaDay: boolean
  isBromantaneDay: boolean
  isPhenylpiracetamAllowed: boolean
  isTAK653Allowed: boolean
}

export function useCycling(startDate: Date | null, currentDate: Date = new Date()): CyclingStatus {
  return useMemo(() => {
    const dayOfWeek = getDayOfWeek(currentDate)
    const effectiveStart = startDate || currentDate

    const bromantane = getBromantaneCycle(effectiveStart, currentDate)
    const methylenblau = getMethylenblauStatus(currentDate)
    const nineMe = get9MeBCCycle(effectiveStart, currentDate)
    const dihexa = getDihexaCycle(effectiveStart, currentDate)
    const lsd = getLSDCycle(effectiveStart, currentDate)

    const isMethylenblauDay = methylenblau.status === 'on'
    const isLSDDay = lsd.status === 'on'
    const is9MeBCDay = nineMe.status === 'on'
    const isDihexaDay = dihexa.status === 'on'
    const isBromantaneDay = bromantane.status === 'on'
    const isPhenylpiracetamAllowed = [1, 3, 5].includes(dayOfWeek)
    const isTAK653Allowed = [2, 4, 6].includes(dayOfWeek) && !isPhenylpiracetamAllowed

    return { bromantane, methylenblau, '9mebc': nineMe, dihexa, lsd, isMethylenblauDay, isLSDDay, is9MeBCDay, isDihexaDay, isBromantaneDay, isPhenylpiracetamAllowed, isTAK653Allowed }
  }, [startDate, currentDate])
}
