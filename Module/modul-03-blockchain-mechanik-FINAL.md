# Modul 3 — Blockchain-Mechanik

**Zielgruppe:** Einsteiger bis Fortgeschrittene
**Geschätzte Dauer:** 90–110 Minuten
**Voraussetzungen:** Module 1 und 2 abgeschlossen

**Kursstufe:** Foundation (Technische Mündigkeit)
**Lektionsanzahl:** 6
**Didaktische Ausrichtung:** Gas-Mechanik, EIP-1559 & Burn, Layer-2-Skalierung (EIP-4844), Token-Standards (ERC-20/721/1155), Etherscan-Forensik
**Konformität:** Final Fix Document v1 — Struktur, Terminologie und Pipeline-Assets harmonisiert

**Harmonisierte Terminologie (gültig im gesamten Modul):**
- Gas Limit, Gas Used, Gas Price (Gwei)
- Base Fee, Priority Fee (EIP-1559)
- Validator, Block Producer, Block Production Flow
- MEV (Maximal Extractable Value) — vertieft in Modul 11
- Layer-2 Rollup (Optimistic / ZK), Blob (EIP-4844)
- ERC-20, ERC-721, ERC-1155
- Smart Contract Risk, Operator Risk

**Querverweise:**
- Validator Economics & Block Production werden in Lektion 3.2 im Kontext der Fee-Dynamik eingeführt; MEV-Grundlagen werden hier nur touchiert und in Modul 11 vertieft.
- ERC-20-Drainer-Vektoren via `approve/transferFrom` sind in Modul 2 detailliert behandelt.

**Video-Pipeline:** Jede Lektion ist für Gamma (Slides) → ElevenLabs (Voice) → CapCut (Video) vorbereitet. Zielvideo-Länge pro Lektion: 8–10 Minuten (120–140 WPM).

---

## Modul-Überblick

In Modul 1 wurde DeFi konzeptionell eingeordnet. In Modul 2 wurde das Sicherheits-Fundament gelegt. Modul 3 öffnet die Motorhaube: Wie funktionieren Gas-Kosten tatsächlich? Was passiert technisch bei einer Transaktion? Warum sind Layer-2-Netzwerke seit 2024 so viel günstiger geworden? Wie liest man einen Token-Contract auf Etherscan?

Das Ziel dieses Moduls ist technische Mündigkeit: Nach Abschluss sollst du jeden ERC-20-Token-Contract selbst analysieren, jede Transaktion auf Etherscan decodieren und fundiert entscheiden können, auf welchen Chains du Kapital bewegst.

**Lektionen:**
1. Wie Gas auf Ethereum funktioniert
2. EIP-1559 und der Burn-Mechanismus
3. EIP-4844-Blobs und die Layer-2-Gebühren-Revolution
4. Der ERC-20-Token-Standard im Detail
5. NFT-Standards: ERC-721 und ERC-1155
6. Etherscan als Untersuchungs-Tool

---

## Lektion 3.1 — Wie Gas auf Ethereum funktioniert

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die Rolle von Gas als Einheit für Rechenarbeit auf der EVM präzise erklären
- Die drei zentralen Gas-Größen unterscheiden: Gas Limit, Gas Used, Gas Price
- Typische Gas-Verbräuche für DeFi-Operationen einordnen und Gas-Kosten selbst berechnen
- Die Kostenformel `Kosten = Gas Used × Gas Price × 10⁻⁹` auf reale Transaktionen anwenden
- Häufige Ursachen gescheiterter Transaktionen (Slippage, fehlende Approval, Out-of-Gas) diagnostizieren und Gegenmaßnahmen ableiten
- Gas-Tools (etherscan.io/gastracker, blocknative, Wallet-Integration) praktisch einsetzen, um Transaktions-Zeitpunkte zu optimieren

### Erklärung

Jede Transaktion auf Ethereum kostet Gas. Gas ist kein Token — es ist eine Maßeinheit für Rechenarbeit. Jede Operation auf der Ethereum Virtual Machine (EVM) hat einen festen Gas-Preis in Rechen-Einheiten. Eine einfache Addition kostet 3 Gas, eine Speicherung in den permanenten State kostet 20.000 Gas. Eine Transaktion ist die Summe aller Gas-Kosten der beteiligten Operationen.

**Warum Gas existiert**

Ohne Gas-Kosten könnte jeder beliebig viel Rechenarbeit fordern und das Netzwerk zum Stillstand bringen. Gas dient zwei Zwecken:

1. **Spam-Prävention:** Jede Transaktion kostet Geld — sinnlose Transaktionen werden teuer.
2. **Validator-Kompensation:** Validatoren, die Blöcke produzieren, werden für die Rechenarbeit entlohnt.

**Gas vs. ETH**

Gas wird in Gas-Einheiten gezählt, aber bezahlt wird in ETH. Der Umrechnungsfaktor ist der **Gas Price**, gemessen in **Gwei** (1 Gwei = 10⁻⁹ ETH = 0,000000001 ETH).

Die Formel für Transaktionskosten:
```
Kosten (in ETH) = Gas Used × Gas Price (in Gwei) × 10⁻⁹
```

Beispiel: Eine ETH-Überweisung braucht 21.000 Gas. Bei einem Gas Price von 30 Gwei:
```
21.000 × 30 Gwei × 10⁻⁹ = 0,00063 ETH
```
Bei einem ETH-Preis von 3.000 USD entspricht das etwa 1,89 USD.

**Die drei zentralen Gas-Größen**

**1. Gas Limit**
Das maximale Gas, das du bereit bist zu verbrauchen. Wird das Limit überschritten, scheitert die Transaktion — aber das verbrauchte Gas bis zu diesem Punkt wird trotzdem berechnet. Wallets setzen das Limit typischerweise automatisch mit einem Sicherheitspuffer.

**2. Gas Used**
Das tatsächlich verbrauchte Gas. Ist immer kleiner oder gleich dem Gas Limit. Nicht verbrauchtes Gas (Limit minus Used) wird zurückerstattet.

**3. Gas Price**
Der Preis pro Gas-Einheit in Gwei. Seit EIP-1559 unterteilt in Base Fee (algorithmisch bestimmt, wird verbrannt) und Priority Fee (Tip an Validator).

**Typische Gas-Verbräuche**

| Operation | Gas Used (typisch) |
|---|---|
| ETH-Transfer | 21.000 |
| ERC-20-Transfer | 45.000 – 65.000 |
| ERC-20-Approval | 45.000 – 55.000 |
| Uniswap V3 Swap | 120.000 – 180.000 |
| Aave Supply | 200.000 – 300.000 |
| Aave Borrow | 300.000 – 400.000 |
| Uniswap V3 LP-Position öffnen | 350.000 – 500.000 |
| Safe-Multisig-Transaktion | 80.000 – 200.000 (je nach Inner-Tx) |

Diese Werte sind Orientierung — die tatsächlichen Werte variieren je nach Pool-Zustand und Parameter.

**Gas-Kosten-Volatilität**

Gas Prices schwanken stark mit der Nachfrage. Ein Uniswap-Swap kann an einem ruhigen Sonntagmorgen 3 USD kosten, bei einem gehypten NFT-Launch oder Memecoin-Run 80 USD oder mehr. Die Wahl des Transaktions-Zeitpunkts ist bei kleineren Beträgen oft wichtiger als die Wahl der Strategie selbst.

**Failed Transactions**

Eine gescheiterte Transaktion kostet trotzdem Gas. Häufige Gründe:
- Slippage zu niedrig gesetzt (Preis bewegt sich während der Ausführung)
- Insufficient approval (Token nicht approved)
- Liquidation nicht mehr möglich (andere Liquidatoren waren schneller)
- Out-of-Gas (Limit zu niedrig für die tatsächliche Rechenarbeit)

Bei Failed Transactions kannst du das verlorene Gas als Lernkosten verbuchen. Besonders bei Zeiten hoher Gebühren lohnt sich ein Sicherheitspuffer.

**Tools zur Gas-Einschätzung**

- **etherscan.io/gastracker** — aktueller und historischer Gas Price
- **Wallet-Integration** — MetaMask und Rabby zeigen aktuelle Gas-Preise direkt im Bestätigungsfenster
- **blocknative.com/gas-estimator** — detaillierte Prognose mit Wahrscheinlichkeiten
- **ultrasound.money** — ETH-Burn-Statistiken (mehr dazu in Lektion 3.2)

**Layer-2-Gas ist anders**

Auf Layer-2-Netzwerken wie Arbitrum, Optimism und Base ist Gas drastisch günstiger (oft 1/10 bis 1/100 der Ethereum-Mainnet-Kosten). Die Mechanik ist ähnlich, aber die Kostenstruktur anders. Wir behandeln das detailliert in Lektion 3.3.

### Folien-Zusammenfassung

**[Slide 1] — Titel:** Wie Gas auf Ethereum funktioniert

**[Slide 2] — Was ist Gas?** Einheit für EVM-Rechenarbeit. Kein Token. Jede Operation hat fixen Gas-Preis in Einheiten.

**[Slide 3] — Warum Gas existiert:** Spam-Prävention + Validator-Kompensation.

**[Slide 4] — Gas vs. ETH:** Gas in Einheiten gezählt, bezahlt in ETH. Umrechnung via Gas Price (Gwei).

**[Slide 5] — Die Formel:** Kosten = Gas Used × Gas Price × 10⁻⁹. Beispiel: 21.000 × 30 Gwei = 0,00063 ETH.

**[Slide 6] — Drei Gas-Größen:** Gas Limit (max), Gas Used (tatsächlich), Gas Price (Preis/Einheit).

**[Slide 7] — Typische Gas-Verbräuche:** Tabelle mit ETH-Transfer bis Aave-Borrow.

**[Slide 8] — Failed Transactions:** Kosten trotzdem Gas. Häufige Gründe.

**[Slide 9] — Tools:** etherscan.io/gastracker, Wallet-Integration, blocknative.

### Sprechertext

**[Slide 1]** Willkommen zu Modul 3. Wir öffnen die Motorhaube. Erste Lektion: Gas. Ohne ein klares Gas-Verständnis bist du in DeFi blind für einen wesentlichen Kostenfaktor.

**[Slide 2]** Gas ist eine Einheit für Rechenarbeit auf der Ethereum Virtual Machine. Kein Token — eine Maßeinheit. Jede Operation kostet einen festen Betrag Gas. Eine Addition: 3 Gas. Ein Speicher-Schreibvorgang: 20.000 Gas. Eine Transaktion ist die Summe aller Gas-Kosten der beteiligten Operationen.

**[Slide 3]** Warum existiert Gas? Zwei Gründe. Erstens: Spam-Prävention. Ohne Gas-Kosten könnte jeder beliebig viel Rechenarbeit anfordern und das Netzwerk lahmlegen. Zweitens: Validator-Kompensation. Wer Blöcke produziert, wird bezahlt.

**[Slide 4]** Gas wird in Einheiten gezählt, bezahlt in ETH. Der Umrechnungsfaktor ist der Gas Price, gemessen in Gwei. Ein Gwei ist ein Milliardstel ETH. Wenn der Gas Price 30 Gwei ist, kostet jede Gas-Einheit 30 Milliardstel ETH.

**[Slide 5]** Die Formel: Kosten in ETH gleich Gas Used mal Gas Price in Gwei mal 10 hoch minus 9. Ein Beispiel: eine einfache ETH-Überweisung verbraucht 21.000 Gas. Bei einem Gas Price von 30 Gwei kostet das 0,00063 ETH — bei einem ETH-Preis von 3.000 USD ungefähr 1,89 USD.

**[Slide 6]** Drei Größen musst du unterscheiden. Gas Limit: das maximale Gas, das du bereit bist zu verbrauchen. Wird es überschritten, scheitert die Transaktion, das verbrauchte Gas geht trotzdem verloren. Gas Used: das tatsächlich verbrauchte Gas. Nicht-verbrauchtes Gas wird zurückerstattet. Gas Price: der Preis pro Einheit.

**[Slide 7]** Typische Gas-Verbräuche. ETH-Transfer: 21.000. ERC-20-Transfer: 45.000 bis 65.000. ERC-20-Approval: ähnliche Größenordnung. Uniswap V3 Swap: 120.000 bis 180.000. Aave Supply: 200.000 bis 300.000. Aave Borrow: 300.000 bis 400.000. Uniswap V3 LP-Position: 350.000 bis 500.000. Diese Zahlen geben dir eine Orientierung — tatsächliche Werte variieren.

