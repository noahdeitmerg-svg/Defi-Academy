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

## Weitere Doku

| Datei | Inhalt |
|-------|--------|
| [docs/BUILD.md](docs/BUILD.md) | Node, Build, Vercel, Kurrikulum |
| [docs/GITHUB.md](docs/GITHUB.md) | Klonen, Push, PAT, optional Sync |
| `scripts/import-modules.ts` | Große `moduleN.md` nach `content/modules/` |

## GitHub Pages (optional)

Statischer Build + GitHub Actions: [docs/GITHUB_PAGES.md](docs/GITHUB_PAGES.md)

## Vercel (optional)

Repo verbinden, Root = dieser Ordner, Branch `main`. `vercel.json`: `"framework": "nextjs"`. (Funktioniert weiterhin mit `output: "export"`.)

## Kurrikulum

Inhalt unter **`content/modules/`**. Neue `.md`-Lektionen dort reichen; die App liest zur Laufzeit.
