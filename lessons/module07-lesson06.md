# Borrow-Hygiene für konservative Nutzer

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Eine persönliche Borrow-Hygiene-Checkliste definieren
- Sinnvolle Use-Cases für konservatives Borrowing identifizieren
- Entscheiden, wann Borrowing für das 7–8%-Ziel nicht nötig ist
- Einen Notfall-Reaktionsplan für schnell fallende Collateral-Preise vorab dokumentieren
- Den Break-Even-Punkt zwischen Borrow-Kosten und Re-Investment-Yield rechnerisch bestimmen
- Ein monatliches Borrow-Monitoring-Ritual (HF-Check, Oracle-Health, Markt-Stress-Signale) konsistent anwenden

## Erklärung

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

## Folien-Zusammenfassung

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

## Sprechertext

**[Slide 1]** Borrowing ist ein mächtiges Werkzeug. Für das 7 bis 8 Prozent Ziel dieses Kurses ist es aber nicht immer nötig. Diese Lektion gibt dir die Hygiene-Regeln für den Fall, dass du dich entscheidest zu borgen — und ehrliche Alternativen, wenn du es nicht tust.

**[Slide 2]** Sinnvolle Use-Cases. Erstens: Kapital-Effizienz ohne Verkauf. Du brauchst Liquidität, willst aber ETH nicht verkaufen — hinterlegst als Collateral, borgst Stablecoins. Zweitens: moderates Leveraged Staking. 1,5 oder 2 fach Leverage auf wstETH kann Staking-Yield boosten. Drittens: Stablecoin-Swap über E-Mode zur Rendite-Optimierung. Viertens: Shorts — technisch möglich, aber für konservative Strategien meist nicht empfohlen.

**[Slide 3]** Nicht-empfohlen für konservative Portfolios. Aggressive Leverage auf volatile Assets — kann schnell liquidieren. Leverage-Farming — zu viele Risiko-Komponenten. Recursive Borrowing auf volatile Assets — exponentiell riskant. Diese Strategien können funktionieren, aber sie passen nicht zum 7 bis 8 Prozent Ziel.

**[Slide 4]** Die Acht-Punkte-Checkliste vor jedem Borrow. Zweck: warum borgst du? Health-Factor-Ziel: bei welchem HF startest du, bei welchem handelst du? Exit-Plan: wann schließt du die Position? Gas-Budget: hast du ETH für Notfall-Transaktionen? Collateral-Diversifikation: ist dein Collateral zu konzentriert? Protokoll-Diversifikation: alles auf einem Protokoll? Reserve-Kapital: Stablecoins für Schulden-Rückzahlung im Notfall? Monitoring-Frequenz: wie oft prüfst du? Mindestens täglich bei aktiven Borrows.

**[Slide 5]** Konfigurierte Alert-Schwellen. Health Factor unter 2,0 — Informations-Alert. Unter 1,7 — Warnung. Unter 1,5 — Aktions-Alert, handle jetzt. Unter 1,3 — kritisch, Notfall-Modus. Diese Schwellen vorab konfigurieren.

**[Slide 6]** Tools. Die Apps von Aave und Compound selbst zeigen Health Factor direkt. DeBank für Portfolio-Übersicht. HAL.xyz für konfigurierbare Alerts. Tenderly für komplexere Setups. Rabby und einige andere Wallets zeigen Warnungen bei niedrigem HF.

**[Slide 7]** Die ehrliche Frage. 7 bis 8 Prozent Rendite sind oft ohne Borrowing erreichbar, besonders in Bull-Markets oder mit einem gut diversifizierten Supply-LP-Staking-Portfolio. Borrowing ist Zusatz, nicht Basis. Der konservative Rat: starte ohne Borrowing. Lerne Supply, LP, Staking. Füge Borrowing erst hinzu, wenn du alle Mechaniken verstehst und die Monitoring-Disziplin hast. Das ist nicht Vorsicht — das ist Strategie.

## Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Vier Karten der Use-Cases mit grünem Checkmark.

**[Slide 3]** Drei Karten der Nicht-empfohlenen Use-Cases mit rotem X.

**[Slide 4]** Acht-Punkte-Checkliste in zwei Spalten.

**[Slide 5]** Farbkodiertes HF-Schwellen-Diagramm mit Alert-Level.

**[Slide 6]** **SCREENSHOT SUGGESTION:** HAL.xyz Dashboard mit konfigurierten Alerts. Alternativ: DeBank-Alarm-Einstellungen.

**[Slide 7]** Portfolio-Vergleich mit und ohne Borrowing, Rendite-Aussicht.

## Übung

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

## Quiz

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

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → Sinnvolle Borrow-Use-Cases → Borrow-Hygiene-Checkliste → Notfall-Reaktionsplan → Break-Even-Kalkulation → Monitoring-Ritual → Wann kein Borrowing nötig ist
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 10–12 Min.)
- `visual_plan.json` — Borrow-Use-Case-Kategorien, Hygiene-Checkliste als Infografik, Notfall-Entscheidungsbaum, Break-Even-Rechenbeispiel, Portfolio-ohne-Borrow-Szenario

Pipeline: Gamma → ElevenLabs → CapCut.

---
