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
  const yearProgress = Math.round((phaseState.weekNumber / 52) * 100)

  return (
    <div className="px-4 py-4 space-y-4 pb-8">
      <h2 className="text-xl font-extrabold text-white flex items-center gap-2">🔄 Cycling-Status</h2>
      <p className="text-sm text-gray-500">{formatGermanDate(new Date())}</p>

      {!phaseState.startDate ? (
        <div className="bg-gradient-to-r from-amber-900/40 to-amber-950/20 border border-amber-700/40 rounded-2xl p-4 text-amber-300 text-sm leading-relaxed">
          ⚠️ Bitte lege zuerst dein Protokoll-Startdatum in den Einstellungen fest.
        </div>
      ) : (
        <>
          <div className="bg-navy-700/80 rounded-2xl border border-white/5 p-4">
            <div className="grid grid-cols-3 gap-4 text-center mb-4">
              <div>
                <div
                  className="text-3xl font-extrabold"
                  style={{ color: phaseState.phase.color, textShadow: `0 0 20px ${phaseState.phase.color}60` }}
                >
                  {phaseState.phase.phase}
                </div>
                <div className="text-xs text-gray-500 mt-1">Phase</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-white">{phaseState.weekNumber}</div>
                <div className="text-xs text-gray-500 mt-1">Woche</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-white">{yearProgress}%</div>
                <div className="text-xs text-gray-500 mt-1">Jahres-Ziel</div>
              </div>
            </div>
            {/* Year progress bar */}
            <div className="w-full bg-navy-900/80 rounded-full h-2 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-400 transition-all duration-700"
                style={{ width: `${yearProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>Phase 1</span>
              <span>Phase 2</span>
              <span>Phase 3</span>
            </div>
          </div>

          <h3 className="font-bold text-gray-200 text-sm uppercase tracking-wide">Heutiger Cycling-Status</h3>
          <CyclingCalendar cycling={cycling} phase={phaseState.phase.phase} />
        </>
      )}
    </div>
  )
}

export default Cycling
