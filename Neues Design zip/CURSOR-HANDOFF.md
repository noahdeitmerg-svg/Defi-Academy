# Cursor Handoff — Brand 2.0 Upgrade + Video-Pipeline

**Status:** Brand 2.0 ist fertig designt und getestet. Eine Referenz-MP4 für
Modul 1 Lektion 1.1 ist produziert und funktioniert. Audio und Video sind
zu 0.06 Sekunden genau synchron.

**Deine Aufgabe:** Bestehendes System auf Brand 2.0 umstellen und Test-
Video selbst produzieren. **Die Content-Markdown-Dateien werden NICHT
angefasst**, nur das Rendering ändert sich.

---

## Was sich geändert hat

### Brand 2.0 fügt fünf Komponenten hinzu

1. **Kategorie-Pill oben links** — klein, gold-umrandet. Werte:
   `GRUNDLAGEN`, `PRAXIS`, `STRATEGIE`, `RISIKO & AUDIT`, `FORTGESCHRITTEN`
2. **Checkmark-Bullets** in goldenen Kreisen statt Gold-Dashes
3. **Hero-Motiv** rechts auf jeder Slide — 13 vorgefertigte SVG-Motive,
   eines pro Modul (Modul 1 = konzentrische Kreise, Modul 7 = fallender
   Preis, etc.)
4. **Wordmark-Footer** zentriert mit Shield-Lockup
5. **Gold-Progress-Bar** (nur optional, fürs Video-Overlay)

### Was unverändert bleibt

