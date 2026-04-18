# Modul 4 — DEX-Mechanik

**Zielgruppe:** Einsteiger bis Fortgeschrittene
**Geschätzte Dauer:** 90–110 Minuten
**Voraussetzungen:** Module 1–3 abgeschlossen

**Kursstufe:** Core (DeFi-Kernmärkte)
**Lektionsanzahl:** 6
**Didaktische Ausrichtung:** AMM-Architektur, Preisbildung, Slippage, Konzentrierte Liquidität, MEV, Professionelle Swap-Ausführung
**Konformität:** Final Fix Document v1 — Struktur, Terminologie und Pipeline-Assets harmonisiert

**Harmonisierte Terminologie (gültig im gesamten Modul):**
- AMM (Automated Market Maker) vs. Orderbook
- Constant Product Formula (x·y=k)
- Price Impact / Slippage / Slippage Tolerance
- LP-Token, Fee Tier, Tick, Range (V3)
- MEV (Maximal Extractable Value), Sandwich Attack, Frontrunning, Backrunning
- Smart Contract Risk, Liquidity Risk
- Total Value Locked (TVL)

**Querverweise:**
- MEV wird in Lektion 4.5 eingeführt und in Modul 11 vertieft behandelt.
- LP-Mechanik und Impermanent Loss werden in Modul 5 (Liquidity Pools) vertieft.

**Video-Pipeline:** Jede Lektion ist für Gamma (Slides) → ElevenLabs (Voice) → CapCut (Video) vorbereitet. Zielvideo-Länge pro Lektion: 8–10 Minuten (120–140 WPM).

---

## Modul-Überblick

Ein dezentraler Exchange (DEX) ist der Ort, an dem in DeFi Tokens getauscht werden. Im Gegensatz zu zentralen Börsen (Binance, Coinbase) gibt es kein Order Book mit Gebote und Nachfrage, keinen Market Maker im klassischen Sinn und keine Verwahrung. Stattdessen handelst du gegen einen Smart Contract, der einen Pool von Tokens hält und Preise algorithmisch berechnet.

Dieses Modul erklärt, wie **Automated Market Makers (AMMs)** funktionieren — die dominante DEX-Architektur. Du verstehst nach diesem Modul, wie Preise entstehen, warum Slippage auftritt, wie sich Uniswap V2 von V3 unterscheidet, und welche Rolle MEV im Handel spielt.

Die Perspektive bleibt konservativ: Das Ziel ist, Swaps effizient und sicher auszuführen, nicht, den Markt zu "schlagen". Fast alle DEX-Verluste entstehen durch vermeidbare Fehler — falsch gesetzte Slippage, MEV-Attacken, schlechte Routen.

**Lektionen:**
1. Was eine DEX von einer CEX unterscheidet
2. Die Constant-Product-Formel: Uniswap V2
3. Slippage und Preis-Impact
4. Konzentrierte Liquidität: Uniswap V3
5. MEV — Die unsichtbare Steuer
6. DEX-Aggregatoren und professionelle Swap-Ausführung

---

## Lektion 4.1 — Was eine DEX von einer CEX unterscheidet

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die drei strukturellen Unterschiede zwischen DEX und CEX benennen
- Erklären, warum DEXs keine Order Books brauchen
- Einordnen, wann DEX-Nutzung sinnvoll ist und wann nicht
- AMM-Modell und Orderbook-Modell direkt gegenüberstellen und die jeweiligen Trade-offs (Latenz, Slippage, Preisgüte, Trustlessness) benennen
- Die Custody-, Settlement- und Zugangs-Unterschiede zwischen CEX und DEX in ein Entscheidungsraster für konkrete Handelsgrößen übersetzen
- Praktisch entscheiden, wann ein Swap auf einer CEX vs. auf einer DEX wirtschaftlich und sicherheitstechnisch sinnvoll ist

### Erklärung

Eine zentrale Börse (CEX) funktioniert wie ein traditioneller Marktplatz: Käufer stellen Gebote ein, Verkäufer stellen Angebote ein, das System matched sie und führt den Trade aus. Die Börse verwahrt die Assets und führt die Buchhaltung.

Ein dezentraler Exchange (DEX) funktioniert strukturell anders. Es gibt kein Order Book. Stattdessen liegen Token-Paare in Smart Contracts — sogenannten **Liquidity Pools**. Wer tauschen will, interagiert direkt mit diesem Pool: Er gibt Token A hinein, bekommt Token B heraus. Der Preis ergibt sich aus einer mathematischen Formel, nicht aus einem Orderabgleich.

**Die drei strukturellen Unterschiede**

**Unterschied 1: Custody**
- CEX: Die Börse hält die Assets. Du hast einen Kontostand auf ihrer Datenbank.
- DEX: Du hältst die Assets selbst bis zur Sekunde des Trades. Der Swap wird in einer einzigen atomaren Transaktion ausgeführt.

**Unterschied 2: Preisbildung**
- CEX: Order Book. Der Preis ergibt sich aus dem höchsten Gebot, das auf das niedrigste Angebot trifft.
- DEX (AMM): Formel-basiert. Der Preis wird aus den Pool-Beständen berechnet.

**Unterschied 3: Zugänglichkeit**
- CEX: KYC erforderlich, Länder-Einschränkungen, Konto kann gesperrt werden.
- DEX: Jede Wallet kann interagieren, keine Kontoeröffnung.

**Warum DEXs keine Order Books brauchen**

Ein klassisches Order Book on-chain zu betreiben wäre extrem teuer. Jede Limit-Order wäre eine Transaktion. Jede Anpassung wäre eine Transaktion. Die Gas-Kosten würden den Handel sinnlos machen.

AMMs umgehen das Problem elegant. Liquidität wird einmal in einen Pool eingezahlt. Der Pool "quotiert" kontinuierlich einen Preis über eine Formel. Trader können jederzeit handeln, ohne auf einen passenden Gegenpart zu warten. Der Pool ist der Gegenpart.

Der Trade-off: AMMs sind weniger kapitaleffizient als Order Books, und sie haben strukturelle Nachteile (Slippage, Impermanent Loss, MEV-Anfälligkeit). Diese Punkte behandeln wir in den folgenden Lektionen.

**Wann DEX-Nutzung sinnvoll ist**

DEXs eignen sich für:
- Tauschen von Tokens, die auf CEXs nicht gelistet sind
- Swaps ohne KYC
- Teil einer komponierten DeFi-Transaktion (z.B. Borrow → Swap → LP in einer Transaktion)
- Interaktion mit Protokollen, die Stablecoins oder Liquid-Staking-Tokens handhaben

DEXs sind weniger effizient für:
- Sehr große Swaps (>1% der Pool-Liquidität) — hier ist OTC oder CEX oft besser
- Hochfrequenter Handel — Gas-Kosten fressen Gewinne
- Handel mit Fiat-Paaren (EUR, USD, CHF)

**Die Marktstruktur**

Die dominante DEX-Architektur ist **Uniswap**, gefolgt von **Curve** (spezialisiert auf Stablecoins und gepeggte Assets), **Balancer** (gewichtete Pools, mehr als zwei Assets) und **PancakeSwap** (auf BNB Chain). Auf Ethereum Layer-2s (Arbitrum, Base, Optimism) dominieren dieselben Protokolle plus native Projekte wie Aerodrome auf Base.

DeFiLlama zeigt aktuelle DEX-Volumina und Marktanteile. Diese Verhältnisse verschieben sich, aber Uniswap hält seit Jahren Marktführerschaft auf Ethereum Mainnet.

### Folien-Zusammenfassung

**[Slide 1] — Titel**
Was eine DEX von einer CEX unterscheidet

**[Slide 2] — CEX-Architektur**
Order Book. Käufer und Verkäufer. Matching-Engine. Börse verwahrt Assets.

**[Slide 3] — DEX-Architektur**
Liquidity Pool. Formel-basierte Preise. Nutzer handeln gegen den Pool.

**[Slide 4] — Drei strukturelle Unterschiede**
1. Custody: Börse vs. Nutzer
2. Preisbildung: Order Book vs. Formel
3. Zugänglichkeit: KYC vs. Permissionless

**[Slide 5] — Warum keine Order Books on-chain**
Zu teuer. Jede Order = Transaktion.
AMMs: Liquidität einmal einzahlen, kontinuierlich handelbar.

**[Slide 6] — Wann DEX, wann CEX**
DEX: Long-tail Tokens, komponierte Transaktionen, No-KYC.
CEX: Große Swaps, Fiat-Paare, hochfrequenter Handel.

**[Slide 7] — Marktstruktur**
Uniswap: Marktführer.
Curve: Stablecoins.
Balancer: Gewichtete Pools.
Layer-2s: gleiche Protokolle + native Projekte.

### Sprechertext

**[Slide 1]** Modul 4 behandelt dezentrale Exchanges. Diese erste Lektion legt das Fundament: wie unterscheidet sich eine DEX strukturell von einer zentralen Börse, und warum ist dieser Unterschied wichtig.

**[Slide 2]** Eine zentrale Börse funktioniert wie ein klassischer Marktplatz. Käufer stellen Gebote ein, Verkäufer stellen Angebote ein. Eine Matching-Engine führt die passenden Aufträge zusammen. Die Börse hält die Assets aller Nutzer in ihrem eigenen System. Wenn du auf Coinbase einen Trade ausführst, bewegt Coinbase intern Einträge in ihrer Datenbank — kein Blockchain-Vorgang findet statt, bis du auszahlst.

**[Slide 3]** Ein DEX funktioniert strukturell anders. Es gibt kein Order Book. Stattdessen liegen Token-Paare in Smart Contracts, sogenannten Liquidity Pools. Wer tauschen will, interagiert direkt mit dem Pool: Er gibt Token A hinein, erhält Token B heraus. Der Preis wird aus einer Formel berechnet, die von den Pool-Beständen abhängt.

**[Slide 4]** Drei strukturelle Unterschiede. Erstens: Custody. Eine CEX hält deine Assets, eine DEX nicht — du hältst sie bis zur Sekunde des Trades selbst. Zweitens: Preisbildung. Order Book versus Formel. Drittens: Zugänglichkeit. CEX erfordert KYC und kann Konten sperren. DEX kann von jeder Wallet aus genutzt werden.

**[Slide 5]** Warum können DEXs nicht einfach ein Order Book on-chain haben? Weil es zu teuer wäre. Jede Limit-Order wäre eine Transaktion. Jede Anpassung wäre eine Transaktion. Gas-Kosten würden den Handel sinnlos machen. AMMs umgehen das Problem elegant: Liquidität wird einmal in einen Pool eingezahlt, der Pool quotiert kontinuierlich einen Preis über eine Formel. Trader können jederzeit handeln, ohne auf einen Gegenpart zu warten. Der Pool ist der Gegenpart.

**[Slide 6]** Wann macht DEX-Nutzung Sinn. DEXs sind stark für Tokens, die auf CEXs nicht gelistet sind, für Swaps ohne KYC, und als Teil komponierter DeFi-Transaktionen. Schwächer sind DEXs bei sehr großen Swaps über einem Prozent der Pool-Liquidität, bei hochfrequentem Handel wegen der Gas-Kosten, und für Fiat-Paare, die es on-chain schlicht nicht gibt.

