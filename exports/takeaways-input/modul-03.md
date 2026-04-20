# Modul 3: Blockchain Mechanik

Modul-ID: 03-blockchain-mechanik
Beschreibung: Transaktionen, State, Finalität und Kosten — die technische Basis, auf der DeFi-Protokolle aufsetzen.
Anzahl Lektionen: 6

---

## Lektion 1: Transaktionen und State

Lektions-ID: 01-lektion
Pfad-Schlüssel: 03-blockchain-mechanik/01-lektion
Lernziele:
- State-Übergänge grob beschreiben
- Nonce und Sequenzierung verstehen

Kernkonzepte: Transaction, State, Nonce

### Inhalt

## Ablauf

Transaktionen ändern den globalen State; Validatoren/Miner sortieren und finalisieren sie nach Regeln des Netzwerks.

## Merke

„Pending“ ist kein Erfolg — erst Finalität zählt für Sicherheitslogik.

### Quiz (quiz.json)

Vollständige Rohdaten (für didaktischen Kontext):

```json
{
  "lessonId": "01-lektion",
  "questions": [
    {
      "id": 1,
      "question": "Was ist die zentrale Kernaussage zu „Transaktionen und State“?",
      "options": [
        "Technik und Risiko transparent machen",
        "Renditen sind garantiert, wenn man früh dran ist",
        "DeFi braucht keine Wallet",
        "Smart Contracts sind immer reversibel"
      ],
      "correctIndex": 0,
      "explanation": "Didaktischer Kern bleibt: Mechanik und Risiko ehrlich benennen — keine Garantien."
    },
    {
      "id": 2,
      "question": "Welche Haltung passt zu Self-Custody?",
      "options": [
        "Verantwortung für Schlüssel und Transaktionen liegt beim Nutzer",
        "Die Chain erstattet Verluste bei Bedienfehlern",
        "Seed Phrase in Notizen-App speichern ist Best Practice",
        "Phishing betrifft nur Börsen"
      ],
      "correctIndex": 0,
      "explanation": "Self-Custody bedeutet Eigenverantwortung für Schlüssel, Adressen und Verifikation."
    }
  ]
}
```

---

## Lektion 2: Konsens und Finalität

Lektions-ID: 02-lektion
Pfad-Schlüssel: 03-blockchain-mechanik/02-lektion
Lernziele:
- Finalität vs. probabilistische Sicherheit unterscheiden
- Reorgs als Risiko nennen

Kernkonzepte: Konsens, Finalität, Reorg

### Inhalt

## Einordnung

Je nach Chain und Konsensmechanismus unterscheidet sich, wie schnell Transaktionen als irreversibel gelten.

## DeFi-Relevanz

Brücken und Oracles reagieren unterschiedlich sensibel auf Reorgs — das ist Architekturrisiko.

### Quiz (quiz.json)

Vollständige Rohdaten (für didaktischen Kontext):

```json
{
  "lessonId": "02-lektion",
  "questions": [
    {
      "id": 1,
      "question": "Was ist die zentrale Kernaussage zu „Konsens und Finalität“?",
      "options": [
        "Technik und Risiko transparent machen",
        "Renditen sind garantiert, wenn man früh dran ist",
        "DeFi braucht keine Wallet",
        "Smart Contracts sind immer reversibel"
      ],
      "correctIndex": 0,
      "explanation": "Didaktischer Kern bleibt: Mechanik und Risiko ehrlich benennen — keine Garantien."
    },
    {
      "id": 2,
      "question": "Welche Haltung passt zu Self-Custody?",
      "options": [
        "Verantwortung für Schlüssel und Transaktionen liegt beim Nutzer",
        "Die Chain erstattet Verluste bei Bedienfehlern",
        "Seed Phrase in Notizen-App speichern ist Best Practice",
        "Phishing betrifft nur Börsen"
      ],
      "correctIndex": 0,
      "explanation": "Self-Custody bedeutet Eigenverantwortung für Schlüssel, Adressen und Verifikation."
    }
  ]
}
```

---

## Lektion 3: Gas, Gebühren, Priorität

Lektions-ID: 03-lektion
Pfad-Schlüssel: 03-blockchain-mechanik/03-lektion
Lernziele:
- Gas als Ressource erklären
- Base fee / Priority fee grob kennen

Kernkonzepte: Gas, Base Fee, Priority Fee

### Inhalt

## Ökonomie

Rechenarbeit und Speicherplatz kosten Gas; Märkte priorisieren Transaktionen über Gebote.

## UX

Nutzer sehen oft nur „hohe Gebühren“ — dahinter steckt Konkurrenz um Blockspace.

### Quiz (quiz.json)

Vollständige Rohdaten (für didaktischen Kontext):

```json
{
  "lessonId": "03-lektion",
  "questions": [
    {
      "id": 1,
      "question": "Was ist die zentrale Kernaussage zu „Gas, Gebühren, Priorität“?",
      "options": [
        "Technik und Risiko transparent machen",
        "Renditen sind garantiert, wenn man früh dran ist",
        "DeFi braucht keine Wallet",
        "Smart Contracts sind immer reversibel"
      ],
      "correctIndex": 0,
      "explanation": "Didaktischer Kern bleibt: Mechanik und Risiko ehrlich benennen — keine Garantien."
    },
    {
      "id": 2,
      "question": "Welche Haltung passt zu Self-Custody?",
      "options": [
        "Verantwortung für Schlüssel und Transaktionen liegt beim Nutzer",
        "Die Chain erstattet Verluste bei Bedienfehlern",
        "Seed Phrase in Notizen-App speichern ist Best Practice",
        "Phishing betrifft nur Börsen"
      ],
      "correctIndex": 0,
      "explanation": "Self-Custody bedeutet Eigenverantwortung für Schlüssel, Adressen und Verifikation."
    }
  ]
}
```