- `colors.json` — gleiche Farbwerte (#0B1F3B navy, #F5B841 gold)
- `typography.json` — gleiche Inter-Typografie
- `logo.svg` — gleiches Shield-Logo
- **Content-Markdown** — null Änderungen, Cursor soll die Module nicht anfassen
- **Pipeline-Logik** (Parser, TTS, Timing, Video-Composition) — unverändert
- **Ordnerstruktur** — nur zwei neue Files + ein neuer Runner

### Was bewusst NICHT im Design ist

- Keine 3D-Render-Blöcke mit Glow — wir bleiben bei flachem Line-Art
- Keine Sparkles, Partikel, Cinema-Beleuchtung
- Keine KI-generierten Visuals — alle 13 Motive sind programmatisch erzeugt

---

## Lesereihenfolge

Bitte in dieser Reihenfolge lesen, bevor du Code anfasst:

1. **`brand-2.0/BRAND-2.0.md`** — erklärt das Upgrade und die Komponenten
2. **`brand-2.0/hero-motifs.js`** — die 13 Motive als Code
3. **`brand-2.0/render-slide-v2.js`** — Slide-Template-Renderer (Brand 2.0)
4. **`brand-2.0/motif-previews/motifs-grid.jpg`** — visueller Überblick aller Motive
5. **`pipeline-test-v2/src/render-slides-to-svg-v2.js`** — Pipeline-Adapter
6. **`pipeline-test-v2/src/run-full-pipeline-v2.js`** — kompletter Runner
7. **`reference-video/lektion-1.1-brand-2.0-reference.mp4`** — das Zielergebnis

---

## Aktueller Pipeline-Ablauf (unverändert, nur Rendering-Step neu)

```
Markdown-Modul
    │
    ▼ [1] module-parser.js
    Lesson-Objekt mit strukturierten Slides
    │
    ▼ [2] extract-voice-text.js + validateCleanNarration
    voice_text.txt (reiner Sprechertext, ohne Quiz/Übungen/Visuals)
    │
    ▼ [3] tts-adapter.js → ElevenLabs API
    voice.mp3 (echte MP3-Datei)
    │
    ▼ [4] ffprobe voice.mp3
    exakte Audio-Dauer in Sekunden (niemals geschätzt!)
    │
    ▼ [5] distribute-slide-timing.js
    voice_timing.json (Slides proportional zur Wortzahl verteilt)
    │
    ▼ [6] render-slides-to-svg-v2.js    ← NEU: nutzt Brand 2.0
    slide-01.svg ... slide-NN.svg im neuen Design
    │
    ▼ [7] compose-video.js (rsvg-convert + ffmpeg)
    final_test_video.mp4 — Audio und Video perfekt synchron
```

**Goldene Regel** (nach dem letzten kaputten Video, wo Slides und Audio
auseinander liefen): **Niemals Audio-Länge schätzen. Immer `ffprobe`
messen und damit weiterrechnen.**

---

## Was du konkret tun sollst

### Stufe 1: Setup verifizieren

```bash
# Entpacke die zwei Pakete
unzip brand-2.0.zip
unzip pipeline-test-v2.zip

# Struktur prüfen — sollte so aussehen:
ls brand-2.0/
# → BRAND-2.0.md, hero-motifs.js, render-slide-v2.js, colors.json, ...

ls pipeline-test-v2/src/
# → run-full-pipeline-v2.js, render-slides-to-svg-v2.js, module-parser.js, ...
```

Die `pipeline-test-v2/src/render-slides-to-svg-v2.js` erwartet `brand/`
**eine Ebene über** `pipeline-test/`. Die Ordnerstruktur muss so sein:

```
project-root/
├── brand/                          ← aus brand-2.0.zip hier reinkopieren
│   ├── render-slide-v2.js
│   ├── hero-motifs.js
│   ├── colors.json
│   └── ...
├── pipeline-test/                  ← aus pipeline-test-v2.zip hier reinkopieren
│   └── src/
│       ├── run-full-pipeline-v2.js
│       ├── render-slides-to-svg-v2.js
│       └── ...
└── content/
    └── modul-01-defi-grundlagen-FINAL.md
```

### Stufe 2: Test-Video neu produzieren (Lektion 1.1)

```bash
cd pipeline-test

# ElevenLabs-Credentials setzen (oder weglassen, dann fallback auf espeak)
export ELEVENLABS_API_KEY=sk_...
export ELEVENLABS_VOICE_ID=<deutsche-male-voice-id>

# Pipeline v2 laufen lassen
node src/run-full-pipeline-v2.js \
  --input ../content/modul-01-defi-grundlagen-FINAL.md \
  --lesson module01-lesson01 \
  --output ./test-output-v2
```

### Stufe 3: Ergebnis verifizieren (Pflichtprüfung)

```bash
cd test-output-v2/module01-lesson01

# a) Audio- und Video-Länge müssen auf 0.5s genau übereinstimmen
AUDIO=$(ffprobe -v error -show_entries format=duration -of csv=p=0 voice.mp3)
VIDEO=$(ffprobe -v error -show_entries format=duration -of csv=p=0 final_test_video.mp4)
echo "Audio: ${AUDIO}s"
echo "Video: ${VIDEO}s"
# Diff muss < 0.5s sein

# b) slides.json muss 6 Slides enthalten (nicht 1!)
node -e "const s=require('./slides.json'); console.log('Slides:', s.slides.length); s.slides.forEach(x => console.log('  ' + x.number + '. ' + x.title))"

# c) Frames bei verschiedenen Timestamps müssen UNTERSCHIEDLICHE Inhalte zeigen
mkdir -p /tmp/frame-check
ffmpeg -y -loglevel error -ss 5  -i final_test_video.mp4 -vframes 1 /tmp/frame-check/at-05s.jpg
ffmpeg -y -loglevel error -ss 30 -i final_test_video.mp4 -vframes 1 /tmp/frame-check/at-30s.jpg
ffmpeg -y -loglevel error -ss 80 -i final_test_video.mp4 -vframes 1 /tmp/frame-check/at-80s.jpg
ffmpeg -y -loglevel error -ss 120 -i final_test_video.mp4 -vframes 1 /tmp/frame-check/at-120s.jpg
ls -la /tmp/frame-check/
```

Die vier Frames müssen **vier verschiedene Slides** zeigen. Wenn zwei
gleich aussehen, ist die Timing-Distribution kaputt.

### Stufe 4: Vergleich mit Referenzvideo

Die Referenz ist `reference-video/lektion-1.1-brand-2.0-reference.mp4`.
Dein produziertes Video sollte visuell und im Timing sehr ähnlich sein —
der Unterschied wird im Audio liegen (ElevenLabs klingt natürlicher als
espeak), aber die Slide-Wechsel und das Design müssen passen.

Wenn alles passt: **Grünes Licht für die Produktion der restlichen 12
Module**. Der Befehl für das komplette Modul 1 (alle 6 Lektionen) ist:

```bash
node src/run-full-pipeline-batch.js \
  --input ../content/modul-01-defi-grundlagen-FINAL.md \
  --output ./test-output-v2-complete
```

### Stufe 5: Plattform-UI Cleanup (später, nicht jetzt)

Die aktuelle Lernplattform-UI hat Design-Bugs aus dem vorherigen Versuch,
die separat behoben werden müssen — das ist ein eigener Task, erst nach
erfolgreichem Test-Video angehen:

- `EINFUEHRUNG`-Pill mit fehlendem Umlaut in der aktuellen UI entfernen
- `[Visual Placeholder]`-Block entfernen, Slides im korrekten Template
  rendern
- Navigation hat Duplikate (Lektion 1.1 erscheint zweimal, Lektions-IDs
  wie `1.9 open-quiz` sind User-unlesbar) — Datenmodell-Problem, das
  saubere Modul-Hierarchie braucht
- Encoding-Probleme: alle Umlaute müssen als echte UTF-8-Umlaute angezeigt
  werden, nicht `ue`/`oe`/`ae`

**Wichtig für die Plattform-UI:** Das Video, das im Player gespielt wird,
ist die **fertige MP4**. Die UI-Komponente ist nur ein HTML5-`<video>`-Tag.
Die UI soll KEINE eigenen Slides rendern. Die Slides sind im Video
eingebrannt. Das letzte Mal hat Cursor versucht, eigene Slide-Komponenten
in der UI zu rendern — das ist falsch.

---

## Failure-Modes, die nicht passieren dürfen

| Fehler | Woran erkennbar | Fix |
|--------|-----------------|-----|
| Audio länger als Video | `ffprobe` zeigt Differenz > 0.5s | `-shortest`-Flag in `ffmpeg`-Aufruf fehlt |
| Video länger als Audio | Am Ende schwarzer Screen | Slide-Dauer wurde hardcoded statt proportional verteilt |
| Alle Frames gleich | Frame-Check-Script zeigt identische JPGs | Slide-Rendering-Loop ist kaputt oder nur 1 SVG erzeugt |
| `[Visual Placeholder]` sichtbar | Im Video sichtbar | `render-slide-v2.js` nicht verwendet, stattdessen altes Template |
| `EINFUEHRUNG` ohne Umlaut | Im Titel oder UI | UTF-8-Encoding-Problem, muss systemweit gefixt werden |
| Duplikate in Navigation | Lektion 1.1 erscheint zweimal | Datenmodell-Problem, Modul-Hierarchie fehlt |

---

## Paket-Inhalt

```
brand-2.0/
├── BRAND-2.0.md                  ← HIER ZUERST LESEN
├── brand-2.0-components.js       Komponenten-Token-Definitionen
├── hero-motifs.js                13 Hero-Motive als Code
├── render-slide-v2.js            Slide-Template-Renderer
├── colors.json                   Farbsystem (unverändert)
├── typography.json               Typografie (unverändert)
├── logo.svg, logo-lockup.svg, logo-mono.svg
├── design-guidelines.md          Design-Prinzipien
├── sync-to-theme.js              Theme-Sync-Helper
└── motif-previews/
    ├── module-01.svg ... module-13.svg
    ├── module-01.png ... module-13.png
    └── motifs-grid.jpg           ← Übersichtsbild aller Motive

pipeline-test-v2/
├── src/
│   ├── run-full-pipeline-v2.js           ← Hauptrunner
│   ├── render-slides-to-svg-v2.js        ← Brand 2.0 Adapter
│   ├── module-parser.js                  (unverändert)
│   ├── extract-voice-text.js             (unverändert)
│   ├── generate-slides-json.js           (unverändert)
│   ├── distribute-slide-timing.js        (unverändert)
│   ├── tts-adapter.js                    (unverändert)
│   ├── compose-video.js                  (unverändert)
│   └── run-full-pipeline.js              (alte v1, kann entfernt werden)
└── output/
    └── module01-lesson01/
        ├── slides.json                   Beispiel-Output
        ├── voice.mp3
        ├── voice_timing.json
        ├── voice_text.txt
        ├── final_test_video.mp4          ← funktionierende Referenz-MP4
        └── slides-svg/
            ├── slide-01.svg ... slide-06.svg

reference-video/
└── lektion-1.1-brand-2.0-reference.mp4   ← Zielergebnis zum Vergleich
```

---

## Wenn du weiter nicht klar kommst

- **Slide sieht nicht wie Referenzbild aus:** Prüfe, ob `render-slide-v2.js`
  wirklich aufgerufen wird (Import-Pfad stimmt?) statt des alten Templates
- **Audio/Video-Desync:** Prüfe `compose-video.js` — der `-shortest`-Flag
  muss drin sein, und die `duration_seconds` in `voice_timing.json`
  müssen aus der `ffprobe`-Messung stammen
- **Hero-Motiv fehlt:** `brand/hero-motifs.js` muss per `require` erreichbar
  sein; der Pfad in `render-slides-to-svg-v2.js` erwartet `../../brand/`
- **Pipeline crashed:** Melden, wo es hakt. Nicht improvisieren, nicht
  eigene Slide-Logik schreiben.
