# NFT-Standards: ERC-721 und ERC-1155

## Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- ERC-721 und ERC-1155 unterscheiden und ihre jeweiligen Use Cases einordnen
- Den `setApprovalForAll`-Mechanismus als häufigen Drainer-Vektor erkennen
- NFT-Metadaten und ihre on-chain/off-chain-Trennung verstehen
- Token-URI-Strukturen (IPFS vs. HTTPS vs. On-Chain-SVG) in Bezug auf Langlebigkeit und Zensurresistenz beurteilen
- Die Rolle von Royalties (EIP-2981) und deren Nicht-Enforcement auf Marktplatz-Ebene einordnen
- NFT-spezifische Approval-Hygiene (inkl. OpenSea-Proxy-Pattern) im eigenen Wallet systematisch durchführen

## Erklärung

NFTs — Non-Fungible Tokens — spielen im Kern-DeFi-Kontext eine untergeordnete Rolle, aber sie begegnen dir unvermeidbar: als Wallet-Interaktionen, als Teil von komplexen Positionen (Uniswap V3 LP-Positionen sind NFTs), und als Angriffsvektor. Diese Lektion gibt dir das notwendige Minimum, um NFTs technisch einzuordnen.

**Was macht einen Token "non-fungible"?**

Fungibel = austauschbar. 1 USDC ist identisch mit einem anderen USDC — sie sind vertauschbar ohne Unterschied. Non-fungibel = einzigartig. Ein ERC-721-Token hat eine Token-ID, und jede ID repräsentiert ein unverwechselbares Objekt.

**ERC-721: Der klassische NFT-Standard**

Ein ERC-721-Contract speichert pro Token-ID einen Besitzer:
```
mapping(uint256 => address) owners;
```

Jede Token-ID ist innerhalb des Contracts einzigartig. Wenn du "Bored Ape #1234" hast, bedeutet das: der Bored-Ape-Contract verzeichnet, dass Token-ID 1234 deiner Adresse gehört.

**ERC-721-Standardfunktionen:**
- `ownerOf(tokenId)` — gibt Besitzer zurück
- `balanceOf(address)` — Anzahl NFTs dieser Collection, nicht konkrete IDs
- `transferFrom(from, to, tokenId)` — Transfer einer spezifischen ID
- `approve(spender, tokenId)` — Approval für eine spezifische ID
- `setApprovalForAll(operator, bool)` — Approval für ALLE aktuellen und zukünftigen IDs

**Die `setApprovalForAll`-Gefahr**

Wenn du eine NFT-Collection auf OpenSea oder einem anderen Marktplatz listen willst, fordert der Marktplatz typischerweise `setApprovalForAll(marketplace, true)`. Das bedeutet: der Marktplatz-Contract darf **alle** deine NFTs dieser Collection bewegen — jetzt und in Zukunft.

Das ist **ein häufiger Drainer-Vektor**. Eine gefälschte NFT-Marktplatz-Site fordert `setApprovalForAll` für eine wertvolle Collection. Einmal signiert, kann der Drainer-Contract jede NFT der Collection abziehen, ohne weitere Signatur.

**Verteidigung:**
- Niemals `setApprovalForAll` auf unbekannten Sites signieren
- Auf revoke.cash die aktiven NFT-Approvals überprüfen (separater Tab für NFTs)
- Bei Zweifeln: `approve` für einzelne Token-IDs statt `setApprovalForAll` — umständlicher, aber sicherer

**ERC-1155: Der Mehrzweck-Standard**

ERC-1155 unterstützt beide — fungible und non-fungible Tokens — in einem einzigen Contract. Statt pro Token-ID einen einzelnen Besitzer speichert ein ERC-1155-Contract:
```
mapping(uint256 => mapping(address => uint256)) balances;
```

Das heißt: pro Token-ID und pro Adresse eine Balance. Eine Token-ID kann theoretisch 1.000.000 Exemplare haben (fungible) oder nur 1 (non-fungible, "NFT-like").

