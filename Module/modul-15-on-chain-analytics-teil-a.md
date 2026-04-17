# Modul 15 — On-Chain Analytics

## Teil A: Lektionen 1–3

**Zielgruppe:** Fortgeschrittene
**Geschätzte Dauer Teil A:** 50–60 Minuten
**Voraussetzungen:** Module 1–14 abgeschlossen (insbesondere Modul 3 Blockchain-Mechanik, Modul 9 DeFi-Risiken, Modul 13 veTokenomics, Modul 14 Cross-Chain)

---

## Modul-Überblick (gilt für Teil A und Teil B)

On-Chain Analytics ist die Disziplin, die aus öffentlich verfügbaren Blockchain-Daten handlungsrelevante Einsichten destilliert. Jede Transaktion, jede Position, jeder Token-Transfer auf Ethereum und den großen L2s ist öffentlich und permanent gespeichert. Dieser Datenfundus ist einzigartig in der Finanzgeschichte — in traditionellen Märkten existiert nichts Vergleichbares. Wer ihn lesen kann, hat einen strukturellen Informationsvorteil gegenüber denen, die nur Schlagzeilen und Kursdiagrammen folgen.

Gleichzeitig ist On-Chain-Analyse eine Disziplin, die leicht in zwei Fehlformen verfällt. Die erste Fehlform ist Datenblindheit — man schaut auf Zahlen, die oberflächlich eindrucksvoll wirken (hohes TVL, großes Volumen, viele Transaktionen), ohne zu verstehen, was sie bedeuten. TVL kann durch Rehypothekation mehrfach gezählt werden, Volumen kann Wash Trading sein, Transaktionen können Bot-Aktivität reflektieren. Die zweite Fehlform ist Datenfetisch — man glaubt, dass On-Chain-Daten die vollständige Wahrheit zeigen. Aber viele wichtige Kräfte in DeFi sind off-chain: Team-Entscheidungen, Social-Media-Stimmung, regulatorische Dynamik, technische Roadmaps. On-Chain-Daten sind eine wichtige Komponente der Analyse, nicht die Gesamtheit.

**Die konservative Perspektive:** On-Chain-Analyse ist ein Werkzeug zur Verbesserung von Entscheidungen, kein Ersatz für Urteilsvermögen. Das Ziel ist nicht, möglichst viele Metriken zu verfolgen, sondern die richtigen Fragen zu stellen und die passenden Daten zu finden, die sie beantworten. Ein disziplinierter Analyst nutzt drei bis fünf Kern-Tools konsequent und ignoriert die meisten anderen. Er weiß, was jede Metrik wirklich misst, und er kennt ihre Grenzen.

Dieses Modul behandelt fünf Lektionen, die zusammen eine vollständige Analyse-Praxis aufbauen:

1. **Die Philosophie der On-Chain-Analyse** — Was Daten zeigen, was sie verbergen, und wie man sinnvolle Fragen stellt
2. **DeFiLlama als zentrales Tool** — TVL, Yields, Bridges, Hacks, Chains in einem einzigen Interface
3. **Etherscan und Block-Explorer Mastery** — Transaktionen, Contracts und Approvals direkt lesen
4. **Dune Analytics und Custom Queries** — Eigene Dashboards für spezifische Fragen (Teil B)
5. **Wallet-Tracking und die persönliche Research-Routine** — Nansen, Arkham, Zapper, DeBank und wie man sie systematisch nutzt (Teil B)

**In Teil A behandeln wir Lektionen 1–3.** Diese drei Lektionen bilden das Fundament. Ohne das philosophische Verständnis aus Lektion 15.1 führen die späteren Tools zu Datenlawinen ohne Erkenntnis. Ohne DeFiLlama und Etherscan-Kompetenz fehlt die Basis für alles Weitere.

---

## Lektion 15.1 — Die Philosophie der On-Chain-Analyse

### Learning Objectives

After completing this lesson the learner will be able to:
- Erklären, was On-Chain-Daten fundamental zeigen können und welche strukturellen Grenzen sie haben
- Die drei Analyse-Ebenen unterscheiden: Protokoll-Metriken, Markt-Metriken, Wallet-Aktivität
- Typische Fehlinterpretationen (TVL-Doppelzählung, Wash Trading, Sybil-Aktivität) erkennen
- Eine konkrete Analyse-Frage so formulieren, dass sie mit On-Chain-Daten beantwortbar ist

