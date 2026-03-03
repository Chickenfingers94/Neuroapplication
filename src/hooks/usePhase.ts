import { useState, useEffect } from 'react'
import { getSetting } from '../db/database'
import { getWeekNumber } from '../utils/dateUtils'
import { getPhaseForWeek, PhaseInfo, PHASES } from '../data/phases'

export interface PhaseState {
  phase: PhaseInfo
  weekNumber: number
  startDate: Date | null
  loading: boolean
}

const DEFAULT_PHASE_STATE: PhaseState = {
  phase: PHASES[0],
  weekNumber: 1,
  startDate: null,
  loading: true
}

export function usePhase(): PhaseState {
  const [state, setState] = useState<PhaseState>(DEFAULT_PHASE_STATE)

  useEffect(() => {
    async function load() {
      const startDateStr = await getSetting('protocolStartDate')
      if (!startDateStr) {
        setState(s => ({ ...s, loading: false }))
        return
      }
      const startDate = new Date(startDateStr)
      const today = new Date()
      const weekNumber = getWeekNumber(startDate, today)
      const phase = getPhaseForWeek(weekNumber)
      setState({ phase, weekNumber, startDate, loading: false })
    }
    load()
  }, [])

  return state
}
