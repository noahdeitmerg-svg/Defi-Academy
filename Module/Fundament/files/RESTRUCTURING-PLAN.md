# DeFi Academy — Multi-Format Restructuring Plan

## Transforming 18 Modules Into a Lesson-Based Curriculum for Text, Slides, and Video

**Status:** Structural plan only — full lesson content to be produced after approval
**Target:** Preserve all existing depth; add new required topics; restructure for video-first consumption
**Total modules:** 18 (per approved revision plan)
**Total lessons:** ~149 (across all modules)
**Estimated total video runtime:** 25–28 hours

---

## 1. TRANSFORMATION LOGIC

The current curriculum is organized module-level. Each module is one long Markdown document. This works for text consumption but doesn't naturally segment into video-length units.

The revised architecture introduces a **Lesson** layer between Module and content. Each module contains 6–10 lessons. Each lesson is a self-contained learning unit corresponding to one 5–15 minute video, one slide deck, and one written lesson.

### Hierarchy

```
TIER (Foundation / Core / Advanced / Expert)
  └── MODULE (18 total)
      └── LESSON (6–10 per module, ~149 total)
          ├── Section 1: Full Written Explanation  (for website)
          ├── Section 2: Slide Summary             (for presentations)
          ├── Section 3: Voice Narration Script    (for video)
          ├── Section 4: Visual Suggestions        (for video + slides)
          └── Section 5: Practical Exercise        (if applicable)
```

### Why This Structure Works

**Text consumption:** Students read the Full Written Explanation on the website. All depth preserved. Lessons can be read in sequence or referenced individually.

**Slide presentations:** The Slide Summary extracts the 3–5 key points per lesson — concept, mechanism, formula, insight. Perfect for a 4–6 slide deck per lesson.

**Video lessons:** The Voice Narration Script is conversational, matched in length to the 5–15 minute target. The Visual Suggestions specify what appears on screen. Together they produce a complete video specification.

**Critical principle:** The Full Written Explanation contains all depth. The Voice Narration is a *simplified, conversational version* of the same content — not a separate teaching unit. Slides extract the skeleton. This keeps all three formats aligned and prevents content drift.

---

## 2. LESSON FORMAT SPECIFICATION

Every lesson follows this exact structure.

### Section 1: Full Written Explanation (800–2,500 words)

The complete teaching text. Contains all depth, all math, all examples. This is the primary artifact — slides and voice scripts derive from it.

**Requirements:**
- Opens with a one-sentence framing of what the student will understand
- Explains the mechanism fully with numbers where applicable
- Includes at least one concrete example
- Ends with a "Why this matters" paragraph

### Section 2: Slide Summary (3–6 slides worth of bullets)

Condensed skeleton for a presentation deck.

**Structure per slide:** slide title, 3–5 bullet points, one formula/mechanism if applicable, one key insight.

**Rule:** Slides are scannable, not complete. They prompt — they do not replace the explanation.

### Section 3: Voice Narration Script (500–1,500 words)

Conversational version of the Full Explanation, sized for 5–15 minutes of speech at ~150 words per minute.

**Requirements:**
- Spoken language: contractions, shorter sentences, natural rhythm
- Technical terms introduced and explained before use
- Pauses and transitions marked for pacing
- Direct second-person address ("you'll see that...", "here's what happens...")
- No Markdown formatting in the script itself
- Ends with a closing line bridging to the next lesson

**Critical:** Simplification means reducing formality, not reducing correctness.

### Section 4: Visual Suggestions

Specification of what appears on screen during narration, in chronological order.

**Categories:**
- **Diagrams:** Custom illustrations (e.g., "Flow diagram: transaction from mempool to finality")
- **Screenshots:** Specific dashboards to capture (e.g., "DeFiLlama total TVL chart, 1-year view")
- **Charts:** Data visualizations
- **Code/Terminal:** Text on screen for technical lessons
- **Protocol UIs:** Application interfaces to show

