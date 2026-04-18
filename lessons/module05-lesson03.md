# Die wahre Rendite: Fees vs. IL

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die korrekte Netto-Rendite-Formel für LPs anwenden
- Realistische Renditen verschiedener LP-Typen einschätzen
- Erkennen, wann LP-Sein im Vergleich zu Buy-and-Hold unterliegt
- Ein vollständiges LP-Profitability-Rechenbeispiel (inkl. Fees, Rewards, IL, Gas) für eine reale Position durchführen
- Sustainable Yield (echte Fee-Generierung) von Temporary Yield (Token-Emissionen, Incentives) unterscheiden
- Anhand historischer Pool-Daten (DeFiLlama, Uniswap-Analytics) die erwartbare Netto-Rendite eines LP-Typs einschätzen

## Erklärung

Die meisten Farm-APY-Anzeigen zeigen nur den Bruttoertrag aus Gebühren (oder Gebühren + Rewards). Die echte Rendite muss IL abziehen. Diese Lektion gibt dir die Werkzeuge für die saubere Rechnung.

**Die Netto-Rendite-Formel**

Für einen LP über einen Zeitraum gilt:

```
Netto-Rendite = Gebühren-Rendite + Reward-Rendite − Impermanent Loss − Gas-Kosten
```

Oft vergessen wird:
- **Gas-Kosten** für Einzahlung, Reward-Claims, eventuell Position-Anpassung, Auszahlung
- **Steuer-Implikationen** auf realisierte Gewinne (länderabhängig)
- **Token-Inflation** bei Reward-Tokens

**Beispielrechnung: ETH/USDC-V2-Pool über ein Jahr**

Gehe von einer fiktiven, aber realistischen Situation aus:
- ETH-Preis zu Beginn: 3.000 USDC
- ETH-Preis am Ende: 4.500 USDC (+50%)
- Einlage: 1 ETH + 3.000 USDC (Wert 6.000 USDC)
- Gebühren-Rendite über das Jahr: 15% (annualisiert)
- Keine Rewards
- Gas-Kosten gesamt: 50 USDC

**Bruttoertrag aus Gebühren:** 15% × 6.000 = 900 USDC

**IL bei 1,5x:** 2,0% → 120 USDC (auf den Endwert gerechnet, hier vereinfacht)

**Netto-LP-Wert am Ende:** 
- Gebühren-Rendite setzt den Pool auf einen etwas höheren Wert
- Komplexer genau zu berechnen; vereinfacht:
- Start: 6.000 USDC + Gebühren 900 − IL 120 − Gas 50 = 6.730 USDC

**Vergleich mit Buy-and-Hold:**
- 1 ETH bei 4.500 + 3.000 USDC = 7.500 USDC

**Ergebnis:** Buy-and-Hold liegt bei 7.500, LP bei 6.730. LP unterliegt um 770 USDC, trotz 15% Gebühren-Rendite.

**Die bittere Wahrheit:** In vielen aktiven DeFi-Zeiträumen mit moderatem Preis-Uptrend hat Buy-and-Hold LP-Sein geschlagen. Das gilt besonders auf volatilen Paaren wie ETH-Stablecoin.

**Wann LP-Sein gewinnt**

Damit LP über Buy-and-Hold gewinnt, müssen die Gebühren **deutlich** höher sein als der IL. Beispielszenarien:

**Szenario A: Stabiler Preis (ETH bleibt bei 3.000)**
- IL: 0%
- Gebühren: 15%
- LP schlägt Buy-and-Hold deutlich.

**Szenario B: Moderate Bewegung (ETH 3.000 → 3.300, +10%)**
- IL: ~0,1%
- Gebühren: 15%
- LP schlägt Buy-and-Hold leicht.

**Szenario C: Starker Uptrend (ETH 3.000 → 6.000, +100%)**
- IL: 5,7%
- Gebühren: 15%
- LP unterliegt Buy-and-Hold deutlich — weil der IL nur ein Teil des Unterschieds ist; der LP hat auch weniger ETH am Ende (er hat zu früh verkauft).

**Szenario D: Seitwärts mit hohem Volumen**
- IL: ~0%
- Gebühren: 25% (wenn Pool-Volumen überdurchschnittlich)
- LP gewinnt stark.

**Die Kern-Regel:** LP ist eine Wette, dass die Volatilität niedriger bleibt als die Gebühren kompensieren. Auf trendstarken volatilen Paaren verliert LP fast immer gegen Buy-and-Hold.

**Wie man realistische Gebühren-Renditen einschätzt**

DefiLlama und info.uniswap.org zeigen für jeden Pool:
- 24h-Gebühren
- TVL
- Implizite annualisierte Rendite (24h-Fees / TVL × 365)

**Wichtige Vorbehalte:**
- Historische Rendite ≠ zukünftige Rendite
- Handelsvolumen variiert stark über Marktzyklen
- Bei neuen Pools mit wenig TVL sind Gebühren überrepräsentiert

