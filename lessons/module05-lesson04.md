# V2-LP in der Praxis

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Eine V2-LP-Position eigenständig einrichten und überwachen
- Die passenden V2-Pools für konservative Strategien identifizieren
- Eine V2-LP-Position korrekt beenden und Gewinn/Verlust abrechnen
- Die Dashboard-Kennzahlen (Pool Share, Earned Fees, Position Value, IL-Proxy) auf DeBank/Zapper/Uniswap-Analytics korrekt interpretieren
- Die wichtigsten Smart-Contract-Risiken einer V2-LP-Position benennen und Mitigationsschritte anwenden
- Eine V2-LP-Position als Teil eines konservativen Portfolios dimensionieren (Kapitalanteil, Pool-Auswahl, Exit-Trigger)

## Erklärung

V2-LP-Positionen sind die einfachste Form von Marktmachen in DeFi. Sie sind weniger kapital-effizient als V3, aber für passive Nutzer oft besser geeignet — weil sie kein aktives Management erfordern.

**Schritt 1: Pool-Auswahl**

Für konservative Strategien sind sinnvolle V2-ähnliche Pools:
- ETH/USDC (hohe Liquidität, moderate Volatilität)
- ETH/USDT (ähnlich, leicht höheres Depeg-Risiko durch USDT)
- WBTC/ETH (krypto-natives Paar, hohe Korrelation)
- Liquid-Staking-Paare (stETH/ETH, wird eher auf Curve als auf V2 gehandelt)

**Nicht empfohlen für konservatives LP auf V2:**
- Neue oder kleine Token-Paare (hohe Volatilität, Rug-Risiko)
- Exotische oder Meme-Tokens (extreme IL)
- Pools mit TVL unter 1 Mio. USD (geringe Resilienz, hohe Gebühren-Volatilität)

**Schritt 2: Deployment**

Auf Uniswap V2 (oder Aerodrome V2 auf Base, Sushiswap, etc.):

1. Öffne die "Add Liquidity"-Seite
2. Wähle das Paar (z.B. ETH + USDC)
3. Gib den ETH-Betrag ein — USDC wird automatisch im aktuellen Verhältnis berechnet
4. Bestätige Approval (einmalig, wenn noch keine erteilt)
5. Bestätige die Add-Liquidity-Transaktion
6. Du erhältst LP-Tokens in deiner Wallet

**Gas-Kosten zu erwarten:** Approval ~10–30 USD, Add Liquidity ~20–50 USD auf Mainnet (niedriger auf Layer-2).

**Schritt 3: Monitoring**

Sinnvolle Tools zur Überwachung:

- **DeBank** (debank.com) — zeigt deine LP-Positionen und ihren aktuellen Wert
- **Zapper** (zapper.xyz) — ähnlich, mit IL-Tracking
- **APY.vision** — spezialisiert auf LP-Performance mit IL-Analyse
- **Uniswap-Interface** — direkt in der "Pools"-Ansicht

**Was du beobachten solltest:**
- Aktueller Wert der Position vs. Einlage
- Kumulierte Gebühren-Einnahmen
- Buy-and-Hold-Vergleichswert (was hätte die Einlage ohne LP gemacht)
- Preisänderung des volatilen Assets seit Einstieg

**Monatlicher Check ist oft ausreichend.** Tägliche Überwachung führt zu Überreaktion bei Marktbewegungen.

**Schritt 4: Ausstieg**

Um eine V2-LP-Position zu schließen:

1. Öffne die "Pool"-Seite auf Uniswap
2. Wähle deine Position
3. Klicke "Remove Liquidity"
4. Wähle den Prozentsatz (100% für kompletten Ausstieg)
5. Bestätige die Transaktion
6. Du erhältst die Tokens zurück im aktuellen Pool-Verhältnis

**Wichtige Überlegung:** Das aktuelle Verhältnis ist nicht das Einstiegs-Verhältnis. Wenn ETH gestiegen ist, hast du weniger ETH und mehr USDC als beim Einstieg (wegen des AMM-Rebalancings). Das ist die mechanische Auswirkung von IL.

**Schritt 5: Rechnung am Ende**

Nach dem Ausstieg sauber abrechnen:

```
Einlage-Wert: [ETH-Preis Start × ETH-Menge + USDC-Menge]
Auszahlungs-Wert: [ETH-Preis Ende × ETH-Menge Ende + USDC-Menge Ende]
Gebühren-Ertrag: Auszahlung − Einlage − IL
Buy-and-Hold-Wert: [ETH-Preis Ende × ETH-Menge Start + USDC-Menge Start]
IL (absolut): Buy-and-Hold − Auszahlung
Netto-Ergebnis: Auszahlung − Gas-Kosten − Einlage
```

Diese Rechnung zeigt dir, ob die Position tatsächlich profitabel war. Viele LPs überschätzen ihre Rendite systematisch, weil sie IL und Gas-Kosten ignorieren.

**V2-Specific: Time-Weighted Return**

