# Modul 1 — DeFi-Grundlagen

**Zielgruppe:** Absolute Einsteiger
**Geschätzte Dauer:** 60–75 Minuten
**Voraussetzungen:** Keine

---

## Modul-Überblick

Dieses Modul legt das konzeptionelle Fundament für den gesamten Kurs. Am Ende verstehst du, was DeFi tatsächlich ist (und was es nicht ist), warum es existiert, wie die zentralen Bausteine zusammenwirken und welche Risiken systematisch auftreten. Wir vermeiden Marketing-Sprache komplett und konzentrieren uns auf Mechanik und Kapitalflüsse.

**Lektionen:**
1. Was ist DeFi? Eine präzise Definition
2. Warum existiert DeFi? Die Kernprinzipien
3. Die Bausteine: Blockchains, Smart Contracts, Tokens, Wallets
4. Die DeFi-Landschaft: Kategorien und Kapitalflüsse
5. Die sieben Kernrisiken in DeFi
6. Dein erster praktischer Schritt

---

## Lektion 1.1 — Was ist DeFi? Eine präzise Definition

### Learning Objectives

After completing this lesson the learner will be able to:
- DeFi präzise definieren und von CeFi sowie traditionellem Finanzwesen abgrenzen
- Die drei technischen Eigenschaften identifizieren, die ein System "DeFi" machen
- Erkennen, warum viele Produkte, die sich "DeFi" nennen, es technisch nicht sind

### Explanation

**DeFi** (Decentralized Finance) bezeichnet Finanzanwendungen, die auf öffentlichen Blockchains laufen und über Smart Contracts ausgeführt werden — ohne einen zentralen Intermediär, der Transaktionen genehmigen, Gelder verwahren oder Nutzer ausschließen kann.

Diese Definition klingt einfach, aber jedes Wort trägt Gewicht. Um ein System als DeFi zu qualifizieren, müssen drei technische Eigenschaften gleichzeitig erfüllt sein:

**1. Non-Custodial (Nicht-verwahrend)**
Die Nutzer halten ihre Vermögenswerte selbst. Das Protokoll hat zu keinem Zeitpunkt die Fähigkeit, die Gelder der Nutzer zu bewegen, einzufrieren oder zu beschlagnahmen. Der technische Beweis dafür liegt im Smart-Contract-Code: Wenn der Code keine Funktion enthält, die einem Admin erlaubt, Nutzer-Gelder zu bewegen, existiert diese Möglichkeit nicht.

**2. Permissionless (Erlaubnisfrei)**
Jeder mit einer Wallet und Internetzugang kann das Protokoll nutzen. Es gibt kein KYC, keine Kontoeröffnung, keine geographischen Einschränkungen auf Protokollebene. Frontend-Websites können Einschränkungen haben, aber das Protokoll selbst bleibt zugänglich über direkte Smart-Contract-Interaktion.

**3. Transparent und Prüfbar**
Alle Transaktionen, Salden und Smart-Contract-Logik sind öffentlich einsehbar. Jeder kann jederzeit überprüfen, wie viel Kapital in einem Protokoll steckt, wer welche Transaktionen ausgeführt hat und wie der Code funktioniert.

**Die CeFi-Abgrenzung**

Plattformen wie Coinbase, Binance oder Kraken sind **CeFi** (Centralized Finance). Sie bieten Zugang zu Krypto-Assets, aber:
- Sie verwahren die Gelder der Kunden (Custody)
- Sie verlangen KYC und können Konten sperren
- Die internen Salden sind nicht auf der Blockchain — nur die Ein- und Auszahlungen sind sichtbar

Der Unterschied wurde 2022 dramatisch sichtbar: FTX (CeFi) konnte Kundengelder missbrauchen und kollabierte. MakerDAO, Aave und Uniswap (DeFi) funktionierten während derselben Marktverwerfungen ohne Unterbrechung weiter, weil sie keine Gelder verwahrten, die missbraucht werden konnten.

**Die "DeFi-Washing"-Problematik**

Viele Produkte vermarkten sich als DeFi, sind es aber technisch nicht. Prüfsteine:
- Gibt es einen Admin-Schlüssel, der Nutzer-Gelder bewegen kann? → Kein echtes DeFi
- Kann ein zentrales Team Nutzer sperren? → Kein echtes DeFi
- Sind die Gelder auf einer Off-Chain-Datenbank statt in einem Smart Contract? → Kein DeFi

Ein nützlicher Test: Wenn das Team verschwindet, funktioniert das Protokoll trotzdem weiter? Bei echtem DeFi: ja.

### Slide Summary

**[Slide 1] — Titel**
DeFi: Eine präzise Definition

**[Slide 2] — Was ist DeFi?**
Finanzanwendungen auf öffentlichen Blockchains, ausgeführt durch Smart Contracts, ohne zentrale Intermediäre

**[Slide 3] — Drei technische Eigenschaften**
1. Non-Custodial — Nutzer halten eigene Assets
2. Permissionless — kein KYC, kein Gatekeeping
3. Transparent — alles on-chain prüfbar

**[Slide 4] — CeFi vs. DeFi**
| Eigenschaft | CeFi | DeFi |
|---|---|---|
| Custody | Plattform | Nutzer |
| KYC | Pflicht | Nein |
| Ausführung | Datenbank | Smart Contract |
| Transparenz | Intern | Öffentlich |

**[Slide 5] — Der FTX-Moment**
FTX (CeFi) kollabierte durch Missbrauch von Kundengeldern.
MakerDAO, Aave, Uniswap (DeFi) liefen störungsfrei weiter.
Warum? Bei DeFi existiert die Möglichkeit des Missbrauchs technisch nicht.

**[Slide 6] — Prüfsteine gegen "DeFi-Washing"**
Fragen zur Echtheitsprüfung:
- Admin-Schlüssel mit Zugriff auf Nutzergelder?
- Möglichkeit zur Nutzersperrung?
- Off-Chain-Datenbank statt Smart Contract?
- Funktioniert das Protokoll ohne das Team?

### Voice Narration Script

**[Slide 1]**
Willkommen zu Modul 1. Bevor wir über Yield, Strategien oder Tools sprechen, müssen wir genau definieren, worüber wir reden. Der Begriff "DeFi" wird inflationär verwendet — wir brauchen eine saubere technische Definition.

**[Slide 2]**
DeFi — Decentralized Finance — bezeichnet Finanzanwendungen, die auf öffentlichen Blockchains laufen und über Smart Contracts ausgeführt werden, ohne zentrale Intermediäre. Jedes Wort dieser Definition trägt Gewicht. Wir zerlegen sie in drei technische Eigenschaften.

**[Slide 3]**
Erstens: Non-Custodial. Die Nutzer halten ihre Assets selbst. Das Protokoll kann Nutzergelder nicht bewegen, einfrieren oder beschlagnahmen — weil der Code diese Funktion nicht enthält. Zweitens: Permissionless. Jeder mit Wallet und Internet kann teilnehmen, kein KYC, keine Kontoeröffnung. Drittens: Transparent. Alle Transaktionen, Salden und Smart-Contract-Logik sind öffentlich einsehbar.

**[Slide 4]**
CeFi-Plattformen wie Coinbase oder Binance bieten Zugang zu Krypto, aber sie verwahren die Gelder. Sie verlangen KYC und können Konten sperren. Ihre internen Salden liegen auf privaten Datenbanken. DeFi funktioniert strukturell anders: Custody beim Nutzer, kein KYC, alles auf Smart Contracts, öffentlich prüfbar.

**[Slide 5]**
Der Unterschied wurde 2022 brutal sichtbar. FTX war CeFi. Sam Bankman-Fried konnte Kundengelder zu Alameda Research transferieren, weil FTX die Custody hatte. Die Firma kollabierte. Im selben Marktumfeld liefen MakerDAO, Aave und Uniswap ohne Unterbrechung. Warum? Weil diese Protokolle keine Gelder verwahren, die missbraucht werden könnten. Die Möglichkeit existiert technisch nicht.

**[Slide 6]**
Viele Produkte nennen sich DeFi, sind es aber nicht. Vier Prüfsteine: Existiert ein Admin-Schlüssel mit Zugriff auf Nutzergelder? Kann ein Team Nutzer sperren? Liegen Guthaben auf einer Off-Chain-Datenbank? Und der finale Test: Wenn das Team morgen verschwindet — funktioniert das Protokoll weiter? Bei echtem DeFi lautet die Antwort ja.

### Visual Suggestions

**[Slide 1]** Titelfolie mit "DeFi: Eine präzise Definition". Neutrales, dunkles Hintergrund-Design, keine Krypto-Klischees (keine Bitcoin-Symbole, keine goldenen Münzen).

**[Slide 2]** Zentrales Diagramm mit drei konzentrischen Kreisen: "Öffentliche Blockchain" (außen), "Smart Contract" (mitte), "DeFi-Anwendung" (innen). Betont den Stack.

**[Slide 3]** Drei vertikale Spalten mit je einem Icon und kurzem Text: ein Schlüssel-Icon für Non-Custodial, ein offenes Tor für Permissionless, eine Lupe für Transparent.

**[Slide 4]** Zweispaltige Vergleichstabelle CeFi ↔ DeFi. **SCREENSHOT SUGGESTION:** Screenshot der Coinbase-Login-Seite neben einem Screenshot von app.uniswap.org ohne Login-Pflicht, zur visuellen Veranschaulichung.