### Section 5: Practical Exercise (optional but encouraged)

Not every lesson needs one — but every module contains several.

**Format:** Goal (one sentence), numbered steps, deliverable (concrete artifact), estimated time.

---

## 3. EXAMPLE LESSON (worked sample)

To illustrate the format, here is how ONE concept from Module 5 would be restructured. This is a **sample only** — not the full content.

### Module 5, Lesson 5.4 — Health Factor & Liquidation Triggers

**Target length:** 8 minutes video / ~1,200-word narration / ~1,800-word written

#### Section 1: Full Written Explanation
[Full prose treatment preserving all depth from existing Module 5 section 3.2 — LTV, liquidation threshold, health factor formula, worked numerical example with ETH collateral and USDC debt, scenarios at different price levels, HF-below-1 consequences, connection to real-time liquidation bots.]

#### Section 2: Slide Summary

**Slide 1 — Title: "Health Factor — Your Liquidation Threshold"**
- Why: The single most important number in leveraged DeFi
- What we'll cover: LTV, liquidation threshold, HF formula, worked example

**Slide 2 — The Three Key Numbers**
- LTV = Loan-to-Value ratio (max borrow at entry)
- Liquidation Threshold = the wall (always higher than LTV)
- Health Factor = real-time distance from that wall

**Slide 3 — The Formula**
- Health Factor = (Collateral Value × Liquidation Threshold) / Total Debt
- HF > 1: safe
- HF = 1: at the wall
- HF < 1: being liquidated right now

**Slide 4 — Worked Example**
- Deposit: 5 ETH at $3,000 = $15,000
- Borrow: $10,000 USDC
- Liquidation threshold: 85%
- HF = (15,000 × 0.85) / 10,000 = **1.275**

**Slide 5 — At What Price Do You Get Liquidated?**
- ETH drops 20% → HF = 1.02 (danger)
- ETH drops 25% → HF = 0.956 (liquidated)
- Liquidation price ≈ $2,352 per ETH

**Slide 6 — Practitioner Rules**
- Never HF < 1.5 in normal conditions
- Set alerts at HF 1.8 (warning) and HF 1.5 (act)
- Calculate liquidation price before every leveraged position

#### Section 3: Voice Narration Script (excerpt)

"Every leveraged DeFi position lives or dies by one number: the health factor. If you understand nothing else about lending protocols, understand this. Get it right, and your positions survive market chaos. Get it wrong, and bots will liquidate you before you've finished reading the news.

Let's break it down.

There are three numbers you need to keep straight. The first is LTV — loan-to-value. This is the maximum you can borrow against your collateral at the moment you open the position. If ETH has 80 percent LTV on Aave, and you deposit ten thousand dollars of ETH, you can borrow up to eight thousand dollars.

But LTV is only the entry number. Once you've borrowed, you watch a different number: the liquidation threshold. It's always higher than LTV. If LTV is 80 percent, liquidation threshold might be 85 percent. That 5 percentage-point gap — that's your safety buffer at inception.

And then there's the number you check every day: the health factor...

[continues for ~1,200 words total — natural prose, numerical walkthrough, practitioner rules]

...So to recap: health factor is collateral value times liquidation threshold, divided by total debt. Above one, you're safe. Below one, you're being liquidated. In the next lesson, we'll see exactly what that liquidation process looks like — who triggers it, how fast it happens, and why it's often worse than people expect."

#### Section 4: Visual Suggestions

1. **[0:00–0:15]** Lesson title card with Module 5 branding
2. **[0:15–1:00]** Animated diagram: LTV vs. Liquidation Threshold — horizontal bar 0%–100%, LTV marker at 80%, threshold at 85%, gap labeled "safety buffer"
3. **[1:00–2:30]** On-screen equation appearing line by line: HF = (Collateral × Liquidation Threshold) / Debt
4. **[2:30–4:00]** Aave V3 dashboard screenshot, real position with HF number highlighted
5. **[4:00–6:00]** Animated example: 5 ETH at $3,000, HF updating as ETH price drops stepwise
6. **[6:00–7:00]** Liquidation price calculation displayed as formula transformation
7. **[7:00–8:00]** Summary card: "Your Rules" with three practitioner bullets

