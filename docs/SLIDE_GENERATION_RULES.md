# Slide-Generation-Rules

**Agenten-Gesamtüberblick:** [`docs/AGENTEN-HANDBUCH.md`](./AGENTEN-HANDBUCH.md)

**Zielgruppe:** Content-Autor:innen, Asset-Produzent:innen, Agents,
Entwickler:innen.

**Geltungsbereich:** Der gesamte DeFi-Academy-Video-Pipeline-Pfad von
`slides_prompt.txt` bis zum gerenderten MP4.

---

## 1. Die eine Regel

> **Gamma generiert Bilder, nicht Slides.**
>
> Das Slide-Layout — Titel, Bullets, Accent-Bar, Module-Label, Footer,
> Slide-Counter, Farben, Typografie — wird **ausschliesslich** vom
> Remotion-Template `video-style-engine/slide-template.jsx` gerendert.

Daraus folgen zwei harte Verbote:

1. **Gamma-Decks werden NICHT direkt im Renderer verwendet.** Kein
   Gamma-Export-PDF-Slicing in `slide01.png` … `slide07.png` als
   Slide-Frames. Wer ein Gamma-Deck exportiert, benutzt es hoechstens
   als Ideenskizze — **nie** als Pipeline-Input.
2. **Gamma setzt kein Slide-Chrome** (keine Titelzeile, keine Bullets,
   kein Footer). Fonts, Spacing und Layout-Ratios des fertigen Frames
   kommen aus `video-style-engine/theme.json` + `slide-template.jsx`.
   **Farben der Einzelbilder** (Diagramme/Illustrationen) werden in
   `slides_prompt.txt` an `video-style-engine/brand/colors.json`
   gebunden, damit Visuals nahtlos unter das Remotion-Layout passen.

---

## 2. Rollen-Trennung

| Schicht | Rolle | Quelle der Wahrheit |
|---|---|---|
| **Inhalt** (Titel, Bullets, Skript) | Content-Autor:in | `lessons/*.md` |
| **Strukturplan** (Slide-Reihenfolge, Timing) | Lesson-Asset-Generator | `lesson-asset-generator/output/<lesson>/video_config.json`, `visual_plan.json`, `slides.json` |
| **Einzelbilder** (Diagramme, Illustrationen, Charts) | Gamma / AI-Bildgenerator / manuell | `assets-input/<lesson>/visual01.png` … |
| **Voice-Over** | ElevenLabs | `assets-input/<lesson>/voice.mp3` |
| **Layout + Design + Animation** | Remotion (Video-Renderer) | `video-style-engine/slide-template.jsx`, `theme.json`, `animation-rules.json`, `intro-scene.jsx`, `outro-scene.jsx` |
| **Finales MP4** | Remotion-Renderer | `videos/<lesson>.mp4` |

Visualisiert:

```
Content (lessons/*.md)
        │
        ▼
Lesson-Asset-Generator
        │   produziert:
        │   - video_config.json   (timing + sections)
        │   - visual_plan.json    (welche Visuals wo)
        │   - slides.json         (titles + bullets pro slide)
        │   - slides_prompt.txt   (Auftrag an Gamma: NUR Visuals)
        │   - voice_script.txt    (Auftrag an ElevenLabs)
        ▼
┌─────────────────────────┐           ┌───────────────────────────┐
│ Gamma / AI-Bildgenerator │           │ ElevenLabs                │
│ liefert:                 │           │ liefert:                  │
│   visual01.png           │           │   voice.mp3               │
│   visual02.png           │           │                           │
│   ...                    │           │                           │
└────────────┬─────────────┘           └─────────────┬─────────────┘
             │                                       │
             ▼                                       ▼
        assets-input/<lesson>/                assets-input/<lesson>/
        visual01.png, visual02.png, ...       voice.mp3
             │                                       │
             └───────────────┬───────────────────────┘
                             ▼
                   Asset-Resolver
                             │
                             ▼
               Remotion-Renderer
                             │
               ┌─────────────┴─────────────┐
               │ slide-template.jsx        │ ← bestimmt das Layout
               │ theme.json                │ ← bestimmt Farben/Fonts
               │ animation-rules.json      │ ← bestimmt Motion
               │ VisualRenderer.jsx        │ ← setzt visualNN.png
               │                           │   in die Visual-Area
               └─────────────┬─────────────┘
                             ▼
                      videos/<lesson>.mp4
```

---

## 3. Was `slides_prompt.txt` Gamma (oder andere Generatoren) sagt

`generate-slides-prompt.js` schreibt einen **Micro-Brief**: globale Regeln
inkl. **Brand-2.0-Farblock** (Hex-Werte werden aus
`video-style-engine/brand/colors.json` eingelesen — dieselbe Quelle wie
Videos/Slides im Renderer), dann **eine nummerierte Zeile pro Seite** —
jeweils ein kurzer englischer Imperativ („Generate one image: …“). Keine
Lektionsabsaetze, keine Markdown-Kontextbloecke; inhaltliche Details
stehen in `lessons/*.md`, die Zeilen leiten aus **Slide-Titel + Section**
nur noch das Motiv ab.

Beispielstruktur:

```
Each numbered line = one PDF page = one full-bleed image.
BRAND 2.0 — use ONLY these hex colors …
…

Lesson module04-lesson02 — 7 page(s), in order:

1. Generate one abstract image: …
2. Generate one image: …
…

Print exactly 7 pages in this order. No extra pages.
```

