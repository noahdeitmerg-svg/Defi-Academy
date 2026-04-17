# Modul 3 — Gas, Tokens & Etherscan

## Die Operationsmechanik von Ethereum

**Moduldauer:** ~55 Minuten Video über 6 Lektionen + Modul-Quiz
**Stufe:** Foundation
**Voraussetzungen:** Module 1 und Module 2
**Version:** 3.0 — 8-Sektionen-Lektionsstruktur

---

## MODUL-LERNZIELE

Am Ende dieses Moduls können Teilnehmer:

- Erklären, wie Gas-Gebühren auf Ethereum berechnet werden und warum sie schwanken
- Den EIP-1559-Burn-Mechanismus und seine Bedeutung für ETH-Tokenomics verstehen
- EIP-4844-Blobs und ihre Rolle in der L2-Gebühren-Revolution erläutern
- Den ERC-20-Token-Standard analysieren und Token-Contracts untersuchen
- NFT-Standards ERC-721 und ERC-1155 unterscheiden
- Etherscan als Untersuchungs-Tool professionell einsetzen

---

## LEKTIONSINDEX

| Lektion | Titel | Dauer |
|---------|-------|-------|
| 3.1 | Wie Gas auf Ethereum funktioniert | 8–10 Min |
| 3.2 | EIP-1559 und der Burn-Mechanismus | 6–8 Min |
| 3.3 | EIP-4844 Blobs und die L2-Fee-Revolution | 8–10 Min |
| 3.4 | Der ERC-20 Token-Standard | 8–10 Min |
| 3.5 | NFTs: ERC-721 und ERC-1155 | 6–8 Min |
| 3.6 | Etherscan als Untersuchungs-Tool | 10–12 Min |
| — | Modul 3 Comprehensive Quiz | 5 Fragen |

---
---

# Lektion 3.1 — Wie Gas auf Ethereum funktioniert

**Dauer:** 8–10 Minuten

---

## Learning Objectives

Nach dieser Lektion können Teilnehmer:

• erklären, warum jede Operation auf Ethereum Gas kostet und was Gas eigentlich misst
• die drei Komponenten einer Gas-Gebühr identifizieren (Gas Limit, Base Fee, Priority Fee)
• die tatsächlichen Gas-Kosten einer Transaktion anhand der Formel berechnen
• typische Gas-Verbrauchswerte für gängige DeFi-Operationen abschätzen

---

## Explanation

Jede Transaktion auf Ethereum kostet Gebühren. Diese Gebühren sind nicht willkürlich — sie sind die Kosten, um die Rechenleistung und Speicher des weltweit verteilten Ethereum-Netzwerks zu beanspruchen. Wer verstehen will, warum DeFi funktioniert (oder nicht funktioniert), muss verstehen, wie Gas berechnet wird.

### Was Gas eigentlich ist

Gas ist eine Maßeinheit für Rechenaufwand auf der Ethereum Virtual Machine (EVM). Jede Operation in der EVM — ein Byte zu lesen, eine Addition durchzuführen, einen Speicherplatz zu beschreiben — kostet eine bestimmte Menge Gas. Diese Kosten sind deterministisch und im Ethereum-Protokoll hart kodiert.

Typische Gasverbrauchswerte:
- Eine einfache ETH-Überweisung: 21.000 Gas
- Ein ERC-20-Transfer: ~50.000–65.000 Gas
- Ein Uniswap-Swap: ~120.000–200.000 Gas
- Eine Aave-Einzahlung: ~250.000–400.000 Gas
- Contract-Deployment: 1.000.000–5.000.000+ Gas

Wichtig: **Gas ist nicht gleichbedeutend mit einem Dollarpreis**. Gas ist eine abstrakte Einheit. Der Preis pro Gas-Einheit wird separat bestimmt — und genau das ist das, was bei hoher Netzwerkauslastung explodiert.

### Die drei Gas-Parameter

Wenn du eine Transaktion sendest, setzt dein Wallet drei Parameter:

**1. Gas Limit** — die maximale Menge Gas, die deine Transaktion verbrauchen darf. Wenn die Ausführung dieses Limit überschreitet, schlägt die Transaktion fehl und du zahlst trotzdem die verbrauchten Gebühren (out-of-gas revert). Wallets schätzen das Limit automatisch.

**2. Base Fee** — der Minimumpreis pro Gas-Einheit, den das Netzwerk aktuell verlangt. Diese Gebühr wird vom Protokoll selbst festgelegt (Details in Lektion 3.2) und wird **verbrannt** — sie geht weder an Validatoren noch an irgendjemanden, sondern wird aus der ETH-Versorgung entfernt.

**3. Priority Fee (Tip)** — ein zusätzliches Trinkgeld an den Validator, um deine Transaktion schneller in einen Block aufzunehmen. Je höher die Priority Fee, desto höher die Priorität. Die Priority Fee geht an den Validator.

### Die Gas-Kosten-Formel

Die tatsächliche Transaktionsgebühr berechnet sich so:

**Gebühr = Gas Used × (Base Fee + Priority Fee)**

Ein konkretes Beispiel:
- Uniswap-Swap verbraucht 150.000 Gas
- Base Fee: 20 Gwei
- Priority Fee: 2 Gwei
- Gesamtpreis pro Gas: 22 Gwei
- Gebühr in Gwei: 150.000 × 22 = 3.300.000 Gwei
- Gebühr in ETH: 0,0033 ETH
- Bei ETH-Preis von 3.500$: **11,55 USD**

Wichtige Einheiten:
- **Gwei** = 10^-9 ETH (1 ETH = 1.000.000.000 Gwei). Die Einheit, in der Gaspreise angegeben werden.
- **Wei** = kleinste Einheit (10^-18 ETH)

### Warum Gas-Preise schwanken

Die Base Fee passt sich automatisch an die Netzwerkauslastung an. Wenn die Blöcke voll sind, steigt die Base Fee (um die Nachfrage zu dämpfen). Wenn die Blöcke leer sind, sinkt sie. Der genaue Mechanismus dafür ist EIP-1559 — Lektion 3.2.

In der Praxis bedeutet das: Gas-Preise können innerhalb von Minuten dramatisch schwanken. Ein Swap, der um 3 Uhr nachts 2$ kostet, kann während eines NFT-Mints am Nachmittag 80$ kosten.

### Typische Gas-Preis-Kategorien

- **< 10 Gwei**: Sehr niedrig (nachts, ruhige Tage). Ideal für größere Operationen.
- **10–25 Gwei**: Normaler Betrieb.
- **25–50 Gwei**: Aktive DeFi-Tage.
- **50–100 Gwei**: Marktvolatilität, größere Events.
- **100+ Gwei**: Major launches, Liquidationswellen, NFT-Manias.

Eine Aave-Einzahlung bei 30 Gwei kostet ~25$. Bei 100 Gwei kostet dieselbe Operation ~85$.

### Drei praktische Regeln

**1. Plane Operationen außerhalb von Spitzenzeiten.** Tools wie etherscan.io/gastracker oder ultrasound.money zeigen den aktuellen Status.

**2. Kalkuliere Gas-Kosten in deine Strategie ein.** 5% erwarteter Ertrag bei 1.000$ Kapital und 200$ Gas-Kosten = keine netto-positive Position.

**3. Nutze L2 für aktive Operationen.** Auf Arbitrum kostet derselbe Swap oft 2 Cent statt 11 Dollar.

---

## Slide Summary

### [Slide 1]
Wie Gas auf Ethereum funktioniert
Modul 3, Lektion 1
Die Preiskomponente jeder DeFi-Operation

### [Slide 2]
Was Gas ist

Gas = Maßeinheit für Rechenaufwand (EVM)
- ETH-Transfer: 21.000 Gas
- ERC-20: ~50–65k Gas
- Uniswap-Swap: ~150k Gas
- Aave-Einzahlung: ~300k Gas

Gas ≠ Dollarpreis. Gas ist abstrakt.

### [Slide 3]
Die drei Gas-Parameter

1. Gas Limit — max. erlaubter Gasverbrauch
2. Base Fee — Protokollpreis (wird verbrannt)
3. Priority Fee — Trinkgeld an Validator

### [Slide 4]
Die Gas-Kosten-Formel

Gebühr = Gas Used × (Base Fee + Priority Fee)

Beispiel:
150.000 × (20 + 2) Gwei = 3.300.000 Gwei = 0,0033 ETH = ~11,55 $

### [Slide 5]
Einheiten

1 ETH = 1.000.000.000 Gwei
1 Gwei = 10^-9 ETH
1 Wei = 10^-18 ETH

Gaspreise in Gwei.

### [Slide 6]
Warum Gas-Preise schwanken

Base Fee passt sich automatisch an Blockauslastung an.
Volle Blöcke → Fee steigt.
Leere Blöcke → Fee sinkt.

### [Slide 7]
Gaspreis-Kategorien

< 10 Gwei: sehr niedrig
10–25: niedrig (normal)
25–50: mittel
50–100: hoch
100+: extrem

### [Slide 8]
Drei Praxisregeln

1. Spitzenzeiten meiden
2. Gas in Strategie einkalkulieren
3. L2 für aktive Operationen nutzen

### [Slide 9]
Key Takeaway

Gaspreis × Gasverbrauch = Gebühr.
Beides im Blick = Grundkompetenz.

---

## Voice Narration Script

### [Slide 1]
Jede Transaktion auf Ethereum kostet Gebühren. Diese Gebühren sind nicht willkürlich — sie sind die Kosten, um die Rechenleistung und Speicher des weltweit verteilten Ethereum-Netzwerks zu beanspruchen. Wer verstehen will, warum DeFi funktioniert oder nicht funktioniert, muss verstehen, wie Gas berechnet wird.

### [Slide 2]
Gas ist eine Maßeinheit für Rechenaufwand in der Ethereum Virtual Machine. Jede Operation — ein Byte lesen, eine Addition, einen Speicherplatz beschreiben — kostet eine bestimmte Menge Gas. Diese Kosten sind deterministisch und im Protokoll hart kodiert. Eine einfache ETH-Überweisung kostet immer 21.000 Gas. Ein ERC-20-Transfer etwa 50.000 bis 65.000. Ein Uniswap-Swap 120.000 bis 200.000. Wichtig: Gas ist nicht gleichbedeutend mit einem Dollarpreis. Gas ist abstrakt. Der Preis pro Gas-Einheit wird separat festgelegt — und genau das explodiert bei hoher Netzwerkauslastung.

### [Slide 3]
Dein Wallet setzt drei Parameter für jede Transaktion. Erstens das Gas Limit — die maximale Menge Gas, die deine Transaktion verbrauchen darf. Zweitens die Base Fee — der Minimumpreis pro Gas-Einheit, den das Netzwerk aktuell verlangt. Diese Gebühr wird verbrannt. Drittens die Priority Fee oder Tip — ein Trinkgeld an den Validator. Je höher, desto schneller kommt deine Transaktion rein.

### [Slide 4]
Die tatsächliche Gebühr berechnet sich so: Gas Used mal Base Fee plus Priority Fee. Beispiel: Ein Uniswap-Swap verbraucht 150.000 Gas. Die Base Fee beträgt 20 Gwei. Die Priority Fee 2 Gwei. Gesamtpreis pro Gas: 22 Gwei. Gebühr: 150.000 mal 22 gleich 3,3 Millionen Gwei. Das sind 0,0033 ETH. Bei einem ETH-Preis von 3.500 Dollar kostet der Swap also 11,55 Dollar.

### [Slide 5]
Die Einheiten. 1 ETH gleich eine Milliarde Gwei. 1 Gwei gleich 10 hoch minus 9 ETH. 1 Wei gleich 10 hoch minus 18 ETH — die kleinste Einheit. Gaspreise werden üblicherweise in Gwei angegeben, weil die Zahlen dann handhabbar bleiben.

### [Slide 6]
Warum schwanken Gaspreise so stark? Die Base Fee passt sich automatisch an die Netzwerkauslastung an. Volle Blöcke erhöhen sie, leere Blöcke senken sie. In der Praxis bedeutet das: Gaspreise können innerhalb von Minuten dramatisch schwanken. Ein Swap, der nachts 2 Dollar kostet, kann tagsüber während eines NFT-Mints 80 Dollar kosten.

### [Slide 7]
Grobe Kategorisierung: unter 10 Gwei ist sehr niedrig — typisch nachts. 10 bis 25 Gwei ist normaler Betrieb. 25 bis 50 sind aktive Tage. 50 bis 100 signalisieren Volatilität. Über 100 ist extrem. Eine Aave-Einzahlung bei 30 Gwei kostet etwa 25 Dollar. Bei 100 Gwei kostet dieselbe Operation 85 Dollar. Gaspreise entscheiden oft, ob eine Strategie profitabel ist.

### [Slide 8]
Drei Regeln. Erstens: plane Operationen außerhalb von Spitzenzeiten. Zweitens: kalkuliere Gas-Kosten in deine Strategie ein. Drittens: nutze Layer 2 für aktive Operationen — auf Arbitrum kostet derselbe Swap oft 2 Cent statt 11 Dollar.

### [Slide 9]
Takeaway. Gaspreis mal Gasverbrauch ergibt deine Gebühr. Beide Größen im Blick zu haben ist Grundkompetenz für jeden DeFi-Operator.

---

## Visual Suggestions

### [Slide 1]
Title Card. Gaszähler-Symbolik kombiniert mit Ethereum-Logo.

### [Slide 2]
Tabelle mit typischen Gasverbrauchswerten. Hervorhebung: "Gas ≠ Dollars".

### [Slide 3]
Drei-Spalten-Layout mit Icons: Tachometer (Gas Limit), Flamme (Base Fee verbrannt), Geschenk (Priority Fee).

### [Slide 4]
Formel prominent. Beispielrechnung mit Zwischenschritten.

### [Slide 5]
Einheiten-Visualisierung: Kreis (1 ETH) → Gwei → Wei.

### [Slide 6]
Liniendiagramm: Base Fee über Zeit mit Peaks bei bekannten Events.

### [Slide 7]
**SCREENSHOT SUGGESTION:** Screenshot von etherscan.io/gastracker mit Low/Average/High-Kategorien.

### [Slide 8]
Drei Regeln als Karten mit Icons.

### [Slide 9]
Summary Card. Übergang zu Lektion 3.2.

---

## Exercise

### Übung 3.1 — Gas-Analyse einer realen Transaktion

**Ziel:** Gas-Kosten bei echten Transaktionen analysieren.

**Schritte:**

1. Öffne [etherscan.io](https://etherscan.io) und finde eine kürzliche Uniswap-Transaktion.
2. Trage diese Werte ein:

| Parameter | Wert |
|-----------|------|
| Tx Hash | |
| Gas Used | |
| Gas Price (Effective) | |
| Base Fee | |
| Priority Fee | |
| Transaction Fee (ETH) | |
| Transaction Fee (USD) | |

3. Verifiziere die Formel selbst: Gas Used × Gas Price, Vergleich mit Etherscan.
4. Vergleiche mit einer ERC-20-Transfer-Transaktion. Differenz?
5. Reflexion: Welche Operationen sind für dein Budget am teuersten?

**Deliverable:** Ausgefüllte Tabelle + Reflexion.

---

## Quiz

### Frage 1
Eine Transaktion verbraucht 200.000 Gas. Base Fee 35 Gwei, Priority Fee 3 Gwei. Gebühr in ETH?

<details>
<summary>Antwort anzeigen</summary>

200.000 × (35 + 3) = 200.000 × 38 = 7.600.000 Gwei = **0,0076 ETH**. Bei ETH = 3.500$ → 26,60 USD.
</details>

### Frage 2
Welche Aussage über die Base Fee ist korrekt?

**A)** Base Fee wird vom Validator festgelegt
**B)** Base Fee wird vom Protokoll automatisch angepasst und verbrannt
**C)** Base Fee ist ein fester Wert (21.000 Gwei)
**D)** Base Fee ist optional

<details>
<summary>Antwort anzeigen</summary>

**Richtige Antwort: B**. Base Fee wird vom Protokoll bestimmt, passt sich an Auslastung an, und wird verbrannt. Option A verwechselt mit Priority Fee. Option C verwechselt mit Gas Limit. Option D ist falsch — ohne Base Fee keine Aufnahme in den Block.
</details>

---
---

# Lektion 3.2 — EIP-1559 und der Burn-Mechanismus

**Dauer:** 6–8 Minuten

---

## Learning Objectives

Nach dieser Lektion können Teilnehmer:

• erklären, was EIP-1559 geändert hat und warum es eingeführt wurde
• den Anpassungsmechanismus der Base Fee präzise beschreiben
• die Konsequenzen des Burn-Mechanismus für ETH-Tokenomics verstehen ("ultrasound money")
• das Konzept "Net Issuance" und seine Bedeutung für Ethereums Monetary Policy einordnen

---

## Explanation

Am 5. August 2021 aktivierte Ethereum mit der London-Hard-Fork das Upgrade EIP-1559. Es veränderte grundlegend, wie Transaktionsgebühren funktionieren — und hatte weitreichende Folgen für ETH als Asset.

### Das Problem vor EIP-1559

Vor EIP-1559 funktionierte Ethereums Gebührenmarkt als reines First-Price-Auction-System. Nutzer boten gegen einander mit Gaspreisen, und Miner wählten die Transaktionen mit den höchsten Geboten aus. Das hatte drei Hauptprobleme:

**Ineffizienz bei der Preisfindung.** Nutzer mussten raten, welchen Gaspreis sie bieten sollten. Zu niedrig bedeutete stundenlange Wartezeiten oder fehlgeschlagene Transaktionen. Zu hoch bedeutete Überzahlung. Wallets schätzten Preise auf Basis aktueller Netzwerkaktivität, aber die Schätzungen waren oft ungenau.

**Extreme Volatilität bei Nachfragespitzen.** Wenn eine populäre NFT-Kollektion gemintet wurde, stiegen die Gaspreise innerhalb von Sekunden um das Zehn- bis Hundertfache. Ohne Dämpfungsmechanismus wurde das Netzwerk unbenutzbar.

**Alle Gebühren gingen an Miner.** Dies schuf ein Risiko für die Stabilität: wenn Miner merkten, dass sie mehr verdienen, wenn die Blöcke voll sind, hatten sie einen Anreiz, das Netzwerk überlastet zu halten.

### Was EIP-1559 geändert hat

EIP-1559 ersetzte den simplen First-Price-Markt durch ein zweischichtiges System:

**Base Fee** — ein vom Protokoll festgelegter Minimumpreis, der dynamisch angepasst wird. Der Sinn: transparente und vorhersehbare Preise. Die Base Fee wird verbrannt (aus dem ETH-Supply entfernt).

**Priority Fee (Tip)** — eine optionale Zusatzzahlung an den Validator. Für normale Transaktionen sind kleine Tips (1–3 Gwei) ausreichend; für MEV-sensitive Operationen können Tips deutlich höher sein.

### Der Anpassungsmechanismus der Base Fee

Die Base Fee wird nach jedem Block neu berechnet, basierend auf der Auslastung des vorherigen Blocks. Ethereum-Blöcke haben ein Ziel-Gaslimit ("Target") von ca. 15 Millionen Gas und ein Maximum ("Cap") von ca. 30 Millionen.

Anpassungsregeln:
- Wenn der letzte Block **genau** das Target-Gas nutzt: Base Fee bleibt gleich.
- Wenn der letzte Block **voll** war (30 Mio): Base Fee steigt um **12,5%**.
- Wenn der letzte Block **leer** war: Base Fee fällt um bis zu **12,5%**.
- Zwischenwerte werden proportional angepasst.

Die Anpassungsrate von 12,5% pro Block bedeutet, dass dramatische Preisänderungen innerhalb weniger Blöcke passieren können. Von 30 Gwei auf 100 Gwei sind es nur ca. 10 Blöcke (ca. 2 Minuten) bei konstant vollen Blöcken.

### Warum verbrennen?

Die verbrannte Base Fee hat drei Funktionen:

**Anti-Manipulation.** Validatoren können nicht von hohen Base Fees profitieren — sie bekommen nur die Priority Fee. Das entfernt den Anreiz, das Netzwerk absichtlich zu überlasten.

**ETH-Tokenomics.** Der Burn entfernt ETH aus dem umlaufenden Angebot. Ab einer bestimmten Transaktionsdichte kann der Burn die neue ETH-Emission durch Validatoren übersteigen — dann wird ETH deflationär. Das Phänomen wird als "ultrasound money" bezeichnet (Gegenstück zu "sound money" / Gold).

**Benutzerseitige Fairness.** Die verbrannten Gebühren werden nicht von einer kleinen Gruppe von Minern abkassiert. Stattdessen profitieren alle ETH-Halter von der leichten Deflation.

### Net Issuance — die neue Bilanz

Ethereums ETH-Angebot verändert sich über zwei Mechanismen:

**Issuance (+)**: Validatoren erhalten neue ETH als Belohnung fürs Staking. Post-Merge (September 2022) sind das ca. 700.000–900.000 ETH pro Jahr bei ca. 30 Millionen gestakten ETH.

**Burn (–)**: Base Fees werden verbrannt. Bei normaler Netzwerkauslastung werden ca. 800.000–1.500.000 ETH pro Jahr verbrannt.

**Net Issuance** = Issuance – Burn. Bei niedriger Netzwerkauslastung ist Net Issuance positiv (ETH-Supply wächst). Bei hoher Auslastung ist Net Issuance negativ (ETH-Supply schrumpft).

Seit dem Merge und vor allem nach EIP-4844 (Lektion 3.3) ist Ethereum häufig deflationär — ein einzigartiges Merkmal unter großen Kryptowährungen.

### Praktische Konsequenzen für DeFi-Nutzer

**Dein Tip ist wichtig, aber klein.** Unter EIP-1559 reicht ein Tip von 1–3 Gwei für normale Priorität. Nur bei MEV-relevanten Operationen (Liquidationen, Arbitrage) sind höhere Tips sinnvoll.

**Base Fee kannst du nicht verhandeln.** Sie ist protokollseitig festgelegt. Du kannst nur warten, bis sie sinkt, oder auf L2 ausweichen.

**Der Gebührenmarkt ist vorhersehbarer.** Wallets schätzen Gebühren heute präziser als vor EIP-1559. Aber plötzliche Spikes (z.B. NFT-Launches) sind weiterhin möglich.

**Ultrasound-Money-Narrative ist datenbasiert.** Auf ultrasound.money kannst du Net Issuance in Echtzeit verfolgen. Das Narrative ist nicht nur Marketing — es ist eine direkte Folge des EIP-1559-Mechanismus.

---

## Slide Summary

### [Slide 1]
EIP-1559 und der Burn-Mechanismus
Modul 3, Lektion 2
Wie Ethereum zur "ultrasound money" wurde

### [Slide 2]
Das Problem vor EIP-1559

First-Price-Auction:
- Nutzer rieten Gaspreise
- Extreme Volatilität bei Spikes
- Alle Gebühren an Miner → Fehlanreize

### [Slide 3]
Was EIP-1559 geändert hat (5. Aug. 2021)

Zwei-Schichten-System:
- Base Fee (Protokoll, wird verbrannt)
- Priority Fee (Validator-Tip, optional)

### [Slide 4]
Der Anpassungsmechanismus

Ziel-Gas: 15 Mio. Maximum: 30 Mio.

- Block genau am Target: Base Fee stabil
- Block voll: Base Fee +12,5%
- Block leer: Base Fee −12,5%

### [Slide 5]
Warum verbrennen?

1. Anti-Manipulation (Validatoren können nicht profitieren)
2. ETH-Tokenomics (Supply-Reduktion)
3. Fairness (kein Miner-Kassier-Monopol)

### [Slide 6]
Net Issuance

Issuance (+): ~800k ETH/Jahr von Validatoren
Burn (−): 800k–1,5M ETH/Jahr bei normaler Auslastung

Net = Issuance − Burn
Positiv → ETH-Supply wächst
Negativ → ETH deflationär ("ultrasound money")

### [Slide 7]
Praxis für DeFi-Nutzer

- Tip: 1–3 Gwei ausreichend (höher nur bei MEV)
- Base Fee nicht verhandelbar (warten oder L2)
- Gebührenmarkt vorhersehbarer
- ultrasound.money zeigt Net Issuance live

### [Slide 8]
Key Takeaway

EIP-1559 hat den Gebührenmarkt rationalisiert UND ETH als Asset fundamental verändert.
Du zahlst die Gebühr, aber das Netzwerk behält sie nicht.

---

## Voice Narration Script

### [Slide 1]
Am 5. August 2021 aktivierte Ethereum mit der London-Hard-Fork das Upgrade EIP-1559. Es veränderte grundlegend, wie Transaktionsgebühren funktionieren — und hatte weitreichende Folgen für ETH als Asset.

### [Slide 2]
Vor EIP-1559 funktionierte Ethereums Gebührenmarkt als reines First-Price-Auktionssystem. Nutzer boten gegen einander mit Gaspreisen, Miner wählten die höchsten Gebote. Das hatte drei Probleme. Nutzer mussten Gaspreise raten — zu niedrig bedeutete stundenlange Wartezeiten, zu hoch bedeutete Überzahlung. Bei Nachfragespitzen explodierten Preise um das Zehn- bis Hundertfache. Und alle Gebühren gingen an Miner, was ihnen einen Anreiz gab, das Netzwerk überlastet zu halten.

### [Slide 3]
EIP-1559 ersetzte das durch ein zweischichtiges System. Base Fee — ein vom Protokoll festgelegter Minimumpreis, der dynamisch angepasst wird und verbrannt wird. Priority Fee — eine optionale Zusatzzahlung an den Validator. Für normale Transaktionen reichen kleine Tips von 1 bis 3 Gwei.

### [Slide 4]
Die Base Fee wird nach jedem Block neu berechnet. Ethereum-Blöcke haben ein Ziel-Gaslimit von 15 Millionen und ein Maximum von 30 Millionen. Anpassungsregeln: Block genau am Target — Base Fee bleibt stabil. Block voll — Base Fee steigt um 12,5 Prozent. Block leer — Base Fee fällt um bis zu 12,5 Prozent. Die 12,5-Prozent-Rate bedeutet, dass von 30 auf 100 Gwei nur etwa 10 Blöcke vergehen müssen — also etwa 2 Minuten bei konstant vollen Blöcken.

### [Slide 5]
Warum verbrennen statt verteilen? Erstens: Anti-Manipulation. Validatoren können nicht von hohen Base Fees profitieren — sie bekommen nur die Priority Fee. Das entfernt den Anreiz, Netzwerk absichtlich zu überlasten. Zweitens: ETH-Tokenomics. Der Burn entfernt ETH aus dem umlaufenden Angebot. Drittens: Fairness. Die verbrannten Gebühren werden nicht von einer kleinen Gruppe abkassiert — alle ETH-Halter profitieren von leichter Deflation.

### [Slide 6]
Ethereums ETH-Angebot verändert sich über zwei Mechanismen. Issuance — Validatoren erhalten neue ETH fürs Staking, etwa 700 bis 900 Tausend ETH pro Jahr post-Merge. Burn — Base Fees werden verbrannt, bei normaler Auslastung 800 Tausend bis 1,5 Millionen ETH pro Jahr. Net Issuance gleich Issuance minus Burn. Bei hoher Auslastung ist Net Issuance negativ — ETH wird deflationär. Das Phänomen wird als ultrasound money bezeichnet. Seit dem Merge ist Ethereum häufig deflationär — ein einzigartiges Merkmal unter großen Kryptowährungen.

### [Slide 7]
Drei praktische Konsequenzen. Tip ist wichtig, aber klein — 1 bis 3 Gwei reichen für normale Priorität. Base Fee kannst du nicht verhandeln — sie ist protokollseitig festgelegt. Der Gebührenmarkt ist vorhersehbarer als vorher. Und das Ultrasound-Money-Narrativ ist datenbasiert — auf ultrasound.money siehst du Net Issuance in Echtzeit.

### [Slide 8]
Takeaway. EIP-1559 hat den Gebührenmarkt rationalisiert und ETH als Asset fundamental verändert. Du zahlst die Gebühr, aber das Netzwerk behält sie nicht. Jede Transaktion macht den ETH-Bestand knapper.

---

## Visual Suggestions

### [Slide 1]
Title Card. Flamme mit ETH-Logo. Datum "August 5, 2021" im Hintergrund.

### [Slide 2]
Split-Screen. Links: chaotischer Auktionssaal mit Bietern. Rechts: Preisdiagramm mit extremen Spitzen.

### [Slide 3]
Zwei-Schichten-Diagramm. Oben: Priority Fee (optional, an Validator). Unten: Base Fee (obligatorisch, verbrannt).

### [Slide 4]
Flussdiagramm: Block mit Gasfüllstandsanzeige → Anpassungsentscheidung → neue Base Fee.

### [Slide 5]
Drei Gründe als Kartentrio mit Icons.

### [Slide 6]
**SCREENSHOT SUGGESTION:** Screenshot von ultrasound.money — zeigt Net Issuance live (positiv oder negativ), historische Daten, Burn-Rate.

### [Slide 7]
Praxisregeln als Checklist.

### [Slide 8]
Summary mit Flammen-Motiv. Übergang zu Lektion 3.3.

---

## Exercise

### Übung 3.2 — Net Issuance in Echtzeit analysieren

**Ziel:** Die Auswirkungen des Burn-Mechanismus auf ETH als Asset selbst beobachten.

**Schritte:**

