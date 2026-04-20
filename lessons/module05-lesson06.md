# Stable LP-Strategien: Curve und gepeggte Assets

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die StableSwap-Formel von Curve von Constant-Product abgrenzen
- Curve-Pools passend zu konservativen Portfolio-Zielen auswählen
- Die Risiken gepeggter LP-Strategien (Depeg-Risiko) einordnen
- Die historischen Peg-Events (USDC-März-2023, stETH-Juni-2022) als Stresstest-Szenarien für Stable-LP-Positionen anwenden
- Die Rolle von CRV-Emissionen und veCRV-Gauges für LP-Rewards grundsätzlich einordnen (Vertiefung in Modul 13)
- Eine Curve-LP-Position nach Fee-Yield, TVL, Peg-Stabilität und Composability-Tiefe systematisch auswählen

## Erklärung

**Curve Finance** ist der dominante DEX für Swaps zwischen gepeggten Assets — Stablecoins (USDC/USDT/DAI), Liquid-Staking-Tokens (stETH/ETH), Wrapped Assets (WBTC/renBTC), und neuerdings auch Liquid-Restaking-Tokens. Curves Design ist speziell für Assets optimiert, die "nah beieinander" handeln sollen.

**Die StableSwap-Formel**

Anders als Uniswaps `x · y = k` verwendet Curve eine angepasste Formel, die eine Mischung aus Constant-Sum (`x + y = k`) und Constant-Product (`x · y = k`) ist. Der Effekt: Die Preiskurve ist im Bereich nahe des Pegs nahezu flach (wie Constant-Sum), aber an den Extrembereichen steigt sie steil an (wie Constant-Product).

**Was das praktisch bedeutet:**

Ein Curve-USDC/USDT-Pool quotiert Preise sehr nah an 1:1 für moderate Swap-Größen. Ein Swap von 1 Mio. USDC zu USDT kann mit weniger als 0,02% Slippage abgewickelt werden — etwas, das in einem Uniswap-V2-Constant-Product-Pool extreme Liquidität erfordern würde.

Gleichzeitig: Wenn der Pool stark aus dem Gleichgewicht gerät (z.B. weil ein Stablecoin beginnt zu depeggen), steigt der Slippage rapide — die Kurve schützt den Pool vor vollständiger Ausräumung.

**Amp-Parameter (Amplification)**

Curve-Pools haben einen Parameter `A` (Amplification), der bestimmt, wie "flach" die Kurve im Peg-Bereich ist. Höheres A = flachere Kurve im Peg-Bereich = bessere Preise für normale Swaps, aber höheres Risiko bei Depeg-Situationen.

Typische A-Werte:
- **3pool (USDC/USDT/DAI):** A = 2000 (sehr hoch, sehr optimiert für Peg)
- **stETH/ETH Pool:** A = 50–200 (moderater)
- **Frax/USDC Pool:** A = 500 (mittelmäßig)

**Welche Curve-Pools für konservative LPs sinnvoll sind**

**Sehr konservativ:**
- **3pool** (USDC/USDT/DAI) — Klassiker, sehr stabil, moderate Renditen (2–5%)
- **crvUSD Pools** — für das Curve-eigene Stablecoin, etwas höhere Renditen
- **tricrypto-Pools** — enthalten BTC, ETH, USDT; schon volatiler, aber kontrolliert

**Moderat konservativ:**
- **stETH/ETH** — exponiert gegenüber Liquid-Staking-Depeg-Risiko, aber stabile Gebühren
- **rETH/ETH** — ähnlich, andere Liquid-Staking-Variante
- **frxETH/ETH** — ähnlich

**Eher nicht für konservative LPs:**
- Pools mit experimentellen oder neuen Stablecoins (UST-ähnliche algorithmische Designs)
- Pools mit wenig TVL oder Rewards-Getriebenheit
- Pools mit ungeprüften Peg-Mechaniken

**Das Depeg-Risiko**

Das größte Risiko einer gepeggten LP-Position ist ein Depeg-Ereignis. Historische Beispiele:

**UST-Kollaps, Mai 2022:** Der algorithmische Terra-Stablecoin UST brach seinen Peg und fiel innerhalb weniger Tage auf nahe null. Curve-Pools mit UST (insbesondere der 4pool-Precursor) wurden strukturell zerstört — LPs hielten am Ende wertlose UST statt Mix aus Stablecoins.

