# Die Curve Wars

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die historische Dynamik der Curve Wars und ihre Akteure verstehen
- Die wirtschaftliche Logik der Bribe-Wirtschaft nachvollziehen
- Die Akkumulation von CRV als strategisches Asset erkennen
- Die Rollen der Hauptakteure (Convex, Yearn, Frax, Mochi, Olympus) in den Curve Wars historisch einordnen
- Die Gauge-Vote-Dynamik und Bribe-Plattformen (Votium, Hidden Hand, Warden Quest) als etabliertes Bribe-Ökosystem quantitativ analysieren
- Die Lehren der Curve Wars für moderne Liquidity-Incentive-Designs (ve(3,3), solid/solidly-Clones) einordnen

## Erklärung

"Curve Wars" ist die informelle Bezeichnung für einen jahrelangen Wettkampf zwischen Protokollen um **Kontrolle über CRV-Emissionen**. Es ist eine der faszinierendsten Machtdynamiken in DeFi — und hat den Aufstieg von Convex Finance als dominante Kraft erklärt.

**Die Grundlage: warum Emissionen so wertvoll sind**

Aus Lektion 13.2 wissen wir: Curve verteilt wöchentlich Millionen USD in CRV-Emissionen. Wer bestimmt, an welche Pools diese Emissionen gehen, kontrolliert massive Liquiditäts-Ströme.

**Für Stablecoin-Protokolle wie FRAX, MIM, USDD:** Tiefe Curve-Pools sind existenziell wichtig. Ohne sie ist der Stablecoin-Peg gefährdet.

**Für LST-Protokolle wie Lido (stETH) und Rocket Pool (rETH):** Curve-Pools sind die primäre Exit-Liquidität. Ohne tiefe Pools könnten Halter nicht schnell zu ETH zurückkehren.

**Für kleinere Stablecoins und Tokens:** Ein Curve-Pool mit hohem Gauge-Weight ist oft der Unterschied zwischen Überleben und Sterben.

Damit ist der CRV-Emissions-Markt ein **Multi-Milliarden-USD-Markt für Liquiditäts-Incentives**. Und Kontrolle darüber ist entsprechend wertvoll.

**Die drei Wege, CRV-Emissionen zu kontrollieren**

**Weg 1: Eigene veCRV akkumulieren.**
Ein Protokoll kauft CRV am offenen Markt und lockt es für 4 Jahre. Das gibt dem Protokoll direkte Voting-Power. Nachteil: teuer und gebunden.

**Weg 2: Nutzer incentivieren, CRV für dich zu locken.**
Ein Protokoll kann eigene Belohnungen anbieten, wenn Nutzer CRV in einem Wrapper des Protokolls locken. So entstand Convex.

**Weg 3: Bribes an bestehende veCRV-Halter zahlen.**
Ein Protokoll zahlt Tokens (meist ihre eigenen) an veCRV-Halter, die ihre Stimmen auf den Pool des Protokolls richten. Plattformen wie Votium und Quest organisieren diesen Markt.

**Die vier großen Akteure der Curve Wars**

**Akteur 1: Convex Finance (CVX)**

Convex wurde 2021 gegründet und entwickelte sich schnell zum dominanten Akteur. Die Strategie: Nutzer incentivieren, ihre CRV **permanent** an Convex zu locken. Im Austausch bekommen sie cvxCRV-Tokens (liquide, handelbar) und CVX-Token-Rewards.

Convex akkumulierte in Spitzenzeiten **über 50% aller veCRV** — effektive Kontrolle über die Curve-Governance.

**Detaillierte Mechanik in Lektion 13.4 .**

**Akteur 2: Yearn Finance (YFI)**

Yearn hat einen eigenen Wrapper — yCRV. Ähnliches Prinzip wie Convex, aber weniger aggressiv im Akkumulieren. Heute ein Nischen-Spieler neben Convex.

