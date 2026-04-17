# Module 2 — Wallets & Security

## Your Keys, Your Crypto: The Complete Security Architecture

---

## 1. Learning Objectives

By the end of this module, you will be able to:

- Explain the cryptographic relationship between private keys, public keys, and wallet addresses
- Set up and configure MetaMask and Rabby Wallet for multi-chain DeFi operations
- Understand and practice hardware wallet integration as a signing device
- Identify and defend against the most common attack vectors: phishing, approval exploits, social engineering, and wallet drainers
- Implement a personal security architecture with layered defenses
- Manage token approvals and understand why unlimited approvals are the #1 wallet-draining vector in DeFi
- Create and securely store a seed phrase backup system

---

## 2. Conceptual Explanation

### 2.1 — What a Wallet Actually Is

A wallet does not "store" your crypto. This is the most common misconception in crypto. Your tokens exist on the blockchain — they are entries in a distributed ledger maintained by thousands of nodes. What your wallet stores is the **private key** that proves you have the right to move those entries.

Think of it this way: the blockchain is a giant public spreadsheet. One row says "Address 0xABC... holds 5 ETH." Your wallet holds the cryptographic key that lets you write a new line: "Move 2 ETH from 0xABC... to 0xDEF..." Nobody else can write that line because nobody else has your key.

This has a profound implication: **your wallet is not an account. It's a signing device.** You can use different wallet software (MetaMask, Rabby, Ledger) to access the same address — because they all use the same private key. The wallet is just the interface. The key is the identity.

### 2.2 — The Cryptographic Chain

**Private Key → Public Key → Address**

This is a one-way mathematical chain. Each step can be derived from the previous one, but you cannot reverse it.

**Private Key.** A 256-bit random number. It looks like this: `0x4c0883a6916...` (64 hexadecimal characters). This is the secret that controls everything. Anyone who knows this number controls all assets at the associated address. There are more possible private keys than atoms in the observable universe — the probability of two people generating the same key is functionally zero.

**Public Key.** Derived from the private key using elliptic curve cryptography (secp256k1). The math is one-directional: given the private key, computing the public key is trivial. Given the public key, computing the private key is computationally impossible with current technology. The public key is used to verify signatures.

**Address.** Derived from the public key by hashing it (Keccak-256) and taking the last 20 bytes. This is the `0x...` address you share with others to receive funds. It looks like: `0x71C7656EC7ab88b098defB751B7401B5f6d8976F`.

**Seed Phrase (Mnemonic).** A human-readable encoding of your private key — 12 or 24 English words like "canyon rubber firm harvest apple..." The seed phrase and the private key represent the same secret in different formats. From a single seed phrase, a wallet can derive an unlimited number of private keys (and therefore addresses) using a deterministic path (BIP-39/BIP-44 standard). This is why one seed phrase controls multiple accounts in MetaMask.

### 2.3 — Hot Wallets vs. Cold Wallets

**Hot Wallets** are software wallets connected to the internet. MetaMask, Rabby, and Coinbase Wallet are hot wallets. Your private key exists in your browser's encrypted storage. This is convenient — you can sign transactions instantly — but it means your key is on a device connected to the internet, reachable by malware, browser exploits, or malicious extensions.

**Cold Wallets (Hardware Wallets)** store your private key on a dedicated physical device that never connects directly to the internet. Ledger and Trezor are the primary hardware wallets. When you "sign" a transaction, the transaction data is sent to the hardware device, the device signs it internally using the private key that never leaves the device, and the signed transaction is sent back to your computer for broadcasting.

**The critical difference:** With a hot wallet, a compromised computer means a compromised key. With a hardware wallet, a compromised computer means the attacker can see your transactions and try to trick you into signing something malicious — but they cannot extract the key itself.

**Security hierarchy for DeFi:**
- Daily operations, small amounts (<$1,000): Hot wallet (MetaMask or Rabby)
- Active DeFi positions, medium amounts ($1,000–$50,000): Hardware wallet connected through MetaMask/Rabby as a signing device
- Cold storage, large amounts (>$50,000): Hardware wallet on a separate seed, no active DeFi approvals, used only for storage

---

## 3. Mechanism Deep Dive

### 3.1 — How Transaction Signing Works

