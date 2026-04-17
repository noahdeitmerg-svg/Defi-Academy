# Modul 7 — Sicherheiten und Liquidationen

**Zielgruppe:** Einsteiger bis Fortgeschrittene
**Geschätzte Dauer:** 90–110 Minuten
**Voraussetzungen:** Module 1–6 abgeschlossen

---

## Modul-Überblick

In Modul 6 standst du auf der Supply-Seite — du hast Kapital hinterlegt und Zinsen verdient. Dieses Modul behandelt die andere Seite: das Aufnehmen von Krediten gegen Sicherheiten. Das ist der mächtigste Hebel in DeFi, und gleichzeitig der häufigste Weg, Kapital permanent zu verlieren.

Die Mechanik ist erbarmungslos einfach: Wenn deine Sicherheit zu stark im Wert verliert, wird deine Position automatisch liquidiert — mit einem Abschlag, der oft 5 bis 15 Prozent des Collaterals beträgt. Keine Gnade, keine Verhandlung. Der Smart Contract führt aus, was im Code steht.

Dieses Modul ist bewusst konservativ geschrieben. Das Ziel ist nicht, dich zum aggressiven Borrower zu machen. Das Ziel ist, dass du — wenn du dich entscheidest, zu borgen — mit klarem Verständnis der Mechanik und mit ausreichendem Sicherheitspuffer vorgehst. Für das 7–8%-Jahresziel des Kurses sind extreme LTV-Positionen nicht nötig und selten sinnvoll.

**Lektionen:**
1. Collateral und Loan-to-Value: Die Grundmechanik
2. Health Factor: Die zentrale Risiko-Metrik
3. Liquidationen: Wie sie mechanisch ablaufen
4. Oracle-Risiken und Liquidations-Preis
5. Liquidations-Kaskaden und systemische Risiken
6. Borrow-Hygiene für konservative Nutzer

---

## Lektion 7.1 — Collateral und Loan-to-Value: Die Grundmechanik

### Learning Objectives

After completing this lesson the learner will be able to:
- Die drei wichtigsten LTV-Parameter (LTV, LT, LB) voneinander unterscheiden
- Eine konkrete Borrow-Position mit Sicherheitspuffer berechnen
- Die Rolle unterschiedlicher Collateral-Assets in Bezug auf ihre LTV-Werte einordnen

### Explanation

Ein DeFi-Kredit ist immer überbesichert. Du hinterlegst mehr Wert, als du borgst. Die Frage ist: wie viel mehr?

Das beantworten drei Parameter, die jedes Lending-Protokoll pro Asset definiert.

**Parameter 1: Loan-to-Value (LTV) — die maximale Borrow-Quote**

LTV ist der Prozentsatz des Collateral-Werts, den du maximal borgen kannst. Beispiele aus Aave V3:
- ETH: 80% LTV
- wstETH: 78,5% LTV
- WBTC: 73% LTV
- USDC: 77% LTV (als Collateral)

Wenn du 10.000 USD ETH als Collateral hinterlegst und das LTV 80% beträgt, ist dein maximaler Borrow 8.000 USD.

**Wichtig:** Das LTV ist das absolute Maximum. Genau auf 80% zu gehen bedeutet, dass jede kleinste Preisbewegung sofort liquidiert werden kann. Praktisch arbeitet man deutlich darunter.

**Parameter 2: Liquidation Threshold (LT) — die Liquidations-Grenze**

LT ist die Quote, ab der deine Position liquidiert wird. Sie liegt immer **etwas höher als das LTV**. Beispiele Aave V3:
- ETH: 83% LT (bei 80% LTV)
- wstETH: 81% LT (bei 78,5% LTV)
- WBTC: 78% LT (bei 73% LTV)
- USDC: 80% LT (bei 77% LTV)

Der Unterschied zwischen LTV und LT — typisch 3 bis 5 Prozentpunkte — ist ein kleiner Sicherheitspuffer. Er existiert, damit neue Positionen nicht sofort liquidiert werden.

**Beispiel:** Du hinterlegst 10.000 USD ETH, borgst 8.000 USD USDC (LTV = 80%). Dein aktuelles Verhältnis ist direkt auf der LTV-Grenze. Fällt ETH auch nur um 1%, wird dein Verhältnis auf etwa 80,8% steigen — noch unter LT. Fällt ETH um 4%, steigt das Verhältnis auf etwa 83,3% — **Liquidation**.

**Parameter 3: Liquidation Bonus / Liquidation Penalty (LB) — der Liquidator-Anreiz**

Wenn deine Position liquidiert wird, bekommt der Liquidator einen Bonus — einen Abschlag auf das Collateral. Beispiele Aave V3:
- ETH: 5% LB
- wstETH: 6,25% LB
- WBTC: 6,5% LB
- Instabilere Assets: 7–15% LB

**Was das konkret bedeutet:**

Wenn deine Position liquidiert wird, verkauft das Protokoll einen Teil deines Collaterals **zum Marktpreis minus LB**. Ein 5%-LB bedeutet: der Liquidator bekommt das ETH für 95 Cent pro Dollar — einen 5%-Rabatt. Der Rest kommt dir zurück, aber du hast effektiv einen 5%-Verlust auf den liquidierten Teil.

**Warum das System so gebaut ist**

Die drei Parameter zusammen schaffen einen **funktionalen Markt für Risiko-Ausfälle**:

1. LTV definiert das Borrowing-Limit konservativ
2. LT gibt einen kleinen Puffer für Volatilität
3. LB motiviert spezialisierte Liquidator-Bots, ihre Arbeit zu tun

Liquidator-Bots sind spezialisierte Programme, die Pool-Zustände ständig überwachen und bei liquidierbaren Positionen sofort zuschlagen. Der LB ist ihr Gewinn. Ohne diesen Anreiz würde niemand die Liquidation ausführen, und das Protokoll hätte "Bad Debt" — Schulden, die nicht mehr durch Collateral gedeckt sind.

**Asset-Typen und ihre LTV-Werte**

Je volatiler und illiquider ein Asset, desto konservativer sein LTV:

| Asset-Typ | Typisches LTV | Grund |
|---|---|---|
| Major Stablecoins (USDC, USDT, DAI) | 75–80% | Niedrige Volatilität |
| Major Krypto (ETH, WBTC) | 70–80% | Moderate Volatilität, hohe Liquidität |
| Liquid-Staking-Tokens (wstETH, rETH) | 70–78% | Mit eingebettetem Depeg-Risiko |
| Kleinere Tokens (Governance-Tokens) | 40–65% | Höhere Volatilität, geringere Liquidität |
| Sehr volatile Tokens | 30–50% oder Isolation Mode | Hohes Preisrisiko |

**E-Mode (Efficient Mode) auf Aave V3**

Wie in Modul 6 erwähnt: Aave V3s E-Mode erlaubt deutlich höhere LTV-Werte für korrelierte Assets:

- **Stablecoin E-Mode:** USDC als Collateral, USDT borgen — LTV bis zu 93%
- **ETH-Correlated E-Mode:** wstETH als Collateral, ETH borgen — LTV bis zu 93%

Diese hohen LTV-Werte sind möglich, weil die Preise der beteiligten Assets strukturell korreliert sind. Ein wstETH-ETH-Paar bewegt sich typisch in engen Bändern — das Liquidations-Risiko ist niedriger als bei unkorrelierten Paaren.

**Aber:** E-Mode ist ein zweischneidiges Werkzeug. Bei einem stETH-Depeg (wie Juni 2022) kann eine 93%-LTV-Position sehr schnell liquidiert werden, weil der Sicherheitspuffer minimal ist. E-Mode ist für erfahrene Nutzer mit klaren Risikomanagement-Prozessen gedacht, nicht für passive Einsteiger.

**Konservative Richtgröße**

Für konservative Strategien gilt: Arbeite mit LTV-Werten **deutlich unter** dem Protokoll-Maximum. Eine gute Daumenregel:

- Stabiler Borrow (Stablecoin gegen Stablecoin in E-Mode): max. 75% genutzt von verfügbaren 93%
- ETH-Collateral, Stablecoin-Borrow: max. 40–50% genutzt von verfügbaren 80%
- Volatile Collaterals: max. 30% genutzt von verfügbaren 60%

Diese Werte klingen ineffizient — aber sie sind der Grund, warum konservative Strategien selten liquidiert werden. Mehr dazu in Lektion 7.6.

### Slide Summary

**[Slide 1] — Titel**
Collateral und Loan-to-Value: Die Grundmechanik

**[Slide 2] — Drei Parameter**
LTV: Maximale Borrow-Quote
LT: Liquidations-Grenze (etwas höher als LTV)
LB: Liquidations-Bonus für Liquidator-Bots

**[Slide 3] — Beispiel ETH-Collateral auf Aave**
LTV 80%, LT 83%, LB 5%
10.000 USD ETH → max. 8.000 USD borgbar
4% Preis-Drop → Liquidation

**[Slide 4] — Warum der Liquidations-Bonus existiert**
Motiviert Liquidator-Bots zur Ausführung
Ohne LB: Bad Debt für das Protokoll
Kosten für den Borrower: 5–15% des liquidierten Collaterals

**[Slide 5] — LTV nach Asset-Typ**
Stables: 75–80%
Major Krypto: 70–80%
Liquid Staking: 70–78%
Volatile Tokens: 30–65%

**[Slide 6] — E-Mode auf Aave**
Hochkorrelierte Assets → LTV bis 93%
Stablecoin-E-Mode, ETH-Correlated-E-Mode
Mächtig, aber risikoreich bei Depeg

**[Slide 7] — Konservative Richtgröße**
Nutze 40–60% des verfügbaren LTV.
Der Puffer ist dein Überlebensraum.

### Voice Narration Script

**[Slide 1]** Modul 7 behandelt die Borrow-Seite. In Modul 6 standst du auf der Supply-Seite. Jetzt bist du derjenige, der Kapital aufnimmt — gegen Sicherheiten. Das ist der mächtigste Hebel in DeFi und gleichzeitig der häufigste Weg, Kapital permanent zu verlieren. Diese erste Lektion legt die Grundmechanik.

**[Slide 2]** Drei Parameter definieren jeden Collateral-Asset. LTV, Loan-to-Value, ist die maximale Borrow-Quote. LT, Liquidation Threshold, ist die Quote, ab der deine Position liquidiert wird — etwas höher als LTV. LB, Liquidation Bonus, ist der Abschlag, den ein Liquidator bekommt, wenn er deine Position ausführt. Diese drei Zahlen musst du für jede Position kennen, bevor du borgst.

**[Slide 3]** Ein konkretes Beispiel. ETH-Collateral auf Aave hat LTV 80, LT 83, LB 5. Du hinterlegst 10.000 Dollar ETH, kannst maximal 8.000 Dollar borgen. Wenn du genau auf dem LTV-Maximum bist, reicht ein Preis-Drop von etwa 4 Prozent, um dich über die LT zu bringen — und die Liquidation auszulösen.

**[Slide 4]** Warum existiert der Liquidations-Bonus überhaupt. Er motiviert spezialisierte Liquidator-Bots — Programme, die Pool-Zustände ständig überwachen und bei liquidierbaren Positionen sofort zuschlagen. Der LB ist ihr Gewinn. Ohne diesen Anreiz würde niemand die Liquidation ausführen, und das Protokoll hätte Bad Debt — Schulden, die nicht mehr durch Collateral gedeckt sind. Für dich als Borrower ist der LB eine reale Kosten-Komponente: 5 bis 15 Prozent des liquidierten Collaterals, abhängig vom Asset.

**[Slide 5]** LTV nach Asset-Typ. Stablecoins haben typisch 75 bis 80 Prozent LTV, weil niedrige Volatilität. Major Kryptos wie ETH und WBTC 70 bis 80. Liquid-Staking-Tokens etwas konservativer wegen eingebettetem Depeg-Risiko. Kleine oder volatile Tokens drastisch niedriger — 30 bis 65 Prozent, oft in Isolation Mode.

**[Slide 6]** E-Mode, Efficient Mode auf Aave V3. Für hoch korrelierte Assets — Stablecoin-Stablecoin, ETH-wstETH — sind LTV-Werte bis 93 Prozent möglich. Das ist mächtig für kapital-effiziente Strategien. Aber es ist risikoreich: bei einem Depeg, wie stETH im Juni 2022, wird die 93-Prozent-Position sehr schnell liquidiert. E-Mode ist für erfahrene Nutzer mit klaren Risikomanagement-Prozessen, nicht für passive Einsteiger.

**[Slide 7]** Die konservative Richtgröße. Nutze 40 bis 60 Prozent des verfügbaren LTV, nicht das Maximum. Das klingt ineffizient, aber es ist der Grund, warum konservative Strategien selten liquidiert werden. Der Puffer zwischen deiner aktuellen Position und der Liquidations-Grenze ist dein Überlebensraum bei Marktschwankungen. Alles Weitere in diesem Modul baut auf diesem Prinzip auf.

### Visual Suggestions

**[Slide 1]** Titelfolie.

**[Slide 2]** Visualisierung einer Collateral-Leiste mit drei Markierungen: LTV (grün bis hier), LT (gelb, Warnung), Liquidation-Zone (rot).

**[Slide 3]** Schritt-für-Schritt-Rechnung mit Zahlen. **SCREENSHOT SUGGESTION:** Aave-App mit einer Collateral-Position, die LTV und Liquidation-Price anzeigt.

**[Slide 4]** Liquidator-Bot-Ökosystem-Diagramm: Pool → Preis-Feed → Bot → Liquidations-Transaktion → Bonus-Auszahlung.

