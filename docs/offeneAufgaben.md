# Offene Aufgaben

> **Gesamtstand & Prioritäten:** [`docs/AGENTEN-HANDBUCH.md`](./AGENTEN-HANDBUCH.md) — dieses File bleibt detailliertes Backlog.  
> **Neuer Cursor-Chat:** [`docs/HANDOFF-NEUER-CHAT.md`](./HANDOFF-NEUER-CHAT.md) (Kontext + Prompt-Vorlage).

> Lebendes Backlog für die DeFi-Academy-Pipeline. Nach jedem Prompt
> aktualisiert: neue offene Punkte werden hinzugefügt, erledigte werden
> mit Commit-Hash abgehakt. Priorität grob absteigend.

**Agenten (verbindlich):** Nach inhaltlichen Repo-Änderungen die Dokumentation **mitziehen** — Checkliste [`docs/AGENT-DOKUMENTATION-SYNC.md`](./AGENT-DOKUMENTATION-SYNC.md) (Changelog, Handbuch, ROADMAP, Handoff, thematische Docs).

**Roadmap (Gesamt):** [`docs/ROADMAP.md`](ROADMAP.md) — enthält jetzt **Produkt, UX-Shell, Content-Zweispurigkeit, Video-Pipeline und CI**. Video-Kernreihenfolge unverändert: (1) Qualität, (2) Batch, (3) CDN statt großer MP4s im Repo.

## Legende

- 🔴 blockiert: muss vor der nächsten Phase erledigt sein
- 🟡 wichtig: sollte bald gemacht werden, blockiert aber nichts
- 🟢 nice-to-have / Qualität / Doku

---

## Pipeline-Infrastruktur (Video-Produktion)

### ✅ Academy-Build-Pipeline-Layer (2 Commands + 2 Uploads)

Neue Automations-Schicht auf bestehenden Scripts:
`scripts/generate-all-assets.js` scannt `lessons/` und erzeugt
pro Lektion `generated-assets/<id>/` mit Prompts + JSON.
`scripts/collect-prompts.js` spiegelt die beiden `.txt`-Prompts
flach nach `gamma-prompts/<id>.txt` und `elevenlabs-prompts/<id>.txt`
(ID als Dateiname → keine Namenskollision beim Upload).
`scripts/check-assets.js` prueft `assets-input/<id>/` auf
`voice.mp3` + `visualNN.png` (legacy `slideNN.png` mit Warnung).
`scripts/render-all-videos.js` = Preflight + dünner Wrapper um
`render-batch.js` mit Academy-Build-Pfaden.
Neue npm-Scripts: `generate-assets`, `collect-prompts`,
`check-assets`, `render-videos`, `academy-build`.
Doku: `docs/academy-build.md` (User-Guide) + README-Quick-Start.
`.gitignore` um `/generated-assets/`, `/gamma-prompts/`,
`/elevenlabs-prompts/` erweitert. Smoke-Tests aller `--help`-Ausgaben
und der leeren-Zustand-Pfade erfolgreich.

### ✅ Gamma auf Visual-Asset-Only-Modus umgestellt

`generate-slides-prompt.js` instruiert Gamma jetzt im Kopf des
`slides_prompt.txt` explizit: *"Generate diagrams or illustrations
only. Do not design slides or layouts."* Der Asset-Resolver akzeptiert
neben der bisherigen `visuals/<visual.id>.<ext>`-Konvention die neue
flache numerische Konvention `assets-input/<lesson>/visualNN.<ext>`
(Mapping: N-ter Eintrag aus `visual_plan.json`). `scripts/generate-
slides.js` schreibt Outputs jetzt als `visualNN.png` statt `slideNN.png`.
Neue Referenz-Doku: `docs/SLIDE_GENERATION_RULES.md`. Workflow-Doku
und README wurden auf Visuals-Only umgestellt inkl. Architektur-
Warnung *"Never use Gamma-generated slides directly in the renderer."*
Smoke-Test bestaetigt den Resolver-Pfad (visual01.png → `<visual.id>.png`
im public-assets-Ordner).

