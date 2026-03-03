import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { DailyLog } from '../../db/database'
import { DAYS_SHORT_DE, parseDateString } from '../../utils/dateUtils'

interface TrendChartProps {
  logs: DailyLog[]
  title: string
}

export const TrendChart: React.FC<TrendChartProps> = ({ logs, title }) => {
  const data = logs.slice(-30).map(log => ({
    date: DAYS_SHORT_DE[parseDateString(log.date).getDay()],
    Schlaf: log.sleep,
    Fokus: log.focus,
    Stimmung: log.mood,
    Energie: log.energy
  }))

  if (data.length === 0) {
    return (
      <div className="bg-navy-700 rounded-xl p-6 border border-gray-700 text-center">
        <p className="text-gray-500 text-sm">Noch keine Daten vorhanden. Beginne mit dem täglichen Tracking!</p>
      </div>
    )
  }

  return (
    <div className="bg-navy-700 rounded-xl p-4 border border-gray-700">
      <h3 className="font-semibold text-white mb-3">{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="date" tick={{ fill: '#9ca3af', fontSize: 11 }} />
          <YAxis domain={[1, 10]} tick={{ fill: '#9ca3af', fontSize: 11 }} />
          <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #374151', borderRadius: 8 }} labelStyle={{ color: '#e2e8f0' }} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line type="monotone" dataKey="Schlaf" stroke="#4361ee" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Fokus" stroke="#f59e0b" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Stimmung" stroke="#10b981" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Energie" stroke="#ef4444" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
