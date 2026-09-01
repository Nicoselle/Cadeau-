export const PYRAMID_LAYERS = [
  "edelmetaal",
  "cash",
  "aandelen",
  "crypto",
] as const;

export type PyramidLayer = (typeof PYRAMID_LAYERS)[number];

export type WatchKind = "metaal" | "cash" | "crypto" | "aandeel";

export type WatchRole = "allocatie" | "volgen";

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
  role: WatchRole;
  note: string;
};

export const PYRAMID_WEIGHTS: Record<PyramidLayer, number> = {
  edelmetaal: 40,
  cash: 30,
  aandelen: 20,
  crypto: 10,
};

export const CASH_MIX = [
  { id: "eur", currency: "EUR", shareOfCash: 50 },
  { id: "usd", currency: "USD", shareOfCash: 40 },
  { id: "chf", currency: "CHF", shareOfCash: 5 },
  { id: "nok", currency: "NOK", shareOfCash: 5 },
] as const;

export const CRYPTO_ALLOCATION = ["btc", "xmr", "gram"] as const;

export const PYRAMID_COPY: Record<
  PyramidLayer,
  { label: string; kicker: string; text: string }
> = {
  edelmetaal: {
    label: "Edelmetalen — 40 %",
    kicker: "De basis",
    text: "De bodem van de piramide. Goud en zilver zijn wat SafeCapital aanhoudt om kapitaal te bewaren. Pas als deze laag stevig staat, mag er iets in de lagen daarboven.",
  },
  cash: {
    label: "Liquide middelen — 30 %",
    kicker: "EUR · USD · CHF · NOK",
    text: "Zuiver liquide. Van deze laag is 50 procent euro, 40 procent dollar, 5 procent Zwitserse frank en 5 procent Noorse kroon. De wisselkoersen zijn thermometers, geen vervanging van het saldo.",
  },
  aandelen: {
    label: "Beursgenoteerde aandelen — 20 %",
    kicker: "Namen die wij volgen",
    text: "Pas wanneer edelmetaal en kasgeld staan, komt deze laag. Hieronder de namen die wij de moeite waard vinden. Dat is geen kooporder en geen weging per titel.",
  },
  crypto: {
    label: "Crypto — 10 %",
    kicker: "BTC · XMR · GRAM",
    text: "De smalste laag. Alleen Bitcoin, Monero en Gram zitten in de 10 procent. Gram is Toncoin; één notering, geen twee munten. Sky blijft op de volglijst, maar telt niet mee in de weging. xrm is Monero.",
  },
};

export const PYRAMID_MANIFEST = {
  lead: "De investeringspiramide is onze methode om kapitaal veilig te stellen.",
  houseRules: [
    "Wie winst neemt, verstevigt eerst de basis, en onderneemt pas daarna iets in de hogere lagen.",
    "Nooit in één keer in of uit een aandeel.",
    "Nooit met het laatste geld, en alleen met geld dat u bereid bent volledig te verliezen.",
    "Noch hebzucht, noch angst mag de feiten vertroebelen.",
  ],
  disclaimer:
    "De inhoud die door SafeCapital wordt gedeeld (in edities, blogposts, lezingen, opnames, mails, of andere documenten en platforms), is uitsluitend bedoeld voor educatieve en informatieve doeleinden. Niets in de inhoud mag worden beschouwd als financieel, juridisch, of fiscaal advies, noch als een aanbeveling om bepaalde financiële instrumenten te kopen of te verkopen. SafeCapital is geen erkende beleggingsadviseur, analist, of tussenpersoon. Elk individu blijft volledig verantwoordelijk voor zijn of haar eigen investeringsbeslissingen. Beleggen brengt steeds risico’s met zich mee, waaronder mogelijk verlies van (een deel van) het kapitaal. Doe altijd uw eigen onderzoek en raadpleeg een erkend financieel adviseur voordat u handelt.",
} as const;

export type AssetStand = {
  id: string;
  title: string;
  layer: PyramidLayer;
  status: string;
  since: string;
  text: string;
  thesis: string;
  invalidation: string;
};

