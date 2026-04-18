# Collateral und Loan-to-Value: Die Grundmechanik

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die drei wichtigsten LTV-Parameter (LTV, LT, LB) voneinander unterscheiden
- Eine konkrete Borrow-Position mit Sicherheitspuffer berechnen
- Die Rolle unterschiedlicher Collateral-Assets in Bezug auf ihre LTV-Werte einordnen
- Die Begriffe Max LTV, Liquidation Threshold und Liquidation Bonus aus den offiziellen Markt-Parametern auf Aave/Compound/Morpho korrekt ablesen
- Den Sicherheitspuffer zwischen aktuellem LTV und Liquidation Threshold quantitativ dimensionieren
- Eine Borrow-Strategie für verschiedene Collateral-Typen (ETH, wstETH, WBTC, USDC) nach Volatilität und LTV-Profil anpassen

## Erklärung

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

## Folien-Zusammenfassung

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

## Sprechertext

**[Slide 1]** Modul 7 behandelt die Borrow-Seite. In Modul 6 standst du auf der Supply-Seite. Jetzt bist du derjenige, der Kapital aufnimmt — gegen Sicherheiten. Das ist der mächtigste Hebel in DeFi und gleichzeitig der häufigste Weg, Kapital permanent zu verlieren. Diese erste Lektion legt die Grundmechanik.

**[Slide 2]** Drei Parameter definieren jeden Collateral-Asset. LTV, Loan-to-Value, ist die maximale Borrow-Quote. LT, Liquidation Threshold, ist die Quote, ab der deine Position liquidiert wird — etwas höher als LTV. LB, Liquidation Bonus, ist der Abschlag, den ein Liquidator bekommt, wenn er deine Position ausführt. Diese drei Zahlen musst du für jede Position kennen, bevor du borgst.

**[Slide 3]** Ein konkretes Beispiel. ETH-Collateral auf Aave hat LTV 80, LT 83, LB 5. Du hinterlegst 10.000 Dollar ETH, kannst maximal 8.000 Dollar borgen. Wenn du genau auf dem LTV-Maximum bist, reicht ein Preis-Drop von etwa 4 Prozent, um dich über die LT zu bringen — und die Liquidation auszulösen.

**[Slide 4]** Warum existiert der Liquidations-Bonus überhaupt. Er motiviert spezialisierte Liquidator-Bots — Programme, die Pool-Zustände ständig überwachen und bei liquidierbaren Positionen sofort zuschlagen. Der LB ist ihr Gewinn. Ohne diesen Anreiz würde niemand die Liquidation ausführen, und das Protokoll hätte Bad Debt — Schulden, die nicht mehr durch Collateral gedeckt sind. Für dich als Borrower ist der LB eine reale Kosten-Komponente: 5 bis 15 Prozent des liquidierten Collaterals, abhängig vom Asset.

**[Slide 5]** LTV nach Asset-Typ. Stablecoins haben typisch 75 bis 80 Prozent LTV, weil niedrige Volatilität. Major Kryptos wie ETH und WBTC 70 bis 80. Liquid-Staking-Tokens etwas konservativer wegen eingebettetem Depeg-Risiko. Kleine oder volatile Tokens drastisch niedriger — 30 bis 65 Prozent, oft in Isolation Mode.

**[Slide 6]** E-Mode, Efficient Mode auf Aave V3. Für hoch korrelierte Assets — Stablecoin-Stablecoin, ETH-wstETH — sind LTV-Werte bis 93 Prozent möglich. Das ist mächtig für kapital-effiziente Strategien. Aber es ist risikoreich: bei einem Depeg, wie stETH im Juni 2022, wird die 93-Prozent-Position sehr schnell liquidiert. E-Mode ist für erfahrene Nutzer mit klaren Risikomanagement-Prozessen, nicht für passive Einsteiger.

**[Slide 7]** Die konservative Richtgröße. Nutze 40 bis 60 Prozent des verfügbaren LTV, nicht das Maximum. Das klingt ineffizient, aber es ist der Grund, warum konservative Strategien selten liquidiert werden. Der Puffer zwischen deiner aktuellen Position und der Liquidations-Grenze ist dein Überlebensraum bei Marktschwankungen. Alles Weitere in diesem Modul baut auf diesem Prinzip auf.

## Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Visualisierung einer Collateral-Leiste mit drei Markierungen: LTV (grün bis hier), LT (gelb, Warnung), Liquidation-Zone (rot).

**[Slide 3]** Schritt-für-Schritt-Rechnung mit Zahlen. **SCREENSHOT SUGGESTION:** Aave-App mit einer Collateral-Position, die LTV und Liquidation-Price anzeigt.

**[Slide 4]** Liquidator-Bot-Ökosystem-Diagramm: Pool → Preis-Feed → Bot → Liquidations-Transaktion → Bonus-Auszahlung.

**[Slide 5]** Tabelle der Asset-Typen mit ihren LTV-Werten, farblich nach Risiko gestuft.

**[Slide 6]** E-Mode-Visualisierung: normale LTV-Werte vs. erhöhte LTV-Werte in E-Mode-Kategorien.

**[Slide 7]** Sicherheitspuffer-Grafik: Maximum-LTV vs. empfohlene konservative Nutzung.

## Übung

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

## Quiz

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

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → Collateral-Grundlagen → LTV, LT, LB definiert → Sicherheitspuffer → Collateral-Asset-Vergleich → Rechenbeispiel → Entscheidungsheuristik
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 9–11 Min.)
- `visual_plan.json` — LTV/LT/LB-Achse-Diagramm, Collateral-Parameter-Tabelle (ETH/wstETH/WBTC/USDC), Sicherheitspuffer-Visualisierung, Aave-Markt-Parameter-Screenshot, Rechenbeispiel-Tabelle

Pipeline: Gamma → ElevenLabs → CapCut.

---
