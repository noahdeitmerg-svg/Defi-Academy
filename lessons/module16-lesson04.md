# Vertikale Composability und Stacking

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Vertikale Composability (Stacking) als bewusste Verkettung mehrerer Protokolle erklären und die drei häufigsten Stacking-Muster in DeFi identifizieren
- Das multiplikative Risiko eines Multi-Layer-Stacks mit der Produkt-Wahrscheinlichkeits-Formel berechnen und realistische Gesamt-Ausfallraten ableiten
- Leverage-Loops (speziell stETH/Aave-recursive-Borrowing) mechanisch analysieren und ihre disproportionalen Risiken benennen
- Ein Position-Sizing-Framework anwenden, das Allokation mit Stack-Tiefe koppelt (Single-Layer, Two-Layer, Three-Layer, Four-Plus-Layer)
- Drei konservative Stacking-Regeln als harte Constraints etablieren: 2-3-Layer-Maximum, 2x-Leverage-Ceiling, keine Stacking-Verkettung experimenteller Protokolle
- **Dependency Layer Diagrams** für eine konkrete Stacking-Position erstellen und mit Protocol-Stack-Risk-Scores annotieren (Fix-Doc-Erweiterung)

## Erklärung

Vertikale Composability ist das bewusste Verketten mehrerer DeFi-Protokolle in einer Schichtstruktur, bei der der Output eines Protokolls der Input des nächsten wird. Du nimmst ETH, zahlst es bei Lido ein (Layer 1), bekommst stETH zurück, nutzt stETH als Collateral bei Aave (Layer 2), leihst dir USDC, bringst USDC in einen Curve-Pool (Layer 3), und legst die LP-Tokens bei Convex ab (Layer 4). Jeder Layer addiert Ertrag — und jeder Layer addiert ein neues Smart-Contract-Risiko, ein neues Protokoll-Governance-Risiko, ein neues Ökonomie-Risiko.

Die drei häufigsten Stacking-Muster, die du in DeFi siehst, sind:

**Muster 1: Yield-Stacking auf LSTs.** Die Basis ist ein Liquid Staking Token (stETH, rETH, cbETH). Dieser LST wird als Collateral in einem Lending-Protokoll (Aave, Compound, Morpho) verwendet, um gegen stabile Werte (USDC, DAI) zu leihen. Die geliehenen Werte werden dann entweder in Stablecoin-Yield-Produkte (Curve-Pools mit Convex-Boost, Yearn-Vaults) deployt oder in erneutes LST-Exposure (um den Leverage-Loop zu erzeugen, den wir gleich separat behandeln). Dieses Muster stapelt typischerweise 3–5 Layer und addiert 2–5 Prozentpunkte an Rendite oberhalb der reinen LST-Rendite.

**Muster 2: Stablecoin-LP-Boosting.** Stablecoins werden in einen Curve-Pool eingezahlt (Layer 1), die resultierenden LP-Tokens werden in Convex gestakt (Layer 2), und der Convex-Staking-Reward wird oft weiter deployt (Layer 3, etwa durch Auto-Compounder wie Yearn). Dieses Muster ist die klassische "stablecoin yield with boost"-Strategie und stapelt 2–3 Layer.

**Muster 3: Cross-Protocol Leverage.** Ein Asset (etwa USDC) wird als Collateral in Protokoll A verwendet, um Asset B zu leihen. Asset B wird dann als Collateral in Protokoll C verwendet, um wieder Asset A zu leihen, das wieder zurück in Protokoll A geht. Dies sind die aggressivsten Stacks und stapeln oft 4+ Layer mit gleichzeitigem Leverage.

Die Mathematik des Stackings ist unbequem, aber unausweichlich. Wenn jedes einzelne Protokoll in einem Stack eine jährliche Ausfallwahrscheinlichkeit von 2 % hat (also 98 % Sicherheit), dann ist die aggregate Überlebens-Wahrscheinlichkeit des gesamten Stacks nicht 98 %, sondern das Produkt der Einzelwahrscheinlichkeiten. Bei drei Layern: 0,98 × 0,98 × 0,98 = 0,9412, also 94,12 % Gesamt-Sicherheit — ein Anstieg des aggregate Ausfall-Risikos um den Faktor 2,94 gegenüber dem Einzel-Protokoll. Bei fünf Layern: 0,98⁵ = 0,9039, also 90,39 % Gesamt-Sicherheit, fast Verfünffachung des Risikos. Bei acht Layern: 0,98⁸ = 0,8508.

Hier die vollständige Tabelle für verschiedene Einzel-Protokoll-Sicherheits-Annahmen:

| Einzel-Sicherheit | 2 Layer | 3 Layer | 4 Layer | 5 Layer | 8 Layer |
|---|---|---|---|---|---|
| 99 % | 98,01 % | 97,03 % | 96,06 % | 95,10 % | 92,27 % |
| 98 % | 96,04 % | 94,12 % | 92,24 % | 90,39 % | 85,08 % |
| 95 % | 90,25 % | 85,74 % | 81,45 % | 77,38 % | 66,34 % |
| 90 % | 81,00 % | 72,90 % | 65,61 % | 59,05 % | 43,05 % |

