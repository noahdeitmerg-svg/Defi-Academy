# Modul 8 — Stablecoins

**Zielgruppe:** Einsteiger bis Fortgeschrittene
**Geschätzte Dauer:** 80–100 Minuten
**Voraussetzungen:** Module 1–7 abgeschlossen

**Kursstufe:** Core (DeFi-Kerninfrastruktur)
**Lektionsanzahl:** 6
**Didaktische Ausrichtung:** Stablecoin-Typen, Peg-Mechanismen, Depeg-Risiken, Rendite-tragende Varianten, Portfolio-Integration
**Konformität:** Final Fix Document v1 — Struktur, Terminologie und Pipeline-Assets harmonisiert

**Harmonisierte Terminologie (gültig im gesamten Modul):**
- Stablecoin, Peg, Depeg
- Fiat-besichert (USDC, USDT, PYUSD)
- Krypto-besichert (DAI, crvUSD, LUSD)
- Algorithmisch (historisch UST, fractional Designs)
- Rendite-tragend / Yield-bearing (sDAI, sUSDS, sUSDe)
- PSM (Peg Stability Module), DSR (DAI Savings Rate)
- Smart Contract Risk, Oracle Risk, Depeg Risk, Regulatory Risk
- Total Value Locked (TVL)

**Querverweise:**
- Die drei Stablecoin-Grundtypen (fiat-/krypto-besichert/algorithmisch) sowie die Depeg-Case-Study (USDC März 2023, UST Mai 2022) sind modulspezifische Fix-Doc-Erweiterungen.
- Stablecoin-LP-Strategien auf Curve wurden in Modul 5 behandelt.
- Die Auswirkungen eines Depegs auf Lending-Positionen wurden in Modul 7 (Kaskaden) diskutiert.

**Video-Pipeline:** Jede Lektion ist für Gamma (Folien) → ElevenLabs (Voice) → CapCut (Video) vorbereitet. Zielvideo-Länge pro Lektion: 8–10 Minuten (120–140 WPM).

---

## Modul-Überblick

Stablecoins sind das Rückgrat von DeFi. Sie sind die Recheneinheit, in der Renditen gemessen werden, das stabile Asset für Lending-Märkte, und das Ausgangs- und Zielprodukt fast jeder Strategie. Über 150 Milliarden USD liegen aktuell in Stablecoins, und ihr Anteil am DeFi-Gesamtkapital wächst stetig.

Für konservative Strategien sind Stablecoins zentral. Sie sind der Baustein, der Volatilität aus dem Portfolio nimmt und stabile Yield-Quellen zugänglich macht. Aber: **Stablecoins sind nicht gleich Stablecoins**. Die Mechanismen, durch die der Peg gehalten wird, unterscheiden sich fundamental — und damit auch die Risiken.

Dieses Modul seziert die wichtigsten Stablecoin-Typen systematisch. Am Ende verstehst du präzise, wo das Risiko jedes einzelnen Stablecoins liegt, und kannst eine Stablecoin-Diversifikations-Strategie bauen, die nicht auf einen einzigen Ausfallpunkt konzentriert ist.

**Lektionen:**
1. Was ein Stablecoin eigentlich ist
2. Fiat-besicherte Stablecoins: USDC und USDT
3. Krypto-besicherte Stablecoins: DAI, crvUSD, LUSD
4. Rendite-tragende Stablecoins: sDAI, sUSDS, Savings-Mechanismen
5. Depeg-Risiken systematisch
6. Stablecoin-Auswahl für konservative Portfolios

---

## Lektion 8.1 — Was ein Stablecoin eigentlich ist

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die drei strukturellen Stablecoin-Kategorien benennen und abgrenzen
- Verstehen, warum der "Peg" eine Eigenschaft des Mechanismus ist, keine Eigenschaft des Tokens
- Die wichtigsten Peg-Erhaltungs-Mechanismen identifizieren
- Die Begriffe Peg, Depeg, Over-Collateralization und Arbitrage-Mechanismus im Stablecoin-Kontext präzise verwenden
- Beurteilen, warum Stablecoins für DeFi-Infrastruktur unverzichtbar sind (als Recheneinheit, Settlement-Asset, Safe Haven)
- Eine erste Klassifikation eines unbekannten Stablecoins (nach Besicherung, Emittent, Peg-Mechanismus) vornehmen

### Erklärung

Ein Stablecoin ist ein Krypto-Token, der einen Preis-Peg zu einem externen Referenzwert — meistens dem US-Dollar — halten soll. Der Peg ist **kein automatisches Feature** des Tokens. Er entsteht durch einen **Mechanismus**, der Angebot und Nachfrage so reguliert, dass der Marktpreis an der Referenz bleibt.

Das Verständnis dieses Mechanismus ist der Schlüssel zur Risiko-Bewertung. Ein Stablecoin, dessen Mechanismus solide ist, hält den Peg zuverlässig. Ein Stablecoin, dessen Mechanismus Schwachstellen hat, kann depeggen — dauerhaft oder temporär.

**Die drei strukturellen Kategorien**

**Kategorie 1: Fiat-besichert (zentral)**

Ein Unternehmen hält echte US-Dollar (oder äquivalente Reserven wie kurzlaufende US-Staatsanleihen) und gibt dafür eine entsprechende Menge Tokens heraus. Der Peg-Mechanismus ist direkt: jeder Token kann theoretisch gegen einen Dollar beim Emittenten eingelöst werden.

Beispiele: **USDC** (Circle), **USDT** (Tether), **PYUSD** (PayPal).

**Charakteristika:**
- Zentral emittiert — ein Unternehmen hält die Reserven
- Peg durch tatsächliche Besicherung
- Blacklisting möglich — der Emittent kann Tokens einzelner Adressen einfrieren
- Regulatorisches Risiko — das Unternehmen unterliegt staatlicher Aufsicht

**Kategorie 2: Krypto-besichert (dezentral)**

Nutzer hinterlegen Krypto-Assets (typisch ETH, Liquid-Staking-Tokens, andere Stablecoins) als Sicherheit in Smart Contracts und minten gegen die Sicherheit Stablecoins. Der Mechanismus ist strukturell ähnlich zu den Lending-Protokollen aus Modul 6 und 7 — mit einem Zusatz: das "geliehene" Asset ist der Stablecoin selbst, der vom Protokoll neu kreiert wird.

Beispiele: **DAI** (MakerDAO, jetzt Sky), **LUSD** (Liquity), **crvUSD** (Curve), **GHO** (Aave).

**Charakteristika:**
- Dezentral — kein zentraler Emittent
- Überbesichert — meist 150% oder mehr Sicherheit pro Token
- Liquidations-Mechanismus — wenn Sicherheit fällt, wird liquidiert
- Kein Blacklisting möglich (bei wirklich dezentralen Designs)
- Peg durch Arbitrage und Stability-Fee-Mechanismen

**Kategorie 3: Algorithmisch / Synthetisch (hybrid bis spekulativ)**

Diese Kategorie umfasst unterschiedliche Designs, die keine klassische Besicherung nutzen — oder Besicherung mit komplexen Mechanismen kombinieren.

**Unterkategorien:**

**3a. Pure algorithmisch (historisch gescheitert)**
Kein echtes Collateral. Peg wird durch Supply-Anpassungen oder Auktions-Mechanismen gehalten. Beispiele: UST (Terra, kollabiert 2022), Empty Set Dollar, Basis Cash. Alle scheiterten strukturell. Diese Kategorie ist für konservative Portfolios nicht relevant.

**Warum pure algorithmische Designs reflexiv sind:** Algorithmische Stablecoins stabilisieren ihren Preis häufig über einen Governance-Token (bei UST war das LUNA). Der Mechanismus ist reflexiv: Das Vertrauen in den Stablecoin hängt vom Wert des Governance-Tokens ab, und der Wert des Governance-Tokens hängt vom Vertrauen in den Stablecoin. Wenn das Vertrauen sinkt, kann der Governance-Token schnell an Wert verlieren — und damit bricht auch die Peg-Verteidigung zusammen, sodass der Stablecoin depeggt. UST und LUNA im Mai 2022 sind das Lehrbuchbeispiel für diesen Kaskaden-Effekt.

**3b. Delta-neutral synthetisch**
Das Protokoll hält spot-long in einem volatilen Asset (z.B. ETH), hedget die Volatilität durch short-Positionen auf Perpetual Futures, und mintet Stablecoins basierend auf dem delta-neutralen Wert. Beispiel: **USDe** (Ethena). Strukturell innovativ, aber mit eigenen Risiken (Funding-Rate-Risiko, Exchange-Risiko).

**3c. Hybrid mit Rendite**
Kombinieren Besicherung mit integrierten Rendite-Mechanismen. Beispiele: **sDAI** (DAI auf Savings Rate), **sUSDS** (USDS auf Sky Savings Rate).

**Wichtig: Die Kategorisierung ist nicht immer sauber**

Manche Stablecoins haben Elemente aus mehreren Kategorien. DAI zum Beispiel war ursprünglich rein krypto-besichert. Heute enthält das DAI-Collateral signifikante USDC-Anteile (fiat-besichert) und RWA-Exposure (Real World Assets wie US-Treasuries) — was DAI's Risikoprofil verändert hat. Ein DAI von heute ist nicht das DAI von 2020.

**Warum Mechanismen versagen können**

Jeder Peg-Mechanismus hat Annahmen, die unter extremen Bedingungen brechen können:

- **Fiat-besicherte:** Annahme, dass die Reserve-Bank solvent ist und das Unternehmen nicht sanktioniert wird
- **Krypto-besicherte:** Annahme, dass Liquidationen schnell genug ausgeführt werden können, bevor Sicherheit unter Schuld fällt
- **Algorithmisch:** Annahme, dass die Supply-Anpassungs-Logik auch in Panic-Situationen funktioniert
- **Delta-neutral:** Annahme, dass Hedges auch in extremen Märkten liquide bleiben

Ein "robuster" Stablecoin ist einer, dessen Annahmen auch in Extrem-Situationen Bestand haben. Kein Stablecoin ist 100% sicher — es gibt nur unterschiedliche Risikoprofile.

**Die Peg-Arbitrage**

Der Peg entsteht in allen Kategorien durch **Arbitrage-Möglichkeiten**. Wenn ein Stablecoin über dem Peg handelt (z.B. USDC = 1,01 USD), gibt es einen Anreiz, neue USDC zu minten (gegen 1 USD Reserven) und am Markt für 1,01 USD zu verkaufen — der Gewinn von 0,01 USD pro Token. Dieser Arbitrage-Druck bringt den Preis zurück zu 1,00.

Umgekehrt, wenn USDC unter dem Peg handelt (z.B. 0,99 USD): Arbitrageur kauft USDC am Markt für 0,99 USD, löst es beim Emittenten für 1 USD ein, Gewinn 0,01 USD.

**Wichtig:** Die Arbitrage funktioniert nur, wenn:
1. Der Emittent tatsächlich 1:1 einlöst
2. Genügend Liquidität am Markt vorhanden ist
3. Transaktionskosten die Arbitrage-Marge nicht auffressen

Wenn eine dieser Bedingungen bricht — z.B. der Emittent den Einlöse-Prozess pausiert, oder Märkte eingefroren sind — kann der Peg signifikant vom Fair Value abweichen.

### Folien-Zusammenfassung

**[Slide 1] — Titel**
Was ein Stablecoin eigentlich ist

**[Slide 2] — Der Peg ist ein Mechanismus**
Nicht eine Eigenschaft des Tokens.
Entsteht durch Angebots-/Nachfrage-Regulierung.
Annahmen können unter Stress brechen.

**[Slide 3] — Drei strukturelle Kategorien**
1. Fiat-besichert (zentral)
2. Krypto-besichert (dezentral)
3. Algorithmisch / synthetisch

**[Slide 4] — Fiat-besichert**
USDC, USDT, PYUSD
Zentrale Unternehmen halten Reserven
Blacklisting möglich

**[Slide 5] — Krypto-besichert**
DAI, LUSD, crvUSD, GHO
Überbesichert mit Krypto-Collateral
Liquidations-Mechanismus

**[Slide 6] — Algorithmisch / Hybrid**
Pure algorithmisch (historisch gescheitert)
Delta-neutral (USDe)
Hybrid (sDAI, sUSDS)

**[Slide 7] — Peg durch Arbitrage**
Über Peg → mehr minten
Unter Peg → einlösen
Voraussetzung: Einlöse-Prozess + Liquidität + geringe Kosten

### Sprechertext

**[Slide 1]** Modul 8 behandelt Stablecoins. Über 150 Milliarden Dollar liegen aktuell in Stablecoins, und sie sind das Rückgrat fast jeder konservativen DeFi-Strategie. Aber Stablecoins sind nicht gleich Stablecoins. In dieser ersten Lektion legen wir das konzeptionelle Fundament.

**[Slide 2]** Ein entscheidender Punkt zuerst. Der Peg ist keine magische Eigenschaft des Tokens — er ist ein Mechanismus. Er entsteht durch die Art, wie das Protokoll oder Unternehmen Angebot und Nachfrage reguliert. Jeder Mechanismus hat Annahmen, und unter extremen Bedingungen können diese Annahmen brechen. Wenn sie brechen, depeggt der Stablecoin. Das zu verstehen ist die Basis für Risiko-Bewertung.

**[Slide 3]** Drei strukturelle Kategorien. Erstens: fiat-besichert — zentrale Unternehmen halten echte Dollar-Reserven. Zweitens: krypto-besichert — dezentral, durch Krypto-Collateral in Smart Contracts gedeckt. Drittens: algorithmisch oder synthetisch — unterschiedliche Designs ohne klassische Besicherung oder mit komplexen Hybrid-Mechanismen.

**[Slide 4]** Fiat-besicherte Stablecoins. USDC von Circle, USDT von Tether, PYUSD von PayPal. Ein Unternehmen hält echte Dollars — oder äquivalente Reserven wie kurzlaufende US-Staatsanleihen — und gibt entsprechend Tokens aus. Peg durch tatsächliche Besicherung. Blacklisting ist möglich: der Emittent kann Token einzelner Adressen einfrieren. Das ist Feature und Risiko zugleich.

**[Slide 5]** Krypto-besicherte Stablecoins. DAI vom Sky-Ökosystem, LUSD von Liquity, crvUSD von Curve, GHO von Aave. Nutzer hinterlegen Krypto-Assets als Sicherheit und minten dagegen Stablecoins. Typisch 150 Prozent oder mehr Überbesicherung. Ein Liquidations-Mechanismus schützt vor Unterbesicherung. Bei wirklich dezentralen Designs ist kein Blacklisting möglich.

**[Slide 6]** Die algorithmische und hybride Kategorie. Pure algorithmische Designs — UST, Empty Set Dollar, Basis Cash — sind historisch alle gescheitert. Delta-neutrale Designs wie USDe von Ethena halten spot-long und hedgen via Perpetual-Shorts — strukturell innovativ, aber mit eigenen Risiken. Hybrid-Rendite-Designs wie sDAI oder sUSDS kombinieren Besicherung mit integrierten Yield-Mechanismen.