**[Slide 5]** Timeline November 2022: FTX-Kollaps markiert, parallel Aave-TVL-Chart der zeigt, dass Aave weiter funktionierte. **SCREENSHOT SUGGESTION:** DeFiLlama-Chart von Aave TVL über November 2022 zeigt Stabilität trotz Marktchaos.

**[Slide 6]** Flussdiagramm "Ist das echtes DeFi?" mit Entscheidungsbaum und den vier Prüffragen.

### Exercise

**Aufgabe: Klassifiziere fünf bekannte Plattformen**

Gehe die folgenden Plattformen durch und bestimme für jede: Ist das DeFi, CeFi oder ein Hybrid? Begründe jede Antwort mit mindestens einem technischen Kriterium (Custody, Permissionless, Transparenz).

1. Coinbase
2. Uniswap
3. Aave
4. Celsius (vor Kollaps)
5. MakerDAO

Erstelle eine kurze schriftliche Analyse (3–5 Sätze pro Plattform). Recherchiere bei Unklarheit auf der offiziellen Dokumentation des jeweiligen Protokolls.

**Deliverable:** Ein Textdokument mit der Klassifizierung und Begründung für jede Plattform.

### Quiz

**Frage 1:** Welche drei technischen Eigenschaften muss ein System erfüllen, um als DeFi zu gelten?

<details>
<summary>Antwort anzeigen</summary>

Non-Custodial (Nutzer halten eigene Assets), Permissionless (kein KYC/Gatekeeping), Transparent und prüfbar (alle Transaktionen und Code sind öffentlich einsehbar).
</details>

**Frage 2:** Warum funktionierten Aave und Uniswap während des FTX-Kollapses weiter, obwohl der gesamte Kryptomarkt unter Druck stand?

<details>
<summary>Antwort anzeigen</summary>

Weil diese Protokolle non-custodial sind. Sie verwahren keine Nutzergelder, sondern die Gelder liegen in Smart Contracts, auf die kein zentrales Team Zugriff hat. Die Möglichkeit des Missbrauchs, die FTX nutzte, existiert technisch nicht. Nutzer können jederzeit mit dem Protokoll interagieren, auch wenn das ursprüngliche Entwicklerteam verschwinden würde.
</details>

---

## Lektion 1.2 — Warum existiert DeFi? Die Kernprinzipien

### Learning Objectives

After completing this lesson the learner will be able to:
- Die fundamentalen Probleme erklären, die DeFi zu lösen versucht
- Die vier Kernprinzipien identifizieren, die DeFi-Protokolle antreiben
- Verstehen, warum Komponierbarkeit der wichtigste Vorteil von DeFi ist

### Explanation

DeFi ist keine Technologie, die aus dem Nichts entstand. Es ist eine direkte Reaktion auf strukturelle Einschränkungen des traditionellen Finanzwesens. Um DeFi zu verstehen, musst du verstehen, welche Probleme es löst.

**Problem 1: Gatekeeping**
Traditionelle Finanzdienstleistungen erfordern institutionellen Zugang. Einen Kredit aufnehmen, einen Markt handeln, Liquidität bereitstellen — alles erfordert Beziehungen zu Banken, Brokerhäusern oder Market Makern. Schätzungsweise 1,4 Milliarden Erwachsene weltweit haben kein Bankkonto. In DeFi reicht eine Wallet.

**Problem 2: Settlement-Zeiten**
Eine Banküberweisung dauert 1–3 Werktage. Ein Aktienkauf settelt T+2. Eine internationale Überweisung kann eine Woche benötigen. In DeFi settelt jede Transaktion in 12 Sekunden (Ethereum-Block) bis wenige Minuten (andere Chains), 24 Stunden am Tag, inklusive Wochenenden und Feiertage.

**Problem 3: Intransparenz**
Du weißt nicht, was deine Bank mit deinen Einlagen macht. Du weißt nicht, wie ein Hedgefonds positioniert ist. Du weißt nicht, warum ein Marktmacher einen bestimmten Preis stellt. In DeFi ist jeder Kapitalfluss, jede Position, jede Gebühr öffentlich.

**Problem 4: Komposition und Innovation**
Ein traditioneller Broker kann nicht einfach auf dem Kreditsystem einer Bank aufbauen. APIs sind beschränkt, Verträge sind proprietär, Daten sind geschlossen. In DeFi können beliebige Protokolle aufeinander aufbauen — **Komponierbarkeit** ist der wichtigste strukturelle Vorteil.

**Die vier Kernprinzipien**

**1. Self-Custody (Selbstverwahrung)**
Jeder Nutzer kontrolliert seine eigenen Assets via Private Keys. Das überträgt auch die Verantwortung für Sicherheit komplett auf den Nutzer — ein Punkt, den wir in Modul 2 vertiefen.

**2. Permissionless Innovation (Erlaubnisfreie Innovation)**
Jeder kann ein neues Protokoll deployen, ohne regulatorische Zulassung. Das führt zu schneller Innovation, aber auch zu schnellem Betrug. Filterung ist die Aufgabe des Nutzers.

**3. Transparenz**
Alles ist on-chain verifizierbar. Tools wie Etherscan, DeFiLlama und Dune Analytics verwandeln diese Transparenz in nutzbare Information.

**4. Komponierbarkeit ("Money Legos")**
Protokolle können andere Protokolle als Bausteine verwenden. Ein Beispiel: Du kannst ETH auf Lido staken (Protokoll 1) → das erhaltene stETH als Sicherheit auf Aave nutzen (Protokoll 2) → den Kredit auf Curve swappen (Protokoll 3) → auf Convex einsetzen (Protokoll 4). Diese Verkettung ist in CeFi undenkbar. In DeFi ist sie eine Transaktion.

**Warum Komponierbarkeit der entscheidende Vorteil ist**

Komponierbarkeit ist mehr als Bequemlichkeit. Sie verändert fundamental, wie Innovation entsteht. Ein neues Protokoll muss nicht das gesamte Finanz-Ökosystem neu bauen — es kann auf bestehenden Bausteinen aufbauen. Das führt zu Entwicklungszyklen, die in traditionellem Finanzwesen unmöglich sind. Es führt aber auch zu **Komponierbarkeits-Risiko**: Wenn ein Protokoll tief im Stack bricht, können alle darauf aufbauenden Protokolle betroffen sein. Das behandeln wir in Modul 11.

### Slide Summary

**[Slide 1] — Titel**
Warum existiert DeFi? Die Kernprinzipien

**[Slide 2] — Die vier strukturellen Probleme**
1. Gatekeeping — institutioneller Zugang erforderlich
2. Settlement-Zeiten — Tage statt Sekunden
3. Intransparenz — private Datenbanken
4. Geschlossene Systeme — keine Komposition

**[Slide 3] — Die vier Kernprinzipien**
1. Self-Custody
2. Permissionless Innovation
3. Transparenz
4. Komponierbarkeit

**[Slide 4] — Komponierbarkeit am Beispiel**
ETH → Lido (stake) → stETH
stETH → Aave (sichern) → Kredit
Kredit → Curve (swappen)
Curve-LP → Convex (boosten)
Eine Transaktion. Vier Protokolle.

**[Slide 5] — Die Kehrseite der Komponierbarkeit**
Je tiefer ein Baustein im Stack, desto größer die systemische Wirkung bei Bruch.
Komponierbarkeits-Risiko ist ein zentrales DeFi-Risiko.

**[Slide 6] — Zusammenfassung**
DeFi ist nicht Krypto-Hype — es ist eine technische Antwort auf strukturelle Einschränkungen des Finanzwesens. Die Kosten sind neue Risiken, die wir systematisch verstehen müssen.

### Voice Narration Script

**[Slide 1]**
In Lektion 1 haben wir definiert, was DeFi ist. Jetzt fragen wir: warum existiert es? Welche Probleme löst es — und was sind die Kernprinzipien, die seine Struktur erklären?

**[Slide 2]**
Vier strukturelle Probleme treiben DeFi an. Erstens: Gatekeeping. 1,4 Milliarden Erwachsene haben kein Bankkonto. Traditionelle Finanzdienste erfordern institutionellen Zugang — Beziehungen zu Banken, Brokern, Market Makern. Zweitens: Settlement-Zeiten. Banküberweisungen dauern Tage, Aktien settlen T+2. DeFi settelt in Sekunden, rund um die Uhr. Drittens: Intransparenz. Du weißt nicht, was deine Bank mit deinen Einlagen macht. Viertens: geschlossene Systeme. Protokolle können nicht einfach aufeinander aufbauen.

**[Slide 3]**
Daraus ergeben sich vier Kernprinzipien. Self-Custody: du kontrollierst deine Assets über Private Keys. Permissionless Innovation: jeder kann Protokolle bauen, ohne Lizenz. Transparenz: alles ist on-chain prüfbar. Und das vielleicht wichtigste: Komponierbarkeit.

**[Slide 4]**
Komponierbarkeit bedeutet, dass Protokolle andere Protokolle als Bausteine nutzen können. Ein Beispiel: Ich staked ETH auf Lido und erhalte stETH. Dieses stETH nutze ich als Sicherheit auf Aave und leihe mir USDC. Das USDC swappe ich auf Curve gegen DAI. Das DAI stecke ich als LP-Position zurück in eine Curve-Pool und boosted die Position auf Convex. Vier Protokolle, eine einzige Transaktion. In traditionellem Finanzwesen undenkbar.

