# Die Philosophie der Composability

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Composability technisch definieren und ihre drei Formen (vertikal, horizontal, diagonal) unterscheiden
- Die echten Vorteile von Composability (Capital Efficiency, Innovation, emergente Use-Cases) benennen
- Das fundamentale multiplikative Risiko-Modell verstehen und seine Implikationen für Position-Sizing
- Historische Composability-Failures (stETH-Depeg 2022, Curve-Exploit 2023) analysieren
- Eine eigene Position auf ihre Composability-Exposure prüfen
- Atomic Composability von synchroner/asynchroner Composability abgrenzen und pro Protokoll-Kombination die richtige Form identifizieren

## Erklärung

**Was Composability technisch ist**

Composability beschreibt die Eigenschaft, dass Smart Contracts auf Ethereum (und kompatiblen Chains) andere Smart Contracts aufrufen können. Ein Contract A kann einen Contract B aufrufen, den Rückgabewert von B nutzen, damit eine Operation durchführen, und dann Contract C aufrufen mit dem Ergebnis. Diese Kompositionsfähigkeit ist nicht optional oder experimentell — sie ist die zentrale Eigenschaft der Ethereum Virtual Machine.

Auf technischer Ebene funktioniert das durch:
- **Public Interfaces:** Jeder Smart Contract definiert Funktionen, die andere aufrufen können.
- **Atomare Transaktionen:** Eine einzelne Transaktion kann mehrere Contract-Calls enthalten, die entweder alle oder keine ausgeführt werden.
- **Standardisierte Token-Interfaces:** ERC-20, ERC-721, ERC-4626 — gemeinsame Schnittstellen ermöglichen, dass Contracts unbekannt miteinander arbeiten können.
- **On-Chain-State:** Alle Contracts lesen und schreiben den gleichen globalen Zustand. Kein Synchronisations-Overhead.

Das ist fundamental anders als in traditioneller Software, wo Systeme über APIs mit Latenz und potenziellen Inkonsistenzen interagieren. In DeFi sind Contract-Calls synchron, atomar und kosten nur Gas.

**Die drei Formen der Composability**

Composability manifestiert sich in drei Haupt-Mustern, die jeweils spezifische Risiken mit sich bringen.

**Form 1: Vertikale Composability (Stacking)**
Wenn eine Operation von einem Protokoll zu einem anderen weitergegeben wird, wobei jede Stufe auf der vorherigen aufbaut. Das klassische Beispiel: Leverage-Loops. ETH → Lido stETH → Aave Collateral → USDC Borrow → kaufe mehr ETH → Loop wiederholen.

Das Risiko: Jede Stufe addiert einen neuen potentiellen Failure-Point. Wenn Stufe N versagt, versagen alle nachfolgenden Stufen, weil sie auf Stufe N aufbauen. Die Sicherheit der Gesamtposition ist multiplikativ, nicht additiv.

**Form 2: Horizontale Composability (Parallel Dependencies)**
Wenn ein einzelnes Protokoll auf mehreren anderen Protokollen gleichzeitig aufbaut, ohne dass diese sich direkt aufeinander beziehen. Beispiel: Aave nutzt Chainlink-Oracles für Preise, akzeptiert stETH als Collateral (Lido-Abhängigkeit), hat Backstop-Liquidität in Curve-Pools (Curve-Abhängigkeit). Jede dieser Abhängigkeiten ist unabhängig, aber die Aave-Sicherheit hängt von allen gleichzeitig ab.

Das Risiko: Der Nutzer sieht nur das direkte Protokoll (Aave) und bemerkt die parallel bestehenden Abhängigkeiten nicht. Diese werden erst in Krisen sichtbar, wenn eine der hinter-liegenden Abhängigkeiten versagt.

**Form 3: Diagonale Composability (Cross-Chain)**
Wenn Composability über Chain-Grenzen hinweg aufgebaut wird. Beispiel: Bitcoin wird über eine Bridge zu WBTC auf Ethereum, WBTC wird als Collateral in Aave auf Arbitrum genutzt, mit dem geliehenen Kapital wird über einen Cross-Chain-DEX auf Base gehandelt. Drei Chains, zwei Bridges, mindestens vier Protokolle.

Das Risiko: Zusätzlich zu den Standard-Composability-Risiken kommen die Cross-Chain-Risiken aus Modul 14. Bridges sind typisch die schwächsten Glieder in solchen Ketten.

**Die echten Vorteile von Composability**

Composability Risk ist real, aber Composability ist nicht pauschal negativ. Die Vorteile sind fundamental:

**Vorteil 1: Capital Efficiency.**
In der klassischen Finanz muss Kapital oft in einer spezifischen Form gehalten werden, um eine bestimmte Funktion zu erfüllen. Wer US-Anleihen als Collateral nutzen möchte, muss die Anleihe bei einem Custodian halten. Will er gleichzeitig den Zins daraus als Einkommen nutzen, ist das an denselben Custodian gebunden. Die Kapital-Produktivität ist durch die Struktur begrenzt. In DeFi kann dasselbe Kapital in mehreren Funktionen gleichzeitig arbeiten: Staking-Rewards sammeln (via stETH), als Collateral dienen (bei Aave), Liquidität bereitstellen (bei einer DEX). Wenn man die Risiken versteht, ist das echtes Capital Efficiency — mehr Nutzen aus dem gleichen Kapital.

