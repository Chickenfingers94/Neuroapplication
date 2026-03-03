import { useState, useEffect, useCallback } from 'react'
import { getTodayString, getDayOfWeek, parseDateString } from '../utils/dateUtils'
import { getChecklistForDate, toggleChecklistItem } from '../db/database'
import { SUPPLEMENTS, Supplement } from '../data/supplements'
import { CyclingStatus } from './useCycling'

export interface ChecklistItem {
  id: string
  supplement: Supplement
  completed: boolean
  isOptional?: boolean
  disabled?: boolean
  disabledReason?: string
}

export interface DailyChecklist {
  nüchtern: ChecklistItem[]
  morgens: ChecklistItem[]
  nachmittags: ChecklistItem[]
  abends: ChecklistItem[]
  total: number
  completed: number
}

export function useChecklist(phase: 1 | 2 | 3, cycling: CyclingStatus, date: string = getTodayString(), strategy: 'conservative' | 'experimental' = 'conservative'): {
  checklist: DailyChecklist
  toggle: (itemId: string) => Promise<void>
  loading: boolean
} {
  const [completions, setCompletions] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)
  const dayOfWeek = getDayOfWeek(parseDateString(date))

  useEffect(() => {
    async function load() {
      setLoading(true)
      const items = await getChecklistForDate(date)
      const map: Record<string, boolean> = {}
      items.forEach(i => { map[i.itemId] = i.completed })
      setCompletions(map)
      setLoading(false)
    }
    load()
  }, [date])

  const buildChecklist = useCallback((): DailyChecklist => {
    const availableSupplements = SUPPLEMENTS.filter(s => {
      if (s.phase > phase) return false
      if (s.daysOfWeek && !s.daysOfWeek.includes(dayOfWeek)) return false
      if (s.id === 'methylenblau' && !cycling.isMethylenblauDay) return false
      if (s.id === 'bromantane' && !cycling.isBromantaneDay) return false
      if (s.id === '9mebc' && !cycling.is9MeBCDay) return false
      if (s.id === 'dihexa' && !cycling.isDihexaDay) return false
      if (s.id === 'dihexa' && strategy === 'conservative') return false
      if (s.id === 'lsd' && !cycling.isLSDDay) return false
      if (s.id === 'phenylpiracetam' && !cycling.isPhenylpiracetamAllowed) return false
      if (s.id === 'tak653' && !cycling.isTAK653Allowed) return false
      return true
    })

    const toItem = (s: Supplement): ChecklistItem => {
      let disabled = false
      let disabledReason = ''
      if (s.id === '5htp' && (cycling.isMethylenblauDay || cycling.isLSDDay)) {
        disabled = true
        disabledReason = cycling.isMethylenblauDay ? 'Serotonin-Syndrom-Risiko mit Methylenblau!' : 'Serotonin-Syndrom-Risiko mit LSD!'
      }
      return { id: s.id, supplement: s, completed: completions[s.id] || false, isOptional: s.isOptional, disabled, disabledReason }
    }

    const nüchtern = availableSupplements.filter(s => s.timeOfDay.includes('nüchtern')).map(toItem)
    const morgens = availableSupplements.filter(s => s.timeOfDay.includes('morgens')).map(toItem)
    const nachmittags = availableSupplements.filter(s => s.timeOfDay.includes('nachmittags')).map(toItem)
    const abends = availableSupplements.filter(s => s.timeOfDay.includes('abends')).map(toItem)

    const allItems = [...nüchtern, ...morgens, ...nachmittags, ...abends]
    const notDisabled = allItems.filter(i => !i.disabled)
    const completed = notDisabled.filter(i => i.completed).length

    return { nüchtern, morgens, nachmittags, abends, total: notDisabled.length, completed }
  }, [phase, cycling, dayOfWeek, completions, strategy])

  const toggle = useCallback(async (itemId: string) => {
    const current = completions[itemId] || false
    const newValue = !current
    setCompletions(prev => ({ ...prev, [itemId]: newValue }))
    await toggleChecklistItem(date, itemId, newValue)
  }, [completions, date])

  return { checklist: buildChecklist(), toggle, loading }
}
