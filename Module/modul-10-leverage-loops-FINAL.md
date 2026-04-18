# Modul 10 — Leverage-Loops

**Zielgruppe:** Fortgeschrittene
**Geschätzte Dauer:** 90–110 Minuten
**Voraussetzungen:** Module 1–9 abgeschlossen

**Kursstufe:** Advanced (Gehebelte Strategien)
**Lektionsanzahl:** 6
**Didaktische Ausrichtung:** Leverage-Mechanik, Loop-Strategien, Risikoanalyse, sichere Grenzen, praktische Umsetzung, Negativ-Kriterien
**Konformität:** Final Fix Document v1 — Struktur, Terminologie und Pipeline-Assets harmonisiert

**Harmonisierte Terminologie (gültig im gesamten Modul):**
- Leverage-Loop, Leverage Multiple
- Safe Leverage Limits (konservative Grenzen)
- Loop Risk: Liquidations-, Zins-, Depeg-, Smart-Contract-, Composability-Risiko
- Liquid Staking Token (LST), wstETH
- Health Factor (HF), Liquidation Threshold, LTV
- Sustainable vs. Temporary Yield
- Smart Contract Risk, Depeg Risk, Composability Risk, Dependency Risk

**Querverweise:**
- Die Fix-Doc-Erweiterungen "Loop Risk Diagram" und "Safe Leverage Limits" sind in Lektion 10.3 (Mathematik) und 10.4 (Risiken) explizit didaktisch umgesetzt.
- Die Loop-Basis (Lending, Collateral, Health Factor) wurde in Modul 6 und 7 gelegt.
- Liquid-Staking-Tokens als Loop-Collateral wurden in Modul 9 vorgestellt.

**Video-Pipeline:** Jede Lektion ist für Gamma (Folien) → ElevenLabs (Voice) → CapCut (Video) vorbereitet. Zielvideo-Länge pro Lektion: 8–10 Minuten (120–140 WPM).

---

## Modul-Überblick

Leverage-Loops sind die mächtigste und gleichzeitig riskanteste Yield-Strategie in DeFi. Durch wiederholtes Borgen gegen bestehende Sicherheiten können Nutzer ihre Basis-Rendite um das 2–5-fache verstärken. Das klingt attraktiv — 3% Staking-Rendite wird zu 10% "Loop-Rendite". Aber diese Verstärkung funktioniert in beide Richtungen: Verluste werden genauso multipliziert, und das Liquidations-Risiko steigt überproportional.

Dieses Modul ist bewusst konservativ strukturiert. Das Ziel ist **nicht**, dich zum Leverage-User zu machen. Das Ziel ist, dass du verstehst:
- Wie Leverage-Loops mechanisch funktionieren
- Warum sie strukturell riskant sind
- Wann sie für konservative Strategien sinnvoll sein können
- **Und vor allem: wann nicht**

Für das 7–8%-Jahresziel dieses Kurses sind Leverage-Loops in vielen Fällen nicht nötig. Ein gut diversifiziertes Portfolio aus Stablecoin-Supply, Liquid Staking und LP-Positionen erreicht dieses Ziel ohne Leverage-Risiko. Wer trotzdem Leverage einsetzt, sollte es mit klaren Regeln und strengem Risikomanagement tun.

**Lektionen:**
1. Was ein Leverage-Loop eigentlich ist
2. Leveraged Staking: Die wstETH-Loop-Strategie
3. Die Leverage-Mathematik und Wachstumsgrenzen
4. Die spezifischen Risiken von Loops
5. Praktische Umsetzung und Monitoring
6. Wann Leverage-Loops NICHT sinnvoll sind

---

## Lektion 10.1 — Was ein Leverage-Loop eigentlich ist

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Den Grundmechanismus eines Leverage-Loops präzise beschreiben
- Den Unterschied zwischen Leverage und einfachem Borrowing verstehen
- Die häufigsten Arten von Loops identifizieren
- Die Loop-Iteration (Deposit → Borrow → Swap → Re-Deposit) mathematisch nachvollziehen
- Den Leverage Multiple als zentrale Kennzahl definieren und für eine konkrete Position berechnen
- Konservative Einsatzfelder (Staking-Loops, Stable-Loops) von spekulativen Loops abgrenzen

### Erklärung

Ein Leverage-Loop ist eine Strategie, bei der ein Nutzer ein Asset als Sicherheit hinterlegt, ein anderes Asset borgt, das geborgte Asset in dasselbe Ursprungs-Asset tauscht und erneut einzahlt — und diesen Prozess wiederholt. Das Ergebnis: die effektive Position in dem Basis-Asset ist größer als das ursprüngliche Kapital.

**Der einfachste Loop: wstETH-Staking-Loop**

Um die Mechanik konkret zu verstehen, schauen wir einen typischen Leverage-Loop auf Aave V3:

**Ausgangsposition:** 10 ETH (gestaktet als wstETH, ~10 ETH-Wert)

**Runde 1:**
1. Hinterlege 10 wstETH als Collateral auf Aave (E-Mode aktiviert, LTV bis 93%)
2. Borge 8 ETH gegen die wstETH-Sicherheit (80% LTV — konservativer als Max)
3. Stake die 8 ETH via Lido → bekomme ~8 wstETH
4. Hinterlege die neuen 8 wstETH als zusätzliches Collateral

**Runde 2:**
5. Borge 6,4 ETH gegen das jetzt 18 wstETH umfassende Collateral
6. Stake → 6,4 wstETH
7. Hinterlege diese als Collateral

**Runde 3:**
8. Borge 5,1 ETH, stake, hinterlegte als Collateral
9. Und so weiter...

Nach 3–5 Runden hat der Nutzer:
- **Ursprüngliches Kapital:** 10 ETH
- **Total Collateral:** ~35–40 wstETH
- **Total Borrow:** ~25–30 ETH Schuld

**Effektiver Leverage:** 3,5–4x auf das ursprüngliche ETH

**Warum lohnt sich das? Die Rendite-Mathematik**

Angenommen:
- wstETH-Staking-Rendite: 3,5% APR
- ETH-Borrow-Zins auf Aave: 2,5% APR (E-Mode für korrelierte Assets)

**Ohne Loop:**
- 10 wstETH × 3,5% = 0,35 ETH Rendite pro Jahr
- Netto-Rendite auf Kapital: 3,5%

**Mit 3,5x Loop:**
- 35 wstETH × 3,5% Staking = 1,225 ETH Brutto-Rendite
- 25 ETH × 2,5% Borrow-Zins = 0,625 ETH Kosten
- Netto-Rendite: 0,6 ETH = **6% auf 10 ETH ursprüngliches Kapital**

**Der Leverage hat die Netto-Rendite von 3,5% auf 6% fast verdoppelt.**

**Warum funktioniert das?** Weil die Staking-Rendite höher ist als die Borrow-Kosten. Der Spread zwischen beiden wird gehebelt. Das ist die **Carry-Trade-Mechanik** — bekannt aus traditionellem Finanzwesen (z.B. in Japanese-Yen-Carry-Trades).

**Der Unterschied zu einfachem Borrowing**

In Modul 7 haben wir Borrowing als "Kapital-Effizienz ohne Verkauf" behandelt — z.B. ETH als Sicherheit und USDC geliehen für andere Zwecke. Das ist kein Leverage-Loop.

Ein Leverage-Loop hat eine zusätzliche Eigenschaft: das geborgte Asset wird in **dasselbe Underlying-Asset** zurückgeführt. Das verstärkt die Exposition zum Basis-Asset und seinen Yield-Mechaniken — aber auch zu seinen Risiken.

**Die verschiedenen Loop-Typen**

**Typ 1: Staking-Loop (wstETH/ETH)**
- Underlying: ETH / Liquid Staking
- Wie oben beschrieben
- Benötigt: korrelierte Assets (Aave E-Mode)
- Netto-Rendite: 5–8%

**Typ 2: Restaking-Loop (weETH/ETH)**
- Underlying: ETH / Restaking
- Ähnlich zu Staking-Loop, aber mit LRT
- Zusätzlicher Yield aus AVS-Rewards
- Deutlich mehr Risiko-Schichten

**Typ 3: Stablecoin-Loop (sDAI/DAI oder USDC/USDT)**
- Underlying: Stablecoins
- Sehr niedrige Volatilität, entsprechend sehr hoher Leverage möglich
- Risiko: Depeg eines Stablecoins
- Netto-Rendite: marginal über Basis-Rate

**Typ 4: BTC-Loop (tBTC/WBTC oder cbBTC/WBTC)**
- Underlying: Bitcoin-Varianten
- Weniger etabliert als ETH-Loops
- Höheres Peg-Risiko zwischen BTC-Wrappings

**Typ 5: RWA-Loop (sDAI/USDS-Loop mit Sky Savings Rate)**
- Underlying: Real-World-Assets (US-Treasuries)
- Sehr niedriges Volatilitäts-Risiko
- Regulatorisches Risiko präsent

Für das 7–8%-Jahresziel ist **Typ 1 (wstETH-Loop)** der relevanteste — wir fokussieren in diesem Modul darauf.

**Was ein Loop strukturell bedeutet**

Ein Loop verändert deine Risiko-Position fundamental:

1. **Aus "Long ETH" wird "Extrem-Long ETH"** — bei 3,5x Leverage ist deine effektive ETH-Exposition 350% deines ursprünglichen Kapitals
2. **Du hast zusätzlich eine "Short ETH" Borrow-Position** — wenn ETH stark gegenüber dem Borrow-Asset steigt, steigt deine Schuld-Last
3. **Du bist Peg-Risiko ausgesetzt** — wenn wstETH im Verhältnis zu ETH depeggt (wie Juni 2022), wird dein Collateral-Wert unterbesichert relativ zur Schuld
4. **Du bist Zins-Risiko ausgesetzt** — wenn Borrow-Zinsen steigen, wird dein Carry-Trade unprofitabel

Das sind **vier zusätzliche Risiko-Ebenen** über einfaches Halten hinaus. Sie müssen alle gleichzeitig günstig sein, damit der Loop Sinn macht.

### Folien-Zusammenfassung

**[Slide 1] — Titel**
Was ein Leverage-Loop eigentlich ist

**[Slide 2] — Grundmechanik**
Collateral → Borrow → Kauf mehr Collateral → wiederholen
Effektive Position > Ursprungskapital

**[Slide 3] — wstETH-Loop Beispiel**
10 wstETH Start
→ nach 3-5 Runden ~35 wstETH Collateral, ~25 ETH Schuld
Leverage 3,5x

**[Slide 4] — Die Rendite-Mechanik**
Ohne Loop: 3,5% (Staking-Yield)
Mit 3,5x Loop: ~6% (Staking minus Borrow-Kosten × Leverage)
Carry-Trade gehebelt

**[Slide 5] — Unterschied zu Borrowing**
Borrowing: Kapital für anderen Zweck
Loop: Kapital zurück ins gleiche Underlying
Verstärkt Exposure und Risiken

**[Slide 6] — Loop-Typen**
1. Staking-Loop (wstETH/ETH) — Fokus
2. Restaking-Loop (weETH/ETH)
3. Stablecoin-Loop
4. BTC-Loop
5. RWA-Loop

**[Slide 7] — Die strukturelle Änderung**
Extrem-Long Underlying
+ Short Borrow-Asset
+ Peg-Risiko
+ Zins-Risiko
Vier zusätzliche Risiko-Ebenen

### Sprechertext

**[Slide 1]** Modul 10 behandelt Leverage-Loops — die mächtigste und riskanteste Yield-Strategie in DeFi. Durch wiederholtes Borgen gegen bestehende Sicherheiten verstärkt sich die Basis-Rendite. Aber Verluste werden genauso multipliziert. Diese erste Lektion erklärt, was ein Loop mechanisch wirklich ist.

**[Slide 2]** Die Grundmechanik. Du hinterlegst ein Asset als Sicherheit, borgst ein anderes, tauschst das geborgte Asset zurück in dasselbe Ursprungs-Asset, und hinterlegst es erneut. Das wiederholst du mehrere Runden. Das Ergebnis: deine effektive Position in dem Basis-Asset ist größer als dein ursprüngliches Kapital. Das ist Leverage.

**[Slide 3]** Ein konkretes Beispiel. Du startest mit 10 wstETH. Runde 1: hinterlegst 10 wstETH, borgst 8 ETH, stakest zu 8 wstETH, hinterlegst neu. Runde 2: borgst 6,4 ETH, stakest zu 6,4 wstETH. Runde 3: 5,1 ETH. Nach 3 bis 5 Runden hast du etwa 35 wstETH Collateral und 25 ETH Schuld. Effektiver Leverage: 3,5 fach.

**[Slide 4]** Warum das lohnt. Angenommen wstETH-Staking bringt 3,5 Prozent, ETH-Borrow-Kosten sind 2,5 Prozent. Ohne Loop: 3,5 Prozent auf 10 ETH ist 0,35 ETH pro Jahr. Mit 3,5-fachem Loop: 35 wstETH × 3,5 Prozent Staking gleich 1,225 ETH Brutto minus 25 ETH × 2,5 Prozent Borrow gleich 0,625 ETH Kosten, netto 0,6 ETH Rendite. Das sind 6 Prozent auf die ursprünglichen 10 ETH Kapital. Der Leverage hat die Netto-Rendite fast verdoppelt. Das ist Carry-Trade-Mechanik.

**[Slide 5]** Wichtiger Unterschied zu einfachem Borrowing. In Modul 7 haben wir Borrowing als Kapital-Effizienz ohne Verkauf behandelt — ETH als Sicherheit, USDC geliehen für andere Zwecke. Das ist kein Leverage-Loop. Ein Loop hat eine zusätzliche Eigenschaft: das geborgte Asset wird in dasselbe Underlying zurückgeführt. Das verstärkt die Exposition zum Basis-Asset und seinen Mechaniken — aber auch zu seinen Risiken.

**[Slide 6]** Fünf Loop-Typen existieren. Typ 1: Staking-Loop mit wstETH und ETH — unser Fokus für dieses Modul. Typ 2: Restaking-Loop mit weETH — zusätzliche AVS-Rewards, aber deutlich mehr Risiko. Typ 3: Stablecoin-Loop — niedrigere Volatilität, sehr hoher Leverage möglich, Depeg-Risiko. Typ 4: BTC-Loop mit verschiedenen BTC-Wrappings. Typ 5: RWA-Loop mit Sky Savings Rate. Für das 7 bis 8 Prozent Ziel ist Typ 1 am relevantesten.

**[Slide 7]** Die strukturelle Änderung durch einen Loop. Du bist nicht mehr nur Long im Underlying — du bist Extrem-Long. Bei 3,5-fachem Leverage ist deine effektive Exposure 350 Prozent deines Kapitals. Du hast zusätzlich eine implizite Short-Position auf das Borrow-Asset. Du bist Peg-Risiko ausgesetzt — wenn wstETH gegenüber ETH depeggt, bricht deine Balance. Du bist Zins-Risiko ausgesetzt — wenn Borrow-Zinsen steigen, wird der Carry unprofitabel. Vier zusätzliche Risiko-Ebenen, die alle gleichzeitig günstig sein müssen.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Kreislauf-Diagramm: Collateral → Borrow → Buy → Re-deposit, mit Wachstums-Indikator.

**[Slide 3]** Stufendiagramm der 3-5 Loop-Runden mit wstETH- und ETH-Mengen.

**[Slide 4]** Rendite-Vergleich: Ohne Loop vs. mit 3,5x Loop, visualisiert als Balken.

**[Slide 5]** Zwei Flussdiagramme nebeneinander: einfaches Borrowing vs. Loop.

**[Slide 6]** Fünf-Karten-Layout der Loop-Typen mit Risiko-Einstufung.

**[Slide 7]** Risiko-Pyramide der vier zusätzlichen Risiko-Ebenen.

### Übung

**Aufgabe: Loop-Grundmechanik nachvollziehen**

Nimm an: du startest mit 5 ETH, gestaked als 5 wstETH. Borrow-LTV ist 75% (konservativer als Max). Ignoriere Gas-Kosten für diese Übung.

