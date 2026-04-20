# DeFi-Academy Video-Produktion — End-to-End-Workflow

**Master-Kontext:** [`docs/AGENTEN-HANDBUCH.md`](./AGENTEN-HANDBUCH.md)

Dieses Dokument beschreibt den vollstaendigen Weg, wie aus einer Markdown-
Lektion ein fertiges MP4 wird. Es richtet sich an Content-Autor:innen,
Produzent:innen und neue Agenten/Entwickler:innen.

> ⚠️ **Architekturprinzip:** Gamma produziert **nur Einzel-Visuals**
> (Diagramme, Illustrationen, Charts). **Niemals** komplette Slides.
> Das Slide-Layout rendert **ausschliesslich** das Remotion-Template
> `video-style-engine/slide-template.jsx`. Details:
> [SLIDE_GENERATION_RULES.md](./SLIDE_GENERATION_RULES.md).

> **TL;DR** —
> ```
> npm run validate-lessons
> node lesson-asset-generator/src/cli.js --input-dir lessons --out lesson-asset-generator/output
> npm run prepare:assets
> # In Gamma (oder anderem AI-Bildgenerator) pro Slide EIN Visual erzeugen
> # und als visual01.png, visual02.png, ... in assets-input/<lesson>/ legen
> npm run generate:voice
> npm run render:course
> ```
> Ergebnis: `videos/moduleXX-lessonYY.mp4` + `posters/moduleXX-lessonYY.jpg`.

---

## 1. Pipeline-Uebersicht

**Voice-Strecke (Kernaussage):** Lesson-Content → Voice-Script-Generator
(`voice_script.txt`) → **Script Optimizer** (Zahlen, Satzlänge, Pausen) →
**Voice Preprocessor** (Aussprache-Woerterbuch) → **ElevenLabs** (TTS) → **MP3**.
Details: Abschnitt 4.

```
┌─────────────┐   ┌──────────────────────┐   ┌─────────────────┐   ┌─────────────────┐   ┌────────────────┐
│  lessons/   │─▶│ Lesson-Asset-        │─▶│ Gamma (Visuals  │─▶│ Voice Prep. +   │─▶│ Video-Renderer │
│  *.md       │   │ Generator            │   │ only — kein     │   │ ElevenLabs →    │   │ Remotion baut  │
│             │   │                      │   │ Slide-Layout!)  │   │ voice.mp3       │   │ Slides aus     │
│             │   │                      │   │ slides_prompt → │   │ (s. Abschn. 4)  │   │ Template       │
│             │   │                      │   │ visualNN.png    │   │                 │   │                │
└─────────────┘   └──────────────────────┘   └─────────────────┘   └─────────────────┘   └────────────────┘
                         │                           │                     │                     │
                         ▼                           ▼                     ▼                     ▼
               lesson-asset-generator/     assets-input/            assets-input/          videos/*.mp4
               output/moduleXX-lessonYY/   moduleXX-lessonYY/       moduleXX-lessonYY/    posters/*.jpg
                 ├── slides_prompt.txt      ├── visual01.png         └── voice.mp3
                 ├── voice_script.txt       ├── visual02.png
                 ├── visual_plan.json       ├── ...
                 ├── video_config.json      └── visualNN.png
                 ├── slides.json            (Einzelbilder,
                 └── visuals-manifest.json   KEINE Slide-Frames)
```

Der Renderer baut die fertige Slide aus **drei** Quellen:

1. `title` + `bullets` aus `slides.json` (Text)
2. `visualNN.png` als Inhalt der Visual-Area rechts (Bild)
3. `slide-template.jsx` + `theme.json` fuer Layout, Farben, Animation (Design)

Jede Stufe ist **idempotent** — bereits existierende Artefakte werden
wiederverwendet, wiederholte Laeufe picken die Arbeit dort auf, wo
die letzte aufgehoert hat.

---

## 2. Ordnerstruktur

### 2.1 `lessons/` — **Quelle (human-written)**

Jede Lektion ist eine einzelne Markdown-Datei nach dem Schema
`moduleXX-lessonYY.md`. Sie enthaelt 8 Pflichtsektionen:

1. **Lesson Title**
2. **Learning Objectives**
3. **Explanation**
4. **Slide Summary** (6–7 Bullets)
5. **Voice Narration Script** (mit `<break time="..."/>`-Tags)
6. **Visual Suggestions** (mind. 1 diagram, 1 protocol example, 1 concept visual)
7. **Exercise**
8. **Quiz**

`npm run validate-lessons` prueft diese Struktur streng. Faellt eine
Lektion durch, wird sie spaeter nicht gerendert.

**Modul-Markdown (Content-Agent):** Zusaetzlich koennen **mehrere Lektionen**
in einer Datei liegen (deutsche Ueberschriften, `**[Slide N]**`-Marker).
Der Lesson-Asset-Generator erkennt das Format automatisch (`format-detector.js`).
CLI: `--all-lessons` oder `--lesson <n>`. Details und Beispiele:
[MIGRATION-NOTES.md](./MIGRATION-NOTES.md).

### 2.2 `lesson-asset-generator/output/` — **Generator-Output**

Der Lesson-Asset-Generator konsumiert `lessons/*.md` und produziert
pro Lektion einen Ordner mit:

```
lesson-asset-generator/output/moduleXX-lessonYY/
├── slides_prompt.txt       # Input fuer Gamma
├── voice_script.txt        # Roh-Sprechertext (Input fuer Voice-Pipeline / ElevenLabs)
├── voice_script_clean.txt  # Optional: nach generate:voice — Text wie an ElevenLabs gesendet
├── visual_plan.json        # Beschreibt welche Visuals gebraucht werden
├── video_config.json       # Timing + Metadaten fuer Remotion
├── visuals-manifest.json   # Referenzen auf die Visual-Dateien
└── slides.json             # Strukturierte Slide-Daten
```

Lauf mit:

```powershell
# Legacy: alle Einzeldateien aus lessons/
node lesson-asset-generator/src/cli.js --input-dir lessons --out lesson-asset-generator/output --style video-style-engine

# Modul-Datei: alle Lektionen auf einmal
node lesson-asset-generator/src/cli.js --input Module/modul-01-defi-grundlagen-FINAL.md --all-lessons --out lesson-asset-generator/output --style video-style-engine
```

### 2.3 `assets-input/` — **Produzenten-Arbeitsbereich**

Dieser Ordner ist die **Schnittstelle zwischen manueller Arbeit und
dem Video-Renderer**. Pro Lektion gibt es einen Unterordner, in dem
alle Binary-Assets landen, die der Renderer braucht.

```
assets-input/moduleXX-lessonYY/
├── visual01.png            # ← aus Gamma: EIN Einzel-Visual fuer Slide 1
├── visual02.png            # ← aus Gamma: EIN Einzel-Visual fuer Slide 2
├── visual03.png            # ← aus Gamma: ...
├── visual04.png
├── visual05.png
├── visual06.png
├── visual07.png            # (optional; Slides ohne Visual bleiben leer)
├── voice.mp3               # ← npm run generate:voice (ElevenLabs)
├── visuals/                # Optional: Per-Visual-ID-Dateien, falls
│   ├── v01-core.png        #          einzelne Visuals explizit pro
│   └── v02-flow.svg        #          ID geliefert werden (Konvention 5.2)
├── slides.json             # Kopie vom Generator-Output
├── visuals-manifest.json   # Kopie vom Generator-Output
└── README.md               # Per prepare:assets automatisch erzeugt
```

> ⚠️ **Verboten:** `slideNN.png`-Dateien (also komplette Slide-
> Frames aus einem Gamma-Deck-Export) haben hier **nichts** verloren.
> Der Asset-Resolver ignoriert sie. Siehe
> [SLIDE_GENERATION_RULES.md](./SLIDE_GENERATION_RULES.md).

Anlegen mit:

```powershell
npm run prepare:assets
```

### 2.4 `videos/` und `posters/` — **Render-Output**

```
videos/moduleXX-lessonYY.mp4
posters/moduleXX-lessonYY.jpg
```

Beide Ordner werden bei Bedarf automatisch angelegt. Gerenderte MP4s
werden vom Platform-Build (`components/LessonVideoHero.tsx`) automatisch
entdeckt und in der passenden Lektion angezeigt.