#### Section 5: Practical Exercise

**Goal:** Calculate the liquidation price for any leveraged position.
**Steps:**
1. Open Aave V3 on Sepolia testnet
2. Supply 0.1 testnet ETH as collateral
3. Borrow USDC up to 70% LTV
4. Note displayed Health Factor
5. Manually calculate the ETH price at which HF hits 1.0
6. Compare your calculation to Aave's displayed "liquidation price"

**Deliverable:** Screenshot of position + written calculation
**Estimated time:** 15 minutes

*End of sample lesson. This is the template every lesson will follow.*

---

## 4. COMPLETE LESSON MAP — ALL 18 MODULES

Duration: target ~10 min average per lesson (range 5–15).
Exercise column: ✓ = hands-on exercise included.

### FOUNDATION TIER

#### Module 1 — Blockchain Fundamentals (6 lessons, ~60 min)

| # | Lesson Title | Duration | Exercise |
|---|-------------|----------|----------|
| 1.1 | Why Blockchains Exist (the trust problem) | 8 min | — |
| 1.2 | Architecture of a Blockchain (append-only, distributed, consensus) | 10 min | — |
| 1.3 | Ethereum vs Bitcoin: Programmable Smart Contracts | 8 min | — |
| 1.4 | The Life of a Transaction (mempool → finality) | 12 min | ✓ Read a block on Etherscan |
| 1.5 | Proof of Stake and Validator Economics | 10 min | ✓ Explore beaconcha.in |
| 1.6 | Layer 2: Scaling Without Sacrificing Security | 12 min | ✓ Compare L1 vs L2 block |

#### Module 2 — Wallets & Security (9 lessons, ~90 min)

| # | Lesson Title | Duration | Exercise |
|---|-------------|----------|----------|
| 2.1 | What a Wallet Actually Is (keys → addresses) | 10 min | — |
| 2.2 | Hot Wallets vs Cold Wallets | 8 min | — |
| 2.3 | Transaction Signing Deep Dive | 10 min | — |
| 2.4 | Token Approvals — The Hidden Attack Surface | 12 min | ✓ Audit approvals on revoke.cash |
| 2.5 | MetaMask vs Rabby Setup | 10 min | ✓ Install both, import same seed |
| 2.6 | Hardware Wallet Integration | 10 min | — |
| 2.7 | Multisig Wallets (Safe) — *[NEW]* | 12 min | ✓ Deploy Safe on testnet |
| 2.8 | Seed Phrase Security Architecture | 8 min | — |
| 2.9 | Attack Patterns: Phishing, Ice Phishing, Drainers | 12 min | ✓ Transaction simulation practice |

#### Module 3 — Gas, Tokens & Etherscan (9 lessons, ~90 min)

| # | Lesson Title | Duration | Exercise |
|---|-------------|----------|----------|
| 3.1 | Why Gas Exists | 7 min | — |
| 3.2 | EIP-1559: Base Fee, Priority Fee, Max Fee | 12 min | ✓ Calculate gas costs |
| 3.3 | L2 Gas After EIP-4844 (Blobs) | 10 min | ✓ Compare L1 vs L2 costs |
| 3.4 | Token Standards: ERC-20, ERC-721, ERC-1155 | 10 min | — |
| 3.5 | ERC-20 Deep Dive: approve / transferFrom | 12 min | — |
| 3.6 | Reading Etherscan Transactions | 15 min | ✓ Decode a real DeFi tx |
| 3.7 | Contract Verification & Trust Signals | 10 min | ✓ Evaluate a token |
| 3.8 | Transaction Simulation with Tenderly — *[NEW]* | 10 min | ✓ Simulate before signing |
| 3.9 | Stuck Transactions & Gas Troubleshooting | 8 min | ✓ Unstick a testnet tx |

