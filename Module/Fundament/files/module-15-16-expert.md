# Module 15 — Protocol Analysis

## How to Evaluate Any DeFi Protocol Like a Professional Researcher

---

## 1. Learning Objectives

- Apply a systematic framework for evaluating any DeFi protocol
- Analyze tokenomics: supply mechanics, value accrual, emission schedules, and red flags
- Evaluate governance structures and centralization risk
- Assess smart contract security indicators beyond "it's been audited"
- Understand DeFi regulation basics: MiCA, SEC approach, tax implications
- Conduct due diligence that justifies deploying real capital

---

## 2. Mechanism Deep Dive

### 2.1 — The Protocol Evaluation Matrix

Score each factor 1–5. Minimum to deploy capital: 20/30.

**1. Yield Source (where does the money come from?)**
- 5: Revenue from genuine economic activity (trading fees, borrow interest)
- 3: Mix of revenue and token emissions
- 1: Entirely token emissions or unclear source

**2. Smart Contract Security**
- 5: Multiple top-tier audits, 2+ years live with $500M+ TVL, large bug bounty, immutable or timelocked
- 3: One audit, 6–12 months live, moderate TVL
- 1: No audit, recently deployed, or previous exploit

**3. Oracle System**
- 5: Chainlink with fallback, multiple data sources, heartbeat guarantees
- 3: Single Chainlink feed, no fallback
- 1: Custom on-chain TWAP, no external oracle, or unknown source

**4. Liquidity & Exit**
- 5: Exit at $100k+ with <0.5% slippage, multiple exit paths
- 3: Exit at $10k with <1% slippage
- 1: Lock-up periods, thin liquidity, or single exit path

**5. Governance & Admin**
- 5: DAO with timelock (48h+), diverse token distribution, no admin keys
- 3: Multisig (3/5+), reasonable timelock, moderate concentration
- 1: Single EOA admin, no timelock, upgradeable without delay

**6. Track Record**
- 5: Survived multiple market stress events (2022 crash, USDC depeg), transparent incident response
- 3: 1+ year live without major incident, but untested under extreme stress
- 1: <6 months live, or previous incident with poor response

### 2.2 — Tokenomics Analysis Framework

**Supply Mechanics:**
- What is the total supply? Circulating supply? Fully diluted valuation (FDV)?
- What is the emission schedule? How much new supply enters circulation each month?
- Is there a burn mechanism? Does it meaningfully offset inflation?
- FDV/Market Cap ratio: if >5x, massive dilution is coming as vested tokens unlock

**Value Accrual:**
- Does the token capture protocol revenue? (Fee sharing, buyback-and-burn, staking rewards)
- Or is it purely governance with no economic value accrual?
- Tokens that capture revenue (CRV → veCRV fee sharing, GMX → staking yields) have fundamental value
- Tokens that only provide governance rights rely entirely on speculative premium

**Red Flags:**
- Team allocation >25% with short vesting (<1 year cliff)
- Large VC allocations with upcoming unlocks
- Recursive tokenomics (token backs itself, à la Luna/UST)
- No revenue, only emissions-based yield
- Insider-controlled governance (top 5 wallets hold >50% of voting power)

### 2.3 — Governance Deep Dive

**Check Snapshot/Tally** for the protocol's governance history:
- How often do proposals pass? With what quorum?
- Who are the top voters? Are they the team, a VC, or the community?
- Has any controversial proposal been pushed through? (See Compound Proposal 289)
- What parameters can governance change? (LTV, rates, supported collateral, fee switches)

**Upgrade Authority:**
- Check the protocol's proxy admin on Etherscan
- Is there a timelock? How long? (48h minimum for serious protocols)
- Who controls the timelock? Multisig? DAO vote?
- Can an emergency "guardian" bypass the timelock? Under what conditions?

### 2.4 — DeFi Regulation Basics

