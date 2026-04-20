# Roadmap: Video-Batch (Module 4–17)

Kurzliste **vor** dem massenhaften Rendern der restlichen Module. Gesamt-Kontext: [`docs/AGENTEN-HANDBUCH.md`](./AGENTEN-HANDBUCH.md) §7.

## Erledigt

- [x] Tabellen-Bug (3 Spalten CeFi vs. DeFi) in `brand/slide-helpers.js` + Test `pipeline-test/tests/table-rendering.test.js`
- [x] **Modul 1** — alle 6 Lektionen als MP4 auf `main` (Batch); **1.1** danach noch einmal wegen Tabellen-Fix (`module1-1-1.mp4` + Dauer `module1/1-1`)
- [x] **Modul 2** — 6 Lektionen, `public/videos/module2-2-1` … `module2-2-6`, Dauer-Keys `module2/2-1` … `2-6` (Commit `e3b0dbd`)
- [x] **Modul 3** — 6 Lektionen, `public/videos/module3-3-1` … `module3-3-6`, Dauer-Keys `module3/3-1` … `3-6` (Commit `21d01ef`)
- [x] Stichprobe **Video 1.1** Slide 4 (CeFi vs. DeFi) im Live-Player — bestätigt
- [x] **`npm run validate:content`** — durchgelaufen (Warnung Modul 16 Quiz optional)
- [x] **`GITHUB_PAGES=true npm run build`** — lokal durchgelaufen

## Vor dem Groß-Rollout (Module 4–17)

1. **Kosten/Zeit** — pro Modul `npm run videos:module -- --module N --live`; nicht alle Module ohne Budget-Check hintereinander.
2. **Modul 16 Quiz** — `quiz.json` oder `open-quiz.md` ergänzen, falls Quiz-Tab erscheinen soll.
3. Nach großen Änderungen an `Module/*-FINAL.md`: ggf. **Auto-Import** + Content-Validierung erneut fahren.

## Nach jedem Modul

- `npm run videos:module -- --module N --live` **oder** manuell `publish-videos` + Dauer-JSON + Push auf `main` (Pages-Deploy).
