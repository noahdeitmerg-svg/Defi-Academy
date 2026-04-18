# Modul 13 — veTokenomics

## Teil A: Lektionen 1–3

**Zielgruppe:** Fortgeschrittene
**Geschätzte Dauer Teil A:** 45–55 Minuten
**Voraussetzungen:** Module 1–12 abgeschlossen (insbesondere Modul 5 Liquidity Pools, Modul 9 Yield-Strategien)

---

## Modul-Überblick (gilt für Teil A und Teil B)

veTokenomics — kurz für **vote-escrow Tokenomics** — ist eines der einflussreichsten Design-Muster in DeFi. Eingeführt 2020 durch Curve Finance, hat es eine ganze Generation von Protokollen geformt: Balancer, Pendle, Velodrome, Aerodrome und viele mehr. Wer die Mechanik versteht, versteht nicht nur einzelne Protokolle, sondern ein grundlegendes DeFi-Design-Prinzip.

Das Kernkonzept ist elegant einfach: **Nutzer locken einen Token für eine feste Zeit und erhalten dafür Stimmrechte plus erhöhte Rewards**. Je länger der Lock, desto mehr Stimmrechte. Diese Stimmrechte werden zum wirtschaftlichen Steuerungs-Instrument für Liquiditäts-Ströme in Milliardenhöhe.

Das führte zu einem der faszinierendsten Kapitel der DeFi-Geschichte: die **Curve Wars**. Ein jahrelanger Wettkampf zwischen Protokollen um CRV-Emissionen, bei dem Convex Finance als dominanter Akkumulator aufstieg. Heute kontrollieren ve-Modelle Multi-Milliarden-USD-Liquiditätsflüsse und sind zentral für viele yielden-Strategien.

**Die konservative Perspektive:** veTokenomics ist mächtig, aber komplex. Für typische Retail-Nutzer sind direkte ve-Locks selten die richtige Wahl — sie binden Kapital jahrelang und erfordern aktives Voting-Management. Aber **indirekte Nutzung** über Convex, Yearn oder ähnliche Wrapper macht die Vorteile zugänglich ohne den Nachteil der Lock-Periode. Wir behandeln beide Seiten.

**Lektionen (komplettes Modul):**
1. Was veTokenomics eigentlich ist
2. Curve Finance und veCRV im Detail
3. Die Curve Wars — Convex, Yearn, Stake DAO
4. Convex Finance als ve-Wrapper (Teil B)
5. Weitere ve-Modelle: Balancer, Pendle, Velodrome (Teil B)
6. Praktische Retail-Strategien mit ve-Tokenomics (Teil B)

**In Teil A behandeln wir Lektionen 1–3.**

---

## Lektion 13.1 — Was veTokenomics eigentlich ist

### Learning Objectives

After completing this lesson the learner will be able to:
- Das Vote-Escrow-Modell als Design-Muster präzise erklären
- Die wirtschaftlichen Anreize hinter Lock-basierten Stimmrechten verstehen
- Den Unterschied zwischen ve-Modellen und klassischer Token-Governance benennen

### Explanation

**Das Problem, das ve-Tokenomics löst**

Vor 2020 hatten die meisten DeFi-Protokolle klassische Token-Governance: ein Token = eine Stimme. Das klang demokratisch, hatte aber mehrere Probleme:

**Problem 1: Kurz-Orientierung.** Wer heute Token kauft, kann heute Governance-Entscheidungen treffen und morgen verkaufen. Das incentiviert kurzfristiges Profit-Denken statt langfristiger Protokoll-Gesundheit.

**Problem 2: Flash-Loan-Angriffe.** Wie in Modul 12 (Beanstalk) gesehen, können Angreifer temporär Millionen Governance-Tokens "leihen" und Entscheidungen durchdrücken.

**Problem 3: Governance-Apathie.** Die meisten Token-Halter stimmen nie ab. Aktive Voter sind meist spezielle Akteure (Gründer, große Fonds), die nicht unbedingt die breite Nutzerbasis repräsentieren.

**Problem 4: "Mercenary Liquidity".** In DeFi wandert Liquidität dorthin, wo kurzfristig die höchsten Rewards sind. Das destabilisiert Protokolle, deren Überleben von Liquiditäts-Tiefe abhängt.

**Die veTokenomics-Lösung**

Curve Finance (2020, Michael Egorov) führte ein neues Modell ein: **Nutzer können ihre CRV-Tokens in "veCRV" (vote-escrowed CRV) umwandeln, indem sie sie für 1 Woche bis 4 Jahre locken**. Je länger der Lock, desto mehr veCRV wird ausgestellt.

**Die Lock-Mathematik:**
```
veCRV erhalten = CRV gelockt × (Lock-Dauer in Wochen / 208 Wochen)
```

- 1.000 CRV für 4 Jahre gelockt (208 Wochen) = 1.000 veCRV
- 1.000 CRV für 2 Jahre gelockt (104 Wochen) = 500 veCRV
- 1.000 CRV für 1 Jahr gelockt (52 Wochen) = 250 veCRV
- 1.000 CRV für 1 Monat gelockt (4 Wochen) = ~19 veCRV

**Wichtig:** veCRV ist **nicht transferierbar**. Du kannst es nicht verkaufen, nicht übertragen, nicht handeln. Es ist an deine spezifische Wallet gebunden für die gesamte Lock-Dauer. Der einzige Weg "aus" einer Position ist, zu warten bis die Lock-Zeit abläuft.

**Weiter wichtig:** veCRV **verfällt linear**. Wenn du heute 1.000 CRV für 4 Jahre lockst (= 1.000 veCRV), hast du nach 1 Jahr nur noch 750 veCRV, nach 2 Jahren 500 veCRV, nach 3 Jahren 250 veCRV, nach 4 Jahren 0. Um deine Stimmrechte zu erhalten, musst du den Lock regelmäßig **verlängern** ("relock").

**Die drei Vorteile für veCRV-Halter**

**Vorteil 1: Governance-Stimmrechte.** veCRV-Halter stimmen über Protokoll-Parameter ab — vor allem über "Gauge-Weights" (welche Liquiditäts-Pools wie viele CRV-Emissionen bekommen). Mehr dazu in Lektion 13.2.

**Vorteil 2: Protokoll-Fees.** 50% aller Curve-Trading-Fees werden an veCRV-Halter verteilt. Das ist echte Cashflow-Teilhabe am Protokoll.

**Vorteil 3: Boosted LP-Rewards.** Wer sowohl LP-Position auf Curve als auch veCRV hält, bekommt bis zu 2,5× mehr CRV-Emissions-Rewards als unboosted LPs. Das ist der stärkste wirtschaftliche Anreiz — er macht veCRV-Halter zu deutlich profitableren LPs.

**Warum das Modell strukturell robust ist**

Die ve-Architektur adressiert jedes der vier ursprünglichen Probleme:

- **Kurz-Orientierung:** Lock-Zeit zwingt Langfrist-Denken. Wer 4 Jahre lockt, ist am Erfolg des Protokolls in 4 Jahren interessiert.
- **Flash-Loan-Angriffe:** Flash-Loan-Nutzer können CRV zwar borgen, aber nicht in veCRV umwandeln — der Lock würde ihren Flash Loan sprengen. veCRV ist strukturell flash-loan-resistent.
- **Governance-Apathie:** Die drei wirtschaftlichen Vorteile (Gebühren, Boost, Stimmrechte-Monetarisierung) geben aktiven Haltern echte Gründe, sich zu beteiligen.
- **Mercenary Liquidity:** LPs, die ihren Boost maximieren wollen, müssen selbst veCRV halten — das bindet Liquidität an das Protokoll.

**Die Trade-offs für Halter**

ve-Locks haben echte Kosten:

**Kosten 1: Opportunitäts-Kosten.** Kapital ist für bis zu 4 Jahre gebunden. In 4 Jahren kann viel passieren — der CRV-Preis kann fallen, bessere Opportunitäten entstehen, persönliche finanzielle Situation kann sich ändern.

**Kosten 2: Illiquidität.** Du kannst nicht aussteigen. Selbst in Krisen. Das ist im Krypto-Kontext besonders schmerzhaft, weil die Preis-Volatilität hoch ist.

**Kosten 3: CRV-Preis-Risiko.** Deine Position ist in CRV denominiert. Wenn CRV um 80% fällt (was vorgekommen ist), sinkt dein USD-Wert entsprechend. Die Boost-Erträge müssen diese Abwärtsbewegung kompensieren.

**Kosten 4: Aktiver Verwaltungs-Aufwand.** Optimales Voting erfordert wöchentliche Entscheidungen über Gauge-Weights. Wer nicht aktiv managt, lässt Erträge liegen.

**Die Curve-Innovation im Kontext**

Curve war nicht das erste Protokoll mit Token-Locking. Aber es war das erste, das **alle drei Belohnungs-Ebenen** (Governance, Fees, Boost) in einem kohärenten System kombinierte. Die Eleganz des Designs inspirierte eine ganze Welle von Nachahmern.

**Die wichtige Einsicht:** veTokenomics ist kein "feature", sondern eine **Governance-Philosophie**. Sie sagt: "Wer am Erfolg des Protokolls wirklich interessiert ist, sollte auch wirklich gebunden sein." Das ist eine wertbasierte Aussage, nicht nur eine technische.