**[Slide 7]** Der Peg entsteht durch Arbitrage. Wenn USDC über einem Dollar handelt, gibt es einen Anreiz: minten für einen Dollar, verkaufen für 1,01 — Gewinn. Das drückt den Preis zurück. Unter einem Dollar: kaufen für 0,99, einlösen für einen Dollar, Gewinn. Das zieht den Preis hoch. Aber die Arbitrage braucht drei Bedingungen: Einlöse-Prozess funktioniert, genug Liquidität am Markt, Transaktionskosten sind geringer als die Arbitrage-Marge. Wenn eine dieser Bedingungen bricht, driftet der Peg.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Metapher: Peg als Seil zwischen Markt-Preis und Referenz-Preis. Das Seil ist gespannt durch Mechanismus-Elemente. Unter Extrem-Belastung reißt es.

**[Slide 3]** Drei-Spalten-Kategorien-Diagramm mit Beispielen.

**[Slide 4]** **SCREENSHOT SUGGESTION:** USDC-Transparency-Seite von Circle (circle.com/usdc/transparency) mit Reserve-Breakdown.

**[Slide 5]** Architektur-Diagramm eines krypto-besicherten Systems: Nutzer hinterlegt ETH → Smart Contract → DAI gemintet.

**[Slide 6]** Vergleichstabelle der drei algorithmischen Unterkategorien mit Beispielen und Status.

**[Slide 7]** Arbitrage-Flussdiagramm mit den zwei Richtungen (über/unter Peg) und den drei Voraussetzungen.

### Übung

**Aufgabe: Stablecoin-Landschaft kartieren**

1. Öffne defillama.com/stablecoins.
2. Notiere die Top-10 Stablecoins nach Market Cap.
3. Für jeden Stablecoin dokumentiere:
 - Name und Ticker
 - Market Cap
 - Emittent / Protokoll
 - Kategorie (fiat-besichert / krypto-besichert / algorithmisch / hybrid)
 - Dominante Chain
4. Identifiziere mindestens einen Stablecoin pro Kategorie.

**Deliverable:** Tabelle mit 10 Stablecoins + Kategorie-Übersicht. Kurze Reflexion (3–5 Sätze): Welche Kategorie dominiert nach Market Cap, und was sagt das über Marktpräferenzen aus?

### Quiz

**Frage 1:** Warum ist die Aussage "USDC ist stabil, weil Circle Dollars hält" unvollständig?

<details>
<summary>Antwort anzeigen</summary>

Die Aussage beschreibt nur die Besicherung, nicht den gesamten Peg-Mechanismus. Für den Peg müssen drei Bedingungen erfüllt sein: (1) Circle hält tatsächlich ausreichend Reserven (die Besicherung), (2) Circle kann und will diese Reserven tatsächlich 1:1 einlösen (der Einlöse-Prozess), (3) Arbitrageure haben Zugang zum Einlöse-Prozess und genug Liquidität, um Abweichungen auszugleichen (die Markt-Infrastruktur). Wenn Bedingung 2 oder 3 versagt — z.B. weil Circles Bank-Partner zusammenbricht (März 2023 SVB) oder weil Circle kurzfristig den Einlöse-Prozess pausiert — kann USDC vom Peg abweichen, obwohl die Reserven nominell vorhanden sind. Das ist genau im März 2023 passiert: USDC fiel auf 0,88 USD, obwohl Circle noch substantielle Reserven hatte, nur waren diese temporär nicht zugänglich. Der Peg ist also nicht nur eine Frage der Reserven, sondern des gesamten Mechanismus.
</details>

**Frage 2:** Ein Nutzer sieht einen neuen "algorithmischen Stablecoin" mit versprochenen 20% APY. Was sind die strukturellen Warnsignale?

<details>
<summary>Antwort anzeigen</summary>

Mehrere Warnsignale. Erstens: pure algorithmische Stablecoins sind historisch alle gescheitert — UST, Empty Set Dollar, Basis Cash, Neutrino USD. Die Design-Klasse hat eine sehr schlechte Bilanz. Zweitens: 20% APY auf einem Stablecoin ist mathematisch verdächtig. Stablecoin-Basisraten in DeFi liegen bei 3–8%. Höhere Raten bedeuten entweder: (a) Rewards in einem zusätzlichen Token (oft hochinflationär und preis-fallend), (b) Ponzi-artige Mechanismen, bei denen neue Deposits alte Renditen finanzieren, oder (c) extreme Risiken (Leverage, unauditierte Smart Contracts). Drittens: der Yield selbst kann destabilisierend wirken — hohe APY ziehen Kapital an, das bei Problemen schnell abgezogen wird, was Peg-Kaskaden auslöst. Anchor Protocol (UST) zahlte 19,5% APY, bevor UST kollabierte. Die Struktur ist ähnlich. Konservative Regel: bei algorithmischen Stablecoins mit deutlich überdurchschnittlichem APY ist die Standardannahme, dass sie nicht überleben werden. Für konservative Portfolios: meiden.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → Was ist ein Stablecoin → Drei Kategorien → Peg als Mechanismus → Peg-Erhaltungs-Mechanismen → Warum Stablecoins zentral sind → Klassifikations-Framework
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — Stablecoin-Kategorien-Grafik, Peg-Mechanik-Diagramm, Historische Depeg-Events, Klassifikations-Entscheidungsbaum

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 8.2 — Fiat-besicherte Stablecoins: USDC und USDT

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- USDCs und USDTs Reserve-Strukturen im Detail vergleichen
- Die zentralen Risiken jedes Emittenten einordnen
- Regulatorisches Risiko als strukturellen Faktor identifizieren
- Die Reserve-Attestierungs- und Audit-Praxis von Circle (USDC) und Tether (USDT) kritisch bewerten
- Das historische USDC-Depeg-Event im März 2023 (SVB-Krise) in seiner Mechanik und den Lehren nachvollziehen
- PYUSD, FDUSD und weitere fiat-besicherte Stablecoins in ihrer relativen Positionierung einordnen

### Erklärung

Fiat-besicherte Stablecoins dominieren nach Market Cap. Zusammen machen USDC und USDT über 80% des gesamten Stablecoin-Markts aus. Ihre Strukturen scheinen ähnlich — aber die Details unterscheiden sich in wichtigen Aspekten.

**USDC — Circle**

**Emittent:** Circle Internet Financial, Inc. (mit Sitz in den USA)

**Reserve-Struktur (Stand aktueller Transparenz-Reports):**
- Überwiegend in kurzlaufenden US-Treasuries (75–85%)
- Bargeld-Reserven bei regulierten US-Banken (15–25%)
- Keine Kredite, keine Commercial Paper (seit 2022)

**Transparenz:**
- Monatliche Attestations durch Grant Thornton (Wirtschaftsprüfer)
- Reserve-Portfolio wöchentlich aktualisiert
- Circle veröffentlicht detaillierte Transparenz-Berichte auf circle.com

**Regulierung:**
- Circle ist in den USA als Money Transmitter in verschiedenen Bundesstaaten registriert
- MiCA-konform in der EU (ab Juni 2024)
- Reguliert durch NYDFS (New York Department of Financial Services)
- Starke Zusammenarbeit mit US-Behörden

**Blacklist-Mechanismus:**
- Circle kann einzelne Adressen einfrieren (on-chain)
- Wurde historisch genutzt bei Tornado-Cash-Sanktionen (August 2022) und anderen gesetzlichen Anforderungen
- Für normale Nutzer nicht relevant, aber strukturell wichtig zu wissen

**USDC-Stärken:**
- Klare Regulierung, transparente Reserven
- Einfach auditierbar
- Schnelle Anpassung an regulatorische Anforderungen (MiCA)
- Schnelle Mint/Redeem-Prozesse für institutionelle Nutzer

**USDC-Schwächen:**
- Zentralisiert — Circle kann Token einfrieren
- Abhängig von US-Banken-System (siehe SVB-Krise März 2023)
- Regulatorisches Risiko (US-Politik könnte sich ändern)

**USDT — Tether**

**Emittent:** Tether Limited (Sitz auf den British Virgin Islands, operativ in Hongkong)

**Reserve-Struktur (Stand aktueller Attestations):**
- Kurzlaufende US-Treasuries (etwa 80%)
- Bargeld-Reserven
- Gold-Reserven (wenige Prozent)
- Bitcoin-Reserven (wenige Prozent)
- Secured Loans (weniger als 5%)
- Corporate Bonds (minimal)

**Transparenz:**
- Quartalsweise Attestations durch BDO Italia
- Reserve-Breakdown publik, aber weniger detailliert als USDC
- Kritik historisch an unvollständiger Transparenz, hat sich verbessert

**Regulierung:**
- Nicht direkt in den USA reguliert
- Settled mit NYAG 2021 (18,5 Mio. USD Strafe wegen irreführender Reserve-Claims)
- Settled mit CFTC 2021 (41 Mio. USD Strafe)
- Nicht MiCA-konform für EU-Nutzer (2024 wurde USDT auf einigen EU-Plattformen delisted)

**Blacklist-Mechanismus:**
- Tether kann Token einfrieren
- Hat das für sehr große Beträge (oft im Zusammenhang mit Hacks oder Sanktionen) getan
- Weniger aggressiv eingesetzt als von USDC

**USDT-Stärken:**
- Größte Liquidität im Krypto-Markt insgesamt
- Tiefste Order-Books auf CEXs (besonders in Asien)
- Lange Historie (seit 2014) ohne Kollaps
- Tether ist extrem profitabel (kann Depegs durch Reserve-Nutzung stabilisieren)

**USDT-Schwächen:**
- Weniger transparente Regulierungs-Situation
- Historische Reserve-Bedenken (verbessert, aber nicht vergessen)
- Nicht MiCA-konform — für EU-Nutzer rechtliche Unsicherheit
- Konzentriertes Halter-Risiko bei einigen großen CEXs

**USDC-Depeg März 2023: Die Case Study**

Am 10. März 2023 kollabierte die Silicon Valley Bank (SVB) — eine der großen US-Banken, bei der Circle ca. 3,3 Milliarden USD USDC-Reserven hielt. Die Folge:

**Freitag 10.3.:** SVB-Kollaps wird öffentlich.
**Freitag 10.3. Abend:** Circle confirmed, 3,3 Mrd. USD bei SVB.
**Samstag 11.3.:** Panic-Verkäufe beginnen. USDC fällt auf 0,88 USD.
**Sonntag 12.3.:** US-Regulatoren announcieren, alle SVB-Einlagen sind versichert.
**Montag 13.3.:** USDC erholt sich auf nahezu 1,00 USD.

**Was passierte:**
- Circles Reserven waren zu 100% gedeckt, aber 3,3 Mrd. USD waren temporär eingefroren
- Einlöse-Prozess war pausiert über das Wochenende (US-Banken sind Samstag/Sonntag geschlossen)
- Der Arbitrage-Mechanismus konnte nicht funktionieren — niemand konnte USDC einlösen
- Die Panik fütterte sich selbst (Nutzer wollten raus, kein Käufer, Preis fällt weiter)

**Wer Verlust machte:** Jeder, der während der Panik USDC zum Marktpreis (unter 1 USD) verkaufte. Wer wartete, bekam Peg zurück.

**Lektion:** Selbst voll-besicherte Stablecoins können temporär depeggen. Der Peg-Mechanismus erfordert Funktionsfähigkeit der Markt-Infrastruktur — bei Wochenend-Ereignissen oder Bank-Krisen kann das aussetzen.

**USDT-Stabilität trotz Zweifel**

USDT hat eine merkwürdige Eigenschaft: über Jahre hinweg gab es immer wieder Zweifel an den Reserven, negative Presse, regulatorische Herausforderungen. Trotzdem hat USDT nie signifikant depeggt (die größten Abweichungen waren 2–3% in Krisensituationen, schnell erholt).

**Gründe für diese Stabilität:**
- Tether ist extrem profitabel (verdient Milliarden durch US-Treasury-Zinsen auf Reserven)
- Sie haben mehr als genug Reserven, um auch große Redemptions zu bedienen
- Die weltweite USDT-Nachfrage (besonders Asien) ist strukturell sehr hoch
- Im schlimmsten Fall kann Tether eigene Bitcoin/Gold-Reserven zur Peg-Verteidigung nutzen

Das heißt nicht, dass USDT risikofrei ist — nur dass die historische Bilanz trotz anhaltender Skepsis robust ist.

**Konservative Allokations-Regeln**

Für fiat-besicherte Stablecoins:

1. **Nicht 100% in einen einzigen Emittenten.** Diversifiziere über USDC und USDT (und ggf. weitere wie PYUSD für kleine Beträge).
2. **USDC als Kern für EU/US-Nutzer.** Besser reguliert, transparenter, MiCA-konform.
3. **USDT als Diversifikation.** Besonders wenn auf CEXs oder in internationalen Kontexten genutzt.
4. **Exposure-Check:** Wie viel deines Portfolios ist effektiv an eine einzelne Bank (Circle-Reserven) oder Jurisdiction (Tether-Offshore) gebunden?
5. **Monitoring:** Reserve-Reports lesen, mindestens quartalsweise. Änderungen in Reserve-Zusammensetzung können Frühwarnungen sein.

### Folien-Zusammenfassung

**[Slide 1] — Titel**
Fiat-besicherte Stablecoins: USDC und USDT

**[Slide 2] — USDC im Detail**
Circle, USA
Reserven: 75–85% T-Bills, 15–25% Bank-Cash
Monatliche Attestations, MiCA-konform
Blacklist-fähig, zentralisiert

**[Slide 3] — USDT im Detail**
Tether Limited, BVI/Hongkong
Reserven: 80% T-Bills, Cash, Gold, Bitcoin, Loans
Quartalsweise Attestations
Nicht MiCA-konform (EU-delisted)
Blacklist-fähig

**[Slide 4] — USDC-Depeg März 2023**
SVB-Kollaps → 3,3 Mrd. USD eingefroren
USDC fiel auf 0,88 USD
Innerhalb von 72h zurück auf Peg
Lektion: Einlöse-Prozess ist Teil des Pegs

**[Slide 5] — USDT-Stabilität**
Trotz jahrelanger Zweifel: nie signifikant depeggt
Profitabilität + Reserven + Nachfrage = robust
Aber: nicht risikofrei

**[Slide 6] — Vergleich**
USDC: Regulierung, Transparenz
USDT: Liquidität, globale Nachfrage
Beide haben unterschiedliche Risikoprofile

**[Slide 7] — Konservative Allokation**
Diversifizieren über Emittenten
USDC als Kern für regulierte Jurisdictions
USDT als Diversifikation
Reserve-Reports monitoren

### Sprechertext

**[Slide 1]** Diese Lektion behandelt die zwei dominanten fiat-besicherten Stablecoins: USDC und USDT. Zusammen machen sie über 80 Prozent des Stablecoin-Markts aus. Ihre Strukturen sind ähnlich, aber die Details unterscheiden sich in wichtigen Punkten.

**[Slide 2]** USDC im Detail. Emittent ist Circle Internet Financial in den USA. Reserven bestehen zu 75 bis 85 Prozent aus kurzlaufenden US-Treasuries, 15 bis 25 Prozent Bargeld bei regulierten US-Banken. Monatliche Attestations durch Grant Thornton. MiCA-konform in der EU seit Juni 2024. Circle kann Adressen blacklisten — wurde bei Tornado-Cash-Sanktionen 2022 genutzt. Zentralisiert, aber sehr transparent.

**[Slide 3]** USDT im Detail. Emittent ist Tether Limited mit Sitz auf den British Virgin Islands, operativ in Hongkong. Reserven sind diversifizierter: 80 Prozent T-Bills, dazu Bargeld, Gold, Bitcoin und kleine Anteile Secured Loans. Quartalsweise Attestations durch BDO Italia. Nicht MiCA-konform — auf einigen EU-Plattformen 2024 delisted. Blacklist-fähig, aber weniger aggressiv eingesetzt als USDC.

