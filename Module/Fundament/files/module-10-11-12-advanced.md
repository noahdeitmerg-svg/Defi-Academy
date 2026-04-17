# Module 10 — veTokenomics

## Governance Power, Liquidity Wars, and the Economics of Vote-Locking

---

## 1. Learning Objectives

- Explain the vote-escrow (ve) model and why it aligns long-term incentives
- Describe the Curve Wars: veCRV → Convex → Votium bribe markets
- Understand gauge systems and how they direct liquidity incentives
- Analyze ve(3,3) models (Velodrome, Aerodrome) and their improvements
- Evaluate governance power as an economic asset

---

## 2. Mechanism Deep Dive

### 2.1 — The ve Model

Vote-escrow tokenomics require users to **lock** governance tokens for a duration to receive voting power and enhanced rewards. The longer you lock, the more power you receive.

**CRV → veCRV:**
- Lock CRV tokens for 1 week to 4 years
- 4-year lock: 1 CRV = 1 veCRV (maximum voting power)
- 1-year lock: 1 CRV = 0.25 veCRV
- veCRV is non-transferable — you cannot sell or trade it
- Voting power decays linearly toward zero as the lock expiration approaches

**What veCRV gives you:**
- Boosted CRV rewards (up to 2.5x) on your LP positions
- Voting rights on gauge weights (directing CRV emissions to specific pools)
- Share of protocol trading fees (50% of all Curve fees go to veCRV holders)

### 2.2 — The Curve Wars

The gauge system creates a market for liquidity direction. Protocols want their pools to receive CRV emissions (because it attracts liquidity). To get emissions, they need veCRV voting power directed to their gauge.

**The stack:**
1. **Curve** — the AMM with CRV emissions
2. **Convex** — aggregates veCRV. Users deposit CRV into Convex and receive cvxCRV. Convex votes as a bloc, controlling ~half of all veCRV
3. **Votium** — a bribe marketplace where protocols pay Convex token holders (vlCVX) to vote for their gauges

**Economics:** A protocol might pay $0.50 in bribes per $1 of CRV emissions directed to their pool. This is a 2:1 ROI on bribe spending — which is why the Curve Wars attract billions in capital.

### 2.3 — ve(3,3) Evolution

Velodrome (Optimism) and Aerodrome (Base) improved the ve model by making vote-locked positions tradeable as NFTs (eliminating the illiquidity problem) and directing 100% of trading fees to voters of that pool's gauge (creating a direct economic loop: vote for a pool → earn that pool's fees).

---

## 3. Security Considerations

- **Governance concentration:** If one entity controls enough voting power, they can direct emissions to their own pools, creating a self-enriching cycle
- **Bribe market manipulation:** Protocols can inflate bribe value through wash trading or coordinated voting
- **Lock risk:** 4-year veCRV locks mean your capital is illiquid for the entire period. Token price can collapse while you're locked.

---

## 4. Practical Exercise

Check the Curve gauge weight votes on curve.fi. Identify: which pools receive the most CRV emissions? Check Votium bribes — how much are protocols paying per vote? Calculate the implied ROI of bribe spending.

---

## 5. Key Takeaways

1. **veTokenomics align incentives by requiring long-term commitment** for governance power and enhanced rewards.
2. **The Curve Wars demonstrated that governance power has direct economic value** — votes direct liquidity incentives worth billions.
3. **Convex proved that governance aggregation is a powerful business model** — controlling half of veCRV makes Convex a kingmaker in DeFi liquidity.
4. **ve(3,3) models solved the illiquidity problem** by making locked positions tradeable as NFTs.

---

| ← Module 9: Flash Loans | **Module 10: veTokenomics** | Module 11: Restaking → |

---
---
---

# Module 11 — Restaking

## Extending Ethereum's Security to New Services

---

## 1. Learning Objectives

