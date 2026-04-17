# Module 1 — Blockchain Fundamentals

## How the Machine Under DeFi Actually Works

---

## 1. Learning Objectives

By the end of this module, you will be able to:

- Explain what a blockchain is and why it exists — not as a buzzword, but as an engineering solution to a specific trust problem
- Describe how Ethereum processes transactions from creation through finality
- Understand the role of validators, blocks, and consensus in securing the network
- Distinguish between Layer 1 and Layer 2 networks and their security tradeoffs
- Read a block on Etherscan and identify its key components
- Explain why all of this matters for every DeFi decision you will ever make

---

## 2. Conceptual Explanation

### 2.1 — The Problem Blockchains Solve

Before blockchain, every digital transaction required a trusted middleman. If you wanted to send money to someone across the world, a bank had to verify your balance, authorize the transfer, and update both accounts. The bank was the single source of truth.

This creates three problems. First, the middleman can say no — they can freeze your account, reverse your transaction, or deny you access entirely. Second, the middleman can fail — banks go bankrupt, get hacked, or shut down during crises. Third, the middleman extracts rent — every intermediary takes a fee for being the trusted party.

A blockchain solves this by replacing the single trusted middleman with a network of thousands of independent computers (called nodes) that all maintain the same ledger. No single entity controls the ledger. No single entity can alter it. No single entity can shut it down.

This is not about ideology. It is about architecture. DeFi exists because blockchains provide a ledger that anyone can read, anyone can write to (by paying a fee), and nobody can unilaterally control.

### 2.2 — What a Blockchain Actually Is

A blockchain is a database with three unusual properties:

**Append-only.** You can add new entries, but you cannot edit or delete old ones. Every transaction that has ever occurred on Ethereum since its launch in 2015 is still there, readable by anyone.

**Distributed.** The database is not stored in one place. Thousands of computers around the world each hold a complete copy. They continuously synchronize with each other. If one computer goes offline, nothing changes — the rest of the network continues.

**Consensus-driven.** Before a new entry is added, the network must agree that the entry is valid. This agreement process — called consensus — is what makes a blockchain trustworthy without requiring a trusted operator.

The "blocks" in "blockchain" are batches of transactions. Every 12 seconds on Ethereum, a new block is produced. Each block contains a list of transactions, a reference to the previous block (creating the "chain"), and a cryptographic proof that the block follows the rules. You cannot insert a fake block without breaking every block that comes after it — and every node in the network would immediately reject it.

### 2.3 — Ethereum vs. Bitcoin: Why Ethereum Matters for DeFi

Bitcoin was the first blockchain (2009). It does one thing: transfer value. The Bitcoin ledger records who sent how much BTC to whom.

Ethereum (launched 2015) added a crucial capability: **programmable logic.** On Ethereum, you don't just record transfers — you can deploy small programs called **smart contracts** that execute automatically when certain conditions are met.

A smart contract is code that lives on the blockchain and runs exactly as written, every time, without anyone being able to stop or alter it. When you "use" Aave or Uniswap, you are not connecting to a company's server. You are sending a transaction that triggers a smart contract on Ethereum. The smart contract processes your transaction according to its code — no human intervenes.

This is the foundation of DeFi. Every lending market, every decentralized exchange, every yield strategy is a smart contract or a set of smart contracts interacting with each other.

---

## 3. Mechanism Deep Dive

### 3.1 — The Life of a Transaction

Understanding how a transaction moves from your wallet to the blockchain is essential. Every DeFi operation — every swap, every deposit, every borrow — follows this path.

