# Modul 5 — Liquidity Pools

**Zielgruppe:** Einsteiger bis Fortgeschrittene
**Geschätzte Dauer:** 90–110 Minuten
**Voraussetzungen:** Module 1–4 abgeschlossen

**Kursstufe:** Core (DeFi-Kernstrategien)
**Lektionsanzahl:** 6
**Didaktische Ausrichtung:** LP-Grundlagen, Impermanent Loss, Netto-Rendite-Berechnung, V2 & V3 Praxis, Curve/StableSwap
**Konformität:** Final Fix Document v1 — Struktur, Terminologie und Pipeline-Assets harmonisiert

**Harmonisierte Terminologie (gültig im gesamten Modul):**
- Liquidity Provider (LP), LP-Token, Pool Share
- Impermanent Loss (IL), Divergence Loss
- LP Profitability = Fees + Rewards − IL − Gas
- Fee Tier, Range / Tick (V3)
- StableSwap Formula (Curve)
- Depeg Risk, Smart Contract Risk, Composability Risk
- Yield Strategy, Sustainable vs. Temporary Yield
- Total Value Locked (TVL)

**Querverweise:**
- Impermanent-Loss-Diagramme und LP-Profitabilitäts-Beispiele sind modulspezifische Fix-Doc-Erweiterungen und werden in Lektion 5.2 (Mathematik) und 5.3 (Fees vs. IL) explizit didaktisch aufbereitet.
- Curve als Protokoll ist hier an Pool-Mechanik orientiert; veCRV/Gauge Wars werden in Modul 13 vertieft.
- Yield-Stack-Perspektive (nachhaltig vs. temporär) wird in Modul 9 erweitert.

**Video-Pipeline:** Jede Lektion ist für Gamma (Slides) → ElevenLabs (Voice) → CapCut (Video) vorbereitet. Zielvideo-Länge pro Lektion: 8–10 Minuten (120–140 WPM).

---

## Modul-Überblick

In Modul 4 hast du gelernt, wie Swaps funktionieren — aus Sicht des Swappers, der gegen einen Pool handelt. In diesem Modul drehen wir die Perspektive. Du wirst der Pool. Du stellst Liquidität bereit und kassierst Gebühren von jedem Swap. Das ist eine der ältesten und meistzitierten DeFi-Einkommensquellen — und gleichzeitig eine der am häufigsten missverstandenen.

Die Realität ist unbequem: Für viele Liquidity-Provider-Positionen (LPs) wäre es profitabler gewesen, die Tokens einfach zu halten. Das Phänomen heißt **Impermanent Loss**, und es ist mathematisch unvermeidbar bei jeder Preisänderung des Asset-Paares. Ob die Gebühren den IL überkompensieren oder nicht, entscheidet über Erfolg oder Verlust.

Dieses Modul behandelt LP-Positionen nüchtern und konservativ. Ziel ist **nicht**, LP-Renditen zu maximieren. Ziel ist, zu verstehen, wann LP-Sein tatsächlich sinnvoll ist und wann nicht — passend zu einem konservativen Portfolio mit 7–8% Renditeerwartung.

**Lektionen:**
1. Was ein Liquiditätsanbieter wirklich ist
2. Impermanent Loss — die Mathematik
3. Die wahre Rendite: Fees vs. IL
4. V2-LP in der Praxis
5. V3-konzentrierte LPs — Wann sinnvoll, wann nicht
6. Stable LP-Strategien: Curve und gepeggte Assets

---

## Lektion 5.1 — Was ein Liquiditätsanbieter wirklich ist

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die Rolle eines LP im AMM-System präzise beschreiben
- Erklären, was ein LP-Token repräsentiert
- Die zwei Einnahmequellen eines LP unterscheiden: Gebühren vs. Rewards
- LP-Positionen gegenüber Buy-and-Hold als strukturell unterschiedliche Strategien einordnen
- Die Rolle der Pool-Tiefe (Total Value Locked / TVL) für individuelle LP-Returns quantitativ einschätzen
- Eine erste LP-Entscheidung (Pool, Volumen, Fee-Tier) strukturiert vorbereiten

### Erklärung

Ein Liquiditätsanbieter — kurz **LP** — deponiert ein Paar Tokens in einem AMM-Pool. Im Gegenzug erhält er einen Anteil am Pool, repräsentiert durch einen **LP-Token**. Dieser Anteil gibt ihm Anspruch auf einen proportionalen Teil des Pools und der eingenommenen Gebühren.

**Der Einzahlungs-Vorgang**

Ein Uniswap-V2-ETH/USDC-Pool hat zum Beispiel 1.000 ETH und 3.000.000 USDC. Der Gesamt-Pool-Wert ist 6.000.000 USDC (1.000 × 3.000 + 3.000.000). Wenn du 1 ETH und 3.000 USDC einzahlst, trägst du 0,1% des Pool-Wertes bei. Im Gegenzug erhältst du LP-Tokens, die 0,1% der Gesamt-LP-Token-Supply repräsentieren.

**Wichtig:** V2-Pools erfordern, dass du **beide Tokens im aktuellen Verhältnis** einzahlst. Du kannst nicht nur ETH ohne USDC hinzufügen. Wenn du nur ein Asset hast, musst du die Hälfte swappen, bevor du LP wirst — das kostet Gas und Slippage.

**Was der LP-Token repräsentiert**

Der LP-Token ist ein ERC-20-Token, der deinen Pool-Anteil verkörpert. LP-Tokens repräsentieren den prozentualen Anteil eines Nutzers am Liquidity Pool. Sie haben drei wichtige Eigenschaften:

1. **Er wächst im Wert**, wenn der Pool wächst (durch Gebühren-Einnahmen).
2. **Er ist transferierbar** — du kannst ihn an eine andere Adresse senden, und der Empfänger hält dann den Pool-Anteil.
3. **Er ist einlösbar** — du kannst ihn zu jedem Zeitpunkt gegen deinen proportionalen Anteil an den Pool-Tokens tauschen.

Wenn du 1% der LP-Tokens hältst und der Pool nach einem Jahr 1.200 ETH und 3.600.000 USDC enthält (durch Gebühren-Einnahmen gewachsen), kannst du deinen LP-Token gegen 12 ETH und 36.000 USDC einlösen — deine ursprüngliche Einlage plus dein Anteil an den Gebühren.

**Die zwei Einnahmequellen eines LP**

**Quelle 1: Trading-Gebühren**
Jeder Swap im Pool zahlt eine Gebühr (0,3% Standard bei V2, variabel bei V3). Trading Fees werden proportional zum Poolanteil an Liquidity Provider verteilt. Konkret: Die Gebühr fließt zurück in den Pool und erhöht den Wert der LP-Tokens proportional zum gehaltenen Anteil.

**Quelle 2: Rewards (Liquidity Mining)**
Einige Protokolle zahlen zusätzlich Belohnungen in ihrem nativen Token (z.B. UNI, CRV, BAL), um Liquidität anzuziehen. Diese Rewards sind **separat** von den Trading-Gebühren.

**Wichtige Unterscheidung für konservative Strategien:**
- **Trading-Gebühren** sind nachhaltig — sie reflektieren reales Handelsvolumen.
- **Rewards** sind oft subventioniert — das Protokoll gibt eigene Tokens aus, um die Liquidität anzukurbeln. Wenn die Rewards enden oder der Reward-Token-Preis fällt, verschwindet dieser Ertrag.

Eine LP-Position, deren Rendite zu 80% aus Rewards besteht, ist fragil. Eine Position, die zu 80% aus Trading-Gebühren besteht, ist belastbar. Das ist der Unterschied zwischen einer Farm mit kurzem Lebenszyklus und einer funktionalen Marktmacher-Rolle.

**Was LPs NICHT sind**

Ein häufiger Irrglaube: "LPs sind wie Sparbücher mit hohen Zinsen." Das ist falsch.

Ein LP ist ein Marktmacher. Marktmachen ist eine reale Dienstleistung am Markt — du stellst Liquidität bereit, und im Gegenzug bekommst du Gebühren für dein Risiko. Dieses Risiko heißt Impermanent Loss, und es ist keine theoretische Gefahr, sondern bei jeder Preisänderung mathematisch real. Darauf gehen wir in Lektion 5.2 ein.

**Wer LP-Sein ernst nimmt**

Professionelle Marktmacher (Wintermute, Amber Group, Jump Trading) stellen auf CEXs Liquidität bereit — und verdienen damit Geld. Sie haben hochentwickelte Modelle für Volatilität, Spread und Inventar-Risiko. Retail-LPs in DeFi machen eine vereinfachte Version dieser Dienstleistung. Die gute Nachricht: Du brauchst keine Quant-Modelle, um verantwortlich zu sein. Du brauchst nur zu verstehen, was du tust — und genau das ist Ziel dieses Moduls.

**Warum Pool-Größe zählt**

Große Pools reduzieren den Preisimpact einzelner Trades und verringern dadurch Slippage. Für Trader bedeutet das bessere Ausführungspreise; für LPs bedeutet tiefe Liquidität mehr Handelsvolumen und damit mehr Gebühreneinnahmen pro Dollar Kapital. Die Konsequenz: Pool-Tiefe und Trading-Volumen bedingen sich gegenseitig.

### Folien-Zusammenfassung

**[Slide 1] — Titel**
Was ein Liquiditätsanbieter wirklich ist

**[Slide 2] — LP-Einzahlung**
Paar Tokens in Pool → LP-Token zurück.
V2: beide Tokens im aktuellen Verhältnis.

**[Slide 3] — Der LP-Token**
Repräsentiert Pool-Anteil.
Transferierbar, einlösbar, wertsteigernd bei Gebühreneinnahmen.

**[Slide 4] — Zwei Einnahmequellen**
1. Trading-Gebühren (nachhaltig)
2. Rewards / Liquidity Mining (oft subventioniert)

**[Slide 5] — Die Unterscheidung**
Rewards verschwinden, wenn Programm endet.
Trading-Gebühren spiegeln reales Volumen.
Belastbare LP-Positionen basieren auf Gebühren.

**[Slide 6] — LP ist Marktmachen**
Nicht "Zinsen auf Guthaben".
Dienstleistung am Markt, mit Risiko (IL, siehe Lektion 5.2).

### Sprechertext

**[Slide 1]** In den nächsten sechs Lektionen drehen wir die Perspektive. In Modul 4 warst du Swapper — du hast gegen einen Pool gehandelt. Jetzt bist du der Pool. Du stellst Liquidität bereit, andere handeln gegen dich, und du kassierst einen Teil der Gebühren.

**[Slide 2]** Der Vorgang ist einfach. Du deponierst ein Paar Tokens in einem AMM-Pool. In Uniswap V2 musst du beide Tokens im aktuellen Verhältnis einzahlen. Wenn du nur ein Asset hast, musst du die Hälfte swappen bevor du LP wirst — das kostet Gas und Slippage. Im Gegenzug erhältst du LP-Tokens, die deinen Pool-Anteil repräsentieren.

**[Slide 3]** Der LP-Token ist ein ERC-20-Token. Er verkörpert deinen proportionalen Anteil am Pool. Drei Eigenschaften: er wächst im Wert, wenn der Pool durch Gebühren-Einnahmen wächst. Er ist transferierbar — kannst ihn verschenken oder als Collateral nutzen. Und er ist jederzeit einlösbar gegen deinen Anteil an den Pool-Tokens.

