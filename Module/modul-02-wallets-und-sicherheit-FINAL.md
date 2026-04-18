# Modul 2 — Wallets und Sicherheit

**Zielgruppe:** Einsteiger bis Fortgeschrittene
**Geschätzte Dauer:** 100–120 Minuten
**Voraussetzungen:** Modul 1 abgeschlossen

**Kursstufe:** Foundation (Sicherheits-Fundament)
**Lektionsanzahl:** 6
**Didaktische Ausrichtung:** Kryptographische Basis, Storage-Strategien, Signatur-Sicherheit, Drainer-Verteidigung, Hardware & Multisig, Produktions-Setup
**Konformität:** Final Fix Document v1 — Struktur, Terminologie und Pipeline-Assets harmonisiert

**Harmonisierte Terminologie (gültig im gesamten Modul):**
- Private Key, Public Key, Adresse (kryptographische Hierarchie)
- Seed Phrase (BIP-39), Derivation Path (BIP-44)
- Signature Risk (Transaction / Message / Typed Data / EIP-712)
- Approval Risk (approve / transferFrom / Permit / Permit2)
- Operator Risk (deutsch: Betreiber-Risiko)
- Smart Contract Risk
- Multisig, Threshold, Safe (früher Gnosis Safe)

**Video-Pipeline:** Jede Lektion ist für Gamma (Slides) → ElevenLabs (Voice) → CapCut (Video) vorbereitet. Zielvideo-Länge pro Lektion: 8–10 Minuten (120–140 WPM).

---

## Modul-Überblick

Sicherheit ist die Voraussetzung für jede DeFi-Aktivität. Die meisten großen Kapitalverluste in DeFi entstehen nicht durch Protokoll-Hacks, sondern durch Wallet-Kompromittierung, Drainer-Angriffe und Bedienungsfehler. Dieses Modul baut dein Sicherheits-Fundament, **bevor** signifikantes Kapital im Spiel ist.

Die Grundhaltung dieses Kurses ist konservativ: Kapitalerhalt hat Priorität vor Rendite. Ein Setup, das 8% jährlich generiert und dein Kapital schützt, ist langfristig überlegen gegenüber einem Setup, das kurzfristig 50% verspricht und katastrophale Ausfallrisiken hat. Sicherheit ist der erste Renditehebel.

**Lektionen:**
1. Private Keys und Seed-Phrasen — die kryptographische Basis
2. Seed-Phrase-Storage: Papier, Metall, Shamir
3. Transaktions-Signaturen und ihre Gefahren
4. Token-Approvals und Drainer-Angriffe
5. Hardware-Wallets und Safe-Multisig
6. Dein professionelles Wallet-Setup

---

## Lektion 2.1 — Private Keys und Seed-Phrasen: Die kryptographische Basis

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Den Unterschied zwischen Private Key, Public Key und Adresse präzise benennen
- Erklären, wie eine Seed-Phrase (BIP-39) mehrere Private Keys deterministisch ableitet
- Verstehen, warum Seed-Phrasen-Kompromittierung einem Total-Verlust gleichkommt
- Die Einwegrichtung der kryptographischen Hierarchie anhand der Größenordnung des Schlüsselraums (2^256) erklären
- BIP-44-Derivationspfade interpretieren und begründen, warum derselbe Seed in verschiedenen Wallet-Apps unterschiedliche Adressen zeigen kann
- Einen bewussten Check der eigenen Wallet-Struktur (Private Key, Seed Phrase, mehrfache Accounts) sicher durchführen

### Erklärung

Eine Wallet besteht kryptographisch aus drei Elementen: Private Key, Public Key und Adresse. Das Verständnis dieser Ebenen ist die Grundlage jeder Wallet-Sicherheit.

**Der Private Key** ist eine zufällige 256-Bit-Zahl. Das ergibt einen Zahlenraum von etwa 2^256 ≈ 10^77 möglichen Werten — in der Größenordnung der Atome im sichtbaren Universum. Diese Größe ist der Grund, warum Private Keys nicht erraten werden können. Der Private Key wird als hexadezimale Zeichenkette dargestellt:
```
0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318
```
Wer den Private Key hat, kann Transaktionen signieren und damit alle Assets auf der zugehörigen Adresse bewegen.

**Der Public Key** wird aus dem Private Key über elliptische Kurven-Kryptographie (secp256k1) abgeleitet. Die Ableitung ist eine mathematische Einbahnstraße: Aus dem Private Key kannst du den Public Key berechnen, aber nicht umgekehrt.

**Die Adresse** ist ein Hash des Public Key, gekürzt auf 20 Bytes mit "0x"-Präfix:
```
0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
```
Aus der Adresse lässt sich weder der Public Key noch der Private Key rückrechnen. Sie kann also frei geteilt werden.

Die Hierarchie: `Private Key → Public Key → Adresse` — von links nach rechts berechenbar, rückwärts nicht.

**Das Problem: Private Keys skalieren schlecht.** Eine lange Hex-Zeichenkette ist nicht merkbar. Wer mehrere Adressen verwenden will (aus Privacy- und Sicherheitsgründen oft sinnvoll), braucht mehrere Keys. Manuelles Verwalten wird schnell unpraktisch.

**Die Lösung: BIP-39 und hierarchische deterministische Wallets.** BIP-39 ist der Standard, der Seed-Phrasen einführt — 12 oder 24 Wörter aus einer definierten Liste von 2048 Wörtern. Diese Wörter kodieren eine große Zufallszahl.

Beispiel einer 12-Wort-Seed-Phrase (fiktiv):
```
army van defense carry jealous true garbage claim echo media make crunch
```

Aus dieser Phrase wird ein Master-Seed generiert. Aus dem Master-Seed werden über einen deterministischen Prozess (BIP-32, BIP-44) beliebig viele Private Keys abgeleitet:
```
Seed-Phrase → Master-Seed → Master Private Key
 → Account 1 → Private Key 1 → Adresse 1
 → Account 2 → Private Key 2 → Adresse 2
 → Account 3 → Private Key 3 → Adresse 3
 ...
```

**Die Konsequenz:** Die Seed-Phrase ist der Master-Schlüssel. Wer sie hat, kontrolliert alle abgeleiteten Adressen — auch solche, die du noch gar nicht erstellt hast.

**Wortlängen-Unterschied:** 12 Wörter bieten 128 Bit Entropie plus 4 Bit Prüfsumme — mathematisch nicht per Brute Force knackbar. 24 Wörter bieten 256 Bit — noch sicherer, aber für Standard-Nutzung sind 12 Wörter vollkommen ausreichend.

**Derivationspfad-Unterschiede:** Der BIP-44-Derivationspfad `m/44'/60'/0'/0/0` ist Standard für Ethereum. Unterschiedliche Wallet-Apps können abweichende Pfade verwenden. Wenn du dieselbe Seed-Phrase in zwei Apps importierst und unterschiedliche Adressen siehst, liegt es wahrscheinlich am Derivationspfad. Die meisten modernen EVM-Wallets verwenden heute denselben Pfad.

**Kernkonsequenz für Sicherheit:** Weil die Seed-Phrase alle Private Keys ableitet, ist sie der einzige kritische Punkt. Alles andere — Wallet-Apps, Hardware-Geräte, Adressen — lässt sich neu aufsetzen, solange die Seed-Phrase intakt und geheim ist. Umgekehrt: Kompromittierung der Seed-Phrase bedeutet Total-Verlust aller abgeleiteten Assets, für immer.

### Folien-Zusammenfassung

**[Slide 1]** Titel: Private Keys und Seed-Phrasen

**[Slide 2]** Die Hierarchie: Private Key → Public Key → Adresse. Einbahnstraße nach rechts.

**[Slide 3]** Private Key: 256-Bit-Zahl, Zahlenraum 2^256 ≈ 10^77. Unmöglich zu erraten.

**[Slide 4]** Adresse: 20-Byte-Hash des Public Key. Öffentlich, frei teilbar, kein Rückschluss möglich.

**[Slide 5]** Warum BIP-39 existiert: einzelne Private Keys skalieren nicht. Seed-Phrase = komprimierter Master-Key.

**[Slide 6]** BIP-39-Ableitung: 12/24 Wörter → Master-Seed → deterministische Ableitung beliebig vieler Keys.

**[Slide 7]** Kernkonsequenz: Seed-Phrase ist der einzige Single Point of Failure. Kompromittierung = alle Adressen verloren, permanent.

### Sprechertext

**[Slide 1]** Modul 2 beginnt mit der kryptographischen Basis. Bevor wir über Angriffe und Schutz reden, musst du verstehen, was eine Wallet technisch eigentlich ist.

**[Slide 2]** Eine Wallet besteht aus drei Elementen. Aus dem Private Key wird der Public Key berechnet. Aus dem Public Key wird die Adresse gehasht. Von links nach rechts einfach berechenbar, rückwärts kryptographisch unmöglich.

**[Slide 3]** Der Private Key ist eine 256-Bit-Zufallszahl. Der Zahlenraum umfasst etwa zehn hoch siebenundsiebzig mögliche Werte — in der Größenordnung der Atome im sichtbaren Universum. Niemand kann einen Private Key erraten. Wer den Key hat, kontrolliert die Adresse vollständig.

**[Slide 4]** Die Adresse ist ein Hash des Public Key, gekürzt auf 20 Bytes. Sie ist öffentlich, jeder sieht sie auf Etherscan. Aus der Adresse lässt sich weder der Public Key noch der Private Key rückrechnen. Deine Adresse zu teilen ist also sicher.

**[Slide 5]** Problem: einzelne Private Keys skalieren schlecht. Lange Hex-Zeichenkette, nicht merkbar, mehrere Adressen erfordern mehrere Keys. Hier kommt BIP-39 ins Spiel.

**[Slide 6]** BIP-39: zwölf oder vierundzwanzig Wörter aus einer definierten Liste von zweitausendachtundvierzig Wörtern. Diese kodieren eine große Zufallszahl. Aus dieser Seed-Phrase wird ein Master-Seed generiert, und aus dem Master-Seed werden deterministisch beliebig viele Private Keys abgeleitet. Eine Seed-Phrase, alle abgeleiteten Adressen.

**[Slide 7]** Die Kernkonsequenz: die Seed-Phrase ist dein Master-Schlüssel. Ihre Kompromittierung bedeutet Total-Verlust aller abgeleiteten Assets — auch solcher, die du noch gar nicht erstellt hast. Deshalb niemals digital speichern. Keine Screenshots, keine Cloud, keine Notiz-Apps. Wir behandeln Storage-Optionen in der nächsten Lektion.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.
**[Slide 2]** Diagramm der Einbahnstraße: Private Key → Public Key → Adresse. Pfeile in eine Richtung, durchgestrichener Pfeil zurück.
**[Slide 3]** Visualisierung der Zahlenraum-Größe: 2^256 neben Vergleichsgrößen (Atome im Universum, Sandkörner der Erde).
**[Slide 4]** **SCREENSHOT SUGGESTION:** Beispiel-Adresse auf etherscan.io (z.B. vitalik.eth) mit Balance und Transaktions-Übersicht.
**[Slide 5]** Mehrere Hex-Strings nebeneinander mit "Nicht skalierbar"-Label.
**[Slide 6]** Baum-Diagramm: Seed-Phrase oben, Master-Seed darunter, verzweigt zu mehreren Private Keys und Adressen.
**[Slide 7]** Rotes Warnsymbol: "Seed-Phrase kompromittiert = alle Adressen verloren. Für immer."

### Übung

**Aufgabe: Deine Wallet-Struktur prüfen**

In deiner bestehenden Wallet (Rabby oder MetaMask):

1. Finde die Einstellung "Show Private Key" für deine aktuelle Adresse. **Öffne sie, aber kopiere nichts und mach keinen Screenshot.** Schau sie dir an und schließe das Fenster.
2. Finde die Einstellung "Show Secret Recovery Phrase" (Seed-Phrase). **Öffne sie, aber kopiere nichts.** Schau sie dir an und schließe das Fenster.
3. Füge eine zweite Adresse zu deiner Wallet hinzu ("Add Account" oder "Create Account").
4. Beobachte: Die zweite Adresse hat einen eigenen Private Key, aber wird aus derselben Seed-Phrase abgeleitet.

