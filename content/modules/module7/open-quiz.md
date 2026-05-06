## Modul-Abschluss-Quiz

Fünf Fragen zum integrierten Verständnis von Modul 7.

**Frage 1:** Eine Position hat initialen Health Factor 2,0. Nach drei Monaten ist der Collateral-Preis um 15% gefallen und die Schuld durch Zinsen um 8% gewachsen. Was ist der neue HF, und wie solltest du reagieren?

<details>
<summary>Antwort anzeigen</summary>

HF ändert sich proportional. Neuer Collateral-Wert: 85% des ursprünglichen. Neue Schuld: 108% des ursprünglichen. Health Factor = (Collateral Value × Liquidation Threshold) / Borrowed Value. Mit ursprünglichem HF = 2,0: neuer HF = 2,0 × (0,85 / 1,08) = 2,0 × 0,787 = 1,57. Der HF ist auf 1,57 gefallen — nach den konservativen Schwellen dieser Lektion ist das in der Warn-Zone zwischen 1,5 und 1,7. Aktion: entweder Schuld teilweise zurückzahlen (z.B. 30% der Schuld, würde HF auf etwa 2,2 anheben) oder Collateral hinzufügen (z.B. 20% mehr Collateral, ähnlicher Effekt). Wenn Zinsen weiter akkumulieren oder Preis weiter fällt, kann HF schnell unter 1,5 fallen. Handeln, nicht warten.
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

**Health Factor:** Die zentrale Risiko-Metrik. Health Factor = (Collateral Value × Liquidation Threshold) / Borrowed Value. HF > 1: Position sicher. HF = 1: Liquidation möglich. HF < 1: Liquidation wahrscheinlich. Konservative Zielwerte: 2,0–2,5+ für Normalpositionen. Handlungs-Schwelle bei HF unter 1,5.

**Liquidations-Mechanik:** Automatisiert, Bot-getrieben, sekundenschnell. Close Factor 50% bei HF 0,95–1,0, 100% bei HF < 0,95 (Aave V3). Liquidations-Penalty: 5–15% des Collaterals. Transparent auf Etherscan einsehbar.

**Oracle-Risiko:** Liquidations-Entscheidungen basieren auf Oracle-Preisen. Chainlink ist Standard und robust. Spot-Preis-Oracles sind anfällig für Flash-Loan-Manipulation. Oracle-Update-Verzögerungen können "verzögerte Crashes" verursachen.

**Kaskaden-Mechanik:** Liquidationen verstärken sich selbst durch Verkaufsdruck. Historische Fallbeispiele: Black Thursday 2020, Luna/UST 2022, stETH-Depeg 2022. Konservative Portfolios überleben durch niedrigen Leverage, Diversifikation, Reserven und klare Trigger.

**Borrow-Hygiene:** Vor jedem Borrow: Zweck, HF-Ziel, Exit-Plan, Gas-Budget, Diversifikations-Check, Reserve, Monitoring-Plan. Alert-Schwellen bei HF 2,0 / 1,7 / 1,5 / 1,3.

**Die ehrliche Botschaft:** Für das 7–8%-Jahresziel ist Borrowing nicht zwingend nötig. Ein gut diversifiziertes Supply-LP-Staking-Portfolio erreicht oft 4–6% ohne Borrow-Risiko. Borrowing kann 1–2 Prozentpunkte hinzufügen, aber mit höherer Komplexität. Die richtige Wahl ist individuell.

**Kernprinzip:** Konservativer Borrower nutzt maximal 40–60% des verfügbaren LTV, hält HF bei 2,0+, diversifiziert über Assets und Protokolle, hat Reserven und klare Trigger. Diese Struktur überlebt praktisch alle historischen DeFi-Krisen.

**Was in Modul 8 kommt:** Stablecoins im Detail. Wie verschiedene Stablecoin-Typen (fiat-besichert, krypto-besichert, algorithmisch) strukturell funktionieren. Depeg-Risiken systematisch einordnen. Stablecoin-Auswahl für konservative Portfolios.

---

*Ende von Modul 7.*