# Module 6 — Stablecoins & Liquid Staking

## The Foundations of DeFi Yield and Stability

---

## 1. Learning Objectives

By the end of this module, you will be able to:

- Classify stablecoins by mechanism and evaluate their risk profiles
- Explain how fiat-backed, CDP-based, and delta-neutral stablecoins maintain their pegs
- Analyze what happened during the Terra/Luna collapse and the USDC depeg
- Understand ETH staking mechanics and where the yield comes from
- Distinguish between rebasing (stETH) and reward-bearing (wstETH, rETH) liquid staking tokens
- Evaluate liquid staking protocol risks: smart contract, slashing, depeg
- Understand the centralization concerns around Lido's market dominance

---

## 2. Conceptual Explanation

### 2.1 — Why Stablecoins Matter

Stablecoins are the unit of account and medium of exchange of DeFi. Without them, every position would be priced in volatile assets, making lending, LP, and yield strategies far more complex. They serve as the "dollar" of on-chain finance.

But stablecoins are not all equal. They sit on a spectrum from "highly centralized but deeply liquid" to "highly decentralized but fragile." Understanding where each stablecoin sits on this spectrum is prerequisite knowledge for every DeFi strategy.

### 2.2 — Why Liquid Staking Matters

ETH staking yield (~3–4%) is the closest thing DeFi has to a "risk-free rate." It comes from Ethereum protocol issuance — real economic value for securing the network. Liquid staking tokens (stETH, rETH) make this yield composable — usable as collateral, LP tokens, and building blocks for more complex strategies.

---

## 3. Mechanism Deep Dive

### 3.1 — Fiat-Backed Stablecoins (USDC, USDT)

**Mechanism:** A centralized issuer (Circle for USDC, Tether for USDT) holds real-world reserves — bank deposits, US Treasury bills, commercial paper. For every token minted on-chain, $1 of reserves exists off-chain. The peg is maintained by arbitrage: if USDC trades at $0.99, arbitrageurs buy cheap USDC and redeem with Circle for $1.00. If USDC trades at $1.01, arbitrageurs mint new USDC from Circle at $1.00 and sell at $1.01.

**USDC specifics:** Issued by Circle. Reserves are ~80% short-duration US Treasuries, ~20% cash in regulated banks. Monthly attestations by Deloitte. Blocklist capability — Circle can freeze any address holding USDC. Fully regulated under US money transmitter laws.

**USDT specifics:** Issued by Tether. Reserves have historically been less transparent — significant allocation to commercial paper (reduced since 2022), secured loans, and other investments. Quarterly attestations (not full audits). Largest stablecoin by market cap (~$110B+). Dominant in emerging markets and CEX trading pairs.

**Risk profile:** Counterparty risk (issuer), regulatory risk (government seizure), banking risk (reserve banks failing), censorship risk (address freezing).

### 3.2 — CDP Stablecoins (DAI/USDS, LUSD, crvUSD)

**Mechanism:** Users deposit collateral into a smart contract and mint stablecoins against it. The stablecoin is over-collateralized — more collateral value exists than stablecoins minted. If collateral value drops, the position is liquidated.

**DAI (now USDS under Sky/Maker):** Originally ETH-backed only. Now >60% backed by USDC, real-world assets, and other centralized collateral. The Dai Savings Rate (DSR/SSR) provides yield to DAI holders — funded by stability fees borrowers pay. DAI is effectively a semi-centralized stablecoin wrapped in decentralized smart contracts.

**LUSD (Liquity V1):** Purely ETH-backed. Immutable contracts — no governance, no upgrades, no admin keys. Minimum collateral ratio: 110%. Redemption mechanism: anyone can redeem LUSD for $1 of ETH from the least-collateralized position. This creates a hard floor on the peg. The most decentralized stablecoin that has achieved meaningful scale.

**crvUSD:** Curve's stablecoin using LLAMMA (Lending-Liquidating AMM Algorithm) — a continuous soft-liquidation mechanism. Instead of a single liquidation event, crvUSD positions gradually convert between collateral and stablecoins as prices change. If ETH drops, your position slowly sells ETH for crvUSD. If ETH recovers, it buys ETH back. This reduces the violence of liquidation cascades.

### 3.3 — Delta-Neutral Synthetic Stablecoins (USDe)

**Mechanism:** Ethena's USDe is backed by a hedged position. The backing consists of staked ETH (stETH) as the long leg, and short ETH perpetual futures on centralized exchanges (Binance, OKX, Deribit) as the hedge. Net price exposure: zero (delta-neutral). Yield comes from ETH staking rewards plus perpetual funding rate payments (which are typically positive — longs pay shorts).