**[Slide 5]** Tabelle der Asset-Typen mit ihren LTV-Werten, farblich nach Risiko gestuft.

**[Slide 6]** E-Mode-Visualisierung: normale LTV-Werte vs. erhöhte LTV-Werte in E-Mode-Kategorien.

**[Slide 7]** Sicherheitspuffer-Grafik: Maximum-LTV vs. empfohlene konservative Nutzung.

### Exercise

**Aufgabe: LTV-Parameter einer realen Position nachschlagen**

1. Öffne app.aave.com → Markets → Ethereum.
2. Für folgende Collateral-Assets notiere LTV, Liquidation Threshold und Liquidation Bonus:
   - WETH
   - wstETH
   - WBTC
   - USDC
   - DAI
3. Berechne für jedes Asset: Wenn du 10.000 USD als Collateral hinterlegst, bei wie vielen Prozent Preisabfall würdest du liquidiert, wenn du direkt auf das Maximum-LTV borgst?

**Deliverable:** Tabelle mit 5 Zeilen. Zusätzlich: Einschätzung (3–5 Sätze), welcher Collateral-Asset-Typ dir aus Risiko-Perspektive am ehesten sinnvoll erscheint und warum.

### Quiz

**Frage 1:** Warum liegt der Liquidation Threshold immer höher als das LTV?

<details>
<summary>Antwort anzeigen</summary>

Der Unterschied zwischen LTV und LT — typisch 3 bis 5 Prozentpunkte — ist ein absichtlicher Sicherheitspuffer. Wenn ein Borrower bis zum Maximum-LTV borgt, ist seine Position genau auf dem Borrow-Limit. Bei einer auch nur minimalen Preisbewegung würde das Verhältnis sofort das LTV überschreiten. Wenn LT gleich LTV wäre, würde jede Position bei Erstellung sofort liquidiert, weil das LTV-Verhältnis durch Rundungsfehler oder Gas-Kosten bereits marginal überschritten sein könnte. Der Puffer zwischen LTV und LT ermöglicht es, dass neue Positionen überhaupt stabil existieren können — und gibt kleinen Preisbewegungen Raum, ohne sofortige Liquidation.
</details>

**Frage 2:** Ein Borrower hinterlegt 20.000 USD ETH und borgt 14.000 USD USDC (LTV 80% für ETH, LT 83%, LB 5%). Bei welchem ETH-Preis-Drop würde er liquidiert, und wie hoch wäre der effektive Verlust?

<details>
<summary>Antwort anzeigen</summary>

Startposition: 20.000 USD Collateral, 14.000 USD Schuld, Verhältnis 70%. Liquidation bei 83%. Damit das Verhältnis auf 83% steigt, muss der Collateral-Wert auf 14.000 / 0,83 = 16.867 USD fallen. Das ist ein Rückgang von 20.000 auf 16.867, also −15,7%. Bei Liquidation wird ein Teil des Collaterals mit 5% Rabatt an den Liquidator verkauft. Je nach Protokoll wird die gesamte Schuld oder nur ein Teil liquidiert. Bei voller Liquidation: 14.000 USD Schuld wird mit Collateral zum Wert von 14.000 × 1,05 = 14.700 USD gedeckt. Der effektive Verlust durch den Liquidations-Bonus beträgt 700 USD — zusätzlich zu den −15,7% Preisverlust, die den Borrower ohnehin betroffen hätten. Der Borrower sitzt am Ende auf 16.867 − 14.700 = 2.167 USD Collateral + 14.000 USD geliehene USDC, insgesamt etwa 16.167 USD — ein Netto-Verlust von 3.833 USD gegenüber der Startsituation, wovon 700 USD reiner Liquidations-Penalty ist.
</details>

---

## Lektion 7.2 — Health Factor: Die zentrale Risiko-Metrik

### Learning Objectives

After completing this lesson the learner will be able to:
- Health Factor präzise definieren und berechnen
- Den Zusammenhang zwischen Health Factor und Liquidations-Preis herstellen
- Konservative Health-Factor-Zielwerte für verschiedene Strategien benennen

### Explanation

In Lektion 7.1 hast du die statischen LTV-Parameter kennengelernt. In der Praxis beobachtest du aber keine LTV-Zahl, sondern eine dynamische Metrik: den **Health Factor**.

**Die Formel**

```
Health Factor = (Collateral-Wert × Liquidation Threshold) / Schuld-Wert
```

Der Health Factor ist die Risiko-Metrik, die Aave und ähnliche Protokolle anzeigen. Er hat drei entscheidende Werte:

- **Health Factor > 1:** Position ist sicher
- **Health Factor = 1:** Position ist direkt an der Liquidations-Grenze
- **Health Factor < 1:** Position kann liquidiert werden

**Konkretes Beispiel**

Du hast 10.000 USD ETH als Collateral (LT = 83%), und 5.000 USD USDC Schuld.

```
Health Factor = (10.000 × 0,83) / 5.000 = 8.300 / 5.000 = 1,66
```

Ein Health Factor von 1,66 bedeutet: du hast 66% Puffer über der Liquidations-Grenze. Der Collateral-Wert könnte auf 1 / 1,66 = 60% fallen, bevor Liquidation droht.

**Health Factor vs. LTV: die Beziehung**

LTV und Health Factor sind mathematisch gekoppelt:

```
Aktuelles LTV = Schuld / Collateral
Health Factor = LT / Aktuelles LTV
```

Für ETH-Collateral (LT = 83%):
- Aktuelles LTV = 30% → Health Factor = 0,83 / 0,30 = 2,77
- Aktuelles LTV = 50% → Health Factor = 0,83 / 0,50 = 1,66
- Aktuelles LTV = 70% → Health Factor = 0,83 / 0,70 = 1,19
- Aktuelles LTV = 83% → Health Factor = 1,00 — **Liquidations-Grenze**

**Der Liquidations-Preis**

Viele Protokoll-Interfaces zeigen zusätzlich zum Health Factor einen "Liquidations-Preis". Das ist der Preis des Collateral-Assets, bei dem der Health Factor auf 1 fällt.

**Berechnung für ein einfaches Setup (nur ein volatiler Collateral-Asset):**

```
Liquidations-Preis = (Schuld × Aktueller Preis) / (Collateral-Menge × LT)
```

Beispiel: 5 ETH als Collateral bei 3.000 USD/ETH, 9.000 USD USDC Schuld, LT 83%.

```
Liquidations-Preis = (9.000 × 3.000) / (5 × 3.000 × 0,83)
                    = 9.000 / (5 × 0,83)
                    = 9.000 / 4,15
                    = 2.169 USD/ETH
```

Wenn ETH auf 2.169 USD fällt, wird die Position liquidiert. Das ist ein Rückgang von 3.000 auf 2.169, also −28%.

**Wie Health Factor sich bewegt**

Health Factor kann sich **ohne dein Zutun** ändern. Drei Mechanismen:

1. **Preisbewegung des Collaterals:** ETH fällt → Collateral-Wert fällt → Health Factor sinkt
2. **Preisbewegung der Schuld:** Wenn du ETH geborgt hast und ETH steigt → Schuld-Wert steigt → Health Factor sinkt
3. **Zinsakkumulation:** Deine Schuld wächst durch laufende Zinsen → Health Factor sinkt langsam

Dieser dritte Punkt wird oft übersehen. Bei hohen Borrow-Zinsen kann die Schuld signifikant wachsen, während der Collateral-Preis stabil bleibt — und trotzdem nähert sich der Health Factor 1 an.

**Konservative Health-Factor-Zielwerte**

Für verschiedene Strategien sind unterschiedliche Health-Factor-Zielbereiche sinnvoll:

**Sehr konservativ (Einstieg, Learning-Phase):**
- Health Factor > 2,5
- Das entspricht etwa 33% Nutzung des verfügbaren LTV (bei LT 83%)
- Puffer: ~60% Preis-Drop bis Liquidation

**Konservativ (Normal-Betrieb):**
- Health Factor 2,0 – 2,5
- ~40% Nutzung des verfügbaren LTV
- Puffer: ~50% Preis-Drop bis Liquidation

**Moderat (erfahrene Nutzer):**
- Health Factor 1,5 – 2,0
- ~55% Nutzung des verfügbaren LTV
- Puffer: ~33% Preis-Drop bis Liquidation

**Aggressiv (Experten, kurzfristige Positionen):**
- Health Factor 1,2 – 1,5
- ~70% Nutzung des verfügbaren LTV
- Puffer: ~20% Preis-Drop bis Liquidation

**Gefährlich (abzuraten):**
- Health Factor < 1,2
- Minimaler Puffer, hohe Liquidations-Wahrscheinlichkeit bei normaler Marktvolatilität

Für das 7–8%-Jahresziel sind konservative Health-Factor-Werte ab 2,0 empfohlen. Alles darunter erhöht die Liquidations-Wahrscheinlichkeit überproportional zur Rendite-Verbesserung.

**Praktische Monitoring-Regel**

Eine einfache Daumenregel: Wenn dein Health Factor unter 1,5 fällt, solltest du handeln — entweder Schuld zurückzahlen oder Collateral hinzufügen. Nicht warten, bis er bei 1,1 ist. Liquidationen können innerhalb von Minuten passieren, besonders bei volatilen Märkten oder plötzlichen Preis-Bewegungen.

### Slide Summary

**[Slide 1] — Titel**
Health Factor: Die zentrale Risiko-Metrik

**[Slide 2] — Die Formel**
HF = (Collateral × LT) / Schuld
> 1: sicher
= 1: Liquidations-Grenze
< 1: liquidiert

**[Slide 3] — Die Beziehung zum LTV**
HF = LT / aktuelles LTV
50% LTV bei LT 83% → HF = 1,66

**[Slide 4] — Der Liquidations-Preis**
Preis bei dem HF = 1
Wichtigste absolute Zahl im Monitoring

**[Slide 5] — HF-Bewegung (ohne dein Zutun)**
1. Collateral-Preis fällt
2. Schuld-Asset-Preis steigt
3. Zinsakkumulation

**[Slide 6] — Konservative HF-Zielwerte**
> 2,5: Sehr konservativ
2,0–2,5: Konservativ
1,5–2,0: Moderat
1,2–1,5: Aggressiv
< 1,2: Gefährlich

**[Slide 7] — Die Handlungs-Regel**
HF < 1,5 → handeln
Nicht warten bis 1,1

### Voice Narration Script

**[Slide 1]** In Lektion 7.1 hattest du die statischen LTV-Parameter. In der Praxis beobachtest du aber eine dynamische Metrik: den Health Factor. Das ist die zentrale Zahl, an der du deine Position ausrichtest.

**[Slide 2]** Die Formel. Health Factor gleich Collateral-Wert mal Liquidation Threshold, geteilt durch Schuld-Wert. Drei Werte sind entscheidend. Über eins: Position sicher. Genau eins: Liquidations-Grenze. Unter eins: Position kann liquidiert werden. Das ist alles. Wenn du den Health Factor verstehst und beobachtest, verstehst du deine Risiko-Lage.

**[Slide 3]** Die Beziehung zum LTV. Health Factor gleich LT geteilt durch aktuelles LTV. Wenn du bei 50 Prozent LTV stehst und LT 83 Prozent ist, dann Health Factor gleich 0,83 geteilt durch 0,50 — also 1,66. Bei 30 Prozent LTV hättest du 2,77. Bei 70 Prozent LTV nur noch 1,19. Das Verhältnis ist nicht-linear: die letzten Prozent Richtung LT sind die gefährlichsten.

**[Slide 4]** Die meisten Protokoll-Interfaces zeigen zusätzlich den Liquidations-Preis. Das ist der Preis des Collateral-Assets, bei dem der Health Factor auf 1 fällt. Das ist die wichtigste absolute Zahl im Monitoring — sie sagt dir, wie weit die Realität von der Gefahr entfernt ist.

**[Slide 5]** Health Factor kann sich ohne dein Zutun ändern. Drei Mechanismen. Erstens: Collateral-Preis fällt — Health Factor sinkt. Zweitens: Schuld-Asset-Preis steigt. Wenn du ETH geborgt hast und ETH steigt, wächst der USD-Wert deiner Schuld — Health Factor sinkt. Drittens: Zinsakkumulation. Deine Schuld wächst langsam durch laufende Zinsen. Bei hohen Borrow-Raten kann das die Position über Wochen allmählich schwächen, selbst wenn Preise stabil bleiben.

**[Slide 6]** Zielwerte für Health Factor. Sehr konservativ: über 2,5 — etwa 33 Prozent Nutzung des verfügbaren LTV, 60 Prozent Preis-Drop als Puffer. Konservativ: 2,0 bis 2,5 — 40 Prozent Nutzung, 50 Prozent Puffer. Moderat: 1,5 bis 2,0 — 55 Prozent Nutzung, 33 Prozent Puffer. Aggressiv: 1,2 bis 1,5 — für kurzfristige Experten-Positionen. Unter 1,2 ist gefährlich — normale Marktvolatilität kann dich liquidieren.

**[Slide 7]** Die praktische Handlungs-Regel. Wenn dein Health Factor unter 1,5 fällt, handle. Schuld zurückzahlen oder Collateral hinzufügen. Nicht warten, bis er bei 1,1 ist. Liquidationen können in Minuten passieren, besonders bei plötzlichen Markt-Bewegungen. Wer bei 1,1 warten will, verliert oft zu diesem Preis.

### Visual Suggestions

