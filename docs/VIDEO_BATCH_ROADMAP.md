# Roadmap: Video-Batch (Module 2–16)

Kurzliste **vor** dem massenhaften Rendern aller Lektionen.

## Erledigt (Stand Test)

- [x] Tabellen-Bug (3 Spalten CeFi vs. DeFi) in `brand/slide-helpers.js` + Test `pipeline-test/tests/table-rendering.test.js`
- [x] Lektion **1.1** neu gerendert, `public/videos/module1-1-1.mp4` + Dauer `module1/1-1` in `lesson-audio-durations.json`

## Vor dem Groß-Rollout empfohlen

1. **Stichprobe Video 1.1** — Slide 4 im Player prüfen (Bullets mit „vs.“).
2. **`npm run validate:content`** — bei grün OK (Modul 16: nur Warnung Quiz optional).
3. **`npm run build`** — einmal mit `GITHUB_PAGES=true` für Pages-parity (optional).
4. **Kosten/Zeit** — pro Modul `npm run videos:module -- --module N` (ElevenLabs + ffmpeg); nicht alle Module parallel ohne Budget-Check.
5. **Modul 16 Quiz** — `quiz.json` oder `open-quiz.md` ergänzen, falls Quiz-Tab erscheinen soll.

## Nach jedem Modul

- `npm run videos:module -- --module N --live` **oder** manuell `publish-videos` + Dauer-JSON + Push auf `main` (Pages-Deploy).