**[Slide 8]** Wichtig: Failed Transactions kosten trotzdem Gas. Häufige Ursachen: Slippage zu niedrig, fehlende Approval, Liquidation schon durch andere durchgeführt, oder Out-of-Gas wenn das Limit zu niedrig war. Gerade bei hohen Gas-Preisen lohnt sich ein Sicherheitspuffer.

**[Slide 9]** Drei Tools, die du kennen solltest: etherscan.io/gastracker zeigt aktuelle und historische Gas-Preise. Deine Wallet zeigt aktuelle Preise direkt im Bestätigungsfenster. Blocknative bietet detailliertere Prognosen mit Wahrscheinlichkeiten. Für größere Transaktionen lohnt sich der Blick vor dem Klick.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Vereinfachte EVM-Grafik: Operationen mit jeweiligem Gas-Preis als kleine Zellen.

**[Slide 3]** Zweispaltiges Layout: Spam-Prävention (links) mit blockiertem Angriffs-Icon, Validator-Kompensation (rechts) mit Belohnungs-Icon.

**[Slide 4]** Umrechnungsgrafik: Gas-Einheiten → Gwei → ETH → USD.

**[Slide 5]** Formel groß zentriert, darunter Beispielrechnung mit eingesetzten Zahlen.

**[Slide 6]** Drei nebeneinander dargestellte Balken: Gas Limit (maximal), Gas Used (tatsächlich, kleiner), Gas Price (separat).

**[Slide 7]** Tabelle mit Gas-Verbräuchen. **SCREENSHOT SUGGESTION:** Etherscan-Transaction-Detail-Seite einer realen Uniswap-Transaktion mit sichtbarem "Gas Used by Transaction"-Feld.

**[Slide 8]** Beispiel einer Failed Transaction. **SCREENSHOT SUGGESTION:** Etherscan-Seite mit rotem "Fail"-Status und trotzdem abgerechnetem Gas.

**[Slide 9]** **SCREENSHOT SUGGESTION:** etherscan.io/gastracker mit aktuellem Gas Price und 24h-Verlaufs-Chart.

### Übung

**Aufgabe: Gas-Forensik einer realen Transaktion**

1. Gehe auf etherscan.io.
2. Suche die aktuellste Transaktion auf deiner eigenen Wallet-Adresse (oder falls noch keine, die einer bekannten Adresse wie `vitalik.eth`).
3. Identifiziere auf der Transaction-Detail-Seite:
 - Gas Limit
 - Gas Used by Transaction (und in Prozent vom Limit)
 - Gas Price (in Gwei)
 - Base Fee Per Gas
 - Max Priority Fee Per Gas (wenn EIP-1559)
 - Transaction Fee (in ETH und USD)
4. Berechne die Transaction Fee manuell aus Gas Used × Gas Price und vergleiche mit der angezeigten Summe.

**Deliverable:** Tabelle mit den sechs Werten plus deiner manuellen Berechnung.

### Quiz

**Frage 1:** Warum kostet eine gescheiterte Transaktion trotzdem Gas?

<details>
<summary>Antwort anzeigen</summary>

Weil die Validatoren die Rechenarbeit bis zum Scheitern tatsächlich ausgeführt haben. Das Netzwerk hat echte Ressourcen verbraucht, um die Transaktion zu prüfen, den State-Übergang zu berechnen und das Scheitern zu erkennen. Diese Arbeit muss entlohnt werden — sonst wären Angreifer motiviert, absichtlich scheiternde Transaktionen zu senden, um das Netzwerk kostenfrei zu blockieren. Das verbrauchte Gas bis zum Fehlerpunkt wird berechnet; nur der Rest bis zum Limit wird nicht erhoben.
</details>

**Frage 2:** Du willst 500 USD in USDC von Ethereum Mainnet zu einer anderen Wallet senden. Bei einem aktuellen Gas Price von 50 Gwei und einem ETH-Preis von 3.000 USD — was kostet diese Transaktion ungefähr in USD?

<details>
<summary>Antwort anzeigen</summary>

Eine ERC-20-Transfer-Transaktion verbraucht etwa 55.000 Gas. Berechnung: 55.000 × 50 × 10⁻⁹ = 0,00275 ETH. Bei 3.000 USD pro ETH sind das 8,25 USD. Die Gas-Kosten betragen also etwa 1,65% des Transferbetrags. Bei kleineren Beträgen wird dieses Verhältnis schnell unrentabel — das ist ein Grund, warum für kleinere Transaktionen Layer-2-Netzwerke oder alternative Chains oft sinnvoller sind.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 9 Slides: Titel → Was ist Gas → Warum Gas → Gas vs. ETH → Formel → 3 Gas-Größen → Typische Verbräuche → Failed Transactions → Tools
- `voice_script.txt` — *Voice Narration Script* (120–140 WPM, Zielvideo 9–11 Min.)
- `visual_plan.json` — EVM-Operationen-Grafik, Spam-/Validator-Icons, Gas→Gwei→ETH→USD Umrechnung, Formel-Grafik, 3 Gas-Balken, Etherscan-Screenshots (Tx-Detail, Failed-Tx), gastracker-Chart

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 3.2 — EIP-1559 und der Burn-Mechanismus

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die Struktur des Gas-Marktes vor und nach EIP-1559 vergleichen
- Base Fee und Priority Fee technisch unterscheiden und ihre jeweilige Funktion erklären
- Verstehen, warum der Burn-Mechanismus Auswirkungen auf die ETH-Tokenomics hat
- Die Rolle von Validatoren im Block-Production-Flow (Proposer/Attester) und die Validator-Kompensation (Priority Fee + MEV) einordnen
- MEV (Maximal Extractable Value) als Grundkonzept benennen und die Verbindung zur Fee-Dynamik verstehen (vertieft in Modul 11)
- ETH-Supply-Effekte (deflationär / inflationär) anhand der Base-Fee-Burn- und Issuance-Dynamik quantitativ nachvollziehen

### Erklärung

EIP-1559 ist einer der wichtigsten Upgrades in Ethereums Geschichte. Aktiviert im August 2021 mit dem London-Hardfork, hat es den Gas-Markt grundlegend verändert. Für DeFi-Nutzer ist das relevant, weil sich Transaktions-Preise und ETH-Tokenomics seither anders verhalten.

**Der Gas-Markt vor EIP-1559**

Vor EIP-1559 funktionierte Ethereum als reine First-Price-Auction: Nutzer boten einen Gas-Preis, Validatoren wählten die höchsten Gebote. Probleme:

1. **Unvorhersagbarkeit:** Nutzer wussten nicht, was ein "angemessener" Preis war. Viele zahlten zu viel aus Vorsicht.
2. **Gebühren-Volatilität:** Kleine Nachfrage-Änderungen führten zu massiven Preissprüngen.
3. **Kein Feedback-Mechanismus:** Der Markt hatte keine eingebaute Dämpfung.

**EIP-1559: Die neue Struktur**

EIP-1559 teilt die Gas-Gebühr in zwei Komponenten:

**1. Base Fee**
- Wird algorithmisch pro Block angepasst (±12,5% pro Block maximal)
- Steigt, wenn der vorherige Block mehr als 50% voll war
- Fällt, wenn der vorherige Block weniger als 50% voll war
- Wird **verbrannt** — die ETH verschwinden aus dem Umlauf

**2. Priority Fee (Tip)**
- Optional, vom Nutzer gewählt
- Geht als Tip an den Validator
- Bei niedriger Netzwerk-Auslastung reicht ein kleiner Tip (1–2 Gwei)
- Bei hoher Auslastung steigt der Wettbewerb um die ersten Plätze im Block

**Max Fee**
- Zusätzliche Nutzer-Einstellung
- Obergrenze für Base Fee + Priority Fee
- Schützt vor extremen Preisspitzen während der Transaktion wartet

**Die Wallet-Felder**

Beim Senden einer Transaktion zeigen moderne Wallets drei Felder:

- **Max Base Fee:** Maximale Base Fee, die du akzeptierst
- **Max Priority Fee:** Dein Tip-Beitrag
- **Max Fee:** Gesamtes maximales Pro-Gas-Budget

**Der Burn-Mechanismus und ETH-Tokenomics**

Die Verbrennung der Base Fee ist eine fundamentale Änderung der ETH-Tokenomics. Vor EIP-1559 gingen alle Gebühren an Validatoren (damals: Miner). Seit EIP-1559 gehen nur die Tips an Validatoren — die Base Fee wird vernichtet.

**Auswirkungen:**

1. **Deflationärer Druck:** Wenn die Base-Fee-Verbrennung pro Tag größer ist als die neue ETH-Emission durch Staking-Rewards, schrumpft das ETH-Umlauf-Angebot. Bei hohem Netzwerk-Volumen ist das der Fall.

2. **"Ultra Sound Money":** In DeFi-Kreisen wurde dieser Zustand als Vergleich zu Bitcoins "Sound Money" (fixes Angebot) bezeichnet. Seit dem Merge (September 2022) ist ETH periodisch deflationär, periodisch leicht inflationär — je nach Netzwerk-Aktivität.

3. **Relevanz für DeFi:** Die ETH-Burn-Rate beeinflusst langfristig den ETH-Preis (zumindest theoretisch). Das macht ETH als Collateral und als Basis-Asset struktureller wertvoll.

**Tracking des Burns**

**ultrasound.money** ist das Standard-Tool zur Verfolgung des ETH-Burns. Es zeigt:
- Aktuelle Burn-Rate (ETH pro Sekunde)
- Kumulative Burns seit EIP-1559
- Vergleich Burn vs. Issuance (ist ETH gerade deflationär?)
- Burn-Aufschlüsselung nach Protokollen

**Praktische Konsequenzen für DeFi-Nutzer**

1. **Gas-Timing:** Die Base Fee kann innerhalb von Minuten um 50% fallen (nach einem einzigen unterausgelasteten Block nur um 12,5%, aber kumulativ schnell). Für nicht-dringende Transaktionen lohnt sich das Warten auf ruhige Zeiten (typisch: früher Morgen UTC, Wochenenden).

2. **Priority-Fee-Optimierung:** Die meisten Transaktionen brauchen keinen hohen Tip. 1–2 Gwei reichen in ruhigen Zeiten. Bei Zeit-kritischen Operationen (Liquidation vermeiden, Arbitrage) lohnt sich höherer Tip.

3. **Failed Transactions und EIP-1559:** Wenn die Base Fee während der Transaktions-Wartezeit über deine Max Fee steigt, bleibt die Transaktion hängen. Wallets zeigen das und bieten "Speed up" oder "Cancel" — beides kostet zusätzliches Gas.

### Folien-Zusammenfassung

**[Slide 1] — Titel:** EIP-1559 und der Burn-Mechanismus

**[Slide 2] — Vor EIP-1559:** Reine First-Price-Auction. Unvorhersagbar, volatil, kein Feedback.

**[Slide 3] — EIP-1559: Zwei Komponenten:** Base Fee (algorithmisch, wird verbrannt) + Priority Fee (Tip an Validator).

**[Slide 4] — Base-Fee-Dynamik:** ±12,5% pro Block. Block >50% voll → steigt. Block <50% voll → fällt.

**[Slide 5] — Wallet-Felder:** Max Base Fee, Max Priority Fee, Max Fee. Drei Hebel zur Kontrolle.

**[Slide 6] — Der Burn-Mechanismus:** Base Fee wird vernichtet. Seit London-Hardfork 2021.

**[Slide 7] — ETH-Tokenomics:** Burn > Issuance → ETH schrumpft. "Ultra Sound Money" bei hoher Netzwerk-Aktivität.

**[Slide 8] — Tracking:** ultrasound.money zeigt Burns in Echtzeit.

**[Slide 9] — Praktische Optimierung:** Gas-Timing nutzen. Priority Fee je nach Dringlichkeit. Stuck-Transaktionen handhaben.

### Sprechertext

**[Slide 1]** Lektion 3.2: EIP-1559. Dieses Upgrade vom August 2021 hat den Gas-Markt und die ETH-Tokenomics fundamental verändert. Für DeFi-Nutzer ist das doppelt relevant — für Gas-Optimierung und für die Bewertung von ETH als Asset.

**[Slide 2]** Vor EIP-1559 funktionierte Ethereum als First-Price-Auction. Nutzer boten einen Gas-Preis, Validatoren wählten die höchsten Gebote. Drei Probleme: Unvorhersagbarkeit — niemand wusste, was "angemessen" war, viele zahlten zu viel. Gebühren-Volatilität — kleine Nachfrage-Änderungen führten zu massiven Preissprüngen. Kein Feedback-Mechanismus — der Markt hatte keine eingebaute Dämpfung.

