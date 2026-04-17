# Module 3 — Gas Mechanics, Token Standards & Etherscan

## The Cost of Computation, the Language of Assets, and How to Read the Ledger

---

## 1. Learning Objectives

By the end of this module, you will be able to:

- Explain how Ethereum's gas system works at the protocol level, including EIP-1559 mechanics
- Calculate transaction costs and predict fee behavior during different network conditions
- Distinguish between ERC-20, ERC-721, and ERC-1155 token standards and their role in DeFi
- Read and interpret any transaction on Etherscan — including internal transactions, event logs, and token transfers
- Identify contract verification status and assess basic smart contract trustworthiness from Etherscan
- Decode a DeFi transaction (swap, supply, borrow) by reading its raw on-chain data
- Manage failed transactions, stuck transactions, and nonce conflicts

---

## 2. Conceptual Explanation

### 2.1 — Why Gas Exists

Every computation on Ethereum costs resources. When you execute a swap, hundreds of operations happen inside the EVM: reading storage, writing new balances, emitting events, checking conditions. Each operation consumes processing power across thousands of nodes simultaneously.

Gas is the unit that measures this computational work. Every EVM operation has a fixed gas cost: a simple addition costs 3 gas, a storage write costs 20,000 gas, a balance transfer costs 21,000 gas. A complex DeFi transaction (a Uniswap V3 swap through multiple pools) might consume 150,000–300,000 gas.

Gas exists for two reasons. First, it prevents infinite loops and denial-of-service attacks. Without gas limits, someone could deploy a smart contract with an infinite loop and freeze the entire network. With gas, that loop runs until the gas runs out, then stops — and the attacker pays for every computation they consumed. Second, gas creates a market for block space. Ethereum blocks have a gas limit (currently 30 million gas per block). When demand for block space exceeds supply, users compete by offering higher gas prices. This auction mechanism allocates scarce block space to users who value it most.

### 2.2 — The Price of Gas vs. The Amount of Gas

This distinction confuses most beginners.

**Gas (amount)** is how much computation your transaction requires. A simple ETH transfer always costs exactly 21,000 gas. A Uniswap swap might cost 150,000 gas. This amount is determined by the complexity of the operation, not by network conditions.

**Gas price** is what you pay per unit of gas, denominated in gwei (1 gwei = 0.000000001 ETH = 10⁻⁹ ETH). The gas price fluctuates based on network demand. During calm periods, gas prices might be 5–15 gwei. During a market crash or popular NFT mint, gas prices can spike to 200+ gwei.

**Transaction cost** = gas used × gas price

Example: A Uniswap swap using 150,000 gas at 20 gwei costs 150,000 × 20 = 3,000,000 gwei = 0.003 ETH. At an ETH price of $3,000, that's $9.

Same swap at 200 gwei during a fee spike: 150,000 × 200 = 30,000,000 gwei = 0.03 ETH = $90.

The gas amount stays constant. The cost swings 10x because the price per unit changes. This is why the same transaction can cost $2 on a quiet Sunday and $100 during a market panic.

### 2.3 — Token Standards: How Assets Speak the Same Language

A "token" on Ethereum is just a smart contract that maintains a ledger of balances. The token standard defines the interface — the set of functions the contract must implement so that wallets, DEXs, and other protocols can interact with it predictably.

**ERC-20** is the standard for fungible tokens — tokens where every unit is identical and interchangeable. USDC, WETH, UNI, AAVE, DAI — every DeFi token you interact with is ERC-20. The standard defines six functions: `totalSupply()`, `balanceOf()`, `transfer()`, `transferFrom()`, `approve()`, and `allowance()`. Because every ERC-20 token implements these same functions, any wallet can display any token's balance, any DEX can trade any token, and any lending protocol can accept any token as collateral.

