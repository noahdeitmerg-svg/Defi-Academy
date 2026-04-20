# Flash-Loan-Anbieter im Vergleich

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die wichtigsten Flash-Loan-Anbieter und ihre Unterschiede benennen
- Für Anwendungsfälle den passenden Anbieter wählen
- Zentrale Unterschiede bei Fees, Liquidität und technischen Details verstehen
- Aave V3, Balancer V2 und Uniswap V3 Flash Swaps in Fee-Struktur, verfügbaren Assets und TVL-Tiefe vergleichen
- Uniswap V3 Flash Swaps als alternative Mechanik (nicht klassischer Flash Loan) einordnen
- Eine Anbieter-Wahl-Matrix nach Asset, Transaktionsgröße und Gas-Kosten aufstellen

## Erklärung

**Anbieter 1: Aave V3** — der Marktführer

- **Fee:** 0,05% (früher 0,09%, reduziert 2023)
- **Assets:** alle Aave V3-Assets (USDC, USDT, DAI, WETH, WBTC, wstETH, rETH, uvm.)
- **Chains:** Ethereum, Arbitrum, Polygon, Optimism, Base, Avalanche
- **Liquidität:** mehrere Milliarden USD
- **Callback:** `executeOperation`
- **Multi-Asset:** ja

**Ideale Anwendungen:** Liquidationen (höchste Lending-Liquidität, direkte Integration), Assets die Balancer nicht führt, Batch-Flash-Loans.

**Anbieter 2: Balancer V2** — der Kostenlos-Champion

- **Fee:** 0% (keine Gebühr)
- **Assets:** alle Balancer-Pool-Assets
- **Chains:** Ethereum, Arbitrum, Polygon, Optimism, Base und mehr
- **Liquidität:** hunderte Millionen USD
- **Callback:** `receiveFlashLoan`
- **Multi-Asset:** nativ unterstützt, einfachere API als Aave

**Ideale Anwendungen:** Arbitrage (0% Fee macht kleine Preis-Differenzen profitabel), häufige Flash Loans (kumulierte Einsparungen), Standard-Assets.

**Anbieter 3: Uniswap V3 Flash Swap** — andere Philosophie

- **Fee:** Swap-Fee (0,05%, 0,3% oder 1%, abhängig vom Pool)
- **Assets:** jedes Uniswap-V3-Pool-Asset
- **Technik:** Nutzer "borgt" Tokens aus Pool und muss entweder Tokens zurückgeben oder äquivalente Menge des anderen Pool-Assets zahlen

**Ideale Anwendungen:** Arbitrage innerhalb Uniswap, Atomic-Swaps, wenn Swap-Fee ohnehin anfallen würde.

**Weitere Anbieter**

- **Compound V3:** limitiert, nicht Haupt-Fokus
- **MakerDAO DssFlash:** 0% Fee, nur DAI, Cap bei ~500M DAI
- **Euler V2:** nach 2023-Hack relaunched 2024
- **Uniswap V4:** Hooks-System ermöglicht neue Flash-Operationen
- **dYdX V3:** 0% Fee, aber 2024 geschlossen

**Vergleichstabelle**

| Anbieter | Fee | Liquidität | Multi-Asset | Complexity | Bester Use-Case |
|---|---|---|---|---|---|
| Aave V3 | 0,05% | Sehr hoch | Ja | Mittel | Liquidationen, breiter Asset-Support |
| Balancer V2 | 0% | Hoch | Ja | Einfach | Arbitrage, Standard-Assets |
| Uniswap V3 | Swap-Fee | Pool-abh. | Nein | Komplex | Arbitrage in Uniswap |
| Compound V3 | Variabel | Niedrig | Nein | Einfach | USDC/WETH-Fälle |
| Maker DssFlash | 0% | Nur DAI | Nein | Einfach | DAI-zentriert |

**Entscheidungs-Regel**

1. **Arbitrage auf Standard-Assets:** Balancer V2 (0% Fee)
2. **Liquidationen:** Aave V3 (maximale Liquidität, Aave-interne Integration)
3. **Exotische Assets:** Aave V3 zuerst, sonst Balancer
4. **Multi-Asset-Strategien:** Aave V3 oder Balancer V2
5. **Intra-Uniswap-Arbitrage:** Uniswap V3 Flash Swap
6. **Über Aggregator:** Tool wählt automatisch

**Aggregator-Tools (DeFi Saver, Instadapp)** implementieren Router, die zur Laufzeit den optimalen Anbieter wählen — basierend auf Asset, Größe, Liquidität und Fee-Struktur. Retail-Nutzer muss sich nicht selbst entscheiden.

## Folien-Zusammenfassung

**[Slide 1] — Titel**
Flash-Loan-Anbieter im Vergleich

**[Slide 2] — Aave V3**
0,05% Fee
Marktführer
Höchste Liquidität
Breitester Support

**[Slide 3] — Balancer V2**
0% Fee (kostenlos)
Einfache API
Gut für Arbitrage
Multi-Asset