**USDC-Depeg, März 2023:** Als die Silicon Valley Bank kollabierte (wo Circle einen Teil der USDC-Reserven hielt), depeggte USDC kurzzeitig auf 0,88 USD. Curve-Pools mit USDC erlebten massive Umschichtungen — LPs saßen plötzlich auf mehr USDC und weniger anderer Stables als erwartet. Peg kehrte innerhalb weniger Tage zurück, aber zwischenzeitliche Exits realisierten den Verlust.

**stETH-Depeg, Juni 2022:** Nach dem Luna/3AC-Kollaps depeggte stETH temporär auf 0,94 ETH. Der Curve stETH/ETH-Pool erlebte starke Umschichtungen.

**Lektion:** Gepeggte LP-Positionen sind **nicht risikofrei**. Sie sind "low IL", aber sie tragen ein konzentriertes Depeg-Risiko. Diversifikation über verschiedene Peg-Typen (fiat-besichert, krypto-besichert, liquid-staking-basiert) reduziert dieses Risiko.

**Rewards: CRV und convex boosting**

Viele Curve-Pools zahlen zusätzlich zu Trading-Gebühren CRV-Rewards (Curves eigenen Governance-Token). Diese Rewards können durch ein Konzept namens **veCRV** (vote-escrowed CRV) und **Convex Finance** weiter geboostet werden.

**Kurze Erklärung:**
- CRV-Tokens können für bis zu 4 Jahre gesperrt werden → veCRV
- veCRV gibt Governance-Macht und boostet die eigenen LP-Rewards
- Convex Finance poolt veCRV und bietet den Boost ohne dass LPs selbst CRV locken müssen

**Für konservative LPs:**
- Einfachste Version: LP auf Curve, keine CRV-Sperre, kein Convex — moderate aber stabile Rendite
- Komplexere Version: LP auf Curve, staken auf Convex für zusätzliche CRV- und CVX-Rewards — höhere Rendite, aber zusätzliches Smart-Contract-Risiko (zwei Protokolle statt einem) und Exposure zu Reward-Token-Preisen

Für das Kurs-Ziel von 7–8% ist eine direkte Curve-LP-Position oft ausreichend. Convex-Stacking ist nicht verboten, aber es fügt Komplexität hinzu, ohne die Ziel-Rendite deutlich zu verändern.

**Realistische Renditen auf Curve**

| Pool | Gebühren-Rendite | Mit CRV-Rewards | Mit Convex-Boost |
|---|---|---|---|
| 3pool | 1–3% | 2–5% | 3–7% |
| stETH/ETH | 1–3% | 2–5% | 3–8% |
| crvUSD Pools | 2–5% | 4–8% | 5–12% |

**Wichtiger Vorbehalt:** Die Spannen sind historisch und variieren stark. Aktuelle Zahlen auf defillama.com/yields oder curve.fi prüfen.

**Anwendung im Portfolio**

Ein konservativer DeFi-Portfolio-Ansatz könnte beinhalten:
- **30% Stablecoin-Supply auf Aave** (3–5% Rendite, minimales Risiko)
- **20% Curve-Stablecoin-LP (3pool oder crvUSD)** (3–6% Rendite, leichtes Depeg-Risiko)
- **20% Liquid-Staking (z.B. direkt stETH halten)** (3–4% Rendite, eingebettetes ETH-Exposure)
- **20% ETH-Spot** (direktes Markt-Exposure)
- **10% Reserve in USDC** (Trockenpulver für Opportunitäten)

Dieses Portfolio zielt auf ~5–7% Rendite bei konservativen Risiken, mit ETH-Exposure und Liquidität. Modul 12 vertieft Portfoliokonstruktion.

## Folien-Zusammenfassung

**[Slide 1] — Titel**
Stable LP-Strategien: Curve und gepeggte Assets

**[Slide 2] — StableSwap vs. Constant-Product**
Curve: flach im Peg-Bereich, steil an Extremen.
Uniswap: gleichmäßig konvex.
Curve optimiert für gepeggte Assets.

**[Slide 3] — Amp-Parameter (A)**
Höheres A = flachere Kurve = bessere Preise.
Höheres A = höheres Risiko bei Depeg.

**[Slide 4] — Geeignete Curve-Pools**
Sehr konservativ: 3pool, crvUSD, tricrypto
Moderat: stETH/ETH, rETH/ETH
Nicht für konservativ: experimentelle algo-Stables

**[Slide 5] — Depeg-Risiko**
UST-Kollaps Mai 2022
USDC-Depeg März 2023
stETH-Depeg Juni 2022
Low IL ≠ risikofrei