**[Slide 3]** EIP-1559 teilt die Gas-Gebühr in zwei Komponenten. Base Fee: algorithmisch pro Block angepasst. Priority Fee: optional, als Tip an den Validator. Diese Trennung löst die Hauptprobleme der First-Price-Auction.

**[Slide 4]** Die Base-Fee-Dynamik ist einfach. Maximal 12,5% Änderung pro Block. War der vorherige Block zu mehr als 50% voll — also mehr als 15 Millionen Gas von 30 Millionen — steigt die Base Fee. War er weniger als 50% voll, fällt sie. Dieser Algorithmus zielt auf eine mittlere Block-Auslastung von 50%.

**[Slide 5]** Deine Wallet zeigt drei Felder. Max Base Fee: die maximale Base Fee, die du akzeptierst. Max Priority Fee: dein Tip-Beitrag. Max Fee: das Gesamt-Maximum pro Gas. Das Max-Fee schützt dich vor extremen Preis-Spitzen, während die Transaktion wartet.

**[Slide 6]** Der wichtige Punkt: die Base Fee wird verbrannt. Sie geht nicht an Validatoren. Die ETH verschwinden aus dem Umlauf. Das ist eine fundamentale Änderung der ETH-Tokenomics. Vor EIP-1559 gingen alle Gebühren an Miner. Seit EIP-1559 gehen nur die Tips an Validatoren.

**[Slide 7]** Auswirkung auf ETH: wenn die Base-Fee-Verbrennung pro Tag größer ist als die neue ETH-Emission durch Staking-Rewards, schrumpft das ETH-Umlauf-Angebot. Bei hohem Netzwerk-Volumen ist das der Fall. In DeFi-Kreisen wird das "Ultra Sound Money" genannt — als Vergleich zu Bitcoins fixem Angebot. Seit dem Merge 2022 ist ETH periodisch deflationär, periodisch leicht inflationär.

**[Slide 8]** Tracking-Tool: ultrasound.money. Es zeigt die Burn-Rate in Echtzeit, kumulative Burns seit EIP-1559 und vergleicht Burn mit Issuance. Ein Blick dort zeigt dir, ob ETH gerade deflationär ist oder nicht.

**[Slide 9]** Praktische Optimierung. Erstens: Gas-Timing nutzen. Die Base Fee kann schnell fallen, wenn die Netzwerk-Auslastung sinkt. Für nicht-dringende Transaktionen lohnt sich das Warten auf ruhige Zeiten. Zweitens: Priority Fee je nach Dringlichkeit. 1–2 Gwei reichen meist. Bei kritischen Transaktionen wie Liquidations-Vermeidung lohnt sich höherer Tip. Drittens: stuck Transactions. Wenn die Base Fee deine Max Fee überschreitet, bleibt die Transaktion hängen. Wallets bieten "Speed up" oder "Cancel" — beides kostet.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Grafik der Pre-EIP-1559-Auction: Kurve mit wilden Preis-Spitzen über die Zeit.

**[Slide 3]** Zwei-Komponenten-Visualisierung: Base Fee (mit Flammen-Icon) + Priority Fee (mit Tip-Hand-Icon) = Total Fee.

**[Slide 4]** Treppendiagramm: Block mit 60% Auslastung → Base Fee steigt um X%. Block mit 40% → Base Fee fällt.

**[Slide 5]** **SCREENSHOT SUGGESTION:** Rabby oder MetaMask Transaction-Confirmation-Screen mit den drei sichtbaren Feldern: Max Base Fee, Max Priority Fee, Max Fee.

**[Slide 6]** Animation: Base Fee wird im Block verbrannt (Flammen-Animation).

**[Slide 7]** Chart: ETH Burn vs. Issuance über Zeit. Perioden von Netto-Deflation markiert.

**[Slide 8]** **SCREENSHOT SUGGESTION:** ultrasound.money-Homepage mit aktuellem Burn, kumulativem Total, und Issuance-Vergleich.

**[Slide 9]** Drei Optimierungs-Karten mit konkreten Zahlen und Zeitfenstern.

### Übung

**Aufgabe: Gas-Markt in Echtzeit beobachten**

1. Öffne etherscan.io/gastracker und ultrasound.money.
2. Beobachte für 30 Minuten (z.B. während anderer Arbeit):
 - Wie stark schwankt die Base Fee?
 - Wie unterscheidet sich die Priority Fee bei "Low", "Average", "High"-Empfehlungen?
 - Was ist die aktuelle ETH-Burn-Rate in ETH pro Minute?
3. Notiere die tatsächliche ETH-Burn-Rate und rechne sie in ETH pro Jahr hoch.
4. Vergleiche mit der aktuellen Staking-Issuance (ebenfalls auf ultrasound.money sichtbar) und beantworte: Ist ETH aktuell deflationär oder inflationär?

**Deliverable:** Kurzer Bericht (eine halbe Seite) mit deinen Beobachtungen.

### Quiz

**Frage 1:** Warum ist die Base Fee "inelastisch" im kurzfristigen Sinn, aber responsiv auf längere Sicht?

<details>
<summary>Antwort anzeigen</summary>

Die Base Fee kann pro Block maximal um 12,5% steigen oder fallen. Das ist kurzfristig inelastisch — ein plötzlicher Nachfrage-Anstieg führt nicht zu einer sofortigen Preis-Verzehnfachung, sondern zu einer graduellen Steigerung über mehrere Blöcke. Langfristig ist die Base Fee aber sehr responsiv: nach 10–20 Blöcken (etwa 2–4 Minuten) kann sich die Base Fee verdoppeln oder halbieren. Dieser Mechanismus dämpft kurzfristige Spikes, ohne mittelfristiges Markt-Feedback zu verhindern. Er ist fundamentales Designziel von EIP-1559.
</details>

**Frage 2:** Wie beeinflusst der Burn-Mechanismus theoretisch die Attraktivität von ETH als langfristiges Collateral in DeFi?

<details>
<summary>Antwort anzeigen</summary>

Der Burn-Mechanismus reduziert das ETH-Umlauf-Angebot, wenn die Netzwerk-Aktivität hoch ist. Theoretisch bedeutet ein schrumpfendes Angebot (bei konstanter oder steigender Nachfrage) höheren Preis. Als Collateral in Lending-Protokollen oder als Basis-Asset für LP-Positionen ist ETH damit struktureller attraktiv — es gibt einen eingebauten deflationären Druck, der nicht von einzelnen Protokollen oder Token-Emissionen abhängt. Wichtig zu verstehen: das ist eine langfristige, strukturelle Eigenschaft — kurzfristig wird der ETH-Preis hauptsächlich von Makro-Faktoren und Markt-Sentiment getrieben. Als Begründung, ETH langfristig zu halten, ist der Burn relevant; als Timing-Signal für kurzfristige Trades taugt er wenig.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Slides: Titel → Pre/Post EIP-1559 Gas-Markt → Base Fee Mechanik → Priority Fee & Validator → Burn-Mechanismus → ETH-Supply-Dynamik → Tokenomics-Effekte
- `voice_script.txt` — *Voice Narration Script* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — Gas-Auktion vs. EIP-1559-Vergleich, Base-Fee-Adjustment-Kurve, Validator-Proposer-Diagramm (Bridge zu MEV), ultrasound.money-ETH-Burn-Chart, Supply-Historie-Chart

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 3.3 — EIP-4844-Blobs und die Layer-2-Gebühren-Revolution

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Den Unterschied zwischen Ethereum Mainnet und Layer-2-Rollups erklären
- EIP-4844 und die Rolle von Blobs für L2-Skalierung verstehen
- Optimistic- und ZK-Rollups unterscheiden und ihre Trade-offs einordnen
- Die reale Kostenstruktur auf Arbitrum, Optimism, Base und zkSync nach dem Dencun-Upgrade (März 2024) einordnen
- Fraud Proofs (Optimistic) vs. Validity Proofs (ZK) als zwei unterschiedliche Sicherheitsmodelle erklären
- Eine begründete Chain-Wahl für eine konkrete DeFi-Aktivität (nach TVL, Liquidität, Bridge-Sicherheit) treffen

### Erklärung

Bis März 2024 waren Layer-2-Netzwerke schon günstiger als Ethereum Mainnet, aber nicht drastisch. Ein Swap auf Arbitrum kostete typischerweise 0,30–1,00 USD. Seit der Dencun-Upgrade im März 2024 — die EIP-4844 einführte — liegen die Kosten oft unter 3 Cent. Diese Zehntel- bis Hundertel-Reduktion hat das L2-Ökosystem fundamental verändert.

**Was sind Layer-2-Rollups?**

Rollups sind Blockchains, die Transaktionen off-chain ausführen und die Ergebnisse komprimiert zurück zu Ethereum Mainnet posten. Ethereum Mainnet dient als **Data-Availability-Layer** und **Settlement-Layer**. Die L2 hat dadurch:

- Eigene Block-Produktion (schneller, höherer Durchsatz)
- Eigene Gas-Ökonomie (viel billiger pro Transaktion)
- Sicherheits-Anbindung an Ethereum (kann nicht einfach Geld stehlen)

**Vor EIP-4844: Das Calldata-Problem**

Rollups mussten ihre Transaktionsdaten als normale **Calldata** an Ethereum posten. Calldata ist teuer — sie wird permanent im Ethereum-State gespeichert. Die Calldata-Kosten machten 80–95% der L2-Transaktionskosten aus. Die L2 selbst war billig, aber die Mainnet-Settlement-Kosten wurden an die Nutzer weitergegeben.

**EIP-4844: Die Einführung von Blobs**

EIP-4844 (auch "Proto-Danksharding" genannt) führt einen neuen Datentyp ein: **Blobs**. Drei Eigenschaften:

1. **Separates Gas-Pricing:** Blobs haben einen eigenen Gas-Markt, entkoppelt von normalem Calldata.
2. **Temporäre Speicherung:** Blobs werden nur für etwa 18 Tage gespeichert, dann gelöscht. Das reicht, damit L2-Validatoren und Prover die Daten nutzen können — aber die Daten belasten den Ethereum-State nicht dauerhaft.
3. **KZG-Commitments:** Die Daten sind über kryptographische Commitments verfügbar, aber nicht direkt von EVM-Smart-Contracts lesbar. Das zwingt zu einer strikten Trennung zwischen L1-Execution und L2-Data.

**Quantitative Auswirkung**

| Operation auf Arbitrum | Kosten vor EIP-4844 | Kosten nach EIP-4844 |
|---|---|---|
| Einfacher Swap | 0,30 – 1,00 USD | 0,02 – 0,08 USD |
| Lending-Deposit | 0,50 – 1,50 USD | 0,05 – 0,15 USD |
| LP-Position öffnen | 1,00 – 3,00 USD | 0,10 – 0,30 USD |

Das ermöglicht praktisch neue Nutzungsmuster: häufiges Rebalancing, kleine Trades, Micro-Payments.

**Optimistic Rollups vs. ZK-Rollups**

Zwei grundsätzlich unterschiedliche Rollup-Architekturen:

**Optimistic Rollups** (Arbitrum, Optimism, Base)
- Gehen davon aus, dass posted Daten korrekt sind ("optimistisch")
- Fraud-Proofs erlauben Challenge während eines 7-Tage-Fensters
- Withdrawals zurück zu Mainnet dauern 7 Tage
- Technisch einfacher, daher früh produktiv
- Hohe EVM-Kompatibilität

**ZK-Rollups** (zkSync, Starknet, Linea, Scroll, Polygon zkEVM)
- Jede Batch wird mit einem Zero-Knowledge-Proof posted, der die Korrektheit kryptographisch beweist
- Withdrawals können sofort abgeschlossen werden (nach Proof-Verifikation, Minuten statt Tage)
- Technisch komplex, daher später produktiv
- EVM-Kompatibilität variiert (manche sind vollständig EVM-equivalent, andere brauchen Spezial-Compiler)

**Welche L2 wählen?**

Für Standard-DeFi ist die Wahl vom Protokoll abhängig:
- **Arbitrum:** Größtes L2-Ökosystem, meiste DeFi-TVL, viele Protokolle
- **Base:** Coinbase-Unterstützung, schnell wachsend, konservativ ausgelegt
- **Optimism:** Etabliert, Superchain-Vision
- **zkSync Era, Linea, Scroll:** ZK-Vorteile, wachsende Ökosysteme

In der Praxis entscheidet oft einfach: Wo ist das gewünschte Protokoll verfügbar, wo ist die Liquidität ausreichend? DeFiLlama zeigt pro Chain die TVL und pro Protokoll die verfügbaren Chains.

**Bridge-Risiko**

