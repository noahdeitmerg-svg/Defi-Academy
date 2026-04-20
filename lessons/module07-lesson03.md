# Liquidationen: Wie sie mechanisch ablaufen

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Den technischen Ablauf einer Liquidation Schritt für Schritt beschreiben
- Zwischen Full Liquidation und Partial Liquidation unterscheiden
- Eine reale Liquidations-Transaktion auf Etherscan analysieren
- Die Rolle von Keeper-Bots und ihre Anreizstruktur (Liquidation Bonus) verstehen
- Den Close Factor als Begrenzung der Liquidationsgröße pro Einzeltransaktion einordnen
- Eine Liquidations-Walkthrough-Simulation für eine eigene hypothetische Borrow-Position durchspielen

## Erklärung

Wenn dein Health Factor unter 1 fällt, beginnt der Liquidations-Prozess. Dieser Prozess ist vollständig automatisiert — kein Mensch entscheidet, kein Gnadenakt. Ein Smart Contract führt aus, was im Code steht. Diese Lektion erklärt den genauen Ablauf.

**Warum Liquidationen existieren**

Liquidationen schützen Lending-Protokolle vor Bad Debt. Wenn eine Position zu wenig Collateral hat, muss sie geschlossen werden, um das System solvent zu halten. Ohne diesen Mechanismus würde jede Position, deren Collateral-Wert unter die Schuld fällt, eine uneinbringliche Forderung — Bad Debt — für das Protokoll erzeugen. Bei ausreichendem Volumen würde das Protokoll insolvent und alle Supplier würden Verluste erleiden. Liquidationen sind also kein Strafmechanismus gegen einzelne Borrower, sondern eine strukturelle Solvenz-Sicherung für das Gesamtsystem.

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

**Hinweis zum Beispiel:** Dieses Setup zeigt den Worst Case — eine Position genau am LTV-Maximum. Ein konservativer Nutzer (HF 2,0+) wäre bei −10% ETH-Fall nicht liquidierbar. Das Beispiel illustriert die Mechanik, nicht empfohlene Praxis.

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

## Folien-Zusammenfassung

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

## Sprechertext

**[Slide 1]** Wenn dein Health Factor unter 1 fällt, beginnt der Liquidations-Prozess. Vollständig automatisiert. Kein Mensch entscheidet. Diese Lektion erklärt den genauen Ablauf, damit du verstehst, was in den Sekunden nach HF-Überschreitung passiert.

**[Slide 2]** Der Ablauf in vier Schritten. Erstens: ein Liquidator-Bot erkennt die Gelegenheit. Zweitens: er sendet eine liquidationCall-Transaktion an das Protokoll. Drittens: das Protokoll führt die Logik aus — Schuld wird getilgt, Collateral geht an den Liquidator mit Bonus. Viertens: der Borrower bekommt das Rest-Collateral und hat keine Schuld mehr auf diesem Teil.

**[Slide 3]** Wichtig: es gibt viele Bots. Sie konkurrieren um profitable Liquidationen. Auf Ethereum Mainnet führt das oft zu Gas-Wars — Bots erhöhen ihre Gas-Preise, um zuerst in den Block zu kommen. Die Liquidation passiert typisch innerhalb von Sekunden nach HF-Unterschreitung. Als Borrower hast du praktisch kein Fenster mehr, um zu reagieren, sobald HF unter 1 fällt.

**[Slide 4]** Partial versus Full Liquidation. Aave V3 verwendet einen Close Factor. Wenn Health Factor zwischen 0,95 und 1,0 liegt, darf nur 50 Prozent der Schuld liquidiert werden — Partial. Erst wenn HF unter 0,95 fällt, ist Full Liquidation der gesamten Position möglich. Bei schnellen Preis-Crashes kann HF direkt unter 0,95 fallen, dann wird alles auf einmal liquidiert. Andere Protokolle haben andere Mechaniken — MakerDAO nutzt Auktionen, Morpho Blue hat einfachere Modelle. Prüfe bei jedem Protokoll die spezifische Mechanik.

**[Slide 5]** Eine konkrete Beispiel-Rechnung. Startposition: 10 ETH Collateral bei 3.000 Dollar pro ETH, 24.000 Dollar USDC Schuld. ETH fällt auf 2.700 — das triggert Liquidation. Nach Full Liquidation bleiben dem Borrower 0,67 ETH übrig, Wert 1.800 Dollar. Gesamt-Verlust: 4.200 Dollar. Davon 3.000 Dollar reiner Preis-Verlust, der den Borrower ohnehin getroffen hätte. Aber 1.200 Dollar sind reine Liquidations-Penalty — vermeidbar durch rechtzeitige Aktion.

**[Slide 6]** Transparenz ist ein Kernprinzip. Jede Liquidation ist auf Etherscan einsehbar. Du kannst historische Liquidationen analysieren, die Parameter der Transaktion sehen, die bewegten Tokens nachverfolgen. Das ist Lernmaterial und Monitoring-Werkzeug. Im Übungsteil gehst du eine reale Liquidation durch.

## Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Flussdiagramm der vier Schritte mit Icons.

**[Slide 3]** Gas-War-Visualisierung: Mempool mit mehreren Bot-Transaktionen, die konkurrieren. **SCREENSHOT SUGGESTION:** blocknative.com Mempool-Explorer mit Liquidations-Transaktionen.

**[Slide 4]** Diagramm mit HF-Skala: 0,95 und 1,0 als Grenzen, Partial vs. Full Liquidation Zonen.

**[Slide 5]** Schritt-für-Schritt-Rechnung der Beispiel-Liquidation. **SCREENSHOT SUGGESTION:** Reale Etherscan-Liquidations-Transaktion mit dekodierten Input-Parametern und Event-Logs.

**[Slide 6]** **SCREENSHOT SUGGESTION:** Dune-Analytics-Dashboard für Aave-Liquidationen (z.B. von bigbang.wtf oder ähnlich).

## Übung

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

## Quiz

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

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 6 Folien: Titel → Die vier Schritte einer Liquidation → Bot-Wettbewerb und Gas-Wars → Partial vs. Full Liquidation (Close Factor) → Beispiel-Rechnung → Etherscan-Transparenz
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — Liquidations-Flussdiagramm, Keeper-Bot-Anreizstruktur, Close-Factor-Effekt-Grafik, Etherscan-Liquidation-Tx-Screenshot, Full-vs-Partial-Vergleich

Pipeline: Gamma → ElevenLabs → CapCut.

---
