# DeFi Akademie – Finales Build-Dokument & Cursor-Prompt

**Dokumenttyp:** Vollständige UX-, Architektur- und Build-Spezifikation
**Projekt:** DeFi Akademie (deutschsprachige DeFi-Lernplattform)
**Zielumsetzung:** Build Agent in Cursor (Next.js + React)
**Sprache:** Deutsch
**Umfang:** 17 Module, 102 Lektionen

**Repo-Ist (Parallelbetrieb):** Aktueller Deploy, Content-Ordner und Video-Stand — [`docs/AGENTEN-HANDBUCH.md`](./AGENTEN-HANDBUCH.md).

---

Dieses Dokument ist in zwei Teile gegliedert:

- **Teil A:** Vollständiges Build-Dokument (konsolidierte Architektur mit allen Entscheidungen)
- **Teil B:** Fertiger Cursor-Prompt zur direkten Verwendung

---

# TEIL A – VOLLSTÄNDIGES BUILD-DOKUMENT

## A1. Projektüberblick

**Projektname:** DeFi Akademie
**Sprache:** Deutsch
**Zielgruppe:** Einsteiger, Fortgeschrittene, Investoren, Entwickler
**Prinzip:** Tiefe statt Hype – technisch korrekt, risikobewusst, praxisorientiert

**Inhaltsumfang:**
- 17 Module
- 102 Lektionen
- Jede Lektion: Erklärung, Lernziele, Slides, Voice-Script, Visual Suggestions, Übung, Quiz, Video

---

## A2. Technische Entscheidungen

| Komponente | Entscheidung |
|---|---|
| Frontend | Next.js 15 (App Router) + React 19 + TypeScript (Ist-Repo; Spez-Historie erwähnte teils Next 14) |
| Styling | Tailwind CSS |
| Hosting | Vercel |
| Authentifizierung | Supabase Auth (Email + Passwort) |
| Datenbank (später) | Supabase Postgres |
| Fortschritts-Tracking | localStorage (MVP) → Supabase-Sync (Phase 2) |
| Payments | Paywall-UI, keine Zahlung im MVP |
| Video-Hosting | Cloudflare R2 + CDN |
| Content-Quelle | Lokales Dateisystem unter `/content/modules/` |
| Design | Dark Mode, Inter, Gold-Akzent |

---

## A3. Informationsarchitektur

### Hierarchie

```
Öffentlich → Authentifiziert → Kurs → Modul → Lektion
```

### Tier-Struktur

- **Free Tier:** Module 1–3 (Grundlagen)
- **Pro Tier:** Module 4–17 (Paywall-UI sperrt Zugriff, keine echte Zahlung im MVP)

### Didaktische Gruppierung

- Grundlagen: Module 1–3
- Protokollmechaniken: Module 4–8
- Fortgeschrittene Strategien: Module 9–13
- Infrastruktur & Analyse: Module 14–17

---

## A4. Seitenstruktur (Routes)

### Öffentlich
- `/` – Landing Page
- `/preise` – Free vs Pro Vergleich
- `/login` – Anmeldung
- `/registrieren` – Registrierung
- `/impressum`, `/datenschutz`, `/agb` – Legal (Platzhalter)

### Authentifiziert
- `/dashboard` – Nutzer-Hub
- `/kurs` – Kursübersicht (alle 17 Module)
- `/kurs/[modulId]` – Modulseite
- `/kurs/[modulId]/[lektionId]` – Lektionsseite
- `/fortschritt` – Fortschrittsbericht
- `/profil` – Profil
- `/profil/abo` – Abo-Verwaltung (Paywall-UI)

---

## A5. Datenmodell

### module.json (pro Modul)

```json
{
  "id": "04-dex-mechanik",
  "number": 4,
  "title": "DEX Mechanik",
  "description": "In diesem Modul lernst du, wie dezentrale Börsen funktionieren.",
  "tier": "pro",
  "estimatedMinutes": 120,
  "lessons": ["01-amm-basics", "02-constant-product"]
}
```

### lesson.md (Frontmatter + Markdown)

```yaml
---
id: 04-impermanent-loss
number: 4
moduleId: 04-dex-mechanik
title: Impermanent Loss
estimatedMinutes: 20
learningObjectives:
  - Definition von Impermanent Loss
  - Berechnung mit Beispielen
  - Wann IL relevant wird
keyConcepts:
  - AMM
  - Impermanent Loss
  - Constant Product
---

## Explanation

Markdown-Inhalt der Lektion …

## Exercise

Aufgabenstellung …
```

