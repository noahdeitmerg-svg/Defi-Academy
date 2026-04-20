# Modul 11 — MEV (Maximal Extractable Value)

**Zielgruppe:** Fortgeschrittene
**Geschätzte Dauer:** 90–110 Minuten
**Voraussetzungen:** Module 1–10 abgeschlossen (insbesondere Modul 4 DEX-Mechanik)

**Kursstufe:** Advanced (Infrastruktur & Blockchain-Ökonomie)
**Lektionsanzahl:** 6
**Didaktische Ausrichtung:** MEV-Typen, Supply Chain, Sandwich-Angriffe, Schutzmaßnahmen, Protokoll-Mitigation
**Konformität:** Final Fix Document v1 — Struktur, Terminologie und Pipeline-Assets harmonisiert

**Harmonisierte Terminologie (gültig im gesamten Modul):**
- Maximal Extractable Value (MEV), Extractable Value
- MEV Supply Chain: Searcher → Builder → Proposer
- Proposer-Builder-Separation (PBS)
- Sandwich Attack, Front-Running, Back-Running
- Private Mempools, MEV-Blocker, Flashbots Protect
- Intent-basierte Systeme (CoW Swap, UniswapX)
- Smart Contract Risk, Slippage, Price Impact

**Querverweise:**
- MEV Supply Chain und Sandwich-Attack-Mechanik sind modulspezifische Fix-Doc-Erweiterungen und werden in Lektion 11.3 und 11.4 explizit mit Diagrammen und Flow-Charts aufbereitet.
- Die DEX-Grundlagen (Modul 4) und Liquidity-Pool-Mechanik (Modul 5) sind Voraussetzung für das Verständnis von Sandwich-Angriffen.
- Flash Loans als Werkzeug für MEV werden in Modul 12 detailliert behandelt.

**Video-Pipeline:** Jede Lektion ist für Gamma (Folien) → ElevenLabs (Voice) → CapCut (Video) vorbereitet. Zielvideo-Länge pro Lektion: 8–10 Minuten (120–140 WPM).

---

## Modul-Überblick

MEV — Maximal Extractable Value — ist eine der wichtigsten unsichtbaren Kräfte in DeFi. Jeder, der eine Transaktion auf Ethereum oder einer anderen EVM-Chain abschickt, ist davon betroffen, meist ohne es zu merken. In den letzten Jahren wurden Milliarden USD an Wert über MEV extrahiert — teilweise aus legitimen Arbitrage-Operationen, teilweise durch direktes Abgreifen von Gewinnen normaler Nutzer.

Dieses Modul erklärt MEV systematisch:
- Wie die Mempool-Dynamik funktioniert
- Welche MEV-Typen existieren und wie sie Nutzer betreffen
- Wie die moderne MEV-Supply-Chain aus Searchers, Builders, Relays und Validators aufgebaut ist
- Wie Sandwich-Angriffe technisch ablaufen
- Welche Tools und Strategien echten Schutz bieten
- Wie sich die MEV-Landschaft durch Protokoll-Level-Lösungen entwickelt

Der konservative Fokus dieses Moduls liegt auf **Schutz**: MEV ist ein versteckter Kostenfaktor, und wer ihn nicht kennt, zahlt ihn regelmäßig. Das Ziel ist nicht, MEV-Searcher zu werden — sondern die Tools und Praktiken zu beherrschen, die den MEV-Zoll auf deine eigenen Transaktionen minimieren.

**Lektionen:**
1. Was MEV eigentlich ist
2. Die wichtigsten MEV-Typen
3. Die MEV-Supply-Chain nach PBS
4. Sandwich-Angriffe im Detail
5. Praktischer Schutz: Private Mempools und Intent-basierte Systeme
6. MEV-Mitigation auf Protokoll-Ebene und Zukunftsausblick

---

## Lektion 11.1 — Was MEV eigentlich ist

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Den Begriff MEV präzise definieren und von verwandten Konzepten abgrenzen
- Die Rolle des Mempools als "Wartezone" für Transaktionen verstehen
- Erklären, warum Transaktions-Reihenfolge auf Blockchains monetarisierbar ist
- MEV von regulärer Blockspace-Monetarisierung (Gas Fees, Priority Fees) klar unterscheiden
- Die historische Entwicklung von MEV (PoW → PoS → PBS) nachvollziehen
- Eine typische Ethereum-Transaktion in ihrem Lebenszyklus vom Wallet über den Mempool bis zum Block verfolgen

### Erklärung

**MEV** stand ursprünglich für "Miner Extractable Value" — der Wert, den ein Miner über die regulären Block-Rewards und Gebühren hinaus extrahieren kann, indem er die Transaktions-Reihenfolge in einem Block manipuliert. Nach dem Wechsel von Ethereum zu Proof-of-Stake wurde der Begriff zu "Maximal Extractable Value" umformuliert — er umfasst jetzt alle Teilnehmer, die auf die Block-Erstellung Einfluss nehmen können.

**Die zentrale Erkenntnis:** Auf einer Blockchain ist die **Reihenfolge** der Transaktionen in einem Block genauso wertvoll wie der Inhalt. Wer die Reihenfolge kontrolliert, kann Gewinne einstreichen, die normalerweise an normale Nutzer gehen würden.

**Der Mempool: die öffentliche Wartezone**

Um MEV zu verstehen, muss man den Mempool kennen. Wenn du eine Transaktion auf Ethereum abschickst (z.B. einen Swap auf Uniswap), passiert Folgendes:

1. **Deine Wallet signiert die Transaktion** mit deinem privaten Schlüssel
2. **Die Transaktion wird an einen Ethereum-Node gesendet** (z.B. über Infura, Alchemy oder einen eigenen Node)
3. **Der Node broadcastet die Transaktion** an das gesamte Peer-to-Peer-Netzwerk
4. **Die Transaktion landet im Mempool** — einer öffentlich einsehbaren Liste aller ausstehenden Transaktionen
5. **Block-Proposer (oder Builder) wählen Transaktionen** aus dem Mempool und packen sie in den nächsten Block
6. **Der Block wird veröffentlicht** — die Transaktionen sind ausgeführt

**Das entscheidende Detail:** zwischen Schritt 4 und Schritt 5 ist deine Transaktion **öffentlich sichtbar, aber noch nicht ausgeführt**. Das ist das Zeitfenster — typisch 1-12 Sekunden auf Ethereum — in dem MEV extrahiert werden kann.

Jeder kann den Mempool beobachten. Es gibt Tools wie `mempool.space` (für Bitcoin) oder `blocknative.com`, die den Ethereum-Mempool live zeigen. Searcher-Bots scannen den Mempool kontinuierlich, oft tausende Male pro Sekunde, nach profitablen Gelegenheiten.

**Warum ist Reihenfolge monetarisierbar?**

Angenommen, du willst 10 ETH auf Uniswap gegen USDC swappen. Dein Swap ist groß genug, um den ETH-Preis im Pool um 1% zu bewegen (weil die AMM-Kurve durch deine Aktion verschoben wird). Jetzt gibt es drei Reihenfolge-Möglichkeiten:

**Fall 1 (fair):** Deine Transaktion kommt isoliert — der Preis bewegt sich durch deinen Trade, niemand anders profitiert

**Fall 2 (Front-Running):** Ein Searcher sieht deine große Transaktion im Mempool, platziert einen eigenen Kauf **vor** deinem Swap (höhere Gas-Priorität), dein Swap bewegt den Preis nach oben, der Searcher verkauft danach mit Profit — auf deine Kosten

**Fall 3 (Back-Running):** Ein Searcher platziert einen Trade **nach** deinem Swap, der einen Preis-Unterschied zwischen Pools ausgleicht (Arbitrage), den dein Trade geschaffen hat. Das ist meist unschädlich für dich — der Arbitrage-Gewinn entsteht aus der Preis-Differenz zu anderen DEXs

Die Reihenfolge der Transaktionen im Block bestimmt, wer welche Gewinne einstreicht. Der Block-Proposer kontrolliert diese Reihenfolge — und kann sie entweder selbst nutzen oder an Searcher verkaufen.

**MEV ist keine einzelne Aktivität — es ist ein Markt**

In den frühen Jahren von Ethereum (2017-2019) war MEV hauptsächlich von Minern selbst extrahiert. Nach 2019 entstand ein komplexes Ökosystem: Searcher-Firmen mit spezialisierten Bots, Block-Builder, die optimale Transaktions-Bündel zusammenstellen, Relay-Services, die Bundles an Proposer weiterleiten. Wir behandeln diese Struktur detailliert in Lektion 11.3.

**Die historische Größe des MEV-Markts**

Geschätzte Werte (stark vereinfacht, über alle Zeiten hinweg):
- **2020:** ~300 Mio. USD extrahiertes MEV
- **2021:** ~1 Mrd. USD (Bull-Markt-Peak)
- **2022:** ~500 Mio. USD
- **2023-2024:** ~400-800 Mio. USD pro Jahr
- **Kumulativ seit 2020:** >3 Mrd. USD

Diese Zahlen umfassen alle MEV-Typen — ein Teil davon ist "harmlose" Arbitrage, ein Teil ist direktes Nutzer-Extrahieren via Sandwich.

**Was MEV für dich als Nutzer bedeutet**

Jedes Mal, wenn du auf einer DEX swappst, zahlst du potenziell einen "MEV-Zoll":
- **Bei kleinen Swaps (<1.000 USD):** meist minimal, weil Profit zu klein für Searcher
- **Bei mittleren Swaps (1.000-100.000 USD):** typisch 0,01-0,5% zusätzlicher Verlust durch Sandwich
- **Bei großen Swaps (>100.000 USD):** kann 1-5% Verlust bedeuten

Der MEV-Zoll ist unsichtbar. Er taucht nicht in Blockexplorers als "MEV-Gebühr" auf — er manifestiert sich als schlechterer Ausführungspreis, als du erwartet hast. Viele Nutzer bemerken ihn nie, aber er ist real und messbar.

**Die gute Nachricht:** MEV ist vermeidbar. Die Werkzeuge dafür sind frei verfügbar, kostenlos oder sehr günstig, und erfordern keine tiefen technischen Kenntnisse. Wir behandeln sie in den folgenden Lektionen.

### Folien-Zusammenfassung

**[Slide 1] — Titel**
Was MEV eigentlich ist

**[Slide 2] — Die Definition**
MEV = Maximal Extractable Value
Wert aus Transaktions-Reihenfolge in Blocks
Früher: "Miner" Extractable Value
Jetzt: alle Block-Proposer und Builder

**[Slide 3] — Der Mempool**
Öffentliche Wartezone für Transaktionen
Zeit-Fenster: 1-12 Sekunden auf Ethereum
In diesem Fenster sichtbar, aber nicht ausgeführt
Searcher-Bots scannen kontinuierlich

**[Slide 4] — Warum Reihenfolge wertvoll ist**
Large Trade → bewegt Preis → vor/nach Profit möglich
Front-Running: Gewinn auf Kosten des Nutzers
Back-Running: Gewinn aus Nutzer-geschaffenem Ungleichgewicht

**[Slide 5] — MEV ist ein Markt**
Searcher: finden Gelegenheiten
Builder: stellen Blöcke zusammen
Relays: vermitteln zu Proposers
Validators: veröffentlichen Blöcke

**[Slide 6] — Historische Größe**
2021: ~1 Mrd. USD MEV
Kumulativ >3 Mrd. USD seit 2020
Davon ~30-40% schädliches MEV

**[Slide 7] — Was MEV für Nutzer bedeutet**
Unsichtbarer Zoll auf jede DEX-Swap
Kleine Swaps: minimal
Große Swaps: 1-5% Verlust möglich
Vermeidbar mit den richtigen Tools

### Sprechertext

**[Slide 1]** Willkommen zu Modul 11. MEV ist eine der wichtigsten unsichtbaren Kräfte in DeFi. Jeder, der Transaktionen auf Ethereum abschickt, ist betroffen, meist ohne es zu merken. In dieser Lektion klären wir, was MEV überhaupt ist und warum es existiert.

**[Slide 2]** MEV steht für Maximal Extractable Value. Ursprünglich bedeutete die Abkürzung Miner Extractable Value — der Wert, den ein Miner durch Manipulation der Transaktions-Reihenfolge in einem Block einstreichen kann. Nach dem Wechsel von Ethereum zu Proof-of-Stake wurde daraus Maximal Extractable Value, weil jetzt auch Builder, Searcher und Validatoren beteiligt sind, nicht nur Miner.

**[Slide 3]** Der Mempool ist der Schlüssel. Wenn du eine Transaktion abschickst, geht sie nicht direkt in die Blockchain. Sie landet erst im Mempool — einer öffentlich einsehbaren Liste aller ausstehenden Transaktionen. In diesem Zeit-Fenster, typisch 1 bis 12 Sekunden auf Ethereum, ist deine Transaktion sichtbar, aber noch nicht ausgeführt. Searcher-Bots scannen den Mempool kontinuierlich, tausende Male pro Sekunde.

**[Slide 4]** Warum Reihenfolge wertvoll ist. Angenommen du machst einen großen Swap, der den Preis im Pool um 1 Prozent bewegt. Ein Searcher kann eine Transaktion vor deiner platzieren, um vom bekommenden Preis-Anstieg zu profitieren — das ist Front-Running. Oder er platziert eine nach deiner, um ein Ungleichgewicht zwischen Pools auszugleichen — das ist Back-Running. Front-Running kostet dich Geld. Back-Running ist meist harmlos für dich.

**[Slide 5]** MEV ist kein einzelner Akteur, sondern ein ganzer Markt. Searcher sind Firmen mit spezialisierten Bots, die den Mempool scannen. Block-Builder kombinieren Transaktionen zu optimalen Blöcken. Relays leiten diese Bundles an Proposer weiter. Validatoren veröffentlichen die Blöcke. Alle vier Rollen verdienen am MEV-Markt.

**[Slide 6]** Die historische Größe. 2021 im Bull-Markt-Peak waren es etwa 1 Milliarde Dollar pro Jahr. Seit 2020 kumulativ über 3 Milliarden Dollar extrahiert. Davon sind ungefähr 30 bis 40 Prozent schädliches MEV — direktes Nutzer-Abgreifen. Der Rest ist Arbitrage, die aus Natur von DEX-Märkten entsteht.

**[Slide 7]** Was das für dich bedeutet. Bei jeder DEX-Swap zahlst du potenziell einen unsichtbaren MEV-Zoll. Bei kleinen Swaps unter 1.000 Dollar ist er minimal. Bei mittleren 1.000 bis 100.000 Dollar typisch 0,01 bis 0,5 Prozent. Bei großen über 100.000 Dollar kann er 1 bis 5 Prozent erreichen. Die gute Nachricht: er ist vermeidbar. Mit den richtigen Tools kannst du 90 Prozent oder mehr des MEV-Zolls eliminieren. Diese Tools behandeln wir in Lektion 11.5.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Evolutions-Diagramm: "Miner Extractable Value" (2020) → "Maximal Extractable Value" (2022+) mit neuen Akteuren.

**[Slide 3]** **SCREENSHOT SUGGESTION:** blocknative.com oder etherscan.io Mempool-Ansicht mit ausstehenden Transaktionen.

**[Slide 4]** Zeitleiste: deine Transaktion + Front-Run + Back-Run, mit Preis-Bewegung visualisiert.

**[Slide 5]** Supply-Chain-Diagramm: Searcher → Builder → Relay → Validator.

**[Slide 6]** Balkendiagramm: MEV pro Jahr 2020-2024.

**[Slide 7]** Zoll-Visualisierung: Swap-Größe vs. MEV-Kosten in Prozent.

### Übung

**Aufgabe: Mempool-Beobachtung**

