# DeFi Academy — Systemkontext (Agent & Folge-Chats)

**Zweck:** Kurz-Gedächtnis für Cursor/Agent und neue Chats. Ausführlicher Gesamtstand: **`docs/AGENTEN-HANDBUCH.md`**. Bei **wichtigen** Repo-Änderungen eine Zeile im **Changelog** (Abschnitt 9) ergänzen.

**Stand:** 2026-04-20 · Repo: `Defi-Academy` · Default-Branch: `main`

---

## 1. Produkt & Ziel

- Öffentliche **Lernplattform** (Module, Lektionen, Quiz, Video), statisch auf **GitHub Pages**.
- **Lernprogramm:** **17 Module**, **102 Lektionen** — siehe `docs/defi-akademie-build-dokument.md` und `docs/AGENTEN-HANDBUCH.md` Abschnitt 2.
- **Quelle aller Module (inkl. Modul 17):** `Module/modul-NN-*-FINAL.md` — Modul 17: **`modul-17-portfolio-construction-rwa-FINAL.md`**.
- **Zwei UI-Pfade:** (1) **Legacy** `/module/…` aus `content/modules/module1` … `module17`. (2) **UX-Shell** `/kurs/…` aus Slug-Ordnern `content/modules/01-defi-grundlagen` usw. (`loadLesson.ts`, `lesson.md`).
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
| **`docs/ROADMAP.md`** | Gesamt-Roadmap (Produkt, UX, Content, Video, Distribution). |
| `app/page.tsx` | Marketing-Landing `/`. |
| `app/(app)/` | Dashboard, Kurs, Fortschritt, Profil, **`/kurs/[modulId]/[lektionId]`**. |
| `app/module/`, `app/klassisch/` | Legacy-Kurs-UI. |
| `components/brand/`, `components/marketing/` | Logo, PublicTopNav, Landing. |
| `lib/content/loadModules.ts`, `loadLesson.ts`, `parseMarkdown.ts` | UX-Pfad Content. |
| `lib/content.ts`, `lib/parseLesson.ts` | Legacy-Pfad. |
| `content/modules/moduleN/` | Legacy importierte Lektionen (`*.md`, `meta.json`, Quiz). |
| `content/modules/01-defi-grundlagen/` … `03-blockchain-mechanik/` | UX-Free-Module (`module.json`, `…/lesson.md`). |
| `Module/` | **FINAL**-Markdown der Kursautoren. |
| `docs/ux-visuals/` | SVG-Ziel-Layouts (Referenz). |
| `pipeline-test/`, `video-renderer/`, `scripts/` | Video-Pipeline, Batch, Publish. |

---

## 4. Video-Pipeline (kurz)

1. **Einzel:** in `pipeline-test`: `node src/run-full-pipeline.js …` (CWD `pipeline-test`; `.env` mit ElevenLabs im **Repo-Root**).
2. **Modul-Batch (Root):** `npm run videos:module -- --module N` — mit `--live`: publish, Dauer-JSON, ggf. Push.
3. **TTS / Folien / Tabellen:** wie in `docs/AGENTEN-HANDBUCH.md` Abschnitt 6 und `docs/defi_academy_system.md`.

---

## 5. Videos — Stand Produktion (April 2026)

- **Modul 1–3 (Legacy `public/videos/`):** je 6 Lektionen auf `main` (Naming `module1-1-1` … / `module3-3-6` je nach Publish-Lauf).
- **Modul 4–17:** noch **nicht** per Batch in Produktion — Roadmap: **`docs/VIDEO_BATCH_ROADMAP.md`**.
- **Neue UX-Shell:** Video-URL wird beim Build aufgelöst: zuerst **`public/videos/moduleN-N-M.mp4`** (gleiche Namen wie Legacy/`publish-videos`), sonst **`NEXT_PUBLIC_VIDEO_CDN_URL/modules/<modulId>/<lektionId>.mp4`**. Ohne lokale Datei und ohne CDN-Datei bleibt der Stream leer.

---

## 6. Git & „live ohne manuellen Merge“

- **Merge Live → main** (`merge-live-to-main.yml`): Branch `cursor/publish-live` oder `repository_dispatch: merge-live`.
- Skripte: `scripts/trigger-merge-live.ps1` / `.sh`, `scripts/trigger-pages-deploy.ps1` / `.sh`.
- Doku: `docs/GITHUB_PAGES.md`.

---

## 7. Bekannte offene / optionale Punkte

- **Auto-Import:** vereinzelt fehlgeschlagen (z. B. Modul-10-Lauf) — GitHub Actions-Logs; bei fehlendem Ordner Import aus `Module/` anstoßen.
- **Supabase / Auth:** produktiv nur mit Env; Demo-Modus ohne Secrets möglich.
- **CDN:** `NEXT_PUBLIC_VIDEO_CDN_URL` für Free-Module in der neuen Lektions-UI setzen und MP4s hochladen.

---

## 8. UX-Arbeit (Build-Dokument / Lernplattform)

- **Spezifikation:** `docs/defi-akademie-build-dokument.md` — Phasen 1–12; Spez erwähnt teils Next 14, **Ist:** Next 15 + Tailwind 4.
- **Umgesetzt:** Landing, Public-Nav, App-TopNav, Kursübersicht mit Fortschritts-Karte, Modulkarten (Status-Leiste), Lektionslayout (Sidebar-Karte, Lernziele-Karte, Folien-Thumbnails), Brotkrumen, `docs/ux-visuals/`.
- **Parallel:** Legacy-Routen unverändert nutzbar.

---

## 9. Changelog (kurz, bei wichtigen Änderungen erweitern)

| Datum | Notiz |
|--------|--------|
| 2026-04 | `SYSTEMKONTEXT.md` angelegt: Stack, Pipeline, Videos M1–M3, Deploy, offene Punkte, UX-Platzhalter. |
| 2026-04-18 | UX **Phase 1:** `ux-*` Design-Tokens, JetBrains Mono, `components/ui/*`, `lucide-react`, `lib/utils/cn.ts`; `npm run build` grün. |
| 2026-04-18 | **`docs/AGENTEN-HANDBUCH.md`** Masterdokument; SYSTEMKONTEXT auf **17 Module** / **Modul 4–17** Video-Batch; `VIDEO_BATCH_ROADMAP` Titel/Kurztext angeglichen. |
| 2026-04-18 | Korrektur: **Modul 17** liegt in `Module/modul-17-portfolio-construction-rwa-FINAL.md`; Doku unterscheidet klar `Module/` (Quelle) vs. `content/modules/` (Import). |
| 2026-04-18 | **UX-Lernshell:** Routen `/`, `/preise`, `/login`, `/registrieren`, `(app)/dashboard|kurs|fortschritt|profil`, dynamisch `/kurs/[modulId]/[lektionId]` (102 Pfade), Legal; `data/courseStructure`, `lib/content/*`, Progress/Auth/Tier; Demo-Content Modul 1; später M2–M3 erweitert. |
| 2026-04-20 | **Gesamt-Roadmap** in `docs/ROADMAP.md` (Produkt + UX + Content + Video + CI). **SYSTEMKONTEXT** auf Zwei-Pfad-Architektur (Legacy + UX) und CDN-Video aktualisiert. **Modul 16:** `open-quiz.md`-Stub für Validator. **Free-Module UX:** M1–M3 vollständig unter Slug-Ordnern mit `lesson.md` / slides / quiz. |