Berechne:
1. Runde 1: Wie viel ETH kannst du borgen? Wie viel wstETH bekommst du nach Staking?
2. Runde 2: Wie viel zusätzlich?
3. Runde 3: Wie viel zusätzlich?
4. Nach 3 Runden: Gesamt-Collateral? Gesamt-Schuld? Effektiver Leverage?
5. Wie würde sich die Rechnung ändern, wenn du 80% LTV nutzt?

**Deliverable:** Tabelle mit Runden-für-Runden-Rechnung. Vergleich 75% vs. 80% LTV.

### Quiz

**Frage 1:** Ein Freund sagt: "Leverage-Loops sind eigentlich risikofrei, weil man sich nur mit sich selbst leverageed — das Collateral ist immer da." Was stimmt daran nicht?

<details>
<summary>Antwort anzeigen</summary>

Die Aussage ignoriert mehrere reale Risiken. Erstens: Peg-Risiko zwischen Collateral und Borrow-Asset. Bei einem wstETH/ETH-Loop setzt die Strategie voraus, dass 1 wstETH immer ~1 ETH wert ist (plus Rewards). Im Juni 2022 fiel stETH/ETH auf 0,94 — eine 6%-Abweichung, die bei hohem Leverage sofort zur Liquidation führen kann. Zweitens: Liquidations-Risiko durch Zinsakkumulation. Selbst ohne Preisveränderung wächst die Schuld durch Borrow-Zinsen. Bei 2,5% Borrow-Rate und 3,5% Staking-Rate ist der Netto-Carry positiv, aber klein. Wenn Borrow-Rates auf 5% springen (was bei Utilization-Spikes passiert), wird der Carry negativ, und die Position erodiert täglich. Drittens: Smart-Contract-Risiko kumuliert. Der Loop nutzt Aave (Lending), Lido (Staking) und DEXs (für Swaps). Ein Problem auf einer dieser Ebenen betrifft die ganze Position. Viertens: Netzwerk-Risiken in Krisen. In extremer Volatilität können Liquidatoren nicht schnell genug reagieren, Gas-Preise explodieren, und die Position kann stärker verlieren als bei einer normalen Liquidation. Die Aussage "nur mit sich selbst" ist eine fundamentale Fehlinterpretation — Leverage-Loops sind eine der risikoreichsten DeFi-Strategien.
</details>

**Frage 2:** Warum ist die Rendite-Mechanik eines Leverage-Loops ein Carry-Trade, und was lernt man daraus?

<details>
<summary>Antwort anzeigen</summary>

Ein Carry-Trade ist eine klassische Finanz-Strategie, bei der man ein niedrig-verzinstes Asset leiht und in ein höher-verzinstes Asset investiert. Der Gewinn ist der Spread zwischen beiden Zinsen. Historisch bekanntestes Beispiel: Yen-Carry-Trade (leihen in Japan bei 0,5%, anlegen in USD-Assets bei 5%+). Ein wstETH-Loop ist mathematisch identisch: Borrow ETH bei 2,5%, staken für 3,5% — der Spread von 1% ist der Carry. Gehebelt wird dieser Spread. Die Lehren aus Carry-Trades generell: Erstens, Carry-Trades funktionieren nur, solange der Spread positiv bleibt. Wenn sich Zinsen umkehren (Borrow-Rate > Yield-Rate), verliert die Strategie Geld. Zweitens, Carry-Trades sind anfällig für plötzliche Marktbewegungen. Yen-Carry-Trades wurden historisch bei plötzlichen Yen-Aufwertungen katastrophal abgewickelt. Drittens, Carry-Trades sind selbst-verstärkend in Krisen — wenn viele Nutzer dieselbe Carry-Position halten, lösen sich alle gleichzeitig auf, was den Markt weiter gegen sie bewegt. All das gilt auch für wstETH-Loops. In ruhigen Märkten funktionieren sie, in Krisen können sie kaskadieren. Das ist der Grund, warum konservative Nutzung nur einen Teil des Kapitals in solche Strategien stecken sollte — und immer mit Puffern für negative Carry-Phasen.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → Loop-Mechanik → Iteration-Beispiel → Leverage Multiple → Loop-Arten → Carry-Trade-Analogie → Einsatzfeld
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 9–11 Min.)
- `visual_plan.json` — Loop-Iteration-Diagramm, Leverage-Multiple-Berechnung, Loop-Typen-Matrix, Carry-Trade-Analogie-Grafik

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 10.2 — Leveraged Staking: Die wstETH-Loop-Strategie

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die Aave-V3-E-Mode-Mechanik für Staking-Loops nutzen
- Die praktischen Schritte eines wstETH-Loops durchführen
- Die wichtigsten Parameter (LTV, Loop-Anzahl, Rebalancing) bewusst setzen
- Das Zusammenspiel von wstETH-Yield, ETH-Borrow-Cost und LST-Peg als Rendite-Treiber analysieren
- Aave-E-Mode-Parameter (erhöhte LTV für korrelierte Asset-Paare) gegen die zusätzlichen Liquidations-Risiken abwägen
- Die Integration von Looping-Tools (DeFi Saver, Instadapp, Contango) in die Strategie situationsgerecht anwenden

### Erklärung

Der wstETH-Loop auf Aave V3 ist die meistgenutzte Leverage-Strategie in DeFi. Sie funktioniert, weil Aave V3 für hoch korrelierte Assets einen **Efficient Mode (E-Mode)** anbietet, der deutlich höhere LTVs erlaubt.

**Aave V3 E-Mode für ETH-Correlated**

In der ETH-Correlated-Kategorie sind folgende Assets zusammengefasst:
- WETH
- wstETH (Lido)
- rETH (Rocket Pool)
- weETH (EtherFi)
- osETH (Stakewise)
- sfrxETH (Frax)
- cbETH (Coinbase)
- Weitere

**E-Mode-Parameter:**
- **LTV (Loan-to-Value):** bis zu 93% für diese korrelierten Assets
- **Liquidation Threshold:** 95%
- **Liquidation Bonus:** niedriger als Standard (2-3%)

Das bedeutet: du kannst mit wstETH als Collateral bis zu 93% des Wertes als ETH borgen — ein extrem hoher Leverage-Faktor möglich.

**Aber Vorsicht:** "Möglich" heißt nicht "sinnvoll". Bei 93% LTV reicht eine stETH/ETH-Abweichung von 2% zur Liquidation. Konservative Loops nutzen 75-85% LTV, nicht das Maximum.

**Die mathematische Obergrenze des Leverage**

Theoretisch maximaler Leverage bei unendlich vielen Loop-Runden:

```
Max Leverage = 1 / (1 - LTV)
```

- Bei 93% LTV: 1 / 0,07 = 14,3x (theoretisch)
- Bei 85% LTV: 1 / 0,15 = 6,7x
- Bei 80% LTV: 1 / 0,20 = 5x
- Bei 75% LTV: 1 / 0,25 = 4x

In der Praxis werden die theoretischen Werte nie erreicht, weil:
- Jede Loop-Runde kostet Gas (auf Mainnet signifikant)
- Slippage beim Swap reduziert Effizienz
- Meist stoppen Nutzer nach 3-5 Runden (~90% des theoretischen Max)

**Die Schritt-für-Schritt-Anleitung**

**Vorbereitung:**
1. Wallet mit wstETH (oder ETH, das du zu wstETH staken willst)
2. Aave-App (app.aave.com) geöffnet, Ethereum Mainnet oder Layer-2
3. Gas-Budget für Mainnet: 50-200 USD je nach Netzwerk-Last (auf Layer-2s: ~1-5 USD)

**Schritt 1: E-Mode aktivieren**
1. Auf Aave: "Risk Details" / "E-Mode"
2. "ETH correlated" Kategorie auswählen und aktivieren
3. Damit gelten die erhöhten LTVs für ETH-Correlated-Assets

**Schritt 2: Initial-Collateral einzahlen**
1. "Supply" → wstETH
2. Collateral-Status aktivieren (muss für Loop gegeben sein)

**Schritt 3: Erste Borrow-Runde**
1. "Borrow" → WETH
2. Betrag: konservativer Ansatz wählen — z.B. 70-80% des theoretischen Max
3. Transaktion signieren

**Schritt 4: Staking**
1. WETH unwrappen zu ETH (oder direkt wrapped akzeptieren, je nach Staking-Service)
2. Via Lido (stake.lido.fi) oder direkt → bekomme wstETH
3. Alternative: Flash-Loan-basierte Zaps (z.B. über Instadapp, DeFiSaver) machen das in einer Transaktion

**Schritt 5: Wiederhole Schritte 2-4**
1. Neues wstETH als Collateral
2. Borge mehr WETH
3. Stake, rinse, repeat
4. Typisch nach 3-5 Runden stoppen

**Schritt 6: Endgültige Position verifizieren**
1. Health Factor prüfen
2. Aktuellen Leverage-Faktor ausrechnen
3. Liquidations-Preis notieren

**Zap-Services vs. manuelles Looping**

**Manuelles Looping:**
- Kontrolle über jeden Schritt
- Auf Mainnet teuer (5+ Transaktionen × Gas)
- Auf Layer-2 praktikabel

**Zap-Services (z.B. DeFiSaver, Contango, Instadapp Lite):**
- Ein-Klick-Lösung: gesamter Loop in einer Transaktion (Flash-Loan-basiert)
- Günstiger auf Mainnet (eine Transaktion mit etwas höherem Gas)
- Zusätzliche Service-Schicht = zusätzliches Smart-Contract-Risiko
- Typisch 0,1-0,5% einmalige Service-Gebühr

**Für konservative Nutzer auf Mainnet:** Zap-Services sind oft die pragmatische Wahl (Gas-Ersparnis überwiegt kleines Zusatz-Risiko).

**Die Aave-App-Loop-Feature (seit 2024)**

Aave hat ein eingebautes "Loop"-Feature in der App (auf einigen Chains verfügbar). Es vereinfacht das Looping:

1. Besuche die entsprechende Asset-Detail-Seite (z.B. wstETH)
2. Suche "Loop" oder "Leverage" Option
3. Wähle Ziel-Leverage
4. Eine Transaktion führt den gesamten Prozess aus

Das ist der einfachste Weg, aber die gleichen Risiken gelten — LTV, Liquidations-Risiko, Carry-Trade-Abhängigkeit.

**Konservative Richtwerte**

Für einen wstETH-ETH-Loop konservativ:
- **Ziel-Leverage:** 2x bis 3x (nicht Maximum)
- **Ziel-Health-Factor:** 1,8-2,2 (entspricht etwa 40-50% Puffer)
- **LTV-Nutzung:** 75-80% des maximalen E-Mode-LTV
- **Loop-Runden:** 3-4 (darüber hinaus diminishing returns)

**Erwartete Netto-Rendite** bei diesen Parametern:
- 2x Leverage: ~5-6% (vs. 3,5% ohne Loop)
- 3x Leverage: ~6-8%

Das erreicht das 7-8%-Ziel, aber mit erheblich höherem Risiko als ein einfaches wstETH-Halten. Ob sich die zusätzliche Rendite rechtfertigt, ist die Frage der nächsten Lektionen.

### Folien-Zusammenfassung

**[Slide 1] — Titel**
Leveraged Staking: Die wstETH-Loop-Strategie

**[Slide 2] — Aave V3 E-Mode**
ETH-Correlated Kategorie
LTV bis 93%, LT 95%
Niedriger Liquidation Bonus

**[Slide 3] — Mathematische Grenzen**
Max Leverage = 1/(1-LTV)
93% LTV → 14,3x theoretisch
85% LTV → 6,7x theoretisch
75% LTV → 4x theoretisch

**[Slide 4] — Schritt-für-Schritt**
1. E-Mode aktivieren
2. Collateral einzahlen
3. Borrow WETH
4. Stake zu wstETH
5. Wiederhole 2-4

**[Slide 5] — Zap-Services**
Ein-Klick-Lösung via Flash Loans
Spart Gas auf Mainnet
Zusätzliches Smart-Contract-Risiko

**[Slide 6] — Konservative Richtwerte**
Ziel: 2-3x Leverage (nicht Max)
HF 1,8-2,2
LTV-Nutzung: 75-80% des Max
3-4 Loop-Runden

**[Slide 7] — Erwartete Rendite**
2x Leverage: ~5-6%
3x Leverage: ~6-8%
Zielerreichung mit Zusatzrisiko

### Sprechertext

**[Slide 1]** Diese Lektion behandelt die praktische Umsetzung der wstETH-Loop-Strategie. Wir gehen Schritt für Schritt durch den Prozess, mit klaren konservativen Parametern.

**[Slide 2]** Aave V3 E-Mode ist der Schlüssel. In der ETH-Correlated-Kategorie sind WETH, wstETH, rETH, weETH und andere zusammengefasst. Der LTV geht bis 93 Prozent, Liquidation Threshold 95 Prozent. Niedriger Liquidation Bonus. Das ermöglicht extremen Leverage — technisch. Praktisch sollte man das Maximum nie ausnutzen.

**[Slide 3]** Die mathematische Obergrenze des Leverage ist 1 geteilt durch 1 minus LTV. Bei 93 Prozent LTV ergibt das 14,3-fachen Leverage theoretisch. Bei 85 Prozent 6,7-fachen, bei 75 Prozent 4-fachen. In der Praxis werden diese Werte nicht erreicht wegen Gas-Kosten, Slippage und weil Loop-Runden nach 3-5 Iterationen stoppen. Die realistische Obergrenze liegt bei etwa 90 Prozent des theoretischen Maximums.

**[Slide 4]** Die Schritt-für-Schritt-Anleitung. Erstens: E-Mode aktivieren auf Aave. Zweitens: wstETH als Collateral einzahlen, Collateral-Status aktivieren. Drittens: WETH borrowen — konservativer Ansatz bedeutet 70 bis 80 Prozent des theoretischen Max nutzen. Viertens: WETH zu ETH unwrappen und via Lido staken. Fünftens: neues wstETH als Collateral hinzufügen, nächste Runde. Nach 3 bis 5 Runden stoppen.

**[Slide 5]** Zap-Services wie DeFiSaver, Contango oder Instadapp Lite machen den ganzen Loop in einer Transaktion via Flash Loan. Spart Gas auf Mainnet, wo 5 separate Transaktionen 200 USD Gas kosten können. Zap-Transaktion kostet vielleicht 40 bis 80 USD. Nachteil: zusätzliche Smart-Contract-Ebene, kleine Service-Gebühr. Für Mainnet meist die pragmatische Wahl.

**[Slide 6]** Konservative Richtwerte für einen wstETH-Loop. Ziel-Leverage 2 bis 3-fach, nicht das Maximum. Health Factor 1,8 bis 2,2 — das entspricht etwa 40 bis 50 Prozent Puffer zur Liquidations-Grenze. LTV-Nutzung 75 bis 80 Prozent des maximalen E-Mode-LTV. Drei bis vier Loop-Runden, darüber hinaus diminishing returns.

**[Slide 7]** Erwartete Netto-Rendite bei diesen Parametern. 2-facher Leverage: etwa 5 bis 6 Prozent, vs. 3,5 Prozent ohne Loop. 3-facher Leverage: 6 bis 8 Prozent. Das erreicht das 7 bis 8 Prozent Ziel, aber mit erheblich höherem Risiko als einfaches wstETH-Halten. Ob sich die zusätzliche Rendite rechtfertigt, ist die Frage der nächsten Lektionen.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** **SCREENSHOT SUGGESTION:** Aave V3 E-Mode-Interface mit ETH-Correlated-Kategorie.

**[Slide 3]** Tabelle mit LTV-Werten und entsprechenden Max-Leverage-Zahlen.

**[Slide 4]** Flussdiagramm der 5 Loop-Schritte mit Icons.

**[Slide 5]** **SCREENSHOT SUGGESTION:** DeFiSaver Loop-Interface oder Contango Leverage-Interface.

**[Slide 6]** Konservative-Parameter-Checkliste als Zahlen-Visualisierung.

