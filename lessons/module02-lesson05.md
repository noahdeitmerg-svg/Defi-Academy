# Hardware-Wallets und Safe-Multisig

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die Funktionsweise und Schutzgrenzen von Hardware-Wallets verstehen
- Ein Safe-Multisig-Setup konfigurieren und seinen Nutzen einordnen
- Entscheiden, wann Hardware-Wallet vs. Multisig vs. beides angemessen ist
- Drei typische Multisig-Konfigurationen (2-of-3 Personal, 3-of-5 Team, 2-of-2 Couple) in ihren Anwendungsfällen gegenüberstellen
- Die Rolle von Account Abstraction (ERC-4337) und Smart Wallets (Safe, Rhinestone, Ambire, Zerion) in der zukünftigen Wallet-Landschaft einordnen
- Eine Entscheidungsmatrix anwenden, um das passende Wallet-Setup nach Kapitalstufe (< 1k / 1–10k / 10–100k / > 100k USD) zu wählen

## Erklärung

In Lektion 2.1 sahen wir: der Private Key ist der einzige kritische Punkt. In Lektion 2.3: selbst mit sicherem Key kann eine böse Signatur alles zerstören. Zwei Werkzeuge adressieren diese Risiken: Hardware-Wallets und Multisig-Setups.

**Hardware-Wallets**

Ein Hardware-Wallet ist ein spezialisiertes Gerät, das den Private Key isoliert von Internet und Computer speichert. Der Key verlässt das Gerät niemals. Transaktionen werden auf dem Gerät signiert; nur die signierte Transaktion geht zurück an den Computer.

**Schutzwirkung:**
- Private Key kann nicht durch Malware gestohlen werden, weil er nie im Computer existiert
- Jede Signatur erfordert physische Bestätigung (Knopfdruck oder PIN)
- Selbst kompromittierte Browser-Extensions können nicht ohne physische Interaktion signieren

**Was Hardware-Wallets NICHT schützen:**
- Seed-Phrase-Kompromittierung (wenn Seed-Phrase gestohlen wird, ist der Schutz weg)
- Signatur-Angriffe, wenn der Nutzer auf dem Gerät einen bösen Inhalt bestätigt (siehe Bybit)
- Phishing, bei dem Seed-Phrase oder PIN auf einer gefälschten Seite eingegeben wird

**Populäre Modelle:**

**Ledger Nano S Plus / Nano X** — Marktführer, breite Chain-Unterstützung, Closed-Source Secure Element (umstritten), 2020er Kundendaten-Leak betraf nicht die Hardware, aber machte Ledger-Besitzer zu Phishing-Zielen. Preiswert ab ca. 80 USD. Clear-Signing wird ausgebaut.

**Trezor Model T / Safe 3 / Safe 5** — Open-Source Firmware, Shamir-SSS-Unterstützung (SLIP-39), Touchscreen (Model T), weniger Chain-Apps als Ledger. Ca. 150–250 USD.

**GridPlus Lattice1** — Größeres Display, bessere Clear-Signing-Fähigkeit, teurer (ca. 400 USD). SafeCards für Backup-Key-Lagerung.

**Empfehlung:** Ledger Nano S Plus für den Einstieg (preisgünstig, weit unterstützt). Für höhere Beträge Trezor oder GridPlus nach persönlicher Präferenz. Wichtiger als das Modell ist: konsistent nutzen und niemals die Seed-Phrase digital eingeben.

**Multisig-Wallets: Das Safe-Konzept**

Ein Multisig-Wallet erfordert mehrere Unterschriften für jede Transaktion. Kompromittierung einer einzelnen Wallet führt nicht zu Asset-Verlust.

**Safe** (safe.global, früher Gnosis Safe) ist die Standard-Multisig-Implementierung in EVM-DeFi. Ein Safe ist ein Smart Contract, der eine Liste von Besitzern (Owner-Adressen) und einen Threshold (z.B. 2-of-3) hält.

**Typische Konfigurationen:**

*2-of-3 Personal*
- Owner 1: Hardware-Wallet Nummer 1 (Hauptgerät)
- Owner 2: Hardware-Wallet Nummer 2 (Backup, anderer Ort)
- Owner 3: Mobile/Hot Wallet für tägliche Bestätigungen
- Szenario: Verlust eines Geräts → zwei andere reichen für Recovery

*3-of-5 Team*
- Owner 1–3: Kern-Team-Mitglieder
- Owner 4–5: Externe Vertraute (z.B. Legal, Advisor)
- Szenario: zwei Team-Mitglieder kompromittiert → Recovery noch möglich

*2-of-2 Couple*
- Owner 1: Person A
- Owner 2: Person B
- Beide müssen zustimmen (z.B. ehegemeinschaftliche Finanzkontrolle)

**Vorteile des Safe-Setups:**
- Einzel-Kompromittierung reicht nicht aus
- Social Recovery möglich (Freunde, Familie als Co-Signer)
- Inheritance-Planung elegant machbar
- Transaktionen können vorgeschlagen werden, ohne ausgeführt zu werden

