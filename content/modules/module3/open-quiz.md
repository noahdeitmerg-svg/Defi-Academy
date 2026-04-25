## Modul-Abschluss-Quiz

Die folgenden fünf Fragen testen dein integriertes Verständnis von Modul 3.

**Frage 1:** Du willst einen Swap von 1 ETH zu USDC auf Uniswap V3 ausführen. Der aktuelle Gas Price ist 25 Gwei Base Fee + 2 Gwei Priority Fee. Wie hoch sind die ungefähren Gas-Kosten in ETH?

<details>
<summary>Antwort anzeigen</summary>

Ein Uniswap V3 Swap verbraucht typischerweise 150.000 Gas. Die effektive Gas Price ist 25 + 2 = 27 Gwei. Berechnung: 150.000 × 27 × 10⁻⁹ = 0,00405 ETH. Bei 3.000 USD pro ETH sind das etwa 12,15 USD. Wichtig: die Base Fee (25 Gwei) wird verbrannt, die Priority Fee (2 Gwei) geht an den Validator. Wenn du Zeit hast und die Gas-Preise gerade hoch sind, lohnt sich Warten — die Base Fee kann innerhalb weniger Stunden signifikant fallen.
</details>

**Frage 2:** Wie hat EIP-4844 die Struktur von Layer-2-Gebühren verändert, und warum war das technisch möglich?

<details>
<summary>Antwort anzeigen</summary>

Vor EIP-4844 posteten Rollups ihre Daten als normale Calldata auf Ethereum Mainnet, was 80–95% der L2-Transaktionskosten ausmachte. EIP-4844 führte Blobs ein — einen neuen Datentyp mit drei Eigenschaften: (1) eigener, niedriger Gas-Markt entkoppelt von Calldata, (2) nur 18 Tage temporäre Speicherung, (3) KZG-Commitments statt direktem EVM-Zugriff. Technisch möglich, weil Rollups die Daten nur kurzfristig brauchen — für Verifikation, Fraud-Proofs oder ZK-Proof-Generation. Dauerhaftes Speichern in Ethereum-State ist unnötig. Diese Einsicht hat L2-Gebühren um den Faktor 10 reduziert. Ein Arbitrum-Swap ging von 0,30 USD auf 0,03 USD, was neue Nutzungsmuster ermöglicht (häufiges Rebalancing, Micro-Trades).
</details>

**Frage 3:** Ein Token-Contract zeigt auf Etherscan: Name = "USDC", Symbol = "USDC", aber die Contract-Adresse ist nicht `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`. Ist das der echte USDC?

<details>
<summary>Antwort anzeigen</summary>

Nein — oder zumindest nicht auf Ethereum Mainnet. Die offizielle USDC-Adresse auf Ethereum Mainnet ist die genannte 0xA0b86991... Jeder andere Contract, der sich "USDC" nennt, ist entweder: (1) ein Scam-Token mit dem gleichen Namen auf Ethereum (Phishing-Vektor), (2) USDC auf einer anderen Chain (jede Chain hat eigene Contract-Adresse), oder (3) eine bridged Version von USDC (z.B. USDC.e auf Arbitrum vor der native USDC-Migration). Bei Token-Imports in die Wallet immer die offizielle Adresse aus einer verlässlichen Quelle (CoinGecko, Protokoll-Website, offizielle Docs) verifizieren — Name und Symbol allein sind keine Garantie. Scammer registrieren routinemäßig gefälschte Versionen von bekannten Tokens.
</details>

**Frage 4:** Warum ist es gefährlich, `setApprovalForAll` auf einer NFT-Collection zu signieren, die du nicht aktiv verwaltest?

<details>
<summary>Antwort anzeigen</summary>

`setApprovalForAll` gibt dem Operator unbeschränkten Zugriff auf alle aktuellen und zukünftigen NFTs dieser Collection. Auch wenn du die Approval ursprünglich für einen legitimen Marktplatz gegeben hast, bleibt sie unendlich bestehen, bis du sie explizit widerrufst. Wenn der Marktplatz-Contract später gehackt oder seine Schlüssel kompromittiert werden, können alle deine NFTs in einer einzigen Transaktion abgezogen werden. Dieser Vektor wurde in mehreren großen NFT-Hacks ausgenutzt. Mitigation: `setApprovalForAll` nur auf aktiv genutzten Marktplätzen, monatlicher Audit via revoke.cash (NFT-Tab) oder Etherscan-Token-Approval-Checker, und bei wertvollen Collections Verteilung über mehrere Wallets erwägen.
</details>

