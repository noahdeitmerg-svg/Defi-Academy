# GitHub Pages (statischer Next-Export)

Die App baut als **statische Dateien** (`next build` mit `output: "export"`, Ordner `out/`).

## Einmalig im GitHub-Repo

1. **Settings** → **Pages**
2. Unter **Build and deployment** → **Source**: **GitHub Actions** wählen (nicht „Deploy from a branch“).
3. Auf **main** pushen. Der Workflow liegt unter **`.github/workflows/nextjs.yml`**.

Nach dem ersten erfolgreichen Lauf steht die Seite unter:

**https://noahdeitmerg-svg.github.io/Defi-Academy/**

(Pfad `/Defi-Academy/` entspricht dem **Repository-Namen**. Umbenennen des Repos → in `next.config.ts` `repoBasePath` anpassen.)

## Lokale Entwicklung

- **`npm run dev`** – wie gewohnt unter `http://localhost:3000` (ohne `basePath`).
- **`npm run build`** – erzeugt `out/` ohne GitHub-`basePath` (für lokale Prüfung).
- **`GITHUB_PAGES=true npm run build`** – gleicher Export **mit** `basePath` wie auf GitHub Pages.

`npm run start` (Next-Server) gibt es bei reinem Static Export nicht; zum Testen des `out/`-Ordners z. B. `npx serve out`.

## Wichtig: `.nojekyll`

Datei `public/.nojekyll` sorgt dafür, dass GitHub Pages den Ordner `_next/` nicht von Jekyll ignoriert.

## Push mit Personal Access Token

Wenn GitHub den Push der Workflow-Datei mit einem PAT ablehnt, Token um Scope **`workflow`** erweitern oder per **SSH** / **GitHub Desktop** pushen.
