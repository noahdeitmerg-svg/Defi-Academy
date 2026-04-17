## Modul-Abschluss-Quiz

Fünf Fragen zum integrierten Verständnis von Modul 8.

**Frage 1:** Erkläre in 4–5 Sätzen, warum "der Peg" kein Feature des Tokens ist, sondern das Ergebnis eines Mechanismus — und welche Konsequenz das für die Risiko-Bewertung hat.

<details>
<summary>Antwort anzeigen</summary>

Stablecoins halten keinen Peg durch ihre reine Existenz als Token. Der Peg entsteht durch einen Mechanismus — bei fiat-besicherten Stables durch 1:1-Einlöseprozess mit tatsächlichen Reserven, bei krypto-besicherten durch Überbesicherung plus Liquidations-Mechanismus, bei algorithmischen durch Supply-Anpassungen. Jeder Mechanismus hat spezifische Annahmen, die unter bestimmten Bedingungen brechen können. Die Konsequenz für Risiko-Bewertung: statt einer Token-Kategorie "Stablecoin = sicher" zu behandeln, muss jeder einzelne Stablecoin nach seinem Mechanismus analysiert werden. Welche Annahmen macht der Mechanismus? Welche Bedingungen könnten ihn zum Scheitern bringen? Wie wahrscheinlich sind solche Bedingungen? Das führt zu nuancierten, stablecoin-spezifischen Risiko-Urteilen statt zu pauschalen Stabilitätsannahmen.
</details>

**Frage 2:** Eine Diversifikations-Allokation von 40% USDC, 30% USDT, 20% DAI, 10% LUSD — warum ist das besser als 100% USDC?

<details>
<summary>Antwort anzeigen</summary>

Weil es auf mehreren Ebenen diversifiziert. Emittenten-Diversifikation: Circle, Tether, Sky, Liquity — ein emittenten-spezifischer Ausfall betrifft nur einen Teil. Mechanismus-Diversifikation: USDC/USDT sind fiat-besichert (US-Bank-System-Exposure), DAI ist hybrid (RWA + USDC + krypto), LUSD ist rein krypto-besichert (dezentral). Wenn ein Mechanismus strukturell versagt — z.B. systemische Bank-Krise, oder Collateral-Kollaps — sind andere Kategorien weitgehend unbetroffen. Jurisdiktions-Diversifikation: Circle (USA), Tether (BVI), Sky (dezentral), Liquity (dezentral). Unterschiedliche regulatorische Exposures. Bei 100% USDC: jeder der genannten Risikoträger kann das gesamte Kapital gefährden. Bei der diversifizierten Allokation: kein einzelner Risikoträger kann mehr als 40% des Kapitals gefährden. Der Erwartungswert der Rendite ist praktisch identisch (die APYs sind ähnlich), aber die Verlust-Wahrscheinlichkeits-Verteilung ist deutlich enger. Das ist klassische Diversifikations-Mathematik — gleiche erwartete Rendite bei geringerer Varianz.
</details>

**Frage 3:** Warum ist sDAI (5% APY) für konservative Portfolios typisch besser geeignet als sUSDe (15% APY), obwohl sUSDe die höhere Rendite bietet?

<details>
<summary>Antwort anzeigen</summary>

sDAI's 5% kommen aus einer fundamental robusteren Quelle: US-Treasury-Zinsen (über RWA) und Stability Fees aus überbesicherten DAI-Vaults. Das sind quasi-risikofreie Ertragsquellen mit klarem, gut verstandenem Mechanismus. sUSDe's 15% kommen aus zwei volatilen Quellen: Staking-Yields (relativ stabil, ~3%) und Funding-Rate-Einnahmen aus Perpetual-Futures-Shorts (sehr volatil, historisch positiv aber nicht garantiert). In Stress-Phasen können Funding Rates stark negativ werden, was den sUSDe-Yield auf null oder negativ bringt. Zusätzlich trägt sUSDe Exchange-Risiken (Shorts laufen auf CEXs wie Binance, Bybit, OKX), Liquidations-Risiken bei extremen ETH-Bewegungen, und komplexes Custody-Risiko. Für ein konservatives Portfolio mit 7–8%-Ziel ist sDAI der bessere Baustein, weil die Rendite-Quelle strukturell stabiler ist. sUSDe kann eine kleine taktische Position sein (10–15% der Stable-Allokation), um moderate Rendite-Boost zu bekommen, ohne das Portfolio durch eine dominante Position in einer neuen, noch nicht voll getesteten Mechanik zu gefährden.
</details>