**[Slide 6] — Rewards-Struktur**
CRV, veCRV, Convex Boost
Mehr Rendite = mehr Komplexität = mehr Risiko
Für 7–8%-Ziel oft direkte LP ausreichend

**[Slide 7] — Portfolio-Integration**
Curve-LP als Baustein im konservativen Mix
Kombiniert mit Aave, Staking, Spot
Gesamt-Ziel 5–7% realistisch

## Sprechertext

**[Slide 1]** Curve Finance ist der wichtigste DEX für gepeggte Assets. Für konservative LP-Strategien ist Curve oft die erste Wahl, weil es strukturell für niedrig-volatile Paare optimiert ist.

**[Slide 2]** Der strukturelle Unterschied. Uniswap verwendet x mal y gleich k — eine gleichmäßig konvexe Kurve. Curve verwendet StableSwap, eine Mischung aus Constant-Sum und Constant-Product. Das Ergebnis: die Preiskurve ist im Peg-Bereich nahezu flach, erst an den Extrembereichen wird sie steil. Praktisch bedeutet das: ein Million-Dollar-Swap zwischen USDC und USDT auf Curve kostet weniger als 0,02 Prozent Slippage. Auf Uniswap V2 wäre das nicht möglich ohne riesige Liquidität.

**[Slide 3]** Der Amplification-Parameter A. Er bestimmt, wie flach die Kurve im Peg-Bereich ist. Höheres A bedeutet flachere Kurve und damit bessere Preise für normale Swaps. Gleichzeitig bedeutet höheres A auch höheres Risiko, wenn der Peg bricht — die Kurve "verteidigt" den Peg länger, bevor Slippage einsetzt. Das 3pool hat A gleich 2000, sehr hoch. Liquid-Staking-Pools wie stETH/ETH haben moderate Werte um 50 bis 200.

**[Slide 4]** Welche Curve-Pools sind konservativ sinnvoll. Sehr konservativ: 3pool mit USDC, USDT, DAI. Der Klassiker, moderate Rendite 2 bis 5 Prozent. crvUSD-Pools, für Curves eigenes Stablecoin, etwas höhere Rendite. tricrypto-Pools mit BTC, ETH, USDT — schon volatiler aber kontrolliert. Moderat: stETH/ETH, rETH/ETH, frxETH/ETH — Liquid-Staking-Paare mit Depeg-Risiko. Nicht für konservative Strategien: experimentelle algorithmische Stables oder Pools mit ungeprüften Peg-Mechaniken.

**[Slide 5]** Das Depeg-Risiko darf man nicht vergessen. UST-Kollaps Mai 2022: der algorithmische Terra-Stablecoin brach, Curve-Pools mit UST wurden strukturell zerstört. USDC-Depeg März 2023: Silicon Valley Bank Kollaps, USDC fiel kurzzeitig auf 0,88 Dollar. stETH-Depeg Juni 2022: nach Luna und Three Arrows Capital fiel stETH auf 0,94 ETH. Lektion: Low IL ist nicht risikofrei. Gepeggte LPs tragen ein konzentriertes Depeg-Risiko. Diversifikation über Peg-Typen reduziert das.

**[Slide 6]** Die Rewards-Struktur. Viele Curve-Pools zahlen CRV-Tokens zusätzlich zu Gebühren. CRV kann gesperrt werden zu veCRV, was Boost und Governance gibt. Convex Finance vereinfacht das — man stakt LP-Tokens auf Convex und bekommt geboostete Rewards ohne eigenes Locking. Für konservative LPs: direkte Curve-LP ist oft ausreichend für 3 bis 5 Prozent Rendite. Convex fügt Komplexität und ein weiteres Protokoll-Risiko hinzu — für moderate Rendite-Steigerung. Ob das den Aufwand wert ist, hängt von Position-Größe ab.

**[Slide 7]** Portfolio-Integration. Ein konservativer DeFi-Portfolio-Ansatz könnte Curve-LP als Baustein nutzen, neben Aave-Lending, direktem Liquid Staking, ETH-Spot und Stablecoin-Reserve. Die Gesamtallokation zielt auf 5 bis 7 Prozent bei kontrolliertem Risiko. Curve liefert einen Teil davon — nicht den einzigen. Portfoliokonstruktion vertiefen wir in Modul 12.

## Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Zwei Kurven nebeneinander: x·y=k (Hyperbel) und StableSwap (flache Mitte, steile Enden).

**[Slide 3]** Mehrere Curven mit verschiedenen A-Werten. Zeigt, wie A die Flachheit im Peg-Bereich steuert.

