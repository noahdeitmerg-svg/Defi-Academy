# Die spezifischen Risiken von Loops

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die fünf Haupt-Risiken von Leverage-Loops systematisch benennen
- Historische Loop-Katastrophen als Lehrmaterial analysieren
- Risiko-Schutzmechanismen in die eigene Strategie integrieren
- Ein Loop-Risk-Diagramm zeichnen, das die Abhängigkeiten zwischen LST-Depeg, Zins-Spike, Oracle-Failure, Smart-Contract-Bug und Liquidations-Kaskade darstellt
- Die Risiko-Verstärkung durch Leverage im Vergleich zur ungehebelten Position quantifizieren (z.B. 3x Leverage → 3x Preis-Sensitivität)
- Mitigations-Matrix (Puffer, Monitoring, Diversifikation, Exit-Trigger) für eine konkrete Loop-Position aufsetzen

## Erklärung

Leverage-Loops tragen nicht nur die üblichen DeFi-Risiken in verstärkter Form — sie haben auch eigene, strategie-spezifische Risiken. Diese Lektion systematisiert sie.

**Risiko 1: Peg-Depeg zwischen Collateral und Borrow-Asset**

Das ist das größte Risiko bei Liquid-Staking-Loops. Der Loop setzt voraus, dass das Collateral (wstETH) im Wesentlichen 1:1 zum Borrow-Asset (ETH) handelt. Wenn das Verhältnis bricht — wie Juni 2022 bei -6% Depeg — wird die Position unterbesichert.

**Mechanik:** Der Leverage verstärkt jede Preisbewegung im Collateral-Asset linear. Bei 3x Leverage entspricht eine 6% Depeg einem 18% Drawdown auf das Eigenkapital. Bei hohem LTV (über 85%) kann dieselbe Depeg zusätzlich die Liquidations-Schwelle überschreiten.

**Konkretes Beispiel:** Eigenkapital 10.000 USD, 3x-Leverage → Collateral 30.000 USD wstETH, Schuld 20.000 USD WETH. stETH/ETH fällt um 6%:
- Collateral fällt auf 30.000 × 0,94 = 28.200 USD
- Eigenkapital fällt auf 28.200 − 20.000 = 8.200 USD
- **Drawdown: 1.800 USD = 18% vom Eigenkapital**
- Health Factor fällt von ~1,43 auf ~1,34 — noch keine Liquidation bei 3x

**Bei höherem Leverage oder größerem Depeg wird es gefährlich:**
- 3x-Loop + 10% Depeg → HF 1,18, Drawdown 30%
- 5x-Loop + 6% Depeg → HF 1,02, Liquidation wahrscheinlich + Penalty
- Bei Liquidation: zusätzliche 2-5% Penalty auf liquidiertes Collateral

Für 2x-Loop (Sweet Spot): 6% Depeg = 12% Drawdown, HF 1,78 → sicher. Das ist der Grund, warum konservative Leverage-Begrenzung essenziell ist.

**Mitigation:**
- Leverage begrenzen auf 2-2,5x, wo 6% Depeg nicht zur Liquidation führt
- Diversifikation über mehrere LSTs (wstETH + rETH) — nicht alle depeggen gleichzeitig korreliert
- Alert bei Abweichung > 1% einrichten

**Risiko 2: Zinssatz-Sprünge**

Borrow-Rates in DeFi sind volatil. In Normalsituationen ist ETH-Borrow auf Aave bei 2-3%. In Stress-Szenarien kann er auf 5-10% springen innerhalb von Stunden.

**Was triggert Zinssatz-Sprünge:**
- **Utilization-Spikes** (Modul 6): wenn viele gleichzeitig ETH borgen, wird der Pool ausgelastet, und Zinsen eskalieren über den Kink-Point
- **Massive Leveraged-Staking-Nachfrage** in Bull-Markets
- **Protokoll-spezifische Events** (z.B. Reward-Programme, die Borrowing incentivieren)