**[Slide 4]** Die wichtige Case Study: USDC-Depeg im März 2023. Am 10. März kollabierte die Silicon Valley Bank. Circle hatte dort 3,3 Milliarden Dollar USDC-Reserven. Über das Wochenende war das Geld temporär eingefroren. Der Einlöse-Prozess pausiert, der Arbitrage-Mechanismus funktioniert nicht. USDC fiel auf 0,88 Dollar. Am Montag announcierten US-Regulatoren, dass alle SVB-Einlagen gesichert sind. Montag Abend war USDC fast zurück auf einem Dollar. Lektion: selbst voll-besicherte Stablecoins können temporär depeggen. Der Peg braucht funktionsfähige Markt-Infrastruktur.

**[Slide 5]** Eine merkwürdige Eigenschaft von USDT. Jahre voller Skepsis, Zweifel, negativer Presse — und nie ein signifikanter Depeg. Die größten Abweichungen waren 2 bis 3 Prozent in Krisensituationen, schnell erholt. Gründe: Tether ist extrem profitabel durch T-Bill-Zinsen. Die Reserven sind mehr als ausreichend. Die globale Nachfrage, besonders in Asien, ist strukturell sehr hoch. Im Notfall können Bitcoin- und Gold-Reserven zur Peg-Verteidigung eingesetzt werden. Das heißt nicht, dass USDT risikofrei ist — nur, dass die historische Bilanz robust ist.

**[Slide 6]** Der Vergleich. USDC punktet bei Regulierung und Transparenz — wichtig für institutionelle und europäische Nutzer. USDT punktet bei Liquidität und globaler Nachfrage — die tiefsten Orderbooks auf CEXs. Beide haben unterschiedliche Risikoprofile: USDC ist an US-Bank-System gebunden, USDT an Offshore-Strukturen und weniger direkte Regulierung. Welcher ist besser? Die ehrliche Antwort: beide haben Platz in diversifizierten Portfolios.

**[Slide 7]** Konservative Allokations-Regeln für fiat-besicherte Stablecoins. Nicht hundert Prozent in einen einzigen Emittenten. Für EU- und US-Nutzer: USDC als Kern, weil besser reguliert und MiCA-konform. USDT als Diversifikation, besonders im internationalen Kontext. Exposure-Check: wie viel deines Portfolios ist effektiv an eine einzige Bank oder Jurisdiktion gebunden? Monitoring der Reserve-Reports mindestens quartalsweise. Änderungen in der Reserve-Zusammensetzung können Frühwarnungen sein.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** **SCREENSHOT SUGGESTION:** Circle USDC Transparency Report Seite mit Reserve-Breakdown-Grafik.

**[Slide 3]** **SCREENSHOT SUGGESTION:** Tether Transparency Seite mit aktuellem Reserve-Breakdown.

**[Slide 4]** Preis-Chart von USDC März 2023 mit markiertem Depeg. **SCREENSHOT SUGGESTION:** Historischer USDC-Chart auf coingecko.com für März 2023.

**[Slide 5]** Langzeit-Preis-Chart von USDT seit 2014 mit markierten Krisen-Ereignissen und schnellen Erholungen.

**[Slide 6]** Vergleichstabelle USDC vs. USDT in 6 Dimensionen.

**[Slide 7]** Beispiel-Portfolio-Allokation für Stablecoin-Diversifikation.

### Übung

**Aufgabe: Reserve-Reports lesen und interpretieren**

1. Besuche circle.com/usdc/transparency und hole den aktuellen USDC-Reserve-Report.
2. Besuche tether.to/en/transparency und hole den aktuellen USDT-Reserve-Report.
3. Für jeden dokumentiere:
 - Gesamt-Reserve in Milliarden USD
 - Prozent-Anteile: T-Bills, Cash, andere
 - Datum des letzten Reports
 - Auditor / Attestor
4. Identifiziere Änderungen gegenüber dem Report von vor 6 Monaten (wenn historische Reports verfügbar sind).

**Deliverable:** Vergleichstabelle + kurze Analyse (5–7 Sätze): Welcher Emittent hat aktuell die konservativere Reserve-Struktur, und welche Änderungen über 6 Monate würden dich als konservativer Nutzer beunruhigen?

### Quiz

**Frage 1:** Warum war der USDC-Depeg im März 2023 strukturell anders als der UST-Kollaps im Mai 2022?

<details>
<summary>Antwort anzeigen</summary>

Der UST-Kollaps war ein fundamentales Versagen des Mechanismus — das Protokoll hatte keine echten Reserven, nur eine algorithmische Peg-Verteidigung über LUNA-Prägung. Als Panik einsetzte, versagte der Mechanismus komplett und UST fiel dauerhaft auf nahe null. Keine Wiederherstellung möglich. Der USDC-Depeg war ein temporäres Infrastruktur-Problem. Circle hatte die Reserven, sie waren nur temporär nicht einlösbar wegen des SVB-Kollapses über ein Wochenende. Sobald die Infrastruktur wiederhergestellt war (Montag-Announcement der Regulatoren), funktionierte die Arbitrage-Maschinerie wieder, und der Peg kehrte zurück. UST war ein Mechanismus-Versagen, USDC war ein Infrastruktur-Hick-up. Strukturell ist der Unterschied zwischen "der Mechanismus existiert nicht mehr" (UST, permanent) und "der Mechanismus ist temporär blockiert" (USDC, reversibel). Beide Ereignisse sind lehrreich, aber völlig unterschiedliche Risikoklassen.
</details>

**Frage 2:** Warum ist die Aussage "USDT hatte in 10 Jahren keinen echten Depeg, also ist es sicher" fehlerhaft aus Sicht konservativer Risikobewertung?

<details>
<summary>Antwort anzeigen</summary>

Drei Probleme mit dieser Logik. Erstens: historische Stabilität garantiert keine zukünftige Stabilität. Jedes Finanzsystem, das "nie gefallen ist", ist zu irgendeinem Zeitpunkt zum ersten Mal gefallen. Banken, die Jahrhunderte bestanden, sind in Finanzkrisen kollabiert. Zweitens: USDT's historische Stabilität ist teilweise das Ergebnis außergewöhnlicher Marktbedingungen (niedrige Zinsen, hohe Krypto-Nachfrage, starkes Asien-Handelsvolumen). Wenn diese Bedingungen sich signifikant ändern (z.B. sehr hohe Zinsen, Asia-Handelsverbote, große CEX-Ausfälle mit USDT-Exposure), können bisher nicht getestete Schwachstellen sichtbar werden. Drittens: USDT's regulatorische Position ist strukturell unsicherer als USDCs — als nicht-US-Entität ohne MiCA-Konformität könnte sie in Zukunft Beschränkungen unterliegen, die die Liquidität beeinträchtigen. Konservative Bewertung fragt nicht "ist es bisher gut gegangen?" sondern "welche Szenarien könnten es zum Scheitern bringen, und wie wahrscheinlich sind sie?". Für USDT: Banking-Access, regulatorische Verschärfungen, Massenausstieg von CEXs — jeweils nicht unmöglich. Das rechtfertigt die Diversifikations-Regel: nicht 100% USDT, nicht 100% USDC, verteilen.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → USDC-Architektur → USDT-Architektur → Reserve-Vergleich → USDC-Depeg März 2023 → Regulatorisches Risiko → Fiat-Stablecoin-Landscape (PYUSD/FDUSD)
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — Circle/Tether-Reserve-Berichte-Screenshots, SVB-Depeg-Chart März 2023, Regulatorische-Landschaft-Matrix (USA/EU/Asien), Reserve-Vergleichs-Tabelle

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 8.3 — Krypto-besicherte Stablecoins: DAI, crvUSD, LUSD

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die grundlegende Mechanik krypto-besicherter Stablecoins erklären
- DAI, crvUSD und LUSD in ihren Design-Unterschieden einordnen
- Die Risikoprofile der jeweiligen Stablecoins aus konservativer Sicht bewerten
- Die MakerDAO/Sky-Governance, die LLAMMA-Mechanik von crvUSD und den Redemption-Mechanismus von LUSD präzise unterscheiden
- Die Rolle von Over-Collateralization, Stabilitätsgebühren und Liquidations-Auktionen im Peg-Erhalt nachvollziehen
- Den strukturellen Unterschied zwischen "pure crypto-backed" (LUSD) und "hybrid-backed" (DAI mit PSM) beurteilen

### Erklärung

Krypto-besicherte Stablecoins entstehen nicht durch ein zentrales Unternehmen mit Dollar-Reserven, sondern durch dezentrale Smart Contracts, in denen Nutzer Krypto-Assets als Sicherheit hinterlegen. Gegen diese Sicherheit wird der Stablecoin gemintet — strukturell ähnlich wie ein Lending-Protokoll, mit dem zentralen Unterschied, dass das "geliehene" Asset neu erzeugt wird, nicht aus einem vorhandenen Pool entnommen.

**Das Grundprinzip: Überbesicherung**

Alle krypto-besicherten Stablecoins arbeiten mit **Überbesicherung**: für jeden geminteten Dollar muss mehr als ein Dollar an Sicherheit hinterlegt sein. Typisch 130–200% Besicherungsquote. Dieser Puffer ist nötig, weil das Collateral volatil ist — und bei Preis-Verfall müssen Liquidationen rechtzeitig erfolgen, bevor die Position unterbesichert wird.

**Die Collateral-Ratio-Formel**

Die Besicherungsquote wird als **Collateral Ratio** (CR) formalisiert:

```
Collateral Ratio = Collateral Value / Stablecoin Debt
```

Ein Beispiel: 150% Collateralization bedeutet, dass für 100 USD Stablecoins etwa 150 USD Collateral hinterlegt sind. Je höher die Collateral Ratio, desto größer der Puffer bis zur Liquidation — desto sicherer die Position, aber auch desto kapital-ineffizienter für den Nutzer, der mintet. Jedes Protokoll definiert eine **Minimum Collateral Ratio**, unterhalb derer die Position liquidierbar wird (z.B. 110% bei LUSD, 150% bei vielen DAI-Vaults).

**DAI — Der Pionier (Sky Protocol, früher MakerDAO)**

DAI ist der älteste große krypto-besicherte Stablecoin (Launch 2017). Das Ökosystem wurde 2024 zu "Sky" umbenannt, und ein paralleles Produkt — USDS — wurde eingeführt.

**Design-Evolution:**
- **2017–2019:** DAI (ursprünglich SAI) nur mit ETH als Collateral
- **2019+:** Multi-Collateral DAI — viele Asset-Typen akzeptiert
- **2022+:** Signifikante USDC-Anteile im Collateral (Stabilitäts-Puffer durch fiat-Stable)
- **2023+:** Real World Assets (RWA) als Collateral — hauptsächlich US-Treasuries via externe Partner
- **2024+:** Sky-Rebranding, USDS als Parallel-Token mit Migrations-Option

**Aktuelles Collateral-Portfolio (Sky/MakerDAO):**
- Real World Assets (T-Bills): ~45–55%
- USDC (Peg Stability Module): ~15–25%
- ETH, wstETH, rETH: ~10–20%
- Andere Assets: kleinere Anteile

**Peg-Mechanismen:**
1. **Vault-Liquidationen:** Wenn Sicherheit unter den Required Ratio fällt, wird die Position liquidiert.
2. **Peg Stability Module (PSM):** USDC kann 1:1 gegen DAI getauscht werden (und umgekehrt) — das arbitrierungsfähigste Peg-Feature.
3. **DAI Savings Rate (DSR) / sDAI:** DAI kann in einen Savings-Vertrag gelegt werden und verdient Zinsen — das zieht Kapital in DAI und stabilisiert Nachfrage.

**Stärken:**
- Lange Historie, etabliert
- Diversifiziertes Collateral
- Mehrere Peg-Verteidigungs-Mechanismen

**Schwächen:**
- DAI ist heute **nicht mehr rein dezentral** — signifikante USDC- und RWA-Anteile bedeuten Exposure zu zentralen Akteuren
- RWA-Risiko (USA-Treasury-System-Exposure)
- Komplexität der Architektur (viele Vault-Typen, Stability Fees, Governance)

**crvUSD — Curve's eigenes Stablecoin (2023)**

Curve hat 2023 crvUSD eingeführt — ein krypto-besicherter Stablecoin mit einem innovativen Liquidations-Mechanismus namens **LLAMMA** (Lending-Liquidating AMM Algorithm).

**Das LLAMMA-Prinzip:**

Klassische Liquidationen sind diskret: wenn der Preis eine Schwelle unterschreitet, wird die gesamte Position auf einmal liquidiert. LLAMMA macht Liquidationen kontinuierlich: während der Preis fällt, wird die Position graduell von Collateral zu Stablecoin umgeschichtet. Bei einem nachfolgenden Preis-Anstieg wird sie wieder zurückgeschichtet.

**Vorteil:** Weniger harte Liquidationen. Der Borrower verliert weniger bei moderaten Preis-Bewegungen, weil die Liquidation "weich" verläuft.

**Nachteil:** Die kontinuierliche Umschichtung kann effektiv eine Art Impermanent Loss erzeugen — bei volatilen Preisen verliert die Position Wert, auch wenn am Ende der Preis zum Ausgangspunkt zurückkehrt.

**Collateral-Typen für crvUSD:**
- wstETH, sfrxETH (Liquid Staking Tokens)
- WBTC, tBTC
- WETH
- Weitere

**Stärken:**
- Innovatives Liquidations-Design (weniger harte Cliffs)
- Native Integration mit Curve (Liquidität, Gauges, Rewards)
- Dezentraler als DAI (keine RWA-Anteile im Kern-Design)

**Schwächen:**
- Jünger, weniger Track-Record als DAI
- LLAMMA-Mechanismus ist komplex und wird in Extrem-Situationen erst wirklich getestet
- Abhängig von Curves Gesamt-Ökosystem-Gesundheit

**LUSD — Liquity (2021)**

LUSD von Liquity Protocol ist der puristisch dezentrale Ansatz. Design-Grundsätze:
- **Nur ETH als Collateral** (in der Grundversion)
- **110% Minimum-Collateralization-Ratio** (sehr aggressiv)
- **0% Zins** auf Borrow (einmalige Borrow-Fee und Redemption-Fee statt)
- **Unveränderbar:** keine Governance, keine Upgrades, keine Admin-Keys
- **Redemption-Mechanismus:** LUSD kann jederzeit gegen ETH aus dem globalen Pool getauscht werden

**Peg-Mechanismen:**
1. **Bei LUSD > 1,10 USD:** Neue Vaults minten profitable LUSD (100% LUSD-Preis × 110% CR = 121% Rendite auf ETH-Einlage), das erhöht das Supply
2. **Bei LUSD < 1,00 USD:** Redemptions werden profitabel (LUSD unter Peg einlösen gegen vollen ETH-Wert), das verringert das Supply

**Stärken:**
- Wirklich dezentral — keine Governance, keine Admin-Controls, keine Zensur möglich
- Einfaches, stabiles Design
- Gute Performance durch mehrere Markt-Zyklen
- Kein regulatorisches Risiko (kein zentrales Entity)

