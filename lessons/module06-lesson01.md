# Wie Lending-Protokolle funktionieren

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die Grundstruktur eines Pool-based Lending-Protokolls beschreiben
- Den Unterschied zwischen Supply und Borrow aus Nutzer-Sicht einordnen
- Die Rolle von zinsbringenden Tokens (aTokens, cTokens) erklären
- Collateral, Loan-to-Value (LTV) und Liquidation Threshold als Schlüsselbegriffe korrekt benennen
- Overcollateralization als strukturelles Sicherheitsprinzip in DeFi-Lending verstehen und gegenüber traditionellem Banken-Lending abgrenzen
- Eine erste Supply-Position (z.B. USDC auf Aave) mental durchspielen, inklusive Gas, Gebühren und erwartbarer Rendite

## Erklärung

Ein DeFi-Lending-Protokoll ist ein Smart Contract, in dem zwei Gruppen von Nutzern interagieren: **Supplier** (die Kapital einzahlen und Zinsen verdienen) und **Borrower** (die gegen Sicherheiten Kredite aufnehmen und Zinsen zahlen). Das Protokoll vermittelt beide Seiten — ohne menschliche Entscheidung, ohne Kreditprüfung.

**Die drei Architekturen**

**1. Pool-based (Aave, Compound — das dominante Modell)**
Alle Supplier eines Assets zahlen in einen gemeinsamen Pool ein. Alle Borrower entnehmen aus diesem Pool. Der Zinssatz ist für alle gleich, basiert auf der Utilization (wie viel vom Pool geborgt ist).

**2. Peer-to-Peer (klassisch, heute wenig genutzt)**
Einzelne Supplier werden direkt mit einzelnen Borrowers gematcht. Flexibel, aber ineffizient — Matching kann langsam sein, und Kapital liegt häufig ungenutzt.

**3. Peer-to-Pool Hybrid (Morpho — modernes Modell)**
Peer-to-Peer-Matching, wenn möglich (bessere Raten für beide Seiten). Fallback auf Pool-Ablage (Aave, Compound), wenn kein Match verfügbar. Kombiniert Effizienz mit Liquidität.

Dieses Modul fokussiert auf Pool-based-Modelle, weil sie die meisten TVL und das am besten verstandene Modell sind.

**Der Supply-Vorgang**

Du zahlst 10.000 USDC in einen Aave-USDC-Pool ein. Folgende Dinge passieren:

1. Deine USDC werden in den Pool-Vertrag übertragen.
2. Der Pool-Vertrag **mintet dir aUSDC** (Aaves zinsbringenden Token) — du bekommst etwa 10.000 aUSDC, entsprechend der aktuellen Exchange-Rate.
3. Dein aUSDC-Guthaben wächst kontinuierlich, weil es automatisch Zinsen akkumuliert.
4. Wann immer du willst, kannst du deine aUSDC zurück-in-USDC tauschen ("Withdraw").

**Wichtig:** Du hältst ein ERC-20-Token (aUSDC), das dein Anrecht auf den Pool repräsentiert. Es ist übertragbar, einlösbar, und es wächst im Wert durch Zinsakkumulation. Das ist fundamentale DeFi-Komponierbarkeit: Ein aUSDC kann als Sicherheit in einem anderen Protokoll dienen, in einer LP-Position, oder einfach in einer anderen Wallet verwahrt werden.

**Der Borrow-Vorgang**

Ein Borrower will 5.000 USDC aufnehmen. Bevor das geht, muss er Sicherheiten hinterlegen — zum Beispiel ETH. Der Vorgang:

1. Supply von 10.000 USD in ETH als Sicherheit.
2. Das Protokoll bewertet die Sicherheit mit einem Loan-to-Value-Ratio (z.B. 75% für ETH). Das bedeutet: Mit 10.000 USD ETH-Sicherheit kann bis zu 7.500 USDC geborgt werden.
3. Der Borrower nimmt 5.000 USDC auf — wohlgemerkt unterhalb der Maximalgrenze.
4. Er zahlt laufend Zinsen auf die 5.000 USDC.

Wenn die ETH-Sicherheit an Wert verliert oder die Schuld durch Zinsen wächst, kann die Position **liquidiert** werden. Details dazu in Modul 7.

**Wichtige Eigenschaften**

1. **Überbesichert:** Jeder DeFi-Kredit ist überbesichert. Du kannst nicht ohne Sicherheiten leihen (mit Ausnahme von Flash Loans, Modul 9). Das ist strukturell anders als traditionelle Banken, die auf Kreditwürdigkeitsprüfung basieren.

2. **Variable Zinsen:** Zinsen ändern sich kontinuierlich mit der Utilization. Es gibt keine festen Zinssätze — das ist ein fundamentaler Unterschied zu klassischen Bankprodukten.

