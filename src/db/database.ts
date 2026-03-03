import Dexie, { Table } from 'dexie'

export interface DailyLog {
  id?: number
  date: string // YYYY-MM-DD
  sleep: number
  focus: number
  mood: number
  energy: number
  notes: string
  createdAt: number
  training: 'none' | 'kraft' | 'cardio' | 'hiit' | 'kraft+cardio'
  smoking: boolean
  sunlight: boolean
  meditation: boolean
  coldShower: boolean
}

export interface ChecklistCompletion {
  id?: number
  date: string // YYYY-MM-DD
  itemId: string
  completed: boolean
  completedAt?: number
}

export interface Settings {
  id?: number
  key: string
  value: string
}

export interface TodoItem {
  id?: number
  title: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
  tags: string[]
  recurring?: 'daily' | 'weekly' | 'monthly'
  createdAt: number
  completedAt?: number
}

export interface Habit {
  id: string
  name: string
  emoji: string
  category: string
  frequency: 'daily' | 'custom'
  customDays?: number[]
  trackingType: 'boolean' | 'counter' | 'duration' | 'scale'
  targetValue?: number
  unit?: string
  color: string
  isSystemHabit: boolean
  createdAt: number
  archivedAt?: number
  streakEnabled: boolean
  neurobiologicalNote?: string
  sortOrder: number
}

export interface HabitLog {
  id?: number
  habitId: string
  date: string // YYYY-MM-DD
  completed: boolean
  value?: number
  note?: string
}

export class NeuroStackDB extends Dexie {
  dailyLogs!: Table<DailyLog>
  checklistCompletions!: Table<ChecklistCompletion>
  settings!: Table<Settings>
  todos!: Table<TodoItem>
  habits!: Table<Habit>
  habitLogs!: Table<HabitLog>

  constructor() {
    super('NeuroStackDB')
    this.version(1).stores({
      dailyLogs: '++id, date',
      checklistCompletions: '++id, date, itemId, [date+itemId]',
      settings: '++id, key'
    })
    this.version(2).stores({
      dailyLogs: '++id, date',
      checklistCompletions: '++id, date, itemId, [date+itemId]',
      settings: '++id, key'
    }).upgrade(tx => {
      return tx.table('dailyLogs').toCollection().modify((log: DailyLog) => {
        if (log.training === undefined) log.training = 'none'
        if (log.smoking === undefined) log.smoking = false
        if (log.sunlight === undefined) log.sunlight = false
        if (log.meditation === undefined) log.meditation = false
        if (log.coldShower === undefined) log.coldShower = false
      })
    })
    this.version(3).stores({
      dailyLogs: '++id, date',
      checklistCompletions: '++id, date, itemId, [date+itemId]',
      settings: '++id, key',
      todos: '++id, completed, priority, dueDate, createdAt'
    })
    this.version(4).stores({
      dailyLogs: '++id, date',
      checklistCompletions: '++id, date, itemId, [date+itemId]',
      settings: '++id, key',
      todos: '++id, completed, priority, dueDate, createdAt',
      habits: 'id, category, isSystemHabit, sortOrder, archivedAt',
      habitLogs: '++id, habitId, date, [habitId+date]'
    }).upgrade(async tx => {
      const systemHabits: Habit[] = [
        { id: 'training', name: 'Krafttraining', emoji: '🏋️', category: 'Fitness', frequency: 'custom', customDays: [1, 3, 5], trackingType: 'boolean', color: '#ef4444', isSystemHabit: true, createdAt: Date.now(), streakEnabled: true, sortOrder: 0 },
        { id: 'cardio', name: 'Cardio 20min', emoji: '🏃', category: 'Fitness', frequency: 'custom', customDays: [3, 5, 0], trackingType: 'duration', targetValue: 20, unit: 'min', color: '#f59e0b', isSystemHabit: true, createdAt: Date.now(), streakEnabled: false, sortOrder: 1 },
        { id: 'meditation', name: 'Meditation/Breathwork', emoji: '🧘', category: 'Mental', frequency: 'daily', trackingType: 'duration', targetValue: 10, unit: 'min', color: '#8b5cf6', isSystemHabit: true, createdAt: Date.now(), streakEnabled: true, sortOrder: 2 },
        { id: 'cold-shower', name: 'Kalte Dusche', emoji: '🧊', category: 'Körper', frequency: 'daily', trackingType: 'duration', targetValue: 3, unit: 'min', color: '#4361ee', isSystemHabit: true, createdAt: Date.now(), streakEnabled: true, sortOrder: 3 },
        { id: 'sunlight', name: 'Sonnenlicht 30min', emoji: '☀️', category: 'Körper', frequency: 'daily', trackingType: 'boolean', color: '#f59e0b', isSystemHabit: true, createdAt: Date.now(), streakEnabled: false, sortOrder: 4 },
        { id: 'no-smoking', name: 'Nicht geraucht', emoji: '🚭', category: 'Gesundheit', frequency: 'daily', trackingType: 'boolean', color: '#10b981', isSystemHabit: true, createdAt: Date.now(), streakEnabled: true, sortOrder: 5 },
        { id: 'journaling', name: 'Journal-Eintrag', emoji: '📓', category: 'Mental', frequency: 'daily', trackingType: 'boolean', color: '#6b7280', isSystemHabit: true, createdAt: Date.now(), streakEnabled: true, sortOrder: 6 }
      ]
      const existingIds = await tx.table('habits').toCollection().primaryKeys()
      const toAdd = systemHabits.filter(h => !existingIds.includes(h.id))
      if (toAdd.length > 0) await tx.table('habits').bulkAdd(toAdd)
    })
  }
}