**[Slide 5]**
Aber Komponierbarkeit hat eine Kehrseite. Je tiefer ein Baustein im Stack liegt, desto größer ist die systemische Wirkung, wenn er bricht. Wenn Lido depeggt, betrifft das jede Position, die stETH verwendet. Das ist Komponierbarkeits-Risiko — ein zentrales DeFi-Risiko, das wir systematisch in Modul 11 behandeln.

**[Slide 6]**
Zusammengefasst: DeFi ist keine Krypto-Marketingkampagne. Es ist eine technische Antwort auf strukturelle Probleme des bestehenden Finanzsystems. Aber jede Lösung bringt neue Risiken. Diese Risiken zu verstehen — das ist das eigentliche Ziel dieses Kurses.

### Visual Suggestions

**[Slide 1]** Titelfolie, konsistentes Design mit Lektion 1.1.

**[Slide 2]** Vier-Quadranten-Layout. Jeder Quadrant zeigt eines der strukturellen Probleme mit einem illustrativen Icon (Tor für Gatekeeping, Uhr für Settlement, verschlossener Tresor für Intransparenz, isolierte Inseln für geschlossene Systeme).

**[Slide 3]** Vier horizontale Balken mit je einem Prinzip. Visueller Fokus auf "Komponierbarkeit" als wichtigster.

**[Slide 4]** Animiertes Flussdiagramm: ETH-Icon → Lido-Logo → stETH-Icon → Aave-Logo → USDC-Icon → Curve-Logo → DAI-Icon → Convex-Logo. Jeder Pfeil zeigt einen Protokoll-Hop. Unten eine einzige Transaktions-Hash-Zeile. **SCREENSHOT SUGGESTION:** Screenshot einer realen DeFi-Zap-Transaktion auf Etherscan, die mehrere Protokolle in einem Call durchläuft (z.B. über Zapper oder 1inch).

**[Slide 5]** Jenga-Turm-Metapher: Wenn ein unterer Block entfernt wird, fällt der ganze Turm. Daneben ein reales Beispiel (Text-only): "Juni 2022: stETH-Depeg → Liquidationen in 10+ Protokollen".

**[Slide 6]** Konsolidierende Textfolie mit den Kernaussagen.

### Exercise

**Aufgabe: Verfolge eine reale komponierte Transaktion**

Gehe auf zapper.xyz oder debank.com und finde die Portfolio-Übersicht einer bekannten DeFi-Wallet (z.B. "vitalik.eth"). Identifiziere **drei Positionen**, die Komponierbarkeit demonstrieren — also Positionen, die mehrere Protokolle kombinieren.

Beispiel: Eine stETH-Position auf Aave kombiniert zwei Protokolle (Lido + Aave).

**Deliverable:** Liste von drei komponierten Positionen mit den beteiligten Protokollen und einer kurzen Erklärung, was die Komposition erreicht.

### Quiz

**Frage 1:** Was bedeutet "Komponierbarkeit" in DeFi, und warum ist sie strukturell so mächtig?

<details>
<summary>Antwort anzeigen</summary>

Komponierbarkeit bedeutet, dass DeFi-Protokolle andere Protokolle als Bausteine verwenden können, weil alle auf denselben öffentlichen Smart-Contract-Standards laufen. Sie ist strukturell mächtig, weil neue Protokolle nicht das gesamte Finanz-Ökosystem neu bauen müssen — sie nutzen bestehende Bausteine. Das führt zu Innovationszyklen, die in traditionellem Finanzwesen unmöglich sind, weil dort APIs beschränkt und Systeme proprietär sind.
</details>

**Frage 2:** Was ist die Kehrseite der Komponierbarkeit, und welches Risiko entsteht dadurch?

<details>
<summary>Antwort anzeigen</summary>

Komponierbarkeits-Risiko: Je tiefer ein Baustein im Stack liegt, desto größer ist die systemische Wirkung, wenn er bricht. Wenn ein basales Protokoll (z.B. ein Stablecoin oder ein Liquid-Staking-Token) depeggt oder gehackt wird, können alle darauf aufbauenden Protokolle betroffen sein. Ein Beispiel wäre der stETH-Depeg im Juni 2022, der Liquidationen in mehreren darauf aufbauenden Protokollen auslöste.
</details>

---

## Lektion 1.3 — Die Bausteine: Blockchains, Smart Contracts, Tokens, Wallets

### Learning Objectives

After completing this lesson the learner will be able to:
- Die vier grundlegenden Bausteine von DeFi benennen und ihre Funktion erklären
- Verstehen, wie Smart Contracts Geld ohne Intermediäre bewegen
- Die Rolle von Tokens als Abstraktion für unterschiedliche Vermögenswerte einordnen

### Explanation

DeFi läuft auf vier technischen Grundpfeilern. Wer diese vier Bausteine versteht, kann jedes DeFi-Protokoll konzeptionell einordnen.

**Baustein 1: Die Blockchain**

Eine Blockchain ist ein öffentliches, verteiltes Ledger. Stell es dir als eine globale Datenbank vor, die auf tausenden Computern gleichzeitig läuft und bei der alle Kopien synchronisiert bleiben. Neue Einträge (Transaktionen) werden in Blöcke gepackt und an die bestehende Kette angehängt — daher der Name. Änderungen an vergangenen Blöcken sind praktisch unmöglich, weil das erfordern würde, alle kryptographischen Hashes seither neu zu berechnen und eine Mehrheit der Netzwerk-Teilnehmer davon zu überzeugen.

**Ethereum** ist die dominante Blockchain für DeFi. Sie ist nicht die einzige — Solana, Arbitrum, Base, Optimism und andere sind bedeutend — aber Ethereum hat die größte DeFi-Liquidität und setzt die Standards. In diesem Kurs fokussieren wir primär auf EVM-basierte Chains (Ethereum und kompatible Netzwerke).

**Baustein 2: Smart Contracts**

Ein Smart Contract ist ein Programm, das auf der Blockchain läuft. Der Code wird einmal bereitgestellt (deployed) und läuft dann deterministisch: gleicher Input → gleicher Output, immer. Niemand kann den Code ändern, sobald er deployed ist (außer er enthält gezielt eingebaute Upgrade-Mechanismen — mehr dazu in Modul 11).

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

### Slide Summary

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

### Voice Narration Script

**[Slide 1]**
DeFi läuft auf vier Bausteinen. Wer diese vier versteht, kann jedes Protokoll konzeptionell einordnen. Wir gehen sie einzeln durch.

**[Slide 2]**
Die Blockchain ist ein öffentliches, verteiltes Ledger. Eine globale Datenbank, die auf tausenden Computern gleichzeitig läuft, alle synchron. Transaktionen werden in Blöcke gepackt und an die bestehende Kette angehängt. Vergangene Blöcke zu ändern ist praktisch unmöglich. Ethereum ist die dominante DeFi-Blockchain — nicht die einzige, aber mit der größten Liquidität und den Standards, an denen sich andere orientieren.

**[Slide 3]**
Smart Contracts sind Programme auf der Blockchain. Deployed, deterministisch, unveränderlich. Ein Beispiel: ein DEX-Contract mit einer swap-Funktion. Du rufst swap-ETH-für-USDC auf, der Contract berechnet den Kurs, nimmt deine ETH und sendet USDC zurück. Alles atomar in einer Transaktion. Kein Intermediär. Der Code ist der Markt.

**[Slide 4]**
Tokens sind Einheiten innerhalb eines Smart Contracts. Der wichtigste Standard ist ERC-20. Er definiert die Funktionen, die jeder Token bereitstellen muss. Weil alle ERC-20-Tokens dieselbe Schnittstelle teilen, kann jedes Protokoll mit jedem Token umgehen. Tokens repräsentieren alles: Stablecoins, Governance-Rechte, Lending-Positionen, Liquiditätsanteile. Wichtig: ein Token ist keine Währung im klassischen Sinn, sondern eine kryptographisch abgesicherte Eintragung, deren Bedeutung vom zugrundeliegenden Contract definiert wird.

**[Slide 5]**
Die Wallet ist dein Interface zur Blockchain. Technisch verwaltet sie einen Private Key — eine große zufällige Zahl. Aus diesem Key wird deine Adresse abgeleitet. Die Wallet hält keine Tokens — Tokens liegen in den Token-Contracts, die nur verzeichnen, welche Adresse wie viel hält. Deine Wallet besitzt nur den Schlüssel, der Autorität über die Adresse gibt. Bekannte Wallets: MetaMask, Rabby — beide Software. Ledger und Trezor — Hardware-Wallets. Safe — für Multisig-Setups. Wallet-Sicherheit behandeln wir in Modul 2.

**[Slide 6]**
Zusammenspiel: deine Wallet signiert eine Transaktion. Sie geht an die Blockchain. Validatoren führen den Smart-Contract-Code aus und aktualisieren das globale Ledger. Token-Balancen werden angepasst. Alles öffentlich einsehbar. Kein Mensch hat entschieden — der Code hat ausgeführt. Das ist DeFi im Kern.

### Visual Suggestions

**[Slide 1]** Titelfolie.

**[Slide 2]** Blockchain als Kette von Blöcken, visuell vereinfacht. Jeder Block enthält "Tx 1, Tx 2, Tx 3...". **SCREENSHOT SUGGESTION:** Screenshot eines realen Ethereum-Blocks auf etherscan.io/block/[aktuelle Nummer], zeigt Liste von Transaktionen.

**[Slide 3]** Vereinfachter Code-Ausschnitt einer `swap`-Funktion daneben ein Flussdiagramm mit Token-In/Token-Out.

**[Slide 4]** Liste verschiedener Token-Typen mit jeweiligem Logo/Icon: USDC, DAI, ETH, AAVE, UNI, stETH, aUSDC.

