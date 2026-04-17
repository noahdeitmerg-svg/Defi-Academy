# DeFi Academy – bereit zum Bauen (Checkliste)

## 1. Voraussetzungen

- **Node.js 22 LTS** (oder 20+) inkl. **npm**: [nodejs.org](https://nodejs.org/)
- Nach Installation: **Terminal schliessen und neu oeffnen**
- Test: `node -v` und `npm -v`

## 2. Repository

```powershell
git clone https://github.com/noahdeitmerg-svg/Defi-Academy.git
cd Defi-Academy
```

**Cursor** öffnet genau diesen Ordner (ein Repo, ein Arbeitsbaum – siehe [GITHUB.md](GITHUB.md)).

## 3. Dependencies und Qualitaet

```powershell
npm install
npm run check
```

(`check` = lint + TypeScript-Check + `next build` — inkl. statischer Export nach `out/`)

GitHub Pages: [GITHUB_PAGES.md](GITHUB_PAGES.md)

Oder:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\check-build.ps1
```

**Node-Version:** Datei `.nvmrc` enthaelt `22` (optional mit nvm/fnm nutzen).

## 4. Entwicklung

```powershell
npm run dev
```

Browser: **http://localhost:3000**

## 5. Kurrikulum

- **Standard:** `content/modules/<moduleSlug>/*.md` + optional `quiz.json`, `meta.json`
- **Import** grosser `moduleN.md`: `npm run import:modules` (optional `--from "Pfad"`)

## 6. Vercel (optional, oeffentliche URL)

1. [vercel.com](https://vercel.com) – Import **Defi-Academy** von GitHub  
2. Root = Repo-Root (Ordner mit `package.json`)  
3. Deploy – bei jedem Push auf `main` neu bauen  

`vercel.json` ist vorhanden (`framework: nextjs`).

## 7. Bekannte GitHub-Stolpersteine

- **PAT ohne `workflow`:** keine `.github/workflows/*.yml` per Token pushen – siehe [GITHUB.md](GITHUB.md)
