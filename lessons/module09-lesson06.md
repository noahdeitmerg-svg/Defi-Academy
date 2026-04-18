# Konservative Yield-Strategien für das 7–8%-Ziel

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Eine vollständige Yield-Strategie über mehrere Bausteine konstruieren
- Realistische Renditeerwartungen nach Portfolio-Allokation einschätzen
- Eine persönliche Yield-Strategie an eigene Präferenzen anpassen
- Die Yield-Quellen eines Portfolios nach Sustainable vs. Temporary aufschlüsseln und die tatsächliche Nachhaltigkeit quantifizieren
- Eine Korrelations-Matrix der Yield-Bausteine aufbauen, um konzentrierte Ausfallrisiken zu vermeiden
- Monitoring- und Rebalancing-Protokoll für eine 7–8%-Yield-Strategie konsistent anwenden

## Erklärung

Diese letzte Lektion bringt alle vorherigen Bausteine zusammen. Das Ziel: eine realistische, konservative Yield-Strategie mit ~7–8% Jahresrendite, unter Nutzung der verschiedenen in diesem und vorigen Modulen behandelten Primitives.

**Die ehrliche Einordnung**

Bevor wir Strategien konstruieren: ein klares Wort. Das 7–8%-Jahresziel ist:
- **Erreichbar** bei durchdachter Kombination mehrerer Strategien
- **Nicht garantiert** — Markt-Zyklen, Protokoll-Events und unvorhergesehene Risiken können das Ergebnis beeinflussen
- **Ein mittlerer Wert** — in Bear-Markets (wenn ETH fällt) kann die Gesamtrendite unter 7% liegen; in Bull-Markets deutlich darüber
- **Nicht durch eine einzelne Strategie erreichbar** — Diversifikation über Strategie-Typen ist notwendig

**Strategie A: Die Minimalist-Variante**

Einfachheit bevor Optimierung.

**Allokation (20.000 USD):**
- 40% USDC-Supply auf Aave V3: 8.000 USD @ 4%
- 30% wstETH via Lido: 6.000 USD @ 3,5% Yield + ETH-Exposure
- 20% sDAI via Spark: 4.000 USD @ 5%
- 10% Wallet-Reserve: 2.000 USD @ 0%

**Yield-Beitrag:**
- USDC: 320 USD
- wstETH: 210 USD (nur Staking-Yield)
- sDAI: 200 USD
- Gesamt: 730 USD = 3,65% annualisierte Yield-Rendite

**ETH-Preis-Beitrag (angenommen neutral bis +10% pro Jahr):**
- 0% → 0 USD
- +10% → 600 USD (10% von 6.000 wstETH)

**Gesamt-Rendite:**
- Bei neutralem ETH: 3,65%
- Bei +10% ETH: 6,65%
- Bei +30% ETH: 12,65%
- Bei −10% ETH: ~2,65%

**Bewertung:** Erreicht 7–8% nur bei ETH-Aufwärtsbewegung. In Bull-Markets natürlich erreichbar, in Bear-Markets deutlich darunter.

**Strategie B: Die Balanced-Variante**

Mehr Diversifikation, etwas mehr Komplexität.

**Allokation (20.000 USD):**
- 25% USDC-Supply auf Aave V3: 5.000 USD @ 4%
- 15% Morpho Blue USDC Vault (Steakhouse): 3.000 USD @ 6%
- 15% sDAI via Spark: 3.000 USD @ 5%
- 10% PT-USDC (6 Monate Fälligkeit): 2.000 USD @ 7% fixed
- 20% wstETH via Lido: 4.000 USD @ 3,5%
- 10% rETH via Rocket Pool: 2.000 USD @ 3,3%
- 5% Wallet-Reserve: 1.000 USD @ 0%

**Yield-Beitrag:**
- USDC-Aave: 200 USD
- Morpho-Vault: 180 USD
- sDAI: 150 USD
- PT-USDC: 140 USD
- wstETH: 140 USD
- rETH: 66 USD
- Gesamt: 876 USD = 4,4% Yield-Rendite

