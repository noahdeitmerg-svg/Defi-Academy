# DeFi Academy -- Systemdokument

> **Kernregel Video-Pipeline (gilt fuer alle Agents ab 2026-04-17):**
> Gamma generiert **nur Einzel-Visuals** (Diagramme, Illustrationen,
> Charts), gespeichert als `assets-input/<lesson>/visual01.png`,
> `visual02.png`, …. Das **Slide-Layout** (Titel, Bullets, Farben,
> Fonts, Animationen, Footer) wird **ausschliesslich** vom Remotion-
> Template `video-style-engine/slide-template.jsx` gerendert. Kein
> Gamma-Deck, keine Slide-Frames aus PDF-Export, keine `slideNN.png`
> als Render-Input. Details: [`docs/SLIDE_GENERATION_RULES.md`](./SLIDE_GENERATION_RULES.md).

> **Terminologie-Regel (ab 2026-04-17):**
> Das Wort *Curriculum* wird in der DeFi Akademie nicht mehr verwendet.
> Verbindliche Begriffe:
>
> - Curriculum → **Lernprogramm**
> - Course Curriculum → **DeFi Akademie**
> - Curriculum Structure → **Akademie-Struktur**
> - Curriculum Modules → **Module**
> - Curriculum Lessons → **Lektionen**
>
> Hierarchie: **DeFi Akademie → Module → Lektionen → Videos / Quiz /
> Praxisuebungen**. Vollstaendige Definition:
> [`docs/academy-structure.md`](./academy-structure.md). Code-Symbole
> (`resolveFlatCurriculumRoot`, `lib/curriculumConfig.ts`) und die
> Env-Variable `DEFI_CURRICULUM_PATH` bleiben aus Kompatibilitaets-
> gruenden unveraendert — sie sind nicht Nutzer-sichtbar.

## 1. Projektübersicht

DeFi Academy ist eine strukturierte Lernplattform für dezentrale
Finanzsysteme (DeFi). Ziel ist es, eine umfassende Schulung zu
entwickeln, die Menschen ohne Vorkenntnisse Schritt für Schritt zu einem
tiefen Verständnis von DeFi führt.

Der Kurs beginnt bei den Grundlagen von Blockchain und Wallets und führt
über dezentrale Börsen, Lending-Protokolle und Liquidationsmechaniken
bis hin zu fortgeschrittenen DeFi-Strategien.

Die Plattform soll langfristig folgende Komponenten enthalten:

-   strukturierte Lernmodule
-   eine Online-Kursplattform
-   Video-Lektionen
-   interaktive Übungen
-   SEO-Artikel
-   automatisierte Content-Generierung

Alle Inhalte werden zuerst auf **Deutsch** erstellt.

------------------------------------------------------------------------

## 2. Projektziel

Eine hochwertige DeFi-Schulung zu schaffen, die:

-   technisch korrekt
-   didaktisch verständlich
-   strategisch fundiert
-   langfristig relevant

ist.

Der Fokus liegt auf:

-   Mechanik
-   Kapitalflüsse
-   Risiken
-   nachhaltige Strategien

------------------------------------------------------------------------

## 3. Didaktische Philosophie

Der Kurs basiert auf vier Kernkompetenzen professioneller
DeFi-Analysten:

1.  Liquidity Reading
2.  Interest Rate Understanding
3.  Liquidation Mechanics
4.  Capital Flow Analysis

Der Kurs führt durch drei Ebenen:

### Ebene 1 -- Grundlagen

-   Blockchain
-   Wallets
-   Transaktionen
-   DEX Grundlagen

### Ebene 2 -- Protokollmechaniken

-   Liquidity Pools
-   AMM Modelle
-   Lending Markets
-   Collateral
-   Liquidations

### Ebene 3 -- Strategien

-   Yield Strategien
-   Leverage Loops
-   Delta-Neutral Strategien
-   Portfolio Struktur

------------------------------------------------------------------------

## 4. Standardstruktur jeder Lektion

Jede Lektion muss exakt folgende Struktur haben:

Lesson Title\
Learning Objectives\
Explanation\
Slide Summary\
Voice Narration Script\
Visual Suggestions\
Exercise\
Quiz

Diese Struktur ermöglicht automatische Generierung von:

-   Website Lessons
-   Slides
-   Videos
-   Übungen
-   Quizfragen

------------------------------------------------------------------------

## 5. Sprache

Projektstandard:

Alle Inhalte werden **auf Deutsch** erstellt.

Dies betrifft:

-   Module
-   Website
-   Videos
-   Artikel
-   UX Texte

------------------------------------------------------------------------

## 6. Agentenstruktur

Das Projekt nutzt spezialisierte KI-Agenten.

### Operating Brain

Koordiniert das gesamte Projekt.

Aufgaben:

-   Roadmap überwachen
-   Agenten koordinieren
-   Qualitätsprüfung
-   Projektstruktur definieren

------------------------------------------------------------------------

### Content Agent

Erstellt die Kursmodule.

Output: Markdown Module.

Struktur jeder Lektion:

