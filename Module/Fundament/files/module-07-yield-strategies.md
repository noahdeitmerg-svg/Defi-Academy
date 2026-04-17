# Module 7 — Yield Strategies

## Constructing, Measuring, and Managing DeFi Yield

---

## 1. Learning Objectives

By the end of this module, you will be able to:

- Identify the source of yield in any DeFi strategy
- Construct and calculate returns for lending carry trades, ETH staking leverage loops, LP strategies, and delta-neutral funding trades
- Define when each strategy works, when it breaks, and the specific triggers for failure
- Calculate net yield after accounting for all costs (borrow rates, gas, IL, opportunity cost)
- Understand vault strategies and auto-compounding mechanics
- Apply position sizing and exit trigger discipline

---

## 2. Conceptual Explanation

### 2.1 — The First Question: Where Does the Yield Come From?

Every yield in DeFi has a source. If you cannot name the source in one sentence, you do not understand the position and should not enter it.

**Legitimate yield sources:**
- **Borrow demand:** Borrowers pay interest for temporary use of capital (Aave supply APY)
- **Trading fees:** Traders pay fees for swap execution (Uniswap LP fees)
- **Protocol issuance:** The Ethereum protocol pays validators for network security (staking yield)
- **Funding rates:** Leveraged traders pay the opposite side for holding positions (perp funding)
- **Incentive emissions:** Protocols pay users in governance tokens to attract liquidity (temporary, compressing)
- **Arbitrage:** Extracting value from price differences across markets

**Unsustainable yield sources:**
- **Token emissions with no underlying revenue** — yield comes from token inflation, not economic activity
- **New depositors** — if the only source of yield is new capital entering, it's a Ponzi structure
- **Unpriced risk** — extreme yields on unknown protocols often mean you're being paid to absorb risk nobody else wants

---

## 3. Mechanism Deep Dive

### 3.1 — Strategy 1: Lending Carry Trade

**Mechanism:** Borrow an asset at a low rate. Deploy the borrowed capital into a higher-yielding opportunity. Pocket the spread.

**Example with numbers:**
- Post $15,000 of ETH as collateral on Aave (80% LTV)
- Borrow $10,000 USDC at 4% variable APR
- Deposit into a Pendle PT offering 7% fixed yield (e.g., sDAI PT, 6-month maturity)
- Net yield: 7% − 4% = 3% annualized on $10,000 = $300/year = $150 for 6 months
- Annual cost on $15,000 collateral tied up: $150 / $15,000 = 1% return on total capital

**When it works:** Stable borrow rates, reliable yield destination, sufficient spread (>2% after all costs).

**When it breaks:**
- Borrow rate spikes above yield: If Aave USDC borrow rate jumps from 4% to 15% (utilization spike), your 3% spread becomes −8%.
- Yield source fails: The protocol you deployed into gets exploited. Your borrowed $10,000 is gone, but your $10,000 debt remains.
- Collateral price drops: ETH drops 30%, your HF approaches liquidation. You must either add collateral or close the entire position at a loss.

**Risk management:**
- Set a kill switch: if borrow rate exceeds X% (e.g., 8%), unwind immediately
- Use stablecoin collateral to eliminate price-drop liquidation risk
- Prefer fixed-rate yield destinations (Pendle PT) over variable (which can compress)
- Size so that a 3x borrow rate spike doesn't liquidate you

### 3.2 — Strategy 2: ETH Staking Leverage Loop

**Mechanism:** Recursively supply wstETH and borrow ETH on Aave V3 E-Mode to amplify staking yield.

**Example with numbers (3x leverage):**
- Start: 10 ETH ($30,000) → convert to wstETH
- Loop 1: Supply 10 wstETH → Borrow 9.3 ETH (93% LTV) → Swap to wstETH
- Loop 2: Supply 9.3 wstETH → Borrow 8.65 ETH → Swap to wstETH
- Loop 3: Supply 8.65 wstETH → Borrow 8.04 ETH → Swap to wstETH
- Continue until reaching ~3x leverage
- Total exposure: ~30 wstETH supplied, ~20 ETH borrowed
- Gross yield: 30 × 3.5% staking APR = 1.05 ETH/year
- Cost: 20 ETH × 2.0% borrow APR = 0.40 ETH/year
- Net yield: 0.65 ETH on 10 ETH capital = **6.5% APR in ETH terms**

**When it works:** When staking yield > ETH borrow cost. This spread has been persistently positive since The Merge because staking yield is structural (protocol-level) while ETH borrow demand is variable.