Fuer **Midjourney / DALL·E / Firefly** kann jede Zeile 1..N einzeln
kopiert werden. Praktischer: **`npm run export:image-prompts`**
schreibt pro Lektion unter `exports/image-tool-prompts/<id>/` je eine
Datei `visualNN-MJ.txt` (Brand-Block + eine Zeile) — siehe
`docs/VIDEO_PRODUCTION_WORKFLOW.md` §3.3. Die Pipeline bleibt zusaetzlich
auf Gamma-PDF + Slice optimiert, ist aber **optional**.

---

## 4. Was der Renderer erwartet

Die Remotion-Composition liest pro Lektion:

- **`video_config.json`** — Timeline, welche Scene pro Sektion
  (intro-scene / slide-template / outro-scene), welches `slide_ref`.
- **`slides.json`** — `title`, `bullets[]`, `section` pro Slide.
- **`visual_plan.json`** — pro Visual: `id`, `type`, `slide_ref`,
  `description`, `color_accent`.
- **`voice.mp3`** — eine Tonspur ueber die gesamte Laenge.
- **`visualNN.png`** (oder `visuals/<id>.png`) — das physische Visual-
  Asset, das der Visual-Plan-Eintrag an Position N referenziert.

Der `SlideTemplate` konsumiert:

```jsx
<SlideTemplate
  moduleNumber={...}
  lessonNumber={...}
  slideIndex={...}
  slideTotal={...}
  sectionLabel="Konzept"   // aus video_config.section.name
  title={slide.title}      // aus slides.json
  bullets={slide.bullets}  // aus slides.json
  visual={<VisualRenderer visual={primaryVisual} .../>}
  accentColor={...}
/>
```

`VisualRenderer` rendert innerhalb der Visual-Area `<img>` auf das
gelieferte PNG oder — falls keins da ist — einen didaktischen
Placeholder. **Nie** rendert der Renderer ein Gamma-Deck-Screenshot
als ganze Slide.

---

## 5. Asset-Namenskonventionen

Zwei gueltige Konventionen, beide vom Asset-Resolver akzeptiert:

### 5.1 Flache numerische Konvention (empfohlen, Gamma-Default)

```
assets-input/moduleXX-lessonYY/
  visual01.png
  visual02.png
  visual03.png
  ...
```

Der N-te Eintrag aus `visual_plan.json` bekommt `visualNN.png`. Die
Zuordnung macht der Asset-Resolver automatisch.

### 5.2 Per-ID-Konvention (fuer Content-Autor:innen, die explizit IDs setzen)

```
assets-input/moduleXX-lessonYY/visuals/
  <visual.id>.png     z.B. v01-amm-core.png, concept-aave.svg
```

Wird gefunden, bevor die numerische Fallback-Logik greift —
praktisch, wenn einzelne Visuals bewusst von Hand zugeordnet werden.

### 5.3 Ungueltig

```
assets-input/moduleXX-lessonYY/
  slide01.png     ← NEIN. Gamma-Deck-Frames haben hier nichts zu suchen.
  slide02.png     ← NEIN.
  deck.pdf        ← NEIN (als Slide-Quelle).
```

Siehe `scripts/validate-lessons.js` + Preflight in
`scripts/render-batch.js`. Beide fragen **nicht** nach `slideNN.png`.

---

## 6. Dos & Don'ts

| ✅ Do | ❌ Don't |
|---|---|
| Gamma-Prompt auf Einzelvisuals ausrichten | Gamma ein Deck bauen lassen und als PNGs rausschneiden |
| Visual-Idee beschreiben, Komposition offen lassen | Farben, Fonts, Layout in Gamma festlegen |
| `theme.json` editieren fuer Design-Updates | Gamma-Stil als finale Marke nehmen |
| `visualNN.png` direkt in den Lesson-Ordner legen | Ein riesiges PDF in den Lesson-Ordner werfen und hoffen |
| Einzelne Visuals per Visual-ID ausliefern wenn noetig (Konvention 5.2) | Gamma-Deck-Layout ueber das Remotion-Template stuelpen |
| Wenn ein Visual fehlt: PNG weglassen — Renderer zeichnet Placeholder | Eine Fake-Slide mit Text in Photoshop bauen |

---

## 7. Durchsetzung

- **Prompt-Ebene:** `generate-slides-prompt.js` schreibt die Regeln
  in jede `slides_prompt.txt` in den Kopf hinein. Wer den Prompt
  unveraendert an Gamma gibt, bekommt nie wieder ein Deck-Ergebnis.
- **Doku-Ebene:** `README.md`, `docs/VIDEO_PRODUCTION_WORKFLOW.md`,
  `docs/defi_academy_system.md` referenzieren dieses Dokument und
  zeigen die Warnung: *"Never use Gamma-generated slides directly
  in the renderer."*
- **Renderer-Ebene:** `asset-resolver.js` verarbeitet nur
  `visuals/<id>.<ext>` und die flache `visualNN.<ext>`-Konvention.
  `slideNN.png` wird vom Resolver ignoriert.

---

## 8. Aenderungen am Design

Wer Farben, Fonts, Layouts oder Animationen anpassen will, arbeitet
**ausschliesslich** in `video-style-engine/`:

| Datei | Zweck |
|---|---|
| `theme.json` | Farben, Typografie, Spacing, Borders, Branding-Strings |
| `slide-template.jsx` | Layout der Content-Slides (Bullet-Animation, Accent-Bar, Visual-Area) |
| `intro-scene.jsx` | Titel-Einstieg |
| `outro-scene.jsx` | Ausklang, Link zur naechsten Lektion |
| `animation-rules.json` | Kurven, Dauer, Keyframes fuer Motion |
| `visual-timing.json` | Default-Timing fuer Visual-Einblendungen |

Alle diese Dateien werden vom Renderer **zur Laufzeit** gelesen —
keine Markdown-, Prompt- oder Gamma-Aenderung kann das uebersteuern.
