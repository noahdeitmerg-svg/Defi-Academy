# Convex Finance als ve-Wrapper

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die Wrapper-Mechanik von Convex verstehen und von direktem veCRV unterscheiden
- Die Rollen von cvxCRV und vlCVX in Convex' Ökosystem nachvollziehen
- Einschätzen, wann Convex für eigene Strategien sinnvoll ist
- Die Trade-offs zwischen direktem veCRV-Locking (volle Kontrolle, illiquide) und cvxCRV (liquide, abgetretene Rechte) quantitativ bewerten
- vlCVX (vote-locked CVX, 16 Wochen) als sekundäres Stimmrechts-System nachvollziehen
- Die Kostenstruktur (Convex-Performance-Fee, verlorener direkter Boost) in eine Netto-Rendite-Rechnung einarbeiten

## Erklärung

**Das Problem, das Convex löst**

In Lektion 13.2 haben wir gesehen: veCRV hat starke Vorteile (Boost, Fees, Stimmrechte), aber auch harte Nachteile (4 Jahre Lock, Illiquidität, wöchentliche Voting-Verpflichtung). Für die meisten Retail-Nutzer ist diese Trade-off nicht attraktiv.

Convex Finance (Launch Mai 2021) trat mit einer eleganten Lösung auf: **"Gib uns dein CRV, wir kümmern uns um den Lock und das Voting — du bekommst die Vorteile ohne die Nachteile."**

Die Funktionsweise klingt zu gut, um wahr zu sein. Aber sie funktioniert — mit eigenen Trade-offs, die wir im Detail erklären.

**Die drei Convex-Tokens**

Um Convex zu verstehen, muss man drei Tokens unterscheiden:

**Token 1: CRV** — der Basis-Token von Curve. Das ist, was Nutzer haben, wenn sie CRV-Emissionen verdienen oder auf dem Markt kaufen.

**Token 2: cvxCRV** — die "Convex-Version" von CRV. Wenn du CRV an Convex gibst, bekommst du cvxCRV im Verhältnis 1:1 zurück. cvxCRV ist **handelbar** und **liquide**.

**Token 3: CVX** — Convex' eigener Governance-Token. Erhalten durch LP-Aktivität auf Convex. Kann selbst gelockt werden (als vlCVX).

**Plus: vlCVX** — "vote-locked CVX". Wenn du CVX für 16 Wochen lockst, bekommst du vlCVX, was Stimmrechte in Convex-Governance gibt.

**Die Mechanik im Detail**

**Schritt 1: CRV zu cvxCRV konvertieren**

Nutzer A hat 1.000 CRV. Er kann:
- Option 1: Direkt veCRV erstellen (4 Jahre Lock)
- Option 2: An Convex geben → bekommt 1.000 cvxCRV sofort

Bei Option 2 lockt Convex die 1.000 CRV **permanent** — nicht für 4 Jahre, sondern für immer. Das ist zentral: Convex akkumuliert veCRV, das niemals mehr freigegeben wird.

Der Nutzer bekommt im Tausch 1.000 cvxCRV. Diese sind:
- **Handelbar:** auf DEXs wie Curve, Uniswap, Balancer
- **Liquide:** jederzeit gegen CRV (zu Marktpreis) tauschbar
- **Yield-tragend:** cvxCRV-Halter bekommen Anteil an veCRV-Erträgen

**Schritt 2: Was cvxCRV-Halter bekommen**

cvxCRV-Halter (wenn sie ihre cvxCRV staken) erhalten:
- **50% der Curve-Protokoll-Fees** (in 3CRV), proportional zum cvxCRV-Anteil
- **CRV-Emissions-Rewards** die Convex von seinem veCRV-Hold bekommt (als LP-Boost für andere)
- **CVX-Rewards** zusätzlich als Convex-eigene Emissionen

In Summe: typisch 10-25% APR in einer Mischung aus 3CRV, CRV und CVX.

**Vergleich zu direktem veCRV:** cvxCRV-Halter bekommen die meisten Vorteile (Fees, Rewards), aber **nicht das Voting-Recht über Gauge-Weights**. Das Voting liegt bei Convex selbst — spezifisch bei vlCVX-Haltern.

**Schritt 3: Der "peg" von cvxCRV**