**Realistische Bereiche nach Pool-Typ:**

| Pool-Typ | Typische Gebühren-Rendite |
|---|---|
| Stablecoin-Stablecoin (USDC/USDT auf Curve) | 2–5% |
| Liquid-Staking-Paare (stETH/ETH auf Curve) | 2–6% |
| ETH/Stablecoin-Majors (Uniswap V2) | 5–15% |
| ETH/Stablecoin-Majors (Uniswap V3 passend positioniert) | 8–25% |
| Volatile Long-Tail-Paare | 10–50% (aber hohes IL-Risiko) |

Die höheren Zahlen sind nur bei sehr großem Volumen oder engen V3-Positionen erreichbar. Die durchschnittliche nachhaltige Rendite für konservative LP liegt zwischen 3 und 10% — **nach** IL-Abzug.

**Das entscheidende Test-Kriterium**

Bevor du einer Position beitrittst, stelle dir drei Fragen:
1. Wie volatil ist das Paar über typische Zeiträume (Quartal, Jahr)?
2. Wie hoch sind die Gebühren-Renditen historisch?
3. Schlägt die erwartete Gebühren-Rendite den erwarteten IL deutlich?

Wenn die Antwort auf 3 unklar ist: nicht LP werden. Halte stattdessen die Tokens oder nutze eine andere Strategie (Lending, Staking).

## Folien-Zusammenfassung

**[Slide 1] — Titel**
Die wahre Rendite: Fees vs. IL

**[Slide 2] — Die Formel**
Netto-Rendite = Gebühren + Rewards − IL − Gas

**[Slide 3] — Beispielrechnung**
ETH +50%, 15% Gebühren, 2% IL
Ergebnis: LP unterliegt Buy-and-Hold um 770 USDC.

**[Slide 4] — Vier Szenarien**
A: Stabil → LP gewinnt klar
B: Moderate Bewegung → LP leicht voraus
C: Starker Trend → LP unterliegt klar
D: Seitwärts + Volumen → LP gewinnt stark

**[Slide 5] — Die Kern-Regel**
LP = Wette auf niedrige Volatilität vs. kompensierende Gebühren.
Trendstarke volatile Paare verlieren fast immer.

**[Slide 6] — Realistische Renditen**
Stables: 2–5%
Liquid-Staking: 2–6%
Majors V2: 5–15%
Majors V3 (aktiv): 8–25%

**[Slide 7] — Test-Kriterium**
Übersteigt erwartete Gebühren den erwarteten IL deutlich?
Wenn unklar: nicht LP werden.

## Sprechertext

**[Slide 1]** Nachdem du IL verstehst, musst du die vollständige Netto-Rendite-Rechnung beherrschen. Die meisten Farm-APY-Anzeigen täuschen — sie zeigen Brutto, nicht Netto. Der Unterschied kann enorm sein.

**[Slide 2]** Die Formel. Netto-Rendite gleich Gebühren-Rendite plus Reward-Rendite minus Impermanent Loss minus Gas-Kosten. Oft vergessen: Gas für Einzahlung, Reward-Claims, Position-Anpassung, Auszahlung. Bei kleineren Positionen können die Gas-Kosten einen signifikanten Teil der Rendite auffressen.

**[Slide 3]** Eine Beispielrechnung. ETH/USDC-Pool, ETH steigt von 3.000 auf 4.500 über ein Jahr. Einlage 6.000 USDC. Gebühren-Rendite 15 Prozent über das Jahr, also 900 USDC. IL bei 1,5x ist 2 Prozent, also 120 USDC Verlust. Gas 50 USDC. Netto-LP-Wert: 6.730. Buy-and-Hold-Wert: 7.500. Der LP unterliegt um 770 USDC — trotz 15 Prozent Gebühren-Rendite.

**[Slide 4]** Vier Szenarien zur Orientierung. Szenario A, stabile Preise — LP gewinnt klar, weil kein IL, aber volle Gebühren. Szenario B, moderate Bewegung, LP leicht voraus. Szenario C, starker Uptrend, LP unterliegt klar — die Gebühren reichen nicht, um den IL und die verpasste Preis-Exposure zu kompensieren. Szenario D, Seitwärts mit hohem Volumen — LP gewinnt stark, hier ist das Ideal.

**[Slide 5]** Die Kern-Regel zum Merken: LP-Sein ist eine Wette, dass die Volatilität niedriger bleibt als die Gebühren es kompensieren. Auf trendstarken volatilen Paaren verliert LP fast immer gegen Buy-and-Hold. Das ist historisch belegt, nicht eine theoretische Sorge.

**[Slide 6]** Realistische Rendite-Bereiche nach Pool-Typ. Stablecoin-Paare: 2 bis 5 Prozent. Liquid-Staking-Paare: 2 bis 6. ETH-Stablecoin V2: 5 bis 15. ETH-Stablecoin V3 aktiv gemanaged: 8 bis 25. Volatile Long-Tail-Paare: 10 bis 50, aber mit hohem IL-Risiko, Netto oft viel weniger. Für konservative LP liegt die realistische nachhaltige Netto-Rendite zwischen 3 und 10 Prozent.