**Schwächen:**
- Nur ETH als Collateral (keine Diversifikation auf Collateral-Ebene)
- Kleinere TVL als DAI oder crvUSD
- Redemption-Mechanismus kann bei starkem Sell-Druck unangenehm für Borrower sein (erzwungene Redemption wird ausgelöst, wenn LUSD unter Peg handelt)
- Weniger in andere DeFi-Protokolle integriert

**Weitere relevante krypto-besicherte Stablecoins**

- **GHO (Aave):** Aaves eigenes Stablecoin, gemintet gegen Aave-Collateral. Jünger (2023), moderater TVL.
- **USDS (Sky):** Paralleler zu DAI, mit Opt-in-Features wie direkter Sky-Points-Rewards.
- **FRAX:** Hybrid-Design (teils algorithmisch, teils besichert). Komplex, nicht für konservative Portfolios empfohlen.

**Konservative Bewertung**

Für konservative Portfolios:

- **DAI:** Durch die RWA- und USDC-Exposure nicht mehr rein dezentral, aber sehr etabliert. Akzeptabel für Diversifikation.
- **crvUSD:** Interessant für DeFi-native Nutzer, mit moderatem Risikobudget. Nicht als Hauptposition.
- **LUSD:** Am dezentralsten. Sinnvoll für Nutzer, die zensurresistent wollen. Weniger in DeFi integriert.
- **Vermeiden:** algorithmische oder stark hybride Stablecoins ohne klare Track-Record.

Eine sinnvolle Diversifikation könnte 50% USDC (als Hauptanker), 30% USDT (Liquidität), 10% DAI (krypto-besicherte Diversifikation), 10% LUSD (zensurresistente Reserve) sein.

### Folien-Zusammenfassung

**[Slide 1] — Titel**
Krypto-besicherte Stablecoins: DAI, crvUSD, LUSD

**[Slide 2] — Grundprinzip**
Überbesicherung: Sicherheit > geminteter Stablecoin
Typisch 130–200% CR
Liquidations-Mechanismus bei Unterbesicherung

**[Slide 3] — DAI / Sky**
Pionier seit 2017
Collateral heute: ~50% RWA, 20% USDC, 20% ETH-basiert
Nicht mehr rein dezentral, aber etabliert

**[Slide 4] — crvUSD**
LLAMMA-Liquidations-Design (kontinuierlich)
Weniger harte Cliffs als klassische Systeme
Jünger, Curve-ökosystem-integriert

**[Slide 5] — LUSD**
Puristisch dezentral
Nur ETH-Collateral, 110% CR
Keine Governance, keine Admin-Keys
Zensurresistent

**[Slide 6] — Weitere**
GHO (Aave): jünger
USDS: Sky-Parallel
FRAX: Hybrid (nicht empfohlen)

**[Slide 7] — Konservative Auswahl**
DAI: Diversifikation, akzeptabel trotz RWA-Exposure
crvUSD: moderates Risikobudget
LUSD: echte Dezentralität
Meiden: Algo/Hybrid ohne Track-Record

### Sprechertext

**[Slide 1]** Krypto-besicherte Stablecoins entstehen durch dezentrale Smart Contracts, nicht durch zentrale Unternehmen mit Dollar-Reserven. Das gibt andere Risikoprofile — und unterschiedliche Stärken und Schwächen.

**[Slide 2]** Das Grundprinzip ist Überbesicherung. Für jeden geminteten Stablecoin-Dollar muss mehr als ein Dollar Sicherheit hinterlegt sein. Typisch 130 bis 200 Prozent. Der Puffer ist nötig, weil das Collateral volatil ist. Bei Preis-Verfall muss liquidiert werden, bevor die Position unterbesichert wird — strukturell ähnlich zu den Lending-Protokollen aus Modul 6 und 7.

**[Slide 3]** DAI, der Pionier seit 2017. Das Ökosystem heißt heute Sky. Das Collateral-Portfolio hat sich stark entwickelt: heute etwa 50 Prozent Real World Assets — US-Treasuries via externe Partner. 20 Prozent USDC als Stabilitätspuffer. 20 Prozent ETH-basierte Assets. DAI ist nicht mehr rein dezentral — es hat Exposure zu USA-Banksystem und Circle. Aber: sehr etabliert, mehrere Peg-Verteidigungs-Mechanismen, diversifiziertes Collateral.

**[Slide 4]** crvUSD von Curve, gestartet 2023. Das Schlüssel-Feature ist LLAMMA — Lending-Liquidating AMM Algorithm. Statt diskreter Liquidationen wird die Position kontinuierlich zwischen Collateral und Stablecoin umgeschichtet, während der Preis schwankt. Weniger harte Cliffs, aber kann effektiv wie Impermanent Loss wirken bei volatilen Preisen. Jünger als DAI, weniger Track-Record, aber innovativer Ansatz.

**[Slide 5]** LUSD von Liquity Protocol, gestartet 2021. Der puristischste Ansatz. Nur ETH als Collateral. 110 Prozent Minimum-Collateralization-Ratio — sehr aggressiv. Null Zins auf Borrow, stattdessen einmalige Gebühren. Keine Governance, keine Admin-Keys, unveränderbar. Das Protokoll kann nicht zensiert oder geändert werden. LUSD ist die Wahl für Nutzer, die maximale Dezentralität wollen.

**[Slide 6]** Weitere relevante krypto-besicherte Stablecoins. GHO von Aave, 2023 gestartet, moderater TVL. USDS von Sky als Parallel zu DAI, mit Opt-in-Features. FRAX als Hybrid-Design — teils algorithmisch, teils besichert, zu komplex für konservative Portfolios.

**[Slide 7]** Die konservative Auswahl. DAI trotz RWA- und USDC-Exposure akzeptabel als Diversifikations-Baustein — sehr etabliert. crvUSD interessant für DeFi-native Nutzer mit moderatem Risikobudget, aber nicht als Hauptposition. LUSD als echte Dezentralität, sinnvoll für Zensur-Resistenz, weniger in DeFi integriert. Was zu meiden ist: algorithmische oder stark hybride Stablecoins ohne klare Track-Record.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Diagramm: Collateral > Stablecoin mit Überbesicherungs-Visualisierung.

**[Slide 3]** **SCREENSHOT SUGGESTION:** makerburn.com Dashboard mit aktueller DAI-Collateral-Breakdown-Grafik. Alternativ: spark.fi mit sDAI-Übersicht.

**[Slide 4]** LLAMMA-Mechanik visualisiert: Preis-Chart mit kontinuierlicher Umschichtung.

**[Slide 5]** **SCREENSHOT SUGGESTION:** liquity.app Interface mit Vault-Übersicht und 110% CR.

**[Slide 6]** Vergleichstabelle der weiteren Stablecoins.

**[Slide 7]** Diversifikations-Allokations-Beispiel für konservatives Portfolio.

### Übung

**Aufgabe: Krypto-besicherte Stablecoins vergleichen**

1. Besuche makerburn.com oder Sky.money für DAI/USDS-Status.
2. Besuche crvusd.fi für crvUSD-Status.
3. Besuche liquity.app für LUSD-Status.
4. Für jeden Stablecoin dokumentiere:
 - Aktuelle Market Cap
 - Collateral-Zusammensetzung (Top 3 Typen mit Prozent)
 - Peg-Status (aktueller Preis)
 - Savings Rate / Rendite für Halter, falls anwendbar
 - Dein subjektives Risiko-Urteil (1–10)
5. Überlege: Welcher wäre für einen zensur-resistenten Portfolio-Anteil geeignet, welcher für reine Rendite-Optimierung?

**Deliverable:** Vergleichstabelle + Portfolio-Vorschlag: Wenn du 15.000 USD über diese drei Stablecoins verteilen würdest, wie wäre die Aufteilung und warum?

### Quiz

**Frage 1:** Warum ist DAI heute nicht mehr der "rein dezentrale Stablecoin" wie er ursprünglich konzipiert wurde?

<details>
<summary>Antwort anzeigen</summary>

Das DAI-Design hat sich über die Jahre entwickelt, um Stabilität und Skalierbarkeit zu verbessern — auf Kosten der reinen Dezentralität. Zwei Hauptveränderungen: Erstens wurde das Peg Stability Module (PSM) eingeführt, das USDC direkt 1:1 gegen DAI tauschbar macht. Das bedeutet, ein signifikanter Teil der DAI-"Besicherung" ist effektiv USDC — und damit abhängig von Circle und dem US-Banken-System. Zweitens wurden Real World Assets als Collateral-Typ eingeführt — konkret Investitionen in US-Treasuries via externe Partner. Das bringt Ertrag (~5%+ risk-free rate auf die RWA-Anteile), macht aber DAI von der US-Finanzinfrastruktur abhängig. Heute besteht das DAI-Collateral zu einem großen Teil aus Assets mit zentraler Abhängigkeit. LUSD hat bewusst diesen Weg nicht genommen — es blieb rein ETH-besichert und ohne RWA. Der Trade-off ist klassisch: DAI wurde stabiler und skalierbarer, aber weniger rein dezentral. Für konservative Portfolios ist DAI weiterhin akzeptabel als Diversifikations-Element, aber der Claim "vollständig dezentral" trifft nicht mehr zu.
</details>

**Frage 2:** Wie funktioniert LUSDs Redemption-Mechanismus, und warum ist er sowohl Stabilitäts-Feature als auch potenzielles Risiko für einzelne Borrower?

<details>
<summary>Antwort anzeigen</summary>

LUSD kann jederzeit 1:1 gegen ETH aus dem globalen Vault-Pool eingelöst werden. Wenn jemand 100 LUSD einlöst, bekommt er ETH im Wert von 100 USD (minus Redemption-Fee) — aus den Positionen der Vault-Betreiber. Die redemption wird auf die Vaults mit der niedrigsten Collateralization-Ratio zuerst angewandt. Das ist Peg-Stabilitäts-Feature: wenn LUSD unter Peg handelt, wird die Redemption profitabel — Arbitrageure kaufen LUSD unter Peg, lösen es für vollen ETH-Wert ein, machen Gewinn. Der Supply wird reduziert, der Peg kehrt zurück. Für einzelne Borrower kann das unangenehm sein: wenn ihr Vault die niedrigste CR hat, wird ihr ETH "zwangs-konvertiert" zu LUSD (die Schuld reduziert sich, aber auch das ETH-Collateral). Bei aggressiven Ratios nahe 110% kann das oft passieren. Das ist der Preis der LUSD-Stabilität: aktive Vault-Manager müssen ihre CR bewusst hoch genug halten, um nicht ständig redeemed zu werden. Für LUSD-Halter ist der Mechanismus ein Sicherheits-Feature. Für Vault-Betreiber eine laufende Management-Anforderung. Für konservative LUSD-Halter: der Mechanismus ist Vorteil, keine Sorge.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → Überbesicherung-Grundprinzip → DAI/Sky → crvUSD & LLAMMA → LUSD (puristisch dezentral) → Weitere (GHO, USDS, FRAX) → Konservative Auswahl
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — CDP-Mechanik-Diagramm, MakerDAO-PSM-Architektur, LLAMMA-Soft-Liquidation-Grafik, LUSD-Redemption-Flow, Stablecoin-Design-Vergleichstabelle

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 8.4 — Rendite-tragende Stablecoins: sDAI, sUSDS, Savings-Mechanismen

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Das Prinzip yield-bearing Stablecoins erklären
- sDAI, sUSDS und Ethenas USDe/sUSDe nach Mechanismus und Risiko unterscheiden
- Einsatzbereiche für konservative Portfolios einordnen
- Die DSR (DAI Savings Rate) und vergleichbare Mechanismen als Rendite-Quelle analysieren
- Ethenas Delta-Hedging-Strategie (USDe) als strukturell anderes Modell gegenüber klassischen Stablecoins einordnen
- Rendite-tragende Stablecoins gegenüber klassischen Supply-Positionen auf Aave/Compound nach Effizienz und Risiko abwägen

### Erklärung

Klassische Stablecoins wie USDC und USDT sind passive Assets — sie halten den Peg, aber verdienen keine Rendite. Yield-bearing Stablecoins kombinieren Peg-Stabilität mit integriertem Ertrag. Das macht sie für viele konservative Strategien attraktiv.

**Das Grundkonzept**

Ein Yield-bearing Stablecoin ist typischerweise ein Token, dessen Wert pro Stück **wächst** durch integrierten Ertrag, während der interne "Wechselkurs" zum unterliegenden Dollar-Äquivalent steigt. Beispiel: 1 sDAI ist heute 1,0 DAI wert. In 12 Monaten ist 1 sDAI dann 1,08 DAI wert — 8% Rendite.

Das ist analog zu Aaves aTokens aus Modul 6 — yield-bearing Tokens, bei denen der Wert pro Token wächst, statt neuer Tokens zu entstehen.

**sDAI — Savings DAI**

**Mechanismus:** 
Sky (ehemals MakerDAO) bietet die "DAI Savings Rate" (DSR), eine algorithmisch gesetzte Rate, zu der DAI-Halter ihr DAI verzinsen können. Wer DAI in sDAI umwandelt (via Spark, Sky-Interface oder direktem Contract), verdient die DSR.

**Quelle der Rendite:** 
Die DSR wird aus den Einnahmen von Sky finanziert — hauptsächlich Zinsen von den RWA-Anteilen (US-Treasuries) und Stability Fees aus Vault-Borrow. Diese Rate wird via Sky-Governance gesetzt.

**Aktuelle Rate (variabel):** 
Historisch zwischen 3% und 8%. Aktuell an risk-free rate orientiert (~5% bei hohen US-Fed-Rates).

**Auszahlung:** 
Automatisch via wachsendem sDAI-Wert. Kein Claiming nötig.

**Risiken:** 
- DAI-Depeg-Risiko (wie bei DAI selbst)
- RWA-Gegenpartei-Risiko (US-Treasuries-Exposure)
- Governance-Risiko (Rate kann reduziert werden)

**sUSDS — Sky Savings Rate**

**Mechanismus:** 
Parallel zu DAI hat Sky USDS eingeführt — ein neues Stablecoin mit Sky-Points (Loyalitäts-Programm) und Savings-Mechanismus. sUSDS ist die Savings-Variante.

**Unterschied zu sDAI:**
USDS und DAI sind im Wesentlichen Zwillinge, die gegeneinander 1:1 konvertierbar sind. sUSDS bietet zusätzliche Sky-Points-Rewards (die potenziell als zukünftige Token-Ausgaben genutzt werden können). Für konservative Nutzer ist der Unterschied gering — die reine Rendite ist ähnlich.

**Ethenas USDe / sUSDe — Der Delta-neutrale Ansatz**

Ethena Labs hat einen innovativen Stablecoin entwickelt, der nicht auf klassischer Besicherung basiert, sondern auf **Delta-neutralem Hedging**.

**Das Prinzip:**
1. Nutzer deponieren ETH oder Liquid-Staking-Tokens (z.B. stETH)
2. Ethena öffnet eine gleich große Short-Position auf ETH-Perpetual-Futures auf zentralen Börsen
3. Die Netto-Exposition ist null (long Spot + short Futures) — "delta-neutral"
4. Das Protokoll mintet USDe basierend auf dem dollar-Wert der delta-neutralen Position

**Quelle der Rendite (sUSDe):**
- Staking-Rewards auf dem stETH-Underlying
- Funding-Rate-Einnahmen aus den Short-Perpetual-Positionen (historisch oft positiv für Shorts)

**Historische sUSDe-Rendite:** 
10–20% APY (deutlich höher als sDAI wegen funding rates und staking)