Every time you click "Confirm" in your wallet, here's what actually happens:

1. **The dApp constructs a transaction.** Uniswap's frontend creates a transaction object specifying: call the `swap()` function on contract `0x...`, with these parameters (token amounts, slippage, deadline), from your address, with this gas limit.

2. **Your wallet displays the transaction.** This is the confirmation screen. It shows you what contract you're interacting with, what function is being called, and what value is being sent. This is your last line of defense — **read it.**

3. **You approve. Your wallet signs.** The wallet uses your private key to create a digital signature — a mathematical proof that you authorized this specific transaction. The signature is unique to both your key and this exact transaction. It cannot be reused for any other transaction.

4. **The signed transaction is broadcast.** Your wallet sends the signed transaction to the Ethereum network. Nodes verify the signature matches the sender's address, check the sender has sufficient funds, and if everything is valid, the transaction enters the mempool and eventually gets included in a block.

**What can go wrong at each step:**
- Step 1: The dApp could be malicious or compromised, constructing a transaction that drains your wallet instead of executing a swap
- Step 2: The wallet's display could be insufficient — "Contract Interaction" doesn't tell you much. This is why Rabby's transaction simulation is valuable
- Step 3: If your private key is compromised (malware, stolen seed phrase), the attacker doesn't need you to approve — they can sign transactions themselves
- Step 4: The transaction is public in the mempool — MEV bots can see it and potentially front-run it (covered in Module 8)

### 3.2 — Token Approvals: The Hidden Attack Surface

Before a smart contract can move your tokens, you must **approve** it. This is a separate transaction that tells the token contract: "This address is allowed to move X amount of my tokens."

