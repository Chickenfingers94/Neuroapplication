export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

export function getTodayString(): string {
  return formatDate(new Date())
}

export function getDayOfWeek(date: Date): number {
  // 0=Sunday, 1=Monday, ... 6=Saturday
  return date.getDay()
}

export function daysBetween(from: Date, to: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24
  return Math.floor((to.getTime() - from.getTime()) / msPerDay)
}

export function getWeekNumber(startDate: Date, currentDate: Date): number {
  const days = daysBetween(startDate, currentDate)
  return Math.floor(days / 7) + 1
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export function formatGermanDate(date: Date): string {
  return date.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

export function formatShortGermanDate(date: Date): string {
  return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export const DAYS_DE = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
export const DAYS_SHORT_DE = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
