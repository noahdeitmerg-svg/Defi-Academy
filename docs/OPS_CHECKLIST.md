# Ops-Checkliste (GitHub Pages + Webhooks, kein VPS)

Kurze Routine fuer stabilen Betrieb, Auto-Import und schnelle Fehlerbehebung.
Alle Builds/Deploys laufen in GitHub Actions.

## Workflows im Repo

| Workflow | Trigger | Zweck |
|----------|---------|-------|
| `Deploy Next.js site to Pages` (`nextjs.yml`) | push `main`, `workflow_dispatch`, `repository_dispatch: pages-deploy` | Content validieren, bauen, auf GitHub Pages deployen |
| `Auto-import curriculum` (`auto-import.yml`) | push auf `Module/**/*.md`, `workflow_dispatch`, `repository_dispatch: content-import` | `Module/modul-*.md` -> `content/modules/` importieren und zurueck committen |

## Vor jedem lokalen Push

1. `npm run import:modules` (nur falls du lokal importieren willst — sonst uebernimmt Auto-Import in GitHub)
2. `npm run check` (enthaelt `validate:content`)
3. `git status` pruefen (nur gewollte Dateien committen)

## Nach jedem Deploy

1. GitHub -> **Actions** -> letzter Run von `Deploy Next.js site to Pages` ist gruen
2. Live-URL oeffnen: `https://noahdeitmerg-svg.github.io/Defi-Academy/`
3. Smoke-Test:
   - Startseite laedt
   - Ein Modul oeffnen
   - Eine Lektion oeffnen (Tabs: Erklaerung/Folien/Video/Uebung)
   - Modul-Quiz-Seite laedt

## Neues Modul hinzufuegen (empfohlener Flow)

1. Datei `Module/modul-NN-<slug>.md` pushen
2. Workflow `Auto-import curriculum` laeuft automatisch, commit landet in `main`
3. Dieser Commit triggert `Deploy Next.js site to Pages`
4. Nach ca. 2 Minuten ist das Modul live

Kein manueller Import noetig. Kein VPS.

## Rebuild ohne Push (Webhook)

Zwei Events sind nutzbar:

- `pages-deploy` -> nur neu bauen/deployen
- `content-import` -> Kurrikulum neu importieren (und danach Deploy via Auto-Commit)

### Windows / PowerShell

```powershell
$env:GITHUB_TOKEN = "<PAT mit Scope repo>"
powershell -ExecutionPolicy Bypass -File .\scripts\trigger-pages-deploy.ps1
# oder mit anderem Event:
powershell -ExecutionPolicy Bypass -File .\scripts\trigger-pages-deploy.ps1 -EventType content-import
```

### bash / curl

```bash
GITHUB_TOKEN=<PAT> bash scripts/trigger-pages-deploy.sh
# oder:
GITHUB_TOKEN=<PAT> EVENT_TYPE=content-import bash scripts/trigger-pages-deploy.sh
```

### Generisch (curl)

```bash
curl -sS -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer GITHUB_TOKEN" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/noahdeitmerg-svg/Defi-Academy/dispatches \
  -d '{"event_type":"pages-deploy","client_payload":{}}'
```

## Externe Dienste als Webhook-Quelle (ohne VPS)

Beliebige Dienste koennen per HTTPS-Request triggern, z. B.:

- **Make.com** / **Zapier** / **n8n Cloud**: HTTP-Modul mit Methode `POST`, URL `https://api.github.com/repos/noahdeitmerg-svg/Defi-Academy/dispatches`, Header `Authorization: Bearer <PAT>`, Body `{"event_type":"pages-deploy"}`
- **GitHub App Installation Token** (fine-grained, ohne persoenlichen PAT)
- **Notion / Airtable / CMS Automations**, die bei Content-Update einen Rebuild anstossen

Token-Minimum: klassischer PAT mit Scope `repo`, oder fine-grained mit `contents:read` + `metadata:read` + Dispatch-Rechten laut Repo-Settings.

## Wenn ein Deploy fehlschlaegt

1. Letzten roten Run in **Actions** oeffnen
2. Fehlerbereich pruefen:
   - `validate:content`: fehlende Lektionsabschnitte/Dateien
   - `next build`: MDX/Next-Fehler
3. Lokal reproduzieren:
   - `npm install`
   - `npm run check`
4. Fix committen -> Deploy laeuft automatisch
