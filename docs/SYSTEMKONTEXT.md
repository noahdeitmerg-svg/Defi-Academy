# DeFi Academy — Systemkontext (Agent & Folge-Chats)

**Zweck:** Kurz-Gedächtnis für Cursor/Agent und neue Chats. Ausführlicher Gesamtstand: **`docs/AGENTEN-HANDBUCH.md`**. Bei **wichtigen** Repo-Änderungen eine Zeile im **Changelog** (§9) ergänzen.

**Stand:** April 2026 · Repo: `Defi-Academy` · Default-Branch: `main`

---

## 1. Produkt & Ziel

- Öffentliche **Lernplattform** (Module, Lektionen, Quiz, Video-Tab), statisch auf **GitHub Pages**.
- **Lernprogramm:** **17 Module**, **102 Lektionen** — siehe `docs/defi-akademie-build-dokument.md` und `docs/AGENTEN-HANDBUCH.md` §2.
- **Quelle aller Module (inkl. Modul 17):** `Module/modul-NN-*-FINAL.md` — Modul 17: **`modul-17-portfolio-construction-rwa-FINAL.md`**.
- **Build-Ziel:** Auto-Import nach `content/modules/module1` … **`module17`** (je nach letztem erfolgreichen Lauf).
- **Brand 2.0** für Folien/Videos: `brand/render-slide-v2.js`, `brand/colors.json`, `brand/slide-helpers.js`.

---

## 2. Tech-Stack & Deploy

| Thema | Details |
|--------|---------|
| Framework | **Next.js 15** (App Router), statischer Export nach `out/`. |
| `basePath` | Nur wenn `GITHUB_PAGES=true` in `next.config.ts` (Repo `/Defi-Academy`). Lokal: `npm run dev` ohne basePath. |
| Live-URL | `https://noahdeitmerg-svg.github.io/Defi-Academy/` (`NEXT_PUBLIC_SITE_URL` in `.github/workflows/nextjs.yml`). |
| Client-Assets | `withBasePath()` in `lib/assetPath.ts` für Videos/Poster unter `public/`. |
| CI | Push **`main`** → Deploy-Workflow; `repository_dispatch: pages-deploy` für Rebuild ohne neuen Commit. |

---

## 3. Verzeichnis-Wegweiser

| Pfad | Rolle |
|------|--------|
| **`docs/AGENTEN-HANDBUCH.md`** | **Masterdokument** für Agenten (Zahlen, Roadmap, Deploy, Doku-Index). |
| `app/` | Routen: `/`, `/module/[moduleSlug]`, Lektion, Quiz. |
| `components/ui/` | UX-Build Phase 1: Basis-UI (Tokens `ux-*` in CSS). |
| `lib/content.ts`, `lib/parseLesson.ts`, `lib/lessonSectionParser.ts` | Content laden, UI-Labels, Lernziele. |
| `lib/lessonAssets.ts`, `lib/lessonDuration.ts` | Video-URL, Dauer (`config/lesson-audio-durations.json`). |
| `content/modules/` | Importierte Lektions-MDX/Struktur (`module1` … `module17` nach Import). |
| `Module/` | **FINAL**-Markdown der Kursautoren — **17** Dateien `modul-01-…` bis `modul-17-…`. |
| `brand/` | Slide-Rendering, Kategorien-Pill, Tabellen-Bullets. |
| `pipeline-test/` | Video-Pipeline (TTS, Timing, MP4). |
| `scripts/batch-module-videos.js` | Modul-Batch → `videos/` → `publish-videos.js` → Dauer-JSON. |
| `scripts/publish-videos.js` | Renderer-Slug → `public/videos/` Plattform-Slug. |
| `.cursor/rules/deploy-live.mdc` | Agent: Deploy / `videos:module` / Webhooks. |

---

## 4. Video-Pipeline (kurz)

1. **Einzel:** in `pipeline-test`: `node src/run-full-pipeline.js …` (CWD `pipeline-test`; `.env` mit ElevenLabs im **Repo-Root**).
2. **Modul-Batch (Root):** `npm run videos:module -- --module N` — mit `--live`: publish, Dauer-JSON, ggf. Push.
3. **TTS / Folien / Tabellen:** wie in `docs/AGENTEN-HANDBUCH.md` §6 und `docs/defi_academy_system.md`.