**Vorteil 2: Innovation durch Kombination.**
Die meisten DeFi-Innovationen sind Kombinationen bestehender Primitive. Curve's Stableswap-Design baut auf Uniswap's AMM-Grundidee. Morpho baut auf Aave/Compound-Lending. Yearn baut auf allen darunter. Niemand müsste die Basis-Primitive neu implementieren — man baut darauf auf. Das macht DeFi-Entwicklung schneller und ermöglicht spezialisierte Lösungen, die einzelne Probleme besser lösen.

**Vorteil 3: Emergente Use-Cases.**
Manche DeFi-Nutzungen sind nicht "designed" worden — sie entstanden, als Nutzer erkannten, dass existierende Protokolle kombiniert werden können. Flash Loans sind ein klassisches Beispiel: unbesicherte Kredite, die in einer einzelnen Transaktion zurückgezahlt werden müssen. Sie wurden von Aave eingeführt, aber die innovativsten Anwendungen (Arbitrage, Collateral-Swapping, Debt-Refinancing) wurden von Nutzern entdeckt, nicht vom Aave-Team designed.

**Vorteil 4: Permissionless Integration.**
Wenn ein neues Protokoll launcht, kann es sofort in existierende Systeme integriert werden, ohne dass die existierenden Systeme etwas tun müssen. Ein neues Lending-Protokoll kann stETH sofort akzeptieren. Ein neuer Yield-Aggregator kann jedes Vault einbinden. Diese Permissionlessness ist ökonomisch transformativ.

**Die Kosten: Das multiplikative Risiko-Modell**

Die mathematische Realität der Composability ist unbarmherzig. Wenn eine Position von N Protokollen abhängt, und jedes Protokoll eine Überlebens-Wahrscheinlichkeit p pro Jahr hat, dann ist die Überlebens-Wahrscheinlichkeit der Gesamtposition nicht das Minimum, sondern das Produkt.

**Konkrete Zahlen:**

| Layer-Anzahl | Jährliche Überlebens-Wahrscheinlichkeit (bei 95% pro Protokoll) | Jährliche Überlebens-Wahrscheinlichkeit (bei 98% pro Protokoll) |
|---|---|---|
| 1 (direktes Protokoll) | 95% | 98% |
| 2 Layer (z.B. Aave + Chainlink) | 90,25% | 96,04% |
| 3 Layer (z.B. + Lido) | 85,74% | 94,12% |
| 4 Layer (z.B. + Bridge) | 81,45% | 92,24% |
| 5 Layer (komplexer Loop) | 77,38% | 90,39% |

Die Tabelle zeigt: selbst bei individuellen Sicherheits-Niveau von 98% pro Protokoll — was sehr hoch ist — schrumpft die Gesamt-Sicherheit deutlich mit jedem zusätzlichen Layer. Bei 95% pro Protokoll (was realistischer für neue Protokolle ist) sinkt die Gesamt-Sicherheit auf unter 80% bei fünf Layern.

**Was das praktisch bedeutet:** Eine "sichere" DeFi-Strategie mit Blue-Chip-Protokollen wie Aave (98% pro Jahr), Lido (98%), Chainlink (99%), und Ethereum selbst (99,5%) hat eine gemeinsame Jahres-Überlebens-Wahrscheinlichkeit von 0,98 × 0,98 × 0,99 × 0,995 = 94,6%. Das ist gut, aber es bedeutet auch: einmal in ~18 Jahren trifft dich statistisch ein signifikantes Problem an einem der Layers. Bei riskanteren Protokollen mit 90% pro Protokoll in einer 3-Layer-Struktur: 0,9³ = 72,9%. Einmal in ~4 Jahren ein schwerwiegendes Ereignis.

**Warum die Intuition versagt:** Menschen denken additiv bei Risiken — "jedes Protokoll ist okay, also ist das Gesamte okay." Aber Risiken komponieren multiplikativ bei Composability. Das ist einer der häufigsten kognitiven Fehler in DeFi.

**Historisches Fallbeispiel 1: stETH-Depeg im Juni 2022**

Im Juni 2022 erlebte stETH einen schwerwiegenden Depeg — der Preis fiel von der erwarteten 1:1-Ratio zu ETH auf 0,93 ETH-Äquivalent. Die Ursache war nicht Lido selbst, sondern eine Kaskade über mehrere Protokolle.