**[Slide 1]** Titelfolie.

**[Slide 2]** Formel-Darstellung mit farbkodierten HF-Wertebereichen (grün/gelb/rot).

**[Slide 3]** Tabelle HF vs. LTV mit den vier Beispielen.

**[Slide 4]** **SCREENSHOT SUGGESTION:** Aave-Dashboard einer laufenden Collateral-Position mit Health Factor und Liquidation Price.

**[Slide 5]** Drei-Icon-Darstellung der HF-Bewegungs-Mechanismen: fallender Chart für Collateral-Preis, steigender Chart für Schuld-Asset, wachsendes Prozent-Symbol für Zinsen.

**[Slide 6]** Farb-Skala mit den HF-Zonen und empfohlenen Strategien.

**[Slide 7]** Warn-Icon mit "HF < 1,5 → Handeln".

### Exercise

**Aufgabe: Health Factor für drei Szenarien berechnen**

Szenario 1: 15.000 USD wstETH als Collateral (LT 81%), 7.000 USD USDC Schuld
Szenario 2: 8.000 USD ETH als Collateral (LT 83%), 6.000 USD USDC Schuld
Szenario 3: 25.000 USD USDC als Collateral (LT 80%), 15.000 USD USDT Schuld (in Stablecoin E-Mode mit LT 95%)

Für jedes Szenario berechne:
- Aktuelles LTV in Prozent
- Health Factor
- Liquidations-Preis (wenn anwendbar — für Szenario 3 dagegen den Depeg-Puffer)
- Einstufung (sehr konservativ / konservativ / moderat / aggressiv / gefährlich)

**Deliverable:** Tabelle mit 3 Szenarien. Kurze Einschätzung (4–6 Sätze): Welches Szenario würdest du als konservativer Nutzer akzeptieren, welches würdest du ablehnen, warum?

### Quiz

**Frage 1:** Eine Position hat Health Factor 2,0. Was bedeutet das konkret?

<details>
<summary>Antwort anzeigen</summary>

HF 2,0 bedeutet, dass der Collateral-Wert um die Hälfte fallen könnte — 50% — bevor der Health Factor auf 1 sinkt und Liquidation droht. Genauer: Wenn HF = LT / aktuelles LTV und HF = 2, dann ist das aktuelle LTV halb so hoch wie LT. Bei einem Asset mit LT = 80% heißt das, das aktuelle LTV ist bei 40%. Das ist eine konservative Position mit gutem Puffer. Allerdings: bei starken Markt-Volatilitäten (z.B. Krypto-Crashes von 30–50% in kurzen Zeiträumen) reicht auch ein HF von 2,0 nicht immer aus. Deshalb ist die zusätzliche Daumenregel "bei HF < 1,5 handeln" wichtig — sie gibt Zeit zur Reaktion, bevor die Position kritisch wird.
</details>

**Frage 2:** Warum ist Zinsakkumulation auf die Schuld oft ein übersehenes Risiko für Borrower?

<details>
<summary>Antwort anzeigen</summary>

Zinsakkumulation wirkt schleichend. Über Tage oder Wochen sichtbar als langsame HF-Verschlechterung, ohne dass Preise sich bewegen. Ein Borrower, der nur auf Markt-Events schaut, übersieht diesen Effekt. Bei hohen Borrow-Zinsen — die in Volatilitäts-Phasen schnell von 5% auf 15% oder mehr springen können — kann eine Schuld deutlich wachsen. Beispiel: 10.000 USD Schuld bei 20% Borrow-Rate wächst in einem Monat auf 10.167 USD, in sechs Monaten auf 11.050 USD, in einem Jahr auf 12.200 USD. Ohne Preisänderung des Collaterals sinkt der Health Factor durch dieses Wachstum allein. Für langfristige Borrow-Positionen ist das ein signifikanter Faktor — und ein Grund, warum Positions-Monitoring über mehrere Wochen nötig ist, nicht nur bei Markt-Events.
</details>

---

## Lektion 7.3 — Liquidationen: Wie sie mechanisch ablaufen

### Learning Objectives

After completing this lesson the learner will be able to:
- Den technischen Ablauf einer Liquidation Schritt für Schritt beschreiben
- Zwischen Full Liquidation und Partial Liquidation unterscheiden
- Eine reale Liquidations-Transaktion auf Etherscan analysieren

### Explanation

Wenn dein Health Factor unter 1 fällt, beginnt der Liquidations-Prozess. Dieser Prozess ist vollständig automatisiert — kein Mensch entscheidet, kein Gnadenakt. Ein Smart Contract führt aus, was im Code steht. Diese Lektion erklärt den genauen Ablauf.

**Schritt 1: Der Liquidator-Bot erkennt die Gelegenheit**

Spezialisierte Programme — Liquidator-Bots — überwachen Lending-Protokolle kontinuierlich. Sie lesen Pool-Zustände und Preis-Feeds alle paar Sekunden. Wenn eine Position unter Health Factor 1 fällt, identifiziert der Bot sie als "liquidatable".

Die Bots konkurrieren miteinander. Die Liquidation ist typischerweise profitabel (wegen des Liquidations-Bonus), also wollen mehrere Bots gleichzeitig zuschlagen. Oft endet das in einem "Gas War" — Bots erhöhen ihre Gas-Preise, um zuerst in den Block zu kommen. Auf Ethereum Mainnet kann das die Gas-Kosten einer Liquidation um ein Vielfaches erhöhen.

**Schritt 2: Die Liquidations-Transaktion**

Der gewinnende Bot sendet eine Transaktion, die die `liquidationCall`-Funktion des Protokolls aufruft. Parameter der Funktion:

- **Collateral-Asset:** welches Collateral wird liquidiert (z.B. wstETH)
- **Debt-Asset:** welche Schuld wird getilgt (z.B. USDC)
- **User:** die liquidierbare Position (Adresse des Borrowers)
- **Debt-to-Cover:** wie viel Schuld getilgt werden soll
- **Receive-aToken:** ob der Bot das Collateral als aToken behalten oder direkt tauschen will

Die Transaktion tilgt einen Teil oder die gesamte Schuld mit dem Collateral, und der Bot bekommt den LB als Bonus.

**Schritt 3: Partial vs. Full Liquidation**

Verschiedene Protokolle handhaben das unterschiedlich:

**Aave V3: Close Factor**
Wenn HF zwischen 0,95 und 1,0 fällt, kann nur 50% der Schuld liquidiert werden (Partial Liquidation). Erst wenn HF unter 0,95 fällt, kann die gesamte Schuld in einem Schritt liquidiert werden (Full Liquidation).

Praktische Konsequenz: bei langsamen HF-Fällen wird oft zuerst partiell liquidiert, was die Position stabilisiert (HF steigt durch Schulden-Reduktion). Bei schnellen Preis-Crashes kann die Position direkt unter 0,95 HF fallen, und Full Liquidation erfolgt sofort.

**Compound V3: Unterschiedliches Modell**
Compound V3 liquidiert oft die gesamte Position auf einmal, wenn die Kredit-Position den Absorb-Mechanismus auslöst. Die Details variieren je nach Protokoll-Version.

**MakerDAO / Spark: Auktionssystem**
Bei MakerDAO läuft Liquidation oft über ein Auktions-System — Collateral wird öffentlich versteigert, und der höchste Bieter bekommt es.

**Morpho Blue: Einfaches Modell**
Morpho Blue-Märkte haben meist einfache Partial/Full-Mechaniken, die von der Markt-Konfiguration abhängen.

Wichtig: du solltest bei jedem Protokoll die spezifische Liquidations-Mechanik verstehen, bevor du dort borgst.

**Schritt 4: Was der Borrower bekommt**

Nach der Liquidation:
- Ein Teil der Schuld ist getilgt (vom Liquidator bezahlt)
- Entsprechendes Collateral (plus LB) ist an den Liquidator gegangen
- Der Rest des Collaterals bleibt beim Borrower
- Die verbleibende Position (falls nicht voll liquidiert) ist wieder oberhalb Health Factor 1

**Beispiel einer Full Liquidation:**

Startposition:
- 10 ETH Collateral bei 3.000 USD/ETH (30.000 USD)
- 24.000 USD USDC Schuld
- Aktuelles LTV: 80% (direkt am Max)

ETH fällt auf 2.700 USD:
- Collateral jetzt 10 × 2.700 = 27.000 USD
- Aktuelles LTV: 24.000 / 27.000 = 88,9% — über LT (83%)
- Health Factor: 0,83 / 0,889 = 0,93 — LIQUIDIERBAR
- Weil HF < 0,95: Full Liquidation möglich

Liquidator führt aus (LB 5%):
- Er tilgt 24.000 USD USDC Schuld
- Er bekommt 24.000 × 1,05 / 2.700 = 9,33 ETH (Wert 25.200 USD)
- Collateral-Rest beim Borrower: 10 − 9,33 = 0,67 ETH (Wert 1.800 USD)

Borrower's Ergebnis:
- Startwert: 30.000 USD Collateral, 24.000 USD Schuld → Nettowert 6.000 USD
- Endwert: 1.800 USD Collateral, 0 Schuld → Nettowert 1.800 USD
- **Verlust: 4.200 USD**

Davon sind:
- 3.000 USD Preis-Verlust (ETH von 30.000 auf 27.000)
- 1.200 USD Liquidations-Penalty (5% von 24.000 USD)

Der Preis-Verlust hätte den Borrower ohnehin getroffen. Aber die 1.200 USD Liquidations-Penalty wären vermeidbar gewesen, wenn er rechtzeitig Schuld zurückgezahlt oder Collateral hinzugefügt hätte.

**Eine reale Liquidation auf Etherscan finden**

Du kannst reale Liquidationen untersuchen:
1. Gehe zu app.aave.com → "Historical Liquidations" oder zu einem Analytics-Dashboard
2. Alternativ: Dune Analytics Liquidations-Dashboards
3. Wähle eine Liquidations-Transaktion
4. Öffne den Transaktions-Hash auf etherscan.io
5. Unter "Decoded Input Data" siehst du die Parameter der `liquidationCall`-Funktion
6. In den Event-Logs siehst du die bewegten Token-Mengen

Das ist die transparente Natur von DeFi: jede Liquidation ist öffentlich einsehbar.

### Slide Summary

**[Slide 1] — Titel**
Liquidationen: Wie sie mechanisch ablaufen

**[Slide 2] — Die vier Schritte**
1. Liquidator-Bot erkennt Gelegenheit
2. Sendet liquidationCall-Transaktion
3. Protokoll führt aus
4. Borrower bekommt Rest-Collateral

**[Slide 3] — Bot-Wettbewerb**
Mehrere Bots konkurrieren um profitable Liquidationen
Gas-Wars auf Mainnet
Sekunden-Fenster für Aktion

**[Slide 4] — Partial vs. Full Liquidation**
Aave V3: 50% Close Factor bei HF > 0,95; 100% bei HF < 0,95
Unterschiedliche Protokolle haben verschiedene Mechaniken

**[Slide 5] — Beispiel-Rechnung**
ETH von 3.000 auf 2.700 → LIQUIDATION
Borrower-Verlust: 4.200 USD
Davon 1.200 vermeidbare Liquidations-Penalty

**[Slide 6] — Transparenz**
Jede Liquidation ist auf Etherscan einsehbar
Historische Analyse möglich

### Voice Narration Script

**[Slide 1]** Wenn dein Health Factor unter 1 fällt, beginnt der Liquidations-Prozess. Vollständig automatisiert. Kein Mensch entscheidet. Diese Lektion erklärt den genauen Ablauf, damit du verstehst, was in den Sekunden nach HF-Überschreitung passiert.

**[Slide 2]** Der Ablauf in vier Schritten. Erstens: ein Liquidator-Bot erkennt die Gelegenheit. Zweitens: er sendet eine liquidationCall-Transaktion an das Protokoll. Drittens: das Protokoll führt die Logik aus — Schuld wird getilgt, Collateral geht an den Liquidator mit Bonus. Viertens: der Borrower bekommt das Rest-Collateral und hat keine Schuld mehr auf diesem Teil.

**[Slide 3]** Wichtig: es gibt viele Bots. Sie konkurrieren um profitable Liquidationen. Auf Ethereum Mainnet führt das oft zu Gas-Wars — Bots erhöhen ihre Gas-Preise, um zuerst in den Block zu kommen. Die Liquidation passiert typisch innerhalb von Sekunden nach HF-Unterschreitung. Als Borrower hast du praktisch kein Fenster mehr, um zu reagieren, sobald HF unter 1 fällt.

**[Slide 4]** Partial versus Full Liquidation. Aave V3 verwendet einen Close Factor. Wenn Health Factor zwischen 0,95 und 1,0 liegt, darf nur 50 Prozent der Schuld liquidiert werden — Partial. Erst wenn HF unter 0,95 fällt, ist Full Liquidation der gesamten Position möglich. Bei schnellen Preis-Crashes kann HF direkt unter 0,95 fallen, dann wird alles auf einmal liquidiert. Andere Protokolle haben andere Mechaniken — MakerDAO nutzt Auktionen, Morpho Blue hat einfachere Modelle. Prüfe bei jedem Protokoll die spezifische Mechanik.

**[Slide 5]** Eine konkrete Beispiel-Rechnung. Startposition: 10 ETH Collateral bei 3.000 Dollar pro ETH, 24.000 Dollar USDC Schuld. ETH fällt auf 2.700 — das triggert Liquidation. Nach Full Liquidation bleiben dem Borrower 0,67 ETH übrig, Wert 1.800 Dollar. Gesamt-Verlust: 4.200 Dollar. Davon 3.000 Dollar reiner Preis-Verlust, der den Borrower ohnehin getroffen hätte. Aber 1.200 Dollar sind reine Liquidations-Penalty — vermeidbar durch rechtzeitige Aktion.