**Risiken:**
- **Funding-Rate-Risiko:** Wenn funding rates negativ werden, verliert das Protokoll Geld statt zu verdienen
- **Exchange-Risiko:** Die Shorts laufen auf CEXs (Binance, Bybit, OKX). Exchange-Ausfall = Verlust
- **Liquidations-Risiko:** Bei extremen ETH-Bewegungen könnten die Shorts liquidiert werden, bevor Rebalancing möglich ist
- **Smart-Contract-Risiko:** Ethena-Code selbst
- **Custody-Risiko:** Die underlying Assets liegen in OES (Off-Exchange Settlement) Setups — komplexe Custody-Strukturen

**Bewertung für konservative Portfolios:**
USDe/sUSDe ist ein **innovatives, aber deutlich riskanteres** Stablecoin-Design als sDAI. Die höhere Rendite spiegelt das zusätzliche Risiko wider. Für das 7–8%-Ziel **nicht als Hauptallokation** empfohlen — allenfalls als kleinerer Baustein (max. 10–15% der Stablecoin-Allokation) für erfahrene Nutzer, die das Mechanik-Risiko verstehen.

**Weitere yield-bearing Stablecoins**

- **sFRAX:** Savings-Variante von FRAX. Weniger etabliert, für konservative Portfolios nicht empfohlen.
- **aUSDC (Aave):** Technisch ein zinsbringender USDC-Receipt aus Aave — keine echter neuer Stablecoin, aber yield-bearing.
- **mkUSD, yUSD:** Kleinere, experimentelle Yield-Stables. Meist zu klein und zu jung für konservative Allokation.

**Praktische Anwendung**

**Sinnvolle Szenarien:**

**Szenario 1: Parken von Cash mit Rendite**
Du hast 10.000 USDC in deiner Wallet, willst sie aber nicht ungenutzt lassen. Wandle einen Teil in sDAI um — behältst Dollar-Stabilität, verdienst Zinsen. Jederzeit wieder zu DAI (oder USDC via Curve) konvertierbar.

**Szenario 2: Stablecoin-Reserve mit passivem Ertrag**
Deine Notreserve von 5.000 USD liegt typisch einfach in Stablecoin. Wandle sie in sDAI um. Die Liquidität ist nahezu identisch — jederzeit aufzulösen. Aber mit 5% statt 0% jährlicher Rendite.

**Szenario 3: Als Collateral**
sDAI und sUSDS können in vielen Lending-Protokollen als Collateral genutzt werden. Das gibt dir Stablecoin-Rendite **und** Borrow-Fähigkeit. Aber: LTV auf sDAI ist typisch etwas niedriger als auf DAI (wegen zusätzlicher Komplexität).

**Nicht empfohlen:**
- sUSDe als Hauptposition für konservative Portfolios (zu viele Risiko-Ebenen)
- Unbekannte Yield-Stables ohne Track-Record
- Konzentration in einer einzigen Yield-Stablecoin-Familie

**Konservative Allokations-Regel**

Wenn Yield-bearing Stablecoins im Portfolio vorkommen:
- **sDAI / sUSDS:** Akzeptabel als Kern-Yield-Stable, bis zu 30–40% der Stablecoin-Allokation
- **sUSDe:** Nur für erfahrene Nutzer mit Risikobudget, max. 10–15% der Stablecoin-Allokation
- **Unbekannte Yield-Stables:** 0%

### Folien-Zusammenfassung

**[Slide 1] — Titel**
Rendite-tragende Stablecoins: sDAI, sUSDS, Savings-Mechanismen

**[Slide 2] — Grundkonzept**
Token-Wert wächst durch integrierten Yield
Analog zu aTokens (Aave)
Keine separaten Reward-Claims nötig

**[Slide 3] — sDAI**
Savings DAI via Sky Savings Rate (DSR)
Rendite aus RWA (T-Bills) + Stability Fees
Historisch 3–8%, an risk-free rate orientiert

**[Slide 4] — sUSDS**
Sky-Zwilling zu sDAI mit Sky-Points-Bonus
Im Kern sehr ähnlich zu sDAI

**[Slide 5] — Ethenas USDe / sUSDe**
Delta-neutral-Hedging-Design
Rendite: Staking + Funding Rates
Historisch 10–20% APY
Deutlich mehr Risiken als sDAI

**[Slide 6] — Anwendungs-Szenarien**
1. Passives Cash parken
2. Reserve mit Ertrag
3. Als Collateral für Borrow

**[Slide 7] — Konservative Allokation**
sDAI/sUSDS: 30–40% der Stable-Position OK
sUSDe: max. 10–15%, nur für Erfahrene
Unbekannte Yield-Stables: 0%

### Sprechertext

**[Slide 1]** Klassische Stablecoins wie USDC halten den Peg, verdienen aber nichts. Yield-bearing Stablecoins kombinieren Peg-Stabilität mit integriertem Ertrag. Das macht sie für konservative Strategien oft attraktiver als passive Stables.

**[Slide 2]** Das Grundkonzept. Der Wert pro Token wächst durch integrierten Yield. Wenn du heute einen sDAI für 1 DAI kaufst, ist dieser sDAI in 12 Monaten etwa 1,05 oder 1,08 DAI wert — je nach Savings Rate. Das ist analog zu aTokens aus Modul 6. Keine separaten Claims, kein Staking — der Ertrag akkumuliert automatisch im Token-Wert.

**[Slide 3]** sDAI, Savings DAI. Sky bietet die DAI Savings Rate an, zu der DAI-Halter verzinsen können. Wer DAI in sDAI umwandelt, verdient diese Rate. Die Rendite kommt hauptsächlich aus den Sky-RWA-Einnahmen — US-Treasuries — und Stability Fees aus Vaults. Historisch zwischen 3 und 8 Prozent. Aktuell an der risk-free rate der US-Fed orientiert, etwa 5 Prozent. Variable Rate, wird via Governance gesetzt.

**[Slide 4]** sUSDS ist der Zwilling von sDAI im Sky-Ökosystem. Sky hat USDS parallel zu DAI eingeführt, mit zusätzlichen Sky-Points als Loyalitäts-Programm. sUSDS ist die Savings-Variante. Kernmechanik ist sehr ähnlich zu sDAI. Für konservative Nutzer ist der Unterschied gering.

**[Slide 5]** Ethenas USDe und die Savings-Variante sUSDe. Ein innovatives Delta-neutrales Design. Das Protokoll hält ETH spot-long und hedget gleichzeitig via Perpetual-Futures-Shorts auf CEXs. Die Netto-Exposition ist null. Die Rendite kommt aus Staking des unterliegenden stETH und aus Funding-Rate-Einnahmen der Shorts. Historisch 10 bis 20 Prozent APY — deutlich höher als sDAI. Aber: viele zusätzliche Risiken. Funding Rates können negativ werden. Exchange-Ausfall-Risiko. Liquidations-Risiko bei extremen Bewegungen. Komplexe Custody-Strukturen. Für konservative Portfolios nur als kleine Allokation geeignet, wenn überhaupt.

**[Slide 6]** Drei sinnvolle Anwendungs-Szenarien. Erstens: passives Cash parken. Wandle Teile deiner Stablecoin-Bestände in sDAI um, verdiene automatisch Zinsen. Zweitens: Notreserve mit Ertrag. Die fünftausend Dollar Reserve, die einfach so rumliegen, verdienen jetzt 5 Prozent. Drittens: als Collateral. sDAI kann in vielen Lending-Protokollen als Sicherheit genutzt werden — du bekommst Yield und kannst darauf borgen, wenn gewünscht.

**[Slide 7]** Die konservativen Allokations-Regeln. sDAI oder sUSDS: akzeptabel als Kern-Yield-Stable, bis zu 30 oder 40 Prozent der Stablecoin-Allokation. sUSDe: nur für erfahrene Nutzer mit Risikobudget, maximal 10 bis 15 Prozent. Unbekannte Yield-Stables ohne Track-Record: null Prozent. Die Faustregel: höhere Rendite bedeutet fast immer höheres Risiko. Für das 7 bis 8 Prozent Ziel sind 5 Prozent aus sDAI plus diversifizierter Supply-Strategie sinnvoller als 15 Prozent aus Risiko-Stablecoins.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Diagramm: Token-Wert wächst über Zeit. Vergleich mit passivem Stablecoin (flat) und sDAI (wachsende Kurve).

**[Slide 3]** **SCREENSHOT SUGGESTION:** Spark Protocol (spark.fi) mit sDAI-Savings-Interface und aktueller Rate.

**[Slide 4]** Sky-Interface mit USDS/sUSDS.

**[Slide 5]** Ethena-Mechanik-Diagramm: ETH-Long + Futures-Short = delta-neutral. **SCREENSHOT SUGGESTION:** Ethena-Dashboard mit aktueller sUSDe-Rate und Funding-Rate-Historie.

**[Slide 6]** Drei-Anwendungs-Cards mit Szenarien.

**[Slide 7]** Allokations-Kuchen-Diagramm mit Prozent-Limits.

### Übung

**Aufgabe: Yield-Vergleich der Stablecoin-Optionen**

1. Sammle aktuelle Raten für:
 - Passives USDC (Wallet-Halten, 0% Yield)
 - USDC-Supply auf Aave V3
 - sDAI via Spark
 - sUSDS via Sky
 - sUSDe via Ethena
 - Curve 3pool LP
2. Berechne die 1-Jahres-Rendite für einen hypothetischen 10.000 USD Einsatz in jeder Option.
3. Liste für jede Option die wichtigsten Risiken auf.
4. Erstelle ein Risk-Return-Diagramm: y-Achse Rendite, x-Achse subjektives Risiko.

**Deliverable:** Vergleichstabelle + Diagramm + Empfehlung: Welche Kombination wäre für einen Stablecoin-Anteil von 20.000 USD in einem konservativen Portfolio sinnvoll?

### Quiz

**Frage 1:** Warum ist sUSDe's 15% APY strukturell nicht mit sDAI's 5% APY vergleichbar, auch wenn beide "Stablecoin-Renditen" sind?

<details>
<summary>Antwort anzeigen</summary>

Die Mechanismen sind fundamental unterschiedlich. sDAI leitet Rendite aus quasi-risikofreien Quellen ab: US-Treasury-Zinsen (RWA) und Stability Fees aus überbesicherten Vaults. Das sind etablierte, gut verstandene Ertragsquellen mit klarem Mechanismus. sUSDe leitet Rendite aus zwei volatilen Quellen ab: Staking-Yields (relativ stabil, etwa 3%) und Funding-Rate-Einnahmen aus Perpetual-Futures-Shorts (sehr volatil, historisch positiv aber nicht garantiert). Die 15% bei sUSDe sind ein Durchschnitt aus guten Zeiten, wenn Funding Rates hoch positiv sind. In Bear-Markets oder bei extremen Ereignissen können Funding Rates negativ werden — dann verliert das Protokoll Geld und die Rendite kann auf null oder negativ fallen. Zusätzlich trägt sUSDe das Exchange-Risiko (Shorts auf CEXs) und das Custody-Risiko (komplexe Off-Exchange-Settlement-Setups). Die 15% sind also keine "risikofreie Rendite", sondern eine Kompensation für mehrere Risikoschichten, die sDAI nicht hat. Für konservative Portfolios heißt das: sDAI ist ein Kern-Yield-Baustein, sUSDe ist bestenfalls eine kleine taktische Allokation.
</details>

**Frage 2:** Ein Anleger überlegt, 30.000 USD seiner konservativen Stablecoin-Position komplett in sUSDe zu stecken, weil es 15% APY bietet. Was sind die Haupt-Probleme dieser Entscheidung?

<details>
<summary>Antwort anzeigen</summary>

Mehrere Probleme. Erstens: Konzentrationsrisiko. 100% eines signifikanten Portfolios in einem einzelnen, relativ jungen Protokoll (Ethena seit 2024) ist extreme Konzentration. Zweitens: Mechanismus-Stress. sUSDe's 15% ist historisch Durchschnitt — in Stressphasen (negative Funding Rates, Exchange-Probleme) kann die Rendite einbrechen, und im schlimmsten Fall kann der USDe-Peg selbst unter Druck geraten. Das ist bei sDAI strukturell weniger wahrscheinlich. Drittens: Liquiditätsrisiko. sUSDe-Cooldown-Periode zum Unstaking kann 7 Tage betragen — in einer Krise nicht schnell genug. Viertens: Exchange-Abhängigkeiten. Ethena nutzt Binance, Bybit und OKX für die Shorts. Ein Ausfall oder Insolvenz einer dieser Exchanges könnte direkten Verlust bedeuten. Fünftens: regulatorisches Risiko. Delta-neutrale Designs werden von Regulatoren weltweit zunehmend beobachtet — ein regulatorischer Eingriff könnte den Mechanismus unterbrechen. Eine deutlich bessere Allokation für 30.000 USD wäre beispielsweise: 40% USDC-Supply auf Aave (konservative Basis), 30% sDAI (Yield mit moderatem Risiko), 15% USDT (CEX-Liquidität), 10% LUSD (dezentrale Reserve), 5% sUSDe (kleine höherverzinsliche Position). Das diversifiziert auf mehrere Mechanismen und Emittenten, statt ein einziges Protokoll als alleinigen Ausfall-Punkt zu haben.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → Yield-bearing Grundprinzip → sDAI/DSR → sUSDS → Ethena USDe/sUSDe → Delta-Hedging-Mechanik → Risiko-Vergleich
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — DSR-Mechanik-Diagramm, Yield-Source-Breakdown für jeden Stablecoin, Delta-Hedging-Flow (Ethena), Risiko-vs-Rendite-Chart

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 8.5 — Depeg-Risiken systematisch

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die fünf Haupt-Depeg-Auslöser systematisch identifizieren
- Historische Depegs ihrer Mechanismus-Kategorie zuordnen
- Depeg-Frühwarnsignale erkennen
- Die Depeg-Case-Studies USDC März 2023, UST Mai 2022 und DAI März 2020 in ihrer Mechanik vergleichen
- Depeg-Monitoring-Tools (Curve-Pool-Bestände, DeFiLlama Peg-Tracker, CeX-Preise) praktisch nutzen
- Notfall-Handlungsoptionen bei laufendem Depeg (halten, swappen, neu besichern) situationsgerecht anwenden

### Erklärung

Depegs sind das zentrale Risiko für Stablecoin-Halter. Sie können temporär oder dauerhaft, minor oder katastrophal sein. Diese Lektion systematisiert die Ursachen und zeigt, was du beobachten kannst, um Depegs früh zu erkennen.

**Die fünf Haupt-Depeg-Auslöser**

**Auslöser 1: Reserve-Zugang blockiert (fiat-besicherte Stables)**

Das USDC-Beispiel vom März 2023. Die Reserven existieren, sind aber temporär nicht zugänglich — wegen Bank-Krise, Feiertags-Wochenende, Sanktionen oder technischen Problemen. Der Arbitrage-Mechanismus funktioniert nicht mehr, der Preis driftet.

**Frühwarnsignale:**
- News über Banking-Partner-Probleme
- Pausierte Mint- oder Redeem-Operationen des Emittenten
- Ungewöhnlich hohe Trading-Volumina mit Verkaufsdruck

**Historisch:** USDC März 2023 (SVB), USDT mehrfach temporär (Banking-Partner-Wechsel).

**Auslöser 2: Reserve-Solvabilitäts-Zweifel**