/** Stand van deze editie: de laag zelf, geen koersdoel. */
export const ASSET_STANDS: AssetStand[] = [
  {
    id: "goud",
    title: "Goud",
    layer: "edelmetaal",
    status: "Aanhouden in de basis",
    since: "2026-08-31",
    text: "Deel van de 40 procent. Geen koersdoel.",
    thesis:
      "M2 groeit +5,53 procent jaar-op-jaar terwijl de uitgelijnde reële tienjaars 2,43 procent is (DGS10 4,69 − T10YIE 2,26, 6 augustus). Dat is geen reden om de basis af te breken.",
    invalidation:
      "Wij herzien deze stand als de uitgelijnde reële tienjaars (DGS10 − T10YIE, zelfde datum) twee opeenvolgende edities boven 3,00 procent blijft, of als M2SL jaar-op-jaar onder 2 procent zakt terwijl DFF − CPIAUCSL boven +1,5 punt blijft.",
  },
  {
    id: "zilver",
    title: "Zilver",
    layer: "edelmetaal",
    status: "Aanhouden in de basis",
    since: "2026-08-31",
    text: "Naast goud in de 40 procent. Geen apart koersdoel.",
    thesis:
      "Industrieel én monetair; de notering maakt dat onderscheid niet. Dezelfde drie cijfers houden de laag: geldgroei, reële lange rente, beleidsrente.",
    invalidation:
      "Zelfde toets als goud. Wij splitsen de 40 procent niet op één waarneming.",
  },
  {
    id: "cash",
    title: "Liquide middelen",
    layer: "cash",
    status: "30 procent, verdeeld",
    since: "2026-08-31",
    text: "50 procent euro, 40 procent dollar, 5 procent frank, 5 procent kroon. Geen jacht op rendement.",
    thesis:
      "Fed funds 3,63 procent (14 augustus) tegen een prijsindex van +3,3 procent — ruwe reële korte rente ongeveer +0,3 punt. De menging blijft de tweede fundering.",
    invalidation:
      "Wij herzien de menging als de ruwe reële korte rente in de Verenigde Staten (DFF − CPIAUCSL jaar-op-jaar) twee edities onder −1,0 punt blijft, of als de groep de 30 procent zelf wijzigt.",
  },
  {
    id: "aandelen",
    title: "Publieke aandelen",
    layer: "aandelen",
    status: "Volgen, geen weging per titel",
    since: "2026-08-31",
    text: "De 20 procent komt pas als de 70 procent eronder staat.",
    thesis:
      "De namen op de lijst zijn volgen, geen kooporder en geen weging per titel.",
    invalidation:
      "Wij herzien de 20 procent als de groep de piramide zelf wijzigt. Een titel valt af als de beursnotering verdwijnt, niet op één dagkoers.",
  },
  {
    id: "btc",
    title: "Bitcoin",
    layer: "crypto",
    status: "In de 10 %",
    since: "2026-08-31",
    text: "Deel van de cryptolaag, niet van de basis.",
    thesis:
      "Geldgroei (M2 +5,53 procent) is het cijfer dat deze laag raakt. Winst hier verstevigt eerst edelmetaal en kasgeld.",
    invalidation:
      "Wij herzien de plaats in de 10 procent als M2SL jaar-op-jaar twee edities negatief is én de uitgelijnde reële tienjaars boven 3,50 procent blijft. Geen koersdoel.",
  },
  {
    id: "xmr",
    title: "Monero",
    layer: "crypto",
    status: "In de 10 %",
    since: "2026-08-31",
    text: "Aangevraagd als xrm. De notering kent XMR.",
    thesis:
      "Zelfde laag als Bitcoin. De punt blijft de punt; XRM bestaat niet op de koerslijst.",
    invalidation:
      "Zelfde toets als Bitcoin. Wij halen XMR niet uit de 10 procent op één dagkoers.",
  },
  {
    id: "gram",
    title: "Gram (Toncoin)",
    layer: "crypto",
    status: "In de 10 %",
    since: "2026-08-31",
    text: "Ton is Gram. Eén notering: GRAM-USD.",
    thesis:
      "Eén weging, ticker GRAM-USD. Niet het microtoken TON-USD. Zelfde geldgroei als de rest van de 10 procent.",
    invalidation:
      "Zelfde toets als Bitcoin. Daarnaast: als GRAM-USD de Toncoin-notering niet meer is, herschrijven wij de ticker — niet de weging.",
  },
];

