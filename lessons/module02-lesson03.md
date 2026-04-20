# Transaktions-Signaturen und ihre Gefahren

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die drei Haupttypen von Signaturen unterscheiden (Transaction, Message, Typed Data)
- Erklären, warum Typed-Data-Signaturen besonders gefährlich sind
- Ursachen und Lehren des Bybit-Hacks (Februar 2025) benennen
- Den Unterschied zwischen On-Chain-Approval, Permit (EIP-2612) und Permit2 technisch erklären
- Clear-Signing, Blind-Signing und Transaction-Simulation als drei verschiedene Schutzschichten anwenden
- Eine verdächtige "Login-Signatur" als möglichen Permit-Phishing-Angriff anhand der Feldstruktur erkennen

## Erklärung

Wenn du in DeFi etwas tust, signierst du mit deinem Private Key. Was genau du signierst, variiert erheblich — und das Missverständnis über diese Unterschiede ist der Grund für viele der größten Wallet-Verluste der letzten Jahre.

**Signatur-Typ 1: Transaction**

Die klassische Signatur. Du signierst eine vollständige Transaktion, die auf die Blockchain geht. Die Wallet zeigt:
- Empfänger-Adresse
- Betrag
- Gas-Kosten
- Aufgerufene Funktion (bei Smart-Contract-Interaktion)

Beispiele: ETH senden, Token-Swap, Lending-Deposit.

Die Transaktion kostet Gas, wird on-chain ausgeführt, ist einsehbar. Wenn etwas schief geht, siehst du es sofort in der Historie.

**Signatur-Typ 2: Message (personal_sign)**

Du signierst eine beliebige Nachricht — einfacher Text. Die Signatur bleibt off-chain; die Blockchain sieht nie, dass du unterschrieben hast.

Beispiele: Login auf DApps ("Sign in with Ethereum"), Off-chain-Voting.

Weil die Nachricht beliebig ist, kann sie technisch komplex sein. Manche DApps lassen dich Nachrichten unterschreiben, die wie "Login" aussehen, aber tatsächlich eine Autorisierung zu Token-Bewegungen enthalten.

**Signatur-Typ 3: Typed Data (EIP-712)**

Strukturierte Variante. Statt freier Nachricht signierst du ein definiertes Schema mit Feldern wie `token`, `spender`, `amount`, `deadline`. Die Wallet kann diese Daten in strukturierten Feldern anzeigen.

Beispiele: **Permit** (Token-Approval via Signatur, ohne On-Chain-Transaktion), **Permit2** (Uniswaps verbessertes Approval-System), OpenSea-NFT-Listings, 0x-Orders.

**Das ist der gefährlichste Signatur-Typ für Nutzer**, aus drei Gründen:
- Die Signatur kostet kein Gas (keine finanzielle Abschreckung)
- Die Wallet-Anzeige kann die tatsächliche Bedeutung nicht immer klar darstellen
- Ein Angreifer kann die Signatur später on-chain ausnutzen, um Assets zu ziehen

**Permit und Permit2 im Detail**

Standard-Approval (traditionell): Du signierst eine On-Chain-Transaktion, die dem Protokoll erlaubt, deine Tokens zu bewegen. Kostet Gas. Wallet zeigt genaue Approval.

**Permit (EIP-2612):** Off-Chain-Signatur, die dem Protokoll Approval gibt. Kein Gas. Das Protokoll führt die Approval später on-chain aus, wenn nötig.

**Problem:** Wenn ein böswilliges Frontend dich dazu bringt, einen Permit zu signieren, der überhöhte Beträge erlaubt oder den Permit an eine Angreifer-Adresse ausstellt, kann dein Kapital gezogen werden — oft Minuten nachdem du "nur eingeloggt" hast.

**Permit2 (Uniswap, 2022):** Einmalige Approval an einen zentralen Permit2-Contract, der Sub-Approvals an Protokolle verwaltet. Komfortabel, vergrößert aber die Angriffsfläche, weil Permit2-Signaturen komplexer zu lesen sind.

**Der Bybit-Hack (Februar 2025)**

Am 21. Februar 2025 wurde Bybit — eine der größten zentralisierten Exchanges — um etwa 1,5 Milliarden USD in ETH bestohlen. Das ist der größte bekannte Krypto-Hack aller Zeiten.

**Was technisch passierte:** Bybit nutzte Safe (früher Gnosis Safe) für die Cold Wallet — ein Multisig-Setup. Die Angreifer (vermutlich die nordkoreanische Lazarus-Gruppe) kompromittierten das Frontend-Interface, über das Bybit-Mitarbeiter Transaktionen signierten. Das Team sah auf dem Bildschirm eine reguläre Transaktion. Tatsächlich signierten sie ein Upgrade des Safe-Contracts auf eine bösartige Implementierung, die dem Angreifer Kontrolle übergab.