### slides.json

```json
{
  "lessonId": "04-impermanent-loss",
  "slides": [
    {
      "id": 1,
      "title": "Was ist Impermanent Loss?",
      "timestamp": 0,
      "content": "Kurztext oder Markdown",
      "imageUrl": "/content/modules/04-dex-mechanik/04-impermanent-loss/slide-1.png"
    }
  ]
}
```

### quiz.json

```json
{
  "lessonId": "04-impermanent-loss",
  "questions": [
    {
      "id": 1,
      "question": "Wann entsteht Impermanent Loss?",
      "options": [
        "Wenn Gebühren ausgezahlt werden",
        "Wenn der Preis sich ändert",
        "Wenn Liquidität hinzugefügt wird",
        "Wenn der Pool leer ist"
      ],
      "correctIndex": 1,
      "explanation": "IL entsteht durch Preisdivergenz."
    }
  ]
}
```

### TypeScript-Typen

```typescript
export type Tier = "free" | "pro";

export type Module = {
  id: string;
  number: number;
  title: string;
  description: string;
  tier: Tier;
  estimatedMinutes: number;
  lessons: string[];
};

export type Lesson = {
  id: string;
  number: number;
  moduleId: string;
  title: string;
  estimatedMinutes: number;
  learningObjectives: string[];
  keyConcepts: string[];
  content: string;
};

export type Slide = {
  id: number;
  title: string;
  timestamp: number;
  content: string;
  imageUrl?: string;
};

export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type LessonAssets = {
  lesson: Lesson;
  videoUrl: string;
  slides: Slide[];
  quiz: QuizQuestion[];
};

export type LessonProgress = {
  lessonId: string;
  moduleId: string;
  videoWatched: boolean;
  exerciseCompleted: boolean;
  quizPassed: boolean;
  quizScore: number | null;
  completedAt: string | null;
};
```

---

## A6. Design-System-Tokens

### Farben (Dark Theme)

```
background:        #0B0B0F
surface:           #15151C
surface-elevated:  #1E1E28
border:            #2A2A35
text-primary:      #F5F5F7
text-secondary:    #9A9AA8
text-muted:        #6B6B78
accent-gold:       #D4AF37
accent-gold-hover: #E6C14F
success:           #4ADE80
warning:           #FBBF24
locked:            #4A4A55
```

### Typografie

- Font: Inter (Headings Bold, Body Regular, UI Medium)
- Mono (für Zahlen): JetBrains Mono

### Abstände

4-Punkte-Raster: 4, 8, 12, 16, 24, 32, 48, 64, 96 px

### Brand-Elemente

- Gold Accent Bar (2px unter Überschriften)
- Module Label (uppercase, tracked): "MODUL 04"
- Slide Counter (Mono): "3 / 12"

---

## A7. Komponentenarchitektur

### Layouts
`RootLayout`, `PublicLayout`, `AppLayout`, `LessonLayout`

### Navigation
`TopNav`, `MobileBottomNav`, `Breadcrumb`, `LessonSidebar`, `LessonFooterNav`

### Kurs
`ModuleCard`, `LessonListItem`, `ContinueLearningCard`, `ProgressBar`, `TierBadge`

### Lektion
`VideoPlayer`, `SlidesViewer`, `SlideNavigator`, `LearningObjectives`, `KeyConcepts`, `ExerciseBlock`

### Quiz
`QuizEngine`, `QuizQuestion`, `QuizFeedback`, `QuizResult`

### Paywall
`PaywallModal`, `UpgradeBanner`, `TierComparison`

### UI-Basis
`Button`, `Card`, `Modal`, `Badge`, `AccentBar`, `Icon`

### Logik/Context
`AuthGate`, `TierGate`, `ProgressProvider`, `ThemeProvider`

---

## A8. Lesson-Engine

### Content-Loader-Flow

```
Build-Zeit:
  generateStaticParams() liest /content/modules/
  ↓
  Für jede Lektion:
    1. module.json laden
    2. lesson.md parsen (Frontmatter + Markdown)
    3. slides.json laden
    4. quiz.json laden
    5. Video-URL aus ENV + lessonId konstruieren
  ↓
  Statische Seite wird generiert
```

### Video-URL-Konstruktion

Videos liegen auf Cloudflare R2. Die URL wird dynamisch zusammengebaut:

```
${NEXT_PUBLIC_VIDEO_CDN_URL}/modules/${modulId}/${lektionId}.mp4
```

### Video-Slides-Synchronisation