- Explain what restaking is and the economic logic behind it
- Describe EigenLayer's architecture: operators, AVSs, delegators
- Understand Liquid Restaking Tokens (LRTs) and their role in DeFi
- Analyze the risks: cascading slashing, LRT depeg, systemic concentration
- Compare EigenLayer, Symbiotic, and Karak

---

## 2. Mechanism Deep Dive

### 2.1 — The Core Idea

Ethereum validators stake ETH to secure the network. Restaking lets those same validators opt-in to secure additional services (called AVSs — Actively Validated Services) using the same staked ETH. In return, validators earn additional yield from these services.

**Think of it this way:** A security guard at a bank earns a salary. Restaking is like that guard also watching the jewelry store next door during their shift — earning extra pay, but taking on additional responsibility and risk.

### 2.2 — EigenLayer Architecture

**Restakers/Delegators** deposit ETH or LSTs (stETH, rETH) into EigenLayer. They choose operators to delegate to.

**Operators** run the validation software for various AVSs. They stake their reputation and their delegators' capital.

**AVSs (Actively Validated Services)** are applications that need decentralized validation: oracle networks, data availability layers, bridges, keeper networks. They pay operators for security services.

**Slashing:** If an operator misbehaves while validating an AVS, a portion of the restaked ETH can be slashed — both the operator's own stake and delegated stake. This is the additional risk restakers accept in exchange for additional yield.

### 2.3 — Liquid Restaking Tokens (LRTs)

