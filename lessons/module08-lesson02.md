# Fiat-besicherte Stablecoins: USDC und USDT

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- USDCs und USDTs Reserve-Strukturen im Detail vergleichen
- Die zentralen Risiken jedes Emittenten einordnen
- Regulatorisches Risiko als strukturellen Faktor identifizieren
- Die Reserve-Attestierungs- und Audit-Praxis von Circle (USDC) und Tether (USDT) kritisch bewerten
- Das historische USDC-Depeg-Event im März 2023 (SVB-Krise) in seiner Mechanik und den Lehren nachvollziehen
- PYUSD, FDUSD und weitere fiat-besicherte Stablecoins in ihrer relativen Positionierung einordnen

## Erklärung

Fiat-besicherte Stablecoins dominieren nach Market Cap. Zusammen machen USDC und USDT über 80% des gesamten Stablecoin-Markts aus. Ihre Strukturen scheinen ähnlich — aber die Details unterscheiden sich in wichtigen Aspekten.

**USDC — Circle**

**Emittent:** Circle Internet Financial, Inc. (mit Sitz in den USA)

**Reserve-Struktur (Stand aktueller Transparenz-Reports):**
- Überwiegend in kurzlaufenden US-Treasuries (75–85%)
- Bargeld-Reserven bei regulierten US-Banken (15–25%)
- Keine Kredite, keine Commercial Paper (seit 2022)

**Transparenz:**
- Monatliche Attestations durch Grant Thornton (Wirtschaftsprüfer)
- Reserve-Portfolio wöchentlich aktualisiert
- Circle veröffentlicht detaillierte Transparenz-Berichte auf circle.com

**Regulierung:**
- Circle ist in den USA als Money Transmitter in verschiedenen Bundesstaaten registriert
- MiCA-konform in der EU (ab Juni 2024)
- Reguliert durch NYDFS (New York Department of Financial Services)
- Starke Zusammenarbeit mit US-Behörden

**Blacklist-Mechanismus:**
- Circle kann einzelne Adressen einfrieren (on-chain)
- Wurde historisch genutzt bei Tornado-Cash-Sanktionen (August 2022) und anderen gesetzlichen Anforderungen
- Für normale Nutzer nicht relevant, aber strukturell wichtig zu wissen

**USDC-Stärken:**
- Klare Regulierung, transparente Reserven
- Einfach auditierbar
- Schnelle Anpassung an regulatorische Anforderungen (MiCA)
- Schnelle Mint/Redeem-Prozesse für institutionelle Nutzer

**USDC-Schwächen:**
- Zentralisiert — Circle kann Token einfrieren
- Abhängig von US-Banken-System (siehe SVB-Krise März 2023)
- Regulatorisches Risiko (US-Politik könnte sich ändern)

**USDT — Tether**

**Emittent:** Tether Limited (Sitz auf den British Virgin Islands, operativ Hongkong)

**Reserve-Struktur (Stand aktueller Attestations):**
- Kurzlaufende US-Treasuries (etwa 80%)
- Bargeld-Reserven
- Gold-Reserven (wenige Prozent)
- Bitcoin-Reserven (wenige Prozent)
- Secured Loans (weniger als 5%)
- Corporate Bonds (minimal)

**Transparenz:**
- Quartalsweise Attestations durch BDO Italia
- Reserve-Breakdown publik, aber weniger detailliert als USDC
- Kritik historisch an unvollständiger Transparenz, hat sich verbessert

**Regulierung:**
- Nicht direkt in den USA reguliert
- Settled mit NYAG 2021 (18,5 Mio. USD Strafe wegen irreführender Reserve-Claims)
- Settled mit CFTC 2021 (41 Mio. USD Strafe)
- Nicht MiCA-konform für EU-Nutzer (2024 wurde USDT auf einigen EU-Plattformen delisted)

**Blacklist-Mechanismus:**
- Tether kann Token einfrieren
- Hat das für sehr große Beträge (oft im Zusammenhang mit Hacks oder Sanktionen) getan
- Weniger aggressiv eingesetzt als von USDC

**USDT-Stärken:**
- Größte Liquidität im Krypto-Markt insgesamt
- Tiefste Order-Books auf CEXs (besonders in Asien)
- Lange Historie (seit 2014) ohne Kollaps
- Tether ist extrem profitabel (kann Depegs durch Reserve-Nutzung stabilisieren)

**USDT-Schwächen:**
- Weniger transparente Regulierungs-Situation
- Historische Reserve-Bedenken (verbessert, aber nicht vergessen)
- Nicht MiCA-konform — für EU-Nutzer rechtliche Unsicherheit
- Konzentriertes Halter-Risiko bei einigen großen CEXs