**EU (MiCA — effective December 2024):** Comprehensive crypto regulation framework. Stablecoin issuers must hold reserves in EU banks. Crypto service providers need licensing. DeFi protocols are currently exempt if "fully decentralized" — but the definition is being debated.

**US:** Fragmented approach. The SEC treats some tokens as securities. CFTC claims jurisdiction over derivatives. Trump administration repealed DeFi broker reporting rules (April 2025). The GENIUS Act (July 2025) created a federal stablecoin framework. Regulatory clarity is improving but still uncertain.

**Tax implications:** In most jurisdictions, every DeFi transaction is a taxable event — swaps, LP entry/exit, claiming rewards, borrowing (in some interpretations). Keep records. Use portfolio tracking tools (DeBank export, Koinly) for tax reporting.

---

## 3. Practical Exercise

### Exercise 15.1 — Full Protocol Evaluation
Choose a protocol you've never used. Apply the full evaluation matrix. Score each category. Write a 1-page analysis: would you deploy capital? Why or why not? What's the maximum allocation?

### Exercise 15.2 — Tokenomics Teardown
For one protocol's governance token, analyze: total supply, circulating supply, FDV, emission schedule, value accrual mechanism, and top holder distribution. Identify: is this token fundamentally valued or purely speculative?

### Exercise 15.3 — Governance Forensics
Read the last 5 governance proposals on Snapshot or Tally for Aave or Compound. For each: what was proposed, who voted, what was the outcome, and how does it affect depositors?

---

## 4. Key Takeaways

1. **A systematic evaluation framework prevents emotional capital deployment.** Score every protocol before depositing. No score, no capital.
2. **Tokenomics determines long-term viability.** Revenue-capturing tokens with controlled emissions have fundamental value. Governance-only tokens with high emissions are inflation machines.
3. **Governance is a real risk vector.** The Compound Proposal 289 incident proved that governance power can be weaponized. Monitor governance activity in every protocol you're deployed in.
4. **Regulation is converging toward DeFi.** MiCA, SEC activity, and tax enforcement all affect DeFi users. Understanding the regulatory environment is now an operational requirement.

---

| ← Module 14: Composability Risk | **Module 15: Protocol Analysis** | Module 16: Portfolio Construction → |

---
---
---

# Module 16 — Portfolio Construction

## Designing, Sizing, and Managing a Professional DeFi Portfolio

---

## 1. Learning Objectives

- Design a diversified DeFi portfolio across risk levels
- Apply position sizing rules based on risk assessment
- Define allocation logic for ETH staking, lending, LP, and stablecoin strategies
- Implement a monitoring and rebalancing workflow
- Understand benchmark comparison and honest PnL accounting

---

## 2. Mechanism Deep Dive

### 2.1 — Portfolio Architecture

A professional DeFi portfolio has three tiers:

**Tier 1 — Foundation (40–50% of DeFi capital)**
Low risk, high liquidity, set-and-monitor.
- ETH staking via stETH/wstETH/rETH: 3.5% base yield, liquid, minimal management
- sDAI or Aave USDC supply: 3–5% yield, stablecoin exposure, instant exit
- Purpose: capital preservation + baseline yield

**Tier 2 — Active Yield (30–40%)**
Medium risk, requires weekly monitoring.
- ETH staking leverage loop (2–2.5x): 5–7% yield, weekly HF monitoring
- Lending carry trade: 3–5% net spread, borrow rate monitoring
- Concentrated LP on major pairs (ETH/USDC): 15–30% gross, managed ranges
- Purpose: yield enhancement above the baseline

**Tier 3 — Opportunistic (10–20%)**
Higher risk, time-limited, active management.
- Airdrop farming across 2–3 protocols
- New protocol incentive programs
- Short-duration Pendle YT positions
- Purpose: asymmetric opportunities with capped downside

### 2.2 — Example Portfolio ($100,000 DeFi Allocation)

