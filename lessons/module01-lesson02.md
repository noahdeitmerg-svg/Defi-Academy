# Warum existiert DeFi? Die Kernprinzipien

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:

- Die fundamentalen Probleme erklären, die DeFi zu lösen versucht
- Die vier Kernprinzipien identifizieren, die DeFi-Protokolle antreiben
- Verstehen, warum Komponierbarkeit der wichtigste Vorteil von DeFi ist
- Eine komponierte Position anhand realer Protokolle (Lido → Aave → Curve → Convex) Schritt für Schritt nachvollziehen
- Die Kehrseite der Komponierbarkeit als systemisches Risiko (Composability Risk) einordnen
- Die Settlement-Zeiten und Transparenz-Unterschiede zwischen traditionellem Finanzwesen und DeFi quantitativ vergleichen

## Erklärung

DeFi ist keine Technologie, die aus dem Nichts entstand. Es ist eine direkte Reaktion auf strukturelle Einschränkungen des traditionellen Finanzwesens. Um DeFi zu verstehen, musst du verstehen, welche Probleme es löst.

**Problem 1: Gatekeeping**
Traditionelle Finanzdienstleistungen erfordern institutionellen Zugang. Einen Kredit aufnehmen, auf einem Markt handeln, Liquidität bereitstellen — alles erfordert Beziehungen zu Banken, Brokerhäusern oder Market Makern. Schätzungsweise 1,4 Milliarden Erwachsene weltweit haben kein Bankkonto. In DeFi reicht eine Wallet.

**Problem 2: Settlement-Zeiten**
Eine Banküberweisung dauert 1–3 Werktage. Ein Aktienkauf settelt T+1 in den USA, T+2 in der EU. Eine internationale Überweisung kann eine Woche benötigen. In DeFi setteln Transaktionen typischerweise innerhalb von Sekunden bis wenigen Minuten. Auf Ethereum liegt die durchschnittliche Blockzeit bei etwa 12–15 Sekunden; Layer-2-Netzwerke können Transaktionen oft noch schneller bestätigen. Der Betrieb läuft 24 Stunden am Tag, inklusive Wochenenden und Feiertage.

**Problem 3: Intransparenz**
Du weißt nicht, was deine Bank mit deinen Einlagen macht. Du weißt nicht, wie ein Hedgefonds positioniert ist. Du weißt nicht, warum ein Marktmacher einen bestimmten Preis stellt. In DeFi ist jeder Kapitalfluss, jede Position, jede Gebühr öffentlich.

**Problem 4: Komposition und Innovation**
Ein traditioneller Broker kann nicht einfach auf dem Kreditsystem einer Bank aufbauen. APIs sind beschränkt, Verträge sind proprietär, Daten sind geschlossen. In DeFi können beliebige Protokolle aufeinander aufbauen — **Komponierbarkeit** ist der wichtigste strukturelle Vorteil.

**Die vier Kernprinzipien**

**1. Self-Custody (Selbstverwahrung)**
Jeder Nutzer kontrolliert seine eigenen Assets via Private Keys. Das überträgt auch die Verantwortung für Sicherheit komplett auf den Nutzer — ein Punkt, den wir in Modul 2 vertiefen.

**2. Permissionless Innovation (Erlaubnisfreie Innovation)**
Jeder kann ein neues Protokoll deployen, ohne regulatorische Zulassung. Das führt zu schneller Innovation, aber auch zu schnellem Betrug. Filterung ist die Aufgabe des Nutzers.

**3. Transparenz**
Alles ist on-chain verifizierbar. Tools wie Etherscan, DeFiLlama und Dune Analytics verwandeln diese Transparenz in nutzbare Information.

**4. Komponierbarkeit ("Money Legos")**
Protokolle können andere Protokolle als Bausteine verwenden. Ein Beispiel: Du kannst ETH auf Lido staken (Protokoll 1) → das erhaltene stETH als Sicherheit auf Aave nutzen, um USDC zu leihen (Protokoll 2) → das USDC auf Curve gegen DAI swappen und als LP-Position einbringen (Protokoll 3) → die LP-Position auf Convex einsetzen (Protokoll 4). Diese Verkettung ist in CeFi undenkbar. In DeFi ist sie eine Transaktion.

**Hinweis:** Jeder zusätzliche Protokoll-Schritt erhöht die Anzahl der zugrunde liegenden Risikoquellen.

