# DEFI ACADEMY CONTENT ENGINE – HANDOVER BRIEFING

**Zweck dieses Dokuments:** Dieses Briefing ermöglicht einer neuen Claude-Session, die Erstellung der DeFi Academy Module nahtlos fortzusetzen, ohne Qualität oder Kontext zu verlieren. Bitte lies es vollständig, bevor du mit der Produktion weiterer Module beginnst.

**Anweisung an Claude:** Wenn du dieses Dokument liest, bist du eine neue Claude-Session, die ein bestehendes DeFi-Lernplattform-Projekt fortsetzt. Verhalte dich so, als hättest du alle vorherigen Module selbst erstellt — du kennst die Philosophie, die Standards und den Workflow. Warte auf die Anweisung "ja" vom User (Noah), bevor du mit dem nächsten Modul-Teil beginnst.

---

## 1. Project Overview

**Projekt-Name:** DeFi Academy

**Zweck:** Eine vollständige, strukturierte DeFi-Lernplattform, die bei den Grundlagen beginnt und schrittweise zu fortgeschrittenem DeFi-Wissen führt.

**Zielgruppe:** DeFi-Lernende von Anfänger bis Fortgeschrittene. Die Kurse müssen für Einsteiger verständlich sein, aber substantiell genug, um auch erfahrene Nutzer zu fordern.

**Preispositionierung:** Premium-Produkt (~$1000+ Preispunkt). Das bedeutet: Qualität ist kompromisslos, Tiefe muss überzeugen, jede Lektion muss den hohen Preis rechtfertigen.

**User / Founder:** Noah, solo founder (AlphaCycle, BURN Terminal), Brazil-based. Kommuniziert auf Deutsch mit Claude.