**[Slide 4]** Ein LP hat zwei potenzielle Einnahmequellen. Erstens: Trading-Gebühren. Jeder Swap zahlt eine Gebühr, die zurück in den Pool fließt. Zweitens: Rewards aus sogenanntem Liquidity Mining, wo das Protokoll zusätzlich eigene Tokens verteilt.

**[Slide 5]** Die Unterscheidung ist wichtig für konservative Praxis. Trading-Gebühren sind nachhaltig — sie reflektieren reales Handelsvolumen. Rewards sind oft Subvention — wenn das Protokoll das Reward-Programm beendet oder der Reward-Token im Preis fällt, verschwindet dieser Ertrag. Eine LP-Position, deren Rendite überwiegend aus Rewards besteht, ist fragil. Eine Position, die aus Gebühren lebt, ist belastbar.

**[Slide 6]** Ein LP ist kein Sparbuch. Es ist eine Marktmacher-Rolle. Du stellst Liquidität bereit, und im Gegenzug bekommst du Gebühren für dein Risiko. Dieses Risiko heißt Impermanent Loss, und es ist keine theoretische Gefahr — es ist mathematisch real bei jeder Preisbewegung. In der nächsten Lektion gehen wir in die Mechanik.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Flussdiagramm: Nutzer → ETH + USDC → Pool. Rückfluss: LP-Token. **SCREENSHOT SUGGESTION:** Uniswap-V2-Add-Liquidity-Interface mit ETH/USDC-Paar.

**[Slide 3]** Visualisierung eines wachsenden Pools über die Zeit. LP-Token-Wert skaliert proportional.

**[Slide 4]** Zweispaltige Darstellung: Trading-Gebühren links (Icon: Handshake), Rewards rechts (Icon: Geschenk-Box).

**[Slide 5]** Zeit-Chart: Gebühren stabil über die Zeit, Rewards mit scharfem Abfall nach "Programm-Ende".

**[Slide 6]** Marktmacher-Metapher: Profi-Trading-Desk vs. Retail-DeFi-LP mit derselben Grund-Mechanik.

### Übung

**Aufgabe: Einen realen LP-Pool untersuchen**

1. Öffne info.uniswap.org (Uniswap Analytics).
2. Wähle den ETH/USDC-V2-Pool (nicht V3).
3. Notiere:
 - TVL des Pools
 - 24h-Volumen
 - 24h-Gebühren
 - Anzahl der LPs (falls sichtbar)
4. Berechne: (24h-Gebühren / TVL) × 365 = grobe annualisierte Gebühren-Rendite
5. Vergleiche mit der Ziel-Rendite von 7–8%: übertrifft dieser Pool die Erwartung?

**Deliverable:** Tabelle mit Pool-Daten und deiner Rendite-Berechnung. Kurze Einschätzung (3–4 Sätze): Ist der Pool attraktiv, neutral, oder unattraktiv nach dieser Metrik?

### Quiz

**Frage 1:** Ein LP hält 1% der LP-Tokens eines Pools. Nach einem Jahr haben sich die Pool-Bestände durch Gebühren von "1.000 ETH + 3.000.000 USDC" zu "1.100 ETH + 3.300.000 USDC" entwickelt. Wie viel kann der LP einlösen?

<details>
<summary>Antwort anzeigen</summary>

Der LP kann 1% des aktuellen Pools einlösen: 11 ETH und 33.000 USDC. Das ist mehr als die ursprünglichen 10 ETH und 30.000 USDC — die Differenz von 1 ETH und 3.000 USDC ist der Gebühren-Ertrag (bei einem stabilen Preis). Wichtig: Diese Rechnung geht davon aus, dass der Preis von ETH stabil blieb und der Pool-Wachstum ausschließlich aus Gebühren kommt. Bei Preisänderungen kommt Impermanent Loss ins Spiel — das behandelt die nächste Lektion.
</details>

**Frage 2:** Warum sind LP-Positionen, deren Rendite überwiegend aus Reward-Tokens besteht, strukturell riskanter als Positionen mit hauptsächlich Trading-Gebühren?

<details>
<summary>Antwort anzeigen</summary>

Drei Gründe. Erstens: Reward-Programme haben ein Ende — entweder zeitlich definiert oder durch Governance-Entscheidung beendet. Wenn die Rewards aufhören, bricht die Rendite ein. Zweitens: Reward-Tokens unterliegen eigenem Preis-Risiko. Wenn der Reward-Token (z.B. ein kleiner Governance-Token) im Preis fällt, schrumpft die Rendite in USD-Äquivalent. Drittens: Reward-getriebene Pools ziehen oft "Mercenary Capital" an — LPs, die sofort abziehen, sobald die Rewards sinken. Das führt zu TVL-Kollaps, höherem Preis-Impact bei Swaps und geringerem Gebühren-Ertrag für verbleibende LPs. Gebühren-basierte Pools sind an reales Handelsvolumen gekoppelt und deshalb strukturell stabiler.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 6 Slides: Titel → LP im AMM → LP-Token als Anteilsnachweis → 2 Einnahmequellen (Fees/Rewards) → Pool-Tiefe & Rendite → LP-Entscheidungsraster
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — LP-Rolle-Diagramm, Pool-Share-Visualisierung, Fees/Rewards-Vergleich, TVL-Einfluss auf Rendite-Chart, Uniswap-Pool-Analytics-Screenshot

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 5.2 — Impermanent Loss: Die Mathematik

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Impermanent Loss mechanisch herleiten und anhand konkreter Zahlen berechnen
- Die IL-Tabelle für verschiedene Preisänderungen anwenden
- Verstehen, warum IL nicht "verschwindet", wenn der Preis zurückkehrt — außer strikt auf das Einstiegslevel
- Den Unterschied zwischen "Impermanent" und "Realized" Loss beim Beenden einer LP-Position korrekt erklären
- Ein IL-Diagramm (Preisabweichung vs. IL-%) für einen Standard-V2-Pool lesen und zur Entscheidungsfindung nutzen
- IL-Dynamik in Stablecoin-Pools, Blue-Chip-Pools und volatilen Long-Tail-Pools qualitativ unterscheiden

### Erklärung

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

### Folien-Zusammenfassung

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

### Sprechertext

**[Slide 1]** Impermanent Loss ist das zentrale Konzept für LPs. Ohne IL zu verstehen, ist LP-Sein Glücksspiel. Mit Verständnis wird es kalkulierbares Risiko.

**[Slide 2]** Die Intuition zuerst. Wenn du im Pool bist und der ETH-Preis steigt, verkauft der Pool dein ETH wegen Arbitrage — zu jedem Preisschritt, nicht nur am Ende. Das heißt, der Pool verkauft dein ETH zu früh, bevor der volle Anstieg realisiert ist. Wenn der Preis fällt, kauft der Pool zusätzliches ETH — auch zu früh. Strukturell bist du immer auf der falschen Seite der Bewegung.

**[Slide 3]** Die Formel ist deterministisch. IL gleich 2 mal Wurzel aus r, geteilt durch 1 plus r, minus 1. r ist der Preisverhältnis-Faktor. Das Ergebnis ist die relative Abweichung des LP-Werts vom Buy-and-Hold-Wert. Negativ, weil IL ein Verlust ist.

**[Slide 4]** Die konkrete Tabelle. Bei 2x Preisänderung — egal in welche Richtung — sind das 5,7 Prozent IL. Bei 3x sind es 13,4. Bei 5x bereits 25,5. Bei 10x über 42 Prozent. Die Zahlen wachsen nicht linear, sondern konvex — je extremer die Bewegung, desto schmerzhafter.

**[Slide 5]** Die Formel ist symmetrisch. Eine Preisverdopplung erzeugt genauso viel IL wie eine Halbierung. Das heißt: egal ob der Bullmarkt kommt oder der Bärmarkt — wenn das Paar volatil ist, wirst du IL erleben.

**[Slide 6]** Warum heißt es "impermanent". Mathematisch: wenn der Preis exakt auf das Einstiegslevel zurückkehrt, ist IL null. Aber in der Praxis ist die Wahrscheinlichkeit einer exakten Rückkehr null. Du schließt die Position irgendwann zu irgendeinem Preis — und dann ist der IL real. "Impermanent" ist ein Marketing-Begriff aus der frühen DeFi-Zeit. Behandle es als normalen, permanenten Verlust bei deiner Rechnung.

**[Slide 7]** Wann ist IL akzeptabel? Wenn die Gebühren den IL überkompensieren. Die Formel-Logik: hohe Volatilität plus niedrige Gebühren bedeutet, IL dominiert, und LP-Sein ist ineffizient. Niedrige Volatilität plus vernünftige Gebühren bedeutet, Gebühren dominieren, und LP-Sein lohnt sich. Das erklärt, warum gepeggte Assets — Stablecoin-Paare, Liquid-Staking-Paare — für konservative LPs bevorzugter Bereich sind. Curve als Stablecoin-DEX ist deshalb für den Kapital-Erhalter meist interessanter als Uniswap V2 auf volatilen Paaren.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Diagramm: Preiskurve vs. AMM-Position über die Zeit. Der AMM "läuft hinterher".

**[Slide 3]** Formel-Darstellung mit klaren Variablen.

**[Slide 4]** Die IL-Tabelle als große, lesbare Grafik. Farblich kodiert (grün bei geringem IL, rot bei hohem).

**[Slide 5]** Symmetrie-Diagramm: 2x und 0,5x als Spiegelbild, IL identisch.

**[Slide 6]** Preiskurve, die auf Einstiegslevel zurückkehrt — IL bei 0. Daneben zweite Kurve, die "nahe dran" endet — IL immer noch positiv.

**[Slide 7]** Entscheidungsmatrix: Volatilität (niedrig/hoch) × Gebühren (niedrig/hoch), mit Empfehlung pro Quadrant.

### Übung

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

### Quiz

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

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Slides: Titel → IL-Mechanik → Herleitung der Formel → IL-Tabelle für Preisänderungen → Impermanent vs. Realized Loss → IL-Diagramm → IL in verschiedenen Pool-Typen
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — IL-Formel-Herleitung, Preisabweichung-vs-IL-Kurve, IL-Tabelle (0/25/50/100/500%), Impermanent-vs-Realized-Vergleich, Pool-Typ-Matrix (Stable/Blue-Chip/Volatil)

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 5.3 — Die wahre Rendite: Fees vs. IL

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die korrekte Netto-Rendite-Formel für LPs anwenden
- Realistische Renditen verschiedener LP-Typen einschätzen
- Erkennen, wann LP-Sein im Vergleich zu Buy-and-Hold unterliegt
- Ein vollständiges LP-Profitability-Rechenbeispiel (inkl. Fees, Rewards, IL, Gas) für eine reale Position durchführen
- Sustainable Yield (echte Fee-Generierung) von Temporary Yield (Token-Emissionen, Incentives) unterscheiden
- Anhand historischer Pool-Daten (DeFiLlama, Uniswap-Analytics) die erwartbare Netto-Rendite eines LP-Typs einschätzen

### Erklärung

Die meisten Farm-APY-Anzeigen zeigen nur den Bruttoertrag aus Gebühren (oder Gebühren + Rewards). Die echte Rendite muss IL abziehen. Diese Lektion gibt dir die Werkzeuge für die saubere Rechnung.

**Die Netto-Rendite-Formel**

Für einen LP über einen Zeitraum gilt:

```
Netto-Rendite = Gebühren-Rendite + Reward-Rendite − Impermanent Loss − Gas-Kosten
```

Oft vergessen wird:
- **Gas-Kosten** für Einzahlung, Reward-Claims, eventuell Position-Anpassung, Auszahlung
- **Steuer-Implikationen** auf realisierte Gewinne (länderabhängig)
- **Token-Inflation** bei Reward-Tokens

**Beispielrechnung: ETH/USDC-V2-Pool über ein Jahr**

Gehe von einer fiktiven, aber realistischen Situation aus:
- ETH-Preis zu Beginn: 3.000 USDC
- ETH-Preis am Ende: 4.500 USDC (+50%)
- Einlage: 1 ETH + 3.000 USDC (Wert 6.000 USDC)
- Gebühren-Rendite über das Jahr: 15% (annualisiert)
- Keine Rewards
- Gas-Kosten gesamt: 50 USDC

**Bruttoertrag aus Gebühren:** 15% × 6.000 = 900 USDC

**IL bei 1,5x:** 2,0% → 120 USDC (auf den Endwert gerechnet, hier vereinfacht)

**Netto-LP-Wert am Ende:** 
- Gebühren-Rendite setzt den Pool auf einen etwas höheren Wert
- Komplexer genau zu berechnen; vereinfacht:
- Start: 6.000 USDC + Gebühren 900 − IL 120 − Gas 50 = 6.730 USDC

**Vergleich mit Buy-and-Hold:**
- 1 ETH bei 4.500 + 3.000 USDC = 7.500 USDC

**Ergebnis:** Buy-and-Hold liegt bei 7.500, LP bei 6.730. LP unterliegt um 770 USDC, trotz 15% Gebühren-Rendite.

**Die bittere Wahrheit:** In vielen aktiven DeFi-Zeiträumen mit moderatem Preis-Uptrend hat Buy-and-Hold LP-Sein geschlagen. Das gilt besonders auf volatilen Paaren wie ETH-Stablecoin.

**Wann LP-Sein gewinnt**

Damit LP über Buy-and-Hold gewinnt, müssen die Gebühren **deutlich** höher sein als der IL. Beispielszenarien:

**Szenario A: Stabiler Preis (ETH bleibt bei 3.000)**
- IL: 0%
- Gebühren: 15%
- LP schlägt Buy-and-Hold deutlich.

**Szenario B: Moderate Bewegung (ETH 3.000 → 3.300, +10%)**
- IL: ~0,1%
- Gebühren: 15%
- LP schlägt Buy-and-Hold leicht.

**Szenario C: Starker Uptrend (ETH 3.000 → 6.000, +100%)**
- IL: 5,7%
- Gebühren: 15%
- LP unterliegt Buy-and-Hold deutlich — weil der IL nur ein Teil des Unterschieds ist; der LP hat auch weniger ETH am Ende (er hat zu früh verkauft).

**Szenario D: Seitwärts mit hohem Volumen**
- IL: ~0%
- Gebühren: 25% (wenn Pool-Volumen überdurchschnittlich)
- LP gewinnt stark.

**Die Kern-Regel:** LP ist eine Wette, dass die Volatilität niedriger bleibt als die Gebühren kompensieren. Auf trendstarken volatilen Paaren verliert LP fast immer gegen Buy-and-Hold.

**Wie man realistische Gebühren-Renditen einschätzt**

DefiLlama und info.uniswap.org zeigen für jeden Pool:
- 24h-Gebühren
- TVL
- Implizite annualisierte Rendite (24h-Fees / TVL × 365)

**Wichtige Vorbehalte:**
- Historische Rendite ≠ zukünftige Rendite
- Handelsvolumen variiert stark über Marktzyklen
- Bei neuen Pools mit wenig TVL sind Gebühren überrepräsentiert

**Realistische Bereiche nach Pool-Typ:**

| Pool-Typ | Typische Gebühren-Rendite |
|---|---|
| Stablecoin-Stablecoin (USDC/USDT auf Curve) | 2–5% |
| Liquid-Staking-Paare (stETH/ETH auf Curve) | 2–6% |
| ETH/Stablecoin-Majors (Uniswap V2) | 5–15% |
| ETH/Stablecoin-Majors (Uniswap V3 passend positioniert) | 8–25% |
| Volatile Long-Tail-Paare | 10–50% (aber hohes IL-Risiko) |

Die höheren Zahlen sind nur bei sehr großem Volumen oder engen V3-Positionen erreichbar. Die durchschnittliche nachhaltige Rendite für konservative LP liegt zwischen 3 und 10% — **nach** IL-Abzug.

**Das entscheidende Test-Kriterium**

Bevor du einer Position beitrittst, stelle dir drei Fragen:
1. Wie volatil ist das Paar über typische Zeiträume (Quartal, Jahr)?
2. Wie hoch sind die Gebühren-Renditen historisch?
3. Schlägt die erwartete Gebühren-Rendite den erwarteten IL deutlich?

Wenn die Antwort auf 3 unklar ist: nicht LP werden. Halte stattdessen die Tokens oder nutze eine andere Strategie (Lending, Staking).

### Folien-Zusammenfassung

**[Slide 1] — Titel**
Die wahre Rendite: Fees vs. IL

**[Slide 2] — Die Formel**
Netto-Rendite = Gebühren + Rewards − IL − Gas

**[Slide 3] — Beispielrechnung**
ETH +50%, 15% Gebühren, 2% IL
Ergebnis: LP unterliegt Buy-and-Hold um 770 USDC.

**[Slide 4] — Vier Szenarien**
A: Stabil → LP gewinnt klar
B: Moderate Bewegung → LP leicht voraus
C: Starker Trend → LP unterliegt klar
D: Seitwärts + Volumen → LP gewinnt stark

**[Slide 5] — Die Kern-Regel**
LP = Wette auf niedrige Volatilität vs. kompensierende Gebühren.
Trendstarke volatile Paare verlieren fast immer.

**[Slide 6] — Realistische Renditen**
Stables: 2–5%
Liquid-Staking: 2–6%
Majors V2: 5–15%
Majors V3 (aktiv): 8–25%

**[Slide 7] — Test-Kriterium**
Übersteigt erwartete Gebühren den erwarteten IL deutlich?
Wenn unklar: nicht LP werden.

### Sprechertext

**[Slide 1]** Nachdem du IL verstehst, musst du die vollständige Netto-Rendite-Rechnung beherrschen. Die meisten Farm-APY-Anzeigen täuschen — sie zeigen Brutto, nicht Netto. Der Unterschied kann enorm sein.

**[Slide 2]** Die Formel. Netto-Rendite gleich Gebühren-Rendite plus Reward-Rendite minus Impermanent Loss minus Gas-Kosten. Oft vergessen: Gas für Einzahlung, Reward-Claims, Position-Anpassung, Auszahlung. Bei kleineren Positionen können die Gas-Kosten einen signifikanten Teil der Rendite auffressen.

**[Slide 3]** Eine Beispielrechnung. ETH/USDC-Pool, ETH steigt von 3.000 auf 4.500 über ein Jahr. Einlage 6.000 USDC. Gebühren-Rendite 15 Prozent über das Jahr, also 900 USDC. IL bei 1,5x ist 2 Prozent, also 120 USDC Verlust. Gas 50 USDC. Netto-LP-Wert: 6.730. Buy-and-Hold-Wert: 7.500. Der LP unterliegt um 770 USDC — trotz 15 Prozent Gebühren-Rendite.

**[Slide 4]** Vier Szenarien zur Orientierung. Szenario A, stabile Preise — LP gewinnt klar, weil kein IL, aber volle Gebühren. Szenario B, moderate Bewegung, LP leicht voraus. Szenario C, starker Uptrend, LP unterliegt klar — die Gebühren reichen nicht, um den IL und die verpasste Preis-Exposure zu kompensieren. Szenario D, Seitwärts mit hohem Volumen — LP gewinnt stark, hier ist das Ideal.

**[Slide 5]** Die Kern-Regel zum Merken: LP-Sein ist eine Wette, dass die Volatilität niedriger bleibt als die Gebühren es kompensieren. Auf trendstarken volatilen Paaren verliert LP fast immer gegen Buy-and-Hold. Das ist historisch belegt, nicht eine theoretische Sorge.

**[Slide 6]** Realistische Rendite-Bereiche nach Pool-Typ. Stablecoin-Paare: 2 bis 5 Prozent. Liquid-Staking-Paare: 2 bis 6. ETH-Stablecoin V2: 5 bis 15. ETH-Stablecoin V3 aktiv gemanaged: 8 bis 25. Volatile Long-Tail-Paare: 10 bis 50, aber mit hohem IL-Risiko, Netto oft viel weniger. Für konservative LP liegt die realistische nachhaltige Netto-Rendite zwischen 3 und 10 Prozent.

**[Slide 7]** Das Test-Kriterium vor jeder Position. Wie volatil ist das Paar. Wie hoch sind die historischen Gebühren. Schlägt die erwartete Gebühren-Rendite den erwarteten IL deutlich. Wenn die Antwort unklar ist: nicht LP werden. Halte stattdessen die Tokens oder nutze Lending, Staking, andere Strategien.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Formel prominent dargestellt, mit kleinen Icons für jeden Bestandteil (Gebühr, Reward, IL, Gas).

**[Slide 3]** Schritt-für-Schritt-Rechnung als Tabelle.

**[Slide 4]** Vier-Quadranten-Darstellung, je Szenario mit Ergebnis-Indikator.

**[Slide 5]** Volatilität-Gebühren-Diagramm: x-Achse Volatilität, y-Achse Gebühren, Kurve markiert "Break-even".

**[Slide 6]** **SCREENSHOT SUGGESTION:** defillama.com/yields gefiltert auf Uniswap-Pools mit Rendite-Angaben. Zeigt realistische Zahlenbereiche.

**[Slide 7]** Drei-Fragen-Checkliste als Entscheidungshilfe.

### Übung

**Aufgabe: Historische LP-Rendite real berechnen**

1. Öffne info.uniswap.org.
2. Wähle einen ETH/USDC-V2- oder V3-Pool.
3. Sammle für die letzten 30 Tage:
 - Durchschnittliche tägliche Gebühren
 - Durchschnittlicher TVL
 - ETH-Preisänderung (über coingecko.com)
4. Berechne:
 - Gebühren-Rendite (annualisiert): (Tägliche Gebühren × 365) / TVL
 - IL basierend auf ETH-Preisänderung (Tabelle oder Formel)
 - Netto-Rendite für einen hypothetischen LP, der vor 30 Tagen eingestiegen ist
5. Vergleiche mit Buy-and-Hold über dieselbe Periode.

**Deliverable:** Tabelle mit allen Rechnungen. Kurze Analyse (4–6 Sätze): Hätte sich LP-Sein in diesem Zeitraum gelohnt? Was hätte die Entscheidung besser machen können?

### Quiz

**Frage 1:** Ein LP-Pool zeigt "30% APY". Welche Information fehlt dir, um zu entscheiden, ob das gut ist?

<details>
<summary>Antwort anzeigen</summary>