#### Module 4 — DEX Mechanics & AMMs (10 lessons, ~110 min)

| # | Lesson Title | Duration | Exercise |
|---|-------------|----------|----------|
| 4.1 | Why DEXs Exist: Trading Without a Middleman | 8 min | — |
| 4.2 | The Constant Product Formula (x × y = k) | 12 min | ✓ Calculate price impact |
| 4.3 | Price Impact & Liquidity Depth | 10 min | — |
| 4.4 | Concentrated Liquidity (Uniswap V3) | 12 min | — |
| 4.5 | Curve StableSwap for Correlated Assets | 10 min | — |
| 4.6 | Impermanent Loss Math | 12 min | ✓ Calculate IL at 2x, 3x, 5x |
| 4.7 | LP Profitability (Fees − IL − Gas) | 10 min | ✓ Analyze real V3 position |
| 4.8 | LVR: The Professional LP Metric — *[NEW]* | 10 min | — |
| 4.9 | Uniswap V4 Hooks — *[NEW]* | 12 min | — |
| 4.10 | DEX Aggregators & Intent-Based Trading | 14 min | ✓ Compare Uni vs CoW vs 1inch |

### CORE DEFI TIER

#### Module 5 — Lending Systems (10 lessons, ~110 min)

| # | Lesson Title | Duration | Exercise |
|---|-------------|----------|----------|
| 5.1 | Why DeFi Lending Exists (over-collateralization) | 8 min | — |
| 5.2 | The Basic Flow: Suppliers, Borrowers, Liquidators | 10 min | — |
| 5.3 | Utilization & Interest Rate Models (Kink) | 15 min | ✓ Calculate rates at utilizations |
| 5.4 | Health Factor & Liquidation Triggers | 8 min | ✓ Calculate liquidation price |
| 5.5 | The Liquidation Process Step-by-Step | 12 min | ✓ Liquidation simulation on testnet |
| 5.6 | E-Mode and Isolation Mode | 10 min | — |
| 5.7 | Morpho Blue: Isolated Lending Markets — *[expanded]* | 12 min | — |
| 5.8 | Fluid, Spark & Modern Lending Protocols — *[NEW]* | 10 min | — |
| 5.9 | Credit Lending: Maple, Goldfinch — *[NEW]* | 10 min | — |
| 5.10 | Case Studies: Euler ($197M) & Compound Prop 289 | 15 min | ✓ Walk through exploit |

#### Module 6 — Stablecoins & Liquid Staking (10 lessons, ~105 min)

| # | Lesson Title | Duration | Exercise |
|---|-------------|----------|----------|
| 6.1 | Why Stablecoins Matter | 7 min | — |
| 6.2 | Fiat-Backed: USDC, USDT | 10 min | — |
| 6.3 | CDP Stablecoins: DAI, LUSD, crvUSD | 12 min | — |
| 6.4 | Delta-Neutral Synthetics: Ethena USDe | 12 min | — |
| 6.5 | RWA-Backed Stables: Ondo, Mountain, sDAI — *[NEW]* | 10 min | — |
| 6.6 | Case Study: Terra/Luna Death Spiral | 12 min | — |
| 6.7 | Case Study: USDC Depeg March 2023 | 10 min | — |
| 6.8 | ETH Staking: Where the Yield Comes From | 10 min | — |
| 6.9 | Liquid Staking: stETH, wstETH, rETH | 12 min | ✓ Monitor stETH/ETH peg |
| 6.10 | Case Study: stETH Depeg & Leverage Cascade | 10 min | — |

#### Module 7 — Account Abstraction & Smart Wallets (7 lessons, ~75 min) *[NEW MODULE]*