Der Ablauf:
1. **Trigger:** Die Terra-Luna-Kollaps destabilisierte den gesamten Markt. Panikverkäufe breiteten sich aus.
2. **Celsius-Panik:** Celsius — ein zentralisierter Lender — hatte massive stETH-Positionen als Collateral bei verschiedenen DeFi-Protokollen. Als Nutzer begannen, Kapital aus Celsius abzuziehen, musste Celsius stETH verkaufen.
3. **Liquidität auf Curve:** Der primäre stETH/ETH-Swap-Pool war auf Curve. Massive Verkäufe kippten die Pool-Balance: statt 50/50 wurde es 70/30 stETH/ETH. Der Marktpreis von stETH fiel unter 1:1.
4. **Aave-Liquidations-Welle:** Aave akzeptierte stETH als Collateral. Mit dem Depeg fielen die Collateral-Werte, Liquidations-Schwellen wurden überschritten. Liquidators verkauften das liquidierte stETH auf Curve, was den Peg weiter drückte. Kaskade.
5. **Self-Reinforcing:** Jeder Verkauf senkte den Peg, was weitere Liquidations triggerte, was mehr Verkaufs-Druck erzeugte.

Das Ergebnis: stETH-Nutzer, die die Composability-Risiko nicht verstanden hatten, verloren signifikantes Kapital durch Liquidationen, obwohl ihre individuelle Position nichts direkt mit Terra oder Celsius zu tun hatte. Die Kettenreaktion zeigt das horizontale Composability-Risiko: die Aave-Sicherheit hing implizit von Curve-Liquidität ab, die von Celsius-Verhalten beeinflusst wurde, was vom Terra-Kollaps ausgelöst wurde. Vier Ebenen, die der einzelne Nutzer nie direkt sah.

**Historisches Fallbeispiel 2: Curve-Exploit im Juli 2023**

Im Juli 2023 wurde Curve von einem Reentrancy-Bug in Vyper (der Programmiersprache, in der viele Curve-Contracts geschrieben sind) angegriffen. Mehrere Curve-Pools verloren zusammen etwa 70 Millionen USD.

Aber der direkte Verlust war nur die erste Ebene. Die zweite Ebene: Curve-Gründer Michael Egorov hatte signifikante Kredite auf Aave gegen CRV-Token als Collateral. Als der CRV-Preis nach dem Exploit fiel, näherte sich die Position Liquidations-Schwellen. Wenn sie liquidiert worden wäre, hätte das einen weiteren Preisdruck auf CRV ausgelöst, möglicherweise eine Kaskade in andere Protokolle, die CRV-Exposure hatten.

Am Ende gab es informelle Verhandlungen, Egorov verkaufte CRV OTC an andere DeFi-Teams, die Liquidation wurde vermieden. Aber die Situation zeigte, wie Composability auf einer meta-Ebene wirkt: ein Bug in Curve → Preisdruck auf CRV → Gefahr für eine einzelne große Position auf Aave → potentielle Kaskade in das gesamte System.

Die Lehre: Composability-Risiken sind nicht nur technische Abhängigkeiten. Sie beinhalten auch ökonomische Abhängigkeiten, Liquiditäts-Abhängigkeiten, und sogar die Aktionen einzelner großer Marktteilnehmer, die systemisch relevant werden können.

**Eine eigene Position auf Composability-Exposure prüfen**

Bei jeder DeFi-Position sollten drei Fragen gestellt werden:

**Frage 1: Wie viele Protokolle sind direkt involviert?**
Zähle jeden distinkten Smart Contract, von dem deine Position abhängt. Eine einfache ETH-Staking-Position über Lido hat einen Layer. Eine stETH-Position als Aave-Collateral hat zwei. Ein Leverage-Loop über Aave-stETH-ETH-stETH hat drei bis vier.

**Frage 2: Welche indirekten Abhängigkeiten existieren?**
Auch wenn du nur mit einem Protokoll direkt interagierst, kann es indirekte Abhängigkeiten haben. Aave hängt von Chainlink-Oracles ab. Lido hängt von Ethereum-Staking-Infrastruktur ab. USDC hängt von Circle's Banking-Infrastruktur ab. Diese indirekten Layer zählen auch.

**Frage 3: Was ist die Cross-Chain-Dimension?**
Wenn die Position Cross-Chain ist, addiere alle involvierten Chains und Bridges. Eine Arbitrum-Position hat zusätzlich Arbitrum-Sequencer-Risiko. Eine Position, die via LayerZero gebridgete Tokens nutzt, hat LayerZero-Risiko.

Nach dieser Analyse weißt du, wie viele Layer deine Position hat. Für eine konservative Strategie gilt: je mehr Layer, desto vorsichtiger sollte die Position-Size sein. Eine 1-Layer-Position kann 10-20% des Portfolios sein. Eine 3-Layer-Position sollte maximal 5% sein. Eine 5+-Layer-Position sollte als hochspekulativ behandelt werden.

## Folien-Zusammenfassung

**[Slide 1] — Titel**
Die Philosophie der Composability

**[Slide 2] — Was Composability technisch ist**
Smart Contracts rufen andere Smart Contracts auf
Public Interfaces, atomare Transaktionen, standardisierte Token
Zentrale EVM-Eigenschaft, nicht optional
Fundamental anders als traditionelle Software

