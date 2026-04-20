# Roadmap — DeFi Akademie (Gesamt)

**Stand:** 2026-04-20 · Master-Kontext: [`docs/AGENTEN-HANDBUCH.md`](./AGENTEN-HANDBUCH.md) · Kurz-Gedächtnis/Changelog: [`docs/SYSTEMKONTEXT.md`](./SYSTEMKONTEXT.md)

Diese Datei bündelt **Produkt**, **Plattform/UX**, **Content**, **Video-Pipeline** und **Distribution**. Detail-Backlogs bleiben in [`docs/offeneAufgaben.md`](./offeneAufgaben.md).

---

## A. Produktvision (unverändertes Ziel)

| Thema | Ziel |
|--------|------|
| Lernprogramm | **17 Module**, **102 Lektionen**, deutsch, technisch korrekt, **ohne Anlageberatung** |
| Didaktik | Module 1–3 **Free**, 4–17 **Pro** (Zahlungslogik später) |
| Autoren-Quelle | `Module/modul-NN-*-FINAL.md` (insb. Modul 17: Portfolio/RWA) |

---

## B. Plattform & UX (Next.js 15, statischer Export)

### B.1 Ist-Stand (umgesetzt)

- **Öffentliche Landing** `/` — Marketing, Stufen, Kursinhalt-Teaser, Free/Pro, FAQ (an SVG-Referenz angelehnt).
- **Neue Lernshell** unter `app/(app)/` mit Auth-Gate (Demo ohne Supabase): **Dashboard**, **Kurs** `/kurs`, **Fortschritt**, **Profil**, dynamisch **`/kurs/[modulId]/[lektionId]`** (alle 102 Pfade SSG).
- **Parallel:** Legacy-Kurs **`/module/[moduleSlug]/…`** und **`/klassisch`** bleiben erhalten, bis Inhalte vollständig migriert sind.
- **Design:** `ux-*`-Tokens in `styles/globals.css`, Komponenten in `components/{layout,navigation,course,lesson,marketing,brand}`.
- **Visuelle Referenz (versioniert):** `docs/ux-visuals/*.svg`.

### B.2 Videos in der neuen Shell

- **Reihenfolge (Implementierung):** Zuerst **`public/videos/moduleN-N-M.mp4`** (Legacy-Namen wie `publish-videos` / `lessonAssets`), sonst **CDN** `…/modules/<modulId>/<lektionId>.mp4` (`NEXT_PUBLIC_VIDEO_CDN_URL`, siehe `.env.local.example`). Code: `lib/content/resolveUxLessonVideoUrl.ts`.
- **Geplant (Betrieb):** **A** — MP4s unter `public/videos/` erzeugen (`npm run publish-videos` o. ä.) und **committen** (nur `public/videos/`, nicht das gitignorte Root-`/videos/`). **B** — danach CDN mit Slug-Pfaden befüllen und Repo schlank halten.

### B.3 Offen (ohne externe Keys nur teilweise automatisierbar)

| Thema | Beschreibung |
|--------|----------------|
| **Zahlung / Pro** | UI-Banner und Tier lokal; echte Kasse (Stripe o. ä.) fehlt. |
| **Supabase produktiv** | Nur mit Env und Projekt-Setup. |
| **Sidebar-Titel** | Slug-basierte Kurzlabels; optional echte Titel aus `lesson.md` pro Lektion laden. |
| **Ein-Kurs-Pipeline** | Langfristig: eine Content-Quelle statt Legacy `moduleN` + UX-Slug-Ordnern parallel. |

---

## C. Content-Pfade (zwei Stränge — nicht verwechseln)

| Strang | Ordner | Nutzung |
|--------|--------|---------|
| **Legacy (Pages-Kurs)** | `content/modules/module1` … `module17` | `/module/…`, `validate:content`, alter Parser |
| **UX-Build (Slug-Module)** | `content/modules/01-defi-grundlagen`, `02-wallets-sicherheit`, `03-blockchain-mechanik` | `/kurs/…`, `lib/content/loadLesson.ts` (`lesson.md`, `slides.json`, `quiz.json`) |

**Stand Free-Module UX-Pfad:** Modul **1–3** mit je **6** Lektionsordnern und Texten/Folien/Quiz; **Videos:** zuerst **A** `public/videos/`, später **B** CDN.

