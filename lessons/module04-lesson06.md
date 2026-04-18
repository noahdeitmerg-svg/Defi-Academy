# DEX-Aggregatoren und professionelle Swap-Ausführung

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Erklären, was DEX-Aggregatoren tun und wie sie Preise optimieren
- Eine Swap-Checkliste für professionelle Nutzung anwenden
- Die richtige Ausführungs-Plattform für verschiedene Swap-Größen wählen
- Die Rolle von 1inch, CoW Swap, Paraswap, Odos und Matcha als Meta-Router mit jeweils unterschiedlichen Routing-Philosophien einordnen
- Intent-basierte Systeme (CoW Swap, UniswapX) gegenüber klassischer Routing-Architektur abgrenzen
- Eine Pre-Trade-Checkliste (Slippage, MEV-Schutz, Gas, Route, Simulation) in jeden professionellen Swap integrieren

## Erklärung

Kein liquider Markt liegt mehr bei einem einzelnen DEX. Ein Swap von ETH zu USDC kann über Uniswap V2, V3 (mehrere Fee-Tiers), SushiSwap, Curve, Balancer und andere Pools fließen. DEX-Aggregatoren nehmen diese Komplexität ab: Sie finden die optimale Route über alle verfügbaren Pools und DEXs.

**Wie Aggregatoren arbeiten**

Wenn du einen Swap eingibst, prüft der Aggregator:
1. Welche Pools das gewünschte Paar handeln
2. Welche Liquidität jeweils verfügbar ist
3. Welche Routen über mehrere Pools existieren (z.B. ETH → USDC direkt vs. ETH → WBTC → USDC)
4. Wie ein Splitting über mehrere Pools den Preis-Impact reduziert

Das Ergebnis ist oft ein besserer Preis als der beste einzelne Pool, besonders bei größeren Swaps.

**Die wichtigsten Aggregatoren**

**1inch** (1inch.io)
- Einer der ältesten und etabliertesten
- Sehr gute Routen-Optimierung
- Bietet "Fusion" — eine Auktions-basierte Ausführung mit integriertem MEV-Schutz
- Große Nutzer-Basis

**CoW Swap** (swap.cow.fi)
- Auktions-basiertes Modell ("Coincidence of Wants")
- Integrierter MEV-Schutz
- Teilweise intra-Nutzer-Matching, was zusätzliche Effizienz bringt
- Ausführliche Preistransparenz

**Matcha** (matcha.xyz)
- Von 0x Labs
- Klares Interface
- Gute Liquiditäts-Aggregation

**Paraswap** (paraswap.io)
- Etabliert, vor allem bei institutionellen Nutzern
- Gutes Support-Ecosystem

**Für Endnutzer sind 1inch, CoW Swap und Matcha die drei sinnvollen Haupt-Optionen.** Sie alle sind kostenlos (der Aggregator nimmt meist keine Gebühr direkt, verdient intern).

**Die Swap-Ausführungs-Checkliste**

Vor jedem größeren Swap systematisch prüfen:

**1. Route prüfen**
- Welche Pools/DEXs werden genutzt?
- Ist der Preis besser als bei einem einzelnen DEX?
- Aggregatoren zeigen die Route transparent

**2. Preis-Impact prüfen**
- Unter 1%: unkritisch
- 1–3%: überdenken, ob die Swap-Größe sinnvoll ist
- Über 3%: meistens in mehrere kleinere Swaps splitten

**3. Slippage setzen**
- Stablecoins: 0,1–0,5%
- Liquide Majors: 0,5–1%
- Mid-Caps: 1–3%

**4. MEV-Schutz aktivieren**
- Bei Mainnet-Swaps: immer
- Aggregatoren wie CoW Swap und 1inch Fusion haben Schutz integriert
- Für direkte Uniswap-Swaps: Flashbots Protect oder MEV Blocker als RPC

