# Die legitimen Anwendungen

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die fünf Haupt-Anwendungsfälle identifizieren
- Einen Collateral-Swap als konkretes Beispiel nachvollziehen
- Einschätzen, welche Anwendungen für normale Nutzer relevant sind
- Self-Liquidation als Mechanismus zur Vermeidung von Liquidations-Penalties verstehen
- Debt-Refinancing (Schulden-Umzug zwischen Lending-Protokollen) als Flash-Loan-Use-Case anwenden
- Gehebelte Positions-Eröffnungen mit Flash Loans gegenüber manuellem Looping nach Kosten und Risiken bewerten

## Erklärung

**Anwendung 1: Arbitrage**

Die häufigste legitime Nutzung. Searcher entdeckt Preis-Differenz zwischen DEXs und nutzt Flash Loan für die Arbitrage ohne eigenes Kapital.

**Beispiel:** ETH auf Uniswap 3.000 USDC, auf SushiSwap 3.020 USDC.
1. Flash-Loan: 1.000.000 USDC von Aave
2. Kaufe ETH auf Uniswap: 333,33 ETH
3. Verkaufe ETH auf SushiSwap: 1.006.667 USDC
4. Rückzahlung: 1.000.500 USDC (mit 0,05% Fee)
5. **Gewinn:** 6.167 USDC (minus Gas)

Arbitrage hält DEX-Preise synchron. Flash Loans demokratisieren die Aktivität — vorher nur für Akteure mit Millionen USD Arbeitskapital.

**Anwendung 2: Liquidationen**

Ähnliches Muster für Liquidations-Bots.

**Beispiel:** Aave-Position unter Liquidations-Schwelle, 100 ETH Sicherheit, 250.000 USDC Schuld.
1. Flash-Loan: 250.000 USDC (Balancer, 0% Fee)
2. Liquidiere Position: zahle Schuld, erhalte 96 ETH + 5% Bonus = 100,8 ETH Wert
3. Verkaufe 90 ETH auf DEX: 252.000 USDC
4. Rückzahlung Flash Loan: 250.000 USDC
5. **Gewinn:** 2.000 USDC + 10,8 ETH übrig

Ohne Flash Loan hätte der Liquidator 250.000 USD Eigen-Kapital gebraucht.

**Anwendung 3: Collateral-Swap (relevant für Retail!)**

Du hast Sicherheit + Schuld, willst Sicherheits-Art ändern ohne Position aufzulösen.

**Beispiel:** 10 ETH als Sicherheit auf Aave, 15.000 USDC Schuld. Wechsel zu 10 wstETH.

**Ohne Flash Loan:** 15.000 USDC Schuld zurückzahlen, 10 ETH abziehen, 10 ETH staken (12-36h Wartezeit), 10 wstETH hinterlegen, wieder 15.000 USDC borgen. **Probleme:** Zwischenzustände ungesichert, Staking-Wartezeit, 5 Transaktionen, hohe Gas-Kosten.

**Mit Flash Loan (via DeFi Saver):**
1. Flash Loan: 10 ETH
2. Swap 10 ETH → 10 wstETH auf Curve
3. Hinterlege 10 wstETH als Sicherheit
4. Entferne 10 ETH Sicherheit
5. Rückzahlung Flash Loan mit 10 ETH

**Alles in einer Transaktion.** Keine Zwischenzustände, keine Wartezeit, ~80-150 USD Gas.

**Anwendung 4: Debt-Refinancing**

Schulden zu günstigerem Protokoll migrieren.

**Beispiel:** 50.000 USDC Schuld auf Aave bei 5,5% APR, Compound bietet 3,8%.
1. Flash Loan: 50.000 USDC von Balancer
2. Zahle Aave-Schuld
3. Sicherheit (z.B. 5 WBTC) von Aave auf Compound transferieren
4. Borge 50.000 USDC von Compound
5. Rückzahlung Flash Loan

**Einsparung:** (5,5% - 3,8%) × 50.000 = 850 USD/Jahr. Gas-Kosten ~100 USD amortisieren sich in Wochen.

**Anwendung 5: Self-Liquidation (Notfall-Tool)**

Position kurz vor Liquidations-Schwelle. Externe Liquidation kostet 5-15% Bonus an den Liquidator. Self-Liquidation vermeidet das.

**Beispiel:** 10 ETH Sicherheit, 25.000 USDC Schuld, ETH bei 2.800 → HF gefährlich bei 1,05.
1. Flash Loan: 25.000 USDC
2. Zahle Schuld zurück
3. Entferne 10 ETH (kein Liquidations-Bonus, keine externe Liquidation)
4. Verkaufe 8,93 ETH × 2.800 = 25.000 USDC
5. Rückzahlung Flash Loan
6. **Ergebnis:** du behältst 1,07 ETH (~3.000 USDC)

**Vergleich mit externer Liquidation:** Liquidator hätte 5% Bonus bekommen (0,45 ETH ~ 1.260 USDC). Durch Self-Liquidation behältst du den Betrag.

