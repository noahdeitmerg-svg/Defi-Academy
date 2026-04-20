# Akademie-Struktur

Dieses Dokument beschreibt die Hierarchie der **DeFi Akademie** und
definiert die verbindliche Terminologie fuer Doku, UI, Pipeline und
Video-Skripte.

> **Terminologie-Regel:** Das Wort *Curriculum* wird in der DeFi
> Akademie nicht mehr verwendet. Alle Oberflaechen-Labels, Skripte,
> Voice-Overs und Doku nutzen deutsche Begriffe.

---

## 1. Hierarchie

```
DeFi Akademie
└── Module
    └── Lektionen
        ├── Videos
        ├── Quiz
        └── Praxisuebungen
```

Ein Produkt (**DeFi Akademie**) enthaelt eine feste Zahl von
**Modulen**. Jedes Modul besteht aus mehreren **Lektionen**. Jede
Lektion kann drei Lern-Artefakte tragen: **Video**, **Quiz**,
**Praxisuebungen** — alle drei sind optional im Sinne von
"technisch darf eins fehlen", inhaltlich aber normal Bestandteil einer
vollwertigen Lektion.

Aktueller Zielumfang: **18 Module** (Modul 0 bis Modul 17), ca.
**102 Lektionen**.

### 1.1 Modulreihenfolge und Lernpfad

Module:

- Modul 0 — Introduction to the DeFi Academy
- Modul 1 — DeFi Fundamentals
- Modul 2 — Wallets and Security
- Modul 3 — Blockchain Mechanics
- Modul 4 — DEX Mechanics
- Modul 5 — Liquidity Pools
- Modul 6 — Lending Markets
- Modul 7 — Collateral and Liquidations
- Modul 8 — Stablecoins
- Modul 9 — Yield Strategies
- Modul 10 — Leverage Loops
- Modul 11 — MEV
- Modul 12 — Flash Loans
- Modul 13 — veTokenomics
- Modul 14 — Cross-Chain Infrastructure
- Modul 15 — On-Chain Analytics
- Modul 16 — Composability Risk
- Modul 17 — Portfolio Construction and RWA

Lernpfad:

- Orientation: Modul 0
- Foundations: Module 1–4
- Protocols: Module 5–10
- Infrastructure: Module 11–14
- Advanced Analysis and Strategy: Module 15–17

Hinweis zu Modul 0: Das Onboarding-Modul vermittelt Struktur der
Akademie, Risiko-Bewusstsein und Lernmethodik vor den technischen
Inhalten.

---

## 2. Ebenen im Detail

### 2.1 DeFi Akademie

- **Rolle:** Produkt-Dach. Einstieg ueber die Startseite `/`.
- **Was sie ist:** Die gesamte Lernerfahrung — von Blockchain-Basics
  bis zu Institutional-DeFi-Research.
- **Was sie nicht ist:** Ein einzelnes Curriculum-Dokument. "DeFi
  Akademie" ersetzt bewusst den englischen Sammelbegriff *Course
  Curriculum*.
- **Sichtbar in der UI als:** Header-Branding und Meta-Title.

### 2.2 Module

- **Rolle:** Thematische Grossbloecke (z. B. "Fundament",
  "Lending & Stablecoins", "MEV & Flash Loans").
- **Ablage (zwei parallele Konventionen):**
  - **Legacy:** `content/modules/module1` … `module17` — flache Lektions-`*.md`, `meta.json`, Quiz auf Modul-Ebene.
  - **UX-Shell:** `content/modules/01-defi-grundlagen` usw. — `module.json`, Unterordner pro Lektion mit `lesson.md`, `slides.json`, `quiz.json` (siehe `lib/content/loadModules.ts`).
  - **Dokumentierte Zielstruktur:** `content/modules/module-00` … `content/modules/module-17` (ohne sofortige Umbenennung bestehender Ordner).
- **Quelle:** Autoren-Markdown unter `Module/modul-NN-*-FINAL.md` sowie Pipeline-Outputs in `lessons/`.
- **Sichtbar in der UI als:** Legacy unter `/module/<moduleSlug>`; UX unter `/kurs` und `/kurs/<modulId>`.
- **Ersetzt:** *Curriculum Modules* — wir sagen einfach **Module**.

### 2.3 Lektionen