**[Slide 7]** Die Marktstruktur ist übersichtlich. Uniswap ist seit Jahren Marktführer. Curve dominiert bei Stablecoins und gepeggten Assets. Balancer bietet gewichtete Pools mit mehr als zwei Assets. Auf Layer-2s finden sich dieselben Protokolle plus einige native Projekte wie Aerodrome auf Base. DeFiLlama zeigt aktuelle Volumina und Marktanteile.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Schematisches Order-Book-Diagramm: Buys links, Sells rechts, Matching-Engine in der Mitte. **SCREENSHOT SUGGESTION:** Coinbase-Pro-Order-Book eines gängigen Paares (ETH-USD).

**[Slide 3]** Schematisches AMM-Diagramm: Ein Pool mit zwei Token-Stapeln, ein Pfeil hinein mit Token A, ein Pfeil hinaus mit Token B. **SCREENSHOT SUGGESTION:** Uniswap-Interface mit einem Swap-Dialog.

**[Slide 4]** Dreizeilige Vergleichstabelle CEX vs. DEX für die drei Dimensionen.

**[Slide 5]** Illustration: Order Book on-chain mit explodierenden Gas-Kosten-Symbolen. Daneben: AMM mit einem einzigen "einmal einzahlen"-Einzahlungspfeil.

**[Slide 6]** Zweispaltige Entscheidungshilfe: "Nutze DEX wenn..." / "Nutze CEX wenn..."

**[Slide 7]** **SCREENSHOT SUGGESTION:** DeFiLlama-DEX-Volume-Ranking der Top-10 DEXs, sortiert nach 24h-Volumen.

### Übung

**Aufgabe: DEX-Landschaft kartieren**

1. Öffne defillama.com/dexs.
2. Identifiziere die Top-10 DEXs nach 24-Stunden-Volumen.
3. Notiere für jede DEX: Name, dominante Chain, 24h-Volumen, TVL.
4. Gruppiere die DEXs nach Architektur (Uniswap V2-Stil, Uniswap V3-Stil, Curve-Stil, anderes).

**Deliverable:** Tabelle mit 10 Zeilen, sortiert nach Volumen. Am Ende ein kurzer Absatz (3–5 Sätze): Welcher DEX-Typ dominiert wo, und warum vermutest du das?

### Quiz

**Frage 1:** Warum verwenden DEXs keine Order Books on-chain?

<details>
<summary>Antwort anzeigen</summary>

Weil jede Order, jede Anpassung und jede Stornierung eine Transaktion wäre, die Gas kostet. Bei aktiven Märkten würden die Gas-Kosten den Handel sinnlos machen. AMMs umgehen das, indem sie Liquidität einmal in einen Pool einzahlen und Preise kontinuierlich aus einer Formel ableiten. Nur der eigentliche Swap kostet Gas, nicht das Bereitstellen oder Anpassen von Geboten. Der Trade-off ist geringere Kapitaleffizienz, aber praktikable Gas-Kosten.
</details>

**Frage 2:** Nenne zwei Szenarien, in denen eine CEX für einen Nutzer besser geeignet ist als eine DEX.

<details>
<summary>Antwort anzeigen</summary>

Erstens: Fiat-on-ramp und off-ramp. DEXs handeln nur on-chain Tokens, nicht EUR oder USD direkt. Jeder Wechsel zwischen Fiat und Krypto läuft über eine CEX oder einen spezialisierten Fiat-Gateway. Zweitens: sehr große Swaps, die einen signifikanten Prozentsatz der verfügbaren DEX-Pool-Liquidität ausmachen. Solche Swaps erzeugen hohen Slippage. CEXs mit tiefen Order Books oder OTC-Desks können solche Volumen mit geringerem Preis-Impact abwickeln. Zusätzlich gilt: hochfrequenter Handel, bei dem die Gas-Kosten pro Trade die Margen auffressen würden.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 6 Slides: Titel → CEX-Architektur → DEX-Architektur → 3 strukturelle Unterschiede → AMM vs. Orderbook → Entscheidungsmatrix CEX/DEX
- `voice_script.txt` — *Voice Narration Script* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — CEX-Stack-Diagramm (Custody/KYC/Orderbook), DEX-Stack-Diagramm (Wallet/Smart Contract/Pool), Vergleichstabelle, Uniswap-Screenshot vs. Binance-Screenshot

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 4.2 — Die Constant-Product-Formel: Uniswap V2

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die Formel x·y=k erklären und ihre Bedeutung nachvollziehen
- Einen Swap-Preis manuell aus Pool-Beständen berechnen
- Verstehen, warum der Preis bei großen Swaps stark vom "fairen" Preis abweicht
- Die Rolle der 0,3%-Gebühr in Uniswap V2 und deren Verteilung an LPs einordnen
- Den Begriff "Spot Price" aus den aktuellen Pool-Beständen ableiten und den tatsächlichen Ausführungspreis davon abgrenzen
- Die Bedeutung der Pool-Tiefe (Liquidity Depth) für Price Impact quantitativ einschätzen

### Erklärung

Uniswap V2 (gestartet 2020) etablierte die Grund-Formel, die die gesamte AMM-Industrie prägte: die **Constant-Product-Formel**.

**Die Formel**

Ein Uniswap-V2-Pool hält zwei Tokens, nennen wir sie X und Y. Die Mengen im Pool bezeichnen wir als `x` und `y`. Die Formel lautet:

```
x · y = k
```

`k` ist eine Konstante, die (vor Gebühren) durch jeden Swap unverändert bleiben muss. Das bedeutet: Wenn jemand Token X in den Pool gibt, steigt `x`. Damit `k` konstant bleibt, muss `y` sinken — der Pool gibt also Token Y heraus.

**Der Preis ergibt sich aus dem Verhältnis**

Der aktuelle "Spot-Preis" in einem V2-Pool ist einfach:

```
Preis von X (in Y) = y / x
```

Beispiel: Ein ETH/USDC-Pool hält 1.000 ETH und 3.000.000 USDC. Der Spot-Preis von ETH ist:

```
3.000.000 / 1.000 = 3.000 USDC pro ETH
```

Wenn mehr USDC nachgefragt wird als ETH im Verhältnis, verändert sich das Ratio — und damit der Preis.

**Ein Swap in Zahlen**

Angenommen, du willst 10 ETH in USDC tauschen. Vor dem Swap:
- x (ETH) = 1.000
- y (USDC) = 3.000.000
- k = 3.000.000.000

Nach dem Swap:
- x' = 1.000 + 10 = 1.010
- k muss konstant bleiben, also y' = k / x' = 3.000.000.000 / 1.010 ≈ 2.970.297
- USDC, die du erhältst: 3.000.000 − 2.970.297 = 29.703 USDC

Wenn der Preis "fair" (Spot) wäre, hättest du 10 × 3.000 = 30.000 USDC erhalten. Tatsächlich erhältst du 29.703 USDC. Die Differenz von 297 USDC ist der **Preis-Impact** des Swaps — plus kommen noch die Pool-Gebühren (0,3% bei Standard-V2-Pools).

**Gebühren**

Uniswap V2 hat eine feste Gebühr von 0,3% pro Swap. Die Gebühr wird zum Pool hinzugefügt, nicht entnommen — sie erhöht effektiv `k` bei jedem Trade. Das ist der Mechanismus, über den Liquiditätsanbieter (LPs) Ertrag erwirtschaften. Mehr dazu in Modul 5.

**Warum die Formel robust ist**

Die Constant-Product-Formel hat eine elegante Eigenschaft: Sie stellt sicher, dass ein Pool nie vollständig leergehandelt werden kann. Um alle ETH aus dem Pool zu nehmen, müsste man unendlich viele USDC einzahlen — weil die Preiskurve bei kleinen Pool-Beständen asymptotisch ins Unendliche geht. Das ist ein Schutz gegen Pool-Ausräumung.

Gleichzeitig hat die Formel eine unangenehme Eigenschaft: **Die meiste Liquidität liegt in Preisbereichen, die praktisch nie genutzt werden.** Wenn ETH bei 3.000 USDC handelt, ist die Liquidität, die für Preise zwischen 1.000 und 10.000 USDC bereitgestellt wird, weitgehend ungenutzt. Das macht V2 kapital-ineffizient. Uniswap V3 (Lektion 4.4) löst dieses Problem teilweise.

**Arbitrage hält den Preis am Markt**

Der Pool-Preis kann vom externen Marktpreis abweichen. Wenn der externe Markt ETH bei 3.000 USDC handelt, aber der Pool bei 2.990 USDC quotiert, entsteht ein Arbitrage-Anreiz: Jemand kauft ETH aus dem Pool (billig) und verkauft es auf dem externen Markt (teurer). Dieser Arbitrage-Trade verschiebt das Verhältnis im Pool, bis der Pool-Preis wieder dem externen Preis entspricht.

Arbitrage ist ein wesentlicher Teil des AMM-Mechanismus. Sie hält den Pool-Preis am "wahren" Markt ausgerichtet — auf Kosten der Liquiditätsanbieter, die durch die Arbitrage **Impermanent Loss** erleiden (Modul 5).

### Folien-Zusammenfassung

**[Slide 1] — Titel**
Uniswap V2: Die Constant-Product-Formel

**[Slide 2] — Die Formel**
x · y = k
Konstant bei jedem Swap (vor Gebühren).

**[Slide 3] — Preis aus Verhältnis**
Preis von X (in Y) = y / x
Beispiel: 3.000.000 USDC / 1.000 ETH = 3.000 USDC/ETH

**[Slide 4] — Swap-Beispiel**
10 ETH in den Pool → 29.703 USDC heraus.
Fairer Preis wäre 30.000 USDC.
Differenz: 297 USDC Preis-Impact.

**[Slide 5] — Gebühren**
0,3% pro Swap (V2-Standard).
Fließt zurück in den Pool → LPs verdienen.

**[Slide 6] — Die Kurve**
Asymptotisch: Pool kann nie vollständig leergehandelt werden.
Aber: Liquidität verteilt sich über den gesamten Preisbereich, meiste ist ungenutzt.

**[Slide 7] — Arbitrage**
Pool-Preis weicht von externem Markt ab → Arbitrageure gleichen aus.
Mechanisch notwendig — erzeugt Impermanent Loss für LPs.

### Sprechertext

**[Slide 1]** Uniswap V2 etablierte die Formel, die die gesamte AMM-Industrie prägte: die Constant-Product-Formel. Du musst sie verstehen, um Swap-Preise und Slippage nachvollziehen zu können.

**[Slide 2]** Die Formel ist schlicht: x mal y gleich k. Ein Pool hält zwei Tokens, X und Y, in den Mengen x und y. Das Produkt k muss vor Gebühren bei jedem Swap konstant bleiben. Wenn jemand Token X in den Pool gibt, steigt x. Damit k konstant bleibt, muss y sinken — der Pool gibt Token Y heraus.

**[Slide 3]** Der Spot-Preis ergibt sich aus dem Verhältnis der Pool-Bestände. Preis von X in Y gleich y geteilt durch x. Beispiel: ein Pool mit 1.000 ETH und 3.000.000 USDC hat einen Spot-Preis von 3.000 USDC pro ETH.

**[Slide 4]** Ein konkretes Swap-Beispiel. Du gibst 10 ETH in den Pool. Nachher sind 1.010 ETH im Pool. Damit k konstant bleibt, müssen die USDC von 3.000.000 auf 2.970.297 sinken. Du erhältst die Differenz — 29.703 USDC. Zum fairen Preis hättest du 30.000 erhalten. Die Differenz von 297 ist der Preis-Impact. Dazu kommen noch die Pool-Gebühren.