Mehrere entscheidende Informationen fehlen. Erstens: Bestehen die 30% aus Trading-Gebühren oder Rewards? Wenn Rewards dominieren, ist die Rendite fragil (Programm kann enden, Token-Preis kann fallen). Zweitens: Wie hoch war die Volatilität des Asset-Paares, und damit der implizite IL? Eine 30%-APY auf einem volatilen Paar kann durch 20%+ IL aufgefressen werden. Drittens: Gas-Kosten relativ zur Positionsgröße. Viertens: Ist die APY-Zahl historisch oder prognostiziert? Fünftens: Wie stabil ist das Handelsvolumen? Ohne diese Informationen ist "30% APY" eine leere Zahl, die wenig über die tatsächliche Netto-Rendite aussagt.
</details>

**Frage 2:** Unter welchen Marktbedingungen schlägt LP-Sein strukturell Buy-and-Hold?

<details>
<summary>Antwort anzeigen</summary>

LP schlägt Buy-and-Hold in Seitwärtsmärkten mit hohem Handelsvolumen. In solchen Phasen ist der IL minimal (kein großer Preisunterschied zum Einstieg), während die Gebühren-Einnahmen durch das Volumen kumulieren. Zusätzlich gilt: LP schlägt Buy-and-Hold bei gepeggten Assets (Stablecoin-Paare, Liquid-Staking-Paare), wo die Volatilität strukturell niedrig ist und selbst moderate Gebühren-Renditen die geringen IL-Beträge deutlich überkompensieren. LP unterliegt strukturell bei starken Trendbewegungen eines Assets, weil der AMM zu früh verkauft (bei Rally) oder zu früh kauft (bei Crash), und die Gebühren den verpassten Gewinn selten kompensieren.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Slides: Titel → Netto-Rendite-Formel → LP-Profitability-Beispiel → Sustainable vs. Temporary Yield → LP vs. Buy-and-Hold → Marktbedingungen-Matrix → Entscheidungsheuristik
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — Netto-Rendite-Formel-Box, Beispielrechnung (Fees+Rewards−IL−Gas), Yield-Source-Breakdown-Pie, LP-vs-HODL-Chart, Marktregime-Matrix

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 5.4 — V2-LP in der Praxis

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Eine V2-LP-Position eigenständig einrichten und überwachen
- Die passenden V2-Pools für konservative Strategien identifizieren
- Eine V2-LP-Position korrekt beenden und Gewinn/Verlust abrechnen
- Die Dashboard-Kennzahlen (Pool Share, Earned Fees, Position Value, IL-Proxy) auf DeBank/Zapper/Uniswap-Analytics korrekt interpretieren
- Die wichtigsten Smart-Contract-Risiken einer V2-LP-Position benennen und Mitigationsschritte anwenden
- Eine V2-LP-Position als Teil eines konservativen Portfolios dimensionieren (Kapitalanteil, Pool-Auswahl, Exit-Trigger)

### Erklärung

V2-LP-Positionen sind die einfachste Form von Marktmachen in DeFi. Sie sind weniger kapital-effizient als V3, aber für passive Nutzer oft besser geeignet — weil sie kein aktives Management erfordern.

**Schritt 1: Pool-Auswahl**

Für konservative Strategien sind sinnvolle V2-ähnliche Pools:
- ETH/USDC (hohe Liquidität, moderate Volatilität)
- ETH/USDT (ähnlich, leicht höheres Depeg-Risiko durch USDT)
- WBTC/ETH (krypto-natives Paar, hohe Korrelation)
- Liquid-Staking-Paare (stETH/ETH, wird eher auf Curve als auf V2 gehandelt)

**Nicht empfohlen für konservatives LP auf V2:**
- Neue oder kleine Token-Paare (hohe Volatilität, Rug-Risiko)
- Exotische oder Meme-Tokens (extreme IL)
- Pools mit TVL unter 1 Mio. USD (geringe Resilienz, hohe Gebühren-Volatilität)

**Schritt 2: Deployment**

Auf Uniswap V2 (oder Aerodrome V2 auf Base, Sushiswap, etc.):

1. Öffne die "Add Liquidity"-Seite
2. Wähle das Paar (z.B. ETH + USDC)
3. Gib den ETH-Betrag ein — USDC wird automatisch im aktuellen Verhältnis berechnet
4. Bestätige Approval (einmalig, wenn noch keine erteilt)
5. Bestätige die Add-Liquidity-Transaktion
6. Du erhältst LP-Tokens in deiner Wallet

**Gas-Kosten zu erwarten:** Approval ~10–30 USD, Add Liquidity ~20–50 USD auf Mainnet (niedriger auf Layer-2).

**Schritt 3: Monitoring**

Sinnvolle Tools zur Überwachung:

- **DeBank** (debank.com) — zeigt deine LP-Positionen und ihren aktuellen Wert
- **Zapper** (zapper.xyz) — ähnlich, mit IL-Tracking
- **APY.vision** — spezialisiert auf LP-Performance mit IL-Analyse
- **Uniswap-Interface** — direkt in der "Pools"-Ansicht

**Was du beobachten solltest:**
- Aktueller Wert der Position vs. Einlage
- Kumulierte Gebühren-Einnahmen
- Buy-and-Hold-Vergleichswert (was hätte die Einlage ohne LP gemacht)
- Preisänderung des volatilen Assets seit Einstieg

**Monatlicher Check ist oft ausreichend.** Tägliche Überwachung führt zu Überreaktion bei Marktbewegungen.

**Schritt 4: Ausstieg**

Um eine V2-LP-Position zu schließen:

1. Öffne die "Pool"-Seite auf Uniswap
2. Wähle deine Position
3. Klicke "Remove Liquidity"
4. Wähle den Prozentsatz (100% für kompletten Ausstieg)
5. Bestätige die Transaktion
6. Du erhältst die Tokens zurück im aktuellen Pool-Verhältnis

**Wichtige Überlegung:** Das aktuelle Verhältnis ist nicht das Einstiegs-Verhältnis. Wenn ETH gestiegen ist, hast du weniger ETH und mehr USDC als beim Einstieg (wegen des AMM-Rebalancings). Das ist die mechanische Auswirkung von IL.

**Schritt 5: Rechnung am Ende**

Nach dem Ausstieg sauber abrechnen:

```
Einlage-Wert: [ETH-Preis Start × ETH-Menge + USDC-Menge]
Auszahlungs-Wert: [ETH-Preis Ende × ETH-Menge Ende + USDC-Menge Ende]
Gebühren-Ertrag: Auszahlung − Einlage − IL
Buy-and-Hold-Wert: [ETH-Preis Ende × ETH-Menge Start + USDC-Menge Start]
IL (absolut): Buy-and-Hold − Auszahlung
Netto-Ergebnis: Auszahlung − Gas-Kosten − Einlage
```

Diese Rechnung zeigt dir, ob die Position tatsächlich profitabel war. Viele LPs überschätzen ihre Rendite systematisch, weil sie IL und Gas-Kosten ignorieren.

**V2-Specific: Time-Weighted Return**

Weil V2-LP-Tokens ihren Wert proportional zum Pool halten, ist die Berechnung vergleichsweise simpel. Die LP-Token-Anzahl bleibt konstant; ihr Wert ändert sich mit dem Pool. Deine Rendite ist:

```
Rendite = (LP-Token-Wert am Ende / LP-Token-Wert am Anfang) − 1
```

Das ist der Netto-Ertrag aus Gebühren (weil IL im LP-Token-Wert bereits reflektiert ist).

**Praktischer Anwendungsfall: ETH/USDC V2 Pool**

Szenario-Beispiel für einen konservativen LP:
- Einlage: 1 ETH + 3.000 USDC bei ETH = 3.000 (Wert 6.000 USDC)
- Halte-Zeit: 12 Monate
- ETH-Preisänderung: +10% (auf 3.300)
- Gebühren-Rendite im Jahr: 8% (auf Wertbasis)
- Gas-Kosten: ca. 100 USDC gesamt

**Rechnung:**
- IL bei 1,1x: ~0,1% → 6 USDC
- Gebühren-Ertrag: 8% × 6.000 = 480 USDC
- Netto: 480 − 6 − 100 = 374 USDC
- Netto-Rendite: 374 / 6.000 = 6,2%

Das ist im Ziel-Korridor von 7–8%, aber leicht darunter. Eine reine USDC-Position auf Aave hätte im gleichen Zeitraum möglicherweise 4–5% gebracht — ohne IL, ohne ETH-Exposure. Die Frage für den Nutzer: Wird die zusätzliche 1–2% Rendite die zusätzliche Komplexität und das IL-Risiko rechtfertigen?

### Folien-Zusammenfassung

**[Slide 1] — Titel**
V2-LP in der Praxis

**[Slide 2] — Pool-Auswahl**
Geeignet: ETH/USDC, ETH/USDT, WBTC/ETH
Nicht geeignet: neue Tokens, kleine TVL, Meme-Tokens

**[Slide 3] — Deployment**
Add Liquidity auf Uniswap V2 oder Aerodrome V2
Beide Tokens im Verhältnis einzahlen
Gas: 20–50 USD gesamt auf Mainnet

**[Slide 4] — Monitoring-Tools**
- DeBank — Übersicht
- Zapper — inkl. IL-Tracking
- APY.vision — LP-spezialisiert

**[Slide 5] — Ausstieg**
Remove Liquidity → Tokens im aktuellen Pool-Verhältnis
Nicht Einstiegs-Verhältnis — IL ist mechanisch sichtbar

**[Slide 6] — Saubere Rechnung**
Auszahlung − Einlage − Gas = Netto
Buy-and-Hold-Vergleich nicht vergessen

**[Slide 7] — Realistisches Szenario**
ETH +10%, 8% Gebühren, 0,1% IL, 100 USD Gas
→ 6,2% Netto-Rendite

### Sprechertext

**[Slide 1]** Du hast IL verstanden und die Netto-Rendite-Rechnung. Jetzt geht es an die Praxis. Wie baut man eine V2-LP-Position, überwacht sie und steigt wieder aus.

**[Slide 2]** Für konservative Strategien geeignete V2-Pools sind die großen Paare: ETH mit USDC oder USDT, WBTC mit ETH, und Liquid-Staking-Paare. Nicht geeignet sind neue oder kleine Token-Paare wegen extremem IL und Rug-Risiko, exotische Tokens, und Pools unter einer Million TVL wegen geringer Resilienz.

**[Slide 3]** Das Deployment ist einfach. Auf Uniswap V2 oder einem V2-ähnlichen Protokoll wie Aerodrome V2 auf Base oder Sushiswap: Add-Liquidity-Seite öffnen, Paar wählen, ETH-Betrag eingeben — der zweite Token wird automatisch im aktuellen Verhältnis berechnet. Approval und Add-Transaction bestätigen. Du bekommst LP-Tokens in die Wallet. Gas-Kosten auf Mainnet 20 bis 50 Dollar gesamt, auf Layer-2s deutlich weniger.

**[Slide 4]** Für Monitoring gibt es drei gute Tools. DeBank zeigt dir deine LP-Positionen mit aktuellem Wert. Zapper macht ähnliches und trackt zusätzlich Impermanent Loss. APY.vision ist spezialisiert auf LP-Performance mit detaillierter IL-Analyse. Monatlicher Check ist oft ausreichend — tägliche Überwachung führt zu Überreaktion.

**[Slide 5]** Der Ausstieg. Remove Liquidity in der Pool-Ansicht. Du erhältst die Tokens im aktuellen Pool-Verhältnis — nicht im Einstiegs-Verhältnis. Wenn ETH gestiegen ist, bekommst du weniger ETH und mehr USDC als beim Einstieg. Das ist IL, mechanisch sichtbar in deinen Rückgabemengen.

