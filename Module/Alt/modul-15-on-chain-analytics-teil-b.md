# Modul 15 — On-Chain Analytics

## Teil B: Lektionen 4–5, Modul-Quiz und Zusammenfassung

**Zielgruppe:** Fortgeschrittene
**Geschätzte Dauer Teil B:** 50–60 Minuten
**Voraussetzungen:** Modul 15 Teil A abgeschlossen

---

Dies ist Teil B von Modul 15. In Teil A haben wir die philosophische Grundlage der On-Chain-Analyse gelegt, DeFiLlama als zentrales Aggregations-Tool und Etherscan als autoritative Rohdaten-Quelle systematisch durchgearbeitet. In Teil B erweitern wir das Toolkit um zwei weitere kritische Komponenten: Dune Analytics für individuelle, SQL-basierte Analysen und die Wallet-Tracking-Tools (Nansen, Arkham, Zapper, DeBank) für Adress- und Portfolio-Analyse. Am Ende fügen wir alles in eine persönliche Research-Routine zusammen, die wöchentlich und monatlich durchgeführt werden kann.

---

## Lektion 15.4 — Dune Analytics und Custom Queries

### Learning Objectives

After completing this lesson the learner will be able to:
- Dune Analytics als SQL-basierte Query-Plattform positionieren und seinen Unterschied zu aggregierten Dashboards verstehen
- Community-Dashboards effizient finden und für eigene Fragen nutzen
- Die Basis-Struktur von Dune-Queries lesen und leichte Anpassungen vornehmen
- Einschätzen, wann Custom Queries sinnvoll sind und wann man bei etablierten Tools bleiben sollte

### Explanation

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

### Slide Summary

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

### Voice Narration Script

**[Slide 1]** Dune Analytics ist das dritte Werkzeug in unserem On-Chain-Analyse-Stack. Es füllt eine spezifische Lücke zwischen DeFiLlamas aggregierten Dashboards und Etherscans granularem Transaktions-View. In dieser Lektion lernen wir, es effizient zu nutzen — ohne selbst zum SQL-Experten werden zu müssen.

**[Slide 2]** Dune ist technisch eine SQL-basierte Query-Plattform. Blockchain-Daten — Transaktionen, Events, Transfers, Contract-Calls — werden in relationale Tabellen indiziert. Nutzer fragen mit Standard-SQL ab. Das Ergebnis sind Tabellen oder Diagramme, alles im Browser, ohne lokale Infrastruktur. Die wahre Stärke ist nicht die Query-Fähigkeit selbst, sondern die Community. Zehntausende öffentliche Dashboards existieren, gebaut von professionellen Analysten, frei zugänglich. Der realistische Retail-Workflow: die richtige Frage formulieren, das passende Community-Dashboard finden, dort die Daten abgreifen.

**[Slide 3]** Die Unterscheidung zu DeFiLlama ist wichtig. DeFiLlama ist ein kuratiertes Dashboard mit festen Views — für die häufigsten Fragen bereits optimiert, konsistent über Protokolle, qualitätskontrolliert. Dune ist offen — jede beliebige Frage ist beantwortbar, wenn die Daten da sind, mit tieferer Granularität. Für Standard-Fragen wie TVL-Vergleich und Yield-Suche ist DeFiLlama effizienter. Für spezifische Fragen wie "welche Wallets haben in den letzten 7 Tagen neue Pendle-Positionen über 100.000 Dollar aufgebaut?" wird Dune notwendig.

**[Slide 4]** Community-Dashboards finden ist der zentrale Skill. Vier Strategien. Erstens: Protokoll-spezifische Suche — große Protokolle haben oft mehrere Community-Dashboards plus manchmal ein offizielles Team-Dashboard, letztere sind oft am gründlichsten. Zweitens: Top-Autoren folgen — hagaetc, 0xKhmer, rchen8, 21co sind bekannte Namen mit konsistenter Qualität. Drittens: Keyword-Suche spezifisch, nicht generisch. Viertens: Twitter-Bookmarks über Zeit aufbauen, wenn gute Dune-Analysen in Feeds auftauchen.

**[Slide 5]** Qualitäts-Check ist nötig — nicht jedes Dashboard ist zuverlässig. Positive Indikatoren: bekannte Autoren mit Track Record, recente Aktualisierung, Konsistenz mit anderen Quellen wie DeFiLlama, klarer Fokus auf eine spezifische Frage. Negative Indikatoren: fehlende Achsen-Labels, unverständliche Queries ohne Erklärung, Datenlawinen ohne Interpretation. Wenn eine Zahl von DeFiLlama deutlich abweicht, ist das ein Trigger für Misstrauen — nicht automatisch gegen Dune, aber für tiefere Untersuchung.

