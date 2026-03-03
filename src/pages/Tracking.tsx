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

  return (
    <div className="px-4 py-4 space-y-4 pb-8">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">📊 Tages-Tracking</h2>

      <div className="space-y-3">
        <ScoreSlider label="Schlaf" emoji="😴" value={sleep} onChange={setSleep} />
        <ScoreSlider label="Fokus" emoji="🎯" value={focus} onChange={setFocus} />
        <ScoreSlider label="Stimmung" emoji="😊" value={mood} onChange={setMood} />
        <ScoreSlider label="Energie" emoji="⚡" value={energy} onChange={setEnergy} />
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
    </div>
  )
}

export default Tracking
