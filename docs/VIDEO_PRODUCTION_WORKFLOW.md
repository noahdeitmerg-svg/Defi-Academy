# DeFi-Academy Video-Produktion — End-to-End-Workflow

Dieses Dokument beschreibt den vollstaendigen Weg, wie aus einer Markdown-
Lektion ein fertiges MP4 wird. Es richtet sich an Content-Autor:innen,
Produzent:innen und neue Agenten/Entwickler:innen.

> **TL;DR** —
> ```
> npm run validate-lessons
> node lesson-asset-generator/src/cli.js --input-dir lessons --out lesson-asset-generator/output
> npm run prepare:assets
> # Gamma-Decks manuell erzeugen, slide01..slide07.png ablegen
> npm run generate:voice
> npm run render:course
> ```
> Ergebnis: `videos/moduleXX-lessonYY.mp4` + `posters/moduleXX-lessonYY.jpg`.

---

## 1. Pipeline-Uebersicht

```
┌─────────────┐   ┌──────────────────────┐   ┌─────────────────┐   ┌─────────────────┐   ┌────────────────┐
│  lessons/   │─▶│ Lesson-Asset-        │─▶│ Gamma (manuell) │─▶│ ElevenLabs      │─▶│ Video-Renderer │
│  *.md       │   │ Generator            │   │ slides_prompt → │   │ voice_script →  │   │ (Remotion)     │
│             │   │                      │   │ slideNN.png     │   │ voice.mp3       │   │                │
└─────────────┘   └──────────────────────┘   └─────────────────┘   └─────────────────┘   └────────────────┘
                         │                           │                     │                     │
                         ▼                           ▼                     ▼                     ▼
               lesson-asset-generator/     assets-input/            assets-input/          videos/*.mp4
               output/moduleXX-lessonYY/   moduleXX-lessonYY/       moduleXX-lessonYY/    posters/*.jpg
                 ├── slides_prompt.txt      ├── slide01.png          └── voice.mp3
                 ├── voice_script.txt       ├── slide02.png
                 ├── visual_plan.json       ├── ...
                 ├── video_config.json      └── slide07.png
                 └── visuals-manifest.json
```

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

### 2.2 `lesson-asset-generator/output/` — **Generator-Output**

Der Lesson-Asset-Generator konsumiert `lessons/*.md` und produziert
pro Lektion einen Ordner mit:

```
lesson-asset-generator/output/moduleXX-lessonYY/
├── slides_prompt.txt       # Input fuer Gamma
├── voice_script.txt        # Input fuer ElevenLabs
├── visual_plan.json        # Beschreibt welche Visuals gebraucht werden
├── video_config.json       # Timing + Metadaten fuer Remotion
├── visuals-manifest.json   # Referenzen auf die Visual-Dateien
└── slides.json             # Strukturierte Slide-Daten
```

Lauf mit:

```powershell
node lesson-asset-generator/src/cli.js --input-dir lessons --out lesson-asset-generator/output
```

### 2.3 `assets-input/` — **Produzenten-Arbeitsbereich**

Dieser Ordner ist die **Schnittstelle zwischen manueller Arbeit und
dem Video-Renderer**. Pro Lektion gibt es einen Unterordner, in dem
alle Binary-Assets landen, die der Renderer braucht.

```
assets-input/moduleXX-lessonYY/
├── slide01.png             # ← MANUELL aus Gamma
├── slide02.png             # ← MANUELL aus Gamma
├── slide03.png             # ← MANUELL aus Gamma
├── slide04.png             # ← MANUELL aus Gamma
├── slide05.png             # ← MANUELL aus Gamma
├── slide06.png             # ← MANUELL aus Gamma
├── slide07.png             # ← MANUELL aus Gamma (optional 7. Folie)
├── voice.mp3               # ← generate:voice (ElevenLabs)
├── visuals/                # Screenshots, Diagramme (manuell ergaenzt)
│   └── ...
├── slides.json             # Kopie vom Generator-Output
├── visuals-manifest.json   # Kopie vom Generator-Output
└── README.md               # Per prepare:assets automatisch erzeugt
```

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

## 3. Slides via Gamma — **manueller Schritt**

Gamma ist aktuell die beste Quelle fuer markenkonforme Slides. Der
generierte Prompt in `slides_prompt.txt` ist speziell so formatiert,
dass Gamma mit minimalem Feinschliff ein passendes 6–7-Folien-Deck
erzeugt.

### 3.1 Schritt-fuer-Schritt

1. **Asset-Ordner vorbereiten** (einmalig):

   ```powershell
   npm run prepare:assets
   ```

   Optional mit `-- --copy-prompt`, damit `slides_prompt.txt` direkt in
   jeden Lektions-Ordner kopiert wird — praktisch fuer Offline-Arbeit.

2. **Gamma oeffnen**: [gamma.app](https://gamma.app)

3. **Fuer jede Lektion**:
   - Inhalt von `assets-input/moduleXX-lessonYY/slides_prompt.txt`
     (oder direkt aus `lesson-asset-generator/output/moduleXX-lessonYY/`)
     in Gamma einfuegen ("Generate with AI" oder "Paste text").
   - Feinschliff: Theme auswaehlen (siehe `video-style-engine/` fuer
     Farben/Typografie), Bilder ersetzen, Layout kontrollieren.
   - Export **als Bilder**: `Export → Images → PNG`, Aufloesung 1920x1080.
   - Dateien sauber umbenennen: `slide01.png`, `slide02.png`, …,
     `slide07.png`.
   - In `assets-input/moduleXX-lessonYY/` ablegen.

4. **Alternative (optional)**: Wenn Gamma als PDF exportiert wird
   (`Export → PDF`), die Datei als `assets-input/moduleXX-lessonYY/slides.pdf`
   ablegen und anschliessend `npm run generate:slides` laufen lassen —
   das Skript zerschneidet die PDF automatisch in PNGs (erfordert
   `pdftoppm` aus poppler-utils).

5. **Vollautomatischer Pfad (optional, noch experimentell)**: Mit
   gesetztem `GAMMA_API_KEY` ruft `npm run generate:slides` die Gamma
   Generate API direkt auf. Siehe
   [defi_academy_system.md](./defi_academy_system.md) Abschnitt
   "Slides-Pipeline-Dreistufigkeit".

### 3.2 Warum manuell?

- Gamma-API ist in Beta und hat unberechenbare Rate-Limits.
- Visuelle Qualitaet profitiert deutlich von 30 s Feinschliff pro Deck.
- Manuelle Kontrolle ueber Theme + Cover-Bild ist fuer Markenkonsistenz
  wichtig.

Ein Video ohne Slides wird trotzdem gerendert (Renderer nutzt
Platzhalter) — der Slides-Schritt ist **kein** Hard-Gate.

---

## 4. Voice via ElevenLabs — **automatisiert**

`scripts/generate-voice.js` liest `voice_script.txt` aus dem
Generator-Output und erzeugt ueber ElevenLabs TTS eine
`assets-input/moduleXX-lessonYY/voice.mp3`.

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
| `slide01.png` fehlt, Video sieht leer aus | Gamma-Export nicht abgelegt | Slides aus Gamma als PNG exportieren, nach `assets-input/moduleXX-lessonYY/` |
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
| **Asset-Produzent:in** | Gamma-Slides bauen, optional eigene `visuals/`-Screenshots, `assets-input/` fuellen |
| **Pipeline-Operator:in** | `.env.local` pflegen, `npm run render:course` anstossen, Logs pruefen |
| **Agent / Developer** | Scripts, Systemdoku, Renderer-Code pflegen; offene Punkte in `docs/offeneAufgaben.md` |
