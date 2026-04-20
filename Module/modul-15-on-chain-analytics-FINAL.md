# Modul 15 — On-Chain Analytics

**Zielgruppe:** Fortgeschrittene
**Geschätzte Dauer:** 110–130 Minuten
**Voraussetzungen:** Module 1–14 abgeschlossen (insbesondere Modul 3 Blockchain-Mechanik, Modul 9 DeFi-Risiken, Modul 13 veTokenomics, Modul 14 Cross-Chain)

**Kursstufe:** Advanced (Analyse & Monitoring)
**Lektionsanzahl:** 6
**Didaktische Ausrichtung:** Analyse-Philosophie, DeFiLlama, Etherscan, Dune, Wallet-Tracking, Dashboard-Aufbau
**Konformität:** Final Fix Document v1 — Struktur, Terminologie und Pipeline-Assets harmonisiert

**Harmonisierte Terminologie (gültig im gesamten Modul):**
- On-Chain Analytics, Data Availability, Immutability
- TVL, Volume, Fees, Real Yield
- Block Explorer (Etherscan, Blockscout, Routescan)
- Dune Analytics, SQL-Query, Dashboard
- Nansen, Arkham, TokenTerminal, Zapper, DeBank
- Smart Money, Whale Tracking, Wallet Clustering
- Smart Contract Risk, Dependency Risk, Composability Risk

**Querverweise:**
- Die Fix-Doc-Erweiterung ist **neue Lektion 15.6 "Building an Analytics Dashboard"** (Dune + DeFiLlama + Nansen + Arkham + TokenTerminal) — explizit als integrative Praxis-Lektion eingeführt.
- Die TVL-Konzepte (Modul 9, 13) und Risikoanalyse (Modul 7, 11, 14) werden hier in konkrete Monitoring-Praktiken überführt.
- Die On-Chain-Analysen bereiten die Portfolio-Construction-Themen (Modul 17) vor.

**Video-Pipeline:** Jede Lektion ist für Gamma (Folien) → ElevenLabs (Voice) → CapCut (Video) vorbereitet. Zielvideo-Länge pro Lektion: 8–10 Minuten (120–140 WPM).

---

## Modul-Überblick

On-Chain Analytics ist die Disziplin, die aus öffentlich verfügbaren Blockchain-Daten handlungsrelevante Einsichten destilliert. Jede Transaktion, jede Position, jeder Token-Transfer auf Ethereum und den großen L2s ist öffentlich und permanent gespeichert. Dieser Datenfundus ist einzigartig in der Finanzgeschichte — in traditionellen Märkten existiert nichts Vergleichbares. Wer ihn lesen kann, hat einen strukturellen Informationsvorteil gegenüber denen, die nur Schlagzeilen und Kursdiagrammen folgen.

Gleichzeitig ist On-Chain-Analyse eine Disziplin, die leicht in zwei Fehlformen verfällt. Die erste Fehlform ist Datenblindheit — man schaut auf Zahlen, die oberflächlich eindrucksvoll wirken (hohes TVL, großes Volumen, viele Transaktionen), ohne zu verstehen, was sie bedeuten. TVL kann durch Rehypothekation mehrfach gezählt werden, Volumen kann Wash Trading sein, Transaktionen können Bot-Aktivität reflektieren. Die zweite Fehlform ist Datenfetisch — man glaubt, dass On-Chain-Daten die vollständige Wahrheit zeigen. Aber viele wichtige Kräfte in DeFi sind off-chain: Team-Entscheidungen, Social-Media-Stimmung, regulatorische Dynamik, technische Roadmaps. On-Chain-Daten sind eine wichtige Komponente der Analyse, nicht die Gesamtheit.

**Die konservative Perspektive:** On-Chain-Analyse ist ein Werkzeug zur Verbesserung von Entscheidungen, kein Ersatz für Urteilsvermögen. Das Ziel ist nicht, möglichst viele Metriken zu verfolgen, sondern die richtigen Fragen zu stellen und die passenden Daten zu finden, die sie beantworten. Ein disziplinierter Analyst nutzt drei bis fünf Kern-Tools konsequent und ignoriert die meisten anderen. Er weiß, was jede Metrik wirklich misst, und er kennt ihre Grenzen.

Dieses Modul behandelt sechs Lektionen, die zusammen eine vollständige Analyse-Praxis aufbauen:

1. **Die Philosophie der On-Chain-Analyse** — Was Daten zeigen, was sie verbergen, und wie man sinnvolle Fragen stellt
2. **DeFiLlama als zentrales Tool** — TVL, Yields, Bridges, Hacks, Chains in einem einzigen Interface
3. **Etherscan und Block-Explorer Mastery** — Transaktionen, Contracts und Approvals direkt lesen
4. **Dune Analytics und Custom Queries** — Eigene Dashboards für spezifische Fragen
5. **Wallet-Tracking und die persönliche Research-Routine** — Nansen, Arkham, Zapper, DeBank und wie man sie systematisch nutzt
6. **Building an Analytics Dashboard** — Integrierte Praxis: Dashboard-Aufbau mit Dune, DeFiLlama, Nansen, Arkham und TokenTerminal

---

## Lektion 15.1 — Die Philosophie der On-Chain-Analyse

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Erklären, was On-Chain-Daten fundamental zeigen können und welche strukturellen Grenzen sie haben
- Die drei Analyse-Ebenen unterscheiden: Protokoll-Metriken, Markt-Metriken, Wallet-Aktivität
- Typische Fehlinterpretationen (TVL-Doppelzählung, Wash Trading, Sybil-Aktivität) erkennen
- Eine konkrete Analyse-Frage so formulieren, dass sie mit On-Chain-Daten beantwortbar ist
- Datenblindheit und Datenfetisch als zwei gegensätzliche Fehlformen benennen und durch disziplinierte Analyse vermeiden
- Die Grenze zwischen On-Chain-Daten und Off-Chain-Kontext (Team, Regulatorik, Community) in eigenen Analysen korrekt einordnen

### Erklärung

**Was On-Chain-Daten fundamental sind**

Eine Blockchain ist ein öffentliches, permanentes Register aller Transaktionen seit Genesis. Jede Adresse, jede Transaktion, jeder Smart-Contract-Call, jeder Token-Transfer ist lesbar — nicht nur vom Netzwerk selbst, sondern von jedem, der einen Block-Explorer öffnet. Das ist ein kategorialer Unterschied zu traditionellen Finanzsystemen. In einer Bank sehen nur die Bank und eventuell Regulatoren den Cashflow zwischen Konten. Auf Ethereum sieht jeder Mensch auf der Welt jede Transaktion — in Echtzeit und historisch.

Daraus ergeben sich vier strukturelle Fähigkeiten der On-Chain-Analyse:

**1. Verifikation statt Vertrauen.** Wenn ein Protokoll behauptet, "wir haben 5 Milliarden USD TVL", kann man das prüfen. Nicht durch einen Audit-Report, sondern durch direktes Betrachten der Smart-Contract-Balances. Diese Prüfbarkeit ist einer der fundamentalen Vorteile von DeFi gegenüber traditionellen Finanzprodukten.

**2. Historische Kontinuität.** Man kann nicht nur den aktuellen Stand sehen, sondern jede Veränderung in der Vergangenheit rekonstruieren. Wann ist das TVL gewachsen? Wann hat ein bestimmter Wal eine Position aufgebaut? Wie hat sich die Adoption über Zeit entwickelt? Die Zeitdimension ist vollständig verfügbar.

**3. Aggregatanalyse.** Man kann nicht nur einzelne Transaktionen sehen, sondern Muster über viele Tausend Adressen hinweg analysieren. Welche Wallets haben in den letzten 7 Tagen signifikante Positionen aufgebaut? Welche Contracts werden besonders viel genutzt? Welche Chains gewinnen Marktanteil?

**4. Entitäts-Tracking.** Öffentliche Labels (von Etherscan, Nansen, Arkham) erlauben es, Adressen mit bekannten Entitäten zu verknüpfen — Exchanges, große Protokolle, identifizierte Whales, sogar einzelne Personen, die ihre Adresse offengelegt haben. Das ermöglicht Flow-Analysen: "Wo fließt Kapital von Coinbase hin?" ist eine beantwortbare Frage.

**Was On-Chain-Daten nicht zeigen**

Gleichzeitig sind die strukturellen Grenzen wichtig. On-Chain-Analyse zeigt nicht:

**1. Motivation.** Man sieht, dass Wallet X 1000 ETH verkauft hat. Man sieht nicht, warum. War es eine taktische Neupositionierung? Eine Liquidation? Eine gezwungene Fondsanteil-Auszahlung? Ein Test-Transfer? Die gleiche Transaktion kann völlig unterschiedliche Bedeutungen haben.

**2. Identität hinter Pseudonymen.** Die Standard-Ethereum-Adresse `0x742d35...` ist pseudonym. Man kann die Transaktionsgeschichte rekonstruieren, aber oft nicht wissen, wer hinter der Adresse steht. Einige Adressen sind bekannt (CEOs, die ihre Adresse teilen; große Protokolle mit deklarierten Treasury-Adressen), aber die meisten sind anonym.

**3. Off-Chain-Entscheidungen.** Team-Meetings, interne Strategie-Diskussionen, regulatorische Gespräche, VC-Verhandlungen — alles das passiert off-chain. On-Chain sieht man nur die Resultate: eine Governance-Abstimmung, ein Code-Deployment, eine große Token-Bewegung. Die Kontext-Ebene fehlt.

**4. Soziale Dynamiken.** Narrative, Hype-Zyklen, Vertrauensverschiebungen — diese operieren auf Social-Media-Ebene und durchdringen die On-Chain-Daten erst mit Verzögerung. Wer nur On-Chain-Daten nutzt, ist blind für das, was sich gerade auf Twitter/X oder in Discord-Servern entwickelt.

**5. Intention vs. Tatsache.** Eine Transaktion zeigt, was passiert ist, nicht was geplant war. Ein gestoppter Angriff (Bug im Hack-Versuch), ein fehlgeschlagener Swap (zu wenig Slippage), ein zurückgenommener Governance-Vote — viele Intentionen kommen nicht in den Daten an.

**Die drei Analyse-Ebenen**

Nützliche On-Chain-Analyse operiert auf drei klar unterscheidbaren Ebenen. Wer sie verwechselt, zieht falsche Schlüsse. **Eine vollständige On-Chain-Analyse integriert drei Perspektiven: Protokoll-Metriken, Markt-Dynamiken und Wallet-Verhalten.** Erst die Integration aller drei Ebenen ergibt ein belastbares analytisches Bild — einzeln betrachtet liefert jede nur einen Ausschnitt.

**Ebene 1: Protokoll-Metriken.**
Hier geht es um einzelne DeFi-Protokolle. Wie viel TVL hat Aave? Wie entwickelt sich die Utilization auf Compound? Welche Märkte sind besonders aktiv? Welche Oracle-Preise werden gepusht? Die Datenquelle sind primär die Smart Contracts des Protokolls selbst, plus Aggregatoren wie DeFiLlama. Die Zielgruppe dieser Analyse: Nutzer des Protokolls, potenzielle Nutzer, Protokoll-Teams.

**Ebene 2: Markt-Metriken.**
Hier geht es um aggregierte Dynamiken über viele Protokolle, Chains und Assets. Wie verteilt sich Kapital zwischen Chains? Welche Stablecoin-Volumina dominieren? Wie entwickelt sich das Gesamt-TVL in DeFi? Welche Narrative zeigen sich in den Flows? Die Datenquelle sind Dashboards wie DeFiLlama, Token Terminal, Artemis. Die Zielgruppe: Portfolio-Manager, Macro-Analysten, strategische Entscheider.

**Ebene 3: Wallet-Aktivität.**
Hier geht es um einzelne Adressen oder Entitäten. Was macht eine bestimmte Whale-Adresse? Wie bewegt Sky Mavis ihre Treasury? Welche Wallets haben vor dem Launch eines Tokens bereits akkumuliert? Die Datenquelle sind spezialisierte Tools wie Nansen, Arkham, Zapper. Die Zielgruppe: Wer spezifische Strategien tracken will (nachmachen oder vermeiden), Journalisten, Investigatoren.

**Warum die Unterscheidung wichtig ist:** Die gleiche Zahl hat auf verschiedenen Ebenen unterschiedliche Bedeutung. "Aave TVL ist um 20% gestiegen" auf Protokoll-Ebene kann positiv sein (Adoption). Dieselbe Zahl auf Markt-Ebene muss relativiert werden (ist das ganze DeFi-TVL mit gestiegen? Ist Aave relativ gewachsen?). Auf Wallet-Ebene ist die Frage noch spezifischer: Wer genau hat dieses zusätzliche Kapital gebracht?

**Drei Begriffe, die oft verwechselt werden: TVL, Liquidität, Kapital**

Bevor wir zu den typischen Fehlinterpretationen kommen, ist eine saubere Trennung von drei eng verwandten, aber nicht identischen Begriffen essentiell. Sie werden in der DeFi-Kommunikation häufig synonym verwendet, beschreiben aber konzeptuell unterschiedliche Dinge.

**TVL (Total Value Locked)** beschreibt den aktuellen USD-Wert aller Assets, die in den Smart Contracts eines Protokolls hinterlegt (deponiert) sind. TVL ist eine Bestandsgröße — eine Momentaufnahme dessen, was zu einem bestimmten Zeitpunkt im Protokoll gesperrt ist. Wichtig: TVL misst deponiertes Kapital, nicht notwendigerweise sofort handelbares oder verfügbares Kapital. Ein 7-Tage-gestaktes Asset, ein als Collateral hinterlegter Token, ein in einem Vesting-Contract gebundener Anspruch — alle zählen zum TVL, obwohl sie in einem bestimmten Moment keineswegs liquide sind.

**Liquidität** beschreibt etwas Anderes: die Fähigkeit, Kapital ohne signifikanten Preis-Impact zu bewegen. Sie misst die Tiefe eines Marktes — wie viel Kapital man kaufen oder verkaufen kann, bevor der Preis spürbar ausschlägt. Ein Uniswap-Pool mit 10 Mio USD TVL hat keineswegs 10 Mio USD an frei handelbarer Liquidität: Die effektive Handels-Liquidität ist typischerweise deutlich geringer, weil jeder signifikante Trade Slippage erzeugt. Liquidität ist zudem eine Fluss-Größe im Moment — sie ändert sich mit jeder Transaktion.

**Kapital** ist der weitere, allgemeinere Begriff: wirtschaftliches Vermögen, das für produktive oder spekulative Zwecke eingesetzt wird. Nicht alles Kapital ist in Form von TVL gebunden (Wallets halten auch unverstakte Token), und nicht alles TVL repräsentiert dediziertes "aktives" Kapital (vieles ist opportunistisches Mercenary Capital, das bei erster Gelegenheit wieder abfließt).

**Die praktische Konsequenz:** Ein Protokoll mit 2 Mrd USD TVL ist nicht automatisch ein Protokoll mit 2 Mrd USD handelbarer Liquidität. Ein TVL-Anstieg signalisiert nicht zwingend, dass "mehr Kapital" in DeFi kommt — oft ist es nur Preissteigerung bereits deponierter Assets oder Rehypothekation bereits vorhandenen Kapitals. Wer TVL, Liquidität und Kapital synonym verwendet, wird systematisch falsche Schlüsse ziehen. Die präzise Unterscheidung ist die Grundlage jeder seriösen On-Chain-Analyse.

**Die typischen Fehlinterpretationen**

**Fehler 1: TVL als Heiligtum.**
Total Value Locked ist die am häufigsten zitierte Metrik. Sie hat ernsthafte Probleme. Rehypothekation wird doppelt gezählt: wenn Nutzer ETH in Lido staken (1. Zählung) und dann stETH in Aave als Collateral hinterlegen (2. Zählung), erscheint dasselbe Kapital in beiden Protokoll-TVLs. Ein gesundes aggregiertes TVL-Bild müsste das bereinigen — die meisten Dashboards tun das nicht. Token-Preis-Volatilität ist ein weiteres Problem: ein Anstieg des TVL kann einfach Preisanstieg des im TVL enthaltenen Tokens sein, nicht neue Einlagen.

**Hohes TVL ist kein Sicherheits-Indikator.** Eine besonders hartnäckige Fehlannahme ist: "Dieses Protokoll hat hohes TVL, also muss es sicher sein." Diese Gleichsetzung ist strukturell falsch. TVL sagt nur aus, wie viel Kapital aktuell in einem Protokoll deponiert ist — nicht, warum es dort ist und was es über die Sicherheit des Protokolls aussagt. Hohes TVL kann aus vielen strukturell unterschiedlichen Gründen entstehen:

- **Echte Nutzer-Adoption** — Menschen nutzen das Protokoll, weil es einen klaren Nutzen bietet (Aave, Uniswap in reifen Phasen).
- **Incentive-Programme** — Token-Emissionen als Rewards ziehen Kapital an, das nur wegen der Rewards bleibt (Mercenary Capital). Sobald das Programm ausläuft, fließt das Kapital ab.
- **Leveraged Positions und Rehypothekation** — viele Nutzer hebeln ihre Deposits, wodurch dasselbe zugrundeliegende Kapital mehrfach ins TVL einfließt. Das Protokoll wirkt größer, als es netto wirklich ist.
- **Temporary Liquidity Mining** — kurzfristige Kampagnen, die TVL künstlich aufblähen, ohne dass nachhaltige Nutzung dahintersteckt.

Die historische Erfahrung zeigt: Einige der katastrophalsten DeFi-Zusammenbrüche (Terra/LUNA, Iron Finance, diverse Yield-Farm-Kollapse) ereigneten sich bei Protokollen mit zum Zeitpunkt des Kollapses hohem oder gar rekordverdächtigem TVL. TVL sagt nichts über Smart-Contract-Qualität, Team-Integrität, Oracle-Robustheit oder strukturelle Tokenomics-Stabilität aus — alles Faktoren, die die tatsächliche Sicherheit bestimmen. Ein seriöser Analytiker interpretiert TVL deshalb immer im Verbund mit weiteren Signalen: Revenue und tatsächliche Gebühren-Einnahmen (misst echte Nutzung), User-Aktivität mit Sybil-Bereinigung, Token-Flows in und aus dem Protokoll, Verteilung des TVL über Wallets (Konzentrations-Risiko), Alter des Protokolls und Audit-Historie. Erst die Kombination dieser Signale ergibt ein belastbares Bild. TVL allein ist eine Schlagzeile, keine Analyse.

**Fehler 2: Volumen ohne Kontext.**
Ein DEX meldet 10 Mrd USD Volumen pro Tag. Beeindruckend? Vielleicht. Aber: Wie viel davon ist Wash Trading (gleiche Adresse handelt mit sich selbst oder wirtschaftlich verbundenen Adressen)? Wie viel ist MEV-Searcher-Aktivität, die eigentlich nur Gas-Arbitrage darstellt? Wie viel ist echtes Retail-Volumen? Das Roh-Volumen überschätzt systematisch die echte Aktivität.

**Fehler 3: Transaktions-Anzahl als Adoptions-Proxy.**
"Chain X hat doppelt so viele Transaktionen wie Chain Y!" klingt nach Adoptions-Führung. Kann aber auch bedeuten: Chain X hat deutlich niedrigere Gas-Kosten, weshalb Bots viele winzige Transaktionen fahren. Oder: Chain X hat ein spezifisches Ökosystem (Gaming, Airdrop-Farming), das hohe Transaktions-Zahlen generiert, aber geringe ökonomische Bedeutung. Aktive Adressen oder wertgewichtete Metriken sind aussagekräftiger.

**Fehler 4: Sybil-Blindheit.**
Eine scheinbar breite Nutzerbasis (viele Adressen, viele Nutzer) kann Sybil-Aktivität sein — eine einzelne Person oder Gruppe betreibt 10.000 Wallets, um Airdrops zu farmen oder Metriken zu blähen. Seriöse Analyse versucht, Sybil-Patterns zu identifizieren: gleiche Funding-Quelle, koordinierte Transaktions-Zeitpunkte, ähnliche Aktivitätsmuster. Ohne diese Bereinigung sind "Nutzer"-Zahlen oft massiv überschätzt.

**Fehler 5: Korrelation mit Kausation verwechseln.**
"Als Wallet X kaufte, stieg der Kurs" — das kann Ursache-Wirkung sein oder Zufall. Viele Wal-Watchers überinterpretieren Korrelationen. Ein einzelner großer Kauf ist oft weniger wichtig als die gesamte Markt-Dynamik zum Zeitpunkt des Kaufs.

**On-Chain-Daten als nachlaufende Indikatoren**

Eine konzeptuelle Einordnung, die in der praktischen Analyse oft unterschätzt wird: On-Chain-Daten sind in den meisten Fällen **nachlaufende Indikatoren (Lagging Indicators)**, keine vorausschauenden Prognose-Werkzeuge. Sie dokumentieren, was bereits geschehen ist — sie erklären Marktverhalten zuverlässig im Nachhinein, können aber zukünftige Bewegungen nicht systematisch vorhersagen.

Beispiele für die Lag-Struktur: TVL-Anstiege folgen typischerweise Preissteigerungen der deponierten Tokens, nicht umgekehrt. Wenn ETH um 30% steigt, steigt das ETH-denominierte TVL vieler Protokolle mit — das TVL hat den Preisanstieg nicht verursacht, es reflektiert ihn. Exchange-Netflows sind meist eine Reaktion auf bereits laufende Marktdynamiken (Liquidationen, Trend-Folge-Verhalten), nicht deren Ursache. Wallet-Akkumulations-Muster werden oft erst klar sichtbar, nachdem die zugrundeliegende Bewegung bereits stattgefunden hat. Stablecoin-Supply-Änderungen laufen typischerweise Marktzyklen hinterher, nicht vor.

Das bedeutet nicht, dass On-Chain-Analyse wertlos ist — im Gegenteil. Aber der Wert liegt in anderen Dimensionen als Prognose: im Verständnis struktureller Dynamiken (wer hält, wer bewegt, wer ist engagiert), in der Früherkennung von Risiko-Signalen (ungewöhnliche Reserve-Abflüsse, Konzentrations-Veränderungen, aktive Admin-Interaktionen), in der Verifizierung von Marketing-Aussagen (stimmen die behaupteten Metriken mit den On-Chain-Realitäten überein), und in der historischen Rekonstruktion (warum genau ist etwas passiert). Wer On-Chain-Daten als Kristallkugel betrachtet, wird regelmäßig enttäuscht. Wer sie als präzises retrospektives Werkzeug zur Erklärung, Verifikation und Risiko-Identifikation nutzt, hat einen strukturellen Analyse-Vorteil. Seltene Ausnahmen existieren — bestimmte Vorlauf-Indikatoren wie Smart-Money-Akkumulation oder Bridge-Reserven-Abflüsse können in engen Kontexten prognostische Aussagen unterstützen — aber sie sind die Ausnahme, nicht die Regel, und nie deterministisch.

**Wie man sinnvolle Fragen stellt**

Gute On-Chain-Analyse beginnt mit einer präzisen Frage. Eine präzise Frage hat drei Eigenschaften:

1. **Sie ist mit verfügbaren Daten beantwortbar.** "Wird Aave überleben?" ist keine On-Chain-Frage, weil sie auf Zukunfts-Vorhersage basiert. "Wie hat sich Aaves USDC-Utilization in den letzten 90 Tagen entwickelt?" ist eine klar beantwortbare On-Chain-Frage.

2. **Sie führt zu einer Entscheidung.** Analyse ohne Entscheidungsrelevanz ist akademisch. "Wie viele Validatoren hat Ethereum?" ist eine Wissensfrage, keine Analyse-Frage. "Sollte ich meine stETH-Position reduzieren, basierend auf Liquiditäts-Metriken?" ist eine Entscheidungs-Frage, die Analyse erfordert.

3. **Sie ist falsifizierbar.** Eine gute Analyse-Frage hat eine klare Antwort, die durch Daten bestätigt oder widerlegt werden kann. "Ist Aave ein gutes Protokoll?" ist zu vage. "Hat Aave in den letzten 12 Monaten einen niedrigeren Bad-Debt-Anteil als Compound?" ist falsifizierbar.

**Der Analyse-Workflow:**

1. Frage formulieren (präzise, beantwortbar, entscheidungsrelevant)
2. Datenquelle identifizieren (welches Tool hat die Daten?)
3. Daten extrahieren (möglichst in Roh-Form, nicht nur aggregiert)
4. Plausibilitäts-Prüfung (sind die Zahlen konsistent mit anderen Quellen?)
5. Interpretation (was bedeutet das Ergebnis konkret?)
6. Entscheidung (wie handle ich basierend darauf?)

Wer diese Schritte routiniert durchläuft, betreibt Analyse. Wer direkt zu Schritt 5 springt (Interpretation ohne Daten-Grundlage), betreibt Spekulation mit analytischem Anstrich.

### Folien-Zusammenfassung

**[Slide 1] — Titel**
Die Philosophie der On-Chain-Analyse

**[Slide 2] — Was On-Chain-Daten fundamental sind**
Jede Transaktion öffentlich, permanent, in Echtzeit lesbar.
Ein Datenfundus ohne Vergleich in der Finanzgeschichte.

**[Slide 3] — Die vier Fähigkeiten**
1. Verifikation statt Vertrauen
2. Historische Kontinuität
3. Aggregatanalyse über viele Wallets
4. Entitäts-Tracking (via Labels)

**[Slide 4] — Die strukturellen Grenzen**
Keine Motivation, keine Identität, keine Off-Chain-Entscheidungen
Keine sozialen Dynamiken, keine Intentionen
Daten zeigen, was passierte — nicht, warum

**[Slide 5] — Die drei Analyse-Ebenen**
1. Protokoll-Metriken (einzelnes Protokoll)
2. Markt-Metriken (aggregierte Dynamiken)
3. Wallet-Aktivität (einzelne Adressen)

**[Slide 6] — Fünf typische Fehlinterpretationen**
1. TVL als Heiligtum (Rehypothekation, Preisvolatilität)
2. Volumen ohne Kontext (Wash Trading, MEV)
3. Transaktions-Anzahl als Adoption (Bot-Blindheit)
4. Sybil-Blindheit (Airdrop-Farmer)
5. Korrelation mit Kausation verwechseln

**[Slide 7] — Wie man sinnvolle Fragen stellt**
Präzise, beantwortbar, entscheidungsrelevant, falsifizierbar
"Wird X überleben?" — nein. "Wie hat sich Y entwickelt?" — ja.

**[Slide 8] — Der Analyse-Workflow**
Frage → Quelle → Daten → Plausibilität → Interpretation → Entscheidung

### Sprechertext

**[Slide 1]** Modul 15 beginnt nicht mit Tools, sondern mit Philosophie. Das ist eine bewusste Entscheidung. Wer die Tools vor dem Denken lernt, produziert Datenlawinen ohne Erkenntnis. Wer das Denken zuerst lernt, nutzt die Tools gezielt.

**[Slide 2]** On-Chain-Daten sind fundamental ein öffentliches, permanentes Register aller Transaktionen seit Ethereum Genesis. Jede Adresse, jede Transaktion, jeder Smart-Contract-Call ist lesbar — nicht nur vom Netzwerk selbst, sondern von jedem Menschen mit einem Block-Explorer. Das ist ein kategorialer Unterschied zu traditionellen Finanzsystemen, wo nur Banken und Regulatoren solche Einblicke haben. In DeFi hat jeder Analyst die gleichen Roh-Daten wie das Protokoll-Team selbst.

**[Slide 3]** Daraus ergeben sich vier strukturelle Fähigkeiten. Erstens: Verifikation statt Vertrauen. Wenn ein Protokoll 5 Milliarden TVL behauptet, kann man das direkt prüfen — Smart-Contract-Balances, nicht PR-Reports. Zweitens: Historische Kontinuität. Nicht nur der aktuelle Stand, sondern jede Veränderung in der Vergangenheit ist rekonstruierbar. Drittens: Aggregatanalyse. Muster über tausende Adressen erkennen, nicht nur Einzeltransaktionen. Viertens: Entitäts-Tracking. Labels verknüpfen Adressen mit bekannten Entitäten — Exchanges, Protokolle, identifizierte Whales. Flow-Analysen werden möglich.

**[Slide 4]** Gleichzeitig sind die Grenzen wichtig. On-Chain zeigt nicht die Motivation — man sieht, dass 1000 ETH verkauft wurden, nicht warum. Nicht die Identität — viele Adressen bleiben pseudonym. Nicht die Off-Chain-Entscheidungen — Team-Meetings, regulatorische Gespräche, VC-Verhandlungen passieren off-chain. Nicht die sozialen Dynamiken — Narrative und Hype-Zyklen entwickeln sich auf Twitter und in Discord, nicht in Smart-Contract-Calls. Nicht die Intention — nur die tatsächlichen Transaktionen, nicht, was geplant war.

**[Slide 5]** Nützliche On-Chain-Analyse operiert auf drei klar unterscheidbaren Ebenen. Protokoll-Metriken: einzelne DeFi-Protokolle, ihre TVL, ihre Utilization, ihre Nutzung. Markt-Metriken: aggregierte Dynamiken über viele Protokolle und Chains, Kapital-Flows, Narrative-Bildung. Wallet-Aktivität: einzelne Adressen oder Entitäten, Whale-Positionen, Treasury-Bewegungen. Die gleiche Zahl hat auf verschiedenen Ebenen unterschiedliche Bedeutung. Wer sie verwechselt, zieht falsche Schlüsse.

**[Slide 6]** Fünf typische Fehlinterpretationen, die man vermeiden muss. Erstens: TVL als Heiligtum behandeln. Rehypothekation wird doppelt gezählt — wenn Nutzer ETH staken und dann stETH als Collateral hinterlegen, erscheint dasselbe Kapital in beiden TVLs. Zweitens: Volumen ohne Kontext interpretieren. Wash Trading und MEV-Aktivität blähen das scheinbare Volumen. Drittens: Transaktions-Anzahl als Adoption gleichsetzen. Viele Transaktionen können Bot-Aktivität bedeuten, nicht ökonomisch relevante Nutzung. Viertens: Sybil-Blindheit. Eine scheinbar breite Nutzerbasis kann durch einzelne Entitäten mit tausenden Wallets erzeugt sein. Fünftens: Korrelation mit Kausation verwechseln. Ein einzelner Wal-Kauf ist selten die Ursache der nachfolgenden Preisbewegung.

**[Slide 7]** Gute Analyse beginnt mit einer präzisen Frage. Drei Eigenschaften macht eine Frage gut. Sie ist mit verfügbaren Daten beantwortbar — "Wird Aave überleben?" nein, "Wie hat sich Aaves Utilization entwickelt?" ja. Sie führt zu einer Entscheidung — Analyse ohne Entscheidungsrelevanz ist akademisch. Sie ist falsifizierbar — eine klare Antwort, die durch Daten bestätigt oder widerlegt werden kann.

**[Slide 8]** Der Analyse-Workflow folgt sechs Schritten. Frage formulieren. Datenquelle identifizieren. Daten extrahieren. Plausibilitäts-Prüfung gegen andere Quellen. Interpretation. Entscheidung. Wer diese Schritte routiniert durchläuft, betreibt Analyse. Wer direkt zu Schritt fünf springt — Interpretation ohne Daten-Grundlage — betreibt Spekulation mit analytischem Anstrich. In den folgenden Lektionen lernen wir die konkreten Tools, die jeden dieser Schritte unterstützen.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Split-Screen-Vergleich: links eine traditionelle Bank mit verschlossenen Archiven, rechts eine transparente Blockchain mit sichtbaren Transaktionsflüssen. Das Konzept visualisieren.

**[Slide 3]** Vier-Quadranten-Diagramm mit jeweils Icon für die vier Fähigkeiten: Lupe (Verifikation), Uhr (Historische Kontinuität), Netzwerk (Aggregatanalyse), Tag (Entitäts-Tracking).

**[Slide 4]** Fünf-Punkte-Liste mit rotem "durchgestrichenem" Icon: Motivation, Identität, Off-Chain-Entscheidungen, Soziale Dynamiken, Intention. Visuelle Betonung der Grenzen.

**[Slide 5]** Drei-Ebenen-Pyramide: Wallet-Aktivität unten (viele Datenpunkte, niedrige Aggregation), Protokoll-Metriken Mitte, Markt-Metriken oben (hoch aggregiert, wenige aber bedeutsame Datenpunkte).

**[Slide 6]** Fünf-Beispiele-Tafel: jeweils ein typischer Chart mit rotem Kreuz und darunter die Realität. Plakative Visualisierung der Fehlinterpretationen.

**[Slide 7]** **SCREENSHOT SUGGESTION:** DeFiLlama-Hauptseite (defillama.com) als Einstiegspunkt zur Analyse — zeigt das Ökosystem der verfügbaren Daten.

**[Slide 8]** Workflow-Diagramm: Sechs Kästen verbunden durch Pfeile (Frage → Quelle → Daten → Plausibilität → Interpretation → Entscheidung), mit den Tools, die in den folgenden Lektionen behandelt werden, jeweils rechts zugeordnet.

### Übung

**Aufgabe: Eine eigene Analyse-Frage formulieren und validieren**

Denke an eine DeFi-Position, die du aktuell hältst oder überlegst aufzubauen. Formuliere **drei Analyse-Fragen** dazu — eine auf jeder der drei Ebenen (Protokoll, Markt, Wallet). Prüfe jede Frage gegen die drei Kriterien (beantwortbar mit verfügbaren Daten, entscheidungsrelevant, falsifizierbar).

Beispiel für eine Aave-Position:
- **Protokoll-Ebene:** "Wie hat sich die USDC-Utilization auf Aave V3 Ethereum in den letzten 90 Tagen entwickelt? Ist sie stabil oder volatil?"
- **Markt-Ebene:** "Wie verteilt sich das Gesamt-Lending-TVL zwischen Aave, Morpho, Compound und Spark? Gewinnt Aave relativ oder verliert es Marktanteil?"
- **Wallet-Ebene:** "Gibt es einzelne große Deposits oder Withdrawals in den letzten 30 Tagen, die auf Whale-Aktivität hindeuten?"

Für jede deiner Fragen:
1. Ist sie präzise genug? Könntest du das Ergebnis in einem Satz klar formulieren?
2. Welche Daten-Quelle würde sie beantworten? (Die konkreten Tools lernen wir in den folgenden Lektionen.)
3. Welche Entscheidung würde das Ergebnis beeinflussen? (Position vergrößern, halten, reduzieren?)

**Deliverable:** Schriftliche Ausarbeitung von drei Analyse-Fragen mit jeweils Bewertung gegen die drei Kriterien, plus Reflexion: Welche Frage findest du am nützlichsten für deine aktuelle Entscheidungssituation? Welche wäre am schwierigsten zu beantworten? Warum?

### Quiz

**Frage 1:** Ein Protokoll zeigt auf seiner Webseite: "TVL: 3.2 Milliarden USD — ein Anstieg von 45% in den letzten 30 Tagen." Warum ist diese Aussage alleine nicht ausreichend, um "das Protokoll wächst stark" zu folgern?

<details>
<summary>Antwort anzeigen</summary>