Jeder Asset-Transfer zwischen L1 und L2 (oder zwischen L2s) geht über eine Bridge. Bridges sind historisch ein massives Angriffsziel — einige der größten Hacks überhaupt (Ronin 625M, Wormhole 326M, Nomad 190M) waren Bridge-Hacks. Bei der Wahl einer Bridge:

- **Native Rollup-Bridges** (z.B. Arbitrum-Bridge, Optimism-Bridge) sind am sichersten, weil sie auf der Rollup-Architektur basieren.
- **Third-Party-Bridges** (Across, Stargate, Synapse) sind oft schneller (minutenbasiert statt 7-Tage-Exit bei Optimistic-Rollups), aber haben eigenes Smart-Contract-Risiko.
- **CEX als Bridge** ist möglich: Geld zur CEX auf L1, Withdrawal zur Wallet auf L2. Meist günstig, aber erfordert KYC und CEX-Vertrauen.

**Tracking-Tools**

- **l2beat.com** — offizielle L2-Übersicht mit TVL, Activity, Risk-Framework
- **growthepie.xyz** — Metriken-Dashboard für L2-Aktivität
- **DeFiLlama Chain-Pages** — pro L2 die TVL-Historie und Top-Protokolle

### Folien-Zusammenfassung

**[Slide 1] — Titel:** EIP-4844-Blobs und die L2-Revolution

**[Slide 2] — Was sind L2-Rollups?** Blockchains, die off-chain ausführen und komprimiert auf Ethereum posten. Ethereum = Settlement-Layer.

**[Slide 3] — Das Calldata-Problem:** Vor EIP-4844 machten Calldata-Kosten 80-95% der L2-Gebühren aus.

**[Slide 4] — EIP-4844 Blobs:** Separates Gas-Pricing, temporäre 18-Tage-Speicherung, KZG-Commitments.

**[Slide 5] — Auswirkung:** L2-Kosten oft um Faktor 10 gefallen. Arbitrum-Swap: 0,30 USD → 0,03 USD.

**[Slide 6] — Optimistic vs. ZK:** Zwei Architekturen. Optimistic = 7-Tage-Exit. ZK = sofortige Verifikation.

**[Slide 7] — Populäre L2s:** Arbitrum, Base, Optimism (Optimistic). zkSync, Starknet, Linea (ZK).

**[Slide 8] — Bridge-Risiko:** Historisch größter Angriffsvektor. Native Bridges, Third-Party, CEX als Optionen.

**[Slide 9] — Tools:** l2beat.com, growthepie.xyz, DeFiLlama.

### Sprechertext

**[Slide 1]** Lektion 3.3: EIP-4844 und die L2-Revolution. Wenn du nur einen Upgrade aus Ethereums Geschichte verstehen willst, dann diesen. Die Dencun-Upgrade vom März 2024 hat die L2-Kosten um einen Faktor 10 reduziert.

**[Slide 2]** Was sind Layer-2-Rollups? Eigene Blockchains, die Transaktionen ausführen und die komprimierten Ergebnisse an Ethereum Mainnet posten. Ethereum dient als Settlement- und Data-Availability-Layer. Die L2 hat eigene Block-Produktion, eigene Gas-Ökonomie und Sicherheits-Anbindung an Ethereum.

**[Slide 3]** Vor EIP-4844 mussten Rollups ihre Daten als normale Calldata an Ethereum posten. Calldata ist teuer, weil sie permanent im Ethereum-State gespeichert wird. Die Calldata-Kosten machten 80 bis 95% der L2-Transaktionskosten aus. Die L2 selbst war billig, aber die Mainnet-Settlement-Kosten wurden an die Nutzer weitergegeben.

**[Slide 4]** EIP-4844 — auch Proto-Danksharding genannt — führt Blobs ein. Drei Eigenschaften. Erstens: separates Gas-Pricing, entkoppelt vom normalen Calldata-Markt. Zweitens: temporäre Speicherung, etwa 18 Tage, dann gelöscht. Das reicht für L2-Validatoren und Prover, belastet den Ethereum-State aber nicht dauerhaft. Drittens: KZG-Commitments — Daten sind kryptographisch verfügbar, aber nicht direkt von EVM-Smart-Contracts lesbar.

**[Slide 5]** Die Auswirkung war sofort spürbar. Ein Arbitrum-Swap kostete vor der Upgrade 0,30 bis 1 USD. Nach der Upgrade: 0,02 bis 0,08 USD. Ein Lending-Deposit: 0,50 bis 1,50 USD davor, 0,05 bis 0,15 USD danach. Das ermöglicht neue Nutzungsmuster — häufiges Rebalancing, kleine Trades, Micro-Payments.

**[Slide 6]** Zwei Rollup-Architekturen. Optimistic Rollups — Arbitrum, Optimism, Base — gehen davon aus, dass die posted Daten korrekt sind. Fraud-Proofs erlauben Challenge während eines 7-Tage-Fensters. Withdrawals dauern entsprechend 7 Tage. Technisch einfacher, daher früh produktiv. ZK-Rollups — zkSync, Starknet, Linea — posten mit jedem Batch einen Zero-Knowledge-Proof, der die Korrektheit kryptographisch beweist. Withdrawals sind sofort möglich. Technisch komplex, daher später produktiv.

**[Slide 7]** Die populärsten L2s heute: Arbitrum mit dem größten DeFi-Ökosystem und meiste TVL. Base, von Coinbase unterstützt, schnell wachsend. Optimism, etabliert, mit Superchain-Vision. Auf ZK-Seite zkSync Era, Starknet, Linea, Scroll. Die Wahl hängt davon ab, wo das gewünschte Protokoll verfügbar und die Liquidität ausreichend ist.

**[Slide 8]** Bridge-Risiko. Jeder Asset-Transfer zwischen L1 und L2 geht über eine Bridge. Bridges sind historisch ein massives Angriffsziel. Ronin: 625 Millionen Dollar. Wormhole: 326 Millionen. Nomad: 190 Millionen. Drei Optionen. Native Rollup-Bridges sind am sichersten. Third-Party-Bridges wie Across oder Stargate sind schneller, haben aber eigenes Smart-Contract-Risiko. CEX-Withdrawal ist günstig, erfordert KYC und CEX-Vertrauen.

**[Slide 9]** Tools. L2Beat ist die offizielle L2-Übersicht mit TVL, Activity und Risk-Framework. Growthepie für detailliertere Aktivitäts-Metriken. DeFiLlama Chain-Pages für pro-L2-TVL-Verläufe und Top-Protokolle. Vor jeder L2-Wahl lohnt sich der Blick.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Stack-Diagramm: L2 oben, führt Transaktionen aus. L1 unten, dient als Settlement. Pfeil nach unten für komprimierten Daten-Post.

**[Slide 3]** Kostendiagramm einer L2-Transaktion vor EIP-4844: großer Balken "Calldata-Kosten", kleiner Balken "L2-Execution".

**[Slide 4]** Technische Illustration der drei Blob-Eigenschaften mit Icons.

**[Slide 5]** Before/After-Vergleichstabelle mit echten Kosten. **SCREENSHOT SUGGESTION:** Arbitrum-Swap mit sichtbaren Gebühren auf app.arbitrum.foundation oder Etherscan für Arbitrum.

**[Slide 6]** Zwei-Spalten-Vergleich Optimistic (links) vs. ZK (rechts) mit den jeweiligen Eigenschaften.

**[Slide 7]** Logo-Galerie der populärsten L2s, aufgeteilt in Optimistic und ZK.

**[Slide 8]** Timeline der größten Bridge-Hacks mit Schadenshöhen.

**[Slide 9]** **SCREENSHOT SUGGESTION:** l2beat.com-Hauptseite mit L2-Ranking nach TVL.

### Übung

**Aufgabe: L2-Vergleich und Bridge-Planung**

1. Öffne l2beat.com und DeFiLlama/chains.
2. Wähle drei L2s (z.B. Arbitrum, Base, zkSync Era).
3. Erstelle eine Vergleichstabelle mit:
 - TVL
 - Anzahl aktiver DeFi-Protokolle
 - Bridge-Optionen zu/von Ethereum Mainnet
 - Native Token für Gas (oft ETH, manchmal anders)
 - Typische Gas-Kosten für Uniswap-Swap (auf Chain selbst prüfen)
4. Recherchiere für eine der drei L2s: Welche Bridge-Optionen existieren? Was sind die Trade-offs?

**Deliverable:** Vergleichstabelle + kurze Analyse (halbe Seite).

### Quiz

**Frage 1:** Warum können Smart Contracts auf Ethereum die Daten in Blobs nicht direkt lesen?

<details>
<summary>Antwort anzeigen</summary>

Das ist ein bewusstes Design-Feature von EIP-4844. Blobs sind über KZG-Commitments verfügbar, aber die tatsächlichen Daten sind nicht im regulären Ethereum-State gespeichert — sie werden separat gespeichert und nach etwa 18 Tagen gelöscht. Wenn Smart Contracts direkt auf Blob-Daten zugreifen könnten, müsste Ethereum sie dauerhaft speichern (sonst würden Smart-Contract-Aufrufe nach 18 Tagen scheitern). Diese Einschränkung erlaubt die temporäre Speicherung, die Blobs billig macht. Für L2-Rollups reicht es, dass die Daten kryptographisch verfügbar sind, während Verifikation und Fraud-Proofs stattfinden — sie brauchen keinen direkten EVM-Zugriff.
</details>

**Frage 2:** Ein Nutzer will 10.000 USDC von Ethereum Mainnet nach Arbitrum bridgen. Welche drei Faktoren sollte er abwägen?

<details>
<summary>Antwort anzeigen</summary>

1. **Geschwindigkeit:** Native Arbitrum-Bridge (L1→L2) dauert ca. 10–15 Minuten. Third-Party-Bridges wie Across oder Stargate sind meist schneller (1–5 Minuten). Der Rückweg (L2→L1) dauert bei Native-Bridge 7 Tage wegen des Optimistic-Fraud-Proof-Fensters; Third-Party-Bridges bieten sofortigen Rückweg gegen Gebühr. 2. **Kosten:** Native Bridge hat nur Gas-Kosten (Ethereum-Mainnet-Seite ist teuer). Third-Party-Bridges haben typischerweise 0,05–0,3% Gebühr, was bei 10k USDC 5–30 USD sind. 3. **Sicherheit:** Native Rollup-Bridges haben die niedrigste Angriffsfläche (direkt in Rollup-Architektur verankert). Third-Party-Bridges haben eigene Smart-Contract-Risiken und waren historisch häufige Hack-Ziele. Für 10k USDC ist Native Bridge oft die beste Balance; für Zeitkritikalität oder kleinere Beträge rechtfertigt sich eine Third-Party-Bridge.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 8 Slides: Titel → L1 vs. L2 → EIP-4844 Blobs → Dencun-Effekte → Optimistic Rollups → ZK Rollups → Bridge-Optionen → Chain-Wahl-Entscheidungsmatrix
- `voice_script.txt` — *Voice Narration Script* (120–140 WPM, Zielvideo 9–11 Min.)
- `visual_plan.json` — L1/L2-Architektur-Diagramm, Blob-Lifecycle (18 Tage), L2-Fee-Chart vor/nach Dencun, Fraud-vs-Validity-Proof-Vergleich, Bridge-Optionen-Tabelle (Native/Across/Stargate), L2Beat-TVL-Screenshot

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 3.4 — Der ERC-20-Token-Standard im Detail

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die Struktur eines ERC-20-Tokens und seine Standardfunktionen vollständig benennen
- Decimals, Mint/Burn-Mechanismen und die Rolle von totalSupply verstehen
- Problematische ERC-20-Varianten (Fee-on-Transfer, Rebase, Pause-fähig) erkennen
- Den `approve/transferFrom`-Mechanismus im Kontext von DeFi-Composability einordnen (Verbindung zu Modul 2)
- Einen Token-Contract auf Etherscan anhand der ABI und der verifizierten Source Code analysieren
- Governance- und Admin-Funktionen (Pause, Blacklist, Mint) als zentrale Smart-Contract-Risk- und Operator-Risk-Indikatoren identifizieren

### Erklärung

ERC-20 ist der wichtigste Smart-Contract-Standard in DeFi. USDC, USDT, DAI, AAVE, UNI, WETH, LINK — alle sind ERC-20-Tokens. Der Standard definiert eine minimale Schnittstelle, die jedes DeFi-Protokoll erwartet. Wer die ERC-20-Mechanik versteht, kann jeden Token-Contract einordnen.

**Was ist ein Token?**

