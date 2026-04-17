# Module 5 — Lending Systems

## DeFi's Credit Infrastructure: Supply, Borrow, and Liquidate

---

## 1. Learning Objectives

By the end of this module, you will be able to:

- Explain how pool-based lending protocols work at the smart contract level
- Understand the kinked interest rate model and calculate borrow/supply rates from utilization
- Define LTV, liquidation threshold, health factor, and liquidation penalty — and calculate each
- Describe the full liquidation process and how liquidation cascades form
- Compare Aave V3, Compound V3, Morpho Blue, and Spark architectures
- Explain E-Mode, Isolation Mode, and their role in capital efficiency
- Evaluate lending protocol risk: bad debt, oracle dependency, governance
- Construct and manage a basic leveraged lending position

---

## 2. Conceptual Explanation

### 2.1 — Why DeFi Lending Exists

In traditional finance, lending requires identity verification, credit scores, legal contracts, and a bank. DeFi lending replaces all of this with one mechanism: **over-collateralization.** You don't need a credit score because you post more collateral than you borrow. If you fail to repay, the protocol seizes your collateral automatically. No courts, no collections, no identity required.

This creates a permissionless credit system — anyone with collateral can borrow, 24/7, without a bank's permission. The interest rates are set by supply and demand, not by a committee.

### 2.2 — The Basic Flow

1. **Suppliers** deposit tokens into a lending pool and earn interest. When you supply 10,000 USDC to Aave, you receive aUSDC tokens representing your deposit plus accruing interest.
2. **Borrowers** post collateral and borrow from the pool. To borrow 7,000 USDC, you might deposit 5 ETH as collateral. You pay interest on the borrowed amount.
3. **Liquidators** are bots that monitor all positions. If your collateral value drops until your position becomes undercollateralized, liquidators repay part of your debt and seize your collateral at a discount (the liquidation bonus, typically 5–15%).

The pool is the intermediary. Suppliers don't lend to specific borrowers — they lend to a pool. Borrowers don't borrow from specific suppliers — they borrow from the same pool.

---

## 3. Mechanism Deep Dive

### 3.1 — The Interest Rate Model

Lending rates are determined algorithmically based on **utilization rate** — the percentage of supplied capital that is currently borrowed.

Utilization = Total Borrowed / Total Supplied

Most protocols use a **kinked (piecewise linear) model** with two slopes:

**Below optimal utilization (kink, typically 80–90%):** Rates increase slowly. This is the normal operating range.

borrow_rate = base_rate + (utilization / optimal) × slope_1

**Above optimal utilization:** Rates spike aggressively to incentivize repayments and new deposits.

borrow_rate = base_rate + slope_1 + ((utilization − optimal) / (1 − optimal)) × slope_2

**Concrete example (Aave USDC market):**
- base_rate = 0%, slope_1 = 4%, optimal = 90%, slope_2 = 60%

| Utilization | Borrow Rate | Supply Rate (15% reserve) |
|-------------|-------------|---------------------------|
| 30% | 1.33% | 0.34% |
| 60% | 2.67% | 1.36% |
| 80% | 3.56% | 2.42% |
| 90% (kink) | 4.00% | 3.06% |
| 92% | 16.00% | 12.51% |
| 95% | 34.00% | 27.44% |
| 99% | 58.00% | 48.78% |

Supply rate = borrow_rate × utilization × (1 − reserve_factor).

**The kink protects exit liquidity.** Above 90% utilization, rates spike so aggressively that borrowers are forced to repay, freeing up capital for suppliers who want to withdraw. Without the kink, suppliers could be trapped — unable to withdraw because all their capital is borrowed.

### 3.2 — LTV, Liquidation Threshold, and Health Factor

**Loan-to-Value (LTV)** — The maximum percentage of collateral value you can borrow at the point of initial borrowing. If ETH has 80% LTV and you deposit $10,000 of ETH, you can borrow up to $8,000.

**Liquidation Threshold** — The LTV at which your position becomes eligible for liquidation. Always higher than the max LTV. If ETH's liquidation threshold is 85%, your position is liquidated when your debt exceeds 85% of your collateral value.

The gap between LTV (80%) and liquidation threshold (85%) is your **safety buffer** at inception.

**Health Factor** — The real-time measure of your position's safety:

Health Factor = (Collateral Value × Liquidation Threshold) / Total Debt

- HF > 1: Position is safe
- HF = 1: Position is at the liquidation threshold — any further price drop triggers liquidation
- HF < 1: Position is in liquidation — bots are actively liquidating it

**Example:**
You deposit 5 ETH ($15,000) and borrow 10,000 USDC. ETH liquidation threshold = 85%.

