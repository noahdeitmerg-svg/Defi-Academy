# Modul 9 — Yield-Strategien

**Zielgruppe:** Einsteiger bis Fortgeschrittene
**Geschätzte Dauer:** 90–110 Minuten
**Voraussetzungen:** Module 1–8 abgeschlossen

---

## Modul-Überblick

In den Modulen 4–8 hast du die einzelnen DeFi-Primitive verstanden: DEXs, Liquidity Pools, Lending, Sicherheiten, Stablecoins. Dieses Modul integriert diese Bausteine in **Yield-Strategien** — strukturierte Wege, wie konservative DeFi-Nutzer systematisch Ertrag erwirtschaften.

Der Fokus dieses Moduls liegt auf Strategien, die für das 7–8%-Jahresziel realistisch sind. Das bedeutet: keine Ponzi-Tokenomics, keine 100%-APY-Farming-Positionen, keine Rewards-getriebenen Strategien, die beim Programm-Ende kollabieren. Stattdessen: Staking-Mechanismen mit echtem protokollarem Ertrag, yield-tragende Stablecoin-Strategien, strukturierte Yield-Produkte wie Pendle, und Yield-Aggregatoren wie Yearn.

Leverage-Loops — eine eigene, potentere aber auch riskantere Klasse — werden in **Modul 10** separat behandelt. Dieses Modul fokussiert auf **unverhebelte** Yield-Strategien.

**Lektionen:**
1. Wie Ethereum Staking funktioniert
2. Liquid Staking: Lido, Rocket Pool, Frax
3. Restaking und LRTs: EigenLayer
4. Pendle: Yield-Handel und Fixed Yield
5. Yield-Aggregatoren: Yearn, Convex, Morpho Vaults
6. Konservative Yield-Strategien für 7–8% Ziel

---

## Lektion 9.1 — Wie Ethereum Staking funktioniert

### Learning Objectives

After completing this lesson the learner will be able to:
- Die Grundmechanik von Proof-of-Stake auf Ethereum erklären
- Validator-Pflichten, Belohnungen und Slashing-Risiken benennen
- Die Entscheidung zwischen Solo-Staking und Delegation rational treffen

### Explanation

Seit dem Merge im September 2022 läuft Ethereum auf **Proof-of-Stake (PoS)**. Statt energieintensivem Mining sichern Validatoren das Netzwerk, indem sie ETH als Sicherheit hinterlegen ("staken"). Für diese Arbeit erhalten sie kontinuierlich ETH als Belohnung — das ist der native **Staking-Yield**.

**Die Grundmechanik**

Ein Ethereum-Validator benötigt **32 ETH** als Stake. Mit diesen 32 ETH nimmt er am Konsens teil:

1. **Attestations:** Der Validator stimmt über die Gültigkeit von Blöcken ab. Das ist die Haupt-Arbeit, passiert alle ~6,4 Minuten (eine Epoch).
2. **Block Proposals:** Gelegentlich (im Durchschnitt alle paar Monate bei einem Einzelvalidator) wird der Validator ausgewählt, einen neuen Block vorzuschlagen. Das bringt zusätzliche Rewards.
3. **Sync Committees:** Spezielle kurzzeitige Aufgaben, die Light-Clients unterstützen.

Für korrekte Erfüllung dieser Aufgaben gibt es Rewards. Für Fehlverhalten oder Offline-Sein gibt es Strafen.

**Wie die Staking-Rewards entstehen**

Die Rewards kommen aus zwei Quellen:

**Quelle 1: Consensus-Layer-Rewards (CL Rewards)**
Neu geprägte ETH durch das Protokoll selbst. Die Menge hängt von der Gesamt-Anzahl der Validatoren ab. Bei aktuell ~1 Million Validatoren beträgt der CL-Reward etwa 2,5–3% APR.

**Quelle 2: Execution-Layer-Rewards (EL Rewards)**
Priority Fees (Tips) von Transaktionen im vorgeschlagenen Block, plus MEV-Einkommen. Diese Rewards sind variabel, je nach Netzwerk-Aktivität und MEV-Umfang. Beitrag: 0,5–1,5% APR.

**Gesamt-Staking-Yield:** Typisch 3–5% APR, abhängig von Netzwerk-Bedingungen.

**Slashing-Risiko**

Validatoren, die das Protokoll schwer verletzen, werden **slashed** — ein Teil ihres Stakes wird permanent verloren. Schwere Slashing-Offences:

1. **Double Attestation:** Über zwei verschiedene Blöcke in derselben Epoch attestieren (typisch durch falsche Redundanz-Setups)
2. **Double Proposal:** Zwei verschiedene Blöcke für dieselbe Slot vorschlagen
3. **Surround Vote:** Eine ältere Attestation, die eine neuere umschließt

Die Strafe: sofort ~1 ETH verloren plus ein größerer Teil während der verbleibenden Exit-Periode, insgesamt historisch 1–2 ETH. Bei korreliertem Slashing (mehrere Validatoren slashed gleichzeitig) können die Strafen deutlich höher sein — bis zu 16 ETH pro Validator (der Hälfte-Slashing).

**Häufiger ist: Inactivity Penalty**
Wenn ein Validator offline ist, verliert er kontinuierlich kleine Beträge. Nicht dramatisch bei kurzen Ausfällen, aber relevant bei längerer Downtime.

**Withdrawal und Exit-Queue**

Seit dem Shanghai-Upgrade (April 2023) können Validatoren ihren Stake auszahlen. Der Prozess:

1. **Voluntary Exit:** Validator signalisiert Exit
2. **Exit-Queue:** Warteliste, begrenzt auf ~0,25% der aktiven Validatoren pro Epoch
3. **Withdrawal Sweep:** Nach Exit wird der Stake in das eigene Konto verschoben

**Wichtig:** Die Exit-Queue ist begrenzt. In Krisenzeiten mit vielen Exits kann die Wartezeit Wochen betragen. Das ist ein reales Liquiditäts-Risiko für Solo-Staker.

**Solo-Staking vs. Delegation**

**Option A: Solo-Staking (volle Kontrolle)**
- Du betreibst deinen eigenen Validator-Node
- 32 ETH Mindest-Stake erforderlich (~96.000 USD bei 3.000 USD/ETH)
- Technische Expertise nötig (Linux-Server, Ethereum-Client, Monitoring)
- Volle Staking-Rewards (3–5% APR)
- Volle Slashing-Verantwortung

**Option B: Staking-as-a-Service (gehostetes Staking)**
- Externe Anbieter wie **Allnodes**, **Stakefish**, **Figment** betreiben den Node für dich
- Du hältst die Withdrawal-Keys, aber der Anbieter operiert den Validator
- Typisch 10–15% der Rewards als Service-Gebühr
- Trust-Anforderung an den Anbieter (Uptime, Sicherheit)
- Slashing-Risiko liegt meist beim Betreiber (prüfen!)

**Option C: Liquid Staking (Delegation mit Token)**
- Du hinterlegst ETH bei einem Protokoll wie **Lido** oder **Rocket Pool**
- Erhältst einen **Liquid Staking Token (LST)** wie stETH oder rETH zurück
- Keine 32-ETH-Hürde, beliebige Beträge möglich
- Typisch 5–10% der Rewards als Protokoll-Gebühr
- LST ist in DeFi weiterverwendbar
- **Kein eigenes Slashing-Risiko** — das Protokoll trägt es (und verteilt Verluste proportional)

**Liquid Staking ist die dominante Wahl für konservative DeFi-Nutzer.** Behandeln wir in Lektion 9.2 im Detail.

**Realistische Staking-Rendite-Erwartungen**

Die netto Staking-Rendite hängt vom Weg ab:

| Methode | Brutto-APR | Gebühr | Netto-APR |
|---|---|---|---|
| Solo-Staking | 3,5–5% | 0% | 3,5–5% |
| Staking-as-a-Service | 3,5–5% | 10–15% | 3,0–4,5% |
| Lido stETH | 3,5–5% | 10% | 3,2–4,5% |
| Rocket Pool rETH | 3,5–5% | ~14% (variiert) | 3,0–4,3% |
| CEX Staking | 3,5–5% | 15–30% | 2,5–4% |

Für konservative Nutzer ist Lido oder Rocket Pool typisch die sinnvollste Balance aus Rendite, Komplexität und Diversifikation.

### Slide Summary

**[Slide 1] — Titel**
Wie Ethereum Staking funktioniert

**[Slide 2] — Grundmechanik PoS**
Validator hinterlegt 32 ETH.
Nimmt am Konsens teil (Attestations, Proposals).
Erhält ETH als Reward.

**[Slide 3] — Zwei Reward-Quellen**
1. Consensus-Layer (neu gemintet): 2,5–3% APR
2. Execution-Layer (Fees + MEV): 0,5–1,5% APR
Gesamt: 3–5% APR

**[Slide 4] — Slashing-Risiko**
Schwere Verletzungen: 1–2 ETH verloren (bis 16 ETH bei korreliert)
Inactivity Penalty: langsamer Verlust bei Offline-Sein

**[Slide 5] — Exit-Queue**
Begrenzt auf ~0,25% pro Epoch
In Krisenzeiten Wochen Wartezeit möglich

**[Slide 6] — Staking-Optionen**
A: Solo-Staking (32 ETH, volle Kontrolle)
B: Staking-as-a-Service (gehostet)
C: Liquid Staking (Lido, Rocket Pool) — dominante Wahl

**[Slide 7] — Netto-Rendite-Vergleich**
Solo: 3,5–5%
Liquid Staking: 3,2–4,5%
CEX Staking: 2,5–4%

### Voice Narration Script

**[Slide 1]** Modul 9 behandelt Yield-Strategien. Wir starten mit der Basis: Ethereum Staking. Seit dem Merge im September 2022 läuft Ethereum auf Proof-of-Stake. Staking ist damit neben Stablecoin-Supply die zweite große Säule konservativer DeFi-Yield-Strategien.

**[Slide 2]** Die Grundmechanik. Ein Validator hinterlegt 32 ETH als Stake. Damit nimmt er am Konsens teil. Die Hauptarbeit sind Attestations — Abstimmungen über die Gültigkeit von Blöcken, alle 6,4 Minuten eine Runde. Gelegentlich wird der Validator ausgewählt, selbst einen Block vorzuschlagen. Für korrekte Arbeit gibt es Rewards, für Fehlverhalten Strafen.

**[Slide 3]** Zwei Reward-Quellen. Consensus-Layer-Rewards: neu geprägte ETH durch das Protokoll, etwa 2,5 bis 3 Prozent APR. Execution-Layer-Rewards: Priority Fees und MEV-Einkommen aus vorgeschlagenen Blöcken, 0,5 bis 1,5 Prozent APR. Zusammen typisch 3 bis 5 Prozent Gesamt-Staking-Yield.

**[Slide 4]** Das Slashing-Risiko. Validatoren, die das Protokoll schwer verletzen, verlieren einen Teil ihres Stakes. Historisch bei Einzelfällen 1 bis 2 ETH. Bei korreliertem Slashing — wenn viele Validatoren gleichzeitig slashed werden — können die Strafen bis zu 16 ETH pro Validator betragen. Häufiger als Slashing ist die Inactivity Penalty bei Offline-Sein, die langsam Stake reduziert.

**[Slide 5]** Die Exit-Queue. Seit dem Shanghai-Upgrade können Validatoren ihren Stake zurückziehen. Aber die Queue ist begrenzt auf etwa 0,25 Prozent der aktiven Validatoren pro Epoch. Das reicht im Normalbetrieb, aber in Krisenzeiten mit vielen Exits können Wartezeiten von Wochen entstehen. Ein reales Liquiditäts-Risiko für Solo-Staker.

**[Slide 6]** Drei Staking-Optionen. Solo-Staking: 32 ETH, eigene Infrastruktur, volle Rendite, volle Verantwortung. Staking-as-a-Service: gehostetes Staking bei Anbietern wie Allnodes oder Figment, moderate Gebühren. Liquid Staking: Delegation an Protokolle wie Lido oder Rocket Pool, erhältst einen Liquid-Staking-Token zurück. Das ist die dominante Wahl für konservative DeFi-Nutzer — keine Mindest-Hürde, LST in DeFi weiter nutzbar, kein eigenes Slashing-Risiko.

**[Slide 7]** Netto-Rendite-Vergleich nach Methode. Solo-Staking 3,5 bis 5 Prozent. Liquid Staking über Lido oder Rocket Pool 3,2 bis 4,5 Prozent nach Protokoll-Gebühr. Staking-as-a-Service ähnlich. CEX-Staking auf Coinbase oder Binance typisch 2,5 bis 4 Prozent wegen höherer Gebühren. Für konservative Nutzer ist Liquid Staking meist die sinnvollste Balance aus Rendite, Komplexität und Diversifikation.

### Visual Suggestions

**[Slide 1]** Titelfolie.

**[Slide 2]** Diagramm: ETH-Stake → Validator → Konsens-Teilnahme → Rewards.

**[Slide 3]** **SCREENSHOT SUGGESTION:** beaconcha.in Validator-Dashboard mit CL- und EL-Rewards-Breakdown.

**[Slide 4]** Slashing-Szenarien-Tabelle mit Strafhöhen.

**[Slide 5]** Exit-Queue-Visualisierung mit Wartezeit-Diagramm.

**[Slide 6]** Drei-Optionen-Vergleich mit Icon für jede.

**[Slide 7]** Tabellarische Netto-Rendite-Übersicht.

### Exercise

**Aufgabe: Validator-Daten analysieren**

1. Öffne beaconcha.in.
2. Untersuche:
   - Aktuelle Gesamt-Anzahl der Validatoren
   - Aktuelle Total Staked ETH
   - Aktuelle durchschnittliche Staking-Rendite (APR)
   - Aktuelle Länge der Exit-Queue (falls sichtbar)
3. Klicke auf einen zufälligen Validator und untersuche:
   - Wie viele Attestations wurden bisher abgegeben
   - Wie viele davon korrekt
   - Wurde er jemals slashed
4. Überlege: Welche Informationen helfen dir, die Staking-Gesundheit einzuschätzen?

**Deliverable:** Datensammlung + kurze Analyse (4–6 Sätze): Was sagen die aktuellen Zahlen über den Zustand des Ethereum-Staking-Netzwerks aus?

### Quiz

**Frage 1:** Warum ist Liquid Staking für die meisten Retail-Nutzer attraktiver als Solo-Staking, selbst wenn Solo-Staking etwas höhere Nettorendite bietet?

<details>
<summary>Antwort anzeigen</summary>

