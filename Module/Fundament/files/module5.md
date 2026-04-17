# Modul 5 — Lending Markets

## Die Mechanik von On-Chain-Krediten

**Moduldauer:** ~60 Minuten Video über 6 Lektionen + Modul-Quiz
**Stufe:** Core DeFi
**Voraussetzungen:** Module 1–4
**Version:** 3.0 — 8-Sektionen-Lektionsstruktur

---

## MODULEINFÜHRUNG

Nach DEXes (Modul 4) ist Lending das zweite fundamentale DeFi-Primitive. Protokolle wie Aave, Compound und Morpho verwalten heute zusammen über 40 Milliarden Dollar TVL und sind die Infrastruktur hinter Leverage, Short-Positionen, Delta-neutralen Strategien und der grossen Mehrheit aller anspruchsvollen DeFi-Yield-Setups.

Der entscheidende mentale Shift: DeFi-Lending funktioniert fundamental anders als Bank-Kredite. Es gibt keine Kreditprüfung, keine Identitätsverifizierung und keine zeitliche Laufzeit. Stattdessen wird jeder Kredit durch **überbesicherte Collateral** abgedeckt, die Zinssätze werden **algorithmisch** anhand von Auslastung berechnet, und bei Unterschreitung eines Sicherheits-Schwellenwerts erfolgt die Liquidation **automatisch und ohne Gnade**.

In diesem Modul verstehst du:
- Wie Supply und Borrow mechanisch funktionieren
- Wie Interest Rate Models den Zins in Echtzeit setzen
- Was Loan-to-Value (LTV), Liquidation Threshold und Health Factor bedeuten
- Die exakte Anatomie einer Liquidation
- Die strukturellen Unterschiede zwischen Aave, Compound und Morpho
- Fortgeschrittene Mechanismen wie Isolated Markets und Efficiency Mode

---

## MODUL-LERNZIELE

Am Ende dieses Moduls können Teilnehmer:

- Die Supply- und Borrow-Mechanik in einem Pool-basierten Lending-Protokoll vollständig erklären
- Ein Utilization-basiertes Interest Rate Model lesen und den resultierenden APY für beliebige Auslastungen berechnen
- LTV, Liquidation Threshold und Health Factor für eine Position berechnen und interpretieren
- Eine Liquidation Schritt für Schritt nachvollziehen inklusive Liquidator-Profit und Position-Impact
- Die strukturellen Unterschiede zwischen Aave V3, Compound V3 und Morpho Blue identifizieren
- Isolated Markets und E-Mode richtig einsetzen und deren Risiken bewerten

---

## LEKTIONSINDEX

| Lektion | Titel | Dauer |
|---------|-------|-------|
| 5.1 | Supply-Seite: Wie Lending-Pools funktionieren | 8–10 Min |
| 5.2 | Borrow-Seite: Utilization und Zinsmodelle | 10–12 Min |
| 5.3 | Collateral, LTV und Health Factor | 8–10 Min |
| 5.4 | Die Anatomie einer Liquidation | 10–12 Min |
| 5.5 | Aave vs Compound vs Morpho: Struktur-Vergleich | 10–12 Min |
| 5.6 | Isolated Markets, E-Mode und Risk-Silos | 8–10 Min |

---

# Lektion 5.1 — Supply-Seite: Wie Lending-Pools funktionieren

## Learning Objectives

Am Ende dieser Lektion können Teilnehmer:
- Den Unterschied zwischen Peer-to-Peer-Lending und Pool-basierten Modellen erklären
- Beschreiben, was passiert, wenn ein Supplier Tokens deposited
- Die Rolle von aTokens (Aave) bzw. cTokens (Compound) als Anteilsnachweise verstehen
- Den Zins-Akkumulations-Mechanismus und Auto-Compounding mechanisch nachvollziehen
- Die Liquiditätsrisiken auf der Supply-Seite identifizieren

## Explanation

### Das Pool-Modell

Traditionelles Peer-to-Peer-Lending sucht für jeden Kreditgeber einen passenden Kreditnehmer. Das funktioniert in Off-Chain-Märkten schlecht und in DeFi fast gar nicht, weil Matching-Zeiten Kapitaleffizienz zerstören.

Lending-Pools lösen das Problem strukturell: Statt einzelne Kreditgeber mit einzelnen Kreditnehmern zu matchen, kippen alle Supplier ihre Tokens in einen gemeinsamen Smart-Contract-Pool. Borrower entnehmen direkt aus diesem Pool. Jeder Supplier besitzt anteilig einen Prozentsatz des Pools.

Beispiel: Der Aave USDC-Pool enthält 500 Millionen USDC. Du supplst 100.000 USDC. Dein Anteil ist 0,02 % des Pools. Für diesen Anteil erhältst du einen ERC-20-Token — aUSDC — der deine Claim auf einen Anteil des Pools repräsentiert.

Der Pool wächst über die Zeit, weil Borrower Zinsen zahlen. Dein Anteil am wachsenden Pool wächst proportional — das ist die Mechanik, wie du Yield verdienst.

### aToken / cToken Mechanik

aToken (Aave) und cToken (Compound) sind zwei unterschiedliche Implementierungen des gleichen Konzepts:

**aToken-Modell (Aave):**
- 1 aUSDC ist immer 1 USDC wert
- Dein aUSDC-Saldo wächst über die Zeit
- Wenn du 100 aUSDC hältst und der Pool 5 % APY generiert, hast du nach einem Jahr 105 aUSDC
- Dies wird durch einen sich kontinuierlich verändernden `liquidityIndex` erreicht, der die Tokenzahl bei Balance-Abfrage dynamisch skaliert

**cToken-Modell (Compound):**
- cUSDC-Saldo bleibt konstant
- Der Wechselkurs cUSDC → USDC wächst über die Zeit
- Wenn du 100 cUSDC erhältst und der Pool 5 % APY generiert, steigt der Kurs von z.B. 0,02 USDC/cUSDC auf 0,021 USDC/cUSDC. Dein Anspruch beträgt nach einem Jahr also 2,1 USDC statt 2 USDC

Beide Modelle sind mathematisch äquivalent. Die Praxis-Implikation: aTokens sehen intuitiver aus, cTokens benötigen immer einen Wechselkurs-Lookup.

### Zinsakkumulation — Block für Block

Jedes Mal, wenn ein Block minted wird (alle ~12 Sekunden auf Ethereum), wird der aktuelle Zinssatz auf die verstrichene Zeit seit dem letzten Block angewendet. Das bedeutet: Dein Zins akkumuliert jeden Block, nicht einmal am Tag oder einmal am Monat. Es gibt kein Claim-Ritual — Zinsen compoundieren automatisch.