### Explanation

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

Nützliche On-Chain-Analyse operiert auf drei klar unterscheidbaren Ebenen. Wer sie verwechselt, zieht falsche Schlüsse.

**Ebene 1: Protokoll-Metriken.**
Hier geht es um einzelne DeFi-Protokolle. Wie viel TVL hat Aave? Wie entwickelt sich die Utilization auf Compound? Welche Märkte sind besonders aktiv? Welche Oracle-Preise werden gepusht? Die Datenquelle sind primär die Smart Contracts des Protokolls selbst, plus Aggregatoren wie DeFiLlama. Die Zielgruppe dieser Analyse: Nutzer des Protokolls, potenzielle Nutzer, Protokoll-Teams.

**Ebene 2: Markt-Metriken.**
Hier geht es um aggregierte Dynamiken über viele Protokolle, Chains und Assets. Wie verteilt sich Kapital zwischen Chains? Welche Stablecoin-Volumina dominieren? Wie entwickelt sich das Gesamt-TVL in DeFi? Welche Narrative zeigen sich in den Flows? Die Datenquelle sind Dashboards wie DeFiLlama, Token Terminal, Artemis. Die Zielgruppe: Portfolio-Manager, Macro-Analysten, strategische Entscheider.

**Ebene 3: Wallet-Aktivität.**
Hier geht es um einzelne Adressen oder Entitäten. Was macht eine bestimmte Whale-Adresse? Wie bewegt Sky Mavis ihre Treasury? Welche Wallets haben vor dem Launch eines Tokens bereits akkumuliert? Die Datenquelle sind spezialisierte Tools wie Nansen, Arkham, Zapper. Die Zielgruppe: Wer spezifische Strategien tracken will (nachmachen oder vermeiden), Journalisten, Investigatoren.

**Warum die Unterscheidung wichtig ist:** Die gleiche Zahl hat auf verschiedenen Ebenen unterschiedliche Bedeutung. "Aave TVL ist um 20% gestiegen" auf Protokoll-Ebene kann positiv sein (Adoption). Dieselbe Zahl auf Markt-Ebene muss relativiert werden (ist das ganze DeFi-TVL mit gestiegen? Ist Aave relativ gewachsen?). Auf Wallet-Ebene ist die Frage noch spezifischer: Wer genau hat dieses zusätzliche Kapital gebracht?

**Die typischen Fehlinterpretationen**

**Fehler 1: TVL als Heiligtum.**
Total Value Locked ist die am häufigsten zitierte Metrik. Sie hat ernsthafte Probleme. Rehypothekation wird doppelt gezählt: wenn Nutzer ETH in Lido staken (1. Zählung) und dann stETH in Aave als Collateral hinterlegen (2. Zählung), erscheint dasselbe Kapital in beiden Protokoll-TVLs. Ein gesundes aggregiertes TVL-Bild müsste das bereinigen — die meisten Dashboards tun das nicht. Token-Preis-Volatilität ist ein weiteres Problem: ein Anstieg des TVL kann einfach Preisanstieg des im TVL enthaltenen Tokens sein, nicht neue Einlagen.

**Fehler 2: Volumen ohne Kontext.**
Ein DEX meldet 10 Mrd USD Volumen pro Tag. Beeindruckend? Vielleicht. Aber: Wie viel davon ist Wash Trading (gleiche Adresse handelt mit sich selbst oder wirtschaftlich verbundenen Adressen)? Wie viel ist MEV-Searcher-Aktivität, die eigentlich nur Gas-Arbitrage darstellt? Wie viel ist echtes Retail-Volumen? Das Roh-Volumen überschätzt systematisch die echte Aktivität.

**Fehler 3: Transaktions-Anzahl als Adoptions-Proxy.**
"Chain X hat doppelt so viele Transaktionen wie Chain Y!" klingt nach Adoptions-Führung. Kann aber auch bedeuten: Chain X hat deutlich niedrigere Gas-Kosten, weshalb Bots viele winzige Transaktionen fahren. Oder: Chain X hat ein spezifisches Ökosystem (Gaming, Airdrop-Farming), das hohe Transaktions-Zahlen generiert, aber geringe ökonomische Bedeutung. Aktive Adressen oder wertgewichtete Metriken sind aussagekräftiger.