**Akteur 3: Stake DAO (SDT)**

Anderer Wrapper mit sdCRV. Kleiner als Convex, aber mit eigenen Besonderheiten (höhere Direkt-Rendite für einige Nutzer).

**Akteur 4: FRAX Finance**

FRAX verfolgte eine eigene Strategie: direkte CRV-Akkumulation durch Protokoll-Käufe. Als Stablecoin-Protokoll hat FRAX direkte Interesse an tiefer Curve-Liquidität für den eigenen Stablecoin.

**Die historische Timeline der Curve Wars**

**Phase 1 (2020-Mitte 2021): Die frühen Locker.** Erste CRV-Halter locken CRV, weil sie das ve-Modell verstehen. Convex existiert noch nicht. Marktgröße klein.

**Phase 2 (Mitte 2021-Anfang 2022): Convex-Ascent.** Convex launcht Mai 2021. Akkumuliert rapid veCRV durch attraktive Incentives. Erreicht binnen Monaten Dominanz.

**Phase 3 (2022: Peak Wars).** FRAX, MIM (Abracadabra), Yearn, Badger und andere kaufen aggressiv CVX (Convex-Token), um indirekten Zugang zum veCRV von Convex zu bekommen. "Curve Wars" werden zu "Convex Wars".

**Phase 4 (2022-2023: UST-Crash-Folgen).** Der Terra-UST-Kollaps (Mai 2022) und danach FTX-Kollaps (November 2022) reduzieren die Gesamt-Aktivität. Einige Protokolle, die Teil der Curve Wars waren (MIM/Abracadabra), erlitten Krisen.

**Phase 5 (2023-2024: Stabilisierung).** Die Marktstruktur beruhigt sich. Convex bleibt dominanter Akteur. Neue ve-Protokolle (Velodrome, Aerodrome, Pendle) emergen, mit eigenen Wars ("Velo Wars", "Pendle Wars").

**Phase 6 (2024-2025 und heute): Post-Curve-Wars-Landschaft.** Die Aufregung um Curve spezifisch hat nachgelassen, aber das ve-Design-Muster hat sich etabliert. Multiple ve-Ökosysteme existieren parallel.

**Die Bribe-Wirtschaft im Detail**

Heute ist die Curve-Bribe-Wirtschaft professionalisiert. Die wichtigsten Plattformen:

**Votium (votium.app):** Die größte Bribe-Plattform. Protokolle zahlen Tokens in einen Pool, vlCVX-Halter (Convex-Voting-Token, siehe spätere Lektionen) oder veCRV-Halter bekommen Anteile für ihre Voting-Aktivität.

**Quest / Warden:** Alternative Plattformen mit ähnlicher Funktion, manchmal bessere Mechaniken für bestimmte Situationen.

**Direct-Bribes:** Einige Protokolle zahlen auch direkt an Voter ohne Plattform — höhere Effizienz, aber weniger Transparenz.

**Die Größenordnungen:** In Spitzenzeiten flossen 10-50 Millionen USD pro Monat in Bribes. Heute (2025-2026) ist es ruhiger, aber immer noch mehrere Millionen pro Monat.

**Die wirtschaftliche Logik:**

Ein Stablecoin-Protokoll, das $1 Million in Bribes bezahlt, bekommt dafür vielleicht $5-10 Millionen in CRV-Emissionen zu seinem Pool. Das ist 5-10× Hebel. Für einen LP, der seine Rendite maximieren will, ist das direkt profitabel.

**Die Gewinn-Rechnung für Voter:**

Ein vlCVX-Halter mit 100.000 vlCVX bekommt typisch 5-15% APR aus Bribes (in verschiedenen Tokens). Plus die Base-CVX-Rewards. Das macht die Gesamt-Yield-Kurve signifikant.

**Die ethischen Debatten**

Die Curve Wars haben Kontroversen ausgelöst:

**Kritik 1: Zentralisierung.** Wenn ein einzelnes Protokoll (Convex) 50% der veCRV kontrolliert, ist das eine faktische Governance-Konzentration. Das widerspricht dem Dezentralisierungs-Ideal.

**Kritik 2: Bribe-Wirtschaft als "Korruption".** Manche kritisieren, dass Bribes Stimmrechte "käuflich" machen. Andere entgegnen: jede Demokratie hat wirtschaftliche Incentives für Teilnahme; Bribes sind nur transparenter.

**Kritik 3: Protokoll-Abhängigkeit von CRV.** Protokolle, die von CRV-Emissionen abhängen, sind gefährdet wenn CRV selbst in Schieflage gerät.

**Die positive Sicht:**

Die Curve Wars haben tatsächlich **effiziente Liquiditäts-Märkte** geschaffen. Stablecoins und LSTs haben tiefe Pools, Nutzer bekommen bessere Preise, das DeFi-Ökosystem ist als Ganzes effizienter. Dass das durch eine komplexe Anreiz-Struktur erreicht wurde, kann man als Feature, nicht als Bug sehen.

**Was das für einen normalen Nutzer bedeutet**

Für die meisten DeFi-Nutzer sind die Details der Curve Wars akademisch — aber sie haben indirekte Implikationen:

**Implikation 1: LP-Renditen sind variabel.** Die CRV-Emissionen zu einem bestimmten Pool hängen von den Voting-Dynamiken ab. Wenn ein Pool "in" ist (hohe Votes), sind die APRs hoch. Wenn das Voting kippt, können APRs dramatisch fallen.

**Implikation 2: Bribes sind eine Einkommens-Quelle.** Wer vlCVX hält, kann einen signifikanten Teil seines Ertrags aus Bribes beziehen. Das macht Convex zu einer interessanten Position für aktive Halter.

**Implikation 3: Die Pools mit den besten APRs sind meist nicht zufällig.** Sie sind meist Pools, die aktiv über Bribes gepusht werden. Wer die höchsten APRs verstehen will, muss die Bribe-Dynamik verstehen.

In den folgenden Lektionen werden wir Convex im Detail behandeln und zeigen, wie ein normaler Nutzer praktisch von dieser Dynamik profitieren kann, ohne selbst CRV für 4 Jahre zu locken.

## Folien-Zusammenfassung

**[Slide 1] — Titel**
Die Curve Wars

**[Slide 2] — Warum der Kampf**
CRV-Emissionen = Liquiditäts-Incentives
Für Stablecoins/LSTs existentiell
Multi-Milliarden-USD-Markt
Kontrolle wertvoll

**[Slide 3] — Drei Wege zur Kontrolle**
1. Eigene veCRV akkumulieren
2. Wrapper-Strategien (Convex)
3. Bribes zahlen

**[Slide 4] — Die Akteure**
Convex (CVX) — dominant
Yearn (YFI) — moderat
Stake DAO (SDT) — Nische
FRAX — direkte Akkumulation

**[Slide 5] — Timeline**
2020-2021: frühe Locker
2021-2022: Convex-Ascent
2022: Peak Wars
2022-2023: UST/FTX-Folgen
2023+: Stabilisierung

**[Slide 6] — Bribe-Wirtschaft**
Votium, Quest, Warden
10-50M USD/Monat in Spitzen
5-10x Hebel für Protokolle
5-15% APR für Voter

**[Slide 7] — Ethische Debatten und Retail-Implikationen**
Debatten: Zentralisierung (Convex 50%+), Bribes = Korruption?, CRV-Abhängigkeits-Risiko
Implikationen: LP-Renditen variabel, Bribes als Einkommens-Quelle, höchste APRs meist gepusht, Convex als praktischer Zugang

## Sprechertext

**[Slide 1]** Curve Wars ist die informelle Bezeichnung für einen jahrelangen Wettkampf zwischen Protokollen um Kontrolle über CRV-Emissionen. Eine der faszinierendsten Machtdynamiken in DeFi.

