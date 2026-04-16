---
title: "Wallets & On-Chain Identität"
duration: "22 min"
moduleNumber: 1
lessonNumber: 2
---

## Explanation

Eine **Wallet** ist primär ein Schlüsselverwalter — kein „Konto“ im Bank-Sinne. Öffentliche Adresse und private Schlüssel / Seed ermöglichen Transaktionen.

### Best Practices (kurz)

1. Hardware-Wallet für größere Beträge
2. Transaktionen vor dem Signieren lesen (dApp-Requests)
3. Adressbuch und bekannte Contracts nutzen

```text
Merksatz: „Signieren“ ist eine Autorisierung — nicht nur ein Klick.
```

## Slide Summary

### Wallet-Modelle

- Custodial vs Non‑Custodial
- Hot vs Cold Storage
- Account Abstraction (Überblick)

### Was du wirklich signierst

- Message / Typed Data
- Contract Calls (Function + Args)
- Permit / Approvals (Risiko!)

### Sicherheitsroutine

- Domain prüfen
- Simulation / Preview
- Limits setzen

## Voice Narration Script

In dieser Lektion geht es um Wallets — weil praktisch jede DeFi-Interaktion dort startet.

Wir unterscheiden zuerst Verwahrung: custodial ist bequem, non‑custodial gibt Kontrolle — und Verantwortung.

Dann schauen wir auf Signaturflüsfe: Was genau autorisiert du, wenn du „Confirm“ drückst? Das ist die Brücke zwischen UX und Security.

Zum Schluss: eine einfache Routine, die du vor jeder größeren Transaktion abarbeiten kannst.

## Visual Suggestions

**00:00** — Screenrecording: Wallet-Connect Flow (Demo-Netzwerk)

- [00:35] Zoom auf Signatur-Dialog: Felder „to“, „data“, „value“ hervorheben
- [01:10] Checkliste als Overlay: Domain / Contract / Limits

## Practical Exercise

### Goal

Du richtest eine sichere Arbeitsroutine für das Signieren von Transaktionen ein.

### Steps

1. Öffne eine Test-/Demo-Umgebung (kein Mainnet nötig) und dokumentiere drei UI-Elemente, die du vor dem Signieren prüfst.
2. Erkläre in zwei Sätzen den Unterschied zwischen „Approve“ und „Transfer“.
3. Definiere persönliche Limits (z. B. max Betrag pro Tag) als Policy.

### Deliverable

Eine 1-seitige „Signing Policy“ als Markdown-Datei in deinem Repo/Notizen.