| # | Lesson Title | Duration | Exercise |
|---|-------------|----------|----------|
| 7.1 | The UX Problem with EOAs | 8 min | — |
| 7.2 | ERC-4337 Architecture Overview | 12 min | — |
| 7.3 | Bundlers, Paymasters, and UserOperations | 12 min | — |
| 7.4 | Session Keys & Gas Sponsorship | 10 min | — |
| 7.5 | Social Recovery Mechanisms | 8 min | — |
| 7.6 | EIP-7702 (EOA Temporary Delegation) | 10 min | — |
| 7.7 | Smart Wallet Security Tradeoffs | 10 min | ✓ Deploy smart wallet |

#### Module 8 — Yield Strategies (9 lessons, ~115 min)

| # | Lesson Title | Duration | Exercise |
|---|-------------|----------|----------|
| 8.1 | Where Does Yield Come From? (The First Question) | 10 min | — |
| 8.2 | Strategy 1: Lending Carry Trades | 12 min | ✓ Paper-trade a carry |
| 8.3 | Strategy 2: ETH Staking Leverage Loops | 15 min | ✓ Calculate liq. depeg |
| 8.4 | Strategy 3: Concentrated Liquidity Provision | 12 min | — |
| 8.5 | Strategy 4: Delta-Neutral Funding Arbitrage | 15 min | — |
| 8.6 | **Strategy 5: Airdrop Farming** — *[NEW]* | 15 min | ✓ Build farming plan |
| 8.7 | Pendle PT/YT Strategies — *[NEW]* | 12 min | — |
| 8.8 | Vault Strategies (Yearn, Beefy, Morpho Curators) | 10 min | — |
| 8.9 | Strategy Risk Management Framework | 10 min | — |

### ADVANCED MECHANICS TIER

#### Module 9 — MEV (10 lessons, ~115 min) *[MAJOR EXPANSION]*

| # | Lesson Title | Duration | Exercise |
|---|-------------|----------|----------|
| 9.1 | What MEV Is: The Invisible Tax | 8 min | — |
| 9.2 | Sandwich Attacks Deep Dive | 15 min | ✓ Analyze sandwich on EigenPhi |
| 9.3 | The Block Production Pipeline (PBS) | 12 min | — |
| 9.4 | Liquidation MEV & Priority Gas Auctions | 10 min | — |
| 9.5 | Arbitrage MEV (DEX↔DEX, CEX↔DEX) | 12 min | — |
| 9.6 | JIT Liquidity MEV — *[NEW]* | 10 min | — |
| 9.7 | Oracle MEV — *[NEW]* | 10 min | — |
| 9.8 | MEV on L2s: Sequencer Dynamics — *[NEW]* | 10 min | — |
| 9.9 | Flashbots Protect & MEV-Share | 15 min | ✓ Configure Protect RPC |
| 9.10 | Intent-Based Protection: CoW Protocol & SUAVE — *[NEW]* | 13 min | ✓ Order via CoW |

#### Module 10 — Flash Loans (8 lessons, ~90 min) *[MAJOR EXPANSION]*

| # | Lesson Title | Duration | Exercise |
|---|-------------|----------|----------|
| 10.1 | What Flash Loans Are | 8 min | — |
| 10.2 | Atomicity: The Core Concept | 10 min | — |
| 10.3 | Flash Loan Sources: Aave, Balancer, dYdX — *[NEW]* | 10 min | — |
| 10.4 | Legitimate Use Cases (Arb, Collateral Swap, Self-Liquidation) | 12 min | — |
| 10.5 | The Euler Exploit: Full Walkthrough | 15 min | ✓ Trace on Etherscan |
| 10.6 | The Mango Markets Attack | 12 min | — |
| 10.7 | Oracle Manipulation Patterns — *[NEW]* | 12 min | — |
| 10.8 | How Protocols Defend Against Flash Loans — *[NEW]* | 11 min | ✓ Flash loan on testnet |

#### Module 11 — veTokenomics (8 lessons, ~85 min) *[UNBUNDLED + EXPANDED]*

