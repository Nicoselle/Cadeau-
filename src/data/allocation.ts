export const ALLOCATION_SLEEVES = ["A", "B", "C", "D", "E", "F", "G"] as const;

export type AllocationSleeveId = (typeof ALLOCATION_SLEEVES)[number];

export type AllocationSleeve = {
  id: AllocationSleeveId;
  label: string;
  band: string;
  text: string;
};

export const ALLOCATION: AllocationSleeve[] = [
  {
    id: "A",
    label: "Hard assets",
    band: "20–25%",
    text: "Fysieke en monetaire hard assets. Indicatieve band, geen kooporder.",
  },
  {
    id: "B",
    label: "Infrastructuur AI-kraan",
    band: "15–20%",
    text: "De kraan onder rekenkracht: net, koeling, connectie, toelevering. Geen modelportefeuille.",
  },
  {
    id: "C",
    label: "Robotica-moat",
    band: "10–15%",
    text: "Robotica met een verdedigbare groef. Volgen is geen weging per titel.",
  },
  {
    id: "D",
    label: "Eigen onderneming",
    band: "variabel, apart",
    text: "Zit buiten de overige banden. Wordt niet met de volglijst verrekend.",
  },
  {
    id: "E",
    label: "Index",
    band: "20–25%",
    text: "Brede indexblootstelling. Geen vervanging van A–C.",
  },
  {
    id: "F",
    label: "Cash",
    band: "10–15%",
    text: "Liquide rest. Geen jacht op rendement in deze band.",
  },
  {
    id: "G",
    label: "Vermeden",
    band: "0%",
    text: "Wat bewust niet wordt aangehouden. Blijft leeg tot de eigenaar hem vult.",
  },
];

export const ALLOCATION_MANIFEST = {
  title: "Allocatie A–G",
  lead: "Indicatieve weging uit het eigen investeringsmemo. Vertrouwelijk, eigen gebruik.",
  doctrine: "Otium-doctrine. Niet de 40/30/20/10-piramide.",
  disclaimer:
    "Geen financieel advies. Geen erkende beleggingsrelatie. Geen aanbeveling om te kopen of te verkopen. Elk individu blijft verantwoordelijk voor eigen beslissingen.",
} as const;