**[Slide 3] — Die drei Formen**
Vertikal (Stacking): Stufen, die aufeinander aufbauen
Horizontal (Parallel): ein Protokoll mit mehreren Abhängigkeiten
Diagonal (Cross-Chain): über Chain-Grenzen hinweg

**[Slide 4] — Die echten Vorteile**
Capital Efficiency (Kapital in mehreren Funktionen)
Innovation durch Kombination
Emergente Use-Cases
Permissionless Integration

**[Slide 5] — Das multiplikative Risiko-Modell**
Bei 95% pro Protokoll: 1 Layer 95%, 3 Layer 85,7%, 5 Layer 77,4%
Intuition versagt: Menschen denken additiv, Realität ist multiplikativ
Einer der häufigsten kognitiven Fehler in DeFi

**[Slide 6] — stETH-Depeg Juni 2022**
Terra → Celsius-Panik → Curve-Unbalance → Aave-Liquidations
Vier versteckte Ebenen, die einzelne Nutzer nicht sahen
Horizontal Composability Risk realisiert

**[Slide 7] — Curve-Exploit Juli 2023**
Vyper-Bug → CRV-Preisdruck → Egorov's Aave-Position in Gefahr
Composability auch auf ökonomischer und Marktteilnehmer-Ebene
System-systemic Exposure durch einzelne Großpositionen

**[Slide 8] — Eigene Position prüfen**
Wie viele direkte Protokolle?
Welche indirekten Abhängigkeiten?
Welche Cross-Chain-Dimension?
Position-Sizing sollte mit Layer-Anzahl skalieren

## Sprechertext

**[Slide 1]** Modul 16 beginnt mit der Philosophie der Composability — dem Kern-Merkmal, das DeFi von traditioneller Finanz unterscheidet. Ohne das konzeptuelle Verständnis werden alle späteren Analysen zu mechanischem Checklisten-Abarbeiten. Mit ihm werden sie zu fundierter Risiko-Bewertung.

**[Slide 2]** Composability ist technisch gesehen die Fähigkeit von Smart Contracts, andere Smart Contracts aufzurufen, deren Ergebnisse zu nutzen und weiterzuverarbeiten. Public Interfaces, atomare Transaktionen und standardisierte Token-Interfaces machen das möglich. Es ist keine optionale Eigenschaft, sondern die zentrale Eigenschaft der Ethereum Virtual Machine. Das unterscheidet DeFi fundamental von traditioneller Software, wo Systeme über APIs mit Latenz und potenziellen Inkonsistenzen interagieren. In DeFi sind Contract-Calls synchron, atomar und kosten nur Gas.

**[Slide 3]** Composability hat drei Haupt-Formen. Vertikale Composability oder Stacking: Stufen, die aufeinander aufbauen, wie ein Leverage-Loop von ETH zu stETH zu Aave-Collateral zu USDC-Borrow. Horizontale Composability: ein einzelnes Protokoll, das auf mehreren anderen parallel aufbaut. Aave nutzt Chainlink-Oracles, akzeptiert stETH als Collateral, hat Liquidität in Curve-Pools — alle diese Abhängigkeiten parallel. Diagonale Composability: über Chain-Grenzen hinweg, mit Cross-Chain-Risiken aus Modul 14 obendrauf.

**[Slide 4]** Bevor wir über die Risiken sprechen, die echten Vorteile. Capital Efficiency: dasselbe Kapital kann mehrere Funktionen gleichzeitig erfüllen, ein fundamentaler Vorteil gegenüber klassischer Finanz. Innovation durch Kombination: die meisten DeFi-Innovationen sind Kombinationen bestehender Primitive, nicht Neuerfindungen. Emergente Use-Cases: Flash Loans wurden von Aave designed, aber die innovativsten Anwendungen wurden von Nutzern entdeckt, nicht designed. Permissionless Integration: neue Protokolle können sofort in existierende Systeme integriert werden, ohne dass die existierenden etwas tun müssen.

**[Slide 5]** Die Kosten sind das multiplikative Risiko-Modell. Wenn eine Position von N Protokollen abhängt, ist die Sicherheit nicht das Minimum, sondern das Produkt. Bei 95% Überlebens-Wahrscheinlichkeit pro Protokoll: ein Layer 95%, drei Layer 85,7%, fünf Layer 77,4%. Die Intuition vieler Menschen ist additiv: wenn jedes Protokoll okay ist, ist das Gesamte okay. Die Realität ist multiplikativ: Risiken komponieren aufeinander. Das ist einer der häufigsten kognitiven Fehler in DeFi.

**[Slide 6]** Ein historisches Fallbeispiel: der stETH-Depeg im Juni 2022. Die Ursache lag nicht bei Lido selbst. Terra-Luna kollabierte. Das destabilisierte den Markt. Celsius — ein zentralisierter Lender mit massiven stETH-Positionen — erlebte Bank-Run-artige Abzüge und musste stETH verkaufen. Der Curve-stETH-ETH-Pool wurde massiv unbalanciert. Der stETH-Preis fiel unter 1:1. Aave-Positions mit stETH als Collateral wurden liquidierbar. Liquidatoren verkauften weiteres stETH, was den Peg weiter drückte. Self-Reinforcing-Kaskade. Vier versteckte Ebenen, die der einzelne Nutzer nie direkt sah — genau das ist horizontal Composability Risk.