**When it breaks:**
- wstETH/ETH depeg: At 3x leverage, a 5% depeg reduces collateral by 15% while debt stays constant. HF collapses. In June 2022, stETH hit 0.93 — a 7% depeg that would have liquidated most 2.5x+ positions.
- ETH borrow rate spike: During high demand (market panic, airdrop farming), ETH borrow rates can spike to 10–20%, turning the loop deeply unprofitable.
- Gas cost for deleverage: In a crisis, gas spikes mean unwinding the loop costs $200–500+, eating into returns.

**Liquidation price calculation (3x leverage, ETH at $3,000):**
- Collateral: 30 wstETH. Debt: 20 ETH
- Liquidation when: (30 × wstETH_price × 0.93) / (20 × ETH_price) < 1
- If wstETH/ETH ratio = R: liquidation when R < 20 / (30 × 0.93) = 0.717
- At parity (R=1), no liquidation from ETH price moves alone — it's a same-asset loop
- Primary risk is the wstETH/ETH ratio, not the USD price of ETH

**Risk management:**
- Keep leverage ≤2.5x for positions held >30 days
- Monitor wstETH/ETH daily — alert at 0.995, deleverage at 0.98
- Use DeFi Saver automation for emergency deleverage
- Keep 20% undeployed as an emergency collateral buffer

### 3.3 — Strategy 3: Concentrated Liquidity Provision

**Mechanism:** Provide liquidity in a specific price range on Uniswap V3 to earn trading fees.

**Example with numbers (ETH/USDC, ±10% range):**
- Deploy $20,000 at ETH = $3,000
- Range: $2,700–$3,300
- Pool volume: $50M/day, fee tier: 0.3%, your share of active liquidity: 0.5%
- Daily fees: $50M × 0.3% × 0.5% = $750/day → $273,750/year
- On $20,000 capital: 1,369% APY (this is why V3 APYs look so high)

**Reality check:** This APY assumes price stays in range 100% of the time, volume stays constant, and your liquidity share stays constant. In practice, price will exit your range, volume fluctuates, and other LPs will add liquidity in the same range. Realistic net APY after IL for a well-managed position: 15–40%.

**IL in concentrated positions:**
- Price moves to $3,300 (top of range): position is 100% USDC, IL ≈ 1.5%
- Price moves to $3,600 (out of range): position is 100% USDC, earning zero fees, IL ≈ 3% and growing
- Price moves to $2,700 (bottom of range): position is 100% ETH, IL ≈ 1.5%

**Risk management:**
- Use wider ranges (±15–20%) for volatile pairs
- Only LP on L2s where rebalancing gas costs are negligible
- Track net PnL weekly (fees − IL − gas), not just fee APY
- Rebalance rule: if price sits at range boundary >24 hours, reassess

### 3.4 — Strategy 4: Delta-Neutral Funding Rate Arbitrage

**Mechanism:** Hold spot ETH (or stETH) long, short ETH perpetual futures for equal notional. Net price exposure: zero. Profit from staking yield + positive funding rates.

**Example with numbers:**
- Buy $100,000 of stETH (spot long)
- Short $100,000 ETH-PERP on Hyperliquid (2x leverage, $50k margin)
- Staking yield: 3.5% → $3,500/year
- Average funding rate: 0.01% per 8 hours → 0.03%/day → 10.95%/year → $10,950/year
- Total gross yield: $14,450/year on $150,000 capital = 9.6%

**When it works:** Bull markets with strong speculation driving positive funding. In 2024, annualized funding exceeded 20% during peak bullishness.

**When it breaks:**
- Funding goes negative: In bear markets, shorts pay longs. Your "yield" becomes a cost. Extended negative funding can drain 5–15% annually.
- Exchange counterparty risk: Your short position sits on a centralized exchange. FTX taught this lesson — $8B in customer funds lost.
- Basis risk: Spot and perp prices can diverge during extreme volatility, causing mark-to-market losses even on a "delta-neutral" position.
- Margin management: If ETH spikes 50%, your short position needs additional margin. You might need to sell spot stETH at a bad price to post margin.

**Risk management:**
- Spread the short across 2–3 exchanges to reduce counterparty concentration
- Keep 20% buffer margin beyond minimum
- Set a funding floor: if 7-day average funding goes negative, begin unwinding
- Never use maximum leverage on the short leg

### 3.5 — Strategy 5: Vault Strategies (Yearn, Beefy)

**Mechanism:** Deposit tokens into a vault contract. The vault automatically executes a strategy — farming, compounding rewards, rebalancing — and passes yield to depositors minus a performance fee.

**How auto-compounding works:** A vault farming CRV rewards on Curve would: supply assets to Curve pool → earn CRV rewards → sell CRV for the deposited asset → re-deposit into the pool. This compounds at intervals (hourly, daily) rather than continuously, slightly reducing effective APY. The vault charges 2–20% performance fee on the yield generated.