**Frage 5:** Du siehst eine unerwartete Outbound-Transaktion von deiner Wallet, bei der 2.000 USDC an eine unbekannte Adresse gingen. Beschreibe den Etherscan-Workflow, um zu verstehen, was passiert ist.

<details>
<summary>Antwort anzeigen</summary>

Schritte: (1) Transaktion auf Etherscan öffnen via Hash. (2) Status prüfen — Success oder Fail (vermutlich Success, weil die USDC ja weg sind). (3) From und To identifizieren: From sollte deine Wallet sein, To ist wahrscheinlich ein Contract (Drainer oder legitime DApp). (4) Decoded Input Data anschauen — welche Funktion wurde aufgerufen? Bei einem Drainer typischerweise `transferFrom(from=deineAdresse, to=drainerAdresse, amount=...)` — ausgeführt vom Drainer, der zuvor eine Approval bekommen hat. (5) Logs prüfen: ein Transfer-Event über 2.000 USDC sollte sichtbar sein, plus eventuell weitere Token-Transfers wenn der Drainer mehrere Tokens abgezogen hat. (6) Die Spender-Adresse weiter verfolgen: welche anderen Opfer hatte sie? Gibt es Rückverfolgbarkeit? Nach der Analyse ist der nächste Schritt in Lektion 2.6 beschrieben: sofort verbliebene Assets sichern, alle Approvals widerrufen, neue Wallet aufsetzen. Die Etherscan-Forensik hilft zu verstehen, welche Wallets/Tokens noch betroffen sein könnten.
</details>

---

## Modul-Zusammenfassung

Modul 3 hat die technische Schicht unter DeFi geöffnet:

**Gas-Mechanik:** Gas als Einheit für Rechenarbeit. Formel: Gas Used × Gas Price = ETH-Kosten. Drei zentrale Größen: Limit, Used, Price. Typische Verbräuche für DeFi-Operationen liegen zwischen 21.000 (einfacher Transfer) und 500.000 (komplexe LP-Position). Failed Transactions kosten trotzdem Gas.

**EIP-1559:** Base Fee (algorithmisch, wird verbrannt) + Priority Fee (Tip an Validator). Block-Auslastung steuert Base Fee (±12,5% pro Block). Der Burn-Mechanismus macht ETH periodisch deflationär. ultrasound.money zum Tracking.

**EIP-4844 Blobs:** Seit März 2024 — L2-Kosten um Faktor 10 reduziert. Blobs als separater Daten-Typ mit eigenem Gas-Markt, temporärer 18-Tage-Speicherung, KZG-Commitments. Hat L2-DeFi praktisch nutzbar gemacht.

**ERC-20-Standard:** Sechs Pflicht-Funktionen (balanceOf, transfer, approve, transferFrom, allowance, totalSupply). Decimals als häufige Fehlerquelle (USDC 6, ETH/DAI 18). Mint/Burn-Mechanismen variieren. Problematische Varianten: Fee-on-Transfer, Rebase, Pause-fähig, Blacklist. WETH als 1:1-Wrapper für ETH.

**NFT-Standards:** ERC-721 klassisch, ERC-1155 mehrzweck. `setApprovalForAll` als systemischer Drainer-Vektor. Metadaten-Speicherung (HTTP, IPFS, On-Chain) mit verschiedenen Permanenzgarantien. NFTs im DeFi-Kontext: Uniswap V3 LP-Positionen, ve-Tokens.

**Etherscan-Forensik:** Address, Transaction und Block Pages. Wichtigkeit von Internal Transactions und Token Transfers neben normalen Transactions. Decoded Input Data und Event-Logs für forensische Analyse. Read/Write Contract für direkte Interaktion. Verifiziert vs. unverifiziert als binäres Sicherheits-Signal.

**Was in Modul 4 kommt:** DEX-Mechanik. Wie Automated Market Makers funktionieren (Constant-Product-Formel). Uniswap V2 vs. V3. Slippage, Price Impact und MEV. Was du als Swapper verstehen musst, um systematisch nicht zu verlieren.

---

*Ende von Modul 3.*