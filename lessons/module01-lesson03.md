# Die Bausteine: Blockchains, Smart Contracts, Tokens, Wallets

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die vier grundlegenden Bausteine von DeFi benennen und ihre Funktion erklären
- Verstehen, wie Smart Contracts Geld ohne Intermediäre bewegen
- Die Rolle von Tokens als Abstraktion für unterschiedliche Vermögenswerte einordnen
- Den ERC-20-Standard als Grundlage für Protokoll-Interoperabilität erkennen
- Die technische Rolle einer Wallet (Private-Key-Verwaltung, nicht Token-Verwahrung) korrekt beschreiben
- Einen vollständigen DeFi-Vorgang in fünf technischen Schritten von Wallet-Signatur bis Ledger-Update zerlegen

## Erklärung

DeFi läuft auf vier technischen Grundpfeilern. Wer diese vier Bausteine versteht, kann jedes DeFi-Protokoll konzeptionell einordnen.

**Baustein 1: Die Blockchain**

Eine Blockchain ist ein öffentliches, verteiltes Ledger. Stell es dir als eine globale Datenbank vor, die auf tausenden Computern gleichzeitig läuft und bei der alle Kopien synchronisiert bleiben. Neue Einträge (Transaktionen) werden in Blöcke gepackt und an die bestehende Kette angehängt — daher der Name. Änderungen an vergangenen Blöcken sind praktisch unmöglich, weil das erfordern würde, alle kryptographischen Hashes seither neu zu berechnen und eine Mehrheit der Netzwerk-Teilnehmer davon zu überzeugen.

**Ethereum** ist die dominante Blockchain für DeFi. Sie ist nicht die einzige — Solana, Arbitrum, Base, Optimism und andere sind bedeutend — aber Ethereum hat die größte DeFi-Liquidität und setzt die Standards. In diesem Kurs fokussieren wir primär auf EVM-basierte Chains (Ethereum und kompatible Netzwerke).

**Baustein 2: Smart Contracts**

Ein Smart Contract ist ein Programm, das auf der Blockchain läuft. Der Code wird einmal bereitgestellt (deployed) und läuft dann deterministisch: gleicher Input → gleicher Output, immer. Niemand kann den Code ändern, sobald er deployed ist (außer er enthält gezielt eingebaute Upgrade-Mechanismen — mehr dazu in Modul 3).

Ein einfaches Beispiel: Ein Smart Contract für einen dezentralen Exchange (DEX) enthält eine Funktion `swap(token_in, token_out, amount)`. Ruft eine Wallet diese Funktion mit 1 ETH → USDC auf, prüft der Contract die aktuellen Pool-Bestände, berechnet den Wechselkurs nach Formel, nimmt die 1 ETH entgegen und sendet entsprechendes USDC zurück — alles in derselben Transaktion, atomar, ohne menschliche Zustimmung.

Smart Contracts sind das Herz von DeFi. Sie ersetzen den Intermediär.

**Baustein 3: Tokens**

Ein Token ist eine Einheit innerhalb eines Smart Contracts. Der Contract führt ein internes Ledger ("address X hält Y tokens") und bietet Standardfunktionen für Übertragung. Der wichtigste Token-Standard ist **ERC-20** — er definiert, welche Funktionen ein Token-Contract bereitstellen muss (`balanceOf`, `transfer`, `approve`, `transferFrom`). Weil alle ERC-20-Tokens diese Schnittstelle teilen, kann jedes DeFi-Protokoll mit jedem ERC-20-Token umgehen, ohne Sonderlogik.

Tokens repräsentieren alles mögliche:
- **Native Assets** wie ETH (ETH selbst ist technisch kein ERC-20, aber gewickelt als WETH wird es eins)
- **Stablecoins** wie USDC, USDT, DAI
- **Governance-Tokens** wie UNI, AAVE, MKR
- **Liquid-Staking-Tokens** wie stETH, rETH
- **LP-Tokens**, die einen Anteil an einem Liquiditätspool repräsentieren
- **Yield-bearing Tokens**, die eine Lending-Position repräsentieren (aUSDC, cUSDC)

Ein Token ist also nicht "Geld". Ein Token ist eine kryptographisch abgesicherte Eintragung, die repräsentieren kann, was der zugrundeliegende Contract definiert.

**Baustein 4: Wallets**