Die Aussage enthält mehrere implizite Annahmen, die alle kritisch geprüft werden müssen, bevor man daraus eine Wachstums-Aussage ableiten kann. **Problem 1: Token-Preis-Effekt.** TVL wird in USD gemessen, aber das gelockte Kapital besteht oft aus volatilen Assets. Wenn ein Protokoll primär ETH, Bitcoin-Derivate oder andere volatile Tokens lockt, und der Preis dieser Tokens in den letzten 30 Tagen um 30% gestiegen ist, dann ist ein TVL-Anstieg von 45% fast vollständig durch Preis-Bewegung erklärt — nicht durch neue Einlagen. Die relevante Frage ist: wie hat sich das TVL in Token-Einheiten (nicht USD) entwickelt? Bei einem stabilen Token-Count und steigendem Preis ist das "Wachstum" illusorisch. **Problem 2: Rehypothekation / Doppelzählung.** Wenn das Protokoll ein Lending-Markt ist, kann dasselbe Kapital mehrfach in das TVL einfließen. Ein Nutzer hinterlegt 1 ETH als Collateral, leiht 0,5 ETH in einer anderen Währung, hinterlegt die geliehene Position erneut — TVL-seitig sieht das wie mehrere Einlagen aus. Wenn ein Protokoll in einer Phase der Leverage-Expansion ist (viele Nutzer bauen gehebelte Positions auf), wächst TVL schnell, obwohl kein neues Kapital ins System kommt. **Problem 3: Incentive-Programme.** Viele Protokolle starten Anreiz-Programme — zusätzliche Token-Emissionen für Deposits. Das zieht kurzfristig "Mercenary Capital" an, Kapital das nur wegen der Rendite da ist. Wenn TVL 45% wächst, während ein Rewards-Programm aktiv ist, ist die relevante Frage: wie viel vom Wachstum bleibt, wenn das Programm endet? Historisch: meist verlieren Protokolle nach Programmende 30-70% des angezogenen Kapitals innerhalb weniger Wochen. **Problem 4: Einzel-Wale vs. breite Adoption.** 45% TVL-Anstieg kann eine Person bedeuten, die einen großen Deposit gemacht hat. Oder tausende neue Nutzer. Die Verteilung des Kapitals ist entscheidend für Robustheit. Ein TVL, das zu 80% aus drei Wallets besteht, ist strukturell instabil — wenn einer davon exit macht, kollabiert die Zahl. Ein TVL, das sich auf tausende Adressen verteilt, ist robuster. **Problem 5: Relative vs. absolute Entwicklung.** 45% Wachstum klingt stark, aber wie hat sich der Gesamt-DeFi-Markt in derselben Zeit entwickelt? Wenn DeFi insgesamt 50% gewachsen ist, dann ist das Protokoll relativ gesehen unterperformt. Wenn DeFi nur 5% gewachsen ist, ist 45% beeindruckend. Ohne diese Kontextualisierung ist die absolute Zahl bedeutungslos. **Problem 6: Measurement-Artefakte.** DeFiLlama und andere Dashboards haben Definitions-Details — was wird als TVL gezählt, was nicht? Viele Protokolle haben TVL-Veränderungen, die allein durch neue Token-Integration oder Methodik-Updates entstehen. 45% kann ein Daten-Artefakt sein, kein echtes Wachstum. **Die saubere Analyse-Frage:** Die richtige Frage ist nicht "wächst das Protokoll?" sondern "bereinigt um Token-Preis, Rehypothekation, Incentive-Programme und relative Markt-Entwicklung — wächst die echte Nutzung?" Das ist eine aufwändige, aber beantwortbare Frage. Sie erfordert: Token-Unit-TVL-Analyse, Differenzierung zwischen erstmaligen Deposits und rehypothekierter Aktivität, Isolation von Rewards-Effekten, Vergleich mit anderen Protokollen und dem Gesamt-Markt. **Die praktische Konsequenz:** Wenn ein Protokoll-Team oder Marketing-Material eine TVL-Zahl ohne Kontext präsentiert, ist das ein Signal. Seriöse Teams kontextualisieren ihre Metriken selbst. Wer sich auf "45% Wachstum" als alleinige Aussage stützt, ist entweder naiv oder manipulativ — in beiden Fällen unzuverlässiger Informations-Quelle. **Das übergeordnete Prinzip:** TVL ist eine praktische Metrik, aber sie ist ein Ausgangspunkt, keine Antwort. Sie muss immer durch weitere Fragen ergänzt werden: In welcher Währung? Wie verteilt? Über welche Zeit? Wie ist die Marktentwicklung? Was sind die Treiber? Erst mit diesen Ergänzungen wird TVL analytisch nützlich.

</details>

**Frage 2:** Ein Analyst veröffentlicht auf Twitter: "Die Wallet 0xABC... hat gerade 50.000 ETH auf eine Exchange gesendet — Bearish Signal für den Markt!" Warum sollte man dieser Interpretation mit Skepsis begegnen, und wie würde eine saubere Analyse aussehen?

<details>
<summary>Antwort anzeigen</summary>

Die Behauptung verbindet eine Beobachtung (Transaktion) mit einer Interpretation (Bearish Signal), ohne die Lücke zwischen beiden zu schließen. Eine saubere Analyse erkennt mehrere Ebenen von Unsicherheit. **Ebene 1: Was war die Transaktion wirklich?** Die oberflächliche Lesart ist: Jemand schickt ETH auf eine Exchange, um dort zu verkaufen. Aber Exchange-Deposits haben viele alternative Erklärungen. (a) OTC-Desk-Aktivität: Der Wal könnte ETH für ein Over-The-Counter-Geschäft hinterlegen — kein Markt-Sell. (b) Rebalancing zwischen CEX-Accounts: Wer multiple Exchange-Accounts nutzt, bewegt Kapital zwischen ihnen. (c) Staking auf CEX: Einige Exchanges bieten Staking an — der Deposit ist für Staking, nicht Verkauf. (d) Collateral für Leveraged Trades: Exchange-Deposits können Collateral für Long-Positions sein — das Gegenteil von Bearish. (e) Custody-Wechsel: Der Wal wechselt den Verwahrer, keine Markt-Absicht. (f) Liquidity für Market Making: Professionelle Market Maker halten signifikante Exchange-Balances. **Ebene 2: Wer ist der Wal überhaupt?** 0xABC ist pseudonym. Ohne zusätzliches Wissen ist unklar: Ist das eine Person? Ein Hedge Fund? Eine Protokoll-Treasury? Eine Exchange-Wallet selbst (die nur intern Kapital bewegt)? Eine Custodial-Wallet, die mehrere Parteien repräsentiert? Die Interpretation hängt vollständig von der Identität ab. Treasury-Bewegungen eines Protokolls sind typisch geplant und off-chain kommuniziert — keine Markt-Signale. Hedge-Fund-Aktivität ist taktisch. Einzelperson-Aktivität kann emotional sein. **Ebene 3: Der Kontext des Markts.** 50.000 ETH sind eine große Menge in absolutem Sinn, aber im Kontext des täglichen Ethereum-Volumens auf Centralized Exchanges fließt deutlich mehr. Wenn die Tägliche Exchange-Deposit-Rate bei 500.000+ ETH liegt, ist eine einzelne 50.000-ETH-Transaktion etwa 10% eines typischen Tages — signifikant, aber nicht außergewöhnlich. Im Kontext ist es wichtig, aber kein Markt-moving Event isoliert. **Ebene 4: Die statistische Basis.** Wenn man historisch analysiert: In wie vielen Fällen folgte auf einen vergleichbaren Deposit (50.000+ ETH) ein tatsächlicher Markt-Verkauf mit Preis-Impact? Die Antwort ist empirisch oft: in einer Minderheit der Fälle. Das bedeutet: die Transaktion ist schwache prediktive Evidenz, selbst wenn sie Informationen enthält. **Ebene 5: Die Kausation-vs-Korrelation-Frage.** Selbst wenn der Wal tatsächlich verkauft — wie groß wäre der Preis-Impact? 50.000 ETH sind etwa 1% des täglichen ETH-Handelsvolumens. Professionelle Verkäufer zerlegen solche Positionen über Stunden bis Tage, um Slippage zu minimieren. Der aggregierte Preis-Impact einer einzelnen solchen Transaktion ist typisch gering, selbst wenn sie vollständig Markt-getrieben ist. **Eine saubere Analyse würde so aussehen:** **Schritt 1: Die Adresse identifizieren.** Via Etherscan, Nansen, Arkham prüfen: Ist die Adresse gelabelt? Welche historische Aktivität hat sie? Gehört sie zu einer bekannten Entität? Wenn die Adresse keine klare Zuordnung hat, ist jede Interpretation spekulativ. **Schritt 2: Ziel-Adresse verifizieren.** Welche Exchange ist das wirklich? Binance, Coinbase, OKX, Kraken haben unterschiedliche User-Basen und Verhaltensmuster. Eine Binance-Einzahlung ist anders zu interpretieren als eine Kraken-Einzahlung (Institutional vs Retail-Dominanz). **Schritt 3: Historische Pattern prüfen.** Hat die Adresse früher schon mal Exchange-Einzahlungen gemacht? Folgte darauf wirklich Markt-Verkauf? Oder typisch andere Muster (Rebalancing, Staking, etc.)? Die historische Base-Rate ist kritisch. **Schritt 4: Kontext der Markt-Dynamik.** Was passiert gerade im breiteren Markt? Ist Volatilität erhöht? Gibt es spezifische News, die den Deposit erklären könnten (z.B. angekündigte Regulierung, Hack-Event, das Rotation triggert)? **Schritt 5: Alternative Hypothesen auflisten.** Bevor man "bearish" konkludiert, alle realistischen alternativen Erklärungen durchgehen. Welche ist wahrscheinlichste? Wie sicher ist man? **Die ehrliche Antwort in diesem Fall:** Die saubere Analyse würde vermutlich konkludieren: "Wallet 0xABC (wahrscheinliche Identität: Hedge-Fund-affiliiert, basierend auf Transaktions-Historie) hat 50.000 ETH auf Binance eingezahlt. Historisch führten solche Einzahlungen dieser Wallet in etwa 40% der Fälle zu nachfolgenden Verkäufen, in 60% zu anderen Aktivitäten. Die Markt-Dynamik ist aktuell neutral. Der potenzielle Preis-Impact eines Full-Sells wäre etwa 0,3-0,8% bei konsequenter Ausführung. Die Transaktion ist beachtenswert, aber kein klares Signal." Das ist weniger attraktiv als "Bearish Signal!", aber analytisch korrekt. **Die Meta-Lehre:** Twitter-Thread-Analysten optimieren oft für Engagement, nicht Wahrheit. "Bearish Signal!" erzeugt mehr Retweets als nuancierte Analyse. Wer ernsthafte Entscheidungen basierend auf solchen Aussagen trifft, optimiert auf die falsche Funktion. Seriöse On-Chain-Analyse ist langweilig: sie enthält viele Konjunktive, Wahrscheinlichkeiten, alternative Hypothesen. Wenn Analyse laut und eindeutig klingt, ist sie meist falsch. **Das übergeordnete Prinzip:** On-Chain-Daten zeigen, was passiert ist. Sie zeigen nicht, warum oder was als Nächstes passiert. Jede Interpretation addiert Annahmen, die selbst validiert werden müssen. Wer Interpretation mit Beobachtung verwechselt, betreibt Spekulation — egal wie viele Daten er zitiert.

</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → Was On-Chain-Daten zeigen → 3 Analyse-Ebenen → Fehlinterpretationen → Datenblindheit vs. Datenfetisch → On-Chain vs. Off-Chain → Analyse-Fragen richtig stellen
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — Analyse-Ebenen-Pyramide, TVL-Doppelzählung-Beispiel, Wash-Trading-Visualisierung, Fragen-Framework-Grafik

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 15.2 — DeFiLlama als zentrales Tool

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die Struktur von DeFiLlama und seine wichtigsten Sektionen (Protocols, Chains, Yields, Bridges, Hacks) navigieren
- TVL-Daten in verschiedenen Bereinigungs-Varianten (inkl./exkl. double counting, borrowed, staking) interpretieren
- Yield-Pages sinnvoll filtern und die typischen Fallen (impermanent loss, Incentive-Expiry, Risk-Score) erkennen
- Chain-Level-Analysen und Bridge-Flow-Daten für eigene Strategien nutzen
- Die Revenue- und Fees-Metriken als fundamentale Profitabilitäts-Indikatoren für Protokolle auswerten
- DeFiLlama-Alerts und Watchlists für kontinuierliches Monitoring aufsetzen

### Erklärung

**Warum DeFiLlama der Standard ist**