**[Slide 4] — Uniswap V3 Flash Swap**
Swap-Fee als Flash-Fee
In Uniswap-Ökosystem
Komplexer

**[Slide 5] — Weitere Anbieter**
Compound V3 limitiert
Maker DssFlash (nur DAI)
Euler V2 (relaunch)

**[Slide 6] — Vergleichstabelle**
Anbieter × Fee × Liquidität × Use-Case

**[Slide 7] — Entscheidungs-Regel und Aggregator-Tools**
Arbitrage: Balancer V2 (0% Fee)
Liquidationen: Aave V3 (interne Integration)
Exotische Assets: Aave zuerst, sonst Balancer
Retail: DeFi Saver / Instadapp wählen automatisch

## Sprechertext

**[Slide 1]** Flash-Loan-Anbieter sind nicht alle gleich. Diese Lektion vergleicht systematisch, welcher Anbieter wann optimal ist.

**[Slide 2]** Aave V3 ist Marktführer. 0,05 Prozent Fee. Alle wichtigen Assets. Auf Ethereum Mainnet plus vielen Layer-2s. Liquidität mehrere Milliarden. Multi-Asset-Flash-Loans unterstützt. Ideal für Liquidationen wegen direkter Integration mit Aave-Lending.

**[Slide 3]** Balancer V2 ist Kostenlos-Champion. 0 Prozent Fee. Alle Balancer-Pool-Assets. Einfachere API als Aave. Ideal für Arbitrage — 0 Prozent macht kleine Preis-Differenzen profitabel. Auch für hochfrequente Nutzung, wo kumulierte Einsparungen signifikant werden.

**[Slide 4]** Uniswap V3 Flash Swap anders konzipiert. Fee entspricht der Pool-Swap-Fee, also 0,05 bis 1 Prozent. Nutzer borgt Tokens aus einem Pool und gibt entweder diese oder eine äquivalente Menge des anderen Pool-Assets zurück. Komplexer in der Nutzung. Ideal, wenn Swap-Fee ohnehin anfallen würde.

**[Slide 5]** Weitere Anbieter. Compound V3 bietet limitierte Flash Loans, nicht Haupt-Fokus. Maker DssFlash: 0 Prozent Fee, aber nur DAI, Cap bei 500 Millionen. Euler V2 relaunched 2024 nach dem 2023-Hack. Uniswap V4 mit Hooks-System ermöglicht neue Formen. dYdX V3 ist 2024 geschlossen.

**[Slide 6]** Die Vergleichstabelle fasst zusammen. Aave V3: 0,05 Prozent, sehr hohe Liquidität, Multi-Asset, mittlere Complexity. Balancer V2: 0 Prozent, hohe Liquidität, Multi-Asset, einfach. Uniswap V3: Swap-Fee, variable Liquidität, kein Multi-Asset, komplex. Es gibt nicht einen, der immer besser ist.

**[Slide 7]** Praktische Entscheidungs-Regel und Aggregator-Tools. Arbitrage auf Standard-Assets: Balancer V2 mit 0 Prozent Fee. Liquidationen: Aave V3 wegen interner Integration. Exotische Assets: Aave V3 zuerst, sonst Balancer. Multi-Asset: beide geeignet. Intra-Uniswap: Uniswap V3 Flash Swap. Die gute Nachricht für Retail: du musst nicht selbst entscheiden. DeFi Saver und Instadapp implementieren Router, die zur Laufzeit automatisch den optimalen Anbieter wählen. Für Entwickler ist die Wahl strategisch — ein falsch gewählter Anbieter kann eine profitable Arbitrage in einen Verlust verwandeln. Für typische Nutzer: nutze Aggregator-Tools.

## Visuelle Vorschläge

**[Slide 1]** Titelfolie.
**[Slide 2]** **SCREENSHOT SUGGESTION:** Aave V3 Documentation.
**[Slide 3]** **SCREENSHOT SUGGESTION:** Balancer V2 Vault Documentation.
**[Slide 4]** Uniswap V3 Flash Swap Mechanik-Diagramm.
**[Slide 5]** Karten der weiteren Anbieter.
**[Slide 6]** Vergleichstabelle.
**[Slide 7]** Zwei-Spalten-Layout: links Entscheidungsbaum nach Use Case, rechts **SCREENSHOT SUGGESTION** DeFi Saver Router-Interface.

## Übung

**Aufgabe: Anbieter-Recherche**

Für fünf Szenarien: optimaler Anbieter + 2-3 Sätze Begründung.

1. Arbitrage Curve 3Pool ↔ Uniswap V3, 500k USDC
2. Aave-Position-Liquidation, 500k USDC nötig
3. Retail Collateral-Swap 50 rETH → 50 wstETH auf Aave V3
4. Multi-Asset Arbitrage mit 1M USDC + 100 ETH gleichzeitig
5. DAI-zentrierte Operation, 2M DAI Flash Loan