**Fehler 4: Sybil-Blindheit.**
Eine scheinbar breite Nutzerbasis (viele Adressen, viele Nutzer) kann Sybil-Aktivität sein — eine einzelne Person oder Gruppe betreibt 10.000 Wallets, um Airdrops zu farmen oder Metriken zu blähen. Seriöse Analyse versucht, Sybil-Patterns zu identifizieren: gleiche Funding-Quelle, koordinierte Transaktions-Zeitpunkte, ähnliche Aktivitätsmuster. Ohne diese Bereinigung sind "Nutzer"-Zahlen oft massiv überschätzt.

**Fehler 5: Korrelation mit Kausation verwechseln.**
"Als Wallet X kaufte, stieg der Kurs" — das kann Ursache-Wirkung sein oder Zufall. Viele Wal-Watchers überinterpretieren Korrelationen. Ein einzelner großer Kauf ist oft weniger wichtig als die gesamte Markt-Dynamik zum Zeitpunkt des Kaufs.

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

### Slide Summary

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

### Voice Narration Script

**[Slide 1]** Modul 15 beginnt nicht mit Tools, sondern mit Philosophie. Das ist eine bewusste Entscheidung. Wer die Tools vor dem Denken lernt, produziert Datenlawinen ohne Erkenntnis. Wer das Denken zuerst lernt, nutzt die Tools gezielt.

**[Slide 2]** On-Chain-Daten sind fundamental ein öffentliches, permanentes Register aller Transaktionen seit Ethereum Genesis. Jede Adresse, jede Transaktion, jeder Smart-Contract-Call ist lesbar — nicht nur vom Netzwerk selbst, sondern von jedem Menschen mit einem Block-Explorer. Das ist ein kategorialer Unterschied zu traditionellen Finanzsystemen, wo nur Banken und Regulatoren solche Einblicke haben. In DeFi hat jeder Analyst die gleichen Roh-Daten wie das Protokoll-Team selbst.

**[Slide 3]** Daraus ergeben sich vier strukturelle Fähigkeiten. Erstens: Verifikation statt Vertrauen. Wenn ein Protokoll 5 Milliarden TVL behauptet, kann man das direkt prüfen — Smart-Contract-Balances, nicht PR-Reports. Zweitens: Historische Kontinuität. Nicht nur der aktuelle Stand, sondern jede Veränderung in der Vergangenheit ist rekonstruierbar. Drittens: Aggregatanalyse. Muster über tausende Adressen erkennen, nicht nur Einzeltransaktionen. Viertens: Entitäts-Tracking. Labels verknüpfen Adressen mit bekannten Entitäten — Exchanges, Protokolle, identifizierte Whales. Flow-Analysen werden möglich.

**[Slide 4]** Gleichzeitig sind die Grenzen wichtig. On-Chain zeigt nicht die Motivation — man sieht, dass 1000 ETH verkauft wurden, nicht warum. Nicht die Identität — viele Adressen bleiben pseudonym. Nicht die Off-Chain-Entscheidungen — Team-Meetings, regulatorische Gespräche, VC-Verhandlungen passieren off-chain. Nicht die sozialen Dynamiken — Narrative und Hype-Zyklen entwickeln sich auf Twitter und in Discord, nicht in Smart-Contract-Calls. Nicht die Intention — nur die tatsächlichen Transaktionen, nicht, was geplant war.

**[Slide 5]** Nützliche On-Chain-Analyse operiert auf drei klar unterscheidbaren Ebenen. Protokoll-Metriken: einzelne DeFi-Protokolle, ihre TVL, ihre Utilization, ihre Nutzung. Markt-Metriken: aggregierte Dynamiken über viele Protokolle und Chains, Kapital-Flows, Narrative-Bildung. Wallet-Aktivität: einzelne Adressen oder Entitäten, Whale-Positionen, Treasury-Bewegungen. Die gleiche Zahl hat auf verschiedenen Ebenen unterschiedliche Bedeutung. Wer sie verwechselt, zieht falsche Schlüsse.