**[Slide 5]** Die Gebühren. Uniswap V2 erhebt 0,3 Prozent pro Swap. Diese Gebühr wird zum Pool addiert, nicht abgezogen. Das bedeutet, k wächst bei jedem Trade leicht an, und Liquiditätsanbieter profitieren. Das ist der Mechanismus, über den LPs Ertrag erwirtschaften. Details in Modul 5.

**[Slide 6]** Die Kurve. Die Constant-Product-Formel hat eine schöne Eigenschaft: der Pool kann nie vollständig leergehandelt werden. Um alle ETH herauszuziehen, müsste man unendlich viele USDC einzahlen. Das ist ein Schutz gegen Pool-Ausräumung. Die unangenehme Eigenschaft: die Liquidität verteilt sich über den gesamten Preisbereich, aber die meiste liegt in Bereichen, die praktisch nie erreicht werden. Das ist kapital-ineffizient. Uniswap V3 löst dieses Problem teilweise — kommt in Lektion 4.4.

**[Slide 7]** Arbitrage. Der Pool-Preis kann vom externen Marktpreis abweichen. Wenn das passiert, entsteht ein Anreiz: Arbitrageure kaufen, wo der Preis niedriger ist, und verkaufen, wo er höher ist. Diese Arbitrage verschiebt das Pool-Verhältnis zurück zum Marktpreis. Arbitrage ist mechanisch notwendig für funktionierende AMMs — und sie erzeugt Impermanent Loss für Liquiditätsanbieter. Das ist das Haupt-Risiko des LP-Seins, und wir gehen in Modul 5 tief hinein.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Große Formel-Darstellung "x · y = k" auf der Folie. Unten: Pool-Symbol mit zwei Token-Stapeln.

**[Slide 3]** Waage-Metapher: Token X links, Token Y rechts, Verhältnis bestimmt Preis.

**[Slide 4]** Schritt-für-Schritt-Berechnung visualisiert mit Pool-Beständen vor und nach dem Swap.

**[Slide 5]** Diagramm: Swap → 0,3% Gebühr → geht zurück in den Pool (Pfeil).

**[Slide 6]** Die klassische x·y=k-Kurve als Hyperbel. Farbliche Hervorhebung: wo die meiste Liquidität "liegt" vs. wo Swaps tatsächlich passieren.

**[Slide 7]** Diagramm mit externem Markt und Pool. Preisdifferenz. Arbitrageur gleicht aus. **SCREENSHOT SUGGESTION:** Etherscan-Transaktion einer realen Arbitrage zwischen zwei Pools.

### Übung

**Aufgabe: Swap manuell berechnen**

Ein Uniswap-V2-Pool hält 500 ETH und 1.500.000 USDC.

1. Berechne den aktuellen Spot-Preis von ETH.
2. Du willst 5 ETH in USDC tauschen (ignoriere Gebühren zur Vereinfachung). Wie viele USDC bekommst du?
3. Was ist der Preis-Impact in Prozent?
4. Du willst stattdessen 50 ETH tauschen. Wiederhole die Rechnung. Wie hat sich der Preis-Impact geändert?

**Deliverable:** Die vier Zahlen mit Rechenweg. Erkenntnis: Preis-Impact wächst überproportional mit Swap-Größe.

### Quiz

**Frage 1:** In einem Pool mit 100 Token A und 200.000 Token B: Was ist der Spot-Preis von A in B?

<details>
<summary>Antwort anzeigen</summary>

Spot-Preis von A in B = y / x = 200.000 / 100 = 2.000 B pro A. Der Spot-Preis reflektiert das Verhältnis der Mengen im Pool. Wichtig: Das ist der Preis für einen infinitesimal kleinen Swap; reale Swaps mit endlicher Größe erhalten einen schlechteren Preis wegen Preis-Impact.
</details>

**Frage 2:** Warum wird die Constant-Product-Formel als "kapital-ineffizient" bezeichnet?

<details>
<summary>Antwort anzeigen</summary>

Weil die Liquidität sich über den gesamten theoretischen Preisbereich von null bis unendlich verteilt. In einem ETH/USDC-Pool liegt also Liquidität für ETH-Preise von 10 Dollar und 100.000 Dollar bereit — Preise, die praktisch nie erreicht werden. Diese Liquidität bringt keinen Ertrag, weil keine Swaps in diesen Bereichen passieren, belegt aber Kapital der Liquiditätsanbieter. Das Verhältnis zwischen "produktiver" und "ungenutzter" Liquidität ist in V2 ungünstig. Uniswap V3 adressiert das mit konzentrierter Liquidität, die auf definierte Preisbereiche beschränkt wird.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Slides: Titel → x·y=k Visualisierung → Pool-Beispiel → Swap-Preisberechnung → Price-Impact-Effekt bei großen Swaps → 0,3%-Fee-Struktur → V2-Grenzen
- `voice_script.txt` — *Voice Narration Script* (120–140 WPM, Zielvideo 9–11 Min.)
- `visual_plan.json` — x·y=k Hyperbel-Kurve, Pool-Zustand-Diagramm vor/nach Swap, Price-Impact-Kurve über Trade-Größe, Uniswap-V2-Interface-Screenshot

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 4.3 — Slippage und Preis-Impact

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Slippage und Preis-Impact voneinander unterscheiden
- Angemessene Slippage-Toleranz wählen je nach Situation
- Sandwich-Angriffe durch korrekte Slippage-Einstellung verhindern
- Den Unterschied zwischen Slippage Tolerance (Benutzer-Setting) und realisierter Slippage (tatsächliches Ausführungsergebnis) präzise benennen
- Die Abhängigkeit von Slippage-Empfindlichkeit von Pool-Tiefe, Trade-Größe und Volatilität quantitativ abschätzen
- Situationsgerechte Slippage-Profile für Stablecoin-Swaps, Blue-Chip-Swaps und Long-Tail-Swaps konfigurieren

### Erklärung

Zwei Begriffe werden oft verwechselt: Preis-Impact und Slippage. Beide beschreiben Abweichungen vom erwarteten Preis, aber sie haben unterschiedliche Ursachen.

**Preis-Impact**

Preis-Impact ist die deterministische Abweichung vom Spot-Preis, die durch die Größe deines Swaps relativ zum Pool entsteht. Wie in Lektion 4.2 gezeigt: Je größer dein Swap im Verhältnis zum Pool, desto schlechter der effektive Preis.

**Faustregel:** Preis-Impact ist ungefähr proportional zur Swap-Größe relativ zum Pool. Ein Swap von 1% der Pool-Liquidität erzeugt etwa 1% Preis-Impact. Ein Swap von 5% erzeugt etwa 5% Preis-Impact — aber der tatsächliche Wert wächst überproportional, weil die Preis-Kurve nicht-linear ist.

Preis-Impact kennst du **vor** dem Swap. Die DEX-Oberfläche zeigt ihn an.

**Slippage**

Slippage ist die zusätzliche, nicht-deterministische Abweichung, die zwischen Signatur und tatsächlicher Ausführung entstehen kann. Zwischen dem Moment, in dem du die Transaktion signierst, und dem Moment, in dem sie in einem Block landet, können Sekunden bis Minuten vergehen. In dieser Zeit können andere Trades den Pool-Zustand verändert haben.

**Slippage-Toleranz** ist die maximale Preisverschlechterung, die du akzeptierst. Wird sie überschritten, revertiert die Transaktion.

**Typische Slippage-Einstellungen:**

- **Stablecoin-Swaps (USDC ↔ USDT):** 0,1–0,5%
- **Liquide Majors (ETH, BTC):** 0,5–1%
- **Liquide Mid-Caps:** 1–3%
- **Illiquide Tokens:** 3–10% (Vorsicht, hier beginnt Gefahr)
- **Sehr illiquide Tokens:** >10% (typisch extrem riskant)

Wer 50% Slippage akzeptiert, akzeptiert effektiv, zu jedem Preis zu kaufen. Das ist fast nie sinnvoll.

**Der Sandwich-Angriff**

Der häufigste Slippage-bezogene Angriff ist der **Sandwich-Angriff**. Er läuft in drei Schritten:

1. Angreifer sieht deine pending Transaktion im Mempool
2. Angreifer schaltet **vor** deiner Transaktion einen Kauf (pusht den Preis nach oben) — Front-Running
3. Deine Transaktion läuft zum schlechteren Preis
4. Angreifer verkauft **direkt nach** deiner Transaktion zu einem höheren Preis — Back-Running
5. Angreifer macht Gewinn in Höhe deines Slippage-Verlusts

Sandwich-Angriffe sind besonders profitabel bei:
- Großen Swaps
- Hoher Slippage-Toleranz
- Illiquiden Pools

**Schutz gegen Sandwich-Angriffe**

1. **Niedrige Slippage-Toleranz setzen.** Wenn du 0,5% Slippage akzeptierst, hat der Angreifer weniger Spielraum. Bei 10% Slippage gibt er einfach auf die volle Marge.

2. **Private Mempools nutzen.** MEV-Blocker, Flashbots Protect oder CoW Swap senden deine Transaktion nicht in den öffentlichen Mempool. Ein Angreifer sieht die Transaktion erst, wenn sie bereits im Block ist.

3. **DEX-Aggregatoren mit Sandwich-Schutz** (1inch, CoW Swap, Matcha mit bestimmten Konfigurationen).

4. **Kleinere Swaps** bei illiquiden Tokens. Ein großer Swap wird für einen Angreifer lukrativer.

**Wann Transaktionen reverten**

Wenn deine Slippage-Toleranz überschritten wird, revertiert die Transaktion. Das bedeutet:
- Die Transaktion wird nicht ausgeführt
- Du bezahlst trotzdem Gas für die fehlgeschlagene Transaktion
- Du musst neu versuchen (möglicherweise mit angepasster Slippage)

Das ist kein Fehler, sondern der Schutzmechanismus. Besser eine revertierte Transaktion als ein Swap zu einem schlechten Preis.

**Praktische Regel für konservative Nutzung**

Für die in diesem Kurs behandelten Strategien gilt:
- Swap nur, wenn du es wirklich brauchst (nicht aus Spekulation)
- Slippage-Toleranz so niedrig wie möglich setzen
- Bei großen Beträgen: Mempool-Schutz nutzen
- Bei illiquiden Tokens: überdenken, ob der Swap überhaupt sinnvoll ist

### Folien-Zusammenfassung

**[Slide 1] — Titel**
Slippage und Preis-Impact

**[Slide 2] — Preis-Impact**
Deterministisch, durch Swap-Größe vs. Pool verursacht.
Vor dem Swap bekannt.

**[Slide 3] — Slippage**
Nicht-deterministisch, durch zeitversetzte Ausführung.
Slippage-Toleranz = max. akzeptierte Abweichung.

**[Slide 4] — Typische Slippage-Werte**
- Stables: 0,1–0,5%
- Majors: 0,5–1%
- Mid-Caps: 1–3%
- Illiquide: 3–10% (riskant)
- Sehr illiquide: >10% (extrem riskant)

**[Slide 5] — Sandwich-Angriff**
1. Angreifer sieht pending Tx
2. Kauft vor dir → Preis steigt
3. Dein Trade läuft schlechter
4. Angreifer verkauft nach dir → Gewinn

