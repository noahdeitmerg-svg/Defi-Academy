# DeFi Academy

Next.js-Lernplattform (App Router, Tailwind, Markdown/MDX): Module, Lektionen, Quiz, Fortschritt im Browser.

**Zwei Lernpfade:** **Legacy** `/module/…` (`content/modules/moduleN`) und **neue UX-Shell** `/kurs/…` mit Slug-Ordnern (`01-defi-grundlagen` …) — siehe [`docs/ROADMAP.md`](docs/ROADMAP.md) und [`docs/AGENTEN-HANDBUCH.md`](docs/AGENTEN-HANDBUCH.md).  
**Key Takeaways (UX):** zentral [`content/takeaways.json`](content/takeaways.json) — Format und Redaktion: [`docs/KEY-TAKEAWAYS.md`](docs/KEY-TAKEAWAYS.md).  
**Neuer Cursor-Chat / Agent:** [`docs/HANDOFF-NEUER-CHAT.md`](docs/HANDOFF-NEUER-CHAT.md) — Doku-Index: [`docs/README.md`](docs/README.md).

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

2. Im `video-renderer/`-Ordner einmal
   `npm install` laufen lassen (Remotion-Deps).

### Academy-Build: 2 Commands + 2 Uploads

Der empfohlene Weg. Du fuehrst **zwei Commands** aus und uploadest dazwischen
die Prompts manuell in Gamma und ElevenLabs.

```powershell
# 1) Alle Generator-Artefakte erzeugen UND Prompts flach sammeln
npm run academy-build
#    → generated-assets/<id>/ (JSON + Prompts)
#    → gamma-prompts/<id>.txt        ← Upload-fertig
#    → elevenlabs-prompts/<id>.txt   ← Upload-fertig

# ---- MANUELLE SCHRITTE ----
# A) gamma-prompts/*.txt → Gamma: Visuals generieren
#    Export als visual01.png, visual02.png, ... nach
#    assets-input/<id>/  (KEINE Slide-Layouts — Regel: visual NN.png)
#
# B) elevenlabs-prompts/*.txt → ElevenLabs: Voice generieren
#    Export als voice.mp3 nach  assets-input/<id>/voice.mp3
#    (Alternative automatisiert: ELEVENLABS_API_KEY setzen
#     und  npm run generate:voice)

# 2) Vollstaendigkeit pruefen und rendern
npm run check-assets         # meldet fehlende visualNN.png / voice.mp3
npm run render-videos        # Preflight + Remotion → videos/*.mp4
```

Ergebnis: `videos/moduleXX-lessonYY.mp4` + `posters/moduleXX-lessonYY.jpg`.

Ausfuehrliche Anleitung mit allen Flags, Troubleshooting und Ordner-
Struktur: **[docs/academy-build.md](docs/academy-build.md)**.
Tiefe Referenz (API-Varianten, Fehlerpfade):
**[docs/VIDEO_PRODUCTION_WORKFLOW.md](docs/VIDEO_PRODUCTION_WORKFLOW.md)**.

#### Alternative: voll-automatisierte Pipeline

Falls du Gamma- und ElevenLabs-API-Keys hast, kannst du Upload-Schritte
ueberspringen:

```powershell
npm run render:course      # Vollproduktion alle Lektionen (API-Calls)
npm run render:pilot       # Nur erste 5 Lektionen als Smoke-Test
```

---

## Weitere Doku

| Datei | Inhalt |
|-------|--------|
| **[docs/AGENTEN-HANDBUCH.md](docs/AGENTEN-HANDBUCH.md)** | **Master für Agenten:** Ist-Stand, 18 Module / ca. 102 Lektionen (Ziel), Deploy, Roadmaps, Doku-Index |
| [docs/AGENT-DOKUMENTATION-SYNC.md](docs/AGENT-DOKUMENTATION-SYNC.md) | **Pflicht nach Änderungen:** Doku für alle Agenten synchron halten |
| **Neue UX-Shell** | Start `/`, App `/dashboard`, Kurs `/kurs/...`, Fortschritt, Profil; **Legacy**-Kurs unter `/klassisch` und `/module/...` (nur Ordner `moduleN` in `content/modules/`) |
| [docs/BUILD.md](docs/BUILD.md) | Node, Build, Akademie-Inhalte |
| [docs/academy-build.md](docs/academy-build.md) | Academy-Build-Pipeline: 2 Commands + 2 Uploads → Videos |
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
Dokumentierte Zielstruktur für das Curriculum: `content/modules/module-00` … `content/modules/module-17` (Modul 0 = Orientation / Introduction).
Neue `.md`-Lektionen dort reichen; die App liest zur Laufzeit. Die
vollstaendige Begriffshierarchie steht in
[docs/academy-structure.md](docs/academy-structure.md).
