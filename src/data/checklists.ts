export interface RoutineItem {
  id: string
  label: string
  emoji: string
  optional?: boolean
}

export interface RoutineChecklist {
  id: string
  title: string
  emoji: string
  items: RoutineItem[]
}

export const MORNING_ROUTINE: RoutineChecklist = {
  id: 'morning',
  title: 'Morgen-Routine',
  emoji: '☀️',
  items: [
    { id: 'wake-same-time', label: 'Aufgewacht zur gleichen Zeit', emoji: '⏰' },
    { id: 'sunlight', label: '30min Sonnenlicht', emoji: '🌞' },
    { id: 'cold-shower', label: 'Kalte Dusche (letzte 2-3min)', emoji: '🚿' },
    { id: 'fatty-breakfast', label: 'Fetthaltiges Frühstück', emoji: '🥑' },
    { id: 'supplements-taken', label: 'Supplements eingenommen', emoji: '💊' },
    { id: 'journal-sleep-mood', label: 'Journal-Eintrag: Schlaf/Stimmung', emoji: '📓' },
    { id: 'no-nicotine', label: 'Kein Nikotin ✓', emoji: '🚭' }
  ]
}

export const EVENING_ROUTINE: RoutineChecklist = {
  id: 'evening',
  title: 'Abend-Routine',
  emoji: '🌙',
  items: [
    { id: 'evening-supplements', label: 'Abend-Supplements eingenommen', emoji: '💊' },
    { id: 'no-bluelight', label: 'Blaulicht aus (1h vor Schlaf)', emoji: '📵' },
    { id: 'cool-dark-room', label: 'Raum kühl & dunkel', emoji: '🌑' },
    { id: 'journal-focus', label: 'Journal-Eintrag: Fokus, Ergänzungen', emoji: '📓' },
    { id: 'same-bedtime', label: 'Gleiche Schlafenszeit', emoji: '😴' }
  ]
}

export const WEEKLY_REVIEW: RoutineChecklist = {
  id: 'weekly',
  title: 'Wöchentlicher Review',
  emoji: '📋',
  items: [
    { id: 'cycling-checked', label: 'Cycling-Status geprüft', emoji: '🔄' },
    { id: 'no-forbidden-combos', label: 'Keine verbotenen Kombis?', emoji: '✅' },
    { id: 'training-frequency', label: 'Training-Frequenz erreicht?', emoji: '🏋️' },
    { id: 'homelab-project', label: 'Homelab-Projekt der Woche?', emoji: '💻' },
    { id: 'avg-calculated', label: 'Durchschnittswerte berechnet', emoji: '📊' },
    { id: 'improvement-vs-last-week', label: 'Verbesserung vs. letzte Woche?', emoji: '📈' }
  ]
}
