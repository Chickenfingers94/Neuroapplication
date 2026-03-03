export type WarningLevel = 'danger' | 'caution' | 'synergy'

export interface InteractionWarning {
  id: string
  level: WarningLevel
  condition: string
  message: string
  emoji: string
}

export const INTERACTION_WARNINGS: InteractionWarning[] = [
  {
    id: 'mb-5htp',
    level: 'danger',
    condition: 'methylenblau',
    message: 'Heute KEIN 5-HTP! (Serotonin-Syndrom-Risiko)',
    emoji: '❌'
  },
  {
    id: 'mb-lsd',
    level: 'danger',
    condition: 'methylenblau',
    message: 'Heute KEIN LSD! (Serotonin-Syndrom-Risiko)',
    emoji: '❌'
  },
  {
    id: 'lsd-5htp-mb',
    level: 'danger',
    condition: 'lsd',
    message: 'Heute KEIN 5-HTP und KEIN Methylenblau! (Serotonin-Syndrom)',
    emoji: '❌'
  },
  {
    id: '9mebc-uv',
    level: 'caution',
    condition: '9mebc',
    message: 'UV-Licht strikt meiden! Sonnencreme + bedeckte Haut',
    emoji: '⚠️'
  },
  {
    id: 'tak-phenyl',
    level: 'danger',
    condition: 'tak653',
    message: 'Heute KEIN Phenylpiracetam! (Glutamat-Überlast)',
    emoji: '❌'
  },
  {
    id: 'phenyl-tak',
    level: 'danger',
    condition: 'phenylpiracetam',
    message: 'Heute KEIN TAK-653! (Glutamat-Überlast)',
    emoji: '❌'
  },
  {
    id: 'zink-eisen',
    level: 'caution',
    condition: 'zink',
    message: 'Zink nicht gleichzeitig mit Eisenpräparaten nehmen! (Absorptionskonkurrenz)',
    emoji: '⚠️'
  },
  {
    id: '5htp-daily',
    level: 'caution',
    condition: '5htp',
    message: '5-HTP max 3x/Woche! Tägliche Einnahme → 5-HT-Rezeptor-Downregulation',
    emoji: '⚠️'
  },
  {
    id: 'bromantane-long',
    level: 'caution',
    condition: 'bromantane',
    message: 'Bromantane max 8 Wochen täglich! Toleranzentwicklung möglich',
    emoji: '⚠️'
  }
]

export const SYNERGY_NOTES = [
  { id: 'creat-cdp', message: 'Creatin + CDP-Cholin = Energie + ACh Synergie', emoji: '✅' },
  { id: 'lm-dihexa', message: "Lion's Mane + Dihexa = NGF + HGF = maximale Neurogenese", emoji: '✅' },
  { id: 'nac-vitc', message: 'NAC + Vitamin C = maximale Antioxidans-Synergie', emoji: '✅' },
  { id: 'ltheanin-koffein', message: 'L-Theanin + Koffein = optimaler Fokus-Stack', emoji: '✅' },
  { id: 'sport-lm', message: "Sport + Lion's Mane = BDNF + NGF Turbo für Neurogenese", emoji: '✅' },
  { id: 'mg-schlaf', message: 'Magnesium + Passionsblume + L-Theanin = sicherer Schlaf-Stack', emoji: '✅' }
]