export const db = new NeuroStackDB()

export async function getSetting(key: string): Promise<string | null> {
  const s = await db.settings.where('key').equals(key).first()
  return s ? s.value : null
}

export async function setSetting(key: string, value: string): Promise<void> {
  const existing = await db.settings.where('key').equals(key).first()
  if (existing?.id) await db.settings.update(existing.id, { value })
  else await db.settings.add({ key, value })
}

export async function getDailyLog(date: string): Promise<DailyLog | undefined> {
  return db.dailyLogs.where('date').equals(date).first()
}

export async function saveDailyLog(log: Omit<DailyLog, 'id'>): Promise<void> {
  const existing = await db.dailyLogs.where('date').equals(log.date).first()
  if (existing?.id) await db.dailyLogs.update(existing.id, log)
  else await db.dailyLogs.add(log)
}

export async function getChecklistForDate(date: string): Promise<ChecklistCompletion[]> {
  return db.checklistCompletions.where('date').equals(date).toArray()
}

export async function toggleChecklistItem(date: string, itemId: string, completed: boolean): Promise<void> {
  const existing = await db.checklistCompletions.where('[date+itemId]').equals([date, itemId]).first()
  if (existing?.id) await db.checklistCompletions.update(existing.id, { completed, completedAt: completed ? Date.now() : undefined })
  else await db.checklistCompletions.add({ date, itemId, completed, completedAt: completed ? Date.now() : undefined })
}

export async function exportAllData(): Promise<object> {
  const [dailyLogs, checklistCompletions, settings, todos] = await Promise.all([
    db.dailyLogs.toArray(),
    db.checklistCompletions.toArray(),
    db.settings.toArray(),
    db.todos.toArray()
  ])
  return { dailyLogs, checklistCompletions, settings, todos, exportedAt: new Date().toISOString() }
}

function stripId<T extends { id?: number }>(items: T[]): Omit<T, 'id'>[] {
  return items.map(({ id: _, ...rest }) => rest as Omit<T, 'id'>)
}

export async function importAllData(data: Record<string, unknown>): Promise<void> {
  await db.transaction('rw', db.dailyLogs, db.checklistCompletions, db.settings, db.todos, async () => {
    await db.dailyLogs.clear()
    await db.checklistCompletions.clear()
    await db.settings.clear()
    await db.todos.clear()
    if (data.dailyLogs) await db.dailyLogs.bulkAdd(stripId(data.dailyLogs as DailyLog[]))
    if (data.checklistCompletions) await db.checklistCompletions.bulkAdd(stripId(data.checklistCompletions as ChecklistCompletion[]))
    if (data.settings) await db.settings.bulkAdd(stripId(data.settings as Settings[]))
    if (data.todos) await db.todos.bulkAdd(stripId(data.todos as TodoItem[]))
  })
}

export async function getAllTodos(): Promise<TodoItem[]> {
  return db.todos.orderBy('createdAt').reverse().toArray()
}

export async function addTodo(todo: Omit<TodoItem, 'id'>): Promise<number> {
  return db.todos.add(todo)
}

export async function updateTodo(id: number, changes: Partial<TodoItem>): Promise<void> {
  await db.todos.update(id, changes)
}

export async function deleteTodo(id: number): Promise<void> {
  await db.todos.delete(id)
}