**5. Transaktion simulieren**
- Rabby zeigt automatisch, was passieren wird
- Bestätigt, dass die richtigen Tokens bewegt werden

**6. Signatur sorgfältig prüfen**
- Approval-Betrag: unlimited vs. exakt?
- Spender-Adresse: bekannt?

**7. Erst dann ausführen**

**Wahl der Ausführungs-Plattform**

| Swap-Größe | Empfehlung |
|---|---|
| < 100 USD | Direkter DEX (z.B. Uniswap) — Gas-Effizienz wichtiger als optimale Route |
| 100–1.000 USD | Aggregator (CoW Swap, 1inch) ohne viel Aufwand |
| 1.000–10.000 USD | Aggregator mit MEV-Schutz, Slippage konservativ, Route-Check |
| > 10.000 USD | Aggregator + MEV-Schutz + eventuell Splitting in mehrere Transaktionen zu unterschiedlichen Zeiten |

**Gas-Optimierung bei Swaps**

Auf Mainnet sind Gas-Kosten pro Swap signifikant. Strategien:
- Swaps auf Layer-2 ausführen, wenn möglich (Gas-Kosten oft 10–50x geringer)
- Swaps in Zeiten niedriger Gas-Preise ausführen (etherscan.io/gastracker)
- Komponierte Transaktionen nutzen (mehrere Aktionen in einer Transaktion)

**Professionelle Minimum-Standards**

Für die in diesem Kurs behandelten Strategien ist professionelle Swap-Ausführung ein Kern-Skill. Die Minimum-Standards:
- Nie ohne Slippage-Kontrolle swappen
- Bei Beträgen über 1.000 USD: MEV-Schutz immer
- Signatur-Inhalte vor jedem Swap verstehen
- Route und Preis-Impact bewusst prüfen

Kapital, das durch schlechte Swap-Ausführung verloren geht, reduziert die Rendite jedes anderen Teils deiner Strategie. 1% schlechter Swap-Preis pro Woche entspricht ~50% Rendite-Verlust pro Jahr. Das lohnt sich zu kontrollieren.

## Folien-Zusammenfassung

**[Slide 1] — Titel**
DEX-Aggregatoren und professionelle Swap-Ausführung

**[Slide 2] — Was Aggregatoren tun**
Finden die beste Route über alle DEXs.
Splitten über mehrere Pools, wenn sinnvoll.
Oft besserer Preis als einzelner DEX.

**[Slide 3] — Hauptoptionen**
- 1inch (etabliert, Fusion-Mode)
- CoW Swap (Auktion, MEV-Schutz)
- Matcha (klares Interface)
- Paraswap (institutionell)

**[Slide 4] — Swap-Checkliste**
1. Route prüfen
2. Preis-Impact prüfen
3. Slippage setzen
4. MEV-Schutz aktivieren
5. Transaktion simulieren
6. Signatur prüfen
7. Ausführen

**[Slide 5] — Plattform-Wahl nach Größe**
< 100: direkt
100–1k: Aggregator
1k–10k: Aggregator + MEV
> 10k: Aggregator + MEV + Splitting

**[Slide 6] — Gas-Optimierung**
- Layer-2 bevorzugen
- Niedrige Gas-Zeiten
- Komponierte Transaktionen

**[Slide 7] — Professionelle Minimum-Standards**
- Slippage-Kontrolle immer
- MEV-Schutz ab 1k USD
- Signatur verstehen
- 1% schlechter Swap/Woche = ~50% Rendite-Verlust/Jahr

## Sprechertext

**[Slide 1]** Die letzte Lektion dieses Moduls fasst alles zusammen zur Praxis: wie führst du einen Swap professionell aus. Das ist kein Theorie-Thema. Jede Rendite-Strategie wird durch schlechte Swap-Ausführung verwässert.

