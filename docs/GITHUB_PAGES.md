# GitHub Pages (statischer Next-Export)

Die App baut als **statische Dateien** (`next build` mit `output: "export"`, Ordner `out/`).

## Einmalig im GitHub-Repo

1. **Settings** → **Pages**
2. Unter **Build and deployment** → **Source**: **GitHub Actions** wählen (nicht „Deploy from a branch“).
3. Auf **main** pushen. Der Workflow liegt unter **`.github/workflows/nextjs.yml`**.

Nach dem ersten erfolgreichen Lauf steht die Seite unter:

**https://noahdeitmerg-svg.github.io/Defi-Academy/**

(Pfad `/Defi-Academy/` entspricht dem **Repository-Namen**. Umbenennen des Repos → in `next.config.ts` `repoBasePath` anpassen und in **`.github/workflows/nextjs.yml`** die Variable **`NEXT_PUBLIC_SITE_URL`** auf dieselbe öffentliche URL setzen.)

Der Pages-Workflow setzt **`GITHUB_PAGES=true`** und **`NEXT_PUBLIC_SITE_URL`**, damit `metadataBase` in `app/layout.tsx` (Open-Graph u. a.) zur echten Pages-URL passt.

## Lokale Entwicklung

- **`npm run dev`** – wie gewohnt unter `http://localhost:3000` (ohne `basePath`).
- **`npm run build`** – erzeugt `out/` ohne GitHub-`basePath` (für lokale Prüfung).
- **`GITHUB_PAGES=true npm run build`** – gleicher Export **mit** `basePath` wie auf GitHub Pages.
- **`npm run validate:content`** – prüft alle Lektionsdateien auf Pflichtabschnitte.

`npm run start` (Next-Server) gibt es bei reinem Static Export nicht; zum Testen des `out/`-Ordners z. B. `npx serve out`.

## Wichtig: `.nojekyll`

Datei `public/.nojekyll` sorgt dafür, dass GitHub Pages den Ordner `_next/` nicht von Jekyll ignoriert.

## Push mit Personal Access Token

Wenn GitHub den Push der Workflow-Datei mit einem PAT ablehnt, Token um Scope **`workflow`** erweitern oder per **SSH** / **GitHub Desktop** pushen.

---

## Automatisierung via GitHub (kein VPS noetig)

Zwei Workflows arbeiten zusammen:

1. **`Auto-Import Akademie-Inhalte`** (`.github/workflows/auto-import.yml`) – läuft bei jedem Push auf `Module/**/*.md`, importiert Moduldateien nach `content/modules/` und committet das Ergebnis zurück auf `main`.
2. **`Deploy Next.js site to Pages`** (`.github/workflows/nextjs.yml`) – läuft beim nächsten Push auf `main` (also u. a. nach dem Auto-Import-Commit) und deployt.

Daraus ergeben sich drei Wege, einen Rebuild auszulösen:

- **Push** einer neuen/aktualisierten Datei unter `Module/modul-*.md` → Auto-Import → Deploy
- **Webhook** (`repository_dispatch`) mit Event `pages-deploy` → nur Deploy
- **Webhook** (`repository_dispatch`) mit Event `content-import` → Auto-Import (+ automatischer Folge-Deploy)

## Agent / Cursor: ohne manuellen Merge auf `main` live gehen

Wenn `main` geschützt ist oder du **nur einen festen Zweig** pushen willst:

1. **Arbeitszweig:** `cursor/publish-live` (einmal von `main` abzweigen, danach immer wieder nutzen).
2. **Push:** Änderungen auf `cursor/publish-live` pushen → Workflow **„Merge Live Branch → main“** (`.github/workflows/merge-live-to-main.yml`) merged nach `main` und stößt danach **`pages-deploy`** an (wie beim Auto-Import, weil Token-Pushes keinen Folge-Workflow garantieren).
3. **Webhook / Remote:** Ohne lokalen Git-Push kann ein PAT dasselbe auslösen:

```powershell
$env:GITHUB_TOKEN = "<PAT>"
powershell -ExecutionPolicy Bypass -File .\scripts\trigger-merge-live.ps1
# anderer Quell-Zweig:
powershell -ExecutionPolicy Bypass -File .\scripts\trigger-merge-live.ps1 -Branch "cursor/cleanup-pipeline-tmp-artifacts"
```

```bash
export GITHUB_TOKEN=<PAT>
bash scripts/trigger-merge-live.sh
BRANCH=cursor/meine-branch bash scripts/trigger-merge-live.sh
```

`client_payload.branch` muss mit **`cursor/`** beginnen (Sicherheitsregel im Workflow).

**Hinweis:** Wenn du weiterhin **direkt auf `main` pushen** darfst, reicht ein normaler Push — der Pages-Workflow startet ohne Merge-Job. Die `merge-live`-Route ist die Alternative ohne Schreibzugriff auf `main` vom lokalen Rechner.

### Modul-Videos: ein Befehl (Pipeline + `public/` + optional Push)

Im **Repo-Root** `Defi-Academy` (nicht in `pipeline-test` allein):

```powershell
cd C:\Users\noahd\Documents\GitHub\Defi-Academy
npm run videos:module -- --module 2
npm run videos:module -- --module 2 --live
```

`--live` aktualisiert `config/lesson-audio-durations.json`, committet `public/videos` (+ Poster, falls vorhanden) und **pusht** den aktuellen Branch. Skript: `scripts/batch-module-videos.js` (`--help`). Voraussetzung: `ELEVENLABS_*` in `.env`, ffmpeg/ffprobe wie in `pipeline-test` üblich.

## Deploy per Webhook (ohne Push)

**Voraussetzungen:** GitHub-PAT mit Scope **`repo`** (klassisch) bzw. für Fine-grained: **Contents** read + **Metadata** read, und für Dispatches passende Repo-Berechtigung.

**Bequeme Helfer-Skripte im Repo:**

```powershell
# Windows / PowerShell
$env:GITHUB_TOKEN = "<PAT>"
powershell -ExecutionPolicy Bypass -File .\scripts\trigger-pages-deploy.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\trigger-pages-deploy.ps1 -EventType content-import
```

```bash
# bash
GITHUB_TOKEN=<PAT> bash scripts/trigger-pages-deploy.sh
GITHUB_TOKEN=<PAT> EVENT_TYPE=content-import bash scripts/trigger-pages-deploy.sh
```

**Roh-Beispiel (curl):**

```bash
curl -sS -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer GITHUB_TOKEN" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/noahdeitmerg-svg/Defi-Academy/dispatches \
  -d '{"event_type":"pages-deploy","client_payload":{}}'
```

**Merge-Live (Webhook):** einen `cursor/*`-Zweig nach `main` mergen und anschließend den Pages-Build anstoßen:

```bash
curl -sS -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer GITHUB_TOKEN" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/noahdeitmerg-svg/Defi-Academy/dispatches \
  -d '{"event_type":"merge-live","client_payload":{"branch":"cursor/publish-live"}}'
```

`GITHUB_TOKEN` durch ein PAT oder ein **GitHub App**-Installationstoken ersetzen. Nach erfolgreichem Lauf erscheint der Lauf unter **Actions** wie bei einem Push auf `main`.

**Hinweis:** `workflow_dispatch` kann alternativ per API getriggert werden (`POST .../actions/workflows/nextjs.yml/dispatches` mit `ref: main`); dafür braucht das Token typischerweise **`workflow`**-Scope. `repository_dispatch` ist oft einfacher für schlanke „nur neu bauen“-Webhooks.

**Externe Quellen (SaaS, kein VPS):** Make.com, Zapier, n8n Cloud, Notion-Automations, CMS-Webhooks usw. können den obigen HTTP-Call direkt ausführen.

## Ops-Routine

Kompakte Betriebs- und Smoke-Test-Checkliste: [OPS_CHECKLIST.md](OPS_CHECKLIST.md)