**Anwendung 6: Fortgeschrittene Portfolio-Operationen**

Für erfahrene Nutzer: Multi-Protocol-Rebalancing, Farming-Position-Migration, Emergency Exit bei drohendem Protokoll-Hack.

**Relevanz-Matrix**

| Anwendung | Retail-Relevanz |
|---|---|
| Arbitrage | Niedrig (Searcher) |
| Liquidationen | Niedrig (Searcher) |
| Collateral-Swap | **Hoch** |
| Debt-Refinancing | **Hoch** |
| Self-Liquidation | **Notfall** |
| Portfolio-Operations | Mittel |

Für alle brauchst du entweder Programmierung oder ein Aggregator-Tool.

## Folien-Zusammenfassung

**[Slide 1] — Titel**
Die legitimen Anwendungen

**[Slide 2] — Arbitrage**
Preis-Diff zwischen DEXs
Searcher nutzen Flash Loan
Demokratisiert Aktivität
Hält DEX-Preise synchron

**[Slide 3] — Liquidationen**
Unterbesicherte Positionen abwickeln
Flash Loan → Schuld zahlen → Bonus
Ohne Flash Loan: Eigen-Kapital nötig

**[Slide 4] — Collateral-Swap**
ETH → wstETH ohne Position aufzulösen
Eine Transaktion statt 5
Relevant für Retail

**[Slide 5] — Debt-Refinancing**
Schulden zu günstigerem Protokoll
Aave → Compound
Signifikante Einsparungen

**[Slide 6] — Self-Liquidation**
Sich selbst liquidieren
Vermeidet 5-15% Bonus
Notfall-Tool

**[Slide 7] — Retail-Tools und Relevanz**
DeFi Saver (defisaver.com), Instadapp, Furucombo
Arbitrage/Liquidation: niedrig für Retail
Collateral-Swap/Refinancing: hoch
Self-Liquidation: Notfall

## Sprechertext

**[Slide 1]** Jenseits von MEV haben Flash Loans legitime produktive Anwendungen. Diese Lektion zeigt die wichtigsten, mit Fokus auf Retail-Relevanz.

**[Slide 2]** Anwendung 1: Arbitrage. ETH auf Uniswap 3.000, auf SushiSwap 3.020. Flash Loan 1 Million USDC: kauft 333 ETH auf Uniswap, verkauft auf SushiSwap für 1,0067 Millionen, zahlt zurück plus 500 Dollar Fee. Gewinn 6.167 Dollar in einer Transaktion ohne Eigen-Kapital. Demokratisiert Arbitrage.

**[Slide 3]** Anwendung 2: Liquidationen. Unterbesicherte Position auf Aave. Flash Loan in Größe der Schuld. Zahlt zurück, bekommt Sicherheit plus 5-15 Prozent Bonus. Ohne Flash Loan hätten Liquidatoren Hunderttausende Eigen-Kapital gebraucht.

**[Slide 4]** Anwendung 3: Collateral-Swap — für normale Nutzer relevant. Du hast 10 ETH Sicherheit, möchtest zu wstETH ohne 15.000 USDC Schuld aufzulösen. Ohne Flash Loan: 5 Transaktionen, Zwischenzustände ungesichert, Staking-Wartezeit. Mit Flash Loan via DeFi Saver: alles in einer Transaktion, 80-150 Dollar Gas.

**[Slide 5]** Anwendung 4: Debt-Refinancing. Schulden auf Aave zu 5,5 Prozent, Compound bietet 3,8 Prozent. Mit Flash Loan in einer Transaktion alles migrieren. Einsparung 1,7 Prozent mal Schuld-Größe. Bei 50.000 Dollar sind das 850 Dollar pro Jahr.

**[Slide 6]** Anwendung 5: Self-Liquidation, Notfall-Tool. Position nahe Liquidations-Schwelle. Externe Liquidation kostet 5 bis 15 Prozent Bonus. Self-Liquidation via Flash Loan vermeidet das. Kann mehrere Tausend Dollar sparen.

**[Slide 7]** Tools für Retail-Nutzer und ihre Relevanz. DeFi Saver als umfassendstes Angebot mit Drag-and-Drop-UI, Instadapp Lite für Ein-Klick-Lösungen, Furucombo als Visual Builder für eigene Logik — alle kostenlos oder mit kleinen Service-Gebühren. Die Relevanz-Matrix für Retail: Arbitrage und Liquidation sind niedrig — das überlassen normale Nutzer den professionellen Searchern. Collateral-Swap und Refinancing sind hoch relevant — bei Portfolio-Umstrukturierungen oder Zins-Optimierung. Self-Liquidation ist eine Notfall-Option. Die praktische Empfehlung: DeFi Saver als Tool im Portfolio-Toolkit haben, für spezifische Situationen einsetzen.

## Visuelle Vorschläge

