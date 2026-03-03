import React, { useState } from 'react'
import { Habit } from '../../db/database'

interface AddHabitModalProps {
  onClose: () => void
  onAdd: (data: Omit<Habit, 'id' | 'isSystemHabit' | 'createdAt' | 'sortOrder'>) => void
}

const DAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
const CATEGORIES = ['Fitness', 'Mental', 'Körper', 'Gesundheit', 'Ernährung', 'Lernen', 'Sonstiges']

export const AddHabitModal: React.FC<AddHabitModalProps> = ({ onClose, onAdd }) => {
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState('⭐')
  const [category, setCategory] = useState('Sonstiges')
  const [trackingType, setTrackingType] = useState<'boolean' | 'counter' | 'duration' | 'scale'>('boolean')
  const [frequency, setFrequency] = useState<'daily' | 'custom'>('daily')
  const [customDays, setCustomDays] = useState<number[]>([])
  const [targetValue, setTargetValue] = useState('')
  const [unit, setUnit] = useState('')
  const [streakEnabled, setStreakEnabled] = useState(true)
  const color = '#4361ee'
  const [error, setError] = useState('')

  const toggleDay = (day: number) => {
    setCustomDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day])
  }

  const handleSubmit = () => {
    if (!name.trim()) { setError('Name ist erforderlich'); return }
    if (frequency === 'custom' && customDays.length === 0) { setError('Bitte mindestens einen Tag auswählen'); return }
    onAdd({
      name: name.trim(),
      emoji,
      category,
      trackingType,
      frequency,
      customDays: frequency === 'custom' ? customDays : undefined,
      targetValue: targetValue ? Number(targetValue) : undefined,
      unit: unit || undefined,
      streakEnabled,
      color
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60" onClick={onClose}>
      <div className="bg-navy-800 rounded-t-2xl w-full max-w-lg p-5 space-y-4 max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Neue Gewohnheit</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">×</button>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex gap-2">
          <div className="w-16">
            <label className="text-xs text-gray-400 block mb-1">Emoji</label>
            <input value={emoji} onChange={e => setEmoji(e.target.value)} className="w-full bg-navy-700 border border-gray-600 rounded-lg px-2 py-2 text-center text-xl focus:border-blue-500 focus:outline-none" maxLength={2} />
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-400 block mb-1">Name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="z.B. Lesen 30min" className="w-full bg-navy-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-400 block mb-1">Kategorie</label>
          <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-navy-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none">
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="text-xs text-gray-400 block mb-2">Tracking-Typ</label>
          <div className="grid grid-cols-2 gap-2">
            {(['boolean', 'duration', 'counter', 'scale'] as const).map(t => (
              <button key={t} onClick={() => setTrackingType(t)} className={`py-2 rounded-lg text-sm font-medium transition-colors ${trackingType === t ? 'bg-blue-600 text-white' : 'bg-navy-700 text-gray-300 border border-gray-600'}`}>
                {t === 'boolean' ? '✓ Ja/Nein' : t === 'duration' ? '⏱ Dauer' : t === 'counter' ? '🔢 Anzahl' : '📊 Skala'}
              </button>
            ))}
          </div>
        </div>

        {(trackingType === 'duration' || trackingType === 'counter') && (
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs text-gray-400 block mb-1">Zielwert</label>
              <input type="number" value={targetValue} onChange={e => setTargetValue(e.target.value)} className="w-full bg-navy-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none" />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-400 block mb-1">Einheit</label>
              <input value={unit} onChange={e => setUnit(e.target.value)} placeholder="min, km, ..." className="w-full bg-navy-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none" />
            </div>
          </div>
        )}

        <div>
          <label className="text-xs text-gray-400 block mb-2">Häufigkeit</label>
          <div className="flex gap-2">
            {(['daily', 'custom'] as const).map(f => (
              <button key={f} onClick={() => setFrequency(f)} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${frequency === f ? 'bg-blue-600 text-white' : 'bg-navy-700 text-gray-300 border border-gray-600'}`}>
                {f === 'daily' ? 'Täglich' : 'Bestimmte Tage'}
              </button>
            ))}
          </div>
        </div>

        {frequency === 'custom' && (
          <div>
            <label className="text-xs text-gray-400 block mb-2">Tage auswählen</label>
            <div className="flex gap-1">
              {DAYS.map((day, i) => (
                <button key={i} onClick={() => toggleDay(i)} className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${customDays.includes(i) ? 'bg-blue-600 text-white' : 'bg-navy-700 text-gray-400 border border-gray-600'}`}>
                  {day}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">🔥 Streak verfolgen</span>
          <button onClick={() => setStreakEnabled(v => !v)} aria-label="Toggle streak tracking" className={`w-12 h-6 rounded-full transition-colors ${streakEnabled ? 'bg-blue-600' : 'bg-gray-600'}`}>
            <span className={`block w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${streakEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl font-semibold bg-gray-700 text-gray-300 active:scale-95 transition-all">Abbrechen</button>
          <button onClick={handleSubmit} className="flex-1 py-3 rounded-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 text-white active:scale-95 transition-all">Hinzufügen</button>
        </div>
      </div>
    </div>
  )
}
