# Video Rendering Pipeline — DeFi Academy

Remotion-basierte Rendering-Pipeline, die die vier vom **Lesson Asset
Generator** erzeugten Dateien pro Lektion in fertige MP4-Videos und
JPG-Poster verwandelt.

```
Lesson Asset Generator  ┐
Video Style Engine      ├─→  Video Renderer  ─→  videos/moduleXX-lessonYY.mp4
External Assets         ┘                       posters/moduleXX-lessonYY.jpg
```

## Zielarchitektur

```
┌───────────────────────────────────────────────────────────────────┐
│                      Video Renderer                                │
│                                                                    │
│  ┌──────────────────┐   ┌──────────────────┐  ┌──────────────┐    │
│  │ Asset Resolver   │──▶│ Remotion Bundle  │─▶│ renderMedia  │    │
│  │                  │   │ (built once)     │  │ renderStill  │    │
│  │ - video_config   │   │                  │  │              │    │
│  │ - visual_plan    │   │ Composition:     │  │ h264 · 30fps │    │
│  │ - voice.mp3      │   │   "Lesson"       │  │ 1920×1080    │    │
│  │ - visuals/*      │   │                  │  │              │    │
│  └──────────────────┘   └──────────────────┘  └──────────────┘    │
│                                                                    │
│  Batch Runner: discover lessons → parallel render → report         │
└───────────────────────────────────────────────────────────────────┘
```

## Komponenten

| Datei | Aufgabe |
|---|---|
| `remotion/index.jsx` | Remotion-Root; registriert die `Lesson`-Composition |
| `remotion/components/Lesson.jsx` | Zentrale Composition — setzt die 9 Sektionen als Timeline zusammen |
| `remotion/components/VisualRenderer.jsx` | Rendert Visuals (Dateien oder Platzhalter) |
| `remotion/style-engine/` | Gespiegelte Video Style Engine (Theme, Szenen) |
| `src/asset-resolver.js` | Lädt und validiert Assets, schreibt `render-input.json` |
| `src/render-lesson.js` | Rendert eine einzelne Lektion (MP4 + Poster) |
| `src/render-batch.js` | Batch-Renderer mit parallelen Lessons |
| `src/external/` | Mirror von Parser + Section-Mapper des Generators |
| `scripts/setup.js` | Einrichtung (spiegelt Style Engine + Generator-Module) |
| `scripts/preflight-check.js` | Prüft Inputs ohne zu rendern |
| `scripts/dry-run-test.js` | Validiert Pipeline-Verdrahtung ohne Remotion-Install |

## Voraussetzungen

- Node.js ≥ 18
- **Video Style Engine** im Nachbarordner
- **Lesson Asset Generator** im Nachbarordner (mit `output/` gefüllt)

Empfohlene Projektstruktur:

```
defi-academy/
├── video-style-engine/
├── lesson-asset-generator/
└── video-renderer/           ◄── dieses Projekt
```

## Setup

```bash
cd video-renderer
node scripts/setup.js
npm install
```

`scripts/setup.js` spiegelt die Style-Engine-Dateien und die Generator-
Module in den Renderer. Das muss nur einmal laufen (und nach Updates an
einer der beiden Nachbarkomponenten).

## Externe Assets (Voice + Visuals)

Parallel zur Generator-Ausgabe müssen die externen Assets bereitgestellt
werden (vom ElevenLabs-Agent und vom Gamma-/Diagramm-Agent):

```
assets-input/
└── module04-lesson02/
    ├── voice.mp3                  # aus ElevenLabs
    └── visuals/
        ├── v01.png                # Visual IDs aus visual_plan.json
        ├── v02.png
        ├── v03.png
        ├── v04.png
        ├── v05.png
        ├── v06.png
        └── v07.png
```

Fehlt ein Visual, rendert der `VisualRenderer` automatisch einen
didaktischen Platzhalter mit Typ-Label und Beschreibung — die Lektion
ist dann trotzdem rendertauglich, wirkt aber provisorisch. Fehlt die
Audio-Datei, läuft das Video stumm.

## Preflight-Check

Vor dem Rendern immer prüfen:

```bash
node scripts/preflight-check.js \
  --lessons ../lesson-asset-generator/examples \
  --assets  ./assets-input
```

Ausgabe zeigt pro Lektion, welche Dateien vorhanden / missing / placeholder sind.

Exit Codes:
- `0` — alles klar
- `1` — kritische Fehler (rendern wird fehlschlagen)
- `2` — Warnungen (rendern klappt, aber mit Lücken)

## Einzelne Lektion rendern

```bash
node src/render-lesson.js \
  --lesson-id      module04-lesson02 \
  --generator      ../lesson-asset-generator/output \
  --assets         ./assets-input \
  --markdown       ../lesson-asset-generator/examples/module04-lesson02.md \
  --output-video   ./output/videos/module04-lesson02.mp4 \
  --output-poster  ./output/posters/module04-lesson02.jpg
```

Das Script:
1. Ruft den Asset-Resolver auf
2. Kopiert `voice.mp3` + `visuals/*` nach `public/assets/moduleXX-lessonYY/`
3. Bundelt das Remotion-Projekt (erster Lauf: ca. 30s, danach cached)
4. Ruft `renderMedia()` für das MP4 auf
5. Ruft `renderStill()` für das Poster-JPG auf (Frame bei Sekunde 15 der Lektion)