Der `VideoPlayer` emittiert `onProgress(currentTime)`. Der `SlidesViewer` berechnet den aktiven Slide anhand von `slide.timestamp`. Klick auf einen Slide ruft `player.seek(timestamp)` auf.

---

## A9. Quiz-System

### State Machine

```
idle → answering → feedback → answering → … → completed
```

### Bestehensschwelle

Standard: ≥ 2/3 richtig (konfigurierbar). Wiederholung möglich.

### UI-Zustände

- Auswahl: Radio-Buttons, "Prüfen" disabled bis Auswahl
- Feedback: Grün/Gold für richtig, dezentes Rot für falsch, Erklärung immer sichtbar
- Ergebnis: Score, Wiederholen, Nächste Lektion

---

## A10. Fortschritts-System

### Ebenen

- **Lektion:** videoWatched, exerciseCompleted, quizPassed
- **Modul:** Prozent der abgeschlossenen Lektionen
- **Kurs:** Gesamtprozent über alle 102 Lektionen

### Abschluss-Kriterium

Eine Lektion gilt als abgeschlossen, wenn Video ≥ 90 % angesehen UND Quiz bestanden.

### Persistenz

**MVP:** localStorage unter Key `defi-akademie-progress-v1`
**Phase 2:** Supabase-Tabelle `user_progress`, Hook abstrahiert Persistenz-Layer

### Progress-Hook

```typescript
const {
  progress,
  markVideoWatched,
  markExerciseCompleted,
  submitQuizResult,
  getModuleProgress,
  getCourseProgress,
  getCurrentLesson
} = useProgress();
```

---

## A11. Next.js Projektstruktur

```
defi-akademie/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # Landing
│   ├── preise/page.tsx
│   ├── login/page.tsx
│   ├── registrieren/page.tsx
│   ├── (app)/
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── kurs/
│   │   │   ├── page.tsx
│   │   │   └── [modulId]/
│   │   │       ├── page.tsx
│   │   │       └── [lektionId]/page.tsx
│   │   ├── fortschritt/page.tsx
│   │   └── profil/
│   │       ├── page.tsx
│   │       └── abo/page.tsx
│   └── (legal)/
│       ├── impressum/page.tsx
│       ├── datenschutz/page.tsx
│       └── agb/page.tsx
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── course/
│   ├── lesson/
│   ├── quiz/
│   ├── paywall/
│   ├── progress/
│   └── ui/
├── lib/
│   ├── content/
│   │   ├── loadModules.ts
│   │   ├── loadLesson.ts
│   │   └── parseMarkdown.ts
│   ├── progress/
│   │   ├── useProgress.ts
│   │   ├── ProgressProvider.tsx
│   │   └── progressStorage.ts
│   ├── auth/
│   │   ├── AuthGate.tsx
│   │   ├── useAuth.ts
│   │   └── supabaseClient.ts
│   ├── tier/
│   │   └── TierGate.tsx
│   └── utils/
├── content/
│   └── modules/
│       └── 01-defi-grundlagen/
│           ├── module.json
│           └── 01-was-ist-defi/
│               ├── lesson.md
│               ├── slides.json
│               └── quiz.json
├── data/
│   ├── courseStructure.ts
│   └── types.ts
├── public/
├── styles/
│   └── globals.css
├── .env.local.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## A12. Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_VIDEO_CDN_URL=https://cdn.defi-akademie.de
```

---

## A13. MVP-Scope

**Im MVP enthalten:**
- Alle Routes und Seiten
- Content-Loader für Module und Lektionen
- Video-Player + Slides-Viewer (ohne Timestamp-Sync, kommt später)
- Quiz-Engine
- Fortschritts-Tracking via localStorage
- Paywall-UI ohne echte Zahlung
- Supabase Auth (Email + Passwort)
- Demo-Modul mit Demo-Lektion als Fallback

**Nicht im MVP:**
- Echte Zahlung (Stripe/Lemon Squeezy)
- Supabase-Sync des Fortschritts
- Video-Slide-Timestamp-Synchronisation (vorbereitet, aber nicht aktiv)
- Mobile App

---

# TEIL B – CURSOR BUILD PROMPT

Der folgende Prompt kann direkt in Cursor eingefügt werden. Empfohlen wird Cursor mit **Claude Sonnet 4.6 oder Opus 4.7** im Agent-Mode.

---

## CURSOR PROMPT – KOPIEREN UND EINFÜGEN

````
Du baust die Lernplattform "DeFi Akademie" – eine deutschsprachige DeFi-Lernplattform mit 17 Modulen und 102 Lektionen.

