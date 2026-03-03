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

export class NeuroStackDB extends Dexie {
  dailyLogs!: Table<DailyLog>
  checklistCompletions!: Table<ChecklistCompletion>
  settings!: Table<Settings>

  constructor() {
    super('NeuroStackDB')
    this.version(1).stores({
      dailyLogs: '++id, date',
      checklistCompletions: '++id, date, itemId, [date+itemId]',
      settings: '++id, key'
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
  const [dailyLogs, checklistCompletions, settings] = await Promise.all([
    db.dailyLogs.toArray(),
    db.checklistCompletions.toArray(),
    db.settings.toArray()
  ])
  return { dailyLogs, checklistCompletions, settings, exportedAt: new Date().toISOString() }
}

function stripId<T extends { id?: number }>(items: T[]): Omit<T, 'id'>[] {
  return items.map(({ id: _, ...rest }) => rest as Omit<T, 'id'>)
}

export async function importAllData(data: Record<string, unknown>): Promise<void> {
  await db.transaction('rw', db.dailyLogs, db.checklistCompletions, db.settings, async () => {
    await db.dailyLogs.clear()
    await db.checklistCompletions.clear()
    await db.settings.clear()
    if (data.dailyLogs) await db.dailyLogs.bulkAdd(stripId(data.dailyLogs as DailyLog[]))
    if (data.checklistCompletions) await db.checklistCompletions.bulkAdd(stripId(data.checklistCompletions as ChecklistCompletion[]))
    if (data.settings) await db.settings.bulkAdd(stripId(data.settings as Settings[]))
  })
}