**Der direkte Vergleich mit klassischer Governance**

| Aspekt | Klassische Token-Governance | veTokenomics |
|---|---|---|
| Stimmrecht | 1 Token = 1 Stimme | Lock-gewichtet |
| Flash-Loan-Resistenz | Niedrig | Hoch |
| Incentiv-Horizont | Kurz | Lang (bis 4 Jahre) |
| Governance-Teilnahme | Oft apathisch | Aktiver durch Boost-Incentive |
| Liquiditäts-Stabilität | Mercenary | Gebunden |
| Exit-Möglichkeit | Sofort | Nur nach Ablauf |

### Slide Summary

**[Slide 1] — Titel**
Was veTokenomics eigentlich ist

**[Slide 2] — Das Problem**
Klassische Token-Governance
Kurz-Orientierung
Flash-Loan-angreifbar
Apathie
Mercenary Liquidity

**[Slide 3] — Die Lösung**
veToken = vote-escrowed Token
Nutzer lockt für 1 Woche bis 4 Jahre
Je länger = mehr veToken
Nicht transferierbar

**[Slide 4] — Die Math**
1.000 CRV × 4 Jahre = 1.000 veCRV
1.000 CRV × 2 Jahre = 500 veCRV
1.000 CRV × 1 Jahr = 250 veCRV
Linear abnehmend über Zeit

**[Slide 5] — Drei Vorteile**
Governance-Stimmrechte
50% Protokoll-Fees
Bis 2,5× Boost auf LP-Rewards

**[Slide 6] — Strukturelle Robustheit**
Lock zwingt Langfrist-Denken
Flash-Loan-resistent
Incentives gegen Apathie
Liquidität gebunden

**[Slide 7] — Die Trade-offs**
Opportunitäts-Kosten (4 Jahre!)
Illiquidität
Token-Preis-Risiko
Verwaltungs-Aufwand

**[Slide 8] — Die Philosophie**
"Wer am Erfolg interessiert ist, sollte gebunden sein"
Wertbasierte Governance-Aussage
Inspirierte ganze Design-Welle

### Voice Narration Script

**[Slide 1]** Willkommen zu Modul 13. veTokenomics — vote-escrow Tokenomics — ist eines der einflussreichsten Design-Muster in DeFi. 2020 von Curve Finance eingeführt, hat es eine Generation von Protokollen geformt. In dieser ersten Lektion klären wir, was es ist und warum es existiert.

**[Slide 2]** Das Problem, das ve-Tokenomics löst. Klassische Token-Governance hatte vier Schwächen. Erstens: Kurz-Orientierung. Wer heute Token kauft, kann heute abstimmen und morgen verkaufen. Zweitens: Flash-Loan-Angriffe. Wie bei Beanstalk gesehen. Drittens: Governance-Apathie — die meisten Halter stimmen nie ab. Viertens: Mercenary Liquidity — Kapital wandert zum höchsten Reward, destabilisiert Protokolle.

**[Slide 3]** Die ve-Lösung. Nutzer wandeln ihre Tokens — zum Beispiel CRV — in "veCRV" um, indem sie sie für 1 Woche bis 4 Jahre locken. Je länger der Lock, desto mehr veCRV wird ausgestellt. Entscheidend: veCRV ist nicht transferierbar. Du kannst es nicht verkaufen, nicht handeln. Es ist an deine Wallet gebunden für die gesamte Lock-Dauer.

**[Slide 4]** Die Lock-Mathematik. 1.000 CRV für 4 Jahre gelockt entspricht 1.000 veCRV. Für 2 Jahre: 500 veCRV. Für 1 Jahr: 250 veCRV. Für 1 Monat: 19 veCRV. Und: veCRV verfällt linear über die Lock-Zeit. Wer heute 1.000 CRV für 4 Jahre lockt, hat nach 2 Jahren nur noch 500 veCRV. Um Stimmrechte zu erhalten, muss der Lock regelmäßig verlängert werden.

**[Slide 5]** Die drei Vorteile für veCRV-Halter. Erstens: Governance-Stimmrechte, vor allem über Gauge-Weights. Zweitens: 50 Prozent aller Curve-Trading-Fees werden an veCRV-Halter verteilt. Echte Cashflow-Teilhabe. Drittens: Boost auf LP-Rewards — bis zu 2,5-fache CRV-Emissionen, wenn du sowohl LP-Position als auch veCRV hast. Das ist der stärkste wirtschaftliche Anreiz.

**[Slide 6]** Warum das Modell strukturell robust ist. Lock-Zeit zwingt Langfrist-Denken. Flash-Loan-Nutzer können zwar CRV borgen, aber nicht veCRV werden — der Lock sprengt den Flash Loan. Die wirtschaftlichen Vorteile geben echte Incentives gegen Apathie. LPs, die ihren Boost wollen, halten veCRV und binden Liquidität.

**[Slide 7]** Die ehrlichen Trade-offs. Kapital gebunden bis zu 4 Jahre — das sind echte Opportunitäts-Kosten. Komplette Illiquidität — du kannst nicht aussteigen, auch in Krisen nicht. Token-Preis-Risiko — wenn CRV um 80 Prozent fällt, fällt dein USD-Wert mit. Und aktiver Verwaltungs-Aufwand — optimales Voting erfordert wöchentliche Entscheidungen.

**[Slide 8]** Die Philosophie hinter veTokenomics. Es ist nicht nur ein technisches Feature, sondern eine Governance-Aussage: wer am Erfolg des Protokolls wirklich interessiert ist, sollte auch wirklich gebunden sein. Die Eleganz dieses Designs inspirierte eine ganze Welle von Protokollen — Balancer, Pendle, Velodrome, viele mehr. Wir behandeln sie in Lektion 13.5.

### Visual Suggestions

**[Slide 1]** Titelfolie.

**[Slide 2]** Vier-Probleme-Karten mit klassischer Governance.

**[Slide 3]** Lock-Mechanik-Diagramm: CRV → Lock → veCRV.

**[Slide 4]** Kurve: Lock-Dauer (x-Achse) vs. veCRV-Anteil (y-Achse).

**[Slide 5]** Drei-Vorteile-Karten mit Icons.

**[Slide 6]** Vier-Lösungen-gegen-Probleme-Matrix.

**[Slide 7]** Trade-offs-Liste mit Warnsymbolen.

**[Slide 8]** **SCREENSHOT SUGGESTION:** Curve Governance-Interface oder ein Convex-Dashboard.

### Exercise

**Aufgabe: veCRV-Rechner mit deinen eigenen Zahlen**

Stell dir vor, du hast 10.000 CRV. Berechne für drei Lock-Szenarien:

1. **Szenario A:** 4 Jahre Lock
2. **Szenario B:** 2 Jahre Lock
3. **Szenario C:** 1 Jahr Lock

Für jedes Szenario:
- veCRV-Menge am Start
- veCRV-Menge nach 6 Monaten
- veCRV-Menge nach 12 Monaten
- veCRV-Menge am Lock-Ende

Zusätzlich reflektiere: Wenn CRV aktuell bei 0,50 USD steht und in 4 Jahren entweder bei 0,10 USD, 0,50 USD oder 2,00 USD stehen könnte — welches Szenario wählst du, und warum?

**Deliverable:** Tabelle mit den Berechnungen + Reflexion (5-8 Sätze) über deine Präferenz und die dahinterstehenden Annahmen.

### Quiz

**Frage 1:** Warum ist "nicht transferierbar" bei veCRV eine zentrale Eigenschaft, und nicht nur eine technische Einschränkung?

<details>
<summary>Antwort anzeigen</summary>

Die Nicht-Transferierbarkeit ist das Design-Fundament, auf dem das gesamte ve-Modell steht. Ohne sie würde das System zusammenbrechen. Gründe: Erstens: **Flash-Loan-Resistenz.** Wenn veCRV transferierbar wäre, könnte ein Angreifer mit Flash Loan CRV kaufen, zu veCRV konvertieren, abstimmen, veCRV zurück-konvertieren und CRV zurückzahlen — alles in einer Transaktion. Die Nicht-Transferierbarkeit kombiniert mit dem Lock macht das unmöglich: der Flash Loan müsste für die gesamte Lock-Zeit offen bleiben, was atomar unmöglich ist. Zweitens: **Langfrist-Commitment bleibt echt.** Wenn ich veCRV jederzeit an einen Dritten verkaufen könnte, wäre der "4-Jahre-Commitment" nur scheinbar. In der Praxis würde sich ein sekundärer Markt für veCRV bilden, wo Nutzer ihre Locks effektiv verkaufen könnten. Das würde das gesamte Langfrist-Incentiv-Modell unterwandern. Drittens: **Governance-Stabilität.** Wenn veCRV transferierbar wäre, könnte Governance-Power über Nacht ihre Besitzer wechseln. Große Akteure könnten kurzfristig Stimmen akkumulieren, entscheiden, und wieder verkaufen. Das ist fast identisch zur Flash-Loan-Problematik, nur zeitlich verlängert. Viertens: **Align-Incentives.** Die Nicht-Transferierbarkeit zwingt jeden veCRV-Halter, wirklich am Erfolg des Protokolls interessiert zu sein — weil er nicht aussteigen kann. Wer veCRV hält, hat echte "skin in the game". Fünftens: **Reduktion von Governance-Angriffs-Vektoren allgemein.** Auch langsamere Angriffs-Formen (z.B. gradueller Kauf von Stimmen über Wochen) sind durch das Lock-Modell abgeschwächt, weil jeder Kauf ein echtes langfristiges Commitment bedeutet. Die Innovation von veCRV war nicht "Token-Locking an sich" — Staking mit Lock-Perioden existierte vorher. Die Innovation war die Kombination aus Lock + Nicht-Transferierbarkeit + Linear-Decay + Boost-Incentive. Diese vier Elemente zusammen schaffen ein System, das kurzfristiges Denken strukturell unmöglich macht. Die Wertschöpfung des Systems hängt davon ab, dass der Token wirklich gebunden ist. Wer versucht, ein "veToken mit Transferier-Option" zu designen, bricht damit das fundamentale Design-Prinzip. Einige neuere Protokolle experimentieren mit "tokenisierten ve-Positionen" (sekundäre Märkte), aber sie lösen dabei die erzeugten Probleme meist nur teilweise. Die Original-Curve-Architektur bleibt das Reinste Beispiel.
</details>