**Deliverable:** Kurzer Text (nicht die Keys selbst) mit deinen Beobachtungen. Wie viele Adressen hast du jetzt? Bestätige, dass alle aus einer Seed-Phrase abgeleitet sind, und erkläre kurz, warum das praktisch ist.

### Quiz

**Frage 1:** Warum kann man aus einer Ethereum-Adresse nicht den Private Key zurückrechnen?

<details>
<summary>Antwort anzeigen</summary>

Die Ableitung Private Key → Public Key → Adresse basiert auf kryptographischen Hash-Funktionen und elliptischer Kurven-Kryptographie (secp256k1). Diese sind Einweg-Funktionen: gleicher Input ergibt gleichen Output, aber aus dem Output ist der Input nicht rückrechenbar. Zusätzlich ist der Zahlenraum der möglichen Private Keys (2^256) so groß, dass Brute-Force-Angriffe mathematisch nicht durchführbar sind.
</details>

**Frage 2:** Du importierst deine Seed-Phrase in eine zweite Wallet-App. Die zweite App zeigt eine andere Adresse als die erste. Was ist die wahrscheinlichste Ursache?

<details>
<summary>Antwort anzeigen</summary>

Ein unterschiedlicher Derivationspfad. BIP-44 definiert einen Standard-Pfad (`m/44'/60'/0'/0/0`), aber verschiedene Wallets können abweichende Pfade verwenden. Die Assets sind nicht weg — sie liegen auf der Adresse, die aus dem Pfad deiner ersten Wallet abgeleitet wurde. Die meisten modernen EVM-Wallets verwenden heute denselben Standard-Pfad, aber ältere oder multi-chain-fähige Apps können abweichen.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Slides: Titel → Hierarchie Private/Public/Adresse → 2^256-Zahlenraum → Adresse als Hash → Skalierungsproblem Keys → BIP-39-Ableitung → Kernkonsequenz Seed-Phrase
- `voice_script.txt` — *Voice Narration Script* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — Einbahnstraßen-Diagramm, Zahlenraum-Visualisierung, Etherscan-Screenshot vitalik.eth, BIP-39-Baum-Diagramm, rotes Warnsymbol

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 2.2 — Seed-Phrase-Storage: Papier, Metall, Shamir

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die drei Hauptbedrohungsszenarien für Seed-Phrasen benennen
- Papier-, Metall- und Shamir-Storage anhand realistischer Trade-offs vergleichen
- Ein Storage-Setup entsprechend dem eigenen Kapital- und Bedrohungsprofil wählen
- Die Rolle der BIP-39-Passphrase als zusätzliche Schutzschicht gegen physischen Zwang und Seed-Phrase-Diebstahl einordnen
- Ein Inheritance-Setup konzipieren, das Asset-Verlust bei Tod oder Handlungsunfähigkeit vermeidet
- Die Vor- und Nachteile von Shamir Secret Sharing (SLIP-39, 2-of-3, 3-of-5) gegenüber redundanten Vollkopien begründen

### Erklärung

Eine Seed-Phrase sicher zu speichern ist das kritischste Einzelproblem in DeFi-Sicherheit. Die Phrase muss gleichzeitig gegen drei sehr unterschiedliche Bedrohungen geschützt sein, die oft gegeneinander arbeiten.

**Bedrohung 1: Diebstahl.** Jemand bekommt Zugriff auf deinen Storage-Ort und liest die Phrase.

**Bedrohung 2: Zerstörung.** Feuer, Wasser, Naturkatastrophe, einfacher Papierverlust — die Phrase ist weg.

**Bedrohung 3: Zugangsverlust.** Du selbst oder deine Erben finden die Phrase nicht mehr wieder.

Eine sehr sicher versteckte Phrase ist schwer zugänglich. Eine leicht zugängliche Phrase ist stehl-anfällig. Zusätzliche Kopien multiplizieren die Angriffsfläche. Das gute Setup ist ein bewusster Trade-off, kein Patentrezept.

**Option 1: Papier**

Seed-Phrase auf Papier schreiben, sicher verwahren.

*Vorteile:* Kostenlos, keine technischen Abhängigkeiten, universell verständlich (auch für Erben).

*Nachteile:* Anfällig für Feuer und Wasser. Tinte verblasst. Papier zerreißt, vergilbt. Wer das Papier findet, hat alles.

*Verbesserungen:* Laminieren (Wasser-, nicht Feuerschutz). Feuerfester Safe. Zwei Kopien an geographisch getrennten Orten.

Papier ist ausreichend für kleinere Beträge bis etwa 1.000–5.000 USD. Für signifikantes Kapital skaliert es schlecht.

**Option 2: Metall**

Seed-Phrase in Edelstahl eingraviert oder gestempelt. Kommerzielle Produkte:
- **Cryptosteel Capsule** — rostfreies Edelstahl-Rohr mit Buchstabenplättchen
- **Billfodl** — gestapelte Edelstahl-Plättchen
- **Keystone Tablet Plus** — Edelstahl-Platte mit eingravierten Wörtern

DIY-Version: Edelstahl-Platte mit Zahlenstempel.

*Vorteile:* Feuerfest (Edelstahl schmilzt bei ca. 1400 °C; normale Hausbrände erreichen 600–800 °C). Wasserfest. Korrosionsbeständig. Keine elektronische Abhängigkeit.

*Nachteile:* 50–100 USD Investition. Physische Einrichtung dauert 10–30 Minuten. Wer das Metall findet, hat alles.

Metall ist der Standard für signifikante Beträge. Die kleine Initial-Investition amortisiert sich ab wenigen tausend USD Kapital.

**Option 3: Shamir Secret Sharing (SSS)**

Die Phrase wird mathematisch in mehrere Teile (Shares) zerlegt. Konfiguration "k-of-n": Aus n Teilen braucht man k zur Rekonstruktion.

Beispiel 2-of-3:
- Drei Shares an drei verschiedenen Orten
- Ein einzelner Share offenbart nichts über die Phrase
- Zwei zusammengebrachte Shares rekonstruieren die Phrase

*Das löst gleichzeitig:*
- Diebstahl — ein Share allein ist wertlos
- Zerstörung — ein Share kann verloren gehen, zwei verbleibende reichen
- Geographische Diversifikation — Shares über Länder verteilbar

*Tools:* **Trezor Model T** unterstützt SLIP-39 (Shamir-Derivat) nativ. Open-Source-Implementierungen existieren für manuelle Anwendung.

*Achtung:* Kein universeller Standard. Rekonstruktion erfordert oft dasselbe Tool/dasselbe Schema. Dokumentation des Setups ist kritisch.

*Vorteile:* Diversifiziert Storage-Risiko. Inheritance-Planung ohne Single Point of Failure.

*Nachteile:* Komplexer in der Einrichtung. Tool-Abhängigkeit. Fehlerrisiko bei schlechter Dokumentation.

**Option 4: BIP-39-Passphrase (zusätzliche Schutzschicht)**

Unabhängig vom Storage-Medium: die BIP-39-Passphrase ist ein zusätzliches "13. Wort" — ein beliebiger String, der zusammen mit der Seed-Phrase einen komplett anderen Satz von Adressen ableitet.

Ohne Passphrase: Seed-Phrase → Adressen A (Decoy, oft leer)
Mit Passphrase: Seed-Phrase + Passphrase → Adressen B (echte Wallet)

*Vorteil:* Selbst wenn jemand die Seed-Phrase findet, bekommt er nur die Decoy-Wallet. Die echte Wallet ist hinter der Passphrase verborgen. Besonders relevant bei physischem Zwang: Du kannst die Seed-Phrase preisgeben, der Angreifer sieht die Decoy, glaubt er hat alles, die echte Wallet bleibt unberührt.

*Risiko:* Passphrase-Verlust = Asset-Verlust. Die Passphrase muss separat und zuverlässig gesichert sein.

**Das Inheritance-Problem**

Ein meist-ignorierter Aspekt: Was passiert mit deinen Assets bei Tod oder Handlungsunfähigkeit? Eine Seed-Phrase, die deine Familie nicht findet oder nicht versteht, bedeutet permanenten Verlust.

Mögliche Ansätze:
- **Schriftliche Anleitung** (ohne die Phrase selbst), die erklärt wo sie liegt und wie damit umzugehen ist
- **Multisig-Setup** mit vertrauenswürdigem Co-Signer (Lektion 2.5)
- **Shamir-Setup** mit Shares bei Familie plus sicherem Drittort
- **Spezialisierte Services** wie Casa (kommerziell, für High-Net-Worth)

Verzicht auf Inheritance-Planung ist auch eine Entscheidung — aber sie sollte bewusst getroffen werden.

**Empfehlung nach Kapitalgröße**

| Kapital | Empfehlung |
|---|---|
| < 1.000 USD | Papier in verschlossener Schublade, Duplikat an zweitem Ort |
| 1.000 – 10.000 USD | Metall-Backup, ein Ort, Inheritance-Notiz |
| 10.000 – 100.000 USD | Metall-Backup, zwei Orte, Hardware-Wallet |
| > 100.000 USD | Metall + Shamir oder Multisig, ernsthafte Inheritance-Planung |

Diese Tabelle ist Orientierung, nicht Dogma. Dein tatsächliches Bedrohungsprofil entscheidet.

### Folien-Zusammenfassung

**[Slide 1]** Titel: Seed-Phrase-Storage

**[Slide 2]** Drei Bedrohungen: Diebstahl, Zerstörung, Zugangsverlust. Oft gegeneinander arbeitend.

**[Slide 3]** Papier: einfach, kostenlos, universell. Anfällig für Feuer/Wasser. Für kleine Beträge.

**[Slide 4]** Metall: feuerfest, wasserfest, permanent. 50–100 USD Investition. Standard für signifikantes Kapital.

**[Slide 5]** Shamir Secret Sharing: k-of-n Shares. Einzel-Share wertlos. Diversifiziert Storage-Risiko.

**[Slide 6]** BIP-39-Passphrase: 13. Wort. Echte Wallet hinter Passphrase versteckt. Passphrase-Verlust = Asset-Verlust.

**[Slide 7]** Inheritance-Problem: Phrase ohne Nachfolgeplan = permanenter Verlust für Erben.

**[Slide 8]** Empfehlung nach Kapitalgröße: von Papier bis Multisig, je nach Betrag.

### Sprechertext

**[Slide 1]** Seed-Phrase-Storage ist das kritischste Einzelproblem in DeFi-Sicherheit.

**[Slide 2]** Drei Bedrohungen: Diebstahl, Zerstörung, Zugangsverlust. Sie arbeiten oft gegeneinander. Eine sehr sicher versteckte Phrase ist schwer zugänglich. Eine leicht zugängliche ist stehl-anfällig. Kopien vermehren die Angriffsfläche. Gutes Setup ist Trade-off, nicht Patentrezept.

**[Slide 3]** Papier: kostenlos, universell verständlich. Gut für Erben. Aber: Feuer, Wasser, verblassende Tinte. Für kleine Beträge ausreichend — bis vielleicht fünftausend Dollar. Für signifikantes Kapital zu riskant.

**[Slide 4]** Metall: Edelstahl schmilzt bei vierzehnhundert Grad, normale Hausbrände erreichen sechs- bis achthundert. Wasserfest, korrosionsbeständig. Fünfzig bis hundert Dollar Investition. Für signifikante Beträge der Standard.

**[Slide 5]** Shamir Secret Sharing: die Phrase wird in mathematisch getrennte Shares aufgeteilt. Zwei von drei Shares rekonstruieren die Phrase. Ein einzelner Share ist wertlos. Löst Diebstahl und Zerstörung gleichzeitig. Trezor Model T unterstützt das nativ. Komplexer, erfordert gute Dokumentation.