Zwei wichtige Beobachtungen: Erstens, die Spalte "95 %" zeigt dir die realistische Welt. Kaum ein DeFi-Protokoll — selbst etablierte wie Aave oder Uniswap — kann ehrlich eine 99 %ige Jahres-Ausfall-Sicherheit beanspruchen. Die realistischere Annahme für etablierte Protokolle liegt bei 97–98 %, für jüngere oder weniger geprüfte Protokolle bei 90–95 %. Zweitens, der Effekt verschärft sich nicht-linear. Von 3 auf 4 Layer bei 95 % Einzel-Sicherheit verlierst du etwa 4 Prozentpunkte Gesamt-Sicherheit. Von 7 auf 8 Layer verlierst du zwar auch nur etwa 3 Prozentpunkte — aber du bist bereits bei 66 % angelangt, also 34 % kumuliertem Risiko.

**Leverage-Loops** sind die spezielle und besonders gefährliche Form vertikaler Composability. Ein Leverage-Loop auf stETH/ETH funktioniert mechanisch so: Du startest mit 1 ETH, wandelst es in 1 stETH um (Layer 1: Lido). Du zahlst stETH als Collateral bei Aave ein (Layer 2), und weil stETH bei Aave typischerweise einen LTV von 75–80 % erlaubt, leihst du dir bis zu 0,75 ETH. Diese 0,75 ETH wandelst du wieder in 0,75 stETH um, zahlst es erneut bei Aave ein, leihst dir daraus 0,56 ETH, wandelst es um, und so weiter. Mit vier Iterationen hast du 1 + 0,75 + 0,56 + 0,42 + 0,32 = 3,05 stETH-Exposure gegen dein ursprüngliches 1 ETH Kapital — also etwa 3x Leverage.

Die Rendite-Mathematik sieht auf den ersten Blick attraktiv aus. Wenn stETH 3,5 % jährlich verdient und du zu 2,8 % leihen kannst, dann verdient jeder geliehene ETH eine Spread von 0,7 %. Auf der 3x-Leverage-Position bekommst du etwa: 3,5 % auf 3,05 stETH minus 2,8 % auf 2,05 ETH geliehen = 10,68 % minus 5,74 % = 4,94 % auf dein 1 ETH Kapital. Das sind 1,4 Prozentpunkte mehr als die 3,5 % vom reinen stETH-Staking.

Die Risiko-Seite ist gravierender als die Rendite-Seite es vermuten lässt. Erstens, jeder Loop addiert das Aave-Smart-Contract-Risiko erneut — wenn Aave ausfällt, ist nicht nur dein initiales Collateral betroffen, sondern die gesamte Loop-Struktur kollabiert gleichzeitig. Zweitens, du hast ein Liquidations-Risiko, das bei reinem stETH-Staking nicht existiert. Wenn stETH vom ETH-Peg abweicht (was im Juni 2022 passierte, als stETH bis auf 0,94 ETH fiel), verlierst du Collateral-Wert gegen eine ETH-Debt-Position, die in absoluten Termen gleich bleibt. Drittens, die Liquidations-Penalty bei Aave für stETH/ETH beträgt typischerweise 5–7,5 % — falls es zu einer Liquidation kommt, wird dieser Betrag zusätzlich von deinem Collateral abgezogen.

Konkretes Szenario: Du hast einen 3x-Leverage-Loop auf stETH/ETH gebaut. Dein Gesundheits-Faktor bei Aave liegt bei 1,25. Ein stETH/ETH-Depeg auf 0,95 (5 % Diskont) reicht aus, um deinen Health Factor unter 1,0 zu drücken und eine Liquidation zu triggern. In der 2022er Depeg-Krise erreichte stETH zeitweise 0,94 — ein Leverage-Loop mit 1,25 Health Factor wäre vollständig liquidiert worden. Die Rendite-Optimierung der letzten 18 Monate wäre in einer Stunde verloren gegangen.

**Position-Sizing nach Stack-Tiefe** ist der disziplinierte Ansatz, um mit diesen Risiken umzugehen. Die Grundidee: Je tiefer der Stack, desto kleiner die Position als Prozentsatz des Gesamt-Portfolios. Hier ein konservatives Allokations-Framework:

- **Single-Layer-Position** (ein Protokoll, keine Verkettung): bis zu 15–25 % des DeFi-Portfolios pro Protokoll, abhängig von Protokoll-Reife.
- **Two-Layer-Stack** (z. B. stETH → Aave als Collateral, kein Borrow-Einsatz): bis zu 10–15 % des DeFi-Portfolios.
- **Three-Layer-Stack** (z. B. stETH → Aave → Borrow → Curve): bis zu 5–10 % des DeFi-Portfolios.
- **Four-plus-Layer-Stack**: maximal 2–5 % des DeFi-Portfolios, und nur wenn jeder einzelne Layer zu den etabliertesten gehört.
- **Leverage-Loops**: grundsätzlich in die gleiche Kategorie wie Four-plus-Layer, also maximal 2–5 %, und bei stETH/ETH spezifisch mit Health Factor mindestens 1,8 (nicht die typischen 1,3–1,5, die in vielen Guides empfohlen werden).

