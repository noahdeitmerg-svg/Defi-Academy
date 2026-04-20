# DeFi Academy — Brand System

**Agenten:** [`docs/AGENTEN-HANDBUCH.md`](./AGENTEN-HANDBUCH.md)

**Status:** ✅ Erstellt · Version 1.0.0
**Zentrale Dateien:** `/brand/` · `/docs/brand-system.md` (diese Datei)
**Verbunden mit:** `video-style-engine/theme.json`, `slide-template.jsx`,
`intro-scene.jsx`, `outro-scene.jsx`

---

## Überblick

Die DeFi Academy folgt einem **technisch-professionellen** Design-System
in der Ästhetik moderner Fintech-Dashboards und Developer-Dokumentationen
(Stripe, Apple Dev Docs). Alle Oberflächen — Videos, Slides, Landing
Page, Plattform-Dashboard, SEO-Artikel — nutzen dieselben Farben,
Typografie, Icons und Layout-Regeln.

---

## 1. Farbpalette

### Kernfarben (verbindlich)

| Rolle | Hex | Verwendung |
|---|---|---|
| **Primary Background** | `#0B1F3B` | Alle Hauptflächen (Video, Slide, Plattform) |
| **Primary Accent** | `#F5B841` | Logo-Gold, Akzente, aktive Elemente, Bullet-Marker |
| **Text** | `#FFFFFF` | Titel, Haupttext, Logo-Wortmarke |
| **Secondary Text** | `#A0AEC0` | Bullets, Caption, dezente Meta-Infos |
| **Risk Highlight** | `#D9544E` | Risk-Layer-Sektion, kritische Warnungen |

### Erweiterte Palette

| Rolle | Hex |
|---|---|
| Background Elevated | `#11284A` |
| Background Overlay | `#1A355F` |
| Border | `#1F3A66` |
| Muted Text | `#6B7A8F` |
| Info | `#5EA9F0` |
| Success | `#3FB58B` |
| Warning | `#F5B841` |

### Chart-Palette (für Diagramme)

```
#F5B841  #5EA9F0  #3FB58B  #D9544E  #B388E8  #5DC7D1
```

Definition im JSON-Format: [`/brand/colors.json`](../brand/colors.json).

---

## 2. Typografie

**Font:** Inter (Google Fonts / self-hosted), Gewichte 400 / 500 / 600 / 700.

| Rolle | Größe | Gewicht | Tracking | Farbe |
|---|---|---|---|---|
| Title | 64 px | 700 | -0.02em | `#FFFFFF` |
| Slide Title | 48 px | 700 | -0.015em | `#FFFFFF` |
| Section Label | 18 px | 600 | +0.08em UPPER | `#A0AEC0` / `#F5B841` |
| Body | 28 px | 400 | 0 | `#FFFFFF` |
| Bullet | 26 px | 400 | 0 | `#A0AEC0` |
| Caption | 20 px | 500 | +0.01em | `#A0AEC0` |

Zusätzlich für Hero/Intro: **92 px bold** (Logo-Reveal).

Definition im JSON-Format: [`/brand/typography.json`](../brand/typography.json).

### Regeln

- **Nur Inter.** Keine alternativen Schriften.
- **Keine Italic.** Technische Dokumente vermeiden Kursiv.
- **Keine Schatten, Outlines, Glows auf Text.**
- Uppercase nur für Section Labels mit +0.08em Tracking.

---

## 3. Spacing

Basis: **8 px**. Alle Abstände sind Vielfache.

```
xs: 8    sm: 16    md: 24    lg: 40    xl: 64    xxl: 96
```

**Safe Area** auf 1920×1080 Video-Slides:
- Oben/unten: 80 px
- Links/rechts: 120 px

---

## 4. Slide-Struktur

Verbindliches Layout für alle Content-Slides:

```
┌──────────────────────────────────────────────────────────┐
│  MODUL XX · LEKTION YY         [ SECTION LABEL pill ]    │
│                                                          │
│  ▌ Slide Title                                           │
│                                                          │
│  ┌────────────────────┐   ┌────────────────────────┐    │
│  │  — Bullet 1        │   │                        │    │
│  │  — Bullet 2        │   │    Visual Area         │    │
│  │  — Bullet 3        │   │    (Diagram /          │    │
│  │  — Bullet 4        │   │     Dashboard /        │    │
│  │                    │   │     Screenshot)        │    │
│  └────────────────────┘   └────────────────────────┘    │
│                                                          │
│  DeFi Academy                               03 / 07      │
└──────────────────────────────────────────────────────────┘
```

- **Text-Area:** 40 % Breite links
- **Visual-Area:** 55 % Breite rechts
- **Gap:** 5 % zwischen beiden
- **Max. 4 Bullet Points** pro Slide
- **Titel:** einzeilig bevorzugt; zweizeilig nur bei langen Titeln (dann 44 px)

---

## 5. Icon-Nutzung

| Parameter | Wert |
|---|---|
| Stil | Outline (nicht Filled) |
| Stroke | 1.5 – 2 px |
| Viewbox | 24 × 24 px Standard |
| Line Cap / Join | round |
| Farbe (Default) | `#FFFFFF` |
| Farbe (Akzent) | `#F5B841` |
| Farbe (Risk) | `#D9544E` |