1. Besuche [ultrasound.money](https://ultrasound.money).
2. Notiere die aktuellen Werte:

| Metrik | Wert |
|--------|------|
| Aktuelle Base Fee | |
| Burned (letzter Tag) | |
| Issuance (letzter Tag) | |
| Net Issuance (letzter Tag) | |
| ETH/USD | |
| Supply Change (letzter Tag) | |

3. Vergleiche mit historischen Daten: War Net Issuance dieses Jahr mehrheitlich positiv oder negativ?
4. Berechne: Wie viel ETH wurde dieses Jahr netto gemintet bzw. verbrannt?
5. Reflexion: Wie hängt Net Issuance mit der allgemeinen Netzwerk-Aktivität zusammen?

**Deliverable:** Screenshot + ausgefüllte Tabelle + 3-Satz-Reflexion.

---

## Quiz

### Frage 1
Eine Transaktion wird in einem Block aufgenommen, der genau am Target-Gas (15 Mio) liegt. Wie verändert sich die Base Fee für den nächsten Block?

<details>
<summary>Antwort anzeigen</summary>

**Die Base Fee bleibt gleich.** Das Target-Gas ist der Gleichgewichtspunkt — nur Abweichungen davon (voller oder leerer als Target) bewirken Anpassungen. Genau am Target → Base Fee stabil.
</details>

### Frage 2
Was bedeutet "Ultrasound Money" im Kontext von Ethereum?

<details>
<summary>Antwort anzeigen</summary>

**Antwort:** Ultrasound Money bezeichnet den Zustand, in dem Ethereums Burn (durch EIP-1559) die neue ETH-Issuance (Staking-Rewards für Validatoren) übersteigt — Net Issuance wird negativ, und das ETH-Gesamtangebot schrumpft. Der Begriff ist ein bewusstes Upgrade gegenüber "Sound Money" (traditionell Gold) — nicht nur knapp, sondern aktiv deflationär bei normaler Nutzung. Das Phänomen tritt bei hoher Netzwerkauslastung ein und ist auf ultrasound.money in Echtzeit beobachtbar.
</details>

---
---

# Lektion 3.3 — EIP-4844 Blobs und die L2-Fee-Revolution

**Dauer:** 8–10 Minuten

---

## Learning Objectives

Nach dieser Lektion können Teilnehmer:

• erklären, warum L2-Transaktionskosten vor EIP-4844 durch Data-Availability-Kosten dominiert wurden
• das Konzept "Blob" und seinen Unterschied zu normalen Calldata beschreiben
• die quantitative Auswirkung von EIP-4844 auf L2-Gebühren einordnen
• den aktuellen Stand der L2-Fee-Struktur bewerten und Implikationen für Strategien erkennen

---

## Explanation

Am 13. März 2024 aktivierte Ethereum das Dencun-Upgrade, das EIP-4844 enthielt — auch bekannt als "Proto-Danksharding" oder einfach "Blobs". Dieses Upgrade war der wichtigste Katalysator für die Aktivitätsexplosion auf L2s, weil es L2-Transaktionskosten um das 10- bis 100-fache senkte.

### Das Kostenproblem der L2s vor EIP-4844

Layer-2-Rollups wie Arbitrum, Optimism und Base verarbeiten Transaktionen off-chain und posten komprimierte Daten zurück nach L1. Diese Datenpublikation ist essentiell — sie ermöglicht es jedem, den L2-State aus L1-Daten zu rekonstruieren, was die Sicherheitsgrundlage jedes Rollups ist.

Das Problem: vor EIP-4844 wurden diese Daten als normale Calldata in L1-Transaktionen gespeichert. Calldata ist permanenter Storage — jede Node speichert sie für immer. Sie ist teuer, weil sie das Speicher-Budget von Ethereum dauerhaft belastet.

Die Folge: etwa 80–95% der L2-Transaktionskosten bestanden aus Data-Availability-Kosten — Gebühren, die der L2-Sequencer an Ethereum zahlte, um Daten dauerhaft zu speichern. Nur 5–20% waren für die L2-Execution selbst. Ein Uniswap-Swap auf Arbitrum kostete 0,50 bis 2 Dollar, von denen der Löwenanteil für L1-Datenpublikation wegging.

### Was ein Blob eigentlich ist

Ein Blob ist eine spezialisierte Datenstruktur, die EIP-4844 eingeführt hat. Entscheidende Eigenschaften:

**Temporäre Speicherung.** Blobs werden nach ca. 18 Tagen automatisch gelöscht. L2s, die Langzeit-Verifikation benötigen, speichern die Daten sowieso in ihrem eigenen Ökosystem (Off-Chain) — die L1-Speicherung ist nur für kurzfristige Verfügbarkeit und Fraud-Proof-Herausforderungen notwendig.

**Separater Gebührenmarkt.** Blobs haben ihre eigene Base Fee, die unabhängig von der normalen Transaktions-Base-Fee ist. Diese "Blob Base Fee" wird ebenfalls automatisch anhand der Blob-Nachfrage angepasst.

**Größe.** Jeder Blob ist 128 KB groß. Jeder Block kann bis zu 6 Blobs enthalten (Target 3 Blobs). Das entspricht ~750 KB pro Block an zusätzlichen Daten — ein massiver Kapazitätssprung gegenüber dem vorherigen Calldata-Limit.

**Commitments statt voller Daten.** Das L1-Protokoll speichert nur einen kryptographischen Commitment zu den Blob-Daten (KZG-Commitment). Die tatsächlichen Blob-Bytes sind nicht Teil des L1-Executionsstacks — sie werden von Consensus-Layer-Nodes verbreitet und temporär gespeichert.

### Die Gebühren-Revolution in Zahlen

Der Effekt war unmittelbar und dramatisch.

Vor EIP-4844:
- Uniswap-Swap auf Arbitrum: $0,50–$2,00
- Aave-Einzahlung auf Base: $1,00–$4,00
- NFT-Mint auf Optimism: $0,80–$3,00

Nach EIP-4844:
- Uniswap-Swap auf Arbitrum: $0,01–$0,10
- Aave-Einzahlung auf Base: $0,05–$0,30
- NFT-Mint auf Optimism: $0,02–$0,15

Die Reduktion: im Schnitt 10–100x. An Tagen mit niedriger Blob-Nachfrage können L2-Kosten sogar <$0,01 fallen.

### Was das für DeFi-Strategien bedeutet

**Marginale Strategien werden profitabel.** Vor EIP-4844 konnten Strategien mit häufigem Rebalancing (z.B. V3-LP-Range-Management, Delta-Neutrale-Positionen) bei kleineren Größen nicht profitabel sein, weil Gas-Kosten den Ertrag fraßen. Nach EIP-4844 sind selbst kleine Positionen ($500–$5.000) mit aktiver Verwaltung wirtschaftlich sinnvoll.

**Mehr Experimentieren möglich.** Neue Strategien, neue Protokolle, neue Farming-Opportunities können kostengünstig getestet werden. Eine Serie von 10 Probetransaktionen kostet $0,50 statt $20.

**L1 wird mehr zur Abwicklungsschicht.** Aktive Positionsführung wandert zunehmend komplett auf L2s. L1 behält seine Rolle für: große Positionen, Cold-Storage-Operationen, L1-exklusive Protokolle.

**Neue Chains entstehen und skalieren.** Die drastisch niedrigen Data-Availability-Kosten machen es attraktiv, neue L2s zu launchen. Base wuchs nach EIP-4844 rapide. Neue Rollup-Frameworks (OP Stack, Arbitrum Orbit, zkEVM) proliferieren.

### Die dunkle Seite: Blob-Auktionen

Nach der initialen Kostenexplosion hat sich ein neues Phänomen entwickelt: Perioden mit extrem hoher Blob-Nachfrage. Wenn mehrere L2s gleichzeitig hohe Aktivität haben, konkurrieren sie um Blob-Space. Die Blob Base Fee kann dann ebenfalls steigen — von üblichen 1 Gwei auf >100 Gwei in Extremfällen.

In solchen Phasen steigen L2-Gebühren wieder, wenn auch nicht auf Prä-4844-Niveau. Tools wie l2fees.info zeigen aktuelle L2-Gebühren über alle Chains hinweg.

### Was als Nächstes kommt

EIP-4844 ist nur der erste Schritt in Richtung "Full Danksharding". Geplante zukünftige Upgrades:

**Mehr Blob-Kapazität.** Das aktuelle Ziel von 3 Blobs pro Block soll schrittweise auf 32 oder mehr steigen.

**Proto-Danksharding → Full Danksharding.** Ein komplettes Sharding-Modell, bei dem Blob-Daten auf spezialisierte Nodes verteilt werden — weitere Kostensenkung.

**PeerDAS (Peer Data Availability Sampling).** Ermöglicht Light-Nodes, Blob-Verfügbarkeit ohne vollen Download zu verifizieren.

Die Richtung ist klar: L2-Transaktionen werden noch günstiger werden. Mittelfristig sollten Swaps im Sub-Cent-Bereich Standard sein.

---

## Slide Summary

### [Slide 1]
EIP-4844 Blobs und die L2-Fee-Revolution
Modul 3, Lektion 3
Dencun Upgrade — 13. März 2024

### [Slide 2]
Das Problem vor EIP-4844

L2-Transaktionskosten dominiert von L1-Data-Availability-Kosten
~80–95% für permanente Calldata
Arbitrum-Swap: $0,50–$2,00

### [Slide 3]
Was ein Blob ist

- Spezialisierte Datenstruktur
- Temporäre Speicherung (~18 Tage)
- Separater Gebührenmarkt (Blob Base Fee)
- 128 KB pro Blob, bis zu 6/Block
- KZG-Commitments statt voller Daten

### [Slide 4]
Die Gebühren-Revolution

Vorher:
- Arbitrum-Swap: $0,50–$2,00
- Base-Aave-Supply: $1–$4

Nachher:
- Arbitrum-Swap: $0,01–$0,10
- Base-Aave-Supply: $0,05–$0,30

10–100x Reduktion

### [Slide 5]
Konsequenzen für DeFi

- Marginale Strategien werden profitabel
- Experimentieren kostengünstig
- L1 = Abwicklungsschicht, L2 = Aktivität
- Neue Chains launchen leichter

### [Slide 6]
Blob-Auktionen — die dunkle Seite

Mehrere L2s konkurrieren um Blob-Space
Blob Base Fee kann von 1 Gwei auf 100+ steigen
l2fees.info zeigt aktuelle L2-Gebühren live

### [Slide 7]
Was als Nächstes kommt

Full Danksharding:
- Mehr Blob-Kapazität (3 → 32+)
- PeerDAS (Data Availability Sampling)
- Sub-Cent-Swaps als Standard

### [Slide 8]
Key Takeaway

EIP-4844 war der Katalysator.
L2-Aktivität explodiert weiter.
Aktive DeFi-Strategien gehören auf L2.

---

## Voice Narration Script

### [Slide 1]
Am 13. März 2024 aktivierte Ethereum das Dencun-Upgrade, das EIP-4844 enthielt — auch bekannt als Proto-Danksharding oder einfach Blobs. Dieses Upgrade war der wichtigste Katalysator für die Aktivitätsexplosion auf L2s, weil es L2-Transaktionskosten um das 10- bis 100-fache senkte.

### [Slide 2]
Vor EIP-4844 verarbeiteten L2s Transaktionen off-chain und posteten komprimierte Daten zurück nach L1 — als normale Calldata. Calldata ist permanenter Storage. Jede Node speichert sie für immer. Das machte sie teuer. Etwa 80 bis 95 Prozent der L2-Transaktionskosten bestanden aus diesen Data-Availability-Kosten. Ein Uniswap-Swap auf Arbitrum kostete 50 Cent bis 2 Dollar — der Löwenanteil ging für L1-Datenpublikation weg.

### [Slide 3]
Ein Blob ist eine spezialisierte Datenstruktur, die EIP-4844 eingeführt hat. Vier Eigenschaften. Temporäre Speicherung — Blobs werden nach etwa 18 Tagen automatisch gelöscht. Separater Gebührenmarkt — Blobs haben eigene Base Fee. Größe — 128 KB pro Blob, bis zu 6 pro Block, Target 3. Commitments — das L1-Protokoll speichert nur einen kryptographischen Commitment zu den Daten, nicht die vollen Bytes.

### [Slide 4]
Der Effekt war unmittelbar und dramatisch. Vor EIP-4844 kostete ein Arbitrum-Swap 50 Cent bis 2 Dollar. Nach EIP-4844 zahlst du 1 bis 10 Cent. Eine Aave-Einzahlung auf Base ging von 1 bis 4 Dollar auf 5 bis 30 Cent runter. Die Reduktion im Schnitt: 10 bis 100 mal günstiger. An Tagen mit niedriger Blob-Nachfrage können L2-Kosten sogar unter einem Cent fallen.

### [Slide 5]
Vier Konsequenzen für DeFi. Erstens: marginale Strategien werden profitabel — Positionen von 500 bis 5.000 Dollar mit aktivem Management sind jetzt wirtschaftlich. Zweitens: Experimentieren wird kostengünstig. Eine Serie von 10 Probetransaktionen kostet 50 Cent statt 20 Dollar. Drittens: L1 wird mehr zur Abwicklungsschicht für große Positionen, während aktives DeFi auf L2s wandert. Viertens: neue Chains entstehen leichter — Base wuchs nach EIP-4844 rapide.

### [Slide 6]
Die dunkle Seite: Blob-Auktionen. Wenn mehrere L2s gleichzeitig hohe Aktivität haben, konkurrieren sie um Blob-Space. Die Blob Base Fee kann dann ebenfalls steigen — von üblichen 1 Gwei auf über 100 Gwei in Extremfällen. In solchen Phasen steigen L2-Gebühren wieder, wenn auch nicht auf Prä-4844-Niveau. Tools wie l2fees.info zeigen aktuelle L2-Gebühren über alle Chains hinweg.

### [Slide 7]
EIP-4844 ist nur der erste Schritt. Geplante zukünftige Upgrades. Mehr Blob-Kapazität — von 3 auf 32 oder mehr pro Block. Vollständiges Danksharding mit spezialisierten Nodes. PeerDAS, das Light-Nodes erlaubt, Blob-Verfügbarkeit ohne vollen Download zu verifizieren. Die Richtung ist klar: L2-Transaktionen werden noch günstiger werden. Mittelfristig sollten Swaps im Sub-Cent-Bereich Standard sein.

### [Slide 8]
Takeaway. EIP-4844 war der Katalysator. L2-Aktivität explodiert weiter. Aktive DeFi-Strategien gehören auf L2. Das ist keine Empfehlung mehr, sondern operative Realität.

---

## Visual Suggestions

### [Slide 1]
Title Card. Zeitlinie mit Meilensteinen: Merge (2022) → Shapella → Dencun (März 2024). Dencun hervorgehoben.

### [Slide 2]
Balkendiagramm: L2-Transaktionskosten-Aufschlüsselung. 80-95% blau für Data Availability, 5-20% grün für Execution.

### [Slide 3]
Diagramm eines Blobs: Box mit "128 KB", Zeitmarker "~18 Tage", Pfeil zu einem kleinen "KZG Commitment" auf L1.

### [Slide 4]
Vorher-Nachher-Balkendiagramm mit L2-Transaktionskosten für drei Operationen.

### [Slide 5]
Vier-Panel-Visualisierung mit den Konsequenzen.

### [Slide 6]
**SCREENSHOT SUGGESTION:** Screenshot von l2fees.info mit aktueller Gebührentabelle über verschiedene L2s.

### [Slide 7]
Roadmap-Visualisierung: EIP-4844 → Mehr Blobs → Full Danksharding → PeerDAS. Zeitachse mit erwarteten Terminen.

### [Slide 8]
Summary Card. Übergang zu Lektion 3.4 (ERC-20).

---

## Exercise

### Übung 3.3 — L2-Gebühren-Vergleich

**Ziel:** Die Realität der L2-Gebühren selbst überprüfen und ein Gefühl für die Kostenstruktur entwickeln.

**Schritte:**

1. Besuche [l2fees.info](https://l2fees.info).
2. Fülle die Tabelle aus:

| Chain | Transfer-Gebühr | Swap-Gebühr |
|-------|----------------|-------------|
| Ethereum L1 | | |
| Arbitrum | | |
| Base | | |
| Optimism | | |
| zkSync Era | | |

3. Öffne einen Block-Explorer für eine L2 (z.B. arbiscan.io) und klicke auf eine beliebige Transaktion.
4. Finde den "L1 Data Fee"-Eintrag — das ist der Teil, den der Sequencer an Ethereum als Blob-Gebühr zahlt.
5. Vergleiche: L2-Execution-Kosten vs L1-Data-Kosten. Welcher Anteil ist größer?

**Deliverable:** Ausgefüllte Tabelle + Screenshot einer L2-Transaktion mit hervorgehobenen Gebühren.

---

## Quiz

### Frage 1
Warum wurden L2-Transaktionskosten vor EIP-4844 von Data-Availability-Kosten dominiert, statt von L2-Execution-Kosten?

<details>
<summary>Antwort anzeigen</summary>

**Antwort:** L2s verarbeiten Transaktionen off-chain, was sehr günstig ist — L2-Execution selbst kostet fast nichts, weil der L2-Sequencer viele Transaktionen parallel und ohne Gebühren-Markt-Druck verarbeiten kann. Der wesentliche Kostenfaktor war aber die Datenpublikation zurück nach Ethereum L1. Vor EIP-4844 wurden diese Daten als normale Calldata gespeichert — permanenter Storage, den jede Ethereum-Node für immer speichert. Diese permanente Speicherung ist teuer, weil sie das Speicher-Budget der gesamten Chain belastet. Bei L2-Transaktionen bestand dadurch 80-95% des Preises aus Data-Availability-Kosten. EIP-4844 führte Blobs ein — temporäre Speicherung (~18 Tage), separater Gebührenmarkt, 10-100x günstiger.
</details>

### Frage 2
Ein Trader plant eine Uniswap V3 Concentrated-Liquidity-Position mit aktivem Range-Management. Die Strategie erfordert etwa 150 Transaktionen pro Jahr. Warum ist diese Strategie nach EIP-4844 wirtschaftlich sinnvoller als vorher?

<details>
<summary>Antwort anzeigen</summary>

**Antwort:** Bei 150 Transaktionen pro Jahr auf Arbitrum:
- Vor EIP-4844: 150 × ~$1,25 (Mittelwert) = ~$187,50 Gaskosten/Jahr
- Nach EIP-4844: 150 × ~$0,05 = ~$7,50 Gaskosten/Jahr

Die Differenz von ~$180 pro Jahr ist für kleinere Positionen (unter $10.000) entscheidend. Eine Position mit 3% netto-Ertrag erzielt bei $10.000 Kapital etwa $300 Gewinn — vor EIP-4844 fraßen Gaskosten zwei Drittel davon. Nach EIP-4844 nur etwa 2,5%. Aktives Range-Management wurde dadurch für Positionen unter $50.000 überhaupt erst profitabel möglich. Das Gleiche gilt für Delta-Neutrale-Strategien, Leveraged-Staking-Loops und andere hochfrequente DeFi-Operationen.
</details>

---
---

# Lektion 3.4 — Der ERC-20 Token-Standard

**Dauer:** 8–10 Minuten

---

## Learning Objectives

Nach dieser Lektion können Teilnehmer:

• erklären, was ein ERC-20 Token-Contract ist und wie Token als Balance-Mapping funktionieren
• die sechs Kernfunktionen des ERC-20-Standards benennen
• den Unterschied zwischen `transfer` und `transferFrom` präzise erklären
• typische Abweichungen von der ERC-20-Spezifikation erkennen (Rebasing, Fee-on-Transfer, Blacklists)

---

## Explanation

ERC-20 ist der Standard, der 99% aller fungiblen Tokens auf Ethereum definiert — USDC, USDT, DAI, UNI, AAVE, LINK und tausende weitere. Der Standard ist täuschend simpel: nur wenige Funktionen. Aber das Verständnis dieser Mechanik ist essentiell für DeFi.

### Was ein ERC-20 Token tatsächlich ist

Ein ERC-20 Token ist **ein Smart Contract**. Nichts weiter. Keine separate Blockchain, kein eigenes Netzwerk, kein magischer "Token". Es ist ein einzelner Contract auf Ethereum, der eine Buchhaltung über Token-Besitz führt.

Die zentrale Datenstruktur ist ein Mapping:

```
balances: map[address → uint256]
```

Wenn USDC-Contract-Balance[0xdeine_adresse] = 1.000.000.000, dann "besitzt" deine Adresse 1.000 USDC (weil USDC 6 Dezimalstellen hat). Das ist alles, was "USDC besitzen" bedeutet: ein Eintrag in einem Contract-Storage.

Jede USDC-Transaktion ist eine Modifikation dieses Mappings:
- Sender-Balance wird reduziert
- Empfänger-Balance wird erhöht

Der Token "existiert" nicht außerhalb des Contracts. Deine Adresse hat keinen intrinsischen USDC-Besitz — der USDC-Contract sagt nur, dass deiner Adresse ein bestimmter Betrag zugewiesen ist.

### Die sechs Kernfunktionen

Der ERC-20-Standard (EIP-20) definiert sechs verpflichtende Funktionen:

**1. `totalSupply()`** — gibt die Gesamtmenge des Tokens zurück.

**2. `balanceOf(address)`** — gibt die Balance einer Adresse zurück.

**3. `transfer(to, amount)`** — überträgt Token vom Caller zur Empfänger-Adresse. Simpelste Operation.

**4. `approve(spender, amount)`** — autorisiert einen anderen Account (typischerweise ein Contract), eine bestimmte Menge Token vom Caller zu überweisen. Schreibt `allowance[caller][spender] = amount` in den Storage.

**5. `transferFrom(from, to, amount)`** — überträgt Token von `from` zu `to`, aber nur bis zur Höhe der vorher gesetzten Allowance. Wird von Spender-Contracts aufgerufen (z.B. Uniswap, Aave).

**6. `allowance(owner, spender)`** — liest aktuelle Allowance.

Plus drei Events, die jede Statusänderung auslösen:

**`Transfer(from, to, amount)`** — bei jeder Überweisung.
**`Approval(owner, spender, amount)`** — bei jeder `approve`-Operation.

### Das approve + transferFrom Pattern (Wiederholung)

Wir haben in Module 2, Lektion 2.4 ausführlich darüber gesprochen. Kurz als Rekapitulation:

Warum zwei Schritte? Weil Token nicht "auf deinem Wallet liegen" — sie sind Einträge im Token-Contract-Storage. Ein Smart Contract (z.B. Uniswap) kann nicht direkt auf deinen Token zugreifen — er muss autorisiert werden.

Flow:
1. Du rufst `approve(uniswap_router, 1000)` auf dem USDC-Contract auf.
2. Uniswap-Router ruft später `transferFrom(dein_wallet, pool, 1000)` auf.

### Wichtige Eigenschaften — Decimals

ERC-20 Tokens haben das Konzept von "Decimals". Es ist **nur eine Display-Konvention** — im Contract werden Integers gespeichert.

- USDC hat 6 Decimals: 1 USDC = 1.000.000 (interne Einheit)
- DAI hat 18 Decimals: 1 DAI = 1.000.000.000.000.000.000
- WBTC hat 8 Decimals: 1 WBTC = 100.000.000
- Die meisten Tokens haben 18 Decimals (Ethereum-Standard)

Im Contract werden keine Dezimalzahlen gespeichert. Alle Mengen sind Integers. Die Funktion `decimals()` (optional, aber universell implementiert) gibt zurück, wie das Display formatieren soll.

Dies ist eine häufige Fehlerquelle: Wenn du 100 USDC senden willst, übertragst du 100.000.000 (100 × 10^6), nicht 100.

### Häufige Abweichungen vom Standard

Nicht alle "ERC-20 Tokens" halten sich strikt an den Standard. Es gibt mehrere Arten von Sonderverhalten:

**Fee-on-Transfer Tokens.** Der Contract nimmt bei jeder Überweisung eine Gebühr (z.B. 2% gehen an ein Burn-Wallet oder einen Marketing-Pool). Wenn du 100 sendest, kommen nur 98 an. Diese Tokens brechen viele DeFi-Protokolle, die annehmen, dass `transferFrom(100)` tatsächlich 100 überträgt.

**Rebasing Tokens.** Die Balance einer Adresse ändert sich ohne Transaktion. Beispiele: AMPL (Ampleforth), stETH (in pre-wrapped-form). Das "Token" entspricht einem Anteil am Gesamtsupply, der sich durch Rebase-Aktionen verändert. Rebasing-Tokens sind schwer mit Uniswap V2/V3 LPs zu kombinieren.

**Blacklist/Freeze Tokens.** Der Contract hat einen Admin, der Adressen sperren oder Tokens einfrieren kann. USDC und USDT haben das. Das widerspricht der Idee dezentraler Tokens, ist aber für regulierte Stablecoins Realität.

**Double-Entrancy/Callback Tokens (ERC-777).** Tokens, die beim Transfer einen Callback an den Empfänger auslösen. Hat zu mehreren Exploits geführt (z.B. imBTC Uniswap V1-Angriff 2020). Moderne DeFi-Protokolle schützen sich explizit dagegen.

**Upgradeable Contracts.** Der Token-Contract ist über einen Proxy deployed und kann vom Admin geändert werden. Das bedeutet: die Logik, die heute gilt, kann sich morgen ändern. USDC nutzt das; DAI nicht.

### Praktische Implikationen

**Bevor du einen unbekannten Token handelst:** Prüfe den Contract-Source-Code auf Etherscan (nur wenn "Contract Source Code Verified" angezeigt wird). Achte auf `_transfer`-Overrides, `fee`-Variablen, Admin-Funktionen.

**Token-Verifikation:** Die offiziellen Contract-Adressen bekannter Tokens findest du auf CoinGecko/CoinMarketCap. Niemals auf einen Token klicken, der plötzlich in deinem Wallet auftaucht — oft Scam-Tokens.

**Decimals beachten:** Beim programmatischen Interaktion immer `decimals()` abfragen. Hardcoded 18 ist eine häufige Fehlerquelle bei Tokens wie USDC (6 Decimals).

### Wrapped Tokens als besonderer Fall

Manche Tokens existieren, um andere Assets in ERC-20-Format zu bringen:

**WETH (Wrapped ETH).** ETH ist kein ERC-20 Token — es ist Ethereums native Währung. Viele DeFi-Protokolle können nur ERC-20 verarbeiten. WETH ist ein Contract, der 1:1 mit ETH konvertiert: du sendest ETH, bekommst WETH; du verbrennst WETH, bekommst ETH zurück.

**WBTC (Wrapped Bitcoin).** Bitcoin auf einer anderen Chain. Verwahrt durch einen zentralisierten Custodian (BitGo). Vertrauensabhängig.

**renBTC (früher).** Bitcoin-Wrapping über ein dezentralisiertes Custodian-Netzwerk (Ren Protocol).

Wrapped Tokens sind fundamental verschieden vom Underlying — du hältst eine Forderung gegen den Wrapping-Contract, nicht das Underlying-Asset selbst. Risiko: wenn der Contract kompromittiert wird, verlierst du alles.

---

## Slide Summary

### [Slide 1]
Der ERC-20 Token-Standard
Modul 3, Lektion 4
Wie Tokens tatsächlich funktionieren

### [Slide 2]
Was ein ERC-20 Token ist

Ein Smart Contract mit einem Mapping:
balances: address → uint256

"USDC besitzen" = Eintrag im USDC-Contract

Tokens existieren nur als Contract-Storage

### [Slide 3]
Die sechs Kernfunktionen

1. totalSupply()
2. balanceOf(address)
3. transfer(to, amount)
4. approve(spender, amount)
5. transferFrom(from, to, amount)
6. allowance(owner, spender)

Plus Events: Transfer, Approval

### [Slide 4]
transfer vs transferFrom

transfer: du selbst sendest Token
transferFrom: Contract sendet Token in deinem Namen (nach approve)

Beispiel Uniswap-Swap:
1. Du → approve(Router, 1000)
2. Router → transferFrom(du, Pool, 1000)

### [Slide 5]
Decimals — nur Display-Konvention

- USDC: 6 Decimals (1 USDC = 1.000.000)
- DAI: 18 Decimals
- WBTC: 8 Decimals
- Standard: 18

Im Contract nur Integers. Display-Formatierung via decimals().

### [Slide 6]
Häufige Abweichungen

- Fee-on-Transfer (z.B. 2% Burn bei Transfer)
- Rebasing (Balance ändert sich ohne Tx) — AMPL, stETH
- Blacklist/Freeze — USDC, USDT
- Callback-Tokens (ERC-777) — Exploit-Quelle
- Upgradeable Contracts — USDC ja, DAI nein

### [Slide 7]
Praktische Regeln

- Contract-Source-Code prüfen bei unbekannten Tokens
- Offizielle Contract-Adressen via CoinGecko verifizieren
- decimals() immer programmatisch abfragen
- Nie auf suddenly-appearing Tokens klicken

### [Slide 8]
Wrapped Tokens

WETH: ETH als ERC-20 (1:1, vertrauenslos)
WBTC: Bitcoin auf Ethereum (BitGo, zentralisiert)

Wrapped ≠ Underlying. Du hältst Forderung gegen den Wrapper.

### [Slide 9]
Key Takeaway

ERC-20 ist ein Contract, kein Asset.
Das Mapping IST der Token.
Standard ist einfach, aber Sonderverhalten kann tückisch sein.

---

## Voice Narration Script

### [Slide 1]
ERC-20 ist der Standard, der 99 Prozent aller fungiblen Tokens auf Ethereum definiert — USDC, USDT, DAI, UNI, AAVE, LINK und tausende weitere. Der Standard ist täuschend simpel — nur wenige Funktionen. Aber das Verständnis dieser Mechanik ist essentiell für alles, was in DeFi folgt.

### [Slide 2]
Ein ERC-20 Token ist ein Smart Contract. Nichts weiter. Keine separate Blockchain, kein eigenes Netzwerk. Es ist ein einzelner Contract auf Ethereum, der eine Buchhaltung über Token-Besitz führt. Die zentrale Datenstruktur ist ein Mapping: Balances, Adresse zu Integer. Wenn USDC-Contract-Balance deiner Adresse eine Milliarde beträgt, dann besitzt du 1.000 USDC, weil USDC 6 Dezimalstellen hat. Das ist alles. Der Token existiert nicht außerhalb des Contracts. Der USDC-Contract sagt nur, dass deiner Adresse ein bestimmter Betrag zugewiesen ist.

### [Slide 3]
Der Standard definiert sechs verpflichtende Funktionen. totalSupply gibt die Gesamtmenge zurück. balanceOf gibt die Balance einer Adresse zurück. transfer überträgt vom Caller zum Empfänger. approve autorisiert einen anderen Account, Token vom Caller zu überweisen. transferFrom überträgt auf Basis einer vorher gesetzten Allowance. allowance liest die aktuelle Allowance. Plus zwei Events: Transfer und Approval werden bei jeder Statusänderung emittiert.

### [Slide 4]
Der wichtigste Unterschied: transfer versus transferFrom. Bei transfer sendest du selbst Token aus deinem Wallet. Bei transferFrom sendet ein Contract Token in deinem Namen — nach vorheriger approve. Beispiel Uniswap-Swap: Du rufst approve auf dem USDC-Contract, um dem Router zu erlauben, 1000 USDC zu bewegen. Dann ruft der Router transferFrom auf, um die USDC tatsächlich in den Pool zu bringen. Zwei Schritte, weil Token nicht auf deinem Wallet liegen, sondern im Contract-Storage.

### [Slide 5]
ERC-20 Tokens haben das Konzept von Decimals. Das ist nur eine Display-Konvention. Im Contract werden Integers gespeichert. USDC hat 6 Decimals: 1 USDC gleich 1.000.000 interne Einheiten. DAI hat 18 Decimals. WBTC hat 8. Der Standard ist 18 Decimals. Die Funktion decimals gibt zurück, wie das Display formatieren soll. Häufige Fehlerquelle: wenn du 100 USDC senden willst, überträgst du 100 Millionen interne Einheiten, nicht 100.

### [Slide 6]
Nicht alle ERC-20 Tokens halten sich strikt an den Standard. Fee-on-Transfer-Tokens nehmen bei jeder Überweisung eine Gebühr. Wenn du 100 sendest, kommen nur 98 an. Das bricht viele DeFi-Protokolle. Rebasing-Tokens ändern die Balance ohne Transaktion — AMPL, stETH zum Beispiel. Schwierig zu kombinieren mit LP-Positionen. Blacklist-Tokens haben einen Admin, der Adressen sperren kann — USDC, USDT nutzen das. Callback-Tokens mit ERC-777-Erweiterung haben zu mehreren Exploits geführt. Und Upgradeable Contracts können vom Admin geändert werden — heute fair, morgen vielleicht anders.

### [Slide 7]
Praktische Regeln. Erstens: bevor du einen unbekannten Token handelst, prüfe den Contract-Source-Code auf Etherscan. Zweitens: offizielle Contract-Adressen bekannter Tokens findest du auf CoinGecko oder CoinMarketCap — verifiziere vor jeder Interaktion. Drittens: bei programmatischer Interaktion immer decimals abfragen, nie hardcoden. Viertens: wenn plötzlich ein Token in deinem Wallet auftaucht, den du nicht gekauft hast — nicht anklicken. Das ist oft ein Scam-Token, der beim Interagieren ein Drain triggert.

### [Slide 8]
Wrapped Tokens sind ein besonderer Fall. WETH ist ETH als ERC-20 — 1 zu 1 konvertierbar, vertrauenslos. Viele DeFi-Protokolle können nur ERC-20 verarbeiten, daher braucht man WETH. WBTC ist Bitcoin auf Ethereum — verwahrt durch einen zentralisierten Custodian BitGo. Vertrauensabhängig. Wrapped Tokens sind fundamental verschieden vom Underlying. Du hältst eine Forderung gegen den Wrapping-Contract, nicht das Underlying-Asset selbst. Wenn der Contract kompromittiert wird, verlierst du alles.

### [Slide 9]
Takeaway. ERC-20 ist ein Contract, kein Asset. Das Mapping IST der Token. Der Standard ist einfach, aber Sonderverhalten — Fees, Rebasing, Blacklists, Upgrades — kann tückisch sein. Wer ERC-20-Contracts lesen kann, versteht DeFi auf einer anderen Ebene.

---

## Visual Suggestions

### [Slide 1]
Title Card. Abstrakte Token-Visualisierung: hex-förmige Tokens mit Vertragsdetails im Hintergrund.

### [Slide 2]
Diagramm des Balance-Mappings. Contract-Box mit Storage, der eine Tabelle von Adressen zu Balances zeigt. Pfeil von "USDC besitzen" zu Eintrag im Storage.

### [Slide 3]
Liste der 6 Funktionen mit Icons. Events als separate Sektion unten.

### [Slide 4]
Flussdiagramm: Links "transfer" (einfacher Pfeil Wallet → Empfänger). Rechts "transferFrom" (zwei-Stufen: approve zuerst, dann transferFrom durch Contract).

### [Slide 5]
Tabelle mit populären Tokens und ihren Decimals. Warnung: "Nicht hardcoden".

### [Slide 6]
Grid mit 5 Kategorien, jeweils mit Icon und Kurzbeschreibung.

### [Slide 7]
**SCREENSHOT SUGGESTION:** Screenshot eines verifizierten Contracts auf Etherscan, mit "Contract Source Code Verified"-Hinweis. Zeigt den Code-Tab und die Read/Write-Contract-Tabs.

### [Slide 8]
Wrapping-Diagramm. Links: ETH/BTC. Rechts: WETH/WBTC auf Ethereum. Mittlerer Pfeil mit "Wrapping"-Label.

### [Slide 9]
Summary Card. Übergang zu Lektion 3.5 (NFTs).

---

## Exercise

### Übung 3.4 — Token-Contract-Analyse

**Ziel:** Einen ERC-20-Contract direkt auf Etherscan analysieren.

**Schritte:**

1. Öffne den USDC-Contract auf Etherscan: `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48`.
2. Gehe auf den "Contract" Tab. Ist der Code verified? (Ja).
3. Scrolle zu "Read Contract" und finde:
   - `totalSupply()` — aktuelle Supply
   - `decimals()` — Decimals von USDC
   - `balanceOf(0xdac17f958d2ee523a2206206994597c13d831ec7)` — was gibt das zurück?
4. Bemerke die Upgradeability-Struktur: USDC ist über einen Proxy deployed.
5. Wähle einen weiteren Token aus (z.B. UNI: `0x1f9840a85d5af5bf1d1762f925bdaddc4201f984`).
6. Vergleiche: Ist es ebenfalls upgradeable? Welche Decimals?

**Deliverable:** Tabelle mit den abgefragten Werten für beide Tokens + kurze Beobachtung zu Unterschieden.

---

## Quiz

### Frage 1
Du möchtest 250 USDC an eine Adresse überweisen. USDC hat 6 Decimals. Welchen Integer-Wert übergibst du der transfer-Funktion?

<details>
<summary>Antwort anzeigen</summary>

**Antwort:** 250.000.000 (250 × 10^6)

USDC hat 6 Decimals, also werden interne Werte in millionstel USDC gespeichert. 250 USDC × 10^6 = 250.000.000 interne Einheiten. Wenn du stattdessen 250 übergibst, würdest du tatsächlich nur 0,00025 USDC senden. Dies ist eine der häufigsten Fehlerquellen bei programmatischer Interaktion mit Tokens, die nicht 18 Decimals haben.
</details>

### Frage 2
Welches Problem entsteht, wenn du einen "Fee-on-Transfer"-Token mit einem AMM wie Uniswap V2 zu interagieren versuchst?

<details>
<summary>Antwort anzeigen</summary>

**Antwort:** Uniswap V2 (und viele andere DeFi-Protokolle) gehen davon aus, dass `transferFrom(amount)` tatsächlich `amount` Token überträgt. Bei Fee-on-Transfer-Tokens wird bei jedem Transfer ein Teil (z.B. 2%) abgezogen und an ein anderes Wallet oder Burn-Wallet umgeleitet. Wenn du 100 Token in einen Pool einzahlen willst, kommen nur 98 an. Der Pool "erwartet" aber 100 und führt die Rechnung entsprechend aus — das resultiert entweder in Fehlermeldungen oder, schlimmer, in falschen Positionsbuchungen und potenziellen Exploits. Die meisten modernen Protokolle lehnen Fee-on-Transfer-Tokens entweder explizit ab oder haben spezielle Logik dafür (z.B. Uniswap V3 mit "swapExactTokensForTokensSupportingFeeOnTransferTokens").
</details>

---
---

# Lektion 3.5 — NFTs: ERC-721 und ERC-1155

**Dauer:** 6–8 Minuten

---

## Learning Objectives

Nach dieser Lektion können Teilnehmer:

• den Unterschied zwischen fungiblen und non-fungiblen Tokens präzise erklären
• die zentralen Funktionen von ERC-721 benennen und verstehen
• ERC-1155 als Multi-Token-Standard von ERC-721 unterscheiden
• typische NFT-Sicherheitsprobleme (setApprovalForAll, Token-Drainer) erkennen

---

## Explanation

NFTs — Non-Fungible Tokens — sind der zweite große Token-Typ auf Ethereum. Während ERC-20-Tokens austauschbar sind (ein USDC ist wie jedes andere), ist jeder NFT einzigartig. Die Standards ERC-721 und ERC-1155 definieren, wie das funktioniert.

### Fungibel vs. Non-Fungibel

**Fungibel** (ERC-20): Alle Einheiten sind identisch. Ein USDC ist austauschbar mit jedem anderen USDC. Tokens sind wie Dollar-Scheine: dein 20$-Schein und mein 20$-Schein haben denselben Wert, sind gleichwertig.

**Non-fungibel** (ERC-721): Jedes Token ist einzigartig. BAYC #8419 ist nicht dasselbe wie BAYC #3529 — sie haben unterschiedliche Eigenschaften (Traits), visuell verschiedene Bilder, und ihr Marktwert kann stark variieren. Tokens sind wie einzelne Kunstwerke: nicht austauschbar.

### ERC-721 — Der NFT-Standard

ERC-721 definiert jedes NFT als einen **Contract + Token-ID**. Ein NFT-Contract enthält eine Kollektion (z.B. "Bored Ape Yacht Club"), und jedes einzelne NFT in dieser Kollektion hat eine eindeutige ID (0 bis 9.999 für BAYC).

Zentrale Datenstrukturen:

```
_owners: map[tokenId → address]
_balances: map[address → uint256]  // Anzahl NFTs pro Adresse
_tokenApprovals: map[tokenId → address]  // approve für einen spezifischen NFT
_operatorApprovals: map[owner → map[operator → bool]]  // setApprovalForAll
```

Hauptfunktionen:

**`ownerOf(tokenId)`** — gibt den Besitzer eines spezifischen NFTs zurück.

**`balanceOf(owner)`** — gibt die Anzahl der NFTs dieser Kollektion zurück, die `owner` hält.

**`transferFrom(from, to, tokenId)`** — überträgt NFT von `from` zu `to`. Caller muss entweder der Owner sein ODER approved sein.

**`safeTransferFrom(from, to, tokenId)`** — wie `transferFrom`, aber prüft zusätzlich, ob der Empfänger ein Contract mit `onERC721Received`-Handler ist. Verhindert versehentliches Senden an Contracts, die NFTs nicht verarbeiten können.

**`approve(to, tokenId)`** — autorisiert Adresse, ein spezifisches NFT zu überweisen.

**`setApprovalForAll(operator, true)`** — autorisiert Adresse, **alle** NFTs der Kollektion des Callers zu überweisen. Wird von Marktplätzen (OpenSea, Blur) benötigt, damit sie Trades ausführen können.

### Metadata und Token-URIs

ERC-721-Contracts speichern typischerweise nur: wer besitzt welche ID. Die visuellen/eigenschaftlichen Daten (Bild, Traits, Beschreibung) werden **off-chain** referenziert.

Die Funktion `tokenURI(tokenId)` gibt eine URL zurück, die auf ein JSON-File mit Metadata verweist. Typische Struktur:

```json
{
  "name": "Bored Ape #8419",
  "description": "The most prestigious PFP collection...",
  "image": "ipfs://QmXYZ.../8419.png",
  "attributes": [
    {"trait_type": "Background", "value": "Blue"},
    {"trait_type": "Fur", "value": "Gold"},
    ...
  ]
}
```

Die Metadata-Speicherung ist ein sicherheitsrelevantes Thema:
- **IPFS-gehostete** Metadata ist zensurresistenter, aber braucht aktive Pinning-Services.
- **Zentralisierte Server** (z.B. bayc.com/api/metadata) sind schnell, aber können offline gehen oder geändert werden.
- **On-chain** Metadata (z.B. Chain-Runners, manche Art Blocks) sind vollständig auf Ethereum — das NFT kann nie verschwinden.

### ERC-1155 — Der Multi-Token-Standard

ERC-1155 wurde von Enjin entwickelt und löst ein Problem von ERC-721: die Ineffizienz bei großen Kollektionen oder semi-fungiblen Tokens.

Unterschiede zu ERC-721:

**Mehrere Token-Typen in einem Contract.** Ein einziger ERC-1155-Contract kann unterschiedliche Tokens verwalten. Beispiel: ein Gaming-Contract hat "Sword of Fire" als Token-ID 42 und "Shield of Ice" als Token-ID 43.

**Semi-Fungibilität.** Jeder Token-Typ kann mehrere Kopien haben. Du kannst 10 "Sword of Fire" besitzen — sie sind untereinander austauschbar, aber verschieden von "Shield of Ice". ERC-721 kann das nicht direkt.

**Batch-Operationen.** `safeBatchTransferFrom` kann mehrere Token-Typen in einer einzigen Transaktion übertragen. Massive Gas-Einsparung bei Kollektionen.

Zentrale Funktionen:

**`balanceOf(account, id)`** — Balance eines bestimmten Token-Typs (nicht nur Count).

**`balanceOfBatch(accounts[], ids[])`** — mehrere Balances auf einmal.

**`safeTransferFrom(from, to, id, amount, data)`** — einzelner Transfer.

**`safeBatchTransferFrom(from, to, ids[], amounts[], data)`** — Batch-Transfer.

**`setApprovalForAll(operator, approved)`** — wie bei ERC-721.

### Typische NFT-Nutzungsfälle

**Kunstkollektionen.** CryptoPunks, BAYC, Azuki, Pudgy Penguins — spekulative Sammelobjekte mit Community-Aspekten.

**Gaming-Assets.** Axie Infinity, Gods Unchained — in-game-Items als NFTs.

**Tickets und Zugangsrechte.** Tickets zu Events, Mitgliedschaften (Decentraland-LAND), Token-gated Communities.

**DeFi-Positionen.** Uniswap V3 Liquiditätspositionen sind NFTs (jede hat eigene Range und Komposition).

**Identität und Credentials.** ENS-Domains (.eth), Soulbound-Tokens (Abschlüsse, Zertifikate — nicht übertragbar).

**On-Chain-Kunst.** Art Blocks Curated — generativ, vollständig on-chain.

### Sicherheitsrisiken

**setApprovalForAll ist die Drainer-Technik Nummer 1 für NFTs.** Ein böswilliger Contract bittet dich, `setApprovalForAll(scammer, true)` zu signieren — vermeintlich um deine NFTs zu listen oder an einem "Mint" teilzunehmen. Wenn du unterschreibst, kann der Scammer-Contract ALLE deine NFTs dieser Kollektion übertragen. Marktplätze benötigen diese Autorisierung legitimerweise, aber die gleiche Signatur wird für Drainer missbraucht.

**Fake-Mint-Websites.** Vor jedem neuen NFT-Launch entstehen Dutzende Phishing-Sites, die den Launch imitieren. Identifizierbar durch: leicht abweichende URLs, neue Twitter-Accounts ohne History, Dringlichkeits-Sprache.

**Poisoned NFTs.** Wenn plötzlich ein unbekannter NFT in deinem Wallet auftaucht, nicht anklicken. Tausende solcher "Airdrop"-NFTs enthalten Scam-URLs, die bei Interaktion auf Drainer-Sites führen.

**Verify-the-Collection.** Vor jedem NFT-Kauf auf OpenSea: prüfe, ob die Kollektion verifiziert ist (blauer Haken), vergleiche die Contract-Adresse mit der offiziellen Site. Gefälschte Kollektionen kopieren Bilder und Namen.

---

## Slide Summary

### [Slide 1]
NFTs: ERC-721 und ERC-1155
Modul 3, Lektion 5
Non-Fungibility auf Ethereum

### [Slide 2]
Fungibel vs Non-Fungibel

ERC-20: alle Einheiten identisch (1 USDC = 1 USDC)
ERC-721: jede Einheit einzigartig (BAYC #8419 ≠ BAYC #3529)

### [Slide 3]
ERC-721 — Der NFT-Standard

NFT = Contract + Token-ID

Datenstrukturen:
- _owners: tokenId → address
- _balances: address → count
- Approvals pro Token + operator-wise

### [Slide 4]
Hauptfunktionen

- ownerOf(tokenId)
- balanceOf(owner)
- transferFrom(from, to, tokenId)
- safeTransferFrom (prüft Receiver)
- approve(to, tokenId) — single
- setApprovalForAll(operator, true) — all

### [Slide 5]
Metadata & Token-URIs

tokenURI(id) → JSON mit name, image, attributes

Storage:
- IPFS (zensurresistent, braucht Pinning)
- Zentraler Server (schnell, fragil)
- On-Chain (vollständig, teuer)

### [Slide 6]
ERC-1155 — Multi-Token-Standard

Mehrere Token-Typen in einem Contract
Semi-Fungibel (10× "Sword of Fire")
Batch-Operationen → massive Gas-Einsparung

### [Slide 7]
NFT-Nutzungsfälle

- Kunstkollektionen (BAYC, CryptoPunks)
- Gaming-Assets (Axie)
- Tickets, Memberships
- DeFi-Positionen (Uniswap V3 LP)
- Identität (ENS, Soulbound)
- On-Chain-Kunst (Art Blocks)

### [Slide 8]
Sicherheitsrisiken

- setApprovalForAll = Drainer #1
- Fake-Mint-Websites
- Poisoned NFTs ("surprise airdrop")
- Gefälschte Kollektionen

Vor jedem NFT-Kauf: Contract-Adresse verifizieren.

### [Slide 9]
Key Takeaway

NFTs sind einzigartige Einträge im Contract-Storage.
Standard-Approvals sind ein Drainer-Vektor.
Verifikation vor Interaktion ist nicht optional.

---

## Voice Narration Script

### [Slide 1]
NFTs — Non-Fungible Tokens — sind der zweite große Token-Typ auf Ethereum. Während ERC-20-Tokens austauschbar sind, ist jeder NFT einzigartig. Die Standards ERC-721 und ERC-1155 definieren, wie das funktioniert.

### [Slide 2]
Fungibel versus non-fungibel. Bei ERC-20 sind alle Einheiten identisch — ein USDC ist austauschbar mit jedem anderen USDC. Bei ERC-721 ist jedes Token einzigartig. BAYC Nummer 8419 ist nicht dasselbe wie BAYC Nummer 3529 — sie haben unterschiedliche Eigenschaften, verschiedene Bilder, ihr Marktwert kann stark variieren. ERC-20 sind wie Dollar-Scheine, ERC-721 wie einzelne Kunstwerke.

### [Slide 3]
ERC-721 definiert jedes NFT als Contract plus Token-ID. Ein NFT-Contract enthält eine Kollektion, zum Beispiel Bored Ape Yacht Club, und jedes einzelne NFT hat eine eindeutige ID — 0 bis 9.999 für BAYC. Die zentralen Datenstrukturen: owners — Mapping von Token-ID zu Adresse. Balances — Anzahl NFTs pro Adresse. Plus Approval-Mappings für einzelne Tokens und für operator-wise Genehmigungen.

### [Slide 4]
Sechs Hauptfunktionen. ownerOf gibt den Besitzer eines spezifischen NFTs zurück. balanceOf gibt die Anzahl der NFTs zurück, die eine Adresse in dieser Kollektion hält. transferFrom überträgt ein NFT. safeTransferFrom ist wie transferFrom, prüft aber zusätzlich, ob der Empfänger ein Contract ist, der NFTs korrekt verarbeiten kann. approve autorisiert eine Adresse, ein spezifisches NFT zu überweisen. Und setApprovalForAll autorisiert eine Adresse, ALLE NFTs der Kollektion zu überweisen — wichtig für Marktplätze.

### [Slide 5]
NFT-Contracts speichern typischerweise nur: wer besitzt welche ID. Die visuellen Daten — Bild, Traits, Beschreibung — werden off-chain referenziert. Die Funktion tokenURI gibt eine URL zurück, die auf ein JSON mit Metadata verweist. Speicherung: IPFS ist zensurresistenter, braucht aber aktive Pinning-Services. Zentralisierte Server sind schnell, können aber offline gehen. On-Chain-Metadata — das NFT kann nie verschwinden, aber es ist teuer zu deployen.

### [Slide 6]
ERC-1155 ist der Multi-Token-Standard. Hauptunterschiede zu ERC-721: mehrere Token-Typen in einem Contract. Ein einziger Gaming-Contract kann Sword of Fire als ID 42 und Shield of Ice als ID 43 verwalten. Semi-Fungibilität: jeder Token-Typ kann mehrere Kopien haben — du kannst 10 Sword of Fire besitzen, sie sind untereinander austauschbar. Und Batch-Operationen erlauben, mehrere Token-Typen in einer Transaktion zu übertragen — massive Gas-Einsparung.

### [Slide 7]
Typische NFT-Nutzungsfälle. Kunstkollektionen wie CryptoPunks, BAYC, Azuki. Gaming-Assets wie Axie Infinity. Tickets und Memberships. DeFi-Positionen — jede Uniswap V3 LP-Position ist ein NFT. Identität und Credentials — ENS-Domains sind NFTs, ebenso Soulbound-Tokens für Abschlüsse und Zertifikate. Und On-Chain-Kunst wie Art Blocks.

### [Slide 8]
Sicherheitsrisiken sind zentral. setApprovalForAll ist die Drainer-Technik Nummer 1 für NFTs. Ein böswilliger Contract bittet dich, diese Signatur zu setzen — vermeintlich zum Listen oder Minten. Wenn du unterschreibst, kann der Scammer alle deine NFTs dieser Kollektion abziehen. Fake-Mint-Websites imitieren legitime Launches. Poisoned NFTs tauchen in deinem Wallet auf, nicht anklicken. Und gefälschte Kollektionen kopieren Bilder und Namen — immer die Contract-Adresse verifizieren.

### [Slide 9]
Takeaway. NFTs sind einzigartige Einträge im Contract-Storage, nicht mehr und nicht weniger. Standard-Approvals — insbesondere setApprovalForAll — sind ein aktiver Drainer-Vektor. Verifikation vor Interaktion ist nicht optional. Die gleichen Sicherheitsprinzipien aus Module 2 gelten hier verschärft.

---

## Visual Suggestions

### [Slide 1]
Title Card. Mosaik aus unterschiedlichen NFT-Artworks (Platzhalter-Visualisierungen).

### [Slide 2]
Split-Screen: Links identische USDC-Münzen, rechts verschiedene NFT-Kunstwerke.

### [Slide 3]
Contract-Storage-Visualisierung mit Mappings als Tabellen.

### [Slide 4]
Funktionsliste mit Icons. `setApprovalForAll` mit rotem Warn-Rand.

### [Slide 5]
Drei-Panel-Layout mit Storage-Optionen: IPFS (Knotenpunkt), zentraler Server (Cloud), On-Chain (Contract-Block).

### [Slide 6]
Vergleichstabelle ERC-721 vs ERC-1155.

### [Slide 7]
Grid mit 6 Nutzungsfällen, jeweils mit Beispiel-Logo/Icon.

### [Slide 8]
**SCREENSHOT SUGGESTION:** Screenshot von OpenSea mit einer verifizierten Kollektion (blauer Haken hervorgehoben). Daneben ein Beispiel einer Fake-Kollektion mit identischem Namen.

### [Slide 9]
Summary Card. Übergang zur finalen Lektion 3.6 (Etherscan).

---

## Exercise

### Übung 3.5 — NFT-Contract-Untersuchung

**Ziel:** Einen echten NFT-Contract analysieren und setApprovalForAll-Approvals auf deinem Wallet prüfen.

**Schritte:**

1. Öffne den BAYC-Contract: `0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d` auf Etherscan.
2. Notiere:
   - `totalSupply()`
   - `name()` und `symbol()`
   - `tokenURI(1)` — wo liegt die Metadata?
3. Öffne [revoke.cash](https://revoke.cash) und verbinde dein Wallet.
4. Wechsle zum Tab "NFT Approvals".
5. Liste alle aktiven setApprovalForAll-Rechte:

| Kollektion | Operator-Adresse | Bezeichnung (wenn bekannt) |
|------------|------------------|----------------------------|
| | | |
| | | |

6. Revoke jeden Approval, den du nicht aktiv benötigst.

**Deliverable:** Screenshot deiner NFT-Approvals-Liste (vorher/nachher).

---

## Quiz

### Frage 1
Warum ist `setApprovalForAll(operator, true)` ein besonders gefährlicher Approval-Typ?

<details>
<summary>Antwort anzeigen</summary>

**Antwort:** `setApprovalForAll` autorisiert den Operator, **alle** NFTs der Kollektion zu übertragen, die der Caller besitzt oder in Zukunft besitzen wird. Einzelne `approve(tokenId)`-Calls autorisieren nur einen spezifischen NFT. Wenn du setApprovalForAll auf einen legitimen Marktplatz wie OpenSea setzt, ist das notwendig — aber wenn du es aus Versehen auf einen böswilligen Contract setzt (z.B. über eine Phishing-Site), kann der Contract deine gesamte Kollektion leerräumen. Die typische Drainer-Technik ist, dich zu überzeugen, setApprovalForAll zu signieren unter Vorgabe eines "Mints" oder einer Listing-Aktion. Nach der Signatur kann der Drainer alle deine NFTs in dieser Kollektion sweepen — und zwar unabhängig davon, wann und wie sie in dein Wallet gekommen sind.
</details>

### Frage 2
Welcher Hauptvorteil bietet ERC-1155 gegenüber ERC-721 für ein Blockchain-Game, das mehrere Item-Typen mit multiplen Kopien verwaltet?

<details>
<summary>Antwort anzeigen</summary>

**Antwort:** ERC-1155 bietet drei entscheidende Vorteile: (1) **Mehrere Token-Typen in einem Contract** — anstatt für jeden Item-Typ einen separaten Contract deployen zu müssen (teuer), kann ein einziger ERC-1155-Contract alle Items verwalten. (2) **Semi-Fungibilität** — 10 identische "Sword of Fire"-Items sind untereinander fungibel, können als eine Einheit gezählt werden, aber sind verschieden von "Shield of Ice". ERC-721 würde 10 separate NFTs mit eigenen IDs erfordern. (3) **Batch-Operationen** — `safeBatchTransferFrom` kann mehrere Item-Typen in einer Transaktion übertragen. Ein Game, das einem Spieler 5 Swords, 3 Shields und 2 Potions schenkt, braucht nur eine Transaktion. Mit ERC-721 wären es 10 separate Transaktionen. Die Gas-Einsparung ist dramatisch und macht komplexe Game-Operationen überhaupt erst wirtschaftlich.
</details>

---
---

# Lektion 3.6: Etherscan als Untersuchungs-Tool

**Dauer:** 10-12 Minuten

---

## Learning Objectives

Nach dieser Lektion können Teilnehmer:

- Eine beliebige Ethereum-Adresse auf Etherscan navigieren und den Token-Bestand, die Transaktions-Historie und die Interaktions-Pattern lesen
- Eine Transaktion auf Etherscan forensisch auseinandernehmen — inklusive Input Data, Internal Transactions, Logs/Events und State Changes
- Zwischen verifizierten und unverifizierten Smart Contracts unterscheiden und einen verifizierten Contract über Read Contract und Write Contract direkt bedienen
- Die Token Approval Checker-Seite nutzen, um offene Approvals zu identifizieren und über revoke.cash oder direkt über Etherscan zu revoken
- Basic On-Chain-Forensik durchführen: einer Geldspur folgen, einen Contract-Deployment-Kontext untersuchen, Attack-Transaktionen zerlegen

---

## Explanation

Etherscan ist der Block-Explorer für Ethereum — und für jeden, der ernsthaft mit DeFi arbeiten will, ist Etherscan das wichtigste Werkzeug überhaupt. Es ist das, was ein Reuters-Terminal für einen Trader ist: die Oberfläche, durch die du die Realität der Chain direkt anschaust, ohne dass eine App dazwischen steht, die dir die Wahrheit interpretiert oder filtert. Jede Transaktion, jeder Contract, jede Token-Bewegung, jede State-Change ist dort sichtbar. Und genau deshalb ist die Fähigkeit, Etherscan flüssig zu lesen, der Unterschied zwischen jemandem, der DeFi "benutzt" und jemandem, der DeFi **versteht**.

### Die drei zentralen Seiten auf Etherscan

Jede Untersuchung auf Etherscan beginnt auf einer von drei Seitentypen:

1. **Address Page** — `etherscan.io/address/0x...` — zeigt alles über eine Adresse: Balance, Token-Holdings, alle historischen Transaktionen, interne Transaktionen, NFT-Bestand.
2. **Transaction Page** — `etherscan.io/tx/0x...` — zeigt alles über eine einzelne Transaktion: Sender, Receiver, Gas-Daten, Input Data, Logs, Internal Transactions.
3. **Token Page** — `etherscan.io/token/0x...` — zeigt alles über einen ERC-20 oder ERC-721 Token: Total Supply, Holders, Transfers, Contract-Details.

Alle drei sind untereinander verlinkt. Von einer Adresse kommst du durch Klick zu ihren Transaktionen. Von einer Transaktion kommst du zum Token-Contract, der involviert war. Vom Token-Contract kommst du zur Liste der Top-Holders. Die gesamte Forensik-Arbeit besteht darin, zwischen diesen drei Seitentypen zu navigieren und Spuren zu verfolgen.

### Die Anatomie einer Address Page

Wenn du eine beliebige Adresse in Etherscan eingibst, siehst du als erstes im oberen Bereich die **ETH Balance** (in ETH und USD-Wert), den **ETH Value** (falls es sich um einen Contract handelt, der andere Assets hält, ist das hier unterschiedlich), und die **Token Holdings**. Der Token Holdings-Dropdown ist extrem wertvoll — er listet alle ERC-20 und ERC-721 Tokens auf, die diese Adresse jemals empfangen und noch nicht komplett weggeschickt hat. Dabei ist aber Vorsicht geboten: **Scam-Tokens** sind hier oft dabei. Jeder kann einen Token erstellen und an beliebige Adressen senden — sogenannte "Address Poisoning" oder "Dust Attacks" nutzen das aus. Wenn du einen Token in deinem Holdings siehst, den du nicht kennst, interagiere niemals damit, bevor du den Contract untersucht hast.

Unterhalb der Balance-Info siehst du mehrere Tabs:

- **Transactions** — normale ausgehende und eingehende Transaktionen
- **Internal Transactions** — ETH-Bewegungen, die durch Contract-Interaktionen ausgelöst wurden (kein direkter User-Call)
- **ERC-20 Token Txns** — alle Token-Transfers involving diese Adresse
- **ERC-721 Token Txns** — alle NFT-Transfers
- **Contract** (falls Adresse ein Contract ist) — Source Code, Read/Write Tabs
- **Events** — Logs, die für diese Adresse emittiert wurden
- **Analytics** — Charts über die Aktivität

Die Transactions-Tabelle zeigt für jede Tx: Block-Number, Age, From, To, Value, Transaction Fee, und einen **Method** Label. Method ist besonders wichtig — Etherscan dekodiert den Function-Call, wenn der Contract verifiziert ist. Du siehst dann nicht nur "0xa9059cbb" (den Selector), sondern "Transfer" oder "Swap" oder "Approve". Das ist Gold wert für schnelle Einschätzung.

### Externally Owned Account (EOA) vs. Contract

Die erste Frage, die du auf einer Address Page beantworten musst: **Ist das eine EOA oder ein Contract?** Du erkennst einen Contract an zwei Markern: (1) es gibt einen "Contract" Tab unter den Transaktionen, und (2) die Adresse hat selbst Bytecode (was du über den `eth_getCode` RPC-Call oder direkt durch den Contract-Tab bestätigen kannst). EOAs haben keinen Code — sie sind nur Public Keys, die Signaturen erzeugen können.

Diese Unterscheidung ist fundamental. Eine EOA wird von einem Private Key kontrolliert, den ein Mensch (oder eine Maschine) hält. Ein Contract wird von seinem eigenen Code kontrolliert — und wenn der Code eine `owner`-Variable hat oder eine Governance-Funktion, dann wird der Contract indirekt von der Entity kontrolliert, die den Owner-Slot besetzt.

### Verifizierte vs. unverifizierte Contracts

Wenn du auf einer Contract-Address Page bist und den "Contract" Tab öffnest, siehst du eine von zwei Welten:

1. **Verified Contract** — der Source Code ist sichtbar, meist in Solidity. Du siehst den Originalcode, alle Funktionen, alle State-Variables, alle Events. Etherscan zeigt auch einen grünen Haken neben dem Contract-Namen. Dies ist der Normalfall für seriöse Protokolle (Uniswap, Aave, Lido, etc.). Die Verifikation bedeutet, dass jemand (typischerweise der Deployer) den Source Code eingereicht hat und Etherscan diesen gegen den on-chain Bytecode kompiliert und Bit-für-Bit verglichen hat. Wenn sie matchen, ist der Contract verifiziert und der Code ist garantiert der Code, der tatsächlich ausgeführt wird.

2. **Unverified Contract** — du siehst nur den kompilierten Bytecode, also unleserliche Hex-Daten. Das heißt nicht automatisch, dass der Contract malicious ist — es gibt legitime Gründe, einen Contract unverified zu lassen (proprietärer Code, noch in Entwicklung). **Aber:** jeder Contract, mit dem du interagieren möchtest und der Unverified ist, ist ein massives Red Flag. Du kannst nicht wissen, was der Code tut, du musst dem Deployer blind vertrauen, und du kannst keine Funktionen direkt via Etherscan aufrufen.

Die Verifikations-Quote ist ein informelles Qualitätssignal. Tier-1-Protokolle verifizieren immer. Scam-Contracts sind oft unverifiziert, weil der Schöpfer nicht will, dass man die `withdrawAll()`-Funktion sieht, die nur der Owner aufrufen kann.

### Read Contract und Write Contract

Wenn ein Contract verifiziert ist, erscheinen zwei mächtige Tabs:

**Read Contract** — alle `view` und `pure` Funktionen des Contracts. Das sind Funktionen, die nichts auf der Chain ändern, sondern nur lesen. Du kannst sie direkt im Browser aufrufen, ohne eine Wallet zu connecten. Beispiele: `balanceOf(address)` für einen ERC-20, `owner()` für einen Ownable-Contract, `totalSupply()`, `getReserves()` für ein Uniswap-Pair. Das ist der direkte Weg, den Zustand eines Contracts zu inspizieren, ohne auf eine Frontend-App angewiesen zu sein.

**Write Contract** — alle state-changing Funktionen. Hier musst du deine Wallet connecten. Etherscan wird dir für jede Funktion die Parameter anzeigen und beim Klick auf "Write" eine Transaktion in deiner Wallet vorbereiten. Dies ist die Notfall-Oberfläche: wenn eine App down ist, wenn ein Frontend gehackt wurde, wenn du dir bei einer komplexen Operation über eine App unsicher bist — du kannst jede Funktion direkt über Etherscan aufrufen, vorausgesetzt der Contract ist verifiziert. Fortgeschrittene User interagieren mit Contracts oft ausschließlich über Write Contract, weil es alle Frontend-Risiken (Clickjacking, Domain-Hijacking, etc.) eliminiert.

### Die Anatomie einer Transaction Page

Jede Transaktion hat eine eigene Page, erreichbar unter `etherscan.io/tx/0x...`. Die Top-Hälfte zeigt die Standard-Metadaten: Status (Success/Fail), Block, Timestamp, From, To, Value, Transaction Fee, Gas Price, Gas Limit, Gas Used. Unterhalb findest du mehrere mächtige Inspektions-Tabs:

**Input Data** — die rohen Daten, die mit der Transaktion versendet wurden. Das ist der encoded Function Call. Etherscan bietet zwei Ansichten: "Original" (hex) und "Decoded" (wenn der Ziel-Contract verifiziert ist, wird der Call menschlich lesbar angezeigt, mit Funktionsnamen und Parametern). Die Decoded-Ansicht ist entscheidend, um zu verstehen, was eine Transaktion **wirklich** tut. Eine Transaktion, die auf den ersten Blick harmlos aussieht ("Contract Interaction"), kann decoded plötzlich offenbaren, dass sie `transferFrom(victimAddress, attackerAddress, 1000000)` aufruft.

**Internal Txns** — ETH-Transfers, die durch den Contract-Call **innerhalb** der Transaktion ausgelöst wurden. Wenn du einen Swap auf Uniswap machst und am Ende 2 ETH zurückbekommst, ist dieses "zurückbekommen" kein separates Event in der Haupt-Tx — es ist eine Internal Transaction. Internal Txns sind wichtig, weil sie der einzige Weg sind, Contract-zu-Adresse ETH-Flows zu sehen. Ein Drainer, der deine ETH weg-skimmt, macht das über Internal Transactions.

**Logs / Events** — strukturierte Events, die der Contract emittiert hat. Jeder ERC-20-Transfer emittiert ein `Transfer(from, to, value)`-Event. Jeder Uniswap-Swap emittiert ein `Swap`-Event. Diese Events sind die strukturierte, indizierbare Historie — sie sind der Grund, warum Apps wie Dune Analytics überhaupt funktionieren können. Für Forensik ist das Logs-Tab oft der schnellste Weg, zu sehen, welche Tokens in welcher Menge zwischen welchen Adressen geflossen sind.

**State** — die genauen Änderungen an Contract-State-Variables und Account-Balances durch diese Transaktion. Du siehst "before" und "after" Werte für jeden geänderten Storage-Slot. Das ist das mächtigste Forensik-Tool, das Etherscan bietet — es erlaubt dir, **exakt** zu verstehen, was eine Transaktion geändert hat.

### Token Approvals und die Approval Checker-Seite

Unter `etherscan.io/tokenapprovalchecker` findest du ein Tool, das für jede Adresse (nach Connect der Wallet oder Eingabe einer beliebigen Adresse) alle offenen ERC-20 und ERC-721 Approvals auflistet. Für jede Zeile siehst du:

- Den Token-Contract und dessen Namen
- Den Spender-Contract und dessen Namen
- Die Approval-Höhe (oft "Unlimited" = `2^256 - 1`)
- Einen "Revoke"-Button

Etherscan's Approval Checker ist das offizielle Gegenstück zu revoke.cash. Beide Tools machen im Grunde das Gleiche: sie scannen die Approval-Events für deine Adresse und bauen eine Liste der aktiven Autorisierungen auf. Beide erlauben dir, Approvals mit einem Klick zu revoken (was unter der Haube `approve(spender, 0)` aufruft — was wiederum Gas kostet, typischerweise ~$2-5 pro Revoke auf Mainnet, Cent-Bruchteile auf L2).

**Critical Habit:** Sobald du aus einer DeFi-Session zurück bist (besonders auf einem "Hot" Wallet, der mit Yield-Farming oder neuen Protokollen spielt), öffne Etherscan Approval Checker und revoke alles, was du gerade nicht brauchst. Gewohnheit baut schwer auf — aber dies ist die #1 Gewohnheit, die einem Wallet-Drain vorbeugt.

### Contract Creation und Deployer-Analyse

Jede Contract-Address-Page zeigt im oberen Bereich "Contract Creator" — die Adresse, die den Contract deployed hat, und die Transaktion-Hash der Deployment-Transaktion. Das ist ein mächtiger Forensik-Startpunkt. Wenn ein neuer Token auftaucht, den du untersuchst, schau auf den Creator. Was für andere Contracts hat der Creator deployed? Wenn die Creator-Adresse eine History von 50 ähnlich strukturierten Scam-Tokens hat, ist das ein starkes Warnsignal.

Die Deployment-Transaktion selbst zeigt oft interessante Muster. Ein seriöses Protokoll wird eine gut finanzierte Deployer-Adresse haben, die Deployment-Transaktion wird Constructor-Parameter enthalten, die mit der Protokoll-Dokumentation übereinstimmen, und der Deployer wird typischerweise andere Governance- oder Operations-Adressen haben, die du über Etherscan-Labels (siehe nächster Abschnitt) identifizieren kannst.

### Etherscan-Labels und Name Tags

Etherscan pflegt eine umfangreiche Datenbank von Labels für bekannte Adressen. Du siehst sie als kleine Tags neben Adressen: "Uniswap V3: Router", "Aave: Pool", "Binance: Hot Wallet 14", "EigenLayer: Strategy Manager". Diese Labels sind extrem wertvoll für schnelle Orientierung. Wenn du eine Tx untersuchst und siehst, dass die To-Adresse "Uniswap V2: Router" ist, weißt du sofort, dass es ein Swap war. Wenn du siehst, dass eine Adresse "Tornado Cash" ist, weißt du, dass Funds durch einen Mixer gegangen sind.

Manchmal fehlen Labels für wichtige Adressen — Etherscan updated diese manuell, und es gibt Lags. Aber die Label-Coverage für Top-100 Protokolle ist praktisch komplett.

### Praktisches Forensik-Beispiel: Eine Drainer-Transaktion zerlegen

Angenommen, du siehst in deinem Wallet, dass 50,000 USDC weg sind, ohne dass du eine Transaktion erinnerst. Gehe zu deiner Address Page auf Etherscan, öffne den "ERC-20 Token Txns" Tab und filtere nach USDC. Du findest die Transaktion, die die 50K abgezogen hat. Klicke auf den Tx-Hash.

Auf der Transaction Page schaust du: From? Das ist nicht deine Adresse — es war jemand anderes. To? Der USDC-Contract. Value? 0 ETH (da es ein ERC-20-Transfer ist, kein ETH-Transfer). Input Data (Decoded)? `transferFrom(yourAddress, attackerAddress, 50000000000)` — ein transferFrom-Call, der 50K USDC (6 Dezimalen) von dir zum Attacker zieht.

Nun die Forensik-Frage: Wie hat der Attacker das geschafft, ohne deinen Private Key? Antwort: Du hast ihm irgendwann ein Approval gegeben. Gehe zu Etherscan Token Approval Checker, schau nach historical Approvals für USDC, und du findest die approve-Transaktion, die das ermöglicht hat — typischerweise Wochen oder Monate früher, als du mit einer Phishing-Site interagiert hast oder aus Versehen eine Approval an einen gefälschten Protokoll-Contract gegeben hast.

Diese Art von Analyse — von einem Schaden zur Ursache zu navigieren — ist der Kern von On-Chain-Forensik. Etherscan gibt dir alle Werkzeuge, die du dafür brauchst.

### Etherscan Pro und alternative Explorer

Etherscan bietet auch ein Premium-Tier (Etherscan Pro), das erweiterte Features bringt: bessere API-Limits, erweiterte Analytics, Alerts für Adressen. Für den durchschnittlichen User ist die kostenlose Version mehr als ausreichend.

Für andere Chains gibt es Etherscan-Klone:
- **Basescan** für Base
- **Arbiscan** für Arbitrum
- **Optimistic Etherscan** für Optimism
- **Polygonscan** für Polygon
- **BSCScan** für BNB Chain

Alle basieren auf der gleichen Codebase und funktionieren identisch. Zusätzlich gibt es alternative Explorer wie **Blockscout** (Open Source, läuft für viele L2s und Testnets) und **Phalcon** (Tenderly-basiert, besonders stark für Tx-Simulation und Debugging).

---

## Slide Summary

**[Slide 1] Warum Etherscan die DeFi-Super-Skill ist**
- Block-Explorer = direkte Sicht auf Chain-Realität, ohne App-Interpretation
- Trennt DeFi-User von DeFi-Experten
- Essentiell für Security, Forensik, Contract-Analyse
- Primäres Notfall-Tool wenn Frontends down oder kompromittiert

**[Slide 2] Die drei Seitentypen**
- Address Page: `etherscan.io/address/0x...` → Balance, Tokens, Historie
- Transaction Page: `etherscan.io/tx/0x...` → eine einzelne Tx auseinandernehmen
- Token Page: `etherscan.io/token/0x...` → Token-Details, Holders, Transfers
- Forensik = Navigation zwischen diesen drei

**[Slide 3] Die Address Page — Die Tabs**
- Transactions: normale In/Out Txs
- Internal Transactions: ETH-Bewegungen durch Contract-Calls
- ERC-20 Token Txns: alle Token-Transfers
- ERC-721 Token Txns: NFT-Transfers
- Contract Tab: Source Code (wenn Contract)
- Events: alle emittierten Logs

**[Slide 4] EOA vs. Contract erkennen**
- EOA = Private Key-gesteuert, kein Code
- Contract = Code-gesteuert, hat "Contract" Tab
- Contract-Owner entscheidet oft über Contract-Verhalten
- Check-Frage: "Gibt es einen Contract-Tab?" → Binary-Diagnose

**[Slide 5] Verified vs. Unverified**
- Verified: Source Code sichtbar, grüner Haken, Read/Write verfügbar
- Unverified: nur Bytecode sichtbar, blind trusting
- Tier-1-Protokolle sind IMMER verified
- Unverified + Interaction = Massive Red Flag

**[Slide 6] Read Contract**
- Alle view/pure Funktionen direkt im Browser aufrufbar
- Keine Wallet-Connection nötig
- State eines Contracts inspizieren: balanceOf, owner, totalSupply, getReserves
- Unabhängig von App-Frontends

**[Slide 7] Write Contract**
- Alle state-changing Funktionen direkt aufrufbar
- Wallet-Connect nötig
- Notfall-Oberfläche wenn App down oder kompromittiert
- Frontend-Risiken (Clickjacking, Domain-Hijacking) komplett umgangen

**[Slide 8] Transaction Page — Die Tabs**
- Input Data: Decoded Function Call → was die Tx wirklich tut
- Internal Txns: ETH-Flows innerhalb der Tx
- Logs / Events: strukturierte Token-Bewegungen, Swaps, etc.
- State: exakte before/after Werte für Storage-Slots

**[Slide 9] Token Approval Checker**
- `etherscan.io/tokenapprovalchecker`
- Listet alle offenen ERC-20/ERC-721 Approvals
- Revoke-Button pro Zeile
- Monthly Review = #1 Schutz gegen Wallet-Drain

**[Slide 10] Contract Creator Forensik**
- Jeder Contract hat Creator + Deployment-Tx
- Creator-Historie zeigt Scam-Muster (50 Scam-Token-Deployments = Red Flag)
- Deployment-Tx-Parameter checken gegen offizielle Docs
- Connected Ops/Governance-Adressen via Labels identifizierbar

**[Slide 11] Name Tags und Labels**
- "Uniswap V3: Router", "Aave: Pool", "Binance: Hot Wallet"
- Schnelle Orientierung bei unbekannten Adressen
- Label-Coverage für Top-100-Protokolle praktisch vollständig
- Fehlendes Label ≠ malicious, aber Untersuchung nötig

**[Slide 12] Forensik-Workflow: Drainer-Post-Mortem**
- Schaden identifizieren (welche Tokens weg?)
- Tx der Bewegung finden über Token Txns-Tab
- Decoded Input Data lesen → Function identifizieren
- Bei `transferFrom`: Approval-Historie checken → Ursache finden

**[Slide 13] Chain-spezifische Explorer**
- Basescan (Base), Arbiscan (Arbitrum), Optimistic Etherscan (Optimism)
- Polygonscan (Polygon), BSCScan (BNB Chain)
- Alle gleiche Codebase — Skills 1:1 übertragbar
- Alternativen: Blockscout (Open Source), Phalcon (Tenderly)

---

## Voice Narration Script

**[Slide 1]** Wir schließen Modul 3 ab mit dem Werkzeug, das für DeFi das ist, was das Reuters-Terminal für den Trader ist — Etherscan. Etherscan ist der Block-Explorer für Ethereum, und es ist die Oberfläche, durch die du die Realität der Chain direkt siehst, ohne dass eine App dazwischen steht, die dir interpretiert, was passiert. Das ist fundamental. Die Fähigkeit, Etherscan fließend zu lesen, ist der harte Unterschied zwischen jemandem, der DeFi benutzt und jemandem, der DeFi versteht. Jede Transaktion, jeder Contract, jede Approval — alles ist dort sichtbar.

**[Slide 2]** Etherscan besteht im Grunde aus drei Seitentypen, und jede Untersuchung ist Navigation zwischen ihnen. Die Address Page zeigt alles über eine Adresse — Balance, Token-Holdings, Transaktions-Historie. Die Transaction Page zeigt alles über eine einzelne Transaktion — Sender, Receiver, genau was gemacht wurde. Und die Token Page zeigt alles über einen Token — Supply, Top-Holders, Transfers. Forensik-Arbeit bedeutet, diese drei Seitentypen zu verknüpfen, um einer Spur zu folgen.

**[Slide 3]** Auf einer Address Page findest du mehrere Tabs, und jeder zeigt eine andere Dimension der Aktivität. Der Transactions-Tab zeigt normale In- und Out-Transaktionen. Der Internal Transactions-Tab ist wichtiger als er klingt — er zeigt ETH-Bewegungen, die durch Contract-Calls ausgelöst wurden, nicht durch direkte User-Calls. Der ERC-20 Token Txns-Tab listet alle Token-Transfers. Und wenn die Adresse selbst ein Contract ist, gibt es einen Contract-Tab mit Source Code und Read/Write-Funktionen.

**[Slide 4]** Die erste Frage, die du auf jeder Address Page beantworten musst, ist — ist das eine EOA oder ein Contract? EOA heißt Externally Owned Account — das ist eine Adresse, die von einem Private Key gesteuert wird. Contract heißt die Adresse hat eigenen Code. Du erkennst einen Contract daran, dass ein "Contract" Tab existiert. Diese Unterscheidung ist fundamental, weil Contracts anders funktionieren — sie werden von ihrem Code kontrolliert, und wenn der Code eine Owner-Variable hat, dann hängt alles davon ab, wer diesen Owner-Slot besetzt.

**[Slide 5]** Wenn eine Adresse ein Contract ist, ist die zweite Frage — ist er verifiziert? Verifizierter Contract bedeutet, dass der Source Code zu Etherscan eingereicht wurde, und Etherscan hat den gegen den on-chain Bytecode kompiliert und verglichen. Grüner Haken neben dem Namen. Unverifizierter Contract bedeutet, du siehst nur den rohen Bytecode — unleserliche Hex-Daten. Tier-1-Protokolle wie Uniswap, Aave, Lido sind immer verifiziert. Wenn du mit einem unverifizierten Contract interagieren sollst — das ist ein massives Red Flag.

**[Slide 6]** Bei einem verifizierten Contract erscheint der Read Contract-Tab. Das ist mächtig — er listet alle view- und pure-Funktionen, also alles was nichts auf der Chain ändert, sondern nur liest. Du kannst diese Funktionen direkt im Browser aufrufen, ohne deine Wallet zu connecten. balanceOf einer Adresse checken, den Owner eines Contracts abfragen, den Total Supply lesen, die Reserves eines Uniswap-Pairs. Das ist der direkte Weg, den Contract-State zu inspizieren.

**[Slide 7]** Der Write Contract-Tab ist das Gegenstück für state-changing Funktionen. Hier connectest du deine Wallet und kannst jede schreibende Funktion direkt aufrufen — komplett ohne die offizielle App des Protokolls. Das ist die Notfall-Oberfläche. Wenn eine App down ist, wenn ein Frontend gehackt wurde, wenn du Angst hast dass eine Domain gespooft wurde — du kannst immer direkt über Etherscan mit dem Contract reden. Advanced User interagieren oft ausschließlich so, weil alle Frontend-Risiken damit umgangen sind.

**[Slide 8]** Eine Transaction Page hat ebenfalls mehrere Tabs, und jeder ist ein Forensik-Werkzeug. Input Data in der Decoded-Ansicht zeigt dir den wirklichen Function-Call — du siehst genau, welche Funktion aufgerufen wurde mit welchen Parametern. Internal Txns zeigen ETH-Flows innerhalb der Transaktion — wichtig, weil ein Swap dir zum Beispiel ETH zurückgibt, und das ist eine Internal Tx. Logs zeigen strukturierte Events — jeder ERC-20-Transfer emittiert ein Event, jeder Swap auch. State zeigt before-after Werte für jeden geänderten Storage-Slot — das ist das präziseste Forensik-Tool.

**[Slide 9]** Eine Seite, die jeder DeFi-User zum Reflex haben sollte — der Etherscan Token Approval Checker. Du findest ihn unter etherscan.io/tokenapprovalchecker. Connecte deine Wallet oder gib eine beliebige Adresse ein, und du siehst die komplette Liste aller offenen Approvals — welche Spender haben Berechtigung über welche Tokens, in welcher Höhe. Jede Zeile hat einen Revoke-Button. Der monatliche Review dieser Liste ist statistisch die wichtigste Einzel-Gewohnheit, die du gegen Wallet-Drains implementieren kannst.

**[Slide 10]** Jeder Contract hat oben auf seiner Page einen "Contract Creator" — die Adresse die den Contract deployed hat, und die Tx-Hash dieses Deployments. Das ist ein mächtiger Forensik-Startpunkt. Wenn ein neuer Token auftaucht und du untersuchst — schau den Creator an. Was hat diese Adresse sonst deployed? Wenn sie fünfzig ähnlich strukturierte Scam-Tokens in den letzten sechs Monaten rausgehauen hat, ist das die Antwort auf deine Frage. Seriöse Protokolle haben Creators mit konsistenter, gut dokumentierter Historie.

**[Slide 11]** Etherscan pflegt Name Tags — also Labels für bekannte Adressen. Du siehst sie als kleine Tags neben Adressen: Uniswap V3 Router, Aave Pool, Binance Hot Wallet 14, EigenLayer Strategy Manager. Die sind Gold wert für schnelle Orientierung. Wenn du eine Tx untersuchst und die To-Adresse ist "Uniswap V2 Router" — du weißt sofort, es war ein Swap. Die Label-Coverage für Top-Protokolle ist praktisch komplett. Fehlendes Label heißt nicht malicious, aber es heißt, du musst selbst recherchieren.

**[Slide 12]** Lass uns einen konkreten Forensik-Workflow durchspielen. Angenommen, 50.000 USDC fehlen plötzlich in deinem Wallet. Schritt eins — gehe auf deine Address Page, öffne ERC-20 Token Txns, filtere nach USDC. Du findest die Abfluss-Transaktion. Schritt zwei — öffne die Tx, schau die Decoded Input Data an. Du siehst transferFrom, deine Adresse als From, Attacker-Adresse als To. Schritt drei — der Attacker hatte keine Private Key. Gehe zum Approval Checker, schau historische Approvals für USDC. Da findest du die approve-Tx, die Wochen oder Monate früher dem Attacker die Berechtigung gegeben hat. Das ist die Ursache — typischerweise von einer Phishing-Site, mit der du irgendwann interagiert hast.

**[Slide 13]** Abschließend — Etherscan ist nicht nur für Ethereum Mainnet. Jede wichtige EVM-Chain hat einen Etherscan-Klon mit identischem Interface. Basescan für Base, Arbiscan für Arbitrum, Optimistic Etherscan für Optimism, Polygonscan für Polygon, BSCScan für BNB Chain. Alle basieren auf der gleichen Codebase — deine Skills übertragen sich eins zu eins. Es gibt auch Alternativen wie Blockscout, Open Source, läuft für viele L2s und Testnets — und Phalcon, Tenderly-basiert, besonders stark für Tx-Simulation und Debugging.

---

## Visual Suggestions

**[Slide 1]** Title slide. Etherscan-Logo zentral, darunter die Formel "Block-Explorer = Chain-Realität ohne App-Interpretation". Hintergrund: leicht abgedunkelter Screenshot der Etherscan-Homepage.

**[Slide 2]** 3-Panel-Layout. Jedes Panel ein Etherscan-URL-Pattern als Titel: "/address/0x...", "/tx/0x...", "/token/0x...". Darunter ein stilisierter Screenshot jeder Seite mit den wichtigsten Elementen hervorgehoben.

**[Slide 3]** **SCREENSHOT SUGGESTION:** Address Page einer aktiven DeFi-Adresse (z.B. eine bekannte Lido-Depositor-Adresse). Alle Tabs sichtbar: Transactions, Internal Txns, ERC-20 Token Txns, ERC-721 Token Txns. Mit roten Pfeilen auf jeden Tab und kurzer Erklärung.

**[Slide 4]** Split-Screen Vergleich. Links: EOA-Adresse mit nur Transactions-Tab visible. Rechts: Contract-Adresse (z.B. Uniswap Router) mit Contract-Tab sichtbar. Roter Kreis um den Contract-Tab rechts, grüner Marker "Contract" dabei.

**[Slide 5]** **SCREENSHOT SUGGESTION:** Zwei Contract-Pages nebeneinander. Links: Uniswap V3 Router (verifiziert, mit grünem Haken und sichtbarem Source Code). Rechts: ein beliebiger unverifizierter Contract (nur Bytecode sichtbar). Deutliche visuelle Kennzeichnung "✓ VERIFIED" vs. "⚠ UNVERIFIED".

**[Slide 6]** **SCREENSHOT SUGGESTION:** Read Contract-Tab eines bekannten Protokolls, z.B. USDC-Contract. `balanceOf(address)` mit Beispiel-Adresse eingegeben und Ergebnis sichtbar. Rote Pfeile auf "Query" Button und auf das Ergebnis.

**[Slide 7]** **SCREENSHOT SUGGESTION:** Write Contract-Tab eines Protokolls mit "Connect to Web3" Button im oberen Bereich und einer `approve(spender, amount)` Funktion ausgeklappt mit leeren Input-Feldern.

**[Slide 8]** **SCREENSHOT SUGGESTION:** Transaction Page einer interessanten DeFi-Transaktion (z.B. ein Uniswap-Swap). Alle Tabs hervorgehoben: Input Data (Decoded), Internal Txns, Logs (mehrere Transfer-Events sichtbar), State. Beschriftungen neben jedem Tab.

**[Slide 9]** **SCREENSHOT SUGGESTION:** Etherscan Token Approval Checker-Seite mit einer Beispiel-Adresse, die mehrere offene Approvals zeigt. Mindestens eine "Unlimited" Approval und der Revoke-Button in einer Zeile rot eingekreist.

**[Slide 10]** Diagramm: eine Contract-Adresse in der Mitte mit Pfeilen nach oben zum "Contract Creator" und zur "Deployment Transaction". Vom Creator weitere Pfeile zu zwei "Other Contracts Deployed" — einer mit grünem Haken (legit), einer mit rotem X (Scam).

**[Slide 11]** **SCREENSHOT SUGGESTION:** Etherscan Address Page-Ausschnitt mit mehreren Name Tags sichtbar nebeneinander. Eine Tx-Liste, wo verschiedene To-Adressen mit ihren Labels angezeigt werden: "Uniswap V3: Router", "Aave: Pool V3", "1inch: Router".

**[Slide 12]** Flowchart: "50K USDC fehlen" → "Token Txns Tab → USDC-Transfer finden" → "Decoded Input Data lesen → transferFrom identifizieren" → "Approval Checker → historisches approve finden" → "Phishing-Site identifiziert". Jeder Schritt mit einem kleinen Etherscan-Screenshot.

**[Slide 13]** Grid-Layout. 6 Tiles: Etherscan, Basescan, Arbiscan, Optimistic Etherscan, Polygonscan, BSCScan. Jedes mit Chain-Logo und URL. Unter dem Grid: "+ Alternative Explorer: Blockscout, Phalcon".

---

## Exercise

**Ziel:** Etherscan-Navigation in drei echten Szenarien trainieren, um flüssige Forensik-Skills aufzubauen.

**Aufgabe — Teil 1: Adress-Profiling**

Wähle eine der folgenden bekannten Adressen und erstelle ein einseitiges Profil:

- Vitalik Buterin: `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`
- Ein Top-Lido-Depositor (finde einen über etherscan.io → Top Accounts → Token Holdings filter → LST)
- Eine bekannte Scam-Creator-Adresse (google: "etherscan scam deployer examples")

Dein Profil sollte beantworten:
- EOA oder Contract?
- ETH-Balance (ETH und USD)
- Top 3 Token-Holdings
- Wann war die erste Transaktion? Wann die letzte?
- Welche 3 Protokolle hat diese Adresse am häufigsten interagiert?

**Aufgabe — Teil 2: Transaction-Autopsy**

Finde eine Transaktion auf einem verifizierten DeFi-Protokoll (z.B. einen Uniswap-Swap — du kannst einen eigenen nehmen oder einen bekannten öffentlichen wählen). Dokumentiere:
- Die decoded Input Data — welche Funktion? Welche Parameter?
- Alle emittierten Events (Logs-Tab) — mindestens Transfer-Events auflisten: Token, From, To, Amount
- Internal Transactions — gab es welche? Was wurde bewegt?
- Die Tx-Fee und der effektive Gas-Price in Gwei

**Aufgabe — Teil 3: Approval Audit**

Öffne `etherscan.io/tokenapprovalchecker`, connecte deine Wallet oder gib eine Adresse ein, die du kennst. Erstelle eine Tabelle:

| Token | Spender | Spender-Label | Approval-Höhe | Relevanz-Status | Revoke-Priorität |
|-------|---------|---------------|---------------|-----------------|------------------|
| ... | ... | ... | ... | Aktiv / Unklar / Veraltet | Hoch / Mittel / Niedrig |

Relevanz-Status: Ist der Spender ein Protokoll, das du aktuell benutzt? Revoke-Priorität: "Hoch" für alles Unklare/Veraltete, "Niedrig" für aktiv genutzte.

**Deliverable:** Ein Markdown-Dokument (3-4 Seiten) mit allen drei Teilen. Screenshots der wichtigsten Etherscan-Views einbetten.

---

## Quiz

### Frage 1

Du untersuchst einen neuen DeFi-Contract und siehst, dass er **nicht verifiziert** ist. Der Entwickler argumentiert, das sei aus "Sicherheitsgründen", damit Angreifer den Code nicht analysieren können. Warum ist dieses Argument in der Praxis unsinnig, und welche drei konkreten Probleme entstehen für dich als potenzieller User?

<details>
<summary>Antwort anzeigen</summary>

**Antwort:** Das Argument ist unsinnig, weil der Bytecode des Contracts **sowieso öffentlich auf der Chain steht** — jeder kann ihn herunterladen und decompilen. Verifikation bedeutet nur, dass der Source Code zusätzlich neben dem Bytecode veröffentlicht wird; es fügt keine Angriffsfläche hinzu. Ein echter Angreifer kann mit Tools wie Dedaub oder Panoramix den Bytecode zu Pseudo-Solidity decompilen, auch ohne Verifikation. "Security through obscurity" funktioniert hier nicht — es schützt nur vor dem durchschnittlichen User, nicht vor echten Attackern.

Die drei konkreten Probleme für dich als User:

1. **Du kannst nicht verifizieren, was der Contract tut.** Du musst dem Entwickler blind vertrauen. Versteckte Funktionen wie `withdrawAll(address)` die nur der Owner aufrufen kann, oder `backdoor()`-Funktionen, die unter bestimmten Bedingungen Funds drainen können, sind unsichtbar.
2. **Du kannst Etherscan's Read/Write Contract-Interface nicht nutzen.** Das heißt, du bist zu 100% abhängig vom offiziellen Frontend des Entwicklers. Wenn das Frontend kompromittiert wird (Domain-Hijack, Clickjacking), hast du keinen Notfall-Zugang.
3. **Audit-Firmen können keinen Audit durchführen.** Ein Audit erfordert Source Code. Ein unverifizierter Contract ist per Definition ungeauditet (oder der Audit ist privat und nicht verifizierbar). Das ist ein direktes Signal für Amateur- oder Bad-Faith-Engineering.
</details>

### Frage 2

Du siehst auf Etherscan eine Transaktion mit Status "Success", aber 0 ETH Value, und die Decoded Input Data zeigt einen Call zu `multicall(bytes[])` mit mehreren encoded Sub-Calls. Wie gehst du vor, um zu verstehen, was wirklich in dieser Transaktion passiert ist?

<details>
<summary>Antwort anzeigen</summary>

**Antwort:** Die `multicall` Funktion bündelt mehrere Funktions-Calls in einer einzigen Transaktion — typisch für Protokolle wie Uniswap V3, wo ein "Swap and add liquidity" oder ein komplexer Multi-Hop-Swap als multicall durchgeführt wird. Um zu verstehen, was wirklich passiert ist, nutze drei Tabs in Kombination:

1. **Logs / Events Tab** — hier siehst du alle emittierten Events. Jeder Swap, jedes Transfer, jedes Mint/Burn erzeugt ein Event. Wenn du zum Beispiel mehrere Transfer-Events siehst (USDC From→Router, WETH Router→User), plus ein Swap-Event auf einem Uniswap-Pool, weißt du: es war ein Token-zu-Token-Swap über mehrere Pools.

2. **Internal Transactions Tab** — hier siehst du alle ETH-Bewegungen innerhalb der Transaktion. Wenn ein Swap WETH unwrapped und dir ETH zurückgibt, ist das eine Internal Tx.

3. **State Tab** — hier siehst du die genauen Balance- und Storage-Änderungen. Du siehst, welche Token-Balances sich bei dir und bei welchen Contracts wie geändert haben.

Die Events sind meist der schnellste Weg zum Verstehen. Wenn du strukturierte Forensik willst, kopiere die Tx-Hash in Tenderly oder Phalcon — diese Tools zeigen dir einen vollständigen Call-Trace mit jedem einzelnen Sub-Call des multicall, was bei komplexen Transaktionen deutlich klarer ist als Etherscan's native Ansicht.
</details>

---

---

# Modul 3 — Umfassender Abschluss-Quiz

Diese 5 Fragen testen dein Verständnis quer über die gesamte Gas-, Token- und Etherscan-Thematik.

### Frage 1 (Gas-Mechanik)

Alice setzt für eine Transaktion eine `maxFeePerGas` von 50 Gwei und eine `maxPriorityFeePerGas` von 2 Gwei. Zum Zeitpunkt ihrer Inklusion ist die aktuelle Base Fee 30 Gwei. Welchen effektiven Gas-Preis zahlt Alice, wohin gehen die Komponenten, und was wäre passiert, wenn die Base Fee 49 Gwei gewesen wäre?

<details>
<summary>Antwort anzeigen</summary>

**Antwort:** 

**Szenario 1 — Base Fee = 30 Gwei:**
- Die tatsächliche Priority Fee (Tip) ist das Minimum aus `maxPriorityFeePerGas` (2 Gwei) und `maxFeePerGas - Base Fee` (50 - 30 = 20 Gwei). Das Minimum ist 2 Gwei.
- Effektiver Gas-Preis = Base Fee + Tip = 30 + 2 = **32 Gwei**.
- **Verteilung:** 30 Gwei (Base Fee) werden **verbrannt** (aus dem Supply entfernt, gemäß EIP-1559). 2 Gwei (Tip) gehen an den Proposer des Blocks. Die übrigen 18 Gwei der `maxFeePerGas` bezahlt Alice nicht — das war nur ihre Obergrenze.

**Szenario 2 — Base Fee = 49 Gwei:**
- Die tatsächliche Priority Fee wird auf `maxFeePerGas - Base Fee` = 50 - 49 = 1 Gwei **gedeckelt**, obwohl Alice 2 Gwei bieten wollte.
- Effektiver Gas-Preis = 49 + 1 = **50 Gwei** (genau ihre maxFeePerGas).
- Die Tx wird ausgeführt, aber der Proposer bekommt nur 1 Gwei Tip statt 2. Alice's maxFee-Budget wird komplett aufgebraucht — kein "Kopfraum" mehr.

**Kritisches Konzept:** `maxFeePerGas` ist die Obergrenze dessen, was Alice zu zahlen bereit ist. Wenn die Base Fee diese Obergrenze überschreitet, wird die Tx nicht inkludiert und bleibt im Mempool hängen. Wallets setzen deshalb typischerweise einen Puffer (z.B. 2x aktuelle Base Fee) als maxFeePerGas.
</details>

### Frage 2 (EIP-4844 und L2-Economics)

Erkläre, warum vor EIP-4844 die Transaktionskosten auf Optimistic Rollups wie Arbitrum typischerweise bei 50-200% der reinen Ausführungs-Kosten lagen, und warum nach EIP-4844 die Data-Availability-Kosten effektiv zu einem Rounding Error werden. Welche strategische Implikation hat das für das DeFi-Ökosystem?

<details>
<summary>Antwort anzeigen</summary>

**Antwort:**

**Vor EIP-4844 — das Calldata-Problem:**
Optimistic Rollups wie Arbitrum müssen alle Transaktions-Daten (Calldata) nach Ethereum L1 posten, um die Data Availability Garantie zu erfüllen. Diese Calldata-Postings verbrauchten regulären L1-Gas (16 Gas pro Nicht-Null-Byte). Bei hoher L1-Gas-Aktivität wurden diese Data-Availability-Kosten dominant: für einen simplen Swap auf Arbitrum konnten 50-90% der Gesamtkosten reine L1-Calldata-Kosten sein, während die eigentliche Ausführung auf L2 fast kostenlos war. Das bedeutete: Arbitrum-Gas-Preise folgten Ethereum-Gas-Preisen sehr eng, und L2s waren nur ein "konstanter Faktor" günstiger, nicht "dramatisch günstiger".

**Nach EIP-4844 — Blobs als separate Data-Availability-Layer:**
EIP-4844 (Dencun Upgrade, März 2024) führte **Blobs** ein — ephemeren Daten-Speicher, der für 18 Tage verfügbar ist und **in einem eigenen Fee-Markt** gepreist wird. Rollups posten ihre Batch-Daten jetzt als Blobs statt als Calldata. Die Blob-Base-Fee wird separat berechnet, beginnt praktisch bei Null, wenn Blobs unbenutzt sind, und ist — solange die Blob-Nachfrage unter dem Target von 3 Blobs/Block liegt — massiv billiger als Calldata.

**Effekt:** L2-Transaktionen kosten seit Dencun typischerweise 80-95% weniger als vorher. Ein Swap auf Base, der vor Dencun $0.50 gekostet hat, kostet jetzt oft unter $0.05. Die Data-Availability-Komponente wird zu einem Rounding Error im Vergleich zur L2-Execution-Komponente.

**Strategische Implikation für DeFi:**
- **Massenmärkte werden möglich.** Micropayments, On-Chain-Games, NFT-Minting-Volumen, hochfrequentes Trading — alles was bei L1-Gas-Preisen wirtschaftlich unmöglich war, ist auf L2s jetzt feasible.
- **TVL und Volumen migrieren strukturell auf L2.** Base, Arbitrum und Optimism sehen seit Dencun explosives TVL- und Tx-Volumen-Wachstum.
- **L1 wird zunehmend zur "Settlement Layer"** für hohe Beträge, Institutional Flows und Security-kritische Operationen (z.B. Multisig-Settlements). Alltags-DeFi passiert auf L2.
- **L1-Gebühren-Einnahmen für Validators sinken** — ein offener Teil der Ethereum-Economics-Diskussion. Was verdient L1 noch, wenn alle Aktivität auf L2 migriert?
</details>

### Frage 3 (ERC-20 Mechanik)

Ein User hat einen Uniswap V2-Router `approve(router, type(uint256).max)` für seinen USDC gemacht. Drei Monate später hört er, dass Uniswap einen kritischen Bug im Router-Contract gefunden hat, der theoretisch ausgenutzt werden könnte. Er macht daraufhin `approve(router, 0)`. Warum ist das der richtige Schritt, und welche 3 **weiteren** Approvals könnten im gleichen Zug geprüft werden?

<details>
<summary>Antwort anzeigen</summary>

**Antwort:** 

**Warum `approve(router, 0)` der richtige Schritt ist:**
Die unendliche Approval (`type(uint256).max`) autorisiert den Uniswap-Router-Contract, **jederzeit beliebige Mengen USDC** aus dem Wallet des Users abzuziehen via `transferFrom(user, destination, amount)`. Solange diese Approval aktiv ist, steht das Wallet nur so sicher wie der Router-Contract selbst. Wenn ein Bug im Router existiert, der es einem Attacker erlaubt, den Router als Proxy zu missbrauchen (z.B. via einer manipulierten `swapExactTokensForTokens`-Variante), dann kann der Attacker via des kompromittierten Routers auf die vollen USDC-Balances aller User mit aktiver Approval zugreifen. 

`approve(router, 0)` setzt die Allowance auf Null zurück und eliminiert diese Angriffsfläche. Kostet einen Gas-Transaktion (oft nur wenige Cents auf L2), rettet aber potenziell das gesamte USDC-Vermögen. Wenn der User später wieder Uniswap benutzen will, kann er eine neue, präzisere Approval setzen — idealerweise nur die genaue Menge, die er swappen will.

**3 weitere Approvals, die im gleichen Zug geprüft werden sollten:**

1. **Uniswap V3 Router Approval für USDC.** Wenn der User auch Uniswap V3 benutzt hat, hat er wahrscheinlich dort ebenfalls eine separate Approval — V2 und V3 sind unterschiedliche Router-Contracts. Der bei V2 gefundene Bug könnte analog in V3 existieren, und selbst wenn nicht — das Prinzip "keine unendliche Approval für ein Protokoll mit bekannten Bug-Sorgen" gilt.

2. **Approvals für andere Stablecoins bei gleichen Routern.** Hat der User auch USDT oder DAI bei den gleichen Routern approved? Die Vulnerability kann typischerweise ALLE approved Tokens betreffen, nicht nur USDC. Die gesamte Stablecoin-Position sollte protected werden.

3. **Approvals für andere High-Volume-Protokolle die den User kaum mehr nutzt.** Aave, Compound, SushiSwap, 1inch — wenn der User diese mal benutzt hat, aber aktuell nicht aktiv ist, und offene Unlimited-Approvals existieren, ist der Systemrisk-Exposure ähnlich. Eine generelle "Approval Hygiene" Session (monatliches Review via Etherscan Token Approval Checker oder revoke.cash) ist sinnvoll.

**Best Practice:** Nach jeder intensiven DeFi-Session die offenen Approvals reviewen und alles revoken, was nicht aktiv benötigt wird. Bei "Vault"-Wallets (Cold Storage): niemals Approvals setzen. Approvals nur auf einem separaten "DeFi"-Wallet mit begrenzter Balance.
</details>

### Frage 4 (NFT-Standard-Unterschiede)

Ein Game-Studio plant ein Blockchain-basiertes RPG-Game mit folgenden In-Game-Assets: (a) unique Character-Avatare (je Spieler ein unverwechselbarer Charakter), (b) Ausrüstungs-Items mit mehreren Kopien (z.B. 10.000 identische "Iron Swords", aber auch 50 "Legendary Dragon Swords"), (c) Crafting-Materialien wie "Iron Ore" (fungible, Spieler halten große Mengen). Welchen Token-Standard würdest du für welche Kategorie wählen und warum?

<details>
<summary>Antwort anzeigen</summary>

**Antwort:**

**(a) Character-Avatare → ERC-721**

Weil jeder Avatar unique ist — ein unverwechselbarer Charakter mit eigener ID, eigenen Stats, eigenem Look — ist ERC-721 die passende Wahl. Der Standard ist speziell für Unique Items designed: jede `tokenId` existiert genau einmal, hat individuelle Metadaten, und kann nicht versehentlich mit einem anderen Charakter "vermischt" werden. Für Display-Zwecke (OpenSea, Rarible, In-Game-Interface) sind ERC-721-NFTs der Industrie-Standard mit bester Tool-Support. Gas-Kosten pro Character sind höher als bei ERC-1155, aber da Character nur einmal pro Spieler gemint werden, fällt das kaum ins Gewicht.

**(b) Ausrüstungs-Items → ERC-1155**

Hier ist ERC-1155 klar überlegen, aus mehreren Gründen:

- **Semi-Fungibilität:** 10.000 identische "Iron Swords" sind untereinander fungibel und werden als `balanceOf(player, ironSwordId) = 3` gehalten, nicht als drei separate NFTs mit drei verschiedenen tokenIds. Das spart massiv Storage-Kosten.
- **Multiple Token-Typen in einem Contract:** "Iron Sword" (id 1), "Legendary Dragon Sword" (id 2), "Wooden Shield" (id 3), "Magic Staff" (id 4) — alle leben im gleichen Contract. Mit ERC-721 bräuchte jeder Item-Typ einen eigenen Contract (teuer zu deployen).
- **Batch-Operationen:** Wenn ein Spieler einen Loot-Drop bekommt (5 Iron Swords + 3 Shields + 2 Potions), kann das Game das als **einen** `safeBatchTransferFrom`-Call machen. Mit ERC-721 wären es 10 separate Transfers.
- **Mixed Fungibility:** Auch die 50 "Legendary Dragon Swords" können als ERC-1155 mit `balanceOf(player, legendarySwordId) = 1` pro Spieler gehalten werden — semi-fungible Items, wo jeder Spieler maximal eine Kopie halten soll (Uniqueness via Game-Logik, nicht via Standard).

**(c) Crafting-Materialien → ERC-1155 (oder ERC-20)**

Zwei Optionen:
- **ERC-1155:** wenn die Crafting-Materialien im gleichen Contract wie die Ausrüstung leben sollen (für Effizienz und Batch-Transfers), ist ERC-1155 die Wahl. "Iron Ore" ist einfach `id 1000`, und Spieler halten `balanceOf(player, ironOre) = 543`.
- **ERC-20:** wenn die Crafting-Materialien **handelbar auf Uniswap** sein sollen oder als In-Game-Currency fungieren, ist ERC-20 besser. Uniswap und die meisten DEXes unterstützen nur ERC-20. Ein ERC-1155 Token Type kann nicht auf Uniswap V2 getradet werden.

**Meta-Antwort:** Für ein Game mit großem Token-Ökosystem ist ERC-1155 die Hauptwahl für In-Game-Items, ERC-721 für Charactere, und ERC-20 für jede Token-Kategorie, die auf externen DEXes handelbar sein soll. Die drei Standards ergänzen sich, sie konkurrieren nicht.
</details>

### Frage 5 (Forensik-Integration)

Du findest in deiner Wallet-Historie eine Transaktion mit der Method "Contract Interaction" und siehst, dass danach 100 ETH aus deinem Wallet weg sind. Die From-Adresse der Tx ist jedoch **nicht** deine Wallet, sondern eine fremde Adresse. Beschreibe Schritt für Schritt, wie du mit Etherscan herausfindest, was passiert ist — und was das wahrscheinlichste Angriffs-Szenario war.

<details>
<summary>Antwort anzeigen</summary>

**Antwort:**

**Schritt 1 — Transaktion vollständig aufschlüsseln**

Öffne die Transaction Page. Wichtige Werte:
- From: fremde Adresse (Attacker)
- To: wahrscheinlich ein Contract (nicht deine Adresse direkt)
- Value: vermutlich 0 ETH (der ETH-Abfluss aus deinem Wallet ist nicht der Haupt-Tx-Value, sondern passiert via Contract-Call)

Öffne die **Decoded Input Data**. Suche nach dem Function-Namen. Plausible Kandidaten:
- `execTransaction(...)` → Safe-Multisig-Call (wenn dein Wallet ein Safe ist)
- `transferFrom(yourAddress, attackerAddress, amount)` → klassische approve/transferFrom-Exploit
- `multicall(bytes[])` → mehrere sub-calls in einer Tx

**Schritt 2 — Logs und Internal Transactions prüfen**

Öffne den **Internal Txns Tab**. Hier siehst du ETH-Bewegungen. Du findest wahrscheinlich:
- Eine Internal Tx, die 100 ETH aus deiner Adresse an eine Attacker-Adresse transferiert

Öffne den **Logs Tab**. Hier siehst du Events. Suche nach:
- `Withdrawal(user, amount)` → eventuell ein WETH-Unwrap
- `Transfer(from, to, value)` → für etwaige Token-Bewegungen

**Schritt 3 — Der kritische Hinweis: Wie hatte der Attacker die Berechtigung?**

Der ETH-Abfluss aus deiner EOA erfordert normalerweise eine Signatur. Mögliche Szenarien:

**Szenario A — WETH-Approval-Exploit:** Du hattest irgendwann mal WETH (Wrapped ETH). WETH ist ein ERC-20. Du hast einer fremden Adresse (vermutlich einem Drainer-Contract) eine `approve`-Berechtigung für WETH gegeben — via Phishing. Der Attacker hat `transferFrom` gemacht und danach `withdraw()` für Unwrapping. Überprüfe: Gehe zu Etherscan Token Approval Checker, schaue historische WETH-Approvals. Du findest die approve-Tx zu einer Attacker-Adresse.

**Szenario B — Signature-based Exploit (permit2):** Du hast eine off-chain Signatur auf einer Phishing-Site signiert, die einem Drainer via Permit2 Autorisierung gegeben hat. Die Signatur war wochenlang gültig und wurde jetzt eingelöst. Das ist schwieriger auf Etherscan zu tracen, weil es keine entsprechende on-chain Tx von dir gibt (die Signatur war off-chain). Check Uniswap Permit2-Contract-Interaktionen: `0x000000000022D473030F116dDEE9F6B43aC78BA3`. Dort könntest du `permitTransferFrom`-Events mit deiner Adresse finden.

**Szenario C — Wallet komplett kompromittiert (Private Key Leak):** Falls die From-Adresse eine andere als deine ist UND zusätzlich weitere Transaktionen von deiner eigenen EOA stattfinden, wo dein Wallet Transaktionen signiert (ohne dein Wissen), wurde dein Private Key geleakt. Das ist das schlimmste Szenario — du solltest dann sofort ALLE verbliebenen Assets aus dem Wallet in ein neues Hardware-Wallet transferieren, bevor der Attacker weiteres drainen kann.

**Wahrscheinlichstes Szenario:** Angesichts der Daten (fremde From-Adresse, "Contract Interaction" Method, 100 ETH verschwunden) ist **Szenario A (WETH-Approval)** oder **Szenario B (Permit2-Signatur)** am wahrscheinlichsten. Private-Key-Leaks sind selten; Approval- oder Signature-Exploits sind die häufigste Ursache von großen ETH/Token-Verlusten.

**Sofort-Aktionen:**
1. Alle Approvals und Permit2-Autorisierungen für das betroffene Wallet revoken
2. Alle verbliebenen Assets in ein neues, sauberes Wallet transferieren
3. Phishing-Site oder verdächtige Signatur-Interaktion identifizieren (Browser-Historie, Discord-Links, etc.)
4. Betroffene Community warnen
5. Chain-Tracing der gestohlenen ETH via Arkham oder Breadcrumbs — oft landen gestohlene Funds in Tornado Cash oder Cross-Chain-Bridges
</details>

---

# Modul 3 — Zusammenfassung

Modul 3 hat dir die Mechanik der Assets und Kosten auf Ethereum gegeben — und das Werkzeug, alles davon direkt on-chain zu inspizieren.

**Was du jetzt verstehst:**

Gas ist nicht willkürlich. Jede Operation der EVM hat einen festgeschriebenen Gas-Preis (SLOAD 2100, SSTORE 20000, etc.), und jede Transaktion hat ein transparentes Gas-Budget. Der `Gas Limit` ist der Airbag: reicht er nicht, revertiert die Tx aber die Gas wird bezahlt. Der `Gas Price` entscheidet die Priorität.

EIP-1559 hat Ethereum's Fee-Markt fundamental umgebaut. Die Base Fee wird algorithmisch angepasst, um 15 Millionen Gas pro Block zu targeten, und **wird verbrannt**. Der Priority Fee geht an den Proposer. Bei hoher Aktivität wird ETH netto deflationär — ein struktureller Unterschied zu praktisch jedem anderen Monetary Asset.

EIP-4844 (Dencun, März 2024) hat Blobs eingeführt und damit die L2-Ökonomie neu gepreist. Data Availability kostet jetzt einen Bruchteil, L2-Transaktionen sind 80-95% billiger als vorher. Das ist der Hebel, mit dem DeFi-Nutzung strukturell auf L2s migriert.

ERC-20 ist der universelle Fungible-Token-Standard. Die zentrale Mechanik — approve/transferFrom — ist die Quelle der meisten Wallet-Drains. Unlimited Approvals sind Standard aber gefährlich. Monthly Review via Etherscan Token Approval Checker oder revoke.cash ist die wichtigste Sicherheits-Gewohnheit im DeFi.

ERC-721 (unique NFTs) und ERC-1155 (semi-fungible, batch-fähig) erweitern das Token-Universum. 1155 ist der moderne Standard für Game-Assets und Collections mit mehreren Typen. Das `setApprovalForAll`-Pattern ist die NFT-Analogie zur ERC-20-Unlimited-Approval und ebenso mit Vorsicht zu behandeln.

Etherscan ist der Block-Explorer — die Oberfläche zur Chain-Realität. Die drei Seitentypen (Address, Transaction, Token) plus die Approval-Checker-Seite sind das komplette Forensik-Kit. Read Contract und Write Contract auf verifizierten Contracts machen dich unabhängig von Protokoll-Frontends. Die Fähigkeit, eine Transaktion auseinanderzunehmen — Decoded Input Data, Logs, Internal Txns, State — ist die härteste Einzel-Skill im Advanced DeFi.

**Was du jetzt machen kannst:**

- Gas-Preise kontextualisieren und für jede Transaktion eine informierte Preis-Entscheidung treffen
- Mit L2s vertrauensvoll operieren und verstehen, warum sie billiger sind
- Mit jedem ERC-20, ERC-721 oder ERC-1155 Contract interagieren und seine Mechanik lesen
- Offene Approvals systematisch auditieren und revoken
- Eine beliebige Adresse oder Transaktion auf Etherscan untersuchen und Aktivität forensisch rekonstruieren
- Read Contract und Write Contract als Notfall-Zugang zu Protokollen nutzen

**Was als nächstes kommt — Modul 4: DEX-Mechanik und Automated Market Makers**

In Modul 4 steigen wir tief in die DEX-Mechanik ein: die Mathematik hinter Uniswap V2's konstanter Produkt-Formel (x*y=k), Uniswap V3's concentrated liquidity, Slippage und Price Impact, Impermanent Loss Mathematik, MEV als strukturelles Problem, und DEX-Aggregatoren wie 1inch, CoWSwap und Matcha als User-Protection-Layer. Das ist das Modul, das erklärt, warum Liquidität das fundamentale DeFi-Primitive ist — und wie Swaps **eigentlich** funktionieren.

---

