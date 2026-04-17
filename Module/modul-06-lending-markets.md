# Modul 6 — Lending Markets

**Zielgruppe:** Einsteiger bis Fortgeschrittene
**Geschätzte Dauer:** 80–100 Minuten
**Voraussetzungen:** Module 1–5 abgeschlossen

---

## Modul-Überblick

Lending-Märkte sind neben DEXs die wichtigste Infrastruktur-Kategorie in DeFi. Wer Kapital hinterlegt, verdient Zinsen. Wer Sicherheiten stellt, kann Kredite aufnehmen. Zusammen bilden diese zwei Seiten das größte DeFi-Segment nach TVL — über 40 Milliarden USD liegen aktuell in Aave, Compound, Morpho, Spark und verwandten Protokollen.

Für konservative Strategien ist die **Supply-Seite** oft der attraktivste Einstieg in DeFi: Stablecoin-Supply auf etablierten Protokollen bietet stabile 3–6% Rendite bei moderatem Risiko. Das ist weniger Spektakel als Farming, aber deutlich nachhaltiger — und perfekt abgestimmt auf das 7–8%-Portfolio-Ziel.

Dieses Modul behandelt die **Mechanik** von Lending-Märkten. Wie Zinsen entstehen, wie die Protokolle unterschiedlich designt sind, wie du als Supplier rational vorgehst. **Collateral, Kredite und Liquidationen** behandelt Modul 7 eigenständig — das sind die Borrow-Seite, und sie erfordern ein ganzes Modul für sich.

**Lektionen:**
1. Wie Lending-Protokolle funktionieren
2. Zinsmodelle: Utilization-Kurven
3. Aave: Architektur des Marktführers
4. Compound und Morpho: Alternative Designs
5. Supply-Strategien für konservative Portfolios
6. Lending-Risiken und Monitoring

---

## Lektion 6.1 — Wie Lending-Protokolle funktionieren

### Learning Objectives

After completing this lesson the learner will be able to:
- Die Grundstruktur eines Pool-based Lending-Protokolls beschreiben
- Den Unterschied zwischen Supply und Borrow aus Nutzer-Sicht einordnen
- Die Rolle von zinsbringenden Tokens (aTokens, cTokens) erklären

### Explanation

Ein DeFi-Lending-Protokoll ist ein Smart Contract, in dem zwei Gruppen von Nutzern interagieren: **Supplier** (die Kapital einzahlen und Zinsen verdienen) und **Borrower** (die gegen Sicherheiten Kredite aufnehmen und Zinsen zahlen). Das Protokoll vermittelt beide Seiten — ohne menschliche Entscheidung, ohne Kreditprüfung.

**Die drei Architekturen**

**1. Pool-based (Aave, Compound — das dominante Modell)**
Alle Supplier eines Assets zahlen in einen gemeinsamen Pool ein. Alle Borrower entnehmen aus diesem Pool. Der Zinssatz ist für alle gleich, basiert auf der Utilization (wie viel vom Pool geborgt ist).

**2. Peer-to-Peer (klassisch, heute wenig genutzt)**
Einzelne Supplier werden direkt mit einzelnen Borrowers gematcht. Flexibel, aber ineffizient — Matching kann langsam sein, und Kapital liegt häufig ungenutzt.

**3. Peer-to-Pool Hybrid (Morpho — modernes Modell)**
Peer-to-Peer-Matching, wenn möglich (bessere Raten für beide Seiten). Fallback auf Pool-Ablage (Aave, Compound), wenn kein Match verfügbar. Kombiniert Effizienz mit Liquidität.

Dieses Modul fokussiert auf Pool-based-Modelle, weil sie die meisten TVL und das am besten verstandene Modell sind.

**Der Supply-Vorgang**

Du zahlst 10.000 USDC in einen Aave-USDC-Pool ein. Folgende Dinge passieren:

1. Deine USDC werden in den Pool-Vertrag übertragen.
2. Der Pool-Vertrag **mintet dir aUSDC** (Aaves zinsbringenden Token) — du bekommst etwa 10.000 aUSDC, entsprechend der aktuellen Exchange-Rate.
3. Dein aUSDC-Guthaben wächst kontinuierlich, weil es automatisch Zinsen akkumuliert.
4. Wann immer du willst, kannst du deine aUSDC zurück-in-USDC tauschen ("Withdraw").

**Wichtig:** Du hältst ein ERC-20-Token (aUSDC), das dein Anrecht auf den Pool repräsentiert. Es ist übertragbar, einlösbar, und es wächst im Wert durch Zinsakkumulation. Das ist fundamentale DeFi-Komponierbarkeit: Ein aUSDC kann als Sicherheit in einem anderen Protokoll dienen, in einer LP-Position, oder einfach in einer anderen Wallet verwahrt werden.

**Der Borrow-Vorgang**

Ein Borrower will 5.000 USDC aufnehmen. Bevor das geht, muss er Sicherheiten hinterlegen — zum Beispiel ETH. Der Vorgang:

1. Supply von 10.000 USD in ETH als Sicherheit.
2. Der Protokoll bewertet die Sicherheit mit einem Loan-to-Value-Ratio (z.B. 75% für ETH). Das bedeutet: Mit 10.000 USD ETH-Sicherheit kann bis zu 7.500 USDC geborgt werden.
3. Der Borrower nimmt 5.000 USDC auf — wohlgemerkt unterhalb der Maximalgrenze.
4. Er zahlt laufend Zinsen auf die 5.000 USDC.

Wenn die ETH-Sicherheit an Wert verliert oder die Schuld durch Zinsen wächst, kann die Position **liquidiert** werden. Details dazu in Modul 7.

**Wichtige Eigenschaften**

1. **Überbesichert:** Jeder DeFi-Kredit ist überbesichert. Du kannst nicht ohne Sicherheiten leihen (mit Ausnahme von Flash Loans, Modul 9). Das ist strukturell anders als traditionelle Banken, die auf Kreditwürdigkeitsprüfung basieren.

2. **Variable Zinsen:** Zinsen ändern sich kontinuierlich mit der Utilization. Es gibt keine festen Zinssätze — das ist ein fundamentaler Unterschied zu klassischen Bankprodukten.

3. **Nicht-verwahrend:** Du hältst deine aTokens in deiner Wallet. Das Protokoll verwahrt die eigentlichen Assets in Smart Contracts — transparent und öffentlich prüfbar.

4. **Keine Laufzeiten:** DeFi-Supply und -Borrow haben keine feste Laufzeit. Du kannst jederzeit ein- oder auszahlen (solange der Pool Liquidität hat).

**Warum jemand Kredite aufnimmt**

Wichtige Verwendungszwecke in DeFi:

- **Leverage auf Krypto:** ETH als Sicherheit, Stablecoins borgen, mehr ETH kaufen (das behandelt Modul 10)
- **Kapital-Effizienz ohne Verkauf:** Du brauchst Liquidität, willst aber deine ETH-Position nicht verkaufen (oft aus steuerlichen Gründen)
- **Short-Positionen:** ETH borgen, sofort verkaufen, später günstiger zurückkaufen
- **Yield-Arbitrage:** Geborgtes Asset in eine höher-verzinsliche Strategie stecken (kommt in Modul 10)

Für den Supplier ist der Zweck des Borrowers irrelevant. Er verdient seine Zinsen, unabhängig davon, was der Borrower mit dem Kapital macht.

### Slide Summary

**[Slide 1] — Titel**
Wie Lending-Protokolle funktionieren

**[Slide 2] — Zwei Nutzerkategorien**
Supplier: zahlen ein, verdienen Zinsen
Borrower: hinterlegen Sicherheiten, leihen, zahlen Zinsen

**[Slide 3] — Drei Architekturen**
1. Pool-based (Aave, Compound) — dominant
2. Peer-to-Peer — klassisch, ineffizient
3. Peer-to-Pool Hybrid (Morpho) — modernes Modell

**[Slide 4] — Supply-Vorgang**
USDC → Pool-Contract → aUSDC an Supplier
aUSDC wächst kontinuierlich durch Zinsakkumulation.

**[Slide 5] — Borrow-Vorgang**
ETH als Sicherheit → LTV-Prüfung → Stablecoin-Auszahlung
Bei Sicherheitsverlust: Liquidation möglich.

**[Slide 6] — Kerneigenschaften**
- Überbesichert
- Variable Zinsen
- Nicht-verwahrend
- Keine Laufzeiten

### Voice Narration Script

**[Slide 1]** Modul 6 behandelt Lending-Märkte. Das ist der zweite große Baustein konservativer DeFi-Portfolios neben Liquidity Providing. In dieser ersten Lektion legen wir das Fundament.

**[Slide 2]** Ein Lending-Protokoll hat zwei Nutzer-Kategorien. Supplier zahlen Kapital ein und verdienen Zinsen. Borrower hinterlegen Sicherheiten, nehmen Kredite auf, zahlen Zinsen. Das Protokoll vermittelt zwischen beiden — ohne menschliche Entscheidung, ohne Kreditwürdigkeitsprüfung.

**[Slide 3]** Drei Architekturen existieren. Pool-based, das dominante Modell, bei dem alle Supplier in einen gemeinsamen Pool einzahlen und alle Borrower daraus entnehmen. Aave und Compound folgen diesem Modell. Peer-to-Peer klassisch, heute kaum noch genutzt, weil ineffizient. Und Peer-to-Pool Hybrid, das Morpho-Modell — P2P-Matching wenn möglich, Pool-Fallback sonst. Dieses Modul fokussiert auf Pool-based, weil es die meisten Kapital-Volumen und das am besten verstandene Modell ist.

**[Slide 4]** Der Supply-Vorgang in Aave als Beispiel. Du zahlst USDC ein, der Pool-Contract mintet dir aUSDC — das ist Aaves zinsbringender Token. Ein ERC-20, der dein Anrecht auf den Pool repräsentiert. Das aUSDC-Guthaben wächst kontinuierlich durch Zinsakkumulation. Du kannst jederzeit zurück-in-USDC tauschen. Wichtig: aUSDC ist komponierbar — kann als Sicherheit in anderen Protokollen dienen, in LP-Positionen eingebracht werden, oder einfach gehalten.

**[Slide 5]** Der Borrow-Vorgang. Ein Borrower hinterlegt zum Beispiel ETH als Sicherheit. Das Protokoll wendet ein Loan-to-Value-Ratio an, zum Beispiel 75 Prozent für ETH. Das heißt: mit 10.000 Dollar ETH kann bis zu 7.500 USDC geborgt werden. Der Borrower nimmt tatsächlich weniger auf, um Sicherheitspuffer zu haben. Er zahlt laufend Zinsen. Wenn die Sicherheit an Wert verliert oder die Schuld durch Zinsen wächst, droht Liquidation. Details in Modul 7.

**[Slide 6]** Vier Kerneigenschaften. Erstens: überbesichert — jeder DeFi-Kredit braucht mehr Sicherheiten als die Schuld. Das ist strukturell anders als Banken mit Kreditwürdigkeitsprüfung. Zweitens: variable Zinsen — kein fester Zinssatz, sondern kontinuierliche Anpassung basierend auf Angebot und Nachfrage. Drittens: nicht-verwahrend — du hältst deine aTokens selbst. Viertens: keine festen Laufzeiten — Supply und Borrow können jederzeit aufgelöst werden.

### Visual Suggestions

**[Slide 1]** Titelfolie.

**[Slide 2]** Zwei-Personen-Diagramm: Supplier zahlt in Pool, Borrower entnimmt. Pfeile zeigen Zinsflüsse.

**[Slide 3]** Drei Architektur-Karten mit schematischen Diagrammen.

