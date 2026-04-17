# Lesson 1.4 — The Life of a Transaction

**Module:** 1 — Blockchain Fundamentals
**Duration:** 12 minutes
**Exercise:** ✓ Read a real block on Etherscan

---

## Full Explanation

Every action in DeFi starts with a transaction. When you swap tokens, supply collateral, claim yield, or vote on governance, you are sending a signed instruction to the Ethereum network. Understanding exactly how that instruction moves from your wallet to being permanently written into the blockchain is one of the most valuable pieces of mechanical knowledge you can have as a DeFi operator.

Most users never think about this process. They click "Swap," wait for the green checkmark, and move on. But knowing the full lifecycle lets you reason about: why transactions sometimes fail, why MEV bots can exploit your swaps, what "finality" really means, how long to wait before considering a transfer settled, and how to respond when things go wrong.

We'll trace the transaction through seven stages.

### Stage 1 — Creation

Transactions begin in your wallet. When you click "Swap" on Uniswap or "Supply" on Aave, the dApp constructs a transaction object and hands it to your wallet. The transaction object specifies:

- **Sender:** your address (the one paying for and authorizing the transaction)
- **Recipient:** the address receiving the transaction — for DeFi, this is almost always a smart contract address, not another user
- **Value:** how much ETH to send directly (often zero for DeFi operations that move tokens rather than ETH)
- **Data:** the function call and parameters — the actual instruction for the smart contract
- **Gas limit:** the maximum computation you're willing to pay for
- **Max fee / priority fee:** the gas pricing parameters (covered in Module 3)
- **Nonce:** a sequential number ensuring transactions process in order from your address

At this point, the transaction exists only locally in your wallet. It has not touched the network yet.

### Stage 2 — Signing

This is where your private key matters. Your wallet uses your private key to create a digital signature — a mathematical proof that the transaction came from you and has not been tampered with. The signature is specific to both your key and this exact transaction. It cannot be reused for any other transaction.

When you click "Confirm" in MetaMask or Rabby, you are authorizing this signature. Your private key performs the signing operation inside the wallet (or on your hardware wallet if you have one connected). The signed transaction is the thing that will actually be broadcast.

This is why protecting your private key is the single most important security practice in crypto. The signature IS the authorization. Anyone with your private key can sign transactions from your address and drain your funds. There is no additional verification step — the blockchain trusts any transaction with a valid signature.

### Stage 3 — Broadcasting

Your wallet sends the signed transaction to the Ethereum network through an RPC (Remote Procedure Call) endpoint. This endpoint is typically provided by services like Infura, Alchemy, or your wallet's built-in infrastructure.

The RPC forwards your transaction to a node in the Ethereum network. That node then propagates the transaction to its peers. Within a few seconds, your transaction is known to virtually every node in the network.

The transaction now lives in the **mempool** — a waiting area of pending transactions that haven't been included in a block yet. The mempool is not a single place — every node maintains its own view of pending transactions. But through peer-to-peer communication, mempool contents synchronize across the network.

**Critical fact:** the mempool is public. Anyone can see pending transactions before they are included in a block. This is the foundation of MEV (Maximal Extractable Value) — bots watching the mempool can identify profitable patterns in pending transactions and insert their own transactions to extract value. This is covered in depth in Module 9.

### Stage 4 — Block Building

In Ethereum's current architecture (after the Pectra upgrade), block production follows a Proposer-Builder Separation (PBS) model. There are two specialized roles:

**Block builders** are professional entities that select transactions from the mempool and assemble them into a block. They compete to build the most profitable block — one that includes the highest-paying transactions, captures MEV opportunities efficiently, and maximizes total fees. Builders don't propose blocks themselves. They construct blocks and submit bids to proposers.

**Block proposers** are validators — people or entities who have staked 32+ ETH (up to 2,048 ETH after Pectra) to secure the network. One proposer is selected randomly for each slot (every 12 seconds). The selected proposer reviews bids from builders and chooses the block with the highest bid. The proposer's job is essentially to select a block, not to construct one.