Ein Token ist ein Smart Contract, der ein internes Ledger führt. Der Contract speichert eine Mapping-Struktur:
```
mapping(address => uint256) balances;
```

Das heißt: für jede Ethereum-Adresse speichert der Contract einen Balance-Wert. Wenn jemand "USDC in seiner Wallet hat", bedeutet das: der USDC-Smart-Contract (auf Adresse `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`) hat einen Eintrag, der der User-Adresse einen Balance-Wert zuordnet.

**Die Standard-Funktionen**

Der ERC-20-Standard definiert sechs Pflicht-Funktionen:

**1. `balanceOf(address)`**
Read-Funktion. Gibt den Token-Balance einer Adresse zurück.

**2. `transfer(to, amount)`**
Write-Funktion. Sender überträgt `amount` von eigener Adresse zu `to`. Nur der Besitzer kann das.

**3. `approve(spender, amount)`**
Write-Funktion. Besitzer erlaubt einer anderen Adresse (`spender`), bis zu `amount` seiner Tokens zu bewegen. Kernstück des DeFi-Ökosystems.

**4. `transferFrom(from, to, amount)`**
Write-Funktion. Der approved Spender bewegt `amount` vom Besitzer `from` zu `to`.

**5. `allowance(owner, spender)`**
Read-Funktion. Zeigt, wie viel `spender` vom `owner` bewegen darf.

**6. `totalSupply()`**
Read-Funktion. Gibt die gesamte Anzahl an existierenden Tokens zurück.

**Optional, aber fast universell:**
- `name()` — z.B. "USD Coin"
- `symbol()` — z.B. "USDC"
- `decimals()` — z.B. 6

**Events:**
- `Transfer(from, to, amount)` — bei jedem Transfer emittiert
- `Approval(owner, spender, amount)` — bei jeder Approval emittiert

Diese Events werden on-chain in Block-Logs geschrieben und sind der Grund, warum Etherscan die Token-Bewegungen pro Adresse anzeigen kann.

**Decimals: Der häufigste Verwechslungspunkt**

Smart Contracts rechnen mit Integer-Werten, nicht mit Dezimalzahlen. Wenn USDC eine Balance von "100 USDC" anzeigen soll, speichert der Contract tatsächlich den Wert `100 * 10^6 = 100000000` (weil USDC 6 Decimals hat).

**Typische Decimals:**

| Token | Decimals |
|---|---|
| ETH (native) | 18 |
| WETH | 18 |
| USDC | 6 |
| USDT | 6 |
| DAI | 18 |
| WBTC | 8 |

**Konsequenz:** Wenn du manuell eine Transfer-Funktion aufrufst, musst du den Betrag mit Decimals multiplizieren. Eine App zeigt "100 USDC", der Contract sieht 100000000. Das ist eine häufige Fehlerquelle bei direkter Contract-Interaktion.

**Mint und Burn**

Tokens können erschaffen (mint) und zerstört (burn) werden. Wer das darf, hängt vom Contract ab:

**Mint-Mechanismen:**
- **USDC, USDT:** Zentrale Emittenten (Circle, Tether) minten, wenn USD-Einzahlungen eingehen.
- **DAI:** Nutzer minten DAI, indem sie Sicherheiten (z.B. ETH) in einen MakerDAO-Vault sperren.
- **LP-Tokens:** Werden gemintet, wenn Nutzer Liquidität zu einem Pool hinzufügen, geburnt beim Rückzug.
- **Memecoins:** Oft fixed supply, gemintet beim Deployment, danach nicht mehr.

**Burn-Mechanismen:**
- **USDC, USDT:** Zentrale Emittenten burnen, wenn USD-Auszahlungen erfolgen.
- **DAI:** Wird geburnt, wenn Nutzer ihre Schulden zurückzahlen und Sicherheiten freigeben.
- **LP-Tokens:** Beim Rückzug der Liquidität geburnt.

**Die totalSupply() ändert sich** bei Mint und Burn. Ein steigender totalSupply bedeutet neue Tokens im Umlauf, ein fallender totalSupply bedeutet verbrannte Tokens.

**Problematische ERC-20-Varianten**

Nicht jeder ERC-20-Token verhält sich "standard-konform". Einige Varianten können DeFi-Interaktionen brechen oder Risiken einführen:

**1. Fee-on-Transfer**
Der Token belastet bei jedem Transfer eine Gebühr. Wenn du 100 Tokens sendest, kommen nur 98 an. Viele DeFi-Protokolle (Uniswap V2) brechen bei solchen Tokens. Besonders häufig bei Memecoins.

**2. Rebase**
Der Token passt die Balance aller Halter automatisch an (z.B. bei Staking-Rewards). AMPL und OHM sind bekannte Beispiele. Viele Protokolle kalkulieren mit statischen Balances und können falsche Ergebnisse liefern.

**3. Pause-fähige Tokens**
Der Emittent kann Transfers komplett stoppen. USDC und USDT haben diese Funktion (für Sanktionierungs-Zwecke). Im Normalbetrieb kein Problem, aber ein theoretisches Risiko.

**4. Blacklist**
Der Emittent kann spezifische Adressen sperren. Auch USDC und USDT haben das. Wenn deine Adresse auf die Blacklist kommt, kannst du die Tokens nicht mehr bewegen.

**5. Upgradeable Contracts**
Der Token-Contract kann nachträglich verändert werden. Das gibt Flexibilität, aber auch ein Risiko — ein kompromittiertes Admin-Team könnte bösartige Updates einspielen.

**Besonderer Fall: WETH (Wrapped ETH)**

ETH selbst ist **kein** ERC-20-Token. Das native Asset folgt einem eigenen, älteren Standard. Um ETH in DeFi-Protokollen zu nutzen, die ERC-20 erwarten, wird es in WETH gewickelt. WETH ist ein ERC-20-Contract, der 1:1 zu ETH ist:

- `deposit()` aufrufen + ETH senden → gleiche Menge WETH bekommen
- `withdraw(amount)` aufrufen → ETH zurückbekommen, WETH geburnt

Das Verhältnis ist immer 1:1 und mathematisch garantiert. Deshalb handeln WETH und ETH immer zum exakt gleichen Preis.

### Folien-Zusammenfassung

**[Slide 1] — Titel:** Der ERC-20-Token-Standard

**[Slide 2] — Was ist ein Token?** Smart Contract mit balance-Mapping. USDC auf 0xA0b869... speichert pro Adresse einen Wert.

**[Slide 3] — Die sechs Pflicht-Funktionen:** balanceOf, transfer, approve, transferFrom, allowance, totalSupply.

**[Slide 4] — Events:** Transfer und Approval. Grundlage für Etherscan-Tracking.

**[Slide 5] — Decimals:** Integer-Rechnung. USDC = 6, ETH/DAI = 18, WBTC = 8. Häufige Fehlerquelle.

**[Slide 6] — Mint/Burn:** USDC/USDT zentral, DAI collateralized, LP-Tokens automatisch, Memecoins fixed.

**[Slide 7] — Problematische Varianten:** Fee-on-Transfer, Rebase, Pause-fähig, Blacklist, Upgradeable.

**[Slide 8] — WETH:** ETH selbst ist kein ERC-20. WETH als 1:1-Wrapper für DeFi-Kompatibilität.

**[Slide 9] — Lesen auf Etherscan:** Jeder ERC-20 hat eine Contract-Page mit "Read Contract" und "Write Contract"-Tabs.

### Sprechertext

**[Slide 1]** Lektion 3.4: Der ERC-20-Token-Standard. Das ist der wichtigste Smart-Contract-Standard in DeFi. USDC, DAI, AAVE, UNI — alle ERC-20. Wer ERC-20 versteht, kann jeden Token einordnen.

**[Slide 2]** Ein Token ist kein digitales Objekt in deiner Wallet. Es ist ein Smart Contract mit einem internen Ledger. Das Contract speichert ein Mapping: Adresse auf Balance. Wenn du "USDC hältst", bedeutet das: der USDC-Contract hat einen Eintrag, der deiner Adresse einen Wert zuordnet. Die offizielle USDC-Adresse auf Ethereum ist 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48. Schreib sie dir auf — sie wird dir oft begegnen.

**[Slide 3]** Sechs Pflicht-Funktionen. balanceOf: wie viel hält eine Adresse. transfer: Sender bewegt Tokens. approve: Besitzer erlaubt Spender, Tokens zu bewegen. transferFrom: der Spender bewegt die approved Tokens. allowance: wie viel darf Spender bewegen. totalSupply: wie viele Tokens existieren insgesamt.

**[Slide 4]** Zwei Events. Transfer wird bei jedem Transfer emittiert, Approval bei jeder Approval. Diese Events werden on-chain in Block-Logs geschrieben. Das ist der Grund, warum Etherscan dir die Token-Bewegungen pro Adresse anzeigen kann — es liest diese Events aus.

**[Slide 5]** Decimals — der häufigste Verwechslungspunkt. Smart Contracts rechnen mit Integern. Wenn USDC "100 USDC" anzeigt, speichert der Contract 100 mal 10 hoch 6 — also 100 Millionen. Weil USDC 6 Decimals hat. ETH und DAI haben 18, WBTC hat 8, USDC und USDT haben 6. Wenn du direkt mit dem Contract interagierst, musst du mit Decimals multiplizieren. Apps erledigen das für dich, bei manueller Interaktion nicht.

**[Slide 6]** Mint und Burn — das Erschaffen und Zerstören von Tokens. USDC und USDT werden zentral vom Emittenten geminted, wenn USD eingeht. DAI wird von Nutzern geminted, die Sicherheiten in MakerDAO sperren. LP-Tokens werden automatisch beim Hinzufügen von Liquidität geminted. Memecoins sind oft fixed supply — alles beim Deployment geminted, danach nicht mehr.

**[Slide 7]** Nicht jeder ERC-20 verhält sich standardkonform. Fünf Varianten, die Probleme machen können. Fee-on-Transfer: Token belastet bei jedem Transfer eine Gebühr. Viele Protokolle brechen. Rebase: Balance aller Halter wird automatisch angepasst. Kalkulationen werden falsch. Pause-fähig: Emittent kann Transfers stoppen. USDC und USDT haben das. Blacklist: spezifische Adressen können gesperrt werden. Auch USDC und USDT. Upgradeable: Contract kann nachträglich geändert werden. Flexibilität, aber auch Risiko.

**[Slide 8]** Wichtig: ETH selbst ist kein ERC-20. Das native Asset folgt einem älteren Standard. Um ETH in Protokollen zu nutzen, die ERC-20 erwarten, wird es in WETH gewickelt. Du sendest ETH an den WETH-Contract und bekommst die gleiche Menge WETH zurück. Umgekehrt: WETH burnen und ETH zurückbekommen. Verhältnis immer 1:1, mathematisch garantiert. Deshalb handeln WETH und ETH zum exakt gleichen Preis.

**[Slide 9]** Jeder ERC-20-Contract auf Etherscan hat zwei Tabs: Read Contract und Write Contract. Read zeigt die Read-Funktionen — balanceOf, totalSupply, decimals — die du aufrufen kannst, ohne zu signieren. Write zeigt die Write-Funktionen — transfer, approve — die eine Signatur und Gas brauchen. Diese direkte Interaktion mit Contracts ist die letzte Instanz, wenn ein Frontend nicht funktioniert oder manipuliert wirkt.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Mapping-Darstellung: Adressen links, Balances rechts, Pfeile dazwischen.

**[Slide 3]** Funktionsliste mit kurzen Beschreibungen. **SCREENSHOT SUGGESTION:** USDC-Contract auf Etherscan, Read-Tab mit sichtbaren Standardfunktionen.

**[Slide 4]** Event-Flow: Transfer-Call → Event emittiert → Etherscan liest Event.

**[Slide 5]** Decimals-Tabelle mit den häufigsten Tokens. Daneben die Integer-Umrechnung von "100 USDC" zu 100000000.

**[Slide 6]** Mint/Burn-Flow-Diagramme für die vier Token-Kategorien.

**[Slide 7]** Fünf Warn-Karten für die problematischen Varianten mit jeweiligen Beispielen.

**[Slide 8]** Diagramm des WETH-Deposit/Withdraw-Flows.

**[Slide 9]** **SCREENSHOT SUGGESTION:** Etherscan-Contract-Page mit geöffnetem "Read Contract"-Tab bei USDC.

### Übung

**Aufgabe: ERC-20 Forensik auf Etherscan**

