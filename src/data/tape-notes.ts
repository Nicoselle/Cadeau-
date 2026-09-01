export type TapeNote = {
  id: string;
  listedAs: string;
  asOf: string;
  kind: "feit" | "niet-gezien";
  text: string;
};

export const TAPE_AS_OF = "2026-09-01";

export const TAPE_NOTES: TapeNote[] = [
  {
    id: "laes",
    listedAs: "Nasdaq:LAES",
    asOf: "2026-08-31",
    kind: "feit",
    text: "Enige nieuwe primaire IR: SEALSQ, 31 augustus, 24,5 miljoen dollar quantum (Quobly ongeveer 17,5 + EeroQ 7,0). Kader: 200 miljoen target. Geen orderboek.",
  },
  {
    id: "aem",
    listedAs: "AEM",
    asOf: "2026-08-28",
    kind: "feit",
    text: "Agnico: laatste geziene IR 28 augustus.",
  },
  {
    id: "btg",
    listedAs: "BTG",
    asOf: "2026-08-28",
    kind: "feit",
    text: "B2Gold, 28 augustus: fatality Masbate.",
  },
  {
    id: "acm",
    listedAs: "CSE:ACM",
    asOf: "2026-08-14",
    kind: "feit",
    text: "Allied: laatste geziene IR 14 augustus, Nasdaq-aanvraag. NYSE:ACM is AECOM, niet Allied.",
  },
  {
    id: "mpcc",
    listedAs: "MPCC.OL",
    asOf: "2026-08-26",
    kind: "feit",
    text: "MPC Container Ships: laatste geziene IR 26 augustus.",
  },
  {
    id: "spcx",
    listedAs: "Nasdaq:SPCX",
    asOf: "2026-08-31",
    kind: "feit",
    text: "SpaceX: geen IR 31 augustus of 1 september. CNBC SPCX-slot 143,69 (31 augustus). Geen live koers van 1 september-ochtend.",
  },
  {
    id: "qbts",
    listedAs: "Nasdaq:QBTS",
    asOf: "2026-08-25",
    kind: "feit",
    text: "D-Wave, 25 augustus: CFO-ontslag, effectief 2 september.",
  },
  {
    id: "niet-gezien",
    listedAs: "—",
    asOf: "2026-09-01",
    kind: "niet-gezien",
    text: "NioCorp, Tesla, Palantir, LWLG, GIP en Triple Flag: geen IR-body gezien. Overige (GCU, TUD, NSCI, ELC, CRYM, YCA, AYA, HL, NEM, PBR.A): geen nieuwe PR-body 31 augustus of 1 september.",
  },
];