**Schaden am Loop:**
Wenn die Borrow-Rate über den Yield springt, wird die Position **negativ Carry** — sie verliert täglich Geld. Der Halter muss entscheiden: deleveragen (kostet Gas und Slippage) oder aussitzen (hoffen, dass Raten wieder fallen).

**Historisches Beispiel:** In bestimmten Phasen 2023 stieg ETH-Borrow auf Aave V3 temporär auf 4-5%, während Staking-Yields bei 3,5-4% lagen. Viele Leveraged-Staking-Positionen verloren über Wochen Geld, bis entweder Raten normalisierten oder deleveraged wurde.

**Mitigation:**
- Yield-Borrow-Spread als primäre Metrik monitoren
- Deleverage-Trigger vorher definieren (z.B. wenn Spread < 0,5%)
- Kapital-Reserve halten, um Deleveraging ohne weitere Borrows zu finanzieren

**Risiko 3: Liquidations-Kaskaden**

Loop-Positionen sind systemisch vernetzt. Wenn viele Loops gleichzeitig in Stress geraten, können sich Liquidationen gegenseitig verstärken.

**Kaskade-Mechanik:**
1. Initial-Event: stETH/ETH fällt um 3%
2. Loops mit 90%+ LTV werden liquidiert — ihr stETH wird verkauft
3. Verkaufs-Druck auf stETH drückt das Ratio weiter auf -4%
4. Loops mit 85%+ LTV werden liquidiert — mehr Verkaufs-Druck
5. -5%, -6%, -7% — Kaskade

Das Ereignis im Juni 2022 war genau so. Die initiale 3AC-Panic führte zu einer sich selbst verstärkenden Liquidations-Welle.

**Mitigation:**
- Deutlich unter systemischem Schwellenwert bleiben (HF 2+)
- In Stress-Phasen präventiv deleveragen, bevor die Kaskade beginnt
- Monitoring der Gesamt-Leverage-Situation (z.B. via DeFiLlama Leverage-Metriken)

**Risiko 4: Smart-Contract-Kaskade**

Ein Loop nutzt mehrere Protokolle: Aave (Lending), Lido (Staking), DEX (für Swaps/Unwrapping), eventuell Zap-Service. Ein Problem auf jedem dieser Layer trifft die gesamte Position.

**Wahrscheinlichkeits-Kombination:**
- Aave-Risiko: sehr niedrig (etabliert, auditiert, Safety Module)
- Lido-Risiko: niedrig (etabliert, aber stETH-spezifische Risiken)
- DEX-Risiko: niedrig (Uniswap, Curve - etabliert)
- Zap-Service-Risiko: moderat (jünger, weniger getestet)

Die Gesamt-Ausfallwahrscheinlichkeit ist die Summe (vereinfacht). Jede zusätzliche Protokoll-Ebene erhöht das aggregierte Risiko.

**Mitigation:**
- Nur etablierte Protokolle in jedem Layer nutzen
- Aave V3 (nicht V2 oder Forks) — meistgetestete Version
- Zap-Services nur bei bewährten Anbietern mit Audits

**Risiko 5: Withdraw-Queue in Krisen**

Nach dem Shanghai-Upgrade können wstETH-Halter direkt ETH zurückziehen. Aber die Queue ist begrenzt.

**Szenario:** Stress-Event führt zu massen-Deleveraging. Viele wollen wstETH zu ETH tauschen. Zwei Wege:
- **DEX-Swap** (Curve/Uniswap): schnell, aber Slippage kann extrem hoch sein
- **Lido Withdrawal**: direkter Umtausch, aber Queue-Zeit 1-7 Tage (in Normalsituationen), bei Stress möglicherweise länger

**Mitigation:**
- Klarheit über Exit-Pfad vor Position-Aufbau
- Kapital-Reserve für Gas-Intensives schnelles Deleveraging
- Nicht die komplette Position zur gleichen Zeit auflösen (staffeln)

**Die Gesamt-Risiko-Bewertung**