3. **Nicht-verwahrend:** Du hältst deine aTokens in deiner Wallet. Das Protokoll verwahrt die eigentlichen Assets in Smart Contracts — transparent und öffentlich prüfbar.

4. **Keine Laufzeiten:** DeFi-Supply und -Borrow haben keine feste Laufzeit. Du kannst jederzeit ein- oder auszahlen (solange der Pool Liquidität hat).

**Warum jemand Kredite aufnimmt**

Wichtige Verwendungszwecke in DeFi:

- **Leverage auf Krypto:** ETH als Sicherheit, Stablecoins borgen, mehr ETH kaufen (das behandelt Modul 10)
- **Kapital-Effizienz ohne Verkauf:** Du brauchst Liquidität, willst aber deine ETH-Position nicht verkaufen (oft aus steuerlichen Gründen)
- **Short-Positionen:** ETH borgen, sofort verkaufen, später günstiger zurückkaufen
- **Yield-Arbitrage:** Geborgtes Asset in eine höher-verzinsliche Strategie stecken (kommt in Modul 10)

Für den Supplier ist der Zweck des Borrowers irrelevant. Er verdient seine Zinsen, unabhängig davon, was der Borrower mit dem Kapital macht.

## Folien-Zusammenfassung

**[Slide 1] — Titel**
Wie Lending-Protokolle funktionieren

**[Slide 2] — Zwei Nutzerkategorien**
Supplier: zahlen ein, verdienen Zinsen
Borrower: hinterlegen Sicherheiten, leihen, zahlen Zinsen

**[Slide 3] — Drei Architekturen**
1. Pool-based (Aave, Compound) — dominant
2. Peer-to-Peer — klassisch, ineffizient
3. Peer-to-Pool Hybrid (Morpho) — modernes Modell

**[Slide 4] — Supply-Vorgang**
USDC → Pool-Contract → aUSDC an Supplier
aUSDC wächst kontinuierlich durch Zinsakkumulation.

**[Slide 5] — Borrow-Vorgang**
ETH als Sicherheit → LTV-Prüfung → Stablecoin-Auszahlung
Bei Sicherheitsverlust: Liquidation möglich.

**[Slide 6] — Kerneigenschaften**
- Überbesichert
- Variable Zinsen
- Nicht-verwahrend
- Keine Laufzeiten

## Sprechertext

**[Slide 1]** Modul 6 behandelt Lending-Märkte. Das ist der zweite große Baustein konservativer DeFi-Portfolios neben Liquidity Providing. In dieser ersten Lektion legen wir das Fundament.

**[Slide 2]** Ein Lending-Protokoll hat zwei Nutzer-Kategorien. Supplier zahlen Kapital ein und verdienen Zinsen. Borrower hinterlegen Sicherheiten, nehmen Kredite auf, zahlen Zinsen. Das Protokoll vermittelt zwischen beiden — ohne menschliche Entscheidung, ohne Kreditwürdigkeitsprüfung.

**[Slide 3]** Drei Architekturen existieren. Pool-based, das dominante Modell, bei dem alle Supplier in einen gemeinsamen Pool einzahlen und alle Borrower daraus entnehmen. Aave und Compound folgen diesem Modell. Peer-to-Peer klassisch, heute kaum noch genutzt, weil ineffizient. Und Peer-to-Pool Hybrid, das Morpho-Modell — P2P-Matching wenn möglich, Pool-Fallback sonst. Dieses Modul fokussiert auf Pool-based, weil es die meisten Kapital-Volumen und das am besten verstandene Modell ist.

**[Slide 4]** Der Supply-Vorgang in Aave als Beispiel. Du zahlst USDC ein, der Pool-Contract mintet dir aUSDC — das ist Aaves zinsbringender Token. Ein ERC-20, der dein Anrecht auf den Pool repräsentiert. Das aUSDC-Guthaben wächst kontinuierlich durch Zinsakkumulation. Du kannst jederzeit zurück-in-USDC tauschen. Wichtig: aUSDC ist komponierbar — kann als Sicherheit in anderen Protokollen dienen, in LP-Positionen eingebracht werden, oder einfach gehalten.

**[Slide 5]** Der Borrow-Vorgang. Ein Borrower hinterlegt zum Beispiel ETH als Sicherheit. Das Protokoll wendet ein Loan-to-Value-Ratio an, zum Beispiel 75 Prozent für ETH. Das heißt: mit 10.000 Dollar ETH kann bis zu 7.500 USDC geborgt werden. Der Borrower nimmt tatsächlich weniger auf, um Sicherheitspuffer zu haben. Er zahlt laufend Zinsen. Wenn die Sicherheit an Wert verliert oder die Schuld durch Zinsen wächst, droht Liquidation. Details in Modul 7.

