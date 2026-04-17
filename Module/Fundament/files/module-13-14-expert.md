# Module 13 — On-Chain Data Analysis

## Reading the Blockchain Like a Professional Researcher

---

## 1. Learning Objectives

- Use Dune Analytics to build custom queries tracking protocol metrics
- Use DeFiLlama for TVL, yield, and stablecoin analysis
- Use DeBank and Arkham for wallet profiling and fund flow tracking
- Interpret on-chain data to identify trends, risks, and opportunities
- Build a personal research dashboard

---

## 2. Mechanism Deep Dive

### 2.1 — The Data Stack

**DeFiLlama** — Aggregated protocol data: TVL by chain/protocol/category, yield comparisons, stablecoin metrics, bridge flows, liquidation dashboards, fees/revenue. This is your primary dashboard for macro DeFi analysis. No account required. Free.

**Dune Analytics** — SQL-based querying of raw blockchain data. Community dashboards cover every major protocol. You can write custom queries or fork existing ones. Learning basic SQL (SELECT, FROM, WHERE, GROUP BY, JOIN) is sufficient for most DeFi analysis. Free tier is generous.

**DeBank** — Multi-chain portfolio tracker. Shows all your positions, health factors, LP values, claimable rewards, and approval history across every EVM chain. Also profiles any wallet address — useful for tracking whale positions.

**Arkham Intelligence** — Wallet labeling and fund flow visualization. Arkham labels 500M+ wallets with entity tags (exchanges, protocols, known whales, hack addresses). Trace where capital flows after major events.

**Token Terminal** — Protocol financial metrics: revenue, fees, P/E ratios, active users. Useful for fundamental analysis of protocol business models.

### 2.2 — The Four Research Lenses

**Lens 1 — Liquidity:** Check pool depth, utilization rates, TVL trends. Declining TVL = increasing risk.

**Lens 2 — Rates:** Track borrow rates, supply rates, funding rates, Pendle implied yields. Rate changes signal capital flows and market sentiment.

**Lens 3 — Liquidations:** Monitor liquidation walls on DeFiLlama. Know where cascading sell pressure will occur at each price level.

**Lens 4 — Capital Flows:** Track TVL migration between chains and protocols. Capital flowing into a protocol = conviction. Capital flowing out = concern.

### 2.3 — Building a Dune Dashboard

A basic DeFi research dashboard should track:
- Daily active users for protocols you're deployed in
- TVL changes over 7/30/90 days
- Fee revenue (is the protocol generating real economic activity?)
- Whale activity (large deposits/withdrawals)
- Liquidation volumes (stress indicator)

**SQL basics for Dune:**
```sql
SELECT 
  date_trunc('day', block_time) as day,
  SUM(amount_usd) as daily_volume
FROM uniswap_v3_ethereum.trades
WHERE block_time > now() - interval '30 days'
GROUP BY 1
ORDER BY 1
```

---

## 3. Practical Exercise

### Exercise 13.1 — DeFiLlama Research Session
1. Open DeFiLlama. Note total DeFi TVL, top 5 chains by TVL, and top 5 protocols by TVL.
2. Check the Yields page. Filter by: TVL >$10M, stablecoin pools only. What's the best risk-adjusted yield?
3. Check the Stablecoins page. What's the total stablecoin market cap? Which stablecoin gained/lost the most this week?
4. Check the Liquidations page for ETH on Aave. Where are the largest liquidation walls?

### Exercise 13.2 — Wallet Profiling
Pick any known DeFi whale address from Arkham Intelligence. Track their positions on DeBank. What strategies are they running? What protocols are they deployed in? What's their approximate portfolio size?

### Exercise 13.3 — Build a Dune Query
Fork an existing Dune dashboard for a protocol you're interested in. Modify one query to answer a specific question (e.g., "How has daily trading volume changed over the last 90 days?").

---

## 4. Key Takeaways

1. **On-chain data is public and permanent.** This transparency is DeFi's superpower for researchers — every transaction, every position, every protocol metric is verifiable.
2. **DeFiLlama is the Bloomberg Terminal of DeFi.** Start every research session here.
3. **Dune Analytics unlocks custom analysis.** Basic SQL lets you answer questions that no pre-built dashboard covers.
4. **Whale tracking provides signal, not alpha.** Smart money can be wrong. But knowing where large capital is deployed is useful context for your own decisions.

---

| ← Module 12: Cross-chain | **Module 13: On-chain Data Analysis** | Module 14: Composability Risk → |

---
---
---

# Module 14 — Composability Risk

## When DeFi's Superpower Becomes Its Systemic Weakness

---

## 1. Learning Objectives

- Map dependency chains across DeFi protocols
- Understand how failures propagate through composable systems
- Analyze real cascading failure events
- Build a personal dependency tree for your DeFi positions
- Apply the concept of "blast radius" to position sizing

---

## 2. Mechanism Deep Dive

### 2.1 — Composability = Dependency

