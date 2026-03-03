import { useState, useEffect, useCallback } from 'react'
import { db, Habit, HabitLog } from '../db/database'
import { getTodayString, getDayOfWeek } from '../utils/dateUtils'

export interface HabitWithStatus extends Habit {
  isScheduledToday: boolean
  isCompletedToday: boolean
  currentStreak: number
  completionRate30d: number
  todayLog?: HabitLog
}

function isScheduledForDay(habit: Habit, dayOfWeek: number): boolean {
  if (habit.frequency === 'daily') return true
  if (habit.frequency === 'custom' && habit.customDays) {
    return habit.customDays.includes(dayOfWeek)
  }
  return false
}

async function calculateStreak(habitId: string, today: string): Promise<number> {
  const logs = await db.habitLogs
    .where('habitId').equals(habitId)
    .toArray()
  const completedDates = new Set(logs.filter(l => l.completed).map(l => l.date))
  let streak = 0
  const d = new Date(today + 'T12:00:00')
  for (let i = 0; i < 365; i++) {
    const dateStr = d.toISOString().split('T')[0]
    if (completedDates.has(dateStr)) {
      streak++
      d.setDate(d.getDate() - 1)
    } else {
      break
    }
  }
  return streak
}

async function calculateCompletionRate30d(habitId: string, today: string): Promise<number> {
  const d = new Date(today + 'T12:00:00')
  const cutoff = new Date(d)
  cutoff.setDate(cutoff.getDate() - 29)
  const cutoffStr = cutoff.toISOString().split('T')[0]
  const logs = await db.habitLogs
    .where('habitId').equals(habitId)
    .filter(l => l.date >= cutoffStr && l.date <= today)
    .toArray()
  const completed = logs.filter(l => l.completed).length
  return completed / 30
}

export function useHabits() {
  const [habits, setHabits] = useState<HabitWithStatus[]>([])
  const [loading, setLoading] = useState(true)
  const today = getTodayString()
  const dayOfWeek = getDayOfWeek(new Date(today + 'T12:00:00'))

  const load = useCallback(async () => {
    setLoading(true)
    const allHabits = await db.habits
      .where('archivedAt').equals(0)
      .sortBy('sortOrder')
      .catch(() =>
        db.habits.orderBy('sortOrder').filter(h => !h.archivedAt).toArray()
      )

    const todayLogs = await db.habitLogs.where('date').equals(today).toArray()
    const logMap = new Map<string, HabitLog>(todayLogs.map(l => [l.habitId, l]))

    const withStatus: HabitWithStatus[] = await Promise.all(
      allHabits.map(async (habit) => {
        const isScheduledToday = isScheduledForDay(habit, dayOfWeek)
        const todayLog = logMap.get(habit.id)
        const isCompletedToday = todayLog?.completed ?? false
        const currentStreak = habit.streakEnabled ? await calculateStreak(habit.id, today) : 0
        const completionRate30d = await calculateCompletionRate30d(habit.id, today)
        return { ...habit, isScheduledToday, isCompletedToday, currentStreak, completionRate30d, todayLog }
      })
    )

    setHabits(withStatus)
    setLoading(false)
  }, [today, dayOfWeek])

  useEffect(() => {
    load()
  }, [load])

  const toggleHabit = useCallback(async (id: string) => {
    const existing = await db.habitLogs.where('[habitId+date]').equals([id, today]).first()
    if (existing?.id) {
      await db.habitLogs.update(existing.id, { completed: !existing.completed })
    } else {
      await db.habitLogs.add({ habitId: id, date: today, completed: true })
    }
    await load()
  }, [today, load])

  const addCustomHabit = useCallback(async (data: Omit<Habit, 'id' | 'isSystemHabit' | 'createdAt' | 'sortOrder'>) => {
    const maxOrder = habits.length > 0 ? Math.max(...habits.map(h => h.sortOrder)) + 1 : 0
    const id = `custom-${Date.now()}`
    await db.habits.add({ ...data, id, isSystemHabit: false, createdAt: Date.now(), sortOrder: maxOrder })
    await load()
  }, [habits, load])

  const deleteCustomHabit = useCallback(async (id: string) => {
    const habit = await db.habits.get(id)
    if (habit && !habit.isSystemHabit) {
      await db.habits.update(id, { archivedAt: Date.now() })
      await load()
    }
  }, [load])

  const scheduledToday = habits.filter(h => h.isScheduledToday)
  const completedToday = scheduledToday.filter(h => h.isCompletedToday).length
  const completionRate = scheduledToday.length > 0 ? completedToday / scheduledToday.length : 0

  return { habits, scheduledToday, completedToday, completionRate, toggleHabit, addCustomHabit, deleteCustomHabit, loading }
}