HF = ($15,000 × 0.85) / $10,000 = $12,750 / $10,000 = 1.275

If ETH drops 20% to $2,400 (collateral = $12,000):
HF = ($12,000 × 0.85) / $10,000 = 1.02 — dangerously close.

If ETH drops 25% to $2,250 (collateral = $11,250):
HF = ($11,250 × 0.85) / $10,000 = 0.956 — liquidation triggered.

### 3.3 — The Liquidation Process

When HF drops below 1:

1. **Detection.** Liquidator bots monitor every lending position on every block. They run health factor calculations for every borrower. When they detect HF < 1, they immediately construct a liquidation transaction.

2. **Execution.** The liquidator calls the `liquidate()` function on the lending contract. They repay a portion of the borrower's debt (up to 50% per liquidation on Aave V3) and receive the equivalent value of the borrower's collateral, plus a **liquidation bonus** (5–15% depending on the asset).

3. **Impact on the borrower.** The borrower loses a portion of their collateral at below-market value. Example: You have $11,000 of ETH collateral and $10,000 debt. A liquidator repays $5,000 of your debt and receives $5,000 × 1.05 = $5,250 of your ETH (5% liquidation bonus). Your remaining position: $5,750 collateral, $5,000 debt — a healthier ratio, but you lost $250 to the liquidation penalty.

4. **Cascading liquidations.** When liquidators sell the seized collateral on DEXs, this creates additional sell pressure, potentially pushing the price lower and triggering more liquidations. This is the cascade mechanism discussed in the research framework.

### 3.4 — Aave V3: E-Mode and Isolation Mode

**Efficiency Mode (E-Mode)** groups correlated assets and allows higher LTV between them. The logic: if you borrow ETH against wstETH collateral, the depeg risk between these assets is much lower than between ETH and USDC. So the protocol can safely allow 93% LTV instead of 80%.

E-Mode categories:
- ETH-correlated: wstETH, cbETH, rETH can be used as collateral with 93% LTV to borrow ETH
- Stablecoin-correlated: USDC, USDT, DAI can cross-collateralize at 97% LTV

E-Mode is the foundation of leverage loops (covered in Module 7).

**Isolation Mode** lets governance list new, riskier assets without exposing the entire protocol. An isolated asset can only be used as collateral to borrow stablecoins, up to a specific debt ceiling. If the isolated asset collapses, the damage is contained.

### 3.5 — Morpho Blue: Isolated Lending Markets

Morpho Blue is a fundamentally different architecture. Instead of one shared pool per asset (Aave model), Morpho Blue allows permissionless creation of isolated lending markets.

Each market has: one collateral token, one loan token, one oracle, one LTV, and one interest rate model. Markets are independent — bad debt in one market doesn't affect any other.

**Why this matters:** In Aave, a bad debt event on an exotic collateral type affects all suppliers of the borrowed asset. In Morpho Blue, the risk is isolated to the specific market.

**Tradeoff:** Fragmented liquidity. Instead of one deep USDC pool, there might be dozens of smaller USDC pools with different collateral types.

---

## 4. Real-World Examples

### 4.1 — Case Study: Euler Finance Exploit ($197M, March 2023)

Euler Finance was a lending protocol with a novel feature: a "donation" function that let users donate their aTokens (deposit receipts) to the protocol's reserves. The attacker discovered that donating your aTokens while having outstanding debt created an accounting inconsistency — the system believed the collateral still existed (for health factor calculations) even though it had been donated away.

**Attack sequence:**
1. Flash-borrow a large amount of DAI
2. Deposit into Euler as collateral
3. Borrow against it (leveraged position)
4. Use the donation function to "donate" the deposit tokens
5. The system's health factor calculation was now broken — it still counted the donated collateral
6. Self-liquidate the broken position at a profit
7. Repay the flash loan

Total extracted: $197 million. The code had been audited twice. It had been live for two years.

**Lesson:** The most dangerous bugs are in the interactions between features. Each feature (donations, borrowing, liquidations) was individually correct. The vulnerability was in how they interacted. Audit quality matters, but time in production with significant TVL is the most reliable security indicator.

### 4.2 — Case Study: Compound Governance Attack (Proposal 289)

In 2024, a governance proposal (Proposal 289) on Compound passed that would transfer 499,000 COMP tokens (worth ~$25 million) from the treasury to a "growth fund" controlled by a multisig with minimal oversight. The proposal passed because a single large token holder (the "Golden Boys" group) accumulated enough voting power.

The community protested, and the funds were eventually returned. But the incident demonstrated that governance power in lending protocols is concentrated — the top 10% of token holders control approximately 76% of voting power.