**[Slide 4]** **SCREENSHOT SUGGESTION:** Aave-Supply-Interface mit USDC-Supply und angezeigtem aUSDC-Receipt. Alternativ: Etherscan-Transaktion einer realen aUSDC-Mint.

**[Slide 5]** Diagramm: ETH-Sicherheit → LTV-Berechnung → Stablecoin-Auszahlung. Mit Visualisierung des Sicherheitspuffers.

**[Slide 6]** Vier-Punkte-Checkliste mit Icons.

### Exercise

**Aufgabe: Lending-Landschaft untersuchen**

1. Öffne defillama.com und filtere auf Lending-Protokolle.
2. Notiere die Top-10 nach TVL.
3. Für jedes Protokoll dokumentiere:
   - Name und dominante Chain
   - TVL
   - Anzahl unterstützter Assets (grobe Einschätzung)
   - Audit-Status (auf Protokoll-Website recherchieren)
4. Identifiziere die Top-3 Stablecoin-Supply-Optionen nach TVL.

**Deliverable:** Tabelle mit Top-10 + Analyse: Welche drei Protokolle würdest du für eine konservative Stablecoin-Supply-Strategie in Betracht ziehen und warum?

### Quiz

**Frage 1:** Warum ist jeder DeFi-Kredit überbesichert, während klassische Bankkredite oft ohne oder mit minimaler Sicherheit vergeben werden?

<details>
<summary>Antwort anzeigen</summary>

Klassische Banken basieren auf Kreditwürdigkeitsprüfung — sie nutzen Einkommen, Vermögen, Historie und rechtliche Identität des Kreditnehmers. Falls der Kredit nicht zurückgezahlt wird, kann die Bank rechtlich vorgehen (Pfändung, Vollstreckung). In DeFi gibt es keine Identität und keine rechtliche Handhabe — der Kreditnehmer ist nur eine Wallet-Adresse. Die einzige Sicherheit ist das hinterlegte Collateral. Damit das Protokoll im Falle eines Ausfalls die Schuld abdecken kann, muss das Collateral mehr wert sein als die Schuld. Zusätzlich braucht es einen Puffer für Preisvolatilität — wenn das Collateral im Wert fällt, muss genug Marge bleiben, um die Schuld noch zu decken. Deshalb typisch LTV-Ratios zwischen 50% und 80%.
</details>

**Frage 2:** Was ist der Vorteil von zinsbringenden Tokens (wie aUSDC) gegenüber einem einfachen internen Salden-System?

<details>
<summary>Antwort anzeigen</summary>

Zinsbringende Tokens sind komponierbar. Weil aUSDC ein ERC-20-Token ist, kann es überall in DeFi verwendet werden — als Sicherheit in einem anderen Lending-Protokoll, als LP-Position, als Übergabe-Asset an andere Wallets. Das erzeugt Effizienz: Kapital, das in Aave verzinst wird, kann gleichzeitig in anderen Strategien arbeiten. Ein internes Salden-System wäre nicht komponierbar — die Supply-Position wäre in Aave gefangen. Zusätzlich: aUSDC ist ein klares, auditbares Guthaben. Der Exchange-Rate zwischen USDC und aUSDC ist deterministisch und öffentlich prüfbar. Das erzeugt Transparenz, die interne Datenbanken nicht haben.
</details>

---

## Lektion 6.2 — Zinsmodelle: Utilization-Kurven

### Learning Objectives

After completing this lesson the learner will be able to:
- Das Utilization-basierte Zinsmodell erklären und grafisch nachvollziehen
- Den "Kink-Point" verstehen und seine Bedeutung für Supply- und Borrow-Raten einschätzen
- Erkennen, wann Zinsen sprunghaft ansteigen und welche Konsequenz das für Borrower hat

### Explanation

Zinsen in DeFi sind **dynamisch**. Sie werden algorithmisch aus der **Utilization** des Pools bestimmt — dem Verhältnis geborgter Assets zu gesamtem Pool.

**Die Grundformel**

```
Utilization = Geborgte Assets / Gesamte Supply
```

Wenn 80% der USDC in einem Pool geborgt sind, ist die Utilization 80%.

**Warum Utilization Zinsen bestimmt**

Die Logik ist einfach: Wenn die Nachfrage hoch ist (viele wollen borgen), sollten Zinsen steigen — um mehr Supply anzuziehen und Borrower abzuschrecken. Wenn die Nachfrage niedrig ist, sollten Zinsen fallen — um Borrower anzuziehen und Supplier zu weniger profitablen Pools zu lenken.

Das Zinsmodell schreibt diese Logik als Kurve fest.

**Die Standard-Zinskurve (am Aave-Beispiel)**

Die Borrow-Rate ist eine stückweise lineare Funktion der Utilization:

```
Utilization 0% → Borrow-Rate ≈ 0%
Utilization steigt → Borrow-Rate steigt linear (flach)
Am "Kink-Point" (typisch 80–90%) → Steilheit erhöht sich dramatisch
Utilization 100% → Borrow-Rate kann 50%+ erreichen
```

**Der Kink-Point**

Jedes Zinsmodell hat einen **Kink-Point** — den Wendepunkt, an dem die Zinskurve von flach auf steil umschwenkt. Das ist Designentscheidung:
- Unterhalb des Kinks: Zinsen bleiben niedrig, um Borrowing zu fördern
- Oberhalb des Kinks: Zinsen steigen stark, um Utilization zurück unter den Kink zu drücken

**Beispiel USDC auf Aave:**
- Kink bei 90%
- Base Borrow-Rate: 0%
- Bei 90% Utilization: ca. 4% Borrow-Rate
- Bei 95% Utilization: ca. 15–20%
- Bei 100% Utilization: 50%+

**Die Supply-Rate**

Die Supply-Rate (was du als Supplier verdienst) ist abgeleitet von der Borrow-Rate:

```
Supply-Rate = Borrow-Rate × Utilization × (1 − Reserve Factor)
```

Der **Reserve Factor** ist ein Anteil der Borrow-Zinsen, der ans Protokoll geht (typisch 10–30%). Rest fließt an Supplier.

**Konkretes Beispiel bei 90% Utilization, 4% Borrow-Rate, 15% Reserve Factor:**

```
Supply-Rate = 4% × 90% × (1 − 0,15) = 3,06%
```

Das heißt: Wenn Borrower 4% zahlen, bekommen Supplier ca. 3% — abzüglich Protokoll-Anteil.

**Die Spread-Logik**

Der Spread zwischen Borrow- und Supply-Rate kommt aus zwei Quellen:
1. **Utilization < 100%:** Ein Teil des Pools ist nicht geborgt, auf diesem Teil werden keine Zinsen verdient, aber er wird auf alle Supplier verteilt.
2. **Reserve Factor:** Protokoll nimmt einen Anteil.

**Wichtig für Supplier:** Dein effektiver Zins hängt von beiden Faktoren ab. Bei niedriger Utilization ist dein effektiver Zins niedrig, selbst wenn Borrow-Rate hoch scheint.

**Praktische Implikationen**

**Für Supplier (konservativ):**
- Stabile Supply-Raten erfordern stabile Utilization (typisch 60–85%)
- Extreme Utilization-Sprünge bedeuten kurzfristige Rendite-Spitzen, aber oft instabile Bedingungen
- Supply-Rate ist nie höher als (Borrow-Rate × Utilization × (1 − RF))

**Für Borrower:**
- Borrow-Rate ist höchst volatil — sie kann innerhalb von Stunden um Faktor 10 springen, wenn Utilization den Kink erreicht
- Fixed-Rate-Optionen existieren in einigen Protokollen, sind aber teurer
- Positionsgröße und geplante Dauer müssen gegen Zinsrisiko abgewogen werden

**Wann die Kurve versagt**

Das Modell funktioniert gut unter normalen Bedingungen, hat aber zwei strukturelle Schwachstellen:

1. **Liquidity Crunch bei 100% Utilization:** Wenn alle Supplier gleichzeitig auszahlen wollen (z.B. bei Panik), aber die Pool-Liquidität geborgt ist, können Auszahlungen blockiert sein. Das ist keine Insolvenz — aber Supplier können temporär nicht auf ihr Geld zugreifen.

2. **Spirale bei plötzlichen Utilization-Spikes:** Wenn jemand einen großen Kredit aufnimmt, treibt das Utilization hoch. Die gestiegene Borrow-Rate kann bestehende Borrower zwingen, Positionen zu schließen oder weitere Sicherheiten zu hinterlegen, was wiederum Positionen destabilisiert.

Beide Szenarien treten selten auf, aber sie sind reale Risiken bei extremen Marktbewegungen.

### Slide Summary

**[Slide 1] — Titel**
Zinsmodelle: Utilization-Kurven

**[Slide 2] — Grundformel**
Utilization = Geborgte Assets / Gesamt-Supply
Zins-Mechanismus: hohe Utilization → hohe Zinsen

**[Slide 3] — Die Kurve**
Flach bis zum Kink-Point (typ. 80–90%)
Danach steile Aufwärtsbewegung
Bei 100% Utilization: 50%+ Borrow-Rate möglich

**[Slide 4] — Supply-Rate-Formel**
Supply-Rate = Borrow-Rate × Utilization × (1 − Reserve Factor)

**[Slide 5] — Spread-Quellen**
1. Utilization-Verlust (ungenutzter Teil verdient nichts)
2. Reserve Factor (Protokoll-Anteil)

**[Slide 6] — Strukturelle Schwachstellen**
1. Liquidity Crunch bei 100% Utilization
2. Zins-Spirale bei plötzlichen Spikes

### Voice Narration Script

**[Slide 1]** Zinsen in DeFi sind dynamisch, nicht fest. Sie werden algorithmisch aus der Utilization des Pools bestimmt. Du musst das Zinsmodell verstehen, um Supply- und Borrow-Entscheidungen rational zu treffen.

**[Slide 2]** Die Grundformel. Utilization gleich geborgte Assets geteilt durch gesamte Supply. Wenn 80 Prozent der USDC im Pool geborgt sind, ist die Utilization 80 Prozent. Der Zins-Mechanismus: hohe Utilization bedeutet hohe Nachfrage, bedeutet hohe Zinsen. Niedrige Utilization bedeutet umgekehrt niedrige Zinsen.

**[Slide 3]** Die Standard-Zinskurve ist stückweise linear. Von null bis zum Kink-Point wächst die Borrow-Rate langsam — das ist der Normalbetrieb. Der Kink-Point liegt typisch bei 80 bis 90 Prozent Utilization. Oberhalb des Kinks wird die Kurve dramatisch steiler. Bei 95 Prozent Utilization können Borrow-Raten bereits bei 15 bis 20 Prozent liegen. Bei 100 Prozent sind 50 Prozent plus möglich. Diese Steilheit ist Absicht — sie soll Utilization zurück unter den Kink treiben.

**[Slide 4]** Die Supply-Rate-Formel. Supply-Rate gleich Borrow-Rate mal Utilization mal, eins minus Reserve Factor. Der Reserve Factor ist der Anteil, den das Protokoll einbehält — typisch 10 bis 30 Prozent. Bei 90 Prozent Utilization und 4 Prozent Borrow-Rate und 15 Prozent Reserve Factor liegt die Supply-Rate bei etwa 3 Prozent.

**[Slide 5]** Der Spread zwischen Borrow- und Supply-Rate hat zwei Quellen. Erstens: Utilization unter hundert Prozent — der ungenutzte Teil des Pools verdient keine Zinsen, aber er wird auf alle Supplier verteilt. Zweitens: Reserve Factor — das Protokoll-Anteil geht nicht an Supplier. Für dich als Supplier: dein effektiver Zins hängt von beiden Faktoren ab. Bei niedriger Utilization ist dein effektiver Zins niedrig, selbst wenn die Borrow-Rate hoch scheint.