### 🟡 Voice-Varianten pro Lektionstyp

Der neue `scripts/generate-voice.js` nutzt eine einzige Voice (`ELEVENLABS_VOICE`,
default `Florian`) für alle Lektionen und löst den Namen via `/v1/voices` auf
die reale ID auf. Für differenzierte Stimmen (z. B. weibliche/männliche
Sprecher nach Modultyp, Intro-Voice vs. Risk-Voice) fehlt eine Mapping-Schicht.

**Plan**: optionales `config/voice-map.json` mit
`{ "<lessonId>": "<voiceName>" }` oder `{ "risk": "<voiceName>" }`
basierend auf `video_config.audio_track.voice_id`. Erst nötig, wenn die
Content-Vorgabe mehrere Stimmen verlangt.

### 🟢 Render-Namenskonvention auflösen (3 Pilots + 1 Batch)

Aktuell gibt es drei Wege zu einem Kurz-Render:

| Kommando | Quelle | Default-Lektionen | Output |
|---|---|---|---|
| `npm run pilot-render` | `scripts/pilot-render.js` | 5 **feste** IDs (module01-lesson01, …) | `videos/pilot/` |
| `npm run render:pilot` | `scripts/render-batch.js --limit 5 --parallel 1` | erste 5 **alphabetisch** aus generator-output | `videos/` |
| `npm run render:course` | `scripts/render-batch.js --parallel 2` | alle aus generator-output | `videos/` |

Semantisch sinnvoll: pilot-render prüft den **repräsentativen** Querschnitt,
render:pilot ist der **numerische** Smoke-Test, render:course die
Vollproduktion. Dokumentation sauber halten; oder später eine der beiden
Pilot-Varianten deprecaten.

### 🟡 Gamma-Slides API-Schema final verifizieren

`scripts/generate-slides.js` implementiert die Gamma Generate API gegen
den Beta-Endpoint `https://public-api.gamma.app/v0.2/generations`. Das
Response-Schema ist tolerant geprobt (mehrere Feldnamen für `pdfUrl`),
aber bis ein echter Test mit gültigem `GAMMA_API_KEY` gelaufen ist,
bleibt die Schema-Robustheit unverifiziert. Dazu kommt: das Polling-
Interval, Timeouts und die Rate-Limits sollten gegen die offizielle
Doku abgeglichen werden, sobald Gamma die API aus der Beta nimmt.

### 🟡 Gamma-Slides: Alt-Integration im render-course.js verifizieren

Der Master-Orchestrator spricht `GAMMA_API_URL` (default
`https://api.gamma.app/v1/generations`) an, wenn `GAMMA_API_KEY` gesetzt
ist. Das Request-Schema ist geraten (`input_text`, `format`,
`export_as`). Muss gegen die offizielle Gamma-API geprüft und ggf.
angepasst werden. Solange das nicht verifiziert ist, läuft der
Orchestrator im Stub-Modus: `slides_prompt.txt` wird zum manuellen
Import in Gamma gespiegelt, `slides.json` wird als Stub geschrieben
(mit `_stub: true`-Marker).

### 🟡 Visuals: Screenshot-Capture für HTML-URLs

Der Orchestrator lädt nur **direkte Bild-URLs** (`.png/.jpg/.webp/.svg`)
automatisch. Referenzen wie `https://info.uniswap.org/` landen als
`status: "manual"` im `visuals-manifest.json` — aktuell müssen die
Operatoren dort manuell screenshoten.

**Plan**: Optionaler Puppeteer/Playwright-Schritt, der aus HTML-URLs
rendert. Abwägen: zusätzliche native Dependency vs. manueller Aufwand
pro Lektion.

### 🟡 Pilot-Render-Lauf gegen die 5 Default-Lektionen

Erster echter Remotion-Render über die Pilot-IDs (`module01-lesson01`,
`module02-lesson01`, `module04-lesson02`, `module06-lesson03`,
`module09-lesson01`) vor der Vollproduktion. Voraussetzungen:

- `lessons/moduleXX-lessonYY.md` für alle 5 Pilot-IDs muss existieren
  (aktuell nur Example `module04-lesson02` im Repo)
- `npm install` im `video-renderer/video-renderer/`-Package
- Optional: `voice.mp3` je Pilot-Lektion unter `assets-input/<id>/` —
  wenn fehlend, greift die Skip-Logik (oder `--allow-missing-voice`,
  dann rendert Remotion ohne Tonspur)

### 🟡 Batch-Render aller Lektionen End-to-End

Kompletter Lauf Lektion → Generator → Slides → Voice → Visuals →
Renderer → Plattform mit `npm run render-course` für alle Module —
nachdem der Pilot oben grün ist. Offen: echte API-Keys +
Gamma-API-Verifikation + Visual-Screenshots.

---

## Content-Qualität

### ✅ Example-Lektion `module04-lesson02` (Validator-Referenz)

Stand 2026-04: Folien-Zusammenfassung auf 7 Slides begrenzt; Visual-Section mit
Validator-kompatiblem **konzeptionell**-Keyword — `npm run validate-lessons` ohne
Warnung für diese Lektion. Als Referenz für künftige `lessons/*.md` beibehalten.

---

## Plattform

### ✅ UX-Lernshell & Free-Content (Slug-Pfad)

- Routen unter `app/(app)/` inkl. `/kurs` und 102 SSG-Lektionen; Landing `/` an SVG-Referenz (`docs/ux-visuals/`).
- `content/modules/01-defi-grundlagen`, `02-wallets-sicherheit`, `03-blockchain-mechanik`: je 6 Lektionen mit `lesson.md` / `slides.json` / `quiz.json`.
- Videos in dieser Shell: CDN-URL in `loadLesson.ts` — Upload/Env siehe `docs/ROADMAP.md` Abschnitt B.2.

### 🟡 Key Takeaways (`content/takeaways.json`)

Loader + UI sind umgesetzt. **Redaktion:** Free-UX-Module **1–3** (18 Lektionen) in `content/takeaways.json` eingetragen; **verbleibend** ca. **84** Keys für Slug-Module 4–17 (sobald `lesson.md` existieren, erscheinen Takeaways automatisch). Auftrag/Checkliste: [`docs/CONTENT-AGENT-TAKEAWAYS.md`](./CONTENT-AGENT-TAKEAWAYS.md), Format: [`docs/KEY-TAKEAWAYS.md`](./KEY-TAKEAWAYS.md). Export-Hilfe für den Agenten: `npm run export:takeaways-input` → `exports/takeaways-input/modul-NN.md`.

### 🟢 Auto-Import-Workflow gegen WIP-Module abgesichert

Der `validate:content`-Step ist auf `warn` für fehlendes `quiz.json` /
`meta.json` gestellt. WIP-Module blockieren die CI damit nicht mehr.
Sollte nach Fertigstellung aller Module auf `error` zurückgestuft werden.

### 🟢 Video-Hero-Komponente End-to-End testen

`components/LessonVideoHero.tsx` rendert korrekt bei vorhandenem Asset.
Mit der jetzt vorhandenen Rename-Brücke (`scripts/publish-videos.js`)
muss nur noch ein echtes gerendertes Video gegenkontrolliert werden —
`npm run render-videos && npm run publish-videos` und dann die
Lesson-Page im Browser prüfen.

Zusätzlich: **`components/lesson/VideoPlayer.tsx`** in der **UX-Lektion** gegen CDN-URL testen (nicht nur `public/videos/`).

---

## Erledigt

