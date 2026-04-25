## Modul-Abschluss-Quiz

Die folgenden fünf Fragen testen dein integriertes Verständnis des gesamten Moduls. Plane 15–20 Minuten.

**Frage 1:** Eine Person nutzt MetaMask auf einem Browser, hat ihre Seed-Phrase in einem verschlüsselten Passwort-Manager mit Cloud-Sync gespeichert, und gibt DeFi-Protokollen standardmäßig Unlimited Approvals. Welche drei Schwachstellen bestehen, und wie adressierst du sie?

<details>
<summary>Antwort anzeigen</summary>

Schwachstelle 1: Seed-Phrase im Cloud-Passwort-Manager — bei Kompromittierung des Manager-Kontos (Phishing, Credential-Leak, Insider) sind alle Assets verloren. Adresse: Seed-Phrase offline speichern, idealerweise auf Metall, niemals in digitaler Form mit Cloud-Bezug. Schwachstelle 2: MetaMask als Software-Wallet ohne Hardware — der Private Key lebt auf dem Computer, Malware kann ihn stehlen. Adresse: Hardware-Wallet (Ledger/Trezor) verwenden, MetaMask nur als Connector zum Hardware-Wallet. Schwachstelle 3: Unlimited Approvals standardmäßig — bei späterem Protokoll-Hack oder kompromittierter Wallet können alle Tokens abgezogen werden. Adresse: Approval-Höhe auf benötigten Betrag begrenzen und/oder monatliche Approval-Audits auf revoke.cash mit Widerruf nicht mehr benötigter Approvals.
</details>

**Frage 2:** Du erhältst eine E-Mail vom "Uniswap Support", die dich auf eine Login-Seite verlinkt. Die Seite sieht exakt wie Uniswap aus. Du willst signieren, aber dein Rabby-Wallet zeigt eine Typed-Data-Signatur mit Feldern `token: USDC`, `spender: 0xabc...def`, `amount: 115792089237316195423570985008687907853269984665640564039457584007913129639935`. Analysiere diese Situation.

<details>
<summary>Antwort anzeigen</summary>

Das ist ein klassischer Permit-Phishing-Angriff. Erkennungsmerkmale: (1) Unaufgeforderte E-Mail von einem "Support" — Uniswap hat keinen Support, der so kontaktiert. (2) Login-Seite, die angeblich eine Signatur erfordert — echte Logins in DeFi nutzen entweder keine Signatur oder eine klar identifizierte "Sign in with Ethereum"-Signatur. (3) Die Typed Data hat Token-Felder (token, spender, amount) — das ist kein Login, das ist ein Permit. (4) Der amount-Wert 2^256 - 1 ist Unlimited — maximale Berechtigung für den Spender. (5) Der Spender 0xabc...def ist vermutlich die Drainer-Adresse. Korrekter Umgang: Signatur abbrechen. Die E-Mail als Phishing melden. Die Domain der vermeintlichen Uniswap-Seite prüfen — wahrscheinlich abweichend vom echten app.uniswap.org. Rabby zeigt üblicherweise eine Warnung bei bekannten bösartigen Signaturen — aber auch ohne Warnung ist die Kombination der Merkmale ausreichend für die Ablehnung.
</details>

**Frage 3:** Erkläre, warum die Trennung in ein Drei-Wallet-Modell besser ist als ein einzelnes Hardware-Wallet mit allen Assets, selbst bei disziplinierter Nutzung.

<details>
<summary>Antwort anzeigen</summary>

Ein einzelnes Hardware-Wallet schützt den Private Key, aber schützt nicht gegen bösartige Signaturen, die der Nutzer selbst autorisiert. Beim Testen neuer Protokolle, beim Interagieren mit experimentellen DApps oder beim Einsatz neuer Strategien steigt die Wahrscheinlichkeit einer solchen fehlerhaften Signatur. Wenn alle Assets in einer Wallet sind, ist der maximale Verlust bei einer solchen Signatur das Gesamtvermögen. Beim Drei-Wallet-Modell ist experimentelle Aktivität auf die kleine Transaktions-Wallet begrenzt — ein Fehler dort kostet maximal deren Inhalt, nicht das Gesamtvermögen. Das ist strukturelle Defense-in-Depth, die unabhängig von der individuellen Disziplin wirkt. Selbst bei bestem Willen ist ein Fehler irgendwann wahrscheinlich; das Drei-Wallet-Modell stellt sicher, dass dieser Fehler nicht katastrophal ist.
</details>

**Frage 4:** Was sind die drei wichtigsten Einsatzfelder einer BIP-39-Passphrase, und in welchen Situationen sollte man auf die Nutzung verzichten?

<details>
<summary>Antwort anzeigen</summary>

Drei Einsatzfelder: (1) Schutz gegen gefundene/gestohlene Seed-Phrase — ohne Passphrase hat der Finder Zugriff, mit Passphrase nur auf Decoy-Wallet. (2) Plausible Deniability gegen physischen Zwang — das Opfer kann die Seed-Phrase herausgeben, der Angreifer sieht die Decoy, glaubt er hat alles. (3) Multi-Profile-Setup — eine Seed-Phrase kann über verschiedene Passphrasen mehrere separate Wallets verwalten (z.B. persönlich/geschäftlich). Verzicht ist angebracht: bei sehr kleinem Kapital, wo die Zusatzkomplexität das Verlustrisiko durch Passphrase-Verlust überwiegt. Bei Nutzern, die zu unerfahren sind, um die Passphrase zuverlässig zu sichern. Bei Inheritance-Situationen, in denen Erben die Passphrase finden müssten, ohne dass die Vererbung-Dokumentation sie kompromittiert. Passphrase ohne zuverlässige separate Sicherung ist schlechter als keine Passphrase, weil Verlust der Passphrase Asset-Verlust bedeutet.
</details>

