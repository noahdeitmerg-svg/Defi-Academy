# Lesson Asset Generator

Pipeline, die jede approved Lektion des Content Agents in vier
Video-Produktions-Assets umwandelt, die direkt in die **Video Style
Engine** und den **Remotion-Renderer** einlaufen.

```
Lektion (Markdown)  →  Lesson Asset Generator  →  4 Asset-Dateien
                                                    ├─ slides_prompt.txt    (Gamma)
                                                    ├─ voice_script.txt     (ElevenLabs)
                                                    ├─ visual_plan.json     (Diagramme/Screenshots/Cues)
                                                    └─ video_config.json    (Remotion-Master)
```

**Zwei Markdown-Formate:** Legacy (eine Lektion, englische Überschriften) und
**Modul-Format** (mehrere Lektionen, deutsch, `**[Slide N]**`). Siehe
[docs/MIGRATION-NOTES.md](../docs/MIGRATION-NOTES.md).

## Verzeichnisstruktur

```
lesson-asset-generator/
├── src/
│   ├── cli.js                       # Kommandozeilen-Interface (--all-lessons)
│   ├── pipeline.js                  # Orchestrierung
│   ├── format-detector.js           # Legacy vs. Modul-Format
│   ├── module-parser.js             # Parser Modul-Markdown
│   ├── normalize-lesson.js          # Einheitliches Lesson-Schema
│   ├── lesson-parser.js             # Markdown-Parser (Legacy)
│   ├── section-mapper.js            # Mapping auf 9 Sektionen + 6-7 Slides
│   ├── generate-slides-prompt.js    # Gamma-Prompt
│   ├── generate-voice-script.js     # ElevenLabs-Skript
│   ├── generate-visual-plan.js      # Visuals + Animation Cues
│   └── generate-video-config.js     # Remotion-Master-Konfiguration
├── schemas/
│   ├── video_config.schema.json
│   └── visual_plan.schema.json
├── examples/
│   └── module04-lesson02.md         # Beispiel-Lektion
├── tests/
│   └── run-tests.js                 # End-to-End-Test
└── package.json
```

## Voraussetzungen

- Node.js ≥ 18
- Die **Video Style Engine** muss im Nachbarordner liegen (enthält `visual-timing.json`)

## Nutzung

### Einzelne Lektion verarbeiten

```bash
node src/cli.js \
  --input  lessons/module04-lesson02.md \
  --out    ./output \
  --style  ../video-style-engine
```

Output:

```
output/
└── module04-lesson02/
    ├── slides_prompt.txt
    ├── voice_script.txt
    ├── visual_plan.json
    └── video_config.json
```

### Batch: ganzes Lektions-Verzeichnis verarbeiten

```bash
node src/cli.js \
  --input-dir lessons/ \
  --out       ./output \
  --style     ../video-style-engine
```

Der Pipeline läuft rekursiv durch alle `.md`-Dateien und produziert pro
Lektion einen eigenen Unterordner. Fehler einzelner Lektionen stoppen
den Batch nicht; am Ende gibt es eine Erfolgs-/Fehler-Statistik.

### Optionale Flags

| Flag | Zweck |
|---|---|
| `--module <n>` | Modulnummer explizit setzen (falls Dateiname keine Zuordnung zulässt) |
| `--lesson <n>` | Lektionsnummer explizit setzen |
| `--voice <id>` | ElevenLabs Voice ID (default: `de-male-educational-01`) |

### Als Modul einbinden (z. B. im Build Agent)

```js
const { runPipelineForLesson } = require('./src/pipeline');

const result = runPipelineForLesson({
  input: 'lessons/module04-lesson02.md',
  outputRoot: './output',
  stylePath: '../video-style-engine',
});
console.log(result.lesson_id, result.duration_seconds);
```

## Input-Format (Content-Agent-Standard)

Jede Lektion ist eine Markdown-Datei mit genau diesen Abschnitten:

```markdown
# Lesson Title
...

# Learning Objectives
- ...

# Explanation
...

# Slide Summary
- ...

# Voice Narration Script
// Konzept
...
// Mechanismus
...
// Risiko
...

# Visual Suggestions
- ...

# Exercise
...

# Quiz
1. Frage?
   a) ...
   b) ...
   Correct: a
```

Der Parser akzeptiert auch deutsche Überschriften (`Lernziele`,
`Erklärung`, `Übung`) und die Sektionsmarker `// Konzept`,
`// Mechanismus`, `// Architektur`, `// Risiko`, `// Beispiel`,
`// Takeaway` im Narrations-Script.

Modul- und Lektionsnummer werden standardmäßig aus dem Dateinamen
abgeleitet (z. B. `module04-lesson02.md`). Alternativ per
`--module` / `--lesson` setzen.

## Output-Format

### `slides_prompt.txt` (Gamma)