Arbeite iterativ: Erstelle das Projekt-Gerüst, dann die einzelnen Phasen in der angegebenen Reihenfolge. Nach jeder Phase kurz pausieren und mir den Stand zeigen.

================================================================
1. TECH STACK
================================================================

- Next.js 14 (App Router)
- React 18
- TypeScript (strict mode)
- Tailwind CSS
- Supabase (Auth + später Postgres)
- gray-matter + remark für Markdown-Parsing
- lucide-react für Icons
- Deployment: Vercel
- Video-Hosting: Cloudflare R2 (URLs via ENV)

================================================================
2. DESIGN SYSTEM
================================================================

Dark Theme. Inter Font. Gold-Akzent.

Tailwind-Konfiguration mit folgenden Custom-Farben:

```
background:        #0B0B0F
surface:           #15151C
surface-elevated:  #1E1E28
border:            #2A2A35
text-primary:      #F5F5F7
text-secondary:    #9A9AA8
text-muted:        #6B6B78
accent-gold:       #D4AF37
accent-gold-hover: #E6C14F
success:           #4ADE80
warning:           #FBBF24
locked:            #4A4A55
```

Brand-Elemente:
- Gold Accent Bar: 2px horizontale Linie unter Überschriften
- Module Label: uppercase, letter-spacing 0.1em (z.B. "MODUL 04")
- Slide Counter: Mono-Font (JetBrains Mono)

Abstände: 4-Punkte-Raster.

================================================================
3. PROJEKTSTRUKTUR
================================================================

```
defi-akademie/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                         # Landing
│   ├── preise/page.tsx
│   ├── login/page.tsx
│   ├── registrieren/page.tsx
│   ├── (app)/
│   │   ├── layout.tsx                   # AppLayout mit TopNav
│   │   ├── dashboard/page.tsx
│   │   ├── kurs/
│   │   │   ├── page.tsx
│   │   │   └── [modulId]/
│   │   │       ├── page.tsx
│   │   │       └── [lektionId]/page.tsx
│   │   ├── fortschritt/page.tsx
│   │   └── profil/
│   │       ├── page.tsx
│   │       └── abo/page.tsx
│   └── (legal)/
│       ├── impressum/page.tsx
│       ├── datenschutz/page.tsx
│       └── agb/page.tsx
├── components/
│   ├── layout/
│   │   ├── TopNav.tsx
│   │   ├── MobileBottomNav.tsx
│   │   ├── AppLayout.tsx
│   │   └── LessonLayout.tsx
│   ├── navigation/
│   │   ├── Breadcrumb.tsx
│   │   ├── LessonSidebar.tsx
│   │   └── LessonFooterNav.tsx
│   ├── course/
│   │   ├── ModuleCard.tsx
│   │   ├── LessonListItem.tsx
│   │   ├── ContinueLearningCard.tsx
│   │   └── TierBadge.tsx
│   ├── lesson/
│   │   ├── VideoPlayer.tsx
│   │   ├── SlidesViewer.tsx
│   │   ├── SlideNavigator.tsx
│   │   ├── LearningObjectives.tsx
│   │   ├── KeyConcepts.tsx
│   │   └── ExerciseBlock.tsx
│   ├── quiz/
│   │   ├── QuizEngine.tsx
│   │   ├── QuizQuestion.tsx
│   │   ├── QuizFeedback.tsx
│   │   └── QuizResult.tsx
│   ├── paywall/
│   │   ├── PaywallModal.tsx
│   │   ├── UpgradeBanner.tsx
│   │   └── TierComparison.tsx
│   ├── progress/
│   │   └── ProgressBar.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Modal.tsx
│       ├── Badge.tsx
│       ├── AccentBar.tsx
│       └── Icon.tsx
├── lib/
│   ├── content/
│   │   ├── loadModules.ts
│   │   ├── loadLesson.ts
│   │   └── parseMarkdown.ts
│   ├── progress/
│   │   ├── useProgress.ts
│   │   ├── ProgressProvider.tsx
│   │   └── progressStorage.ts
│   ├── auth/
│   │   ├── AuthGate.tsx
│   │   ├── useAuth.ts
│   │   └── supabaseClient.ts
│   ├── tier/
│   │   └── TierGate.tsx
│   └── utils/
│       ├── formatDuration.ts
│       └── slugify.ts
├── content/
│   └── modules/
│       └── 01-defi-grundlagen/
│           ├── module.json
│           └── 01-was-ist-defi/
│               ├── lesson.md
│               ├── slides.json
│               └── quiz.json
├── data/
│   ├── courseStructure.ts
│   └── types.ts
├── public/
├── styles/globals.css
├── .env.local.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

================================================================
4. TYPESCRIPT-TYPEN (data/types.ts)
================================================================

```typescript
export type Tier = "free" | "pro";