- **Rolle:** Die kleinste didaktische Einheit. Eine Lektion = ein in
  sich abgeschlossenes Lernstueck mit klar definiertem Ziel.
- **Ablage:** `lessons/<moduleXX-lessonYY>.md` (bzw. die gegenwaertige
  Quellstruktur in `Module/Fundament/files/*.md`, die vom
  Auto-Import in `content/modules/` ueberfuehrt wird).
- **Pflicht-Sektionen** (siehe `scripts/validate-lessons.js`):
  Lesson Title, Learning Objectives, Explanation, Slide Summary,
  Voice Narration Script, Visual Suggestions, Exercise, Quiz.
- **Sichtbar in der UI als:** Legacy `/module/<moduleSlug>/lesson/<lessonSlug>`
  inkl. linker Sidebar-Navigation; UX `/kurs/<modulId>/<lektionId>`.
- **Ersetzt:** *Curriculum Lessons* — wir sagen einfach **Lektionen**.

### 2.4 Videos

- **Rolle:** Optionales 5–10-minuetiges Lern-Video pro Lektion.
- **Produktion:** Remotion rendert Slides aus
  `video-style-engine/slide-template.jsx` + Visuals aus
  `assets-input/<lesson>/visual01.png` … + Voice-Over aus
  ElevenLabs. Siehe
  [`docs/VIDEO_PRODUCTION_WORKFLOW.md`](./VIDEO_PRODUCTION_WORKFLOW.md)
  und [`docs/SLIDE_GENERATION_RULES.md`](./SLIDE_GENERATION_RULES.md).
- **Ablage fertiger Videos:** `public/videos/<slug>.mp4` und
  `public/posters/<slug>.jpg`.
- **Sichtbar in der UI als:** `LessonVideoHero` ueber dem Lektions-
  Content, sofern ein passendes MP4 gefunden wird (siehe
  `lib/lessonAssets.ts`).

### 2.5 Quiz

- **Rolle:** Multiple-Choice-Selbsttest am Modul-Ende, optional je
  Lektion auch als offene Fragen.
- **Ablage:** `content/modules/<moduleSlug>/quiz.json` (Modul-Quiz),
  `open-quiz.md` (offene Fragen pro Lektion).
- **Sichtbar in der UI als:** `/module/<moduleSlug>/quiz` (Modul-Quiz)
  und eingebettet pro Lektion (Tab "Quiz").
- **Fortschritt:** Bestehen des Modul-Quiz markiert das Modul als
  abgeschlossen (siehe `lib/progress.ts`).

### 2.6 Praxisuebungen

- **Rolle:** Hands-on-Aufgaben pro Lektion: Testnet-Transaktion,
  on-chain-Analyse, Protokoll-Interaktion o. ae.
- **Ablage:** Sektion "Exercise" / "Praxisuebung" in der jeweiligen
  Lektions-Markdown.
- **Sichtbar in der UI als:** Lektionsbereich "Praxisuebung" im
  `LessonExperience`-Layout (Tab "Uebung").
- **Ersetzt:** *Exercises* — wir sagen **Praxisuebungen**, um den
  Unterschied zu reinen Verstaendnisfragen (Quiz) klar zu machen.

---

## 3. Terminologie-Mapping (Englisch → Deutsch)

Diese Tabelle ist verbindlich fuer alle neuen Docs, Prompts,
Voice-Skripte und UI-Labels.

| Alte Bezeichnung (englisch)        | Neu (deutsch)          |
|------------------------------------|------------------------|
| Curriculum                         | Lernprogramm           |
| Course Curriculum                  | DeFi Akademie          |
| Curriculum Structure               | Akademie-Struktur      |
| Curriculum Modules                 | Module                 |
| Curriculum Lessons                 | Lektionen              |
| Lesson Video                       | Lektions-Video         |
| Lesson Quiz                        | Lektions-Quiz          |
| Module Quiz                        | Modul-Quiz             |
| Exercise / Practice Lab            | Praxisuebung           |

**Was bleibt englisch (Marke/Technik):**

- Produktname **DeFi Academy** im `<title>` und `meta.title` — der
  Brand-Identifier in GitHub, Domain, OpenGraph. Die deutsche
  Variante **DeFi Akademie** ist das sichtbare Label in Header-Tagline
  und Doku-Text.