**ERC-721** is the standard for non-fungible tokens (NFTs) — tokens where each unit is unique. Each token has a unique ID. A Uniswap V3 liquidity position is actually an ERC-721 NFT — it represents your specific position with your specific price range and accumulated fees. When you provide concentrated liquidity, you receive an NFT that represents that position.

**ERC-1155** is a multi-token standard that can represent both fungible and non-fungible tokens in a single contract. It supports batch transfers (moving multiple different tokens in one transaction, saving gas). Used primarily in gaming and some DeFi protocols.

---

## 3. Mechanism Deep Dive

### 3.1 — EIP-1559: The Modern Fee Market

Before August 2021, Ethereum used a simple auction: users bid a gas price, and miners picked the highest bids. This was unpredictable — you never knew how much to bid, and overpaying was common.

EIP-1559 replaced this with a two-component system:

**Base Fee.** An algorithmically determined price per gas unit that every transaction must pay. The protocol adjusts the base fee after every block based on how full the previous block was:

- If the block was exactly 50% full (target): base fee stays the same
- If the block was more than 50% full: base fee increases (up to 12.5% per block)
- If the block was less than 50% full: base fee decreases (up to 12.5% per block)

This creates a predictable fee mechanism. If demand is high, the base fee rises until demand subsides. If demand is low, the base fee falls until the block fills up.

**The base fee is burned.** It is destroyed — not paid to validators. This makes ETH deflationary during periods of high usage. When the network is busy, more ETH is burned than is issued to validators, reducing total supply.

**Priority Fee (Tip).** An optional additional payment directly to the validator who includes your transaction. This incentivizes validators to prioritize your transaction within the block. During normal conditions, a 0.1–1 gwei tip is sufficient. During extreme congestion, higher tips are needed to jump the queue.

**Max Fee.** The maximum total price per gas you're willing to pay (base fee + priority fee). If the base fee rises above your max fee, your transaction won't be included until the base fee drops. Best practice: set max fee to approximately 2× the current base fee. You only pay the actual base fee + your tip, not the full max fee. The difference is refunded.

**Your wallet settings explained:**

| Field | What it means | How to set it |
|-------|--------------|---------------|
| Gas Limit | Maximum gas units your transaction can consume | Usually auto-estimated. Adding 10–20% buffer prevents out-of-gas failures |
| Max Priority Fee | Your tip to the validator | 0.1–2 gwei normally, 5–20 gwei during congestion |
| Max Fee | Maximum total per gas unit | 2× current base fee is safe |

### 3.2 — Gas on Layer 2s

L2 transactions have two cost components:

**Execution cost.** The computation on the L2 itself. This is typically very cheap — fractions of a cent — because L2 sequencers process transactions at high throughput.

**Data posting cost (L1 data fee).** The cost to post the compressed transaction data to Ethereum L1. This is the dominant cost on L2s and fluctuates with Ethereum L1 gas prices. When Ethereum is congested, L2 transactions become more expensive too, because posting data to L1 costs more.

After EIP-4844 (March 2024, "Dencun" upgrade), L2s gained access to "blob space" — a cheaper data storage layer on L1 specifically designed for rollup data. This reduced L2 transaction costs by 10–100x. A Uniswap swap on Arbitrum that cost $0.50 before EIP-4844 now costs $0.01–0.05.

**Practical implication:** L2 gas costs are so low that gas optimization matters much less than on L1. On Arbitrum or Base, you can execute 100 transactions for the cost of 1 transaction on Ethereum mainnet. This changes strategy: on L2, you can rebalance positions frequently, claim small rewards, and manage positions actively without gas costs eating your returns.

### 3.3 — ERC-20 Deep Dive: The Six Functions That Power DeFi

Every ERC-20 token implements these functions. Understanding them means understanding how every DeFi protocol moves your money.

**`totalSupply()`** — Returns the total number of tokens in existence. For USDC, this represents all USDC ever minted. For an inflationary token, this number grows over time.

