# Module 9 — Flash Loans

## Uncollateralized Borrowing in a Single Atomic Transaction

---

## 1. Learning Objectives

- Explain how flash loans work at the smart contract level
- Understand atomicity and why it makes uncollateralized borrowing safe for the lender
- Describe legitimate use cases: arbitrage, collateral swaps, self-liquidation
- Analyze flash loan attack vectors with real exploit case studies
- Understand why flash loans are the weapon behind ~83% of eligible DeFi exploits

---

## 2. Conceptual Explanation

A flash loan is a loan that is borrowed and repaid within the same transaction. If the borrower cannot repay, the entire transaction reverts — as if it never happened. The lender faces zero risk because the loan either gets repaid in full (plus a small fee, typically 0.05–0.09%) or the transaction fails and nothing changes.

This breaks a fundamental assumption of traditional finance: that borrowing requires collateral or creditworthiness. Flash loans require neither — because the loan never exists outside a single atomic transaction.

---

## 3. Mechanism Deep Dive

### 3.1 — Atomicity: The Key Concept

In Ethereum, a transaction is **atomic** — it either succeeds completely or fails completely. There is no partial execution. A flash loan exploits this: the lending contract sends you millions of dollars, you execute your logic, and at the end, the contract checks if you've repaid the loan plus fee. If yes: transaction succeeds. If no: the entire transaction reverts, including the initial loan — you never actually received the money.

### 3.2 — Legitimate Use Cases

**Arbitrage:** Borrow $5M USDC → Buy ETH on DEX A at $2,990 → Sell ETH on DEX B at $3,010 → Repay $5M + fee → Keep ~$3,000 profit. No capital required.

**Collateral Swap:** You have ETH collateral on Aave and want to switch to wstETH without closing the position. Flash loan USDC → Repay your Aave debt → Withdraw ETH → Swap ETH for wstETH → Deposit wstETH → Borrow USDC → Repay flash loan. One transaction, no liquidation risk during the swap.

**Self-Liquidation:** Your position is about to be liquidated with a 10% penalty. Flash loan to repay your own debt, withdraw collateral, swap enough to cover the flash loan, and keep the rest — saving 5–8% vs. external liquidation.

### 3.3 — Flash Loan Attacks

Flash loans are the weapon of choice for exploiting DeFi vulnerabilities because they provide unlimited capital for the cost of a small fee and gas.

**Oracle Manipulation Pattern:**
1. Flash borrow $50M
2. Use the capital to manipulate a price on a DEX (buy massive amounts to spike the price)
3. A protocol using that DEX's price as an oracle now sees a distorted price
4. Borrow against the inflated collateral or profit from the mispricing
5. Repay the flash loan with profit

**Euler Finance Attack ($197M, March 2023):**
1. Flash borrow DAI from Aave
2. Deposit into Euler (receive eDAI)
3. Borrow more (leveraged position)
4. Use Euler's donation function to donate eDAI to reserves
5. The donated eDAI broke the health factor calculation
6. Liquidate the broken position profitably
7. Repay flash loan, keep $197M

The total capital invested by the attacker: ~$1 in gas fees.

### 3.4 — Mango Markets Exploit ($117M, October 2022)

Though on Solana (not EVM), the mechanism is instructive. Avraham Eisenberg used $5M to manipulate the price of MNGO token on Mango Markets by simultaneously going long on the perp and buying spot to drive the price up. The inflated MNGO price was used as collateral to borrow $117M in various assets. He then withdrew the borrowed assets, leaving the platform with bad debt.

This wasn't technically a flash loan attack but demonstrated the same principle: large capital can manipulate on-chain prices to exploit lending protocols.

**Lesson:** Any protocol that uses on-chain prices from thin-liquidity markets is vulnerable to manipulation. Chainlink's off-chain oracle aggregation exists specifically to prevent this.

---

## 4. Security Considerations

- **Protocols vulnerable to flash loans use on-chain TWAP oracles with short windows** — longer TWAP windows (30+ minutes) are more expensive to manipulate
- **Users cannot be directly attacked by flash loans** — the attack targets protocol logic, not individual wallets
- **Flash loan availability means any bug with an economic exploit path will be found and exploited rapidly** — there's no "we'll patch it before anyone notices"
- **As a DeFi user, flash loan risk manifests as protocol risk** — if the protocol you're deposited in has a flash-loanable vulnerability, your funds are at risk

---

## 5. Practical Exercise

### Exercise 9.1 — Trace an Exploit
Find the Euler Finance exploit on Etherscan (March 13, 2023). Trace the internal transactions. Identify: the flash loan, the deposits, the donation, the liquidation, and the profit withdrawal.

### Exercise 9.2 — Identify Vulnerable Oracle Designs
For three lending protocols, identify their oracle source. Is it Chainlink (resistant to flash loan manipulation)? On-chain TWAP? Custom? Assess the flash loan manipulation risk for each.

---

## 6. AI Tutor Q&A Examples

**Q: Can someone flash loan attack my wallet?**

A: No. Flash loans can only exploit vulnerable protocol logic, not individual wallets. Your funds are only at risk if they're deposited in a protocol that has a flash-loanable vulnerability. The flash loan itself is just a financing tool — the "attack" is the exploit of the protocol's code. This is why smart contract risk assessment (audits, oracle design, invariant checking) is so important before depositing into any protocol.

---

## 7. Key Takeaways

1. **Flash loans provide unlimited capital for zero collateral** — but only within a single atomic transaction.
2. **They're behind ~83% of eligible DeFi exploits** because they remove the capital barrier for attack execution.
3. **The vulnerability is always in the protocol, not in the flash loan mechanism itself.**
4. **Protocols using on-chain price oracles with low liquidity are most vulnerable.**
5. **As a user, your defense is protocol selection** — choose protocols with Chainlink oracles, battle-tested code, and designs that account for flash loan manipulation.

---

| ← Module 8: MEV | **Module 9: Flash Loans** | Module 10: veTokenomics → |