cvxCRV ist theoretisch 1:1 zu CRV. Aber in der Praxis handelt es oft leicht unter dem CRV-Preis — typisch 0,90-0,95 CRV pro cvxCRV.

**Warum?** Weil die Umwandlung einseitig ist. Du kannst CRV zu cvxCRV machen, aber nicht umgekehrt via Convex. Wer aus seiner cvxCRV-Position aussteigen will, muss auf dem offenen Markt verkaufen. Und der Markt preist die "permanent gelockte"-Eigenschaft mit einem Discount ein.

**Für den Nutzer bedeutet das:** Wenn du cvxCRV kaufst (statt direkt CRV an Convex zu geben), kaufst du oft zu 0,92 CRV pro cvxCRV. Das ist ein impliziter "Discount-Yield" von ~8%. Plus die normalen cvxCRV-Rewards. In bestimmten Markt-Bedingungen ist cvxCRV-Kauf attraktiver als direkte CRV-Deposit.

**Die vlCVX-Dimension**

Das eigentliche Macht-Zentrum von Convex ist vlCVX.

**Wie vlCVX entsteht:** Nutzer verdienen CVX als Rewards (durch LP-Aktivität auf Convex-integrierten Pools). Diese CVX kann entweder verkauft oder **für 16 Wochen gelockt** werden zu vlCVX.

**Was vlCVX kann:**
- **Voting-Rechte in Convex:** Welche Gauge-Weights bei Curve soll Convex unterstützen
- **Bribe-Einnahmen:** Durch Votium und ähnliche Plattformen
- **Base-Rewards:** Ein Teil der Protokoll-Einnahmen fließt an vlCVX-Halter

**Die wirtschaftliche Logik:**

Convex hält veCRV (permanent gelockt von cvxCRV-Nutzern). Wenn Convex wöchentlich über Gauge-Weights abstimmt, entscheidet tatsächlich die vlCVX-Community. **vlCVX ist damit die effektive Stimme über Milliarden USD in Curve-Emissionen.**

Das macht vlCVX zu einem der wertvollsten Governance-Tokens in DeFi. Protokolle, die CRV-Emissionen zu ihren Pools lenken wollen, bribbeln vlCVX-Halter direkt (über Votium).

**Die typischen vlCVX-Yield-Zahlen:**
- **Bribes:** historisch 5-20% APR, hochvolatil je nach aktuellem Markt
- **Base Rewards:** ~2-5% APR
- **Gesamt:** 10-25% APR in typischen Marktphasen

Diese Zahlen sind **deutlich höher** als passive Stablecoin-Strategien. Aber sie kommen mit dem 16-Wochen-Lock und der Notwendigkeit, aktiv zu voten oder auto-voting-Services zu nutzen.

**Der Convex-Netzwerkeffekt**

Der Grund für Convex' Dominanz: ein selbstverstärkender Kreislauf.

1. Mehr Nutzer geben CRV an Convex → mehr veCRV bei Convex
2. Mehr veCRV → mehr Voting-Macht bei Curve → Convex kann besseren Boost für LPs verhandeln
3. Besserer Boost → mehr LPs wählen Convex statt direktem Curve
4. Mehr LP-Aktivität → mehr CVX-Emissionen → mehr vlCVX-Lock-Incentive
5. Mehr vlCVX → mehr Bribe-Einkommen → mehr Nutzer-Attraktion
6. Zurück zu Schritt 1

Dieser Kreislauf funktionierte so gut, dass Convex in den ersten Monaten nach Launch über 40-50% aller veCRV akkumulierte. Heute (2025-2026) liegt der Anteil bei etwa 35-45% — immer noch dominant, aber weniger extrem.

**Die Nutzung für LPs (der Haupt-Use-Case für Retail)**

Die häufigste Convex-Nutzung für normale Nutzer ist **nicht** cvxCRV-Halten oder vlCVX-Voting — es ist das **Deposit von LP-Tokens in Convex für Boosted Rewards**.

**Beispiel:** Alice hat eine 10.000 USD Position im 3pool auf Curve.

**Option 1: LP-Token direkt auf Curve staken**
- Bekommt: Base LP-Fees + unboosted CRV-Rewards
- Typisch: 2-4% APR insgesamt