Öffne einen Mempool-Explorer (z.B. [etherscan.io/txsPending](https://etherscan.io/txsPending) oder [mempool.guru](https://mempool.guru)) und beobachte 10 Minuten lang ausstehende Transaktionen.

Dokumentiere:
1. Wie viele Transaktionen sind durchschnittlich gleichzeitig im Mempool?
2. Wie verteilen sich Gas-Preise? (niedrig, mittel, hoch)
3. Identifiziere 3 Transaktionen, die wahrscheinlich DEX-Swaps sind (an den aufgerufenen Contracts erkennbar — Uniswap Router, 1inch, etc.)
4. Schätze, wie viele Sekunden die typische Transaktion im Mempool wartet, bevor sie in einem Block landet

**Deliverable:** Kurzer Bericht (Screenshot + 5-8 Sätze) mit deinen Beobachtungen. Was hat dich überrascht?

### Quiz

**Frage 1:** Warum wurde der Begriff "Miner Extractable Value" nach dem Ethereum-Merge auf "Maximal Extractable Value" umformuliert, und was ändert sich durch diese Umbenennung?

<details>
<summary>Antwort anzeigen</summary>

Vor dem Merge (September 2022) wurde Ethereum durch Proof-of-Work gesichert — Miner schlugen Transaktionen zusammen zu Blöcken. Der einzelne Miner hatte die direkte Kontrolle über die Transaktions-Reihenfolge und konnte selbst MEV extrahieren. "Miner Extractable Value" beschrieb diese Realität präzise. Nach dem Merge wechselte Ethereum zu Proof-of-Stake. Statt Miner gibt es Validatoren — doch die Struktur wurde gleichzeitig modernisiert. Durch Proposer-Builder Separation (PBS) wurde die Block-Erstellung aufgeteilt: Builder stellen Blöcke zusammen, Proposer-Validatoren wählen nur den besten angebotenen Block aus. Jetzt können mehrere Akteure MEV extrahieren: Builder durch geschickte Block-Konstruktion, Searcher durch das Finden von Gelegenheiten, Relay-Services durch Vermittlung, und schließlich die Validatoren selbst. Der Begriff "Maximal" erfasst diese Pluralität der Extraktoren — es geht nicht mehr nur um Miner, sondern um den maximalen Wert, den irgendein Akteur entlang der Supply-Chain extrahieren kann. Praktisch ändert sich für Nutzer wenig: MEV gibt es weiterhin in vergleichbarer Größenordnung. Theoretisch ist die neue Struktur aber "gerechter" — MEV wird zwischen mehr Akteuren verteilt, und durch Wettbewerb unter Buildern fließen Teile des MEV-Werts über höhere Validator-Rewards zurück zu Staker. Ob das netto besser für Nutzer ist, ist umstritten. Sicher ist: die Grundmechanik — Reihenfolgen-Manipulation in Blocks monetarisiert — bleibt bestehen.
</details>

**Frage 2:** Ein Freund sagt: "MEV ist nur Arbitrage zwischen DEXs, und Arbitrage ist gesund für den Markt. Das betrifft mich nicht." Was ist an dieser Aussage richtig und was falsch?

<details>
<summary>Antwort anzeigen</summary>

Teilweise richtig, aber gefährlich vereinfacht. **Was richtig ist:** Ein signifikanter Teil des MEV besteht aus Arbitrage zwischen DEXs — wenn z.B. ETH auf Uniswap 3.000 USD kostet und auf SushiSwap 3.010 USD, kauft ein Arbitrage-Bot günstig auf Uniswap und verkauft teurer auf SushiSwap. Das gleicht die Preise aus und ist grundsätzlich gesund für DEX-Märkte — ohne Arbitrage würden Preise zwischen Pools divergieren, was für alle Nutzer schlecht wäre. Dieser Arbitrage-MEV betrifft den typischen Nutzer in der Tat nicht direkt negativ. **Was falsch ist:** MEV ist nicht nur Arbitrage. Ein erheblicher Teil ist Sandwich-Angriffe — der Searcher findet einen anstehenden großen Nutzer-Swap, kauft vorher, verkauft nachher, und verdient den Preis-Unterschied auf Kosten des ursprünglichen Swappers. Hier wird Wert direkt vom Nutzer an den Searcher transferiert. Schätzungen variieren: 30-40% des gesamten MEV ist Sandwich-artig, also direkt schädlich. Das betrifft jeden, der auf DEXs swappt, besonders bei größeren Trades. Weiter: auch harmlose Arbitrage kann Nebenwirkungen haben — die Gas-Gebühren, die Searcher für Priorität bezahlen, erhöhen das gesamte Gas-Preis-Niveau. Das macht alle Transaktionen teurer, nicht nur die mit MEV-Bezug. Die Aussage "betrifft mich nicht" ist also nur dann richtig, wenn (a) du nie DEX-Swaps über 10.000 USD machst, (b) du Privacy-Tools bereits nutzt, (c) du Gas-Kosten vernachlässigst. Für die meisten aktiven DeFi-Nutzer ist MEV ein realer, messbarer Kostenfaktor. Die Nuance ist wichtig: nicht alles MEV ist schlecht, aber eine beträchtliche Teilmenge ist direkt schädlich, und der Schutz davor ist einfach zugänglich.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → MEV-Definition → Mempool-Mechanik → Transaktions-Lebenszyklus → Warum Reihenfolge wert ist → Historische Evolution → MEV als Kostenfaktor
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — MEV-Definitions-Diagramm, Mempool-Visualisierung, Transaktions-Lifecycle-Flow, PoW-to-PBS-Zeitleiste

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 11.2 — Die wichtigsten MEV-Typen

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die vier Haupttypen von MEV unterscheiden (Arbitrage, Sandwich, Liquidation, JIT)
- Für jeden Typ einschätzen, ob er den Nutzer schädigt oder neutral/positiv ist
- Erkennen, welche MEV-Typen bei den eigenen Aktivitäten relevant sind
- Benign MEV (Arbitrage, Liquidation) von Toxic MEV (Sandwich, Front-Running) nach Auswirkungen auf den Markt trennen
- Just-in-Time-Liquidity (JIT) als hybrides Phänomen mit Vor- und Nachteilen für LPs einordnen
- Die ökonomische Rolle von Arbitrage-MEV für effiziente Preisbildung verstehen

### Erklärung

MEV ist ein Sammelbegriff für mehrere unterschiedliche Aktivitäten. Nicht alle sind gleich — einige sind für Nutzer schädlich, andere neutral, einige sogar positiv.

**Typ 1: Arbitrage (DEX-zu-DEX, CEX-zu-DEX)**

**Was passiert:** Preis-Unterschiede zwischen verschiedenen Handelsplätzen werden ausgeglichen. Wenn ETH auf Uniswap V3 bei 3.000 USD handelt und auf Balancer bei 3.010 USD, kauft ein Arbitrage-Bot auf Uniswap und verkauft auf Balancer — 10 USD Gewinn pro ETH.

**Mechanik:** Meist geschieht das in einem **Atomic-Arbitrage**: beide Trades in einer einzigen Transaktion, oft mit einem Flash Loan finanziert (mehr dazu in Modul 12). Wenn der Gewinn nach Gas-Kosten positiv ist, führt der Bot die Transaktion aus. Wenn nicht, wird sie nicht ausgeführt — kein Risiko für den Bot.

**Effekt auf Nutzer:** **Neutral bis positiv**. Arbitrage hält die Preise zwischen DEXs eng zusammen. Ohne Arbitrage würden Pools divergieren, und Nutzer würden ungleiche Preise zahlen. Der Arbitrage-Gewinn entsteht aus dem Ungleichgewicht, das andere Nutzer (meist große Liquidität-Depositor oder Swapper) erzeugt haben — nicht aus einzelnen Retail-Trades.

**Typische Größe:** 40-60% des gesamten MEV ist DEX-Arbitrage.

**Typ 2: Sandwich-Angriffe**

**Was passiert:** Ein Searcher sieht einen großen Nutzer-Swap im Mempool, platziert eine eigene Kauf-Order **vor** der des Nutzers (höhere Gas-Priorität), wartet, dass der Nutzer-Swap den Preis nach oben bewegt, und verkauft dann **nach** dem Nutzer-Swap.

**Mechanik:** Drei Transaktionen im gleichen Block:
1. **Front-Run:** Searcher kauft ETH (z.B. 1 ETH für 3.000 USDC)
2. **Nutzer-Swap:** Nutzer kauft große Menge ETH (z.B. 50 ETH, bewegt Preis auf 3.030)
3. **Back-Run:** Searcher verkauft 1 ETH für 3.028 USDC

**Gewinn:** Searcher verdient ~28 USDC (minus Gas)
**Verlust für Nutzer:** Der Nutzer zahlt einen schlechteren durchschnittlichen Preis, als er ohne Sandwich bekommen hätte

**Effekt auf Nutzer:** **Direkt schädlich**. Der Sandwich-Angriff stiehlt Wert vom Nutzer. Je größer der Nutzer-Swap relativ zur Pool-Liquidität, desto größer der Gewinn für den Searcher und desto größer der Verlust für den Nutzer.

**Typische Größe:** 30-40% des gesamten MEV ist Sandwich-MEV.

**Typ 3: Liquidations-MEV**

**Was passiert:** Wenn eine gehebelte Position auf Aave, Compound oder Maker unter die Liquidations-Schwelle fällt, können Liquidatoren die Position abwickeln und einen Bonus (typ. 5-10%) einstreichen (siehe Modul 7).

**Mechanik:** Searcher monitoren kontinuierlich alle großen Lending-Positionen. Sobald eine Position liquidierbar wird, rennen die Searcher um die Transaktion — typisch mit hoher Gas-Priorität, um vor anderen Liquidatoren zu sein.

**Effekt auf Nutzer:**
- Für den liquidierten Nutzer: schmerzhaft, aber unvermeidbar — die Liquidation ist das Protokoll-Design, nicht MEV-spezifisch
- Für andere Nutzer: neutral — Liquidationen halten das Protokoll solvent

**Typische Größe:** 5-15% des gesamten MEV, stark abhängig von Markt-Volatilität (in Krisen >30% möglich).

**Typ 4: JIT (Just-in-Time) Liquidity**

**Was passiert:** Ein hochentwickelter MEV-Typ, spezifisch für Uniswap V3 (und ähnliche konzentrierte Liquidität). Ein Searcher sieht einen großen Swap im Mempool und fügt **kurz vor dem Swap** konzentrierte Liquidität in einem engen Preis-Band hinzu. Der Swap erfolgt — fast der gesamte Swap wird durch die neu hinzugefügte Liquidität abgewickelt, wodurch der Searcher die Fees kassiert. Direkt nach dem Swap entfernt der Searcher die Liquidität wieder.

**Mechanik:** Drei Schritte:
1. **Mint:** Searcher fügt konzentrierte Liquidität in engem Band um den erwarteten Ausführungspreis hinzu
2. **Swap erfolgt:** Der Nutzer-Swap wird durch die Searcher-Liquidität abgewickelt, Searcher kassiert fast alle Fees
3. **Burn:** Searcher entfernt die Liquidität sofort

**Effekt auf Nutzer:**
- **Für den Swapper selbst:** meist neutral — der Swap erfolgt zum gleichen Preis, nur die Fees gehen an den Searcher statt an reguläre LPs
- **Für reguläre LPs:** negativ — ihre Fee-Einnahmen werden durch JIT-Liquidity reduziert

**Typische Größe:** 2-5% des gesamten MEV. Wachsendes Phänomen seit Uniswap V3.

**Weitere MEV-Typen (kurze Erwähnung)**

**Time-Bandit Attacks:** Theoretisch könnte ein Validator einen bereits produzierten Block rückgängig machen, um eine bessere MEV-Gelegenheit einzustreichen. Praktisch auf Ethereum durch PoS-Mechaniken stark eingeschränkt.

**NFT-MEV:** Sniping von unterbewerteten NFT-Listings in Marktplätzen durch Bots.

**Generalized Front-Running:** Bots, die jede Art von profitabler Transaktion im Mempool kopieren und mit höherer Gas-Priorität ausführen.

**Oracle-MEV:** Profit aus der Verzögerung zwischen Chainlink-Oracle-Updates und den zugrundeliegenden CEX-Preisen.

**Zusammenfassung nach Schädlichkeit**

| MEV-Typ | Anteil | Schädlich für Nutzer? |
|---|---|---|
| Arbitrage (DEX/CEX) | 40-60% | Nein (neutral/positiv) |
| Sandwich | 30-40% | **Ja — direkt** |
| Liquidation | 5-15% | Nein (Protokoll-Mechanik) |
| JIT Liquidity | 2-5% | Indirekt (für LPs) |
| Andere | ~5% | Gemischt |

**Die Praxis-Erkenntnis:** Für Retail-Nutzer ist **Sandwich-MEV die einzig wirklich relevante Bedrohung**. Arbitrage und Liquidation betreffen dich nicht direkt. JIT Liquidity nur indirekt, wenn du LP bist. Der Fokus des Schutzes liegt daher auf Sandwich-Vermeidung.

### Folien-Zusammenfassung

**[Slide 1] — Titel**
Die wichtigsten MEV-Typen

**[Slide 2] — Typ 1: Arbitrage**
Preis-Unterschiede DEX-zu-DEX ausgleichen
Atomic mit Flash Loans
Für Nutzer: neutral/positiv
40-60% des MEV

**[Slide 3] — Typ 2: Sandwich**
Front-Run + Nutzer-Swap + Back-Run
Searcher verdient, Nutzer zahlt
Für Nutzer: direkt schädlich
30-40% des MEV

**[Slide 4] — Typ 3: Liquidationen**
Gehebelte Positionen abwickeln
Searcher-Rennen um Bonus
Für Nutzer: Protokoll-Mechanik
5-15% des MEV

**[Slide 5] — Typ 4: JIT Liquidity**
Konzentrierte Liquidität um Swap
Searcher kassiert LP-Fees
Für Swapper: neutral
Für LPs: negativ

**[Slide 6] — Weitere Typen**
Time-Bandit, NFT-MEV, Oracle-MEV
Meist Nische-Phänomene

**[Slide 7] — Schädlichkeit nach Typ**
Arbitrage: neutral
Sandwich: schädlich
Liquidation: Protokoll
JIT: für LPs
Schutz-Fokus: Sandwich

### Sprechertext

**[Slide 1]** MEV ist kein einzelner Mechanismus, sondern ein Oberbegriff. In dieser Lektion unterscheiden wir vier Haupttypen und verstehen, welche davon dich als Nutzer betreffen und welche nicht.

**[Slide 2]** Typ 1: Arbitrage. Die klassischste Form. Preis-Unterschiede zwischen DEXs werden ausgeglichen. ETH auf Uniswap bei 3.000, auf Balancer bei 3.010 — Bot kauft günstig, verkauft teurer. Meist atomar in einer Transaktion mit Flash Loan. Für Nutzer: neutral bis positiv. Arbitrage hält Preise zwischen Pools eng. Ohne Arbitrage würden alle Nutzer ungleiche Preise zahlen. 40 bis 60 Prozent des gesamten MEV.

**[Slide 3]** Typ 2: Sandwich. Die schädliche Form. Searcher sieht großen Nutzer-Swap im Mempool, platziert Kauf vor ihm, Nutzer-Swap bewegt Preis, Searcher verkauft danach. Drei Transaktionen im gleichen Block. Searcher verdient, Nutzer bekommt schlechteren Ausführungspreis. Für Nutzer direkt schädlich. 30 bis 40 Prozent des MEV.

**[Slide 4]** Typ 3: Liquidationen. Wenn gehebelte Positionen auf Aave oder Compound unter Liquidations-Schwelle fallen, können Liquidatoren sie abwickeln und einen Bonus von 5 bis 10 Prozent einstreichen. Searcher rennen um diese Gelegenheiten. Für liquidierte Nutzer unangenehm, aber das ist Protokoll-Mechanik, nicht MEV-spezifisch. Für andere Nutzer neutral. 5 bis 15 Prozent des MEV, mehr in Krisen.

**[Slide 5]** Typ 4: JIT Liquidity — Just-in-Time. Hochentwickelt, spezifisch für Uniswap V3. Searcher fügt kurz vor einem großen Swap konzentrierte Liquidität hinzu, der Swap erfolgt durch seine Liquidität, Searcher kassiert die Fees, entfernt dann sofort die Liquidität wieder. Für den Swapper selbst neutral — der Preis ist gleich. Für reguläre LPs negativ — ihre Fee-Einnahmen werden reduziert. 2 bis 5 Prozent des MEV.

**[Slide 6]** Weitere Typen existieren: Time-Bandit Attacks, NFT-Sniping, Oracle-MEV. Diese sind meist Nischen-Phänomene, die den durchschnittlichen Nutzer nicht direkt betreffen. Der praktische Fokus bleibt auf den vier Haupttypen.

**[Slide 7]** Die zentrale Erkenntnis: nicht alle MEV-Typen sind für Nutzer relevant. Arbitrage ist neutral. Liquidation ist Protokoll-Mechanik. JIT betrifft nur LPs. Die einzige Form, die dich als Retail-Nutzer direkt schädigt, ist Sandwich-MEV. Das bedeutet: der Schutz-Fokus liegt ganz klar auf Sandwich-Vermeidung. Die Tools dafür behandeln wir in Lektion 11.5.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Arbitrage-Diagramm: Zwei DEXs mit unterschiedlichen Preisen, Pfeile mit Gewinn.

**[Slide 3]** Sandwich-Timeline: Front-Run → User-Swap → Back-Run, mit Preis-Kurve.

**[Slide 4]** Liquidations-Szenario: Health Factor fällt, Searcher-Rennen visualisiert.

**[Slide 5]** JIT-Liquidity-Mechanik: Mint → Swap → Burn in einer Block-Sequenz.

**[Slide 6]** Kleine Karten der weiteren MEV-Typen.

**[Slide 7]** Schädlichkeits-Matrix: 4 Typen × Nutzer-Impact.

### Übung

**Aufgabe: MEV-Typ-Identifikation**

Gehe auf [eigenphi.io/mev](https://eigenphi.io/mev) oder [mev.so](https://mev.so) (falls verfügbar) und schau dir MEV-Transaktionen der letzten 24 Stunden an.

Identifiziere:
1. **Drei Arbitrage-Transaktionen** — dokumentiere: welche DEXs, Gewinn in USD
2. **Drei Sandwich-Transaktionen** — dokumentiere: welches Token-Paar, Gewinn für Searcher, geschätzter Verlust für Nutzer
3. **Eine Liquidations-Transaktion** — welche Plattform, welche Position, Liquidations-Bonus

**Deliverable:** Dokumentation mit TX-Hashes, Größenordnung, und Kommentar (5-8 Sätze): Was hast du über die Größenverteilung gelernt? Welche Typen erscheinen häufiger?

### Quiz

**Frage 1:** Warum ist DEX-Arbitrage-MEV "neutral bis positiv" für den durchschnittlichen Nutzer, während Sandwich-MEV "direkt schädlich" ist? Erkläre den fundamentalen Unterschied.

<details>
<summary>Antwort anzeigen</summary>

Der fundamentale Unterschied liegt in der **Herkunft des Gewinns**. Bei DEX-Arbitrage entsteht der Gewinn aus einem **bereits bestehenden Preis-Ungleichgewicht** zwischen zwei Pools. Dieses Ungleichgewicht wurde durch vorherige Aktivität geschaffen — typisch große Trades, Liquidity-Changes, oder externe Marktbewegungen, die sich noch nicht durch alle DEXs verbreitet haben. Der Arbitrage-Bot gleicht dieses Ungleichgewicht aus und verdient dabei. Der "Verlust" für dieses Ungleichgewicht wurde bereits zuvor realisiert, typisch verteilt auf viele Marktteilnehmer. Der Arbitrage-Bot stiehlt nichts von einer spezifischen Person — er extrahiert den Wert aus der strukturellen Ineffizienz des fragmentierten DEX-Ökosystems. Mehr noch: **ohne Arbitrage wären alle Nutzer schlechter dran**, weil Preise zwischen DEXs divergieren würden und Nutzer je nach gewähltem Pool ungleiche Preise zahlen würden. Bei Sandwich-MEV ist das fundamental anders. Der Gewinn entsteht aus der **spezifischen, identifizierbaren Transaktion eines einzelnen Nutzers**. Der Searcher beobachtet den Nutzer-Swap im Mempool, platziert seine Transaktionen gezielt davor und dahinter, und der Gewinn entsteht aus der Preis-Bewegung, die **genau diese Nutzer-Transaktion** erzeugt. Der Searcher nimmt dem Nutzer einen Teil des Werts, den der Nutzer andernfalls behalten hätte (in Form eines besseren Ausführungspreises). Das ist ein direkter Wert-Transfer von einem spezifischen Nutzer zum Searcher. Ohne den Sandwich-Angriff hätte der Nutzer einen besseren Preis bekommen — der Sandwich produziert keinen neuen Wert, sondern redistribuiert vorhandenen Wert vom Nutzer zum Searcher. Die Analogie: Arbitrage ist wie jemand, der Wechselkurs-Unterschiede zwischen zwei Währungsbörsen ausnutzt — fair, macht den Markt effizienter. Sandwich ist wie jemand, der über deine Schulter deine Bank-Transaktion liest, schnell eine eigene macht, die deine teurer macht, und den Unterschied einstreicht — direkt auf deine Kosten. Beide können legal sein, aber sie sind ethisch völlig unterschiedlich zu bewerten.
</details>

**Frage 2:** Ein LP auf Uniswap V3 stellt fest, dass seine Fee-Einnahmen niedriger sind als erwartet, obwohl das Handelsvolumen in seinem Pool hoch ist. Wie könnte JIT-Liquidity-MEV die Ursache sein, und was könnte er dagegen tun?

<details>
<summary>Antwort anzeigen</summary>

**Die Ursache:** JIT (Just-in-Time) Liquidity-Bots fügen kurz vor großen Swaps konzentrierte Liquidität in engen Preis-Bändern hinzu, kassieren die Fees dieses Swaps, und entfernen die Liquidität sofort danach. Das bedeutet: die "großen" Swaps, die normalerweise die Haupt-Fee-Einnahmen für LPs generieren würden, werden zu einem erheblichen Teil von JIT-Bots abgegriffen. Der reguläre LP bleibt auf der Standard-Aktivität sitzen — viele kleinere Swaps mit niedrigeren Fees. Mechanismus im Detail: In einem Uniswap V3 Pool teilen sich alle LPs im aktiven Preis-Range die Fees proportional zu ihrer Liquidität. Wenn ein JIT-Bot kurz vor einem 1-Mio-USD-Swap 10 Mio USD Liquidität hinzufügt und dann sofort entfernt, hat er während des Swap-Zeitpunkts einen disproportional großen Anteil am aktiven Bereich — z.B. 50% statt der nominalen 0%. Damit kassiert er 50% der Fees dieses Swaps, anstelle der regulären LPs. Die regulären LPs verlieren diese Fees. Über Zeit summiert sich das. In stark gehandelten Pools (ETH-USDC etwa) können JIT-Bots 10-30% der LP-Fees abgreifen. **Was der LP dagegen tun kann:** **Erstens**, Konzentration wählen. Wenn der LP sehr eng-konzentrierte Liquidität hat, ist der JIT-Vorteil geringer — weil die JIT-Liquidität und die Standard-Liquidität sich stärker konkurrieren. **Zweitens**, weniger "konkurrenzfähige" Pools wählen. ETH-USDC 0,05% Pool ist JIT-Paradies. Nischen-Pools mit weniger Bot-Aktivität sind profitabler für reguläre LPs. **Drittens**, Range-Strategien. Statt ultra-eng zu sein (was wie JIT aussieht), mittlere Ranges nutzen, die mehr Zeit in-range sind. **Viertens**, Pendle-basierte Strategien mit PT-Token. Hier wird die Liquiditäts-Bereitstellung anders strukturiert, JIT ist weniger relevant. **Fünftens**, Intent-basierte Protokolle wie CowSwap unterstützen — sie führen Trades ohne den öffentlichen Mempool aus, JIT wird dadurch strukturell verhindert. **Sechstens**, Managed Vaults wie Arrakis, Gamma oder Steer nutzen — sie haben Strategien, die gegen JIT robuster sind. Die Kernerkenntnis: JIT-MEV ist kein Bug, sondern ein Feature des Uniswap-V3-Designs. Für kleine LPs ist es schwer zu vermeiden — größere, aktiver verwaltete Positionen haben bessere Chancen.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → Typ 1: Arbitrage → Typ 2: Sandwich → Typ 3: Liquidationen → Typ 4: JIT Liquidity → Weitere Typen → Schädlichkeit nach Typ
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — MEV-Typen-Matrix, Arbitrage-Flow-Chart, Sandwich-Mechanik-Grafik, JIT-Liquidity-Diagramm, Nutzer-Impact-Tabelle

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 11.3 — Die MEV-Supply-Chain nach PBS

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die vier Rollen der modernen MEV-Supply-Chain benennen und unterscheiden
- Die Bedeutung von Proposer-Builder Separation (PBS) verstehen
- Die Rolle von Flashbots und MEV-Boost in der Ethereum-Landschaft einordnen
- Die MEV Supply Chain (Searcher → Builder → Proposer/Validator) als Diagramm nachzeichnen und den Fluss von Transaktionen, Bundles und Bidding-Prozessen erklären
- Die Anreiz-Struktur jedes Supply-Chain-Teilnehmers und die daraus resultierenden Zentralisierungs-Risiken analysieren
- Die historische Entwicklung von Mining-Pools über MEV-Geth zu MEV-Boost als Infrastruktur-Entwicklung einordnen

### Erklärung

Nach dem Ethereum-Merge (September 2022) hat sich die MEV-Landschaft strukturell verändert. Die ursprüngliche Struktur "Miner sieht Mempool, baut Block selbst" wurde durch eine komplexere, arbeitsteiligere Pipeline ersetzt. Diese neue Struktur heißt **Proposer-Builder Separation (PBS)**, und sie ist zentral für das moderne MEV-Verständnis.

**Die vier Rollen**

**Rolle 1: Searcher**

Searcher sind spezialisierte Firmen (oder Einzelpersonen), die kontinuierlich nach profitablen MEV-Gelegenheiten suchen. Sie führen:
- **Mempool-Scanning** (tausende Mal pro Sekunde) nach ausstehenden Transaktionen
- **On-Chain-Monitoring** aller Lending-Positionen, DEX-Preise, Oracle-Updates
- **Strategie-Entwicklung** — spezifische Bots für Arbitrage, Sandwich, Liquidation, etc.

**Output:** **Bundles**.

> **Bundle (Definition):** Ein Bundle ist eine geordnete Menge von Transaktionen, die zusammen an Block-Builder gesendet werden, um eine garantierte Ausführungs-Reihenfolge sicherzustellen.

Konkret: Gruppen von Transaktionen, die in einer bestimmten Reihenfolge zusammen ausgeführt werden sollen. Ein Bundle könnte aussehen: "Führe TX1 (Front-Run), TX2 (Nutzer-Swap, schon im Mempool), TX3 (Back-Run) in dieser Reihenfolge aus. Ich zahle Gas-Priorität X."

Searcher bieten für die Inklusion ihrer Bundles in einen Block — typisch durch hohe `priorityFee` oder durch direkte Zahlung an den Builder.

**Wirtschaftliche Größenordnung:** Top-Searcher-Firmen machen Millionen USD Gewinn pro Jahr. Der Markt ist stark wettbewerbsintensiv — dutzende bis hunderte professionelle Searcher-Teams existieren.

**Rolle 2: Builder**

Builder sind spezialisierte Akteure, die **Blocks zusammenstellen**. Sie bekommen:
- Den öffentlichen Mempool
- Bundles von Searchern
- Eigene Optimierungs-Strategien

**Ihr Job:** den "wertvollsten" Block konstruieren, der an einen Proposer (Validator) verkauft werden kann. "Wertvoll" bedeutet: maximale Gas-Fees + MEV-Bundle-Zahlungen.

Builder konkurrieren untereinander um Marktanteil. Bekannte Builder: beaverbuild, rsync-builder, Flashbots (der historische Vorreiter), Titan, und andere.

**Markt-Dynamik:** Es gibt aktuell etwa 10-15 aktive Builder, die zusammen den Großteil der Ethereum-Blöcke produzieren. Beaverbuild und rsync-builder bauen oft mehr als 60% aller Blöcke.

**Rolle 3: Relay**

Ein Relay ist eine vertrauenswürdige Vermittlungsinstanz zwischen Buildern und Validatoren. Probleme, die Relays lösen:
- **Validator-Vertrauen:** Der Validator muss einen vollständigen Block signieren, ohne ihn vorher vollständig zu sehen — sonst könnte er die MEV-Strategie selbst stehlen
- **Builder-Vertrauen:** Der Builder will bezahlt werden, ohne zu riskieren, dass der Validator den Block einfach nicht verwendet

**Wie Relays das lösen:** Sie sehen den Block-Inhalt, überprüfen, dass alles legitim ist, und präsentieren dem Validator nur den Block-Header (ohne die Transaktions-Details). Der Validator signiert den Header, und erst dann bekommt er die vollständigen Transaktionen.

**Bekannte Relays:** Flashbots Relay (historisch dominant), bloXroute, ultra sound, Aestus, Agnostic, Titan Relay, Eden Network.

**Geopolitische Dimension:** Nach den OFAC-Sanktionen gegen Tornado Cash (August 2022) begannen einige Relays, sanktionierte Adressen zu filtern. Das führte zur Diskussion um **Censorship Resistance** — Nutzer, die maximale Zensur-Resistenz wollen, wählen heute bewusst "ultra sound" oder andere nicht-zensierende Relays.

**Rolle 4: Proposer (Validator)**

Der Proposer ist der Validator, der in diesem Slot den Block proposen darf. Im PBS-Modell macht er **nicht mehr selbst** den Block — er wählt aus den Angeboten der Builder (via Relay) das beste aus.

**Proposer-Perspektive:** mehr Einkommen. Ohne PBS würde der Validator nur die regulären Block-Rewards (Staking-Rewards) und Transaktions-Fees bekommen. Mit PBS bekommt er zusätzlich einen Anteil am MEV. Für Solo-Stakers macht MEV-Boost typisch 5-10% zusätzliche Rewards aus.

**Architektur-Flow:**

```
[Nutzer/Searcher] → [Public Mempool + Private Bundles]
 ↓
 [Builders]
 (stellen Blöcke zusammen)
 ↓
 [Relays]
 (vermitteln Header)
 ↓
 [Proposer/Validator]
 (signiert besten Block)
 ↓
 [Block auf Chain]
```

**MEV-Boost: das Software-Bindeglied**

MEV-Boost ist eine Open-Source-Software von Flashbots, die das PBS-Modell auf Ethereum möglich macht. Validatoren installieren MEV-Boost als Middleware — es verbindet sich mit mehreren Relays und wählt automatisch das beste Block-Angebot.

**Adoption:** Über 90% aller Ethereum-Validatoren nutzen MEV-Boost. Das heißt: für über 90% aller Blocks gilt das PBS-Modell mit Searcher → Builder → Relay → Proposer.

**Warum das wichtig ist (für Nutzer)**

Die PBS-Struktur hat direkte Implikationen für normale Nutzer:

**Positiv:**
- **Wettbewerb unter Buildern** führt dazu, dass mehr MEV-Wert zu Validatoren fließt (statt bei einzelnen Minern zu bleiben)
- **Transparenz:** Flashbots und andere veröffentlichen Daten, wodurch MEV sichtbar wird
- **Protokoll-Level-Alternativen** können entwickelt werden (siehe Lektion 11.6)

**Negativ:**
- **Zentralisierungs-Tendenz:** Wenige große Builder dominieren den Markt
- **Censorship-Risiken:** Wenn Builder oder Relays sanktionierte Adressen filtern, können manche Transaktionen nicht inkludiert werden
- **Für den Nutzer selbst:** keine direkte Änderung — MEV findet weiterhin statt, nur die Akteure haben sich geändert

**Die zentrale Erkenntnis:** Das PBS-System ist heute der Standard auf Ethereum. Zu verstehen, wie Blocks tatsächlich produziert werden, ist wichtig, um die Schutz-Strategien in der nächsten Lektion (private Mempools, Intent-basierte Systeme) richtig einordnen zu können.

### Folien-Zusammenfassung

**[Slide 1] — Titel**
Die MEV-Supply-Chain nach PBS

**[Slide 2] — Vor und nach dem Merge**
Früher: Miner → sieht Mempool → baut Block
Heute: Searcher → Builder → Relay → Proposer
PBS = Proposer-Builder Separation

**[Slide 3] — Die drei Akteure**
Searcher: scannen Mempool + On-Chain, erstellen Bundles, bieten um Block-Inklusion
Builder: stellen Blöcke aus Mempool + Searcher-Bundles zusammen, optimieren auf maximalen Wert
Proposer/Validator: wählt besten Block aus Relay-Angeboten, signiert Header, +5-10% Rewards durch MEV-Boost

**[Slide 4] — Relay**
Vermittlung Builder ↔ Proposer
Lösen Vertrauens-Problem (Header-Signatur ohne vollen Block)
Flashbots, ultra sound, Aestus, Titan
Zensur-Diskussion: OFAC-Filter bei einigen Relays

**[Slide 5] — MEV-Boost**
Open-Source Software von Flashbots
>90% Ethereum-Validatoren nutzen es
Ermöglicht PBS auf Ethereum heute

**[Slide 6] — Zentralisierungs-Tendenzen**
10-15 aktive Builder auf Ethereum
Top 2 bauen >60% aller Blöcke
Zensur-Risiken bei einigen Relays
Grundlage für Protokoll-Alternativen

**[Slide 7] — Für Nutzer relevant**
Positiv: MEV-Wert fließt zu Validatoren (höhere Staking-Rewards)
Negativ: Zentralisierung + Zensur-Potenzial
Voraussetzung für Schutz-Tools in Lektion 11.5

### Sprechertext

**[Slide 1]** In dieser Lektion geht es um die moderne Struktur der MEV-Supply-Chain. Nach dem Ethereum-Merge 2022 hat sich diese Struktur grundlegend geändert. Das Verständnis ist wichtig, um die Schutz-Strategien später richtig einordnen zu können.

**[Slide 2]** Vor dem Merge war die Struktur einfach: der Miner sieht den Mempool und baut den Block selbst. Alle MEV-Entscheidungen lagen bei ihm. Nach dem Merge ist das komplexer. Die Rollen sind aufgeteilt: Searcher finden Gelegenheiten, Builder stellen Blöcke zusammen, Relays vermitteln, Proposer signieren. Das heißt Proposer-Builder Separation, kurz PBS.

**[Slide 3]** Die drei zentralen Akteure in der neuen Supply-Chain. Erstens: Searcher. Spezialisierte Firmen mit Bots, die den Mempool tausende Male pro Sekunde scannen. Sie monitoren alle Lending-Positionen, DEX-Preise, Oracle-Updates. Ihre Output: Bundles — Gruppen von Transaktionen in spezifischer Reihenfolge, die zusammen in einen Block sollen. Sie bieten um Inklusion durch Gas-Priority oder direkte Zahlung an den Builder. Zweitens: Builder. Sie bekommen den öffentlichen Mempool plus Bundles von Searchern und konstruieren den wertvollsten Block. Drittens: Proposer, also der Validator, der in diesem Slot den Block proposen darf. Er wählt aus den Angeboten verschiedener Relays das beste aus. Signiert Header, bekommt dann den vollen Block. Einkommens-Vorteil: 5 bis 10 Prozent zusätzliche Rewards durch MEV-Boost. Das macht Staking profitabler.

**[Slide 4]** Die vermittelnde Rolle: Relays. Vermittlungs-Instanzen zwischen Buildern und Proposern. Sie lösen ein Vertrauens-Problem: der Validator muss einen Block signieren, ohne ihn vorher vollständig zu sehen. Der Relay sieht alles, prüft, und zeigt dem Validator nur den Header. Bekannte Relays: Flashbots, ultra sound, Aestus, Titan. Wichtig: nach den Tornado-Cash-Sanktionen 2022 filtern manche Relays sanktionierte Adressen. Nutzer, die Zensur-Resistenz wollen, wählen ultra sound.

**[Slide 5]** MEV-Boost ist die Open-Source-Software von Flashbots, die das Ganze möglich macht. Validatoren installieren es als Middleware. Es verbindet sich mit mehreren Relays und wählt automatisch das beste Angebot. Über 90 Prozent aller Ethereum-Validatoren nutzen MEV-Boost. Das heißt: PBS ist der Standard, nicht die Ausnahme.

**[Slide 6]** Zentralisierungs-Tendenzen sind die Kehrseite. Etwa 10 bis 15 aktive Builder existieren auf Ethereum. Die Top 2 — beaverbuild und rsync-builder — bauen regelmäßig über 60 Prozent aller Blöcke. Das ist eine deutliche Zentralisierungs-Tendenz. Hinzu kommen Zensur-Risiken bei Relays, die OFAC-Adressen filtern. Diese Probleme sind die Grundlage für die Protokoll-Alternativen, die in der letzten Lektion dieses Moduls diskutiert werden.

**[Slide 7]** Warum das für Nutzer relevant ist. Positiv: mehr Wettbewerb unter Buildern bedeutet, dass MEV-Wert zu Validatoren fließt statt bei einzelnen Minern. Negativ: Zentralisierungs-Tendenz bei wenigen Buildern, Zensur-Risiken bei einigen Relays. Für den Nutzer selbst ändert sich wenig — MEV findet weiter statt. Aber das Verständnis der Struktur ist Voraussetzung, um die Schutz-Tools in der nächsten Lektion richtig einordnen zu können.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Vergleich: Pre-Merge (einfache Miner-Rolle) vs. Post-Merge (4-Rollen-PBS).

**[Slide 3]** Drei-Spalten-Layout der Akteure: Searcher-Workflow (Mempool-Scan → Bundle → Gebot) | Builder (Block-Konstruktion aus Mempool + Bundles) | Proposer (Auswahl + Header-Signatur + Reward-Schichten).

**[Slide 4]** Relay-Architektur: Header-Flow mit Trust-Boundaries. Optional: Liste von Relays mit Zensur-Status.

**[Slide 5]** MEV-Boost-Adoption-Chart über Zeit seit Merge.

**[Slide 6]** Builder-Marktanteile als Tortendiagramm. **SCREENSHOT SUGGESTION:** mevboost.pics oder relayscan.io Dashboard.

**[Slide 7]** Matrix: PBS-Effekte auf Nutzer (positive und negative).

### Übung

**Aufgabe: Builder- und Relay-Landschaft erforschen**

1. Besuche [mevboost.pics](https://www.mevboost.pics) (oder alternative Relay-Scanner)
2. Identifiziere die Top 5 Builder der letzten 7 Tage mit ihren Marktanteilen
3. Identifiziere die Top 5 Relays mit ihrem Marktanteil
4. Prüfe für jeden Relay: ist er zensurfrei oder filtert er OFAC-Adressen?
5. Identifiziere **einen einzelnen Block** in Etherscan, für den du die volle Supply-Chain nachvollziehen kannst: welcher Builder, welcher Relay, welcher Validator

**Deliverable:** Tabelle mit Markt-Anteilen + ein durchgearbeitetes Block-Beispiel + Reflexion (5-8 Sätze): Welche Trends siehst du? Wie würdest du als Staker mit MEV-Boost deine Relay-Auswahl konfigurieren?

### Quiz

**Frage 1:** Warum ist Proposer-Builder Separation (PBS) wichtiger für die Dezentralisierung Ethereums als es auf den ersten Blick scheint?

<details>
<summary>Antwort anzeigen</summary>

PBS löst ein fundamentales Problem: ohne PBS würden Validatoren, die MEV extrahieren können, deutlich mehr verdienen als "naive" Validatoren. Das würde zu einer Arms-Race führen — nur Validatoren mit komplexen Tech-Stacks (Mempool-Scanning, Strategie-Entwicklung, Bot-Infrastruktur) könnten konkurrieren. Das Ergebnis: Solo-Stakers und kleinere Staking-Pools würden strukturell unterlegen sein. Über Zeit würden sich Validatoren bei wenigen großen Staking-Firmen konzentrieren. Mit PBS wird dieser Effekt abgemildert. Jeder Validator — auch ein Solo-Staker mit einem einfachen Setup — kann über MEV-Boost den gleichen MEV-Anteil bekommen wie große Staking-Pools. Das Level-Playing-Field ermöglicht echte Dezentralisierung auf der Validator-Ebene. Aber: PBS verlagert das Konzentrations-Risiko auf die Builder-Ebene. Aktuell bauen 2-3 Builder (beaverbuild, rsync-builder, Titan) über 60% aller Blöcke. Das ist eine neue Form der Zentralisierung. Und Relays sind ein weiteres Nadelöhr — Flashbots Relay war lange dominant, obwohl das Ökosystem sich inzwischen diversifiziert hat. Die kritische Debatte: ist PBS netto besser für Dezentralisierung? Die meisten Analysen sagen ja — die Validator-Ebene ist wichtiger als die Builder-Ebene, weil Validatoren Vertrauens-Grundlage für das gesamte Protokoll sind. Builder können in Theorie jederzeit ausgetauscht werden (jeder kann ein Builder werden), Validatoren erfordern 32 ETH Stake. Zusätzlich existieren Forschungs-Initiativen für **Encrypted Mempool** und **Enshrined PBS** (ePBS), die das Builder-Konzentrations-Risiko weiter reduzieren sollen. Langfristig: PBS ist ein Bausteinsystem — aktuell imperfekt, aber die Richtung ist strukturell vorteilhaft. Ohne PBS wäre Ethereum heute wahrscheinlich dominant durch 3-4 große Staking-Firmen statt der relativen Diversität, die wir aktuell haben.
</details>

**Frage 2:** Ein Nutzer sagt: "Ich nutze MetaMask und will meine Transaktionen sofort haben. Was interessiert mich, welcher Builder meinen Block baut?" Warum sollte dieser Nutzer die MEV-Supply-Chain trotzdem verstehen?

<details>
<summary>Antwort anzeigen</summary>

Drei Gründe, warum das Verständnis relevant ist. **Erstens: Ausführungs-Qualität.** Wenn der Nutzer einen Swap abschickt, landet er im öffentlichen Mempool. Dort ist er sichtbar für alle Searcher. Wenn der Swap groß genug ist, wird er mit hoher Wahrscheinlichkeit sandwiched — und der Nutzer zahlt einen schlechteren Preis. Ohne Verständnis der Supply-Chain sieht der Nutzer nur den Endergebnis: "mein Swap hat 0,3% mehr gekostet als die UI sagte." Mit Verständnis weiß er: das ist MEV, und es ist vermeidbar durch Alternativen wie Flashbots Protect oder CowSwap. **Zweitens: Censorship-Awareness.** Wenn der Nutzer seine Transaktion an bestimmte Adressen schickt (z.B. historisch Tornado Cash, aber auch andere sanktionierte Adressen), wird sie möglicherweise von zensierenden Relays gefiltert. Das führt zu "unerklärlich langsamen" Transaktionen — der Nutzer glaubt, sein Gas-Preis war zu niedrig, aber tatsächlich zensiert die Infrastruktur. Verständnis: der Nutzer kann eine Flashbots-Protect-RPC konfigurieren, die nicht-zensierende Relays bevorzugt. **Drittens: Economic-Awareness.** Das MEV-Ökosystem betrifft die Fee-Dynamiken auf Ethereum. In Perioden hoher MEV-Aktivität steigen Gas-Preise strukturell, weil Searcher für Priority bieten. Das betrifft auch nicht-MEV-Transaktionen — jeder zahlt mehr Gas, weil der Markt aufgeheizt ist. Verständnis: der Nutzer kann für zeitunkritische Transaktionen Off-Peak-Zeiten wählen (z.B. Wochenenden, oder europäische Nachtstunden — Asien-Peak-Zeit in Krypto). Ein guter Analogie: "ich nutze das Internet, was interessieren mich Router?" stimmt im Alltag. Aber wenn die Internet-Verbindung schlecht ist, ist Verständnis der Router-Rolle hilfreich für Troubleshooting. Ähnlich bei MEV: im Normalfall egal, aber bei unerklärlichen Swap-Ergebnissen, langsamen Transaktionen, oder hohen Gas-Kosten ist das Verständnis plötzlich sehr praktisch. Zudem: der Nutzer, der MEV versteht, trifft bessere Entscheidungen. Er nutzt geschütze RPCs als Default. Er wählt geeignete DEX-Aggregatoren. Er timt Large Trades richtig. All das spart real Geld über Zeit — oft mehrere Prozent des Transaktions-Volumens. Für aktive DeFi-Nutzer sind das substantielle Einsparungen.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → Vor und nach dem Merge → Die drei Akteure (Searcher, Builder, Proposer) → Relay-Vermittlung → MEV-Boost → Zentralisierungs-Tendenzen → Für Nutzer relevant
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — MEV-Supply-Chain-Diagramm (Searcher→Builder→Proposer), PBS-Architektur, Flashbots-MEV-Boost-Flow, Builder-Market-Share-Chart, Historische Evolution

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 11.4 — Sandwich-Angriffe im Detail

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Einen Sandwich-Angriff auf Schritt-für-Schritt-Ebene technisch nachvollziehen
- Die Profitabilitäts-Bedingungen für Searcher verstehen
- Einschätzen, ob eigene geplante Trades anfällig sind
- Ein Sandwich-Attack-Diagramm zeichnen, das Front-Run-Tx, Opfer-Tx und Back-Run-Tx in korrekter Reihenfolge zeigt
- Die mathematische Profitabilitäts-Bedingung (Slippage-Toleranz vs. Gas-Kosten) als Filter für Angriffsziele quantifizieren
- Konkrete Schwellen (Trade-Größe, Slippage-Toleranz, Pool-Liquidität) benennen, bei denen ein Trade zum Sandwich-Ziel wird

### Erklärung

Sandwich-Angriffe sind die häufigste und für Nutzer direkt schädlichste Form von MEV. Diese Lektion seziert sie im Detail, damit du erkennst, wann deine Trades gefährdet sind — und warum.

**Die Anatomie eines Sandwich-Angriffs**

Das Szenario: Alice möchte 100 ETH in USDC swappen auf Uniswap V2 im ETH-USDC-Pool. ETH handelt aktuell bei 3.000 USDC.

**Vor dem Angriff (Pool-Zustand):**
- Reserve: 1.000 ETH und 3.000.000 USDC
- Konstant-Produkt: 1.000 × 3.000.000 = 3.000.000.000
- Preis: 3.000 USDC pro ETH

**Schritt 1: Alice schickt ihre Transaktion ab**

Alice signiert in ihrer Wallet: "Swap 100 ETH → USDC, min 295.000 USDC (Slippage 2%)".
Die Transaktion geht in den öffentlichen Mempool.

**Schritt 2: Searcher-Bot entdeckt Alice-Transaktion**

In Millisekunden scannt ein Searcher-Bot den Mempool, identifiziert Alice-Swap, und berechnet:

*"Wenn ich 20 ETH vor Alice verkaufe, bewegt sich der Preis nach unten. Alice's 100-ETH-Verkauf bewegt ihn weiter nach unten. Danach kaufe ich 20 ETH zum dann niedrigeren Preis — Gewinn!"*

Moment — bei diesem Szenario verkauft Alice ETH (also Preis sinkt), also müsste der Searcher **vorher verkaufen und nachher kaufen**. Das ist der klassische "Sell-Sandwich" auf einen Verkauf.

**Konkret:**

**Front-Run-Transaktion (Searcher):**
- Verkauft 20 ETH → Pool: 1.020 ETH, 2.941.176 USDC (ungefähr)
- Neuer Preis: ~2.883 USDC pro ETH
- Searcher erhält: ~58.824 USDC für 20 ETH

**Alice's Transaktion (läuft direkt nach Front-Run):**
- Verkauft 100 ETH gegen USDC
- Pool: 1.120 ETH, 2.678.571 USDC (ungefähr)
- Alice erhält: 262.605 USDC

*Ohne den Sandwich hätte Alice erhalten: 272.727 USDC. Der Angriff kostet Alice etwa 10.000 USDC — ungefähr 3,7% ihres Verkaufs.*

**Back-Run-Transaktion (Searcher):**
- Kauft 20 ETH zurück → Pool: 1.100 ETH, 2.727.272 USDC
- Searcher zahlt: 48.701 USDC für 20 ETH

**Searcher-Bilanz:**
- Front-Run: +58.824 USDC (verkauft 20 ETH)
- Back-Run: -48.701 USDC (kauft 20 ETH zurück)
- **Netto:** +10.122 USDC Gewinn
- Gas-Kosten: ~50 USD (Mainnet)
- **Netto-Gewinn nach Gas:** ~10.072 USDC

Das ist fast identisch mit dem Alice's zusätzlichem Verlust — der Searcher hat exakt den Wert gestohlen, den Alice andernfalls behalten hätte.

**Alice sieht nichts "ungewöhnliches"**

In ihrer Wallet-UI sieht Alice:
- Sie hat 100 ETH verkauft
- Sie hat 262.605 USDC erhalten
- Das war innerhalb ihrer 2%-Slippage (295.000 USDC Minimum wäre -2,4% gewesen — tatsächlicher Ausführungspreis war -3,7%)

Moment — hätte die Slippage-Protection Alice nicht geschützt?

**Die Slippage-Falle**

Alice setzte 2% Slippage-Toleranz. Ihre Minimum-Auszahlung: 295.000 USDC (bei ETH-Preis von ~2.950 USDC). Tatsächliche Auszahlung: 262.605 USDC — weit unter ihrem Minimum. Normalerweise würde die Transaktion fehlschlagen.

**Aber:** Searcher passen ihre Front-Run-Größe so an, dass die **tatsächliche Ausführung knapp innerhalb** der Slippage-Toleranz liegt. Sie sehen im Mempool-Swap genau die Slippage-Tolerance. Sie optimieren ihre Front-Run-Größe so, dass Alice-Transaktion noch ausgeführt wird — aber mit maximal möglichem Profit für den Searcher.

Wenn Alice 0,5% Slippage gesetzt hätte, wäre der Sandwich weniger profitabel gewesen (aber ihre Transaktion wäre möglicherweise fehlgeschlagen in einem volatilen Markt). Slippage-Toleranz ist ein zweischneidiges Schwert.

**Wann lohnt sich ein Sandwich für den Searcher?**

Die Profitabilitäts-Formel (vereinfacht):

```
Sandwich-Gewinn ≈ Alice's Swap-Größe² / Pool-Liquidität × Slippage-Toleranz
```

Je **größer** Alice's Swap relativ zur Pool-Liquidität und je **höher** ihre Slippage-Toleranz, desto profitabler der Sandwich.

**Schwellen-Regeln (Daumenregel auf Ethereum Mainnet):**
- **Swap < 1.000 USD:** fast nie sandwichfähig (Gas > Gewinn)
- **Swap 1.000-10.000 USD:** manchmal sandwichfähig, je nach Pool
- **Swap 10.000-100.000 USD:** oft sandwichfähig
- **Swap > 100.000 USD:** fast immer sandwichfähig, wenn keine Schutz-Maßnahmen

**Auf Layer-2 (Arbitrum, Base, etc.):**
Der Break-Even ist niedriger wegen geringerer Gas-Kosten. Schon 100-500 USD-Swaps können sandwichfähig sein.

**Die Anti-Sandwich-Checkliste**

Um deine Anfälligkeit zu senken:

1. **Slippage niedrig setzen** (0,1-0,5% für Stablecoin-Pairs, 0,5-1% für volatile)
2. **Flashbots Protect oder MEV Blocker als RPC** (Details Lektion 11.5)
3. **CowSwap für größere Trades** (Intent-basiertes Matching)
4. **1inch mit MEV-Protection-Flag**
5. **Trades aufsplitten** (5 kleine Swaps statt 1 großer)
6. **Tiefe Liquidität wählen** (ETH-USDC 0,05% vs. exotische Pairs)

**Live-Monitoring-Tools**

Nach einem verdächtigen Swap kannst du prüfen, ob du sandwiched wurdest:
- **eigenphi.io** — zeigt MEV-Transaktionen mit Opfern
- **mevboost.pics** — Supply-Chain-Analyse
- **metasleuth.io** — Transaktions-Flow-Analyse

Wenn du eine TX-Hash eingibst, zeigt eigenphi oft: "this transaction was sandwiched, opfer verlor X USDC".

**Die uncomfortable Wahrheit**

Sandwich-MEV ist in einem fundamentalen Sinn **nicht illegal und nicht unfair** im Sinne des Protokolls — es ist eine mathematisch erlaubte Konsequenz des öffentlichen Mempools. Die "Unfairness" entsteht aus dem Information-Asymmetry: der Searcher sieht deine Transaktion bevor sie ausgeführt wird, und du hast keinen gleichen Vorteil.

Die Lösungen sind nicht, auf "Fairness" zu hoffen — die Lösungen sind, die Information-Asymmetry zu eliminieren. Das bedeutet: deine Transaktionen nicht mehr in den öffentlichen Mempool schicken. Das behandelt Lektion 11.5.

### Folien-Zusammenfassung

**[Slide 1] — Titel**
Sandwich-Angriffe im Detail

**[Slide 2] — Die drei Transaktionen**
Front-Run (Searcher)
Alice's Swap
Back-Run (Searcher)
Alle im gleichen Block

**[Slide 3] — Rechen-Beispiel**
Alice verkauft 100 ETH
Ohne Sandwich: 272.727 USDC
Mit Sandwich: 262.605 USDC
Verlust: 10.122 USDC = 3,7%

**[Slide 4] — Profitabilitäts-Formel**
Sandwich Profit ≈ (Front-run price impact + Back-run recovery) − Gas costs − Slippage buffer
Proportional: Swap-Größe² / Pool-Liquidität × Slippage
Je größer + liquider + höhere Slippage = desto profitabler

**[Slide 5] — Anfälligkeitsfaktoren**
Slippage als Einfallstor: Searcher optimiert Front-Run-Größe, sodass Swap gerade noch ausgeführt wird — Slippage-Toleranz = Gewinn-Obergrenze
Trade-Größen-Schwellen: < 1.000 USD fast nie · 1.000–10.000 manchmal · 10.000–100.000 oft · > 100.000 fast immer

**[Slide 6] — Anti-Sandwich-Checkliste**
Slippage niedrig
Private RPC (Flashbots Protect)
CowSwap für große Trades
Trades aufsplitten

**[Slide 7] — Die zugrundeliegende Ursache**
Information-Asymmetry
Mempool ist öffentlich
Lösung: Transaktionen privat halten

### Sprechertext

**[Slide 1]** Sandwich-Angriffe sind die für Nutzer direkt schädlichste Form von MEV. In dieser Lektion gehen wir Schritt für Schritt durch einen Sandwich, damit du die Mechanik vollständig verstehst. Das ist die Grundlage für effektiven Schutz.

**[Slide 2]** Ein Sandwich besteht aus drei Transaktionen. Erstens: der Front-Run des Searchers. Zweitens: Alice's eigener Swap. Drittens: der Back-Run des Searchers. Alle drei müssen im gleichen Block in dieser Reihenfolge landen. Der Searcher sichert das durch Bundle-Submissions an Builder.

**[Slide 3]** Ein konkretes Beispiel. Alice verkauft 100 ETH gegen USDC auf Uniswap V2. Pool hat 1.000 ETH und 3 Millionen USDC. Ohne Sandwich bekommt Alice 272.727 USDC. Der Searcher macht einen Front-Run-Verkauf von 20 ETH, dann erfolgt Alice-Swap, dann Back-Run-Kauf von 20 ETH. Alice bekommt jetzt nur 262.605 USDC — Verlust von 10.122 Dollar, etwa 3,7 Prozent. Das ist exakt der Searcher-Gewinn.

**[Slide 4]** Die Profitabilitäts-Formel für Sandwiches. Kompakt: Sandwich-Profit ist ungefähr gleich dem Front-Run-Price-Impact plus Back-Run-Recovery, minus Gas-Kosten und minus Slippage-Buffer. Das heißt: der Searcher verdient an beiden Bewegungen, muss aber Gas und seinen eigenen Slippage-Puffer abziehen. Proportional gilt: Gewinn ist proportional zu Swap-Größe zum Quadrat geteilt durch Pool-Liquidität, mal Slippage-Toleranz. Je größer der Swap relativ zur Pool-Liquidität, desto quadratisch mehr Gewinn. Und höhere Slippage bedeutet mehr Spielraum für den Searcher.

**[Slide 5]** Zwei zentrale Anfälligkeitsfaktoren. Erstens, die Slippage-Falle. Alice hat 2 Prozent Slippage gesetzt — ihre Transaktion müsste fehlschlagen bei 3,7 Prozent tatsächlichem Verlust. Aber der Searcher sieht ihre Slippage-Toleranz im Mempool. Er optimiert seine Front-Run-Größe so, dass Alice-Transaktion gerade noch innerhalb der Slippage-Toleranz ausgeführt wird. Die Slippage-Toleranz ist also faktisch die Obergrenze des Searcher-Gewinns, nicht der Schutz, den Alice sich wünscht. Zweitens, Trade-Größen-Schwellen auf Ethereum Mainnet. Swaps unter 1.000 Dollar: fast nie sandwichfähig, weil Gas-Kosten den Gewinn auffressen. 1.000 bis 10.000 Dollar: manchmal, abhängig vom Pool. 10.000 bis 100.000 Dollar: oft. Über 100.000 Dollar: fast immer, wenn keine Schutz-Maßnahmen aktiv sind. Auf Layer-2 sind die Schwellen deutlich niedriger wegen günstigerer Gas-Preise — schon 100 bis 500 Dollar Swaps können sandwichfähig sein.

**[Slide 6]** Die Anti-Sandwich-Checkliste. Erstens: Slippage niedrig setzen, 0,1 bis 0,5 Prozent für Stablecoin-Pairs, 0,5 bis 1 Prozent für volatile. Zweitens: private RPC wie Flashbots Protect oder MEV Blocker nutzen. Drittens: CowSwap für größere Trades über 10.000 Dollar. Viertens: 1inch mit MEV-Protection-Flag. Fünftens: Trades in mehrere kleine aufsplitten. Sechstens: tiefe Liquiditäts-Pools wählen statt exotische Pairs. Details in der nächsten Lektion.

**[Slide 7]** Die zugrundeliegende Ursache ist Information-Asymmetry. Der Searcher sieht deine Transaktion, bevor sie ausgeführt wird. Du siehst nicht seine Bots. Das ist kein technischer Bug, sondern Architektur: der öffentliche Mempool ist öffentlich by design. Die Lösung ist nicht, auf Fairness zu hoffen. Die Lösung ist, die Asymmetry zu eliminieren — deine Transaktionen nicht mehr öffentlich zu machen. Das behandelt die nächste Lektion.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Drei-Block-Sequenz: Front-Run / User-Swap / Back-Run als Blockchain-Transaktionen.

**[Slide 3]** AMM-Kurve mit drei Preis-Punkten markiert.

**[Slide 4]** Formel-Darstellung (Sandwich-Profit-Formel + proportionale Skalierung) mit Beispiel-Berechnungen bei verschiedenen Größen.

**[Slide 5]** Zwei-Spalten-Layout: links Slippage-Bar (Einstellung vs. Searcher-Optimierung), rechts Schwellen-Tabelle nach Swap-Größe.

**[Slide 6]** Checkliste mit 6 Schutz-Maßnahmen.

**[Slide 7]** Information-Asymmetry-Illustration: Searcher sieht Alice, Alice sieht Searcher nicht.

### Übung

**Aufgabe: Sandwich-Opfer-Analyse**

Besuche [eigenphi.io](https://eigenphi.io) oder einen ähnlichen MEV-Explorer. Finde drei Sandwich-Transaktionen aus den letzten 24 Stunden.

Für jede analysiere:
1. **Opfer-Swap:** Welches Token-Paar? Welche Größe in USD? Welche DEX?
2. **Searcher-Profit:** Wie viel USD hat der Searcher verdient?
3. **Opfer-Verlust:** Wie viel hat das Opfer mehr gezahlt, als es ohne Sandwich getan hätte?
4. **Slippage-Toleranz:** Kannst du anhand der Transaktion abschätzen, welche Slippage das Opfer eingestellt hatte?

**Deliverable:** Drei-Fälle-Tabelle + Reflexion (6-10 Sätze): Welche Gemeinsamkeiten haben die Opfer? Welche Schutz-Maßnahme hätte in allen drei Fällen funktioniert?

### Quiz

**Frage 1:** Alice setzt ihre Slippage-Toleranz auf 3%, weil sie will, dass ihre Transaktion auf jeden Fall ausgeführt wird. Warum ist das ein Sandwich-Einladungs-Signal?

<details>
<summary>Antwort anzeigen</summary>

Die Slippage-Toleranz signalisiert dem Searcher direkt, wie viel "Spielraum" für den Angriff verfügbar ist. Wenn Alice 3% Slippage setzt, teilt sie der Welt (via öffentlichem Mempool): "ich akzeptiere einen Ausführungspreis bis zu 3% schlechter als der aktuelle Mittelpreis". Für den Searcher bedeutet das: "ich kann den Preis um bis zu 3% verschlechtern (durch meinen Front-Run) und Alice-Transaktion wird trotzdem ausgeführt". Der Searcher optimiert seine Front-Run-Größe **exakt** so, dass der effektive Ausführungspreis knapp innerhalb der 3%-Toleranz liegt — meist um 2,8-2,95%. Das ist das Maximum, das der Searcher bei 3% Toleranz abgreifen kann. Bei 0,5% Toleranz wäre der maximale Searcher-Gewinn drastisch niedriger (fast ein Sechstel). Oft ist er so niedrig, dass er nicht mehr die Gas-Kosten rechtfertigt — und der Searcher verzichtet auf den Angriff. Die paradoxe Dynamik: **Niedrigere Slippage ist für Alice sicherer**, aber birgt das Risiko, dass die Transaktion in einem volatilen Markt fehlschlägt. Höhere Slippage erhöht die Ausführungs-Wahrscheinlichkeit, aber macht Alice zum lukrativen Ziel. Die "richtige" Balance hängt vom Kontext ab: Stablecoin-Swaps (ETH/USDC) haben minimale Volatilität, 0,1-0,5% Slippage ist ideal. Volatile Pairs (random Shitcoin/ETH) brauchen mehr Puffer, vielleicht 1-2%. Die Faustregel: setze Slippage **so niedrig wie möglich unter Berücksichtigung der Volatilität**. Wenn deine Transaktion mit 0,5% fehlschlägt, ist es meist besser, sie neu zu submittieren statt die Slippage zu erhöhen. Und: die Slippage ist nur ein Teil des Schutzes. Die robuste Lösung ist Private RPC (Flashbots Protect) oder Intent-basierte DEXs (CowSwap), wo die Slippage-Problematik strukturell entschärft wird. Auf privaten Mempools sieht der Searcher die Slippage gar nicht erst.
</details>

**Frage 2:** Warum sind Sandwich-Angriffe auf Layer-2 (Arbitrum, Base) grundsätzlich profitabler pro Nutzer-Transaktion als auf Ethereum Mainnet?

<details>
<summary>Antwort anzeigen</summary>

Der Hauptgrund ist das **Gas-Kosten-zu-Gewinn-Verhältnis**. Auf Ethereum Mainnet kostet jede Transaktion 5-50 USD in Gas je nach Netzwerk-Last. Ein Sandwich braucht zwei Transaktionen (Front-Run + Back-Run), also 10-100 USD Gas-Kosten. Für einen profitablen Sandwich muss der Gewinn diese Gas-Kosten deutlich übersteigen — typisch mindestens 50-200 USD Brutto-Gewinn. Das setzt eine Schwelle: Opfer-Swaps unter ungefähr 10.000 USD sind selten sandwichfähig, weil der mögliche Gewinn zu klein ist. Auf Layer-2 sind Gas-Kosten drastisch niedriger — typisch 0,10-2 USD pro Transaktion. Ein Sandwich braucht also nur 0,20-4 USD Gas. Die Profitabilitäts-Schwelle sinkt entsprechend: schon Opfer-Swaps von 100-500 USD können sandwichfähig sein. Das heißt: **auf L2 ist eine viel breitere Masse von Nutzer-Swaps ein potenzielles Ziel**. Statistisch: Der durchschnittliche L2-Nutzer macht kleinere Swaps (weil L2 gerade für kleinere Trades attraktiv ist — Gas-Kosten fallen nicht so ins Gewicht). Diese kleineren Swaps sind auf Mainnet sicher vor Sandwiches (zu klein). Auf L2 sind sie gefährdet. Das ist ein counterintuitives Ergebnis: L2s machen DeFi zugänglicher, aber sie senken auch die Eintritts-Hürde für Searcher. Der durchschnittliche Retail-Nutzer ist auf L2 relativer exponierter zu Sandwiches als auf Mainnet. Ein zweiter Grund: **L2-Sequencer und ihre Architektur**. Aktuell haben viele L2s (Arbitrum, Optimism, Base) einen einzelnen, zentralisierten Sequencer, der Transaktionen in Reihenfolge setzt. Das reduziert einige MEV-Arten (der Sequencer kann Transaktionen FIFO-ordnen), aber in der Praxis gibt es noch offene Mempool-Phasen und Backrun-Möglichkeiten. Dritter Grund: **weniger ausgereifter Schutz**. Tools wie Flashbots Protect, CowSwap haben starke Mainnet-Unterstützung, aber auf L2s ist die Abdeckung heterogener. Einige L2s haben eigene MEV-Schutz-Lösungen (z.B. Arbitrum's "Express Lane"), andere weniger. Der Nutzer muss für jedes L2 separat prüfen, welche Schutz-Tools verfügbar sind. Die praktische Empfehlung für L2-Nutzer: (1) CowSwap nutzen, wenn auf L2 verfügbar — es hat gute L2-Unterstützung inzwischen. (2) Uniswap X für Intent-Trading. (3) Wenn trotzdem direkter Swap nötig — extreme niedrige Slippage-Toleranz (0,1-0,3%), auch wenn Transaktion mal fehlschlägt. (4) Für große Trades: lieber auf Mainnet handeln — die höheren Gas-Kosten werden oft durch den besseren MEV-Schutz überkompensiert.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → Die drei Transaktionen → Rechen-Beispiel → Profitabilitäts-Formel → Anfälligkeitsfaktoren (Slippage + Trade-Größen-Schwellen) → Anti-Sandwich-Checkliste → Zugrundeliegende Ursache
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — Sandwich-Attack-Diagramm (Front-Run → Victim → Back-Run), Profitabilitäts-Rechenbeispiel, Slippage-Exposition-Tabelle, Trade-Größen-Schwellen-Chart, Historische Sandwich-Events

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 11.5 — Praktischer Schutz: Private Mempools und Intent-basierte Systeme

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Private RPCs wie Flashbots Protect und MEV Blocker als Schutz konfigurieren
- Intent-basierte DEXs wie CowSwap und Uniswap X richtig einsetzen
- Die richtige Schutz-Strategie für verschiedene Trade-Größen wählen
- Die Trade-offs zwischen Private RPCs (Latenz, Verfügbarkeit) und öffentlichem Mempool abwägen
- Die CoW-Swap-Mechanik (Peer-to-Peer-Matching, Solver-Competition) von Uniswap-X (Dutch-Auction) abgrenzen
- Eine Schutz-Strategie-Matrix nach Trade-Größe (< 1k / 1–10k / 10–100k / > 100k USD) anwenden

### Erklärung

Nach der Theorie jetzt die Praxis. Diese Lektion zeigt dir die konkreten Tools, mit denen du dich effektiv vor MEV-Angriffen schützen kannst. Alle sind kostenlos oder marginal teurer als Standard-Trading und einfach zu nutzen.

**Die drei Schutz-Kategorien**

Es gibt drei grundlegende Arten, MEV zu vermeiden:

1. **Private Mempools:** Deine Transaktion geht nicht in den öffentlichen Mempool, sondern direkt zu Buildern
2. **Intent-basierte DEXs:** Du signierst eine Absicht, nicht eine Transaktion. Solver-Netzwerke führen sie ohne Mempool aus
3. **Native MEV-Schutz:** Einige DEXs/Aggregatoren bieten eigene Schutz-Mechanismen

Wir gehen durch jede Kategorie.

**Kategorie 1: Private Mempools (RPC-Ersatz)**

Ein Private Mempool bedeutet: statt deine Transaktion an den öffentlichen Mempool zu senden (via Standard-RPC wie Infura), sendest du sie an einen privaten Service, der sie direkt an Builder weiterleitet — ohne öffentliche Sichtbarkeit.

**Tool 1: Flashbots Protect (protect.flashbots.net)**

Das meistgenutzte Tool. Setup:
1. Gehe zu [protect.flashbots.net](https://protect.flashbots.net)
2. Klicke "Add to MetaMask" (oder ähnliches Wallet)
3. MetaMask fügt das Flashbots-Protect-Netzwerk zu deiner Netzwerk-Liste hinzu
4. Wechsle zu diesem Netzwerk, wenn du MEV-Schutz willst

**Wie es funktioniert:**
- Deine Transaktion geht nicht in den öffentlichen Mempool
- Sie wird direkt zu Flashbots Relay und dort an Builder verteilt
- Builder inkludieren sie in Blöcke, **ohne** dass Searcher sie vorher sehen
- **Ergebnis:** Sandwich-Angriffe strukturell unmöglich

**Zusätzliche Features:**
- **Refunds:** Wenn dein Trade trotzdem Teil eines Backrun-MEV wird (legitimes), bekommst du einen Anteil des MEV zurück (typisch 80-90%)
- **Failed-Transaction-Protection:** Fehlgeschlagene Transaktionen verbraten keinen Gas

**Kosten:** Keine direkten Gebühren. Gas-Kosten sind identisch oder leicht niedriger als Standard.

**Einschränkungen:** Transaktion ist etwas langsamer (typisch 12-36 Sekunden statt 12 Sekunden), weil der Service auf spezifische Builder wartet.

**Tool 2: MEV Blocker (mevblocker.io)**

Eine Alternative zu Flashbots Protect, entwickelt von CoW Protocol (dem CowSwap-Team). Funktioniert sehr ähnlich.

**Unterschiede zu Flashbots Protect:**
- **Builder-Diversität:** MEV Blocker verteilt Transaktionen an mehr Builder (bessere Ausführungs-Wahrscheinlichkeit)
- **Backrun-Refunds:** Höherer Refund-Anteil (oft 90%+)
- **Open-Source und offen:** Keine Flashbots-Dependency

**Setup:** Ebenfalls sehr einfach — Website besuchen, RPC hinzufügen, Netzwerk wechseln.

**Empfehlung:** MEV Blocker hat in 2024-2025 an Marktanteil gewonnen und wird von vielen DeFi-Profis bevorzugt. Beide Tools sind gut — die Wahl ist weitgehend Geschmackssache.

**Tool 3: Andere Private-RPC-Optionen**

- **BloXroute Protect:** Ähnliche Funktionalität, fokussiert auf Bot-Geschwindigkeit
- **1inch RPC:** 1inch-eigener Service, gute Integration für 1inch-Nutzer
- **Merkle.io:** Enterprise-fokussiert

Für typische Nutzer: Flashbots Protect oder MEV Blocker sind die beste Wahl.

**Kategorie 2: Intent-basierte DEXs**

Eine andere Schutz-Philosophie. Statt eine spezifische Transaktion zu senden ("swap X ETH gegen Y USDC bei Preis Z"), signierst du eine **Absicht** ("Ich will mindestens Y USDC für meine X ETH"). Ein Netzwerk von Solvern konkurriert dann, um diese Absicht bestmöglich zu erfüllen.

**Tool 1: CowSwap (swap.cow.fi)**

Das etablierteste Intent-basierte DEX-Protokoll. Entwickelt vom CoW-Protocol-Team.

**Wie es funktioniert:**
1. Du signierst eine "Limit Order" (z.B. "verkaufe 100 ETH für mindestens 290.000 USDC, Ablauf in 30 Minuten")
2. Die Order wird in einem Off-Chain-Pool gesammelt
3. Solver (professionelle Marktteilnehmer) konkurrieren um das Recht, deine Order auszuführen
4. Der beste Solver führt deine Order aus, oft mit Coincidence of Wants (direkter Peer-Match mit anderen Cow-Tradern) oder über DEX-Routen
5. Du bekommst den besten verfügbaren Preis, oft besser als Uniswap-Direktausführung

**Der "CoW"-Effekt (Coincidence of Wants):** Wenn zur selben Zeit jemand anders das entgegengesetzte Trade will (z.B. jemand verkauft 80 USDC gegen ETH, während du 100 ETH verkaufen willst), können die Trades direkt gegeneinander ausgeführt werden — ohne DEX-Liquidität zu nutzen. Das spart Fees und Slippage.

**MEV-Schutz:**
- Keine Transaktion im öffentlichen Mempool
- Solver-Wettbewerb sorgt für beste Preise
- Sandwich strukturell unmöglich

**Kosten:** Minimal höher als direkte DEX (Solver-Fee, meist <0,1%). Der MEV-Schutz ist diese Mini-Gebühr typisch wert — oft bekommt man durch CoWs sogar bessere Ausführung.

**Setup:** Einfach auf swap.cow.fi gehen, Wallet verbinden, traden. Keine spezielle Konfiguration nötig.

**Tool 2: Uniswap X (Uniswap Interface ab 2023)**

Uniswap's eigene Intent-basierte Lösung. Integriert in das Standard-Uniswap-Interface.

**Wie es funktioniert:**
- Wenn du auf Uniswap swappen willst, kannst du "Uniswap X" wählen (in den Settings)
- Statt direkter Swap: signierte Order wird an Filler-Netzwerk gesendet
- Filler konkurrieren um Ausführung
- MEV-Schutz analog zu CowSwap

**Vorteil:** Native Integration in Uniswap — kein separates Interface nötig.
**Nachteil:** Aktuell weniger Solver/Filler als CowSwap, manchmal schlechtere Preise bei exotischen Pairs.

**Tool 3: 1inch Fusion (fusion.1inch.io)**

1inch's Intent-basiertes Angebot. Ähnliche Philosophie wie CowSwap und Uniswap X.

**Vorteil:** 1inch's umfangreiche Liquiditäts-Aggregation.
**Nachteil:** Etwas kompliziertere UX für Einsteiger.

**Kategorie 3: Native MEV-Schutz**

Einige DEX-Aggregatoren bauen MEV-Schutz direkt in ihre Standard-Swap-Routen ein, ohne dass du extra Konfiguration brauchst.

**Tool 1: 1inch mit MEV-Protection-Flag**

Im 1inch-Interface gibt es eine Option "MEV Protection" — wenn aktiviert, werden deine Swaps über Flashbots-ähnliche Kanäle geroutet. Standardmäßig oft aktiv.

**Tool 2: Matcha (matcha.xyz) — von 0x**

Aggregator mit integriertem MEV-Schutz. RFQ-basierte Routen (Request for Quote) sind von Natur aus MEV-resistent, weil Market Maker die Liquidität stellen (nicht öffentliche Pools).

**Tool 3: Paraswap**

Bietet "MEV protected" Route als Option.

**Die Entscheidungs-Matrix**

Welches Tool wann?

| Trade-Größe | Trade-Art | Beste Option |
|---|---|---|
| < 500 USD | Stablecoin-Swap | Jedes DEX mit niedriger Slippage |
| 500-5.000 USD | Volatile Pair | 1inch mit MEV-Protection oder Matcha |
| 5.000-50.000 USD | Beliebig | Flashbots Protect RPC + Uniswap/1inch |
| 50.000-500.000 USD | Beliebig | **CowSwap** |
| > 500.000 USD | Beliebig | **CowSwap oder OTC-Deal** |

**Die Layered-Defense-Strategie**

Für maximalen Schutz:

1. **Default RPC:** Flashbots Protect oder MEV Blocker in MetaMask konfigurieren (schützt **alle** Transaktionen, nicht nur Swaps)
2. **DEX-Aggregator:** 1inch oder Matcha nutzen (nicht Uniswap direkt)
3. **Intent-basiert bei großen Trades:** CowSwap ab ~10.000 USD
4. **Slippage konservativ:** 0,1-0,5% für Stables, 0,5-1% für volatile
5. **Trade-Splitting:** Bei wirklich großen Trades (100.000+ USD) in 3-5 Tranchen aufteilen

Das erreicht in Kombination ~95%+ MEV-Schutz bei minimalen Zusatzkosten.

**Was NICHT zum Schutz reicht**

- **Nur hohe Slippage setzen:** macht dich **attraktiver** für Sandwiches, nicht weniger
- **Nachts oder am Wochenende traden:** Bots sind 24/7 aktiv
- **Kleine Trades machen:** ab L2 auch kleine Trades anfällig
- **"Hoffnung auf Fairness":** strukturell unrealistisch

**Die kostenlose Versicherung**

Die meisten MEV-Schutz-Tools sind **kostenlos** oder kosten Centbeträge mehr als der Standard. Der Schutz ist oft 1-5% deines Trade-Volumens. Für jeden aktiven DeFi-Nutzer ist die Installation dieser Tools **die höchste Rendite pro Aufwands-Einheit**, die es gibt.

Eine einmalige 5-Minuten-Konfiguration von Flashbots Protect + Bookmark für CowSwap spart typisch 100-1.000+ USD pro Jahr für aktive Nutzer. Die Amortisations-Zeit ist oft der erste geschützte Swap.

### Folien-Zusammenfassung

**[Slide 1] — Titel**
Praktischer Schutz: Private Mempools und Intent-basierte Systeme

**[Slide 2] — Drei Schutz-Kategorien**
1. Private Mempools (RPC-Ersatz)
2. Intent-basierte DEXs
3. Native MEV-Schutz in Aggregatoren

**[Slide 3] — Flashbots Protect**
protect.flashbots.net
Ein-Klick-RPC in MetaMask
Sandwich strukturell unmöglich
Backrun-Refunds

**[Slide 4] — MEV Blocker**
mevblocker.io (von CoW-Team)
Höhere Builder-Diversität
90%+ Backrun-Refunds
Alternative zu Flashbots

**[Slide 5] — Intent-basierte Systeme**
CowSwap (swap.cow.fi): Intent statt Transaktion, Solver-Wettbewerb, Coincidence of Wants
Uniswap X: in Standard-Uniswap-Interface integriert, Dutch-Auction-Mechanik
1inch Fusion: nutzt 1inch-Liquiditäts-Aggregation
Strukturell kein Sandwich möglich

**[Slide 6] — Entscheidungs-Matrix**
< 5.000 USD: Aggregator mit MEV-Flag
5.000-50.000: Flashbots RPC
50.000+: CowSwap

**[Slide 7] — Layered Defense**
1. Private RPC als Default
2. DEX-Aggregator
3. Intent-basiert für große Trades
4. Niedrige Slippage
5. Trade-Splitting

### Sprechertext

**[Slide 1]** Diese Lektion ist die praktische Kernlektion des Moduls. Hier lernst du die konkreten Tools, mit denen du dich vor MEV schützt. Alle sind kostenlos oder fast kostenlos und einfach zu nutzen.

**[Slide 2]** Es gibt drei Schutz-Kategorien. Erstens: Private Mempools — deine Transaktion geht nicht in den öffentlichen Mempool. Zweitens: Intent-basierte DEXs — du signierst eine Absicht statt einer Transaktion, Solver führen sie aus. Drittens: Native MEV-Schutz in DEX-Aggregatoren. Wir gehen jede durch.

**[Slide 3]** Flashbots Protect ist das meistgenutzte Tool. Gehe zu protect.flashbots.net, klicke "Add to MetaMask", wechsle zum Flashbots-Netzwerk wenn du MEV-Schutz willst. Deine Transaktion geht nicht in den öffentlichen Mempool, sondern direkt an Builder. Sandwich-Angriffe sind strukturell unmöglich. Bonus: Backrun-Refunds — wenn deine Transaktion trotzdem Teil von legitimem MEV wird, bekommst du 80 bis 90 Prozent des MEV zurück.

**[Slide 4]** MEV Blocker ist die Alternative von CoW-Team. mevblocker.io. Funktioniert ähnlich wie Flashbots Protect, aber mit höherer Builder-Diversität und höheren Backrun-Refunds, oft 90 Prozent plus. In 2024 und 2025 hat es an Marktanteil gewonnen. Beide Tools sind gut — die Wahl ist Geschmackssache.

**[Slide 5]** Intent-basierte Systeme — die strukturell sicherste Schutz-Klasse. CowSwap ist das prominenteste Beispiel: swap.cow.fi. Du signierst eine Limit Order — "verkaufe 100 ETH für mindestens 290.000 USDC". Die Order geht in einen Off-Chain-Pool. Solver konkurrieren um Ausführung. Bei Coincidence of Wants — wenn gleichzeitig jemand das Gegenteil will — wird direkt gematcht ohne DEX-Liquidität. Das spart Fees und Slippage. MEV-Schutz ist strukturell, weil keine öffentliche Transaktion existiert. Uniswap X ist die Alternative von Uniswap Labs, integriert in das Standard-Uniswap-Interface — keine separate App nötig — und nutzt eine Dutch-Auction-Mechanik. 1inch Fusion nutzt 1inch's umfangreiche Liquiditäts-Aggregation. Alle drei bieten ähnlichen Schutz, unterscheiden sich aber in Solver-Diversität und unterstützten Pairs.

**[Slide 6]** Die Entscheidungs-Matrix für welches Tool wann. Unter 5.000 Dollar: Aggregator wie 1inch mit MEV-Protection-Flag. 5.000 bis 50.000 Dollar: Flashbots Protect RPC plus Uniswap oder 1inch. Über 50.000 Dollar: CowSwap. Für sehr große Trades über 500.000 Dollar auch OTC-Deals mit Market Makern in Betracht ziehen.

**[Slide 7]** Layered Defense für maximalen Schutz. Erstens: Private RPC als Default in MetaMask — schützt alle Transaktionen, nicht nur Swaps. Zweitens: DEX-Aggregator nutzen statt Uniswap direkt. Drittens: Intent-basiert für große Trades. Viertens: Slippage konservativ halten. Fünftens: bei wirklich großen Trades in Tranchen aufteilen. In Kombination erreicht das 95 Prozent plus MEV-Schutz bei minimalen Zusatzkosten. Die einmalige 5-Minuten-Konfiguration spart typisch 100 bis 1.000 Dollar pro Jahr für aktive Nutzer.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Drei-Kategorien-Diagramm mit Icons.

**[Slide 3]** **SCREENSHOT SUGGESTION:** Flashbots Protect Website mit "Add to MetaMask"-Button.

**[Slide 4]** **SCREENSHOT SUGGESTION:** MEV Blocker Website.

**[Slide 5]** Drei-Spalten-Layout der Intent-basierten Systeme: **SCREENSHOT SUGGESTION:** CowSwap Swap-Interface mit Solver-Preisen | Uniswap X Settings mit MEV-Schutz-Toggle | 1inch Fusion Order-Flow.

**[Slide 6]** Entscheidungs-Matrix als Tabelle.

**[Slide 7]** Fünf-Schichten-Pyramide der Layered Defense.

### Übung

**Aufgabe: MEV-Schutz konfigurieren und testen**

**Teil A: Setup (30 Minuten)**

1. Installiere Flashbots Protect ODER MEV Blocker als RPC in deiner MetaMask
2. Bookmark folgende Tools: CowSwap, 1inch, Matcha
3. Konfiguriere in deinem Standard-Wallet: MEV-Schutz als Default-Netzwerk
4. Teste mit einer kleinen Transaktion (5-10 USD), dass alles funktioniert

**Teil B: Analyse (45 Minuten)**

Für 5 geplante Trades der nächsten Woche, dokumentiere:
1. Trade-Größe und Token-Paar
2. Welches Tool würdest du nutzen basierend auf der Entscheidungs-Matrix?
3. Warum?
4. Welche Slippage wirst du setzen?

**Teil C: Reflexion (15 Minuten)**

Nach der ersten Woche mit aktivem MEV-Schutz:
1. Welche Tools hast du tatsächlich genutzt?
2. Gab es Unterschiede in Ausführungs-Preisen oder -Zeiten?
3. Hattest du fehlgeschlagene Transaktionen? Warum?

**Deliverable:** Setup-Screenshots + Trade-Plan + Reflexions-Bericht (1-2 Seiten).

### Quiz

**Frage 1:** Warum ist Flashbots Protect effektiver gegen Sandwich-Angriffe als einfach die Slippage-Toleranz sehr niedrig zu setzen?

<details>
<summary>Antwort anzeigen</summary>

Beide Ansätze sind "Schutz-Maßnahmen", aber sie funktionieren auf komplett unterschiedliche Weisen. **Niedrige Slippage:** du reduzierst den maximalen Gewinn, den ein Sandwich-Searcher extrahieren kann, und machst den Angriff unattraktiver. Problem: bei volatilen Märkten schlagen deine Transaktionen häufiger fehl (weil die Preis-Bewegung natürlich die Slippage übersteigt). Du musst die Transaktion neu submittieren, was mehr Gas kostet. Und bei großen Trades kann selbst 0,1% Slippage für einen Searcher noch profitabel sein — die Formel ist "Swap-Größe² / Pool-Liquidität × Slippage", und bei ausreichender Größe rechnet sich sogar minimale Slippage. **Flashbots Protect:** deine Transaktion landet strukturell nicht im öffentlichen Mempool. Der Searcher sieht sie nie, bevor sie ausgeführt wird. Ein Sandwich-Angriff ist nicht nur unattraktiv, sondern mechanisch unmöglich — der Searcher hat kein Informations-Fenster, in dem er Front-Run und Back-Run Transaktionen senden könnte. Das ist ein **kategorischer** Schutz, nicht nur ein **quantitativer**. Weitere Vorteile von Flashbots Protect: Erstens, kein Trade-off mit Ausführungs-Wahrscheinlichkeit. Du kannst weiterhin normale Slippage (z.B. 1%) setzen und bekommst trotzdem vollen Schutz. Zweitens, Backrun-Refunds. Wenn nach deinem Trade legitimer Arbitrage-MEV entsteht (z.B. weil dein Trade den Preis zwischen Pools aus dem Gleichgewicht gebracht hat), bekommst du 80-90% dieses MEV als Refund zurück. Das kann netto sogar zu einem leicht **besseren** Ausführungspreis führen als ohne Schutz. Drittens, universeller Schutz. Niedrige Slippage hilft nur bei Sandwich-artigen Angriffen. Flashbots Protect hilft bei allen Front-Running-Formen, einschließlich generalized front-running, das die Slippage-Schutz nicht abfängt. Die quantitative Wertung: in Studien schützt Flashbots Protect / MEV Blocker 95-99% aller Sandwich-Versuche. Niedrige Slippage (0,1%) schützt vielleicht 60-80% — besser als nichts, aber strukturell unterlegen. Praktische Empfehlung: beide kombinieren. Flashbots Protect als primärer Schutz, niedrige Slippage als sekundärer Schutz (für den seltenen Fall, dass die Flashbots-Route mal nicht erfolgreich routet).
</details>

**Frage 2:** Alice will 200.000 USDC in ETH swappen. Sie hat drei Optionen: Uniswap direkt mit niedriger Slippage, Uniswap über Flashbots-Protect-RPC, und CowSwap. Warum ist CowSwap für diese Größenordnung meist die beste Wahl, auch wenn es etwas "langsamer" ist?

<details>
<summary>Antwort anzeigen</summary>

Bei 200.000 USD Trade-Größe sind mehrere Faktoren relevant, die CowSwap strukturell bevorzugen. **Erstens: Preis-Impact durch Pool-Ausführung.** Uniswap V3 ETH-USDC 0,05% Pool hat hohe Liquidität, aber 200.000 USD bewegt trotzdem messbar den Preis. Bei AMM-Ausführung ist Slippage durch Pool-Tiefe begrenzt. CowSwap's Solver-Netzwerk kann: (a) mehrere DEXs parallel nutzen, (b) DEX-Liquidität mit OTC-Liquidität (Market Maker Inventory) kombinieren, (c) bei Coincidence of Wants direkt matchen ohne Pool-Impact. Das Ergebnis ist oft ein effektiv niedrigerer Preis-Impact als Single-DEX-Ausführung. **Zweitens: MEV-Schutz-Tiefe.** Flashbots Protect schützt vor Sandwich, aber: der Trade geht immer noch durch eine einzelne DEX-Pool. Wenn der Pool zu flach ist, zahlt Alice trotzdem signifikanten Preis-Impact. CowSwap's Solver optimieren die Route über viele Pools gleichzeitig. **Drittens: Coincidence-of-Wants-Bonus.** Bei 200k-Größe ist die Wahrscheinlichkeit, dass parallel jemand anderes ein entgegengesetztes Trade machen will, relevant hoch. Wenn ein CoW gefunden wird, ist der effektive Preis deutlich besser als jede DEX-Ausführung — die Fees und Slippage entfallen komplett. Das passiert bei ~5-15% aller CowSwap-Trades. **Viertens: Solver-Wettbewerb.** CowSwap's Solver konkurrieren in jeder Batch um das Recht, den Trade auszuführen. Der Solver, der den besten Preis für Alice bietet, gewinnt. Das ist strukturell optimierter als eine einzelne AMM-Route zu nehmen. **Fünftens: Gas-Effizienz.** Die Solver bundeln mehrere User-Trades in wenigen on-chain Transaktionen. Der Gas-Anteil pro Nutzer ist oft niedriger als bei direkter Ausführung. **Gegen CowSwap sprechen:** (a) Zeit: Trades werden in Batches ausgeführt, typisch alle 30-60 Sekunden. Das ist ~1-2 Minuten Latenz gegenüber sofortigem Swap. (b) Slight Solver-Fee, typisch 0,05-0,2%. Netto: für 200.000 USD ist der bessere Preis durch CoW, bessere Route und MEV-Schutz typisch 0,5-2% besser als direkter Swap, während die Mehrkosten (Latenz + Solver-Fee) <0,3% ausmachen. **Empfehlung:** für Trades ab 50.000 USD und definitiv ab 100.000 USD ist CowSwap der State-of-the-Art. Ausnahme: wenn die Transaktion aus irgendeinem Grund sofort ausgeführt werden muss (z.B. klarer kurzer Preis-Dislocation, die man ausnutzen will), dann direkter Swap mit Flashbots Protect. Aber solche Fälle sind selten für typische Portfolio-Rebalancing. Für reguläre Trades: CowSwap.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → Drei Schutz-Kategorien → Flashbots Protect → MEV Blocker → Intent-basierte Systeme (CowSwap, Uniswap X, 1inch Fusion) → Entscheidungs-Matrix → Layered Defense
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — RPC-Setup-Screenshots, CowSwap-Interface, Solver-Wettbewerb-Diagramm, Uniswap-X-Auction-Flow, Trade-Größen-Schutz-Matrix

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 11.6 — MEV-Mitigation auf Protokoll-Ebene und Zukunftsausblick

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die wichtigsten Forschungsrichtungen zur MEV-Mitigation benennen
- SUAVE und Threshold Encryption als alternative Ansätze einschätzen
- Den Unterschied zwischen Nutzer-seitigem Schutz und Protokoll-Level-Lösungen verstehen
- Die Konzepte Encrypted Mempool, Fair Ordering und Inclusion Lists als technische Mitigation-Optionen einordnen
- Die Rolle von L2s (Arbitrum Sequencer, Base-Architektur) in der MEV-Landschaft analysieren
- Eine realistische Einschätzung abgeben, welche MEV-Mitigationen in 2–5 Jahren produktiv werden können

### Erklärung

Die Tools aus Lektion 11.5 sind praktisch heute verfügbar und schützen effektiv. Aber sie sind **Nutzer-seitige Workarounds** — der Nutzer muss aktiv handeln, um Schutz zu bekommen. Parallel dazu wird auf **Protokoll-Ebene** an fundamentaleren Lösungen gearbeitet. Diese Lektion gibt einen Überblick.

**Die zwei Ansätze: Workaround vs. Protokoll-Lösung**

**Workaround-Ansatz (aktuelle Tools):**
- Nutzer wählt MEV-Schutz aus
- Schutz ist opt-in, nicht Default
- MEV-Markt existiert weiter, Nutzer umgehen ihn nur

**Protokoll-Level-Ansatz (zukünftige Lösungen):**
- MEV wird auf Architektur-Ebene verhindert oder fair verteilt
- Schutz ist Default, nicht opt-in
- MEV-Markt wird strukturell umgestaltet

Beide Ansätze sind nicht exklusiv — sie ergänzen sich. Workarounds schützen jetzt, Protokoll-Lösungen die Zukunft.

**Ansatz 1: SUAVE (Single Unified Auction for Value Expression)**

SUAVE ist eine Initiative von Flashbots, eine dedizierte "MEV-Chain" zu schaffen, die als Infrastruktur für alle EVM-Chains fungiert.

**Die Idee:** Statt dass jede Chain (Ethereum, Arbitrum, Polygon, etc.) ihre eigenen Builder-Relay-Strukturen hat, wäre SUAVE ein universeller Block-Builder, der Chains bedient. Nutzer senden Transaktionen an SUAVE, SUAVE konstruiert optimale Blocks für alle Chains simultan, und verteilt MEV-Überschüsse fair.

**Kernmerkmale:**
- **Cross-Chain MEV-Optimierung:** Arbitrage-Möglichkeiten zwischen Chains werden effizienter genutzt
- **Encrypted Order Flow:** Transaktionen werden verschlüsselt submittiert, Builder sehen sie nicht vor Ausführung
- **Nutzer-Refunds:** MEV-Gewinne fließen teilweise zurück an Nutzer

**Status (2025-2026):** In aktiver Entwicklung, Testnet-Phase. Noch nicht produktiv auf Mainnet. Launch geplant für 2026+.

**Realistische Einschätzung:** SUAVE ist ein ambitioniertes Projekt mit unklarem Zeitplan und Adoption-Unsicherheiten. Wenn es erfolgreich ist, könnte es MEV-Markt fundamental restrukturieren. Wenn nicht, bleiben die aktuellen Workarounds der Hauptschutz.

**Ansatz 2: Encrypted Mempool (Threshold Encryption)**

Eine der elegantesten Lösungen: Transaktionen werden **verschlüsselt** in den Mempool eingebracht. Erst nach Block-Finalisierung werden sie entschlüsselt und ausgeführt.

**Wie es funktioniert:**
- Nutzer verschlüsselt Transaktion mit einem Threshold-Schlüssel (verteilt über mehrere Validatoren)
- Verschlüsselte Transaktion geht in Mempool — öffentlich, aber unlesbar
- Builder ordnet verschlüsselte Transaktionen in Block-Reihenfolge
- Nach Finalisierung entschlüsseln Validatoren kollektiv (Threshold-Signatur)
- Transaktion wird ausgeführt

**Effekt:** Sandwich-Angriffe strukturell unmöglich. Der Searcher sieht nicht, was die Nutzer-Transaktion tut, bevor die Reihenfolge festgelegt ist.

**Herausforderungen:**
- **Kryptographische Komplexität:** Threshold-Schemes sind aufwändig
- **Latenz:** zusätzliche Entschlüsselungs-Schritte
- **MEV verlagert sich:** Builder sehen zwar nicht einzelne Transaktionen, aber können trotzdem an der Gesamt-Reihenfolge MEV machen

**Projekte in diesem Bereich:**
- **Shutter Network:** produktiv auf Gnosis Chain, plant Ethereum-Integration
- **SecretNetwork:** Cosmos-Ecosystem, eigene Encrypted-Chain
- **Forschung bei Ethereum Foundation:** langfristig für Ethereum L1 diskutiert

**Status:** Shutter ist auf Gnosis Chain produktiv. Ethereum-L1-Integration ist Jahre entfernt.

**Ansatz 3: Batch-Auktionen**

Statt dass Transaktionen in kontinuierlichem Fluss ausgeführt werden, werden sie in **Batches** gesammelt und periodisch ausgeführt, alle zum gleichen Preis.

**Wie es funktioniert:**
- Transaktionen werden über einen Zeitraum (z.B. 5 Sekunden oder 30 Sekunden) gesammelt
- Alle Trades im gleichen Asset werden zum gleichen Clearing-Preis ausgeführt
- Keine Reihenfolgen-Abhängigkeit innerhalb eines Batches
- Sandwich unmöglich, weil alle Trades denselben Preis bekommen

**Projekte:**
- **CowSwap:** bereits produktiv, verwendet Batch-Auktionen für Intent-Matching
- **Auros:** experimentelles Batch-Auktions-Protokoll
- **Penumbra:** Cosmos-Ecosystem mit Batch-Auktionen als Default

**Vorteil:** Konzeptionell einfach, gut verstanden aus traditionellen Finanzmärkten (Börsen-Eröffnungs-Auktionen). **Nachteil:** Latenz — Trades sind nicht instant.

**Ansatz 4: Commit-Reveal Schemes**

Ein klassischer kryptographischer Ansatz:
1. Nutzer submittiert Hash seiner Transaktion (Commit-Phase)
2. Nach Block-Finalisierung offenbart Nutzer die tatsächliche Transaktion (Reveal-Phase)

**Vorteil:** Einfach zu implementieren. **Nachteil:** Braucht zwei Phasen pro Transaktion — Latenz verdoppelt. In der Praxis weniger elegant als Threshold-Verschlüsselung.

**Ansatz 5: Order-Flow-Auktionen (OFAs)**

Ein Markt-basierter Ansatz: Wallets (wie MetaMask) **auktionieren** Nutzer-Transaktions-Flow an den Meistbietenden.

**Wie es funktioniert:**
- MetaMask etc. agieren als "Flow-Verkäufer"
- Builder und Searcher bieten für den Zugang zu diesem Flow
- Der gewinnende Akteur bekommt exklusiven Zugang — und teilt den Gewinn mit Nutzer/Wallet

**Kritik:** Das **institutionalisiert MEV** statt es zu eliminieren. Es wird nur besser verteilt (Wallet und Nutzer bekommen Anteil statt nur Searcher).

**Aktuell:** MetaMask experimentiert mit OFAs via "MetaMask Smart Transactions". Flashbots hat ein Refund-System über MEV-Share etabliert.

**Realistische Einschätzung der Zukunft**

Die aktuelle Entwicklung geht in mehrere Richtungen gleichzeitig:

**Kurzfristig (2025-2026):**
- Nutzer-seitige Tools (Flashbots Protect, CowSwap) werden Standard
- Wallet-integrierte OFAs werden häufiger
- Langsame Diversifizierung von Builder und Relay Landschaft

**Mittelfristig (2026-2028):**
- SUAVE möglicherweise produktiv
- Batch-Auktionen breiter adaptiert
- Encrypted Mempool auf L2s (Shutter auf Gnosis, möglicherweise andere)

**Langfristig (2028+):**
- Ethereum L1 möglicherweise mit Encrypted Mempool
- "MEV by design" als Feature akzeptiert, nicht eliminiert — aber fair verteilt
- Neue Chains mit MEV-Resistenz als Kerndesign (z.B. Solana's Jito, alternative Ansätze)

**Die pragmatische Nutzer-Strategie**

Was heißt das für dich als Nutzer?

1. **Nicht auf Zukunft warten:** die aktuellen Tools sind effektiv. Nutze sie heute.
2. **Auf L1 bleiben, wenn MEV-Schutz wichtig:** Ethereum Mainnet hat die besten Schutz-Tools
3. **Bei L2-Wahl MEV beachten:** Gnosis Chain mit Shutter ist MEV-resistent. Arbitrum/Base haben weniger native Schutz
4. **Offene Augen halten:** das Feld entwickelt sich schnell. In 2-3 Jahren könnte sich die Landschaft deutlich geändert haben
5. **Kritisch bleiben:** neue "MEV-free"-Claims sind oft Marketing. Prüfe die tatsächlichen Mechanismen

**Die philosophische Frage**

MEV ist nicht nur ein technisches Problem — es ist auch eine Frage über die Natur blockchainbasierter Systeme. Die zugrundeliegende Frage: **wenn ein System komplett transparent ist (öffentliche Mempool), ist Information-Asymmetry vermeidbar?**

Einige argumentieren: MEV ist ein Feature, nicht ein Bug. Transparenz erlaubt Arbitrage, die Märkte effizient macht. Sandwich ist nur die Schattenseite dieser Transparenz.

Andere argumentieren: Transparenz sollte auf **Verifiability** beschränkt sein (kann ich nachweisen, dass alles regelkonform lief?), nicht auf **Pre-execution Visibility** (kann jeder meine Transaktion sehen, bevor sie ausgeführt wird?).

Die aktuellen Forschungs-Trends (Encrypted Mempool, SUAVE) bewegen sich klar in Richtung "Transparenz nach Finalisierung, Privatheit davor". Das ist ein grundlegender Design-Shift, der die Blockchain-Philosophie weiterentwickelt.

**Die konservative Zusammenfassung**

Für dich als DeFi-Nutzer in 2026:
- **Nutze die aktuellen Tools** — Flashbots Protect, MEV Blocker, CowSwap
- **Verstehe die MEV-Dynamik** — damit du informierte Entscheidungen triffst
- **Folge der Entwicklung nur oberflächlich** — Protokoll-Level-Lösungen kommen, aber langsam
- **Erwarte Evolution, nicht Revolution** — MEV wird wahrscheinlich nicht "gelöst" in einem Schritt, sondern graduell verbessert

Der pragmatische Ansatz: aktuelle Tools als Default, und wenn bessere Lösungen produktiv werden, graduell migrieren.

### Folien-Zusammenfassung

**[Slide 1] — Titel**
MEV-Mitigation auf Protokoll-Ebene

**[Slide 2] — Zwei Ansätze**
Workaround (Nutzer-seitig, heute)
vs.
Protokoll-Lösung (strukturell, Zukunft)

**[Slide 3] — SUAVE**
Flashbots-Initiative
Dedizierte MEV-Chain für alle EVMs
Encrypted Order Flow + Nutzer-Refunds
Status: Testnet, Launch ~2026+

**[Slide 4] — Drei Protokoll-Lösungen**
Encrypted Mempool (Threshold Encryption): Transaktion verschlüsselt bis Finalisierung — Sandwich strukturell unmöglich
Batch-Auktionen: Trades periodisch gesammelt, Clearing zum einheitlichen Preis — kein Sandwich möglich
Order-Flow-Auktionen (OFAs): Wallets auktionieren Flow, Nutzer bekommen MEV-Anteil — institutionalisiert MEV, eliminiert nicht

**[Slide 5] — Reifegrad und produktive Umsetzungen**
Encrypted Mempool: Shutter Network produktiv auf Gnosis Chain
Batch-Auktionen: CowSwap produktiv auf Ethereum
OFAs: erste Wallet-Integrationen (z.B. MetaMask)
Ethereum L1 Integration noch Jahre entfernt

**[Slide 6] — Zeitplan-Erwartung**
2025-2026: aktuelle Tools Standard
2026-2028: SUAVE möglich
2028+: Encrypted Mempool auf L1

**[Slide 7] — Nutzer-Strategie**
Heute: aktuelle Tools nutzen
Nicht auf Zukunft warten
Entwicklung beobachten
Kritisch bei Marketing-Claims

### Sprechertext

**[Slide 1]** Diese abschließende Lektion gibt einen Überblick über die Protokoll-Level-Lösungen zu MEV. Die aktuellen Tools aus der letzten Lektion sind praktisch — sie schützen dich heute. Aber sie sind Nutzer-seitige Workarounds. Parallel wird an fundamentaleren Lösungen gearbeitet.

**[Slide 2]** Zwei Ansätze. Workaround-Ansatz: der Nutzer muss aktiv handeln, um Schutz zu bekommen — Flashbots Protect aktivieren, CowSwap nutzen. MEV existiert weiter, Nutzer umgehen es nur. Protokoll-Level-Ansatz: MEV wird architekturell verhindert oder fair verteilt. Schutz ist Default, nicht opt-in. Beide ergänzen sich.

**[Slide 3]** SUAVE ist die Flashbots-Initiative einer dedizierten MEV-Chain. Statt dass jede Chain ihre eigene Builder-Relay-Struktur hat, wäre SUAVE eine universelle Infrastruktur für alle EVM-Chains. Features: Cross-Chain-MEV-Optimierung, Encrypted Order Flow — Transaktionen verschlüsselt submittiert —, Nutzer-Refunds für MEV-Gewinne. Status: in Testnet, Launch geplant für 2026 und später. Ambitioniertes Projekt mit unklarem Zeitplan.

**[Slide 4]** Drei zentrale Protokoll-Lösungen werden parallel entwickelt. Erstens: Encrypted Mempool. Threshold Encryption sorgt dafür, dass Transaktionen verschlüsselt in den Mempool gestellt werden. Erst nach Block-Finalisierung werden sie entschlüsselt und ausgeführt. Sandwich ist strukturell unmöglich, weil Searcher nicht sieht was die Transaktion tut, bevor die Reihenfolge festgelegt ist. Zweitens: Batch-Auktionen. Statt kontinuierlicher Ausführung werden Transaktionen in Batches gesammelt und alle zum gleichen Clearing-Preis ausgeführt. Keine Reihenfolgen-Abhängigkeit innerhalb eines Batches — Sandwich unmöglich. Bewährt aus traditionellen Finanzmärkten — Börsen-Eröffnungs-Auktionen funktionieren so. Nachteil: Latenz statt instant-execution. Drittens: Order-Flow-Auktionen, OFAs. Wallets wie MetaMask auktionieren den Nutzer-Transaktions-Flow an den Meistbietenden. Builder und Searcher bieten, der Gewinner bekommt exklusiven Zugang und teilt den Gewinn mit Nutzer und Wallet. Kritik: das institutionalisiert MEV statt es zu eliminieren. Es wird besser verteilt — Wallet und Nutzer bekommen einen Anteil — aber das Grundmuster bleibt.

**[Slide 5]** Reifegrad und produktive Umsetzungen der drei Lösungen heute. Encrypted Mempool ist als Shutter Network bereits produktiv auf Gnosis Chain — funktioniert, wird genutzt, aber kleine Chain. Batch-Auktionen sind als CowSwap auf Ethereum produktiv — größtes Volumen aller Intent-DEXs. OFAs sind in ersten Wallet-Integrationen sichtbar, etwa bei MetaMask, aber noch experimentell. Ethereum L1 Integration aller drei Mechanismen ist noch Jahre entfernt — die Bauteile existieren, die Integration in den Standard-Stack braucht Zeit.

**[Slide 6]** Realistischer Zeitplan. Kurzfristig 2025 bis 2026: aktuelle Nutzer-Tools werden Standard, Wallet-integrierte OFAs häufiger. Mittelfristig 2026 bis 2028: SUAVE möglicherweise produktiv, Batch-Auktionen breiter adaptiert, Encrypted Mempool auf L2s. Langfristig ab 2028: Ethereum L1 möglicherweise mit Encrypted Mempool, MEV als fair-verteiltes Feature statt eliminiert.

**[Slide 7]** Die pragmatische Nutzer-Strategie. Erstens: nicht auf die Zukunft warten — die aktuellen Tools sind effektiv, nutze sie heute. Zweitens: auf L1 bleiben wenn MEV-Schutz wichtig ist — Ethereum Mainnet hat die besten Tools. Drittens: bei L2-Wahl MEV beachten — Gnosis Chain mit Shutter ist MEV-resistent. Viertens: offene Augen halten — das Feld entwickelt sich schnell. Fünftens: kritisch bleiben — neue MEV-free-Claims sind oft Marketing, prüfe die tatsächlichen Mechanismen. MEV wird wahrscheinlich nicht auf einen Schlag gelöst, sondern graduell verbessert. Erwarte Evolution, nicht Revolution.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Zwei-Ansätze-Vergleich: Workaround vs. Protokoll-Lösung.

**[Slide 3]** SUAVE-Architektur-Diagramm: Multi-Chain-Builder mit Encrypted Flow.

**[Slide 4]** Drei-Spalten-Layout der Protokoll-Lösungen: Threshold-Encryption-Flow (Verschlüsselung → Mempool → Finalisierung → Entschlüsselung) | Batch-Auktion-Visualisierung (Sammeln → Clearing → Ausführung) | OFA-Auktions-Flow (Wallet → Bieter → Gewinner → Refund).

**[Slide 5]** Reifegrad-Tabelle: jede Lösung mit Status (produktiv/experimentell), Beispiel-Implementierung (Shutter/CowSwap/MetaMask) und Chain-Verfügbarkeit.

**[Slide 6]** Zeitstrahl 2025-2030 mit Meilensteinen.

**[Slide 7]** Nutzer-Strategie-Checkliste.

### Übung

**Aufgabe: Zukunftsszenarien-Analyse**

Recherchiere den aktuellen Status (Stand 2026) von:
1. **SUAVE** (flashbots.net/suave)
2. **Shutter Network** (shutter.network)
3. **Ethereum Enshrined PBS** (Status auf ethresear.ch)

Für jedes Projekt:
1. Aktueller Entwicklungsstand
2. Erwarteter Zeitplan
3. Hauptkritik und offene Fragen
4. Wie würde sich DeFi für normale Nutzer verändern, wenn das Projekt erfolgreich wäre?

**Deliverable:** 3-Projekt-Vergleichsbericht (2-3 Seiten) + persönliche Einschätzung (5-8 Sätze): Welches Projekt würdest du als wahrscheinlichsten Gewinner sehen und warum?

### Quiz

**Frage 1:** Warum wird die "MEV-Elimination" wahrscheinlich nie komplett gelingen, und was bedeutet das für die langfristige DeFi-Strategie?

<details>
<summary>Antwort anzeigen</summary>

MEV ist strukturell in die Natur von Blockchain-Systemen eingewoben — auch wenn einzelne Formen (Sandwich) technisch eliminiert werden können, verbleibt eine fundamentale Rest-MEV-Menge. Gründe: **Erstens: Reihenfolgen-MEV bleibt.** Selbst mit Encrypted Mempool sind Transaktionen zwar vor Ausführung unlesbar, aber die Reihenfolge im Block bestimmt immer noch, wer zuerst von Preisveränderungen profitiert. Arbitrage zwischen DEX-Pools bleibt profitabel, weil Preise immer divergieren werden. Wer zuerst arbitragiert, kassiert den Spread. Das ist kein "Bug", sondern eine Grundeigenschaft fragmentierter Märkte. **Zweitens: Cross-Chain-MEV explodiert.** Je mehr Chains existieren (Ethereum + 50+ L2s + andere L1s), desto mehr Arbitrage-Gelegenheiten zwischen Chains. Das ist grundsätzlich erwünschte Preis-Konvergenz — aber der MEV-Gewinn fließt an Cross-Chain-Arbitrageure, nicht an Retail-Nutzer. **Drittens: Liquidations-MEV bleibt.** Solange gehebelte Positionen existieren, werden Liquidations-Gelegenheiten existieren. Die erste Person, die eine liquidierbare Position erkennt und abwickelt, bekommt den Bonus. Das ist im Protokoll-Design so gewollt — es sichert Solvenz. **Viertens: Selbst Protokoll-Level-Lösungen haben Rest-MEV.** Encrypted Mempool verhindert Sandwich auf Transaktions-Ebene, aber Builder sehen nach Entschlüsselung trotzdem Muster und können Block-Reihenfolge optimieren. Batch-Auktionen haben MEV innerhalb der Batch-Abwicklung (welcher Solver gewinnt die Batch). **Langfristige DeFi-Strategie-Implikationen:** Erstens, **akzeptiere Rest-MEV**. Versuche nicht, es auf 0 zu drücken — die Kosten übersteigen meist den Nutzen. Ziel ist stattdessen, die **schädlichen Formen** (Sandwich) zu eliminieren und die **neutralen** (Arbitrage) zu akzeptieren. Zweitens, **Infrastruktur-Diversifikation**. Nutze mehrere Schutz-Mechanismen — nicht nur auf eine Lösung setzen, weil jede ihre Grenzen hat. Drittens, **Informations-Vorsprung**. Die Nutzer, die MEV verstehen, zahlen strukturell weniger als die, die es nicht verstehen. Die 5-10% Rendite-Differenz zwischen naiven und informierten Nutzern kumuliert über Jahre signifikant. Viertens, **Protokoll-Wahl**. Über Zeit werden sich MEV-resistente Protokolle etablieren (z.B. Gnosis mit Shutter, möglicherweise zukünftige Rollups mit MEV-Schutz). Für MEV-sensitive Operationen lohnt sich die Migration zu solchen Protokollen. Fünftens, **langfristige Pragmatik**. MEV wird wahrscheinlich 30-60% reduziert in 5 Jahren, nicht eliminiert. Die Dimensionen, die wir heute schon lösen können (Sandwich durch Private Mempools), werden Default. Die, die strukturell bleiben (Arbitrage), werden fair verteilt. Die DeFi-Strategie in 5 Jahren wird wahrscheinlich MEV nicht als "zu vermeidenden Feind" sehen, sondern als "transparenten Kostenfaktor" — ähnlich wie Börsen-Gebühren oder Spread-Kosten heute.
</details>

**Frage 2:** Warum könnte es **nicht** im Interesse des Ethereum-Ökosystems sein, MEV komplett zu eliminieren, auch wenn das technisch möglich wäre?

<details>
<summary>Antwort anzeigen</summary>

Eine kontraintuitive, aber wichtige Perspektive. MEV hat mehrere Funktionen im Ökosystem, die bei vollständiger Elimination verloren gingen. **Erstens: MEV incentiviert Validator-Participation.** Ein Teil des MEV-Gewinns fließt über MEV-Boost zu Validatoren zurück — typisch 5-10% zusätzliche Rewards. Das macht Staking profitabler, was mehr ETH-Staking bedeutet, was wiederum die Netzwerk-Sicherheit erhöht. Ohne MEV wären Staking-Rewards niedriger, potenziell würde weniger ETH staked, und die Sicherheit sinken. Die aktuelle MEV-Boost-Adoption (>90% der Validatoren) zeigt, dass Validatoren MEV-Einkommen wertschätzen. **Zweitens: Arbitrage-MEV macht DeFi-Märkte effizient.** Ohne Arbitrage würden Preise zwischen DEXs divergieren. ETH könnte auf Uniswap 3.000 USD kosten, auf SushiSwap 3.050, auf Balancer 2.970. Nutzer müssten manuell den besten Pool finden, was für die meisten zu komplex ist. Arbitrage-Bots lösen dieses Problem automatisch — der "Preis" ist, dass sie den Spread einstreichen, aber das Ergebnis ist ein kohärenter, effizienter Markt. Die Kosten, die Nutzer bei Arbitrage "verlieren", sind kleiner als die, die sie ohne Arbitrage durch ineffiziente Pool-Wahl verlieren würden. **Drittens: Liquidations-MEV sichert Lending-Protokoll-Solvenz.** Aave, Compound, Maker funktionieren nur, wenn unterbesicherte Positionen schnell abgewickelt werden. Die Liquidations-Boni sind die Incentive, dass Liquidatoren rund um die Uhr Positionen überwachen. Ohne diese Incentive würde das System in Stress-Situationen versagen — wenn ETH 30% in einer Stunde fällt, müssen hunderte Millionen USD an Positionen innerhalb von Minuten liquidiert werden, um das Protokoll solvent zu halten. Das funktioniert nur durch die MEV-Economy der Liquidatoren. **Viertens: MEV finanziert Infrastruktur.** Flashbots, MEV Blocker, SUAVE-Entwicklung — all das wird teilweise durch MEV-Einnahmen finanziert. Die Tools, die Nutzer vor schädlichem MEV schützen, werden durch die MEV-Economy selbst finanziert. Vollständige Elimination würde diese Finanzierungs-Quelle entziehen. **Fünftens: MEV als Preis-Information.** MEV-Aktivität ist ein Signal: wo am meisten MEV existiert, sind oft die interessantesten Markt-Bewegungen und Gelegenheiten. Für professionelle Akteure ist MEV-Daten (eigenphi, mev.so) eine wichtige Informations-Quelle. **Die Nuance:** Das Argument ist nicht "alles MEV ist gut". Schädliche MEV-Formen (vor allem Sandwich) sollten eliminiert werden — sie sind reiner Wert-Transfer von Retail-Nutzern zu Searchern ohne strukturellen Nutzen. Aber **neutrale MEV-Formen** (Arbitrage, Liquidation) haben wichtige System-Funktionen. Die bessere Zielsetzung ist nicht "MEV eliminieren", sondern "**schädliche MEV-Formen eliminieren, neutrale fair verteilen, nützliche erhalten**". Das ist exakt die Richtung, in die sich die Forschung bewegt: Encrypted Mempool eliminiert Sandwich, lässt aber Arbitrage intakt. OFAs verteilen MEV fairer zwischen Wallet/Nutzer/Searcher. SUAVE macht Cross-Chain-MEV effizienter. Für den Nutzer bedeutet das: die DeFi-Landschaft der Zukunft wird wahrscheinlich MEV als strukturelles Feature behalten, aber mit deutlich besseren Schutz-Tools und faireren Verteilungs-Mechanismen. "MEV-Null-DeFi" ist weder technisch erreichbar noch ökonomisch wünschenswert.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → Workaround vs. Protokoll-Lösung → SUAVE-Architektur → Drei Protokoll-Lösungen (Encrypted Mempool, Batch-Auktionen, OFAs) → Reifegrad und produktive Umsetzungen → Zeitstrahl 2025-2030 → Nutzer-Strategie
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — Protokoll-Lösungs-Landkarte, SUAVE-Multi-Chain-Diagramm, Threshold-Encryption-Flow, OFA-Auktions-Zeitleiste, Zukunfts-Roadmap

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Modul-Abschluss-Quiz

Fünf Fragen zum integrierten Verständnis von Modul 11.

**Frage 1:** Erkläre den vollständigen Weg einer DEX-Swap-Transaktion auf Ethereum heute (Post-Merge, mit MEV-Boost), von der Wallet-Signatur bis zur On-Chain-Ausführung. Nenne dabei mindestens vier der vier Hauptakteure der MEV-Supply-Chain.

<details>
<summary>Antwort anzeigen</summary>

Eine typische Swap-Transaktion durchläuft folgenden Prozess: **Schritt 1: Wallet-Signatur.** Alice signiert in ihrer Wallet (z.B. MetaMask) die Swap-Transaktion mit ihrem privaten Schlüssel. Die Transaktion enthält: Zielcontract (z.B. Uniswap Router), Funktion, Parameter (Token-Paar, Betrag, Slippage-Toleranz), Gas-Preis. **Schritt 2: Broadcast über RPC.** Die signierte Transaktion wird an einen Ethereum-Node gesendet — typisch Infura, Alchemy, oder (im geschützten Fall) Flashbots Protect/MEV Blocker. Bei Standard-RPC geht sie in den öffentlichen Mempool. **Schritt 3: Mempool-Propagation.** Innerhalb von Millisekunden verbreitet sich die Transaktion über das Peer-to-Peer-Netzwerk zu den meisten Ethereum-Nodes und damit zu allen Searchern. **Schritt 4: Searcher-Analyse.** Spezialisierte Searcher-Bots analysieren die Transaktion: "ist sie sandwichfähig? ist back-running profitable? gibt es Arbitrage-Gelegenheiten?". Wenn ja, konstruiert der Searcher ein Bundle: ein oder mehrere Transaktionen, die zusammen mit Alice-Swap ausgeführt werden sollen. **Schritt 5: Builder-Submission.** Der Searcher sendet sein Bundle an einen oder mehrere **Builder**. Gleichzeitig sammelt der Builder den öffentlichen Mempool-Content und Bundles von anderen Searchern. **Schritt 6: Builder-Block-Konstruktion.** Jeder Builder konstruiert einen Block, der die maximal mögliche Wertschöpfung darstellt: reguläre Transaktionen + MEV-Bundles in optimaler Reihenfolge. Top-Builder sind beaverbuild, rsync-builder, Titan. **Schritt 7: Relay-Angebot.** Der Builder sendet den fertigen Block (als Angebot) an mehrere **Relays** — Flashbots Relay, ultra sound, Aestus, etc. Der Relay verifiziert Block-Validität und den darin enthaltenen Proposer-Payment. **Schritt 8: Proposer-Auswahl.** Der für diesen Slot designierte **Validator** nutzt MEV-Boost, um aus allen Relay-Angeboten das beste (höchste Zahlung an ihn) auszuwählen. Er signiert den Block-Header — ohne die Transaktionen vorher zu sehen. **Schritt 9: Block-Finalisierung.** Nach Header-Signatur erhält der Validator den vollen Block-Content und propagiert ihn an das Netzwerk. Andere Validatoren verifizieren und bestätigen (Attestation). **Schritt 10: Ausführung.** Alice-Swap ist jetzt on-chain ausgeführt. Wenn sandwiched wurde, hat sie einen schlechteren Ausführungspreis bekommen als ohne. **Die vier Hauptakteure:** **Searcher** (findet MEV-Gelegenheiten, erstellt Bundles), **Builder** (konstruiert optimale Blocks), **Relay** (vermittelt zwischen Builder und Validator), **Validator/Proposer** (signiert und publiziert Block). Der gesamte Prozess dauert typisch 12 Sekunden (eine Ethereum-Slot-Zeit). In dieser Zeit passieren alle diese Schritte automatisch und parallel.
</details>

**Frage 2:** Alice und Bob wollen jeder 100.000 USDC in ETH swappen. Alice nutzt Uniswap direkt über Infura-RPC. Bob nutzt CowSwap. Beide bekommen den gleichen "quoted price" von 3.000 USD pro ETH. Warum werden ihre tatsächlichen Ausführungspreise wahrscheinlich unterschiedlich sein?

<details>
<summary>Antwort anzeigen</summary>

Mehrere Faktoren führen zu unterschiedlichen Ausführungen, obwohl der initial "quoted price" gleich ist. **Für Alice (Uniswap direkt):** Ihre Transaktion geht in den öffentlichen Mempool. Searcher-Bots identifizieren sie sofort als großen, sandwichfähigen Swap. Wahrscheinlich wird die Transaktion sandwiched: Front-Run drückt den Preis, Alice-Swap erfolgt zu ungünstigerem Kurs, Back-Run verkauft mit Gewinn. Wenn Alice's Slippage-Toleranz z.B. 0,5% ist, wird der Searcher seine Front-Run-Größe so optimieren, dass der effektive Ausführungspreis ~0,45-0,48% schlechter ist als der quoted price. Konkret: statt 33,33 ETH bekommt Alice vielleicht 33,17 ETH — eine Differenz von 0,16 ETH (~480 USD). Zusätzliche Risiken: (a) Pool-Impact durch ihren Trade selbst — bei 100.000 USD bewegt sie den Preis in einem mittleren Pool messbar. (b) Backrun-Arbitrage zwischen Pools nach ihrem Swap, was ihr selbst nicht direkt schadet, aber zeigt, dass MEV extrahiert wird. **Für Bob (CowSwap):** Seine Transaktion geht nicht in den öffentlichen Mempool. Stattdessen ist sie eine signierte Intent-Order im CowSwap-Batch-System. Hier passieren mehrere positive Effekte: **Erstens: Coincidence of Wants möglich.** Wenn in derselben Batch-Periode (5-30 Sekunden) andere Nutzer das entgegengesetzte Trade wollen (ETH zu USDC verkaufen), matched CowSwap direkt — ohne DEX-Pool zu nutzen. Das eliminiert Pool-Impact komplett. Selbst wenn kein perfekter CoW entsteht, können Teile gematcht werden. **Zweitens: Solver-Wettbewerb optimiert Route.** Mehrere professionelle Solver konkurrieren um das Recht, Bob's Order auszuführen. Jeder schlägt eine Route vor (z.B. über Uniswap V3, Curve, Balancer, oder Kombination). Der Solver mit dem besten Preis gewinnt. Das ist strukturell optimaler als eine einzelne AMM-Route. **Drittens: Kein Sandwich möglich.** Die Order ist im Batch-System, kein Searcher kann davor oder danach traden, weil alle Batch-Trades zur gleichen Zeit und zum gleichen Clearing-Preis ausgeführt werden. **Viertens: Gas-Effizienz.** Der Solver bundelt mehrere User-Trades in wenige on-chain Transaktionen. Der Gas-Anteil pro Nutzer ist niedriger. **Fünftens: Optional Surplus Capture.** In manchen Fällen kann der Solver den Trade sogar **besser** ausführen als den quoted price — z.B. wenn in den 30 Sekunden seit dem Quote sich Preise günstiger bewegt haben. Das Surplus fließt meist an den Nutzer (je nach Solver-Konfiguration). **Zusammenfassung:** Alice's tatsächliche Ausführung ist wahrscheinlich 0,3-0,8% schlechter als der quoted price (durch Sandwich + Pool-Impact). Bob's Ausführung ist wahrscheinlich 0,1-0,5% besser oder gleich dem quoted price (durch CoW + optimale Route). Die Differenz: ~0,5-1,3% von 100.000 USD = 500-1.300 USD pro Trade. **Die Lehre:** Quoted Price ist nicht gleich Actual Execution Price. Die Strukturen drumherum — welches DEX, welcher Mempool, welches Intent-System — machen oft größere Preisunterschiede als die Fee-Strukturen selbst. Für große Trades ist die Wahl des Execution-Pfads mindestens so wichtig wie die Wahl des DEX-Protokolls.
</details>

**Frage 3:** Warum ist "niedrige Slippage setzen" eine schlechte primäre Schutz-Strategie, obwohl es intuitiv wie der naheliegendste Schutz aussieht?

<details>
<summary>Antwort anzeigen</summary>

Niedrige Slippage hat Schutz-Wert, aber sie hat fundamentale Grenzen, die sie als primäre Strategie ungeeignet machen. **Erstens: Slippage ist probabilistisch, nicht deterministisch.** Niedrige Slippage reduziert die Wahrscheinlichkeit eines Sandwichs, eliminiert sie aber nicht. Bei ausreichender Trade-Größe und Liquidität kann selbst 0,1% Slippage noch profitabel für einen Searcher sein. Die Formel "Gewinn ∝ Swap² / Liquidität × Slippage" zeigt: bei großen Trades in großen Pools bleibt der absolute Gewinn signifikant. **Zweitens: Trade-Offs mit Ausführungs-Zuverlässigkeit.** Je niedriger die Slippage, desto höher die Wahrscheinlichkeit, dass die Transaktion fehlschlägt (wenn der Marktpreis sich normal bewegt). Fehlgeschlagene Transaktionen kosten Gas (typisch 5-30 USD auf Mainnet), und du musst die Transaktion neu submittieren — was den Kreislauf wiederholt. In volatilen Märkten kann das mehrere Runden dauern. **Drittens: Slippage schützt nur gegen direkten Sandwich, nicht gegen Generalized Front-Running.** Wenn ein Bot deine Transaktion als profitable Signal interpretiert (z.B. du kaufst einen Token, den der Bot noch nicht kannte), kopiert er deine Strategie mit höherer Gas-Priority. Das ist kein klassischer Sandwich, aber du verlierst den "Alpha" deiner Entdeckung. Slippage-Schutz hilft hier gar nicht. **Viertens: Slippage verrät Information.** Wenn du Slippage auf 0,5% setzt, signalisierst du: "ich kenne MEV und will mich schützen". Ein smarter Searcher kann erkennen, dass du informiert bist, und andere Taktiken versuchen (z.B. Back-Run, wenn du eine Info-Asymmetrie hast). **Fünftens: Slippage erfordert konstante manuelle Anpassung.** Die "richtige" Slippage hängt vom Asset, dem Pool, der Marktsituation ab. Für Stablecoin-Pairs sind 0,1% ausreichend. Für volatile Pairs in Krisen können selbst 5% knapp werden. Konstante Anpassung ist lästig und fehleranfällig. **Sechstens: Slippage ist ein "letzter Verteidigungslinie", kein "erste".** Die richtige Architektur ist: primärer Schutz durch strukturelle Mechanismen (Private Mempool, Intent-basiert), sekundärer Schutz durch niedrige Slippage. Wenn nur Slippage verwendet wird, fehlt die primäre Schicht komplett. **Die robuste Alternative:** Flashbots Protect oder MEV Blocker als primärer Schutz. Das eliminiert Sandwich strukturell — Searcher sehen die Transaktion gar nicht. Slippage kann dann konservativ gesetzt werden (0,5-1%), ohne Ausführungs-Probleme. Die kombinierte Strategie: strukturell geschützt (primär) + konservative Slippage (sekundär) = maximaler Schutz bei maximaler Ausführungs-Zuverlässigkeit. **Die Lehre:** Intuitive Lösungen ("einfach niedrige Slippage setzen") sind oft unterlegen gegenüber strukturellen Lösungen, die das zugrundeliegende Problem adressieren (Information-Asymmetry im öffentlichen Mempool). Das gilt nicht nur für MEV, sondern für viele DeFi-Risiken: die Ebene, auf der du das Problem löst, bestimmt die Qualität der Lösung.
</details>

**Frage 4:** Wie würdest du die Praxis-Empfehlungen aus diesem Modul in einen persönlichen "DeFi-Hygiene-Alltag" integrieren? Nenne die 5 wichtigsten Gewohnheiten.

<details>
<summary>Antwort anzeigen</summary>

Die 5 wichtigsten Gewohnheiten für konservativen MEV-Schutz im Alltag: **Gewohnheit 1: Private RPC als Default in allen Wallets.** Einmalige Setup: Flashbots Protect oder MEV Blocker in MetaMask, Rabby, oder anderer Wallet als primäres Ethereum-Netzwerk konfigurieren. Für L2s analog (wenn verfügbar). Alle Transaktionen (nicht nur Swaps — auch Approvals, Lending, Staking) gehen dann automatisch durch Private Mempool. Das schützt vor vielen MEV-Formen ohne dass du daran denken musst. Aufwand: 5-10 Minuten einmalig. **Gewohnheit 2: DEX-Aggregator statt Direkt-DEX.** Verwende 1inch, Matcha, oder CowSwap statt direkt Uniswap. Die Aggregatoren haben integrierten MEV-Schutz (oft als Toggle) und bessere Routen. 1inch mit aktiviertem "MEV Protection"-Flag oder Matcha's RFQ-System sind gute Defaults für mittlere Trade-Größen. Mental-Model: "DEX-Aggregator first, DEX-direkt nur wenn Aggregator nicht unterstützt". **Gewohnheit 3: CowSwap für Trades über 10.000 USD.** Bei großen Trades ist CowSwap (oder Uniswap X) die klare Wahl. Die Batch-Auktion-Struktur eliminiert Sandwich strukturell, und die Solver-Konkurrenz gibt oft bessere Preise als direkte DEX-Ausführung. Die 30-60 Sekunden Latenz ist akzeptabel für größere Trades, wo Präzision wichtiger ist als Geschwindigkeit. Mental-Trigger: "Über 10.000 USD → CowSwap-Tab öffnen". **Gewohnheit 4: Konservative Slippage als sekundärer Schutz.** Slippage-Werte als Sekundär-Verteidigung: 0,1-0,3% für Stablecoin-Pairs, 0,3-0,8% für liquide Token, 1-2% nur für exotische Pairs. Nie "Auto-Slippage" in Wallets verwenden — das ist oft zu hoch gesetzt (1-3%) und macht dich zum Ziel. Wenn Transaktion mit niedriger Slippage fehlschlägt: lieber neu submitten als Slippage erhöhen. **Gewohnheit 5: Post-Trade-Monitoring mit MEV-Tools.** Nach größeren Trades (ab 10.000 USD) prüfe mit eigenphi.io oder ähnlichen Tools, ob du sandwiched wurdest. Das ist weniger "Schutz" als "Lernen": wenn du sandwiched wurdest trotz Schutz-Tools, gibt es einen Lücken in deiner Setup-Kette, die du adressieren solltest. Das schärft deine Intuition über Zeit. **Zusätzliche Bonus-Gewohnheiten:** **Bonus 6:** Nie mit Browser-Wallet auf frischen, unbekannten Websites verbinden ohne Verifikation — viele "MEV-Schutz"-Sites sind Phishing. Immer direkte URLs verwenden (protect.flashbots.net, swap.cow.fi, etc.). **Bonus 7:** Bei Arbitrum/Base/andere L2s separate Konfiguration prüfen — nicht alle L2s haben gleiche MEV-Schutz-Coverage wie Ethereum. Für L2 mit schwachem Schutz: Trades über 5.000 USD lieber auf Mainnet oder auf CowSwap L2 (wo verfügbar) machen. **Bonus 8:** Große portfoliorelevante Trades in Tranchen aufteilen. 200.000 USD-Trade als 5× 40.000-USD-Trades über 1-2 Stunden reduziert MEV-Exposition und Pool-Impact. **Die Gesamtstrategie:** Diese Gewohnheiten zusammen sind **opt-in, einmal aufgesetzt, dann Default**. Der mentale Overhead ist gering — du denkst nicht bei jedem Trade darüber nach, weil die Tools im Hintergrund arbeiten. Der ökonomische Nutzen ist substantiell: für aktive DeFi-Nutzer typisch 0,5-2% des Trade-Volumens, also hunderte bis tausende USD pro Jahr. Die einmalige Setup-Zeit (~30 Minuten über alle Tools) amortisiert sich in typisch <1 Monat. Das ist eine der höchsten ROI-Aktivitäten in aktivem DeFi.
</details>

**Frage 5:** MEV-Schutz-Tools sind "kostenlose Versicherung" — warum nutzen dann trotzdem viele DeFi-Nutzer sie nicht? Was sagt das über menschliches Verhalten in neuartigen Märkten aus?

<details>
<summary>Antwort anzeigen</summary>

Ein tiefes Verhaltensmuster, das nicht nur in DeFi auftritt. Die Gründe sind sowohl rational als auch kognitiv-verzerrt. **Rationale Gründe für Nicht-Nutzung:** **Erstens: Informations-Defizit.** Viele Nutzer wissen schlicht nicht, dass MEV existiert oder dass Schutz-Tools verfügbar sind. DeFi-Produkte werden primär für "Basis-Funktion" beworben (Yield, Swap, Lend) — MEV-Schutz ist eine fortgeschrittene Meta-Ebene, die nicht im Mainstream-Marketing auftaucht. Für Einsteiger ist das Konzept nicht intuitiv. **Zweitens: Setup-Friction, auch wenn minimal.** 5-10 Minuten Setup sind theoretisch nichts, aber psychologisch eine Barriere. Jeder zusätzliche Schritt in einem bereits komplexen System (DeFi ist für Normal-Nutzer bereits überwältigend) wird unterdurchschnittlich angenommen. Viele Menschen planen "ich mach das später", und später kommt nie. **Drittens: Unsichtbare Kosten.** MEV-Verlust erscheint nicht als Rechnung. Der Nutzer sieht seinen Swap ausgeführt, sieht den erhaltenen Betrag, freut sich. Dass er 0,5% weniger bekommen hat als mit Schutz, ist nicht sichtbar. "Was du nicht siehst, schmerzt nicht" — ein klassisches verhaltensökonomisches Muster. Kontrastiere das mit expliziten Gebühren (Gas-Kosten, DEX-Fees): die werden sofort beachtet und optimiert. **Kognitive Verzerrungen:** **Vierte: Optimismus-Bias.** "Das passiert anderen, nicht mir". Nutzer unterschätzen ihre Wahrscheinlichkeit, Opfer von Sandwich zu werden. Statistisch: wenn du mehrere DEX-Swaps über 10.000 USD pro Monat machst, ist die Wahrscheinlichkeit eines Sandwichs über 12 Monate fast sicher. Aber einzelne Trades fühlen sich unwahrscheinlich an. **Fünfte: Status-quo-Bias.** "Ich mache DeFi seit 2 Jahren ohne Flashbots und es ging immer gut". Dass "es ging gut" nicht gleich "ich habe nichts verloren" bedeutet, wird nicht erkannt. Menschen sind resistent gegen Änderung etablierter Gewohnheiten, auch wenn die Änderung objektiv besser ist. **Sechste: Komplexitäts-Aversion.** "MEV ist kompliziert, ich will nicht noch mehr lernen". DeFi-Nutzer sind bereits überfordert mit Basis-Konzepten. Eine weitere Schicht hinzuzufügen, fühlt sich wie Overload an. Das führt zu "Ostrich Effect" — aktives Ignorieren eines bekannten Problems. **Siebte: Falsche Analogien.** "Ich nutze Best-Gas-Price-Setting, also bin ich sicher". Gas-Optimierung wird mit MEV-Schutz verwechselt. Sie sind unabhängig. Solche falschen mentalen Modelle sind schwer zu korrigieren. **Was das über menschliches Verhalten aussagt:** **Erstens: "Rational agent" ist ein Mythos.** Klassische ökonomische Theorie sagt, Menschen optimieren ihre Rendite. In der Praxis lassen Nutzer regelmäßig 0,5-2% Rendite liegen, weil kognitive Barrieren die Optimierung blockieren. **Zweitens: Information-Zugang ist nicht Information-Nutzung.** Dass ein Tool existiert und funktioniert, bedeutet nicht, dass es adaptiert wird. Adoption erfordert: (a) Awareness des Problems, (b) Awareness der Lösung, (c) Überwindung der Setup-Friction, (d) Integration in Routinen. Jeder Schritt hat hohe Drop-off-Raten. **Drittens: Markt-Ineffizienzen persistieren.** Klassische Theorie sagt: in effizienten Märkten verschwinden Opportunities. Aber Retail-DeFi ist kein effizienter Markt — die Verhaltens-Asymmetrie zwischen informierten und uninformierten Nutzern persistiert. Das ist einerseits tragisch (Verluste für Uninformierte), andererseits eine Gelegenheit (für Informierte, aber auch für Bildung). **Die strategische Implikation:** Die DeFi-Community braucht bessere Education und bessere Default-Settings. Wenn Wallets standardmäßig Flashbots Protect verwenden würden (statt Opt-in), wäre das MEV-Problem für Retail-Nutzer weitgehend gelöst. Einige Wallets (Rabby, einige MetaMask-Forks) bewegen sich in diese Richtung. Langfristig wird "MEV-Schutz by default" wahrscheinlich Standard werden — ähnlich wie HTTPS-by-default heute im Web-Browsing. **Die persönliche Implikation:** Wenn du dieses Modul durchgearbeitet hast, gehörst du zur informierten Minderheit. Das ist ein echter ökonomischer Vorteil. Nutze ihn, und wenn möglich, share das Wissen mit anderen — die Aufklärung ist ein Gemeinschaftsgut, das allen Retail-Nutzern hilft.
</details>

---

## Modul-Zusammenfassung

Du hast in Modul 11 MEV systematisch verstanden — von der Theorie bis zu praktischen Schutz-Tools:

**Was MEV ist:** Maximal Extractable Value — der Wert, den Block-Proposer und ihre Supply-Chain (Searcher, Builder, Relay) aus der Kontrolle der Transaktions-Reihenfolge extrahieren. Der Mempool ist die öffentliche Wartezone, in der Transaktionen 1-12 Sekunden sichtbar sind, bevor sie ausgeführt werden. In diesem Zeitfenster scannen Searcher-Bots kontinuierlich nach profitablen Gelegenheiten.

**Die vier MEV-Typen:** Arbitrage (40-60% des MEV, neutral/positiv für Nutzer), Sandwich (30-40%, direkt schädlich), Liquidation (5-15%, Protokoll-Mechanik), JIT Liquidity (2-5%, betrifft vor allem LPs). Für Retail-Nutzer ist Sandwich die primäre Bedrohung — alle Schutz-Strategien fokussieren darauf.

**Die MEV-Supply-Chain nach PBS:** Proposer-Builder Separation hat die Landschaft restrukturiert. Searcher → Builder → Relay → Proposer/Validator. MEV-Boost (>90% Validator-Adoption) ist die Software, die das ermöglicht. Wettbewerb unter Builder sorgt für Fairness, aber Zentralisierung bei 2-3 Top-Buildern ist ein offenes Thema.

**Sandwich-Mechanik im Detail:** Front-Run + Nutzer-Swap + Back-Run im gleichen Block. Searcher optimiert Front-Run-Größe so, dass Nutzer-Transaktion knapp innerhalb der Slippage-Toleranz ausgeführt wird. Profitabilitäts-Formel: Gewinn ∝ Swap² / Liquidität × Slippage. Ab ~10.000 USD Swap-Größe auf Mainnet fast immer sandwichfähig, auf L2 schon ab ~500 USD.

**Praktischer Schutz (Lektion 11.5 = Kernlektion):** Drei Kategorien. **Private Mempools** wie Flashbots Protect (protect.flashbots.net) und MEV Blocker (mevblocker.io) — Transaktion geht nicht in öffentlichen Mempool, Sandwich strukturell unmöglich, Backrun-Refunds als Bonus. **Intent-basierte DEXs** wie CowSwap (swap.cow.fi), Uniswap X, 1inch Fusion — Nutzer signiert Absicht, Solver konkurrieren um Ausführung, Coincidence of Wants möglich. **Native MEV-Schutz** in Aggregatoren wie 1inch, Matcha, Paraswap.

**Die Entscheidungs-Matrix:** Unter 500 USD: jedes DEX. 500-5.000 USD: Aggregator mit MEV-Flag. 5.000-50.000 USD: Flashbots Protect + Uniswap/1inch. 50.000+ USD: CowSwap. Die Layered-Defense-Strategie kombiniert alle Schichten für maximalen Schutz.

**Zukunftsausblick:** SUAVE (dedizierte MEV-Chain von Flashbots, Testnet), Encrypted Mempool (Shutter auf Gnosis produktiv), Batch-Auktionen (CowSwap), Order-Flow-Auktionen (Wallets monetarisieren Flow). Protokoll-Level-Lösungen entwickeln sich, aber langsam. Realistische Erwartung: 2025-2026 bleiben Nutzer-Tools Standard, Protokoll-Lösungen ab 2026-2028 graduell wichtig.

**Die praktische Alltag-Strategie:** Fünf Gewohnheiten — (1) Private RPC als Default in allen Wallets, (2) DEX-Aggregator statt Direkt-DEX, (3) CowSwap ab 10.000 USD, (4) konservative Slippage als sekundärer Schutz, (5) Post-Trade-Monitoring mit MEV-Tools. Einmaliger Setup-Aufwand: ~30 Minuten. Erwarteter jährlicher ROI für aktive DeFi-Nutzer: 0,5-2% des Trade-Volumens = hunderte bis tausende USD.

**Die konservative Kernaussage:** MEV ist ein versteckter Kostenfaktor in DeFi, den informierte Nutzer weitgehend vermeiden können. Die Tools dafür sind kostenlos oder fast kostenlos, einfach zu konfigurieren, und funktionieren zuverlässig. Wer sie nicht nutzt, zahlt typisch 0,5-2% "MEV-Zoll" auf alle aktiven Trades. Das ist eine der klarsten, sofort umsetzbaren Rendite-Optimierungen in DeFi — deutlich klarer als die meisten Yield-Optimierungen, die in anderen Modulen behandelt wurden.

**Was in Modul 12 kommt:** Flash Loans. Die mächtigste "Superpower" in DeFi — ungesicherte Kredite in Milliardenhöhe, die in einer einzigen Transaktion aufgenommen und zurückgezahlt werden müssen. Wir behandeln die Mechanik, die historischen Flash-Loan-basierten Angriffe (die spektakulärsten DeFi-Hacks wurden mit Flash Loans durchgeführt), legitime Anwendungen (Arbitrage, Collateral-Swap, Liquidation), und wie sie in MEV-Strategien integriert sind.

---

*Ende von Modul 11.*
