# Modul 1: DeFi Grundlagen

Modul-ID: 01-defi-grundlagen
Beschreibung: Einführung in die Grundkonzepte von Decentralized Finance. Du lernst, was DeFi ist, wie es funktioniert und warum es relevant ist.
Anzahl Lektionen: 6

---

## Lektion 1: Was ist DeFi?

Lektions-ID: 01-was-ist-defi
Pfad-Schlüssel: 01-defi-grundlagen/01-was-ist-defi
Lernziele:

- Definition von DeFi verstehen
- Unterschiede zu traditioneller Finanz
- Grundprinzipien erkennen

Kernkonzepte: Decentralized Finance, Smart Contracts, Permissionless

### Inhalt

## Einführung

Decentralized Finance (DeFi) bezeichnet Finanzdienstleistungen, die auf öffentlichen Blockchains laufen und ohne zentrale Vermittler funktionieren.

## Kernmerkmale

DeFi-Protokolle sind typischerweise: permissionless, transparent und komponierbar.

## Exercise

Überlege: Welche drei Unterschiede zwischen einem traditionellen Bankkonto und einem DeFi-Wallet fallen dir ein?

### Quiz (quiz.json)

Vollständige Rohdaten (für didaktischen Kontext):

```json
{
  "lessonId": "01-was-ist-defi",
  "questions": [
    {
      "id": 1,
      "question": "Was bedeutet 'permissionless' im DeFi-Kontext?",
      "options": [
        "Nur verifizierte Nutzer haben Zugang",
        "Jeder kann ohne Erlaubnis teilnehmen",
        "Es gibt keine Regeln",
        "Transaktionen sind kostenlos"
      ],
      "correctIndex": 1,
      "explanation": "Permissionless bedeutet, dass kein Gatekeeper den Zugang kontrolliert."
    },
    {
      "id": 2,
      "question": "Was unterscheidet DeFi von traditionellem Banking?",
      "options": [
        "DeFi nutzt Smart Contracts statt Intermediäre",
        "DeFi ist immer günstiger",
        "DeFi garantiert höhere Renditen",
        "DeFi benötigt keine Wallet"
      ],
      "correctIndex": 0,
      "explanation": "Der Kernunterschied liegt in der Nutzung von Smart Contracts statt menschlicher Vermittler."
    },
    {
      "id": 3,
      "question": "Was heißt 'komponierbar' bei DeFi-Protokollen?",
      "options": [
        "Die UI kann angepasst werden",
        "Protokolle können miteinander kombiniert werden",
        "Der Code ist öffentlich",
        "Transaktionen lassen sich rückgängig machen"
      ],
      "correctIndex": 1,
      "explanation": "Komponierbarkeit erlaubt es, Protokolle wie Bausteine zusammenzusetzen."
    }
  ]
}
```

---

## Lektion 2: DeFi, TradFi und CeFi

Lektions-ID: 02-lektion
Pfad-Schlüssel: 01-defi-grundlagen/02-lektion
Lernziele:

- CeFi und TradFi von DeFi abgrenzen
- Typische Vermittlerrollen erkennen

Kernkonzepte: TradFi, CeFi, DeFi

### Inhalt

## Einordnung

Traditionelle Finanz (TradFi) und zentralisierte Krypto-Börsen (CeFi) unterscheiden sich in Gatekeeping und Transparenz von öffentlichen DeFi-Protokollen.

## Merksatz

DeFi setzt auf Smart Contracts und öffentliche Ledger — nicht auf einzelne Institutionen als Vertrauensanker.

### Quiz (quiz.json)

Vollständige Rohdaten (für didaktischen Kontext):

```json
{
  "lessonId": "02-lektion",
  "questions": [
    {
      "id": 1,
      "question": "Was ist die zentrale Kernaussage zu „DeFi, TradFi und CeFi“?",
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

## Lektion 3: Smart Contracts als Bausteine

Lektions-ID: 03-lektion
Pfad-Schlüssel: 01-defi-grundlagen/03-lektion
Lernziele:

- Den Zweck von Smart Contracts in DeFi nennen
- Unveränderlichkeit vs. Upgrade-Pfade einordnen

Kernkonzepte: Smart Contract, On-Chain-Logik, Upgradeability

### Inhalt

## Funktion

Smart Contracts führen Regeln deterministisch aus, sobald Transaktionen sie ansprechen.

## Risiko

Fehler im Code sind oft genauso „final“ wie korrekte Logik — daher Audits und minimalistische Oberflächen.

### Quiz (quiz.json)

Vollständige Rohdaten (für didaktischen Kontext):

```json
{
  "lessonId": "03-lektion",
  "questions": [
    {
      "id": 1,
      "question": "Was ist die zentrale Kernaussage zu „Smart Contracts als Bausteine“?",
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

## Lektion 4: Liquidität und Märkte — Überblick

Lektions-ID: 04-lektion
Pfad-Schlüssel: 01-defi-grundlagen/04-lektion
Lernziele:

- Liquidität als Voraussetzung für DeFi-Märkte verstehen
- AMM vs. Orderbuch grob unterscheiden

Kernkonzepte: Liquidität, AMM, Orderbuch

### Inhalt

## Märkte

Dezentrale Märkte brauchen tiefe Liquidität, sonst steigen Slippage und Manipulationsrisiko.

## Ausblick

Details zu AMMs und Pools folgen in den Mechanik-Modulen — hier reicht das strukturelle Bild.

### Quiz (quiz.json)

Vollständige Rohdaten (für didaktischen Kontext):

```json
{
  "lessonId": "04-lektion",
  "questions": [
    {
      "id": 1,
      "question": "Was ist die zentrale Kernaussage zu „Liquidität und Märkte — Überblick“?",
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

## Lektion 5: Risiken in DeFi

Lektions-ID: 05-lektion
Pfad-Schlüssel: 01-defi-grundlagen/05-lektion
Lernziele:

- Technische, ökonomische und Bedienfehler unterscheiden
- Keine Einzelfall-Illusion: Systemrisiken nennen

Kernkonzepte: Smart-Contract-Risiko, Oracle, Bedienfehler

### Inhalt

## Risikokategorien

Technik (Bugs, Oracles), Ökonomie (Incentives, Kaskaden) und menschliche Fehler (Phishing, falsche Netzwerke) überlagern sich.

## Haltung

Risiko transparent machen schlägt Marketing-Versprechen — das ist didaktischer Kern der Akademie.

### Quiz (quiz.json)

Vollständige Rohdaten (für didaktischen Kontext):

```json
{
  "lessonId": "05-lektion",
  "questions": [
    {
      "id": 1,
      "question": "Was ist die zentrale Kernaussage zu „Risiken in DeFi“?",
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

## Lektion 6: Souverän einsteigen

Lektions-ID: 06-lektion
Pfad-Schlüssel: 01-defi-grundlagen/06-lektion
Lernziele:

- Checkliste vor der ersten On-Chain-Aktion
- Testnet vs. Mainnet einordnen

Kernkonzepte: Wallet, Testnet, Transaktionskosten

### Inhalt

## Pragmatisches Vorgehen

Kleine Beträge, klare Ziele, dokumentierte Schritte — und immer die Möglichkeit des Totalverlusts mitdenken.

## Exercise

Schreibe drei persönliche No-Gos (z. B. Seed im Klartext speichern), bevor du Mainnet nutzt.

### Quiz (quiz.json)

Vollständige Rohdaten (für didaktischen Kontext):

```json
{
  "lessonId": "06-lektion",
  "questions": [
    {
      "id": 1,
      "question": "Was ist die zentrale Kernaussage zu „Souverän einsteigen“?",
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