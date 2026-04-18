# DeFi Akademie — Academy-Build-Pipeline

**Ziel**: Aus finalen Lektions-Markdowns (`lessons/moduleXX-lessonYY.md`) mit
möglichst wenigen manuellen Schritten fertige Videos
(`videos/moduleXX-lessonYY.mp4`) produzieren.

Der Mensch macht nur noch **zwei Dinge manuell**:

1. Gamma-Prompts hochladen → Visuals herunterladen → in `assets-input/<id>/`.
2. ElevenLabs-Skripte hochladen → `voice.mp3` → in `assets-input/<id>/`.

Den Rest übernimmt die Pipeline.

---

## 1. Kurz-Referenz der Befehle

| Befehl | Zweck |
| --- | --- |
| `npm run generate-assets` | Erzeugt pro Lektion `slides_prompt.txt`, `voice_script.txt`, `visual_plan.json`, `video_config.json` in `generated-assets/<id>/`. |
| `npm run collect-prompts` | Sammelt Prompts flach in `gamma-prompts/` und `elevenlabs-prompts/` (als `<id>.txt`). |
| `npm run academy-build` | Ruft `generate-assets` + `collect-prompts` hintereinander auf. |
| `npm run check-assets` | Prüft, dass in `assets-input/<id>/` die Dateien `voice.mp3` und `visualNN.png` vollständig sind. |
| `npm run render-videos` | Preflight-Check + Rendering aller Lektionen nach `videos/` (und `posters/`). |

Alle Scripts kennen die Flags:

- `--only module01-lesson01,module04-lesson02` — nur bestimmte Lektionen
- `--dry-run` — plant den Lauf, ohne zu schreiben
- `--help` — volle Flag-Liste

---

## 2. Ordner-Struktur

```
defi-academy/
├── lessons/                         ← Input: finale Markdown-Lektionen
│   ├── module01-lesson01.md
│   ├── module01-lesson02.md
│   └── …
│
├── generated-assets/                ← Output Schritt 1 (Generator)
│   ├── module01-lesson01/
│   │   ├── slides_prompt.txt
│   │   ├── voice_script.txt
│   │   ├── visual_plan.json
│   │   ├── video_config.json
│   │   ├── slides.json
│   │   └── visuals-manifest.json
│   └── …
│
├── gamma-prompts/                   ← Output Schritt 2 (Upload zu Gamma)
│   ├── module01-lesson01.txt
│   └── …
│
├── elevenlabs-prompts/              ← Output Schritt 2 (Upload zu ElevenLabs)
│   ├── module01-lesson01.txt
│   └── …
│
├── assets-input/                    ← manuell befüllt (Schritte 3 + 4)
│   └── module01-lesson01/
│       ├── visual01.png             ← aus Gamma
│       ├── visual02.png
│       ├── voice.mp3                ← aus ElevenLabs
│       └── …
│
├── videos/                          ← Output Schritt 6 (Renderer)
│   ├── module01-lesson01.mp4
│   └── …
│
└── posters/                         ← Output Schritt 6 (Renderer)
    ├── module01-lesson01.jpg
    └── …
```

Alle abgeleiteten Ordner (`generated-assets/`, `gamma-prompts/`,
`elevenlabs-prompts/`, `assets-input/`, `videos/`, `posters/`)
sind in `.gitignore` — nichts davon wird committet.

---

## 3. Wichtige Architektur-Regel

> **Gamma erzeugt NUR Einzel-Visuals, NICHT ganze Slides.**
> Die komplette Slide-Gestaltung (Layout, Typografie, Intro, Outro)
> macht Remotion über `video-style-engine/slide-template.jsx`.

Deshalb heißen die Gamma-Exporte `visual01.png`, `visual02.png`, … — nicht
`slide01.png`. Details: [`docs/SLIDE_GENERATION_RULES.md`](./SLIDE_GENERATION_RULES.md).

---

## 4. User-Workflow Schritt für Schritt

### Schritt 1 — Lektionen schreiben

Alle Lektions-Markdowns unter `lessons/moduleXX-lessonYY.md` ablegen.
Pflicht-Sektionen siehe `scripts/validate-lessons.js` (Title, Learning
Objectives, Explanation, Slide Summary, Voice Narration Script, Visual
Suggestions, Exercise, Quiz).

### Schritt 2 — Assets generieren

```bash
npm run academy-build
```

Das läuft:

- `generate-assets` → produziert `generated-assets/<id>/` für jede Lektion.
- `collect-prompts` → kopiert die beiden `.txt`-Dateien flach in
  `gamma-prompts/<id>.txt` und `elevenlabs-prompts/<id>.txt`.