**[Slide 6]** Fünf typische Fehlinterpretationen, die man vermeiden muss. Erstens: TVL als Heiligtum behandeln. Rehypothekation wird doppelt gezählt — wenn Nutzer ETH staken und dann stETH als Collateral hinterlegen, erscheint dasselbe Kapital in beiden TVLs. Zweitens: Volumen ohne Kontext interpretieren. Wash Trading und MEV-Aktivität blähen das scheinbare Volumen. Drittens: Transaktions-Anzahl als Adoption gleichsetzen. Viele Transaktionen können Bot-Aktivität bedeuten, nicht ökonomisch relevante Nutzung. Viertens: Sybil-Blindheit. Eine scheinbar breite Nutzerbasis kann durch einzelne Entitäten mit tausenden Wallets erzeugt sein. Fünftens: Korrelation mit Kausation verwechseln. Ein einzelner Wal-Kauf ist selten die Ursache der nachfolgenden Preisbewegung.

**[Slide 7]** Gute Analyse beginnt mit einer präzisen Frage. Drei Eigenschaften macht eine Frage gut. Sie ist mit verfügbaren Daten beantwortbar — "Wird Aave überleben?" nein, "Wie hat sich Aaves Utilization entwickelt?" ja. Sie führt zu einer Entscheidung — Analyse ohne Entscheidungsrelevanz ist akademisch. Sie ist falsifizierbar — eine klare Antwort, die durch Daten bestätigt oder widerlegt werden kann.

**[Slide 8]** Der Analyse-Workflow folgt sechs Schritten. Frage formulieren. Datenquelle identifizieren. Daten extrahieren. Plausibilitäts-Prüfung gegen andere Quellen. Interpretation. Entscheidung. Wer diese Schritte routiniert durchläuft, betreibt Analyse. Wer direkt zu Schritt fünf springt — Interpretation ohne Daten-Grundlage — betreibt Spekulation mit analytischem Anstrich. In den folgenden Lektionen lernen wir die konkreten Tools, die jeden dieser Schritte unterstützen.

### Visual Suggestions

**[Slide 1]** Titelfolie.

**[Slide 2]** Split-Screen-Vergleich: links eine traditionelle Bank mit verschlossenen Archiven, rechts eine transparente Blockchain mit sichtbaren Transaktionsflüssen. Das Konzept visualisieren.

**[Slide 3]** Vier-Quadranten-Diagramm mit jeweils Icon für die vier Fähigkeiten: Lupe (Verifikation), Uhr (Historische Kontinuität), Netzwerk (Aggregatanalyse), Tag (Entitäts-Tracking).

**[Slide 4]** Fünf-Punkte-Liste mit rotem "durchgestrichenem" Icon: Motivation, Identität, Off-Chain-Entscheidungen, Soziale Dynamiken, Intention. Visuelle Betonung der Grenzen.

**[Slide 5]** Drei-Ebenen-Pyramide: Wallet-Aktivität unten (viele Datenpunkte, niedrige Aggregation), Protokoll-Metriken Mitte, Markt-Metriken oben (hoch aggregiert, wenige aber bedeutsame Datenpunkte).

**[Slide 6]** Fünf-Beispiele-Tafel: jeweils ein typischer Chart mit rotem Kreuz und darunter die Realität. Plakative Visualisierung der Fehlinterpretationen.

**[Slide 7]** **SCREENSHOT SUGGESTION:** DeFiLlama-Hauptseite (defillama.com) als Einstiegspunkt zur Analyse — zeigt das Ökosystem der verfügbaren Daten.

**[Slide 8]** Workflow-Diagramm: Sechs Kästen verbunden durch Pfeile (Frage → Quelle → Daten → Plausibilität → Interpretation → Entscheidung), mit den Tools, die in den folgenden Lektionen behandelt werden, jeweils rechts zugeordnet.

### Exercise

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

---

## Lektion 15.2 — DeFiLlama als zentrales Tool

### Learning Objectives