- ✅ **`validate:content` / Auto-Import:** Pflicht-Abschnitte akzeptieren jetzt **deutsche** Markdown-Überschriften (`Erklärung`, `Folien-Zusammenfassung`, `Sprechertext`, `Visuelle Vorschläge`, `Übung`) parallel zu den englischen Namen — `auto-import.yml` schlägt nach `import:modules` nicht mehr an dieser Stelle fehl. **Modul 17 (Legacy):** `content/modules/module17/open-quiz.md`-Stub ergänzt → `validate:content` ohne Quiz-Warnung.
- ✅ **Key Takeaways (Redaktion, Teilmenge):** `content/takeaways.json` mit je 3 Bullets pro Lektion für **`01-defi-grundlagen`**, **`02-wallets-sicherheit`**, **`03-blockchain-mechanik`** (18 Keys), inhaltlich an den jeweiligen `lesson.md`-Frontmatter-/Kurzteilen ausgerichtet.
- ✅ **Doku-Sync 2026-04-20:** `docs/ROADMAP.md` als Gesamt-Roadmap neu gefasst; `docs/SYSTEMKONTEXT.md` und `docs/AGENTEN-HANDBUCH.md` auf Zwei-Pfad-Architektur (Legacy `/module` + UX `/kurs`) und CDN-Videos aktualisiert; Modul **16** `open-quiz.md`-Stub ergänzt (Validator ohne Quiz-Warnung).
- ✅ **lesson-asset-generator: Multi-Format-Parser integriert.**
  Video-Agent-Lieferung (`lesson-asset-generator-migrated.zip`) ins Repo
  gezogen: neue Files `src/format-detector.js`, `src/module-parser.js`,
  `src/normalize-lesson.js`. `src/cli.js` um `--all-lessons` erweitert,
  `src/pipeline.js` um `runPipelineForModule`, `src/section-mapper.js`
  mit Dual-Path (`mapDirectSlides` für neues Format,
  `mapLegacySections` bleibt als Fallback), `src/lesson-parser.js`
  leicht refactored. **Bewusst NICHT übernommen**:
  `src/generate-slides-prompt.js` — die Video-Agent-Version war das
  alte "Gamma baut ganze Slide-Decks"-Design; wir behalten unsere
  Visuals-Only-Variante (siehe `docs/SLIDE_GENERATION_RULES.md`).
  Qualitätscheck mit `Module/modul-01-defi-grundlagen-FINAL.md`:
  Alter Parser hat Narration komplett falsch zugeordnet (Slide 1
  bekam Slide-5-Content); neuer Parser liest `[Slide N]`-Marker
  direkt und matcht Slide/Narration/Visual 1:1. Alle 8 Original-
  Tests (`node lesson-asset-generator/tests/run-tests.js`) grün,
  `npm run generate-assets -- --only module01-lesson0{1..6}` für
  Modul 1 sauber durchgelaufen (6/6 ok).
- ✅ Plattform-Brand-Rollout: `app/layout.tsx` nutzt Inter (Google Fonts
  via `next/font`, Weights 400/500/600/700) statt Geist; CSS-Variablen in
  `styles/globals.css` leiten sich aus `brand/colors.json` ab (Light =
  Weiss + Navy-Text + Gold-Akzent mit AA-Kontrast, Dark = exakter
  Video-Look `#0B1F3B` + `#F5B841`). Neues `components/BrandLogo.tsx`
  spiegelt den Inline-SVG-Shield aus `video-style-engine/intro-scene.jsx`
  wieder und wird in Startseite + Modul-Layout-Header eingebunden.
  Plattform und zukünftige Videos teilen sich damit Logo, Typografie
  und Farb-Palette. Build + Typecheck + Lint grün.
- ✅ Mini-Env-Loader (`scripts/lib/env.js`) ohne neue npm-Dependency —
  liest `.env` (+ optional `.env.local`) und setzt fehlende Variablen
  in `process.env`. Bestehende Shell-/CI-Variablen behalten Vorrang.
  Eingebunden in `scripts/generate-voice.js`, `scripts/render-course.js`
  und `scripts/pilot-render.js`, damit der ElevenLabs-Key (und andere
  API-Keys) nicht mehr manuell in PowerShell gesetzt werden muss.
