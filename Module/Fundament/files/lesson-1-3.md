# Lesson 1.3 — Ethereum vs Bitcoin: Programmable Smart Contracts

**Module:** 1 — Blockchain Fundamentals
**Duration:** 8 minutes
**Exercise:** No hands-on exercise (conceptual foundation)

---

## Full Explanation

Bitcoin and Ethereum are both blockchains, and both share the three structural properties we covered in Lesson 1.2 — they are append-only, distributed, and consensus-driven. But they are profoundly different in what they can *do*. Understanding this difference is essential because DeFi is fundamentally impossible on Bitcoin's design. DeFi exists because of a specific architectural choice Ethereum made.

### What Bitcoin Does

Bitcoin was launched in 2009 by the pseudonymous Satoshi Nakamoto. It does one thing: it transfers value. The Bitcoin blockchain records who sent how much BTC to whom. Every transaction is a transfer from one address to another.

Bitcoin has a very simple transaction model. You can send Bitcoin. You can receive Bitcoin. There is a limited scripting language that allows some basic conditional logic — multisig wallets, time-locked transactions — but it was deliberately constrained. Satoshi wanted Bitcoin to be narrow and robust. A single-purpose tool, done exceptionally well.

This narrow focus is a feature, not a limitation. Bitcoin's design minimizes attack surface. There is less code, fewer features, fewer things that can go wrong. This is why Bitcoin is often described as "digital gold" — a store of value that does exactly one thing reliably for fourteen years now.

But you cannot build a lending protocol on Bitcoin. You cannot build a decentralized exchange. You cannot build an automated yield strategy. The scripting language is intentionally too limited to express these applications.

### What Ethereum Added

Ethereum launched in 2015 with a fundamentally different design philosophy. Instead of a narrow payment system, Ethereum's creator Vitalik Buterin wanted a **general-purpose computation layer** — a blockchain where arbitrary programs could run.

The key innovation was the Ethereum Virtual Machine, or EVM. The EVM is a computation engine that executes code. Every Ethereum node runs the EVM and independently verifies every computation. This means Ethereum is, in a real sense, a globally distributed computer — one where every node produces the same result for every calculation.

The programs that run on the EVM are called **smart contracts**. A smart contract is simply code that lives on the blockchain and executes when it receives a transaction. It can hold ETH. It can hold other tokens. It can read from storage. It can write to storage. It can call other smart contracts. It can do essentially any computation.

And critically: once deployed, smart contracts run exactly as written, every time, for everyone, without anyone being able to stop or modify them (unless the contract was specifically built with upgrade mechanisms).

### Smart Contracts Are DeFi

Here is the insight that unlocks everything else in this course: **every DeFi protocol is a set of smart contracts.**

When you "use" Uniswap, you are not connecting to Uniswap Labs' servers. Uniswap Labs operates a website — but the actual exchange is a set of smart contracts deployed on Ethereum. Your wallet sends a transaction to those smart contracts. The smart contracts calculate the swap, move your tokens, update internal state, and emit an event log. No humans are involved in the execution. The contracts run exactly as their code specifies.

When you supply capital to Aave, you are calling the `supply()` function on Aave's smart contract. When you borrow, you call `borrow()`. The contract checks your collateral, calculates interest rates, updates the lending pool's state, and credits you with aTokens representing your deposit. Every rule — every interest rate curve, every liquidation threshold, every fee parameter — is encoded in the smart contract's code.

This is why DeFi works without traditional institutions. The "institution" is replaced by a smart contract. The contract enforces the rules. The blockchain guarantees the contract runs as written.

### An Example: How a Swap Actually Works

Let's trace what happens when you swap USDC for ETH on Uniswap.

1. Your wallet constructs a transaction calling the `exactInputSingle` function on the Uniswap V3 Router contract, with parameters: token in (USDC), token out (ETH), amount (1,000 USDC), pool fee (0.05%), slippage protection (minimum acceptable ETH amount).

2. Your wallet signs this transaction with your private key.

3. The signed transaction is broadcast to the Ethereum network.

4. A validator includes the transaction in a block.

5. The EVM executes the transaction. This means: the Router contract receives the call → verifies the pool exists → calls the USDC token contract to transfer 1,000 USDC from your address to the pool contract (this only works because you previously approved it) → calculates the output amount using the pool's mathematical formula → instructs the pool to transfer the calculated ETH amount to your address → checks that the output amount meets your slippage requirement → emits a Swap event.