After completing this lesson the learner will be able to:
- Die Struktur von DeFiLlama und seine wichtigsten Sektionen (Protocols, Chains, Yields, Bridges, Hacks) navigieren
- TVL-Daten in verschiedenen Bereinigungs-Varianten (inkl./exkl. double counting, borrowed, staking) interpretieren
- Yield-Pages sinnvoll filtern und die typischen Fallen (impermanent loss, Incentive-Expiry, Risk-Score) erkennen
- Chain-Level-Analysen und Bridge-Flow-Daten für eigene Strategien nutzen

### Explanation

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

### Slide Summary

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

### Voice Narration Script

**[Slide 1]** DeFiLlama ist das wichtigste einzelne Tool in der On-Chain-Analyse-Toolbox. In dieser Lektion gehen wir durch, wie man es systematisch nutzt — nicht nur oberflächlich scrollt, sondern als echtes Analyse-Instrument einsetzt.

**[Slide 2]** Es gibt mehrere Gründe, warum DeFiLlama zum Standard geworden ist. Erstens: kostenlos und open-source, die Methodologien sind öffentlich dokumentiert. Zweitens: breite Abdeckung, über 3000 Protokolle auf über 200 Chains. Drittens: das Team ist bekannt für kritisches Denken — sie zählen TVL differenziert, mit und ohne Doppelzählung, nicht nur die marketing-freundliche Maximal-Zahl. Für Retail-Analysten ist DeFiLlama der Einstiegspunkt für fast jede Frage.

**[Slide 3]** Die Plattform gliedert sich in sieben zentrale Sektionen, die jeweils spezifische Zwecke erfüllen. Protocols für einzelne DeFi-Protokolle. Chains für Kapital-Verteilung zwischen Blockchains. Yields für Rendite-Opportunities. Bridges für Cross-Chain-Flows. Hacks für das historische Exploit-Archiv. Stablecoins für Stablecoin-Marktanalysen. Derivatives für Optionen und Perps. Wer diese sieben Sektionen fließend navigiert, hat ein vollständiges Analyse-Grundgerüst.

**[Slide 4]** TVL ist die zentralste und am häufigsten missverstandene Metrik. DeFiLlama bietet mehrere Varianten an. Das Default-TVL enthält alle Positionen inklusive rehypothekierte. TVL mit Borrowed zählt geliehene Werte mit. TVL mit Staking zählt gestaktes ETH bei Lido und anderen. Pool2 sind LP-Tokens mit dem Protokoll-Token selbst. Doublecounted Adjusted ist die bereinigte Zahl ohne Doppelzählungen. Für die Gesamt-DeFi-Einschätzung ist die bereinigte Zahl die relevantere — nicht die Summe aller Protokoll-TVLs. Wenn jemand eine TVL-Zahl zitiert, frage immer: welche Variante?

**[Slide 5]** Die Yield-Page ist eine der gefährlichsten Sektionen, weil sie Tausende Opportunities mit bis zu dreistelligen APYs zeigt. Die natürliche Tendenz ist, nach höchsten APYs zu filtern — fast immer ein Fehler. Die richtigen Filter: TVL über zehn Millionen Dollar, Chain passend zur eigenen Allokations-Strategie, Risk-Score prüfen. Base APY ist die nachhaltige Rendite aus Fees und Zinsen. Reward APY ist Token-Emission, läuft aus. Immer die 7-Tage- und 30-Tage-Durchschnitte prüfen, nicht Tages-Spikes.

**[Slide 6]** Typische Fallen auf der Yield-Page. Expiring Incentives — ein Pool zeigt 35 Prozent APY, aber das Rewards-Programm läuft in zwei Wochen aus. Die zukünftige APY ist viel niedriger. Farmed Token Dumping — wenn der Reward-Token wenig Liquidität hat, entsteht beim Verkauf Slippage und Preis-Druck. Die realisierte Rendite ist deutlich unter der nominalen. Neue Pools unter 30 Tagen Alter haben oft hohe APYs, sind aber untestet. Nicht-auditierte Protokolle — das Audit-Status-Feld prüfen, bei jungen Protokollen mit hohen APYs besonders.