Mehrere Gründe. Erstens: Kapital-Hürde. Solo-Staking benötigt 32 ETH Mindest-Stake — bei 3.000 USD pro ETH sind das 96.000 USD. Liquid Staking hat keine Mindest-Hürde; du kannst mit 0,1 ETH einsteigen. Zweitens: technische Expertise. Solo-Staking erfordert Linux-Server-Administration, Ethereum-Client-Betrieb, Monitoring, Backup-Strategien und Security-Setups. Das ist kein triviales Nebenprojekt. Liquid Staking: Transaktion signieren, fertig. Drittens: Liquidität. Ein Solo-Validator ist gebunden — Exit benötigt Queue-Zeit (Wochen in Krisen). Liquid-Staking-Tokens wie stETH können jederzeit auf DEXs getauscht werden. Viertens: Weiterverwendung. LSTs können in DeFi als Collateral, in LPs, in Yield-Protokolle eingesetzt werden — das Solo-gestakte ETH nicht. Fünftens: Slashing-Diversifikation. Solo-Staker trägt sein eigenes volles Slashing-Risiko. Liquid-Staking-Protokolle verteilen das Risiko über hunderte oder tausende Validatoren — ein einzelnes Slashing-Event hat minimalen Einfluss. Für die meisten Retail-Nutzer überwiegen diese Vorteile den 0,5–1 Prozentpunkte Rendite-Unterschied deutlich.
</details>

**Frage 2:** Was ist der Unterschied zwischen Slashing und Inactivity Penalty, und warum sind beide unterschiedlich gefährlich?

<details>
<summary>Antwort anzeigen</summary>

Slashing ist eine harte Strafe für absichtliche oder grobe Protokoll-Verletzungen: Double Attestation, Double Proposal, Surround Vote. Die Strafe ist sofort wirksam und bedeutet dauerhaften Verlust von 1 ETH oder mehr, bei korrelierten Events bis zu 16 ETH pro Validator. Slashing führt automatisch zum Exit des Validators. Inactivity Penalty ist eine weiche Strafe für Offline-Sein oder fehlende Attestations. Der Validator verliert kontinuierlich kleine Beträge, solange er offline ist. Nach Wiederherstellung der Verbindung stoppt die Strafe. Die Gefahr: Slashing ist selten, aber katastrophal wenn es passiert (meist durch schlechte Setup-Entscheidungen wie doppelte Validator-Instanzen). Inactivity Penalty ist häufiger, aber meist nur einstellig USD-Verlust pro Tag. Problematisch wird Inactivity erst bei sehr langem Offline-Sein oder wenn die Gesamt-Chain während einer "Inactivity Leak"-Phase ist (wenn mehr als ein Drittel der Validatoren offline sind, verstärken sich die Strafen dramatisch, um Chain-Finalität wiederherzustellen). Für Solo-Staker ist Inactivity Prevention durch redundante Setups (aber NICHT doppelte Validator — das wäre Slashing-trigger) wichtig. Liquid-Staking-Nutzer sind von beiden praktisch unbetroffen, weil die Protokolle professionelle Operatoren mit robusten Setups einsetzen.
</details>

---

## Lektion 9.2 — Liquid Staking: Lido, Rocket Pool, Frax

### Learning Objectives

After completing this lesson the learner will be able to:
- Die drei großen Liquid-Staking-Protokolle nach Design und Risiko unterscheiden
- stETH, rETH und frxETH in ihren Mechanismen einordnen
- Eine Liquid-Staking-Allokation für ein konservatives Portfolio konstruieren

### Explanation

Liquid Staking hat sich zum dominanten Weg entwickelt, wie die meisten ETH-Halter stake. Über 30% aller gestakten ETH liegen in Liquid-Staking-Protokollen — mit **Lido** als mit Abstand größtem Anbieter.

Die Idee ist elegant: Du hinterlegst ETH, das Protokoll aggregiert viele solche Einzahlungen zu 32-ETH-Validatoren und operiert diese über vertrauenswürdige Node-Operatoren. Im Gegenzug erhältst du einen **Liquid Staking Token (LST)**, der deine Staking-Position repräsentiert und in DeFi weiterverwendbar ist.

Aber: LSTs sind nicht alle gleich. Das Design-Detail entscheidet über Risiko, Liquidität und Effizienz.

**Lido (stETH) — Der Marktführer**

**Design:**
- Du zahlst ETH ein → bekommst **stETH** im Verhältnis 1:1
- stETH ist ein **Rebase-Token**: dein Balance wächst automatisch jeden Tag durch Staking-Rewards
- Alternative: **wstETH** (wrapped stETH) — der Kurs zum ETH wächst statt der Balance, besser für DeFi-Integration

**Node-Operatoren:**
- ~40+ professionelle Operatoren (alle vorab genehmigt)
- Lido-Governance (LDO-Token-Holder) entscheidet über Operator-Zulassung
- Kritikpunkt: Lido hat dominante Marktstellung (~30% aller gestakten ETH), was zentralisations-Bedenken aufwirft

**Gebühr:** 10% der Rewards (an Operatoren und Lido-Protokoll)

**Netto-APR:** ~3,2–4,5% (abhängig von Gesamt-Staking-Rendite)

**Stärken:**
- Größte Liquidität aller LSTs
- Tiefste DeFi-Integration (fast alle Lending-Protokolle akzeptieren wstETH als Collateral)
- Beste Exit-Liquidität auf Curve und Uniswap
- Langjährige Track-Record seit Dezember 2020

**Schwächen:**
- Hohe Marktkonzentration (Zentralisierungsbedenken)
- Governance durch LDO-Token-Halter (keine reine Community-Entscheidung)
- Historischer stETH-Depeg (Juni 2022, kurzzeitig auf 0,94 ETH gefallen)

**Rocket Pool (rETH) — Der dezentralere Konkurrent**

**Design:**
- Du zahlst ETH ein → bekommst **rETH** im aktuellen Exchange-Rate-Verhältnis
- rETH ist ein **Reward-Token**: der Wechselkurs rETH/ETH wächst über Zeit, statt Balance-Anpassungen
- Analog zu Aaves aTokens

**Node-Operatoren:**
- **Permissionless:** Jeder kann Node-Operator werden (mit 8 oder 16 ETH Mindest-Stake plus RPL-Collateral)
- Über 3.000 unabhängige Operatoren
- Strukturell dezentraler als Lido

**Gebühr:** Variabel (~14% durchschnittlich)

**Netto-APR:** ~3,0–4,3% (etwas niedriger als stETH durch höhere Gebühr)

**Stärken:**
- Deutlich dezentraler als Lido (viele unabhängige Operatoren)
- Permissionless — niemand kann ausgeschlossen werden
- Keine Rebase-Komplexität (rETH im DeFi einfacher zu handhaben)
- Wachsende DeFi-Integration

**Schwächen:**
- Geringere Liquidität als stETH (ca. ein Zehntel der TVL)
- Slippage bei größeren Swaps höher
- Gebühr leicht höher als Lido

**Frax (frxETH/sfrxETH) — Der Yield-optimierte Ansatz**

**Design:**
- Du zahlst ETH ein → bekommst **frxETH** (1:1, kein Yield auf frxETH selbst)
- Für Yield: frxETH in **sfrxETH** umwandeln (Staking-Vault)
- Frax-Ökosystem nutzt die nicht-sfrxETH-Anteile für Curve-LP-Strategien → höhere Rendite für sfrxETH-Halter

**Node-Operatoren:**
- Von Frax-Team betrieben (kleinere Validator-Anzahl als Lido oder Rocket Pool)

**Gebühr:** ~8% der Rewards (typisch niedriger als Konkurrenten)

**Netto-APR:** sfrxETH historisch etwas höher als stETH/rETH, durch optimierte Curve-Strategien

**Stärken:**
- Etwas höhere Rendite durch Curve-Integration
- Effiziente Kapital-Nutzung

**Schwächen:**
- Kleinere TVL als Lido oder Rocket Pool
- Jüngere Protokoll-History
- Zusätzliche Komplexität (separate Tokens frxETH vs. sfrxETH)
- Zentralere Validator-Kontrolle

**Weitere Liquid-Staking-Protokolle**

- **Coinbase cbETH:** LST von der Coinbase-Exchange. Regulatorisch klarer (US-Nutzer), aber zentralisierter.
- **Binance BETH / WBETH:** Ähnlich für Binance-Nutzer.
- **Stakewise osETH:** Dezentraler Fokus, etwas kleinere TVL.
- **Mantle mETH:** Neuere Option, wachsende Adoption.

Für konservative Portfolios auf Ethereum Mainnet sind **Lido** und **Rocket Pool** die sinnvollen Hauptoptionen.

**Der stETH-Depeg Juni 2022 als Case Study**

Nach dem Luna/UST-Kollaps und der 3AC-Insolvenz entstand Panik. Viele große Halter wollten stETH verkaufen — aber:

1. Vor dem Shanghai-Upgrade (April 2023) konnte gestaktes ETH nicht direkt zurückgezogen werden
2. Der einzige Ausstieg war über den Curve stETH/ETH-Pool (Verkauf von stETH gegen ETH)
3. Massive Verkäufe drückten stETH-Preis (in ETH-Einheiten)
4. Peg fiel von 1,00 auf 0,94 (−6%)
5. Viele gehebelte Positionen wurden liquidiert
6. Nach Wochen erholte sich der Peg

**Lehren:**
- LSTs können temporär depeggen (Liquiditätsrisiko, nicht fundamentales Besicherungs-Risiko)
- Gehebelte Positionen auf LSTs sind dem Depeg-Risiko exponiert
- Nach dem Shanghai-Upgrade ist das Risiko reduziert (direkter Withdraw möglich), aber nicht null

**Für konservative Portfolios**

**Empfohlene Allokation bei 10.000 USD ETH-Exposure:**

- 60% wstETH (Lido) — Marktführer, beste Liquidität
- 25% rETH (Rocket Pool) — Dezentralisierungs-Diversifikation
- 15% direktes ETH in Wallet — Liquiditätsreserve

**Warum Diversifikation hier wichtig ist:**
Ein spezifisches Lido-Problem (Governance-Krise, Validator-Slashing-Wave, Smart-Contract-Bug) würde nur 60% der Position treffen. Rocket Pool ist strukturell anders aufgebaut und wahrscheinlich nicht korreliert.

**Renditeerwartung für diese Allokation:**
~3,5% jährliches Staking-Yield, plus ETH-Preis-Veränderung. In Bull-Markets kann die Gesamtrendite deutlich höher sein (Yield + ETH-Preisanstieg), in Bear-Markets entsprechend niedriger oder negativ.

### Slide Summary

**[Slide 1] — Titel**
Liquid Staking: Lido, Rocket Pool, Frax

**[Slide 2] — Liquid Staking Prinzip**
ETH einzahlen → LST erhalten → in DeFi nutzbar
Keine 32-ETH-Hürde
Protokoll trägt Slashing-Risiko

**[Slide 3] — Lido (stETH)**
Marktführer, 30% aller gestakten ETH
Rebase-Token; wstETH für DeFi
10% Gebühr, ~3,2–4,5% APR
Beste Liquidität

**[Slide 4] — Rocket Pool (rETH)**
Permissionless Operators
3.000+ unabhängige Validatoren
~14% Gebühr, ~3,0–4,3% APR
Dezentraler, weniger Liquidität

**[Slide 5] — Frax (sfrxETH)**
Hybrid mit Curve-LP-Optimierung
Etwas höhere Rendite
Kleinere TVL, jüngeres Protokoll

**[Slide 6] — stETH-Depeg Case Study**
Juni 2022: Peg fiel auf 0,94
Ursache: Liquiditätskrise, nicht Besicherung
Nach Shanghai-Upgrade reduziertes Risiko

**[Slide 7] — Konservative Allokation**
60% wstETH, 25% rETH, 15% ETH-Reserve
Diversifikation über Protokolle
~3,5% Yield plus ETH-Preis-Exposure

### Voice Narration Script

**[Slide 1]** Liquid Staking ist der dominante Weg, wie die meisten ETH-Halter stake. Über 30 Prozent aller gestakten ETH liegen in Liquid-Staking-Protokollen. In dieser Lektion sezieren wir die drei großen Anbieter und entwickeln eine konservative Allokations-Strategie.

**[Slide 2]** Das Prinzip. Du zahlst ETH ein, das Protokoll aggregiert viele solche Einzahlungen zu 32-ETH-Validatoren, operiert über Node-Operatoren. Du erhältst einen Liquid-Staking-Token zurück — deine Position repräsentierend. Keine 32-ETH-Hürde. Das Protokoll trägt das Slashing-Risiko, das du als Einzelnutzer hättest.

**[Slide 3]** Lido, der Marktführer. Etwa 30 Prozent aller gestakten ETH. stETH ist ein Rebase-Token — dein Balance wächst automatisch durch Rewards. wstETH ist die gewrappte Version, bei der der Kurs wächst statt der Balance. Besser für DeFi-Integration. 10 Prozent Gebühr, Netto-APR etwa 3,2 bis 4,5 Prozent. Beste Liquidität aller LSTs, tiefste DeFi-Integration. Kritikpunkt: Marktkonzentration durch Dominanz.

**[Slide 4]** Rocket Pool, der dezentralere Konkurrent. Permissionless Operatoren — jeder kann mit 8 oder 16 ETH plus RPL-Collateral Node-Operator werden. Über 3.000 unabhängige Operatoren. rETH ist ein Reward-Token — der Wechselkurs wächst über Zeit. Keine Rebase-Komplexität. Gebühr etwa 14 Prozent im Durchschnitt. Netto-APR 3,0 bis 4,3 Prozent. Strukturell dezentraler, aber geringere Liquidität — etwa ein Zehntel der Lido-TVL.

**[Slide 5]** Frax sfrxETH. Ein Hybrid-Design. Du erhältst zuerst frxETH ohne Yield, dann wandelst du in sfrxETH — das ist der Staking-Vault. Frax nutzt die Differenz für Curve-LP-Strategien, was etwas höhere Rendite bringt. Gebühr etwa 8 Prozent. Kleinere TVL als Lido oder Rocket Pool. Zusätzliche Komplexität durch zwei Tokens. Gut für leicht optimierte Rendite, weniger etabliert.

**[Slide 6]** Der stETH-Depeg im Juni 2022 als wichtige Case Study. Nach dem Luna-Kollaps entstand Panik. Vor dem Shanghai-Upgrade konnte gestaktes ETH nicht direkt zurückgezogen werden. Der einzige Ausstieg war Verkauf auf Curve. Massive Verkäufe drückten stETH auf 0,94 ETH — ein 6-Prozent-Depeg. Gehebelte Positionen wurden liquidiert. Nach Wochen erholte sich der Peg. Die Lehre: LSTs können temporär depeggen — Liquiditätsrisiko, nicht fundamentales Besicherungs-Risiko. Nach dem Shanghai-Upgrade ist das Risiko reduziert durch direkte Withdraw-Möglichkeit, aber nicht null.