Eine 3x wstETH-Loop-Position trägt:
- Normales Ethereum-Staking-Risiko (1x verstärkt)
- Aave-Smart-Contract-Risiko (neu)
- Lido-Smart-Contract-Risiko (neu)
- DEX-Smart-Contract-Risiko (neu)
- wstETH/ETH-Peg-Risiko (verstärkt durch Leverage)
- Zins-Volatilitäts-Risiko (neu, hoch)
- Liquidations-Kaskaden-Risiko (systemisch)
- Withdraw-Queue-Risiko (bei Krise)

**Gegenüber einfachem wstETH-Halten:** 7 zusätzliche Risiko-Ebenen.

**Rendite-Kompensation:** ~2 Prozentpunkte zusätzliche Rendite (3,5% → 5,5%).

**Die Frage ist:** sind 2 Prozentpunkte die 7 zusätzlichen Risiko-Ebenen wert? Das hängt vom individuellen Risiko-Profil ab — für viele konservative Nutzer lautet die Antwort **nein**.

## Folien-Zusammenfassung

**[Slide 1] — Titel**
Die spezifischen Risiken von Loops

**[Slide 2] — Risiko 1: Peg-Depeg**
wstETH/ETH depeggt
Bei 3x Loop: 6% Depeg = 18% Drawdown (1.800 USD bei 10k Einsatz)
Bei 5x Loop + 6% Depeg: Liquidations-Risiko + Penalty
Juni 2022 als historisches Beispiel (0,94 ETH)

**[Slide 3] — Risiko 2: Zinssatz-Sprünge**
Borrow-Rate kann von 2,5% auf 5-10% springen
Loop wird negativ Carry
Verliert täglich Geld

**[Slide 4] — Risiko 3: Liquidations-Kaskaden**
Loops sind systemisch vernetzt
Selbst-verstärkender Verkaufsdruck
Juni 2022 als Fallbeispiel

**[Slide 5] — Risiko 4: Smart-Contract-Kaskade**
Aave + Lido + DEX + evtl. Zap
Jeder Layer addiert Risiko

**[Slide 6] — Risiko 5: Withdraw-Queue**
In Krisen: Queue-Zeit verlängert
DEX-Swap oft mit hohem Slippage

**[Slide 7] — Gesamt-Bilanz**
7 zusätzliche Risiko-Ebenen
+2 Prozentpunkte Rendite
Rechnet sich das individuell?

## Sprechertext

**[Slide 1]** Diese Lektion seziert die spezifischen Risiken von Leverage-Loops. Sie sind nicht nur die üblichen DeFi-Risiken verstärkt — sie haben eigene, strategie-spezifische Schwachstellen.

**[Slide 2]** Risiko 1: Peg-Depeg. Der Loop setzt voraus, dass wstETH etwa 1:1 zu ETH handelt. Wenn das Ratio bricht — Juni 2022 war minus 6 Prozent — verstärkt der Leverage jede Bewegung. Bei 3-fachem Leverage bedeutet eine 6-Prozent-Depeg einen 18-Prozent-Drawdown auf das Eigenkapital. Bei 10.000 US-Dollar Einsatz sind das 1.800 US-Dollar Verlust. Bei höherem Leverage oder größerem Depeg kommt die Liquidation hinzu, mit zusätzlicher Penalty von 2 bis 5 Prozent. Für 5-fachen Leverage bei 6-Prozent-Depeg kann der Gesamt-Verlust bereits 40 Prozent oder mehr betragen.

**[Slide 3]** Risiko 2: Zinssatz-Sprünge. ETH-Borrow-Rate auf Aave ist normal 2 bis 3 Prozent. In Stress-Szenarien kann sie auf 5 bis 10 Prozent springen. Trigger: Utilization-Spikes, massive Leveraged-Staking-Nachfrage, oder Protokoll-Events. Wenn die Borrow-Rate über den Yield springt, wird der Loop negativ Carry — er verliert täglich Geld. Der Halter muss entscheiden: deleveragen oder aussitzen. Beide Optionen sind unangenehm.

