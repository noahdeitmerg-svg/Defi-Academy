# Module 4 — DEX Mechanics & AMMs

## How Trustless Trading Actually Works

---

## 1. Learning Objectives

By the end of this module, you will be able to:

- Explain why decentralized exchanges exist and what problem they solve
- Describe the constant product formula (x × y = k) and calculate price impact for any trade
- Compare Uniswap V2, V3, and V4 architectures and their tradeoffs
- Understand Curve's StableSwap invariant and why it exists for correlated assets
- Calculate impermanent loss precisely for any price movement
- Evaluate whether an LP position is profitable (fees earned vs. IL incurred)
- Explain order book DEXs (dYdX, Hyperliquid) and their role in DeFi
- Understand DEX aggregators and how they optimize execution

---

## 2. Conceptual Explanation

### 2.1 — The Problem: Trading Without a Middleman

In traditional finance, exchanges operate order books — centralized databases matching buyers and sellers. The NYSE, Binance, and Coinbase all maintain order books. The exchange is the middleman: it custody's assets, matches orders, and settles trades.

A decentralized exchange removes the middleman entirely. There is no company holding your assets. There is no centralized server matching orders. Instead, a smart contract on the blockchain holds liquidity and automatically determines prices based on mathematical formulas. Anyone can trade at any time by interacting with the contract. Anyone can provide liquidity and earn fees.

This creates an entirely new market structure — one where liquidity is provided by passive capital pools rather than active market makers, and where prices are set by algorithms rather than order matching.

### 2.2 — Two Models: AMMs vs. Order Books

**Automated Market Makers (AMMs)** — Uniswap, Curve, Balancer — use liquidity pools and mathematical formulas to enable trading. LPs deposit tokens into pools. Traders swap against the pool. The formula determines the price. This model is simple, permissionless, and works for any token pair.

**On-chain Order Books** — dYdX, Hyperliquid — replicate the traditional exchange model on-chain. Users place limit orders at specific prices. A matching engine pairs buyers and sellers. This model is more capital efficient and offers more precise execution, but requires higher throughput (which is why these operate on their own chains or L2s).

Most DeFi liquidity lives in AMMs. Most DeFi trading volume is increasingly routed through both, with aggregators finding the best price across all venues.

---

## 3. Mechanism Deep Dive

### 3.1 — The Constant Product Formula (Uniswap V2)

The foundational AMM mechanism. A liquidity pool contains two tokens — say ETH and USDC. The pool maintains the invariant:

**x × y = k**

Where x is the amount of Token A in the pool, y is the amount of Token B in the pool, and k is a constant that only changes when liquidity is added or removed.

**Example Pool:**
- 100 ETH and 300,000 USDC
- k = 100 × 300,000 = 30,000,000
- Implied price: 300,000 / 100 = 3,000 USDC per ETH

**When someone buys 1 ETH:**
The pool must maintain k = 30,000,000. After removing 1 ETH, the pool has 99 ETH. New USDC reserve: 30,000,000 / 99 = 303,030.30 USDC. The buyer must deposit 303,030.30 − 300,000 = 3,030.30 USDC. Effective price: 3,030.30 USDC per ETH (not 3,000).

The extra $30.30 above the "spot price" is **price impact** — the cost of moving the pool's price. Larger trades relative to pool size create larger price impact.

**Price impact formula:**
price_impact ≈ trade_size / (pool_reserve + trade_size)

Buying 1 ETH from a 100-ETH pool: 1/101 ≈ 0.99% price impact.
Buying 10 ETH from the same pool: 10/110 ≈ 9.1% price impact.
Buying 10 ETH from a 10,000-ETH pool: 10/10,010 ≈ 0.1% price impact.

**Lesson:** Pool depth determines execution quality. Small pools mean expensive trades.

### 3.2 — Concentrated Liquidity (Uniswap V3)

Uniswap V2 spreads liquidity across the entire price range from 0 to infinity. Most of this liquidity is never used — if ETH trades at $3,000, liquidity at $1 or $1,000,000 sits idle.

V3 lets LPs choose a specific price range for their liquidity. If you believe ETH will trade between $2,800 and $3,200, you can concentrate your liquidity in that range. Within your range, you provide the same depth as a V2 LP with 10–50x more capital.

**Capital efficiency example:**
- V2 LP: $100,000 spread across all prices. ~$500 of effective liquidity at the current price.
- V3 LP: $100,000 concentrated in ±5% range. ~$10,000 of effective liquidity at the current price. 20x more capital efficient.

**The tradeoff:** When the price moves outside your range, your position is entirely converted to the less valuable token, and you earn zero fees. You hold 100% ETH if the price drops below your range, or 100% USDC if the price rises above your range.

V3 fundamentally changes LP from a passive to an active strategy. You must monitor your range, rebalance when price moves, and decide when to widen or narrow.

### 3.3 — Curve's StableSwap: Optimized for Correlated Assets