**The ERC-20 `approve()` function** takes two parameters: the spender address (the contract you're authorizing) and the amount. Most DeFi interfaces request **unlimited approval** — they set the amount to the maximum possible value (2^256 - 1, or roughly 1.15 × 10^77 tokens). They do this for convenience: you approve once, and the contract can move any amount of that token forever, without needing another approval transaction.

**Why this is dangerous:** If the approved contract is later exploited, or if the contract's owner has a backdoor, or if you approved a malicious contract by mistake, the attacker can drain ALL of that token from your wallet — not just the amount you intended to swap. The unlimited approval persists until you explicitly revoke it.

**Real-world scope:** The average active DeFi wallet has 10–50 active approvals. Many users have approvals to contracts they used once, months ago, and forgot about. Each active approval is an open permission that could be exploited.

**How to manage approvals:**

1. **Use limited approvals.** When approving, manually set the amount to only what you need for the current transaction. MetaMask lets you edit the approval amount. Rabby surfaces this option more prominently.

2. **Revoke old approvals.** Use [revoke.cash](https://revoke.cash) to see all your active approvals and revoke the ones you no longer need. Revoking costs gas (it's an on-chain transaction), so batch your revocations during low-gas periods.

3. **Use Permit2 where available.** Uniswap's Permit2 system centralizes approvals through a single contract, allowing time-limited and amount-limited permissions. This is safer than traditional unlimited approvals.

4. **Audit regularly.** Every month, check your approvals on revoke.cash. Treat it like checking your bank statement for unauthorized charges.

### 3.3 — Wallet Software: MetaMask vs. Rabby

**MetaMask** is the most widely used Ethereum wallet with over 100 million installs. It supports all EVM chains, integrates with virtually every DeFi protocol, and has the largest ecosystem of snap plugins.

**Strengths:** Universal compatibility, extensive documentation, mobile and desktop support, snap extensibility.

**Weaknesses:** Default settings are not security-optimized. Transaction displays show raw contract data rather than human-readable explanations. Built-in swap function charges 0.875% fee. Network management requires manual RPC configuration.

**Rabby Wallet** is a DeFi-focused browser wallet built by the DeBank team. It is specifically designed for active DeFi users.

**Strengths:**
- **Transaction simulation.** Before you sign, Rabby shows you what will happen — which tokens will leave your wallet, which will arrive, and what approvals will be set. This is the single most valuable security feature for DeFi users.
- **Automatic chain switching.** Rabby detects which chain a dApp is on and switches automatically. No more "Wrong Network" errors.
- **Multi-chain asset display.** Shows all your assets across all EVM chains in one view.
- **Built-in approval management.** Surfaces active approvals and makes revocation easy.
- **Lower swap fees.** 0.25% vs. MetaMask's 0.875%.

**Weaknesses:** Smaller user base means less community support. Some niche dApps may not officially support Rabby (though it's compatible with virtually everything MetaMask works with).

**Recommendation:** Use Rabby as your primary DeFi wallet for its transaction simulation and chain management. Keep MetaMask installed as a backup for dApps that specifically require it. Both wallets can import the same seed phrase and access the same accounts.

### 3.4 — Hardware Wallet Integration

A hardware wallet does not replace MetaMask or Rabby — it enhances them. The configuration looks like this:

1. You set up a Ledger (or Trezor) device and generate a seed phrase on the device itself
2. You connect the hardware wallet to MetaMask or Rabby
3. Your wallet software shows a "Ledger" account alongside your regular hot wallet accounts
4. When you interact with a DeFi protocol using the Ledger account, your wallet software prepares the transaction, sends it to the Ledger for signing, you physically verify and confirm on the device's screen, and the signed transaction is sent back and broadcast

**The key never leaves the device.** Even if your computer is fully compromised with malware, the attacker cannot sign transactions without physical access to your Ledger and knowledge of your PIN.

**What hardware wallets do NOT protect against:**
- **Signing malicious transactions.** If a phishing site tricks you into signing a transaction that drains your wallet, and you confirm it on your Ledger, the Ledger will faithfully sign it. The device protects your key, not your judgment.
- **Approval exploits.** If you approved a malicious contract using your hardware wallet, the approval is valid and the contract can drain you without further signatures.
- **Social engineering.** No hardware device can protect you from being tricked into revealing your seed phrase.

**Operational setup for DeFi:**
- Ledger Nano S Plus or Nano X (~$80–150) is the standard recommendation
- Generate the seed phrase on the device itself — never on a computer
- Install the Ethereum app on the Ledger via Ledger Live
- Connect to Rabby (preferred) or MetaMask via USB
- Enable "blind signing" only when necessary (some DeFi contracts require it) and disable it afterward

### 3.5 — Seed Phrase Security Architecture

Your seed phrase is the master key to everything. How you store it determines the ceiling of your security.

**Threat model for seed phrase storage:**

| Threat | Paper Storage | Metal Storage | Digital Storage | Memory Only |
|--------|--------------|---------------|-----------------|-------------|
| Fire / flood | Vulnerable | Resistant | Depends | Immune |
| Theft | Vulnerable if found | Vulnerable if found | Very vulnerable | Immune |
| Digital hack | Immune | Immune | Extremely vulnerable | Immune |
| Loss / forgetting | Low risk | Low risk | Medium risk | High risk |
| Inheritance | Possible | Possible | Complicated | Impossible |

**Recommended approach for meaningful amounts (>$5,000):**

1. Write seed phrase on paper immediately during wallet creation. Never say it aloud. Never type it into any device.
2. Transfer the paper copy to a durable medium — a metal seed storage device (Cryptosteel, Billfodl) resistant to fire and water.
3. Store in two physically separate locations (e.g., home safe and a trusted relative's safe, or a bank safe deposit box).
4. Never store your seed phrase digitally — no photos, no cloud storage, no password managers for the seed itself. (Password managers are fine for exchange passwords and 2FA codes, but not for seed phrases.)
5. Consider splitting: Shamir's Secret Sharing (supported by Trezor) splits your seed into multiple shares where you need, say, 3 of 5 shares to reconstruct it. This protects against any single share being stolen.

---

## 4. Real-World Examples

### 4.1 — The Bybit Hack (February 2025) — $1.5 Billion

The largest single theft in cryptocurrency history. The Lazarus Group (North Korean state-sponsored hackers) exploited a vulnerability in the wallet infrastructure used by Bybit exchange.

**What happened:** Bybit used a multisignature cold wallet (Safe/Gnosis Safe) for storing customer ETH. The attackers compromised the signing interface — not the Safe contract itself — by manipulating the front-end code that signers used to verify transactions. The signers saw a legitimate-looking transaction on their screens while actually signing a transaction that transferred all funds to the attacker's address. This is called a **blind signing attack** — the signers' hardware wallets correctly signed the transaction they were given, but the transaction was not what the signers believed it to be.

**Lesson for individual users:** Even hardware wallets with multisig cannot protect you if the transaction you're signing has been tampered with before it reaches your device. Always verify transaction details on your hardware wallet's screen, not on your computer screen. Rabby's transaction simulation is particularly valuable here — it shows the actual outcome of the transaction, not just the raw data.

### 4.2 — Approval-Based Wallet Drainers

Wallet draining services operate as a criminal business model. Attackers create phishing websites that mimic popular DeFi protocols, NFT mints, or airdrop claims. When a user connects their wallet and "approves" a transaction, they are actually granting unlimited token approval to the attacker's contract. The attacker then sweeps all approved tokens.

**Scale:** Wallet drainers stole approximately $494 million in 2024. The most sophisticated operations use "drainer-as-a-service" platforms where the technology is sold to scammers for a percentage of stolen funds.

**Common vectors:**
- Fake airdrop claim sites ("Claim your free tokens!")
- Compromised Discord announcements with phishing links
- Google Ads that appear above legitimate protocol websites
- Fake "revoke approvals" sites that actually set new malicious approvals
- Compromised X/Twitter accounts of legitimate projects posting phishing links

**Defense:** Never click links from Discord DMs, Twitter DMs, or emails claiming to be crypto projects. Always type protocol URLs manually or use bookmarks. Check the URL character by character — attackers use lookalike domains (uniswap.org vs. un1swap.org vs. uniswap-claim.com). Use Rabby's transaction simulation to see what you're actually signing before confirming.

### 4.3 — The "Ice Phishing" Attack Pattern

In traditional phishing, attackers steal your private key. In "ice phishing," they don't need your key — they just need you to sign one approval transaction.

**The attack flow:**
1. User visits a site that looks like a legitimate dApp
2. The site requests a token approval — not a transfer, just an approval
3. The user's wallet shows "Approve USDC" — this looks normal, every DeFi interaction starts with an approval
4. The user confirms
5. The approval grants the attacker's contract permission to move all the user's USDC
6. Minutes, hours, or days later, the attacker calls `transferFrom()` and drains the tokens

**Why it works:** Users are trained to approve tokens as a normal part of DeFi. The approval transaction itself is cheap, looks routine, and doesn't immediately move any funds. The actual theft happens in a separate transaction — often after a delay designed to avoid suspicion.

**Defense:** Before approving any token, verify: what contract address are you approving? Is it the legitimate protocol contract? (Check against the protocol's official documentation.) What amount are you approving? (If it's unlimited, reduce it to only what's needed.) Rabby's transaction simulation will show you the approval details and flag unfamiliar contracts.

### 4.4 — The $320M Wormhole Exploit: Why Key Management Matters at Protocol Level

In February 2022, the Wormhole bridge was exploited for $320 million because an attacker found a way to bypass the signature verification process. The bridge's smart contract accepted a forged "guardian" signature and released 120,000 wrapped ETH without the corresponding deposit.

**Lesson:** The same cryptographic principles that protect your wallet — private keys, digital signatures, verification — also protect protocol infrastructure. When signature verification fails at any level, catastrophic loss follows. This is why understanding the signing mechanism is not theoretical knowledge — it's the foundation of every security judgment you'll make in DeFi.

---

## 5. Security Considerations

### 5.1 — The Threat Landscape: What Can Go Wrong

**Tier 1 — Key Compromise (Total Loss)**
- Malware that extracts seed phrases or private keys from browser storage
- Seed phrase stolen through physical access, social engineering, or digital exposure
- Supply chain attack on wallet software (malicious update)

**Defense:** Hardware wallet for all significant funds. Seed phrase never stored digitally. Wallet software downloaded only from official sources. Separate browser profile for DeFi.

**Tier 2 — Approval Exploitation (Partial or Total Loss)**
- Malicious approval to a drainer contract
- Exploited protocol contract with your unlimited approval still active
- Legitimate protocol governance attack that changes contract behavior

**Defense:** Limited approvals. Regular revocation of unused approvals. Transaction simulation before signing. Never approve tokens on unfamiliar sites.

**Tier 3 — Transaction Manipulation (Per-Transaction Loss)**
- Signing a transaction you don't understand
- Clipboard malware replacing the destination address when you copy-paste
- Front-end compromise of a legitimate protocol website

**Defense:** Verify destination addresses on hardware wallet screen. Use address book features. Verify transaction simulation output. Bookmark official sites.

**Tier 4 — Operational Errors (Per-Transaction Loss)**
- Sending tokens to the wrong address (irreversible)
- Sending tokens to a contract that can't receive them (potentially irreversible)
- Sending on the wrong chain (recoverable in some cases)
- Setting gas too low (transaction stuck, sometimes exploitable)

**Defense:** Test with small amounts first. Double-check addresses. Verify the correct network. Use Rabby's automatic chain detection.

### 5.2 — Personal Security Checklist

**Wallet Setup:**
- [ ] Hardware wallet purchased from official manufacturer
- [ ] Seed phrase written on paper/metal, never digitally
- [ ] Seed phrase stored in two physically separate secure locations
- [ ] Hardware wallet PIN set (not a simple sequence)
- [ ] Hot wallet (Rabby or MetaMask) installed from official source only
- [ ] Hardware wallet connected as signing device through Rabby/MetaMask
- [ ] Separate wallet address for active DeFi (hot) vs. storage (cold)

**Operational Security:**
- [ ] Dedicated browser (or browser profile) for DeFi activity — no other extensions
- [ ] All DeFi protocol URLs bookmarked; never click links from social media or messages
- [ ] Transaction simulation reviewed before every signature
- [ ] Token approvals checked monthly on revoke.cash
- [ ] No unlimited approvals — amounts set to only what's needed
- [ ] Test transactions sent before large transfers

**Environmental Security:**
- [ ] Computer and phone OS kept updated
- [ ] No pirated software installed (common malware vector)
- [ ] Home WiFi secured with WPA3 or WPA2 with strong password
- [ ] 2FA enabled on all exchange accounts (hardware key preferred, authenticator app acceptable, SMS not recommended)
- [ ] Email used for crypto accounts is not publicly associated with your identity

### 5.3 — The Wallet Separation Strategy

Professional DeFi operators maintain multiple wallets for different purposes:

**Vault Wallet (Hardware, Cold):** Long-term storage only. No DeFi approvals. Receives assets from other wallets. Only transacts to send assets out or to stake. This wallet's address should have minimal on-chain footprint.

**DeFi Wallet (Hardware-signed via Rabby):** Active DeFi positions. Has approvals to the protocols you're currently using. Regularly audited for unnecessary approvals. Contains only the capital actively deployed in strategies.

**Transaction Wallet (Hot, Small Balance):** For testing new protocols, claiming airdrops, interacting with unfamiliar contracts. Contains only what you're willing to lose. This wallet absorbs the risk of exploring unknown dApps.

**Flow:** Exchange → Vault → DeFi Wallet → Protocols. Never connect your Vault wallet to a dApp. If a DeFi position needs more capital, send it from Vault to DeFi Wallet first.

---

## 6. Practical Exercise

### Exercise 2.1 — Set Up MetaMask and Rabby

**Goal:** Install and configure both wallets. Understand that the same seed phrase creates the same addresses in different wallet software.

**Steps:**

1. **Install MetaMask**
   - Go to [metamask.io](https://metamask.io) (verify the URL character by character)
   - Install the browser extension for Chrome/Firefox/Brave
   - Select "Create a New Wallet"
   - Write down the 12-word seed phrase on paper. Do NOT screenshot or copy-paste
   - Verify the seed phrase when prompted
   - Set a strong password for the browser extension
   - Note your wallet address (0x...)

2. **Install Rabby Wallet**
   - Go to [rabby.io](https://rabby.io) (verify the URL)
   - Install the browser extension
   - Select "Import" → "Seed Phrase"
   - Enter the same seed phrase you created in MetaMask
   - Verify: both wallets should show the same address

3. **Observe:** You now have two different wallet interfaces controlling the same account. This proves the wallet is just a viewer/signer — your identity is the private key (seed phrase), not the software.

### Exercise 2.2 — Fund With Testnet ETH and Send Transactions

**Goal:** Practice transactions without risking real money.

**Steps:**

1. Switch both wallets to the **Sepolia** testnet
   - MetaMask: Settings → Networks → Show Test Networks → Select Sepolia
   - Rabby: Networks → Enable Sepolia testnet

2. Get testnet ETH from a faucet:
   - Google Cloud Web3 Faucet: [cloud.google.com/application/web3/faucet](https://cloud.google.com/application/web3/faucet)
   - Alchemy Faucet: [sepoliafaucet.com](https://sepoliafaucet.com)
   - Request 0.1 Sepolia ETH

3. Create a second account in MetaMask (Account 2)
4. Send 0.01 Sepolia ETH from Account 1 to Account 2
5. While the transaction is pending, observe:
   - The "Pending" state in your wallet
   - Find the transaction on [sepolia.etherscan.io](https://sepolia.etherscan.io)
   - Watch it move from "Pending" to "Confirmed"

6. **Observe in Rabby:** Before confirming the send, note how Rabby shows the transaction simulation — "0.01 ETH will leave your wallet." Compare this with MetaMask's confirmation screen.

**Questions to answer:**
- How much gas did the send transaction cost?
- How long did it take to confirm?
- What does the transaction look like on Sepolia Etherscan?

### Exercise 2.3 — Practice Token Approval Awareness

**Goal:** Understand what an approval transaction looks like and how to manage it.

**Steps:**

1. Go to [revoke.cash](https://revoke.cash) and connect your wallet (you can use mainnet even if you have no active approvals — it will show an empty list)
2. If you have any existing approvals from previous crypto activity, review them:
   - Which contracts have you approved?
   - Are any unlimited?
   - Do you recognize all of them?
   - Are any for protocols you no longer use?

3. If you have approvals you no longer need, revoke them (costs a small gas fee)
4. Note: revoking an approval does NOT remove your funds from a protocol. It only removes the contract's permission to move your tokens in the future.

**If you have no existing approvals:** Bookmark revoke.cash and return to this exercise after Module 4 when you'll make your first testnet swap on a DEX.

### Exercise 2.4 — Verify a Transaction Before Signing (Rabby Simulation)

**Goal:** Practice reading what a transaction will actually do before you approve it.

**Steps:**

1. Go to [app.uniswap.org](https://app.uniswap.org) with Rabby connected (on Sepolia testnet if possible, or just observe the interface on mainnet without executing)
2. Set up a small swap (e.g., ETH → USDC)
3. Click "Swap" — Rabby will show a pre-sign simulation screen
4. Read the simulation carefully and identify:
   - What tokens are leaving your wallet? What amounts?
   - What tokens are arriving? What amounts?
   - Is there an approval transaction required first?
   - What contract address are you interacting with?
   - Does Rabby flag any risk warnings?

5. **Do NOT confirm** if on mainnet with real funds. The goal is to practice reading the simulation output, not to execute.

**Key habit to build:** Never sign a transaction without reading the Rabby simulation (or MetaMask's transaction details if Rabby isn't available). If the simulation shows unexpected token movements — especially tokens leaving your wallet that shouldn't be — reject the transaction immediately.

---

## 7. AI Tutor Q&A Examples

---

**Q: My friend says I should store my seed phrase in a password manager like 1Password. Is that safe?**

A: This is a common debate. Password managers are excellent for exchange passwords, 2FA backup codes, and other credentials. But a seed phrase is different — it's not a credential to an account that can be recovered or frozen. It's the absolute master key with no recovery option. Storing your seed phrase in a password manager means trusting that the password manager won't be breached, that your master password won't be compromised, that the cloud sync won't leak data, and that you'll always have access to the password manager. For most people with significant amounts (>$5,000), the physical storage approach — written on metal, stored in two secure locations — eliminates all digital attack vectors. For small amounts, the convenience of a password manager may be acceptable. But never use it for your primary cold storage seed.

---

**Q: What's the difference between signing a "message" and signing a "transaction"?**

A: A transaction changes the blockchain state — it moves tokens, calls smart contract functions, or modifies approvals. It costs gas and is recorded on-chain permanently. A message signature (sometimes called "Sign" or "Personal Sign") is an off-chain cryptographic proof that you control an address. It doesn't cost gas and doesn't create a transaction on-chain. Message signing is commonly used to log into dApps ("Sign this message to verify your wallet"), confirm governance votes on Snapshot, or prove ownership. However, there's a dangerous middle ground: **Permit signatures** (EIP-2612) look like message signatures (no gas cost, off-chain) but actually grant token approval authority. If a malicious site asks you to sign a Permit message, they can use your signature to set an approval and drain your tokens — all without you ever seeing an on-chain transaction. Rabby flags Permit signatures specifically because of this risk.

---

**Q: I connected my wallet to a suspicious website by accident. Am I compromised?**

A: Connecting your wallet to a website (clicking "Connect Wallet") only shares your public address. This is not dangerous by itself — your address is public anyway. No funds can be stolen just by connecting. The danger comes from the next step: signing a transaction or approval. If you connected but did NOT sign anything, your funds are safe. Disconnect the site from your wallet (MetaMask: three dots → Connected Sites → Disconnect; Rabby: Connected Sites → Remove), and you're fine. If you did sign something, check what you signed: go to revoke.cash to see if any new approvals appeared. If you see an unfamiliar approval, revoke it immediately and consider moving your assets to a fresh wallet.

---

**Q: Is a 12-word seed phrase less secure than a 24-word phrase?**

A: A 12-word seed phrase provides 128 bits of entropy. A 24-word phrase provides 256 bits. Both are astronomically secure against brute-force attacks. The entire Bitcoin mining network operating for the age of the universe could not guess a 128-bit key. For practical purposes, 12 words is sufficient. Most major wallets (MetaMask, Rabby) use 12 words by default. Ledger uses 24 words. The security difference between 12 and 24 words is not relevant for individual users — your seed phrase will be compromised by human error (phishing, poor storage, accidental exposure) long before it's compromised by brute force.

---

**Q: What happens to my DeFi positions if I lose my hardware wallet?**

A: Nothing happens to your positions. Your positions exist on the blockchain, not on the hardware wallet. The hardware wallet only stores the private key. If you lose the device but still have your seed phrase, you buy a new hardware wallet, enter the same seed phrase during setup, and you have full access to everything — same addresses, same positions, same tokens. If you lose both the device AND the seed phrase, your funds are permanently inaccessible. Nobody — not Ledger, not Ethereum developers, not anyone — can recover them. This is why the seed phrase backup is the most important piece of your security infrastructure. The hardware wallet is replaceable. The seed phrase is not.

---

## 8. Key Takeaways

**1. Your wallet is a signing device, not a vault.** Tokens live on the blockchain. The wallet holds the private key that authorizes transactions. Different wallet software can access the same funds because the key — not the software — is your identity.

**2. The seed phrase is the master key.** 12 or 24 words that control everything. Store on paper or metal in two separate physical locations. Never store digitally. Never share. Never type into any website. There is no recovery if lost.

**3. Token approvals are your largest ongoing attack surface.** Every time you approve a token for a smart contract, you're granting it permission to move your funds. Unlimited approvals persist forever unless revoked. Check and revoke approvals monthly at revoke.cash.

**4. Transaction simulation is your best real-time defense.** Rabby's pre-signing simulation shows you exactly what will happen before you commit. Use it for every transaction. If the simulation shows unexpected token movements, reject immediately.

**5. Hardware wallets protect your key, not your judgment.** A hardware wallet makes it impossible to extract your private key remotely. But it will faithfully sign any transaction you approve — including malicious ones. Always verify transaction details on the device's screen.

**6. Wallet separation reduces blast radius.** A vault wallet (no DeFi approvals), a DeFi wallet (active positions), and a transaction wallet (exploration) ensure that compromising one doesn't compromise everything. Professional operators always maintain this separation.

**7. Most crypto losses come from human error, not technical exploits.** Phishing, social engineering, poor seed phrase storage, and approval carelessness cause more losses than smart contract hacks. Your personal security practices are more important than any technology.

---

## Navigation

| Previous | Current | Next |
|----------|---------|------|
| ← Module 1: Blockchain Fundamentals | **Module 2: Wallets & Security** | Module 3: Gas, Tokens & Etherscan → |

---

*Module 2 complete. Security is not a one-time setup — it's an ongoing practice. The habits established in this module (transaction simulation, approval management, wallet separation) will protect you across every subsequent module and every DeFi interaction for as long as you operate on-chain.*