DeFiLlama ([defillama.com](https://defillama.com)) ist das am weitesten verbreitete Analyse-Dashboard in DeFi. Es gibt mehrere Gründe dafür. Erstens: Es ist kostenlos und open-source — die Daten-Methodologien sind öffentlich dokumentiert, was in einer Welt voller Marketing-Statistiken selten ist. Zweitens: Die Abdeckung ist breiter als bei kommerziellen Alternativen — über 3.000 Protokolle auf über 200 Chains sind integriert. Drittens: Das Team ist für kritisches Denken bekannt — sie zählen TVL differenziert (mit/ohne double counting, mit/ohne staking), statt marketing-freundliche Maximal-Zahlen zu präsentieren.

Für Retail-Analysten ist DeFiLlama der Einstiegspunkt für fast jede Frage. Viele spezifische Analysen erfordern am Ende andere Tools, aber die Orientierung beginnt meist hier.

**Die Struktur: Die wichtigsten Sektionen**

DeFiLlama gliedert sich in mehrere zentrale Bereiche, die jeweils spezifische Analyse-Zwecke erfüllen.

**Sektion 1: Protocols (defillama.com)**
Die Hauptseite listet alle DeFi-Protokolle nach TVL sortiert. Jedes Protokoll hat eine eigene Detail-Seite mit TVL-Zeitreihe, Chain-Verteilung, Token-Composition, unterstützten Chains und oft zusätzlichen Metriken (Revenue, Fees, Users). Dies ist die primäre Quelle für Protokoll-Level-Analysen.

**Sektion 2: Chains (defillama.com/chains)**
Aggregiert TVL pro Chain. Zeigt, wie sich Kapital zwischen Ethereum, L2s und Alt-L1s verteilt. Wichtig für Chain-Allokations-Entscheidungen (vgl. Modul 14).

**Sektion 3: Yields (defillama.com/yields)**
Aggregiert Yield-Opportunities über viele Protokolle und Chains. Filterbar nach APY, Chain, TVL, Risk-Level. Die zentrale Ressource für Yield-Farmer, aber mit wichtigen Fallen.

**Sektion 4: Bridges (defillama.com/bridges)**
Cross-Chain-Flow-Analyse. Welche Bridges bewegen wie viel Kapital? Welche Chains haben Netto-Inflows vs. Outflows? Kritisch für Markt-Rotations-Analysen (vgl. Modul 14).

**Sektion 5: Hacks (defillama.com/hacks)**
Historisches Archiv aller bekannten DeFi-Hacks. Filterbar nach Kategorie, Betrag, Chain, Jahr. Die beste Quelle für historische Risiko-Analyse.

**Sektion 6: Stablecoins (defillama.com/stablecoins)**
Detaillierter Blick auf Stablecoin-Marktkapitalisierungen, Chain-Verteilung, Peg-Stabilität. Wichtig für Markt-Liquiditäts-Analysen.

**Sektion 7: Derivatives, Options, Perps**
Spezifische Sub-Sektionen für Derivate-Plattformen. Weniger kritisch für konservative Strategien, aber relevant für Markt-Kontext.

**Zusätzlich: Token Unlocks, Raises, DEX-Aggregator, NFT-Daten** — meist Nischen-Tools, aber bei Bedarf wertvoll.

**TVL richtig lesen**

TVL ist die zentralste DeFiLlama-Metrik, aber auch die am häufigsten missverstandene. DeFiLlama selbst bietet mehrere Bereinigungs-Varianten an — sie zu kennen ist die Grundlage seriöser Analyse.

**Variante 1: "Default TVL"**
Was DeFiLlama standardmäßig zeigt. Enthält alle Positionen — auch rehypothekierte. Das ist die "Marketing-freundliche" Zahl, die oft in Schlagzeilen zitiert wird. Nützlich als Orientierung, aber nicht als einzige Referenz.

**Variante 2: "TVL (Borrowed)"**
Bei Lending-Protokollen: enthält die geliehenen Werte im TVL. Relevant für die Marktmacht eines Protokolls, weil geliehenes Kapital tatsächlich genutzt wird. Aber kann wieder doppelt gezählt werden, wenn das geliehene Kapital in anderen Protokollen re-deployed wird.

**Variante 3: "TVL (Staking)"**
Bei Protokollen wie Lido: zählt das Staking-gelockte ETH zum TVL. Technisch korrekt, aber weil dasselbe ETH oft auch in anderen Protokollen (Aave, Curve) erscheint, führt es zu Doppelzählung im aggregierten DeFi-TVL.

**Variante 4: "Pool2"**
LP-Token, bei denen der Protokoll-Token selbst im Pool ist (z.B. PROTOCOL/USDC LP). Wird in vielen Dashboards bewusst getrennt gezeigt, weil es zirkulär ist — der Protokoll-Token ist Teil seiner eigenen Bewertung.

**Variante 5: "Doublecounted Adjusted"**
DeFiLlama bietet in einigen Views explizit die bereinigte Zahl ohne Doppelzählungen. Wenn du Gesamt-DeFi-TVL analysierst, ist das die relevantere Zahl — nicht die Summe aller Protokoll-TVLs.

**Praktische Konsequenz:** Wenn jemand eine TVL-Zahl zitiert, frage: welche Variante? "Ethereum hat 80 Mrd USD TVL" kann bedeuten 80 Mrd doublecounted (inflationiert) oder 50 Mrd bereinigt (realistisch). Der Unterschied ist analyse-relevant.

**Die Yield-Page kritisch nutzen**

Die Yield-Sektion ([defillama.com/yields](https://defillama.com/yields)) listet Tausende von Opportunities mit APYs von 2% bis über 100%. Die natürliche Tendenz ist, nach den höchsten APYs zu filtern. Das ist fast immer ein Fehler.

**Wichtige Filter-Kriterien:**

- **TVL > $10 Mio.** Pools mit wenig TVL können instabil sein — ein einzelner großer Withdraw ändert dramatisch die Liquidität und den APY.
- **Chain-Filter.** Beschränke dich auf Chains, die deine Allokations-Strategie vorsieht. Die beste Yield auf einer Chain, die du nicht nutzt, ist irrelevant.
- **Risk-Column-Score.** DeFiLlama zeigt für viele Pools einen "IL Risk"-Score (Impermanent-Loss-Risiko). A-Rated Pools sind stable-stable (z.B. USDC/USDT), B-Rated sind stable-volatile (z.B. ETH/USDC), C-Rated sind volatile-volatile (z.B. ETH/BTC). Für konservative Strategien meist nur A und ausgewählte B.
- **Base vs. Reward APY.** Der "Base APY" ist, was aus Fees/Interest kommt — strukturell nachhaltig. Der "Reward APY" ist aus Token-Emissionen — kurzfristig, endet wenn Rewards enden. DeFiLlama zeigt oft beide getrennt. Fokussiere auf Base APY für langfristige Einschätzung.
- **7d / 30d APY-Stabilität.** Ein APY, der am heutigen Tag 40% zeigt, aber 7d-Durchschnitt 12% hat, ist nicht nachhaltig 40%. Prüfe die Durchschnitte über längere Zeiträume.

**Real Yield — der kritische Unterscheidungs-Begriff**

Die Unterscheidung zwischen Base APY und Reward APY führt zu einem fundamentalen Konzept der DeFi-Analyse, das eigenständig verdient, definiert zu werden: **Real Yield**.

**Definition:** Real Yield ist diejenige Protokoll-Rendite, die aus realer Nutzungs-Aktivität resultiert — aus tatsächlichen Gebühren, aus Zinseinnahmen von Kreditnehmern, aus Trading-Gebühren von Swaps, aus Performance-Gebühren von Vaults. Sie steht im Gegensatz zu Rendite, die durch Token-Emissionen oder inflationäre Incentive-Programme erzeugt wird. Real Yield entsteht durch echte ökonomische Aktivität im Protokoll; Emission-based Yield entsteht durch Ausgabe neuer Token-Einheiten.

**Warum die Unterscheidung entscheidend ist:** Real Yield ist strukturell nachhaltig — solange das Protokoll genutzt wird und Gebühren generiert, fließt die Rendite. Emission-basierte Rendite dagegen ist zeitlich begrenzt und dilutiv: sie endet, sobald das Emissions-Programm ausläuft, und in der Zwischenzeit verwässert sie die Token-Halter. Ein Protokoll, das 15% APY durch Real Yield liefert, ist fundamental anders als ein Protokoll mit 15% APY durch Token-Emissionen, selbst wenn die nominellen Zahlen identisch aussehen.

**Konkretes Beispiel — Uniswap als Maßstab für Real Yield:** Wenn ein Liquidity Provider in einem Uniswap-Pool Gebühren aus tatsächlichen Token-Swaps verdient (jeweils 0,05% bis 1% pro Swap, je nach Pool-Fee-Tier), ist das Real Yield — jeder Dollar Gebühren stammt von einem realen Nutzer, der einen realen Trade ausgeführt hat. Diese Rendite ist nicht dilutiv für UNI-Token-Halter und fließt, solange das Protokoll genutzt wird. Vergleich: Ein Protokoll, das Liquidity Providern zusätzlich 20% APY in seinem eigenen Governance-Token ausschüttet, erzeugt diese Rendite durch Token-Emissionen — der LP bekommt die Token, aber sie entstehen durch Inflation und ihr Marktwert hängt davon ab, ob die Emissionen in Zukunft durch Gebühren-Einnahmen gedeckt werden. In den meisten Fällen fließt dieses "Incentive-getriebene" Kapital sofort ab, sobald die Emissionen enden, und die Token-Halter bleiben mit verdünnten Beständen zurück.

**Die praktische Konsequenz für Due Diligence:** Bei jedem Yield-Angebot zuerst fragen — kommt diese Rendite aus realen Gebühren (nachhaltig, skalierbar mit Adoption) oder aus Emissionen (temporär, dilutiv, endet)? TokenTerminal und DeFiLlama zeigen bei vielen Protokollen beide Komponenten getrennt. Ein Protokoll mit hohem Real-Yield-Anteil am Gesamtertrag ist ein fundamental gesünderes Investment als eines, das primär durch Emissionen "funktioniert".

**Typische Yield-Page-Fallen:**

- **Expiring Incentives:** Ein Pool zeigt 35% APY. Wenn das Rewards-Programm in 2 Wochen ausläuft, ist die realistische zukünftige APY viel niedriger.
- **Farmed Token Dumping:** Wenn der Reward-Token wenig Liquidität oder starken Verkaufsdruck hat, erhält man zwar APY, aber bei Verkauf entsteht Slippage und Preis-Drop — die realisierte Rendite ist deutlich unter der nominalen.
- **Pool-Alter:** Neue Pools (< 30 Tage) haben oft hohe APYs wegen wenig Konkurrenz, aber sind auch untestet. Etablierte Pools mit moderaten APYs sind oft risiko-adjustiert besser.
- **Audit-Status:** DeFiLlama zeigt für viele Protokolle den Audit-Status. Nicht-auditierte oder junge Protokolle mit hohen APYs sind Risiko-Fallen.

**Bridges-Dashboard für Kapitalfluss-Analyse**

Die Bridges-Sektion ([defillama.com/bridges](https://defillama.com/bridges)) aggregiert Cross-Chain-Flows und zeigt, wohin Kapital aktuell migriert. Für strategische Chain-Allokations-Entscheidungen ist das eine zentrale Datenquelle.

**Was die Bridges-Page zeigt:**
- TVL pro Bridge (wieviel Kapital wird über die Bridge verwahrt)
- Netto-Inflow / Outflow pro Chain (welche Chains gewinnen/verlieren Kapital)
- Historische Flow-Daten (Trends über Zeit)
- Top-Transfer-Routes (welche Chain-Pairs sind am aktivsten)

**Analytische Nutzung:**

**Frage: "Migriert Kapital von Ethereum zu Base?"**
Die Bridges-Page zeigt Netto-Inflows nach Base und Netto-Outflows aus Ethereum über Zeit. Wenn beide positiv korrelieren und konsistent sind, ist das ein echter Migrations-Trend. Wenn sie nur einzelne Ereignisse zeigen, ist es situatives Verhalten.

**Frage: "Welche L2s gewinnen aktuell Marktanteil?"**
Vergleiche die 30-Tage-Netto-Inflows zwischen L2s. Base, Arbitrum, Optimism haben unterschiedliche Flow-Profile — das sagt etwas über die relative Markt-Präferenz.

**Frage: "Ist der Kapitalabfluss aus einer Chain besorgniserregend?"**
Ein Chain mit konsistenten Netto-Outflows über Wochen ist ein Warnsignal — entweder gibt es strukturelle Probleme oder besser performende Alternativen. Bei einer Chain, die du selbst nutzt, ist das ein Trigger für Überprüfung.

**Das Hacks-Archiv**

Die Hacks-Sektion ([defillama.com/hacks](https://defillama.com/hacks)) ist der beste öffentliche Überblick über historische DeFi-Exploits. Filterbar nach Kategorie (Bridge, Lending, DEX, etc.), Betrag, Chain, Jahr.

**Warum das wertvoll ist:**

**1. Basis-Rate für Risiko-Einschätzungen.** Wenn man eine Position in einem bestimmten Protokoll-Typ aufbauen will, zeigt das Hacks-Archiv, wie oft solche Protokolle historisch gehackt werden. Lending-Protokolle haben andere Muster als Bridges, Bridges andere als DEXes.

**2. Historische Lehren.** Ein Blick auf die Hacks der letzten 24 Monate zeigt: Welche Angriffs-Muster dominieren? (Oracle-Manipulation, Bridge-Trust-Modell-Versagen, Admin-Key-Kompromittierung). Das informiert die Prüfung neuer Protokolle.

**3. Post-Mortem-Links.** Für viele Hacks sind Post-Mortem-Analysen verlinkt. Diese zu lesen ist einer der besten Lehrwege.

**4. Aktuelle Events.** Wenn ein Hack passiert, taucht er innerhalb Stunden im Archiv auf. Für Monitoring der eigenen Exposure (vgl. Modul 14 Notfall-Playbook) ist das eine wichtige Quelle.

**Chain-Level-Analyse**

Die Chains-Sektion ([defillama.com/chains](https://defillama.com/chains)) zeigt TVL-Verteilung über Chains. Für Chain-Allokations-Entscheidungen und Markt-Rotations-Analyse zentral.

**Was zu beachten ist:**

- **Relative Marktanteile verfolgen, nicht absolute Zahlen.** Ob Ethereum 50 oder 60 Mrd TVL hat, ist weniger wichtig als "Ethereum hat 55% des DeFi-TVL, Arbitrum 10%, Base 5%." Die Verteilung ist analyse-relevanter als absolute Zahlen.
- **Kurzfristige Fluktuationen ignorieren.** TVL schwankt mit Token-Preisen täglich. Strategische Analyse nutzt 30-Tage oder 90-Tage Averages.
- **Token-Launch-Effekte erkennen.** Wenn eine Chain ein Airdrop oder Incentive-Programm startet, steigt TVL temporär. Das Post-Incentive-TVL (3-6 Monate nach Programmende) ist die strukturelle Realität.
- **Stablecoin-TVL separat prüfen.** Stablecoin-TVL ist robuster als Token-TVL (kein Preisrisiko). Wenn Stablecoin-TVL wächst, ist das ein stärkeres Adoptions-Signal als Gesamt-TVL-Wachstum.

**Workflow-Beispiel: Eine konkrete Analyse-Sitzung**

Frage: "Sollte ich meine Aave-V3-Position auf Ethereum oder Arbitrum halten?"

**Schritt 1 (Protocols-Sektion):**
Aave-Detail-Seite öffnen. TVL-Verteilung nach Chain prüfen. Ethereum vs. Arbitrum — wie groß ist jede Position, wie stabil ist das TVL?

**Schritt 2 (Yields-Sektion):**
Filter auf Aave V3 setzen, Chain jeweils Ethereum und Arbitrum. Aktuelle Supply- und Borrow-APYs vergleichen. Prüfe Base APY vs. Reward APY.

**Schritt 3 (Chains-Sektion):**
Arbitrum-Chain-Seite öffnen. Wie entwickelt sich das TVL? Gibt es Netto-Inflows? Ist die Chain im Aufschwung oder stagniert sie?

**Schritt 4 (Bridges-Sektion):**
Flows zwischen Ethereum und Arbitrum analysieren. Migriert Kapital aktiv dazwischen, oder ist es stabil?

**Schritt 5 (Hacks-Sektion):**
Hat Aave (speziell die V3-Version) historisch Vorfälle gehabt? Auf beiden Chains ähnlich?

**Schritt 6: Entscheidung.**
Synthese: Auf welcher Chain ist die Risiko-adjustierte Rendite besser? Ethereum typisch sicherer aber höhere Gas-Kosten. Arbitrum günstiger aber zusätzliche Chain-Risiken. Der konkrete Betrag entscheidet (vgl. Modul 14 Chain-Allokations-Modell: große Beträge bevorzugt auf Ethereum).

Diese Analyse dauert 15-20 Minuten und liefert eine strukturierte, evidenz-basierte Entscheidung. Das ist DeFiLlama-Analyse in der Praxis.

### Folien-Zusammenfassung

**[Slide 1] — Titel**
DeFiLlama als zentrales Tool

**[Slide 2] — Warum DeFiLlama Standard ist**
Kostenlos, open-source, breit (3000+ Protokolle, 200+ Chains)
Transparente Methodik (differenzierte TVL-Zählungen)
Standard-Einstiegspunkt für fast jede Analyse

**[Slide 3] — Die sieben zentralen Sektionen**
Protocols, Chains, Yields, Bridges, Hacks, Stablecoins, Derivatives
Jede Sektion erfüllt spezifischen Analyse-Zweck

**[Slide 4] — TVL richtig lesen**
Default TVL ≠ bereinigtes TVL
Varianten: Borrowed, Staking, Pool2, Doublecounted Adjusted
Für Gesamt-DeFi: Doublecounted Adjusted nutzen

**[Slide 5] — Yield-Page kritisch nutzen**
Filter: TVL > $10M, Chain-Allokation, Risk-Score
Base APY vs. Reward APY unterscheiden
7d/30d-Stabilität prüfen, nicht Tages-Spikes

**[Slide 6] — Typische Yield-Fallen**
Expiring Incentives (hohe APY, bald vorbei)
Farmed Token Dumping (nominale ≠ realisierte APY)
Neue Pools (hohe APY, untestet)
Nicht-auditierte Protokolle

**[Slide 7] — Bridges- und Hacks-Sektion**
Bridges: Kapitalflüsse zwischen Chains, Migrations-Trends
Hacks: historische Risiko-Basis, Post-Mortem-Links
Zentrale Monitoring-Quellen

**[Slide 8] — Workflow-Beispiel**
Frage → Protocols → Yields → Chains → Bridges → Hacks → Entscheidung
Strukturierte 15-20-min-Analyse für konkrete Fragen

### Sprechertext

**[Slide 1]** DeFiLlama ist das wichtigste einzelne Tool in der On-Chain-Analyse-Toolbox. In dieser Lektion gehen wir durch, wie man es systematisch nutzt — nicht nur oberflächlich scrollt, sondern als echtes Analyse-Instrument einsetzt.

**[Slide 2]** Es gibt mehrere Gründe, warum DeFiLlama zum Standard geworden ist. Erstens: kostenlos und open-source, die Methodologien sind öffentlich dokumentiert. Zweitens: breite Abdeckung, über 3000 Protokolle auf über 200 Chains. Drittens: das Team ist bekannt für kritisches Denken — sie zählen TVL differenziert, mit und ohne Doppelzählung, nicht nur die marketing-freundliche Maximal-Zahl. Für Retail-Analysten ist DeFiLlama der Einstiegspunkt für fast jede Frage.

**[Slide 3]** Die Plattform gliedert sich in sieben zentrale Sektionen, die jeweils spezifische Zwecke erfüllen. Protocols für einzelne DeFi-Protokolle. Chains für Kapital-Verteilung zwischen Blockchains. Yields für Rendite-Opportunities. Bridges für Cross-Chain-Flows. Hacks für das historische Exploit-Archiv. Stablecoins für Stablecoin-Marktanalysen. Derivatives für Optionen und Perps. Wer diese sieben Sektionen fließend navigiert, hat ein vollständiges Analyse-Grundgerüst.

**[Slide 4]** TVL ist die zentralste und am häufigsten missverstandene Metrik. DeFiLlama bietet mehrere Varianten an. Das Default-TVL enthält alle Positionen inklusive rehypothekierte. TVL mit Borrowed zählt geliehene Werte mit. TVL mit Staking zählt gestaktes ETH bei Lido und anderen. Pool2 sind LP-Tokens mit dem Protokoll-Token selbst. Doublecounted Adjusted ist die bereinigte Zahl ohne Doppelzählungen. Für die Gesamt-DeFi-Einschätzung ist die bereinigte Zahl die relevantere — nicht die Summe aller Protokoll-TVLs. Wenn jemand eine TVL-Zahl zitiert, frage immer: welche Variante?

**[Slide 5]** Die Yield-Page ist eine der gefährlichsten Sektionen, weil sie Tausende Opportunities mit bis zu dreistelligen APYs zeigt. Die natürliche Tendenz ist, nach höchsten APYs zu filtern — fast immer ein Fehler. Die richtigen Filter: TVL über zehn Millionen Dollar, Chain passend zur eigenen Allokations-Strategie, Risk-Score prüfen. Base APY ist die nachhaltige Rendite aus Fees und Zinsen. Reward APY ist Token-Emission, läuft aus. Immer die 7-Tage- und 30-Tage-Durchschnitte prüfen, nicht Tages-Spikes.

**[Slide 6]** Typische Fallen auf der Yield-Page. Expiring Incentives — ein Pool zeigt 35 Prozent APY, aber das Rewards-Programm läuft in zwei Wochen aus. Die zukünftige APY ist viel niedriger. Farmed Token Dumping — wenn der Reward-Token wenig Liquidität hat, entsteht beim Verkauf Slippage und Preis-Druck. Die realisierte Rendite ist deutlich unter der nominalen. Neue Pools unter 30 Tagen Alter haben oft hohe APYs, sind aber untestet. Nicht-auditierte Protokolle — das Audit-Status-Feld prüfen, bei jungen Protokollen mit hohen APYs besonders.

**[Slide 7]** Zwei weitere kritische Sektionen. Die Bridges-Seite für Kapitalfluss-Analyse. Welche Chains gewinnen Netto-Inflows, welche verlieren? Migriert Kapital von Ethereum zu Base? Die 30-Tage-Flow-Daten zeigen echte Trends, nicht nur Einzelereignisse. Die Hacks-Seite als historisches Archiv. Filterbar nach Kategorie, Chain, Betrag, Jahr. Für jedes Protokoll-Typ — Bridge, Lending, DEX — zeigen sich spezifische Angriffs-Muster. Die Post-Mortem-Links sind der beste Lehrweg über DeFi-Risiken.

**[Slide 8]** Ein konkretes Workflow-Beispiel. Frage: soll ich meine Aave-Position auf Ethereum oder Arbitrum halten? Schritt eins: Protocols-Sektion, Aave-Detail-Seite, TVL-Verteilung nach Chain prüfen. Schritt zwei: Yields-Sektion, aktuelle APYs vergleichen, Base vs Reward trennen. Schritt drei: Chains-Sektion, wie entwickelt sich Arbitrum insgesamt? Schritt vier: Bridges-Sektion, Flows zwischen Ethereum und Arbitrum. Schritt fünf: Hacks-Sektion, historische Vorfälle. Schritt sechs: Synthese und Entscheidung. Diese Analyse dauert 15 bis 20 Minuten und liefert strukturierte, evidenz-basierte Entscheidungen. Das ist DeFiLlama-Analyse in der Praxis — nicht oberflächliches Scrollen, sondern systematisches Navigieren mit klarer Frage.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** **SCREENSHOT SUGGESTION:** DeFiLlama-Hauptseite (defillama.com) mit sichtbarer Gesamt-TVL-Metrik, Chain-Verteilung und Top-Protokolle. Zeigt den "Einstiegspunkt" in die Plattform.

**[Slide 3]** Navigation-Diagramm: DeFiLlama-Startseite in der Mitte, sieben Sektionen als Abzweigungen mit Icons und Ein-Satz-Beschreibungen.

**[Slide 4]** **SCREENSHOT SUGGESTION:** DeFiLlama mit aktivierter "Doublecount"-Toggle — zeigt den Unterschied zwischen Default-TVL und bereinigter Zahl (oft 20-40% Differenz).

**[Slide 5]** **SCREENSHOT SUGGESTION:** DeFiLlama-Yields-Page (defillama.com/yields) mit aktivierten Filtern (TVL > $10M, Chain = Ethereum, IL Risk = A). Zeigt die typische disziplinierte Nutzung.

**[Slide 6]** Vier-Kasten-Diagramm der Yield-Fallen: Expiring Incentives, Farmed Token Dumping, Neue Pools, Nicht-auditierte Protokolle. Jeweils Icon und Ein-Satz-Warnung.

**[Slide 7]** **SCREENSHOT SUGGESTION:** DeFiLlama-Bridges-Page (defillama.com/bridges) mit sichtbarem Netto-Flow-Chart. Zeigt Kapital-Migration visuell.

**[Slide 8]** Workflow-Diagramm als Zeitstrahl: sechs Schritte der Analyse-Sitzung, jeweils mit der Sektion, die konsultiert wird, und dem Zeit-Investment (15-20 Minuten total).

### Übung

**Aufgabe: Eine eigene DeFiLlama-Analyse durchführen**

Wähle eine aktuelle DeFi-Entscheidungssituation aus deiner eigenen Praxis (oder erfinde eine plausible: z.B. "Ich überlege, 10.000 USDC in einem Lending-Protokoll zu deponieren"). Führe eine systematische DeFiLlama-Analyse durch:

**Teil 1 — Protocols-Analyse (15 Min):**
Wähle 3 Kandidaten-Protokolle. Für jedes: TVL-Entwicklung über 90 Tage, Chain-Verteilung, Token-Composition des TVL. Welches Protokoll ist am stabilsten?

**Teil 2 — Yields-Vergleich (10 Min):**
Für die 3 Kandidaten: aktueller Base APY, aktueller Reward APY, 30d-Durchschnitt. Welches bietet die beste risiko-adjustierte Rendite?

**Teil 3 — Chain-Kontext (10 Min):**
Auf welcher Chain würdest du deponieren? Prüfe die Chain-Seite: TVL-Trend, Netto-Flows, Relative Marktanteil-Entwicklung.

**Teil 4 — Risiko-Check (10 Min):**
Hacks-Sektion: Gab es in den letzten 24 Monaten Exploits bei diesen Protokollen oder ähnlichen? Was war die Ursache? Ist sie mitigiert?

**Teil 5 — Entscheidung und Reflexion (10 Min):**
Synthese: Welches Protokoll auf welcher Chain mit welchem Betrag? Was ist dein Exit-Trigger (wann würdest du die Position schließen)?

**Deliverable:** Strukturierter Analyse-Report (800-1200 Wörter) mit den Daten aus jedem Teil plus finaler Entscheidung. Der Report sollte so klar sein, dass eine andere Person nachvollziehen könnte, warum du dich wie entschieden hast.

### Quiz

**Frage 1:** Protokoll A zeigt auf DeFiLlama ein TVL von 2 Mrd USD (Default), 1,4 Mrd USD (Borrowed Adjusted) und 800 Mio USD (Doublecounted Adjusted). Was sagen diese drei Zahlen zusammen über das Protokoll, und wie solltest du sie für deine Einschätzung gewichten?

<details>
<summary>Antwort anzeigen</summary>

Die drei Zahlen zusammen geben ein deutlich vollständigeres Bild als jede einzelne. Sie erzählen eine Geschichte über die strukturelle Natur des Protokolls und die Qualität seines TVL. **Interpretation der drei Zahlen:** **Default 2 Mrd:** Dies ist das brutto gelockte Kapital, inklusive aller Positionen — rehypothekierte, geliehene, gestakte, Pool2-Positions. Es ist die größte Zahl, weil sie alles zählt, was im Protokoll existiert, ohne Abzüge. **Borrowed Adjusted 1,4 Mrd:** Dies reduziert um die geliehenen Positionen. Der Unterschied zwischen Default und Borrowed Adjusted (hier 600 Mio) ist das Volumen der Lending-Aktivität im Protokoll. Das ist nicht "weniger TVL", sondern eine Bereinigung, die Lending-Circularität korrigiert. Ein 600-Mio-Unterschied zeigt, dass das Protokoll substantielle Lending-Aktivität hat — typisch für Lending-Protokolle wie Aave, Compound, Morpho. **Doublecounted Adjusted 800 Mio:** Dies ist die radikalste Bereinigung — entfernt alle Doppelzählungen, die durch rehypothekierte Positions entstehen. Wenn ein Nutzer 1 ETH in Lido staket und das stETH dann in Aave als Collateral hinterlegt, zählt Default 2 ETH (1 in Lido, 1 in Aave). Doublecounted Adjusted zählt 1 ETH (das Original). **Was der Unterschied bedeutet:** Die Differenz zwischen 2 Mrd Default und 800 Mio Doublecounted Adjusted — also 1,2 Mrd — ist rehypothekiertes Kapital. Das ist eine große Zahl: 60% des sichtbaren TVL ist Rehypothekation. Das sagt mehrere Dinge aus. **Erstens: Das Protokoll ist strukturell abhängig von anderen Protokollen.** Wenn rehypothekierte Assets dominieren, ist der eigene TVL vom Zustand anderer Protokolle abhängig. Wenn ein Lending-Protokoll hauptsächlich stETH als Collateral akzeptiert, ist es strukturell mit Lidos Stabilität verknüpft. **Zweitens: Das Risiko ist höher, nicht niedriger.** Oberflächlich klingt 2 Mrd TVL solide. Aber 60% davon ist "geliehenes" oder "wiederverwendetes" Kapital. Das bedeutet höhere Liquidations-Risiken, mehr Kaskaden-Potenzial in Krisen. **Drittens: Das Protokoll ist mittelgroß, nicht groß.** In der Hierarchie der DeFi-Protokolle ist ein 800-Mio-Doublecounted-Adjusted-TVL kein Blue-Chip-Niveau. Aave V3 hat mehrere Milliarden in dieser bereinigten Zahl. Das einzuordnen ist wichtig für Position-Sizing-Entscheidungen. **Wie man die Zahlen gewichtet:** **Für die Frage "ist dieses Protokoll liquide genug für meine Position?"** — relevante Zahl: Default TVL oder Borrowed Adjusted. Weil der Point ist, ob im Protokoll genug Kapital fließt, dass dein Deposit/Withdraw nicht die Dynamik stört. Bei 2 Mrd Default kann man typisch bis zu 1-5% davon (20-100 Mio) ohne Slippage bewegen. **Für die Frage "wie groß ist das Protokoll in DeFi insgesamt?"** — relevante Zahl: Doublecounted Adjusted. Weil nur das ist echtes netto-gebundenes Kapital. **Für die Frage "wie hoch ist das Lending-Volumen?"** — relevante Zahl: Default minus Borrowed Adjusted. **Für die Frage "wie hoch ist das Rehypothekations-Risiko?"** — relevante Zahl: Default minus Doublecounted Adjusted. Hier 1,2 Mrd oder 60% — das ist ein hoher Wert, der strukturelle Risiken bedeutet. **Die konkrete Entscheidungs-Implikation:** Wenn du überlegst, in diesem Protokoll zu deponieren, solltest du: (a) das bereinigte TVL als Basis-Einordnung nehmen (800 Mio = mittelgroßes Protokoll, nicht Blue Chip), (b) den hohen Rehypothekations-Anteil als Risiko-Signal verstehen (mehr Kaskaden-Exposure), (c) deine Position entsprechend konservativer sizing (maximal 1% deines Portfolios, nicht 5%). **Der Vergleich mit Blue Chips:** Aave V3 hat typisch ein Default-TVL von 20+ Mrd und ein Doublecounted Adjusted von 15+ Mrd. Der Rehypothekations-Anteil ist also relativ geringer (25% statt 60% in unserem Beispiel). Das zeigt: Blue-Chip-Protokolle haben oft "saubereres" TVL, weil viele ihrer Nutzer primäre Einlagen machen, nicht rehypothekierte Positions aufbauen. **Die übergreifende Lehre:** DeFiLlamas multi-variante TVL ist keine Schwäche, sondern Stärke. Die Plattform zwingt uns, TVL differenziert zu betrachten. Wer nur Default-Zahlen kennt, übersieht systematisch die wichtigen Bereinigungen. Eine seriöse Analyse zitiert immer die Variante und begründet, warum sie die relevante ist.

</details>

**Frage 2:** Du siehst in der DeFiLlama-Yields-Sektion einen Pool: "USDC-ETH LP auf einer neuen L2, 85% APY, TVL $3 Mio, Audit: Pending." Analysiere diese Gelegenheit systematisch und erkläre, ob du sie für eine konservative Strategie in Betracht ziehen würdest.

<details>
<summary>Antwort anzeigen</summary>

Die Gelegenheit hat mehrere gleichzeitige Warnzeichen, die zusammen eine klare Antwort nahelegen. Eine systematische Analyse geht jeden Aspekt einzeln durch. **Aspekt 1: Die Asset-Composition (USDC-ETH LP).** Ein LP aus einem Stablecoin und einem volatilen Asset hat Impermanent Loss. Bei ETH-Bewegung von 30% ist der IL etwa 2-3%. Bei 50% Bewegung etwa 5-6%. Bei starken Bewegungen — was bei ETH historisch regelmäßig passiert — kann IL 5-10% betragen. Der APY muss diesen strukturellen Verlust kompensieren, bevor er echte Rendite ist. Bei USDC-ETH typisch ist: man braucht mindestens 10-15% APY, nur um den erwarteten IL auszugleichen. Erst darüber beginnt echte Rendite. **Aspekt 2: Der APY-Level (85%).** 85% APY ist außergewöhnlich hoch. In einem reifen, effizienten Markt sollten solche Renditen durch Arbitrage zu normalen Levels (5-15%) gedrückt werden. Wenn sie nicht gedrückt werden, gibt es typische Erklärungen: (a) Das Risiko ist höher als oberflächlich erkennbar, (b) Das Rewards-Programm wird durch Token-Emissionen finanziert, die bald auslaufen oder verwässern, (c) Die Pool-Tiefe ist zu klein, um signifikantes Kapital aufzunehmen. Alle drei treffen hier wahrscheinlich zu. **Aspekt 3: TVL von 3 Mio USD.** Das ist ein sehr kleiner Pool. Konsequenzen: (1) Liquidität für Entry/Exit ist begrenzt — große Positionen können Slippage erzeugen. (2) Single-Wallet-Dominanz ist wahrscheinlich — möglicherweise kommt der Großteil des TVL von wenigen Nutzern. (3) Instabilität: Ein einzelner Großabzug kann den Pool signifikant verändern. (4) APY-Volatilität: Bei kleiner TVL-Basis schwanken die Rewards-per-Dollar-Metriken stark. **Aspekt 4: Neue L2.** "Neue L2" bedeutet mehrere zusätzliche Risiko-Ebenen. (a) Unproven Rollup-Sicherheit: Die L2-Sicherheit ist im Test, nicht etabliert. (b) Sequencer-Risiko: Bei jungen L2s sind Sequencer oft zentralisiert — Zensur, Ausfall, kompromittierung möglich. (c) Bridge-Risiko: Jedes Kapital dort ist über eine junge Bridge gekommen, oft noch nicht vollständig auditiert. (d) Adoption: Weniger Nutzer, weniger Audits, weniger Test. Wenn es Probleme gibt, sind sie noch nicht aufgefallen. **Aspekt 5: "Audit: Pending".** Das ist ein schwerwiegendes Warnsignal. Pending bedeutet: das Protokoll ist live, aber der Audit noch nicht abgeschlossen. Entweder (a) es wird auditiert und man weiß das Ergebnis nicht, oder (b) die Audit-Versprechen sind vage und keiner prüft nach. In beiden Fällen fehlt eine grundlegende Sicherheits-Validierung. Für konservative Strategien ist "Audit: Pending" oft ein definitives Ausschlusskriterium. **Aspekt 6: Rewards-Struktur analysieren.** Bei 85% APY auf einer neuen L2 ist fast sicher, dass die Rewards hauptsächlich aus Token-Emissionen kommen — vom L2-Projekt selbst oder vom Protokoll. Diese Emissionen haben mehrere Probleme. (1) Sie enden früher oder später. Typisch: 3-12 Monate. Nach Ende bricht die APY auf den Base-Level zusammen (typisch 5-15%). (2) Sie sind verwässernd: je mehr Kapital kommt, desto weniger Rewards pro Dollar. Deine realisierte APY sinkt also unter die nominale, sobald andere mit einströmen. (3) Das Reward-Token hat oft wenig Liquidität. Beim Verkauf entsteht Slippage — die realisierte Rendite ist weit unter der nominalen. **Die integrierte Risiko-Einschätzung:** Zusammenaddiert: IL-Risiko + Smart-Contract-Risiko (Audit pending) + L2-Chain-Risiko + Bridge-Risiko + Reward-Token-Verkaufsrisiko + Pool-Tiefen-Instabilitäts-Risiko. Das ist ein Stacking mehrerer Tail-Risken, jedes allein vielleicht 5-20%, zusammen potenziell 40-70% Worst-Case-Szenario. Bei 85% nominaler APY — minus IL 10% minus Dumping-Slippage 10-20% — bleibt realistisch 50-60% APY. Bei 40-70% Worst-Case-Risiko ist die Erwartungswert-Analyse ambivalent bestenfalls. **Für konservative Strategien: klare Empfehlung.** Diese Gelegenheit ist klar NICHT für konservative Strategien geeignet. Die Gründe: (1) Das Risiko ist nicht quantifizierbar — zu viele Unbekannten. (2) Die verschiedenen Risiken sind korreliert — alle realisieren sich oft gleichzeitig (Crash-Szenarien). (3) Die Pool-Größe ist zu klein für signifikantes Kapital. (4) Das Audit-Pending ist ein struktureller Ausschlussgrund. **Für welche Strategie wäre sie geeignet?** Spekulative Strategien mit explizitem Small-Position-Sizing. Wer bewusst 1-2% des Portfolios auf asymmetrische High-Risk-Opportunities setzt, mit voller Akzeptanz potenzieller Totalverluste, kann solche Pools nutzen. Das ist legitim, aber es ist nicht "Yield Farming" — es ist Venture-Style-Gambling mit hoher Varianz. **Die übergreifende Lehre:** Hohe APYs auf kleinen, neuen Protokollen sind Rote Flaggen, nicht Chancen. Die Yield-Page auf DeFiLlama zeigt diese Gelegenheiten prominent, aber seriöse Filter-Konventionen — TVL > 10 Mio, Audit vorhanden, Protokoll > 6 Monate alt, IL-Risk berücksichtigt — eliminieren die meisten. Wer dagegen filterlos auf APY sortiert, landet systematisch bei den gefährlichsten Pools. Das ist ein häufiges Fehlmuster bei Einsteigern. **Die konkrete Entscheidung:** Diese spezifische Gelegenheit: klares Nein für konservative Strategie. Die Energie wäre besser investiert in etablierte Lending-Pools (Aave, Morpho) mit 3-6% stabilem APY. Weniger aufregend, aber risiko-adjustiert deutlich besser.

</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 8 Folien: Titel → DeFiLlama-Überblick → TVL-Seite → Yield-Explorer → Bridges-Dashboard → Hacks-Datenbank → Chain-Vergleich → Filter-Konventionen
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — DeFiLlama-Dashboard-Screenshots, TVL-Ranking-Grafik, Yield-Filter-Workflow, Hack-Timeline, Konservatives Filter-Setup

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 15.3 — Etherscan und Block-Explorer Mastery

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Adressen auf Etherscan sicher interpretieren und EOAs von Contracts unterscheiden
- Transaktions-Details vollständig lesen: Method, Gas, Value, Input Data, Logs, Internal Transactions
- Smart-Contract-Seiten navigieren: Code, Read/Write Contract, Events, Holders
- Token-Approvals auf Etherscan direkt prüfen und verwalten
- L2-spezifische Explorer (Arbiscan, Basescan, Optimistic Etherscan) und ihre Besonderheiten nutzen
- Eine Post-Hack-Analyse durch Lesen der Exploit-Transaktion auf Etherscan rekonstruieren

### Erklärung

**Warum Etherscan-Kompetenz zentral ist**

Etherscan ([etherscan.io](https://etherscan.io)) ist der Block-Explorer für Ethereum. Vergleichbare Explorer existieren für jede relevante Chain: Arbiscan für Arbitrum, Basescan für Base, Optimistic Etherscan für Optimism, Polygonscan für Polygon. Das Interface ist über alle hinweg praktisch identisch — wer Etherscan beherrscht, beherrscht den Rest mit minimalem Lernaufwand.

Block-Explorer sind das fundamentalste On-Chain-Analyse-Tool. DeFiLlama aggregiert und interpretiert, Explorer zeigen die Rohdaten. Jede seriöse Analyse endet früher oder später bei Etherscan — weil es die einzige Quelle ist, die *exakte, verifikatorische* Informationen liefert, nicht aggregierte Näherungen.

Drei typische Use-Cases machen Etherscan unverzichtbar:

**1. Verifikation.** Wenn eine Quelle etwas behauptet ("Protokoll X hat 500 Mio USD Collateral"), ist Etherscan die autoritative Quelle zur Verifikation.

**2. Investigation.** Wenn etwas ungewöhnlich passiert (unerwartete Transaktion in der eigenen Wallet, Hack eines Protokolls, verdächtige Aktivität), ist Etherscan das Tool zur Untersuchung.

**3. Interaktion.** Wenn ein Protokoll kein funktionierendes Frontend hat oder du Funktionen nutzen willst, die das UI nicht zeigt, kannst du direkt über Etherscan mit dem Contract interagieren.

**Adressen verstehen: EOA vs. Contract**

Jede Ethereum-Adresse ist entweder ein EOA (Externally Owned Account) oder ein Contract. Der Unterschied ist fundamental.

**EOA (Externally Owned Account):**
- Von einem privaten Schlüssel kontrolliert
- Gehört einer Person, einem Multisig-Setup, einer Hardware-Wallet
- Keine Code, kann nur Transaktionen initiieren
- Auf Etherscan sichtbar als normale Adresse ohne "Contract"-Tag

**Contract:**
- Smart Contract mit Code
- Kann andere Contracts aufrufen, Tokens halten, komplexe Logik ausführen
- Wird bei Deployment erzeugt, nicht durch Private Key kontrolliert
- Auf Etherscan sichtbar mit "Contract"-Tab und Code-Sektion

**Warum das wichtig ist:** Wenn man eine Transaktion zu einer Adresse macht, ist das Verhalten grundsätzlich unterschiedlich. An ein EOA: einfacher Transfer, Tokens landen in der Wallet. An einen Contract: es wird Code ausgeführt — möglicherweise Swap, Deposit, Approval, oder etwas anderes. Ein Nutzer, der versehentlich Tokens an einen falschen Contract schickt, kann sie verlieren, wenn der Contract kein "Rescue"-Funktion hat.

**Adress-Labels auf Etherscan**

Etherscan labelt viele bekannte Adressen. Die Labels haben unterschiedliche Qualität:

- **"Verified" oder Offiziell-markiert:** Solide Zuordnung. Z.B. "Coinbase: Cold Wallet 1" oder "Aave V3: Pool".
- **Public Name Tags (user-submitted):** Von Community eingereicht, nicht zwingend verifiziert. Vorsicht.
- **Ohne Label:** Die große Mehrheit der Adressen. Muss man aus Transaktions-Pattern ableiten.

Für ernsthafte Analyse: Etherscan-Labels sind Hinweise, keine Beweise. Wenn ein Transfer an "vermeintlich Coinbase" geht, aber das Label user-submitted ist, ist das kein sicherer Indikator.

**Transaktions-Details vollständig lesen**

Jede Ethereum-Transaktion hat mehrere Felder. Die wichtigsten:

**Transaction Hash:** Einzigartige ID. Verlinkbar, teilbar, durchsuchbar.

**Status:** Success oder Failed. Failed-Transaktionen haben trotzdem Gas gekostet.

**Block:** In welchem Block die Transaktion eingeschlossen wurde. Mit Timestamp.

**From / To:** Sender und Empfänger. Kann EOA oder Contract sein.

**Value:** ETH-Menge, die mit der Transaktion transferiert wird (kann 0 sein, wenn nur Contract-Call).

**Transaction Fee / Gas Price:** Was der Sender bezahlt hat.

**Method:** Welche Funktion des Contracts aufgerufen wurde (falls To = Contract). Z.B. "Swap Exact Tokens For Tokens", "Deposit", "Transfer".

**Input Data:** Die exakten Bytes, die an den Contract gesendet wurden. Enthält Funktions-Aufruf plus Parameter. Für tiefe Analyse wichtig.

**Logs (Events):** Was der Contract während der Ausführung als "Event" emittiert hat. Token Transfers sind ERC-20 Transfer-Events. Lending-Einzahlungen sind Deposit-Events. Die Logs sind oft aussagekräftiger als das Input Data für das Verständnis, was passiert ist.

**Internal Transactions:** Wenn ein Contract andere Contracts aufruft (was in DeFi ständig passiert), sind das interne Transaktionen. Z.B. bei einer DEX-Swap: die Haupt-Transaktion ruft den Router auf, der Router ruft das Pair, das Pair transferiert Tokens — alles interne Transaktionen. Zeigt die vollständige Ausführungs-Kette.

**State Changes:** Was sich im Storage der Contracts durch die Transaktion geändert hat. Sehr technisch, aber manchmal nützlich für Debugging.

**Praktische Lese-Strategie einer unbekannten Transaktion:**

1. **Method prüfen.** Was wurde aufgerufen? "Approve", "Swap", "Deposit" gibt direkten Hinweis auf Intention.
2. **From/To prüfen.** Sind das bekannte Entitäten? Gelabelt? Verdächtig?
3. **Value prüfen.** Wird ETH transferiert, oder ist es ein reiner Token-Call?
4. **Logs analysieren.** Welche Events wurden emittiert? Oft zeigen die Token-Transfer-Events klarer als die Method, was passiert ist.
5. **Internal Transactions bei Komplexität.** Wenn die Transaktion mehrere Contracts involviert, die Kette durchgehen.

**Smart-Contract-Seiten navigieren**

Wenn man auf die Etherscan-Seite eines Contracts geht, hat man mehrere Tabs.

**Transactions:** Alle Transaktionen, die den Contract involviert haben. Nützlich für Aktivitäts-Einschätzung.

**Internal Txns:** Interne Transaktionen (Contract-to-Contract Calls).

**Token Transfers (ERC-20 / ERC-721):** Wenn der Contract Tokens hält oder bewegt, werden sie hier getrennt angezeigt.

**Contract:** Der Source Code. Nur verfügbar, wenn der Contract "verifiziert" ist (Team hat den Source hochgeladen und Etherscan hat ihn gegen den Bytecode verglichen). Verifizierter Code ist ein positives Signal — man kann ihn lesen und prüfen.

**Read Contract:** View-Funktionen direkt aufrufen. Keine Transaktion nötig, kostet kein Gas. Z.B. "Was ist der aktuelle Total Supply?" oder "Wer ist der Admin?".

**Write Contract:** State-ändernde Funktionen aufrufen. Erfordert Wallet-Verbindung und echte Transaktion. Nützlich, wenn Frontends fehlen oder nicht funktionieren.

**Events:** Alle vom Contract emittierten Events. Besonders nützlich für historische Analyse: "Wann wurden Admin-Funktionen aufgerufen? Wann wurden große Deposits gemacht?"

**Holders:** Für Token-Contracts: die Adressen, die den Token halten, sortiert nach Menge. Zeigt Konzentration: wenn die Top-10-Holder 80% halten, ist der Token strukturell zentralisiert.

**Praktische Nutzungsszenarien**

**Szenario 1: "Ist dieser Contract legitim?"**
Öffne den Contract-Tab. Ist der Code verifiziert? Wer sind die bekannten Holder / Deployer? Welche Audit-Reports sind verlinkt (oft in den Kontakt-Informationen)? Der Code selbst zu lesen ist Entwickler-Territorium, aber "verifiziert plus bekannter Deployer" ist ein starkes Basis-Signal.

**Szenario 2: "Welche Approvals habe ich gesetzt?"**
Etherscan hat eine Approvals-Page pro Wallet: `etherscan.io/tokenapprovalchecker?search=0xDEINEADRESSE`. Zeigt alle aktiven Approvals mit Möglichkeit zum Revoke. Eine wichtige Alternative zu revoke.cash, mit leicht anderen Datenquellen.

**Szenario 3: "Wie groß ist die Admin-Macht eines Protokolls?"**
Read Contract nutzen. Viele Protokolle haben Funktionen wie `owner()`, `admin()`, `governance()`. Die Rückgabe-Adresse zeigt, wer Admin-Rechte hat. Ist es eine Multisig? Eine Governance-Contract? Eine EOA (schlechtes Signal)?

**Szenario 4: "Was macht diese verdächtige Transaktion in meiner Wallet?"**
Öffne die Transaktion. Method und Logs analysieren. Wenn du die Method nicht erkennst oder der To-Contract verdächtig ist — sofortige Action: alle Approvals zurückziehen, Wallet-Balance prüfen.

**Szenario 5: "Ich möchte direkt mit einem Contract interagieren."**
Write Contract nutzen. Wallet verbinden (via WalletConnect oder MetaMask). Funktion wählen. Parameter eingeben. Transaktion signieren. Das ist der Weg für Advanced-Nutzer, wenn Frontends fehlen oder Probleme haben.

**Token Approvals: Die wichtigste praktische Nutzung**

Approvals sind die meistgenutzte Funktion, die Retail-Nutzer auf Etherscan direkt sehen sollten. Jede DeFi-Interaktion — Deposit, Swap, Lending — beginnt mit einer Approval: du gibst einem Contract die Erlaubnis, einen bestimmten Betrag deiner Tokens zu bewegen.

**Das Problem mit Approvals:**
- **Unlimited Approvals:** Viele Frontends setzen standardmäßig "max uint256" — unlimited. Das bedeutet, der Contract kann alle aktuellen und zukünftigen Tokens dieser Art in deiner Wallet abziehen, für immer.
- **Persistent Approvals:** Approvals bleiben aktiv, bis man sie explizit zurückzieht. Auch wenn du das Protokoll nicht mehr nutzt.
- **Hack-Risiko:** Wenn der approvierte Contract kompromittiert wird, kann der Angreifer dein Kapital abziehen — selbst wenn du das Protokoll längst nicht mehr aktiv nutzt.

**Etherscan's Approval Checker:**
Unter [etherscan.io/tokenapprovalchecker](https://etherscan.io/tokenapprovalchecker) kann jede Wallet-Adresse eingegeben werden. Ergebnis: alle aktiven Approvals mit:
- Token
- Approved Spender (welcher Contract)
- Allowance (wie viel darf der Spender abziehen — unlimited zeigt als "Unlimited")
- Last Updated (wann zuletzt geändert)
- Revoke-Button

**Die Routine:**
Monatlich die eigene Wallet durch den Approval Checker schicken. Alle Approvals zu Protokollen, die man nicht mehr aktiv nutzt, zurückziehen. Unlimited-Approvals bei aktiv genutzten Protokollen evaluieren: ist das wirklich nötig? Bei höher-riskanten Protokollen auf Exact Amount reduzieren.

**L2-Explorer: Die Unterschiede**

Jede L2 hat ihren eigenen Explorer, aber alle sind Etherscan-ähnlich gebaut.

**Arbiscan ([arbiscan.io](https://arbiscan.io)):**
Arbitrum-Explorer. Funktionalität identisch mit Etherscan. Besondere Sektion: Dispute-Status für kritische Transaktionen (Optimistic Rollup-Spezifikum).

**Basescan ([basescan.org](https://basescan.org)):**
Base-Explorer. Auch Etherscan-artig. Neueste L2 in dieser Liste, daher weniger historische Daten.

**Optimistic Etherscan ([optimistic.etherscan.io](https://optimistic.etherscan.io)):**
Optimism-Explorer. Integration mit L1-Withdrawals besonders sichtbar.

**Polygonscan ([polygonscan.com](https://polygonscan.com)):**
Polygon PoS-Explorer. Höheres Transaktionsvolumen, anderes Fee-Modell.

**Besonderheiten bei L2-Explorern:**
- **Deposit/Withdrawal-Tracking:** L2-Explorer zeigen oft spezifische UI für Bridge-Operationen L1↔L2.
- **Gas-Modell:** L2-Transaktionen haben zwei Gas-Komponenten: L2-Gas (minimal) und L1-Submission-Cost (dominant). Explorer zeigen beide.
- **Finalization-Status:** Bei Optimistic Rollups ist eine Transaktion zunächst "soft finalized" (nach Sequencer-Commit), dann "hard finalized" (nach 7-Tage-Challenge). Explorer zeigen beide Stati.

**Praktischer Unterschied im Alltag:**
Für Nutzer gibt es wenig funktionalen Unterschied. Wer Etherscan beherrscht, navigiert die L2-Explorer intuitiv. Die einzige wichtige Disziplin: für jede Chain den richtigen Explorer nutzen. Eine Arbitrum-Transaktion auf Etherscan suchen liefert keine Ergebnisse. Tools wie [blockscan.com](https://blockscan.com) können chain-übergreifend suchen, sind aber meist weniger detailliert als die chain-spezifischen Explorer.

**Explorer-Power-Usage: Drei Advanced-Techniken**

**Technik 1: Event-Filtering für historische Analysen.**
Auf einer Contract-Page, Events-Tab, kann man nach bestimmten Event-Typen filtern. "Alle Deposit-Events der letzten 30 Tage" gibt einen chronologischen Blick auf Protokoll-Aktivität, den Dashboards oft nicht so granular zeigen.

**Technik 2: Proxy-Contracts entschlüsseln.**
Viele DeFi-Protokolle nutzen Proxy-Patterns: der Contract, mit dem User interagieren, ist ein Proxy, der die eigentliche Logik an einen "Implementation"-Contract delegiert. Etherscan zeigt oft nur den Proxy. Der verifizierte Implementation-Code ist wichtig für echtes Code-Verständnis. Etherscan hat einen "Read as Proxy"-Button, der die Implementation-Interface offenlegt.

**Technik 3: Interne Funktionen via Debug.**
Etherscan's "Debug Transaction"-Feature (nur bei einigen Tx verfügbar) zeigt den kompletten Call-Trace. Wichtig für Hack-Analysen oder komplexe Fehler. Für typische Retail-Nutzung selten, aber gut zu wissen.

### Folien-Zusammenfassung

**[Slide 1] — Titel**
Etherscan und Block-Explorer Mastery

**[Slide 2] — Warum Etherscan zentral ist**
Einzige autoritative Daten-Quelle (nicht aggregiert)
Identisch auf allen EVM-Chains (Arbiscan, Basescan, etc.)
Use-Cases: Verifikation, Investigation, Interaktion

**[Slide 3] — Adressen verstehen**
EOA vs. Contract
EOA = Private-Key-kontrolliert
Contract = Code, komplexere Logik
Labels: Verifiziert > User-submitted > Unlabeled

**[Slide 4] — Transaktions-Details**
Hash, Status, From/To, Value, Method
Input Data (Parameter)
Logs/Events (was wirklich passiert ist)
Internal Transactions (Contract-to-Contract)

**[Slide 5] — Smart-Contract-Tabs**
Transactions, Internal Txns, Token Transfers
Contract (Source Code, verifiziert?)
Read Contract / Write Contract
Events, Holders

**[Slide 6] — Token Approvals — die kritische Routine**
tokenapprovalchecker: alle Approvals anzeigen
Unlimited vs Exact Amount
Monatliches Review: revoken, was nicht mehr genutzt
Alternative zu revoke.cash

**[Slide 7] — L2-Explorer**
Arbiscan, Basescan, Optimistic Etherscan, Polygonscan
Funktional identisch zu Etherscan
Besonderheiten: Bridge-UI, Gas-Modell, Finalization-Status

**[Slide 8] — Advanced-Techniken**
Event-Filtering für historische Analysen
Proxy-Contracts entschlüsseln (Read as Proxy)
Debug Transaction für Hack-Analysen

### Sprechertext

**[Slide 1]** Nach DeFiLlama, das aggregiert und interpretiert, kommen wir zu Etherscan, das die Rohdaten zeigt. Jede seriöse Analyse endet früher oder später bei Etherscan, weil es die einzige Quelle exakter, verifikatorischer Informationen ist. In dieser Lektion lernen wir, diesen Block-Explorer systematisch zu navigieren.

**[Slide 2]** Etherscan ist aus drei Gründen zentral. Erstens: autoritative Daten, keine aggregierten Näherungen. Wenn jemand behauptet, ein Protokoll habe 500 Millionen Dollar Collateral, ist Etherscan die Quelle zur direkten Verifikation. Zweitens: das Interface ist auf allen EVM-Chains identisch. Arbiscan, Basescan, Optimistic Etherscan — wer Etherscan beherrscht, navigiert die anderen intuitiv. Drittens: drei praktische Use-Cases machen es unverzichtbar. Verifikation von Behauptungen. Investigation ungewöhnlicher Aktivität. Direkte Interaktion mit Contracts, wenn Frontends fehlen.

**[Slide 3]** Grundlegende Unterscheidung: jede Ethereum-Adresse ist entweder ein EOA oder ein Contract. EOA — Externally Owned Account — ist von einem privaten Schlüssel kontrolliert, gehört einer Person oder einem Multisig, hat keinen Code. Contract ist ein Smart Contract mit Code, wird bei Deployment erzeugt, führt komplexe Logik aus. Etherscan markiert Contracts mit einem eigenen Tab. Adress-Labels sind wichtige Hinweise: Verifizierte sind solide, User-submitted brauchen Vorsicht, unlabeled sind die Mehrheit.

**[Slide 4]** Transaktions-Details haben mehrere kritische Felder. Hash als einzigartige ID. Status — Success oder Failed. From und To. Value — ETH-Menge, die mitgeschickt wird. Method — welche Funktion des Contracts aufgerufen wurde, zum Beispiel Swap oder Deposit. Input Data enthält die exakten Parameter. Logs, oder Events, zeigen, was wirklich passiert ist — oft klarer als die Method. Internal Transactions zeigen die Kette der Contract-Aufrufe. Eine praktische Lese-Strategie: Method prüfen, From/To prüfen, Value prüfen, Logs analysieren, bei Komplexität die Internal Transactions durchgehen.

**[Slide 5]** Auf einer Contract-Seite hat man mehrere Tabs. Transactions zeigt alle Transaktionen, die den Contract involvieren. Contract zeigt den Source Code, wenn verifiziert — ein positives Signal. Read Contract erlaubt View-Funktionen direkt aufzurufen, ohne Gas zu zahlen. Write Contract erlaubt state-ändernde Funktionen, erfordert Wallet-Verbindung. Events zeigen historische Aktivität granular. Holders, bei Token-Contracts, zeigt die Verteilung der Token-Besitzer — wichtig für Konzentrations-Analyse.

**[Slide 6]** Token Approvals sind die wichtigste praktische Nutzung für Retail. Jede DeFi-Interaktion beginnt mit einer Approval. Viele Frontends setzen standardmäßig Unlimited Approvals — der Contract kann alle aktuellen und zukünftigen Tokens dieser Art abziehen, für immer, es sei denn man revoked. Etherscan hat einen Approval Checker: URL tokenapprovalchecker, Wallet-Adresse eingeben, alle aktiven Approvals werden aufgelistet mit Revoke-Button. Die Routine: monatlich die eigene Wallet durchschicken, Approvals zu nicht mehr genutzten Protokollen zurückziehen. Das ist eine Alternative oder Ergänzung zu revoke.cash.

**[Slide 7]** Jede L2 hat ihren eigenen Explorer. Arbiscan für Arbitrum, Basescan für Base, Optimistic Etherscan für Optimism, Polygonscan für Polygon. Funktional sind sie identisch zu Etherscan. Die Besonderheiten sind meist kosmetisch. Bei Optimistic Rollups zeigen die Explorer die zwei Finalization-Stufen: soft-finalized nach Sequencer-Commit, hard-finalized nach 7-Tage-Challenge-Period. Das Gas-Modell der L2s wird in zwei Komponenten angezeigt: L2-Gas plus L1-Submission-Cost. Im Alltag: wichtig ist nur, den richtigen Explorer für die richtige Chain zu nutzen.

**[Slide 8]** Drei Advanced-Techniken, die über Standard-Nutzung hinausgehen. Event-Filtering: auf der Events-Page eines Contracts kann man nach Event-Typ filtern, für granulare historische Analyse. Proxy-Contracts: viele Protokolle nutzen Upgrade-Patterns, bei denen der User-Contract ein Proxy ist und die Logik an einen Implementation-Contract delegiert. Etherscan hat eine Read-as-Proxy-Funktion, die das Implementation-Interface offenlegt. Debug Transaction: für einige Transaktionen ist ein kompletter Call-Trace verfügbar — wichtig für Hack-Analysen. Diese Techniken sind für Power-User, aber gut zu kennen, wenn komplexere Fragen auftauchen.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Vergleichs-Diagramm: DeFiLlama (aggregiert, interpretiert) vs Etherscan (Raw, Autoritativ). Visuelle Trennung der Rollen.

**[Slide 3]** **SCREENSHOT SUGGESTION:** Etherscan-Adressseite einer bekannten Entität (z.B. Vitaliks öffentliche Adresse) — zeigt die Seiten-Struktur, Labels und Transaktions-Historie.

**[Slide 4]** **SCREENSHOT SUGGESTION:** Etherscan-Transaktionsdetail einer Uniswap-Swap-Transaktion, sichtbar mit Method, Logs (Transfer-Events), Internal Transactions. Zeigt die vollständige Tx-Struktur.

**[Slide 5]** **SCREENSHOT SUGGESTION:** Etherscan-Contract-Page eines bekannten Protokolls (z.B. Aave V3 Pool), sichtbar mit allen Tabs: Transactions, Contract (verified), Read/Write, Events, Holders.

**[Slide 6]** **SCREENSHOT SUGGESTION:** Etherscan Token Approval Checker mit einer Beispiel-Wallet, zeigt mehrere aktive Approvals inkl. Unlimited vs Limited. Demonstriert die monatliche Review-Routine.

**[Slide 7]** Vier-Logo-Grid: Etherscan, Arbiscan, Basescan, Optimistic Etherscan, Polygonscan. Plus Hinweis auf blockscan.com als chain-übergreifende Suche.

**[Slide 8]** Advanced-Techniken-Diagramm: drei Icons (Filter, Proxy-Chain, Debug) mit Kurz-Beschreibungen als Power-User-Referenzen.

### Übung

**Aufgabe: Eine eigene Wallet-Etherscan-Analyse durchführen**

**Teil 1 — Grundlagen-Check (10 Min):**
Öffne Etherscan. Gib deine eigene Adresse ein (oder eine, die du analysieren möchtest). Beantworte:
- Wie alt ist die erste Transaktion?
- Wie viele Gesamt-Transaktionen?
- Welche Tokens werden aktuell gehalten (ERC-20 Tokens Tab)?
- Welche Chains nutzt die Wallet aktiv (falls Multi-Chain)?

**Teil 2 — Approval-Audit (15 Min):**
Öffne `etherscan.io/tokenapprovalchecker`, gib die Wallet ein. Dokumentiere:
- Wie viele aktive Approvals gibt es?
- Welche davon sind Unlimited?
- Zu welchen Contracts? Sind alle diese Contracts noch aktiv von dir genutzt?
- Wie viele würdest du basierend auf dieser Analyse zurückziehen?

**Teil 3 — Transaktions-Tiefe (10 Min):**
Wähle eine deiner komplexesten historischen Transaktionen (z.B. eine DEX-Swap mit Multi-Hop-Route). Öffne sie. Analysiere:
- Was war die Method?
- Welche Logs wurden emittiert?
- Welche Internal Transactions wurden ausgeführt?
- Kannst du die vollständige Ausführungs-Kette rekonstruieren?

**Teil 4 — Contract-Exploration (10 Min):**
Wähle ein DeFi-Protokoll, das du aktiv nutzt (z.B. Aave V3 Pool). Gehe auf die Contract-Page. Beantworte:
- Ist der Code verifiziert?
- Welche Read-Funktionen sind verfügbar? Nenne drei davon und was sie zeigen.
- Wer ist der Owner/Admin (falls sichtbar)?
- Wie verteilt sich das TVL auf die Top-Holder?

**Deliverable:** Vollständiger Analyse-Report (600-1000 Wörter) mit den Daten aus jedem Teil plus Reflexion: Welche Erkenntnisse sind dir neu? Welche Approvals wirst du basierend auf dieser Analyse zurückziehen? Welche Contract-Details haben dich überrascht?

### Quiz

**Frage 1:** Du entdeckst in deiner Wallet eine unerwartete Transaktion von vor 3 Wochen: Eine Interaktion mit einem Contract, den du nicht kennst, gefolgt von einem kleinen ETH-Verlust von 0,05 ETH. Wie gehst du diese Investigation systematisch auf Etherscan an?

<details>
<summary>Antwort anzeigen</summary>

Eine unerwartete Transaktion mit ETH-Verlust ist ein ernstzunehmendes Signal. Mögliche Erklärungen reichen von harmlos (vergessene Transaktion, Gas-Preis-Verwirrung) bis kritisch (aktive Wallet-Kompromittierung). Eine systematische Investigation ist nötig. **Schritt 1: Transaktion identifizieren und öffnen.** Gehe auf deine Wallet-Seite auf Etherscan. Finde die spezifische Transaktion (kannst nach Datum filtern). Klicke auf die Transaktion-Hash, um in die Detail-View zu kommen. Notiere: exaktes Datum, Zeit, beteiligte Adressen, Method. **Schritt 2: Method analysieren.** Was wurde aufgerufen? Einige häufige unschädliche Methods: "Approve", "Transfer", "Swap". Einige verdächtige Methods: "setApprovalForAll" auf NFT-Contracts (kann gesamte NFT-Kollektion gefährden), "permit" (ermöglicht gasless Approvals — kann in Phishing-Kontext missbraucht werden), komplexe oder kryptische Method-Namen ("0xa9059cbb", "claim" auf unbekannten Contracts). Wenn die Method-Name-Anzeige fehlt oder kryptisch ist, ist das ein Warnsignal — Etherscan zeigt Methods typischerweise klar, wenn der Contract verifiziert ist. **Schritt 3: Den "To"-Contract untersuchen.** Klicke auf den To-Contract. Ist er verifiziert? Ist er gelabelt (z.B. bekannter Protokoll-Contract)? Wenn beides nein: hohes Risiko-Signal. Prüfe: wann wurde der Contract deployt (alte Contracts sind weniger wahrscheinlich Scams als neu deployte)? Wie viele Holder hat er? Wie viele Transaktionen? Ein 2 Wochen alter Contract mit 50 Transaktionen, alle gegen unterschiedliche Wallets mit ähnlichem Pattern — klassisches Scam-Muster. **Schritt 4: Logs analysieren.** Was ist laut Events wirklich passiert? Bei Token-Transfer-Events: welche Tokens sind in welche Richtung geflossen? Das 0,05 ETH Verlust könnte sein: (a) Gas-Kosten für die Transaktion selbst (dann wäre Value = 0, aber Transaction Fee = 0,05 ETH). (b) ETH-Transfer an den Contract (dann wäre Value = 0,05 ETH). (c) ETH-Transfer innerhalb eines Swaps oder Komplex-Calls (dann Internal Transactions prüfen). Die Logs zeigen die exakte Mechanik. **Schritt 5: Internal Transactions prüfen.** Wenn die Transaktion komplex ist, zeigt der Internal-Transactions-Tab, welche Contracts sich untereinander aufgerufen haben. Hier kann der wahre Weg des Kapitals sichtbar werden. Wenn ein Internal Transfer an eine verdächtige Adresse geht, ist das ein Hinweis. **Schritt 6: Die eigene Intention rekonstruieren.** Welche dApps hast du damals genutzt? Hattest du das Protokoll erwartungsgemäß aufgerufen? Prüfe Browser-Historie, Wallet-App-Aktivität, Discord/Telegram-Kommunikation. Manchmal war die Transaktion einfach vergessen. **Schritt 7: Kompromittierung ausschließen.** Wenn du die Transaktion nicht rekonstruieren kannst: ernsthaft prüfen, ob die Wallet kompromittiert sein könnte. Prüfe ALLE Transaktionen der letzten Zeit. Gibt es weitere unerwartete? Sofort-Maßnahmen: Alle Approvals via Etherscan Approval Checker oder revoke.cash zurückziehen. Wenn du verdächtige Approvals findest (z.B. Unlimited zu Contracts, die du nie authorisiert hast), ist das ein klares Kompromittierungs-Signal. **Schritt 8: Escalation falls nötig.** Wenn Kompromittierung wahrscheinlich: alle verbleibenden Assets auf eine neue Wallet transferieren (am besten frisch generiert, mit Hardware-Wallet). Die alte Wallet als kompromittiert behandeln, nie wieder verwenden. Die Private Keys müssen als exposed betrachtet werden. **Schritt 9: Forensische Dokumentation.** Screenshots aller relevanten Etherscan-Seiten. Transaktions-Hashes dokumentieren. Für eventuelle spätere Nachverfolgung oder Versicherungs-Claims (falls existierend). **Die wahrscheinlichsten Szenarien im Vorfeld:** (a) **Vergessene Transaktion:** Du hast vor 3 Wochen ein neues Protokoll getestet und vergessen. 0,05 ETH waren Gas-Kosten. Harmlos. (b) **Phishing-Klick:** Du hast auf eine bösartige Transaktion-Anfrage geklickt, die als legitime Aktion getarnt war. Die 0,05 ETH sind direkt in einer Scam-Wallet. Kompromittierungs-Verdacht. (c) **Approval-Abuse:** Du hattest in der Vergangenheit eine Unlimited-Approval gegeben, der Contract wurde kompromittiert und hat später deine Token abgezogen. Die "kleine ETH-Verlust" könnte nur die Spitze sein. **Die konkreten Handlungs-Prioritäten:** Wenn Szenario A: nichts weiter nötig. Wenn Szenario B oder C: sofortige Mitigations-Maßnahmen wie oben beschrieben. **Die Meta-Lehre:** Wallet-Hygiene ist reaktiv schwer. Proaktive Maßnahmen — Exact Approvals, monatliche Reviews, Hardware Wallet — reduzieren die Wahrscheinlichkeit solcher Situationen drastisch. Etherscan ist das Tool, um im Ernstfall Klarheit zu schaffen. Aber die beste Investigation ist die, die man nie machen muss.

</details>

**Frage 2:** Ein Bekannter schickt dir einen Link zu einem DeFi-Protokoll, das er interessant findet. Du willst die Contract-Seite auf Etherscan prüfen. Welche sechs konkreten Checks führst du durch, und was würde dich zu "nicht nutzen" bewegen?

<details>
<summary>Antwort anzeigen</summary>

Ein systematischer Contract-Check auf Etherscan ist eines der wichtigsten Due-Diligence-Tools vor jeder DeFi-Interaktion. Sechs konkrete Checks decken die wesentlichen Risiko-Dimensionen ab. **Check 1: Ist der Code verifiziert?** Gehe auf die Contract-Tab. Wenn oberhalb des Codes "Contract Source Code Verified" steht (oft mit grünem Häkchen), ist der Code öffentlich einsehbar und wurde gegen den on-chain-Bytecode geprüft. Wenn stattdessen nur "Contract Source Code" ohne Verifizierung oder nur der Bytecode steht: Red Flag. Unverifizierte Contracts sind Black Boxes — niemand weiß, was sie wirklich tun. Für konservative Nutzung: unverifizierte Contracts nie verwenden. Selbst wenn der Code später verifiziert wird, ist die Tatsache, dass er initial unverifiziert war, ein Warnsignal für Professionalität. **Ausschluss-Kriterium: Nicht verifiziert = nicht nutzen.** **Check 2: Alter des Contracts.** Auf der Contract-Seite ist das Deployment-Datum sichtbar. Je älter desto besser (alle sonstigen Faktoren gleich). Ein Contract, der 2 Jahre lebt und signifikant genutzt wurde, hat die "Battle-Tested"-Eigenschaft, die ein 2-Wochen-Contract nicht hat. Junge Contracts können trotzdem gut sein (gut auditiert, bekanntes Team), aber die Unsicherheit ist höher. **Ausschluss-Kriterium für konservative Nutzung: Unter 90 Tage alt ohne anerkanntes Team.** **Check 3: Deployer-Adresse.** Auf der Contract-Page steht der Deployer (wer den Contract deployt hat). Ist es eine bekannte Adresse? Ein etabliertes Team? Eine EOA oder eine Multi-Sig? Prüfe die Deployer-Adresse: welche anderen Contracts hat diese Adresse deployt? Wenn es viele sind (dezentes Muster: 2-10 bekannte Protokolle), ist das oft ein legitimes Team. Wenn es nur dieser eine Contract ist und die Adresse anonymous wirkt, ist das Warnung. **Ausschluss-Kriterium: Anonymer Deployer ohne öffentliches Team.** **Check 4: Admin- / Owner-Rechte.** Im Read-Contract-Tab suche nach Funktionen wie `owner()`, `admin()`, `governance()`. Prüfe die Rückgabe-Adresse. Vier Szenarien. (a) Null-Adresse oder geburned: Bestes Szenario, Admin-Rechte wurden aufgegeben. (b) Multi-Sig-Adresse (mehrere Signaturen nötig): Gutes Szenario, verteiltes Vertrauen. (c) Governance-Contract: Akzeptabel, wenn das Governance-System aktiv ist. (d) EOA (Einzelperson): Red Flag. Eine Einzelperson mit Admin-Rechten kann Funds ziehen, Contracts upgraden, die Nutzer schädigen. Prüfe auch: gibt es einen Timelock (ein Contract, der Admin-Aktionen verzögert)? Das ist ein positives Signal. **Ausschluss-Kriterium: EOA-Admin ohne Timelock und ohne klare Team-Transparenz.** **Check 5: Historische Aktivität und Holders-Verteilung.** Im Transactions-Tab: wie viele Transaktionen hat der Contract insgesamt? Ein Lending-Protokoll mit 50.000+ Transaktionen und 5000+ unique Adressen ist etabliert. Ein mit 100 Transaktionen und 20 Adressen ist entweder sehr neu oder wenig genutzt. Bei Token-Contracts: Holders-Tab. Wie verteilt sich das Token? Wenn Top-10 Holder 90% haben, ist es extrem konzentriert — Exit-Risiko. Wenn Top-10 haben 30-40% und dann lange Tail, ist es diversifizierter. **Ausschluss-Kriterium: Extrem niedrige Aktivität bei nicht-neuem Contract (signalisiert fehlende Adoption).** **Check 6: Verlinkte Informationen — Audit-Reports, offizielle Links.** Viele Contracts haben unten auf der Page Kontakt-Informationen: Website, Audit-Reports, Twitter, Source-Code-Repository. Prüfe: gibt es einen Audit-Report von einer anerkannten Firma (Trail of Bits, OpenZeppelin, Consensys Diligence, Certora, etc.)? Führt der Link zu einer echten, seriösen Website oder zu generischem Content? Ist das Twitter aktiv und mit realen Interaktionen, oder ist es eine Bot-Farm? Querverweise: stimmen die Informationen mit dem überein, was der Bekannte behauptet? **Ausschluss-Kriterium: Kein Audit verlinkt oder Audit von unbekannter Firma, und Teams-Informationen nicht verifizierbar.** **Die Synthese-Logik:** Wenn mindestens zwei der sechs Checks ein Red Flag ergeben, ist "nicht nutzen" die konservative Empfehlung. Wenn einer ein Red Flag ist, muss das durch Stärken in anderen Bereichen stark ausgeglichen werden. Wenn alle sechs positiv sind, ist das ein solides Basis-Signal für "weiter prüfen" — aber noch keine Garantie. **Zusätzliche Checks bei Auffälligkeiten:** Wenn bei den sechs Checks etwas ungewöhnlich erscheint, tiefere Analyse: (a) Die verlinkten Audit-Reports tatsächlich lesen (auch wenn sie lang sind — Executive Summary reicht oft). (b) Die Twitter-Diskussion verfolgen: gibt es Warnungen von etablierten Analysten? (c) Auf einschlägigen Forums (CryptoCompare, DeFi-Pulse, Reddit DeFi) nach Diskussionen suchen. (d) Bei großem geplantem Investment: einen zweiten Satz Augen einholen (mit einer Person, die DeFi versteht). **Die zeitliche Einordnung:** Diese 6 Checks dauern 15-30 Minuten. Für eine Investition von 1.000 USD absurd viel Aufwand. Für eine Investition von 50.000 USD absolutes Minimum. Die Skalierung der Due Diligence mit dem Betrag ist eine wichtige Konvention. **Das übergreifende Prinzip:** Die Mehrheit aller DeFi-Verluste gegenüber Retail-Nutzern wäre durch systematische Etherscan-Checks verhindert worden. Rug Pulls, Scam-Tokens, versteckte Admin-Rechte, gefälschte Audit-Behauptungen — all das wird in einer 20-Minuten-Check-Routine sichtbar. Wer diese Disziplin entwickelt, eliminiert die Mehrheit aller DeFi-Risiken systematisch. Das ist billiger Risiko-Schutz mit hohem Return.

</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 8 Folien: Titel → Etherscan-Oberfläche → Transaktionen lesen → Contracts inspizieren → Read-Funktionen → Approval-Management → Token-Holders → 6-Check-Due-Diligence
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — Etherscan-Screenshots, Transaktions-Details-Grafik, Contract-Verifizierungs-Workflow, Approval-Checker-Bild, 6-Check-Flowchart

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 15.4 — Dune Analytics und Custom Queries

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Dune Analytics als SQL-basierte Query-Plattform positionieren und seinen Unterschied zu aggregierten Dashboards verstehen
- Community-Dashboards effizient finden und für eigene Fragen nutzen
- Die Basis-Struktur von Dune-Queries lesen und leichte Anpassungen vornehmen
- Einschätzen, wann Custom Queries sinnvoll sind und wann man bei etablierten Tools bleiben sollte
- Ein Dune-Dashboard eines renommierten Erstellers (hildobby, Defimochi, rchen8) auswählen und als Monitoring-Basis für eine Protokoll-Position einsetzen
- Mit DuneSQL die grundlegenden Tabellen (ethereum.transactions, ethereum.traces, dex.trades) für eigene Abfragen identifizieren
- Die wichtigsten Dune-Tabellen (ethereum.transactions, erc20.transfers, dex.trades, prices.usd) identifizieren
- Eine einfache Custom Query (z.B. Top-Holder eines Tokens) selbst schreiben und als Dashboard-Widget nutzen

### Erklärung

**Was Dune Analytics ist und nicht ist**

Dune Analytics ([dune.com](https://dune.com)) ist eine SQL-basierte Query-Plattform für Blockchain-Daten. Während DeFiLlama aggregierte Metriken und vorgefertigte Views liefert und Etherscan einzelne Transaktionen granular zeigt, füllt Dune den Zwischenraum: strukturierte Abfragen über viele Transaktionen hinweg, die genau die Fragen beantworten, die man selbst stellt.

Die technische Grundlage: Dune indiziert Blockchain-Daten (Transaktionen, Events, Token-Transfers, Contract-Calls) in SQL-Tabellen. Nutzer können mit Standard-SQL (plus PostgreSQL-Erweiterungen) diese Tabellen abfragen. Das Ergebnis ist entweder eine Datentabelle oder ein Diagramm — alles im Browser, ohne lokale Infrastruktur.

**Der zentrale Punkt für Retail-Nutzer:** Die meisten müssen **nicht selbst SQL schreiben**. Die Plattform hat eine der wertvollsten Community-Assets in DeFi: zehntausende öffentliche Dashboards, die von professionellen Analysten gebaut wurden und frei zugänglich sind. Der realistische Nutzungs-Workflow ist meist: die richtige Frage formulieren, das passende Community-Dashboard finden, die Daten dort abgreifen. Custom Queries werden erst nötig, wenn die spezifische Frage von keinem vorhandenen Dashboard beantwortet wird.

**Dune vs. DeFiLlama: die wichtige Unterscheidung**

DeFiLlama ist ein kuratiertes Dashboard mit festen Views. Dune ist ein offenes SQL-Playground, auf dem jeder eigene Views bauen kann. Die Unterschiede in der Praxis:

**DeFiLlama Stärken:**
- Standardisierte Metriken, konsistent über Protokolle hinweg
- Für die am häufigsten gestellten Fragen bereits optimiert
- Qualitätskontrollierte Methodik (TVL-Berechnungen, etc.)
- Keine SQL-Kenntnisse nötig

**Dune Stärken:**
- Jede beliebige Frage ist beantwortbar, wenn die Daten vorhanden sind
- Tiefere Granularität (einzelne Transaktions-Level-Analysen)
- Community-Dashboards für Nischen-Themen, die DeFiLlama nicht abdeckt
- Anpassbare Queries für eigene Parameter

**Die richtige Wahl:** Für Standard-Fragen (TVL-Vergleich, Yield-Suche, Bridge-Flows) ist DeFiLlama effizienter. Für spezifische oder tiefgehende Fragen (z.B. "Welche Wallets haben in den letzten 7 Tagen neue Positionen in Protokoll X aufgebaut?", "Wie verteilt sich die Gas-Verwendung über verschiedene Contract-Kategorien auf Arbitrum?") wird Dune notwendig.

**Community-Dashboards effizient finden**

Der Einstiegspunkt ist die Dune-Discover-Seite ([dune.com/browse/dashboards](https://dune.com/browse/dashboards)). Mehrere Strategien führen zu den besten Dashboards:

**Strategie 1: Protokoll-spezifische Suche.**
Wenn du ein spezifisches Protokoll analysierst (z.B. Aave, Uniswap, Ethena), suche nach dessen Namen. Große Protokolle haben meist mehrere Community-Dashboards plus oft ein offizielles Dashboard vom Team selbst. Letztere sind oft am gründlichsten — das Team nutzt Dune intern für eigene Analysen und publiziert sie.

**Strategie 2: Top-Autoren folgen.**
Einige Dune-Autoren sind als zuverlässige Analysten bekannt. Zu den am häufigsten empfohlenen gehören:
- **@hagaetc** — Bekannt für breite Markt-Übersichten, Stablecoin-Analysen
- **@0xKhmer** — Detaillierte Protokoll-Analysen, besonders Lending und DEXs
- **@rchen8** — Lange Ethereum-Historie-Analysen, Staking, Gas
- **@21co** — Research-Arm von 21Shares, institutionelle Qualität
- **@tomwan** — Token-Launch-Analysen, Wash-Trading-Detection
- **@niftytable** — NFT-bezogen, wenn das relevant ist

Diese Namen sind Ausgangspunkt, nicht erschöpfende Liste. Auf jeder guten Dashboard-Seite kann man den Autor anklicken und dessen weitere Dashboards erkunden.

**Strategie 3: Keyword-Suche mit spezifischen Begriffen.**
Generische Suchen ("DeFi", "Lending") liefern zu viele Ergebnisse. Spezifische Suchen ("Aave V3 borrowers", "Lido withdrawal queue", "stablecoin depeg") liefern gezieltere Treffer.

**Strategie 4: Via Twitter/X.**
Viele Analysten posten ihre Dune-Dashboards auf Twitter. Wenn eine Analyse besonders aufschlussreich ist, ist sie typischerweise verlinkt. Bookmarks von guten Dune-Verlinkungen über Zeit aufbauen.

**Qualitäts-Check für Dune-Dashboards**

Nicht jedes Dashboard ist vertrauenswürdig. Mehrere Indikatoren helfen bei der Qualitäts-Einschätzung:

**Positive Indikatoren:**
- **Autor-Reputation.** Known Analysts mit Track Record vs. anonyme Neulinge
- **Letzte Aktualisierung.** Ein 2-Jahre-altes Dashboard kann veraltete Contract-Adressen verwenden und falsche Zahlen zeigen
- **Anzahl "Stars" und Views.** Hohe Community-Bewertung ist ein schwaches, aber existentes Signal
- **Konsistenz mit anderen Quellen.** Wenn die Dashboard-TVL-Zahl von DeFiLlama abweicht, ist das ein Red Flag — einer von beiden liegt falsch
- **Zweck-Klarheit.** Gute Dashboards haben eine klare Frage, die sie beantworten. Schlechte sind Datenlawinen ohne Fokus

**Negative Indikatoren:**
- **Fehlende Beschriftungen.** Tabellen ohne Kontext, Charts ohne Achsen-Labels
- **Unverständliche Queries.** Wenn man den SQL-Code nicht lesen kann (und die Beschreibung nicht erklärt, was gemacht wird), ist das Misstrauens-Signal
- **Ausschließlich Roh-Daten ohne Interpretation.** Gute Analysten helfen beim Verstehen, nicht nur beim Anzeigen

**Praktische Workflow-Beispiele**

**Beispiel 1: "Wie viele unique Adressen haben im letzten Monat GHO (Aave's Stablecoin) gemintet?"**

DeFiLlama kann das nicht direkt beantworten — TVL ja, User-Counts nein. Lösung:
- Dune-Suche: "GHO analytics" oder "Aave GHO"
- Das offizielle Aave-GHO-Dashboard oder Community-Dashboards finden
- Die Metrik "unique mint addresses" oder ähnliche nutzen
- Typisch 5-10 Minuten vom Start bis zum Ergebnis

**Beispiel 2: "Wie verteilt sich der Umsatz von Uniswap V3 auf verschiedene Pool-Fee-Tiers (0.01%, 0.05%, 0.3%, 1%)?"**

Eine detaillierte Protokoll-Struktur-Frage:
- Dune-Suche: "Uniswap V3 fees" oder "Uniswap tier volume"
- Mehrere Community-Dashboards zeigen diese Aufschlüsselung
- Die Verteilung zeigt, welche Asset-Typen dominieren (Stable-Pairs vs. Volatile-Pairs)

**Beispiel 3: "Welche Wallets haben sich in den letzten 30 Tagen erstmalig bei Pendle angemeldet und > $100K deposited?"**

Sehr spezifisch — hier wird es herausfordernd:
- Suche nach "Pendle new users" oder "Pendle analytics"
- Vielleicht findet sich ein passendes Dashboard, vielleicht nicht
- Wenn nicht: Custom Query nötig (oder Fork eines bestehenden Dashboards mit Anpassungen)

**Dune-Queries lesen — die absoluten Basics**

Für die meisten Retail-Nutzer reicht es, Dashboards zu nutzen. Aber wer Queries lesen kann, versteht die Daten-Grundlage und kann Fehler besser erkennen. Ein typischer Dune-Query sieht so aus:

```
SELECT 
 DATE_TRUNC('day', block_time) AS day,
 COUNT(DISTINCT "from") AS unique_senders
FROM ethereum.transactions
WHERE "to" = 0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2
 AND block_time > NOW() - INTERVAL '30' day
GROUP BY 1
ORDER BY 1 DESC
```

Was dieser Query zeigt: Tägliche unique Absender an eine bestimmte Contract-Adresse (in dem Fall ein spezifischer Contract) über die letzten 30 Tage.

Die wichtigsten Elemente:
- **SELECT:** Welche Spalten sollen zurückgegeben werden?
- **FROM:** Aus welcher Tabelle? Auf Dune typisch: `ethereum.transactions`, `ethereum.logs`, `erc20.transfers` und protokoll-spezifische Tabellen
- **WHERE:** Filter. Hier: Transaktionen zu einer bestimmten Contract-Adresse, aus den letzten 30 Tagen
- **GROUP BY:** Aggregation. Nach Tag gruppieren
- **ORDER BY:** Sortierung

**Häufige Dune-Tabellen:**
- `ethereum.transactions` — Alle Ethereum-Transaktionen
- `ethereum.logs` — Alle Events (emittiert von Contracts)
- `erc20.transfers` — Spezifisch Token-Transfers
- `aave_v3_ethereum.*` — Aave-spezifische Tabellen
- `uniswap_v3_ethereum.*` — Uniswap-V3-spezifisch

Ähnliche Struktur für andere Chains: `arbitrum.transactions`, `optimism.transactions`, `base.transactions`, etc.

**Wann sind Custom Queries sinnvoll?**

Die ehrliche Antwort für die meisten Retail-Nutzer: selten. In 80-90% der Analysen findet sich ein Community-Dashboard, das die Frage beantwortet oder nahe genug kommt. Custom Queries lohnen sich, wenn:

1. **Die spezifische Frage sehr eng ist** (z.B. eigene Wallet-Performance-Analyse, spezifische Zeiträume)
2. **Du ein wiederkehrendes Setup brauchst** (automatisches Dashboard für eigene Positionen)
3. **Die verfügbaren Dashboards systematische Fehler haben**, die du beheben willst
4. **Du als Analyst oder Researcher selbst publizieren willst**

Für die meisten Retail-Nutzer gilt: Community-Dashboards finden und nutzen ist effizienter als selbst Queries schreiben. Die Lern-Investition für SQL-Grundlagen ist nicht trivial, und für gelegentliche Analysen lohnt sich der Aufwand selten.

**Der pragmatische Zwischenweg: Query-Duplizierung**

Wenn ein bestehendes Dashboard fast — aber nicht ganz — deine Frage beantwortet, ist Query-Duplizierung oft die beste Lösung. Der Workflow:

1. Das Dashboard finden, das am nächsten an deiner Frage ist
2. Den spezifischen Query öffnen (jedes Chart hat einen View-Query-Button)
3. Mit "Fork" eine eigene Kopie erstellen
4. Kleine Anpassungen machen — andere Adresse, anderer Zeitraum, andere Filter-Kriterien
5. Neu ausführen, eigene Daten bekommen

Das geht oft ohne tiefgehende SQL-Kenntnisse — wer ungefähr versteht, wo die Adress-Filter stehen, kann sie ersetzen. Das ist der realistische Einstieg ins aktive Dune-Nutzen für Nicht-Entwickler.

**Limitationen und Fallen**

**Daten-Latenz:** Dune-Daten sind nicht perfekt real-time. Für die meisten Analysen ist das egal, aber für zeitkritische Entscheidungen (z.B. Liquidation-Tracking) nicht ausreichend.

**Query-Kosten und Limits:** Die kostenlose Stufe hat Limits (wie viele Queries pro Tag, wie lange Queries laufen dürfen). Für gelegentliche Nutzung ausreichend, für intensive Analyse braucht es Pro-Subscription.

**SQL-Fehler:** Queries können subtile Bugs haben — falsche JOIN-Bedingungen, vergessene Filter, Double-Counting. Das gilt auch für Community-Dashboards. Plausibilitäts-Check gegen andere Quellen (DeFiLlama, Etherscan-Totals) ist immer empfohlen.

**Contract-Adress-Updates:** Protokolle deployen neue Contracts (z.B. Aave V3 nach V2). Alte Dashboards mit alten Adressen zeigen stagnate Daten — nicht weil das Protokoll stagniert, sondern weil der Query die falschen Contracts trackt. Letzte Aktualisierungsdatum prüfen.

**Die realistische Einordnung**

Dune Analytics ist ein mächtiges Tool, aber nicht das primäre für typische Retail-Entscheidungen. Es ergänzt DeFiLlama und Etherscan für die spezifischen Fragen, die beide nicht beantworten. Die realistische Routine für einen konservativen Retail-Analysten: monatlich 2-3 Dune-Dashboards konsultieren für spezifische Protokoll- oder Markt-Fragen. Kein tägliches Deep-Diving. Keine eigenen Custom Queries für Standard-Situationen.

Wer aktiver DeFi-Analyst werden will oder bestimmte Spezial-Strategien verfolgt (MEV, Airdrop-Farming, statistische Arbitrage), sollte tiefer in Dune einsteigen. Für alle anderen reicht Community-Dashboard-Nutzung völlig aus.

### Folien-Zusammenfassung

**[Slide 1] — Titel**
Dune Analytics und Custom Queries

**[Slide 2] — Was Dune ist**
SQL-basierte Query-Plattform für Blockchain-Daten
Füllt die Lücke: zwischen aggregiertem DeFiLlama und granularem Etherscan
Community-Stärke: zehntausende öffentliche Dashboards

**[Slide 3] — Dune vs. DeFiLlama**
DeFiLlama: Standardisiert, kuratiert, Standard-Fragen
Dune: Offen, individuell, spezifische Fragen
Die richtige Wahl hängt von der Frage ab

**[Slide 4] — Community-Dashboards finden**
Protokoll-Suche
Top-Autoren (@hagaetc, @0xKhmer, @rchen8, @21co)
Keyword-Suche spezifisch, nicht generisch
Twitter-Bookmarks für gute Dashboards

**[Slide 5] — Qualitäts-Check**
Positiv: Autor-Reputation, Recency, Konsistenz mit DeFiLlama, klarer Zweck
Negativ: fehlende Labels, unverständliche Queries, Daten ohne Interpretation

**[Slide 6] — Query-Basics**
SELECT / FROM / WHERE / GROUP BY / ORDER BY
Häufige Tabellen: ethereum.transactions, logs, erc20.transfers, protokoll-spezifisch
Nicht nötig selbst zu schreiben — lesen reicht meist

**[Slide 7] — Query-Duplizierung als pragmatischer Einstieg**
Dashboard finden, Query forken, kleine Anpassungen
Adresse ändern, Zeitraum anpassen
Einstieg ohne tiefe SQL-Kenntnisse

**[Slide 8] — Wann Dune nicht nötig**
80-90% der Retail-Fragen durch DeFiLlama + Etherscan beantwortbar
Dune: für Spezialfragen, Protokoll-Tiefe, wiederkehrende Setups
Realistische Retail-Routine: monatlich 2-3 Dune-Dashboards

### Sprechertext

**[Slide 1]** Dune Analytics ist das dritte Werkzeug in unserem On-Chain-Analyse-Stack. Es füllt eine spezifische Lücke zwischen DeFiLlamas aggregierten Dashboards und Etherscans granularem Transaktions-View. In dieser Lektion lernen wir, es effizient zu nutzen — ohne selbst zum SQL-Experten werden zu müssen.

**[Slide 2]** Dune ist technisch eine SQL-basierte Query-Plattform. Blockchain-Daten — Transaktionen, Events, Transfers, Contract-Calls — werden in relationale Tabellen indiziert. Nutzer fragen mit Standard-SQL ab. Das Ergebnis sind Tabellen oder Diagramme, alles im Browser, ohne lokale Infrastruktur. Die wahre Stärke ist nicht die Query-Fähigkeit selbst, sondern die Community. Zehntausende öffentliche Dashboards existieren, gebaut von professionellen Analysten, frei zugänglich. Der realistische Retail-Workflow: die richtige Frage formulieren, das passende Community-Dashboard finden, dort die Daten abgreifen.

**[Slide 3]** Die Unterscheidung zu DeFiLlama ist wichtig. DeFiLlama ist ein kuratiertes Dashboard mit festen Views — für die häufigsten Fragen bereits optimiert, konsistent über Protokolle, qualitätskontrolliert. Dune ist offen — jede beliebige Frage ist beantwortbar, wenn die Daten da sind, mit tieferer Granularität. Für Standard-Fragen wie TVL-Vergleich und Yield-Suche ist DeFiLlama effizienter. Für spezifische Fragen wie "welche Wallets haben in den letzten 7 Tagen neue Pendle-Positionen über 100.000 Dollar aufgebaut?" wird Dune notwendig.

**[Slide 4]** Community-Dashboards finden ist der zentrale Skill. Vier Strategien. Erstens: Protokoll-spezifische Suche — große Protokolle haben oft mehrere Community-Dashboards plus manchmal ein offizielles Team-Dashboard, letztere sind oft am gründlichsten. Zweitens: Top-Autoren folgen — hagaetc, 0xKhmer, rchen8, 21co sind bekannte Namen mit konsistenter Qualität. Drittens: Keyword-Suche spezifisch, nicht generisch. Viertens: Twitter-Bookmarks über Zeit aufbauen, wenn gute Dune-Analysen in Feeds auftauchen.

**[Slide 5]** Qualitäts-Check ist nötig — nicht jedes Dashboard ist zuverlässig. Positive Indikatoren: bekannte Autoren mit Track Record, recente Aktualisierung, Konsistenz mit anderen Quellen wie DeFiLlama, klarer Fokus auf eine spezifische Frage. Negative Indikatoren: fehlende Achsen-Labels, unverständliche Queries ohne Erklärung, Datenlawinen ohne Interpretation. Wenn eine Zahl von DeFiLlama deutlich abweicht, ist das ein Trigger für Misstrauen — nicht automatisch gegen Dune, aber für tiefere Untersuchung.

**[Slide 6]** Query-Basics zu verstehen hilft beim Lesen, auch wenn man nie selbst schreibt. Fünf zentrale SQL-Elemente: SELECT wählt Spalten, FROM wählt die Tabelle, WHERE filtert, GROUP BY aggregiert, ORDER BY sortiert. Häufige Dune-Tabellen: ethereum.transactions, ethereum.logs, erc20.transfers und protokoll-spezifische Tabellen wie aave_v3_ethereum. Für andere Chains analog: arbitrum.transactions, base.transactions. Wer diese Basis kennt, kann die meisten Dashboard-Queries grob verstehen.

**[Slide 7]** Der pragmatische Einstieg für Nicht-Entwickler: Query-Duplizierung. Wenn ein Dashboard fast, aber nicht ganz, deine Frage beantwortet — fork den Query, mach kleine Anpassungen. Andere Adresse einsetzen, Zeitraum anpassen, Filter-Kriterien ändern. Das funktioniert oft ohne tiefgehende SQL-Kenntnisse. Wer ungefähr versteht, wo die Adress-Filter stehen, kann sie austauschen. Das ist der realistische aktive Einstieg, ohne einen SQL-Kurs absolvieren zu müssen.

**[Slide 8]** Die ehrliche Einordnung: Dune ist mächtig, aber nicht das primäre Tool für typische Retail-Entscheidungen. 80 bis 90 Prozent aller Retail-Analyse-Fragen sind durch DeFiLlama plus Etherscan beantwortbar. Dune ergänzt für Spezialfragen — Protokoll-Tiefe, eigene Setups, wiederkehrende Metriken, die keine Standard-Quelle abbildet. Realistische Retail-Routine: monatlich zwei bis drei Dune-Dashboards konsultieren für spezifische Fragen. Kein tägliches Deep-Diving. Kein Aufbau eigener Custom-Query-Bibliothek für Standard-Situationen. Wer aktiver Analyst werden will, steigt tiefer ein. Für alle anderen reicht Community-Dashboard-Nutzung vollständig aus.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** **SCREENSHOT SUGGESTION:** Dune Analytics Discover-Seite (dune.com/browse/dashboards) mit Übersicht der Community-Dashboards, verschiedenen Kategorien und Sortierungs-Optionen.

**[Slide 3]** Vergleichs-Diagramm: DeFiLlama als "Supermarkt mit fertigen Produkten" vs Dune als "Werkstatt mit Werkzeugen". Visuelle Metapher für die unterschiedlichen Ansätze.

**[Slide 4]** **SCREENSHOT SUGGESTION:** Beispiel eines qualitativ hochwertigen Community-Dashboards (z.B. von @hagaetc oder @21co), das eine konkrete Protokoll-Analyse zeigt.

**[Slide 5]** Qualitäts-Checkliste als visueller Block: positive und negative Indikatoren gegenübergestellt, mit Häkchen und Kreuzen.

**[Slide 6]** **SCREENSHOT SUGGESTION:** Dune-Query-Editor mit sichtbarem SQL-Code und darunter dem gerenderten Chart. Zeigt die Beziehung zwischen Query und Ergebnis.

**[Slide 7]** Workflow-Diagramm für Query-Duplizierung: Dashboard finden → Query öffnen → Fork → Anpassen → Ausführen. Fünf-Schritt-Visualisierung.

**[Slide 8]** Pyramide der Analyse-Tools: Basis breit (DeFiLlama, Etherscan — für die meisten Fragen), Mitte schmaler (Dune — für Spezialfragen), Spitze minimal (Custom Queries — für echte Experten).

### Übung

**Aufgabe: Ein Dune-Dashboard für eine konkrete Frage finden und auswerten**

Formuliere eine spezifische Analyse-Frage zu einem DeFi-Protokoll, das du aktiv nutzt oder verfolgst. Die Frage sollte so spezifisch sein, dass DeFiLlama sie wahrscheinlich nicht direkt beantwortet. Beispiele:
- "Wie viele unique Depositors hat Aave V3 Ethereum im letzten Monat gewonnen oder verloren?"
- "Welche Uniswap-V3-Pool-Fee-Tier hat auf Base in den letzten 30 Tagen am meisten Volumen gesehen?"
- "Wie verteilt sich das stETH-TVL in Aave V3 auf verschiedene Nutzergrößen (< $10K, $10K-100K, > $100K)?"

**Schritt 1 (10 Min):** Formuliere deine Frage präzise. Prüfe mit DeFiLlama — gibt es dort schon eine Antwort? Wenn nein, weiter zu Dune.

**Schritt 2 (15 Min):** Suche auf Dune mit spezifischen Keywords. Finde mindestens ein relevantes Community-Dashboard. Dokumentiere den Autor, das letzte Aktualisierungsdatum, die Anzahl der Views/Stars.

**Schritt 3 (15 Min):** Extrahiere die Antwort auf deine Frage aus dem Dashboard. Wenn das Dashboard nicht exakt deine Frage beantwortet: welche verwandte Frage beantwortet es? Ist die Antwort trotzdem nützlich?

**Schritt 4 (10 Min):** Plausibilitäts-Prüfung. Vergleiche die Zahlen aus dem Dashboard mit DeFiLlama-Basis-Metriken oder anderen Quellen. Stimmen sie überein? Wenn nicht: welche ist richtig, welche vermutlich fehlerhaft?

**Deliverable:** Strukturierter Report (500-800 Wörter):
- Die Frage
- Das gefundene Dashboard (URL, Autor, Qualitäts-Einschätzung)
- Die gefundene Antwort
- Die Plausibilitäts-Prüfung
- Reflexion: Wie nützlich war der Dune-Workflow im Vergleich zu DeFiLlama allein? Würdest du das Dashboard bookmarken für wiederkehrende Fragen?

### Quiz

**Frage 1:** Du liest auf Twitter, dass ein neuer Dune-Dashboard "500.000 Unique User für Protokoll X im letzten Monat" zeigt. Auf DeFiLlama zeigt dasselbe Protokoll einen stagnierenden TVL ohne besondere Dynamik. Wie gehst du mit diesem Widerspruch um?

<details>
<summary>Antwort anzeigen</summary>

Ein Widerspruch zwischen zwei Quellen ist kein Fehler im System — es ist ein Signal, dass tiefere Analyse nötig ist. Mehrere Erklärungs-Hypothesen sind möglich, und eine systematische Prüfung hilft, die richtige zu identifizieren. **Hypothese 1: Definitions-Diskrepanz.** "Unique User" kann auf vielen Wegen definiert sein. Sind das unique Adressen, die irgendeine Transaktion mit dem Contract hatten? Dann zählen Token-Empfänger, die passive Receiver waren (z.B. Airdrop-Recipient), als "User" — obwohl sie aktiv nichts taten. Sind es unique Adressen, die Deposits gemacht haben? Das ist enger. Sind es unique Adressen mit aktiven Positionen? Noch enger. TVL dagegen misst deponiertes Kapital — wenn 500.000 Adressen je 1 Dollar deponieren, ist TVL-Impact minimal. Die scheinbar hohe User-Zahl kann strukturell konsistent mit stagnierendem TVL sein. **Hypothese 2: Sybil-Aktivität.** 500.000 Unique Adressen in einem Monat ist absolut hoch. Typische organische Wachstumsraten für DeFi-Protokolle liegen bei wenigen Tausend Wallets pro Monat. 500.000 signalisiert entweder: ein massives Adoptions-Ereignis (das in anderen Metriken sichtbar sein müsste), eine spezifische Kampagne wie Airdrop-Farming (bei der eine Person viele Wallets nutzt), oder eine Fehlerhafte Query. Wenn das Protokoll gerade ein Airdrop-Anspruchsprogramm hat, sind die "Users" oft Sybil-Farmer — eine Person mit 500 Wallets. Das würde erklären, warum TVL nicht mitwächst: das Kapital pro Wallet ist minimal, weil nur der Airdrop-Eligibility-Threshold angezielt wird. **Hypothese 3: Query-Fehler.** Die SQL-Query im Dashboard kann fehlerhaft sein. Häufige Fehler: zu breite Filter (z.B. "alle Adressen, die jemals mit einem Contract der Protokoll-Familie interagiert haben" statt "Hauptprotokoll-Nutzer"), fehlende Deduplication (eine Adresse zählt pro Transaktion, nicht pro unique), falsche Contract-Adressen (alte V1-Adresse gemischt mit V2). **Hypothese 4: Zeitframe-Diskrepanz.** "Im letzten Monat" auf dem Dashboard: wirklich die letzten 30 Tage? Oder cumulative über alle 30 Tage seit Launch? Manchmal sind Dashboard-Definitionen mehrdeutig. DeFiLlama's TVL ist aktuelle Zahl, nicht cumulative — das kann zu Missverständnissen führen. **Hypothese 5: DeFiLlama-Lücke.** Selten, aber möglich: DeFiLlama deckt nicht alle Aspekte des Protokolls ab. Wenn das Protokoll einen neuen Produkt-Layer hat, den DeFiLlama nicht indiziert, zeigt TVL nur den alten Teil, während Dune den neuen mitsieht. **Der systematische Prüfungs-Workflow:** **Schritt 1:** Definition im Dashboard prüfen. Was genau wird gezählt? Lies die Query, wenn möglich — oder die Beschreibung des Dashboards. Hat der Autor "User" definiert? **Schritt 2:** Sybil-Sanity-Check. Ist das Protokoll gerade in einer Airdrop-Farming-Phase? Gibt es ein aktives Incentive-Programm? Wenn ja, ist die hohe User-Zahl wahrscheinlich Sybil. **Schritt 3:** Kreuzreferenz mit anderen Quellen. Wenn ein Protokoll wirklich 500.000 neue organische User bekommt, müsste das in Twitter-Diskussionen, in Token-Preis, in anderen Dashboards sichtbar sein. Wenn alle anderen Quellen ruhig sind, ist der Dune-Wert verdächtig. **Schritt 4:** Zeitraum verifizieren. Klick auf Details im Dashboard. Ist der Zeitraum wirklich die letzten 30 Tage? **Schritt 5:** Konsistenz mit Etherscan. Gehe auf die Contract-Page auf Etherscan. Wie viele Transaktionen im letzten Monat? Bei 500.000 unique Users und typisch 3-5 Transaktionen pro User wären das 1,5-2,5 Millionen Transaktionen. Ist das plausibel? **Die wahrscheinliche Auflösung:** In der überwältigenden Mehrheit solcher Fälle ist eine von zwei Erklärungen richtig: (a) Die User-Definition ist breit und umfasst passive Empfänger; (b) es läuft ein Airdrop-Farming-Programm. Beide Szenarien sind konsistent mit stagnierendem TVL. **Die Handlungs-Empfehlung:** Bevor man die Zahl "500.000 User" als positive Adoptions-Signal interpretiert, ist die Verifikation Pflicht. Wer ohne Verifikation handelt (z.B. Position in das Protokoll aufbauen), basiert eine Entscheidung auf möglicherweise inflationärten Metriken. **Die Meta-Lehre:** Dune-Dashboards können falsche Eindrücke vermitteln — nicht, weil Dune falsch ist, sondern weil Queries unterschiedlich interpretierbare Metriken produzieren. DeFiLlama und andere aggregierte Quellen haben standardisiertere Definitionen. Wenn beide übereinstimmen, ist die Zahl robust. Wenn sie divergieren, ist eine gezielte Prüfung der Definition nötig. Pauschales "eine Quelle gewinnt" ist falsch — beide können in ihrem eigenen Rahmen korrekt sein.

</details>

**Frage 2:** Du überlegst, für deine regelmäßige Research eine Dune-Pro-Subscription zu nehmen (ca. $400-$500 pro Jahr). Unter welchen Umständen lohnt sich das für einen konservativen Retail-Nutzer, und wann ist die Free-Tier ausreichend?

<details>
<summary>Antwort anzeigen</summary>

Dune Pro bietet erweiterte Limits, Private Queries, schnellere Ausführung und einige Premium-Datensätze. Für die meisten Retail-Nutzer ist die Frage: rechtfertigt der Nutzen die Kosten? **Die Free-Tier-Realität:** Die kostenlose Stufe erlaubt unbegrenzte Nutzung öffentlicher Dashboards. Query-Erstellung ist erlaubt, aber mit Limits (bestimmte Anzahl Executions pro Tag, Query-Timeout-Beschränkungen, keine Private Queries). Für die 90% der Retail-Analyse-Use-Cases — Dashboard-Browsing, gelegentliche Query-Forks — reicht das vollständig. Wer monatlich 2-5 Dashboards konsultiert und gelegentlich kleine Anpassungen macht, hat keinen Bedarf für Pro. **Wann Pro sich lohnt:** **Szenario 1: Aktive Alpha-Suche.** Wer DeFi als Hauptbeschäftigung betreibt, nach Informations-Vorteilen sucht und eigene Thesen testen will, braucht Custom Queries häufig. Eine Pro-Subscription für $500/Jahr ist im Verhältnis zu Portfolio-Größen ab $100K eine kleine Kostenkomponente. Wenn bessere Analyse zu nur 1% bessere Jahresperformance führt, amortisiert sich Pro bei einem $50K-Portfolio bereits. **Szenario 2: Research-Produktion.** Wer Analysen öffentlich publiziert (Substack, Twitter-Threads, YouTube) oder als Berater arbeitet, braucht die Tools. Private Queries, schnelle Iteration, bessere Performance sind professionelle Anforderungen. **Szenario 3: Spezifische strategische Bedarfe.** MEV-Research, Whale-Tracking für Replication-Strategien, statistische Arbitrage zwischen Protokollen — alle diese Spezialisierungen erfordern intensive Custom-Query-Arbeit. **Wann die Free-Tier ausreicht:** **Kriterium 1: Portfolio-Größe < $50K.** Die Mehrwert-Schwelle für $500/Jahr erfordert signifikante Portfolio-Performance-Effekte. Bei kleineren Portfolios überwiegt das Kostenverhältnis den potenziellen Analysenutzen. **Kriterium 2: Konservative Strategie.** Wer sich an die Akademie-Philosophie hält — 7-8% Jahresrendite, konservative Allokations, wenige Bridge-Operationen pro Jahr — braucht keine intensive Custom-Analyse. Die Entscheidungen basieren auf Allokations-Philosophie, nicht auf Short-Term-Daten. **Kriterium 3: Tool-Abdeckung durch andere Quellen.** DeFiLlama + Etherscan + monatliche Nansen/Arkham-Queries decken die meisten Retail-Fragen ab. Dune ist der "letzte Prozent"-Tool für Spezialisten. **Kriterium 4: Zeit-Budget.** Dune-Pro rentiert sich nur, wenn man wirklich die Zeit aufbringt, es zu nutzen. Eine Subscription, die man einmal monatlich öffnet, ist ineffiziente Ressourcen-Allokation. **Die Entscheidungs-Matrix:** - Portfolio > $250K + aktive Research-Interesse: Pro oft lohnend. - Portfolio $50-250K + gelegentliche Custom-Analyse: Free reicht meist, Pro ist Luxury. - Portfolio < $50K oder passive Strategie: Free klar ausreichend. - Semi-professioneller Analyst / Publisher: Pro notwendig. **Die ehrliche Konservative Empfehlung:** Für die meisten Leser dieser Akademie — konservative Retail-Investoren mit 7-8%-Strategien — reicht die Free-Tier von Dune völlig. Die Energie ist besser investiert in: (a) DeFiLlama-Kompetenz vertiefen, (b) Etherscan-Routinen etablieren, (c) regelmäßige Approval-Audits, (d) gute Portfolio-Dokumentation. Dune-Pro ist ein Tool für aktive Researcher, nicht für disziplinierte Passive-Investoren. **Eine Zwischenoption:** Dune hat zeitweise Promo-Aktionen — Kurz-Trials von Pro, Bundle-Angebote mit anderen Tools. Wer spezifisch eine temporäre Analyse-Aufgabe hat (z.B. tiefe Research zu einem neuen Protokoll vor Investment), kann einen Monat Pro testen statt einer Jahres-Subscription. **Das übergreifende Prinzip:** Bessere Tools machen nicht automatisch bessere Entscheidungen. Die meisten Retail-Verluste in DeFi entstehen nicht durch fehlende Daten, sondern durch fehlende Disziplin in der Verwendung vorhandener Daten. Eine Free-Tier-Dune plus gute Routinen schlägt eine Pro-Subscription ohne Disziplin. Tool-Investitionen sollten proportional zur tatsächlichen Analyse-Tätigkeit sein — nicht zu der Tätigkeit, die man sich vornimmt.

</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 8 Folien: Titel → Dune-Plattform-Überblick → Dashboard-Nutzung → SQL-Queries lesen → Query-Forking → Custom-Queries → Kreuzreferenz mit DeFiLlama → Pro vs. Free
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — Dune-Dashboard-Screenshots, SQL-Query-Beispiel, Fork-Workflow, Metrik-Diskrepanz-Beispiel, Pro-Entscheidungs-Matrix

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 15.5 — Wallet-Tracking und die persönliche Research-Routine

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die führenden Wallet-Tracking-Tools (Nansen, Arkham, Zapper, DeBank) unterscheiden und situationsgerecht einsetzen
- Zwischen Portfolio-Tracking (eigene Positionen) und Wallet-Investigation (fremde Adressen) differenzieren
- Signal von Noise in Wallet-Aktivität trennen und typische Fehlinterpretationen vermeiden
- Eine persönliche Research-Routine mit täglichen, wöchentlichen und monatlichen Elementen aufbauen
- "Smart Money"-Kategorien (Nansen Labels, Arkham Entity-Labels) kritisch bewerten und nicht blind nachahmen
- Wallet-Clustering-Techniken als Werkzeug zur Identifikation von Team-/Whale-Bewegungen einsetzen
- Die ethischen Grenzen von Wallet-Tracking (Privacy, Doxxing-Gefahr) respektieren
- Eigene Alert-Systeme (Hal, Dune-Alerts, DeBank-Notifications) für Wallet-Ereignisse konfigurieren

### Erklärung

**Die zwei Anwendungsfelder**

Wallet-Tracking hat zwei fundamentale Anwendungen, die in der Praxis getrennt bleiben sollten.

**Anwendung 1: Portfolio-Tracking (eigene Wallet).**
Was habe ich, wo ist es, wie entwickelt es sich? Das sind die Fragen, die ein Portfolio-Tracker beantwortet. Für diese Anwendung sind Tools wie Zapper und DeBank optimiert — kostenlos, breit in der Protokoll-Abdeckung, fokussiert auf die eigene Position-Übersicht.

**Anwendung 2: Wallet-Investigation (fremde Adressen).**
Was machen andere Wallets? Welche Whales bauen Positionen auf? Wer steckt hinter einer mysteriösen Adresse? Das sind die Fragen, die Nansen und Arkham adressieren — kostenpflichtig in den starken Versionen, fokussiert auf Label-Qualität und Entity-Identifikation.

**Die zwei Anwendungen sind nicht austauschbar.** Wer Portfolio-Tracking macht, braucht keine Nansen-Subscription. Wer Wallet-Investigation machen will, kommt mit Zapper nicht weit.

**Zapper und DeBank: Portfolio-Tracking**

Beide Tools lösen dasselbe Grundproblem: du verbindest deine Wallet (oder gibst eine Adresse ein), und das Tool zeigt alle deine DeFi-Positionen konsolidiert. Das ist deutlich effizienter als manuell 10 Protokolle durchzuchecken.

**Zapper ([zapper.xyz](https://zapper.xyz)):**
- Kostenlos für das Tracken eigener Wallets
- Unterstützt über 150 Protokolle auf Ethereum und allen größeren L2s
- Zeigt: Tokens, LP-Positionen, Lending-Positions, Staking, NFTs
- Optional: Transaktionen direkt durchführen (Swaps, Zaps — aber das ist Frontend, nicht Tracking)

**DeBank ([debank.com](https://debank.com)):**
- Ebenfalls kostenlos, mit optionalem Pro-Plan
- Besonders stark in der Protokoll-Abdeckung (unterstützt sehr viele Chains, inklusive niche L2s)
- Zeigt zusätzlich: Historische Balance-Entwicklung, Gas-Ausgaben, NFT-Bestände
- Hat eine aktive Social-Feature-Schicht (User können andere User folgen)

**Die praktische Wahl:**
Beide funktionieren. Viele Nutzer verwenden beide parallel — einer zeigt manchmal Positionen, die der andere nicht sieht (weil die Protokoll-Integration unterschiedlich aktualisiert wird). Für eine einzige Wahl: DeBank hat typisch breiter Chain-Abdeckung, Zapper hat oft cleaneres UI. Test beide 5 Minuten und wähle intuitiv.

**Praktische Nutzung:**
- Einmal wöchentlich die eigene Wallet durchschauen
- Prüfen: stimmen die angezeigten Positionen mit deiner Erinnerung überein? Gibt es unerwartete Einträge (potenzielle Hack-Signale)?
- Performance grob einschätzen: wie hat sich das Portfolio seit letzter Woche entwickelt? Einzelne Protokolle besonders stark oder schwach?

**Warnung zur Genauigkeit:** Portfolio-Tracker haben Limits. Sie zeigen Token-Werte zu aktuellen Marktpreisen — bei illiquiden Tokens ist das oft eine Überschätzung (bei Verkauf entsteht Slippage). Sie verstehen nicht alle Protokoll-Positionen perfekt — manche komplexen Strategien werden falsch oder unvollständig angezeigt. Als grobe Übersicht exzellent, als präzise Accounting-Quelle nicht zuverlässig.

**Nansen: Institutional-Grade Wallet-Intelligence**

Nansen ([nansen.ai](https://nansen.ai)) ist das bekannteste professionelle Wallet-Tracking-Tool. Die Positionierung: institutional-grade Labels, tiefe Historie, aktive Smart-Money-Identifikation.

**Kern-Features:**

**Smart Money Labels.** Nansen hat ein Team, das kontinuierlich Wallets mit Qualifikations-Labels versieht. "Smart Money Trader" (konstante Profitabilität), "Whale" (große Bestände), "First Mover" (früh in erfolgreiche Tokens), "Deployer" (hat wichtige Contracts erstellt). Diese Labels ermöglichen es, Bewegungen von qualifizierten Wallets zu verfolgen — eine Art Alpha-Signal. **Wichtiger Vorbehalt:** Große Wallets operieren typischerweise unter anderen Risiko-Toleranzen, Zeithorizonten und Liquiditäts-Constraints als Retail-Nutzer. Ihre Aktionen sind Signale zur vertieften Untersuchung, keine automatischen Investment-Empfehlungen.

**Der zentrale Caveat — Whale-Aktivität als Markt-Signal, nicht als Investment-Strategie**

Bevor Smart-Money- und Whale-Tracking in der Praxis angewendet wird, ist ein konzeptueller Vorbehalt essentiell, der in der intuitiven Nutzung leicht übersehen wird: Große Wallets operieren nach Regeln, Zielen und Infrastrukturen, die sich fundamental von denen eines typischen Retail-Nutzers unterscheiden.

Whales hedgen ihre Positionen häufig über mehrere Protokolle, Chains und off-chain-Venues gleichzeitig — eine scheinbar direktionale Long-Position auf einer Chain kann durch eine entgegengesetzte Short-Position auf einer CEX oder in einem Derivate-Protokoll vollständig neutralisiert sein. Whales rebalancieren systematisch zwischen Assets und Protokollen, oft mit pre-definierten Schwellen und automatisierten Tools — eine große Einlage in ein Protokoll kann Teil einer Rebalancing-Aktion sein, die nichts mit direktionaler Marktmeinung zu tun hat. Whales arbitrieren Spreads zwischen Chains, Pools und Produkten in Geschwindigkeiten und Volumina, die Retail-Nutzer technisch, operativ und kostenbedingt nicht replizieren können — sie zahlen Gebühren, die bei kleinen Beträgen die Strategie sofort unrentabel machen würden. Und Whales positionieren sich oft strategisch für Airdrops, Governance-Events oder Protokoll-spezifische Mechanismen (Delegation, Staking-Lock-Ups), bei denen die Wallet-Aktivität ein Nebeneffekt einer ganz anderen Zielsetzung ist.

Die daraus folgende Disziplin: **Whale-Aktivität sollte als Markt-Signal interpretiert werden — als Hinweis auf strukturelle Dynamiken, die Aufmerksamkeit verdienen — aber nicht automatisch als Investment-Strategie, der man folgen sollte.** Das Muster "Whale X kauft Token Y, also kaufe ich Token Y" ignoriert systematisch alle oben genannten Strukturunterschiede und führt regelmäßig zu schlechten Ergebnissen: Der Retail-Nutzer kauft auf einem bereits von der Whale-Aktivität bewegten Preis, ohne die Hedge-Positionen zu haben, die der Whale schützen, ohne die Timing-Infrastruktur, die der Whale zum Exit nutzt, und ohne das Portfolio-Kontextwissen, das die Whale-Aktion im jeweiligen Gesamt-Portfolio erst sinnvoll macht. Die nützliche Nutzung von Whale-Daten ist "Whale-Aktivität als Trigger für eigene Due Diligence": das Signal führt zur vertieften Analyse des Protokolls, der Position passt man dann an eigene Strategie, Allokations-Limits und Risikoprofil an — oder man entscheidet sich bewusst dagegen.

**Token-God-Mode.** Für einen bestimmten Token zeigt Nansen alle großen Halter, ihre Akkumulations-Historie, Netto-Flows über Zeit. Wer kauft, wer verkauft, in welchen Mengen. Für Token-Research extrem wertvoll.

**Wallet Profiler.** Für eine spezifische Wallet: alle Token-Bestände, historische Performance, aktive Protokoll-Positionen, Chain-Verteilung. Plus: wer diese Wallet verfolgt, welche anderen Wallets ähnliches Verhalten zeigen.

**Pricing:**
- Pro-Plan: etwa $150/Monat (war historisch höher, ist aktuell reduziert)
- Enterprise: deutlich mehr, für Institutionen
- Kein substantieller Free-Tier — nur begrenzte Demo-Ansichten

**Die Pro-Plan-Frage:**
$150/Monat = $1800/Jahr. Für die meisten Retail-Nutzer: unverhältnismäßig. Nur sinnvoll, wenn (a) Portfolio signifikant ist (> $100K) UND (b) man wirklich aktiv Wallet-Tracking für Strategie-Entscheidungen einsetzt. Für passive Strategien: nicht wert.

**Arkham Intelligence: Der Wettbewerber**

Arkham ([arkhamintelligence.com](https://arkhamintelligence.com)) ist ein jüngerer Wettbewerber zu Nansen mit teils überlappenden, teils unterschiedlichen Features.

**Kern-Features:**

**Entity-basierte Analyse.** Arkham fokussiert stark auf die Identifikation realer Entitäten hinter Adressen — nicht nur "Smart Money", sondern konkret "Binance Wallet", "a16z Treasury", "Alameda-kontrolliert (historisch)". Die Entity-Zuordnung ist oft tiefer als bei Nansen.

**Intel Exchange.** Eine kontroverse Feature: Nutzer können "Bounties" aussetzen für die Doxxierung spezifischer Adressen. Andere User identifizieren die Entität gegen Geld-Belohnung. Das wirft ernsthafte Privacy-Fragen auf — und viele in der Krypto-Community sehen es als problematisch. Für legitime Investigations-Arbeit (z.B. Hack-Tracking) aber nützlich.

**Visualizer.** Gute UI für Flow-Analysen: zeige mir, wohin die Coins von Adresse X geflossen sind, über wie viele Hops. Für forensische Arbeit stark.

**Pricing:**
- Free-Tier: umfangreicher als bei Nansen, viele Basics inkl.
- Ultimate-Plan: etwa $60/Monat für individuelle Pro-Nutzer (Preise ändern sich)
- Business / Enterprise: deutlich höher

**Die Free-Tier bei Arkham:**
Für gelegentliche Wallet-Investigation oft ausreichend. Adress-Labels, grundlegende Balance- und Transaktions-Historie, Entity-Profile sind verfügbar. Die Premium-Features (viele Watch-Lists, Alerts, tiefere Analytics) sind Upgrades.

**Die Nansen-vs-Arkham-Wahl:**
Arkham hat die stärkere Free-Tier und ist besser für gelegentliche Nutzer. Nansen hat tiefere Smart-Money-Integration und ist besser für professionelle aktive Analyse. Für konservative Retail: Arkham-Free-Tier reicht fast immer.

**Die Intel-Exchange-Kontroverse:**
Arkham's Bounty-System ist ethisch umstritten. Kritiker sehen es als Anstiftung zum Doxxing. Befürworter sehen es als legitimes Tool für Forensik und Transparenz. Wer mit Arkham arbeitet, sollte die Diskussion kennen und sich bewusst positionieren. Die meisten Nutzer brauchen Intel Exchange nicht — die Standard-Analyse-Features sind unabhängig davon nutzbar.

**Signal vs. Noise in Wallet-Aktivität**

Wallet-Tracking birgt ein fundamentales Problem: Wallet-Aktivität ist fast immer interpretierbar, aber die Interpretation ist oft falsch. Drei typische Fehlinterpretationen:

**Fehlinterpretation 1: "Whale kauft, also wird Kurs steigen."**
Ein großer Kauf führt nicht automatisch zu Preis-Rally. Der Whale könnte verkaufen wollen in den kommenden Wochen (nach Recovery von Vor-Dump). Der Kauf könnte Hedge-Coverage für Short-Positions anderswo sein. Andere Whales könnten gleichzeitig verkaufen, die Nettowirkung ist neutral.

**Fehlinterpretation 2: "Diese Wallet hat vor 2 Jahren X 10xed, also folge ich ihr."**
Survivorship-Bias. Die "erfolgreichen" Wallets, die man in Dashboards sieht, sind die, die historisch gute Trades hatten — unklar ist, wie viele ähnliche Wallets es mit schlechter Performance gab. Copy-Trading basierend auf Past Performance hat oft schlechte Ergebnisse.

**Fehlinterpretation 3: "Wallet X hat Y gekauft, also muss es gut sein."**
Social Proof fallacy. Wenn eine bekannte Wallet etwas kauft, heißt das nicht, dass es eine gute Investition ist. Es heißt, dass eine einzelne Person (hinter der Wallet) zu diesem Zeitpunkt eine Entscheidung getroffen hat, mit ihren spezifischen Zielen, Risiko-Toleranzen und Informationsständen. Deine Situation ist anders.

**Die Meta-Regel:** Wallet-Aktivität ist eine Daten-Quelle, kein Signal. Beobachtung ohne Interpretation ist wertlos, Interpretation ohne Rahmen ist gefährlich.

**Was Wallet-Tracking tatsächlich nützlich macht:**

- **Verifikation von Narrativen.** Wenn jemand behauptet "Institutional Capital fließt jetzt in Ethereum", kann man mit Wallet-Tracking prüfen, ob tatsächlich große Wallets akkumulieren.
- **Früherkennung von Risiko-Events.** Wenn eine große Treasury-Wallet plötzlich aktiv wird, ist das ein Indikator für bevorstehende Markt-Bewegungen — nicht klares Signal, aber Alert für Aufmerksamkeit.
- **Research auf spezifische Tokens.** Wenn du überlegst in einen Token zu investieren, zeigt die Holders-Verteilung Struktur-Risiken (zu konzentriert? frische Launch-Wallets dominieren?).
- **Hack-Investigation.** Bei einem Exploit ist die Wallet-Tracking-Fähigkeit zentral, um zu verstehen, was passiert.

**Die persönliche Research-Routine**

Werkzeuge sind nichts wert ohne Routine. Eine disziplinierte Research-Praxis hat drei Ebenen: täglich, wöchentlich, monatlich.

**Täglich (5-10 Minuten):**
Minimaler Check für aktive DeFi-Nutzer.
- **Portfolio-Check** via Zapper oder DeBank: gibt es unerwartete Bewegungen? Haben Positionen wie erwartet performed?
- **News-Check:** Twitter, relevante Newsletter, DeFi-spezifische Medien. Fokus: gibt es Hacks, Protokoll-Probleme, Markt-stressende Events?
- **Bei Alert-Events:** DeFiLlama Hacks-Dashboard, Position-Check der potenziell betroffenen Protokolle.

Tägliche Routine ist nicht für alle nötig. Wer passive, konservative Strategien fährt, kommt mit wöchentlich aus.

**Wöchentlich (30-45 Minuten):**
Substanzielle Research-Session.
- **Portfolio-Analyse:** vollständige Zapper/DeBank-Review. Performance einzelner Positionen, Allokation-Drift.
- **DeFiLlama-Review:** Chain-TVL-Entwicklung, Bridge-Flows, relevante Protokolle. 10-15 Minuten.
- **Protokoll-News:** für die Protokolle, in denen du Positionen hast, offizielle Kanäle prüfen (Twitter, Discord, Governance-Foren).
- **Markt-Kontext:** breitere Markt-Dynamiken, Stablecoin-Flows, größere Narrative.

**Monatlich (1-2 Stunden):**
Tiefergehende Routine, die langfristige Disziplin etabliert.
- **Approval-Audit:** revoke.cash oder Etherscan Approval Checker, alle unnötigen Approvals zurückziehen.
- **Allokations-Review:** Vergleich aktueller Chain-Allokation mit Strategie-Vorgabe (Modul 14). Abweichungen identifizieren und entscheiden: rebalancen oder akzeptieren?
- **Neue Protokolle sondieren:** hat sich in den letzten 30 Tagen etwas getan, das deine Strategie beeinflussen könnte? Neue Lending-Märkte, neue L2s, neue Asset-Typen? Kurz recherchieren, nicht investieren — die 30-Tage-Wartezeit aus Modul 14 anwenden.
- **Notfall-Playbook-Update:** haben sich deine Positionen geändert? Entspricht das Playbook noch deiner Realität?
- **Dokumentation:** kurze Notiz zu den wichtigsten Entwicklungen. Über 12 Monate entsteht so ein wertvolles persönliches Research-Archiv.

**Quartalsweise (3-4 Stunden, einmal pro Quartal):**
Die strategische Ebene.
- **Performance-Review:** wie hat sich das Portfolio über 3 Monate entwickelt? Entspricht das den Erwartungen (7-8% Jahresrendite = 1,75-2% pro Quartal)? Wenn deutlich darüber: zu viel Risiko? Wenn deutlich darunter: zu konservativ oder spezifische Protokoll-Probleme?
- **Strategie-Check:** ist die Chain-Allokations-Strategie noch passend? Hat sich die Risiko-Toleranz geändert? Wurde eine Lektion aus den letzten 3 Monaten gelernt?
- **Tool-Stack-Review:** nutze ich die Tools effektiv? Gibt es bessere Alternativen? Ist irgendetwas überflüssig?

**Die psychologische Dimension**

Die größte Gefahr jeder Research-Routine ist **Über-Research**. Wer täglich stundenlang Daten studiert, erhöht nicht die Portfolio-Rendite — im Gegenteil. Studien aus dem TradFi-Bereich zeigen konsistent: hohe Trading-Aktivität korreliert mit schlechterer Performance.

Die konservative Routine ist minimal und fokussiert:
- Täglich: 0-10 Minuten
- Wöchentlich: 30-45 Minuten
- Monatlich: 1-2 Stunden
- Quartalsweise: 3-4 Stunden

**Total: etwa 6-8 Stunden Research pro Monat.** Das ist für eine substantielle DeFi-Strategie ausreichend. Wer deutlich mehr investiert, sollte sich fragen: baue ich gerade Expertise auf (OK), oder verhindere ich durch ständige Analyse die disziplinierte Umsetzung der bestehenden Strategie (nicht OK)?

**Die Werkzeug-Hierarchie in der Praxis**

Nach allen 5 Lektionen dieses Moduls: die realistische Verwendungs-Hierarchie in absteigender Häufigkeit.

1. **DeFiLlama** (wöchentlich, primäres Tool): Standard-Fragen, aggregierte Übersichten, Chain- und Protokoll-Metriken.
2. **Etherscan** (nach Bedarf, investigativ): Verifikation, Transaktions-Analyse, Approval-Management.
3. **Portfolio-Tracker Zapper/DeBank** (wöchentlich): eigene Positionen im Überblick.
4. **Dune** (monatlich): Spezifische Fragen, die andere Tools nicht beantworten.
5. **Arkham-Free oder Nansen-Pro** (bei Bedarf): Wallet-Investigation, Entity-Research, Hack-Forensik.

Diese Hierarchie ist für konservative Retail-Strategien. Aktive Trader und Analysten haben andere Profile. Wichtig ist: die Hierarchie bewusst zu gestalten, nicht jedem neuen Tool nachzujagen.

### Folien-Zusammenfassung

**[Slide 1] — Titel**
Wallet-Tracking und die persönliche Research-Routine

**[Slide 2] — Die zwei Anwendungsfelder**
Portfolio-Tracking (eigene Wallet) vs. Wallet-Investigation (fremde Wallets)
Unterschiedliche Tools für unterschiedliche Zwecke

**[Slide 3] — Zapper und DeBank**
Portfolio-Tracker, kostenlos
Konsolidierte Übersicht aller DeFi-Positionen
Wöchentliche Nutzung für Überblick und Anomalien-Check

**[Slide 4] — Nansen**
Smart Money Labels, Institutional-Grade
$150/Monat, meist nur für aktive Analysten mit >$100K Portfolio sinnvoll
Kein substantieller Free-Tier

**[Slide 5] — Arkham Intelligence**
Entity-basierte Analyse, stärkere Free-Tier
$60/Monat Ultimate, gratis für Basics
Intel Exchange kontrovers, aber optional

**[Slide 6] — Signal vs. Noise**
Whale-Aktivität ≠ Handlungs-Signal
Survivorship-Bias bei Copy-Trading
Tracking als Beobachtung, nicht als Strategie-Grundlage

**[Slide 7] — Die persönliche Research-Routine**
Täglich 5-10 Min: Portfolio, News
Wöchentlich 30-45 Min: DeFiLlama, Protokoll-News
Monatlich 1-2h: Approvals, Allokations-Review, neue Protokolle
Quartalsweise 3-4h: Performance, Strategie, Tool-Stack

**[Slide 8] — Die Werkzeug-Hierarchie**
1. DeFiLlama (primär, wöchentlich)
2. Etherscan (investigativ, bei Bedarf)
3. Zapper/DeBank (Portfolio, wöchentlich)
4. Dune (monatlich, Spezialfragen)
5. Arkham/Nansen (Wallet-Investigation bei Bedarf)

### Sprechertext

**[Slide 1]** Die fünfte und letzte Lektion von Modul 15 verbindet das Werkzeug-Lernen mit der Alltags-Praxis. Nach DeFiLlama, Etherscan und Dune kommen jetzt die Wallet-Tracking-Tools und — entscheidend — die Zusammenführung in eine persönliche Research-Routine, die nachhaltig durchgehalten werden kann.

**[Slide 2]** Wallet-Tracking hat zwei fundamentale Anwendungsfelder, die getrennt bleiben sollten. Portfolio-Tracking — eigene Wallet: was habe ich, wo ist es, wie entwickelt es sich? Dafür sind Zapper und DeBank optimiert, kostenlos, alltagstauglich. Wallet-Investigation — fremde Adressen: was machen andere, welche Whales bauen auf, wer steckt dahinter? Dafür sind Nansen und Arkham da, mit deutlich stärkerem Label-System und Entity-Fokus, aber in der starken Version kostenpflichtig. Die zwei Anwendungen sind nicht austauschbar.

**[Slide 3]** Zapper und DeBank lösen dasselbe Grundproblem: du verbindest deine Wallet oder gibst eine Adresse ein, und siehst alle DeFi-Positionen konsolidiert. Das ist effizienter, als manuell durch zehn Protokolle zu klicken. Beide sind kostenlos, unterstützen die großen Chains, zeigen Tokens, LP-Positionen, Lending, Staking und oft NFTs. DeBank ist tendenziell breiter in der Chain-Abdeckung, Zapper oft sauberer in der UI. Viele Nutzer verwenden beide parallel. Die Routine: einmal wöchentlich die eigene Wallet durchsehen. Unerwartete Einträge sind potenzielle Hack-Signale.

**[Slide 4]** Nansen ist der Institutional-Grade-Standard. Smart Money Labels — ein Team identifiziert kontinuierlich qualifizierte Wallets — ermöglichen gezielte Alpha-Verfolgung. Token God Mode zeigt für einen Token alle großen Halter mit Akkumulations-Historie. Wallet Profiler liefert vollständige Historie einer Adresse. Kosten: etwa 150 Dollar pro Monat für Pro. Kein substantieller Free-Tier. Die ehrliche Einschätzung: nur sinnvoll für Portfolios ab 100.000 Dollar mit aktivem Interesse am Wallet-Tracking. Für passive konservative Strategien unverhältnismäßig.

**[Slide 5]** Arkham ist der jüngere Wettbewerber. Fokus auf Entity-Zuordnung — nicht nur "Smart Money", sondern konkret "Binance Wallet", "a16z Treasury". Deutlich stärkerer Free-Tier als Nansen: grundlegende Labels, Balance-Historie, Entity-Profile kostenlos. Pro-Plan Ultimate etwa 60 Dollar pro Monat. Die Intel Exchange — ein Bounty-System für Doxxing — ist ethisch kontrovers, aber optional. Die meisten Nutzer brauchen sie nicht. Für konservative Retail-Nutzer: Arkhams Free-Tier ist meist ausreichend, wenn gelegentlich Wallet-Investigation gemacht wird.

**[Slide 6]** Wallet-Aktivität ist eine Daten-Quelle, kein Signal. Drei typische Fehlinterpretationen. Erstens: "Whale kauft, also steigt der Kurs." Großer Kauf führt nicht automatisch zu Rally. Es gibt viele Gründe für Käufe, viele andere Akteure wirken gleichzeitig. Zweitens: "Wallet X hat vor zwei Jahren zehnfach performed, also folge ich ihr." Survivorship-Bias — wir sehen nur die erfolgreichen Wallets, nicht die vielen, die schlecht performten mit ähnlicher Strategie. Drittens: "Wallet X kauft Y, also muss es gut sein." Social Proof Fallacy — eine andere Person hat eine andere Situation, andere Ziele, andere Informationen. Die Meta-Regel: Beobachtung ohne Interpretation ist wertlos, Interpretation ohne Rahmen ist gefährlich.

**[Slide 7]** Die persönliche Research-Routine hat vier Ebenen. Täglich 5 bis 10 Minuten: Portfolio-Check per Zapper oder DeBank, kurzer News-Scan. Nur für aktive Nutzer nötig. Wöchentlich 30 bis 45 Minuten: substanzielle Session mit Portfolio-Review, DeFiLlama-Durchgang, Protokoll-News. Das ist die Kern-Routine. Monatlich 1 bis 2 Stunden: Approval-Audit, Allokations-Review gegen Strategie, neue Protokolle sondieren mit der 30-Tage-Wartezeit. Notfall-Playbook aktualisieren. Quartalsweise 3 bis 4 Stunden: Performance-Review gegen 7-8-Prozent-Ziel, Strategie-Check, Tool-Stack-Effizienz. Total etwa 6 bis 8 Stunden pro Monat — ausreichend für substanzielle DeFi-Strategie, nicht übertrieben.

**[Slide 8]** Die finale Werkzeug-Hierarchie für konservative Retail-Strategien. Platz eins: DeFiLlama als primäres wöchentliches Tool. Platz zwei: Etherscan investigativ bei Bedarf. Platz drei: Zapper oder DeBank wöchentlich für Portfolio-Überblick. Platz vier: Dune monatlich für Spezialfragen. Platz fünf: Arkham im Free-Tier oder Nansen mit Pro bei aktiver Wallet-Investigations-Nutzung. Diese Hierarchie bewusst zu gestalten, statt jedem neuen Tool nachzujagen, ist selbst eine Disziplin. Die meisten Retail-Verluste entstehen nicht durch fehlende Daten, sondern durch fehlende disziplinierte Nutzung der vorhandenen. Tools sind Mittel, nicht Selbstzweck. In Modul 16 schauen wir, wie diese Analyse-Fähigkeiten in einem Protocol Analysis Framework konkret angewendet werden — die systematische Prüfung eines neuen Protokolls vor Investment.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Zwei-Spalten-Diagramm: links Portfolio-Tracking (eigene Wallet, Hausschloss-Icon), rechts Wallet-Investigation (fremde Wallet, Lupe-Icon). Darunter die passenden Tools jeweils.

**[Slide 3]** **SCREENSHOT SUGGESTION:** Zapper-Portfolio-View (zapper.xyz) mit einer Beispiel-Wallet, die mehrere DeFi-Positionen zeigt. Demonstriert die Konsolidierungs-Funktion.

**[Slide 4]** **SCREENSHOT SUGGESTION:** Nansen-Smart-Money-Dashboard mit Label-System sichtbar. Zeigt die Pro-Features visuell.

**[Slide 5]** **SCREENSHOT SUGGESTION:** Arkham Intelligence-Interface mit Entity-Zuordnung einer bekannten Wallet (z.B. Binance Cold Wallet).

**[Slide 6]** Drei-Warnungen-Tafel: Whale-Kauf-Fallacy, Survivorship-Bias, Social-Proof-Fallacy. Jeweils mit Icon und Ein-Satz-Warnung.

**[Slide 7]** Vier-Ebenen-Pyramide: Täglich (Basis, klein), Wöchentlich (größer), Monatlich (Mitte), Quartalsweise (Spitze). Zeiten jeweils angegeben.

**[Slide 8]** Die fünf Tools als priorisierte Liste mit Häufigkeits-Indikatoren. Visuelle Hierarchie als finale Referenz.

### Übung

**Aufgabe: Eine eigene Research-Routine entwerfen und 4 Wochen testen**

**Teil 1 — Routine-Design (30 Min):**

Erstelle eine persönliche Research-Routine basierend auf deiner aktuellen DeFi-Situation. Beantworte:

**Täglich (falls zutreffend):**
- Wie viele Minuten? (Empfehlung: 0-10)
- Welche Tools? (Zapper/DeBank, Twitter-Liste, DeFiLlama Hacks)
- Welche Trigger würden Ausnahmen sein (Hack-News, große Preis-Bewegung)?

**Wöchentlich:**
- Welcher Wochentag und welche Uhrzeit? (Feste Termine helfen bei Disziplin)
- Welche Tools? In welcher Reihenfolge?
- Welche konkreten Fragen beantwortest du?

**Monatlich:**
- Welcher Tag im Monat?
- Welche Schritte (Approval-Audit, Allokations-Review, etc.)?
- Wie dokumentierst du (Notizen, Spreadsheet, Screenshots)?

**Quartalsweise:**
- Welche Quartals-Tage?
- Welche strategischen Fragen?
- Wie triggerst du Anpassungen an der Strategie?

**Teil 2 — 4-Wochen-Test:**

Setze die Routine für 4 Wochen um. Dokumentiere:
- Wie diszipliniert konntest du sie einhalten?
- Welche Teile haben sich bewährt, welche nicht?
- Welche Informationen hast du gewonnen, die zu Handlungs-Entscheidungen geführt haben?
- Welche Zeit war "Busy Work" ohne echten Mehrwert?

**Teil 3 — Anpassung:**
Basierend auf dem Test: überarbeite die Routine. Stärkere Konzentration auf die Elemente, die echten Wert liefern. Reduktion oder Elimination der Elemente, die nur Zeit kosten.

**Deliverable:** Finale Research-Routine als persönliches Dokument (1-2 Seiten), das du ausdrucken und jederzeit referenzieren kannst. Plus Reflexion (300-500 Wörter): was hat dich überrascht? Was wurde dir klar über deine eigene Analyse-Disziplin?

### Quiz

**Frage 1:** Du verfolgst auf Nansen eine "Smart Money"-Wallet, die in den letzten 30 Tagen große Positionen in einem Protokoll aufgebaut hat, das du selbst überlegst zu nutzen. Sollst du ihrem Beispiel folgen?

<details>
<summary>Antwort anzeigen</summary>

Die Versuchung ist intuitiv stark: eine qualifizierte Wallet mit Track Record baut Position auf, also ist das Protokoll "bestätigt". Aber die Logik hat mehrere Probleme, die eine differenziertere Antwort erfordern. **Problem 1: Was bedeutet "Smart Money"-Label genau?** Nansen's Smart-Money-Labels basieren auf historischer Performance — Wallets, die in der Vergangenheit überdurchschnittlich profitabel waren. Das ist kein zukunftsgarantiertes Signal, sondern Vergangenheits-Analyse. Die Selektion ist Post-Hoc: aus allen Wallets werden die identifiziert, die gut performed haben. Wie viele andere Wallets mit ähnlichen Strategien performed schlecht? Das wissen wir nicht — sie erhalten keine Smart-Money-Labels. Das ist der klassische Survivorship-Bias. **Problem 2: Ihre Ziele sind nicht deine Ziele.** Eine Smart Money-Wallet kann viele Gründe haben, ein Protokoll zu nutzen. (a) Yield-Farming als Teil einer großen diversifizierten Strategie. Bei $50 Millionen Portfolio ist eine $5-Millionen-Position bei 10% APY gut für absolute Zahlen, aber 10% des Portfolios in einem einzelnen Protokoll wäre für dich eine konzentrierte Wette. (b) Early-Access-Position für erwarteten Airdrop. Die Whale mag das Protokoll nicht per se, sondern positioniert sich für kommende Token-Ausschüttung. Wenn du nicht weißt, was erwartet wird, hast du nicht denselben Informationsstand. (c) Hedge gegen andere Positionen. Die Smart-Money-Wallet könnte gegen etwas anderes absichern, was du nicht hast. Das Protokoll passt in ihre Portfolio-Struktur, nicht in deine. (d) Experimenteller Test. Profis testen oft neue Protokolle mit kleinen Positionen, die in Dashboards als "große Aktivität" erscheinen, aber im Kontext ihres Portfolios klein sind. **Problem 3: Timing-Differenz.** Selbst wenn der Smart-Money-Trade ein gutes Investment ist — wann du einsteigst ist entscheidend. Wenn die Whale vor 30 Tagen die Position aufbaute und der Kurs seitdem 40% gestiegen ist, kaufst du auf einem völlig anderen Niveau. Die Whale's Thesis mag durchgespielt sein. **Problem 4: Der Halt-Horizon ist unbekannt.** Wenn die Whale in 2 Wochen verkauft, profitiert sie vom Preisanstieg, den ihr eigener Einstieg mitbewegt. Du, der später einsteigst, profitierst nicht — und kaufst möglicherweise in die Distribution, wenn sie verkauft. **Problem 5: Deine eigene Due Diligence wird nicht ersetzt.** Selbst wenn alle obigen Probleme neutral sind, ersetzt Copy-Following nicht die Prüfung des Protokolls selbst. Ist das Protokoll auditiert? Wie ist die Admin-Struktur? Was sind die Risiken? Das sind Fragen, die du selbst beantworten musst, unabhängig davon, wer sonst noch eingestiegen ist. **Die sinnvolle Nutzung von Smart-Money-Signalen:** Statt "Smart Money kauft, also kaufe ich" ist der nützliche Framework: "Smart Money kauft — das ist ein Trigger für eigene tiefere Analyse." Das heißt: (a) Das Signal motiviert dich, das Protokoll gründlich zu recherchieren. (b) Du führst deine eigene Due Diligence durch (Audits, Team, Tokenomics, Risk-Struktur). (c) Du bewertest, ob die Position in deine Strategie passt (Allokations-Limit, Risiko-Profil). (d) Erst wenn beide Prüfungen positiv sind, entscheidest du für Entry — mit deinen eigenen Parametern, nicht die der Whale. **Das Timing-spezifische Muster:** Gerade bei Smart-Money-Tracking ist zusätzliche Vorsicht geboten, weil das Signal öffentlich ist. Tausende andere folgen derselben Logik. Das Ergebnis: Positions werden in den Stunden/Tagen nach der Whale-Aktion teurer. Du kaufst zu einem schlechteren Preis als die Whale. Die Alpha ist vermutlich ausgepreist. **Die konservative Handlungs-Empfehlung:** Behandle Smart-Money-Signale als Aufmerksamkeits-Alerts, nicht als Aktions-Signale. "Eine qualifizierte Wallet ist in diesem Protokoll aktiv" ist Information, die es lohnt, einer tieferen Prüfung zu unterziehen. Aber die Entscheidung selbst basiert auf deiner Analyse, deiner Strategie, deinem Risikoprofil. Wenn nach eigener Prüfung das Protokoll für dich passt, und die Timing und Allokation deinem Plan entsprechen, dann kannst du positiv entscheiden. Nicht vor, sondern nach der eigenen Analyse. **Das übergeordnete Prinzip:** In Finance ist der Schlüssel zu langfristigem Erfolg nicht Information-Advantage (die gibt es in öffentlichen Daten selten), sondern Disziplin in der Umsetzung der eigenen Strategie. Wer Disziplin durch Copy-Following ersetzt, optimiert auf die falsche Metrik. Die Whales haben ihren eigenen Vorteil — Kapital, Kontakte, Tools, Team. Retail hat den Vorteil der Flexibilität und der Nicht-Abhängigkeit von Performance-Druck. Beide Vorteile sind real, aber sie führen zu unterschiedlichen optimalen Strategien. Copy-Following ignoriert die eigenen Vorteile und versucht, die Whale-Vorteile zu imitieren — was typisch schlecht ausgeht.

</details>

**Frage 2:** Du versuchst, eine wöchentliche Research-Routine zu etablieren, aber nach 4 Wochen bist du noch nicht konsistent dabei. Was sind die häufigsten Gründe, warum Research-Routinen scheitern, und wie würdest du die Routine anpassen?

<details>
<summary>Antwort anzeigen</summary>

Nicht-konsistente Research-Routinen sind die Regel, nicht die Ausnahme — selbst bei sehr erfahrenen DeFi-Nutzern. Die Gründe sind vorhersagbar und mit Anpassungen lösbar. **Grund 1: Zu ambitioniert dimensioniert.** Die häufigste Ursache. Jemand plant "2 Stunden pro Woche intensive Research" und schafft das für zwei Wochen. Dann kommt eine arbeitsreiche Periode, die Routine wird ausgelassen, dann länger ausgelassen, bis sie komplett zusammenbricht. **Lösung: Minimum Viable Routine.** Statt 2 Stunden Idealfall, definiere 15 Minuten Mindestfall. Was sind die absolut kritischen 15 Minuten? Typisch: Portfolio-Check plus ein DeFiLlama-Scan auf die wichtigsten Protokolle. Wenn mehr Zeit da ist, erweitere. Wenn weniger, die 15 Minuten schaffen. Konsistenz bei 15 Minuten ist besser als Exzellenz einmalig, Aufhören dauerhaft. **Grund 2: Fehlender fester Termin.** "Irgendwann diese Woche" führt fast immer zu "gar nicht diese Woche". Ohne festen Termin konkurriert Research mit allem anderen und verliert. **Lösung: Festes Slot im Kalender.** Sonntag-Abend 19:00 für 45 Minuten, oder Samstag-Morgen 9:00. Den Slot im Kalender blockieren. Andere Personen behandeln das als Termin — du selbst solltest das auch tun. Mit Zeit wird es Gewohnheit, wie Sport oder Lesen. **Grund 3: Unklarer Mehrwert.** Wenn man nach 4 Wochen Routine keinen konkreten Nutzen sieht — keine bessere Entscheidung, kein vermiedenes Problem, keine neuen Insights — sinkt die Motivation. Research wird zur Pflichtübung. **Lösung: Dokumentation der Entscheidungen.** Führe ein Journal: welche Entscheidungen habe ich in den letzten 4 Wochen getroffen? Welche basierten auf Research, welche hätten ohne Research getroffen werden können? Nach 3 Monaten siehst du konkret: waren die Research-basierten Entscheidungen besser? Das macht den Wert sichtbar. **Grund 4: Tool-Overload.** Wer jedes Mal fünf verschiedene Tools öffnet, viele Dashboards checkt, breite News-Feeds scannt, erschöpft sich schnell. Die Routine wird unpraktikabel. **Lösung: Fokussierter Tool-Stack.** Reduziere auf 2-3 Kern-Tools: DeFiLlama + Zapper + eine spezifische Info-Quelle (z.B. eine ausgewählte Twitter-Liste). Alles andere ist optional und nur bei spezifischen Fragen. **Grund 5: Perfektionismus.** Wer glaubt, die Routine müsse "vollständig" sein — alle Protokolle scannen, jede Metrik prüfen — wird paralysiert. Eine 80%-gute Routine, die gemacht wird, schlägt eine 100%-Ideal-Routine, die nur geplant wird. **Lösung: Expliziter Scope.** Liste die 3-5 Dinge auf, die in der wöchentlichen Session passieren müssen. Alles andere ist Bonus. Typische Must-haves: (a) Portfolio-Check, (b) DeFiLlama-Scan der eigenen Protokolle, (c) News-Scan für Hacks/Probleme. Das reicht für konservative Strategien oft vollständig. **Grund 6: Research ohne Handlungs-Konsequenz.** Wenn die Routine nur Beobachtung ist, ohne je zu Entscheidungen zu führen, fühlt sie sich sinnlos an. **Lösung: Entscheidungs-getriggerte Routine.** Definiere vorab, welche Metriken welche Aktionen triggern. "Wenn mein Aave-Health-Factor unter 2,0 fällt → reduzieren. Wenn eine Bridge in meinem Portfolio gehackt wird → Notfall-Playbook. Wenn Ethereum-TVL um mehr als 20% fällt → Allokations-Review." So wird Research zur Entscheidungs-Vorbereitung, nicht zum Selbstzweck. **Die überarbeitete Research-Routine (für jemanden, der nach 4 Wochen noch nicht konsistent ist):** **Minimum Viable Weekly (15 Minuten, feste Zeit):** 1. Portfolio-Check (5 Min): Zapper oder DeBank. Unerwartete Einträge? Grobe Performance? 2. DeFiLlama-Scan (5 Min): Top-Protokolle in eigenem Portfolio prüfen. TVL stabil? News? 3. Hacks-Check (3 Min): DeFiLlama Hacks-Dashboard. Neue Events in den letzten 7 Tagen? 4. Notiz (2 Min): 2-3 Zeilen in Journal. Wichtigstes Learning, offene Frage für nächste Woche. **Conditional Extensions (wenn Zeit):** Wenn Portfolio Änderungen nötig: Approval-Check. Wenn News-Event: tiefere Protokoll-Research. Wenn bei Research-Notiz wiederkehrende Frage: Dune-Dashboard suchen. **Die monatliche Erweiterung:** Einmal im Monat, 1 Stunde, zusätzlich: Approval-Audit, Allokations-Review gegen Strategie, Notfall-Playbook-Check. **Die Erfolgs-Metrik:** Nach 3 Monaten prüfen: wie oft wurde die 15-Minuten-Routine eingehalten? 90%+: exzellent. 70-90%: gut, fortfahren. 50-70%: Routine weiter reduzieren oder Zeit-Slot ändern. Unter 50%: die Routine passt strukturell nicht zum Leben — radikal vereinfachen oder Research an andere Zeiten binden (z.B. einmal pro Quartal intensiv, statt wöchentlich schwach). **Die Meta-Lehre:** Research-Disziplin ist wichtiger als Research-Tiefe. Eine konsistente, einfache Routine, die Jahre durchgehalten wird, produziert deutlich besseren Effekt als eine aufwändige, die nach Monaten zusammenbricht. Wie bei Sport: Konsistenz schlägt Intensität. **Die psychologische Dimension:** Scheitern in Routine-Etablierung ist persönlich. Perfektion ist nicht das Ziel — funktionale Konsistenz ist. Wer nach 4 Wochen nicht durchhält, hat nicht versagt — die Routine war falsch dimensioniert. Das ist ein iterativer Prozess. Jede Iteration bringt dich näher an die Routine, die für dich wirklich funktioniert.

</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 8 Folien: Titel → Nansen Smart Money → Arkham Wallet-Clustering → Zapper Portfolio-Tracker → DeBank Multi-Chain → Wöchentliche Research-Routine → Tool-Vergleich → Pitfalls
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — Tool-Screenshots Nansen/Arkham/Zapper/DeBank, Research-Routine-Flowchart, Smart-Money-Follow-Pitfall-Grafik, wöchentliche Check-Liste

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 15.6 — Building an Analytics Dashboard

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Ein eigenes Analytics-Dashboard aus den fünf Kern-Tools (Dune, DeFiLlama, Nansen, Arkham, TokenTerminal) konzeptionell entwerfen
- Die Tool-Rollen (Rohdaten, Aggregation, Entity-Intelligence, Wallet-Clustering, Fundamental-Metriken) klar zuordnen und überschneidungsfrei kombinieren
- KPIs für ein spezifisches Protokoll oder eine Position-Klasse systematisch definieren (TVL, Volume, Real Yield, User-Retention, Revenue-Multiplikator)
- Refresh-Logik und Alert-Schwellen für ein Monitoring-Dashboard praxisnah aufsetzen
- Ein einfaches Personal-Research-Dashboard (1-Seiten-Layout) für die eigene Portfolio-Überwachung praktisch aufbauen
- Typische Dashboard-Fehler (Metriken-Overload, unklare Baselines, fehlende Handlungs-Schwellen) erkennen und vermeiden

### Erklärung

Die ersten fünf Lektionen haben einzelne Tools im Detail behandelt — ihre Stärken, ihre Grenzen, ihre richtigen Fragen. In der Praxis stellt sich aber eine andere Frage: **Wie integrierst du diese Tools zu einem funktionierenden Monitoring-System?** Das ist die Dashboard-Frage, und sie ist die eigentliche Kunst der On-Chain-Analyse für fortgeschrittene Retail-Nutzer.

Ein Dashboard ist keine Liste aller verfügbaren Metriken. Ein Dashboard ist eine **bewusste Auswahl von Indikatoren**, die auf die spezifische Frage, die du beantworten willst, zugeschnitten sind. Die häufigste Fehldimension beim Dashboard-Bau ist Metriken-Overload: man stopft alles hinein, was interessant scheint, und das Ergebnis ist ein Cockpit, das man nicht lesen kann. Ein professionelles Dashboard hat drei Eigenschaften, die es nützlich machen: klare Fragen-Zuordnung, bewusste Metrik-Auswahl und definierte Handlungs-Schwellen.

**Die Tool-Rollen im integrierten Dashboard:**

Jedes der fünf Tools hat eine spezifische Rolle, die es besser erfüllt als die anderen. Wer sie überschneidungsfrei kombiniert, vermeidet Redundanz und erhöht die Dashboard-Effizienz.

**Schnellreferenz — welches Tool für welche Frage:**

- **DefiLlama** → TVL und Protokoll-Metriken (Wie groß? Wie verteilt? Wie entwickelt sich das Protokoll im Wettbewerb?)
- **TokenTerminal** → Protokoll-Revenue und Valuation-Metriken (Wie gesund ist das Protokoll fundamental? P/S-Ratios, Real Yield, Fee-Einnahmen?)
- **Nansen** → Wallet-Tracking und Smart-Money-Identifikation (Wer bewegt Kapital? Welche qualifizierten Wallets sind wo aktiv?)
- **Dune** → Custom Analytics Dashboards (Spezifische Fragen, die kein Standard-Tool abdeckt, via SQL-Queries)
- **Arkham** → Wallet-Clustering und Entity-Zuordnung (Welche Wallets gehören zur selben Entität? Welche reale Entität steht hinter einer Adresse?)
- **Etherscan / Block-Explorer** → Raw-Daten-Verifikation (Was steht tatsächlich on-chain? Approvals, Contract-Verifikation, Transaktions-Details)
- **Zapper / DeBank** → Eigene Portfolio-Übersicht (Was habe ich, wo, in welchem Zustand?)

Die folgende detaillierte Ausführung vertieft jedes der fünf Kern-Tools:

- **DeFiLlama** ist das **Aggregations-Layer**. Seine Stärke ist protokoll-übergreifende Vergleichbarkeit: TVL, Yields, Chains, Bridges, Hacks. Nutze DeFiLlama für die "großen Bewegungen" — wie steht ein Protokoll im Wettbewerb, wo fließen Kapital-Ströme, welche Chain gewinnt.
- **Dune Analytics** ist das **Custom-Query-Layer**. Seine Stärke ist die Beantwortung spezifischer Fragen, die Standard-Dashboards nicht abdecken: "Wie viele einzelne Wallets haben in den letzten 30 Tagen auf Aave V3 ETH-Ethereum eine Health Factor unter 1,5 gehabt?" Dune gibt Antworten auf das, was du selbst fragst.
- **Nansen** ist das **Entity-Intelligence-Layer**. Seine Stärke sind gelabelte Wallets — Smart Money, Institutions, Funds. Nutze Nansen für die Frage "Wer bewegt Kapital?" — nicht für "Wie viel Kapital bewegt sich?"
- **Arkham** ist das **Wallet-Clustering-Layer**. Seine Stärke ist die Identifizierung verbundener Adressen, die hinter einer Entität stehen. Nutze Arkham, um zu verstehen, ob mehrere Wallets kollektiv agieren (z.B. eine Institution mit 20 Operational-Wallets).
- **TokenTerminal** ist das **Fundamental-Daten-Layer**. Seine Stärke sind Revenue, Fees, P/S-Ratios, Real Yield — Kennzahlen im klassischen Finance-Sinn. Nutze TokenTerminal für die Frage "Ist dieses Protokoll wirtschaftlich gesund oder nur Emissions-getrieben?"

**Das analytische Drei-Layer-Modell — vom Framework zur Dashboard-Architektur**

Die drei Analyse-Ebenen aus Lektion 15.1 (Protokoll-Metriken, Markt-Metriken, Wallet-Aktivität) übersetzen sich direkt in eine praktische Dashboard-Architektur. Ein belastbares Analytics-Dashboard kombiniert typischerweise drei Layer, die zusammen das vollständige Bild ergeben:

- **Layer 1 — Protokoll-Metriken (Protocol metrics):** TVL, Fees, Revenue, Liquidität, Utilization. Die Gesundheits- und Nutzungs-Indikatoren der einzelnen Protokolle, in denen man Positionen hält. Primäre Tools: DeFiLlama, TokenTerminal.
- **Layer 2 — Markt-Flüsse (Market flows):** Handelsvolumen, Bridge-Aktivität, Token-Flows zwischen Chains, Stablecoin-Verschiebungen. Die Makro-Dynamik des Ökosystems, die Kontext für einzelne Protokoll-Entscheidungen liefert. Primäre Tools: DeFiLlama (Bridges/Chains/Stablecoins), Dune für spezifische Flow-Queries.
- **Layer 3 — Wallet-Intelligence (Wallet intelligence):** Bewegungen großer Halter, Smart-Money-Aktivität, Treasury-Bewegungen, Konzentrations-Veränderungen. Die Akteurs-Ebene — wer bewegt, wohin, warum. Primäre Tools: Nansen, Arkham, Etherscan für spezifische Adress-Recherche.

Diese drei Layer entsprechen nicht zufällig dem Analyse-Framework aus Lektion 15.1 — sie sind dessen operationelle Umsetzung. Ein Dashboard, das nur Layer 1 zeigt, ist eine Protokoll-Überwachung. Ein Dashboard, das nur Layer 3 zeigt, ist Whale-Watching. Erst die Integration aller drei Layer ergibt eine vollständige analytische Sicht. Das folgende frequenz-basierte Modell beschreibt, wie diese drei Layer in der Praxis über verschiedene Review-Rhythmen organisiert werden — welcher Layer täglich geprüft wird, welcher wöchentlich, welcher monatlich.

**Das Drei-Layer-Dashboard-Modell:**

Ein vernünftiges Personal-Dashboard hat drei Layer, jedes mit eigener Fragestellung:

**Layer 1 — Portfolio-Health (täglich/wöchentlich):** Was ist der aktuelle Zustand meiner Positionen? Health Factors, aktuelle Werte, Approvals, unerwartete Transaktionen. Tools: Zapper/DeBank für Portfolio-View, Etherscan für Transaktions-Log, Nansen für Wallet-Aktivität.

**Layer 2 — Protokoll-Monitoring (wöchentlich):** Wie gesund sind die Protokolle, in denen ich Positionen habe? TVL-Trend, Yield-Entwicklung, Smart-Money-Flows, Fundamental-Daten. Tools: DeFiLlama für TVL/Yields, TokenTerminal für Fundamentals, Nansen für Entity-Aktivität.

**Layer 3 — Markt-Kontext (monatlich):** Wie bewegt sich der gesamte DeFi-Markt? Chain-Allokations-Shifts, kategorie-spezifische Trends, neue Protokolle. Tools: DeFiLlama (aggregiert), Dune (eigene Queries für Spezialfragen).

**Metrik-Auswahl: Die KPI-Hierarchie.**

Für jede Position oder jedes Protokoll sollten maximal 5-7 KPIs definiert sein. Die typische Hierarchie:

- **Vital-KPI (muss überwacht werden, Alert bei Schwelle):** Health Factor für Lending, Peg für Stables/LSTs, TVL-Veränderung über 7 Tage.
- **Performance-KPI (regelmäßig beobachtet):** Realisierte APR, Yield-Trend, Position-Gewichtung im Portfolio.
- **Kontext-KPI (gelegentlich geprüft):** Protokoll-TVL im Markt-Kontext, Smart-Money-Inflow, Revenue-Multiplikator.

Jede Metrik braucht **zwei Begleitinformationen**: eine Baseline (was ist normal?) und eine Handlungs-Schwelle (was triggert Aktion?). Ohne diese zwei Informationen ist die Metrik nur Zahl, nicht Signal. Ein Health Factor von 1,8 ist nur sinnvoll, wenn du weißt, dass dein Ziel-Bereich 2,0-2,5 ist und dein Alert-Schwelle bei 1,5 liegt.

**Refresh-Logik:**

Nicht jede Metrik muss gleich oft geprüft werden. Ein grobes Muster:

- **Täglich (automatisiert, Alert-basiert):** Health Factors, Peg-Werte für große Positionen, kritische Protokoll-News (Twitter-Lists, DeFiLlama Hacks-Feed).
- **Wöchentlich (manueller Scan, 15-30 Min):** Portfolio-Werte, Yield-Veränderungen, Smart-Money-Aktivität, Protokoll-TVL-Trend.
- **Monatlich (vertiefte Review, 1-2 Stunden):** Allokations-Review, Fundamental-Daten-Check (TokenTerminal), Approval-Audit, Strategie-Anpassung.

**Der Personal-Research-Layout:**

Ein einfacher, praxistauglicher Layout für das eigene Dashboard passt auf eine A4-Seite oder einen Bildschirm. Strukturell:

1. **Oben: Portfolio-Übersicht.** Tabelle: Position, aktueller Wert, 7-Tage-Veränderung, Health Factor (falls Lending), Alert-Status.
2. **Mitte: Protokoll-Health.** Pro Protokoll: TVL-Trend (DeFiLlama-Link), Real-Yield-Rate, Smart-Money-Activity (Nansen-Link).
3. **Unten: Markt-Kontext.** Chain-TVL-Ranking, neue Hacks der Woche, wichtige News (3-5 Einträge).
4. **Ganz unten: Action-Items.** Offene Aufgaben: zu prüfende Approvals, Rebalancing-Trigger, zu recherchierende News.

Dieses Layout kannst du in einem einfachen Google Sheet, einem Notion-Dokument oder einem dedizierten Dashboard-Tool (z.B. Dune-Dashboard mit eingebetteten Links) umsetzen. Der Schlüssel ist **nicht die Tool-Wahl, sondern die Disziplin**, es konsistent zu verwenden.

**Die Integration über Iteration:**

Ein gutes Dashboard entsteht nicht beim ersten Versuch. Der typische Entwicklungs-Zyklus: Woche 1 baue ich ein erstes Dashboard — oft zu komplex. Woche 4 erkenne ich, welche Metriken ich wirklich nutze — und welche nur "cool aussehen". Woche 8 reduziere ich auf die genutzten Metriken. Woche 12 füge ich spezifische neue Metriken hinzu, die bei konkreten Fragen wiederkehrten. Nach 3 Monaten habe ich ein Dashboard, das zu mir passt.

### Folien-Zusammenfassung

Diese Lektion benötigt sieben Folien für die Video-Umsetzung.

**Folie 1: Titel und Überblick.** "Building an Analytics Dashboard — die integrative Praxis der On-Chain-Analyse." Fazit: aus fünf Tools ein funktionierendes System bauen.

**Folie 2: Die Tool-Rollen.** Fünf-Kreise-Diagramm: DeFiLlama (Aggregation), Dune (Custom-Queries), Nansen (Entities), Arkham (Clustering), TokenTerminal (Fundamentals). Jedes Tool mit einer klaren, nicht-überschneidenden Rolle.

**Folie 3: Das Drei-Layer-Modell.** Portfolio-Health, Protokoll-Monitoring, Markt-Kontext. Pro Layer: Fragestellung + passende Tools + Frequenz.

**Folie 4: KPI-Hierarchie.** Vital-KPI, Performance-KPI, Kontext-KPI. Jede Kategorie mit Beispielen und der Baseline-plus-Schwelle-Konvention.

**Folie 5: Refresh-Logik.** Zeit-Matrix: täglich (automatisiert), wöchentlich (manuell), monatlich (vertieft). Pro Frequenz: konkrete Aktionen.

**Folie 6: Personal-Research-Layout.** Schematische Darstellung des 1-Seiten-Dashboards: Portfolio-Übersicht oben, Protokoll-Health Mitte, Markt-Kontext unten, Action-Items am Ende.

**Folie 7: Typische Fehler und Iteration.** Metriken-Overload, fehlende Baselines, keine Handlungs-Schwellen. Plus: der 3-Monats-Entwicklungs-Zyklus.

### Sprechertext

*Sprechertext* (Sprechgeschwindigkeit 120-140 Wörter pro Minute, Zielvideo 8–10 Minuten):

In dieser letzten Lektion des Moduls synthetisieren wir alles, was wir gelernt haben, in etwas Praktisches — ein persönliches Analytics-Dashboard. Die ersten fünf Lektionen haben Tools einzeln behandelt. Jetzt fragen wir: wie integriere ich sie? Die Antwort ist: nicht als Liste aller Metriken, sondern als bewusstes, gestuftes System.

Beginnen wir mit der Tool-Rollen-Zuordnung. DeFiLlama ist das Aggregations-Layer — es beantwortet die "wie groß ist der Wald"-Frage. Dune ist das Custom-Query-Layer — es beantwortet deine spezifischen Fragen. Nansen ist das Entity-Layer — es zeigt dir, wer bewegt. Arkham ist das Clustering-Layer — es verbindet einzelne Wallets zu Entitäten. TokenTerminal ist das Fundamental-Layer — es zeigt dir, ob ein Protokoll wirtschaftlich gesund ist oder nur durch Emissionen lebt.

Wer diese fünf Rollen klar hält, vermeidet Redundanz. Wer sie nicht klar hält, öffnet jedes Tool für dieselbe Frage und wundert sich über unterschiedliche Zahlen.

Das Drei-Layer-Modell strukturiert die Analyse nach Zweck. Layer 1 ist Portfolio-Health: täglich, Alert-getrieben, fokussiert auf Health Factors, Peg-Werte, unerwartete Transaktionen. Layer 2 ist Protokoll-Monitoring: wöchentlich, fokussiert auf TVL-Trends, Yield-Entwicklung, Fundamental-Daten. Layer 3 ist Markt-Kontext: monatlich, fokussiert auf Allokations-Shifts und neue Trends.

Die KPI-Hierarchie verhindert Metriken-Overload. Pro Position definierst du 5-7 KPIs, klassifiziert als Vital, Performance oder Kontext. Entscheidend: jede Metrik braucht eine Baseline und eine Handlungs-Schwelle. Ein Health Factor von 1,8 ist nur sinnvoll mit dem Kontext "mein Ziel ist 2,0-2,5, ich reagiere bei 1,5".

Die Refresh-Logik ordnet Metriken Frequenzen zu. Einige müssen täglich automatisch überwacht werden — Health Factors, Pegs. Einige wöchentlich manuell — Portfolio-Werte, Yield-Trends. Einige nur monatlich — Fundamental-Daten, Allokations-Review. Das vermeidet tägliche Überforderung.

Der Personal-Research-Layout passt auf eine Seite. Oben: Portfolio-Übersicht. Mitte: Protokoll-Health. Unten: Markt-Kontext. Ganz unten: Action-Items. Dieses Layout kannst du in Google Sheets, Notion oder auf Dune umsetzen. Der Schlüssel ist nicht Tool-Perfektion, sondern Disziplin der Nutzung.

Typische Fehler beim Dashboard-Bau: Metriken-Overload (zu viel Info, zu wenig Signal), fehlende Baselines (Zahlen ohne Kontext), keine Handlungs-Schwellen (Beobachtung ohne Konsequenz).

Das gute Dashboard entsteht iterativ. In den ersten 4 Wochen baust du zu komplex. Nach 8 Wochen siehst du, welche Metriken du wirklich nutzt. Nach 12 Wochen reduzierst du auf das Kern-System. Nach 3 Monaten hast du ein Dashboard, das zu dir passt.

Die Meta-Lehre: ein Dashboard ist kein Tool, es ist ein Prozess. Die Fragen, die du stellst, sind wichtiger als die Metriken, die du siehst. Und die Disziplin der Nutzung ist wichtiger als die Eleganz der Konstruktion.

### Visuelle Vorschläge

Vier Visualisierungen unterstützen diese Lektion.

**Visual 1: Tool-Rollen-Diagramm.** Fünf-Kreise-Schema mit DeFiLlama, Dune, Nansen, Arkham, TokenTerminal. Jeder Kreis hat einen klaren Rollen-Titel und 2-3 Stichpunkt-Beispiele. Überlappungen bewusst minimal gezeigt, um die Komplementarität zu betonen.

**Visual 2: Drei-Layer-Dashboard-Schema.** Drei horizontale Bänder übereinander: Portfolio-Health (täglich), Protokoll-Monitoring (wöchentlich), Markt-Kontext (monatlich). Pro Band: konkrete Metriken-Beispiele plus Tools-Zuordnung.

**Visual 3: Beispiel-Personal-Dashboard.** Ein Mock-up eines konkreten 1-Seiten-Dashboards für ein Beispiel-Portfolio (z.B. 50k USD in Aave, stETH, Curve LP). Mit echten Beispiel-Metriken, damit die Lernenden einen direkten Template haben.

**Visual 4: Iterations-Zyklus-Grafik.** Zeitachse über 12 Wochen: Woche 1 (initial), Woche 4 (Overload erkannt), Woche 8 (reduziert), Woche 12 (optimiert). Zeigt den realistischen Entwicklungs-Pfad.

### Übung

Baue dein erstes Personal-Research-Dashboard für dein aktuelles DeFi-Portfolio. Es muss nicht perfekt sein — es ist der Startpunkt für die 3-Monats-Iteration.

**Teil 1: Portfolio-Inventar erstellen (30 Minuten).**
Liste alle deine aktuellen Positionen auf. Pro Position: Protokoll, Asset, USD-Wert, Strategie-Kategorie (Lending, LP, Staking, etc.).

**Teil 2: KPIs pro Position definieren (45 Minuten).**
Für jede Position: 3-5 Vital-KPIs mit Baseline und Handlungs-Schwelle. Beispiel für eine Aave-Position: Health Factor (Baseline 2,0-2,5, Alert bei 1,5), Position-Value (Baseline initial 10k, Alert bei -20%), Aave-TVL-Trend (Baseline stabil, Alert bei -25% in 30 Tagen).

**Teil 3: Tool-Zuordnung (30 Minuten).**
Für jede KPI: welches Tool liefert sie? Dashboard-Link speichern. Typisch: Zapper/DeBank für Portfolio-Werte, DeFiLlama für Protokoll-TVL, Etherscan für Approvals, TokenTerminal für Fundamentals.

**Teil 4: Das 1-Seiten-Layout erstellen (45 Minuten).**
In Google Sheets oder Notion: erstelle die Vier-Sektionen-Struktur (Portfolio-Übersicht, Protokoll-Health, Markt-Kontext, Action-Items). Fülle mit aktuellen Werten.

**Teil 5: Refresh-Routine definieren (30 Minuten).**
Welche KPIs prüfst du täglich (automatisiert via Alerts)? Welche wöchentlich? Welche monatlich? Trage die Frequenz pro KPI ins Dashboard ein. Setze wiederkehrende Kalender-Termine für wöchentliche und monatliche Reviews.

**Teil 6: Test-Run über 2 Wochen (kontinuierlich).**
Folge der Routine zwei Wochen. Notiere: welche KPIs nutze ich wirklich? Welche ignoriere ich? Wo fehlen mir Informationen? Wo bin ich überlastet?

**Deliverable:** Dein erstes Personal-Dashboard als Screenshot oder Dokument (1-2 Seiten), plus kurze Reflexion (300-500 Wörter) nach 2 Wochen Nutzung. Die Reflexion sollte konkret adressieren: was funktioniert, was nicht, was ist der nächste Iterations-Schritt?

### Quiz

**Frage 1:** Du hast ein Personal-Dashboard mit 20 verschiedenen KPIs für deine 5 Positionen gebaut. Nach 3 Wochen merkst du, dass du das Dashboard nur unregelmäßig anschaust und oft von den vielen Zahlen überfordert bist. Was sind die konkreten Reduktions-Schritte, die du vornehmen solltest?

<details>
<summary>Antwort anzeigen</summary>

Zwanzig KPIs für fünf Positionen ist ein klassisches Metriken-Overload-Szenario — vier KPIs pro Position ist für Retail-Monitoring meist zu viel. Die richtige Reduktion ist strukturell, nicht willkürlich. **Schritt 1: Nutzungs-Tracking der letzten 3 Wochen.** Welche der 20 KPIs hast du tatsächlich angeschaut? Nicht theoretisch für "wichtig gehalten" — tatsächlich im Nutzungs-Kontext zur Rate gezogen. Typisch: 5-8 werden regelmäßig genutzt, 12-15 werden ignoriert. Das ist die erste und wichtigste Daten-Basis. **Schritt 2: KPI-Klassifizierung überprüfen.** Für jede der 20 KPIs: ist es Vital, Performance oder Kontext? Bei vielen Dashboards stellt sich heraus, dass Leute "Kontext"-KPIs wie Vital-KPIs behandelt haben. Kontext-KPIs (z.B. Markt-weite TVL-Trends) müssen nicht wöchentlich geprüft werden — monatlich reicht. Bei Neuklassifizierung: viele KPIs können aus der wöchentlichen Liste in die monatliche verschoben werden, statt eliminiert. **Schritt 3: Pro Position auf 3-4 Vital-KPIs reduzieren.** Die Regel: pro Position maximal 3-4 Vital-KPIs. Für Aave-Lending typisch: Health Factor, Position-Value, Aave-TVL-Trend, Asset-Peg (falls Wrapped). Alles andere (Fee-Rate, Lending-Volume-Trend, etc.) ist entweder Performance (monatlich) oder Kontext (gelegentlich). **Schritt 4: Schwellen und Baselines überprüfen.** Für die verbleibenden KPIs: hat jede eine klare Baseline und Handlungs-Schwelle? Wenn nicht, ist die KPI strukturell unvollständig. Beispiel: "Aave-TVL beobachten" ist keine operationelle KPI. "Aave-TVL-Veränderung > 25% in 30 Tagen → Allokations-Review" ist operational. **Schritt 5: Alert-Automatisierung.** Für alle Vital-KPIs: kann die tägliche Überwachung automatisiert werden? Health Factor Alerts via HAL.xyz. Peg-Alerts via DeFiLlama oder spezifische Tools. Asset-Preis-Alerts via Coingecko-Watches. Wenn die tägliche Überwachung automatisch passiert, reduziert sich der manuelle Wochen-Scan drastisch. **Schritt 6: Das Dashboard auf 1 Seite reduzieren.** Wenn das Dashboard zwei Scroll-Bereiche braucht, ist es zu komplex. Die Reduktion auf eine Bildschirm-Seite zwingt zur Priorisierung. Wenn eine Metrik die 1-Seite-Regel bricht, muss sie entweder wichtig genug sein, um andere zu ersetzen, oder sie gehört nicht ins Vital-Dashboard. **Schritt 7: Wöchentliche Review-Struktur straffen.** Statt "alle 20 KPIs durchgehen" → "die 4-5 Vital-Sektionen prüfen plus Action-Items aktualisieren". Timeline: 15 Minuten statt 60 Minuten. **Die reduzierte Ziel-Struktur für 5 Positionen:** 15-20 KPIs total (3-4 pro Position) statt 20. Davon: 10-12 Vital (täglich via Alerts), 6-8 Performance (wöchentlich), 2-4 Kontext (monatlich). Wöchentlicher manueller Scan: 15-20 Minuten statt 60 Minuten. **Warum Reduktion oft schwerfällt:** Es fühlt sich an wie "Informationsverlust". Aber die Psychologie zeigt: Dashboards mit 20+ KPIs werden nicht genutzt. Dashboards mit 5-8 KPIs werden konsistent genutzt. Konsistente Nutzung von 5 KPIs produziert mehr Erkenntnis als sporadische Nutzung von 20. **Die iterative Fortsetzung:** Nach weiteren 3 Wochen wieder evaluieren. Typisch wird sich bei reduzierten Dashboards zeigen: einige KPIs fehlen für spezifische Fragen, die wiederkehren. Diese werden gezielt hinzugefügt. Einige der 15 verbleibenden werden auch dann selten genutzt — sie können weiter reduziert werden. Das Ziel ist iterative Konvergenz auf das persönliche Minimum-Viable-Dashboard. **Die Meta-Lehre:** Reduktion ist ein positives Signal für Dashboard-Reife, nicht negatives. Professionelle Analysten haben typisch minimalistische Setups — die Komplexität liegt in den Fragen, nicht in der Metriken-Anzahl. Wer das Dashboard reduziert, verbessert die Analyse-Qualität. Wer aus Angst vor "zu wenig" nicht reduziert, verschlechtert sie.
</details>

**Frage 2:** Beschreibe, wie du deine fünf Kern-Tools (Dune, DeFiLlama, Nansen, Arkham, TokenTerminal) konkret kombinieren würdest, um folgende Frage zu beantworten: "Ist die aktuelle 40%-APR-Position auf Pendle im sUSDe-Markt für mich geeignet?" Zeige die Tool-Sequenz und welche Frage jedes Tool beantwortet.

<details>
<summary>Antwort anzeigen</summary>

Diese Frage ist ein Paradebeispiel für integrierte Multi-Tool-Analyse. Keine einzelne Quelle gibt eine vollständige Antwort — die Tools ergänzen sich. Die richtige Sequenz geht von groß nach klein, von Protokoll-Gesundheit zu spezifischen Position-Risiken. **Schritt 1: DeFiLlama — der Aggregations-Einstieg.** **Frage:** Ist der sUSDe-Markt auf Pendle groß genug, stabil genug, um ernsthaft betrachtet zu werden? **Konkrete Checks:** Pendle-TVL insgesamt (DeFiLlama Protokoll-Page). Ist er stabil oder volatil? sUSDe-Pool-spezifische TVL (falls in DeFiLlama indiziert, sonst über Pendle-Dashboard). Pendle Yield-Page: zeigt aktuelle APRs über alle Märkte. Ist die 40% konsistent oder ein Spike? DeFiLlama Hacks-Dashboard: gab es jemals Pendle-Exploits? **Erkenntnis:** Typische DeFiLlama-Antwort: Pendle hat ein paar hundert Mio. TVL, sUSDe-spezifisch vielleicht 50-100 Mio. Das ist groß genug. APRs auf Pendle sind oft volatil zwischen 20-80%, die 40% ist nicht außergewöhnlich. **Entscheidung:** Weitergehen zur Protokoll-Fundamentaldatenprüfung. **Schritt 2: TokenTerminal — die Fundamentaldaten-Analyse.** **Frage:** Ist Pendle wirtschaftlich gesund oder lebt es nur von Token-Emissionen? **Konkrete Checks:** Pendle-Revenue-Trend (wird das Protokoll mehr/weniger rentabel?). P/S-Ratio (ist es überbewertet im Vergleich zu Peers?). Real Yield: sind die Rewards aus organischen Fees oder aus Token-Emissionen? **Erkenntnis:** Pendle hat typischerweise organischen Fee-Flow aus Yield-Trading. Das ist ein positives Signal — im Unterschied zu vielen anderen High-APR-Protokollen, die nur Emissions-getrieben sind. **Entscheidung:** Pendle hat fundamentale Gesundheit. Das Risiko ist nicht "Protokoll stirbt". Weitergehen zum Smart-Money-Check. **Schritt 3: Nansen — die Entity-Intelligence.** **Frage:** Welche Art von Akteuren ist auf dem sUSDe-Pendle-Markt aktiv? **Konkrete Checks:** Nansen Wallet-Profiler für den sUSDe-Pool-Contract. Welche gelabelten Wallets haben Positionen? Smart Money, Funds, Institutions? Oder nur anonyme Wallets? Wie lang halten typische Halter? Gibt es hohe Konzentration bei wenigen Wallets? **Erkenntnis:** Wenn Smart-Money-Wallets signifikante Positionen halten, ist das ein bestätigendes (aber nicht ausreichendes) Signal. Wenn nur anonyme Wallets aktiv sind und wenige Große dominieren, ist das ein Warn-Signal (Exit-Risiko wenn Große ausziehen). **Entscheidung:** Je nach Nansen-Ergebnis — weitergehen oder erste Zweifel konkretisieren. **Schritt 4: Arkham — das Wallet-Clustering.** **Frage:** Gehören die "vielen Smart-Money-Wallets" zu unabhängigen Entitäten, oder sind es mehrere Wallets einer Entität? **Konkrete Checks:** Die Top-5 Wallets im sUSDe-Pendle-Pool bei Arkham analysieren. Zeigen sie Cluster-Muster (gemeinsame Origin-Wallets, gemeinsame Exchange-Deposit-Adressen)? **Erkenntnis:** Oft zeigt sich: die "zehn Smart-Money-Wallets" sind eigentlich zwei oder drei Entitäten mit mehreren Operational-Wallets. Das reduziert den "social proof" und erhöht die Konzentrations-Sorge. **Entscheidung:** Wenn Konzentration hoch ist, ist Position-Sizing konservativer zu wählen. **Schritt 5: Dune — die Custom-Query-Ergänzung.** **Frage:** Gibt es spezifische Muster in der Pendle-sUSDe-Historie, die die Standard-Tools nicht zeigen? **Konkrete Checks:** Suche nach Community-Dashboards zu Pendle (viele existieren). Typische Queries: PT-YT-Preis-Historie, LP-Volume-Patterns, Large-Withdrawal-Events. Eigene Query falls Bedarf: "Durchschnittliche Haltedauer in sUSDe-Pendle-Positionen in den letzten 90 Tagen". **Erkenntnis:** Typische Dune-Antwort: sUSDe-Pendle-Positionen haben typisch 30-60 Tage Haltedauer. Das ist konsistent mit einer "farm-and-rotate"-Strategie. Wenn deine eigene Strategie aber 6+ Monate ist, bist du atypisch positioniert. **Die integrierte Antwort:** Fassen wir die fünf Tool-Antworten zusammen. DeFiLlama: Protokoll ist groß genug und stabil. TokenTerminal: fundamental gesund, nicht nur emissions-getrieben. Nansen: Smart-Money-Aktivität vorhanden. Arkham: Konzentration moderat (nicht extrem). Dune: typische Haltedauer 30-60 Tage. **Die Entscheidungs-Synthese:** Die Position wäre für dich geeignet, wenn (a) dein eigener Zeitrahmen 30-90 Tage ist (passt zum Markt-Muster), (b) die Position maximal 5-10% deines Portfolios beträgt (wegen moderater Konzentrations-Risiken), (c) du die Bereitschaft hast, bei Peg-Problemen von sUSDe schnell zu exit-en. **Die Position wäre nicht geeignet,** wenn (a) du langfristig (1+ Jahre) locken willst (Markt-Muster ist kürzer), (b) du eine sehr konservative Strategie mit < 3% Yield-Farming-Allokation fährst (Position ist für Experimental-Allocations, nicht Core), (c) du die Zeit nicht hast, Smart-Money-Flows und Peg-Werte regelmäßig zu monitoren. **Das Meta-Prinzip:** Die Frage "ist diese Position für mich geeignet" wird nie durch ein Tool alleine beantwortet. Die Integration von fünf Quellen liefert eine differenzierte Antwort, die sowohl das Protokoll (DeFiLlama, TokenTerminal), die Marktteilnehmer (Nansen, Arkham) als auch die Muster (Dune) berücksichtigt. **Die zeitliche Kalibrierung:** Diese Analyse dauert 60-90 Minuten für jemanden, der mit den Tools vertraut ist. Das ist angemessen für eine Position ab 5.000 USD. Für eine 500-USD-Testposition ist es Overkill — da reicht eine Schnell-Prüfung auf DeFiLlama + Etherscan (15 Minuten). Die Analyse-Tiefe skaliert mit der Position-Größe. **Die iterative Lehre:** Nach der Analyse und nach 4-8 Wochen tatsächlicher Position: vergleichen, ob die Analyse-Prognose mit der Realität übereinstimmte. Was hast du richtig eingeschätzt, was falsch? Das baut Analyse-Kompetenz über Zeit auf — und macht die nächste ähnliche Analyse effizienter.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → Tool-Rollen-Diagramm → Drei-Layer-Modell → KPI-Hierarchie → Refresh-Logik → Personal-Layout → Typische Fehler & Iteration
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — Tool-Rollen-Diagramm (5 Kreise), Drei-Layer-Dashboard-Schema, Beispiel-Personal-Dashboard-Mockup, Iterations-Zyklus-Grafik (12 Wochen)

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Modul-Abschluss-Quiz

Fünf integrative Fragen zu Modul 15, die über einzelne Lektionen hinausgehen und die gesamte On-Chain-Analyse-Praxis zusammenführen.

**Frage 1:** Wende das Drei-Ebenen-Modell aus Lektion 15.1 (Protokoll, Markt, Wallet) auf ein konkretes Szenario an: Du überlegst, deine 30.000 USDC-Position in Aave V3 Ethereum in Morpho Blue zu verschieben. Welche Frage würdest du auf jeder der drei Ebenen stellen, welches Tool würde sie beantworten, und wie würde die integrierte Antwort deine Entscheidung strukturieren?

<details>
<summary>Antwort anzeigen</summary>

Das Drei-Ebenen-Modell ist nur dann nützlich, wenn es konkret angewendet wird. Für dieses Szenario ergeben sich drei komplementäre Analyse-Fragen, die zusammen eine fundierte Entscheidung ermöglichen. **Ebene 1: Protokoll-Metriken.** **Frage:** "Wie vergleicht sich die operative Gesundheit von Morpho Blue mit Aave V3 auf Ethereum — spezifisch für USDC-Supply?" **Tool:** DeFiLlama, primär die Protocols-Sektion mit detaillierten Seiten beider Protokolle. **Was du prüfst:** Aktueller USDC-Supply-APY auf beiden Seiten. Base APY vs Reward APY — ist die höhere Rate bei einem Protokoll durch nachhaltige Fees oder durch auslaufende Incentives? Historische APY-Stabilität über 90 Tage — ist die aktuelle Rate typisch oder ein Anomalie-Peak? TVL der USDC-Pools — genug Liquidität für deine 30.000 USDC? Utilization-Rates — sind sie in einem gesunden Bereich (60-85%) oder extrem? Morpho Blue's modulare Isolated-Market-Struktur bedeutet, dass du genau prüfen musst, welchen spezifischen Markt du ins Auge fasst (USDC/ETH, USDC/WBTC, etc.). Jeder Markt hat eigene Parameter, Oracle-Setup, LTV-Schwellen. **Was du erwartest zu finden:** Aave V3 typisch mit stabileren, aber niedrigeren APYs; Morpho Blue mit höheren APYs in manchen Märkten, aber weniger historischer Daten. Die Frage ist: ist der zusätzliche APY die zusätzlichen Risiken wert? **Ebene 2: Markt-Metriken.** **Frage:** "Wie entwickelt sich der Lending-Markt insgesamt — verliert Aave Marktanteil an Morpho oder sind beide stabil?" **Tool:** DeFiLlama Chains-Sektion plus Token Terminal für Revenue-Vergleiche. **Was du prüfst:** Aave's TVL-Trend über 6 Monate — wachsend, stabil, rückläufig? Morpho Blue's TVL-Wachstumsrate — rapid (oft Zeichen von Incentive-gebundenem Wachstum) oder organisch? Relative Marktanteile der beiden Protokolle am Lending-Gesamt-TVL — verschieben sie sich? Gesamt-Lending-TVL — wächst der Markt insgesamt oder schrumpft er? Das sagt dir, ob du in einer expandierenden Kategorie bist oder in einer konsolidierenden. **Was du erwartest zu finden:** Aave bleibt wahrscheinlich größer in absoluten Zahlen, aber Morpho zeigt relativ stärkeres Wachstum. Die Frage: ist das Wachstum nachhaltig oder Incentive-getrieben? Wenn Morpho's Wachstum signifikant an Token-Emissionen hängt, die in wenigen Monaten auslaufen, ist der aktuelle Zustand nicht der zukünftige. **Ebene 3: Wallet-Aktivität.** **Frage:** "Wer genau lagert Kapital in Morpho Blue — einzelne Whales oder breite Nutzerbasis?" **Tool:** Dune Analytics (Community-Dashboard für Morpho Blue oder eigene Query) plus Etherscan für Holder-Konzentration der Supply-Positions. **Was du prüfst:** Verteilung der Supply-Positions. Wenn die Top-10 Supplier 80% des TVL halten, ist das Protokoll konzentriert — ein einzelner großer Exit kann die Dynamik ändern. Verteilung der Borrower — wer leiht hauptsächlich? Sind die Top-Borrower identifizierbare Entities (Fonds, Market Maker) oder diffuse Retail? Historische Volatilität: hat es in den letzten 90 Tagen große Kapital-Bewegungen gegeben, die die Utilization und APY geschockt haben? Ist die Nutzerbasis diversifiziert oder dominiert von Whales? **Was du erwartest zu finden:** Junge Protokolle haben oft konzentrierte Nutzerbasen. Morpho Blue's isolated markets können spezifisch von 2-3 großen Nutzern dominiert sein. Das ist nicht automatisch schlecht (große Nutzer signalisieren Vertrauen), aber es ist ein Risiko-Faktor für Liquidität und APY-Stabilität. **Die integrierte Antwort:** Nachdem alle drei Ebenen geprüft wurden, entsteht ein differenziertes Bild. Ein typisches Ergebnis könnte sein: "Aave V3 Ethereum USDC zahlt aktuell 4,2% APY mit 2 Jahren stabiler Historie und Nutzerbasis von Tausenden diversifizierter Supplier. Morpho Blue USDC/ETH zahlt aktuell 5,8% APY, aber das beinhaltet 1,2% in MORPHO-Token-Rewards, deren Wert und Liquidität unsicher sind. Die Nutzerbasis ist konzentriert auf 15 große Supplier. Der Base APY ist damit eher bei 4,6% — nur 0,4% über Aave, für substantiell mehr Protokoll-Risiko und Konzentrations-Risiko." **Die Entscheidung wird konkret:** Mit diesen Daten ist die Entscheidung nicht "höhere APY = besser", sondern "ist die 0,4%-Base-Rate-Differenz (20 USD jährlich bei 30.000 USD Position) die zusätzlichen Risiken wert?" Für eine konservative Strategie: wahrscheinlich nicht. Die Mehrrendite ist zu marginal, um das etablierte Protokoll gegen ein jüngeres mit mehr Unbekannten zu tauschen. Für eine aggressivere Strategie mit mehreren Experimentier-Positionen: die Umverteilung eines Teils (z.B. 5.000-10.000 USD) kann sinnvoll sein, während die Hauptposition auf Aave bleibt. **Die Meta-Lehre zum Drei-Ebenen-Modell:** Jede Ebene liefert andere Informationen. Wer nur Protokoll-Metriken prüft, übersieht die Markt-Dynamik. Wer nur Markt-Trends folgt, übersieht die spezifische Protokoll-Gesundheit. Wer nur Wallets trackt, übersieht den systemischen Kontext. Die Integration der drei ist, was aus Daten-Lookup echte Analyse macht. **Die zeitliche Einordnung:** Diese Analyse dauert 45-60 Minuten für einen geübten Nutzer. Für eine 30.000-USD-Position absolut im vertretbaren Bereich. Wer solche Analysen bei kleineren Positionen sparing macht und bei größeren Positionen rigoros durchführt, implementiert Due Diligence nach Betragsgröße — eine konservative Best Practice.

</details>

**Frage 2:** Ein Protokoll zeigt auf seiner Webseite beeindruckende Metriken: "TVL $2,8 Mrd (+68% in 60 Tagen), 24.000 aktive Nutzer, Volumen $450 Mio pro Tag." Eine freundliche Quelle empfiehlt dir das Protokoll. Wie würdest du die Metriken systematisch prüfen, um zu erkennen, ob die Zahlen substantiell oder kosmetisch sind?

<details>
<summary>Antwort anzeigen</summary>

Beeindruckende Zahlen sind oft das Ergebnis konkreter Marketing-Entscheidungen, nicht unverzerrte Realität. Eine systematische Prüfung muss jede der drei Metriken separat angehen und dann das Gesamtbild integrieren. **Metrik 1: TVL $2,8 Mrd (+68% in 60 Tagen).** **Prüfung auf DeFiLlama.** Das Protokoll auf DeFiLlama suchen. Wird es dort mit dem gleichen TVL geführt? DeFiLlama bereinigt typisch um Doppelzählungen — wenn das Protokoll-eigene TVL höher als DeFiLlama-TVL, zeigt es Rehypothekations-Zählung oder andere aggressive Definition. **Prüfung der Doublecounted-Adjusted-Variante.** Wenn DeFiLlama beide Zahlen zeigt (Default vs Adjusted), ist die bereinigte Zahl der relevante Vergleichspunkt. Eine Differenz von 30-50% zwischen den beiden Varianten deutet auf intensives Cross-Lending oder Staking-Derivat-Nutzung hin — nicht per se schlecht, aber strukturell relevant. **Prüfung der Token-Composition.** Wenn das TVL-Wachstum von 68% kommt: wie viel davon ist neue Deposits (in Token-Einheiten) vs. Preis-Steigerung der bereits gelockten Assets? Bei einem ETH-lastigen Protokoll mit ETH-Preisanstieg von 40% in den 60 Tagen kommt viel Wachstum vom Preis. Der tatsächliche Netto-Deposit-Anstieg ist deutlich kleiner. **Prüfung auf Incentive-Programme.** Läuft aktuell ein Liquiditäts-Mining-Programm? Wurden neue Token-Rewards gestartet? Rapid TVL-Wachstum bei gleichzeitigem Rewards-Programm ist fast immer Mercenary Capital — es verschwindet, wenn die Rewards enden. Das zukünftige TVL nach Programm-Ende ist die strukturelle Realität, nicht das aktuelle Incentive-verzerrte Level. **Metrik 2: 24.000 aktive Nutzer.** **Prüfung der Sybil-Basis.** Nutzer-Zahlen sind besonders anfällig für Sybil-Manipulation. Auf Etherscan oder via Dune prüfen: wie viele dieser 24.000 Wallets haben mehr als 1.000 USD im Protokoll? Oft bleiben nach dem Sybil-Filter nur 5-15% der nominellen Nutzer übrig. **Definition von "aktiv".** Was zählt als "aktiv"? Einzelne Transaktion in 90 Tagen? Wöchentliche Aktivität? Position-Halter? Die Definition ist oft explosiv unterschiedlich. Ein "aktiver Nutzer", der einmal vor 60 Tagen eine Test-Transaktion machte, zählt in vielen Definitions mit, ist aber nicht meaningful aktiv. **Konzentrations-Check.** Wenn die Top-100 Nutzer 95% des Kapitals halten und die restlichen 23.900 zusammen 5%, dann ist die "Nutzerbasis" strukturell 100 Wallets — nicht 24.000. Etherscan's Holders-Page oder Dune-Dashboards zeigen die Konzentration direkt. **Airdrop-Farming-Verdacht.** Wenn das Protokoll kein ausgeschütteter Token hat und keine klaren Ankündigungen, aber 24.000 Nutzer: sind die "Nutzer" Airdrop-Farmer, die kleine Positions halten, um für zukünftige Token-Ausschüttungen qualifiziert zu sein? Das Verhalten ist oft erkennbar an: minimal-sized Positions, wiederkehrende Pattern über viele Wallets, Funding aus gleicher Quelle. **Metrik 3: Volumen $450 Mio pro Tag.** **Prüfung auf Wash Trading.** DEX-Volumina sind besonders anfällig für Wash Trading — die gleiche Partei handelt mit sich selbst, inflationiert Volumen ohne ökonomische Substanz. Erkennbare Pattern: Volumen konzentriert auf wenige Token-Pairs, hohe Round-Trip-Häufigkeit (Buy-Sell-Buy-Sell zwischen gleichen Wallets), extreme Spreads mit unplausiblen Fill-Raten. **Prüfung auf MEV-Aktivität.** Bei manchen Protokollen ist ein großer Teil des Volumens MEV-Searcher-Aktivität — Bots, die Arbitrage zwischen Pools betreiben. Das ist technisch legitim, aber es repräsentiert keine echte User-Nachfrage, nur effiziente Preis-Angleichung. Wenn 60% des Volumens MEV ist, ist die "echte" Nutzer-Nachfrage nur 40%. **Prüfung der Gebühren-Realität.** Bei Volumen von 450 Mio pro Tag und typischen DEX-Fees von 0,05-0,3% wären die erwarteten täglichen Gebühren 225.000 - 1.350.000 USD. Wenn die berichteten tatsächlichen Gebühren-Einnahmen deutlich niedriger sind, ist das Volumen teilweise fiktiv oder über Wash-Trading-Routen, die keine Gebühren zahlen. **Vergleich mit etablierten Protokollen.** Uniswap V3 auf Ethereum hat typisch 1-3 Mrd USD Volumen pro Tag. Wenn das neue Protokoll 450 Mio zeigt und damit 20-40% von Uniswap V3 erreicht — plausibel nur, wenn es eine klare strukturelle Differenzierung hat. Ohne das: Verdacht auf Manipulation. **Die integrierte Analyse:** Nachdem alle drei Metriken kritisch geprüft wurden, entsteht das realistische Bild. Typisches Ergebnis bei einem zweifelhaften Protokoll: "Netto-adjusted TVL 1,2 Mrd (nicht 2,8 Mrd). Tatsächliche aktive Nutzerbasis 800-1.500 Wallets (nicht 24.000). Realistisches organisches Volumen 80-120 Mio (nicht 450 Mio). Alle drei Metriken sind um Faktor 2-3 gebläht." Bei einem seriösen Protokoll: die Zahlen bestätigen sich im Wesentlichen, mit moderaten Reduktionen durch Bereinigung. **Die Entscheidungs-Konsequenz.** Wenn die Prüfung zeigt, dass die Zahlen substantiell sind: das Protokoll verdient weitere Analyse auf den anderen Dimensionen (Security, Team, Tokenomics). Wenn die Prüfung zeigt, dass die Zahlen kosmetisch sind: das ist ein strukturelles Warnsignal. Ein Protokoll-Team, das seine Metriken aggressiv aufbläht, hat meist auch andere Transparenz-Probleme. Die konservative Konsequenz: nicht nutzen, selbst wenn andere Aspekte attraktiv erscheinen. **Die Meta-Lehre:** Jede einzelne Metrik kann manipuliert werden. Die Kombination mehrerer Metriken mit Kreuz-Validierung macht Manipulation schwerer. Wer nur Top-Level-Zahlen vertraut, wird regelmäßig getäuscht. Wer systematisch die Tools aus diesem Modul einsetzt, erkennt Manipulationen in den meisten Fällen. Das Investment in Analyse-Kompetenz zahlt sich primär durch vermiedene schlechte Entscheidungen aus — nicht durch gefundene Outperformance.

</details>

**Frage 3:** Du hörst um 22:30 Uhr von einem potentiellen Hack bei einem Lending-Protokoll, in dem du 15.000 USD an Collateral liegen hast. Erkläre einen konkreten Workflow mit den richtigen Tools in der richtigen Reihenfolge, um innerhalb von 30 Minuten zu einer informierten Entscheidung (halten, reduzieren, komplett exitieren) zu kommen.

<details>
<summary>Antwort anzeigen</summary>

Das Szenario testet die Integration aller fünf Lektionen unter Zeitdruck. Eine 30-Minuten-Response erfordert disziplinierte Tool-Wahl und klare Prioritäten. **Minute 0-3: Event-Verifikation.** Erster Reflex: keine Panik-Aktion auf Basis eines einzelnen Signals. Prüfe die Quelle des Hack-Hinweises. Wenn es ein Twitter-Post von unbekanntem Account ist: zunächst skeptisch. Wenn es von etablierten Monitoring-Accounts kommt (PeckShield, BlockSec Alert, samczsun): ernster nehmen. Wenn das Protokoll selbst noch nicht reagiert hat: kritischer prüfen. Wenn das Protokoll offiziell bestätigt hat: höchste Priorität. **Konkrete Aktion:** Öffne gleichzeitig: (a) DeFiLlama Hacks-Dashboard ([defillama.com/hacks](https://defillama.com/hacks)), um zu prüfen, ob der Hack bereits gelistet ist, (b) das offizielle Twitter/X-Account des Protokolls, (c) einen seriösen Crypto-News-Aggregator. Wenn zwei oder mehr unabhängige Quellen bestätigen: Situation ist real. **Minute 3-8: Direkte Position-Analyse.** Gehe auf Etherscan (oder den passenden L2-Explorer). Prüfe deine Wallet-Seite: welche Positions hast du exakt? Aktuelle Balances? Aktive Approvals zum betroffenen Protokoll? Wenn du eine Lending-Position hast (Collateral + Borrow), ist die Health-Factor-Situation kritisch. **Konkrete Aktion:** Öffne das Protokoll-Frontend falls noch funktional. Notiere: Collateral-Betrag, Borrow-Betrag, aktuelle Health Factor, liquidation-price. Wenn das Frontend nicht funktioniert: Read-Contract-Tab auf Etherscan nutzen, um Position-Details direkt aus dem Smart Contract zu lesen. Die `getUserAccountData()`-Funktion (bei Aave-artigen Protokollen) gibt exakte Werte aus. **Minute 8-15: Hack-Mechanik verstehen.** Was genau wurde exploitiert? Das bestimmt, wie betroffen du bist. Fünf typische Hack-Kategorien mit unterschiedlichen Implikationen: (1) **Oracle-Manipulation**: Betroffen sind typisch Borrowing-Positions, die auf Oracle-Preise angewiesen sind. Supply-Only-Positions können intakt bleiben. (2) **Smart-Contract-Bug in spezifischer Funktion**: Nur bestimmte Nutzer betroffen, je nachdem, welche Funktionen sie nutzen. (3) **Admin-Key-Kompromittierung**: Katastrophal, typisch alle Nutzer betroffen. (4) **Collateral-Asset-Depeg**: Nur Positions mit dem betroffenen Asset. (5) **Governance-Attack**: Betroffen typisch ganze Protokoll-Logik. **Konkrete Aktion:** Öffne Twitter/X und suche nach "[Protokoll-Name] hack" oder "[Protokoll-Name] exploit". Qualifizierte Analysten (samczsun, Meir Bank, spezialisierte Security-Firmen) posten oft innerhalb 15-30 Minuten erste technische Analysen. Diese zu lesen ist der schnellste Weg zu verstehen, was wirklich passiert. **Minute 15-22: Kaskaden-Risiko-Prüfung.** Ist der Hack isoliert auf das eine Protokoll, oder kaskadiert er? Hast du indirekte Exposure? Prüfe: Andere Protokolle, die mit dem kompromittierten Protokoll integriert sind (Vaults, die das Protokoll nutzen, Strategies, die darauf aufbauen). Token-Derivate des Protokolls (z.B. wenn es ein LST-Protokoll ist, könnten derivate Assets mitbetroffen sein). Bridge-Assets, die durch das kompromittierte Protokoll routen. **Konkrete Aktion:** Zapper oder DeBank öffnen, um die komplette Portfolio-Sicht zu bekommen. Durchsuche systematisch: gibt es andere Positions, die Kaskaden-Exposure haben? Bei jedem "Ja": prüfe, wie akut das Risiko ist. **Minute 22-28: Entscheidungs-Matrix anwenden.** Basierend auf den Daten aus den ersten 22 Minuten, wende eine klare Entscheidungs-Logik an. **Szenario A: Unbestätigt oder widersprüchliche Quellen.** Warte 30 weitere Minuten. Häufig klärt sich die Situation. Panik-Aktionen aufgrund unbestätigter Reports können mehr Schaden anrichten als Abwarten. **Szenario B: Bestätigter Hack, aber Mechanik nicht auf deine Position-Art anwendbar** (z.B. Oracle-Attack, du hast Supply-Only). Deine Exposure ist wahrscheinlich gering. Prüfe Approvals zu dem Protokoll und revoke sie, aber die Position selbst kann oft gehalten werden. Beobachte in den nächsten Stunden weiter. **Szenario C: Bestätigter Hack, deine Position-Art betroffen, Protokoll noch funktional.** Reduziere oder exitiere. Priorität: Borrows zurückzahlen (um Liquidations-Gefahr bei Collateral-Depeg zu vermeiden), dann Collateral abziehen. Bei Liquidity-Knappheit: jetzt ist der schnellere Exit wertvoller als der gleichmäßige. **Szenario D: Bestätigter Hack, dein Kapital akut in Gefahr, Frontend nicht funktional.** Etherscan Write Contract direkt nutzen, um Withdraw-Funktion aufzurufen. Das ist die Extremsituation, aber für Power-User machbar. Hardware-Wallet bereithalten. **Szenario E: Hack so schwer, dass Recovery-Möglichkeit fraglich.** Situation beobachten. Oft kündigen Protokolle innerhalb von 12-48 Stunden Recovery-Pläne an. Nicht überstürzt in Panik-Positions verkaufen, wenn Recovery möglich ist. **Minute 28-30: Dokumentation und Monitoring.** Egal welches Szenario: dokumentiere. Screenshots der Positions, der Hack-Reports, der eigenen Entscheidungen mit Zeitstempel. Das ist wichtig für spätere Post-Mortem, ggf. Tax-Accounting, und strukturiertes Lernen. Setze Follow-up-Alerts: Twitter-Notifications für Protokoll-Official-Account, Suche für weitere Hack-Updates, Beobachtung der betroffenen Token-Preise. **Die Tool-Choreografie in der Zusammenfassung:** Twitter/X und DeFiLlama Hacks für Event-Verifikation (0-3 Min). Etherscan plus Protokoll-Frontend für Position-Analyse (3-8 Min). Twitter/X plus Security-Analyst-Posts für Hack-Mechanik (8-15 Min). Zapper/DeBank für Kaskaden-Prüfung (15-22 Min). Integrierte Entscheidung basierend auf allen Daten (22-28 Min). Dokumentation (28-30 Min). **Warum die Reihenfolge wichtig ist.** Wer in Panik zuerst exitiert und später prüft, verliert oft unnötig durch schlechte Timing-Entscheidungen. Wer zuerst prüft, dann analysiert, dann entscheidet, handelt informiert. Die 30 Minuten sind knapp, aber ausreichend für eine substantielle Entscheidung. **Die Meta-Lehre:** Vorbereitete Tool-Kompetenz zahlt sich in Krisen exponentiell aus. Wer Etherscan, DeFiLlama und Zapper regelmäßig nutzt, navigiert in 30 Minuten, was Ungeübte in 3 Stunden nicht schaffen. Das Research-Routine-Konzept aus Lektion 15.5 ist nicht nur für normale Wochen — es ist die Infrastruktur für genau solche Krisen-Situationen. Die konservative Investment in Research-Disziplin ist eine direkte Investition in Krisen-Resilienz.

</details>

**Frage 4:** Ein Freund sagt dir: "Ich nutze nur DeFiLlama. Das ist doch genug für meine DeFi-Entscheidungen." Welches sind die drei wichtigsten Argumente dafür, warum das strukturell unzureichend ist, und welche konkreten Situationen würden die Schwäche aufdecken?

<details>
<summary>Antwort anzeigen</summary>

DeFiLlama ist ein exzellentes Tool, aber als Alleinquelle hat es spezifische strukturelle Limitierungen, die in drei typischen Situationen offensichtlich werden. **Argument 1: Aggregation verbirgt kritische Details.** DeFiLlama zeigt aggregierte Metriken — TVL-Summen, Durchschnitts-APYs, Kategorie-Totale. Das ist wertvoll für Überblick, aber destruktiv für wichtige Nuancen. **Konkrete Situation:** Du willst eine 20.000-USD-Position in einem neuen Lending-Pool aufbauen. DeFiLlama zeigt: "Pool X hat 50 Mio USD TVL und 8,5% APY." Das klingt solide. Was DeFiLlama nicht zeigt: 80% des TVL kommen von drei Wallets. Die aktuelle Utilization ist 95%. Wenn einer dieser drei Wallets exitiert, kollabiert die Liquidität, die APY springt, und deine Position wird entweder gezwungen, die plötzliche Utilization zu bedienen, oder kann nicht withdrawn werden. Diese Konzentrations-Information ist nur via Dune oder Etherscan direkt sichtbar. **Warum das wichtig ist:** Viele Retail-Nutzer haben solche Erfahrungen gemacht — eine Position, die auf DeFiLlama perfekt aussah, hatte strukturelle Schwächen, die nur mit tieferen Tools sichtbar waren. Die schmerzhafte Lernkurve kostet typisch 5-20% der Position. **Argument 2: Verifikation fehlt.** DeFiLlama ist ein aggregierter Zweitdatensatz. Er ist auf die Korrektheit seiner eigenen Indexierung und Kategorisierung angewiesen. Fehler in der Kategorisierung (z.B. ein Protokoll als "Lending" gelabelt, das eigentlich ein Experiment-Hybrid ist), Lag in der TVL-Aktualisierung, Definitions-Unterschiede zwischen dem Protokoll und DeFiLlamas Messung — alle das passiert regelmäßig. **Konkrete Situation:** Du liest "Protokoll Y zahlt 12% APY auf USDC" auf DeFiLlama und überlegst zu deponieren. Ohne Etherscan-Kreuzprüfung kannst du nicht wissen: (a) ist der Contract verifiziert? (b) gibt es Admin-Keys? (c) wie groß ist die Konzentration der bestehenden Supplier? Nur die Roh-Daten können diese Fragen beantworten. **Warum das wichtig ist:** Ein scam oder unsicheres Protokoll kann auf DeFiLlama sauber aussehen, wenn es basic Integration-Standards erfüllt. DeFiLlama kuratiert teilweise, aber nicht rigoros. Die autoritative Quelle bleibt die Blockchain selbst, zugänglich via Etherscan. **Argument 3: Spezifische Fragen nicht beantwortbar.** DeFiLlama beantwortet die 80% häufigsten Fragen sehr gut. Die 20% der Fragen, die oft die wertvollsten sind — die, die andere nicht stellen — sind durch DeFiLlama nicht zugänglich. **Konkrete Situation 1:** "Wer sind die tatsächlich großen Nutzer dieses neuen Protokolls? Sind sie identifizierbare, respektierte Entities?" Das erfordert Nansen oder Arkham plus Etherscan-Investigation. **Konkrete Situation 2:** "Wie verändert sich das Trading-Verhalten in diesem DEX über Zeit? Gibt es Wash-Trading-Patterns?" Das erfordert Dune-Queries, nicht Dashboard-Zahlen. **Konkrete Situation 3:** "Gibt es unübliche Gas-Pattern im Protokoll, die auf MEV-Manipulation hindeuten könnten?" Das erfordert tiefere Exploration via Etherscan oder spezialisierte Tools wie EigenPhi. **Warum das wichtig ist:** Die wirklich interessanten Analyse-Fragen — die, die Insight produzieren statt nur Information — sind meist nicht Standard-Dashboard-beantwortbar. Wer sich auf DeFiLlama beschränkt, spielt auf derselben Informations-Ebene wie alle anderen Retail-Nutzer. **Die Synthese der drei Argumente:** DeFiLlama ist wie eine erste Seite einer Zeitung — gut für Überblick, gibt dir die wichtigen Themen. Aber für Entscheidungen über spezifische Positions brauchst du die vollständigen Artikel und oft die Primär-Quellen. Wer nur Überschriften liest, kann oberflächlich informiert sein, aber nicht tief. **Was der Freund tun sollte:** Die Antwort ist nicht "DeFiLlama ist nutzlos" — es ist und bleibt das beste Einstiegs-Tool. Die Erweiterung der Analyse-Praxis sollte schrittweise erfolgen. **Schritt 1: Etherscan-Integration (erste 2-4 Wochen).** Für jedes Protokoll, das er nutzt, einmal die Contract-Seite auf Etherscan ansehen. Verifiziert? Admin-Setup? Historische Aktivität? Das fügt 5-10 Minuten zu jeder Protokoll-Evaluation hinzu und eliminiert den größten Teil der strukturellen Risiken. **Schritt 2: Zapper/DeBank für Portfolio-Übersicht (nächste 2-4 Wochen).** Eigene Positions systematisch tracken, nicht nur einzelne Protokoll-Dashboards checken. Das macht Kaskaden-Risiko sichtbar. **Schritt 3: Gelegentliche Dune-Dashboards bei spezifischen Fragen (Monat 2-3).** Wenn eine konkrete Frage auftaucht ("ist dieses Protokoll wirklich organisch gewachsen?"), dann Dune-Dashboards nutzen. Kein Pflicht-Tool, aber situationsabhängig hilfreich. **Schritt 4: Optional Nansen/Arkham, wenn Budget und Use-Case passen.** Für die meisten Retail-Nutzer nicht notwendig, aber bei spezifischen Bedarfen wertvoll. **Die übergeordnete Lehre:** Werkzeuge sind komplementär. Ein Schreiner, der nur einen Hammer nutzt, kann einige Dinge bauen, aber ein Schrank erfordert Säge, Bohrer, Schraubenzieher, Winkelmaß. Analyse-Tools sind analog. Die 5-Tool-Kompetenz aus diesem Modul — DeFiLlama, Etherscan, Dune (optional SQL), Zapper/DeBank, Nansen/Arkham — ist nicht Maximum, sondern adäquates Minimum für ernsthafte DeFi-Entscheidungen. Wer sich auf weniger beschränkt, limitiert systematisch seine Entscheidungs-Qualität.

</details>

**Frage 5:** Du hast Modul 15 abgeschlossen und willst die Praxis konkret etablieren. Skizziere deine persönliche 90-Tage-Implementations-Roadmap: was in den ersten 30 Tagen, was in den Tagen 31-60, was in den Tagen 61-90?

<details>
<summary>Antwort anzeigen</summary>

Die 90-Tage-Roadmap strukturiert die Implementation in progressive Ebenen. Die Ziele: realistisch, kumulativ, messbar. Zu ambitionieren schadet, zu wenig auch. **Phase 1 (Tage 1-30): Fundament legen — Konsistenz über Tiefe.** **Woche 1: Setup.** Konten erstellen bei DeFiLlama (kostenlos, optional Bookmark-Management), Dune (kostenloser Account, für späteren SQL-Einstieg), Zapper oder DeBank (Wallet anzubinden für Portfolio-Tracking), Etherscan (bei Bedarf Watch-List für wichtige Contracts anlegen). Feste Zeit-Slots im Kalender blockieren: z.B. Sonntag-Abend 20:00-20:30 für Weekly Review, letzter Samstag des Monats 10:00-11:00 für Monthly Audit. **Woche 2-4: Minimum Viable Weekly Routine.** Die 15-Minuten-Routine aus Lektion 15.5 umsetzen — jede Woche: Portfolio-Check via Zapper, DeFiLlama-Scan der eigenen Protokolle, Hacks-Dashboard prüfen, kurze Journal-Notiz. Das Ziel ist nicht Tiefe, sondern Konsistenz. Wenn du vier Wochen in Folge die 15 Minuten machst, hast du einen Pattern etabliert. **Erfolgs-Metrik Phase 1:** Vier aufeinanderfolgende Wochen mit vollzogener Routine. Dokumentierte Journal-Einträge. Erste kleine Erkenntnisse (z.B. eine Approval entdeckt und zurückgezogen, eine Protokoll-Änderung früh bemerkt). **Phase 2 (Tage 31-60): Tiefe vorsichtig erweitern.** **Woche 5-6: Etherscan-Kompetenz vertiefen.** Für jedes Protokoll in deinem Portfolio einmal die Contract-Seite auf Etherscan öffnen. Systematische Prüfung: Verifizierter Code? Admin-Setup? Audit-Links? Wer sind die größten Holders? Notiere deine Erkenntnisse in einem persönlichen Dokument "Mein DeFi-Kontext-Kompendium". Das wird zur zentralen Referenz für Krisen-Situationen. **Woche 7-8: Approval-Audit etablieren.** Monatlichen revoke.cash-Check durchführen (im Kalender blockiert). Alle Unlimited-Approvals zu nicht mehr genutzten Protokollen zurückziehen. Bei aktiv genutzten Protokollen: evaluiere, ob Exact-Amount-Approvals möglich sind. Erste Monate werden Dutzende Approvals zum Zurückziehen aufdecken — das ist normal. **Erfolgs-Metrik Phase 2:** Etherscan-Kontext-Dokument für alle eigenen Protokolle existiert. Unlimited-Approvals zu ungenutzten Protokollen sind zurückgezogen. Weekly-Routine konsistent mit leichter Erweiterung (20-25 Min statt 15). **Phase 3 (Tage 61-90): Selektive Vertiefung und Integration.** **Woche 9-10: Dune Analytics sanfter Einstieg.** Drei bis fünf Community-Dashboards zu Protokollen in deinem Portfolio finden und bookmarken. Lerne sie zu lesen — nicht zu schreiben. Für jedes Dashboard einmal den dahinterliegenden SQL-Code öffnen und versuchen zu verstehen, was die Metriken bedeuten. Kein Druck, eigene Queries zu schreiben — nur Lese-Kompetenz. **Woche 11: Erste eigene Dune-Query (optional, aber empfohlen).** Wenn du dich dafür bereit fühlst: forke eine existierende Query und modifiziere einen Parameter (Zeitraum, Threshold, Chain). Das ist der einfachste Einstieg in SQL — kein from-Scratch-Schreiben, nur Anpassen. **Woche 12: Integration und Review.** Am Ende des 90-Tage-Zyklus: systematisches Review. Was hat sich bewährt? Welche Tools/Routinen produzieren echten Wert? Welche waren Busy Work? Die Routine für die nächsten 90 Tage anpassen — mehr von dem, was funktioniert, weniger von dem, was nicht. **Erfolgs-Metrik Phase 3:** Regelmäßige Nutzung von mindestens drei Tools (DeFiLlama, Etherscan, Zapper/DeBank). Dune-Lese-Kompetenz etabliert. Optional: erste eigene SQL-Modifikation. Journal mit substantiellen Einträgen über 12 Wochen. **Was in den 90 Tagen NICHT zu versuchen ist:** **Nicht versuchen: Nansen-Subscription.** Für die meisten Retail-Nutzer nicht wertlohnend. Wenn du nach 90 Tagen einen klaren Use-Case identifiziert hast, dann evaluieren. **Nicht versuchen: Komplexe SQL-Queries schreiben.** SQL-Kompetenz für DeFi ist eine 6-12-Monate-Investition. Nicht in den ersten 90 Tagen priorisieren. Lesen reicht. **Nicht versuchen: Jede neue Opportunity analysieren.** Die 90-Tage-Roadmap fokussiert auf Tool-Kompetenz für bestehende Positions. Neue Opportunities nur sparing evaluieren — erst wenn die Basis-Routine steht. **Die psychologische Dimension:** Die 90-Tage-Roadmap ist bewusst sanft dimensioniert. Das Risiko ist nicht "zu wenig zu lernen" sondern "frustriert aufzugeben". Konsistenz über Intensität. Wer nach 90 Tagen eine robuste Basis-Routine hat, ist weit vor den meisten Retail-Nutzern, die ohne strukturierte Praxis operieren. **Was nach 90 Tagen kommt:** **Tage 91-180 (optional Erweiterung):** Tiefere SQL-Kompetenz. Erste eigene Dashboards. Spezifische Monitoring-Queries für eigene Positions. Integration von mehr Chain-spezifischen Tools. **Tage 181-365 (Expertise-Ausbau):** Teilnahme an DeFi-Analyse-Communities (CryptoCompare-Forums, Twitter-Analyst-Kreise). Eigene Analyse-Publikationen (privat oder öffentlich, je nach Komfort). Evaluation von Premium-Tools wie Nansen. **Die zentrale Erkenntnis.** On-Chain-Analyse-Kompetenz ist eine langfristige Investition. In 90 Tagen baust du die Infrastruktur. In 6-12 Monaten entwickelt sich die Intuition. In 2-3 Jahren bist du informierter als 95% der Retail-Nutzer. Diese Kompetenz zahlt sich nicht linear aus — sie zahlt sich in Krisen-Momenten, in Opportunity-Erkennung, und in vermiedenen Fehlern aus. Jede dieser drei Dimensionen hat asymmetrische Outcomes: ein richtig vermiedener Fehler kann 5-10x der kumulativen Zeit-Investition wert sein. **Die konservative Empfehlung:** Beginne mit Phase 1 diese Woche. Die 15-Minuten-Routine für vier Wochen durchziehen ist machbar und etabliert die Basis. Alles darauf baut inkrementell auf. Die Versuchung, alles gleichzeitig zu versuchen, führt typisch zum Abbruch. Schritt-für-Schritt-Fortschritt ist ineffizient wirkend, aber strategisch optimal.

</details>

---

## Modul-Zusammenfassung

Modul 15 hat eine Disziplin aufgebaut, die für ernsthafte DeFi-Nutzung unverzichtbar ist: strukturierte On-Chain-Analyse. Wo die vorherigen Module das WAS und WARUM behandelt haben — Lending-Mechanik, Bridge-Designs, veTokenomics, Cross-Chain-Infrastructure — vermittelt dieses Modul das WIE: wie man systematisch Informationen sammelt, kritisch prüft und zu handlungsrelevanten Einsichten verdichtet.

Die Reise begann mit Philosophie. Ohne das klare Verständnis, was On-Chain-Daten fundamental zeigen und wo ihre strukturellen Grenzen liegen, werden alle Tools zu Datenlawinen ohne Erkenntnis. Das Drei-Ebenen-Modell — Protokoll-Metriken, Markt-Metriken, Wallet-Aktivität — gibt eine Struktur, in der jede Frage ihren richtigen Analyse-Kontext findet. Die fünf typischen Fehlinterpretationen — TVL als Heiligtum, Volumen ohne Kontext, Transaktions-Anzahl als Adoption, Sybil-Blindheit, Korrelation mit Kausation verwechseln — sind nicht nur theoretische Warnungen, sondern konkrete Fallen, die Retail-Nutzer täglich in falsche Entscheidungen führen. Wer sie kennt und aktiv prüft, hat einen strukturellen Vorteil gegenüber denen, die nur Oberflächen-Zahlen konsumieren.

DeFiLlama als zentraler Hub aggregiert, was aggregiert werden kann. Die sieben zentralen Sektionen — Protocols, Chains, Yields, Bridges, Hacks, Stablecoins, Derivatives — decken 80% der typischen Analyse-Fragen ab. Die kritische Fähigkeit ist nicht, DeFiLlama zu nutzen, sondern es richtig zu lesen. TVL in seinen verschiedenen Bereinigungs-Varianten verstehen. Yield-Seiten mit Filter-Disziplin nutzen, statt nach höchsten APYs zu jagen. Bridges-Dashboard für Kapitalfluss-Analyse, Hacks-Archiv für historisches Lernen. Wer diese Disziplin entwickelt, vermeidet die klassischen Retail-Fallen und baut informierte Positionen.

Etherscan und Block-Explorer sind die autoritative Quelle — wo DeFiLlama interpretiert, zeigen Etherscan die Rohdaten. Die Kompetenz liegt in drei Bereichen: Adressen und Transaktionen sauber lesen zu können, Smart-Contract-Seiten zu navigieren und zu verifizieren, und vor allem Approvals systematisch zu verwalten. Die monatliche Approval-Review via Etherscan's Token Approval Checker oder revoke.cash ist eine der unterschätztesten Sicherheits-Praktiken in DeFi. Sie kostet 10 Minuten und eliminiert einen Großteil latenter Risiken. Zusätzlich öffnet Etherscan Werkzeuge für direkte Contract-Interaktion, wenn Frontends fehlen oder kompromittiert sind.

Dune Analytics ist die Schicht dazwischen: spezifische, SQL-basierte Ansichten, die weder Aggregator noch Explorer liefern. Für die 20% der Analyse-Fragen, die besonders interessant sind — Whale-Akkumulation, Exchange-Flows, Protokoll-spezifische Pattern — ist Dune das richtige Werkzeug. Die Community-Dashboards decken viel ab, ohne dass man eigenen SQL schreiben muss. Wer die Kompetenz zur Lektüre und Modifikation entwickelt, hat Zugriff auf Informationen, die die meisten Retail-Nutzer nie sehen. Gleichzeitig sind die Grenzen real: Daten-Lag, Abfrage-Limits, Indexer-Probleme. Kreuzprüfung mit anderen Quellen bleibt essentiell.

Wallet-Tracking-Tools wie Nansen, Arkham, Zapper und DeBank runden das Toolkit ab. Zapper und DeBank sind die praktischen Portfolio-Tracker für tägliche Nutzung — kostenlos, multi-chain, ausreichend für die meisten Retail-Bedürfnisse. Nansen und Arkham öffnen tiefere Intelligence-Funktionen, aber mit Kosten und interpretativen Fallstricken. Die wichtigste Disziplin ist: Wallet-Tracking als Aufmerksamkeits-Signal verstehen, nicht als Copy-Trade-Empfehlung. "Smart Money" ist nicht automatisch klug, und selbst wenn es klug ist, sind seine Ziele nicht deine Ziele.

Die persönliche Research-Routine integriert alles zu einer konsistenten Praxis. Die 15-Minuten-Minimum-Viable-Routine wöchentlich, erweitert bei Bedarf. Monatliche Deep-Audits für Approvals und Allokations-Review. Quartalsweise Strategie-Bewertung. Das Research-Journal als zentrales Werkzeug für Lernen und Entscheidungs-Dokumentation. Die ehrliche Lehre: Research-Disziplin ist wichtiger als Research-Tiefe. Eine einfache Routine, die Jahre durchgehalten wird, produziert besseren Effekt als aufwändige, die nach Monaten zusammenbricht.

Die übergreifende Philosophie des Moduls: On-Chain-Analyse ist Werkzeug, nicht Selbstzweck. Das Ziel ist nicht, viele Metriken zu verfolgen oder eindrucksvolle Dashboards zu haben. Das Ziel ist, bessere Entscheidungen zu treffen — konservativer, informierter, weniger anfällig für Hype und Manipulation. Die 5-Tool-Kompetenz (DeFiLlama, Etherscan, Dune, Zapper/DeBank, Nansen/Arkham) ist nicht Maximum, sondern adäquates Minimum für ernsthafte DeFi-Entscheidungen. Wer sie entwickelt, implementiert den wichtigsten strukturellen Vorteil, den Retail gegenüber Marketing-getriebenem Verhalten hat: informierte Entscheidungen auf Basis verifizierbarer Daten.

**Was in Modul 16 kommt:** Composability Risk und das Protocol Analysis Framework. Nach dem Aufbau von Analyse-Kompetenz (Modul 15) wenden wir diese gezielt auf eine der größten DeFi-spezifischen Risiko-Kategorien an: die Risiken, die aus der Verkettung mehrerer Protokolle entstehen. Wenn ein Lending-Protokoll ein Liquid Staking Derivative als Collateral akzeptiert, und das LSD-Protokoll Bridge-Assets nutzt, und die Bridge einen Oracle-Feed hat — dann hängt die Sicherheit der eigenen Position von vier unterschiedlichen Protokollen ab. Modul 16 baut ein systematisches Framework auf, um solche verketteten Risiken zu erkennen, zu bewerten und zu managen. Mit den Tools aus Modul 15 als Fundament wird Modul 16 zu einem konkreten Analyse-Workflow, den du auf jedes Protokoll anwenden kannst, in dem du investieren möchtest.

**Der direkte Bezug zwischen Analytics und Composability Risk:** On-Chain-Analytics liefert häufig die ersten sichtbaren Frühwarnsignale systemischer Risiken, bevor diese sich in offensichtlichen Problemen manifestieren — ungewöhnliche Reserve-Abflüsse aus einer Bridge, konzentrierte Rehypothekations-Muster bei einem LST, schleichende Peg-Abweichungen bei einem als Collateral akzeptierten Asset, auffällige Admin-Interaktionen bei einem Oracle-Feed. Diese Signale sind in der Regel on-chain lange vor ihrer öffentlichen Wahrnehmung erkennbar, aber sie werden nur sichtbar, wenn man weiß, wonach man sucht und mit welchen Tools man es findet. Modul 15 hat die Werkzeuge und die Methodik vermittelt; Modul 16 zeigt, wie man diese gezielt auf die spezifischste DeFi-Risiko-Klasse anwendet — die verketteten Abhängigkeiten zwischen Protokollen, die aus der Composability-Eigenschaft von DeFi selbst entstehen. Die Analytics-Kompetenz aus Modul 15 und das Composability-Framework aus Modul 16 bilden zusammen das integrierte Risiko-Management-Toolkit für jede ernsthafte DeFi-Strategie.

---

*Ende von Modul 15.*