**[Slide 6]** Zwei strukturelle Schwachstellen, die du kennen musst. Liquidity Crunch: wenn alle Supplier gleichzeitig auszahlen wollen, aber die Pool-Liquidität geborgt ist, können Auszahlungen temporär blockiert sein. Das ist keine Insolvenz — das Geld kommt zurück, wenn Borrower zurückzahlen oder neue Supplier einzahlen. Aber kurzfristig kannst du nicht auf deine Position zugreifen. Zinsspirale: plötzliche Utilization-Spikes treiben Borrow-Raten hoch, was bestehende Borrower zwingen kann, Positionen aufzulösen — was wiederum Märkte destabilisiert. Beide Szenarien treten selten auf, sind aber reale Risiken bei extremen Marktbewegungen.

### Visual Suggestions

**[Slide 1]** Titelfolie.

**[Slide 2]** Formel-Darstellung plus Diagramm: Utilization-Ratio visualisiert als Balken, der sich füllt.

**[Slide 3]** Die Zinskurve als Graph: x-Achse Utilization (0–100%), y-Achse Borrow-Rate. Zwei Segmente klar sichtbar, Kink-Point markiert. **SCREENSHOT SUGGESTION:** Aave-Interest-Rate-Strategy-Dokumentation mit Chart.

**[Slide 4]** Formel mit konkreten Zahlen-Einsetzungen durchgerechnet.

**[Slide 5]** Spread-Diagramm: Borrow-Rate → Minus Utilization-Verlust → Minus Reserve Factor → Supply-Rate.

**[Slide 6]** Zwei-Szenario-Darstellung: Liquidity Crunch und Zins-Spirale mit Pfeil-Diagrammen.

### Exercise

**Aufgabe: Zinskurve einer realen Asset-Position analysieren**

1. Öffne app.aave.com → Markets → wähle das Ethereum-Netzwerk.
2. Klicke auf USDC-Markt (Details).
3. Notiere:
   - Aktuelle Utilization
   - Aktuelle Borrow-Rate
   - Aktuelle Supply-Rate
   - Total Supply und Total Borrow
4. Öffne die "Interest Rate Strategy" (falls sichtbar, sonst auf Aaves Docs).
5. Bestimme den Kink-Point für USDC.
6. Mache dieselbe Analyse für einen volatilen Asset (z.B. WETH) und einen weniger genutzten Asset.

**Deliverable:** Vergleichstabelle mit 3 Assets und den 5 Metriken. Kurze Einschätzung (4–6 Sätze): Welcher Asset-Markt ist "gesünder" aus Sicht eines konservativen Suppliers?

### Quiz

**Frage 1:** In einem Pool mit 100 Mio. USDC Supply und 85 Mio. USDC Borrow: Bei einer Borrow-Rate von 5% und einem Reserve Factor von 10% — wie hoch ist die Supply-Rate?

<details>
<summary>Antwort anzeigen</summary>

Utilization = 85 / 100 = 85%. Supply-Rate = 5% × 85% × (1 − 0,10) = 3,825%. Also etwa 3,8% annualisiert für Supplier. Das ist deutlich unter der nominellen Borrow-Rate, weil 15% des Pools nicht verzinst werden (ungenutzt) und 10% der Borrow-Zinsen ans Protokoll gehen. Ein konservativer Supplier sollte diese Rate-Berechnung immer im Kopf machen, bevor er sich auf angezeigte APY-Zahlen verlässt.
</details>

**Frage 2:** Warum ist eine plötzliche Utilization-Bewegung von 80% auf 95% für Supplier potenziell positiv, aber für bestehende Borrower potenziell gefährlich?

<details>
<summary>Antwort anzeigen</summary>

Für Supplier: über den Kink-Point steigen die Zinsen stark, der effektive Supply-Yield kann sich verdrei- oder vervierfachen. Kurzfristig attraktiv — solange die Lage so bleibt, verdient man mehr. Für bestehende Borrower: sie zahlen plötzlich deutlich mehr Zinsen auf ihre laufenden Kredite. Eine Position, die bei 80% Utilization 3% Zinsen zahlte, kann bei 95% auf 15%+ springen. Das kann dazu zwingen, Positionen teilweise oder ganz aufzulösen, was wiederum Kollateral verkauft und möglicherweise Liquidationen auslöst. In extremen Fällen kann das eine Kaskade auslösen. Für den Borrower ist Zinsrisiko also ein echter Belastungsfaktor, das bei Positionsgrößen-Entscheidungen berücksichtigt werden muss.
</details>

---

## Lektion 6.3 — Aave: Architektur des Marktführers

### Learning Objectives

After completing this lesson the learner will be able to:
- Die Kernkomponenten von Aaves Architektur benennen
- Die Besonderheiten von Aave V3 (Efficient Mode, Isolation Mode) erklären
- Eine Supply-Entscheidung auf Aave evidenzbasiert treffen

### Explanation

**Aave** ist das größte DeFi-Lending-Protokoll nach TVL und hat die Branche seit 2020 geprägt. Die aktuelle Version — Aave V3 — bietet Features, die speziell für Kapital-Effizienz und Risikomanagement entwickelt wurden. Konservative Supplier profitieren vor allem von der Ausgereiftheit, der hohen Liquidität und der langen Track-Record von Aave.

**Kernkomponenten**

**1. Markets (pro Chain)**
Aave V3 läuft auf Ethereum, Arbitrum, Optimism, Base, Polygon, Avalanche und weiteren Chains. Jede Chain hat einen eigenen Market mit separaten Assets und Parametern. Die Chains sind **nicht** miteinander verbunden — deine aUSDC auf Arbitrum sind nicht dieselbe Position wie aUSDC auf Ethereum.

**2. Reserve Tokens (aTokens)**
Für jeden Supply-Asset gibt es ein entsprechendes aToken: aUSDC, aDAI, aWETH, etc. Diese sind 1:1 in den zugrundeliegenden Asset wandelbar. Der aToken-Balance wächst kontinuierlich durch Zinsakkumulation.

**3. Debt Tokens**
Für jeden Borrow-Asset gibt es einen Debt Token (variableDebtUSDC, stableDebtUSDC). Diese repräsentieren deine offene Schuld. Sie sind nicht übertragbar — Schuld kann nicht an andere Adressen übergeben werden.

**4. Interest Rate Strategy**
Jeder Asset hat eine eigene Interest Rate Strategy, die den Kink-Point und die beiden Steilheiten bestimmt. Diese Parameter werden durch Aave-Governance (AAVE-Token-Holders) gesetzt und können angepasst werden.

**Aave V3 spezifische Features**

**Efficient Mode (E-Mode)**

E-Mode erlaubt höhere LTV-Ratios für Assets, die hoch korreliert sind. Beispiele:
- **Stablecoin E-Mode:** USDC, USDT, DAI mit LTV bis zu 93%
- **ETH-Correlated E-Mode:** ETH, wstETH, weETH, rETH mit LTV bis zu 93%
- **Neue E-Mode-Kategorien** werden regelmäßig über Governance hinzugefügt

Das bedeutet: Ein Nutzer mit 10.000 USDC als Sicherheit kann in E-Mode bis zu 9.300 USDT borgen — praktisch eine 1:1-Belehnung zwischen gepeggten Assets. Für Borrow-Strategien ist das wichtig, für Supplier weniger direkt relevant.

**Isolation Mode**

Neue oder risikoreichere Assets können in Isolation Mode gelistet werden. Ein Nutzer, der ein Isolation-Asset als Sicherheit nutzt, kann nur bis zu einem festen Schuld-Limit borgen und nur bestimmte Stablecoins. Das begrenzt das systemische Risiko, falls das Isolation-Asset problematisch wird.

**Collateral-Switch**

Du kannst jederzeit entscheiden, ob ein Asset in deinem Aave-Portfolio als Sicherheit genutzt wird oder nur als reine Supply-Position. Das ist wichtig für konservative Supplier, die **nicht** borgen wollen — sie können Collateral-Status deaktivieren, um das Liquidationsrisiko auszuschließen.

**GHO — Aaves natives Stablecoin**

Aave hat mit GHO ein eigenes überbesichertes Stablecoin herausgegeben. Nutzer können GHO gegen Aave-Collateral borgen. Die Mechanik ähnelt MakerDAOs DAI-Modell, mit Aave-spezifischen Features (Stakers bekommen Rabatte). Für reine Supplier nicht direkt relevant, aber gut zu wissen.

**Aave-Governance-Token (AAVE)**

AAVE ist das Governance-Token. Halter können über Parameter-Änderungen abstimmen (neue Asset-Listings, Zinsraten-Anpassungen, Reserve Factors). AAVE-Halter sind außerdem durch einen "Safety Module" exponiert — in Krisen können bis zu 30% der AAVE im Safety Module zur Deckung von Protokoll-Shortfall verwendet werden. Dafür erhalten Safety-Module-Stakers Zinsen.

**Security-Track-Record**

Aave ist eines der am intensivsten auditierten DeFi-Protokolle. Mehrere führende Audit-Firmen (OpenZeppelin, Trail of Bits, SigmaPrime, ABDK) haben Audits durchgeführt. Es gab keinen direkten Protokoll-Hack seit Launch. Die längste Live-History unter den großen Lending-Protokollen.

**Realistische Supplier-Renditen auf Aave**

| Asset | Typische Supply-Rate |
|---|---|
| USDC | 3–6% |
| USDT | 3–6% |
| DAI | 2–5% |
| WETH | 1–3% |
| wstETH | 0,5–2% (plus stETH-Staking-Yield) |
| WBTC | 0,5–2% |

Diese Bereiche sind historisch variabel und schwanken mit Marktbedingungen. In Bull-Markets mit viel Leverage-Nachfrage steigen Stablecoin-Supply-Raten. In Bärmarkten sind Raten niedriger.

**Für konservative Supplier sinnvoll:**
- Stablecoin-Supply (USDC primär, USDT sekundär)
- wstETH-Supply als ETH-Exposure mit kleiner zusätzlicher Rendite
- Direkte WETH-Supply oft weniger attraktiv als Staking

### Slide Summary

**[Slide 1] — Titel**
Aave: Architektur des Marktführers

**[Slide 2] — Kernkomponenten**
1. Markets pro Chain (isoliert)
2. aTokens (zinsbringend, komponierbar)
3. Debt Tokens (nicht übertragbar)
4. Interest Rate Strategies

**[Slide 3] — Aave V3 Features: E-Mode**
Höhere LTV für korrelierte Assets.
Stablecoin E-Mode: bis 93% LTV.
ETH-Correlated: bis 93% LTV.

**[Slide 4] — Isolation Mode**
Neue/riskantere Assets mit festem Schuld-Limit.
Schützt Protokoll vor Risiko-Ausbreitung.

**[Slide 5] — Collateral-Switch**
Asset kann als Sicherheit aktiviert/deaktiviert werden.
Wichtig für reine Supplier ohne Borrow-Absicht.

**[Slide 6] — Safety Module**
AAVE-Staker tragen Restrisiko.
Bis 30% Haircut bei Protokoll-Shortfall möglich.

**[Slide 7] — Realistische Supplier-Renditen**
Stables: 3–6%
WETH: 1–3%
wstETH: 0,5–2% (+ staking yield)
Track-record: kein Protokoll-Hack seit Launch.

### Voice Narration Script

**[Slide 1]** Aave ist das größte und am längsten etablierte Lending-Protokoll. Für konservative Supplier ist es die erste Adresse — aus Gründen, die wir jetzt durchgehen.

**[Slide 2]** Aaves Architektur besteht aus vier Kernkomponenten. Markets pro Chain: Aave läuft auf vielen Chains — Ethereum, Arbitrum, Optimism, Base, Polygon, weitere. Jede Chain ist isoliert. aTokens: für jeden Supply-Asset gibt es ein entsprechendes Token, das zinsbringend ist und komponierbar. Debt Tokens: repräsentieren Schulden, sind nicht übertragbar. Interest Rate Strategies: pro Asset ein Zinsmodell mit Kink-Point und Steilheiten, per Governance anpassbar.