**[Slide 6] — Schutz**
1. Niedrige Slippage-Toleranz
2. Private Mempools (Flashbots Protect, MEV Blocker)
3. Aggregatoren mit Schutz (CoW Swap)
4. Kleinere Swaps

**[Slide 7] — Revert als Schutz**
Überschreitet Slippage, revertiert Tx.
Gas verloren, aber kein schlechter Swap.
Revert ist der Schutzmechanismus.

### Sprechertext

**[Slide 1]** Slippage und Preis-Impact werden oft verwechselt. Das sind aber zwei unterschiedliche Phänomene, und du musst beide kontrollieren können.

**[Slide 2]** Preis-Impact ist die deterministische Abweichung vom Spot-Preis, die durch die Größe deines Swaps entsteht. Je größer dein Swap im Verhältnis zum Pool, desto schlechter der effektive Preis. Faustregel: etwa proportional zur Swap-Größe relativ zum Pool. Ein Swap von einem Prozent der Liquidität erzeugt grob ein Prozent Preis-Impact. Wichtig: Preis-Impact kennst du vor dem Swap. Die DEX zeigt ihn dir an.

**[Slide 3]** Slippage ist anders. Sie ist die zusätzliche, nicht-deterministische Abweichung, die zwischen Signatur und Ausführung entstehen kann. Zwischen dem Moment, in dem du signierst, und dem Moment, in dem die Transaktion in einem Block landet, können Sekunden vergehen. In dieser Zeit können andere Trades den Pool-Zustand verändern. Slippage-Toleranz ist die maximale Abweichung, die du akzeptierst. Wird sie überschritten, revertiert die Transaktion.

**[Slide 4]** Typische Slippage-Werte hängen stark vom gehandelten Asset ab. Stablecoin-Swaps: 0,1 bis 0,5 Prozent. Liquide Majors wie ETH oder BTC: 0,5 bis 1 Prozent. Mid-Caps: 1 bis 3 Prozent. Illiquide Tokens brauchen 3 bis 10 Prozent — aber hier beginnt die Gefahrenzone. Wer mehr als 10 Prozent akzeptiert, kauft praktisch zu jedem Preis. Das ist fast nie sinnvoll.

**[Slide 5]** Der häufigste Slippage-bezogene Angriff: der Sandwich-Angriff. Der Angreifer sieht deine pending Transaktion im Mempool. Er schaltet vor deiner Transaktion einen Kauf — das pusht den Preis nach oben. Deine Transaktion läuft jetzt zum schlechteren Preis. Direkt nach deiner Transaktion verkauft der Angreifer — zu einem höheren Preis als er gekauft hat. Der Gewinn des Angreifers ist ungefähr gleich deinem Slippage-Verlust.

**[Slide 6]** Schutz. Erstens: niedrige Slippage-Toleranz. Bei 0,5 Prozent hat der Angreifer wenig Spielraum. Bei 10 Prozent nimmt er die volle Marge. Zweitens: private Mempools. MEV Blocker, Flashbots Protect oder CoW Swap senden deine Transaktion nicht in den öffentlichen Mempool. Der Angreifer sieht die Transaktion erst, wenn sie bereits gemint ist. Drittens: DEX-Aggregatoren mit integriertem Sandwich-Schutz. Viertens: kleinere Swaps bei illiquiden Tokens.

**[Slide 7]** Ein wichtiger Punkt zum Abschluss: Wenn Slippage überschritten wird, revertiert die Transaktion. Das ist kein Fehler, sondern der Schutzmechanismus. Du verlierst zwar das Gas für die fehlgeschlagene Transaktion, aber du wirst nicht zu einem schlechten Preis getradet. Besser eine revertierte Transaktion als ein miserabler Swap.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Graph der Preis-Impact-Kurve: Swap-Größe auf x-Achse, Preis-Impact auf y-Achse. Überproportionaler Anstieg sichtbar.

**[Slide 3]** Timeline: Signatur → Warten → Ausführung. In der Wartezeit andere Trades dargestellt, die den Preis verändern.

**[Slide 4]** Tabelle mit Asset-Typen und empfohlenen Slippage-Werten.

**[Slide 5]** Sandwich-Diagramm: drei Blöcke auf einer Timeline — Angreifer-Kauf, dein Swap, Angreifer-Verkauf. Gewinn-Markierung beim Angreifer. **SCREENSHOT SUGGESTION:** Eigentcher (eigenphi.io) oder MEV-Boost-Explorer, der einen realen Sandwich-Angriff zeigt.

**[Slide 6]** Vier-Punkte-Checkliste mit Icons. **SCREENSHOT SUGGESTION:** MEV-Blocker-Website (mevblocker.io) oder Flashbots-Protect-Interface.

**[Slide 7]** Flussdiagramm: Slippage überschritten → Transaktion revertiert → Gas verloren, aber Kapital sicher.

### Übung

**Aufgabe: Slippage-Einstellung in der Praxis**

1. Öffne app.uniswap.org.
2. Stelle einen Swap zwischen ETH und USDC ein (kleiner Betrag, z.B. 0,01 ETH).
3. Öffne die Einstellungen (Zahnrad-Symbol). Finde die Slippage-Toleranz.
4. Variiere die Einstellungen: 0,1%, 0,5%, 1%, 5%. Beobachte, wie sich "Minimum Received" verändert.
5. Zusätzlich: Besuche mevblocker.io. Lies, wie die Integration in die Wallet funktioniert.

**Deliverable:**
- Screenshot der Uniswap-Slippage-Einstellungen
- Notiz: Wie viel USDC "Minimum Received" ergaben sich bei den vier Slippage-Werten?
- Kurze Einschätzung (3 Sätze): Welche Einstellung würdest du bei diesem Swap real nutzen und warum?

### Quiz

**Frage 1:** Erkläre den Unterschied zwischen Preis-Impact und Slippage in zwei Sätzen.

<details>
<summary>Antwort anzeigen</summary>

Preis-Impact ist die deterministische, vorhersehbare Abweichung vom Spot-Preis, die durch die Größe des eigenen Swaps relativ zur Pool-Liquidität entsteht und vor dem Swap bekannt ist. Slippage ist die zusätzliche, nicht-deterministische Abweichung, die zwischen Signatur und Block-Ausführung durch andere Marktteilnehmer oder MEV-Angriffe entstehen kann und durch eine Slippage-Toleranz begrenzt wird.
</details>

**Frage 2:** Warum ist hohe Slippage-Toleranz ein Angreifer-Geschenk?

<details>
<summary>Antwort anzeigen</summary>

Die Slippage-Toleranz definiert den maximalen Verlust, den der Nutzer akzeptiert. Ein Sandwich-Angreifer kann maximal bis zu diesem Limit Gewinn extrahieren — alles darüber würde die Transaktion reverten lassen und seinen Angriff unrentabel machen. Bei 0,5% Slippage hat der Angreifer maximal 0,5% Marge. Bei 10% Slippage kann der Angreifer 10% Marge extrahieren, was einen großen Swap extrem lukrativ für MEV-Bots macht. Konservative Slippage-Einstellungen begrenzen also strukturell das profit-potenzial von Angreifern.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Slides: Titel → Preis-Impact vs. Slippage → Slippage-Toleranz → Sandwich-Attack-Mechanik → Profile pro Asset-Typ → Uniswap-Interface-Walkthrough → Schutz-Strategien
- `voice_script.txt` — *Voice Narration Script* (120–140 WPM, Zielvideo 9–11 Min.)
- `visual_plan.json` — Preis-Impact-vs-Slippage-Vergleichsdiagramm, Sandwich-Attack-Zeitleiste, Slippage-Profile-Tabelle (Stable/Blue-Chip/Long-Tail), Uniswap-Settings-Screenshot

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 4.4 — Konzentrierte Liquidität: Uniswap V3

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Das Prinzip konzentrierter Liquidität erklären
- Die Vor- und Nachteile von V3-LP-Positionen gegenüber V2 einschätzen
- Verstehen, warum V3 nicht automatisch besser ist als V2
- Ticks, Ranges und Fee Tiers als zentrale V3-Konzepte technisch einordnen
- Die Begriffe "In-Range" vs. "Out-of-Range" in ihrer Auswirkung auf Fee-Generierung und Impermanent Loss verstehen
- Die Eignung von V2 vs. V3 für verschiedene Pool-Typen (Stablecoin-Pairs, volatile Assets, Long-Tail) situativ beurteilen

### Erklärung

Uniswap V3 (gestartet 2021) adressierte das Kapital-Effizienz-Problem von V2. Die zentrale Idee: Liquiditätsanbieter wählen, in welchem **Preisbereich** ihre Liquidität aktiv ist. Liquidität außerhalb dieses Bereichs ist nicht allokiert.

**Das Konzept konzentrierter Liquidität**

In V2 wird Liquidität über den gesamten Preisbereich von null bis unendlich verteilt. Bei einem ETH-Preis von 3.000 USDC liegt Liquidität bereit für Preise von 100 oder 10.000 USDC — Bereiche, die praktisch nie angefahren werden.

In V3 definiert ein LP einen Preisbereich, z.B. "ETH zwischen 2.800 und 3.200 USDC". Nur in diesem Bereich arbeitet die Liquidität. Das bedeutet: Mit demselben Kapital kann ein LP deutlich mehr Gebühren verdienen, solange der Preis im gewählten Bereich bleibt.

**Das Problem der Range-Exits**

Wenn der Preis den gewählten Bereich verlässt, passiert Folgendes:
- Wenn ETH auf 3.300 USDC steigt und der LP-Bereich bei 2.800–3.200 USDC endete: der LP hält nur noch USDC. Kein ETH, keine Gebühren, bis der Preis zurückkommt.
- Wenn ETH auf 2.700 USDC fällt: der LP hält nur noch ETH. Kein USDC, keine Gebühren.

Das heißt: Je enger der gewählte Bereich, desto höher die potenzielle Gebühren-Rendite — aber auch desto höher die Wahrscheinlichkeit, "out of range" zu gehen und keine Gebühren zu verdienen.

**Fee-Tiers**

V3 bietet mehrere Gebühren-Stufen, die sich nach Volatilität des Paares richten:
- 0,01% — exotisch stabil (z.B. USDC/USDT)
- 0,05% — stabil (Stablecoin-Paare, einige Liquid-Staking-Tokens)
- 0,3% — Standard (ETH/USDC, Majors)
- 1% — volatile, exotische Paare

Je volatiler das Paar, desto höher die Gebühr — als Kompensation für das höhere Impermanent-Loss-Risiko.

**Wann V3 für einen LP sinnvoll ist**

V3-LP-Positionen sind mit Arbeit verbunden. Der LP muss:
- Einen Preisbereich wählen (das erfordert Markt-Meinung)
- Die Position überwachen
- Bei Range-Exit entscheiden: neu positionieren oder warten

Für passive LPs ist V3 selten optimal. Für aktive LPs mit Markt-Sicht und Zeit zur Überwachung kann V3 deutlich höhere Renditen bringen — aber eben auch höheren Impermanent Loss, wenn der Markt falsch eingeschätzt wird.

**Wann V2-ähnliche Pools vorzuziehen sind**

Für passive Liquiditätsbereitstellung ohne Überwachung sind V2-ähnliche Pools (Uniswap V2, SushiSwap, Aerodrome V2) oder Curve-artige Pools (spezialisiert für enge Ranges von Pegged Assets) oft besser. Modul 5 behandelt LP-Strategien im Detail.

