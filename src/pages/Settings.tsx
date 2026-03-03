import React, { useState, useEffect } from 'react'
import { getSetting, setSetting, exportAllData, importAllData } from '../db/database'
import { formatShortGermanDate } from '../utils/dateUtils'

const Settings: React.FC = () => {
  const [startDate, setStartDate] = useState('')
  const [saved, setSaved] = useState(false)
  const [importStatus, setImportStatus] = useState('')

  useEffect(() => {
    getSetting('protocolStartDate').then(v => { if (v) setStartDate(v) })
  }, [])

  const handleSaveDate = async () => {
    await setSetting('protocolStartDate', startDate)
    setSaved(true)
    setTimeout(() => { setSaved(false); window.location.reload() }, 1500)
  }

  const handleExport = async () => {
    const data = await exportAllData()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `neurostack-backup-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const text = await file.text()
      const data = JSON.parse(text) as Record<string, unknown>
      await importAllData(data)
      setImportStatus('✅ Import erfolgreich!')
      setTimeout(() => { setImportStatus(''); window.location.reload() }, 2000)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      setImportStatus(`❌ Import fehlgeschlagen: ${msg}`)
    }
  }

  return (
    <div className="px-4 py-4 space-y-5 pb-8">
      <h2 className="text-xl font-extrabold text-white flex items-center gap-2">⚙️ Einstellungen</h2>

      {/* Protocol start date */}
      <div className="bg-navy-700/80 rounded-2xl border border-white/5 p-4 space-y-3">
        <h3 className="font-bold text-white flex items-center gap-2 text-sm uppercase tracking-wide">📅 Protokoll-Startdatum</h3>
        <p className="text-sm text-gray-400 leading-relaxed">Lege fest, wann du mit dem NeuroStack-Protokoll begonnen hast. Dies bestimmt deine aktuelle Phase und den Cycling-Status.</p>
        {startDate && (
          <p className="text-sm text-blue-400 font-medium">Aktuell: {formatShortGermanDate(new Date(startDate + 'T12:00:00'))}</p>
        )}
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          className="w-full bg-navy-900/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500/60 focus:outline-none transition-colors [color-scheme:dark]"
        />
        <button
          onClick={handleSaveDate}
          className={`w-full py-3.5 rounded-xl font-bold transition-all duration-200 ${
            saved
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white active:scale-[0.98]'
          }`}
        >
          {saved ? '✅ Gespeichert!' : '💾 Datum speichern'}
        </button>
      </div>

      {/* Phase timeline */}
      <div className="bg-navy-700/80 rounded-2xl border border-white/5 p-4 space-y-3">
        <h3 className="font-bold text-white flex items-center gap-2 text-sm uppercase tracking-wide">📈 Phasen-Fortschritt</h3>
        <div className="flex items-center gap-2 mt-1">
          {[
            { label: 'Phase 1', sub: 'Woche 1–4', color: '#4361ee' },
            { label: 'Phase 2', sub: 'Woche 5–12', color: '#f59e0b' },
            { label: 'Phase 3', sub: 'Woche 13+', color: '#ef4444' },
          ].map((p, i) => (
            <React.Fragment key={p.label}>
              <div className="flex-1 text-center">
                <div
                  className="w-8 h-8 rounded-full mx-auto flex items-center justify-center text-white text-xs font-bold mb-1"
                  style={{ backgroundColor: p.color }}
                >
                  {i + 1}
                </div>
                <div className="text-xs text-white font-medium">{p.label}</div>
                <div className="text-xs text-gray-600">{p.sub}</div>
              </div>
              {i < 2 && <div className="flex-shrink-0 w-6 h-0.5 bg-white/10 mt-[-12px]" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Data backup */}
      <div className="bg-navy-700/80 rounded-2xl border border-white/5 p-4 space-y-3">
        <h3 className="font-bold text-white flex items-center gap-2 text-sm uppercase tracking-wide">💾 Daten-Backup</h3>
        <p className="text-sm text-gray-400 leading-relaxed">Exportiere alle Daten als JSON-Datei oder importiere ein Backup.</p>

        <button
          onClick={handleExport}
          className="w-full py-4 rounded-xl font-semibold bg-navy-800/80 hover:bg-navy-600/60 text-white border border-white/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span>📤</span> Daten exportieren (JSON)
        </button>

        <label className="block">
          <span className="sr-only">Backup importieren</span>
          <div className="w-full py-4 rounded-xl font-semibold bg-navy-800/80 hover:bg-navy-600/60 text-white border border-white/10 text-center cursor-pointer transition-all active:scale-[0.98] flex items-center justify-center gap-2">
            <span>📥</span> Backup importieren
          </div>
          <input type="file" accept=".json" onChange={handleImport} className="sr-only" />
        </label>
        {importStatus && <p className="text-sm text-center font-medium">{importStatus}</p>}
      </div>

      {/* About */}
      <div className="bg-navy-700/80 rounded-2xl border border-white/5 p-4 space-y-2">
        <h3 className="font-bold text-white flex items-center gap-2 text-sm uppercase tracking-wide">ℹ️ Über NeuroStack</h3>
        <p className="text-sm text-gray-400 font-semibold">Version 1.0.0</p>
        <p className="text-sm text-gray-400 leading-relaxed">Persönlicher Biohacking & Supplement-Protokoll-Tracker basierend auf einem neurobiologischen Masterplan in 3 Phasen.</p>
        <div className="text-xs text-gray-500 mt-3 space-y-1.5">
          <p>🏗️ Phase 1 (Wochen 1-4): Fundament</p>
          <p>⚡ Phase 2 (Wochen 5-12): Aufbau</p>
          <p>🚀 Phase 3 (Woche 13+): Optimierung</p>
        </div>
        <p className="text-xs text-red-400/80 mt-3 leading-relaxed">⚠️ Diese App ersetzt keine medizinische Beratung. Konsultiere einen Arzt vor der Einnahme von Supplements.</p>
      </div>
    </div>
  )
}

export default Settings