**Offen:** Modul **4–17** im UX-Pfad anlegen **oder** Import-Tool so erweitern, dass aus `Module/` konsistent Slug-Strukturen werden.

---

## D. Video-Pipeline & Distribution (Remotion, Gamma, ElevenLabs)

Reihenfolge wie historisch beschlossen — weiterhin maßgeblich für **MP4-Produktion**:

### Phase D.1 — Qualität (Video + Gamma „Visuals only“)

- Remotion-Template, Timing, Voice; Gamma nur **Einzelvisuals** (`visualNN.png`), nie ganze Slides — [`docs/SLIDE_GENERATION_RULES.md`](./SLIDE_GENERATION_RULES.md).
- Abnahme: mindestens ein Modul visuell/inhaltlich release-tauglich; Naming `publish-videos` ↔ Plattform-Konventionen dokumentiert in [`docs/academy-build.md`](./academy-build.md).

### Phase D.2 — Automatisierung / Batch

- Academy-Build → Voice → Render-Batch; Logs unter `logs/` (lokal; Ordner gitignored).
- **Modul 1–3:** MP4s auf `main` unter `public/videos/` (Legacy) bzw. Upload auf CDN für **neue** Lektions-URLs.
- **Modul 4–17:** Batch — Checkliste [`docs/VIDEO_BATCH_ROADMAP.md`](./VIDEO_BATCH_ROADMAP.md).

### Phase D.3 — Schlankes Repo + Streaming

- Große Binärdateien dauerhaft **nicht** im Git; Zielbild: **CDN** (Spez: Cloudflare R2 in `defi-akademie-build-dokument.md`; ältere Erwähnung Vimeo = optional).
- Legacy-`LessonVideoHero` vs. neuer `VideoPlayer`: beide Welten bis Konsolidierung pflegen **oder** Embed-IDs zentral in Config.

---

## E. CI, Qualität, Betrieb

- Push **`main`** → GitHub Actions (`nextjs.yml`): Lint, Typecheck, `next build`, Deploy GitHub Pages.
- **`npm run check`** = `validate:content` + lint + typecheck + build (siehe [`docs/BUILD.md`](./BUILD.md)).
- **Auto-Import** (`Module/**/*.md` → `content/modules/`): Workflow `auto-import.yml` — bei Fehlschlag Actions-Logs.

---

## F. Priorisierte Meilensteine (Überblick)

| # | Meilenstein | Status | Anmerkung |
|---|-------------|--------|------------|
| F1 | UX-Shell + Landing + Kurs/Lektion SSG | **Erledigt** | SVG-Referenz `docs/ux-visuals/` |
| F2 | Free-Module 1–3 im UX-Pfad inhaltlich | **Erledigt** | `lesson.md` / slides / quiz je Lektion |
| F3 | Free-Lektionen **sichtbar** in UX-Player | **A erledigt** (MP4s in `public/videos/`) | **B:** CDN Slug-Pfade + Env — gemeinsam nachziehen, Repo dann schlanker. |
| F4 | Video-Batch Modul 4–17 | **Offen** | Pipeline + Budget |
| F5 | Modul 16 Quiz (Legacy) | **Erledigt** | `open-quiz.md` Platzhalter → Validator grün |
| F6 | Zahlung + Pro-Zugang produktiv | **Offen** | Produkt/Compliance |
| F7 | Content-Stränge zusammenführen | **Offen** | Architekturentscheid |

---

## G. Weiterführende Dokumente

| Dokument | Inhalt |
|----------|--------|
| [`docs/offeneAufgaben.md`](./offeneAufgaben.md) | Detailliertes Backlog inkl. Pipeline-Tickets |
| [`docs/defi-akademie-build-dokument.md`](./defi-akademie-build-dokument.md) | Volle UX-Spez (Phasen 1–12) |
| [`docs/VIDEO_PRODUCTION_WORKFLOW.md`](./VIDEO_PRODUCTION_WORKFLOW.md) | Schritt-für-Schritt Video |
| [`docs/GITHUB_PAGES.md`](./GITHUB_PAGES.md) | Deploy, Webhooks |

---

*Letzte inhaltliche Gesamtüberarbeitung dieser Roadmap: 2026-04-20.*
