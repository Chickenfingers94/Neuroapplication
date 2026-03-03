export type SupplementCategory = 'Grundversorgung' | 'Neurorestorative' | 'Nootropikum' | 'Schlaf'
export type Phase = 1 | 2 | 3

export interface Supplement {
  id: string
  name: string
  dose: string
  category: SupplementCategory
  phase: Phase
  timeOfDay: ('nüchtern' | 'morgens' | 'nachmittags' | 'abends')[]
  mechanism: string
  effects: string
  cycling?: string
  interactions?: string[]
  daysOfWeek?: number[]
  emoji: string
  color: string
  isOptional?: boolean
  timingNote?: string
  criticalNote?: string
  riskLevel?: 'safe' | 'monitored' | 'experimental' | 'research-only'
  synergiesWith?: string[]
}

export const SUPPLEMENTS: Supplement[] = [
  {
    id: 'multivitamin',
    name: 'Multivitamin',
    dose: '1 Kapsel',
    category: 'Grundversorgung',
    phase: 1,
    timeOfDay: ['morgens'],
    mechanism: 'Deckt Mikronährstoff-Defizite ab, unterstützt Hunderte enzymatische Prozesse im Gehirn und Körper.',
    effects: 'Basis-Nährstoffversorgung, verhindert Mangelzustände',
    emoji: '💊',
    color: '#4361ee'
  },
  {
    id: 'vitamin-d3-k2',
    name: 'Vitamin D3 + K2',
    dose: '5.600 IU + 200µg K2 (1 Kapsel TÄGLICH)',
    category: 'Grundversorgung',
    phase: 1,
    timeOfDay: ['morgens'],
    mechanism: 'D3 ist eigentlich ein Hormon – reguliert über 1000 Gene. K2 sorgt für korrekte Calcium-Verteilung (Knochen statt Arterien). Laut Etikett: 1 Kapsel = Dreitagesportion, aber für dieses Protokoll TÄGLICH einnehmen (5.600 IU ist weit unter toxischer Grenze von 10.000 IU).',
    effects: 'Immunsystem, Stimmung, Hormonbalance, Knochengesundheit',
    timingNote: 'Mit fetthaltigem Frühstück. TÄGLICH statt alle 3 Tage!',
    riskLevel: 'safe',
    emoji: '☀️',
    color: '#f59e0b'
  },
  {
    id: 'creatin',
    name: 'Creatin',
    dose: '5g',
    category: 'Neurorestorative',
    phase: 1,
    timeOfDay: ['morgens'],
    mechanism: 'Erhöht Phosphocreatinspeicher im Gehirn → mehr ATP-Verfügbarkeit → bessere kognitive Ausdauer und Neuroprotektivität.',
    effects: 'Kognitive Ausdauer, Neuroprotektion, Muskelkraft',
    emoji: '⚡',
    color: '#10b981'
  },
  {
    id: 'nac',
    name: 'NAC',
    dose: '600mg (morgens)',
    category: 'Neurorestorative',
    phase: 1,
    timeOfDay: ['morgens'],
    mechanism: 'N-Acetylcystein ist eine Glutathion-Vorstufe. Glutathion ist das wichtigste zelluläre Antioxidans – schützt Neuronen vor oxidativem Stress. 600mg 1x/Tag ist subtherapeutisch für Glutamat-Regulation (LaRowe et al., 2007). Zweite Abenddosis als separate Ergänzung empfohlen.',
    effects: 'Antioxidativer Schutz, Entgiftung, Stimmungsstabilisierung',
    riskLevel: 'safe',
    emoji: '🛡️',
    color: '#10b981'
  },
  {
    id: 'vitamin-c-morgens',
    name: 'Vitamin C (Morgens)',
    dose: '~400mg',
    category: 'Grundversorgung',
    phase: 1,
    timeOfDay: ['morgens'],
    mechanism: 'Cofaktor für Kollagensynthese und Neurotransmitter-Produktion (Dopamin, Noradrenalin). Regeneriert Vitamin E.',
    effects: 'Immunschutz, Neurotransmitter-Synthese, Antioxidans',
    emoji: '🍊',
    color: '#f59e0b'
  },
  {
    id: 'zink',
    name: 'Zink',
    dose: '10-15mg (separates Zink)',
    category: 'Grundversorgung',
    phase: 1,
    timeOfDay: ['nachmittags'],
    daysOfWeek: [1, 3, 5],
    mechanism: 'Cofaktor für über 300 Enzyme. Wichtig für Testosteron-Synthese, Immunfunktion und NMDA-Rezeptor-Modulation.',
    effects: 'Hormonbalance, Immunsystem, kognitive Funktion',
    timingNote: 'NACHMITTAGS nehmen! ≥2h nach Multi (enthält Eisen → DMT1-Transporter-Konkurrenz). Multi enthält bereits 14mg Zink → Gesamtdosis 24-29mg.',
    emoji: '🔩',
    color: '#6b7280'
  },
  {
    id: 'omega3',
    name: 'Omega-3',
    dose: '2-3g EPA+DHA',
    category: 'Neurorestorative',
    phase: 1,
    timeOfDay: ['morgens'],
    mechanism: 'EPA und DHA sind Baubausteine für Zellmembranen im Gehirn. DHA macht 20% der Gehirnfettsäuren aus (40% bezieht sich nur auf PUFAs der grauen Substanz) – essentiell für neuronale Funktion.',
    effects: 'Zellmembran-Integrität, Entzündungshemmung, Stimmung, Kognition',
    emoji: '🐟',
    color: '#4361ee'
  },
  {
    id: 'vitamin-c-nachmittags',
    name: 'Vitamin C (Nachmittags)',
    dose: '~400mg',
    category: 'Grundversorgung',
    phase: 1,
    timeOfDay: ['nachmittags'],
    mechanism: 'Zweite Tagesdosis für kontinuierliche Spiegel – Vitamin C hat kurze Halbwertszeit von ~2h.',
    effects: 'Kontinuierlicher Antioxidativer Schutz',
    emoji: '🍊',
    color: '#f59e0b'
  },
  {
    id: 'ltheanin-nachmittags',
    name: 'L-Theanin (Nachmittags)',
    dose: '200mg',
    category: 'Nootropikum',
    phase: 1,
    timeOfDay: ['nachmittags'],
    mechanism: 'Strukturanalogon von Glutamat und GABA. Erhöht Alpha-Gehirnwellen → ruhige Wachheit ohne Sedierung. Synergistisch mit Koffein.',
    effects: 'Ruhige Konzentration, Stressreduktion, Alpha-Wellen',
    emoji: '🍵',
    color: '#10b981'
  },
  {
    id: 'lionsmane',
    name: "Lion's Mane",
    dose: '2000mg',
    category: 'Neurorestorative',
    phase: 1,
    timeOfDay: ['nachmittags'],
    mechanism: 'Hericenone und Erinacin stimulieren NGF (Nerve Growth Factor) → fördert Neurogenese und Myelinisierung. Einziger bekannter oraler NGF-Booster.',
    effects: 'Neurogenese, Gedächtnis, kognitive Klarheit, Stimmung',
    emoji: '🦁',
    color: '#f59e0b'
  },
  {
    id: 'magnesium',
    name: 'Magnesium-Komplex',
    dose: '400mg',
    category: 'Schlaf',
    phase: 1,
    timeOfDay: ['abends'],
    mechanism: '7-Fach-Komplex: Citrat, Oxid, Bisglycinat, Malat, Lactat, L-Lysinat, L-Ascorbat. Bisglycinat überquert BHS für GABA-Modulation. Oxid hat schlechte Bioverfügbarkeit (4%), wird durch die anderen 6 Formen kompensiert. Für maximale kognitive Wirkung: Mg-L-Threonat als Ergänzung empfohlen.',
    effects: 'Schlafqualität, Muskelentspannung, Stressreduktion, Neuroprotektion',
    emoji: '🧲',
    color: '#6b7280'
  },
  {
    id: 'passionsblume',
    name: 'Passionsblumenextrakt',
    dose: '750mg',
    category: 'Schlaf',
    phase: 1,
    timeOfDay: ['abends'],
    mechanism: 'Chrysin und andere Flavonoide modulieren GABA-A-Rezeptoren → anxiolytisch und sedierend ohne Benzodiazepine-Nebenwirkungen.',
    effects: 'Angstlösung, Schlafeinleitung, Muskelentspannung',
    emoji: '🌺',
    color: '#8b5cf6'
  },
  {
    id: 'ltheanin-abends',
    name: 'L-Theanin (Abends)',
    dose: '200mg',
    category: 'Schlaf',
    phase: 1,
    timeOfDay: ['abends'],
    mechanism: 'Abendliche Dosis erhöht GABA und Serotonin → fördert Entspannung und Schlafübergang.',
    effects: 'Schlafübergang, Gedankenberuhigung',
    emoji: '🍵',
    color: '#10b981'
  },
  {
    id: '5htp',
    name: '5-HTP + Grüntee',
    dose: '150mg + 250mg',
    category: 'Schlaf',
    phase: 1,
    timeOfDay: ['abends'],
    isOptional: true,
    mechanism: '5-HTP ist direkter Serotonin-Vorläufer. Grüntee-Extrakt (EGCG) hemmt die periphere Konversion → mehr 5-HTP gelangt ins Gehirn.',
    effects: 'Stimmungsverbesserung, Schlaftiefe, Serotonin-Boost',
    cycling: 'Max 3x/Woche (nicht täglich wegen Tachyphylaxie)',
    interactions: ['methylenblau', 'lsd'],
    emoji: '🌿',
    color: '#10b981'
  },
  {
    id: 'l-tyrosin',
    name: 'L-Tyrosin',
    dose: '500-1000mg',
    category: 'Neurorestorative',
    phase: 1,
    timeOfDay: ['nüchtern'],
    mechanism: 'Direkter Precursor der Catecholamin-Kaskade: L-Tyrosin → (TH + BH4) → L-DOPA → (AADC + P5P) → Dopamin → Noradrenalin. KRITISCHE Synergie mit Bromantane (TH-Upregulation braucht Substrat) und 9-Me-BC. Nüchtern einnehmen – LAT1-Transporter-Konkurrenz mit anderen Aminosäuren.',
    effects: 'Dopamin/NE-Precursor, Bromantane-Synergie, kognitive Belastbarkeit, Stressresistenz',
    cycling: 'Täglich. An 9-Me-BC-Tagen auf 500mg reduzieren',
    interactions: ['9mebc'],
    synergiesWith: ['bromantane', 'b-komplex'],
    timingNote: 'NÜCHTERN, 30min vor Frühstück',
    riskLevel: 'safe',
    emoji: '🧪',
    color: '#f59e0b'
  },
  {
    id: 'b-komplex',
    name: 'Methylierter B-Komplex',
    dose: 'P5P 25mg + 5-MTHF 400µg + Methylcobalamin 1000µg',
    category: 'Grundversorgung',
    phase: 1,
    timeOfDay: ['abends'],
    mechanism: 'Korrigiert kritischen Engpass im Multi (Pyridoxin statt P5P, Folsäure statt Methylfolat, Cyanocobalamin statt Methylcobalamin). P5P = aktive B6-Form, Co-Faktor für AADC (konvertiert 5-HTP→Serotonin und L-DOPA→Dopamin). Methylfolat + Methylcobalamin = Methylierungszyklus → SAMe → NT-Methylierung. 30-40% der Bevölkerung haben MTHFR-Polymorphismus.',
    effects: 'NT-Synthese-Cofaktoren, Methylierungszyklus, Homocystein-Senkung',
    criticalNote: 'Ohne korrekte B-Vitamine können weder 5-HTP noch L-Tyrosin effizient zu Serotonin bzw. Dopamin konvertiert werden.',
    riskLevel: 'safe',
    emoji: '🧬',
    color: '#8b5cf6'
  },
  {
    id: 'taurin',
    name: 'Taurin',
    dose: '1-2g',
    category: 'Neurorestorative',
    phase: 1,
    timeOfDay: ['morgens'],
    mechanism: 'Sulfonierte Aminosäure mit GABAerger Modulation, osmoprotektiver und antioxidativer Wirkung. Schützt vor Glutamat-Exzitotoxizität (synergistisch mit NAC).',
    effects: 'Neuroprotektiv, GABAerg, antioxidativ, Glutamat-Schutz',
    synergiesWith: ['nac'],
    riskLevel: 'safe',
    emoji: '🔋',
    color: '#10b981'
  },
  {
    id: 'nac-abends',
    name: 'NAC (Abends)',
    dose: '600mg',
    category: 'Neurorestorative',
    phase: 1,
    timeOfDay: ['abends'],
    mechanism: 'Zweite Tagesdosis für therapeutische Glutamat-Regulation via System Xc-. 600mg 1x/Tag ist subtherapeutisch nach Substanzmissbrauch. Klinische Studien verwenden 1200-2400mg/Tag.',
    effects: 'Glutamat-Normalisierung, kontinuierlicher Glutathion-Schutz',
    riskLevel: 'safe',
    emoji: '🛡️',
    color: '#10b981'
  },
  {
    id: 'phosphatidylserin',
    name: 'Phosphatidylserin',
    dose: '100-200mg',
    category: 'Schlaf',
    phase: 1,
    timeOfDay: ['abends'],
    isOptional: true,
    mechanism: 'Senkt abendliches Cortisol (HPA-Achsen-Modulation), verbessert Membranfluidität synergistisch mit Omega-3/DHA.',
    effects: 'Cortisol-Senkung abends, Membranreparatur, Schlafverbesserung',
    synergiesWith: ['omega3'],
    riskLevel: 'safe',
    emoji: '🌙',
    color: '#6b7280'
  },
  {
    id: 'cdp-cholin',
    name: 'CDP-Cholin',
    dose: '500mg',
    category: 'Nootropikum',
    phase: 2,
    timeOfDay: ['morgens'],
    mechanism: 'Doppelwirkung: erhöht Acetylcholin (Lernen/Gedächtnis) UND ist Vorläufer für Phosphatidylcholin (Zellmembranen). Synergistisch mit Creatin.',
    effects: 'Fokus, Arbeitsgedächtnis, Lernfähigkeit, Neurogenese',
    emoji: '🧠',
    color: '#f59e0b'
  },
  {
    id: 'methylenblau',
    name: 'Methylenblau',
    dose: '0.5mg',
    category: 'Neurorestorative',
    phase: 2,
    timeOfDay: ['morgens'],
    daysOfWeek: [1, 4],
    mechanism: 'Mitochondrialer Elektronenträger → verbessert Atmungskette-Effizienz. Schwacher MAO-Hemmer. Bei niedrigen Dosen Hormesis-Effekt.',
    effects: 'Mitochondriale Funktion, Energie, kognitive Klarheit',
    cycling: 'Nur Mo + Do',
    interactions: ['5htp', 'lsd', '9mebc'],
    riskLevel: 'monitored',
    emoji: '🔵',
    color: '#4361ee'
  },
  {
    id: 'bromantane',
    name: 'Bromantane',
    dose: '50-100mg',
    category: 'Nootropikum',
    phase: 2,
    timeOfDay: ['nachmittags'],
    daysOfWeek: [1, 2, 3, 4, 5],
    mechanism: 'Actoprotector – erhöht Hitzeschockproteine und antioxidative Enzyme. Upreguliert Tyrosin-Hydroxylase (TH) – das Schlüsselenzym der Dopamin-Synthese. KRITISCHE Synergie mit L-Tyrosin als Substrat. Adaptogen-Wirkung.',
    effects: 'Ausdauer, Stressresistenz, Dopamin-Modulation, keine Toleranz',
    cycling: '5 Tage an / 2 Tage aus (Wochenende), 4 Wochen an / 1 Woche Pause',
    synergiesWith: ['l-tyrosin'],
    riskLevel: 'monitored',
    emoji: '🔶',
    color: '#f59e0b'
  },
  {
    id: 'phenylpiracetam',
    name: 'Phenylpiracetam Hydrazide',
    dose: '100mg',
    category: 'Nootropikum',
    phase: 3,
    timeOfDay: ['morgens'],
    mechanism: 'Stärkstes Racetam – erhöht Acetylcholin und Dopamin/Noradrenalin. Phenyl-Gruppe verbessert Blut-Hirn-Schranken-Durchlass massiv.',
    effects: 'Extreme Fokus, Energie, Lernkapazität, Motivation',
    cycling: '2-3x/Woche an Lerntagen, nie täglich (schnelle Toleranzentwicklung)',
    interactions: ['tak653'],
    riskLevel: 'experimental',
    emoji: '🚀',
    color: '#ef4444'
  },
  {
    id: '9mebc',
    name: '9-Me-BC',
    dose: '15mg',
    category: 'Neurorestorative',
    phase: 3,
    timeOfDay: ['morgens'],
    mechanism: 'Beta-Carbolin – hemmt MAO-A/B → erhöht Dopamin, Serotonin, Noradrenalin. Stimuliert Neurogenese im Hippocampus. Lichtempfindlichkeit als Nebenwirkung.',
    effects: 'Neurogenese, Dopamin-Boost, Stimmung, Kognition',
    cycling: '2 Wochen an (2x/Woche: Di+Fr) → 4 Wochen Pause',
    interactions: ['uv', 'methylenblau', 'lsd'],
    riskLevel: 'experimental',
    emoji: '🌱',
    color: '#10b981'
  },
  {
    id: 'dihexa',
    name: 'Dihexa',
    dose: '10mg',
    category: 'Neurorestorative',
    phase: 3,
    timeOfDay: ['morgens'],
    mechanism: '⚠️ Experimentell – begrenzte Humandaten. Nur mit strenger Selbstbeobachtung! HGF/c-Met-Agonist – aktiviert Hepatocyte Growth Factor → starke Synaptogenese. 7 Millionen Mal potenter als BDNF. Permanente Gedächtnisverbesserung möglich.',
    effects: 'Maximale Neurogenese, Synaptogenese, Langzeitgedächtnis',
    cycling: '4 Wochen an → 4 Wochen Pause',
    criticalNote: '⚠️ HGF/c-Met Pathway ist onkogen – regelmäßige Hautuntersuchung empfohlen. Keinerlei Humandaten vorhanden.',
    riskLevel: 'research-only',
    emoji: '💎',
    color: '#ef4444'
  },
  {
    id: 'lsd',
    name: 'LSD Mikrodosis',
    dose: '10µg',
    category: 'Nootropikum',
    phase: 3,
    timeOfDay: ['morgens'],
    mechanism: '5-HT2A-Agonist – Neuroplastizität, BDNF-Erhöhung, Default-Mode-Network-Unterbrechung. Fadiman-Protokoll für kognitive Verbesserung ohne psychedelische Effekte.',
    effects: 'Kreativität, Verbindungsdenken, Flow-Zustände, Neuroplastizität',
    cycling: 'Fadiman: 1 Tag an → 2 Tage aus',
    interactions: ['methylenblau', '5htp', '9mebc'],
    riskLevel: 'experimental',
    emoji: '🌈',
    color: '#8b5cf6'
  },
  {
    id: 'tak653',
    name: 'TAK-653',
    dose: '1mg',
    category: 'Nootropikum',
    phase: 3,
    timeOfDay: ['morgens'],
    mechanism: 'AMPA-Rezeptor Positive Allosteric Modulator (PAM) – verstärkt glutamaterge Übertragung → verbessert synaptische Plastizität und LTP (Langzeitpotenzierung).',
    effects: 'Synaptische Plastizität, Lernen, Gedächtniskonsolidierung',
    cycling: 'Max 3x/Woche an Lerntagen, ab Woche 16',
    interactions: ['phenylpiracetam', '9mebc', 'methylenblau'],
    timingNote: 'Frühestens ab Woche 16. In Kombi IMMER 1mg, nie 2mg.',
    riskLevel: 'research-only',
    emoji: '⚗️',
    color: '#ef4444'
  }
]

export function getSupplementById(id: string): Supplement | undefined {
  return SUPPLEMENTS.find(s => s.id === id)
}

export function getSupplementsByPhase(phase: Phase): Supplement[] {
  return SUPPLEMENTS.filter(s => s.phase <= phase)
}