1. Gehe auf etherscan.io.
2. Suche den USDC-Contract (0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48) oder den DAI-Contract (0x6B175474E89094C44Da98b954EedeAC495271d0F).
3. Im "Contract"-Tab:
 - Prüfe, ob das Contract verified ist (grüner Haken)
 - Öffne "Read Contract"
 - Rufe folgende Funktionen auf: `name`, `symbol`, `decimals`, `totalSupply`
 - Rufe `balanceOf` mit einer beliebigen Adresse auf (z.B. deiner eigenen, oder einer Whale-Adresse)
4. Notiere alle Ergebnisse.
5. Berechne: Wie viele USDC oder DAI sind aktuell im Umlauf (totalSupply / 10^decimals)?

**Deliverable:** Ein Dokument mit allen gefundenen Werten und der berechneten Umlaufmenge.

### Quiz

**Frage 1:** Warum sind Fee-on-Transfer-Tokens für viele DeFi-Protokolle problematisch?

<details>
<summary>Antwort anzeigen</summary>

Die meisten DeFi-Protokolle kalkulieren intern mit der Annahme, dass ein `transfer(100)` auch tatsächlich 100 Tokens bewegt. Bei Fee-on-Transfer-Tokens werden aber z.B. 3% einbehalten — nur 97 kommen an. Wenn Uniswap V2 erwartet, dass eine bestimmte Menge in den Pool kommt, aber eine geringere Menge tatsächlich ankommt, schlägt die Transaktion fehl oder die Kalkulation ist falsch. Uniswap V3 und viele neuere Protokolle haben Handhabung dafür, aber nicht alle. Besonders riskant: wenn ein Protokoll die Fee-on-Transfer-Mechanik nicht erkennt und stattdessen in einer Endlosschleife festhängt oder falsche Werte speichert, können Exploits entstehen.
</details>

**Frage 2:** Du willst einen ERC-20-Token in deine MetaMask importieren und sie zeigt Name und Symbol automatisch an, aber die Balance ist 0, obwohl der Contract eigentlich einen Balance haben sollte. Was sind mögliche Ursachen?

<details>
<summary>Antwort anzeigen</summary>

Drei mögliche Ursachen. 1. **Falsche Chain:** Du hast den Token auf Ethereum Mainnet importiert, aber der Balance ist auf Arbitrum. Jede Chain hat eigene Contract-Adressen. 2. **Falsche Contract-Adresse:** Du hast vielleicht die Adresse eines ähnlichen Tokens oder eines Scam-Tokens mit gleichem Namen eingefügt. Immer die offizielle Contract-Adresse vom Emittenten (oder verifiziert via CoinGecko/CoinMarketCap) verwenden. 3. **Upgradeable Contract-Migration:** Bei sehr alten Tokens kann es sein, dass ein Migration zu einem neuen Contract stattgefunden hat. Alte Tokens auf alter Adresse werden ignoriert. Bei allen Fällen: auf Etherscan die `balanceOf`-Funktion direkt mit deiner Adresse aufrufen, das ist die zuverlässigste Methode.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 8 Slides: Titel → ERC-20-Standardfunktionen → Decimals & totalSupply → Mint/Burn → approve/transferFrom → Problematische Varianten (Fee-on-Transfer, Rebase, Pause) → Admin/Governance-Funktionen → Due-Diligence-Checkliste
- `voice_script.txt` — *Voice Narration Script* (120–140 WPM, Zielvideo 10–12 Min.)
- `visual_plan.json` — ERC-20-Interface-Diagramm, Decimals-Beispiel, approve/transferFrom-Flussdiagramm, USDT/USDC-Code-Screenshot (Blacklist/Pause), Etherscan-Token-Seite

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 3.5 — NFT-Standards: ERC-721 und ERC-1155

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- ERC-721 und ERC-1155 unterscheiden und ihre jeweiligen Use Cases einordnen
- Den `setApprovalForAll`-Mechanismus als häufigen Drainer-Vektor erkennen
- NFT-Metadaten und ihre on-chain/off-chain-Trennung verstehen
- Token-URI-Strukturen (IPFS vs. HTTPS vs. On-Chain-SVG) in Bezug auf Langlebigkeit und Zensurresistenz beurteilen
- Die Rolle von Royalties (EIP-2981) und deren Nicht-Enforcement auf Marktplatz-Ebene einordnen
- NFT-spezifische Approval-Hygiene (inkl. OpenSea-Proxy-Pattern) im eigenen Wallet systematisch durchführen

### Erklärung

NFTs — Non-Fungible Tokens — spielen im Kern-DeFi-Kontext eine untergeordnete Rolle, aber sie begegnen dir unvermeidbar: als Wallet-Interaktionen, als Teil von komplexen Positionen (Uniswap V3 LP-Positionen sind NFTs), und als Angriffsvektor. Diese Lektion gibt dir das notwendige Minimum, um NFTs technisch einzuordnen.

**Was macht einen Token "non-fungible"?**

Fungibel = austauschbar. 1 USDC ist identisch mit einem anderen USDC — sie sind vertauschbar ohne Unterschied. Non-fungibel = einzigartig. Ein ERC-721-Token hat eine Token-ID, und jede ID repräsentiert ein unverwechselbares Objekt.

**ERC-721: Der klassische NFT-Standard**

Ein ERC-721-Contract speichert pro Token-ID einen Besitzer:
```
mapping(uint256 => address) owners;
```

Jede Token-ID ist innerhalb des Contracts einzigartig. Wenn du "Bored Ape #1234" hast, bedeutet das: der Bored-Ape-Contract verzeichnet, dass Token-ID 1234 deiner Adresse gehört.

**ERC-721-Standardfunktionen:**
- `ownerOf(tokenId)` — gibt Besitzer zurück
- `balanceOf(address)` — Anzahl NFTs dieser Collection, nicht konkrete IDs
- `transferFrom(from, to, tokenId)` — Transfer einer spezifischen ID
- `approve(spender, tokenId)` — Approval für eine spezifische ID
- `setApprovalForAll(operator, bool)` — Approval für ALLE aktuellen und zukünftigen IDs

**Die `setApprovalForAll`-Gefahr**

Wenn du eine NFT-Collection auf OpenSea oder einem anderen Marktplatz listen willst, fordert der Marktplatz typischerweise `setApprovalForAll(marketplace, true)`. Das bedeutet: der Marktplatz-Contract darf **alle** deine NFTs dieser Collection bewegen — jetzt und in Zukunft.

Das ist **ein häufiger Drainer-Vektor**. Eine gefälschte NFT-Marktplatz-Site fordert `setApprovalForAll` für eine wertvolle Collection. Einmal signiert, kann der Drainer-Contract jede NFT der Collection abziehen, ohne weitere Signatur.

**Verteidigung:**
- Niemals `setApprovalForAll` auf unbekannten Sites signieren
- Auf revoke.cash die aktiven NFT-Approvals überprüfen (separater Tab für NFTs)
- Bei Zweifeln: `approve` für einzelne Token-IDs statt `setApprovalForAll` — umständlicher, aber sicherer

**ERC-1155: Der Mehrzweck-Standard**

ERC-1155 unterstützt beide — fungible und non-fungible Tokens — in einem einzigen Contract. Statt pro Token-ID einen einzelnen Besitzer speichert ein ERC-1155-Contract:
```
mapping(uint256 => mapping(address => uint256)) balances;
```

Das heißt: pro Token-ID und pro Adresse eine Balance. Eine Token-ID kann theoretisch 1.000.000 Exemplare haben (fungible) oder nur 1 (non-fungible, "NFT-like").

**Use Cases:**
- **Gaming:** Spiele mit vielen verschiedenen Item-Typen in einem Contract. 1000 Schwerter der Sorte X (fungible), 1 legendäres Schwert #1234 (non-fungible).
- **Editions:** Limitierte Kunstwerk-Editions (z.B. 100 Stück einer bestimmten Komposition).
- **Effizienz:** Batch-Transfers mehrerer unterschiedlicher Token-IDs in einer Transaktion.

**Standardfunktionen** sind ähnlich wie ERC-721, aber mit Unterstützung für Batch-Operationen (`safeBatchTransferFrom`, `balanceOfBatch`).

**Metadaten: On-chain vs. Off-chain**

Ein NFT verweist meist auf Metadaten — Bild, Name, Attribute. Es gibt drei Speicher-Ansätze:

**1. Off-chain (HTTP):**
Die Metadaten-URL zeigt auf einen normalen Web-Server (z.B. `https://api.collection.com/metadata/1234.json`). Wenn der Server ausfällt, ist die NFT-Darstellung weg. Billig, aber nicht dezentral.

**2. Off-chain (IPFS):**
Die URL ist ein IPFS-Hash (z.B. `ipfs://Qm...`). IPFS ist dezentral, aber die Daten bleiben nur verfügbar, solange mindestens ein Node sie pinned. Billig und "dezentraler", aber nicht garantiert permanent.

**3. On-chain:**
Die kompletten Metadaten werden im Smart Contract gespeichert. Teuer in der Speicherung, aber permanent und zensur-resistent. Wenige NFTs nutzen das (z.B. Chain Runners, Art Blocks in Teilen).

**Die Konsequenz:** Eine NFT kann technisch existieren, aber ihr Bild verschwinden. Der "Wert" einer NFT ist Speicher-abhängig und rechtlich meist nicht klar definiert.

**Warum NFTs für DeFi-Nutzer relevant sind**

Auch wenn du keine Kunst-NFTs handelst, begegnen dir NFT-Standards in DeFi:

**1. Uniswap V3 LP-Positionen sind NFTs**
Jede konzentrierte Liquiditätsposition auf Uniswap V3 ist ein ERC-721-NFT mit einer spezifischen ID. Das erlaubt einzigartige Positionsdetails (Range, Fee-Tier), macht aber auch den Transfer der Position möglich — und die Verwaltung von Approvals komplizierter.

**2. Governance-NFTs**
Einige Protokolle (z.B. Ve-tokenomics von Curve) nutzen NFTs für gelockte Positionen.

**3. Gaming und Social Tokens**
Das NFT-Ökosystem überlappt mit Tokenized Assets (Fan Tokens, Membership-Pässe, etc.).

**4. Drainer-Vektoren**
`setApprovalForAll` ist einer der gefährlichsten Signatur-Typen, auch wenn du keine teuren NFTs hast.

### Folien-Zusammenfassung

**[Slide 1] — Titel:** NFT-Standards: ERC-721 und ERC-1155

**[Slide 2] — Fungible vs. Non-fungible:** USDC fungibel (austauschbar), NFT einzigartig (Token-ID).

**[Slide 3] — ERC-721:** Pro Token-ID ein Besitzer. Klassischer NFT-Standard.

**[Slide 4] — setApprovalForAll:** Approval für ALLE NFTs einer Collection. Häufigster Drainer-Vektor.

**[Slide 5] — ERC-1155:** Fungible und non-fungible in einem Contract. Gaming, Editions, Batch-Operations.

**[Slide 6] — Metadaten:** HTTP (zentral), IPFS (dezentral aber optional), On-Chain (permanent aber teuer).

**[Slide 7] — NFTs in DeFi:** Uniswap V3 LP-Positionen, ve-Tokens, Drainer-Vektoren.

**[Slide 8] — Verteidigung:** setApprovalForAll misstrauen, revoke.cash-NFT-Tab nutzen.

### Sprechertext

**[Slide 1]** Lektion 3.5: NFT-Standards. NFTs sind im Kern-DeFi-Kontext nebensächlich, aber du kannst ihnen nicht entkommen — als Wallet-Interaktion, als Teil komplexer Positionen und als Angriffsvektor. Diese Lektion gibt dir das technische Minimum.

**[Slide 2]** Was macht einen Token non-fungible? Fungibel heißt austauschbar. Ein USDC ist identisch mit einem anderen USDC. Non-fungibel heißt einzigartig. Ein ERC-721-Token hat eine Token-ID, und jede ID repräsentiert ein unverwechselbares Objekt.

**[Slide 3]** ERC-721 ist der klassische NFT-Standard. Der Contract speichert pro Token-ID einen Besitzer. Die Standardfunktionen: ownerOf für den Besitzer einer ID, balanceOf für die Anzahl NFTs dieser Collection, transferFrom für einzelne Transfers, approve für einzelne IDs — und setApprovalForAll für alle IDs einer Collection.

**[Slide 4]** setApprovalForAll ist der gefährlichste NFT-Mechanismus. Wenn du eine Collection auf OpenSea listen willst, fordert der Marktplatz diese Approval. Damit darf der Marktplatz alle deine aktuellen und zukünftigen NFTs dieser Collection bewegen. Eine gefälschte Marktplatz-Site kann das missbrauchen. Einmal signiert, sind alle wertvollen NFTs in Gefahr. Verteidigung: setApprovalForAll nur auf vertrauenswürdigen Sites, revoke.cash-NFT-Tab regelmäßig checken, bei Zweifel lieber einzel-approven als alles.

