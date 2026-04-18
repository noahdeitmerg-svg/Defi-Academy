# Token-Approvals und Drainer-Angriffe

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Das approve/transferFrom-Pattern von ERC-20-Tokens erklären
- Die Anatomie eines Drainer-Angriffs in vier Phasen aufschlüsseln
- Einen systematischen Approval-Audit mit revoke.cash durchführen
- Die vier Drainer-Varianten (klassische Approval, Permit, setApprovalForAll, direkter Transfer) nach Risiko einordnen
- Die Lehren aus dem Mark-Cuban-Vorfall (September 2023) auf die eigene Wallet-Hygiene übertragen
- Gift-Token und Dusting-Attacks als indirekten Drainer-Vektor erkennen und defensiv handhaben

## Erklärung

Token-Approvals sind absolut notwendig, damit DeFi funktioniert — und gleichzeitig der häufigste Angriffsvektor für Drainer. Diese Lektion erklärt das Pattern und die Verteidigung.

**Das approve/transferFrom-Pattern**

Der ERC-20-Standard definiert zwei Funktionen, die zusammen das Approval-System bilden:

1. `approve(spender, amount)` — Der Token-Besitzer sagt dem Token-Contract: "Die Adresse `spender` darf bis zu `amount` meiner Tokens bewegen."
2. `transferFrom(from, to, amount)` — Der Spender kann dann innerhalb des approved Limits Tokens von `from` zu beliebiger Adresse senden.

Warum das notwendig ist: Smart Contracts können nicht auf deine Tokens zugreifen, ohne dass du es explizit zulässt. Ein DEX, der einen Swap durchführen will, braucht erst Approval, dann kann er `transferFrom` aufrufen.

**Das Standard-Problem: Unlimited Approvals**

Viele DApps fordern "unlimited approval" — also `amount = 2^256 - 1`, praktisch unendlich. Begründung: keine erneuten Approvals bei Folgetransaktionen, kein zusätzliches Gas.

**Das Risiko:** Wenn du einer DApp unlimited Approval für USDC gibst und die DApp später gehackt wird (oder bösartig war), kann der Angreifer alle deine USDC abziehen — jetzt oder Monate später. Die Approval bleibt bestehen, bis du sie explizit widerrufst.

**Drainer-Angriffe: Die vier Phasen**

Drainer sind Smart Contracts, die systematisch Nutzer bestehlen. Der typische Ablauf:

**Phase 1: Köder**
Der Nutzer landet auf einer bösartigen Website. Vektoren:
- Phishing-Link (E-Mail, Discord-DM, Twitter-Reply)
- Gefälschtes Google-Ad für eine bekannte DApp (häufig)
- Kompromittiertes Protokoll-Frontend (selten, aber passiert)
- Airdrop-Scam mit Aufforderung, eine Site zu besuchen

**Phase 2: Connect und Signatur**
Die Site fordert Wallet-Connection und Signatur. Je nach Drainer-Variante:

- *Variante A (klassisch):* Unlimited Approval für einen Token auf die Drainer-Adresse
- *Variante B (Permit):* Off-chain Permit-Signatur, später on-chain ausgeführt
- *Variante C (setApprovalForAll bei NFTs):* Approval für alle NFTs einer Collection
- *Variante D (Direkter Transfer):* Seltener, weil UI verdächtiger

**Phase 3: Transfer**
Nach erfolgter Approval ruft der Drainer-Contract `transferFrom` auf und zieht Tokens ab. Typischerweise Sekunden bis Minuten nach der Approval.

**Phase 4: Obfuskation**
Gestohlene Tokens werden durch Mixer, Bridges oder Wash-Trades gewaschen, um Rückverfolgung zu erschweren.

**Beispiel: Der Mark-Cuban-Vorfall (September 2023)**

Der Unternehmer Mark Cuban verlor etwa 870.000 USD an einen Drainer. Mutmaßlicher Vektor: eine gefälschte MetaMask-Extension, die er statt der echten herunterlud. Der Angreifer kontrollierte damit die Wallet und nutzte bestehende Approvals, die Cuban legitimen Protokollen gegeben hatte, um Tokens zu transferieren.

**Lehre:** Auch ohne neue Signaturen kann eine kompromittierte Wallet via bestehender Approvals ausgeraubt werden. Deshalb ist Approval-Hygiene selbst bei perfektem Signatur-Verhalten wichtig.

**Mitigation: Der Approval-Audit**

Systematische Approval-Hygiene ist der wichtigste präventive Schritt.

**Schritt 1: Approval-Übersicht**
- Gehe auf **revoke.cash**
- Verbinde deine Wallet (nur Read-Only für Anzeige)
- Revoke.cash listet alle bestehenden Approvals