**[Slide 3]** Aave V3 führte Efficient Mode ein — kurz E-Mode. Damit können hoch korrelierte Assets als Collateral mit sehr hoher LTV genutzt werden. Stablecoin-E-Mode: USDC, USDT, DAI, bis 93 Prozent Belehnung. ETH-Correlated-E-Mode: ETH, wstETH, weETH, rETH, ebenfalls bis 93 Prozent. Für Borrow-Strategien ist das zentral, für reine Supplier weniger direkt relevant, aber gut zu wissen.

**[Slide 4]** Isolation Mode ist für neue oder riskantere Assets. Ein Isolation-Asset kann nur bis zu einem festen Schuld-Limit belehnt werden, und nur gegen bestimmte Stablecoins. Das schützt das Protokoll davor, dass ein problematisches neues Asset Kaskaden auslöst.

**[Slide 5]** Eine wichtige Funktion für konservative Supplier: der Collateral-Switch. Du kannst entscheiden, ob dein Asset als Collateral genutzt wird oder nur als reine Supply-Position. Wenn du nicht borgen willst, solltest du Collateral-Status deaktivieren. Das schließt jede Liquidationsgefahr aus.

**[Slide 6]** Das Safety Module. AAVE-Token-Halter können ihre AAVE im Safety Module staken und erhalten Zinsen dafür. Im Gegenzug tragen sie Restrisiko: bei Protokoll-Shortfall können bis zu 30 Prozent der gestakten AAVE verwendet werden, um Deckungslücken zu schließen. Das ist eine Puffer-Schicht, die normale Supplier schützt. Kam noch nie zum Einsatz, aber als Mechanismus vorhanden.

**[Slide 7]** Realistische Supplier-Renditen auf Aave. Stablecoins liegen typisch bei 3 bis 6 Prozent. WETH-Supply 1 bis 3 Prozent. wstETH-Supply 0,5 bis 2 Prozent plus der eingebettete Staking-Yield von stETH. WBTC-Supply unter 2 Prozent. Diese Bereiche schwanken stark mit Marktbedingungen — in Bull-Markets mit viel Leverage-Nachfrage steigen Stablecoin-Raten, in Bärmarkten fallen sie. Track-record: Aave hatte seit Launch keinen direkten Protokoll-Hack. Für konservative Supplier ist das der wichtigste einzelne Faktor.

### Visual Suggestions

**[Slide 1]** Titelfolie.

**[Slide 2]** **SCREENSHOT SUGGESTION:** Aave-App-Dashboard mit Markets-Übersicht.

**[Slide 3]** E-Mode-Darstellung: Assets gruppiert mit erhöhter LTV im Vergleich zum Normal-Mode.

**[Slide 4]** Diagramm: Normal-Asset-Pool vs. Isolated-Asset-Pool, letzterer abgetrennt mit Limit.

**[Slide 5]** **SCREENSHOT SUGGESTION:** Aave-Supply-Detail mit "Use as collateral"-Toggle.

**[Slide 6]** Safety-Module-Flussdiagramm: AAVE-Staking → Rewards + Restrisiko.

**[Slide 7]** Tabelle der Supply-Raten pro Asset-Kategorie. **SCREENSHOT SUGGESTION:** defillama.com/yields?project=aave-v3 mit aktuellen Raten.

### Exercise

**Aufgabe: Aave-Supply-Entscheidung simulieren**

1. Öffne app.aave.com.
2. Verbinde Wallet (kein Deposit nötig).
3. Wähle das Ethereum-Netzwerk.
4. Untersuche die Markets für USDC, DAI, USDT, WETH und wstETH.
5. Für jeden Asset notiere:
   - Supply APY
   - Nutzungsrate (Utilization)
   - Total Supplied
   - Isolation/E-Mode Status
6. Hypothetisch: Du willst 10.000 USD konservativ auf Aave platzieren. Wie würdest du sie aufteilen?

**Deliverable:** Tabelle mit 5 Assets und den Metriken. Allokations-Vorschlag für 10.000 USD mit Begründung (5–8 Sätze). Adressiere: warum diese Aufteilung, welche Risiken akzeptierst du, welchen Renditekorridor erwartest du.

### Quiz

**Frage 1:** Warum ist die Fähigkeit, den Collateral-Status eines Supply-Assets zu deaktivieren, für konservative Supplier wichtig?

<details>
<summary>Antwort anzeigen</summary>

Wenn ein Asset als Collateral aktiv ist, kann es theoretisch zur Deckung eines Kredits herangezogen werden — falls der Nutzer einen Kredit aufnimmt und dann liquidiert wird, wird das Collateral-Asset verkauft. Für einen reinen Supplier, der **keine** Kredite aufnehmen will, ist Collateral-Status nicht nur irrelevant, sondern potenziell gefährlich: Falls die Wallet versehentlich einen Kredit initiiert (durch falsche Signatur, Phishing, UI-Fehler) könnte das Collateral betroffen sein. Durch Deaktivierung des Collateral-Status wird klar gestellt: dieses Asset ist reine Supply-Position, es kann nicht für Borrows verwendet werden, es trägt keine Liquidationsgefahr. Für konservative Strategien ist das ein einfacher, aber wichtiger Schutz.
</details>

**Frage 2:** Aaves Safety Module bietet AAVE-Stakers zusätzliche Rendite. Was ist das implizite Risiko, und warum ist das für normale Supplier eine gute Sache?

<details>
<summary>Antwort anzeigen</summary>

AAVE-Stakers tragen ein Haircut-Risiko: bei einem Protokoll-Shortfall (z.B. durch einen Hack oder Bad Debt, die nicht durch Liquidationen gedeckt werden kann) können bis zu 30% der gestakten AAVE zur Deckung verwendet werden. Das ist eine Puffer-Schicht. Für normale Supplier ist das positiv: falls das Protokoll in Schwierigkeiten kommt, wird zuerst der Safety Module aktiviert, bevor normale Supplier-Guthaben betroffen sind. Diese Reihenfolge — Hackierte Anlagen > Safety Module > Supplier-Guthaben > Protokoll-Reserven — gibt Suppliern eine zusätzliche Sicherheitsebene. Es ist kein absoluter Schutz (bei sehr großen Shortfalls würde auch das Safety Module nicht reichen), aber es erhöht die Widerstandsfähigkeit des Systems.
</details>

---

## Lektion 6.4 — Compound und Morpho: Alternative Designs

### Learning Objectives

After completing this lesson the learner will be able to:
- Compound V3 von Aave V3 unterscheiden
- Morphos Peer-to-Peer-Matching-Modell verstehen
- Entscheiden, wann welches Protokoll für konservative Strategien geeignet ist

### Explanation

Aave ist nicht alternativlos. Compound war das ursprüngliche Benchmark, Morpho hat das Modell mit P2P-Matching weiterentwickelt, und beide haben Nischen, in denen sie attraktive Alternativen sind.

**Compound: Der Pionier**

Compound war das erste große Pool-based Lending-Protokoll, gestartet 2018. Die Architektur prägte den DeFi-Standard. Ab Compound V3 (gestartet 2022) hat das Protokoll sein Design fundamental überarbeitet.

**Compound V2 (altes Modell):**
- Alle Assets in einem gemeinsamen Pool
- Beliebiges Borrowing gegen beliebige Collaterals
- cTokens als zinsbringende Receipts

**Compound V3 (aktuell, "Comet"):**
- **Ein Pool pro Base-Asset** — z.B. USDC-Comet, USDT-Comet, WETH-Comet
- Borrower leihen **nur den Base-Asset** des jeweiligen Comets
- Collaterals werden unterstützt, aber Collateral-Assets verdienen **keine** Zinsen (wichtige Abweichung von V2 und Aave)
- Nur der Base-Asset verdient Supply-Zinsen

**Praktische Konsequenz:**

Auf Compound V3 USDC-Comet:
- Supplier zahlen USDC ein → verdienen Zinsen auf die USDC
- Borrower hinterlegen ETH, WBTC, etc. → keine Zinsen auf Collateral, aber Erlaubnis, USDC zu borgen
- Das vereinfacht die Risikostruktur — Supplier sind nur dem Base-Asset-Markt ausgesetzt

**Konservative Perspektive:**
- Compound V3 USDC-Comet kann für reine USDC-Supplier interessant sein
- Supply-Raten oft leicht unterschiedlich zu Aave (mal höher, mal niedriger)
- Weniger Features als Aave (kein E-Mode, kein Isolation Mode, weniger Assets)
- Nützlich zur Diversifikation: nicht alles auf ein Protokoll

**Morpho: Das P2P-Overlay**

Morpho startete als **Optimierungslayer über Aave und Compound**. Die Idee: P2P-Matching, wenn möglich; Pool-Fallback, wenn nicht.

**Wie es funktioniert:**

In klassischem Pool-Lending:
- Supplier zahlt 100 USDC ein → bekommt 3% APY
- Borrower leiht 100 USDC → zahlt 5% APY
- Der Spread (2%) geht in den Pool (Reserve Factor + Utilization-Verlust)

In Morpho P2P:
- Supplier und Borrower werden direkt gematcht
- Beide bekommen einen Zinssatz **zwischen** Pool-Supply und Pool-Borrow
- Supplier: 4% APY (statt 3%)
- Borrower: 4% APY (statt 5%)
- Beide profitieren

**Morpho Blue (aktuelle Version, 2024+):**

Morpho hat sich von Optimizer zu eigenständigem Protokoll entwickelt. Morpho Blue ist ein minimalistisches Lending-Primitive, auf dem **Lending-Märkte** konfigurierbar deployt werden. Jeder Markt hat:
- Ein Loan-Asset
- Ein Collateral-Asset
- Ein Oracle
- Eine LLTV (Liquidation LTV)
- Einen Interest Rate Model

**Warum das für konservative Supplier relevant ist:**

**Vaults:** Auf Morpho Blue werden **Meta-Vaults** gebaut, die Kapital über mehrere Märkte allokieren — verwaltet von Vault-Kuratoren (z.B. Steakhouse Financial, Gauntlet, Re7). Diese Vaults sind praktisch aktiv gemanagte Lending-Strategien mit Reportings.

**Beispiel:**
Ein "USDC Conservative Vault" könnte Kapital über 5–10 verschiedene Morpho-Blue-Märkte allokieren, mit definierten Risikogrenzen pro Markt. Der Vault-Kurator überwacht die Märkte kontinuierlich.

**Für Supplier:**
- Einfacher Zugriff (eine Einzahlung, automatisiert allokiert)
- Oft höhere Rendite als direktes Aave-Supply (1–3% mehr)
- Zusätzliches Risiko: Vault-Kurator kann falsche Entscheidungen treffen
- Audit-Status und Kurator-Reputation wichtig zu prüfen

**Wann welches Protokoll**

Für einen konservativen Supplier mit USDC-Kapital:

**Aave V3:**
- Am längsten etabliert, größte TVL, robustester Track-Record
- Standard-Wahl für die Mehrheit der Supply-Position

**Compound V3:**
- Diversifikation, wenn man nicht alles auf Aave haben will
- Einfachere Architektur kann übersichtlicher sein

**Morpho Blue (direkt oder via Vault):**
- Höhere Rendite möglich
- Weniger reifer Track-Record als Aave
- Gute Option für moderates Risiko-Budget

**Spark (Fork von Aave, von MakerDAO verbunden):**
- Auf Ethereum, zentrale Liquiditätsquelle für DAI-Borrowing gegen sDAI
- Nicht separat behandelt hier, aber erwähnenswert für DAI-zentrierte Strategien