**[Slide 2]** DEX-Aggregatoren nehmen dir eine wichtige Aufgabe ab: die optimale Route über alle verfügbaren Pools und DEXs zu finden. Sie prüfen Uniswap V2 und V3, Sushiswap, Curve, Balancer und andere. Sie splitten Swaps über mehrere Pools, wenn das den Gesamt-Preis-Impact reduziert. Das Ergebnis ist oft ein besserer Preis als der beste einzelne Pool, besonders bei größeren Beträgen.

**[Slide 3]** Die Hauptoptionen für Endnutzer. 1inch — einer der ältesten, mit Fusion-Modus für MEV-Schutz. CoW Swap — auktions-basiert, MEV-Schutz eingebaut, teilweise intra-Nutzer-Matching für zusätzliche Effizienz. Matcha — klares Interface. Paraswap — eher im institutionellen Bereich. Alle vier sind kostenlos in dem Sinn, dass sie keine explizite Gebühr erheben.

**[Slide 4]** Die Swap-Checkliste. Erstens: Route prüfen — was macht der Aggregator tatsächlich. Zweitens: Preis-Impact prüfen — unter einem Prozent unkritisch, zwischen eins und drei Prozent nachdenken, über drei Prozent splitten. Drittens: Slippage setzen — abhängig von der Liquidität des Paares. Viertens: MEV-Schutz aktivieren. Fünftens: Transaktion simulieren — Rabby zeigt das automatisch. Sechstens: Signatur-Inhalte prüfen, besonders Approval-Beträge. Siebtens: ausführen.

**[Slide 5]** Plattform-Wahl nach Größe. Unter 100 Dollar — direkt auf einer DEX, Gas-Effizienz wichtiger als optimale Route. 100 bis 1000 — Aggregator ohne viel Aufwand. 1000 bis 10.000 — Aggregator mit MEV-Schutz, Slippage konservativ, Route bewusst prüfen. Über 10.000 — Aggregator, MEV-Schutz, und eventuell Splitting in mehrere Transaktionen zu unterschiedlichen Zeiten. Bei wirklich großen Volumen, ab sechsstellig, wird OTC oder Private-Desk sinnvoller als On-Chain-Ausführung.

**[Slide 6]** Gas-Optimierung. Layer-2s bevorzugen, wenn das Asset dort verfügbar ist — Gas-Kosten sind 10 bis 50 Mal niedriger als auf Mainnet. Swaps in Zeiten niedriger Gas-Preise ausführen, etherscan.io/gastracker zeigt den aktuellen Stand. Komponierte Transaktionen nutzen, wenn du mehrere Aktionen planst — ein Aggregator oder ein Zap-Tool kann mehrere Aktionen in einer Transaktion bündeln.

**[Slide 7]** Die Minimum-Standards für professionelle DeFi-Praxis. Nie ohne Slippage-Kontrolle swappen. Bei Beträgen über 1000 Dollar immer MEV-Schutz. Signatur-Inhalte vor jedem Swap verstehen. Route und Preis-Impact bewusst prüfen. Die Mathematik dahinter ist einfach: 1 Prozent schlechter Swap-Preis pro Woche entspricht etwa 50 Prozent Rendite-Verlust pro Jahr durch Compounding. Das ist mehr als die gesamte Ziel-Rendite in diesem Kurs. Saubere Swap-Ausführung ist keine Optimierung — sie ist Voraussetzung.

## Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** **SCREENSHOT SUGGESTION:** 1inch-Interface, das eine gesplittete Route zeigt (z.B. "70% via Uniswap V3, 30% via Curve").

**[Slide 3]** Vier Logo-Karten mit Kurzbeschreibungen.

**[Slide 4]** Sieben-Punkte-Checkliste als vertikale Liste mit Icons.

**[Slide 5]** Entscheidungsbaum nach Swap-Größe.

**[Slide 6]** **SCREENSHOT SUGGESTION:** etherscan.io/gastracker mit aktuellen Gas-Preisen und Empfehlungen.

**[Slide 7]** Rendite-Verlust-Rechnung visualisiert: 1% × 52 Wochen compounding → ~70% kumulativer Verlust.

