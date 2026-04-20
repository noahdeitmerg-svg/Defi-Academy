# DeFi Akademie — Agenten-Handbuch (Masterdokument)

**Zweck:** Ein Einstiegsdokument für alle Cursor-/KI-Agenten und Menschen im Repo.  
**Stand:** April 2026 · Branch-Default: `main` · Repo: `Defi-Academy`

> **Regel für Agenten:** Zuerst dieses Handbuch lesen, dann bei Bedarf die verlinkten Fachdokumente. Änderungen am **Ist-Zustand** (Deploy, Module, Pipeline) hier oder im Changelog von `docs/SYSTEMKONTEXT.md` (Abschnitt 9) spiegeln.

---

## 1. Produkt in Kurzform

- **DeFi Akademie** (UI-Deutsch; technischer Repo-/Meta-Name teils „Academy“): deutschsprachiges **Lernprogramm** mit Modulen, Lektionen, Videos, Quiz und Praxisübungen.
- **Prinzip:** Tiefe statt Hype — technisch korrekt, risikobewusst, ohne Marketing-Sprache.
- **Öffentliche Plattform (heute):** Next.js-App als **statischer Export** auf **GitHub Pages** (kein Vercel im aktuellen Produktiv-Deploy).
- **UX-Lernshell (umgesetzt, parallel):** Dashboard, Kurs, Lektion, Fortschritt, Profil laut `docs/defi-akademie-build-dokument.md` — **Legacy** `/module/…` und **neu** `/kurs/…` coexistieren. Videos: Legacy `public/videos/` vs. neue Shell **CDN-URL** (`NEXT_PUBLIC_VIDEO_CDN_URL`, siehe `loadLesson.ts`). Supabase/R2 produktiv = optional später.

---

## 2. Zahlen: Ziel vs. Ist (Module & Lektionen)

| Begriff | Wert | Quelle / Bedeutung |
|--------|------|---------------------|
| **Ziel-Lernprogramm** | **18 Module**, **ca. 102 Lektionen** | `docs/defi-akademie-build-dokument.md` (UX-/Plattform-Spezifikation) |
| **Kursautoren-Quelle (`Module/`)** | **Module 0–17** als `modul-NN-*-FINAL.md` — Modul 17: **`modul-17-portfolio-construction-rwa-FINAL.md`** | Hier liegt das vollständige Rohmaterial; bei inhaltlicher Arbeit **immer** diesen Ordner prüfen. |
| **Plattform-Build (`content/modules/`)** | (a) Legacy **`module1`…`module17`** — (b) UX-Slugs **`01-defi-grundlagen`**, **`02-wallets-sicherheit`**, **`03-blockchain-mechanik`** (je `module.json`, Lektionsordner mit `lesson.md`) | (a) Auto-Import aus `Module/`. (b) Free-Module 1–3 für `/kurs/…` befüllt; Modul 0 + 4–17 UX-Ordner folgen nach Entscheid / Import-Tool. |
| **Videos auf `main` (`public/videos/`)** | **Modul 1–3** je 6 Lektionen fertig | Modul **4–17**: Batch noch ausstehend — siehe Abschnitt 7 |

**Modul 0 (neu):** Orientation/Introduction. Zweck: Studierende vor den technischen Modulen in Struktur der Akademie, Risiko-Bewusstsein und Lernmethodik einführen.

### Verbindliche Modulreihenfolge (0–17)

1. Module 0 — Introduction to the DeFi Academy  
2. Module 1 — DeFi Fundamentals  
3. Module 2 — Wallets and Security  
4. Module 3 — Blockchain Mechanics  
5. Module 4 — DEX Mechanics  
6. Module 5 — Liquidity Pools  
7. Module 6 — Lending Markets  
8. Module 7 — Collateral and Liquidations  
9. Module 8 — Stablecoins  
10. Module 9 — Yield Strategies  
11. Module 10 — Leverage Loops  
12. Module 11 — MEV  
13. Module 12 — Flash Loans  
14. Module 13 — veTokenomics  
15. Module 14 — Cross-Chain Infrastructure  
16. Module 15 — On-Chain Analytics  
17. Module 16 — Composability Risk  
18. Module 17 — Portfolio Construction and RWA

**Lernpfad (aktualisiert):** Orientation (Modul 0) → Foundations (1–4) → Protocols (5–10) → Infrastructure (11–14) → Advanced Analysis and Strategy (15–17).

---

## 3. Tech-Stack & Deploy (Ist)