> Hinweis zur Platform-Konvention: Der Renderer schreibt derzeit nach
> `videos/moduleXX-lessonYY.mp4`. Die Next.js-App erwartet das gleiche
> Schema unter `public/videos/<moduleSlug>-<lessonSlug>.mp4`. Eine
> Namens-Bruecke zwischen beiden Systemen ist in der
> `docs/offeneAufgaben.md` als offene Aufgabe vermerkt.

---

## 3. Visuals via Gamma — **Einzelbilder, keine Decks**

Gamma (oder jeder andere AI-Bildgenerator) liefert pro Slide **genau
ein** Visual: ein Diagramm, eine Illustration, ein Chart, eine
Konzept-Grafik. Das Slide-Layout mit Titel, Bullets und Branding wird
nicht von Gamma gebaut — das macht Remotion zur Render-Zeit aus dem
`slide-template.jsx`.

> **Pflichtlektuere fuer diesen Schritt:**
> [SLIDE_GENERATION_RULES.md](./SLIDE_GENERATION_RULES.md).

### 3.1 Schritt-fuer-Schritt

1. **Asset-Ordner vorbereiten** (einmalig):

   ```powershell
   npm run prepare:assets
   ```

   Optional mit `-- --copy-prompt`, damit `slides_prompt.txt` und
   `voice_script.txt` direkt in jeden Lektions-Ordner kopiert werden.