**[Slide 6]** Query-Basics zu verstehen hilft beim Lesen, auch wenn man nie selbst schreibt. Fünf zentrale SQL-Elemente: SELECT wählt Spalten, FROM wählt die Tabelle, WHERE filtert, GROUP BY aggregiert, ORDER BY sortiert. Häufige Dune-Tabellen: ethereum.transactions, ethereum.logs, erc20.transfers und protokoll-spezifische Tabellen wie aave_v3_ethereum. Für andere Chains analog: arbitrum.transactions, base.transactions. Wer diese Basis kennt, kann die meisten Dashboard-Queries grob verstehen.

**[Slide 7]** Der pragmatische Einstieg für Nicht-Entwickler: Query-Duplizierung. Wenn ein Dashboard fast, aber nicht ganz, deine Frage beantwortet — fork den Query, mach kleine Anpassungen. Andere Adresse einsetzen, Zeitraum anpassen, Filter-Kriterien ändern. Das funktioniert oft ohne tiefgehende SQL-Kenntnisse. Wer ungefähr versteht, wo die Adress-Filter stehen, kann sie austauschen. Das ist der realistische aktive Einstieg, ohne einen SQL-Kurs absolvieren zu müssen.

**[Slide 8]** Die ehrliche Einordnung: Dune ist mächtig, aber nicht das primäre Tool für typische Retail-Entscheidungen. 80 bis 90 Prozent aller Retail-Analyse-Fragen sind durch DeFiLlama plus Etherscan beantwortbar. Dune ergänzt für Spezialfragen — Protokoll-Tiefe, eigene Setups, wiederkehrende Metriken, die keine Standard-Quelle abbildet. Realistische Retail-Routine: monatlich zwei bis drei Dune-Dashboards konsultieren für spezifische Fragen. Kein tägliches Deep-Diving. Kein Aufbau eigener Custom-Query-Bibliothek für Standard-Situationen. Wer aktiver Analyst werden will, steigt tiefer ein. Für alle anderen reicht Community-Dashboard-Nutzung vollständig aus.

### Visual Suggestions

**[Slide 1]** Titelfolie.

**[Slide 2]** **SCREENSHOT SUGGESTION:** Dune Analytics Discover-Seite (dune.com/browse/dashboards) mit Übersicht der Community-Dashboards, verschiedenen Kategorien und Sortierungs-Optionen.

**[Slide 3]** Vergleichs-Diagramm: DeFiLlama als "Supermarkt mit fertigen Produkten" vs Dune als "Werkstatt mit Werkzeugen". Visuelle Metapher für die unterschiedlichen Ansätze.

**[Slide 4]** **SCREENSHOT SUGGESTION:** Beispiel eines qualitativ hochwertigen Community-Dashboards (z.B. von @hagaetc oder @21co), das eine konkrete Protokoll-Analyse zeigt.

**[Slide 5]** Qualitäts-Checkliste als visueller Block: positive und negative Indikatoren gegenübergestellt, mit Häkchen und Kreuzen.

**[Slide 6]** **SCREENSHOT SUGGESTION:** Dune-Query-Editor mit sichtbarem SQL-Code und darunter dem gerenderten Chart. Zeigt die Beziehung zwischen Query und Ergebnis.

**[Slide 7]** Workflow-Diagramm für Query-Duplizierung: Dashboard finden → Query öffnen → Fork → Anpassen → Ausführen. Fünf-Schritt-Visualisierung.

**[Slide 8]** Pyramide der Analyse-Tools: Basis breit (DeFiLlama, Etherscan — für die meisten Fragen), Mitte schmaler (Dune — für Spezialfragen), Spitze minimal (Custom Queries — für echte Experten).

### Exercise

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

