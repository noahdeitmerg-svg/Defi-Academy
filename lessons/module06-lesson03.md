# Aave: Architektur des Marktführers

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die Kernkomponenten von Aaves Architektur benennen
- Die Besonderheiten von Aave V3 (Efficient Mode, Isolation Mode) erklären
- Eine Supply-Entscheidung auf Aave evidenzbasiert treffen
- Den Health Factor (HF) als zentralen Sicherheitsindikator für Borrow-Positionen präzise definieren und live auf dem Aave-Dashboard lesen
- Einen Health-Factor-Walkthrough durchführen: HF-Berechnung bei verschiedenen Collateral-Preisbewegungen und daraus resultierende Liquidations-Nähe
- Die Risikoparameter einer Aave-Position (LTV, Liquidation Threshold, Liquidation Penalty, Reserve Factor) aus den offiziellen Markt-Parametern korrekt interpretieren

## Erklärung

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

**Health Factor — der zentrale Sicherheitsindikator**

Wenn du als Borrower auf Aave eine Position hältst, ist der Health Factor (HF) die wichtigste Kennzahl zur Einschätzung deiner Liquidationsgefahr. Die Formel:

```
HF = (Collateral-Wert × Liquidation Threshold) / Schulden-Wert
```

Ein HF > 1 bedeutet: die Position ist sicher. Ein HF = 1 bedeutet: die Position ist genau an der Liquidationsschwelle. Ein HF < 1 bedeutet: die Position wird liquidiert, sobald ein Liquidator es profitabel für sich entscheidet.

Beispiel: 10.000 USD ETH-Collateral, Liquidation Threshold 80%, 5.000 USDC Schuld:

```
HF = (10.000 × 0,80) / 5.000 = 1,6
```

Fällt der ETH-Preis um 30%, sinkt der Collateral-Wert auf 7.000 USD:

```
HF = (7.000 × 0,80) / 5.000 = 1,12
```

Der HF ist live im Aave-Dashboard sichtbar. Modul 7 vertieft Health-Factor-Management, Liquidations-Mechanik und Cascade-Szenarien.

**GHO — Aaves natives Stablecoin**

Aave hat mit GHO einen eigenen überbesicherten Stablecoin herausgegeben. Nutzer können GHO gegen Aave-Collateral borgen. Die Mechanik ähnelt MakerDAOs DAI-Modell, mit Aave-spezifischen Features (Stakers bekommen Rabatte). Für reine Supplier nicht direkt relevant, aber gut zu wissen.

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

## Folien-Zusammenfassung

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

**[Slide 4] — Isolation Mode + Collateral-Switch**
Isolation Mode: neue/riskantere Assets mit festem Schuld-Limit, schützt Protokoll vor Risiko-Ausbreitung.
Collateral-Switch: Asset kann als Sicherheit aktiviert/deaktiviert werden — wichtig für reine Supplier ohne Borrow-Absicht.

**[Slide 5] — Health Factor**
HF = (Collateral × Liquidation Threshold) / Schulden.
HF > 1: sicher. HF = 1: an der Schwelle. HF < 1: liquidierbar.
Beispiel: 10.000 USD ETH, LT 80%, 5.000 USDC Schuld → HF = 1,6.
Bei −30% ETH-Preis: HF = 1,12. Live im Aave-Dashboard.

**[Slide 6] — Safety Module**
AAVE-Staker tragen Restrisiko.
Bis 30% Haircut bei Protokoll-Shortfall möglich.

**[Slide 7] — Realistische Supplier-Renditen**
Stables: 3–6%
WETH: 1–3%
wstETH: 0,5–2% (+ staking yield)
Track-record: kein Protokoll-Hack seit Launch.

## Sprechertext

**[Slide 1]** Aave ist das größte und am längsten etablierte Lending-Protokoll. Für konservative Supplier ist es die erste Adresse — aus Gründen, die wir jetzt durchgehen.

**[Slide 2]** Aaves Architektur besteht aus vier Kernkomponenten. Markets pro Chain: Aave läuft auf vielen Chains — Ethereum, Arbitrum, Optimism, Base, Polygon, weitere. Jede Chain ist isoliert. aTokens: für jeden Supply-Asset gibt es ein entsprechendes Token, das zinsbringend ist und komponierbar. Debt Tokens: repräsentieren Schulden, sind nicht übertragbar. Interest Rate Strategies: pro Asset ein Zinsmodell mit Kink-Point und Steilheiten, per Governance anpassbar.

**[Slide 3]** Aave V3 führte Efficient Mode ein — kurz E-Mode. Damit können hoch korrelierte Assets als Collateral mit sehr hoher LTV genutzt werden. Stablecoin-E-Mode: USDC, USDT, DAI, bis 93 Prozent Belehnung. ETH-Correlated-E-Mode: ETH, wstETH, weETH, rETH, ebenfalls bis 93 Prozent. Für Borrow-Strategien ist das zentral, für reine Supplier weniger direkt relevant, aber gut zu wissen.