**[Slide 5]** Diagramm: Private Key → Public Address → Signaturprozess. **SCREENSHOT SUGGESTION:** Screenshot eines MetaMask-Fensters mit Adresse und Balance-Übersicht.

**[Slide 6]** Vereinfachtes End-to-End-Flussdiagramm der fünf Schritte einer Transaktion.

### Exercise

**Aufgabe: Zerlege einen realen DeFi-Vorgang**

Öffne app.uniswap.org und simuliere (nicht ausführen!) einen Swap von 0,1 ETH zu USDC. Identifiziere vor dem Klicken auf "Swap":
1. Welcher Smart Contract wird aufgerufen? (Findest du im Transaktionsdetail, bevor du bestätigst, oder via etherscan.io unter "Uniswap Router")
2. Welche Tokens sind beteiligt (mit Contract-Adressen)?
3. Welche Wallet signiert die Transaktion?
4. Welche Blockchain führt die Transaktion aus?

**Deliverable:** Notiz mit den vier Antworten und den Contract-Adressen.

### Quiz

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

---

## Lektion 1.4 — Die DeFi-Landschaft: Kategorien und Kapitalflüsse

### Learning Objectives

After completing this lesson the learner will be able to:
- Die sechs Hauptkategorien von DeFi-Protokollen benennen und ihre Funktion erklären
- Verfolgen, wie Kapital durch diese Kategorien fließt
- Tools wie DeFiLlama nutzen, um die Größe und Relevanz verschiedener Protokolle einzuschätzen

### Explanation

DeFi besteht aus Hunderten von Protokollen. Um nicht in Details zu ertrinken, brauchst du eine Kategorisierung. Diese Lektion gibt dir die mentale Landkarte.

**Kategorie 1: Dezentrale Exchanges (DEXs)**

DEXs ermöglichen Token-Swaps ohne zentrale Order Books oder Market Maker. Die dominanten Modelle sind **Automated Market Makers (AMMs)**, wo Liquiditätsanbieter Kapital in Pools einzahlen und Swapper gegen diese Pools handeln. Der Preis wird algorithmisch durch eine Formel bestimmt, nicht durch Orderabgleich.

Wichtige Protokolle: Uniswap (führend), Curve (für Stablecoins und Pegged Assets), Balancer, SushiSwap. DEXs behandeln wir vertieft in Modul 4.

**Kategorie 2: Lending- und Borrowing-Protokolle**

Kapital kann in diese Protokolle eingezahlt werden, um Zinsen zu verdienen. Andere Nutzer können gegen hinterlegte Sicherheiten Kredite aufnehmen. Die Zinssätze werden algorithmisch basierend auf Angebot und Nachfrage bestimmt.

Wichtige Protokolle: Aave (größtes Lending-Protokoll), Compound, Morpho, Spark. Wir behandeln Lending in Modul 6 und Liquidationen in Modul 7.

**Kategorie 3: Stablecoins**

Stablecoins sind Tokens, die einen Peg zu einem externen Asset halten — meistens dem US-Dollar. Es gibt drei Haupttypen:
- **Fiat-besichert** (USDC, USDT): gedeckt durch echte Dollar-Reserven bei einem Emittenten
- **Krypto-besichert** (DAI, crvUSD): gedeckt durch On-Chain-Sicherheiten in Smart Contracts
- **Algorithmisch** (historisch UST, FRAX-Varianten): durch Algorithmen stabilisiert, oft fragil

Stablecoins sind das Rückgrat vieler DeFi-Operationen. Modul 8 behandelt sie vertieft.

**Kategorie 4: Liquid Staking**

Ethereum-Staking erfordert 32 ETH und Sperre des Kapitals. Liquid-Staking-Protokolle erlauben Staking kleinerer Beträge und geben im Gegenzug einen Token (z.B. stETH von Lido), der weiterhin in DeFi verwendet werden kann. Dadurch entsteht ein zweiter Yield-Stream.

Wichtige Protokolle: Lido (größtes), Rocket Pool, Frax Ether.

**Kategorie 5: Derivate und Perpetuals**

Dezentrale Perpetual-Exchanges erlauben gehebelten Handel auf Tokens ohne Ablauf. Sie funktionieren über Funding-Rate-Mechanismen, die den Preis am Spot-Kurs verankern.

Wichtige Protokolle: GMX, dYdX, Hyperliquid, Synthetix. Derivate liegen außerhalb des Kernfokus dieses Kurses, werden aber bei Bedarf gestreift.

**Kategorie 6: Yield-Aggregatoren und Strukturierte Produkte**

Diese Protokolle kombinieren die anderen Bausteine zu fertigen Strategien. Ein Yield-Aggregator zahlt automatisch in die ertragreichsten Pools ein und rebalanciert. Strukturierte Produkte bauen komplexere Auszahlungsprofile (z.B. Ribbon Finance mit Options-Vaults).

Wichtige Protokolle: Yearn, Pendle (Yield-Trading), Convex (Curve-Boosting).

**Kapitalflüsse: Wie Kapital durch DeFi zirkuliert**

Ein typischer Kapitalfluss könnte sein:

```
USD bei Bank
    ↓ (Kauf an CEX)
USDC in CEX
    ↓ (Withdrawal zur Wallet)
USDC in Wallet
    ↓ (Einzahlung in Aave)
aUSDC (verzinslich)
    ↓ (als Sicherheit nutzen)
Borrow von ETH gegen aUSDC
    ↓ (ETH staken über Lido)
stETH
    ↓ (als LP in Curve)
LP-Token + stETH-Rewards + Trading-Fees
    ↓ (LP-Token auf Convex einsetzen)
CVX-Rewards zusätzlich
```

Jeder Pfeil ist eine Transaktion. Jede Station ist ein Protokoll. Das Kapital zirkuliert — aber mit jedem Hop akkumulieren sich Risiken.

**Tools zur Navigation**

- **DeFiLlama (defillama.com)**: Zeigt TVL (Total Value Locked) pro Protokoll und Chain. Das wichtigste Tool, um Größenverhältnisse zu verstehen.
- **DeBank (debank.com)**: Portfolio-Tracker für eigene und fremde Wallets.
- **Dune Analytics (dune.com)**: Custom-Dashboards für spezifische Metriken.

### Slide Summary

**[Slide 1] — Titel**
Die DeFi-Landschaft

**[Slide 2] — Sechs Hauptkategorien**
1. DEXs (Swaps)
2. Lending & Borrowing
3. Stablecoins
4. Liquid Staking
5. Derivate/Perpetuals
6. Yield-Aggregatoren

**[Slide 3] — DEXs**
Token-Swaps ohne Order Book. AMMs mit Liquiditätspools.
Marktführer: Uniswap, Curve.

**[Slide 4] — Lending & Borrowing**
Kapital einzahlen → Zinsen verdienen. Sicherheiten hinterlegen → Kredite aufnehmen.
Marktführer: Aave, Compound, Morpho.

**[Slide 5] — Stablecoins**
Tokens mit Peg zu externem Asset (meist USD).
Drei Typen: Fiat-besichert, Krypto-besichert, algorithmisch.

**[Slide 6] — Beispielhafter Kapitalfluss**
USD → USDC → Aave → Borrow ETH → Lido stETH → Curve LP → Convex.
Sechs Stationen. Sechs Risikoquellen.

**[Slide 7] — Navigations-Tools**
- DeFiLlama: TVL-Landschaft
- DeBank: Wallet-Portfolios
- Dune Analytics: Custom-Metriken

### Voice Narration Script

**[Slide 1]**
DeFi besteht aus Hunderten Protokollen. Du brauchst eine mentale Landkarte, um nicht in Details zu ertrinken. Diese Lektion teilt die Landschaft in sechs Kategorien.

**[Slide 2]**
Die sechs Hauptkategorien: DEXs für Swaps. Lending- und Borrowing-Protokolle. Stablecoins. Liquid Staking. Derivate und Perpetuals. Yield-Aggregatoren und strukturierte Produkte. Jede Kategorie bekommt später ein eigenes Modul oder Abschnitt.

**[Slide 3]**
DEXs — dezentrale Exchanges. Sie ermöglichen Token-Swaps ohne zentrale Order Books. Das dominante Modell sind Automated Market Makers, bei denen Liquiditätsanbieter Kapital in Pools einzahlen und Swapper gegen diese Pools handeln. Der Preis wird durch eine mathematische Formel bestimmt, nicht durch Orderabgleich. Marktführer sind Uniswap für Volatile und Curve für Stablecoin-nahe Assets.

**[Slide 4]**
Lending- und Borrowing-Protokolle. Einzahler bekommen Zinsen. Kreditnehmer hinterlegen Sicherheiten und nehmen andere Assets auf. Der Zinssatz wird algorithmisch aus Angebot und Nachfrage bestimmt. Aave ist das größte dieser Protokolle. Wir gehen in Modul 6 tief hinein.

**[Slide 5]**
Stablecoins halten einen Peg zu einem externen Asset, meistens dem US-Dollar. Drei Typen: fiat-besichert wie USDC und USDT, gedeckt durch echte Dollars. Krypto-besichert wie DAI, gedeckt durch On-Chain-Sicherheiten. Algorithmisch — historisch oft fragil, wie der UST-Kollaps 2022 zeigte.