**Use Cases:**
- **Gaming:** Spiele mit vielen verschiedenen Item-Typen in einem Contract. 1000 Schwerter der Sorte X (fungible), 1 legendäres Schwert #1234 (non-fungible).
- **Editions:** Limitierte Kunstwerk-Editions (z.B. 100 Stück einer bestimmten Komposition).
- **Effizienz:** Batch-Transfers mehrerer unterschiedlicher Token-IDs in einer Transaktion.

**Standardfunktionen** sind ähnlich wie ERC-721, aber mit Unterstützung für Batch-Operationen (`safeBatchTransferFrom`, `balanceOfBatch`).

**Metadaten: On-chain vs. Off-chain**

Ein NFT verweist meist auf Metadaten — Bild, Name, Attribute. Es gibt drei Speicher-Ansätze:

**1. Off-chain (HTTP):**
Die Metadaten-URL zeigt auf einen normalen Web-Server (z.B. `https://api.collection.com/metadata/1234.json`). Wenn der Server ausfällt, ist die NFT-Darstellung weg. Billig, aber nicht dezentral.

**2. Off-chain (IPFS):**
Die URL ist ein IPFS-Hash (z.B. `ipfs://Qm...`). IPFS ist dezentral, aber die Daten bleiben nur verfügbar, solange mindestens ein Node sie pinned. Billig und "dezentraler", aber nicht garantiert permanent.

**3. On-chain:**
Die kompletten Metadaten werden im Smart Contract gespeichert. Teuer in der Speicherung, aber permanent und zensur-resistent. Wenige NFTs nutzen das (z.B. Chain Runners, Art Blocks in Teilen).

**Die Konsequenz:** Eine NFT kann technisch existieren, aber ihr Bild verschwinden. Der "Wert" einer NFT ist Speicher-abhängig und rechtlich meist nicht klar definiert.

**Warum NFTs für DeFi-Nutzer relevant sind**

Auch wenn du keine Kunst-NFTs handelst, begegnen dir NFT-Standards in DeFi:

**1. Uniswap V3 LP-Positionen sind NFTs**
Jede konzentrierte Liquiditätsposition auf Uniswap V3 ist ein ERC-721-NFT mit einer spezifischen ID. Das erlaubt einzigartige Positionsdetails (Range, Fee-Tier), macht aber auch den Transfer der Position möglich — und die Verwaltung von Approvals komplizierter.

**2. Governance-NFTs**
Einige Protokolle (z.B. Ve-tokenomics von Curve) nutzen NFTs für gelockte Positionen.

**3. Gaming und Social Tokens**
Das NFT-Ökosystem überlappt mit Tokenized Assets (Fan Tokens, Membership-Pässe, etc.).

**4. Drainer-Vektoren**
`setApprovalForAll` ist einer der gefährlichsten Signatur-Typen, auch wenn du keine teuren NFTs hast.

## Folien-Zusammenfassung

**[Slide 1] — Titel:** NFT-Standards: ERC-721 und ERC-1155

**[Slide 2] — Fungible vs. Non-fungible:** USDC fungibel (austauschbar), NFT einzigartig (Token-ID).

**[Slide 3] — ERC-721:** Pro Token-ID ein Besitzer. Klassischer NFT-Standard.

**[Slide 4] — setApprovalForAll:** Approval für ALLE NFTs einer Collection. Häufigster Drainer-Vektor.

**[Slide 5] — ERC-1155:** Fungible und non-fungible in einem Contract. Gaming, Editions, Batch-Operations.

**[Slide 6] — Metadaten:** HTTP (zentral), IPFS (dezentral aber optional), On-Chain (permanent aber teuer).

**[Slide 7] — NFTs in DeFi:** Uniswap V3 LP-Positionen, ve-Tokens, Drainer-Vektoren.

**[Slide 8] — Verteidigung:** setApprovalForAll misstrauen, revoke.cash-NFT-Tab nutzen.

## Sprechertext

