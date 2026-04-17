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

`npm run start` (Next-Server) gibt es bei reinem Static Export nicht; zum Testen des `out/`-Ordners z. B. `npx serve out`.

## Wichtig: `.nojekyll`

Datei `public/.nojekyll` sorgt dafür, dass GitHub Pages den Ordner `_next/` nicht von Jekyll ignoriert.

## Push mit Personal Access Token

Wenn GitHub den Push der Workflow-Datei mit einem PAT ablehnt, Token um Scope **`workflow`** erweitern oder per **SSH** / **GitHub Desktop** pushen.

---

## Deploy per Webhook (ohne Push)

Der Workflow reagiert zusätzlich auf **`repository_dispatch`** mit dem Event-Typ **`pages-deploy`**. So kann ein externer Dienst (oder ein GitHub-Repo-Webhook, der an deinen Server feuert und dort diesen Aufruf auslöst) einen neuen Pages-Build starten.

**Voraussetzungen:** GitHub-PAT mit Scope **`repo`** (klassisch) bzw. für Fine-grained: **Contents** read + **Metadata** read, und für Dispatches ggf. **Actions** / passende Workflow-Berechtigung je nach Org-Policy.

**Beispiel (curl):**

```bash
curl -sS -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer GITHUB_TOKEN" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/noahdeitmerg-svg/Defi-Academy/dispatches \
  -d '{"event_type":"pages-deploy","client_payload":{}}'
```

`GITHUB_TOKEN` durch ein PAT oder ein **GitHub App**-Installationstoken ersetzen. Nach erfolgreichem Lauf erscheint der Lauf unter **Actions** wie bei einem Push auf `main`.

**Hinweis:** `workflow_dispatch` kann alternativ per API getriggert werden (`POST .../actions/workflows/nextjs.yml/dispatches` mit `ref: main`); dafür braucht das Token typischerweise **`workflow`**-Scope. `repository_dispatch` ist oft einfacher für schlanke „nur neu bauen“-Webhooks.
