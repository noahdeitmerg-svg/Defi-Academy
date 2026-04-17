# DeFi Academy — Curriculum Revision Report

## Diagnostic Analysis & Improvement Plan

**Prepared by:** Lead Curriculum Architect
**Status:** Analysis Phase — No content revision yet
**Input reviewed:** Complete course content, Modules 1–16 (delivered as 13 distinct content files, with Modules 10–12, 13–14, and 15–16 currently bundled)

---

## EXECUTIVE SUMMARY

The existing curriculum is structurally sound and pedagogically strong in the Foundation tier (Modules 1–3) and core lending/stablecoin mechanics (Modules 5–6). However, it suffers from a **severe depth imbalance**: the most complex and commercially valuable topics (MEV, Flash Loans, veTokenomics, Restaking, Cross-chain) are given the least content — collectively occupying less space than Module 2 alone. Additionally, several topics explicitly required by the academy specification are missing or superficial: airdrop farming strategies, account abstraction, RWA tokenization, DeFi insurance, privacy infrastructure, and dedicated governance mechanics.

To justify $1,000+ pricing, the curriculum needs content depth parity across all tiers, six missing or underweight topics integrated, three new modules added, and a systematic practice lab overhaul tying every concept to hands-on exercises.

**Recommendation:** Expand to 18 modules, unbundle the currently combined modules, and add approximately 40% more content weight to the Advanced Mechanics and Expert tiers.

---

## 1. CURRICULUM STRENGTHS

These elements are production-ready and should be preserved:

**Pedagogical structure.** The 8-section module format (Learning Objectives → Conceptual Explanation → Mechanism Deep Dive → Real-world Examples → Security → Practical Exercise → AI Tutor Q&A → Key Takeaways) is consistent, scannable, and appropriate for a premium course. This should remain the template for all revisions.

**Foundation tier (Modules 1–3).** These modules are appropriately weighted (25–35 KB each) and correctly prioritize absolute-beginner clarity. Module 2's wallet security coverage is among the strongest security content I've seen in any DeFi curriculum. Module 3's EIP-1559 math with concrete calculations sets an excellent standard.

**Numerical specificity in yield strategies.** Module 7's practice of giving every strategy a full numerical walkthrough (starting capital → operations → gross yield → costs → net yield → liquidation triggers) is exactly right for a practitioner-focused program.

**Case study integration.** Terra/Luna, Euler Finance, Mango Markets, USDC depeg, Compound Proposal 289, and Bybit all appear with mechanical analysis rather than narrative retelling. This is the correct depth.

**Mental models.** The "Name the yield source" and "Composability = Dependency" framings are memorable and actionable — they give students analytical anchors for novel situations.

**Case-study-to-mechanism linking.** Euler's donation-function bug is explained mechanistically (not "they got hacked"), stETH's June 2022 depeg is tied to liquidity crisis mechanics (not "price dropped"). This is the kind of explanation that justifies premium pricing.

---

## 2. IDENTIFIED GAPS

### 2.1 — Critical Depth Imbalances

| Module | Current Size | Expected Size | Gap |
|--------|-------------|---------------|-----|
| Module 8 (MEV) | 7 KB | 20–25 KB | **−60%** |
| Module 9 (Flash Loans) | 6 KB | 15–18 KB | **−60%** |
| Module 10 (veTokenomics) | ~4 KB (bundled) | 15–18 KB | **−75%** |
| Module 11 (Restaking) | ~4 KB (bundled) | 18–22 KB | **−80%** |
| Module 12 (Cross-chain) | ~4 KB (bundled) | 18–22 KB | **−80%** |
| Module 13 (On-chain Data) | ~5 KB (bundled) | 18–22 KB | **−75%** |

The Advanced Mechanics tier is where $1,000 courses differentiate from $200 courses. In the current form, it is *thinner* than the free Foundation tier — which inverts the expected value delivery curve.

### 2.2 — Explicitly Required Topics That Are Missing or Insufficient