Diese Schwellwerte sind bewusst konservativ. Sie nehmen hin, dass ein Portfolio langsamer wächst als ein aggressiv optimiertes — im Austausch für die Eigenschaft, dass kein einzelnes Composability-Event mehr als 5 % des Portfolios vernichten kann.

**Die drei konservativen Stacking-Regeln**, die aus dieser Analyse folgen und die du als harte Constraints behandeln solltest:

**Regel 1: Maximal 2–3 Layer.** Die Rendite-Differenz zwischen einem 3-Layer-Stack und einem 5-Layer-Stack beträgt typischerweise 1–3 Prozentpunkte jährlich. Der Unterschied in der Überlebens-Wahrscheinlichkeit (bei 95 % Einzel-Sicherheit) beträgt etwa 8 Prozentpunkte. Du tauschst also 1–3 Prozentpunkte Rendite gegen 8 Prozentpunkte zusätzliches Ausfall-Risiko — ein Tausch, der sich mathematisch nicht rechnet. Über einen Zeithorizont von mehreren Jahren wirst du mit 2–3 Layern ein höheres Endvermögen haben als mit 5+ Layern, weil die Ausfall-Events deine Compound-Rendite zerstören.

**Regel 2: Maximal 2x Leverage, und nur auf stabilen Peg-Paaren.** Ein 2x-Leverage-Loop auf stETH/ETH hat deutlich weniger Liquidations-Risiko als ein 3x- oder 4x-Loop, weil der Abstand zum Liquidations-Preis größer ist. Bei 2x Leverage und 1,8 Health Factor müsste stETH gegenüber ETH um etwa 20 % fallen, bevor Liquidation eintritt — ein Szenario, das selbst in der 2022er Depeg-Krise nicht erreicht wurde. Bei 3x Leverage und 1,25 Health Factor reichen 5 % Peg-Abweichung. Der Rendite-Unterschied zwischen 2x und 3x bei stETH-Loops beträgt typischerweise 0,5–1,5 Prozentpunkte — also kein strategischer Vorteil, der das zusätzliche Risiko rechtfertigt.

**Regel 3: Kein Stacking von experimentellen Protokollen.** Ein Stack ist nur so sicher wie sein schwächster Layer. Wenn du stETH → Aave verwendest (beide etabliert, mehrjähriger Track Record, milliardenschwere TVLs), hast du eine Baseline-Sicherheit. Wenn du stETH → Aave → [neuer Yield-Aggregator mit 3 Monaten Track Record] stacks, dann ist dein effektives Risiko nicht mehr das von stETH oder Aave — es ist das des neuen Aggregators. Die Regel lautet: Jeder Layer in einem Stack muss mindestens 18 Monate Track Record, mindestens zwei vollständige Audits und mindestens 500 Mio. USD TVL haben. Wenn du einen neueren Yield-Aggregator verwenden möchtest, tu das als eigenständige Position, nicht als Teil eines Stacks, und beschränke die Allokation entsprechend.

Abschließend: Vertikale Composability ist eine der mächtigsten Eigenschaften von DeFi — sie erlaubt Rendite-Strukturen, die in traditioneller Finanz praktisch unmöglich sind. Aber ihre Macht ist zweischneidig. Die gleichen Eigenschaften, die Rendite-Stapeln ermöglichen, multiplizieren auch das Ausfall-Risiko. Die meisten Retail-Teilnehmer sind in den letzten Jahren nicht an einzelnen Protokoll-Ausfällen gescheitert, sondern an den Interaktionseffekten komplexer Stacks, die sie nicht vollständig verstanden haben. Die drei Stacking-Regeln oben sind konservativ, und sie werden dich Rendite kosten. Sie werden dich auch mit hoher Wahrscheinlichkeit davor bewahren, dein Portfolio durch ein einzelnes Event zu verlieren.

## Folien-Zusammenfassung

**Slide 1: Was ist vertikale Composability?**
- Bewusstes Verketten mehrerer Protokolle, wobei Output eines Layers = Input des nächsten
- Beispiel: ETH → Lido (stETH) → Aave (Collateral) → Borrow USDC → Curve LP → Convex
- Jeder Layer addiert Rendite UND neues Risiko
- Drei Haupt-Muster: Yield-Stacking auf LSTs, Stablecoin-LP-Boosting, Cross-Protocol Leverage

**Slide 2: Die Multiplikations-Mathematik**
- Risiken multiplizieren sich, Sicherheiten multiplizieren sich auch (aber "nach unten")
- Bei 95 % Einzel-Sicherheit: 3 Layer = 85,74 %, 5 Layer = 77,38 %, 8 Layer = 66,34 %
- Realistische DeFi-Einzel-Sicherheit: 95–98 % für etablierte, 90–95 % für jüngere Protokolle
- Der Effekt ist nicht-linear: jedes zusätzliche Layer addiert proportional mehr Risiko