| Position | Allocation | Expected Yield | Risk Level | Monitoring |
|----------|-----------|---------------|------------|------------|
| wstETH (hold) | $25,000 | 3.5% | Low | Monthly |
| Aave USDC supply | $15,000 | 4.0% | Low | Monthly |
| wstETH/ETH loop 2x (Aave) | $20,000 | 6.0% | Medium | Weekly |
| Pendle sDAI PT (6-mo) | $15,000 | 6.5% | Medium | At maturity |
| Uniswap V3 ETH/USDC LP | $10,000 | 20% gross | Medium-High | Daily range check |
| Airdrop farming (2 protocols) | $10,000 | Unknown | High | Weekly |
| Cash reserve (stablecoins) | $5,000 | 0% | None | Emergency buffer |

**Weighted expected yield:** ~6.5% blended (excluding airdrop upside)
**Maximum single-protocol exposure:** 20% (Aave)

### 2.3 — Position Sizing Rules

1. **Maximum 20% in any single protocol.** An exploit means losing at most 20% of DeFi capital.
2. **Maximum 10% in any single strategy.** Strategy failure (LP going out of range, leverage liquidation) costs at most 10%.
3. **Minimum 5% in stablecoin reserves.** Always have dry powder for emergencies (adding collateral, exploiting dislocations).
4. **Total DeFi allocation must be a defined % of net worth.** If your net worth is $500,000, a $100,000 DeFi allocation (20%) means a total DeFi wipeout costs 20% of your wealth — painful but survivable.
5. **Never allocate money you cannot afford to lose entirely.** Smart contract risk is real. Treat DeFi capital as risk capital.

### 2.4 — Monitoring Workflow

**Daily (10 min):** Check DeBank portfolio dashboard. Scan health factors. Check LP range status. Glance at DeFi Twitter for incidents.

**Weekly (45 min):** Update position tracking spreadsheet. Calculate net PnL per position. Review health factors vs. liquidation prices. Check governance proposals. Evaluate: continue, adjust, or exit each position.

**Monthly (90 min):** Full portfolio review. Compare total DeFi return vs. benchmarks (ETH buy-and-hold, S&P 500). Revoke stale token approvals. Reassess protocol risk scores. Decide allocation changes for next month.

**Quarterly (2 hours):** Strategic review. Is DeFi participation adding value above passive strategies? Are your skills improving? What lessons did you learn? Adjust tier allocations based on changing market conditions and personal risk tolerance.

### 2.5 — Benchmark Comparison: Honesty Check

The most important question every quarter: **Would I have been better off just holding ETH?**

Calculate: total DeFi portfolio value including all yields, fees, IL, gas costs, and unrealized gains/losses. Compare against: holding the same initial capital allocation in ETH, or in ETH + stablecoins at your initial ratio.

If your active DeFi management underperforms simple holding for two consecutive quarters, either improve your strategy selection and execution, or scale back to Tier 1 only (staking + simple lending) and stop active management.

Being honest about net returns — after ALL costs — is the single most important habit that separates professional operators from retail participants who confuse activity with alpha.

### 2.6 — Risk Scenarios and Portfolio Stress Test

**Scenario 1: ETH drops 40% in 48 hours**
- Tier 1 (stETH, sDAI): No liquidation risk. stETH position loses 40% in USD terms, sDAI unaffected.
- Tier 2 (leverage loop): HF drops. At 2x leverage, a 40% ETH drop doesn't liquidate if the wstETH/ETH peg holds (same-asset exposure). But if stETH depegs simultaneously by 5%, HF could breach 1.0.
- Tier 2 (ETH/USDC LP): Significant IL (~20%). Position heavily ETH-weighted.
- Action: Monitor leverage loop HF. Consider exiting LP. Deploy stablecoin reserve to add collateral if needed.

