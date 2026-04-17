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