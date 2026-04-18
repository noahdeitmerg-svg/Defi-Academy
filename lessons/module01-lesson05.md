# Die sieben Kernrisiken in DeFi

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die sieben Kernrisiken in DeFi identifizieren und voneinander abgrenzen
- Verstehen, wie sich diese Risiken in der Praxis manifestieren
- Eine erste Risikobewertung für eine beliebige DeFi-Position durchführen
- Smart Contract Risk, Oracle Risk, Liquidation Risk, Depeg Risk, Rug Pull Risk, Composability Risk und User Risk anhand realer historischer Beispiele erklären
- Ein Risikoprofil einer konkreten Position (z.B. USDC-Supply vs. stETH-Loop) als Matrix aufstellen
- Mitigationsstrategien pro Risikodimension benennen und in eine konkrete Position einbauen

## Erklärung

Die größte Gefahr in DeFi ist nicht, ein Risiko einzugehen — sondern ein Risiko einzugehen, das du nicht kennst. Wir gehen jetzt systematisch durch die sieben Kernrisiken. Jedes wird in späteren Modulen vertieft; hier bekommst du den Überblick.

**Risiko 1: Smart-Contract-Risiko**

Ein Fehler im Code eines Smart Contracts kann Kapital zerstören oder einen Exploit ermöglichen. Smart Contracts sind unveränderlich — wenn ein Bug entdeckt wird, kann der Code (ohne Upgrade-Mechanismus) nicht gefixt werden. Hacks wie der Ronin-Bridge-Hack (2022, 625 Mio. USD) oder der Poly-Network-Hack (2021, 611 Mio. USD) zeigen die Größenordnung.

Mitigation: Bevorzuge Protokolle mit mehreren unabhängigen Audits, langer Live-History und transparenten Bug-Bounties.

**Risiko 2: Oracle-Risiko**

Viele Protokolle brauchen externe Preisdaten (z.B. für Liquidationen). Diese Daten liefern **Oracles** — Systeme, die Preise von externen Märkten on-chain bringen. Wenn ein Oracle manipuliert oder fehlerhaft ist, kann das Protokoll in den falschen Zustand gebracht werden. Klassisches Beispiel: Flashloan-Angriffe auf Protokolle mit dünnen Oracle-Preisen.

Mitigation: Bevorzuge Protokolle, die robuste Oracles wie Chainlink mit mehreren Preisquellen verwenden.

**Risiko 3: Liquidationsrisiko**

Wenn du einen Kredit mit Sicherheiten aufgenommen hast und der Wert der Sicherheiten fällt, kannst du liquidiert werden — deine Sicherheiten werden unter Abschlag verkauft, um den Kredit zu decken. Bei volatilen Märkten können Liquidationen schnell eskalieren.

Mitigation: Arbeite mit konservativen Loan-to-Value-Ratios. Behandeln wir tief in Modul 7.

**Risiko 4: Depeg-Risiko (Stablecoins und Pegged Assets)**

Stablecoins sollen einen Peg halten. Wenn sie ihn verlieren, bist du als Halter oder LP direkt betroffen. USDC depeggte kurz im März 2023 (SVB-Krise). UST brach vollständig zusammen im Mai 2022. stETH depeggte temporär im Juni 2022.

Mitigation: Diversifikation über verschiedene Stablecoin-Typen. Depegs treten oft schnell auf; frühe Exits sind entscheidend.

**Risiko 5: Rug Pull / Exit Scam**

Ein Team startet ein Protokoll, zieht Kapital an und flüchtet mit den Geldern. Das geschieht vorwiegend bei kleineren, nicht-auditierten Protokollen. Varianten: "Soft Rugs" über schleichende Admin-Privilegien, "Hard Rugs" über direkte Funktion zum Abzug.

Eine weitere Variante ist das sogenannte Admin-Upgrade-Risiko. Ein Protokoll kann einen Upgrade-Mechanismus besitzen, der es dem Team erlaubt, den Smart-Contract-Code zu verändern. Wenn dieser Mechanismus missbraucht wird, kann ein zuvor sicheres Protokoll nachträglich manipuliert werden.

Mitigation: Nur etablierte Protokolle mit verifiziertem Team und öffentlicher Governance nutzen.

**Risiko 6: Komponierbarkeits-Risiko**

In Lektion 1.2 eingeführt: Wenn ein tief liegendes Protokoll bricht, können darauf aufbauende Positionen kaskadieren. Ein Liquid-Staking-Token-Depeg kann Lending-Positionen liquidieren, die wiederum LP-Positionen beeinträchtigen.

