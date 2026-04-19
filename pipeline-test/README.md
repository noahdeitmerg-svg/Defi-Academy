# pipeline-test (SVG + ffmpeg)

**Nicht** Remotion / `video-renderer/`. Eine schlanke Pipeline: Modul-Markdown → `slides.json` → ElevenLabs → **ffprobe** → `voice_timing.json` → SVG/PNG → **ffmpeg** mit `-shortest`.

## Voraussetzungen

- Node 20+
- **ffmpeg/ffprobe:** Entweder im `PATH` **oder** per `npm install` die mitgelieferten Binaries (`ffmpeg-static`, `ffprobe-static` — ca. 350 MB, einmalig).
- Optional: `FFMPEG_PATH` / `FFPROBE_PATH` auf eigene Binaries setzen (überschreibt alles).
- `ELEVENLABS_API_KEY` und `ELEVENLABS_VOICE_ID` (z. B. in Repo-Root `.env` — wird automatisch geladen)

**PowerShell:** Du bist oft schon in `…\Defi-Academy\pipeline-test` — dann **nicht** nochmal `cd pipeline-test` (Unterordner existiert nicht).

## Installation

```bash
cd pipeline-test
npm install
```

## Lauf (Modul 1, Lektion 1.1)

Das Markdown liegt im Monorepo unter `Module/modul-01-defi-grundlagen-FINAL.md` (nicht zwingend unter `content/`).

```bash
cd pipeline-test
node src/run-full-pipeline.js \
  --input ../Module/modul-01-defi-grundlagen-FINAL.md \
  --lesson module01-lesson01 \
  --output ./test-output
```

Ohne `--input` wird nacheinander versucht: `../content/modul-01-defi-grundlagen-FINAL.md`, dann `../Module/modul-01-defi-grundlagen-FINAL.md`.

## Ausgaben (`test-output/module01-lesson01/`)

| Datei | Bedeutung |
|--------|-----------|
| `slides.json` | Alle Folien aus der Zusammenfassung (typisch 6, Lektionen mit 7 Folien möglich) |
| `voice_text.txt` | Reiner Sprechertext |
| `voice.mp3` | ElevenLabs |
| `voice_timing.json` | Start/Ende pro Slide, **letzte `end_seconds` = ffprobe(audio)** |
| `slide-01.svg` … | Brand-Farben (eine SVG/PNG pro Folie) |
| `slide-01.png` … | gerendert (@resvg/resvg-js) |
| `final_test_video.mp4` | muxed mit `-shortest` |
| `frame-check/at-5s.jpg` … | optional zur visuellen Prüfung |

## Verifikation

Im Ordner `pipeline-test` (aktueller Pfad soll `…\pipeline-test` sein):

```bash
npm run verify
# oder
node src/verify-output.js ./test-output/module01-lesson01
```

Mit absolutem Pfad geht ebenfalls: `node src/verify-output.js C:\…\test-output\module01-lesson01`

## Hinweis

- Kein `[Visual Placeholder]` in dieser Pipeline — nur Text aus **Folien-Zusammenfassung** + Narration aus **Sprechertext**.
- Audio-Länge wird **nur** mit `ffprobe` gemessen, nie geschätzt.
