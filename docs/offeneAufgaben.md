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

### 🔴 Doppel-Ordnerstruktur der drei Tool-Packages flachdrücken

Die drei neuen Tool-Ordner sind doppelt geschachtelt:

- `lesson-asset-generator/lesson-asset-generator/...`
- `video-renderer/video-renderer/...`
- `video-style-engine/video-style-engine/...`

Wirkt wie ein ZIP-Entpack-Artefakt. Solange das so bleibt, müssen alle Skripte
diese Verdopplung mitziehen (siehe `scripts/validate-lessons.js`,
`GENERATOR_OUTPUT_DIR`). Abhängigkeit: vor Phase 5.4 (Platform Integration).

**Plan**: Inhalte je Tool eine Ebene nach oben ziehen, innere leere Ordner
entfernen, Pfade in Skripten und Docs angleichen.

### 🟢 Validator als Hard-Gate in `render-batch.js` (durch Master-Skript gelöst)

Direkt im `render-batch.js` ist der Validator weiterhin nicht verdrahtet,
aber das ist mit dem neuen Master-Orchestrator `scripts/render-course.js`
nicht mehr blockierend: Dieser ruft zuerst `npm run validate-lessons` auf
und bricht bei Exit-Code ≠ 0 ab, bevor überhaupt ein Render angestoßen
wird. Direkter Einbau im Renderer wäre nice-to-have, aber kein Muss mehr.

### 🟡 Namens-Brücke Renderer-Output → Plattform-Konvention (Phase 5.4)

Renderer schreibt `videos/module04-lesson02.mp4`, die Plattform erwartet
`public/videos/<moduleSlug>-<lessonSlug>.mp4` (z. B.
`smart-contracts-uniswap-amm.mp4`). Entscheidung offen:

1. Post-Render-Rename-Step im Renderer (bevorzugt), oder
2. Symlink/Alias-Layer in `lib/lessonAssets.ts`, der beide Konventionen
   akzeptiert.

### 🟡 Voice-Varianten pro Lektionstyp

Der neue `scripts/generate-voice.js` nutzt eine einzige Voice (`ELEVENLABS_VOICE`,
default `Florian`) für alle Lektionen und löst den Namen via `/v1/voices` auf
die reale ID auf. Für differenzierte Stimmen (z. B. weibliche/männliche
Sprecher nach Modultyp, Intro-Voice vs. Risk-Voice) fehlt eine Mapping-Schicht.

**Plan**: optionales `config/voice-map.json` mit
`{ "<lessonId>": "<voiceName>" }` oder `{ "risk": "<voiceName>" }`
basierend auf `video_config.audio_track.voice_id`. Erst nötig, wenn die
Content-Vorgabe mehrere Stimmen verlangt.

### 🟡 Render-Course-Orchestrator auf generate-voice.js umstellen

`scripts/render-course.js` hat aktuell seinen **eigenen** inline-Voice-Step
(`stepVoice`). Sauberer wäre, dass render-course genauso wie pilot-render
auf `generate-voice.js` ausdelegiert, damit es nur einen ElevenLabs-Pfad
im Repo gibt.

### 🟡 Gamma-Slides: API-Integration verifizieren

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

### 🟡 Duration-Schätzung aus Source-Narration zu niedrig

Der Validator schätzt aus der Markdown-`Voice Narration Script`-Sektion
ca. 100 s, der Generator-Output hat danach 474 s. Differenz kommt aus
Pausen + narrativer Expansion. Zwei Optionen:

1. Heuristik im Validator schärfen (Wörter × Pausen-Faktor anpassen), oder
2. Validator ohne `video_config.json` nur als Soft-Warn akzeptieren, solange
   der Generator als Ground Truth gilt.

### 🟡 Line-Endings Content-Modules

Git meldet ~53 Files als modifiziert, Inhalt identisch (CRLF/LF-Drift).
Wird bei jedem Checkout wieder aufpoppen. Optionen:

1. `.gitattributes` mit `* text=auto eol=lf` und einmal `git add --renormalize .`,
2. oder lokal `core.autocrlf=input`.

Aktuell: Drift ignoriert (keine Inhaltsdifferenz). Keine Priorität.

---

## Plattform

### 🟢 Auto-Import-Workflow gegen WIP-Module abgesichert

Der `validate:content`-Step ist auf `warn` für fehlendes `quiz.json` /
`meta.json` gestellt. WIP-Module blockieren die CI damit nicht mehr.
Sollte nach Fertigstellung aller Module auf `error` zurückgestuft werden.

### 🟢 Video-Hero-Komponente getestet

`components/LessonVideoHero.tsx` rendert korrekt bei vorhandenem Asset,
ist aber noch nie gegen ein echtes gerendertes Video gelaufen (weil
Rename-Brücke fehlt).

---

## Erledigt

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
