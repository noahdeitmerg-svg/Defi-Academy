## Modul-Abschluss-Quiz

Fünf Fragen zum integrierten Verständnis von Modul 6.

**Frage 1:** Erkläre die Beziehung zwischen Utilization, Borrow-Rate und Supply-Rate anhand eines Beispiels.

<details>
<summary>Antwort anzeigen</summary>

Die Borrow-Rate ist eine stückweise lineare Funktion der Utilization mit einem Kink-Point. Beispiel USDC auf Aave: bei 50% Utilization etwa 2% Borrow-Rate, bei 80% etwa 3,5%, am Kink (typisch 90%) etwa 4%, bei 95% schon 15–20%, bei 100% 50%+. Die Supply-Rate leitet sich ab: Borrow-Rate × Utilization × (1 − Reserve Factor). Bei 80% Utilization, 3,5% Borrow-Rate, 15% Reserve Factor: Supply-Rate = 3,5% × 0,8 × 0,85 ≈ 2,4%. Der Spread (Differenz zwischen Borrow- und Supply-Rate) hat zwei Quellen: der ungenutzte Pool-Teil (verdient nichts, wird aber auf alle verteilt) und der Reserve Factor (geht ans Protokoll).
</details>

**Frage 2:** Ein Anleger legt 30.000 USD USDC auf Aave V3 zu 4,5% Supply-Rate ab. Nach 6 Monaten steigt die Rate auf 7%, nach 12 Monaten fällt sie auf 3%. Was ist eine realistische Gesamt-Rendite, und was sagt das über Supply-Strategien aus?

<details>
<summary>Antwort anzeigen</summary>

Grobe Schätzung (vereinfacht, ohne Compounding): Durchschnitt über 12 Monate bei ungefähr gleichmäßigem Rate-Verlauf: (4,5 + 7 + 3) / 3 = 4,8%. Auf 30.000 USD: ca. 1.440 USD Zinsen. Das Wichtige ist die Aussage: Supply-Raten schwanken stark, und die Jahres-Rendite ist selten exakt die "angezeigte APY" zu einem bestimmten Zeitpunkt. Das erklärt, warum realistische Jahreserwartungen für USDC-Supply in 3–6% liegen, auch wenn zeitweise 7–10% angezeigt werden. Für konservative Strategien: diese Volatilität akzeptieren und nicht bei kurzen Dips in panische Umschichtungen wechseln.
</details>

**Frage 3:** Warum ist die Architektur von Morpho Blue (isolierte Märkte) potenziell riskanter für Supplier als Aave V3 (gemeinsamer Pool)?

<details>
<summary>Antwort anzeigen</summary>

In Aave V3 werden Risiken aus einzelnen Assets über den gesamten Pool verteilt: ein Asset mit Problemen wird durch Governance abgefangen, Bad Debt kann durch das Safety Module getragen werden, Diversifikation ist strukturell eingebaut. In Morpho Blue ist jeder Markt isoliert. Ein Markt mit einem problematischen Collateral oder Oracle kann vollständig versagen, und Supplier dieses Marktes tragen den Schaden direkt — ohne Safety Module, ohne Querverrechnung. Vaults mitigieren das teilweise durch Diversifikation über mehrere Märkte, fügen aber Kurator-Risiko hinzu. Für Supplier gilt: Morpho Blue bietet höhere Renditen, aber in einem konzentrierteren Risiko-Modell. Bei bekannten, gut-auditierten Märkten und vertrauenswürdigen Kuratoren kann das akzeptabel sein; als Gesamt-Portfolio-Basis ist Aave V3 aber konservativer.
</details>

**Frage 4:** Ein DeFi-Anleger hält 100% seines Stablecoin-Kapitals (50.000 USD) als USDC auf Aave V3. Welche drei fundamentalen Schwächen hat diese Position?

<details>
<summary>Antwort anzeigen</summary>

Erstens: Konzentration auf ein einzelnes Protokoll. Ein Smart-Contract-Hack, eine kritische Governance-Fehlentscheidung oder ein anderes Aave-spezifisches Problem trifft 100% des Kapitals. Diversifikation über Compound V3, Morpho Blue oder andere wäre angemessen. Zweitens: Konzentration auf einen einzelnen Stablecoin. USDC ist fiat-besichert und hängt an Circle und dessen Banken. Ein USDC-Depeg (wie März 2023) betrifft die gesamte Position. Diversifikation über USDT, DAI, crvUSD wäre sinnvoll. Drittens: 100% in Lending bedeutet keine Liquidität. Eine schnelle Auszahlung von 50.000 USD könnte auf Utilization-Probleme treffen. Eine kleine Reserve (5–10%) auf CEX oder Wallet gibt Flexibilität für Notfälle oder Opportunitäten.
</details>