**Frage 2:** Ein Freund sagt: "4 Jahre lock ist verrückt in Krypto. Niemand kann so weit vorausschauen." Was ist der Gegenstandpunkt?

<details>
<summary>Antwort anzeigen</summary>

Dein Freund hat einen berechtigten Punkt — Krypto ist schnelllebig, und 4 Jahre sind eine Ewigkeit. Aber es gibt mehrere Gegenstandpunkte, die das Modell trotzdem rational erklärbar machen. Gegenstandpunkt 1: **Flexibilität in der Lock-Dauer.** Du musst nicht 4 Jahre locken. Du kannst für 1 Woche locken (mit entsprechend geringerer veCRV-Ausbeute). Die 4-Jahre-Option existiert, ist aber nicht Pflicht. Konservative Halter wählen oft 1-2 Jahre, um Flexibilität zu behalten bei immer noch signifikanter Boost-Beteiligung. Gegenstandpunkt 2: **ROI-Mathematik bei langen Locks.** Bei 4-Jahres-Lock bekommst du maximalen Boost (2,5x auf LP-Rewards). Wenn die Boost-Rewards in den 4 Jahren mehr als dein CRV-Kapital ausmachen, hast du strukturell "gewonnen" — selbst wenn CRV selbst im Preis fällt. Beispiel: 10.000 CRV bei 0,50 USD = 5.000 USD. Bei 2,5x-Boost auf $100k LP-Position über 4 Jahre = $40k+ zusätzliche Rewards. Selbst wenn CRV auf 0,10 USD fällt (Verlust: $4.000), sind $40k Boost-Rewards netto +$36k. Das ist asymmetrisches Setup. Gegenstandpunkt 3: **Protokoll-Matching mit Investment-Horizont.** Curve ist ein Infrastruktur-Protokoll für Stablecoin-Liquidität. Stablecoins sind ein Multi-Decade-Phänomen. Wer glaubt, dass Curve in 4 Jahren noch existiert und relevant ist, macht einen sinnvollen Match. Das ist anders als bei jungen Experimental-Protokollen. Gegenstandpunkt 4: **Indirekte Nutzung via Convex.** Dein Freund hat recht, dass 4-Jahre-Lock direkt für viele zu viel ist. Aber Convex (Lektion 13.3/13.4) macht die Boost-Vorteile von veCRV zugänglich ohne eigenen Lock. Retail nutzt oft Convex statt direktem Lock. Das löst das 4-Jahre-Problem elegant. Gegenstandpunkt 5: **Die meisten Institute akzeptieren ähnliche Zeit-Horizonte.** Ein Bond mit 4 Jahren Laufzeit ist in TradFi normal. Eine 401k-Anlage ist 20+ Jahre gelockt. Immobilien-Investment 10+ Jahre. Der Krypto-Short-Termismus ist nicht normal — er ist eine Besonderheit der Retail-Welt. Institutionelle Akteure akzeptieren 4-Jahre-Locks problemlos. Gegenstandpunkt 6: **"Unchangeable" schafft Wert.** Die Unveränderlichkeit ist Teil des Wertes. Wer nicht aussteigen kann, wird auch nicht panisch verkaufen. Das stabilisiert den Token-Preis und das Protokoll in Krisen. Ohne Lock würden CRV-Halter bei jeder Volatilität abstoßen. Mit Lock bleiben sie gebunden — was wiederum andere Halter ermutigt. Die ehrliche Abwägung: dein Freund hat recht, dass 4 Jahre für die meisten Retail-Nutzer zu viel ist. Aber (a) kürzere Locks sind Option, (b) Convex-basierte indirekte Nutzung umgeht das Problem, (c) für die richtige Halter-Gruppe (Profis, Instituts, langfristig-überzeugte) ist es ökonomisch rational. Keine einheitliche Antwort — aber das Modell hat Daseinsberechtigung für bestimmte Nutzer-Gruppen.
</details>

---

## Lektion 13.2 — Curve Finance und veCRV im Detail

### Learning Objectives

After completing this lesson the learner will be able to:
- Die Gauge-Weight-Mechanik als wirtschaftliches Steuerungs-Instrument verstehen
- Die Boost-Formel für LP-Rewards berechnen
- Die drei Einnahmequellen eines veCRV-Halters quantifizieren

### Explanation

Curve Finance ist der Pionier und das reinste Beispiel von veTokenomics. Wir behandeln die Mechanik im Detail.

**Das Grund-Protokoll: Curve StableSwap**

Zur Erinnerung aus Modul 5: Curve ist ein DEX mit spezialisiertem StableSwap-Algorithmus, der für Pools von ähnlich-valuierten Assets (Stablecoins, ETH-Derivate) minimalen Slippage bietet. Die bekanntesten Pools sind 3pool (DAI/USDC/USDT), stETH/ETH, tricrypto (USDT/WBTC/ETH).

**Die Emissionen: CRV-Tokens**

Curve emittiert CRV-Tokens als Rewards für LPs. Der Emissionsplan war bei Launch festgelegt:
- **Initial:** 274 Millionen CRV (für frühe LPs)
- **Inflations-Plan:** ~700.000 CRV pro Tag initial, abnehmend über die Jahre
- **Max Supply:** 3,03 Milliarden CRV über ~300 Jahre

Diese Emissionen sind die primäre Ertragsquelle für Curve-LPs. Aber: **wer bekommt wie viel von der täglichen CRV-Emission?** Genau das regelt das Gauge-System.

**Das Gauge-System: Das Herzstück**

Jeder Curve-Pool hat ein "Gauge" — einen Smart Contract, der die CRV-Emissionen an diesen Pool verwaltet. Aber: **nicht alle Gauges bekommen gleich viele Emissionen**. Die Verteilung wird durch Gauge-Weights gesteuert.

**Gauge-Weight-Voting:**
- veCRV-Halter stimmen wöchentlich ab, wie die CRV-Emissionen auf die Gauges verteilt werden
- Die Stimme: jeder veCRV = 1 Stimme, verteilbar über alle Gauges
- Die Gesamt-Weights bestimmen die Prozent-Verteilung der wöchentlichen CRV-Emissionen

**Konkretes Beispiel:**
Angenommen in einer Woche sollen 1.000.000 CRV an alle Gauges verteilt werden. Das Voting-Ergebnis:
- 3pool: 20% der Weights → 200.000 CRV
- stETH/ETH: 30% der Weights → 300.000 CRV
- tricrypto: 15% der Weights → 150.000 CRV
- Andere Pools: 35% der Weights → 350.000 CRV

**Warum das wirtschaftlich so wichtig ist:** Wenn ein Pool mehr CRV-Emissionen bekommt, ist er für LPs attraktiver — höhere APR. Das zieht mehr Liquidität an, was wiederum den Pool effizienter macht (niedrigere Slippage für Swapper). Pools mit hohem Gauge-Weight wachsen. Pools mit niedrigem Gauge-Weight schrumpfen.

**Gauge-Weights sind also die zentrale wirtschaftliche Steuerung von Curve.** Wer genug veCRV kontrolliert, kann Milliarden USD in Liquidität steuern.

**Das Boost-System: Der Kerngedanke**

Das zweite zentrale Feature von veCRV-Haltern: sie bekommen **Boost** auf ihre LP-Rewards. Formel vereinfacht:

```
Dein Anteil an Pool-Emissionen = 
  min(
    deine LP-Position,
    0,4 × deine LP-Position + 0,6 × (dein veCRV × Pool-TVL / Total veCRV)
  ) / Pool-TVL
```

**Das klingt komplex, lässt sich aber vereinfachen.** Wenn du proportional viel veCRV zu deiner LP-Größe hast, bekommst du bis zu 2,5× Boost. Wenn du wenig veCRV hast, bekommst du weniger Boost (minimum: 1,0×, also keinen Boost).

