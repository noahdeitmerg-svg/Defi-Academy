## Modul-Abschluss-Quiz

Fünf Fragen zu deinem integrierten Verständnis von Modul 4.

**Frage 1:** Ein Pool hält 2.000 Token A und 8.000.000 Token B. Berechne den Spot-Preis und überlege, wie sich der Preis ändert, wenn jemand 100 Token A gegen B tauscht.

<details>
<summary>Antwort anzeigen</summary>

Spot-Preis von A in B = 8.000.000 / 2.000 = 4.000 B pro A. Nach dem Swap: x' = 2.100, k = 16.000.000.000, y' = 16.000.000.000 / 2.100 ≈ 7.619.048. Der Swapper erhält 8.000.000 − 7.619.048 = 380.952 B. Zum Spot-Preis hätte er 100 × 4.000 = 400.000 B erhalten. Preis-Impact = 19.048 / 400.000 ≈ 4,76%. Der neue Spot-Preis im Pool ist jetzt 7.619.048 / 2.100 ≈ 3.628 B pro A — gefallen, weil A jetzt relativ reichlicher im Pool ist.
</details>

**Frage 2:** Warum ist Uniswap V3 nicht einfach "besser" als Uniswap V2 für alle Nutzer?

<details>
<summary>Antwort anzeigen</summary>

Aus Swapper-Sicht ist V3 meist besser — engere Spreads, weil konzentrierte Liquidität geringeren Preis-Impact erzeugt. Aus LP-Sicht ist V3 komplexer: Bereichsauswahl erfordert Markt-Meinung und Monitoring. Ein passiver LP ohne Überwachung kann in V3 durch Range-Exits deutlich mehr Impermanent Loss erleiden als in V2 ohne ausreichende Gebühren-Kompensation. V3 ist ein Power-Tool, das Expertise erfordert. V2-ähnliche Pools sind robuster für passive Nutzung. Der richtige Pool hängt von Rolle und Engagement des Nutzers ab.
</details>

**Frage 3:** Beschreibe in drei Sätzen, wie ein Sandwich-Angriff funktioniert und wie du dich konkret schützt.

<details>
<summary>Antwort anzeigen</summary>

Ein Sandwich-Bot sieht deine pending Swap-Transaktion im öffentlichen Mempool, schaltet vor dir einen Kauf, der den Preis nach oben treibt, lässt deinen Swap zum schlechteren Preis ausführen und verkauft direkt nach dir zu einem höheren Preis — der Gewinn ist ungefähr dein Slippage-Verlust. Schutz: Nutze einen privaten Mempool (Flashbots Protect, MEV Blocker, CoW Swap), damit die Transaktion nicht im öffentlichen Mempool sichtbar ist. Zusätzlich konservative Slippage-Toleranz setzen — 0,5% bei liquiden Paaren begrenzt den maximalen Angreifer-Gewinn strukturell.
</details>

**Frage 4:** Du willst 50.000 USD von USDC in ETH tauschen. Welche Swap-Strategie ist vernünftig?

<details>
<summary>Antwort anzeigen</summary>

Mehrstufig. Erstens: DEX-Aggregator nutzen (CoW Swap, 1inch Fusion) mit MEV-Schutz. Zweitens: Prüfen, ob Splitting über mehrere Transaktionen über Stunden oder Tage sinnvoll ist — das reduziert Preis-Impact und Marktsignal. Drittens: Slippage konservativ setzen (0,3–0,5% bei ETH/USDC). Viertens: Bei diesem Volumen auch überlegen, ob ein Teil direkt über eine seriöse CEX (Coinbase, Kraken) ausgeführt werden soll — für wirklich große Beträge haben CEXs oft tiefere Liquidität und geringeren Gesamt-Impact. Fünftens: Vor Ausführung alle Punkte der Swap-Checkliste durchgehen. Das Ziel ist, den Swap so unauffällig und preis-effizient wie möglich zu machen.
</details>

**Frage 5:** Warum ist "saubere Swap-Ausführung" für einen konservativen DeFi-Anleger mit ~7–8% Ziel-Rendite besonders wichtig?

<details>
<summary>Antwort anzeigen</summary>

Weil schlechte Ausführung die Rendite direkt frisst, und zwar strukturell. 1% schlechter Swap-Preis pro Monat kostet 12% pro Jahr — mehr als die gesamte Ziel-Rendite. Bei einer konservativen Strategie, die auf 7–8% zielt, ist jede vermeidbare Verschwendung inakzeptabel, weil sie die gesamte Strategie ins Minus drehen kann. Höhere Ziel-Renditen (30%+) können schlechte Ausführung verdauen; 7–8% nicht. Die Rendite muss durch saubere Mechanik geschützt werden: MEV-Schutz, enge Slippage, Aggregator-Routing, Gas-bewusste Ausführung. Diese Disziplin ist die unsichtbare Basis jeder langfristigen Strategie.
</details>

---

## Modul-Zusammenfassung

Du hast in Modul 4 die DEX-Landschaft systematisch kartiert:

**Strukturell:** DEXs arbeiten ohne Order Books, mit Liquidity Pools und formel-basierten Preisen. Custody, Preisbildung und Zugang unterscheiden sich fundamental von CEXs.

**Mechanik V2:** Die Formel x·y=k bestimmt Preise und Swap-Outputs. Preis-Impact wächst überproportional mit Swap-Größe relativ zum Pool.

**Mechanik V3:** Konzentrierte Liquidität ermöglicht höhere Kapital-Effizienz — für aktive LPs. Für passive LPs ist V2 oft robuster.

**Slippage:** Die Differenz zwischen Preis-Impact (deterministisch, vorhersehbar) und Slippage (nicht-deterministisch, durch Ausführungsverzögerung). Konservative Slippage-Toleranz ist der Grundschutz.

**MEV:** Die unsichtbare Steuer. Arbitrage und Liquidationen sind funktional; Sandwich-Angriffe sind Extraktion. Private Mempools sind Pflicht auf Mainnet.

**Aggregatoren:** Die professionelle Ausführungs-Schicht. 1inch, CoW Swap, Matcha — Route-Optimierung, Splitting, integrierter MEV-Schutz.

**Swap-Checkliste:** Route → Preis-Impact → Slippage → MEV-Schutz → Simulation → Signatur → Ausführen.

**Kernbotschaft für konservative Praxis:** Schlechte Swap-Ausführung kann die gesamte Ziel-Rendite auffressen. Saubere Mechanik ist keine Optimierung, sondern Voraussetzung.

**Was in Modul 5 kommt:** Wir drehen die Perspektive. Statt als Swapper gegen den Pool zu handeln, stellst du selbst Liquidität bereit. Wie LP-Positionen funktionieren, was Impermanent Loss mechanisch ist, wie reale LP-Renditen aussehen — und wann LP-Sein überhaupt sinnvoll ist.

---

*Ende von Modul 4.*