**[Slide 6]** Transparenz ist ein Kernprinzip. Jede Liquidation ist auf Etherscan einsehbar. Du kannst historische Liquidationen analysieren, die Parameter der Transaktion sehen, die bewegten Tokens nachverfolgen. Das ist Lernmaterial und Monitoring-Werkzeug. Im Übungsteil gehst du eine reale Liquidation durch.

### Visual Suggestions

**[Slide 1]** Titelfolie.

**[Slide 2]** Flussdiagramm der vier Schritte mit Icons.

**[Slide 3]** Gas-War-Visualisierung: Mempool mit mehreren Bot-Transaktionen, die konkurrieren. **SCREENSHOT SUGGESTION:** blocknative.com Mempool-Explorer mit Liquidations-Transaktionen.

**[Slide 4]** Diagramm mit HF-Skala: 0,95 und 1,0 als Grenzen, Partial vs. Full Liquidation Zonen.

**[Slide 5]** Schritt-für-Schritt-Rechnung der Beispiel-Liquidation. **SCREENSHOT SUGGESTION:** Reale Etherscan-Liquidations-Transaktion mit dekodierten Input-Parametern und Event-Logs.

**[Slide 6]** **SCREENSHOT SUGGESTION:** Dune-Analytics-Dashboard für Aave-Liquidationen (z.B. von bigbang.wtf oder ähnlich).

### Exercise

**Aufgabe: Reale Liquidation analysieren**

1. Gehe zu einem Aave-Liquidations-Dashboard auf Dune Analytics (suche "Aave liquidations dune").
2. Oder direkt auf app.aave.com → "Transactions" → filtere auf Liquidations.
3. Wähle eine realistische, mittelgroße Liquidation der letzten Wochen (nicht extreme Outlier).
4. Für die gewählte Liquidation dokumentiere:
   - Transaktions-Hash
   - Collateral-Asset und Menge
   - Debt-Asset und Menge
   - Liquidator-Adresse
   - Liquidations-Bonus (wenn erkennbar)
   - Verlust des liquidierten Nutzers (geschätzt)
5. Öffne die Transaktion auf Etherscan und untersuche die Event-Logs.

**Deliverable:** Dokumentation der Liquidation mit den 6 Datenpunkten + kurze Reflexion (4–6 Sätze): Was hätte der Borrower tun können, um die Liquidation zu verhindern?

### Quiz

**Frage 1:** Warum gibt es bei Liquidationen oft "Gas Wars" unter Liquidator-Bots?

<details>
<summary>Antwort anzeigen</summary>

Liquidationen sind typisch profitabel wegen des Liquidations-Bonus (5–15% des Collaterals). Mehrere spezialisierte Bots überwachen Protokolle und konkurrieren darum, profitable Liquidationen auszuführen. Nur der erste Bot in den nächsten Block gewinnt den Bonus. Um zuerst in den Block zu kommen, müssen Bots ihre Gas-Preise erhöhen — höhere Gas-Priorität führt zu früherer Ausführung. Das führt zu einem Wettbewerb nach oben: jeder Bot erhöht sein Gebot, um konkurrenzfähig zu bleiben. Auf Ethereum Mainnet können Liquidations-Gas-Preise 10–50x höher als normal werden. Der größte Teil dieser höheren Gas-Kosten geht an die Validatoren — das ist ein bedeutender Teil des MEV-Flusses. Für den Borrower ist das irrelevant (er bekommt die gleiche Liquidations-Penalty unabhängig davon, welcher Bot gewinnt), aber es ist ein strukturelles Merkmal der DeFi-Liquidations-Ökonomie.
</details>

**Frage 2:** Warum gibt Aaves Close-Factor-System (50% bei HF 0,95–1,0, 100% bei HF < 0,95) dem Borrower einen gewissen Schutz?

<details>
<summary>Antwort anzeigen</summary>

Wenn eine Position langsam in die Liquidations-Zone rutscht — durch moderate Preisbewegungen oder Zinsakkumulation — wird zunächst nur die Hälfte der Schuld liquidiert. Das reduziert die Schuld und erhöht den Health Factor der verbleibenden Position. Beispiel: HF fällt von 1,2 auf 0,97. 50% der Schuld wird liquidiert, HF steigt wieder auf etwa 1,5 (durch die reduzierte Schuld). Der Borrower verliert nur die Liquidations-Penalty auf der ersten Hälfte und behält eine gesunde Restposition. Bei schnellen Preis-Crashes, die HF direkt unter 0,95 bringen (z.B. 30% Preisdrop in Minuten), greift der Schutz nicht — dann erfolgt Full Liquidation sofort. Der Close Factor ist also ein Schutz gegen langsame Erosion, nicht gegen Flash-Crashes. Das unterstreicht die Bedeutung, bei moderaten Positionen frühzeitig zu handeln, wenn HF in die Nähe von 1,5 kommt — bevor der Schutz überhaupt relevant wird.
</details>

---

## Lektion 7.4 — Oracle-Risiken und Liquidations-Preis

### Learning Objectives

After completing this lesson the learner will be able to:
- Die Rolle von Preis-Oracles in Liquidations-Entscheidungen erklären
- Oracle-Manipulationsrisiken identifizieren und einordnen
- Robuste Oracle-Systeme von anfälligen unterscheiden

### Explanation

Ein Lending-Protokoll muss wissen, wie viel dein Collateral wert ist, um LTV und Health Factor zu berechnen. Diese Preis-Information kommt von **Oracles** — Systemen, die externe Daten auf die Blockchain bringen.

Oracles sind eine kritische Infrastruktur-Komponente. Wenn der Oracle-Preis falsch ist, sind alle darauf basierenden Liquidations-Entscheidungen falsch — mit direkten Konsequenzen für Borrower und das Protokoll.

**Wie Oracles funktionieren**

Ein Oracle ist im Wesentlichen ein Smart Contract, der Preis-Daten hält. Diese Daten werden regelmäßig von externen Quellen aktualisiert.

**Chainlink — der dominante Oracle**

Chainlink ist der Marktführer für Preis-Oracles in DeFi. Die Architektur:

1. **Mehrere unabhängige Node-Operatoren** sammeln Preis-Daten von verschiedenen Quellen (CEXs, DEXs, Aggregatoren)
2. Jeder Node übermittelt seinen Preis an den Chainlink-Contract
3. Der Contract aggregiert die Preise (typisch Median)
4. Das Ergebnis wird als "aggregierter Preis" gespeichert und ist für DeFi-Protokolle abrufbar

**Update-Frequenz:**
- Standardmäßig wird der Oracle aktualisiert bei einer Preis-Abweichung von >0,5% oder >1% (je nach Asset)
- Zusätzlich heartbeat-Updates alle paar Stunden

**Warum Chainlink robust ist:**
- Mehrere unabhängige Node-Operatoren (keine zentrale Manipulation möglich)
- Viele Preis-Quellen (keine einzelne Exchange kann den Preis diktieren)
- Offene, etablierte Architektur mit Millionen USD an ökonomischer Sicherheit

**Oracle-Manipulations-Angriffe**

Wenn ein Protokoll einen schlechten Oracle verwendet, können Angreifer den Preis manipulieren, um Positionen künstlich liquidierbar zu machen (oder umgekehrt: Kredite mit falsch überbewerteten Sicherheiten aufzunehmen).

**Typische Angriffs-Vektoren:**

**1. Spot-Preis-Manipulation via Flash Loan**
Wenn ein Protokoll den Spot-Preis eines DEX als Oracle verwendet (was heute kaum noch vorkommt, war aber vor Jahren üblich), kann ein Angreifer:
- Einen großen Flash Loan aufnehmen (z.B. 10 Mio. USD)
- Den gesamten Betrag in einen illiquiden DEX-Pool swappen → Preis verzerrt sich temporär extrem
- Den verzerrten Preis nutzen, um entweder: Positionen anderer zu liquidieren, oder falsch-besicherten Kredit aufzunehmen
- Den Flash Loan zurückzahlen (alles in einer Transaktion)

Dieser Vektor war für viele frühe DeFi-Hacks verantwortlich. Heute verwenden etablierte Protokolle **Time-Weighted Average Prices (TWAPs)** und Chainlink, die beide gegen diese Angriffe resistent sind.

**2. Oracle-Update-Verzögerungs-Angriffe**
Wenn ein Oracle nicht schnell genug aktualisiert, kann eine Lücke zwischen Oracle-Preis und realem Marktpreis entstehen. Angreifer nutzen diese Lücke:
- Real-Markt fällt schneller als Oracle-Update → Positionen sind "noch gesund" laut Oracle, aber real unterbesichert
- Angreifer kann Kredite mit überbewertetem Collateral aufnehmen oder Positionen ausrauben

**3. Cross-Protocol-Exploits**
Komplexe Angriffe, die mehrere Protokolle kombinieren — oft mit Oracle-Manipulationen in einem Teil und Ausnutzung in einem anderen. Zu komplex für Details hier, aber bekannt (Beispiel: Mango Markets Oktober 2022, ~117 Mio. USD Verlust).

**Die Liquidations-Preis-Realität: Oracle kann abweichen**

Als Borrower musst du verstehen: der "Liquidations-Preis", den dir die App zeigt, basiert auf dem **Oracle-Preis**, nicht auf dem Spot-Preis am DEX, den du siehst. In normalen Zeiten sind diese fast identisch. In Stress-Phasen können sie divergieren.

**Praktische Konsequenz:** 

Wenn der Markt plötzlich fällt und Chainlink den Oracle noch nicht aktualisiert hat, könnte deine Position laut Oracle-Preis noch "gesund" sein. Sobald das Oracle-Update kommt — oft innerhalb von Minuten — kann die Position direkt liquidiert werden. Das wirkt wie ein "verzögerter Crash" aus Sicht des Borrowers.

**Robuste Oracles in der Praxis**

Aave V3, Compound V3, Morpho Blue, Spark und andere etablierte Protokolle verwenden alle Chainlink als primären Oracle. Einige haben zusätzliche Schutzmechanismen:

**Chainlink Price Feed + Cross-Check**
Wenn der Oracle-Preis signifikant abweicht (z.B. >20% von TWAP), kann das Protokoll Transaktionen pausieren.

**Dual-Oracle-Setups**
Einige Protokolle nutzen zwei unabhängige Oracle-Quellen und verlangen Übereinstimmung. Wird für besonders sensible Operationen eingesetzt.

**Oracle-Heartbeats und Deviation-Trigger**
Jeder Feed hat definierte Heartbeat-Zeiten. Wenn kein Update innerhalb der Zeit kommt, pausieren einige Protokolle.

**Oracles bei kleineren Protokollen**

Hier liegt echtes Risiko. Einige kleinere Protokolle — besonders neue Forks oder experimentelle Plattformen — verwenden:
- Spot-Preise des eigenen DEX
- Günstigere Alternative-Oracles ohne Track-Record
- TWAPs mit zu kurzen Zeitfenstern

Solche Protokolle sind historisch anfällig für Oracle-Manipulationen. Ein Warnzeichen für konservative Nutzer: kein Chainlink oder mindestens ein sehr gut etabliertes Alternativ-Oracle (Redstone, Pyth mit Multi-Source, etc.).

**Konservative Oracle-Checkliste**

Bevor du in ein Protokoll borgen gehst:
1. Welchen Oracle nutzt das Protokoll?
2. Ist es Chainlink, Pyth (Multi-Source), Redstone oder ein bekanntes Enterprise-Oracle?
3. Gibt es Backup-Mechanismen bei Oracle-Ausfall?
4. Wurde das Oracle-Setup auditiert (mindestens in der Protokoll-Audit)?
5. Historische Performance: gab es Oracle-bedingte Probleme in diesem Protokoll?

### Slide Summary

**[Slide 1] — Titel**
Oracle-Risiken und Liquidations-Preis

**[Slide 2] — Die Oracle-Rolle**
Oracles liefern Preise → Protokoll berechnet LTV und HF
Falsche Oracles = falsche Liquidationen

**[Slide 3] — Chainlink-Architektur**
Mehrere Nodes → Multi-Source → Median-Aggregation
Update bei >0,5–1% Abweichung + Heartbeat

**[Slide 4] — Oracle-Angriffs-Vektoren**
1. Spot-Preis-Manipulation via Flash Loan
2. Update-Verzögerungs-Angriffe
3. Cross-Protocol-Exploits

**[Slide 5] — Oracle-Preis ≠ Spot-Preis**
Normal: fast identisch
Stress: können divergieren
"Verzögerter Crash" als Folge

**[Slide 6] — Robuste Oracle-Setups**
Chainlink + Cross-Check
Dual-Oracle-Setups
Heartbeat-Monitoring

**[Slide 7] — Checkliste vor Borrow**
Welchen Oracle? Backup-Mechanismen? Audit? Historie?

### Voice Narration Script

**[Slide 1]** Ein Lending-Protokoll muss wissen, wie viel dein Collateral wert ist. Diese Information kommt von Oracles. Wenn der Oracle falsch ist, sind alle darauf basierenden Entscheidungen falsch — inklusive Liquidationen. Diese Lektion erklärt Oracle-Risiken und wie du sie einordnest.