Mitigation: Stack-Tiefe deiner Positionen bewusst begrenzen. Behandeln wir in Modul 16.

**Risiko 7: User Risk (Nutzerfehler)**

Falsche Adresse, falsche Chain, falsche Signatur, kompromittierter Seed — der Nutzer selbst ist oft die Schwachstelle. Schätzungen besagen, dass mehr Kapital durch Nutzerfehler verloren geht als durch Protokoll-Hacks.

Mitigation: Hardware-Wallets, Multisig-Setups, Test-Transaktionen mit kleinen Beträgen. Modul 2 komplett.

**Die Risiko-Matrix**

Jede DeFi-Position hat ein Profil aus diesen sieben Risiken. Eine einfache Lending-Position auf Aave hat primär Smart-Contract-, Oracle-, Liquidations- und User Risk. Eine gehebelte Liquid-Staking-Loop-Position auf Aave mit stETH hat alle sieben Risiken gleichzeitig — weil sie zwei Protokolle über mehrere Hops verkettet (Lido für Liquid Staking, Aave für Borrow, Re-Stake, Loop) — jeder Hop multipliziert die Oberflächenfläche für Risiken.

Deine Aufgabe als DeFi-Nutzer ist nicht, Risiken zu vermeiden — sondern sie bewusst einzugehen und zu bepreisen.

## Folien-Zusammenfassung

**[Slide 1] — Titel**
Die sieben Kernrisiken in DeFi

**[Slide 2] — Protokoll-Ebene (Teil 1): Smart Contract & Oracle**
Smart Contract Risk: Bugs im Code → Kapitalverlust. Beispiele: Ronin (625M), Poly Network (611M).
Oracle Risk: Manipulierte oder fehlerhafte Preisdaten → falsche Protokoll-Zustände. Typischer Vektor: Flashloan-Angriffe auf dünne Preisquellen.

**[Slide 3] — Protokoll-Ebene (Teil 2): Liquidation & Depeg**
Liquidation Risk: Sicherheitenwert fällt → Zwangsverkauf unter Abschlag. Mitigation: konservative LTV halten.
Depeg Risk: Stablecoin oder Pegged Asset verliert Peg. Historie: USDC (März 2023), UST (Mai 2022), stETH (Juni 2022).

**[Slide 4] — Akteurs-Ebene: Rug Pull & User Risk**
Rug Pull: Team flüchtet mit Kapital. Primär bei kleinen, nicht-auditierten Protokollen.
User Risk: Nutzerfehler (falsche Adresse, falsche Chain, kompromittierter Seed). Oft größter Kapitalverlust-Grund.

**[Slide 5] — System-Ebene: Komponierbarkeits-Risiko**
Ein Baustein bricht → Kaskade durch den gesamten Stack.
Je tiefer der Stack, desto mehr Oberflächenfläche für Risiken.
Mitigation: Stack-Tiefe bewusst begrenzen.

**[Slide 6] — Historische Beispiele**
Smart Contract: Ronin (625M, März 2022), Poly Network (611M, August 2021).
Depeg: UST (Mai 2022, Totalverlust), USDC (März 2023, kurzzeitig −13 %).
Composability-Kaskade: stETH-Depeg (Juni 2022) → Liquidationen in mehreren Lending-Protokollen.

**[Slide 7] — Risiko-Matrix: Einfach vs. gehebelt**
Einfache USDC-Supply auf Aave: primär vier Risiken (Smart Contract, Oracle, Liquidation, User Risk).
Gehebelte stETH-Loop auf Aave: alle sieben Risiken gleichzeitig.
Ziel: Risiken erkennen und bepreisen, nicht vermeiden.

## Sprechertext

**[Slide 1]**
Die größte Gefahr in DeFi ist nicht, ein Risiko einzugehen — sondern ein Risiko einzugehen, das du nicht kennst. Wir gehen systematisch durch die sieben Kernrisiken. Sie gliedern sich in drei Ebenen: Protokoll-Ebene, Akteurs-Ebene und System-Ebene.

**[Slide 2]**
Auf der Protokoll-Ebene beginnen wir mit zwei fundamentalen Risiken. Erstens: Smart-Contract-Risiko. Ein Bug im Code kann Kapital zerstören oder einen Exploit ermöglichen. Smart Contracts sind unveränderlich — wenn der Bug entdeckt ist, ist es oft zu spät. Ronin-Bridge 2022, 625 Millionen Dollar. Poly Network 2021, 611 Millionen. Mitigation: Bevorzuge Protokolle mit mehreren unabhängigen Audits und langer Live-Historie. Zweitens: Oracle-Risiko. Viele Protokolle brauchen externe Preisdaten für Liquidationen und Kursberechnungen. Wenn ein Oracle manipuliert werden kann, gerät das ganze Protokoll in falsche Zustände. Der typische Vektor sind Flashloan-Angriffe auf dünne Preisquellen.

