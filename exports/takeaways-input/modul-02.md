# Modul 2: Wallets & Sicherheit

Modul-ID: 02-wallets-sicherheit
Beschreibung: Schlüsselverwaltung, Hardware- vs. Software-Wallets, gängige Angriffsvektoren und pragmatische Absicherung.
Anzahl Lektionen: 6

---

## Lektion 1: Schlüssel, Adressen, Accounts

Lektions-ID: 01-lektion
Pfad-Schlüssel: 02-wallets-sicherheit/01-lektion
Lernziele:
- Public Key / Private Key grob erklären
- Warum die Seed Phrase kritisch ist

Kernkonzepte: Private Key, Adresse, Account-Modell

### Inhalt

## Grundlagen

Wallets verwalten Schlüssel; Adressen empfangen Assets. Wer den Private Key hat, kontrolliert die Mittel.

## Exercise

Erkläre in einem Satz, warum „Password vergessen“ bei Self-Custody anders ist als bei einer Web-App.

### Quiz (quiz.json)

Vollständige Rohdaten (für didaktischen Kontext):

```json
{
  "lessonId": "01-lektion",
  "questions": [
    {
      "id": 1,
      "question": "Was ist die zentrale Kernaussage zu „Schlüssel, Adressen, Accounts“?",
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

## Lektion 2: Hot- vs. Cold-Wallets

Lektions-ID: 02-lektion
Pfad-Schlüssel: 02-wallets-sicherheit/02-lektion
Lernziele:
- Convenience vs. Sicherheit abwägen
- Typische Nutzungsszenarien zuordnen

Kernkonzepte: Hot Wallet, Cold Storage, Air-Gap

### Inhalt

## Abgrenzung

Hot Wallets sind für aktive Nutzung da, Cold Storage für längerfristige Bestände und geringere Angriffsfläche.

## Praxis

Tagesbudget im Hot Wallet, Kernbestand getrennt halten — ohne Dogmatik, aber mit klaren Grenzen.

### Quiz (quiz.json)

Vollständige Rohdaten (für didaktischen Kontext):

```json
{
  "lessonId": "02-lektion",
  "questions": [
    {
      "id": 1,
      "question": "Was ist die zentrale Kernaussage zu „Hot- vs. Cold-Wallets“?",
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

## Lektion 3: Seed Phrase und Backup

Lektions-ID: 03-lektion
Pfad-Schlüssel: 02-wallets-sicherheit/03-lektion
Lernziele:
- Backup-Regeln formulieren
- Social-Recovery nur kritisch betrachten

Kernkonzepte: Seed Phrase, Backup, Social Recovery

### Inhalt

## Regeln

Niemals fotografieren oder in Clouds unverschlüsselt ablegen. Physische Redundanz, Zugang nur vertrauenswürdigen Personen.

## Exercise

Liste zwei Backup-Fehler, die du in der Praxis gesehen oder für plausibel hältst.

### Quiz (quiz.json)

Vollständige Rohdaten (für didaktischen Kontext):

```json
{
  "lessonId": "03-lektion",
  "questions": [
    {
      "id": 1,
      "question": "Was ist die zentrale Kernaussage zu „Seed Phrase und Backup“?",
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

## Lektion 4: Phishing und Social Engineering

Lektions-ID: 04-lektion
Pfad-Schlüssel: 02-wallets-sicherheit/04-lektion
Lernziele:
- Gängige Angriffsmuster erkennen
- Verifikationsgewohnheiten entwickeln

Kernkonzepte: Phishing, Fake-Support, Clipboard-Hijacking

### Inhalt

## Muster

Dringlichkeit, gefälschte Domains, gefakte Browser-Extensions — Angreifer zielen auf menschliche Fehler.

## Gegenmittel

Lesezeichen, Hardware-Wallet-Bestätigung, Misstrauen gegenüber „Hilfe“ im DM.

### Quiz (quiz.json)

Vollständige Rohdaten (für didaktischen Kontext):

```json
{
  "lessonId": "04-lektion",
  "questions": [
    {
      "id": 1,
      "question": "Was ist die zentrale Kernaussage zu „Phishing und Social Engineering“?",
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

## Lektion 5: Hardware-Wallets in der Praxis

Lektions-ID: 05-lektion
Pfad-Schlüssel: 02-wallets-sicherheit/05-lektion
Lernziele:
- Transaktionssignatur auf dem Gerät verstehen
- Firmware- und Supply-Chain-Risiken nennen

Kernkonzepte: Hardware-Wallet, Secure Element, Firmware

### Inhalt

## Nutzen

Die Signatur passiert auf isolierter Hardware — Phishing muss zusätzlich physische/psychologische Hürden überwinden.

## Risiko

Falsche Firmware, manipulierte Lieferketten — daher nur offizielle Kanäle und Checksummen prüfen.

### Quiz (quiz.json)

Vollständige Rohdaten (für didaktischen Kontext):

```json
{
  "lessonId": "05-lektion",
  "questions": [
    {
      "id": 1,
      "question": "Was ist die zentrale Kernaussage zu „Hardware-Wallets in der Praxis“?",
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

## Lektion 6: Operations-Hygiene

Lektions-ID: 06-lektion
Pfad-Schlüssel: 02-wallets-sicherheit/06-lektion
Lernziele:
- Mindest-Checkliste für Alltag und Reisen
- Multisig nur als Konzept kennen

Kernkonzepte: Hygiene, Multisig, Notfallplan

### Inhalt

## Alltag

Separate Geräte/Profile für DeFi vs. Leisure, Updates, wenige vertrauenswürdige Apps.

## Exercise

Formuliere einen einzeiligen Notfallplan: Was tust du, wenn du dein Haupttelefon verlierst?

### Quiz (quiz.json)

Vollständige Rohdaten (für didaktischen Kontext):

```json
{
  "lessonId": "06-lektion",
  "questions": [
    {
      "id": 1,
      "question": "Was ist die zentrale Kernaussage zu „Operations-Hygiene“?",
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