export type Module = {
  id: string;
  number: number;
  title: string;
  description: string;
  tier: Tier;
  estimatedMinutes: number;
  lessons: string[];
};

export type Lesson = {
  id: string;
  number: number;
  moduleId: string;
  title: string;
  estimatedMinutes: number;
  learningObjectives: string[];
  keyConcepts: string[];
  content: string;
};

export type Slide = {
  id: number;
  title: string;
  timestamp: number;
  content: string;
  imageUrl?: string;
};

export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type LessonAssets = {
  lesson: Lesson;
  videoUrl: string;
  slides: Slide[];
  quiz: QuizQuestion[];
};

export type LessonProgress = {
  lessonId: string;
  moduleId: string;
  videoWatched: boolean;
  exerciseCompleted: boolean;
  quizPassed: boolean;
  quizScore: number | null;
  completedAt: string | null;
};

export type UserProgress = {
  userId: string;
  tier: Tier;
  lessons: Record<string, LessonProgress>;
  currentLessonId: string | null;
  updatedAt: string;
};
```

================================================================
5. KURSSTRUKTUR (data/courseStructure.ts)
================================================================

Statische Liste aller 17 Module mit IDs, Titeln und Tier:

```
Module 1-3 (tier: "free"):
  01-defi-grundlagen         DeFi Grundlagen
  02-wallets-sicherheit      Wallets & Sicherheit
  03-blockchain-mechanik     Blockchain Mechanik

Module 4-17 (tier: "pro"):
  04-dex-mechanik            DEX Mechanik
  05-liquidity-pools         Liquidity Pools
  06-lending-markets         Lending Markets
  07-sicherheiten-liquidationen  Sicherheiten & Liquidationen
  08-stablecoins             Stablecoins
  09-yield-strategien        Yield Strategien
  10-leverage-loops          Leverage Loops
  11-mev                     MEV
  12-flash-loans             Flash Loans
  13-vetokenomics            veTokenomics
  14-cross-chain             Cross-Chain Infrastruktur
  15-on-chain-analytics      On-Chain Analytics
  16-composability-risk      Composability Risk
  17-portfolio-future        Portfolio Konstruktion & Future of DeFi
```

Exportiere diese als Array `ALL_MODULES: Module[]` mit Platzhalter-Beschreibungen.

================================================================
6. CONTENT-LOADER (lib/content/)
================================================================

**loadModules.ts:**
- Liest alle Verzeichnisse unter `/content/modules/`
- Parst jede `module.json`
- Gibt `Module[]` zurück, sortiert nach `number`
- Wenn kein Content vorhanden: fällt zurück auf ALL_MODULES aus courseStructure.ts

**loadLesson.ts:**
- Funktion `loadLesson(modulId: string, lektionId: string): Promise<LessonAssets>`
- Liest `lesson.md` (mit gray-matter für Frontmatter)
- Parst Markdown mit remark zu HTML
- Liest `slides.json` und `quiz.json`
- Konstruiert videoUrl: `${process.env.NEXT_PUBLIC_VIDEO_CDN_URL}/modules/${modulId}/${lektionId}.mp4`
- Wirft NICHT bei fehlenden Dateien, sondern liefert leere Arrays/Platzhalter zurück

**parseMarkdown.ts:**
- Utility für Markdown → HTML Konvertierung

================================================================
7. DEMO-CONTENT
================================================================

Erstelle ein Demo-Modul unter `/content/modules/01-defi-grundlagen/`:

**module.json:**
```json
{
  "id": "01-defi-grundlagen",
  "number": 1,
  "title": "DeFi Grundlagen",
  "description": "Einführung in die Grundkonzepte von Decentralized Finance. Du lernst, was DeFi ist, wie es funktioniert und warum es relevant ist.",
  "tier": "free",
  "estimatedMinutes": 90,
  "lessons": ["01-was-ist-defi"]
}
```

**01-was-ist-defi/lesson.md:**
```markdown
---
id: 01-was-ist-defi
number: 1
moduleId: 01-defi-grundlagen
title: Was ist DeFi?
estimatedMinutes: 15
learningObjectives:
  - Definition von DeFi verstehen
  - Unterschiede zu traditioneller Finanz
  - Grundprinzipien erkennen
keyConcepts:
  - Decentralized Finance
  - Smart Contracts
  - Permissionless