| Thema | Details |
|--------|---------|
| Framework | **Next.js 15** (App Router), React 19, TypeScript `strict`, Tailwind **v4** (`@import "tailwindcss"`, Theme-Token u. a. in `styles/globals.css` `@theme`) |
| Export | `output: "export"` → Ordner `out/` |
| `basePath` | Setzen, wenn `GITHUB_PAGES=true` (Repo-Pfad `/Defi-Academy`) — siehe `next.config.ts` |
| Live-URL | `https://noahdeitmerg-svg.github.io/Defi-Academy/` (`NEXT_PUBLIC_SITE_URL` in CI) |
| Assets | `withBasePath()` in `lib/assetPath.ts` für Videos/Poster unter `public/` |
| CI | Push auf `main` → `nextjs.yml` (Validierung, Build, Pages). Auto-Import: `auto-import.yml` bei Änderungen unter `Module/**/*.md` |
| Auth / Backend | **Nicht** produktiv angebunden; Supabase nur in UX-Spezifikation / später |

**UX-Build:** `ux-*`-Tokens, Landing, Kurs-, Lektions- und Navigations-Komponenten (siehe `docs/ux-visuals/`); `components/ui/` für Basis-Widgets; JetBrains Mono für UX-Mono — Brand-Tokens für Video/Slide (`brand/`) bleiben separat.

---

## 4. Routen & wichtige Pfade (Live-App)

| Bereich | Pfad / Datei |
|--------|----------------|
| Landing (Marketing) | `app/page.tsx` → `/` |
| **Neue Lernshell** | `app/(app)/` — u. a. `/dashboard`, `/kurs`, `/kurs/[modulId]`, `/kurs/[modulId]/[lektionId]`, `/fortschritt`, `/profil` |
| **Legacy-Kurs** | `app/module/[moduleSlug]/`, `lesson/[lessonSlug]/`, `quiz/` |
| Klassische Liste | `app/klassisch/page.tsx` |
| Content **UX-Pfad** | `content/modules/01-defi-grundlagen/…`, `02-wallets-sicherheit/…`, `03-blockchain-mechanik/…` (`module.json`, `*/lesson.md`, `slides.json`, `quiz.json`) |
| Content **Legacy** | `content/modules/moduleN/` (`meta.json`, `N-x.md`, ggf. `quiz.json` / `open-quiz.md`) |
| Content **Zielstruktur (neu)** | `content/modules/module-00/` … `content/modules/module-17/` (dokumentiert; bestehende Ordner vorerst unverändert) |
| Autoren-Quelle | `Module/modul-NN-*-FINAL.md` → optional Auto-Import nach `content/modules/` |
| Video **Legacy-UI** | `lib/lessonAssets.ts` → `public/videos/<moduleSlug>-<lessonSlug>.mp4` |
| Video **UX-Lektion** | `lib/content/loadLesson.ts` → CDN `…/modules/{modulId}/{lektionId}.mp4` |
| Brand / Video-Look | `brand/` → `npm run sync:brand` |
| Pipeline | `pipeline-test/`, `video-renderer/`, `lesson-asset-generator/`, Skripte in `scripts/` |

Terminologie (Module, Lektionen, kein Wort „Curriculum“ in deutscher UI): **`docs/academy-structure.md`**.

---

## 5. Zwei Content-Stränge (nicht verwechseln)

1. **Legacy GitHub-Pages-Kurs** (`/module/…`)  
   Markdown aus `content/modules/moduleN/`, Parser `lib/parseLesson.ts`, `lib/lessonSectionParser.ts`; Videos unter `public/videos/`.

2. **UX-Lernshell** (`/kurs/…`)  
   Struktur `content/modules/<slug>/` mit `module.json`, pro Lektion `lesson.md`, `slides.json`, `quiz.json`; Loader `lib/content/loadModules.ts` + `loadLesson.ts`; Videos per **CDN-URL** (Env). **Free-Module 1–3** sind in diesem Pfad befüllt.

Agenten: Inhaltsänderungen je nach Ziel-UI wählen — Legacy-Import (`Module/` → `moduleN`) **und/oder** Slug-Ordner für `/kurs/` pflegen, bis eine Pipeline beides vereinheitlicht.

---

## 6. Video- & Render-Pipeline (Kurzüberblick)

- **Gamma:** nur **Einzel-Visuals** (`visual01.png` …), **kein** fertiges Slide-Deck für den Renderer — siehe **`docs/SLIDE_GENERATION_RULES.md`**.
- **Remotion:** Layout/Folien in `video-style-engine/slide-template.jsx` (+ Brand aus `brand/`).
- **Academy-Build (npm-Layer):** Befehle und Ordner **`docs/academy-build.md`**; End-to-End-Flow **`docs/VIDEO_PRODUCTION_WORKFLOW.md`**.
- **Renderer-Output → Plattform:** `npm run publish-videos` (`scripts/publish-videos.js`), optional `config/video-slug-map.json`.

Detaillierte Architektur, Validator, Orchestratoren: weiterhin **`docs/defi_academy_system.md`** (tiefe Referenz; kann historische Formulierungen enthalten — bei Konflikt **dieses Handbuch** für aktuelle Zahlen/Deploy).

---

## 7. Roadmap Video (Batch)