**[Slide 6]** Zusätzlich zu jedem Medium: BIP-39-Passphrase. Ein beliebiges zusätzliches Wort. Ohne Passphrase kommt die Seed-Phrase zu einer Decoy-Wallet. Mit Passphrase zur echten Wallet. Schützt auch gegen physischen Zwang. Warnung: Passphrase-Verlust bedeutet Asset-Verlust.

**[Slide 7]** Das Inheritance-Problem. Was passiert mit deinen Assets, wenn du stirbst? Eine nicht-findbare oder nicht-verstandene Phrase bedeutet permanenten Verlust für deine Erben. Ansätze: schriftliche Anleitung, Multisig, Shamir-Shares bei Familie. Verzicht auf Planung ist auch Entscheidung — aber bewusst sollte sie sein.

**[Slide 8]** Empfehlung nach Kapitalgröße: unter tausend Dollar Papier. Bis zehntausend Metall ein Ort. Bis hunderttausend Metall zwei Orte plus Hardware-Wallet. Über hunderttausend Metall plus Shamir oder Multisig plus Inheritance-Planung. Orientierung, nicht Dogma.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.
**[Slide 2]** Dreieck mit den drei Bedrohungen an den Ecken. Pfeile, die zeigen wie Lösung für eine Bedrohung andere verschlimmert.
**[Slide 3]** Foto einer Seed-Phrase auf Papier. Daneben Icons: Feuer, Wasser, verblassende Tinte.
**[Slide 4]** **SCREENSHOT SUGGESTION:** Cryptosteel-Website oder Produktfoto der Capsule mit sichtbaren Buchstabenplättchen.
**[Slide 5]** Diagramm: eine Phrase wird in drei Shares gesplittet. Zwei kombiniert rekonstruieren die Phrase; einer allein wird durchgestrichen.
**[Slide 6]** Diagramm: Seed-Phrase ohne Passphrase → Wallet A (leer). Seed-Phrase + Passphrase → Wallet B (echt).
**[Slide 7]** Familienbaum-Icon, Wallet im Zentrum, Fragezeichen über Erben. Lösungsansätze rechts.
**[Slide 8]** Tabelle mit Kapitalstufen und Empfehlungen.

### Übung

**Aufgabe: Dein persönliches Storage-Setup planen**

Schreibe ein Dokument (1–2 Seiten), das dein Storage-Setup definiert. Beantworte:

1. **Bedrohungsmodell:** Was sind deine wahrscheinlichsten Bedrohungen? (Wohnungseinbruch, Feuer, Familien-Zugriff, persönlicher Verlust)
2. **Kapitalgröße:** Welcher Gesamtbetrag könnte in DeFi eingesetzt werden (Schätzung)?
3. **Storage-Medium:** Papier, Metall, Shamir — welches und warum?
4. **Anzahl und Orte der Kopien:** Wie viele, wo?
5. **Passphrase:** Ja/Nein? Begründung?
6. **Inheritance-Plan:** Wie bekommen Erben im Notfall Zugang?

**Deliverable:** Strukturiertes Dokument mit deinem Plan. **Wichtig:** Die Seed-Phrase selbst gehört NICHT in dieses Dokument.

### Quiz

**Frage 1:** Was ist der zentrale Vorteil von Shamir Secret Sharing (2-of-3) gegenüber drei vollständigen Kopien derselben Seed-Phrase?

<details>
<summary>Antwort anzeigen</summary>

Bei drei vollständigen Kopien reicht jede einzelne Kopie, um alle Assets zu stehlen — das Diebstahl-Risiko multipliziert sich. Bei 2-of-3 Shamir ist eine einzelne entdeckte Kopie wertlos, sie offenbart nichts über die Phrase. Gleichzeitig tolerierst du den Verlust einer Kopie ohne Asset-Verlust. Shamir reduziert also Diebstahl-Wahrscheinlichkeit bei gleichzeitiger Redundanz gegen Zerstörung.
</details>

**Frage 2:** Eine BIP-39-Passphrase schützt vor welchem Angriffsszenario?

<details>
<summary>Antwort anzeigen</summary>

Vor Szenarien, in denen ein Angreifer die Seed-Phrase findet oder erhält — entweder durch Diebstahl (gefundene Metall-Platte) oder durch Zwang ("5-Dollar-Wrench-Attack", bei der das Opfer zur Herausgabe gezwungen wird). Ohne Passphrase hätte der Angreifer sofort Zugriff auf alle Assets. Mit Passphrase kommt er nur auf eine Decoy-Wallet; die echte Wallet bleibt hinter der separat gesicherten Passphrase unberührt.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 8 Slides: Titel → 3 Bedrohungen → Papier → Metall → Shamir SSS → BIP-39-Passphrase → Inheritance → Kapital-Empfehlungstabelle
- `voice_script.txt` — *Voice Narration Script* (120–140 WPM, Zielvideo 10–12 Min. wegen 8 Slides)
- `visual_plan.json` — Bedrohungsdreieck, Papier-Foto mit Schadenseffekten, Cryptosteel-Produktbild, 2-of-3-Shamir-Diagramm, Decoy/Real-Wallet-Diagramm, Inheritance-Baum, Kapital-Empfehlungstabelle

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 2.3 — Transaktions-Signaturen und ihre Gefahren

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die drei Haupttypen von Signaturen unterscheiden (Transaction, Message, Typed Data)
- Erklären, warum Typed-Data-Signaturen besonders gefährlich sind
- Ursachen und Lehren des Bybit-Hacks (Februar 2025) benennen
- Den Unterschied zwischen On-Chain-Approval, Permit (EIP-2612) und Permit2 technisch erklären
- Clear-Signing, Blind-Signing und Transaction-Simulation als drei verschiedene Schutzschichten anwenden
- Eine verdächtige "Login-Signatur" als möglichen Permit-Phishing-Angriff anhand der Feldstruktur erkennen

### Erklärung

Wenn du in DeFi etwas tust, signierst du mit deinem Private Key. Was genau du signierst, variiert erheblich — und das Missverständnis über diese Unterschiede ist der Grund für viele der größten Wallet-Verluste der letzten Jahre.

**Signatur-Typ 1: Transaction**

Die klassische Signatur. Du signierst eine vollständige Transaktion, die auf die Blockchain geht. Die Wallet zeigt:
- Empfänger-Adresse
- Betrag
- Gas-Kosten
- Aufgerufene Funktion (bei Smart-Contract-Interaktion)

Beispiele: ETH senden, Token-Swap, Lending-Deposit.

Die Transaktion kostet Gas, wird on-chain ausgeführt, ist einsehbar. Wenn etwas schief geht, siehst du es sofort in der Historie.

**Signatur-Typ 2: Message (personal_sign)**

Du signierst eine beliebige Nachricht — einfacher Text. Die Signatur bleibt off-chain; die Blockchain sieht nie, dass du unterschrieben hast.

Beispiele: Login auf DApps ("Sign in with Ethereum"), Off-chain-Voting.

Weil die Nachricht beliebig ist, kann sie technisch komplex sein. Manche DApps lassen dich Nachrichten unterschreiben, die wie "Login" aussehen, aber tatsächlich eine Autorisierung zu Token-Bewegungen enthalten.

**Signatur-Typ 3: Typed Data (EIP-712)**

Strukturierte Variante. Statt freier Nachricht signierst du ein definiertes Schema mit Feldern wie `token`, `spender`, `amount`, `deadline`. Die Wallet kann diese Daten in strukturierten Feldern anzeigen.

Beispiele: **Permit** (Token-Approval via Signatur, ohne On-Chain-Transaktion), **Permit2** (Uniswaps verbessertes Approval-System), OpenSea-NFT-Listings, 0x-Orders.

**Das ist der gefährlichste Signatur-Typ für Nutzer**, aus drei Gründen:
- Die Signatur kostet kein Gas (keine finanzielle Abschreckung)
- Die Wallet-Anzeige kann die tatsächliche Bedeutung nicht immer klar darstellen
- Ein Angreifer kann die Signatur später on-chain ausnutzen, um Assets zu ziehen

**Permit und Permit2 im Detail**

Standard-Approval (traditionell): Du signierst eine On-Chain-Transaktion, die dem Protokoll erlaubt, deine Tokens zu bewegen. Kostet Gas. Wallet zeigt genaue Approval.

**Permit (EIP-2612):** Off-Chain-Signatur, die dem Protokoll Approval gibt. Kein Gas. Das Protokoll führt die Approval später on-chain aus, wenn nötig.

**Problem:** Wenn ein böswilliges Frontend dich dazu bringt, einen Permit zu signieren, der überhöhte Beträge erlaubt oder den Permit an eine Angreifer-Adresse ausstellt, kann dein Kapital gezogen werden — oft Minuten nachdem du "nur eingeloggt" hast.

**Permit2 (Uniswap, 2022):** Einmalige Approval an einen zentralen Permit2-Contract, der Sub-Approvals an Protokolle verwaltet. Komfortabel, vergrößert aber die Angriffsfläche, weil Permit2-Signaturen komplexer zu lesen sind.

**Der Bybit-Hack (Februar 2025)**

Am 21. Februar 2025 wurde Bybit — eine der größten zentralisierten Exchanges — um etwa 1,5 Milliarden USD in ETH bestohlen. Das ist der größte bekannte Krypto-Hack aller Zeiten.

**Was technisch passierte:** Bybit nutzte Safe (früher Gnosis Safe) für die Cold Wallet — ein Multisig-Setup. Die Angreifer (vermutlich die nordkoreanische Lazarus-Gruppe) kompromittierten das Frontend-Interface, über das Bybit-Mitarbeiter Transaktionen signierten. Das Team sah auf dem Bildschirm eine reguläre Transaktion. Tatsächlich signierten sie ein Upgrade des Safe-Contracts auf eine bösartige Implementierung, die dem Angreifer Kontrolle übergab.

Der Vektor war eine Typed-Data-Signatur (EIP-712), die ein Safe-Upgrade darstellte. Die signierenden Personen sahen nicht die tatsächliche Bedeutung, weil das Interface manipuliert war und die Hardware-Wallet-Darstellung unzureichend decodierte.

**Die Lehren für DeFi-Nutzer:**

1. **Was deine Wallet zeigt, ist nicht zwingend, was du signierst.** Besonders bei Typed Data muss man die Daten manuell prüfen.
2. **Blind-Signing ist gefährlich.** Viele Hardware-Wallets zeigen bei Typed Data nur einen Hash-Wert — ohne dezidierte Decodierung signierst du blind.
3. **Clear-Signing als Schutzmechanismus.** Neuere Wallets (Rabby) und Hardware-Wallets (aktuelle Ledger-Modelle) decodieren Typed Data in lesbare Form. Essentiell.
4. **Transaction-Simulation.** Tools wie Tenderly oder integrierte Rabby-Simulation zeigen vor dem Signieren, was tatsächlich passiert (Token-Bewegungen, Balance-Änderungen).

**Praktische Regeln für Signaturen**

- Vor jedem Signieren: Transaction-Simulation prüfen (Rabby automatisch, Tenderly manuell)
- Bei Typed Data: Felder individuell lesen — besonders `spender`, `amount`, `deadline`
- Bei unbekannten DApps: kein Signing ohne Verständnis
- Wenn eine DApp eine Signatur "zum Einloggen" verlangt, aber Typed Data mit Token-Feldern zeigt: STOP
- Hardware-Wallet verwenden — physische Bestätigung erforderlich, Clear-Signing nutzen

### Folien-Zusammenfassung

**[Slide 1]** Titel: Signaturen — der gefährlichste Moment in DeFi

**[Slide 2]** Drei Signatur-Typen: Transaction (on-chain, kostet Gas), Message (off-chain, frei), Typed Data EIP-712 (strukturiert, off-chain, oft gefährlich).

**[Slide 3]** Warum Typed Data gefährlich ist: kein Gas-Signal, UI oft unklar, Angreifer kann später ausnutzen.