---

## 5. Videos — Stand Produktion (April 2026)

- **Modul 1:** 6 Lektionen auf `main` (`public/videos/module1-1-1` … `module1-1-6`); 1.1 nach Tabellen-Fix erneuert.
- **Modul 2:** 6 Lektionen (`module2-2-1` … `module2-2-6`), Commit `e3b0dbd`.
- **Modul 3:** 6 Lektionen (`module3-3-1` … `module3-3-6`), Commit `21d01ef`.
- **Modul 4–17:** noch **nicht** per Batch in Produktion — Roadmap: **`docs/VIDEO_BATCH_ROADMAP.md`**.

---

## 6. Git & „live ohne manuellen Merge“

- **Merge Live → main** (`merge-live-to-main.yml`): Branch `cursor/publish-live` oder `repository_dispatch: merge-live`.
- Skripte: `scripts/trigger-merge-live.ps1` / `.sh`, `scripts/trigger-pages-deploy.ps1` / `.sh`.
- Doku: `docs/GITHUB_PAGES.md`.

---

## 7. Bekannte offene / optionale Punkte

- **Modul 16:** Validator warnt ohne `quiz.json`/`open-quiz.md` — Quiz-Tab ausgeblendet, bis ergänzt.
- **Auto-Import:** vereinzelt fehlgeschlagen (z. B. Modul-10-Lauf) — GitHub Actions-Logs; bei fehlendem `content/modules/module17/` Import aus `Module/modul-17-…-FINAL.md` anstoßen.
- **Supabase / Auth:** nicht produktiv; UX-Build plant Demo-Modus ohne Secrets.

---

## 8. UX-Arbeit (Build-Dokument / Lernplattform-Erweiterung)

- **Spezifikation:** `docs/defi-akademie-build-dokument.md` — Phasen 1–12; Next 14 in der Spez, **Ist-Repo:** Next 15 + Tailwind 4.
- **Phase 1 (erledigt):** `ux-*` Tokens in `styles/globals.css`, JetBrains Mono, `components/ui/*`, `lucide-react`, `lib/utils/cn.ts`.
- Bestehende Pages-Kurs-App bleibt parallel; kein Big-Bang-Ersatz.

---

## 9. Changelog (kurz, bei wichtigen Änderungen erweitern)

| Datum | Notiz |
|--------|--------|
| 2026-04 | `SYSTEMKONTEXT.md` angelegt: Stack, Pipeline, Videos M1–M3, Deploy, offene Punkte, UX-Platzhalter. |
| 2026-04-18 | UX **Phase 1:** `ux-*` Design-Tokens, JetBrains Mono, `components/ui/*`, `lucide-react`, `lib/utils/cn.ts`; `npm run build` grün. |
| 2026-04-18 | **`docs/AGENTEN-HANDBUCH.md`** Masterdokument; SYSTEMKONTEXT auf **17 Module** / **Modul 4–17** Video-Batch; `VIDEO_BATCH_ROADMAP` Titel/Kurztext angeglichen. |
| 2026-04-18 | Korrektur: **Modul 17** liegt in `Module/modul-17-portfolio-construction-rwa-FINAL.md`; Doku unterscheidet klar `Module/` (Quelle) vs. `content/modules/` (Import). |
| 2026-04-18 | **UX-Lernshell** (Build-Dokument): Routen `/`, `/preise`, `/login`, `/registrieren`, `(app)/dashboard|kurs|fortschritt|profil`, dynamisch `/kurs/[modulId]/[lektionId]` (102 Pfade), Legal; `data/courseStructure`, `lib/content/*` (remark), `lib/progress`, `lib/auth` (Supabase optional), `lib/tier`, Komponenten unter `components/{layout,navigation,course,lesson,quiz,paywall,marketing}`; Demo-Content `content/modules/01-defi-grundlagen/`; Legacy-Start `/klassisch`. |