**Konkretes Beispiel:**
- Pool TVL: 100.000.000 USD
- Deine LP-Position: 100.000 USD (= 0,1% des Pools)
- Total veCRV: 400.000.000
- Dein veCRV: 200.000 (= 0,05% des Total veCRV)

Dein Boost-Faktor hängt vom Verhältnis ab: du hast 0,1% des Pools, aber nur 0,05% des veCRV. Du bekommst etwas über 1,0×, aber nicht die vollen 2,5×.

Um maximalen 2,5× Boost zu erreichen, müsste dein veCRV-Anteil proportional zu deinem Pool-Anteil sein. In diesem Beispiel: 0,1% des veCRV = 400.000 veCRV.

**Das macht den Boost zum stärksten wirtschaftlichen Incentive:** LPs, die ihren Ertrag maximieren wollen, brauchen veCRV. Wer 2-3% Rendite aus normaler LP-Position verdient, verdient mit Boost 5-7,5%. Das ist der Unterschied zwischen "mittelmäßig" und "gut" im DeFi-Markt.

**Die drei Einnahmequellen eines veCRV-Halters**

Wenn du veCRV hältst UND eine LP-Position in Curve hast:

**Einnahmequelle 1: LP-Fees (ohne veCRV-Hold).** Basis-Trading-Fees deines Pools (typisch 0,02-0,04% pro Swap). Anteilig an deiner LP-Größe.

**Einnahmequelle 2: CRV-Emissionen (boosted).** Deine CRV-Rewards, potentiell 2,5x boosted wenn dein veCRV-Anteil ausreichend ist.

**Einnahmequelle 3: 50% Protokoll-Fees (exklusiv für veCRV).** 50% aller Curve-Trading-Fees werden als 3CRV (LP-Token der 3pool) an veCRV-Halter proportional verteilt. Das ist kompletter Cashflow, unabhängig von deiner LP-Position.

**Beispiel-Rechnung für konkrete Halter:**
Angenommen du hast 100.000 CRV, davon 50.000 für 4 Jahre gelockt (= 50.000 veCRV). Du hast außerdem eine 50.000 USD LP-Position in 3pool. Aktuelle Zahlen (hypothetisch):

- **Base LP-Fees (3pool):** ~1,5% APR = 750 USD/Jahr
- **CRV-Emissionen mit 2,5x Boost:** ~8% APR auf LP = 4.000 USD/Jahr (als CRV)
- **veCRV-Fees:** 50.000 veCRV Anteil bei 400M Total = 0,0125% des Protokoll-Fees. Bei ~50M USD/Jahr Protokoll-Fees = ~6.250 USD/Jahr

Gesamt: 750 + 4.000 + 6.250 = 11.000 USD/Jahr auf ~75.000 USD Total-Position (50k LP + 50k CRV wert) = **~14,7% effective APR**.

Das ist deutlich höher als normale LP-Position ohne veCRV-Boost.

**Die Frequenz der Voting-Runden**

Gauge-Weights werden wöchentlich neu gesetzt. Jeden Donnerstag ("voting snapshot") um 16:00 UTC wird das aktuelle veCRV und die Votes für die nächste Emissions-Periode erfasst.

Das bedeutet: aktive veCRV-Halter müssen **wöchentlich** ihre Stimmen abgeben oder aktualisieren. Passive Halter verlieren Einnahme-Optimierungs-Möglichkeiten.

**In der Praxis nutzen viele Halter Convex oder andere Wrapper** (Lektion 13.4), die das wöchentliche Voting automatisieren. Wir kommen dazu.

**Die Wahrheit über direktes veCRV-Halten**

Für die meisten Retail-Nutzer ist direktes veCRV-Halten **nicht** die beste Strategie:
1. Kapital-Bindung von bis zu 4 Jahren
2. Wöchentliche aktive Voting-Aufgaben
3. CRV-Preis-Risiko in den Lock-Jahren
4. Komplexe Strategie-Optimierung

Die praktische Alternative — **Convex** — bietet die Boost-Vorteile ohne den Lock. Aber das Verständnis von direktem veCRV ist Voraussetzung, um Convex zu verstehen.

### Slide Summary

**[Slide 1] — Titel**
Curve Finance und veCRV im Detail

**[Slide 2] — CRV-Emissionen**
Primärer LP-Ertrag
~700k CRV/Tag initial
Abnehmend über ~300 Jahre
Max Supply 3,03 Mrd

**[Slide 3] — Das Gauge-System**
Jeder Pool hat ein Gauge
Gauge-Weights bestimmen Emissions-Verteilung
veCRV-Halter stimmen wöchentlich
Zentrale wirtschaftliche Steuerung

**[Slide 4] — Gauge-Weight-Beispiel**
Woche: 1M CRV zu verteilen
3pool: 20% → 200k CRV
stETH/ETH: 30% → 300k CRV
Pools mit Weight wachsen, ohne schrumpfen

**[Slide 5] — Boost-Formel**
Bis 2,5x mehr CRV-Rewards
Für LPs mit proportionalem veCRV
Stärkster wirtschaftlicher Incentive
LP 2-3% → LP+Boost 5-7,5%

**[Slide 6] — Drei Einnahmen**
LP-Fees (alle LPs)
CRV-Emissionen boosted (LP+veCRV)
50% Protokoll-Fees (nur veCRV)

**[Slide 7] — Beispiel-APR**
100k CRV + 50k LP
Ohne Boost: ~1,5% APR
Mit Boost: ~14,7% APR
Fast 10x Unterschied

**[Slide 8] — Die Wahrheit für Retail**
Direktes veCRV komplex
Wöchentliches Voting nötig
4-Jahre-Lock
Alternative: Convex (nächste Lektion)

### Voice Narration Script

**[Slide 1]** Curve Finance ist das reinste Beispiel von veTokenomics. In dieser Lektion gehen wir in die Mechanik im Detail — Gauge-Weights, Boost-Formel, Einnahmen.

**[Slide 2]** CRV ist der native Token. Emissionen sind die primäre Ertragsquelle für Curve-LPs. Initial etwa 700.000 CRV pro Tag, abnehmend über etwa 300 Jahre bis zu einer Max-Supply von 3,03 Milliarden. Die Frage: wer bekommt wie viel davon? Das regelt das Gauge-System.

**[Slide 3]** Jeder Curve-Pool hat ein Gauge — einen Smart Contract, der die CRV-Emissionen an diesen Pool verwaltet. Aber nicht alle Gauges bekommen gleich viele Emissionen. Die Verteilung wird durch Gauge-Weights gesteuert. veCRV-Halter stimmen wöchentlich ab, wie Emissionen auf die Gauges verteilt werden. Das ist die zentrale wirtschaftliche Steuerung von Curve.

**[Slide 4]** Konkretes Beispiel. In einer Woche 1 Million CRV zu verteilen. Voting-Ergebnis: 3pool 20 Prozent bekommt 200.000 CRV. stETH/ETH 30 Prozent bekommt 300.000 CRV. Und so weiter. Pools mit hohem Weight ziehen mehr LP-Kapital an, werden effizienter, wachsen. Pools mit niedrigem Weight schrumpfen. Wer genug veCRV kontrolliert, kann Milliarden USD in Liquidität steuern.

**[Slide 5]** Das Boost-System. veCRV-Halter bekommen bis zu 2,5-fach mehr CRV-Emissionen auf ihre LP-Position. Die Formel ist komplex, aber vereinfacht: je höher dein veCRV-Anteil relativ zu deiner LP-Größe, desto höher dein Boost. Ohne Boost: 1-fach. Mit maximalem Boost: 2,5-fach. Das ist der stärkste wirtschaftliche Incentive: LPs mit 2 bis 3 Prozent Basis-Rendite verdienen mit Boost 5 bis 7,5 Prozent. Der Unterschied zwischen mittelmäßig und gut im DeFi-Markt.

**[Slide 6]** Die drei Einnahmequellen für einen veCRV-Halter mit LP-Position. Erstens: LP-Fees, also Basis-Trading-Fees des Pools. Die bekommt jeder LP. Zweitens: CRV-Emissionen boosted. Die bekommen nur LPs mit veCRV. Drittens: 50 Prozent der Protokoll-Fees werden exklusiv an veCRV-Halter als 3CRV verteilt. Das ist Cashflow unabhängig von deiner LP-Position — nur durch das Halten von veCRV.

**[Slide 7]** Beispiel-Rechnung. 100.000 CRV, 50.000 davon gelockt. 50.000 USD LP-Position in 3pool. Base LP-Fees: 1,5 Prozent APR, 750 Dollar pro Jahr. CRV-Emissionen mit 2,5-fach Boost: 8 Prozent APR, 4.000 Dollar. veCRV-Fees aus Protokoll-Fees: etwa 6.250 Dollar. Gesamt 11.000 Dollar auf 75.000 Dollar Total-Position — etwa 14,7 Prozent effektive APR. Fast 10-fach höher als normale LP-Position ohne Boost.

