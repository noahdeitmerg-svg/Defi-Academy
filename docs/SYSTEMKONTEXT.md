# DeFi Academy — Systemkontext (Agent & Folge-Chats)

**Zweck:** Zentrales Gedächtnis für Cursor/Agent und neue Chats. Bei **wichtigen** Repo-Änderungen um eine Zeile im **Changelog** ergänzen (ohne Rückfrage).

**Stand:** April 2026 · Repo: `Defi-Academy` · Default-Branch: `main`

---

## 1. Produkt & Ziel

- Öffentliche **Lernplattform** (Module, Lektionen, Quiz, Video-Tab), statisch gehostet auf **GitHub Pages**.
- Inhaltsquelle: `Module/modul-NN-*-FINAL.md` (Agent-Format mit `## Lektion X.Y`, Folien, Sprechertext). Import nach `content/modules/` über Workflow **Auto-Import** (optional, bei Push auf `Module/**/*.md`).
- **Brand 2.0** für Folien/Video-Frames: `brand/render-slide-v2.js`, Farben `brand/colors.json`, gemeinsame Parser-Hilfen `brand/slide-helpers.js`.

---

## 2. Tech-Stack & Deploy

| Thema | Details |
|--------|---------|
| Framework | **Next.js 15** (App Router), `output: "export"` → statischer Export nach `out/`. |
| `basePath` | Nur wenn `GITHUB_PAGES=true` in `next.config.ts` (Repo-Name `/Defi-Academy`). Lokal: `npm run dev` ohne basePath. |
| Live-URL | `https://noahdeitmerg-svg.github.io/Defi-Academy/` (siehe `NEXT_PUBLIC_SITE_URL` in `.github/workflows/nextjs.yml`). |
| Client-Assets | `withBasePath()` in `lib/assetPath.ts` für Videos/Poster unter `public/`. |
| CI Deploy | Push auf **`main`** → Workflow **Deploy Next.js site to Pages**. `repository_dispatch` `pages-deploy` triggert Rebuild ohne neuen Commit. |

---

## 3. Verzeichnis-Wegweiser

| Pfad | Rolle |
|------|--------|
| `app/` | Routen: `/`, `/module/[moduleSlug]`, Lektion, Quiz. |
| `lib/content.ts`, `lib/parseLesson.ts`, `lib/lessonSectionParser.ts` | Content laden, deutsche UI-Labels, Lernziele-Texte. |
| `lib/lessonAssets.ts`, `lib/lessonDuration.ts` | Video-URL (`public/videos/moduleM-M-L.mp4`), Dauer aus `config/lesson-audio-durations.json`. |
| `content/modules/` | Importierte Lektions-MDX/Struktur (Konsum durch die App). |
| `Module/` | **FINAL**-Markdown der Kursautoren (Pipeline + Auto-Import-Quelle). |
| `brand/` | Slide-Rendering, `parseBulletsFromBody`, Kategorien-Pill (GRUNDLAGEN / PRAXIS / …). |
| `pipeline-test/` | **Video-Pipeline:** `src/run-full-pipeline.js` (TTS, Timing, SVG/PNG, MP4). |
| `scripts/batch-module-videos.js` | Modul komplett: alle Lektionen → `videos/` → `publish-videos.js` → Dauer-JSON → optional `--live` git push. |
| `scripts/publish-videos.js` | `module01-lesson01` → `public/videos/module1-1-1.mp4` (Mapping in `config/video-slug-map.json` optional). |
| `.cursor/rules/deploy-live.mdc` | Agent: nach Deploy-Wunsch pushen / `videos:module` / Webhooks. |

---

## 4. Video-Pipeline (kurz)

1. **Einzel:** im Ordner `pipeline-test`:  
   `node src/run-full-pipeline.js --input ..\Module\modul-01-defi-grundlagen-FINAL.md --lesson module01-lesson01 --output .\test-output-m1`  
   (Arbeitsverzeichnis **muss** `pipeline-test` sein; `.env` mit `ELEVENLABS_API_KEY`, `ELEVENLABS_VOICE_ID` im **Repo-Root**.)
2. **Modul-Batch (Repo-Root):**  
   `npm run videos:module -- --module N`  
   Mit **`--live`:** `publish-videos`, Update `config/lesson-audio-durations.json`, `git commit` + `git push` auf aktuellem Branch.
3. **TTS:** Keine künstlichen `**[Slide n]**`-Marker mehr; `sanitizeVoiceScript` in `pipeline-test/src/lib/tts.js` entfernt Markdown-Artefakte.
4. **Folienanzahl:** nicht mehr fest „6 Slides“ — variable Anzahl (z. B. Lektion 1.4 mit 7 Folien).
5. **Tabellen in Bullets:** `brand/slide-helpers.js` → `parseBulletsFromBody`: **≥3 Spalten** → `Label: A vs. B vs. …`; 2 Spalten → `A — B`. Test: `node pipeline-test/tests/table-rendering.test.js`.

---

## 5. Videos — Stand Produktion (April 2026)

- **Modul 1:** alle 6 Lektionen auf `main`; **1.1** extra nach Tabellen-Fix. `public/videos/module1-1-1` … `module1-1-6`.
- **Modul 2:** 6 Lektionen (`module2-2-1` … `module2-2-6`), Commit `e3b0dbd`.
- **Modul 3:** 6 Lektionen (`module3-3-1` … `module3-3-6`), Commit `21d01ef`.
- **Modul 4–16:** noch **nicht** per Batch gerendert — siehe `docs/VIDEO_BATCH_ROADMAP.md`.

---

## 6. Git & „live ohne manuellen Merge“

- **Merge Live Branch → main** (`.github/workflows/merge-live-to-main.yml`): Push auf `cursor/publish-live` **oder** `repository_dispatch` `merge-live` → Merge nach `main` + `pages-deploy`-Dispatch (Token-Push triggert Folge-Workflow nicht zuverlässig).
- Skripte: `scripts/trigger-merge-live.ps1` / `.sh`, `scripts/trigger-pages-deploy.ps1` / `.sh`.
- Doku: `docs/GITHUB_PAGES.md`.

---

## 7. Bekannte offene / optionale Punkte

- **Modul 16:** `validate:content` warnt, wenn weder `quiz.json` noch `open-quiz.md` — Quiz-Tab ausgeblendet, bis ergänzt.
- **Auto-Import:** ein Lauf zu Modul-10-Update war in Actions **fehlgeschlagen** — nur relevant, wenn Import-Pipeline genutzt wird; Logs in GitHub Actions.
- **Supabase / Auth / Backend:** bewusst **nicht** angebunden; späterer Schritt (keine Secrets im Repo).

---

## 8. UX-Arbeit (vom UX-Agent)

- **Anstehend:** umfassendes Website-Building-Dokument + Prompt — hier **konkrete Umsetzungsschritte** und Checklisten ergänzen, sobald das Dokument im Repo oder im Chat vorliegt.
- Umsetzungsregel: Alles, was **ohne** externe Services/Secrets geht, sofort im Code; Supabase & Co. **nachziehen** mit eigener Konfiguration.

---

## 9. Changelog (kurz, bei wichtigen Änderungen erweitern)

| Datum | Notiz |
|--------|--------|
| 2026-04 | `SYSTEMKONTEXT.md` angelegt: Stack, Pipeline, Videos M1–M3, Deploy, offene Punkte, UX-Platzhalter. |
