# DeFi Academy — Systemkontext (Agent & Folge-Chats)

**Zweck:** Kurz-Gedächtnis für Cursor/Agent und neue Chats. Ausführlicher Gesamtstand: **`docs/AGENTEN-HANDBUCH.md`**. **Neuer Chat (Kontext + Prompt):** **`docs/HANDOFF-NEUER-CHAT.md`**. Bei **wichtigen** Repo-Änderungen eine Zeile im **Changelog** (Abschnitt 9) ergänzen.

**Stand:** 2026-04-21 · Repo: `Defi-Academy` · Default-Branch: `main`

---

## 1. Produkt & Ziel

- Öffentliche **Lernplattform** (Module, Lektionen, Quiz, Video), statisch auf **GitHub Pages**.
- **Lernprogramm:** **18 Module**, **ca. 102 Lektionen** — siehe `docs/defi-akademie-build-dokument.md` und `docs/AGENTEN-HANDBUCH.md` Abschnitt 2.
- **Quelle aller Module (inkl. Modul 17):** `Module/modul-NN-*-FINAL.md` — Modul 17: **`modul-17-portfolio-construction-rwa-FINAL.md`**.
- **Zwei UI-Pfade:** (1) **Legacy** `/module/…` aus `content/modules/module1` … `module17`. (2) **UX-Shell** `/kurs/…` aus Slug-Ordnern `content/modules/01-defi-grundlagen` usw. (`loadLesson.ts`, `lesson.md`).
- **Modul 0 (neu):** Orientation / Introduction. Das Modul führt in Struktur, Risikobewusstsein und Lernmethodik ein, bevor technische Module starten.
- **Brand 2.0** für Folien/Videos: `brand/render-slide-v2.js`, `brand/colors.json`, `brand/slide-helpers.js`.

---

## 2. Tech-Stack & Deploy

| Thema | Details |
|--------|---------|
| Framework | **Next.js 15** (App Router), statischer Export nach `out/`. |
| `basePath` | Nur wenn `GITHUB_PAGES=true` in `next.config.ts` (Repo `/Defi-Academy`). Lokal: `npm run dev` ohne basePath. |
| Live-URL | `https://noahdeitmerg-svg.github.io/Defi-Academy/` (`NEXT_PUBLIC_SITE_URL` in `.github/workflows/nextjs.yml`). |
| Legacy-Assets | `withBasePath()` in `lib/assetPath.ts` für Videos/Poster unter `public/` (Kurs `/module/…`). |
| Neue Lektion-Video-URL | `NEXT_PUBLIC_VIDEO_CDN_URL` + `/modules/{modulId}/{lektionId}.mp4` (siehe `lib/content/loadLesson.ts`). |
| CI | Push **`main`** → Deploy-Workflow; `repository_dispatch: pages-deploy` für Rebuild ohne neuen Commit. |

---

## 3. Verzeichnis-Wegweiser

| Pfad | Rolle |
|------|--------|
| **`docs/AGENTEN-HANDBUCH.md`** | **Masterdokument** für Agenten (Zahlen, Roadmap, Deploy, Doku-Index). |
| **`docs/HANDOFF-NEUER-CHAT.md`** | Einstieg für **neue Cursor-Chats**: Ist-Zustand, Links, Copy-Paste-Prompt. |
| **`docs/ROADMAP.md`** | Gesamt-Roadmap (Produkt, UX, Content, Video, Distribution). |
| **`docs/F7-MAPPING.md`** | Content-Merge F7 — Legacy → UX Mapping (Phase 1 Audit). |
| `app/page.tsx` | Marketing-Landing `/`. |
| `app/(app)/` | Dashboard, Kurs, Fortschritt, Profil, **`/kurs/[modulId]/[lektionId]`**. |
| `app/module/`, `app/klassisch/` | Legacy-Kurs-UI. |
| `components/brand/`, `components/marketing/` | Logo, PublicTopNav, Landing. |
| `lib/content/loadModules.ts`, `loadLesson.ts`, `parseMarkdown.ts` | UX-Pfad Content. |
| `lib/content.ts`, `lib/parseLesson.ts` | Legacy-Pfad. |
| `content/modules/moduleN/` | Legacy importierte Lektionen (`*.md`, `meta.json`, Quiz). |
| `content/modules/01-defi-grundlagen/` … `03-blockchain-mechanik/` | UX-Free-Module (`module.json`, `…/lesson.md`). |
| `content/modules/module-00` … `module-17` | Dokumentierte Zielstruktur (neu); bestehende Ordner bleiben bis Migration unverändert. |
| `Module/` | **FINAL**-Markdown der Kursautoren. |
| `docs/ux-visuals/` | SVG-Ziel-Layouts (Referenz). |
| `pipeline-test/`, `video-renderer/`, `scripts/` | Video-Pipeline, Batch, Publish. |