**Diversifikations-Strategie**

Ein realistischer Ansatz für größere Stablecoin-Supply-Positionen:
- **50% Aave V3** (Marktführer, höchste Resilienz)
- **25% Compound V3** (Diversifikation, etabliertes Protokoll)
- **15% Morpho Blue Vault** (moderat höhere Rendite)
- **10% Reserve auf CEX/Wallet** (schnelle Liquidität)

Diese Aufteilung kann je nach Risiko-Toleranz angepasst werden, aber das Grundprinzip — **nicht alles auf ein Protokoll** — ist für jede größere Position sinnvoll.

### Slide Summary

**[Slide 1] — Titel**
Compound und Morpho: Alternative Designs

**[Slide 2] — Compound V3 "Comet"**
Ein Pool pro Base-Asset.
Borrower leihen nur den Base-Asset.
Collaterals verdienen keine Zinsen.

**[Slide 3] — Morpho: P2P-Overlay**
Matching zwischen Supplier und Borrower.
Beide bekommen bessere Raten als im Pool.

**[Slide 4] — Morpho Blue**
Minimalistisches Lending-Primitive.
Märkte frei konfigurierbar.
Vaults als automatisierte Strategien.

**[Slide 5] — Protokoll-Vergleich**
Aave V3: Etabliert, Featurenreich
Compound V3: Einfacher, separiert
Morpho Blue: Innovativ, höhere Renditen möglich

**[Slide 6] — Diversifikations-Ansatz**
50% Aave V3
25% Compound V3
15% Morpho Blue
10% Reserve

### Voice Narration Script

**[Slide 1]** Aave ist der Marktführer, aber nicht die einzige Option. Compound war der Pionier, Morpho hat das Modell weiterentwickelt. Beide haben Nischen, in denen sie attraktive Alternativen sind — besonders aus Diversifikationsgründen.

**[Slide 2]** Compound V3, die aktuelle Version, hat sein Design fundamental überarbeitet. Statt einem gemeinsamen Pool für alle Assets gibt es einen Pool pro Base-Asset. Ein USDC-Comet, ein USDT-Comet, ein WETH-Comet. Borrower können nur den Base-Asset dieses Comets leihen. Collaterals werden unterstützt, verdienen aber keine Zinsen — anders als bei Aave. Für reine Supplier ist das eine übersichtliche Struktur.

**[Slide 3]** Morpho startete als Optimierungslayer über Aave und Compound. Die Grundidee: P2P-Matching wenn möglich. In klassischem Pool-Lending zahlt der Borrower 5 Prozent und der Supplier bekommt 3 Prozent — der Spread geht in den Pool-Mechanismus. In Morpho P2P werden beide direkt gematcht und bekommen Raten zwischen Pool-Supply und Pool-Borrow. Beispiel: Supplier 4 Prozent, Borrower 4 Prozent. Beide profitieren vom Spread.

**[Slide 4]** Morpho Blue ist die aktuelle, eigenständige Version von Morpho. Ein minimalistisches Lending-Primitive — wenige Dutzend Zeilen Kerncode — auf dem beliebige Lending-Märkte konfigurierbar deployt werden können. Jeder Markt definiert Loan-Asset, Collateral-Asset, Oracle, LLTV und Interest Rate Model. Darauf bauen Vaults — Meta-Strategien, die Kapital automatisch über mehrere Märkte allokieren, verwaltet von Kuratoren wie Steakhouse Financial, Gauntlet oder Re7. Für Supplier ein einfacher Zugriff mit oft höherer Rendite als direktes Aave-Supply.

**[Slide 5]** Der Vergleich. Aave V3 ist am längsten etabliert, hat die größte TVL und den robustesten Track-Record. Standard-Wahl für die Mehrheit der Position. Compound V3 ist einfacher, aber ebenfalls etabliert — Diversifikationsoption. Morpho Blue ist innovativ, bietet potenziell höhere Renditen, hat aber weniger reifen Track-Record. Gute Option für einen Teil der Position mit moderatem Risiko-Budget.

**[Slide 6]** Ein konservativer Diversifikations-Ansatz für Stablecoin-Supply. 50 Prozent Aave V3 als Kern. 25 Prozent Compound V3 zur Diversifikation. 15 Prozent Morpho Blue Vault für moderat höhere Renditen. 10 Prozent Reserve auf CEX oder in Wallet für schnelle Liquidität. Das Grundprinzip: nicht alles auf ein Protokoll. Protokoll-Risiko ist real, auch bei etablierten Namen.

### Visual Suggestions

**[Slide 1]** Titelfolie.

**[Slide 2]** Compound-V3-Architektur-Diagramm: mehrere separate Comets, jeweils mit einem Base-Asset.

**[Slide 3]** Diagramm P2P-Matching: Supplier direkt mit Borrower verbunden, Zinssatz zwischen Pool-Supply und Pool-Borrow.

**[Slide 4]** Morpho-Blue-Vault-Architektur: Vault → mehrere Märkte → verschiedene Loan/Collateral-Kombinationen. **SCREENSHOT SUGGESTION:** app.morpho.org mit Vault-Übersicht.

**[Slide 5]** Drei-Spalten-Vergleichstabelle: Aave V3 / Compound V3 / Morpho Blue mit Charakteristika.

**[Slide 6]** Portfolio-Kuchendiagramm mit der 50/25/15/10 Aufteilung.

### Exercise

**Aufgabe: Cross-Protokoll-Vergleich für USDC-Supply**

1. Sammle aktuelle USDC-Supply-Raten von:
   - Aave V3 (Ethereum) — app.aave.com
   - Compound V3 USDC Comet — app.compound.finance
   - Morpho Blue ausgewählter Vault — app.morpho.org
   - Sky (ehemals MakerDAO) sDAI — app.spark.fi oder makerburn.com
   - Ein Curve-Pool mit USDC — defillama.com/yields

2. Dokumentiere für jeden:
   - Aktuelle Supply-Rate
   - Mechanismus (wie entsteht die Rendite?)
   - Hauptrisiken (3–4 Punkte)

3. Erstelle ein Risk-Return-Diagramm (Skizze): y-Achse Rendite, x-Achse subjektives Risiko.

**Deliverable:** Tabelle + Diagramm. Kurze Analyse (5–8 Sätze): Welcher Mix aus diesen Optionen wäre für ein 20.000 USD konservatives Portfolio geeignet?

### Quiz

**Frage 1:** Was ist der wesentliche Unterschied zwischen Compound V3 und Aave V3 in Bezug auf Collateral-Assets?

<details>
<summary>Antwort anzeigen</summary>

In Aave V3 verdienen Collateral-Assets weiterhin Supply-Zinsen, auch wenn sie als Sicherheit dienen. Das bedeutet: Ein Nutzer, der 10 ETH als Collateral hinterlegt, bekommt aWETH-Zinsen zusätzlich zu der Nutzungsmöglichkeit als Sicherheit. In Compound V3 verdienen Collateral-Assets **keine** Zinsen — sie dienen nur als Sicherheit. Nur der Base-Asset des jeweiligen Comets (z.B. USDC im USDC-Comet) verdient Supply-Zinsen. Das ist ein architektonischer Trade-off: Compound V3 hat dafür eine vereinfachte, isoliertere Risikostruktur. Für reine Supplier ist das weniger relevant, weil sie ohnehin nur den Base-Asset supplien. Für Borrower, die beide Seiten nutzen, hat Aave V3 hier einen Vorteil.
</details>

**Frage 2:** Ein Morpho-Blue-Vault erzielt 2% höhere Rendite als direkte Aave-Supply. Welches Zusatzrisiko akzeptierst du dafür?

<details>
<summary>Antwort anzeigen</summary>

Mindestens drei zusätzliche Risikoquellen. Erstens: Vault-Kurator-Risiko. Der Kurator trifft Allokations-Entscheidungen. Falsche Entscheidungen (z.B. zu aggressive Allokation auf volatile Märkte) können zu Verlusten führen. Zweitens: zusätzliche Smart-Contract-Ebene. Der Vault ist ein eigener Contract, der zusätzlich zum Morpho-Blue-Protokoll geprüft werden muss. Das erhöht die Angriffsfläche. Drittens: konzentrierte Markt-Exposition. Morpho-Blue-Märkte sind isolierter als Aave-Pools — wenn ein spezifischer Markt im Vault Probleme bekommt (z.B. Oracle-Ausfall, Collateral-Depeg), wird der Vault direkt betroffen. Ob die 2% mehr Rendite diese zusätzlichen Risiken wert sind, hängt vom Kurator-Track-Record, den Audit-Reports und der eigenen Risiko-Toleranz ab. Für einen Teil eines diversifizierten Portfolios kann es sinnvoll sein; als Hauptallokation ist es meist zu konzentriert.
</details>

---

## Lektion 6.5 — Supply-Strategien für konservative Portfolios

### Learning Objectives

After completing this lesson the learner will be able to:
- Eine Supply-Strategie passend zu einem 7–8% Jahresziel konstruieren
- Protokoll-Diversifikation sinnvoll umsetzen
- Reward-Token-Rendite vs. Base-Rendite rational bewerten

### Explanation

Supply-Strategien sind die einfachste und häufig die stabilste Form von DeFi-Rendite. Dieses Lektion gibt dir einen systematischen Ansatz, um sie als Kern eines konservativen Portfolios zu nutzen.

**Die Renditestruktur verstehen**

Deine Supply-Rendite besteht aus mehreren Komponenten:

1. **Base Supply-Rate** — was aus Borrow-Zinsen fließt (die nachhaltige Komponente)
2. **Reward-Token-Rendite** — zusätzliche Rewards in Protokoll-Tokens (z.B. AAVE, COMP, MORPHO)
3. **Delta zu Buy-and-Hold** — bei volatilen Supply-Assets zu berücksichtigen

**Die wichtigste Unterscheidung für konservative Strategien:**

Eine Supply-Rate, die zu 80% aus Base-Rate und zu 20% aus Rewards besteht, ist **stabil**. Die Rewards sind ein Bonus.

Eine Supply-Rate, die zu 80% aus Rewards und zu 20% aus Base-Rate besteht, ist **fragil**. Die Rewards können eingestellt werden, der Reward-Token-Preis kann fallen, und die Rendite bricht zusammen.

**Für ein 7–8% Jahresziel:**
- Base-Rate sollte den Hauptanteil der Rendite tragen
- Rewards sind Bonus, nicht Voraussetzung
- Protokolle mit nachhaltigen Gebühren-Einnahmen bevorzugen

**Strategie 1: Reines Stablecoin-Supply**

Der konservativste Ansatz. Keine Volatilität in den zugrundeliegenden Assets, keine IL-Äquivalente, nur Zinsertrag.

**Allokation-Beispiel (20.000 USD):**
- 60% USDC-Supply auf Aave V3 — ca. 4% APY → 12.000 USD × 4% = 480 USD
- 25% USDC-Supply auf Compound V3 — ca. 4–5% APY → 5.000 USD × 4,5% = 225 USD
- 15% Morpho Blue USDC Vault — ca. 5–7% APY → 3.000 USD × 6% = 180 USD

**Erwartete Jahres-Rendite:** 885 USD = **4,4% annualisiert**

**Bewertung:** Sehr konservativ, weit unter dem 7–8%-Ziel. Gut für den risikoavers-Teil eines Portfolios, aber allein zu defensiv.

**Strategie 2: Stablecoin + Liquid Staking (Hybrid)**

Fügt ETH-Exposure und Staking-Yield hinzu, ohne aktive Nutzung von Leverage.