Eine Wallet ist das Interface des Nutzers zur Blockchain. Technisch besteht eine Wallet aus:
- Einem **Private Key** (ein großes zufälliges Zahlenwerk)
- Einer daraus abgeleiteten **Public Key / Adresse**
- Software, die Transaktionen mit dem Private Key signiert

Die Wallet verwahrt **keine** Tokens — Tokens liegen in den jeweiligen Smart Contracts, die einfach verzeichnen, welche Adresse wie viel hält. Die Wallet verwahrt nur den Private Key, der die Autorität über die Adresse gibt.

Bekannte Wallets: MetaMask, Rabby, Ledger (Hardware), Trezor (Hardware), Safe (Multisig).

Wir behandeln Wallet-Architektur und Sicherheit ausführlich in Modul 2.

**Wie die vier Bausteine zusammenspielen**

Ein typischer DeFi-Vorgang sieht so aus:
1. Dein Wallet signiert eine Transaktion, die eine Funktion in einem Smart Contract aufruft.
2. Die Transaktion wird an die Blockchain gesendet.
3. Validatoren führen den Smart-Contract-Code aus und aktualisieren das globale Ledger.
4. Tokens (Balancen in anderen Smart Contracts) werden entsprechend angepasst.
5. Das Ergebnis ist für jeden on-chain einsehbar.

Kein Mensch hat entschieden, keine Bank hat autorisiert. Der Code hat ausgeführt.

## Folien-Zusammenfassung

**[Slide 1] — Titel**
Die vier Bausteine von DeFi

**[Slide 2] — Baustein 1: Blockchain**
- Öffentliches, verteiltes Ledger
- Läuft auf tausenden Computern synchron
- Einträge sind praktisch unveränderlich
- Ethereum = dominante DeFi-Blockchain

**[Slide 3] — Baustein 2: Smart Contract**
- Programm auf der Blockchain
- Deterministisch, unveränderlich
- Ersetzt den Intermediär
- Beispiel: `swap(ETH, USDC, 1)` → automatisch

**[Slide 4] — Baustein 3: Token**
- Einheit in einem Smart Contract
- ERC-20 = Standard-Interface
- Repräsentiert Assets: Stables, Governance, LP, Staking
- Nicht "Geld", sondern kryptographische Eintragung

**[Slide 5] — Baustein 4: Wallet**
- Interface zur Blockchain
- Verwaltet Private Key — nicht Tokens
- Signiert Transaktionen
- Beispiele: MetaMask, Rabby, Ledger

**[Slide 6] — Die vier Bausteine im Zusammenspiel**
Wallet signiert → Transaktion → Blockchain führt Smart Contract aus → Token-Balancen aktualisiert → alles öffentlich

## Sprechertext

**[Slide 1]**
DeFi läuft auf vier Bausteinen. Wer diese vier versteht, kann jedes Protokoll konzeptionell einordnen. Wir gehen sie einzeln durch.

**[Slide 2]**
Die Blockchain ist ein öffentliches, verteiltes Ledger. Eine globale Datenbank, die auf tausenden Computern gleichzeitig läuft, alle synchron. Transaktionen werden in Blöcke gepackt und an die bestehende Kette angehängt. Vergangene Blöcke zu ändern ist praktisch unmöglich. Ethereum ist die dominante DeFi-Blockchain — nicht die einzige, aber mit der größten Liquidität und den Standards, an denen sich andere orientieren.

**[Slide 3]**
Smart Contracts sind Programme auf der Blockchain. Deployed, deterministisch, unveränderlich. Ein Beispiel: eine DEX-Contract mit einer swap-Funktion. Du rufst swap-ETH-für-USDC auf, der Contract berechnet den Kurs, nimmt deine ETH und sendet USDC zurück. Alles atomar in einer Transaktion. Kein Intermediär. Der Code ist der Markt.

**[Slide 4]**
Tokens sind Einheiten innerhalb eines Smart Contracts. Der wichtigste Standard ist ERC-20. Er definiert die Funktionen, die jeder Token bereitstellen muss. Weil alle ERC-20-Tokens dieselbe Schnittstelle teilen, kann jedes Protokoll mit jedem Token umgehen. Tokens repräsentieren alles: Stablecoins, Governance-Rechte, Lending-Positionen, Liquiditätsanteile. Wichtig: ein Token ist keine Währung im klassischen Sinn, sondern eine kryptographisch abgesicherte Eintragung, deren Bedeutung vom zugrundeliegenden Contract definiert wird.

