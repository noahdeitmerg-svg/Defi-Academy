# Nutzer:innen-Vertrauen und Antivirus-Meldungen (z. B. Avira)

Kurzfassung: **Keine Website kann verhindern, dass ein installierter Client-Virenscanner
eine Warnung anzeigt.** Das passiert in der Regel per **URL-Reputation** oder
**Heuristik** (Stichworte wie DeFi, Wallet, Crypto). Ihr könnt aber **False Positives
abbauen** und die Seite **professionell absichern**.

## 1. Typische Ursachen bei DeFi-/Bildungsprojekten

- **Thema „DeFi / Krypto“** — manche Filter listen ganze Kategorien streng.
- **GitHub Pages (`*.github.io`)** — geteiltes Reputationsspektrum; einzelne
  missbrauchte Pages können Scoring beeinflussen.
- **Neue oder selten besuchte Domain** — wenig Verlauf in Reputationsdatenbanken.
- **Fehlende Security-Signale** — kein Impressum/Datenschutz, kein Security-Kontakt.

## 2. Sofort-Maßnahmen (ohne Code)

1. **URL prüfen** (ohne Panik): [VirusTotal](https://www.virustotal.com) — Domain
   oder genaue Seiten-URL einreichen und Ergebnis dokumentieren.
2. **Google Safe Browsing** (Suchmaschinen-/Chrome-Nutzer:innen):  
   [Google Transparency Report](https://transparencyreport.google.com/safe-browsing/search)
3. **Avira False Positive melden** — im Avira-Portal/Support nach
   „False Positive URL“ / „Website blockiert“ suchen und die **konkrete URL**
   melden (Screenshots + kurze Projektbeschreibung „statische Lernplattform“).
4. **Eigene Domain** (`www…`) mit TLS vor GitHub Pages legen (z. B. Cloudflare)
   verbessert oft Reputation und erlaubt **HTTP-Response-Header** (siehe unten).

## 3. Technische Maßnahmen in diesem Repo

- **`public/_headers`** — wird bei Deployments auf **Cloudflare Pages** oder
  **Netlify** ausgewertet (`X-Content-Type-Options`, `Referrer-Policy`, …).  
  **GitHub Pages** ignoriert diese Datei — dort braucht ihr einen **Reverse Proxy**
  (z. B. Cloudflare vor `*.github.io` oder Custom Domain mit Cloudflare DNS).
- **`public/.well-known/security.txt`** — zeigt Security-Kontakt (hier:
  GitHub „Security“-Tab). Bitte bei Bedarf anpassen.
- **`npm audit`** und **keine unnötigen Drittanbieter-Skripte** im `<head>`
  halten die Angriffsfläche klein.

## 4. Kommunikation an Nutzer:innen

Wenn eine Meldung auftritt: kurz erklären, dass es sich um einen **Filter auf dem
Rechner** handelt, nicht um eine bestätigte Schadsoftware auf dem Server; Link
zur **offiziellen Domain** + Impressum geben; ggf. vorübergehend anderen Browser
ohne diese Erweiterung testen.

## 5. Was **nicht** hilft

- „Vertrauens-Badge“-Skripte von Drittanbietern einbinden — oft **kontraproduktiv**
  (zusätzliche Domains, Datenschutz, wieder neue False Positives).
- Versprechen „100 % frei von Scanner-Warnungen“ — technisch nicht haltbar.