**Slide 3: Leverage-Loops — die gefährlichste Stack-Form**
- stETH/Aave-Loop: jeder Loop multipliziert Exposure, addiert Liquidations-Risiko
- 3x Leverage auf stETH/ETH: bei 1,25 Health Factor reichen 5 % Depeg für Liquidation
- 2022 stETH-Depeg erreichte 0,94 ETH — aggressive Loops komplett liquidiert
- Rendite-Aufschlag 3x vs. reines Staking: typisch 1,4 Prozentpunkte; Risiko-Aufschlag: gewaltig

**Slide 4: Position-Sizing nach Stack-Tiefe**
- Single-Layer: bis 15–25 % pro Protokoll
- Two-Layer: bis 10–15 %
- Three-Layer: bis 5–10 %
- Four+ Layer oder Leverage-Loop: max 2–5 %
- Diese Schwellwerte sind bewusst konservativ — Ziel: kein Event vernichtet >5 % des Portfolios

**Slide 5: Die drei Stacking-Regeln**
- Regel 1: Maximal 2–3 Layer; Rendite-Aufschlag oberhalb rechtfertigt Risiko nicht
- Regel 2: Maximal 2x Leverage; nur auf stabilen Peg-Paaren; Health Factor mindestens 1,8
- Regel 3: Kein Stacking experimenteller Protokolle (jeder Layer mindestens 18 Monate Track Record, 2 Audits, 500 Mio. USD TVL)
- Konservativität kostet Rendite — kostet aber auch nicht das gesamte Portfolio

## Sprechertext

Vertikale Composability — oder einfacher gesagt: Stacking — ist die mächtigste und gleichzeitig gefährlichste Eigenschaft von DeFi. Sie erlaubt dir, mehrere Protokolle übereinanderzuschichten und dabei Rendite zu addieren, die in traditioneller Finanz praktisch unmöglich ist. Sie macht aber auch etwas Zweites, das weniger offensichtlich ist: Sie multipliziert Risiken. In dieser Lektion schauen wir uns genau an, wie diese Multiplikation funktioniert, warum Leverage-Loops eine besondere Aufmerksamkeit brauchen, und wie du Position-Sizing mit Stack-Tiefe koppelst.

Beginnen wir mit dem Bild. Stell dir vor, du startest mit einem ETH. Du zahlst es bei Lido ein und bekommst stETH zurück. Das ist Layer 1. Du nimmst dieses stETH und zahlst es als Collateral bei Aave ein. Das ist Layer 2. Du leihst dir gegen dieses Collateral USDC und bringst das USDC in einen Curve-Pool. Das ist Layer 3. Die resultierenden LP-Tokens legst du bei Convex ab. Das ist Layer 4. Du hast einen vier-Layer-Stack gebaut. Jeder Layer addiert ein bisschen Rendite. Jeder Layer addiert auch ein neues Protokoll, dessen Smart Contracts funktionieren müssen, dessen Governance nichts Katastrophales tut, dessen ökonomisches Design gesund bleibt. Und jetzt kommt die mathematische Beobachtung, die unbequem ist, aber unausweichlich.

Nehmen wir an, jedes dieser vier Protokolle hat eine jährliche Ausfall-Wahrscheinlichkeit von 5 Prozent. Das heißt, jedes Protokoll hat eine 95-prozentige Überlebens-Wahrscheinlichkeit pro Jahr. Was ist die Überlebens-Wahrscheinlichkeit des gesamten Stacks? Nicht 95 Prozent. Sondern 95 Prozent hoch vier, also 0,95 mal 0,95 mal 0,95 mal 0,95 — das ergibt etwa 81,5 Prozent. Dein aggregate Ausfall-Risiko ist also nicht 5 Prozent, sondern 18,5 Prozent. Fast vierfach erhöht gegenüber dem Einzel-Protokoll. Bei fünf Layern steigt das Risiko auf 22,6 Prozent, bei acht Layern auf 34 Prozent. Die Rendite, die du durch das zusätzliche Stacking gewinnst, wächst linear — meist ein oder zwei Prozentpunkte pro Layer. Das Risiko wächst nicht-linear und schneller. Das ist die Grundgleichung, auf der alle Stacking-Entscheidungen basieren sollten.