---

## 4. Video-Pipeline (kurz)

1. **Einzel:** in `pipeline-test`: `node src/run-full-pipeline.js …` (CWD `pipeline-test`; `.env` mit ElevenLabs im **Repo-Root**).
2. **Modul-Batch (Root):** `npm run videos:module -- --module N` — mit `--live`: publish, Dauer-JSON, ggf. Push.
3. **TTS (Root, Lektionen):** `npm run generate:voice` — Kette: Sanitize → **Script Optimizer** (`pipeline/voice/script_optimizer.js`: Zahlen, Satzlänge, Prosody) → **Pronunciation** (`preprocess_voice_script.js` + `pronunciation_dictionary.json`, PDF-Referenz im Root) → ElevenLabs. Details: **`docs/VIDEO_PRODUCTION_WORKFLOW.md`**. Tests: `npm run test:voice-pipeline`.
4. **TTS / Folien / Tabellen (Architektur):** `docs/AGENTEN-HANDBUCH.md` Abschnitt 6, `docs/defi_academy_system.md`.

---

## 5. Videos — Stand Produktion (April 2026)

- **Modul 1–3 (Legacy `public/videos/`):** je 6 Lektionen auf `main` (Naming `module1-1-1` … / `module3-3-6` je nach Publish-Lauf).
- **Modul 4–17:** noch **nicht** per Batch in Produktion — Roadmap: **`docs/VIDEO_BATCH_ROADMAP.md`**.
- **Neue UX-Shell:** Video-URL wird beim Build aufgelöst: zuerst **`public/videos/moduleN-N-M.mp4`** (gleiche Namen wie Legacy/`publish-videos`), sonst **`NEXT_PUBLIC_VIDEO_CDN_URL/modules/<modulId>/<lektionId>.mp4`**. Ohne lokale Datei und ohne CDN-Datei bleibt der Stream leer.
- **Pipeline-Konsistenz:** Modul 0 folgt derselben Video-Pipeline wie alle anderen Module (Lesson Content → Gamma → ElevenLabs → Remotion → MP4).

---

## 5.1 Curriculum-Referenz (verbindlich)

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

**Lernpfad:**
- Orientation: Modul 0
- Foundations: Module 1–4
- Protocols: Module 5–10
- Infrastructure: Module 11–14
- Advanced Analysis and Strategy: Module 15–17

---

## 6. Git & „live ohne manuellen Merge“

- **Merge Live → main** (`merge-live-to-main.yml`): Branch `cursor/publish-live` oder `repository_dispatch: merge-live`.
- Skripte: `scripts/trigger-merge-live.ps1` / `.sh`, `scripts/trigger-pages-deploy.ps1` / `.sh`.
- Doku: `docs/GITHUB_PAGES.md`.

---

## 7. Bekannte offene / optionale Punkte

- **Auto-Import:** vereinzelt fehlgeschlagen (z. B. Modul-10-Lauf) — GitHub Actions-Logs; bei fehlendem Ordner Import aus `Module/` anstoßen.
- **Supabase / Auth:** produktiv nur mit Env; Demo-Modus ohne Secrets möglich.
- **Tier / Paywall:** zur lokalen Verifikation sind in **`data/courseStructure.ts`** derzeit **alle Module `tier: "free"`** (bis Auth/Zahlung live). `TierGate`: Zugriff wenn Modul free **oder** `progress.tier === "pro"`.
- **CDN:** `NEXT_PUBLIC_VIDEO_CDN_URL` für UX-Lektionen setzen und MP4s hochladen, wenn nicht unter `public/videos/` (Legacy-Namen).
- **F7 Content-Merge:** `docs/F7-MAPPING.md` (Audit) liegt vor; Migration und Redirects folgen in späteren Phasen (siehe `docs/ROADMAP.md` F7).

---

## 8. UX-Arbeit (Build-Dokument / Lernplattform)