**Warum Komponierbarkeit der entscheidende Vorteil ist**

Komponierbarkeit ist mehr als Bequemlichkeit. Sie verändert fundamental, wie Innovation entsteht. Ein neues Protokoll muss nicht das gesamte Finanz-Ökosystem neu bauen — es kann auf bestehenden Bausteinen aufbauen. Das führt zu Entwicklungszyklen, die in traditionellem Finanzwesen unmöglich sind. Es führt aber auch zu **Komponierbarkeits-Risiko**: Wenn ein Protokoll tief im Stack bricht, können alle darauf aufbauenden Protokolle betroffen sein. Das behandeln wir in Modul 16.

## Folien-Zusammenfassung

**[Slide 1] — Titel**
Warum existiert DeFi? Die Kernprinzipien

**[Slide 2] — Die vier strukturellen Probleme**

1. Gatekeeping — institutioneller Zugang erforderlich
2. Settlement-Zeiten — Tage statt Sekunden
3. Intransparenz — private Datenbanken
4. Geschlossene Systeme — keine Komposition

**[Slide 3] — Die vier Kernprinzipien**

1. Self-Custody
2. Permissionless Innovation
3. Transparenz
4. Komponierbarkeit

**[Slide 4] — Komponierbarkeit am Beispiel**
ETH → Lido (staken) → stETH
stETH → Aave (als Sicherheit) → USDC-Kredit
USDC → Curve (swappen) → DAI → Curve-LP
Curve-LP → Convex (boosten)
Eine Transaktion. Vier Protokolle.

**[Slide 5] — Die Kehrseite der Komponierbarkeit**
Je tiefer ein Baustein im Stack, desto größer die systemische Wirkung bei Bruch.
Komponierbarkeits-Risiko ist ein zentrales DeFi-Risiko.

**[Slide 6] — Zusammenfassung**
DeFi ist nicht Krypto-Hype — es ist eine technische Antwort auf strukturelle Einschränkungen des Finanzwesens. Die Kosten sind neue Risiken, die wir systematisch verstehen müssen.

## Sprechertext

**[Slide 1]**
In Lektion 1.1 haben wir definiert, was DeFi ist. Jetzt fragen wir: warum existiert es? Welche Probleme löst es — und was sind die Kernprinzipien, die seine Struktur erklären?

**[Slide 2]**
Vier strukturelle Probleme treiben DeFi an. Erstens: Gatekeeping. 1,4 Milliarden Erwachsene haben kein Bankkonto. Traditionelle Finanzdienste erfordern institutionellen Zugang — Beziehungen zu Banken, Brokern, Market Makern. Zweitens: Settlement-Zeiten. Banküberweisungen dauern Tage, Aktien settlen T+1 in den USA und T+2 in der EU. In DeFi setteln Transaktionen typischerweise innerhalb von Sekunden bis wenigen Minuten — auf Ethereum liegt die durchschnittliche Blockzeit bei etwa 12–15 Sekunden, Layer-2-Netzwerke bestätigen oft noch schneller. Rund um die Uhr. Drittens: Intransparenz. Du weißt nicht, was deine Bank mit deinen Einlagen macht. Viertens: geschlossene Systeme. Protokolle können nicht einfach aufeinander aufbauen.

**[Slide 3]**
Daraus ergeben sich vier Kernprinzipien. Self-Custody: du kontrollierst deine Assets über Private Keys. Permissionless Innovation: jeder kann Protokolle bauen, ohne Lizenz. Transparenz: alles ist on-chain prüfbar. Und das vielleicht wichtigste: Komponierbarkeit.

**[Slide 4]**
Komponierbarkeit bedeutet, dass Protokolle andere Protokolle als Bausteine nutzen können. Ein Beispiel: Ich stake ETH auf Lido und erhalte stETH. Dieses stETH nutze ich als Sicherheit auf Aave und leihe mir USDC. Das USDC swappe ich auf Curve gegen DAI. Das DAI stecke ich als LP-Position zurück in einen Curve-Pool und booste die Position auf Convex. Vier Protokolle, eine einzige Transaktion. In traditionellem Finanzwesen undenkbar.

**[Slide 5]**
Aber Komponierbarkeit hat eine Kehrseite. Je tiefer ein Baustein im Stack liegt, desto größer ist die systemische Wirkung, wenn er bricht. Wenn Lido depeggt, betrifft das jede Position, die stETH verwendet. Das ist Komponierbarkeits-Risiko — ein zentrales DeFi-Risiko, das wir systematisch in Modul 16 behandeln.

