import type { Module } from "./types";

const L6 = () =>
  ["01-lektion", "02-lektion", "03-lektion", "04-lektion", "05-lektion", "06-lektion"] as const;

function lessonsForModule(n: number): string[] {
  if (n === 1) {
    return [
      "01-was-ist-defi",
      "02-lektion",
      "03-lektion",
      "04-lektion",
      "05-lektion",
      "06-lektion",
    ];
  }
  return [...L6()];
}

/** Statische Kursstruktur: 17 Module, 102 Lektionen (je 6 Lektionen pro Modul). */
export const ALL_MODULES: Module[] = [
  {
    id: "01-defi-grundlagen",
    number: 1,
    title: "DeFi Grundlagen",
    description:
      "Einführung in Kernbegriffe, Risiken und Ökosystem — ohne Marketing-Hype, mit klarer Mechanik.",
    tier: "free",
    estimatedMinutes: 90,
    lessons: [...lessonsForModule(1)],
  },
  {
    id: "02-wallets-sicherheit",
    number: 2,
    title: "Wallets & Sicherheit",
    description:
      "Schlüsselverwaltung, Hardware- vs. Software-Wallets, gängige Angriffsvektoren und pragmatische Absicherung.",
    tier: "free",
    estimatedMinutes: 120,
    lessons: [...lessonsForModule(2)],
  },
  {
    id: "03-blockchain-mechanik",
    number: 3,
    title: "Blockchain Mechanik",
    description:
      "Transaktionen, State, Finalität und Kosten — die technische Basis, auf der DeFi-Protokolle aufsetzen.",
    tier: "free",
    estimatedMinutes: 120,
    lessons: [...lessonsForModule(3)],
  },
  {
    id: "04-dex-mechanik",
    number: 4,
    title: "DEX Mechanik",
    description:
      "Orderbuch vs. AMM, Liquiditätspools, Gebühren und Preisbildung auf dezentralen Märkten.",
    tier: "pro",
    estimatedMinutes: 120,
    lessons: [...lessonsForModule(4)],
  },
  {
    id: "05-liquidity-pools",
    number: 5,
    title: "Liquidity Pools",
    description:
      "LP-Tokens, Impermanent Loss, Incentives und typische Risiken aus Sicht der Kapitalgeber.",
    tier: "pro",
    estimatedMinutes: 120,
    lessons: [...lessonsForModule(5)],
  },
  {
    id: "06-lending-markets",
    number: 6,
    title: "Lending Markets",
    description:
      "Supply, Borrow, Zinsmodelle und Interaktion mit übergreifenden Protokollgrenzen.",
    tier: "pro",
    estimatedMinutes: 120,
    lessons: [...lessonsForModule(6)],
  },
  {
    id: "07-sicherheiten-liquidationen",
    number: 7,
    title: "Sicherheiten & Liquidationen",
    description:
      "Collateral-Faktoren, Health Factor, Liquidationspfade und systemische Kopplungen.",
    tier: "pro",
    estimatedMinutes: 120,
    lessons: [...lessonsForModule(7)],
  },
  {
    id: "08-stablecoins",
    number: 8,
    title: "Stablecoins",
    description:
      "Besichert, algorithmisch, hybride Modelle — Stabilitätsmechanismen und strukturelle Risiken.",
    tier: "pro",
    estimatedMinutes: 120,
    lessons: [...lessonsForModule(8)],
  },
  {
    id: "09-yield-strategien",
    number: 9,
    title: "Yield Strategien",
    description:
      "Renditequellen, Trade-offs und warum höhere APR selten „kostenlose“ Zusatzrendite sind.",
    tier: "pro",
    estimatedMinutes: 120,
    lessons: [...lessonsForModule(9)],
  },
  {
    id: "10-leverage-loops",
    number: 10,
    title: "Leverage Loops",
    description:
      "Hebel über Lending und DEX, Reflexivität und typische Fehler bei der Risikokontrolle.",
    tier: "pro",
    estimatedMinutes: 120,
    lessons: [...lessonsForModule(10)],
  },
  {
    id: "11-mev",
    number: 11,
    title: "MEV",
    description:
      "Front-Running, Sandwiching, Builder-Märkte — wo Wert extrahiert wird und was das für Nutzer bedeutet.",
    tier: "pro",
    estimatedMinutes: 120,
    lessons: [...lessonsForModule(11)],
  },
  {
    id: "12-flash-loans",
    number: 12,
    title: "Flash Loans",
    description:
      "Atomare Kredite, arbitrage- und liquidationsgetriebene Nutzung, sicherheitsrelevante Muster.",
    tier: "pro",
    estimatedMinutes: 120,
    lessons: [...lessonsForModule(12)],
  },
  {
    id: "13-vetokenomics",
    number: 13,
    title: "veTokenomics",
    description:
      "Zeitsperren, Stimmrecht, Emissionen und Anreize — Governance-Mechanik mit zweiter Ordnung.",
    tier: "pro",
    estimatedMinutes: 120,
    lessons: [...lessonsForModule(13)],
  },
  {
    id: "14-cross-chain",
    number: 14,
    title: "Cross-Chain Infrastruktur",
    description:
      "Brücken, Messaging, Vertrauensannahmen und typische Ausfall- oder Ausnutzungsmuster.",
    tier: "pro",
    estimatedMinutes: 120,
    lessons: [...lessonsForModule(14)],
  },
  {
    id: "15-on-chain-analytics",
    number: 15,
    title: "On-Chain Analytics",
    description:
      "Metriken, Datenquellen und Grenzen — wie man Charts liest, ohne sich selbst zu täuschen.",
    tier: "pro",
    estimatedMinutes: 120,
    lessons: [...lessonsForModule(15)],
  },
  {
    id: "16-composability-risk",
    number: 16,
    title: "Composability Risk",
    description:
      "Stapelrisiken, Abhängigkeitsgraphen und wie sich Protokoll-Kombinationen verschärfen können.",
    tier: "pro",
    estimatedMinutes: 120,
    lessons: [...lessonsForModule(16)],
  },
  {
    id: "17-portfolio-future",
    number: 17,
    title: "Portfolio Konstruktion & Future of DeFi",
    description:
      "Allokation, Szenarien, RWA-Anbindung und strukturierte Einordnung langfristiger Entwicklungen.",
    tier: "pro",
    estimatedMinutes: 120,
    lessons: [...lessonsForModule(17)],
  },
];

export const TOTAL_LESSON_COUNT = ALL_MODULES.reduce(
  (n, m) => n + m.lessons.length,
  0
);