**Aus Swapper-Perspektive**

Als Swapper merkst du von V2 vs. V3 wenig direkt. Die Uniswap-Oberfläche routet automatisch zum besten Pool. Du profitierst von V3 durch:
- Engere Spreads bei liquiden Paaren (höhere konzentrierte Liquidität → geringerer Preis-Impact)
- Mehrere Fee-Tiers (optimiert für das gewählte Paar)

Aggregatoren (1inch, Matcha) splittet Swaps automatisch über V2-, V3- und andere DEX-Pools, um den besten Gesamtpreis zu erreichen.

### Folien-Zusammenfassung

**[Slide 1] — Titel**
Uniswap V3: Konzentrierte Liquidität

**[Slide 2] — Das Problem von V2**
Liquidität verteilt von null bis unendlich.
Meiste Liquidität ungenutzt.
Kapital-ineffizient.

**[Slide 3] — V3-Prinzip**
LP wählt Preisbereich.
Nur in diesem Bereich aktiv.
Mehr Gebühren pro Kapital — aber enger Bereich = höheres Risiko des Range-Exits.

**[Slide 4] — Range-Exit**
Preis verlässt Bereich → LP hält nur ein Asset, verdient keine Gebühren.
Je enger der Bereich, desto höher die Wahrscheinlichkeit.

**[Slide 5] — Fee-Tiers**
- 0,01% — exotisch stabil
- 0,05% — stabil
- 0,3% — Standard (Majors)
- 1% — volatile, exotische Paare

**[Slide 6] — Wann V3 für LPs**
Aktive LPs mit Markt-Meinung und Zeit zur Überwachung.
Nicht für passive LPs ohne Monitoring.

**[Slide 7] — Swapper-Perspektive**
Engere Spreads bei liquiden Paaren.
Aggregatoren routen automatisch V2/V3/andere.

### Sprechertext

**[Slide 1]** Uniswap V3 löste das Kapital-Effizienz-Problem von V2 — zumindest teilweise. Die Idee ist einfach, die Konsequenzen sind es nicht. Du solltest V3 verstehen, weil es heute die meistgenutzte DEX-Architektur ist.

**[Slide 2]** Das Problem von V2. Liquidität wird über den gesamten Preisbereich von null bis unendlich verteilt. Bei einem ETH-Preis von 3.000 Dollar liegt Liquidität bereit für Preise von 100 oder 10.000 Dollar — Bereiche, die praktisch nie angefahren werden. Das bindet Kapital, das keine Gebühren verdient.

**[Slide 3]** Das V3-Prinzip. Ein LP wählt einen Preisbereich, zum Beispiel ETH zwischen 2.800 und 3.200 Dollar. Nur in diesem Bereich arbeitet die Liquidität. Die Konsequenz: mit demselben Kapital kann der LP deutlich mehr Gebühren verdienen, solange der Preis im gewählten Bereich bleibt. Das ist konzentrierte Liquidität.

**[Slide 4]** Der Haken: Range-Exits. Wenn der Preis den gewählten Bereich verlässt, hält der LP nur noch ein Asset und verdient keine Gebühren mehr. Steigt ETH über 3.200 Dollar, hält der LP nur noch USDC. Fällt ETH unter 2.800 Dollar, hält er nur noch ETH. Je enger der Bereich gewählt wird, desto höher die potenzielle Rendite — aber auch die Wahrscheinlichkeit, aus dem Bereich zu laufen.

**[Slide 5]** V3 bietet mehrere Fee-Tiers, abgestimmt auf die Volatilität des Paares. 0,01 Prozent für extrem stabile Paare wie USDC/USDT. 0,05 Prozent für stabile Paare wie Stablecoin-Stablecoin oder einige Liquid-Staking-Tokens. 0,3 Prozent als Standard für Majors wie ETH/USDC. 1 Prozent für volatile, exotische Paare. Je volatiler, desto höher die Gebühr — als Kompensation für Impermanent Loss.

**[Slide 6]** Wann ist V3 für einen Liquiditätsanbieter sinnvoll. Für aktive LPs mit einer Markt-Sicht und Zeit zur Überwachung kann V3 deutlich höhere Renditen bringen. Für passive LPs ohne Monitoring ist V3 selten optimal — die Verwaltung kostet Zeit, und falsche Bereichswahl führt zu Impermanent Loss ohne Gebühren-Kompensation. Details zu LP-Strategien kommen in Modul 5.

**[Slide 7]** Aus Swapper-Perspektive merkst du wenig direkt. Die Uniswap-Oberfläche routet automatisch zum besten Pool. Du profitierst indirekt: engere Spreads bei liquiden Paaren, weil konzentrierte Liquidität geringeren Preis-Impact bedeutet. Aggregatoren wie 1inch oder Matcha splitten Swaps automatisch über V2, V3 und andere Pools, um den besten Gesamtpreis zu erreichen.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Diagramm der V2-Liquiditätsverteilung: gleichmäßig über den gesamten Preisbereich, mit Schraffur "ungenutzt" in den Extrembereichen.

**[Slide 3]** Diagramm der V3-Liquiditätsverteilung: konzentriert in einem definierten Bereich. Markierung "10–100x effizienter" in diesem Bereich.

**[Slide 4]** Zwei-Szenarien-Darstellung: Preis im Bereich (LP hält Mix, verdient Gebühren) vs. Preis außerhalb (LP hält ein Asset, keine Gebühren).

**[Slide 5]** Tabelle der Fee-Tiers mit Beispiel-Paaren pro Tier.

**[Slide 6]** Zwei-Personen-Darstellung: "Aktiver LP" (mit Laptop, beobachtet Chart) vs. "Passiver LP" (ohne Überwachung). Pfeile zu V3 bzw. V2/Curve.

**[Slide 7]** **SCREENSHOT SUGGESTION:** Uniswap-Swap-Interface, das die Route zeigt (z.B. "Best price found: Uniswap V3 0.05%"). Alternativ: 1inch-Aggregator-Interface mit Route-Splitting.

### Übung

**Aufgabe: V3-Pool analysieren**

1. Öffne info.uniswap.org (Uniswap Analytics).
2. Wähle einen ETH/USDC-V3-Pool (typisch der 0,05%-Pool).
3. Notiere:
 - Aktueller TVL
 - 24h-Volumen
 - 24h-Gebühren
 - Liquiditätsverteilung (Chart)
4. Berechne die grobe Rendite für Liquiditätsanbieter: (24h-Gebühren / TVL) × 365.
5. Vergleiche mit dem 0,3%-Pool des gleichen Paares.

**Deliverable:** Vergleichstabelle der zwei Pools. Kurze Analyse (5–7 Sätze): Welcher Pool ist für einen passiven LP besser geeignet, welcher für einen aktiven LP?

### Quiz

**Frage 1:** Ein LP positioniert sich in einem V3-Pool bei ETH zwischen 2.900 und 3.100 USDC. Der Preis bewegt sich auf 3.150 USDC. Was passiert mit der Position?

<details>
<summary>Antwort anzeigen</summary>

Die Position ist "out of range" auf der oberen Seite. Der LP hält jetzt nur noch USDC (kein ETH mehr — beim Steigen des Preises wurde ETH schrittweise gegen USDC getauscht). Er verdient keine weiteren Gebühren, solange der Preis über 3.100 bleibt. Optionen: warten, bis der Preis zurück in den Bereich fällt, oder die Position auflösen und neu positionieren (kostet Gas, und der LP realisiert den aktuellen Asset-Mix).
</details>

**Frage 2:** Warum ist Uniswap V3 nicht automatisch besser als V2 für jeden Liquiditätsanbieter?

<details>
<summary>Antwort anzeigen</summary>

V3 erfordert aktive Entscheidungen: Preisbereich wählen, überwachen, gegebenenfalls neu positionieren. Das kostet Zeit und Gas. Ein enger Bereich bringt potenziell hohe Gebühren, aber bei falscher Markt-Einschätzung führt er zu frühen Range-Exits mit hohem Impermanent Loss und ohne Gebühren-Kompensation. Für passive LPs ohne Markt-Sicht und ohne Überwachung sind V2-ähnliche Pools oder spezialisierte Curve-Pools oft bessere Wahl. V3 ist ein Werkzeug, das Expertise erfordert — sonst kann es gegen den LP arbeiten.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Slides: Titel → Problem von V2 → Konzentrierte Liquidität → Ticks & Ranges → Fee Tiers (0,01/0,05/0,3/1%) → In-Range vs. Out-of-Range → V3-Pool-Auswahl-Matrix
- `voice_script.txt` — *Voice Narration Script* (120–140 WPM, Zielvideo 10–12 Min.)
- `visual_plan.json` — V2-Liquiditätsverteilung vs. V3-konzentrierte Liquidität, Tick-Diagramm, Fee-Tier-Tabelle, Range-Position-Visualisierung, Uniswap-V3-Interface-Screenshot

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 4.5 — MEV: Die unsichtbare Steuer

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- MEV definieren und die Haupt-Kategorien benennen
- Die Wirkung von MEV auf normale Nutzer einschätzen
- MEV-Schutzmechanismen praktisch einsetzen
- Sandwich-Attacks, Arbitrage und Liquidations-MEV als drei strukturell verschiedene Formen differenzieren
- Die MEV-Supply-Chain (Searcher → Builder → Proposer, MEV-Boost, Flashbots) in ihren Grundzügen erklären (Vertiefung in Modul 11)
- Private-Mempool-Lösungen (Flashbots Protect, MEV Blocker, CoW Swap) praktisch in eigene Swaps integrieren

### Erklärung

**MEV** steht ursprünglich für "Miner Extractable Value", nach dem Übergang zu Proof-of-Stake für "Maximal Extractable Value". Der Begriff bezeichnet den Wert, den Block-Produzenten (heute: Validatoren und Searcher) aus der Reihenfolge und Auswahl von Transaktionen innerhalb eines Blocks extrahieren können.

Einfacher ausgedrückt: MEV ist Geld, das durch geschickte Positionierung von Transaktionen verdient wird — oft auf Kosten normaler Nutzer.

**Die drei Haupt-Kategorien von MEV**

**1. Arbitrage**
Preisdifferenzen zwischen Pools werden ausgeglichen. Ein Searcher sieht, dass ETH auf Uniswap bei 3.000 USDC handelt, aber auf SushiSwap bei 3.005 USDC. Er kauft auf Uniswap, verkauft auf SushiSwap, macht 5 USDC pro ETH Gewinn. Diese Art MEV ist **nicht schädlich** — sie gleicht Preise aus, was für das Gesamt-System nützlich ist.

**2. Liquidations-MEV**
Ein Lending-Protokoll hat einen unterbesicherten Kreditnehmer. Searcher konkurrieren darum, die Liquidation auszuführen und die Liquidations-Prämie zu verdienen. Auch diese Form von MEV ist **funktional notwendig** — Liquidationen halten Lending-Protokolle solvent. Der Wettbewerb geht oft fast vollständig an die Validatoren, aber das System funktioniert.

**3. Sandwich-Angriffe (Frontrunning/Backrunning)**
Wie in Lektion 4.3 beschrieben: Searcher erkennt pending Swap, schaltet einen Kauf vor und einen Verkauf nach dem Nutzer-Swap. Der Profit ist der Slippage-Verlust des Nutzers. Diese Form von MEV ist **schädlich** — sie ist direkte Extraktion aus den Nutzern.