**Empfohlene Library:** [Lucide](https://lucide.dev) — passender
technischer Outline-Stil.

**Verboten:** Filled Icons, Emojis als Icon-Ersatz, skeuomorphe oder
cartoonhafte Icons.

---

## 6. Visueller Stil

### Diagramme

- Knoten: dünne Kreise (Stroke 1.5 px, optional in `#F5B841`)
- Kanten: Linien mit kleinen Pfeilspitzen
- Beschriftungen: Inter 20 px, `#A0AEC0`
- Maximal 6 Knoten pro Diagramm — sonst auf zwei Slides aufteilen

### Dashboards & Screenshots

- **Echte Protokoll-Screenshots** (Aave, Uniswap, Curve, Compound, Lido, GMX)
- Wallet-Adressen und Balances **anonymisieren**
- Relevante Bereiche mit goldenem Akzentrahmen hervorheben

### Charts

- Linien- oder Flächendiagramme (keine 3D-Effekte)
- Farben aus `chart_palette` in exakter Reihenfolge
- Achsen: Inter 20 px, Grid in `#1F3A66`

### Was vermieden wird

- Stockfotos
- KI-generierte Menschen-Illustrationen
- Dekorative Hintergrundgrafiken
- Gradient-Überblendungen außer den definierten Brand-Gradients

---

## 7. Logo-Platzierung

### Varianten

- **`logo.svg`** — Vollfarbe: Shield mit Gold-Outline + Weiße Knoten + Gold-Zentralknoten
- **`logo-lockup.svg`** — Horizontal mit Wortmarke „DeFi **Academy**" (Academy in Gold)
- **`logo-mono.svg`** — Einfarbig über `currentColor`

### Nutzung in Videos

- **Intro-Szene:** Lockup mittig, 92 px Wortmarke, animierter Goldstrich darunter
- **Slide-Footer:** „DeFi Academy" als Textlogo unten links (20 px)
- **Outro-Szene:** Lockup oben, Trennlinie, „Nächste Lektion"-Info

### Nutzung auf der Plattform

- Header: Symbol + „DeFi Academy" Wortmarke, 32 px Höhe
- Favicon: Symbol-SVG (skaliert auf 32 × 32 und 16 × 16)
- Footer: Mono-Variante, dezent

### Clear Space

Mindestens die x-Höhe des Symbols (= 8 px bei 64×64 Master) als Leerraum
auf allen Seiten.

### Verboten

- Verzerren, rotieren, spiegeln
- Farben tauschen außerhalb der offiziellen Varianten
- Schatten/Outline/Glow hinzufügen
- Direkt neben andere Logos ohne Clear Space

---

## 8. Video-Struktur (9 Sektionen)

Jedes Lektionsvideo folgt dieser Sequenz:

1. Intro (12 s)
2. Lesson Title (15 s)
3. Concept (75 s)
4. Mechanism (90 s)
5. System Architecture (70 s)
6. Risk Layer (70 s) — **Akzent wechselt zu `#D9544E`**
7. Protocol Example (80 s)
8. Key Takeaways (50 s)
9. Outro (12 s)

Zielzeit: 8 Minuten (gültig: 5–10 Min).

---

## 9. Anwendung auf Systemkomponenten

| Komponente | Was übernommen wird |
|---|---|
| `video-style-engine/theme.json` | Farben, Typografie, Spacing, Branding |
| `video-style-engine/slide-template.jsx` | Slide-Layout, Bullets, Visual-Area |
| `video-style-engine/intro-scene.jsx` | Logo-Reveal, Gold-Akzentlinie |
| `video-style-engine/outro-scene.jsx` | Nächste-Lektion-Teaser |
| `lesson-asset-generator` | Gamma-Prompts enthalten die Brand-Regeln |
| `video-renderer` | Rendert Videos gemäß theme.json |
| Lernplattform (später) | CSS-Variablen aus `colors.json` |

---

## 10. Änderungsprozess

1. Änderung immer in `/brand/colors.json`, `/brand/typography.json`,
   `/brand/logo.svg` vornehmen.
2. `video-style-engine/theme.json` aus den Brand-Dateien regenerieren
   (Script: `brand/sync-to-theme.js` — siehe unten).
3. Im Video-Renderer `scripts/setup.js` erneut ausführen, um das aktualisierte
   Theme zu spiegeln.
4. Letzten Test-Render eines Moduls durchführen, um die Konsistenz zu prüfen.

**Niemals die Video-Style-Engine-Farben direkt editieren** — das
erzeugt Drift zwischen Brand-System und Produktion.

---

## 11. Quellen im Detail

- Farben: [`/brand/colors.json`](../brand/colors.json)
- Typografie: [`/brand/typography.json`](../brand/typography.json)
- Logo: [`/brand/logo.svg`](../brand/logo.svg), [`/brand/logo-lockup.svg`](../brand/logo-lockup.svg), [`/brand/logo-mono.svg`](../brand/logo-mono.svg)
- Vollständige Guidelines: [`/brand/design-guidelines.md`](../brand/design-guidelines.md)
