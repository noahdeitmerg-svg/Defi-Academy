# Offene Aufgaben

> Lebendes Backlog für die DeFi-Academy-Pipeline. Nach jedem Prompt
> aktualisiert: neue offene Punkte werden hinzugefügt, erledigte werden
> mit Commit-Hash abgehakt. Priorität grob absteigend.

## Legende

- 🔴 blockiert: muss vor der nächsten Phase erledigt sein
- 🟡 wichtig: sollte bald gemacht werden, blockiert aber nichts
- 🟢 nice-to-have / Qualität / Doku

---

## Pipeline-Infrastruktur (Video-Produktion)

### 🔴 Doppel-Ordnerstruktur der drei Tool-Packages flachdrücken

Die drei neuen Tool-Ordner sind doppelt geschachtelt:

- `lesson-asset-generator/lesson-asset-generator/...`
- `video-renderer/video-renderer/...`
- `video-style-engine/video-style-engine/...`

Wirkt wie ein ZIP-Entpack-Artefakt. Solange das so bleibt, müssen alle Skripte
diese Verdopplung mitziehen (siehe `scripts/validate-lessons.js`,
`GENERATOR_OUTPUT_DIR`). Abhängigkeit: vor Phase 5.4 (Platform Integration).

**Plan**: Inhalte je Tool eine Ebene nach oben ziehen, innere leere Ordner
entfernen, Pfade in Skripten und Docs angleichen.

### 🔴 Validator als Hard-Gate in `render-batch.js`

Der Pre-Render-Validator (`npm run validate-lessons`) ist aktuell nur per
Doku als Pflicht-Schritt dokumentiert. Sobald die Doppel-Ordnerstruktur
flach ist, soll `video-renderer/render-batch.js` den Validator selbst
aufrufen und bei Exit-Code ≠ 0 abbrechen.

### 🟡 Namens-Brücke Renderer-Output → Plattform-Konvention (Phase 5.4)

Renderer schreibt `videos/module04-lesson02.mp4`, die Plattform erwartet
`public/videos/<moduleSlug>-<lessonSlug>.mp4` (z. B.
`smart-contracts-uniswap-amm.mp4`). Entscheidung offen:

1. Post-Render-Rename-Step im Renderer (bevorzugt), oder
2. Symlink/Alias-Layer in `lib/lessonAssets.ts`, der beide Konventionen
   akzeptiert.

### 🟡 Voice-Produktion (ElevenLabs) als Pipeline-Schritt

`audio_track.file` verweist auf `moduleXX-lessonYY_voice.mp3` — der
ElevenLabs-Aufruf ist bisher manuell. Pipeline-Skript (oder
Render-Hook), das aus `voice_script.txt` direkt MP3 erzeugt, fehlt.

### 🟡 Batch-Render aller Lektionen End-to-End

Sobald die Punkte oben erledigt sind: kompletter Lauf
Lektion → Generator → Voice → Renderer → Plattform für alle Module.
Aktuell nur Example `module04-lesson02` durchgespielt.

---

## Content-Qualität

### 🟡 Example-Lektion `module04-lesson02` hat Pflichtverletzungen

Validator findet aktuell:

- Slide Summary: 14 Bullets (erlaubt 6–7)
- Visual Suggestions: kein „Concept Visual"-Keyword

Das ist die gelieferte Vorlage des Content-Generators. Entweder:

1. Content-Agent-Prompt verschärfen, sodass er diese Grenzen einhält, oder
2. Example neu schreiben, damit er als Referenz dient.

### 🟡 Duration-Schätzung aus Source-Narration zu niedrig

Der Validator schätzt aus der Markdown-`Voice Narration Script`-Sektion
ca. 100 s, der Generator-Output hat danach 474 s. Differenz kommt aus
Pausen + narrativer Expansion. Zwei Optionen:

1. Heuristik im Validator schärfen (Wörter × Pausen-Faktor anpassen), oder
2. Validator ohne `video_config.json` nur als Soft-Warn akzeptieren, solange
   der Generator als Ground Truth gilt.

### 🟡 Line-Endings Content-Modules

Git meldet ~53 Files als modifiziert, Inhalt identisch (CRLF/LF-Drift).
Wird bei jedem Checkout wieder aufpoppen. Optionen:

1. `.gitattributes` mit `* text=auto eol=lf` und einmal `git add --renormalize .`,
2. oder lokal `core.autocrlf=input`.

Aktuell: Drift ignoriert (keine Inhaltsdifferenz). Keine Priorität.

---

## Plattform

### 🟢 Auto-Import-Workflow gegen WIP-Module abgesichert

Der `validate:content`-Step ist auf `warn` für fehlendes `quiz.json` /
`meta.json` gestellt. WIP-Module blockieren die CI damit nicht mehr.
Sollte nach Fertigstellung aller Module auf `error` zurückgestuft werden.

### 🟢 Video-Hero-Komponente getestet

`components/LessonVideoHero.tsx` rendert korrekt bei vorhandenem Asset,
ist aber noch nie gegen ein echtes gerendertes Video gelaufen (weil
Rename-Brücke fehlt).

---

## Erledigt

- ✅ `feat(pipeline): add pre-render lesson validator` — `7f5ee8a`
- ✅ `scripts/validate-lessons.js` mit 6 Checks + Custom-Schema-Validator
- ✅ `video_config.schema.json`: `module.title` und
  `visual_timing[].reference` auf `["string", "null"]` gelockert
  (Schema-Drift behoben)
- ✅ Optionales Lesson-Video-Asset-System (`lib/lessonAssets.ts`,
  `components/LessonVideoHero.tsx`, `lib/assetPath.ts`)
- ✅ Content-Validator mit Severity `error`/`warn`
- ✅ `docs/defi_academy_system.md` um Video-Produktionspipeline,
  Pre-Render-Validator und Phase-5-Roadmap erweitert