**Option 2: LP-Token auf Convex deponieren**
- Bekommt: Base LP-Fees + boosted CRV-Rewards (via Convex' veCRV-Hold) + CVX-Rewards
- Typisch: 5-10% APR insgesamt
- Keine eigene CRV-Lock nötig

**Die Rechnung ist klar:** Für Retail-LPs ist Convex-Deposit fast immer besser als direktes Curve-Staking. Das ist der Grund, warum Convex's LP-TVL konstant hoch bleibt.

**Die Trade-offs von Convex**

**Trade-off 1: Zusätzliches Smart-Contract-Risiko.** Du vertraust nicht nur Curve, sondern auch Convex. Wenn Convex einen Bug hat, kann deine Position betroffen sein.

**Trade-off 2: cvxCRV-Discount.** Wer aus cvxCRV aussteigen will, verliert meist 5-10% gegen CRV-Preis. Das ist der Preis der "instant liquidity".

**Trade-off 3: Abhängigkeit von CVX-Preis.** Ein erheblicher Teil der Convex-Rewards kommt in CVX. Wenn CVX-Preis fällt, sinken reale Renditen.

**Trade-off 4: Governance-Zentralisierung.** Wer über Convex partizipiert, trägt zur Zentralisierung von Curve-Governance bei. Das ist philosophisch unterschiedlich zu bewerten.

## Folien-Zusammenfassung

**[Slide 1] — Titel**
Convex Finance als ve-Wrapper

**[Slide 2] — Das Problem**
veCRV direkt: 4 Jahre Lock, illiquide, komplex
Für Retail nicht attraktiv
Convex-Lösung: Wrapper mit Vorteilen

**[Slide 3] — Drei Convex-Tokens**
CRV: Basis-Token
cvxCRV: liquide Wrapper-Version
CVX: Convex-Governance-Token
vlCVX: gelocktes CVX für Voting

**[Slide 4] — Die Mechanik**
CRV an Convex → cvxCRV 1:1
Convex lockt CRV permanent
cvxCRV-Halter bekommen Rewards
Voting bleibt bei vlCVX

**[Slide 5] — cvxCRV-Peg**
Theoretisch 1:1 zu CRV
Praktisch meist 0,90-0,95
Permanent-Lock-Discount
Kauf unter Peg = impliziter Yield

**[Slide 6] — vlCVX als Machtzentrum**
16 Wochen Lock auf CVX
Stimmt über Convex-Votes ab
Kontrolliert Milliarden CRV-Emissionen
Bribes als Haupt-Einkommen

**[Slide 7] — LP-Deposit (Retail-Fall)**
LP auf Curve direkt: 2-4% APR
LP auf Convex: 5-10% APR
Kein eigener Lock nötig
Der Haupt-Use-Case

**[Slide 8] — Trade-offs**
Zusätzliches Smart-Contract-Risiko
cvxCRV-Peg-Discount
CVX-Preis-Abhängigkeit
Governance-Zentralisierung

## Sprechertext

**[Slide 1]** Convex Finance ist der wichtigste ve-Wrapper in DeFi. In dieser Lektion verstehen wir, wie die Mechanik funktioniert und warum Convex so dominant wurde.

**[Slide 2]** Das Problem, das Convex löst. Direktes veCRV hat 4 Jahre Lock, ist illiquide, und erfordert wöchentliches Voting. Für die meisten Retail-Nutzer ist das nicht attraktiv. Convex' Lösung: gib uns dein CRV, wir kümmern uns um den Lock und das Voting, du bekommst die Vorteile ohne die Nachteile.

**[Slide 3]** Drei Convex-Tokens muss man unterscheiden. CRV ist der Basis-Token von Curve. cvxCRV ist die Convex-Version — handelbar und liquide. CVX ist Convex' eigener Governance-Token. vlCVX ist 16 Wochen gelocktes CVX mit Stimmrechten.

**[Slide 4]** Die Mechanik. Nutzer gibt 1.000 CRV an Convex, bekommt 1.000 cvxCRV im Tausch. Convex lockt die 1.000 CRV permanent — nicht 4 Jahre, sondern für immer. cvxCRV-Halter, die staken, bekommen 50 Prozent der Curve-Fees, CRV-Rewards und CVX-Rewards. Typisch 10 bis 25 Prozent APR. Aber: Voting-Rechte liegen bei vlCVX-Haltern, nicht bei cvxCRV-Haltern.

**[Slide 5]** Der cvxCRV-Peg. Theoretisch 1:1 zu CRV, praktisch meist 0,90 bis 0,95. Warum? Weil die Umwandlung einseitig ist. Wer aussteigt, muss auf dem Markt verkaufen. Der Markt preist die "permanent-gelockte"-Eigenschaft mit Discount ein. Für clevere Nutzer: cvxCRV-Kauf unter Peg ergibt impliziten Yield von 5 bis 10 Prozent zusätzlich zu normalen Rewards.

**[Slide 6]** vlCVX ist das Machtzentrum von Convex. Nutzer locken CVX für 16 Wochen, bekommen vlCVX mit Stimmrechten in Convex' Governance. Convex wiederum entscheidet über Gauge-Weight-Votes bei Curve. Damit kontrolliert vlCVX-Community effektiv Milliarden USD CRV-Emissionen. Haupt-Einkommen: Bribes über Votium, typisch 5 bis 20 Prozent APR. Plus Base-Rewards. Gesamt oft 10 bis 25 Prozent APR.

**[Slide 7]** Der häufigste Convex-Use-Case für Retail: LP-Deposit. Alice hat 10.000 Dollar in 3pool auf Curve. Direkt gestakt: 2 bis 4 Prozent APR. Über Convex deponiert: 5 bis 10 Prozent APR — durch Convex' veCRV-Boost plus CVX-Rewards. Kein eigener Lock nötig. Für Retail-LPs fast immer besser als direktes Curve-Staking.

**[Slide 8]** Die ehrlichen Trade-offs. Erstens: zusätzliches Smart-Contract-Risiko — du vertraust nicht nur Curve, sondern auch Convex. Zweitens: cvxCRV-Peg-Discount, 5 bis 10 Prozent Verlust beim Ausstieg. Drittens: CVX-Preis-Abhängigkeit — bei fallendem CVX sinken reale Renditen. Viertens: Governance-Zentralisierung — wer über Convex partizipiert, trägt zur Zentralisierung bei. Für LPs sind diese Trade-offs meist akzeptabel im Austausch für den signifikanten Rendite-Boost.

## Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Vergleich direct-veCRV vs. Convex-Wrapper, Pros/Cons-Tabelle.

**[Slide 3]** **SCREENSHOT SUGGESTION:** Convex Finance Dashboard (convexfinance.com) mit den verschiedenen Token-Typen.

**[Slide 4]** Flowchart: CRV → Convex → cvxCRV + permanent-lock.

**[Slide 5]** cvxCRV/CRV-Peg-Chart historisch.

**[Slide 6]** **SCREENSHOT SUGGESTION:** Votium-Bribe-Dashboard für vlCVX-Voter.

**[Slide 7]** APR-Vergleich: Curve direkt vs. Convex, mit Aufschlüsselung der Reward-Komponenten.

**[Slide 8]** Vier-Trade-offs-Karten mit Warnsymbolen.

## Übung

**Aufgabe: Convex-Deposit vs. direkt-Curve-Analyse**

Angenommen, du hast 25.000 USD Position im stETH/ETH Pool auf Curve.

Recherchiere aktuelle Zahlen:
1. Basis-APR für stETH/ETH auf Curve (ohne Boost)
2. APR für denselben Pool via Convex
3. Was ist der konkrete Reward-Mix bei Convex (3CRV + CRV + CVX)?
4. Welche Risiken sind spezifisch zu Convex (die du nicht bei direkter Curve-Nutzung hättest)?

Für die Analyse:
- Erwartete Jahres-Rendite beider Optionen in USD
- Risk-adjusted-Bewertung
- Welche Option wählst du und warum?

**Deliverable:** Vergleichs-Tabelle mit konkreten Zahlen + Entscheidungs-Begründung (8-12 Sätze).

## Quiz

**Frage 1:** Alice hat 5.000 CRV. Sie überlegt zwischen drei Optionen: (a) direkt veCRV für 4 Jahre, (b) cvxCRV auf Convex halten, (c) CVX kaufen und vlCVX werden. Wie würdest du ihre Entscheidung strukturieren?

<details>
<summary>Antwort anzeigen</summary>

Die Entscheidung hängt von mehreren Faktoren ab — Zeit-Horizont, Risiko-Toleranz, aktives Management und Rendite-Ziel. Eine strukturierte Analyse: **Option (a) direkt veCRV:** Alice lockt ihre 5.000 CRV für 4 Jahre. Vorteile: direkte Curve-Voting-Rechte, 50% Protokoll-Fees, bis 2,5x Boost auf eigene LP-Position (falls sie eine hat). Nachteile: 4 Jahre Kapital-Bindung, wöchentliches Voting nötig für Optimierung, CRV-Preis-Risiko, Opportunitäts-Kosten. Geeignet für: langfristige Curve-Gläubige, die aktiv managen wollen und eigene LP-Position haben. **Option (b) cvxCRV halten:** Alice tauscht ihre 5.000 CRV in 5.000 cvxCRV über Convex. Vorteile: sofort liquide (kann jederzeit verkaufen), bekommt 50% Curve-Fees + CVX-Rewards, kein eigenes Voting-Management, typisch 10-20% APR. Nachteile: cvxCRV-Peg-Discount beim Ausstieg (5-10%), zusätzliches Smart-Contract-Risiko durch Convex, keine direkten Stimmrechte. Geeignet für: passive Halter, die die Vorteile von veCRV wollen ohne Lock und Management-Aufwand. **Option (c) CVX kaufen und vlCVX:** Alice verkauft 5.000 CRV am Markt (aktuell ~2.500 USD bei CRV=0,50), kauft entsprechend CVX (aktuell ~3 USD = ~800 CVX), lockt es für 16 Wochen als vlCVX. Vorteile: höheres Rendite-Potenzial durch Bribes (10-25% APR), kürzerer Lock (16 Wochen vs. 4 Jahre), Einfluss auf Convex-Governance. Nachteile: signifikantes CVX-Preis-Risiko, aktive Voting-Aufgabe (oder Delegation an Services wie llama.airforce), nur 16-Wochen-Rollover, komplexer Reward-Mix. Geeignet für: aktive DeFi-Nutzer, die höheres Risiko für höhere Rendite akzeptieren, bereit sind, Voting aktiv zu managen oder an Services zu delegieren. **Struktur der Entscheidung für Alice:** Erstens: Hat sie eine eigene LP-Position in Curve? Wenn ja, ist Option (a) attraktiv wegen Boost. Wenn nein, sind (b) oder (c) besser. Zweitens: Wie aktiv will sie managen? Passiv → (b). Wöchentliches Voting → (a). Aktives Bribe-Management → (c). Drittens: Wie lang ist ihr Investment-Horizont? Unter 1 Jahr: nur (b) oder (c). 1-3 Jahre: alle Optionen. 4+ Jahre: alle, (a) am interessantesten. Viertens: Rendite-Ziel. Wenn 5-7% reicht → (b) ist passiv und solide. Wenn sie 15-20% anstrebt und dafür mehr Risiko akzeptiert → (c). Wenn sie selbst LPing und maximalen Boost will → (a). Fünftens: Risiko-Toleranz. (b) ist am passivsten und konservativsten. (c) hat höchstes Token-Preis-Risiko (CVX ist volatiler als CRV). (a) hat maximales Kapital-Bindungs-Risiko. Meine Empfehlung für typische Retail-Nutzer wie Alice: Option (b) cvxCRV ist der konservative Sweet Spot. 10-20% APR ohne Lock, mit Liquidität, mit geringem Management-Aufwand. Wer maximale Rendite will und aktiv ist: (c). Wer tief in Curve-Ökosystem involviert ist und LP-Boost maximieren will: (a).
</details>

**Frage 2:** Warum ist der cvxCRV-"Discount" auf dem Markt (0,90-0,95 CRV pro cvxCRV) ökonomisch rational und nicht ein "Bug"?

<details>
<summary>Antwort anzeigen</summary>

Der Discount reflektiert strukturelle Unterschiede zwischen CRV und cvxCRV, die ökonomisch substanziell sind. Vier Haupt-Gründe: **Grund 1: Einweg-Konvertierung.** CRV kann zu cvxCRV werden, aber nicht umgekehrt. Convex lockt CRV permanent — es gibt keinen "Unstake"-Mechanismus. Wer cvxCRV hat und CRV will, muss auf dem Markt verkaufen (oder cvxCRV halten und auf Rewards warten). Das schafft eine strukturelle Asymmetrie: die Demand-Seite für cvxCRV ist auf Leute begrenzt, die wissen, was sie tun; die Supply-Seite umfasst alle, die aussteigen wollen. Die Supply-Seite hat mehr Abwärts-Druck. **Grund 2: Opportunitäts-Kosten der Permanent-Lock.** CRV ist liquide — kann jederzeit verkauft, geliehen, als Sicherheit genutzt werden. cvxCRV ist liquide (handelbar), aber das zugrundeliegende CRV ist permanent gelockt. Wenn sich in 5-10 Jahren eine bessere Investition ergibt, kann CRV verwendet werden, aber das Convex-geloskte CRV nicht. Diese "optionality loss" muss mit Discount kompensiert werden. **Grund 3: Risiko-Konzentration in Convex.** cvxCRV-Halter tragen Convex-spezifisches Smart-Contract-Risiko zusätzlich zu Curve-Risiko. Wenn Convex einen kritischen Bug hat, ist cvxCRV potenziell unterbesichert. CRV hat dieses Risiko nicht. Das Risiko-Delta rechtfertigt einen Discount. **Grund 4: Abhängigkeit von Convex-Governance.** cvxCRV-Halter vertrauen Convex, ihr CRV gut zu managen (Voting, Reward-Management, etc.). Wenn Convex' Governance schlechte Entscheidungen trifft, leiden cvxCRV-Halter direkt. Diese "delegation risk" ist real. **Warum der Discount trotzdem begrenzt ist:** Wenn cvxCRV zu stark unter dem Peg handelt (z.B. 0,70), entsteht ein Arbitrage-Opportunity: Nutzer können cvxCRV billig kaufen, die Rewards einstreichen (die ja auf dem Basis-CRV-Wert berechnet werden), und so hohe implizite Renditen bekommen. Das zieht Kapital an, bis der Peg sich auf ein "faires" Niveau einpendelt — typisch 0,90-0,95 bei normalen Marktbedingungen. **Warum der Discount als "feature" funktioniert:** Der Discount gibt einem potenziellen Nutzer drei Optionen: (a) CRV direkt an Convex geben → bekommt 1,00 cvxCRV, aber die 5% impliziten "Discount-Yield" entgehen ihm, (b) CRV direkt veCRV machen → 4 Jahre Lock, aber komplettes Paket, (c) cvxCRV auf dem Markt kaufen → bekommt 1,05 cvxCRV pro 1,00 CRV-Wert bei 0,95-Peg, impliziter Bonus-Yield. Diese Wahl-Struktur ist wirtschaftlich gesund. Jede Option hat klare Trade-offs. Der Discount ist nicht "inefficient" — er ist ein marktbasiertes Pricing der strukturellen Unterschiede. **Die Implikation für smarte Nutzer:** Wenn der Discount unter 0,92 fällt (also cvxCRV extrem günstig handelt), ist Kauf über den Markt oft die beste Option. Wenn er über 0,97 steigt, ist direktes Deposit bei Convex günstiger. Clevere Nutzer beobachten den Peg und wählen den optimalen Weg. Historisch hat der Peg 2020-2024 zwischen 0,85 und 0,99 geschwankt, mit Tiefs in Bear-Markets (mehr Ausstiegsdruck) und Hochs in Bull-Markets (mehr Akkumulations-Interesse).
</details>

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 8 Folien: Titel → Convex als Wrapper → cvxCRV-Mechanik → vlCVX-Rolle → Bribes & Votium → Convex vs. direktes veCRV → cvxCRV-Peg → Retail-Empfehlungen
- `voice_script.txt` — *Sprechertext* (120–140 WPM, Zielvideo 11–13 Min.)
- `visual_plan.json` — Convex-Wrapper-Diagramm, CRV-veCRV-cvxCRV-Flow, vlCVX-Voting-Zyklus, cvxCRV-Peg-Chart, Retail-Entscheidungsbaum

Pipeline: Gamma → ElevenLabs → CapCut.

---