**Nachteile:**
- Höhere Gas-Kosten (mehrere Signaturen)
- Komplexere Koordination bei Transaktionen
- Einzelne DeFi-Protokolle haben historisch Probleme mit Contract-Wallets (verbessert sich, Account-Abstraktion hilft)

**Account Abstraction und Smart Wallets**

ERC-4337 (Account Abstraction, live seit 2023) erlaubt Wallets, die mehr können als klassische EOAs:
- Social Recovery ohne Multisig-Komplexität
- Session Keys (temporäre, begrenzte Autorisierungen)
- Gasless Transactions (Paymaster zahlt)
- Transaction-Batching (mehrere Aktionen in einer Transaktion)

Smart Wallets wie **Safe**, **Rhinestone**, **Ambire**, **Zerion** implementieren Teile davon. Wachsendes Feld, das klassische Wallet-Architektur ergänzt.

**Entscheidungsmatrix**

| Kapital | Nutzung | Empfehlung |
|---|---|---|
| < 1.000 USD | Gelegentlich | Software-Wallet (Rabby) |
| 1.000 – 10.000 USD | Regelmäßig | Software + Hardware-Wallet |
| 10.000 – 100.000 USD | Aktiv | Hardware-Wallet (Ledger/Trezor), separate DeFi-Wallet |
| > 100.000 USD | Aktiv oder Cold | Safe 2-of-3 mit Hardware-Wallets als Signer |

Die Investition in Hardware-Wallet und Safe-Setup zahlt sich ab dem niedrigen 4-stelligen Kapitalbereich aus. Das ist kein Nice-to-have, sondern die Basis jeder ernsthaften DeFi-Aktivität.

## Folien-Zusammenfassung

**[Slide 1]** Titel: Hardware-Wallets und Safe-Multisig

**[Slide 2]** Hardware-Wallet: Private Key bleibt auf isoliertem Gerät. Signatur im Gerät, physische Bestätigung.

**[Slide 3]** Hardware-Wallet-Grenzen: schützt nicht gegen Seed-Phrase-Verlust, böse Signaturen, Phishing.

**[Slide 4]** Modelle: Ledger (Einstieg), Trezor (Open-Source), GridPlus (Premium).

**[Slide 5]** Safe-Konzept: Smart Contract mit Owners-Liste und Threshold k-of-n.

**[Slide 6]** Konfigurationen: 2-of-3 Personal, 3-of-5 Team, 2-of-2 Couple.

**[Slide 7]** Account Abstraction: ERC-4337, Smart Wallets, Recovery ohne Multisig-Komplexität.

**[Slide 8]** Entscheidungsmatrix: von Software-Wallet bis Multisig je nach Kapital.

## Sprechertext

**[Slide 1]** Hardware-Wallets und Multisig-Setups adressieren zwei verschiedene Risiken: Key-Diebstahl durch Malware und Single-Point-of-Failure bei einer einzelnen Signatur. Beide Werkzeuge verstehen wir jetzt.

**[Slide 2]** Ein Hardware-Wallet ist ein spezialisiertes Gerät, das den Private Key isoliert speichert. Der Key verlässt das Gerät nie. Transaktionen werden auf dem Gerät signiert, nur die fertige Signatur geht an den Computer. Jede Signatur braucht physische Bestätigung.

**[Slide 3]** Was Hardware-Wallets nicht können: sie schützen nicht gegen Seed-Phrase-Kompromittierung — wenn die gestohlen wird, ist der Schutz weg. Sie schützen nicht vollständig gegen böse Signaturen, die der Nutzer selbst bestätigt — siehe Bybit-Hack. Sie schützen nicht gegen Phishing, wenn Seed-Phrase oder PIN auf gefälschten Seiten eingegeben werden.

**[Slide 4]** Drei populäre Modelle. Ledger Nano S Plus: Marktführer, achtzig Dollar, breite Unterstützung. Trezor: Open-Source-Firmware, Shamir-Unterstützung, teurer. GridPlus Lattice1: Premium mit großem Display, etwa vierhundert Dollar. Für den Einstieg reicht Ledger. Konsistente Nutzung ist wichtiger als das Modell.

**[Slide 5]** Multisig: Safe ist die Standard-Implementierung. Ein Smart Contract mit einer Liste von Ownern und einem Threshold. Zum Beispiel zwei-von-drei: drei Signer definiert, zwei reichen für eine Transaktion. Kompromittierung einer einzelnen Wallet führt nicht zum Verlust.

**[Slide 6]** Typische Konfigurationen. Zwei-von-drei persönlich: Hardware eins, Hardware zwei an anderem Ort, Mobile für Bestätigungen. Drei-von-fünf Team: Kernmitglieder plus externe Vertraute. Zwei-von-zwei Paar: gemeinsame Finanzkontrolle. Jede Konfiguration ist Trade-off zwischen Sicherheit und Bedienbarkeit.