**Micro-Brief:** Kopf mit **Brand-2.0-Hex-Palette** (aus
`../video-style-engine/brand/colors.json`), dann 6–7 nummerierte Zeilen
— jeweils ein kurzer englischer Bildbefehl aus Slide-Section + Titel
(kein Lektions-Markdown, kein Slide-Layout). Risk-Layer-Zeilen dürfen
explizit Brand-Risk-Rot (#D9544E) nennen; sonst nur die gesperrte
Palette.

### `voice_script.txt` (ElevenLabs)

- Sprache: Deutsch
- Ton: educational, calm, professional
- Empfohlene Voice-Settings: Stability 0.55, Similarity 0.75, Style 0.25
- `<break time="...">` nach Satzenden für natürlichen Lehrtakt
- `<emphasis>` für hervorgehobene Begriffe
- Akronyme beim ersten Auftreten phonetisch annotiert: `APY [A-P-Y]`,
  `AMM [A-M-M]`, `ETH [E-T-H]`, `USDC [U-S-D-C]` etc.
- Strukturiert pro Slide — synchronisierbar mit der Render-Pipeline

### `visual_plan.json`

```json
{
  "lesson_id": "module04-lesson02",
  "visuals": [
    {
      "id": "v01",
      "slide_ref": "slide-02-concept",
      "type": "diagram | dashboard | screenshot | chart | animation",
      "description": "...",
      "source_protocol": "aave | uniswap | ...",
      "source_url_hint": "https://...",
      "color_accent": "#D9544E | null",
      "capture_instructions": "..."
    }
  ],
  "animation_cues": [
    {
      "visual_id": "v01",
      "cue_type": "fade_in | node_reveal | edge_draw | highlight_pulse | ...",
      "trigger_seconds": 28.0,
      "duration_frames": 20
    }
  ]
}
```

Protokoll-Erkennung ist konservativ: `Bonding-Curve` triggert **nicht**
das Curve-Finance-Protokoll; nur echte Referenzen werden erkannt.

### `video_config.json` (Remotion-Master)

Kernfelder:

```json
{
  "lesson_id": "module04-lesson02",
  "module":  { "number": 4, "title": null },
  "lesson":  { "number": 2, "title": "..." },
  "duration_seconds": 474,
  "fps": 30,
  "resolution": "1920x1080",
  "aspect_ratio": "16:9",
  "sections": [ /* 9 Sektionen mit start/end/scene/slide_ref */ ],
  "slide_order": [ "slide-01-title", ..., "slide-07-takeaways" ],
  "visual_timing": [ /* visual_id + start/end */ ],
  "audio_track": {
    "file": "module04-lesson02_voice.mp3",
    "voice_id": "de-male-educational-01",
    "language": "de",
    "engine": "elevenlabs"
  },
  "assets": {
    "video_output": "videos/module04-lesson02.mp4",
    "poster_output": "posters/module04-lesson02.jpg"
  }
}
```

## Mapping auf die 9 Sektionen

Der Section-Mapper verteilt die Bullets aus `Slide Summary` und die
Vorschläge aus `Visual Suggestions` heuristisch auf die Sektionen der
Video Style Engine:

| Content-Slide | Video-Sektion | Max. Bullets |
|---|---|---|
| Slide 1 | `lesson_title` (Titel + Lernziele) | 3 |
| Slide 2 | `concept` | 4 |
| Slide 3 | `mechanism` | 4 |
| Slide 4 | `system_architecture` (optional) | 4 |
| Slide 5 | `risk_layer` (roter Akzent) | 4 |
| Slide 6 | `protocol_example` | 4 |
| Slide 7 | `key_takeaways` | 4 |

`system_architecture` wird mit `mechanism` zusammengelegt, wenn die
Lektion keine eigene Architektur-Ebene hat (ergibt 6 Slides statt 7).
Die freigewordene Zeit wird der Mechanism-Sektion gutgeschrieben.

## Integration in den Gesamt-Workflow

```
Content Agent   →  Lektion (Markdown, approved)
                    ↓
Operating Brain →  Qualitätsprüfung
                    ↓
Video Agent     →  Lesson Asset Generator    ◄── (diese Pipeline)
                    ↓
                   4 Asset-Dateien
                    ↓
Render Pipeline → Gamma (Slides) + ElevenLabs (Voice) + Remotion (Video)
                    ↓
Output          →  videos/moduleXX-lessonYY.mp4
                   posters/moduleXX-lessonYY.jpg
                    ↓
Build Agent     →  automatische Einbindung auf der Lernplattform
```

## Tests

```bash
npm test
# oder:
node tests/run-tests.js
```

Die Test-Suite prüft Parser, Section-Mapper und alle vier Output-Dateien
gegen die erwartete Struktur, Formatvorgaben und die Schemas.

## Nichts verändert wird

Der Generator **verändert keine Lerninhalte**. Er:

- liest vorhandene Bullets und verteilt sie auf Sektionen
- lässt den Narration-Text inhaltlich unverändert und ergänzt nur
  Pausen-/Betonungs-Markierungen für ElevenLabs
- ergänzt Default-Visuals ausschließlich dort, wo der Content Agent
  für eine Sektion keinen Hinweis geliefert hat

Learning Objectives, Explanation, Exercise und Quiz werden nicht in
die Video-Assets übernommen (sie gehören auf die Lesson Page, nicht
ins Video).