**Allokation-Beispiel (20.000 USD):**
- 40% USDC-Supply auf Aave V3 — ca. 4% APY → 8.000 × 4% = 320 USD
- 15% USDC-Supply auf Compound V3 — ca. 4,5% APY → 3.000 × 4,5% = 135 USD
- 30% wstETH (direkt gehalten) — Staking-Yield ca. 3% plus ETH-Preis-Exposure → 6.000 × 3% = 180 USD (nur Yield-Anteil)
- 15% WBTC (direkt gehalten) — kein Yield, nur Preis-Exposure

**Erwartete Jahres-Yield-Komponente (ohne Preis-Bewegungen):** 635 USD = **3,2% annualisiert aus Yield**
**Zusätzlich: ETH- und BTC-Preis-Exposure** (Ziel: langfristig positive Beitrag)

**Bewertung:** Die Yield-Komponente ist moderat. Die Gesamt-Rendite hängt stark vom Krypto-Markt ab. In neutralen Märkten ~3–5%, in Bull-Markets deutlich höher (durch Preis-Anstieg von ETH/BTC), in Bear-Markets negativ (wegen Preis-Verfall).

**Strategie 3: Stablecoin-Lending + Curve-LP (Diversifiziert)**

Kombiniert Lending mit Stablecoin-LP für höhere Gesamt-Rendite.

**Allokation-Beispiel (20.000 USD):**
- 30% USDC-Supply auf Aave V3 — ca. 4% APY → 6.000 × 4% = 240 USD
- 20% USDC-Supply auf Compound V3 — ca. 4,5% APY → 4.000 × 4,5% = 180 USD
- 20% Morpho Blue USDC Vault — ca. 6% APY → 4.000 × 6% = 240 USD
- 20% Curve 3pool LP (mit oder ohne Convex) — ca. 4–6% APY → 4.000 × 5% = 200 USD
- 10% crvUSD Vault oder Stability Pool — ca. 5–7% APY → 2.000 × 6% = 120 USD

**Erwartete Jahres-Rendite:** 980 USD = **4,9% annualisiert**

**Bewertung:** Weiterhin unter 7–8%. Mehr Diversifikation als Strategie 1, aber die reinen Supply-Renditen reichen nicht alleine.

**Warum 7–8% schwer reinweg aus Supply erreichbar ist**

In aktuellen Marktphasen (2024-2025) liegen Stablecoin-Supply-Raten typisch zwischen 3 und 6%. In Bull-Markets mit hoher Leverage-Nachfrage können sie temporär auf 8-10% steigen, aber diese Spitzen sind nicht nachhaltig. Das 7-8%-Ziel erfordert typisch eine Kombination aus:
- Basis-Supply (liefert 3–5%)
- Aktives Management ergänzender Strategien (LP, Staking-Boost)
- Opportunistisches Nutzen höherer Raten bei Marktspitzen
- Geringes Risiko bei gelegentlichem Leverage-Einsatz (Modul 10)

**Die ehrliche Aussage:** Ein reines, vollständig passives Supply-Portfolio erreicht eher 4–6% als 7–8%. Das 7–8%-Ziel ist ein gemischtes Portfolio mit aktivem Management.

**Praktische Supply-Checkliste**

Vor jeder neuen Supply-Position:

1. **Protokoll-Reputation:** Etabliert, auditiert, längere Live-History?
2. **TVL:** Genug Liquidität für deine Position ohne Preis-Impact bei Einzahlung und Auszahlung?
3. **Rendite-Komponenten:** Wie viel aus Base-Rate, wie viel aus Rewards?
4. **Utilization:** Aktuell im stabilen Bereich oder am Kink-Point?
5. **Collateral-Status:** Wenn du nicht borgen willst, deaktiviert?
6. **Diversifikations-Check:** Gehört die Position zu einem bereits übergewichteten Protokoll?

### Slide Summary

**[Slide 1] — Titel**
Supply-Strategien für konservative Portfolios

**[Slide 2] — Rendite-Struktur**
1. Base Supply-Rate (nachhaltig)
2. Reward-Token-Rendite (Bonus, fragil)
3. Delta zu Buy-and-Hold bei volatilem Asset

**[Slide 3] — Strategie 1: Reines Stablecoin-Supply**
Konservativ, 4–5% erwartbar
Gut als defensiver Portfolio-Teil

**[Slide 4] — Strategie 2: Stables + Liquid Staking**
Yield ca. 3–4%, plus ETH/BTC-Exposure
Gesamt hängt vom Markt ab

**[Slide 5] — Strategie 3: Supply + Stablecoin-LP**
Diversifiziert
4,5–5,5% realistisch

**[Slide 6] — Die ehrliche Einschätzung**
Pures Supply erreicht 4–6%
7–8% erfordert Mix aus Supply + LP + Staking + gelegentliches Leverage

**[Slide 7] — Supply-Checkliste**
Protokoll-Reputation, TVL, Rendite-Quelle, Utilization, Collateral-Status, Diversifikation

### Voice Narration Script

**[Slide 1]** Jetzt wird es praktisch. Wie baust du eine Supply-Strategie, die zum 7 bis 8 Prozent-Jahresziel dieses Kurses passt. Die Antwort ist ehrlicher als viele DeFi-Anleitungen — und das ist gut so.

**[Slide 2]** Deine Supply-Rendite besteht aus mehreren Komponenten. Base Supply-Rate ist die nachhaltige Komponente, die aus Borrow-Zinsen gespeist wird. Reward-Token-Rendite ist oft ein Bonus, kann aber fragil sein — wenn das Reward-Programm endet oder der Token-Preis fällt, verschwindet die Rendite. Bei volatilen Supply-Assets kommt ein Delta zu Buy-and-Hold dazu. Für konservative Strategien gilt: Base-Rate sollte den Hauptanteil tragen, Rewards sind Bonus, nicht Voraussetzung.

**[Slide 3]** Strategie 1: reines Stablecoin-Supply. Das ist der konservativste Ansatz. 60 Prozent Aave, 25 Prozent Compound, 15 Prozent Morpho. Mit realistischen Supply-Raten ergibt sich etwa 4,4 Prozent annualisiert. Weit unter dem 7 bis 8 Prozent-Ziel — aber sehr stabil. Gut für den defensiven Teil eines Portfolios, nicht als alleinige Strategie.

**[Slide 4]** Strategie 2: Stablecoin plus Liquid Staking. Du kombinierst Supply-Renditen mit ETH-Exposure über wstETH und einem kleinen Anteil WBTC. Die reine Yield-Komponente liegt bei etwa 3 Prozent — die Gesamt-Rendite hängt stark vom Krypto-Markt ab. In neutralen Märkten 3 bis 5 Prozent, in Bull-Markets deutlich höher durch Preisanstieg, in Bear-Markets negativ. Diese Strategie hat eingebettete Marktrichtungs-Wette.

**[Slide 5]** Strategie 3: Supply plus Stablecoin-LP. Kombiniert Lending mit Curve-LP und crvUSD-Vaults. Diversifizierter, etwa 4,9 Prozent annualisiert. Besser als reines Supply, aber immer noch unter 7 bis 8 Prozent.

**[Slide 6]** Die ehrliche Einschätzung. Pures Supply erreicht in aktuellen Marktphasen typisch 4 bis 6 Prozent. Das 7 bis 8 Prozent-Ziel aus einem komplett passiven Supply-Portfolio zu erreichen ist unrealistisch. Du brauchst einen Mix: Supply als Basis, Liquidity Providing, Staking, gelegentliches Leverage bei sauberer Risiko-Kontrolle. Modul 10 behandelt Leverage-Strategien im Detail. Die Kern-Botschaft: 7 bis 8 Prozent sind erreichbar, aber nicht durch Knopfdrücken allein.

**[Slide 7]** Die Supply-Checkliste. Vor jeder neuen Position: prüfe Protokoll-Reputation, TVL, woher die Rendite kommt — Base-Rate oder Rewards, aktuelle Utilization, Collateral-Status, und ob die Position zu einem bereits übergewichteten Protokoll gehört. Diese sechs Punkte durchgehen, bevor du signierst. Das ist die Basis-Hygiene.

### Visual Suggestions

**[Slide 1]** Titelfolie.

**[Slide 2]** Tortendiagramm der Rendite-Komponenten mit grüner/roter Einfärbung nach Nachhaltigkeit.

**[Slide 3]** Allokations-Kuchendiagramm der Strategie 1 mit Rendite-Kalkulation.

**[Slide 4]** Allokations-Kuchendiagramm der Strategie 2.

**[Slide 5]** Allokations-Kuchendiagramm der Strategie 3.

**[Slide 6]** Vergleichs-Balkendiagramm der drei Strategien mit realistischer Rendite. Daneben 7-8% Zielmarker.

**[Slide 7]** Sechs-Punkte-Checkliste.

### Exercise

**Aufgabe: Eigene Supply-Strategie entwickeln**

1. Definiere deine Portfolio-Parameter:
   - Gesamt-Kapital (hypothetisch oder real)
   - Risiko-Toleranz (skala 1–10, 1=extrem konservativ)
   - Zeit-Budget für Monitoring (Stunden/Woche)
   - Rendite-Ziel

2. Entwirf eine Supply-Strategie basierend auf den drei Beispielen aus der Lektion — oder eine eigene Variation.

3. Schätze die erwartete Rendite pro Komponente.

4. Identifiziere die drei größten Risiken deiner Strategie.

5. Definiere Exit-Kriterien: wann würdest du eine Position auflösen?

**Deliverable:** Strategie-Dokument (2–3 Seiten), das die fünf Punkte strukturiert abdeckt. Abschlussfrage: Rechnet sich die Strategie für dich, realistisch?

### Quiz

**Frage 1:** Warum ist ein Reward-Token-dominierter Supply-Ansatz fragil?

<details>
<summary>Antwort anzeigen</summary>

Drei Gründe. Erstens: Reward-Programme haben ein Ende — entweder definiert oder durch Governance beendet. Wenn die Rewards stoppen, bricht die scheinbar hohe Rendite auf die Base-Rate zusammen. Zweitens: Reward-Tokens haben eigenes Preisrisiko. Wenn der Token um 50% fällt, halbiert sich der USD-Wert der Rendite. Drittens: Reward-Programme ziehen oft "Mercenary Capital" an — Kapital, das nur wegen der Rewards kommt und sofort abzieht, wenn sie sinken. Das führt zu Utilization-Kollaps und dann zu fallenden Base-Raten als zweite Welle. Ein konservativer Supplier sollte immer fragen: "Wenn die Rewards morgen Null wären, wäre die Base-Rate attraktiv genug?" Wenn die Antwort nein ist, ist die Position fragil.
</details>

**Frage 2:** Warum ist es realistischer zu erwarten, dass ein vollständig passives Stablecoin-Supply-Portfolio 4–5% jährlich erwirtschaftet als 7–8%?

<details>
<summary>Antwort anzeigen</summary>

Weil Stablecoin-Supply-Raten algorithmisch aus Utilization und Borrow-Nachfrage entstehen. Die typische Borrow-Rate für USDC liegt bei 4–8%, die Utilization bei 60–90%, und nach Abzug des Reserve Factors (10–30%) bleibt eine Supply-Rate von etwa 3–6% netto. Das ist das historisch stabile Mittel. Phasen mit 7–10% Supply-Rate existieren (Peak-Leverage-Nachfrage in Bullmarkets), sind aber kurzfristig. Über ein ganzes Jahr mitteln sich diese Spitzen mit niedrigeren Phasen. Um konsistent 7–8% zu erreichen, braucht man entweder aktives Management (Protokoll-Rotation bei Marktverschiebungen), zusätzliche Strategien (LP, Staking), oder moderates Leverage. Ein komplett passives Stablecoin-Supply-Portfolio ist auf 4–5% beschränkt — was immer noch deutlich besser ist als traditionelles Sparen, aber eben nicht 7–8%.
</details>