**[Slide 7]** Rendite-Vergleich: 1x / 2x / 3x Leverage als Balkendiagramm.

### Übung

**Aufgabe: Loop-Berechnung für realistisches Szenario**

Stell dir vor, du hast 10 wstETH (aktueller Wert 30.000 USD bei ETH = 3.000). Du willst einen konservativen 2,5x-Leverage-Loop auf Aave V3 E-Mode machen.

Berechne (ignoriere Gas für diese Übung):
1. Ziel-Gesamt-Collateral: Wie viel wstETH brauchst du für 2,5x Leverage?
2. Erforderliche Schuld: Wie viel WETH muss geborgt werden?
3. LTV-Verhältnis: Wie hoch ist der LTV bei diesen Zahlen?
4. Health Factor: Bei LT 95% für E-Mode, wie hoch ist der HF?
5. Liquidations-Preis: Bei welchem wstETH/ETH-Ratio würde liquidiert?

**Deliverable:** Berechnung mit allen Zahlen + Einschätzung (3-5 Sätze): Ist dieser 2,5x-Loop konservativ genug für deine persönliche Risiko-Toleranz?

### Quiz

**Frage 1:** Warum ist das Aave V3 E-Mode-Maximum (93% LTV) praktisch nie konservativ nutzbar?

<details>
<summary>Antwort anzeigen</summary>

Zwei Hauptgründe. Erstens: Puffer zur Liquidation. Bei 93% LTV ist der Health Factor nur 95/93 = 1,02 — minimal über 1. Eine 2-prozentige Abweichung im wstETH/ETH-Ratio bringt die Position sofort zur Liquidation. Im Juni 2022 gab es eine 6-prozentige Abweichung. Zweitens: normale Volatilität. Selbst in Normalsituationen bewegt sich das wstETH/ETH-Ratio um 0,1-0,3% täglich durch Markt-Mikrostrukturen. Über Wochen kann sich das auf 1-2% summieren. Eine 93%-LTV-Position kann durch normale Marktbewegung ohne Krise liquidiert werden. Drittens: Zins-Akkumulation. Borrow-Zinsen wachsen die Schuld langsam. Bei 93% LTV ist kein Puffer für diese Akkumulation. Viertens: Oracle-Latenz. Bei plötzlichen Bewegungen aktualisiert das Oracle mit Verzögerung — bei 93% LTV kann diese Verzögerung den Unterschied zwischen Rettung und Liquidation bedeuten. Konservative Regel: nie mehr als 80-85% des theoretischen Max-LTV nutzen. Der Rest ist Überlebens-Puffer für die unvorhergesehenen Bewegungen, die in jeder Markt-Phase auftreten.
</details>

**Frage 2:** Warum sind Zap-Services wie DeFiSaver oder Contango für Mainnet-Loops oft die pragmatische Wahl, obwohl sie eine zusätzliche Smart-Contract-Ebene hinzufügen?

<details>
<summary>Antwort anzeigen</summary>

Reine Kosten-Nutzen-Abwägung. Manueller Loop auf Mainnet erfordert 5-10 separate Transaktionen: Collateral deposit, Borrow, Swap/Unwrap, Staking, Re-deposit, Borrow, Swap, Staking, Re-deposit, usw. Bei hohen Gas-Preisen kann das 200-400 USD kosten. Zap-Services machen den ganzen Loop in einer einzigen Transaktion via Flash Loan — das sind vielleicht 40-100 USD Gas plus 0,1-0,5% Service-Gebühr. Für eine 50.000-USD-Position ist die Gesamtersparnis oft 100+ USD. Das zusätzliche Smart-Contract-Risiko ist real, aber überschaubar: die großen Zap-Services sind mehrfach auditiert, haben lange Track-Record, und ihre Code-Base ist öffentlich. Die Wahrscheinlichkeit eines Zap-Service-Hacks während einer einzelnen Transaktion ist sehr gering. Konservative Wertung: ja, zusätzliches Risiko, aber klar gerechtfertigt durch Gas-Ersparnis. Für Layer-2 (Arbitrum, Base, Optimism) ist die Rechnung anders — dort sind einzelne Transaktionen so günstig (1-5 USD), dass manuelles Looping oft besser ist. Die Wahl hängt von der Chain ab, auf der die Position läuft.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → wstETH-Loop-Konzept → Aave-E-Mode → Loop-Schritte → Parameter-Wahl → Zap-Services → Manueller vs. Zap
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 10–12 Min.)
- `visual_plan.json` — wstETH-Loop-Flussdiagramm, Aave-E-Mode-Interface-Screenshot, Parameter-Setting-Tabelle, DeFi-Saver-UI, Gas-Kosten-Vergleich

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 10.3 — Die Leverage-Mathematik und Wachstumsgrenzen

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die exakte Rendite eines Loops für verschiedene Parameter berechnen
- Die Wirkung von Zins-Veränderungen auf den Netto-Carry verstehen
- Break-Even-Punkte für unterschiedliche Szenarien identifizieren
- Safe Leverage Limits quantitativ definieren: maximale Iterations-Anzahl, Mindest-HF-Puffer, maximaler Leverage Multiple
- Die Geometrische-Reihe-Mathematik eines Loops anwenden, um die Grenze des effektiven Leverages zu berechnen
- Die Empfindlichkeit des Netto-Carry gegenüber Borrow-Rate-Änderungen (z.B. +2% Borrow-Rate) numerisch bewerten

### Erklärung

Leverage-Loops haben eine präzise mathematische Struktur. Diese Lektion gibt dir die Werkzeuge, um jeden Loop exakt zu analysieren — und zu erkennen, wann er sich lohnt, wann nicht.

**Die Grundformel für Netto-Rendite**

Für einen Loop gilt:

```
Netto-Rendite auf Ursprungskapital = Yield × Leverage - Borrow-Cost × (Leverage - 1)
```

**Erklärung:**
- **Yield** ist der Staking-Yield auf das Collateral (z.B. 3,5% für wstETH)
- **Leverage** ist der effektive Leverage-Faktor (z.B. 3x)
- **Borrow-Cost** ist der Borrow-Zinssatz (z.B. 2,5% für WETH in E-Mode)
- **(Leverage - 1)** ist der Anteil des Kapitals, der geborgt wurde

**Konkretes Beispiel:**
- Yield = 3,5%
- Leverage = 3x
- Borrow-Cost = 2,5%

```
Netto = 3,5% × 3 - 2,5% × 2 = 10,5% - 5% = 5,5%
```

**Interpretation:** Ein 3x-wstETH-Loop bringt 5,5% Netto-Rendite statt der 3,5% beim simplen Halten.

**Die Sensitivität auf Zinsänderungen**

Was passiert, wenn Borrow-Zinsen steigen? Angenommen, die ETH-Borrow-Rate steigt von 2,5% auf 3,5%:

```
Neu Netto = 3,5% × 3 - 3,5% × 2 = 10,5% - 7% = 3,5%
```

Bei gleichem Staking-Yield und identischen Borrow- und Yield-Raten ist der Leverage-Vorteil komplett verschwunden. Die Netto-Rendite entspricht der unverhebelten Strategie — aber mit deutlich mehr Risiko.

**Weiter gedacht:** Bei Borrow-Rate 4% und Yield 3,5%:

```
Netto = 3,5% × 3 - 4% × 2 = 10,5% - 8% = 2,5%
```

Jetzt bringt der Loop **weniger** als einfaches Halten. Der Leverage arbeitet gegen dich — negativ Carry.

**Break-Even-Analyse**

Der Loop ist break-even (gleiche Rendite wie einfaches Halten), wenn:

```
Yield × Leverage - Borrow-Cost × (Leverage - 1) = Yield
```

Umgeformt:

```
Borrow-Cost = Yield
```

**Das heißt:** Solange Borrow-Rate = Yield-Rate, bringt der Loop identische Rendite zum Halten (aber mit mehr Risiko). Damit der Loop lohnt, muss der Spread **Yield - Borrow-Rate > 0** sein, und je größer der Spread, desto profitabler der Loop.

**Der kritische Spread-Punkt**

Die historische Spread-Entwicklung ETH-Staking vs. ETH-Borrow auf Aave:
- **Normal-Betrieb:** Spread 0,5-1,5% (Loop profitabel)
- **Bull-Markt mit hoher Leverage-Nachfrage:** Spread fällt auf 0-0,5% (Loop marginal)
- **Bull-Markt mit extremer Nachfrage:** Spread kann negativ werden (Loop unprofitabel)

In extremen Bull-Markets steigen ETH-Borrow-Rates stark, weil viele Leveraged-Staking-Strategien gleichzeitig aktiv sind. Das kann den Carry zerstören.

**Beispiel: Der Spread-Kollaps 2023**

In bestimmten Phasen 2023 stieg die ETH-Borrow-Rate auf Aave auf 4-5%, während stETH-Staking-Yield bei 3,5-4% lag. Der Carry war negativ — Leveraged-Staking-Positionen verloren Geld pro Tag.

**Die Lektion:** Der Carry-Spread ist keine feste Größe. Er kann sich schnell ändern, und Loops müssen aktiv überwacht werden.

**Leverage und Ausfall-Wahrscheinlichkeit**

Mit höherem Leverage steigt die Liquidations-Wahrscheinlichkeit überproportional.

**Beispiel:** Angenommen, wstETH/ETH-Ratio hat historisch eine Tages-Standardabweichung von 0,1% (sehr niedrig, weil korreliert).

- Bei LTV 75% (Puffer 20 Prozentpunkte zur LT 95%): Liquidation erfordert 20% Abweichung. Praktisch nie.
- Bei LTV 85% (Puffer 10 Prozentpunkte): Liquidation erfordert 10% Abweichung. In extremen Krisen möglich (siehe Juni 2022 mit 6%).
- Bei LTV 93% (Puffer 2 Prozentpunkte): Liquidation erfordert 2% Abweichung. Bei jedem stärkeren Markt-Event wahrscheinlich.

**Die Leverage-Ratio-Kurve**

Die Ausfall-Wahrscheinlichkeit wächst nicht linear mit dem Leverage, sondern exponentiell. Das bedeutet: von 2x auf 3x zu gehen verdoppelt nicht das Risiko, sondern verdreifacht oder verfünffacht es (abhängig von der Asset-Volatilität).

**Tabellarische Übersicht für wstETH-Loops:**

| Leverage | LTV | HF | Liquidations-Puffer | Netto-Rendite* | Ausfallrate** |
|---|---|---|---|---|---|
| 1x (ohne Loop) | 0% | ∞ | ∞ | 3,5% | 0% |
| 1,5x | 50% | 1,9 | ~45% | 4% | sehr niedrig |
| 2x | 66% | 1,44 | ~30% | 4,5% | niedrig |
| 2,5x | 73% | 1,3 | ~22% | 5% | moderat |
| 3x | 79% | 1,2 | ~16% | 5,5% | erhöht |
| 4x | 84% | 1,13 | ~11% | 6,5% | hoch |
| 5x | 88% | 1,08 | ~7% | 7% | sehr hoch |

*Annahme: 3,5% Yield, 2,5% Borrow-Cost
**Subjektive Einschätzung bei normaler Marktvolatilität

**Die zentrale Erkenntnis**

Von 2x auf 4x Leverage steigt die Netto-Rendite von 4,5% auf 6,5% (2 Prozentpunkte). Aber das Liquidations-Risiko wird deutlich höher. Die Frage ist: sind die zusätzlichen 2 Prozentpunkte Rendite die stark erhöhte Liquidations-Wahrscheinlichkeit wert?

Für das 7-8%-Jahresziel dieses Kurses: meist **nein**. Der konservative Sweet Spot liegt bei 2x-2,5x Leverage mit 4,5-5% Netto-Rendite. Das kombiniert mit anderen Portfolio-Teilen (Stablecoin-Supply, LP-Strategien) erreicht das 7-8%-Ziel ohne extrem gehebelte Einzelpositionen.

**Gas-Kosten und Break-Even**

Gas-Kosten spielen besonders bei kleineren Positionen eine Rolle:
- Mainnet-Zap: 50-150 USD Gas
- Mainnet manuell: 200-400 USD Gas
- Layer-2: 5-20 USD Gas

Bei einer 10.000-USD-Position und 5% Netto-Rendite sind das 500 USD jährlich. 200 USD Gas sind 40% der Jahres-Rendite — signifikant. Bei 100.000 USD Position sind 200 USD Gas nur 4% — vernachlässigbar.

**Daumenregel für konservative Loops:**
- Mindestens 50.000 USD Position auf Mainnet
- Mindestens 5.000 USD Position auf Layer-2
- Geplant für mindestens 6-12 Monate Halte-Dauer, sonst Gas-ineffizient

### Folien-Zusammenfassung

**[Slide 1] — Titel**
Die Leverage-Mathematik und Wachstumsgrenzen

**[Slide 2] — Die Grundformel**
Netto = Yield × Leverage - Borrow-Cost × (Leverage - 1)
3,5% × 3 - 2,5% × 2 = 5,5%

**[Slide 3] — Zins-Sensitivität**
Borrow steigt auf 3,5% → Netto = 3,5% (Leverage-Vorteil weg)
Borrow 4% → Netto 2,5% (negativer Carry)

**[Slide 4] — Break-Even**
Loop lohnt nur bei Borrow < Yield
Historisch: Spread 0,5-1,5% normal, kann negativ werden

**[Slide 5] — Leverage vs. Liquidations-Puffer**
2x → 30% Puffer
3x → 16% Puffer
4x → 11% Puffer
5x → 7% Puffer

**[Slide 6] — Die zentrale Erkenntnis**
Rendite wächst linear mit Leverage
Risiko wächst überproportional
2x-2,5x ist oft der konservative Sweet Spot

**[Slide 7] — Gas-Effizienz**
Mainnet: Mindest 50.000 USD Position
Layer-2: Mindest 5.000 USD
Min 6-12 Monate Halte-Dauer

### Sprechertext

**[Slide 1]** Diese Lektion gibt dir die Mathematik. Jeder Loop lässt sich exakt analysieren, und die Rechnung zeigt klar, wann sich ein Loop lohnt und wann nicht.

**[Slide 2]** Die Grundformel ist simpel. Netto-Rendite gleich Yield mal Leverage minus Borrow-Cost mal Leverage-minus-1. Konkret: bei 3,5 Prozent Yield, 3-fach Leverage, 2,5 Prozent Borrow-Cost: 3,5 mal 3 ist 10,5 Prozent Brutto. Minus 2,5 mal 2 gleich 5 Prozent Borrow-Kosten. Ergibt 5,5 Prozent Netto. Der Leverage verstärkt den Spread zwischen Yield und Borrow.

**[Slide 3]** Die Sensitivität auf Zinsänderungen ist dramatisch. Wenn ETH-Borrow-Rate auf 3,5 Prozent steigt bei gleichem 3,5 Prozent Yield: die Netto-Rendite fällt auf 3,5 Prozent — identisch zum einfachen Halten, aber mit mehr Risiko. Bei 4 Prozent Borrow: Netto 2,5 Prozent, weniger als einfaches Halten. Negativ Carry — der Loop arbeitet gegen dich.

**[Slide 4]** Break-Even. Der Loop ist identisch zum Halten, wenn Borrow gleich Yield ist. Profitabel nur bei Borrow kleiner als Yield. Historisch ist der Spread 0,5 bis 1,5 Prozent normal. In extremen Bull-Markets kann er auf null oder negativ fallen, weil viele Leveraged-Staking-Strategien gleichzeitig aktiv sind und ETH-Borrow-Rates nach oben treiben.

**[Slide 5]** Leverage versus Liquidations-Puffer. Bei 2-fach Leverage hast du etwa 30 Prozent Puffer bis Liquidation. Bei 3-fach 16 Prozent. Bei 4-fach 11 Prozent. Bei 5-fach nur noch 7 Prozent. Das Liquidations-Risiko wächst exponentiell mit dem Leverage, nicht linear.