Dune Pro bietet erweiterte Limits, Private Queries, schnellere Ausführung und einige Premium-Datensätze. Für die meisten Retail-Nutzer ist die Frage: rechtfertigt der Nutzen die Kosten? **Die Free-Tier-Realität:** Die kostenlose Stufe erlaubt unbegrenzte Nutzung öffentlicher Dashboards. Query-Erstellung ist erlaubt, aber mit Limits (bestimmte Anzahl Executions pro Tag, Query-Timeout-Beschränkungen, keine Private Queries). Für die 90% der Retail-Analyse-Use-Cases — Dashboard-Browsing, gelegentliche Query-Forks — reicht das vollständig. Wer monatlich 2-5 Dashboards konsultiert und gelegentlich kleine Anpassungen macht, hat keinen Bedarf für Pro. **Wann Pro sich lohnt:** **Szenario 1: Aktive Alpha-Suche.** Wer DeFi als Hauptbeschäftigung betreibt, nach Informations-Vorteilen sucht und eigene Thesen testen will, braucht Custom Queries häufig. Eine Pro-Subscription für $500/Jahr ist im Verhältnis zu Portfolio-Größen ab $100K eine kleine Kostenkomponente. Wenn bessere Analyse zu nur 1% bessere Jahresperformance führt, amortisiert sich Pro bei einem $50K-Portfolio bereits. **Szenario 2: Research-Produktion.** Wer Analysen öffentlich publiziert (Substack, Twitter-Threads, YouTube) oder als Berater arbeitet, braucht die Tools. Private Queries, schnelle Iteration, bessere Performance sind professionelle Anforderungen. **Szenario 3: Spezifische strategische Bedarfe.** MEV-Research, Whale-Tracking für Replication-Strategien, statistische Arbitrage zwischen Protokollen — alle diese Spezialisierungen erfordern intensive Custom-Query-Arbeit. **Wann die Free-Tier ausreicht:** **Kriterium 1: Portfolio-Größe < $50K.** Die Mehrwert-Schwelle für $500/Jahr erfordert signifikante Portfolio-Performance-Effekte. Bei kleineren Portfolios überwiegt das Kostenverhältnis den potenziellen Analysenutzen. **Kriterium 2: Konservative Strategie.** Wer sich an die Academy-Philosophie hält — 7-8% Jahresrendite, konservative Allokations, wenige Bridge-Operationen pro Jahr — braucht keine intensive Custom-Analyse. Die Entscheidungen basieren auf Allokations-Philosophie, nicht auf Short-Term-Daten. **Kriterium 3: Tool-Abdeckung durch andere Quellen.** DeFiLlama + Etherscan + monatliche Nansen/Arkham-Queries decken die meisten Retail-Fragen ab. Dune ist der "letzte Prozent"-Tool für Spezialisten. **Kriterium 4: Zeit-Budget.** Dune-Pro rentiert sich nur, wenn man wirklich die Zeit aufbringt, es zu nutzen. Eine Subscription, die man einmal monatlich öffnet, ist ineffiziente Ressourcen-Allokation. **Die Entscheidungs-Matrix:** - Portfolio > $250K + aktive Research-Interesse: Pro oft lohnend. - Portfolio $50-250K + gelegentliche Custom-Analyse: Free reicht meist, Pro ist Luxury. - Portfolio < $50K oder passive Strategie: Free klar ausreichend. - Semi-professioneller Analyst / Publisher: Pro notwendig. **Die ehrliche Konservative Empfehlung:** Für die meisten Leser dieser Academy — konservative Retail-Investoren mit 7-8%-Strategien — reicht die Free-Tier von Dune völlig. Die Energie ist besser investiert in: (a) DeFiLlama-Kompetenz vertiefen, (b) Etherscan-Routinen etablieren, (c) regelmäßige Approval-Audits, (d) gute Portfolio-Dokumentation. Dune-Pro ist ein Tool für aktive Researcher, nicht für disziplinierte Passive-Investoren. **Eine Zwischenoption:** Dune hat zeitweise Promo-Aktionen — Kurz-Trials von Pro, Bundle-Angebote mit anderen Tools. Wer spezifisch eine temporäre Analyse-Aufgabe hat (z.B. tiefe Research zu einem neuen Protokoll vor Investment), kann einen Monat Pro testen statt einer Jahres-Subscription. **Das übergreifende Prinzip:** Bessere Tools machen nicht automatisch bessere Entscheidungen. Die meisten Retail-Verluste in DeFi entstehen nicht durch fehlende Daten, sondern durch fehlende Disziplin in der Verwendung vorhandener Daten. Eine Free-Tier-Dune plus gute Routinen schlägt eine Pro-Subscription ohne Disziplin. Tool-Investitionen sollten proportional zur tatsächlichen Analyse-Tätigkeit sein — nicht zu der Tätigkeit, die man sich vornimmt.