**[Slide 4]** Risiko 3: Liquidations-Kaskaden. Loops sind systemisch vernetzt. Wenn viele gleichzeitig in Stress geraten, verstärken sich die Liquidationen. Mechanik: initial fällt stETH um 3 Prozent, 90-Prozent-LTV-Loops liquidieren, das verkaufte stETH drückt den Preis auf minus 4 Prozent, 85-Prozent-Loops liquidieren — Kaskade. Juni 2022 war genau so. Solche Ereignisse sind keine Theorie, sondern historisch real.

**[Slide 5]** Risiko 4: Smart-Contract-Kaskade. Ein Loop nutzt mehrere Protokolle: Aave, Lido, eine DEX für Swaps, eventuell ein Zap-Service. Jede Ebene addiert ein Smart-Contract-Risiko. Die Gesamt-Ausfallwahrscheinlichkeit ist höher als bei einfachem Halten auf einem Protokoll.

**[Slide 6]** Risiko 5: Withdraw-Queue-Risiko in Krisen. Nach Shanghai können wstETH-Halter direkt ETH zurückziehen. Aber die Queue ist begrenzt. In Stress-Szenarien will jeder gleichzeitig raus. Zwei Wege: DEX-Swap mit möglichen extremen Slippages, oder Lido-Withdrawal mit Queue-Zeit von Tagen. Beides in Krisen problematisch.

**[Slide 7]** Die Gesamt-Bilanz. Eine 3-fach wstETH-Loop-Position trägt 7 zusätzliche Risiko-Ebenen gegenüber einfachem wstETH-Halten. Die Rendite-Kompensation ist etwa 2 Prozentpunkte — von 3,5 auf 5,5 Prozent. Die Frage: sind 2 Prozentpunkte die 7 zusätzlichen Risiko-Ebenen wert? Für viele konservative Nutzer lautet die ehrliche Antwort: nein. Für einige, die die Mechaniken vollständig verstehen und aktiv überwachen, kann es Sinn ergeben. Aber das Default sollte skeptisch sein, nicht optimistisch.

## Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** stETH/ETH Chart Juni 2022 mit markierten Liquidations-Wellen.

**[Slide 3]** Historische ETH-Borrow-Rate-Chart mit Spikes.

**[Slide 4]** Kaskaden-Diagramm: Initial-Event → Liquidationen → Verkaufsdruck → Kaskade.

**[Slide 5]** 4-Layer-Stack: Aave + Lido + DEX + Zap, mit Risiko-Addition.

**[Slide 6]** Lido-Withdraw-Queue-Visualisierung in Normalzeit vs. Krise.

**[Slide 7]** Bilanz-Diagramm: 7 Risiko-Ebenen vs. 2 Prozentpunkte.

## Übung

**Aufgabe: Stress-Test deiner eigenen hypothetischen Loop-Position**

Nimm an, du hättest folgenden Loop: 20.000 USD wstETH als Collateral, 13.000 USD WETH-Schuld (entspricht 2,5x Leverage). E-Mode aktiv, LT = 95%.

Analysiere für jedes Szenario:
1. **Szenario A:** stETH/ETH fällt um 3% (wie kleineres Depeg-Event). Was passiert?
2. **Szenario B:** stETH/ETH fällt um 8% (größeres Depeg, wie Juni 2022 worst case). Was passiert?
3. **Szenario C:** ETH-Borrow-Rate springt von 2,5% auf 5%, stETH-Yield bleibt 3,5%. Netto-Rendite?
4. **Szenario D:** Kombination: stETH/ETH -5% und Borrow-Rate +1,5%. Portfolio-Status?
5. **Szenario E:** ETH fällt um 30% gegenüber USD (Bear-Markt). Auswirkung auf USD-Wert?

**Deliverable:** Stress-Test-Tabelle mit allen 5 Szenarien + kurze Schlussfolgerung (5-8 Sätze): Ist diese Loop-Position für dein persönliches Risiko-Profil akzeptabel?

## Quiz

**Frage 1:** Warum ist Peg-Depeg-Risiko bei Loops schlimmer als bei einfachem wstETH-Halten, obwohl das Depeg-Ereignis dasselbe ist?