Jetzt zu Leverage-Loops, der gefährlichsten Form vertikaler Composability. Ein Leverage-Loop auf stETH und ETH funktioniert so: Du startest mit 1 ETH, wandelst es in 1 stETH, zahlst es als Collateral bei Aave ein. Aave erlaubt bei stETH einen LTV von 75 Prozent. Du leihst dir 0,75 ETH. Diese 0,75 ETH wandelst du wieder in stETH, zahlst es erneut als Collateral ein, leihst dir 0,56 ETH. Und so weiter. Nach vier Iterationen hast du etwa 3 stETH-Exposure gegen dein ursprüngliches 1 ETH Kapital. Das ist 3x Leverage. Die Rendite sieht gut aus — etwa 1,4 Prozentpunkte mehr als reines stETH-Staking. Aber jetzt stell dir vor, was im Juni 2022 passierte. stETH fiel gegenüber ETH auf 0,94. Ein 5-Prozent-Depeg. Bei einem 3x-Leverage-Loop mit Health Factor 1,25 reichen 5 Prozent Depeg, um dich in Liquidation zu bringen. Du verlierst dein Collateral plus eine Liquidations-Penalty von 5 bis 7,5 Prozent. 18 Monate Rendite-Optimierung in einer Stunde vernichtet.

Die Lehre aus dieser Analyse ist die Position-Sizing-Matrix. Je tiefer der Stack, desto kleiner der Anteil am Gesamt-Portfolio. Ein einzelnes Protokoll kann 15 bis 25 Prozent deiner DeFi-Allokation tragen. Ein Zwei-Layer-Stack kann 10 bis 15 Prozent tragen. Ein Drei-Layer-Stack 5 bis 10 Prozent. Ab vier Layern oder bei einem Leverage-Loop maximal 2 bis 5 Prozent. Diese Schwellwerte sind bewusst konservativ. Sie nehmen hin, dass dein Portfolio langsamer wächst als eines, das aggressiv in jeden Stack prozentual mehr legt. Im Austausch bekommst du die Eigenschaft, dass kein einzelnes Composability-Event mehr als 5 Prozent deines Portfolios vernichten kann. Das ist der Tausch, den konservative Investoren in DeFi machen — und es ist der Tausch, den du machen solltest.

Drei Regeln schließen diese Lektion ab. Erstens: Maximal 2 bis 3 Layer. Die Rendite-Differenz zwischen 3 und 5 Layern ist klein. Die Risiko-Differenz ist groß. Zweitens: Maximal 2x Leverage, und nur auf stabilen Peg-Paaren wie stETH und ETH, und mit einem Health Factor von mindestens 1,8. Nicht 1,3. Nicht 1,5. Mindestens 1,8. Drittens: Kein Stacking experimenteller Protokolle. Jeder Layer in einem Stack muss etabliert sein — mindestens 18 Monate Track Record, mindestens zwei Audits, mindestens 500 Millionen USD TVL. Wenn du ein experimentelles Protokoll ausprobieren willst, tu das in einer eigenständigen Position, nicht als Teil eines Stacks. Diese drei Regeln werden dich Rendite kosten. Sie werden dich auch mit hoher Wahrscheinlichkeit davor bewahren, durch ein einzelnes Event ausgelöscht zu werden. Das ist der fundamentale Tausch in DeFi, und du solltest ihn bewusst machen.

## Visuelle Vorschläge

**Visual 1: Der vier-Layer-Stack als Diagramm**
Vertikales Diagramm mit vier aufeinanderfolgenden Boxen: ETH → Lido (stETH) → Aave (Collateral + Borrow USDC) → Curve (USDC-LP) → Convex (LP-Stake). Rechts neben jedem Pfeil die addierte Rendite (+ 3,5 %, + 0,5 %, + 2,2 %, + 1,8 %). Rechts unten: "Total Yield: ~8,0 %". Links neben jedem Layer das Risiko-Icon: Smart-Contract-Icon + Peg-Risiko-Icon bei stETH, Liquidations-Icon bei Aave, Pool-Depeg-Icon bei Curve, Governance-Icon bei Convex.

**Visual 2: Die Multiplikations-Tabelle**
Heatmap-Style-Tabelle. Y-Achse: Einzel-Protokoll-Sicherheit (99 %, 98 %, 95 %, 90 %). X-Achse: Anzahl Layer (1, 2, 3, 4, 5, 8). Zellen: Aggregate Überlebens-Wahrscheinlichkeit, eingefärbt von Grün (>95 %) über Gelb (80–95 %) zu Rot (<80 %). Die "95 %"-Zeile deutlich hervorgehoben mit Label: "Realistische DeFi-Welt".

**Visual 3: Der Leverage-Loop-Mechanismus**
Flussdiagramm des stETH-Loops. Ausgangspunkt: 1 ETH. Erste Iteration: → 1 stETH → Aave-Deposit → 0,75 ETH geliehen. Zweite Iteration: 0,75 ETH → 0,75 stETH → Aave-Deposit → 0,56 ETH geliehen. Dritte und vierte Iteration analog. Rechts neben dem Diagramm: Gesamt-stETH-Exposure 3,05, Gesamt-Debt 2,05 ETH, effektiver Leverage 3x. Unterhalb des Diagramms: Depeg-Szenario-Balken zeigen, bei welchem stETH/ETH-Preis (1,00 / 0,95 / 0,90 / 0,85) die Liquidation eintritt, je nach Health Factor (1,25 / 1,5 / 1,8).