**[Slide 8]** Die Wahrheit für Retail-Nutzer. Direktes veCRV-Halten ist komplex. Wöchentliches Gauge-Voting ist nötig für optimale Rendite. Bis zu 4 Jahre Kapital-Bindung. CRV-Preis-Risiko in den Lock-Jahren. Für die meisten Retail-Nutzer nicht die beste Strategie. Die praktische Alternative ist Convex Finance, das die Boost-Vorteile ohne eigenen Lock zugänglich macht. Aber das Verständnis von direktem veCRV ist Voraussetzung, um Convex zu verstehen. Das ist der Inhalt der nächsten Lektionen.

### Visual Suggestions

**[Slide 1]** Titelfolie.

**[Slide 2]** CRV-Emissions-Kurve über Zeit.

**[Slide 3]** **SCREENSHOT SUGGESTION:** Curve Gauge-Voting-Interface (dao.curve.fi).

**[Slide 4]** Tortendiagramm Gauge-Weights mit Zahlen.

**[Slide 5]** Boost-Formel-Diagramm mit veCRV:LP-Ratio auf x-Achse, Boost auf y-Achse.

**[Slide 6]** Drei-Einnahmen-Pyramide mit Größenordnungen.

**[Slide 7]** APR-Vergleichsdiagramm: ohne Boost vs. mit Boost.

**[Slide 8]** **SCREENSHOT SUGGESTION:** Convex-Dashboard als Preview.

### Exercise

**Aufgabe: Curve-Gauge-Weight-Analyse**

