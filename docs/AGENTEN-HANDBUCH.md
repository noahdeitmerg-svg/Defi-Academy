# DeFi Akademie — Agenten-Handbuch (Masterdokument)

**Zweck:** Ein Einstiegsdokument für alle Cursor-/KI-Agenten und Menschen im Repo.  
**Stand:** April 2026 · Branch-Default: `main` · Repo: `Defi-Academy`

> **Regel für Agenten:** Zuerst dieses Handbuch lesen, dann bei Bedarf die verlinkten Fachdokumente. Änderungen am **Ist-Zustand** (Deploy, Module, Pipeline) hier oder im Changelog von `docs/SYSTEMKONTEXT.md` spiegeln.

---

## 1. Produkt in Kurzform

- **DeFi Akademie** (UI-Deutsch; technischer Repo-/Meta-Name teils „Academy“): deutschsprachiges **Lernprogramm** mit Modulen, Lektionen, Videos, Quiz und Praxisübungen.
- **Prinzip:** Tiefe statt Hype — technisch korrekt, risikobewusst, ohne Marketing-Sprache.
- **Öffentliche Plattform (heute):** Next.js-App als **statischer Export** auf **GitHub Pages** (kein Vercel im aktuellen Produktiv-Deploy).
- **Parallel geplant (UX-Build):** erweiterte Lernplattform laut `docs/defi-akademie-build-dokument.md` (u. a. Dashboard, Supabase optional, Cloudflare R2 für Video-CDN) — schrittweise; bestehende Pages-App bleibt bis zur Migration die Quelle der Wahrheit für Live-Kurse.

---

## 2. Zahlen: Ziel vs. Ist (Module & Lektionen)

| Begriff | Wert | Quelle / Bedeutung |
|--------|------|---------------------|
| **Ziel-Lernprogramm** | **17 Module**, **102 Lektionen** | `docs/defi-akademie-build-dokument.md` (UX-/Plattform-Spezifikation) |
| **Kursautoren-Quelle (`Module/`)** | **Alle 17 Module** als `modul-NN-*-FINAL.md` — Modul 17: **`modul-17-portfolio-construction-rwa-FINAL.md`** | Hier liegt das vollständige Rohmaterial; bei inhaltlicher Arbeit **immer** diesen Ordner prüfen. |
| **Plattform-Build (`content/modules/`)** | Slugs **`module1`** … **`module17`** (Lektions-`.md`, `meta.json`, ggf. Quiz) | Entsteht durch **Auto-Import** aus `Module/`; wenn lokal ein Ordner fehlt, Import-Workflow / Branch-Stand prüfen — **nicht** schließen, Modul 17 fehle inhaltlich. |
| **Videos auf `main` (`public/videos/`)** | **Modul 1–3** je 6 Lektionen fertig | Modul **4–17**: Batch noch ausstehend — siehe §7 |

**Wichtig für Doku-Konsistenz:** Ältere Texte wiesen fälschlich „Modul 4–16“ aus. Korrekt ist **„Modul 4–17“** (= alles nach den drei Free-Grundlagenmodulen), solange die Vision 17 Module umfasst.

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

**UX-Build-Ergänzung (Phase 1 erledigt):** Design-Tokens für die neue UI-Schicht im Namespace `ux-*` in `styles/globals.css`, Komponenten unter `components/ui/`, `lucide-react`, JetBrains Mono-Variable für UX-Mono — ohne die bestehenden Brand-Tokens für Video/Slide zu ersetzen.

---

## 4. Routen & wichtige Pfade (Live-App)

| Bereich | Pfad / Datei |
|--------|----------------|
| Start | `app/page.tsx` |
| Modul | `app/module/[moduleSlug]/` |
| Lektion | `app/module/[moduleSlug]/lesson/[lessonSlug]/` |
| Quiz | `app/module/[moduleSlug]/quiz/` |
| Content (Build) | `content/modules/moduleN/` (`meta.json`, `N-x.md`, ggf. `quiz.json` / `open-quiz.md`) |
| Autoren-Quelle | `Module/modul-NN-*-FINAL.md` → optional Auto-Import nach `content/modules/` |
| Video-Erkennung | `lib/lessonAssets.ts` → `public/videos/<moduleSlug>-<lessonSlug>.mp4` |
| Brand / Video-Look | `brand/` → `npm run sync:brand` |
| Pipeline | `pipeline-test/`, `video-renderer/`, `lesson-asset-generator/`, Skripte in `scripts/` |

Terminologie (Module, Lektionen, kein Wort „Curriculum“ in deutscher UI): **`docs/academy-structure.md`**.

---

## 5. Zwei Content-Stränge (nicht verwechseln)

1. **Bestehende GitHub-Pages-Kurs-App**  
   MDX/Markdown aus `content/modules/`, Parser in `lib/parseLesson.ts`, `lib/lessonSectionParser.ts`, Slides/Quiz in der aktuellen Lesson-UX.

2. **UX-Neuaufbau (Build-Dokument)**  
   Zielstruktur u. a. `content/modules/01-defi-grundlagen/` mit `module.json`, `lesson.md`, `slides.json`, `quiz.json` — **noch nicht** die alleinige Quelle der Live-Seite; Umsetzung in Phasen, siehe `docs/defi-akademie-build-dokument.md` und `docs/SYSTEMKONTEXT.md` §8.

Agenten: Änderungen an Lerninhalten für **Live** weiter über den etablierten Import (`Module/` → `content/modules/` …), bis die neue Pipeline aktiv ist.

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

## 8. Roadmap Produkt & Infrastruktur (aus `docs/ROADMAP.md`)

1. Video + Visuals-Qualität stabilisieren.  
2. Automatisierung für alle Lektionen / Batch.  
3. Langfristig: große MP4s nicht dauerhaft im Git — Hosting/CDN (Spezifikation: Cloudflare R2; ältere Doku erwähnte Vimeo — **Entscheidung offen**, Zielbild „schlankes Repo + Streaming“).

---

## 9. Offene Punkte (Auszug)

| Thema | Hinweis |
|--------|---------|
| **Modul 17** | Inhalt in `Module/modul-17-…-FINAL.md`; nach Import unter `content/modules/module17/`. |
| **Modul 16 Quiz** | Validator-Warnung möglich — Quiz-Tab ausgeblendet bis Inhalt da. |
| **Auto-Import** | Ein Lauf (z. B. Modul 10) kann in Actions fehlgeschlagen sein — Logs prüfen. |
| **UX-Build** | Phasen 2+ nach `defi-akademie-build-dokument.md`; Supabase nur mit Env. |

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
| **`docs/defi-akademie-build-dokument.md`** | Volle UX-/Plattform-Spezifikation (17 Module, Phasen 1–12) |
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

- Bei Meilensteinen (neues Modul-Video, neuer Deploy-Kanal, fertiggestelltes UX-MVP): **dieses Datei aktualisieren** und eine Zeile in **`docs/SYSTEMKONTEXT.md` §9 Changelog** ergänzen.