**[Slide 1]** Titelfolie.
**[Slide 2]** Arbitrage-Flow mit Zahlen-Beispiel.
**[Slide 3]** Liquidations-Flow mit HF-Darstellung.
**[Slide 4]** **SCREENSHOT SUGGESTION:** DeFi Saver Collateral-Swap-Interface.
**[Slide 5]** Debt-Migration-Diagramm Aave → Compound.
**[Slide 6]** Self-Liquidation vs. externe Liquidation Vergleich.
**[Slide 7]** Zwei-Spalten-Layout: links **SCREENSHOT SUGGESTION** Furucombo Visual-Builder, rechts Relevanz-Matrix tabellarisch.

## Übung

**Aufgabe: Collateral-Swap-Simulation**

Besuche [app.defisaver.com](https://app.defisaver.com). Simuliere (Papier-Planung) folgendes Szenario:

Du hast 5 ETH als Sicherheit auf Aave V3 (Wert 15.000 USD), 6.000 USDC Schuld, willst zu 5 wstETH wechseln.

Plane:
1. Welches Tool?
2. Flash-Loan-Größe?
3. Swap-Route ETH → wstETH?
4. Geschätzte Gas-Kosten und Slippage?
5. Risiken?

**Deliverable:** Schritt-für-Schritt-Plan + Reflexion (5-8 Sätze).

## Quiz

**Frage 1:** Vier Faktoren, die ein Nutzer vor Debt-Refinancing via Flash Loan prüfen sollte?

<details>
<summary>Antwort anzeigen</summary>

Faktor 1: Gas-Kosten-Amortisation. Wenn 2% Einsparung 1.000 USD/Jahr und Gas 150 USD kostet, amortisiert in 55 Tagen — akzeptabel. Bei 200 USD/Jahr und 200 USD Gas: ein Jahr — Grenze. Faustregel: Amortisation in 3-6 Monaten. Faktor 2: Liquiditäts-Verfügbarkeit auf dem Ziel-Protokoll. Compound muss genug USDC-Liquidität für Borrow haben, sonst merkliche Slippage. Prüfe auf DeFiLlama die Pool-Größen. Faktor 3: Nachhaltigkeit des Zinsvorteils. Ist 3,8% dauerhaft oder momentan? Prüfe historische Zins-Charts. Wenn momentan und typisch bei 5% normalisiert, ist die Einsparung illusorisch. Faktor 4: Zusätzliche Risiken des neuen Protokolls. Smart-Contract-Audits, Governance-Strukturen, Oracle-Verwendung, Notfall-Features. Wenn das neue Protokoll 2% günstiger ist, aber signifikant höheres Risiko trägt, ist die Einsparung ein schlechter Risk-adjusted-Trade. Bonus: LT-Unterschied zwischen Protokollen — HF kann sich bei Migration verschlechtern, auch wenn die Schulden identisch sind. Zeit-Investment für Due Diligence: 30-60 Minuten pro Refinancing. Wer das investiert, trifft fundierte Entscheidungen.
</details>

**Frage 2:** Warum ist Self-Liquidation oft teurer als manuelles Deleveraging, aber billiger als externe Liquidation?

<details>
<summary>Antwort anzeigen</summary>

Die Kosten-Hierarchie: **Manuelles Deleveraging (beste Option):** 250-500 USD Kosten bei 50k Teil-Deleveraging. Gas ~50 USD, Swap-Fee 0,1-0,5%, niedrige Slippage. Frühzeitig durchgeführt, wenn HF noch bei 1,8+. **Self-Liquidation (mittlere Option):** 1.000-3.000 USD bei 100k Position. Flash-Loan-Fee (Balancer 0%, Aave 250 USD), Gas für komplexe TX 150-300 USD, Swap-Fees 0,3-0,5%, Slippage in volatilen Märkten 1-2%. **Externe Liquidation (schlimmste):** 5.000-8.000 USD bei 100k Position. Liquidations-Bonus 5-8%, potenzielle suboptimale Verkaufs-Preise. Self-Liquidation ist "teurer" als manuelles Deleveraging wegen Complexity (mehrere Contract-Interactions, mehr Gas) und Dringlichkeit (höhere Slippage). "Billiger" als externe Liquidation, weil kein Liquidations-Bonus anfällt. Die praktische Lehre: erste Wahl ist monitoring + rechtzeitiges Deleveragen bei HF unter 1,8. Zweite Wahl: Self-Liquidation wenn zu spät, HF unter 1,2. Dritte, ungewollte Option: externe Liquidation. Die 4.000-7.000 USD Differenz auf einer 100.000-Position rechtfertigt den Aufwand, DeFi Saver zu kennen. Pro-aktives Risikomanagement schlägt reaktives Self-Liquidation, aber Self-Liquidation ist wichtiges Notfall-Tool.
</details>

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → Arbitrage → Liquidationen → Collateral-Swap → Debt-Refinancing → Self-Liquidation → Retail-Tools und Relevanz
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — Anwendungsfälle-Matrix, Collateral-Swap-Flowchart, Self-Liquidation-Diagramm, Debt-Refinancing-Szenario, Kostenhierarchie-Vergleich

Pipeline: Gamma → ElevenLabs → CapCut.

---