**[Slide 4]** **SCREENSHOT SUGGESTION:** curve.fi Pool-Übersicht mit TVL und APY der genannten Pools.

**[Slide 5]** Zeitachse mit den drei Depeg-Ereignissen markiert. Preisverlauf je Asset kurz dargestellt.

**[Slide 6]** Flussdiagramm: LP-Token → Convex Stake → geboostete Rewards. Daneben: direkte Curve-LP ohne Stacking.

**[Slide 7]** Portfolio-Kuchen-Diagramm mit 30/20/20/20/10 Aufteilung und erwarteten Renditen pro Segment.

## Übung

**Aufgabe: Curve-Pool-Analyse und konservative Auswahl**

1. Öffne curve.fi und gehe zu "Pools".
2. Finde mindestens 5 Pools, die du für konservativ geeignet hältst.
3. Dokumentiere für jeden Pool:
 - Name und enthaltene Assets
 - TVL
 - Aktuelle Gebühren-Rendite (Base APY)
 - Aktuelle CRV-Reward-Rendite (wenn vorhanden)
 - Gesamt-APY
 - Dein Risiko-Urteil: Was könnte bei diesem Pool schiefgehen?
4. Wähle einen einzigen Pool aus, in den du hypothetisch 5.000 USD investieren würdest. Begründe die Wahl.

**Deliverable:** Tabelle mit 5+ Pools. Abschlussbegründung für den gewählten Pool (5–7 Sätze): Warum dieser Pool, welches Risiko akzeptierst du, welche Exit-Kriterien hast du?

## Quiz

**Frage 1:** Warum ist der Slippage auf einem Curve-Stablecoin-Pool bei Normalsituation viel geringer als auf einem Uniswap-V2-Stablecoin-Pool?

<details>
<summary>Antwort anzeigen</summary>

Weil Curve die StableSwap-Formel verwendet, die im Peg-Bereich nahezu flach ist. In Uniswap V2 folgt die Preiskurve x·y=k überall der gleichen Hyperbel — das bedeutet, selbst kleine Ungleichgewichte erzeugen wahrnehmbaren Preis-Impact. Curves Formel mischt Constant-Sum und Constant-Product, wobei der Amp-Parameter A steuert, wie stark der Constant-Sum-Effekt im Peg-Bereich dominiert. Bei hohem A (wie beim 3pool mit A=2000) kann ein Swap von Millionen Dollar mit Slippage unter 0,02% abgewickelt werden. An den Extrembereichen (wenn der Pool stark aus dem Gleichgewicht gerät) nähert sich Curves Kurve wieder Constant-Product, was den Pool vor vollständiger Ausräumung schützt.
</details>

**Frage 2:** Ein konservativer LP hat 80% seines DeFi-Kapitals in Curve-Stablecoin-Pools. Was ist die offensichtliche Schwäche dieses Setups?

<details>
<summary>Antwort anzeigen</summary>

Konzentriertes Depeg-Risiko. Obwohl die Pools "low IL" sind und diversifiziert aussehen (USDC, USDT, DAI sind ja verschiedene Tokens), sind sie alle Fiat-besicherte Stablecoins. Ein systemisches Ereignis, das Fiat-Stablecoins angreift (z.B. ein Banken-Kollaps, der die Reserven betrifft, oder eine regulatorische Maßnahme gegen Stablecoin-Emittenten), würde alle drei gleichzeitig treffen. Die "Diversifikation innerhalb Stables" ist trügerisch, weil die Stables korreliert sind. Bessere Diversifikation: verschiedene Peg-Typen kombinieren — Fiat-besichert (USDC), krypto-besichert (DAI, LUSD), algorithmisch bewährt (crvUSD). Zusätzlich: nicht 80% in eine Kategorie, sondern über Kategorien verteilen (Stables, Liquid Staking, ETH-Spot, Lending).
</details>

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Slides: Titel → StableSwap-Formel → Curve-Pool-Typen → Depeg-Historie (USDC/UST) → Amp-Parameter-Mechanik → CRV-Rewards-Einordnung → Portfolio-Integration
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — StableSwap-Kurve vs. Constant-Product, Curve-Pool-Screenshot (3pool, stETH/ETH), Depeg-Event-Charts (USDC März 2023, stETH Juni 2022), Amp-Parameter-Effekt-Diagramm, Stablecoin-Diversifikations-Matrix

Pipeline: Gamma → ElevenLabs → CapCut.

---