- ✅ Brand-System integriert (`brand/` als Single Source of Truth):
  `brand/colors.json`, `brand/typography.json`, `brand/logo*.svg`,
  `brand/design-guidelines.md` + `brand/sync-to-theme.js`.
  Sync-Script regeneriert `video-style-engine/theme.json` und spiegelt
  die Brand-Assets nach `video-style-engine/brand/`. Neue Intro-/Outro-/
  Slide-Szenen mit Logo-Inline-SVG (`BrandShield`) übernommen.
  `npm run sync:brand` + Integration in `npm run academy-build` (läuft
  jetzt als erster Schritt). `video-renderer/scripts/setup.js` spiegelt
  den brand/-Unterordner ebenfalls nach `remotion/style-engine/brand/`.
  Doku: `docs/brand-system.md`.
- ✅ Remotion-Bundle-Cache über Chunks: innerer
  `video-renderer/src/render-batch.js` + `render-lesson.js` akzeptieren
  jetzt `--bundle-cache <path>`, Top-Level `scripts/render-batch.js`
  legt `TMP_DIR/remotion-bundle-cache/` an und reicht den Pfad an
  alle Chunks durch → Webpack-Bundle läuft nur noch einmal pro Run.
- ✅ `scripts/publish-videos.js` + `npm run publish-videos` —
  Rename-Brücke Renderer-Output (`videos/moduleXX-lessonYY.mp4`) →
  Plattform-Konvention (`public/videos/<moduleSlug>-<lessonSlug>.mp4`)
  mit Default-Mapping (führende Nullen weg) und Override via
  `config/video-slug-map.json`. Dokumentiert in
  `docs/academy-build.md` (Schritt 7 + "Render-Namenskonvention").
- ✅ Doppel-Ordnerstruktur flachgedrückt: `lesson-asset-generator/`,
  `video-renderer/`, `video-style-engine/` sind jetzt nicht mehr
  doppelt geschachtelt. Alle Pfade in Skripten und Docs angeglichen.
- ✅ Validator-Hard-Gate direkt in `scripts/render-batch.js`
  (`validate-lessons.js --lessons-dir <dir> --skip-generated`,
  abschaltbar via `--skip-validate`).
- ✅ `scripts/render-course.js` delegiert Voice-Step an
  `scripts/generate-voice.js` → einziger ElevenLabs-Pfad im Repo.
- ✅ Duration-/Slide-Count-/Visual-Heuristik im Validator
  realistischer geschärft (inkl. German-Aliases, `**Slide N:**`-Regex,
  Warnungen statt Errors für 4–12 Slides).
- ✅ `.gitattributes` mit `* text=auto eol=lf` + binary-Rules für
  `.png/.mp3/.mp4/.pdf` — CRLF/LF-Drift ist damit blockiert.
- ✅ `scripts/split-modules.js` + `npm run split-modules` — zerlegt
  `Module/modul-XX-*-FINAL.md` in `lessons/moduleXX-lessonYY.md`.
- ✅ `docs/VIDEO_PRODUCTION_WORKFLOW.md` — End-to-End-Workflow-Doku
  (Pipeline-Diagramm, Ordnerstruktur lessons/ → generator-output/ →
  assets-input/ → videos/, Schritt-fuer-Schritt-Anleitung fuer den
  manuellen Gamma-Export slide01…slide07.png, ElevenLabs-Setup,
  Render-Einstiegspunkte, Troubleshooting-Tabelle, Rollenverteilung,
  vollstaendige CLI-Referenz). `README.md` um Abschnitt "Videos
  produzieren — CLI-Guide fuer neue User" erweitert, der neue
  Mitarbeiter:innen in 5 Befehlen durch die gesamte Pipeline fuehrt
  und auf das Workflow-Dokument verweist.
- ✅ `scripts/create-lesson-asset-folders.js` + `npm run prepare:assets`
  — Helper-Skript, das fuer jede in `lesson-asset-generator/output/`
  gefundene Lektion einen passenden `assets-input/moduleXX-lessonYY/`-
  Ordner inklusive `visuals/`-Unterordner und einer kontextspezifischen
  README anlegt. Idempotent (vorhandene Ordner werden nicht
  angetastet), unterstuetzt `--only`, `--copy-prompt` (kopiert
  `slides_prompt.txt`/`voice_script.txt` direkt in den Asset-Ordner
  fuer Offline-Arbeit) und `--dry-run`.