**[Slide 7]** Konservative Allokations-Empfehlung für ETH-Exposure: 60 Prozent wstETH bei Lido — Marktführer, beste Liquidität, tiefste Integration. 25 Prozent rETH bei Rocket Pool — Dezentralisierungs-Diversifikation, anderes Risikoprofil. 15 Prozent direktes ETH in Wallet — Liquiditätsreserve für Opportunitäten oder Notfälle. Ein spezifisches Lido-Problem würde nur 60 Prozent treffen, Rocket Pool ist strukturell anders und wahrscheinlich nicht korreliert. Die Gesamt-Rendite-Erwartung: etwa 3,5 Prozent jährliches Staking-Yield plus ETH-Preis-Bewegung.

### Visual Suggestions

**[Slide 1]** Titelfolie.

**[Slide 2]** Flussdiagramm: User → Protokoll → Validator → LST zurück.

**[Slide 3]** **SCREENSHOT SUGGESTION:** Lido App Dashboard (stake.lido.fi) mit aktueller APR.

**[Slide 4]** **SCREENSHOT SUGGESTION:** Rocket Pool stake.rocketpool.net mit Operator-Map. 

**[Slide 5]** Frax-Mechanik-Diagramm: ETH → frxETH → sfrxETH, mit Curve-Integration.

**[Slide 6]** Preis-Chart von stETH Juni 2022 mit markiertem Depeg. **SCREENSHOT SUGGESTION:** Historischer stETH/ETH-Chart auf Curve.

**[Slide 7]** Allokations-Kuchen-Diagramm mit 60/25/15-Aufteilung.

### Exercise

**Aufgabe: Liquid-Staking-Protokolle direkt vergleichen**

1. Besuche:
   - stake.lido.fi (Lido)
   - stake.rocketpool.net (Rocket Pool)
   - frax.finance/ether (Frax)
   - coinbase.com für cbETH
2. Für jeden notiere:
   - Aktuelle APR (Netto)
   - TVL in ETH oder USD
   - Anzahl der Node-Operatoren (wenn sichtbar)
   - Gebühren-Struktur
   - Größte DeFi-Integrationen (wenn angegeben)
3. Schaue dir auf defillama.com/protocol/[name] die TVL-Entwicklung über 12 Monate für jedes Protokoll an.

**Deliverable:** Vergleichstabelle + Empfehlung für ein hypothetisches 50.000 USD ETH-Exposure: Wie würdest du auf Liquid-Staking-Protokolle aufteilen, und warum?

### Quiz

**Frage 1:** Warum ist Lido's Marktdominanz von ~30% aller gestakten ETH sowohl Stärke als auch strukturelles Risiko?

<details>
<summary>Antwort anzeigen</summary>

Als Stärke: Marktdominanz bedeutet höchste Liquidität (einfache Ausstiegsmöglichkeiten über Curve und Uniswap), tiefste DeFi-Integration (fast alle Protokolle akzeptieren wstETH als Collateral), langjähriger Track-Record, und professionelle Operator-Auswahl. Für den individuellen Nutzer gibt das Verlässlichkeit. Als strukturelles Risiko: bei ~30% aller gestakten ETH nähert Lido sich kritischen Schwellenwerten für Ethereum-Dezentralisierung. Der Ethereum-Konsens erfordert mehr als 2/3 der Validatoren für Finalität — wenn ein einzelner Akteur über 33% kontrolliert, kann er Finalität verhindern. Bei 50% kann er doppelte Blöcke vorschlagen. Bei 66% kann er den Konsens manipulieren. Lido selbst kontrolliert nicht direkt die Validatoren, sondern koordiniert 40+ Operatoren — aber ein Governance-Takeover oder Smart-Contract-Hack könnte diese Operatoren mitreißen. Zusätzlich: regulatorisches Risiko konzentriert sich. Wenn Regulatoren Lido angreifen, würde das einen großen Teil des Staking-Ökosystems destabilisieren. Für konservative Nutzer: Lido nutzen, aber nicht ausschließlich. Diversifikation mit Rocket Pool oder anderen Anbietern reduziert die individuelle und die systemische Exposure.
</details>

**Frage 2:** Warum war der stETH-Depeg im Juni 2022 ein Liquiditäts- und kein Solvabilitäts-Problem?

<details>
<summary>Antwort anzeigen</summary>

stETH ist vollständig durch gestaktes ETH gedeckt — 1 stETH repräsentiert genau 1 gestaktes ETH (plus angesammelte Rewards). Das Besicherungs-Verhältnis ist immer 1:1 oder höher. Es gab keinen Moment im Juni 2022, in dem stETH strukturell unterbesichert war. Was passierte: Vor dem Shanghai-Upgrade (April 2023) konnte gestaktes ETH nicht direkt vom Beacon Chain zurückgezogen werden — es war bis Shanghai technisch illiquide. Der einzige praktische Weg, stETH zu liquidieren, war der Verkauf auf DEXs wie Curve. Als viele Halter gleichzeitig verkaufen wollten (wegen Marktpanik nach Luna und 3AC), überstieg die Verkaufs-Nachfrage die Liquidität auf Curve. Der Preis fiel auf 0,94 — weil DEX-Preise Angebot und Nachfrage reflektieren, nicht den fundamentalen Wert. Wer nicht zum DEX-Preis verkaufte, sondern wartete, bekam nach Shanghai den vollen Peg zurück. Das unterscheidet sich fundamental von einem Solvabilitäts-Depeg (wie UST), wo der zugrundeliegende Wert tatsächlich weg ist. Nach dem Shanghai-Upgrade ist das spezifische Risiko deutlich reduziert — man kann jetzt direkt stETH gegen ETH zurückziehen (mit einer Queue-Wartezeit von Tagen). Das macht LSTs strukturell robuster gegen Liquiditäts-getriebene Depegs.
</details>

---

## Lektion 9.3 — Restaking und LRTs: EigenLayer

### Learning Objectives

After completing this lesson the learner will be able to:
- Das Konzept Restaking und seine Funktion im Ethereum-Ökosystem erklären
- Die Unterschiede zwischen EigenLayer-Restaking und Liquid Restaking Tokens (LRTs) verstehen
- Die zusätzlichen Risiken konservativ einschätzen

### Explanation

**Restaking** ist eine der wichtigsten Innovationen im Ethereum-Ökosystem der letzten Jahre — und eine der kontrovers diskutiertesten. Das Grundkonzept: gestaktes ETH (oder LSTs) nochmal nutzen, um zusätzliche Protokolle zu sichern und dafür zusätzliche Rewards zu erhalten.

Das klingt verlockend — mehr Rendite ohne zusätzliches Kapital. Aber die zusätzlichen Rewards kommen aus zusätzlichen Risiken. Diese Lektion erklärt die Mechanik und die Risiko-Abwägungen für konservative Portfolios.

**Das Grundkonzept: EigenLayer**

**EigenLayer** (Mainnet-Launch April 2024) ist das dominante Restaking-Protokoll. Das Prinzip:

1. Ein ETH-Staker hinterlegt sein gestaktes ETH (oder LSTs wie wstETH, rETH) bei EigenLayer.
2. Das Protokoll erlaubt diesem ETH, zusätzlich als Sicherheit für andere Protokolle zu dienen — sogenannte **AVS** (Actively Validated Services).
3. Die AVS zahlen Rewards an die Restaker für diese zusätzliche Sicherung.
4. Im Gegenzug kann der Restaker für Fehlverhalten der AVS-Infrastruktur slashed werden.

**Was ist ein AVS?**

AVS sind Middleware-Protokolle, die eigene Ethereum-ähnliche Sicherheits-Garantien brauchen — aber nicht genug Wert generieren, um ihr eigenes Validator-Netzwerk aufzubauen. Statt einen eigenen Konsens-Mechanismus zu betreiben, "leihen" sie sich Sicherheit von Ethereum über EigenLayer.

**Beispiele für AVS:**
- **EigenDA:** Data-Availability-Service für Layer-2s (größter AVS)
- **AltLayer:** Rollup-as-a-Service mit restaked Security
- **Lagrange:** Cross-Chain-Proofs
- **Drosera:** Security-Monitoring
- Weitere ~20+ AVS im Launch

**Rewards und Slashing**

**Rewards:** AVS zahlen Restaker für die zusätzliche Sicherung. Historisch 0,5–3% zusätzliches APR, sehr variabel je nach AVS und Zeitpunkt. In der Launch-Phase oft durch Token-Ausgaben der AVS bezahlt (nicht nachhaltig).

**Slashing:** AVS können Restaker für Fehlverhalten slashen. Das ist eine **zusätzliche** Slashing-Quelle über die Ethereum-Konsens-Slashing hinaus. AVS definieren ihre eigenen Slashing-Bedingungen.

**Stand April 2024:** Slashing wurde aktiviert, aber die Mechanismen sind noch jung. In der Praxis noch keine Groß-Events gesehen, aber strukturell möglich.

**Liquid Restaking Tokens (LRTs)**

Ähnlich wie LSTs für Liquid Staking existieren LRTs für Restaking. Ein Nutzer zahlt ETH oder LSTs bei einem LRT-Protokoll ein und erhält einen LRT, der die restakte Position repräsentiert und in DeFi weiterverwendbar ist.

**Die wichtigsten LRTs:**

**EtherFi (eETH, weETH)**
- Größter LRT nach TVL
- Native Liquid-Restaking: du stakest direkt ETH, nicht LSTs
- weETH ist die gewrappte Variante für DeFi-Integration
- "Delegated Restaking": EtherFi entscheidet, welche AVS gewählt werden

**Renzo (ezETH)**
- Zweitgrößter LRT
- Annahme ETH oder LSTs
- Strategisches AVS-Management durch Renzo-Team

**Puffer (pufETH)**
- Fokus auf Anti-Slashing-Mechanismen (Secure-Signing)
- Ziel: Slashing-Risiko minimieren

**Kelp (rsETH)**
- Auf Ethereum und Arbitrum
- Multiple LSTs als Input akzeptiert

**Swell (swETH, rswETH)**
- Kombiniert Staking und Restaking in einem Token

**Die Risiko-Kaskade von LRTs**

Ein LRT-Halter trägt **gestapelte Risiken**:

1. **ETH-Preisrisiko** (wie bei jeder ETH-Position)
2. **Ethereum-Staking-Risiko** (Slashing, Inactivity bei Validatoren)
3. **LST-Risiko** (wenn LRT auf LSTs basiert — stETH-Depeg-Risiko plus Lido-Protokoll-Risiko)
4. **EigenLayer-Risiko** (Smart-Contract-Risiko des Restaking-Protokolls)
5. **AVS-Risiko** (Slashing durch die gewählten AVS)
6. **LRT-Protokoll-Risiko** (Smart-Contract-Risiko des LRT-Protokolls selbst)
7. **LRT-Depeg-Risiko** (wie bei LSTs, kann LRTs depeggen)
8. **AVS-Wahl-Risiko** (das LRT-Team wählt welche AVS — diese Entscheidungen können falsch sein)

Das sind **acht Risiko-Schichten**, teilweise verstärkend. Jede Schicht ist einzeln klein, zusammengenommen nicht trivial.

**Die Rendite-Komposition**

Ein typischer LRT könnte folgende Rendite-Quellen haben:
- Basis-Staking-Yield: ~3,5%
- AVS-Rewards: +0,5–2%
- Protokoll-Points (früh) oder Token-Rewards: variabel
- EigenLayer-Points (für zukünftige EIGEN-Airdrops)

**Gesamt-APY (angegeben):** typisch 5–8%, manchmal höher durch Points-Spekulation

**Aber:** Viele dieser Rewards sind frühe Protokoll-Incentives, die nicht langfristig stabil sind. Die echte **nachhaltige** Rendite für konservative Bewertung liegt eher bei 4–5% (Basis-Staking plus moderate AVS-Rewards).

**Konservative Bewertung von Restaking**

**Für konservative Portfolios gilt:**

**Restaking ist nicht per se unverantwortlich**, aber es ist **nicht nötig** für das 7–8%-Ziel. Die zusätzliche Rendite von LRTs gegenüber einfachem Liquid Staking beträgt typisch 1–2 Prozentpunkte — bei deutlich erhöhter Risiko-Komplexität.

**Wenn du Restaking nutzt:**
- **Maximal 20–30% der ETH-Exposure** in LRTs, nicht mehr
- **Etablierte LRT-Protokolle** bevorzugen (EtherFi, Renzo — nicht experimentelle)
- **Diversifikation über LRT-Protokolle** (nicht 100% EtherFi)
- **Bewusst halten, dass Points-getriebene Rendite nicht nachhaltig ist**
- **AVS-Wahl-Strategien prüfen** (welche AVS hat das Protokoll gewählt?)

**Was zu vermeiden ist:**
- 100% der ETH-Exposure in LRTs
- Exotische LRTs mit kurzer History
- Leveraged LRT-Positionen (kumuliert Risiken dramatisch)
- Pure Point-Farming ohne Verständnis der zugrunde liegenden Mechanik

**Die praktische Alternative**

Für die meisten konservativen Nutzer ist **reines Liquid Staking** mit Lido und Rocket Pool die sinnvollere Wahl:

- Einfacher zu verstehen
- Weniger Risiko-Schichten
- Bewährter Track-Record
- Geringe Rendite-Differenz (~1 Prozentpunkt) wird oft durch reduzierte Komplexität wettgemacht

Restaking ist ein interessantes Primitiv und wahrscheinlich langfristig relevant. Für den aktuellen Zustand (April 2024+) ist es für konservative Portfolios eher ein kleiner, optionaler Bestandteil als ein Kern-Baustein.

### Slide Summary

**[Slide 1] — Titel**
Restaking und LRTs: EigenLayer

**[Slide 2] — Grundkonzept**
Gestaktes ETH doppelt nutzen
Zusätzliche Rewards für zusätzliche Sicherung anderer Protokolle (AVS)
Zusätzliches Slashing-Risiko

**[Slide 3] — EigenLayer und AVS**
AVS = Actively Validated Services
EigenDA, AltLayer, Lagrange, weitere
Rewards aus AVS-Gebühren oder Token

**[Slide 4] — Major LRTs**
EtherFi (eETH, weETH) — größter
Renzo (ezETH) — zweitgrößter
Puffer, Kelp, Swell — weitere

**[Slide 5] — Die Risiko-Kaskade**
8 Risiko-Schichten:
ETH, Staking, LST, EigenLayer, AVS, LRT-Protokoll, LRT-Depeg, AVS-Wahl

**[Slide 6] — Rendite-Komposition**
Basis: ~3,5%
AVS-Rewards: +0,5–2%
Points (spekulativ): variabel
Nachhaltig: 4–5%

**[Slide 7] — Konservative Empfehlung**
Maximal 20–30% der ETH in LRTs
Etablierte Protokolle diversifiziert
Reines Liquid Staking oft die bessere Wahl

