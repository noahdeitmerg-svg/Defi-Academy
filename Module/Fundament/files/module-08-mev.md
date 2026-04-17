# Module 8 — MEV (Maximal Extractable Value)

## The Invisible Tax on Every DeFi Transaction

---

## 1. Learning Objectives

By the end of this module, you will be able to:

- Define MEV and explain why it exists as a structural feature of blockchains
- Describe sandwich attacks, front-running, and back-running with concrete mechanics
- Understand the Proposer-Builder Separation (PBS) architecture and how blocks are actually built
- Explain Flashbots Protect, MEV-Share, and how users can reclaim extracted value
- Connect MEV to intent-based trading as a structural solution
- Quantify the cost of MEV on your own transactions

---

## 2. Conceptual Explanation

MEV is the profit that can be extracted by manipulating the ordering, inclusion, or censorship of transactions within a block. It exists because transactions are publicly visible in the mempool before being included in a block, and whoever orders the transactions can exploit this information.

MEV is not a bug — it's a structural feature of transparent blockchains. As long as pending transactions are visible and block producers can choose transaction ordering, MEV will exist.

---

## 3. Mechanism Deep Dive

### 3.1 — Types of MEV

**Sandwich Attack (most common for users):**
1. You submit a swap: Buy ETH with 10,000 USDC on Uniswap
2. MEV bot sees your pending transaction in the mempool
3. Bot inserts a buy order BEFORE yours (front-run), pushing the price up
4. Your transaction executes at the now-higher price
5. Bot inserts a sell order AFTER yours (back-run), capturing the profit
6. You receive less ETH than you would have without the sandwich. The difference is the bot's profit.

Cost to you: typically 0.1–2% of your trade value. On a $10,000 swap, that's $10–200 lost to MEV.

**Liquidation MEV:** When a lending position becomes liquidatable, multiple bots race to be the first to execute the liquidation (and earn the liquidation bonus). This competition can lead to priority gas auctions, where bots bid up gas prices to get their transaction included first.

**Arbitrage MEV:** When prices differ across DEXs, bots atomically buy low on one and sell high on another. This is generally benign — it equalizes prices across venues. Users don't lose directly, but the profit could theoretically go to LPs or users instead.

### 3.2 — The Block Production Pipeline

Modern Ethereum uses Proposer-Builder Separation (PBS):

1. **Searchers** find MEV opportunities (sandwiches, arbitrage, liquidations) and construct bundles of transactions that extract this value.
2. **Block Builders** aggregate searcher bundles and user transactions into complete blocks, optimizing for total extractable value.
3. **Proposers (Validators)** are randomly selected to propose the next block. They receive bids from builders and select the highest-paying block. The proposer earns the builder's bid without needing to understand MEV themselves.

This separation means validators don't need to run sophisticated MEV strategies — they simply auction block space to the highest bidder.

### 3.3 — Protection Mechanisms

**Flashbots Protect:** A private transaction pool. Instead of broadcasting your transaction to the public mempool, you send it directly to block builders through Flashbots. Your transaction is invisible to searchers until it's included in a block. This prevents sandwich attacks because bots can't see your pending trade.

Setup: Add the Flashbots Protect RPC to your wallet (https://rpc.flashbots.net). All transactions through this RPC are private.

**MEV-Share:** Users submit transactions through Flashbots and receive 90% of any backrun profit their transaction generates. Instead of losing value to MEV, you capture most of it.

**Intent-Based Systems (CoW Protocol, UniswapX):** Users declare intents, and professional solvers compete to fill them optimally. Because the execution happens off-chain (or in private), there's no public mempool to exploit. This is the most comprehensive MEV protection available.

**Private RPCs on L2s:** L2 sequencers process transactions in order received (FIFO), not by gas price. This eliminates priority gas auctions and reduces (but doesn't fully eliminate) MEV.

---

## 4. Real-World Examples

**MEV by the numbers:** In 2024, sandwich attacks constituted approximately $290M of ~$562M total MEV volume on Ethereum. The average DeFi user loses 0.1–0.5% on every unprotected swap to MEV extraction.

**The $25M Sandwich:** In 2023, a single MEV bot earned $25 million in one year from sandwich attacks alone. The bot operated continuously, analyzing every pending swap transaction and inserting sandwiches where profitable.

---

## 5. Security Considerations

- **Always use MEV protection for swaps >$500.** Flashbots Protect RPC, CoW Protocol, or UniswapX.
- **Set tight slippage tolerances.** High slippage settings give sandwich bots more room to extract value.
- **L2s reduce but don't eliminate MEV.** Sequencer ordering provides some protection, but cross-domain MEV and builder-integrated sequencers can still extract value.
- **Be aware of "just-in-time" liquidity.** Some MEV bots add liquidity to a Uniswap V3 pool just before your swap and remove it just after, capturing concentrated fees at your expense.

---

## 6. Practical Exercise

### Exercise 8.1 — Add Flashbots Protect RPC

Add the Flashbots Protect RPC (https://rpc.flashbots.net) to MetaMask/Rabby. Send a test transaction through it and compare the experience with the default public RPC.

### Exercise 8.2 — Analyze a Sandwich Attack

Go to [eigenphi.io](https://eigenphi.io) or [zeromev.org](https://zeromev.org). Find a recent sandwich attack. Identify: the victim transaction, the front-run, the back-run, and the profit extracted. Calculate: what percentage of the swap value was lost to MEV?

### Exercise 8.3 — Compare Protected vs. Unprotected Execution

Use CoW Protocol and standard Uniswap for the same swap (same amount, same pair). Compare: execution price, gas cost, and total cost. How much does MEV protection save?

---

## 7. AI Tutor Q&A Examples

**Q: If I always use Flashbots Protect, am I safe from all MEV?**

A: Flashbots Protect prevents sandwich attacks by hiding your transaction from the public mempool. However, it doesn't protect against all MEV. The block builder who includes your transaction can still perform back-runs. Informed flow (someone seeing your transaction before you) is eliminated, but structural MEV (arbitrage between your swap and the pool's price) still exists. For the most comprehensive protection, use intent-based systems like CoW Protocol, where solvers compete for your order and you benefit from Coincidence of Wants matching.

---

## 8. Key Takeaways

1. **MEV is an invisible tax on unprotected DeFi transactions.** Sandwich attacks cost the average user 0.1–0.5% per swap.
2. **Use private transaction submission for any swap >$500.** Flashbots Protect RPC is free and takes 30 seconds to set up.
3. **Intent-based systems (CoW Protocol, UniswapX) are the structural solution.** They eliminate the public mempool entirely.
4. **MEV scales with transaction size.** A $100 swap loses ~$0.50. A $100,000 swap loses ~$500. Protection becomes more valuable as your capital grows.

---

| ← Module 7: Yield Strategies | **Module 8: MEV** | Module 9: Flash Loans → |
