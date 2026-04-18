# Dein erster praktischer Schritt

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Eine nicht-verwahrende Wallet sicher einrichten
- Eine erste Test-Transaktion ausführen und auf einem Block-Explorer verfolgen
- Grundlegende Sicherheitsprinzipien im Umgang mit der ersten Wallet anwenden
- Eine Seed-Phrase korrekt sichern und typische Angriffsvektoren (gefälschte Extensions, Cloud-Speicherung, Phishing) vermeiden
- Das Konzept "gleiche Adresse auf mehreren EVM-Chains, aber unterschiedliche Token-Contracts pro Chain" praktisch anwenden
- Die fünf Kernfelder einer Blockchain-Transaktion (From, To, Value, Transaction Fee, Block Confirmations) auf einem Block-Explorer identifizieren und interpretieren

## Erklärung

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

## Folien-Zusammenfassung

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

## Sprechertext

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

## Visuelle Vorschläge

**[Slide 1]** Titelfolie mit "Praxis-Start"-Feeling.

**[Slide 2]** **SCREENSHOT SUGGESTION:** Homepage von rabby.io mit Download-Button. Daneben Warnhinweis: "Nur von offizieller URL".

**[Slide 3]** Beispiel einer Seed-Phrase (fiktiv/geblurred) mit Kreuz-Markierungen bei Cloud/Screenshot/Teilen.

**[Slide 4]** Diagramm: Eine Wallet-Adresse, strahlt auf mehrere Chain-Logos (Ethereum, Arbitrum, Optimism, Base, Polygon).

**[Slide 5]** **SCREENSHOT SUGGESTION:** Coinbase-Withdrawal-Screen mit Empfängeradresse-Feld. Visuelle Hervorhebung: "Erste und letzte 4 Zeichen prüfen".

**[Slide 6]** **SCREENSHOT SUGGESTION:** Etherscan.io mit einer realen Transaktions-Ansicht — alle Felder (From, To, Value, Gas) sichtbar.

**[Slide 7]** Rote Warn-Icons mit den drei Verboten.

## Übung

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

## Quiz

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

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Slides: Titel → Wallet-Auswahl → Seed-Phrase-Regeln → Multi-Chain-Konzept → Erste Transaktion → Etherscan-Verfolgung → "Was du jetzt NICHT tun solltest"
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min., Praxis-orientiert)
- `visual_plan.json` — Rabby-Homepage-Screenshot, Seed-Phrase-Beispiel (fiktiv/geblurred), Multi-Chain-Diagramm, Coinbase-Withdrawal-Screen, Etherscan-Transaktionsansicht, rote Warn-Icons

Pipeline: Gamma → ElevenLabs → CapCut.

---
