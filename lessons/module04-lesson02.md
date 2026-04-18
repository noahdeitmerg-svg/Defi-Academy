# Die Constant-Product-Formel: Uniswap V2

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die Formel x·y=k erklären und ihre Bedeutung nachvollziehen
- Einen Swap-Preis manuell aus Pool-Beständen berechnen
- Verstehen, warum der Preis bei großen Swaps stark vom "fairen" Preis abweicht
- Die Rolle der 0,3%-Gebühr in Uniswap V2 und deren Verteilung an LPs einordnen
- Den Begriff "Spot Price" aus den aktuellen Pool-Beständen ableiten und den tatsächlichen Ausführungspreis davon abgrenzen
- Die Bedeutung der Pool-Tiefe (Liquidity Depth) für Price Impact quantitativ einschätzen

## Erklärung

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

## Folien-Zusammenfassung

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

## Sprechertext

**[Slide 1]** Uniswap V2 etablierte die Formel, die die gesamte AMM-Industrie prägte: die Constant-Product-Formel. Du musst sie verstehen, um Swap-Preise und Slippage nachvollziehen zu können.

**[Slide 2]** Die Formel ist schlicht: x mal y gleich k. Ein Pool hält zwei Tokens, X und Y, in den Mengen x und y. Das Produkt k muss vor Gebühren bei jedem Swap konstant bleiben. Wenn jemand Token X in den Pool gibt, steigt x. Damit k konstant bleibt, muss y sinken — der Pool gibt Token Y heraus.

**[Slide 3]** Der Spot-Preis ergibt sich aus dem Verhältnis der Pool-Bestände. Preis von X in Y gleich y geteilt durch x. Beispiel: ein Pool mit 1.000 ETH und 3.000.000 USDC hat einen Spot-Preis von 3.000 USDC pro ETH.

**[Slide 4]** Ein konkretes Swap-Beispiel. Du gibst 10 ETH in den Pool. Nachher sind 1.010 ETH im Pool. Damit k konstant bleibt, müssen die USDC von 3.000.000 auf 2.970.297 sinken. Du erhältst die Differenz — 29.703 USDC. Zum fairen Preis hättest du 30.000 erhalten. Die Differenz von 297 ist der Preis-Impact. Dazu kommen noch die Pool-Gebühren.

**[Slide 5]** Die Gebühren. Uniswap V2 erhebt 0,3 Prozent pro Swap. Diese Gebühr wird zum Pool addiert, nicht abgezogen. Das bedeutet, k wächst bei jedem Trade leicht an, und Liquiditätsanbieter profitieren. Das ist der Mechanismus, über den LPs Ertrag erwirtschaften. Details in Modul 5.

**[Slide 6]** Die Kurve. Die Constant-Product-Formel hat eine schöne Eigenschaft: der Pool kann nie vollständig leergehandelt werden. Um alle ETH herauszuziehen, müsste man unendlich viele USDC einzahlen. Das ist ein Schutz gegen Pool-Ausräumung. Die unangenehme Eigenschaft: die Liquidität verteilt sich über den gesamten Preisbereich, aber die meiste liegt in Bereichen, die praktisch nie erreicht werden. Das ist kapital-ineffizient. Uniswap V3 löst dieses Problem teilweise — kommt in Lektion 4.4.

**[Slide 7]** Arbitrage. Der Pool-Preis kann vom externen Marktpreis abweichen. Wenn das passiert, entsteht ein Anreiz: Arbitrageure kaufen, wo der Preis niedriger ist, und verkaufen, wo er höher ist. Diese Arbitrage verschiebt das Pool-Verhältnis zurück zum Marktpreis. Arbitrage ist mechanisch notwendig für funktionierende AMMs — und sie erzeugt Impermanent Loss für Liquiditätsanbieter. Das ist das Haupt-Risiko des LP-Seins, und wir gehen in Modul 5 tief hinein.

## Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Große Formel-Darstellung "x · y = k" auf der Folie. Unten: Pool-Symbol mit zwei Token-Stapeln.

**[Slide 3]** Waage-Metapher: Token X links, Token Y rechts, Verhältnis bestimmt Preis.

**[Slide 4]** Schritt-für-Schritt-Berechnung visualisiert mit Pool-Beständen vor und nach dem Swap.

**[Slide 5]** Diagramm: Swap → 0,3% Gebühr → geht zurück in den Pool (Pfeil).

**[Slide 6]** Die klassische x·y=k-Kurve als Hyperbel. Farbliche Hervorhebung: wo die meiste Liquidität "liegt" vs. wo Swaps tatsächlich passieren.

**[Slide 7]** Diagramm mit externem Markt und Pool. Preisdifferenz. Arbitrageur gleicht aus. **SCREENSHOT SUGGESTION:** Etherscan-Transaktion einer realen Arbitrage zwischen zwei Pools.

## Übung

**Aufgabe: Swap manuell berechnen**

Ein Uniswap-V2-Pool hält 500 ETH und 1.500.000 USDC.

1. Berechne den aktuellen Spot-Preis von ETH.
2. Du willst 5 ETH in USDC tauschen (ignoriere Gebühren zur Vereinfachung). Wie viele USDC bekommst du?
3. Was ist der Preis-Impact in Prozent?
4. Du willst stattdessen 50 ETH tauschen. Wiederhole die Rechnung. Wie hat sich der Preis-Impact geändert?

**Deliverable:** Die vier Zahlen mit Rechenweg. Erkenntnis: Preis-Impact wächst überproportional mit Swap-Größe.

## Quiz

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

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Slides: Titel → x·y=k Visualisierung → Pool-Beispiel → Swap-Preisberechnung → Price-Impact-Effekt bei großen Swaps → 0,3%-Fee-Struktur → V2-Grenzen
- `voice_script.txt` — *Voice Narration Script* (120–140 WPM, Zielvideo 9–11 Min.)
- `visual_plan.json` — x·y=k Hyperbel-Kurve, Pool-Zustand-Diagramm vor/nach Swap, Price-Impact-Kurve über Trade-Größe, Uniswap-V2-Interface-Screenshot

Pipeline: Gamma → ElevenLabs → CapCut.

---
