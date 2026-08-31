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
    label: "Liquide cash — 30 %",
    kicker: "EUR · USD · CHF · NOK",
    text: "Puur liquide. Van deze laag is 50 % euro, 40 % dollar, 5 % Zwitserse frank en 5 % Noorse kroon. De kruisen op de tape zijn thermometers, geen vervanging van het saldo.",
  },
  aandelen: {
    label: "Publieke aandelen — 20 %",
    kicker: "Namen die we volgen",
    text: "Pas wanneer edelmetaal en cash staan, komt deze laag. Hieronder de namen die we de moeite waard vinden. Dat is geen kooporder en geen weging per titel.",
  },
  crypto: {
    label: "Crypto — 10 %",
    kicker: "BTC · XMR · GRAM",
    text: "De smalste laag. Alleen Bitcoin, Monero en Gram zitten in de 10 %. Gram is Toncoin; één tape, geen twee tokens. Sky blijft op de volglijst, maar telt niet mee in de allocatie. xrm is Monero.",
  },
};

export const PYRAMID_MANIFEST = {
  lead: "De investeringspiramide is onze methode om kapitaal veilig te stellen.",
  houseRules: [
    "Als u winst neemt, verstevig dan eerst uw basis alvorens u in de hogere lagen iets onderneemt.",
    "Stap nooit in één keer in of uit een aandeel.",
    "Investeer nooit met uw laatste geld, en enkel met geld dat u bereid bent volledig te verliezen.",
    "Schakel zowel hebzucht en blind optimisme als angst en blind pessimisme uit, en blijf nuchter kijken naar de feiten.",
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
    text: "Deel van de 40 %. Geen koersdoel.",
    thesis:
      "M2 groeit +5,53% j/j terwijl de uitgelijnde reële tienjaars 2,43% is (DGS10 4,69 − T10YIE 2,26, 6 augustus). Dat is geen reden om de basis te slopen.",
    invalidation:
      "We herzien deze stand als de uitgelijnde reële tienjaars (DGS10 − T10YIE, zelfde datum) twee opeenvolgende folio’s boven 3,00% blijft, of als M2SL j/j onder 2% zakt terwijl DFF − CPIAUCSL boven +1,5 pp blijft.",
  },
  {
    id: "zilver",
    title: "Zilver",
    layer: "edelmetaal",
    status: "Aanhouden in de basis",
    since: "2026-08-31",
    text: "Naast goud in de 40 %. Geen apart koersdoel.",
    thesis:
      "Industrieel én monetair; de tape maakt dat onderscheid niet. Dezelfde drie cijfers houden de laag: liquiditeit, reële lange rente, beleidsrente.",
    invalidation:
      "Zelfde toets als goud. We splitsen de 40 % niet op één print.",
  },
  {
    id: "cash",
    title: "Liquide cash",
    layer: "cash",
    status: "30 %, verdeeld",
    since: "2026-08-31",
    text: "50 % EUR, 40 % USD, 5 % CHF, 5 % NOK. Geen yield-jacht.",
    thesis:
      "Fed funds 3,63% (14 augustus) tegen CPI +3,3% — ruwe reële korte rente ≈ +0,3 pp. De mix blijft de tweede fundering.",
    invalidation:
      "We herzien de mix als de ruwe reële korte rente in de VS (DFF − CPIAUCSL j/j) twee folio’s onder −1,0 pp blijft, of als de groep de 30 % zelf wijzigt.",
  },
  {
    id: "aandelen",
    title: "Publieke aandelen",
    layer: "aandelen",
    status: "Volgen, geen weging per titel",
    since: "2026-08-31",
    text: "De 20 % komt pas als de 70 % eronder staat.",
    thesis:
      "De namen op de tape zijn volgen, geen kooporder en geen weging per titel.",
    invalidation:
      "We herzien de 20 % als de groep de piramide zelf wijzigt. Een ticker valt af als de notering verdwijnt, niet op een dagprint.",
  },
  {
    id: "btc",
    title: "Bitcoin",
    layer: "crypto",
    status: "In de 10 %",
    since: "2026-08-31",
    text: "Deel van de cryptolaag, niet van de basis.",
    thesis:
      "Liquiditeit (M2 +5,53%) is de macro die deze laag raakt. Winst hier verstevigt eerst edelmetaal en cash.",
    invalidation:
      "We herzien de plaats in de 10 % als M2SL j/j twee folio’s negatief is én de uitgelijnde reële tienjaars boven 3,50% blijft. Geen koersdoel.",
  },
  {
    id: "xmr",
    title: "Monero",
    layer: "crypto",
    status: "In de 10 %",
    since: "2026-08-31",
    text: "Aangevraagd als xrm. De tape kent XMR.",
    thesis:
      "Zelfde laag als Bitcoin. De punt blijft de punt; XRM bestaat niet op de tape.",
    invalidation:
      "Zelfde toets als Bitcoin. We halen XMR niet uit de 10 % op één dagprint.",
  },
  {
    id: "gram",
    title: "Gram (Toncoin)",
    layer: "crypto",
    status: "In de 10 %",
    since: "2026-08-31",
    text: "Ton is Gram. Eén tape: GRAM-USD.",
    thesis:
      "Eén allocatie, ticker GRAM-USD. Niet het microtoken TON-USD. Zelfde liquiditeitsmacro als de rest van de 10 %.",
    invalidation:
      "Zelfde toets als Bitcoin. Daarnaast: als GRAM-USD de Toncoin-tape niet meer is, herschrijven we de ticker — niet de weging.",
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
    note: "CSE-notering. ACM.V is gedelisted; niet het cryptotoken ACM.",
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