**[Slide 4]** Isolation Mode und Collateral-Switch. Isolation Mode ist für neue oder riskantere Assets: ein Isolation-Asset kann nur bis zu einem festen Schuld-Limit belehnt werden, und nur gegen bestimmte Stablecoins. Das schützt das Protokoll vor Kaskaden durch problematische Assets. Der Collateral-Switch erlaubt dir, pro Asset zu entscheiden, ob es als Sicherheit genutzt wird oder nur als reine Supply-Position. Wenn du nicht borgen willst, deaktivierst du Collateral-Status — das schließt jede Liquidationsgefahr aus.

**[Slide 5]** Der Health Factor ist die zentrale Sicherheitskennzahl für jede Borrow-Position. Die Formel: Collateral-Wert mal Liquidation Threshold geteilt durch Schulden-Wert. HF größer eins bedeutet, die Position ist sicher. HF gleich eins: sie steht an der Liquidationsschwelle. HF kleiner eins: sie wird liquidiert, sobald ein Liquidator es profitabel macht. Ein konkretes Beispiel: zehntausend Dollar ETH-Collateral bei einem Liquidation Threshold von achtzig Prozent und fünftausend USDC Schuld ergibt einen Health Factor von eins Komma sechs. Fällt der ETH-Preis um dreißig Prozent, sinkt der Collateral-Wert auf siebentausend Dollar und der Health Factor auf eins Komma eins zwei — die Position ist immer noch sicher, aber der Puffer schrumpft deutlich. Der Health Factor ist live im Aave-Dashboard sichtbar. Modul sieben vertieft Health-Factor-Management, Liquidations-Mechanik und Cascade-Szenarien.

**[Slide 6]** Das Safety Module. AAVE-Token-Halter können ihre AAVE im Safety Module staken und erhalten Zinsen dafür. Im Gegenzug tragen sie Restrisiko: bei Protokoll-Shortfall können bis zu 30 Prozent der gestakten AAVE verwendet werden, um Deckungslücken zu schließen. Das ist eine Puffer-Schicht, die normale Supplier schützt. Kam noch nie zum Einsatz, aber als Mechanismus vorhanden.

**[Slide 7]** Realistische Supplier-Renditen auf Aave. Stablecoins liegen typisch bei 3 bis 6 Prozent. WETH-Supply 1 bis 3 Prozent. wstETH-Supply 0,5 bis 2 Prozent plus der eingebettete Staking-Yield von stETH. WBTC-Supply unter 2 Prozent. Diese Bereiche schwanken stark mit Marktbedingungen — in Bull-Markets mit viel Leverage-Nachfrage steigen Stablecoin-Raten, in Bärmarkten fallen sie. Track-record: Aave hatte seit Launch keinen direkten Protokoll-Hack. Für konservative Supplier ist das der wichtigste einzelne Faktor.

## Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** **SCREENSHOT SUGGESTION:** Aave-App-Dashboard mit Markets-Übersicht.

**[Slide 3]** E-Mode-Darstellung: Assets gruppiert mit erhöhter LTV im Vergleich zum Normal-Mode.

**[Slide 4]** Zwei-Spalten-Vergleich: links Normal-Asset-Pool vs. Isolated-Asset-Pool mit Schuld-Limit, rechts **SCREENSHOT SUGGESTION:** Aave-Supply-Detail mit "Use as collateral"-Toggle.

**[Slide 5]** Health-Factor-Formel prominent dargestellt, darunter Rechenbeispiel-Tabelle: 10.000 USD ETH-Collateral + 5.000 USDC Schuld bei LT 80% → HF 1,6; nach −30% ETH → HF 1,12. **SCREENSHOT SUGGESTION:** Aave-Dashboard mit live angezeigtem Health Factor einer Demo-Position.

**[Slide 6]** Safety-Module-Flussdiagramm: AAVE-Staking → Rewards + Restrisiko.

**[Slide 7]** Tabelle der Supply-Raten pro Asset-Kategorie. **SCREENSHOT SUGGESTION:** defillama.com/yields?project=aave-v3 mit aktuellen Raten.

## Übung

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

## Quiz

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

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → 4 Kernkomponenten → Efficient Mode → Isolation Mode + Collateral-Switch → Health Factor (Formel + Beispiel) → Safety Module → Realistische Renditen
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — Aave-V3-Interface-Screenshot, Health-Factor-Rechenbeispiel-Tabelle, Efficient/Isolation-Mode-Diagramme, Liquidations-Nähe-Visualisierung, Markt-Parameter-Vergleich verschiedener Assets

Pipeline: Gamma → ElevenLabs → CapCut.

---