**Airdrop farming (Strategy spec requires this).** Completely absent despite being one of five explicitly required strategies. Given the commercial importance (many students' primary motivation for taking a DeFi course is capturing airdrops), this is the single largest gap.

**RWA tokenization (Advanced content spec requires this).** Brief mention in Module 6 only. The RWA sector reached $18.6B on-chain in 2025 with BlackRock's BUIDL at $2.9B — this deserves dedicated treatment.

**Intent-based trading (Advanced content spec requires this).** Surface-level mention in Module 4. CoW Protocol's solver economics, UniswapX Dutch auctions, and cross-chain intents (Across, DeBridge) need mechanistic explanation.

**Account abstraction (ERC-4337).** Completely missing. This is the direction of DeFi UX — 73% of new Web3 projects in 2025 incorporate it. Smart wallets, session keys, gas sponsorship, EIP-7702 — none addressed.

**DeFi insurance.** Nexus Mutual, InsurAce, and cover markets not mentioned. Important for risk management chapter and practical portfolio construction.

**Privacy infrastructure.** Tornado Cash history, Privacy Pools, zkBob, shielded transactions — zero coverage. This is a legitimate concern for serious operators and a regulatory focal point.

**Governance systems deep dive.** Scattered mentions but no dedicated treatment. Snapshot off-chain voting, Tally on-chain execution, Governor contracts, delegation dynamics, and governance attack vectors deserve systematic coverage.

**Perpetuals and derivatives DEXs.** GMX, Hyperliquid, dYdX mentioned in passing. Given their role in delta-neutral strategies and funding arbitrage, they deserve mechanical treatment (GLP vs GM pools, funding rate mechanics, liquidation engines).

### 2.3 — Weak Coverage of Included Topics

**Uniswap V4 and hooks.** Module 4 focuses on V2/V3. V4's hooks architecture is a fundamental change that serious practitioners must understand.

**Morpho Blue.** Mentioned in Module 5 but architecture is explained in ~150 words. Given Morpho's rise as Aave's primary competitor and its fundamentally different model, this warrants deeper treatment.

**Pendle yield trading.** Appears as a destination for strategies in Module 7, but PT/YT mechanics, implied yield curves, and the "rate derivative" framing are not developed. This is a critical DeFi primitive.

**Multisig wallets.** Module 2 covers personal key management thoroughly but ignores Safe (Gnosis Safe) and multisig patterns — essential for anyone managing >$100k or DAO treasuries.

**Dune Analytics practice.** Module 13 mentions Dune but provides only one SQL snippet. A practitioner curriculum should teach query-building with multiple examples.

**LVR and professional LP economics.** Impermanent loss is covered (Module 4), but Loss-versus-Rebalancing — the actual professional LP metric — is not mentioned.

**Oracle deep mechanics.** Referenced across multiple modules but never dedicated a section. Chainlink's decentralization architecture, Pyth's pull model, manipulation economics, and TWAP vs spot tradeoffs deserve systematic treatment.

### 2.4 — Missing Practical Exercises

Per the academy specification, the progressive practice lab should cover 8 stages. Current coverage:

| Practice Lab Stage | Current Coverage | Quality |
|--------------------|------------------|---------|
| 1. Wallet setup & testnet transactions | Module 2 | ✓ Strong |
| 2. Smart contract interaction | Module 3 | ✓ Strong |
| 3. DEX trading practice | Module 4 | ✓ Good |
| 4. Lending position simulation | Module 5 | ✓ Good |
| 5. Cross-chain bridge exercise | Module 12 | ⚠ Weak — single short exercise |
| 6. Liquidation analysis | Module 5 (brief) | ✗ No dedicated exercise |
| 7. On-chain data analysis | Module 13 | ⚠ Thin — needs multiple Dune exercises |
| 8. Transaction forensics | Scattered | ✗ No integrated exercise |

Additionally, several advanced topics have no hands-on component at all:
- Flash loan execution (can be done on testnet)
- MEV observation (Flashbots Protect usage, sandwich attack analysis)
- Yield farming position lifecycle
- Governance voting participation

---

## 3. MODULE-BY-MODULE IMPROVEMENT PLAN

### Module 1 — Blockchain Fundamentals
**Current status:** Strong. Minor additions recommended.
**Additions:**
- Brief section on data availability and blobs (EIP-4844) — foundation for L2 understanding later
- Merkle proofs conceptual explanation — referenced in Module 12 cross-chain
- State trie brief mention — foundation for MEV/forensics

### Module 2 — Wallets & Security
**Current status:** Strong. Add missing wallet categories.
**Additions:**
- New section 3.6: Multisig wallets (Safe/Gnosis Safe) — configuration, signing flow, use cases
- New section 3.7: Smart wallets and account abstraction (ERC-4337) introduction — session keys, gas sponsorship, social recovery
- Expanded coverage of EIP-712 structured signing (Permit signature deep dive)
- Add exercise: Deploy and sign with a Safe multisig on testnet

### Module 3 — Gas Mechanics, Token Standards & Etherscan
**Current status:** Strong. Add transaction simulation layer.
**Additions:**
- Section on Tenderly for transaction simulation and debugging
- Expanded Permit2 coverage
- Add exercise: Use Tenderly to simulate a complex transaction before execution

### Module 4 — DEX Mechanics & AMMs
**Current status:** Good foundation, needs V4 and professional LP content.
**Additions:**
- Section: Uniswap V4 hooks architecture and implications
- Section: LVR (Loss-versus-Rebalancing) — the professional LP metric
- Section: Balancer weighted pools and Curve tricrypto pools
- Expanded section on DEX aggregators (1inch routing algorithm, Pathfinder mechanics)
- Section: JIT liquidity mechanics and implications for LPs
- Add exercise: Analyze a real V3 position's PnL using Revert.finance (separate fee income from IL)

### Module 5 — Lending Systems
**Current status:** Solid fundamentals, needs modern protocol coverage.
**Additions:**
- Expanded Morpho Blue section with market creation mechanics
- New section: Fluid (DEX + lending merged architecture)
- New section: Spark Protocol and its relationship to Maker/Sky
- Section on undercollateralized/credit lending (Maple, Goldfinch) — risk tradeoffs
- Deeper treatment of liquidation mechanisms (Dutch auctions, fixed-price, soft liquidations)
- Add dedicated exercise: Liquidation simulation (set up a position near liquidation threshold, observe liquidation bot behavior on testnet)

### Module 6 — Stablecoins & Liquid Staking
**Current status:** Strong on classic stablecoins, needs RWA expansion.
**Additions:**
- Section: RWA-backed stablecoins (Ondo USDY, Mountain Protocol, sDAI's RWA backing)
- Section: PYUSD and institutional stablecoin entries
- Section: sDAI mechanics and DSR/SSR as the "base rate" of DeFi
- Note: Move LRT content OUT of this module (it belongs fully in Module 11)

### Module 7 — Yield Strategies
**Current status:** Good structure, missing required strategies.
**Additions:**
- **NEW Section: Airdrop farming strategies** (this is the largest single gap — required by specification)
  - Points meta-strategy
  - Multi-protocol farming portfolios
  - Sybil defense awareness
  - Capital allocation models for airdrops
  - Expected value vs. opportunity cost calculation
- New section: Pendle strategies (PT hold-to-maturity, YT leveraged yield, implied yield curves)
- New section: Ethena USDe yield stacking
- New section: Basis trades (spot + perp short for funding capture)

### Module 8 — MEV
**Current status:** Severely underweight. Full expansion required.
**Additions (approximately 3x current length):**
- Expanded sandwich attack mechanics with Etherscan-traceable examples
- New section: CEX-DEX arbitrage and its impact on LP returns
- New section: JIT liquidity MEV
- New section: Liquidation MEV and priority gas auctions
- New section: Oracle MEV
- New section: MEV on L2s (sequencer dynamics, based rollups)
- New section: SUAVE and the future of MEV architecture
- Deeper treatment of CoW Protocol solver economics and UniswapX Dutch auctions
- Add exercise: Configure Flashbots Protect RPC, execute a transaction, verify private submission on mev-blocks explorer
- Add exercise: Analyze a sandwich attack on Etherscan (identify victim, front-run, back-run, profit extracted)

### Module 9 — Flash Loans
**Current status:** Severely underweight. Full expansion required.
**Additions:**
- Compare flash loan sources (Aave 0.09%, Balancer 0%, dYdX, Uniswap V3 flash swaps)
- Pseudocode walkthrough of a legitimate arbitrage flash loan
- Pseudocode walkthrough of the Euler exploit (matching the real attack)
- Detailed coverage of oracle manipulation patterns (with the specific price feed vulnerabilities)
- Section: How to defend a protocol against flash-loan-enabled attacks (TWAP windows, multi-oracle, invariants)
- Add exercise: Execute a flash loan on testnet (Aave Sepolia provides this)
- Add exercise: Walk through the Euler exploit step-by-step on mainnet Etherscan

### Module 10 — veTokenomics
**Current status:** Underweight. Unbundle and expand.
**Additions:**
- Deeper Curve Wars math (emissions value vs bribe value economics)
- Convex's economic model (cvxCRV vs vlCVX) with numbers
- Votium bribe market mechanics and ROI calculations
- New section: ve(3,3) innovation — NFT-based liquid vote-locked positions
- New section: Aerodrome (Base) as current ve(3,3) case study
- Section: Governance attacks on ve systems (vote-buying, coalition formation)
- Add exercise: Vote on a Snapshot proposal, then trace how that vote would execute if it were on-chain (via Tally)
- Add exercise: Calculate the bribe ROI for a recent Votium round

### Module 11 — Restaking
**Current status:** Underweight. Unbundle and expand significantly.
**Additions:**
- Full EigenLayer architecture (operators, AVSs, delegators) with economic flows
- Comparative analysis: EigenLayer vs Symbiotic vs Karak
- Deep section on LRTs (ether.fi eETH, Renzo ezETH, Kelp rsETH)
- New section: Rehypothecation and cascading slashing risk mechanics
- Section: AVS risk assessment framework (each AVS has different slashing conditions)
- Section: LRT depeg risk with leveraged positions (parallel to June 2022 stETH case)
- Add exercise: Evaluate an LRT's backing composition and depeg history
- Add exercise: Map the full dependency tree of a leveraged LRT position

### Module 12 — Cross-chain Infrastructure
**Current status:** Underweight. Unbundle and expand.
**Additions:**
- Bridge security models taxonomy (honest majority, optimistic, ZK, native)
- Specific mechanistic breakdown of each historical exploit (Ronin, Wormhole, Nomad, Multichain, Harmony) — not just names
- Deep section: LayerZero v2 architecture (DVNs, executors)
- Deep section: Chainlink CCIP (Risk Management Network, decoupled execution)
- Deep section: Axelar (validator set, economic security)
- New section: Cross-chain intents (Across, DeBridge DLN) — solver-based bridging
- Native bridge vs third-party bridge decision framework
- Add exercise: Bridge via three different methods (native, LayerZero app, intent-based) and compare cost/time/security
- Add exercise: Evaluate a bridge's TVL-to-validator-stake ratio

### Module 13 — On-chain Data Analysis
**Current status:** Underweight given its Expert-tier positioning.
**Additions:**
- Substantially expanded Dune SQL tutorial (5+ progressive query examples)
- Section: The Graph and subgraph basics
- Section: DeFiLlama API integration for custom research
- Tool coverage: Parsec Finance, 0xppl, Arkham Ultra
- New section: Pattern recognition — what healthy protocols look like vs. what dying protocols look like on-chain
- Section: Whale tracking as a signal (and its limits)
- Add exercise: Build a Dune dashboard from scratch tracking a chosen protocol
- Add exercise: Forensic analysis of a recent exploit (trace fund flow from victim to attacker to mixer)

### Module 14 — Composability Risk
**Current status:** Conceptually strong but thin.
**Additions:**
- Quantitative framework: Correlation analysis across DeFi protocols during stress events
- Section: "Blast radius" calculation methodology
- New dependency mapping exercises for complex positions
- Section: How professionals stress-test portfolios (historical scenario replay)

### Module 15 — Protocol Analysis
**Current status:** Solid framework, needs regulatory and tokenomics depth.
**Additions:**
- Expanded tokenomics section: vesting cliffs, emission curves, token velocity analysis
- Deeper regulation section: MiCA specific requirements, SEC enforcement patterns, tax implications by jurisdiction
- Integration with Gauntlet and Chaos Labs risk framework methodologies
- Section: How to read audit reports (Trail of Bits, OpenZeppelin, Spearbit)
- Add exercise: Read and summarize a real audit report's findings

### Module 16 — Portfolio Construction
**Current status:** Good structure, needs dynamic elements.
**Additions:**
- Section: Performance attribution (separating alpha from beta in DeFi returns)
- Section: Tax-aware rebalancing (harvest cycles, loss harvesting)
- Section: Dynamic allocation adjustment based on market regime
- Expanded scenario coverage (black swan scenarios beyond the three currently included)

---

## 4. PROPOSED NEW MODULES

Three new modules are required to cover specification-required topics that currently have no home or insufficient coverage.

### New Module 6.5 — Account Abstraction & Smart Wallets
**Position:** Between current Module 6 and Module 7.
**Rationale:** Smart wallets are becoming the default DeFi interface. Session keys, gas sponsorship, and social recovery fundamentally change security and UX patterns.
**Coverage:**
- ERC-4337 architecture (UserOperations, Bundlers, Paymasters, EntryPoint)
- EIP-7702 (EOA temporary delegation, introduced in Pectra upgrade)
- Session keys for automated DeFi operations
- Gas sponsorship mechanics and business models
- Social recovery schemes
- Security tradeoffs vs. traditional EOAs
- Exercise: Deploy a smart wallet (via Candide or Biconomy), configure a session key, execute automated operations

### New Module 17 — RWA & Institutional DeFi
**Position:** After Module 16 (new expert module).
**Rationale:** RWA reached $18.6B TVL in 2025 with institutional adoption accelerating. Specification explicitly requires this coverage.
**Coverage:**
- RWA tokenization infrastructure (Centrifuge, Ondo, Maple, Goldfinch)
- Tokenized Treasuries deep dive (BUIDL, USDY, BENJI)
- Permissioned DeFi (Aave Arc, compliance-integrated pools)
- Institutional custody and tokenization standards (ERC-3643, ERC-1400)
- Regulatory compliance for RWA (KYC integration, jurisdictional restrictions)
- How RWA changes DeFi yield baselines
- Exercise: Evaluate an RWA protocol's off-chain legal structure and on-chain implementation

### New Module 18 — Privacy, Compliance & DeFi Regulation
**Position:** Final expert module.
**Rationale:** Privacy tooling, regulatory compliance, and tax treatment are critical for serious practitioners. Specification requires DeFi regulation basics.
**Coverage:**
- Privacy infrastructure: Tornado Cash historical analysis, Privacy Pools with association sets, zkBob
- MiCA comprehensive overview (stablecoin requirements, CASP licensing, DeFi exemptions)
- US regulatory landscape: SEC approach, CFTC jurisdiction, GENIUS Act, DeFi broker rules
- Sanctions compliance (OFAC addresses, mixing implications)
- Tax treatment of DeFi operations (swaps, LP, borrowing, staking) across major jurisdictions
- DeFi insurance as compliance tool (Nexus Mutual, etc.)
- Record-keeping and reporting best practices
- Exercise: Generate a tax report from a year of DeFi activity using Koinly or similar

---

## 5. PRACTICE LAB INTEGRATION PLAN

The revised curriculum requires a coherent 8-stage practice lab with exercises integrated into each module. Proposed progression:

| Stage | Module | Exercise | New/Expanded |
|-------|--------|----------|--------------|
| 1a | M1 | Read a block, compare L1 vs L2 blocks | Existing |
| 1b | M2 | Wallet setup (MetaMask + Rabby + Safe multisig) | **Expanded** |
| 1c | M2 | Revoke test on mainnet approvals | Existing |
| 2a | M3 | Decode a DeFi transaction on Etherscan | Existing |
| 2b | M3 | Use Tenderly to simulate before signing | **New** |
| 2c | M3 | Unstick a pending transaction | Existing |
| 3a | M4 | Testnet DEX swap + log analysis | Existing |
| 3b | M4 | Analyze a real V3 LP position (fees vs IL) | **New** |
| 3c | M4 | Compare Uniswap, CoW Protocol, and 1inch execution on same trade | **New** |
| 4a | M5 | Create a testnet lending position on Aave | Existing |
| 4b | M5 | Simulate liquidation (push position to threshold, observe bot behavior) | **New** |
| 5a | M8 | Configure Flashbots Protect, verify private submission | **New** |
| 5b | M8 | Analyze a sandwich attack end-to-end | **New** |
| 5c | M9 | Execute a flash loan on testnet | **New** |
| 5d | M9 | Step-by-step walk through the Euler exploit on Etherscan | **New** |
| 6a | M10 | Vote on Snapshot + trace on-chain execution path | **New** |
| 6b | M10 | Calculate Votium bribe ROI | **New** |
| 7a | M11 | Evaluate an LRT's backing and depeg history | **New** |
| 7b | M11 | Map dependency tree of a leveraged LRT position | **New** |
| 7c | M12 | Bridge via 3 methods, compare cost/time/security | **Expanded** |
| 8a | M13 | Build a Dune dashboard from scratch | **Expanded** |
| 8b | M13 | Forensic analysis of an exploit's fund flow | **New** |
| 8c | M14 | Stress test a portfolio against historical scenarios | **New** |
| 8d | M15 | Read and summarize a real audit report | **New** |
| 8e | M17 | Evaluate an RWA protocol (legal + on-chain) | **New** |
| 8f | M18 | Generate tax report from DeFi activity | **New** |

**Total exercises after revision:** 26 (vs. approximately 14 currently).

Every exercise should produce a concrete artifact (a screenshot, a transaction hash, a calculation, a filled-in worksheet) that students can keep as portfolio evidence of completion.

---

## 6. STRATEGY COVERAGE IMPROVEMENTS

Per specification, the curriculum must cover five strategies with mechanics, when-it-works, when-it-fails, and risk scenarios. Current status:

| Strategy | Current Coverage | Status | Required Action |
|----------|------------------|--------|-----------------|
| Lending carry trades | Module 7 with numbers | ✓ Complete | Add: cross-chain carry (borrow cheap, deploy expensive) |
| ETH staking leverage loops | Module 7 with full math | ✓ Complete | Add: LRT leverage loops comparison |
| LP strategies | Module 4 + Module 7 | ✓ Good | Add: LVR-aware LP positioning |
| Delta-neutral (funding) | Module 7 with numbers | ✓ Complete | Add: Ethena USDe mechanics as dedicated strategy |
| **Airdrop farming** | **MISSING** | ✗ **Gap** | **Full new section required** |

**Airdrop farming section must cover:**
- **Mechanics:** How points systems work, what protocols reward, qualification criteria
- **Capital allocation:** How much capital, across how many protocols, for how long
- **Expected value framework:** Probability of token launch × estimated FDV × airdrop % × user's share vs. opportunity cost
- **Sybil defense:** What patterns trigger filtering, how to avoid false positive Sybil detection while running legitimate multi-wallet operations (or why not to)
- **Tier system:** Tier 1 (deposit-based, low activity), Tier 2 (regular interaction), Tier 3 (deep ecosystem participation)
- **Capital efficiency:** Looping point-earning activities (e.g., leverage on Pendle Points)
- **When it works:** Strong VC backing, significant TVL growth, clear token launch signaling
- **When it fails:** Sybil filtering wipes allocation, token launches at lower FDV than expected, token never launches
- **Risk management:** Never use borrowed capital for airdrop farming, diversify across protocols, calculate gas costs per point earned
- **Exercises:** Track a current airdrop opportunity, calculate personal capital cost per point, evaluate expected value

Additional strategies to add (beyond specification minimum):

- **Pendle strategies** (PT, YT, fixed rate vs leveraged yield)
- **Basis trading** (spot + perp short combinations across CEX and DEX)
- **Bridge-and-stake arbitrage** (capturing L2 incentive gaps)
- **Vault curator strategies** (Morpho MetaMorpho, Yearn V3)

---

## 7. FINAL PROPOSED COURSE STRUCTURE

### Revised 18-Module Architecture

**FOUNDATION (4 modules)**
- Module 1 — Blockchain Fundamentals *(minor additions)*
- Module 2 — Wallets & Security *(add multisig, AA intro)*
- Module 3 — Gas, Tokens & Etherscan *(add Tenderly, Permit2)*
- Module 4 — DEX Mechanics & AMMs *(add V4, LVR, aggregator depth)*

**CORE DEFI (4 modules)**
- Module 5 — Lending Systems *(add Morpho, Fluid, Spark, credit lending)*
- Module 6 — Stablecoins & Liquid Staking *(add RWA stables, remove LRT)*
- Module 7 — Account Abstraction & Smart Wallets ***(NEW)***
- Module 8 — Yield Strategies *(add airdrop farming, Pendle, USDe strategies)*

**ADVANCED MECHANICS (5 modules)**
- Module 9 — MEV *(major expansion — 3x current)*
- Module 10 — Flash Loans *(major expansion)*
- Module 11 — veTokenomics *(unbundle and expand)*
- Module 12 — Restaking & LRTs *(unbundle and expand)*
- Module 13 — Cross-chain Infrastructure *(unbundle and expand)*

**EXPERT RESEARCH (5 modules)**
- Module 14 — On-chain Data Analysis *(expand Dune content)*
- Module 15 — Composability Risk *(add quantitative frameworks)*
- Module 16 — Protocol Analysis *(add audit reading, regulatory depth)*
- Module 17 — RWA & Institutional DeFi ***(NEW)***
- Module 18 — Portfolio Construction, Privacy & Regulation *(merge portfolio with new regulation content)*

### Target Content Weighting

| Tier | Current | Target | Rationale |
|------|---------|--------|-----------|
| Foundation | 130 KB | 140 KB | Already strong, minor additions |
| Core DeFi | 60 KB | 90 KB | Add AA module, expand airdrop farming |
| Advanced Mechanics | 30 KB | 100 KB | **Largest expansion** — this is the premium differentiator |
| Expert Research | 75 KB | 100 KB | Add RWA module, expand Dune, regulation |
| **Total** | **295 KB** | **~430 KB** | **~45% content increase** |

### Production Sequence (recommended order for revision work)

**Phase 1 (High ROI — addresses specification gaps):**
1. Module 8 (Yield Strategies) — add airdrop farming section
2. Module 9 (MEV) — full expansion
3. Module 10 (Flash Loans) — full expansion
4. Modules 11, 12, 13 — unbundle and expand

**Phase 2 (Fill structural gaps):**
5. New Module 7 (Account Abstraction)
6. New Module 17 (RWA)
7. New Module 18 (Portfolio + Privacy + Regulation)

**Phase 3 (Polish existing content):**
8. Foundation tier additions (Modules 1–4)
9. Core DeFi polish (Modules 5–6)
10. Expert tier polish (Modules 14–16)

**Phase 4 (Practice Lab integration):**
11. Add all new exercises across modules
12. Build exercise companion worksheets

---

## APPENDIX: CRITICAL OBSERVATIONS

### Observation A: The "Advanced Mechanics Collapse"

The most commercially valuable content in the entire curriculum — the topics that separate a $200 course from a $1,000 course — is currently the thinnest. A student who pays premium pricing expects to receive premium content at the premium topics. The current state inverts this.

### Observation B: The Airdrop Farming Gap is Unacceptable

Specification explicitly requires airdrop farming as one of five strategies. Its absence is the single clearest specification failure. Additionally, airdrop-related content is one of the primary draws for students in any DeFi course — its absence will be immediately noticed by the target audience and will damage perceived course value.

### Observation C: Practice Lab Is Underdeveloped

A $1,000 course must be production-grade experiential. The current practice exercises are solid where they exist, but many modules lack hands-on components. Every advanced topic (MEV, flash loans, restaking, bridging) has natural hands-on exercises that are educationally valuable and commercially differentiating. These must be added.

### Observation D: The Bundled Files Are a Structural Problem

Modules 10–12, 13–14, and 15–16 currently share files. This is both pedagogically confusing (students lose track of which module they're in) and operationally problematic (the website rendering and AI tutor integration become ambiguous). All modules should be separate files in the final production version.

### Observation E: Case Study Coverage Could Deepen

All required case studies (Terra, Mango, Euler, Compound, USDC) are present. However, their depth varies significantly. Euler and Terra are treated with the right depth. Compound governance and Mango could be expanded with more mechanical detail. Additional case studies worth considering: the Ronin bridge hack (bridge security), the Ethereum Classic 51% attacks (consensus economics), and the March 2020 Black Thursday Maker incident (liquidation failure).

---

## FINAL RECOMMENDATION

Approve this revision plan and authorize Phase 1 work to begin. The three highest-priority revisions — airdrop farming integration, Module 9 MEV expansion, and Module 10 Flash Loans expansion — address approximately 60% of the gap between current state and target state. Completing Phase 1 alone would elevate the course from "solid practitioner course" to "genuinely competitive at the $1,000 price point."

Full revision of all 18 modules is estimated at 2–3x the effort of the current draft, primarily concentrated in the Advanced Mechanics tier and the three new modules.

**Status:** Awaiting approval to proceed with revised module generation.

---

*End of Diagnostic Report.*