<details>
<summary>Antwort anzeigen</summary>

Zwei Verstärkungs-Effekte. Erstens: direkte Leverage-Wirkung. Bei einfachem wstETH-Halten und 6% Depeg ist der Verlust 6% des gehaltenen Kapitals. Bei 3x Loop ist der Verlust 3x × 6% = 18% auf das ursprüngliche Kapital — dreimal so groß. Zweitens: Liquidations-Risiko. Bei einfachem Halten gibt es keine Liquidation — wenn stETH um 6% fällt, hält man trotzdem die Position und wartet auf Erholung. Bei Loop mit 80%+ LTV kann eine 6% Depeg die Liquidation triggern, was zusätzliche 2-5% Liquidations-Penalty bringt. Plus: nach Liquidation ist die Position unfreiwillig geschlossen. Du kannst nicht auf Erholung warten. Drittens: Leverage-Abwärtsspirale. Wenn das Depeg weiter läuft und du nicht vorher deleveraged hast, wird die Liquidations-Welle größer. Vierte Dimension: psychologischer Stress. 18% Portfolio-Verlust in Tagen ist emotional deutlich schwieriger zu ertragen als 6%. Das führt oft zu panischen Entscheidungen am Tiefpunkt — Selling-Low und Zusätzliche Verluste durch Timing-Fehler. Zusammengefasst: Loops verstärken nicht nur die direkten Zahlen, sondern auch die Dynamik und den psychologischen Druck in Krisen. Deshalb ist Risiko-Management bei Loops so essentiell.
</details>

**Frage 2:** Warum ist die Regel "bei Yield-Borrow-Spread unter 0,5% deleveragen" strukturell sinnvoll, auch wenn der Loop noch nicht direkt unprofitabel ist?

<details>
<summary>Antwort anzeigen</summary>

Mehrere Gründe. Erstens: Risiko-adjustierte Rendite. Bei 0,5% Spread und 3x Leverage bringt der Loop nur 1% Prozentpunkte über einfachem Halten (3,5% Halten + 1% Leverage-Bonus = 4,5%). Die zusätzlichen Risiken (Smart Contract, Peg, Zins-Spike, Liquidation) rechtfertigen 1% Zusatz-Rendite selten. Das ist schlechtes Risk-Reward-Verhältnis. Zweitens: Schutzpuffer vor Spread-Inversion. Wenn der Spread aktuell 0,5% ist, kann er innerhalb von Wochen auf 0% oder negativ fallen. Deleveraging jetzt kostet moderate Gas; deleveraging in Panik bei negativem Spread kostet mehr (schlechtere Preise durch Verkaufsdruck, höhere Gas-Preise in Stress). Früh agieren ist günstiger. Drittens: signaling. Ein fallender Spread signalisiert oft, dass der Markt in eine neue Phase eintritt. Meist eine Phase höherer Nachfrage nach ETH-Borrowing (Leveraged-Staking-Welle, Bull-Market-Leverage) oder sinkender Staking-Rewards. Beides sind Marktbedingungen, wo Deleveraging proaktiv sinnvoll ist. Viertens: psychologische Disziplin. Klare vordefinierte Regeln verhindern "ich warte noch ein bisschen"-Fallen. Ohne Regeln rationalisiert man gerne weiter — bis die Position tief ins Minus rutscht. Die Regel "0,5% Spread-Trigger" ist eine einfache, klare Entscheidungsregel, die vor Emotionen schützt. Für konservative Strategie-Umsetzung sind solche Regeln essenziell — sie machen den Unterschied zwischen disziplinierter und chaotischer Praxis.
</details>

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → 5 Haupt-Risiken → Loop-Risk-Diagramm → Depeg-Szenarien → Liquidations-Kaskaden → Historische Katastrophen → Mitigations-Matrix
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — Loop-Risk-Dependency-Diagramm, stETH-Depeg-Cascade-Simulation, Liquidations-Kaskaden-Grafik, Historische Events-Timeline, Mitigations-Matrix

Pipeline: Gamma → ElevenLabs → CapCut.

---