**[Slide 6]**
Ein beispielhafter Kapitalfluss zeigt, wie komponierbar DeFi ist. Dollar wird bei einer CEX zu USDC. USDC geht in die Wallet. Von dort in Aave als Lending-Position. Gegen diese Position wird ETH geborgt. Das ETH wird über Lido gestaked — stETH. Das stETH geht in eine Curve-Pool als Liquidität. Der LP-Token wird auf Convex eingesetzt für zusätzliche Rewards. Sechs Stationen, sechs Protokolle, sechs Risikoquellen. Deine Position ist nicht mehr "auf Aave" — sie ist im Zusammenspiel aller sechs.

**[Slide 7]**
Drei Tools zur Navigation. DeFiLlama zeigt dir, wie viel Kapital in jedem Protokoll und jeder Chain liegt — der TVL. DeBank erlaubt dir, eigene oder fremde Wallets als Portfolio zu betrachten. Dune Analytics bietet Custom-Dashboards für alles, was du on-chain messen willst. Diese drei Tools werden dich den ganzen Kurs begleiten.

### Visual Suggestions

**[Slide 1]** Titelfolie.

**[Slide 2]** Sechs Kacheln, jede mit Kategorie-Name und Icon. Visuell übersichtlich.

**[Slide 3]** **SCREENSHOT SUGGESTION:** Uniswap-Interface mit Swap-Ansicht. Daneben vereinfachtes AMM-Diagramm.

**[Slide 4]** **SCREENSHOT SUGGESTION:** Aave-Markets-Übersicht, die Supply-APY und Borrow-APY für verschiedene Assets zeigt.

**[Slide 5]** Drei-Spalten-Vergleich der Stablecoin-Typen mit jeweiligen Logos (USDC, DAI, frühere UST mit "failed"-Kennzeichnung).

**[Slide 6]** Vollständiger Kapitalfluss als Flussdiagramm mit allen sechs Protokoll-Logos und Asset-Icons.

**[Slide 7]** **SCREENSHOT SUGGESTION:** DeFiLlama-Homepage mit TVL-Ranking. Kurzer Überblick über DeBank und Dune.

### Exercise

**Aufgabe: DeFi-Landkarte selbst erstellen**

Gehe auf defillama.com. Wähle die Top-10-Protokolle nach TVL. Ordne jedes der sechs Kategorien zu (einige fallen in mehrere Kategorien). Notiere für jedes Protokoll:
1. Name
2. Kategorie(n)
3. Aktueller TVL
4. Dominante Chain (wo liegt das meiste Kapital)

**Deliverable:** Tabelle mit 10 Zeilen, als Excel oder Notion-Tabelle.

### Quiz

**Frage 1:** Nenne die sechs Hauptkategorien von DeFi-Protokollen und je ein Beispiel.

<details>
<summary>Antwort anzeigen</summary>

1. DEXs (z.B. Uniswap), 2. Lending & Borrowing (z.B. Aave), 3. Stablecoins (z.B. USDC oder DAI), 4. Liquid Staking (z.B. Lido), 5. Derivate/Perpetuals (z.B. GMX oder dYdX), 6. Yield-Aggregatoren (z.B. Yearn oder Convex).
</details>

**Frage 2:** Warum ist der TVL (Total Value Locked) eine wichtige, aber unvollständige Metrik?

<details>
<summary>Antwort anzeigen</summary>

TVL zeigt, wie viel Kapital in einem Protokoll hinterlegt ist, was ein Indikator für Vertrauen und Nutzung ist. Aber TVL ist unvollständig: Er kann durch wenige Wale dominiert sein, kann durch recycelte Deposits aufgebläht werden (wenn das gleiche Kapital durch mehrere Protokolle gezählt wird), und er sagt nichts über Profitabilität oder Risiko aus. Ein hoher TVL ist kein Garant für Sicherheit — mehrere Hacks trafen hoch-TVL-Protokolle.
</details>

---

## Lektion 1.5 — Die sieben Kernrisiken in DeFi

### Learning Objectives

After completing this lesson the learner will be able to:
- Die sieben Kernrisiken in DeFi identifizieren und voneinander abgrenzen
- Verstehen, wie sich diese Risiken in der Praxis manifestieren
- Eine erste Risikobewertung für eine beliebige DeFi-Position durchführen

### Explanation

Die größte Gefahr in DeFi ist nicht, ein Risiko einzugehen — sondern ein Risiko einzugehen, das du nicht kennst. Wir gehen jetzt systematisch durch die sieben Kernrisiken. Jedes wird in späteren Modulen vertieft; hier bekommst du den Überblick.

**Risiko 1: Smart-Contract-Risiko**

Ein Fehler im Code eines Smart Contracts kann Kapital zerstören oder einen Exploit ermöglichen. Smart Contracts sind unveränderlich — wenn ein Bug entdeckt wird, kann der Code (ohne Upgrade-Mechanismus) nicht gefixt werden. Hacks wie der Ronin-Bridge-Hack (2022, 625 Mio. USD) oder der Poly-Network-Hack (2021, 611 Mio. USD) zeigen die Größenordnung.

Mitigation: Bevorzuge Protokolle mit mehreren unabhängigen Audits, langer Live-History und transparenten Bug-Bounties.

**Risiko 2: Oracle-Risiko**

Viele Protokolle brauchen externe Preisdaten (z.B. für Liquidationen). Diese Daten liefern **Oracles** — Systeme, die Preise von externen Märkten on-chain bringen. Wenn ein Oracle manipuliert oder fehlerhaft ist, kann das Protokoll in den falschen Zustand gebracht werden. Klassisches Beispiel: Flashloan-Angriffe auf Protokolle mit dünnen Oracle-Preisen.

Mitigation: Bevorzuge Protokolle, die robuste Oracles wie Chainlink mit mehreren Preisquellen verwenden.

**Risiko 3: Liquidationsrisiko**

Wenn du einen Kredit mit Sicherheiten aufgenommen hast und der Wert der Sicherheiten fällt, kannst du liquidiert werden — deine Sicherheiten werden unter Abschlag verkauft, um den Kredit zu decken. Bei volatilen Märkten können Liquidationen schnell eskalieren.

Mitigation: Arbeite mit konservativen Loan-to-Value-Ratios. Behandeln wir tief in Modul 7.

**Risiko 4: Depeg-Risiko (Stablecoins und Pegged Assets)**

Stablecoins sollen einen Peg halten. Wenn sie ihn verlieren, bist du als Halter oder LP direkt betroffen. USDC depeggte kurz im März 2023 (SVB-Krise). UST kollabierte komplett im Mai 2022. stETH depeggte temporär im Juni 2022.

Mitigation: Diversifikation über verschiedene Stablecoin-Typen. Depegs treten oft schnell auf; frühe Exits sind entscheidend.

**Risiko 5: Rug Pull / Exit Scam**

Ein Team startet ein Protokoll, zieht Kapital an und flüchtet mit den Geldern. Das geschieht vorwiegend bei kleineren, nicht-auditierten Protokollen. Varianten: "Soft Rugs" über schleichende Admin-Privilegien, "Hard Rugs" über direkte Funktion zum Abzug.

Mitigation: Nur etablierte Protokolle mit verifiziertem Team und öffentlicher Governance nutzen.

**Risiko 6: Komponierbarkeits-Risiko**

In Lektion 1.2 eingeführt: Wenn ein tief liegendes Protokoll bricht, können darauf aufbauende Positionen kaskadieren. Ein Liquid-Staking-Token-Depeg kann Lending-Positionen liquidieren, die wiederum LP-Positionen beeinträchtigen.

Mitigation: Stack-Tiefe deiner Positionen bewusst begrenzen. Behandeln wir in Modul 11.

**Risiko 7: Betreiber-Risiko (Nutzer-Fehler)**

Falsche Adresse, falsche Chain, falsche Signatur, kompromittierter Seed — der Nutzer selbst ist oft die Schwachstelle. Schätzungen besagen, dass mehr Kapital durch Nutzer-Fehler verloren geht als durch Protokoll-Hacks.

Mitigation: Hardware-Wallets, Multisig-Setups, Test-Transaktionen mit kleinen Beträgen. Modul 2 komplett.

**Die Risiko-Matrix**

Jede DeFi-Position hat ein Profil aus diesen sieben Risiken. Eine einfache Lending-Position auf Aave hat primär Smart-Contract-, Oracle-, Liquidations- und Betreiber-Risiko. Eine gehebelte Liquid-Staking-Loop-Position auf Aave mit stETH hat alle sieben Risiken gleichzeitig — weil sie vier Protokolle verkettet (Lido → Aave → Borrow ETH → Re-Stake → Loop).

Dein Job als DeFi-Nutzer ist nicht, Risiken zu vermeiden — sondern sie bewusst einzugehen und zu bepreisen.

### Slide Summary

**[Slide 1] — Titel**
Die sieben Kernrisiken in DeFi

**[Slide 2] — Risiko 1: Smart Contract**
Bugs im Code → Kapitalverlust.
Beispiele: Ronin (625M), Poly Network (611M).

**[Slide 3] — Risiko 2: Oracle**
Manipulierte/fehlerhafte Preisdaten → falsche Protokoll-Zustände.
Typische Vektor: Flashloan-Angriffe.

**[Slide 4] — Risiko 3: Liquidation**
Sicherheitenwert fällt → Zwangsverkauf unter Abschlag.
Konservative LTV halten.

**[Slide 5] — Risiko 4: Depeg**
Stablecoin/Pegged Asset verliert Peg.
Historie: USDC (März 2023), UST (Mai 2022), stETH (Juni 2022).

**[Slide 6] — Risiko 5: Rug Pull**
Team flüchtet mit Kapital.
Primär bei kleinen, nicht-auditierten Protokollen.