### Voice Narration Script

**[Slide 1]** Restaking ist eine der wichtigsten Innovationen im Ethereum-Ökosystem der letzten Jahre. Es klingt verlockend: mehr Rendite ohne zusätzliches Kapital. Aber die zusätzliche Rendite kommt aus zusätzlichem Risiko. Diese Lektion seziert die Mechanik konservativ.

**[Slide 2]** Das Grundkonzept. Gestaktes ETH wird nochmal genutzt, um zusätzliche Protokolle zu sichern. Ein Staker hinterlegt sein gestaktes ETH oder LSTs bei EigenLayer. Das Protokoll erlaubt diesem ETH, zusätzlich als Sicherheit für AVS zu dienen — Actively Validated Services. Die AVS zahlen Rewards. Im Gegenzug kann der Restaker bei AVS-Fehlverhalten zusätzlich slashed werden.

**[Slide 3]** Was AVS sind. Middleware-Protokolle, die Ethereum-ähnliche Sicherheit brauchen, aber nicht genug Wert haben, um ein eigenes Validator-Netzwerk aufzubauen. Sie leihen sich Sicherheit von Ethereum über EigenLayer. Beispiele: EigenDA — Data-Availability-Service für Layer-2s. AltLayer — Rollup-as-a-Service. Lagrange für Cross-Chain-Proofs. Etwa 20 AVS im Launch.

**[Slide 4]** Die wichtigsten Liquid Restaking Tokens. EtherFi mit eETH und weETH ist der größte. Renzo mit ezETH der zweitgrößte. Puffer fokussiert auf Anti-Slashing-Mechanismen. Kelp bietet rsETH und akzeptiert multiple LST-Inputs. Swell kombiniert Staking und Restaking in einem Token. Alle relativ jung, launch 2024.

**[Slide 5]** Die Risiko-Kaskade ist komplex. Acht Risiko-Schichten, teilweise verstärkend. ETH-Preisrisiko. Ethereum-Staking-Risiko. LST-Risiko wenn das LRT auf LSTs basiert. EigenLayer-Smart-Contract-Risiko. AVS-Slashing-Risiko. LRT-Protokoll-Smart-Contract-Risiko. LRT-Depeg-Risiko wie bei LSTs. Und AVS-Wahl-Risiko — das LRT-Team wählt welche AVS und kann falsche Entscheidungen treffen. Jede Schicht einzeln klein, zusammen nicht trivial.

**[Slide 6]** Die Rendite-Komposition eines typischen LRTs. Basis-Staking-Yield etwa 3,5 Prozent. AVS-Rewards 0,5 bis 2 Prozent zusätzlich. Plus Protokoll-Points für zukünftige Airdrops — spekulativ. Die angegebenen Gesamtrenditen von 5 bis 8 Prozent klingen attraktiv, aber ein großer Teil kommt aus frühen Incentives, die nicht nachhaltig sind. Die echte nachhaltige Rendite liegt eher bei 4 bis 5 Prozent.

**[Slide 7]** Die konservative Empfehlung. Restaking ist nicht unverantwortlich, aber nicht nötig für das 7 bis 8 Prozent Ziel. Wenn du LRTs nutzt: maximal 20 bis 30 Prozent deiner ETH-Exposure. Etablierte LRT-Protokolle bevorzugen, nicht experimentelle. Diversifikation über mehrere LRT-Protokolle. Bewusst halten, dass Points-Rendite nicht nachhaltig ist. Was zu vermeiden ist: 100 Prozent in LRTs, exotische Protokolle, gehebelte LRT-Positionen. Für die meisten konservativen Nutzer ist reines Liquid Staking mit Lido und Rocket Pool die sinnvollere Wahl — einfacher, weniger Risiko-Schichten, bewährter Track-Record, nur 1 Prozentpunkt weniger Rendite.

### Visual Suggestions

**[Slide 1]** Titelfolie.

**[Slide 2]** Diagramm: ETH → Validator → EigenLayer → AVS, mit Reward- und Slashing-Pfeilen.

**[Slide 3]** AVS-Liste mit Logos und Kurzbeschreibungen.

**[Slide 4]** **SCREENSHOT SUGGESTION:** DeFiLlama LRT-Rankings oder etherfi.app Dashboard.

**[Slide 5]** 8-Ebenen-Pyramide oder -Stapel der Risiko-Schichten.

**[Slide 6]** Rendite-Komposition als gestapeltes Balkendiagramm mit nachhaltig/spekulativ-Markierung.

**[Slide 7]** Allokations-Empfehlung mit LRT-Anteil-Prozent-Markierung.

### Exercise

**Aufgabe: LRT-Risiko-Analyse**

Wähle einen LRT (EtherFi weETH oder Renzo ezETH) und analysiere:

1. Welche AVS-Liste hat das Protokoll gewählt?
2. Wie wird die AVS-Gewichtung verwaltet?
3. Gibt es ein Insurance- oder Slashing-Protection-Mechanismus?
4. Wie viel der aktuellen Rendite kommt aus nachhaltigen Quellen (Base Staking + AVS-Fees) vs. spekulativen Quellen (Points, Token-Incentives)?
5. Wie liquide ist der LRT-Token (DEX-Volumen, DeFi-Integrationen)?

**Deliverable:** Analyse-Dokument (1–2 Seiten) + persönliches Urteil: Würdest du 10% deiner hypothetischen ETH-Exposure in diesen LRT stecken? Warum oder warum nicht?

### Quiz

**Frage 1:** Warum erhöht Restaking (und LRTs) die Risiko-Komplexität dramatisch im Vergleich zu einfachem Liquid Staking?

<details>
<summary>Antwort anzeigen</summary>

Einfaches Liquid Staking (z.B. wstETH via Lido) trägt drei Hauptrisiken: ETH-Preisrisiko, Ethereum-Staking-Risiko (Slashing, Inactivity), und Lido-Protokoll-Risiko (Smart Contract, Governance). Das sind drei überschaubare, gut verstandene Risiko-Quellen. Restaking fügt mindestens fünf zusätzliche Schichten hinzu: EigenLayer-Protokoll-Risiko (Smart Contract des Restaking-Systems), AVS-Slashing-Risiko (zusätzliche Slashing-Bedingungen definiert von jedem einzelnen AVS), LRT-Protokoll-Risiko (das LRT-Protokoll selbst), LRT-Depeg-Risiko (LRTs können wie LSTs depeggen, und ihre Liquidität ist oft dünner), und AVS-Wahl-Risiko (das LRT-Team entscheidet, welche AVS gesichert werden — falsche Entscheidungen können zu Verlusten führen). Zusätzlich sind diese Risiken teilweise **korreliert**: ein EigenLayer-Hack könnte LRTs betreffen, ein AVS-Fehlverhalten betrifft alle Restaker, die dieses AVS sichern. Die Gesamt-Ausfall-Wahrscheinlichkeit ist nicht einfach die Summe, sondern kann durch diese Korrelationen höher sein als die Summe. Für 1–2 Prozentpunkte zusätzliche Rendite ist das für die meisten konservativen Portfolios kein guter Trade-off.
</details>

**Frage 2:** Warum sollte ein konservativer Nutzer die "spekulativen" und "nachhaltigen" Anteile einer LRT-Rendite klar trennen können?

<details>
<summary>Antwort anzeigen</summary>

Weil nur die nachhaltigen Anteile langfristig verlässlich sind. Eine LRT mit angegebener Rendite von 8% kann sich zusammensetzen aus: 3,5% Base Staking Yield (nachhaltig, Ethereum-Protokoll-Rewards), 1,5% AVS-Fees (nachhaltig wenn die AVS langfristig funktionieren und echte Einnahmen haben), und 3% aus Points-Rewards und Token-Incentives (spekulativ, abhängig von zukünftigen Token-Ausgaben und Airdrop-Werten). Wenn die Points-Programme enden — was typisch nach 6–18 Monaten passiert — fällt die effektive Rendite auf 5%. Wenn die Token-Incentives im Preis fallen, fällt sie weiter. Ein Anleger, der die angegebene 8% erwartet und seine Strategie darauf baut, wird enttäuscht. Ein Anleger, der weiß "4–5% sind nachhaltig, 3% ist Bonus", baut seine Strategie konservativ und kann positiv überrascht werden. Die konservative Regel: bei jeder DeFi-Rendite frage, "was bleibt, wenn alle Incentive-Programme enden?". Diese Zahl ist die verlässliche Basis für Portfolio-Planung. Alles darüber ist Bonus, kein Anrecht.
</details>

---

## Lektion 9.4 — Pendle: Yield-Handel und Fixed Yield

### Learning Objectives

After completing this lesson the learner will be able to:
- Das Pendle-Konzept (PT/YT-Aufspaltung) erklären
- Fixed Yield durch Principal Tokens (PT) nutzen
- Pendle als Baustein konservativer Strategien einsetzen

### Explanation

**Pendle** ist eines der interessantesten Yield-Protokolle in DeFi. Es erlaubt, Yield zu tokenisieren und zu handeln — ähnlich zu Zinsswap-Märkten im traditionellen Finanzwesen. Für konservative Nutzer ist Pendle vor allem wegen eines Features relevant: **Fixed Yield** — garantierte Rendite über einen definierten Zeitraum.

**Das Grundkonzept: Yield-Asset-Aufspaltung**

Ein yield-tragendes Asset (z.B. stETH, sUSDe, GLP) hat zwei Komponenten:
1. **Principal:** Der zugrundeliegende Wert (z.B. 1 ETH bei stETH)
2. **Yield:** Der kontinuierlich akkumulierte Ertrag

Pendle **spaltet** diese zwei Komponenten in separate Tokens auf:

- **PT (Principal Token):** Repräsentiert den Principal-Anspruch zu einem festen Fälligkeitsdatum
- **YT (Yield Token):** Repräsentiert den Anspruch auf alle Yield-Einnahmen bis Fälligkeit

Bei Fälligkeit kannst du PT 1:1 gegen das zugrundeliegende Asset (z.B. ETH oder stETH) einlösen. Der YT wird bei Fälligkeit wertlos — bis dahin hat er dir den kumulierten Yield gebracht.

**Ein konkretes Beispiel**

Stell dir stETH vor, mit Fälligkeit in 6 Monaten:
- 1 stETH = 1 PT-stETH + 1 YT-stETH
- PT-stETH handelt heute mit Abschlag (sagen wir 0,975 ETH)
- YT-stETH repräsentiert den erwarteten Yield für 6 Monate

**Als PT-Käufer:** Du kaufst 1 PT-stETH für 0,975 ETH heute. In 6 Monaten kannst du es 1:1 gegen stETH einlösen — effektiv hast du 0,025 ETH in 6 Monaten verdient, was einer annualisierten Rendite von **~5,1% fixed** entspricht.

**Als YT-Käufer:** Du kaufst 1 YT-stETH für 0,025 ETH. Wenn der stETH-Yield über die 6 Monate 5% annualisiert bringt (also 0,025 ETH absolut), machst du Breakeven. Wenn der Yield höher ist, Gewinn; wenn niedriger, Verlust. Das ist effektiv eine **Yield-Spekulation**.

**Für konservative Strategien ist PT der relevante Baustein.**

**Fixed Yield durch PT — der konservative Sweet Spot**

Fixed Yield ist für DeFi ungewöhnlich — die meisten Yields sind variabel. Pendle ermöglicht **berechenbare, feste Renditen** über definierte Zeiträume.

**Warum das wertvoll ist:**
- Planbarkeit: Du weißt exakt, was du in 6 Monaten hast
- Risiko-Reduktion: kein Zins-Volatilitäts-Risiko
- Komponierbarkeit: PT kann in anderen Strategien verwendet werden (aber Vorsicht)

**Aktuelle PT-Angebote (Beispiele, Stand April 2024):**
- PT-stETH (6 Monate Fälligkeit): ~5–6% fixed APR
- PT-sUSDe (6 Monate): ~10–15% fixed APR (höher wegen sUSDes höherem Underlying-Yield)
- PT-USDC (verschiedene Quellen): 6–10% fixed APR
- PT-weETH (3–9 Monate): 7–12% fixed APR

**Praktische Nutzung für konservative Portfolios**

**Szenario 1: Fixed Stablecoin-Yield**
Du willst 10.000 USDC für 6 Monate parken und möchtest sicher wissen, wie viel du am Ende hast. Du kaufst PT-USDC mit 6 Monaten Fälligkeit und ~8% fixed APR. Nach 6 Monaten löst du die PT gegen USDC ein, Ergebnis: 10.400 USDC. Garantiert, keine Zins-Schwankungen.

**Szenario 2: Fixed ETH-Staking-Yield**
Du willst ETH-Staking-Exposure für ein Jahr mit garantierter Rendite. PT-weETH (1 Jahr) bringt beispielsweise 8% fixed. Du kaufst PT-weETH mit 5 ETH Einsatz, bekommst am Ende 5 × 1,08 = 5,4 weETH. Garantiert.

**Szenario 3: sUSDe mit Fixed Yield statt Variable**
sUSDes variable APY kann von 5% bis 25% schwanken. Wer berechenbare Rendite will, kann PT-sUSDe kaufen und einen fixed Rate einfrieren. Reduziert das Funding-Rate-Risiko von sUSDe signifikant.

**Die Risiken von Pendle**

1. **Smart-Contract-Risiko:** Pendle's Code ist mehrfach auditiert, aber komplexer als einfaches Staking.
2. **Underlying-Asset-Risiko:** Ein PT-stETH ist abhängig davon, dass stETH bei Fälligkeit 1:1 zu stETH einlösbar ist. Bei einem stETH-Depeg-Event oder Lido-Kollaps wäre die PT-Position beeinträchtigt.
3. **Liquiditätsrisiko:** Wer vor Fälligkeit aus einer PT-Position aussteigen will, muss auf DEXs verkaufen — zu dem dann gerade gültigen Marktpreis, der vom Fixed-Rate abweichen kann.
4. **Fälligkeits-Bindung:** Bei regulären PTs kein Frühzeitiger Ausstieg ohne Sekundärmarkt-Verkauf.

**Pendle als strukturiertes Produkt**

Für konservative Nutzer ist Pendle ein **Yield-Lock-Tool**: du garantierst dir eine Rendite für einen definierten Zeitraum. Das passt besonders gut für Kapital, das für einen bekannten Zeithorizont nicht gebraucht wird (z.B. "ich will in 6 Monaten investieren, brauche das Kapital bis dahin nicht").

**Was Pendle nicht ist:**
- Keine "risikofreie Rendite" — die zugrunde liegenden Risiken bleiben
- Kein Ersatz für passives Supply, wenn Flexibilität wichtig ist
- Kein magischer Yield-Booster — die Fixed Rate ist der Markt-Erwartungswert für die variable Rate