**[Slide 4]** Permit und Permit2: Approval via Signatur. Elegant, aber bei Missbrauch katastrophal.

**[Slide 5]** Bybit-Hack Februar 2025: 1,5 Milliarden USD. Safe-Multisig-Signaturen, aber manipulierte UI. Signierte Inhalte ≠ angezeigte Inhalte.

**[Slide 6]** Vier Lehren: Wallet-Anzeige ist nicht verbindlich. Blind-Signing ist gefährlich. Clear-Signing ist essentiell. Simulation verwenden.

**[Slide 7]** Praktische Regeln: Simulation, Typed-Data-Felder lesen, unbekannte DApps meiden, Hardware-Wallet.

### Sprechertext

**[Slide 1]** Signaturen sind der gefährlichste Moment in DeFi. Hinter fast jedem großen Wallet-Verlust steckte eine Signatur, deren Konsequenzen der Signer nicht verstanden hat.

**[Slide 2]** Drei Signatur-Typen. Transaction: vollständige On-Chain-Transaktion, kostet Gas, öffentlich. Message: freier Text, off-chain. Typed Data nach EIP-712: strukturierte Signatur mit definierten Feldern, off-chain — oft der gefährlichste Typ.

**[Slide 3]** Warum Typed Data besonders gefährlich ist: erstens kein Gas-Kostensignal als Abschreckung. Zweitens kann die Wallet-Anzeige die Bedeutung nicht immer klar darstellen. Drittens kann der Angreifer die Signatur zeitverzögert ausnutzen. Du denkst, du hast nur eingeloggt — in Wahrheit hast du einen Permit für alle deine USDC signiert.

**[Slide 4]** Permit und Permit2. Permit ist EIP-2612: statt On-Chain-Approval eine Off-Chain-Signatur. Gas-sparend, elegant — aber bei Missbrauch katastrophal. Permit2 ist Uniswaps verbessertes System; löst manche Probleme, führt eigene Komplexität ein.

**[Slide 5]** Das lehrreichste Beispiel: Bybit-Hack am 21. Februar 2025. 1,5 Milliarden Dollar in ETH. Größter Krypto-Hack aller Zeiten. Bybit nutzte Safe-Multisig für die Cold Wallet. Die Angreifer kompromittierten das Interface. Das Team sah eine reguläre Transaktion — tatsächlich signierten sie ein Safe-Upgrade auf eine bösartige Version. Angreifer bekam die Kontrolle.

**[Slide 6]** Die Lehren. Erstens: Wallet-Anzeige ist nicht zwingend Signatur-Inhalt. Zweitens: Blind-Signing ist gefährlich — viele Hardware-Wallets zeigen bei Typed Data nur Hash. Drittens: Clear-Signing — Decodierung in lesbare Form — ist essentiell. Viertens: Transaction-Simulation zeigt die tatsächlichen Effekte vor dem Signieren.

**[Slide 7]** Regeln. Jede Transaktion simulieren, Rabby macht es automatisch. Bei Typed Data einzelne Felder lesen. Unbekannte DApps ohne Verständnis nicht anfassen. Und Hardware-Wallet verwenden — der kompromittierte Browser kann ohne physische Bestätigung nicht signieren.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.
**[Slide 2]** Drei Spalten: Transaction, Message, Typed Data. Beispiele und Charakteristika pro Spalte.
**[Slide 3]** Warnschild neben "Typed Data" mit drei roten Bullets.
**[Slide 4]** **SCREENSHOT SUGGESTION:** Permit2-Signatur-Dialog in Rabby oder MetaMask mit sichtbaren Feldern (spender, amount, deadline).
**[Slide 5]** Zeitleiste und Flussdiagramm des Bybit-Hacks: Mitarbeiter → Kompromittiertes UI → Safe-Upgrade → Angreifer-Kontrolle. **SCREENSHOT SUGGESTION:** rekt.news-Artikel zum Bybit-Hack oder Arkham-Dashboard der gestohlenen Gelder.
**[Slide 6]** Vier-Punkt-Checkliste als Icons.
**[Slide 7]** **SCREENSHOT SUGGESTION:** Rabby-Transaction-Simulation-Screen mit klarer Anzeige der Token-Bewegungen.

### Übung

**Aufgabe: Transaction-Simulation in der Praxis**

1. Installiere Rabby (falls noch nicht geschehen).
2. Öffne app.uniswap.org.
3. Wähle einen Token-Swap (z.B. 0,01 ETH zu USDC). **Führe nicht aus** — stoppe beim Bestätigungs-Dialog.
4. Analysiere die Rabby-Simulation. Was zeigt sie an Token-Bewegungen und Approvals?
5. Zusätzlich: Besuche revoke.cash mit deiner Wallet und prüfe deine aktuellen Approvals.

**Deliverable:** Zwei Screenshots — Rabby-Simulation und revoke.cash-Approval-Liste.

### Quiz

**Frage 1:** Eine DApp fordert dich auf, "zum Einloggen" eine Signatur zu erstellen. Die Signatur ist vom Typ Typed Data (EIP-712). Was ist deine Verteidigung?

<details>
<summary>Antwort anzeigen</summary>

Prüfe die Felder der Typed Data vor dem Signieren. Ein Login (z.B. "Sign in with Ethereum", EIP-4361) sollte nur generische Felder enthalten: domain, message mit timestamp und address. Wenn du Token-spezifische Felder siehst — token, spender, amount, deadline — ist es kein Login, sondern ein Permit. Ein böswilliger Permit kann deine Tokens stehlen. Bei unbekannten oder zweifelhaften Sites signiere nichts, auch wenn die Felder harmlos aussehen.
</details>

**Frage 2:** Warum schützt selbst eine Hardware-Wallet nicht vollständig gegen den Angriffstyp des Bybit-Hacks?

<details>
<summary>Antwort anzeigen</summary>

Weil das Bybit-Team die Hardware-Wallets korrekt nutzte — sie bestätigten bewusst auf den Geräten. Das Problem war, dass die angezeigten Typed-Data-Signaturen komplex waren und die Hardware-Wallets sie nicht vollständig in lesbare Form decodieren konnten. Die Mitarbeiter sahen auf dem Browser eine reguläre Transaktion, aber auf dem Gerät nur Hash oder unverständliche Rohdaten. Ohne Clear-Signing und ohne Abgleich zwischen Browser und Gerät ist auch Hardware-Wallet verwundbar. Verteidigung erfordert drei Schichten: Hardware-Wallet + Clear-Signing + Transaction-Simulation.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 7 Slides: Titel → 3 Signatur-Typen → Gefahr von Typed Data → Permit/Permit2 → Bybit-Hack Case Study → 4 Lehren → Praktische Regeln
- `voice_script.txt` — *Voice Narration Script* (120–140 WPM, Zielvideo 9–11 Min.)
- `visual_plan.json` — Drei-Spalten-Vergleich Signaturtypen, Permit2-Signatur-Dialog, Bybit-Hack-Zeitleiste (1,5 Mrd. USD), Clear-Signing-Checkliste, Rabby-Simulation-Screenshot

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 2.4 — Token-Approvals und Drainer-Angriffe

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Das approve/transferFrom-Pattern von ERC-20-Tokens erklären
- Die Anatomie eines Drainer-Angriffs in vier Phasen aufschlüsseln
- Einen systematischen Approval-Audit mit revoke.cash durchführen
- Die vier Drainer-Varianten (klassische Approval, Permit, setApprovalForAll, direkter Transfer) nach Risiko einordnen
- Die Lehren aus dem Mark-Cuban-Vorfall (September 2023) auf die eigene Wallet-Hygiene übertragen
- Gift-Token und Dusting-Attacks als indirekten Drainer-Vektor erkennen und defensiv handhaben

### Erklärung

Token-Approvals sind absolut notwendig, damit DeFi funktioniert — und gleichzeitig der häufigste Angriffsvektor für Drainer. Diese Lektion erklärt das Pattern und die Verteidigung.

**Das approve/transferFrom-Pattern**

Der ERC-20-Standard definiert zwei Funktionen, die zusammen das Approval-System bilden:

1. `approve(spender, amount)` — Der Token-Besitzer sagt dem Token-Contract: "Die Adresse `spender` darf bis zu `amount` meiner Tokens bewegen."
2. `transferFrom(from, to, amount)` — Der Spender kann dann innerhalb des approved Limits Tokens von `from` zu beliebiger Adresse senden.

Warum das notwendig ist: Smart Contracts können nicht auf deine Tokens zugreifen, ohne dass du es explizit zulässt. Ein DEX, der einen Swap durchführen will, braucht erst Approval, dann kann er `transferFrom` aufrufen.

**Das Standard-Problem: Unlimited Approvals**

Viele DApps fordern "unlimited approval" — also `amount = 2^256 - 1`, praktisch unendlich. Begründung: keine erneuten Approvals bei Folgetransaktionen, kein zusätzliches Gas.

**Das Risiko:** Wenn du einer DApp unlimited Approval für USDC gibst und die DApp später gehackt wird (oder bösartig war), kann der Angreifer alle deine USDC abziehen — jetzt oder Monate später. Die Approval bleibt bestehen, bis du sie explizit widerrufst.

**Drainer-Angriffe: Die vier Phasen**

Drainer sind Smart Contracts, die systematisch Nutzer bestehlen. Der typische Ablauf:

**Phase 1: Köder**
Der Nutzer landet auf einer bösartigen Website. Vektoren:
- Phishing-Link (E-Mail, Discord-DM, Twitter-Reply)
- Gefälschtes Google-Ad für eine bekannte DApp (häufig)
- Kompromittiertes Protokoll-Frontend (selten, aber passiert)
- Airdrop-Scam mit Aufforderung, eine Site zu besuchen

**Phase 2: Connect und Signatur**
Die Site fordert Wallet-Connection und Signatur. Je nach Drainer-Variante:

- *Variante A (klassisch):* Unlimited Approval für einen Token auf die Drainer-Adresse
- *Variante B (Permit):* Off-chain Permit-Signatur, später on-chain ausgeführt
- *Variante C (setApprovalForAll bei NFTs):* Approval für alle NFTs einer Collection
- *Variante D (Direkter Transfer):* Seltener, weil UI verdächtiger

**Phase 3: Transfer**
Nach erfolgter Approval ruft der Drainer-Contract `transferFrom` auf und zieht Tokens ab. Typischerweise Sekunden bis Minuten nach der Approval.

**Phase 4: Obfuskation**
Gestohlene Tokens werden durch Mixer, Bridges oder Wash-Trades gewaschen, um Rückverfolgung zu erschweren.

**Beispiel: Der Mark-Cuban-Vorfall (September 2023)**

Der Unternehmer Mark Cuban verlor etwa 870.000 USD an einen Drainer. Mutmaßlicher Vektor: eine gefälschte MetaMask-Extension, die er statt der echten herunterlud. Der Angreifer kontrollierte damit die Wallet und nutzte bestehende Approvals, die Cuban legitimen Protokollen gegeben hatte, um Tokens zu transferieren.

**Lehre:** Auch ohne neue Signaturen kann eine kompromittierte Wallet via bestehender Approvals ausgeraubt werden. Deshalb ist Approval-Hygiene selbst bei perfektem Signatur-Verhalten wichtig.

**Mitigation: Der Approval-Audit**

Systematische Approval-Hygiene ist der wichtigste präventive Schritt.

**Schritt 1: Approval-Übersicht**
- Gehe auf **revoke.cash**
- Verbinde deine Wallet (nur Read-Only für Anzeige)
- Revoke.cash listet alle bestehenden Approvals

**Schritt 2: Bewertung jeder Approval**
- Kennst du das Protokoll?
- Ist die Approval-Höhe angemessen oder "unlimited"?
- Nutzt du das Protokoll noch?

**Schritt 3: Widerruf überflüssiger Approvals**
- Klick "Revoke" bei Approvals, die du nicht mehr brauchst
- Jeder Revoke ist eine On-Chain-Transaktion, kostet Gas
- Priorisiere nach Approval-Höhe und Bekanntheit des Spenders