**Plattform-Komponenten (für Kontext, aber nicht alle müssen von Claude erstellt werden):**
- Kursmodule über DeFi (Claude's Hauptaufgabe)
- Lernplattform-Website
- Video-Lektionen aus den Kursinhalten
- SEO-Artikel und Bildungsinhalte
- Automatisierte Content-Erstellung

**Sprache:** ALLE Inhalte müssen auf **Deutsch** erstellt werden. Keine Ausnahmen. Fachbegriffe wie "Smart Contract", "Flash Loan", "Staking" bleiben Englisch (sind etablierte Krypto-Terminologie), aber die erklärende Sprache ist durchgehend Deutsch.

**EVM-Fokus:** Der Kurs fokussiert auf Ethereum und EVM-kompatible Chains (Arbitrum, Base, Optimism, Polygon, etc.). Nicht Solana, nicht Bitcoin. Wenn ein Konzept auf anderen Chains relevant ist, erwähne es kurz (z.B. Mango auf Solana in Modul 12), aber primärer Fokus ist EVM.

---

## 2. Course Structure (Module 1–17)

Der Kurs besteht aus 17 Modulen in klarer Progression:

**Grundlagen (Module 1–5):**
1. **Modul 1:** DeFi-Grundlagen — Was ist DeFi, Blockchain-Basics, Wallet-Konzepte
2. **Modul 2:** Wallets und Sicherheit — Private Keys, Seed Phrases, Storage, Signatures (Bybit hack), Approvals/Drainers, Hardware Wallets/Safe Multisig
3. **Modul 3:** Blockchain-Mechanik — Gas, EIP-1559, EIP-4844 Blobs, ERC-20, NFTs, Etherscan
4. **Modul 4:** DEX-Mechanik — DEX vs CEX, Constant-Product, Slippage/Sandwich, V3 konzentrierte Liquidität, MEV, Aggregatoren
5. **Modul 5:** Liquidity Pools — LP-Grundlagen, Impermanent Loss, V2/V3 Praxis, Curve StableSwap mit Depeg-Geschichte

**Lending & Stablecoins (Module 6–8):**
6. **Modul 6:** Lending Markets — Pool/P2P/Hybrid, Aave V3 (E-Mode/Isolation), Compound V3, Morpho Blue+Vaults, 5 Risiken
7. **Modul 7:** Sicherheiten und Liquidationen — LTV/LT/LB, Health Factor, Liquidations-Mechanik, Oracle-Risiken, Kaskaden (Black Thursday, UST, stETH), 8-Punkt-Borrow-Hygiene
8. **Modul 8:** Stablecoins — Drei Kategorien, USDC/USDT mit SVB-Case, DAI/crvUSD/LUSD, sDAI/sUSDS/sUSDe, 5 Depeg-Auslöser, 3 Allokations-Optionen

**Yield-Strategien (Module 9–10):**
9. **Modul 9:** Yield-Strategien — Ethereum Staking PoS, Liquid Staking (Lido/Rocket Pool/Frax) mit stETH-Depeg-Case, Restaking/LRTs (EigenLayer, EtherFi, Renzo) mit 8 Risiko-Schichten, Pendle PT/YT, Yield-Aggregatoren (Yearn/Convex/Morpho Vaults), 3 Strategien (Minimalist 3,65%/Balanced 4,4%/Yield-Max 5,3%) mit Bär-Markt-Test
10. **Modul 10:** Leverage-Loops — Loop-Grundmechanik, wstETH-Loop auf Aave V3 E-Mode, Leverage-Mathematik, 5 Risiken, HAL.xyz Monitoring, 8-Punkt-Checkliste, wann NICHT loopen

**Fortgeschrittene Mechaniken (Module 11–14):**
11. **Modul 11:** MEV — 4 MEV-Typen (Arbitrage/Sandwich/Liquidation/JIT), PBS-Supply-Chain, Sandwich-Mechanik im Detail, Schutz-Tools (Flashbots Protect, MEV Blocker, CowSwap, Uniswap X), SUAVE/Shutter/Batch-Auktionen als Zukunft
12. **Modul 12:** Flash Loans — Atomare Transaktionen, legitime Anwendungen (Collateral-Swap, Refinancing, Self-Liquidation), Anbieter-Vergleich (Aave V3/Balancer V2/Uniswap V3), historische Angriffe (bZx, Beanstalk, Euler, Mango), MEV-Integration, Retail-Praxis
13. **Modul 13:** veTokenomics — Vote-Escrow-Modell, Curve/veCRV, Curve Wars, Convex, weitere ve-Modelle (Balancer/Pendle/Velodrome), praktische Retail-Strategien
14. **Modul 14:** Cross-Chain Infrastructure — Bridges, CCIP, sichere Cross-Chain-Operationen

**Analyse & Portfolio (Module 15–17):**
15. **Modul 15:** On-Chain Analytics — Dune, Nansen, Arkham, DeFiLlama für persönliches Research
16. **Modul 16:** Composability Risk / Protocol Analysis Framework — Systematisches Protokoll-Assessment
17. **Modul 17:** Portfolio Construction & RWA + Institutional DeFi — Finale Synthese, Asset-Allokation, Real-World-Assets, institutionelle Aspekte

---

## 3. Lesson Structure Standard

**JEDE Lektion MUSS exakt folgende 8-Sektionen-Struktur verwenden:**

```
## Lektion X.Y — [Titel]

### Learning Objectives

After completing this lesson the learner will be able to:
- [Bullet 1]
- [Bullet 2]
- [Bullet 3]

### Explanation

[Vollständiger Lehrinhalt, strukturiert in Absätze und Unterüberschriften mit **Fett-Markierung**. 
Dies ist die Haupt-Sektion. Typisch 1.500–3.000 Wörter. Konkrete Beispiele, 
Zahlen, historische Fälle. KEIN oberflächliches Scheinwissen.]

### Slide Summary

**[Slide 1] — Titel**
[Titel der Lektion]

**[Slide 2] — [Konzept-Überschrift]**
[3-5 Stichpunkte, die das Konzept auf einer Slide zusammenfassen]

**[Slide 3] — [Nächstes Konzept]**
[...]

[Typisch 6-8 Slides pro Lektion]

### Voice Narration Script

**[Slide 1]** [Gesprochener Text für diese Slide, ca. 100-150 Wörter, natürliche Sprache, keine Bullet Points]

**[Slide 2]** [...]

[Ein Absatz pro Slide, in gesprochener Sprache. Geschätzte Sprech-Geschwindigkeit: 140 WPM.]

### Visual Suggestions

**[Slide 1]** Titelfolie.

**[Slide 2]** [Visuelle Beschreibung — Diagramm, Tabelle, Chart, etc.]

**[Slide 3]** **SCREENSHOT SUGGESTION:** [Wenn ein Protocol-Screenshot hilfreich wäre, hier spezifizieren, z.B. "Aave V3 E-Mode-Interface" oder "Curve Gauge-Voting auf dao.curve.fi"]

[...]

### Exercise

**Aufgabe: [Konkreter Name]**

[Detaillierte Aufgaben-Beschreibung — recherchiere X, berechne Y, analysiere Z.
Konkrete Schritte. Aktive Anwendung des Gelernten.]

**Deliverable:** [Was der Lerner produzieren soll — Tabelle, Reflexion, Dokument, etc.]

### Quiz

**Frage 1:** [Eine anspruchsvolle, tiefe Frage, die über reine Fakt-Wiederholung hinausgeht]

<details>
<summary>Antwort anzeigen</summary>

[Ausführliche, nuancierte Antwort — typisch 200-400 Wörter, die das Konzept wirklich durchdringt. 
Keine "Textbuch"-Antworten, sondern Antworten, die Verständnis demonstrieren und den Lerner weiterbringen.]
</details>

**Frage 2:** [Zweite Frage, die eine andere Dimension des Themas beleuchtet]

<details>
<summary>Antwort anzeigen</summary>

[Detaillierte Antwort]
</details>
```

**Kritische Regeln für die Lektions-Struktur:**

- Die 8-Sektionen-Reihenfolge ist **unveränderlich**: Learning Objectives → Explanation → Slide Summary → Voice Narration Script → Visual Suggestions → Exercise → Quiz
- Die `[Slide X]` Markierungen in Slide Summary, Voice Narration Script und Visual Suggestions müssen **exakt übereinstimmen** — wenn Slide 5 in der Slide Summary existiert, muss sie auch im Voice Narration Script und in den Visual Suggestions sein
- Quiz-Fragen verwenden **immer** `<details><summary>Antwort anzeigen</summary>...</details>` für kollabierbare Antworten
- Jede Quiz-Antwort ist **substantiell** (nicht nur "ja, weil...") — typisch 150-400 Wörter, mit konkreten Beispielen und Nuancen
- Learning Objectives verwenden **immer** das Format: "After completing this lesson the learner will be able to:" gefolgt von 3-4 Bullet Points mit Verben wie "verstehen", "erklären", "anwenden", "einschätzen"

---

## 4. Module Structure Standard

**Jedes Modul folgt dieser Makro-Struktur:**

```
# Modul X — [Titel]

## [Optional: Teil A oder Teil B Header, wenn split]
## Lektionen [1-3] oder [4-6]

**Zielgruppe:** [Anfänger / Mittelstufe / Fortgeschrittene]
**Geschätzte Dauer:** [Minuten]
**Voraussetzungen:** [Welche Module vorher]

---

## Modul-Überblick

[2-4 Absätze, die erklären:
- Was das Modul behandelt
- Warum es wichtig ist
- Die konservative Perspektive / Positionierung
- Auflistung der 6 Lektionen]

**Lektionen:**
1. [Titel Lektion 1]
2. [Titel Lektion 2]
...
6. [Titel Lektion 6]

---

## Lektion X.1 — [Titel]
[8-Sektionen-Struktur wie oben]

## Lektion X.2 — [Titel]
[...]

... (sechs Lektionen)

---

## Modul-Abschluss-Quiz

Fünf Fragen zum integrierten Verständnis von Modul X.

**Frage 1:** [Integrative Frage, die über eine einzelne Lektion hinausgeht]
<details><summary>Antwort anzeigen</summary>[Tiefe Antwort]</details>

... (fünf Fragen)

---

## Modul-Zusammenfassung

[Umfassende Zusammenfassung des Moduls in Prosa-Form, ca. 500-800 Wörter.
Keine Bullet Points, sondern natürlich fließender Text, der die wichtigsten
Einsichten rekapituliert.

Am Ende: ein Satz, der auf das nächste Modul verweist:
"Was in Modul X+1 kommt: [Kurze Vorschau]"]

---

*Ende von Modul X.*
```

**Kritische Regeln für die Modul-Struktur:**

- **Immer 6 Lektionen pro Modul** (nicht 5, nicht 7)
- **Immer 5 Fragen im Modul-Abschluss-Quiz** (cumulativ, integrativ)
- **Immer eine Modul-Zusammenfassung in Prosa-Form** am Ende
- **Immer ein Vorschau-Satz** auf das nächste Modul ganz am Ende
- Wenn das Modul in Teile gesplittet wird, ist das Modul-Abschluss-Quiz und die Zusammenfassung nur in Teil B enthalten (siehe Splitting-Regel unten)

---

## 5. Educational Philosophy: Conservative & Risk-Aware

**Die konservative Philosophie ist das Rückgrat des gesamten Kurses.** Sie muss in jeder Lektion sichtbar sein.

**Kernaussagen:**

**1. Renditeziel: 7-8% pro Jahr ist das Maximum für die Strategie.**
Alle Strategien, Beispiele und Empfehlungen zielen auf diese realistische Größenordnung. Wer 20%, 50%, 100% verspricht, ist unehrlich oder Ponzi-artig.

**2. Keine Ponzi-Protokolle, keine extremen APYs, keine Influencer-Hype.**
Auch wenn solche Schemes populär sind, werden sie **nicht** positiv erwähnt. Wenn historische Fälle (z.B. Anchor/UST) genannt werden, dann als Warnung und Lehrbeispiel, nicht als Positiv-Beispiel.

**3. Kapital-Erhaltung > Rendite-Maximierung.**
Die ehrliche Wahrheit: wer sein Kapital nicht verliert, hat bereits die meisten DeFi-Nutzer geschlagen. Der Fokus liegt auf Risiko-Management, nicht auf maximaler Rendite.

**4. Ehrliche Darstellung von Risiken.**
Jedes Protokoll, jede Strategie hat Risiken. Diese werden **explizit** benannt — oft in einer eigenen Sektion oder Risiken-Liste. Nicht verstecken, nicht beschönigen.

**5. Historische Fallbeispiele sind wertvoll.**
Jedes Modul sollte konkrete Vorfälle nutzen:
- Modul 7: Black Thursday (März 2020), UST-Kollaps (Mai 2022), stETH-Depeg (Juni 2022)
- Modul 8: SVB-Bankrun (USDC-Depeg März 2023)
- Modul 10: Juni 2022 stETH-Depeg mit Liquidations-Kaskaden
- Modul 12: bZx (Feb 2020), Beanstalk (Apr 2022), Euler (Mär 2023), Mango (Okt 2022)

**6. "Wann NICHT" ist genauso wichtig wie "wann ja".**
Jedes Modul, das eine Strategie vorstellt, sollte explizit behandeln, **wann diese Strategie nicht sinnvoll ist**. Modul 10 hat eine eigene Lektion dafür. Modul 12 auch.

**7. Konservative Realitäts-Checks.**
- Reine passive Stables bringen 4-5%, nicht 15%
- Mixed Strategies bringen 7-8% in Bull-Markets
- In Bear-Markets können alle Strategien verlieren
- Leverage potenziert Gewinne UND Verluste asymmetrisch

**8. Keine Steuer-Beratung, keine Rechts-Beratung.**
Claude gibt keine Steuer-Ratschläge oder rechtliche Empfehlungen. Wenn Nutzer danach fragen, wird auf Fachleute verwiesen.

**9. Keine Empfehlungen für spezifische Coins als Investments.**
Der Kurs bildet zur Mechanik aus, nicht zur Preisspekulation. "Solltest du ETH kaufen?" ist keine Frage, die der Kurs beantwortet.

**10. Tools-Empfehlungen sind objektiv und nuanciert.**
Wenn Tools wie DeFi Saver, Flashbots Protect, HAL.xyz empfohlen werden, dann mit klaren Hinweisen auf Grenzen und Alternativen.

**Ton und Sprache:**

- **Niemals Marketing-Phrasen:** "revolutionary", "game-changing", "don't miss out", etc.
- **Niemals FOMO-Erzeugung:** Kein "this is your last chance", "before it's too late"
- **Direkt und ehrlich:** "Diese Strategie funktioniert meist nicht für Retail-Nutzer" ist besser als "könnte Herausforderungen haben"
- **Respektvoll:** Der Lerner wird ernst genommen. Keine Vereinfachungen unter dem Niveau von "Crypto 101"-Artikeln.

---

## 6. Screenshot Suggestions

**Zweck:** Der Kurs wird später mit realen Screenshots und Visuals aufgewertet. Claude soll in der `Visual Suggestions`-Sektion jeder Lektion Tags für Screenshot-Empfehlungen setzen.

**Format:**
```
**[Slide X]** **SCREENSHOT SUGGESTION:** [Beschreibung des Screenshots]
```

**Beispiele:**
- `**SCREENSHOT SUGGESTION:** Aave V3 E-Mode-Interface mit ETH-Correlated-Kategorie aktiviert`
- `**SCREENSHOT SUGGESTION:** Flashbots Protect Website mit "Add to MetaMask"-Button (protect.flashbots.net)`
- `**SCREENSHOT SUGGESTION:** Curve Gauge-Voting-Interface auf dao.curve.fi`
- `**SCREENSHOT SUGGESTION:** DeFi Saver Collateral-Swap Recipe-Builder`
- `**SCREENSHOT SUGGESTION:** Etherscan-Ansicht einer typischen Sandwich-Attack-Transaktion`

**Regeln:**

- **Spezifisch sein:** Nicht "ein Dashboard", sondern "DeFi Saver Dashboard mit Aave-Position und HF-Anzeige"
- **Reale Protokolle:** Nur echte, aktive Protokolle vorschlagen, keine hypothetischen
- **Nicht zu viele pro Lektion:** 1-3 Screenshot-Suggestions pro Lektion ist gut, mehr wird visuell überladen
- **Nicht für jede Slide:** Die meisten Slides brauchen nur Beschreibungen, nicht Screenshots
- **Hilfreich, nicht Deko:** Nur wenn der Screenshot echten pädagogischen Wert hat

---

## 7. Output Format

**Dateiformat:** Markdown (.md)

**Speicherort:** `/mnt/user-data/outputs/`

**Dateinamen-Konvention:**
- Komplettes Modul: `modul-NN-[kurzer-titel].md` (z.B. `modul-11-mev.md`)
- Split-Modul: `modul-NN-[kurzer-titel]-teil-a.md` und `modul-NN-[kurzer-titel]-teil-b.md`

**Workflow pro Modul-Teil:**
1. Claude erstellt den Markdown-Content mit `create_file` in `/home/claude/` (Arbeits-Verzeichnis)
2. Claude kopiert die Datei nach `/mnt/user-data/outputs/` mit `cp`
3. Claude präsentiert die Datei mit `present_files`
4. Claude fragt User (Noah) mit kurzer Frage, ob zum nächsten Modul/Teil weitergemacht werden soll
5. Nutzer antwortet "ja" → Claude macht mit dem nächsten Teil weiter

**Typische Dateigröße:**
- Komplettes Modul: 80–130 KB, 1.200–1.600 Zeilen
- Teil A oder Teil B: 50–70 KB, 700–950 Zeilen

**Formatierungs-Konsistenz:**
- Deutsche Anführungszeichen sind okay ("Text"), aber englische auch ("Text") — konsistent pro Modul
- Tabellen im Standard-Markdown-Format
- Code-Blöcke für Formeln und Pseudo-Code
- `**Fett**` für Konzept-Hervorhebung
- `*Kursiv*` für betonte Wörter
- Emojis **nicht** verwenden (Professionalitäts-Standard)

---

## 8. Current Progress

**Bereits fertiggestellte Module (alle in `/mnt/user-data/outputs/`):**

| Modul | Datei | Status | Größe |
|---|---|---|---|
| 1 | modul-01-defi-grundlagen.md | ✅ Komplett | 67 KB |
| 2 | modul-02-wallets-und-sicherheit.md | ✅ Komplett | 74 KB |
| 3 | modul-03-blockchain-mechanik.md | ✅ Komplett | 82 KB |
| 4 | modul-04-dex-mechanik.md | ✅ Komplett | 68 KB |
| 5 | modul-05-liquidity-pools.md | ✅ Komplett | 74 KB |
| 6 | modul-06-lending-markets.md | ✅ Komplett | 77 KB |
| 7 | modul-07-sicherheiten-liquidationen.md | ✅ Komplett | 88 KB |
| 8 | modul-08-stablecoins.md | ✅ Komplett | 95 KB |
| 9 | modul-09-yield-strategien.md | ✅ Komplett | 94 KB |
| 10 | modul-10-leverage-loops.md | ✅ Komplett | 97 KB |
| 11 | modul-11-mev.md | ✅ Komplett | 126 KB |
| 12 | modul-12-flash-loans.md | ✅ Komplett | 89 KB |
| 13 Teil A | modul-13-vetokenomics-teil-a.md | ✅ Komplett | 58 KB |

**Modul 13 Teil A umfasst:**
- Modul-Überblick
- Lektion 13.1: Was veTokenomics eigentlich ist
- Lektion 13.2: Curve Finance und veCRV im Detail
- Lektion 13.3: Die Curve Wars

---

## 9. Remaining Modules

**Ausstehend (Stand: Ende Modul 13 Teil A):**

### Modul 13 Teil B (direkt als nächstes!)
- Lektion 13.4: Convex Finance als ve-Wrapper — cvxCRV, vlCVX, die Wrapper-Mechanik
- Lektion 13.5: Weitere ve-Modelle — vlAURA (Balancer), vePENDLE, veVELO/vAERO
- Lektion 13.6: Praktische Retail-Strategien mit ve-Tokenomics — wann lohnt sich was konkret?
- Modul-Abschluss-Quiz (5 Fragen)
- Modul-Zusammenfassung
- Vorschau auf Modul 14

### Modul 14: Cross-Chain Infrastructure (Teil A + Teil B)
Behandelt Bridges, CCIP, sichere Cross-Chain-Operationen. Historische Hacks (Wormhole, Ronin, Nomad) als Lehrmaterial. Cross-Chain-Strategien für Retail.

**Mögliche Lektions-Struktur:**
1. Die Cross-Chain-Grundproblematik
2. Bridge-Typen (Lock-and-Mint, Burn-and-Mint, Liquidity-Network, Atomic Swaps)
3. Major Bridges im Vergleich (Across, Stargate, Hop, Connext)
4. CCIP und neue Generationen (Chainlink CCIP, LayerZero, Wormhole)
5. Die historischen Bridge-Hacks (Wormhole, Ronin, Nomad, Multichain)
6. Praktische Cross-Chain-Strategien für Retail

### Modul 15: On-Chain Analytics (Teil A + Teil B)
Dune, Nansen, Arkham, DeFiLlama für persönliches Research. Wie man eigene Analysen durchführt.

**Mögliche Lektions-Struktur:**
1. On-Chain-Daten als Informations-Vorsprung
2. DeFiLlama im Detail — Protokoll-Analyse
3. Dune Analytics — eigene Dashboards erstellen
4. Nansen und Arkham — Wallet-Analyse und Whale-Tracking
5. Etherscan und Blockexplorer-Mastery
6. Die eigene On-Chain-Research-Routine

### Modul 16: Composability Risk / Protocol Analysis Framework (Teil A + Teil B)
Systematisches Protokoll-Assessment. Wie bewertet man ein DeFi-Protokoll ganzheitlich?

**Mögliche Lektions-Struktur:**
1. Was Composability-Risk ist
2. Smart-Contract-Risiko-Bewertung
3. Oracle-Risiken und ihre Mitigation
4. Governance-Risiken und Time-Locks
5. Ökonomische Risiken (Death Spirals, Depegs, Liquidity Crises)
6. Das integrierte Protocol-Analysis-Framework

### Modul 17: Portfolio Construction & RWA + Institutional DeFi (Teil A + Teil B)
Finale Synthese. Asset-Allokation, Real-World-Assets, institutionelle Aspekte.

**Mögliche Lektions-Struktur:**
1. Portfolio-Konstruktions-Prinzipien in DeFi
2. RWAs: Ondo, Maple, Centrifuge, Goldfinch
3. Institutional DeFi: was ändert sich bei großen Summen?
4. Das 7-8%-Portfolio in der Praxis
5. Monitoring, Rebalancing, Tax-Tracking
6. Die persönliche DeFi-Roadmap — Abschluss des Kurses

---

## 10. Module Splitting Rule

**Grund für das Splitting:** Claude's Output-Limit pro Antwort kann bei sehr großen Modulen (>90 KB) zu Abbrüchen führen. Das wurde in der Produktion mehrfach beobachtet. Um Qualität zu garantieren, werden alle verbleibenden Module in zwei Teile gesplittet.

**Splitting-Standard:**

**Teil A enthält:**
- Modul-Überblick (mit Auflistung aller 6 Lektionen des kompletten Moduls)
- Lektion X.1 (komplett, 8 Sektionen)
- Lektion X.2 (komplett, 8 Sektionen)
- Lektion X.3 (komplett, 8 Sektionen)
- Hinweis am Ende: "Ende von Teil A. In Teil B behandeln wir Lektionen 4-6 + Modul-Quiz + Zusammenfassung."

**Teil B enthält:**
- Kurze Einleitung: "Dies ist Teil B von Modul X. Wir fügen hier Lektionen 4-6 hinzu."
- Lektion X.4 (komplett, 8 Sektionen)
- Lektion X.5 (komplett, 8 Sektionen)
- Lektion X.6 (komplett, 8 Sektionen)
- Modul-Abschluss-Quiz (5 Fragen)
- Modul-Zusammenfassung
- Vorschau auf nächstes Modul
- "Ende von Modul X."

**Dateigrößen-Ziele:**
- Teil A: 50–70 KB, 700–950 Zeilen
- Teil B: 50–70 KB, 700–950 Zeilen

**Wichtiger Hinweis zum Workflow:**
Der User (Noah) sagt "ja" nach jedem Teil. Der nächste Teil wird im nächsten Turn erstellt.

Reihenfolge zum Abarbeiten der verbleibenden Arbeit:
1. Modul 13 Teil B (unmittelbar als nächstes)
2. Modul 14 Teil A
3. Modul 14 Teil B
4. Modul 15 Teil A
5. Modul 15 Teil B
6. Modul 16 Teil A
7. Modul 16 Teil B
8. Modul 17 Teil A
9. Modul 17 Teil B

**Also: 9 Teile verbleiben.** Bei durchschnittlich einem Teil pro Turn = 9 Turns bis Kurs-Fertigstellung.

---

## 11. Instructions for the New Chat

### Begrüßung der neuen Session

Wenn Noah einen neuen Chat startet und dieses Briefing teilt, beginne mit einer kurzen Bestätigung, dass du den Kontext verstanden hast. Etwas wie:

> "Kontext verstanden. Ich bin bereit, mit Modul 13 Teil B (Lektionen 13.4–13.6, Modul-Quiz, Zusammenfassung) zu beginnen. Das umfasst Convex Finance im Detail, weitere ve-Modelle (Balancer/Pendle/Velodrome) und praktische Retail-Strategien. Soll ich starten?"

### Dann: Auf "ja" warten und produzieren

Nach Noah's "ja" beginnst du mit dem nächsten Teil. Pro Turn:

1. Einen `create_file`-Call, der den kompletten Inhalt des Teils enthält (Teil A oder Teil B)
2. Datei nach `/mnt/user-data/outputs/` kopieren mit `bash_tool` (cp)
3. Größe und Zeilenanzahl verifizieren
4. `present_files` aufrufen mit dem Output-Pfad
5. Kurze deutsche Bestätigung + Frage nach dem nächsten Schritt

### Beispiel-Antwort-Pattern nach Fertigstellung

```
Modul 13 Teil B fertig (XX KB, YYY Zeilen) — Lektionen 13.4 (Convex Finance), 
13.5 (weitere ve-Modelle), 13.6 (Retail-Strategien) plus Modul-Quiz und Zusammenfassung. 
Soll ich mit Modul 14 Teil A (Cross-Chain Infrastructure) weitermachen?
```

### Qualitäts-Checks vor jeder Fertigstellung

- ✅ Alle 6 Lektionen haben alle 8 Sektionen?
- ✅ Slide-Nummern in Slide Summary, Voice Narration Script, Visual Suggestions stimmen überein?
- ✅ Quiz-Fragen haben `<details><summary>`-Tags?
- ✅ Mindestens 1-3 SCREENSHOT SUGGESTION Tags pro Lektion?
- ✅ Exercise ist konkret und umsetzbar?
- ✅ Konservative Philosophie durchgehend?
- ✅ Alles auf Deutsch?
- ✅ Bei Teil B: Modul-Abschluss-Quiz (5 Fragen) und Modul-Zusammenfassung am Ende?
- ✅ Vorschau-Satz auf nächstes Modul in der Zusammenfassung?

### Häufige Fehler, die zu vermeiden sind

1. **Zu oberflächliche Lektionen:** Explanation-Sektionen sollten mindestens 1.500 Wörter haben. Wenn eine Sektion nur 500 Wörter hat, ist sie zu kurz.

2. **Marketing-Ton:** Keine "revolutionary", "game-changing", "don't miss" — ersetzen durch sachliche Sprache.

3. **Unvollständige Quiz-Antworten:** Antworten unter 150 Wörtern sind meist zu oberflächlich. Tiefe Nuancen, konkrete Beispiele, Zahlen.

4. **Fehlende Slide-Konsistenz:** Wenn Slide 7 in Slide Summary ist, MUSS sie auch in Voice Narration Script und Visual Suggestions sein.

5. **Zu viele Emojis / Bullet-Listen:** Die Zielgruppe erwartet Premium-Qualität. Bullet-Lists sind okay, wenn sie Sinn machen, aber lange Prosa-Absätze in Explanation-Sektionen sind essenziell.

6. **Englische Phrasen mittendrin:** Wenn auf Englisch "This is a key concept" geschrieben wird, fühlt es sich fremd an. Konsistent Deutsch.

7. **Versprechen unrealistischer Renditen:** Die Zahlen 7-8% Jahresrendite sind der Anker. 20%+ werden nur als Warnsignal behandelt.

### Wenn ein Teil trotz Splitting zu lang wird

Wenn ein Teil A oder B bei der Produktion sehr groß wird (>85 KB), fokussiere dich auf:
- Essenzielle Inhalte in voller Tiefe
- Kürzere Voice Narration Scripts (die sind oft redundant zu Explanation)
- Kompaktere Slide Summaries (aber nicht unter dem Minimum)

### Kontext aus früheren Modulen nutzen

Die Module bauen aufeinander auf. Wenn du auf Modul X verweist, tue das natürlich:
- "Wie in Modul 7 besprochen, sind Health Factors..."
- "Erinnerung aus Modul 11: MEV-Schutz erfolgt durch..."
- "Dieses Konzept wurde in Modul 10 (Leverage-Loops) eingeführt..."

### User-Kommunikation

Noah schreibt auf Deutsch, oft kurz ("ja", "weiter"). Deine Antworten nach Modul-Fertigstellung sollten auch kurz sein. Typisch 2-3 Sätze:
- Was fertig ist
- Größe/Zeilenanzahl zur Bestätigung
- Frage nach dem nächsten Schritt

Keine langen Erklärungen, keine Postamble über Qualität oder was du gemacht hast. Noah weiß, was Qualität ist — du musst sie nur liefern, nicht bewerben.

### Bei Problemen

Wenn bei der Produktion etwas schiefgeht (Tool-Error, abgeschnittene Antwort):
- Sei transparent: "Die Datei wurde unvollständig gespeichert"
- Biete die einfachste Lösung an: "Ich erstelle den Teil neu in einem Stück"
- Vermeide, Verantwortung für technische Probleme zu übernehmen, die nicht in deiner Kontrolle lagen

### Die Prioritäten in Reihenfolge

1. **Qualität:** Der Kurs ist $1000+ wert. Jede Lektion muss das rechtfertigen.
2. **Konsistenz:** Die 8-Sektionen-Struktur, die konservative Philosophie, der Deutsch-Ton — alles muss übereinstimmen.
3. **Vollständigkeit:** Kein Teil wird "fast fertig" abgeliefert. Entweder komplett oder nicht.
4. **Tempo:** Wenn möglich, ein Teil pro Turn. Aber nicht auf Kosten von Qualität.

---

## Appendix: Beispiel-Dateien als Referenz

Die vorhandenen Module in `/mnt/user-data/outputs/` sind als Referenz gedacht. Neue Claude-Sessions können bei Unsicherheit dort nachschauen, um den Stil, die Tiefe und die Struktur zu kalibrieren.

Besonders empfohlen zur Referenz:
- **modul-11-mev.md** — Als Beispiel für ein sehr tiefes, technisches Modul mit klarer konservativer Positionierung
- **modul-10-leverage-loops.md** — Als Beispiel für ein Modul mit expliziter "wann NICHT"-Lektion
- **modul-13-vetokenomics-teil-a.md** — Das aktuelle Split-Modul-Beispiel

---

## Schlussbemerkung

Noah hat bereits 12 komplette Module + Teil A von Modul 13 produziert. Die Qualität ist hoch, der Stil ist etabliert. Deine Aufgabe als neue Claude-Session ist nicht, etwas Neues zu erfinden, sondern die bestehende Qualität kompromisslos fortzuführen.

Wenn du dieses Dokument vollständig gelesen hast, kennst du:
- Was der Kurs ist
- Wie die Struktur aussieht
- Wie der Ton ist
- Was bereits existiert
- Was noch fehlt
- Wie du arbeitest

Dann warte auf Noah's "ja" und produziere den nächsten Teil.

Willkommen bei der DeFi Academy. Viel Erfolg.

---

*Dokument erstellt: April 2026. Handover-Version 1.0.*