**[Slide 2]** Oracles sind die Brücke zwischen Off-Chain-Preisen und On-Chain-Logik. Sie liefern Preise, und das Protokoll berechnet daraus LTV und Health Factor. Falsche Oracles bedeuten falsche Liquidationen — entweder fälschlich oder in falschem Moment.

**[Slide 3]** Chainlink ist der dominante Oracle in DeFi. Die Architektur: mehrere unabhängige Node-Operatoren sammeln Preise von vielen Quellen — CEXs, DEXs, Aggregatoren. Die Preise werden aggregiert, typisch via Median. Updates erfolgen bei einer Preis-Abweichung von mehr als 0,5 bis 1 Prozent, plus regelmäßige Heartbeat-Updates alle paar Stunden. Das Design ist robust gegen Einzelpunkt-Manipulationen.

**[Slide 4]** Oracle-Angriffs-Vektoren. Erstens: Spot-Preis-Manipulation via Flash Loan. Ein Angreifer nimmt einen großen Flash Loan auf, verzerrt den Preis an einem illiquiden DEX, nutzt den verzerrten Preis gegen ein Protokoll, das Spot-Preise als Oracle verwendet. Das war die Basis vieler früher DeFi-Hacks. Heute selten, weil etablierte Protokolle TWAPs und Chainlink nutzen. Zweitens: Update-Verzögerungs-Angriffe. Wenn das Oracle nicht schnell genug aktualisiert, entsteht eine Lücke zum Real-Markt. Drittens: komplexe Cross-Protocol-Exploits, die Oracle-Manipulation mit anderen Schwachstellen kombinieren.

**[Slide 5]** Wichtig für dich als Borrower: der angezeigte Liquidations-Preis basiert auf dem Oracle-Preis, nicht auf dem Spot-Preis, den du an der DEX siehst. Normal sind beide fast identisch. In Stress-Phasen können sie divergieren. Wenn der Markt plötzlich fällt und Chainlink das Update noch nicht veröffentlicht hat, ist deine Position laut Oracle-Preis noch gesund — sobald das Update kommt, kann sie direkt liquidiert werden. Das ist der "verzögerte Crash"-Effekt.

**[Slide 6]** Robuste Oracle-Setups haben zusätzliche Schutzmechanismen. Chainlink Price Feed kombiniert mit Cross-Check: bei signifikanter Abweichung von TWAP pausiert das Protokoll sensitive Operationen. Dual-Oracle-Setups: zwei unabhängige Oracles müssen übereinstimmen. Heartbeat-Monitoring: wenn Updates ausbleiben, pausieren einige Protokolle. Diese Schutzmechanismen sind nicht universal — prüfe das jeweilige Protokoll.

**[Slide 7]** Die Checkliste, bevor du in einem Protokoll borgst. Welchen Oracle nutzt es. Ist es Chainlink, Pyth mit Multi-Source, Redstone oder ein bekanntes Enterprise-Oracle. Gibt es Backup-Mechanismen bei Oracle-Ausfall. Wurde das Oracle-Setup auditiert, mindestens im Rahmen des Protokoll-Audits. Und gab es historische Probleme. Ein Protokoll ohne klare Antworten auf diese fünf Fragen ist für konservative Borrow-Strategien ungeeignet.

### Visual Suggestions

**[Slide 1]** Titelfolie.

**[Slide 2]** Diagramm: externe Preis-Quellen → Oracle → Protokoll-Smart-Contract → LTV/HF-Berechnung.

**[Slide 3]** **SCREENSHOT SUGGESTION:** Chainlink Data Feeds-Seite (data.chain.link) mit Beispiel eines Preis-Feeds. Zeigt aktuelle Preise, Heartbeat, Deviation.

**[Slide 4]** Drei-Angriffs-Icons mit Beispiel-Flash-Loan-Diagramm.

**[Slide 5]** Preiskurven-Grafik: Spot-Preis schnell fallend, Oracle-Preis verzögert fallend. Differenz markiert als "Divergenz-Zone".

**[Slide 6]** Architektur-Diagramm eines robusten Oracle-Setups mit Primär-Oracle, Backup, Cross-Check-Logik.

**[Slide 7]** Fünf-Punkt-Checkliste als vertikale Liste.

### Exercise

**Aufgabe: Oracle-Setup eines Protokolls analysieren**

1. Wähle zwei Protokolle zum Vergleich:
   - Ein etabliertes: Aave V3 oder Compound V3
   - Ein neueres oder weniger bekanntes (z.B. ein Morpho-Blue-Markt, ein Radiant-Capital-Pool, ein Spark-Markt)
2. Für jedes Protokoll recherchiere (Dokumentation, Audit-Reports, Governance-Foren):
   - Welcher Oracle-Provider wird genutzt?
   - Welche Update-Frequenz und Deviation-Trigger?
   - Gibt es Cross-Check oder Dual-Oracle-Mechanismen?
   - Gab es historische Oracle-Probleme?
3. Bewerte die Oracle-Robustheit jedes Protokolls auf einer Skala von 1 (schwach) bis 10 (stark).

**Deliverable:** Vergleichstabelle mit Oracle-Details für beide Protokolle + Einschätzung (5–7 Sätze): Welches der beiden würdest du als konservativer Borrower bevorzugen und warum?

### Quiz

**Frage 1:** Warum sind TWAP (Time-Weighted Average Price) Oracles resistenter gegen Flash-Loan-Manipulation als Spot-Preis-Oracles?

<details>
<summary>Antwort anzeigen</summary>

Ein Spot-Preis-Oracle übernimmt den aktuellen DEX-Preis im Moment der Abfrage. Ein Flash-Loan-Angreifer kann diesen Preis in einer einzigen Transaktion kurzzeitig stark verzerren (durch einen riesigen Swap), den verzerrten Preis für die Ausnutzung verwenden und dann den Flash Loan zurückzahlen — alles atomar. TWAP hingegen mittelt den Preis über einen Zeitraum (typisch 30 Minuten oder länger). Um TWAP zu manipulieren, müsste der Angreifer den verzerrten Preis über diesen gesamten Zeitraum halten. Das bedeutet, er müsste kontinuierlich große Mengen gegen den Marktausgleich traden, was extrem teuer wird (Arbitrageure würden die Abweichung sofort zurücktraden). Die Kosten der Manipulation übersteigen den möglichen Gewinn. TWAPs sind also nicht perfekt, aber strukturell deutlich robuster gegen die häufigsten Oracle-Angriffe. Chainlink geht einen Schritt weiter und nutzt Off-Chain-Quellen, die noch weniger manipulierbar sind.
</details>

**Frage 2:** Ein Protokoll zeigt Liquidations-Preis 2.400 USD für deine ETH-Collateral-Position. ETH handelt aktuell bei 2.500 USD auf Uniswap, fällt dann aber innerhalb von 2 Minuten auf 2.350 USD. Was könnte mit deiner Position passieren?

<details>
<summary>Antwort anzeigen</summary>

Szenario hängt von der Oracle-Update-Latenz ab. Wenn Chainlink den neuen Preis innerhalb dieser 2 Minuten aktualisiert (wahrscheinlich bei einer 6% Bewegung, die sicher die Deviation-Schwelle überschreitet), wird der Oracle-Preis auf ~2.350 USD fallen — unter den Liquidations-Preis von 2.400 USD. Die Position wird liquidiert. Wenn das Oracle-Update verzögert ist (z.B. weil die Chainlink-Nodes noch nicht aggregiert haben), kann die Position kurzzeitig noch als "gesund" angezeigt werden, obwohl sie real unterbesichert ist. Das gibt theoretisch ein kurzes Fenster für Rettungsaktionen (Schuld zurückzahlen, Collateral hinzufügen), aber in der Praxis ist dieses Fenster extrem eng und nicht verlässlich. Die Lektion: der angezeigte Liquidations-Preis ist ein Richtwert basierend auf dem Oracle-Preis. Bei schnellen Markt-Bewegungen kann die tatsächliche Liquidation etwas später erfolgen als die Spot-Marktbewegung suggeriert — aber sie wird erfolgen. Konservative Position bedeutet daher: weit genug vom Liquidations-Preis entfernt zu bleiben, dass solche Oracle-Verzögerungen keinen kritischen Unterschied machen.
</details>

---

## Lektion 7.5 — Liquidations-Kaskaden und systemische Risiken

### Learning Objectives

After completing this lesson the learner will be able to:
- Liquidations-Kaskaden als sich selbst verstärkende Prozesse erklären
- Historische DeFi-Crash-Events als Fallbeispiele analysieren
- Systemische Risikofaktoren für konservative Strategien einordnen

### Explanation

Einzelne Liquidationen sind klar und lokal. Aber Liquidationen können sich selbst verstärken und ganze Märkte destabilisieren. Diese Lektion behandelt den kaskadierenden Mechanismus und zeigt, wie konservative Strategien auch gegen solche Ereignisse widerstandsfähig sein können.

**Die Liquidations-Kaskaden-Mechanik**

Stell dir vor, ein großer Markt-Crash beginnt:

1. **Initial-Bewegung:** Asset A fällt um 10% durch Markt-Ereignis.
2. **Erste Liquidations-Welle:** Positionen, die hochgehebelt auf Asset A waren, werden liquidiert. Das bedeutet: große Mengen Asset A werden verkauft (Liquidatoren wollen oft sofort zu Stablecoins tauschen).
3. **Verstärkung:** Diese zusätzlichen Verkäufe drücken den Preis weiter — weitere 5–10%.
4. **Zweite Liquidations-Welle:** Positionen, die zuvor "sicher" schienen, sind jetzt in Gefahr.
5. **Eskalation:** Dritte, vierte Welle. Kaskade.

Was beginnt als normale Markt-Bewegung, kann sich zu einem extremen Crash entwickeln — nicht weil die Fundamentaldaten es rechtfertigen, sondern weil die gehebelten Strukturen sich selbst zerstören.

**Historische Fallbeispiele**

**Fallbeispiel 1: Black Thursday (März 2020)**

Am 12. März 2020 crashte der gesamte Krypto-Markt im Zuge der COVID-Panik. ETH fiel von ~180 USD auf ~100 USD in weniger als 24 Stunden — über 40%.

**Was passierte in DeFi:**
- MakerDAO hatte viele CDPs (heute Vaults genannt) mit ETH-Collateral
- Der Crash triggerte massenhafte Liquidationen
- Die Gas-Preise auf Ethereum explodierten auf über 400 Gwei (extrem hoch)
- Einige Liquidations-Auktionen liefen ins Leere, weil keine Bots schnell genug bieten konnten
- **0-USD-Bids:** Manche Liquidations-Auktionen wurden mit 0 USD gewonnen, weil kein anderer Bieter teilnahm
- MakerDAO erlitt ~6 Mio. USD "Bad Debt" — Schulden, die nicht durch Collateral gedeckt waren
- Die Deckung wurde durch MKR-Token-Ausgabe gerettet (Dilutive Minting)

**Lektion:** In extremen Crashes können selbst die besten Protokoll-Mechaniken überfordert sein. Gas-Preise, Liquidator-Kapazität und Netzwerk-Kongestion sind reale Faktoren.

**Fallbeispiel 2: Luna/UST-Kollaps (Mai 2022)**

Der algorithmische Stablecoin UST verlor seinen Peg, und der verbundene LUNA-Token kollabierte binnen Tagen von ~80 USD auf <0,0001 USD.

**Was passierte in DeFi:**
- Anchor Protocol — ein Lending-Protokoll auf Terra-Chain — hatte über 14 Mrd. USD UST in Zinskonten
- Als UST depeggte, wollten alle auszahlen
- Der Peg-Mechanismus (der LUNA druckte, um UST zu deckeln) erzeugte Hyperinflation von LUNA
- Curve-Pools mit UST erlebten massive Umschichtungen
- Liquidationen auf Ethereum bei Positionen mit UST als Collateral
- ~60 Mrd. USD an Markt-Wert wurde vernichtet

**Lektion:** Depeg-Risiko ist nicht theoretisch. Ein scheinbar stabiler Asset kann innerhalb von Tagen oder Stunden zusammenbrechen.

**Fallbeispiel 3: stETH-Depeg (Juni 2022)**

Nach dem 3AC-Kollaps und Celsius-Problemen entstand Panik um stETH. Der Peg fiel von 1 ETH auf bis zu 0,94 ETH.

**Was passierte in DeFi:**
- Viele Aave- und Compound-Positionen nutzten stETH als Collateral gegen ETH-Borrow (sogenannte "Leveraged Staking")
- Als stETH-Preis (in ETH) fiel, wurden diese Positionen unterbesichert
- Liquidations-Welle von stETH → Verkaufs-Druck auf stETH → weiterer Preis-Drop
- Curve stETH/ETH-Pool erlebte extreme Umschichtungen
- Insgesamt wurden Hunderte Millionen USD in gehebelten Staking-Positionen liquidiert

**Lektion:** "Liquid Staking" klingt sicher, aber in Krisensituationen kann die eingebettete Depeg-Wahrscheinlichkeit signifikant werden.

**Fallbeispiel 4: FTX-Kollaps (November 2022)**

Der Zusammenbruch von FTX selbst betraf DeFi nur mittelbar (weil FTX eine CEX war), aber:
- Massive Markt-Verwerfungen drückten alle Krypto-Preise
- Aave, Compound und andere erlebten erhöhte Liquidations-Volumina
- Einige Stablecoins wackelten temporär (FRAX, später USDC im März 2023)

**Lektion:** Systemische Krisen außerhalb von DeFi können DeFi-Positionen treffen. Konservative Positionen überleben das.

