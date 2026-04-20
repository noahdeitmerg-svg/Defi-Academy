# Roadmap — DeFi Akademie (Gesamt)

**Stand:** 2026-04-21 · Master-Kontext: [`docs/AGENTEN-HANDBUCH.md`](./AGENTEN-HANDBUCH.md) · Kurz-Gedächtnis/Changelog: [`docs/SYSTEMKONTEXT.md`](./SYSTEMKONTEXT.md) · **Neuer Chat:** [`docs/HANDOFF-NEUER-CHAT.md`](./HANDOFF-NEUER-CHAT.md)

Diese Datei bündelt **Produkt**, **Plattform/UX**, **Content**, **Video-Pipeline** und **Distribution**. Detail-Backlogs bleiben in [`docs/offeneAufgaben.md`](./offeneAufgaben.md).

---

## A. Produktvision (unverändertes Ziel)

| Thema | Ziel |
|--------|------|
| Lernprogramm | **18 Module**, **ca. 102 Lektionen**, deutsch, technisch korrekt, **ohne Anlageberatung** |
| Didaktik | Modul 0 **Orientation/Introduction**, Module 1–3 **Free**, 4–17 **Pro** (Zahlungslogik später). **Dev (2026-04):** In `data/courseStructure.ts` vorübergehend **alle `tier: "free"`**, damit `/kurs/…` ohne Supabase testbar — vor Launch wieder auf Ziel-Stufen setzen. |
| Autoren-Quelle | `Module/modul-NN-*-FINAL.md` (insb. Modul 17: Portfolio/RWA) |

---

## B. Plattform & UX (Next.js 15, statischer Export)

### B.1 Ist-Stand (umgesetzt)

- **Öffentliche Landing** `/` — Marketing, Stufen, Kursinhalt-Teaser, Free/Pro, FAQ (an SVG-Referenz angelehnt).
- **Neue Lernshell** unter `app/(app)/` mit Auth-Gate (Demo ohne Supabase): **Dashboard**, **Kurs** `/kurs`, **Fortschritt**, **Profil**, dynamisch **`/kurs/[modulId]/[lektionId]`** (alle 102 Pfade SSG). **Lektionsseite:** kein Folien-Block unter dem Video (Folien nur im Video); `slides.json` unverändert für Video-Pipeline; frühere Folien-Komponenten unter `components/_deprecated/`. **Key Takeaways:** UI `components/lesson/KeyTakeaways.tsx`; Inhalte zentral in `content/takeaways.json` (Loader `lib/content/loadTakeaways.ts`) — Befüllung für alle Lektionen: [`docs/CONTENT-AGENT-TAKEAWAYS.md`](./CONTENT-AGENT-TAKEAWAYS.md).
- **Parallel:** Legacy-Kurs **`/module/[moduleSlug]/…`** und **`/klassisch`** — Ziel ist **F7** (ein Strang + Redirects); Stand Mapping: [`docs/F7-MAPPING.md`](./F7-MAPPING.md).
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

### B.4 Curriculum-Referenz (ab sofort verbindlich)

- **Module 0–17 (Reihenfolge in der Navigation):**
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
- **Zweck von Modul 0:** Onboarding/Orientierung vor den Technik-Modulen; Struktur der Akademie, Risiko-Bewusstsein und Lernmethodik.
- **Lernpfad (aktualisiert):**
  - Orientation: Modul 0
  - Foundations: Module 1–4
  - Protocols: Module 5–10
  - Infrastructure: Module 11–14
  - Advanced Analysis and Strategy: Module 15–17

---

## C. Content-Pfade (zwei Stränge — nicht verwechseln)

| Strang | Ordner | Nutzung |
|--------|--------|---------|
| **Legacy (Pages-Kurs)** | `content/modules/module1` … `module16` (Modul-17-Quelle oft nur in `Module/`) | `/module/…`, `validate:content`, alter Parser |
| **UX-Build (Slug-Module)** | `content/modules/01-defi-grundlagen`, `02-wallets-sicherheit`, `03-blockchain-mechanik` | `/kurs/…`, `lib/content/loadLesson.ts` (`lesson.md`, `slides.json`, `quiz.json`, plus `content/takeaways.json` für Key Takeaways) |