- **Spezifikation:** `docs/defi-akademie-build-dokument.md` — Phasen 1–12; Spez erwähnt teils Next 14, **Ist:** Next 15 + Tailwind 4.
- **Umgesetzt:** Landing, Public-Nav, App-TopNav, Kursübersicht mit Fortschritts-Karte, Modulkarten (Status-Leiste), Lektionslayout (Sidebar-Karte, Lernziele-Karte, Video, optional Key Takeaways — **keine** Folien-Galerie unter dem Video), Brotkrumen, `docs/ux-visuals/`.
- **Parallel:** Legacy-Routen unverändert nutzbar.

---

## 9. Changelog (kurz, bei wichtigen Änderungen erweitern)

| Datum | Notiz |
|--------|--------|
| 2026-04 | `SYSTEMKONTEXT.md` angelegt: Stack, Pipeline, Videos M1–M3, Deploy, offene Punkte, UX-Platzhalter. |
| 2026-04-18 | UX **Phase 1:** `ux-*` Design-Tokens, JetBrains Mono, `components/ui/*`, `lucide-react`, `lib/utils/cn.ts`; `npm run build` grün. |
| 2026-04-18 | **`docs/AGENTEN-HANDBUCH.md`** Masterdokument; damaliger Stand vor Modul-0-Erweiterung, Video-Batch-Plan für spätere Pro-Module. |
| 2026-04-18 | Korrektur: **Modul 17** liegt in `Module/modul-17-portfolio-construction-rwa-FINAL.md`; Doku unterscheidet klar `Module/` (Quelle) vs. `content/modules/` (Import). |
| 2026-04-18 | **UX-Lernshell:** Routen `/`, `/preise`, `/login`, `/registrieren`, `(app)/dashboard|kurs|fortschritt|profil`, dynamisch `/kurs/[modulId]/[lektionId]` (102 Pfade), Legal; `data/courseStructure`, `lib/content/*`, Progress/Auth/Tier; Demo-Content Modul 1; später M2–M3 erweitert. |
| 2026-04-20 | **Gesamt-Roadmap** in `docs/ROADMAP.md` (Produkt + UX + Content + Video + CI). **SYSTEMKONTEXT** auf Zwei-Pfad-Architektur (Legacy + UX) und CDN-Video aktualisiert. **Modul 16:** `open-quiz.md`-Stub für Validator. **Free-Module UX:** M1–M3 vollständig unter Slug-Ordnern mit `lesson.md` / slides / quiz. |
| 2026-04-20 | Curriculum-Update: **Modul 0** ergänzt; Referenz auf **18 Module** / ca. **102 Lektionen**; Lernpfad auf Orientation / Foundations / Protocols / Infrastructure / Advanced Analysis and Strategy aktualisiert; Zielstruktur `content/modules/module-00` … `module-17` dokumentiert. |
| 2026-04-21 | **Voice:** Script Optimizer → Pronunciation (`voice_pipeline.js`). **Doku:** `VIDEO_PRODUCTION_WORKFLOW.md`. **Tier:** alle Module temporär `free` in `courseStructure.ts`. **Neu:** `HANDOFF-NEUER-CHAT.md`. **F7 Vorbereitung (ohne Migration):** `F7-PHASE2-FRONTMATTER.md`, `generate-f7-redirects.js` → `config/f7-*`, `F7-REDIRECTS.md`, `split-modul-17.mjs` → `tmp/`. **`lessons/module04-lesson02`:** Validator ohne Warnung. **`lib/tier/tierPolicy.ts`**, `npm run test:tier-policy`, `f7:redirects`, `split:modul-17`. |
| 2026-04-21 | **UX Lektionsseite:** Folien-UI unter dem Video entfernt; `SlidesViewer` / `SlideNavigator` / `SlideThumbnailStrip` nach **`components/_deprecated/`** verschoben. **`slides.json`** weiter geladen in `loadLesson.ts` (Video-Pipeline), nicht mehr in `LessonView`. **Agenten-Regel:** `docs/AGENT-DOKUMENTATION-SYNC.md` + `.cursor/rules/agent-documentation-sync.mdc` — nach Änderungen Doku gesamt mitziehen. |
| 2026-04-21 | **Key Takeaways:** `content/takeaways.json`, `lib/content/loadTakeaways.ts`, `LessonAssets.keyTakeaways`, `components/lesson/KeyTakeaways.tsx` unter dem Video. Doku: `docs/KEY-TAKEAWAYS.md`, Befüllungsauftrag: `docs/CONTENT-AGENT-TAKEAWAYS.md`. |