## Batch-Rendering aller Lektionen

```bash
node src/render-batch.js \
  --generator ../lesson-asset-generator/output \
  --lessons   ../lesson-asset-generator/examples \
  --assets    ./assets-input \
  --output    ./output \
  --parallel  2
```

Der Batch-Runner:
- Entdeckt alle `moduleXX-lessonYY/` im Generator-Output
- Baut das Remotion-Bundle **einmal** (teuer)
- Rendert `--parallel <n>` Lektionen gleichzeitig (default: 2)
- Schreibt einen `render-report.json` mit Statistik

Optionen:

| Flag | Beschreibung |
|---|---|
| `--only <ids>` | Komma-separierte Liste von Lesson-IDs |
| `--parallel <n>` | Wie viele Lektionen parallel (Video-Renderer sind CPU-intensiv; 2 ist ein guter Wert) |
| `--concurrency <n>` | Frame-Concurrency **pro** Lektion (default 4) |
| `--log-level <lvl>` | `info` / `warn` / `error` / `verbose` |

Beispiel: 13 Module sequentiell und ressourcenschonend:

```bash
node src/render-batch.js \
  --generator ../lesson-asset-generator/output \
  --lessons   ./lessons \
  --assets    ./assets-input \
  --output    ./output \
  --parallel  1 \
  --concurrency 6
```

## Dry-Run (ohne Remotion-Installation)

```bash
node scripts/dry-run-test.js
```

Validiert die komplette Verdrahtung:
- Alle internen Dateien am richtigen Platz
- Asset-Resolver produziert gültige Render-Input-Struktur
- Alle `slide_ref`- und `visual.slide_ref`-Referenzen sind konsistent
- Die Lesson-Komposition importiert alle nötigen Remotion-Primitives

Damit ist früh klar, ob die Pipeline stimmt, bevor `npm install` für
Remotion läuft.

## Timing & Synchronisation

Die zeitliche Abfolge wird ausschließlich durch `video_config.json`
gesteuert:

```
video_config.json
 └─ sections[] mit start_seconds und end_seconds
     │
     └─ werden in frames umgerechnet (30 fps)
         │
         └─ als <Sequence from={...} durationInFrames={...}> ausgegeben
             │
             └─ innerhalb: passende Szene (intro / slide / outro)
```

Die einzige Tonspur (`voice.mp3`) wird als globales `<Audio>` gelegt.
Das Timing der Sprache muss beim **Lesson Asset Generator** zur
Sektionslänge passen (das stellt dessen Pacing-Logik sicher).

Falls die tatsächliche Tonspur nach der ElevenLabs-Generierung länger
oder kürzer ausfällt als geplant, gibt es zwei Optionen:

1. **Manuell anpassen**: `video_config.json` editieren; Sektionsdauern
   proportional skalieren.
2. **Automatisch anpassen** (optional, nicht enthalten): nach
   ElevenLabs-Render die tatsächliche Dauer mit `getVideoMetadata()` aus
   `@remotion/renderer` ermitteln und die Sektionen gleichmäßig skalieren.

## Qualität / Encoding

- Codec: **H.264** (`x264`)
- Container: **MP4**
- Auflösung: **1920 × 1080**
- FPS: **30**
- Pixel-Format: `yuv420p` (weite Kompatibilität)
- Default CRF: **18** (hohe Qualität; Werte 15–20 liefern lehrbuchgeeignete Ergebnisse)
- JPEG-Quality Poster: **90**

Die Werte sind in `remotion.config.ts` und in `render-lesson.js` zentral
definiert.

## Output-Struktur (plattform-erkennbar)

```
output/
├── videos/
│   ├── module01-lesson01.mp4
│   ├── module01-lesson02.mp4
│   └── ...
├── posters/
│   ├── module01-lesson01.jpg
│   ├── module01-lesson02.jpg
│   └── ...
└── render-report.json
```

Dieses Schema matched exakt das, was der Build Agent auf der Lernplattform
erwartet (siehe Video Style Engine README).

## Fehlersuche

- **"composition durationInFrames mismatch"**: `video_config.duration_seconds * 30`
  weicht von der errechneten Gesamtdauer der Sektionen ab. Regenerate mit dem
  Lesson Asset Generator.
- **Stumme Videos**: `voice.mp3` wurde nicht nach `assets-input/moduleXX-lessonYY/`
  gelegt. Der Asset-Resolver meldet das als `audio: MISSING` im Log.
- **Graue Platzhalter statt Grafiken**: Visuals (`vNN.png`) fehlen. Nachliefern
  und neu rendern.
- **Bundle-Build dauert ewig**: Nur der erste Build ist teuer; der zweite ist
  sofort da. Im Batch-Modus wird ohnehin nur einmal gebündelt.

## Nicht enthalten (bewusst)

- **Keine Upload-Logik** zu einer Plattform/CDN — das macht der Build Agent.
- **Keine Zugriffskontrolle** / DRM — bewusst offen, damit die Files einfach auf
  der Plattform ausgeliefert werden können.
- **Keine Closed Captions** — können später über `@remotion/captions` nachgerüstet
  werden, sobald ElevenLabs Timing-Tracks liefert.