## Übung

**Aufgabe: Swap-Checklist in der Praxis anwenden**

Führe einen echten Swap aus (kleiner Betrag, z.B. 50 USD). Schritte:

1. Öffne CoW Swap (swap.cow.fi).
2. Verbinde Wallet.
3. Wähle ein Paar (z.B. ETH → USDC).
4. Gib den Betrag ein.
5. **Vor dem Bestätigen:** durchlaufe die 7-Punkte-Checkliste schriftlich:
 - Route: welche DEXs werden genutzt?
 - Preis-Impact: wie hoch?
 - Slippage-Toleranz: welche Einstellung?
 - MEV-Schutz: aktiv?
 - Simulation in Rabby: was zeigt sie?
 - Signatur: was signierst du genau?
 - Alles OK → ausführen
6. Nach der Ausführung: Transaktions-Hash notieren.

**Deliverable:**
- Schriftliche Checklist-Dokumentation mit allen 7 Punkten
- Transaktions-Hash
- Screenshot der CoW-Swap-Bestätigung

## Quiz

**Frage 1:** Ein Aggregator schlägt vor, einen 10.000-USD-Swap zu 60% über Uniswap V3 und 40% über Curve zu routen. Warum könnte das vorteilhaft sein?

<details>
<summary>Antwort anzeigen</summary>

Weil ein Swap von 10.000 USD in einem einzelnen Pool signifikanten Preis-Impact erzeugen würde (besonders wenn der Pool nicht extrem liquide ist). Durch Splitting wird jeder Teil-Swap kleiner, und damit der relative Preis-Impact geringer. Der Summen-Preis ist oft besser als in einem einzelnen Pool. Zusätzlich können verschiedene Pools unterschiedliche Fee-Tiers haben (z.B. Uniswap 0,05% vs. Curve 0,04%), was die Gesamt-Kosten weiter optimiert. Der Trade-off: höhere Gas-Kosten durch mehrere Pool-Interaktionen. Bei großen Swaps überwiegt der Preis-Vorteil aber typisch die zusätzlichen Gas-Kosten.
</details>

**Frage 2:** Jemand führt jede Woche einen 1.000-USD-Swap ohne MEV-Schutz und mit 3% Slippage aus. Warum ist das auf Jahressicht teuer?

<details>
<summary>Antwort anzeigen</summary>

Bei 3% Slippage kann ein Sandwich-Angreifer bis zu 3% des Swap-Wertes extrahieren — das sind bis zu 30 USD pro Swap. Bei 52 Swaps pro Jahr sind das potenziell 1.560 USD. Bei einem typischen DeFi-Portfolio im Bereich 10.000–50.000 USD entspricht das 3–15% Rendite-Verlust nur durch schlechte Swap-Hygiene — mehr als die gesamte Ziel-Rendite eines konservativen Portfolios. Die Lösung ist trivial: MEV-Schutz (kostet nichts zusätzlich) plus engere Slippage (0,5%). Damit reduziert sich der erwartbare Angreifer-Gewinn dramatisch. Das Beispiel zeigt, warum saubere Ausführung keine "Optimierung" ist, sondern Basis-Hygiene.
</details>

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Slides: Titel → Aggregator-Funktion → 1inch/CoW/Paraswap/Odos → Route-Splitting-Mechanik → Intent-basierte Systeme → Professionelle Swap-Checkliste → Plattform-Wahl-Matrix
- `voice_script.txt` — *Voice Narration Script* (120–140 WPM, Zielvideo 9–11 Min.)
- `visual_plan.json` — Route-Splitting-Diagramm über mehrere Pools, Aggregator-Interface-Screenshot (CoW Swap, 1inch), Pre-Trade-Checkliste als Infografik, Plattform-Wahl-Matrix nach Swap-Größe

Pipeline: Gamma → ElevenLabs → CapCut.

---