**[Slide 1]** Lektion 3.5: NFT-Standards. NFTs sind im Kern-DeFi-Kontext nebensächlich, aber du kannst ihnen nicht entkommen — als Wallet-Interaktion, als Teil komplexer Positionen und als Angriffsvektor. Diese Lektion gibt dir das technische Minimum.

**[Slide 2]** Was macht einen Token non-fungible? Fungibel heißt austauschbar. Ein USDC ist identisch mit einem anderen USDC. Non-fungibel heißt einzigartig. Ein ERC-721-Token hat eine Token-ID, und jede ID repräsentiert ein unverwechselbares Objekt.

**[Slide 3]** ERC-721 ist der klassische NFT-Standard. Der Contract speichert pro Token-ID einen Besitzer. Die Standardfunktionen: ownerOf für den Besitzer einer ID, balanceOf für die Anzahl NFTs dieser Collection, transferFrom für einzelne Transfers, approve für einzelne IDs — und setApprovalForAll für alle IDs einer Collection.

**[Slide 4]** setApprovalForAll ist der gefährlichste NFT-Mechanismus. Wenn du eine Collection auf OpenSea listen willst, fordert der Marktplatz diese Approval. Damit darf der Marktplatz alle deine aktuellen und zukünftigen NFTs dieser Collection bewegen. Eine gefälschte Marktplatz-Site kann das missbrauchen. Einmal signiert, sind alle wertvollen NFTs in Gefahr. Verteidigung: setApprovalForAll nur auf vertrauenswürdigen Sites, revoke.cash-NFT-Tab regelmäßig checken, bei Zweifel lieber einzel-approven als alles.

**[Slide 5]** ERC-1155 ist der Mehrzweck-Standard. Unterstützt beide — fungible und non-fungible — in einem Contract. Pro Token-ID und pro Adresse eine Balance. Eine Token-ID kann 1.000.000 Exemplare haben oder nur 1. Use Cases: Gaming mit vielen Item-Typen, limitierte Kunst-Editions, Batch-Operations für Effizienz.

**[Slide 6]** NFT-Metadaten werden auf drei Arten gespeichert. Off-chain HTTP: URL zeigt auf normalen Web-Server. Billig, aber wenn der Server ausfällt, ist die Darstellung weg. Off-chain IPFS: dezentral, aber nur verfügbar, solange Nodes die Daten pinnen. On-chain: alle Metadaten im Contract. Permanent und zensur-resistent, aber teuer. Die meisten NFTs sind HTTP oder IPFS — die "Permanenz" einer NFT ist oft nicht so absolut, wie behauptet.

**[Slide 7]** Warum das alles für DeFi-Nutzer relevant ist. Erstens: Uniswap V3 LP-Positionen sind NFTs. Wer konzentrierte Liquidität bereitstellt, bekommt einen ERC-721-Token. Zweitens: manche Protokolle wie Curve nutzen NFTs für gelockte ve-Tokens. Drittens: Drainer-Vektoren. setApprovalForAll ist einer der gefährlichsten Signatur-Typen, auch wenn du selbst keine teuren NFTs hältst.

**[Slide 8]** Verteidigung. Prinzipielle Regel: setApprovalForAll ist ein Maximal-Vertrauens-Signal — sparsam verwenden. Nur auf Sites signieren, die du kennst und die gerade legitim einen Bulk-Transfer rechtfertigen. revoke.cash hat einen separaten Tab für NFT-Approvals — monatlich durchgehen. Bei Zweifeln: einzelne Token-IDs approven statt alles.

## Visuelle Vorschläge

**[Slide 1]** Titelfolie.

**[Slide 2]** Links: mehrere identische USDC-Tokens (fungibel). Rechts: drei unterschiedliche NFT-Karten (non-fungibel).

**[Slide 3]** Mapping-Darstellung: Token-IDs links, Besitzer-Adressen rechts.

**[Slide 4]** Warnfeld: "setApprovalForAll = ALLE NFTs". **SCREENSHOT SUGGESTION:** MetaMask oder Rabby Signatur-Dialog für setApprovalForAll.

