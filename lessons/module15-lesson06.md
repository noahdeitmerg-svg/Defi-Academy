# Building an Analytics Dashboard

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Ein eigenes Analytics-Dashboard aus den fünf Kern-Tools (Dune, DeFiLlama, Nansen, Arkham, TokenTerminal) konzeptionell entwerfen
- Die Tool-Rollen (Rohdaten, Aggregation, Entity-Intelligence, Wallet-Clustering, Fundamental-Metriken) klar zuordnen und überschneidungsfrei kombinieren
- KPIs für ein spezifisches Protokoll oder eine Position-Klasse systematisch definieren (TVL, Volume, Real Yield, User-Retention, Revenue-Multiplikator)
- Refresh-Logik und Alert-Schwellen für ein Monitoring-Dashboard praxisnah aufsetzen
- Ein einfaches Personal-Research-Dashboard (1-Seiten-Layout) für die eigene Portfolio-Überwachung praktisch aufbauen
- Typische Dashboard-Fehler (Metriken-Overload, unklare Baselines, fehlende Handlungs-Schwellen) erkennen und vermeiden

## Erklärung

Die ersten fünf Lektionen haben einzelne Tools im Detail behandelt — ihre Stärken, ihre Grenzen, ihre richtigen Fragen. In der Praxis stellt sich aber eine andere Frage: **Wie integrierst du diese Tools zu einem funktionierenden Monitoring-System?** Das ist die Dashboard-Frage, und sie ist die eigentliche Kunst der On-Chain-Analyse für fortgeschrittene Retail-Nutzer.

Ein Dashboard ist keine Liste aller verfügbaren Metriken. Ein Dashboard ist eine **bewusste Auswahl von Indikatoren**, die auf die spezifische Frage, die du beantworten willst, zugeschnitten sind. Die häufigste Fehldimension beim Dashboard-Bau ist Metriken-Overload: man stopft alles hinein, was interessant scheint, und das Ergebnis ist ein Cockpit, das man nicht lesen kann. Ein professionelles Dashboard hat drei Eigenschaften, die es nützlich machen: klare Fragen-Zuordnung, bewusste Metrik-Auswahl und definierte Handlungs-Schwellen.

**Die Tool-Rollen im integrierten Dashboard:**

Jedes der fünf Tools hat eine spezifische Rolle, die es besser erfüllt als die anderen. Wer sie überschneidungsfrei kombiniert, vermeidet Redundanz und erhöht die Dashboard-Effizienz.

- **DeFiLlama** ist das **Aggregations-Layer**. Seine Stärke ist protokoll-übergreifende Vergleichbarkeit: TVL, Yields, Chains, Bridges, Hacks. Nutze DeFiLlama für die "großen Bewegungen" — wie steht ein Protokoll im Wettbewerb, wo fließen Kapital-Ströme, welche Chain gewinnt.
- **Dune Analytics** ist das **Custom-Query-Layer**. Seine Stärke ist die Beantwortung spezifischer Fragen, die Standard-Dashboards nicht abdecken: "Wie viele einzelne Wallets haben in den letzten 30 Tagen auf Aave V3 ETH-Ethereum eine Health Factor unter 1,5 gehabt?" Dune gibt Antworten auf das, was du selbst fragst.
- **Nansen** ist das **Entity-Intelligence-Layer**. Seine Stärke sind gelabelte Wallets — Smart Money, Institutions, Funds. Nutze Nansen für die Frage "Wer bewegt Kapital?" — nicht für "Wie viel Kapital bewegt sich?"
- **Arkham** ist das **Wallet-Clustering-Layer**. Seine Stärke ist die Identifizierung verbundener Adressen, die hinter einer Entität stehen. Nutze Arkham, um zu verstehen, ob mehrere Wallets kollektiv agieren (z.B. eine Institution mit 20 Operational-Wallets).
- **TokenTerminal** ist das **Fundamental-Daten-Layer**. Seine Stärke sind Revenue, Fees, P/S-Ratios, Real Yield — Kennzahlen im klassischen Finance-Sinn. Nutze TokenTerminal für die Frage "Ist dieses Protokoll wirtschaftlich gesund oder nur Emissions-getrieben?"

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