---

## Einführung

Decentralized Finance (DeFi) bezeichnet Finanzdienstleistungen, die auf öffentlichen Blockchains laufen und ohne zentrale Vermittler funktionieren.

## Kernmerkmale

DeFi-Protokolle sind typischerweise: permissionless, transparent und komponierbar.

## Exercise

Überlege: Welche drei Unterschiede zwischen einem traditionellen Bankkonto und einem DeFi-Wallet fallen dir ein?
```

**01-was-ist-defi/slides.json:**
```json
{
  "lessonId": "01-was-ist-defi",
  "slides": [
    { "id": 1, "title": "Was ist DeFi?", "timestamp": 0, "content": "Decentralized Finance – Finanzdienstleistungen ohne Intermediäre." },
    { "id": 2, "title": "Kernmerkmale", "timestamp": 60, "content": "Permissionless, transparent, komponierbar." },
    { "id": 3, "title": "Abgrenzung", "timestamp": 180, "content": "Unterschied zu TradFi und CeFi." }
  ]
}
```

**01-was-ist-defi/quiz.json:**
```json
{
  "lessonId": "01-was-ist-defi",
  "questions": [
    {
      "id": 1,
      "question": "Was bedeutet 'permissionless' im DeFi-Kontext?",
      "options": [
        "Nur verifizierte Nutzer haben Zugang",
        "Jeder kann ohne Erlaubnis teilnehmen",
        "Es gibt keine Regeln",
        "Transaktionen sind kostenlos"
      ],
      "correctIndex": 1,
      "explanation": "Permissionless bedeutet, dass kein Gatekeeper den Zugang kontrolliert."
    },
    {
      "id": 2,
      "question": "Was unterscheidet DeFi von traditionellem Banking?",
      "options": [
        "DeFi nutzt Smart Contracts statt Intermediäre",
        "DeFi ist immer günstiger",
        "DeFi garantiert höhere Renditen",
        "DeFi benötigt keine Wallet"
      ],
      "correctIndex": 0,
      "explanation": "Der Kernunterschied liegt in der Nutzung von Smart Contracts statt menschlicher Vermittler."
    },
    {
      "id": 3,
      "question": "Was heißt 'komponierbar' bei DeFi-Protokollen?",
      "options": [
        "Die UI kann angepasst werden",
        "Protokolle können miteinander kombiniert werden",
        "Der Code ist öffentlich",
        "Transaktionen lassen sich rückgängig machen"
      ],
      "correctIndex": 1,
      "explanation": "Komponierbarkeit erlaubt es, Protokolle wie Bausteine zusammenzusetzen."
    }
  ]
}
```

================================================================
8. FORTSCHRITTS-SYSTEM
================================================================

**lib/progress/progressStorage.ts:**
- Kapselt localStorage-Zugriff unter Key `defi-akademie-progress-v1`
- Interface mit Methoden: `get`, `set`, `update`
- Austauschbar gegen Supabase-Implementierung in Phase 2

**lib/progress/ProgressProvider.tsx:**
- React Context Provider
- Lädt Fortschritt beim Mount aus Storage
- Stellt Hook `useProgress` bereit

**useProgress API:**
```typescript
const {
  progress,
  markVideoWatched,
  markExerciseCompleted,
  submitQuizResult,
  isLessonCompleted,
  getModuleProgress,   // gibt Prozent zurück
  getCourseProgress,   // gibt Prozent zurück
  getCurrentLesson     // letzte angefangene, nicht abgeschlossene Lektion
} = useProgress();
```

Eine Lektion gilt als abgeschlossen, wenn `videoWatched === true` UND `quizPassed === true`.

================================================================
9. AUTHENTIFIZIERUNG
================================================================

**lib/auth/supabaseClient.ts:**
- Initialisiert Supabase Client mit ENV-Variablen

**lib/auth/useAuth.ts:**
- Hook für Login, Logout, Registrierung, Session

**lib/auth/AuthGate.tsx:**
- Wrapper-Komponente für geschützte Routes
- Leitet zu `/login` weiter, wenn keine Session

Alle Routes unter `app/(app)/` werden durch AuthGate geschützt.

================================================================
10. TIER-GATE
================================================================

**lib/tier/TierGate.tsx:**
- Prüft, ob Nutzer Zugriff auf Modul hat
- Free-Nutzer: nur Module 1–3
- Pro-Nutzer: alle Module
- Bei fehlendem Zugriff: öffnet PaywallModal

MVP-Regel: Alle Nutzer sind standardmäßig "free". Es gibt keine echte Upgrade-Logik. Der Pro-Tier-Flag wird in `profiles`-Tabelle in Supabase gespeichert (später), im MVP immer false.

================================================================
11. SEITEN – ANFORDERUNGEN
================================================================

**Landing Page (/):**
- Hero: "DeFi verstehen. Ohne Hype." + Untertitel + 2 CTAs
- Sektion "Was du lernst" mit 4 Kategorien (Grundlagen, Mechaniken, Strategien, Infrastruktur)
- Sektion "Alle 17 Module" als Liste mit Free/Pro-Badges
- Sektion "Aufbau einer Lektion": Video → Slides → Übung → Quiz
- Sektion "Free vs Pro" zwei Spalten
- FAQ (3–5 Fragen als Platzhalter)
- Footer

**Dashboard (/dashboard):**
- Begrüßung mit Nutzername
- Gesamtfortschrittsbalken (X von 102 Lektionen)
- "Weiter lernen"-Karte mit aktueller Lektion (aus getCurrentLesson)
- Grid aller 17 Module als ModuleCard (Status: nicht begonnen / in Bearbeitung / abgeschlossen / gesperrt)

**Kursübersicht (/kurs):**
- Titel "Alle Module"
- Grid aller Module gruppiert nach Kategorie (Grundlagen, Mechaniken, Strategien, Infrastruktur)

**Modulseite (/kurs/[modulId]):**
- Breadcrumb
- Module Label + Titel + Gold Accent Bar
- Beschreibung
- Metadaten: Anzahl Lektionen, geschätzte Dauer, Fortschritt
- Lektionsliste als LessonListItem-Komponenten
- Footer-Navigation: Vorheriges/Nächstes Modul

**Lektionsseite (/kurs/[modulId]/[lektionId]):**
- Zweispaltig (Desktop): LessonSidebar links, Content rechts
- Breadcrumb
- Titel + Gold Accent Bar
- Lernziele
- VideoPlayer (HTML5 video mit videoUrl aus LessonAssets)
- SlideNavigator + SlidesViewer (MVP: nur Slide-Anzeige, noch keine Timestamp-Sync)
- Key Concepts als Tag-Liste
- ExerciseBlock (aus Markdown extrahierte Übungsaufgabe)
- QuizEngine (Button "Quiz starten" → Overlay oder Inline-Anzeige)
- Footer: Vorherige/Nächste Lektion

**Quiz (inline in Lektionsseite oder dediziert):**
- Fortschritt "Frage X von Y"
- Multiple-Choice mit 4 Optionen
- "Antwort prüfen" Button (disabled bis Auswahl)
- Feedback mit Erklärung
- Am Ende: Ergebnis + Wiederholen / Nächste Lektion

**Fortschritt (/fortschritt):**
- Gesamtbalken
- Pro Modul: Balken + Prozent + Liste der Lektionen mit Status

**Profil (/profil):**
- Nutzerdaten (Email)
- Abo-Status (immer "Free" im MVP)
- Logout-Button

**Abo (/profil/abo):**
- TierComparison
- Button "Pro werden" → Platzhalter-Modal "Coming Soon"

**Legal-Seiten:**
- Einfache Platzhaltertexte

================================================================
12. VIDEO-PLAYER
================================================================

**VideoPlayer.tsx:**
- HTML5 `<video>` mit Custom Controls
- Props: `src`, `onProgress(currentTime, duration)`, `onComplete`
- Controls: Play/Pause, Zeitanzeige, Seekbar, Lautstärke, Fullscreen
- Bei 90% der Dauer: onComplete auslösen → markVideoWatched
- Fallback wenn Video fehlt: Platzhalter-Box mit Hinweis "Video wird bald verfügbar sein"

================================================================
13. UI-KOMPONENTEN
================================================================

**Button:** Varianten `primary` (Gold), `secondary` (Surface), `ghost` (nur Text). Sizes: sm, md, lg.

**Card:** Basis-Karte mit Surface-Background, Border, Padding.

**Badge:** Pill-Form, Farben für tier (free/pro), status (abgeschlossen/in Bearbeitung/gesperrt).

**AccentBar:** 2px Gold-Linie, Breite konfigurierbar.

**Icon:** Wrapper um lucide-react-Icons.

**Modal:** Dialog mit Overlay, Close-Button, Fokus-Trap.

**ProgressBar:** Balken mit Label, Prozentwert, Gold-Füllung auf Surface-Background.

================================================================
14. ENVIRONMENT VARIABLES
================================================================

`.env.local.example`:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_VIDEO_CDN_URL=https://cdn.defi-akademie.de
```