**[Slide 6]** Rechne sauber ab. Auszahlungs-Wert minus Einlage-Wert minus Gas-Kosten ergibt die Netto-Rendite aus Sicht der LP-Position. Vergleiche zusätzlich mit Buy-and-Hold, um zu sehen, ob die Position objektiv eine gute Entscheidung war.

**[Slide 7]** Ein realistisches Szenario. ETH steigt 10 Prozent, Gebühren im Jahr 8 Prozent, IL 0,1 Prozent, Gas 100 Dollar. Netto-Rendite 6,2 Prozent. Das ist im Ziel-Korridor, aber knapp. Vergleich: reine USDC-Supply auf Aave hätte 4 bis 5 Prozent gebracht, ohne IL, ohne Komplexität. Die Frage: Rechtfertigt die zusätzliche 1 bis 2 Prozent die zusätzliche Komplexität? Eine ehrliche Antwort ist oft: nein, es sei denn, du hast klare ETH-Exposure-Wünsche.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Tabelle mit "Geeignet" und "Nicht geeignet" Pool-Kategorien.

**[Slide 3]** **SCREENSHOT SUGGESTION:** Uniswap-Add-Liquidity-Interface mit ETH/USDC-Paar.

**[Slide 4]** **SCREENSHOT SUGGESTION:** DeBank-Portfolio-Ansicht mit sichtbaren LP-Positionen. Alternativ APY.vision.

**[Slide 5]** Vergleichs-Diagramm: Verhältnis bei Einstieg vs. Auszahlung bei +25% ETH-Preis.

**[Slide 6]** Rechnungs-Template zum Abarbeiten.

**[Slide 7]** Vergleichs-Balkendiagramm: LP-Netto vs. Buy-and-Hold vs. USDC-Supply auf Aave.

### Übung

**Aufgabe: V2-LP-Strategie planen**

Ohne echtes Kapital einzusetzen, plane schriftlich eine V2-LP-Strategie:

1. Welchen Pool würdest du wählen und warum?
2. Wie viel Kapital würdest du committen? (Gesamt und pro Token-Seite)
3. Welche Halte-Dauer planst du?
4. Welche Monitoring-Tools nutzt du, mit welcher Frequenz?
5. Welche Exit-Trigger hast du definiert? (z.B. "wenn ETH +50%", "wenn Gebühren-Rendite unter 5% fällt", "wenn IL über 5%")
6. Welche Gas-Budget-Grenze setzt du dich?

**Deliverable:** Strategiedokument (1–2 Seiten) mit den 6 Punkten klar adressiert. Zusätzlich: Einschätzung, ob diese Strategie realistisch die Ziel-Rendite von 7–8% erreichen kann.

### Quiz

**Frage 1:** Warum ist ein monatlicher LP-Check oft besser als täglicher?

<details>
<summary>Antwort anzeigen</summary>

Täglicher Check führt zu Überreaktion auf Kurz-Schwankungen. Ein LP sieht, dass ETH kurzfristig 10% gefallen ist, fürchtet weitere Verluste und schließt die Position zum ungünstigsten Zeitpunkt. Monatlicher Check erfasst echte Trends, ignoriert Tagesrauschen und erlaubt rationalere Entscheidungen. Zusätzlich: jeder Exit und Re-Entry kostet Gas. Häufige Umplatzierungen fressen die Rendite. Monatliche Überwachung ist außerdem konsistent mit der Zeitskala, auf der LP-Erträge realistisch akkumulieren — eine gute Position entwickelt sich über Monate, nicht Tage.
</details>

**Frage 2:** Eine V2-LP-Position hat nach 6 Monaten einen LP-Token-Wert, der 5% höher ist als bei Einstieg. Der unterliegende Asset-Preis ist ebenfalls um 20% gestiegen. Was ist die tatsächliche Rendite für den LP, und wie vergleicht sie mit Buy-and-Hold?

<details>
<summary>Antwort anzeigen</summary>

Die LP-Rendite ist 5% (aus dem LP-Token-Wert-Anstieg, der bereits Gebühren und IL reflektiert). Buy-and-Hold: Bei 20% Asset-Anstieg und der typischen 50/50-Einlage wäre der Buy-and-Hold-Wert um etwa 10% höher als der Einstiegswert gestiegen (weil nur die Hälfte im volatilen Asset war). LP-Rendite 5% vs. Buy-and-Hold-Rendite 10%. Buy-and-Hold hat um 5 Prozentpunkte gewonnen. Der Grund: Der IL bei 1,2x ist etwa 0,4%, also überschaubar, aber die eigentliche Underperformance kommt daher, dass der LP die ETH-Exposure mechanisch verringert hat durch Rebalancing. Der LP verdient Gebühren, aber verliert Upside-Exposure.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Slides: Titel → V2-LP-Einrichtung Schritt für Schritt → Pool-Auswahl-Kriterien → Dashboard-Kennzahlen → Monitoring-Routine → Position schließen → Smart-Contract-Risiko-Checkliste
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — Uniswap-V2-Add-Liquidity-Screenshot, Pool-Auswahl-Matrix, DeBank/Zapper-Dashboard, Position-schließen-Flow, Risk-Checkliste

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 5.5 — V3-konzentrierte LPs: Wann sinnvoll, wann nicht

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Eine V3-Position mit bewusstem Bereich einrichten
- Die erhöhte IL-Problematik bei engen Ranges einschätzen
- Entscheiden, wann V3 für einen konservativen LP sinnvoll ist
- Das Verhältnis zwischen Range-Breite, Fee-Yield und IL-Risiko quantitativ verstehen
- Die Rolle von Monitoring und Rebalancing als zusätzliche operative Last in V3-LP-Strategien einordnen
- Einfache Regel-Heuristiken (z.B. Mindest-Range-Breite, Fee-Tier-Wahl, Rebalance-Trigger) für konservative V3-LPs anwenden

### Erklärung

Uniswap V3 gibt LPs ein mächtiges Werkzeug: konzentrierte Liquidität. Innerhalb eines gewählten Preisbereichs ist die LP-Position 10 bis 100+ Mal kapital-effizienter als V2. Das klingt wie ein klarer Gewinn — ist es aber nicht immer.

**Das Trilemma der V3-LP**

Ein V3-LP balanciert drei Größen:

1. **Gebühren-Einnahmen** — steigen mit konzentrierter Positionierung
2. **Impermanent Loss** — steigt auch mit konzentrierter Positionierung
3. **Out-of-Range-Zeit** — steigt mit engerem Bereich, reduziert aktive Einnahmen

**Warum V3-IL strukturell höher ist**

In V2 ist die Liquidität über den gesamten Preisbereich verteilt. Der IL wächst zwar mit Preisbewegung, aber konsistent mit der Formel aus Lektion 5.2.

In V3 ist die Liquidität im gewählten Bereich konzentriert. Wenn der Preis den Bereich teilweise durchläuft, wird der LP stärker rebalanciert als in V2 — er verkauft mehr vom steigenden Asset, kauft mehr vom fallenden. Das Ergebnis: **Bei gleicher Preisänderung ist der V3-IL höher als der V2-IL**, proportional zur Konzentration.

**Konkretes Beispiel:**

Zwei LPs treten einem ETH/USDC-Pool bei, jeder mit 10.000 USD.

**LP1 (V2):** Volle Range, 1 ETH + 3.000 USDC (bei ETH = 3.000)
**LP2 (V3, Bereich 2.500–3.500):** Konzentriert um 3.000, ähnliche initiale Asset-Mischung

ETH steigt auf 3.500 USDC (+16,7%).

**LP1 V2-IL:** ca. −0,6%
**LP2 V3-IL:** ca. −2% bis −3% (höher, weil Konzentration höher)

Beide waren "in range" die ganze Zeit. LP1 hat weniger IL, aber auch weniger Gebühren pro Dollar. LP2 hat höhere IL, aber möglicherweise 3–5x mehr Gebühren eingenommen. Ob LP2 netto besser liegt, hängt vom Volumen im Bereich ab.

**Wenn der Bereich verlassen wird**

Das kritische Problem: Wenn der Preis den Bereich verlässt, wird die Position zu 100% im "unterlegenen" Asset. Wenn ETH über 3.500 steigt, hält LP2 nur noch USDC — und verpasst jeden weiteren Anstieg.

Das bedeutet: Ein LP mit engem Bereich ist mathematisch identisch mit einer gleitenden Limit-Order-Strategie. Der AMM hat für dich verkauft, als der Preis über den Bereich stieg. Gebühren-Einnahmen stoppen dann, bis entweder der Preis zurückkommt oder du neu positionierst.

**Die Strategien für V3**

**Strategie 1: Enger Bereich, aktives Management**
- Bereich: ±5% um aktuellen Preis
- Rebalancing bei Out-of-Range
- Erwartete Gebühren-Rendite: 15–30% (wenn gut positioniert)
- IL-Risiko: hoch bei Fehlpositionierung
- Erforderlich: Markt-Sicht, regelmäßiges Monitoring, Gas-Budget für Re-Deployment

**Strategie 2: Breiter Bereich, passives Management**
- Bereich: ±30% bis ±50% um aktuellen Preis
- Kein aktives Rebalancing
- Erwartete Gebühren-Rendite: 5–15%
- IL-Risiko: moderat, ähnlich V2
- Kaum aktiver Aufwand

**Strategie 3: "Volle Range" V3**
- Bereich: theoretisch unlimited (ähnlich V2)
- Kapital-Effizienz entspricht praktisch V2
- Einfach zu managen, aber keine Vorteile gegenüber V2

**Strategie 4: Stablecoin-Pair oder ähnliche (minimaler Volatilität)**
- Bereich: 0,99–1,01 oder ähnlich eng um Peg
- Sehr hohe Kapital-Effizienz
- Minimaler IL
- Das ist der "Sweet Spot" für V3 in konservativen Strategien

**Empfehlung für konservatives Portfolio**

Für die Ziel-Rendite von 7–8% ist aktives V3 auf volatilen Paaren selten die beste Wahl:
- Hoher Zeitaufwand
- IL-Risiko bei Fehlpositionierung
- Gas-Kosten bei Rebalancing fressen Rendite

Sinnvoller sind:
- V3 auf Stablecoin-Paaren oder gepeggten Assets (niedrige Volatilität, hohe Kapital-Effizienz)
- V2-ähnliche Pools bei passiver Nutzung auf Majors
- Lending statt LP für stabile Yield-Exposure

V3 auf ETH/USDC ist ein professionelles Werkzeug. Es kann sich lohnen — erfordert aber Expertise und Zeit. Unterschätzte Komplexität kostet hier mehr als Unwissen in den meisten anderen DeFi-Strategien.

**Automatisierungs-Tools**

Für LPs, die V3 nutzen wollen, aber nicht aktiv managen können, existieren Auto-Rebalancing-Protokolle:
- **Gamma Strategies** — verwaltet V3-Positionen programmatisch
- **Arrakis Finance** — ähnlich
- **Revert Finance** — Tools für Performance-Analyse und Rebalancing-Simulation

Diese Tools reduzieren den manuellen Aufwand, fügen aber Smart-Contract-Risiko einer zusätzlichen Schicht hinzu. Für konservative Strategien meist nur sinnvoll, wenn die eigene Zeit-Knappheit signifikant ist.