**When it works:** When the underlying strategy is sound and gas costs for individual compounding would eat returns for smaller positions. Vaults democratize strategies that only make economic sense at scale.

**Risks:** Smart contract risk (you trust the vault AND every protocol the vault interacts with), strategy risk (the vault's approach might become unprofitable), admin key risk (some vaults can be modified by their owner).

---

## 4. Real-World Examples

### 4.1 — The "Real Yield" Movement (2022–2023)

After the collapse of unsustainable yield farming (Olympus DAO's 7,000% APY backed only by token emissions), the market shifted to "real yield" — yield from genuine economic activity. GMX pioneered this: traders on GMX pay fees, and those fees are distributed to GMX stakers in ETH/AVAX, not inflated governance tokens. This represented a maturation of DeFi from Ponzi-adjacent tokenomics to sustainable business models.

---

## 5. Security Considerations

**Yield source sustainability.** If >50% of the yield comes from token emissions, it will compress as tokens are sold. Protocol revenue (trading fees, borrow interest) is sustainable. Token emissions are subsidies with an expiry date.

**Yield stacking = risk stacking.** A strategy that earns staking yield + LP fees + protocol incentives is also exposed to staking risk + LP risk + protocol risk. Each layer adds return AND risk.

**If the APY looks too good, you're the yield.** 50%+ APY on stablecoins from unknown protocols means one of: the protocol is new and subsidizing with emissions (will compress), the risk is unpriced (smart contract exploit waiting to happen), or it's a Ponzi structure (new deposits fund old depositors).

---

## 6. Practical Exercise

### Exercise 7.1 — Strategy Comparison Spreadsheet

Build a spreadsheet comparing all five strategies:

| Strategy | Capital Required | Gross Yield | Costs | Net Yield | Primary Risk | Kill Switch |
|----------|-----------------|-------------|-------|-----------|-------------|-------------|

Fill in with realistic numbers for current market conditions (check Aave rates, Uniswap volumes, funding rates).

### Exercise 7.2 — Paper-Trade a Leverage Loop

With 10 ETH at current price: calculate the loop construction (3x leverage), the gross yield, the borrow cost, the net yield, the liquidation depeg level, and the monthly gas cost for monitoring/compounding. Compare net return vs. simply holding stETH.

### Exercise 7.3 — Yield Source Identification

For five protocols listed on DeFiLlama yields, identify: the yield source (one sentence), whether it's sustainable or subsidized, the primary risk, and whether you would deploy capital.

---

## 7. AI Tutor Q&A Examples

**Q: Is 6.5% on a staking loop worth the risk?**

A: It depends on your benchmark. If you'd otherwise hold ETH earning 3.5% staking yield, the loop adds 3 percentage points. On $30,000 capital, that's $900/year of additional yield. Ask yourself: is $900/year worth the risk of liquidation during a stETH depeg, the operational overhead of monitoring, the gas costs of setup and teardown, and the smart contract risk of Aave + Lido? For many professionals, yes — the spread is structural and the risks are manageable with proper monitoring. For a beginner with limited monitoring capacity, the simple stETH hold at 3.5% might be the better risk-adjusted choice.

**Q: Why don't all DeFi yields converge to the same rate?**

A: Because they carry different risks. Higher yields compensate for higher risk — this is the risk premium. Aave USDC supply (3%) carries minimal risk. An exotic new protocol offering 30% carries smart contract risk, governance risk, and potential rug pull risk. If all risks were equal, yields would converge. The fact that they don't means the market is pricing risk — imperfectly, but directionally. Your edge comes from understanding risk more accurately than the average participant.

---

## 8. Key Takeaways

1. **Every yield has a source. Name it.** Borrow demand, trading fees, protocol issuance, funding rates, or incentive emissions. If the source is "new depositors," exit.

2. **Leverage loops amplify yield AND risk.** A 3x staking loop earns ~6.5% but faces liquidation from a 5% wstETH depeg. Size conservatively (≤2.5x) for positions held long-term.

3. **LP profitability is net of IL, not gross fees.** The only number that matters: fees − IL − gas. Track it weekly. Exit if negative for 3+ weeks without a clear reason to stay.

4. **Delta-neutral strategies eliminate price risk but introduce funding, counterparty, and basis risk.** They work best in bull markets with positive funding. Budget for negative funding periods.

5. **Vault strategies democratize complex strategies but stack smart contract risk.** Every protocol the vault touches is an additional dependency in your risk chain.

6. **Set exit triggers before entering.** For every strategy: what borrow rate triggers exit? What depeg level? What HF threshold? Write these down at entry. Follow them mechanically.

---

| ← Module 6: Stablecoins & Liquid Staking | **Module 7: Yield Strategies** | Module 8: MEV → |
