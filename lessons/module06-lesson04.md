# Compound und Morpho: Alternative Designs

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Compound V3 von Aave V3 unterscheiden
- Morphos Peer-to-Peer-Matching-Modell verstehen
- Entscheiden, wann welches Protokoll für konservative Strategien geeignet ist
- Compound V3s "Base Asset"-Architektur (USDC-Markt, ETH-Markt, etc.) in ihrer Isolationswirkung nachvollziehen
- Morpho Blue als modulares, immutable Lending-Primitive konzeptionell einordnen und von Aave/Compound abgrenzen
- Eine Protokoll-Auswahl basierend auf TVL, Audit-Historie, Governance-Struktur und Rendite für konkrete Supply-Strategien treffen

## Erklärung

Aave ist nicht alternativlos. Compound war das ursprüngliche Benchmark, Morpho hat das Modell mit P2P-Matching weiterentwickelt, und beide haben Nischen, in denen sie attraktive Alternativen sind.

**Compound: Der Pionier**

Compound war das erste große Pool-based Lending-Protokoll, gestartet 2018. Die Architektur prägte den DeFi-Standard. Ab Compound V3 (gestartet 2022) hat das Protokoll sein Design fundamental überarbeitet.

**Compound V2 (altes Modell):**
- Alle Assets in einem gemeinsamen Pool
- Beliebiges Borrowing gegen beliebige Collaterals
- cTokens als zinsbringende Receipts

**Compound V3 (aktuell, "Comet"):**
- **Ein Pool pro Base-Asset** — z.B. USDC-Comet, USDT-Comet, WETH-Comet
- Borrower leihen **nur den Base-Asset** des jeweiligen Comets
- Collaterals werden unterstützt, aber Collateral-Assets verdienen **keine** Zinsen (wichtige Abweichung von V2 und Aave)
- Nur der Base-Asset verdient Supply-Zinsen

**Praktische Konsequenz:**

Auf Compound V3 USDC-Comet:
- Supplier zahlen USDC ein → verdienen Zinsen auf die USDC
- Borrower hinterlegen ETH, WBTC, etc. → keine Zinsen auf Collateral, aber Erlaubnis, USDC zu borgen
- Das vereinfacht die Risikostruktur — Supplier sind nur dem Base-Asset-Markt ausgesetzt

**Konservative Perspektive:**
- Compound V3 USDC-Comet kann für reine USDC-Supplier interessant sein
- Supply-Raten oft leicht unterschiedlich zu Aave (mal höher, mal niedriger)
- Weniger Features als Aave (kein E-Mode, kein Isolation Mode, weniger Assets)
- Nützlich zur Diversifikation: nicht alles auf ein Protokoll

**Morpho: Das P2P-Overlay**

Morpho startete als **Optimierungslayer über Aave und Compound**. Die Idee: P2P-Matching, wenn möglich; Pool-Fallback, wenn nicht.

**Wie es funktioniert:**

In klassischem Pool-Lending:
- Supplier zahlt 100 USDC ein → bekommt 3% APY
- Borrower leiht 100 USDC → zahlt 5% APY
- Der Spread (2%) geht in den Pool (Reserve Factor + Utilization-Verlust)

In Morpho P2P:
- Supplier und Borrower werden direkt gematcht
- Beide bekommen einen Zinssatz **zwischen** Pool-Supply und Pool-Borrow
- Supplier: 4% APY (statt 3%)
- Borrower: 4% APY (statt 5%)
- Beide profitieren

**Morpho Blue (aktuelle Version, 2024+):**

Morpho hat sich von Optimizer zu eigenständigem Protokoll entwickelt. Morpho Blue ist ein minimalistisches Lending-Primitive, auf dem **Lending-Märkte** konfigurierbar deployt werden. Jeder Markt hat:
- Ein Loan-Asset
- Ein Collateral-Asset
- Ein Oracle
- Eine LLTV (Liquidation LTV)
- Einen Interest Rate Model

**Warum das für konservative Supplier relevant ist:**

**Vaults:** Auf Morpho Blue werden **Meta-Vaults** gebaut, die Kapital über mehrere Märkte allokieren — verwaltet von Vault-Kuratoren (z.B. Steakhouse Financial, Gauntlet, Re7). Diese Vaults sind praktisch aktiv gemanagte Lending-Strategien mit Reportings.

**Beispiel:**
Ein "USDC Conservative Vault" könnte Kapital über 5–10 verschiedene Morpho-Blue-Märkte allokieren, mit definierten Risikogrenzen pro Markt. Der Vault-Kurator überwacht die Märkte kontinuierlich.

**Für Supplier:**
- Einfacher Zugriff (eine Einzahlung, automatisiert allokiert)
- Oft höhere Rendite als direktes Aave-Supply (1–3% mehr)
- Zusätzliches Risiko: Vault-Kurator kann falsche Entscheidungen treffen
- Audit-Status und Kurator-Reputation wichtig zu prüfen

**Wann welches Protokoll**

Für einen konservativen Supplier mit USDC-Kapital:

