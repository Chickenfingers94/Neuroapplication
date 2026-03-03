import React, { useState, useEffect } from 'react'
import { ScoreSlider } from '../components/tracking/ScoreSlider'
import { TrendChart } from '../components/tracking/TrendChart'
import { DailyLog, getDailyLog, saveDailyLog, db } from '../db/database'
import { getTodayString, parseDateString } from '../utils/dateUtils'

type TrainingType = 'none' | 'kraft' | 'cardio' | 'hiit' | 'kraft+cardio'

function formatLocalDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const ToggleButton: React.FC<{ label: string; emoji: string; value: boolean; onChange: (v: boolean) => void }> = ({ label, emoji, value, onChange }) => (
  <button
    onClick={() => onChange(!value)}
    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
      value
        ? 'bg-green-900/50 border-green-600 text-green-300'
        : 'bg-navy-800 border-gray-600 text-gray-400 hover:border-gray-500'
    }`}
  >
    <span>{emoji}</span>
    <span>{label}</span>
    <span className="ml-auto">{value ? '✓' : '○'}</span>
  </button>
)

const Tracking: React.FC = () => {
  const [sleep, setSleep] = useState(7)
  const [focus, setFocus] = useState(7)
  const [mood, setMood] = useState(7)
  const [energy, setEnergy] = useState(7)
  const [notes, setNotes] = useState('')
  const [training, setTraining] = useState<TrainingType>('none')
  const [smoking, setSmoking] = useState(false)
  const [sunlight, setSunlight] = useState(false)
  const [meditation, setMeditation] = useState(false)
  const [coldShower, setColdShower] = useState(false)
  const [logs, setLogs] = useState<DailyLog[]>([])
  const [saved, setSaved] = useState(false)
  const today = getTodayString()

  useEffect(() => {
    async function load() {
      const log = await getDailyLog(today)
      if (log) {
        setSleep(log.sleep)
        setFocus(log.focus)
        setMood(log.mood)
        setEnergy(log.energy)
        setNotes(log.notes)
        setTraining(log.training ?? 'none')
        setSmoking(log.smoking ?? false)
        setSunlight(log.sunlight ?? false)
        setMeditation(log.meditation ?? false)
        setColdShower(log.coldShower ?? false)
      }
      const allLogs = await db.dailyLogs.orderBy('date').limit(90).toArray()
      setLogs(allLogs)
    }
    load()
  }, [today])

  const handleSave = async () => {
    await saveDailyLog({
      date: today, sleep, focus, mood, energy, notes, createdAt: Date.now(),
      training, smoking, sunlight, meditation, coldShower
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    const allLogs = await db.dailyLogs.orderBy('date').limit(90).toArray()
    setLogs(allLogs)
  }

  const avg = (key: keyof DailyLog) => {
    if (logs.length === 0) return '–'
    const recent = logs.slice(-7)
    const sum = recent.reduce((acc, l) => acc + (l[key] as number), 0)
    return (sum / recent.length).toFixed(1)
  }

  // Habit streaks
  const calcStreak = (predicate: (l: DailyLog) => boolean): number => {
    const sorted = [...logs].sort((a, b) => b.date.localeCompare(a.date))
    let count = 0
    const today = new Date()
    for (let i = 0; i < sorted.length; i++) {
      const expected = formatLocalDate(new Date(today.getTime() - i * 86400000))
      const log = sorted[i]
      if (log?.date !== expected) break
      if (!predicate(log)) break
      count++
    }
    return count
  }

  const noSmokingStreak = calcStreak(l => !l.smoking)
  const meditationStreak = calcStreak(l => !!l.meditation)
  const coldShowerStreak = calcStreak(l => !!l.coldShower)
  const trainingThisWeek = logs
    .filter(l => {
      const d = parseDateString(l.date)
      const now = new Date()
      const weekStart = new Date(now)
      weekStart.setDate(now.getDate() - now.getDay())
      return d >= weekStart
    })
    .filter(l => l.training && l.training !== 'none').length

  return (
    <div className="px-4 py-4 space-y-4 pb-8">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">📊 Tages-Tracking</h2>

      <div className="space-y-3">
        <ScoreSlider label="Schlaf" emoji="😴" value={sleep} onChange={setSleep} />
        <ScoreSlider label="Fokus" emoji="🎯" value={focus} onChange={setFocus} />
        <ScoreSlider label="Stimmung" emoji="😊" value={mood} onChange={setMood} />
        <ScoreSlider label="Energie" emoji="⚡" value={energy} onChange={setEnergy} />
      </div>

      {/* Training */}
      <div className="bg-navy-700 rounded-xl border border-gray-700 p-4 space-y-3">
        <label className="text-sm font-semibold text-gray-300 block">🏋️ Training heute</label>
        <select
          value={training}
          onChange={e => setTraining(e.target.value as TrainingType)}
          className="w-full bg-navy-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
        >
          <option value="none">Kein Training</option>
          <option value="kraft">Krafttraining</option>
          <option value="cardio">Cardio</option>
          <option value="hiit">HIIT</option>
          <option value="kraft+cardio">Kraft + Cardio</option>
        </select>
      </div>

      {/* Lifestyle toggles */}
      <div className="bg-navy-700 rounded-xl border border-gray-700 p-4 space-y-3">
        <label className="text-sm font-semibold text-gray-300 block">🌿 Lifestyle-Check</label>
        <div className="grid grid-cols-2 gap-2">
          <ToggleButton label="Geraucht" emoji="🚬" value={smoking} onChange={setSmoking} />
          <ToggleButton label="Sonnenlicht" emoji="☀️" value={sunlight} onChange={setSunlight} />
          <ToggleButton label="Meditation" emoji="🧘" value={meditation} onChange={setMeditation} />
          <ToggleButton label="Kaltdusche" emoji="🚿" value={coldShower} onChange={setColdShower} />
        </div>
      </div>

      <div className="bg-navy-700 rounded-xl border border-gray-700 p-4">
        <label className="text-sm font-semibold text-gray-300 block mb-2">📝 Notizen</label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Wie war dein Tag? Besondere Beobachtungen..."
          className="w-full bg-navy-800 text-white placeholder-gray-500 rounded-lg p-3 text-sm resize-none border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/40 transition-all"
          rows={3}
        />
      </div>

      <button
        onClick={handleSave}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${saved ? 'bg-green-600 text-white scale-95' : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white active:scale-95 shadow-lg shadow-blue-600/30'}`}
      >
        {saved ? '✅ Gespeichert!' : '💾 Speichern'}
      </button>

      {/* Habit Streaks */}
      <div className="bg-navy-700 rounded-xl border border-gray-700 p-4 space-y-3">
        <h3 className="font-semibold text-white flex items-center gap-2">🏆 Habit-Streaks</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-navy-800 rounded-lg p-3 border border-gray-700 text-center">
            <div className="text-2xl mb-1">🚭</div>
            <div className="text-lg font-bold text-green-400">{noSmokingStreak}</div>
            <div className="text-xs text-gray-500">Tage rauchfrei</div>
          </div>
          <div className="bg-navy-800 rounded-lg p-3 border border-gray-700 text-center">
            <div className="text-2xl mb-1">🧘</div>
            <div className="text-lg font-bold text-purple-400">{meditationStreak}</div>
            <div className="text-xs text-gray-500">Tage Meditation</div>
          </div>
          <div className="bg-navy-800 rounded-lg p-3 border border-gray-700 text-center">
            <div className="text-2xl mb-1">🚿</div>
            <div className="text-lg font-bold text-cyan-400">{coldShowerStreak}</div>
            <div className="text-xs text-gray-500">Tage Kaltdusche</div>
          </div>
          <div className="bg-navy-800 rounded-lg p-3 border border-gray-700 text-center">
            <div className="text-2xl mb-1">🏋️</div>
            <div className="text-lg font-bold text-yellow-400">{trainingThisWeek}x</div>
            <div className="text-xs text-gray-500">Training diese Woche</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Schlaf', value: avg('sleep'), emoji: '😴', color: '#4361ee' },
          { label: 'Fokus', value: avg('focus'), emoji: '🎯', color: '#f59e0b' },
          { label: 'Stimmung', value: avg('mood'), emoji: '😊', color: '#10b981' },
          { label: 'Energie', value: avg('energy'), emoji: '⚡', color: '#ef4444' }
        ].map(stat => (
          <div
            key={stat.label}
            className="bg-navy-700 rounded-xl p-3 border border-gray-700 text-center overflow-hidden relative"
            style={{ borderTop: `2px solid ${stat.color}` }}
          >
            <div className="text-xl mb-1">{stat.emoji}</div>
            <div className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label} Ø7T</div>
          </div>
        ))}
      </div>

      <TrendChart logs={logs} title="📈 Trends (letzte 30 Tage)" />

      {/* Medical Disclaimer */}
      <div className="mt-4 p-3 rounded-xl bg-navy-900/60 border border-gray-700/50 text-center">
        <p className="text-xs text-gray-500">
          ⚠️ Diese App ist kein medizinischer Rat. Konsultiere einen Arzt. Eigenverantwortung und Selbstbeobachtung sind essenziell.
        </p>
      </div>
    </div>
  )
}

export default Tracking
