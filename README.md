# DeFi Academy

Next.js-Lernplattform (App Router, Tailwind, Markdown/MDX-Kurrikulum): Module, Lektionen, Quiz, Fortschritt im Browser.

**Repo:** [github.com/noahdeitmerg-svg/Defi-Academy](https://github.com/noahdeitmerg-svg/Defi-Academy)

---

## Schnellstart (lokal bauen)

1. **Node.js 22+** installieren: [nodejs.org](https://nodejs.org/) – danach **neues Terminal**
2. Im Repo-Ordner (mit `package.json`):

```powershell
npm install
npm run dev
```

3. Browser: **http://localhost:3000**

Optional vor dem ersten Commit:

```powershell
npm run check
```

oder:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\check-build.ps1
```

(`npm run check` = lint + TypeScript + Production-Build)

---

## Zwei Arbeitsordner (bei dir auf Windows)

| Ort | Rolle |
|-----|--------|
| `C:\Users\noahd\defi-academy` | Arbeitskopie / Cursor |
| `C:\Users\noahd\Documents\GitHub\Defi-Academy` | Git-Klon fuer `git push` |

Sync: im **Arbeits**-Ordner:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\sync-to-github-clone.ps1
```

Dann im **GitHub**-Ordner: `git add` / `commit` / `push` (Details: [docs/GITHUB.md](docs/GITHUB.md)).

---

## Weitere Doku

| Datei | Inhalt |
|-------|--------|
| [docs/BUILD.md](docs/BUILD.md) | Checkliste: Node, build, Vercel, Kurrikulum |
| [docs/GITHUB.md](docs/GITHUB.md) | Git, PAT, Push-Probleme, Sync |
| `scripts/import-modules.ts` | Grosse `moduleN.md` nach `content/modules/` splitten |

---

## Vercel (optional)

Repo bei Vercel importieren, Root = dieser Ordner, Branch `main`. `vercel.json` enthaelt `"framework": "nextjs"`.

---

## Kurrikulum

Inhalt unter **`content/modules/`** (siehe Beispiel `module1/`). Neue Markdown-Dateien dort reichen fuer neue Lektionen (App liest zur Laufzeit).