**Faktoren, die Kaskaden verstärken**

1. **Hoher systemweiter Leverage:** Wenn viele Nutzer hochgehebelt sind, sind viele Positionen gleichzeitig fragil. Eine Bewegung triggert Massen-Liquidationen.

2. **Konzentrierte Collateral-Typen:** Wenn ein einzelner Asset-Typ (z.B. stETH) in Vielen Positionen das Collateral ist, führt ein Depeg zu sehr vielen gleichzeitigen Liquidationen.

3. **Ähnliche Positions-Struktur:** Wenn viele Nutzer dieselben Strategie fahren (z.B. stETH → ETH-Loop), werden sie alle gleichzeitig betroffen.

4. **Oracle-Lags in Krisen:** Oracle-Updates können während extremer Volatilität verzögert sein, was "verzögerte Crashes" erzeugt, wenn das Update endlich kommt.

5. **Gas-Kongestion:** Bei hohem Stress können Transaktionen Minuten dauern — dabei verlieren Borrower kritische Reaktions-Fenster.

**Konservative Widerstandsfähigkeit**

Wie schützt sich eine konservative Strategie gegen Kaskaden?

**1. Niedriger Leverage:**
Bei Health Factor 2,0+ überlebt die Position auch 50%-Crashes. Bei HF 1,2 wird sie schon bei 20%-Crash kritisch. Der Multiplikator-Effekt von HF-Höhe ist dramatisch.

**2. Diversifikation der Collateral-Typen:**
Nicht nur stETH, nicht nur WBTC, nicht nur ETH. Mehrere unkorrelierte (oder nur schwach korrelierte) Collaterals.

**3. Diversifikation der Protokolle:**
Falls ein Protokoll in einer Kaskade in Stress gerät (Bad Debt, Liquidations-Chaos), sind andere unbetroffen.

**4. Reserve-Kapital:**
Stablecoin-Reserve, die man zur Verfügung stellen kann, um Schulden schnell zurückzuzahlen oder Collateral aufzustocken.

**5. Klare Trigger und Reaktions-Pläne:**
Vorab definieren: bei HF unter X werde ich Y tun. In der Krise keine Zeit zum Nachdenken.

Ein konservatives Portfolio mit HF 2,5, diversifiziertem Collateral und Stablecoin-Reserve übersteht praktisch alle historischen DeFi-Krisen ohne Liquidation. Das ist kein Zufall — es ist strukturelle Widerstandsfähigkeit.

### Slide Summary

**[Slide 1] — Titel**
Liquidations-Kaskaden und systemische Risiken

**[Slide 2] — Kaskaden-Mechanik**
1. Initial-Bewegung → Liquidationen
2. Verkaufsdruck → weiterer Preis-Drop
3. Zweite Welle → dritte Welle
4. Eskalation

**[Slide 3] — Fallbeispiel: Black Thursday 2020**
ETH −45% in 24h
Gas-Preise explodieren
MakerDAO-Bad Debt ~6 Mio. USD

**[Slide 4] — Fallbeispiel: Luna/UST Mai 2022**
Algorithmischer Stablecoin kollabiert
60 Mrd. USD Marktwert zerstört
Depeg-Risiko ist real

**[Slide 5] — Fallbeispiel: stETH-Depeg Juni 2022**
"Leveraged Staking" unter Druck
Hunderte Mio. USD liquidiert

**[Slide 6] — Kaskaden-Verstärker**
Hoher Leverage, konzentriertes Collateral, ähnliche Strategien, Oracle-Lags, Gas-Kongestion

**[Slide 7] — Konservative Widerstandsfähigkeit**
HF 2,0+, diversifiziertes Collateral, Reserven, klare Trigger

### Voice Narration Script

**[Slide 1]** Einzelne Liquidationen sind lokal und klar. Aber Liquidationen können sich selbst verstärken und ganze Märkte destabilisieren. Diese Lektion zeigt, wie — und wie konservative Strategien diese Risiken systemisch mindern.

**[Slide 2]** Die Kaskaden-Mechanik. Initial-Bewegung: Asset fällt durch ein Markt-Ereignis. Erste Liquidations-Welle: gehebelte Positionen werden liquidiert, liquidierte Assets werden verkauft. Der Verkaufs-Druck drückt den Preis weiter. Zweite Welle: Positionen, die zuvor sicher schienen, werden jetzt kritisch. Eskalation. Was als normale Markt-Bewegung beginnt, kann zu einem extremen Crash werden — nicht wegen der Fundamentaldaten, sondern weil die gehebelten Strukturen sich selbst zerstören.

**[Slide 3]** Erstes Fallbeispiel: Black Thursday, 12. März 2020. ETH fiel um 45 Prozent in weniger als 24 Stunden. Die Gas-Preise auf Ethereum explodierten auf über 400 Gwei. Einige MakerDAO-Liquidations-Auktionen liefen ins Leere — keine Bots konnten schnell genug bieten. Manche wurden mit Null-Dollar-Bids gewonnen. MakerDAO erlitt etwa sechs Millionen Dollar Bad Debt, das durch MKR-Neuemissionen gedeckt wurde. Lektion: in extremen Crashes sind selbst gute Protokolle überfordert.

**[Slide 4]** Zweites Fallbeispiel: Luna/UST, Mai 2022. Der algorithmische Stablecoin UST verlor seinen Peg. Der verbundene LUNA-Token kollabierte von 80 Dollar auf quasi Null. Anchor Protocol mit 14 Milliarden UST. Curve-Pools mit UST erlebten massive Umschichtungen. 60 Milliarden Dollar Markt-Wert wurden vernichtet. Lektion: Depeg-Risiko ist nicht theoretisch. Ein scheinbar stabiler Asset kann innerhalb von Tagen zusammenbrechen.

**[Slide 5]** Drittes Fallbeispiel: stETH-Depeg im Juni 2022. Nach dem 3AC-Kollaps fiel stETH von 1 ETH auf 0,94 ETH. Viele Aave-Positionen nutzten stETH als Collateral gegen ETH-Borrow — Leveraged Staking. Als stETH im Verhältnis zu ETH fiel, wurden Positionen unterbesichert. Die resultierenden Liquidationen verstärkten den Verkaufsdruck auf stETH. Hunderte Millionen Dollar in Leveraged-Staking-Positionen wurden liquidiert. Lektion: Liquid Staking klingt sicher, aber in Krisen wird die eingebettete Depeg-Wahrscheinlichkeit real.

**[Slide 6]** Kaskaden-Verstärker: hoher systemweiter Leverage — viele Nutzer sind gleichzeitig fragil. Konzentrierte Collateral-Typen — wenn stETH in vielen Positionen verwendet wird, betrifft ein Depeg alle. Ähnliche Positions-Strukturen — alle machen die gleiche Strategie, alle werden gleichzeitig getroffen. Oracle-Lags in Krisen. Gas-Kongestion, die Reaktions-Fenster verkürzt.

**[Slide 7]** Konservative Widerstandsfähigkeit basiert auf fünf Prinzipien. Health Factor 2,0 oder höher: bei HF 2,0 überlebt die Position 50-Prozent-Crashes. Bei HF 1,2 wird sie bei 20-Prozent-Crash kritisch. Diversifikation der Collateral-Typen. Diversifikation der Protokolle. Stablecoin-Reserve für schnelle Aktionen. Klare Trigger und Reaktions-Pläne, vorab definiert. Ein Portfolio mit diesen Eigenschaften übersteht praktisch alle historischen DeFi-Krisen ohne Liquidation. Das ist kein Zufall, sondern strukturelle Widerstandsfähigkeit.

### Visual Suggestions

**[Slide 1]** Titelfolie.

**[Slide 2]** Kaskaden-Flussdiagramm: Initial → Liquidationen → Verkaufsdruck → Mehr Liquidationen. Spiral-Visualisierung.

**[Slide 3]** ETH-Preis-Chart vom 12. März 2020 mit markierten Events. **SCREENSHOT SUGGESTION:** historischer Chart (TradingView oder coingecko) von ETH mit Black-Thursday-Markierung.

**[Slide 4]** UST/LUNA-Preischart Mai 2022. **SCREENSHOT SUGGESTION:** Artikel oder Chart vom UST-Kollaps.

**[Slide 5]** stETH/ETH-Ratio-Chart Juni 2022. **SCREENSHOT SUGGESTION:** defillama Chart des stETH-Depegs.

**[Slide 6]** Fünf-Faktoren-Diagramm der Kaskaden-Verstärker.

**[Slide 7]** Fünf-Prinzipien-Checkliste als Schutzschild-Metapher.

### Exercise

**Aufgabe: Krisen-Szenario durchspielen**

Stell dir folgende Position vor: 20.000 USD ETH-Collateral, 12.000 USD USDC-Schuld auf Aave V3, LT = 83% für ETH.

1. Berechne den initialen Health Factor.
2. Szenario A: ETH fällt langsam über 2 Wochen um 30%. Was passiert? Kannst du reagieren?
3. Szenario B: ETH crasht in 4 Stunden um 30%. Was passiert? Kannst du reagieren?
4. Szenario C: Simultaner 30%-Crash und Gas-Kongestion (Gas-Preise 5x normal). Was passiert?
5. Welches Sicherheitspolster (HF-Zielwert) hättest du setzen müssen, um alle drei Szenarien zu überleben?

**Deliverable:** Schriftliche Analyse der drei Szenarien (je 3–5 Sätze) + Antwort auf Frage 5 mit Begründung.

### Quiz

**Frage 1:** Warum war der Black Thursday-Event im März 2020 für DeFi strukturell lehrreich, auch wenn die direkten Verluste (~6 Mio. USD) aus heutiger Sicht klein wirken?

<details>
<summary>Antwort anzeigen</summary>

Black Thursday zeigte, dass die DeFi-Infrastruktur unter extremem Stress Grenzen hat. Die Gas-Kongestion auf Ethereum machte zeitnahe Transaktionen praktisch unmöglich — was sowohl Borrower (die nicht reagieren konnten) als auch Liquidatoren (die nicht bieten konnten) betraf. Die Null-Dollar-Bid-Auktionen von MakerDAO zeigten, dass Liquidations-Mechanismen in Stress-Situationen versagen können, selbst wenn sie mathematisch korrekt designt sind. MakerDAO reagierte mit strukturellen Änderungen: Einführung der Liquidations 2.0 Auktionen mit besseren Preis-Mechanismen, Diversifikation der Collateral-Typen (nicht nur ETH, sondern auch USDC, WBTC etc.), Stabilitätspuffer. Diese Lernerfahrungen prägten die Architektur aller nachfolgenden Lending-Protokolle. Aus heutiger Sicht ist Black Thursday ein Muster, das jeder konservative DeFi-Nutzer kennen sollte: die Annahme "das Protokoll ist schon stabil" reicht nicht, wenn Netzwerk-Kongestion und Liquidator-Kapazität unter Volatilität eigene Grenzen haben.
</details>

**Frage 2:** Warum sind "Leveraged Staking"-Positionen (stETH als Collateral, ETH borgen) trotz scheinbar niedriger Volatilität nicht risikofrei?

<details>
<summary>Antwort anzeigen</summary>

Leveraged Staking basiert auf der Annahme, dass stETH strukturell gleich ETH ist. In Normalsituationen ist das nahe an der Wahrheit — der Peg bewegt sich in engen Bändern. Aber in Krisensituationen kann der Peg brechen. Das Juni-2022-Ereignis zeigte: bei Marktstress und Liquiditätsengpässen wollen viele Nutzer stETH verkaufen, aber der Withdraw-Prozess von Lido hatte damals lange Wartezeiten (bis ETH-Merge möglich war). Der Curve stETH/ETH-Pool war die Haupt-Liquiditäts-Quelle für sofortige Auszahlung. Ein Sell-Druck auf Curve drückte den stETH-Preis in ETH-Einheiten — das depeggte temporär. Gehebelte Positionen, die stETH als Collateral bei nahezu 1:1 zu ETH rechneten, wurden plötzlich unterbesichert und liquidiert. Die Lektion: "strukturell gleich" ist nicht identisch mit "immer gleich". In Krisen können Peg-Mechanismen versagen. Gehebelte Positionen auf solchen Annahmen sind deshalb strukturell fragil. Konservativer Ansatz: entweder niedrigere LTV-Nutzung (unter 50% der Max-LTV), oder direktes Halten von stETH/ETH ohne Leverage.
</details>

---

## Lektion 7.6 — Borrow-Hygiene für konservative Nutzer

### Learning Objectives

After completing this lesson the learner will be able to:
- Eine persönliche Borrow-Hygiene-Checkliste definieren
- Sinnvolle Use-Cases für konservatives Borrowing identifizieren
- Entscheiden, wann Borrowing für das 7–8%-Ziel nicht nötig ist

### Explanation

Borrowing in DeFi ist ein mächtiges Werkzeug, das viele sinnvolle Zwecke erfüllen kann. Für das 7–8%-Jahresziel dieses Kurses ist es **nicht immer nötig** — viele konservative Portfolios kommen ohne Borrow-Positionen aus. Wenn du dich aber entscheidest zu borgen, gibt dir diese Lektion die Hygiene-Regeln, die den Unterschied zwischen kontrolliertem Risiko und permanentem Verlust machen.

**Sinnvolle Borrow-Use-Cases (konservativ)**