2. **Gamma oeffnen**: [gamma.app](https://gamma.app) — oder ein
   vergleichbares Text-zu-Bild-Tool (DALL·E, Midjourney, lokal gehostete
   SDXL-Instanz, Figma). Der Prompt ist tool-neutral.

3. **Fuer jede Lektion**:
   - Inhalt von `assets-input/moduleXX-lessonYY/slides_prompt.txt`
     in Gamma einfuegen. Der Prompt-Kopf enthaelt die Regel
     "Generate diagrams or illustrations only. Do not design slides
     or layouts."
   - Pro Slide **ein einzelnes Bild** generieren. Keine Decks, keine
     Mehrseiter, kein Corporate-Design.
   - Export als PNG, 16:9 (1920x1080) oder quadratisch (1080x1080),
     transparenter oder dunkler Hintergrund.
   - Dateien sauber umbenennen: `visual01.png`, `visual02.png`, …,
     `visualNN.png` — Index in der Reihenfolge der Slides im Prompt.
   - In `assets-input/moduleXX-lessonYY/` ablegen.

4. **Was NICHT auf das Bild gehoert:**
   - Slide-Titel (kommt aus `slides.json`, rendert Remotion)
   - Bullets (dito)
   - Slide-Counter, Module-Label, Footer-Branding (alles Remotion)
   - Corporate-Farben als Hintergrund (Remotion-Theme nimmt sie auf)

5. **Optional — explizite Visual-IDs:** Wer einzelne Visuals per ID
   aus `visual_plan.json` steuern will, legt sie unter
   `assets-input/moduleXX-lessonYY/visuals/<visual.id>.png` ab. Der
   Asset-Resolver priorisiert diese ID-basierten Dateien vor dem
   numerischen `visualNN.png`-Mapping.

6. **Optional — `npm run generate:slides`:** Das Skript existiert noch,
   ist aber fuer den klassischen *Deck-Slicing*-Flow gedacht (Gamma
   exportiert ein PDF, pdftoppm schneidet es). Das bricht die neue
   Regel, wenn das Deck komplette Slides enthaelt. Nutze es nur, wenn
   das Gamma-PDF selbst schon nur Einzelvisuals auf neutralem
   Hintergrund enthaelt.

### 3.2 Warum manuell statt API-Call?

- **Regeltreue pruefbar:** Ein Mensch sieht sofort, ob Gamma Titel-
  Text oder Corporate-Farben aufs Bild gesetzt hat.
- **Qualitaet:** 30 s Feinschliff pro Visual schlaegt jeden
  vollautomatischen Run.
- **API-Limits:** Gamma-API ist in Beta; 100 Visuals rauszupushen
  ist unzuverlaessiger als ein Produzent:innen-Batch in Gamma-UI.

Ein Video ohne Visuals wird trotzdem gerendert — der
`VisualRenderer.jsx` zeichnet einen neutralen Placeholder mit der
Visual-Beschreibung aus `visual_plan.json`. Visuals sind **kein**
Hard-Gate im Preflight.

---

## 4. Voice via ElevenLabs — **automatisiert**

`scripts/generate-voice.js` liest `voice_script.txt` aus dem
Generator-Output und bereitet den Text fuer TTS auf, bevor ElevenLabs
`voice.mp3` schreibt.

**End-to-End (inhaltlich):**

```
Lesson Content (Markdown)
  → Voice Script Generator (lesson-asset-generator) → voice_script.txt
  → Script Optimizer (Zahlen, Satzlänge, Pausen; siehe unten)
  → Voice Preprocessor / Aussprache (Woerterbuch)
  → ElevenLabs Voice Generation
  → MP3 Output (voice.mp3; optional voice_script_clean.txt als Debug-Kopie)
```

**Technische Kette (pro Lektion):**

```
voice_script.txt
  → Sanitize (pipeline/voice/sanitize_voice_script.js)
  → Script Optimizer (pipeline/voice/script_optimizer.js)
       · Zahlen/Prozent/$-Kürzel/k·M·B (script_normalizer.js, geschützte Segmente)
       · lange Sätze splitten, Aufzählungen (optimizeSentenceStructure)
       · Pausen „...“ nach Schlüssel-Sätzen (prosody_engine.js)
  → Voice Preprocessor (pipeline/voice/preprocess_voice_script.js
       + pronunciation_dictionary.json — inhaltlich abgestimmt mit
       defi_academy_pronunciation_dictionary.pdf im Repo-Root)
  → ElevenLabs (Default: eleven_multilingual_v3, siehe .env.example)
  → optional Audio-Enhancement (pipeline/voice/audio_post_process.js) → voice.mp3
```

`prepareVoiceForElevenLabs()` (voice_pipeline.js) verkettet **nur noch**:
Script Optimizer → Pronunciation (kein separater Prosody-Schritt danach).

**Manueller Zwischenschritt (ohne generate:voice):** Woerterbuch nur anwenden:

```powershell
node pipeline/voice/preprocess_voice_script.js --input lesson-asset-generator/output/module01-lesson01/voice_script.txt --output lesson-asset-generator/output/module01-lesson01/voice_script_clean.txt
```

Gesamt-API: `prepareVoiceForElevenLabs()` in `pipeline/voice/voice_pipeline.js`.
Bei `npm run generate:voice` wird zusaetzlich `voice_script_clean.txt` geschrieben
(finaler ElevenLabs-Text inkl. Optimizer + Woerterbuch). Tests: `npm run test:voice-pipeline`.

### 4.1 Setup (einmalig)

`.env.local` anlegen:

```
ELEVENLABS_API_KEY=sk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ELEVENLABS_MODEL=eleven_turbo_v2
ELEVENLABS_VOICE=Florian
```

Varianten siehe `.env.example`.

### 4.2 Lauf

```powershell
npm run generate:voice
```

Oder nur fuer ausgewaehlte Lektionen:

```powershell
node scripts/generate-voice.js --only module01-lesson01,module04-lesson02
node scripts/generate-voice.js --concurrency 3 --force
```

Log: `logs/generate-voice.log`. Vorhandene `voice.mp3` werden ohne
`--force` uebersprungen.

---

## 5. Render — **vollautomatisch**

Zwei Einstiegspunkte:

### 5.1 `npm run render:pilot`

Kleiner Smoke-Test: rendert die ersten 5 Lektionen mit
`--parallel 1`. Ideal als schnelle End-to-End-Probe nach Pipeline-
Aenderungen.

```powershell
npm run render:pilot
```

Kettet intern: `generate:slides` → `generate:voice` → `render-batch.js`.

### 5.2 `npm run render:course`

Vollproduktion ueber alle Lektionen. Partitioniert die Liste in
Chunks (Default 10) und spawnt pro Chunk einen isolierten Child-
Prozess mit `--parallel 2`, sodass ein OOM oder Crash in einer
Lektion den Rest nicht mitreisst.

```powershell
npm run render:course
```

Preflight-Skip pro Lektion, wenn `voice.mp3`, `visual_plan.json` oder
`video_config.json` fehlt. Fehler landen in `logs/render-errors.log`,
ein strukturierter Report entsteht in `logs/render-batch-report.json`.

### 5.3 Full-Orchestrator `npm run render-course`

Kettet zusaetzlich auch den Lesson-Asset-Generator davor (inkl.
Gamma-API-Stub-Fallback und Visual-Download). Details:
[defi_academy_system.md](./defi_academy_system.md) Abschnitt
"Master-Orchestrator".

---

## 6. Validierung & Logs

| Log-Datei | Inhalt |
|---|---|
| `logs/validate-lessons.log`     | Ergebnisse von `npm run validate-lessons` |
| `logs/generate-slides.log`      | Gamma-Flow pro Lektion |
| `logs/generate-voice.log`       | ElevenLabs-TTS pro Lektion |
| `logs/render-batch.log`         | Vollstaendige Render-Spur |
| `logs/render-errors.log`        | Append-Log: Warnungen + Fehler ueber alle Laeufe |
| `logs/render-batch-report.json` | Strukturierter Abschluss-Report |

---

## 7. Typische Probleme

| Symptom | Ursache | Fix |
|---|---|---|
| `voice.mp3 fehlt` im Preflight | `generate:voice` nicht gelaufen / API-Key falsch | `.env.local` pruefen, `npm run generate:voice` manuell |
| Render OOM, bricht gesamten Batch ab | — tritt nicht auf. `render:course` isoliert Chunks — OOM kostet max. einen Chunk. | — |
| Slide zeigt nur "Visual Placeholder" | `visualNN.png` nicht abgelegt oder falsch benannt | Einzel-Visual aus Gamma exportieren, als `visual01.png`/`visual02.png`/… in `assets-input/moduleXX-lessonYY/` ablegen |
| Slide-Titel steht doppelt (einmal rendern, einmal im Bild) | Gamma hat ein Deck-Layout mit Titel-Text geliefert | Bild ablehnen, Gamma auf Einzel-Visual-Modus stellen (siehe `SLIDE_GENERATION_RULES.md` §3) und ohne Text neu generieren |
| Slides-Handoff-README taucht auf | `generate:slides` ohne API-Key + ohne PDF gelaufen | Entweder Handoff-Flow (manuell in Gamma), oder API-Key + pdftoppm installieren |
| `validate-lessons` meldet fehlende Sektion | Markdown-Struktur unvollstaendig | Sektionen nach dem 8-Sektionen-Schema ergaenzen |

---

## 8. Vollstaendige CLI-Referenz

| Befehl | Zweck |
|---|---|
| `npm run validate-lessons`  | Markdown-Validator (8 Sektionen, Slide-Count, Visuals, Timings) |
| `npm run prepare:assets`    | Lege `assets-input/moduleXX-lessonYY/` + README pro Lektion an |
| `npm run generate:slides`   | Gamma-Slides (API oder Manual-Handoff) + lokales PDF-Slicing |
| `npm run generate:voice`    | ElevenLabs-TTS-Run ueber alle Lektionen |
| `npm run render:pilot`      | Smoke-Test (erste 5 Lektionen, `--parallel 1`) |
| `npm run render:course`     | Vollproduktion (Chunk-isoliert, `--parallel 2`) |
| `npm run pilot-render`      | Alternative: 5 feste Default-Lektionen (siehe Systemdoku) |
| `npm run render-course`     | Full-Orchestrator inkl. Lesson-Asset-Generator + API-Steps |

---

## 9. Rollenverteilung

| Rolle | Verantwortung |
|---|---|
| **Content-Autor:in** | `lessons/*.md` schreiben, 8-Sektionen-Schema einhalten |
| **Asset-Produzent:in** | In Gamma **Einzel-Visuals** bauen (keine Decks!), als `visualNN.png` ablegen, optional `visuals/<id>.png`-Pro-ID-Dateien |
| **Pipeline-Operator:in** | `.env.local` pflegen, `npm run render:course` anstossen, Logs pruefen |
| **Design-Owner:in** | `video-style-engine/` pflegen (theme.json, slide-template.jsx, …) — Layout-Anpassungen ausschliesslich hier |
| **Agent / Developer** | Scripts, Systemdoku, Renderer-Code pflegen; offene Punkte in `docs/offeneAufgaben.md` |