Just as stETH wraps staked ETH into a liquid token, LRTs (EtherFi's eETH, Renzo's ezETH, Kelp's rsETH) wrap restaked ETH. You deposit ETH into an LRT protocol, it restakes on EigenLayer, and you receive a liquid token representing your restaked position. This LRT can then be used in DeFi — as collateral on Aave, as LP in pools, etc.

**The yield stack:** ETH base staking (~3.5%) + AVS rewards (~1–5%) + points/airdrops = potentially 5–10%+ yield on ETH.

### 2.4 — Risks

**Cascading slashing:** If an operator is slashed across multiple AVSs simultaneously, losses compound. The same ETH secures multiple services, so a single operator failure can trigger losses across all delegators.

**LRT depeg:** Under stress, LRTs can trade below their ETH value (similar to stETH in June 2022). If LRTs are used as collateral in leveraged positions, depegs trigger liquidations.

**Systemic concentration:** EigenLayer holds $18B+ TVL (93.9% market share). A critical bug in EigenLayer's contracts would affect the entire restaking ecosystem.

**AVS risk assessment:** Not all AVSs are equal. Restakers must evaluate which AVSs their operator validates and the slashing conditions of each.

---

## 3. Practical Exercise

Check EigenLayer's dashboard. Identify: total TVL, number of operators, number of AVSs. Find one LRT (eETH or ezETH) and check its peg vs. ETH on DeFiLlama. Evaluate: how much additional yield does restaking currently provide over plain ETH staking?

---

## 4. Key Takeaways

1. **Restaking extends Ethereum's economic security to new services** — creating additional yield for validators and security for applications.
2. **The risk tradeoff is real:** additional yield comes from additional slashing exposure across potentially many AVSs.
3. **LRTs make restaking composable but add another layer of smart contract and depeg risk.**
4. **EigenLayer's dominance is a systemic concentration risk** — evaluate exposure carefully.

---

| ← Module 10: veTokenomics | **Module 11: Restaking** | Module 12: Cross-chain Infrastructure → |

---
---
---

# Module 12 — Cross-Chain Infrastructure

## Bridges, Messaging, and the Multi-Chain Reality

---

## 1. Learning Objectives

- Explain why cross-chain infrastructure is necessary and how bridges work
- Classify bridge types: lock-and-mint, burn-and-mint, liquidity networks, message passing
- Analyze historical bridge exploits ($2B+ stolen)
- Understand LayerZero, Chainlink CCIP, and Axelar's messaging protocols
- Evaluate bridge security models and choose the safest option for capital movement

---

## 2. Mechanism Deep Dive

### 2.1 — Bridge Types

**Lock-and-Mint:** Lock ETH on Chain A → Mint wrapped ETH on Chain B. The wrapped token is backed 1:1 by locked assets on the origin chain. Risk: if the bridge contract on Chain A is exploited, all wrapped tokens on Chain B become worthless.

**Burn-and-Mint:** Native token support where tokens are burned on the origin chain and minted on the destination. Used by USDC's Cross-Chain Transfer Protocol (CCTP). Safer because Circle directly controls the mint/burn process.

**Liquidity Networks (Across, Stargate):** LPs provide liquidity on both chains. Instead of lock-and-mint, the bridge facilitates a swap between native assets on each chain. No wrapped tokens — you receive the native asset. Risk is LP counterparty risk rather than bridge contract risk.

**Message Passing (LayerZero, CCIP):** General-purpose cross-chain communication, not just token transfers. A contract on Chain A can call a function on Chain B. This enables cross-chain lending, cross-chain governance, and complex multi-chain DeFi operations.

### 2.2 — Historical Bridge Exploits

| Bridge | Date | Amount | Cause |
|--------|------|--------|-------|
| Ronin | Mar 2022 | $625M | Compromised validator keys (5 of 9 multisig) |
| Wormhole | Feb 2022 | $320M | Signature verification bypass |
| Nomad | Aug 2022 | $190M | Initialization bug allowed anyone to drain |
| Multichain | Jul 2023 | $130M | CEO arrested, private keys compromised |

**Pattern:** Most bridge exploits target the validation mechanism — the system that confirms cross-chain messages are legitimate. Whether it's compromised keys, signature bypasses, or verification bugs, the attack vector is almost always: forge a message that says "transfer $X from Chain A to Chain B" without actually depositing on Chain A.

### 2.3 — Security Hierarchy

1. **Native bridges** (Arbitrum/Optimism canonical bridges) — secured by the rollup's full security model. Slowest (7-day withdrawal) but safest.
2. **Circle CCTP** — for USDC transfers, the safest option because Circle controls both mint and burn.
3. **Chainlink CCIP** — enterprise-grade, actively validated network, used by Aave and major institutions.
4. **Third-party bridges** — varying security models. Evaluate validator set, key management, and track record.

---

## 3. Security Considerations

- **Never hold significant capital in bridged (wrapped) tokens longer than necessary.** Convert to native assets.
- **Prefer native bridges for large transfers** even though they're slower.
- **Check bridge TVL and validator set** before using a third-party bridge.
- **Diversify bridge usage** — don't route all cross-chain activity through one bridge.

---

## 4. Practical Exercise

### Exercise 12.1 — Bridge Comparison
Bridge 0.01 ETH from Ethereum Sepolia to Arbitrum Sepolia using the native bridge. Note: time to finality, cost, and user experience. Compare with a third-party bridge (if available on testnet).

### Exercise 12.2 — Bridge Security Audit
For three bridges (Arbitrum native, Stargate, LayerZero), evaluate: validator/verification mechanism, historical exploits, TVL, upgrade authority (who can modify the contracts).

---

## 5. Key Takeaways

1. **Bridges are DeFi's weakest security link.** $2B+ in historical exploits. The validation mechanism is almost always the attack vector.
2. **Use native bridges for large transfers, third-party bridges for convenience on small amounts.**
3. **Every bridged asset carries the bridge's security assumptions.** wETH on Arbitrum via the native bridge is safer than wETH via a third-party bridge.
4. **Cross-chain messaging (LayerZero, CCIP) enables complex multi-chain DeFi** but adds dependency risk to every protocol that uses it.

---

| ← Module 11: Restaking | **Module 12: Cross-chain Infrastructure** | Module 13: On-chain Data Analysis → |