**`balanceOf(address)`** — Returns how many tokens a specific address holds. When your wallet shows "1,000 USDC," it called this function on the USDC contract with your address.

**`transfer(to, amount)`** — Moves tokens directly from your address to another. Simple, direct transfer. Used when you send tokens to a friend.

**`approve(spender, amount)`** — Gives another address (usually a smart contract) permission to move up to `amount` of your tokens. This is the approval mechanism discussed in Module 2. It does NOT move tokens — it only grants permission.

**`allowance(owner, spender)`** — Returns how much the spender is still allowed to move from the owner's balance. After you approve Uniswap for 1,000 USDC and then swap 500, the allowance drops to 500.

**`transferFrom(from, to, amount)`** — Moves tokens from one address to another, called by a third party (the approved spender). This is how DeFi contracts actually move your tokens. When Uniswap executes your swap, it calls `transferFrom(your_address, pool_address, amount)` — and it can only succeed if you previously called `approve()` for at least that amount.

**The approval → transferFrom pattern is the fundamental mechanism of DeFi.** Every time you interact with a lending protocol, a DEX, or a vault, this is what happens under the hood. The security implications were covered in Module 2, but the mechanical understanding is equally important: if a contract doesn't have your approval, it cannot move your tokens. Period.

### 3.4 — Reading Etherscan: Anatomy of a Transaction

Etherscan is the primary interface for reading the Ethereum blockchain. Every transaction you've ever made — and every transaction anyone has ever made — is visible here. Being able to read Etherscan is the DeFi equivalent of being able to read a financial statement.

**Transaction Page Fields:**

**Transaction Hash.** A unique identifier for this transaction (66-character hexadecimal string). Think of it as a receipt number. Every transaction ever executed has a unique hash.

**Status.** Success or Fail. A failed transaction still costs gas (the computation was performed, even though the result was an error). Common failure reasons: insufficient gas, slippage exceeded, or the transaction's conditions were no longer met when it was executed.

**Block.** The block number this transaction was included in. Useful for determining when the transaction was processed relative to other transactions.

**From.** The address that initiated and paid for the transaction. Always an EOA (externally owned account) — smart contracts cannot initiate transactions.