Lesson Title\
Learning Objectives\
Explanation\
Slide Summary\
Voice Narration Script\
Visual Suggestions\
Exercise\
Quiz

Regeln:

-   technisch korrekt
-   klare Sprache
-   kein Marketing-Hype
-   Fokus auf Mechanik

------------------------------------------------------------------------

### Video Agent

Transformiert approved Module in Video-Produktions-Assets und steuert die Render-Pipeline.

Pipeline: `lesson.md → Lesson Asset Generator → Video Style Engine → Video Renderer → MP4 + Poster`.

Output pro Lektion (aus `lesson-asset-generator/`):

-   `slides_prompt.txt` — Gamma-Prompt mit 6–7 Slide-Definitionen
-   `voice_script.txt` — ElevenLabs-Skript (DE, educational), inkl. `<break>`, `<emphasis>`, phonetische Akronyme (`AMM [A-M-M]` etc.)
-   `visual_plan.json` — Diagramme, Screenshots, Animation-Cues
-   `video_config.json` — Remotion-Master (Dauer, Sektionen, Timing, Audio-Track, Asset-Pfade)

Output pro Lektion (aus `video-renderer/`):

-   `videos/moduleXX-lessonYY.mp4` (H.264, 1920×1080, 30 fps, CRF 18)
-   `posters/moduleXX-lessonYY.jpg` (Frame bei Sekunde 15)

Video-Struktur (9 Sektionen, fix):

1.  Intro · 2. Lesson Title · 3. Concept · 4. Mechanism · 5. System Architecture · 6. Risk Layer (roter Akzent) · 7. Protocol Example · 8. Key Takeaways · 9. Outro

Zielzeit: **~8 Minuten** (gültig: 5–10 min).

Regeln:

-   Der Video Agent verändert **keine Lerninhalte**. Er verteilt Bullets auf Sektionen, ergänzt Pausen-/Betonungsmarker, füllt fehlende Visuals mit Defaults.
-   Learning Objectives, Explanation, Exercise, Quiz gehören **nicht** ins Video — sie bleiben auf der Lesson Page.
-   Dateinamen-Konvention der Pipeline: `moduleXX-lessonYY` (Zero-Padded). Platform-Erkennung erwartet `<moduleSlug>-<lessonSlug>` (z. B. `module4-4-2`) → siehe §11 Video-Produktionspipeline, Integrationspunkt 5.4.

------------------------------------------------------------------------

### UX Agent

Gestaltet die Lernplattform.

Verantwortung:

-   Plattformstruktur
-   Navigation
-   Landingpage
-   Kursdashboard
-   Paywall Struktur

------------------------------------------------------------------------

### Growth Agent

Erstellt Inhalte für Reichweite.

Output:

-   SEO Artikel
-   Threads
-   Newsletter

Basis: Kursmodule.

------------------------------------------------------------------------

### Build Agent

Baut und betreibt die Plattform.

Tools:

-   Cursor (Editor + AI-Agent)
-   GitHub (Source of Truth + CI/CD)
-   GitHub Pages (statisches Hosting)
-   GitHub Actions (Auto-Import + Deploy)

Implementiert:

-   Website (Next.js App Router, statischer Export)
-   Lesson Rendering (MDX über `next-mdx-remote`)
-   Parser (Markdown → strukturierte Sections: Explanation / Slide Summary / Voice Narration / Visual Suggestions / Exercise / Quiz)
-   Automatischer Content-Import (Module/*.md → content/modules/ via GitHub Actions)
-   Deployment (Static Export → GitHub Pages, getriggert per Push **oder** Webhook)
-   Auto-Detection fertiger Video-Assets pro Lektion (`public/videos/<slug>.mp4`) inkl. basePath-aware Hero-Player

------------------------------------------------------------------------

## 7. Plattformstruktur

Die Plattform umfasst:

-   Landing Page
-   Course Dashboard
-   Module Übersicht
-   Lesson Pages
-   Übungen
-   Quiz
-   Fortschrittsanzeige

------------------------------------------------------------------------

## 8. Monetarisierungsstruktur

Free Tier:

Module 1--3

Pro Tier:

Vollständiger Kurs

Geplantes Modell:

49 \$ pro Monat

------------------------------------------------------------------------

## 9. Roadmap

Phase 1 -- Kursmodule erstellen (laufend, Modul 1-12 + 13A live; 13B-17 in Produktion)\
Phase 2 -- Plattformstruktur definieren ✅\
Phase 3 -- Website bauen ✅ (Next.js auf GitHub Pages live)\
Phase 4 -- Stabilität & Content-Pipeline-Automation ✅ (Auto-Import, Webhook-Deploy, Content-Validator, MDX-Safety)\
Phase 5 -- Video Pipeline 🚧\
&nbsp;&nbsp;5.1 Video Style Engine ✅ (Theme, 9 Sektionen, Slide-Template, Intro/Outro, Animation-Regeln)\
&nbsp;&nbsp;5.2 Lesson Asset Generator ✅ (Markdown → `slides_prompt.txt` + `voice_script.txt` + `visual_plan.json` + `video_config.json`)\
&nbsp;&nbsp;5.3 Video Rendering Pipeline ✅ (Remotion, Batch-Runner, Preflight, H.264 1920×1080 30 fps)\
&nbsp;&nbsp;5.4 Platform Integration 🚧 (Dateinamens-Konvention `moduleXX-lessonYY` ↔ `<moduleSlug>-<lessonSlug>` angleichen; Asset-Auto-Detection bereits live)\
&nbsp;&nbsp;5.5 Voice Production (ElevenLabs) — bereit, läuft pro Lektion\
&nbsp;&nbsp;5.6 Batch-Produktion aller Lektionen\
Phase 6 -- Quiz-Statistik + Suche\
Phase 7 -- Growth System

------------------------------------------------------------------------

## 10. Workflow

### Content-Produktion

Content Agent → erstellt Modul als `Module/modul-NN-*.md`\
Operating Brain → prüft Qualität\
Push auf `main` → Auto-Import-Workflow normalisiert nach `content/modules/` → Deploy\
UX Agent → Plattformstruktur\
Build Agent → Website\
Video Agent → Videos (Phase 5)\
Growth Agent → Traffic (Phase 7)

### Operativer Fluss (vollautomatisch)

1.  Datei `Module/modul-NN-*.md` landet auf `main`
2.  Workflow `Auto-Import Akademie-Inhalte` parst und committet nach `content/modules/` zurück
3.  Workflow feuert `repository_dispatch: pages-deploy`
4.  Workflow `Deploy Next.js site to Pages` validiert Content, baut Next-Export, veröffentlicht auf GitHub Pages
5.  Live in ca. 2 Minuten unter `https://noahdeitmerg-svg.github.io/Defi-Academy/`

Zusätzliche Trigger ohne Git-Push:\
`scripts/trigger-pages-deploy.ps1` / `.sh` oder SaaS-Webhook (Make / n8n / Zapier).

### Video-Produktion (semi-automatisiert, pro Lektion)

1.  Approved Lektion `Module/modul-NN-*.md` liegt vor
2.  `lesson-asset-generator/src/cli.js --input ... --out ./output --style ../video-style-engine` erzeugt 4 Asset-Dateien
3.  `slides_prompt.txt` → in Gamma einspielen → Slide-Bilder
4.  `voice_script.txt` → ElevenLabs-Render → `voice.mp3`
5.  Externe Visuals (Diagramme, Screenshots) nach `video-renderer/assets-input/moduleXX-lessonYY/visuals/` legen
6.  `video-renderer/scripts/preflight-check.js` verifiziert Inputs (Exit 0 = Go)
7.  `video-renderer/src/render-lesson.js` (oder `render-batch.js --parallel 2`) erzeugt MP4 + Poster
8.  MP4 umbenennen auf Plattform-Konvention und nach `public/videos/` + `public/posters/` kopieren — siehe §11 Video-Produktionspipeline
9.  `git push` → Auto-Import-Pfad reicht nicht (Videos stehen in `public/`, nicht in `Module/`), also direkt Deploy via Push oder Webhook
10.  Plattform erkennt Video automatisch (kein Code-Change pro Lektion)

------------------------------------------------------------------------

## 11. Betrieb & Infrastruktur

### Deployment

-   Hosting: GitHub Pages (statischer Next-Export, `output: "export"`)
-   Trigger: Push auf `main`, `workflow_dispatch`, `repository_dispatch: pages-deploy`
-   Environment-Variable im Build: `NEXT_PUBLIC_SITE_URL` (= Pages-URL) für korrekte `metadataBase`
-   Basispfad unter `/Defi-Academy/` (ergibt sich aus dem Repo-Namen)

### Content-Pipeline

-   Rohquelle: `Module/modul-NN-*.md` (deutsche Kurssprache, 6 Lektionen + Modul-Abschluss-Quiz)
-   Parser:
    -   `lib/splitCursorModule.ts` trennt Modul in Lektionen
    -   `lib/lessonSectionParser.ts` erkennt die 6 Pflicht-Sektionen (Explanation, Slide Summary, Voice Narration Script, Visual Suggestions, Exercise, Quiz) in deutscher und englischer Schreibweise
    -   `lib/parseLesson.ts` baut aus den Sections das `ParsedLesson`-Objekt
    -   `lib/mdxSafe.ts` maskiert Prosa-`<` (z. B. `<$10k`, `<1 Jahr`), damit MDX sie nicht als JSX interpretiert
-   Normalisiertes Ziel: `content/modules/moduleN/` mit `meta.json`, `N-1.md` … `N-6.md`, und `quiz.json` (MC) **oder** `open-quiz.md` (Freitext)
-   Sanity-Check: `npm run validate:content` (läuft lokal via `npm run check` und in CI)
    -   **errors** (blocken CI): Pflichtabschnitte in Lessons fehlen, keine Lessons im Modulordner
    -   **warnings** (CI grün): kein `quiz.json`/`open-quiz.md` (Quiz-Tab wird im Frontend ausgeblendet), kein `meta.json` (Slug als Titel-Fallback)
    -   → Work-in-Progress-Module mit nur Teil-A-Content blockieren die Pipeline nicht

### Video- und Poster-Assets auf der Plattform (Auto-Detection)

-   Ablage: `public/videos/<moduleSlug>-<lessonSlug>.mp4`, optional `public/posters/<moduleSlug>-<lessonSlug>.jpg`
-   Beispiel: Lektion `/module/module6/lesson/6-3` sucht `public/videos/module6-6-3.mp4`
-   Erkennung: `lib/lessonAssets.ts::resolveLessonVideo` zur Build-Zeit (Server Component)
-   Rendering: `components/LessonVideoHero.tsx` als HTML5-`<video controls>` mit `aspect-video`, `preload="metadata"`, `playsInline`, basePath-aware via `lib/assetPath.ts::withBasePath`
-   Layout: Hero-Player erscheint **oberhalb der Tabs**, direkt unter dem Titel
-   Fallback: Fehlt die Datei, rendert die Lesson ohne Player. Kein Code-Change pro Lektion nötig.
-   Quelle der MP4s: Video-Produktionspipeline (siehe nächste Sektion). Bis zur Rename-Brücke (Phase 5.4) müssen Renderer-Outputs vor dem Commit manuell von `module04-lesson02.mp4` auf `module4-4-2.mp4` umbenannt werden.

### Video-Produktionspipeline

Drei voneinander unabhängige Komponenten im Repo-Root. Jede hat eine scharfe Rolle, sie sind über Dateiverträge gekoppelt — nicht über Code-Imports.

| Komponente | Rolle | Schlüssel-Input | Schlüssel-Output |
|---|---|---|---|
| `video-style-engine/` | Design-System + Remotion-Templates | `theme.json`, `visual-timing.json`, `animation-rules.json`, `slide-template.jsx`, `intro-scene.jsx`, `outro-scene.jsx` | wird vom Renderer gespiegelt |
| `lesson-asset-generator/` | Markdown → 4 Prod-Assets | `lesson.md` | `slides_prompt.txt`, `voice_script.txt`, `visual_plan.json`, `video_config.json` |
| `video-renderer/` | Remotion-Bundle + Batch-Runner | Generator-Output + `assets-input/moduleXX-lessonYY/{voice.mp3,visuals/*}` | `videos/moduleXX-lessonYY.mp4`, `posters/moduleXX-lessonYY.jpg` |

**Video-Struktur (9 Sektionen, fix, definiert in `visual-timing.json`):**

Intro → Lesson Title → Concept → Mechanism → System Architecture → Risk Layer (roter Akzent `#D9544E`) → Protocol Example → Key Takeaways → Outro. Zielzeit ~8 min (5–10).

**Design-System (aus `video-style-engine/theme.json`):**

-   Farben: BG `#0B0F14`, Karten `#151C26`, Primär-Akzent `#4F8BFF`, Erfolg `#35C08A`, Warn `#E0A94A`, Risk `#D9544E`
-   Font: Inter (400/500/600/700); Titel 64 px / 600, Body 26 px / 400
-   Animationen: nur Fade + leichter Rise/Slide, Cross-Fade; respektiert `prefers-reduced-motion`
-   Verboten: Bouncing, Spinning, Partikel, 3D-Flips, Rainbow-Gradienten

**Kommandos (lokal, noch nicht in CI):**

```bash
# 1. Assets für eine Lektion generieren
cd lesson-asset-generator
node src/cli.js --input examples/module04-lesson02.md --out ./output --style ../video-style-engine

# 2. Renderer initial einmal spiegeln
cd ../video-renderer
node scripts/setup.js
npm install

# 3. Pre-Render-Validierung (pflicht vor Batch-Render, siehe unten)
cd ..
npm run validate-lessons

# 4. Preflight auf Asset-Ebene (Voice + Visuals)
cd video-renderer
node scripts/preflight-check.js --lessons ../lesson-asset-generator/examples --assets ./assets-input

# 5. Einzel-Render (MP4 + Poster)
node src/render-lesson.js \
  --lesson-id      module04-lesson02 \
  --generator      ../lesson-asset-generator/output \
  --assets         ./assets-input \
  --markdown       ../lesson-asset-generator/examples/module04-lesson02.md \
  --output-video   ./output/videos/module04-lesson02.mp4 \
  --output-poster  ./output/posters/module04-lesson02.jpg

# 6. Batch-Render aller Lektionen
node src/render-batch.js --generator ../lesson-asset-generator/output \
  --lessons ./lessons --assets ./assets-input --output ./output --parallel 2
```

**Pilot-Render — `npm run pilot-render`**

Bevor die volle Batch-Produktion angestoßen wird, prüft ein Pilot-Lauf die Pipeline gegen einen kleinen Satz Lektionen. Default-Set: `module01-lesson01`, `module02-lesson01`, `module04-lesson02`, `module06-lesson03`, `module09-lesson01`. Override via `--lessons module01-lesson01,module03-lesson02`.

Unterschiede zum Master-Orchestrator:

- Generator läuft **pro Lektion** (`--input <file>`), nicht als Batch über `lessons/`.
- Fehlt `voice.mp3` für eine Lektion, wird die Lektion **aus dem Render ausgeschlossen** (Log: `Voice missing – skipping render`). Override: `--allow-missing-voice`.
- `--parallel 1` per Default (bewusst konservativ für Pilot-Timing-Checks).
- Ausgabe in dedizierten Unterordnern: `videos/pilot/moduleXX-lessonYY.mp4`, `posters/pilot/moduleXX-lessonYY.jpg`.
- Logs in `logs/pilot-render.log` + `logs/pilot-render-batch-report.json`.

```bash
npm run pilot-render
node scripts/pilot-render.js --lessons module01-lesson01,module04-lesson02
node scripts/pilot-render.js --allow-missing-voice
```

**Einfache Variante — Master-Orchestrator `npm run render-course`**

Die Schritte 1–6 oben sind auch in einem einzigen Skript verdrahtet:
`scripts/render-course.js`. Es kettet Validate → Generate → Slides (Gamma) →
Voice (ElevenLabs) → Visuals → Render-Batch und bricht bei Validate-/Generate-
Fehlern hart ab. Per-Lektions-Fehler in Schritten 3–5 werden geloggt, nicht
propagiert — die Lektion wird dann degraded gerendert (Renderer nutzt
Platzhalter).

```bash
npm run render-course                              # Defaults: lessons/, generator-output/, assets-input/, parallel=2
node scripts/render-course.js --dry-run            # keine externen API-Aufrufe, nur Stubs
node scripts/render-course.js --only module04-lesson02
node scripts/render-course.js --skip-render        # nur Assets vorbereiten
```

Logs: `logs/render-course.log` + `logs/render-course-report.json`.

**Stabilitäts-Variante — Top-Level-Batch `npm run render:course` / `npm run render:pilot`**

Für die echte Vollproduktion (100+ Lektionen) gibt es `scripts/render-batch.js`. Anders als `render-course.js` (das die komplette Pipeline inkl. externer APIs orchestriert) macht dieses Skript **nur das Rendering** — dafür aber maximal **crash-tolerant** durch Chunk-Isolation. Die Lektionsliste wird in Chunks (Default 10) partitioniert, pro Chunk wird ein eigener Node-Child-Prozess mit dem bestehenden Renderer (`video-renderer/.../src/render-batch.js`) gespawnt. Ein OOM oder unhandled Error in Chunk N kostet maximal diesen Chunk — die restlichen Chunks laufen weiter.

Namenskollision: Es gibt zwei Dateien mit dem Namen `render-batch.js`:

- `scripts/render-batch.js` — **Top-Level-Orchestrator** (neu, diese Sektion).
- `video-renderer/src/render-batch.js` — **Remotion-Engine** (bestehend), rendert Lektionen in-process. Wird vom Top-Level-Skript pro Chunk als Child gestartet.

Pipeline-Schritte:

1. **Preflight je Lektion**: `voice.mp3` (in `assets-input/<id>/`), `visual_plan.json` + `video_config.json` (in `generator-output/<id>/`). Fehlt etwas → Warnung, Lektion wird übersprungen, Eintrag in `logs/render-errors.log`.
2. **Idempotenz**: Lektionen mit bestehendem `videos/<id>.mp4` werden übersprungen. `--force` erzwingt Neurender.
3. **Chunk-Bildung**: Default `--chunk-size 10`.
4. **Pro Chunk**: Spawn des Renderer-Children mit `--parallel N` (Default 2) intra-Chunk-Parallelität. Output in `.render-batch-tmp/`.
5. **Output-Umzug**: Nach Chunk-Ende werden `videos/<id>.mp4` und `posters/<id>.jpg` aus dem Scratch-Dir an die finalen Plätze verschoben.
6. **Crash-Recovery**: Bei Chunk-Exit ≠ 0 werden die nicht erzeugten MP4s als Failure markiert, dann weiter mit dem nächsten Chunk.
7. **Progress**: Live-Parsing der Child-stdout erzeugt am Parent Zeilen wie `Rendering module01-lesson01` und `Completed 17 / 102`.
8. **Report**: `logs/render-batch-report.json` (Gesamt-Counts, Chunk-Results, Fehlerliste, Preflight-Missings).

```bash
npm run render:course              # alle Lektionen, --parallel 2, Chunks à 10
npm run render:pilot               # erste 5 Lektionen, --parallel 1 (numerischer Smoke-Test)
node scripts/render-batch.js --only module04-lesson02,module06-lesson03
node scripts/render-batch.js --chunk-size 5 --force
```

Exit-Code-Semantik: `0`, sobald **mindestens eine** Lektion erfolgreich gerendert wurde; `1` nur wenn nichts produziert werden konnte (z. B. Generator-Output fehlt komplett oder alle Preflights blockieren). Per-Lektions-Fehler führen **nicht** zu Exit 1 — der Batch ist per Design fehlertolerant.

Abgrenzung zu den drei anderen Render-Einstiegspunkten:

| Kommando | Rolle | Output |
|---|---|---|
| `npm run pilot-render` | Semantischer Pilot (5 feste IDs, volle Pipeline inkl. Voice-Gen) | `videos/pilot/` |
| `npm run render:pilot` | Numerischer Smoke-Test (erste 5 aus generator-output, nur Render) | `videos/` |
| `npm run render:course` | Vollproduktion, nur Render (externe Assets müssen fertig sein) | `videos/` |
| `npm run render-course` | Vollproduktion, **orchestriert externe APIs** (Gamma/ElevenLabs/Visuals) und ruft dann intern den Renderer | `videos/` |

Typischer 100+-Lesson-Workflow: einmal `npm run render-course` für Asset-Vorbereitung laufen lassen, dann `npm run render:course` für das stabile, wiederholbare Rendering mit Crash-Isolation.

Externe APIs via Env:

| Variable | Wirkung |
|---|---|
| `GAMMA_API_KEY` | ohne Key: `slides.json` wird als Stub mit `_stub: true` geschrieben, `slides_prompt.txt` zum manuellen Gamma-Import gespiegelt |
| `GAMMA_API_URL` | override, default `https://api.gamma.app/v1/generations` |
| `ELEVENLABS_API_KEY` | ohne Key: `voice.mp3`-Schritt wird übersprungen (Renderer produziert dann Video ohne Tonspur) |
| `ELEVENLABS_VOICE_ID` | realer Voice-ID-Fallback, wenn logische ID aus `video_config.audio_track.voice_id` nicht aufgelöst werden kann |
| `ELEVENLABS_MODEL_ID` | default `eleven_multilingual_v2` |

**Pre-Render-Validator (`scripts/validate-lessons.js`)**

Pflicht-Gatekeeper vor jedem Batch-Render. Prüft jede Lektion in `lessons/` gegen die Regeln, die ein erfolgreicher Renderer-Lauf voraussetzt. Wenn hier ein `✖` kommt, bricht der Renderer sicher später ab.

Aufruf: `npm run validate-lessons` (Exit 1 = mindestens ein Problem, Exit 0 = alles clear).

Checks pro Lektion:

| # | Check | Erwartung |
|---|---|---|
| 1 | Section Presence | 8 Pflicht-Sektionen (DE/EN-Alias): Lesson Title, Learning Objectives, Explanation, Slide Summary, Voice Narration Script, Visual Suggestions, Exercise, Quiz |
| 2 | Slide Count | `Slide Summary` hat 6–7 Bullets |
| 3 | Visual Requirements | mind. 1 Diagramm-Keyword, 1 Protocol-Example (Protokoll oder Protokollname wie Uniswap/Aave/Curve/…), 1 Concept-Visual |
| 4 | Voice Script Breaks | generierte `voice_script.txt` enthält `<break time="..."/>` |
| 5 | Video Duration Estimate | 300–600 Sekunden (aus `video_config.json::duration_seconds`, fallback: Source-Narration bei 2.5 wps) |
| 6 | JSON Schema | `visual_plan.json` + `video_config.json` gegen die Schemas unter `lesson-asset-generator/schemas/` |

Flags:

-   `--lessons-dir <pfad>` — abweichendes Quellverzeichnis
-   `--generator-output <pfad>` — abweichender Generator-Output
-   `--skip-generated` — Checks 4 + 6 überspringen (nur Source-MD)

Output: `✔ Module X Lesson Y OK` / `✖ Module X Lesson Y <Grund>`, am Ende `All lessons validated successfully.` oder Summary mit Fehlerquote.

**Externe Inputs pro Lektion (manuell geliefert):**

-   `voice.mp3` — aus ElevenLabs auf Basis von `voice_script.txt`
-   `visuals/vNN.png` — aus Gamma (Slides) + Screenshots / Diagrammen gemäß `visual_plan.json`

Fehlende Visuals werden als didaktischer Platzhalter gerendert — das Video bleibt rendertauglich, wirkt aber provisorisch.

**Encoding (zentral in `video-renderer/remotion.config.ts`):**

-   H.264 (`x264`) / MP4 / 1920×1080 / 30 fps / `yuv420p` / CRF 18
-   Poster: JPG Quality 90, Frame bei Sekunde 15

**Protokoll-Erkennung (konservativ):**

Nur echte Referenzen (Uniswap, Aave, Curve, Maker) triggern `source_protocol`. `Bonding-Curve`, `Risk-Curve` etc. liefern `source_protocol: null`. Kein falsches Attributieren.

**Offener Integrationspunkt (Phase 5.4):**

Renderer-Output heißt `module04-lesson02.mp4`, Plattform-Auto-Detection erwartet `module4-4-2.mp4`. Bis zur finalen Brücke drei Optionen:

1.  Renderer um einen `--rename-pattern`-Flag erweitern, der den Plattform-Namen schreibt
2.  Ein kleines Rename-Script (`scripts/rename-rendered-videos.ts`) zwischen Render-Output und `public/videos/`
3.  `lib/lessonAssets.ts::resolveLessonVideo` um alternative Namensmuster erweitern (Fallback auf `moduleXX-lessonYY.mp4`)

Entscheidung steht aus; bis dahin manuell umbenennen beim Commit in `public/videos/`.

**Tests:**

-   `lesson-asset-generator/tests/run-tests.js` prüft Parser, Section-Mapper, JSON-Schemas, Slide-Count, Section-Timing, Visual-Mapping
-   `video-renderer/scripts/dry-run-test.js` validiert Pipeline-Verdrahtung ohne Remotion-Install

**Was die Pipeline bewusst NICHT tut:**

-   Keine Upload-Logik / kein CDN — das macht der Build Agent beim `git push`
-   Keine Closed Captions (später via `@remotion/captions`, wenn ElevenLabs Timing-Tracks liefert)
-   Keine Inhaltsänderungen an Lektionen — Content bleibt Content Agent

### Workflows

| Workflow | Trigger | Zweck |
|---|---|---|
| `.github/workflows/nextjs.yml` | push main, workflow_dispatch, repository_dispatch:pages-deploy | Content validieren, bauen, deployen |
| `.github/workflows/auto-import.yml` | push `Module/**/*.md`, workflow_dispatch, repository_dispatch:content-import | Import → Commit → Deploy-Dispatch |

Beide laufen unter `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24=true` (Pflicht-Opt-in zum 02.06.2026).

### Entwicklungs-Setup (Windows)

-   Auth: SSH (Port 443 via `ssh.github.com`) mit `id_ed25519_defi`, Key im Windows `ssh-agent` (Autostart)
-   Git nutzt das Windows-OpenSSH: `git config --global core.sshCommand "C:/Windows/System32/OpenSSH/ssh.exe"`
-   Remote: `git@github.com:noahdeitmerg-svg/Defi-Academy.git`
-   Pushes von Workflow-Files sind damit direkt aus Cursor möglich (kein PAT-Scope-Problem mehr)

### Dokumente im Repo

-   `README.md` — Einstieg
-   `docs/defi_academy_system.md` — **dieses Dokument**, Single Source of Truth für alle Agenten
-   `docs/BUILD.md` — Build- und Dev-Setup
-   `docs/GITHUB.md` — Git-/GitHub-Basics
-   `docs/GITHUB_PAGES.md` — Deployment-Details, Webhook-Beispiele
-   `docs/OPS_CHECKLIST.md` — Betriebs-/Smoke-Test-Routine
-   `video-style-engine/README.md` — Design-System & Remotion-Templates
-   `lesson-asset-generator/README.md` — Markdown → 4 Video-Prod-Assets
-   `video-renderer/README.md` — Remotion-Pipeline & Batch-Render

### Stand-der-Infrastruktur (Snapshot)

-   ✅ Statischer Next-Export auf GitHub Pages live
-   ✅ Auto-Import von Modul-Markdown → `content/modules/`
-   ✅ Webhook-Rebuild ohne Push (Script + SaaS-tauglich)
-   ✅ Content-Validator in CI
-   ✅ MDX-Safety-Layer (`escapeUnsafeMdxLessThan`)
-   ✅ Node-24-Opt-in für CI-Actions
-   ✅ SSH-Auth mit Agent, direkte Pushes aus Cursor
-   ✅ Video-Asset-Auto-Detection (`public/videos/<slug>.mp4`, Hero-Player, Poster, basePath-aware)
-   ✅ Video Style Engine (Theme, 9 Sektionen, Templates, Animation-Regeln)
-   ✅ Lesson Asset Generator (MD → 4 Prod-Assets, Tests grün)
-   ✅ Video Rendering Pipeline (Remotion, Batch-Runner, Preflight)
-   ✅ Pre-Render-Validator (`scripts/validate-lessons.js` + `npm run validate-lessons`, 6 Checks, Exit 1 = Render-Stop)
-   ✅ Master-Orchestrator `scripts/render-course.js` + `npm run render-course` (Validate → Generate → Slides → Voice → Visuals → Render, Logs in `logs/render-course.log`, Report in `logs/render-course-report.json`, Per-Lesson-Fehler-Tolerance)
-   ✅ Pilot-Renderer `scripts/pilot-render.js` + `npm run pilot-render` (5 Default-Lektionen, Override via `--lessons`, Output in `videos/pilot/` + `posters/pilot/`, `--parallel 1`, Voice-Missing-Skip mit `--allow-missing-voice`-Override)
-   ✅ Top-Level-Batch `scripts/render-batch.js` + `npm run render:course` / `npm run render:pilot` (Chunk-isolation: Default 10 Lektionen/Chunk werden pro Child-Prozess gerendert, OOM/Crash in Chunk N reißt restliche Chunks nicht mit, Preflight für `voice.mp3`+`visual_plan.json`+`video_config.json`, Idempotenz mit `--force`-Override, live Progress `Rendering <id>` / `Completed X / Y`, Fehler-Persistenz in `logs/render-errors.log`, Report in `logs/render-batch-report.json`)
-   ✅ ElevenLabs Voice-Generator `scripts/generate-voice.js` + `npm run generate:voice` (Voice-Name-Resolving via `/v1/voices`, Retry/Backoff, Batching via `--concurrency`, Integration in `pilot-render` als Schritt 2b; Env: `ELEVENLABS_API_KEY`, `ELEVENLABS_MODEL=eleven_turbo_v2`, `ELEVENLABS_VOICE=Florian`, optional `ELEVENLABS_VOICE_ID` / `ELEVENLABS_STABILITY` / `ELEVENLABS_SIMILARITY`)
-   ✅ Gamma Visual-Asset-Slicer `scripts/generate-slides.js` + `npm run generate:slides` (dreistufiger Flow: Gamma Generate API → PDF → lokales Slicing via `pdftoppm` zu **`visual01.png`, `visual02.png`, …**; Slicing-Shortcut wenn bereits `slides.pdf` im Lektionsordner; Manual-Handoff-Fallback ohne API-Key/pdftoppm mit `SLIDES_HANDOFF.md`-Anleitung; Idempotenz + `--force`; eigenes Log `logs/generate-slides.log`). `render:pilot` und `render:course` chainen jetzt `generate:slides && generate:voice && render-batch.js`. **Policy**: Seit `docs/SLIDE_GENERATION_RULES.md` liefert Gamma nur noch Einzel-Visuals, nicht mehr ganze Decks — der `slides_prompt.txt`-Kopf verbietet Slide-Layouts explizit, und der Asset-Resolver mapped `visualNN.png` auf die IDs aus `visual_plan.json`.

**Slides-Pipeline-Dreistufigkeit**

`scripts/generate-slides.js` ist bewusst so gebaut, dass kein einzelnes Scheitern die Lektion blockiert — es gibt drei Pfade, die in Reihenfolge probiert werden:

1. **Vollautomatisch**: `GAMMA_API_KEY` gesetzt + `pdftoppm` verfügbar → POST auf `GAMMA_API_URL` (default `https://public-api.gamma.app/v0.2/generations`), Polling bis `status=completed`, PDF-URL aus der Response extrahieren (mehrere Feldnamen geprobt: `pdfUrl`, `pdf_url`, `exportUrl`, `export.pdfUrl`, `exports.pdf`, `data.pdfUrl`), PDF nach `assets-input/<id>/slides.pdf` laden, mit `pdftoppm -r 150 -png` in `slide01.png`, `slide02.png`, … schneiden. Env-Feintuning via `GAMMA_FORMAT`, `GAMMA_THEME`, `GAMMA_POLL_INTERVAL_MS`, `GAMMA_POLL_TIMEOUT_MS`.
2. **Slicing-Shortcut**: Liegt `assets-input/<id>/slides.pdf` bereits vor (weil z. B. ein Content-Mensch sie manuell aus Gamma runtergezogen hat), wird **kein API-Call** gemacht — das Skript schneidet direkt. Ideal für Fälle, in denen die Beta-API-Quota aufgebraucht ist oder eine Deck-Feinjustierung im Browser nötig war.
3. **Manual-Handoff**: Fehlt `GAMMA_API_KEY` ODER `pdftoppm`, werden `slides_prompt.txt` und ein `SLIDES_HANDOFF.md` mit Step-by-Step-Anleitung in `assets-input/<id>/` geschrieben. Die Lektion erscheint im Status `handoff`. Sobald der User die PDF manuell dort abgelegt hat, produziert der nächste Aufruf PNGs (siehe Pfad 2).

Der **Preflight im Batch-Renderer** fragt nur `voice.mp3`, `visual_plan.json` und `video_config.json` ab — `visual01.png` (oder der alte Name `slide01.png`) wird **nicht** als Hard-Gate geprüft, weil der `VisualRenderer` in der Remotion-Composition für fehlende Visuals einen neutralen Placeholder zeichnet. Das ist eine bewusste Design-Entscheidung: eine Lektion ohne Gamma-Visuals blockiert den Render nicht, die Ausgabe ist dann nur eine Demo-Version mit Platzhalter-Grafiken in der Visual-Area. Wenn das später härter werden soll, reicht ein einzelner Eintrag in der `required`-Liste in `scripts/render-batch.js#preflightLesson`.
-   ✅ `.env.example` als Vorlage für API-Keys (`.env` bleibt gitignored)
-   🚧 Rename-Brücke Renderer-Output → Plattform-Konvention (Phase 5.4)
-   ⏳ Voice-Produktion für alle Lektionen (ElevenLabs, Phase 5.5)
-   ⏳ Batch-Render aller Lektionen (Phase 5.6)
-   ⏳ Quiz-Statistik, Suche (Phase 6)

------------------------------------------------------------------------

## 12. Projektphilosophie

Leitprinzip:

**Tiefe statt Hype.**

Die DeFi Academy vermittelt Wissen, das langfristig relevant bleibt.