**[Slide 5]** ERC-1155 ist der Mehrzweck-Standard. Unterstützt beide — fungible und non-fungible — in einem Contract. Pro Token-ID und pro Adresse eine Balance. Eine Token-ID kann 1.000.000 Exemplare haben oder nur 1. Use Cases: Gaming mit vielen Item-Typen, limitierte Kunst-Editions, Batch-Operations für Effizienz.

**[Slide 6]** NFT-Metadaten werden auf drei Arten gespeichert. Off-chain HTTP: URL zeigt auf normalen Web-Server. Billig, aber wenn der Server ausfällt, ist die Darstellung weg. Off-chain IPFS: dezentral, aber nur verfügbar, solange Nodes die Daten pinnen. On-chain: alle Metadaten im Contract. Permanent und zensur-resistent, aber teuer. Die meisten NFTs sind HTTP oder IPFS — die "Permanenz" einer NFT ist oft nicht so absolut, wie behauptet.

**[Slide 7]** Warum das alles für DeFi-Nutzer relevant ist. Erstens: Uniswap V3 LP-Positionen sind NFTs. Wer konzentrierte Liquidität bereitstellt, bekommt einen ERC-721-Token. Zweitens: manche Protokolle wie Curve nutzen NFTs für gelockte ve-Tokens. Drittens: Drainer-Vektoren. setApprovalForAll ist einer der gefährlichsten Signatur-Typen, auch wenn du selbst keine teuren NFTs hältst.

**[Slide 8]** Verteidigung. Prinzipielle Regel: setApprovalForAll ist ein Maximal-Vertrauens-Signal — sparsam verwenden. Nur auf Sites signieren, die du kennst und die gerade legitim einen Bulk-Transfer rechtfertigen. revoke.cash hat einen separaten Tab für NFT-Approvals — monatlich durchgehen. Bei Zweifeln: einzelne Token-IDs approven statt alles.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Links: mehrere identische USDC-Tokens (fungibel). Rechts: drei unterschiedliche NFT-Karten (non-fungibel).

**[Slide 3]** Mapping-Darstellung: Token-IDs links, Besitzer-Adressen rechts.

**[Slide 4]** Warnfeld: "setApprovalForAll = ALLE NFTs". **SCREENSHOT SUGGESTION:** MetaMask oder Rabby Signatur-Dialog für setApprovalForAll.

**[Slide 5]** Vergleichsdiagramm ERC-721 vs. ERC-1155.

**[Slide 6]** Drei-Spalten-Vergleich der Metadaten-Optionen mit jeweiligen Trade-offs.

**[Slide 7]** **SCREENSHOT SUGGESTION:** Uniswap-V3-LP-Position-Seite, die die Position als NFT zeigt.

**[Slide 8]** **SCREENSHOT SUGGESTION:** revoke.cash NFT-Approvals-Tab.

### Übung

**Aufgabe: NFT-Approval-Audit**

1. Öffne revoke.cash.
2. Verbinde deine Wallet.
3. Wechsle zum NFT-Tab.
4. Prüfe, ob `setApprovalForAll`-Approvals existieren.
5. Für jede: Notiere den Operator (wer hat die Approval?) und die Collection.
6. Bewerte: Kennst du den Operator? Brauchst du die Approval noch?

**Deliverable:** Liste aller NFT-Approvals mit Bewertung.

### Quiz

**Frage 1:** Warum ist `setApprovalForAll` ein systematisch gefährlicher als `approve` für einzelne Token-IDs?

<details>
<summary>Antwort anzeigen</summary>

`setApprovalForAll` gibt unbeschränkten Zugriff auf alle aktuellen und zukünftigen NFTs einer Collection — eine einzige Signatur reicht für potenziell Millionen Dollar. `approve(tokenId)` gibt Zugriff nur auf einen einzelnen NFT — jeder weitere NFT erfordert eine neue, explizite Approval. Bei einem Drainer-Angriff bekommt der Angreifer mit `setApprovalForAll` sofort eine ganze Collection; mit `approve` nur einen einzelnen NFT und muss für weitere jeweils neue Signaturen erwirken, was viel auffälliger ist. Der Komfort-Nachteil von einzelnen Approvals ist deutlich — bei jedem NFT-Transfer eine eigene Signatur — weshalb Marktplätze routinemäßig `setApprovalForAll` anfordern. Für Nutzer ist das akzeptables Risiko nur bei vertrauenswürdigen, etablierten Marktplätzen.
</details>

**Frage 2:** Du kaufst eine NFT für 500 USD auf einem seriösen Marktplatz. Zwei Jahre später schaut die NFT in deiner Wallet merkwürdig aus — die Bilder sind verschwunden oder zeigen Fehler. Was könnte passiert sein und wie prüfst du es?

<details>
<summary>Antwort anzeigen</summary>

Wahrscheinliche Ursache: die Metadaten waren off-chain gespeichert und der zugehörige Server oder IPFS-Pin ist ausgefallen. Die Token-ID gehört weiterhin dir (der Contract-State ist stabil), aber die Bilddarstellung ist verloren. Prüfung: Rufe auf Etherscan die `tokenURI(tokenId)`-Funktion des Contracts auf. Das zeigt dir die Metadaten-URL. Wenn sie HTTP ist und nicht lädt, ist der Server offline. Wenn sie IPFS ist und nicht lädt, ist der Pin verloren. Bei On-Chain-Metadaten wäre das nicht passiert. Aktion: bei wertvollen Collections kannst du die Originalmetadaten in der Wayback Machine oder auf OpenSea-Caches finden; neue Pinning-Services können die IPFS-Daten re-hosten, wenn sie vorhanden sind. Lerne daraus: NFT-"Permanenz" ist oft vom Storage-Modell abhängig.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Slides: Titel → ERC-721 vs. ERC-1155 → Use Cases → setApprovalForAll-Risiko → Metadaten on-chain/off-chain → Royalties (EIP-2981) → NFT-Approval-Hygiene
- `voice_script.txt` — *Voice Narration Script* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — ERC-721 vs. ERC-1155 Vergleichstabelle, setApprovalForAll-Drainer-Flow, IPFS/HTTPS/On-Chain-Storage-Diagramm, revoke.cash NFT-Tab-Screenshot

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 3.6 — Etherscan als Untersuchungs-Tool

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die Haupt-Sektionen einer Etherscan-Seite lesen und interpretieren
- Transaktions-Details, Event-Logs und Internal Transactions analysieren
- Smart Contracts auf Etherscan inspizieren und direkt mit ihnen interagieren
- Verifizierten vs. unverifizierten Smart-Contract-Source-Code als erstes Due-Diligence-Signal einordnen
- Read/Write Contract Funktionen direkt auf Etherscan nutzen, um Protokoll-Zustände zu prüfen (z.B. Allowance, Balance, Owner)
- Eine verdächtige Transaktion oder einen unbekannten Token systematisch anhand von Holders, Transfers, Code und Events forensisch einordnen

### Erklärung

Etherscan (etherscan.io für Ethereum, arbiscan.io für Arbitrum, basescan.org für Base, etc.) ist das wichtigste forensische Tool in DeFi. Jeder ernsthafte DeFi-Nutzer kann Etherscan so lesen, wie ein Trader ein Candlestick-Chart liest. Diese Lektion gibt dir die vollständige Orientierung.

**Die drei Haupt-Seiten-Typen**

Etherscan zeigt drei Arten von Seiten, je nach dem, was du suchst:

**1. Address Page** — für Wallet-Adressen oder Smart Contracts
**2. Transaction Page** — für einzelne Transaktionen (Hash-basiert)
**3. Block Page** — für einzelne Blöcke (Block-Nummer)

Wir gehen jede durch.

**Die Address Page**

Wenn du eine Adresse in die Suchleiste eingibst, bekommst du eine Übersicht:

- **Balance:** ETH-Balance der Adresse
- **Token Balances:** Dropdown mit allen ERC-20-Tokens, die die Adresse hält
- **Transactions:** Liste aller Transaktionen, die von oder zu dieser Adresse gingen
- **Internal Transactions:** Transfers, die durch Smart-Contract-Ausführung ausgelöst wurden
- **Token Transfers (ERC-20):** Alle ERC-20-Transfers zu/von dieser Adresse
- **NFT Transfers (ERC-721/1155):** Separate Tabs für NFT-Bewegungen
- **Analytics:** Charts und Statistiken

**Wichtiger Tipp:** Normale `Transactions` zeigen nur Transaktionen, die die Adresse signiert oder direkt empfangen hat. Aber viele Token-Bewegungen passieren via Smart-Contract-Ausführung — die stehen in **Internal Transactions** oder **Token Transfers**. Wer nur den ersten Tab liest, sieht einen Teil der Wahrheit nicht.

**Die Transaction Page**

Wenn du einen Transaktions-Hash eingibst, siehst du die vollständigen Details:

- **Transaction Hash:** Die eindeutige ID
- **Status:** Success oder Fail
- **Block:** In welchem Block enthalten
- **Timestamp:** Wann ausgeführt
- **From/To:** Absender und Empfänger (oder Contract)
- **Value:** ETH-Betrag (oft 0 bei Contract-Interaktionen)
- **Transaction Fee:** Gas-Kosten
- **Gas Price, Gas Limit, Gas Used:** Die drei Gas-Werte
- **Input Data:** Die roh-kodierte Funktion, die aufgerufen wurde
- **Logs:** Die Events, die während der Ausführung emittiert wurden
- **State:** Was sich im Ethereum-State verändert hat

**Die "Decoded Input Data"-Funktion** zeigt dir, welche Funktion aufgerufen wurde und mit welchen Parametern. Etwa: `swap(amountIn=1000000000000000000, amountOutMin=...)` für einen Uniswap-Swap.

**Event-Logs lesen**

Der `Logs`-Tab zeigt alle während der Transaktion emittierten Events. Für einen einfachen ERC-20-Transfer siehst du:
```
Transfer(from=0xabc..., to=0xdef..., value=1000000)
```

Für komplexe DeFi-Transaktionen kann eine Transaktion 10–30 Events emittieren. Wer Events lesen kann, versteht jeden Schritt der Transaktion.

**Contract Pages**

Wenn eine Adresse ein Smart Contract ist (statt einer EOA), zeigt Etherscan zusätzliche Tabs:

**1. Contract Tab**
- **Code:** Der Solidity-Quellcode, wenn das Contract verifiziert wurde
- **Read Contract:** Alle Read-Funktionen, die du ohne Signatur aufrufen kannst
- **Write Contract:** Alle Write-Funktionen, die du mit Wallet-Signatur aufrufen kannst

**Verifiziert vs. unverifiziert**

Ein Contract auf Etherscan ist entweder "verified" (grüner Haken, Quellcode sichtbar) oder nicht. Unverifizierte Contracts zeigen nur Bytecode — praktisch unlesbar für Menschen. Im ernsthaften DeFi-Kontext solltest du **niemals** mit unverifizierten Contracts interagieren. Verifizierung bedeutet nicht Sicherheit — aber Fehlen der Verifizierung ist ein starkes Warnsignal.

**2. Token Transfers**
Bei Token-Contracts (ERC-20/721/1155) zusätzlicher Tab mit allen Transfers dieses Tokens.

**3. Analytics**
Holder-Verteilung, Transfer-Volumen über Zeit.

**Token Approval Checker**

Etherscan hat einen eigenen Approval-Checker: `etherscan.io/tokenapprovalchecker`. Funktional ähnlich wie revoke.cash, aber direkt integriert. Zeigt:
- Aktive ERC-20-Approvals
- Aktive NFT-Approvals
- Option zum direkten Widerruf via Etherscan-Interface

**Workflow: Eine verdächtige Transaktion analysieren**

Szenario: Du siehst eine unerwartete Transaktion in deiner Wallet-History und willst verstehen, was passiert ist.

1. **Transaktion auf Etherscan öffnen** (Tx-Hash eingeben)
2. **Status prüfen:** Success oder Fail?
3. **From/To:** Wer hat gesendet, wer empfangen? Wenn To ein Contract ist, welcher?
4. **Decoded Input Data:** Welche Funktion wurde aufgerufen? Mit welchen Parametern?
5. **Logs:** Welche Events wurden emittiert? Wurden Token-Transfers ausgelöst?
6. **State Changes:** Welche Balances haben sich verändert?

Mit diesem Workflow kannst du jede Transaktion forensisch auseinandernehmen.

