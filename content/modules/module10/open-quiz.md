## Modul-Abschluss-Quiz

Fünf Fragen zum integrierten Verständnis von Modul 10.

**Frage 1:** Erkläre die Grundformel für Leverage-Loop-Rendite und führe sie am Beispiel eines 2,5x wstETH-Loops mit 4% Yield und 3% Borrow-Cost durch.

<details>
<summary>Antwort anzeigen</summary>

Grundformel: Netto-Rendite = Yield × Leverage - Borrow-Cost × (Leverage - 1). Einsetzung: Netto = 4% × 2,5 - 3% × (2,5 - 1) = 10% - 4,5% = 5,5%. Die Interpretation: ohne Loop würde wstETH 4% Rendite bringen. Mit 2,5x Leverage wird der Spread (Yield - Borrow = 1%) um den Faktor (Leverage - 1) = 1,5 verstärkt zusätzlich zum Basis-Yield. Also: 4% + 1,5% × 1 = 5,5%. Effektiv 1,5 Prozentpunkte zusätzliche Rendite für das Leverage-Risiko. Bei 3x wäre es 4% + 2 × 1% = 6%; bei 4x 4% + 3 × 1% = 7%. Die lineare Skalierung der Rendite mit Leverage täuscht darüber hinweg, dass das Risiko gleichzeitig überproportional wächst. Das ist der Kernpunkt: Rendite-Gewinn linear, Risiko-Zuwachs überproportional.
</details>

**Frage 2:** Warum ist das Peg-Risiko (wstETH/ETH-Depeg) bei einem 3x-Loop viel schlimmer als bei einfachem wstETH-Halten? Nenne drei spezifische Verstärkungsmechanismen.

<details>
<summary>Antwort anzeigen</summary>

Erstens: direkter Leverage-Multiplikator. Bei einfachem Halten und 6% Depeg ist der Portfolio-Verlust 6%. Bei 3x-Loop ist es effektiv 3 × 6% = 18% auf das ursprüngliche Kapital. Zweitens: Liquidations-Trigger. Einfaches Halten hat keine Liquidations-Mechanik — der Halter kann warten auf Erholung. Der Loop hat eine harte Liquidations-Schwelle, die bei 6% Depeg wahrscheinlich erreicht wird (bei LTVs über 75-80%). Das bedeutet zusätzliche Liquidations-Penalty von 2-5% und unfreiwillige Position-Schließung. Drittens: Kaskaden-Effekt. Bei einfachem Halten ist man isoliert vom systemischen Geschehen. Im Loop ist man Teil eines vernetzten Systems — wenn andere Loops liquidieren, verstärkt der Verkaufsdruck die eigene Position. Der Juni-2022-Event zeigte dies: initial 3% Depeg führte zu einer Kaskade von Liquidationen, die den Depeg auf 6% vertieften — ein selbstverstärkender Prozess, der isolierte Halter nicht betraf.
</details>

**Frage 3:** Du beobachtest, dass der Yield-Borrow-Spread für einen wstETH-Loop von 1,5% auf 0,3% gefallen ist. Was ist deine rationale Reaktion, und warum?

<details>
<summary>Antwort anzeigen</summary>

Die rationale Reaktion ist signifikantes Deleveraging, wahrscheinlich 50-70% der Position. Gründe: Erstens, die Risk-adjusted-Rendite ist nicht mehr attraktiv. Bei 0,3% Spread und 3x Leverage bringt der Loop nur 0,6 Prozentpunkte mehr als einfaches Halten (zum Vergleich: bei 1,5% Spread waren es 3 Prozentpunkte). Die zusätzlichen Risiken (Peg, Smart Contract, Liquidation, Zins-Spike) werden für nur 0,6 Prozentpunkte schlecht kompensiert. Zweitens, der fallende Spread ist ein Frühwarnsignal. Er signalisiert, dass die Nachfrage nach ETH-Borrowing zunimmt — typisch ein Indikator für wachsende Leveraged-Staking-Aktivität oder Bull-Market-Leverage. Das erhöht die Wahrscheinlichkeit, dass der Spread sich weiter komprimiert oder sogar invertiert (negativer Carry). Drittens, Deleveraging ist günstiger jetzt als später. Wenn der Spread weiter fällt und möglicherweise invertiert, werden mehr Loop-Halter deleveragen. Der resultierende Verkaufsdruck auf wstETH kann den Peg drücken. Frühes Deleveraging bringt bessere Preise. Viertens, psychologischer Puffer. Eine reduzierte Position ist einfacher zu managen unter Stress. Wenn der Markt gegen dich läuft, ist eine 1x-Position einfacher zu ertragen als eine 3x-Position. Die konservative Regel aus diesem Modul war "bei Spread unter 0,5% deleveragen" — 0,3% ist weit unter dieser Schwelle. Klare Regel-Anwendung erforderlich. Die Alternative — "aussitzen und hoffen" — ist gefährlich, weil sie die vorher definierten Regeln außer Kraft setzt und Entscheidungen unter Stress trifft. Die Disziplin, Regeln auch zu folgen, wenn es gegen die Hoffnung läuft, trennt erfolgreiche Loop-Halter von denen, die in Krisen große Verluste erleiden.
</details>

