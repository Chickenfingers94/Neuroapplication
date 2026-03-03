import React, { useState, useEffect } from 'react'
import { ScoreSlider } from '../components/tracking/ScoreSlider'
import { TrendChart } from '../components/tracking/TrendChart'
import { DailyLog, getDailyLog, saveDailyLog, db } from '../db/database'
import { getTodayString } from '../utils/dateUtils'

const Tracking: React.FC = () => {
  const [sleep, setSleep] = useState(7)
  const [focus, setFocus] = useState(7)
  const [mood, setMood] = useState(7)
  const [energy, setEnergy] = useState(7)
  const [notes, setNotes] = useState('')
  const [logs, setLogs] = useState<DailyLog[]>([])
  const [saved, setSaved] = useState(false)
  const today = getTodayString()

  useEffect(() => {
    async function load() {
      const log = await getDailyLog(today)
      if (log) { setSleep(log.sleep); setFocus(log.focus); setMood(log.mood); setEnergy(log.energy); setNotes(log.notes) }
      const allLogs = await db.dailyLogs.orderBy('date').limit(90).toArray()
      setLogs(allLogs)
    }
    load()
  }, [today])

  const handleSave = async () => {
    await saveDailyLog({ date: today, sleep, focus, mood, energy, notes, createdAt: Date.now() })
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

  const stats = [
    { label: 'Schlaf', value: avg('sleep'), emoji: '😴', color: '#4361ee', border: 'border-t-blue-500' },
    { label: 'Fokus', value: avg('focus'), emoji: '🎯', color: '#f59e0b', border: 'border-t-amber-500' },
    { label: 'Stimmung', value: avg('mood'), emoji: '😊', color: '#10b981', border: 'border-t-emerald-500' },
    { label: 'Energie', value: avg('energy'), emoji: '⚡', color: '#ef4444', border: 'border-t-red-500' }
  ]

  return (
    <div className="px-4 py-4 space-y-4 pb-8">
      <h2 className="text-xl font-extrabold text-white flex items-center gap-2">📊 Tages-Tracking</h2>

      <div className="space-y-3">
        <ScoreSlider label="Schlaf" emoji="😴" value={sleep} onChange={setSleep} color="#4361ee" />
        <ScoreSlider label="Fokus" emoji="🎯" value={focus} onChange={setFocus} color="#f59e0b" />
        <ScoreSlider label="Stimmung" emoji="😊" value={mood} onChange={setMood} color="#10b981" />
        <ScoreSlider label="Energie" emoji="⚡" value={energy} onChange={setEnergy} color="#ef4444" />
      </div>

      <div className="bg-navy-700/80 rounded-2xl border border-white/5 p-4">
        <label className="text-sm font-semibold text-gray-300 block mb-2">📝 Notizen</label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Wie war dein Tag? Besondere Beobachtungen, Stimmungsschwankungen, unerwartete Wirkungen..."
          className="w-full bg-navy-900/60 text-white placeholder-gray-600 rounded-xl p-4 text-sm resize-none border border-white/10 focus:border-blue-500/60 focus:outline-none transition-colors leading-relaxed"
          rows={4}
        />
      </div>

      <button
        onClick={handleSave}
        className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-200 ${
          saved
            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white scale-[0.98]'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white active:scale-[0.97]'
        }`}
        style={{ boxShadow: saved ? '0 0 20px rgba(16,185,129,0.3)' : '0 0 20px rgba(67,97,238,0.3)' }}
      >
        {saved ? '✅ Gespeichert!' : '💾 Speichern'}
      </button>

      <div className="grid grid-cols-4 gap-2">
        {stats.map(stat => (
          <div key={stat.label} className={`bg-navy-700/80 rounded-2xl p-3 border-t-2 border border-white/5 text-center ${stat.border}`}>
            <div className="text-xl mb-1">{stat.emoji}</div>
            <div className="text-lg font-extrabold" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{stat.label} Ø7T</div>
          </div>
        ))}
      </div>

      <TrendChart logs={logs} title="📈 Trends (letzte 30 Tage)" />
    </div>
  )
}

export default Tracking