**Workflow: Einen unbekannten Token recherchieren**

Szenario: Ein Token erscheint in deiner Wallet oder jemand empfiehlt ihn dir.

1. **Contract-Adresse auf Etherscan eingeben**
2. **Prüfen: verifiziert?** Wenn nicht → Warnung
3. **Token-Übersicht:** Name, Symbol, totalSupply, Decimals
4. **Holders-Tab:** Wie ist die Verteilung? Einzelner Holder mit >50% = Zentralisierungsrisiko
5. **Transfers-Tab:** Wie aktiv wird der Token gehandelt?
6. **Contract Code:** Sind Fee-on-Transfer-Mechaniken, Blacklist-Funktionen oder bösartige Patterns sichtbar?
7. **Contract-Alter:** Seit wann existiert der Contract? Sehr junge Tokens sind hochrisiko.

**Direkte Contract-Interaktion**

Im Notfall — wenn ein Protokoll-Frontend down ist oder du ihm misstraust — kannst du direkt mit dem Contract über Etherscan interagieren:

1. **Contract-Page öffnen**
2. **"Write Contract"-Tab**
3. **"Connect to Web3"** (verbindet deine Wallet)
4. **Funktion auswählen und Parameter eingeben**
5. **"Write" drücken — Wallet-Signatur**

Das ist besonders nützlich bei Notfall-Withdrawals aus Lending-Protokollen, wenn die offizielle Website nicht funktioniert. Erfordert allerdings Verständnis der Funktionssignaturen und korrekte Parameter (inkl. Decimals).

### Folien-Zusammenfassung

**[Slide 1] — Titel:** Etherscan als Untersuchungs-Tool

**[Slide 2] — Drei Seiten-Typen:** Address, Transaction, Block.

**[Slide 3] — Address Page:** Balance, Token Balances, Transactions, Internal Tx, Token Transfers, NFT Transfers, Analytics.

**[Slide 4] — Transaction Page:** Status, From/To, Value, Gas, Input Data, Logs, State Changes.

**[Slide 5] — Event-Logs:** Alle emittierten Events. Schritt-für-Schritt-Rekonstruktion der Transaktion.

**[Slide 6] — Contract Pages:** Code, Read Contract, Write Contract. Verifiziert = grüner Haken.

**[Slide 7] — Token Approval Checker:** etherscan.io/tokenapprovalchecker. Integrierte Alternative zu revoke.cash.

**[Slide 8] — Token-Recherche-Workflow:** Verifiziert? Holders? Transfers? Alter? Code-Patterns?

**[Slide 9] — Direkte Contract-Interaktion:** Write Contract Tab. Notfall-Withdrawals ohne offizielles Frontend.

### Sprechertext

**[Slide 1]** Letzte Lektion in Modul 3: Etherscan. Das wichtigste forensische Tool in DeFi. Nach dieser Lektion kannst du Etherscan lesen, wie ein Trader ein Candlestick-Chart.

**[Slide 2]** Drei Seiten-Typen. Address Page für Wallet-Adressen oder Smart Contracts. Transaction Page für einzelne Transaktionen per Hash. Block Page für einzelne Blöcke per Nummer. Jede hat eigene Struktur.

**[Slide 3]** Die Address Page. Oben die ETH-Balance. Darunter Token Balances als Dropdown mit allen ERC-20-Tokens. Dann die Transactions-Liste. Wichtig: normale Transactions zeigen nur, was die Adresse signiert oder direkt empfangen hat. Viele Token-Bewegungen passieren über Smart-Contract-Ausführung — die stehen in Internal Transactions und Token Transfers. Wer nur den ersten Tab liest, sieht einen Teil der Wahrheit nicht.

**[Slide 4]** Die Transaction Page. Status: Success oder Fail. From und To. Value: oft 0 bei Contract-Interaktionen. Die drei Gas-Werte. Und besonders wichtig: Input Data. Etherscan hat eine "Decoded Input Data"-Funktion, die dir zeigt, welche Funktion aufgerufen wurde und mit welchen Parametern. Das ist die Basis jeder forensischen Analyse.

**[Slide 5]** Event-Logs. Der Logs-Tab zeigt alle während der Transaktion emittierten Events. Für einen ERC-20-Transfer siehst du: Transfer von Adresse A zu Adresse B, mit Value X. Eine komplexe DeFi-Transaktion kann 10 bis 30 Events emittieren. Wer Events lesen kann, versteht jeden Schritt.

**[Slide 6]** Contract Pages haben zusätzliche Tabs. Code — der Solidity-Quellcode, wenn verifiziert. Read Contract — alle Read-Funktionen, die du ohne Signatur aufrufen kannst. Write Contract — alle Write-Funktionen, die du mit Wallet-Signatur aufrufen kannst. Der grüne Haken bei "Contract" zeigt, ob verifiziert wurde. Unverifizierte Contracts zeigen nur Bytecode — unlesbar für Menschen. Ernsthafte DeFi-Regel: niemals mit unverifizierten Contracts interagieren.

**[Slide 7]** Etherscan hat einen eigenen Token Approval Checker auf etherscan.io/tokenapprovalchecker. Funktional ähnlich wie revoke.cash, aber direkt integriert. Zeigt aktive ERC-20- und NFT-Approvals und erlaubt direkten Widerruf. Beide Tools sind nützlich; beide sollten in deiner Monatsroutine sein.

**[Slide 8]** Token-Recherche-Workflow. Contract-Adresse auf Etherscan eingeben. Prüfen: verifiziert? Wenn nicht — Warnung. Token-Übersicht: Name, Symbol, totalSupply, Decimals. Holders-Tab: wie ist die Verteilung? Ein einzelner Holder mit mehr als 50% ist Zentralisierungsrisiko. Transfers-Tab: wie aktiv ist der Handel? Contract Code: gibt es Fee-on-Transfer, Blacklist, bösartige Patterns? Contract-Alter: sehr junge Tokens sind hochrisiko. Mit diesem Workflow kannst du jeden Token in fünf Minuten einordnen.

**[Slide 9]** Im Notfall kannst du direkt mit einem Contract interagieren — Write Contract Tab, Connect to Web3, Funktion wählen, Parameter eingeben, signieren. Besonders nützlich bei Notfall-Withdrawals aus Lending-Protokollen, wenn die offizielle Website nicht funktioniert. Erfordert Verständnis der Funktionssignaturen und korrekte Parameter — vergiss Decimals nicht. Für Fortgeschrittene ist das eine essentielle Rückfallebene.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Drei-Seiten-Illustration mit je einem Screenshot-Thumbnail.

**[Slide 3]** **SCREENSHOT SUGGESTION:** Etherscan Address Page mit sichtbaren Tabs (Transactions, Internal Txns, Token Transfers, etc.).

**[Slide 4]** **SCREENSHOT SUGGESTION:** Etherscan Transaction Detail Page mit markierten Bereichen (Status, From/To, Input Data, Logs).

**[Slide 5]** Auszug aus einer Logs-Ansicht mit mehreren dekodierten Events.

**[Slide 6]** **SCREENSHOT SUGGESTION:** USDC-Contract-Page auf Etherscan mit sichtbaren Tabs (Code, Read Contract, Write Contract) und grünem Verified-Haken.

**[Slide 7]** **SCREENSHOT SUGGESTION:** etherscan.io/tokenapprovalchecker mit aktiven Approvals einer Beispiel-Wallet.

**[Slide 8]** Checkliste mit sechs Schritten für Token-Recherche.

**[Slide 9]** **SCREENSHOT SUGGESTION:** Etherscan Write Contract Tab mit geöffnetem Funktions-Feld.

### Übung

**Aufgabe: Etherscan-Forensik einer realen Transaktion**

1. Wähle eine beliebige Transaktion aus deiner eigenen Wallet-History oder von einer Whale-Adresse (z.B. vitalik.eth auf Etherscan).
2. Öffne die Transaction Page.
3. Dokumentiere:
 - Transaction Hash
 - Status
 - From → To (und wenn To ein Contract ist, welcher)
 - Value in ETH
 - Total Gas Cost in ETH und USD
 - Decoded Input Data (welche Funktion, welche Parameter)
 - Mindestens drei emittierte Events mit ihrer Bedeutung
4. Schreibe eine "Plain-Language-Summary" der Transaktion in 2–3 Sätzen: Was ist passiert?

**Deliverable:** Dokument mit der vollständigen Analyse.

### Quiz

**Frage 1:** Warum ist es nicht ausreichend, nur den `Transactions`-Tab einer Adresse zu lesen, um ihre komplette Aktivität zu verstehen?

<details>
<summary>Antwort anzeigen</summary>

Der `Transactions`-Tab zeigt nur Transaktionen, bei denen die Adresse direkt beteiligt ist als Signer oder als direkter Empfänger (From oder To). Viele wichtige Aktivitäten passieren aber durch Smart-Contract-Ausführung: wenn ein Contract A eine Funktion in Contract B aufruft und dabei Tokens an Adresse X transferiert, erscheint das nicht im normalen Transactions-Tab von X. Es erscheint aber im `Internal Transactions`-Tab (für ETH-Transfers innerhalb einer Transaktion) und im `Token Transfers`-Tab (für ERC-20-Transfers). Für komplexe DeFi-Positionen — z.B. Lending-Deposits, bei denen die Adresse aTokens empfängt — sind die Haupt-Bewegungen in `Token Transfers` sichtbar, nicht in `Transactions`. Drei Tabs lesen ist Pflicht für vollständiges Verständnis.
</details>

**Frage 2:** Du willst einen neuen Token bewerten, den jemand dir empfohlen hat. Der Contract ist auf Etherscan unverifiziert. Was bedeutet das und was ist deine Entscheidung?

<details>
<summary>Antwort anzeigen</summary>

Ein unverifizierter Contract zeigt auf Etherscan nur den kompilierten Bytecode, nicht den lesbaren Solidity-Quellcode. Das bedeutet: niemand kann einfach prüfen, was das Contract tatsächlich tut. Bekannte bösartige Muster (Fee-on-Transfer, Blacklist-Funktionen, Rug-Pull-Hintertüren) könnten existieren, ohne entdeckt zu werden. Ein seriöses Projekt wird den Contract fast immer verifizieren — Etherscan-Verifizierung ist kostenlos und Standard-Praxis. Fehlende Verifizierung kann zwei Ursachen haben: (1) das Projekt hat vergessen/wollte nicht, was unprofessionell ist, oder (2) der Contract enthält Mechanismen, die das Team nicht zeigen will. Beide Fälle sind Warnsignale. Entscheidung: nicht investieren, bis der Contract verifiziert und geprüft ist. Für den Kern-Kapitalerhalt ist das eine klare Linie — unverifiziert = keine Interaktion.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 8 Slides: Titel → Etherscan-Haupt-Sektionen → Transaktionsdetails → Event Logs → Internal Transactions → Contract-Inspektion → Read/Write-Interaktion → Forensik-Workflow
- `voice_script.txt` — *Voice Narration Script* (120–140 WPM, Zielvideo 10–12 Min.)
- `visual_plan.json` — Etherscan-Adress-Seite, Tx-Detail-Annotationen, Event-Log-Decoding, Read/Write-Contract-Screenshot, verifiziert/unverifiziert-Vergleich, Forensik-Workflow-Flowchart

Pipeline: Gamma → ElevenLabs → CapCut.

---

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

Vor EIP-4844 posteten Rollups ihre Daten als normale Calldata auf Ethereum Mainnet, was 80–95% der L2-Transaktionskosten ausmachte. EIP-4844 führte Blobs ein — einen neuen Datentyp mit drei Eigenschaften: (1) eigener, niedriger Gas-Markt entkoppelt von Calldata, (2) nur 18 Tage temporäre Speicherung, (3) KZG-Commitments statt direktem EVM-Zugriff. Technisch möglich, weil Rollups die Daten nur kurzfristig brauchen — für Verifikation, Fraud-Proofs oder ZK-Proof-Generation. Dauerhaftes Speichern in Ethereum-State ist unnötig. Diese Einsicht hat L2-Gebühren um den Faktor 10 reduziert. Ein Arbitrum-Swap ging von 0,30 USD auf 0,03 USD, was ganz neue Nutzungsmuster ermöglicht (häufiges Rebalancing, Micro-Trades).
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

**Was in Modul 4 kommt:** DEX-Mechanik. Wie Automated Market Makers funktionieren (Constant-Product-Formel). Uniswap V2 vs. V3. Slippage, Price Impact und MEV. Was du als Swapper verstehen musst, um systematisch nicht verlierst.

---

*Ende von Modul 3.*
