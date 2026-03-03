import React, { useState, useEffect } from 'react'
import { db } from '../db/database'
import { parseDateString, formatGermanDate } from '../utils/dateUtils'

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
const MONTHS = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
]

function toLocalDateStr(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

const Calendar: React.FC = () => {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [logDates, setLogDates] = useState<Set<string>>(new Set())
  const [checklistDates, setChecklistDates] = useState<Set<string>>(new Set())

  useEffect(() => {
    async function loadDates() {
      const [logs, completions] = await Promise.all([
        db.dailyLogs.toArray(),
        db.checklistCompletions.where('completed').equals(1).toArray()
      ])
      setLogDates(new Set(logs.map(l => l.date)))
      setChecklistDates(new Set(completions.map(c => c.date)))
    }
    loadDates()
  }, [])

  const firstDay = new Date(viewYear, viewMonth, 1)
  // Monday-based week: 0=Mon..6=Sun
  const startOffset = (firstDay.getDay() + 6) % 7
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ]
  // Pad to full weeks
  while (cells.length % 7 !== 0) cells.push(null)

  const todayStr = toLocalDateStr(today.getFullYear(), today.getMonth(), today.getDate())

  return (
    <div className="px-4 py-4 space-y-4 pb-8">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">📅 Kalender</h2>

      {/* Month navigation */}
      <div className="flex items-center justify-between bg-navy-700 rounded-xl border border-gray-700 px-4 py-3">
        <button onClick={prevMonth} className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-navy-600 transition-colors text-lg">‹</button>
        <span className="font-semibold text-white">{MONTHS[viewMonth]} {viewYear}</span>
        <button onClick={nextMonth} className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-navy-600 transition-colors text-lg">›</button>
      </div>

      {/* Calendar grid */}
      <div className="bg-navy-700 rounded-xl border border-gray-700 p-3">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 mb-2">
          {WEEKDAYS.map(d => (
            <div key={d} className="text-center text-xs font-semibold text-gray-500 py-1">{d}</div>
          ))}
        </div>
        {/* Day cells */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => {
            if (!day) return <div key={i} />
            const dateStr = toLocalDateStr(viewYear, viewMonth, day)
            const hasLog = logDates.has(dateStr)
            const hasChecklist = checklistDates.has(dateStr)
            const isToday = dateStr === todayStr
            const isSelected = dateStr === selectedDate
            return (
              <button
                key={i}
                onClick={() => setSelectedDate(dateStr === selectedDate ? null : dateStr)}
                className={`relative flex flex-col items-center justify-center rounded-lg aspect-square text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white'
                    : isToday
                    ? 'bg-blue-900/60 text-blue-300 border border-blue-600'
                    : 'text-gray-300 hover:bg-navy-600'
                }`}
              >
                <span>{day}</span>
                {(hasLog || hasChecklist) && (
                  <div className="flex gap-0.5 mt-0.5">
                    {hasLog && <span className="w-1 h-1 rounded-full bg-green-400 block" />}
                    {hasChecklist && <span className="w-1 h-1 rounded-full bg-blue-400 block" />}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400 block" /> Tracking-Eintrag</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400 block" /> Supplement-Einnahme</span>
      </div>

      {/* Selected day info */}
      {selectedDate && (
        <div className="bg-navy-700 rounded-xl border border-gray-700 p-4 animate-fadeIn">
          <h3 className="font-semibold text-white mb-2">
            📆 {formatGermanDate(parseDateString(selectedDate))}
          </h3>
          {!logDates.has(selectedDate) && !checklistDates.has(selectedDate) && (
            <p className="text-sm text-gray-500">Keine Daten für diesen Tag.</p>
          )}
          {logDates.has(selectedDate) && (
            <p className="text-sm text-green-400">✅ Tracking-Eintrag vorhanden</p>
          )}
          {checklistDates.has(selectedDate) && (
            <p className="text-sm text-blue-400">✅ Supplements eingenommen</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Calendar