**[Slide 7]** Zwei weitere kritische Sektionen. Die Bridges-Seite für Kapitalfluss-Analyse. Welche Chains gewinnen Netto-Inflows, welche verlieren? Migriert Kapital von Ethereum zu Base? Die 30-Tage-Flow-Daten zeigen echte Trends, nicht nur Einzelereignisse. Die Hacks-Seite als historisches Archiv. Filterbar nach Kategorie, Chain, Betrag, Jahr. Für jedes Protokoll-Typ — Bridge, Lending, DEX — zeigen sich spezifische Angriffs-Muster. Die Post-Mortem-Links sind der beste Lehrweg über DeFi-Risiken.

**[Slide 8]** Ein konkretes Workflow-Beispiel. Frage: soll ich meine Aave-Position auf Ethereum oder Arbitrum halten? Schritt eins: Protocols-Sektion, Aave-Detail-Seite, TVL-Verteilung nach Chain prüfen. Schritt zwei: Yields-Sektion, aktuelle APYs vergleichen, Base vs Reward trennen. Schritt drei: Chains-Sektion, wie entwickelt sich Arbitrum insgesamt? Schritt vier: Bridges-Sektion, Flows zwischen Ethereum und Arbitrum. Schritt fünf: Hacks-Sektion, historische Vorfälle. Schritt sechs: Synthese und Entscheidung. Diese Analyse dauert 15 bis 20 Minuten und liefert strukturierte, evidenz-basierte Entscheidungen. Das ist DeFiLlama-Analyse in der Praxis — nicht oberflächliches Scrollen, sondern systematisches Navigieren mit klarer Frage.

### Visual Suggestions

**[Slide 1]** Titelfolie.

**[Slide 2]** **SCREENSHOT SUGGESTION:** DeFiLlama-Hauptseite (defillama.com) mit sichtbarer Gesamt-TVL-Metrik, Chain-Verteilung und Top-Protokolle. Zeigt den "Einstiegspunkt" in die Plattform.

**[Slide 3]** Navigation-Diagramm: DeFiLlama-Startseite in der Mitte, sieben Sektionen als Abzweigungen mit Icons und Ein-Satz-Beschreibungen.

**[Slide 4]** **SCREENSHOT SUGGESTION:** DeFiLlama mit aktivierter "Doublecount"-Toggle — zeigt den Unterschied zwischen Default-TVL und bereinigter Zahl (oft 20-40% Differenz).

**[Slide 5]** **SCREENSHOT SUGGESTION:** DeFiLlama-Yields-Page (defillama.com/yields) mit aktivierten Filtern (TVL > $10M, Chain = Ethereum, IL Risk = A). Zeigt die typische disziplinierte Nutzung.

**[Slide 6]** Vier-Kasten-Diagramm der Yield-Fallen: Expiring Incentives, Farmed Token Dumping, Neue Pools, Nicht-auditierte Protokolle. Jeweils Icon und Ein-Satz-Warnung.

**[Slide 7]** **SCREENSHOT SUGGESTION:** DeFiLlama-Bridges-Page (defillama.com/bridges) mit sichtbarem Netto-Flow-Chart. Zeigt Kapital-Migration visuell.

**[Slide 8]** Workflow-Diagramm als Zeitstrahl: sechs Schritte der Analyse-Sitzung, jeweils mit der Sektion, die konsultiert wird, und dem Zeit-Investment (15-20 Minuten total).

### Exercise

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

---

## Lektion 15.3 — Etherscan und Block-Explorer Mastery

### Learning Objectives

After completing this lesson the learner will be able to:
- Adressen auf Etherscan sicher interpretieren und EOAs von Contracts unterscheiden
- Transaktions-Details vollständig lesen: Method, Gas, Value, Input Data, Logs, Internal Transactions
- Smart-Contract-Seiten navigieren: Code, Read/Write Contract, Events, Holders
- Token-Approvals auf Etherscan direkt prüfen und verwalten
- L2-spezifische Explorer (Arbiscan, Basescan, Optimistic Etherscan) und ihre Besonderheiten nutzen

### Explanation

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

**Internal Transactions:** Wenn ein Contract andere Contracts aufruft (was in DeFi ständig passiert), sind das interne Transaktionen. Z.B. bei einem DEX-Swap: die Haupt-Transaktion ruft den Router auf, der Router ruft das Pair, das Pair transferiert Tokens — alles interne Transaktionen. Zeigt die vollständige Ausführungs-Kette.

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