6. The block is finalized. The state changes are now permanent.

At no point did Uniswap Labs — the company — participate in this transaction. They wrote the code and deployed it, but the execution is entirely autonomous. If Uniswap Labs went bankrupt tomorrow, the smart contract would continue working.

### Why Ethereum Chose This Design

Ethereum's general-purpose computation model is more expressive than Bitcoin's narrow payment model, but it comes with costs.

More expressiveness means more complexity. More complexity means larger attack surface. Ethereum has experienced significant exploits over the years — the DAO hack in 2016, countless smart contract bugs, oracle manipulations. Bitcoin's narrow design has had essentially no protocol-level exploits. This is a real tradeoff.

More expressiveness also means more computation, which means higher gas costs and lower throughput. Bitcoin's simpler transactions are faster and cheaper to verify. Ethereum's arbitrary computation is more resource-intensive.

But the expressiveness is what makes DeFi possible. You simply cannot build automated market makers, leverage loops, or cross-protocol yield strategies on a system that only supports value transfer. DeFi requires programmability, and Ethereum was the first blockchain to deliver programmability at scale.

### The EVM Ecosystem

Because Ethereum's EVM design is well-documented, other blockchains have adopted EVM compatibility — Arbitrum, Optimism, Base, Polygon, BNB Chain, Avalanche, and many more all run EVM-compatible environments. This means the same smart contract code can run on multiple chains. A developer who learns Solidity (Ethereum's main programming language) can deploy to dozens of different networks.

For DeFi users, this means the concepts you learn about Ethereum apply broadly. A Uniswap V3 pool works the same way on Ethereum mainnet as it does on Arbitrum. Aave's lending mechanics are identical on Optimism as on Polygon. The underlying computational model is the same.

This course focuses on EVM chains — Ethereum and its Layer 2s — because they dominate DeFi TVL and because the mechanical understanding transfers cleanly between them. Non-EVM ecosystems (Solana, Cosmos, Bitcoin L2s) operate on different principles and deserve separate study.

### The Key Takeaway

Bitcoin gave the world a digital asset that cannot be inflated, seized, or double-spent. That was a revolutionary achievement. But Bitcoin cannot host DeFi.

Ethereum gave the world a programmable, distributed computer. This is a different revolutionary achievement — one that made automated, trustless financial protocols possible. Every lending market, every DEX, every yield strategy, every vault, every liquidity pool you will study in this course exists because Ethereum enabled arbitrary code to run on a blockchain.

When you evaluate any DeFi protocol, you are evaluating a piece of software running on the EVM. The blockchain underneath is reliable. The EVM faithfully executes whatever the contract says to do. The interesting questions — is the code correct, is it secure, does it do what it claims — all live at the smart contract layer.

---

## Slide Summary

**Slide 1 — Title: Ethereum vs Bitcoin**
- Both are blockchains with the same structural properties
- Profoundly different in what they can do
- Understanding this difference explains why DeFi is possible

**Slide 2 — What Bitcoin Does**
- Launched 2009 by Satoshi Nakamoto
- Single purpose: transfer value (who sent how much BTC to whom)
- Deliberately narrow scripting language
- Design philosophy: do one thing exceptionally well

**Slide 3 — What Ethereum Added**
- Launched 2015 — general-purpose computation layer
- Introduces the Ethereum Virtual Machine (EVM)
- Every node runs the EVM and verifies every computation
- Smart contracts: code that lives and runs on the blockchain

**Slide 4 — Smart Contracts Are DeFi**
- Every DeFi protocol = a set of smart contracts
- When you "use" Uniswap, you're calling its contracts
- No human execution — contracts run as written
- The "institution" is replaced by code

**Slide 5 — Example: A Swap on Uniswap**
- Your wallet signs a transaction → calls Router contract
- Router calculates output, moves tokens through pool
- Emits Swap event, finalizes on-chain
- Uniswap Labs never participates. Code handles it all.

**Slide 6 — The Tradeoff**
- More expressiveness = larger attack surface
- Bitcoin's simplicity = fewer bugs, but no DeFi
- Ethereum's programmability = DeFi possible, but more risk
- This course focuses on the EVM ecosystem where all the complexity lives