This separation is important for decentralization: it means that even small validators (who may not have the sophistication to build optimal MEV-extracting blocks) can still earn the full reward by outsourcing block construction to specialized builders.

### Stage 5 — Block Proposal

Every 12 seconds, one validator is randomly selected to propose the next block. The randomness is weighted by stake — a validator with 64 ETH staked is twice as likely to be selected as one with 32 ETH.

The selected proposer chooses a block (usually from a builder via the PBS system) and broadcasts it to the network. At this point, your transaction is included in a block — but the block has not yet been accepted by the network.

### Stage 6 — Attestation

Other validators examine the proposed block. They check: Is the block structurally valid? Do all transactions follow the rules? Does the block correctly reference its parent? Is the state transition correct?

If the block looks valid, validators **attest** to it — they sign a statement saying "yes, this block is valid." A block needs attestations from at least 2/3 of active validators (currently ~940,000 validators) to be considered accepted.

This attestation process happens rapidly. Within seconds of a block being proposed, attestations flood in from validators around the world. For most purposes, once a block has received sufficient attestations, you can consider the transaction "confirmed."

### Stage 7 — Finality

A block is considered **finalized** after two epochs have passed. An epoch is 32 slots × 12 seconds = 6.4 minutes. Two epochs is 12.8 minutes. Finality is the strongest guarantee Ethereum offers.

A finalized block cannot be reversed without destroying at least 1/3 of all staked ETH — an attack that would cost billions of dollars in slashed stake. This makes finalized transactions effectively permanent.

**The practical distinction:**
- **Pending:** In the mempool, not yet in a block. Typically 1–30 seconds.
- **Confirmed:** Included in a block with attestations. Typically 12–30 seconds after submission. Reversal is extremely unlikely but not mathematically impossible.
- **Finalized:** 12.8 minutes after inclusion. Reversal requires destroying >$10B+ in stake. Treat as permanent.

For typical DeFi operations (under $10,000), confirmed is usually sufficient to proceed. For high-value operations, waiting for finality reduces reorganization risk to essentially zero.

### What Can Go Wrong at Each Stage

Understanding the full lifecycle lets you diagnose failures:

- **Creation failures:** dApp constructed an invalid transaction. Usually a frontend issue. Try a different dApp interface or refresh.
- **Signing failures:** Wallet failed to sign. Try disconnecting and reconnecting, or restart the wallet extension.
- **Broadcasting failures:** RPC endpoint is down or overloaded. Try a different RPC.
- **Stuck in mempool:** Gas price too low — your transaction sits there indefinitely while higher-paying transactions are processed first. Solution: replace with a same-nonce transaction at a higher gas price (covered in Module 3).
- **Included but failed:** The transaction was processed but reverted during execution (for example, slippage tolerance exceeded, or a required condition wasn't met). You still pay gas for the computation that ran before the revert. The failure appears on Etherscan with a "Fail" status.
- **Included and successful:** The transaction executed correctly and state was updated. Etherscan shows "Success."

### Why This Matters for DeFi Operations

Every DeFi interaction follows this same lifecycle. When you understand the seven stages, you can answer operational questions with precision:

- When I submit a large swap, where are MEV bots watching? (Stage 3: mempool)
- How long should I wait before considering a bridge deposit safe? (Usually finality — Stage 7)
- Why did my transaction fail after I signed it? (Either Stage 5 or Stage 6 — the EVM rejected execution, often due to changed market conditions)
- How can I speed up a stuck transaction? (Replace with higher-fee tx using same nonce, re-entering Stage 3)

This mechanical knowledge is what separates DeFi operators from DeFi users.

---

## Slide Summary

**Slide 1 — Title: The Life of a Transaction**
- Every DeFi action = a transaction
- Understanding the lifecycle lets you diagnose failures and assess finality
- Seven stages from creation to permanence

**Slide 2 — Stages 1–3: Your Side**
- **Creation:** dApp builds transaction object (sender, recipient, data, gas)
- **Signing:** Your private key creates digital signature — the authorization
- **Broadcasting:** Signed tx enters the mempool (public waiting area)

**Slide 3 — Stage 4: Block Building (PBS)**
- Builders construct blocks from mempool transactions
- Validators propose blocks from builder bids
- Proposer-Builder Separation allows small validators to compete fairly

**Slide 4 — Stages 5–7: Network Acceptance**
- **Proposal:** Validator broadcasts block every 12 seconds
- **Attestation:** 2/3 of validators must sign off
- **Finality:** 12.8 minutes later, reversal costs $10B+ in slashed stake

**Slide 5 — Three Levels of Confidence**
- Pending: in mempool (seconds)
- Confirmed: in block with attestations (~12–30 sec)
- Finalized: 12.8 min later, effectively permanent

**Slide 6 — What Can Go Wrong**
- Stuck in mempool: gas too low → replace with same-nonce higher-fee tx
- Included but failed: reverted during execution, you still pay gas
- Key insight: every failure maps to a specific stage

---

## Voice Narration Script

Every action you take in DeFi starts with a transaction. Swap tokens, supply collateral, claim yield, vote on governance — each of these is a signed instruction you send to the Ethereum network. Understanding exactly how that instruction moves from your wallet to being permanently written into the blockchain is one of the most valuable pieces of mechanical knowledge you can have.

Most users never think about this process. They click "Swap," wait for the green checkmark, and move on. But knowing the full lifecycle lets you reason about why transactions sometimes fail, why MEV bots can exploit your swaps, what "finality" really means, how long to wait before considering a transfer settled, and how to respond when things go wrong.

We'll trace the transaction through seven stages. Pay attention to these — we'll come back to every one of them in later modules.

Stage one: creation.

Transactions begin in your wallet. When you click "Swap" on Uniswap or "Supply" on Aave, the dApp constructs a transaction object and hands it to your wallet. The transaction object specifies your address as sender, the contract address as recipient, how much ETH to send directly — often zero for token operations — the function call and parameters in the data field, a gas limit, gas pricing parameters, and a nonce. The nonce is a sequential number that ensures transactions from your address process in order. At this point, the transaction exists only locally in your wallet. It hasn't touched the network yet.

Stage two: signing.

This is where your private key matters. Your wallet uses your private key to create a digital signature — a mathematical proof that the transaction came from you and hasn't been tampered with. The signature is specific to your key and to this exact transaction. It cannot be reused for any other transaction.

When you click "Confirm" in MetaMask or Rabby, you're authorizing this signature. Your private key performs the signing inside the wallet — or on your hardware wallet if you have one connected. The signed transaction is the thing that will actually be broadcast.

This is why protecting your private key is the most important security practice in crypto. The signature IS the authorization. Anyone with your private key can sign transactions from your address and drain your funds. There's no additional verification step — the blockchain trusts any transaction with a valid signature.

Stage three: broadcasting.

Your wallet sends the signed transaction to the Ethereum network through an RPC endpoint. The RPC forwards it to a node in the network. That node propagates it to its peers. Within a few seconds, your transaction is known to virtually every node.

The transaction now lives in the mempool — a waiting area of pending transactions. The mempool isn't a single place. Every node maintains its own view. But through peer-to-peer communication, mempool contents synchronize.

Here's a critical fact: the mempool is public. Anyone can see pending transactions before they're included in a block. This is the foundation of MEV — Maximal Extractable Value. Bots watching the mempool can identify profitable patterns in pending transactions and insert their own transactions to extract value from yours. We'll cover this in depth in Module 9. For now, just know that when your transaction enters the mempool, it's visible.

Stage four: block building.

In Ethereum's current architecture, block production follows something called Proposer-Builder Separation, or PBS. There are two specialized roles.

Block builders are professional entities that select transactions from the mempool and assemble them into a block. They compete to build the most profitable block — one that includes the highest-paying transactions and captures MEV efficiently. Builders don't propose blocks themselves. They construct blocks and submit bids to proposers.

Block proposers are validators — people or entities who have staked thirty-two or more ETH to secure the network. One proposer is selected randomly for each slot, every twelve seconds. The selected proposer reviews bids from builders and picks the block with the highest bid.

This separation is important for decentralization. It means small validators can still compete fairly, because they don't need to be MEV experts — they just choose the highest-paying block.

Stage five: block proposal.

Every twelve seconds, one validator is randomly selected to propose the next block. The randomness is weighted by stake. A validator with sixty-four ETH staked is twice as likely to be selected as one with thirty-two ETH.

The selected proposer chooses a block — usually from a builder via PBS — and broadcasts it to the network. At this point, your transaction is included in a block. But the block hasn't been accepted by the network yet.

Stage six: attestation.

Other validators examine the proposed block. They check: Is the block structurally valid? Do all transactions follow the rules? Does it correctly reference its parent? Is the state transition correct?

If the block looks valid, validators attest to it. A block needs attestations from at least two-thirds of active validators — currently around nine hundred forty thousand validators — to be considered accepted.

This attestation process happens rapidly. Within seconds of a block being proposed, attestations flood in from validators around the world. For most purposes, once a block has received sufficient attestations, you can consider the transaction confirmed.

Stage seven: finality.

A block is considered finalized after two epochs have passed. An epoch is thirty-two slots, which is thirty-two times twelve seconds, equal to six point four minutes. Two epochs is twelve point eight minutes. Finality is the strongest guarantee Ethereum offers.

A finalized block cannot be reversed without destroying at least one-third of all staked ETH — an attack that would cost billions of dollars in slashed stake. This makes finalized transactions effectively permanent.

So here are the three levels of confidence you should internalize. Pending means in the mempool, not yet in a block — typically one to thirty seconds. Confirmed means included in a block with attestations — typically twelve to thirty seconds after submission. Finalized means twelve point eight minutes after inclusion, with reversal costing billions.

For typical DeFi operations under ten thousand dollars, confirmed is usually sufficient. For high-value operations — large bridge transfers, big rebalances — wait for finality to reduce reorganization risk to essentially zero.

Let me give you some practical failure modes you'll encounter.

First: creation failures. The dApp constructed an invalid transaction. Usually a frontend issue. Refresh or try a different dApp interface.

Second: stuck in mempool. Your gas price was too low. Higher-paying transactions kept cutting in line ahead of yours. The fix: replace with a same-nonce transaction at a higher gas price. We'll cover this technique in Module 3.

Third: included but failed. The transaction was processed but reverted during execution. Common causes: slippage tolerance exceeded, or a required condition wasn't met when the transaction actually ran. You still pay gas for the computation that ran before the revert. On Etherscan, this appears with a "Fail" status.

Fourth: included and successful. The normal case. The transaction executed correctly, state was updated, Etherscan shows "Success."

Every DeFi interaction follows this same lifecycle. Swap, supply, borrow, bridge, vote — all of them. When you understand the seven stages, you can answer operational questions with precision. Where are MEV bots watching? Stage three — the mempool. How long should I wait before considering a bridge deposit safe? Usually finality — stage seven. Why did my transaction fail after I signed it? Stage five or six — the EVM rejected execution, often because market conditions changed between when you signed and when it got processed.

This mechanical knowledge is what separates DeFi operators from DeFi users. In the practical exercise for this lesson, you'll read a real Ethereum block on Etherscan and identify these components for yourself.

In the next lesson, we'll look at Proof of Stake in more detail — how validators actually work, where the staking yield comes from, and why it's the foundation of DeFi's entire yield stack.

---

## Visual Suggestions

1. **[0:00–0:20]** Lesson title card: "The Life of a Transaction"
2. **[0:20–1:30]** Full lifecycle flow diagram as a horizontal timeline: 7 numbered stages from left (Creation) to right (Finality), with arrows showing progression. This diagram should appear multiple times throughout the video, with the current stage highlighted
3. **[1:30–3:00]** Stage 1 zoom: Wallet interface showing a transaction being constructed, with labeled fields (sender, recipient, value, data, gas, nonce)
4. **[3:00–4:00]** Stage 2 zoom: Animated diagram showing the private key signing a transaction hash. Include a visual representation that the signed output is unique and cannot be reused
5. **[4:00–5:30]** Stage 3 zoom: Network animation — transaction radiating outward from one node to many peers. Then the mempool visualization: a "waiting room" of pending transactions, with a "MEV bots watching" callout
6. **[5:30–7:00]** Stage 4 zoom: PBS architecture diagram. Builders shown as specialists constructing blocks, Proposers shown as validators selecting from bids. Arrows showing the bid-selection flow
7. **[7:00–8:30]** Stages 5–6: Block being broadcast, then nodes attesting one by one as little check marks appear. Counter showing "attestations reached 2/3 threshold" moment
8. **[8:30–9:30]** Stage 7: Timeline showing 12 seconds → block, 12.8 minutes → finality. Visual bar representing "reversal cost" filling up as time passes ($10B+ by finality)
9. **[9:30–10:30]** Three-card summary: Pending / Confirmed / Finalized with the approximate timing and typical use cases for each
10. **[10:30–11:30]** Etherscan transaction page walkthrough: Success transaction vs Failed transaction side by side. Callouts to the "Status" field and the relevant stages
11. **[11:30–12:00]** Closing summary with the seven stages listed one more time

---

## Practical Exercise

### Exercise 1.4 — Anatomy of a Real Block

**Goal:** Move theory into observation. You've learned about block structure, transactions, validators, and finality. Now find a real Ethereum block and identify these components.

**Steps:**

1. Open [etherscan.io](https://etherscan.io)
2. On the homepage, locate the "Latest Blocks" section. Click on any recent block.
3. On the block page, record the following fields:
   - **Block number** (sequential identifier)
   - **Timestamp** (when it was produced)
   - **Transactions** (how many in this block)
   - **Fee Recipient** (the validator address that received fees)
   - **Block Reward** (how much ETH the validator earned)
   - **Gas Used / Gas Limit** (utilization ratio)
   - **Base Fee Per Gas** (the protocol-set minimum)
   - **Burnt Fees** (ETH destroyed in this block per EIP-1559)

4. Click the "Transactions" tab for this block. Select the first transaction. Record:
   - **From address** (sender)
   - **To address** (recipient — is it a contract or a wallet?)
   - **Value** (ETH transferred directly)
   - **Transaction Fee** (gas cost in ETH and USD)
   - **Gas Price** (what the user paid per unit)
   - **Status** (Success or Fail)

5. On the transaction page, click "Show More" or the "More Details" link to see the Input Data. If the contract is verified, Etherscan will decode it — identify what function was called.

**Deliverable:** A screenshot or text record of the above fields, plus a one-paragraph plain-English summary of what happened in this transaction.

**Example summary format:**
"Block 19,543,271 was produced at 2026-04-16 10:42:12 UTC. It contained 187 transactions. The validator earned 0.031 ETH in fees. The first transaction was an ETH transfer of 0.5 ETH from wallet 0xABC... to wallet 0xDEF..., paying $2.15 in gas. Status: Success."

**Estimated time:** 15 minutes.

**Why this matters:** Reading Etherscan fluently is the foundation of all on-chain analysis. Every future lesson that involves investigating transactions, debugging failures, or analyzing protocol behavior starts with the ability to read a block.

---

*Next: Lesson 1.5 — Proof of Stake and Validator Economics*