### Folien-Zusammenfassung

**[Slide 1] — Titel**
V3-konzentrierte LPs: Wann sinnvoll, wann nicht

**[Slide 2] — Das Trilemma**
1. Gebühren-Einnahmen
2. Impermanent Loss
3. Out-of-Range-Zeit
Alle drei steigen mit Konzentration.

**[Slide 3] — V3-IL ist strukturell höher**
Gleiche Preisänderung → höherer IL bei engeren Bereichen.
Proportional zur Konzentration.

**[Slide 4] — Vier Strategien**
1. Enger Bereich + aktiv
2. Breiter Bereich + passiv
3. "Volle Range" = wie V2
4. Stablecoin-Paare = Sweet Spot

**[Slide 5] — Out-of-Range-Problem**
Preis verlässt Bereich → Position wird einseitig
Gebühren stoppen bis Rebalancing oder Rückkehr

**[Slide 6] — Empfehlung konservativ**
V3 auf Stables/Pegged = gut
V3 auf volatile Majors = nur für Experten mit Zeit
Ansonsten Alternativen (V2, Lending) prüfen

**[Slide 7] — Auto-Management**
Gamma, Arrakis, Revert Finance
Reduziert Aufwand, fügt Smart-Contract-Risiko hinzu

### Sprechertext

**[Slide 1]** V3 klingt nach strikter Verbesserung gegenüber V2 — mehr Gebühren pro Kapital. Aber die Realität ist komplexer. Für konservative LPs ist V3 ein Werkzeug, das oft missverstanden wird.

**[Slide 2]** Das V3-Trilemma. Drei Größen hängen zusammen: Gebühren-Einnahmen, Impermanent Loss und Out-of-Range-Zeit. Je konzentrierter deine Position, desto mehr Gebühren — aber auch desto mehr IL pro Preisänderung und desto höher die Wahrscheinlichkeit, aus dem Bereich zu laufen. Alle drei Faktoren sind gekoppelt.

**[Slide 3]** Wichtig: V3-IL ist strukturell höher als V2-IL bei gleicher Preisänderung. Weil die Liquidität konzentriert ist, wird der LP stärker rebalanciert — er verkauft mehr vom steigenden Asset, kauft mehr vom fallenden. Das erzeugt mehr IL pro Prozentpunkt Preisbewegung. Der Trade-off: mehr Gebühren pro Dollar Kapital. Ob netto positiv, hängt vom Pool-Volumen ab.

**[Slide 4]** Vier Strategien für V3. Strategie 1: enger Bereich plus aktives Management — potenziell 15 bis 30 Prozent Rendite, aber Zeitaufwand und IL-Risiko. Strategie 2: breiter Bereich plus passiv — 5 bis 15 Prozent, wie V2 mit leichtem Boost. Strategie 3: volle Range — effektiv identisch zu V2, keine Vorteile. Strategie 4, der Sweet Spot: Stablecoin-Paare oder gepeggte Assets mit engem Bereich — hohe Kapital-Effizienz bei minimalem IL.

**[Slide 5]** Das Out-of-Range-Problem. Wenn der Preis deinen Bereich verlässt, wird deine Position zu hundert Prozent im unterlegenen Asset. Ein ETH-Pool, in dem ETH über deinen Bereich steigt, hinterlässt dich mit nur USDC — keine ETH-Exposure mehr, keine Gebühren-Einnahmen. Du bist mathematisch identisch mit einer Limit-Order-Strategie, die verkauft hat.

**[Slide 6]** Empfehlung für konservative Strategien. V3 auf Stablecoin-Paaren oder Liquid-Staking-Paaren ist sinnvoll — niedrige Volatilität, hohe Effizienz. V3 auf volatilen Majors wie ETH/USDC ist nur für Experten mit Zeit sinnvoll. Für passive Nutzer sind V2, Stablecoin-LP auf Curve oder einfach USDC-Lending auf Aave oft bessere Wahl. Komplexität muss einen klaren Vorteil bringen, sonst ist sie Verschwendung.

**[Slide 7]** Automatisierungs-Tools existieren. Gamma Strategies, Arrakis Finance, Revert Finance. Sie nehmen einem den Management-Aufwand ab. Dafür fügen sie eine zusätzliche Smart-Contract-Ebene hinzu — mehr Code, mehr Risiko. Für konservative Strategien meist nur interessant, wenn die eigene Zeit wirklich knapp ist und die Position groß genug, um den zusätzlichen Aufwand zu rechtfertigen.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Dreiecks-Diagramm mit den drei Größen an den Ecken. Pfeile zeigen Kopplung.

**[Slide 3]** Vergleichsgrafik: V2 vs. V3 (eng) IL-Kurven bei gleicher Preisänderung.

**[Slide 4]** Vier-Quadranten-Matrix der Strategien mit Risiko/Rendite-Einordnung.

**[Slide 5]** Diagramm: Preiskurve mit markiertem LP-Bereich. Preis läuft über Bereich hinaus, Position wird einseitig.

**[Slide 6]** Entscheidungs-Flowchart: "Welcher Pool-Typ soll ich als konservativer LP wählen?"

**[Slide 7]** **SCREENSHOT SUGGESTION:** Gamma Strategies Interface oder Arrakis Finance mit Vault-Übersicht.

### Übung

**Aufgabe: V3-Position simulieren (ohne Kapital)**

1. Öffne app.uniswap.org, wähle Pool-Erstellung für ETH/USDC.
2. Wähle Fee-Tier 0,05%.
3. Experimentiere mit verschiedenen Bereichen:
 - ±5% um aktuellen Preis
 - ±20% um aktuellen Preis
 - "Full Range"
4. Für jeden Bereich: beobachte die angezeigte "Capital Efficiency" und Asset-Mischung.
5. Nutze Revert Finance (revert.finance) oder Staker Finance für historische Performance-Simulation:
 - Gib einen V3-Pool ein (z.B. ETH/USDC 0,05%)
 - Simuliere hypothetische LP-Position über die letzten 6 Monate mit verschiedenen Bereichen

**Deliverable:**
- Vergleichs-Tabelle: Bereich × Kapital-Effizienz × erwartete Rendite (aus Simulation)
- Einschätzung (5–7 Sätze): Welcher Bereich wäre für dich konservativ sinnvoll, und warum?

### Quiz

**Frage 1:** Ein LP stellt 10.000 USD in einen V3-ETH/USDC-Pool mit ±10% Bereich um den aktuellen Preis. Was passiert, wenn ETH innerhalb einer Woche um 15% steigt?

<details>
<summary>Antwort anzeigen</summary>

Die Position verlässt den Bereich auf der oberen Seite. Während der Bewegung im Bereich wurde die ETH-Exposure schrittweise gegen USDC getauscht — der LP hat zu steigenden Preisen ETH verkauft. Beim Überschreiten des Bereichs hält der LP nur noch USDC (plus kleine ETH-Rest-Mengen). Alle weitere Preissteigerung verpasst der LP. Er verdient keine Gebühren mehr, solange die Position out-of-range ist. Der IL relativ zu Buy-and-Hold wächst weiter, obwohl die Position selbst konstant ist — weil Buy-and-Hold die volle Upside erfasst hätte. Der LP muss entscheiden: warten auf Preis-Rückkehr, oder Position auflösen und neu positionieren (kostet Gas und realisiert den Verlust).
</details>

**Frage 2:** Warum ist V3 auf Stablecoin-Paaren (z.B. USDC/USDT mit Bereich 0,99–1,01) strukturell attraktiver als V3 auf ETH/USDC mit engem Bereich?

<details>
<summary>Antwort anzeigen</summary>

Zwei Hauptgründe. Erstens: Volatilität. USDC/USDT schwankt normal um weniger als 0,1% — der implizite IL ist nahezu null. ETH/USDC schwankt um 5–20% monatlich — der IL auf engen Bereichen ist erheblich. Zweitens: Out-of-Range-Risiko. Stablecoin-Paare bleiben praktisch immer im Bereich 0,99–1,01, solange kein Depeg stattfindet. ETH/USDC verlässt enge Bereiche regelmäßig. Das bedeutet: V3-Stablecoin-LPs verdienen nahezu kontinuierlich Gebühren mit minimalem IL. V3-ETH/USDC-LPs verbringen signifikante Zeit out-of-range und tragen hohen IL bei Bewegungen. Das Risk-Adjusted-Return ist bei Stablecoin-V3 für konservative Strategien deutlich besser. Wichtige Gegenkraft: Depeg-Risiko — wenn ein Stablecoin den Peg verliert, wird der LP stark betroffen.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Slides: Titel → V3-Range-Konzept → IL bei engen Ranges → V3-Entscheidungsmatrix → Rebalancing-Last → Heuristiken für konservative V3 → Pool-Typ-Eignung
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — Range-Breite-vs-Fee-Yield-Kurve, Out-of-Range-Szenarien, V3-Analytics-Screenshot, Rebalance-Gas-Kosten-Tabelle, Stable-V3-vs-Volatile-V3-Vergleich

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 5.6 — Stable LP-Strategien: Curve und gepeggte Assets

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die StableSwap-Formel von Curve von Constant-Product abgrenzen
- Curve-Pools passend zu konservativen Portfolio-Zielen auswählen
- Die Risiken gepeggter LP-Strategien (Depeg-Risiko) einordnen
- Die historischen Peg-Events (USDC-März-2023, stETH-Juni-2022) als Stresstest-Szenarien für Stable-LP-Positionen anwenden
- Die Rolle von CRV-Emissionen und veCRV-Gauges für LP-Rewards grundsätzlich einordnen (Vertiefung in Modul 13)
- Eine Curve-LP-Position nach Fee-Yield, TVL, Peg-Stabilität und Composability-Tiefe systematisch auswählen

### Erklärung

**Curve Finance** ist der dominante DEX für Swaps zwischen gepeggten Assets — Stablecoins (USDC/USDT/DAI), Liquid-Staking-Tokens (stETH/ETH), Wrapped Assets (WBTC/renBTC), und neuerdings auch Liquid-Restaking-Tokens. Curves Design ist speziell für Assets optimiert, die "nah beieinander" handeln sollen.

**Die StableSwap-Formel**

Anders als Uniswaps `x · y = k` verwendet Curve eine angepasste Formel, die eine Mischung aus Constant-Sum (`x + y = k`) und Constant-Product (`x · y = k`) ist. Der Effekt: Die Preiskurve ist im Bereich nahe des Pegs nahezu flach (wie Constant-Sum), aber an den Extrembereichen steigt sie steil an (wie Constant-Product).

**Was das praktisch bedeutet:**

Ein Curve-USDC/USDT-Pool quotiert Preise sehr nah an 1:1 für moderate Swap-Größen. Ein Swap von 1 Mio. USDC zu USDT kann mit weniger als 0,02% Slippage abgewickelt werden — etwas, das in einem Uniswap-V2-Constant-Product-Pool extreme Liquidität erfordern würde.

Gleichzeitig: Wenn der Pool stark aus dem Gleichgewicht gerät (z.B. weil ein Stablecoin beginnt zu depeggen), steigt der Slippage rapide — die Kurve schützt den Pool vor vollständiger Ausräumung.

**Amp-Parameter (Amplification)**

Curve-Pools haben einen Parameter `A` (Amplification), der bestimmt, wie "flach" die Kurve im Peg-Bereich ist. Höheres A = flachere Kurve im Peg-Bereich = bessere Preise für normale Swaps, aber höheres Risiko bei Depeg-Situationen.

