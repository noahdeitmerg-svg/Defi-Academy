## Modul-Abschluss-Quiz

Die folgenden fünf Fragen testen dein integriertes Verständnis des gesamten Moduls. Plane 10–15 Minuten zur Beantwortung.

**Frage 1:** Ein Krypto-Projekt nennt sich "DeFi-Protokoll", hat aber einen Admin-Schlüssel, mit dem das Team jederzeit Nutzer-Funds einfrieren oder bewegen kann. Ist das DeFi? Begründe mit mindestens zwei der drei DeFi-Kriterien.

<details>
<summary>Antwort anzeigen</summary>

Nein. Es verletzt das Non-Custodial-Kriterium (das Team hat Zugriff auf Nutzer-Funds) und kann optional das Permissionless-Kriterium verletzen (wenn das Team Nutzer gezielt sperren kann). Selbst wenn das Protokoll transparent ist (drittes Kriterium erfüllt), macht der Admin-Zugriff es zu einem CeFi-artigen System, nur mit Smart-Contract-Frontend. Das ist "DeFi-Washing" — technisch nicht DeFi.
</details>

**Frage 2:** Eine komponierte Position nutzt vier Protokolle: Lido für Liquid Staking, Aave als Collateral-Plattform, Curve als LP-Venue und Convex als Yield-Booster. Erkläre, wie sich Komponierbarkeits-Risiko in dieser Position manifestiert.

<details>
<summary>Antwort anzeigen</summary>

Jedes der vier Protokolle trägt eigenes Smart-Contract-Risiko. Zusätzlich: wenn stETH (Lido) depeggt, fällt der Collateral-Wert auf Aave, was Liquidation auslösen kann. Wenn Aave ein Problem hat, betrifft das die darauf aufgebaute Borrow-Position. Wenn Curve eine fehlerhafte Pool-Implementierung hat, verliert der LP-Anteil Wert. Wenn Convex-Rewards gehackt werden, verliert der Booster-Layer Wert. Das Risiko ist nicht additiv, sondern kaskadisch — ein Bruch auf Ebene 1 kann alle höheren Ebenen betreffen. Die Gesamt-Ausfallwahrscheinlichkeit ist signifikant höher als die einzelner Protokolle.
</details>

**Frage 3:** Du siehst auf DeFiLlama ein neues Protokoll mit 150M USD TVL, das vor zwei Wochen gestartet ist und 180% APY verspricht. Welche drei Fragen stellst du zur Risikobewertung?

<details>
<summary>Antwort anzeigen</summary>

1. Woher kommt der Yield? 180% APY muss eine Kapitalquelle haben — Token-Emissionen (mit Verwässerung), echte Gebühren (dann müsste das Protokoll extremen Volumen generieren), oder Ponzi-Dynamik (neue Deposits zahlen alte Returns). 2. Welche Audits wurden gemacht, von welchen Firmen, wann, und welche Findings wurden wie adressiert? 3. Wie ist die Governance strukturiert — hat das Team Admin-Privilegien zum Einfrieren/Migrieren/Upgraden? Wie schnell können diese Änderungen ausgeführt werden (Time-Lock)? Zusätzliche Fragen: Wie hoch ist die Wale-Konzentration? Gab es ähnliche Protokolle, die gescheitert sind?
</details>

**Frage 4:** Erkläre, warum eine Wallet technisch "keine Tokens hält" und was sie stattdessen tut.

<details>
<summary>Antwort anzeigen</summary>

Tokens sind keine digitalen Objekte, die in einer Wallet lagern — sie sind Einträge in Smart Contracts. Der Token-Contract (z.B. der USDC-Contract) führt ein internes Ledger, das für jede Adresse einen Balance-Wert speichert. Die Wallet-Software verwaltet ausschließlich den Private Key, der die kryptographische Autorität über eine bestimmte Blockchain-Adresse gewährt. Wenn du die Wallet-Software wechselst und denselben Private Key oder dieselbe Seed-Phrase importierst, siehst du dieselben Token-Balancen — weil die Balancen in den Token-Contracts liegen, nicht in der Wallet-App. Die Wallet ist ein Schlüsselbund, kein Tresor.
</details>

**Frage 5:** Eine einfache USDC-Supply-Position auf Aave: welche der sieben DeFi-Risiken sind relevant, und welche sind weniger relevant? Begründe.

<details>
<summary>Antwort anzeigen</summary>

Relevant: (1) Smart-Contract-Risiko (Aave-Code könnte einen Bug haben), (2) Oracle-Risiko (wenn auch für reine Supply-Positionen weniger direkt, aber relevant bei Markt-Pausen/Ausfällen), (3) Depeg-Risiko (USDC selbst kann depeggen, wie im März 2023 temporär geschehen), (4) Betreiber-Risiko (falsche Transaktion, kompromittierter Seed). Weniger relevant: (5) Liquidationsrisiko (nur bei Borrow-Positionen), (6) Rug-Pull-Risiko (Aave ist etabliert, öffentliche Governance), (7) Komponierbarkeits-Risiko (die Position baut nicht auf anderen Protokollen auf). Dies ist ein relativ konservatives Risikoprofil innerhalb des DeFi-Spektrums.
</details>

---

## Modul-Zusammenfassung

Du hast in Modul 1 das konzeptionelle Fundament für alle weiteren Module gelegt:

**Definition:** DeFi = non-custodial, permissionless, transparent — alles drei gleichzeitig.

**Kernprinzipien:** Self-Custody, Permissionless Innovation, Transparenz, Komponierbarkeit. Komponierbarkeit ist der strukturelle Superpower.

**Bausteine:** Blockchain → Smart Contract → Token → Wallet. Diese vier reichen aus, um jedes Protokoll konzeptionell einzuordnen.

**Landschaft:** Sechs Kategorien — DEX, Lending, Stablecoins, Liquid Staking, Derivate, Yield-Aggregatoren. DeFiLlama als Navigations-Tool.

**Risiken:** Sieben Kernrisiken — Smart Contract, Oracle, Liquidation, Depeg, Rug Pull, Komponierbarkeit, Betreiber. Jede Position hat ein Profil dieser sieben Dimensionen.

**Praxis:** Wallet installiert, erste Transaktion ausgeführt, auf Etherscan verfolgt. Der Workflow sitzt.

**Was in Modul 2 kommt:** Private Keys im Detail. Seed-Phrase-Storage. Hardware Wallets. Transaktions-Signaturen. Token-Approvals und Drainer-Angriffe. Multisig. Wir bauen dein Sicherheits-Setup, bevor echtes Kapital im Spiel ist.

---

*Ende von Modul 1.*