**[Slide 7]** Der Curve-Exploit im Juli 2023 zeigte eine andere Dimension. Ein Bug in der Vyper-Compiler-Version, in der Curve-Contracts geschrieben waren, ermöglichte einen Reentrancy-Angriff. Direkter Verlust: etwa 70 Millionen. Aber die größere Gefahr war indirekt: Curve-Gründer Egorov hatte große Kredite auf Aave gegen CRV-Collateral. Der Exploit drückte den CRV-Preis, nahe an Liquidations-Schwellen. Eine Liquidation hätte einen weiteren Preisdruck ausgelöst, möglicherweise eine System-Kaskade. Informelle OTC-Verhandlungen vermeideten das. Die Lehre: Composability-Risiken beinhalten auch ökonomische Abhängigkeiten und sogar die Aktionen einzelner großer Marktteilnehmer.

**[Slide 8]** Konkrete Anwendung: die eigene Position auf Composability prüfen. Drei Fragen. Wie viele Protokolle sind direkt involviert? Zähle jeden distinkten Smart Contract, von dem die Position abhängt. Welche indirekten Abhängigkeiten existieren? Oracle-Provider, Collateral-Issuer, Backend-Infrastruktur. Welche Cross-Chain-Dimension? L2-Sequencer, Bridge-Protokolle, Wrapped-Assets. Nach dieser Analyse hast du die Layer-Zahl. Konservative Regel: 1-Layer bis 20% des Portfolios, 3-Layer maximal 5%, 5+-Layer als hochspekulativ behandeln. In der nächsten Lektion entwickeln wir ein systematisches Framework, mit dem jedes Protokoll einzeln bewertet wird.

## Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Diagramm: mehrere Smart-Contract-Boxen mit Pfeilen zwischen ihnen, die Funktions-Aufrufe zeigen. Annotation: "atomar, synchron, on-chain". Kontrastiert mit einer klassischen API-Integration (asynchron, Netzwerk-Latenz).

**[Slide 3]** Drei-Panel-Diagramm: Vertikal (Stacking), Horizontal (Parallel), Diagonal (Cross-Chain). Jeweils mit konkretem Beispiel visualisiert.

**[Slide 4]** Vier-Vorteils-Kacheln mit Icons: Münze (Capital Efficiency), Glühbirne (Innovation), Sternschnuppe (Emergente Use-Cases), Puzzle-Stück (Permissionless Integration).

**[Slide 5]** Tabelle oder Balken-Diagramm der multiplikativen Sicherheits-Wahrscheinlichkeiten. Visuell klar, dass die Kurve nicht linear sondern exponentiell abnimmt.

**[Slide 6]** **SCREENSHOT SUGGESTION:** Chart des stETH-ETH-Peg-Preises im Juni 2022, idealerweise mit annotierter Zeitachse: Terra-Kollaps, Celsius-Bankrun, Peg-Abfall, Aave-Liquidations-Spike.

**[Slide 7]** Flowchart des Curve-Exploits: Vyper-Bug → Pool-Drainage → CRV-Preisdruck → Egorov's Aave-Position → verhinderte Kaskade. Mit roten Pfeilen für Risiko-Propagation.

**[Slide 8]** Prüfungs-Flussdiagramm mit den drei Fragen und der konservativen Position-Sizing-Regel am Ende.

## Übung

**Aufgabe: Composability-Audit einer eigenen Position**

Wähle eine deiner aktuellen DeFi-Positionen (oder eine, die du überlegst aufzubauen). Führe ein vollständiges Composability-Audit durch:

**Teil 1 — Protokoll-Inventar (20 Min):**
Liste alle direkt involvierten Protokolle auf. Für jedes:
- Name und Chain
- Welche spezifische Funktion wird genutzt?
- Wie würdest du die Sicherheits-Klasse einordnen (Blue-Chip >95%, etabliert 90-95%, experimentell <90% jährliche Überlebens-Wahrscheinlichkeit)?

**Teil 2 — Indirekte Abhängigkeiten (15 Min):**
Für jedes direkte Protokoll: welche indirekten Abhängigkeiten hat es?
- Oracle-Provider
- Collateral-Issuer (wenn LST oder wrapped Asset)
- Bridge-Infrastruktur (wenn Cross-Chain)
- Governance-Entscheidungen anderer Entitäten, die den Betrieb beeinflussen können

**Teil 3 — Multiplikatives Risiko berechnen (10 Min):**
Schätze die jährliche Überlebens-Wahrscheinlichkeit für jeden Layer. Multipliziere sie zu einer Gesamt-Wahrscheinlichkeit. Was bedeutet das konkret?
- Bei 94% Gesamt: erwarte statistisch alle 17 Jahre ein Problem
- Bei 85% Gesamt: erwarte statistisch alle 6-7 Jahre ein Problem
- Bei 70% Gesamt: erwarte statistisch alle 3-4 Jahre ein Problem

