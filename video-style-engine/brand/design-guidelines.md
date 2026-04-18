# DeFi Academy — Design Guidelines

Verbindliche Nutzungsregeln für alle Oberflächen: Videos, Slides,
Lernplattform, Dokumente, SEO-Inhalte.

Leitprinzip: **„Tiefe statt Hype."**
Ästhetik-Referenzen: Stripe Docs · Apple Developer Docs · moderne
Fintech-Dashboards. Zurückhaltend, technisch präzise, hochwertig.

---

## 1. Farben

Die Farbpalette ist in [`/brand/colors.json`](./colors.json) als Single
Source of Truth kodifiziert. Verbindliche Kernfarben:

| Rolle | Hex | Nutzung |
|---|---|---|
| Primärhintergrund | `#0B1F3B` | Alle Video-Flächen, Slide-Hintergrund, Landing Page |
| Primär-Akzent | `#F5B841` | Logo-Gold, Titel-Akzentbalken, Bullet-Marker, Links |
| Text primär | `#FFFFFF` | Titel, Hauptaussagen, Logo-Text |
| Text sekundär | `#A0AEC0` | Bullets, Caption, Meta-Infos |
| Risk Highlight | `#D9544E` | Nur für die Risk-Layer-Sektion und kritische Warnungen |

Erweiterte Flächen (elevated surfaces, borders, gradients) und
semantische Varianten (info / success / warning) sind in
`colors.json` definiert und dürfen nicht ad-hoc erweitert werden.

**Kontrastregel:** Text auf Primärhintergrund muss mindestens WCAG AA
einhalten. `#FFFFFF` auf `#0B1F3B` → 18.7:1 (AAA). `#A0AEC0` auf
`#0B1F3B` → 8.3:1 (AAA).

**Risk-Farbe ist exklusiv.** `#D9544E` erscheint ausschließlich in der
Risk-Layer-Sektion eines Videos oder als explizites Warnsignal. Sie
wird nie als allgemeiner Akzent verwendet.

---

## 2. Typografie

**Font Family:** Inter (variable font, Gewichte 400 / 500 / 600 / 700).
Details in [`/brand/typography.json`](./typography.json).

| Rolle | Größe | Gewicht | Besonderheit |
|---|---|---|---|
| Title | 64 px | 700 | Intro-Szene, Lesson-Titel |
| Slide Title | 48 px | 700 | Titel jeder Content-Slide |
| Section Label | 18 px | 600 | Uppercase, +0.08em tracking |
| Body | 28 px | 400 | Hauptfließtext |
| Bullet | 26 px | 400 | Bullet Points, in `#A0AEC0` |

**Regel:** Keine dekorativen Schriften. Keine Italic. Keine
Schatteneffekte auf Text.

---

## 3. Logo

### Varianten

- **`logo.svg`** — Vollfarbe (Gold + Weiß auf Navy). Standard für dunkle
  Flächen. Nutzung: Intro-Szene, Plattform-Header, Favicons.
- **`logo-lockup.svg`** — Symbol + Wortmarke „DeFi Academy" nebeneinander.
  Nutzung: Intro/Outro-Szenen, E-Mail-Header, Dokumenten-Deckblätter.
- **`logo-mono.svg`** — Einfarbig via `currentColor`. Nutzung: Print,
  Wasserzeichen, helle Hintergründe.

### Platzierungsregeln

- **Mindestgröße:** 32 × 32 px (Symbol), 120 × 32 px (Lockup).
- **Clear Space:** Mindestens die x-Höhe des Symbols (= ca. 8 px bei
  64 × 64) als freier Raum auf allen Seiten.
- **Hintergründe:** Logo immer auf `#0B1F3B` oder darker. Nie auf
  goldenem Untergrund. Nie mit Farbverlauf hinterlegen.

### Was NICHT erlaubt ist

- Logo verzerren, rotieren, spiegeln
- Farben austauschen außerhalb der offiziellen Varianten
- Schatten, Outlines, Glow-Effekte hinzufügen
- Logo direkt neben ein anderes Logo stellen ohne Clear Space

---

## 4. Icons

**Stil:** Outline, 1.5-2 px Stroke, 24 × 24 px Standard-Viewbox,
`stroke-linecap="round"`, `stroke-linejoin="round"`.

**Farbe:** Standard `#FFFFFF`. Aktive/hervorgehobene Icons: `#F5B841`.
Risk-Icons: `#D9544E`.