Typische A-Werte:
- **3pool (USDC/USDT/DAI):** A = 2000 (sehr hoch, sehr optimiert für Peg)
- **stETH/ETH Pool:** A = 50–200 (moderater)
- **Frax/USDC Pool:** A = 500 (mittelmäßig)

**Welche Curve-Pools für konservative LPs sinnvoll sind**

**Sehr konservativ:**
- **3pool** (USDC/USDT/DAI) — Klassiker, sehr stabil, moderate Renditen (2–5%)
- **crvUSD Pools** — für das Curve-eigene Stablecoin, etwas höhere Renditen
- **tricrypto-Pools** — enthalten BTC, ETH, USDT; schon volatiler, aber kontrolliert

**Moderat konservativ:**
- **stETH/ETH** — exponiert gegenüber Liquid-Staking-Depeg-Risiko, aber stabile Gebühren
- **rETH/ETH** — ähnlich, andere Liquid-Staking-Variante
- **frxETH/ETH** — ähnlich

**Eher nicht für konservative LPs:**
- Pools mit experimentellen oder neuen Stablecoins (UST-ähnliche algorithmische Designs)
- Pools mit wenig TVL oder Rewards-Getriebenheit
- Pools mit ungeprüften Peg-Mechaniken

**Das Depeg-Risiko**

Das größte Risiko einer gepeggten LP-Position ist ein Depeg-Ereignis. Historische Beispiele:

**UST-Kollaps, Mai 2022:** Der algorithmische Terra-Stablecoin UST brach seinen Peg und fiel innerhalb weniger Tage auf nahe null. Curve-Pools mit UST (insbesondere der 4pool-Precursor) wurden strukturell zerstört — LPs hielten am Ende wertlose UST statt Mix aus Stablecoins.

**USDC-Depeg, März 2023:** Als die Silicon Valley Bank kollabierte (wo Circle einen Teil der USDC-Reserven hielt), depeggte USDC kurzzeitig auf 0,88 USD. Curve-Pools mit USDC erlebten massive Umschichtungen — LPs saßen plötzlich auf mehr USDC und weniger anderer Stables als erwartet. Peg kehrte innerhalb weniger Tage zurück, aber zwischenzeitliche Exits realisierten den Verlust.

**stETH-Depeg, Juni 2022:** Nach dem Luna/3AC-Kollaps depeggte stETH temporär auf 0,94 ETH. Der Curve stETH/ETH-Pool erlebte starke Umschichtungen.

**Lektion:** Gepeggte LP-Positionen sind **nicht risikofrei**. Sie sind "low IL", aber sie tragen ein konzentriertes Depeg-Risiko. Diversifikation über verschiedene Peg-Typen (fiat-besichert, krypto-besichert, liquid-staking-basiert) reduziert dieses Risiko.

**Rewards: CRV und convex boosting**

Viele Curve-Pools zahlen zusätzlich zu Trading-Gebühren CRV-Rewards (Curves eigenen Governance-Token). Diese Rewards können durch ein Konzept namens **veCRV** (vote-escrowed CRV) und **Convex Finance** weiter geboostet werden.

**Kurze Erklärung:**
- CRV-Tokens können für bis zu 4 Jahre gesperrt werden → veCRV
- veCRV gibt Governance-Macht und boostet die eigenen LP-Rewards
- Convex Finance poolt veCRV und bietet den Boost ohne dass LPs selbst CRV locken müssen

**Für konservative LPs:**
- Einfachste Version: LP auf Curve, keine CRV-Sperre, kein Convex — moderate aber stabile Rendite
- Komplexere Version: LP auf Curve, staken auf Convex für zusätzliche CRV- und CVX-Rewards — höhere Rendite, aber zusätzliches Smart-Contract-Risiko (zwei Protokolle statt einem) und Exposure zu Reward-Token-Preisen

Für das Kurs-Ziel von 7–8% ist eine direkte Curve-LP-Position oft ausreichend. Convex-Stacking ist nicht verboten, aber es fügt Komplexität hinzu, ohne die Ziel-Rendite deutlich zu verändern.

**Realistische Renditen auf Curve**

| Pool | Gebühren-Rendite | Mit CRV-Rewards | Mit Convex-Boost |
|---|---|---|---|
| 3pool | 1–3% | 2–5% | 3–7% |
| stETH/ETH | 1–3% | 2–5% | 3–8% |
| crvUSD Pools | 2–5% | 4–8% | 5–12% |

**Wichtiger Vorbehalt:** Die Spannen sind historisch und variieren stark. Aktuelle Zahlen auf defillama.com/yields oder curve.fi prüfen.

**Anwendung im Portfolio**

Ein konservativer DeFi-Portfolio-Ansatz könnte beinhalten:
- **30% Stablecoin-Supply auf Aave** (3–5% Rendite, minimales Risiko)
- **20% Curve-Stablecoin-LP (3pool oder crvUSD)** (3–6% Rendite, leichtes Depeg-Risiko)
- **20% Liquid-Staking (z.B. direkt stETH halten)** (3–4% Rendite, eingebettetes ETH-Exposure)
- **20% ETH-Spot** (direktes Markt-Exposure)
- **10% Reserve in USDC** (Trockenpulver für Opportunitäten)

Dieses Portfolio zielt auf ~5–7% Rendite bei konservativen Risiken, mit ETH-Exposure und Liquidität. Modul 12 vertieft Portfoliokonstruktion.

### Folien-Zusammenfassung

**[Slide 1] — Titel**
Stable LP-Strategien: Curve und gepeggte Assets

**[Slide 2] — StableSwap vs. Constant-Product**
Curve: flach im Peg-Bereich, steil an Extremen.
Uniswap: gleichmäßig konvex.
Curve optimiert für gepeggte Assets.

**[Slide 3] — Amp-Parameter (A)**
Höheres A = flachere Kurve = bessere Preise.
Höheres A = höheres Risiko bei Depeg.

**[Slide 4] — Geeignete Curve-Pools**
Sehr konservativ: 3pool, crvUSD, tricrypto
Moderat: stETH/ETH, rETH/ETH
Nicht für konservativ: experimentelle algo-Stables

**[Slide 5] — Depeg-Risiko**
UST-Kollaps Mai 2022
USDC-Depeg März 2023
stETH-Depeg Juni 2022
Low IL ≠ risikofrei

**[Slide 6] — Rewards-Struktur**
CRV, veCRV, Convex Boost
Mehr Rendite = mehr Komplexität = mehr Risiko
Für 7–8%-Ziel oft direkte LP ausreichend

**[Slide 7] — Portfolio-Integration**
Curve-LP als Baustein im konservativen Mix
Kombiniert mit Aave, Staking, Spot
Gesamt-Ziel 5–7% realistisch

### Sprechertext

**[Slide 1]** Curve Finance ist der wichtigste DEX für gepeggte Assets. Für konservative LP-Strategien ist Curve oft die erste Wahl, weil es strukturell für niedrig-volatile Paare optimiert ist.

**[Slide 2]** Der strukturelle Unterschied. Uniswap verwendet x mal y gleich k — eine gleichmäßig konvexe Kurve. Curve verwendet StableSwap, eine Mischung aus Constant-Sum und Constant-Product. Das Ergebnis: die Preiskurve ist im Peg-Bereich nahezu flach, erst an den Extrembereichen wird sie steil. Praktisch bedeutet das: ein Million-Dollar-Swap zwischen USDC und USDT auf Curve kostet weniger als 0,02 Prozent Slippage. Auf Uniswap V2 wäre das nicht möglich ohne riesige Liquidität.

**[Slide 3]** Der Amplification-Parameter A. Er bestimmt, wie flach die Kurve im Peg-Bereich ist. Höheres A bedeutet flachere Kurve und damit bessere Preise für normale Swaps. Gleichzeitig bedeutet höheres A auch höheres Risiko, wenn der Peg bricht — die Kurve "verteidigt" den Peg länger, bevor Slippage einsetzt. Das 3pool hat A gleich 2000, sehr hoch. Liquid-Staking-Pools wie stETH/ETH haben moderate Werte um 50 bis 200.

**[Slide 4]** Welche Curve-Pools sind konservativ sinnvoll. Sehr konservativ: 3pool mit USDC, USDT, DAI. Der Klassiker, moderate Rendite 2 bis 5 Prozent. crvUSD-Pools, für Curves eigenes Stablecoin, etwas höhere Rendite. tricrypto-Pools mit BTC, ETH, USDT — schon volatiler aber kontrolliert. Moderat: stETH/ETH, rETH/ETH, frxETH/ETH — Liquid-Staking-Paare mit Depeg-Risiko. Nicht für konservative Strategien: experimentelle algorithmische Stables oder Pools mit ungeprüften Peg-Mechaniken.

**[Slide 5]** Das Depeg-Risiko darf man nicht vergessen. UST-Kollaps Mai 2022: der algorithmische Terra-Stablecoin brach, Curve-Pools mit UST wurden strukturell zerstört. USDC-Depeg März 2023: Silicon Valley Bank Kollaps, USDC fiel kurzzeitig auf 0,88 Dollar. stETH-Depeg Juni 2022: nach Luna und Three Arrows Capital fiel stETH auf 0,94 ETH. Lektion: Low IL ist nicht risikofrei. Gepeggte LPs tragen ein konzentriertes Depeg-Risiko. Diversifikation über Peg-Typen reduziert das.

**[Slide 6]** Die Rewards-Struktur. Viele Curve-Pools zahlen CRV-Tokens zusätzlich zu Gebühren. CRV kann gesperrt werden zu veCRV, was Boost und Governance gibt. Convex Finance vereinfacht das — man stakt LP-Tokens auf Convex und bekommt geboostete Rewards ohne eigenes Locking. Für konservative LPs: direkte Curve-LP ist oft ausreichend für 3 bis 5 Prozent Rendite. Convex fügt Komplexität und ein weiteres Protokoll-Risiko hinzu — für moderate Rendite-Steigerung. Ob das den Aufwand wert ist, hängt von Position-Größe ab.

**[Slide 7]** Portfolio-Integration. Ein konservativer DeFi-Portfolio-Ansatz könnte Curve-LP als Baustein nutzen, neben Aave-Lending, direktem Liquid Staking, ETH-Spot und Stablecoin-Reserve. Die Gesamtallokation zielt auf 5 bis 7 Prozent bei kontrolliertem Risiko. Curve liefert einen Teil davon — nicht den einzigen. Portfoliokonstruktion vertiefen wir in Modul 12.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Zwei Kurven nebeneinander: x·y=k (Hyperbel) und StableSwap (flache Mitte, steile Enden).

**[Slide 3]** Mehrere Curven mit verschiedenen A-Werten. Zeigt, wie A die Flachheit im Peg-Bereich steuert.

**[Slide 4]** **SCREENSHOT SUGGESTION:** curve.fi Pool-Übersicht mit TVL und APY der genannten Pools.

**[Slide 5]** Zeitachse mit den drei Depeg-Ereignissen markiert. Preisverlauf je Asset kurz dargestellt.

**[Slide 6]** Flussdiagramm: LP-Token → Convex Stake → geboostete Rewards. Daneben: direkte Curve-LP ohne Stacking.

**[Slide 7]** Portfolio-Kuchen-Diagramm mit 30/20/20/20/10 Aufteilung und erwarteten Renditen pro Segment.