</details>

---

## Lektion 15.5 — Wallet-Tracking und die persönliche Research-Routine

### Learning Objectives

After completing this lesson the learner will be able to:
- Die führenden Wallet-Tracking-Tools (Nansen, Arkham, Zapper, DeBank) unterscheiden und situationsgerecht einsetzen
- Zwischen Portfolio-Tracking (eigene Positionen) und Wallet-Investigation (fremde Adressen) differenzieren
- Signal von Noise in Wallet-Aktivität trennen und typische Fehlinterpretationen vermeiden
- Eine persönliche Research-Routine mit täglichen, wöchentlichen und monatlichen Elementen aufbauen

### Explanation

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

**Smart Money Labels.** Nansen hat ein Team, das kontinuierlich Wallets mit Qualifikations-Labels versieht. "Smart Money Trader" (konstante Profitabilität), "Whale" (große Bestände), "First Mover" (früh in erfolgreiche Tokens), "Deployer" (hat wichtige Contracts erstellt). Diese Labels ermöglichen es, Bewegungen von qualifizierten Wallets zu verfolgen — eine Art Alpha-Signal.

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

### Slide Summary

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

### Voice Narration Script

**[Slide 1]** Die fünfte und letzte Lektion von Modul 15 verbindet das Werkzeug-Lernen mit der Alltags-Praxis. Nach DeFiLlama, Etherscan und Dune kommen jetzt die Wallet-Tracking-Tools und — entscheidend — die Zusammenführung in eine persönliche Research-Routine, die nachhaltig durchgehalten werden kann.

**[Slide 2]** Wallet-Tracking hat zwei fundamentale Anwendungsfelder, die getrennt bleiben sollten. Portfolio-Tracking — eigene Wallet: was habe ich, wo ist es, wie entwickelt es sich? Dafür sind Zapper und DeBank optimiert, kostenlos, alltagstauglich. Wallet-Investigation — fremde Adressen: was machen andere, welche Whales bauen auf, wer steckt dahinter? Dafür sind Nansen und Arkham da, mit deutlich stärkerem Label-System und Entity-Fokus, aber in der starken Version kostenpflichtig. Die zwei Anwendungen sind nicht austauschbar.

**[Slide 3]** Zapper und DeBank lösen dasselbe Grundproblem: du verbindest deine Wallet oder gibst eine Adresse ein, und siehst alle DeFi-Positionen konsolidiert. Das ist effizienter, als manuell durch zehn Protokolle zu klicken. Beide sind kostenlos, unterstützen die großen Chains, zeigen Tokens, LP-Positionen, Lending, Staking und oft NFTs. DeBank ist tendenziell breiter in der Chain-Abdeckung, Zapper oft sauberer in der UI. Viele Nutzer verwenden beide parallel. Die Routine: einmal wöchentlich die eigene Wallet durchsehen. Unerwartete Einträge sind potenzielle Hack-Signale.

**[Slide 4]** Nansen ist der Institutional-Grade-Standard. Smart Money Labels — ein Team identifiziert kontinuierlich qualifizierte Wallets — ermöglichen gezielte Alpha-Verfolgung. Token God Mode zeigt für einen Token alle großen Halter mit Akkumulations-Historie. Wallet Profiler liefert vollständige Historie einer Adresse. Kosten: etwa 150 Dollar pro Monat für Pro. Kein substantieller Free-Tier. Die ehrliche Einschätzung: nur sinnvoll für Portfolios ab 100.000 Dollar mit aktivem Interesse am Wallet-Tracking. Für passive konservative Strategien unverhältnismäßig.

**[Slide 5]** Arkham ist der jüngere Wettbewerber. Fokus auf Entity-Zuordnung — nicht nur "Smart Money", sondern konkret "Binance Wallet", "a16z Treasury". Deutlich stärkerer Free-Tier als Nansen: grundlegende Labels, Balance-Historie, Entity-Profile kostenlos. Pro-Plan Ultimate etwa 60 Dollar pro Monat. Die Intel Exchange — ein Bounty-System für Doxxing — ist ethisch kontrovers, aber optional. Die meisten Nutzer brauchen sie nicht. Für konservative Retail-Nutzer: Arkhams Free-Tier ist meist ausreichend, wenn gelegentlich Wallet-Investigation gemacht wird.