- ✅ `scripts/generate-slides.js` — Gamma-Slides-Generator mit
  Dreistufen-Flow: (1) Gamma Generate API → PDF-Export → lokales
  Slicing via `pdftoppm` (poppler-utils) → `slide01.png`, `slide02.png`,
  …; (2) Slicing-Shortcut wenn bereits `slides.pdf` im Lektionsordner
  liegt; (3) Manual-Handoff-Fallback ohne API-Key/pdftoppm (schreibt
  `slides_prompt.txt` + `SLIDES_HANDOFF.md` mit Anleitung). Idempotent
  (Skip wenn `slide01.png` existiert, `--force` zum Neurendern),
  tolerant gegen Varianten der Gamma-Response (mehrere PDF-URL-Felder
  geprobt). Eigenes Log in `logs/generate-slides.log`.
  `npm run generate:slides` + Integration in `render:pilot` /
  `render:course` (chain vor `generate:voice` und dem Batch-Renderer).
- ✅ `scripts/render-batch.js` — Top-Level-Batch-Orchestrator mit
  Chunk-Isolation (Default 10 Lektionen/Chunk), Per-Chunk-Spawn des
  bestehenden Remotion-Renderers (`video-renderer/.../render-batch.js`),
  Preflight für `voice.mp3`+`visual_plan.json`+`video_config.json`,
  Idempotenz (`--force` zum Neurendern), live Progress-Log
  (`Rendering <id>` / `Completed X / Y`), Error-Persistenz in
  `logs/render-errors.log` (append). `npm run render:pilot`
  (`--limit 5 --parallel 1`) und `npm run render:course` (`--parallel 2`)
  als Convenience-Scripts.
- ✅ `scripts/generate-voice.js` — ElevenLabs-TTS-Runner mit Voice-Name-
  Resolving (`/v1/voices`), Retry/Backoff, `--concurrency`-Batching,
  `--force`, `--dry-run`, `--only <csv>`. Integriert in
  `scripts/pilot-render.js` als Schritt 2b. `npm run generate:voice`
  verfügbar.
- ✅ `.env.example` als Vorlage für API-Keys (`ELEVENLABS_*`, `GAMMA_*`);
  `.env` bleibt per Default gitignored.
- ✅ `scripts/pilot-render.js` — Pilot-Renderer für 5 Default-Lektionen
  (override via `--lessons`), Output nach `videos/pilot/` +
  `posters/pilot/`, `--parallel 1`, Voice-Missing-Skip,
  `--allow-missing-voice` als Override
- ✅ `npm run pilot-render` in `package.json`
- ✅ `scripts/render-course.js` — Master-Orchestrator mit 6 Schritten,
  Per-Lesson-Try/Catch, `--parallel`, strukturiertem Log
  (`logs/render-course.log`) und JSON-Report
- ✅ `npm run render-course` in `package.json`
- ✅ `.gitignore` um Pipeline-Artefakte (`logs/`, `generator-output/`,
  `assets-input/`, `videos/`, `posters/`, `.pilot-render-tmp/`) ergänzt
- ✅ `feat(pipeline): add pre-render lesson validator` — `7f5ee8a`
- ✅ `scripts/validate-lessons.js` mit 6 Checks + Custom-Schema-Validator
- ✅ `video_config.schema.json`: `module.title` und
  `visual_timing[].reference` auf `["string", "null"]` gelockert
  (Schema-Drift behoben)
- ✅ Optionales Lesson-Video-Asset-System (`lib/lessonAssets.ts`,
  `components/LessonVideoHero.tsx`, `lib/assetPath.ts`)
- ✅ Content-Validator mit Severity `error`/`warn`
- ✅ `docs/defi_academy_system.md` um Video-Produktionspipeline,
  Pre-Render-Validator und Phase-5-Roadmap erweitert