**[Slide 6]** Die zentrale Erkenntnis dieser Lektion. Die Rendite wächst linear mit Leverage — plus 0,5 Prozentpunkte pro Leverage-Stufe bei unseren Beispielzahlen. Aber das Risiko wächst überproportional. Von 2 auf 4-fach Leverage sind 2 Prozentpunkte mehr Rendite, aber das Liquidations-Risiko vervielfacht sich. Für das 7 bis 8 Prozent Jahresziel ist 2 bis 2,5-fach Leverage oft der konservative Sweet Spot, kombiniert mit anderen Portfolio-Teilen.

**[Slide 7]** Gas-Kosten beeinflussen die Entscheidung stark. Mainnet-Loop kostet 50 bis 400 Dollar Gas. Bei einer 10.000-Dollar-Position und 500 Dollar Jahres-Rendite frisst das bis zu 40 Prozent der Rendite. Daumenregel: auf Mainnet mindestens 50.000 USD Position. Auf Layer-2 mindestens 5.000 USD. Und geplant für mindestens 6 bis 12 Monate Halte-Dauer, sonst ist der Loop Gas-ineffizient.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Formel-Darstellung mit konkretem Zahlen-Einsatz.

**[Slide 3]** Graph: Borrow-Rate auf x-Achse, Netto-Rendite auf y-Achse. Break-Even-Punkt markiert.

**[Slide 4]** Historische Spread-Entwicklung ETH-Yield vs. Borrow über 12 Monate.

**[Slide 5]** Tabelle der Leverage-Stufen mit Puffer-Visualisierung.

**[Slide 6]** Doppel-Diagramm: Rendite-Kurve linear, Risiko-Kurve exponentiell.

**[Slide 7]** Gas-Kosten-Break-Even-Kalkulation visualisiert.

### Übung

**Aufgabe: Umfassende Loop-Analyse**

Du planst einen wstETH-Loop mit folgenden Parametern:
- Kapital: 25.000 USD
- Yield: 3,5% APR
- Borrow-Cost: 2,5% APR
- Plan: 2,5x Leverage
- Chain: Arbitrum (Layer-2, Gas vernachlässigbar)
- Halte-Dauer: 12 Monate

Berechne:
1. Netto-Rendite nach Formel
2. Absoluter Jahres-Gewinn in USD
3. Wie sieht die Rendite aus, wenn Borrow-Rate nach 6 Monaten auf 4% steigt?
4. Break-Even-Borrow-Rate, ab der der Loop gegenüber einfachem Halten verliert
5. Bei welchem wstETH/ETH-Ratio-Abfall würdest du liquidiert (Annahme: LT 95%)?

**Deliverable:** Vollständige Berechnung + Einschätzung (5-7 Sätze): Ist dieser Loop für deine Risiko-Toleranz sinnvoll?

### Quiz

**Frage 1:** Ein Anleger setzt einen 4x wstETH-Loop mit 5,5% Yield und 4% Borrow-Rate auf. Warum könnte diese Position trotz des 1,5-Prozentpunkte-Spreads strukturell problematisch sein?

<details>
<summary>Antwort anzeigen</summary>

Die scheinbar attraktive Rendite-Rechnung (Netto = 5,5% × 4 - 4% × 3 = 22% - 12% = 10%) ignoriert mehrere Risiken, die bei 4x Leverage besonders relevant sind. Erstens: minimaler Liquidations-Puffer. Bei 4x Leverage ist der HF typisch bei 1,1-1,15, was nur etwa 10% Preis-Puffer bedeutet. Eine normale Markt-Volatilität (20-30% Preis-Bewegungen sind in Krypto normal über kurze Zeiträume) kann zur Liquidation führen. Zweitens: Zins-Empfindlichkeit. Bei 4x Leverage wird jeder Prozent-Anstieg der Borrow-Rate mit 3 Prozent Leverage verstärkt. Wenn die Borrow-Rate von 4% auf 5% steigt, fällt die Netto-Rendite von 10% auf 7%. Wenn sie auf 6% steigt: 4%. Wenn sie auf 8% steigt (was in Bull-Markets vorkommt): -2%. Drittens: Peg-Risiko. Jede stETH/ETH-Abweichung über 5% triggert wahrscheinlich Liquidation bei 4x. Juni 2022 zeigte 6% Abweichung — solche Ereignisse sind real. Viertens: Gas-Kosten für Rebalancing. In Stress-Situationen, wenn du schnell deleveragen musst, können Gas-Preise explodieren. Bei 4x ist jede Transaktion besonders teuer wegen vieler Sub-Operationen. Fünftens: psychologischer Stress. 4x Leverage heißt, dass dein Portfolio bei einem 10%-ETH-Crash effektiv -40% zeigen kann. Viele Nutzer treffen unter solchem Stress panische Entscheidungen. Konservativer Rat: 4x ist für Profis mit klaren Regeln und großen Portfolios. Für typische Retail-Nutzer ist 2-2,5x deutlich robuster, und die Rendite-Differenz (10% vs 5%) rechtfertigt selten das zusätzliche Risiko.
</details>

**Frage 2:** Warum ist die Break-Even-Regel "Borrow-Rate = Yield" eine wichtige mentale Markierung für Loop-Halter?

<details>
<summary>Antwort anzeigen</summary>

Weil sie die klare Schwelle zwischen profitablen und unprofitablen Positionen definiert. Die Regel ist elegant simpel: der Loop bringt nur dann einen Vorteil gegenüber einfachem Halten, wenn die Yield-Rate über der Borrow-Rate liegt. Je größer der Spread, desto mehr wird durch den Leverage verstärkt. Wenn Borrow-Rate gleich Yield: der Leverage bringt identische Rendite wie Halten, aber mit allen zusätzlichen Risiken — schlechter Deal. Wenn Borrow-Rate über Yield: der Leverage bringt weniger Rendite als Halten — negativer Carry, und die Position verliert täglich. Für Loop-Halter bedeutet das: das Verhältnis Yield/Borrow muss kontinuierlich überwacht werden. Wenn der Spread auf nahe null fällt, ist es Zeit für Deleveraging. Zins-Rate in DeFi sind volatil — was heute profitabel ist, kann in Wochen unprofitabel werden. Besonders in Bull-Markets, wenn Leveraged-Staking-Strategien populär werden, steigen ETH-Borrow-Rates, während Staking-Yields stabil bleiben. Das kann den Carry komprimieren oder sogar invertieren. Konservative Regel: wenn Spread unter 0,5% fällt, aktiv über Deleveraging nachdenken. Wenn Spread negativ: sofort deleveragen. Die Break-Even-Regel ist der primäre Gesundheitscheck einer Loop-Position, wichtiger als tägliche Preis-Bewegungen.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → Rendite-Formel → Leverage-Multiple-Mathematik → Break-Even-Punkte → Safe Leverage Limits → Zins-Sensitivität → Wachstumsgrenzen
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 10–12 Min.)
- `visual_plan.json` — Rendite-Formel-Grafik, Leverage-Multiple-Tabelle pro LTV, Break-Even-Diagramm, Safe-Limits-Empfehlung, Sensitivitäts-Analyse-Chart

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 10.4 — Die spezifischen Risiken von Loops

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die fünf Haupt-Risiken von Leverage-Loops systematisch benennen
- Historische Loop-Katastrophen als Lehrmaterial analysieren
- Risiko-Schutzmechanismen in die eigene Strategie integrieren
- Ein Loop-Risk-Diagramm zeichnen, das die Abhängigkeiten zwischen LST-Depeg, Zins-Spike, Oracle-Failure, Smart-Contract-Bug und Liquidations-Kaskade darstellt
- Die Risiko-Verstärkung durch Leverage im Vergleich zur ungehebelten Position quantifizieren (z.B. 3x Leverage → 3x Preis-Sensitivität)
- Mitigations-Matrix (Puffer, Monitoring, Diversifikation, Exit-Trigger) für eine konkrete Loop-Position aufsetzen

### Erklärung

Leverage-Loops tragen nicht nur die üblichen DeFi-Risiken in verstärkter Form — sie haben auch eigene, strategie-spezifische Risiken. Diese Lektion systematisiert sie.

**Risiko 1: Peg-Depeg zwischen Collateral und Borrow-Asset**

Das ist das größte Risiko bei Liquid-Staking-Loops. Der Loop setzt voraus, dass das Collateral (wstETH) im Wesentlichen 1:1 zum Borrow-Asset (ETH) handelt. Wenn das Verhältnis bricht — wie Juni 2022 bei -6% Depeg — wird die Position unterbesichert.

**Mechanik:** Bei 3x Leverage und 80% Collateral-Nutzung reicht eine 6% Depeg, um die Position in Liquidations-Zone zu bringen. Der Schaden: Liquidations-Penalty (2-5% auf das liquidierte Collateral) plus der Depeg-Verlust selbst, multipliziert mit dem Leverage.

**Konkretes Beispiel:** 30.000 USD wstETH-Collateral, 3x-Leverage. stETH/ETH fällt um 6%. Effektiver Portfolio-Verlust:
- Direkt: 3x × 6% = 18% auf Ursprungs-Kapital = 5.400 USD
- Plus Liquidations-Penalty (wenn triggert): ~3% = 900 USD
- **Gesamt: ~6.300 USD auf 10.000 USD Einsatz = 63% Verlust**

Das ist nur der worst-case einer moderaten Depeg. Bei extremerem Depeg (wie hypothetisch 10%) wäre der Verlust noch höher.

**Mitigation:**
- Leverage begrenzen auf 2-2,5x, wo 6% Depeg nicht zur Liquidation führt
- Diversifikation über mehrere LSTs (wstETH + rETH) — nicht alle depeggen gleichzeitig korreliert
- Alert bei Abweichung > 1% einrichten

**Risiko 2: Zinssatz-Sprünge**

Borrow-Rates in DeFi sind volatil. In Normalsituationen ist ETH-Borrow auf Aave bei 2-3%. In Stress-Szenarien kann er auf 5-10% springen innerhalb von Stunden.

**Was triggert Zinssatz-Sprünge:**
- **Utilization-Spikes** (Modul 6): wenn viele gleichzeitig ETH borgen, wird der Pool ausgelastet, und Zinsen eskalieren über den Kink-Point
- **Massive Leveraged-Staking-Nachfrage** in Bull-Markets
- **Protokoll-spezifische Events** (z.B. Reward-Programme, die Borrowing incentivieren)

**Schaden am Loop:**
Wenn die Borrow-Rate über den Yield springt, wird die Position **negativ Carry** — sie verliert täglich Geld. Der Halter muss entscheiden: deleveragen (kostet Gas und Slippage) oder aussitzen (hoffen, dass Raten wieder fallen).

**Historisches Beispiel:** In bestimmten Phasen 2023 stieg ETH-Borrow auf Aave V3 temporär auf 4-5%, während Staking-Yields bei 3,5-4% lagen. Viele Leveraged-Staking-Positionen verloren über Wochen Geld, bis entweder Raten normalisierten oder deleveraged wurde.

**Mitigation:**
- Yield-Borrow-Spread als primäre Metrik monitoren
- Deleverage-Trigger vorher definieren (z.B. wenn Spread < 0,5%)
- Kapital-Reserve halten, um Deleveraging ohne weitere Borrows zu finanzieren

**Risiko 3: Liquidations-Kaskaden**

Loop-Positionen sind systemisch vernetzt. Wenn viele Loops gleichzeitig in Stress geraten, können sich Liquidationen gegenseitig verstärken.

**Kaskade-Mechanik:**
1. Initial-Event: stETH/ETH fällt um 3%
2. Loops mit 90%+ LTV werden liquidiert — ihr stETH wird verkauft
3. Verkaufs-Druck auf stETH drückt das Ratio weiter auf -4%
4. Loops mit 85%+ LTV werden liquidiert — mehr Verkaufs-Druck
5. -5%, -6%, -7% — Kaskade

Das Ereignis im Juni 2022 war genau so. Die initiale 3AC-Panic führte zu einer sich selbst verstärkenden Liquidations-Welle.

**Mitigation:**
- Deutlich unter systemischem Schwellenwert bleiben (HF 2+)
- In Stress-Phasen präventiv deleveragen, bevor die Kaskade beginnt
- Monitoring der Gesamt-Leverage-Situation (z.B. via DeFiLlama Leverage-Metriken)

**Risiko 4: Smart-Contract-Kaskade**

Ein Loop nutzt mehrere Protokolle: Aave (Lending), Lido (Staking), DEX (für Swaps/Unwrapping), eventuell Zap-Service. Ein Problem auf jedem dieser Layer trifft die gesamte Position.

**Wahrscheinlichkeits-Kombination:**
- Aave-Risiko: sehr niedrig (etabliert, auditiert, Safety Module)
- Lido-Risiko: niedrig (etabliert, aber stETH-spezifische Risiken)
- DEX-Risiko: niedrig (Uniswap, Curve - etabliert)
- Zap-Service-Risiko: moderat (jünger, weniger getestet)

Die Gesamt-Ausfallwahrscheinlichkeit ist die Summe (vereinfacht). Jede zusätzliche Protokoll-Ebene erhöht das aggregierte Risiko.

**Mitigation:**
- Nur etablierte Protokolle in jedem Layer nutzen
- Aave V3 (nicht V2 oder Forks) — meistgetestete Version
- Zap-Services nur bei bewährten Anbietern mit Audits

**Risiko 5: Withdraw-Queue in Krisen**

Nach dem Shanghai-Upgrade können wstETH-Halter direkt ETH zurückziehen. Aber die Queue ist begrenzt.

**Szenario:** Stress-Event führt zu massen-Deleveraging. Viele wollen wstETH zu ETH tauschen. Zwei Wege:
- **DEX-Swap** (Curve/Uniswap): schnell, aber Slippage kann extrem hoch sein
- **Lido Withdrawal**: direkter Umtausch, aber Queue-Zeit 1-7 Tage (in Normalsituationen), bei Stress möglicherweise länger

**Mitigation:**
- Klarheit über Exit-Pfad vor Position-Aufbau
- Kapital-Reserve für Gas-Intensives schnelles Deleveraging
- Nicht die komplette Position zur gleichen Zeit auflösen (staffeln)

**Die Gesamt-Risiko-Bewertung**

Eine 3x wstETH-Loop-Position trägt:
- Normales Ethereum-Staking-Risiko (1x verstärkt)
- Aave-Smart-Contract-Risiko (neu)
- Lido-Smart-Contract-Risiko (neu)
- DEX-Smart-Contract-Risiko (neu)
- wstETH/ETH-Peg-Risiko (verstärkt durch Leverage)
- Zins-Volatilitäts-Risiko (neu, hoch)
- Liquidations-Kaskaden-Risiko (systemisch)
- Withdraw-Queue-Risiko (bei Krise)

**Gegenüber einfachem wstETH-Halten:** 7 zusätzliche Risiko-Ebenen.

**Rendite-Kompensation:** ~2 Prozentpunkte zusätzliche Rendite (3,5% → 5,5%).

**Die Frage ist:** sind 2 Prozentpunkte die 7 zusätzlichen Risiko-Ebenen wert? Das hängt vom individuellen Risiko-Profil ab — für viele konservative Nutzer lautet die Antwort **nein**.

### Folien-Zusammenfassung

**[Slide 1] — Titel**
Die spezifischen Risiken von Loops

**[Slide 2] — Risiko 1: Peg-Depeg**
wstETH/ETH depeggt
Bei 3x Loop: 6% Depeg = 18% Portfolio-Verlust
Juni 2022 als historisches Beispiel

**[Slide 3] — Risiko 2: Zinssatz-Sprünge**
Borrow-Rate kann von 2,5% auf 5-10% springen
Loop wird negativ Carry
Verliert täglich Geld

**[Slide 4] — Risiko 3: Liquidations-Kaskaden**
Loops sind systemisch vernetzt
Selbst-verstärkender Verkaufsdruck
Juni 2022 als Fallbeispiel

**[Slide 5] — Risiko 4: Smart-Contract-Kaskade**
Aave + Lido + DEX + evtl. Zap
Jeder Layer addiert Risiko

**[Slide 6] — Risiko 5: Withdraw-Queue**
In Krisen: Queue-Zeit verlängert
DEX-Swap oft mit hohem Slippage