**Lesson:** Governance risk is real. A lending protocol's parameters (LTV ratios, interest rate curves, supported collateral, liquidation bonuses) can all be changed through governance. If governance is captured by a hostile actor, they can modify parameters to create exploitable conditions.

---

## 5. Security Considerations

**Oracle Risk.** Lending protocols rely on oracles (primarily Chainlink) for price feeds. If the oracle delivers a stale or incorrect price, positions may be incorrectly liquidated (or incorrectly protected from liquidation). Always check which oracle a market uses and its update frequency.

**Utilization Trap.** If utilization reaches 100%, suppliers cannot withdraw. Your capital is locked until borrowers repay. Monitor utilization trends before depositing — consistently high utilization (>85%) is a warning sign.

**Bad Debt Contagion.** In pool-based models (Aave, Compound), bad debt from one borrower's position is socialized across all suppliers of that pool. Your "safe" USDC supply can lose value if a large position with exotic collateral generates bad debt.

**Smart Contract Risk.** Your supplied assets are held in the protocol's smart contracts. An exploit means total loss of deposited capital. Diversify across protocols — never supply >20% of your DeFi capital to a single lending protocol.

---

## 6. Practical Exercise

### Exercise 5.1 — Interest Rate Calculation

Given: base_rate = 0%, slope_1 = 5%, optimal = 85%, slope_2 = 75%, reserve_factor = 10%.
Calculate borrow rate and supply rate at utilization levels: 40%, 70%, 85%, 90%, 95%.

### Exercise 5.2 — Health Factor Scenarios

You deposit 10 ETH (at $3,000 = $30,000) and borrow $20,000 USDC. ETH liquidation threshold = 82.5%.
Calculate HF at ETH prices: $3,000, $2,800, $2,600, $2,400, $2,200.
At what ETH price are you liquidated?

### Exercise 5.3 — Explore Aave on Testnet

1. Go to Aave's Sepolia testnet deployment
2. Supply testnet ETH
3. Borrow testnet USDC against it
4. Monitor your health factor
5. Partially repay and observe HF change

### Exercise 5.4 — Liquidation Wall Analysis

Go to DeFiLlama's liquidation dashboard. For ETH on Aave V3, identify the three largest liquidation walls and their price levels. Calculate: if ETH drops to each level, how much collateral would be liquidated?

---

## 7. AI Tutor Q&A Examples

**Q: Why can't I borrow more than my collateral is worth? That defeats the purpose of borrowing.**

A: Over-collateralization is the tradeoff for permissionless lending. In TradFi, your identity and credit history are the collateral — the bank can sue you, garnish wages, and destroy your credit score if you don't repay. In DeFi, there's no identity — the protocol can't pursue you beyond the blockchain. Over-collateralization ensures the protocol can always recover the loan value by seizing collateral. The benefit is speed, permissionlessness, and composability — you can borrow in seconds, with no application, against any supported asset, and use the borrowed funds in any other protocol.

**Q: What happens if ETH crashes so fast that liquidators can't keep up?**

A: This is exactly how bad debt forms. If ETH drops 30% in minutes and liquidators can't profitably liquidate (because the liquidation bonus doesn't cover slippage on the DEX), positions go "underwater" — the debt exceeds the collateral. The protocol absorbs this as bad debt, covered by the reserve pool or safety module. This happened during "Black Thursday" in March 2020, when Maker accumulated $6.65M in bad debt because liquidation auctions failed during extreme network congestion.

---

## 8. Key Takeaways

1. **Lending protocols are supply-demand rate machines.** Utilization drives rates. The kink model protects exit liquidity. Understanding the rate curve lets you predict when borrowing costs will spike.

2. **Health Factor is the single most important number in leveraged DeFi.** HF < 1 = liquidation. Set alerts at HF 1.8 (warning) and HF 1.5 (action required). Know your liquidation price before entering any position.

3. **Liquidation cascades are DeFi's systemic risk.** Liquidated collateral sold on DEXs pushes prices lower, triggering more liquidations. Cascades compound in real-time and explain why DeFi crashes are faster and more violent than TradFi crashes.

4. **E-Mode enables capital-efficient strategies on correlated assets.** 93% LTV on wstETH/ETH is the foundation of staking leverage loops.

5. **Bad debt is the tail risk of supplying.** When liquidations fail, suppliers absorb the loss. Diversify across protocols and monitor utilization to manage this risk.

6. **Governance controls everything.** LTV ratios, rate curves, supported collateral, liquidation parameters — all set by governance. A governance attack can change the rules of the system you're participating in.

---

| ← Module 4: DEX Mechanics & AMMs | **Module 5: Lending Systems** | Module 6: Stablecoins & Liquid Staking → |