Weil V2-LP-Tokens ihren Wert proportional zum Pool halten, ist die Berechnung vergleichsweise simpel. Die LP-Token-Anzahl bleibt konstant; ihr Wert ändert sich mit dem Pool. Deine Rendite ist:

```
Rendite = (LP-Token-Wert am Ende / LP-Token-Wert am Anfang) − 1
```

Das ist der Netto-Ertrag aus Gebühren (weil IL im LP-Token-Wert bereits reflektiert ist).

**Praktischer Anwendungsfall: ETH/USDC V2 Pool**

Szenario-Beispiel für einen konservativen LP:
- Einlage: 1 ETH + 3.000 USDC bei ETH = 3.000 (Wert 6.000 USDC)
- Halte-Zeit: 12 Monate
- ETH-Preisänderung: +10% (auf 3.300)
- Gebühren-Rendite im Jahr: 8% (auf Wertbasis)
- Gas-Kosten: ca. 100 USDC gesamt

**Rechnung:**
- IL bei 1,1x: ~0,1% → 6 USDC
- Gebühren-Ertrag: 8% × 6.000 = 480 USDC
- Netto: 480 − 6 − 100 = 374 USDC
- Netto-Rendite: 374 / 6.000 = 6,2%

Das ist im Ziel-Korridor von 7–8%, aber leicht darunter. Eine reine USDC-Position auf Aave hätte im gleichen Zeitraum möglicherweise 4–5% gebracht — ohne IL, ohne ETH-Exposure. Die Frage für den Nutzer: Wird die zusätzliche 1–2% Rendite die zusätzliche Komplexität und das IL-Risiko rechtfertigen?

## Folien-Zusammenfassung

**[Slide 1] — Titel**
V2-LP in der Praxis

**[Slide 2] — Pool-Auswahl**
Geeignet: ETH/USDC, ETH/USDT, WBTC/ETH
Nicht geeignet: neue Tokens, kleine TVL, Meme-Tokens

**[Slide 3] — Deployment**
Add Liquidity auf Uniswap V2 oder Aerodrome V2
Beide Tokens im Verhältnis einzahlen
Gas: 20–50 USD gesamt auf Mainnet

**[Slide 4] — Monitoring-Tools**
- DeBank — Übersicht
- Zapper — inkl. IL-Tracking
- APY.vision — LP-spezialisiert

**[Slide 5] — Ausstieg**
Remove Liquidity → Tokens im aktuellen Pool-Verhältnis
Nicht Einstiegs-Verhältnis — IL ist mechanisch sichtbar

**[Slide 6] — Saubere Rechnung**
Auszahlung − Einlage − Gas = Netto
Buy-and-Hold-Vergleich nicht vergessen

**[Slide 7] — Realistisches Szenario**
ETH +10%, 8% Gebühren, 0,1% IL, 100 USD Gas
→ 6,2% Netto-Rendite

## Sprechertext

**[Slide 1]** Du hast IL verstanden und die Netto-Rendite-Rechnung. Jetzt geht es an die Praxis. Wie baut man eine V2-LP-Position, überwacht sie und steigt wieder aus.

**[Slide 2]** Für konservative Strategien geeignete V2-Pools sind die großen Paare: ETH mit USDC oder USDT, WBTC mit ETH, und Liquid-Staking-Paare. Nicht geeignet sind neue oder kleine Token-Paare wegen extremem IL und Rug-Risiko, exotische Tokens, und Pools unter einer Million TVL wegen geringer Resilienz.

**[Slide 3]** Das Deployment ist einfach. Auf Uniswap V2 oder einem V2-ähnlichen Protokoll wie Aerodrome V2 auf Base oder Sushiswap: Add-Liquidity-Seite öffnen, Paar wählen, ETH-Betrag eingeben — der zweite Token wird automatisch im aktuellen Verhältnis berechnet. Approval und Add-Transaction bestätigen. Du bekommst LP-Tokens in die Wallet. Gas-Kosten auf Mainnet 20 bis 50 Dollar gesamt, auf Layer-2s deutlich weniger.

**[Slide 4]** Für Monitoring gibt es drei gute Tools. DeBank zeigt dir deine LP-Positionen mit aktuellem Wert. Zapper macht ähnliches und trackt zusätzlich Impermanent Loss. APY.vision ist spezialisiert auf LP-Performance mit detaillierter IL-Analyse. Monatlicher Check ist oft ausreichend — tägliche Überwachung führt zu Überreaktion.

**[Slide 5]** Der Ausstieg. Remove Liquidity in der Pool-Ansicht. Du erhältst die Tokens im aktuellen Pool-Verhältnis — nicht im Einstiegs-Verhältnis. Wenn ETH gestiegen ist, bekommst du weniger ETH und mehr USDC als beim Einstieg. Das ist IL, mechanisch sichtbar in deinen Rückgabemengen.

**[Slide 6]** Rechne sauber ab. Auszahlungs-Wert minus Einlage-Wert minus Gas-Kosten ergibt die Netto-Rendite aus Sicht der LP-Position. Vergleiche zusätzlich mit Buy-and-Hold, um zu sehen, ob die Position objektiv eine gute Entscheidung war.