**Dokumentierter Zielpfad (neu):** `content/modules/module-00` … `content/modules/module-17` (ohne bestehende Ordner umzubenennen).

**Stand Free-Module UX-Pfad:** Modul **1–3** mit je **6** Lektionsordnern und Texten/Folien/Quiz; **Videos:** zuerst **A** `public/videos/`, später **B** CDN.

**Offen:** Modul **4–17** im UX-Pfad anlegen **oder** Import-Tool so erweitern, dass aus `Module/` konsistent Slug-Strukturen werden — **F7** ([`docs/F7-MAPPING.md`](./F7-MAPPING.md): Phase 1 Audit/Mapping **fertig**; Phasen 2–6 Migration/Archiv/Redirects/Tests ausstehend).

---

## D. Video-Pipeline & Distribution (Remotion, Gamma, ElevenLabs)

Reihenfolge wie historisch beschlossen — weiterhin maßgeblich für **MP4-Produktion**:

### Phase D.1 — Qualität (Video + Gamma „Visuals only“)

- **TTS (Skript → ElevenLabs):** Script Optimizer + Pronunciation-Wörterbuch — [`docs/VIDEO_PRODUCTION_WORKFLOW.md`](./VIDEO_PRODUCTION_WORKFLOW.md), `npm run test:voice-pipeline`.
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
| F2 | Free-Module 1–3 im UX-Pfad inhaltlich | **Erledigt** | `lesson.md` / slides / quiz je Lektion · **Key Takeaways:** Struktur + UI **erledigt** (`content/takeaways.json`, Loader, `KeyTakeaways`); **Inhalt** für alle 102 Lektionen offen — `docs/CONTENT-AGENT-TAKEAWAYS.md` |
| F3 | Free-Lektionen **sichtbar** in UX-Player | **A erledigt** (MP4s in `public/videos/`) | **B:** CDN Slug-Pfade + Env — gemeinsam nachziehen, Repo dann schlanker. |
| F4 | Video-Batch Modul 4–17 | **Offen** | Pipeline + Budget |
| F5 | Modul 16 Quiz (Legacy) | **Erledigt** | `open-quiz.md` Platzhalter → Validator grün |
| F6 | Zahlung + Pro-Zugang produktiv | **Offen** | Produkt/Compliance |
| F7 | Content-Stränge zusammenführen | **In Arbeit** | Phase 1 **erledigt** (`docs/F7-MAPPING.md`). **Phase 2 Vorbereitung erledigt:** `docs/F7-PHASE2-FRONTMATTER.md`, Redirect-Generator `npm run f7:redirects` → `config/f7-*.`, Doku `docs/F7-REDIRECTS.md`, Modul-17-Split `npm run split:modul-17`. Phasen 3–6 (Migration, `_archive/`, Live-Redirects auf Host) offen — Freigabe F7-MAPPING §C. |

---

## G. Weiterführende Dokumente

| Dokument | Inhalt |
|----------|--------|
| [`docs/HANDOFF-NEUER-CHAT.md`](./HANDOFF-NEUER-CHAT.md) | Neuer Cursor-Chat: Kontext + Copy-Paste-Prompt |
| [`docs/F7-MAPPING.md`](./F7-MAPPING.md) | Content-Merge F7 — Legacy → UX (Audit Phase 1) |
| [`docs/offeneAufgaben.md`](./offeneAufgaben.md) | Detailliertes Backlog inkl. Pipeline-Tickets |
| [`docs/defi-akademie-build-dokument.md`](./defi-akademie-build-dokument.md) | Volle UX-Spez (Phasen 1–12) |
| [`docs/KEY-TAKEAWAYS.md`](./KEY-TAKEAWAYS.md) | Key Takeaways: Format, Pfade, Redaktion |
| [`docs/CONTENT-AGENT-TAKEAWAYS.md`](./CONTENT-AGENT-TAKEAWAYS.md) | Befüllungsauftrag `takeaways.json` (102 Lektionen) |
| [`docs/VIDEO_PRODUCTION_WORKFLOW.md`](./VIDEO_PRODUCTION_WORKFLOW.md) | Schritt-für-Schritt Video |
| [`docs/GITHUB_PAGES.md`](./GITHUB_PAGES.md) | Deploy, Webhooks |

---

*Letzte inhaltliche Gesamtüberarbeitung dieser Roadmap: 2026-04-21.*
