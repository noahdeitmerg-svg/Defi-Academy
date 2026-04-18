# Impermanent Loss: Die Mathematik

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Impermanent Loss mechanisch herleiten und anhand konkreter Zahlen berechnen
- Die IL-Tabelle für verschiedene Preisänderungen anwenden
- Verstehen, warum IL nicht "verschwindet", wenn der Preis zurückkehrt — außer strikt auf das Einstiegslevel
- Den Unterschied zwischen "Impermanent" und "Realized" Loss beim Beenden einer LP-Position korrekt erklären
- Ein IL-Diagramm (Preisabweichung vs. IL-%) für einen Standard-V2-Pool lesen und zur Entscheidungsfindung nutzen
- IL-Dynamik in Stablecoin-Pools, Blue-Chip-Pools und volatilen Long-Tail-Pools qualitativ unterscheiden

## Erklärung

**Impermanent Loss (IL)** ist der Unterschied zwischen dem Wert eines LP-Anteils und dem Wert, den man gehabt hätte, wenn man die Tokens einfach nur gehalten hätte. Das "Impermanent" im Namen ist irreführend — der Verlust ist real, sobald man die Position schließt. Er ist nur dann "impermanent", wenn der Preis strikt auf das Einstiegslevel zurückkehrt.

**Die Intuition**

Wenn du einem Pool beitrittst, hältst du einen Anteil an beiden Tokens. Wenn sich die Preise verändern, verschiebt der AMM das Verhältnis im Pool — er gibt das teurere Asset her und nimmt das billigere auf, wegen Arbitrage. Das bedeutet: Wenn ETH steigt, verkauft der Pool dein ETH gegen USDC. Wenn ETH fällt, nimmt der Pool USDC und gibt dir ETH zurück.

Das Problem: Der Pool verkauft dein ETH **zu früh** (bevor der volle Anstieg) und kauft dein ETH **zu früh** (bevor der volle Fall). Er ist strukturell immer auf der falschen Seite der Bewegung.

**Die Formel**

Für einen V2-Pool (Constant-Product) bei einem Preisverhältnis-Faktor `r` (aktueller Preis geteilt durch Einstiegspreis) ist der Impermanent Loss:

```
IL(r) = 2 · √r / (1 + r) − 1
```

Diese Formel ist die relative Abweichung des LP-Wertes vom Buy-and-Hold-Wert.

**Konkrete Zahlen (Standard-IL-Tabelle)**

| Preisänderung | IL |
|---|---|
| 1,25x (+25%) | −0,6% |
| 1,5x (+50%) | −2,0% |
| 1,75x (+75%) | −3,8% |
| 2x (+100%) | −5,7% |
| 3x (+200%) | −13,4% |
| 4x (+300%) | −20,0% |
| 5x (+400%) | −25,5% |
| 10x (+900%) | −42,6% |

Die Tabelle ist symmetrisch: Ein Preisanstieg von 2x erzeugt denselben IL wie ein Preisabfall auf 0,5x. Die Mathematik kennt die Richtung nicht — nur das Verhältnis.

**Beispiel 1: ETH steigt moderat**

Du trittst einem ETH/USDC-Pool bei, wenn ETH bei 3.000 USDC steht. Einlage: 1 ETH + 3.000 USDC (Wert: 6.000 USDC).

Nach einem Jahr steht ETH bei 4.500 USDC (Preisänderung = 1,5x, IL ≈ −2,0%).

**Hätte-gehalten-Wert:** 1 × 4.500 + 3.000 = 7.500 USDC
**LP-Wert (ohne Gebühren):** 7.500 × (1 − 0,02) = 7.350 USDC
**Impermanent Loss in USD:** 150 USDC

Wenn der Pool in diesem Jahr durchschnittlich 5% Gebühren generiert hat (also +300 USDC auf 6.000 USDC), liegt die Netto-Rendite bei +150 USDC statt +1.500 USDC bei Buy-and-Hold. Der LP hätte 10x weniger verdient.

**Beispiel 2: ETH verdoppelt sich**

Gleicher Einstieg, aber ETH steigt auf 6.000 USDC (2x, IL ≈ −5,7%).

**Hätte-gehalten:** 1 × 6.000 + 3.000 = 9.000 USDC
**LP-Wert (ohne Gebühren):** 9.000 × (1 − 0,057) = 8.487 USDC
**IL in USD:** 513 USDC

Gebühren müssten mehr als 513 USDC über das Jahr bringen, damit LP-Sein sich überhaupt gelohnt hat — und auch dann ist Buy-and-Hold profitabler, es sei denn, die Gebühren sind extrem hoch.

**Warum "Impermanent"?**

Wenn der Preis **exakt** auf das Einstiegslevel zurückkehrt, ist der IL null. Mathematisch: IL(1) = 2·√1 / (1+1) − 1 = 2/2 − 1 = 0.