Curve uses a different formula optimized for assets that should trade near 1:1 — stablecoin pairs (USDC/USDT/DAI) or like-kind assets (ETH/stETH).

The StableSwap invariant blends a constant-sum formula (x + y = k, which gives zero price impact but can be drained) with a constant-product formula (x × y = k, which is resilient but has high price impact). An amplification coefficient (A) controls the blend:

- High A: behaves more like constant-sum. Very low price impact near the peg. Used for stablecoin pools.
- Low A: behaves more like constant-product. Higher price impact but more resilient to depegs.

**Practical result:** Swapping $1M USDC for USDT on Curve costs ~0.01–0.02% in price impact. The same swap on Uniswap V2 would cost ~0.3%+. For stablecoin trading, Curve is 10–30x more efficient.

### 3.4 — Impermanent Loss: The LP Tax

When you provide liquidity to a V2 pool, you're implicitly selling the winning asset and buying the losing asset as prices change. The pool's constant product formula rebalances your position continuously.

**IL Formula:**
IL = 2 × √(price_ratio) / (1 + price_ratio) − 1

Where price_ratio = new_price / original_price.

| Price Change | IL (%) |
|-------------|--------|
| ±10% | −0.11% |
| ±25% | −0.64% |
| ±50% | −2.02% |
| 2x (100% up) | −5.72% |
| 3x (200% up) | −13.4% |
| 5x (400% up) | −25.5% |
| 0.5x (50% down) | −5.72% |
| 0.2x (80% down) | −36.0% |

**IL is symmetric for equivalent ratios:** ETH doubling (2x) and ETH halving (0.5x) produce the same IL of −5.72%.

**Critical insight:** IL is ONLY "impermanent" if the price returns to your entry point before you withdraw. If you withdraw while the price has moved, the loss is realized and permanent. The term "impermanent loss" is misleading — "divergence loss" is more accurate.

**V3 Concentrated IL:** Concentrated liquidity amplifies IL proportionally to the concentration factor. A V3 position in a ±5% range experiences roughly 10x the IL of an equivalent V2 position for the same price movement. This is the cost of capital efficiency.

### 3.5 — LP Profitability: The Only Question That Matters

**Net LP Return = Trading Fees Earned − Impermanent Loss − Gas Costs**

If this number is negative, you would have been better off simply holding the tokens.

**Fee calculation:**
Each pool charges a fee on every swap (0.01%, 0.05%, 0.3%, or 1% on Uniswap V3). Your share of fees is proportional to your share of liquidity in the active price range.

Daily fees to LP = (Pool daily volume × Fee tier × Your liquidity / Total active liquidity)

**When LP is profitable:**
- High volume relative to TVL (the pool generates enough fees to overcome IL)
- Correlated assets (ETH/stETH, USDC/USDT) where IL is minimal
- Range-bound markets where price oscillates without trending
- Additional incentive rewards (protocol token emissions) that offset IL