**Frage 4:** Ein Nutzer erwägt, seine gesamte Stablecoin-Allokation von 30.000 USD auf Ethereum Mainnet Aave zu haben. Welche zusätzlichen Risiko-Dimensionen sollte er bedenken?

<details>
<summary>Antwort anzeigen</summary>

Über die bereits behandelten Stablecoin-Risiken (Mechanismus, Emittent, Protokoll) hinaus: Erstens, Chain-Risiko. 100% auf einer einzigen Chain bedeutet, dass ein Chain-spezifisches Ereignis (seltene Ethereum-Probleme, 51%-Angriff auf eine Test-Phase, Netzwerk-Halt bei Hardforks) das gesamte Kapital einfrieren könnte. Diversifikation auf Layer-2s (Arbitrum, Optimism, Base) oder alternative Chains (gewählt mit Bedacht) reduziert dieses Risiko. Zweitens, Gas-Cost-Exposition. Mainnet-Gas kann in Krisen explodieren (Black Thursday 2020). Ein schneller Ausstieg kann teurer sein als auf L2s. Drittens, MEV-Risiko bei großen Swaps. Wenn der Nutzer plötzlich umschichten will, sind Mainnet-Swaps MEV-exponiert — auf L2s weniger. Viertens, Liquiditäts-Risiko. Bei 30.000 USD sind Auszahlungen normal möglich, aber bei extremen Utilization-Spikes kann selbst das Probleme haben. Alternative Strategien: 60% Mainnet (wo tiefe Liquidität und die etabliertesten Protokolle sind), 25% Arbitrum/Base (günstigere Transaktionen, immer noch robust), 15% Reserve auf CEX oder in Wallet. Diese Chain-Diversifikation macht das Portfolio widerstandsfähiger gegen Chain-spezifische Ereignisse und gibt Flexibilität für Notfall-Transaktionen.
</details>

**Frage 5:** Ein konservatives 30.000 USD DeFi-Portfolio mit 7–8%-Zielrendite. Wie würde ein realistischer Stablecoin-Anteil strukturiert sein, und welchen Beitrag leistet er zur Gesamtrendite?

<details>
<summary>Antwort anzeigen</summary>

Für 30.000 USD Gesamt-Portfolio wäre ein Stablecoin-Anteil von 50–60% typisch: also 15.000–18.000 USD. Strukturierung: 30% USDC-Supply auf Aave V3 (4% APY), 15% USDC-Supply auf Compound V3 oder Morpho Blue Vault (4,5-6%), 20% sDAI via Spark (5%), 15% USDT-Supply auf Aave (4,5%), 10% LUSD (3-5%), 10% Wallet-Reserve (0%). Der gewichtete Durchschnitt kommt auf etwa 4–4,5% annualisierte Rendite auf die Stablecoin-Allokation. Absolut: 16.500 USD × 4,3% = ca. 710 USD jährlich aus Stables. Vom Gesamt-Portfolio (30.000 USD) ist das 2,4% — ein wesentlicher Teil der 7–8%-Gesamtrendite, aber nicht das Ganze. Der Rest (etwa 4,5–5,5%) muss aus den anderen Portfolio-Teilen kommen: Liquid Staking (wstETH bringt 3% Yield plus ETH-Preis-Beitrag), direkte ETH/BTC-Exposure (in neutralen bis Bull-Markets trägt das die Gesamtrendite über die 7–8%-Schwelle), eventuell kleine LP-Positionen für zusätzlichen Yield. Kernpunkt: der Stablecoin-Anteil ist der stabile Anker. Er bringt kein Ziel-Erreichen allein, sondern bietet die Basis, auf der andere Komponenten aufbauen können. In Bear-Markets schützt er das Portfolio vor großen Drawdowns. In Bull-Markets opfert er etwas Rendite-Potenzial zugunsten niedriger Volatilität. Die 7–8% Rendite sind ein Jahres-Durchschnitt, nicht ein stabiles monatliches Ergebnis — das muss realistisch erwartet werden.
</details>