**[Slide 7]** ERC-4337, seit 2023 live, bringt Account Abstraction. Smart Wallets können Social Recovery ohne Multisig-Komplexität, Session Keys für begrenzte Autorisierungen, Gasless Transactions. Safe, Rhinestone, Ambire, Zerion implementieren Teile davon. Das Feld wächst schnell.

**[Slide 8]** Entscheidungsmatrix. Unter tausend Dollar: Software-Wallet reicht. Bis zehntausend: Software plus Hardware. Bis hunderttausend: Hardware als Default, separate DeFi-Wallet für aktive Positionen. Über hunderttausend: Safe mit mehreren Hardware-Wallets als Signer. Ab niedrigen vierstelligen Beträgen amortisiert sich die Investition in ordentliche Wallet-Infrastruktur.

## Visuelle Vorschläge

**[Slide 1]** Titelfolie.
**[Slide 2]** Diagramm: Computer (kompromittiert?) ↔ Hardware-Wallet (isoliert) — mit Pfeil für Transaktion-Hinschicken und Signatur-Zurückgeben.
**[Slide 3]** Drei rote Kreuze neben "Seed-Phrase-Diebstahl", "Böse Signatur bestätigt", "Phishing".
**[Slide 4]** **SCREENSHOT SUGGESTION:** Produktbilder von Ledger Nano S Plus, Trezor Model T, GridPlus Lattice1 nebeneinander.
**[Slide 5]** **SCREENSHOT SUGGESTION:** app.safe.global-Interface mit beispielhafter 2-of-3-Konfiguration und pending Transaction.
**[Slide 6]** Drei Karten: Personal, Team, Couple — jede mit Icon und Szenario.
**[Slide 7]** Diagramm: klassische EOA vs. Smart Wallet mit Zusatzfeatures.
**[Slide 8]** Tabelle Kapital vs. Empfehlung.

## Übung

**Aufgabe: Safe-Multisig-Testnet-Setup**

1. Gehe auf **app.safe.global**.
2. Wechsel auf Sepolia-Testnet (kein echtes Geld erforderlich).
3. Erstelle ein 2-of-3-Safe mit drei Adressen deiner Wallet (oder zwei deiner + eine Test-Adresse eines Freundes).
4. Initiiere eine Test-Transaktion (z.B. 0 ETH an eine beliebige Adresse).
5. Unterzeichne mit zwei der drei Signer.
6. Beobachte: Erst nach der zweiten Unterschrift wird die Transaktion ausführbar.

**Deliverable:** Link zur Test-Transaktion auf Etherscan (sepolia.etherscan.io) und kurze Notiz zu deiner Beobachtung des Signatur-Prozesses.

## Quiz

**Frage 1:** Eine Person hat 50.000 USD in DeFi-Positionen und nutzt eine einzelne Hardware-Wallet. Welches Hauptrisiko bleibt, das ein Safe-Multisig-Setup adressieren würde?

<details>
<summary>Antwort anzeigen</summary>

Zwei Hauptrisiken bleiben: Erstens das Einzel-Gerät-Risiko — Verlust, Zerstörung oder Diebstahl des Hardware-Wallets erzwingt Recovery via Seed-Phrase. Zweitens das Einzel-Signatur-Risiko — eine böse Signatur (z.B. durch Phishing zu signierende Malicious Transaction) kann zum Totalverlust führen. Ein 2-of-3-Safe mit Hardware-Wallets erfordert zwei Zustimmungen, was beide Risiken adressiert: Gerät-Verlust ist durch die anderen zwei Signer absorbiert, und eine einzelne böse Signatur reicht nicht aus, um Assets zu bewegen. Der Preis ist höhere Gas-Kosten und komplexere Koordination.
</details>

**Frage 2:** Warum ist der kombinierte Einsatz von Hardware-Wallet UND Multisig stärker als jedes einzeln?

<details>
<summary>Antwort anzeigen</summary>

Hardware-Wallet schützt gegen Remote-Signatur und Malware-Diebstahl des Private Keys. Multisig schützt gegen den Single-Point-of-Failure jeder einzelnen Signatur. Ein Angreifer müsste gleichzeitig mehrere physische Geräte kompromittieren UND mehrere Personen zur Bestätigung bringen. Die Schwierigkeit multipliziert sich, während die Kosten für den Nutzer nur additiv steigen. Deshalb ist Safe mit Hardware-Wallets als Signer das empfohlene Setup ab nennenswerten Beträgen.
</details>

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 8 Slides: Titel → Hardware-Wallet-Funktion → Grenzen → 3 Modelle (Ledger/Trezor/GridPlus) → Safe-Konzept → 3 Konfigurationen → Account Abstraction ERC-4337 → Entscheidungsmatrix
- `voice_script.txt` — *Voice Narration Script* (120–140 WPM, Zielvideo 10–12 Min.)
- `visual_plan.json` — Hardware-Wallet-Isolationsdiagramm, Schutz-Grenzen-Icons, Produktfotos Ledger/Trezor/GridPlus, Safe-Interface-Screenshot, Konfigurations-Karten, Entscheidungsmatrix

Pipeline: Gamma → ElevenLabs → CapCut.

---