Ergebnis: zwei Ordner mit jeweils so vielen `.txt`-Dateien wie Lektionen,
fertig zum Drag&Drop-Upload.

### Schritt 3 — Gamma (Visuals)

1. Alle Dateien aus `gamma-prompts/` in Gamma öffnen
   (jeder Prompt = ein Visual-Asset-Set für eine Lektion).
2. Gamma generiert Diagramme / Illustrationen.
3. Export als PNG.
4. PNGs als `visual01.png`, `visual02.png`, … in
   `assets-input/<id>/` ablegen (Reihenfolge laut `visual_plan.json`).

### Schritt 4 — ElevenLabs (Voice)

1. Jedes `.txt` aus `elevenlabs-prompts/` in ElevenLabs TTS einfügen.
2. Voice: "Florian" oder konfigurierte Voice, Modell `eleven_turbo_v2`.
3. Export als MP3 → `assets-input/<id>/voice.mp3`.

**Alternative automatisiert**: `ELEVENLABS_API_KEY` in `.env` setzen und
`npm run generate:voice` nutzen.

### Schritt 5 — Vollständigkeit prüfen

```bash
npm run check-assets
```

Meldet pro Lektion, ob `voice.mp3` und mindestens ein `visualNN.png`
vorhanden sind. Bei Fehlern: Datei nachreichen und erneut prüfen.

### Schritt 6 — Videos rendern

```bash
npm run render-videos
```

Führt intern aus:

1. `check-assets` als Preflight (überspringbar mit `--skip-check`).
2. `scripts/render-batch.js` mit Pfaden der Academy-Build-Pipeline
   (`generated-assets/`, `assets-input/`, Output `videos/`, `posters/`).

Ergebnis: `videos/moduleXX-lessonYY.mp4` und `posters/moduleXX-lessonYY.jpg`.

---

## 5. Häufige Teil-Läufe

```bash
# Nur eine Lektion ganz durchziehen
npm run generate-assets -- --only module04-lesson02
npm run collect-prompts -- --only module04-lesson02
# … Gamma + ElevenLabs manuell für diese eine Lektion …
npm run check-assets -- --only module04-lesson02
npm run render-videos -- --only module04-lesson02

# Trockenübung ohne Schreibzugriff
npm run generate-assets -- --dry-run

# Pilot-Render (5 Default-Lektionen, single-threaded)
npm run pilot-render
```

---

## 6. Zusammenspiel mit bestehenden Scripts

Die Academy-Build-Pipeline ist eine **zusätzliche Schicht** über den
bestehenden Low-Level-Scripts. Bestehende Scripts wurden nicht entfernt:

| Aufgabe | Neuer Wrapper | Darunter liegendes Script |
| --- | --- | --- |
| Lesson-Assets erzeugen | `generate-all-assets.js` | `lesson-asset-generator/.../src/cli.js` |
| Prompts sammeln | `collect-prompts.js` | — (rein Dateisystem) |
| Assets prüfen | `check-assets.js` | — (rein Dateisystem) |
| Videos rendern | `render-all-videos.js` | `render-batch.js` (unverändert) |
| Voice automatisch | `scripts/generate-voice.js` | ElevenLabs API |
| Slides automatisch (optional, Beta) | `scripts/generate-slides.js` | Gamma API |

---

## 7. Troubleshooting

| Symptom | Ursache / Fix |
| --- | --- |
| `generate-assets` findet keine Lektionen | `lessons/`-Ordner leer — Markdown-Lektionen ablegen (`moduleXX-lessonYY.md`). |
| `collect-prompts` meldet „Quelle fehlt" | Zuerst `npm run generate-assets` laufen lassen. |
| `check-assets`: „keine visualNN.* oder slideNN.* Dateien" | Gamma-Export fehlt — Prompts aus `gamma-prompts/<id>.txt` bei Gamma ausführen und `visualNN.png` ablegen. |
| `check-assets`: „Legacy-slideNN" Warnung | Alte Namenskonvention — siehe `docs/SLIDE_GENERATION_RULES.md`, neu als `visualNN.png` ablegen. |
| `render-videos` crasht sofort | Preflight via `npm run check-assets` laufen lassen und Fehler beheben. |
| Video erscheint nicht in der Plattform | Konvention in `public/videos/<moduleSlug>-<lessonSlug>.mp4` prüfen — ggf. umbenennen/kopieren (offene Aufgabe 5.4 in `docs/offeneAufgaben.md`). |