**When it works:** Bull markets with positive funding. During 2024, USDe offered 15–30% APY from funding alone.

**When it breaks:** Extended negative funding periods (bear markets where shorts pay longs). The reserve fund absorbs negative funding, but if it's depleted, yield goes to zero or negative. Exchange counterparty risk — if a major exchange fails (FTX scenario), the short leg is lost while spot ETH drops. stETH depeg risk compounds the exposure.

**Critical distinction:** USDe is not a stablecoin in the traditional sense. It's a structured financial product with a soft peg. The "stability" comes from the delta-neutral hedge, not from collateral redemption.

### 3.4 — Case Study: Terra/Luna Collapse (May 2022)

UST was an algorithmic stablecoin backed by LUNA. The mechanism: mint $1 of UST by burning $1 of LUNA, and vice versa. The peg was maintained by arbitrage — if UST < $1, buy cheap UST and redeem for $1 of LUNA.

**The death spiral:**
1. Large UST sell-off triggered a depeg to $0.98
2. Arbitrageurs redeemed UST for LUNA, minting new LUNA supply
3. New LUNA supply → LUNA price dropped
4. LUNA price drop → less backing for remaining UST
5. More UST sold in panic → more LUNA minted → LUNA price dropped further
6. Reflexive spiral accelerated until UST = $0 and LUNA = $0.0001
7. $40 billion destroyed in 72 hours

**Root cause:** UST was backed by its own token (endogenous collateral). The collateral's value depended on confidence in the system, which depended on the peg holding, which depended on the collateral's value. Circular backing = reflexive collapse.

**Lesson:** Any stablecoin whose backing depends on its own ecosystem token is fundamentally fragile. The question to ask: "If confidence drops 50%, does the backing also drop 50%?" If yes, it can death-spiral.

### 3.5 — Case Study: USDC Depeg (March 2023)

Circle held $3.3 billion of USDC reserves at Silicon Valley Bank. When SVB failed on March 10, 2023, those reserves were temporarily inaccessible. USDC depegged to $0.87 on DEXs.

**Cascade effects:**
- DAI (heavily backed by USDC) depegged to $0.90
- Curve 3pool became massively imbalanced (USDC flooded in, USDT/DAI drained)
- Lending protocols saw distorted collateral values
- DeFi TVL dropped $10B+ in 48 hours

**Resolution:** The FDIC backstopped all SVB deposits on March 12. USDC recovered to $1.00 within hours. Users who sold USDC at $0.87 locked in a 13% loss. Users who held recovered fully.

**Lesson:** Fiat-backed stablecoins carry traditional banking risk. Diversifying stablecoin exposure across issuer types (fiat-backed + CDP + delta-neutral) reduces single-point-of-failure risk.

### 3.6 — Liquid Staking: stETH, rETH, and the Yield Stack

**Where staking yield comes from:** Ethereum pays validators for securing the network. This payment comes from new ETH issuance (consensus rewards, ~3% APR) and priority fees from transactions. The total validator yield is currently ~3.5–4% APR. This is not lending yield, not farming yield — it's protocol-level payment for providing security. It exists as long as Ethereum exists.

**Lido (stETH / wstETH):** Largest liquid staking protocol ($32B+ TVL, ~30% of all staked ETH). You deposit ETH, receive stETH (rebasing — balance increases daily) or wstETH (wrapped, reward-bearing — price appreciates vs. ETH). Lido distributes staking to a permissioned set of professional node operators and takes a 10% fee on rewards.

**Rocket Pool (rETH):** More decentralized — anyone can run a minipool validator with 8 ETH (instead of 32). rETH is reward-bearing (price appreciates vs. ETH). Smaller TVL but stronger decentralization guarantees.

**Centralization concern:** Lido controls ~30% of staked ETH. Vitalik Buterin has publicly warned that any single entity controlling >33% of stake could theoretically prevent finality, and >50% could censor transactions. This is a systemic risk to Ethereum itself, not just to Lido users.