**Frage 4:** Ein Anleger mit 50.000 USD Gesamt-Portfolio stellt 15.000 USD in einen 3x-wstETH-Loop. Welche Portfolio-Schwäche zeigt diese Allokation, auch wenn der Loop selbst konservativ strukturiert ist?

<details>
<summary>Antwort anzeigen</summary>

30% des Portfolios in einem 3x-Leverage-Produkt bedeutet, dass effektiv 90% des Portfolios an ETH-Preis exponiert ist (30% × 3x). Das ist extreme Konzentration. Mehrere Probleme folgen. Erstens: Korrelations-Risiko. Wenn ETH fällt, fällt auch die ETH-Exposure der anderen Portfolio-Teile (wenn es welche gibt). Bei 90% effektiver ETH-Exposition ist das Portfolio praktisch ein reines ETH-Play. Zweitens: Diversifikations-Verlust. Das Portfolio verliert den Stabilitäts-Nutzen von Stablecoin-Komponenten, weil der Loop-Teil die Gesamt-Volatilität dominiert. Drittens: Bär-Markt-Szenario. Bei ETH -30% fällt der Loop-Teil um 30% × 3 = 90% auf sein Anfangs-Kapital — das bedeutet möglicher Totalverlust des Loop-Teils (15.000 USD). Gesamt-Portfolio-Verlust: 15.000 USD + 30% Verlust auf die anderen ETH-Teile. Das kann leicht 50% oder mehr des gesamten Portfolios sein. Viertens: psychologische Belastung. 30% des Vermögens in einer gehebelten Position ist mental sehr belastend, besonders in Stress-Phasen. Das führt oft zu Panic-Entscheidungen. Bessere Allokation: Loops sollten nie mehr als 15-20% des Portfolios ausmachen, idealerweise 10%. Bei 15% Loop mit 3x-Leverage ist die effektive ETH-Exposure 45% — noch hoch, aber mit 55% Nicht-ETH-Puffer viel robuster. Der Kernpunkt: ein "konservativ strukturierter" Loop (guter HF, gute Monitoring-Regeln) ist nicht ausreichend, wenn die Portfolio-Allokation zu konzentriert ist. Portfolio-Level-Disziplin ist genauso wichtig wie Position-Level-Disziplin. Die meisten Loop-Katastrophen der DeFi-Geschichte hatten nicht schlechte Loop-Strukturen, sondern schlechte Portfolio-Allokationen — zu viel Kapital im Loop-Teil. Die Lehre: vor jedem Loop frage nicht nur "ist der Loop selbst konservativ?", sondern auch "ist mein Portfolio im Gesamten ausgewogen?".
</details>

**Frage 5:** Vergleiche zwei hypothetische Portfolios über einen 3-Jahres-Zeitraum mit verschiedenen Markt-Szenarien: Portfolio A (kein Leverage, diversifiziert) und Portfolio B (30% in 3x-wstETH-Loop, Rest diversifiziert). Welches Portfolio würdest du persönlich bevorzugen und warum?

<details>
<summary>Antwort anzeigen</summary>

Portfolio A (kein Leverage): bei Bull-Markt 3 Jahre +30% bis +40%; bei neutralem Markt +12% bis +15%; bei Bear-Markt -5% bis -15%. Streuung relativ moderat, Drawdowns überschaubar. Portfolio B (30% Loop): bei Bull-Markt +50% bis +70%; bei neutralem Markt +13% bis +17%; bei Bear-Markt -25% bis -50%. Streuung viel größer, Drawdowns potenziell katastrophal. Die persönliche Präferenz hängt von mehreren Faktoren ab. Erstens: Risiko-Toleranz. Wer nachts ruhig schlafen will, wählt A. Wer maximalen erwarteten Wert sucht, könnte B in Erwägung ziehen. Zweitens: Zeit-Horizont. In sehr langfristigen Horizonten (10+ Jahre) mittelt sich vieles. In mittelfristigen (3-5 Jahre) sind die Bear-Markt-Verluste schwerer zu kompensieren. Drittens: Lebenssituation. Wenn das Portfolio einen großen Teil des Netto-Vermögens darstellt: A ist sicherer. Wenn es nur ein kleiner Teil ist: B's Volatilität ist eher tolerierbar. Viertens: psychologische Robustheit. Können Sie einen 50% Drawdown ertragen, ohne panisch zu reagieren? Wenn nein: A. Fünftens: Opportunitätskosten. Wenn der Loop-Erfolg Ihre andere Lebensqualität wegen Stress beeinträchtigt: A ist besser, auch wenn theoretisch B höhere Rendite bringt. Meine persönliche Empfehlung für die meisten konservativen Nutzer im Kontext des 7-8%-Ziels: A ist klar besser. Die Asymmetrie im Bear-Markt ist nicht akzeptabel für die geringen Vorteile in normalen Märkten. Portfolio A erreicht das 7-8%-Ziel in moderaten Bull-Phasen — das reicht. Portfolio B bringt Glück in extremen Bull-Markets, aber Katastrophen in Bear-Markets. Das Verhältnis Risk/Reward ist nicht günstig. Für eine kleine Minderheit von professionellen Nutzern mit großen Portfolios und klarer Risiko-Management-Disziplin könnte B die richtige Wahl sein. Aber das ist eine Minderheit, nicht der Standard. Die ehrliche konservative Empfehlung: Portfolio A.
</details>