**Empfohlene Icon-Library:** [Lucide](https://lucide.dev) — matched den
technischen, klaren Stil der Academy.

**Verboten:**
- Filled Icons
- Skeuomorphe Icons
- Illustrierte / cartoonhafte Icons
- Emojis als Icon-Ersatz

---

## 5. Illustrationen & Visuals

Die Academy verwendet **keine** dekorativen Illustrationen. Stattdessen:

| Element | Stil |
|---|---|
| **Diagramme** | Linien-Diagramme. Knoten als dünne Kreise (Stroke 1.5 px). Kanten als Linien mit kleinen Pfeilspitzen. Beschriftung in Inter 20 px. |
| **Dashboards** | Echte Screenshots von DeFi-Protokollen (Aave, Uniswap, Curve), mit anonymisierten Adressen. |
| **Charts** | Einfache Linien- oder Flächendiagramme; gemäß `chart_palette` in `colors.json`. Keine 3D-Effekte. |
| **Risiko-Tabellen** | Tabellarisch, mit `#D9544E` auf der Kopfzeile, Inhaltszeilen in Standardfarben. |

**Stockfotos, KI-generierte Menschen-Illustrationen und generische
Graphics sind verboten.** Jedes Visual muss einen didaktischen Zweck
haben.

---

## 6. Spacing

Basis-Einheit: **8 px**. Alle Abstände sind Vielfache davon.

| Token | Pixel | Nutzung |
|---|---|---|
| `xs` | 8 | Icon-Text, Input-Padding |
| `sm` | 16 | Bullets untereinander, kompakte Abstände |
| `md` | 24 | Standard-Abstand zwischen Elementen |
| `lg` | 40 | Zwischen Sektionen einer Slide |
| `xl` | 64 | Großflächige Trennung |
| `xxl` | 96 | Slide-Padding, Hero-Abstände |

**Safe Area** auf Video-Slides: 80 px oben/unten, 120 px links/rechts.

---

## 7. Slide-Layout

Verbindliches Slide-Raster für alle Content-Slides:

```
┌──────────────────────────────────────────────────────────┐
│  MODUL 04 · LEKTION 02           [ SECTION LABEL pill ]  │ ← Meta (18 px)
│                                                          │
│  ▌ Slide Title                                           │ ← 48 px bold
│                                                          │
│  ┌──────────────────────┐   ┌────────────────────────┐   │
│  │                      │   │                        │   │
│  │  — Bullet point 1    │   │                        │   │
│  │  — Bullet point 2    │   │     Visual Area        │   │
│  │  — Bullet point 3    │   │     (Diagramm,         │   │
│  │  — Bullet point 4    │   │      Dashboard,        │   │
│  │                      │   │      Screenshot)       │   │
│  │                      │   │                        │   │
│  └──────────────────────┘   └────────────────────────┘   │
│                                                          │
│  DeFi Academy                              03 / 07       │ ← Footer (20 px)
└──────────────────────────────────────────────────────────┘
```

**Proportionen:** Text-Area 40 %, Visual Area 55 %, Gap 5 %.

**Pro Slide:**
- Max. 4 Bullet Points.
- Min. 3 Bullet Points (sonst wirkt die Slide leer).
- Titel auf einer Zeile; wenn zweizeilig, dann Größe auf 44 px reduzieren.
- Visual Area füllt mind. 60 % der zur Verfügung stehenden Höhe.

---

## 8. Video-Struktur (9 Sektionen)

Jedes Lektionsvideo folgt genau dieser Abfolge:

1. **Intro** (12 s) — Logo-Reveal, Modul-/Lektions-Label
2. **Lesson Title** (15 s) — Titel + Lernziele
3. **Concept** (75 s) — Grundbegriff / Definition
4. **Mechanism** (90 s) — Funktionsweise, Formeln, Schritte
5. **System Architecture** (70 s) — Komponenten und Zusammenspiel
6. **Risk Layer** (70 s) — **Akzent auf `#D9544E`**
7. **Protocol Example** (80 s) — Konkretes Protokoll mit Screenshot
8. **Key Takeaways** (50 s) — 3–4 Kernaussagen
9. **Outro** (12 s) — Verweis auf nächste Lektion

Zielzeit pro Video: **8 Minuten** (gültig: 5–10 Min).

---

## 9. Sprache / Tonalität

Auch wenn dies ein visuelles Guideline-Dokument ist: der Content folgt
denselben Prinzipien wie das Design.

- **Präzise, technisch, nüchtern.**
- **Keine Superlativen.** Nicht „revolutionär", nicht „bahnbrechend".
- **Keine Finanzversprechen.** Nicht „garantierte Renditen", nicht
  „passives Einkommen ohne Risiko".
- **Risiken explizit benennen.** Jede Strategie bekommt eine Risk-Layer-Sektion.
- **Englische DeFi-Begriffe dürfen beibehalten werden** (AMM, Liquidity Pool, Swap, APY). Phonetische Hinweise werden vom Voice-Script-Generator automatisch ergänzt.

---

## 10. Verbindung zum Video-System

Die Brand-Dateien sind die Quelle; das Video-System konsumiert sie:

```
/brand/colors.json         ┐
/brand/typography.json     ├─→  video-style-engine/theme.json
/brand/logo.svg            │    video-style-engine/slide-template.jsx
                           │    video-style-engine/intro-scene.jsx
                           ┘    video-style-engine/outro-scene.jsx
```

Änderungen am Brand-System fließen automatisch in den Video-Renderer
(Re-Run `scripts/setup.js` im Renderer propagiert neue Werte).

**Niemals im video-style-engine direkt Farben oder Fonts ändern.**
Immer nur die Brand-Dateien anpassen und das Setup erneut ausführen.
