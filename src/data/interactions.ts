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
    id: 'lsd-5htp',
    level: 'danger',
    condition: 'lsd',
    message: 'Heute KEIN 5-HTP und KEIN Methylenblau!',
    emoji: '❌'
  },
  {
    id: '9mebc-uv',
    level: 'caution',
    condition: '9mebc',
    message: 'UV-Licht meiden! Sonnencreme tragen!',
    emoji: '⚠️'
  },
  {
    id: 'tak-phenyl',
    level: 'danger',
    condition: 'tak653',
    message: 'Heute KEIN Phenylpiracetam!',
    emoji: '❌'
  },
  {
    id: 'phenyl-tak',
    level: 'danger',
    condition: 'phenylpiracetam',
    message: 'Heute KEIN TAK-653!',
    emoji: '❌'
  }
]

export const SYNERGY_NOTES = [
  { id: 'creat-cdp', message: 'Creatin + CDP-Cholin = Energie + ACh Synergie', emoji: '✅' },
  { id: 'lm-dihexa', message: "Lion's Mane + Dihexa = NGF + HGF = maximale Neurogenese", emoji: '✅' }
]