---

## Lektion 6.6 — Lending-Risiken und Monitoring

### Learning Objectives

After completing this lesson the learner will be able to:
- Die fünf Hauptrisiken einer Supply-Position systematisch analysieren
- Monitoring-Tools für Lending-Positionen einsetzen
- Klare Exit-Trigger für eine Position definieren

### Explanation

Selbst "konservative" Supply-Positionen tragen Risiken. Sie sind meistens kleiner als bei LP oder Leverage, aber sie sind nicht null. Diese Lektion systematisiert die Risikobetrachtung.

**Risiko 1: Smart-Contract-Risiko**

Der Code des Protokolls könnte einen Bug haben, der durch Exploit deine Position zerstört. Etablierte Protokolle (Aave, Compound) haben dieses Risiko minimiert durch:
- Mehrere unabhängige Audits
- Lange Live-History ohne Hack
- Bug-Bounty-Programme
- Formale Verifikationen (bei einigen Funktionen)

**Mitigation:**
- Nur etablierte Protokolle nutzen
- Neue Forks oder noch nicht auditierte Protokolle meiden
- Bei mehr als 6-stelligen Beträgen: Diversifikation über mehrere Protokolle

**Risiko 2: Liquidity Crunch (Auszahlungs-Sperre)**

Wie in Lektion 6.2 beschrieben: Bei 100% Utilization können Auszahlungen temporär blockiert sein. Das ist keine Insolvenz, aber du kannst kurzfristig nicht liquidieren.

**Historische Beispiele:**
- März 2023 USDC-Depeg: Auszahlungen aus einigen Pools waren temporär verzögert
- Verschiedene kleinere Events während Marktvolatilität

**Mitigation:**
- Nicht die gesamte Stablecoin-Position in einem Protokoll halten
- Einen Teil des Kapitals auf Wallet oder CEX für schnelle Liquidität
- Auf Utilization-Level achten: über 90% sollte zur Vorsicht mahnen

**Risiko 3: Depeg-Risiko (bei Stablecoin-Supply)**

Wenn der zugrundeliegende Stablecoin depeggt, ist deine Supply-Position direkt betroffen. Beispiele:
- USDC-Depeg März 2023 auf 0,88 USD (temporär)
- USDT-Depeg-Ängste zu verschiedenen Zeitpunkten (nie signifikant realisiert)
- UST-Kollaps Mai 2022 (algorithmisch, permanent)

**Mitigation:**
- Diversifikation über mehrere Stablecoin-Typen: fiat-besichert (USDC, USDT), krypto-besichert (DAI), overcollateralized (crvUSD, LUSD)
- Keine übergewichtete Exposition zu einem einzelnen Emittenten
- Monitoring-Tools für Depeg-Situationen nutzen

**Risiko 4: Oracle-Risiko**

Lending-Protokolle nutzen Preis-Oracles (meist Chainlink), um Collateral-Werte zu bestimmen. Ein manipuliertes oder ausgefallenes Oracle kann falsche Liquidationen triggern — nicht direkt für Supplier, aber indirekt durch Destabilisierung des Pools.

**Mitigation:**
- Protokolle mit robusten Oracle-Infrastrukturen bevorzugen (Chainlink, Redstone, Pyth mit Multi-Source)
- Morpho Blue-Märkte prüfen genauer: jeder Markt definiert seinen eigenen Oracle

**Risiko 5: Bad Debt**

Wenn Liquidationen nicht schnell genug ausgeführt werden oder der Collateral schneller fällt als liquidiert werden kann, entsteht Bad Debt — Schulden, die nicht durch Collateral gedeckt sind. Supplier tragen im schlimmsten Fall diese Verluste kollektiv.

**Historische Beispiele:**
- Mehrere kleinere Bad-Debt-Events auf Aave, meist durch Governance-Entscheidungen abgefangen
- Kleinere Lending-Protokolle haben größere Bad-Debt-Events erlebt (z.B. Sonne Finance, Euler nach Hack)

**Mitigation:**
- Nur Protokolle mit etablierten Safety-Modulen oder Insurance-Mechanismen (Aave Safety Module)
- Protokolle mit konservativen LTV-Parametern bevorzugen

**Monitoring-Tools und -Frequenz**

**Täglich (passiv, 1 Min):**
- DeBank-Portfolio-Check auf Wallet: alles noch an erwarteter Stelle?

**Wöchentlich (5–10 Min):**
- Supply-Raten auf Hauptpositionen prüfen
- Protokoll-News überblicken (Twitter, offizielle Blogs)
- Utilization-Level der eigenen Positionen prüfen

**Monatlich (30 Min):**
- Vollständige Portfolio-Review
- Rebalancing-Entscheidung: sollen Beträge zwischen Protokollen verschoben werden?
- Neue Protokolle/Vaults prüfen — ist eine Umschichtung sinnvoll?
- Gas-Kosten-Analyse: lohnen sich Umschichtungen?

**Bei Markt-Ereignissen (außerplanmäßig):**
- Bei signifikanten Depeg-Events: Positionen prüfen, ggf. Notfall-Auszahlung
- Bei großen Hacks in verwandten Protokollen: auf Contagion prüfen

**Empfohlene Tools:**
- **DeBank** (debank.com) — Portfolio-Tracking
- **DeFiLlama** (defillama.com/yields) — Cross-Protokoll-Renditen
- **DefiSafety** (defisafety.com) — Protokoll-Sicherheitsbewertungen
- **Aave-Health-Tracker** (wenn Collateral-Positionen genutzt werden)
- **Risk-Dashboards** spezialisierter Anbieter (Gauntlet, RiskDAO)

**Exit-Trigger definieren**

Jede Position sollte klare Exit-Kriterien haben. Beispiele für Supply-Positionen:

- **Rendite-Trigger:** "Wenn Base-Rate unter 2% fällt, umschichten"
- **Utilization-Trigger:** "Wenn Utilization über 95% steigt, teilweise auszahlen"
- **Protokoll-Event-Trigger:** "Bei offiziellem Hack-Announcement oder Governance-Notfall, sofort auszahlen"
- **Depeg-Trigger:** "Bei Stablecoin-Preis-Abweichung über 3%, Position evaluieren"
- **Diversifikations-Trigger:** "Wenn eine Position über 40% des DeFi-Portfolios, teilweise umschichten"

Diese Trigger im Voraus zu definieren ist entscheidend, weil sie verhindert, dass Entscheidungen in Stress-Situationen emotional oder impulsiv getroffen werden.

**Die konservative Minimum-Hygiene**

- Monatlicher Portfolio-Check
- Maximal 40% Position in einem einzelnen Protokoll
- Diversifikation über mindestens 2 Stablecoin-Typen
- Kleine Reserve in Wallet/CEX für Notfall-Reaktion
- Klare Exit-Trigger dokumentiert

Diese fünf Punkte sind kein Aufwand — sie sind Basis-Disziplin. Ohne sie ist auch eine "konservative" Strategie nicht wirklich konservativ.

### Slide Summary

**[Slide 1] — Titel**
Lending-Risiken und Monitoring

**[Slide 2] — Fünf Hauptrisiken**
1. Smart-Contract
2. Liquidity Crunch
3. Depeg (bei Stables)
4. Oracle
5. Bad Debt

**[Slide 3] — Mitigation-Prinzipien**
Etablierte Protokolle
Diversifikation
Monitoring
Klare Exit-Trigger

**[Slide 4] — Monitoring-Frequenz**
Täglich: schneller Check (1 Min)
Wöchentlich: Details (5–10 Min)
Monatlich: Vollreview (30 Min)
Bei Events: außerplanmäßig

**[Slide 5] — Tools**
DeBank, DeFiLlama, DefiSafety
Risk-Dashboards (Gauntlet, RiskDAO)

**[Slide 6] — Exit-Trigger**
Rendite, Utilization, Protokoll-Events, Depeg, Diversifikation
Vorab definieren, in Stress konsistent anwenden

**[Slide 7] — Minimum-Hygiene**
5 Regeln, kein Aufwand, pure Disziplin

### Voice Narration Script

**[Slide 1]** Auch konservative Supply-Positionen tragen Risiken. Sie sind kleiner als bei LP oder Leverage, aber nicht null. Diese Lektion systematisiert die Risikobetrachtung und gibt dir Monitoring-Werkzeuge.

**[Slide 2]** Fünf Hauptrisiken. Smart-Contract — Bug im Code. Liquidity Crunch — temporäre Auszahlungs-Sperre bei maximaler Utilization. Depeg — wenn der zugrundeliegende Stablecoin den Peg verliert. Oracle — manipulierte Preis-Feeds können Protokolle destabilisieren. Bad Debt — Schulden, die nicht durch Collateral gedeckt sind, werden im Worst Case kollektiv von Suppliern getragen.

**[Slide 3]** Mitigation-Prinzipien. Erstens: etablierte Protokolle bevorzugen — Aave, Compound, Morpho. Nicht neue Forks. Zweitens: Diversifikation — kein einzelner Protokoll-Punkt-of-Failure. Drittens: Monitoring mit klaren Frequenzen. Viertens: Exit-Trigger vorab definieren.

**[Slide 4]** Monitoring-Frequenzen. Täglich ein schneller Portfolio-Check, eine Minute, reicht um Anomalien zu sehen. Wöchentlich fünf bis zehn Minuten — Supply-Raten, News, Utilization. Monatlich dreißig Minuten vollständige Review mit Rebalancing-Entscheidungen. Und außerplanmäßig bei Markt-Ereignissen: signifikante Depegs, große Hacks in verwandten Protokollen.

**[Slide 5]** Tools. DeBank für Portfolio-Tracking. DeFiLlama für Cross-Protokoll-Vergleiche von Renditen. DefiSafety für Protokoll-Sicherheitsbewertungen. Risk-Dashboards spezialisierter Anbieter wie Gauntlet oder RiskDAO für detaillierte Metriken. Das sind die Werkzeuge der Profis, und sie sind öffentlich zugänglich.

**[Slide 6]** Exit-Trigger vorab definieren ist entscheidend. Beispiele: Rendite unter 2 Prozent → umschichten. Utilization über 95 Prozent → teilweise auszahlen. Offizielle Hack-Announcement → sofort auszahlen. Stablecoin-Preis-Abweichung über 3 Prozent → Position evaluieren. Warum vorab definieren? Weil Entscheidungen in Stress-Situationen oft emotional oder impulsiv sind. Klare Regeln schützen vor diesen Fehlern.

**[Slide 7]** Die Minimum-Hygiene für konservative Supply-Strategien. Monatlicher Portfolio-Check. Maximal 40 Prozent in einem einzelnen Protokoll. Diversifikation über mindestens zwei Stablecoin-Typen. Kleine Reserve in Wallet oder CEX für Notfälle. Klare Exit-Trigger dokumentiert. Fünf Regeln. Kein Aufwand. Pure Disziplin.

### Visual Suggestions

**[Slide 1]** Titelfolie.

**[Slide 2]** Fünf-Karten-Übersicht der Risiken mit kurzer Beschreibung.

**[Slide 3]** Vier-Punkt-Pyramide der Mitigation-Prinzipien.

**[Slide 4]** Zeit-Gitter mit Monitoring-Frequenzen und jeweiligen Aktionen.

**[Slide 5]** **SCREENSHOT SUGGESTION:** DeBank-Portfolio-Ansicht, die Lending-Positionen darstellt. Alternativ: DeFiLlama yields-Seite mit Filter auf Lending.

**[Slide 6]** Entscheidungsbaum: Trigger → Aktion.

**[Slide 7]** Fünf-Punkte-Checkliste als Abschluss-Zusammenfassung.

### Exercise

**Aufgabe: Persönliches Monitoring- und Exit-Protokoll entwerfen**