**[Slide 3]**
Weiter auf der Protokoll-Ebene: Risiko drei ist das Liquidationsrisiko. Wenn du einen Kredit mit Sicherheiten aufgenommen hast und der Wert der Sicherheiten fällt, wirst du liquidiert. Deine Sicherheiten werden unter Abschlag verkauft. Bei volatilen Märkten eskaliert das schnell. Die Mitigation sind konservative Loan-to-Value-Ratios. Wir behandeln Liquidationen tief in Modul 7. Risiko vier ist Depeg. Stablecoins und Pegged Assets sollen einen Peg halten. USDC depeggte kurz im März 2023 wegen der Silicon Valley Bank. UST brach im Mai 2022 vollständig zusammen und löschte mehr als 40 Milliarden Dollar aus. stETH depeggte temporär im Juni 2022. Depegs treten oft schnell auf — Sekunden bis Minuten. Diversifikation hilft.

**[Slide 4]**
Auf der Akteurs-Ebene haben wir zwei weitere Risiken. Risiko fünf: Rug Pull. Ein Team startet ein Protokoll, zieht Kapital an, flüchtet. Vorwiegend bei kleinen, nicht-auditierten Projekten. Soft Rugs gehen schleichend über Admin-Privilegien, Hard Rugs über direkte Abzugsfunktionen. Nur etablierte Protokolle mit öffentlicher Governance nutzen. Risiko sieben — wir nehmen es hier vor — ist das User Risk, also der Nutzerfehler. Du selbst bist oft die Schwachstelle. Falsche Adresse, falsche Chain, kompromittierter Seed. Schätzungen besagen: mehr Kapital geht durch Nutzerfehler verloren als durch Protokoll-Hacks. Hardware-Wallets, Multisig und Test-Transaktionen — Modul 2 behandelt das komplett.

**[Slide 5]**
Die System-Ebene umfasst Risiko sechs: Komponierbarkeits-Risiko. Wenn ein tief liegendes Protokoll bricht, kaskadiert das durch alle darauf aufbauenden Positionen. Ein Liquid-Staking-Depeg kann Lending-Liquidationen auslösen, die ihrerseits LP-Positionen beeinträchtigen. Je tiefer dein Stack, desto mehr Oberflächenfläche. Dieses Risiko haben wir bereits in Lektion 1.2 eingeführt; es ist das zentrale systemische Risiko in DeFi und wird in Modul 16 vertieft behandelt.

**[Slide 6]**
Ein Blick in die Historie macht diese Risiken greifbar. Smart-Contract-Exploits: Ronin im März 2022 mit 625 Millionen Dollar, Poly Network im August 2021 mit 611 Millionen. Depeg-Ereignisse: UST im Mai 2022 als Totalverlust, USDC im März 2023 mit einem kurzzeitigen Abschlag von rund 13 Prozent. Und eine Composability-Kaskade: der stETH-Depeg im Juni 2022, der eine Welle von Liquidationen in mehreren Lending-Protokollen auslöste. Jedes dieser Ereignisse war im Prinzip vorhersehbar — wenn man die Risikostruktur verstanden hatte.

**[Slide 7]**
Jede DeFi-Position hat ein Risikoprofil aus diesen sieben Dimensionen. Eine einfache USDC-Supply-Position auf Aave trägt primär vier Risiken: Smart Contract, Oracle, Liquidation auf Protokoll-Ebene, und User Risk beim Nutzer. Eine gehebelte stETH-Loop auf Aave trägt alle sieben Risiken gleichzeitig, weil sie mehrere Protokolle über mehrere Hops verkettet. Deine Aufgabe als DeFi-Nutzer ist nicht, Risiken zu vermeiden — sondern sie bewusst einzugehen und zu bepreisen. Das ist professionelles DeFi.

## Visuelle Vorschläge

**[Slide 1]** Titelfolie mit "7 Risiken" prominent, gegliedert in drei Ebenen (Protokoll, Akteur, System).

**[Slide 2]** Zweigeteiltes Layout. Links: Chart der größten DeFi-Hacks nach Schadenshöhe (Ronin, Poly Network, Wormhole). Rechts: vereinfachtes Diagramm einer Oracle-Manipulation — Angreifer manipuliert dünne Preisquelle, Oracle gibt falschen Preis an abhängiges Protokoll weiter. **SCREENSHOT SUGGESTION:** rekt.news-Leaderboard oder DeFiLlama-Hacks-Dashboard.