**Schritt 2: Bewertung jeder Approval**
- Kennst du das Protokoll?
- Ist die Approval-Höhe angemessen oder "unlimited"?
- Nutzt du das Protokoll noch?

**Schritt 3: Widerruf überflüssiger Approvals**
- Klick "Revoke" bei Approvals, die du nicht mehr brauchst
- Jeder Revoke ist eine On-Chain-Transaktion, kostet Gas
- Priorisiere nach Approval-Höhe und Bekanntheit des Spenders

**Schritt 4: Regelmäßige Wiederholung**
- Mindestens monatlich
- Immer nach dem Testen neuer Protokolle
- Bei Verdacht auf Kompromittierung: sofort

**Verteidigungs-Werkzeuge**

1. **Rabby Wallet** — zeigt bei jeder Transaktion aktuelle und neue Approvals, warnt bei bekannten Bedrohungen
2. **revoke.cash** — Standard-Tool für Approval-Management
3. **Tenderly** — Transaction-Simulation für komplexe Fälle
4. **Pocket Universe / Wallet Guard** — Browser-Erweiterungen mit Echtzeit-Warnungen
5. **Hardware-Wallet** — physische Bestätigung verhindert Remote-Signierung

**Das Gift-Token-Problem**

Verwandtes Problem: manchmal tauchen in deiner Wallet unbekannte Tokens auf, die du nicht gekauft hast ("Dusting Attacks"). Die Namen oder Websites dieser Tokens laden oft zu Aktionen ein — "Claim your reward", "Swap for ETH". Wenn du mit diesen Tokens interagierst, ruft der Token-Contract typischerweise Approval-Signaturen an.

**Regel:** Unbekannte Tokens nicht antasten. Nicht swappen, nicht approven, nicht claimen. Einfach ignorieren.

## Folien-Zusammenfassung

**[Slide 1]** Titel: Token-Approvals und Drainer-Angriffe

**[Slide 2]** Das approve/transferFrom-Pattern: Besitzer approves, Spender transferFrom. Notwendig für DeFi.

**[Slide 3]** Unlimited Approval: Standard-Default, komfortabel, aber langfristig riskant. Bleibt bestehen bis Widerruf.

**[Slide 4]** Vier Drainer-Phasen: Köder, Connect+Signatur, Transfer, Obfuskation.

**[Slide 5]** Vier Drainer-Varianten: klassische Approval, Permit, setApprovalForAll, direkter Transfer.

**[Slide 6]** Mark-Cuban-Fall: 870.000 USD verloren durch gefälschte Extension und Ausnutzung bestehender Approvals.

**[Slide 7]** Approval-Audit-Workflow: revoke.cash → Bewerten → Widerrufen → Monatlich wiederholen.

**[Slide 8]** Gift-Token-Regel: Unbekannte Tokens nicht antasten.

## Sprechertext

**[Slide 1]** Token-Approvals sind der häufigste Vektor für Drainer-Angriffe. Gleichzeitig notwendig für DeFi. Du musst das Pattern verstehen, um dich zu schützen.

**[Slide 2]** Das ERC-20-Pattern: approve und transferFrom. Der Besitzer gibt dem Spender die Erlaubnis, bis zu einem Betrag Tokens zu bewegen. Der Spender kann dann transferFrom nutzen. Ohne diesen Mechanismus könnten DEXs, Lending-Protokolle und andere DApps nicht mit deinen Tokens arbeiten.

**[Slide 3]** Standard-Problem: viele DApps fordern Unlimited Approval — der maximale Wert. Begründung: keine Folge-Approvals, weniger Gas. Risiko: bei späterem Hack oder Bösartigkeit kann der Angreifer alle Tokens ziehen. Approval bleibt bis zum expliziten Widerruf bestehen.

**[Slide 4]** Drainer-Angriffe laufen in vier Phasen. Phase eins: Köder — bösartige Website, Phishing, gefälschte Ads. Phase zwei: Connect und Signatur. Phase drei: Transfer via transferFrom, Sekunden nach Approval. Phase vier: Obfuskation durch Mixer und Bridges.

**[Slide 5]** Vier Varianten. Klassisch: On-Chain-Approval. Permit: off-chain, kein Gas, besonders tückisch. setApprovalForAll für NFTs: eine Signatur öffnet ganze Collection. Direkter Transfer: seltener, UI oft verdächtig. Variante B und C sind die häufigsten.

**[Slide 6]** Beispiel Mark Cuban, September 2023. 870.000 Dollar verloren durch mutmaßlich gefälschte MetaMask-Extension. Der Angreifer kontrollierte damit die Wallet und nutzte bestehende, legitime Approvals. Lehre: auch ohne neue Signaturen kann kompromittierte Wallet ausgeraubt werden.