**Teil 4 — Position-Sizing-Review (15 Min):**
Ist die aktuelle Position-Größe konsistent mit dem berechneten Risiko-Profil?
- Wenn Nein: welche Anpassung wäre angemessen?
- Wenn der erwartete Return das Risiko nicht kompensiert: warum hältst du die Position?
- Welches ist der konkrete Exit-Trigger, wenn ein Layer ein Problem zeigt?

**Deliverable:** Vollständiges Composability-Audit-Dokument (800-1200 Wörter) für eine eigene Position, mit allen vier Teilen strukturiert. Das Dokument sollte so konkret sein, dass du es in 6 Monaten rereviewen und eine informierte Update-Entscheidung treffen kannst.

## Quiz

**Frage 1:** Dein Freund sagt: "Ich verstehe nicht, warum du so viel über Composability-Risk redest. Ich nutze Blue-Chip-Protokolle — Aave, Lido, Uniswap. Jedes davon ist etabliert und sicher. Das Gesamte ist also sicher." Erkläre systematisch, warum diese Logik strukturell falsch ist.

<details>
<summary>Antwort anzeigen</summary>

Die Logik hat mehrere fundamentale Probleme, die sich aus der Unterscheidung zwischen additivem und multiplikativem Risiko-Denken ergeben. Das Verständnis ist nicht nur akademisch — es ist die Grundlage für angemessenes Position-Sizing. **Problem 1: Additive Risiko-Intuition vs. multiplikative Realität.** Die implizite Annahme des Freundes: "jedes Protokoll ist zu 98% sicher, also ist die Kombination auch zu 98% sicher." Das stimmt aber nur, wenn Risiken identisch korreliert wären — was sie nicht sind. Wenn drei Protokolle unabhängige 2% Jahres-Ausfallwahrscheinlichkeit haben, ist die Wahrscheinlichkeit, dass mindestens eines in einem Jahr ausfällt, 1 minus (0,98)³ = 5,88%. Fast die dreifache Ausfall-Wahrscheinlichkeit der einzelnen Komponenten. Bei fünf kombinierten Protokollen: 1 minus (0,98)⁵ = 9,61%. Diese Mathematik ist unbestreitbar, aber kontraintuitiv für die meisten Menschen. **Problem 2: Blue-Chip-Status ist nicht 100%-Sicherheit.** Selbst die sichersten DeFi-Protokolle haben nicht 100% historische Safety-Records. Aave hatte Governance-Issues. Compound hatte einen Bug mit 80 Mio Fehl-Distribution. Uniswap hatte Vyper-bezogene Exposure. MakerDAO hatte multiple Parameter-Krisen. Jedes dieser Protokolle ist exzellent gemanagt, aber keines ist fehlerfrei. Die "98% pro Jahr"-Schätzung ist optimistisch — historisch realistischer ist 95-97% für Blue-Chip-Protokolle über längere Zeiträume. **Problem 3: Korrelierte Ausfälle erhöhen das Risiko weiter.** Die multiplikative Berechnung (0,98)³ = 94,1% unterschätzt sogar noch, weil Protokolle nicht vollständig unabhängig sind. Beispiele: Ein Ethereum-Netzwerk-Problem betrifft alle Ethereum-basierten Protokolle gleichzeitig. Ein Oracle-Provider-Ausfall (Chainlink) betrifft alle Protokolle, die Chainlink nutzen (die Mehrheit). Eine allgemeine DeFi-Krise (wie 2022) stresst mehrere Protokolle simultan durch ökonomische Kanäle. Bei korrelierten Risiken ist die tatsächliche Ausfall-Wahrscheinlichkeit höher als das einfache Produkt. **Problem 4: "Jedes Protokoll ist sicher" ignoriert die Interaktions-Effekte.** Selbst wenn alle drei Protokolle intern funktional bleiben, können ihre Interaktionen Probleme schaffen. Das stETH-Depeg 2022 ist das klassische Beispiel: Lido funktionierte normal, Aave funktionierte normal, Curve funktionierte normal. Das Problem lag in der Art, wie sie interagierten, und in einer ökonomischen Kaskade durch externe Trigger. Alle drei Protokolle waren "sicher" in isoliertem Sinn — die Nutzer mit stETH-Collateral-Positions waren es nicht. **Problem 5: Composability-Risiken skalieren mit Hebel.** Wenn der Freund die Position mit Leverage aufbaut (z.B. durch Loops), multipliziert sich das Risiko nochmals. Eine Position mit 3x Leverage über 3 Protokolle ist nicht nur das 3-Layer-Risiko — es ist das 3-Layer-Risiko mit 3x empfindlicher Reaktion auf kleine Preis-Bewegungen. Ein 5% Peg-Problem kann eine 15% Position-Verlust bedeuten, was zu Liquidation führt, was zu realisiertem 100% Verlust der Position. **Problem 6: Zeit-Horizont-Vergrößerung.** 94% jährliche Überlebens-Wahrscheinlichkeit klingt wie viel. Über 5 Jahre wird es zu 0,94⁵ = 73,4%. Über 10 Jahre zu 54%. Über längere Halt-Zeiträume wird "sicher" zu "mehr wahrscheinlich als nicht, ein signifikantes Problem zu erleben." Das ist nicht Panikmache — das ist Erwartungswert-Mathematik für langfristige Strategien. **Die konstruktive Antwort an den Freund:** Die Composability-Risk-Erkenntnis bedeutet nicht "niemals DeFi nutzen" oder "niemals mehrere Protokolle kombinieren". Sie bedeutet: Position-Sizing muss Komplexität reflektieren, regelmäßiges Monitoring ist pflichtig, Exit-Trigger müssen vorab definiert sein, und Diversifikation über unabhängige Strategie-Ebenen ist wichtiger als Diversifikation innerhalb verketteter Positionen. Konkret: eine einzelne verkettete Position sollte 5-10% des Portfolios nicht überschreiten, auch wenn jedes einzelne Protokoll Blue-Chip ist. Die restlichen 90-95% sollten auf einfachere, weniger verkettete Positions verteilt sein. **Die übergreifende Lehre:** Die Intuition vom Freund ist nicht dumm — sie ist einfach die menschliche Standard-Intuition, die in additiven Kontexten funktioniert und in multiplikativen versagt. Die Korrektur ist nicht Auswendig-lernen der Mathematik, sondern das Bauchgefühl zu rekalibrieren: "mehrere Layer" sollte ein Alarm-Signal sein, nicht ein Sicherheits-Signal. Die strukturell sicherste Portfolio-Strategie ist diejenige mit der geringsten Composability-Verkettung, nicht die mit den "besten" Protokollen in komplexen Kombinationen. **Eine konkrete Reformulierung:** Statt "ich nutze Blue-Chip-Protokolle, das ist sicher", die bessere Framing: "ich nutze Blue-Chip-Protokolle in einer 3-Layer-Kombination. Das ist besser als riskante Protokolle in der gleichen Kombination. Aber es ist riskanter als Blue-Chip-Protokolle in isolierten Positions. Meine Position-Größe sollte das reflektieren."

