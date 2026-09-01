/** Alleen importeren vanuit /safe (server). Niet in de open krant. */

export const SAFE_CLIENT = {
  name: "Safe Capital",
  path: "/safe",
  asOf: "2026-09-01",
  clock: "Europe/Brussels",
  disclaimer:
    "Vertrouwelijk, eigen gebruik. Indicatief, geen modelportefeuille, geen financieel advies. Geen aanbeveling om te kopen of te verkopen.",
} as const;

export type SafeTapeKind = "gezien" | "niet_gezien";

export type SafeName = {
  id: string;
  name: string;
  listedAs: string;
  note: string;
  tape: string;
  kind: SafeTapeKind;
};

export type SafeSleeveId = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export type SafeSleeve = {
  id: SafeSleeveId;
  title: string;
  range: string;
  text: string;
};

export const SAFE_NAMES: SafeName[] = [
  {
    id: "lwlg",
    name: "Lightwave Logic",
    listedAs: "LWLG",
    note: "Nasdaq.",
    tape: "Lijst niet gezien.",
    kind: "niet_gezien",
  },
  {
    id: "nb",
    name: "NioCorp",
    listedAs: "Nasdaq:NB",
    note: "Elk Creek.",
    tape: "Niet gezien.",
    kind: "niet_gezien",
  },
  {
    id: "gcu",
    name: "Gunnison Copper",
    listedAs: "TSX:GCU",
    note: "Toronto.",
    tape: "Geopende IR: geen nieuwe PR-body 31 augustus of 1 september.",
    kind: "gezien",
  },
  {
    id: "tud",
    name: "Tudor Gold",
    listedAs: "TUD.V",
    note: "Treaty Creek.",
    tape: "Geopende IR: geen nieuwe PR-body 31 augustus of 1 september.",
    kind: "gezien",
  },
  {
    id: "nsci",
    name: "Nanalysis Scientific",
    listedAs: "NSCI.V",
    note: "TSXV.",
    tape: "Geopende IR: geen nieuwe PR-body 31 augustus of 1 september.",
    kind: "gezien",
  },
  {
    id: "elc",
    name: "Elysee Development",
    listedAs: "ELC.V",
    note: "TSXV.",
    tape: "Geopende IR: geen nieuwe PR-body 31 augustus of 1 september.",
    kind: "gezien",
  },
  {
    id: "crym",
    name: "CryoMass Technologies",
    listedAs: "CRYM",
    note: "OTC.",
    tape: "Geopende IR: geen nieuwe PR-body 31 augustus of 1 september.",
    kind: "gezien",
  },
  {
    id: "gip",
    name: "Green Impact Partners",
    listedAs: "GIP.V",
    note: "TSXV.",
    tape: "Niet gezien.",
    kind: "niet_gezien",
  },
  {
    id: "tfpm",
    name: "Triple Flag Precious Metals",
    listedAs: "TFPM",
    note: "Royalty / streaming.",
    tape: "Niet gezien.",
    kind: "niet_gezien",
  },
  {
    id: "yca",
    name: "Yellow Cake",
    listedAs: "YCA.L",
    note: "Houdt cake, delft niet.",
    tape: "Geopende IR: geen nieuwe PR-body 31 augustus of 1 september.",
    kind: "gezien",
  },
  {
    id: "qbts",
    name: "D-Wave Quantum",
    listedAs: "Nasdaq:QBTS",
    note: "Quantum.",
    tape: "Laatste gezien: 25 augustus, CFO-ontslag effectief 2 september.",
    kind: "gezien",
  },
  {
    id: "pltr",
    name: "Palantir Technologies",
    listedAs: "PLTR",
    note: "Software.",
    tape: "Lijst niet gezien.",
    kind: "niet_gezien",
  },
  {
    id: "aya",
    name: "Aya Gold & Silver",
    listedAs: "AYA.TO",
    note: "Toronto.",
    tape: "Geopende IR: geen nieuwe PR-body 31 augustus of 1 september.",
    kind: "gezien",
  },
  {
    id: "hl",
    name: "Hecla Mining",
    listedAs: "HL",
    note: "Zilver en goud.",
    tape: "Geopende IR: geen nieuwe PR-body 31 augustus of 1 september.",
    kind: "gezien",
  },
  {
    id: "aem",
    name: "Agnico Eagle Mines",
    listedAs: "AEM",
    note: "Senior goud.",
    tape: "Bovenste blijft 28 augustus.",
    kind: "gezien",
  },
  {
    id: "nem",
    name: "Newmont",
    listedAs: "NEM",
    note: "Senior goud.",
    tape: "Geopende IR: geen nieuwe PR-body 31 augustus of 1 september.",
    kind: "gezien",
  },
  {
    id: "pbra",
    name: "Petrobras",
    listedAs: "PBR.A",
    note: "Preferente ADR.",
    tape: "Geopende IR: geen nieuwe PR-body 31 augustus of 1 september.",
    kind: "gezien",
  },
  {
    id: "mpcc",
    name: "MPC Container Ships",
    listedAs: "MPCC.OL",
    note: "Oslo.",
    tape: "Laatste 26 augustus.",
    kind: "gezien",
  },
  {
    id: "acm",
    name: "Allied Critical Metals",
    listedAs: "CSE:ACM",
    note: "NYSE:ACM is AECOM, niet Allied.",
    tape: "Laatste 14 augustus, Nasdaq-aanvraag.",
    kind: "gezien",
  },
  {
    id: "btg",
    name: "B2Gold",
    listedAs: "BTG",
    note: "Goudproducent.",
    tape: "28 augustus, fatality Masbate.",
    kind: "gezien",
  },
  {
    id: "tsla",
    name: "Tesla",
    listedAs: "TSLA",
    note: "IR-lijst.",
    tape: "Niet gezien.",
    kind: "niet_gezien",
  },
  {
    id: "spcx",
    name: "SpaceX",
    listedAs: "Nasdaq:SPCX",
    note: "Geen IR-body 31 augustus of 1 september.",
    tape: "CNBC-quote slot 143,69 (31 augustus). Geen live koers vanochtend.",
    kind: "gezien",
  },
  {
    id: "gram",
    name: "Gram",
    listedAs: "GRAM",
    note: "TON; tot juni 2026 Toncoin. Geen CoinGecko als live-feit.",
    tape: "Geen live-notering gezien.",
    kind: "niet_gezien",
  },
  {
    id: "sky",
    name: "Sky",
    listedAs: "SKY",
    note: "Sky Protocol, niet NYSE:SKY. Geen CoinGecko als live-feit.",
    tape: "Geen live-notering gezien.",
    kind: "niet_gezien",
  },
  {
    id: "laes",
    name: "SEALSQ",
    listedAs: "Nasdaq:LAES",
    note: "Enige nieuwe primaire IR sinds maandagochtend.",
    tape: "31 augustus: 24,5 miljoen dollar Pure-Play Quantum (Quobly ±17,5 + EeroQ 7,0). Kader 200 miljoen target allocation — geen orderboek.",
    kind: "gezien",
  },
  {
    id: "goud",
    name: "Goud spot",
    listedAs: "goud",
    note: "Kitco-bid, geen officieel slot.",
    tape: "1 september ~07:13 CEST: bid 4.429,70 / ask 4.431,70.",
    kind: "gezien",
  },
  {
    id: "zilver",
    name: "Zilver spot",
    listedAs: "zilver",
    note: "Kitco-bid, geen officieel slot.",
    tape: "1 september ~07:13 CEST: bid 66,35 / ask 66,60.",
    kind: "gezien",
  },
];

export const SAFE_SLEEVES: SafeSleeve[] = [
  {
    id: "A",
    title: "Hard assets / inflatiehedge",
    range: "20–25%",
    text: "Fysiek zilver en goud — consolideren.",
  },
  {
    id: "B",
    title: "Infrastructuur bij de AI-kraan",
    range: "15–20%",
    text: "Energie, compute, koper, uranium.",
  },
  {
    id: "C",
    title: "Fysieke uitvoering / robotica-moat",
    range: "10–15%",
    text: "Uitvoering in de fysieke wereld, geen taalmodel alleen.",
  },
  {
    id: "D",
    title: "Eigen onderneming(en)",
    range: "variabel",
    text: "Apart van de portefeuille.",
  },
  {
    id: "E",
    title: "Brede aandelenbasis (index)",
    range: "20–25%",
    text: "De indexlaag, geen weging per titel hier.",
  },
  {
    id: "F",
    title: "Cash / liquiditeit",
    range: "10–15%",
    text: "Euro, plus beperkt dollar.",
  },
  {
    id: "G",
    title: "Vermeden",
    range: "0%",
    text: "Pure taal-AI zonder fysieke of aansprakelijkheidscomponent. Hooggehefboomde derivaten.",
  },
];