---

## Voice Narration Script

Both Bitcoin and Ethereum are blockchains. They share those three structural properties we covered last time — they're both append-only, both distributed, both consensus-driven. But they are profoundly different in what they can *do*. Understanding this difference is essential, because DeFi is fundamentally impossible on Bitcoin's design. DeFi only exists because of a specific architectural choice that Ethereum made.

Let's start with Bitcoin.

Bitcoin launched in 2009, created by the pseudonymous Satoshi Nakamoto. It does one thing: it transfers value. The Bitcoin blockchain records who sent how much BTC to whom. Every transaction is a transfer from one address to another.

Bitcoin has a very simple transaction model. You can send Bitcoin. You can receive Bitcoin. There's a limited scripting language that allows some basic conditional logic — things like multisig wallets or time-locked transactions — but it was deliberately constrained. Satoshi wanted Bitcoin to be narrow and robust. A single-purpose tool done exceptionally well.

This narrow focus is a feature, not a limitation. Bitcoin's design minimizes attack surface. There's less code, fewer features, fewer things that can go wrong. This is why people often describe Bitcoin as "digital gold" — a store of value that does exactly one thing reliably. And it's done that one thing for fourteen years without a protocol-level exploit.

But here's the thing. You can't build a lending protocol on Bitcoin. You can't build a decentralized exchange. You can't build an automated yield strategy. The scripting language is intentionally too limited to express these applications.

This is where Ethereum comes in.

Ethereum launched in 2015 with a fundamentally different design philosophy. Instead of a narrow payment system, Ethereum's creator Vitalik Buterin wanted a general-purpose computation layer — a blockchain where arbitrary programs could run.

The key innovation was something called the Ethereum Virtual Machine, or EVM. Think of the EVM as a computation engine that executes code. Every Ethereum node runs the EVM and independently verifies every computation. This means Ethereum is, in a real sense, a globally distributed computer — one where every node produces the same result for every calculation.

The programs that run on the EVM are called smart contracts. A smart contract is simply code that lives on the blockchain and executes when it receives a transaction. It can hold ETH. It can hold other tokens. It can read from storage. It can write to storage. It can call other smart contracts. It can do essentially any computation.

And here's the critical part: once deployed, smart contracts run exactly as written, every time, for everyone, without anyone being able to stop or modify them — unless the contract was specifically built with upgrade mechanisms.

Now here's the insight that unlocks everything else in this course. Every DeFi protocol is a set of smart contracts.

When you "use" Uniswap, you're not connecting to Uniswap Labs' servers. Uniswap Labs operates a website — but the actual exchange is a set of smart contracts deployed on Ethereum. Your wallet sends a transaction to those smart contracts. The smart contracts calculate the swap. They move your tokens. They update internal state. They emit an event log. No humans are involved in execution. The contracts run exactly as their code specifies.

When you supply capital to Aave, you're calling the "supply" function on Aave's smart contract. When you borrow, you call "borrow." The contract checks your collateral, calculates interest rates, updates the lending pool's state, and credits you with aTokens representing your deposit. Every rule — every interest rate curve, every liquidation threshold, every fee parameter — is encoded in the smart contract's code.

This is why DeFi works without traditional institutions. The "institution" is replaced by a smart contract. The contract enforces the rules. The blockchain guarantees that the contract runs as written.

Let me walk you through a concrete example. Trace what happens when you swap USDC for ETH on Uniswap.

Your wallet constructs a transaction calling the "exactInputSingle" function on the Uniswap V3 Router contract. The parameters say: token in is USDC, token out is ETH, amount is one thousand USDC, pool fee is zero point zero-five percent, and there's slippage protection specifying a minimum acceptable ETH amount.

Your wallet signs this transaction with your private key. The signed transaction gets broadcast to the Ethereum network. A validator includes it in a block.

Then the EVM executes it. Here's what happens in that execution: the Router contract receives the call. It verifies the pool exists. It calls the USDC token contract to transfer one thousand USDC from your address to the pool contract. It calculates the output amount using the pool's mathematical formula. It instructs the pool to transfer the calculated ETH amount to your address. It checks that the output amount meets your slippage requirement. And it emits a Swap event.