**Konservative Allokations-Regel**

PT-Positionen als Baustein einer diversifizierten Strategie:
- **Maximal 20–25% der Stablecoin-Allokation** in PT-Positionen
- **Keine Positionen über 12 Monate** (längere Fälligkeiten = mehr Liquiditätsrisiko)
- **Nur PTs auf etablierten Underlying-Assets** (stETH, USDC, wstETH — nicht exotische Underlyings)
- **Diversifikation über mehrere Fälligkeitstermine** für gestaffelte Liquidität

### Slide Summary

**[Slide 1] — Titel**
Pendle: Yield-Handel und Fixed Yield

**[Slide 2] — PT/YT-Aufspaltung**
Yield-Asset = PT (Principal) + YT (Yield)
PT einlösbar 1:1 bei Fälligkeit
YT erhält allen Yield bis Fälligkeit

**[Slide 3] — PT als Fixed-Yield-Tool**
Kaufe PT unter Par → einlöse zu Par → Fixed Return
Beispiel: 0,975 ETH → 1 ETH in 6 Monaten = 5,1% fixed

**[Slide 4] — Typische Fixed-Yield-Raten**
PT-stETH: 5–6% fixed
PT-USDC: 6–10% fixed
PT-sUSDe: 10–15% fixed
PT-weETH: 7–12% fixed

**[Slide 5] — Anwendungs-Szenarien**
1. Fixed Stablecoin-Yield (bekannter Zeithorizont)
2. Fixed ETH-Staking-Rendite
3. sUSDe-Risiko-Reduktion via Fixed Rate

**[Slide 6] — Risiken**
Smart-Contract
Underlying-Asset (z.B. stETH-Depeg)
Liquidität vor Fälligkeit
Fälligkeits-Bindung

**[Slide 7] — Konservative Allokation**
Max 20–25% der Stablecoin-Allokation
Max 12 Monate Fälligkeit
Etablierte Underlyings
Gestaffelte Fälligkeitstermine

### Voice Narration Script

**[Slide 1]** Pendle ist eines der interessantesten Yield-Protokolle in DeFi. Für konservative Nutzer ist es vor allem wegen eines Features relevant: Fixed Yield — garantierte Rendite über einen definierten Zeitraum. Das ist in DeFi ungewöhnlich und wertvoll.

**[Slide 2]** Das Grundkonzept. Pendle spaltet yield-tragende Assets in zwei Teile. PT, Principal Token, repräsentiert den Principal-Anspruch zu einem festen Fälligkeitsdatum. YT, Yield Token, repräsentiert den Anspruch auf alle Yield-Einnahmen bis Fälligkeit. Bei Fälligkeit kannst du PT 1:1 gegen das zugrundeliegende Asset einlösen. YT wird wertlos — bis dahin hat er dir den kumulierten Yield gebracht. 1 stETH gleich 1 PT-stETH plus 1 YT-stETH.

**[Slide 3]** Wie PT zum Fixed-Yield-Tool wird. PT handeln heute mit Abschlag, weil der Yield in der Zukunft noch nicht eingetreten ist. Beispiel: PT-stETH mit 6 Monaten Fälligkeit handelt bei 0,975 ETH. Du kaufst das heute. In 6 Monaten löst du 1:1 gegen stETH ein. Effektive Rendite: 2,5 Prozent in 6 Monaten, annualisiert 5,1 Prozent fixed. Garantiert, keine Zins-Schwankungen. Das ist das konservative Kern-Anwendungsfall.

**[Slide 4]** Typische Fixed-Yield-Raten aktuell. PT-stETH bei 6 Monaten Fälligkeit etwa 5 bis 6 Prozent fixed. PT-USDC je nach Underlying 6 bis 10 Prozent. PT-sUSDe 10 bis 15 Prozent — höher wegen sUSDes höherer Underlying-Rendite. PT-weETH 7 bis 12 Prozent. Diese Zahlen variieren über Zeit — prüfe app.pendle.finance für aktuelle Werte.

**[Slide 5]** Drei Anwendungs-Szenarien. Erstens: fixed Stablecoin-Yield für bekannten Zeithorizont. Du willst 10.000 Dollar für 6 Monate parken und exakt wissen, was am Ende da ist. PT-USDC mit 8 Prozent fixed: 10.400 Dollar nach 6 Monaten. Zweitens: fixed ETH-Staking-Rendite. PT-weETH mit einem Jahr Fälligkeit und 8 Prozent fixed garantiert dir die Rendite. Drittens: sUSDe-Risiko-Reduktion. sUSDes variable APY schwankt stark — PT-sUSDe friert einen fixed Rate ein.

**[Slide 6]** Die Risiken von Pendle. Smart-Contract-Risiko ist höher als bei einfachem Staking, weil das Protokoll komplexer ist. Mehrere Audits mindern das. Underlying-Asset-Risiko: ein PT-stETH setzt voraus, dass stETH bei Fälligkeit 1:1 einlösbar ist. Bei einem stETH-Depeg oder Lido-Kollaps wäre die PT-Position beeinträchtigt. Liquiditätsrisiko: wer vor Fälligkeit aussteigen will, verkauft auf DEXs zu dem dann gültigen Marktpreis. Fälligkeits-Bindung: bei regulären PTs kein Früh-Ausstieg ohne Sekundärmarkt.

**[Slide 7]** Konservative Allokations-Regel. Maximal 20 bis 25 Prozent der Stablecoin-Allokation in PT-Positionen. Keine Positionen über 12 Monate Fälligkeit — längere Fälligkeiten bedeuten mehr Liquiditätsrisiko. Nur PTs auf etablierten Underlying-Assets — stETH, USDC, wstETH — nicht exotische Underlyings. Diversifikation über mehrere Fälligkeitstermine für gestaffelte Liquidität, falls du zwischendurch Kapital benötigst.

### Visual Suggestions

**[Slide 1]** Titelfolie.

**[Slide 2]** Diagramm: yield-tragendes Asset → PT + YT Split, mit Fälligkeits-Zeitleiste.

**[Slide 3]** Schrittweise Berechnung mit Preis-Visualisierung.

**[Slide 4]** **SCREENSHOT SUGGESTION:** Pendle.finance Markets-Übersicht mit aktuellen Fixed-Yield-Raten.

**[Slide 5]** Drei-Szenarien-Cards mit konkreten Zahlen.

**[Slide 6]** Risiko-Checkliste.

**[Slide 7]** Allokations-Beispiel mit gestaffelten Fälligkeitsterminen als Timeline.

### Exercise

**Aufgabe: Pendle Fixed-Yield-Analyse**

1. Besuche app.pendle.finance.
2. Untersuche die Markets-Sektion. Filter auf Ethereum Mainnet.
3. Wähle drei attraktive PT-Angebote:
   - Eines auf Stablecoin-Underlying
   - Eines auf stETH oder wstETH
   - Eines auf anderem Yield-Asset (z.B. sUSDe, weETH)
4. Für jeden dokumentiere:
   - Underlying-Asset
   - Fälligkeitsdatum
   - Fixed APR
   - Liquidität des Pools (TVL)
5. Berechne: wenn du jeweils 5.000 USD einsetzt, wie viel hättest du am Ende?

**Deliverable:** Tabelle mit den drei PTs + persönliches Urteil: Welches wäre für einen konservativen Portfolio-Baustein geeignet, welches zu riskant, und warum?

### Quiz

**Frage 1:** Warum ist PT-stETH mit 5% fixed APR nicht notwendigerweise "besser" als variables stETH mit aktuell 4% APR?

<details>
<summary>Antwort anzeigen</summary>

Die Fixed Rate ist der Markt-Erwartungswert für die zukünftige Variable Rate. Wenn PT-stETH 5% fixed bietet, sagt der Markt: "Wir erwarten, dass stETH-Yield im Durchschnitt über die Fälligkeits-Periode etwa 5% liegen wird." Das kann sich als zu hoch oder zu niedrig herausstellen. Wenn der tatsächliche stETH-Yield über 6 Monate 6% erreicht (z.B. durch höheres Netzwerk-Aktivität), dann war PT-Käufer bei 5% unterlegen im Vergleich zum direkten stETH-Halten. Wenn der tatsächliche Yield auf 3% fällt, hat der PT-Käufer einen Gewinn aus der Differenz. Die Fixed Rate ist ein Trade-off zwischen Gewissheit und Optionalität. Für konservative Planung ist Gewissheit oft wertvoller als die Chance auf höhere variable Rendite — besonders bei bekanntem Zeithorizont (z.B. "ich brauche dieses Kapital in 6 Monaten"). Für Spekulanten, die auf höhere Yields setzen, ist variables Halten besser. Die Entscheidung hängt vom eigenen Zeithorizont und Risiko-Profil ab, nicht von "welche Zahl höher klingt".
</details>

**Frage 2:** Unter welchen Bedingungen sollte ein konservativer Nutzer Pendle meiden, trotz attraktiver Fixed-Yield-Raten?

<details>
<summary>Antwort anzeigen</summary>

Mehrere Bedingungen. Erstens: wenn Flexibilität wichtiger ist als Planbarkeit. Wenn der Nutzer nicht sicher ist, ob er das Kapital in 6 Monaten braucht, ist PT keine gute Wahl — Ausstieg vor Fälligkeit geht nur über Sekundärmarkt-Verkauf zu variablen Preisen. Zweitens: wenn das Underlying-Asset selbst ein höheres Risikoprofil hat als der Nutzer akzeptieren will. PT-sUSDe bringt 10–15% fixed, aber sUSDe trägt alle von uns behandelten Ethena-Risiken (Funding Rates, Exchange-Risiko, Custody). Der Fixed Rate eliminiert nicht die Underlying-Risiken. Drittens: wenn der Nutzer komplexe Strategien nicht versteht und einfache Alternativen zur Verfügung hat. Für jemand mit 10.000 USDC, der einfach Yield will, ist USDC auf Aave mit 4% APY oft ausreichend — Pendle fügt Komplexität hinzu. Viertens: wenn die Position zu groß für die Pool-Liquidität ist. Pendle-PT-Pools haben unterschiedliche Tiefe. Eine 100.000-USD-Position in einem kleinen Pool kann beim Ausstieg signifikanten Slippage erzeugen. Fünftens: wenn das Kapital für Notfälle vorgesehen ist. Notreserven sollten maximal liquide sein — PT mit Fälligkeits-Bindung ist schlecht geeignet. Konservative Regel: Pendle für klar-zeitlich-gebundenes, definiertes Kapital mit gut-bekannten Underlyings. Nicht für Flex-Kapital oder Notreserven.
</details>

---

## Lektion 9.5 — Yield-Aggregatoren: Yearn, Convex, Morpho Vaults

### Learning Objectives

After completing this lesson the learner will be able to:
- Yield-Aggregatoren nach Architektur unterscheiden
- Yearn Finance und Convex in ihren Kern-Funktionen einordnen
- Morpho Vaults als moderne Lending-Aggregatoren einsetzen

### Explanation

Yield-Aggregatoren sind Protokolle, die komplexe Yield-Strategien für den Endnutzer vereinfachen. Statt manuell zwischen Lending-Protokollen, LP-Positionen und Staking-Strategien zu rotieren, deponiert der Nutzer Kapital in einem Vault, und der Aggregator verwaltet die optimale Allokation automatisiert.

Diese Lektion behandelt die drei wichtigsten Aggregator-Typen: Yearn (klassisch), Convex (Curve-Boost-spezialisiert), und Morpho Vaults (moderne Lending-Aggregation).

**Yearn Finance — Der Veteran (seit 2020)**

Yearn startete als einfacher Yield-Optimizer für Stablecoins: der Yearn-Contract schob USDC automatisch zwischen Aave und Compound, je nachdem, wo die Rate besser war. Über die Jahre wurde Yearn zu einer umfassenden Vault-Plattform mit Dutzenden Strategien.

**Architektur:**
- Nutzer zahlt Asset ein → bekommt Vault-Token (z.B. yvUSDC)
- Strategie-Manager ("Strategist") betreibt die Sub-Strategien
- Yearn-Governance (YFI-Token-Holder) genehmigt neue Strategien

**Typische Strategien:**
- Stablecoin-Lending-Rotation zwischen Aave, Compound, Morpho
- Curve-LP mit Convex-Boost
- ETH-Staking-Strategien
- Exotische Delta-neutrale Plays

**Gebühren:**
- 2% Management Fee (annualisiert)
- 20% Performance Fee auf Profit

**Stärken:**
- Längste DeFi-Vault-Historie
- Breites Strategie-Portfolio
- Etablierter Track-Record

**Schwächen:**
- Gebühren schneiden signifikant in die Rendite
- Governance-Komplexität
- Einige historische Sicherheits-Incidents (früher Code, seit Jahren besser)

**Realistische Netto-Rendite:** Stablecoin-Vaults typisch 3–5% (nach Gebühren), ETH-Vaults 3–4% plus Staking-Exposition.

**Convex Finance — Der Curve-Spezialist (2021)**

Convex ist auf ein einziges Problem spezialisiert: die Optimierung von Curve-LP-Renditen.

**Das Problem, das Convex löst:**

Curve-LPs können ihre Rendite durch **veCRV** (vote-escrowed CRV) boosten. Um veCRV zu bekommen, muss man CRV-Tokens für bis zu 4 Jahre sperren — was inflexibel ist. Convex poolt veCRV zentral und gibt allen Convex-Nutzern den Boost, ohne selbst locken zu müssen.

**Mechanik:**
1. Du zahlst deinen Curve-LP-Token bei Convex ein
2. Convex staked ihn mit der gepoolten veCRV-Position für maximalen Boost
3. Du erhältst: Trading-Fees + CRV-Rewards (geboostet) + CVX-Rewards

**Stärken:**
- Best-in-Class Curve-Yield-Optimierung
- Einfacher als manuelles veCRV-Management
- Langjähriger Track-Record

**Schwächen:**
- Zusätzliche Smart-Contract-Ebene (Convex ist ein weiteres Protokoll zwischen dir und Curve)
- CVX-Token-Exposure (zusätzliches Preisrisiko)
- Nur für Curve-LPs relevant

**Typische Rendite-Boost durch Convex:** 1,5–2,5x im Vergleich zu ungesockeltem Curve-LP. Bei einer Base-Curve-LP-Rendite von 3% ergibt das 4,5–7,5% mit Convex-Boost.

**Morpho Vaults — Die moderne Lending-Aggregation (2024)**

Morpho Blue (behandelt in Modul 6) erlaubt das Deployment isolierter Lending-Märkte. Morpho Vaults sind die aggregierende Schicht darauf: ein Vault allokiert Kapital über mehrere Morpho-Blue-Märkte.

