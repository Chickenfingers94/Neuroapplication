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
    level: 'danger',
    condition: '9mebc',
    message: '9-Me-BC Tag: UV-Licht strikt meiden! Neurotoxische Metabolite möglich. Sonnencreme + bedeckte Haut. Tipp: Wintermonate bevorzugt.',
    emoji: '☀️'
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
    message: 'Bromantane max 4 Wochen täglich! Toleranzentwicklung möglich',
    emoji: '⚠️'
  },
  {
    id: '9mebc-mb',
    level: 'danger',
    condition: '9mebc',
    message: 'Heute KEIN Methylenblau! Doppelte MAO-Hemmung → Tyramin-Krise & serotonerge Überaktivierung',
    emoji: '❌'
  },
  {
    id: 'mb-9mebc',
    level: 'danger',
    condition: 'methylenblau',
    message: 'Heute KEIN 9-Me-BC! Doppelte MAO-Hemmung → Serotonin-Syndrom-Risiko',
    emoji: '❌'
  },
  {
    id: '9mebc-lsd',
    level: 'caution',
    condition: '9mebc',
    message: '9-Me-BC + LSD: Erhöhtes Serotonin-Risiko durch MAO-Hemmung + 5-HT2A-Agonismus',
    emoji: '⚠️'
  },
  {
    id: 'ltyrosin-9mebc',
    level: 'caution',
    condition: '9mebc',
    message: 'L-Tyrosin heute auf 500mg reduzieren! MAO-Hemmung + DA-Precursor = Risiko für DA-Akkumulation',
    emoji: '⚠️'
  },
  {
    id: 'dihexa-onkogen',
    level: 'caution',
    condition: 'dihexa',
    message: 'HGF/c-Met Pathway ist onkogen. Regelmäßige Hautuntersuchung empfohlen',
    emoji: '⚠️'
  },
  {
    id: 'tak-9mebc',
    level: 'danger',
    condition: 'tak653',
    message: 'Heute KEIN 9-Me-BC! Glutamat-Überaktivierung + DA-Akkumulation (AMPA-PAM + MAO-Hemmung)',
    emoji: '❌'
  },
  {
    id: '9mebc-tak',
    level: 'danger',
    condition: '9mebc',
    message: 'Heute KEIN TAK-653! Glutamat + DA Überaktivierung (MAO-Hemmung + AMPA-PAM)',
    emoji: '❌'
  },
  {
    id: '5htp-ltyrosin',
    level: 'caution',
    condition: '5htp',
    message: '5-HTP + L-Tyrosin nicht gleichzeitig! AADC-Enzym-Konkurrenz → ≥2h Abstand einhalten',
    emoji: '⚠️'
  }
]

export const SYNERGY_NOTES = [
  { id: 'creat-cdp', message: 'Creatin + CDP-Cholin = Energie + ACh Synergie', emoji: '✅' },
  { id: 'lm-dihexa', message: "Lion's Mane + Dihexa = NGF + HGF = maximale Neurogenese", emoji: '✅' },
  { id: 'nac-vitc', message: 'NAC + Vitamin C = maximale Antioxidans-Synergie', emoji: '✅' },
  { id: 'ltheanin-koffein', message: 'L-Theanin + Koffein = optimaler Fokus-Stack', emoji: '✅' },
  { id: 'sport-lm', message: "Sport + Lion's Mane = BDNF + NGF Turbo für Neurogenese", emoji: '✅' },
  { id: 'mg-schlaf', message: 'Magnesium + Passionsblume + L-Theanin = sicherer Schlaf-Stack', emoji: '✅' },
  { id: 'ltyrosin-bromantane', message: 'L-Tyrosin + Bromantane = Substrat + TH-Upregulation = maximale DA-Synthese', emoji: '✅' },
  { id: 'ltyrosin-p5p', message: 'L-Tyrosin + P5P (B6) = Substrat + AADC-Cofaktor = optimierte Catecholamin-Kette', emoji: '✅' },
  { id: 'nac-taurin', message: 'NAC + Taurin = doppelte Glutamat-Protektion + Antioxidans-Synergie', emoji: '✅' },
  { id: 'omega3-ps', message: 'Omega-3 + Phosphatidylserin = synergistische Membranreparatur', emoji: '✅' }
]