**[Slide 7] — Gesamt-Bilanz**
7 zusätzliche Risiko-Ebenen
+2 Prozentpunkte Rendite
Rechnet sich das individuell?

### Sprechertext

**[Slide 1]** Diese Lektion sezeniert die spezifischen Risiken von Leverage-Loops. Sie sind nicht nur die üblichen DeFi-Risiken verstärkt — sie haben eigene, strategie-spezifische Schwachstellen.

**[Slide 2]** Risiko 1: Peg-Depeg. Der Loop setzt voraus, dass wstETH etwa 1:1 zu ETH handelt. Wenn das Ratio bricht — Juni 2022 war minus 6 Prozent — wird die Position unterbesichert. Bei 3-fachem Leverage und 80 Prozent LTV-Nutzung reicht eine 6-Prozent-Depeg für die Liquidation. Der Schaden: 3x mal 6 Prozent ist 18 Prozent direkter Portfolio-Verlust, plus Liquidations-Penalty. Bei 10.000 USD Einsatz können das 6.300 USD Verlust sein — 63 Prozent.

**[Slide 3]** Risiko 2: Zinssatz-Sprünge. ETH-Borrow-Rate auf Aave ist normal 2 bis 3 Prozent. In Stress-Szenarien kann sie auf 5 bis 10 Prozent springen. Trigger: Utilization-Spikes, massive Leveraged-Staking-Nachfrage, oder Protokoll-Events. Wenn die Borrow-Rate über den Yield springt, wird der Loop negativ Carry — er verliert täglich Geld. Der Halter muss entscheiden: deleveragen oder aussitzen. Beide Optionen sind unangenehm.

**[Slide 4]** Risiko 3: Liquidations-Kaskaden. Loops sind systemisch vernetzt. Wenn viele gleichzeitig in Stress geraten, verstärken sich die Liquidationen. Mechanik: initial fällt stETH um 3 Prozent, 90-Prozent-LTV-Loops liquidieren, das verkaufte stETH drückt den Preis auf minus 4 Prozent, 85-Prozent-Loops liquidieren — Kaskade. Juni 2022 war genau so. Solche Ereignisse sind keine Theorie, sondern historisch real.

**[Slide 5]** Risiko 4: Smart-Contract-Kaskade. Ein Loop nutzt mehrere Protokolle: Aave, Lido, eine DEX für Swaps, eventuell ein Zap-Service. Jede Ebene addiert ein Smart-Contract-Risiko. Die Gesamt-Ausfallwahrscheinlichkeit ist höher als bei einfachem Halten auf einem Protokoll.

**[Slide 6]** Risiko 5: Withdraw-Queue-Risiko in Krisen. Nach Shanghai können wstETH-Halter direkt ETH zurückziehen. Aber die Queue ist begrenzt. In Stress-Szenarien will jeder gleichzeitig raus. Zwei Wege: DEX-Swap mit möglichen extremen Slippages, oder Lido-Withdrawal mit Queue-Zeit von Tagen. Beides in Krisen problematisch.

**[Slide 7]** Die Gesamt-Bilanz. Eine 3-fach wstETH-Loop-Position trägt 7 zusätzliche Risiko-Ebenen gegenüber einfachem wstETH-Halten. Die Rendite-Kompensation ist etwa 2 Prozentpunkte — von 3,5 auf 5,5 Prozent. Die Frage: sind 2 Prozentpunkte die 7 zusätzlichen Risiko-Ebenen wert? Für viele konservative Nutzer lautet die ehrliche Antwort: nein. Für einige, die die Mechaniken vollständig verstehen und aktiv überwachen, kann es Sinn ergeben. Aber das Default sollte skeptisch sein, nicht optimistisch.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** stETH/ETH Chart Juni 2022 mit markierten Liquidations-Wellen.

**[Slide 3]** Historische ETH-Borrow-Rate-Chart mit Spikes.

**[Slide 4]** Kaskaden-Diagramm: Initial-Event → Liquidationen → Verkaufsdruck → Kaskade.

**[Slide 5]** 4-Layer-Stack: Aave + Lido + DEX + Zap, mit Risiko-Addition.

**[Slide 6]** Lido-Withdraw-Queue-Visualisierung in Normalzeit vs. Krise.

**[Slide 7]** Bilanz-Diagramm: 7 Risiko-Ebenen vs. 2 Prozentpunkte.

### Übung

**Aufgabe: Stress-Test deiner eigenen hypothetischen Loop-Position**

Nimm an, du hättest folgenden Loop: 20.000 USD wstETH als Collateral, 13.000 USD WETH-Schuld (entspricht 2,5x Leverage). E-Mode aktiv, LT = 95%.

Analysiere für jedes Szenario:
1. **Szenario A:** stETH/ETH fällt um 3% (wie kleineres Depeg-Event). Was passiert?
2. **Szenario B:** stETH/ETH fällt um 8% (größeres Depeg, wie Juni 2022 worst case). Was passiert?
3. **Szenario C:** ETH-Borrow-Rate springt von 2,5% auf 5%, stETH-Yield bleibt 3,5%. Netto-Rendite?
4. **Szenario D:** Kombination: stETH/ETH -5% und Borrow-Rate +1,5%. Portfolio-Status?
5. **Szenario E:** ETH fällt um 30% gegenüber USD (Bear-Markt). Auswirkung auf USD-Wert?

**Deliverable:** Stress-Test-Tabelle mit allen 5 Szenarien + kurze Schlussfolgerung (5-8 Sätze): Ist diese Loop-Position für dein persönliches Risiko-Profil akzeptabel?

### Quiz

**Frage 1:** Warum ist Peg-Depeg-Risiko bei Loops schlimmer als bei einfachem wstETH-Halten, obwohl das Depeg-Ereignis dasselbe ist?

<details>
<summary>Antwort anzeigen</summary>

Zwei Verstärkungs-Effekte. Erstens: direkte Leverage-Wirkung. Bei einfachem wstETH-Halten und 6% Depeg ist der Verlust 6% des gehaltenen Kapitals. Bei 3x Loop ist der Verlust 3x × 6% = 18% auf das ursprüngliche Kapital — dreimal so groß. Zweitens: Liquidations-Risiko. Bei einfachem Halten gibt es keine Liquidation — wenn stETH um 6% fällt, hält man trotzdem die Position und wartet auf Erholung. Bei Loop mit 80%+ LTV kann eine 6% Depeg die Liquidation triggern, was zusätzliche 2-5% Liquidations-Penalty bringt. Plus: nach Liquidation ist die Position unfreiwillig geschlossen. Du kannst nicht auf Erholung warten. Drittens: Leverage-Abwärtsspirale. Wenn das Depeg weiter läuft und du nicht vorher deleveraged hast, wird die Liquidations-Welle größer. Vierte Dimension: psychologischer Stress. 18% Portfolio-Verlust in Tagen ist emotional deutlich schwieriger zu ertragen als 6%. Das führt oft zu panischen Entscheidungen am Tiefpunkt — Selling-Low und Zusätzliche Verluste durch Timing-Fehler. Zusammengefasst: Loops verstärken nicht nur die direkten Zahlen, sondern auch die Dynamik und den psychologischen Druck in Krisen. Deshalb ist Risiko-Management bei Loops so essentiell.
</details>

**Frage 2:** Warum ist die Regel "bei Yield-Borrow-Spread unter 0,5% deleveragen" strukturell sinnvoll, auch wenn der Loop noch nicht direkt unprofitabel ist?

<details>
<summary>Antwort anzeigen</summary>

Mehrere Gründe. Erstens: Risiko-adjustierte Rendite. Bei 0,5% Spread und 3x Leverage bringt der Loop nur 1% Prozentpunkte über einfachem Halten (3,5% Halten + 1% Leverage-Bonus = 4,5%). Die zusätzlichen Risiken (Smart Contract, Peg, Zins-Spike, Liquidation) rechtfertigen 1% Zusatz-Rendite selten. Das ist schlechtes Risk-Reward-Verhältnis. Zweitens: Schutzpuffer vor Spread-Inversion. Wenn der Spread aktuell 0,5% ist, kann er innerhalb von Wochen auf 0% oder negativ fallen. Deleveraging jetzt kostet moderate Gas; deleveraging in Panik bei negativem Spread kostet mehr (schlechtere Preise durch Verkaufsdruck, höhere Gas-Preise in Stress). Früh agieren ist günstiger. Drittens: signaling. Ein fallender Spread signalisiert oft, dass der Markt in eine neue Phase eintritt. Meist eine Phase höherer Nachfrage nach ETH-Borrowing (Leveraged-Staking-Welle, Bull-Market-Leverage) oder sinkender Staking-Rewards. Beides sind Marktbedingungen, wo Deleveraging proaktiv sinnvoll ist. Viertens: psychologische Disziplin. Klare vordefinierte Regeln verhindern "ich warte noch ein bisschen"-Fallen. Ohne Regeln rationalisiert man gerne weiter — bis die Position tief ins Minus rutscht. Die Regel "0,5% Spread-Trigger" ist eine einfache, klare Entscheidungsregel, die vor Emotionen schützt. Für konservative Strategie-Umsetzung sind solche Regeln essenziell — sie machen den Unterschied zwischen disziplinierter und chaotischer Praxis.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → 5 Haupt-Risiken → Loop-Risk-Diagramm → Depeg-Szenarien → Liquidations-Kaskaden → Historische Katastrophen → Mitigations-Matrix
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 11–13 Min.)
- `visual_plan.json` — Loop-Risk-Dependency-Diagramm, stETH-Depeg-Cascade-Simulation, Liquidations-Kaskaden-Grafik, Historische Events-Timeline, Mitigations-Matrix

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 10.5 — Praktische Umsetzung und Monitoring

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Eine konservative Loop-Position schrittweise aufbauen
- Ein vollständiges Monitoring- und Alert-System einrichten
- Rebalancing-Entscheidungen systematisch treffen
- Die schrittweise Position-Eröffnung (Test-Iteration, graduelle Skalierung) als Risiko-Management-Praxis umsetzen
- Alert-Systeme (Hal, DeFi Saver, eigene Dashboards) mit definierten HF-Schwellen einrichten
- Rebalance-Events (nach Preisbewegung, Zins-Spike, Peg-Abweichung) nach einem dokumentierten Regelwerk ausführen

### Erklärung

Eine Loop-Position aufzubauen ist eine Sache — sie professionell zu managen eine andere. Diese Lektion gibt dir die praktischen Werkzeuge und Routinen für verantwortliches Loop-Management.

**Der konservative Aufbau-Prozess**

**Schritt 1: Vorab-Entscheidung (BEFORE any transaction)**

Schriftlich dokumentieren:
- **Kapital-Anteil:** Wie viel Prozent meines Portfolios kommt in den Loop? (Empfehlung: max 30-40%)
- **Ziel-Leverage:** 2x, 2,5x oder 3x? (Konservativ: 2-2,5x)
- **Ziel-Health-Factor:** Mindestens 1,8, ideal 2,0-2,2
- **Exit-Trigger:** Bei welchem HF, welcher Depeg, welchem Spread-Wert wird deleveraged?
- **Zeit-Horizont:** Für wie lange ist die Position geplant?
- **Monitoring-Plan:** Wie oft wird überwacht?

**Das nicht im Voraus zu dokumentieren ist der häufigste Fehler.** In Stress-Situationen werden Entscheidungen dann panisch getroffen.

**Schritt 2: Dry Run (für Anfänger)**

Bevor du reales Kapital einsetzt:
- Kleine Test-Position (z.B. 5-10% der geplanten Größe) aufbauen
- Alle Schritte einmal durchlaufen
- Monitoring testen, Alerts einrichten
- Einen Test-Deleverage durchführen

Das kostet einige Gas, aber gibt Vertrauen, dass der Prozess funktioniert, bevor größeres Kapital im Spiel ist.

**Schritt 3: Schrittweiser Aufbau**

Statt sofort die volle Position aufzubauen, staffle:
- Tag 1: 40% der geplanten Position mit Leverage
- Tag 3-5: weitere 30% (wenn alles stabil läuft)
- Tag 10+: die letzten 30%

Das hat zwei Vorteile: (1) falls etwas schief geht, ist nur ein Teil exponiert, (2) du lernst die Dynamik schrittweise kennen.

**Schritt 4: Setup-Verifikation**

Nach vollständigem Aufbau:
- Health Factor prüfen: entspricht dem Plan?
- Liquidations-Preis notieren: schriftlich dokumentieren
- Alerts einrichten: HAL.xyz, DeFiSaver, oder andere
- Portfolio-Overview: alles in DeBank oder Zapper einsehbar?

**Das Monitoring-System**

**Tägliches Monitoring (1-2 Minuten):**
- DeBank oder Aave-App öffnen
- Health Factor prüfen — im grünen Bereich (>1,8)?
- Aktueller wstETH/ETH-Ratio checken (z.B. auf Curve) — stabil?

**Wöchentliches Monitoring (10-15 Minuten):**
- Yield/Borrow-Spread überprüfen
- News über Lido, Aave, stETH relevant?
- Position-Größe relativ zum Gesamt-Portfolio
- Rebalancing nötig?

**Monatliches Deep-Dive (30-45 Minuten):**
- Vollständige Performance-Analyse
- Vergleich tatsächliche vs. erwartete Rendite
- Gas-Kosten-Analyse
- Portfolio-Allokations-Check
- Strategie-Anpassungen wenn nötig

**Alert-System einrichten**

Kritisch für Loop-Management:

**HAL.xyz** (hal.xyz) — kostenloser Service:
- Alert bei HF-Schwellen: HF < 2,0, HF < 1,7, HF < 1,5, HF < 1,3
- Alert bei Aave-Protokoll-Events
- E-Mail, Webhook, Discord-Integration

**DeFiSaver** (defisaver.com) — Loop-spezifisch:
- Auto-Boost / Auto-Repay bei Schwellen
- Fortgeschrittene Features inklusive automatisches Rebalancing

**Zapper/DeBank Alerts:**
- Basis-Portfolio-Benachrichtigungen
- Weniger granular als HAL

**Manuelle Preis-Alerts:**
- Auf CoinGecko, TradingView, oder via Wallets
- Alert bei wstETH/ETH unter 0,98

**Rebalancing-Entscheidungs-Matrix**

Klare Regeln für typische Situationen:

**Situation 1: HF fällt unter 2,0 durch Preis-Bewegung**
- Aktion: prüfen, ob permanent oder kurzfristig
- Wenn Bear-Markt-Trend: 20-30% der Schuld zurückzahlen (Deleveraging)
- Wenn Eintages-Schwankung: abwarten, Alert-Schwelle beobachten

**Situation 2: HF fällt unter 1,7**
- Aktion: sofort 30-50% deleveragen
- Nicht warten auf Erholung — das ist die Alert-Schwelle

**Situation 3: HF fällt unter 1,5**
- Aktion: sofort 70-100% deleveragen
- Liquidations-Risiko zu hoch für weiteres Warten

**Situation 4: Yield-Borrow-Spread fällt unter 0,5%**
- Aktion: schrittweises Deleveraging über 1-2 Wochen
- Position kann später wieder aufgebaut werden, wenn Spread normalisiert

**Situation 5: stETH/ETH-Ratio fällt unter 0,98**
- Aktion: Alert-Modus, tägliches Monitoring
- Unter 0,97: signifikantes Deleveraging
- Unter 0,95: komplettes Deleveraging

**Situation 6: Smart-Contract-Event bei Aave, Lido, oder DEX**
- Aktion: komplettes Deleveraging sofort
- Re-entry erst nach Klarheit über das Ereignis

**Der psychologische Aspekt**

Loop-Management ist nicht nur technisch — es ist auch psychologisch. Häufige Fallen:

**Falle 1: "Es wird schon wieder steigen"**
In Bear-Markten sehen Loop-Halter temporäre Preisrückgänge und hoffen auf Erholung. Oft geht es aber tiefer. Die Disziplin, nach klaren Regeln zu deleveragen, auch wenn es schmerzt, ist essentiell.