**Architektur:**
- Vaults werden von **Curators** betrieben (Institutionen wie Steakhouse Financial, Gauntlet, Re7)
- Jeder Kurator definiert eigene Risiko-Strategie
- Nutzer zahlt ein → Kurator allokiert über Märkte → Nutzer erhält Yield

**Beispiel-Vaults:**
- "Steakhouse USDC Vault": konservative Allokation auf gut-besicherte Märkte, ~5–7% APY
- "Re7 WETH Vault": WETH-Supply über mehrere ETH-Correlated-Märkte
- "Gauntlet USDC Prime": dynamische Allokation mit Risk-Management-Modelle

**Gebühren:**
- Performance Fee je nach Vault (typisch 10–20%)
- Kurator erhält diese als Kompensation

**Stärken:**
- Höhere Rendite als einfaches Aave/Compound-Supply (oft 1–2 Prozentpunkte mehr)
- Professionelle Kuratoren mit Risiko-Modellen
- Transparenz der Allokationen

**Schwächen:**
- Zusätzliches Kurator-Risiko (Entscheidungen könnten falsch sein)
- Morpho Blue selbst ist jünger als Aave/Compound
- Märkte können konzentrierter sein als gepoolte Aave-Märkte

**Für konservative Portfolios:** 10–20% der Stablecoin-Allokation in etablierten Morpho-Vaults (Steakhouse, Gauntlet) sind eine sinnvolle Rendite-Optimierung.

**Weitere relevante Aggregatoren**

- **Sommelier Finance:** Strategien-Vaults über mehrere Chains
- **Harvest Finance:** Einfache Yield-Optimierung
- **Beefy Finance:** Multi-Chain-Yield-Aggregation, sehr breit
- **Idle Finance:** Ähnlich zu Yearn

Für konservative Portfolios sind Yearn, Convex und Morpho Vaults die sinnvollen Haupt-Optionen.

**Das allgemeine Aggregator-Dilemma**

Alle Aggregatoren haben einen fundamentalen Trade-off:
- **Vereinfachung** und **höhere Rendite** (durch Optimierung)
- **Zusätzliches Risiko** (extra Smart-Contract-Ebene)
- **Gebühren** (die in die Rendite schneiden)

**Für konservative Portfolios sinnvoll:**
- Aggregatoren mit langer Track-Record und transparenter Strategie
- Gebühren, die die Rendite nicht dominieren
- Nicht als 100%-Allokation — immer als Teil einer Diversifikation

**Was zu vermeiden ist:**
- Neue oder experimentelle Aggregatoren ohne Track-Record
- Aggregatoren mit intransparenten Strategien
- Konzentration des gesamten Yield-Portfolios in einem einzigen Aggregator

### Slide Summary

**[Slide 1] — Titel**
Yield-Aggregatoren: Yearn, Convex, Morpho Vaults

**[Slide 2] — Aggregator-Prinzip**
Komplexe Strategien vereinfacht
Vault → Strategist → optimierte Allokation
Einfacher Zugang, professionelles Management

**[Slide 3] — Yearn Finance**
Seit 2020, etablierter Veteran
Dutzende Strategien
2% Management + 20% Performance Fee
Stablecoin-Vaults: 3–5% netto

**[Slide 4] — Convex Finance**
Curve-LP-Boost-Spezialist
1,5–2,5x Rendite-Boost durch veCRV-Pooling
Base Curve 3% + Convex → 4,5–7,5%

**[Slide 5] — Morpho Vaults**
Lending-Aggregation über Morpho-Blue-Märkte
Kuratoren wie Steakhouse, Gauntlet, Re7
5–7% APY auf Stablecoins

**[Slide 6] — Aggregator-Dilemma**
Vereinfachung + Rendite
Vs. zusätzliches Risiko + Gebühren

**[Slide 7] — Konservative Nutzung**
Etablierte Aggregatoren mit Track-Record
Nicht als 100%-Allokation
Transparent, diversifiziert

### Voice Narration Script

**[Slide 1]** Yield-Aggregatoren vereinfachen komplexe DeFi-Strategien. Statt manuell zwischen Protokollen zu rotieren, deponiert der Nutzer Kapital in einem Vault und der Aggregator verwaltet die Allokation. Diese Lektion behandelt die drei wichtigsten Typen.

**[Slide 2]** Das Aggregator-Prinzip. Du zahlst Asset ein, bekommst einen Vault-Token zurück. Ein Strategist betreibt die Sub-Strategien. Der Vault-Token repräsentiert deinen Anteil und wächst mit den Rendite-Einnahmen. Einfacher Zugang für Endnutzer, professionelles Management im Hintergrund.

**[Slide 3]** Yearn Finance, der Veteran seit 2020. Breite Palette an Vault-Strategien. Stablecoin-Rotation zwischen Lending-Protokollen, Curve-LP mit Convex-Boost, ETH-Staking-Strategien. Gebühren: 2 Prozent Management und 20 Prozent Performance Fee. Netto-Rendite auf Stablecoin-Vaults typisch 3 bis 5 Prozent. Längster Track-Record aller Aggregatoren.

**[Slide 4]** Convex Finance, der Curve-Spezialist. Curve-LPs können ihre Rendite durch veCRV boosten, aber veCRV erfordert 4 Jahre Lock-up — unflexibel. Convex poolt veCRV zentral und gibt allen Nutzern den Boost. Mechanik: du deponierst deinen Curve-LP-Token, Convex staked mit seinem veCRV-Pool, du bekommst Trading Fees plus geboostete CRV-Rewards plus CVX-Rewards. Typischer Boost: 1,5 bis 2,5 fache Rendite im Vergleich zu ungebondetem Curve-LP.

**[Slide 5]** Morpho Vaults sind die moderne Lending-Aggregation. Morpho Blue ist die Basis, Vaults die aggregierende Schicht. Kuratoren wie Steakhouse Financial, Gauntlet oder Re7 definieren Risiko-Strategien und allokieren Kapital. Stablecoin-Vaults erreichen 5 bis 7 Prozent APY — oft 1 bis 2 Prozentpunkte über einfachem Aave-Supply. Professionelles Risiko-Management mit Modellen.

**[Slide 6]** Das allgemeine Aggregator-Dilemma. Aggregatoren bieten Vereinfachung und oft höhere Rendite durch Optimierung. Sie fügen aber zusätzliches Risiko hinzu — eine extra Smart-Contract-Ebene — und erheben Gebühren, die in die Rendite schneiden. Der Trade-off ist individuell zu bewerten.

**[Slide 7]** Konservative Nutzung. Etablierte Aggregatoren mit langem Track-Record und transparenter Strategie. Nicht als 100-Prozent-Allokation — immer als Teil eines diversifizierten Portfolios. Vermeiden: neue oder experimentelle Aggregatoren, intransparente Strategien, Konzentration in einem einzigen Aggregator. Für konservative Portfolios typisch 20 bis 30 Prozent in Aggregator-Vaults, mit dem Rest direkt auf Basis-Protokollen.

### Visual Suggestions

**[Slide 1]** Titelfolie.

**[Slide 2]** Aggregator-Flussdiagramm: User → Vault → Multiple Strategies → Best Yield.

**[Slide 3]** **SCREENSHOT SUGGESTION:** Yearn.fi Vaults-Übersicht mit aktuellen APYs.

**[Slide 4]** Diagramm: Curve-LP → Convex → geboostete Rewards. **SCREENSHOT SUGGESTION:** Convex Finance Interface mit Boost-Anzeige.

**[Slide 5]** **SCREENSHOT SUGGESTION:** Morpho Vaults Übersicht mit Kurator-Profilen.

**[Slide 6]** Trade-off-Waage: Vorteile vs. Nachteile.

**[Slide 7]** Allokations-Kuchen mit 20-30% Aggregator-Anteil.

### Exercise

**Aufgabe: Aggregator-Vergleich**

1. Besuche yearn.fi und finde einen USDC-Vault. Notiere: APY, Strategie, TVL, Gebühren.
2. Besuche convexfinance.com und finde einen 3pool-Boost. Notiere: APR, Rewards-Quellen, Vergleich zu ungeboostedem Curve.
3. Besuche app.morpho.org und finde einen von Steakhouse kuratierten USDC-Vault. Notiere: APY, Risiko-Parameter, Kurator-Info.
4. Berechne die 1-Jahres-Rendite auf 10.000 USD in jedem Vault.
5. Vergleiche mit direktem USDC-Supply auf Aave V3.

**Deliverable:** Vergleichstabelle + persönliche Empfehlung: Welcher Aggregator wäre für 10.000 USD in einem konservativen Portfolio am sinnvollsten? Begründung.

### Quiz

**Frage 1:** Warum sind Yearn's Gebühren (2% Management + 20% Performance) für niedrig-Yield-Strategien problematisch?

<details>
<summary>Antwort anzeigen</summary>

Die Gebühren-Struktur funktioniert gut bei hohen Renditen, ist aber bei niedrigen Renditen strukturell ineffizient. Beispiel: Ein Vault erzielt 5% Brutto-Yield. 2% Management Fee werden auf das gesamte Kapital berechnet — das reduziert bereits den Brutto-Yield auf effektiv 3%. Wenn dann 20% Performance Fee auf die ursprünglichen 5% berechnet wird (1 Prozentpunkt), bleibt netto etwa 2%. Das ist weniger als direktes Aave-Supply (4%) erreichen würde. Die Gebühren-Struktur macht Yearn-Vaults für niedrig-Yield-Strategien unattraktiv. Sie sind sinnvoll bei Strategien mit 10%+ Yield, wo die absolute Fee-Last akzeptabel im Verhältnis zur Rendite ist. Für konservative Stablecoin-Supply-Strategien mit 4-6% Base-Rate ist direktes Supply auf Aave/Compound oder ein Morpho-Vault mit niedrigerer Gebührenstruktur meist besser. Das ist kein Defekt von Yearn — es ist Matching der Gebühren-Struktur an das Strategie-Segment. Yearn's Sweet Spot sind komplexere, höher-Yield-Strategien, nicht einfache Supply-Rotation.
</details>

**Frage 2:** Warum könnte ein konservativer Investor Morpho Vaults trotz der zusätzlichen Kurator-Ebene bevorzugen gegenüber direktem Morpho-Blue-Markt-Zugang?

<details>
<summary>Antwort anzeigen</summary>

Mehrere Gründe. Erstens: Markt-Auswahl-Expertise. Morpho Blue hat viele isolierte Märkte mit verschiedenen Parametern (Collateral-Typen, LLTV, Oracles). Die Auswahl der "richtigen" Märkte erfordert detaillierte Risiko-Analyse. Ein Kurator wie Steakhouse Financial hat Risiko-Modelle und kontinuierliches Monitoring — dem einzelnen Nutzer fehlt das. Zweitens: Diversifikation. Ein Vault allokiert über mehrere Märkte, während direkter Markt-Zugang oft Konzentration auf einen einzelnen Markt bedeutet. Wenn ein Markt Probleme hat (Oracle-Fehler, Collateral-Depeg), ist der Vault durch Diversifikation geschützt. Drittens: dynamisches Management. Der Kurator kann Allokationen basierend auf Marktbedingungen anpassen — ein direkter Nutzer müsste das manuell tun und würde Gas kosten. Viertens: Zeit-Einsparung. Konstantes Monitoring von Morpho-Blue-Märkten ist aufwendig. Der Kurator macht das im Auftrag der Vault-Nutzer. Gegenargument: die Kurator-Gebühr (10-20% Performance) schneidet in die Rendite, und der Kurator kann falsche Entscheidungen treffen. Trade-off: Aufwand + Kurator-Risiko vs. Eigenrecherche-Risiko. Für die meisten Retail-Nutzer überwiegt die Kurator-Expertise. Konservative Regel: für signifikante Morpho-Exposure einen etablierten Vault von einem renommierten Kurator nutzen, statt direkte Markt-Allokation.
</details>

---

## Lektion 9.6 — Konservative Yield-Strategien für das 7–8%-Ziel

### Learning Objectives

After completing this lesson the learner will be able to:
- Eine vollständige Yield-Strategie über mehrere Bausteine konstruieren
- Realistische Renditeerwartungen nach Portfolio-Allokation einschätzen
- Eine persönliche Yield-Strategie an eigene Präferenzen anpassen

### Explanation

Diese letzte Lektion bringt alle vorherigen Bausteine zusammen. Das Ziel: eine realistische, konservative Yield-Strategie mit ~7–8% Jahresrendite, unter Nutzung der verschiedenen in diesem und vorigen Modulen behandelten Primitives.

**Die ehrliche Einordnung**

Bevor wir Strategien konstruieren: ein klares Wort. Das 7–8%-Jahresziel ist:
- **Erreichbar** bei durchdachter Kombination mehrerer Strategien
- **Nicht garantiert** — Markt-Zyklen, Protokoll-Events und unvorhergesehene Risiken können das Ergebnis beeinflussen
- **Ein mittlerer Wert** — in Bear-Markets (wenn ETH fällt) kann die Gesamtrendite unter 7% liegen; in Bull-Markets deutlich darüber
- **Nicht durch eine einzelne Strategie erreichbar** — Diversifikation über Strategie-Typen ist notwendig

**Strategie A: Die Minimalist-Variante**

Einfachheit bevor Optimierung.

**Allokation (20.000 USD):**
- 40% USDC-Supply auf Aave V3: 8.000 USD @ 4%
- 30% wstETH via Lido: 6.000 USD @ 3,5% Yield + ETH-Exposure
- 20% sDAI via Spark: 4.000 USD @ 5%
- 10% Wallet-Reserve: 2.000 USD @ 0%

**Yield-Beitrag:**
- USDC: 320 USD
- wstETH: 210 USD (nur Staking-Yield)
- sDAI: 200 USD
- Gesamt: 730 USD = 3,65% annualisierte Yield-Rendite

**ETH-Preis-Beitrag (angenommen neutral bis +10% pro Jahr):**
- 0% → 0 USD
- +10% → 600 USD (10% von 6.000 wstETH)

**Gesamt-Rendite:**
- Bei neutralem ETH: 3,65%
- Bei +10% ETH: 6,65%
- Bei +30% ETH: 12,65%
- Bei −10% ETH: ~2,65%

**Bewertung:** Erreicht 7–8% nur bei ETH-Aufwärtsbewegung. In Bull-Markets natürlich erreichbar, in Bear-Markets deutlich darunter.

**Strategie B: Die Balanced-Variante**

Mehr Diversifikation, etwas mehr Komplexität.

**Allokation (20.000 USD):**
- 25% USDC-Supply auf Aave V3: 5.000 USD @ 4%
- 15% Morpho Blue USDC Vault (Steakhouse): 3.000 USD @ 6%
- 15% sDAI via Spark: 3.000 USD @ 5%
- 10% PT-USDC (6 Monate Fälligkeit): 2.000 USD @ 7% fixed
- 20% wstETH via Lido: 4.000 USD @ 3,5%
- 10% rETH via Rocket Pool: 2.000 USD @ 3,3%
- 5% Wallet-Reserve: 1.000 USD @ 0%

