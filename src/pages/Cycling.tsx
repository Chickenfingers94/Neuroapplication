import React from 'react'
import { CyclingCalendar } from '../components/cycling/CyclingCalendar'
import { CyclingStatus } from '../hooks/useCycling'
import { PhaseState } from '../hooks/usePhase'
import { formatGermanDate } from '../utils/dateUtils'

interface CyclingProps {
  cycling: CyclingStatus
  phaseState: PhaseState
}

const Cycling: React.FC<CyclingProps> = ({ cycling, phaseState }) => {
  return (
    <div className="px-4 py-4 space-y-4 pb-8">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">🔄 Cycling-Status</h2>
      <p className="text-sm text-gray-400 font-medium">{formatGermanDate(new Date())}</p>

      {!phaseState.startDate ? (
        <div className="bg-yellow-900/30 border border-yellow-700 rounded-xl p-4 text-yellow-300 text-sm">
          ⚠️ Bitte lege zuerst dein Protokoll-Startdatum in den Einstellungen fest.
        </div>
      ) : (
        <>
          <div className="bg-navy-700 rounded-xl border border-white/10 p-4 shadow-lg">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold" style={{ color: phaseState.phase.color }}>
                  {phaseState.phase.phase}
                </div>
                <div className="text-xs text-gray-500 font-medium">Phase</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{phaseState.weekNumber}</div>
                <div className="text-xs text-gray-500 font-medium">Woche</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {Math.min(100, Math.max(0, Math.round((phaseState.weekNumber / 52) * 100)))}%
                </div>
                <div className="text-xs text-gray-500 font-medium">Jahres-Ziel</div>
              </div>
            </div>
          </div>

          <h3 className="font-semibold text-gray-300">Heutiger Cycling-Status</h3>
          <CyclingCalendar cycling={cycling} phase={phaseState.phase.phase} />
        </>
      )}
    </div>
  )
}

export default Cycling