## Folien-Zusammenfassung

Diese Lektion benötigt sieben Folien für die Video-Umsetzung.

**Folie 1: Titel und Überblick.** "Building an Analytics Dashboard — die integrative Praxis der On-Chain-Analyse." Fazit: aus fünf Tools ein funktionierendes System bauen.

**Folie 2: Die Tool-Rollen.** Fünf-Kreise-Diagramm: DeFiLlama (Aggregation), Dune (Custom-Queries), Nansen (Entities), Arkham (Clustering), TokenTerminal (Fundamentals). Jedes Tool mit einer klaren, nicht-überschneidenden Rolle.

**Folie 3: Das Drei-Layer-Modell.** Portfolio-Health, Protokoll-Monitoring, Markt-Kontext. Pro Layer: Fragestellung + passende Tools + Frequenz.

**Folie 4: KPI-Hierarchie.** Vital-KPI, Performance-KPI, Kontext-KPI. Jede Kategorie mit Beispielen und der Baseline-plus-Schwelle-Konvention.

**Folie 5: Refresh-Logik.** Zeit-Matrix: täglich (automatisiert), wöchentlich (manuell), monatlich (vertieft). Pro Frequenz: konkrete Aktionen.

**Folie 6: Personal-Research-Layout.** Schematische Darstellung des 1-Seiten-Dashboards: Portfolio-Übersicht oben, Protokoll-Health Mitte, Markt-Kontext unten, Action-Items am Ende.

**Folie 7: Typische Fehler und Iteration.** Metriken-Overload, fehlende Baselines, keine Handlungs-Schwellen. Plus: der 3-Monats-Entwicklungs-Zyklus.

## Sprechertext

*Sprechertext* (Sprechgeschwindigkeit 120-140 Wörter pro Minute, Zielvideo 10-12 Minuten):

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

## Visuelle Vorschläge

Vier Visualisierungen unterstützen diese Lektion.

**Visual 1: Tool-Rollen-Diagramm.** Fünf-Kreise-Schema mit DeFiLlama, Dune, Nansen, Arkham, TokenTerminal. Jeder Kreis hat einen klaren Rollen-Titel und 2-3 Stichpunkt-Beispiele. Überlappungen bewusst minimal gezeigt, um die Komplementarität zu betonen.

**Visual 2: Drei-Layer-Dashboard-Schema.** Drei horizontale Bänder übereinander: Portfolio-Health (täglich), Protokoll-Monitoring (wöchentlich), Markt-Kontext (monatlich). Pro Band: konkrete Metriken-Beispiele plus Tools-Zuordnung.

**Visual 3: Beispiel-Personal-Dashboard.** Ein Mock-up eines konkreten 1-Seiten-Dashboards für ein Beispiel-Portfolio (z.B. 50k USD in Aave, stETH, Curve LP). Mit echten Beispiel-Metriken, damit die Lernenden einen direkten Template haben.

**Visual 4: Iterations-Zyklus-Grafik.** Zeitachse über 12 Wochen: Woche 1 (initial), Woche 4 (Overload erkannt), Woche 8 (reduziert), Woche 12 (optimiert). Zeigt den realistischen Entwicklungs-Pfad.

## Übung

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

## Quiz

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

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → Tool-Rollen-Diagramm → Drei-Layer-Modell → KPI-Hierarchie → Refresh-Logik → Personal-Layout → Typische Fehler & Iteration
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 10–12 Min.)
- `visual_plan.json` — Tool-Rollen-Diagramm (5 Kreise), Drei-Layer-Dashboard-Schema, Beispiel-Personal-Dashboard-Mockup, Iterations-Zyklus-Grafik (12 Wochen)

Pipeline: Gamma → ElevenLabs → CapCut.

---