**Schritt 4: Regelmäßige Wiederholung**
- Mindestens monatlich
- Immer nach dem Testen neuer Protokolle
- Bei Verdacht auf Kompromittierung: sofort

**Verteidigungs-Werkzeuge**

1. **Rabby Wallet** — zeigt bei jeder Transaktion aktuelle und neue Approvals, warnt bei bekannten Bedrohungen
2. **revoke.cash** — Standard-Tool für Approval-Management
3. **Tenderly** — Transaction-Simulation für komplexe Fälle
4. **Pocket Universe / Wallet Guard** — Browser-Erweiterungen mit Echtzeit-Warnungen
5. **Hardware-Wallet** — physische Bestätigung verhindert Remote-Signierung

**Das Gift-Token-Problem**

Verwandtes Problem: manchmal tauchen in deiner Wallet unbekannte Tokens auf, die du nicht gekauft hast ("Dusting Attacks"). Die Namen oder Websites dieser Tokens laden oft zu Aktionen ein — "Claim your reward", "Swap for ETH". Wenn du mit diesen Tokens interagierst, ruft der Token-Contract typischerweise Approval-Signaturen an.

**Regel:** Unbekannte Tokens nicht antasten. Nicht swappen, nicht approven, nicht claimen. Einfach ignorieren.

### Folien-Zusammenfassung

**[Slide 1]** Titel: Token-Approvals und Drainer-Angriffe

**[Slide 2]** Das approve/transferFrom-Pattern: Besitzer approves, Spender transferFrom. Notwendig für DeFi.

**[Slide 3]** Unlimited Approval: Standard-Default, komfortabel, aber langfristig riskant. Bleibt bestehen bis Widerruf.

**[Slide 4]** Vier Drainer-Phasen: Köder, Connect+Signatur, Transfer, Obfuskation.

**[Slide 5]** Vier Drainer-Varianten: klassische Approval, Permit, setApprovalForAll, direkter Transfer.

**[Slide 6]** Mark-Cuban-Fall: 870.000 USD verloren durch gefälschte Extension und Ausnutzung bestehender Approvals.

**[Slide 7]** Approval-Audit-Workflow: revoke.cash → Bewerten → Widerrufen → Monatlich wiederholen.

**[Slide 8]** Gift-Token-Regel: Unbekannte Tokens nicht antasten.

### Sprechertext

**[Slide 1]** Token-Approvals sind der häufigste Vektor für Drainer-Angriffe. Gleichzeitig notwendig für DeFi. Du musst das Pattern verstehen, um dich zu schützen.

**[Slide 2]** Das ERC-20-Pattern: approve und transferFrom. Der Besitzer gibt dem Spender die Erlaubnis, bis zu einem Betrag Tokens zu bewegen. Der Spender kann dann transferFrom nutzen. Ohne diesen Mechanismus könnten DEXs, Lending-Protokolle und andere DApps nicht mit deinen Tokens arbeiten.

**[Slide 3]** Standard-Problem: viele DApps fordern Unlimited Approval — der maximale Wert. Begründung: keine Folge-Approvals, weniger Gas. Risiko: bei späterem Hack oder Bösartigkeit kann der Angreifer alle Tokens ziehen. Approval bleibt bis zum expliziten Widerruf bestehen.

**[Slide 4]** Drainer-Angriffe laufen in vier Phasen. Phase eins: Köder — bösartige Website, Phishing, gefälschte Ads. Phase zwei: Connect und Signatur. Phase drei: Transfer via transferFrom, Sekunden nach Approval. Phase vier: Obfuskation durch Mixer und Bridges.

**[Slide 5]** Vier Varianten. Klassisch: On-Chain-Approval. Permit: off-chain, kein Gas, besonders tückisch. setApprovalForAll für NFTs: eine Signatur öffnet ganze Collection. Direkter Transfer: seltener, UI oft verdächtig. Variante B und C sind die häufigsten.

**[Slide 6]** Beispiel Mark Cuban, September 2023. 870.000 Dollar verloren durch mutmaßlich gefälschte MetaMask-Extension. Der Angreifer kontrollierte damit die Wallet und nutzte bestehende, legitime Approvals. Lehre: auch ohne neue Signaturen kann kompromittierte Wallet ausgeraubt werden.

**[Slide 7]** Der Approval-Audit. Schritt eins: revoke.cash, Wallet verbinden, Approvals anzeigen. Schritt zwei: jede Approval bewerten. Schritt drei: widerrufen, was du nicht mehr brauchst. Schritt vier: monatlich wiederholen. Nach Kompromittierungsverdacht sofort.

**[Slide 8]** Zusatzregel: Gift-Tokens. Unbekannte Tokens in deiner Wallet? Nicht antasten. Keine Swaps, keine Approvals, keine Claims. Jede Interaktion kann eine Falle sein.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.
**[Slide 2]** Diagramm: Nutzer → approve → Token-Contract. Nutzer → swap-Call → DEX-Contract → transferFrom → Token-Contract.
**[Slide 3]** Beispiel-Unlimited-Approval-Anzeige in Wallet. Warnsymbol.
**[Slide 4]** Vier-Phasen-Timeline mit beispielhaften Screens pro Phase.
**[Slide 5]** Vier Varianten-Karten mit Gefahrenstufen.
**[Slide 6]** **SCREENSHOT SUGGESTION:** Nachrichtenartikel zum Mark-Cuban-Vorfall oder Etherscan-Transaction des Drains.
**[Slide 7]** **SCREENSHOT SUGGESTION:** revoke.cash-Interface mit realer Approval-Liste und Revoke-Button.
**[Slide 8]** Beispiel-Gift-Token in Wallet mit "Do not interact"-Icon.

### Übung

**Aufgabe: Approval-Audit deiner Wallet**

1. Gehe auf **revoke.cash**.
2. Verbinde deine Wallet (nur Read-Only für die Anzeige).
3. Analysiere die angezeigte Approval-Liste.
4. Für jede Approval notiere:
 - Spender (welches Protokoll?)
 - Token
 - Höhe (unlimited oder spezifisch?)
 - Status: notwendig / überflüssig / unbekannt

**Optional:** Widerrufe überflüssige Approvals (kostet Gas).

**Deliverable:** Tabelle mit mindestens 5 Zeilen, inklusive deiner Entscheidung pro Approval.

### Quiz

**Frage 1:** Ein Protokoll fordert Unlimited Approval für USDC. Was ist der rationalste Ansatz?

<details>
<summary>Antwort anzeigen</summary>

Die Approval geben, wenn das Protokoll vertrauenswürdig ist (etabliert, auditiert, hoher TVL) und häufig genutzt wird — aber gleichzeitig monatliche Approval-Audits durchführen und die Approval sofort widerrufen, wenn das Protokoll nicht mehr genutzt wird. Alternativ: eine limitierte Approval in Höhe der aktuellen Transaktion (mehr Gas, aber sicherer). Die Wahl hängt von Nutzungsfrequenz und Risiko-Toleranz ab. Für kleine Beträge und häufige Nutzung ist Unlimited praktisch; für große Beträge oder seltene Nutzung ist Limited sicherer.
</details>

**Frage 2:** Warum ist ein Permit-basierter Drainer (Variante B) besonders gefährlich im Vergleich zu klassischem Approval-Drainer (Variante A)?

<details>
<summary>Antwort anzeigen</summary>

Drei Gründe. Erstens: die Permit-Signatur ist off-chain und kostet kein Gas — das Abschreckungssignal einer On-Chain-Transaktion fehlt. Zweitens: die Wallet-Anzeige einer Permit-Signatur (Typed Data) ist oft weniger klar als bei einer Transaction-Signatur; die Felder werden nicht immer verständlich dargestellt. Drittens: die Permit-Signatur kann zeitverzögert ausgenutzt werden — der Angreifer reicht sie Sekunden oder Stunden später on-chain ein, wodurch das Opfer den Zusammenhang zwischen "Ich habe nur eingeloggt" und dem späteren Verlust oft nicht erkennt.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 8 Slides: Titel → approve/transferFrom → Unlimited Approval → 4 Drainer-Phasen → 4 Drainer-Varianten → Mark-Cuban-Fall → Approval-Audit-Workflow → Gift-Token-Regel
- `voice_script.txt` — *Voice Narration Script* (120–140 WPM, Zielvideo 10–12 Min.)
- `visual_plan.json` — approve-Flussdiagramm, Unlimited-Approval-Screenshot, Vier-Phasen-Timeline, Mark-Cuban-Artikel, revoke.cash-Interface, Gift-Token-Beispiel

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 2.5 — Hardware-Wallets und Safe-Multisig

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Die Funktionsweise und Schutzgrenzen von Hardware-Wallets verstehen
- Ein Safe-Multisig-Setup konfigurieren und seinen Nutzen einordnen
- Entscheiden, wann Hardware-Wallet vs. Multisig vs. beides angemessen ist
- Drei typische Multisig-Konfigurationen (2-of-3 Personal, 3-of-5 Team, 2-of-2 Couple) in ihren Anwendungsfällen gegenüberstellen
- Die Rolle von Account Abstraction (ERC-4337) und Smart Wallets (Safe, Rhinestone, Ambire, Zerion) in der zukünftigen Wallet-Landschaft einordnen
- Eine Entscheidungsmatrix anwenden, um das passende Wallet-Setup nach Kapitalstufe (< 1k / 1–10k / 10–100k / > 100k USD) zu wählen

### Erklärung

In Lektion 2.1 sahen wir: der Private Key ist der einzige kritische Punkt. In Lektion 2.3: selbst mit sicherem Key kann eine böse Signatur alles zerstören. Zwei Werkzeuge adressieren diese Risiken: Hardware-Wallets und Multisig-Setups.

**Hardware-Wallets**

Ein Hardware-Wallet ist ein spezialisiertes Gerät, das den Private Key isoliert von Internet und Computer speichert. Der Key verlässt das Gerät niemals. Transaktionen werden auf dem Gerät signiert; nur die signierte Transaktion geht zurück an den Computer.

**Schutzwirkung:**
- Private Key kann nicht durch Malware gestohlen werden, weil er nie im Computer existiert
- Jede Signatur erfordert physische Bestätigung (Knopfdruck oder PIN)
- Selbst kompromittierte Browser-Extensions können nicht ohne physische Interaktion signieren

**Was Hardware-Wallets NICHT schützen:**
- Seed-Phrase-Kompromittierung (wenn Seed-Phrase gestohlen wird, ist der Schutz weg)
- Signatur-Angriffe, wenn der Nutzer auf dem Gerät einen bösen Inhalt bestätigt (siehe Bybit)
- Phishing, bei dem Seed-Phrase oder PIN auf einer gefälschten Seite eingegeben wird

**Populäre Modelle:**

**Ledger Nano S Plus / Nano X** — Marktführer, breite Chain-Unterstützung, Closed-Source Secure Element (umstritten), 2020er Kundendaten-Leak betraf nicht die Hardware, aber machte Ledger-Besitzer zu Phishing-Zielen. Preiswert ab ca. 80 USD. Clear-Signing wird ausgebaut.

**Trezor Model T / Safe 3 / Safe 5** — Open-Source Firmware, Shamir-SSS-Unterstützung (SLIP-39), Touchscreen (Model T), weniger Chain-Apps als Ledger. Ca. 150–250 USD.

**GridPlus Lattice1** — Größeres Display, bessere Clear-Signing-Fähigkeit, teurer (ca. 400 USD). SafeCards für Backup-Key-Lagerung.

**Empfehlung:** Ledger Nano S Plus für den Einstieg (preisgünstig, weit unterstützt). Für höhere Beträge Trezor oder GridPlus nach persönlicher Präferenz. Wichtiger als das Modell ist: konsistent nutzen und niemals die Seed-Phrase digital eingeben.

**Multisig-Wallets: Das Safe-Konzept**