**[Slide 7]** Ein realistisches Szenario. ETH steigt 10 Prozent, Gebühren im Jahr 8 Prozent, IL 0,1 Prozent, Gas 100 Dollar. Netto-Rendite 6,2 Prozent. Das ist im Ziel-Korridor, aber knapp. Vergleich: reine USDC-Supply auf Aave hätte 4 bis 5 Prozent gebracht, ohne IL, ohne Komplexität. Die Frage: Rechtfertigt die zusätzliche 1 bis 2 Prozent die zusätzliche Komplexität? Eine ehrliche Antwort ist oft: nein, es sei denn, du hast klare ETH-Exposure-Wünsche.

## Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Tabelle mit "Geeignet" und "Nicht geeignet" Pool-Kategorien.

**[Slide 3]** **SCREENSHOT SUGGESTION:** Uniswap-Add-Liquidity-Interface mit ETH/USDC-Paar.

**[Slide 4]** **SCREENSHOT SUGGESTION:** DeBank-Portfolio-Ansicht mit sichtbaren LP-Positionen. Alternativ APY.vision.

**[Slide 5]** Vergleichs-Diagramm: Verhältnis bei Einstieg vs. Auszahlung bei +25% ETH-Preis.

**[Slide 6]** Rechnungs-Template zum Abarbeiten.

**[Slide 7]** Vergleichs-Balkendiagramm: LP-Netto vs. Buy-and-Hold vs. USDC-Supply auf Aave.

## Übung

**Aufgabe: V2-LP-Strategie planen**

Ohne echtes Kapital einzusetzen, plane schriftlich eine V2-LP-Strategie:

1. Welchen Pool würdest du wählen und warum?
2. Wie viel Kapital würdest du committen? (Gesamt und pro Token-Seite)
3. Welche Halte-Dauer planst du?
4. Welche Monitoring-Tools nutzt du, mit welcher Frequenz?
5. Welche Exit-Trigger hast du definiert? (z.B. "wenn ETH +50%", "wenn Gebühren-Rendite unter 5% fällt", "wenn IL über 5%")
6. Welche Gas-Budget-Grenze setzt du dich?

**Deliverable:** Strategiedokument (1–2 Seiten) mit den 6 Punkten klar adressiert. Zusätzlich: Einschätzung, ob diese Strategie realistisch die Ziel-Rendite von 7–8% erreichen kann.

## Quiz

**Frage 1:** Warum ist ein monatlicher LP-Check oft besser als täglicher?

<details>
<summary>Antwort anzeigen</summary>

Täglicher Check führt zu Überreaktion auf Kurz-Schwankungen. Ein LP sieht, dass ETH kurzfristig 10% gefallen ist, fürchtet weitere Verluste und schließt die Position zum ungünstigsten Zeitpunkt. Monatlicher Check erfasst echte Trends, ignoriert Tagesrauschen und erlaubt rationalere Entscheidungen. Zusätzlich: jeder Exit und Re-Entry kostet Gas. Häufige Umplatzierungen fressen die Rendite. Monatliche Überwachung ist außerdem konsistent mit der Zeitskala, auf der LP-Erträge realistisch akkumulieren — eine gute Position entwickelt sich über Monate, nicht Tage.
</details>

**Frage 2:** Eine V2-LP-Position hat nach 6 Monaten einen LP-Token-Wert, der 5% höher ist als bei Einstieg. Der unterliegende Asset-Preis ist ebenfalls um 20% gestiegen. Was ist die tatsächliche Rendite für den LP, und wie vergleicht sie mit Buy-and-Hold?

<details>
<summary>Antwort anzeigen</summary>

Die LP-Rendite ist 5% (aus dem LP-Token-Wert-Anstieg, der bereits Gebühren und IL reflektiert). Buy-and-Hold: Bei 20% Asset-Anstieg und der typischen 50/50-Einlage wäre der Buy-and-Hold-Wert um etwa 10% höher als der Einstiegswert gestiegen (weil nur die Hälfte im volatilen Asset war). LP-Rendite 5% vs. Buy-and-Hold-Rendite 10%. Buy-and-Hold hat um 5 Prozentpunkte gewonnen. Der Grund: Der IL bei 1,2x ist etwa 0,4%, also überschaubar, aber die eigentliche Underperformance kommt daher, dass der LP die ETH-Exposure mechanisch verringert hat durch Rebalancing. Der LP verdient Gebühren, aber verliert Upside-Exposure.
</details>

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Slides: Titel → V2-LP-Einrichtung Schritt für Schritt → Pool-Auswahl-Kriterien → Dashboard-Kennzahlen → Monitoring-Routine → Position schließen → Smart-Contract-Risiko-Checkliste
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — Uniswap-V2-Add-Liquidity-Screenshot, Pool-Auswahl-Matrix, DeBank/Zapper-Dashboard, Position-schließen-Flow, Risk-Checkliste

Pipeline: Gamma → ElevenLabs → CapCut.

---