**[Slide 7] — Risiko 6: Komponierbarkeit**
Ein Baustein bricht → Kaskade durch den Stack.
Stack-Tiefe bewusst begrenzen.

**[Slide 8] — Risiko 7: Betreiber-Fehler**
Falsche Adresse, falsche Chain, kompromittierter Seed.
Oft größter Kapitalverlust-Grund.

**[Slide 9] — Risiko-Matrix**
Jede Position hat ein Risikoprofil.
Ziel: Risiken erkennen, nicht vermeiden.

### Voice Narration Script

**[Slide 1]**
Die größte Gefahr in DeFi ist nicht, ein Risiko einzugehen — sondern ein Risiko einzugehen, das du nicht kennst. Wir gehen systematisch durch die sieben Kernrisiken.

**[Slide 2]**
Risiko 1: Smart-Contract-Risiko. Ein Bug im Code kann Kapital zerstören oder einen Exploit ermöglichen. Smart Contracts sind unveränderlich — wenn der Bug entdeckt ist, ist es oft zu spät. Ronin-Bridge 2022, 625 Millionen Dollar. Poly Network 2021, 611 Millionen. Mitigation: Bevorzuge Protokolle mit mehreren unabhängigen Audits und langer Live-History.

**[Slide 3]**
Risiko 2: Oracle-Risiko. Viele Protokolle brauchen externe Preisdaten für Liquidationen und Kursberechnungen. Oracles liefern diese Daten on-chain. Wenn ein Oracle manipuliert werden kann, kann das ganze Protokoll in falsche Zustände gebracht werden. Der typische Vektor sind Flashloan-Angriffe auf dünne Preisquellen.

**[Slide 4]**
Risiko 3: Liquidationsrisiko. Wenn du einen Kredit mit Sicherheiten aufgenommen hast und der Wert der Sicherheiten fällt, wirst du liquidiert. Deine Sicherheiten werden unter Abschlag verkauft. Bei volatilen Märkten eskaliert das schnell. Die Mitigation ist konservative Loan-to-Value-Ratios. Wir behandeln Liquidationen tief in Modul 7.

**[Slide 5]**
Risiko 4: Depeg. Stablecoins und Pegged Assets sollen einen Peg halten. USDC depeggte kurz im März 2023 wegen der Silicon Valley Bank. UST kollabierte im Mai 2022 komplett und löschte mehr als 40 Milliarden Dollar aus. stETH depeggte temporär im Juni 2022. Depegs treten oft schnell auf — Sekunden bis Minuten. Diversifikation hilft.

**[Slide 6]**
Risiko 5: Rug Pull. Ein Team startet ein Protokoll, zieht Kapital an, flüchtet. Vorwiegend bei kleinen, nicht-auditierten Projekten. Soft Rugs gehen schleichend über Admin-Privilegien, Hard Rugs über direkte Abzugsfunktionen. Nur etablierte Protokolle mit öffentlicher Governance nutzen.

**[Slide 7]**
Risiko 6: Komponierbarkeit. Wenn ein tief liegendes Protokoll bricht, kaskadiert das durch alle darauf aufbauenden Positionen. Ein Liquid-Staking-Depeg kann Lending-Liquidationen auslösen, die LP-Positionen beeinträchtigen. Je tiefer dein Stack, desto mehr Oberflächenfläche.

**[Slide 8]**
Risiko 7: Betreiber-Fehler. Du selbst bist oft die Schwachstelle. Falsche Adresse, falsche Chain, kompromittierter Seed. Schätzungen besagen: mehr Kapital geht durch Nutzer-Fehler verloren als durch Protokoll-Hacks. Hardware-Wallets, Multisig, Test-Transaktionen — Modul 2 komplett.

**[Slide 9]**
Jede DeFi-Position hat ein Risikoprofil aus diesen sieben Dimensionen. Eine einfache Aave-Lending-Position trägt primär vier Risiken. Eine gehebelte Liquid-Staking-Loop trägt alle sieben. Dein Job ist nicht, Risiken zu vermeiden — sondern sie bewusst einzugehen und zu bepreisen. Das ist professionelles DeFi.

### Visual Suggestions

**[Slide 1]** Titelfolie mit "7 Risiken" prominent.

**[Slide 2]** Chart der größten DeFi-Hacks nach Schadenshöhe. **SCREENSHOT SUGGESTION:** rekt.news Leaderboard oder DeFiLlama Hacks-Dashboard.

**[Slide 3]** Vereinfachtes Diagramm: Oracle liefert Preis an Protokoll. Angreifer manipuliert Preisquelle, Oracle gibt falschen Preis weiter.

**[Slide 4]** Grafik einer Liquidationskaskade — Sicherheiten-Preis fällt, Health Factor sinkt, Liquidation triggert, weiterer Preisfall durch Verkauf.

**[Slide 5]** Chart des UST-Kollapses Mai 2022 und USDC-Depeg März 2023 nebeneinander.

**[Slide 6]** Liste bekannter Rug Pulls mit Schadenssummen. Betonung: alles aus dem kleinen-Protokoll-Segment.

**[Slide 7]** Jenga-Turm-Analogie erneut: Base-Layer-Protokoll fällt, ganzer Stack kaskadiert.

**[Slide 8]** Pie Chart: Verlustursachen in DeFi. Nutzer-Fehler prominent vertreten.

**[Slide 9]** Spider-Diagramm: "Risikoprofil einer gehebelten stETH-Loop" vs. "Risikoprofil einer einfachen USDC-Supply-Position auf Aave".

### Exercise

**Aufgabe: Risikoanalyse einer realen Position**

Wähle eine bekannte DeFi-Position, die du online recherchieren kannst — z.B. "stETH-Looping auf Aave" oder "USDC-Supply auf Morpho". Erstelle eine Risikomatrix mit den sieben Risiken. Bewerte für jede Risikodimension:
- Hoch / Mittel / Niedrig
- Begründung (eine Zeile)

**Deliverable:** Tabelle mit 7 Zeilen, pro Risiko eine Bewertung und eine Begründung.

### Quiz

**Frage 1:** Ein Freund erzählt dir, er legt seine USDC in ein unbekanntes Protokoll mit "Audit" und 150% APY. Welche drei Risiken sollten deine Alarmglocken auslösen?

<details>
<summary>Antwort anzeigen</summary>

1. Rug-Pull-Risiko: unbekanntes Protokoll mit extrem hohem APY ist klassisches Warnsignal. 2. Smart-Contract-Risiko: ein einzelnes Audit ist keine Garantie, besonders wenn der Auditor nicht bekannt ist oder der Code komplex ist. 3. Unklare Kapitalquelle: 150% APY muss von irgendwoher kommen — oft sind es Token-Emissionen, die den Token-Preis drücken, oder recycelte Deposits, die bei Abflüssen kollabieren (Ponzi-Dynamik).
</details>

**Frage 2:** Warum ist Komponierbarkeits-Risiko besonders gefährlich für fortgeschrittene Nutzer?

<details>
<summary>Antwort anzeigen</summary>

Fortgeschrittene Nutzer bauen oft tiefe Stacks mit vielen Protokollen (z.B. Liquid Staking + Lending + Derivate + Yield Aggregator). Jede zusätzliche Protokoll-Ebene fügt eine neue Risikoquelle hinzu, und ein Bruch auf einer tieferen Ebene kann alle darauf aufbauenden Positionen betreffen. Die Risikokorrelation ist nicht additiv, sondern multiplikativ — kleine Einzelrisiken können gemeinsam ein großes Gesamtrisiko bilden. Fortgeschrittene Nutzer halten oft höhere absolute Beträge, sodass die absoluten Verluste signifikant sind.
</details>

---

## Lektion 1.6 — Dein erster praktischer Schritt

### Learning Objectives

After completing this lesson the learner will be able to:
- Eine nicht-verwahrende Wallet sicher einrichten
- Eine erste Test-Transaktion ausführen und auf einem Block-Explorer verfolgen
- Grundlegende Sicherheitsprinzipien im Umgang mit der ersten Wallet anwenden

### Explanation

Genug Theorie. Diese Lektion führt dich durch deinen ersten praktischen Schritt in DeFi: Wallet einrichten und eine Test-Transaktion ausführen. Das Ziel ist **nicht**, sofort DeFi zu nutzen — sondern den Workflow zu verstehen, bevor echtes Kapital im Spiel ist.

**Schritt 1: Wallet auswählen**

Für Einsteiger empfehle ich **Rabby Wallet** (rabby.io) oder **MetaMask** (metamask.io). Beide sind kostenlose Browser-Extensions. Rabby hat überlegene Sicherheits-Features (Transaction Preview, Risk-Warnings) und wird in diesem Kurs standardmäßig referenziert.

**WICHTIG:** Lade Wallets **ausschließlich von der offiziellen Website** herunter. Gefälschte Wallet-Extensions sind ein verbreiteter Angriffsvektor. Prüfe die URL im Browser doppelt.

**Schritt 2: Wallet einrichten und Seed-Phrase sichern**

Bei der Ersteinrichtung generiert die Wallet eine **Seed-Phrase** — 12 oder 24 zufällige Wörter. Diese Phrase ist der Master-Schlüssel zu deiner Wallet. Jeder, der sie hat, kann alle Assets bewegen.

