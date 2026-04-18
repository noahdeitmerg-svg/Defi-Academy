# DeFi Academy

Next.js-Lernplattform (App Router, Tailwind, Markdown/MDX): Module, Lektionen, Quiz, Fortschritt im Browser.

**Repo:** [github.com/noahdeitmerg-svg/Defi-Academy](https://github.com/noahdeitmerg-svg/Defi-Academy)

---

## Zielmodell (wie AlphaCycle): **ein Ordner**

Du hast **genau einen** lokalen Ordner = **Git-Klon** (mit `.git` und `package.json`):

1. Repo klonen (einmal) oder bestehenden Klon nutzen.
2. **Cursor:** **File → Open Folder** → diesen Klon-Ordner öffnen (nicht eine zweite Kopie ohne Git).
3. Hier entwickeln → `git add` / `commit` / `push` → fertig.

Kein robocopy, kein Sync zwischen zwei Arbeitskopien nötig.

Details: [docs/GITHUB.md](docs/GITHUB.md)

---

## Schnellstart

1. **Node.js 22+** ([nodejs.org](https://nodejs.org/) LTS) – danach **neues Terminal**
2. Im **Klon-Ordner**:

```powershell
npm install
npm run dev
```

3. Browser: **http://localhost:3000**

Optional:

```powershell
npm run check
```

---

## Optional: zwei Ordner auf der Platte

Nur falls du **historisch** zwei Pfade hast (z.B. alter Ordner ohne `.git` + GitHub-Klon): dann kann `scripts/sync-to-github-clone.ps1` einmal helfen – **Standard ist trotzdem: nur der Klon.**

---

## Videos produzieren — CLI-Guide fuer neue User

Die Lernplattform erwartet pro Lektion **optional** ein MP4 unter
`public/videos/<slug>.mp4`. Die Produktion erfolgt aus den gleichen
Markdown-Quellen wie der Web-Content, ueber eine vollstaendige Pipeline:

**Markdown (`lessons/*.md`)** → **Lesson-Asset-Generator** → **Gamma-Visuals (Einzelbilder)** → **Remotion-Slide-Template (Layout)** → **ElevenLabs-Voice** → **Finales Video**

> ⚠️ **Architektur-Regel:** Gamma liefert **nur Einzel-Visuals**
> (Diagramme, Illustrationen, Charts) — keine kompletten Slides, keine
> Deck-Layouts, keine Farben/Fonts. Das Slide-Layout rendert
> ausschliesslich `video-style-engine/slide-template.jsx` in Remotion.
> **Never use Gamma-generated slides directly in the renderer.**
> Details: [docs/SLIDE_GENERATION_RULES.md](docs/SLIDE_GENERATION_RULES.md).

### Vorbereitung (einmalig)

1. `.env.local` anlegen (Kopie von `.env.example`) und ElevenLabs-
   Zugangsdaten eintragen:

   ```
   ELEVENLABS_API_KEY=sk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ELEVENLABS_MODEL=eleven_turbo_v2
   ELEVENLABS_VOICE=Florian
   ```

2. Im `video-renderer/video-renderer/`-Ordner einmal
   `npm install` laufen lassen (Remotion-Deps).

### 5-Schritt-Produktion

```powershell
# 1) Lektions-Markdowns strukturell pruefen
npm run validate-lessons

# 2) Pro Lektion slides_prompt.txt, voice_script.txt, video_config.json erzeugen
node lesson-asset-generator/src/cli.js --input-dir lessons --out lesson-asset-generator/output

# 3) assets-input/moduleXX-lessonYY/ mit README anlegen
npm run prepare:assets

# ---- MANUELLER SCHRITT ----
# In Gamma (gamma.app) mit slides_prompt.txt pro Slide EIN Einzel-
# Visual (Diagramm/Illustration/Chart) generieren und als
# visual01.png, visual02.png, ... nach assets-input/moduleXX-lessonYY/
# exportieren. KEINE Slide-Layouts, KEIN Titel-Text, KEINE Bullets
# auf die Bilder — das rendert Remotion.
# Details + Regeln:
#   docs/VIDEO_PRODUCTION_WORKFLOW.md
#   docs/SLIDE_GENERATION_RULES.md  ← Pflichtlektuere

# 4) Voice-Overs generieren (ElevenLabs)
npm run generate:voice

# 5) Videos rendern
npm run render:course      # Vollproduktion, alle Lektionen (empfohlen)
# oder:
npm run render:pilot       # Nur erste 5 Lektionen, als Smoke-Test
```

Ergebnis: `videos/moduleXX-lessonYY.mp4` + `posters/moduleXX-lessonYY.jpg`.

Ausfuehrliche Dokumentation inkl. Ordnerstruktur, Troubleshooting,
Rollenverteilung und vollstaendiger CLI-Referenz:
**[docs/VIDEO_PRODUCTION_WORKFLOW.md](docs/VIDEO_PRODUCTION_WORKFLOW.md)**.

---

## Weitere Doku

| Datei | Inhalt |
|-------|--------|
| [docs/BUILD.md](docs/BUILD.md) | Node, Build, Akademie-Inhalte |
| [docs/academy-structure.md](docs/academy-structure.md) | Hierarchie: DeFi Akademie → Module → Lektionen → Videos / Quiz / Praxisuebungen |
| [docs/GITHUB.md](docs/GITHUB.md) | Klonen, Push, PAT, optional Sync |
| [docs/OPS_CHECKLIST.md](docs/OPS_CHECKLIST.md) | Deploy-, Webhook- und Smoke-Test-Checkliste |
| [docs/VIDEO_PRODUCTION_WORKFLOW.md](docs/VIDEO_PRODUCTION_WORKFLOW.md) | Video-Pipeline Lessons → Visuals → Voice → MP4 |
| [docs/SLIDE_GENERATION_RULES.md](docs/SLIDE_GENERATION_RULES.md) | Rollen-Trennung: Gamma = Bilder, Remotion = Layout |
| [docs/defi_academy_system.md](docs/defi_academy_system.md) | Gesamte Systemarchitektur + Agent-Rollen |
| [docs/offeneAufgaben.md](docs/offeneAufgaben.md) | Living-Backlog offener Tasks |
| `scripts/import-modules.ts` | Große `moduleN.md` nach `content/modules/` |

## GitHub Pages (Deploy)

Statischer Export, **GitHub Actions** → Pages: [docs/GITHUB_PAGES.md](docs/GITHUB_PAGES.md) (inkl. **Webhook** / `repository_dispatch`).

## Akademie-Inhalte

Inhalt unter **`content/modules/`** (Module → Lektionen → Quiz/Praxisuebung).
Neue `.md`-Lektionen dort reichen; die App liest zur Laufzeit. Die
vollstaendige Begriffshierarchie steht in
[docs/academy-structure.md](docs/academy-structure.md).
