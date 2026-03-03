import { useState, useEffect } from 'react'
import { getSetting } from '../db/database'
import { getWeekNumber } from '../utils/dateUtils'
import { getPhaseForWeek, PhaseInfo } from '../data/phases'

export interface PhaseState {
  phase: PhaseInfo
  weekNumber: number
  startDate: Date | null
  loading: boolean
}

export function usePhase(): PhaseState {
  const [state, setState] = useState<PhaseState>({ phase: { phase: 1, name: 'Fundament', weekStart: 1, weekEnd: 4, description: '', color: '#4361ee', emoji: '🏗️' }, weekNumber: 1, startDate: null, loading: true })

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