Sicherheits-Regeln für die Seed-Phrase (nur die wichtigsten; Modul 2 geht tief):
1. **Niemals digital speichern** (keine Screenshots, keine Cloud, keine Notiz-Apps, kein Passwort-Manager mit Cloud-Sync).
2. **Schreibe sie auf Papier** — und bewahre sie an einem sicheren Ort auf.
3. **Teile sie niemandem mit** — kein legitimer Dienst wird jemals deine Seed-Phrase fragen.
4. **Prüfe beim Einrichten, dass du die Phrase korrekt notiert hast** — die Wallet verlangt meist eine Bestätigung.

Für diesen ersten Kurs-Schritt richte die Wallet zum Lernen ein. Für echtes Kapital später investierst du in ein Hardware-Wallet (Modul 2).

**Schritt 3: Das Konzept "Mehrere Chains" verstehen**

Deine Wallet-Adresse ist **dieselbe** auf allen EVM-Chains (Ethereum, Arbitrum, Optimism, Base, Polygon, etc.). Aber Assets auf unterschiedlichen Chains sind **nicht identisch** — USDC auf Ethereum und USDC auf Arbitrum sind technisch verschiedene Tokens.

Rabby zeigt automatisch alle Chains, auf denen du Assets hast. MetaMask erfordert manuelles Hinzufügen (via chainlist.org).

**Schritt 4: Deine erste Transaktion — mit minimalen Mitteln**

Für diese erste Übung kaufst du eine **sehr kleine Menge ETH** (z.B. 20–50 USD Gegenwert) auf einer seriösen CEX (Coinbase, Kraken). Dann transferierst du sie zu deiner neuen Wallet.

**Wichtig beim Senden von einer CEX zu deiner Wallet:**
1. **Kopiere die Empfangsadresse korrekt** — Tippfehler führen zum Verlust.
2. **Prüfe die ersten und letzten 4 Zeichen** nach dem Einfügen.
3. **Sende zuerst eine Test-Menge** (z.B. 5 USD), warte auf die Ankunft, dann sende den Rest. Bei großen Beträgen lohnt sich das immer.
4. **Wähle die richtige Chain** (z.B. Ethereum Mainnet oder Arbitrum — je nachdem, was du vorhast).

**Schritt 5: Die Transaktion auf Etherscan verfolgen**

Nach dem Senden bekommst du von der CEX eine Transaktions-Hash (lange hexadezimale Zeichenkette). Öffne etherscan.io und füge den Hash in die Suchleiste ein. Du siehst:
- Absender-Adresse (die CEX-Hot-Wallet)
- Empfänger-Adresse (deine Wallet)
- Betrag
- Gas-Kosten
- Blockbestätigungen

Das ist der entscheidende konzeptionelle Schritt: Deine Transaktion ist öffentlich. Jeder kann sie sehen. Diese Transparenz ist das Fundament von DeFi.

**Schritt 6: Deine erste Wallet-Interaktion — Token-Import**

Sobald ETH in deiner Wallet ist, kannst du die Wallet erkunden. Einige Tokens werden automatisch erkannt, andere musst du manuell hinzufügen. Der Prozess ist:
1. "Import Token" oder "Add Token" klicken.
2. Contract-Adresse des Tokens einfügen (findest du auf coingecko.com oder der Protokoll-Website).
3. Name, Symbol und Decimals sollten automatisch gefüllt werden.

Für diese erste Übung reicht es, ETH zu haben. In der nächsten Lektion gehen wir tiefer.

**Was du jetzt nicht tun solltest**

- **Keine DeFi-Transaktionen mit signifikantem Kapital**, solange du Modul 2 (Wallets & Sicherheit) nicht abgeschlossen hast.
- **Keine Approvals auf neue Protokolle** ohne Verständnis dafür, was eine Approval ist (Modul 2, Lektion 2.4).
- **Keine "Airdrops" oder "kostenlose Tokens" in deiner Wallet antasten** — sie können Fallen sein (Modul 2).

### Slide Summary

**[Slide 1] — Titel**
Dein erster praktischer Schritt

**[Slide 2] — Wallet auswählen und installieren**
- Rabby (rabby.io) oder MetaMask (metamask.io)
- Nur von offizieller Website herunterladen
- Browser-Extension

**[Slide 3] — Seed-Phrase: Die absolute Regel**
- 12 oder 24 Wörter = Master-Schlüssel
- Niemals digital speichern
- Auf Papier notieren, sicher verwahren
- Niemals teilen

**[Slide 4] — Chains verstehen**
- Gleiche Adresse auf allen EVM-Chains
- Aber: Assets sind pro Chain unterschiedlich
- USDC auf Ethereum ≠ USDC auf Arbitrum

**[Slide 5] — Erste Transaktion**
- Kleine ETH-Menge von CEX zur Wallet
- Adresse doppelt prüfen
- Test-Transaktion mit Kleinbetrag zuerst
- Richtige Chain wählen

**[Slide 6] — Verfolgung auf Etherscan**
- Transaktions-Hash auf etherscan.io
- Absender, Empfänger, Betrag, Gas sichtbar
- Das ist DeFi-Transparenz in Aktion

**[Slide 7] — Was du jetzt NICHT tun solltest**
- Keine DeFi-Transaktionen ohne Modul 2
- Keine Approvals ohne Verständnis
- Airdrop-Tokens nicht antasten

### Voice Narration Script

**[Slide 1]**
Fünf Lektionen Theorie sind vorbei. Jetzt machen wir den ersten praktischen Schritt. Das Ziel: Wallet einrichten, Test-Transaktion ausführen, auf Etherscan verfolgen. Kein echtes DeFi — nur den Workflow verstehen.

**[Slide 2]**
Wähle eine Wallet. Für Einsteiger empfehle ich Rabby oder MetaMask. Beide sind kostenlose Browser-Extensions. Rabby hat bessere Sicherheitsfeatures und ist der Kurs-Standard. Lade ausschließlich von der offiziellen Website — rabby.io oder metamask.io. Gefälschte Extensions sind ein weit verbreiteter Angriffsvektor.

**[Slide 3]**
Bei der Einrichtung generiert die Wallet eine Seed-Phrase — 12 oder 24 Wörter. Das ist der Master-Schlüssel. Wer sie hat, hat Zugriff auf alle Assets. Die absoluten Regeln: niemals digital speichern. Keine Screenshots, keine Cloud, keine Notizen in Passwort-Managern mit Cloud-Sync. Schreib sie auf Papier. Bewahre sie sicher auf. Teile sie mit niemandem. Kein legitimer Dienst wird jemals deine Seed-Phrase fragen. Wir gehen in Modul 2 viel tiefer — für jetzt reicht diese Basis.

**[Slide 4]**
Wichtiges Konzept: deine Wallet-Adresse ist auf allen EVM-Chains dieselbe. Ethereum, Arbitrum, Optimism, Base, Polygon — alles dieselbe Adresse. Aber Assets auf verschiedenen Chains sind technisch unterschiedliche Tokens. USDC auf Ethereum und USDC auf Arbitrum haben verschiedene Contract-Adressen. Rabby zeigt automatisch alle Chains mit Assets. MetaMask braucht manuelles Hinzufügen über chainlist.org.

**[Slide 5]**
Erste Transaktion. Kauf eine sehr kleine ETH-Menge auf einer seriösen CEX wie Coinbase oder Kraken. 20 bis 50 Dollar reichen. Sende es zu deiner Wallet. Vier Regeln beim Senden: kopiere die Adresse korrekt. Prüfe erste und letzte 4 Zeichen nach dem Einfügen. Sende zuerst eine Test-Menge — fünf Dollar reichen — warte auf die Ankunft, dann den Rest. Und wähle die richtige Chain. Bei größeren Beträgen lohnt sich die Test-Transaktion immer.

**[Slide 6]**
Nach dem Senden gibt dir die CEX einen Transaktions-Hash — eine lange hexadezimale Zeichenkette. Öffne etherscan.io, füge den Hash ein. Du siehst Absender, Empfänger, Betrag, Gas-Kosten, Bestätigungen. Das ist der entscheidende konzeptionelle Moment: deine Transaktion ist öffentlich. Jeder auf der Welt kann sie sehen. Diese Transparenz ist nicht Bug, sondern Feature — sie ist das Fundament von DeFi.

**[Slide 7]**
Was du jetzt nicht tun solltest: keine DeFi-Transaktionen mit signifikantem Kapital, solange Modul 2 nicht abgeschlossen ist. Keine Token-Approvals auf neue Protokolle, bevor du verstehst, was Approvals sind. Und: wenn plötzlich unbekannte Tokens in deiner Wallet auftauchen — Airdrops, "kostenlose Coins" — tasten sie nicht an. Das sind oft Fallen, die beim Versuch, sie zu verkaufen, deine Wallet kompromittieren. Modul 2 erklärt das. Bis dahin: Finger weg.

### Visual Suggestions

**[Slide 1]** Titelfolie mit "Praxis-Start"-Feeling.

**[Slide 2]** **SCREENSHOT SUGGESTION:** Homepage von rabby.io mit Download-Button. Daneben Warnhinweis: "Nur von offizieller URL".

**[Slide 3]** Beispiel einer Seed-Phrase (fiktiv/geblurred) mit Kreuz-Markierungen bei Cloud/Screenshot/Teilen.

**[Slide 4]** Diagramm: Eine Wallet-Adresse, strahlt auf mehrere Chain-Logos (Ethereum, Arbitrum, Optimism, Base, Polygon).

**[Slide 5]** **SCREENSHOT SUGGESTION:** Coinbase-Withdrawal-Screen mit Empfängeradresse-Feld. Visuelle Hervorhebung: "Erste und letzte 4 Zeichen prüfen".

