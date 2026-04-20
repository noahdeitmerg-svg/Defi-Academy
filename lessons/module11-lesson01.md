# Was MEV eigentlich ist

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Den Begriff MEV präzise definieren und von verwandten Konzepten abgrenzen
- Die Rolle des Mempools als "Wartezone" für Transaktionen verstehen
- Erklären, warum Transaktions-Reihenfolge auf Blockchains monetarisierbar ist
- MEV von regulärer Blockspace-Monetarisierung (Gas Fees, Priority Fees) klar unterscheiden
- Die historische Entwicklung von MEV (PoW → PoS → PBS) nachvollziehen
- Eine typische Ethereum-Transaktion in ihrem Lebenszyklus vom Wallet über den Mempool bis zum Block verfolgen

## Erklärung

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

## Folien-Zusammenfassung

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

## Sprechertext

**[Slide 1]** Willkommen zu Modul 11. MEV ist eine der wichtigsten unsichtbaren Kräfte in DeFi. Jeder, der Transaktionen auf Ethereum abschickt, ist betroffen, meist ohne es zu merken. In dieser Lektion klären wir, was MEV überhaupt ist und warum es existiert.

**[Slide 2]** MEV steht für Maximal Extractable Value. Ursprünglich bedeutete die Abkürzung Miner Extractable Value — der Wert, den ein Miner durch Manipulation der Transaktions-Reihenfolge in einem Block einstreichen kann. Nach dem Wechsel von Ethereum zu Proof-of-Stake wurde daraus Maximal Extractable Value, weil jetzt auch Builder, Searcher und Validatoren beteiligt sind, nicht nur Miner.

**[Slide 3]** Der Mempool ist der Schlüssel. Wenn du eine Transaktion abschickst, geht sie nicht direkt in die Blockchain. Sie landet erst im Mempool — einer öffentlich einsehbaren Liste aller ausstehenden Transaktionen. In diesem Zeit-Fenster, typisch 1 bis 12 Sekunden auf Ethereum, ist deine Transaktion sichtbar, aber noch nicht ausgeführt. Searcher-Bots scannen den Mempool kontinuierlich, tausende Male pro Sekunde.

**[Slide 4]** Warum Reihenfolge wertvoll ist. Angenommen du machst einen großen Swap, der den Preis im Pool um 1 Prozent bewegt. Ein Searcher kann eine Transaktion vor deiner platzieren, um vom bekommenden Preis-Anstieg zu profitieren — das ist Front-Running. Oder er platziert eine nach deiner, um ein Ungleichgewicht zwischen Pools auszugleichen — das ist Back-Running. Front-Running kostet dich Geld. Back-Running ist meist harmlos für dich.

**[Slide 5]** MEV ist kein einzelner Akteur, sondern ein ganzer Markt. Searcher sind Firmen mit spezialisierten Bots, die den Mempool scannen. Block-Builder kombinieren Transaktionen zu optimalen Blöcken. Relays leiten diese Bundles an Proposer weiter. Validatoren veröffentlichen die Blöcke. Alle vier Rollen verdienen am MEV-Markt.

**[Slide 6]** Die historische Größe. 2021 im Bull-Markt-Peak waren es etwa 1 Milliarde Dollar pro Jahr. Seit 2020 kumulativ über 3 Milliarden Dollar extrahiert. Davon sind ungefähr 30 bis 40 Prozent schädliches MEV — direktes Nutzer-Abgreifen. Der Rest ist Arbitrage, die aus Natur von DEX-Märkten entsteht.

**[Slide 7]** Was das für dich bedeutet. Bei jeder DEX-Swap zahlst du potenziell einen unsichtbaren MEV-Zoll. Bei kleinen Swaps unter 1.000 Dollar ist er minimal. Bei mittleren 1.000 bis 100.000 Dollar typisch 0,01 bis 0,5 Prozent. Bei großen über 100.000 Dollar kann er 1 bis 5 Prozent erreichen. Die gute Nachricht: er ist vermeidbar. Mit den richtigen Tools kannst du 90 Prozent oder mehr des MEV-Zolls eliminieren. Diese Tools behandeln wir in Lektion 11.5.

## Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Evolutions-Diagramm: "Miner Extractable Value" (2020) → "Maximal Extractable Value" (2022+) mit neuen Akteuren.

**[Slide 3]** **SCREENSHOT SUGGESTION:** blocknative.com oder etherscan.io Mempool-Ansicht mit ausstehenden Transaktionen.

**[Slide 4]** Zeitleiste: deine Transaktion + Front-Run + Back-Run, mit Preis-Bewegung visualisiert.

**[Slide 5]** Supply-Chain-Diagramm: Searcher → Builder → Relay → Validator.

**[Slide 6]** Balkendiagramm: MEV pro Jahr 2020-2024.

**[Slide 7]** Zoll-Visualisierung: Swap-Größe vs. MEV-Kosten in Prozent.

## Übung

**Aufgabe: Mempool-Beobachtung**

Öffne einen Mempool-Explorer (z.B. [etherscan.io/txsPending](https://etherscan.io/txsPending) oder [mempool.guru](https://mempool.guru)) und beobachte 10 Minuten lang ausstehende Transaktionen.

Dokumentiere:
1. Wie viele Transaktionen sind durchschnittlich gleichzeitig im Mempool?
2. Wie verteilen sich Gas-Preise? (niedrig, mittel, hoch)
3. Identifiziere 3 Transaktionen, die wahrscheinlich DEX-Swaps sind (an den aufgerufenen Contracts erkennbar — Uniswap Router, 1inch, etc.)
4. Schätze, wie viele Sekunden die typische Transaktion im Mempool wartet, bevor sie in einem Block landet

**Deliverable:** Kurzer Bericht (Screenshot + 5-8 Sätze) mit deinen Beobachtungen. Was hat dich überrascht?

## Quiz

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

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → MEV-Definition → Mempool-Mechanik → Transaktions-Lebenszyklus → Warum Reihenfolge wert ist → Historische Evolution → MEV als Kostenfaktor
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — MEV-Definitions-Diagramm, Mempool-Visualisierung, Transaktions-Lifecycle-Flow, PoW-to-PBS-Zeitleiste

Pipeline: Gamma → ElevenLabs → CapCut.

---
