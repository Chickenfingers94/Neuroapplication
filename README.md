# 🧠 NeuroStack Tracker

A Progressive Web App (PWA) for tracking a personal biohacking & supplement protocol across 3 phases.

> ⚠️ **Medizinischer Hinweis / Medical Disclaimer:** Diese App ist kein medizinischer Rat. Konsultiere einen Arzt vor der Einnahme von Supplements. Eigenverantwortung und Selbstbeobachtung sind essenziell. / This app does not replace medical advice. Consult a doctor before taking any supplements.

## Features

- **📋 Daily Checklist** – Phase-aware supplement tracking with cycling logic and strategy modes
- **📊 Tracking Dashboard** – Score sleep, focus, mood, energy + lifestyle habits (training, meditation, cold shower, sunlight, smoking)
- **🏆 Habit Streaks** – No-smoking, meditation, cold shower streaks + weekly training frequency
- **🔄 Cycling Dashboard** – Visual status for all cycled substances
- **📅 Calendar** – Month view with tracking data markers; click any day to see supplement and log status
- **✅ ToDo List** – Create, complete, delete tasks with priority levels (low/medium/high) and due dates
- **🧠 Knowledge Base** – Searchable supplement database with mechanisms
- **⚙️ Settings** – Protocol start date, strategy mode (Conservative vs Experimental), JSON export/import
- **🧬 Strategy Modes:**
  - 🛡️ **Conservative** – No Dihexa; safe, evidence-backed protocol
  - ⚗️ **Experimental** – Dihexa included with disclaimers; for experienced users only
- **⚠️ Conflict Checker** – Real-time interaction warnings, caution notes, and synergy highlights
- **📱 PWA** – Installable, offline-capable, mobile-optimized

## Tech Stack

- React 18 + TypeScript (strict mode)
- Vite + vite-plugin-pwa
- Tailwind CSS (custom navy/accent palette)
- Dexie v3 (IndexedDB with migrations)
- Recharts
- Docker + Nginx

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Docker

```bash
docker-compose up -d
```

## Protocol Phases

| Phase | Weeks | Focus |
|-------|-------|-------|
| 🏗️ Phase 1 | 1–4 | Foundation supplements (Multivitamin, D3+K2, Creatin, NAC, Omega-3…) |
| ⚡ Phase 2 | 5–12 | Cognitive enhancement + cycling (CDP-Cholin, Methylenblau, Bromantane) |
| 🚀 Phase 3 | 13+ | Advanced nootropics (9-Me-BC, Phenylpiracetam, TAK-653, LSD microdose) |

## Interaction Rules

| Rule | Level | Condition |
|------|-------|-----------|
| No 5-HTP with Methylenblau | ❌ Danger | Serotonin syndrome |
| No LSD with Methylenblau | ❌ Danger | Serotonin syndrome |
| No 5-HTP or MB with LSD | ❌ Danger | Serotonin syndrome |
| No Phenylpiracetam with TAK-653 | ❌ Danger | Glutamate overload |
| 9-Me-BC UV protection required | ⚠️ Caution | Photosensitivity |
| 5-HTP max 3x/week | ⚠️ Caution | Receptor downregulation |
| Bromantane max 8 weeks | ⚠️ Caution | Tolerance |

## Database Versions

- **v1** – Initial schema (dailyLogs, checklistCompletions, settings)
- **v2** – Extended DailyLog with training, smoking, sunlight, meditation, coldShower fields
- **v3** – Added todos table