### Slide Summary

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

### Voice Narration Script

**[Slide 1]** Nach DeFiLlama, das aggregiert und interpretiert, kommen wir zu Etherscan, das die Rohdaten zeigt. Jede seriöse Analyse endet früher oder später bei Etherscan, weil es die einzige Quelle exakter, verifikatorischer Informationen ist. In dieser Lektion lernen wir, diesen Block-Explorer systematisch zu navigieren.

**[Slide 2]** Etherscan ist aus drei Gründen zentral. Erstens: autoritative Daten, keine aggregierten Näherungen. Wenn jemand behauptet, ein Protokoll habe 500 Millionen Dollar Collateral, ist Etherscan die Quelle zur direkten Verifikation. Zweitens: das Interface ist auf allen EVM-Chains identisch. Arbiscan, Basescan, Optimistic Etherscan — wer Etherscan beherrscht, navigiert die anderen intuitiv. Drittens: drei praktische Use-Cases machen es unverzichtbar. Verifikation von Behauptungen. Investigation ungewöhnlicher Aktivität. Direkte Interaktion mit Contracts, wenn Frontends fehlen.

**[Slide 3]** Grundlegende Unterscheidung: jede Ethereum-Adresse ist entweder ein EOA oder ein Contract. EOA — Externally Owned Account — ist von einem privaten Schlüssel kontrolliert, gehört einer Person oder einem Multisig, hat keinen Code. Contract ist ein Smart Contract mit Code, wird bei Deployment erzeugt, führt komplexe Logik aus. Etherscan markiert Contracts mit einem eigenen Tab. Adress-Labels sind wichtige Hinweise: Verifizierte sind solide, User-submitted brauchen Vorsicht, unlabeled sind die Mehrheit.

**[Slide 4]** Transaktions-Details haben mehrere kritische Felder. Hash als einzigartige ID. Status — Success oder Failed. From und To. Value — ETH-Menge, die mitgeschickt wird. Method — welche Funktion des Contracts aufgerufen wurde, zum Beispiel Swap oder Deposit. Input Data enthält die exakten Parameter. Logs, oder Events, zeigen, was wirklich passiert ist — oft klarer als die Method. Internal Transactions zeigen die Kette der Contract-Aufrufe. Eine praktische Lese-Strategie: Method prüfen, From/To prüfen, Value prüfen, Logs analysieren, bei Komplexität die Internal Transactions durchgehen.

**[Slide 5]** Auf einer Contract-Seite hat man mehrere Tabs. Transactions zeigt alle Transaktionen, die den Contract involvieren. Contract zeigt den Source Code, wenn verifiziert — ein positives Signal. Read Contract erlaubt View-Funktionen direkt aufzurufen, ohne Gas zu zahlen. Write Contract erlaubt state-ändernde Funktionen, erfordert Wallet-Verbindung. Events zeigen historische Aktivität granular. Holders, bei Token-Contracts, zeigt die Verteilung der Token-Besitzer — wichtig für Konzentrations-Analyse.

**[Slide 6]** Token Approvals sind die wichtigste praktische Nutzung für Retail. Jede DeFi-Interaktion beginnt mit einer Approval. Viele Frontends setzen standardmäßig Unlimited Approvals — der Contract kann alle aktuellen und zukünftigen Tokens dieser Art abziehen, für immer, es sei denn man revoked. Etherscan hat einen Approval Checker: URL tokenapprovalchecker, Wallet-Adresse eingeben, alle aktiven Approvals werden aufgelistet mit Revoke-Button. Die Routine: monatlich die eigene Wallet durchschicken, Approvals zu nicht mehr genutzten Protokollen zurückziehen. Das ist eine Alternative oder Ergänzung zu revoke.cash.

**[Slide 7]** Jede L2 hat ihren eigenen Explorer. Arbiscan für Arbitrum, Basescan für Base, Optimistic Etherscan für Optimism, Polygonscan für Polygon. Funktional sind sie identisch zu Etherscan. Die Besonderheiten sind meist kosmetisch. Bei Optimistic Rollups zeigen die Explorer die zwei Finalization-Stufen: soft-finalized nach Sequencer-Commit, hard-finalized nach 7-Tage-Challenge-Period. Das Gas-Modell der L2s wird in zwei Komponenten angezeigt: L2-Gas plus L1-Submission-Cost. Im Alltag: wichtig ist nur, den richtigen Explorer für die richtige Chain zu nutzen.