**Yield-Beitrag:**
- USDC-Aave: 200 USD
- Morpho-Vault: 180 USD
- sDAI: 150 USD
- PT-USDC: 140 USD
- wstETH: 140 USD
- rETH: 66 USD
- Gesamt: 876 USD = 4,4% Yield-Rendite

**Mit ETH-Bewegungs-Szenarien:**
- Neutrales ETH: 4,4%
- +10% ETH: 7,4%
- +20% ETH: 10,4%
- −10% ETH: 1,4%

**Bewertung:** Erreicht 7–8% bei ETH-Aufwärtsbewegung von 10%+. Solide Diversifikation.

**Strategie C: Die Yield-Maximierte Variante**

Höhere Yield-Komponente durch höher-verzinsliche Bausteine.

**Allokation (20.000 USD):**
- 20% USDC-Supply auf Aave V3: 4.000 USD @ 4%
- 15% Morpho Blue USDC Vault: 3.000 USD @ 6%
- 10% sDAI via Spark: 2.000 USD @ 5%
- 10% PT-sUSDe (6 Monate): 2.000 USD @ 12% fixed
- 15% Curve 3pool + Convex Boost: 3.000 USD @ 6%
- 15% weETH (EtherFi): 3.000 USD @ 4,5% + ETH-Exposure
- 10% rETH: 2.000 USD @ 3,3% + ETH-Exposure
- 5% Wallet-Reserve: 1.000 USD @ 0%

**Yield-Beitrag:**
- USDC-Aave: 160 USD
- Morpho: 180 USD
- sDAI: 100 USD
- PT-sUSDe: 240 USD
- Curve+Convex: 180 USD
- weETH: 135 USD (plus Restaking-Reward-Komponente)
- rETH: 66 USD
- Gesamt: 1.061 USD = 5,3% Yield-Rendite

**Mit ETH-Bewegung:**
- Neutral: 5,3%
- +10% ETH: 7,8%
- −10% ETH: 2,8%

**Bewertung:** Erreicht 7–8% bereits bei moderater ETH-Bewegung. Aber: höhere Komplexität (7 Positionen), mehr Monitoring-Aufwand, und sUSDe plus LRT-Exposure bringen zusätzliche Risiko-Ebenen.

**Welche Strategie für wen?**

**Strategie A — Minimalist:**
- Einsteiger
- Zeit-arme Nutzer (< 1h/Monat Management)
- Komplette Risiko-Aversion
- Akzeptiert 7–8% nur in Bull-Markets

**Strategie B — Balanced:**
- Mittlere Erfahrung
- Moderates Zeit-Budget (2–3h/Monat)
- Ausgewogene Risiko-Bereitschaft
- Zielt auf robuste 4–7% Baseline plus ETH-Aufwärts-Optionalität

**Strategie C — Yield-Maximiert:**
- Fortgeschrittene Nutzer
- Höheres Zeit-Budget (5+ h/Monat)
- Bereit, Komplexitäts-Risiken für Rendite zu akzeptieren
- Besseres Erreichen des 7–8% Ziels in allen Marktphasen

**Die wichtigsten Regeln unabhängig von der Strategie**

1. **Diversifikation über Protokolle:** Keine Position sollte >30% des Portfolios sein.
2. **Diversifikation über Mechanismen:** Mix aus Lending, Staking, LP, Fixed Yield.
3. **Reserve halten:** Mindestens 5–10% in leicht zugänglicher Form.
4. **Monatliches Monitoring:** Portfolio-Check, News, Rebalancing.
5. **Exit-Trigger definieren:** Klare Schwellen, wann Positionen aufgelöst werden.
6. **Realistische Erwartungen:** 7–8% ist Ziel, nicht Garantie.

**Rebalancing und Anpassung**

Konservative Yield-Strategien sind nicht "set and forget". Quartalsweise Rebalancing-Prüfung:

**Quartalsweise Review:**
- Ist eine einzelne Position über 35% gewachsen? Umschichten.
- Haben sich APYs signifikant verschoben? Eventuelle Umschichtungen prüfen.
- Gab es Protokoll-Events, die Risiko-Bewertungen verändert haben?
- Passt das Portfolio zur aktuellen Lebens-Situation (Zeit-Budget, Kapital-Bedarf)?

**Jährliche Strategie-Revision:**
- Erreicht die Strategie die Rendite-Ziele über die letzten 12 Monate?
- Sind neue Bausteine aufgetaucht, die sinnvoll zu integrieren sind?
- Haben sich Markt-Strukturen verändert, die andere Allokationen erfordern?

**Der Bär-Markt-Test**

Jede Strategie sollte den "Bär-Markt-Test" bestehen: Wie sieht das Portfolio aus, wenn ETH 50% fällt über 12 Monate?

**Strategie A im Bär-Markt:**
- wstETH-Position: −50% auf Preis, +3,5% Yield-Kompensation → netto −46,5% auf 30%-Anteil
- Stablecoin-Positionen: stabil, etwa +4,5% auf 60%-Anteil
- Gesamt-Portfolio: ca. −11%

**Strategie B im Bär-Markt:**
- ETH-Exposition: 30% mit wstETH+rETH, −50% auf Preis, +3,5% Yield → netto −46,5% auf diesem Anteil
- Stablecoin-Positionen: stabil, etwa +5% auf 65%-Anteil
- Gesamt-Portfolio: ca. −11%

**Strategie C im Bär-Markt:**
- ETH-Exposition: 25% über wstETH+rETH+weETH, −50% mit Yield-Kompensation
- Stablecoin-Positionen: stabil
- Gesamt-Portfolio: ca. −10%

Alle drei Strategien sind im Bär-Markt strukturell robust, aber nicht negativ-null-setting. Das ist die Realität: Portfolios mit ETH-Exposition verlieren in ETH-Bär-Markets Wert, unabhängig von den Yield-Strategien. Der Unterschied zu konzentrierten Portfolios: konservativer Yield-Mix begrenzt die Verluste deutlich.

### Slide Summary

**[Slide 1] — Titel**
Konservative Yield-Strategien für das 7–8%-Ziel

**[Slide 2] — Die ehrliche Einordnung**
7–8% erreichbar, nicht garantiert
Durchschnitt, nicht konsistent
Erfordert Diversifikation, nicht Einzel-Strategie

**[Slide 3] — Strategie A: Minimalist**
40% USDC, 30% wstETH, 20% sDAI, 10% Reserve
Yield 3,65%, 7–8% nur bei ETH-Aufwärts

**[Slide 4] — Strategie B: Balanced**
Mix aus 6 Positionen
Yield 4,4%, 7–8% bei moderatem ETH-Anstieg

**[Slide 5] — Strategie C: Yield-Maximiert**
7 Positionen inklusive PT und LRT
Yield 5,3%, 7–8% bereits bei geringer ETH-Bewegung
Höhere Komplexität

**[Slide 6] — Nutzer-Profile**
A: Einsteiger, zeit-arm
B: mittlere Erfahrung
C: fortgeschritten, höheres Zeit-Budget

**[Slide 7] — Die 6 Regeln**
Diversifikation Protokolle, Mechanismen, Reserve, Monatlich monitoren, Exit-Trigger, realistisch

**[Slide 8] — Bär-Markt-Test**
ETH −50% → Portfolio ca. −10 bis −11%
Strukturell robust, aber nicht null-Verlust

### Voice Narration Script

**[Slide 1]** Die letzte Lektion dieses Moduls. Wir bringen alle Bausteine zusammen zu realistischen, konservativen Yield-Strategien. Keine abstrakte Theorie — konkrete Allokationen mit Zahlen.

**[Slide 2]** Die ehrliche Einordnung zuerst. Das 7 bis 8 Prozent Jahresziel ist erreichbar, aber nicht garantiert. Es ist ein Durchschnittswert, kein konsistentes Monatsergebnis. In Bear-Markets fällt es unter 7 Prozent, in Bull-Markets deutlich darüber. Und wichtig: es ist nicht durch eine einzelne Strategie erreichbar — Diversifikation über Strategie-Typen ist notwendig.

**[Slide 3]** Strategie A, die Minimalist-Variante. 40 Prozent USDC-Supply auf Aave, 30 Prozent wstETH via Lido, 20 Prozent sDAI via Spark, 10 Prozent Wallet-Reserve. Yield-Rendite etwa 3,65 Prozent. Das 7 bis 8 Prozent Ziel wird hier nur erreicht, wenn ETH im Jahr 10 Prozent oder mehr steigt. In neutralen oder fallenden Markt-Phasen bleibt die Gesamt-Rendite unter dem Ziel. Einfachste Strategie, geringste Komplexität.

**[Slide 4]** Strategie B, die Balanced-Variante. Sechs Positionen über Aave, Morpho Blue Vault, sDAI, PT-USDC auf Pendle, wstETH und rETH. Yield-Rendite etwa 4,4 Prozent. 7 bis 8 Prozent werden bei moderatem ETH-Anstieg von 10 Prozent erreicht. Solide Diversifikation, mittlere Komplexität.

**[Slide 5]** Strategie C, die Yield-Maximierte Variante. Sieben Positionen inklusive PT-sUSDe, Curve-Convex-LP und weETH als LRT. Yield-Rendite etwa 5,3 Prozent. 7 bis 8 Prozent werden bereits bei geringer ETH-Bewegung erreicht. Aber: höhere Komplexität mit mehr Monitoring-Aufwand und zusätzlichen Risiko-Ebenen durch sUSDe und LRT-Exposure.

**[Slide 6]** Welche Strategie passt zu welchem Nutzer. A für Einsteiger und zeit-arme Nutzer unter einer Stunde Management pro Monat. B für mittlere Erfahrung und 2 bis 3 Stunden pro Monat. C für fortgeschrittene Nutzer mit 5 oder mehr Stunden pro Monat. Die Wahl ist individuell — es gibt keine objektiv beste Option.

**[Slide 7]** Sechs Regeln unabhängig von der Strategie. Diversifikation über Protokolle — keine Position über 30 Prozent. Diversifikation über Mechanismen — Mix aus Lending, Staking, LP, Fixed Yield. Reserve halten, mindestens 5 bis 10 Prozent. Monatliches Monitoring. Exit-Trigger klar definiert. Und realistische Erwartungen — 7 bis 8 Prozent ist Ziel, nicht Garantie.

**[Slide 8]** Der Bär-Markt-Test. Wenn ETH 50 Prozent fällt über 12 Monate, alle drei Strategien zeigen ähnliche Verluste von etwa 10 bis 11 Prozent. Das ist strukturell robust, aber kein Null-Verlust. Portfolios mit ETH-Exposure verlieren in Bär-Markets Wert — das ist unvermeidlich. Der Unterschied zu konzentrierten Portfolios: der konservative Mix begrenzt die Verluste deutlich.

### Visual Suggestions

**[Slide 1]** Titelfolie.

**[Slide 2]** Realismus-Dreieck: Ziel, Durchschnitt, Diversifikation als drei notwendige Säulen.

**[Slide 3]** Kuchendiagramm Strategie A mit Rendite-Bereichen je Marktszenario.

**[Slide 4]** Kuchendiagramm Strategie B mit Rendite-Bereichen.

**[Slide 5]** Kuchendiagramm Strategie C mit Rendite-Bereichen.

**[Slide 6]** Drei-Profile-Tabelle mit Empfehlung.

**[Slide 7]** Sechs-Regeln-Checkliste.

**[Slide 8]** Bär-Markt-Stress-Test-Tabelle.

### Exercise

**Aufgabe: Persönliche Yield-Strategie konstruieren**

Entwirf deine persönliche Yield-Strategie:

1. **Eigene Parameter:**
   - Kapital-Rahmen
   - Risiko-Toleranz (1–10)
   - Zeit-Budget pro Monat
   - Persönliche Rendite-Ziele

2. **Strategie-Wahl:**
   - A, B, oder C als Ausgangspunkt
   - Oder eigene Mischung

3. **Konkrete Allokation:**
   - Prozent-Aufteilung
   - Geplante Protokolle
   - Erwartete Rendite pro Position

4. **Monitoring-Plan:**
   - Frequenz
   - Was geprüft wird
   - Rebalancing-Trigger

5. **Bär-Markt-Analyse:**
   - Was passiert bei ETH −30%?
   - Was bei ETH −50%?
   - Bist du psychisch darauf vorbereitet?

6. **Realistische 12-Monats-Erwartung:**
   - Bei neutralem Markt
   - Bei moderatem Bull-Markt
   - Bei moderatem Bear-Markt

**Deliverable:** Strategie-Dokument (2–3 Seiten) mit allen sechs Punkten strukturiert adressiert.

### Quiz

**Frage 1:** Warum ist die Aussage "Strategie C bringt 5,3% Yield, also ist sie besser als Strategie A mit 3,65%" irreführend?

<details>
<summary>Antwort anzeigen</summary>

Die reine Yield-Zahl ignoriert mehrere wichtige Faktoren. Erstens: Risiko-Adjustierung. Strategie C erreicht die höhere Rendite durch zusätzliche Risiko-Schichten — sUSDe mit Ethena-spezifischen Risiken, LRT mit Restaking-Komplexität, mehr Protokoll-Abhängigkeiten. Die zusätzlichen 1,65 Prozentpunkte Yield kompensieren diese zusätzlichen Risiken, garantieren aber nicht besseren risk-adjusted return. Zweitens: Zeit-Aufwand. Strategie C erfordert 5+ Stunden pro Monat; Strategie A unter 1 Stunde. Wenn der Zeit-Aufwand den Rendite-Vorteil nicht wert ist, ist A besser. Drittens: Robustheit unter Stress. In Extrem-Ereignissen (wie dem Juni-2022-stETH-Depeg oder hypothetischen sUSDe-Problemen) verliert Strategie C möglicherweise mehr als A, weil mehr Komponenten stress-exponiert sind. Viertens: Psychologische Komponente. Eine komplexere Strategie führt eher zu Fehlentscheidungen unter Stress (Panic-Entscheidungen, Fehler beim Rebalancing). Einfache Strategien sind leichter konsistent umzusetzen. "Besser" hängt vom Nutzer ab — Zeit, Risiko-Toleranz, Expertise, psychologische Robustheit. Die reine Yield-Zahl ist nur ein Faktor unter vielen.
</details>

**Frage 2:** Warum sollte jede konservative Yield-Strategie einen Bär-Markt-Test bestehen, auch wenn die primären Rendite-Erwartungen für neutrale oder positive Märkte gelten?

<details>
<summary>Antwort anzeigen</summary>