### Übung

**Aufgabe: Curve-Pool-Analyse und konservative Auswahl**

1. Öffne curve.fi und gehe zu "Pools".
2. Finde mindestens 5 Pools, die du für konservativ geeignet hältst.
3. Dokumentiere für jeden Pool:
 - Name und enthaltene Assets
 - TVL
 - Aktuelle Gebühren-Rendite (Base APY)
 - Aktuelle CRV-Reward-Rendite (wenn vorhanden)
 - Gesamt-APY
 - Dein Risiko-Urteil: Was könnte bei diesem Pool schiefgehen?
4. Wähle einen einzigen Pool aus, in den du hypothetisch 5.000 USD investieren würdest. Begründe die Wahl.

**Deliverable:** Tabelle mit 5+ Pools. Abschlussbegründung für den gewählten Pool (5–7 Sätze): Warum dieser Pool, welches Risiko akzeptierst du, welche Exit-Kriterien hast du?

### Quiz

**Frage 1:** Warum ist der Slippage auf einem Curve-Stablecoin-Pool bei Normalsituation viel geringer als auf einem Uniswap-V2-Stablecoin-Pool?

<details>
<summary>Antwort anzeigen</summary>

Weil Curve die StableSwap-Formel verwendet, die im Peg-Bereich nahezu flach ist. In Uniswap V2 folgt die Preiskurve x·y=k überall der gleichen Hyperbel — das bedeutet, selbst kleine Ungleichgewichte erzeugen wahrnehmbaren Preis-Impact. Curves Formel mischt Constant-Sum und Constant-Product, wobei der Amp-Parameter A steuert, wie stark der Constant-Sum-Effekt im Peg-Bereich dominiert. Bei hohem A (wie beim 3pool mit A=2000) kann ein Swap von Millionen Dollar mit Slippage unter 0,02% abgewickelt werden. An den Extrembereichen (wenn der Pool stark aus dem Gleichgewicht gerät) nähert sich Curves Kurve wieder Constant-Product, was den Pool vor vollständiger Ausräumung schützt.
</details>

**Frage 2:** Ein konservativer LP hat 80% seines DeFi-Kapitals in Curve-Stablecoin-Pools. Was ist die offensichtliche Schwäche dieses Setups?

<details>
<summary>Antwort anzeigen</summary>

Konzentriertes Depeg-Risiko. Obwohl die Pools "low IL" sind und diversifiziert aussehen (USDC, USDT, DAI sind ja verschiedene Tokens), sind sie alle Fiat-besicherte Stablecoins. Ein systemisches Ereignis, das Fiat-Stablecoins angreift (z.B. ein Banken-Kollaps, der die Reserven betrifft, oder eine regulatorische Maßnahme gegen Stablecoin-Emittenten), würde alle drei gleichzeitig treffen. Die "Diversifikation innerhalb Stables" ist trügerisch, weil die Stables korreliert sind. Bessere Diversifikation: verschiedene Peg-Typen kombinieren — Fiat-besichert (USDC), krypto-besichert (DAI, LUSD), algorithmisch bewährt (crvUSD). Zusätzlich: nicht 80% in eine Kategorie, sondern über Kategorien verteilen (Stables, Liquid Staking, ETH-Spot, Lending).
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Slides: Titel → StableSwap-Formel → Curve-Pool-Typen → Depeg-Historie (USDC/UST) → Amp-Parameter-Mechanik → CRV-Rewards-Einordnung → Portfolio-Integration
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — StableSwap-Kurve vs. Constant-Product, Curve-Pool-Screenshot (3pool, stETH/ETH), Depeg-Event-Charts (USDC März 2023, stETH Juni 2022), Amp-Parameter-Effekt-Diagramm, Stablecoin-Diversifikations-Matrix

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Modul-Abschluss-Quiz

Fünf Fragen zum integrierten Verständnis von Modul 5.

**Frage 1:** Ein LP hält 1 ETH + 3.000 USDC in einem V2-ETH/USDC-Pool. ETH steigt von 3.000 auf 6.000 (2x). Er hat 300 USDC an Gebühren verdient. Wie viel besser oder schlechter liegt er im Vergleich zu Buy-and-Hold?

<details>
<summary>Antwort anzeigen</summary>

Buy-and-Hold-Wert: 1 × 6.000 + 3.000 = 9.000 USDC. LP-Wert (ohne Gebühren) bei 2x: 9.000 × (1 − 0,057) = 8.487 USDC. Mit 300 USDC Gebühren: 8.787 USDC. Der LP liegt 213 USDC schlechter als Buy-and-Hold. Trotz 300 USDC Gebühren-Einnahmen hat der IL von 513 USDC die Gewinne überkompensiert. Das ist typisch für starke Trendbewegungen: LP unterliegt Buy-and-Hold, weil die AMM-Mechanik zu früh verkauft. Lektion: Bei starkem Uptrend auf volatilen Paaren ist LP-Sein strukturell unterlegen.
</details>

**Frage 2:** Warum sind gepeggte Assets (Stablecoin-Paare, Liquid-Staking-Paare) für konservative LP-Strategien strukturell besser geeignet als volatile Major-Paare?

<details>
<summary>Antwort anzeigen</summary>

Weil die Impermanent-Loss-Formel primär vom Preisänderungs-Faktor abhängt. Gepeggte Assets bewegen sich in Normalsituationen in engen Bändern (0,99–1,01 für Stablecoins; 0,98–1,02 für Liquid-Staking-Tokens wie stETH). Das erzeugt minimalen IL (typisch unter 0,01%). Bei volatilen Paaren wie ETH/USDC sind Bewegungen von 20–50% über Monate normal, mit IL von 2–10%. Gepeggte LPs verdienen die vollen Trading-Gebühren mit nahezu keinem IL-Verlust. Die Gegenkraft: Depeg-Risiko, wenn der Peg bricht. Aber in Normalsituationen ist die risk-adjusted return deutlich besser.
</details>

**Frage 3:** Ein V3-LP positioniert sich in einem ETH/USDC-Pool zwischen 2.800 und 3.200 USDC. ETH steigt auf 3.500. Beschreibe den Zustand der Position.

<details>
<summary>Antwort anzeigen</summary>

Die Position ist out-of-range auf der oberen Seite. Während der Bewegung von 3.000 auf 3.200 wurde die ETH-Exposure schrittweise gegen USDC getauscht (der Pool verkaufte ETH, weil ETH teurer wurde). Ab 3.200 hielt die Position nur noch USDC — keine weitere ETH-Exposure. Der Anstieg von 3.200 auf 3.500 wurde vollständig verpasst. Der LP verdient keine Gebühren, solange out-of-range. Optionen: warten auf Preis-Rückkehr unter 3.200 (unsicher), oder Position auflösen und zu neuem Preis neu positionieren. Bei Neupositionierung wird der IL realisiert — der LP hat effektiv eine Limit-Order ausgeführt, die ETH bei steigenden Preisen verkauft hat.
</details>

**Frage 4:** Warum ist direkte Curve-LP für konservative Portfolios oft besser als Convex-Boosted-Curve-LP?

<details>
<summary>Antwort anzeigen</summary>

Vier Gründe. Erstens: zusätzliches Smart-Contract-Risiko. Convex ist ein weiteres Protokoll zwischen LP und Curve — ein weiterer Audit-Vertrauens-Punkt, eine weitere Angriffsfläche. Zweitens: zusätzliche Reward-Token-Exposure (CVX), der eigenem Preisrisiko unterliegt. Drittens: Komplexere Steuer-Implikationen (wenn zutreffend), wenn Rewards in zwei Tokens ausgegeben werden. Viertens: die inkrementelle Rendite ist oft nicht groß genug, um diese zusätzlichen Risiken zu rechtfertigen — 5–7% direkte Curve-LP vs. 6–9% mit Convex-Boost. Für ein 7–8%-Ziel reicht die einfachere Version oft aus. Wenn die Position sehr groß ist, kann Convex-Boost sich rechnen; für typische Retail-Positionen eher nicht.
</details>

**Frage 5:** Ein DeFi-Anleger mit 20.000 USD Portfolio hat 15.000 USD in einer V2-ETH/USDC-LP-Position gebunden. Welche fundamentale Schwäche hat dieses Setup?

<details>
<summary>Antwort anzeigen</summary>

Drei Hauptprobleme. Erstens: Konzentrationsrisiko — 75% des Kapitals in einer einzigen Strategie und einem einzigen Asset-Paar ist extreme Konzentration. Jeder Bruch dieses Pools (Hack, Peg-Problem, Liquidationskaskade) zerstört einen Großteil des Portfolios. Zweitens: Asset-Exposure-Konzentration — die Position hat effektiv 50% ETH-Exposure. Das ist fine, wenn gewollt, aber sollte bewusst sein; oft wollen Anleger neutralere Allokationen. Drittens: IL-Exposition bei starken Bewegungen. Bessere Alternative: Diversifikation über Strategie-Typen (Lending, LP, Spot), über Assets (ETH, BTC, Stables), und über Protokolle (Aave, Curve, Uniswap). Modul 12 vertieft die Logik von Portfolio-Konstruktion.
</details>

---

## Modul-Zusammenfassung

Du hast in Modul 5 eine nüchterne, professionelle Sicht auf Liquidity Providing entwickelt:

**LP-Grundlagen:** Ein LP ist ein Marktmacher, keine Sparbuch-Position. Einnahmen kommen aus Trading-Gebühren (nachhaltig) und Rewards (oft subventioniert und fragil).

**Impermanent Loss:** Mathematisch unvermeidbar bei jeder Preisänderung des Asset-Paares. 2x-Bewegung = 5,7% IL, 3x = 13,4%, 5x = 25,5%. Die Formel ist symmetrisch und deterministisch.

**Netto-Rendite:** Gebühren + Rewards − IL − Gas. Auf volatilen Paaren mit Trendbewegung schlägt Buy-and-Hold LP-Sein fast immer.

**V2-Praxis:** Einfach zu deployen, passive Nutzung möglich, moderate Renditen (5–15% auf Majors). Monatliches Monitoring ausreichend. Realistisch 3–10% Netto-Rendite nach IL auf Majors.

**V3-Praxis:** Mächtig, aber komplex. Strukturell höherer IL pro Preisänderung durch Konzentration. Für Stablecoin-Paare und gepeggte Assets ist V3 ein Sweet Spot. Auf volatilen Paaren nur für aktive Experten sinnvoll.

**Curve und gepeggte LPs:** StableSwap-Formel optimiert für niedrig-volatile Paare. 3pool, crvUSD-Pools, stETH/ETH sind konservativ geeignet. Depeg-Risiko ist das Haupt-Risiko, nicht IL.

**Konservative Kern-Empfehlung:** Für 7–8% Ziel-Rendite ist LP-Sein ein Baustein, nicht das Ganze. Stablecoin-LPs auf Curve (3–6% Rendite) können Teil eines Mixes mit Lending, Staking und Spot sein. LP auf volatilen Paaren ist für passive Anleger meist nicht optimal.

**Was in Modul 6 kommt:** Lending-Märkte. Wie Aave, Compound und Morpho funktionieren. Zinsmodelle, Supply/Borrow-Dynamik, Collateral-Mechanik. Das ist der zweite große Baustein konservativer DeFi-Portfolios — oft stabiler und einfacher als LP-Strategien.

---

*Ende von Modul 5.*