**Visual 4: Position-Sizing-Matrix**
Horizontale Balkengrafik. Y-Achse: Stack-Tiefe (Single-Layer, Two-Layer, Three-Layer, Four+ Layer, Leverage-Loop). X-Achse: Maximaler Prozent-Anteil am DeFi-Portfolio (0 % bis 25 %). Balken zeigen den empfohlenen Range (z. B. Single-Layer: 15–25 %, Four+ Layer: 2–5 %). Farb-Gradient von Grün (tolerierbar) bei Single-Layer zu Rot (hohes Risiko) bei Leverage-Loop.

**Visual 5: Die drei Stacking-Regeln als Checkbox-Karte**
Drei vertikal angeordnete Karten mit jeweils einer Regel als Headline, einer konkreten Zahl als Key-Metric, und einer Ein-Satz-Begründung.
- Karte 1: "Max 2–3 Layer" / "Rendite-Aufschlag >3 Layer: ~1–3 %; Risiko-Aufschlag: ~8 %" / "Der Tausch rechnet sich mathematisch nicht."
- Karte 2: "Max 2x Leverage" / "Health Factor ≥ 1,8" / "Nur auf stabilen Peg-Paaren."
- Karte 3: "Keine experimentellen Protokolle im Stack" / "18 Monate Track Record, 2 Audits, 500 Mio USD TVL" / "Ein Stack ist nur so sicher wie sein schwächster Layer."

## Übung

**Aufgabe: Composability-Risiko-Audit deines aktuellen (oder geplanten) Portfolios**

Dieser Übung hat zwei Teile. Teil 1 ist das Mapping deines aktuellen Portfolios, Teil 2 ist die Anwendung der Stacking-Regeln.

**Teil 1: Stack-Mapping**

Liste jede deiner aktuellen (oder für diese Übung: geplanten) DeFi-Positionen mit folgenden Informationen auf. Wenn du aktuell keine DeFi-Positionen hast, konstruiere ein hypothetisches Portfolio von drei bis fünf Positionen, das realistisch für einen Einsteiger mit 10.000 USD wäre.

Für jede Position:
1. Namen der Position (z. B. "stETH-Aave-USDC-Loop" oder "USDC-Curve-Convex-Yield")
2. Größe in USD und als Prozentsatz des Gesamt-DeFi-Portfolios
3. Liste aller involvierten Protokolle in der richtigen Reihenfolge (Layer 1, Layer 2, Layer 3, …)
4. Anzahl Layer insgesamt
5. Ob Leverage involviert ist, und falls ja, welcher Faktor und welcher Health Factor (falls Lending-basiert)

**Teil 2: Regel-Compliance-Check**

Für jede Position beantworte die drei Regel-Fragen:

**Regel-1-Check (Max 2–3 Layer):**
- Wie viele Layer hat die Position?
- Falls > 3: Ist die Position-Größe unter 5 % des DeFi-Portfolios? Falls nicht, was ist deine Rechtfertigung für die höhere Allokation?

**Regel-2-Check (Max 2x Leverage):**
- Falls Leverage involviert: Ist der Faktor ≤ 2x?
- Falls Lending-basiert: Ist der Health Factor ≥ 1,8?
- Falls nein für eine dieser Bedingungen: Was ist dein konkreter Schutz-Mechanismus gegen Liquidation (z. B. Automated Deleveraging-Bot, aktives Monitoring mit Alerts)?

**Regel-3-Check (Keine experimentellen Protokolle):**
- Liste für jeden Layer die folgenden drei Metriken: Jahre seit Launch (mindestens 1,5?), Anzahl Audits (mindestens 2?), aktueller TVL (mindestens 500 Mio USD?).
- Falls ein Layer eine dieser Bedingungen nicht erfüllt: Ist die Gesamt-Position-Größe unter 5 % des Portfolios? Falls nicht, was ist deine Rechtfertigung?

**Teil 3: Konkrete Anpassungs-Entscheidungen**

Nach dem Audit, erstelle eine Liste aller Positionen, die eine oder mehrere Regeln verletzen. Für jede dieser Positionen formuliere eine konkrete Anpassungs-Entscheidung — zum Beispiel:
- "stETH-Aave-Curve-Convex-Stack (7 % des Portfolios, 4 Layer): Reduziere Allokation auf 3 %, indem ich 4 Prozentpunkte aus Convex abziehe und stattdessen als reines stETH halte."
- "stETH-Loop (3x, Health Factor 1,4): Deleverage auf 2x und erhöhe Health Factor auf 1,8 durch Rückzahlung von Debt."
- "Neuer Yield-Aggregator XYZ (6 Monate alt, 1 Audit, 80 Mio TVL): Reduziere auf 2 % des Portfolios, oder exitiere vollständig bis zur Erfüllung der Kriterien."

**Zeitinvestition**: 45 Minuten bis 1,5 Stunden, abhängig von der Anzahl Positionen.

**Ziel**: Am Ende solltest du eine konkrete To-Do-Liste haben, die du in den folgenden 1–2 Wochen umsetzt. Dies ist keine theoretische Übung — das Ziel ist eine tatsächliche Portfolio-Anpassung. Falls du aktuell keine DeFi-Positionen hast, hast du eine Blueprint für die Aufbauphase deines Portfolios.

