# Sandwich-Angriffe im Detail

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Einen Sandwich-Angriff auf Schritt-für-Schritt-Ebene technisch nachvollziehen
- Die Profitabilitäts-Bedingungen für Searcher verstehen
- Einschätzen, ob eigene geplante Trades anfällig sind
- Ein Sandwich-Attack-Diagramm zeichnen, das Front-Run-Tx, Opfer-Tx und Back-Run-Tx in korrekter Reihenfolge zeigt
- Die mathematische Profitabilitäts-Bedingung (Slippage-Toleranz vs. Gas-Kosten) als Filter für Angriffsziele quantifizieren
- Konkrete Schwellen (Trade-Größe, Slippage-Toleranz, Pool-Liquidität) benennen, bei denen ein Trade zum Sandwich-Ziel wird

## Erklärung

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

## Folien-Zusammenfassung

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

## Sprechertext

**[Slide 1]** Sandwich-Angriffe sind die für Nutzer direkt schädlichste Form von MEV. In dieser Lektion gehen wir Schritt für Schritt durch einen Sandwich, damit du die Mechanik vollständig verstehst. Das ist die Grundlage für effektiven Schutz.

**[Slide 2]** Ein Sandwich besteht aus drei Transaktionen. Erstens: der Front-Run des Searchers. Zweitens: Alice's eigener Swap. Drittens: der Back-Run des Searchers. Alle drei müssen im gleichen Block in dieser Reihenfolge landen. Der Searcher sichert das durch Bundle-Submissions an Builder.

**[Slide 3]** Ein konkretes Beispiel. Alice verkauft 100 ETH gegen USDC auf Uniswap V2. Pool hat 1.000 ETH und 3 Millionen USDC. Ohne Sandwich bekommt Alice 272.727 USDC. Der Searcher macht einen Front-Run-Verkauf von 20 ETH, dann erfolgt Alice-Swap, dann Back-Run-Kauf von 20 ETH. Alice bekommt jetzt nur 262.605 USDC — Verlust von 10.122 Dollar, etwa 3,7 Prozent. Das ist exakt der Searcher-Gewinn.

**[Slide 4]** Die Profitabilitäts-Formel für Sandwiches. Kompakt: Sandwich-Profit ist ungefähr gleich dem Front-Run-Price-Impact plus Back-Run-Recovery, minus Gas-Kosten und minus Slippage-Buffer. Das heißt: der Searcher verdient an beiden Bewegungen, muss aber Gas und seinen eigenen Slippage-Puffer abziehen. Proportional gilt: Gewinn ist proportional zu Swap-Größe zum Quadrat geteilt durch Pool-Liquidität, mal Slippage-Toleranz. Je größer der Swap relativ zur Pool-Liquidität, desto quadratisch mehr Gewinn. Und höhere Slippage bedeutet mehr Spielraum für den Searcher.

**[Slide 5]** Zwei zentrale Anfälligkeitsfaktoren. Erstens, die Slippage-Falle. Alice hat 2 Prozent Slippage gesetzt — ihre Transaktion müsste fehlschlagen bei 3,7 Prozent tatsächlichem Verlust. Aber der Searcher sieht ihre Slippage-Toleranz im Mempool. Er optimiert seine Front-Run-Größe so, dass Alice-Transaktion gerade noch innerhalb der Slippage-Toleranz ausgeführt wird. Die Slippage-Toleranz ist also faktisch die Obergrenze des Searcher-Gewinns, nicht der Schutz, den Alice sich wünscht. Zweitens, Trade-Größen-Schwellen auf Ethereum Mainnet. Swaps unter 1.000 Dollar: fast nie sandwichfähig, weil Gas-Kosten den Gewinn auffressen. 1.000 bis 10.000 Dollar: manchmal, abhängig vom Pool. 10.000 bis 100.000 Dollar: oft. Über 100.000 Dollar: fast immer, wenn keine Schutz-Maßnahmen aktiv sind. Auf Layer-2 sind die Schwellen deutlich niedriger wegen günstigerer Gas-Preise — schon 100 bis 500 Dollar Swaps können sandwichfähig sein.

**[Slide 6]** Die Anti-Sandwich-Checkliste. Erstens: Slippage niedrig setzen, 0,1 bis 0,5 Prozent für Stablecoin-Pairs, 0,5 bis 1 Prozent für volatile. Zweitens: private RPC wie Flashbots Protect oder MEV Blocker nutzen. Drittens: CowSwap für größere Trades über 10.000 Dollar. Viertens: 1inch mit MEV-Protection-Flag. Fünftens: Trades in mehrere kleine aufsplitten. Sechstens: tiefe Liquiditäts-Pools wählen statt exotische Pairs. Details in der nächsten Lektion.

**[Slide 7]** Die zugrundeliegende Ursache ist Information-Asymmetry. Der Searcher sieht deine Transaktion, bevor sie ausgeführt wird. Du siehst nicht seine Bots. Das ist kein technischer Bug, sondern Architektur: der öffentliche Mempool ist öffentlich by design. Die Lösung ist nicht, auf Fairness zu hoffen. Die Lösung ist, die Asymmetry zu eliminieren — deine Transaktionen nicht mehr öffentlich zu machen. Das behandelt die nächste Lektion.

## Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Drei-Block-Sequenz: Front-Run / User-Swap / Back-Run als Blockchain-Transaktionen.

**[Slide 3]** AMM-Kurve mit drei Preis-Punkten markiert.

**[Slide 4]** Formel-Darstellung (Sandwich-Profit-Formel + proportionale Skalierung) mit Beispiel-Berechnungen bei verschiedenen Größen.

**[Slide 5]** Zwei-Spalten-Layout: links Slippage-Bar (Einstellung vs. Searcher-Optimierung), rechts Schwellen-Tabelle nach Swap-Größe.

**[Slide 6]** Checkliste mit 6 Schutz-Maßnahmen.

**[Slide 7]** Information-Asymmetry-Illustration: Searcher sieht Alice, Alice sieht Searcher nicht.

## Übung

**Aufgabe: Sandwich-Opfer-Analyse**

Besuche [eigenphi.io](https://eigenphi.io) oder einen ähnlichen MEV-Explorer. Finde drei Sandwich-Transaktionen aus den letzten 24 Stunden.

Für jede analysiere:
1. **Opfer-Swap:** Welches Token-Paar? Welche Größe in USD? Welche DEX?
2. **Searcher-Profit:** Wie viel USD hat der Searcher verdient?
3. **Opfer-Verlust:** Wie viel hat das Opfer mehr gezahlt, als es ohne Sandwich getan hätte?
4. **Slippage-Toleranz:** Kannst du anhand der Transaktion abschätzen, welche Slippage das Opfer eingestellt hatte?

**Deliverable:** Drei-Fälle-Tabelle + Reflexion (6-10 Sätze): Welche Gemeinsamkeiten haben die Opfer? Welche Schutz-Maßnahme hätte in allen drei Fällen funktioniert?

## Quiz

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

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → Die drei Transaktionen → Rechen-Beispiel → Profitabilitäts-Formel → Anfälligkeitsfaktoren (Slippage + Trade-Größen-Schwellen) → Anti-Sandwich-Checkliste → Zugrundeliegende Ursache
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — Sandwich-Attack-Diagramm (Front-Run → Victim → Back-Run), Profitabilitäts-Rechenbeispiel, Slippage-Exposition-Tabelle, Trade-Größen-Schwellen-Chart, Historische Sandwich-Events

Pipeline: Gamma → ElevenLabs → CapCut.

---