**Falle 2: "Ich habe so lange gewartet, jetzt lohnt es sich nicht mehr zu verkaufen"**
Sunk-Cost-Fallacy. Vergangene Verluste sind irrelevant für zukünftige Entscheidungen. Die Frage ist: passt die aktuelle Position zum aktuellen Risiko-Profil?

**Falle 3: "Ich bin schon durch so viele Loops gegangen"**
Erfahrung schützt vor normalen Situationen, aber nicht vor Black-Swan-Events. Jeder neue Crash kann neue Mechaniken zeigen.

**Falle 4: "Ich kann das regelbasierte System noch kurz überschreiben"**
Einmalige Regelbrüche führen fast immer zu weiteren Regelbrüchen. Konsistenz ist mehr wert als Optimierung einzelner Entscheidungen.

**Die konservative Hygiene-Checkliste**

Für jede Loop-Position:
1. ✅ Schriftliche Vorab-Dokumentation
2. ✅ Maximaler Kapital-Anteil definiert
3. ✅ Health-Factor-Ziel klar
4. ✅ Exit-Trigger schriftlich
5. ✅ Monitoring-Plan
6. ✅ Alerts konfiguriert
7. ✅ Rebalancing-Matrix dokumentiert
8. ✅ Regelbasierte Disziplin

Ohne alle acht Punkte ist die Position nicht konservativ — egal wie niedrig der Leverage ist.

### Folien-Zusammenfassung

**[Slide 1] — Titel**
Praktische Umsetzung und Monitoring

**[Slide 2] — Vorab-Entscheidung**
Schriftlich dokumentieren:
Kapital-Anteil, Leverage, HF-Ziel, Exit-Trigger, Zeit-Horizont, Monitoring

**[Slide 3] — Aufbau-Prozess**
1. Dry Run (Test-Position)
2. Schrittweiser Aufbau (40/30/30)
3. Setup-Verifikation

**[Slide 4] — Monitoring-System**
Täglich: 1-2 Min HF-Check
Wöchentlich: 10-15 Min Spread-Check
Monatlich: 30-45 Min Deep-Dive

**[Slide 5] — Alert-Services**
HAL.xyz: HF-Schwellen-Alerts
DeFiSaver: Auto-Rebalancing
Manuelle Preis-Alerts

**[Slide 6] — Rebalancing-Matrix**
HF < 2,0: prüfen
HF < 1,7: 30-50% deleveragen
HF < 1,5: 70-100% deleveragen

**[Slide 7] — Psychologische Fallen**
"Es wird wieder steigen" (Hoffnung)
"Sunk-Cost-Fallacy"
"Ich bin erfahren" (Überkonfidenz)
"Regel einmal umgehen"

**[Slide 8] — Die 8-Punkt-Checkliste**
Alle 8 Punkte = konservative Position
Weniger = nicht konservativ

### Sprechertext

**[Slide 1]** Eine Loop-Position aufzubauen ist eine Sache. Sie professionell zu managen eine andere. Diese Lektion gibt dir die praktischen Werkzeuge und Routinen für verantwortliches Loop-Management.

**[Slide 2]** Der wichtigste Schritt: die Vorab-Entscheidung. Bevor irgendeine Transaktion passiert, dokumentiere schriftlich: Kapital-Anteil, Ziel-Leverage, Ziel-Health-Factor, Exit-Trigger, Zeit-Horizont, Monitoring-Plan. Das nicht im Voraus zu dokumentieren ist der häufigste Fehler — in Stress-Situationen werden Entscheidungen dann panisch getroffen.

**[Slide 3]** Der Aufbau-Prozess. Erstens: Dry Run für Anfänger. Eine kleine Test-Position aufbauen, alle Schritte durchgehen. Zweitens: schrittweiser Aufbau — 40 Prozent Tag 1, 30 Prozent Tag 3-5, 30 Prozent Tag 10 plus. Drittens: Setup-Verifikation — Health Factor prüfen, Liquidations-Preis notieren, Alerts einrichten.

**[Slide 4]** Das Monitoring-System in drei Stufen. Täglich 1 bis 2 Minuten HF-Check und wstETH-ETH-Ratio. Wöchentlich 10 bis 15 Minuten für Yield-Borrow-Spread und News. Monatlich 30 bis 45 Minuten vollständige Performance-Analyse und Strategie-Überprüfung.

**[Slide 5]** Alert-Services. HAL.xyz ist kostenlos und bietet HF-Schwellen-Alerts — HF unter 2, 1,7, 1,5, 1,3. E-Mail, Webhook, Discord. DeFiSaver bietet Auto-Rebalancing bei Schwellen. Plus manuelle Preis-Alerts auf CoinGecko oder TradingView. Mindestens zwei unabhängige Alert-Systeme einrichten, falls eines ausfällt.

**[Slide 6]** Die Rebalancing-Matrix für klare Regeln. HF fällt unter 2,0 durch Preis-Bewegung: prüfen, abhängig von Trend reagieren. HF unter 1,7: 30 bis 50 Prozent deleveragen sofort. HF unter 1,5: 70 bis 100 Prozent deleveragen. Yield-Borrow-Spread unter 0,5 Prozent: schrittweises Deleveraging. stETH-ETH-Ratio unter 0,98: Alert-Modus. Unter 0,97: signifikantes Deleveraging. Unter 0,95: komplettes Deleveraging.

**[Slide 7]** Psychologische Fallen, vor denen man sich schützen muss. Erstens: "Es wird schon wieder steigen" — in Bär-Märkten hoffen Loop-Halter auf Erholung, während es tiefer geht. Zweitens: Sunk-Cost-Fallacy. Vergangene Verluste sind irrelevant für zukünftige Entscheidungen. Drittens: Überkonfidenz durch Erfahrung. Jeder neue Crash kann neue Mechaniken zeigen. Viertens: einmalige Regelbrüche führen zu weiteren. Konsistenz wichtiger als Optimierung.

**[Slide 8]** Die 8-Punkte-Checkliste für jede Loop-Position. Schriftliche Vorab-Dokumentation. Max Kapital-Anteil definiert. HF-Ziel klar. Exit-Trigger schriftlich. Monitoring-Plan. Alerts konfiguriert. Rebalancing-Matrix dokumentiert. Regelbasierte Disziplin. Ohne alle acht Punkte ist die Position nicht konservativ — egal wie niedrig der Leverage ist.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Vorab-Checkliste-Template als visuelles Dokument.

**[Slide 3]** Stufen-Diagramm des Aufbau-Prozesses mit Zeitachse.

**[Slide 4]** Drei-Ebenen-Monitoring-Pyramide.

**[Slide 5]** **SCREENSHOT SUGGESTION:** HAL.xyz Alert-Configuration Interface. Alternativ: DeFiSaver Automation Dashboard.

**[Slide 6]** Rebalancing-Matrix als Entscheidungstabelle.

**[Slide 7]** Vier-Fallen-Karten mit Warnung.

**[Slide 8]** 8-Punkt-Checkliste als prominentes Abschluss-Visual.

### Übung

**Aufgabe: Komplettes Loop-Management-Setup entwerfen**

Angenommen, du willst eine 2,5x wstETH-Loop-Position von 40.000 USD aufbauen. Entwirf das komplette Setup:

1. **Vorab-Dokument** (schreibe die 6 Punkte auf: Kapital-Anteil, Leverage, HF-Ziel, Exit-Trigger, Zeit-Horizont, Monitoring)
2. **Aufbau-Plan** (wie staffelst du?)
3. **Monitoring-Routine** (täglich/wöchentlich/monatlich)
4. **Alert-Konfiguration** (welche Services, welche Schwellen)
5. **Rebalancing-Regeln** (klare Entscheidungs-Matrix für 6 Szenarien)
6. **Psychologische Regeln** (was tust du bei Stress?)

**Deliverable:** Vollständiges Management-Dokument (3-4 Seiten) + Reflexion (5-7 Sätze): Wo siehst du die größten Schwachstellen deines Plans, und wie würdest du sie adressieren?

### Quiz

**Frage 1:** Warum ist der schrittweise Aufbau (40/30/30) einer Loop-Position besser als sofort die volle Position aufzubauen?

<details>
<summary>Antwort anzeigen</summary>

Mehrere Gründe. Erstens: Risiko-Begrenzung bei Fehlern. Wenn beim Aufbau etwas schief geht — falsche LTV-Einstellung, unerwartete Slippage, Gas-Preis-Explosion — ist nur ein Teil des Kapitals betroffen. Zweitens: Markt-Timing-Diversifikation. Eine sofortige volle Position "setzt" auf eine einzige Entry-Zeit. Gestaffelter Aufbau mittelt über mehrere Entry-Zeiten — verringert das Risiko, zu einem ungünstigen Moment einzusteigen. Drittens: Lern-Kurve. In den ersten Tagen lernst du die Dynamik der Position — wie schwankt HF mit Preis, wie entwickelt sich der Spread, wie gut funktionieren die Alerts. Wenn diese Beobachtungen problematisch aussehen, kannst du die Position vor Voll-Aufbau stoppen. Viertens: psychologische Vorbereitung. Eine große Position von Anfang an erzeugt intensiven Stress bei jeder Markt-Bewegung. Eine graduell aufgebaute Position gewöhnt dich an die Skala des Risikos. Fünftens: Gas-Effizienz-Test. Du siehst bei der ersten Tranche die tatsächlichen Gas-Kosten und Slippage und kannst entscheiden, ob der Ansatz wirtschaftlich Sinn macht. Sechstens: Flexibilität bei Marktbedingungen. Wenn in den ersten Tagen wichtige News kommen (z.B. Lido-Protokoll-Änderung), kannst du die restlichen Tranchen anpassen oder stornieren. Pauschal-Entry-alles-auf-einmal ist nur dann besser, wenn Gas-Kosten sehr hoch sind und Staffelung signifikante zusätzliche Transaktionen bedeutet. Für die meisten realistischen Szenarien überwiegen die Vorteile der Staffelung.
</details>

**Frage 2:** Ein Anleger sagt: "Ich habe meine Loop-Position 6 Monate gehalten ohne Rebalancing und es ging gut. Ich brauche keine Monitoring-Routine." Was ist falsch an dieser Argumentation?

<details>
<summary>Antwort anzeigen</summary>

Survival Bias auf einem einzelnen Datenpunkt. Dass eine Position 6 Monate ohne Aktion gut gelaufen ist, sagt wenig über die Zukunft aus. Dieselbe Position hätte in einem 6-Monats-Zeitraum, der den Juni-2022-Depeg oder Black Thursday 2020 einschließt, katastrophal verloren. Die Argumentation ignoriert Black-Swan-Events — Ereignisse, die selten sind, aber wenn sie eintreten, extreme Auswirkungen haben. Konkret: die Wahrscheinlichkeit eines signifikanten stETH-Depegs in einem 6-Monats-Zeitraum ist vielleicht 5-10%. In 90% der Zeit passiert nichts Außergewöhnliches — in 10% passiert viel. Wer nur auf Basis der ruhigen Phasen plant, ist unvorbereitet, wenn die Stress-Phase kommt. Zusätzlich: "Es ging gut" ist kein Gütekriterium für Risiko-Management. Eine Position kann monatelang stabil aussehen und dann in Tagen 50% verlieren. Die richtige Metrik ist nicht "Gab es Verluste?", sondern "War ich vorbereitet, wenn Verluste eingetreten wären?". Monitoring und Rebalancing-Regeln sind Versicherungen gegen seltene, aber extreme Ereignisse — sie bringen keinen direkten Nutzen in normalen Zeiten, aber ihr Wert zeigt sich in Krisen. Die Logik "ich brauche das nicht, weil bisher nichts passiert ist" ist wie das Weglassen einer Gebäude-Versicherung, weil es die letzten 6 Jahre nicht gebrannt hat. Disziplin im Risiko-Management ist unabhängig von kurzfristigem Glück. Gerade die erfolgreichsten Episoden bauen Überkonfidenz auf, die in der nächsten Krise zu Katastrophen führen kann.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → Schrittweiser Aufbau → Alert-System → Monitoring-Dashboard → Rebalancing-Regeln → Notfall-Prozedur → Positions-Disziplin
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 10–12 Min.)
- `visual_plan.json` — Schrittweise-Aufbau-Zeitleiste, Alert-System-Screenshots (Hal, DeFi Saver), Dashboard-Beispiel, Rebalance-Regel-Entscheidungsbaum, Notfall-Flowchart

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 10.6 — Wann Leverage-Loops NICHT sinnvoll sind

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die klaren Signale identifizieren, dass Leverage nicht die richtige Strategie ist
- Alternative Yield-Strategien zur Erreichung des 7-8%-Ziels einsetzen
- Die eigene Strategie-Wahl rational begründen
- Persönliche Stop-Kriterien (Zeit-Budget, Stress-Toleranz, Portfolio-Größe) vorab definieren und konsequent anwenden
- Markt-Phasen erkennen, in denen Leverage strukturell unrentabel ist (niedrige Yield-Spreads, hohe Borrow-Raten)
- Eine rationale Entscheidung zwischen Leverage-Strategie und passiver Multi-Asset-Strategie treffen

### Erklärung

Diese abschließende Lektion ist ein bewusster Kontrapunkt zum Rest des Moduls. Nach der detaillierten Erklärung, **wie** Loops funktionieren und **wie** sie zu managen sind, adressiert sie die wichtigere Frage: **wann sollte man sie nicht nutzen?**

**Die klare Antwort für konservative Portfolios**

Leverage-Loops sind **nicht** für:
- Einsteiger in DeFi
- Nutzer ohne klare Risiko-Management-Disziplin
- Nutzer mit zeitlich begrenztem Monitoring-Budget
- Nutzer, die einen signifikanten Teil ihres Vermögens einsetzen
- Nutzer, die das 7-8%-Ziel auch anders erreichen können

Für viele konservative Nutzer ist die ehrliche Antwort: **Leverage-Loops sind nicht nötig**, und das Setup eines Portfolios ohne Leverage-Loops ist oft strategisch überlegen.

**Die alternative Strategie: 7-8% ohne Leverage**

Kann das 7-8%-Ziel ohne Leverage-Loops erreicht werden? Ja, mit einigen Voraussetzungen.

**Portfolio-Beispiel (50.000 USD, keine Leverage-Loops):**

- **30% Stablecoin-Supply auf Aave V3/Compound/Morpho:** 15.000 USD @ 4,5% = 675 USD
- **15% Morpho Blue USDC Vault (Steakhouse):** 7.500 USD @ 6% = 450 USD
- **10% sDAI via Spark:** 5.000 USD @ 5% = 250 USD
- **5% Pendle PT-USDC (6 Monate, 8% fixed):** 2.500 USD @ 8% = 200 USD
- **20% wstETH (Lido):** 10.000 USD @ 3,5% Staking + ETH-Preis-Exposure
- **10% rETH (Rocket Pool):** 5.000 USD @ 3,3% Staking + ETH-Exposure
- **5% Curve 3pool LP mit Convex-Boost:** 2.500 USD @ 6% = 150 USD
- **5% Wallet-Reserve:** 2.500 USD

**Jahres-Yield-Komponente:**
- Stablecoin-Teile: 675 + 450 + 250 + 200 + 150 = 1.725 USD = 3,45%
- Staking-Yield-Komponente: 350 + 165 = 515 USD = 1,03%
- **Total Yield: 2.240 USD = 4,48%**

**ETH-Preis-Komponente (30% in wstETH + rETH):**
- Neutrales ETH: 0
- +10% ETH: 1.500 USD = 3%
- +20% ETH: 3.000 USD = 6%
--10% ETH: -1.500 USD = -3%

**Gesamt-Rendite-Szenarien:**
- Bear-Markt (ETH -20%): 4,48% - 6% = **-1,52%**
- Neutral (ETH flat): **4,48%**
- Moderat (ETH +10%): **7,48%**
- Bull-Markt (ETH +30%): **13,48%**

**Vergleich mit Leverage-Loop-Portfolio**

Ein alternatives Portfolio mit 30% Leverage-Loop (3x wstETH):