| # | Lesson Title | Duration | Exercise |
|---|-------------|----------|----------|
| 11.1 | Why Vote-Escrow Models Exist | 8 min | — |
| 11.2 | The CRV → veCRV Mechanism | 12 min | — |
| 11.3 | Gauge Systems & Emissions Direction | 10 min | — |
| 11.4 | The Curve Wars: A Liquidity Battle | 15 min | — |
| 11.5 | Convex Economics (cvxCRV, vlCVX) | 12 min | — |
| 11.6 | Votium Bribe Markets & ROI Math | 10 min | ✓ Calculate bribe ROI |
| 11.7 | ve(3,3): Aerodrome & Velodrome | 10 min | — |
| 11.8 | Governance Attacks on ve Systems — *[NEW]* | 8 min | ✓ Vote on Snapshot |

#### Module 12 — Restaking & LRTs (8 lessons, ~95 min) *[UNBUNDLED + EXPANDED]*

| # | Lesson Title | Duration | Exercise |
|---|-------------|----------|----------|
| 12.1 | The Restaking Concept | 10 min | — |
| 12.2 | EigenLayer: Operators, AVSs, Delegators | 15 min | — |
| 12.3 | Slashing Mechanics & Economic Security | 12 min | — |
| 12.4 | Liquid Restaking Tokens (eETH, ezETH, rsETH) | 12 min | ✓ Evaluate an LRT |
| 12.5 | Cascading Slashing & Rehypothecation — *[NEW]* | 10 min | — |
| 12.6 | EigenLayer vs Symbiotic vs Karak — *[NEW]* | 12 min | — |
| 12.7 | LRT Depeg Risk with Leverage | 12 min | ✓ Map LRT dependencies |
| 12.8 | AVS Risk Assessment Framework — *[NEW]* | 12 min | — |

#### Module 13 — Cross-chain Infrastructure (8 lessons, ~95 min) *[UNBUNDLED + EXPANDED]*

| # | Lesson Title | Duration | Exercise |
|---|-------------|----------|----------|
| 13.1 | Why Cross-Chain Exists | 8 min | — |
| 13.2 | Bridge Types Taxonomy | 12 min | — |
| 13.3 | Historical Bridge Exploits (Ronin, Wormhole, Nomad) — *[expanded]* | 15 min | — |
| 13.4 | LayerZero v2 Architecture — *[NEW]* | 12 min | — |
| 13.5 | Chainlink CCIP Deep Dive — *[NEW]* | 12 min | — |
| 13.6 | Axelar & General Message Passing — *[NEW]* | 10 min | — |
| 13.7 | Cross-Chain Intents: Across, DeBridge DLN — *[NEW]* | 12 min | ✓ Bridge via 3 methods |
| 13.8 | Native vs Third-Party Bridge Decision Framework | 10 min | ✓ Evaluate a bridge |

### EXPERT RESEARCH TIER

#### Module 14 — On-chain Data Analysis (9 lessons, ~105 min) *[MAJOR EXPANSION]*

| # | Lesson Title | Duration | Exercise |
|---|-------------|----------|----------|
| 14.1 | The On-Chain Data Stack (Tools Overview) | 10 min | — |
| 14.2 | DeFiLlama Deep Dive | 12 min | ✓ Research session |
| 14.3 | Dune Analytics Basics | 12 min | — |
| 14.4 | SQL for DeFi Research — *[NEW]* | 15 min | ✓ Write first Dune query |
| 14.5 | Building Your First Dashboard — *[NEW]* | 12 min | ✓ Build protocol dashboard |
| 14.6 | The Graph & Subgraphs — *[NEW]* | 10 min | — |
| 14.7 | Wallet Profiling: DeBank, Arkham, Nansen | 12 min | ✓ Profile a whale |
| 14.8 | The Four Research Lenses | 12 min | — |
| 14.9 | Pattern Recognition: Healthy vs Dying Protocols — *[NEW]* | 10 min | — |

#### Module 15 — Composability Risk (6 lessons, ~70 min)

