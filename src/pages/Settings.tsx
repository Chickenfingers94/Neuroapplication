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
    <div className="px-4 py-4 space-y-6 pb-8">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">⚙️ Einstellungen</h2>

      <div className="bg-navy-700 rounded-xl border border-gray-700 p-4 space-y-3">
        <h3 className="font-semibold text-white flex items-center gap-2">📅 Protokoll-Startdatum</h3>
        <p className="text-sm text-gray-400">Lege fest, wann du mit dem NeuroStack-Protokoll begonnen hast. Dies bestimmt deine aktuelle Phase und den Cycling-Status.</p>
        {startDate && (
          <p className="text-sm text-blue-400">Aktuell: {formatShortGermanDate(new Date(startDate + 'T12:00:00'))}</p>
        )}
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          className="w-full bg-navy-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
        />
        <button
          onClick={handleSaveDate}
          className={`w-full py-3 rounded-xl font-bold transition-all ${saved ? 'bg-green-600' : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-600/30 active:scale-95'} text-white`}
        >
          {saved ? '✅ Gespeichert!' : '💾 Datum speichern'}
        </button>
      </div>

      <div className="bg-navy-700 rounded-xl border border-gray-700 p-4 space-y-3">
        <h3 className="font-semibold text-white flex items-center gap-2">💾 Daten-Backup</h3>
        <p className="text-sm text-gray-400">Exportiere alle Daten als JSON-Datei oder importiere ein Backup.</p>

        <button
          onClick={handleExport}
          className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white transition-all active:scale-95"
        >
          📤 Daten exportieren (JSON)
        </button>

        <label className="block">
          <span className="sr-only">Backup importieren</span>
          <div className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white text-center cursor-pointer transition-all active:scale-95">
            📥 Backup importieren
          </div>
          <input type="file" accept=".json" onChange={handleImport} className="sr-only" />
        </label>
        {importStatus && <p className="text-sm text-center">{importStatus}</p>}
      </div>

      <div className="bg-navy-700 rounded-xl border border-gray-700 p-4 space-y-2">
        <h3 className="font-semibold text-white flex items-center gap-2">ℹ️ Über NeuroStack</h3>
        <p className="text-sm text-gray-400">Version 1.0.0</p>
        <p className="text-sm text-gray-400">Persönlicher Biohacking & Supplement-Protokoll-Tracker basierend auf einem neurobiologischen Masterplan in 3 Phasen.</p>
        <div className="text-xs text-gray-500 mt-3 space-y-1">
          <p>Phase 1 (Wochen 1-4): Fundament 🏗️</p>
          <p>Phase 2 (Wochen 5-12): Aufbau ⚡</p>
          <p>Phase 3 (Woche 13+): Optimierung 🚀</p>
        </div>
        <p className="text-xs text-red-400 mt-3">⚠️ Diese App ersetzt keine medizinische Beratung. Konsultiere einen Arzt vor der Einnahme von Supplements.</p>
      </div>
    </div>
  )
}

export default Settings