**Use-Case 1: Kapital-Effizienz ohne Verkauf**
Du hältst ETH langfristig, brauchst aber Liquidität für einen bestimmten Zweck (Portfolio-Diversifikation, Lebens-Ausgabe, neue Opportunity). Statt ETH zu verkaufen (und einen Capital-Gains-Event auszulösen), hinterlegst du es als Collateral und leihst Stablecoins.

**Konservative Ausführung:**
- Nutze nur 30–40% der verfügbaren LTV-Grenze
- Health Factor 2,5+
- Klarer Plan, wie die Schuld zurückgezahlt wird

**Use-Case 2: Leveraged Staking (moderat)**
ETH staken über Lido → wstETH erhalten. wstETH als Collateral hinterlegen → ETH borgen → ETH wieder staken → wstETH erhalten → wiederholen.

**Ziel:** Boost des Staking-Yields durch Leverage. Bei 3% Staking-Yield und 1,5x Leverage kommt man auf ~4,5% netto (nach Borrow-Zinsen) — immer noch konservativ, aber besser als 3%.

**Konservative Ausführung:**
- Nur 1,5x oder 2x Leverage, nicht mehr
- Health Factor 2,0+
- Monitoring der wstETH/ETH-Peg-Stabilität
- Exit-Plan bei Peg-Abweichung > 2%

Mehr Details zu dieser Strategie in Modul 10 (Leverage-Loops).

**Use-Case 3: Stablecoin-Swap zur Rendite-Optimierung**
Du hast USDC auf Aave mit 4% APY. Du möchtest aber auch USDT-Exposition haben, weil USDT-Pools gerade bessere Renditen bieten. Statt USDC zu verkaufen und USDT zu kaufen (Slippage, Gas), kannst du USDC als Collateral hinterlegen und USDT borgen — in Stablecoin-E-Mode.

**Konservative Ausführung:**
- Bei sehr engen Peg-Asset-Paaren kann LTV-Nutzung moderat höher sein (60–70% des Max)
- Aber: Depeg-Risiko immer berücksichtigen

**Use-Case 4: Short auf einen Asset**
Du vermutest, dass ein Asset (z.B. ein Governance-Token) im Preis fallen wird. Du hinterlegst Stablecoins, borgst den Asset, verkaufst ihn sofort. Wenn der Preis fällt, kaufst du ihn günstiger zurück, zahlst die Schuld zurück, und hältst die Differenz.

**Konservative Ausführung:** Für konservative Strategien meist nicht empfohlen. Shorting ist hochspekulativ, und Borrow-Zinsen auf weniger liquide Tokens können sehr hoch sein (20%+). Für das 7–8%-Ziel ist das nicht die richtige Strategie.

**Nicht-konservative Use-Cases (hier nicht empfohlen)**

- **Aggressive Leverage auf volatile Assets:** Hochgehebelte Positionen auf ETH, BTC, kleine Tokens — können schnell liquidieren
- **Leverage-Farming:** Borrowing zur Finanzierung von Farm-Positionen mit hohem Reward-Token-Exposure — zu viele Risiko-Komponenten
- **Recursive Borrowing auf volatile Assets:** Wiederholtes Borgen und Re-Collateralizieren zur Maximierung des Leverage — exponentiell riskant

**Die konservative Borrow-Hygiene-Checkliste**

Vor jeder neuen Borrow-Position:

**1. Zweck definiert?**
Schreib den Grund des Borrows auf. Wenn du keinen klaren Zweck hast, sollst du nicht borgen.

**2. Health Factor Ziel definiert?**
Bei welchem HF initialisiere ich die Position? Bei welchem HF handle ich (rückzahlen oder mehr Collateral)?

**3. Exit-Plan definiert?**
Wann und wie schließe ich die Position? Bei welchem Preis-Punkt? Bei welchem Zeit-Punkt?

**4. Gas-Budget für Notfall-Reaktionen?**
Habe ich ETH in der Wallet für schnelle Reaktions-Transaktionen?

**5. Collateral-Diversifikation?**
Ist mein Collateral zu sehr konzentriert in einem einzigen Asset?

**6. Protokoll-Diversifikation?**
Ist meine gesamte Borrow-Position auf einem einzigen Protokoll?

**7. Reserve-Kapital?**
Habe ich Stablecoins in der Wallet, um in einer Krise schnell Schulden zurückzahlen zu können?

**8. Monitoring-Frequenz?**
Wie oft prüfe ich die Position? Mindestens täglich bei aktiven Borrow-Positionen.

**Monitoring-Tools für Borrower**

**App-basiert:**
- Aave-App, Compound-App — direkte Position mit HF
- DeBank — Portfolio-Übersicht

**Alerts (dringend empfohlen):**
- **HAL (hal.xyz)** — konfigurierbare Alerts bei HF-Schwellen
- **Tenderly** — für komplexere Setups
- Einige Wallets (Rabby) zeigen Warnungen bei niedrigem HF

**Konfigurierte Alerts:**
- HF < 2,0 → Informations-Alert
- HF < 1,7 → Warn-Alert
- HF < 1,5 → Aktions-Alert (handeln)
- HF < 1,3 → Kritisch

**Die 7–8%-Frage: Muss ich überhaupt borgen?**

Für viele konservative Portfolios lautet die ehrliche Antwort: **nein, nicht unbedingt**. Ein Portfolio aus:
- 40% Stablecoin-Supply auf Aave/Compound/Morpho (3–6% APY)
- 30% wstETH direkt gehalten (3–4% Staking-Yield plus ETH-Exposure)
- 20% Stablecoin-LP auf Curve (3–6% APY)
- 10% Reserve

kann ohne jedes Borrowing 4–6% Netto-Rendite erreichen. In Bull-Markets mit ETH-Aufwärtsbewegung können die zusätzliche ETH-Preis-Rendite die Gesamt-Rendite auf 8%+ bringen.

Moderates Borrowing (Use-Case 2: Leveraged Staking mit 1,5x) kann die Netto-Rendite um 1–2 Prozentpunkte steigern — aber um den Preis höherer Komplexität und Liquidations-Risiko. Die Frage für jeden Nutzer: ist der Aufwand-Rendite-Trade-off individuell wert?

**Für viele ist die konservative Antwort: Starte ohne Borrowing. Lerne Supply, LP, Staking. Füge Borrowing erst hinzu, wenn du alle Mechaniken verstehst und Monitoring-Disziplin hast.**

### Slide Summary

**[Slide 1] — Titel**
Borrow-Hygiene für konservative Nutzer

**[Slide 2] — Sinnvolle Use-Cases**
1. Kapital-Effizienz ohne Verkauf
2. Moderates Leveraged Staking
3. Stablecoin-Swap via E-Mode
4. Shorts (meist nicht konservativ)

**[Slide 3] — Nicht-empfohlen**
- Aggressive Leverage auf volatile Assets
- Leverage-Farming
- Recursive Borrowing volatile Assets

**[Slide 4] — Die 8-Punkte-Checkliste**
Zweck, HF-Ziel, Exit-Plan, Gas-Budget, Collateral-Diversifikation, Protokoll-Diversifikation, Reserve, Monitoring

**[Slide 5] — Alert-Schwellen**
HF < 2,0 — Info
HF < 1,7 — Warnung
HF < 1,5 — Aktion
HF < 1,3 — Kritisch

**[Slide 6] — Tools**
Aave-App, DeBank, HAL.xyz, Tenderly, Wallet-Warnungen

**[Slide 7] — Die ehrliche Frage**
7–8% oft ohne Borrowing erreichbar
Borrowing = Zusatz, nicht Basis
Starte ohne, füge später hinzu wenn disziplin vorhanden

### Voice Narration Script

**[Slide 1]** Borrowing ist ein mächtiges Werkzeug. Für das 7 bis 8 Prozent Ziel dieses Kurses ist es aber nicht immer nötig. Diese Lektion gibt dir die Hygiene-Regeln für den Fall, dass du dich entscheidest zu borgen — und ehrliche Alternativen, wenn du es nicht tust.

**[Slide 2]** Sinnvolle Use-Cases. Erstens: Kapital-Effizienz ohne Verkauf. Du brauchst Liquidität, willst aber ETH nicht verkaufen — hinterlegst als Collateral, borgst Stablecoins. Zweitens: moderates Leveraged Staking. 1,5 oder 2 fach Leverage auf wstETH kann Staking-Yield boosten. Drittens: Stablecoin-Swap über E-Mode zur Rendite-Optimierung. Viertens: Shorts — technisch möglich, aber für konservative Strategien meist nicht empfohlen.

**[Slide 3]** Nicht-empfohlen für konservative Portfolios. Aggressive Leverage auf volatile Assets — kann schnell liquidieren. Leverage-Farming — zu viele Risiko-Komponenten. Recursive Borrowing auf volatile Assets — exponentiell riskant. Diese Strategien können funktionieren, aber sie passen nicht zum 7 bis 8 Prozent Ziel.

**[Slide 4]** Die Acht-Punkte-Checkliste vor jedem Borrow. Zweck: warum borgst du? Health-Factor-Ziel: bei welchem HF startest du, bei welchem handelst du? Exit-Plan: wann schließt du die Position? Gas-Budget: hast du ETH für Notfall-Transaktionen? Collateral-Diversifikation: ist dein Collateral zu konzentriert? Protokoll-Diversifikation: alles auf einem Protokoll? Reserve-Kapital: Stablecoins für Schulden-Rückzahlung im Notfall? Monitoring-Frequenz: wie oft prüfst du? Mindestens täglich bei aktiven Borrows.

**[Slide 5]** Konfigurierte Alert-Schwellen. Health Factor unter 2,0 — Informations-Alert. Unter 1,7 — Warnung. Unter 1,5 — Aktions-Alert, handle jetzt. Unter 1,3 — kritisch, Notfall-Modus. Diese Schwellen vorab konfigurieren.

**[Slide 6]** Tools. Die Apps von Aave und Compound selbst zeigen Health Factor direkt. DeBank für Portfolio-Übersicht. HAL.xyz für konfigurierbare Alerts. Tenderly für komplexere Setups. Rabby und einige andere Wallets zeigen Warnungen bei niedrigem HF.

**[Slide 7]** Die ehrliche Frage. 7 bis 8 Prozent Rendite sind oft ohne Borrowing erreichbar, besonders in Bull-Markets oder mit einem gut diversifizierten Supply-LP-Staking-Portfolio. Borrowing ist Zusatz, nicht Basis. Der konservative Rat: starte ohne Borrowing. Lerne Supply, LP, Staking. Füge Borrowing erst hinzu, wenn du alle Mechaniken verstehst und die Monitoring-Disziplin hast. Das ist nicht Vorsicht — das ist Strategie.

### Visual Suggestions

**[Slide 1]** Titelfolie.

**[Slide 2]** Vier Karten der Use-Cases mit grünem Checkmark.

**[Slide 3]** Drei Karten der Nicht-empfohlenen Use-Cases mit rotem X.

**[Slide 4]** Acht-Punkte-Checkliste in zwei Spalten.

**[Slide 5]** Farbkodiertes HF-Schwellen-Diagramm mit Alert-Level.

**[Slide 6]** **SCREENSHOT SUGGESTION:** HAL.xyz Dashboard mit konfigurierten Alerts. Alternativ: DeBank-Alarm-Einstellungen.

**[Slide 7]** Portfolio-Vergleich mit und ohne Borrowing, Rendite-Aussicht.

### Exercise

**Aufgabe: Persönliche Borrow-Entscheidung**

Entscheide dich: Wirst du in deinem konservativen Portfolio Borrowing nutzen oder nicht?

**Falls ja:**
1. Für welchen Use-Case?
2. Welcher Collateral-Asset, welcher Borrow-Asset?
3. Welche Protokoll-Auswahl?
4. Welcher initiale Health Factor?
5. Welche Alert-Schwellen?
6. Wie wirst du monitoren?
7. Welcher Exit-Plan?

**Falls nein:**
1. Welche Strategien nutzt du stattdessen, um 7–8% zu erreichen?
2. Akzeptierst du ggf. niedrigere Rendite (5–6%) für weniger Komplexität?

**Deliverable:** Schriftliche Entscheidung mit Begründung (1–2 Seiten). Kein "richtig" oder "falsch" — aber klare Entscheidung und Rationale.

### Quiz

**Frage 1:** Warum ist "Kapital-Effizienz ohne Verkauf" (Use-Case 1) ein sinnvoller konservativer Borrow-Zweck?

<details>
<summary>Antwort anzeigen</summary>

Mehrere Gründe. Erstens: du behältst die Preis-Exposure auf deine langfristige Position (z.B. ETH). Wenn ETH langfristig steigen sollte, profitierst du weiterhin davon — statt zu verkaufen und die Position aufzugeben. Zweitens: in vielen Jurisdiktionen ist das Borrowen gegen ein Asset steuerlich anders behandelt als der Verkauf. Ein Verkauf triggert oft Capital Gains Taxes; Borrowing nicht. Das kann signifikant sein. Drittens: die Liquidität wird für einen spezifischen Zweck genutzt, nicht für spekulative Leverage. Das reduziert das Risiko — ein klar definierter Ausgabe-Zweck ist leichter zu planen und zu schließen als eine spekulative Position. Die konservative Ausführung mit HF 2,5+ bedeutet, dass selbst 50%-Preisabfall kein Liquidations-Risiko darstellt. Der Zins auf den Borrow ist der "Preis" der Liquidität — typisch 3–5% auf Stablecoins, was bei 12 Monaten Nutzung bei einem 10.000 USD Borrow ca. 400 USD kostet. Das ist oft deutlich günstiger als Verkauf plus Rückkauf später (Slippage, Steuern, verpasste Preisentwicklung).
</details>