Die angezeigten APY-Zahlen in Protokoll-UIs (z.B. „4.2% APY") sind die annualisierten Werte bei konstanter aktueller Rate. Real schwanken die Zinsen stündlich.

### Liquiditätsrisiken auf der Supply-Seite

**Risiko 1 — Auslastung zu hoch:**
Wenn 99 % des Pools verborgt sind, kannst du möglicherweise nicht sofort withdrawen. Du musst warten, bis Borrower zurückzahlen oder neue Supplier kommen.

**Risiko 2 — Smart-Contract-Risiko:**
Ein Bug oder Hack im Protokoll-Code kann zum Totalverlust führen. Beispiele: Euler Hack 2023 ($197M), Radiant Hack 2024 ($58M).

**Risiko 3 — Collateral-Risiko:**
Wenn ein Borrower mit volatilem Collateral sich nicht rechtzeitig liquidieren lässt (z.B. bei Oracle-Lag), kann Bad Debt entstehen. Diese Bad Debt wird auf alle Supplier verteilt.

**Risiko 4 — Zinsvolatilität:**
Dein APY kann innerhalb von Stunden von 2 % auf 30 % springen (oder umgekehrt), wenn sich die Auslastung ändert. Das ist kein Risiko im Sinne von Verlust, aber im Sinne von Planbarkeit.

## Slide Summary

[Slide 1] **Titel: Supply-Seite — Wie Lending-Pools funktionieren**
• Pool-Modell statt Peer-to-Peer
• aTokens / cTokens als Anteilsnachweise
• Auto-Compounding auf Block-Ebene
• Supply-Side-Risiken

[Slide 2] **Vom P2P zum Pool-Modell**
• P2P: Matching Problem, Kapitaleffizienz leidet
• Pool: alle Supplier kippen in gemeinsamen Smart Contract
• Borrower entnehmen aus dem Pool
• Jeder Supplier besitzt anteilig %

[Slide 3] **Konkretes Beispiel**
• Aave USDC-Pool: 500M USDC
• Supply 100.000 USDC
• Dein Anteil: 0,02 %
• Du erhältst 100.000 aUSDC als Anteilsnachweis

[Slide 4] **aToken-Mechanik (Aave)**
• 1 aUSDC = 1 USDC, immer
• aUSDC-Saldo wächst mit der Zeit
• 100 aUSDC → nach 1 Jahr bei 5% APY: 105 aUSDC
• Implementiert via `liquidityIndex`

[Slide 5] **cToken-Mechanik (Compound)**
• cUSDC-Saldo bleibt konstant
• Wechselkurs cUSDC→USDC steigt
• Beispiel: 0,02 → 0,021 USDC/cUSDC = +5%
• Mathematisch äquivalent zum aToken-Modell

[Slide 6] **Zins-Akkumulation**
• Jeder Block (~12 Sek) akkumuliert Zins
• Kein Claim-Ritual nötig
• Angezeigter APY = annualisiert bei aktueller Rate
• Rate schwankt stündlich

[Slide 7] **Supply-Side-Risiken**
• Liquidität: bei hoher Auslastung kein sofortiger Withdraw
• Smart Contract: Bugs / Hacks (Euler $197M, Radiant $58M)
• Bad Debt: Failed Liquidations werden sozialisiert
• Zinsvolatilität: 2% → 30% in Stunden möglich

[Slide 8] **Key Takeaway**
• Supplier = anteiliger Pool-Besitzer
• aToken/cToken = tokenisierter Anteilsnachweis
• Yield = automatisch akkumuliert
• Risiken: Liquidität, Smart Contract, Bad Debt, Vola

## Voice Narration Script

[Slide 1] Willkommen zu Lektion 5.1. Wir beginnen Modul 5 auf der Supplier-Seite: Wie funktioniert es mechanisch, wenn du Tokens in ein Lending-Protokoll einlegst? Welche Tokens bekommst du zurück? Wie wächst dein Yield? Und welche Risiken trägst du?

[Slide 2] Zuerst der fundamentale Shift vom Peer-to-Peer-Lending zum Pool-Modell. In einem Peer-to-Peer-System müssen Kreditgeber und Kreditnehmer gematcht werden. Das ist langsam und kapitalineffizient. Pool-Modelle lösen das, indem alle Supplier ihre Tokens in einen gemeinsamen Smart Contract kippen. Borrower entnehmen direkt aus diesem Pool. Jeder Supplier besitzt einen anteiligen Prozentsatz des gesamten Pools.

[Slide 3] Ein konkretes Beispiel. Der Aave USDC-Pool enthält 500 Millionen USDC. Du legst 100.000 USDC ein. Dein Anteil ist 0,02 Prozent des Pools. Als Nachweis für diesen Anteil erhältst du 100.000 aUSDC. Diese aUSDC sind ein normaler ERC-20-Token, den du selber in deiner Wallet hältst.

[Slide 4] Das aToken-Modell von Aave funktioniert so: 1 aUSDC ist immer exakt 1 USDC wert. Dein aUSDC-Saldo wächst aber mit der Zeit. Wenn du heute 100 aUSDC hältst und der Pool im Jahresschnitt 5 Prozent APY generiert, dann hast du nach einem Jahr 105 aUSDC. Technisch wird das durch einen sogenannten `liquidityIndex` implementiert, der bei jeder Balance-Abfrage die Tokenzahl dynamisch hochskaliert.

[Slide 5] Compound V2 nutzt eine andere Implementierung: Das cToken-Modell. Dein cUSDC-Saldo bleibt konstant, aber der Wechselkurs von cUSDC zu USDC steigt über die Zeit. Beispiel: Du bekommst 100 cUSDC zum Kurs 0,02. Nach einem Jahr bei 5 Prozent Yield ist der Kurs bei 0,021. Dein Anspruch: 2,1 USDC statt 2. Mathematisch ist das exakt äquivalent zum aToken-Modell, nur anders dargestellt.

[Slide 6] Zinsen akkumulieren block-weise. Jedes Mal, wenn ein neuer Block minted wird — auf Ethereum alle 12 Sekunden — wird der aktuelle Zinssatz auf die verstrichene Zeit angewendet. Du musst nichts claimen, nichts restaken. Der Yield compoundiert sich automatisch. Die APY-Zahl in der UI ist annualisiert und basiert auf der aktuellen Rate. Real schwankt die Rate stündlich.

[Slide 7] Risiken auf der Supply-Seite. Erstens Liquidität: Wenn die Auslastung bei 99 Prozent steht, kannst du möglicherweise nicht sofort withdrawen. Zweitens Smart-Contract-Risiko: Ein Bug oder Hack kann zum Totalverlust führen. Der Euler-Hack 2023 kostete 197 Millionen Dollar, der Radiant-Hack 2024 kostete 58 Millionen. Drittens Bad Debt: Wenn Liquidationen fehlschlagen, wird der Verlust auf alle Supplier verteilt. Viertens Zinsvolatilität: Dein APY kann in Stunden von 2 auf 30 Prozent springen.

[Slide 8] Zusammenfassung: Als Supplier bist du anteiliger Besitzer des Pools. Dein Anteil wird durch aToken oder cToken repräsentiert. Yield akkumuliert automatisch auf Block-Ebene. Die vier Hauptrisiken sind Liquidität, Smart Contract, Bad Debt und Zinsvolatilität. In der nächsten Lektion schauen wir uns die Borrower-Seite an und verstehen, wie der Zins überhaupt berechnet wird.

## Visual Suggestions

[Slide 1] Titel-Slide mit Schaubild: drei Token-Symbole oben (Supplier), Pool in der Mitte, drei andere unten (Borrower).

[Slide 2] Split-Screen: links P2P (zwei Personen mit Pfeil, Matching-Problem), rechts Pool (viele Personen rundherum um zentralen Pool).

[Slide 3] Konkrete Zahlen: Pool-Visualisierung mit 500M USDC, Supplier legt 100k hinein, bekommt 100k aUSDC.

[Slide 4] Zeitstrahl über 1 Jahr: 100 aUSDC → 105 aUSDC, mit Hinweis „liquidityIndex grows over time".

[Slide 5] Zeitstrahl über 1 Jahr: cUSDC bleibt bei 100, Wechselkurs klettert von 0,02 auf 0,021.

[Slide 6] Block-für-Block-Animation: kleine Ticks auf Zeitleiste (alle 12 Sek), Saldo steigt minimal bei jedem Tick.

[Slide 7] Vier Risiko-Quadranten: Liquidität, Smart Contract, Bad Debt, Zinsvolatilität. Jeweils mit 1–2-Satz-Beschreibung.

[Slide 8] Zusammenfassung-Graphic mit den 4 Key Points in Box-Design.

**SCREENSHOT SUGGESTION:** Aave V3 Dashboard auf app.aave.com mit aUSDC-Balance-Anzeige und Pool-Utilization-Indikator.

**SCREENSHOT SUGGESTION:** Etherscan Seite des aUSDC-Token-Contracts (0xBcca60bB61934080951369a648Fb03DF4F96263C) mit dem Balance-Growth-Mechanismus erklärt via Contract-Lesen.

## Exercise

**Aufgabe: Pool-Supplier-Simulation**

1. Gehe auf app.aave.com und verbinde eine read-only Wallet (oder benutze Etherscan)
2. Wähle den USDC-Markt auf Ethereum Mainnet
3. Notiere die folgenden Live-Kennzahlen:
   - Total Supply in USDC
   - Utilization Rate (%)
   - Supply APY (%)
   - Borrow APY (%)
4. Auf Etherscan, finde den aUSDC-Token-Contract und rufe die `balanceOf(address)` Methode für eine beliebige Whale-Adresse ab
5. Warte 1 Stunde und wiederhole den `balanceOf`-Call für die gleiche Adresse
6. Dokumentiere die Differenz: Das ist der reale 1-Stunden-Yield-Accrual dieser Adresse

**Deliverable:** Ein kurzes Dokument mit den Kennzahlen, dem Balance-Delta nach 1 Stunde und einer Rechnung, ob dieser Delta zum angezeigten APY passt.

## Quiz

**Frage 1:** Du supplst 100.000 USDC auf Aave. Der Pool hat eine Gesamtgröße von 500M USDC. Welcher Anteil gehört dir und was erhältst du?

<details><summary>Antwort</summary>
Dein Anteil ist 0,02 % des Pools (100.000 / 500.000.000). Du erhältst 100.000 aUSDC als tokenisierten Anteilsnachweis. Diese aUSDC sitzen in deiner Wallet und wachsen mit der Zeit durch den `liquidityIndex`-Mechanismus.
</details>

**Frage 2:** Der angezeigte USDC-Supply-APY auf Aave zeigt 4,2 %. Du supplst 10.000 USDC. Was weisst du sicher und was nicht?

<details><summary>Antwort</summary>
Sicher: 4,2 % ist die annualisierte Rate bei aktueller Auslastung. Zinsen werden block-weise (alle 12 Sek) akkumuliert. Kein manueller Claim nötig.

Nicht sicher: Die Rate wird nicht stabil bleiben. Sie schwankt stündlich mit Auslastung. Dein realer 1-Jahres-Yield kann deutlich über oder unter 4,2 % landen. Es gibt zudem Smart Contract, Bad Debt und Liquiditätsrisiken.
</details>

---

# Lektion 5.2 — Borrow-Seite: Utilization und Zinsmodelle

## Learning Objectives

Am Ende dieser Lektion können Teilnehmer:
- Die Utilization Rate in einem Lending-Pool berechnen
- Das Kink-Rate-Interest-Rate-Model erklären und zeichnen
- Den Borrow-APY für beliebige Auslastungen berechnen
- Den Reserve Factor verstehen und dessen Einfluss auf den Spread zwischen Supply und Borrow APY
- Strategische Implikationen der IRM-Kurven für Supplier und Borrower ableiten

## Explanation

### Utilization Rate

Die Utilization Rate ist das zentrale Konzept für jedes Pool-basierte Lending-Protokoll. Definition:

```
Utilization = Total Borrowed / Total Supply
```

Wenn ein USDC-Pool 500M USDC an Supply hat und 300M USDC davon verliehen sind, ist die Utilization 60 %.

Utilization treibt alles:
- Je höher die Utilization, desto teurer der Kredit (Borrow APY steigt)
- Je höher die Utilization, desto mehr verdienen Supplier (Supply APY steigt)
- Bei 100 % Utilization wäre der Pool komplett verliehen und keine Withdraws möglich

### Das Kink-Rate-Modell

Das klassische IRM-Modell (Interest Rate Model) bei Aave und Compound ist das **Kink-Rate-Modell**. Es definiert zwei lineare Steigungen, die sich am „Kink" treffen — typischerweise bei 80 % oder 90 % Utilization.

**Parameter (Beispiel Aave USDC):**
- Base Borrow Rate: 0 %
- Slope 1: 4 % (von 0 bis Kink)
- Kink (Optimal Utilization): 90 %
- Slope 2: 60 % (von Kink bis 100 %)

**Interpretation:**
- Unter 90 % Auslastung: Borrow APY steigt sanft von 0 % auf 4 %
- Über 90 % Auslastung: Borrow APY steigt extrem steil — von 4 % auf 64 % am Maximum

**Warum diese Kurve?**
Der Protokoll-Designer will, dass die Utilization nahe bei 90 % pendelt — hoch genug für gute Supplier-Renditen, aber niedrig genug, damit Withdraws funktionieren. Wenn die Utilization über 90 % steigt, explodieren die Borrow-Kosten, was (a) existierende Borrower incentiviert zurückzuzahlen und (b) neue Supplier anlockt wegen der hohen Supply-APY.

### Formeln

**Borrow APY bei Utilization U:**

```
Wenn U ≤ Kink:
  Borrow APY = BaseRate + (U / Kink) * Slope1

Wenn U > Kink:
  Borrow APY = BaseRate + Slope1 + ((U - Kink) / (1 - Kink)) * Slope2
```

**Beispielrechnung bei U = 60 %, Kink = 90 %, Slope1 = 4 %:**

```
Borrow APY = 0 + (0.60 / 0.90) * 4% = 0.667 * 4% = 2.67%
```

**Beispielrechnung bei U = 95 %, Kink = 90 %, Slope1 = 4 %, Slope2 = 60 %:**

```
Borrow APY = 0 + 4% + ((0.95 - 0.90) / (1 - 0.90)) * 60%
           = 4% + (0.05 / 0.10) * 60% = 4% + 30% = 34%
```

Man sieht: 5 Prozentpunkte mehr Utilization über den Kink hinaus verdoppeln die Borrow-Kosten.

### Reserve Factor: Spread zwischen Supply und Borrow

Die Borrow-APY, die Borrower zahlen, fliesst nicht vollständig zu Suppliern. Ein Teil — der **Reserve Factor** — wird einbehalten zur Bildung eines Treasury-Polsters für Bad Debt.

**Formel für Supply APY:**

```
Supply APY = Borrow APY * Utilization * (1 - Reserve Factor)
```

**Beispielrechnung:**
- Borrow APY = 10 %
- Utilization = 80 %
- Reserve Factor = 10 %

```
Supply APY = 10% * 0.80 * 0.90 = 7.2%
```

Der Spread — die 2,8 Prozentpunkte zwischen 10 % Borrow und 7,2 % Supply — teilt sich auf in:
- 2 Prozentpunkte, die durch die 20 % unverliehenes Kapital „verwässert" werden (nicht produktiv)
- 0,8 Prozentpunkte, die als Reserve Factor ans Protokoll gehen

### Strategische Implikationen

**Für Supplier:**
- Höhere Utilization = bessere Rendite, aber höheres Withdraw-Risiko
- Der Sweet Spot für Supplier ist ein Pool, der konstant nahe am Kink läuft (z.B. 85–90 %) — maximaler Yield, noch genug Liquidität

**Für Borrower:**
- Unter dem Kink ist Borrowing günstig und stabil
- Über dem Kink explodieren die Kosten — wer Long-Term-Leverage plant, muss darauf achten, ob der Pool historisch unter dem Kink bleibt
- Borrow-APY-Spikes sind häufig, wenn grosse Supplier withdrawen oder grosse Borrower Leverage aufbauen

### Variable vs Stable Borrow Rates

Aave bot historisch eine „Stable Rate" als Alternative zum variablen Zins — eine fixe Rate, die sich nur bei bestimmten Triggern änderte. In der Praxis war Stable Rate problematisch (Arbitrage-Möglichkeiten, Reserve-Drain) und wurde in Aave V3 deaktiviert. Heute ist alles Variable Rate.

## Slide Summary

[Slide 1] **Titel: Borrow-Seite — Utilization und Zinsmodelle**
• Utilization als zentrales Signal
• Kink-Rate-IRM erklärt
• Reserve Factor und Spread
• Strategische Implikationen

[Slide 2] **Utilization Rate**
• Formel: Total Borrowed / Total Supply
• Beispiel: 300M / 500M = 60%
• Treibt alle Zinsen
• 100% = Pool leer, keine Withdraws möglich

[Slide 3] **Das Kink-Rate-Modell**
• Zwei lineare Steigungen, verbunden am Kink
• Typische Parameter: Kink 90%, Slope1 4%, Slope2 60%
• Unter Kink: sanfter Anstieg
• Über Kink: extremer Anstieg

[Slide 4] **Formel & Beispiel**
• U=60%, Kink=90%, Slope1=4%
• Borrow APY = (0.60/0.90) * 4% = 2.67%
• U=95%: Borrow APY = 4% + 30% = 34%
• 5% über Kink = 10x mehr Borrow-Kosten

[Slide 5] **Warum diese Kurve?**
• Ziel: Utilization pendelt bei ~90%
• Über 90%: exploding costs incentivieren Repayment
• Unter 90%: niedrige Kosten incentivieren Borrowing
• Selbst-regulierender Equilibrium-Mechanismus

[Slide 6] **Reserve Factor**
• Teil der Borrow-Zahlungen geht an Protokoll-Treasury
• Bildet Bad-Debt-Polster
• Formel: Supply APY = Borrow APY * U * (1 - RF)
• Typisch: RF = 10% bei Stablecoin-Pools

[Slide 7] **Supply/Borrow-Spread**
• Beispiel: Borrow 10%, U=80%, RF=10%
• Supply APY = 10% * 0.80 * 0.90 = 7.2%
• Spread: 2.8 pp = 2 pp dilution + 0.8 pp reserve

[Slide 8] **Strategische Implikationen**
• Supplier: Pools nahe Kink = Sweet Spot
• Borrower: über Kink = gefährliche Kosten
• Variable Rate hat Stable Rate abgelöst (Aave V3)
• Monitoring der Utilization ist kritisch

## Voice Narration Script

[Slide 1] In Lektion 5.2 wechseln wir auf die Borrow-Seite. Wir verstehen, wie der Zins in einem Lending-Pool überhaupt berechnet wird — was das Kink-Rate-Model ist, warum Utilization das wichtigste Signal ist, und welche strategischen Implikationen die IRM-Kurve für Supplier und Borrower hat.

[Slide 2] Utilization ist das zentrale Konzept. Die Formel ist simpel: Total Borrowed geteilt durch Total Supply. Wenn ein USDC-Pool 500 Millionen an Supply hat und 300 Millionen davon verborgt sind, ist die Utilization 60 Prozent. Diese eine Kennzahl treibt alle Zinsen — sowohl für Borrower als auch für Supplier. Bei 100 Prozent Utilization wäre der Pool komplett verliehen und niemand könnte mehr withdrawen.

[Slide 3] Das Kink-Rate-Modell, das bei Aave und Compound Standard ist, hat zwei lineare Steigungen, die sich an einem Knick — dem Kink — treffen. Typische Parameter für einen USDC-Pool: Kink bei 90 Prozent Utilization, Slope 1 bei 4 Prozent, Slope 2 bei 60 Prozent. Unter dem Kink steigt der Borrow-APY sanft. Über dem Kink steigt er extrem steil.

[Slide 4] Zwei konkrete Rechnungen. Bei 60 Prozent Utilization liegt der Borrow-APY bei 2,67 Prozent. Die Formel: 0,60 geteilt durch 0,90, mal 4 Prozent. Bei 95 Prozent Utilization — also 5 Prozentpunkte über dem Kink — springt der Borrow-APY auf 34 Prozent. Die Grundrate von 4 Prozent plus die Steigung über dem Kink: 5 geteilt durch 10, mal 60 Prozent, ergibt 30 zusätzliche Prozentpunkte. Merke: 5 Prozentpunkte mehr Utilization über dem Kink verdoppeln die Borrow-Kosten.

[Slide 5] Warum ist die Kurve so gebaut? Der Protokoll-Designer will, dass die Utilization nahe bei 90 Prozent pendelt. Hoch genug für gute Supplier-Renditen, niedrig genug, damit Withdraws funktionieren. Über 90 Prozent explodieren die Borrow-Kosten. Das incentiviert existierende Borrower zurückzuzahlen und lockt neue Supplier an. Es ist ein selbstregulierendes Equilibrium.

[Slide 6] Der Reserve Factor. Die Borrow-APY, die Borrower zahlen, fliesst nicht vollständig an Supplier. Ein Teil — typischerweise 10 Prozent bei Stablecoin-Pools — wird als Reserve Factor vom Protokoll einbehalten. Er bildet ein Polster gegen Bad Debt und finanziert das Protokoll-Treasury.

[Slide 7] Der Supply-Borrow-Spread. Bei einem Borrow-APY von 10 Prozent, 80 Prozent Utilization und 10 Prozent Reserve Factor bekommen Supplier 7,2 Prozent. Der Spread von 2,8 Prozentpunkten teilt sich auf: 2 Punkte gehen durch das 20 Prozent nicht verliehenes Kapital verloren — es ist idle. 0,8 Punkte gehen an den Reserve Factor.

[Slide 8] Strategische Implikationen. Supplier wollen Pools, die konstant nahe am Kink laufen — maximale Rendite, noch genug Liquidität. Borrower müssen aufpassen, nie über den Kink zu kommen, sonst explodieren die Kosten. Aave V3 hat die Stable Rate deaktiviert — alles ist heute Variable Rate. Utilization-Monitoring ist kritisch. In der nächsten Lektion bauen wir auf diesem Wissen auf und verstehen Collateral, LTV und Health Factor.

## Visual Suggestions

[Slide 1] Titel-Slide mit Kurven-Icon (das typische Kink-Rate-Diagramm als Vorschau).

[Slide 2] Utilization-Formel gross, mit animierter Füll-Anzeige eines Pools (0% → 60% → 100%).

[Slide 3] Grosses Kink-Rate-Chart: X-Achse Utilization 0-100%, Y-Achse APY. Zwei Linien (Slope1, Slope2), Knick bei 90%. Y-Werte beschriftet.

[Slide 4] Gleiches Chart, mit zwei Markierungen: roter Punkt bei 60%/2.67%, grüner Punkt bei 95%/34%. Pfeile zeigen den sprunghaften Anstieg.

[Slide 5] Animations-Konzept: Feedback-Loop-Diagramm. Utilization > Kink → hohe Borrow-Kosten → Repayment-Anreiz / Supply-Anreiz → Utilization sinkt.

[Slide 6] Waterfall-Diagramm: Borrow-APY → (minus Nicht-Verliehen-Dilution) → (minus Reserve Factor) → Supply-APY.

[Slide 7] Konkrete Beispiel-Zahlen als Balkendiagramm: Borrow 10%, Supply 7.2%, Split der 2.8pp Differenz.

[Slide 8] Quadrant-Darstellung: Supplier-Sicht vs Borrower-Sicht, jeweils mit optimalen und problematischen Utilization-Zonen.

**SCREENSHOT SUGGESTION:** Aave V3 Reserve-Details-Seite für den USDC-Markt mit IRM-Chart (Aave zeigt die Kink-Kurve visuell an).

**SCREENSHOT SUGGESTION:** Aave Analytics Dashboard zeigt historische Utilization-Kurve über 30 Tage.

## Exercise

**Aufgabe: Eigene Zinsberechnung**

Du bekommst folgende Pool-Parameter:
- Pool: WETH auf Aave V3 Ethereum
- Total Supply: 600.000 WETH
- Total Borrowed: 480.000 WETH
- Base Rate: 0 %
- Slope 1: 3 %
- Kink: 80 %
- Slope 2: 80 %
- Reserve Factor: 15 %

**Schritte:**
1. Berechne die aktuelle Utilization Rate
2. Berechne den Borrow APY
3. Berechne den Supply APY
4. Vergleiche: Was wäre der Supply APY, wenn Utilization auf 85 % springen würde?
5. Live-Check: Vergleiche deine berechneten Werte mit den aktuellen Live-Werten auf app.aave.com

**Deliverable:** Rechnung schriftlich durchgeführt, alle Zwischenergebnisse notiert, Vergleich mit Live-Werten.

## Quiz

**Frage 1:** Ein USDC-Pool hat Slope1 = 4 %, Kink = 90 %, Slope2 = 60 %, Base Rate = 0 %. Aktuelle Utilization ist 92 %. Was ist der Borrow APY?

<details><summary>Antwort</summary>
Borrow APY = 0% + 4% + ((0.92 - 0.90) / (1 - 0.90)) * 60%  
= 4% + (0.02 / 0.10) * 60%  
= 4% + 12%  
= **16%**

Nur 2 Prozentpunkte Utilization über dem Kink haben den Borrow-APY von 4% auf 16% gejagt — Faktor 4 Anstieg durch 2 Prozentpunkte.
</details>

**Frage 2:** Warum ist der Supply APY fast immer niedriger als der Borrow APY, selbst bei 100 % Utilization?

<details><summary>Antwort</summary>
Zwei Gründe:

1. **Reserve Factor:** Ein Teil (typisch 10–20 %) der Borrow-Zahlungen wird ans Protokoll einbehalten, nicht an Supplier ausgeschüttet.

2. **Dilution bei niedrigerer Utilization:** Wenn nur 80% des Pools verborgt sind, verdienen 20 % der Supply-Coins keine Zinsen. Diese 20 % verwässern die Gesamt-Supply-APY.

Bei 100% Utilization entfällt die Dilution (Punkt 2), aber der Reserve Factor (Punkt 1) bleibt. Daher Supply APY = Borrow APY * (1 - RF) = bei RF=10% also 90% des Borrow-APY.
</details>

---

# Lektion 5.3 — Collateral, LTV und Health Factor

## Learning Objectives

Am Ende dieser Lektion können Teilnehmer:
- Die Rolle von Collateral in überbesicherten Lending-Protokollen erklären
- Loan-to-Value (LTV), Max LTV und Liquidation Threshold mathematisch unterscheiden
- Den Health Factor für eine beliebige Position berechnen
- Multi-Asset-Collateral-Portfolios korrekt bewerten
- Safety-Margin-Strategien für langfristige Positionen ableiten

## Explanation

### Was ist Collateral?

DeFi-Lending ist fundamental **überbesichert**. Das heisst: Wer borrowen will, muss **vorab mehr Kapital als Sicherheit hinterlegen, als er borrowed**. Typisches Ratio: 150 % Collateral für 100 % Borrow — oder umgekehrt: Maximal 66 % LTV.

Warum überbesichert? Weil es in einem anonymen, pseudonymen On-Chain-System keine Identität gibt, die man für einen Kredit-Ausfall verklagen könnte. Die einzige Absicherung gegen Default ist das Collateral selbst. Wenn der Borrower nicht zurückzahlt, wird das Collateral liquidiert.

**Praktischer Ablauf:**
1. Du supplst 10 ETH (Wert: 30.000 USD bei ETH=3000) als Collateral
2. Das Protokoll erlaubt dir bei 80 % Max LTV: bis zu 24.000 USDC zu borrowen
3. Du borrwst 15.000 USDC (tatsächlicher LTV: 50 %)
4. Deine Position: Collateral 10 ETH, Debt 15.000 USDC

### LTV — Drei Begriffe, drei Bedeutungen

In Lending-Protokoll-Dokumentation finden sich drei verschiedene LTV-Begriffe, die oft verwechselt werden:

**1. Aktueller LTV (current LTV):**
```
Current LTV = Debt Value / Collateral Value
```
Beispiel: 15.000 USDC Debt / 30.000 USD Collateral = 50 %

**2. Maximum LTV (Max LTV / Collateral Factor):**
Die maximale Schwelle, bis zu der du initial borrowen darfst. Für ETH auf Aave: typischerweise 80 %.

**3. Liquidation Threshold (LT):**
Die Schwelle, über der deine Position liquidiert werden kann. Für ETH auf Aave: typischerweise 82,5 %.

**Der entscheidende Punkt:** Max LTV < Liquidation Threshold. Die Differenz ist ein Puffer. Du kannst bis zu 80 % borrowen, wirst aber erst bei 82,5 % liquidiert. Wenn dein LTV zwischen diesen Werten liegt, kannst du nicht weiter borrowen, bist aber (noch) sicher.

### Health Factor

Der Health Factor ist die intuitive Kennzahl, die alle Protokolle verwenden, um Positionssicherheit anzuzeigen.

**Formel:**
```
Health Factor = (Collateral Value * Liquidation Threshold) / Debt Value
```

**Interpretation:**
- Health Factor > 1 → sichere Position
- Health Factor = 1 → Liquidation Trigger
- Health Factor < 1 → liquidierbar

**Beispielrechnung:**
- Collateral: 30.000 USD in ETH
- LT: 82,5 %
- Debt: 15.000 USDC

```
HF = (30.000 * 0.825) / 15.000 = 24.750 / 15.000 = 1.65
```

Health Factor 1.65 bedeutet: Dein Collateral müsste um den Faktor 1.65 an Wert verlieren (oder dein Debt um 1.65 steigen), bevor du liquidiert wirst.

### Multi-Asset-Collateral

Wenn du mehrere Collateral-Assets hast, berechnet sich der Health Factor über die gewichtete Summe der jeweiligen Liquidation Thresholds.

**Beispiel:**
- 5 ETH (Wert 15.000 USD), LT = 82,5 %
- 10.000 USDC (Wert 10.000 USD), LT = 80 %
- Debt: 8.000 USDT

```
Total Weighted Collateral = 15.000 * 0.825 + 10.000 * 0.80
                          = 12.375 + 8.000
                          = 20.375 USD

HF = 20.375 / 8.000 = 2.55
```

### Safety-Margin-Strategien

**Conservative (HF > 3):**
- Kapital-effizient: niedrig
- Liquidations-Sicherheit: sehr hoch
- Geeignet für: passive Leverage, lange Haltedauer, hohe ETH-Vola-Erwartung

**Moderate (HF 1.8–2.5):**
- Kapital-effizient: mittel
- Liquidations-Sicherheit: mittel
- Geeignet für: aktiv überwachte Positionen, mittelfristige Horizonte

**Aggressive (HF 1.3–1.7):**
- Kapital-effizient: hoch
- Liquidations-Sicherheit: niedrig
- Geeignet für: nur für erfahrene Operatoren mit automatisierter Überwachung

**Dangerous (HF < 1.3):**
- Praktisch garantiert, dass ein signifikanter Preisdip dich liquidiert
- Nur als kurzfristige, aktiv bewachte Strategie akzeptabel

**Wichtig:** Eine HF-Berechnung ist eine Momentaufnahme. Der HF ändert sich mit jedem Preistick. Du brauchst entweder aktives Monitoring oder automatisierte Repayment-Bots.

### Oracle-Risiko

Der HF wird anhand von **Protokoll-Oracles** berechnet — typischerweise Chainlink Price Feeds. Wenn ein Oracle fehlerhaft Preise meldet oder hängt, kann deine Position falsch bewertet werden. Historisch: der Mango-Markets-Hack (2022) manipulierte Oracle-Preise, um Positionen künstlich aufzublasen und Gelder zu drainen.

## Slide Summary

[Slide 1] **Titel: Collateral, LTV und Health Factor**
• Überbesicherung als Kern-Konzept
• LTV drei Arten unterscheiden
• Health Factor berechnen
• Safety Margin wählen

[Slide 2] **Warum überbesichert?**
• Keine On-Chain-Identität
• Keine Kreditwürdigkeit
• Collateral ist die einzige Absicherung
• Typisch: 150% Collateral für 100% Debt

[Slide 3] **Drei LTV-Begriffe**
• Current LTV: Debt / Collateral (aktuell)
• Max LTV: initiale Borrow-Schwelle
• Liquidation Threshold: Liquidations-Schwelle
• Max LTV < LT (Puffer-Zone)

[Slide 4] **Health Factor Formel**
• HF = (Collateral * LT) / Debt
• HF > 1 = sicher
• HF = 1 = Liquidations-Trigger
• HF < 1 = liquidierbar

[Slide 5] **Beispielrechnung**
• Collateral: 30.000 USD ETH, LT=82.5%
• Debt: 15.000 USDC
• HF = (30.000 * 0.825) / 15.000 = 1.65
• Bedeutung: 1.65x Puffer bis Liquidation

[Slide 6] **Multi-Asset-Collateral**
• Gewichtete Summe pro Asset
• 5 ETH (LT=82.5%) + 10k USDC (LT=80%) = 20.375 weighted
• Debt 8k → HF = 2.55

[Slide 7] **Safety-Margin-Strategien**
• HF > 3: Conservative (passive, sicher)
• HF 1.8-2.5: Moderate (aktiv überwacht)
• HF 1.3-1.7: Aggressive (nur für Profis)
• HF < 1.3: Gefährlich

[Slide 8] **Oracle-Risiko**
• HF hängt vom Protocol-Oracle ab
• Chainlink typisch, aber nicht perfekt
• Mango Markets 2022: Oracle-Manipulation
• Monitoring nötig für Oracle-Health

## Voice Narration Script

[Slide 1] Lektion 5.3 ist der Kern jedes DeFi-Lending-Protokolls: Collateral, LTV und Health Factor. Das sind die Kennzahlen, mit denen du die Sicherheit jeder Borrow-Position bewertest und entscheidest, ob sie nachhaltig ist.

[Slide 2] DeFi-Lending ist fundamental überbesichert. Das heisst: Wer borrowen will, muss mehr Sicherheit hinterlegen, als er borrwt. Typisch: 150 Prozent Collateral für 100 Prozent Debt. Warum? Weil es keine On-Chain-Identität gibt. Kein Credit Score, kein Einkommensnachweis, keine Gericht, vor dem du klagen könntest. Die einzige Absicherung gegen Default ist das Collateral selbst.

[Slide 3] Drei LTV-Begriffe, die oft verwechselt werden. Current LTV ist der aktuelle Zustand — Debt geteilt durch Collateral. Max LTV ist die Schwelle, bis zu der du initial borrowen darfst. Liquidation Threshold ist die Schwelle, über der du liquidiert wirst. Wichtig: Max LTV ist niedriger als Liquidation Threshold. Für ETH bei Aave: Max LTV 80 Prozent, LT 82,5 Prozent. Die Differenz ist ein Puffer.

[Slide 4] Der Health Factor ist die zentrale Sicherheits-Kennzahl. Formel: Collateral-Wert mal Liquidation Threshold, geteilt durch Debt-Wert. HF grösser als 1 heisst sicher. HF gleich 1 ist der Liquidations-Trigger. HF kleiner als 1 heisst, du kannst liquidiert werden.

[Slide 5] Konkretes Beispiel. 30.000 USD Collateral in ETH. Liquidation Threshold 82,5 Prozent. Debt 15.000 USDC. Die Rechnung: 30.000 mal 0,825 gleich 24.750. Geteilt durch 15.000 gleich 1,65. Health Factor 1,65 heisst: Dein Collateral müsste um den Faktor 1,65 an Wert verlieren, bevor du liquidiert wirst — also ein ETH-Preisdrop von etwa 40 Prozent.

[Slide 6] Multi-Asset-Collateral funktioniert über gewichtete Summen. Jedes Asset hat seinen eigenen Liquidation Threshold. Du summierst Collateral-Wert mal LT für jedes Asset auf, teilst durch Gesamt-Debt. Beispiel: 5 ETH mit LT 82,5 Prozent plus 10.000 USDC mit LT 80 Prozent ergibt 20.375 USD gewichtetes Collateral. Debt 8.000 USDT. Health Factor 2,55.

[Slide 7] Safety-Margin-Strategien. Health Factor über 3 ist konservativ — kapital-ineffizient, aber sehr sicher. Health Factor 1,8 bis 2,5 ist moderat — braucht aktives Monitoring. 1,3 bis 1,7 ist aggressiv — nur für Operatoren mit automatisierter Überwachung. Unter 1,3 ist praktisch garantiert, dass ein signifikanter Preisdip dich liquidiert.

[Slide 8] Oracle-Risiko ist der unsichtbare Teil. Der Health Factor wird anhand von Protokoll-Oracles berechnet — typischerweise Chainlink Price Feeds. Ein fehlerhafter oder manipulierter Oracle kann deine Position falsch bewerten. Der Mango-Markets-Hack 2022 manipulierte Oracle-Preise, um Positionen aufzublasen und Gelder zu drainen. Oracle-Health ist ein Faktor, der in der HF-Zahl nicht sichtbar wird, aber einen Tail-Risk darstellt.

## Visual Suggestions

[Slide 1] Titel mit Health-Factor-Gauge-Visualisierung (Tachometer-Stil).

[Slide 2] Collateral-vs-Debt-Schaubild: grosses blaues Rechteck (Collateral 150), kleineres rotes (Debt 100), Differenz als Puffer markiert.

[Slide 3] Drei-Spalten-Tabelle: Current LTV / Max LTV / Liquidation Threshold mit ETH-Beispielwerten.

[Slide 4] Health-Factor-Gauge: grün (>2), gelb (1.3-2), rot (<1.3), mit Liquidations-Trigger-Linie bei HF=1.

[Slide 5] Konkrete Zahlen in Kasten-Darstellung, Rechnungsweg zeilenweise.

[Slide 6] Multi-Asset-Tabelle mit gewichteten Beiträgen.

[Slide 7] Vier Zonen-Diagramm (Safety-Level vs Kapital-Effizienz), jeweils mit Use-Case-Labels.

[Slide 8] Oracle-Flow: Chainlink → Protocol Smart Contract → Health Factor. Mit Fehler-Szenario Pfeil.

**SCREENSHOT SUGGESTION:** Aave V3 Dashboard mit aktiver Position, Health-Factor-Anzeige prominent sichtbar.

**SCREENSHOT SUGGESTION:** DeBank oder Zerion Portfolio-View einer Whale-Adresse mit Multi-Protocol-Positionen und aggregiertem HF.

## Exercise

**Aufgabe: Position Design**

Du hast 50.000 USD zur Verfügung. Du willst ETH-Exposure mit moderater Leverage aufbauen.

**Parameter:**
- ETH-Preis: 3.500 USD
- ETH auf Aave V3: Max LTV 80 %, LT 82,5 %
- USDC: keine eigene Volatilität, LT 80 %
- Ziel: HF = 2.0 (moderate Safety)

**Schritte:**
1. Berechne, wieviel ETH du kaufen kannst, wenn du alles in ETH investierst
2. Supply diese ETH als Collateral
3. Berechne, wieviel USDC du maximal borrowen kannst, um HF = 2.0 zu erreichen
4. Überlege: Was passierst mit deiner HF, wenn ETH um 20 % fällt?
5. Überlege: Was passiert mit deiner HF, wenn ETH um 20 % fällt UND du die geborgten USDC in mehr ETH umgetauscht hattest (Leverage-Loop — Vorschau auf Modul 8)?

**Deliverable:** Rechnung mit allen Zwischenschritten, Sensitivity-Analyse für ±20 % und ±40 % ETH-Bewegung.

## Quiz

**Frage 1:** Du hast 20 ETH (aktueller Preis 3.000 USD/ETH, also 60.000 USD Collateral). ETH's Liquidation Threshold ist 82,5 %. Du borrwst 30.000 USDC. Was ist dein Health Factor?

<details><summary>Antwort</summary>
HF = (60.000 * 0.825) / 30.000 = 49.500 / 30.000 = **1.65**

Dein Puffer ist Faktor 1,65 — dein Collateral müsste um ~40 % fallen (oder dein Debt um Faktor 1,65 steigen) bevor Liquidation.
</details>

**Frage 2:** Dein Health Factor ist 1.5. ETH fällt um 30 %. Was passiert?

<details><summary>Antwort</summary>
Wenn ETH um 30 % fällt, fällt dein Collateral-Wert proportional um 30 %. Der neue HF ist:

HF_neu = HF_alt * (1 - 0.30) = 1.5 * 0.70 = **1.05**

Du bist nicht liquidiert (HF > 1), aber extrem nahe dran. Ein weiterer 5 %-Preisdrop würde HF unter 1 bringen und Liquidation triggern. Du müsstest entweder sofort Debt zurückzahlen oder mehr Collateral supplyen.

**Wichtiger Nebenpunkt:** Ein 30 %-Preisdrop ist für ETH in turbulenten Phasen realistisch. HF-Margin von 1.5 ist für volatile Collaterals wie ETH unzureichend.
</details>

---

# Lektion 5.4 — Die Anatomie einer Liquidation

## Learning Objectives

Am Ende dieser Lektion können Teilnehmer:
- Den Liquidations-Workflow Schritt für Schritt beschreiben
- Die Liquidation Penalty und Liquidator Bonus erklären
- Close Factor verstehen und dessen Wirkung auf partielle Liquidationen
- Die Rolle von Liquidator-Bots im DeFi-Ökosystem einordnen
- Liquidation als MEV-Opportunity erkennen

## Explanation

### Wann wird eine Position liquidierbar?

Eine Position wird im Moment liquidierbar, in dem ihr Health Factor unter 1 sinkt. Das kann passieren durch:

1. **Preisdrop des Collaterals:** ETH fällt, dein ETH-Collateral verliert Wert, HF sinkt
2. **Preisanstieg des Debts:** Du hast Stablecoins geborgt und eine Volatilitäts-Debt-Position wie WBTC. Wenn WBTC steigt, steigt deine Debt in USD-Werten. (Selten, aber möglich)
3. **Zins-Akkumulation:** Wenn du eine Position lange offen lässt, wächst dein Debt durch Zinsen. Bei konstantem Collateral-Preis sinkt dein HF langsam
4. **LT-Änderung durch Governance:** Sehr selten, aber das Protokoll kann den Liquidation Threshold eines Assets senken (z.B. bei neu entdeckten Risiken)

### Der Liquidations-Workflow

Liquidationen sind **nicht** automatisch durchgeführt von einem zentralen System. Stattdessen sind sie offen — jeder kann Liquidator werden, indem er die `liquidationCall`-Funktion im Protokoll aufruft.

**Ablauf Schritt für Schritt:**

1. Borrower's HF fällt unter 1 (beispielsweise durch ETH-Drop)
2. Liquidator-Bots überwachen dies kontinuierlich
3. Ein Bot ruft `liquidationCall(collateralAsset, debtAsset, user, debtToCover, receiveAToken)` auf Aave auf
4. Bot zahlt einen Teil der Debt des Borrowers zurück (z.B. 50 % bei Aave's typischem Close Factor)
5. Bot erhält im Gegenzug einen äquivalenten Wert des Collaterals plus einen Bonus (Liquidation Penalty)
6. Borrower's Debt sinkt, aber sein Collateral sinkt noch stärker — er zahlt die Strafe
7. Health Factor wird neu berechnet. Wenn immer noch < 1, kann eine weitere Liquidation erfolgen.

### Close Factor

Bei den meisten Protokollen liquidiert ein einzelner Call **nicht** die gesamte Position, sondern nur einen Teil — den **Close Factor**. Aave V3's Close Factor ist typischerweise 50 %.

Begründung: 
- Ein voller Close könnte Liquidator wegen Slippage unattraktiv machen
- Ein partieller Close lässt den Borrower mit einer Position zurück, die nach der Liquidation wieder einen gesunden HF haben kann (wenn der Preis sich erholt)

**Beispiel Aave:**
- Position: 10 ETH Collateral (30k USD), 20k USDC Debt
- ETH fällt auf 2.400 USD → Collateral-Wert 24k USD
- HF = (24k * 0.825) / 20k = 0.99 → liquidierbar
- Bot zahlt 50 % der Debt zurück (10k USDC)
- Bot erhält 10k USDC-Wert in ETH plus 5 % Bonus = 10.500 USD in ETH = 4,375 ETH
- Nach Liquidation: Borrower hat 5,625 ETH (13.500 USD Collateral), 10k USDC Debt
- Neuer HF = (13.500 * 0.825) / 10.000 = 1,11 → wieder sicher

### Liquidation Penalty / Liquidator Bonus

Die Liquidation Penalty ist der Strafzuschlag, den der Borrower zusätzlich zum liquidierten Collateral-Wert verliert. Gleichzeitig ist sie der Bonus für den Liquidator.

**Typische Werte:**
- ETH, WBTC (blue chips): 5–7,5 %
- Stablecoins als Collateral: 4–5 %
- Volatile Altcoins: 10–15 %
- Exotische oder long-tail Assets: bis zu 20 %

Warum diese Spread? Volatile Collaterals haben höheres Slippage-Risiko für den Liquidator. Der höhere Bonus kompensiert.

### Liquidator-Bots als Infrastruktur

Liquidator-Bots sind ein eigenes, wettbewerbsintensives Segment von DeFi-Operatoren:

**Typischer Setup:**
- Node-Betrieb mit mempool-Zugriff
- Monitoring aller Positions aller grossen Lending-Protokolle
- Flashbots-basierte Submission für MEV-Protection (siehe Modul 9, 10)
- Flash-Loan-basierte Liquidations, um kein eigenes Kapital vorhalten zu müssen

**Wirtschaft:**
- Top-Liquidators verdienen 7-stellige Jahresgewinne
- In volatilen Phasen (z.B. Mai 2022 Terra-Crash, November 2022 FTX-Crash) können einzelne Tage Millionen bringen
- Hochkompetitiv — Slippage-Management und Gas-Auction-Dynamics entscheiden über Profit

### Liquidation als MEV

Liquidationen sind eine Form von MEV (Miner/Maximal Extractable Value). Mehrere Bots konkurrieren um die gleiche Liquidation. Der Gewinner ist der, der am meisten Gas zahlt (bzw. via Flashbots am besten bieten kann). Typisches Bidding: 50-90 % des Liquidation-Bonus gehen als Gas an den Validator.

Das hat eine indirekte Konsequenz für Borrower: Wenn sich eine Liquidations-Opportunity anbahnt, versuchen Bots, sie zu „snipen" — sehr schnell und mit hohem Gas. Das kann für einen Borrower bedeuten, dass seine Chance auf Repayment oder Collateral-Top-up **in der realen Transaktion** sehr knapp ist.

### Cascade Liquidations und Systemrisiko

In extremen Marktphasen (Flash Crash, Black Swan) können Liquidationen eine Kaskade auslösen:

1. ETH-Preis droppt stark
2. Tausende Positions werden gleichzeitig liquidierbar
3. Liquidator-Bots dumpen grosse Mengen ETH on DEXes
4. DEX-Preis droppt weiter
5. Noch mehr Positions werden liquidierbar

Das ist genau das Szenario, das zu Bad Debt führen kann — wenn die DEX-Liquidität nicht reicht, um den kompletten Collateral zum Oracle-Preis zu verkaufen. Der Protokoll-Reserve Factor ist dafür der Puffer.

## Slide Summary

[Slide 1] **Titel: Die Anatomie einer Liquidation**
• Trigger und Workflow
• Close Factor und Liquidation Penalty
• Liquidator-Bot-Ökosystem
• Liquidation als MEV und Systemrisiko

[Slide 2] **Wann wird liquidiert?**
• HF fällt unter 1
• Ursachen: Collateral-Preisdrop, Debt-Preisanstieg
• Zins-Akkumulation über Zeit
• Selten: LT-Änderung durch Governance

[Slide 3] **Liquidations-Workflow**
• Niemand „automatisiert" — offen für alle
• liquidationCall(...) on-chain
• Bot zahlt Debt zurück
• Bot erhält Collateral + Bonus

[Slide 4] **Close Factor**
• Aave V3: 50% pro Liquidation-Call
• Kein komplettes Wipe-Out in einem Call
• Begründung: Slippage-Risk + Rehabilitation

[Slide 5] **Konkretes Beispiel**
• Position: 10 ETH / 20k USDC
• ETH droppt, HF = 0.99
• Bot liquidiert 50%: erhält 4.375 ETH, Borrower hat 5.625 ETH übrig
• Neuer HF nach Liquidation: 1.11

[Slide 6] **Liquidation Penalty**
• Blue Chips: 5-7.5%
• Stablecoins: 4-5%
• Volatile Altcoins: 10-15%
• Exotics: bis 20%

[Slide 7] **Liquidator-Bot-Ökosystem**
• Wettbewerbsintensiv
• MEV-basiertes Bidding
• Flash-Loans für Kapital-Effizienz
• Top-Bots: 7-stellig Jahresgewinne

[Slide 8] **Cascade & Bad Debt**
• Preisdrop → Multi-Liquidations → mehr Dumping → weiterer Preisdrop
• Black Swan Scenario
• Reserve Factor als Puffer
• Systemische Implikation für alle Supplier

## Voice Narration Script

[Slide 1] Lektion 5.4 behandelt die Anatomie einer Liquidation — was genau passiert, wenn dein Health Factor unter 1 fällt. Wir gehen Schritt für Schritt durch den Workflow, verstehen den Close Factor, die Liquidation Penalty und das Liquidator-Bot-Ökosystem.

[Slide 2] Was löst eine Liquidation aus? Der primäre Trigger ist HF unter 1. Das kann passieren durch einen Preisdrop des Collaterals — etwa wenn ETH fällt. Oder durch einen Preisanstieg des Debts, wenn du Volatilitäts-Assets geborgt hast. Oder einfach durch Zins-Akkumulation über die Zeit. Sehr selten ändert die Governance den Liquidation Threshold eines Assets und macht dadurch bestehende Positions verwundbar.

[Slide 3] Der Workflow ist offen. Niemand „automatisiert" Liquidationen im Sinne eines zentralen Systems. Stattdessen ruft jeder — der kann und will — die liquidationCall-Funktion des Protokolls auf. Der Liquidator zahlt einen Teil der Debt des Borrowers zurück und erhält im Gegenzug ein Stück Collateral plus einen Bonus.

[Slide 4] Der Close Factor ist eine wichtige Nuance. Bei Aave V3 beträgt er 50 Prozent — das heisst: Ein einzelner Liquidations-Call liquidiert maximal 50 Prozent der Debt, nicht die gesamte Position. Das reduziert Slippage-Risiken für den Liquidator und gibt dem Borrower eine Chance auf Rehabilitation, wenn sich der Preis erholt.

[Slide 5] Konkretes Beispiel. Du hast 10 ETH als Collateral und 20.000 USDC Debt. ETH fällt von 3000 auf 2400. Dein Collateral-Wert: 24.000 USD. HF fällt auf 0,99 — liquidierbar. Ein Bot zahlt 50 Prozent der Debt zurück, also 10.000 USDC. Dafür nimmt er 10.500 USD in ETH — also 4,375 ETH — mit dem 5-Prozent-Bonus. Du behältst 5,625 ETH und 10.000 USDC Debt. Dein neuer Health Factor ist 1,11. Die Position wurde „geheilt", aber dich hat es 500 USD gekostet.

[Slide 6] Die Liquidation Penalty variiert nach Asset-Risiko. Blue Chips wie ETH und WBTC haben 5 bis 7,5 Prozent. Stablecoins als Collateral haben 4 bis 5 Prozent — das niedrigste Risiko. Volatile Altcoins liegen bei 10 bis 15 Prozent. Exotische Long-Tail-Assets können bis zu 20 Prozent Penalty haben. Die Begründung: Volatile Collaterals haben höheres Slippage-Risiko für den Liquidator, der höhere Bonus kompensiert das.

[Slide 7] Das Liquidator-Bot-Ökosystem ist ein eigenes hochprofessionelles DeFi-Segment. Top-Liquidators verdienen 7-stellige Jahresgewinne. Sie betreiben Nodes mit Mempool-Zugriff, monitoren kontinuierlich alle grossen Lending-Protokolle, nutzen Flashbots für MEV-Protection und Flash-Loans, um kein eigenes Kapital vorhalten zu müssen. In volatilen Phasen — Terra-Crash 2022, FTX-Crash 2022 — können einzelne Tage Millionen einbringen.

[Slide 8] Cascade-Liquidationen und Systemrisiko. In extremen Phasen kann ein Preisdrop Tausende Positions gleichzeitig liquidierbar machen. Die Bots dumpen die liquidierten Collaterals auf DEXes. Das drückt den Preis weiter. Noch mehr Positions werden liquidierbar. Das ist das Black-Swan-Szenario. Wenn DEX-Liquidität nicht reicht, kann Bad Debt entstehen — das Protokoll verkauft Collateral unter Debt-Wert. Der Reserve Factor ist das Polster dafür, aber in extremen Fällen wird der Verlust auf Supplier sozialisiert. In der nächsten Lektion schauen wir uns die Struktur-Unterschiede zwischen den grossen Lending-Protokollen an.

## Visual Suggestions

[Slide 1] Titel mit Liquidations-Hammer-Icon, HF-Gauge im Hintergrund deep red.

[Slide 2] Vier Trigger-Quadranten: Collateral Drop, Debt Rise, Interest Accumulation, LT Change.

[Slide 3] Sequenz-Diagramm: Borrower → HF<1 → Bot → liquidationCall → Bot zahlt / bekommt.

[Slide 4] Balken-Vergleich: ganze Position vs 50%-Close. Mit Pfeil auf verbleibende Position.

[Slide 5] Step-by-Step-Animation der Beispielrechnung, Zahlen verändern sich.

[Slide 6] Tabelle: Asset-Kategorie vs typische Penalty mit konkreten Prozenten.

[Slide 7] Architektur-Diagramm: Node → Mempool → Bot → Flashbots → liquidationCall.

[Slide 8] Cascade-Diagramm: Preis-Spiral mit Liquidations-Ereignissen, Bad-Debt-Bereich markiert.

**SCREENSHOT SUGGESTION:** Aave V3 Liquidation-Historie auf app.aave.com/history oder dune.com/queries/aave-liquidations zeigt echte Liquidation-Events.

**SCREENSHOT SUGGESTION:** Etherscan-Transaktion einer konkreten Liquidation zeigt den `liquidationCall`-Input, Decoded Input Data und Token Transfers.

## Exercise

**Aufgabe: Liquidation Forensics**

1. Gehe auf Dune Analytics oder direkt auf Etherscan und finde eine Aave-Liquidation vom letzten Monat
2. Analysiere:
   - Welches Collateral wurde liquidiert?
   - Welche Debt wurde zurückgezahlt?
   - Wie hoch war der Liquidator-Bonus absolut (USD)?
   - Welche Adresse war der Liquidator?
3. Schaue den Liquidator-Account auf Etherscan an: Wie viele Liquidationen hat er historisch durchgeführt?
4. Bonus: Finde eine Liquidation, bei der ein Flash Loan verwendet wurde. Kannst du den Flow nachvollziehen?

**Deliverable:** Screenshots der Transaktion + eine kurze Analyse der Liquidator-Ökonomie (geschätzter Gas-Cost vs Bonus).

## Quiz

**Frage 1:** Position: 20.000 USD Collateral in ETH (LT 82,5 %), 15.000 USDC Debt. ETH fällt so, dass der Collateral-Wert auf 18.000 USD sinkt. Was passiert?

<details><summary>Antwort</summary>
HF = (18.000 * 0.825) / 15.000 = 14.850 / 15.000 = **0.99**

HF < 1 → Liquidierbar.

Ein Liquidator zahlt 50 % Debt = 7.500 USDC zurück. Er erhält Collateral im Wert von 7.500 * 1.05 (5 % Bonus) = 7.875 USD in ETH.

Nach Liquidation:
- Collateral: 18.000 - 7.875 = 10.125 USD
- Debt: 15.000 - 7.500 = 7.500 USD
- Neuer HF: (10.125 * 0.825) / 7.500 = 1.11 → wieder sicher

Der Borrower hat 375 USD an Penalty verloren.
</details>

**Frage 2:** Warum ist die Liquidation Penalty für volatile Altcoins höher als für ETH?

<details><summary>Antwort</summary>
Zwei Gründe, beide slippage-bezogen:

1. **DEX-Liquidität:** Volatile Altcoins haben dünnere DEX-Liquidität. Ein Liquidator, der 100.000 USD an Altcoin-Collateral erhält und sofort verkaufen will, erleidet hohen Price Impact.

2. **Preis-Vola während des Block-Prozesses:** Ein Altcoin kann zwischen Bot-Submission und Transaction-Inclusion 5-10% Preisbewegung haben. Höherer Bonus = höhere Marge für Volatilitäts-Buffer.

Wenn der Bonus zu niedrig wäre, würden Bots diese Liquidationen nicht durchführen. Das würde zu erhöhter Bad-Debt-Gefahr führen. Deshalb: Protokolle müssen die Penalty an das Liquiditäts- und Vola-Profil jedes Assets anpassen.
</details>

---

# Lektion 5.5 — Aave vs Compound vs Morpho: Struktur-Vergleich

## Learning Objectives

Am Ende dieser Lektion können Teilnehmer:
- Die strukturellen Unterschiede zwischen Aave V3, Compound V3 und Morpho Blue benennen
- Das Pooled-Model (Aave, Compound) vom Isolated-Markets-Model (Morpho) abgrenzen
- Die Implikationen für Asset-Risiko und Kapitaleffizienz ableiten
- Das richtige Protokoll für unterschiedliche Use-Cases wählen
- Risiken und Trade-offs jedes Ansatzes identifizieren

## Explanation

### Drei Architekturen im Vergleich

Die drei grossen Lending-Protokolle — Aave V3, Compound V3 und Morpho Blue — verfolgen unterschiedliche Design-Philosophien, die unterschiedliche Use-Cases optimal bedienen.

### Aave V3 — Multi-Asset Pooled Market

**Struktur:**
- Ein Protokoll mit mehreren Märkten (Ethereum, Arbitrum, Optimism, Base, Polygon, etc.)
- Jeder Markt hat einen Pool mit vielen unterstützten Assets
- Collateral kann beliebig kombiniert werden (ETH als Collateral, USDC als Borrow, etc.)
- Liquidation-Thresholds pro Asset definiert

**Vorteile:**
- Maximale Flexibilität für Borrower (Cross-Collateralisation möglich)
- Grosse Liquidität in blue-chip-Assets
- E-Mode für Correlated Assets (siehe Lektion 5.6)
- Umfangreiche Asset-Auswahl (50+ Assets pro Markt)

**Nachteile:**
- Shared Risk: Ein schlechtes Asset kann das ganze Protokoll gefährden
- Governance notwendig, um jedes neue Asset zu approven (langsamer Onboarding)
- Reserve Factor muss Bad-Debt-Risiken über alle Assets hinweg absorbieren

**Typische Use-Cases:**
- Blue-Chip-Leverage (ETH, WBTC, stETH)
- Stablecoin-Borrowing gegen volatile Collaterals
- E-Mode-basierte Hoch-LTV-Strategien auf stETH/ETH

### Compound V3 — Single-Borrow-Asset Markets

**Struktur (ab V3):**
- Jeder Markt hat **einen einzigen Borrow-Asset** (z.B. USDC-Markt, WETH-Markt)
- Multiple Collateral-Assets möglich
- Supplier supplen nur den Borrow-Asset (USDC-Supplier im USDC-Markt)
- Collateral-Supplier verdienen keine Zinsen (nur Borrow-Asset-Supplier tun das)

**Vorteile:**
- Reduzierte Komplexität — jedes Risk ist auf einen Markt isoliert
- Klarere Risiko-Attribution
- Bessere Kapital-Effizienz auf der Supply-Seite (weniger Dilution)

**Nachteile:**
- Weniger flexibel für Borrower
- Multiple Märkte nötig für Stablecoin-Diversification
- Collateral-Yield verloren (ETH als Collateral bringt keine Zinsen)

**Typische Use-Cases:**
- USDC-Borrower mit ETH/WBTC-Collateral
- Supplier, die spezifisch nur ein einzelnes Stablecoin-Exposure wollen

### Morpho Blue — Permissionless Isolated Markets

**Struktur:**
- Jeder Markt ist ein isolierter Pool mit **genau einem Collateral + einem Loan-Asset**
- Markt-Parameter (LT, LTV, IRM, Oracle) sind bei Markt-Erstellung fixed und immutable
- Jeder kann ohne Governance einen neuen Markt erstellen (permissionless)
- Auf Morpho Blue existieren Vaults (MetaMorpho), die Supplier-Kapital auf mehrere Underlying-Märkte allokieren

**Vorteile:**
- Kein Shared Risk zwischen Märkten — Bad Debt bleibt isoliert
- Immutable Parameters eliminieren Governance-Risiko
- Permissionless Market Creation ermöglicht long-tail Assets
- Für Supplier: Vault-Strategien können auf Market-Level Risiken optimieren

**Nachteile:**
- Fragmentierung — Liquidität auf viele kleine Märkte verteilt
- Weniger Kapital-Effizient für Borrower mit Multi-Asset-Collateral
- Vault-Curator-Risiko (welches Vault-Management ist vertrauenswürdig?)

**Typische Use-Cases:**
- Spezialisierte Leverage-Strategien mit spezifischem Collateral-Loan-Paar
- High-Efficiency-Correlated-Pairs (stETH/ETH, sDAI/USDC)
- Long-Tail-Assets, die Aave/Compound nicht listen würden

### Konkrete Kennzahlen (Anfang 2026, repräsentative Werte)

| Metrik | Aave V3 | Compound V3 | Morpho Blue |
|--------|---------|-------------|-------------|
| Total TVL | ~$25B | ~$3B | ~$5B |
| Supported Chains | 10+ | 4 | 3 |
| Assets (typ. Markt) | 50+ | 1 Borrow + 5-10 Collateral | 1+1 pro Markt |
| Max LTV (ETH) | 80% | 82,5% | bis zu 91,5% (LST-Märkte) |
| Governance | Aave DAO | Compound DAO | Keine (immutable per Markt) |
| Flash Loans | Ja (native) | Nein | Nein (aber via Aave möglich) |
| E-Mode / Efficiency | Ja | Ja (per Markt) | Nativ per Markt |

### Protokoll-Wahl: Eine Entscheidungsmatrix

**Wähle Aave V3 wenn:**
- Du Multi-Asset-Collateral haben willst
- Du Flash Loans brauchst
- Du E-Mode für Correlated Assets nutzen willst
- Du die grösste Liquidität brauchst (grosse Positions ohne Slippage)

**Wähle Compound V3 wenn:**
- Du spezifisch einen USDC/USDT/WETH-Borrow mit klarem Risk-Profile willst
- Du keinen Multi-Asset-Collateral brauchst
- Du einfachere Risk-Modelle bevorzugst

**Wähle Morpho Blue wenn:**
- Du optimale Rates suchst (Morpho bietet oft bessere Rates durch Effizienz)
- Du spezifische Paare wie stETH/ETH mit sehr hoher LTV brauchst
- Du Long-Tail-Assets nutzen willst, die woanders nicht gelistet sind
- Du Governance-Risiko vermeiden willst (Immutable Markets)

### Morpho Blue + MetaMorpho Vaults — das aktuelle Power-Setup

MetaMorpho-Vaults sind Abstractions über Morpho Blue: Ein Vault-Curator definiert eine Allokations-Strategie über mehrere Morpho-Blue-Märkte. Supplier deponieren in den Vault und der Curator allokiert zu den besten Märkten.

**Beispiel — Steakhouse USDC Vault:**
- Supplier zahlen USDC ein
- Der Curator allokiert auf verschiedene USDC-Märkte (USDC/ETH, USDC/wstETH, USDC/WBTC, etc.)
- Rendite ist ein Mix aus den Einzelmärkten
- Curator trägt Verantwortung für Risiko-Allokation

Das macht Morpho für Supplier attraktiv — sie bekommen Diversifikation ohne manuell auf viele Märkte allokieren zu müssen.

## Slide Summary

[Slide 1] **Titel: Aave vs Compound vs Morpho**
• Drei Design-Philosophien
• Pooled vs Isolated Markets
• Kapital-Effizienz-Trade-offs
• Use-Case-Matching

[Slide 2] **Aave V3 — Multi-Asset Pooled**
• Ein Pool, viele Assets
• Cross-Collateralisation möglich
• E-Mode für correlated assets
• Shared Risk als Kehrseite

[Slide 3] **Compound V3 — Single-Borrow-Markets**
• Ein Borrow-Asset pro Markt
• Multiple Collaterals möglich
• Collateral-Suppliers verdienen nichts
• Isoliertes Risk pro Markt

[Slide 4] **Morpho Blue — Permissionless Isolated**
• 1 Collateral + 1 Loan pro Markt
• Immutable Parameters
• Permissionless Market Creation
• MetaMorpho-Vaults als Aggregation

[Slide 5] **Kennzahlen-Vergleich**
• TVL: Aave 25B > Morpho 5B > Compound 3B
• LTV (ETH): Morpho bis 91.5% > Compound 82.5% > Aave 80%
• Flash Loans: nur Aave nativ
• Governance: Aave/Compound DAO vs Morpho immutable

[Slide 6] **Wann welches Protokoll?**
• Aave: Max Flexibilität, Flash Loans, E-Mode
• Compound: Einzel-Asset-Borrow, einfache Risk
• Morpho: Optimale Rates, spezifische Paare, no-governance

[Slide 7] **MetaMorpho-Vaults**
• Abstractions über Morpho Blue Märkte
• Curator-basierte Allokation
• Diversifikation für Supplier
• Neues Risiko: Curator-Kompetenz

[Slide 8] **Key Takeaway**
• Keine „beste" Protokoll — nur beste Wahl pro Use-Case
• Aave/Compound: Pooled = Convenience + Shared Risk
• Morpho: Isolated = Isolated Risk + Fragmentierung
• Kenne die Trade-offs

## Voice Narration Script

[Slide 1] Lektion 5.5 ist der strategische Teil von Modul 5: Der Struktur-Vergleich der drei grossen Lending-Protokolle. Aave, Compound und Morpho haben fundamental unterschiedliche Architekturen — jede optimiert für andere Use-Cases. Wer das versteht, wählt das richtige Protokoll für die richtige Strategie.

[Slide 2] Aave V3 ist das Multi-Asset Pooled Market Modell. Ein Pool pro Chain mit typisch 50 Plus Assets. Du kannst Multi-Asset-Collateral hinterlegen — ETH, WBTC, stETH gleichzeitig — und gegen jeden beliebigen Asset borrowen. Das ist maximale Flexibilität. Die Kehrseite: Shared Risk. Ein Bug in einem obscuren Asset kann das ganze Protokoll gefährden. Aave löst das über langsame Governance und aggressive Risk-Parameter.

[Slide 3] Compound V3 ist das Single-Borrow-Asset-Model. Jeder Markt hat genau einen Borrow-Asset — beispielsweise USDC — und multiple Collateral-Assets. Supplier im USDC-Markt supplen nur USDC. Collateral-Supplier — die ETH als Collateral hinterlegen — verdienen keine Zinsen. Der Vorteil ist isoliertes Risk pro Markt und einfachere Risk-Modelle. Der Nachteil: Weniger Flexibilität und Collateral-Yield geht verloren.

[Slide 4] Morpho Blue ist der radikalste Ansatz: Permissionless Isolated Markets. Jeder Markt ist ein isolierter Pool mit genau einem Collateral und einem Loan-Asset. Parameter wie LT, LTV und Oracle sind bei Markt-Erstellung fixed und immutable. Jeder kann einen Markt erstellen — ohne Governance. Und on top sitzen MetaMorpho-Vaults, die Supplier-Kapital auf mehrere Underlying-Märkte allokieren.

[Slide 5] Kennzahlen im Überblick. Aave ist mit etwa 25 Milliarden Dollar TVL das grösste Protokoll. Morpho liegt bei 5 Milliarden, Compound bei 3 Milliarden. Morpho bietet die höchsten LTVs für correlated assets — bis zu 91,5 Prozent für LST-Märkte. Aave ist das einzige mit nativen Flash Loans. Aave und Compound sind governed durch DAOs, Morpho-Märkte sind immutable.

[Slide 6] Wann wählst du was? Aave wenn du maximale Flexibilität brauchst, Flash Loans nutzen willst oder E-Mode für correlated Assets einsetzt. Compound wenn du ein einzelnes, klares Borrow-Asset-Exposure suchst und simpler Risk-Modelle bevorzugst. Morpho wenn du optimale Rates willst, spezifische Paare wie stETH zu ETH mit sehr hoher LTV brauchst, oder governance-loses Lending bevorzugst.

[Slide 7] MetaMorpho-Vaults sind die aktuelle Power-Abstraktion über Morpho Blue. Ein Vault-Curator — ein Experte — definiert eine Allokations-Strategie über mehrere Morpho-Märkte. Supplier zahlen in den Vault ein, der Curator allokiert. Das gibt Supplier Diversifikation ohne manuelles Handling. Neues Risiko: Vertrauen in den Curator. Bekannte Curators sind Steakhouse Financial, Gauntlet, Block Analitica.

[Slide 8] Die Key-Takeaway: Es gibt kein „bestes" Lending-Protokoll. Es gibt das richtige Protokoll für den richtigen Use-Case. Aave und Compound sind Pooled-Modelle — Convenience plus Shared Risk. Morpho ist Isolated — Isolated Risk plus Fragmentierung. Kenne die Trade-offs, dann kannst du bewusst wählen. In der nächsten Lektion schauen wir uns die fortgeschrittenen Mechanismen an: Isolated Markets, E-Mode und Risk-Silos.

## Visual Suggestions

[Slide 1] Drei-Logo-Vergleich oben (Aave, Compound, Morpho), darunter Architektur-Schablonen.

[Slide 2] Aave-Pool-Graphic: grosser zentraler Pool, viele Asset-Icons darin.

[Slide 3] Compound-Graphic: Einzelner USDC-Markt mit USDC-Borrow und mehreren Collaterals (ETH, WBTC, LINK, etc.).

[Slide 4] Morpho-Graphic: Multiple kleine isolierte Märkte (ETH/USDC, wstETH/ETH, WBTC/DAI, etc.), oben drüber ein MetaMorpho Vault.

[Slide 5] Tabelle wie in Text — alle Kennzahlen auf einen Blick.

[Slide 6] Entscheidungs-Baum-Diagramm: „Brauchst du Flash Loans?" → Aave / „Einzel-Asset?" → Compound / „Max Rate?" → Morpho.

[Slide 7] MetaMorpho-Fluss: Supplier → Vault → mehrere Morpho-Märkte.

[Slide 8] Zusammenfassende Trade-off-Matrix (Pooled vs Isolated, Flex vs Isolation).

**SCREENSHOT SUGGESTION:** Seite von app.aave.com mit Multi-Asset-Dashboard.

**SCREENSHOT SUGGESTION:** app.compound.finance mit USDC-Markt und Collateral-Liste.

**SCREENSHOT SUGGESTION:** app.morpho.org mit Markt-Liste und MetaMorpho-Vaults.

## Exercise

**Aufgabe: Protokoll-Wahl für drei Use-Cases**

Du beurteilst drei Strategien. Für jede wählst du das passende Protokoll und begründest.

**Use-Case A: Leveraged ETH-Staking**
Du willst stETH auf ETH leveragen — 1 ETH Collateral → borrowe 0,9 ETH → kaufe mehr stETH → re-supply.
- Welches Protokoll und warum?

**Use-Case B: Stablecoin-Yield-Supply**
Du hast 500.000 USDC und willst als passiver Supplier Yield verdienen. Was bietet dir die beste Rendite bei kalkulierbarem Risk?
- Welches Protokoll und warum?

**Use-Case C: Obskurer Altcoin-Leverage**
Du willst einen speziellen DeFi-Token (z.B. einen erst kürzlich geadded zu wenigen Protokollen) als Collateral für Stablecoin-Borrow nutzen.
- Welches Protokoll und warum?

**Deliverable:** Drei kurze Absätze mit Protokoll-Wahl und Begründung. Optional: Live-APY-Recherche für jeden Use-Case.

## Quiz

**Frage 1:** Was ist der Kernunterschied zwischen Aave's Pool-Modell und Morpho Blue's Isolated-Markets-Modell?

<details><summary>Antwort</summary>
**Aave Pool-Modell:** Ein Pool pro Chain enthält viele Assets. Alle Supplier und Borrower teilen sich das gleiche Risiko. Ein Bug oder Hack in einem Asset kann das ganze Protokoll gefährden. Governance muss jedes neue Asset approven.

**Morpho Blue Isolated-Markets:** Jeder Markt ist ein isolierter Pool mit genau einem Collateral und einem Loan-Asset. Risiken bleiben streng auf den jeweiligen Markt begrenzt. Jeder kann einen neuen Markt erstellen. Parameter sind immutable.

**Zentrale Konsequenz:** Morpho eliminiert Shared Risk, aber fragmentiert Liquidität. Aave zentralisiert Liquidität, aber teilt Risk.
</details>

**Frage 2:** Du willst einen Leverage-Loop mit wstETH gegen ETH bauen und willst maximale Kapital-Effizienz. Welches Protokoll wählst du und warum?

<details><summary>Antwort</summary>
**Morpho Blue** — denn Morpho hat Märkte für wstETH/ETH mit LTVs bis zu 91,5 %, deutlich höher als Aave's ETH-Correlated-E-Mode mit etwa 90 % oder Compound.

Höhere LTV bedeutet mehr Leverage-Zyklen und damit höheren APY auf deinem Kapital. Für wstETH/ETH ist Morpho die Standard-Wahl unter sophisticated Operatoren.

**Alternative:** Aave mit E-Mode ist die zweite Wahl, wenn du Flash-Loan-Refinanzierungen brauchst (wstETH/ETH-Flash-Loans für Einmal-Setup).
</details>

---

# Lektion 5.6 — Isolated Markets, E-Mode und Risk-Silos

## Learning Objectives

Am Ende dieser Lektion können Teilnehmer:
- Die Mechanik von Isolated Markets in Aave V3 erklären
- E-Mode (Efficiency Mode) und seine LTV-Boost-Wirkung verstehen
- Die Unterschiede zwischen Isolation-Tier, Siloed-Assets und normalen Assets benennen
- Risk-Silo-Strategien situationsgerecht einsetzen
- Fehlerquellen beim Wechsel zwischen Modi identifizieren

## Explanation

### Das Problem: Shared Risk vs Kapital-Effizienz

In einem Pooled-Lending-Protokoll mit 50 Plus Assets entsteht ein Spannungsfeld:
- Wenn alle Assets gleiche LTV-Regeln haben, sind die sichersten Assets kapital-ineffizient (zu niedrige LTV für stETH/ETH)
- Wenn man einzelnen Assets höhere LTVs gibt, entsteht Shared Risk für das gesamte Protokoll

Aave V3 löst das mit drei speziellen Modi, die Risiken segmentieren, ohne Assets in komplett separate Protokolle auslagern zu müssen.

### Isolation Mode

**Was ist es?**
Wenn ein Asset als „Isolation Asset" markiert ist, kann es nur als **alleiniges** Collateral verwendet werden. Der Borrower kann gegen dieses Collateral nur bestimmte Whitelist-Assets borrowen (typisch: nur Stablecoins) und bis zu einem absoluten Debt-Ceiling.

**Beispiel:**
- GHO (Aave's Stablecoin) ist als Isolation Asset gelistet in manchen Märkten
- Wenn du GHO-Exposure als Collateral willst, kannst du kein anderes Collateral parallel haben
- Debt Ceiling: nur bis zu einer festen USD-Menge kann gegen GHO geborgt werden
- Nur Whitelist-Borrow-Assets (z.B. USDT, DAI) sind möglich

**Zweck:**
- Verhindert, dass riskante Assets Multi-Asset-Cross-Collateralisation nutzen
- Limitiert Systemic-Risk durch ein einzelnes Asset
- Ermöglicht das Listing von neuen Assets ohne volles Shared-Pool-Risk

### Siloed Assets

**Was ist es?**
Ein Asset ist „siloed" markiert, wenn es als **einziger Borrow-Asset** für eine bestehende Position fungieren muss. Wenn du bereits gegen anderes Collateral mehrere Borrow-Assets offen hast, kannst du keinen siloed Asset dazunehmen.

**Beispiel:**
- Ein neu gelisteter Altcoin (z.B. TokenX) ist als siloed markiert
- Wenn du Token X borrowen willst, kannst du kein anderes Borrow-Asset parallel haben
- Zweck: Limitierung deiner Exposure gegen einen riskanten Borrow-Asset

### E-Mode (Efficiency Mode)

**Was ist es?**
E-Mode ist ein **opt-in-Modus** für correlated assets. Wenn du E-Mode aktivierst, erhältst du höhere LTVs und Liquidation Thresholds, aber du darfst nur Assets der gleichen Kategorie halten.

**Kategorien (Aave V3):**
- **Stablecoin E-Mode:** USDC, USDT, DAI, FRAX, etc. — LTV bis zu 97 %
- **ETH E-Mode:** ETH, WETH, stETH, wstETH, rETH, cbETH — LTV bis zu 93 %
- **BTC E-Mode:** WBTC, tBTC — LTV bis zu 90 %

**Beispiel: ETH E-Mode**
Ohne E-Mode:
- Supply wstETH, LTV 70 %, LT 75 %
- Borrow ETH: HF-Gefahr bei starker stETH-Depeg

Mit ETH E-Mode:
- Supply wstETH, LTV 93 %, LT 95 %
- Borrow ETH: Du bekommst den Preis-Depeg-Risiko-Bonus
- Annahme: wstETH und ETH korrelieren fast perfekt

**Warum funktioniert E-Mode?**
Wenn alle Assets in deiner Position fast perfekt korrelieren, ist das Preis-Divergenz-Risiko minimal. Das Protokoll erlaubt daher höhere LTVs. Die einzige relevante Gefahr: Ein De-Peg-Event (z.B. stETH fällt unter ETH um mehrere Prozent). Das ist historisch selten, aber möglich (Juni 2022 stETH-Depeg auf 0,94 ETH).

**Aktivierung:**
- Gehe auf Aave UI, wähle „Enable E-Mode"
- Wähle Kategorie (Stablecoin / ETH / BTC)
- Aktivierung ist nur möglich, wenn deine aktuellen Assets zur Kategorie passen

### Praktische Strategien

**Strategie 1: wstETH/ETH Leverage-Loop mit E-Mode**
1. Supply 10 wstETH ($25k)
2. Aktiviere ETH E-Mode (LTV 93 %)
3. Borrow 9 ETH ($22.5k)
4. Tausche ETH zurück in wstETH
5. Supply 9 zusätzliche wstETH
6. Borrow nochmal — oder stoppe hier

Resultat: Du hast effektiv 19 wstETH mit $22.5k Debt. Die stETH-Rendite von ~3,5% p.a. wirkt auf den gesamten Kapitalbetrag, während du nur auf den Nettowert Kosten zahlst.

**Strategie 2: Stablecoin-Arbitrage mit Stablecoin E-Mode**
Wenn du Stablecoin-Rate-Arbitrage betreibst (z.B. DAI zu USDC Cross-Rate-Spread), kannst du mit Stablecoin-E-Mode bis zu 97 % LTV nutzen, dh. hohe Kapital-Effizienz für Margin-Trades.

### Fehlerquellen

**1. Mode-Wechsel blockt bei aktiver Position:**
Wenn du in E-Mode bist und einen Asset hinzufügen willst, der nicht zur Kategorie passt, wird der Tx revertet. Du musst erst E-Mode verlassen.

**2. E-Mode kann LTV künstlich zu hoch machen:**
Wenn du mit 93 % LTV in wstETH/ETH operierst, ist dein HF sehr knapp über 1. Jeder Depeg-Event (selbst 1 %) kann Liquidation triggern.

**3. Isolation Mode ignorieren:**
Viele User wissen nicht, dass sie ein Isolation Asset als Collateral geadded haben, und wundern sich dann, warum sie keine zweiten Asset-Collaterals hinzufügen können.

### Vergleich zu Morpho Blue

Morpho Blue löst das gleiche Problem anders: **Jeder Markt ist strukturell „isolated"**. Es gibt keinen „Mode" — ein Markt ist wstETH/ETH mit 91,5 % LTV, Punkt. Kein Wechseln nötig, kein Whitelist-Konzept. Der Trade-off: Keine Multi-Asset-Flexibilität auf einer einzigen Position.

## Slide Summary

[Slide 1] **Titel: Isolated Markets, E-Mode und Risk-Silos**
• Problem: Shared Risk vs Kapital-Effizienz
• Drei Modi in Aave V3
• E-Mode LTV-Boost für correlated Assets
• Praktische Strategien

[Slide 2] **Das Problem**
• Pool mit 50+ Assets
• Sichere Assets = zu niedrige LTV
• Höhere LTV = Shared Risk
• Modi als Lösung ohne Protokoll-Split

[Slide 3] **Isolation Mode**
• Asset nur als alleiniges Collateral
• Nur Stablecoin-Whitelist borrowbar
• Absolutes Debt Ceiling
• Beispiel: GHO Isolation Asset

[Slide 4] **Siloed Assets**
• Asset nur als alleiniger Borrow-Asset
• Kein Multi-Borrow bei Siloed
• Beispiel: Neu gelistete Altcoins
• Limitiert User-Exposure

[Slide 5] **E-Mode Überblick**
• Opt-in für correlated Assets
• Drei Kategorien: Stablecoin / ETH / BTC
• LTV-Boost: bis 97% / 93% / 90%
• Nur Assets der gleichen Kategorie erlaubt

[Slide 6] **ETH E-Mode Beispiel**
• wstETH supply, LTV 70% → 93% mit E-Mode
• Erlaubt tiefere Leverage-Loops
• Depeg-Risk bleibt (Juni 2022: 6% Depeg)
• HF nahe 1 → Gefahr bei Volatilität

[Slide 7] **Strategien**
• wstETH Leverage-Loop: 3.5% stETH-Rate auf ganzes Kapital
• Stablecoin E-Mode: Margin-Trades mit 97% LTV
• Mode-Switch blockt bei inkompatibler Position

[Slide 8] **Morpho-Alternative**
• Kein Mode nötig — Märkte strukturell isoliert
• Ein Markt = ein Paar mit fixen Parametern
• Trade-off: keine Multi-Asset-Flex

## Voice Narration Script

[Slide 1] Lektion 5.6 schliesst Modul 5 ab mit einem Blick auf Isolated Markets, E-Mode und Risk-Silos. Diese Mechanismen sind fortgeschritten, aber kritisch für jeden, der kapital-effizient arbeiten will. Wer sie nicht versteht, lässt erhebliches Upside liegen — oder schlimmer, baut ungewollt riskante Positions.

[Slide 2] Das Grundproblem: In einem Pool mit 50 Plus Assets gibt es Spannungen. Wenn alle Assets gleiche LTV-Regeln bekommen, sind die sichersten Assets kapital-ineffizient. stETH zu ETH hat fast keine Preis-Divergenz — da sollte die LTV bei 90 Prozent Plus liegen können. Aber wenn man einzelnen Assets höhere LTVs gibt, entsteht Shared Risk. Aave löst das mit drei Modi.

[Slide 3] Isolation Mode. Wenn ein Asset als Isolation markiert ist, kann es nur als alleiniges Collateral verwendet werden. Nur Whitelist-Stablecoins sind als Borrow erlaubt. Es gibt ein absolutes Debt Ceiling. Der Zweck: Verhindern, dass riskante Assets systemisches Risiko verursachen. Beispiel: GHO wird teilweise als Isolation Asset gelistet.

[Slide 4] Siloed Assets sind das Gegenstück. Wenn ein Asset siloed ist, kann es nur als einziger Borrow-Asset einer Position fungieren. Wenn du bereits Multi-Borrow hast, kannst du keinen siloed Asset dazunehmen. Das limitiert User-Exposure gegen einen riskanten Borrow-Asset.

[Slide 5] E-Mode, der Efficiency Mode, ist der interessanteste Mechanismus. Er ist ein Opt-in-Modus für correlated Assets. Du aktivierst eine Kategorie — Stablecoin, ETH oder BTC — und erhältst höhere LTVs. Die Stablecoin-Kategorie erlaubt bis zu 97 Prozent. ETH-Kategorie 93 Prozent. BTC-Kategorie 90 Prozent. Aber du darfst nur Assets der gewählten Kategorie halten.

[Slide 6] Ein konkretes Beispiel. Ohne E-Mode hat wstETH eine LTV von 70 Prozent. Mit ETH E-Mode sind es 93 Prozent. Du kannst also viel tiefer leveragen. Die Begründung: wstETH und ETH korrelieren fast perfekt. Das einzige relevante Risiko ist ein De-Peg-Event. Die Juni-2022-Depeg von stETH auf 0,94 ETH — ein 6-Prozent-Depeg — zeigt, dass solche Events passieren. Mit 93 Prozent LTV ist dein HF knapp 1,02 — jeder 2-Prozent-Depeg triggert Liquidation.

[Slide 7] Praktische Strategien. Strategie Eins: wstETH Leverage-Loop. Supply wstETH, aktiviere E-Mode, borrowe ETH, tausche in wstETH, supply erneut. So kriegst du die 3,5-Prozent-stETH-Rendite auf effektiv doppelten Kapitalbetrag. Strategie Zwei: Stablecoin-Margin-Trades mit 97 Prozent LTV für Arbitrage zwischen Stablecoins. Wichtig: Mode-Wechsel bei aktiver inkompatibler Position blockt die Transaktion — du musst erst E-Mode verlassen.

[Slide 8] Morpho Blue löst das gleiche Problem anders. Jeder Markt ist strukturell isoliert. Es gibt keinen Mode-Wechsel. Ein Markt ist wstETH zu ETH mit 91,5 Prozent LTV, Punkt. Kein Whitelist-Konzept, keine Kategorien. Der Trade-off: Keine Multi-Asset-Flexibilität auf einer Position. Für fokussierte correlated Strategien ist Morpho oft eleganter. Für Multi-Asset-Management bleibt Aave führend. Das war Modul 5 — in den nächsten Modulen bauen wir auf diesem Wissen auf, wenn wir Yield-Strategien und Leverage-Loops behandeln.

## Visual Suggestions

[Slide 1] Drei-Mode-Icons (Isolation, Siloed, E-Mode) als Titel-Graphic.

[Slide 2] Spannungsfeld-Diagramm: Pool-Breite vs LTV-Höhe mit Konflikt-Zone markiert.

[Slide 3] Isolation-Mode-Beispiel: GHO als alleiniges Collateral, eingezeichnetes Debt Ceiling, Whitelist von Borrow-Assets.

[Slide 4] Siloed-Asset-Beispiel: TokenX als alleiniger Borrow, mit X-Symbol über parallelen Borrow-Assets.

[Slide 5] Tabelle der E-Mode-Kategorien mit maximalen LTVs.

[Slide 6] Vergleich wstETH ohne/mit E-Mode: LTV-Bar visualisiert, 70% vs 93%, mit Depeg-Risiko-Hinweis.

[Slide 7] Leverage-Loop-Diagramm mit Pfeilen durch die Schritte.

[Slide 8] Morpho-Markt-Struktur mit klaren isolierten Pools.

**SCREENSHOT SUGGESTION:** Aave V3 UI mit „E-Mode aktivieren"-Button und Kategorie-Auswahl.

**SCREENSHOT SUGGESTION:** Aave Reserve-Details-Seite mit Isolation-Mode-Indikator für ein Asset (z.B. GHO).

## Exercise

**Aufgabe: E-Mode Risk-Kalkulation**

Du willst eine wstETH/ETH-Leverage-Position mit Aave ETH E-Mode aufbauen.

**Parameter:**
- Startkapital: 10 wstETH ($35.000 bei 3500 USD/wstETH)
- ETH E-Mode LTV: 93 %, LT: 95 %
- Ziel-HF: 1.25

**Schritte:**
1. Berechne, wieviel ETH du maximal borrowen kannst, um HF = 1.25 zu erreichen
2. Simuliere einen 3 % stETH-Depeg (wstETH fällt auf 3.395 USD/Stück). Was ist der neue HF?
3. Simuliere einen 6 % Depeg (wie Juni 2022). Was ist der neue HF? Bist du liquidiert?
4. Berechne die Break-even-Depeg-Rate: Bei welchem wstETH/ETH-Preisverhältnis wird die Position liquidiert?

**Deliverable:** Sensitivity-Analyse mit allen Berechnungen, plus eine persönliche Einschätzung: Welcher HF ist für eine 93-Prozent-LTV-E-Mode-Strategie akzeptabel?

## Quiz

**Frage 1:** Was ist der Kernunterschied zwischen Isolation Mode und E-Mode in Aave V3?

<details><summary>Antwort</summary>
**Isolation Mode** beschränkt das Collateral: Ein Isolation Asset darf nur als alleiniges Collateral fungieren, und nur Whitelist-Stablecoins können geborgt werden. Ein absolutes Debt Ceiling limitiert die Gesamt-Exposure.

**E-Mode** erhöht die Kapital-Effizienz: Du wählst eine Kategorie (Stablecoin / ETH / BTC) und erhältst deutlich höhere LTVs (bis 97 %) — aber nur, wenn du ausschliesslich Assets dieser Kategorie hältst.

**Kernlogik:**
- Isolation Mode = schützt das Protokoll vor riskanten Assets
- E-Mode = belohnt den User für niedriges Divergenz-Risiko
</details>

**Frage 2:** Warum ist ein HF von 1.1 in einer ETH-E-Mode-Position riskanter als ein HF von 1.5 in einer regulären ETH/USDC-Position?

<details><summary>Antwort</summary>
Mehrere Gründe:

1. **Hohe LTV = geringer Puffer:** In E-Mode bei 93 % LTV und HF 1.1 ist schon ein kleiner Depeg (2-3 %) ausreichend für Liquidation. In regulärer Position bei LTV 80 % und HF 1.5 braucht es einen 25-30 %-Preisdrop.

2. **Depeg-Events sind nicht „gradual":** stETH hat in Juni 2022 in wenigen Tagen 6 % gegen ETH verloren. In einer E-Mode-Position wärst du sofort liquidiert worden. In einer regulären Position hättest du Zeit gehabt zu reagieren.

3. **MEV-Risk:** Bei knappem HF in E-Mode warten Liquidator-Bots auf den minimalsten Depeg-Tick. Sogar Oracle-Noise (Oracle-Price springt kurzzeitig) kann eine Liquidation triggern.

4. **Weniger Reaktionszeit:** E-Mode-LTV-Spreads sind eng. Du hast kaum Möglichkeit, mehr Collateral nachzuschießen, bevor der Liquidator aktiv wird.

**Praktische Regel:** In E-Mode mit 90+ % LTV sollte HF minimal bei 1.4-1.5 liegen, nicht bei 1.1. Die Kapital-Effizienz-Vorteile werden sonst vom Liquidations-Risiko aufgefressen.
</details>

---

# Modul 5 — Umfassender Abschluss-Quiz

Diese Fragen testen das kumulative Verständnis von Modul 5.

**Frage 1:** Ein Aave-USDC-Pool hat folgende Parameter:
- Total Supply: 800M USDC
- Total Borrowed: 720M USDC
- Slope 1: 4 %, Kink: 90 %, Slope 2: 60 %
- Base Rate: 0 %, Reserve Factor: 10 %

Berechne: (a) Utilization, (b) Borrow APY, (c) Supply APY.

<details><summary>Antwort</summary>
**(a) Utilization:** 720 / 800 = **90 %**

**(b) Borrow APY:**
U ist exakt am Kink, also:
Borrow APY = 0 % + (0.90 / 0.90) * 4 % = **4 %**

**(c) Supply APY:**
Supply APY = Borrow APY * U * (1 - RF) = 4 % * 0.90 * 0.90 = **3,24 %**

Interpretation: Der Pool läuft optimal am Kink. Supplier verdienen 3,24 %, Borrower zahlen 4 %. Die 0,76 % Differenz sind 0,4 % Reserve Factor + 0,36 % aus der 10-prozentigen Nicht-Auslastung (weil 80M USDC nicht verliehen sind).
</details>

**Frage 2:** Du hast eine Position mit 15 ETH ($45.000, LT 82,5 %) und 20.000 USDC Debt. ETH fällt um 25 %. 

(a) Ist deine Position liquidierbar?  
(b) Wenn ja, wieviel Collateral verlierst du beim ersten Liquidations-Call (Close Factor 50 %, Liquidation Penalty 5 %)?

<details><summary>Antwort</summary>
**Neuer Collateral-Wert:** $45.000 × 0.75 = **$33.750**

**(a) Health Factor nach Drop:**
HF = ($33.750 × 0.825) / $20.000 = **1.39**

HF > 1 → **nicht liquidierbar**.

**Du bist noch sicher**, aber der Puffer ist deutlich geschmolzen. Ein weiterer 10-15 % Drop würde Liquidation auslösen.

**Um die Frage zu beantworten bei einer tatsächlichen Liquidation:** Wenn der Preis weiter fällt und HF unter 1 sinkt, würde der Liquidator 50 % der Debt (10.000 USDC) zurückzahlen und 10.500 USD in ETH erhalten (inkl. 5 % Bonus). Das entspricht bei 2625 USD/ETH etwa 4 ETH. Du würdest 500 USD an Penalty verlieren.
</details>

**Frage 3:** Vergleiche Aave V3 E-Mode für wstETH/ETH mit einem Morpho-Blue-wstETH/ETH-Markt. Was sind die drei Hauptunterschiede?

<details><summary>Antwort</summary>
**1. Parametrisierung:**
- Aave E-Mode: 93 % LTV, 95 % LT, governance-kontrolliert (kann sich ändern)
- Morpho Blue: 91,5 % LTV (market-abhängig), immutable bei Markt-Erstellung

**2. Flexibilität:**
- Aave E-Mode: Du kannst E-Mode aktivieren/deaktivieren, andere Assets hinzufügen wenn kompatibel
- Morpho Blue: Keine Flexibilität — du bist im Markt oder nicht

**3. Risk-Isolation:**
- Aave E-Mode: Auch im E-Mode bist du Teil des grösseren Aave-Protokolls und potentiell von Protocol-wide Bad Debt betroffen
- Morpho Blue: Perfekt isoliert — Probleme in anderen Morpho-Märkten betreffen dich nicht

**Praktische Wahl:**
- Aave wenn du Flexibilität und Flash Loans brauchst
- Morpho wenn du reine Kapital-Effizienz für eine wstETH/ETH-Position willst und Immutabilität schätzt
</details>

**Frage 4:** Ein Liquidator-Bot führt auf Aave eine Liquidation durch. Er nutzt einen Flash Loan, um kein eigenes Kapital zu brauchen. Beschreibe den Flow Schritt für Schritt.

<details><summary>Antwort</summary>
**Flash-Loan-basierte Liquidation Flow (innerhalb einer Transaktion):**

1. Bot ruft Flash Loan auf Aave/Balancer auf, borrow z.B. 50.000 USDC
2. Bot ruft `liquidationCall` auf Aave auf: zahlt 50.000 USDC Debt des Borrowers zurück
3. Bot erhält 52.500 USD in ETH (5 % Bonus)
4. Bot verkauft 50.000 USDC-Wert in ETH auf einem DEX (z.B. Uniswap), erhält 50.000 USDC zurück (approximativ, minus Slippage)
5. Bot zahlt Flash Loan zurück (50.000 USDC + 0.05 % Fee = 50.025 USDC)
6. Bot behält 2.475 USD-Wert in ETH (Liquidations-Gewinn minus DEX-Slippage)
7. Gas-Kosten abziehen: netto etwa 500-2.000 USD Profit

**Alles in einer einzigen Transaktion.** Wenn irgendeiner der Schritte fehlschlägt, revertet die gesamte Transaktion — der Bot verliert nur Gas, nicht Kapital.

Deshalb sind Flash Loans die dominante Infrastruktur für Liquidator-Bots: Sie brauchen Null-Kapital aber volle MEV-Extraction-Kapazität.
</details>

**Frage 5:** Du designst eine defensive Lending-Strategie für einen $500k-Portfolio mit Fokus auf Sicherheit. Welche Kombination von Protokoll, Asset-Set und HF wählst du und warum?

<details><summary>Antwort</summary>
**Beispiel einer defensiven Strategie:**

**Protokoll:** Aave V3 auf Ethereum Mainnet
- Grösste Liquidität, längste Track Record, am meisten audited
- Nicht Morpho (Curator-Risiko für Vaults)

**Asset-Set:**
- Collateral: 70 % ETH (blue chip), 30 % USDC (stability)
- Kein E-Mode (nicht brauchbar mit Mixed Collateral; und E-Mode HF-Gefahr)
- Borrow: 30 % der Max-LTV in USDC für Operational Liquidität (Rebalancing, Gas, Opportunities)

**HF-Ziel:** 3.0 oder höher
- Bei ETH-Drop von 50 % (Black Swan) noch HF > 1.5
- Hohe Toleranz für Vola ohne aktives Monitoring

**Begründung:**
- $500k ist bedeutendes Kapital — Drawdowns sind schmerzhafter als Upside
- Konservatives HF-Setup toleriert 30 %-40 % Kapital-Effizienz-Verlust für wesentlich besseres Sleep-at-Night
- Diversifizierte Collateral-Mix reduziert Single-Asset-Risk
- Kein Leverage-Loop — nur directional Exposure plus Operational Borrow

**Monitoring:**
- Weekly HF-Check via DeBank oder Zerion Dashboard
- Telegram/E-Mail Alerts bei HF < 2.0
- Quarterly Full Review und Rebalancing

Diese Strategie prioriziert Survivability über Optimisierung. Sie ist nicht yield-maximal, aber robust gegen fast alle realistischen Szenarien (ausser Protokoll-Hack — dagegen hilft nur Protokoll-Diversifikation).
</details>

---

# Modul 5 — Zusammenfassung

In Modul 5 hast du das zweite fundamentale DeFi-Primitive gemeistert: On-Chain-Lending. Du verstehst jetzt die Pool-Mechanik, das Utilization-basierte Zinsmodell, die strikte Überbesicherungs-Logik, und die Liquidations-Anatomie bis ins Detail.

**Was du jetzt kannst:**

- Die Supply- und Borrow-Seite eines Pool-Protokolls mechanisch durchleuchten
- Utilization Rate, Borrow APY und Supply APY für beliebige Parameter berechnen
- Health Factor als zentrale Sicherheits-Kennzahl einsetzen
- Den Liquidations-Workflow, Close Factor und Liquidator-Bot-Ökonomie nachvollziehen
- Aave V3, Compound V3 und Morpho Blue strukturell unterscheiden und für konkrete Use-Cases wählen
- Isolated Markets und E-Mode kapital-effizient einsetzen, ohne ihre Risiken zu unterschätzen

**Was als nächstes kommt — Modul 6: Stablecoins und Liquid Staking**

In Modul 6 behandeln wir die beiden Asset-Klassen, die das DeFi-Ökosystem tragen: Stablecoins (USDC, USDT, DAI, GHO, crvUSD) mit ihren unterschiedlichen Collateral-Modellen und Liquid-Staking-Tokens (stETH, rETH, cbETH) mit der ETH-Beacon-Chain-Mechanik. Beide sind die Grundbausteine fast jeder DeFi-Strategie — und beide haben strukturelle Risiken, die oft unterschätzt werden.

---