**Mit ETH-Bewegungs-Szenarien:**
- Neutrales ETH: 4,4%
- +10% ETH: 7,4%
- +20% ETH: 10,4%
- −10% ETH: 1,4%

**Bewertung:** Erreicht 7–8% bei ETH-Aufwärtsbewegung von 10%+. Solide Diversifikation.

**Strategie C: Die Yield-Maximierte Variante**

Höhere Yield-Komponente durch höher-verzinsliche Bausteine.

**Allokation (20.000 USD):**
- 20% USDC-Supply auf Aave V3: 4.000 USD @ 4%
- 15% Morpho Blue USDC Vault: 3.000 USD @ 6%
- 10% sDAI via Spark: 2.000 USD @ 5%
- 10% PT-sUSDe (6 Monate): 2.000 USD @ 12% fixed
- 15% Curve 3pool + Convex Boost: 3.000 USD @ 6%
- 15% weETH (EtherFi): 3.000 USD @ 4,5% + ETH-Exposure
- 10% rETH: 2.000 USD @ 3,3% + ETH-Exposure
- 5% Wallet-Reserve: 1.000 USD @ 0%

**Yield-Beitrag:**
- USDC-Aave: 160 USD
- Morpho: 180 USD
- sDAI: 100 USD
- PT-sUSDe: 240 USD
- Curve+Convex: 180 USD
- weETH: 135 USD (plus Restaking-Reward-Komponente)
- rETH: 66 USD
- Gesamt: 1.061 USD = 5,3% Yield-Rendite

**Mit ETH-Bewegung:**
- Neutral: 5,3%
- +10% ETH: 7,8%
- −10% ETH: 2,8%

**Bewertung:** Erreicht 7–8% bereits bei moderater ETH-Bewegung. Aber: höhere Komplexität (7 Positionen), mehr Monitoring-Aufwand, und sUSDe plus LRT-Exposure bringen zusätzliche Risiko-Ebenen.

**Welche Strategie für wen?**

**Strategie A — Minimalist:**
- Einsteiger
- Zeit-arme Nutzer (< 1h/Monat Management)
- Komplette Risiko-Aversion
- Akzeptiert 7–8% nur in Bull-Markets

**Strategie B — Balanced:**
- Mittlere Erfahrung
- Moderates Zeit-Budget (2–3h/Monat)
- Ausgewogene Risiko-Bereitschaft
- Zielt auf robuste 4–7% Baseline plus ETH-Aufwärts-Optionalität

**Strategie C — Yield-Maximiert:**
- Fortgeschrittene Nutzer
- Höheres Zeit-Budget (5+ h/Monat)
- Bereit, Komplexitäts-Risiken für Rendite zu akzeptieren
- Besseres Erreichen des 7–8% Ziels in allen Marktphasen

**Die wichtigsten Regeln unabhängig von der Strategie**

1. **Diversifikation über Protokolle:** Keine Position sollte >30% des Portfolios sein.
2. **Diversifikation über Mechanismen:** Mix aus Lending, Staking, LP, Fixed Yield.
3. **Reserve halten:** Mindestens 5–10% in leicht zugänglicher Form.
4. **Monatliches Monitoring:** Portfolio-Check, News, Rebalancing.
5. **Exit-Trigger definieren:** Klare Schwellen, wann Positionen aufgelöst werden.
6. **Realistische Erwartungen:** 7–8% ist Ziel, nicht Garantie.

**Rebalancing und Anpassung**

Konservative Yield-Strategien sind nicht "set and forget". Quartalsweise Rebalancing-Prüfung:

**Quartalsweise Review:**
- Ist eine einzelne Position über 35% gewachsen? Umschichten.
- Haben sich APYs signifikant verschoben? Eventuelle Umschichtungen prüfen.
- Gab es Protokoll-Events, die Risiko-Bewertungen verändert haben?
- Passt das Portfolio zur aktuellen Lebens-Situation (Zeit-Budget, Kapital-Bedarf)?

**Jährliche Strategie-Revision:**
- Erreicht die Strategie die Rendite-Ziele über die letzten 12 Monate?
- Sind neue Bausteine aufgetaucht, die sinnvoll zu integrieren sind?
- Haben sich Markt-Strukturen verändert, die andere Allokationen erfordern?