Wenn der Markt anfängt zu zweifeln, ob die Reserven des Emittenten tatsächlich voll vorhanden sind, entsteht Verkaufsdruck. Selbst wenn die Reserven real existieren, kann der Peg unter Stress geraten.

**Frühwarnsignale:**
- Verzögerte oder fehlende Audit-Reports
- Änderung des Auditors zu einer weniger renommierten Firma
- Regulatorische Ermittlungen gegen den Emittenten
- Insider-Informationen oder Whistleblower-Berichte

**Historisch:** USDT hatte mehrfach solche Episoden (z.B. 2018, 2022), aber der Peg hielt robust. Hypothetisch: wenn solche Zweifel eskalieren würden, könnte ein Bank-run-ähnliches Szenario entstehen.

**Auslöser 3: Collateral-Kollaps (krypto-besicherte Stables)**

Wenn das zugrundeliegende Collateral stark und schnell fällt, können Liquidationen nicht schnell genug ausgeführt werden. Die Sicherheit fällt unter die Schuld, und das Protokoll hat Bad Debt. Der Stablecoin ist nicht mehr voll besichert.

**Frühwarnsignale:**
- Extreme Volatilität des Haupt-Collateral-Assets
- Wachsende Anzahl von Vaults nahe der Liquidations-Grenze
- Abnehmende Liquidität für Liquidations-Ausführung

**Historisch:** MakerDAO Black Thursday März 2020 — temporäres Problem mit Bad Debt, überlebt durch MKR-Emission. Keine DAI-Depeg, aber nah dran.

**Auslöser 4: Mechanismus-Versagen (algorithmische Stables)**

Der Peg-Mechanismus selbst versagt unter Stress. Bei algorithmischen Stablecoins kann das katastrophal sein — das ganze System ist darauf ausgelegt, durch Supply-Anpassungen den Peg zu halten, und wenn die Anpassung nicht greift, stürzt das System ins Chaos.

**Frühwarnsignale:**
- Treibende Peg-Abweichungen (kleine, aber anhaltende)
- Sinkende Nachfrage nach dem System-Token (z.B. LUNA-Preis-Verfall)
- Wachsender Druck auf den Stabilitäts-Mechanismus

**Historisch:** UST-Kollaps Mai 2022 — Anchor-Protocol-Outflows lösten eine Spirale aus, in der LUNA-Preis fiel, der UST-Mint-Mechanismus versagte, beide Tokens kollabierten. Etwa 60 Mrd. USD zerstört.

**Auslöser 5: Funding-Rate oder Yield-Kollaps (delta-neutrale Stables)**

Für USDe-artige Designs: wenn funding rates negativ werden oder der Staking-Yield wegfällt, kann das Protokoll Geld verlieren statt zu verdienen. Bei anhaltend negativen funding rates schmilzt das Collateral.

**Frühwarnsignale:**
- Anhaltend negative funding rates
- Starke Bear-Markt-Szenarien
- Stark sinkende Perpetual-Volumina auf unterliegenden Exchanges

**Historisch:** Bei Ethena-Vorläufern und kleineren delta-neutralen Experimenten gab es Stress-Ereignisse, aber USDe selbst hatte bisher keinen signifikanten Depeg.

**Frühwarnsignale im Preis selbst**

Oft kann man einen Depeg in seinem Beginn an Preis-Metriken erkennen:

**Chronische minor deviations (z.B. konsistent 0,998–0,999):**
Nicht alarmierend, aber auf leichten Angebots-Nachfrage-Ungleichgewichten hinweisend.

**Akute aber kleine Spikes nach unten (z.B. kurz auf 0,99):**
Oft Panic in kleineren Märkten oder Liquidations-Kaskaden. Meist schnell erholt.

**Anhaltende Drift unter 0,99:**
Ernsthaftes Warnzeichen. Der Arbitrage-Mechanismus funktioniert nicht effektiv. Ursachen-Analyse nötig.

**Preis unter 0,97:**
Signifikantes Risiko. Bei fiat-besicherten Stablecoins fast immer ein Infrastructure-Problem. Bei krypto-besicherten könnte es Collateral-Probleme sein.

**Preis unter 0,90:**
Stark gefährdet. Ohne schnelle Korrektur-Mechanismen ist ein weiterer Verfall wahrscheinlich.

**Depeg-Monitoring-Tools**

**Preis-Tracking:**
- **CoinGecko** (coingecko.com) — zeigt Preis-Abweichungen für alle großen Stablecoins
- **DeFiLlama Stablecoins** (defillama.com/stablecoins) — spezielles Dashboard für Stablecoin-Metriken
- **Curve-Pool-Charts** — Curve-Pools reflektieren On-Chain-Preise sehr schnell

**Reserve-Monitoring:**
- Emittenten-Transparenz-Seiten (circle.com, tether.to)
- makerburn.com für DAI/Sky-Ökosystem
- llama.airforce oder ähnliche für crvUSD-Details

**Alert-Services:**
- **HAL.xyz** — konfigurierbare Alerts bei Preis-Abweichungen
- **Nansen** — on-chain Flow-Analyse
- Manche CEXs bieten Price-Alerts

**Was bei einem Depeg tun**

**Bei Minor Depeg (0,995–1,005):**
Typisch kein Handlungsbedarf. Kann Liquiditäts-Schwankung oder temporäre Order-Flow-Imbalance sein.

**Bei Moderatem Depeg (0,98–0,995):**
Ursache untersuchen. Ist es technisch (Infrastructure) oder fundamental (Solvabilitäts-Sorgen)? Je nach Antwort: halten oder teilweise reduzieren.

**Bei Signifikantem Depeg (unter 0,97):**
Schnell handeln. Möglicherweise Position signifikant reduzieren oder ganz auflösen. Die Opportunitätskosten des "Warten auf Erholung" können groß sein — und nicht jeder Depeg erholt sich (UST).

**Frühe vorbeugende Diversifikation**

Die beste Depeg-Verteidigung ist **Diversifikation vor dem Ereignis**. Ein Portfolio mit 30% USDC, 30% USDT, 20% DAI, 10% LUSD, 10% sDAI überlebt jeden historischen Depeg deutlich besser als ein Portfolio mit 100% in einem einzigen Stable. Selbst ein katastrophaler Kollaps eines Stablecoins kostet nur einen Teil des Portfolios.

### Folien-Zusammenfassung

**[Slide 1] — Titel**
Depeg-Risiken systematisch

**[Slide 2] — Fünf Haupt-Auslöser**
1. Reserve-Zugang blockiert
2. Reserve-Solvabilitäts-Zweifel
3. Collateral-Kollaps
4. Mechanismus-Versagen (algo)
5. Funding-Rate/Yield-Kollaps

**[Slide 3] — Historische Fälle**
USDC März 2023 (SVB)
UST Mai 2022 (algo-Kollaps)
DAI März 2020 (Black Thursday, nahe)

**[Slide 4] — Preis-Frühwarnsignale**
Chronische minor deviations: wachsam
Unter 0,99 anhaltend: Alarm
Unter 0,97: ernste Gefahr
Unter 0,90: stark gefährdet

**[Slide 5] — Monitoring-Tools**
CoinGecko, DeFiLlama, Curve-Pools
Reserve-Seiten, HAL.xyz
Nansen für on-chain

**[Slide 6] — Depeg-Reaktion**
Minor: halten
Moderat: Ursache prüfen
Signifikant: schnell handeln

**[Slide 7] — Beste Verteidigung: Diversifikation**
30/30/20/10/10-Allokation überlebt jeden historischen Depeg

### Sprechertext

**[Slide 1]** Depegs sind das zentrale Risiko für Stablecoin-Halter. Sie können temporär oder dauerhaft sein, klein oder katastrophal. Diese Lektion systematisiert die Ursachen und gibt dir die Werkzeuge, Depegs früh zu erkennen.

**[Slide 2]** Fünf Hauptauslöser. Erstens: Reserve-Zugang blockiert bei fiat-besicherten Stables. Das USDC-März-2023-Beispiel. Reserven existieren, sind aber temporär nicht erreichbar. Zweitens: Reserve-Solvabilitäts-Zweifel. Der Markt zweifelt an den Reserven — kann auch ohne echten Solvabilitäts-Ausfall Peg-Stress erzeugen. Drittens: Collateral-Kollaps bei krypto-besicherten Stables. Sicherheit fällt schneller als Liquidationen ausführbar sind. Viertens: Mechanismus-Versagen bei algorithmischen Stables — UST-Kollaps als Beispiel. Fünftens: Funding-Rate- oder Yield-Kollaps bei delta-neutralen Designs.

**[Slide 3]** Die historischen Fälle als Lehrmaterial. USDC im März 2023 — SVB-Bank-Kollaps, 3,3 Milliarden eingefroren, 72 Stunden Depeg, dann Erholung. UST im Mai 2022 — algorithmisches Versagen, permanenter Kollaps, 60 Milliarden zerstört. DAI im März 2020 — Black Thursday, temporäres Bad-Debt-Problem bei MakerDAO, DAI selbst hielt Peg größtenteils, aber das Protokoll war nahe am Abgrund. Jeder Fall zeigt unterschiedliche Mechanismus-Versagen.

**[Slide 4]** Preis-Frühwarnsignale. Chronische minor deviations um 0,998 bis 0,999 — nicht akut, aber Aufmerksamkeit. Anhaltende Drift unter 0,99 — ernsthaftes Warnzeichen, der Arbitrage-Mechanismus funktioniert nicht effektiv. Unter 0,97 — signifikantes Risiko, meist ein echtes Infrastructure- oder Collateral-Problem. Unter 0,90 — stark gefährdet, ohne schnelle Korrektur ist weiterer Verfall wahrscheinlich.

**[Slide 5]** Monitoring-Tools. CoinGecko für Preis-Übersicht. DeFiLlama Stablecoins-Dashboard. Curve-Pool-Charts reflektieren On-Chain-Preise besonders schnell. Reserve-Transparenz-Seiten der Emittenten. HAL.xyz für konfigurierbare Alerts bei Preis-Abweichungen. Nansen für on-chain Flow-Analyse. Diese Tools sind öffentlich und kostenlos.

**[Slide 6]** Reaktion bei Depeg. Minor Depeg 0,995 bis 1,005 — typisch kein Handlungsbedarf, Liquiditäts-Schwankung. Moderater Depeg 0,98 bis 0,995 — Ursache untersuchen, je nach Natur halten oder reduzieren. Signifikanter Depeg unter 0,97 — schnell handeln, möglicherweise Position auflösen. Das "Warten auf Erholung" ist nicht immer die richtige Antwort — nicht jeder Depeg erholt sich.

**[Slide 7]** Die beste Verteidigung ist Diversifikation vor dem Ereignis. Ein Portfolio mit 30 Prozent USDC, 30 Prozent USDT, 20 Prozent DAI, 10 Prozent LUSD und 10 Prozent sDAI überlebt jeden historischen Depeg deutlich besser als ein Portfolio mit hundert Prozent in einem Stable. Selbst ein katastrophaler Kollaps kostet nur einen Teil. Die aktive Depeg-Reaktion ist immer eine Zweit-Verteidigung — die Erst-Verteidigung ist, dass ein Einzel-Depeg nicht das ganze Portfolio gefährdet.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Fünf-Karten-Matrix der Auslöser mit Beispielen.

**[Slide 3]** Zeitachse mit den drei historischen Fällen, Preis-Chart-Snippets.

**[Slide 4]** Farbkodiertes Depeg-Level-Diagramm (grün/gelb/orange/rot).

**[Slide 5]** **SCREENSHOT SUGGESTION:** defillama.com/stablecoins Dashboard. Daneben HAL.xyz Alert-Interface.

**[Slide 6]** Entscheidungsbaum basierend auf Depeg-Tiefe.

**[Slide 7]** Portfolio-Allokations-Kuchen mit Vergleich konzentriert vs. diversifiziert.

### Übung

**Aufgabe: Depeg-Analyse historischer Events**

Wähle eines der folgenden historischen Depeg-Events und analysiere es tief:
- USDC März 2023
- UST Mai 2022
- stETH Juni 2022 (technisch ein Pegged Asset, nicht Stablecoin, aber analog)

Für das gewählte Event dokumentiere:

1. **Was war der Auslöser** (einer der fünf Kategorien)?
2. **Preis-Verlauf** (niedrigster Preis, Erholungszeit falls zutreffend)
3. **Frühwarnsignale**, die es vor dem Depeg gab
4. **Reaktionen** des Emittenten/Protokolls
5. **Ergebnis für Halter** (Verlust, Recovery, Lektion)
6. **Was hättest du als konservativer Nutzer anders machen können**

**Deliverable:** 2–3 Seiten Case-Study-Dokument mit den 6 Punkten strukturiert.

### Quiz

**Frage 1:** Warum ist das Warten auf Erholung bei einem Depeg nicht immer die beste Strategie?

<details>
<summary>Antwort anzeigen</summary>

Weil nicht jeder Depeg sich erholt. Der UST-Kollaps 2022 ist das drastischste Beispiel: UST fiel von 1 USD auf etwa 0,10 USD in wenigen Tagen und danach weiter — endgültig gescheitert. Wer darauf wartete, dass "der Peg zurückkommt", verlor den Großteil seiner Position. Auch bei weniger extremen Depegs kann die Wartezeit sehr lang sein (Tage bis Wochen), während dessen das Kapital gebunden ist und nicht für andere Strategien verwendet werden kann — Opportunitätskosten. Die richtige Reaktion hängt von der Ursache ab: bei einem klaren Infrastructure-Problem (wie SVB/USDC 2023) ist Warten plausibel, weil die zugrunde liegenden Reserven erhalten waren. Bei einem Mechanismus-Versagen (wie UST) oder bei fundamentalen Solvabilitäts-Zweifeln ist schnelles Handeln besser. Die Schlüsselfrage: "Wird dieser Mechanismus strukturell überleben?" Wenn die Antwort unsicher ist, Verluste begrenzen. Konservative Regel: bei Depegs unter 0,95 handeln, nicht warten, es sei denn, die Ursache ist sehr klar als temporär identifizierbar.
</details>

**Frage 2:** Ein Portfolio hat 50.000 USD, davon 40.000 USD in USDC auf Aave und 10.000 USD in USDT auf Curve. Ist das ausreichend diversifiziert?

<details>
<summary>Antwort anzeigen</summary>