Ein Multisig-Wallet erfordert mehrere Unterschriften für jede Transaktion. Kompromittierung einer einzelnen Wallet führt nicht zu Asset-Verlust.

**Safe** (safe.global, früher Gnosis Safe) ist die Standard-Multisig-Implementierung in EVM-DeFi. Ein Safe ist ein Smart Contract, der eine Liste von Besitzern (Owner-Adressen) und einen Threshold (z.B. 2-of-3) hält.

**Typische Konfigurationen:**

*2-of-3 Personal*
- Owner 1: Hardware-Wallet Nummer 1 (Hauptgerät)
- Owner 2: Hardware-Wallet Nummer 2 (Backup, anderer Ort)
- Owner 3: Mobile/Hot Wallet für tägliche Bestätigungen
- Szenario: Verlust eines Geräts → zwei andere reichen für Recovery

*3-of-5 Team*
- Owner 1–3: Kern-Team-Mitglieder
- Owner 4–5: Externe Vertraute (z.B. Legal, Advisor)
- Szenario: zwei Team-Mitglieder kompromittiert → Recovery noch möglich

*2-of-2 Couple*
- Owner 1: Person A
- Owner 2: Person B
- Beide müssen zustimmen (z.B. ehegemeinschaftliche Finanzkontrolle)

**Vorteile des Safe-Setups:**
- Einzel-Kompromittierung reicht nicht aus
- Social Recovery möglich (Freunde, Familie als Co-Signer)
- Inheritance-Planung elegant machbar
- Transaktionen können vorgeschlagen werden, ohne ausgeführt zu werden

**Nachteile:**
- Höhere Gas-Kosten (mehrere Signaturen)
- Komplexere Koordination bei Transaktionen
- Einzelne DeFi-Protokolle haben historisch Probleme mit Contract-Wallets (verbessert sich, Account-Abstraktion hilft)

**Account Abstraction und Smart Wallets**

ERC-4337 (Account Abstraction, live seit 2023) erlaubt Wallets, die mehr können als klassische EOAs:
- Social Recovery ohne Multisig-Komplexität
- Session Keys (temporäre, begrenzte Autorisierungen)
- Gasless Transactions (Paymaster zahlt)
- Transaction-Batching (mehrere Aktionen in einer Transaktion)

Smart Wallets wie **Safe**, **Rhinestone**, **Ambire**, **Zerion** implementieren Teile davon. Wachsendes Feld, das klassische Wallet-Architektur ergänzt.

**Entscheidungsmatrix**

| Kapital | Nutzung | Empfehlung |
|---|---|---|
| < 1.000 USD | Gelegentlich | Software-Wallet (Rabby) |
| 1.000 – 10.000 USD | Regelmäßig | Software + Hardware-Wallet |
| 10.000 – 100.000 USD | Aktiv | Hardware-Wallet (Ledger/Trezor), separate DeFi-Wallet |
| > 100.000 USD | Aktiv oder Cold | Safe 2-of-3 mit Hardware-Wallets als Signer |

Die Investition in Hardware-Wallet und Safe-Setup zahlt sich ab dem niedrigen 4-stelligen Kapitalbereich aus. Das ist kein Nice-to-have, sondern die Basis jeder ernsthaften DeFi-Aktivität.

### Folien-Zusammenfassung

**[Slide 1]** Titel: Hardware-Wallets und Safe-Multisig

**[Slide 2]** Hardware-Wallet: Private Key bleibt auf isoliertem Gerät. Signatur im Gerät, physische Bestätigung.

**[Slide 3]** Hardware-Wallet-Grenzen: schützt nicht gegen Seed-Phrase-Verlust, böse Signaturen, Phishing.

**[Slide 4]** Modelle: Ledger (Einstieg), Trezor (Open-Source), GridPlus (Premium).

**[Slide 5]** Safe-Konzept: Smart Contract mit Owners-Liste und Threshold k-of-n.

**[Slide 6]** Konfigurationen: 2-of-3 Personal, 3-of-5 Team, 2-of-2 Couple.

**[Slide 7]** Account Abstraction: ERC-4337, Smart Wallets, Recovery ohne Multisig-Komplexität.

**[Slide 8]** Entscheidungsmatrix: von Software-Wallet bis Multisig je nach Kapital.

### Sprechertext

**[Slide 1]** Hardware-Wallets und Multisig-Setups adressieren zwei verschiedene Risiken: Key-Diebstahl durch Malware und Single-Point-of-Failure bei einer einzelnen Signatur. Beide Werkzeuge verstehen wir jetzt.

**[Slide 2]** Ein Hardware-Wallet ist ein spezialisiertes Gerät, das den Private Key isoliert speichert. Der Key verlässt das Gerät nie. Transaktionen werden auf dem Gerät signiert, nur die fertige Signatur geht an den Computer. Jede Signatur braucht physische Bestätigung.

**[Slide 3]** Was Hardware-Wallets nicht können: sie schützen nicht gegen Seed-Phrase-Kompromittierung — wenn die gestohlen wird, ist der Schutz weg. Sie schützen nicht vollständig gegen böse Signaturen, die der Nutzer selbst bestätigt — siehe Bybit-Hack. Sie schützen nicht gegen Phishing, wenn Seed-Phrase oder PIN auf gefälschten Seiten eingegeben werden.

**[Slide 4]** Drei populäre Modelle. Ledger Nano S Plus: Marktführer, achtzig Dollar, breite Unterstützung. Trezor: Open-Source-Firmware, Shamir-Unterstützung, teurer. GridPlus Lattice1: Premium mit großem Display, etwa vierhundert Dollar. Für den Einstieg reicht Ledger. Konsistente Nutzung ist wichtiger als das Modell.

**[Slide 5]** Multisig: Safe ist die Standard-Implementierung. Ein Smart Contract mit einer Liste von Ownern und einem Threshold. Zum Beispiel zwei-von-drei: drei Signer definiert, zwei reichen für eine Transaktion. Kompromittierung einer einzelnen Wallet führt nicht zum Verlust.

**[Slide 6]** Typische Konfigurationen. Zwei-von-drei persönlich: Hardware eins, Hardware zwei an anderem Ort, Mobile für Bestätigungen. Drei-von-fünf Team: Kernmitglieder plus externe Vertraute. Zwei-von-zwei Paar: gemeinsame Finanzkontrolle. Jede Konfiguration ist Trade-off zwischen Sicherheit und Bedienbarkeit.

**[Slide 7]** ERC-4337, seit 2023 live, bringt Account Abstraction. Smart Wallets können Social Recovery ohne Multisig-Komplexität, Session Keys für begrenzte Autorisierungen, Gasless Transactions. Safe, Rhinestone, Ambire, Zerion implementieren Teile davon. Das Feld wächst schnell.

**[Slide 8]** Entscheidungsmatrix. Unter tausend Dollar: Software-Wallet reicht. Bis zehntausend: Software plus Hardware. Bis hunderttausend: Hardware als Default, separate DeFi-Wallet für aktive Positionen. Über hunderttausend: Safe mit mehreren Hardware-Wallets als Signer. Ab niedrigen vierstelligen Beträgen amortisiert sich die Investition in ordentliche Wallet-Infrastruktur.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.
**[Slide 2]** Diagramm: Computer (kompromittiert?) ↔ Hardware-Wallet (isoliert) — mit Pfeil für Transaktion-Hinschicken und Signatur-Zurückgeben.
**[Slide 3]** Drei rote Kreuze neben "Seed-Phrase-Diebstahl", "Böse Signatur bestätigt", "Phishing".
**[Slide 4]** **SCREENSHOT SUGGESTION:** Produktbilder von Ledger Nano S Plus, Trezor Model T, GridPlus Lattice1 nebeneinander.
**[Slide 5]** **SCREENSHOT SUGGESTION:** app.safe.global-Interface mit beispielhafter 2-of-3-Konfiguration und pending Transaction.
**[Slide 6]** Drei Karten: Personal, Team, Couple — jede mit Icon und Szenario.
**[Slide 7]** Diagramm: klassische EOA vs. Smart Wallet mit Zusatzfeatures.
**[Slide 8]** Tabelle Kapital vs. Empfehlung.

### Übung

**Aufgabe: Safe-Multisig-Testnet-Setup**

1. Gehe auf **app.safe.global**.
2. Wechsel auf Sepolia-Testnet (kein echtes Geld erforderlich).
3. Erstelle ein 2-of-3-Safe mit drei Adressen deiner Wallet (oder zwei deiner + eine Test-Adresse eines Freundes).
4. Initiiere eine Test-Transaktion (z.B. 0 ETH an eine beliebige Adresse).
5. Unterzeichne mit zwei der drei Signer.
6. Beobachte: Erst nach der zweiten Unterschrift wird die Transaktion ausführbar.

**Deliverable:** Link zur Test-Transaktion auf Etherscan (sepolia.etherscan.io) und kurze Notiz zu deiner Beobachtung des Signatur-Prozesses.

### Quiz

**Frage 1:** Eine Person hat 50.000 USD in DeFi-Positionen und nutzt eine einzelne Hardware-Wallet. Welches Hauptrisiko bleibt, das ein Safe-Multisig-Setup adressieren würde?

<details>
<summary>Antwort anzeigen</summary>

Zwei Hauptrisiken bleiben: Erstens das Einzel-Gerät-Risiko — Verlust, Zerstörung oder Diebstahl des Hardware-Wallets erzwingt Recovery via Seed-Phrase. Zweitens das Einzel-Signatur-Risiko — eine böse Signatur (z.B. durch Phishing zu signierende Malicious Transaction) kann zum Totalverlust führen. Ein 2-of-3-Safe mit Hardware-Wallets erfordert zwei Zustimmungen, was beide Risiken adressiert: Gerät-Verlust ist durch die anderen zwei Signer absorbiert, und eine einzelne böse Signatur reicht nicht aus, um Assets zu bewegen. Der Preis ist höhere Gas-Kosten und komplexere Koordination.
</details>

**Frage 2:** Warum ist der kombinierte Einsatz von Hardware-Wallet UND Multisig stärker als jedes einzeln?

<details>
<summary>Antwort anzeigen</summary>

Hardware-Wallet schützt gegen Remote-Signatur und Malware-Diebstahl des Private Keys. Multisig schützt gegen den Single-Point-of-Failure jeder einzelnen Signatur. Ein Angreifer müsste gleichzeitig mehrere physische Geräte kompromittieren UND mehrere Personen zur Bestätigung bringen. Die Schwierigkeit multipliziert sich, während die Kosten für den Nutzer nur additiv steigen. Deshalb ist Safe mit Hardware-Wallets als Signer das empfohlene Setup ab nennenswerten Beträgen.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 8 Slides: Titel → Hardware-Wallet-Funktion → Grenzen → 3 Modelle (Ledger/Trezor/GridPlus) → Safe-Konzept → 3 Konfigurationen → Account Abstraction ERC-4337 → Entscheidungsmatrix
- `voice_script.txt` — *Voice Narration Script* (120–140 WPM, Zielvideo 10–12 Min.)
- `visual_plan.json` — Hardware-Wallet-Isolationsdiagramm, Schutz-Grenzen-Icons, Produktfotos Ledger/Trezor/GridPlus, Safe-Interface-Screenshot, Konfigurations-Karten, Entscheidungsmatrix

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Lektion 2.6 — Dein professionelles Wallet-Setup

### Lernziele

Nach Abschluss dieser Lektion können die Lernenden:
- Ein Drei-Wallet-Modell aufbauen, das Cold-, DeFi- und Transaktions-Funktionen trennt
- Eine monatliche Sicherheits-Routine etablieren
- Einen Notfall-Plan für den Fall einer Wallet-Kompromittierung dokumentieren
- Die Kapital-Aufteilung zwischen Vault, DeFi- und Transaktions-Wallet begründet festlegen (Default 70/25/5)
- Die drei mentalen Sicherheitsregeln (Annahme der Kompromittierung, Slow is Security, keine Nachsorge) in der täglichen Praxis anwenden
- Die Verzahnung von Storage, Signatur, Approval und Multisig zu einem konsistenten Produktions-Setup integrieren

