# DeFi Academy -- Systemdokument

## 1. Projektübersicht

DeFi Academy ist eine strukturierte Lernplattform für dezentrale
Finanzsysteme (DeFi). Ziel ist es, eine umfassende Schulung zu
entwickeln, die Menschen ohne Vorkenntnisse Schritt für Schritt zu einem
tiefen Verständnis von DeFi führt.

Der Kurs beginnt bei den Grundlagen von Blockchain und Wallets und führt
über dezentrale Börsen, Lending-Protokolle und Liquidationsmechaniken
bis hin zu fortgeschrittenen DeFi-Strategien.

Die Plattform soll langfristig folgende Komponenten enthalten:

-   strukturierte Lernmodule
-   eine Online-Kursplattform
-   Video-Lektionen
-   interaktive Übungen
-   SEO-Artikel
-   automatisierte Content-Generierung

Alle Inhalte werden zuerst auf **Deutsch** erstellt.

------------------------------------------------------------------------

## 2. Projektziel

Eine hochwertige DeFi-Schulung zu schaffen, die:

-   technisch korrekt
-   didaktisch verständlich
-   strategisch fundiert
-   langfristig relevant

ist.

Der Fokus liegt auf:

-   Mechanik
-   Kapitalflüsse
-   Risiken
-   nachhaltige Strategien

------------------------------------------------------------------------

## 3. Didaktische Philosophie

Der Kurs basiert auf vier Kernkompetenzen professioneller
DeFi-Analysten:

1.  Liquidity Reading
2.  Interest Rate Understanding
3.  Liquidation Mechanics
4.  Capital Flow Analysis

Der Kurs führt durch drei Ebenen:

### Ebene 1 -- Grundlagen

-   Blockchain
-   Wallets
-   Transaktionen
-   DEX Grundlagen

### Ebene 2 -- Protokollmechaniken

-   Liquidity Pools
-   AMM Modelle
-   Lending Markets
-   Collateral
-   Liquidations

### Ebene 3 -- Strategien

-   Yield Strategien
-   Leverage Loops
-   Delta-Neutral Strategien
-   Portfolio Struktur

------------------------------------------------------------------------

## 4. Standardstruktur jeder Lektion

Jede Lektion muss exakt folgende Struktur haben:

Lesson Title\
Learning Objectives\
Explanation\
Slide Summary\
Voice Narration Script\
Visual Suggestions\
Exercise\
Quiz

Diese Struktur ermöglicht automatische Generierung von:

-   Website Lessons
-   Slides
-   Videos
-   Übungen
-   Quizfragen

------------------------------------------------------------------------

## 5. Sprache

Projektstandard:

Alle Inhalte werden **auf Deutsch** erstellt.

Dies betrifft:

-   Module
-   Website
-   Videos
-   Artikel
-   UX Texte

------------------------------------------------------------------------

## 6. Agentenstruktur

Das Projekt nutzt spezialisierte KI-Agenten.

### Operating Brain

Koordiniert das gesamte Projekt.

Aufgaben:

-   Roadmap überwachen
-   Agenten koordinieren
-   Qualitätsprüfung
-   Projektstruktur definieren

------------------------------------------------------------------------

### Content Agent

Erstellt die Kursmodule.

Output: Markdown Module.

Struktur jeder Lektion:

Lesson Title\
Learning Objectives\
Explanation\
Slide Summary\
Voice Narration Script\
Visual Suggestions\
Exercise\
Quiz

Regeln:

-   technisch korrekt
-   klare Sprache
-   kein Marketing-Hype
-   Fokus auf Mechanik

------------------------------------------------------------------------

### Video Agent

Transformiert Module in Video-Strukturen.

Output:

-   Slides
-   Voice Scripts
-   Visual Konzepte

Der Video Agent verändert **keine Inhalte**, sondern bereitet sie nur
für Videos auf.

------------------------------------------------------------------------

### UX Agent

Gestaltet die Lernplattform.

Verantwortung:

-   Plattformstruktur
-   Navigation
-   Landingpage
-   Kursdashboard
-   Paywall Struktur

------------------------------------------------------------------------

### Growth Agent

Erstellt Inhalte für Reichweite.

Output:

-   SEO Artikel
-   Threads
-   Newsletter

Basis: Kursmodule.

------------------------------------------------------------------------

### Build Agent

Baut und betreibt die Plattform.

Tools:

-   Cursor (Editor + AI-Agent)
-   GitHub (Source of Truth + CI/CD)
-   GitHub Pages (statisches Hosting)
-   GitHub Actions (Auto-Import + Deploy)

Implementiert:

-   Website (Next.js App Router, statischer Export)
-   Lesson Rendering (MDX über `next-mdx-remote`)
-   Parser (Markdown → strukturierte Sections: Explanation / Slide Summary / Voice Narration / Visual Suggestions / Exercise / Quiz)
-   Automatischer Content-Import (Module/*.md → content/modules/ via GitHub Actions)
-   Deployment (Static Export → GitHub Pages, getriggert per Push **oder** Webhook)

------------------------------------------------------------------------

## 7. Plattformstruktur

Die Plattform umfasst:

-   Landing Page
-   Course Dashboard
-   Module Übersicht
-   Lesson Pages
-   Übungen
-   Quiz
-   Fortschrittsanzeige

------------------------------------------------------------------------

## 8. Monetarisierungsstruktur

Free Tier:

Module 1--3

Pro Tier:

Vollständiger Kurs

Geplantes Modell:

49 \$ pro Monat

------------------------------------------------------------------------

## 9. Roadmap

Phase 1 -- Kursmodule erstellen (laufend, Modul 1-12 + 13A live; 13B-17 in Produktion)\
Phase 2 -- Plattformstruktur definieren ✅\
Phase 3 -- Website bauen ✅ (Next.js auf GitHub Pages live)\
Phase 4 -- Stabilität & Content-Pipeline-Automation ✅ (Auto-Import, Webhook-Deploy, Content-Validator, MDX-Safety)\
Phase 5 -- Video Pipeline (als Nächstes: Asset-Erkennung pro Lektion, visuals.json, echte lesson.mp4)\
Phase 6 -- Quiz-Statistik + Suche\
Phase 7 -- Growth System

------------------------------------------------------------------------

## 10. Workflow

### Content-Produktion

Content Agent → erstellt Modul als `Module/modul-NN-*.md`\
Operating Brain → prüft Qualität\
Push auf `main` → Auto-Import-Workflow normalisiert nach `content/modules/` → Deploy\
UX Agent → Plattformstruktur\
Build Agent → Website\
Video Agent → Videos (Phase 5)\
Growth Agent → Traffic (Phase 7)

### Operativer Fluss (vollautomatisch)

1.  Datei `Module/modul-NN-*.md` landet auf `main`
2.  Workflow `Auto-import curriculum` parst und committet nach `content/modules/` zurück
3.  Workflow feuert `repository_dispatch: pages-deploy`
4.  Workflow `Deploy Next.js site to Pages` validiert Content, baut Next-Export, veröffentlicht auf GitHub Pages
5.  Live in ca. 2 Minuten unter `https://noahdeitmerg-svg.github.io/Defi-Academy/`

Zusätzliche Trigger ohne Git-Push:\
`scripts/trigger-pages-deploy.ps1` / `.sh` oder SaaS-Webhook (Make / n8n / Zapier).

------------------------------------------------------------------------

## 11. Betrieb & Infrastruktur

### Deployment

-   Hosting: GitHub Pages (statischer Next-Export, `output: "export"`)
-   Trigger: Push auf `main`, `workflow_dispatch`, `repository_dispatch: pages-deploy`
-   Environment-Variable im Build: `NEXT_PUBLIC_SITE_URL` (= Pages-URL) für korrekte `metadataBase`
-   Basispfad unter `/Defi-Academy/` (ergibt sich aus dem Repo-Namen)

### Content-Pipeline

-   Rohquelle: `Module/modul-NN-*.md` (deutsche Kurssprache, 6 Lektionen + Modul-Abschluss-Quiz)
-   Parser:
    -   `lib/splitCursorModule.ts` trennt Modul in Lektionen
    -   `lib/lessonSectionParser.ts` erkennt die 6 Pflicht-Sektionen (Explanation, Slide Summary, Voice Narration Script, Visual Suggestions, Exercise, Quiz) in deutscher und englischer Schreibweise
    -   `lib/parseLesson.ts` baut aus den Sections das `ParsedLesson`-Objekt
    -   `lib/mdxSafe.ts` maskiert Prosa-`<` (z. B. `<$10k`, `<1 Jahr`), damit MDX sie nicht als JSX interpretiert
-   Normalisiertes Ziel: `content/modules/moduleN/` mit `meta.json`, `N-1.md` … `N-6.md`, und `quiz.json` (MC) **oder** `open-quiz.md` (Freitext)
-   Sanity-Check: `npm run validate:content` (läuft lokal via `npm run check` und in CI)

### Workflows

| Workflow | Trigger | Zweck |
|---|---|---|
| `.github/workflows/nextjs.yml` | push main, workflow_dispatch, repository_dispatch:pages-deploy | Content validieren, bauen, deployen |
| `.github/workflows/auto-import.yml` | push `Module/**/*.md`, workflow_dispatch, repository_dispatch:content-import | Import → Commit → Deploy-Dispatch |

Beide laufen unter `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24=true` (Pflicht-Opt-in zum 02.06.2026).

### Entwicklungs-Setup (Windows)

-   Auth: SSH (Port 443 via `ssh.github.com`) mit `id_ed25519_defi`, Key im Windows `ssh-agent` (Autostart)
-   Git nutzt das Windows-OpenSSH: `git config --global core.sshCommand "C:/Windows/System32/OpenSSH/ssh.exe"`
-   Remote: `git@github.com:noahdeitmerg-svg/Defi-Academy.git`
-   Pushes von Workflow-Files sind damit direkt aus Cursor möglich (kein PAT-Scope-Problem mehr)

### Dokumente im Repo

-   `README.md` — Einstieg
-   `docs/BUILD.md` — Build- und Dev-Setup
-   `docs/GITHUB.md` — Git-/GitHub-Basics
-   `docs/GITHUB_PAGES.md` — Deployment-Details, Webhook-Beispiele
-   `docs/OPS_CHECKLIST.md` — Betriebs-/Smoke-Test-Routine

### Stand-der-Infrastruktur (Snapshot)

-   ✅ Statischer Next-Export auf GitHub Pages live
-   ✅ Auto-Import von Modul-Markdown → `content/modules/`
-   ✅ Webhook-Rebuild ohne Push (Script + SaaS-tauglich)
-   ✅ Content-Validator in CI
-   ✅ MDX-Safety-Layer (`escapeUnsafeMdxLessThan`)
-   ✅ Node-24-Opt-in für CI-Actions
-   ✅ SSH-Auth mit Agent, direkte Pushes aus Cursor
-   ⏳ Video-/Asset-Pipeline (geplant, Phase 5)
-   ⏳ Quiz-Statistik, Suche (geplant, Phase 6)

------------------------------------------------------------------------

## 12. Projektphilosophie

Leitprinzip:

**Tiefe statt Hype.**

Die DeFi Academy vermittelt Wissen, das langfristig relevant bleibt.