Der Vektor war eine Typed-Data-Signatur (EIP-712), die ein Safe-Upgrade darstellte. Die signierenden Personen sahen nicht die tatsächliche Bedeutung, weil das Interface manipuliert war und die Hardware-Wallet-Darstellung unzureichend decodierte.

**Die Lehren für DeFi-Nutzer:**

1. **Was deine Wallet zeigt, ist nicht zwingend, was du signierst.** Besonders bei Typed Data muss man die Daten manuell prüfen.
2. **Blind-Signing ist gefährlich.** Viele Hardware-Wallets zeigen bei Typed Data nur einen Hash-Wert — ohne dezidierte Decodierung signierst du blind.
3. **Clear-Signing als Schutzmechanismus.** Neuere Wallets (Rabby) und Hardware-Wallets (aktuelle Ledger-Modelle) decodieren Typed Data in lesbare Form. Essentiell.
4. **Transaction-Simulation.** Tools wie Tenderly oder integrierte Rabby-Simulation zeigen vor dem Signieren, was tatsächlich passiert (Token-Bewegungen, Balance-Änderungen).

**Praktische Regeln für Signaturen**

- Vor jedem Signieren: Transaction-Simulation prüfen (Rabby automatisch, Tenderly manuell)
- Bei Typed Data: Felder individuell lesen — besonders `spender`, `amount`, `deadline`
- Bei unbekannten DApps: kein Signing ohne Verständnis
- Wenn eine DApp eine Signatur "zum Einloggen" verlangt, aber Typed Data mit Token-Feldern zeigt: STOP
- Hardware-Wallet verwenden — physische Bestätigung erforderlich, Clear-Signing nutzen

## Folien-Zusammenfassung

**[Slide 1]** Titel: Signaturen — der gefährlichste Moment in DeFi

**[Slide 2]** Drei Signatur-Typen: Transaction (on-chain, kostet Gas), Message (off-chain, frei), Typed Data EIP-712 (strukturiert, off-chain, oft gefährlich).

**[Slide 3]** Warum Typed Data gefährlich ist: kein Gas-Signal, UI oft unklar, Angreifer kann später ausnutzen.

**[Slide 4]** Permit und Permit2: Approval via Signatur. Elegant, aber bei Missbrauch katastrophal.

**[Slide 5]** Bybit-Hack Februar 2025: 1,5 Milliarden USD. Safe-Multisig-Signaturen, aber manipulierte UI. Signierte Inhalte ≠ angezeigte Inhalte.

**[Slide 6]** Vier Lehren: Wallet-Anzeige ist nicht verbindlich. Blind-Signing ist gefährlich. Clear-Signing ist essentiell. Simulation verwenden.

**[Slide 7]** Praktische Regeln: Simulation, Typed-Data-Felder lesen, unbekannte DApps meiden, Hardware-Wallet.

## Sprechertext

**[Slide 1]** Signaturen sind der gefährlichste Moment in DeFi. Hinter fast jedem großen Wallet-Verlust steckte eine Signatur, deren Konsequenzen der Signer nicht verstanden hat.

**[Slide 2]** Drei Signatur-Typen. Transaction: vollständige On-Chain-Transaktion, kostet Gas, öffentlich. Message: freier Text, off-chain. Typed Data nach EIP-712: strukturierte Signatur mit definierten Feldern, off-chain — oft der gefährlichste Typ.

**[Slide 3]** Warum Typed Data besonders gefährlich ist: erstens kein Gas-Kostensignal als Abschreckung. Zweitens kann die Wallet-Anzeige die Bedeutung nicht immer klar darstellen. Drittens kann der Angreifer die Signatur zeitverzögert ausnutzen. Du denkst, du hast nur eingeloggt — in Wahrheit hast du einen Permit für alle deine USDC signiert.

**[Slide 4]** Permit und Permit2. Permit ist EIP-2612: statt On-Chain-Approval eine Off-Chain-Signatur. Gas-sparend, elegant — aber bei Missbrauch katastrophal. Permit2 ist Uniswaps verbessertes System; löst manche Probleme, führt eigene Komplexität ein.

**[Slide 5]** Das lehrreichste Beispiel: Bybit-Hack am 21. Februar 2025. 1,5 Milliarden Dollar in ETH. Größter Krypto-Hack aller Zeiten. Bybit nutzte Safe-Multisig für die Cold Wallet. Die Angreifer kompromittierten das Interface. Das Team sah eine reguläre Transaktion — tatsächlich signierten sie ein Safe-Upgrade auf eine bösartige Version. Angreifer bekam die Kontrolle.