**Der Bär-Markt-Test**

Jede Strategie sollte den "Bär-Markt-Test" bestehen: Wie sieht das Portfolio aus, wenn ETH 50% fällt über 12 Monate?

**Strategie A im Bär-Markt:**
- wstETH-Position: −50% auf Preis, +3,5% Yield-Kompensation → netto −46,5% auf 30%-Anteil
- Stablecoin-Positionen: stabil, etwa +4,5% auf 60%-Anteil
- Gesamt-Portfolio: ca. −11%

**Strategie B im Bär-Markt:**
- ETH-Exposition: 30% mit wstETH+rETH, −50% auf Preis, +3,5% Yield → netto −46,5% auf diesem Anteil
- Stablecoin-Positionen: stabil, etwa +5% auf 65%-Anteil
- Gesamt-Portfolio: ca. −11%

**Strategie C im Bär-Markt:**
- ETH-Exposition: 25% über wstETH+rETH+weETH, −50% mit Yield-Kompensation
- Stablecoin-Positionen: stabil
- Gesamt-Portfolio: ca. −10%

Alle drei Strategien sind im Bär-Markt strukturell robust, aber nicht negativ-null-setting. Das ist die Realität: Portfolios mit ETH-Exposition verlieren in ETH-Bär-Markets Wert, unabhängig von den Yield-Strategien. Der Unterschied zu konzentrierten Portfolios: konservativer Yield-Mix begrenzt die Verluste deutlich.

## Folien-Zusammenfassung

**[Slide 1] — Titel**
Konservative Yield-Strategien für das 7–8%-Ziel

**[Slide 2] — Die ehrliche Einordnung**
7–8% erreichbar, nicht garantiert
Durchschnitt, nicht konsistent
Erfordert Diversifikation, nicht Einzel-Strategie

**[Slide 3] — Strategie A: Minimalist**
40% USDC, 30% wstETH, 20% sDAI, 10% Reserve
Yield 3,65%, 7–8% nur bei ETH-Aufwärts

**[Slide 4] — Strategie B: Balanced**
Mix aus 6 Positionen
Yield 4,4%, 7–8% bei moderatem ETH-Anstieg

**[Slide 5] — Strategie C: Yield-Maximiert**
7 Positionen inklusive PT und LRT
Yield 5,3%, 7–8% bereits bei geringer ETH-Bewegung
Höhere Komplexität

**[Slide 6] — Nutzer-Profile**
A: Einsteiger, zeit-arm
B: mittlere Erfahrung
C: fortgeschritten, höheres Zeit-Budget

**[Slide 7] — Die 6 Regeln**
Diversifikation Protokolle, Mechanismen, Reserve, Monatlich monitoren, Exit-Trigger, realistisch

**[Slide 8] — Bär-Markt-Test**
ETH −50% → Portfolio ca. −10 bis −11%
Strukturell robust, aber nicht null-Verlust

## Sprechertext

**[Slide 1]** Die letzte Lektion dieses Moduls. Wir bringen alle Bausteine zusammen zu realistischen, konservativen Yield-Strategien. Keine abstrakte Theorie — konkrete Allokationen mit Zahlen.

**[Slide 2]** Die ehrliche Einordnung zuerst. Das 7 bis 8 Prozent Jahresziel ist erreichbar, aber nicht garantiert. Es ist ein Durchschnittswert, kein konsistentes Monatsergebnis. In Bear-Markets fällt es unter 7 Prozent, in Bull-Markets deutlich darüber. Und wichtig: es ist nicht durch eine einzelne Strategie erreichbar — Diversifikation über Strategie-Typen ist notwendig.

**[Slide 3]** Strategie A, die Minimalist-Variante. 40 Prozent USDC-Supply auf Aave, 30 Prozent wstETH via Lido, 20 Prozent sDAI via Spark, 10 Prozent Wallet-Reserve. Yield-Rendite etwa 3,65 Prozent. Das 7 bis 8 Prozent Ziel wird hier nur erreicht, wenn ETH im Jahr 10 Prozent oder mehr steigt. In neutralen oder fallenden Markt-Phasen bleibt die Gesamt-Rendite unter dem Ziel. Einfachste Strategie, geringste Komplexität.