**[Slide 7]** Der Approval-Audit. Schritt eins: revoke.cash, Wallet verbinden, Approvals anzeigen. Schritt zwei: jede Approval bewerten. Schritt drei: widerrufen, was du nicht mehr brauchst. Schritt vier: monatlich wiederholen. Nach Kompromittierungsverdacht sofort.

**[Slide 8]** Zusatzregel: Gift-Tokens. Unbekannte Tokens in deiner Wallet? Nicht antasten. Keine Swaps, keine Approvals, keine Claims. Jede Interaktion kann eine Falle sein.

## Visuelle Vorschläge

**[Slide 1]** Titelfolie.
**[Slide 2]** Diagramm: Nutzer → approve → Token-Contract. Nutzer → swap-Call → DEX-Contract → transferFrom → Token-Contract.
**[Slide 3]** Beispiel-Unlimited-Approval-Anzeige in Wallet. Warnsymbol.
**[Slide 4]** Vier-Phasen-Timeline mit beispielhaften Screens pro Phase.
**[Slide 5]** Vier Varianten-Karten mit Gefahrenstufen.
**[Slide 6]** **SCREENSHOT SUGGESTION:** Nachrichtenartikel zum Mark-Cuban-Vorfall oder Etherscan-Transaction des Drains.
**[Slide 7]** **SCREENSHOT SUGGESTION:** revoke.cash-Interface mit realer Approval-Liste und Revoke-Button.
**[Slide 8]** Beispiel-Gift-Token in Wallet mit "Do not interact"-Icon.

## Übung

**Aufgabe: Approval-Audit deiner Wallet**

1. Gehe auf **revoke.cash**.
2. Verbinde deine Wallet (nur Read-Only für die Anzeige).
3. Analysiere die angezeigte Approval-Liste.
4. Für jede Approval notiere:
 - Spender (welches Protokoll?)
 - Token
 - Höhe (unlimited oder spezifisch?)
 - Status: notwendig / überflüssig / unbekannt

**Optional:** Widerrufe überflüssige Approvals (kostet Gas).

**Deliverable:** Tabelle mit mindestens 5 Zeilen, inklusive deiner Entscheidung pro Approval.

## Quiz

**Frage 1:** Ein Protokoll fordert Unlimited Approval für USDC. Was ist der rationalste Ansatz?

<details>
<summary>Antwort anzeigen</summary>

Die Approval geben, wenn das Protokoll vertrauenswürdig ist (etabliert, auditiert, hoher TVL) und häufig genutzt wird — aber gleichzeitig monatliche Approval-Audits durchführen und die Approval sofort widerrufen, wenn das Protokoll nicht mehr genutzt wird. Alternativ: eine limitierte Approval in Höhe der aktuellen Transaktion (mehr Gas, aber sicherer). Die Wahl hängt von Nutzungsfrequenz und Risiko-Toleranz ab. Für kleine Beträge und häufige Nutzung ist Unlimited praktisch; für große Beträge oder seltene Nutzung ist Limited sicherer.
</details>

**Frage 2:** Warum ist ein Permit-basierter Drainer (Variante B) besonders gefährlich im Vergleich zu klassischem Approval-Drainer (Variante A)?

<details>
<summary>Antwort anzeigen</summary>

Drei Gründe. Erstens: die Permit-Signatur ist off-chain und kostet kein Gas — das Abschreckungssignal einer On-Chain-Transaktion fehlt. Zweitens: die Wallet-Anzeige einer Permit-Signatur (Typed Data) ist oft weniger klar als bei einer Transaction-Signatur; die Felder werden nicht immer verständlich dargestellt. Drittens: die Permit-Signatur kann zeitverzögert ausgenutzt werden — der Angreifer reicht sie Sekunden oder Stunden später on-chain ein, wodurch das Opfer den Zusammenhang zwischen "Ich habe nur eingeloggt" und dem späteren Verlust oft nicht erkennt.
</details>

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 8 Slides: Titel → approve/transferFrom → Unlimited Approval → 4 Drainer-Phasen → 4 Drainer-Varianten → Mark-Cuban-Fall → Approval-Audit-Workflow → Gift-Token-Regel
- `voice_script.txt` — *Voice Narration Script* (120–140 WPM, Zielvideo 10–12 Min.)
- `visual_plan.json` — approve-Flussdiagramm, Unlimited-Approval-Screenshot, Vier-Phasen-Timeline, Mark-Cuban-Artikel, revoke.cash-Interface, Gift-Token-Beispiel

Pipeline: Gamma → ElevenLabs → CapCut.

---