</details>

**Frage 2:** Ein Protokoll bewirbt eine "selbstverstärkende Yield-Strategie": ETH wird bei Lido gestaket, das stETH bei einem neuen Lending-Protokoll als Collateral hinterlegt, USDC wird geliehen, das wird in ein stETH-pendle-Yield-Tokenization-Produkt investiert, dessen Yield-Token dann an einem AMM gegen Governance-Token eines weiteren DeFi-Protokolls getauscht werden, die dann gestaked werden für zusätzliche Rewards. Analysiere diese Strategie.

<details>
<summary>Antwort anzeigen</summary>

Die Strategie ist ein extremes Beispiel für exzessive Composability — fünf Layer mit mehreren asynchronen Protokoll-Typen. Sie illustriert genau das multiplikative Risiko-Problem, oft verpackt in Marketing als "Capital Efficiency" oder "Yield Stacking". Eine systematische Analyse zeigt, warum solche Strategien für konservative Portfolios strukturell ungeeignet sind. **Layer-Count-Analyse.** Die Strategie involviert: (1) Lido für Staking, (2) das "neue Lending-Protokoll" für Collateralization, (3) Pendle oder ähnliches für Yield-Tokenization, (4) ein AMM (vermutlich Curve oder Uniswap) für Swap, (5) ein "weiteres DeFi-Protokoll" für Staking der Governance-Tokens. Plus indirekte Abhängigkeiten: Chainlink-Oracles an mehreren Punkten, USDC (Circle), möglicherweise Bridges. Realistische Layer-Count: 6-8 unabhängige Protokoll-Abhängigkeiten. **Multiplikatives Risiko bei optimistischer Schätzung.** Wenn wir für Lido, das neue Lending-Protokoll, Pendle, das AMM und das "weitere Protokoll" jeweils 95% jährliche Überlebens-Wahrscheinlichkeit ansetzen (Blue-Chip + neues Lending wahrscheinlich schwächer, also generös optimistisch), dann: (0,95)⁵ = 77,4%. Das "neue Lending-Protokoll" und das "weitere DeFi-Protokoll" sind vermutlich nicht Blue-Chip — realistischer sind 85-90%. Aktualisierte Schätzung: 0,95 × 0,90 × 0,95 × 0,95 × 0,85 = 65,5%. Jährlich. Eine Überlebens-Wahrscheinlichkeit von 65,5% bedeutet: in einem 3-Jahres-Zeitraum ist die Wahrscheinlichkeit eines signifikanten Ausfall-Ereignisses 72%. Das ist näher an "wahrscheinlich wird ein Problem eintreten" als an "wahrscheinlich alles okay". **Indirekte Risiko-Multiplikation.** Jeder Layer hat eigene sub-Abhängigkeiten. Lido hängt von Ethereum-Staking und ~30 Node-Operators ab. Pendle hängt von spezifischen Yield-Asset-Strukturen ab, die sich ändern können. Das AMM hängt von Liquidität und Oracle-Konstanz ab. Diese indirekten Layer sind nicht in der Basis-Rechnung enthalten — die tatsächliche Risiko-Exposure ist wahrscheinlich höher als die Basis-Schätzung suggeriert. **Kaskaden-Potenzial.** Das größere Problem als einzelne Ausfälle ist die Wahrscheinlichkeit von Kaskaden. Wenn stETH depegt (wie 2022), wird das Lending-Protokoll die Collateral-Bewertung reduzieren. Liquidations-Schwellen werden erreicht. Die Liquidation involviert Swap auf AMMs, die möglicherweise durch den gleichen Stress bereits unbalanciert sind. Cascading Liquidations drücken Preise weiter. Das Yield-Tokenization-Produkt kann selbst Peg-Probleme bekommen, wenn sein Underlying-Asset depegt. Der Loop kollabiert von mehreren Punkten gleichzeitig. Bei simultanem Stress auf mehrere Layers ist die Gesamt-Ausfall-Wahrscheinlichkeit nicht 0,95⁵, sondern deutlich höher — weil die Ereignisse korreliert sind. **Return-Analyse.** Was ist der erwartete Yield? Lido-Staking: ~3% APY. Aave-USDC-Borrow: ~4% APY. Lending-Zins durch Pendle: 6-10% APY typisch. AMM-Slippage und Fees: -1-3% pro Swap. Zusätzliche Staking-Rewards: 5-20% APY, aber mit hohem Token-Preis-Risiko. **Realistisch:** nach Kosten und unter Berücksichtigung von stETH-Collateral-Limits (typisch 65-75% LTV), lassen sich vielleicht 8-15% APY erwarten — bei 65% jährlicher Überlebens-Wahrscheinlichkeit. **Expected-Value-Analyse.** Wenn die Strategie überlebt: 8-15% Rendite. Wenn sie kollabiert: realistisch 30-100% Verlust (abhängig von Kaskade-Tiefe). Expected Value: 0,65 × 12% + 0,35 × (-60%) = 7,8% - 21% = -13,2%. Der Erwartungswert ist negativ. Selbst mit optimistischen Annahmen ist die Strategie erwartungs-negativ über 1 Jahr. Über mehrere Jahre noch deutlich negativer. **Warum solche Strategien trotzdem existieren und beworben werden.** Mehrere Gründe. Erstens: Survivorship Bias. Die Strategien, die funktioniert haben, werden gezeigt; die, die kollabiert sind, vergessen. Zweitens: Kurzfristiger Erfolg existiert wirklich. In der guten Hälfte der Fälle liefert die Strategie die beworbenen Yields — für 6-12 Monate. Das macht sie attraktiv bis zum Blow-up. Drittens: Das Yield-Farming-Protokoll verdient Fees unabhängig vom Erfolg der User-Positions. Viertens: Menschen neigen dazu, maximale Yield-Zahlen zu verfolgen, ohne die Risiken zu diskontieren. **Die konstruktive Alternative.** Statt der 5-Layer-Leverage-Loop-Strategie: einfache, niedrigere Leverage, weniger Verkettung. Option A: ETH bei Lido staken (1 Layer, 3% APY). Option B: stETH bei Aave als Collateral, moderate USDC-Leihe für zusätzliche ETH-Exposure (2-3 Layer, 4-6% APY effektiv). Option C: konservatives USDC-Lending bei Aave (1 Layer, 3-5% APY). Jede dieser einfacheren Strategien hat dramatisch bessere risk-adjusted Returns als die 5-Layer-Variante. **Die Meta-Lehre.** "Self-reinforcing yield" oder "yield stacking" sind oft Marketing-Label für "exponentiell akkumuliertes Composability-Risiko". Wenn ein Protokoll seine Strategie aggressiv mit diesen Begriffen bewirbt, ist Skepsis angebracht — seriöse Yield-Strategien werden typisch nicht mit solcher Sprache vermarktet, weil sie den Risiko-Charakter offen diskutieren müssten. **Die konservative Empfehlung.** Vermeide Strategien mit mehr als 3 Layer vollständig. Wenn 2-3 Layer genutzt werden, sei konservativ in Position-Sizing (<5% des Portfolios). Wenn eine Strategie "zu gut aussieht um wahr zu sein", ist sie es meist auch — entweder im Marketing übertrieben, oder mit versteckten Risiken, die sich erst in Krisen offenbaren. Der Return-Premium für komplexere Strategien ist selten ausreichend, um das multiplikative Risiko zu kompensieren. Die einfacheren Strategien sind strukturell überlegen.

</details>

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → Was ist Composability → 3 Formen (atomic, sync, async) → Money Legos → Multiplikatives Risiko → 3 Composability-Mythen → Konservative Heuristik
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 10–12 Min.)
- `visual_plan.json` — Composability-Flow-Diagramm, 3-Formen-Matrix, Money-Legos-Stack, Multiplikations-Rechnung, Mythen-vs-Realität-Tabelle

Pipeline: Gamma → ElevenLabs → CapCut.

---