**[Slide 7]** Das Test-Kriterium vor jeder Position. Wie volatil ist das Paar. Wie hoch sind die historischen Gebühren. Schlägt die erwartete Gebühren-Rendite den erwarteten IL deutlich. Wenn die Antwort unklar ist: nicht LP werden. Halte stattdessen die Tokens oder nutze Lending, Staking, andere Strategien.

## Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Formel prominent dargestellt, mit kleinen Icons für jeden Bestandteil (Gebühr, Reward, IL, Gas).

**[Slide 3]** Schritt-für-Schritt-Rechnung als Tabelle.

**[Slide 4]** Vier-Quadranten-Darstellung, je Szenario mit Ergebnis-Indikator.

**[Slide 5]** Volatilität-Gebühren-Diagramm: x-Achse Volatilität, y-Achse Gebühren, Kurve markiert "Break-even".

**[Slide 6]** **SCREENSHOT SUGGESTION:** defillama.com/yields gefiltert auf Uniswap-Pools mit Rendite-Angaben. Zeigt realistische Zahlenbereiche.

**[Slide 7]** Drei-Fragen-Checkliste als Entscheidungshilfe.

## Übung

**Aufgabe: Historische LP-Rendite real berechnen**

1. Öffne info.uniswap.org.
2. Wähle einen ETH/USDC-V2- oder V3-Pool.
3. Sammle für die letzten 30 Tage:
 - Durchschnittliche tägliche Gebühren
 - Durchschnittlicher TVL
 - ETH-Preisänderung (über coingecko.com)
4. Berechne:
 - Gebühren-Rendite (annualisiert): (Tägliche Gebühren × 365) / TVL
 - IL basierend auf ETH-Preisänderung (Tabelle oder Formel)
 - Netto-Rendite für einen hypothetischen LP, der vor 30 Tagen eingestiegen ist
5. Vergleiche mit Buy-and-Hold über dieselbe Periode.

**Deliverable:** Tabelle mit allen Rechnungen. Kurze Analyse (4–6 Sätze): Hätte sich LP-Sein in diesem Zeitraum gelohnt? Was hätte die Entscheidung besser machen können?

## Quiz

**Frage 1:** Ein LP-Pool zeigt "30% APY". Welche Information fehlt dir, um zu entscheiden, ob das gut ist?

<details>
<summary>Antwort anzeigen</summary>

Mehrere entscheidende Informationen fehlen. Erstens: Bestehen die 30% aus Trading-Gebühren oder Rewards? Wenn Rewards dominieren, ist die Rendite fragil (Programm kann enden, Token-Preis kann fallen). Zweitens: Wie hoch war die Volatilität des Asset-Paares, und damit der implizite IL? Eine 30%-APY auf einem volatilen Paar kann durch 20%+ IL aufgefressen werden. Drittens: Gas-Kosten relativ zur Positionsgröße. Viertens: Ist die APY-Zahl historisch oder prognostiziert? Fünftens: Wie stabil ist das Handelsvolumen? Ohne diese Informationen ist "30% APY" eine leere Zahl, die wenig über die tatsächliche Netto-Rendite aussagt.
</details>

**Frage 2:** Unter welchen Marktbedingungen schlägt LP-Sein strukturell Buy-and-Hold?

<details>
<summary>Antwort anzeigen</summary>

LP schlägt Buy-and-Hold in Seitwärtsmärkten mit hohem Handelsvolumen. In solchen Phasen ist der IL minimal (kein großer Preisunterschied zum Einstieg), während die Gebühren-Einnahmen durch das Volumen kumulieren. Zusätzlich gilt: LP schlägt Buy-and-Hold bei gepeggten Assets (Stablecoin-Paare, Liquid-Staking-Paare), wo die Volatilität strukturell niedrig ist und selbst moderate Gebühren-Renditen die geringen IL-Beträge deutlich überkompensieren. LP unterliegt strukturell bei starken Trendbewegungen eines Assets, weil der AMM zu früh verkauft (bei Rally) oder zu früh kauft (bei Crash), und die Gebühren den verpassten Gewinn selten kompensieren.
</details>

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Slides: Titel → Netto-Rendite-Formel → LP-Profitability-Beispiel → Sustainable vs. Temporary Yield → LP vs. Buy-and-Hold → Marktbedingungen-Matrix → Entscheidungsheuristik
- `voice_script.txt` — *Voice Narration Script* (120–140 WPM, Zielvideo 10–12 Min.)
- `visual_plan.json` — Netto-Rendite-Formel-Box, Beispielrechnung (Fees+Rewards−IL−Gas), Yield-Source-Breakdown-Pie, LP-vs-HODL-Chart, Marktregime-Matrix

Pipeline: Gamma → ElevenLabs → CapCut.

---