**LST risk profile:**
- Smart contract risk (Lido's contracts, the beacon chain deposit contract)
- Slashing risk (if a validator misbehaves, a portion of staked ETH is destroyed)
- Depeg risk (stETH traded at 0.93 ETH in June 2022 during the Luna crisis)
- Centralization/governance risk (Lido DAO controls validator set, fee structure)

---

## 4. Real-World Examples

### 4.1 — stETH Depeg (June 2022)

During the post-Luna market panic, stETH traded at a 7% discount to ETH (0.93:1). This was not a "hack" — Lido's contracts worked correctly. It was a liquidity crisis: holders wanted to exit stETH for ETH, but the only exit was through Curve's stETH/ETH pool. Massive sell pressure overwhelmed the pool's liquidity.

Anyone with a leveraged stETH/ETH loop on Aave faced liquidation as their collateral (stETH) lost value relative to their debt (ETH). Multiple positions were liquidated, creating additional stETH sell pressure and deepening the depeg.

The peg eventually recovered after Shanghai/Shapella enabled ETH withdrawals from the beacon chain (April 2023), creating a hard redemption mechanism.

---

## 5. Security Considerations

**Stablecoin diversification is mandatory.** Never hold >50% of stablecoin exposure in a single stablecoin. Blend fiat-backed (USDC) with over-collateralized (DAI/LUSD) to hedge against different failure modes.

**LST depeg risk compounds with leverage.** At 2x leverage on a stETH/ETH loop, a 5% depeg costs you 10% of collateral value. At 3x leverage, the same depeg can trigger liquidation.

**Redemption mechanisms matter.** Can you redeem the stablecoin or LST for its underlying at face value? USDC: yes (through Circle). stETH: yes (through Lido withdrawal queue). USDe: through Ethena's redemption contract. USDT: technically yes, but minimum $100k and Tether can refuse.

---

## 6. Practical Exercise

### Exercise 6.1 — Stablecoin Risk Matrix

Create a comparison table for USDC, USDT, DAI, LUSD, and USDe. For each, fill in: backing type, centralization level, depeg mechanism, censorship risk, oracle dependency, and worst-case scenario.

### Exercise 6.2 — Calculate stETH vs. ETH Performance

Starting with 10 ETH at $3,000. Compare holding 10 ETH vs. 10 stETH over 12 months at 3.5% staking APR. Calculate: value at $5,000 ETH, value at $2,000 ETH, and the crossover point where staking yield compensates for a hypothetical 3% depeg.

### Exercise 6.3 — Monitor the Peg

Track USDC/USDT, stETH/ETH, and DAI/USDC exchange rates on DeFiLlama for one week. Record any deviations >0.1%. Investigate the cause of any observed deviation.

---

## 7. AI Tutor Q&A Examples

**Q: Is USDC safe after the SVB incident?**

A: Safer than before, because Circle reduced bank exposure and shifted reserves toward US Treasuries. But the SVB incident revealed a structural reality: fiat-backed stablecoins inherit the risks of the banking system. No fiat-backed stablecoin is "safe" in an absolute sense — they're safe relative to other options. The risk is not zero; it's low and specific (banking partner failure, regulatory action). Diversifying across stablecoin types remains the best defense.

**Q: Why doesn't everyone just use LUSD if it's the most decentralized?**

A: LUSD has tradeoffs. Its immutable contracts mean it cannot adapt to new conditions. Its ETH-only collateral limits its scale. Its 110% minimum collateral ratio means high capital costs for minters. And its smaller market cap means thinner liquidity on DEXs, leading to higher price impact for large swaps. Decentralization is a valuable property, but it's one factor among many — liquidity, yield, composability, and capital efficiency all matter for practical DeFi operations.

---

## 8. Key Takeaways

1. **Stablecoins sit on a centralization-decentralization spectrum.** USDC is most liquid but centralized and censorable. LUSD is most decentralized but limited in scale. Every choice is a tradeoff.

2. **Algorithmic stablecoins with endogenous collateral can death-spiral.** Terra proved this at $40B scale. Any stablecoin backed by its own ecosystem token carries reflexive collapse risk.

3. **ETH staking yield is the closest thing to a risk-free rate in DeFi.** ~3.5% APR, paid by the Ethereum protocol for network security. It's the foundation of the DeFi yield stack.

4. **Liquid staking tokens (stETH, rETH) make staking yield composable.** They can be used as collateral, LP tokens, and yield strategy building blocks — but they add smart contract risk and depeg risk.

5. **stETH depeg risk is real and compounds with leverage.** The June 2022 depeg to 0.93 would have liquidated most 3x leverage loops. Size leverage conservatively and set depeg monitoring alerts.

6. **Diversification across stablecoin types is a core risk management practice.** Fiat-backed + CDP-backed + understanding each failure mode is the minimum standard.

---

| ← Module 5: Lending Systems | **Module 6: Stablecoins & Liquid Staking** | Module 7: Yield Strategies → |