**Scenario 2: Major lending protocol exploit**
- If Aave exploited: lose up to 35% of portfolio (USDC supply + leverage loop)
- If non-Aave protocol exploited: no direct loss, but potential contagion through stablecoin depegs or liquidity crises
- Action: This is why the 20% per-protocol cap matters. Even losing Aave exposure entirely leaves 65% intact.

**Scenario 3: Stablecoin depeg**
- USDC depegs: affects Aave supply (15%), potentially Pendle PT (if sDAI uses USDC), and LP positions
- Action: Do NOT panic-sell at the bottom. USDC depegs have historically recovered. If holding, wait. If deployed in LP, the pool absorbs the loss automatically.

---

## 3. Practical Exercise

### Exercise 16.1 — Design Your Portfolio
Given your actual capital situation, design a DeFi portfolio using the three-tier framework. Specify: positions, allocations, expected yields, monitoring frequency, and exit triggers for each position.

### Exercise 16.2 — Build Your Tracking Sheet
Create a spreadsheet (or Notion table) with columns: Protocol, Chain, Strategy, Capital, Entry Date, Health Factor, Gross APY, Net PnL, Exit Trigger, Notes. Populate it with your actual or planned positions.

### Exercise 16.3 — Stress Test
Apply the three scenarios above to your portfolio. For each: what happens to each position? What action would you take? What's the worst-case portfolio loss?

### Exercise 16.4 — Quarterly Review Template
Create a template for your quarterly review including: total PnL, benchmark comparison, protocol risk re-assessment, allocation changes, lessons learned.

---

## 4. AI Tutor Q&A Examples

**Q: My portfolio is only $5,000. Is it worth doing DeFi?**

A: At $5,000, gas costs on Ethereum L1 will eat your returns. But L2s (Arbitrum, Base) make it viable. Focus on simple strategies in Tier 1: wstETH for staking yield, and Aave USDC supply on Arbitrum. Skip leverage loops (the gas costs for setup/teardown erode returns at small scale) and skip concentrated LP (the monitoring time isn't worth it for small positions). At $5,000, your goal is learning — deploying real capital to understand mechanics — not maximizing yield. The tuition is the experience.

**Q: How often should I rebalance?**

A: The research is clear: frequent rebalancing in DeFi is usually harmful because it incurs gas costs and crystallizes IL. For Tier 1 positions, rebalance quarterly or when allocations drift >10% from target. For Tier 2, adjust weekly only if exit triggers are hit. For LP positions, rebalance the range only when price has been outside your range for >24 hours. The default action should be "do nothing" — most interventions subtract value.

---

## 5. Key Takeaways

1. **Structure beats conviction.** A diversified three-tier portfolio with position sizing rules outperforms concentrated bets over time.

2. **The 20% protocol cap and 10% strategy cap limit catastrophic loss.** No single failure can destroy your portfolio.

3. **Track net returns honestly.** Gross APY is not your return. Your return is: yield − IL − gas − opportunity cost − time value. Compare against simply holding ETH quarterly.

4. **Monitoring frequency should match risk level.** Tier 1 monthly, Tier 2 weekly, Tier 3 daily. Don't over-monitor Tier 1 (wastes time) or under-monitor Tier 3 (risks losses).

5. **Set exit triggers at entry, not during crisis.** Emotional exits during panics crystallize losses. Pre-defined triggers executed mechanically outperform reactive decisions.

6. **DeFi capital is risk capital.** Only deploy what you can afford to lose entirely. Smart contract risk, governance attacks, and systemic cascades can cause total loss of deposited funds.

---

| ← Module 15: Protocol Analysis | **Module 16: Portfolio Construction** | Course Complete |

---

*Congratulations on completing the DeFi Academy. You now have the knowledge framework to evaluate protocols, understand systemic risks, design strategies, and operate like a DeFi researcher rather than a retail user. The real learning begins when you deploy capital — start small, track everything, be honest about results, and never stop asking: "Where does the yield come from?"*