| # | Lesson Title | Duration | Exercise |
|---|-------------|----------|----------|
| 15.1 | Composability = Dependency | 10 min | — |
| 15.2 | Failure Propagation Patterns | 12 min | — |
| 15.3 | Dependency Mapping Methodology | 12 min | ✓ Map your largest position |
| 15.4 | Systemic Correlation in DeFi Crises | 12 min | — |
| 15.5 | Blast Radius Calculation — *[NEW]* | 12 min | — |
| 15.6 | Stress Testing Portfolios — *[NEW]* | 12 min | ✓ Stress test 4 scenarios |

#### Module 16 — Protocol Analysis (7 lessons, ~85 min)

| # | Lesson Title | Duration | Exercise |
|---|-------------|----------|----------|
| 16.1 | The Protocol Evaluation Matrix | 12 min | — |
| 16.2 | Yield Source Assessment | 10 min | — |
| 16.3 | Smart Contract Security Indicators | 12 min | — |
| 16.4 | Reading Audit Reports — *[NEW]* | 15 min | ✓ Summarize an audit |
| 16.5 | Oracle & Governance Analysis | 12 min | — |
| 16.6 | Tokenomics Deep Dive: Vesting, Emissions, Velocity | 13 min | ✓ Tokenomics teardown |
| 16.7 | Track Record & Stress Test History | 10 min | — |

#### Module 17 — RWA & Institutional DeFi (6 lessons, ~70 min) *[NEW MODULE]*

| # | Lesson Title | Duration | Exercise |
|---|-------------|----------|----------|
| 17.1 | The RWA Landscape | 10 min | — |
| 17.2 | Tokenized Treasuries: BUIDL, USDY, BENJI | 12 min | — |
| 17.3 | RWA Infrastructure: Centrifuge, Ondo, Maple, Goldfinch | 15 min | — |
| 17.4 | Permissioned DeFi (Aave Arc, KYC Pools) | 10 min | — |
| 17.5 | Compliance Token Standards (ERC-3643, ERC-1400) | 10 min | — |
| 17.6 | Evaluating an RWA Protocol | 13 min | ✓ Full RWA evaluation |

#### Module 18 — Portfolio, Privacy & Regulation (9 lessons, ~105 min)

| # | Lesson Title | Duration | Exercise |
|---|-------------|----------|----------|
| 18.1 | Portfolio Architecture: The Three-Tier Model | 12 min | — |
| 18.2 | Position Sizing Rules | 10 min | — |
| 18.3 | Monitoring Workflow (Daily/Weekly/Monthly) | 12 min | ✓ Build tracking sheet |
| 18.4 | Benchmark Comparison & Honest PnL | 12 min | — |
| 18.5 | Dynamic Rebalancing — *[NEW]* | 10 min | — |
| 18.6 | Privacy Infrastructure (Tornado Cash history, Privacy Pools) — *[NEW]* | 12 min | — |
| 18.7 | DeFi Regulation: MiCA, SEC, GENIUS Act — *[NEW]* | 15 min | — |
| 18.8 | DeFi Insurance: Nexus Mutual & Cover Markets — *[NEW]* | 10 min | — |
| 18.9 | Performance Attribution & Course Capstone | 12 min | ✓ Capstone portfolio design |

---

## 5. AGGREGATE STATISTICS

| Tier | Modules | Lessons | Est. Video Runtime |
|------|---------|---------|-------------------|
| Foundation | 4 | 34 | ~5.8 hours |
| Core DeFi | 4 | 36 | ~6.7 hours |
| Advanced Mechanics | 5 | 42 | ~8.0 hours |
| Expert Research | 5 | 37 | ~7.2 hours |
| **TOTAL** | **18** | **149** | **~27.7 hours** |

### Exercise Distribution

| Tier | Exercises |
|------|-----------|
| Foundation | 14 |
| Core DeFi | 9 |
| Advanced Mechanics | 12 |
| Expert Research | 14 |
| **TOTAL** | **49 exercises** |