**[Slide 5]**
Die Wallet ist dein Interface zur Blockchain. Technisch verwaltet sie einen Private Key — eine große zufällige Zahl. Aus diesem Key wird deine Adresse abgeleitet. Die Wallet hält keine Tokens — Tokens liegen in den Token-Contracts, die nur verzeichnen, welche Adresse wie viel hält. Deine Wallet besitzt nur den Schlüssel, der Autorität über die Adresse gibt. Bekannte Wallets: MetaMask, Rabby — beide Software. Ledger und Trezor — Hardware-Wallets. Safe — für Multisig-Setups. Wallet-Sicherheit behandeln wir in Modul 2.

**[Slide 6]**
Zusammenspiel: deine Wallet signiert eine Transaktion. Sie geht an die Blockchain. Validatoren führen den Smart-Contract-Code aus und aktualisieren das globale Ledger. Token-Balancen werden angepasst. Alles öffentlich einsehbar. Kein Mensch hat entschieden — der Code hat ausgeführt. Das ist DeFi im Kern.

## Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Blockchain als Kette von Blöcken, visuell vereinfacht. Jeder Block enthält "Tx 1, Tx 2, Tx 3...". **SCREENSHOT SUGGESTION:** Screenshot eines realen Ethereum-Blocks auf etherscan.io/block/[aktuelle Nummer], zeigt Liste von Transaktionen.

**[Slide 3]** Vereinfachter Code-Ausschnitt einer `swap`-Funktion daneben ein Flussdiagramm mit Token-In/Token-Out.

**[Slide 4]** Liste verschiedener Token-Typen mit jeweiligem Logo/Icon: USDC, DAI, ETH, AAVE, UNI, stETH, aUSDC.

**[Slide 5]** Diagramm: Private Key → Public Address → Signaturprozess. **SCREENSHOT SUGGESTION:** Screenshot eines MetaMask-Fensters mit Adresse und Balance-Übersicht.

**[Slide 6]** Vereinfachtes End-to-End-Flussdiagramm der fünf Schritte einer Transaktion.

## Übung

**Aufgabe: Zerlege einen realen DeFi-Vorgang**

Öffne app.uniswap.org und simuliere (nicht ausführen!) einen Swap von 0,1 ETH zu USDC. Identifiziere vor dem Klicken auf "Swap":
1. Welcher Smart Contract wird aufgerufen? (Findest du im Transaktionsdetail, bevor du bestätigst, oder via etherscan.io unter "Uniswap Router")
2. Welche Tokens sind beteiligt (mit Contract-Adressen)?
3. Welche Wallet signiert die Transaktion?
4. Welche Blockchain führt die Transaktion aus?

**Deliverable:** Notiz mit den vier Antworten und den Contract-Adressen.

## Quiz

**Frage 1:** Warum sagt man, dass eine Wallet "keine Tokens hält"?

<details>
<summary>Antwort anzeigen</summary>

Tokens sind keine physischen Objekte, die in der Wallet lagern. Sie sind Einträge in Smart Contracts — der Token-Contract führt ein Ledger mit "Adresse X hält Y Tokens". Die Wallet verwaltet nur den Private Key, der die Autorität über eine bestimmte Adresse gewährt. Wenn du eine neue Wallet-Software installierst und denselben Private Key importierst, siehst du dieselben Token-Balancen, weil diese in den jeweiligen Token-Contracts liegen, nicht in der Wallet-App.
</details>

**Frage 2:** Was ist der Unterschied zwischen einem Smart Contract und einem traditionellen Server-Programm?

<details>
<summary>Antwort anzeigen</summary>

Ein Smart Contract läuft auf einer Blockchain und wird von allen Validatoren gleichzeitig ausgeführt — der Output ist deterministisch und prüfbar. Ein Server-Programm läuft auf einem zentralen Server, und nur der Betreiber sieht die interne Logik und die Daten. Smart Contracts sind nach Deployment unveränderlich (außer explizit eingebaute Upgrade-Mechanismen), Server-Programme können jederzeit vom Betreiber geändert werden. Smart Contracts benötigen keinen Intermediär zur Ausführung, Server-Programme werden vom Betreiber kontrolliert.
</details>

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 6 Slides: Titel → Blockchain → Smart Contract → Token → Wallet → Zusammenspiel der vier Bausteine
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — Blockchain-Kette (Etherscan-Screenshot), vereinfachter `swap()`-Code, Token-Typ-Liste mit Logos, Private-Key-Signatur-Diagramm (MetaMask-Screenshot)

Pipeline: Gamma → ElevenLabs → CapCut.

---