**[Slide 5]** Vergleichsdiagramm ERC-721 vs. ERC-1155.

**[Slide 6]** Drei-Spalten-Vergleich der Metadaten-Optionen mit jeweiligen Trade-offs.

**[Slide 7]** **SCREENSHOT SUGGESTION:** Uniswap-V3-LP-Position-Seite, die die Position als NFT zeigt.

**[Slide 8]** **SCREENSHOT SUGGESTION:** revoke.cash NFT-Approvals-Tab.

## Übung

**Aufgabe: NFT-Approval-Audit**

1. Öffne revoke.cash.
2. Verbinde deine Wallet.
3. Wechsle zum NFT-Tab.
4. Prüfe, ob `setApprovalForAll`-Approvals existieren.
5. Für jede: Notiere den Operator (wer hat die Approval?) und die Collection.
6. Bewerte: Kennst du den Operator? Brauchst du die Approval noch?

**Deliverable:** Liste aller NFT-Approvals mit Bewertung.

## Quiz

**Frage 1:** Warum ist `setApprovalForAll` ein systematisch gefährlicher als `approve` für einzelne Token-IDs?

<details>
<summary>Antwort anzeigen</summary>

`setApprovalForAll` gibt unbeschränkten Zugriff auf alle aktuellen und zukünftigen NFTs einer Collection — eine einzige Signatur reicht für potenziell Millionen Dollar. `approve(tokenId)` gibt Zugriff nur auf einen einzelnen NFT — jeder weitere NFT erfordert eine neue, explizite Approval. Bei einem Drainer-Angriff bekommt der Angreifer mit `setApprovalForAll` sofort eine ganze Collection; mit `approve` nur einen einzelnen NFT und muss für weitere jeweils neue Signaturen erwirken, was viel auffälliger ist. Der Komfort-Nachteil von einzelnen Approvals ist deutlich — bei jedem NFT-Transfer eine eigene Signatur — weshalb Marktplätze routinemäßig `setApprovalForAll` anfordern. Für Nutzer ist das akzeptables Risiko nur bei vertrauenswürdigen, etablierten Marktplätzen.
</details>

**Frage 2:** Du kaufst eine NFT für 500 USD auf einem seriösen Marktplatz. Zwei Jahre später schaut die NFT in deiner Wallet merkwürdig aus — die Bilder sind verschwunden oder zeigen Fehler. Was könnte passiert sein und wie prüfst du es?

<details>
<summary>Antwort anzeigen</summary>

Wahrscheinliche Ursache: die Metadaten waren off-chain gespeichert und der zugehörige Server oder IPFS-Pin ist ausgefallen. Die Token-ID gehört weiterhin dir (der Contract-State ist stabil), aber die Bilddarstellung ist verloren. Prüfung: Rufe auf Etherscan die `tokenURI(tokenId)`-Funktion des Contracts auf. Das zeigt dir die Metadaten-URL. Wenn sie HTTP ist und nicht lädt, ist der Server offline. Wenn sie IPFS ist und nicht lädt, ist der Pin verloren. Bei On-Chain-Metadaten wäre das nicht passiert. Aktion: bei wertvollen Collections kannst du die Originalmetadaten in der Wayback Machine oder auf OpenSea-Caches finden; neue Pinning-Services können die IPFS-Daten re-hosten, wenn sie vorhanden sind. Lerne daraus: NFT-"Permanenz" ist oft vom Storage-Modell abhängig.
</details>

## Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Slides: Titel → ERC-721 vs. ERC-1155 → Use Cases → setApprovalForAll-Risiko → Metadaten on-chain/off-chain → Royalties (EIP-2981) → NFT-Approval-Hygiene
- `voice_script.txt` — *Voice Narration Script* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — ERC-721 vs. ERC-1155 Vergleichstabelle, setApprovalForAll-Drainer-Flow, IPFS/HTTPS/On-Chain-Storage-Diagramm, revoke.cash NFT-Tab-Screenshot

Pipeline: Gamma → ElevenLabs → CapCut.

---