Besuche das Curve-DAO-Interface unter [dao.curve.fi](https://dao.curve.fi) → Gauge Weights.

Dokumentiere:
1. Die Top-10-Pools nach aktuellem Gauge-Weight
2. Das Total veCRV im System
3. Welche Pool-Kategorien dominieren (Stablecoin, LST, BTC-Derivate)?
4. Gibt es dramatische Weight-Änderungen in der letzten Woche oder dem letzten Monat?

**Deliverable:** Tabelle der Top-10 + Kategorien-Analyse + Reflexion (5-8 Sätze): Was sagen dir die aktuellen Weights über die Prioritäten der veCRV-Halter? Welche Pools würdest du als LP ansteuern, basierend auf den Weights und den entsprechenden CRV-Emissionen?

### Quiz

**Frage 1:** Alice hat 10.000 CRV und eine 10.000 USD 3pool-LP-Position. Bob hat die gleiche LP-Position, aber 0 CRV. Wie viel mehr CRV-Emissions-Rendite verdient Alice, wenn sie ihre 10.000 CRV für 4 Jahre lockt (= 10.000 veCRV)?

<details>
<summary>Antwort anzeigen</summary>

Die exakte Antwort hängt vom Pool-TVL und dem Total-veCRV ab, aber wir können es approximativ berechnen. **Grundannahmen:** 3pool TVL ~500 Millionen USD (variiert). Total veCRV ~400-500 Millionen (variiert). Angenommen 8% CRV-Emissions-APR als Basis für Unboosted-LP (Bob). **Alice's Situation:** LP-Position: 10.000 USD auf 500M TVL = 0,002% des Pools. veCRV-Position: 10.000 von 400M = 0,0025% des Total veCRV. Alice's veCRV-Anteil (0,0025%) ist leicht höher als ihr LP-Anteil (0,002%), aber nicht proportional um den maximalen Boost zu erhalten. Die Boost-Formel gibt ihr etwa 1,8-2,0x Boost (Schätzung bei diesen Verhältnissen). **Bob's Situation:** LP-Position: 10.000 USD = 0,002% des Pools. Kein veCRV = 1,0x Boost (kein Boost). **Konkrete Renditen bei 8% Basis-APR:** Bob: 10.000 × 8% = 800 USD/Jahr in CRV. Alice: 10.000 × 8% × ~1,9 = 1.520 USD/Jahr in CRV. **Differenz: Alice verdient ~720 USD mehr in CRV-Emissionen pro Jahr.** **Aber:** Alice hat auch zusätzliche Einnahmen durch veCRV-Fees (50% der Protokoll-Fees proportional). Bei 400M Total veCRV und 50M Fees pro Jahr = 125 Wei pro veCRV. Bei 10k veCRV = ~125 USD/Jahr zusätzlich. **Alice's Total zusätzlicher Ertrag: ~845 USD/Jahr.** **Die wichtige Frage: rechtfertigt das die Kapital-Bindung?** Alice hat 10.000 CRV gelockt. Bei 0,50 USD CRV-Preis = 5.000 USD gebunden. 845 USD/Jahr Mehrertrag auf 5.000 USD gebundenes Kapital = 17% "extra ROI" auf die Lock. Plus: sie hat die LP weiterhin aktiv (keine Kapital-Opportunitätskosten). Wenn CRV-Preis stabil bleibt: sehr gute Rechnung. Wenn CRV-Preis um 50% fällt über 4 Jahre: Kapital-Verlust 2.500 USD vs. 3.380 USD zusätzliche Erträge über 4 Jahre = netto +880 USD. Immer noch positiv. Wenn CRV-Preis um 80% fällt: Kapital-Verlust 4.000 USD, Erträge 3.380 USD = netto -620 USD. Hier kritisch. **Conclusion:** Bei moderater CRV-Preis-Entwicklung ist Alice's Strategie klar besser. Bei starkem CRV-Crash kann sie schlechter sein als Bob. Das ist der Kern der ve-Trade-off-Abwägung: Boost-Prämie gegen Token-Preis-Risiko. Historisch: CRV-Preis war 2020-2024 sehr volatil, mit multiplen 80%+ Drawdowns. Wer 2021 bei 5+ USD gelockt hat, verlor zwischendurch viel USD-Wert. Aber die kumulativen Boost-Erträge über Jahre kompensierten meist. Die Schlüssel-Erkenntnis: ve-Locks sind keine "passive Anlage" — sie sind eine aktive Wette auf die Langfrist-Gesundheit des Protokolls. Wer das nicht akzeptiert, sollte nicht direkt locken.
</details>

**Frage 2:** Warum sind Gauge-Weights das "wirtschaftliche Steuerungs-Instrument" von Curve, und was bedeutet das für Protokolle, die ihre eigenen Token als Liquidität wollen?

<details>
<summary>Antwort anzeigen</summary>

Gauge-Weights sind Curve's Steuerungs-Instrument, weil sie direkt die **Liquiditäts-Verteilung** im Milliarden-USD-Markt beeinflussen. **Mechanismus:** Pools mit höherem Gauge-Weight bekommen mehr CRV-Emissionen. Mehr Emissionen = höhere APR für LPs = mehr LP-Kapital fließt in den Pool. Mehr LP-Kapital = tiefere Liquidität = weniger Slippage für Swapper = der Pool wird zur "go-to"-Liquidität-Quelle für dieses Asset-Paar. Hohe Liquidität schafft einen selbstverstärkenden Kreislauf: mehr Swap-Volumen → mehr Fees → mehr LPs → noch tiefere Liquidität. **Warum das für Protokolle kritisch ist:** Viele Protokolle brauchen tiefe Liquidität für ihren eigenen Token. Ein Stablecoin-Protokoll braucht Peg-Stabilität — die entsteht nur durch ausreichend tiefe Liquidität, wo Preis-Abweichungen schnell ausgebügelt werden. Ein LST-Protokoll (Lido mit stETH, Rocket Pool mit rETH) braucht ETH/LST-Liquidität. Ohne diese wäre ein Exit aus LST-Positionen teuer oder unmöglich. Für diese Protokolle ist ein Curve-Pool mit hohem Gauge-Weight praktisch existenzkritisch. **Das Problem:** Pool-Aufbau ist teuer. Wenn Protokoll X einen Pool auf Curve launcht, ist er initial flach — wenige LPs, dünn. Liquidität wandert nicht freiwillig dorthin. Die Frage: wie bekommt man den Pool schnell auf sinnvolle Größe? **Die Lösung 1: Hohe CRV-Emissionen zum neuen Pool lenken.** Wenn Protokoll X einen hohen Gauge-Weight für seinen Pool bekommt, lockt das LPs an (durch hohe APR). Binnen Wochen kann der Pool Hunderten Millionen USD TVL erreichen. **Das strategische Problem:** CRV-Emissionen sind begrenzt. Der Anteil, der zu Pool X fließt, geht nicht zu anderen Pools. Alle Protokolle kämpfen um denselben Emissions-Pool. **Daher: Protokolle müssen Stimmrechte erwerben, um Emissionen zu ihrem Pool zu leiten.** Und Stimmrechte erwirbt man durch veCRV-Hold. **Die "Bribe-Wirtschaft":** Statt dass Protokoll X selbst massive Mengen CRV kauft und lockt, können sie "Bribes" an andere veCRV-Halter zahlen — dafür, dass diese ihre Votes auf Pool X richten. Bribe-Plattformen wie Votium oder Quest sind entstanden, um diesen Markt zu organisieren. Ein Protokoll zahlt $100.000 in eigenem Token, bekommt dafür Stimmen, die ihrem Pool $1.000.000+ in CRV-Emissionen einbringen. **Wirtschaftliches Arbitrage:** Bribes sind oft günstiger als direkter CRV-Kauf. Protokolle, die ihre Liquidität maximieren wollen, haben damit einen klaren Kanal. Das hat die "Curve Wars" (Lektion 13.3) geformt. **Die breitere Implikation:** Gauge-Weights sind ein Beispiel dafür, wie DeFi-Governance nicht nur über abstrakte Parameter entscheidet, sondern direkte wirtschaftliche Konsequenzen hat. In TradFi würde man das "market making incentives" nennen — aber durch Token-Governance implementiert. Wer die Dynamik versteht, sieht: das Gauge-System ist nicht nur ein technisches Detail, sondern eine wirtschaftliche Maschine, die Multi-Milliarden-Liquiditäts-Ströme steuert. Für Nutzer: LP-Renditen sind nicht nur Funktion der Handelsvolumina, sondern auch der Gauge-Weights. Hoch-geweightete Pools haben oft die besten risikoadjustierten Renditen. Für Protokoll-Entwickler: ein Curve-Pool ohne Gauge-Weight ist praktisch unsichtbar. Die Strategie "wir launchen einfach einen Pool" ohne Gauge-Weight-Strategie ist zum Scheitern verurteilt.
</details>

---

## Lektion 13.3 — Die Curve Wars

### Learning Objectives

After completing this lesson the learner will be able to:
- Die historische Dynamik der Curve Wars und ihre Akteure verstehen
- Die wirtschaftliche Logik der Bribe-Wirtschaft nachvollziehen
- Die Akkumulation von CRV als strategisches Asset erkennen

### Explanation

"Curve Wars" ist die informelle Bezeichnung für einen jahrelangen Wettkampf zwischen Protokollen um **Kontrolle über CRV-Emissionen**. Es ist eine der faszinierendsten Machtdynamiken in DeFi — und hat den Aufstieg von Convex Finance als dominante Kraft erklärt.

**Die Grundlage: warum Emissionen so wertvoll sind**

Aus Lektion 13.2 wissen wir: Curve verteilt wöchentlich Millionen USD in CRV-Emissionen. Wer bestimmt, an welche Pools diese Emissionen gehen, kontrolliert massive Liquiditäts-Ströme.

**Für Stablecoin-Protokolle wie FRAX, MIM, USDD:** Tiefe Curve-Pools sind existenziell wichtig. Ohne sie ist der Stablecoin-Peg gefährdet.

**Für LST-Protokolle wie Lido (stETH) und Rocket Pool (rETH):** Curve-Pools sind die primäre Exit-Liquidität. Ohne tiefe Pools könnten Halter nicht schnell zu ETH zurückkehren.

**Für kleinere Stablecoins und Tokens:** Ein Curve-Pool mit hohem Gauge-Weight ist oft der Unterschied zwischen Überleben und Sterben.

Damit ist der CRV-Emissions-Markt ein **Multi-Milliarden-USD-Markt für Liquiditäts-Incentives**. Und Kontrolle darüber ist entsprechend wertvoll.

**Die drei Wege, CRV-Emissionen zu kontrollieren**

**Weg 1: Eigene veCRV akkumulieren.**
Ein Protokoll kauft CRV am offenen Markt und lockt es für 4 Jahre. Das gibt dem Protokoll direkte Voting-Power. Nachteil: teuer und gebunden.

**Weg 2: Nutzer incentivieren, CRV für dich zu locken.**
Ein Protokoll kann eigene Belohnungen anbieten, wenn Nutzer CRV in einem Wrapper des Protokolls locken. So entstand Convex.

**Weg 3: Bribes an bestehende veCRV-Halter zahlen.**
Ein Protokoll zahlt Tokens (meist ihre eigenen) an veCRV-Halter, die ihre Stimmen auf den Pool des Protokolls richten. Plattformen wie Votium und Quest organisieren diesen Markt.

**Die vier großen Akteure der Curve Wars**

**Akteur 1: Convex Finance (CVX)**

Convex wurde 2021 gegründet und entwickelte sich schnell zum dominanten Akteur. Die Strategie: Nutzer incentivieren, ihre CRV **permanent** an Convex zu locken. Im Austausch bekommen sie cvxCRV-Tokens (liquide, handelbar) und CVX-Token-Rewards.

Convex akkumulierte in Spitzenzeiten **über 50% aller veCRV** — effektive Kontrolle über die Curve-Governance.

**Detaillierte Mechanik in Lektion 13.4 (Teil B).**

**Akteur 2: Yearn Finance (YFI)**

Yearn hat einen eigenen Wrapper — yCRV. Ähnliches Prinzip wie Convex, aber weniger aggressiv im Akkumulieren. Heute ein Nischen-Spieler neben Convex.

**Akteur 3: Stake DAO (SDT)**

Anderer Wrapper mit sdCRV. Kleiner als Convex, aber mit eigenen Besonderheiten (höhere Direkt-Rendite für einige Nutzer).

**Akteur 4: FRAX Finance**

FRAX verfolgte eine eigene Strategie: direkte CRV-Akkumulation durch Protokoll-Käufe. Als Stablecoin-Protokoll hat FRAX direkte Interesse an tiefer Curve-Liquidität für den eigenen Stablecoin.

**Die historische Timeline der Curve Wars**

**Phase 1 (2020-Mitte 2021): Die frühen Locker.** Erste CRV-Halter locken CRV, weil sie das ve-Modell verstehen. Convex existiert noch nicht. Marktgröße klein.

**Phase 2 (Mitte 2021-Anfang 2022): Convex-Ascent.** Convex launcht Mai 2021. Akkumuliert rapid veCRV durch attraktive Incentives. Erreicht binnen Monaten Dominanz.

**Phase 3 (2022: Peak Wars).** FRAX, MIM (Abracadabra), Yearn, Badger und andere kaufen aggressiv CVX (Convex-Token), um indirekten Zugang zu Convex's veCRV zu bekommen. "Curve Wars" werden zu "Convex Wars".

**Phase 4 (2022-2023: UST-Crash-Folgen).** Terra's UST-Kollaps (Mai 2022) und danach FTX-Kollaps (November 2022) reduzieren die Gesamt-Aktivität. Einige Protokolle, die Teil der Curve Wars waren (MIM/Abracadabra), erlitten Krisen.

**Phase 5 (2023-2024: Stabilisierung).** Die Marktstruktur beruhigt sich. Convex bleibt dominanter Akteur. Neue ve-Protokolle (Velodrome, Aerodrome, Pendle) emergen, mit eigenen Wars ("Velo Wars", "Pendle Wars").

**Phase 6 (2024-2025 und heute): Post-Curve-Wars-Landschaft.** Die Aufregung um Curve spezifisch hat nachgelassen, aber das ve-Design-Muster hat sich etabliert. Multiple ve-Ökosysteme existieren parallel.

**Die Bribe-Wirtschaft im Detail**

Heute ist die Curve-Bribe-Wirtschaft professionalisiert. Die wichtigsten Plattformen:

**Votium (votium.app):** Die größte Bribe-Plattform. Protokolle zahlen Tokens in einen Pool, vlCVX-Halter (Convex's Voting-Token, siehe Teil B) oder veCRV-Halter bekommen Anteile für ihre Voting-Aktivität.

**Quest / Warden:** Alternative Plattformen mit ähnlicher Funktion, manchmal bessere Mechaniken für bestimmte Situationen.

**Direct-Bribes:** Einige Protokolle zahlen auch direkt an Voter ohne Plattform — höhere Effizienz, aber weniger Transparenz.

**Die Größenordnungen:** In Spitzenzeiten flossen 10-50 Millionen USD pro Monat in Bribes. Heute (2025-2026) ist es ruhiger, aber immer noch mehrere Millionen pro Monat.

**Die wirtschaftliche Logik:**

Ein Stablecoin-Protokoll, das $1 Million in Bribes bezahlt, bekommt dafür vielleicht $5-10 Millionen in CRV-Emissionen zu seinem Pool. Das ist 5-10× Hebel. Für einen LP, der seine Rendite maximieren will, ist das direkt profitabel.

**Die Gewinn-Rechnung für Voter:**

Ein vlCVX-Halter mit 100.000 vlCVX bekommt typisch 5-15% APR aus Bribes (in verschiedenen Tokens). Plus die Base-CVX-Rewards. Das macht die Gesamt-Yield-Kurve signifikant.

**Die ethischen Debatten**

Die Curve Wars haben Kontroversen ausgelöst:

**Kritik 1: Zentralisierung.** Wenn ein einzelnes Protokoll (Convex) 50% der veCRV kontrolliert, ist das eine faktische Governance-Konzentration. Das widerspricht dem Dezentralisierungs-Ideal.

**Kritik 2: Bribe-Wirtschaft als "Korruption".** Manche kritisieren, dass Bribes Stimmrechte "käuflich" machen. Andere entgegnen: jede Demokratie hat wirtschaftliche Incentives für Teilnahme; Bribes sind nur transparenter.

**Kritik 3: Protokoll-Abhängigkeit von CRV.** Protokolle, die von CRV-Emissionen abhängen, sind gefährdet wenn CRV selbst in Schieflage gerät.

**Die positive Sicht:**

Die Curve Wars haben tatsächlich **effiziente Liquiditäts-Märkte** geschaffen. Stablecoins und LSTs haben tiefe Pools, Nutzer bekommen bessere Preise, das DeFi-Ökosystem ist als Ganzes effizienter. Dass das durch eine komplexe Anreiz-Struktur erreicht wurde, kann man als Feature, nicht als Bug sehen.

**Was das für einen normalen Nutzer bedeutet**

Für die meisten DeFi-Nutzer sind die Details der Curve Wars akademisch — aber sie haben indirekte Implikationen:

**Implikation 1: LP-Renditen sind variabel.** Die CRV-Emissionen zu einem bestimmten Pool hängen von den Voting-Dynamiken ab. Wenn ein Pool "in" ist (hohe Votes), sind die APRs hoch. Wenn das Voting kippt, können APRs dramatisch fallen.

**Implikation 2: Bribes sind eine Einkommens-Quelle.** Wer vlCVX hält, kann einen signifikanten Teil seines Ertrags aus Bribes beziehen. Das macht Convex zu einer interessanten Position für aktive Halter.

**Implikation 3: Die Pools mit den besten APRs sind meist nicht zufällig.** Sie sind meist Pools, die aktiv über Bribes gepusht werden. Wer die höchsten APRs verstehen will, muss die Bribe-Dynamik verstehen.

In Teil B werden wir Convex im Detail behandeln und zeigen, wie ein normaler Nutzer praktisch von dieser Dynamik profitieren kann, ohne selbst CRV für 4 Jahre zu locken.

### Slide Summary

**[Slide 1] — Titel**
Die Curve Wars

**[Slide 2] — Warum der Kampf**
CRV-Emissionen = Liquiditäts-Incentives
Für Stablecoins/LSTs existentiell
Multi-Milliarden-USD-Markt
Kontrolle wertvoll

**[Slide 3] — Drei Wege zur Kontrolle**
1. Eigene veCRV akkumulieren
2. Wrapper-Strategien (Convex)
3. Bribes zahlen

**[Slide 4] — Die Akteure**
Convex (CVX) — dominant
Yearn (YFI) — moderat
Stake DAO (SDT) — Nische
FRAX — direkte Akkumulation

**[Slide 5] — Timeline**
2020-2021: frühe Locker
2021-2022: Convex-Ascent
2022: Peak Wars
2022-2023: UST/FTX-Folgen
2023+: Stabilisierung

**[Slide 6] — Bribe-Wirtschaft**
Votium, Quest, Warden
10-50M USD/Monat in Spitzen
5-10x Hebel für Protokolle
5-15% APR für Voter

**[Slide 7] — Ethische Debatten**
Zentralisierung (Convex 50%+)
Bribes = Korruption?
CRV-Abhängigkeits-Risiko

**[Slide 8] — Implikationen für Nutzer**
LP-Renditen variabel
Bribes als Einkommens-Quelle
Höchste APRs meist gepusht
Convex als praktischer Zugang

### Voice Narration Script

**[Slide 1]** Curve Wars ist die informelle Bezeichnung für einen jahrelangen Wettkampf zwischen Protokollen um Kontrolle über CRV-Emissionen. Eine der faszinierendsten Machtdynamiken in DeFi.

**[Slide 2]** Warum der Kampf. CRV-Emissionen sind Liquiditäts-Incentives. Für Stablecoin-Protokolle wie FRAX, MIM, USDD sind tiefe Curve-Pools existenziell. Für LST-Protokolle wie Lido und Rocket Pool sind sie primäre Exit-Liquidität. Der CRV-Emissions-Markt ist ein Multi-Milliarden-USD-Markt für Liquiditäts-Incentives. Kontrolle darüber ist entsprechend wertvoll.

**[Slide 3]** Drei Wege, CRV-Emissionen zu kontrollieren. Erstens: eigene veCRV akkumulieren durch Marktkauf und 4-Jahre-Lock. Teuer und gebunden. Zweitens: Nutzer incentivieren, CRV für dich zu locken — so entstand Convex. Drittens: Bribes an bestehende veCRV-Halter zahlen, damit sie ihre Stimmen auf deinen Pool richten. Plattformen wie Votium organisieren diesen Markt.

**[Slide 4]** Die vier großen Akteure. Convex Finance, dominanter Akteur mit über 50 Prozent aller veCRV in Spitzenzeiten. Yearn Finance mit yCRV als kleinere, ähnliche Konstruktion. Stake DAO mit sdCRV als Nische. FRAX Finance mit direkter CRV-Akkumulation als Stablecoin-Protokoll mit eigenen Interessen.

**[Slide 5]** Timeline. 2020-2021: frühe Locker verstehen das ve-Modell. Mitte 2021: Convex launcht, akkumuliert rapid. 2022: Peak Wars mit aggressivem CVX-Kauf durch andere Protokolle. Curve Wars werden zu Convex Wars. Mai 2022: Terra UST-Kollaps. November 2022: FTX-Kollaps. Einige Curve-Wars-Akteure wie MIM erleiden Krisen. 2023-2024: Stabilisierung, Convex bleibt dominant. 2025-2026: Post-Curve-Wars-Landschaft, ve-Design hat sich etabliert, multiple ve-Ökosysteme parallel.

**[Slide 6]** Die Bribe-Wirtschaft im Detail. Votium ist die größte Plattform. Quest und Warden als Alternativen. Direct-Bribes auch möglich. In Spitzenzeiten flossen 10 bis 50 Millionen Dollar pro Monat in Bribes. Heute ruhiger, aber mehrere Millionen monatlich. Wirtschaftliche Logik: 1 Million Dollar Bribe bringt 5 bis 10 Millionen in CRV-Emissionen zum Pool. 5 bis 10-fach Hebel. Für Voter: typisch 5 bis 15 Prozent APR aus Bribes, plus Base-Rewards.

**[Slide 7]** Ethische Debatten. Zentralisierungs-Kritik: Convex mit 50 Prozent der veCRV ist faktische Governance-Konzentration, widerspricht dem Dezentralisierungs-Ideal. Bribe-Kritik: macht Stimmrechte "käuflich", manche sehen das als Korruption, andere als transparente Demokratie. CRV-Abhängigkeits-Risiko: Protokolle die von CRV-Emissionen abhängen, sind gefährdet wenn CRV selbst in Schieflage gerät. Die positive Sicht: effiziente Liquiditäts-Märkte sind entstanden, Stablecoins und LSTs haben tiefe Pools, DeFi als Ganzes ist effizienter geworden.

**[Slide 8]** Implikationen für normale Nutzer. LP-Renditen sind variabel — Emissionen zu einem Pool hängen von Voting-Dynamiken ab. Pools "in fashion" haben hohe APRs, kippen kann zu drastischen Rückgängen führen. Bribes sind eine Einkommens-Quelle für vlCVX-Halter. Höchste APRs sind meist nicht zufällig — sie werden aktiv gepusht. In Teil B behandeln wir Convex im Detail und zeigen, wie ein normaler Nutzer praktisch von dieser Dynamik profitieren kann, ohne selbst CRV für 4 Jahre zu locken.

### Visual Suggestions

**[Slide 1]** Titelfolie.

**[Slide 2]** **SCREENSHOT SUGGESTION:** DeFiLlama CRV-Emissions-Dashboard.

**[Slide 3]** Drei-Wege-Diagramm mit Kosten/Nutzen.

**[Slide 4]** Vier-Akteure-Karten mit Marktanteilen.

**[Slide 5]** Timeline-Visualisierung 2020-heute.

**[Slide 6]** **SCREENSHOT SUGGESTION:** Votium-Bribe-Interface.

**[Slide 7]** Pro/Contra-Tabelle der ethischen Debatten.

**[Slide 8]** Retail-Implikationen-Checkliste.

### Exercise

**Aufgabe: Aktuelle Curve-Wars-Dynamik analysieren**

Besuche [llama.airforce](https://llama.airforce) (oder eine ähnliche Analytics-Plattform für Curve/Convex-Daten).

Recherchiere:
1. Aktueller Convex-Anteil am Total veCRV (Prozent)
2. Top-5-Pools mit höchsten CRV-Emissionen aktuell
3. Aktuelle Bribe-Raten auf Votium für die Top-3-Pools
4. Welche Protokolle zahlen die höchsten Bribes aktuell?

**Deliverable:** Daten-Tabelle + Reflexion (8-12 Sätze): Hat sich die Dynamik im Vergleich zum Peak 2022 geändert? Welche Protokolle sind "in" oder "out"? Was sagt das über die allgemeine DeFi-Markt-Richtung?

### Quiz

**Frage 1:** Warum ist die Aussage "Curve Wars haben DeFi zentralisiert" gleichzeitig wahr und eine Vereinfachung?

<details>
<summary>Antwort anzeigen</summary>

Beide Perspektiven haben Wahrheit, die sich nicht widerspricht, sondern auf verschiedenen Ebenen operiert. **Warum "zentralisiert" wahr ist:** Convex kontrolliert in Spitzenzeiten über 50% des gesamten veCRV. Das bedeutet: bei jeder Gauge-Weight-Abstimmung hat Convex faktisch die Majorität der Stimmen (oder zumindest das Zünglein an der Waage). Ein einzelnes Protokoll — mit seinem eigenen Governance-Token CVX — kontrolliert damit indirekt einen Multi-Milliarden-USD-Liquiditäts-Fluss. Das ist formal gesehen eine Zentralisierung. Wenn Convex eines Tages entscheiden würde, seine Votes alle an einen einzigen Pool zu richten, könnte es die gesamte Curve-Emissions-Logik kurzfristig verzerren. Das widerspricht dem Dezentralisierungs-Ideal von DeFi. **Warum "zentralisiert" eine Vereinfachung ist:** Erstens: **Convex hat selbst dezentralisierte Governance.** Die Voting-Macht von Convex wird nicht zentral entschieden — sie wird durch vlCVX-Halter bestimmt, die selbst Tausende von Wallets sind. Convex ist also ein "Layer der Dezentralisierung" über Curve. Die effektive Kontrolle ist verteilt über vlCVX-Halter, nicht bei einer einzelnen Person. Zweitens: **vlCVX-Halter-Struktur.** Die vlCVX-Verteilung ist relativ breit. Keine einzelne Entität kontrolliert eine vlCVX-Majorität. Top-Halter haben meist <5% der vlCVX — weit entfernt von Dominanz. Drittens: **Bribes demokratisieren Voting-Power.** Durch Votium und ähnliche Plattformen können Protokolle direkt Bribes zahlen, um vlCVX-Voter zu incentivieren. Das bedeutet: auch wenn ein Protokoll selbst wenig vlCVX hält, kann es durch Bribes effektive Voting-Power kaufen. Das ist ein Markt-Mechanismus, kein zentraler Entscheider. Viertens: **Die "Konzentration" ist wirtschaftlich rational.** Convex's Dominanz entstand nicht durch Zentralmacht, sondern durch besseres Produkt-Design (höhere Rewards für CRV-Locker). Nutzer wählten Convex freiwillig. Das ist anders als eine "top-down" Zentralisierung. Fünftens: **Alternative Optionen existieren.** Yearn, Stake DAO, und direktes veCRV-Hold sind weiterhin alle möglich. Niemand wird gezwungen, Convex zu nutzen. Die "Zentralisierung" ist eine Folge von Marktwahlen, nicht Zwang. **Die nuancierte Wahrheit:** Convex ist ein "centralized decentralization layer" — es bündelt Voting-Power auf der Curve-Ebene, ist aber selbst auf einer anderen Ebene dezentralisiert. Das ist eine komplexe Struktur, die keine einfache "zentral vs. dezentral"-Einordnung erlaubt. **Vergleich:** Das ist ähnlich wie bei Proof-of-Stake-Chains: Staking-Pools bündeln Stake, aber sind selbst verteilte Entitäten. Lido (für ETH-Staking) hat in der Ethereum-Community ähnliche Debatten ausgelöst — ist es Zentralisierung, wenn 30% aller Ethereum-Stakes bei Lido sind? Die Antwort: formal ja, aber die Lido-interne Struktur (Node Operators) ist auch verteilt. **Für den Nutzer:** Die "Zentralisierung" durch Convex ist real, aber nicht direkt bedrohlich. Konsequenzen sind eher subtil — wenn Convex eine Entscheidung trifft, beeinflusst das den gesamten Curve-Markt. Aber Convex hat Incentive, keine destruktiven Entscheidungen zu treffen (es würde sein eigenes Produkt beschädigen). Das System ist selbst-regulierend durch Incentive-Alignment. Die ehrliche Bewertung: Curve Wars haben eine neue, komplexe Machtstruktur in DeFi geschaffen. Diese ist weder perfekt dezentral noch autoritär zentral. Sie ist ein neues hybrides Modell, das eigene Trade-offs hat. Wer DeFi fair bewerten will, muss diese Nuancen sehen, nicht in Schwarz/Weiß denken.
</details>

**Frage 2:** Stell dir vor, du launchst ein neues Stablecoin-Protokoll und brauchst einen tiefen Curve-Pool für deinen Stablecoin. Welche drei Strategien würdest du verfolgen, und in welcher Reihenfolge?

<details>
<summary>Antwort anzeigen</summary>

Eine realistische Launch-Strategie für ein neues Stablecoin-Protokoll mit Curve-Fokus. **Phase 1: Pool-Aufbau und Bribe-Strategie (Monate 0-6).** Priorität 1: Einen Curve-Pool mit deinem Stablecoin gegen 3pool oder andere Stables launchen. Das ist administrativ einfach, aber kritisch — ohne Pool gibt es nichts zu incentivieren. Priorität 2: Bribe-basierte Liquiditäts-Anziehung. Als neues Protokoll hast du wahrscheinlich eigene Token-Emissionen. Du kannst einen Teil davon in Bribes auf Votium oder Warden investieren, um vlCVX-Halter zu incentivieren, ihren Vote auf deinen Pool zu richten. Das erzeugt CRV-Emissionen zu deinem Pool, was LPs anzieht. Wirtschaftliche Logik: jeder Dollar in Bribes bringt typisch 3-10 Dollar in CRV-Emissionen zu deinem Pool. Pool wächst, Peg stabilisiert sich. Budget: 100.000-500.000 USD pro Monat in eigener Token-Währung für Bribes. Priorität 3: Gleichzeitig: mindestens minimaler CVX-Hold als "Commitment-Signal". 10.000-50.000 CVX zeigt Nutzern, dass dein Protokoll langfristig bei Curve denkt. Das verbessert die Bribe-Annahme-Rate und die Community-Wahrnehmung. **Phase 2: Mid-Term-Stabilisierung (Monate 6-18).** Priorität 1: Bribe-Effizienz optimieren. Nicht alle Bribe-Plattformen sind gleich effizient. Erfahrung sammeln über Votium vs. Quest vs. direkte Bribes. Investieren, wo der beste Hebel ist. Priorität 2: Eigenes CRV akkumulieren. Zusätzlich zu Bribes: direkter Kauf von CRV auf offenem Markt und 4-Jahres-Lock. Das ist langfristig teurer als Bribes pro einzelnem Vote, aber gibt dauerhafte Voting-Power. Kombination ist oft optimal: Bribes für taktische Flexibilität, veCRV-Hold für strategische Stabilität. Priorität 3: Community-Aufbau. Eigene Governance-Token-Halter anziehen, die loyal ihr Interesse vertreten. Das reduziert Abhängigkeit von externen Bribes. **Phase 3: Long-Term-Position (Monate 18+).** Priorität 1: vlCVX-Akkumulation. Wenn genug Protokoll-Revenue existiert, ein Teil in vlCVX (Convex's Voting-Token) investieren. Das gibt dem Protokoll direkte Voting-Power im Convex-Ökosystem, effizienter als dauerhafte Bribes. Priorität 2: Diversifizierung der Liquiditäts-Strategien. Curve ist wichtig, aber nicht der einzige Markt. Gleichzeitig Balancer, Uniswap V3 konzentrierte Liquidität, andere DEX-Integrationen aufbauen. Nicht zu sehr von einem einzelnen Protokoll abhängig machen. Priorität 3: Protokoll-Governance für LP-Incentivierung. Eventuell eigene ve-Struktur aufbauen, wo Halter deines Governance-Tokens locken können für Boost auf deinem Stablecoin-Pool. Das schließt den Kreis der Incentivierung innerhalb deines eigenen Ökosystems. **Warum diese Reihenfolge:** Frühe Phase (Bribes-first) ist günstig und schnell. Mittlere Phase (Diversifizierung) baut Robustheit. Späte Phase (eigene ve-Struktur) reduziert externe Abhängigkeiten. **Was zu vermeiden ist:** Erstens: gigantische CRV-Akkumulation von Tag 1. Das bindet zu viel Kapital zu früh, bevor du weißt, ob dein Protokoll überlebt. Zweitens: Alles-auf-Bribes-Strategie ohne eigene Position. Wenn Bribes teurer werden oder du weniger Budget hast, kollabiert deine Liquidität. Drittens: Curve allein als Liquiditäts-Strategie. Single-Protocol-Risk ist zu hoch. **Realistische Einschätzung:** Diese Strategie war die Standard-Roadmap für neue Stablecoins 2021-2022. Protokolle, die das gut umgesetzt haben (FRAX, MIM, Magic Internet Money in früherer Phase), wuchsen schnell. Protokolle, die es ignoriert haben, blieben klein oder starben. 2024-2025 hat sich die Landschaft geändert — Curve ist weniger zentral, andere DEXs (Uniswap V4, Balancer) bieten Alternativen. Die Strategie muss angepasst werden, aber die Grundprinzipien (Bribes, ve-Akkumulation, Diversifizierung) bleiben gültig.
</details>

---

## Hinweis: Ende von Teil A

Du hast Lektionen 13.1, 13.2 und 13.3 abgeschlossen. In **Teil B** behandeln wir:

- **Lektion 13.4:** Convex Finance im Detail — die Wrapper-Mechanik, cvxCRV, vlCVX
- **Lektion 13.5:** Weitere ve-Modelle — Balancer (vlAURA), Pendle (vePENDLE), Velodrome/Aerodrome
- **Lektion 13.6:** Praktische Retail-Strategien — wann lohnt sich was für dich konkret?

Plus: Modul-Abschluss-Quiz (5 Fragen) und Modul-Zusammenfassung.

Teil B führt das Wissen in konkrete, umsetzbare Retail-Strategien über.

---

*Ende von Teil A.*