**[Slide 6]** **SCREENSHOT SUGGESTION:** Etherscan.io mit einer realen Transaktions-Ansicht — alle Felder (From, To, Value, Gas) sichtbar.

**[Slide 7]** Rote Warn-Icons mit den drei Verboten.

### Exercise

**Aufgabe: Wallet einrichten und erste Transaktion ausführen**

**Teil 1 (Setup):**
1. Installiere Rabby oder MetaMask von der offiziellen Website.
2. Generiere eine neue Wallet.
3. Notiere die Seed-Phrase auf Papier. Verstaue sie sicher.
4. Bestätige die Seed-Phrase in der Wallet-App.

**Teil 2 (Test-Transaktion):**
1. Kaufe auf einer seriösen CEX 20–50 USD in ETH.
2. Sende 5 USD als Test zu deiner Wallet.
3. Warte auf die Ankunft.
4. Sende den Rest.
5. Kopiere den Transaktions-Hash der zweiten Transaktion.

**Teil 3 (Verfolgung):**
1. Öffne etherscan.io (für Ethereum) oder arbiscan.io (für Arbitrum).
2. Suche die Transaktion.
3. Identifiziere die fünf Kernfelder: From, To, Value, Transaction Fee, Block Confirmations.

**Deliverable:** Screenshot der Etherscan-Ansicht deiner realen Transaktion (Adressen kannst du schwärzen, aber die Struktur muss sichtbar sein).

### Quiz

**Frage 1:** Deine Seed-Phrase ist kompromittiert (z.B. jemand hat sie fotografiert). Was ist die einzige korrekte Reaktion?

<details>
<summary>Antwort anzeigen</summary>

Sofort eine neue Wallet erstellen (neue Seed-Phrase) und alle Assets von der kompromittierten Wallet zur neuen Wallet transferieren, bevor der Angreifer dies tun kann. Es gibt keine Möglichkeit, eine Seed-Phrase "zu ändern" oder zu "widerrufen" — sobald sie kompromittiert ist, ist die Wallet kompromittiert. Die einzige Verteidigung ist, die Assets zu einer anderen Wallet mit unkompromittierter Seed-Phrase zu bewegen, bevor der Angreifer es tut. Deshalb ist die Sicherung der Seed-Phrase absolut kritisch.
</details>

**Frage 2:** Warum ist eine Test-Transaktion mit kleinem Betrag vor einer großen Transaktion eine gute Praxis?

<details>
<summary>Antwort anzeigen</summary>

Weil Transaktionen auf der Blockchain unwiderruflich sind. Falls die Empfängeradresse falsch kopiert wurde, die falsche Chain gewählt wurde, oder sonst ein Fehler gemacht wurde, ist das Kapital verloren. Eine Test-Transaktion mit 5 USD kostet nur den Gas-Betrag und zeigt, ob alles funktioniert. Wenn die Test-Transaktion ankommt, weiß man sicher, dass auch der große Betrag ankommen wird — vorausgesetzt, die gleiche Adresse und Chain werden verwendet.
</details>

---

## Modul-Abschluss-Quiz

Die folgenden fünf Fragen testen dein integriertes Verständnis des gesamten Moduls. Plane 10–15 Minuten zur Beantwortung.

**Frage 1:** Ein Krypto-Projekt nennt sich "DeFi-Protokoll", hat aber einen Admin-Schlüssel, mit dem das Team jederzeit Nutzer-Funds einfrieren oder bewegen kann. Ist das DeFi? Begründe mit mindestens zwei der drei DeFi-Kriterien.

<details>
<summary>Antwort anzeigen</summary>

Nein. Es verletzt das Non-Custodial-Kriterium (das Team hat Zugriff auf Nutzer-Funds) und kann optional das Permissionless-Kriterium verletzen (wenn das Team Nutzer gezielt sperren kann). Selbst wenn das Protokoll transparent ist (drittes Kriterium erfüllt), macht der Admin-Zugriff es zu einem CeFi-artigen System, nur mit Smart-Contract-Frontend. Das ist "DeFi-Washing" — technisch nicht DeFi.
</details>

**Frage 2:** Eine komponierte Position nutzt vier Protokolle: Lido für Liquid Staking, Aave als Collateral-Plattform, Curve als LP-Venue und Convex als Yield-Booster. Erkläre, wie sich Komponierbarkeits-Risiko in dieser Position manifestiert.

<details>
<summary>Antwort anzeigen</summary>

Jedes der vier Protokolle trägt eigenes Smart-Contract-Risiko. Zusätzlich: wenn stETH (Lido) depeggt, fällt der Collateral-Wert auf Aave, was Liquidation auslösen kann. Wenn Aave ein Problem hat, betrifft das die darauf aufgebaute Borrow-Position. Wenn Curve eine fehlerhafte Pool-Implementierung hat, verliert der LP-Anteil Wert. Wenn Convex-Rewards gehackt werden, verliert der Booster-Layer Wert. Das Risiko ist nicht additiv, sondern kaskadisch — ein Bruch auf Ebene 1 kann alle höheren Ebenen betreffen. Die Gesamt-Ausfallwahrscheinlichkeit ist signifikant höher als die einzelner Protokolle.
</details>

**Frage 3:** Du siehst auf DeFiLlama ein neues Protokoll mit 150M USD TVL, das vor zwei Wochen gestartet ist und 180% APY verspricht. Welche drei Fragen stellst du zur Risikobewertung?

<details>
<summary>Antwort anzeigen</summary>

1. Woher kommt der Yield? 180% APY muss eine Kapitalquelle haben — Token-Emissionen (mit Verwässerung), echte Gebühren (dann müsste das Protokoll extremen Volumen generieren), oder Ponzi-Dynamik (neue Deposits zahlen alte Returns). 2. Welche Audits wurden gemacht, von welchen Firmen, wann, und welche Findings wurden wie adressiert? 3. Wie ist die Governance strukturiert — hat das Team Admin-Privilegien zum Einfrieren/Migrieren/Upgraden? Wie schnell können diese Änderungen ausgeführt werden (Time-Lock)? Zusätzliche Fragen: Wie hoch ist die Wale-Konzentration? Gab es ähnliche Protokolle, die gescheitert sind?
</details>

**Frage 4:** Erkläre, warum eine Wallet technisch "keine Tokens hält" und was sie stattdessen tut.

<details>
<summary>Antwort anzeigen</summary>

Tokens sind keine digitalen Objekte, die in einer Wallet lagern — sie sind Einträge in Smart Contracts. Der Token-Contract (z.B. der USDC-Contract) führt ein internes Ledger, das für jede Adresse einen Balance-Wert speichert. Die Wallet-Software verwaltet ausschließlich den Private Key, der die kryptographische Autorität über eine bestimmte Blockchain-Adresse gewährt. Wenn du die Wallet-Software wechselst und denselben Private Key oder dieselbe Seed-Phrase importierst, siehst du dieselben Token-Balancen — weil die Balancen in den Token-Contracts liegen, nicht in der Wallet-App. Die Wallet ist ein Schlüsselbund, kein Tresor.
</details>

**Frage 5:** Eine einfache USDC-Supply-Position auf Aave: welche der sieben DeFi-Risiken sind relevant, und welche sind weniger relevant? Begründe.

<details>
<summary>Antwort anzeigen</summary>

Relevant: (1) Smart-Contract-Risiko (Aave-Code könnte einen Bug haben), (2) Oracle-Risiko (wenn auch für reine Supply-Positionen weniger direkt, aber relevant bei Markt-Pausen/Ausfällen), (3) Depeg-Risiko (USDC selbst kann depeggen, wie im März 2023 temporär geschehen), (4) Betreiber-Risiko (falsche Transaktion, kompromittierter Seed). Weniger relevant: (5) Liquidationsrisiko (nur bei Borrow-Positionen), (6) Rug-Pull-Risiko (Aave ist etabliert, öffentliche Governance), (7) Komponierbarkeits-Risiko (die Position baut nicht auf anderen Protokollen auf). Dies ist ein relativ konservatives Risikoprofil innerhalb des DeFi-Spektrums.
</details>

---

## Modul-Zusammenfassung

Du hast in Modul 1 das konzeptionelle Fundament für alle weiteren Module gelegt:

**Definition:** DeFi = non-custodial, permissionless, transparent — alles drei gleichzeitig.

**Kernprinzipien:** Self-Custody, Permissionless Innovation, Transparenz, Komponierbarkeit. Komponierbarkeit ist der strukturelle Superpower.

**Bausteine:** Blockchain → Smart Contract → Token → Wallet. Diese vier reichen aus, um jedes Protokoll konzeptionell einzuordnen.

**Landschaft:** Sechs Kategorien — DEX, Lending, Stablecoins, Liquid Staking, Derivate, Yield-Aggregatoren. DeFiLlama als Navigations-Tool.

**Risiken:** Sieben Kernrisiken — Smart Contract, Oracle, Liquidation, Depeg, Rug Pull, Komponierbarkeit, Betreiber. Jede Position hat ein Profil dieser sieben Dimensionen.

**Praxis:** Wallet installiert, erste Transaktion ausgeführt, auf Etherscan verfolgt. Der Workflow sitzt.

**Was in Modul 2 kommt:** Private Keys im Detail. Seed-Phrase-Storage. Hardware Wallets. Transaktions-Signaturen. Token-Approvals und Drainer-Angriffe. Multisig. Wir bauen dein Sicherheits-Setup, bevor echtes Kapital im Spiel ist.

---

*Ende von Modul 1.*