**[Slide 2]** Warum der Kampf. CRV-Emissionen sind Liquiditäts-Incentives. Für Stablecoin-Protokolle wie FRAX, MIM, USDD sind tiefe Curve-Pools existenziell. Für LST-Protokolle wie Lido und Rocket Pool sind sie primäre Exit-Liquidität. Der CRV-Emissions-Markt ist ein Multi-Milliarden-USD-Markt für Liquiditäts-Incentives. Kontrolle darüber ist entsprechend wertvoll.

**[Slide 3]** Drei Wege, CRV-Emissionen zu kontrollieren. Erstens: eigene veCRV akkumulieren durch Marktkauf und 4-Jahre-Lock. Teuer und gebunden. Zweitens: Nutzer incentivieren, CRV für dich zu locken — so entstand Convex. Drittens: Bribes an bestehende veCRV-Halter zahlen, damit sie ihre Stimmen auf deinen Pool richten. Plattformen wie Votium organisieren diesen Markt.

**[Slide 4]** Die vier großen Akteure. Convex Finance, dominanter Akteur mit über 50 Prozent aller veCRV in Spitzenzeiten. Yearn Finance mit yCRV als kleinere, ähnliche Konstruktion. Stake DAO mit sdCRV als Nische. FRAX Finance mit direkter CRV-Akkumulation als Stablecoin-Protokoll mit eigenen Interessen.

**[Slide 5]** Timeline. 2020-2021: frühe Locker verstehen das ve-Modell. Mitte 2021: Convex launcht, akkumuliert rapid. 2022: Peak Wars mit aggressivem CVX-Kauf durch andere Protokolle. Curve Wars werden zu Convex Wars. Mai 2022: Terra UST-Kollaps. November 2022: FTX-Kollaps. Einige Curve-Wars-Akteure wie MIM erleiden Krisen. 2023-2024: Stabilisierung, Convex bleibt dominant. 2025-2026: Post-Curve-Wars-Landschaft, ve-Design hat sich etabliert, multiple ve-Ökosysteme parallel.

**[Slide 6]** Die Bribe-Wirtschaft im Detail. Votium ist die größte Plattform. Quest und Warden als Alternativen. Direct-Bribes auch möglich. In Spitzenzeiten flossen 10 bis 50 Millionen Dollar pro Monat in Bribes. Heute ruhiger, aber mehrere Millionen monatlich. Wirtschaftliche Logik: 1 Million Dollar Bribe bringt 5 bis 10 Millionen in CRV-Emissionen zum Pool. 5 bis 10-fach Hebel. Für Voter: typisch 5 bis 15 Prozent APR aus Bribes, plus Base-Rewards.

**[Slide 7]** Die ethischen Debatten und die Implikationen für normale Nutzer. Zentralisierungs-Kritik: Convex mit 50 Prozent der veCRV ist faktische Governance-Konzentration, widerspricht dem Dezentralisierungs-Ideal. Bribe-Kritik: macht Stimmrechte "käuflich", manche sehen das als Korruption, andere als transparente Demokratie. CRV-Abhängigkeits-Risiko: Protokolle die von CRV-Emissionen abhängen, sind gefährdet wenn CRV selbst in Schieflage gerät. Die positive Sicht: effiziente Liquiditäts-Märkte sind entstanden, Stablecoins und LSTs haben tiefe Pools, DeFi als Ganzes ist effizienter geworden. Was bedeutet das praktisch für normale Nutzer? LP-Renditen sind variabel — Emissionen zu einem Pool hängen von Voting-Dynamiken ab. Pools "in fashion" haben hohe APRs, kippen kann zu drastischen Rückgängen führen. Bribes sind eine Einkommens-Quelle für vlCVX-Halter. Höchste APRs sind meist nicht zufällig — sie werden aktiv gepusht. In den folgenden Lektionen behandeln wir Convex im Detail und zeigen, wie ein normaler Nutzer praktisch von dieser Dynamik profitieren kann, ohne selbst CRV für 4 Jahre zu locken.

## Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** **SCREENSHOT SUGGESTION:** DeFiLlama CRV-Emissions-Dashboard.

**[Slide 3]** Drei-Wege-Diagramm mit Kosten/Nutzen.

**[Slide 4]** Vier-Akteure-Karten mit Marktanteilen.

**[Slide 5]** Timeline-Visualisierung 2020-heute.

**[Slide 6]** **SCREENSHOT SUGGESTION:** Votium-Bribe-Interface.

**[Slide 7]** Zwei-Spalten-Layout: links Pro/Contra-Tabelle der ethischen Debatten, rechts Retail-Implikationen-Checkliste.

## Übung

**Aufgabe: Aktuelle Curve-Wars-Dynamik analysieren**

Besuche [llama.airforce](https://llama.airforce) (oder eine ähnliche Analytics-Plattform für Curve/Convex-Daten).

Recherchiere:
1. Aktueller Convex-Anteil am Total veCRV (Prozent)
2. Top-5-Pools mit höchsten CRV-Emissionen aktuell
3. Aktuelle Bribe-Raten auf Votium für die Top-3-Pools
4. Welche Protokolle zahlen die höchsten Bribes aktuell?

**Deliverable:** Daten-Tabelle + Reflexion (8-12 Sätze): Hat sich die Dynamik im Vergleich zum Peak 2022 geändert? Welche Protokolle sind "in" oder "out"? Was sagt das über die allgemeine DeFi-Markt-Richtung?

## Quiz

**Frage 1:** Warum ist die Aussage "Curve Wars haben DeFi zentralisiert" gleichzeitig wahr und eine Vereinfachung?

<details>
<summary>Antwort anzeigen</summary>

Beide Perspektiven haben Wahrheit, die sich nicht widerspricht, sondern auf verschiedenen Ebenen operiert. **Warum "zentralisiert" wahr ist:** Convex kontrolliert in Spitzenzeiten über 50% des gesamten veCRV. Das bedeutet: bei jeder Gauge-Weight-Abstimmung hat Convex faktisch die Majorität der Stimmen (oder zumindest das Zünglein an der Waage). Ein einzelnes Protokoll — mit seinem eigenen Governance-Token CVX — kontrolliert damit indirekt einen Multi-Milliarden-USD-Liquiditäts-Fluss. Das ist formal gesehen eine Zentralisierung. Wenn Convex eines Tages entscheiden würde, seine Votes alle an einen einzigen Pool zu richten, könnte es die gesamte Curve-Emissions-Logik kurzfristig verzerren. Das widerspricht dem Dezentralisierungs-Ideal von DeFi. **Warum "zentralisiert" eine Vereinfachung ist:** Erstens: **Convex hat selbst dezentralisierte Governance.** Die Voting-Macht von Convex wird nicht zentral entschieden — sie wird durch vlCVX-Halter bestimmt, die selbst Tausende von Wallets sind. Convex ist also ein "Layer der Dezentralisierung" über Curve. Die effektive Kontrolle ist verteilt über vlCVX-Halter, nicht bei einer einzelnen Person. Zweitens: **vlCVX-Halter-Struktur.** Die vlCVX-Verteilung ist relativ breit. Keine einzelne Entität kontrolliert eine vlCVX-Majorität. Top-Halter haben meist <5% der vlCVX — weit entfernt von Dominanz. Drittens: **Bribes demokratisieren Voting-Power.** Durch Votium und ähnliche Plattformen können Protokolle direkt Bribes zahlen, um vlCVX-Voter zu incentivieren. Das bedeutet: auch wenn ein Protokoll selbst wenig vlCVX hält, kann es durch Bribes effektive Voting-Power kaufen. Das ist ein Markt-Mechanismus, kein zentraler Entscheider. Viertens: **Die "Konzentration" ist wirtschaftlich rational.** Die Dominanz von Convex entstand nicht durch Zentralmacht, sondern durch besseres Produkt-Design (höhere Rewards für CRV-Locker). Nutzer wählten Convex freiwillig. Das ist anders als eine "top-down" Zentralisierung. Fünftens: **Alternative Optionen existieren.** Yearn, Stake DAO, und direktes veCRV-Hold sind weiterhin alle möglich. Niemand wird gezwungen, Convex zu nutzen. Die "Zentralisierung" ist eine Folge von Marktwahlen, nicht Zwang. **Die nuancierte Wahrheit:** Convex ist ein "centralized decentralization layer" — es bündelt Voting-Power auf der Curve-Ebene, ist aber selbst auf einer anderen Ebene dezentralisiert. Das ist eine komplexe Struktur, die keine einfache "zentral vs. dezentral"-Einordnung erlaubt. **Vergleich:** Das ist ähnlich wie bei Proof-of-Stake-Chains: Staking-Pools bündeln Stake, aber sind selbst verteilte Entitäten. Lido (für ETH-Staking) hat in der Ethereum-Community ähnliche Debatten ausgelöst — ist es Zentralisierung, wenn 30% aller Ethereum-Stakes bei Lido sind? Die Antwort: formal ja, aber die Lido-interne Struktur (Node Operators) ist auch verteilt. **Für den Nutzer:** Die "Zentralisierung" durch Convex ist real, aber nicht direkt bedrohlich. Konsequenzen sind eher subtil — wenn Convex eine Entscheidung trifft, beeinflusst das den gesamten Curve-Markt. Aber Convex hat Incentive, keine destruktiven Entscheidungen zu treffen (es würde sein eigenes Produkt beschädigen). Das System ist selbst-regulierend durch Incentive-Alignment. Die ehrliche Bewertung: Curve Wars haben eine neue, komplexe Machtstruktur in DeFi geschaffen. Diese ist weder perfekt dezentral noch autoritär zentral. Sie ist ein neues hybrides Modell, das eigene Trade-offs hat. Wer DeFi fair bewerten will, muss diese Nuancen sehen, nicht in Schwarz/Weiß denken.
</details>

**Frage 2:** Stell dir vor, du launchst ein neues Stablecoin-Protokoll und brauchst einen tiefen Curve-Pool für deinen Stablecoin. Welche drei Strategien würdest du verfolgen, und in welcher Reihenfolge?

<details>
<summary>Antwort anzeigen</summary>

Eine realistische Launch-Strategie für ein neues Stablecoin-Protokoll mit Curve-Fokus. **Phase 1: Pool-Aufbau und Bribe-Strategie (Monate 0-6).** Priorität 1: Einen Curve-Pool mit deinem Stablecoin gegen 3pool oder andere Stables launchen. Das ist administrativ einfach, aber kritisch — ohne Pool gibt es nichts zu incentivieren. Priorität 2: Bribe-basierte Liquiditäts-Anziehung. Als neues Protokoll hast du wahrscheinlich eigene Token-Emissionen. Du kannst einen Teil davon in Bribes auf Votium oder Warden investieren, um vlCVX-Halter zu incentivieren, ihren Vote auf deinen Pool zu richten. Das erzeugt CRV-Emissionen zu deinem Pool, was LPs anzieht. Wirtschaftliche Logik: jeder Dollar in Bribes bringt typisch 3-10 Dollar in CRV-Emissionen zu deinem Pool. Pool wächst, Peg stabilisiert sich. Budget: 100.000-500.000 USD pro Monat in eigener Token-Währung für Bribes. Priorität 3: Gleichzeitig: mindestens minimaler CVX-Hold als "Commitment-Signal". 10.000-50.000 CVX zeigt Nutzern, dass dein Protokoll langfristig bei Curve denkt. Das verbessert die Bribe-Annahme-Rate und die Community-Wahrnehmung. **Phase 2: Mid-Term-Stabilisierung (Monate 6-18).** Priorität 1: Bribe-Effizienz optimieren. Nicht alle Bribe-Plattformen sind gleich effizient. Erfahrung sammeln über Votium vs. Quest vs. direkte Bribes. Investieren, wo der beste Hebel ist. Priorität 2: Eigenes CRV akkumulieren. Zusätzlich zu Bribes: direkter Kauf von CRV auf offenem Markt und 4-Jahres-Lock. Das ist langfristig teurer als Bribes pro einzelnem Vote, aber gibt dauerhafte Voting-Power. Kombination ist oft optimal: Bribes für taktische Flexibilität, veCRV-Hold für strategische Stabilität. Priorität 3: Community-Aufbau. Eigene Governance-Token-Halter anziehen, die loyal ihr Interesse vertreten. Das reduziert Abhängigkeit von externen Bribes. **Phase 3: Long-Term-Position (Monate 18+).** Priorität 1: vlCVX-Akkumulation. Wenn genug Protokoll-Revenue existiert, ein Teil in vlCVX (Convex-Voting-Token) investieren. Das gibt dem Protokoll direkte Voting-Power im Convex-Ökosystem, effizienter als dauerhafte Bribes. Priorität 2: Diversifizierung der Liquiditäts-Strategien. Curve ist wichtig, aber nicht der einzige Markt. Gleichzeitig Balancer, Uniswap V3 konzentrierte Liquidität, andere DEX-Integrationen aufbauen. Nicht zu sehr von einem einzelnen Protokoll abhängig machen. Priorität 3: Protokoll-Governance für LP-Incentivierung. Eventuell eigene ve-Struktur aufbauen, wo Halter deines Governance-Tokens locken können für Boost auf deinem Stablecoin-Pool. Das schließt den Kreis der Incentivierung innerhalb deines eigenen Ökosystems. **Warum diese Reihenfolge:** Frühe Phase (Bribes-first) ist günstig und schnell. Mittlere Phase (Diversifizierung) baut Robustheit. Späte Phase (eigene ve-Struktur) reduziert externe Abhängigkeiten. **Was zu vermeiden ist:** Erstens: gigantische CRV-Akkumulation von Tag 1. Das bindet zu viel Kapital zu früh, bevor du weißt, ob dein Protokoll überlebt. Zweitens: Alles-auf-Bribes-Strategie ohne eigene Position. Wenn Bribes teurer werden oder du weniger Budget hast, kollabiert deine Liquidität. Drittens: Curve allein als Liquiditäts-Strategie. Single-Protocol-Risk ist zu hoch. **Realistische Einschätzung:** Diese Strategie war die Standard-Roadmap für neue Stablecoins 2021-2022. Protokolle, die das gut umgesetzt haben (FRAX, MIM, Magic Internet Money in früherer Phase), wuchsen schnell. Protokolle, die es ignoriert haben, blieben klein oder starben. 2024-2025 hat sich die Landschaft geändert — Curve ist weniger zentral, andere DEXs (Uniswap V4, Balancer) bieten Alternativen. Die Strategie muss angepasst werden, aber die Grundprinzipien (Bribes, ve-Akkumulation, Diversifizierung) bleiben gültig.
</details>

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → Warum Emissionen wertvoll sind → Drei Kontroll-Wege → Vier Hauptakteure → Historische Timeline → Bribe-Wirtschaft → Ethische Debatten und Retail-Implikationen
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — Curve-Wars-Zeitleiste, Akteure-Netzwerk-Diagramm, Bribe-Ökonomie-Flussdiagramm, veCRV-Verteilungs-Chart, Gauge-Weight-Beispiel

Pipeline: Gamma → ElevenLabs → CapCut.

---