**Frage 5:** Beschreibe den vollständigen Workflow eines Drainer-Angriffs von der Köder-Phase bis zur Obfuskation, inklusive aller technischen Komponenten.

<details>
<summary>Antwort anzeigen</summary>

Phase 1 — Köder: Angreifer platziert bösartigen Link (Phishing-Mail, gefälschtes Google-Ad für bekannte DApp, kompromittiertes Twitter-Profil einer Protokoll-Firma, Discord-DM als "Support"). Der Link führt zu einer gefälschten Frontend-Seite, die oft exakt wie die echte aussieht (kopiertes HTML/CSS). Phase 2 — Connection: Nutzer klickt "Connect Wallet" auf der bösartigen Seite. Wallet verbindet sich — diese Aktion allein ist harmlos. Phase 3 — Signatur-Anforderung: Seite fordert eine Signatur. Je nach Variante: klassische Approval-Transaktion (Wallet zeigt Token-Contract-Aufruf mit Drainer-Adresse als Spender), Permit-Signatur (Typed Data, kein Gas, Token-Felder), setApprovalForAll (bei NFTs, eine Signatur für ganze Collection), oder direkter Transfer (seltener, UI verdächtig). Nutzer signiert, ggf. mit Hardware-Wallet-Bestätigung ohne den Inhalt zu verstehen. Phase 4 — Exekution: Drainer-Backend erkennt die Signatur/Approval on-chain und ruft innerhalb von Sekunden bis Minuten transferFrom auf. Gestohlene Tokens gehen an Drainer-Adresse. Phase 5 — Obfuskation: Tokens werden über mehrere Hops an andere Drainer-Adressen verteilt, durch Mixer (Tornado Cash, wenn nicht sanktioniert auf der genutzten Chain) geschickt, über Bridges auf andere Chains transferiert, und schließlich an CEXs ohne KYC oder an OTC-Desks verkauft. Die Obfuskation ist oft automatisiert. Forensik kann die Flüsse teilweise zurückverfolgen, aber Recovery ist selten möglich — außer bei sehr großen Beträgen, bei denen Exchanges kooperieren oder bei staatlich koordinierten Operationen.
</details>

---

## Modul-Zusammenfassung

In Modul 2 hast du das Sicherheits-Fundament gelegt, das alle weiteren Aktivitäten in DeFi trägt:

**Kryptographische Basis:** Private Key → Public Key → Adresse, Einbahnstraße. Seed-Phrase als Master-Schlüssel, der über BIP-39/BIP-44 deterministisch alle abgeleiteten Keys generiert.

**Seed-Phrase-Storage:** Drei Bedrohungen (Diebstahl, Zerstörung, Zugangsverlust). Vier Optionen (Papier, Metall, Shamir, Passphrase). Empfehlung skaliert mit Kapitalgröße. Inheritance-Plan gehört dazu.

**Signatur-Gefahren:** Transaction, Message, Typed Data. Typed Data (Permit, Permit2) ist der gefährlichste Typ — kein Gas, unklare UI, spätere Ausnutzung. Der Bybit-Hack 2025 als Lehrbeispiel: 1,5 Mrd. USD, selbst Multisig mit Hardware-Wallets ist nicht narrensicher ohne Clear-Signing und Simulation.

**Approval-Hygiene:** Das approve/transferFrom-Pattern, Unlimited-Approval-Risiko, Drainer-Anatomie in vier Phasen. Monatlicher Audit mit revoke.cash ist nicht optional.

**Hardware-Wallets und Multisig:** Hardware-Wallet gegen Malware-Key-Diebstahl. Safe-Multisig gegen Single-Point-of-Failure einzelner Signaturen. Kombination ab niedrigen 4-stelligen Beträgen empfohlen.

**Drei-Wallet-Modell:** Vault für Cold Storage, DeFi-Wallet für aktive Positionen, Transaktions-Wallet für Experimente. Kapital-Verteilung etwa 70/25/5 als Ausgangspunkt. Isoliert experimentelle Verluste von der Substanz.

**Monatliche Routine:** Approval-Audit, Position-Check, Updates, Backup-Check. Sicherheit ist Disziplin, nicht Setup.

**Notfall-Plan:** Bei Kompromittierungsverdacht — sofort Assets zu neuer Wallet, Positionen schließen, Approvals widerrufen, dann Ursachenanalyse. Geschwindigkeit entscheidet.

**Das Sicherheits-Mindset:** Annahme der Kompromittierung, Langsamkeit ist Sicherheit („Slow is Security"), keine Rettung im Nachhinein möglich. Prävention ist alles.

**Was in Modul 3 kommt:** Blockchain-Mechanik. Wie Gas funktioniert (EIP-1559, Burn-Mechanismus). Was EIP-4844-Blobs für L2-Gebühren bedeuten. Der ERC-20-Token-Standard im Detail. Etherscan als Untersuchungs-Tool. Mit dem Sicherheits-Fundament aus Modul 2 kannst du ab Modul 3 selbst in kritische Protokoll-Details schauen, ohne dich zu gefährden.

---

*Ende von Modul 2.*