**Frage 2:** Ein Anleger möchte Borrowing komplett vermeiden. Welche realistische Netto-Rendite kann er erreichen, und was sind die Trade-offs?

<details>
<summary>Antwort anzeigen</summary>

Ohne Borrowing kann ein diversifiziertes konservatives Portfolio realistisch 4–6% Netto-Rendite erreichen. Beispiel-Aufteilung: 40% Stablecoin-Supply (4% APY), 30% wstETH direkt (3–4% plus ETH-Preis-Exposure), 20% Stablecoin-LP auf Curve (4–5% APY), 10% Reserve — ergibt rechnerisch etwa 3,5–4,5% aus Yield-Komponenten, plus opportunistische ETH-Preis-Beiträge. In neutralen oder schwachen Markt-Phasen bleibt das unter 7–8%; in Bull-Markets mit ETH-Anstieg wird die Gesamtrendite oft deutlich über 8% liegen. Die Trade-offs: geringere Komplexität, niedrigere Monitoring-Anforderung, keine Liquidations-Gefahr — aber eben auch geringere Rendite-Ziele im Durchschnitt. Für viele Anleger ist das die bessere Strategie, besonders für Einsteiger oder solche, die nicht aktiv monitoren wollen. Das 7–8%-Ziel sollte nicht als zwingendes Minimum verstanden werden; eine risikoadjustierte 5%-Rendite mit geringerer Komplexität kann objektiv besser sein als 8% mit hohem Stress und Liquidations-Risiko. Die "richtige" Wahl ist individuell und hängt von Risiko-Toleranz, Zeit-Budget und Expertise ab.
</details>

---

## Modul-Abschluss-Quiz

Fünf Fragen zum integrierten Verständnis von Modul 7.

**Frage 1:** Eine Position hat initialen Health Factor 2,0. Nach drei Monaten ist der Collateral-Preis um 15% gefallen und die Schuld durch Zinsen um 8% gewachsen. Was ist der neue HF, und wie solltest du reagieren?

<details>
<summary>Antwort anzeigen</summary>

HF ändert sich proportional. Neuer Collateral-Wert: 85% des ursprünglichen. Neue Schuld: 108% des ursprünglichen. HF = (Collateral × LT) / Schuld. Mit ursprünglichem HF = 2,0: neuer HF = 2,0 × (0,85 / 1,08) = 2,0 × 0,787 = 1,57. Der HF ist auf 1,57 gefallen — nach den konservativen Schwellen dieser Lektion ist das in der Warn-Zone zwischen 1,5 und 1,7. Aktion: entweder Schuld teilweise zurückzahlen (z.B. 30% der Schuld, würde HF auf etwa 2,2 anheben) oder Collateral hinzufügen (z.B. 20% mehr Collateral, ähnlicher Effekt). Wenn Zinsen weiter akkumulieren oder Preis weiter fällt, kann HF schnell unter 1,5 fallen. Handeln, nicht warten.
</details>

**Frage 2:** Erkläre, warum das Protokoll-Design mit LTV, LT und LB als drei separate Parameter mathematisch und ökonomisch sinnvoll ist.

<details>
<summary>Antwort anzeigen</summary>

Die drei Parameter erfüllen drei unterschiedliche Funktionen. LTV definiert das anfängliche Borrow-Limit konservativ, sodass neue Positionen ausreichend überbesichert sind. LT ist höher als LTV und definiert den Punkt, ab dem Liquidation möglich wird — der Unterschied ist ein Sicherheitspuffer, der verhindert, dass Positionen sofort nach Erstellung liquidiert werden und gibt Raum für Marktfluktuationen. LB ist der ökonomische Anreiz für Liquidatoren, ihre Arbeit zu tun — ohne diesen Bonus würde niemand Liquidationen ausführen, und das Protokoll hätte Bad Debt bei Collateral-Preis-Rückgängen. Zusammen schaffen die drei Parameter ein funktionales Anreiz-System: Borrower werden nicht sofort liquidiert (durch LTV-LT-Puffer), Liquidatoren haben einen profitablen Zweck (durch LB), und das Protokoll bleibt solvent (durch rechtzeitige Liquidation vor Bad Debt). Wenn nur ein einziger Parameter existierte, müsste er mehrere Funktionen gleichzeitig erfüllen — was zu suboptimalen Lösungen führen würde. Das separate Design erlaubt pro Asset spezifische Kalibrierung: volatile Assets bekommen niedrigere LTV/LT und höhere LB, stabile Assets umgekehrt.
</details>

**Frage 3:** Beschreibe in eigenen Worten, was eine "Liquidations-Kaskade" ist und welche historischen Events sie illustrieren.

<details>
<summary>Antwort anzeigen</summary>

Eine Liquidations-Kaskade ist ein selbstverstärkender Prozess, bei dem Liquidationen weitere Liquidationen triggern. Der Mechanismus: eine anfängliche Markt-Bewegung (z.B. 10%-Crash) triggert Liquidationen hochgehebelter Positionen. Das liquidierte Collateral wird verkauft — oft schnell zu Stablecoins — was zusätzlichen Verkaufsdruck erzeugt. Der Verkaufsdruck drückt den Preis weiter. Das triggert eine zweite Welle von Positionen, die zuvor sicher schienen, aber jetzt durch den weiteren Preisverfall kritisch werden. Diese werden liquidiert, erzeugen mehr Verkaufsdruck — dritte Welle, vierte Welle. Historische Beispiele: Black Thursday März 2020 (ETH −45% in 24h, MakerDAO Bad Debt von ~6 Mio. USD); Luna/UST-Kollaps Mai 2022 (algorithmischer Stablecoin kollabiert, 60 Mrd. USD Marktwert zerstört); stETH-Depeg Juni 2022 (Leveraged-Staking-Positionen gleichzeitig liquidiert, Hunderte Mio. USD); FTX-Kollaps November 2022 (keine reine DeFi-Kaskade, aber systemische Markt-Verwerfungen). Die Lektion für konservative Strategien: Portfolio-Struktur muss auch solche Extrem-Ereignisse überleben können, nicht nur normale Marktbewegungen.
</details>

**Frage 4:** Warum ist ein Oracle mit 30-Minuten-Heartbeat bei einem Asset, das 15% in 10 Minuten fällt, strukturell problematisch?

<details>
<summary>Antwort anzeigen</summary>

Ein 30-Minuten-Heartbeat bedeutet, dass der Oracle-Preis maximal alle 30 Minuten aktualisiert wird (wenn keine größere Deviation-Schwelle erreicht wird). Bei einem 15%-Drop in 10 Minuten: Der Oracle-Preis bleibt möglicherweise auf dem alten Wert (vor dem Drop), während der reale Markt bereits kollabiert ist. Während dieser Oracle-Verzögerung sind Positionen laut Oracle-Preis noch "gesund", obwohl sie real unterbesichert sind. Das bedeutet: Protokoll-Logik — einschließlich Liquidationen — funktioniert auf falschen Daten. Zwei Konsequenzen: Erstens, das Protokoll liquidiert Positionen nicht, die eigentlich liquidiert werden müssten, was Bad Debt erzeugt, wenn der Preis nicht zurückkommt. Zweitens, ein Angreifer könnte die Lücke nutzen — neue Kredite mit (noch) hoch bewertetem Collateral aufnehmen, bevor das Oracle-Update den Preis korrigiert. Deviation-Trigger mindern das Problem (bei 15%-Bewegung würde ein typischer 1%-Deviation-Trigger sofort auslösen), aber auch diese brauchen Sekunden bis Minuten für die Aggregation. Die Konsequenz: robuste Oracles haben kurze Heartbeats (30 Sekunden bis 5 Minuten), niedrige Deviation-Trigger (0,1–0,5%) und multiple Quellen. Bei Lending-Protokollen auf weniger robusten Oracles ist das Risiko signifikant und sollte bei der Asset-Auswahl berücksichtigt werden.
</details>

**Frage 5:** Ein konservativer Anleger will 20.000 USD in DeFi einsetzen mit Ziel 7–8%. Er erwägt zwei Strategien:
**Strategie A:** 100% Stablecoin-Supply diversifiziert auf Aave/Compound/Morpho (4–5% erwartet).
**Strategie B:** 50% Stablecoin-Supply, 30% wstETH-Collateral mit 10.000 USDC Borrow für weitere Stablecoin-Supply (HF ~2,0), 20% direkt wstETH (6–7% erwartet nach Netto-Rendite-Berechnung).

Welche Strategie passt zum 7–8%-Ziel, welche Risiken bringt die jeweils mit sich?

<details>
<summary>Antwort anzeigen</summary>

**Strategie A** erreicht realistisch 4–5%, liegt unter dem Ziel. Risiken minimal: Smart-Contract-Risiko (auf mehrere Protokolle verteilt), Depeg-Risiko auf Stablecoins, Liquidity Crunch bei Massenauszahlungen. Keine Liquidations-Gefahr. Für einen Anleger, der absolut keine Verlustgefahr will und 4–5% akzeptiert, ist das die richtige Wahl.

**Strategie B** zielt auf 6–7% durch moderate Leverage. Zusätzliche Risiken: Liquidations-Gefahr (HF 2,0 = 50% Preis-Puffer auf wstETH, das ist in extremen Krisen nicht ausreichend — bei Black-Thursday-ähnlichen Events oder stETH-Depeg könnte die Position liquidiert werden). Zusätzliche Komplexität (Monitoring-Anforderung erhöht). Borrow-Zins-Risiko (wenn Zinsen steigen, frisst das Rendite). Oracle-Risiko (Liquidations-Entscheidungen basieren auf Oracle-Preis).

**Für 7–8%-Ziel ist B näher dran**, aber nicht dominant besser. Die Antwort hängt von Risiko-Toleranz ab:
- Wenn der Anleger konservativ/passiv ist: Strategie A mit Akzeptanz von 4–5%
- Wenn er bereit ist, moderates Risiko und Monitoring-Aufwand zu akzeptieren für 1–2 Prozentpunkte mehr: Strategie B mit sehr konservativem HF (2,5+ statt 2,0)
- Alternative: Strategie A plus direktes wstETH (ohne Borrow) — holt ETH-Preis-Exposure rein, bringt Staking-Yield, kommt in Bull-Markets über 8%, in Bear-Markets unter 4%. Einfacher und risikoärmer als B.

Die wichtige Einsicht: das 7–8%-Ziel ist ein Durchschnitt über Jahre, nicht ein Monatsziel. Konsistent 5% mit minimalem Stress ist oft besser als 8% mit zeitweise hohen Drawdowns und Liquidations-Risiko.
</details>

---

## Modul-Zusammenfassung

Du hast in Modul 7 die Borrow-Seite systematisch verstanden:

**Collateral-Parameter:** LTV (max. Borrow-Quote), LT (Liquidations-Grenze), LB (Liquidations-Bonus). Pro Asset unterschiedlich kalibriert nach Volatilität und Liquidität. E-Mode für hoch korrelierte Assets erlaubt bis zu 93% LTV.

**Health Factor:** Die zentrale Risiko-Metrik. HF = (Collateral × LT) / Schuld. Über 1: sicher. Unter 1: liquidierbar. Konservative Zielwerte: 2,0–2,5+ für Normalpositionen. Handlungs-Schwelle bei HF unter 1,5.

**Liquidations-Mechanik:** Automatisiert, Bot-getrieben, sekundenschnell. Close Factor 50% bei HF 0,95–1,0, 100% bei HF < 0,95 (Aave V3). Liquidations-Penalty: 5–15% des Collaterals. Transparent auf Etherscan einsehbar.

**Oracle-Risiko:** Liquidations-Entscheidungen basieren auf Oracle-Preisen. Chainlink ist Standard und robust. Spot-Preis-Oracles sind anfällig für Flash-Loan-Manipulation. Oracle-Update-Verzögerungen können "verzögerte Crashes" verursachen.

**Kaskaden-Mechanik:** Liquidationen verstärken sich selbst durch Verkaufsdruck. Historische Fallbeispiele: Black Thursday 2020, Luna/UST 2022, stETH-Depeg 2022. Konservative Portfolios überleben durch niedrigen Leverage, Diversifikation, Reserven und klare Trigger.

**Borrow-Hygiene:** Vor jedem Borrow: Zweck, HF-Ziel, Exit-Plan, Gas-Budget, Diversifikations-Check, Reserve, Monitoring-Plan. Alert-Schwellen bei HF 2,0 / 1,7 / 1,5 / 1,3.

**Die ehrliche Botschaft:** Für das 7–8%-Jahresziel ist Borrowing nicht zwingend nötig. Ein gut diversifiziertes Supply-LP-Staking-Portfolio erreicht oft 4–6% ohne Borrow-Risiko. Borrowing kann 1–2 Prozentpunkte hinzufügen, aber mit höherer Komplexität. Die richtige Wahl ist individuell.

**Kernprinzip:** Konservativer Borrower nutzt maximal 40–60% des verfügbaren LTV, hält HF bei 2,0+, diversifiziert über Assets und Protokolle, hat Reserven und klare Trigger. Diese Struktur überlebt praktisch alle historischen DeFi-Krisen.

**Was in Modul 8 kommt:** Stablecoins im Detail. Wie verschiedene Stablecoin-Typen (fiat-besichert, krypto-besichert, algorithmisch) strukturell funktionieren. Depeg-Risiken systematisch einordnen. Stablecoin-Auswahl für konservative Portfolios.

---

*Ende von Modul 7.*