**Step 1 — Creation.** You initiate a transaction in your wallet. The transaction specifies: sender (your address), recipient (a smart contract or another wallet), value (how much ETH to send), data (the function call if interacting with a smart contract), gas limit (maximum computation you're willing to pay for), and max fee (maximum price per unit of gas).

**Step 2 — Signing.** Your wallet signs the transaction with your private key. This cryptographic signature proves that you — and only you — authorized this transaction. Nobody can forge your signature without your private key. This is why protecting your private key is the single most important security practice in crypto.

**Step 3 — Broadcasting.** Your wallet broadcasts the signed transaction to the Ethereum network. The transaction enters the **mempool** — a waiting area of pending transactions that haven't been included in a block yet. The mempool is public. Anyone can see pending transactions. This has important implications for MEV, which you will study in Module 8.

**Step 4 — Block Building.** A **block builder** (a specialized entity in Ethereum's current architecture) selects transactions from the mempool and assembles them into a block. Builders typically prioritize transactions that pay higher fees. The builder doesn't validate the block — they construct it and submit it to a block proposer.

**Step 5 — Block Proposal.** A **validator** is randomly selected to propose the next block. Under Ethereum's Proof of Stake system, validators are selected proportionally to the amount of ETH they have staked (locked as collateral). The selected validator reviews the builder's block and proposes it to the network.

**Step 6 — Attestation.** Other validators check the proposed block — is it valid? Do all transactions follow the rules? Does the block reference the correct parent block? If they agree, they **attest** to it (sign off on its validity). A block needs attestations from 2/3 of active validators to be accepted.

**Step 7 — Finality.** After two **epochs** (each epoch is 32 slots of 12 seconds = 6.4 minutes, so finality takes approximately 12.8 minutes), the block is considered **final.** A finalized block cannot be reversed without destroying at least 1/3 of all staked ETH — an attack that would cost billions of dollars. Before finality, the block is "confirmed" but theoretically reversible. After finality, it is permanent.

**Why This Matters for DeFi:** When you make a swap on Uniswap and your wallet shows "confirmed," the transaction is included in a block but not yet final. For small transactions, this distinction doesn't matter. For large transactions (moving $100k+), understanding finality is important — especially when bridging between chains.

### 3.2 — Proof of Stake: How Ethereum Reaches Agreement

Ethereum switched from Proof of Work to Proof of Stake in September 2022 (an event called "The Merge"). Under Proof of Stake:

**Validators stake ETH.** To become a validator, you lock 32 ETH (since the Pectra upgrade in May 2025, validators can stake up to 2,048 ETH per validator). This stake is your collateral — your "skin in the game." If you validate honestly, you earn rewards ($\approx$ 3–4% APR). If you validate dishonestly or go offline, your stake gets **slashed** (partially or fully destroyed).

**Random selection.** Every 12 seconds, one validator is randomly chosen to propose a block. The randomness is weighted by stake — a validator with 64 ETH is twice as likely to be selected as one with 32 ETH.

**Economic security.** The security of Proof of Stake comes from economics, not computation. Attacking the network requires controlling 1/3 of all staked ETH (to prevent finality) or 2/3 (to finalize fraudulent blocks). With ~$100B+ in staked ETH, this represents one of the most expensive attack targets in the world.

**Validator rewards.** Validators earn rewards from three sources: block proposal rewards (new ETH issuance), attestation rewards (signing off on blocks), and priority fees (tips from users who want their transactions prioritized). These rewards are the "yield" that makes ETH staking possible — and they are the foundation of staking-based DeFi strategies you will study in later modules.

### 3.3 — State, Accounts, and the EVM

Ethereum is a **state machine.** The "state" is the complete snapshot of every account, every balance, and every smart contract's storage at any given moment. Every transaction changes the state.

There are two types of accounts:

**Externally Owned Accounts (EOAs).** These are controlled by private keys — your wallet. They can send transactions and hold ETH. They cannot contain code.

**Contract Accounts.** These are controlled by code (smart contracts). They cannot initiate transactions — they can only respond to transactions sent to them. They can hold ETH, store data, and interact with other contracts.

The **Ethereum Virtual Machine (EVM)** is the computation engine that executes smart contract code. Every node in the network runs the EVM and independently verifies every transaction. This is why Ethereum is sometimes called a "world computer" — it's a distributed computer where every node produces the same result for every computation.

**Why This Matters for DeFi:** When you "approve" a token on Uniswap, you're sending a transaction to the token's smart contract that changes its state — specifically, it updates a mapping that says "Uniswap's contract is now allowed to move X tokens from my address." Understanding that every DeFi action is a state change on a shared computer helps you reason about what's actually happening when you click buttons in a DeFi app.

### 3.4 — Layer 2: Scaling Without Sacrificing Security

Ethereum mainnet (Layer 1) can process roughly 15–30 transactions per second. This is slow and expensive. During periods of high demand, a simple swap can cost $20–100 in fees.

**Layer 2 (L2) networks** solve this by processing transactions off the main chain while inheriting Ethereum's security. The two dominant L2 architectures are:

**Optimistic Rollups (Arbitrum, Optimism, Base).** These batch hundreds of transactions together and post a compressed summary to Ethereum L1. The key assumption: transactions are assumed valid unless someone proves otherwise. There is a **challenge period** (typically 7 days) during which anyone can submit a fraud proof if they detect an invalid transaction. If a fraud proof succeeds, the invalid batch is reversed. This is why withdrawing from an Optimistic Rollup to L1 takes 7 days — you must wait for the challenge period to expire.

**ZK Rollups (zkSync, Scroll, Linea).** These also batch transactions, but instead of assuming validity, they generate a cryptographic proof (a zero-knowledge proof) that mathematically guarantees all transactions in the batch are valid. This proof is verified on L1. Withdrawals are faster because there is no challenge period — the math itself provides the guarantee.

**The tradeoff:** L2s are 10–100x cheaper than L1, but they introduce additional trust assumptions. Most L2s currently have a **centralized sequencer** — a single entity that orders and batches transactions. If the sequencer goes down, the L2 temporarily can't process transactions (though users can always force-exit back to L1 via the rollup's contract). L2Beat.com provides detailed risk assessments for every L2, including sequencer centralization, upgrade authority, and fraud proof status.

**Chain Comparison for DeFi:**

| Property | Ethereum L1 | Arbitrum | Base | Optimism |
|----------|------------|----------|------|----------|
| Transaction cost | $2–50+ | $0.01–0.50 | $0.01–0.30 | $0.01–0.50 |
| Block time | 12 seconds | ~0.25 seconds | ~2 seconds | ~2 seconds |
| Finality | ~13 minutes | ~13 min (via L1) | ~13 min (via L1) | ~13 min (via L1) |
| DeFi TVL | Highest | ~$16B | Growing rapidly | ~$7B |
| Withdrawal to L1 | Instant | 7 days | 7 days | 7 days |
| Sequencer | Decentralized | Centralized | Centralized | Centralized |

**Why This Matters for DeFi:** Most of your DeFi activity will happen on L2s because they're cheaper. But you need to understand the security model. Your assets on Arbitrum are ultimately secured by Ethereum L1 — but only if the rollup mechanism works correctly. The sequencer, the fraud proof system, and the upgrade keys all represent trust assumptions you are making.

---

## 4. Real-World Examples

### 4.1 — The Merge (September 15, 2022)

Ethereum switched from Proof of Work to Proof of Stake — a change equivalent to swapping the engine of an airplane mid-flight. No transactions were lost. No funds were affected. The network's energy consumption dropped by 99.95%. This was the most complex live infrastructure upgrade in blockchain history and demonstrated Ethereum's governance and engineering capacity.

For DeFi, The Merge mattered because it created ETH staking yield. Before The Merge, there was no native yield on ETH. After The Merge, validators earn ~3–4% APR for securing the network. This yield is the foundation of staking leverage loops, liquid staking derivatives (stETH, rETH), and a large portion of DeFi's yield infrastructure.

### 4.2 — Arbitrum's Sequencer Outage (December 2023)

Arbitrum's sequencer went offline for approximately 78 minutes. During this time, no new transactions could be processed on Arbitrum. Users with DeFi positions could not manage them — could not add collateral, could not repay loans, could not exit positions. If a market crash had occurred during the outage, positions could have been liquidated without the user being able to respond.

**Lesson:** L2 sequencer risk is real. Never deploy capital on an L2 that you cannot afford to have inaccessible for hours. Understand that "inherited security from Ethereum" does not mean "identical availability to Ethereum."

### 4.3 — Ethereum's Fee Spikes

During major NFT mints and market panics, Ethereum L1 gas prices have spiked from typical $3–5 levels to $50–200+ per transaction. In May 2022 (Yuga Labs' Otherside mint), gas prices exceeded $450 for a swap. Users trying to deleverage or add collateral during the simultaneous market crash found it prohibitively expensive.

**Lesson:** Gas cost is not a fixed number — it's a variable that spikes exactly when you need transactions the most. This is why professionals plan their gas budgets for worst-case scenarios and keep capital on L2s where fees remain manageable during stress.

---

## 5. Security Considerations

### 5.1 — Your Private Key Is Everything

Your private key (or seed phrase, which generates your private key) is the only thing that controls your funds. There is no "forgot password" option. There is no customer support. If someone obtains your private key, they own your assets. If you lose your private key, your assets are gone permanently.

**Rules:**
- Write your seed phrase on paper or metal. Never store it digitally — not in a notes app, not in a photo, not in cloud storage, not in an email to yourself.
- Store copies in at least two physically separate, secure locations.
- Never enter your seed phrase into any website, app, or form. Legitimate wallets will never ask you to "verify" your seed phrase.
- Purchase hardware wallets only from the manufacturer's official website. Never buy from Amazon resellers or eBay.

### 5.2 — Pseudonymity Is Not Anonymity

Every transaction on Ethereum is publicly visible and permanently recorded. Your wallet address is not tied to your real name by default — this is pseudonymity. But the moment your address is linked to your identity (through a centralized exchange withdrawal, an ENS name, or on-chain analysis), your entire transaction history becomes attributable to you.

**Implication:** Assume everything you do on-chain is publicly visible, linkable, and permanent.

### 5.3 — Finality and Reorg Risk

Until a block is finalized (~13 minutes on Ethereum), it can theoretically be reorganized. This means a transaction that appears "confirmed" could, in rare cases, be reverted. For typical DeFi operations, this risk is negligible. But if you're receiving a large payment, waiting for finality before considering it settled is prudent.

On L2s, finality depends on the L1 confirmation of the rollup batch. A transaction on Arbitrum is "soft-confirmed" by the sequencer in under a second, but it achieves Ethereum-level finality only when the batch is posted and finalized on L1.

### 5.4 — Network Assumptions

Every time you use a blockchain, you are trusting:
- That the consensus mechanism works (validators are honest because the economic incentives make honesty more profitable than cheating)
- That the client software doesn't have critical bugs (multiple client implementations reduce this risk — Ethereum has Geth, Nethermind, Besu, Erigon, and others)
- That the network won't be censored (validators could theoretically refuse to include your transaction, though this is mitigated by the diversity of the validator set)
- On L2s: that the sequencer operates honestly and remains available, and that the rollup's smart contracts on L1 are correct

None of these assumptions has catastrophically failed on Ethereum, but they are assumptions — not guarantees.

---

## 6. Practical Exercise

### Exercise 1.1 — Anatomy of a Block

**Goal:** Learn to read a real Ethereum block on Etherscan.

**Steps:**

1. Open [etherscan.io](https://etherscan.io)
2. In the homepage, find the latest blocks section. Click on any recent block.
3. On the block page, identify and record the following:

   - **Block number** — the sequential identifier (e.g., Block 19,543,271)
   - **Timestamp** — when the block was produced
   - **Transactions** — how many transactions are in this block
   - **Fee Recipient** — the validator address that received the tips
   - **Block Reward** — how much ETH the validator earned
   - **Gas Used / Gas Limit** — how much computation was used vs. the maximum allowed
   - **Base Fee Per Gas** — the minimum gas price set by the protocol (EIP-1559)
   - **Burnt Fees** — how much ETH was burned in this block (reducing total supply)

4. Click on the first transaction in the block. Identify:
   - **From** address (sender)
   - **To** address (recipient or contract)
   - **Value** (ETH transferred)
   - **Transaction Fee** (gas cost in ETH and USD)
   - **Gas Price** (what the user paid per unit of gas)
   - **Status** (Success or Fail)

**Write up your observations:** How many transactions fit in one block? How much did the cheapest and most expensive transactions cost? What percentage of the block's gas capacity was used?

### Exercise 1.2 — Compare L1 vs L2

**Goal:** Understand the cost and speed difference between Ethereum mainnet and a Layer 2.

**Steps:**

1. Open [arbiscan.io](https://arbiscan.io) (Arbitrum's block explorer)
2. Find a recent block and note:
   - Block time (how frequently new blocks are produced)
   - Number of transactions per block
   - Average transaction fee
3. Compare your findings with the Ethereum L1 block from Exercise 1.1

**Questions to answer:**
- How much cheaper is a transaction on Arbitrum compared to Ethereum mainnet?
- How much faster are blocks produced?
- Can you find the L1 batch submission transaction that anchors these L2 blocks to Ethereum?

### Exercise 1.3 — Track the Validators

**Goal:** Understand who secures the network.

**Steps:**

1. Go to [beaconcha.in](https://beaconcha.in) — Ethereum's beacon chain explorer
2. Navigate to the Validators page
3. Note:
   - Total number of active validators
   - Total ETH staked
   - Current APR for validators
   - What percentage of validators are operated by Lido, Coinbase, and other large entities

**Reflection:** What does it mean for decentralization if one entity (like Lido) controls a significant percentage of all staked ETH? What risks does this create?

---

## 7. AI Tutor Q&A Examples

These are example questions a student might ask, with the answers a tutor would give. Use these as self-study checkpoints.

---

**Q: If blockchains are so secure, why do DeFi hacks happen?**

A: Blockchains are secure at the consensus layer — it's extremely difficult to produce a fraudulent block or reverse a finalized transaction. But DeFi hacks don't attack the blockchain itself. They attack the smart contracts running on top of the blockchain. A smart contract is code, and code can have bugs. The blockchain will faithfully execute a buggy smart contract exactly as written — including the bug. The blockchain doesn't know the difference between a legitimate transaction and an exploit. It just executes instructions. This is why smart contract security (audits, bug bounties, time in production) matters so much.

---

**Q: What actually happens to my ETH when I "stake" it?**

A: When you stake ETH, you lock it in the Ethereum beacon chain's deposit contract. It becomes collateral that you put at risk to vouch for your honest behavior as a validator (or as a delegator through a staking service). In return, the network pays you rewards — currently around 3–4% APR — for helping validate blocks. Your staked ETH is not being lent to anyone. It's not being traded. It's locked as a security deposit. The yield comes from the Ethereum protocol itself, which creates new ETH to reward validators for securing the network. This is the closest thing in crypto to a "risk-free rate" — though it is not risk-free (slashing, smart contract risk in liquid staking protocols, etc.).

---

**Q: Why should I care about Layer 2s if Ethereum is the most secure?**

A: Because Ethereum mainnet is expensive. A simple token swap can cost $5–20 in normal conditions and $50–200+ during peak demand. If you're managing a $1,000 DeFi portfolio, paying $20 per transaction makes most strategies unprofitable. Layer 2s let you do the same operations for $0.01–0.50 while inheriting Ethereum's security guarantees (with some caveats around sequencer risk and withdrawal delays). Almost all active DeFi users operate primarily on L2s. Understanding when to use L1 vs. L2 — and the tradeoffs involved — is a core operational skill.

---

**Q: Can Ethereum be shut down?**

A: There is no off switch. To "shut down" Ethereum, you would need to simultaneously shut down thousands of independent computers running nodes across dozens of countries. Even if a government banned Ethereum nodes in its jurisdiction, nodes in other jurisdictions would continue operating. The network is designed to be resilient against any single point of failure. However, Ethereum can be *degraded* — if a large percentage of validators go offline simultaneously (coordinated hosting provider outage, for example), block production slows and finality is delayed. It doesn't stop, but it gets slower and less reliable until validators come back online.

---

**Q: What's the difference between a blockchain and a regular database?**

A: Three things. First, a regular database has an administrator who can edit, delete, or modify any record. A blockchain has no administrator — records are immutable once finalized. Second, a regular database stores one copy in one place (or replicated copies controlled by one organization). A blockchain stores independent copies across thousands of nodes controlled by different entities. Third, a regular database trusts the operator to be honest. A blockchain replaces trust with verification — every node independently verifies every transaction. The tradeoff: blockchains are slower, more expensive, and less storage-efficient than regular databases. They only make sense when you need trustless, censorship-resistant record-keeping — which is exactly what DeFi requires.

---

## 8. Key Takeaways

**1. A blockchain is a trustless, append-only database maintained by a decentralized network.** It exists to solve one problem: how to maintain a shared ledger without a trusted intermediary. This is the foundation of all DeFi.

**2. Every DeFi action is a transaction that changes the blockchain's state.** When you swap tokens, supply collateral, or borrow assets, you are sending a transaction to a smart contract that updates the global ledger. Understanding transactions means understanding DeFi.

**3. Ethereum's Proof of Stake secures the network through economic incentives, not computation.** Validators stake ETH as collateral. Honest behavior is profitable. Dishonest behavior destroys your capital. The staking yield this creates (~3–4% APR) is the foundation of DeFi's yield infrastructure.

**4. Finality takes ~13 minutes on Ethereum.** Until then, transactions are "confirmed" but theoretically reversible. After finality, reversing a transaction would require destroying billions of dollars worth of staked ETH.

**5. Layer 2 networks are where most DeFi activity happens.** They provide 10–100x cost reduction while inheriting Ethereum's security. But they add trust assumptions: centralized sequencers, upgrade keys, and challenge/proof systems that can have bugs.

**6. Your private key is the only access control.** There is no recovery mechanism. Protecting your private key is not one security practice among many — it is the security practice. Everything else is secondary.

**7. The blockchain executes code faithfully — including bugs.** This is why DeFi hacks happen not at the blockchain layer, but at the smart contract layer. The security of any DeFi protocol is the security of its code, not the security of Ethereum itself.

---

## Navigation

| Previous | Current | Next |
|----------|---------|------|
| — | **Module 1: Blockchain Fundamentals** | Module 2: Wallets & Security →|

---

*Module 1 complete. This module establishes the technical foundation that every subsequent module builds upon. A student who understands these concepts can reason about where security comes from, where risks hide, and why DeFi architecture looks the way it does.*