**[Slide 6]** Vier Kerneigenschaften. Erstens: überbesichert — jeder DeFi-Kredit braucht mehr Sicherheiten als die Schuld. Das ist strukturell anders als Banken mit Kreditwürdigkeitsprüfung. Zweitens: variable Zinsen — kein fester Zinssatz, sondern kontinuierliche Anpassung basierend auf Angebot und Nachfrage. Drittens: nicht-verwahrend — du hältst deine aTokens selbst. Viertens: keine festen Laufzeiten — Supply und Borrow können jederzeit aufgelöst werden.

## Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Zwei-Personen-Diagramm: Supplier zahlt in Pool, Borrower entnimmt. Pfeile zeigen Zinsflüsse.

**[Slide 3]** Drei Architektur-Karten mit schematischen Diagrammen.

**[Slide 4]** **SCREENSHOT SUGGESTION:** Aave-Supply-Interface mit USDC-Supply und angezeigtem aUSDC-Receipt. Alternativ: Etherscan-Transaktion einer realen aUSDC-Mint.

**[Slide 5]** Diagramm: ETH-Sicherheit → LTV-Berechnung → Stablecoin-Auszahlung. Mit Visualisierung des Sicherheitspuffers.

**[Slide 6]** Vier-Punkte-Checkliste mit Icons.

## Übung

**Aufgabe: Lending-Landschaft untersuchen**

1. Öffne defillama.com und filtere auf Lending-Protokolle.
2. Notiere die Top-10 nach TVL.
3. Für jedes Protokoll dokumentiere:
 - Name und dominante Chain
 - TVL
 - Anzahl unterstützter Assets (grobe Einschätzung)
 - Audit-Status (auf Protokoll-Website recherchieren)
4. Identifiziere die Top-3 Stablecoin-Supply-Optionen nach TVL.

**Deliverable:** Tabelle mit Top-10 + Analyse: Welche drei Protokolle würdest du für eine konservative Stablecoin-Supply-Strategie in Betracht ziehen und warum?

## Quiz

**Frage 1:** Warum ist jeder DeFi-Kredit überbesichert, während klassische Bankkredite oft ohne oder mit minimaler Sicherheit vergeben werden?

<details>
<summary>Antwort anzeigen</summary>

Klassische Banken basieren auf Kreditwürdigkeitsprüfung — sie nutzen Einkommen, Vermögen, Historie und rechtliche Identität des Kreditnehmers. Falls der Kredit nicht zurückgezahlt wird, kann die Bank rechtlich vorgehen (Pfändung, Vollstreckung). In DeFi gibt es keine Identität und keine rechtliche Handhabe — der Kreditnehmer ist nur eine Wallet-Adresse. Die einzige Sicherheit ist das hinterlegte Collateral. Damit das Protokoll im Falle eines Ausfalls die Schuld abdecken kann, muss das Collateral mehr wert sein als die Schuld. Zusätzlich braucht es einen Puffer für Preisvolatilität — wenn das Collateral im Wert fällt, muss genug Marge bleiben, um die Schuld noch zu decken. Deshalb typisch LTV-Ratios zwischen 50% und 80%.
</details>

**Frage 2:** Was ist der Vorteil von zinsbringenden Tokens (wie aUSDC) gegenüber einem einfachen internen Salden-System?

<details>
<summary>Antwort anzeigen</summary>

Zinsbringende Tokens sind komponierbar. Weil aUSDC ein ERC-20-Token ist, kann es überall in DeFi verwendet werden — als Sicherheit in einem anderen Lending-Protokoll, als LP-Position, als Übergabe-Asset an andere Wallets. Das erzeugt Effizienz: Kapital, das in Aave verzinst wird, kann gleichzeitig in anderen Strategien arbeiten. Ein internes Salden-System wäre nicht komponierbar — die Supply-Position wäre in Aave gefangen. Zusätzlich: aUSDC ist ein klares, auditbares Guthaben. Der Exchange-Rate zwischen USDC und aUSDC ist deterministisch und öffentlich prüfbar. Das erzeugt Transparenz, die interne Datenbanken nicht haben.
</details>

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 6 Folien: Titel → Pool-Struktur → Supply vs. Borrow → aToken/cToken-Mechanik → Overcollateralization → Erste Supply-Entscheidung
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — Lending-Pool-Architektur-Diagramm, Supply/Borrow-Flussdiagramm, aUSDC/cUSDC-Token-Mechanik, Aave-Dashboard-Screenshot, Overcollateralization-Vergleich DeFi vs. TradFi

Pipeline: Gamma → ElevenLabs → CapCut.

---
