# DeFi Academy – bereit zum Bauen (Checkliste)

**Agenten:** Gesamtstand und Doku-Index — [`docs/AGENTEN-HANDBUCH.md`](./AGENTEN-HANDBUCH.md). Nach Änderungen am Repo: [`docs/AGENT-DOKUMENTATION-SYNC.md`](./AGENT-DOKUMENTATION-SYNC.md).

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

(`check` = Content-Validation + lint + TypeScript-Check + `next build` — inkl. statischer Export nach `out/`)

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

## 5. Akademie-Inhalte

- **Legacy-Kurs (`/module/…`):** `content/modules/module1` … `module17` — `*.md` + optional `quiz.json`, `meta.json`
- **UX-Kurs (`/kurs/…`):** Slug-Ordner z. B. `content/modules/01-defi-grundlagen/` mit `module.json` und Unterordnern pro Lektion (`lesson.md`, `slides.json`, `quiz.json`); **Key Takeaways** zentral in `content/takeaways.json` (siehe `docs/KEY-TAKEAWAYS.md`)
- **Import** grosser `moduleN.md`: `npm run import:modules` (optional `--from "Pfad"`)
- **Begriffshierarchie** (Module / Lektionen / Videos / Quiz / Praxisuebungen): [academy-structure.md](academy-structure.md)

## 6. Oeffentliche URL: GitHub Pages

Kein Vercel: Deploy nur über **GitHub Actions** → **Pages** (`out/` als Artifact). Anleitung und Webhook: [GITHUB_PAGES.md](GITHUB_PAGES.md).

## 7. Bekannte GitHub-Stolpersteine

- **PAT ohne `workflow`:** keine `.github/workflows/*.yml` per Token pushen – siehe [GITHUB.md](GITHUB.md)

## 8. Betrieb/Smoke-Tests

Siehe [OPS_CHECKLIST.md](OPS_CHECKLIST.md) fuer Deploy-Routine, Webhook-Rebuild und schnelle Fehlersuche.
