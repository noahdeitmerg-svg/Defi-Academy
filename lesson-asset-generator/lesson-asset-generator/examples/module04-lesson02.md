# Lesson Title
Automated Market Maker: Das Constant-Product-Modell

# Learning Objectives
- Das Constant-Product-Modell x*y=k mathematisch erklaeren koennen
- Den Zusammenhang zwischen Pool-Reserven und Preisbildung verstehen
- Slippage und Impermanent Loss als Konsequenzen des Modells einordnen
- Die Architektur eines Uniswap-V2-Pools in ihren Komponenten benennen

# Explanation
Ein Automated Market Maker, kurz AMM, ist ein Smart Contract, der
Liquiditaet fuer den Handel zwischen zwei Tokens bereitstellt. Statt
eines Orderbuchs verwendet er eine Bonding-Curve. Das bekannteste
Modell ist das Constant-Product-Modell x*y=k, bei dem das Produkt der
Reserven konstant bleibt. Der Preis eines Tokens ergibt sich aus dem
Verhaeltnis der Reserven. Jeder Swap veraendert die Reserven und damit
den Preis. Grosse Swaps fuehren zu Slippage. Liquidity Provider
deponieren beide Tokens im gleichen Wertverhaeltnis und erhalten
LP-Tokens. Sie sind dem Impermanent Loss ausgesetzt, wenn sich die
Preise der Tokens voneinander entfernen.

# Slide Summary
- Ein AMM ist ein Smart Contract, der Trades ohne Orderbuch ermoeglicht.
- Das Constant-Product-Modell folgt der Formel x*y=k mit konstantem k.
- Der Preis ergibt sich aus dem Verhaeltnis der Reserven y/x.
- Jeder Swap veraendert die Reserven und damit den Preis.
- Grosse Swaps verursachen Slippage, weil die Bonding-Curve nicht linear ist.
- Die Architektur besteht aus Pool-Contract, LP-Tokens und Fee-Mechanismus.
- LP-Tokens repraesentieren den Anteil am Pool.
- Impermanent Loss entsteht, wenn sich die Preise der Tokens auseinander entwickeln.
- Als konkretes Beispiel dient der Uniswap V2 ETH/USDC-Pool.
- Der Gebuehrensatz betraegt bei Uniswap V2 standardmaessig 0.3% pro Swap.
- Risiken umfassen Slippage, Impermanent Loss und Smart-Contract-Exploits.
- Merke: Der Preis folgt der Formel, nicht dem Markt.
- Merke: Liquiditaet in einem Pool ist nicht risikofrei.
- Merke: Gebuehreneinnahmen koennen Impermanent Loss teilweise kompensieren.

# Voice Narration Script
// Titel
Willkommen zur Lektion Automated Market Maker. In dieser Einheit erklaeren
wir das Constant-Product-Modell, das die Grundlage der meisten DEXes bildet.

// Konzept
Ein Automated Market Maker, kurz AMM, ist ein Smart Contract, der
Liquiditaet fuer den Handel zwischen zwei Tokens bereitstellt. Anders als
eine klassische Boerse benoetigt ein AMM kein Orderbuch. Der Preis wird
nicht durch Angebot und Nachfrage in Form von Orders bestimmt, sondern
durch eine mathematische Kurve.

// Mechanismus
Das bekannteste Modell ist das Constant-Product-Modell. Die Formel
lautet x mal y gleich k. Dabei sind x und y die Reserven der beiden
Tokens im Pool, und k ist eine Konstante. Der Preis eines Tokens
ergibt sich aus dem Verhaeltnis y zu x. Fuehrt ein Trader einen Swap
aus, aendert sich das Verhaeltnis. Grosse Swaps bewegen den Preis
stark. Dieses Phaenomen nennt man Slippage.

// Architektur
Die Architektur eines Pools besteht aus drei Komponenten: dem
Pool-Contract, der die Reserven haelt und Swaps ausfuehrt, den
LP-Tokens, die den Anteil am Pool repraesentieren, und dem
Gebuehrenmechanismus, der einen Anteil jedes Swaps an die Liquidity
Provider auszahlt.

// Risiko
Die wichtigsten Risiken sind Slippage bei grossen Trades, Impermanent
Loss fuer Liquidity Provider und Smart-Contract-Exploits. Impermanent
Loss entsteht, wenn sich die Preise der beiden Tokens relativ
zueinander veraendern. Ein Liquidity Provider haelt am Ende mehr
vom faellenden und weniger vom steigenden Token.

// Beispiel
Als konkretes Beispiel dient der Uniswap V2 ETH/USDC-Pool. Der
Gebuehrensatz betraegt 0.3% pro Swap. Liquidity Provider erhalten
einen Anteil daran proportional zu ihrer Poolbeteiligung.

// Takeaway
Drei Kernaussagen zum Schluss: Erstens, der Preis folgt der Formel,
nicht dem Markt. Zweitens, Liquiditaet bereitzustellen ist nicht
risikofrei. Drittens, Gebuehreneinnahmen koennen Impermanent Loss
teilweise, aber nicht immer kompensieren.

# Visual Suggestions
- Diagramm der Bonding-Curve x*y=k mit markierten Punkten vor und nach einem Swap
- Systemdiagramm eines Uniswap V2 Pools: Nutzer, Pool-Contract, LP-Token, Fee-Flow
- Screenshot des Uniswap V2 ETH/USDC Pool-Dashboards mit anonymisierten Adressen
- Tabelle der Hauptrisiken: Slippage, Impermanent Loss, Smart-Contract-Exploit
- Impermanent-Loss-Chart in Abhaengigkeit von relativer Preisaenderung

# Exercise
Berechne die Preisaenderung eines ETH/USDC-Pools mit den Reserven
100 ETH und 300.000 USDC, wenn ein Trader 10 ETH gegen USDC swappt
(Gebuehren ignorieren).

# Quiz
1. Welche Formel beschreibt das Constant-Product-Modell?
   a) x + y = k
   b) x * y = k
   c) x / y = k
   d) x^2 + y^2 = k
   Correct: b

2. Was bezeichnet Impermanent Loss?
   a) Eine permanente Gebuehr des Pools
   b) Verlust durch Preisdifferenz zwischen Pool und Markt beim Abziehen der Liquiditaet
   c) Slippage bei grossen Swaps
   d) Exploit eines Smart Contracts
   Correct: b

3. Wodurch wird der Preis in einem AMM bestimmt?
   a) Durch das Orderbuch
   b) Durch den letzten Trade
   c) Durch das Verhaeltnis der Reserven
   d) Durch eine Preisabfrage bei einem Oracle
   Correct: c