- Code-Symbole wie `resolveFlatCurriculumRoot()` und Dateien wie
  `lib/curriculumConfig.ts`. Refactoring dieser API bricht bestehende
  Imports und ist bewusst ausgeklammert (keine Nutzer-sichtbaren
  Auswirkungen).
- Env-Variable `DEFI_CURRICULUM_PATH` — Runtime-Identifier in allen
  Deploy-Environments.

---

## 4. Geltungsbereich der Regel

Wo die Terminologie konsequent durchzuhalten ist:

| Surface                                | Quelle                                            |
|----------------------------------------|---------------------------------------------------|
| **Plattform-UI** (Header, Karten, Navi) | `app/`, `components/`                              |
| **Startseite-Tagline**                 | `app/page.tsx`                                    |
| **Lesson-Layout-Tabs**                 | `components/LessonExperience.tsx`                 |
| **Video-Skripte**                      | `lessons/*.md` (Voice Narration Script)           |
| **Render-Pipeline-Logs**               | `scripts/*.js` (`generate-voice`, `render-batch`) |
| **System-Doku**                        | `docs/defi_academy_system.md`                     |
| **Workflow-Doku**                      | `docs/VIDEO_PRODUCTION_WORKFLOW.md`               |
| **Regel-Doku** (dieses + Slide-Regel)  | `docs/SLIDE_GENERATION_RULES.md`, `docs/academy-structure.md` |
| **CI-Workflow-Anzeigenamen**           | `.github/workflows/*.yml` (`name:`-Feld)          |
| **Env-Vorlagen**                       | `.env.example` (Kommentare)                       |

Wo die Regel **nicht** greift:

- Englischsprachige Quell-Dokumente unter `Module/Fundament/files/*.md`
  (von einem Curriculum-Architekten verfasster Rohentwurf,
  Input-Material fuer den Lesson-Asset-Generator).
- Stable Runtime-Identifier (siehe §3, "Was bleibt englisch").

---

## 5. Beziehungen zu anderen Doku-Dokumenten

- [`docs/AGENTEN-HANDBUCH.md`](./AGENTEN-HANDBUCH.md) — **Masterdokument**
  für Agenten: aktueller Deploy-Ist, Ziel **18 Module / ca. 102 Lektionen**,
  Roadmaps, Verzeichnis-Index.
- [`docs/defi_academy_system.md`](./defi_academy_system.md) — System-
  Ueberblick, Rollen-Kataster, Roadmap, Infrastruktur. Fuehrt im Kopf
  die Video-Pipeline-Regel (Gamma vs. Remotion) und verlinkt auf
  dieses Dokument fuer die Struktur-Terminologie.
- [`docs/VIDEO_PRODUCTION_WORKFLOW.md`](./VIDEO_PRODUCTION_WORKFLOW.md) —
  Schritt-fuer-Schritt-Anleitung fuer die Videoproduktion.
- [`docs/SLIDE_GENERATION_RULES.md`](./SLIDE_GENERATION_RULES.md) —
  Rollen-Trennung Gamma (Einzel-Visuals) vs. Remotion (Slide-Layout).
- [`docs/GITHUB_PAGES.md`](./GITHUB_PAGES.md) — Deployment via
  GitHub Pages, inkl. Auto-Import der Akademie-Inhalte.
- [`docs/OPS_CHECKLIST.md`](./OPS_CHECKLIST.md) — Checkliste fuer
  Betrieb, CI, Content-Sync.
- [`docs/offeneAufgaben.md`](./offeneAufgaben.md) — Lebendes Backlog.

---

## 6. Aenderung dieser Struktur

Wer die Hierarchie erweitert (z. B. neue Ebene "Zertifikat" oder
"Learning Path" als Querschnittssicht ueber Module), muss:

1. Dieses Dokument als Erstes aktualisieren.
2. Die Terminologie-Tabelle in §3 ergaenzen.
3. Anschliessend `defi_academy_system.md` §§3–6 spiegeln und die
   betroffenen UI-Komponenten/Scripts anpassen.

Gleiches gilt fuer Umbenennungen innerhalb der bestehenden Ebenen —
dieses Dokument ist die Single Source of Truth fuer die sichtbare
Nomenklatur der DeFi Akademie.