**Größenordnungen**

Das gesamte MEV-Volumen auf Ethereum liegt jährlich im Milliarden-Bereich. Der Anteil von Sandwich-Angriffen am Gesamt-MEV variiert, liegt aber historisch bei mehreren Hundert Millionen Dollar pro Jahr. Aktuelle Zahlen findest du auf mev.wtf, eigenphi.io oder explore.flashbots.net.

**Die MEV-Supply-Chain**

MEV wird von einem Netzwerk von Akteuren extrahiert:

- **Searcher:** Identifizieren MEV-Opportunitäten durch Bots, die den Mempool beobachten
- **Builder:** Konstruieren Blöcke, optimal geordnet für maximales MEV
- **Relays:** Leiten fertige Blöcke an Validatoren weiter
- **Validatoren:** Akzeptieren den profitabelsten Block und veröffentlichen ihn

Searcher bezahlen Validatoren über Priority Fees oder direkte Payments für die Platzierung. Dieses System (MEV-Boost) ist auf Ethereum quasi-Standard.

**Private Mempools und MEV-Schutz**

Normalerweise landen Transaktionen im öffentlichen Mempool, wo jeder sie sehen kann. Das ist der Ausgangspunkt für Sandwich-Angriffe. Die Verteidigung ist, die Transaktion an einen privaten Relay zu senden, der sie direkt an Builder/Validatoren weiterreicht — ohne Umweg über den öffentlichen Mempool.

**Praktische Tools:**

- **Flashbots Protect** (protect.flashbots.net) — der Original-Dienst, zuverlässig
- **MEV Blocker** (mevblocker.io) — alternative, community-getragen
- **CoW Swap** (swap.cow.fi) — integriert MEV-Schutz in die DEX-Oberfläche und aggregiert über mehrere DEXs
- **Rabby Wallet** — bietet integrierten MEV-Schutz-Toggle

**Was MEV-Schutz konkret bewirkt**

Mit MEV-Schutz:
- Deine Transaktion ist nicht im öffentlichen Mempool sichtbar
- Sandwich-Angreifer können nicht vor dir positionieren
- Deine Slippage-Toleranz wird tatsächlich das Worst-Case und nicht das erwartbare Ergebnis

Ohne MEV-Schutz bei einem großen Swap: Der Sandwich-Angreifer kann bis zu deiner Slippage-Toleranz Gewinn extrahieren. Bei 1% Slippage auf einem 10.000-USD-Swap = potenziell 100 USD Extraktion.

**MEV auf Layer-2**

Auf vielen Layer-2s (Arbitrum, Optimism, Base) ist MEV strukturell reduziert, weil ein einzelner Sequencer die Transaktions-Reihenfolge bestimmt. Sandwich-Angriffe sind aktuell selten auf diesen Chains. Das kann sich mit dezentralen Sequencern in Zukunft ändern.

**Konservative Praxis**

Für den in diesem Kurs behandelten Ansatz:
- Große Swaps (>1.000 USD) immer mit MEV-Schutz ausführen
- Standard-Wallets konfigurieren, MEV-Schutz by default einzuschalten
- Slippage konservativ setzen als zusätzliche Schutzschicht
- Auf Layer-2s ist MEV-Schutz aktuell meist nicht erforderlich, aber Layer-1-Transaktionen (Mainnet) benötigen ihn

### Folien-Zusammenfassung

**[Slide 1] — Titel**
MEV: Die unsichtbare Steuer

**[Slide 2] — Definition**
Maximal Extractable Value.
Wert, der durch Transaktions-Reihenfolge extrahiert wird.
Jährlich mehrere Milliarden USD auf Ethereum.

**[Slide 3] — Drei Kategorien**
1. Arbitrage (nützlich)
2. Liquidations-MEV (notwendig)
3. Sandwich-Angriffe (schädlich)

**[Slide 4] — Die Supply-Chain**
Searcher → Builder → Relay → Validator.
MEV-Boost ist Standard auf Ethereum.

**[Slide 5] — Öffentlicher Mempool als Schwachstelle**
Transaktionen sind vor Ausführung sichtbar.
Das ermöglicht Sandwich-Angriffe.

**[Slide 6] — Private Mempools als Schutz**
Transaktion geht direkt an Builder.
Keine Sichtbarkeit im öffentlichen Mempool.

**[Slide 7] — Praktische Tools**
- Flashbots Protect
- MEV Blocker
- CoW Swap
- Rabby (integriert)

**[Slide 8] — Layer-2-Situation**
MEV aktuell reduziert durch zentrale Sequencer.
Kann sich mit Dezentralisierung ändern.

### Sprechertext

**[Slide 1]** MEV ist eines der wichtigsten Konzepte für jeden aktiven DeFi-Nutzer. Es ist die unsichtbare Steuer, die du bei jeder ungeschützten Transaktion zahlst — oft, ohne es zu merken.

**[Slide 2]** MEV steht für Maximal Extractable Value. Der Wert, den Block-Produzenten und Searcher aus der Reihenfolge und Auswahl von Transaktionen extrahieren können. Das gesamte MEV-Volumen auf Ethereum liegt jährlich im Milliarden-Bereich. Ein Teil davon kommt direkt aus den Taschen normaler Nutzer.

**[Slide 3]** Drei Hauptkategorien. Arbitrage ist nützlich — sie gleicht Preise über Pools aus, das System profitiert. Liquidations-MEV ist funktional notwendig — es hält Lending-Protokolle solvent. Sandwich-Angriffe sind schädlich — sie extrahieren direkt aus den Nutzern. Die ersten beiden sind Teil eines gesunden Systems. Die dritte ist eine Steuer auf Unwissenheit.

**[Slide 4]** Die Supply-Chain ist mehrstufig. Searcher sind Bots, die Mempool-Opportunities identifizieren. Builder konstruieren Blöcke aus Searcher-Bundles plus öffentlichen Transaktionen. Relays reichen Blöcke an Validatoren. Validatoren veröffentlichen den profitabelsten Block. Dieses System, genannt MEV-Boost, ist auf Ethereum Quasi-Standard.

**[Slide 5]** Die Schwachstelle für Nutzer ist der öffentliche Mempool. Jede Transaktion ist dort sichtbar, bevor sie gemint wird. Ein Sandwich-Bot kann sie analysieren, entscheiden, ob ein Angriff profitabel ist, und entsprechend positionieren.

**[Slide 6]** Die Verteidigung ist, den öffentlichen Mempool zu umgehen. Eine Transaktion wird an einen privaten Relay gesendet, der sie direkt an Builder und Validatoren weitergibt. Sie ist erst im Block sichtbar, wenn der Block bereits produziert ist. Dann ist es zu spät für einen Sandwich.

**[Slide 7]** Praktische Tools. Flashbots Protect ist der Original-Dienst, zuverlässig, seit Jahren etabliert. MEV Blocker ist eine community-getragene Alternative. CoW Swap integriert MEV-Schutz direkt in die DEX-Oberfläche und aggregiert dabei über mehrere DEXs. Rabby Wallet hat einen eingebauten Toggle. Die Empfehlung: für größere Swaps immer einen davon aktivieren.

**[Slide 8]** Auf Layer-2s ist die MEV-Situation aktuell strukturell reduziert. Arbitrum, Optimism, Base haben jeweils einen zentralen Sequencer, der Transaktions-Reihenfolge bestimmt. Sandwich-Angriffe sind dort aktuell selten. Das kann sich ändern, wenn Sequencer dezentralisiert werden — das ist ein laufendes Design-Thema. Für jetzt: auf Layer-2s meist kein dedizierter MEV-Schutz nötig, auf Mainnet unbedingt.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** **SCREENSHOT SUGGESTION:** mev.wtf oder eigenphi.io Dashboard mit aktuellem MEV-Volumen. Alternativ: explore.flashbots.net.

**[Slide 3]** Drei-Kategorien-Diagramm mit Farb-Coding: grün (nützlich), gelb (notwendig), rot (schädlich).

**[Slide 4]** Flussdiagramm der Supply-Chain mit Beispiel-Block-Produktion.

**[Slide 5]** Mempool-Visualisierung: viele pending Transaktionen, Angreifer-Bot beobachtet. **SCREENSHOT SUGGESTION:** blocknative.com Mempool Explorer live.

**[Slide 6]** Seite-an-Seite: "öffentlicher Mempool" vs. "privater Relay" mit jeweiligem Routing-Pfad.

**[Slide 7]** Vier Tool-Logos und kurze Beschreibungen. **SCREENSHOT SUGGESTION:** Rabby-Einstellungen mit MEV-Schutz-Toggle.

**[Slide 8]** Tabelle: Ethereum L1 vs. Arbitrum/Optimism/Base — MEV-Status und Empfehlung.

### Übung

**Aufgabe: MEV-Schutz einrichten und verifizieren**

1. Besuche mevblocker.io.
2. Füge MEV Blocker als Custom RPC in deine Wallet ein (folge den Anleitungen auf der Site).
3. Stelle in deiner Wallet das Ethereum Mainnet auf diesen RPC um.
4. Führe einen kleinen Test-Swap aus (z.B. 10 USDC zu USDT auf Uniswap).
5. Nach dem Swap: prüfe auf Etherscan, ob die Transaktion erfolgreich war. Prüfe zusätzlich auf eigenphi.io oder ähnlich, ob ein Sandwich versucht wurde.

Als Alternative kannst du CoW Swap verwenden (swap.cow.fi) — dort ist der Schutz schon eingebaut, ohne RPC-Änderung.

**Deliverable:**
- Screenshot der RPC-Einstellung in der Wallet (oder des CoW-Swap-Interface)
- Transaktion-Hash des Test-Swaps
- Kurze Notiz (3 Sätze): Hat die Umstellung funktioniert? Hast du Geschwindigkeits-Unterschiede bemerkt?

### Quiz

**Frage 1:** Warum ist Arbitrage-MEV funktional anders zu bewerten als Sandwich-MEV?

<details>
<summary>Antwort anzeigen</summary>

Arbitrage gleicht Preisdifferenzen zwischen Pools oder zwischen DEX und CEX aus. Das hält Preise konsistent, reduziert Slippage für normale Nutzer und ist eine funktionale Dienstleistung an das Gesamt-System. Der Profit des Arbitrageurs ist der Ausgleich der Ineffizienz — ohne ihn wären Preise verzerrt. Sandwich-MEV hingegen erzeugt keinen Mehrwert. Der Angreifer extrahiert direkt aus einem Nutzer, der sich nicht verteidigen kann. Arbitrage ist Teil des gesunden Markt-Mechanismus; Sandwich ist eine Steuer auf Unwissenheit.
</details>

**Frage 2:** Ein Nutzer tradet regelmäßig auf Uniswap mit Swaps über 5.000 USD. Was ist die minimale MEV-Verteidigung, die er einrichten sollte?

<details>
<summary>Antwort anzeigen</summary>