**[Slide 4]** Strategie B, die Balanced-Variante. Sechs Positionen über Aave, Morpho Blue Vault, sDAI, PT-USDC auf Pendle, wstETH und rETH. Yield-Rendite etwa 4,4 Prozent. 7 bis 8 Prozent werden bei moderatem ETH-Anstieg von 10 Prozent erreicht. Solide Diversifikation, mittlere Komplexität.

**[Slide 5]** Strategie C, die Yield-Maximierte Variante. Sieben Positionen inklusive PT-sUSDe, Curve-Convex-LP und weETH als LRT. Yield-Rendite etwa 5,3 Prozent. 7 bis 8 Prozent werden bereits bei geringer ETH-Bewegung erreicht. Aber: höhere Komplexität mit mehr Monitoring-Aufwand und zusätzlichen Risiko-Ebenen durch sUSDe und LRT-Exposure.

**[Slide 6]** Welche Strategie passt zu welchem Nutzer. A für Einsteiger und zeit-arme Nutzer unter einer Stunde Management pro Monat. B für mittlere Erfahrung und 2 bis 3 Stunden pro Monat. C für fortgeschrittene Nutzer mit 5 oder mehr Stunden pro Monat. Die Wahl ist individuell — es gibt keine objektiv beste Option.

**[Slide 7]** Sechs Regeln unabhängig von der Strategie. Diversifikation über Protokolle — keine Position über 30 Prozent. Diversifikation über Mechanismen — Mix aus Lending, Staking, LP, Fixed Yield. Reserve halten, mindestens 5 bis 10 Prozent. Monatliches Monitoring. Exit-Trigger klar definiert. Und realistische Erwartungen — 7 bis 8 Prozent ist Ziel, nicht Garantie.

**[Slide 8]** Der Bär-Markt-Test. Wenn ETH 50 Prozent fällt über 12 Monate, alle drei Strategien zeigen ähnliche Verluste von etwa 10 bis 11 Prozent. Das ist strukturell robust, aber kein Null-Verlust. Portfolios mit ETH-Exposure verlieren in Bär-Markets Wert — das ist unvermeidlich. Der Unterschied zu konzentrierten Portfolios: der konservative Mix begrenzt die Verluste deutlich.

## Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Realismus-Dreieck: Ziel, Durchschnitt, Diversifikation als drei notwendige Säulen.

**[Slide 3]** Kuchendiagramm Strategie A mit Rendite-Bereichen je Marktszenario.

**[Slide 4]** Kuchendiagramm Strategie B mit Rendite-Bereichen.

**[Slide 5]** Kuchendiagramm Strategie C mit Rendite-Bereichen.

**[Slide 6]** Drei-Profile-Tabelle mit Empfehlung.

**[Slide 7]** Sechs-Regeln-Checkliste.

**[Slide 8]** Bär-Markt-Stress-Test-Tabelle.

## Übung

**Aufgabe: Persönliche Yield-Strategie konstruieren**

Entwirf deine persönliche Yield-Strategie:

1. **Eigene Parameter:**
 - Kapital-Rahmen
 - Risiko-Toleranz (1–10)
 - Zeit-Budget pro Monat
 - Persönliche Rendite-Ziele

2. **Strategie-Wahl:**
 - A, B, oder C als Ausgangspunkt
 - Oder eigene Mischung

3. **Konkrete Allokation:**
 - Prozent-Aufteilung
 - Geplante Protokolle
 - Erwartete Rendite pro Position

4. **Monitoring-Plan:**
 - Frequenz
 - Was geprüft wird
 - Rebalancing-Trigger

5. **Bär-Markt-Analyse:**
 - Was passiert bei ETH −30%?
 - Was bei ETH −50%?
 - Bist du psychisch darauf vorbereitet?

6. **Realistische 12-Monats-Erwartung:**
 - Bei neutralem Markt
 - Bei moderatem Bull-Markt
 - Bei moderatem Bear-Markt