**Aave V3:**
- Am längsten etabliert, größte TVL, robustester Track-Record
- Standard-Wahl für die Mehrheit der Supply-Position

**Compound V3:**
- Diversifikation, wenn man nicht alles auf Aave haben will
- Einfachere Architektur kann übersichtlicher sein

**Morpho Blue (direkt oder via Vault):**
- Höhere Rendite möglich
- Weniger reifer Track-Record als Aave
- Gute Option für moderates Risiko-Budget

**Spark (Fork von Aave, von MakerDAO verbunden):**
- Auf Ethereum, zentrale Liquiditätsquelle für DAI-Borrowing gegen sDAI
- Nicht separat behandelt hier, aber erwähnenswert für DAI-zentrierte Strategien

**Diversifikations-Strategie**

Ein realistischer Ansatz für größere Stablecoin-Supply-Positionen:
- **50% Aave V3** (Marktführer, höchste Resilienz)
- **25% Compound V3** (Diversifikation, etabliertes Protokoll)
- **15% Morpho Blue Vault** (moderat höhere Rendite)
- **10% Reserve auf CEX/Wallet** (schnelle Liquidität)

Diese Aufteilung kann je nach Risiko-Toleranz angepasst werden, aber das Grundprinzip — **nicht alles auf ein Protokoll** — ist für jede größere Position sinnvoll.

## Folien-Zusammenfassung

**[Slide 1] — Titel**
Compound und Morpho: Alternative Designs

**[Slide 2] — Compound V3 "Comet"**
Ein Pool pro Base-Asset.
Borrower leihen nur den Base-Asset.
Collaterals verdienen keine Zinsen.

**[Slide 3] — Morpho: P2P-Overlay**
Matching zwischen Supplier und Borrower.
Beide bekommen bessere Raten als im Pool.

**[Slide 4] — Morpho Blue**
Minimalistisches Lending-Primitive.
Märkte frei konfigurierbar.
Vaults als automatisierte Strategien.

**[Slide 5] — Protokoll-Vergleich**
Aave V3: Etabliert, Featurenreich
Compound V3: Einfacher, separiert
Morpho Blue: Innovativ, höhere Renditen möglich

**[Slide 6] — Diversifikations-Ansatz**
50% Aave V3
25% Compound V3
15% Morpho Blue
10% Reserve

## Sprechertext

**[Slide 1]** Aave ist der Marktführer, aber nicht die einzige Option. Compound war der Pionier, Morpho hat das Modell weiterentwickelt. Beide haben Nischen, in denen sie attraktive Alternativen sind — besonders aus Diversifikationsgründen.

**[Slide 2]** Compound V3, die aktuelle Version, hat sein Design fundamental überarbeitet. Statt einem gemeinsamen Pool für alle Assets gibt es einen Pool pro Base-Asset. Ein USDC-Comet, ein USDT-Comet, ein WETH-Comet. Borrower können nur den Base-Asset dieses Comets leihen. Collaterals werden unterstützt, verdienen aber keine Zinsen — anders als bei Aave. Für reine Supplier ist das eine übersichtliche Struktur.

**[Slide 3]** Morpho startete als Optimierungslayer über Aave und Compound. Die Grundidee: P2P-Matching wenn möglich. In klassischem Pool-Lending zahlt der Borrower 5 Prozent und der Supplier bekommt 3 Prozent — der Spread geht in den Pool-Mechanismus. In Morpho P2P werden beide direkt gematcht und bekommen Raten zwischen Pool-Supply und Pool-Borrow. Beispiel: Supplier 4 Prozent, Borrower 4 Prozent. Beide profitieren vom Spread.

**[Slide 4]** Morpho Blue ist die aktuelle, eigenständige Version von Morpho. Ein minimalistisches Lending-Primitive — wenige Dutzend Zeilen Kerncode — auf dem beliebige Lending-Märkte konfigurierbar deployt werden können. Jeder Markt definiert Loan-Asset, Collateral-Asset, Oracle, LLTV und Interest Rate Model. Darauf bauen Vaults — Meta-Strategien, die Kapital automatisch über mehrere Märkte allokieren, verwaltet von Kuratoren wie Steakhouse Financial, Gauntlet oder Re7. Für Supplier ein einfacher Zugriff mit oft höherer Rendite als direktes Aave-Supply.

**[Slide 5]** Der Vergleich. Aave V3 ist am längsten etabliert, hat die größte TVL und den robustesten Track-Record. Standard-Wahl für die Mehrheit der Position. Compound V3 ist einfacher, aber ebenfalls etabliert — Diversifikationsoption. Morpho Blue ist innovativ, bietet potenziell höhere Renditen, hat aber weniger reifen Track-Record. Gute Option für einen Teil der Position mit moderatem Risiko-Budget.

**[Slide 6]** Ein konservativer Diversifikations-Ansatz für Stablecoin-Supply. 50 Prozent Aave V3 als Kern. 25 Prozent Compound V3 zur Diversifikation. 15 Prozent Morpho Blue Vault für moderat höhere Renditen. 10 Prozent Reserve auf CEX oder in Wallet für schnelle Liquidität. Das Grundprinzip: nicht alles auf ein Protokoll. Protokoll-Risiko ist real, auch bei etablierten Namen.

## Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Compound-V3-Architektur-Diagramm: mehrere separate Comets, jeweils mit einem Base-Asset.

**[Slide 3]** Diagramm P2P-Matching: Supplier direkt mit Borrower verbunden, Zinssatz zwischen Pool-Supply und Pool-Borrow.

**[Slide 4]** Morpho-Blue-Vault-Architektur: Vault → mehrere Märkte → verschiedene Loan/Collateral-Kombinationen. **SCREENSHOT SUGGESTION:** app.morpho.org mit Vault-Übersicht.

**[Slide 5]** Drei-Spalten-Vergleichstabelle: Aave V3 / Compound V3 / Morpho Blue mit Charakteristika.

**[Slide 6]** Portfolio-Kuchendiagramm mit der 50/25/15/10 Aufteilung.

## Übung

**Aufgabe: Cross-Protokoll-Vergleich für USDC-Supply**

1. Sammle aktuelle USDC-Supply-Raten von:
 - Aave V3 (Ethereum) — app.aave.com
 - Compound V3 USDC Comet — app.compound.finance
 - Morpho Blue ausgewählter Vault — app.morpho.org
 - Sky (ehemals MakerDAO) sDAI — app.spark.fi oder makerburn.com
 - Ein Curve-Pool mit USDC — defillama.com/yields

2. Dokumentiere für jeden:
 - Aktuelle Supply-Rate
 - Mechanismus (wie entsteht die Rendite?)
 - Hauptrisiken (3–4 Punkte)

3. Erstelle ein Risk-Return-Diagramm (Skizze): y-Achse Rendite, x-Achse subjektives Risiko.

**Deliverable:** Tabelle + Diagramm. Kurze Analyse (5–8 Sätze): Welcher Mix aus diesen Optionen wäre für ein 20.000 USD konservatives Portfolio geeignet?

## Quiz

**Frage 1:** Was ist der wesentliche Unterschied zwischen Compound V3 und Aave V3 in Bezug auf Collateral-Assets?

<details>
<summary>Antwort anzeigen</summary>

In Aave V3 verdienen Collateral-Assets weiterhin Supply-Zinsen, auch wenn sie als Sicherheit dienen. Das bedeutet: Ein Nutzer, der 10 ETH als Collateral hinterlegt, bekommt aWETH-Zinsen zusätzlich zu der Nutzungsmöglichkeit als Sicherheit. In Compound V3 verdienen Collateral-Assets **keine** Zinsen — sie dienen nur als Sicherheit. Nur der Base-Asset des jeweiligen Comets (z.B. USDC im USDC-Comet) verdient Supply-Zinsen. Das ist ein architektonischer Trade-off: Compound V3 hat dafür eine vereinfachte, isoliertere Risikostruktur. Für reine Supplier ist das weniger relevant, weil sie ohnehin nur den Base-Asset supplien. Für Borrower, die beide Seiten nutzen, hat Aave V3 hier einen Vorteil.
</details>

**Frage 2:** Ein Morpho-Blue-Vault erzielt 2% höhere Rendite als direkte Aave-Supply. Welches Zusatzrisiko akzeptierst du dafür?

<details>
<summary>Antwort anzeigen</summary>

Mindestens drei zusätzliche Risikoquellen. Erstens: Vault-Kurator-Risiko. Der Kurator trifft Allokations-Entscheidungen. Falsche Entscheidungen (z.B. zu aggressive Allokation auf volatile Märkte) können zu Verlusten führen. Zweitens: zusätzliche Smart-Contract-Ebene. Der Vault ist ein eigener Contract, der zusätzlich zum Morpho-Blue-Protokoll geprüft werden muss. Das erhöht die Angriffsfläche. Drittens: konzentrierte Markt-Exposition. Morpho-Blue-Märkte sind isolierter als Aave-Pools — wenn ein spezifischer Markt im Vault Probleme bekommt (z.B. Oracle-Ausfall, Collateral-Depeg), wird der Vault direkt betroffen. Ob die 2% mehr Rendite diese zusätzlichen Risiken wert sind, hängt vom Kurator-Track-Record, den Audit-Reports und der eigenen Risiko-Toleranz ab. Für einen Teil eines diversifizierten Portfolios kann es sinnvoll sein; als Hauptallokation ist es meist zu konzentriert.
</details>

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → Compound V3 Base-Asset-Architektur → Compound vs. Aave → Morpho-P2P-Matching → Morpho Blue Primitive → Vault-Ökosystem → Protokoll-Auswahl-Matrix
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 10–12 Min.)
- `visual_plan.json` — Compound-V3-Interface-Screenshot, Morpho-P2P-Matching-Diagramm, Morpho-Blue-Modular-Architecture, Vault-Kurator-Struktur, Protokoll-Vergleichstabelle (TVL/Audit/Governance)

Pipeline: Gamma → ElevenLabs → CapCut.

---
