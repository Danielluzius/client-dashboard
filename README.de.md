# Client Dashboard

_[🇬🇧 English Version](README.md)_

Ein professionelles Client-Dashboard als Portfolio-Projekt, entwickelt mit modernen Frontend-Technologien.

## 📋 Projektziel

Dieses Projekt demonstriert die Implementierung eines realistischen Client-Dashboards, wie es in Agentur- und Kundenprojekten zum Einsatz kommt. Der Fokus liegt auf **Code-Qualität**, **sauberer Architektur** und **Best Practices** – nicht auf Spielereien oder übermäßigem Design.

Das Dashboard dient als Bewerbungsportfolio für Frontend-Entwickler-Positionen mit React & Next.js.

## 🛠 Tech-Stack

- **Framework**: Next.js 14 (App Router)
- **Library**: React 18
- **Sprache**: TypeScript (strict mode)
- **Styling**: CSS Modules
- **API**: JSONPlaceholder (öffentliche REST-API)
- **Data Fetching**: Native Fetch API

### Bewusste Entscheidungen

- ✅ **Keine UI-Frameworks** (Material-UI, Chakra, Tailwind) – Fokus auf grundlegende CSS-Fähigkeiten
- ✅ **Keine komplexen State-Management-Libs** – React Hooks reichen aus
- ✅ **App Router statt Pages Router** – Moderne Next.js-Architektur
- ✅ **TypeScript ohne `any`** – Vollständige Type-Safety

## 📁 Projektarchitektur

```
client-dashboard/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root Layout mit Meta-Tags
│   ├── page.tsx                 # Dashboard (Homepage)
│   ├── globals.css              # Globale Styles & Design-System
│   └── users/                   # Users-Feature
│       ├── page.tsx             # Nutzerliste
│       └── [id]/                # Dynamisches Routing
│           └── page.tsx         # Nutzer-Detailseite
├── components/                   # React Komponenten
│   ├── layout/                  # Layout-Komponenten
│   │   ├── MainLayout.tsx       # Haupt-Layout-Wrapper
│   │   └── Navigation.tsx       # Navigation mit Mobile Menu
│   └── ui/                      # Wiederverwendbare UI-Bausteine
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── ErrorMessage.tsx
│       ├── LoadingSpinner.tsx
│       ├── LoadingSkeleton.tsx  # Moderne Skeleton-Loader
│       ├── StatCard.tsx
│       └── UserTable.tsx
├── hooks/                        # Custom React Hooks
│   └── index.ts                 # useMediaQuery, useWindowSize, etc.
├── lib/                          # Utilities & Helpers
│   ├── constants.ts             # App-weite Konstanten
│   └── utils.ts                 # Helper-Funktionen
├── services/                     # API Service Layer
│   └── api.ts                   # Zentrale API-Funktionen
├── types/                        # TypeScript Definitionen
│   └── index.ts                 # Gemeinsame Types
├── .editorconfig                # Code-Style Konsistenz
├── .eslintrc.js                 # ESLint Konfiguration
├── .prettierrc                  # Prettier Konfiguration
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

### Architektur-Prinzipien

1. **Separation of Concerns**
   - UI-Komponenten (`components/ui/`) sind wiederverwendbar und präsentationsorientiert
   - Layout-Komponenten (`components/layout/`) strukturieren Seiten
   - Service Layer (`services/`) kapselt API-Logik
   - Types (`types/`) zentralisieren TypeScript-Definitionen
   - Hooks (`hooks/`) für wiederverwendbare React-Logik
   - Lib (`lib/`) für utilities, constants und helpers

2. **Component Design**
   - Kleine, fokussierte Komponenten
   - Props-Interface für jede Komponente
   - CSS Modules für Scoped Styling
   - Klare Trennung von Logik und Darstellung

3. **Error & Loading Handling**
   - Konsistente Loading-States mit `LoadingSpinner`
   - Professionelle Error-Messages mit Retry-Funktionalität
   - Type-safe Error-Handling über TypeScript

4. **API Integration**
   - Zentralisierte Fetch-Logik in `services/api.ts`
   - Wiederverwendbare `fetchApi`-Funktion
   - Error-Handling auf Service-Ebene
   - Parallele API-Calls wo sinnvoll (`Promise.all`)

## 🚀 Installation & Start

### Voraussetzungen

- Node.js (Version 18 oder höher)
- npm oder yarn

### Setup

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Production Build
npm run build
npm start
```

Die Anwendung läuft unter [http://localhost:3000](http://localhost:3000)

## 📄 Funktionalität

### Dashboard (`/`)

- Übersicht mit Statistik-Karten
- Anzahl Nutzer und Beiträge
- Letzte Aktualisierung
- Informationen über das Projekt

### Nutzerliste (`/users`)

- Tabellarische Darstellung aller Nutzer
- Anzeige von Name, E-Mail, Firma und Stadt
- Klick auf "Details" führt zur Detailseite
- Loading- und Error-States

### Nutzer-Detail (`/users/[id]`)

- Detaillierte Nutzerinformationen
- Kontaktdaten, Adresse und Firma
- Liste aller Beiträge des Nutzers
- "Zurück"-Navigation
- Robustes Error-Handling bei ungültiger ID

## 🎯 Best Practices

### Code-Qualität

- ✅ Konsistente Namenskonventionen
- ✅ TypeScript ohne `any`
- ✅ Kommentare nur wo nötig (Erklärung "Warum", nicht "Was")
- ✅ ESLint-konforme Code-Struktur

### React & Next.js

- ✅ Client Components mit `'use client'` Direktive
- ✅ App Router für modernes Routing
- ✅ Hooks korrekt verwendet (`useEffect`, `useState`)
- ✅ Dynamisches Routing mit `[id]`-Pattern

### Performance

- ✅ Parallele API-Calls mit `Promise.all`
- ✅ CSS Modules für optimiertes Styling
- ✅ Keine unnötigen Re-Renders

### UX/UI

- ✅ Konsistentes Design-System
- ✅ Klare Feedback-Mechanismen
- ✅ Responsive Design (Mobile-First)
- ✅ Accessibility-Grundlagen

## 📝 Bewertungskriterien erfüllt

### Funktional

- ✅ Alle geforderten Seiten implementiert
- ✅ Dynamisches Routing funktioniert
- ✅ API-Integration vollständig
- ✅ Loading- und Error-States vorhanden

### Technisch

- ✅ Saubere Komponentenarchitektur
- ✅ TypeScript konsequent eingesetzt
- ✅ Wiederverwendbare UI-Komponenten
- ✅ Service Layer für API-Calls

### Qualität

- ✅ Keine riesigen Komponenten
- ✅ Sinnvolle Benennung
- ✅ Wartbarer, lesbarer Code
- ✅ Professionelles Error-Handling

## 🔄 Mögliche Erweiterungen

Falls du das Projekt weiterentwickeln möchtest:

- Pagination für Nutzerliste
- Filter- und Suchfunktionen
- Error Boundary für globales Error-Handling
- Unit Tests mit Jest/React Testing Library
- E2E Tests mit Playwright
- Authentifizierung (optional)
- Dark Mode

## 📧 Autor

Daniel  
Portfolio-Projekt für Bewerbungen als Frontend Developer

---

**Hinweis**: Dieses Projekt nutzt die öffentliche [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) für Demonstrationszwecke. Die Daten sind Platzhalter und nicht persistent.