**To.** The recipient address. In DeFi, this is usually a smart contract (like Uniswap's Router). Etherscan shows the contract name if it's verified.

**Value.** The amount of ETH transferred directly. For most DeFi transactions, this is 0 — you're calling a function on a contract, not sending ETH. Token transfers show up separately.

**Transaction Fee.** The actual gas cost in ETH and its USD value at the time.

**Gas Price.** The base fee + priority fee per gas unit, in gwei.

**Gas Limit & Usage.** The maximum gas you allocated vs. how much was actually consumed. If usage hits 100% of the limit, the transaction failed with "out of gas." Wallets usually auto-estimate with a buffer.

**Input Data.** The raw encoded data sent with the transaction — the function call and its parameters. Etherscan decodes this if the contract is verified, showing the function name and human-readable parameters.

### 3.5 — Internal Transactions, Event Logs, and Token Transfers

A single DeFi transaction often triggers a cascade of operations. A Uniswap swap might look like one transaction from the outside, but inside it involves multiple token transfers, pool state updates, and fee calculations. Etherscan surfaces these through three additional tabs:

**Token Transfers.** Every ERC-20 and ERC-721 movement triggered by this transaction. A swap shows two transfers: tokens leaving your address (what you sold) and tokens arriving (what you bought). A leverage loop might show five or more transfers as assets flow through multiple contracts.

**Internal Transactions.** Calls between smart contracts within the same transaction. When your transaction calls Contract A, which then calls Contract B, which then calls Contract C — each inter-contract call is an internal transaction. These can move ETH between contracts and are essential for understanding complex DeFi operations.

**Event Logs.** Smart contracts emit "events" when significant things happen — a transfer, a swap, a liquidation. Events are indexed and searchable. They are the primary data source for analytics tools like Dune and The Graph. Each event log contains the event signature (what happened), indexed parameters (searchable fields like addresses), and data parameters (values like amounts). When you see a Swap event in the logs, it tells you exactly which pool was used, the input and output amounts, and the resulting price.

### 3.6 — Contract Verification and Trust Signals

When you view a contract on Etherscan, several indicators help you assess its trustworthiness:

**Verified Source Code.** A green checkmark means the deployer uploaded the source code and Etherscan confirmed it compiles to the same bytecode on-chain. You (or auditors) can read the actual code. **Unverified contracts are a red flag** — you're interacting with opaque code that could do anything.

**Read/Write Contract Tabs.** If verified, Etherscan lets you call functions directly. "Read" functions query the contract's state (free, no gas). "Write" functions modify state (require a transaction and gas). You can use the Read tab to check things like: your token balance, your approval amounts, the contract's total value locked, protocol parameters.

**Proxy Pattern.** Many DeFi contracts use a proxy pattern: a lightweight proxy contract delegates all calls to an implementation contract that contains the actual logic. The implementation can be upgraded by changing where the proxy points. Etherscan shows "Read as Proxy" / "Write as Proxy" tabs when it detects this pattern. **Upgradeable contracts are a double-edged sword** — they can be fixed if bugs are found, but they can also be changed maliciously by whoever controls the upgrade key.

**Creator Address.** Etherscan shows which address deployed the contract. For established protocols, this is usually a known deployer or a governance multisig. For suspicious tokens, checking the creator can reveal if the same address deployed dozens of scam tokens.

---

## 4. Real-World Examples

### 4.1 — Gas Wars: Otherside Land Mint (May 2022)

When Yuga Labs launched their Otherside NFT mint, demand was so extreme that Ethereum's base fee spiked to over 7,000 gwei — roughly 500x normal levels. Users paid $2,000–$14,000 in gas fees for a single mint transaction. Many transactions failed (ran out of gas or were outbid) but still cost hundreds of dollars in gas. The mint event burned over $150 million in ETH in a few hours.

**Lesson:** Gas prices spike exactly when everyone is trying to do the same thing. This applies directly to DeFi: during a market crash, when everyone needs to deleverage or add collateral, gas prices can spike 10–100x. Your $5 deleverage transaction suddenly costs $500. This is why professionals plan gas budgets for worst-case scenarios and keep capital on L2s where fees remain manageable during stress.

### 4.2 — Failed Transactions: Burning Money on Nothing

In December 2022, a user attempted a swap on Uniswap but set the gas limit too low. The transaction executed partially — consuming computation and gas — then failed with an "out of gas" error. The user paid $47 in gas fees for a transaction that did nothing. The tokens stayed in their wallet, but the ETH for gas was gone.

This happens thousands of times daily. Common causes include setting gas limit below what the transaction actually needs, transactions failing because market conditions changed during processing (the swap's price moved beyond slippage tolerance), and attempting to interact with a contract that has a bug or is paused.

**Lesson:** Failed transactions still cost gas because the computation was performed — the EVM has no way to "undo" computation that already happened. Always let your wallet auto-estimate gas with a buffer. If a transaction is failing repeatedly, investigate why before retrying.

### 4.3 — Reading a Real Swap on Etherscan

Here's how to decode a Uniswap swap transaction on Etherscan:

1. **Transaction Overview:** From: your address. To: Uniswap Router contract. Value: 0 ETH (the swap uses tokens, not raw ETH).
2. **Token Transfers Tab:** Shows two transfers. Transfer #1: 1,000 USDC from your address to the pool address. Transfer #2: 0.333 ETH from the pool address to your address. This tells you the effective swap rate: 1,000 USDC → 0.333 ETH, or $3,000/ETH.
3. **Event Logs:** A `Swap` event from the pool contract showing the exact amounts and the resulting pool price.
4. **Input Data (decoded):** Shows the function called (`exactInputSingle`), the token addresses, the amount, the minimum output (slippage protection), and the deadline.

Being able to read this is not just educational — it's operationally necessary. When a transaction does something unexpected, Etherscan is how you figure out what actually happened.

### 4.4 — The ERC-20 Approval Attack: Anatomy on Etherscan

Here's what a wallet drainer attack looks like on Etherscan:

1. **Transaction 1 (the victim's action):** The victim interacts with a phishing site and signs an `approve()` transaction. On Etherscan, it appears as a simple token approval: "Approve USDC — Spender: 0xATTACKER... — Amount: 115792089237316195423570985008687907853269..." (this is the maximum uint256, meaning unlimited approval).
2. **Transaction 2 (the attacker's action, minutes or hours later):** The attacker calls `transferFrom()` on the USDC contract: "Transfer 50,000 USDC from VICTIM to ATTACKER." This succeeds because the victim's approval authorized it.

On Etherscan, these are two separate transactions. The victim only signed one. The attacker executed the second using the permission granted by the first. This is why approval management is critical — and why checking your approvals on revoke.cash is a monthly security habit.

---

## 5. Security Considerations

### 5.1 — Gas-Related Attack Vectors

**Gas Griefing.** An attacker can design a contract that consumes enormous gas when called, causing transactions to fail or cost far more than expected. This is rare for users directly but affects protocols that call external contracts.

**Stuck Transactions and Nonce Exploitation.** Every transaction from your address has a sequential nonce (number used once). Transaction nonce 0 must be processed before nonce 1, which must be processed before nonce 2. If a low-fee transaction gets stuck (not picked up by validators), all subsequent transactions are blocked — even if they have higher fees.

**How to unstick a transaction:** Send a new transaction with the SAME nonce as the stuck one but with a higher gas price. The new transaction replaces the stuck one. In MetaMask: Settings → Advanced → Customize Transaction Nonce. In Rabby: the interface surfaces this more intuitively.

**Front-running via gas price.** If an attacker sees your pending transaction in the mempool, they can submit the same transaction with a higher gas price to get executed before you. This is the basis of MEV attacks (covered in Module 8). On L2s, this risk is reduced because sequencers typically process transactions in order received, not by gas price.

### 5.2 — Token Standard Security Risks

**Fake Tokens.** Anyone can deploy an ERC-20 token with any name and symbol. There are hundreds of fake "USDC" and "USDT" tokens. The name means nothing — only the contract address matters. Always verify token addresses against the official project documentation or CoinGecko/CoinMarketCap listings.

**Fee-on-Transfer Tokens.** Some ERC-20 tokens charge a tax on every transfer (2%, 5%, sometimes more). These tokens break many DeFi protocols because the amount received is less than the amount sent. Uniswap V2 had to add special handling for these tokens. If you see unexpectedly low amounts after a swap, the token might have a transfer tax.

**Rebase Tokens.** Some tokens (like stETH) automatically adjust all holders' balances to reflect yield or inflation. This means your `balanceOf()` changes over time without any transfer. Some DeFi protocols don't handle rebasing correctly, leading to accounting errors. Wrapped versions (wstETH) exist specifically to solve this.

**Honeypot Tokens.** Tokens where the contract allows buying but prevents selling — you can swap ETH for the token, but the `transfer()` function reverts when you try to swap back. These are rug-pull mechanisms. Always verify that a token can be sold before buying significant amounts.

### 5.3 — Etherscan Reading for Safety

Before interacting with any new protocol or token, check these on Etherscan:

1. **Is the contract verified?** If not, do not interact. You're trusting opaque code.
2. **When was the contract deployed?** A contract deployed yesterday with millions in TVL is suspicious. Established protocols have months or years of on-chain history.
3. **Who deployed it?** Is the deployer address associated with known entities? Or is it a fresh address with no history?
4. **Is it a proxy?** If so, who controls upgrades? Check the admin/owner address. If it's an EOA (personal wallet) rather than a multisig or timelock, upgrades can happen instantly — a centralization risk.
5. **What functions does it expose?** Check the Write tab. Functions like `emergencyWithdraw()`, `setFee()`, `pause()`, `blacklist()` give the owner significant control. This isn't inherently bad (many protocols need emergency functions), but understand what powers the owner has.

---

## 6. Practical Exercise

### Exercise 3.1 — Calculate Gas Costs Across Network Conditions

**Goal:** Build intuition for how gas costs change with network demand.

**Steps:**

1. Go to [etherscan.io/gastracker](https://etherscan.io/gastracker)
2. Record the current gas prices:
   - Low (Safe): ___ gwei
   - Average (Proposed): ___ gwei
   - High (Fast): ___ gwei
   - Base Fee: ___ gwei

3. Calculate the cost of three common DeFi operations at current prices:

| Operation | Gas Units | Cost at Low | Cost at Average | Cost at High |
|-----------|-----------|-------------|-----------------|--------------|
| ETH Transfer | 21,000 | | | |
| ERC-20 Approve | 46,000 | | | |
| Uniswap V3 Swap | 185,000 | | | |
| Aave Supply | 250,000 | | | |

Formula: Cost (ETH) = Gas Units × Gas Price (gwei) × 10⁻⁹
Cost (USD) = Cost (ETH) × Current ETH Price

4. Now repeat the calculation at 200 gwei (stress scenario). How much would each operation cost during a market panic?

5. Compare with Arbitrum: check [arbiscan.io/gastracker](https://arbiscan.io/gastracker) and calculate the same operations at L2 gas prices.

**Question:** At what portfolio size does it become unprofitable to execute DeFi operations on L1 vs. L2? (Hint: if gas costs exceed 1% of the transaction value, the operation erodes returns significantly.)

### Exercise 3.2 — Decode a Real DeFi Transaction

**Goal:** Learn to read a complex DeFi transaction from raw Etherscan data.

**Steps:**

1. Go to Etherscan and search for a recent Uniswap V3 swap. You can find one by:
   - Going to the Uniswap V3 Router contract: `0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45`
   - Clicking the "Transactions" tab
   - Selecting any recent transaction

2. On the transaction page, record:
   - From (who initiated the swap)
   - To (which contract — should be the Uniswap Router)
   - Gas Used vs. Gas Limit
   - Transaction Fee in ETH and USD
   - Status (Success/Fail)

3. Click the "Token Transfers" tab. Identify:
   - Which token left the user's wallet? (Token sold)
   - Which token arrived? (Token bought)
   - What was the effective exchange rate?

4. Click the "Logs" tab. Find the `Swap` event. Record:
   - The pool address
   - The amounts swapped
   - The `sqrtPriceX96` value (this encodes the pool's price after the swap — don't worry about decoding it yet, just note that it exists)

5. Click "Click to see More" at the bottom of the transaction overview and decode the Input Data. If the contract is verified, Etherscan decodes it automatically. Identify:
   - The function called (e.g., `exactInputSingle`, `multicall`)
   - The token addresses in the parameters
   - The `amountOutMinimum` (the user's slippage protection — the minimum amount they'll accept)
   - The `deadline` (the timestamp after which the transaction should revert)

**Deliverable:** Write a plain-English summary of what happened in this transaction. Example: "User 0xABC swapped 5,000 USDC for 1.67 WETH via the USDC/WETH 0.05% pool, paying $4.32 in gas. Their minimum acceptable output was 1.65 WETH (1.2% slippage tolerance)."

### Exercise 3.3 — Token Verification and Red Flag Detection

**Goal:** Practice evaluating an unknown token using only Etherscan.

**Steps:**

1. Go to the USDC contract on Etherscan: `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`
2. Evaluate it as if you've never seen it before:
   - Is it verified? ✓/✗
   - When was it deployed?
   - How many holders does it have?
   - Is it a proxy contract?
   - What is the implementation contract?
   - Who is the admin/owner? (Check the Read as Proxy tab for the `admin()` function)
   - Does it have a `blacklist()` function? (Check the Write tab)

3. Now find any random new token from the "Token Transfers" feed on Etherscan's home page. Apply the same evaluation:
   - Verified?
   - Deployment date?
   - Holder count?
   - Proxy?
   - Owner functions?

4. Compare the two. What signals differentiate a legitimate, established token from a potentially suspicious one?

### Exercise 3.4 — Manage a Stuck Transaction (Testnet)

**Goal:** Practice the nonce replacement technique for unsticking transactions.

**Steps:**

1. On Sepolia testnet, send a transaction with an extremely low gas price (set max fee to 0.001 gwei manually). This transaction should get stuck — too cheap for validators to include.

2. Observe: your wallet shows a "Pending" transaction. Try sending a new transaction. It should also get stuck because it has the next sequential nonce, which can't be processed until the previous nonce clears.

3. Unstick it by sending a replacement transaction:
   - MetaMask: Enable custom nonce in Settings → Advanced
   - Create a new transaction (can be a simple 0 ETH send to yourself)
   - Set the nonce to the same value as the stuck transaction
   - Set the gas price significantly higher (use the current average)
   - Submit — this replaces the stuck transaction

4. Verify on Sepolia Etherscan that the replacement transaction was processed and the old one was dropped.

---

## 7. AI Tutor Q&A Examples

---

**Q: Why do failed transactions still cost gas? That seems unfair.**

A: It feels unfair, but it's a necessary design choice. Validators (and all the nodes that verify the block) already performed the computation before they discovered the transaction would fail. They read storage, checked balances, executed logic — and only at some point during execution did the transaction hit a revert condition (out of gas, failed require statement, etc.). That computation consumed real resources across thousands of machines. If failed transactions were free, it would create a free denial-of-service attack vector — anyone could spam the network with transactions designed to fail, consuming everyone's computational resources for free. Charging gas for failed transactions ensures there's always a cost to consuming network resources, whether the transaction succeeds or not.

---

**Q: On Etherscan, I see "Internal Transactions" on some DeFi transactions. What are these?**

A: When you send a transaction to Contract A, and Contract A calls Contract B, and Contract B calls Contract C — each of those inter-contract calls is an "internal transaction." They don't exist as separate transactions on-chain (there's only one original transaction), but Etherscan traces them to show you the full cascade of operations. This is important in DeFi because a single swap might involve: your transaction calls the Router, the Router calls the Pool, the Pool calls the Token contracts to move balances, and the Pool sends ETH or WETH back to you. Internal transactions that move ETH are particularly important to watch — if ETH moves to an unexpected address within a DeFi transaction, it could indicate something is wrong.

---

**Q: What does "contract not verified" mean? Should I avoid those contracts?**

A: "Not verified" means the deployer did not upload the source code to Etherscan for public review. The bytecode (compiled code) is always visible on-chain, but bytecode is nearly impossible for humans to read. Without verification, you're trusting a black box — you have no idea what the code does. For established, legitimate protocols, unverified contracts are rare (and a serious red flag if found). However, some contracts are intentionally unverified — factory-deployed contracts, internal library contracts, or very new deployments that haven't been verified yet. As a rule: do not approve tokens to an unverified contract and do not send funds to an unverified contract, unless you can verify its legitimacy through other means (like confirming the address on the protocol's official documentation).

---

**Q: I see that ETH transfers are 21,000 gas but swaps are 150,000+. Why the huge difference?**

A: An ETH transfer is the simplest possible transaction: check that the sender has enough ETH, subtract from sender, add to receiver, update state. It's five operations. A Uniswap swap involves dozens of operations: read the pool's current state (reserves, tick, fee tier), calculate the output amount using the constant product formula, move Token A from your address to the pool, move Token B from the pool to your address, update the pool's price and liquidity tracking, emit events, check slippage limits, verify the deadline hasn't passed — each of these reads from and writes to contract storage. Storage reads cost 2,100 gas each. Storage writes cost 5,000–20,000 gas each. Complex math operations (square roots for price calculations) cost additional gas. The accumulated cost of all these operations is why DeFi transactions are expensive on L1 and why L2s provide such significant savings.

---

**Q: How do I know which gas settings to use? The defaults always seem wrong.**

A: Wallet defaults are usually fine for 90% of transactions. The auto-estimated gas limit is almost always correct (wallets simulate the transaction to calculate the exact gas needed, then add a buffer). Where defaults can be wrong is the gas price during volatile periods — wallets estimate based on recent blocks, but if gas is spiking rapidly, the estimate can be too low by the time your transaction is submitted. For non-urgent transactions (claiming rewards, depositing into a vault), you can safely set a lower max fee and wait for gas to come down. For urgent transactions during market stress (adding collateral to avoid liquidation), you should manually increase the max fee and priority fee to ensure fast inclusion. A practical approach: check etherscan.io/gastracker, use the "Fast" price for urgent transactions, and the "Low" price for transactions that can wait 5–10 minutes.

---

## 8. Key Takeaways

**1. Gas = computation cost. Gas price = market-driven rate.** The amount of gas a transaction uses is fixed by its complexity. The price per unit fluctuates with network demand. Your total cost is the product of both. This is why the same swap can cost $2 or $200 depending on when you execute it.

**2. EIP-1559 makes fees predictable but not cheap.** The base fee adjusts algorithmically, burned on every transaction. You pay base fee + priority tip. Set your max fee to 2× current base fee for a safe buffer. During fee spikes, patience is the cheapest strategy — wait for the base fee to drop.

**3. L2s are 10–100x cheaper than L1 after EIP-4844.** The dominant cost on L2s is the L1 data posting fee, which blob space dramatically reduced. For active DeFi operations, L2s are almost always the right choice. Use L1 only when the protocol or asset is exclusively available there.

**4. ERC-20's approve/transferFrom pattern is the mechanism that powers all of DeFi.** Every lending market, every DEX, every vault uses this two-step flow. Understanding it mechanically means understanding where your security surface lies and how every DeFi protocol moves your money.

**5. Etherscan is your ground truth.** Dashboards, wallets, and dApp interfaces can show incorrect or incomplete information. Etherscan shows what actually happened on-chain. Learn to read transaction details, token transfers, internal transactions, and event logs. This skill saves you from mistakes and helps you understand exactly what your DeFi positions are doing.

**6. Contract verification is a minimum trust signal, not a guarantee.** Verified code can still have bugs. But unverified code gives you zero ability to assess risk. Never approve tokens to or send funds to an unverified contract without extraordinary reason and verification from official sources.

**7. Stuck transactions block everything after them.** Ethereum's nonce system means transactions from your address must process in order. A low-fee stuck transaction blocks all subsequent transactions. The fix is a same-nonce replacement with higher gas — a skill every DeFi operator needs.

---

## Navigation

| Previous | Current | Next |
|----------|---------|------|
| ← Module 2: Wallets & Security | **Module 3: Gas, Tokens & Etherscan** | Module 4: DEX Mechanics & AMMs → |

---

*Module 3 complete. With blockchain fundamentals (Module 1), wallet security (Module 2), and now gas mechanics, token standards, and Etherscan literacy (Module 3), you have the complete toolkit to interact with the blockchain safely and intelligently. Module 4 introduces the first DeFi primitive: decentralized exchanges and automated market makers — where you'll make your first swap and understand the mechanism that enables trustless trading.*