The block finalizes. The state changes are permanent.

At no point in any of this did Uniswap Labs — the company — participate in the transaction. They wrote the code and deployed it, but the execution is entirely autonomous. If Uniswap Labs went bankrupt tomorrow, the smart contract would continue working.

Now I want to be honest about the tradeoff here. Ethereum's general-purpose computation model is more expressive than Bitcoin's narrow payment model, but it comes with costs.

More expressiveness means more complexity. More complexity means larger attack surface. Ethereum has had significant exploits over the years — the DAO hack in 2016, countless smart contract bugs, oracle manipulations. Bitcoin's narrow design has had essentially no protocol-level exploits. That's a real tradeoff.

But the expressiveness is what makes DeFi possible. You simply cannot build automated market makers, leverage loops, or cross-protocol yield strategies on a system that only supports value transfer. DeFi requires programmability, and Ethereum was the first blockchain to deliver programmability at scale.

One last thing to mention. Because Ethereum's EVM design is well-documented, other blockchains have adopted EVM compatibility. Arbitrum, Optimism, Base, Polygon, BNB Chain, Avalanche — they all run EVM-compatible environments. This means the same smart contract code can run on multiple chains. When you learn about Uniswap's mechanics on Ethereum, that same understanding applies to Uniswap on Arbitrum or Base.

This course focuses on EVM chains because they dominate DeFi, and because the mechanical understanding transfers cleanly between them.

Here's what I want you to take away. Bitcoin gave the world a digital asset that can't be inflated, seized, or double-spent. That was a revolutionary achievement. But Bitcoin cannot host DeFi. Ethereum gave the world a programmable, distributed computer. That's a different revolutionary achievement — one that made automated, trustless financial protocols possible.

When you evaluate any DeFi protocol, you're evaluating a piece of software running on the EVM. The blockchain underneath is reliable. The EVM faithfully executes whatever the contract says to do. The interesting questions — is the code correct, is it secure, does it do what it claims — all live at the smart contract layer.

In the next lesson, we'll trace how a single transaction moves through the Ethereum network from your wallet all the way to finality. That's where all the mechanical details become visible.

---

## Visual Suggestions

1. **[0:00–0:15]** Lesson title card: "Ethereum vs Bitcoin: Programmable Smart Contracts"
2. **[0:15–1:30]** Split screen: LEFT side "Bitcoin" with a simple flow (sender → amount → receiver, period). RIGHT side "Ethereum" showing the same transfer plus additional possibilities branching out (swap, lend, stake, vote, etc.)
3. **[1:30–3:00]** Animated diagram of the EVM: a central computation engine, surrounded by thousands of node icons all running identical EVM instances. Show a transaction entering the EVM and producing the same output on every node
4. **[3:00–4:00]** Code snippet visualization: Simplified smart contract code showing a `swap()` function with input parameters, logic, and state updates. Make the code look accessible even to non-programmers
5. **[4:00–6:00]** Uniswap swap walkthrough animation:
   - Step 1: Wallet constructing transaction (show parameter list)
   - Step 2: Transaction signature
   - Step 3: Broadcast to network
   - Step 4: Validator includes in block
   - Step 5: EVM executes the cascade (Router → Token → Pool interactions shown as arrows between boxes)
   - Step 6: State finalized
6. **[6:00–7:00]** Ecosystem diagram: "EVM Family" — Ethereum in center, surrounded by Arbitrum, Optimism, Base, Polygon, BNB Chain, Avalanche as satellite chains, all sharing the EVM compatibility standard
7. **[7:00–8:00]** Closing summary card: "Bitcoin = digital gold. Ethereum = programmable computer. DeFi requires the second."

---

## Practical Exercise

No hands-on exercise for this lesson. The next lesson (1.4) begins the practical work with a real block analysis.

**Optional observation activity** (3 minutes): Go to Etherscan (etherscan.io) and search for the Uniswap V3 Router contract address: `0xE592427A0AEce92De3Edee1F18E0157C05861564`. Look at the "Code" tab — you can read the actual deployed smart contract source code. You don't need to understand the Solidity syntax yet, but recognize: this is the code that executes every time someone swaps on Uniswap V3. The entire exchange runs here.

---

*Next: Lesson 1.4 — The Life of a Transaction*