- **30% wstETH-3x-Loop:** Effektives Staking-Exposure ~45%, Yield ~6%
- **50% Stablecoin-Supply-Mix:** 4,5%
- **15% direkte Staking-Assets:** 3,5%
- **5% Wallet-Reserve**

**Yield-Komponente:** ~5% (mehr als ohne Loop durch Leverage)
**ETH-Preis-Exposure:** höher (~45% effektiv)

**Szenarien:**
- Bear-Markt (ETH -20%): -15% bis -20% (Leverage-Multiplikator)
- Neutral: 5%
- Bull-Markt (ETH +30%): 18-20%

**Die wichtige Erkenntnis:** Das Leverage-Portfolio hat **höhere Upside-Potenzial und höheres Downside-Potenzial**. In neutralen Märkten ist es nur 0,5% besser. In Bear-Markets verliert es deutlich mehr.

**Die Risikoadjustierte Sicht**

Vergleich nach 3 Jahren, abhängig vom Markt-Szenario:

| Szenario | Ohne Leverage | Mit 3x-Loop | Differenz |
|---|---|---|---|
| Extremer Bull-Markt | +40% | +60%+ | +20% |
| Moderater Bull | +22% | +30% | +8% |
| Neutral | +14% | +15% | +1% |
| Moderater Bear | +5% | -10% | -15% |
| Extremer Bear | -20% | -50%+ | -30% |

**Die Wahrheit:** In normalen bis positiven Märkten bringt der Loop einen moderaten Rendite-Bonus. In negativen Märkten kann er katastrophale Verluste bringen. Das asymmetrische Risiko ist strukturell.

**Wann Leverage-Loops wirklich Sinn ergeben**

Trotz aller Vorsicht: es gibt Szenarien, in denen Leverage-Loops rational sind:

**Szenario 1: Spezifische Markt-Sicht mit hohem Bull-Convictions**
Du bist überzeugt, dass ETH die nächsten 12-24 Monate in einem Bull-Markt ist und willst davon überproportional profitieren. Ein kleiner, kontrollierter Loop (max 30% des Portfolios, 2x Leverage, HF 2,0) kann rational sein.

**Szenario 2: Sehr große Positionen, wo das absolute Rendite-Plus signifikant ist**
Bei 500.000 USD Portfolio bringen die zusätzlichen 1-2% Rendite absolut 5.000-10.000 USD pro Jahr. Das ist Geld genug, um aktives Monitoring zu rechtfertigen.

**Szenario 3: Kurzfristige, taktische Positionen**
Du siehst, dass der Yield-Borrow-Spread historisch hoch ist (z.B. 2%+) und willst kurzfristig profitieren. Eine Position mit klarem Exit-Kriterium (z.B. "wenn Spread unter 1% fällt, sofort schließen") kann rational sein.

**Szenario 4: Professionelle Trader mit aktivem Full-Time-Management**
Jemand, der DeFi als Beruf behandelt und täglich 1+ Stunden investiert, kann größere Loops mit engerem Monitoring fahren.

**Was KEINE guten Gründe für Loops sind**

- "Ich will 10%+ statt 5%"
- "Andere Leute machen das auch und verdienen viel"
- "In Bull-Markts funktioniert es immer"
- "FOMO, weil der Markt gerade läuft"
- "Ich habe Zeit, aber ich weiß nicht, was ich damit anfangen soll"

Diese Motivationen sind emotional, nicht rational. Sie führen typischerweise zu Verlusten, nicht zu Gewinnen.

**Die ehrliche Reflexion**

Bevor du einen Loop startest, stelle dir fünf Fragen:

1. **Verstehe ich alle 5 Risiken (Peg, Zins, Kaskade, Smart Contract, Withdraw) wirklich?**
2. **Habe ich klare, schriftliche Regeln für alle 6 Rebalancing-Szenarien?**
3. **Kann ich einen 30% Temporär-Verlust der Loop-Position emotional aushalten?**
4. **Erreicht mein Portfolio ohne Loop nicht bereits mein Rendite-Ziel?**
5. **Habe ich mindestens 3 Monate diszipliniert mit einfachen Yield-Strategien (Supply, Staking, LP) praktiziert?**

Wenn auch nur eine Antwort "nein" ist: Leverage-Loops sind nicht die richtige Strategie für dich — aktuell.

**Die konservative Kernaussage**

Das 7-8%-Jahresziel dieses Kurses ist durch diversifizierte Portfolios ohne Leverage-Loops erreichbar (in positiven bis neutralen Markt-Phasen). Leverage-Loops können die Rendite in Bull-Markten verstärken, aber mit asymmetrisch erhöhtem Downside-Risiko.

Für die meisten konservativen Nutzer ist die beste Anwendung der Kenntnisse aus diesem Modul: **zu verstehen, was Leverage-Loops sind, um sie bei anderen zu erkennen und um informiert entscheiden zu können — aber sie selbst nicht zu nutzen**, zumindest nicht bis substantielle DeFi-Erfahrung und klare Disziplin vorhanden sind.

### Folien-Zusammenfassung

**[Slide 1] — Titel**
Wann Leverage-Loops NICHT sinnvoll sind

**[Slide 2] — Nicht für**
Einsteiger
Wenig Disziplin
Begrenztes Monitoring-Budget
Große Portfolio-Anteile
Wenn 7-8% auch anders erreichbar

**[Slide 3] — 7-8% ohne Leverage**
Diversifiziertes Portfolio bringt 4,5% Yield + ETH-Exposition
In moderaten Bull-Markets erreicht 7-8% leicht
Ohne Liquidations-Risiko

**[Slide 4] — Das asymmetrische Risiko**
Bull-Markt: Loop bringt +8% vs. ohne Loop
Bear-Markt: Loop bringt -15% mehr Verlust
Strukturell asymmetrisch

**[Slide 5] — Wann Loops rational sind**
Spezifische Bull-Convictions
Sehr große Positionen
Kurzfristig-taktisch mit Exit-Kriterium
Professionelle Full-Time-Manager

**[Slide 6] — Schlechte Gründe für Loops**
Höhere Rendite-Gier
Social Pressure (FOMO)
"In Bull-Märkten"-Pauschal
Langeweile

**[Slide 7] — Die 5 Test-Fragen**
Verstehe ich alle Risiken?
Klare Regeln vorhanden?
Kann ich Verluste aushalten?
Ziel ohne Loop erreichbar?
3+ Monate Erfahrung?

**[Slide 8] — Die konservative Kernaussage**
Für die meisten Nutzer: nicht nutzen
Stattdessen diversifiziertes Portfolio
Risiko-Management über Rendite

### Sprechertext

**[Slide 1]** Die letzte Lektion ist ein bewusster Kontrapunkt. Nach der detaillierten Erklärung wie Loops funktionieren und zu managen sind, adressiert sie die wichtigere Frage: wann sollte man sie nicht nutzen. Für viele konservative Nutzer lautet die ehrliche Antwort: gar nicht.

**[Slide 2]** Leverage-Loops sind nicht für Einsteiger, nicht für Nutzer ohne klare Risiko-Management-Disziplin, nicht für Nutzer mit zeitlich begrenztem Monitoring-Budget, nicht für Nutzer, die einen signifikanten Teil ihres Vermögens einsetzen, nicht für Nutzer, die das 7 bis 8 Prozent Ziel auch anders erreichen können. Das deckt die Mehrheit der DeFi-Nutzer ab.

**[Slide 3]** Das 7 bis 8 Prozent Ziel ist ohne Leverage erreichbar. Ein diversifiziertes Portfolio mit 55 Prozent Stablecoin-Mix, 30 Prozent Liquid Staking, 5 Prozent LP und Reserve bringt etwa 4,5 Prozent Yield plus ETH-Exposition. In neutralen Märkten sind das 4,5 Prozent Gesamt-Rendite. In moderaten Bull-Markets 7 bis 8 Prozent. Ohne Liquidations-Risiko, mit deutlich geringerer psychologischer Belastung.

**[Slide 4]** Die zentrale Erkenntnis: das Leverage-Risiko ist asymmetrisch. In Bull-Markten bringt der Loop plus 8 Prozentpunkte gegenüber ohne. In Bear-Markten bringt er minus 15 Prozentpunkte. Das klingt fair in der Theorie, ist aber asymmetrisch: 8 Prozent weniger Gewinn ist okay. 15 Prozent mehr Verlust ist emotional und finanziell dramatisch. Das ist nicht Bias — es ist die tatsächliche Verteilung in historischen Märkten.

**[Slide 5]** Es gibt Szenarien, in denen Loops rational sind. Spezifische Markt-Sicht mit hohen Bull-Convictions — du bist überzeugt von Bull-Markt und willst überproportional profitieren. Sehr große Positionen, wo die 1 bis 2 Prozent zusätzliche Rendite absolut signifikant sind. Kurzfristig-taktisch mit klarem Exit-Kriterium. Professionelle Trader mit aktivem Full-Time-Management. Diese Szenarien existieren, aber sie decken nicht die Mehrheit der Nutzer ab.

**[Slide 6]** Schlechte Gründe für Loops. "Ich will 10 Prozent statt 5" — Rendite-Gier ohne Risiko-Bewusstsein. "Andere machen das auch" — Social Pressure und FOMO. "In Bull-Markten funktioniert es immer" — zu pauschal. "Ich habe Zeit" — Langeweile ist kein Investment-Strategie. Diese Motivationen führen typischerweise zu Verlusten.

**[Slide 7]** Fünf Test-Fragen vor jedem Loop. Verstehe ich alle fünf Risiken wirklich? Habe ich klare, schriftliche Regeln für alle sechs Rebalancing-Szenarien? Kann ich einen 30 Prozent Temporär-Verlust emotional aushalten? Erreicht mein Portfolio ohne Loop nicht bereits mein Ziel? Habe ich mindestens drei Monate diszipliniert mit einfachen Strategien praktiziert? Wenn auch nur eine Antwort nein ist: Leverage-Loops sind nicht die richtige Strategie für dich aktuell.

**[Slide 8]** Die konservative Kernaussage dieses Moduls. Das 7 bis 8 Prozent Jahresziel ist durch diversifizierte Portfolios ohne Leverage-Loops erreichbar. Leverage-Loops können die Rendite verstärken, aber mit asymmetrisch erhöhtem Downside-Risiko. Für die meisten konservativen Nutzer ist die beste Anwendung dieses Moduls: verstehen, was Loops sind, um informiert zu entscheiden — aber sie selbst nicht zu nutzen. Zumindest nicht, bis substantielle Erfahrung und klare Disziplin vorhanden sind.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** "Nicht-Nutzer"-Liste mit Personas.

**[Slide 3]** Portfolio-Beispiel ohne Leverage mit Rendite-Aufschlüsselung.

**[Slide 4]** Asymmetrisches Risiko-Diagramm: Upside vs. Downside in verschiedenen Szenarien.

**[Slide 5]** Vier-Szenarien-Matrix, in denen Loops rational sind.

**[Slide 6]** "Rote Flaggen"-Liste für schlechte Gründe.

**[Slide 7]** Die 5 Fragen als Entscheidungs-Flowchart.

**[Slide 8]** Konservative Kernaussage prominent dargestellt.

### Übung

**Aufgabe: Persönliche Loop-Entscheidung**

Beantworte die fünf Test-Fragen ehrlich für deine persönliche Situation:

1. Verstehe ich alle 5 Risiken (Peg, Zins, Kaskade, Smart Contract, Withdraw) wirklich?
2. Habe ich klare, schriftliche Regeln für alle 6 Rebalancing-Szenarien?
3. Kann ich einen 30% Temporär-Verlust der Loop-Position emotional aushalten?
4. Erreicht mein Portfolio ohne Loop nicht bereits mein Rendite-Ziel?
5. Habe ich mindestens 3 Monate diszipliniert mit einfachen Yield-Strategien praktiziert?

Basierend auf deinen Antworten:
- Würdest du einen Loop starten?
- Welche Voraussetzungen müsstest du erst erfüllen?
- Welche Alternativen verfolgst du stattdessen?

**Deliverable:** Reflexions-Dokument (2-3 Seiten) mit ehrlichen Antworten auf alle Fragen + klare persönliche Entscheidung + realistischer Plan für die nächsten 3 Monate.

### Quiz

**Frage 1:** Warum wird in dieser Lektion argumentiert, dass das 7-8%-Ziel "ohne Leverage-Loops erreichbar" ist, obwohl konservative Yield-Portfolios meist nur 4-5% pure Rendite erzeugen?

<details>
<summary>Antwort anzeigen</summary>

Die 7-8% sind ein jährlicher Durchschnitt, der aus mehreren Komponenten zusammenkommt. Komponente 1: pure Yield-Rendite aus Lending, Staking, LP-Strategien — typisch 4-5% annualisiert. Komponente 2: ETH-Preis-Performance auf die Staking-Position. Wenn ETH pro Jahr durchschnittlich 10-15% zulegt (historischer Durchschnitt in positiven Zyklen), und 30% des Portfolios in wstETH/rETH sind, bringt das zusätzlich 3-4,5% zur Gesamt-Rendite. Zusammen: 4-5% + 3-4,5% = 7-8% in moderaten Bull-Markten. Die wichtige Nuance: das 7-8%-Ziel wird nicht in jedem Jahr erreicht. In Bear-Markten (wenn ETH 20-40% fällt) liegt die Rendite möglicherweise bei 0-2% oder sogar negativ. In starken Bull-Markten wird das Ziel deutlich übertroffen. Über mehrere Jahre mittelt sich das zum Zielwert. Diese Sichtweise ist anders als "stabil jedes Jahr 7-8%" — und das ist ehrlicher. Garantierte 7-8% jährlich ohne Volatilität gibt es in keiner Asset-Klasse. Konservative Strategie zielt auf den Mittelwert, akzeptiert aber Jahres-Volatilität. Leverage-Loops ändern diese Struktur: sie können den Mittelwert erhöhen (bei guter Umsetzung), aber sie erhöhen auch die Jahres-Volatilität erheblich — und in schlechten Jahren können sie das ganze Portfolio beschädigen. Die Frage ist nicht "kann ich 7-8% erreichen?", sondern "zu welchem Risiko-Preis?". Ohne Loops: moderates Risiko, Jahres-Streuung -5% bis +20%. Mit Loops: höheres Risiko, Streuung -30% bis +40%. Die risikoadjustierte Rendite ist ohne Loops oft besser.
</details>

**Frage 2:** Die Lektion argumentiert, dass für die meisten konservativen Nutzer Leverage-Loops nicht sinnvoll sind. Welches Argument könnte man dagegen machen, und warum ist es trotzdem meist nicht überzeugend?

<details>
<summary>Antwort anzeigen</summary>