## Quiz

**Frage 1:** Du betreibst einen 3x-Leverage-Loop auf stETH/ETH über Aave mit einem Health Factor von 1,25. Dein Freund argumentiert: "Bei 95 % Einzel-Sicherheit für Aave ist das Risiko vertretbar — das ist fast so sicher wie stETH selbst." Warum ist dieser Gedanke mathematisch und strukturell falsch? Welche zwei Haupt-Risiken sind in der "95 %-Sicherheit"-Annahme nicht enthalten, und was passiert konkret, wenn stETH zum Beispiel auf 0,95 ETH fällt?

<details><summary>Antwort anzeigen</summary>

Die "95 %-Sicherheit"-Annahme erfasst typischerweise nur das Smart-Contract-Ausfall-Risiko von Aave. Sie erfasst NICHT zwei andere Risiko-Klassen, die in einem Leverage-Loop dominant werden:

**Risiko 1: Liquidations-Risiko durch Peg-Abweichung.** Der Leverage-Loop ist abhängig vom stabilen Peg zwischen stETH und ETH. Wenn stETH auf 0,95 ETH fällt (5 % Depeg), ändert sich die Collateral-Wert-zu-Debt-Ratio drastisch. Bei 3x Leverage und Health Factor 1,25 reicht dieser 5 %-Depeg aus, um den Health Factor unter 1,0 zu drücken und eine Liquidation auszulösen. Konkret: Deine 3,05 stETH sind jetzt 3,05 × 0,95 = 2,90 ETH wert; deine Debt bleibt bei 2,05 ETH. Die Equity ist von 1,0 ETH auf 0,85 ETH gefallen. Bei der Aave-Liquidation wird zusätzlich eine Liquidations-Penalty von 5–7,5 % auf den liquidierten Anteil abgezogen. Je nach Aave-Parametern verlierst du 15–25 % deines initialen Kapitals sofort — nicht durch ein Aave-Smart-Contract-Problem, sondern durch einen stETH-Peg-Shift, den die "95 %"-Annahme nicht abdeckt.

**Risiko 2: Lido-Smart-Contract und Staking-Risiko.** Der Loop involviert NICHT nur Aave, sondern auch Lido. Wenn bei Lido etwas passiert — ein Slashing-Event bei großem Teil der Validator-Set, ein Smart-Contract-Bug im Withdrawal-Mechanismus, ein Governance-Angriff — dann leidet stETH eigenständig, unabhängig von Aave. Die aggregate Risiko-Berechnung müsste also mindestens Aave-Sicherheit × Lido-Sicherheit sein: 0,95 × 0,98 = 0,931, also 93,1 % — und das ignoriert noch das Peg-Risiko als separaten Faktor.

**Was konkret bei stETH = 0,95 ETH passiert:**

Bei Health Factor 1,25 triggert dieser Depeg eine vollständige oder teilweise Liquidation. In einer teilweisen Liquidation liquidiert Aave bis zu 50 % der Debt-Position auf einmal (dieser Anteil variiert mit Protokoll-Parametern). Das heißt: Etwa 1,02 ETH Debt werden zurückgezahlt durch Verkauf von Collateral zum aktuellen Kurs plus Liquidations-Penalty. Konkret bei 5 % Liquidations-Penalty: 1,02 ETH × 1,05 = 1,07 ETH Collateral werden verkauft. Das heißt, 1,07/0,95 = 1,13 stETH werden aus deinem Collateral entfernt. Nach Liquidation: Collateral ~1,92 stETH (statt 3,05), Debt ~1,03 ETH (statt 2,05), Equity ~1,92 × 0,95 − 1,03 = 0,79 ETH. Du bist von 1,0 ETH Equity auf 0,79 ETH Equity gefallen — 21 % Verlust durch einen 5 %-Peg-Shift.

Die Meta-Lehre: Die "95 %-Sicherheit"-Zahl ist nur ein einzelner Faktor in einer komplexen Risiko-Gleichung. Leverage-Loops machen Risiken dominant, die im Einzel-Protokoll-Setup vernachlässigbar waren — insbesondere Peg-Stabilitäts-Risiken und Liquidations-Mechanik-Risiken. Die konservative Regel (max 2x Leverage, Health Factor ≥ 1,8) existiert, um einen Puffer gegen genau diese Szenarien zu schaffen.

</details>

**Frage 2:** Du erwägst eine Position in einer neuen Yield-Strategie: USDC → EtherFi (weETH Liquid Restaking, 8 Monate alt, 1 Audit, 1,2 Mrd USD TVL) → Aave V3 als Collateral → Borrow USDC → Pendle Fixed Yield (Pendle: 2 Jahre alt, 3 Audits, 800 Mio TVL). Das sind 4 Layer. Wende die drei Stacking-Regeln an. Welche werden verletzt, welche erfüllt? Was ist deine begründete Entscheidung zu dieser Position, und welche konkrete Allokations-Empfehlung leitest du ab?