### Erklärung

Die fünf vorhergehenden Lektionen haben die technischen Bausteine erklärt. Diese abschließende Lektion bringt sie in ein praktisches Setup — das **Drei-Wallet-Modell**, das sich in der Praxis als robust erwiesen hat.

**Das Drei-Wallet-Modell**

Anstatt alle Assets in einer einzigen Wallet zu halten, trennen wir nach Funktion und Risikoprofil:

**Wallet 1: Vault (Cold Storage)**
- Funktion: Langfristige Aufbewahrung, keine aktiven DeFi-Interaktionen
- Infrastruktur: Safe 2-of-3 oder Hardware-Wallet mit Passphrase
- Inhalt: Hauptteil des Vermögens (etwa 60–80%)
- Interaktionen: Sehr selten — nur Transfers zwischen Wallets, keine Protokoll-Approvals

**Wallet 2: DeFi-Wallet (Warm Storage)**
- Funktion: Aktive DeFi-Positionen (Lending, LP, Staking)
- Infrastruktur: Hardware-Wallet (Ledger/Trezor)
- Inhalt: Arbeitsteil des Vermögens (etwa 15–35%)
- Interaktionen: Regelmäßig, mit vorher auditierten und etablierten Protokollen

**Wallet 3: Transaktions-Wallet (Hot)**
- Funktion: Experimente, neue Protokolle testen, kleine Transaktionen
- Infrastruktur: Software-Wallet (Rabby), optional mit Hardware-Wallet verbunden
- Inhalt: Kleinkapital (etwa 2–10%)
- Interaktionen: Häufig, auch mit weniger bekannten Protokollen

**Warum diese Trennung?**

Wenn die Transaktions-Wallet kompromittiert wird (falsche Signatur, Drainer, bösartiges Protokoll), ist nur der kleine Betrag darauf betroffen. Die DeFi-Wallet und insbesondere das Vault bleiben intakt. Das reduziert den maximalen Verlust pro Vorfall von "alles" auf einen begrenzten Betrag.

**Typisches Aufteilungs-Beispiel bei 100.000 USD Gesamtkapital:**
- Vault: 70.000 USD in Safe 2-of-3, konservative Assets (ETH, BTC, Stablecoins)
- DeFi-Wallet: 25.000 USD in Hardware-Wallet, etablierte Lending- und Staking-Positionen
- Transaktions-Wallet: 5.000 USD in Rabby + Hardware, für neue Protokolle und Tests

Die Zahlen sind Orientierung. Die Logik ist: je aktiver eine Wallet genutzt wird, desto weniger Kapital sollte dort liegen.

**Die monatliche Sicherheits-Routine**

Gute Wallet-Sicherheit ist kein einmaliges Setup, sondern eine Disziplin. Folgende Routine sollte monatlich durchgeführt werden:

**1. Approval-Audit (15–20 Min)**
- revoke.cash für jede aktive Wallet durchgehen
- Überflüssige Approvals widerrufen
- Besonderes Augenmerk auf Approvals mit großen Beträgen

**2. Position-Check (20–30 Min)**
- Alle aktiven DeFi-Positionen auf debank.com oder zapper.xyz prüfen
- Protokoll-Nachrichten scannen (Audit-Updates, Governance-Änderungen, Incidents)
- Positionen in nicht mehr vertrauenswürdigen Protokollen schließen

**3. Firmware- und Software-Updates (10 Min)**
- Hardware-Wallet-Firmware prüfen und aktualisieren (direkt vom Hersteller)
- Wallet-Apps (Rabby, MetaMask, Ledger Live) auf neueste Version
- Browser auf neueste Version

**4. Backup-Check (quartalsweise)**
- Seed-Phrase-Storage physisch prüfen — ist die Phrase noch lesbar?
- Metall-Backup-Zustand
- Storage-Orte nach wie vor sicher?

**5. Inheritance-Review (jährlich)**
- Anleitung für Erben noch aktuell?
- Multisig-Co-Signer noch erreichbar und handlungsfähig?

**Der Notfall-Plan**

Wenn du Verdacht hast, dass deine Wallet kompromittiert ist (ungewöhnliche Transaktion, Approval die du nicht kennst, verdächtige Tokens erscheinen):

**Sofortmaßnahmen (innerhalb von Minuten):**
1. **Neue Wallet erstellen** mit komplett neuer Seed-Phrase auf einem sauberen Gerät
2. **Alle wertvollen Assets zur neuen Wallet transferieren** — starte mit den wertvollsten/liquidesten
3. **LP-Positionen, Lending-Positionen schließen** (kann vorher nötig sein, um Assets frei zu machen)
4. **Alle Approvals der alten Wallet widerrufen** (nachdem Assets raus sind, damit der Angreifer nichts mehr hat, wovon er schöpfen könnte)

**Danach:**
5. **Ursachenanalyse** — wo kam die Kompromittierung her? Browser-Extension? Gefälschte Site? Seed-Phrase-Leak?
6. **Forensik dokumentieren** — Transaktionen, Zeitpunkte, Adressen. Ggf. für Anzeige oder Versicherung.
7. **Lehre** — was war das Versagen? Integration in dein zukünftiges Setup.

**Der wichtigste Punkt:** Handeln schneller als der Angreifer. Viele Drainer arbeiten automatisiert. Wenn du eine verdächtige Approval gemacht hast, hast du oft nur Sekunden bis wenige Minuten, um Assets zu bewegen.

**Das Sicherheits-Mindset**

Sicherheit in DeFi ist kein Produkt, sondern eine Praxis. Die besten Setups werden durch Routine wirksam, die einfachsten Setups durch Nachlässigkeit nutzlos.

Drei mentale Regeln:
1. **Annahme der Kompromittierung:** Plane für den Fall, dass dein aktives Wallet gehackt ist. Was würde maximal verloren gehen? Ist das akzeptabel?
2. **Slow ist Sicherheit:** Drainer leben von Hektik. Bei jeder ungewöhnlichen Signatur: zehn Sekunden pausieren, prüfen, dann signieren.
3. **Kein Fix im Nachhinein:** Transaktionen sind unwiderruflich. Prävention ist alles, Nachsorge ist Verlustbegrenzung.

### Folien-Zusammenfassung

**[Slide 1]** Titel: Dein professionelles Wallet-Setup

**[Slide 2]** Das Drei-Wallet-Modell: Vault (Cold), DeFi (Warm), Transaktion (Hot).

**[Slide 3]** Aufteilungs-Beispiel bei 100k USD: 70/25/5.

**[Slide 4]** Monatliche Routine: Approval-Audit, Position-Check, Updates, Backup.

**[Slide 5]** Notfall-Plan: neue Wallet, Assets transferieren, Approvals widerrufen.

**[Slide 6]** Das Sicherheits-Mindset: Annahme der Kompromittierung, Slow is Security, keine Nachsorge.

### Sprechertext

**[Slide 1]** Die letzte Lektion dieses Moduls bringt alle Bausteine in ein praktisches Setup, das Drei-Wallet-Modell.

**[Slide 2]** Drei Wallets nach Funktion getrennt. Wallet eins, das Vault: Cold Storage für den Hauptteil des Vermögens, Safe-Multisig oder Hardware mit Passphrase, sehr seltene Interaktionen. Wallet zwei, DeFi-Wallet: aktive Positionen, Hardware-Wallet, etablierte Protokolle. Wallet drei, Transaktions-Wallet: Experimente, neue Protokolle, kleines Kapital.

**[Slide 3]** Bei hunderttausend Dollar Gesamtkapital: siebzigtausend im Vault, fünfundzwanzigtausend in DeFi, fünftausend für Experimente. Die Zahlen sind Orientierung. Logik: je aktiver genutzt, desto weniger Kapital.

**[Slide 4]** Monatliche Routine. Approval-Audit auf revoke.cash. Position-Check auf DeBank oder Zapper. Firmware- und Software-Updates. Backup-Zustand quartalsweise. Inheritance-Plan jährlich. Gute Sicherheit ist Disziplin, nicht einmaliges Setup.

**[Slide 5]** Notfall-Plan bei Kompromittierungsverdacht. Neue Wallet mit neuer Seed-Phrase auf sauberem Gerät erstellen. Alle wertvollen Assets transferieren. LP- und Lending-Positionen schließen. Dann Approvals der alten Wallet widerrufen. Geschwindigkeit ist entscheidend — oft hast du nur Sekunden bis Minuten.

**[Slide 6]** Das Mindset. Annahme der Kompromittierung: plane für den Fall, dass dein aktives Wallet gehackt ist. Slow is Security: Drainer leben von Hektik, zehn Sekunden Pause bei ungewöhnlichen Signaturen. Keine Nachsorge: Transaktionen sind unwiderruflich, Prävention ist alles. Diese drei Prinzipien ersetzen keine technischen Werkzeuge — aber ohne sie sind die Werkzeuge wertlos.

### Visuelle Vorschläge

**[Slide 1]** Titelfolie.
**[Slide 2]** Drei-Kreise-Diagramm: Vault (größter Kreis, dunkel/kalt), DeFi (mittel, warm), Transaktion (klein, heiß). Pfeile für Transfers zwischen ihnen.
**[Slide 3]** Kuchendiagramm 70/25/5 mit Beispielpositionen je Wallet.
**[Slide 4]** Kalender-Icon mit Monats-Checkliste.
**[Slide 5]** Flussdiagramm: Verdacht → neue Wallet → Transfer → Revoke → Analyse.
**[Slide 6]** Drei Regeln als Textfolien mit prägnanten Icons.

### Übung

**Aufgabe: Dein persönliches Wallet-Setup dokumentieren**

Erstelle ein strukturiertes Dokument, das dein Setup definiert:

1. **Kapital-Übersicht:** Welcher Gesamtbetrag kommt in DeFi (Schätzung)?
2. **Wallet-Aufteilung:** Welche drei Wallets, jeweils mit Funktion, Infrastruktur und Kapital-Anteil?
3. **Seed-Phrase-Storage:** Für jede Wallet — wo und wie?
4. **Routine:** Monatlicher Kalender-Eintrag für Sicherheits-Check?
5. **Notfall-Plan:** Schriftlich dokumentiert, wo deponiert?
6. **Inheritance:** Wer weiß was im Notfall?

**Deliverable:** Komplettes Setup-Dokument (2–4 Seiten). Die Seed-Phrasen gehören **nicht** ins Dokument — nur Meta-Informationen über Storage-Orte.

### Quiz

**Frage 1:** Warum ist das Drei-Wallet-Modell einem Single-Wallet-Modell überlegen, selbst wenn das Single-Wallet perfekt gesichert wäre?

<details>
<summary>Antwort anzeigen</summary>

Selbst ein perfekt gesichertes Single-Wallet trägt das Risiko einer einzelnen fehlerhaften Signatur oder eines einzelnen kompromittierten Protokolls. Wenn du mit dieser Wallet ein neues Protokoll testest und eine bösartige Approval signierst, ist alles betroffen. Das Drei-Wallet-Modell isoliert experimentelle Aktivität auf eine kleine Teil-Wallet — die Transaktions-Wallet — und begrenzt damit den maximalen Verlust pro Vorfall strukturell, unabhängig von der technischen Qualität der einzelnen Wallets. Es ist Defense-in-Depth gegen die unvermeidbaren Nutzer-Fehler.
</details>

**Frage 2:** Deine Transaktions-Wallet (mit 5.000 USD) ist durch eine bösartige Approval kompromittiert. Was ist der optimale Reaktionsablauf?

<details>
<summary>Antwort anzeigen</summary>