---

## 6. PRODUCTION SEQUENCE

Proposed order for content production, optimized for shipping value progressively.

### Phase 1 — Foundation Completion
- All 34 Foundation lessons
- Students completing Foundation have internalized DeFi's operational mechanics
- Estimated effort: ~60 hours of focused content production

### Phase 2 — Core DeFi Essentials
- Modules 5 (Lending), 6 (Stablecoins), 8 (Strategies — with new airdrop farming lesson)
- Module 7 (Account Abstraction) can be produced last in this tier
- Estimated effort: ~50 hours

### Phase 3 — Advanced Mechanics (the premium differentiator)
- Priority order: Module 9 (MEV) → Module 10 (Flash Loans) → Module 12 (Restaking)
- These are the lessons most likely to appear in marketing materials
- Modules 11 (veTokenomics) and 13 (Cross-chain) follow
- Estimated effort: ~70 hours

### Phase 4 — Expert Tier
- Module 14 (On-chain Data) highest priority — the capstone analytical skill
- Modules 15, 16, 17, 18 follow in order
- Estimated effort: ~60 hours

**Total production estimate:** ~240 hours of focused content work across 149 lessons.

---

## 7. PRODUCTION STANDARDS (Per-Lesson Checklist)

Every lesson must pass this checklist before being marked complete:

**Content quality**
- [ ] Opens with one-sentence framing of what the student will understand
- [ ] All mechanisms explained with numbers where applicable
- [ ] At least one concrete example included
- [ ] No unsupported claims or speculation
- [ ] Connects to at least one previous lesson and one future lesson

**Format coherence**
- [ ] Slide summary accurately reflects the written content
- [ ] Voice script hits target word count (±20%)
- [ ] Voice script is conversational, not read-aloud Markdown
- [ ] Visual suggestions specify what appears during each section of narration

**Practical integration**
- [ ] If exercise is included, it produces a concrete artifact
- [ ] Exercise is feasible with free tools on testnet/mainnet
- [ ] Exercise time estimate is realistic

**Cross-format consistency**
- [ ] A student reading only the text gets full depth
- [ ] A student watching only the video gets correct understanding (simplified but not wrong)
- [ ] A student viewing only the slides gets the key takeaways

---

## 8. FORMAT OUTPUT SPECIFICATIONS

### Written Course Output
- One Markdown file per module (18 files)
- Lessons delimited within each module by `## Lesson X.Y —` headers
- All 5 sections as subsections under each lesson
- Ready for direct static-site rendering (MkDocs, Docusaurus, Nextra)

### Slide Deck Output
- One presentation per lesson (149 decks)
- Auto-generatable from Slide Summary section using marp or pandoc
- 4–6 slides per lesson
- Consistent visual template across decks

### Video Script Output
- One narration script per lesson (149 scripts)
- Plain text, no Markdown
- Timing annotations for visual transitions
- Pronunciation notes for technical terms where needed
- Ready for AI voice generation (ElevenLabs, PlayHT) or human narrator

---

## 9. STATUS & NEXT STEPS

**Current status:** Structural plan complete. 18 modules, 149 lessons, all sections specified.

**Awaiting approval on:**
1. Lesson breakdown — is 149 lessons the right granularity, or should some be merged/split?
2. Lesson format specification — do the 5 sections cover what's needed?
3. Production sequence — does Phase 1 → 4 match your priorities?
4. Duration targets — are 5–15 min lessons (10 min average) the right video length?

**On approval, next deliverable will be:**
- Phase 1 output: All 34 Foundation-tier lessons written in the full 5-section format
- Delivered as Modules 1–4 complete Markdown files
- Preserves all existing content, integrates new sections (multisig, Tenderly, LVR, V4 hooks), applies lesson structure throughout

**Will not proceed to full lesson writing until this restructuring plan is explicitly approved.**

---

*End of Restructuring Plan.*