1. Definiere dein persönliches Monitoring-Protokoll:
   - Täglich: was wirst du checken, wie lange?
   - Wöchentlich: welche Metriken?
   - Monatlich: welche Entscheidungen?

2. Definiere Exit-Trigger für eine hypothetische USDC-Supply-Position auf Aave mit 10.000 USD:
   - Rendite-Schwelle
   - Utilization-Schwelle
   - Protokoll-Event-Schwelle
   - Depeg-Schwelle
   - Diversifikations-Schwelle

3. Skizziere eine Notfall-Prozedur: wenn morgen ein großer DeFi-Hack passiert, welche Schritte unternimmst du?

**Deliverable:** Dokument (1–2 Seiten) mit Monitoring-Protokoll, Exit-Triggern und Notfall-Prozedur.

### Quiz

**Frage 1:** Warum ist ein "Liquidity Crunch" (100% Utilization) weniger schlimm als ein Protokoll-Hack, auch wenn kurzfristig beide bedeuten, dass du nicht an dein Geld kommst?

<details>
<summary>Antwort anzeigen</summary>

Ein Liquidity Crunch ist eine temporäre Situation: der Pool ist zu 100% ausgeliehen, also keine Liquidität für Auszahlungen. Das löst sich natürlich auf, sobald Borrower zurückzahlen (was durch die dann sehr hohen Zinsen angeregt wird) oder neue Supplier einzahlen. Das Kapital ist nicht weg — es ist nur zeitweise illiquide. Bei einem Hack ist das Kapital tatsächlich verloren (oder nur über Governance-Entscheidungen und Safety-Module teilweise wiederherstellbar). Praktisch: bei einem Liquidity Crunch wartet man Stunden bis Tage, bei einem Hack verliert man einen großen Teil der Position permanent. Der Unterschied in der Gravität ist enorm. Deshalb ist Liquidity Crunch ein kontrollierbares Risiko (durch Diversifikation und kleine Reserve), während Smart-Contract-Risiko ein existenzielles Risiko ist (nur durch Protokoll-Auswahl mitigierbar).
</details>

**Frage 2:** Warum ist es strategisch besser, Exit-Trigger **vor** einer Marktkrise zu definieren als während der Krise zu entscheiden?

<details>
<summary>Antwort anzeigen</summary>

Weil in Krisen das Gehirn nicht rational arbeitet. Unter Stress fallen Menschen in Heuristiken: Angst führt zu Panik-Verkäufen am Tiefpunkt, Trägheit führt zu "ich warte noch"-Verhalten bis zu Totalverlust, Bestätigungsneigung führt zu selektiver Wahrnehmung von positiven News. Vorab definierte Trigger sind Entscheidungen, die in ruhigem Zustand getroffen wurden — mit vollem Zugang zu Logik und Datenanalyse. Sie werden mechanisch umgesetzt, wenn die Bedingung erfüllt ist, ohne Neubewertung. Das entkoppelt das Verhalten von emotionaler Volatilität. Zusätzlich: klare Trigger erlauben Automation (einige Tools können basierend auf Triggern Alerts senden). Ohne vorab definierte Trigger wird jede Krisen-Entscheidung eine Entscheidung unter Stress — und das ist strukturell unterlegen gegenüber systematischem Regelwerk.
</details>

---

## Modul-Abschluss-Quiz

Fünf Fragen zum integrierten Verständnis von Modul 6.

**Frage 1:** Erkläre die Beziehung zwischen Utilization, Borrow-Rate und Supply-Rate anhand eines Beispiels.

<details>
<summary>Antwort anzeigen</summary>

Die Borrow-Rate ist eine stückweise lineare Funktion der Utilization mit einem Kink-Point. Beispiel USDC auf Aave: bei 50% Utilization etwa 2% Borrow-Rate, bei 80% etwa 3,5%, am Kink (typisch 90%) etwa 4%, bei 95% schon 15–20%, bei 100% 50%+. Die Supply-Rate leitet sich ab: Borrow-Rate × Utilization × (1 − Reserve Factor). Bei 80% Utilization, 3,5% Borrow-Rate, 15% Reserve Factor: Supply-Rate = 3,5% × 0,8 × 0,85 ≈ 2,4%. Der Spread (Differenz zwischen Borrow- und Supply-Rate) hat zwei Quellen: der ungenutzte Pool-Teil (verdient nichts, wird aber auf alle verteilt) und der Reserve Factor (geht ans Protokoll).
</details>

**Frage 2:** Ein Anleger legt 30.000 USD USDC auf Aave V3 zu 4,5% Supply-Rate ab. Nach 6 Monaten steigt die Rate auf 7%, nach 12 Monaten fällt sie auf 3%. Was ist eine realistische Gesamt-Rendite, und was sagt das über Supply-Strategien aus?

<details>
<summary>Antwort anzeigen</summary>

Grobe Schätzung (vereinfacht, ohne Compounding): Durchschnitt über 12 Monate bei ungefähr gleichmäßigem Rate-Verlauf: (4,5 + 7 + 3) / 3 = 4,8%. Auf 30.000 USD: ca. 1.440 USD Zinsen. Das Wichtige ist die Aussage: Supply-Raten schwanken stark, und die Jahres-Rendite ist selten exakt die "angezeigte APY" zu einem bestimmten Zeitpunkt. Das erklärt, warum realistische Jahreserwartungen für USDC-Supply in 3–6% liegen, auch wenn zeitweise 7–10% angezeigt werden. Für konservative Strategien: diese Volatilität akzeptieren und nicht bei kurzen Dips in panische Umschichtungen wechseln.
</details>

**Frage 3:** Warum ist die Architektur von Morpho Blue (isolierte Märkte) potenziell riskanter für Supplier als Aave V3 (gemeinsamer Pool)?

<details>
<summary>Antwort anzeigen</summary>

In Aave V3 werden Risiken aus einzelnen Assets über den gesamten Pool verteilt: ein Asset mit Problemen wird durch Governance abgefangen, Bad Debt kann durch das Safety Module getragen werden, Diversifikation ist strukturell eingebaut. In Morpho Blue ist jeder Markt isoliert. Ein Markt mit einem problematischen Collateral oder Oracle kann vollständig versagen, und Supplier dieses Marktes tragen den Schaden direkt — ohne Safety Module, ohne Querverrechnung. Vaults mitigieren das teilweise durch Diversifikation über mehrere Märkte, fügen aber Kurator-Risiko hinzu. Für Supplier gilt: Morpho Blue bietet höhere Renditen, aber in einem konzentrierteren Risiko-Modell. Bei bekannten, gut-auditierten Märkten und vertrauenswürdigen Kuratoren kann das akzeptabel sein; als Gesamt-Portfolio-Basis ist Aave V3 aber konservativer.
</details>

**Frage 4:** Ein DeFi-Anleger hält 100% seines Stablecoin-Kapitals (50.000 USD) als USDC auf Aave V3. Welche drei fundamentalen Schwächen hat diese Position?

<details>
<summary>Antwort anzeigen</summary>

Erstens: Konzentration auf ein einzelnes Protokoll. Ein Smart-Contract-Hack, eine kritische Governance-Fehlentscheidung oder ein anderes Aave-spezifisches Problem trifft 100% des Kapitals. Diversifikation über Compound V3, Morpho Blue oder andere wäre angemessen. Zweitens: Konzentration auf einen einzelnen Stablecoin. USDC ist fiat-besichert und hängt an Circle und dessen Banken. Ein USDC-Depeg (wie März 2023) betrifft die gesamte Position. Diversifikation über USDT, DAI, crvUSD wäre sinnvoll. Drittens: 100% in Lending bedeutet keine Liquidität. Eine schnelle Auszahlung von 50.000 USD könnte auf Utilization-Probleme treffen. Eine kleine Reserve (5–10%) auf CEX oder Wallet gibt Flexibilität für Notfälle oder Opportunitäten.
</details>

**Frage 5:** Ein Anleger hat das Jahresziel von 7–8% Rendite. Welche Kombination aus Supply und anderen Strategien ist realistisch, um das Ziel zu erreichen?

<details>
<summary>Antwort anzeigen</summary>

Eine ehrliche Einschätzung: rein passives Supply erreicht typisch 4–6%. Um 7–8% zu erreichen, kommen Ergänzungen: Erstens — Liquid Staking (wstETH, rETH) als Teil des Portfolios bringt ETH-Staking-Yield (3–4%) zusätzlich zu ETH-Exposure. Zweitens — Stablecoin-LP auf Curve oder ähnliches (3–6% netto) bringt etwas mehr als pures Lending bei ähnlich niedrigen Risikoprofil. Drittens — moderates, kontrolliertes Leverage (z.B. ETH-Loop auf Aave mit sehr konservativem LTV), das wir in Modul 10 behandeln, kann Rendite boosten bei klaren Risikogrenzen. Vierte Komponente — opportunistisches Wahrnehmen höherer Raten bei Marktspitzen (z.B. kurzfristig auf Protokoll mit erhöhter Utilization wechseln). Ein typisches konservativ-aktives Portfolio könnte aus 40% Lending, 30% Staking, 20% LP, 10% Reserve/Opportunity bestehen — und damit realistisch 5–8% erreichen. 7–8% ist machbar, aber nicht durch eine einzige passive Strategie — es erfordert durchdachtes Portfolio-Management, das Modul 12 vertieft.
</details>

---

## Modul-Zusammenfassung

Du hast in Modul 6 die Lending-Infrastruktur systematisch verstanden:

**Architektur:** Pool-based Modell dominiert. Supplier zahlen ein, erhalten aTokens. Borrower hinterlegen Collateral, zahlen variable Zinsen. Überbesicherung ist Kern-Prinzip.

**Zinsmodell:** Utilization-basiert. Stückweise lineare Kurve mit Kink-Point bei 80–90%. Oberhalb des Kinks dramatischer Zinsanstieg. Supply-Rate = Borrow-Rate × Utilization × (1 − Reserve Factor).

**Aave V3:** Marktführer, etabliert, featurenreich (E-Mode, Isolation Mode, Safety Module). Typische Stablecoin-Supply-Raten 3–6%. Längster Track-Record ohne direkten Hack.

**Compound V3:** Vereinfachtes Design — ein Pool pro Base-Asset, Collaterals verdienen keine Zinsen. Gute Diversifikations-Option zu Aave.

**Morpho Blue:** Minimalistisches Primitive mit Vaults. Potentiell höhere Renditen, aber konzentriertere Risiken. Sinnvoll als Teil eines diversifizierten Portfolios, nicht als einzige Basis.

**Supply-Strategien:** Reines Stablecoin-Supply erreicht 4–5% passiv. Erweiterte Strategien mit Liquid Staking und Stablecoin-LP erreichen 4,5–5,5%. Das 7–8%-Ziel erfordert aktiven Mix mit LP, Staking und moderatem Leverage — komplett passive Strategien bleiben unter dem Ziel.

**Risiken:** Smart-Contract, Liquidity Crunch, Depeg, Oracle, Bad Debt. Monitoring monatlich + anlassbezogen. Exit-Trigger vorab definieren — Stress-Entscheidungen sind strukturell schlechter.

**Kern-Disziplin:** Max 40% in einem Protokoll. Diversifikation über mindestens zwei Stablecoin-Typen. Kleine Reserve für Notfälle. Dokumentierte Exit-Trigger. Fünf Regeln, pure Disziplin.

**Was in Modul 7 kommt:** Die Borrow-Seite. Collateral-Management, Loan-to-Value, Health Factor, Liquidationsmechanik, Oracle-Risiken bei der Preisbestimmung. Die aktive Nutzung der Lending-Protokolle — mit konservativem Risikomanagement als Kern.

---

*Ende von Modul 6.*