**When LP loses money:**
- Trending markets (strong directional moves maximize IL)
- Low volume pools (fees don't compensate for IL)
- Poorly chosen V3 ranges (too narrow in volatile markets)
- Forgetting about a position while price trends away

### 3.6 — DEX Aggregators and Intent-Based Trading

**Aggregators (1inch, Paraswap)** split a trade across multiple DEXs and pools to find the best execution price. A $50,000 USDC→ETH swap might route 40% through Uniswap V3, 30% through Curve, 20% through Balancer, and 10% through a small pool — optimizing price impact across all venues.

**Intent-Based Systems (CoW Protocol, UniswapX)** represent a paradigm shift. Instead of constructing a specific swap route, you declare an "intent" — "I want to sell 1,000 USDC for at least 0.33 ETH." Professional solvers compete to fill your order at the best price. Benefits:

- **MEV protection:** Your order is not visible in the public mempool, preventing sandwich attacks.
- **Better prices:** Solvers can match orders peer-to-peer (Coincidence of Wants) or route through private liquidity.
- **Gasless swaps:** The solver pays gas and recovers the cost from the execution spread.

CoW Protocol has processed $33B+ in cumulative volume. UniswapX is Uniswap's intent-based system using Dutch auctions (the price starts favorable and decays until a solver fills it).

---

## 4. Real-World Examples

### 4.1 — The $3.1M Uniswap V3 IL Disaster

In 2021, a large LP deposited $3.1M into a concentrated ETH/USDC position on Uniswap V3. ETH was at $3,500. They chose a range of $3,000–$4,000. ETH then rallied to $4,800, leaving their entire range. Their position converted to 100% USDC — they had effectively sold all their ETH at an average price between $3,000 and $4,000, missing the rally to $4,800. Net loss vs. simply holding: approximately $500,000.

**Lesson:** Concentrated liquidity is directional exposure with extra steps. If you LP in a narrow range, you are betting the price stays in that range. If it doesn't, you're a forced seller at worse-than-market prices.

### 4.2 — Curve's USDC Depeg Pool Behavior (March 2023)

When USDC depegged to $0.87 during the SVB crisis, Curve's 3pool (USDC/USDT/DAI) became severely imbalanced. USDC composition reached ~60%+ of the pool as everyone dumped USDC for USDT and DAI. LPs in the 3pool absorbed massive losses because the pool's StableSwap formula kept buying USDC at near-par prices while the market valued it at $0.87.

LPs who stayed in the pool through the crisis and waited for USDC to repeg at $1.00 recovered. LPs who panicked and withdrew during the depeg locked in losses.

**Lesson:** Stablecoin LP is not "safe." You are taking the counterparty risk of every stablecoin in the pool. In a depeg event, you absorb the loss.

---

## 5. Security Considerations

**Slippage Protection.** Always set a slippage tolerance. Without it, MEV bots can sandwich your trade, giving you a much worse price. Standard settings: 0.5% for stablecoin pairs, 1–3% for volatile pairs. Never set slippage to "auto" on unfamiliar tokens.

**Deadline Protection.** Set transaction deadlines (most interfaces default to 30 minutes). Without a deadline, a pending transaction could execute hours later at a completely different price.

**Pool Verification.** Before LPing, verify you're interacting with the correct pool. Fake pools with fake tokens can mimic legitimate ones. Always confirm pool addresses through the protocol's official interface or documentation.

**Rug Pull via Liquidity Removal.** A token creator can add initial liquidity, attract buyers, then remove all liquidity — making the token unsellable. Check if pool liquidity is locked (via a timelock contract) before trading new tokens.

---

## 6. Practical Exercise

### Exercise 4.1 — Calculate Price Impact

**Scenario:** Pool has 500 ETH and 1,500,000 USDC (k = 750,000,000). ETH price = $3,000.

Calculate the effective price and price impact for buying:
- 1 ETH
- 10 ETH
- 50 ETH

Formula: New USDC reserve = k / (ETH reserve − amount bought). Cost = New USDC reserve − Current USDC reserve.

### Exercise 4.2 — Calculate Impermanent Loss

You LP at ETH = $3,000 with $10,000 ($5,000 ETH + $5,000 USDC = 1.667 ETH + 5,000 USDC).

Calculate your portfolio value and IL if ETH moves to:
- $4,000
- $2,000
- $6,000

Compare LP portfolio value vs. simply holding 1.667 ETH + 5,000 USDC at each price.

### Exercise 4.3 — First Testnet Swap

1. Connect Rabby to Uniswap on Sepolia testnet
2. Execute a swap (ETH → any testnet token)
3. Find the transaction on Sepolia Etherscan
4. Decode: Token Transfers, Swap event in logs, Input Data parameters
5. Calculate: What was your effective price? What was the price impact?

### Exercise 4.4 — LP Profitability Analysis

Go to [revert.finance](https://revert.finance) and analyze three real Uniswap V3 positions. For each, record: fees earned, IL incurred, net PnL, range width, and time active. Determine: was LPing better than holding?

---

## 7. AI Tutor Q&A Examples

**Q: If impermanent loss is so bad, why does anyone provide liquidity?**

A: Because fees and incentives can exceed IL. In high-volume pools (ETH/USDC on Uniswap V3), trading fees of 20–40% APY can far exceed IL if the LP manages their range well. Additionally, many protocols offer incentive rewards (token emissions) on top of fees. The key is the net calculation: fees + incentives − IL − gas. When this is positive, LP is a profitable yield strategy. When it's negative, you're paying for the privilege of providing liquidity.

**Q: Should I use Uniswap directly or an aggregator like 1inch?**

A: For any swap above ~$1,000, always use an aggregator or intent-based system. Aggregators split your trade across multiple pools to minimize price impact. CoW Protocol additionally protects you from MEV. For small swaps on L2 where gas is negligible, using Uniswap directly is fine. For large swaps on L1, the savings from an aggregator can be hundreds of dollars.

---

## 8. Key Takeaways

1. **AMMs replace order books with mathematical formulas.** The constant product formula (x × y = k) automatically adjusts prices as trades occur. Pool depth determines execution quality.

2. **Concentrated liquidity (V3) is 10–50x more capital efficient but requires active management.** You earn more fees per dollar deployed, but you face amplified IL and the risk of going out of range.

3. **Impermanent loss is the cost of providing liquidity.** It is real, permanent when you withdraw, and proportional to price divergence. Only provide liquidity when fee income reliably exceeds IL.

4. **Curve dominates for correlated assets.** StableSwap's amplification coefficient provides near-zero price impact for stablecoin swaps — 10–30x better than constant product AMMs.

5. **Intent-based systems (CoW, UniswapX) are the evolution of DEX trading.** They provide MEV protection, better prices, and gasless execution. For large trades, they should be your default.

6. **LP profitability = Fees − IL − Gas.** This is the only equation that matters. Track it relentlessly. If it's negative for three consecutive weeks, exit the position.

---

| ← Module 3: Gas, Tokens & Etherscan | **Module 4: DEX Mechanics & AMMs** | Module 5: Lending Systems → |