---

## Lektion 4: Accounts und Signaturen

Lektions-ID: 04-lektion
Pfad-Schlüssel: 03-blockchain-mechanik/04-lektion
Lernziele:
- EOA vs. Contract Account skizzieren
- Warum Signatur ≠ Zahlung ist

Kernkonzepte: EOA, Contract Account, EIP-712

### Inhalt

## Modelle

Externally Owned Accounts signieren Transaktionen; Contract Accounts führen Code aus.

## Phishing

Signatur-Requests können Berechtigungen erteilen — immer Inhalt und Domain prüfen.

### Quiz (quiz.json)

Vollständige Rohdaten (für didaktischen Kontext):

```json
{
  "lessonId": "04-lektion",
  "questions": [
    {
      "id": 1,
      "question": "Was ist die zentrale Kernaussage zu „Accounts und Signaturen“?",
      "options": [
        "Technik und Risiko transparent machen",
        "Renditen sind garantiert, wenn man früh dran ist",
        "DeFi braucht keine Wallet",
        "Smart Contracts sind immer reversibel"
      ],
      "correctIndex": 0,
      "explanation": "Didaktischer Kern bleibt: Mechanik und Risiko ehrlich benennen — keine Garantien."
    },
    {
      "id": 2,
      "question": "Welche Haltung passt zu Self-Custody?",
      "options": [
        "Verantwortung für Schlüssel und Transaktionen liegt beim Nutzer",
        "Die Chain erstattet Verluste bei Bedienfehlern",
        "Seed Phrase in Notizen-App speichern ist Best Practice",
        "Phishing betrifft nur Börsen"
      ],
      "correctIndex": 0,
      "explanation": "Self-Custody bedeutet Eigenverantwortung für Schlüssel, Adressen und Verifikation."
    }
  ]
}
```

---

## Lektion 5: Oracles und On-Chain-Daten

Lektions-ID: 05-lektion
Pfad-Schlüssel: 03-blockchain-mechanik/05-lektion
Lernziele:
- Oracle-Problem benennen
- Manipulations- und Ausfallrisiken einordnen

Kernkonzepte: Oracle, On-Chain, Off-Chain

### Inhalt

## Problem

Smart Contracts brauchen externe Daten — die Brücke nach außen ist Angriffs- und Fehlerfläche.

## DeFi

Preis-Feeds steuern Liquidationen und AMMs — Oracle-Design ist Kernrisiko, nicht Nebensache.

### Quiz (quiz.json)

Vollständige Rohdaten (für didaktischen Kontext):

```json
{
  "lessonId": "05-lektion",
  "questions": [
    {
      "id": 1,
      "question": "Was ist die zentrale Kernaussage zu „Oracles und On-Chain-Daten“?",
      "options": [
        "Technik und Risiko transparent machen",
        "Renditen sind garantiert, wenn man früh dran ist",
        "DeFi braucht keine Wallet",
        "Smart Contracts sind immer reversibel"
      ],
      "correctIndex": 0,
      "explanation": "Didaktischer Kern bleibt: Mechanik und Risiko ehrlich benennen — keine Garantien."
    },
    {
      "id": 2,
      "question": "Welche Haltung passt zu Self-Custody?",
      "options": [
        "Verantwortung für Schlüssel und Transaktionen liegt beim Nutzer",
        "Die Chain erstattet Verluste bei Bedienfehlern",
        "Seed Phrase in Notizen-App speichern ist Best Practice",
        "Phishing betrifft nur Börsen"
      ],
      "correctIndex": 0,
      "explanation": "Self-Custody bedeutet Eigenverantwortung für Schlüssel, Adressen und Verifikation."
    }
  ]
}
```

---

## Lektion 6: Skalierung — Kurzüberblick

Lektions-ID: 06-lektion
Pfad-Schlüssel: 03-blockchain-mechanik/06-lektion
Lernziele:
- L2/Rollup als Idee kennen
- Komplexität für Nutzer nennen

Kernkonzepte: L2, Rollup, Bridging

### Inhalt

## Motivation

Hoher Durchsatz und geringere Kosten treiben L2 — mit neuer Vertrauenskette und Bridge-Risiko.

## Exercise

Nenne ein UX-Risiko, wenn Nutzer Mainnet- und L2-Adressen verwechseln.

### Quiz (quiz.json)

Vollständige Rohdaten (für didaktischen Kontext):

```json
{
  "lessonId": "06-lektion",
  "questions": [
    {
      "id": 1,
      "question": "Was ist die zentrale Kernaussage zu „Skalierung — Kurzüberblick“?",
      "options": [
        "Technik und Risiko transparent machen",
        "Renditen sind garantiert, wenn man früh dran ist",
        "DeFi braucht keine Wallet",
        "Smart Contracts sind immer reversibel"
      ],
      "correctIndex": 0,
      "explanation": "Didaktischer Kern bleibt: Mechanik und Risiko ehrlich benennen — keine Garantien."
    },
    {
      "id": 2,
      "question": "Welche Haltung passt zu Self-Custody?",
      "options": [
        "Verantwortung für Schlüssel und Transaktionen liegt beim Nutzer",
        "Die Chain erstattet Verluste bei Bedienfehlern",
        "Seed Phrase in Notizen-App speichern ist Best Practice",
        "Phishing betrifft nur Börsen"
      ],
      "correctIndex": 0,
      "explanation": "Self-Custody bedeutet Eigenverantwortung für Schlüssel, Adressen und Verifikation."
    }
  ]
}
```

