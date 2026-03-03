# 🧠 NeuroStack Tracker

A Progressive Web App (PWA) for tracking a personal biohacking & supplement protocol across 3 phases.

## Features

- **📋 Daily Checklist** – Phase-aware supplement tracking with cycling logic
- **📊 Daily Tracking** – Score sleep, focus, mood, and energy (1–10)
- **🔄 Cycling Dashboard** – Visual status for all cycled substances
- **🧠 Knowledge Base** – Searchable supplement database with mechanisms
- **⚙️ Settings** – Protocol start date, JSON export/import backup
- **📱 PWA** – Installable, offline-capable, mobile-optimized

## Tech Stack

- React 18 + TypeScript
- Vite + vite-plugin-pwa
- Tailwind CSS
- Dexie (IndexedDB)
- Recharts
- Docker + Nginx

## Getting Started

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
| 🏗️ Phase 1 | 1–4 | Foundation supplements |
| ⚡ Phase 2 | 5–12 | Cognitive enhancement + cycling |
| 🚀 Phase 3 | 13+ | Advanced nootropics |

> ⚠️ This app does not replace medical advice. Consult a doctor before taking supplements.
