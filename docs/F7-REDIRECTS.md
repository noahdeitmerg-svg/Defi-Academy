# F7 — Redirect-Artefakte (Generator)

**Mapping-Quelle:** [`docs/F7-MAPPING.md`](./F7-MAPPING.md) §1.4 A  
**Generator:** `node scripts/generate-f7-redirects.js`

---

## 1. Ausgaben

| Datei | Zweck |
|--------|--------|
| `config/f7-redirects.generated.json` | Liste inkl. `source` / `destination` (ohne `basePath`) |
| `config/f7-next-redirects.snippet.js` | `module.exports = [ … ]` zum manuellen Einfügen in `next.config` → `redirects()` |
| `config/f7-netlify-redirects.txt` | Netlify `_redirects`-Format (`/alt /neu 301`) — auch für einige andere Static-Host-Adapter nutzbar |

---

## 2. Wichtig: GitHub Pages + `output: "export"`

Next.js **unterstützt bei statischem Export keine** `redirects()` / `rewrites()` in `next.config` (siehe [Static Exports – Unsupported](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)).  
Das Snippet ist **Vorbereitung** für:

- späteren Betrieb mit Node-Server / Vercel, **oder**
- manuelle Übernahme in **Host-Regeln** (CDN Worker, nginx, Cloudflare).

Für **github.io** ohne Edge-Layer: Optionen sind z. B. HTML-Stub-Seiten mit Meta-Refresh (nicht Teil dieses Generators) oder externe 301 auf CDN — **erst nach** Product-Owner-Freigabe Phase 3+.

---

## 3. `basePath` (Repo `/Defi-Academy`)

Lokal ohne `GITHUB_PAGES`: Pfade wie `/module/…`.  
Auf Pages: öffentliche URLs beginnen mit `/Defi-Academy/…`. Jede Host-Regel muss den **gleichen Präfix** voranstellen wie `next.config` `basePath`. Der Generator schreibt **ohne** Präfix; beim Deploy-Skript Präfix ergänzen oder `destination` inkl. Subpath wählen.

---

## 4. Testplan (manuell / CI)

1. **Generator**
   ```bash
   node scripts/generate-f7-redirects.js
   ```
   Erwartung: Exit 0, Konsolenzeile `OK: <N> Redirects`.

2. **Konsistenz**
   - `jq '.count == (.redirects | length)' config/f7-redirects.generated.json` → `true`
   - Stichprobe: Zeile aus F7 Tabelle A (z. B. `4-2`) = JSON-Eintrag `source: "/module/module4/lesson/4-2"`, `destination: "/kurs/04-dex-mechanik/02-lektion"`.

3. **Netlify-Datei**
   - Erste Zeile enthält zwei Pfade + `301`.

4. **Smoke (nach echtem Redirect-Hosting)**  
   `curl -I https://<host>/module/module1/lesson/1-1` → `301` / `308` mit `Location` auf `/kurs/01-defi-grundlagen/01-was-ist-defi` (ggf. mit `basePath`).

5. **Next snippet (nur wenn kein reiner static export)**  
   Snippet in `next.config.ts` einbinden, `next build` ohne `output: "export"` testen.

---

## 5. Modul 17

Solange es **keine** Legacy-Route `/module/module17/lesson/…` gibt, erzeugt der Parser **keine** M17-Zeilen aus Tabelle A. Tabelle B (FINAL.md) ist für **Content-Split** (`scripts/split-modul-17.mjs`), nicht für Legacy-301 — Redirects für M17 folgen nach UX-Anlage + Entscheid URL-Schema.
