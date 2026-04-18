# Video Style Engine – DeFi Academy

Der visuelle und strukturelle Standard für alle Lektionsvideos der DeFi Academy.

## Zweck

Dieses System stellt sicher, dass jedes der geplanten Lektionsvideos (alle Module, alle Lektionen) in **exakt demselben visuellen Stil** automatisiert gerendert werden kann – unabhängig davon, welche Lektion als nächstes ansteht. Die Engine ist kompatibel mit **Remotion** und darauf ausgelegt, von der Render-Pipeline ohne manuelle Anpassungen verarbeitet zu werden.

## Designprinzipien

- **Clean** – klare Flächen, viel Negativraum, keine dekorativen Elemente
- **Professional** – dunkle, zurückgenommene Farbpalette, ruhige Typografie
- **Technical** – Diagramme, Dashboards, echte Protokoll-Screenshots stehen im Mittelpunkt
- **Educational** – Tempo und Hierarchie sind auf Verständnis optimiert, nicht auf Unterhaltung

## Dateien

| Datei | Zweck |
|---|---|
| `theme.json` | Farben, Typografie, Spacing, Layout, Branding |
| `slide-template.jsx` | Wiederverwendbare Remotion-Slide-Komponente |
| `animation-rules.json` | Regeln für Übergänge, Ein-/Ausblendungen, Diagramm-Aufbau |
| `visual-timing.json` | 9-Sektionen-Aufbau mit Ziel-Dauern pro Sektion |
| `intro-scene.jsx` | Remotion-Szene für den Video-Einstieg |
| `outro-scene.jsx` | Remotion-Szene für den Video-Abschluss |

## Videoaufbau (9 Sektionen)

Jedes Lektionsvideo folgt zwingend dieser Struktur:

1. **Intro** (`intro-scene.jsx`)
2. **Lesson Title** (`slide-template.jsx`)
3. **Concept** (`slide-template.jsx`)
4. **Mechanism** (`slide-template.jsx`)
5. **System Architecture** (`slide-template.jsx`)
6. **Risk Layer** (`slide-template.jsx`, Accent-Farbe = Risk-Rot)
7. **Protocol Example** (`slide-template.jsx`)
8. **Key Takeaways** (`slide-template.jsx`)
9. **Outro** (`outro-scene.jsx`)

Zielzeit pro Lektion: **8 Minuten** (gültig: 5–10 Minuten).

## Slide-Standard

Jede inhaltliche Slide enthält:

- **Titel** (Sektionstitel der Lektion)
- **3–4 Bullet Points** (linke Spalte)
- **Visual Area** (rechte Spalte: Diagramm, Dashboard oder Screenshot)

Zusätzliche Elemente:

- Modul-/Lektions-Label (oben links)
- Section-Label (oben rechts, z. B. „Mechanismus")
- Slide-Counter und Marken-Signet (unten)

## Farbpalette

```
Hintergrund          #0B0F14
Kartenfläche         #151C26
Haupt-Akzent         #4F8BFF   (Blau)
Sekundär-Akzent      #35C08A   (Grün, Erfolg / Rendite)
Warn-Akzent          #E0A94A   (Gelb)
Risk-Akzent          #D9544E   (Rot, nur für Risk Layer)
Text primär          #F5F7FA
Text sekundär        #B7C0CC
Text gedämpft        #7A8494
```

Die Risk-Layer-Sektion nutzt automatisch den roten Akzent über das Feld `accent_color_override` in `visual-timing.json`.

## Typografie

- **Font**: Inter (400 / 500 / 600 / 700)
- **Display** (Intro/Outro): 92 px, 700
- **Titel** (Slides): 64 px, 600
- **Body** (Bullets): 26 px, 400
- **Label** (Module/Sections): 18 px, 600, uppercase, letter-spacing 0.08em

## Animationen

Bewusst **minimal gehalten**. Erlaubt:

- Fade + leichter Rise (Titel)
- Fade + leichter Slide (Bullets, gestaffelt)
- Fade (Visuals)
- Cross-Fade zwischen Sektionen
- Schrittweiser Diagramm-Aufbau (wenn didaktisch sinnvoll)
- Zahlen-Counter für APY / Schwellen / Pool-Größen

**Verboten**: Bouncing, Spinning, Partikel, 3D-Flips, Parallax-Hintergründe, Regenbogen-Gradienten.

Respektiert `prefers-reduced-motion` – in diesem Fall werden nur Fades verwendet.

## Integration in Remotion

```jsx
import { Composition } from 'remotion';
import { IntroScene } from './intro-scene';
import { SlideTemplate } from './slide-template';
import { OutroScene } from './outro-scene';
import timing from './visual-timing.json';
import theme from './theme.json';

export const RemotionRoot = () => (
  <Composition
    id="Lesson"
    component={Lesson}
    durationInFrames={timing.total_target_seconds * theme.canvas.fps}
    fps={theme.canvas.fps}
    width={theme.canvas.width}
    height={theme.canvas.height}
    defaultProps={{
      moduleNumber: 6,
      lessonNumber: 1,
      lessonTitle: '...',
      sections: [ /* Inhalte je Sektion aus dem Lektions-JSON */ ]
    }}
  />
);
```

Die `Lesson`-Komponente kombiniert die Szenen auf Basis von `visual-timing.json` (Reihenfolge und Dauern) und der Lektions-Daten (Titel, Bullets, Visuals).

## Integration in die Asset-Pipeline

Diese Engine konsumiert die vom Video Agent generierten Asset-Dateien pro Lektion:

```
moduleXX-lessonYY/
  slides_prompt.txt     → wird in die Slide-Props umgesetzt
  voice_script.txt      → ElevenLabs-Input für die Tonspur
  visual_plan.json      → Quellen / Timings für die Visual Area
  video_config.json     → Master-Konfiguration (Titel, Dauer, Timing)
```

Die Render-Pipeline liest `video_config.json`, ordnet jede Sektion dem entsprechenden Szenen-Typ zu (`intro-scene`, `slide-template`, `outro-scene`) und setzt die Daten in die Remotion-Komposition ein.

Output:

```
videos/moduleXX-lessonYY.mp4
posters/moduleXX-lessonYY.jpg
```

Beide Pfade werden automatisch von der Plattform erkannt.