**Deliverable:** Strategie-Dokument (2–3 Seiten) mit allen sechs Punkten strukturiert adressiert.

## Quiz

**Frage 1:** Warum ist die Aussage "Strategie C bringt 5,3% Yield, also ist sie besser als Strategie A mit 3,65%" irreführend?

<details>
<summary>Antwort anzeigen</summary>

Die reine Yield-Zahl ignoriert mehrere wichtige Faktoren. Erstens: Risiko-Adjustierung. Strategie C erreicht die höhere Rendite durch zusätzliche Risiko-Schichten — sUSDe mit Ethena-spezifischen Risiken, LRT mit Restaking-Komplexität, mehr Protokoll-Abhängigkeiten. Die zusätzlichen 1,65 Prozentpunkte Yield kompensieren diese zusätzlichen Risiken, garantieren aber nicht besseren risk-adjusted return. Zweitens: Zeit-Aufwand. Strategie C erfordert 5+ Stunden pro Monat; Strategie A unter 1 Stunde. Wenn der Zeit-Aufwand den Rendite-Vorteil nicht wert ist, ist A besser. Drittens: Robustheit unter Stress. In Extrem-Ereignissen (wie dem Juni-2022-stETH-Depeg oder hypothetischen sUSDe-Problemen) verliert Strategie C möglicherweise mehr als A, weil mehr Komponenten stress-exponiert sind. Viertens: Psychologische Komponente. Eine komplexere Strategie führt eher zu Fehlentscheidungen unter Stress (Panic-Entscheidungen, Fehler beim Rebalancing). Einfache Strategien sind leichter konsistent umzusetzen. "Besser" hängt vom Nutzer ab — Zeit, Risiko-Toleranz, Expertise, psychologische Robustheit. Die reine Yield-Zahl ist nur ein Faktor unter vielen.
</details>

**Frage 2:** Warum sollte jede konservative Yield-Strategie einen Bär-Markt-Test bestehen, auch wenn die primären Rendite-Erwartungen für neutrale oder positive Märkte gelten?

<details>
<summary>Antwort anzeigen</summary>

Weil Bär-Markts der Stresstest für jede Strategie sind und die Zeit, in der schlechte Entscheidungen passieren. Drei Gründe. Erstens: reale Szenarien. Krypto hat 2-3 große Bärmärkte pro Dekade mit 50-80% Drawdowns. Das ist keine Ausnahme, sondern Normalfall. Eine Strategie muss das überleben können. Zweitens: psychologische Vorbereitung. Wer in Panik reagiert — Positionen am Tiefpunkt verkauft, überhastet umschichtet — realisiert die temporären Verluste permanent. Wer vorher durchrechnet "bei ETH −50%, was passiert mit meinem Portfolio" ist mental besser vorbereitet und reagiert rationaler. Das ist keine Theorie — historische Daten zeigen, dass Panic-Verkäufe am Tiefpunkt einer der Haupttreiber permanenter Verluste sind. Drittens: Portfolio-Validierung. Wenn der Bär-Markt-Test zeigt, dass die Strategie −30% Portfolio-Wert bringt, aber der Nutzer das nicht akzeptieren kann, ist die Strategie falsch konstruiert. Entweder ETH-Exposition reduzieren (mehr Stables), oder andere Hedging-Strategien einfügen. Besser jetzt korrigieren als im Bär-Markt panisch reagieren. Konservativer Ansatz: jede neue Allokation durch einen Bär-Markt-Test laufen lassen. Die Frage "kann ich das emotional und finanziell aushalten?" ist wichtiger als die Frage "welche Rendite bringt das in Bull-Markets?".
</details>

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → Strategie-Aufbau → Portfolio-Beispiele A/B/C → Yield-Source-Breakdown → Realistische Renditeziele → Monitoring-Protokoll → Bär-Markt-Test
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 11–13 Min.)
- `visual_plan.json` — Strategie-Aufbau-Pyramide, Portfolio-Pie-Charts A/B/C, Yield-Breakdown-Chart, Rendite-Erwartungen-Matrix, Bär-Markt-Stress-Test-Simulation

Pipeline: Gamma → ElevenLabs → CapCut.

---