export const WATCHLIST: WatchItem[] = [
  {
    id: "goud",
    name: "Goud",
    listedAs: "goud",
    yahoo: "GC=F",
    layer: "edelmetaal",
    kind: "metaal",
    exchange: "COMEX",
    role: "allocatie",
    note: "Termijncontract als thermometer. De basis is fysiek metaal, niet dit contract.",
  },
  {
    id: "zilver",
    name: "Zilver",
    listedAs: "zilver",
    yahoo: "SI=F",
    layer: "edelmetaal",
    kind: "metaal",
    exchange: "COMEX",
    role: "allocatie",
    note: "Termijncontract. Industrieel én monetair.",
  },
  {
    id: "eur",
    name: "Euro",
    listedAs: "EUR",
    yahoo: "EURUSD=X",
    layer: "cash",
    kind: "cash",
    exchange: "FX",
    role: "allocatie",
    note: "50 % van de cashlaag (15 % van het geheel). Print is EUR/USD.",
  },
  {
    id: "usd",
    name: "Amerikaanse dollar",
    listedAs: "USD",
    yahoo: "DX-Y.NYB",
    layer: "cash",
    kind: "cash",
    exchange: "ICE",
    role: "allocatie",
    note: "40 % van de cashlaag (12 % van het geheel). Print is de dollarindex, geen saldo.",
  },
  {
    id: "chf",
    name: "Zwitserse frank",
    listedAs: "CHF",
    yahoo: "USDCHF=X",
    layer: "cash",
    kind: "cash",
    exchange: "FX",
    role: "allocatie",
    note: "5 % van de cashlaag. Print is USD/CHF.",
  },
  {
    id: "nok",
    name: "Noorse kroon",
    listedAs: "NOK",
    yahoo: "EURNOK=X",
    layer: "cash",
    kind: "cash",
    exchange: "FX",
    role: "allocatie",
    note: "5 % van de cashlaag. Print is EUR/NOK — past bij MPCC in Oslo.",
  },
  {
    id: "aem",
    name: "Agnico Eagle Mines",
    listedAs: "AEM",
    yahoo: "AEM",
    layer: "aandelen",
    kind: "aandeel",
    exchange: "NYSE",
    role: "volgen",
    note: "Senior goudproducent.",
  },
  {
    id: "nem",
    name: "Newmont Corporation",
    listedAs: "NEM",
    yahoo: "NEM",
    layer: "aandelen",
    kind: "aandeel",
    exchange: "NYSE",
    role: "volgen",
    note: "Senior goudproducent.",
  },
  {
    id: "btg",
    name: "B2Gold",
    listedAs: "BTG",
    yahoo: "BTG",
    layer: "aandelen",
    kind: "aandeel",
    exchange: "NYSE American",
    role: "volgen",
    note: "Goudproducent.",
  },
  {
    id: "hl",
    name: "Hecla Mining",
    listedAs: "HL",
    yahoo: "HL",
    layer: "aandelen",
    kind: "aandeel",
    exchange: "NYSE",
    role: "volgen",
    note: "Zilver- en goudproducent.",
  },
  {
    id: "aya",
    name: "Aya Gold & Silver",
    listedAs: "AYA.TO",
    yahoo: "AYA.TO",
    layer: "aandelen",
    kind: "aandeel",
    exchange: "TSX",
    role: "volgen",
    note: "Zilver en goud, Toronto.",
  },
  {
    id: "tfpm",
    name: "Triple Flag Precious Metals",
    listedAs: "TFPM",
    yahoo: "TFPM",
    layer: "aandelen",
    kind: "aandeel",
    exchange: "NYSE",
    role: "volgen",
    note: "Royalty en streaming op edelmetaal, geen eigen groeve.",
  },
  {
    id: "tud",
    name: "Tudor Gold",
    listedAs: "TUD.V",
    yahoo: "TUD.V",
    layer: "aandelen",
    kind: "aandeel",
    exchange: "TSXV",
    role: "volgen",
    note: "Goud-exploratie, Treaty Creek.",
  },
  {
    id: "gcu",
    name: "Gunnison Copper",
    listedAs: "GCU",
    yahoo: "GCU.TO",
    layer: "aandelen",
    kind: "aandeel",
    exchange: "TSX",
    role: "volgen",
    note: "Toronto-notering. GCU.V op Yahoo is een ander instrument, geen koper.",
  },
  {
    id: "nb",
    name: "NioCorp Developments",
    listedAs: "NB",
    yahoo: "NB",
    layer: "aandelen",
    kind: "aandeel",
    exchange: "Nasdaq",
    role: "volgen",
    note: "Niobium, scandium, titanium — Elk Creek.",
  },
  {
    id: "acm",
    name: "Allied Critical Metals",
    listedAs: "ACM",
    yahoo: "ACM.CN",
    layer: "aandelen",
    kind: "aandeel",
    exchange: "CSE",
    role: "volgen",
    note: "CSE:ACM. NYSE:ACM is AECOM, niet Allied. ACM.V is gedelisted.",
  },
  {
    id: "yca",
    name: "Yellow Cake",
    listedAs: "YCA.L",
    yahoo: "YCA.L",
    layer: "aandelen",
    kind: "aandeel",
    exchange: "LSE",
    role: "volgen",
    note: "Houdt uraniumoxide (cake), delft zelf niet. Koers op Yahoo in pence (GBp).",
  },
  {
    id: "pbra",
    name: "Petrobras",
    listedAs: "PBR.A",
    yahoo: "PBR-A",
    layer: "aandelen",
    kind: "aandeel",
    exchange: "NYSE",
    role: "volgen",
    note: "Preferente ADR. Yahoo schrijft PBR-A, geen punt.",
  },
  {
    id: "mpcc",
    name: "MPC Container Ships",
    listedAs: "MPCC.OL",
    yahoo: "MPCC.OL",
    layer: "aandelen",
    kind: "aandeel",
    exchange: "Oslo",
    role: "volgen",
    note: "Containervaart, Oslo.",
  },
  {
    id: "gip",
    name: "Green Impact Partners",
    listedAs: "GIP.V",
    yahoo: "GIP.V",
    layer: "aandelen",
    kind: "aandeel",
    exchange: "TSXV",
    role: "volgen",
    note: "Energie- en waterinfrastructuur.",
  },
  {
    id: "pltr",
    name: "Palantir Technologies",
    listedAs: "PLTR",
    yahoo: "PLTR",
    layer: "aandelen",
    kind: "aandeel",
    exchange: "Nasdaq",
    role: "volgen",
    note: "Software.",
  },
  {
    id: "qbts",
    name: "D-Wave Quantum",
    listedAs: "QBTS",
    yahoo: "QBTS",
    layer: "aandelen",
    kind: "aandeel",
    exchange: "NYSE",
    role: "volgen",
    note: "Quantumcomputing.",
  },
  {
    id: "lwlg",
    name: "Lightwave Logic",
    listedAs: "LWLG",
    yahoo: "LWLG",
    layer: "aandelen",
    kind: "aandeel",
    exchange: "Nasdaq",
    role: "volgen",
    note: "Elektro-optische polymeren.",
  },
  {
    id: "tsla",
    name: "Tesla",
    listedAs: "TSLA",
    yahoo: "TSLA",
    layer: "aandelen",
    kind: "aandeel",
    exchange: "Nasdaq",
    role: "volgen",
    note: "Geen IR-body gezien op 31 augustus of 1 september.",
  },
  {
    id: "spcx",
    name: "SPCX",
    listedAs: "SPCX",
    yahoo: "SPCX",
    layer: "aandelen",
    kind: "aandeel",
    exchange: "Nasdaq",
    role: "volgen",
    note: "CNBC-slot 143,69 op 31 augustus. Geen live koers van 1 september-ochtend. Geen SpaceX-IR 31 augustus of 1 september.",
  },
  {
    id: "laes",
    name: "SEALSQ",
    listedAs: "LAES",
    yahoo: "LAES",
    layer: "aandelen",
    kind: "aandeel",
    exchange: "Nasdaq",
    role: "volgen",
    note: "SEALSQ. 31 augustus: 24,5 miljoen dollar quantum. Niet het orderboek.",
  },
  {
    id: "nsci",
    name: "Nanalysis Scientific",
    listedAs: "NSCI.V",
    yahoo: "NSCI.V",
    layer: "aandelen",
    kind: "aandeel",
    exchange: "TSXV",
    role: "volgen",
    note: "NMR-apparatuur, Toronto Venture.",
  },
  {
    id: "elc",
    name: "Elysee Development Corp.",
    listedAs: "ELC.V",
    yahoo: "ELC.V",
    layer: "aandelen",
    kind: "aandeel",
    exchange: "TSXV",
    role: "volgen",
    note: "Kleine resource-holding.",
  },
  {
    id: "crym",
    name: "CryoMass Technologies",
    listedAs: "CRYM",
    yahoo: "CRYM",
    layer: "aandelen",
    kind: "aandeel",
    exchange: "OTC",
    role: "volgen",
    note: "OTC, extreem dunne tape.",
  },
  {
    id: "btc",
    name: "Bitcoin",
    listedAs: "BTC",
    yahoo: "BTC-USD",
    layer: "crypto",
    kind: "crypto",
    exchange: "crypto",
    role: "allocatie",
    note: "In de 10 %. Spot tegen dollar.",
  },
  {
    id: "xmr",
    name: "Monero",
    listedAs: "xrm",
    yahoo: "XMR-USD",
    layer: "crypto",
    kind: "crypto",
    exchange: "crypto",
    role: "allocatie",
    note: "In de 10 %. Aangevraagd als xrm; de tape kent XMR.",
  },
  {
    id: "gram",
    name: "Gram (Toncoin)",
    listedAs: "GRAM",
    yahoo: "GRAM-USD",
    layer: "crypto",
    kind: "crypto",
    exchange: "crypto",
    role: "allocatie",
    note: "In de 10 %. Ton is Gram: één tape (GRAM-USD). Niet het microtoken TON-USD.",
  },
  {
    id: "sky",
    name: "Sky",
    listedAs: "SKY",
    yahoo: "SKY33038-USD",
    layer: "crypto",
    kind: "crypto",
    exchange: "crypto",
    role: "volgen",
    note: "Op de volglijst, niet in de 10 %. Yahoo «Sky USD» (id 33038), niet Champion Homes.",
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

export function allocationIds(layer: PyramidLayer): string[] {
  return watchByLayer(layer)
    .filter((item) => item.role === "allocatie")
    .map((item) => item.id);
}