**Frage 5:** Ein Anleger hat das Jahresziel von 7–8% Rendite. Welche Kombination aus Supply und anderen Strategien ist realistisch, um das Ziel zu erreichen?

<details>
<summary>Antwort anzeigen</summary>

Eine ehrliche Einschätzung: rein passives Supply erreicht typisch 4–6%. Um 7–8% zu erreichen, kommen Ergänzungen: Erstens — Liquid Staking (wstETH, rETH) als Teil des Portfolios bringt ETH-Staking-Yield (3–4%) zusätzlich zu ETH-Exposure. Zweitens — Stablecoin-LP auf Curve oder ähnliches (3–6% netto) bringt etwas mehr als pures Lending bei ähnlich niedrigen Risikoprofil. Drittens — moderates, kontrolliertes Leverage (z.B. ETH-Loop auf Aave mit sehr konservativem LTV), das wir in Modul 10 behandeln, kann Rendite boosten bei klaren Risikogrenzen. Vierte Komponente — opportunistisches Wahrnehmen höherer Raten bei Marktspitzen (z.B. kurzfristig auf Protokoll mit erhöhter Utilization wechseln). Ein typisches konservativ-aktives Portfolio könnte aus 40% Lending, 30% Staking, 20% LP, 10% Reserve/Opportunity bestehen — und damit realistisch 5–8% erreichen. 7–8% ist machbar, aber nicht durch eine einzige passive Strategie — es erfordert durchdachtes Portfolio-Management, das Modul 12 vertieft.
</details>

---

## Modul-Zusammenfassung

Du hast in Modul 6 die Lending-Infrastruktur systematisch verstanden:

**Architektur:** Pool-based Modell dominiert. Supplier zahlen ein, erhalten aTokens. Borrower hinterlegen Collateral, zahlen variable Zinsen. Überbesicherung ist Kern-Prinzip.

**Zinsmodell:** Utilization-basiert. Stückweise lineare Kurve mit Kink-Point bei 80–90%. Oberhalb des Kinks starker Zinsanstieg. Supply-Rate = Borrow-Rate × Utilization × (1 − Reserve Factor).

**Aave V3:** Marktführer, etabliert, featurenreich (E-Mode, Isolation Mode, Safety Module). Typische Stablecoin-Supply-Raten 3–6%. Längster Track-Record ohne direkten Hack.

**Compound V3:** Vereinfachtes Design — ein Pool pro Base-Asset, Collaterals verdienen keine Zinsen. Gute Diversifikations-Option zu Aave.

**Morpho Blue:** Minimalistisches Primitive mit Vaults. Potentiell höhere Renditen, aber konzentriertere Risiken. Sinnvoll als Teil eines diversifizierten Portfolios, nicht als einzige Basis.

**Supply-Strategien:** Reines Stablecoin-Supply erreicht 4–5% passiv. Erweiterte Strategien mit Liquid Staking und Stablecoin-LP erreichen 4,5–5,5%. Das 7–8%-Ziel erfordert aktiven Mix mit LP, Staking und moderatem Leverage — komplett passive Strategien bleiben unter dem Ziel.

**Risiken:** Smart-Contract, Liquidity Crunch, Depeg, Oracle, Bad Debt. Monitoring monatlich + anlassbezogen. Exit-Trigger vorab definieren — Stress-Entscheidungen sind strukturell schlechter.

**Kern-Disziplin:** Max 40% in einem Protokoll. Diversifikation über mindestens zwei Stablecoin-Typen. Kleine Reserve für Notfälle. Dokumentierte Exit-Trigger. Fünf Regeln, pure Disziplin.

**Was in Modul 7 kommt:** Die Borrow-Seite. Collateral-Management, Loan-to-Value, Health Factor, Liquidationsmechanik, Oracle-Risiken bei der Preisbestimmung. Die aktive Nutzung der Lending-Protokolle — mit konservativem Risikomanagement als Kern.

---

*Ende von Modul 6.*