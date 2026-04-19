# Migration: Multi-Format Support

> **Kontext:** Diese Notizen stammen aus dem Video-Agent-Lieferpaket und
> beschreiben die **Zwei-Format-Unterstützung** im Lesson-Asset-Generator.
> Alle genannten Pfade `src/…` beziehen sich auf `lesson-asset-generator/src/`.

## Status

Der Generator unterstützt **beide** Content-Agent-Formate:

1. **Legacy Single-Lesson Format** (`lesson-asset-generator/examples/module04-lesson02.md`)
   - Eine Lektion pro Datei
   - Englische Überschriften (`# Lesson Title`, `# Learning Objectives`, …)
   - Unstrukturierte Bullets in `# Slide Summary`
   - Narration als Fließtext in `# Voice Narration Script`

2. **Module Format** (z. B. `Module/modul-01-defi-grundlagen-FINAL.md`)
   - Mehrere Lektionen pro Datei
   - Deutsche Überschriften (`## Lektion X.Y`, `### Folien-Zusammenfassung`, …)
   - Explizite `**[Slide N] — Titel**`-Marker
   - 1:1-Zuordnung zwischen Slide und Narration

## Relevante Dateien (Monorepo)

- `lesson-asset-generator/src/module-parser.js` — Parser für das Module-Format
- `lesson-asset-generator/src/format-detector.js` — erkennt das Format automatisch
- `lesson-asset-generator/src/normalize-lesson.js` — vereinheitlicht das Schema
- `lesson-asset-generator/src/pipeline.js` — `parseAuto`, `runPipelineForModule`; im Repo zusätzlich u. a. `computeModuleDirectTimeline` für Modul-Timings
- `lesson-asset-generator/src/section-mapper.js` — `mapDirectSlides` und `mapLegacySections`
- `lesson-asset-generator/src/cli.js` — Flag `--all-lessons` für Modul-Batch

## CLI-Nutzung

Legacy (Einzeldatei oder Verzeichnis):

```bash
cd lesson-asset-generator
node src/cli.js --input ../lessons/module04-lesson05.md --out ./output --style ../video-style-engine
node src/cli.js --input-dir ../lessons --out ./output --style ../video-style-engine
```

Modul — eine Lektion nach Index:

```bash
node src/cli.js --input ../Module/modul-01-defi-grundlagen-FINAL.md --lesson 3 --out ./output --style ../video-style-engine
```

Modul — **alle** Lektionen:

```bash
node src/cli.js --input ../Module/modul-01-defi-grundlagen-FINAL.md --all-lessons --out ./output --style ../video-style-engine
```

## Tests

```bash
cd lesson-asset-generator
npm test
```

## Abgleich mit dem Video-Agent-Briefing (Ordnernamen)

Im **Monorepo** heißen manche Pfade anders als im generischen Briefing:

| Briefing | DeFi-Academy-Repo |
|----------|-------------------|
| `brand-system/` | `brand/` (Farben/Typo; `sync-to-theme.js` → `video-style-engine/theme.json`) |
| `video-style-engine/` | `video-style-engine/` (gleich) |
| `lesson-asset-generator/` | `lesson-asset-generator/` (gleich) |
| `video-renderer/` | `video-renderer/` (gleich) |
| `pipeline-test/` (SVG+ffmpeg) | **nicht** im Repo — optional separat |

## Bekannte Einschränkungen

Die alte keyword-basierte Heuristik (`SECTION_KEYWORDS`) in `mapLegacySections`
existiert weiterhin als Fallback. Sie wird nur aufgerufen, wenn ein
Lesson-Objekt keine strukturierten `slides[]` hat — was nach der
Normalisierung in der Regel nicht der Fall ist. Die Legacy-Heuristik bleibt
als Sicherheitsnetz, kann in einer späteren Aufräum-Runde entfernt werden.
