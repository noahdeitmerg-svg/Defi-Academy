# Ops-Checkliste (GitHub Pages + Webhook)

Kurze Routine fuer stabilen Betrieb und schnelle Fehlerbehebung.

## Vor jedem Push

1. `npm run import:modules` (falls neue/aktualisierte Moduldateien vorliegen)
2. `npm run check` (enthaelt jetzt auch `validate:content`)
3. `git status` pruefen (nur gewollte Dateien committen)

## Nach jedem Deploy

1. GitHub -> **Actions** -> letzter Run von `Deploy Next.js site to Pages` ist gruen
2. Live-URL oeffnen: `https://noahdeitmerg-svg.github.io/Defi-Academy/`
3. Smoke-Test:
   - Startseite laedt
   - Ein Modul oeffnen
   - Eine Lektion oeffnen (Tabs: Erklaerung/Folien/Video/Uebung)
   - Modul-Quiz-Seite laedt

## Webhook-Rebuild (ohne Push)

Workflow-Trigger:
- `repository_dispatch` mit `event_type=pages-deploy`

Beispiel:

```bash
curl -sS -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer GITHUB_TOKEN" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/noahdeitmerg-svg/Defi-Academy/dispatches \
  -d '{"event_type":"pages-deploy","client_payload":{}}'
```

## Wenn ein Deploy fehlschlaegt

1. Letzten roten Run in **Actions** oeffnen
2. Fehlerbereich pruefen:
   - `npm run validate:content`: fehlende Lektionsabschnitte/Dateien
   - `npm run build`: Next/MDX Build-Fehler
3. Lokal reproduzieren:
   - `npm install`
   - `npm run check`
4. Fix committen und erneut pushen