Weil Bär-Markts der Stresstest für jede Strategie sind und die Zeit, in der schlechte Entscheidungen passieren. Drei Gründe. Erstens: reale Szenarien. Krypto hat 2-3 große Bärmärkte pro Dekade mit 50-80% Drawdowns. Das ist keine Ausnahme, sondern Normalfall. Eine Strategie muss das überleben können. Zweitens: psychologische Vorbereitung. Wer in Panik reagiert — Positionen am Tiefpunkt verkauft, überhastet umschichtet — realisiert die temporären Verluste permanent. Wer vorher durchrechnet "bei ETH −50%, was passiert mit meinem Portfolio" ist mental besser vorbereitet und reagiert rationaler. Das ist keine Theorie — historische Daten zeigen, dass Panic-Verkäufe am Tiefpunkt einer der Haupttreiber permanenter Verluste sind. Drittens: Portfolio-Validierung. Wenn der Bär-Markt-Test zeigt, dass die Strategie −30% Portfolio-Wert bringt, aber der Nutzer das nicht akzeptieren kann, ist die Strategie falsch konstruiert. Entweder ETH-Exposition reduzieren (mehr Stables), oder andere Hedging-Strategien einfügen. Besser jetzt korrigieren als im Bär-Markt panisch reagieren. Konservativer Ansatz: jede neue Allokation durch einen Bär-Markt-Test laufen lassen. Die Frage "kann ich das emotional und finanziell aushalten?" ist wichtiger als die Frage "welche Rendite bringt das in Bull-Markets?".
</details>

---

## Modul-Abschluss-Quiz

Fünf Fragen zum integrierten Verständnis von Modul 9.

**Frage 1:** Vergleiche Solo-Staking, Liquid Staking und Restaking nach Rendite, Risiko-Komplexität und praktischer Zugänglichkeit für einen Retail-Nutzer mit 10.000 USD ETH-Exposure.

<details>
<summary>Antwort anzeigen</summary>

Solo-Staking: 3,5–5% Rendite. Nicht zugänglich bei 10.000 USD Exposure (erfordert 32 ETH ≈ 96.000 USD). Technisch komplex, aber Risiko-Struktur relativ einfach (nur Ethereum-Staking-Risiken). Für 10.000 USD praktisch ausgeschlossen. Liquid Staking: 3,2–4,5% Rendite nach Gebühren. Voll zugänglich ab wenigen USD. Mittlere Risiko-Komplexität (Ethereum-Staking + Liquid-Staking-Protokoll-Risiko + LST-Depeg-Risiko). Einfach einzurichten und zu verwalten. Für konservative Nutzer typisch die beste Wahl. Restaking: 4–5% nachhaltige Rendite plus spekulative Points. Voll zugänglich. Hohe Risiko-Komplexität (bis zu 8 Risiko-Schichten). Relativ jung, weniger Track-Record. Für konservative Portfolios als kleiner Bestandteil (20-30% der ETH-Exposure) sinnvoll, nicht als Hauptallokation. Für 10.000 USD ETH-Exposure: 70-80% Liquid Staking (aufgeteilt über Lido und Rocket Pool), optional 20-30% in einem etablierten LRT für moderate Rendite-Optimierung. Die zusätzliche Rendite vom Restaking rechtfertigt die erhöhte Komplexität nur teilweise — die Hauptposition bleibt Liquid Staking.
</details>

**Frage 2:** Ein Anleger mit 30.000 USD möchte konservativ 7% Rendite erzielen. Er zögert zwischen "100% Stablecoin-Strategien" und einer "diversifizierten Strategie mit 25% ETH-Exposition". Wie sollte er rational entscheiden?

<details>
<summary>Antwort anzeigen</summary>

100% Stablecoin-Strategien können in der aktuellen Markt-Umgebung realistisch 4-6% erreichen, bei sehr konservativer Ausführung eher 4-5%. Das erreicht das 7%-Ziel typisch nicht. Vorteil: keine ETH-Preis-Volatilität, Portfolio-Wert konstant. Nachteil: Opportunitäts-Kosten, wenn ETH steigt; Inflation kann reale Rendite erodieren. Diversifizierte Strategie mit 25% ETH-Exposition erreicht 4-5% Basis-Yield plus ETH-Bewegungs-Komponente. In neutralen oder positiven Markt-Phasen sind 7-9% realistisch. In Bear-Markets fällt die Rendite, das Portfolio kann temporär -10% bis -15% zeigen. Die rationale Entscheidung hängt von drei Faktoren ab. Erstens: Zeithorizont. Wenn das Kapital über 3+ Jahre investiert ist, rechtfertigt die ETH-Exposition bei langfristiger Aufwärts-Erwartung die Volatilität. Wenn in 12 Monaten verfügbar nötig, ist pure Stablecoin besser. Zweitens: psychologische Toleranz. Kann der Anleger temporäre -10%+ Drawdowns aushalten, ohne panische Entscheidungen zu treffen? Wenn nicht, ist pure Stablecoin besser, auch wenn mathematisch suboptimal. Drittens: Inflations-Sicht. Wenn der Anleger Inflation als zentrales Risiko sieht, bringt ETH als "hartes Asset" einen gewissen Hedge — Stablecoins verlieren real an Wert bei Inflation. Empfohlene Lösung für die meisten Nutzer: Mittelweg, nicht Extreme. Zum Beispiel 75% Stablecoin-Strategien und 25% ETH-Exposition. Das erreicht 5-6% in neutralen Märkten, 7-9% in Bull-Märkten, und -5% bis -8% in schweren Bear-Märkten — gut diversifiziert über Szenarien.
</details>

**Frage 3:** Warum ist Pendle's PT ein besonders interessanter Baustein für konservative Portfolios trotz der zusätzlichen Komplexität?

<details>
<summary>Antwort anzeigen</summary>

Drei Hauptgründe. Erstens: Fixed Yield in einer Welt variable Yields. Fast alle DeFi-Renditen sind variable — sie schwanken mit Utilization, Markt-Bedingungen, Reward-Programmen. Pendle's PT gibt berechenbare Renditen für einen definierten Zeitraum. Das ist wertvoll für Planungs-Zwecke, besonders wenn der Anleger das Kapital für einen bekannten Zeithorizont einsetzt. Zweitens: Hedging von Yield-Volatilität. sUSDe's variable APY kann stark schwanken (5-25%). Wer sUSDe-Exposition will, aber ohne die Volatilitäts-Komponente, kann PT-sUSDe kaufen und einen Fixed Rate einfrieren. Das reduziert das Gesamt-Risiko der Position. Drittens: Rendite-Arbitrage-Möglichkeiten. In Zeiten, in denen der Markt Fixed Rates über dem langfristig erwarteten Durchschnitt preist, bietet PT überdurchschnittlichen Risk-adjusted Return. Wichtig: PT ist nicht "besser" oder "schlechter" als variable Yields — es ist ein anderes Instrument mit anderem Risikoprofil. Für konservative Portfolios, die Planbarkeit schätzen, ist PT ein sinnvoller Baustein. Für Portfolios, die Flexibilität über Planbarkeit stellen, sind variable Positionen besser. Die Komplexität ist gerechtfertigt, wenn der Nutzer das spezifische Feature (Fixed Yield) tatsächlich nutzt — nicht wenn er PT nur "irgendwie in der Mischung hat".
</details>

**Frage 4:** Ein Anleger hat seine gesamte Yield-Strategie auf Yearn Finance mit einem einzigen yvUSDC-Vault aufgebaut. Welche fundamentalen Schwächen hat das?

<details>
<summary>Antwort anzeigen</summary>

Mehrere Probleme. Erstens: Konzentriertes Protokoll-Risiko. 100% auf Yearn — ein Yearn-spezifischer Hack, Smart-Contract-Bug oder Governance-Krise trifft das gesamte Kapital. Yearn hat historisch mehrere Incidents gehabt. Selbst ohne Hack: wenn Yearn Probleme hat, ist das Kapital möglicherweise nicht schnell abziehbar. Zweitens: Gebühren-Belastung. Yearn's 2% Management + 20% Performance Fee schneidet signifikant in die Rendite. Bei einer Brutto-Rendite von 5% bleibt netto etwa 2,5-3%. Das ist weniger als direkter Aave-Supply (4%). Für reine Stablecoin-Supply-Strategien ist Yearn oft unterlegen. Drittens: Strategien-Intransparenz. Der Strategist entscheidet die Allokation — wenn er in Sub-Protokolle mit Problemen umschichtet (z.B. in Curve-Pools kurz vor einem Hack), trägt der yvUSDC-Halter das Risiko, ohne es direkt kontrollieren zu können. Viertens: kein Yield-Typ-Diversifikation. Alles ist Lending-basiert via Yearn's Strategien. Keine Staking-Komponente, keine Fixed-Yield-Komponente, keine direkte Asset-Exposition. Fünftens: keine Chain-Diversifikation. Alles auf einer Chain. Bessere Struktur: 40% direktes Aave V3 USDC-Supply, 20% Morpho Blue USDC Vault (Kurator-basiert, nicht Yearn), 20% sDAI via Spark, 10% yvUSDC als Diversifikations-Teil, 10% Wallet-Reserve. Diversifiziert über Protokolle, Kuratoren und Yield-Typen. Die Yearn-Allokation ist 10% — signifikant, aber nicht dominant.
</details>

**Frage 5:** Du hast 40.000 USD für eine 3-Jahre-Anlage und willst 7-8% annualisiert erreichen. Skizziere eine realistische Allokation über die in diesem Modul behandelten Strategien.

<details>
<summary>Antwort anzeigen</summary>

Eine ausgewogene Allokation könnte sein: 30% (12.000 USD) Stablecoin-Lending-Mix: 6.000 Aave V3 USDC, 4.000 Morpho Blue USDC Vault (Steakhouse), 2.000 sDAI. Erwartung: 5% APY = 600 USD/Jahr. 15% (6.000 USD) Pendle Fixed-Yield: 3.000 PT-USDC (6 Monate, 8% fixed) rollend über die 3 Jahre, 3.000 PT-sUSDe (kleine Position). Erwartung: ~8% fixed = 480 USD/Jahr. 15% (6.000 USD) Curve 3pool mit Convex-Boost. Erwartung: 6% APY = 360 USD/Jahr. 20% (8.000 USD) wstETH via Lido. Erwartung: 3,5% Yield + ETH-Preis-Komponente. Absolut: 280 USD/Jahr Yield + ETH-Exposure. 10% (4.000 USD) rETH via Rocket Pool als Diversifikation. Erwartung: 3,3% + ETH-Exposure. Absolut: 132 USD/Jahr Yield. 5% (2.000 USD) weETH (LRT) als moderate Yield-Boost mit Restaking. Erwartung: 4,5% + ETH + Restaking-Rewards. Absolut: 90 USD/Jahr. 5% (2.000 USD) Wallet-Reserve für Notfälle. Yield-Gesamtsumme: etwa 1.940 USD/Jahr = 4,85% annualisiert. ETH-Exposure: 30% des Portfolios (wstETH + rETH + weETH). Bei neutraler ETH-Performance über 3 Jahre: 4,85% × 3 = 14,6% = 5.800 USD. Bei +30% ETH-Performance über 3 Jahre: zusätzlich 30% × 12.000 USD = 3.600 USD Preis-Gewinn. Gesamt: 9.400 USD / 40.000 USD / 3 Jahre = ~7,8% annualisiert. Bei -30% ETH: zusätzlich -3.600 USD. Gesamt: 2.200 USD / 40.000 / 3 Jahre = ~1,8%. Bär-Markt-Drawdown: bei ETH -50% temporär: Portfolio-Wert ca. 34.000 USD = -15%. Das sind realistische Szenarien. Das 7-8%-Ziel wird in neutralen bis positiven Markt-Phasen erreicht. In Bear-Markets wird es deutlich unterschritten, aber das Portfolio bleibt strukturell robust. Die Strategie erfordert etwa 3-5 Stunden Management pro Monat.
</details>

---

## Modul-Zusammenfassung

Du hast in Modul 9 die verschiedenen Yield-Strategien systematisch verstanden:

**Ethereum Staking:** Seit dem Merge läuft Ethereum auf PoS. Basis-Staking bringt 3-5% APR aus zwei Quellen: Consensus-Layer-Rewards und Execution-Layer-Rewards (Fees + MEV). Solo-Staking erfordert 32 ETH, Liquid Staking hat keine Mindest-Hürde.

**Liquid Staking:** Lido (stETH/wstETH) ist Marktführer mit ~30% aller gestakten ETH. Rocket Pool (rETH) ist dezentraler mit permissionless Operators. Frax (sfrxETH) bietet Yield-optimiertes Design. Konservative Empfehlung: 60% Lido + 25% Rocket Pool + 15% Direkt-ETH-Reserve.

**Restaking und LRTs:** EigenLayer ermöglicht es, gestaktes ETH für zusätzliche Protokolle (AVS) zu sichern. LRTs wie EtherFi weETH, Renzo ezETH vereinfachen den Zugang. Acht Risiko-Schichten bei LRTs. Moderater Rendite-Vorteil (1-2 Prozentpunkte) bei deutlich erhöhter Komplexität. Für konservative Portfolios max. 20-30% der ETH-Exposition.

**Pendle und Fixed Yield:** PT (Principal Token) ermöglicht garantierte Renditen über definierte Zeiträume. Typische Fixed-Rates 5-10% auf Stablecoin- und Staking-Assets. Sinnvoll für Kapital mit bekanntem Zeithorizont und zur Yield-Volatilitäts-Reduktion.

**Yield-Aggregatoren:** Yearn (klassisch, hohe Gebühren), Convex (Curve-Boost-Spezialist), Morpho Vaults (moderne Kurator-basierte Lending-Aggregation). Für konservative Portfolios sinnvoll als diversifizierter Baustein, nicht als 100%-Allokation.

**Konservative Strategien für 7-8%:** Drei Ansätze — Minimalist (3,65% Yield, einfach), Balanced (4,4%, mittlere Komplexität), Yield-Maximiert (5,3%, hohe Komplexität). Keine Strategie erreicht 7-8% allein aus Yield — das Ziel wird durch ETH-Preis-Komponente in positiven Markt-Phasen erreicht.

**Kern-Botschaft:** 7-8% Jahresrendite ist erreichbar durch durchdachte Kombination mehrerer Yield-Strategien, aber niemals durch eine einzelne Strategie. Diversifikation über Protokolle, Mechanismen und Zeit-Horizonte ist nicht Optimierung, sondern Voraussetzung.

**Was in Modul 10 kommt:** Leverage-Loops. Die mächtigste und riskanteste Yield-Strategie in DeFi. Wie man mit Borrow-Mechanik Renditen verstärken kann, warum das konservativ anwendbar ist (aber nur mit klaren Regeln), und wann Leverage-Loops für das 7-8%-Ziel nicht nötig sind.

---

*Ende von Modul 9.*