Teilweise, aber nicht optimal. Die Diversifikation auf Protokoll-Ebene ist vorhanden (Aave + Curve). Die Diversifikation auf Stablecoin-Ebene ist ausgewogen zwischen USDC (80%) und USDT (20%). Aber: beide sind fiat-besicherte Stablecoins. Wenn ein systemisches Ereignis fiat-besicherte Stablecoins trifft — zum Beispiel eine große US-Banken-Krise, die Circle und die US-Tether-Reserven gleichzeitig betrifft, oder eine regulatorische Maßnahme gegen beide — könnte ein signifikanter Teil des Portfolios gleichzeitig in Stress geraten. Bessere Diversifikation würde zusätzlich krypto-besicherte Stablecoins enthalten: z.B. 35% USDC, 25% USDT, 20% DAI, 10% LUSD, 10% sDAI. Das streut über unterschiedliche Mechanismen und Ausfall-Szenarien. Die 80/20 USDC/USDT-Aufteilung ist nicht schlecht, aber sie ist eine "horizontale" Diversifikation (gleicher Mechanismus, unterschiedliche Emittenten) statt "vertikaler" Diversifikation (unterschiedliche Mechanismen). Für konservative Portfolios ist vertikale Diversifikation — über Mechanismen-Kategorien hinweg — der wichtigere Schutz. Praxis-Tipp: prüfe dein Portfolio nicht nur nach Emittent, sondern nach Mechanismus-Abhängigkeit.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → Fünf Depeg-Auslöser → Historische Fälle (USDC/UST/DAI) → Preis-Frühwarnsignale → Monitoring-Tools → Depeg-Reaktion → Diversifikation als Beste Verteidigung
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — Depeg-Kategorien-Grafik, Historische-Depeg-Zeitleiste, Curve-Pool-Imbalance-Screenshot, DeFiLlama-Peg-Tracker, Notfall-Entscheidungsbaum

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 8.6 — Stablecoin-Auswahl für konservative Portfolios

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Eine Stablecoin-Allokations-Strategie passend zum 7–8%-Ziel konstruieren
- Diversifikation auf mehreren Dimensionen (Emittent, Mechanismus, Yield-Struktur) umsetzen
- Sinnvolle Rebalancing- und Monitoring-Praxis definieren
- Die Relevanz der Diversifikation nach Besicherungs-Typen (fiat-/krypto-/rendite-tragend) quantitativ begründen
- Typische Stablecoin-Allokationen für drei Portfolio-Größen (< 10k, 10–100k, > 100k USD) vorschlagen
- Einen Exit- und Rotations-Plan für Stablecoin-Positionen bei Governance- oder Regulierungs-Events implementieren

### Erklärung

Diese letzte Lektion führt alles aus den vorherigen Lektionen zusammen: eine konkrete, umsetzbare Strategie für den Stablecoin-Anteil deines Portfolios.

**Die Drei-Dimensionen-Diversifikation**

Konservative Stablecoin-Diversifikation berücksichtigt drei Dimensionen:

**Dimension 1: Emittent / Protokoll**
Verschiedene Emittenten (Circle, Tether, Sky, Liquity) diversifizieren gegen emittenten-spezifische Ausfälle.

**Dimension 2: Mechanismus**
Fiat-besichert vs. krypto-besichert vs. hybrid. Unterschiedliche Mechanismen haben unterschiedliche Ausfallszenarien.

**Dimension 3: Yield-Struktur**
Passiv (USDC als Wallet-Cash), Supply-basiert (aUSDC auf Aave), natives Yield (sDAI). Unterschiedliche Yield-Quellen bedeuten unterschiedliche Risikostrukturen.

**Konservative Baseline-Allokation (Beispiel 20.000 USD)**

**Option A: Einfach und robust**

- 35% USDC-Supply auf Aave V3: 7.000 USD @ 4% APY = 280 USD
- 25% USDT-Supply auf Aave V3 oder Compound: 5.000 USD @ 4,5% APY = 225 USD
- 20% sDAI via Spark: 4.000 USD @ 5% APY = 200 USD
- 10% USDC-Reserve in Wallet: 2.000 USD @ 0% = 0 USD
- 10% LUSD gehalten oder in LUSD-Chicken-Bonds: 2.000 USD @ 3–8% = ~100 USD

**Totaler Yield: ~805 USD / 20.000 USD = 4,0% annualisiert**

**Trade-offs:**
- Einfach zu managen
- Breit diversifiziert über Emittenten und Mechanismen
- Rendite deutlich unter 7–8%-Ziel — das muss durch andere Portfolio-Teile (Liquid Staking, ETH-Exposure, LP-Strategien) kompensiert werden

**Option B: Yield-optimiert mit moderat mehr Risiko**

- 25% USDC-Supply auf Aave V3: 5.000 USD @ 4% = 200 USD
- 15% USDC-Supply auf Morpho Blue USDC Vault: 3.000 USD @ 6% = 180 USD
- 20% sDAI via Spark: 4.000 USD @ 5% = 200 USD
- 20% Curve 3pool LP (mit Convex-Boost): 4.000 USD @ 6% = 240 USD
- 10% LUSD in Stability Pool: 2.000 USD @ 5% = 100 USD
- 10% sUSDe (kleinere höherverzinsliche Position): 2.000 USD @ 12% = 240 USD

**Totaler Yield: ~1.160 USD / 20.000 USD = 5,8% annualisiert**

**Trade-offs:**
- Höhere Rendite
- Mehr Komplexität (6 Positionen vs. 5)
- Höheres aggregiertes Risiko (sUSDe hat mehrere Risiko-Ebenen)
- Näher am 7–8%-Ziel, aber immer noch nicht gekrönt

**Option C: Passive Einstieg (Minimale Komplexität)**

- 60% USDC-Supply auf Aave V3: 12.000 USD @ 4% = 480 USD
- 30% sDAI via Spark: 6.000 USD @ 5% = 300 USD
- 10% USDT in Wallet oder Supply: 2.000 USD @ 3% = 60 USD

**Totaler Yield: ~840 USD / 20.000 USD = 4,2%**

**Trade-offs:**
- Minimal-Komplexität
- Nur 3 Positionen
- Gut für Einsteiger oder wenig Zeit
- Renditeniedriger als Option B

**Die Wahl hängt von dir ab**

Es gibt keine "richtige" Allokation — nur die, die zu deinem Risiko-Profil, Zeit-Budget und Rendite-Ziel passt. Orientierungs-Fragen:

**Wie viel Zeit pro Monat investierst du ins Portfolio-Management?**
- < 1 Stunde: Option C
- 1–4 Stunden: Option A
- 4+ Stunden: Option B

**Wie hoch ist deine Risiko-Toleranz?**
- Niedrig: Option A oder C, meide sUSDe und exotische Stables
- Moderat: Option B, aber sUSDe-Anteil klein halten
- Höher: Option B mit anderen Anpassungen

**Welches Rendite-Ziel setzt du für den Stablecoin-Anteil?**
- 3–4%: Option C
- 4–5%: Option A
- 5–6%: Option B
- Höher als 6% aus Stables allein: unrealistisch ohne signifikantes Zusatzrisiko

**Monatliches Rebalancing-Protokoll**

**1. Positionen-Check (5 Minuten):**
- Alle Supply-Positionen in DeBank oder direkt im Protokoll prüfen
- aktuelle APYs notieren
- Stablecoin-Preise prüfen (alle Positionen bei ~1,00?)

**2. Protokoll-News (5–10 Minuten):**
- Große Protokoll-Events im vergangenen Monat?
- Reserve-Report-Änderungen?
- Regulatorische Entwicklungen?

**3. Rebalancing-Entscheidung (5 Minuten):**
- Signifikante APY-Verschiebungen? → eventuell umschichten
- Protokoll-Risiken erhöht? → reduzieren
- Diversifikations-Balance noch gegeben? → Korrektur wenn signifikant daneben

**4. Gas-Kosten-Check:**
- Lohnt sich die Umschichtung bei aktuellen Gas-Preisen?
- Auf Layer-2? Deutlich günstiger.

**Rebalancing-Trigger (konkret)**

Handle, wenn:
- Eine einzelne Stablecoin-Position über 40% der Gesamt-Stablecoin-Allokation wächst
- APY-Unterschied zwischen Protokollen >2% für dieselbe Stablecoin und du hast signifikante Positionen
- Ein Stablecoin depeggt über 2%
- Protokoll-Exploit oder ernste Governance-Krise

**Was NICHT triggert:**
- Kleine tägliche Preis-Schwankungen im Normal-Bereich
- Kurzfristige APY-Verschiebungen (weniger als 1%)
- Allgemeine Krypto-Markt-Volatilität, die Stablecoins nicht direkt betrifft

**Integration ins Gesamt-Portfolio**

Der Stablecoin-Anteil ist nur ein Teil des konservativen DeFi-Portfolios. Typische Integration mit 7–8%-Zielrendite:

- 50–60% Stablecoin-Strategien (Supply + yield-bearing Stables + Stablecoin-LP)
- 20–30% Liquid Staking (wstETH, rETH)
- 10–15% direktes ETH/BTC-Spot-Exposure
- 5–10% Reserve auf CEX oder Wallet

Das Portfolio bekommt seine 7–8% Rendite aus:
- 4–6% vom Stablecoin-Anteil
- 3–4% Staking-Yield plus ETH-Preis-Beitrag in neutralen bis Bull-Markets
- Kleinere Beiträge von LP-Positionen

In Bear-Markets fällt die Gesamt-Rendite unter 7–8%, in Bull-Markets steigt sie oft deutlich darüber. Das ist die strukturelle Realität.

### Folien-Zusammenfassung

**[Slide 1] — Titel**
Stablecoin-Auswahl für konservative Portfolios

**[Slide 2] — Drei-Dimensionen-Diversifikation**
1. Emittent
2. Mechanismus
3. Yield-Struktur

**[Slide 3] — Option A: Einfach**
35% USDC-Aave, 25% USDT-Aave, 20% sDAI, 10% Wallet, 10% LUSD
→ ~4,0% Rendite

**[Slide 4] — Option B: Yield-optimiert**
Diversifiziert über 6 Positionen inkl. sUSDe
→ ~5,8% Rendite, mehr Komplexität

**[Slide 5] — Option C: Minimal**
60% USDC-Aave, 30% sDAI, 10% USDT
→ ~4,2% Rendite, minimale Komplexität

**[Slide 6] — Wahl nach Profil + Rebalancing**
Zeit, Risiko-Toleranz, Rendite-Ziel definieren die Wahl A/B/C
Monatlich: Check, News, Entscheidung, Gas
Trigger: 40% Konzentration, 2% APY-Diff, Depeg >2%

**[Slide 7] — Portfolio-Integration**
50–60% Stables + 20–30% Staking + 10–15% Spot + 5–10% Reserve
Gesamt-Ziel 7–8% aus Mischung

### Sprechertext

**[Slide 1]** Die letzte Lektion des Moduls. Wir bringen alles zusammen zu einer konkreten Strategie für den Stablecoin-Anteil deines Portfolios. Keine abstrakte Theorie — tatsächliche Allokationen mit Zahlen.

**[Slide 2]** Drei-Dimensionen-Diversifikation. Erste Dimension: Emittent. Circle, Tether, Sky, Liquity — verschiedene Akteure. Zweite Dimension: Mechanismus. Fiat-besichert, krypto-besichert, hybrid — verschiedene Ausfall-Szenarien. Dritte Dimension: Yield-Struktur. Passiv im Wallet, Supply auf Aave, nativ yield-bearing wie sDAI. Echt konservative Portfolios streuen über alle drei Dimensionen.

**[Slide 3]** Option A: einfach und robust. 35 Prozent USDC auf Aave, 25 Prozent USDT auf Aave oder Compound, 20 Prozent sDAI, 10 Prozent USDC-Reserve im Wallet, 10 Prozent LUSD. Ergibt etwa 4 Prozent Rendite bei breiter Diversifikation. Einfach zu managen. Liegt unter dem 7 bis 8 Prozent Ziel — das muss durch andere Portfolio-Teile kompensiert werden.

**[Slide 4]** Option B: yield-optimiert. 25 Prozent USDC Aave, 15 Prozent USDC Morpho Blue, 20 Prozent sDAI, 20 Prozent Curve 3pool mit Convex, 10 Prozent LUSD Stability Pool, 10 Prozent sUSDe als kleinere Höher-Rendite-Position. Ergibt etwa 5,8 Prozent. Mehr Komplexität, höheres aggregiertes Risiko wegen sUSDe.

**[Slide 5]** Option C: minimal. 60 Prozent USDC Aave, 30 Prozent sDAI, 10 Prozent USDT. Drei Positionen total. Etwa 4,2 Prozent. Gut für Einsteiger oder Leute mit wenig Zeit.

**[Slide 6]** Wahl nach Profil und Rebalancing. Die Wahl hängt von dir ab — keine Option ist objektiv richtig oder falsch. Orientierungs-Fragen: Wie viel Zeit pro Monat? Wie hoch die Risiko-Toleranz? Welches Rendite-Ziel? Für Einsteiger oder Zeit-arme Nutzer ist Option A oder C besser. Für aktivere Nutzer mit Expertise ist Option B attraktiv. Das monatliche Rebalancing-Protokoll dauert etwa fünfzehn bis zwanzig Minuten: fünf Minuten Positions-Check in DeBank, fünf bis zehn Minuten Protokoll-News, fünf Minuten Rebalancing-Entscheidung, dazu ein Gas-Kosten-Check. Trigger für Aktion: eine Position über vierzig Prozent der Stable-Allokation, APY-Differenz über zwei Prozent für dieselbe Stable mit signifikanter Position, Depeg über zwei Prozent, oder Protokoll-Krise. Kleine tägliche Schwankungen triggern nichts.

**[Slide 7]** Integration ins Gesamt-Portfolio. Stablecoin-Anteil ist typisch 50 bis 60 Prozent eines konservativen DeFi-Portfolios. Der Rest ist 20 bis 30 Prozent Liquid Staking, 10 bis 15 Prozent direktes ETH oder BTC, 5 bis 10 Prozent Reserve. Die 7 bis 8 Prozent Gesamt-Rendite kommen aus der Mischung: 4 bis 6 Prozent vom Stables-Anteil, 3 bis 4 Prozent aus Staking plus ETH-Preis-Beiträge, kleinere Anteile aus LP. In Bear-Markets fällt das, in Bull-Markets steigt es. Das ist die strukturelle Realität — keine Garantie, nur realistische Erwartung.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Drei-Kreise-Venn-Diagramm der Diversifikations-Dimensionen.

**[Slide 3]** Kuchen-Diagramm Option A mit Rendite-Berechnung daneben.

**[Slide 4]** Kuchen-Diagramm Option B mit Rendite-Berechnung.

**[Slide 5]** Kuchen-Diagramm Option C mit Rendite-Berechnung.

**[Slide 6]** Zwei-Spalten-Layout: links Entscheidungs-Flowchart nach Nutzer-Profil, rechts Rebalancing-Kalender-Visualisierung mit Trigger-Liste.

**[Slide 7]** Gesamt-Portfolio-Kuchen mit Rendite-Aufschlüsselung.

### Übung

**Aufgabe: Persönliche Stablecoin-Strategie**

Entwickle deine persönliche Stablecoin-Allokations-Strategie:

1. **Kapital-Rahmen:** Mit welchem Gesamt-Betrag arbeitest du (hypothetisch oder real)?
2. **Risiko-Profil:** Selbst-Einschätzung auf Skala 1–10 (1=extrem konservativ, 10=hoch-risiko-tolerant)
3. **Zeit-Budget:** Wie viele Stunden pro Monat willst du ins Management investieren?
4. **Rendite-Ziel:** Was erwartest du aus dem Stablecoin-Anteil?
5. **Gewählte Option (A/B/C oder eigene Variation):** Welche Allokation passt, und warum?
6. **Konkrete Verteilung:** Prozent-Aufteilung über Assets und Protokolle
7. **Rebalancing-Plan:** Welche Trigger definieren Handeln?
8. **Exit-Strategie:** Was würde dich bewegen, alle Stablecoin-Positionen aufzulösen?

**Deliverable:** Strategie-Dokument (2–3 Seiten) mit den 8 Punkten strukturiert adressiert.

### Quiz

**Frage 1:** Warum ist 100% USDC auf Aave für einen 50.000-USD-Stablecoin-Anteil keine gute Strategie, auch wenn USDC und Aave beide etabliert sind?

<details>
<summary>Antwort anzeigen</summary>