**Deliverable:** 5-Szenarien-Tabelle + Reflexion (5-8 Sätze) über Muster.

## Quiz

**Frage 1:** Warum ist Balancer V2 trotz 0% nicht für alle Fälle beste Wahl?

<details>
<summary>Antwort anzeigen</summary>

Mehrere Limitierungen trotz 0%-Fee. Erstens: Asset-Verfügbarkeit. Balancer hat gute Liquidität für Standard-Assets, aber viele exotische Tokens fehlen. Aave V3 unterstützt mehr seltene Assets wie GHO, crvUSD. Wenn du Flash Loans für Asset brauchst, das Balancer nicht hat, ist Aave einzige Option. Zweitens: Liquiditäts-Tiefe. Auch bei unterstützten Assets kann Balancer-Liquidität niedriger sein. Bei 100M USD Flash Loan hat Aave tiefere Pools. Drittens: Integration-Komplexität. Aave-interne Liquidationen sind direkt mit Aave-Flash-Loans gebaut. Balancer-Flash-Loan plus Aave-Liquidation bedeutet Cross-Protocol-Interaktion, mehr Gas. Viertens: Multi-Asset-Patterns. Aaves Implementierung ist flexibler bei konditionalen Rückzahlungen. Fünftens: Risiko-Konzentration. Ausschließlich Balancer bedeutet Single-Protocol-Risk. Diversifikation reduziert das. Sechstens: indirekte Gas-Kosten. Balancer-Integration kann komplexer sein, höhere Gas-Kosten übertreffen die 0,05%-Fee von Aave. Siebtens: Fee-Refunds bei Aave möglich über Governance-Mechanismen. Achtens: Spezifische Features wie "flashLoanSimple" bei Aave. Richtige Strategie: Balancer als Standard für Arbitrage/häufige Operationen auf Standard-Assets. Aave für breitere Coverage, größere Liquidität, Aave-integrierte Operationen. Aggregator-Tools entscheiden automatisch.
</details>

**Frage 2:** Warum nutzt ein Aave-Liquidations-Bot Aave V3 direkt, obwohl Balancer günstiger ist?

<details>
<summary>Antwort anzeigen</summary>

Technische und wirtschaftliche Gründe. Erstens: Gas-Effizienz durch protokoll-interne Calls. Aave-Liquidation mit Aave-Flash-Loan: Liquidator-Contract ruft Aave-Pool, der gewährt Flash Loan und führt Liquidation direkt durch. 2-3 externe Calls. Mit Balancer: Balancer-Vault (Flash Loan), Aave-Pool (Liquidation), DEX-Swap (Verkauf), zurück zu Balancer. 5-6 externe Calls. Gas-Differenz: typisch 50-100k Gas mehr für Cross-Protocol. Bei 30 Gwei: 5-10 USD mehr. Zweitens: atomare Logik. Aave-Flash-Loan passiert innerhalb desselben Contract-Calls wie Liquidation. Cross-Protocol erhöht Komplexität und Fehler-Anfälligkeit. Drittens: Race-Condition-Vorteil. Kompetitive Liquidationen — einfachere Transaktions-Struktur mit weniger Protokoll-Interaktionen hat bessere Erfolgs-Chance. Viertens: Oracle-Konsistenz. Aave nutzt interne Oracle für Liquidations-Entscheidungen. Direkt-Aave kennt diesen Preis exakt. Cross-Protocol mit DEX-Swap bewegt Preis (Slippage), Kalkulation komplizierter. Fünftens: Liquiditäts-Tiefe bei großen Liquidationen. Aave-Liquidität meist tiefer als Balancer bei 10M+ USDC. Sechstens: Fee-Logik. Aaves Fee wird teilweise als Reward an aToken-Holders verteilt. Indirekte Rückführung für Aave-Liquidator. Balancer: kein Rückfluss. Siebtens: Test-Coverage. Aave-Liquidations-Flash-Loan-Kombo am meisten getestet. Der Tradeoff in Zahlen: 500k USDC Liquidation — Aave-Fee 250 USD, Balancer-Einsparung 250 USD, aber zusätzliche Gas-Kosten 8-15 USD. Bei 5%-Bonus auf 500k sind 25.000 USDC Gewinn. Anbieter-Wahl macht unter 1% der Marge aus, aber Ausführungs-Wahrscheinlichkeit macht 100% aus. Für kompetitive Umgebungen: Aave-direkt bessere Wahl trotz höherer nomineller Kosten.
</details>

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → Aave V3 → Balancer V2 → Uniswap V3 Flash Swap → Weitere Anbieter → Vergleichstabelle → Entscheidungs-Regel und Aggregator-Tools
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — Anbieter-Vergleichstabelle, Fee-Struktur-Chart, TVL-Tiefe-Visualisierung, Uniswap-V3-Flash-Swap-Diagramm, Anbieter-Auswahlmatrix

Pipeline: Gamma → ElevenLabs → CapCut.

---