Aber: In der Praxis ist die Wahrscheinlichkeit, dass ein Preis exakt auf ein bestimmtes Level zurückkehrt, null. Jede andere Position — egal ob höher oder niedriger — erzeugt IL. "Impermanent" heißt: theoretisch reversibel bei exakter Preis-Rückkehr. Praktisch ist IL fast immer permanent, sobald die Position geschlossen wird.

**Wann IL in Ordnung ist**

IL ist nicht per se "schlecht". Wenn die Gebühren-Rendite den IL überkompensiert, ist LP-Sein profitabel. Die Frage ist also nicht "gibt es IL?", sondern "übersteigen die Gebühren den erwarteten IL?".

Für konservative Strategien gilt:
- **Hohe Volatilität + niedrige Gebühren** = IL dominiert, LP-Sein ineffizient
- **Niedrige Volatilität + vernünftige Gebühren** = Gebühren dominieren, LP-Sein lohnt sich
- **Gepeggte Assets (Stablecoin-Paare, Liquid-Staking-Paare)** = minimaler IL, stabile Gebühren → bevorzugter Bereich für konservatives LP

Diese Logik erklärt, warum Curve als Stablecoin-spezialisierter DEX für konservative LPs oft sinnvoller ist als Uniswap V2 auf volatilen Paaren. Dazu mehr in Lektion 5.6.

## Folien-Zusammenfassung

**[Slide 1] — Titel**
Impermanent Loss: Die Mathematik

**[Slide 2] — Die Intuition**
AMM verkauft den teuren, kauft den billigen — immer zu früh.
Strukturell auf der falschen Seite der Bewegung.

**[Slide 3] — Die Formel**
IL(r) = 2·√r / (1 + r) − 1
Relative Abweichung vom Buy-and-Hold.

**[Slide 4] — Die IL-Tabelle**
2x → −5,7%
3x → −13,4%
5x → −25,5%
10x → −42,6%

**[Slide 5] — Symmetrie**
2x und 0,5x erzeugen gleichen IL.
Richtung egal, nur Verhältnis zählt.

**[Slide 6] — Warum "impermanent"**
IL = 0 nur bei exakter Preis-Rückkehr.
Praktisch ist IL fast immer permanent bei Positionsschluss.

**[Slide 7] — Wann IL ok ist**
Gebühren > IL → profitabel.
Niedrige Volatilität + vernünftige Gebühren = konservativ-tauglich.

## Sprechertext

**[Slide 1]** Impermanent Loss ist das zentrale Konzept für LPs. Ohne IL zu verstehen, ist LP-Sein Glücksspiel. Mit Verständnis wird es kalkulierbares Risiko.

**[Slide 2]** Die Intuition zuerst. Wenn du im Pool bist und der ETH-Preis steigt, verkauft der Pool dein ETH wegen Arbitrage — zu jedem Preisschritt, nicht nur am Ende. Das heißt, der Pool verkauft dein ETH zu früh, bevor der volle Anstieg realisiert ist. Wenn der Preis fällt, kauft der Pool zusätzliches ETH — auch zu früh. Strukturell bist du immer auf der falschen Seite der Bewegung.

**[Slide 3]** Die Formel ist deterministisch. IL gleich 2 mal Wurzel aus r, geteilt durch 1 plus r, minus 1. r ist der Preisverhältnis-Faktor. Das Ergebnis ist die relative Abweichung des LP-Werts vom Buy-and-Hold-Wert. Negativ, weil IL ein Verlust ist.

**[Slide 4]** Die konkrete Tabelle. Bei 2x Preisänderung — egal in welche Richtung — sind das 5,7 Prozent IL. Bei 3x sind es 13,4. Bei 5x bereits 25,5. Bei 10x über 42 Prozent. Die Zahlen wachsen nicht linear, sondern konvex — je extremer die Bewegung, desto schmerzhafter.

**[Slide 5]** Die Formel ist symmetrisch. Eine Preisverdopplung erzeugt genauso viel IL wie eine Halbierung. Das heißt: egal ob der Bullmarkt kommt oder der Bärmarkt — wenn das Paar volatil ist, wirst du IL erleben.

**[Slide 6]** Warum heißt es "impermanent". Mathematisch: wenn der Preis exakt auf das Einstiegslevel zurückkehrt, ist IL null. Aber in der Praxis ist die Wahrscheinlichkeit einer exakten Rückkehr null. Du schließt die Position irgendwann zu irgendeinem Preis — und dann ist der IL real. "Impermanent" ist ein Marketing-Begriff aus der frühen DeFi-Zeit. Behandle es als normalen, permanenten Verlust bei deiner Rechnung.

**[Slide 7]** Wann ist IL akzeptabel? Wenn die Gebühren den IL überkompensieren. Die Formel-Logik: hohe Volatilität plus niedrige Gebühren bedeutet, IL dominiert, und LP-Sein ist ineffizient. Niedrige Volatilität plus vernünftige Gebühren bedeutet, Gebühren dominieren, und LP-Sein lohnt sich. Das erklärt, warum gepeggte Assets — Stablecoin-Paare, Liquid-Staking-Paare — für konservative LPs bevorzugter Bereich sind. Curve als Stablecoin-DEX ist deshalb für den Kapital-Erhalter meist interessanter als Uniswap V2 auf volatilen Paaren.

## Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Diagramm: Preiskurve vs. AMM-Position über die Zeit. Der AMM "läuft hinterher".

**[Slide 3]** Formel-Darstellung mit klaren Variablen.

**[Slide 4]** Die IL-Tabelle als große, lesbare Grafik. Farblich kodiert (grün bei geringem IL, rot bei hohem).

**[Slide 5]** Symmetrie-Diagramm: 2x und 0,5x als Spiegelbild, IL identisch.

**[Slide 6]** Preiskurve, die auf Einstiegslevel zurückkehrt — IL bei 0. Daneben zweite Kurve, die "nahe dran" endet — IL immer noch positiv.

**[Slide 7]** Entscheidungsmatrix: Volatilität (niedrig/hoch) × Gebühren (niedrig/hoch), mit Empfehlung pro Quadrant.

## Übung

**Aufgabe: IL-Berechnung für drei Szenarien**

Du trittst einem ETH/USDC-Pool bei mit 1 ETH + 3.000 USDC (ETH-Preis = 3.000 USDC).

Berechne jeweils:
- Hätte-gehalten-Wert
- LP-Wert (ohne Gebühren) mit IL-Formel
- Absoluter IL in USD

**Szenario A:** ETH steigt auf 3.750 USDC (1,25x)
**Szenario B:** ETH steigt auf 4.500 USDC (1,5x)
**Szenario C:** ETH fällt auf 2.000 USDC (0,667x)

Nutze die IL-Formel `IL = 2·√r / (1 + r) − 1` oder die Tabelle.

**Deliverable:** Tabelle mit drei Zeilen, die die Rechnung für jedes Szenario zeigt. Am Ende eine Einschätzung (2–3 Sätze): Welches Szenario ist am schmerzhaftesten, und warum? (Hinweis: Berücksichtige, dass ein Fall auf 0,667x symmetrisch einer Bewegung auf 1,5x in Bezug auf IL entspricht.)

## Quiz

**Frage 1:** Ein LP hat eine Position in einem ETH/USDC-Pool. ETH bewegt sich von 3.000 auf 4.500 und dann wieder zurück auf 3.000. Was ist der IL zum Endzeitpunkt?

<details>
<summary>Antwort anzeigen</summary>

Null. Mathematisch: r = 3.000 / 3.000 = 1. IL(1) = 2·√1 / (1+1) − 1 = 0. Das ist das "impermanent" in Impermanent Loss — bei exakter Preis-Rückkehr auf das Einstiegslevel verschwindet der IL. Zwischenzeitlich war der IL jedoch präsent (bei ETH = 4.500 lag er bei etwa −2%). Ein LP, der die Position bei 4.500 geschlossen hätte, wäre mit dem IL realisiert worden. Wichtig: Während der Periode konnte der LP Gebühren einnehmen, die nicht verschwinden. Die Gebühren-Einnahmen plus IL = 0 beim Schluss ergeben das Netto-Ergebnis des LP.
</details>

**Frage 2:** Warum ist IL für einen LP auf ETH/USDC (volatile Paar) strukturell viel höher als für einen LP auf USDC/USDT (Stablecoin-Paar)?

<details>
<summary>Antwort anzeigen</summary>

Weil IL exponentiell mit dem Preisänderungs-Faktor wächst. Stablecoins halten einen engen Peg um 1:1 — typische Schwankungen liegen bei 0,1–0,5%, was IL von unter 0,01% erzeugt. ETH/USDC schwankt routinemäßig um 10–20% pro Monat, mit Verdoppelungen oder Halbierungen innerhalb von Jahren — was IL von 5–25% oder mehr erzeugt. Bei Stablecoin-Paaren ist der IL also praktisch vernachlässigbar, während die Gebühren stabil eingenommen werden können. Deshalb sind Stablecoin-LP-Positionen auf Curve oder ähnlichen Protokollen für konservative Strategien deutlich besser geeignet als volatile Paare.
</details>

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Slides: Titel → IL-Mechanik → Herleitung der Formel → IL-Tabelle für Preisänderungen → Impermanent vs. Realized Loss → IL-Diagramm → IL in verschiedenen Pool-Typen
- `voice_script.txt` — *Voice Narration Script* (120–140 WPM, Zielvideo 10–12 Min.)
- `visual_plan.json` — IL-Formel-Herleitung, Preisabweichung-vs-IL-Kurve, IL-Tabelle (0/25/50/100/500%), Impermanent-vs-Realized-Vergleich, Pool-Typ-Matrix (Stable/Blue-Chip/Volatil)

Pipeline: Gamma → ElevenLabs → CapCut.

---