---

## Modul-Zusammenfassung

Du hast in Modul 8 Stablecoins systematisch verstanden:

**Mechanismus statt Magie:** Der Peg eines Stablecoins ist nicht gegeben, sondern entsteht durch einen Mechanismus. Drei Hauptkategorien: fiat-besichert, krypto-besichert, algorithmisch/synthetisch. Jede Kategorie hat strukturell unterschiedliche Risiken.

**Fiat-besichert (USDC, USDT):** Dominieren nach Market Cap. USDC transparent, reguliert, US-Bank-exponiert. USDT weniger transparent, aber durch Profitabilität und globale Nachfrage historisch robust. Beide können bei Infrastructure-Stress temporär depeggen (USDC März 2023).

**Krypto-besichert (DAI, crvUSD, LUSD):** Dezentraler, aber komplexer. DAI heute nicht mehr rein dezentral durch RWA und USDC-Anteile. crvUSD innovativ mit LLAMMA-Liquidations. LUSD puristisch dezentral, nur ETH-Collateral, 110% CR, keine Governance.

**Yield-bearing Stablecoins (sDAI, sUSDS, sUSDe):** Kombinieren Peg mit integriertem Yield. sDAI/sUSDS aus konservativen Quellen (T-Bills, Stability Fees), ~5%. sUSDe aus delta-neutralem Hedging mit Funding-Rate-Yield, ~15% aber deutlich riskanter.

**Fünf Depeg-Auslöser:** Reserve-Zugang blockiert, Reserve-Solvabilitäts-Zweifel, Collateral-Kollaps, Mechanismus-Versagen, Funding-Rate-Kollaps. Historische Fälle (USDC März 2023, UST Mai 2022, DAI Black Thursday) als Lehrmaterial.

**Drei-Dimensionen-Diversifikation:** Emittent, Mechanismus, Yield-Struktur. Alle drei zu streuen ist der robusteste Schutz gegen Depegs und Einzel-Ausfälle.

**Konservative Allokations-Optionen:** Option A (einfach, 4% Rendite), Option B (yield-optimiert, 5,8%), Option C (minimal, 4,2%). Wahl hängt von Zeit-Budget und Risiko-Toleranz ab. Keine Option erreicht 7–8% allein — der Stablecoin-Anteil ist stabiler Anker, nicht alleiniger Renditebringer.

**Monatliches Rebalancing:** Positions-Check, News, Entscheidung, Gas-Analyse. Klar definierte Trigger: 40%-Konzentration, 2%-APY-Differenz, 2%-Depeg, Protokoll-Krise.

**Portfolio-Integration:** Stablecoins typisch 50–60% eines konservativen DeFi-Portfolios. Kombination mit 20–30% Liquid Staking, 10–15% direkte Spot-Exposure, 5–10% Reserve. Die 7–8%-Zielrendite kommt aus der Gesamt-Mischung, nicht aus einer einzelnen Komponente.

**Was in Modul 9 kommt:** Yield-Strategien. Wie Staking, Liquid Staking und Restaking strukturell funktionieren. Warum das Staking die zweite große Säule neben Stablecoin-Supply ist. Die Mechaniken von Lido, Rocket Pool, EigenLayer — und wie du ETH-Exposure mit Yield-Generierung konservativ kombinieren kannst.

---

*Ende von Modul 8.*