**USDC-Depeg März 2023: Die Case Study**

Am 10. März 2023 kollabierte die Silicon Valley Bank (SVB) — eine der großen US-Banken, bei der Circle ca. 3,3 Milliarden USD USDC-Reserven hielt. Die Folge:

**Freitag 10.3.:** SVB-Kollaps wird öffentlich.
**Freitag 10.3. Abend:** Circle confirmed, 3,3 Mrd. USD bei SVB.
**Samstag 11.3.:** Panic-Verkäufe beginnen. USDC fällt auf 0,88 USD.
**Sonntag 12.3.:** US-Regulatoren announcieren, alle SVB-Einlagen sind versichert.
**Montag 13.3.:** USDC erholt sich auf nahezu 1,00 USD.

**Was passierte:**
- Circles Reserven waren zu 100% gedeckt, aber 3,3 Mrd. USD waren temporär eingefroren
- Einlöse-Prozess war pausiert über das Wochenende (US-Banken sind Samstag/Sonntag geschlossen)
- Der Arbitrage-Mechanismus konnte nicht funktionieren — niemand konnte USDC einlösen
- Die Panik fütterte sich selbst (Nutzer wollten raus, kein Käufer, Preis fällt weiter)

**Wer Verlust machte:** Jeder, der während der Panik USDC zum Marktpreis (unter 1 USD) verkaufte. Wer wartete, bekam Peg zurück.

**Lektion:** Selbst voll-besicherte Stablecoins können temporär depeggen. Der Peg-Mechanismus erfordert Funktionsfähigkeit der Markt-Infrastruktur — bei Wochenend-Ereignissen oder Bank-Krisen kann das aussetzen.

**USDT-Stabilität trotz Zweifel**

USDT hat eine merkwürdige Eigenschaft: über Jahre hinweg gab es immer wieder Zweifel an den Reserven, negative Presse, regulatorische Herausforderungen. Trotzdem hat USDT nie signifikant depeggt (die größten Abweichungen waren 2–3% in Krisensituationen, schnell erholt).

**Gründe für diese Stabilität:**
- Tether ist extrem profitabel (verdient Milliarden durch US-Treasury-Zinsen auf Reserven)
- Sie haben mehr als genug Reserven, um auch große Redemptions zu bedienen
- Die weltweite USDT-Nachfrage (besonders Asien) ist strukturell sehr hoch
- Im schlimmsten Fall kann Tether eigene Bitcoin/Gold-Reserven zur Peg-Verteidigung nutzen

Das heißt nicht, dass USDT risikofrei ist — nur dass die historische Bilanz trotz anhaltender Skepsis robust ist.

**Konservative Allokations-Regeln**

Für fiat-besicherte Stablecoins:

1. **Nicht 100% in einen einzigen Emittenten.** Diversifiziere über USDC und USDT (und ggf. weitere wie PYUSD für kleine Beträge).
2. **USDC als Kern für EU/US-Nutzer.** Besser reguliert, transparenter, MiCA-konform.
3. **USDT als Diversifikation.** Besonders wenn auf CEXs oder in internationalen Kontexten genutzt.
4. **Exposure-Check:** Wie viel deines Portfolios ist effektiv an eine einzelne Bank (Circle-Reserven) oder Jurisdiction (Tether-Offshore) gebunden?
5. **Monitoring:** Reserve-Reports lesen, mindestens quartalsweise. Änderungen in Reserve-Zusammensetzung können Frühwarnungen sein.

## Folien-Zusammenfassung

**[Slide 1] — Titel**
Fiat-besicherte Stablecoins: USDC und USDT

**[Slide 2] — USDC im Detail**
Circle, USA
Reserven: 75–85% T-Bills, 15–25% Bank-Cash
Monatliche Attestations, MiCA-konform
Blacklist-fähig, zentralisiert

**[Slide 3] — USDT im Detail**
Tether Limited, BVI/Hongkong
Reserven: 80% T-Bills, Cash, Gold, Bitcoin, Loans
Quartalsweise Attestations
Nicht MiCA-konform (EU-delisted)
Blacklist-fähig

**[Slide 4] — USDC-Depeg März 2023**
SVB-Kollaps → 3,3 Mrd. USD eingefroren
USDC fiel auf 0,88 USD
Innerhalb von 72h zurück auf Peg
Lektion: Einlöse-Prozess ist Teil des Pegs

**[Slide 5] — USDT-Stabilität**
Trotz jahrelanger Zweifel: nie signifikant depeggt
Profitabilität + Reserven + Nachfrage = robust
Aber: nicht risikofrei

**[Slide 6] — Vergleich**
USDC: Regulierung, Transparenz
USDT: Liquidität, globale Nachfrage
Beide haben unterschiedliche Risikoprofile