**[Slide 3]** Zweigeteiltes Layout. Links: Grafik einer Liquidationskaskade — Sicherheitenpreis fällt, Health Factor sinkt, Liquidation triggert, weiterer Preisfall durch Verkauf. Rechts: übereinandergelegtes Chart des UST-Kollapses Mai 2022 und des USDC-Depegs März 2023.

**[Slide 4]** Zweigeteiltes Layout. Links: Liste bekannter Rug Pulls mit Schadenssummen — Betonung, dass alles aus dem kleinen, nicht-auditierten Protokoll-Segment stammt. Rechts: Pie-Chart "Verlustursachen in DeFi" mit Nutzerfehlern als prominentem Segment.

**[Slide 5]** Jenga-Turm-Analogie: Basis-Layer-Protokoll fällt, ganzer Stack kaskadiert. Zusätzlich ein kleines Flussdiagramm "Lido-Depeg → Aave-Liquidationen → LP-Kaskade" zur Veranschaulichung.

**[Slide 6]** Kombinierte Timeline der Schlüssel-Events: März 2022 Ronin, August 2021 Poly Network, Mai 2022 UST, Juni 2022 stETH, März 2023 USDC. Pro Event: Datum, Schadenshöhe, Risikokategorie. **SCREENSHOT SUGGESTION:** DeFiLlama-Chart des stETH/ETH-Ratios im Juni 2022.

**[Slide 7]** Spider-Diagramm im Vergleich: "Risikoprofil einer einfachen USDC-Supply-Position auf Aave" (4 Achsen aktiv) vs. "Risikoprofil einer gehebelten stETH-Loop auf Aave" (alle 7 Achsen aktiv, höhere Ausprägungen).

## Übung

**Aufgabe: Risikoanalyse einer realen Position**

Wähle eine bekannte DeFi-Position, die du online recherchieren kannst — z.B. "stETH-Looping auf Aave" oder "USDC-Supply auf Morpho". Erstelle eine Risikomatrix mit den sieben Risiken. Bewerte für jede Risikodimension:
- Hoch / Mittel / Niedrig
- Begründung (eine Zeile)

**Deliverable:** Tabelle mit 7 Zeilen, pro Risiko eine Bewertung und eine Begründung.

## Quiz

**Frage 1:** Ein Freund erzählt dir, er legt seine USDC in ein unbekanntes Protokoll mit "Audit" und 150% APY. Welche drei Risiken sollten deine Alarmglocken auslösen?

<details>
<summary>Antwort anzeigen</summary>

1. Rug-Pull-Risiko: unbekanntes Protokoll mit extrem hohem APY ist klassisches Warnsignal. 2. Smart-Contract-Risiko: ein einzelnes Audit ist keine Garantie, besonders wenn der Auditor nicht bekannt ist oder der Code komplex ist. 3. Unklare Kapitalquelle: 150% APY muss von irgendwoher kommen — oft sind es Token-Emissionen, die den Token-Preis drücken, oder recycelte Deposits, die bei Abflüssen kollabieren (Ponzi-Dynamik).
</details>

**Frage 2:** Warum ist Komponierbarkeits-Risiko besonders gefährlich für fortgeschrittene Nutzer?

<details>
<summary>Antwort anzeigen</summary>

Fortgeschrittene Nutzer bauen oft tiefe Stacks mit vielen Protokollen (z.B. Liquid Staking + Lending + Derivate + Yield Aggregator). Jede zusätzliche Protokoll-Ebene fügt eine neue Risikoquelle hinzu, und ein Bruch auf einer tieferen Ebene kann alle darauf aufbauenden Positionen betreffen. Die Risikokorrelation ist nicht additiv, sondern multiplikativ — kleine Einzelrisiken können gemeinsam ein großes Gesamtrisiko bilden. Fortgeschrittene Nutzer halten oft höhere absolute Beträge, sodass die absoluten Verluste signifikant sind.
</details>

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Slides: Titel → Protokoll-Ebene Teil 1 (Smart Contract + Oracle) → Protokoll-Ebene Teil 2 (Liquidation + Depeg) → Akteurs-Ebene (Rug Pull + User Risk) → System-Ebene (Composability) → Historische Beispiele → Risiko-Matrix
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — Hack-Leaderboard, Oracle-Manipulations-Diagramm, Liquidationskaskade, UST/USDC-Depeg-Charts, Jenga-Turm mit Kaskaden-Flussdiagramm, Event-Timeline, Spider-Diagramm Risikoprofile

Pipeline: Gamma → ElevenLabs → CapCut.

---