**[Slide 6]**
Zusammengefasst: DeFi ist keine Krypto-Marketingkampagne. Es ist eine technische Antwort auf strukturelle Probleme des bestehenden Finanzsystems. Aber jede Lösung bringt neue Risiken. Diese Risiken zu verstehen — das ist das eigentliche Ziel dieses Kurses.

## Visuelle Vorschläge

**[Slide 1]** Titelfolie, konsistentes Design mit Lektion 1.1.

**[Slide 2]** Vier-Quadranten-Layout. Jeder Quadrant zeigt eines der strukturellen Probleme mit einem illustrativen Icon (Tor für Gatekeeping, Uhr für Settlement, verschlossener Tresor für Intransparenz, isolierte Inseln für geschlossene Systeme).

**[Slide 3]** Vier horizontale Balken mit je einem Prinzip. Visueller Fokus auf "Komponierbarkeit" als wichtigster.

**[Slide 4]** Animiertes Flussdiagramm: ETH-Icon → Lido-Logo → stETH-Icon → Aave-Logo → USDC-Icon → Curve-Logo → DAI-Icon → Convex-Logo. Jeder Pfeil zeigt einen Protokoll-Hop. Unten eine einzige Transaktions-Hash-Zeile. **SCREENSHOT SUGGESTION:** Screenshot einer realen DeFi-Zap-Transaktion auf Etherscan, die mehrere Protokolle in einem Call durchläuft (z.B. über Zapper oder 1inch).

**[Slide 5]** Jenga-Turm-Metapher: Wenn ein unterer Block entfernt wird, fällt der ganze Turm. Daneben ein reales Beispiel (Text-only): "Juni 2022: stETH-Depeg → Liquidationen in 10+ Protokollen".

**[Slide 6]** Konsolidierende Textfolie mit den Kernaussagen.

## Übung

**Aufgabe: Verfolge eine reale komponierte Transaktion**

Gehe auf zapper.xyz oder debank.com und finde die Portfolio-Übersicht einer bekannten DeFi-Wallet (z.B. "vitalik.eth"). Identifiziere **drei Positionen**, die Komponierbarkeit demonstrieren — also Positionen, die mehrere Protokolle kombinieren.

Beispiel: Eine stETH-Position auf Aave kombiniert zwei Protokolle (Lido + Aave).

**Deliverable:** Liste von drei komponierten Positionen mit den beteiligten Protokollen und einer kurzen Erklärung, was die Komposition erreicht.

## Quiz

**Frage 1:** Was bedeutet "Komponierbarkeit" in DeFi, und warum ist sie strukturell so mächtig?

Antwort anzeigen

Komponierbarkeit bedeutet, dass DeFi-Protokolle andere Protokolle als Bausteine verwenden können, weil alle auf denselben öffentlichen Smart-Contract-Standards laufen. Sie ist strukturell mächtig, weil neue Protokolle nicht das gesamte Finanz-Ökosystem neu bauen müssen — sie nutzen bestehende Bausteine. Das führt zu Innovationszyklen, die in traditionellem Finanzwesen unmöglich sind, weil dort APIs beschränkt und Systeme proprietär sind.



**Frage 2:** Was ist die Kehrseite der Komponierbarkeit, und welches Risiko entsteht dadurch?

Antwort anzeigen

Komponierbarkeits-Risiko: Je tiefer ein Baustein im Stack liegt, desto größer ist die systemische Wirkung, wenn er bricht. Wenn ein basales Protokoll (z.B. ein Stablecoin oder ein Liquid-Staking-Token) depeggt oder gehackt wird, können alle darauf aufbauenden Protokolle betroffen sein. Ein Beispiel wäre der stETH-Depeg im Juni 2022, der Liquidationen in mehreren darauf aufbauenden Protokollen auslöste.



## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 6 Slides: Titel → 4 Probleme → 4 Prinzipien → Komponierbarkeits-Beispiel → Kehrseite/Risiko → Zusammenfassung
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — Vier-Quadranten-Layout, Flussdiagramm Lido→Aave→Curve→Convex, Jenga-Turm-Metapher mit stETH-Depeg-Referenz Juni 2022

Pipeline: Gamma → ElevenLabs → CapCut.

---