**[Slide 7] — Konservative Allokation**
Diversifizieren über Emittenten
USDC als Kern für regulierte Jurisdictions
USDT als Diversifikation
Reserve-Reports monitoren

## Sprechertext

**[Slide 1]** Diese Lektion behandelt die zwei dominanten fiat-besicherten Stablecoins: USDC und USDT. Zusammen machen sie über 80 Prozent des Stablecoin-Markts aus. Ihre Strukturen sind ähnlich, aber die Details unterscheiden sich in wichtigen Punkten.

**[Slide 2]** USDC im Detail. Emittent ist Circle Internet Financial in den USA. Reserven bestehen zu 75 bis 85 Prozent aus kurzlaufenden US-Treasuries, 15 bis 25 Prozent Bargeld bei regulierten US-Banken. Monatliche Attestations durch Grant Thornton. MiCA-konform in der EU seit Juni 2024. Circle kann Adressen blacklisten — wurde bei Tornado-Cash-Sanktionen 2022 genutzt. Zentralisiert, aber sehr transparent.

**[Slide 3]** USDT im Detail. Emittent ist Tether Limited mit Sitz auf den British Virgin Islands, operativ in Hongkong. Reserven sind diversifizierter: 80 Prozent T-Bills, dazu Bargeld, Gold, Bitcoin und kleine Anteile Secured Loans. Quartalsweise Attestations durch BDO Italia. Nicht MiCA-konform — auf einigen EU-Plattformen 2024 delisted. Blacklist-fähig, aber weniger aggressiv eingesetzt als USDC.

**[Slide 4]** Die wichtige Case Study: USDC-Depeg im März 2023. Am 10. März kollabierte die Silicon Valley Bank. Circle hatte dort 3,3 Milliarden Dollar USDC-Reserven. Über das Wochenende war das Geld temporär eingefroren. Der Einlöse-Prozess pausiert, der Arbitrage-Mechanismus funktioniert nicht. USDC fiel auf 0,88 Dollar. Am Montag announcierten US-Regulatoren, dass alle SVB-Einlagen gesichert sind. Montag Abend war USDC fast zurück auf einem Dollar. Lektion: selbst voll-besicherte Stablecoins können temporär depeggen. Der Peg braucht funktionsfähige Markt-Infrastruktur.

**[Slide 5]** Eine merkwürdige Eigenschaft von USDT. Jahre voller Skepsis, Zweifel, negativer Presse — und nie ein signifikanter Depeg. Die größten Abweichungen waren 2 bis 3 Prozent in Krisensituationen, schnell erholt. Gründe: Tether ist extrem profitabel durch T-Bill-Zinsen. Die Reserven sind mehr als ausreichend. Die globale Nachfrage, besonders in Asien, ist strukturell sehr hoch. Im Notfall können Bitcoin- und Gold-Reserven zur Peg-Verteidigung eingesetzt werden. Das heißt nicht, dass USDT risikofrei ist — nur, dass die historische Bilanz robust ist.

**[Slide 6]** Der Vergleich. USDC punktet bei Regulierung und Transparenz — wichtig für institutionelle und europäische Nutzer. USDT punktet bei Liquidität und globaler Nachfrage — die tiefsten Orderbooks auf CEXs. Beide haben unterschiedliche Risikoprofile: USDC ist an US-Bank-System gebunden, USDT an Offshore-Strukturen und weniger direkte Regulierung. Welcher ist besser? Die ehrliche Antwort: beide haben Platz in diversifizierten Portfolios.

**[Slide 7]** Konservative Allokations-Regeln für fiat-besicherte Stablecoins. Nicht hundert Prozent in einen einzigen Emittenten. Für EU- und US-Nutzer: USDC als Kern, weil besser reguliert und MiCA-konform. USDT als Diversifikation, besonders im internationalen Kontext. Exposure-Check: wie viel deines Portfolios ist effektiv an eine einzige Bank oder Jurisdiktion gebunden? Monitoring der Reserve-Reports mindestens quartalsweise. Änderungen in der Reserve-Zusammensetzung können Frühwarnungen sein.

## Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** **SCREENSHOT SUGGESTION:** Circle USDC Transparency Report Seite mit Reserve-Breakdown-Grafik.

**[Slide 3]** **SCREENSHOT SUGGESTION:** Tether Transparency Seite mit aktuellem Reserve-Breakdown.

**[Slide 4]** Preis-Chart von USDC März 2023 mit markiertem Depeg. **SCREENSHOT SUGGESTION:** Historischer USDC-Chart auf coingecko.com für März 2023.

**[Slide 5]** Langzeit-Preis-Chart von USDT seit 2014 mit markierten Krisen-Ereignissen und schnellen Erholungen.