DeFi's superpower is composability — protocols plug into each other like Lego blocks. Aave accepts stETH as collateral. Pendle wraps aTokens into yield derivatives. Yearn vaults deposit into Curve pools that use Chainlink oracles.

Each connection creates both utility and dependency. Your Yearn vault position depends on: Yearn's vault contract → Curve's pool contract → the underlying tokens → Chainlink's oracle → Ethereum's consensus. If any layer fails, your position is affected.

### 2.2 — Failure Propagation Patterns

**Direct dependency failure:** The protocol you're deposited in gets exploited. Your funds are directly lost. (Euler Finance, $197M.)

**Collateral cascade:** A widely-used collateral asset depegs. Every protocol accepting it as collateral simultaneously faces bad debt. (stETH depeg affecting Aave, Maker, Compound simultaneously.)

**Oracle cascade:** Chainlink experiences an outage or delivers stale prices. Every protocol using those feeds simultaneously misprices assets. Liquidations fire incorrectly or fail to fire.

**Liquidity cascade:** A major DEX pool is drained. Every protocol depending on that pool for liquidation execution can't liquidate efficiently. Bad debt accumulates across multiple lending protocols.

**Psychological contagion:** An exploit in Protocol A causes panic withdrawals from Protocol B, even though B shares no technical dependency with A. This was observed during the Curve Vyper exploit in July 2023 — protocols unrelated to Curve saw significant outflows.

### 2.3 — Dependency Mapping

For every DeFi position, create a dependency tree:

**Example: wstETH leverage loop on Aave V3 (Arbitrum)**
```
Your Position
├── Aave V3 (lending protocol)
│   ├── Aave smart contracts (audit: multiple, live since 2023)
│   ├── Governance multisig (upgrade authority)
│   └── Chainlink oracles (wstETH/ETH, ETH/USD feeds)
├── Lido (liquid staking)
│   ├── Lido smart contracts
│   ├── Lido DAO governance
│   ├── Node operator set (permissioned)
│   └── Ethereum beacon chain
├── Arbitrum (L2)
│   ├── Sequencer (centralized)
│   ├── Fraud proof system
│   └── Ethereum L1 (data availability)
└── DEX liquidity (for entry/exit)
    ├── Uniswap V3 wstETH/ETH pool
    └── Pool depth (can it absorb your exit?)
```

**Count the dependencies:** This "simple" position has 12+ dependencies across 4 protocol layers. A failure at ANY node can affect your position.

### 2.4 — Systemic Risk: When Everything Correlates

In a DeFi-wide crisis, all correlations approach 1. ETH drops → stETH depegs → lending protocols face liquidations → liquidated collateral dumped on DEXs → DEX prices crash further → more liquidations. Every protocol is affected simultaneously because they share common dependencies: ETH price, DEX liquidity, oracle feeds.

**The Correlation Fragility Index** (research concept from arXiv, 2025) measures this: during tail events, DeFi protocol TVLs become highly correlated, meaning "diversification" across DeFi protocols provides far less protection than expected.

**True diversification** in DeFi means: across chains (Ethereum + Arbitrum + Base), across protocol types (lending + LP + staking), across stablecoin types, and critically — between DeFi and non-DeFi assets (cash, TradFi investments).

---

## 3. Real-World Examples

### 3.1 — The Cascading Impact of USDC Depeg (March 2023)

SVB fails → Circle's USDC reserves at risk → USDC depegs to $0.87 → DAI (backed by USDC) depegs to $0.90 → Curve 3pool becomes imbalanced → Protocols using USDC as a pricing reference show distorted values → Aave positions using USDC collateral face margin pressure → Frax (partially USDC-backed) comes under pressure → Total DeFi TVL drops $10B+ in 48 hours.

One bank failure triggered a cascade through the entire DeFi stack because USDC was a shared dependency across hundreds of protocols.

---

## 4. Practical Exercise

### Exercise 14.1 — Map Your Dependencies
For your largest DeFi position (real or planned), create a full dependency tree like the example above. Count the total dependencies. Identify single points of failure.

### Exercise 14.2 — Stress Test Against Historical Events
Would your current portfolio survive: (a) the Luna collapse, (b) FTX failure, (c) USDC depeg, (d) a 50% ETH crash in 24 hours? For each scenario, trace through your dependency tree and identify what breaks.

---

## 5. Key Takeaways

1. **Every composable connection is a dependency.** Map them before deploying capital.
2. **Failures propagate through shared dependencies:** shared collateral, shared oracles, shared liquidity, and shared psychological confidence.
3. **Diversification within DeFi is weaker than you think.** During systemic events, all DeFi assets correlate. True diversification requires non-DeFi assets.
4. **The blast radius of a single protocol failure can be enormous.** An Aave exploit would cascade into every protocol using aTokens. A Chainlink outage would affect every protocol using their feeds.
5. **Position sizing is your primary defense.** No dependency mapping eliminates risk — it only helps you size appropriately.

---

| ← Module 13: On-chain Data | **Module 14: Composability Risk** | Module 15: Protocol Analysis → |