**[Slide 6]** Die Lehren. Erstens: Wallet-Anzeige ist nicht zwingend Signatur-Inhalt. Zweitens: Blind-Signing ist gefährlich — viele Hardware-Wallets zeigen bei Typed Data nur Hash. Drittens: Clear-Signing — Decodierung in lesbare Form — ist essentiell. Viertens: Transaction-Simulation zeigt die tatsächlichen Effekte vor dem Signieren.

**[Slide 7]** Regeln. Jede Transaktion simulieren, Rabby macht es automatisch. Bei Typed Data einzelne Felder lesen. Unbekannte DApps nicht signieren, bevor du ihr Verhalten verstehst. Und Hardware-Wallet verwenden — der kompromittierte Browser kann ohne physische Bestätigung nicht signieren.

## Visuelle Vorschläge

**[Slide 1]** Titelfolie.
**[Slide 2]** Drei Spalten: Transaction, Message, Typed Data. Beispiele und Charakteristika pro Spalte.
**[Slide 3]** Warnschild neben "Typed Data" mit drei roten Bullets.
**[Slide 4]** **SCREENSHOT SUGGESTION:** Permit2-Signatur-Dialog in Rabby oder MetaMask mit sichtbaren Feldern (spender, amount, deadline).
**[Slide 5]** Zeitleiste und Flussdiagramm des Bybit-Hacks: Mitarbeiter → Kompromittiertes UI → Safe-Upgrade → Angreifer-Kontrolle. **SCREENSHOT SUGGESTION:** rekt.news-Artikel zum Bybit-Hack oder Arkham-Dashboard der gestohlenen Gelder.
**[Slide 6]** Vier-Punkt-Checkliste als Icons.
**[Slide 7]** **SCREENSHOT SUGGESTION:** Rabby-Transaction-Simulation-Screen mit klarer Anzeige der Token-Bewegungen.

## Übung

**Aufgabe: Transaction-Simulation in der Praxis**

1. Installiere Rabby (falls noch nicht geschehen).
2. Öffne app.uniswap.org.
3. Wähle einen Token-Swap (z.B. 0,01 ETH zu USDC). **Führe nicht aus** — stoppe beim Bestätigungs-Dialog.
4. Analysiere die Rabby-Simulation. Was zeigt sie an Token-Bewegungen und Approvals?
5. Zusätzlich: Besuche revoke.cash mit deiner Wallet und prüfe deine aktuellen Approvals.

**Deliverable:** Zwei Screenshots — Rabby-Simulation und revoke.cash-Approval-Liste.

## Quiz

**Frage 1:** Eine DApp fordert dich auf, "zum Einloggen" eine Signatur zu erstellen. Die Signatur ist vom Typ Typed Data (EIP-712). Was ist deine Verteidigung?

<details>
<summary>Antwort anzeigen</summary>

Prüfe die Felder der Typed Data vor dem Signieren. Ein Login (z.B. "Sign in with Ethereum", EIP-4361) sollte nur generische Felder enthalten: domain, message mit timestamp und address. Wenn du Token-spezifische Felder siehst — token, spender, amount, deadline — ist es kein Login, sondern ein Permit. Ein böswilliger Permit kann deine Tokens stehlen. Bei unbekannten oder zweifelhaften Sites signiere nichts, auch wenn die Felder harmlos aussehen.
</details>

**Frage 2:** Warum schützt selbst eine Hardware-Wallet nicht vollständig gegen den Angriffstyp des Bybit-Hacks?

<details>
<summary>Antwort anzeigen</summary>

Weil das Bybit-Team die Hardware-Wallets korrekt nutzte — sie bestätigten bewusst auf den Geräten. Das Problem war, dass die angezeigten Typed-Data-Signaturen komplex waren und die Hardware-Wallets sie nicht vollständig in lesbare Form decodieren konnten. Die Mitarbeiter sahen auf dem Browser eine reguläre Transaktion, aber auf dem Gerät nur Hash oder unverständliche Rohdaten. Ohne Clear-Signing und ohne Abgleich zwischen Browser und Gerät ist auch Hardware-Wallet verwundbar. Verteidigung erfordert drei Schichten: Hardware-Wallet + Clear-Signing + Transaction-Simulation.
</details>

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Slides: Titel → 3 Signatur-Typen → Gefahr von Typed Data → Permit/Permit2 → Bybit-Hack Case Study → 4 Lehren → Praktische Regeln
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — Drei-Spalten-Vergleich Signaturtypen, Permit2-Signatur-Dialog, Bybit-Hack-Zeitleiste (1,5 Mrd. USD), Clear-Signing-Checkliste, Rabby-Simulation-Screenshot

Pipeline: Gamma → ElevenLabs → CapCut.

---