**[Slide 6]** Vergleichstabelle USDC vs. USDT in 6 Dimensionen.

**[Slide 7]** Beispiel-Portfolio-Allokation für Stablecoin-Diversifikation.

## Übung

**Aufgabe: Reserve-Reports lesen und interpretieren**

1. Besuche circle.com/usdc/transparency und hole den aktuellen USDC-Reserve-Report.
2. Besuche tether.to/en/transparency und hole den aktuellen USDT-Reserve-Report.
3. Für jeden dokumentiere:
 - Gesamt-Reserve in Milliarden USD
 - Prozent-Anteile: T-Bills, Cash, andere
 - Datum des letzten Reports
 - Auditor / Attestor
4. Identifiziere Änderungen gegenüber dem Report von vor 6 Monaten (wenn historische Reports verfügbar sind).

**Deliverable:** Vergleichstabelle + kurze Analyse (5–7 Sätze): Welcher Emittent hat aktuell die konservativere Reserve-Struktur, und welche Änderungen über 6 Monate würden dich als konservativer Nutzer beunruhigen?

## Quiz

**Frage 1:** Warum war der USDC-Depeg im März 2023 strukturell anders als der UST-Kollaps im Mai 2022?

<details>
<summary>Antwort anzeigen</summary>

Der UST-Kollaps war ein fundamentales Versagen des Mechanismus — das Protokoll hatte keine echten Reserven, nur eine algorithmische Peg-Verteidigung über LUNA-Prägung. Als Panik einsetzte, versagte der Mechanismus komplett und UST fiel dauerhaft auf nahe null. Keine Wiederherstellung möglich. Der USDC-Depeg war ein temporäres Infrastruktur-Problem. Circle hatte die Reserven, sie waren nur temporär nicht einlösbar wegen des SVB-Kollapses über ein Wochenende. Sobald die Infrastruktur wiederhergestellt war (Montag-Announcement der Regulatoren), funktionierte die Arbitrage-Maschinerie wieder, und der Peg kehrte zurück. UST war ein Mechanismus-Versagen, USDC war ein Infrastruktur-Hick-up. Strukturell ist der Unterschied zwischen "der Mechanismus existiert nicht mehr" (UST, permanent) und "der Mechanismus ist temporär blockiert" (USDC, reversibel). Beide Ereignisse sind lehrreich, aber völlig unterschiedliche Risikoklassen.
</details>

**Frage 2:** Warum ist die Aussage "USDT hatte in 10 Jahren keinen echten Depeg, also ist es sicher" fehlerhaft aus Sicht konservativer Risikobewertung?

<details>
<summary>Antwort anzeigen</summary>

Drei Probleme mit dieser Logik. Erstens: historische Stabilität garantiert keine zukünftige Stabilität. Jedes Finanzsystem, das "nie gefallen ist", ist zu irgendeinem Zeitpunkt zum ersten Mal gefallen. Banken, die Jahrhunderte bestanden, sind in Finanzkrisen kollabiert. Zweitens: USDT's historische Stabilität ist teilweise das Ergebnis außergewöhnlicher Marktbedingungen (niedrige Zinsen, hohe Krypto-Nachfrage, starkes Asien-Handelsvolumen). Wenn diese Bedingungen sich signifikant ändern (z.B. sehr hohe Zinsen, Asia-Handelsverbote, große CEX-Ausfälle mit USDT-Exposure), können bisher nicht getestete Schwachstellen sichtbar werden. Drittens: USDT's regulatorische Position ist strukturell unsicherer als USDCs — als nicht-US-Entität ohne MiCA-Konformität könnte sie in Zukunft Beschränkungen unterliegen, die die Liquidität beeinträchtigen. Konservative Bewertung fragt nicht "ist es bisher gut gegangen?" sondern "welche Szenarien könnten es zum Scheitern bringen, und wie wahrscheinlich sind sie?". Für USDT: Banking-Access, regulatorische Verschärfungen, Massenausstieg von CEXs — jeweils nicht unmöglich. Das rechtfertigt die Diversifikations-Regel: nicht 100% USDT, nicht 100% USDC, verteilen.
</details>

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Folien: Titel → USDC-Architektur → USDT-Architektur → Reserve-Vergleich → USDC-Depeg März 2023 → Regulatorisches Risiko → Fiat-Stablecoin-Landscape (PYUSD/FDUSD)
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 10–12 Min.)
- `visual_plan.json` — Circle/Tether-Reserve-Berichte-Screenshots, SVB-Depeg-Chart März 2023, Regulatorische-Landschaft-Matrix (USA/EU/Asien), Reserve-Vergleichs-Tabelle

Pipeline: Gamma → ElevenLabs → CapCut.

---