**[Slide 8]** Drei Advanced-Techniken, die über Standard-Nutzung hinausgehen. Event-Filtering: auf der Events-Page eines Contracts kann man nach Event-Typ filtern, für granulare historische Analyse. Proxy-Contracts: viele Protokolle nutzen Upgrade-Patterns, bei denen der User-Contract ein Proxy ist und die Logik an einen Implementation-Contract delegiert. Etherscan hat eine Read-as-Proxy-Funktion, die das Implementation-Interface offenlegt. Debug Transaction: für einige Transaktionen ist ein kompletter Call-Trace verfügbar — wichtig für Hack-Analysen. Diese Techniken sind für Power-User, aber gut zu kennen, wenn komplexere Fragen auftauchen.

### Visual Suggestions

**[Slide 1]** Titelfolie.

**[Slide 2]** Vergleichs-Diagramm: DeFiLlama (aggregiert, interpretiert) vs Etherscan (Raw, Autoritativ). Visuelle Trennung der Rollen.

**[Slide 3]** **SCREENSHOT SUGGESTION:** Etherscan-Adressseite einer bekannten Entität (z.B. Vitaliks öffentliche Adresse) — zeigt die Seiten-Struktur, Labels und Transaktions-Historie.

**[Slide 4]** **SCREENSHOT SUGGESTION:** Etherscan-Transaktionsdetail einer Uniswap-Swap-Transaktion, sichtbar mit Method, Logs (Transfer-Events), Internal Transactions. Zeigt die vollständige Tx-Struktur.

**[Slide 5]** **SCREENSHOT SUGGESTION:** Etherscan-Contract-Page eines bekannten Protokolls (z.B. Aave V3 Pool), sichtbar mit allen Tabs: Transactions, Contract (verified), Read/Write, Events, Holders.

**[Slide 6]** **SCREENSHOT SUGGESTION:** Etherscan Token Approval Checker mit einer Beispiel-Wallet, zeigt mehrere aktive Approvals inkl. Unlimited vs Limited. Demonstriert die monatliche Review-Routine.

**[Slide 7]** Vier-Logo-Grid: Etherscan, Arbiscan, Basescan, Optimistic Etherscan, Polygonscan. Plus Hinweis auf blockscan.com als chain-übergreifende Suche.

**[Slide 8]** Advanced-Techniken-Diagramm: drei Icons (Filter, Proxy-Chain, Debug) mit Kurz-Beschreibungen als Power-User-Referenzen.

### Exercise

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
Wähle eine deiner komplexesten historischen Transaktionen (z.B. einen DEX-Swap mit Multi-Hop-Route). Öffne sie. Analysiere:
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

---

## Hinweis: Ende von Teil A

Du hast Lektionen 15.1, 15.2 und 15.3 abgeschlossen — die philosophische Grundlage, DeFiLlama als zentralen Analyse-Hub und Etherscan als autoritative Rohdaten-Quelle. Diese drei Lektionen bilden das Fundament für jede weitere On-Chain-Analyse.

In **Teil B** behandeln wir:

- **Lektion 15.4:** Dune Analytics und Custom Queries — Eigene Dashboards für spezifische Fragen, die die Standard-Tools nicht beantworten
- **Lektion 15.5:** Wallet-Tracking und die persönliche Research-Routine — Nansen, Arkham, Zapper, DeBank und wie man sie systematisch in einen wöchentlichen Research-Rhythmus integriert

Plus: Modul-Abschluss-Quiz (5 integrative Fragen) und Modul-Zusammenfassung, die alle fünf Lektionen in eine konsolidierte Analyse-Praxis synthetisiert.

Teil B überführt das Wissen aus Teil A in aktive Research-Workflows, die regelmäßige, disziplinierte Informations-Beschaffung für deine DeFi-Entscheidungen aufbauen.

---

*Ende von Teil A.*