Sofort: Transfer aller wertvollen Assets aus der Transaktions-Wallet zur DeFi-Wallet oder neuen sauberen Wallet — noch bevor der Drainer sie ziehen kann. Geschwindigkeit ist entscheidend, oft nur Sekunden bis Minuten. Danach: Approvals der Transaktions-Wallet widerrufen (nachdem Assets sicher sind). Die Transaktions-Wallet komplett aufgeben und durch eine neue Wallet mit neuer Seed-Phrase ersetzen. Ursachenanalyse — welche Signatur hat die Approval erzeugt? Welches Frontend? War die Quelle Phishing? Dokumentation für zukünftiges Setup. Die Vault- und DeFi-Wallet bleiben unberührt, weil sie separat gehalten werden — das ist der Hauptvorteil des Drei-Wallet-Modells in der Praxis.
</details>

### Video-Pipeline-Assets

Für die automatisierte Video-Produktion dieser Lektion werden folgende Assets erzeugt:

- `slides_prompt.txt` — 6 Slides: Titel → Drei-Wallet-Modell → Aufteilungs-Beispiel 70/25/5 → Monatliche Routine → Notfall-Plan → Sicherheits-Mindset
- `voice_script.txt` — *Voice Narration Script* (120–140 WPM, Zielvideo 8–10 Min.)
- `visual_plan.json` — Drei-Kreise-Diagramm Vault/DeFi/Transaktion, Kuchendiagramm 70/25/5, Kalender-Checkliste, Notfall-Flussdiagramm, Mindset-Icons

Pipeline: Gamma → ElevenLabs → CapCut.

---

## Modul-Abschluss-Quiz

Die folgenden fünf Fragen testen dein integriertes Verständnis des gesamten Moduls. Plane 15–20 Minuten.

**Frage 1:** Eine Person nutzt MetaMask auf einem Browser, hat ihre Seed-Phrase in einem verschlüsselten Passwort-Manager mit Cloud-Sync gespeichert, und gibt DeFi-Protokollen standardmäßig Unlimited Approvals. Welche drei Schwachstellen bestehen, und wie addressierst du sie?

<details>
<summary>Antwort anzeigen</summary>

Schwachstelle 1: Seed-Phrase im Cloud-Passwort-Manager — bei Kompromittierung des Manager-Kontos (Phishing, Credential-Leak, Insider) sind alle Assets verloren. Adresse: Seed-Phrase offline speichern, idealerweise auf Metall, niemals in digitaler Form mit Cloud-Bezug. Schwachstelle 2: MetaMask als Software-Wallet ohne Hardware — der Private Key lebt auf dem Computer, Malware kann ihn stehlen. Adresse: Hardware-Wallet (Ledger/Trezor) verwenden, MetaMask nur als Connector zum Hardware-Wallet. Schwachstelle 3: Unlimited Approvals standardmäßig — bei späterem Protokoll-Hack oder kompromittierter Wallet können alle Tokens abgezogen werden. Adresse: Approval-Höhe auf benötigten Betrag begrenzen und/oder monatliche Approval-Audits auf revoke.cash mit Widerruf nicht mehr benötigter Approvals.
</details>

**Frage 2:** Du erhältst eine E-Mail vom "Uniswap Support", die dich auf eine Login-Seite verlinkt. Die Seite sieht exakt wie Uniswap aus. Du willst signieren, aber dein Rabby-Wallet zeigt eine Typed-Data-Signatur mit Feldern `token: USDC`, `spender: 0xabc...def`, `amount: 115792089237316195423570985008687907853269984665640564039457584007913129639935`. Analysiere diese Situation.

<details>
<summary>Antwort anzeigen</summary>

Das ist ein klassischer Permit-Phishing-Angriff. Erkennungsmerkmale: (1) Unaufgeforderte E-Mail von einem "Support" — Uniswap hat keinen Support, der so kontaktiert. (2) Login-Seite, die angeblich eine Signatur erfordert — echte Logins in DeFi nutzen entweder keine Signatur oder eine klar identifizierte "Sign in with Ethereum"-Signatur. (3) Die Typed Data hat Token-Felder (token, spender, amount) — das ist kein Login, das ist ein Permit. (4) Der amount-Wert 2^256 - 1 ist Unlimited — maximale Berechtigung für den Spender. (5) Der Spender 0xabc...def ist vermutlich die Drainer-Adresse. Korrekter Umgang: Signatur abbrechen. Die E-Mail als Phishing melden. Die Domain der vermeintlichen Uniswap-Seite prüfen — wahrscheinlich abweichend vom echten app.uniswap.org. Rabby zeigt üblicherweise eine Warnung bei bekannten bösartigen Signaturen — aber auch ohne Warnung ist die Kombination der Merkmale ausreichend für die Ablehnung.
</details>

**Frage 3:** Erkläre, warum die Trennung in ein Drei-Wallet-Modell besser ist als ein einzelnes Hardware-Wallet mit allen Assets, selbst bei disziplinierter Nutzung.

<details>
<summary>Antwort anzeigen</summary>

Ein einzelnes Hardware-Wallet schützt den Private Key, aber schützt nicht gegen bösartige Signaturen, die der Nutzer selbst autorisiert. Beim Testen neuer Protokolle, beim Interagieren mit experimentellen DApps oder beim Einsatz neuer Strategien steigt die Wahrscheinlichkeit einer solchen fehlerhaften Signatur. Wenn alle Assets in einer Wallet sind, ist der maximale Verlust bei einer solchen Signatur das Gesamtvermögen. Beim Drei-Wallet-Modell ist experimentelle Aktivität auf die kleine Transaktions-Wallet begrenzt — ein Fehler dort kostet maximal deren Inhalt, nicht das Gesamtvermögen. Das ist strukturelle Defense-in-Depth, die unabhängig von der individuellen Disziplin wirkt. Selbst bei bestem Willen ist ein Fehler irgendwann wahrscheinlich; das Drei-Wallet-Modell stellt sicher, dass dieser Fehler nicht katastrophal ist.
</details>

**Frage 4:** Was sind die drei wichtigsten Einsatzfelder einer BIP-39-Passphrase, und in welchen Situationen sollte man auf die Nutzung verzichten?

<details>
<summary>Antwort anzeigen</summary>

Drei Einsatzfelder: (1) Schutz gegen gefundene/gestohlene Seed-Phrase — ohne Passphrase hat der Finder Zugriff, mit Passphrase nur auf Decoy-Wallet. (2) Plausible Deniability gegen physischen Zwang — das Opfer kann die Seed-Phrase herausgeben, der Angreifer sieht die Decoy, glaubt er hat alles. (3) Multi-Profile-Setup — eine Seed-Phrase kann über verschiedene Passphrasen mehrere separate Wallets verwalten (z.B. persönlich/geschäftlich). Verzicht ist angebracht: bei sehr kleinem Kapital, wo die Zusatzkomplexität das Verlustrisiko durch Passphrase-Verlust überwiegt. Bei Nutzern, die zu unerfahren sind, um die Passphrase zuverlässig zu sichern. Bei Inheritance-Situationen, in denen Erben die Passphrase finden müssten, ohne dass die Vererbung-Dokumentation sie kompromittiert. Passphrase ohne zuverlässige separate Sicherung ist schlechter als keine Passphrase, weil Verlust der Passphrase Asset-Verlust bedeutet.
</details>

**Frage 5:** Beschreibe den vollständigen Workflow eines Drainer-Angriffs von der Köder-Phase bis zur Obfuskation, inklusive aller technischen Komponenten.

<details>
<summary>Antwort anzeigen</summary>

Phase 1 — Köder: Angreifer platziert bösartigen Link (Phishing-Mail, gefälschtes Google-Ad für bekannte DApp, kompromittiertes Twitter-Profil einer Protokoll-Firma, Discord-DM als "Support"). Der Link führt zu einer gefälschten Frontend-Seite, die oft exakt wie die echte aussieht (kopiertes HTML/CSS). Phase 2 — Connection: Nutzer klickt "Connect Wallet" auf der bösartigen Seite. Wallet verbindet sich — diese Aktion allein ist harmlos. Phase 3 — Signatur-Anforderung: Seite fordert eine Signatur. Je nach Variante: klassische Approval-Transaktion (Wallet zeigt Token-Contract-Aufruf mit Drainer-Adresse als Spender), Permit-Signatur (Typed Data, kein Gas, Token-Felder), setApprovalForAll (bei NFTs, eine Signatur für ganze Collection), oder direkter Transfer (seltener, UI verdächtig). Nutzer signiert, ggf. mit Hardware-Wallet-Bestätigung ohne den Inhalt zu verstehen. Phase 4 — Exekution: Drainer-Backend erkennt die Signatur/Approval on-chain und ruft innerhalb von Sekunden bis Minuten transferFrom auf. Gestohlene Tokens gehen an Drainer-Adresse. Phase 5 — Obfuskation: Tokens werden über mehrere Hops an andere Drainer-Adressen verteilt, durch Mixer (Tornado Cash, wenn nicht sanktioniert auf der genutzten Chain) geschickt, über Bridges auf andere Chains transferiert, und schließlich an CEXs ohne KYC oder an OTC-Desks verkauft. Die Obfuskation ist oft automatisiert. Forensik kann die Flüsse teilweise zurückverfolgen, aber Recovery ist selten möglich — außer bei sehr großen Beträgen, bei denen Exchanges kooperieren oder bei staatlich koordinierten Operationen.
</details>

---

## Modul-Zusammenfassung

In Modul 2 hast du das Sicherheits-Fundament gelegt, das alle weiteren Aktivitäten in DeFi trägt:

**Kryptographische Basis:** Private Key → Public Key → Adresse, Einbahnstraße. Seed-Phrase als Master-Schlüssel, der über BIP-39/BIP-44 deterministisch alle abgeleiteten Keys generiert.

**Seed-Phrase-Storage:** Drei Bedrohungen (Diebstahl, Zerstörung, Zugangsverlust). Vier Optionen (Papier, Metall, Shamir, Passphrase). Empfehlung skaliert mit Kapitalgröße. Inheritance-Plan gehört dazu.

**Signatur-Gefahren:** Transaction, Message, Typed Data. Typed Data (Permit, Permit2) ist der gefährlichste Typ — kein Gas, unklare UI, spätere Ausnutzung. Der Bybit-Hack 2025 als Lehrbeispiel: 1,5 Mrd. USD, selbst Multisig mit Hardware-Wallets ist nicht narrensicher ohne Clear-Signing und Simulation.

**Approval-Hygiene:** Das approve/transferFrom-Pattern, Unlimited-Approval-Risiko, Drainer-Anatomie in vier Phasen. Monatlicher Audit mit revoke.cash ist nicht optional.

**Hardware-Wallets und Multisig:** Hardware-Wallet gegen Malware-Key-Diebstahl. Safe-Multisig gegen Single-Point-of-Failure einzelner Signaturen. Kombination ab niedrigen 4-stelligen Beträgen empfohlen.

**Drei-Wallet-Modell:** Vault für Cold Storage, DeFi-Wallet für aktive Positionen, Transaktions-Wallet für Experimente. Kapital-Verteilung etwa 70/25/5 als Ausgangspunkt. Isoliert experimentelle Verluste von der Substanz.

**Monatliche Routine:** Approval-Audit, Position-Check, Updates, Backup-Check. Sicherheit ist Disziplin, nicht Setup.

**Notfall-Plan:** Bei Kompromittierungsverdacht — sofort Assets zu neuer Wallet, Positionen schließen, Approvals widerrufen, dann Ursachenanalyse. Geschwindigkeit entscheidet.

**Das Sicherheits-Mindset:** Annahme der Kompromittierung, Slow is Security, keine Nachsorge möglich. Prävention ist alles.

**Was in Modul 3 kommt:** Blockchain-Mechanik. Wie Gas funktioniert (EIP-1559, Burn-Mechanismus). Was EIP-4844-Blobs für L2-Gebühren bedeuten. Der ERC-20-Token-Standard im Detail. Etherscan als Untersuchungs-Tool. Mit dem Sicherheits-Fundament aus Modul 2 kannst du ab Modul 3 selbst in kritische Protokoll-Details schauen, ohne dich zu gefährden.

---

*Ende von Modul 2.*
