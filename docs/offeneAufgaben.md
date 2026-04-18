# Offene Aufgaben

> Lebendes Backlog für die DeFi-Academy-Pipeline. Nach jedem Prompt
> aktualisiert: neue offene Punkte werden hinzugefügt, erledigte werden
> mit Commit-Hash abgehakt. Priorität grob absteigend.

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

### 🟡 Example-Lektion `module04-lesson02` hat Pflichtverletzungen

Validator findet aktuell:

- Slide Summary: 14 Bullets (erlaubt 6–7)
- Visual Suggestions: kein „Concept Visual"-Keyword

Das ist die gelieferte Vorlage des Content-Generators. Entweder:

1. Content-Agent-Prompt verschärfen, sodass er diese Grenzen einhält, oder
2. Example neu schreiben, damit er als Referenz dient.

---

## Plattform

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

---

## Erledigt

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