- **Fertig:** Modul **1–3** als MP4 auf `main` (je 6 Lektionen); Tabellen-Fix in `brand/slide-helpers.js` + Test.
- **Offen:** **Modul 4–17** per Batch (`npm run videos:module -- --module N` o. ä.) — Budget/Zeit beachten.
- **Vor Groß-Rollout:** Modul-16-Quiz optional (`quiz.json` / `open-quiz.md`); `validate:content` + `GITHUB_PAGES=true npm run build` lokal.

Detail-Checkliste: **`docs/VIDEO_BATCH_ROADMAP.md`** (Titel dort: „4–17“, nicht „4–16“).

---

## 8. Roadmap Produkt & Infrastruktur

Vollständige Übersicht (Produkt, UX, Content, Video, CI): **`docs/ROADMAP.md`**. Kurzfassung:

1. Video + Visuals-Qualität stabilisieren.  
2. Automatisierung / Batch Modul 4–17.  
3. Repo schlank: CDN (R2 o. ä.; Vimeo historisch erwähnt) + konsistente Video-Quelle für **beide** UIs, wo nötig.

---

## 9. Offene Punkte (Auszug)

| Thema | Hinweis |
|--------|---------|
| **Modul 17** | Inhalt in `Module/modul-17-…-FINAL.md`; nach Import unter `content/modules/module17/`. |
| **Modul 16 Quiz** | `open-quiz.md`-Stub unter `content/modules/module16/` — später durch echtes `quiz.json` ersetzbar. |
| **Auto-Import** | Ein Lauf (z. B. Modul 10) kann in Actions fehlgeschlagen sein — Logs prüfen. |
| **UX-Build** | Phasen aus `defi-akademie-build-dokument.md` (Zahlung, Supabase produktiv, ggf. R2) — siehe `docs/ROADMAP.md` Abschnitt B.3. |

Lebendes Backlog: **`docs/offeneAufgaben.md`**.

---

## 10. Git „live ohne manuellen Merge“

- Workflow **`merge-live-to-main.yml`**: Branch `cursor/publish-live` oder `repository_dispatch: merge-live` → Merge nach `main` + Deploy-Dispatch.
- Skripte: `scripts/trigger-merge-live.*`, `scripts/trigger-pages-deploy.*`  
- Details: **`docs/GITHUB_PAGES.md`**.

---

## 11. Dokumenten-Index (was wofür)

| Dokument | Rolle |
|----------|--------|
| **`docs/AGENTEN-HANDBUCH.md`** (dieses) | Master: Stand, Zahlen, Deploy, Roadmaps, Verweise |
| **`docs/SYSTEMKONTEXT.md`** | Kurz-Gedächtnis + **Changelog** bei Repo-Meilensteinen |
| **`docs/defi-akademie-build-dokument.md`** | Volle UX-/Plattform-Spezifikation (18 Module inkl. Modul 0, Phasen 1–12) |
| **`docs/defi_academy_system.md`** | Tiefe Systemdoku, Agenten-Rollen, Pipeline-Details |
| **`docs/academy-structure.md`** | Terminologie & Hierarchie |
| **`docs/academy-build.md`** | Academy-Build npm-Workflow |
| **`docs/VIDEO_PRODUCTION_WORKFLOW.md`** | Schritt-für-Schritt Video |
| **`docs/VIDEO_BATCH_ROADMAP.md`** | Batch-Checkliste Modul 4–17 |
| **`docs/SLIDE_GENERATION_RULES.md`** | Gamma vs. Remotion |
| **`docs/brand-system.md`** | Brand als Single Source of Truth |
| **`docs/BUILD.md`** | Lokales Setup / `npm run check` |
| **`docs/GITHUB_PAGES.md`** | Pages-Deploy, Webhooks |
| **`docs/GITHUB.md`** | Git-Basics |
| **`docs/OPS_CHECKLIST.md`** | Betrieb / Smoke-Tests |
| **`docs/MIGRATION-NOTES.md`** | Lesson-Asset-Generator Multi-Format |
| **`docs/offeneAufgaben.md`** | Backlog |
| **`docs/ROADMAP.md`** | Phasen Video/Distribution |

**Hinweis zu Duplikaten:** Inhaltliche Überschneidungen zwischen `defi_academy_system.md` und älteren Abschnitten in `offeneAufgaben.md` sind beabsichtigt bis zur Konsolidierung — verbindliche **Zahlen** und **Deploy-Ist** stehen in **diesem Handbuch** und im Changelog von `SYSTEMKONTEXT.md`.

---

## 12. Änderungen an diesem Handbuch

- Bei Meilensteinen (neues Modul-Video, neuer Deploy-Kanal, fertiggestelltes UX-MVP): **dieses Datei aktualisieren** und eine Zeile in **`docs/SYSTEMKONTEXT.md` Abschnitt 9 (Changelog)** ergänzen.