Erstens: privaten Mempool einrichten — Flashbots Protect, MEV Blocker oder CoW Swap. Bei Swaps dieser Größe ist MEV-Schutz keine Option, sondern Pflicht. Zweitens: konservative Slippage-Toleranz als zusätzliche Schicht (0,5–1% bei liquiden Paaren). Drittens: bei wirklich großen Swaps über 10.000 USD zusätzlich DEX-Aggregatoren mit Route-Splitting nutzen (1inch, CoW Swap), um Preis-Impact zu reduzieren. Die Kombination aus privater Mempool-Routing plus enger Slippage plus Aggregator-Routing adressiert die drei Haupt-Vektoren — Mempool-Sichtbarkeit, Slippage-Extraktion und Pool-Konzentration.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Slides: Titel → MEV-Definition → 3 Kategorien (Arbitrage/Sandwich/Liquidation) → MEV-Supply-Chain → Sandwich-Attack-Anatomie → Schutz-Mechanismen → Private-Mempool-Setup
- `voice_script.txt` — *Voice Narration Script* (120–140 WPM, Zielvideo 10–12 Min., Bridge zu Modul 11)
- `visual_plan.json` — MEV-Kategorien-Diagramm, Searcher/Builder/Proposer-Flow, Sandwich-Zeitleiste (front/victim/back), Flashbots-Protect-Setup-Screenshot, CoW-Swap-Interface

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 4.6 — DEX-Aggregatoren und professionelle Swap-Ausführung

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Erklären, was DEX-Aggregatoren tun und wie sie Preise optimieren
- Eine Swap-Checkliste für professionelle Nutzung anwenden
- Die richtige Ausführungs-Plattform für verschiedene Swap-Größen wählen
- Die Rolle von 1inch, CoW Swap, Paraswap, Odos und Matcha als Meta-Router mit jeweils unterschiedlichen Routing-Philosophien einordnen
- Intent-basierte Systeme (CoW Swap, UniswapX) gegenüber klassischer Routing-Architektur abgrenzen
- Eine Pre-Trade-Checkliste (Slippage, MEV-Schutz, Gas, Route, Simulation) in jeden professionellen Swap integrieren

### Erklärung

Kein liquider Markt liegt mehr bei einem einzelnen DEX. Ein Swap von ETH zu USDC kann über Uniswap V2, V3 (mehrere Fee-Tiers), SushiSwap, Curve, Balancer und andere Pools fließen. DEX-Aggregatoren nehmen diese Komplexität ab: Sie finden die optimale Route über alle verfügbaren Pools und DEXs.

**Wie Aggregatoren arbeiten**

Wenn du einen Swap eingibst, prüft der Aggregator:
1. Welche Pools das gewünschte Paar handeln
2. Welche Liquidität jeweils verfügbar ist
3. Welche Routen über mehrere Pools existieren (z.B. ETH → USDC direkt vs. ETH → WBTC → USDC)
4. Wie ein Splitting über mehrere Pools den Preis-Impact reduziert

Das Ergebnis ist oft ein besserer Preis als der beste einzelne Pool, besonders bei größeren Swaps.

**Die wichtigsten Aggregatoren**

**1inch** (1inch.io)
- Einer der ältesten und etabliertesten
- Sehr gute Routen-Optimierung
- Bietet "Fusion" — eine Auktions-basierte Ausführung mit integriertem MEV-Schutz
- Große Nutzer-Basis

**CoW Swap** (swap.cow.fi)
- Auktions-basiertes Modell ("Coincidence of Wants")
- Integrierter MEV-Schutz
- Teilweise intra-Nutzer-Matching, was zusätzliche Effizienz bringt
- Ausführliche Preistransparenz

**Matcha** (matcha.xyz)
- Von 0x Labs
- Klares Interface
- Gute Liquiditäts-Aggregation

**Paraswap** (paraswap.io)
- Etabliert, vor allem bei institutionellen Nutzern
- Gutes Support-Ecosystem

**Für Endnutzer sind 1inch, CoW Swap und Matcha die drei sinnvollen Haupt-Optionen.** Sie alle sind kostenlos (der Aggregator nimmt meist keine Gebühr direkt, verdient intern).

**Die Swap-Ausführungs-Checkliste**

Vor jedem größeren Swap systematisch prüfen:

**1. Route prüfen**
- Welche Pools/DEXs werden genutzt?
- Ist der Preis besser als bei einem einzelnen DEX?
- Aggregatoren zeigen die Route transparent

**2. Preis-Impact prüfen**
- Unter 1%: unkritisch
- 1–3%: überdenken, ob die Swap-Größe sinnvoll ist
- Über 3%: meistens in mehrere kleinere Swaps splitten

**3. Slippage setzen**
- Stablecoins: 0,1–0,5%
- Liquide Majors: 0,5–1%
- Mid-Caps: 1–3%

**4. MEV-Schutz aktivieren**
- Bei Mainnet-Swaps: immer
- Aggregatoren wie CoW Swap und 1inch Fusion haben Schutz integriert
- Für direkte Uniswap-Swaps: Flashbots Protect oder MEV Blocker als RPC

**5. Transaktion simulieren**
- Rabby zeigt automatisch, was passieren wird
- Bestätigt, dass die richtigen Tokens bewegt werden

**6. Signatur sorgfältig prüfen**
- Approval-Betrag: unlimited vs. exakt?
- Spender-Adresse: bekannt?

**7. Erst dann ausführen**

**Wahl der Ausführungs-Plattform**

| Swap-Größe | Empfehlung |
|---|---|
| < 100 USD | Direkter DEX (z.B. Uniswap) — Gas-Effizienz wichtiger als optimale Route |
| 100–1.000 USD | Aggregator (CoW Swap, 1inch) ohne viel Aufwand |
| 1.000–10.000 USD | Aggregator mit MEV-Schutz, Slippage konservativ, Route-Check |
| > 10.000 USD | Aggregator + MEV-Schutz + eventuell Splitting in mehrere Transaktionen zu unterschiedlichen Zeiten |

**Gas-Optimierung bei Swaps**

Auf Mainnet sind Gas-Kosten pro Swap signifikant. Strategien:
- Swaps auf Layer-2 ausführen, wenn möglich (Gas-Kosten oft 10–50x geringer)
- Swaps in Zeiten niedriger Gas-Preise ausführen (etherscan.io/gastracker)
- Komponierte Transaktionen nutzen (mehrere Aktionen in einer Transaktion)

**Professionelle Minimum-Standards**

Für die in diesem Kurs behandelten Strategien ist professionelle Swap-Ausführung ein Kern-Skill. Die Minimum-Standards:
- Nie ohne Slippage-Kontrolle swappen
- Bei Beträgen über 1.000 USD: MEV-Schutz immer
- Signatur-Inhalte vor jedem Swap verstehen
- Route und Preis-Impact bewusst prüfen

Kapital, das durch schlechte Swap-Ausführung verloren geht, reduziert die Rendite jedes anderen Teils deiner Strategie. 1% schlechter Swap-Preis pro Woche entspricht ~50% Rendite-Verlust pro Jahr. Das lohnt sich zu kontrollieren.

### Folien-Zusammenfassung

**[Slide 1] — Titel**
DEX-Aggregatoren und professionelle Swap-Ausführung

**[Slide 2] — Was Aggregatoren tun**
Finden die beste Route über alle DEXs.
Splitten über mehrere Pools, wenn sinnvoll.
Oft besserer Preis als einzelner DEX.

**[Slide 3] — Hauptoptionen**
- 1inch (etabliert, Fusion-Mode)
- CoW Swap (Auktion, MEV-Schutz)
- Matcha (klares Interface)
- Paraswap (institutionell)

**[Slide 4] — Swap-Checkliste**
1. Route prüfen
2. Preis-Impact prüfen
3. Slippage setzen
4. MEV-Schutz aktivieren
5. Transaktion simulieren
6. Signatur prüfen
7. Ausführen

**[Slide 5] — Plattform-Wahl nach Größe**
< 100: direkt
100–1k: Aggregator
1k–10k: Aggregator + MEV
> 10k: Aggregator + MEV + Splitting

**[Slide 6] — Gas-Optimierung**
- Layer-2 bevorzugen
- Niedrige Gas-Zeiten
- Komponierte Transaktionen

**[Slide 7] — Professionelle Minimum-Standards**
- Slippage-Kontrolle immer
- MEV-Schutz ab 1k USD
- Signatur verstehen
- 1% schlechter Swap/Woche = ~50% Rendite-Verlust/Jahr

### Sprechertext

**[Slide 1]** Die letzte Lektion dieses Moduls fasst alles zusammen zur Praxis: wie führst du einen Swap professionell aus. Das ist kein Theorie-Thema. Jede Rendite-Strategie wird durch schlechte Swap-Ausführung verwässert.

**[Slide 2]** DEX-Aggregatoren nehmen dir eine wichtige Aufgabe ab: die optimale Route über alle verfügbaren Pools und DEXs zu finden. Sie prüfen Uniswap V2 und V3, Sushiswap, Curve, Balancer und andere. Sie splitten Swaps über mehrere Pools, wenn das den Gesamt-Preis-Impact reduziert. Das Ergebnis ist oft ein besserer Preis als der beste einzelne Pool, besonders bei größeren Beträgen.

**[Slide 3]** Die Hauptoptionen für Endnutzer. 1inch — einer der ältesten, mit Fusion-Modus für MEV-Schutz. CoW Swap — auktions-basiert, MEV-Schutz eingebaut, teilweise intra-Nutzer-Matching für zusätzliche Effizienz. Matcha — klares Interface. Paraswap — eher im institutionellen Bereich. Alle vier sind kostenlos in dem Sinn, dass sie keine explizite Gebühr erheben.

**[Slide 4]** Die Swap-Checkliste. Erstens: Route prüfen — was macht der Aggregator tatsächlich. Zweitens: Preis-Impact prüfen — unter einem Prozent unkritisch, zwischen eins und drei Prozent nachdenken, über drei Prozent splitten. Drittens: Slippage setzen — abhängig von der Liquidität des Paares. Viertens: MEV-Schutz aktivieren. Fünftens: Transaktion simulieren — Rabby zeigt das automatisch. Sechstens: Signatur-Inhalte prüfen, besonders Approval-Beträge. Siebtens: ausführen.

**[Slide 5]** Plattform-Wahl nach Größe. Unter 100 Dollar — direkt auf einer DEX, Gas-Effizienz wichtiger als optimale Route. 100 bis 1000 — Aggregator ohne viel Aufwand. 1000 bis 10.000 — Aggregator mit MEV-Schutz, Slippage konservativ, Route bewusst prüfen. Über 10.000 — Aggregator, MEV-Schutz, und eventuell Splitting in mehrere Transaktionen zu unterschiedlichen Zeiten. Bei wirklich großen Volumen, ab sechsstellig, wird OTC oder Private-Desk sinnvoller als On-Chain-Ausführung.

**[Slide 6]** Gas-Optimierung. Layer-2s bevorzugen, wenn das Asset dort verfügbar ist — Gas-Kosten sind 10 bis 50 Mal niedriger als auf Mainnet. Swaps in Zeiten niedriger Gas-Preise ausführen, etherscan.io/gastracker zeigt den aktuellen Stand. Komponierte Transaktionen nutzen, wenn du mehrere Aktionen planst — ein Aggregator oder ein Zap-Tool kann mehrere Aktionen in einer Transaktion bündeln.

**[Slide 7]** Die Minimum-Standards für professionelle DeFi-Praxis. Nie ohne Slippage-Kontrolle swappen. Bei Beträgen über 1000 Dollar immer MEV-Schutz. Signatur-Inhalte vor jedem Swap verstehen. Route und Preis-Impact bewusst prüfen. Die Mathematik dahinter ist einfach: 1 Prozent schlechter Swap-Preis pro Woche entspricht etwa 50 Prozent Rendite-Verlust pro Jahr durch Compounding. Das ist mehr als die gesamte Ziel-Rendite in diesem Kurs. Saubere Swap-Ausführung ist keine Optimierung — sie ist Voraussetzung.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** **SCREENSHOT SUGGESTION:** 1inch-Interface, das eine gesplittete Route zeigt (z.B. "70% via Uniswap V3, 30% via Curve").