**[Slide 6]** Wallet-Aktivität ist eine Daten-Quelle, kein Signal. Drei typische Fehlinterpretationen. Erstens: "Whale kauft, also steigt der Kurs." Großer Kauf führt nicht automatisch zu Rally. Es gibt viele Gründe für Käufe, viele andere Akteure wirken gleichzeitig. Zweitens: "Wallet X hat vor zwei Jahren zehnfach performed, also folge ich ihr." Survivorship-Bias — wir sehen nur die erfolgreichen Wallets, nicht die vielen, die schlecht performten mit ähnlicher Strategie. Drittens: "Wallet X kauft Y, also muss es gut sein." Social Proof Fallacy — eine andere Person hat eine andere Situation, andere Ziele, andere Informationen. Die Meta-Regel: Beobachtung ohne Interpretation ist wertlos, Interpretation ohne Rahmen ist gefährlich.

**[Slide 7]** Die persönliche Research-Routine hat vier Ebenen. Täglich 5 bis 10 Minuten: Portfolio-Check per Zapper oder DeBank, kurzer News-Scan. Nur für aktive Nutzer nötig. Wöchentlich 30 bis 45 Minuten: substanzielle Session mit Portfolio-Review, DeFiLlama-Durchgang, Protokoll-News. Das ist die Kern-Routine. Monatlich 1 bis 2 Stunden: Approval-Audit, Allokations-Review gegen Strategie, neue Protokolle sondieren mit der 30-Tage-Wartezeit. Notfall-Playbook aktualisieren. Quartalsweise 3 bis 4 Stunden: Performance-Review gegen 7-8-Prozent-Ziel, Strategie-Check, Tool-Stack-Effizienz. Total etwa 6 bis 8 Stunden pro Monat — ausreichend für substanzielle DeFi-Strategie, nicht übertrieben.

**[Slide 8]** Die finale Werkzeug-Hierarchie für konservative Retail-Strategien. Platz eins: DeFiLlama als primäres wöchentliches Tool. Platz zwei: Etherscan investigativ bei Bedarf. Platz drei: Zapper oder DeBank wöchentlich für Portfolio-Überblick. Platz vier: Dune monatlich für Spezialfragen. Platz fünf: Arkham im Free-Tier oder Nansen mit Pro bei aktiver Wallet-Investigations-Nutzung. Diese Hierarchie bewusst zu gestalten, statt jedem neuen Tool nachzujagen, ist selbst eine Disziplin. Die meisten Retail-Verluste entstehen nicht durch fehlende Daten, sondern durch fehlende disziplinierte Nutzung der vorhandenen. Tools sind Mittel, nicht Selbstzweck. In Modul 16 schauen wir, wie diese Analyse-Fähigkeiten in einem Protocol Analysis Framework konkret angewendet werden — die systematische Prüfung eines neuen Protokolls vor Investment.

### Visual Suggestions

**[Slide 1]** Titelfolie.

**[Slide 2]** Zwei-Spalten-Diagramm: links Portfolio-Tracking (eigene Wallet, Hausschloss-Icon), rechts Wallet-Investigation (fremde Wallet, Lupe-Icon). Darunter die passenden Tools jeweils.

**[Slide 3]** **SCREENSHOT SUGGESTION:** Zapper-Portfolio-View (zapper.xyz) mit einer Beispiel-Wallet, die mehrere DeFi-Positionen zeigt. Demonstriert die Konsolidierungs-Funktion.

**[Slide 4]** **SCREENSHOT SUGGESTION:** Nansen-Smart-Money-Dashboard mit Label-System sichtbar. Zeigt die Pro-Features visuell.

**[Slide 5]** **SCREENSHOT SUGGESTION:** Arkham Intelligence-Interface mit Entity-Zuordnung einer bekannten Wallet (z.B. Binance Cold Wallet).

**[Slide 6]** Drei-Warnungen-Tafel: Whale-Kauf-Fallacy, Survivorship-Bias, Social-Proof-Fallacy. Jeweils mit Icon und Ein-Satz-Warnung.

**[Slide 7]** Vier-Ebenen-Pyramide: Täglich (Basis, klein), Wöchentlich (größer), Monatlich (Mitte), Quartalsweise (Spitze). Zeiten jeweils angegeben.

**[Slide 8]** Die fünf Tools als priorisierte Liste mit Häufigkeits-Indikatoren. Visuelle Hierarchie als finale Referenz.

### Exercise

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

---

*Ende von Modul 15.*