Mehrere strukturelle Schwächen. Erstens: Konzentriertes Emittenten-Risiko. 100% an Circle gebunden — ein USDC-Depeg (wie März 2023) betrifft das gesamte Kapital. Circle selbst könnte regulatorisch in Stress geraten, Bank-Partner-Probleme haben, oder andere Emittenten-spezifische Probleme. Zweitens: Konzentriertes Protokoll-Risiko. 100% auf Aave — ein Aave-Smart-Contract-Bug, Governance-Fehlentscheidung oder Hack würde die Position direkt betreffen. Drittens: Konzentriertes Mechanismus-Risiko. Alles fiat-besichert über US-Bank-System — wenn ein systemisches Ereignis US-Banken trifft (wie die regionale Bankenkrise März 2023), trifft es die komplette Stablecoin-Allokation gleichzeitig. Viertens: Kein Yield-Diversifikation. Nur supply-basierter Yield. Wenn Aave-Supply-Raten einbrechen (durch sinkende Utilization), fällt die komplette Rendite. Fünftens: Liquiditäts-Risiko. Eine schnelle Auszahlung von 50.000 USD könnte auf Utilization-Probleme treffen. Bessere Struktur: 30% USDC-Aave, 25% USDT-Compound, 20% sDAI, 15% USDC-Morpho-Vault, 10% LUSD. Diversifiziert über Emittent, Mechanismus, Protokoll und Yield-Typ.
</details>

**Frage 2:** Ein Anleger stellt fest, dass sUSDe's 15% APY höher ist als der Durchschnitt seines 4,5%-Portfolios. Er überlegt, die komplette Stablecoin-Allokation auf sUSDe umzuschichten. Wie sollte er rational entscheiden?

<details>
<summary>Antwort anzeigen</summary>

Rationale Entscheidung erfordert systematische Analyse mehrerer Faktoren. Erstens: Risiko-Adjustierung verstehen. 15% APY vs. 4,5% APY bedeutet ein 10-Prozent-Rendite-Delta. Das muss durch zusätzliche Risiken kompensiert werden. Frage: sind diese 10 Prozent eine faire Kompensation für Funding-Rate-Risiko, Exchange-Risiko, Liquidations-Risiko und Smart-Contract-Risiko zusätzlich zu den bestehenden? Zweitens: Zeit-Horizont prüfen. sUSDe's historische 15% ist ein Durchschnitt — in Bear-Markets oder bei negativen Funding Rates kann die Rendite auf 0% oder negativ fallen. Ist der Anleger bereit, Jahre mit niedriger Rendite zu akzeptieren, wenn der Mechanismus unter Stress kommt? Drittens: Korrelations-Check. Wenn ein extremes Ereignis sUSDe betrifft, sind andere Stablecoin-Positionen wahrscheinlich nicht betroffen — die Diversifikation schützt. Bei 100% sUSDe geht diese Schutz-Wirkung verloren. Viertens: Portfolio-Rollen-Check. Der Stablecoin-Anteil soll typisch der "stabile Anker" des Portfolios sein. sUSDe mit hoher Rendite-Volatilität erfüllt diese Rolle schlechter als sDAI. Rationaler Kompromiss: sUSDe als kleine Position (10–15% der Stable-Allokation, entspricht vielleicht 5–10% des Gesamt-Portfolios) — bringt leicht erhöhte Rendite ohne das Gesamt-Portfolio zu gefährden. Für diese Position liefert sUSDe einen Bonus von etwa 1 Prozentpunkt pro Jahr auf die Gesamtrendite — ein fair bezahlter Risiko-Premium. 100% sUSDe wäre Maximalisierung des erwarteten Werts, aber Konzentration auf ein einziges Mechanismus-Risiko — nicht konservative Strategie.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → Drei-Dimensionen-Diversifikation → Option A (einfach) → Option B (yield-optimiert) → Option C (minimal) → Wahl + Rebalancing → Portfolio-Integration
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — Portfolio-Allokations-Pie-Charts für drei Größen, Diversifikations-Matrix, Rebalancing-Flowchart, Exit-Trigger-Tabelle

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Modul-Abschluss-Quiz

Fünf Fragen zum integrierten Verständnis von Modul 8.

**Frage 1:** Erkläre in 4–5 Sätzen, warum "der Peg" kein Feature des Tokens ist, sondern das Ergebnis eines Mechanismus — und welche Konsequenz das für die Risiko-Bewertung hat.

<details>
<summary>Antwort anzeigen</summary>

Stablecoins halten keinen Peg durch ihre reine Existenz als Token. Der Peg entsteht durch einen Mechanismus — bei fiat-besicherten Stables durch 1:1-Einlöseprozess mit tatsächlichen Reserven, bei krypto-besicherten durch Überbesicherung plus Liquidations-Mechanismus, bei algorithmischen durch Supply-Anpassungen. Jeder Mechanismus hat spezifische Annahmen, die unter bestimmten Bedingungen brechen können. Die Konsequenz für Risiko-Bewertung: statt einer Token-Kategorie "Stablecoin = sicher" zu behandeln, muss jeder einzelne Stablecoin nach seinem Mechanismus analysiert werden. Welche Annahmen macht der Mechanismus? Welche Bedingungen könnten ihn zum Scheitern bringen? Wie wahrscheinlich sind solche Bedingungen? Das führt zu nuancierten, stablecoin-spezifischen Risiko-Urteilen statt zu pauschalen Stabilitätsannahmen.
</details>

**Frage 2:** Eine Diversifikations-Allokation von 40% USDC, 30% USDT, 20% DAI, 10% LUSD — warum ist das besser als 100% USDC?

<details>
<summary>Antwort anzeigen</summary>

Weil es auf mehreren Ebenen diversifiziert. Emittenten-Diversifikation: Circle, Tether, Sky, Liquity — ein emittenten-spezifischer Ausfall betrifft nur einen Teil. Mechanismus-Diversifikation: USDC/USDT sind fiat-besichert (US-Bank-System-Exposure), DAI ist hybrid (RWA + USDC + krypto), LUSD ist rein krypto-besichert (dezentral). Wenn ein Mechanismus strukturell versagt — z.B. systemische Bank-Krise, oder Collateral-Kollaps — sind andere Kategorien weitgehend unbetroffen. Jurisdiktions-Diversifikation: Circle (USA), Tether (BVI), Sky (dezentral), Liquity (dezentral). Unterschiedliche regulatorische Exposures. Bei 100% USDC: jeder der genannten Risikoträger kann das gesamte Kapital gefährden. Bei der diversifizierten Allokation: kein einzelner Risikoträger kann mehr als 40% des Kapitals gefährden. Der Erwartungswert der Rendite ist praktisch identisch (die APYs sind ähnlich), aber die Verlust-Wahrscheinlichkeits-Verteilung ist deutlich enger. Das ist klassische Diversifikations-Mathematik — gleiche erwartete Rendite bei geringerer Varianz.
</details>

**Frage 3:** Warum ist sDAI (5% APY) für konservative Portfolios typisch besser geeignet als sUSDe (15% APY), obwohl sUSDe die höhere Rendite bietet?

<details>
<summary>Antwort anzeigen</summary>

sDAI's 5% kommen aus einer fundamental robusteren Quelle: US-Treasury-Zinsen (über RWA) und Stability Fees aus überbesicherten DAI-Vaults. Das sind quasi-risikofreie Ertragsquellen mit klarem, gut verstandenem Mechanismus. sUSDe's 15% kommen aus zwei volatilen Quellen: Staking-Yields (relativ stabil, ~3%) und Funding-Rate-Einnahmen aus Perpetual-Futures-Shorts (sehr volatil, historisch positiv aber nicht garantiert). In Stress-Phasen können Funding Rates stark negativ werden, was den sUSDe-Yield auf null oder negativ bringt. Zusätzlich trägt sUSDe Exchange-Risiken (Shorts laufen auf CEXs wie Binance, Bybit, OKX), Liquidations-Risiken bei extremen ETH-Bewegungen, und komplexes Custody-Risiko. Für ein konservatives Portfolio mit 7–8%-Ziel ist sDAI der bessere Baustein, weil die Rendite-Quelle strukturell stabiler ist. sUSDe kann eine kleine taktische Position sein (10–15% der Stable-Allokation), um moderate Rendite-Boost zu bekommen, ohne das Portfolio durch eine dominante Position in einer neuen, noch nicht voll getesteten Mechanik zu gefährden.
</details>

**Frage 4:** Ein Nutzer erwägt, seine gesamte Stablecoin-Allokation von 30.000 USD auf Ethereum Mainnet Aave zu haben. Welche zusätzlichen Risiko-Dimensionen sollte er bedenken?

<details>
<summary>Antwort anzeigen</summary>

Über die bereits behandelten Stablecoin-Risiken (Mechanismus, Emittent, Protokoll) hinaus: Erstens, Chain-Risiko. 100% auf einer einzigen Chain bedeutet, dass ein Chain-spezifisches Ereignis (seltene Ethereum-Probleme, 51%-Angriff auf eine Test-Phase, Netzwerk-Halt bei Hardforks) das gesamte Kapital einfrieren könnte. Diversifikation auf Layer-2s (Arbitrum, Optimism, Base) oder alternative Chains (gewählt mit Bedacht) reduziert dieses Risiko. Zweitens, Gas-Cost-Exposition. Mainnet-Gas kann in Krisen explodieren (Black Thursday 2020). Ein schneller Ausstieg kann teurer sein als auf L2s. Drittens, MEV-Risiko bei großen Swaps. Wenn der Nutzer plötzlich umschichten will, sind Mainnet-Swaps MEV-exponiert — auf L2s weniger. Viertens, Liquiditäts-Risiko. Bei 30.000 USD sind Auszahlungen normal möglich, aber bei extremen Utilization-Spikes kann selbst das Probleme haben. Alternative Strategien: 60% Mainnet (wo tiefe Liquidität und die etabliertesten Protokolle sind), 25% Arbitrum/Base (günstigere Transaktionen, immer noch robust), 15% Reserve auf CEX oder in Wallet. Diese Chain-Diversifikation macht das Portfolio widerstandsfähiger gegen Chain-spezifische Ereignisse und gibt Flexibilität für Notfall-Transaktionen.
</details>

**Frage 5:** Ein konservatives 30.000 USD DeFi-Portfolio mit 7–8%-Zielrendite. Wie würde ein realistischer Stablecoin-Anteil strukturiert sein, und welchen Beitrag leistet er zur Gesamtrendite?

<details>
<summary>Antwort anzeigen</summary>

Für 30.000 USD Gesamt-Portfolio wäre ein Stablecoin-Anteil von 50–60% typisch: also 15.000–18.000 USD. Strukturierung: 30% USDC-Supply auf Aave V3 (4% APY), 15% USDC-Supply auf Compound V3 oder Morpho Blue Vault (4,5-6%), 20% sDAI via Spark (5%), 15% USDT-Supply auf Aave (4,5%), 10% LUSD (3-5%), 10% Wallet-Reserve (0%). Der gewichtete Durchschnitt kommt auf etwa 4–4,5% annualisierte Rendite auf die Stablecoin-Allokation. Absolut: 16.500 USD × 4,3% = ca. 710 USD jährlich aus Stables. Vom Gesamt-Portfolio (30.000 USD) ist das 2,4% — ein wesentlicher Teil der 7–8%-Gesamtrendite, aber nicht das Ganze. Der Rest (etwa 4,5–5,5%) muss aus den anderen Portfolio-Teilen kommen: Liquid Staking (wstETH bringt 3% Yield plus ETH-Preis-Beitrag), direkte ETH/BTC-Exposure (in neutralen bis Bull-Markets trägt das die Gesamtrendite über die 7–8%-Schwelle), eventuell kleine LP-Positionen für zusätzlichen Yield. Kernpunkt: der Stablecoin-Anteil ist der stabile Anker. Er bringt kein Ziel-Erreichen allein, sondern bietet die Basis, auf der andere Komponenten aufbauen können. In Bear-Markets schützt er das Portfolio vor großen Drawdowns. In Bull-Markets opfert er etwas Rendite-Potenzial zugunsten niedriger Volatilität. Die 7–8% Rendite sind ein Jahres-Durchschnitt, nicht ein stabiles monatliches Ergebnis — das muss realistisch erwartet werden.
</details>

---

## Modul-Zusammenfassung

Du hast in Modul 8 Stablecoins systematisch verstanden:

**Mechanismus statt Magie:** Der Peg eines Stablecoins ist nicht gegeben, sondern entsteht durch einen Mechanismus. Drei Hauptkategorien: fiat-besichert, krypto-besichert, algorithmisch/synthetisch. Jede Kategorie hat strukturell unterschiedliche Risiken.

**Fiat-besichert (USDC, USDT):** Dominieren nach Market Cap. USDC transparent, reguliert, US-Bank-exponiert. USDT weniger transparent, aber durch Profitabilität und globale Nachfrage historisch robust. Beide können bei Infrastructure-Stress temporär depeggen (USDC März 2023).

**Krypto-besichert (DAI, crvUSD, LUSD):** Dezentraler, aber komplexer. DAI heute nicht mehr rein dezentral durch RWA und USDC-Anteile. crvUSD innovativ mit LLAMMA-Liquidations. LUSD puristisch dezentral, nur ETH-Collateral, 110% CR, keine Governance.

**Yield-bearing Stablecoins (sDAI, sUSDS, sUSDe):** Kombinieren Peg mit integriertem Yield. sDAI/sUSDS aus konservativen Quellen (T-Bills, Stability Fees), ~5%. sUSDe aus delta-neutralem Hedging mit Funding-Rate-Yield, ~15% aber deutlich riskanter.

**Fünf Depeg-Auslöser:** Reserve-Zugang blockiert, Reserve-Solvabilitäts-Zweifel, Collateral-Kollaps, Mechanismus-Versagen, Funding-Rate-Kollaps. Historische Fälle (USDC März 2023, UST Mai 2022, DAI Black Thursday) als Lehrmaterial.

**Drei-Dimensionen-Diversifikation:** Emittent, Mechanismus, Yield-Struktur. Alle drei zu streuen ist der robusteste Schutz gegen Depegs und Einzel-Ausfälle.

**Konservative Allokations-Optionen:** Option A (einfach, 4% Rendite), Option B (yield-optimiert, 5,8%), Option C (minimal, 4,2%). Wahl hängt von Zeit-Budget und Risiko-Toleranz ab. Keine Option erreicht 7–8% allein — der Stablecoin-Anteil ist stabiler Anker, nicht alleiniger Renditebringer.

**Monatliches Rebalancing:** Positions-Check, News, Entscheidung, Gas-Analyse. Klar definierte Trigger: 40%-Konzentration, 2%-APY-Differenz, 2%-Depeg, Protokoll-Krise.

**Portfolio-Integration:** Stablecoins typisch 50–60% eines konservativen DeFi-Portfolios. Kombination mit 20–30% Liquid Staking, 10–15% direkte Spot-Exposure, 5–10% Reserve. Die 7–8%-Zielrendite kommt aus der Gesamt-Mischung, nicht aus einer einzelnen Komponente.

**Was in Modul 9 kommt:** Yield-Strategien. Wie Staking, Liquid Staking und Restaking strukturell funktionieren. Warum das Staking die zweite große Säule neben Stablecoin-Supply ist. Die Mechaniken von Lido, Rocket Pool, EigenLayer — und wie du ETH-Exposure mit Yield-Generierung konservativ kombinieren kannst.

---

*Ende von Modul 8.*