**[Slide 3]** Vier Logo-Karten mit Kurzbeschreibungen.

**[Slide 4]** Sieben-Punkte-Checkliste als vertikale Liste mit Icons.

**[Slide 5]** Entscheidungsbaum nach Swap-Größe.

**[Slide 6]** **SCREENSHOT SUGGESTION:** etherscan.io/gastracker mit aktuellen Gas-Preisen und Empfehlungen.

**[Slide 7]** Rendite-Verlust-Rechnung visualisiert: 1% × 52 Wochen compounding → ~70% kumulativer Verlust.

### Übung

**Aufgabe: Swap-Checklist in der Praxis anwenden**

Führe einen echten Swap aus (kleiner Betrag, z.B. 50 USD). Schritte:

1. Öffne CoW Swap (swap.cow.fi).
2. Verbinde Wallet.
3. Wähle ein Paar (z.B. ETH → USDC).
4. Gib den Betrag ein.
5. **Vor dem Bestätigen:** durchlaufe die 7-Punkte-Checkliste schriftlich:
 - Route: welche DEXs werden genutzt?
 - Preis-Impact: wie hoch?
 - Slippage-Toleranz: welche Einstellung?
 - MEV-Schutz: aktiv?
 - Simulation in Rabby: was zeigt sie?
 - Signatur: was signierst du genau?
 - Alles OK → ausführen
6. Nach der Ausführung: Transaktions-Hash notieren.

**Deliverable:**
- Schriftliche Checklist-Dokumentation mit allen 7 Punkten
- Transaktions-Hash
- Screenshot der CoW-Swap-Bestätigung

### Quiz

**Frage 1:** Ein Aggregator schlägt vor, einen 10.000-USD-Swap zu 60% über Uniswap V3 und 40% über Curve zu routen. Warum könnte das vorteilhaft sein?

<details>
<summary>Antwort anzeigen</summary>

Weil ein Swap von 10.000 USD in einem einzelnen Pool signifikanten Preis-Impact erzeugen würde (besonders wenn der Pool nicht extrem liquide ist). Durch Splitting wird jeder Teil-Swap kleiner, und damit der relative Preis-Impact geringer. Der Summen-Preis ist oft besser als in einem einzelnen Pool. Zusätzlich können verschiedene Pools unterschiedliche Fee-Tiers haben (z.B. Uniswap 0,05% vs. Curve 0,04%), was die Gesamt-Kosten weiter optimiert. Der Trade-off: höhere Gas-Kosten durch mehrere Pool-Interaktionen. Bei großen Swaps überwiegt der Preis-Vorteil aber typisch die zusätzlichen Gas-Kosten.
</details>

**Frage 2:** Jemand führt jede Woche einen 1.000-USD-Swap ohne MEV-Schutz und mit 3% Slippage aus. Warum ist das auf Jahressicht teuer?

<details>
<summary>Antwort anzeigen</summary>

Bei 3% Slippage kann ein Sandwich-Angreifer bis zu 3% des Swap-Wertes extrahieren — das sind bis zu 30 USD pro Swap. Bei 52 Swaps pro Jahr sind das potenziell 1.560 USD. Bei einem typischen DeFi-Portfolio im Bereich 10.000–50.000 USD entspricht das 3–15% Rendite-Verlust nur durch schlechte Swap-Hygiene — mehr als die gesamte Ziel-Rendite eines konservativen Portfolios. Die Lösung ist trivial: MEV-Schutz (kostet nichts zusätzlich) plus engere Slippage (0,5%). Damit reduziert sich der erwartbare Angreifer-Gewinn dramatisch. Das Beispiel zeigt, warum saubere Ausführung keine "Optimierung" ist, sondern Basis-Hygiene.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Slides: Titel → Aggregator-Funktion → 1inch/CoW/Paraswap/Odos → Route-Splitting-Mechanik → Intent-basierte Systeme → Professionelle Swap-Checkliste → Plattform-Wahl-Matrix
- `voice_script.txt` — *Voice Narration Script* (120–140 WPM, Zielvideo 9–11 Min.)
- `visual_plan.json` — Route-Splitting-Diagramm über mehrere Pools, Aggregator-Interface-Screenshot (CoW Swap, 1inch), Pre-Trade-Checkliste als Infografik, Plattform-Wahl-Matrix nach Swap-Größe

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Modul-Abschluss-Quiz

Fünf Fragen zu deinem integrierten Verständnis von Modul 4.

**Frage 1:** Ein Pool hält 2.000 Token A und 8.000.000 Token B. Berechne den Spot-Preis und überlege, wie sich der Preis ändert, wenn jemand 100 Token A gegen B tauscht.

<details>
<summary>Antwort anzeigen</summary>

Spot-Preis von A in B = 8.000.000 / 2.000 = 4.000 B pro A. Nach dem Swap: x' = 2.100, k = 16.000.000.000, y' = 16.000.000.000 / 2.100 ≈ 7.619.048. Der Swapper erhält 8.000.000 − 7.619.048 = 380.952 B. Zum Spot-Preis hätte er 100 × 4.000 = 400.000 B erhalten. Preis-Impact = 19.048 / 400.000 ≈ 4,76%. Der neue Spot-Preis im Pool ist jetzt 7.619.048 / 2.100 ≈ 3.628 B pro A — gefallen, weil A jetzt relativ reichlicher im Pool ist.
</details>

**Frage 2:** Warum ist Uniswap V3 nicht einfach "besser" als Uniswap V2 für alle Nutzer?

<details>
<summary>Antwort anzeigen</summary>

Aus Swapper-Sicht ist V3 meist besser — engere Spreads, weil konzentrierte Liquidität geringeren Preis-Impact erzeugt. Aus LP-Sicht ist V3 komplexer: Bereichsauswahl erfordert Markt-Meinung und Monitoring. Ein passiver LP ohne Überwachung kann in V3 durch Range-Exits deutlich mehr Impermanent Loss erleiden als in V2 ohne ausreichende Gebühren-Kompensation. V3 ist ein Power-Tool, das Expertise erfordert. V2-ähnliche Pools sind robuster für passive Nutzung. Der richtige Pool hängt von Rolle und Engagement des Nutzers ab.
</details>

**Frage 3:** Beschreibe in drei Sätzen, wie ein Sandwich-Angriff funktioniert und wie du dich konkret schützt.

<details>
<summary>Antwort anzeigen</summary>

Ein Sandwich-Bot sieht deine pending Swap-Transaktion im öffentlichen Mempool, schaltet vor dir einen Kauf, der den Preis nach oben treibt, lässt deinen Swap zum schlechteren Preis ausführen und verkauft direkt nach dir zu einem höheren Preis — der Gewinn ist ungefähr dein Slippage-Verlust. Schutz: Nutze einen privaten Mempool (Flashbots Protect, MEV Blocker, CoW Swap), damit die Transaktion nicht im öffentlichen Mempool sichtbar ist. Zusätzlich konservative Slippage-Toleranz setzen — 0,5% bei liquiden Paaren begrenzt den maximalen Angreifer-Gewinn strukturell.
</details>

**Frage 4:** Du willst 50.000 USD von USDC in ETH tauschen. Welche Swap-Strategie ist vernünftig?

<details>
<summary>Antwort anzeigen</summary>

Mehrstufig. Erstens: DEX-Aggregator nutzen (CoW Swap, 1inch Fusion) mit MEV-Schutz. Zweitens: Prüfen, ob Splitting über mehrere Transaktionen über Stunden oder Tage sinnvoll ist — das reduziert Preis-Impact und Marktsignal. Drittens: Slippage konservativ setzen (0,3–0,5% bei ETH/USDC). Viertens: Bei diesem Volumen auch überlegen, ob ein Teil direkt über eine seriöse CEX (Coinbase, Kraken) ausgeführt werden soll — für wirklich große Beträge haben CEXs oft tiefere Liquidität und geringeren Gesamt-Impact. Fünftens: Vor Ausführung alle Punkte der Swap-Checkliste durchgehen. Das Ziel ist, den Swap so unauffällig und preis-effizient wie möglich zu machen.
</details>

**Frage 5:** Warum ist "saubere Swap-Ausführung" für einen konservativen DeFi-Anleger mit ~7–8% Ziel-Rendite besonders wichtig?

<details>
<summary>Antwort anzeigen</summary>

Weil schlechte Ausführung die Rendite direkt frisst, und zwar strukturell. 1% schlechter Swap-Preis pro Monat kostet 12% pro Jahr — mehr als die gesamte Ziel-Rendite. Bei einer konservativen Strategie, die auf 7–8% zielt, ist jede vermeidbare Verschwendung inakzeptabel, weil sie die gesamte Strategie ins Minus drehen kann. Höhere Ziel-Renditen (30%+) können schlechte Ausführung verdauen; 7–8% nicht. Die Rendite muss durch saubere Mechanik geschützt werden: MEV-Schutz, enge Slippage, Aggregator-Routing, Gas-bewusste Ausführung. Diese Disziplin ist die unsichtbare Basis jeder langfristigen Strategie.
</details>

---

## Modul-Zusammenfassung

Du hast in Modul 4 die DEX-Landschaft systematisch kartiert:

**Strukturell:** DEXs arbeiten ohne Order Books, mit Liquidity Pools und formel-basierten Preisen. Custody, Preisbildung und Zugang unterscheiden sich fundamental von CEXs.

**Mechanik V2:** Die Formel x·y=k bestimmt Preise und Swap-Outputs. Preis-Impact wächst überproportional mit Swap-Größe relativ zum Pool.

**Mechanik V3:** Konzentrierte Liquidität ermöglicht höhere Kapital-Effizienz — für aktive LPs. Für passive LPs ist V2 oft robuster.

**Slippage:** Die Differenz zwischen Preis-Impact (deterministisch, vorhersehbar) und Slippage (nicht-deterministisch, durch Ausführungsverzögerung). Konservative Slippage-Toleranz ist der Grundschutz.

**MEV:** Die unsichtbare Steuer. Arbitrage und Liquidationen sind funktional; Sandwich-Angriffe sind Extraktion. Private Mempools sind Pflicht auf Mainnet.

**Aggregatoren:** Die professionelle Ausführungs-Schicht. 1inch, CoW Swap, Matcha — Route-Optimierung, Splitting, integrierter MEV-Schutz.

**Swap-Checkliste:** Route → Preis-Impact → Slippage → MEV-Schutz → Simulation → Signatur → Ausführen.

**Kernbotschaft für konservative Praxis:** Schlechte Swap-Ausführung kann die gesamte Ziel-Rendite auffressen. Saubere Mechanik ist keine Optimierung, sondern Voraussetzung.

**Was in Modul 5 kommt:** Wir drehen die Perspektive. Statt als Swapper gegen den Pool zu handeln, stellst du selbst Liquidität bereit. Wie LP-Positionen funktionieren, was Impermanent Loss mechanisch ist, wie reale LP-Renditen aussehen — und wann LP-Sein überhaupt sinnvoll ist.

---

*Ende von Modul 4.*