---

## Modul-Zusammenfassung

Du hast in Modul 10 Leverage-Loops systematisch verstanden — von den Mechaniken bis zur ehrlichen Bewertung, wann sie nicht sinnvoll sind:

**Loop-Grundmechanik:** Ein Leverage-Loop hinterlegt ein Asset als Sicherheit, borgt ein anderes, tauscht es zurück in dasselbe Underlying und wiederholt. Resultat: effektive Position größer als Kapital. Klassischer Carry-Trade gehebelt. Fünf Loop-Typen, mit wstETH-ETH-Loop am relevantesten für konservative Strategien.

**wstETH-Loop-Praxis:** Aave V3 E-Mode für ETH-Correlated-Assets erlaubt LTV bis 93%. Theoretischer Max-Leverage = 1/(1-LTV). Konservative Praxis: 2-2,5x Leverage, HF 1,8-2,2, 75-80% des verfügbaren LTV. Zap-Services (DeFiSaver, Contango) machen Loops in einer Transaktion via Flash Loan — pragmatisch auf Mainnet.

**Leverage-Mathematik:** Netto-Rendite = Yield × Leverage - Borrow-Cost × (Leverage - 1). Break-Even bei Borrow = Yield. Loop-Profitabilität abhängig vom Spread zwischen Yield und Borrow-Rate. Spread kann sich plötzlich ändern, sogar negativ werden.

**Spezifische Loop-Risiken:** Fünf zusätzliche Risiken über einfaches Halten hinaus — Peg-Depeg (Juni 2022 -6% als historisches Beispiel), Zinssatz-Sprünge, Liquidations-Kaskaden, Smart-Contract-Kaskade durch mehrere Protokolle, Withdraw-Queue in Krisen. Insgesamt 7+ zusätzliche Risiko-Ebenen für etwa 2 Prozentpunkte zusätzliche Rendite.

**Praktisches Management:** Vorab-Dokumentation ist essenziell. Schrittweiser Aufbau (40/30/30). Drei-Stufen-Monitoring: täglich (1-2 Min), wöchentlich (10-15 Min), monatlich (30-45 Min). HAL.xyz für Alerts. Klare Rebalancing-Matrix für 6 Szenarien. Vier psychologische Fallen vermeiden: Hoffnung, Sunk-Cost, Überkonfidenz, Regelbruch.

**Wann NICHT loopen:** Nicht für Einsteiger, nicht ohne Disziplin, nicht ohne Monitoring-Budget, nicht für große Portfolio-Anteile, nicht wenn das 7-8%-Ziel auch anders erreichbar ist. Ein gut diversifiziertes Portfolio erreicht 7-8% in moderaten Bull-Markten ohne Liquidations-Risiko (Beispiel: 4,48% Yield + 3% ETH-Komponente = 7,48% bei +10% ETH). Die fünf Test-Fragen müssen alle "ja" beantwortet werden, bevor ein Loop sinnvoll ist.

**Asymmetrisches Risiko:** Loops bringen in Bull-Markten +8 Prozentpunkte zusätzliche Rendite gegenüber ohne. In Bear-Markten -15 Prozentpunkte zusätzlicher Verlust. Das ist nicht symmetrisch — der Verlust-Zuwachs ist emotional und finanziell schwerer zu ertragen als der Gewinn-Zuwachs angenehm ist.

**Die konservative Kernaussage:** Für die meisten DeFi-Nutzer sind Leverage-Loops nicht der richtige Weg zum 7-8%-Jahresziel. Diversifizierte Portfolios aus Stablecoin-Supply, Liquid Staking und LP-Strategien erreichen das Ziel mit deutlich geringerem Risiko. Wer Loops nutzt, sollte es mit substantieller Erfahrung, klaren Regeln und kleinen Portfolio-Anteilen tun. Die wichtigste Anwendung dieses Moduls für die meisten Lerner: zu verstehen, was Loops sind und wie sie funktionieren — um informierte Entscheidungen zu treffen, die in vielen Fällen "nicht nutzen" lauten werden.

**Was in Modul 11 kommt:** MEV (Maximal Extractable Value). Wir gehen tief in die unsichtbare Welt der Mempool-Operationen, Sandwich-Angriffe, Arbitrage-Bots und Searcher-Strategien. Wie MEV funktioniert, wie es DeFi-Nutzer beeinflusst, und wie man sich davor schützt — bzw. in fortgeschrittenen Strategien sogar davon profitiert.

---

*Ende von Modul 10.*