Stelle sicher, dass die App ohne gesetzte Supabase-Werte trotzdem im Demo-Modus läuft (Auth deaktiviert, alle Routes zugänglich).

================================================================
15. IMPLEMENTIERUNGS-PHASEN
================================================================

Arbeite in dieser Reihenfolge ab. Nach jeder Phase pausieren, Stand zeigen, auf OK warten.

**Phase 1 – Gerüst:**
- Projekt initialisieren (Next.js, TypeScript, Tailwind)
- Design-Tokens in tailwind.config.ts
- UI-Basis-Komponenten (Button, Card, Badge, AccentBar, Icon, Modal, ProgressBar)
- globals.css mit Inter-Font und Dark-Theme

**Phase 2 – Content-Pipeline:**
- TypeScript-Typen (data/types.ts)
- courseStructure.ts mit allen 17 Modulen
- loadModules.ts, loadLesson.ts, parseMarkdown.ts
- Demo-Content für Modul 1, Lektion 1 erstellen

**Phase 3 – Öffentlicher Bereich:**
- Landing Page
- Preise-Seite
- Login & Registrierung (UI, ohne Supabase-Integration)

**Phase 4 – Authentifizierung:**
- Supabase Client
- useAuth Hook
- AuthGate
- Login/Registrierung funktional machen
- Demo-Modus wenn ENV-Variablen fehlen

