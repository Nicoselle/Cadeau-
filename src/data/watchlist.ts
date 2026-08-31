export const PYRAMID_LAYERS = [
  "bodem",
  "producent",
  "kasstroom",
  "thema",
  "punt",
] as const;

export type PyramidLayer = (typeof PYRAMID_LAYERS)[number];

export type WatchKind = "metaal" | "crypto" | "aandeel";

export type WatchItem = {
  id: string;
  name: string;
  /** Ticker zoals de lezer hem schreef. */
  listedAs: string;
  /** Yahoo Finance chart-symbool. */
  yahoo: string;
  layer: PyramidLayer;
  kind: WatchKind;
  exchange: string;
  note: string;
};

export const PYRAMID_COPY: Record<
  PyramidLayer,
  { label: string; kicker: string; text: string }
> = {
  bodem: {
    label: "Bodem — bewaren",
    kicker: "Edelmetalen",
    text: "De klassieke investeringspiramide begint onderaan: wat u kunt bewaren als de rest wankelt. Goud en zilver zijn hier de meetlat, geen koopadvies. De termijnprijs is een thermometer, geen kluis.",
  },
  producent: {
    label: "Producenten — wie wint en wie int",
    kicker: "Mijn, royalty, cake",
    text: "Daarboven wie het metaal, het erts of de cake echt wint, of er een royalty op int. Senioren, zilverhuizen, exploratie, koper, niobium, kritische metalen, uraniumcake. Extra aandacht, geen rangorde.",
  },
  kasstroom: {
    label: "Kasstroom — de echte wereld",
    kicker: "Olie, zee, energie",
    text: "Namen die hun geld niet uit een lab of een token halen, maar uit vaten, containers of energie-infrastructuur. Volgen is niet hetzelfde als aanbevelen.",
  },
  thema: {
    label: "Thema — technologie",
    kicker: "Software, quantum, fotonica",
    text: "Hier zit het verhaal, niet de bodem. Software, quantum, fotonica, laboratoriumapparatuur. De redactie volgt ze omdat ze bewegen; dat is geen modelportefeuille.",
  },
  punt: {
    label: "Punt — wat kantelt",
    kicker: "Crypto en speculatief",
    text: "De punt van de piramide is het smalst en het luidst. Crypto en de kleinste, meest kantelbare namen. Extra aandacht juist omdat een print hier het minst zegt over morgen.",
  },
};