<details><summary>Antwort anzeigen</summary>

**Regel-1-Check (Max 2–3 Layer):**

Die Position hat 4 Layer (EtherFi → Aave → USDC-Borrow → Pendle). Regel 1 wird VERLETZT. Nach der Regel dürfte eine 4-Layer-Position maximal 5 % des DeFi-Portfolios ausmachen.

**Regel-2-Check (Max 2x Leverage):**

Die Struktur beinhaltet eine Borrow-Position bei Aave, ist aber kein Leverage-Loop im engeren Sinne — das geliehene USDC wird NICHT in weiteres weETH-Exposure umgewandelt, sondern in eine andere Strategie (Pendle) deployt. Das effektive Leverage auf dem weETH-Exposure bleibt 1x. Regel 2 ist in ihrer engen Definition NICHT verletzt. Aber: Die Position hat eine Lending-Komponente, und hier sollte der Health Factor bei ≥ 1,8 liegen. Dies muss in der konkreten Umsetzung geprüft werden.

**Regel-3-Check (Keine experimentellen Protokolle):**

Dies ist der entscheidende Check. Die Kriterien: 18 Monate Track Record, mindestens 2 Audits, mindestens 500 Mio USD TVL.

- **Aave V3**: >2 Jahre seit Launch ✓, mehrere Audits ✓, >8 Mrd USD TVL ✓. Erfüllt alle Kriterien.
- **Pendle**: 2 Jahre ✓, 3 Audits ✓, 800 Mio TVL ✓. Erfüllt alle Kriterien.
- **EtherFi (weETH)**: 8 Monate ❌ (kürzer als 18 Monate), 1 Audit ❌ (mindestens 2 gefordert), 1,2 Mrd TVL ✓. Zwei von drei Kriterien NICHT erfüllt.

Regel 3 wird VERLETZT durch den EtherFi-Layer.

**Integrierte Entscheidung:**

Die Position verletzt zwei von drei Regeln (Regel 1 und Regel 3). Eine konservative Anwendung des Frameworks würde zu einer von zwei möglichen Anpassungen führen:

**Option A: Position ablehnen.** Die Kombination aus 4-Layer-Struktur und einem experimentellen Layer (EtherFi) macht die Gesamt-Position zu einer "alles-oder-nichts"-Wette. Wenn EtherFi aufgrund seines jungen Track Records und einzelnen Audits einen kritischen Bug hat, kollabiert die gesamte Kette — inklusive der Aave- und Pendle-Layer, die eigenständig sicher gewesen wären. Der Rendite-Aufschlag, den weETH durch EigenLayer-Restaking bietet, mag attraktiv sein, aber der strukturelle Risiko-Multiplikator macht ihn nicht wert.

**Option B: Position radikal vereinfachen und verkleinern.** Falls du das Exposure unbedingt willst:
1. Eliminiere Layer — tätige entweder EtherFi allein (Single-Layer, ohne Aave und Pendle) ODER Aave+Pendle mit etablierten Assets als Collateral (z. B. stETH statt weETH).
2. Falls du trotzdem alle 4 Layer behältst, begrenze die Allokation auf maximal 2–3 % des DeFi-Portfolios (die konservativste Interpretation von Regel 1 bei mehr als 3 Layern plus einem experimentellen Layer).

**Konkrete Empfehlung:**

Auf ein 100.000-USD-DeFi-Portfolio übersetzt: Diese Position sollte maximal 2.000–3.000 USD ausmachen, und nur wenn der Investor bereit ist, einen 100 %-Verlust dieser Summe als tolerierbar zu akzeptieren. Für die meisten Retail-Investoren, die Kapitalerhalt vor Rendite-Maximierung priorisieren, ist die ehrliche Antwort: **Die Position ablehnen.** Die Rendite-Differenz zu einfacheren Alternativen (etwa stETH-Einzelposition oder stETH-Aave-2-Layer-Stack) rechtfertigt den strukturellen Risiko-Aufschlag nicht.

Die Meta-Lehre: Wenn eine Position zwei von drei Kernregeln verletzt, und wenn die Erfüllung der Regeln nur durch Akzeptanz niedrigerer Rendite erreichbar ist, dann ist das die richtige Wahl. DeFi-Reichtum wird durch Kapitalerhalt über Jahre aufgebaut, nicht durch Rendite-Maximierung pro Quartal.

</details>

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 8 Folien: Titel → Vertikale Composability → 3 Stacking-Muster → Leverage-Loops → Multiplikatives Risiko → Dependency Layer Diagram → 3 Stacking-Regeln → Position-Sizing-Framework
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 12–14 Min.)
- `visual_plan.json` — Stacking-Diagramme (3 Muster), Dependency-Layer-Diagramm für Leverage-Loop, Risiko-Multiplikations-Rechnung, Position-Sizing-Matrix, Stacking-Regeln-Grafik

Pipeline: Gamma → ElevenLabs → CapCut.

---