**Phase 5 – App-Layout & Navigation:**
- TopNav, AppLayout
- Breadcrumb
- MobileBottomNav

**Phase 6 – Dashboard:**
- Dashboard-Seite
- ContinueLearningCard
- ModuleCard-Grid

**Phase 7 – Kurs & Modul:**
- Kursübersicht
- Modulseite mit Lektionsliste

**Phase 8 – Lektion:**
- LessonLayout mit Sidebar
- VideoPlayer
- SlidesViewer + SlideNavigator
- LearningObjectives, KeyConcepts, ExerciseBlock
- LessonFooterNav

**Phase 9 – Quiz-Engine:**
- QuizEngine mit State Machine
- QuizQuestion, QuizFeedback, QuizResult

**Phase 10 – Fortschritt:**
- ProgressProvider, useProgress
- Fortschritts-Seite
- Integration in alle Ebenen (Dashboard, Module, Lektion)

**Phase 11 – Paywall & Tier:**
- TierGate
- PaywallModal, UpgradeBanner, TierComparison
- Abo-Seite

**Phase 12 – Legal & Feinschliff:**
- Impressum, Datenschutz, AGB
- Mobile Responsiveness prüfen
- Letzte Polish-Runde

================================================================
16. QUALITÄTSREGELN
================================================================

- Alle Texte auf Deutsch
- Kein Marketing-Sprache, kein Hype
- Alle Komponenten mit TypeScript-Typen
- Sauberer, kommentierter Code
- Keine externen UI-Bibliotheken außer Tailwind und lucide-react
- Responsiv: Desktop, Tablet, Mobile
- Accessibility: semantische HTML-Tags, aria-labels wo nötig, Keyboard-Navigation
- Dark Theme als Standard, keine Theme-Umschaltung im MVP

================================================================
17. NACH DEM BUILD
================================================================

Liefere am Ende:
- `README.md` mit Setup-Anleitung (ENV-Variablen, Start-Befehle, Content-Ordner-Struktur erklären)
- `CONTENT.md` mit Anleitung, wie neue Module und Lektionen hinzugefügt werden
- Funktionierenden `npm run dev`-Start

================================================================
START
================================================================

Starte mit Phase 1. Pausiere nach jeder Phase, zeig mir den Stand und frag, ob du weitermachen sollst.
````

---

## Anwendung

1. Öffne **Cursor** (oder Claude Code)
2. Erstelle einen neuen leeren Ordner `defi-akademie`
3. Öffne ihn in Cursor
4. Aktiviere den **Agent-Mode** mit **Claude Sonnet 4.6** oder **Opus 4.7**
5. Kopiere den Prompt oben (alles zwischen den Code-Fences nach "CURSOR PROMPT – KOPIEREN UND EINFÜGEN")
6. Füge ihn als erste Nachricht ein und drücke Enter

Cursor baut dann Phase für Phase. Nach jeder Phase kannst du Feedback geben oder "weiter" sagen.

**Zeitschätzung:** Ein Full-Build mit Pausen dauert erfahrungsgemäß 2–4 Stunden, je nach Modell und Iterationen.