Das häufigste Gegenargument: "Mit klaren Regeln und Disziplin kann man Loops sicher managen — die zusätzliche Rendite lohnt sich über Jahre signifikant." Diese Argumentation hat einen rationalen Kern — theoretisch stimmt sie. Aber sie scheitert in der Praxis an mehreren Punkten. Erstens: psychologische Realität. Auch Menschen mit guten Absichten brechen Regeln unter Stress. Historische Studien zeigen, dass die meisten Anleger — auch professionelle — unter Druck schlechte Entscheidungen treffen. Die "klare Disziplin" ist deutlich seltener als Anleger glauben. Zweitens: Black-Swan-Ereignisse. Regeln basieren auf historischen Daten. Black-Swan-Events haben per Definition keine historischen Vorläufer. Eine perfekte Regel für normale Stress-Situationen kann in einem Black-Swan versagen. Drittens: opportunity cost des Monitorings. Die "Disziplin" erfordert kontinuierliches Monitoring — 30-60 Minuten täglich in aktiven Markt-Phasen. Das ist Arbeit. Wenn diese Arbeit 2 Prozentpunkte zusätzlicher Rendite bringt, aber mehrere Stunden pro Monat kostet, ist der Stundenlohn möglicherweise nicht attraktiv. Viertens: Konzentrationseffekt. Viele Anleger nutzen Loops mit zu großem Kapital-Anteil. Das ist kein Loop-Problem, sondern ein Portfolio-Allokations-Problem, aber es ist in der Praxis weit verbreitet. Fünftens: Survival Bias der erfolgreichen Loop-Halter. Die, die seit 2020 in Loops erfolgreich waren, sind sichtbar. Die, die katastrophal verloren haben (in Juni 2022, FTX-Kollaps, etc.), sind oft aus dem Markt verschwunden. Der Eindruck "Loops funktionieren" ist dadurch verzerrt. Zusammen: das theoretische Gegenargument ist nicht falsch, aber es überschätzt menschliche Disziplin und unterschätzt Markt-Extreme. Für eine Minderheit professioneller Nutzer mit klaren Prozessen und großen Portfolios ist die Argumentation plausibel. Für die breite Mehrheit ist sie statistisch nicht tragfähig. Die konservative Empfehlung "für die meisten nicht nutzen" ist keine pauschale Ablehnung, sondern eine statistische Risk-Adjusted-Realität.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → Stop-Signale → Alternative Strategien → Markt-Phasen → Rationale Entscheidung → Persönliche Kriterien → Praktische Anwendung
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 9–11 Min.)
- `visual_plan.json` — Stop-Signal-Matrix, Alternativ-Strategien-Übersicht, Markt-Phasen-Indikatoren, Entscheidungsmatrix (Leverage vs. Passiv), persönliche Kriterien-Checkliste

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Modul-Abschluss-Quiz

Fünf Fragen zum integrierten Verständnis von Modul 10.

**Frage 1:** Erkläre die Grundformel für Leverage-Loop-Rendite und führe sie am Beispiel eines 2,5x wstETH-Loops mit 4% Yield und 3% Borrow-Cost durch.

<details>
<summary>Antwort anzeigen</summary>

Grundformel: Netto-Rendite = Yield × Leverage - Borrow-Cost × (Leverage - 1). Einsetzung: Netto = 4% × 2,5 - 3% × (2,5 - 1) = 10% - 4,5% = 5,5%. Die Interpretation: ohne Loop würde wstETH 4% Rendite bringen. Mit 2,5x Leverage wird der Spread (Yield - Borrow = 1%) um den Faktor (Leverage - 1) = 1,5 verstärkt zusätzlich zum Basis-Yield. Also: 4% + 1,5% × 1 = 5,5%. Effektiv 1,5 Prozentpunkte zusätzliche Rendite für das Leverage-Risiko. Bei 3x wäre es 4% + 2 × 1% = 6%; bei 4x 4% + 3 × 1% = 7%. Die lineare Skalierung der Rendite mit Leverage täuscht darüber hinweg, dass das Risiko gleichzeitig überproportional wächst. Das ist der Kernpunkt: Rendite-Gewinn linear, Risiko-Zuwachs überproportional.
</details>

**Frage 2:** Warum ist das Peg-Risiko (wstETH/ETH-Depeg) bei einem 3x-Loop viel schlimmer als bei einfachem wstETH-Halten? Nenne drei spezifische Verstärkungsmechanismen.

<details>
<summary>Antwort anzeigen</summary>

Erstens: direkter Leverage-Multiplikator. Bei einfachem Halten und 6% Depeg ist der Portfolio-Verlust 6%. Bei 3x-Loop ist es effektiv 3 × 6% = 18% auf das ursprüngliche Kapital. Zweitens: Liquidations-Trigger. Einfaches Halten hat keine Liquidations-Mechanik — der Halter kann warten auf Erholung. Der Loop hat eine harte Liquidations-Schwelle, die bei 6% Depeg wahrscheinlich erreicht wird (bei LTVs über 75-80%). Das bedeutet zusätzliche Liquidations-Penalty von 2-5% und unfreiwillige Position-Schließung. Drittens: Kaskaden-Effekt. Bei einfachem Halten ist man isoliert vom systemischen Geschehen. Im Loop ist man Teil eines vernetzten Systems — wenn andere Loops liquidieren, verstärkt der Verkaufsdruck die eigene Position. Der Juni-2022-Event zeigte dies: initial 3% Depeg führte zu einer Kaskade von Liquidationen, die den Depeg auf 6% vertieften — ein selbstverstärkender Prozess, der isolierte Halter nicht betraf.
</details>

**Frage 3:** Du beobachtest, dass der Yield-Borrow-Spread für einen wstETH-Loop von 1,5% auf 0,3% gefallen ist. Was ist deine rationale Reaktion, und warum?

<details>
<summary>Antwort anzeigen</summary>

Die rationale Reaktion ist signifikantes Deleveraging, wahrscheinlich 50-70% der Position. Gründe: Erstens, die Risk-adjusted-Rendite ist nicht mehr attraktiv. Bei 0,3% Spread und 3x Leverage bringt der Loop nur 0,6 Prozentpunkte mehr als einfaches Halten (zum Vergleich: bei 1,5% Spread waren es 3 Prozentpunkte). Die zusätzlichen Risiken (Peg, Smart Contract, Liquidation, Zins-Spike) werden für nur 0,6 Prozentpunkte schlecht kompensiert. Zweitens, der fallende Spread ist ein Frühwarnsignal. Er signalisiert, dass die Nachfrage nach ETH-Borrowing zunimmt — typisch ein Indikator für wachsende Leveraged-Staking-Aktivität oder Bull-Market-Leverage. Das erhöht die Wahrscheinlichkeit, dass der Spread sich weiter komprimiert oder sogar invertiert (negativer Carry). Drittens, Deleveraging ist günstiger jetzt als später. Wenn der Spread weiter fällt und möglicherweise invertiert, werden mehr Loop-Halter deleveragen. Der resultierende Verkaufsdruck auf wstETH kann den Peg drücken. Frühes Deleveraging bringt bessere Preise. Viertens, psychologischer Puffer. Eine reduzierte Position ist einfacher zu managen unter Stress. Wenn der Markt gegen dich läuft, ist eine 1x-Position einfacher zu ertragen als eine 3x-Position. Die konservative Regel aus diesem Modul war "bei Spread unter 0,5% deleveragen" — 0,3% ist weit unter dieser Schwelle. Klare Regel-Anwendung erforderlich. Die Alternative — "aussitzen und hoffen" — ist gefährlich, weil sie die vorher definierten Regeln außer Kraft setzt und Entscheidungen unter Stress trifft. Die Disziplin, Regeln auch zu folgen, wenn es gegen die Hoffnung läuft, trennt erfolgreiche Loop-Halter von denen, die in Krisen große Verluste erleiden.
</details>

**Frage 4:** Ein Anleger mit 50.000 USD Gesamt-Portfolio stellt 15.000 USD in einen 3x-wstETH-Loop. Welche Portfolio-Schwäche zeigt diese Allokation, auch wenn der Loop selbst konservativ strukturiert ist?

<details>
<summary>Antwort anzeigen</summary>

30% des Portfolios in einem 3x-Leverage-Produkt bedeutet, dass effektiv 90% des Portfolios an ETH-Preis exponiert ist (30% × 3x). Das ist extreme Konzentration. Mehrere Probleme folgen. Erstens: Korrelations-Risiko. Wenn ETH fällt, fällt auch die ETH-Exposure der anderen Portfolio-Teile (wenn es welche gibt). Bei 90% effektiver ETH-Exposition ist das Portfolio praktisch ein reines ETH-Play. Zweitens: Diversifikations-Verlust. Das Portfolio verliert den Stabilitäts-Nutzen von Stablecoin-Komponenten, weil der Loop-Teil die Gesamt-Volatilität dominiert. Drittens: Bär-Markt-Szenario. Bei ETH -30% fällt der Loop-Teil um 30% × 3 = 90% auf sein Anfangs-Kapital — das bedeutet möglicher Totalverlust des Loop-Teils (15.000 USD). Gesamt-Portfolio-Verlust: 15.000 USD + 30% Verlust auf die anderen ETH-Teile. Das kann leicht 50% oder mehr des gesamten Portfolios sein. Viertens: psychologische Belastung. 30% des Vermögens in einer gehebelten Position ist mental sehr belastend, besonders in Stress-Phasen. Das führt oft zu Panic-Entscheidungen. Bessere Allokation: Loops sollten nie mehr als 15-20% des Portfolios ausmachen, idealerweise 10%. Bei 15% Loop mit 3x-Leverage ist die effektive ETH-Exposure 45% — noch hoch, aber mit 55% Nicht-ETH-Puffer viel robuster. Der Kernpunkt: ein "konservativ strukturierter" Loop (guter HF, gute Monitoring-Regeln) ist nicht ausreichend, wenn die Portfolio-Allokation zu konzentriert ist. Portfolio-Level-Disziplin ist genauso wichtig wie Position-Level-Disziplin. Die meisten Loop-Katastrophen der DeFi-Geschichte hatten nicht schlechte Loop-Strukturen, sondern schlechte Portfolio-Allokationen — zu viel Kapital im Loop-Teil. Die Lehre: vor jedem Loop frage nicht nur "ist der Loop selbst konservativ?", sondern auch "ist mein Portfolio im Gesamten ausgewogen?".
</details>

**Frage 5:** Vergleiche zwei hypothetische Portfolios über einen 3-Jahres-Zeitraum mit verschiedenen Markt-Szenarien: Portfolio A (kein Leverage, diversifiziert) und Portfolio B (30% in 3x-wstETH-Loop, Rest diversifiziert). Welches Portfolio würdest du persönlich bevorzugen und warum?

<details>
<summary>Antwort anzeigen</summary>

Portfolio A (kein Leverage): bei Bull-Markt 3 Jahre +30% bis +40%; bei neutralem Markt +12% bis +15%; bei Bear-Markt -5% bis -15%. Streuung relativ moderat, Drawdowns überschaubar. Portfolio B (30% Loop): bei Bull-Markt +50% bis +70%; bei neutralem Markt +13% bis +17%; bei Bear-Markt -25% bis -50%. Streuung viel größer, Drawdowns potenziell katastrophal. Die persönliche Präferenz hängt von mehreren Faktoren ab. Erstens: Risiko-Toleranz. Wer nachts ruhig schlafen will, wählt A. Wer maximalen erwarteten Wert sucht, könnte B in Erwägung ziehen. Zweitens: Zeit-Horizont. In sehr langfristigen Horizonten (10+ Jahre) mittelt sich vieles. In mittelfristigen (3-5 Jahre) sind die Bear-Markt-Verluste schwerer zu kompensieren. Drittens: Lebenssituation. Wenn das Portfolio einen großen Teil des Netto-Vermögens darstellt: A ist sicherer. Wenn es nur ein kleiner Teil ist: B's Volatilität ist eher tolerierbar. Viertens: psychologische Robustheit. Können Sie einen 50% Drawdown ertragen, ohne panisch zu reagieren? Wenn nein: A. Fünftens: Opportunitätskosten. Wenn der Loop-Erfolg Ihre andere Lebensqualität wegen Stress beeinträchtigt: A ist besser, auch wenn theoretisch B höhere Rendite bringt. Meine persönliche Empfehlung für die meisten konservativen Nutzer im Kontext des 7-8%-Ziels: A ist klar besser. Die Asymmetrie im Bear-Markt ist nicht akzeptabel für die geringen Vorteile in normalen Märkten. Portfolio A erreicht das 7-8%-Ziel in moderaten Bull-Phasen — das reicht. Portfolio B bringt Glück in extremen Bull-Markets, aber Katastrophen in Bear-Markets. Das Verhältnis Risk/Reward ist nicht günstig. Für eine kleine Minderheit von professionellen Nutzern mit großen Portfolios und klarer Risiko-Management-Disziplin könnte B die richtige Wahl sein. Aber das ist eine Minderheit, nicht der Standard. Die ehrliche konservative Empfehlung: Portfolio A.
</details>

---

## Modul-Zusammenfassung

Du hast in Modul 10 Leverage-Loops systematisch verstanden — von den Mechaniken bis zur ehrlichen Bewertung, wann sie nicht sinnvoll sind:

**Loop-Grundmechanik:** Ein Leverage-Loop hinterlegt ein Asset als Sicherheit, borgt ein anderes, tauscht es zurück in dasselbe Underlying und wiederholt. Resultat: effektive Position größer als Kapital. Klassischer Carry-Trade gehebelt. Fünf Loop-Typen, mit wstETH-ETH-Loop am relevantesten für konservative Strategien.

**wstETH-Loop-Praxis:** Aave V3 E-Mode für ETH-Correlated-Assets erlaubt LTV bis 93%. Theoretischer Max-Leverage = 1/(1-LTV). Konservative Praxis: 2-2,5x Leverage, HF 1,8-2,2, 75-80% des verfügbaren LTV. Zap-Services (DeFiSaver, Contango) machen Loops in einer Transaktion via Flash Loan — pragmatisch auf Mainnet.

**Leverage-Mathematik:** Netto-Rendite = Yield × Leverage - Borrow-Cost × (Leverage - 1). Break-Even bei Borrow = Yield. Loop-Profitabilität abhängig vom Spread zwischen Yield und Borrow-Rate. Spread kann sich plötzlich ändern, sogar negativ werden.

**Spezifische Loop-Risiken:** Fünf zusätzliche Risiken über einfaches Halten hinaus — Peg-Depeg (Juni 2022 -6% als historisches Beispiel), Zinssatz-Sprünge, Liquidations-Kaskaden, Smart-Contract-Kaskade durch mehrere Protokolle, Withdraw-Queue in Krisen. Insgesamt 7+ zusätzliche Risiko-Ebenen für etwa 2 Prozentpunkte zusätzliche Rendite.

**Praktisches Management:** Vorab-Dokumentation ist essenziell. Schrittweiser Aufbau (40/30/30). Drei-Stufen-Monitoring: täglich (1-2 Min), wöchentlich (10-15 Min), monatlich (30-45 Min). HAL.xyz für Alerts. Klare Rebalancing-Matrix für 6 Szenarien. Vier psychologische Fallen vermeiden: Hoffnung, Sunk-Cost, Überkonfidenz, Regelbruch.

**Wann NICHT loopen:** Nicht für Einsteiger, nicht ohne Disziplin, nicht ohne Monitoring-Budget, nicht für große Portfolio-Anteile, nicht wenn das 7-8%-Ziel auch anders erreichbar ist. Ein gut diversifiziertes Portfolio erreicht 7-8% in moderaten Bull-Markten ohne Liquidations-Risiko (Beispiel: 4,48% Yield + 3% ETH-Komponente = 7,48% bei +10% ETH). Die fünf Test-Fragen müssen alle "ja" beantwortet werden, bevor ein Loop sinnvoll ist.

**Asymmetrisches Risiko:** Loops bringen in Bull-Markten +8 Prozentpunkte zusätzliche Rendite gegenüber ohne. In Bear-Markten -15 Prozentpunkte zusätzlicher Verlust. Das ist nicht symmetrisch — der Verlust-Zuwachs ist emotional und finanziell schwerer zu ertragen als der Gewinn-Zuwachs angenehm ist.

**Die konservative Kernaussage:** Für die meisten DeFi-Nutzer sind Leverage-Loops nicht der richtige Weg zum 7-8%-Jahresziel. Diversifizierte Portfolios aus Stablecoin-Supply, Liquid Staking und LP-Strategien erreichen das Ziel mit deutlich geringerem Risiko. Wer Loops nutzt, sollte es mit substantieller Erfahrung, klaren Regeln und kleinen Portfolio-Anteilen tun. Die wichtigste Anwendung dieses Moduls für die meisten Lerner: zu verstehen, was Loops sind und wie sie funktionieren — um informierte Entscheidungen zu treffen, die in vielen Fällen "nicht nutzen" lauten werden.

**Was in Modul 11 kommt:** MEV (Maximal Extractable Value). Wir gehen tief in die unsichtbare Welt der Mempool-Operationen, Sandwich-Angriffe, Arbitrage-Bots und Searcher-Strategien. Wie MEV funktioniert, wie es DeFi-Nutzer beeinflusst, und wie man sich davor schützt — bzw. in fortgeschrittenen Strategien sogar davon profitiert.

---

*Ende von Modul 10.*