export const WATCHLIST: WatchItem[] = [
  {
    id: "goud",
    name: "Goud",
    listedAs: "goud",
    yahoo: "GC=F",
    layer: "bodem",
    kind: "metaal",
    exchange: "COMEX",
    note: "Termijncontract als thermometer. Geen fysieke voorraad van de redactie.",
  },
  {
    id: "zilver",
    name: "Zilver",
    listedAs: "zilver",
    yahoo: "SI=F",
    layer: "bodem",
    kind: "metaal",
    exchange: "COMEX",
    note: "Termijncontract. Industrieel én monetair; de tape maakt dat onderscheid niet.",
  },
  {
    id: "aem",
    name: "Agnico Eagle Mines",
    listedAs: "AEM",
    yahoo: "AEM",
    layer: "producent",
    kind: "aandeel",
    exchange: "NYSE",
    note: "Senior goudproducent.",
  },
  {
    id: "nem",
    name: "Newmont Corporation",
    listedAs: "NEM",
    yahoo: "NEM",
    layer: "producent",
    kind: "aandeel",
    exchange: "NYSE",
    note: "Senior goudproducent.",
  },
  {
    id: "btg",
    name: "B2Gold",
    listedAs: "BTG",
    yahoo: "BTG",
    layer: "producent",
    kind: "aandeel",
    exchange: "NYSE American",
    note: "Goudproducent.",
  },
  {
    id: "hl",
    name: "Hecla Mining",
    listedAs: "HL",
    yahoo: "HL",
    layer: "producent",
    kind: "aandeel",
    exchange: "NYSE",
    note: "Zilver- en goudproducent.",
  },
  {
    id: "aya",
    name: "Aya Gold & Silver",
    listedAs: "AYA.TO",
    yahoo: "AYA.TO",
    layer: "producent",
    kind: "aandeel",
    exchange: "TSX",
    note: "Zilver en goud, Toronto.",
  },
  {
    id: "tfpm",
    name: "Triple Flag Precious Metals",
    listedAs: "TFPM",
    yahoo: "TFPM",
    layer: "producent",
    kind: "aandeel",
    exchange: "NYSE",
    note: "Royalty en streaming op edelmetaal, geen eigen groeve.",
  },
  {
    id: "tud",
    name: "Tudor Gold",
    listedAs: "TUD.V",
    yahoo: "TUD.V",
    layer: "producent",
    kind: "aandeel",
    exchange: "TSXV",
    note: "Goud-exploratie, Treaty Creek.",
  },
  {
    id: "gcu",
    name: "Gunnison Copper",
    listedAs: "GCU",
    yahoo: "GCU.TO",
    layer: "producent",
    kind: "aandeel",
    exchange: "TSX",
    note: "Toronto-notering. GCU.V op Yahoo is een ander instrument, geen koper.",
  },
  {
    id: "nb",
    name: "NioCorp Developments",
    listedAs: "NB",
    yahoo: "NB",
    layer: "producent",
    kind: "aandeel",
    exchange: "Nasdaq",
    note: "Niobium, scandium, titanium — Elk Creek.",
  },
  {
    id: "acm",
    name: "Allied Critical Metals",
    listedAs: "ACM",
    yahoo: "ACM.CN",
    layer: "producent",
    kind: "aandeel",
    exchange: "CSE",
    note: "CSE-notering. ACM.V is gedelisted; niet het cryptotoken ACM.",
  },
  {
    id: "yca",
    name: "Yellow Cake",
    listedAs: "YCA.L",
    yahoo: "YCA.L",
    layer: "producent",
    kind: "aandeel",
    exchange: "LSE",
    note: "Houdt uraniumoxide (cake), delft zelf niet. Koers op Yahoo in pence (GBp).",
  },
  {
    id: "pbra",
    name: "Petrobras",
    listedAs: "PBR.A",
    yahoo: "PBR-A",
    layer: "kasstroom",
    kind: "aandeel",
    exchange: "NYSE",
    note: "Preferente ADR. Yahoo schrijft PBR-A, geen punt.",
  },
  {
    id: "mpcc",
    name: "MPC Container Ships",
    listedAs: "MPCC.OL",
    yahoo: "MPCC.OL",
    layer: "kasstroom",
    kind: "aandeel",
    exchange: "Oslo",
    note: "Containervaart, Oslo.",
  },
  {
    id: "gip",
    name: "Green Impact Partners",
    listedAs: "GIP.V",
    yahoo: "GIP.V",
    layer: "kasstroom",
    kind: "aandeel",
    exchange: "TSXV",
    note: "Energie- en waterinfrastructuur, geen groene etiketmachine.",
  },
  {
    id: "pltr",
    name: "Palantir Technologies",
    listedAs: "PLTR",
    yahoo: "PLTR",
    layer: "thema",
    kind: "aandeel",
    exchange: "Nasdaq",
    note: "Software. Volgen is geen waarderingsvonnis.",
  },
  {
    id: "qbts",
    name: "D-Wave Quantum",
    listedAs: "QBTS",
    yahoo: "QBTS",
    layer: "thema",
    kind: "aandeel",
    exchange: "NYSE",
    note: "Quantumcomputing.",
  },
  {
    id: "lwlg",
    name: "Lightwave Logic",
    listedAs: "LWLG",
    yahoo: "LWLG",
    layer: "thema",
    kind: "aandeel",
    exchange: "Nasdaq",
    note: "Elektro-optische polymeren.",
  },
  {
    id: "nsci",
    name: "Nanalysis Scientific",
    listedAs: "NSCI.V",
    yahoo: "NSCI.V",
    layer: "thema",
    kind: "aandeel",
    exchange: "TSXV",
    note: "NMR-apparatuur, Toronto Venture.",
  },
  {
    id: "btc",
    name: "Bitcoin",
    listedAs: "BTC",
    yahoo: "BTC-USD",
    layer: "punt",
    kind: "crypto",
    exchange: "crypto",
    note: "Spot tegen dollar. Geen beursvennootschap.",
  },
  {
    id: "gram",
    name: "Gram",
    listedAs: "GRAM",
    yahoo: "GRAM-USD",
    layer: "punt",
    kind: "crypto",
    exchange: "crypto",
    note: "Yahoo: Gram (voorheen Toncoin). Controleer of dit de token is die u bedoelde.",
  },
  {
    id: "sky",
    name: "Sky",
    listedAs: "SKY",
    yahoo: "SKY33038-USD",
    layer: "punt",
    kind: "crypto",
    exchange: "crypto",
    note: "Yahoo «Sky USD» (id 33038). Niet Champion Homes (SKY) en niet Skycoin (SKY-USD).",
  },
  {
    id: "xmr",
    name: "Monero",
    listedAs: "xrm",
    yahoo: "XMR-USD",
    layer: "punt",
    kind: "crypto",
    exchange: "crypto",
    note: "Aangevraagd als xrm. XRM bestaat niet op de tape; dit is Monero (XMR).",
  },
  {
    id: "elc",
    name: "Elysee Development Corp.",
    listedAs: "ELC.V",
    yahoo: "ELC.V",
    layer: "punt",
    kind: "aandeel",
    exchange: "TSXV",
    note: "Kleine resource-holding. Punt van de piramide, geen bodem.",
  },
  {
    id: "crym",
    name: "CryoMass Technologies",
    listedAs: "CRYM",
    yahoo: "CRYM",
    layer: "punt",
    kind: "aandeel",
    exchange: "OTC",
    note: "OTC, extreem dunne tape. Extra aandacht omdat de print hier het minst zegt.",
  },
];

export const WATCH_SOURCE = {
  name: "Yahoo Finance chart (publieke tape)",
  url: "https://query1.finance.yahoo.com/v8/finance/chart/",
  method: "v8/finance/chart, range 5d, interval 1d",
  cacheSeconds: 90,
} as const;

export function watchByLayer(layer: PyramidLayer): WatchItem[] {
  return WATCHLIST.filter((item) => item.layer === layer);
}

export function watchById(id: string): WatchItem | undefined {
  return WATCHLIST.find((item) => item.id === id);
}

export function yahooSymbols(): string[] {
  return WATCHLIST.map((item) => item.yahoo);
}
