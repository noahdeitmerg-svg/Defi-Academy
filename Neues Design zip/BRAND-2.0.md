# Brand 2.0 — DeFi Academy Design System

**Status:** Evolution von Brand 1.0, additiv, rückwärtskompatibel

Brand 2.0 behält die Farb- und Typografie-Grundlage von 1.0 bei und erweitert
sie um fünf Komponenten-Primitives, die Slide- und Video-Templates
deutlich lebendiger machen, ohne das Leitprinzip "Tiefe statt Hype" zu
verletzen.

---

## Was neu ist

### 1. Kategorie-Pill (oben links)

Klein, gold-umrandet, pro Lektion gesetzt. Gibt User visuelle Orientierung,
in welcher Kurs-Phase sie sich befinden.

```
┌──────────────┐
│ GRUNDLAGEN   │  ← Modul 1-2
└──────────────┘
```

Vordefinierte Kategorien:

| Key          | Label              | Module |
|--------------|--------------------|--------|
| `foundation` | GRUNDLAGEN         | 1-2    |
| `practice`   | PRAXIS             | 3-5    |
| `strategy`   | STRATEGIE          | 6-10   |
| `risk`       | RISIKO & AUDIT     | 7, 11  |
| `advanced`   | FORTGESCHRITTEN    | 12-13  |

### 2. Checkmark-Bullets

Ersetzen die alten Gold-Dashes. Sichtbarer bei Video-Kompression, klarer als
Abschluss-Marker für Lernziele/Aussagen.

```
○ Aufbau & Funktionsweise        ← alt (Dash)
✓ Aufbau & Funktionsweise        ← neu (Check in Gold-Kreis)
```

### 3. Hero-Motiv (rechte Slide-Hälfte)

Pro Modul **ein programmatisch generiertes SVG-Motiv**. Keine KI-Renders,
keine Stockfotos, sondern flache Line-Art, die über alle 13 Module
visuell zusammengehört.

Jedes Motiv:
- folgt der gleichen Strokestärke (2 px) und Farbpalette (gold + gold soft)
- ist thematisch zur Modul-Domäne passend
- funktioniert bei Grayscale und 50 % Transparenz
- ist komplett deterministisch (kein Rendering, kein KI-Bild)

### 4. Wordmark-Footer zentriert

Shield + "DeFi Academy"-Lockup, zentriert im unteren Drittel. Ersetzt den
kleinen Brand-Stempel unten links. Brand-Moment am Ende jeder Slide.

### 5. Gold-Progress-Bar (Video)

Dicker Playhead, gold-gefüllte Track-Progression, dezenter Timestamp links.
Ersetzt die dezente graue Leiste des alten Players.

---

## Was NICHT übernommen wurde

Bewusst außen vor gelassen, weil inkompatibel mit "Tiefe statt Hype":

- 3D-Render-Blöcke mit Glow-Effekten
- Cinema-Beleuchtung / warme Spotlights
- Sparkles, Partikel, animierte Hintergründe
- Stock-Illustrationen von abstrakten Krypto-Symbolen
- Mascots oder Figuren

---

## Datei-Übersicht

```
brand/
├── colors.json                    # Farbsystem (unverändert, Brand 1.0)
├── typography.json                # Typografie (unverändert, Brand 1.0)
├── logo.svg                       # Shield-Logo (unverändert, Brand 1.0)
├── brand-2.0-components.js        # Neu: Komponenten-Primitives
├── hero-motifs.js                 # Neu: 13 modulare Hero-Motive
├── render-slide-v2.js             # Neu: Slide-Template im neuen Design
├── motif-previews/                # Neu: PNG-Preview aller 13 Motive
│   ├── module-01.svg
│   ├── module-01.png
│   ├── ... (bis module-13)
│   └── motifs-grid.jpg
└── BRAND-2.0.md                   # Diese Datei
```

---

## Verwendung im Code

### Slide rendern

```javascript
const { renderSlideV2 } = require('./brand/render-slide-v2');

const svg = renderSlideV2({
  moduleNumber: 1,
  lessonNumber: 3,
  category: 'foundation',          // foundation | practice | strategy | risk | advanced
  title: 'Die Grundlagen der Blockchain',
  bullets: [
    'Blockchain-Konzepte verstehen',
    'Aufbau & Funktionsweise',
    'Dezentralisierung & Sicherheit',
  ],
  showProgressBar: true,           // nur wenn Video-Overlay benötigt
  progressPercent: 0.17,
  currentTime: '1:05',
  totalTime: '6:12',
});
```

### Einzelnes Hero-Motiv holen

```javascript
const { getMotif } = require('./brand/hero-motifs');
const motifSvg = getMotif(1, 400);  // Modul 1, 400x400 px
```

### Kategorie pro Modul

Die Zuordnung Modul → Kategorie liegt in der Pipeline (nicht im Brand-System):

```javascript
function categoryForModule(n) {
  if (n <= 2)  return 'foundation';
  if (n <= 5)  return 'practice';
  if (n === 7 || n === 11) return 'risk';
  if (n <= 10) return 'strategy';
  return 'advanced';
}
```

---

## Pipeline-Integration

`pipeline-test/src/render-slides-to-svg.js` muss angepasst werden, damit
es `render-slide-v2.js` verwendet statt des alten Slide-Templates.

Konkret:

1. Import am Kopf: `const { renderSlideV2 } = require('../../brand/render-slide-v2');`
2. In der Slide-Rendering-Schleife:
   ```javascript
   const svg = renderSlideV2({
     moduleNumber: lessonMeta.module,
     lessonNumber: lessonMeta.lesson,
     category: categoryForModule(lessonMeta.module),
     title: slide.title,
     bullets: bulletsFromBody(slide.body),
     showProgressBar: false,  // für Video-Rendering aus, Plattform kann overlay setzen
   });
   ```
3. Alles andere bleibt wie bisher (Rasterisierung, ffmpeg-Komposition,
   Audio-Synchronisation).

**Wichtig:** Die Content-Markdown-Dateien werden **nicht angefasst**.
Das Design-Upgrade wirkt nur im Rendering, nicht im Content.
