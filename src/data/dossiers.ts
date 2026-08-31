import { WATCHLIST } from "@/data/watchlist";

export type MacroDriver = {
  tileId: string;
  relation: string;
};

export type AssetNote = {
  id: string;
  what: string;
  watch: string;
  duiding: string;
};

export type Dossier = {
  slug: string;
  title: string;
  kicker: string;
  dek: string;
  assetIds: string[];
  drivers: MacroDriver[];
  channelId: string;
  body: string[];
  steenman: { objection: string; antwoord: string };
};

export type NewsChannel = {
  id: string;
  label: string;
  query: string;
  locale: { hl: string; gl: string; ceid: string };
  keywords: string[];
  dossier: string;
};

export const DOSSIERS: Dossier[] = [
  {
    slug: "edelmetalen",
    title: "Goud en zilver — de basis",
    kicker: "40 % van de piramide",
    dek: "De bodem. Wat de onderzoeksgroep aanhoudt om kapitaal te bewaren, en de macros die die laag verschuiven: reële rente, dollar, M2, inflatie.",
    assetIds: ["goud", "zilver"],
    drivers: [
      { tileId: "dgs10", relation: "Hogere nominale 10-jaars drukt vaak het metaal, tenzij inflatie meeloopt." },
      { tileId: "breakeven", relation: "Reële rente ≈ 10j minus breakeven. Stijgende reële rente is de klassieke tegenwind." },
      { tileId: "m2", relation: "Versnellende M2 is historisch een staartwind voor de bodem." },
      { tileId: "cpi-us", relation: "Gemeten inflatie versus breakeven: de kloof is een feit, de duiding niet." },
      { tileId: "dff", relation: "Beleidstarief zet de kortste kant van de curve; goud kijkt vooral naar de reële lange kant." },
    ],
    channelId: "edelmetalen",
    body: [
      "Feit: de piramide zet 40 % in edelmetalen. De tape toont COMEX-termijn, niet de kluis.",
      "Feit: op de datavloer liggen M2, CPI, Fed funds, 10-jaars en 10j-breakeven. Daaruit volgt een reële rente, geen koersdoel.",
      "Duiding: de onderzoeksgroep volgt goud en zilver als meetlat van koopkracht, niet als trade van de week.",
    ],
    steenman: {
      objection: "Termijnprint is geen fysiek metaal; ETF-stromen en futures kunnen de thermometer vervuilen.",
      antwoord: "Juist daarom staat in de noot: de basis is fysiek. De tape is om te zien of de wereld het metaal herprijst.",
    },
  },
  {
    slug: "cash",
    title: "Liquide cash — de tweede fundering",
    kicker: "30 % · EUR 50 / USD 40 / CHF 5 / NOK 5",
    dek: "Zuiver liquide. Geen jacht op rendement. De wisselkoersen zeggen wat het kasgeld waard is in een andere eenheid — niet of wij die laag mogen verlaten.",
    assetIds: ["eur", "usd", "chf", "nok"],
    drivers: [
      { tileId: "dff", relation: "Renteverschil VS–eurozone beweegt EUR/USD, dus de weging binnen de kaslaag." },
      { tileId: "hicp-ez", relation: "Eurozone-inflatie stuurt de verwachting over de ECB en daarmee de eurohelft." },
      { tileId: "cpi-us", relation: "Amerikaanse prijsindex stuurt de dollarhelft en de index." },
      { tileId: "dgs10", relation: "Renteverschil op de 10-jaars weegt op de dollar versus euro, frank en kroon." },
      { tileId: "brent", relation: "De Noorse kroon ademt met de olieprijs; vijf procent van de kaslaag." },
    ],
    channelId: "cash",
    body: [
      "Feit: 30 % van de piramide is cash, waarvan 50 % euro, 40 % dollar, 5 % frank, 5 % kroon.",
      "Feit: EUR/USD, USD/CHF, EUR/NOK en de dollarindex staan op de publieke tape als thermometer.",
      "Duiding: NOK in de cashlaag past bij MPCC in Oslo; dat is geen order om meer Noorse aandelen te kopen.",
    ],
    steenman: {
      objection: "Cash in vier munten is al een wisselkoersweddenschap.",
      antwoord: "De mix is bewust klein in CHF en NOK. Het is spreiding van koopkracht, geen carry-trade.",
    },
  },
  {
    slug: "goudproducenten",
    title: "Goud- en zilverproducenten",
    kicker: "Laag 20 % · metaal plus operationeel risico",
    dek: "Wie het metaal wint of er een royalty op int. Ze bewegen met de bodem, maar met kosten, politiek en verdunning erbij.",
    assetIds: ["aem", "nem", "btg", "hl", "aya", "tfpm", "tud"],
    drivers: [
      { tileId: "dgs10", relation: "Reële rente via 10j en breakeven: zelfde wind als het metaal, plus operationele hefboom." },
      { tileId: "breakeven", relation: "Inflatieverwachting tilt de goudprint; producenten tillen harder, omlaag en omhoog." },
      { tileId: "vix", relation: "Risico-off slaat juniors en mid-tiers eerst, seniors later." },
      { tileId: "spx", relation: "Brede risk-on kan miners meetrekken, ook als het metaal stilstaat — dat is ruis." },
    ],
    channelId: "goudproducenten",
    body: [
      "Feit: AEM, NEM en BTG zijn producenten. HL en AYA.TO zijn zwaarder zilver. TFPM int royalty/streaming. TUD.V is exploratie, Treaty Creek.",
      "Duiding: een miner is geen goudbaar. AISC, reservecijfers, hedging en politiek in het gastland horen in het dossier, niet in de tape.",
    ],
    steenman: {
      objection: "Als de 40 % al metaal is, zijn miners dubbel tellen.",
      antwoord: "Miners zitten in de 20 %, niet in de bodem. Extra aandacht is hefboomonderzoek, geen tweede basis.",
    },
  },
  {
    slug: "kritieke-grondstoffen",
    title: "Kritieke grondstoffen",
    kicker: "Koper, niobium, uraniumcake, CSE",
    dek: "Wat niet goud is, maar wel de fysieke wereld: koper (GCU), niobium (NB), uraniumoxide (YCA), kritische metalen (ACM).",
    assetIds: ["gcu", "nb", "yca", "acm"],
    drivers: [
      { tileId: "koper", relation: "IMF-wereldprijs, dollar per ton. Gunnison beweegt met deze prijs, niet met de goudmacro." },
      { tileId: "uranium", relation: "IMF-wereldprijs, dollar per pond U3O8. Yellow Cake houdt de cake, delft niet." },
      { tileId: "spx", relation: "Industriële metalen ademen met cyclus en vraag uit China, niet alleen met de S&P — de index is een ruwe maat." },
      { tileId: "m2", relation: "Ruime geldgroei tilt vaak de hele grondstoffenkant; niobium blijft een smalle notering." },
      { tileId: "vix", relation: "Dunne CSE- en TSX-namen gapen harder als de VIX opspringt." },
    ],
    channelId: "kritieke-grondstoffen",
    body: [
      "Feit: YCA.L houdt U3O8, delft niet. GCU staat in Toronto (niet GCU.V op Yahoo). NB is Elk Creek. ACM is CSE, niet het gedeliste ACM.V.",
      "Feit: koper en uranium liggen nu op de vloer. Koper is een maandreeks van het IMF, dollar per ton. Uranium eveneens maandelijks, dollar per pond. Niobium heeft nog geen eigen reeks.",
      "Duiding: de cake- en koperprijs zijn thermometers, geen kooporder. Kernbeleid en netcongestie blijven koppen, geen CSV.",
    ],
    steenman: {
      objection: "Een maandreeks van het IMF is geen LME-slot en geen U3O8-spot van een makelaar.",
      antwoord: "Juist daarom staat de etikettering erbij. Het is een wereldprijs met bon, geen loket. Wie een andere conventie wil, legt een tweede reeks naast deze.",
    },
  },
  {
    slug: "kasstroom",
    title: "Kasstroom uit de echte wereld",
    kicker: "Olie, containers, energie-infrastructuur",
    dek: "PBR.A, MPCC.OL, GIP.V. Hier telt het vat, de box en de installatie — en het cijfer dat die stromen prijst.",
    assetIds: ["pbra", "mpcc", "gip"],
    drivers: [
      { tileId: "brent", relation: "Brent is de thermometer van het vat. Petrobras ademt daarmee; WTI staat ernaast in de vloer." },
      { tileId: "dgs10", relation: "Discontovoet op lange kasstromen. Hogere 10-jaars raakt de waardering, niet per se de tanker." },
      { tileId: "cpi-us", relation: "Olie zit in de Amerikaanse prijsindex; de keten loopt naar Petrobras, niet omgekeerd." },
      { tileId: "m2", relation: "Wereldhandel en vracht lopen met geldgroei en vraag, niet lineair." },
    ],
    channelId: "kasstroom",
    body: [
      "Feit: PBR-A is de preferente ADR. MPCC noteert in Oslo — vandaar de kroon in de kaslaag. GIP.V is TSXV, energie- en waterinfrastructuur.",
      "Feit: Brent en WTI liggen op de vloer als dagreeks (EIA via FRED). Vrachttarieven nog niet. Braziliaanse politiek blijft een kop, geen reeks.",
      "Duiding: het vat is geen order. Een stijging van Brent kan teniet door Brasília. Koppen alleen als zij Petrobras, MPCC of GIP raken.",
    ],
    steenman: {
      objection: "Zonder vrachtreeks blijft de containervaart een knipsel.",
      antwoord: "Juist. Het vat heeft nu een bon; de box nog niet. Daarom blijft MPCC gekoppeld aan naam en vrachtkop, niet aan een verzonnen index.",
    },
  },
  {
    slug: "technologie",
    title: "Technologie in de 20 %",
    kicker: "Software, quantum, fotonica, NMR",
    dek: "PLTR, QBTS, LWLG, NSCI.V. Verhaal plus liquiditeit. Macro: rente, Nasdaq-proxy (S&P/VIX), M2.",
    assetIds: ["pltr", "qbts", "lwlg", "nsci"],
    drivers: [
      { tileId: "dgs10", relation: "Duration: langlopende groeiverhalen dalen als de 10-jaars stijgt." },
      { tileId: "spx", relation: "Risicobereidheid. Geen Nasdaq-reeks in de vloer; S&P is de beschikbare proxy." },
      { tileId: "vix", relation: "Hoge VIX slaat thematische small/midcaps eerst." },
      { tileId: "m2", relation: "Ruime M2 is historisch een staartwind voor duration-assets." },
    ],
    channelId: "technologie",
    body: [
      "Feit: geen van deze vier zit in de bodem of in de 10 % crypto. Ze delen de 20 % met miners en kasstroom.",
      "Duiding: een contract, een chip of een polymere modulator is geen macroreeks. We volgen Fed, curve en risk-off omdat die de multiple zetten.",
    ],
    steenman: {
      objection: "Dit is te ver van edelmetaal om in dezelfde krant te horen.",
      antwoord: "De piramide laat ze pas toe boven de fundamenten. Het dossier zegt niet dat ze de basis mogen vervangen.",
    },
  },
  {
    slug: "kleine-namen",
    title: "Kleine, dunne tapes",
    kicker: "ELC.V · CRYM",
    dek: "Namen die we volgen omdat ze kantelen, niet omdat ze de piramide dragen. Extra aandacht is hier een waarschuwing.",
    assetIds: ["elc", "crym"],
    drivers: [
      { tileId: "vix", relation: "Dunne OTC/TSXV-tapes verdwijnen het eerst bij risk-off." },
    ],
    channelId: "kleine-namen",
    body: [
      "Feit: CRYM is OTC en extreem dun. ELC.V is een kleine resource-holding.",
      "Duiding: hier zegt de print het minst over morgen. Geen allocatie, alleen volgen.",
    ],
    steenman: {
      objection: "Waarom staan ze dan op de lijst?",
      antwoord: "Omdat de groep ze gevraagd heeft te volgen. Volgen is geen weging.",
    },
  },
  {
    slug: "crypto",
    title: "Crypto — de 10 %",
    kicker: "BTC · XMR · GRAM · Sky volgt",
    dek: "Alleen Bitcoin, Monero en Gram zitten in de allocatie. Gram is Toncoin. Liquiditeit, dollar en risk-on/off zijn de macros. Sky blijft op de band.",
    assetIds: ["btc", "xmr", "gram", "sky"],
    drivers: [
      { tileId: "m2", relation: "Versnellende dollarliquiditeit is de klassieke staartwind voor BTC." },
      { tileId: "dff", relation: "Ruimer beleid tilt risk-assets; krapper beleid doet het omgekeerde." },
      { tileId: "dgs10", relation: "Stijgende reële rente concurreert met assets zonder kasstroom." },
      { tileId: "vix", relation: "Risk-off raakt crypto harder dan de bodem." },
      { tileId: "spx", relation: "Correlatie met risk-on is een feit van de laatste cycli, geen wet." },
    ],
    channelId: "crypto",
    body: [
      "Feit: 10 % van de piramide. xrm is XMR. Ton is Gram (GRAM-USD), niet het microtoken TON-USD.",
      "Feit: Sky staat op volgen, niet in de 10 %.",
      "Duiding: winst in deze laag verstevigt eerst edelmetaal en cash. De punt blijft de punt.",
    ],
    steenman: {
      objection: "Crypto in een piramide die kapitaal wil veiligstellen is een contradictie.",
      antwoord: "Daarom is het de smalste laag, en daarom staat de huisregel erboven: eerst de basis.",
    },
  },
];

export const ASSET_NOTES: AssetNote[] = [
  {
    id: "goud",
    what: "Monetair metaal. COMEX-termijn als thermometer van de 40 %-laag.",
    watch: "Reële 10-jaars, DXY/EURUSD, ETF-stromen, centralebankaankopen, M2-versnelling.",
    duiding: "Stijgende reële rente is tegenwind; versnellende M2 en een zwakkere dollar zijn staartwind. Geen koersdoel.",
  },
  {
    id: "zilver",
    what: "Monetair én industrieel. Dezelfde bodem als goud, met extra cyclus.",
    watch: "Goud/zilver-ratio, industriële vraag (solar, elektrificatie), dezelfde rente- en dollarmacro als goud.",
    duiding: "Zilver overdrijft goud in beide richtingen. De tape maakt het onderscheid niet; het dossier wel.",
  },
  {
    id: "eur",
    what: "Helft van de cashlaag (15 % van het geheel). Thermometer: EUR/USD.",
    watch: "ECB versus Fed, HICP, Duitse industriële data, EUR/USD-kruis.",
    duiding: "Een duurdere euro is geen winst op de piramide, alleen een herijking van de cashmix.",
  },
  {
    id: "usd",
    what: "40 % van de cashlaag. Thermometer: dollarindex.",
    watch: "Fed funds, 10-jaars, CPI VS, debt-to-the-penny, DXY.",
    duiding: "Sterke dollar drukt goud, miners, emergers (PBR) en vaak crypto. Daarom staat USD in de fundering, niet in de punt.",
  },
  {
    id: "chf",
    what: "5 % van de cashlaag. Thermometer: USD/CHF.",
    watch: "SNB, Europese risk-off, renteverschil VS–Zwitserland.",
    duiding: "Kleine gewicht. Bedoeld als koopkrachtanker, geen franco-weddenschap.",
  },
  {
    id: "nok",
    what: "5 % van de cashlaag. Thermometer: EUR/NOK. Past bij Oslo (MPCC).",
    watch: "Olie, Norges Bank, EUR/NOK, Noorse vrachtnamen.",
    duiding: "De kroon ademt met olie. Dat is een feit; de 5 % blijft 5 % tot de groep de mix herziet.",
  },
  {
    id: "aem",
    what: "Senior goudproducent, NYSE. Lage politieke-risicokaart versus peers in frontierjurisdicties.",
    watch: "AISC, productiegids, goudprint, CAD, Canadese en Finse operaties, reële rente.",
    duiding: "Beweegt met goud, maar met operationele hefboom. Geen vervanging van de 40 %.",
  },
  {
    id: "nem",
    what: "Grootste beursgenoteerde goudproducent. NYSE.",
    watch: "Integratie van overnames, AISC, goudprint, USD, politiek in gastlanden.",
    duiding: "Schaal dempt, maar lost het metaalrisico niet op. Volgen als senior, niet als bodem.",
  },
  {
    id: "btg",
    what: "Goudproducent, NYSE American. Meer operationeel en jurisdictierisico dan AEM/NEM.",
    watch: "Mali/West-Afrika-politiek, productiestops, goudprint, USD.",
    duiding: "Hogere bèta naar het metaal én naar politiek nieuws. Macro alleen als het de productie of de goudprint raakt.",
  },
  {
    id: "hl",
    what: "Zilver- en goudproducent, NYSE. Zwaarder zilver dan de seniors.",
    watch: "Zilverprint, goud/zilver-ratio, Amerikaanse kosteninflatie, AISC.",
    duiding: "Zilverhefboom: industriële dip raakt HL harder dan AEM.",
  },
  {
    id: "aya",
    what: "Aya Gold & Silver, TSX. Zilver/goud, Marokko.",
    watch: "Zilverprint, Marokkaanse politiek en vergunningen, CAD, productierampen.",
    duiding: "Jurisdictie is het extra macrokanaal dat de vloer niet heeft. Koppen alleen als ze AYA of zilver raken.",
  },
  {
    id: "tfpm",
    what: "Royalty/streaming op edelmetaal. Geen eigen groeve.",
    watch: "Goud- en zilverprint, dealflow, tegenpartijrisico van de operators.",
    duiding: "Minder operationeel, meer financieel. Nog steeds geen bodem.",
  },
  {
    id: "tud",
    what: "Tudor Gold, TSXV. Exploratie Treaty Creek, Golden Triangle.",
    watch: "Boorresultaten, goudprint, CAD, Canadese junior-liquiditeit, VIX.",
    duiding: "Geen kasstroom. Dit is onderzoek naar een deposit, geen producer.",
  },
  {
    id: "gcu",
    what: "Gunnison Copper, TSX. Koper in Arizona. Yahoo GCU.V is een ander instrument.",
    watch: "Koperprijs, Amerikaanse industriële vraag, vergunningen Arizona, CAD.",
    duiding: "Koper is elektrificatie en de cyclus in China, niet de goudmacro. De thermometer is de IMF-reeks, dollar per ton.",
  },
  {
    id: "nb",
    what: "NioCorp, Nasdaq. Elk Creek: niobium, scandium, titanium.",
    watch: "Financiering, vergunning, staal/legeringsvraag, USD-liquiditeit, VIX.",
    duiding: "Pre-cashflow. Macro is hier vooral of de markt duration en juniors verdraagt.",
  },
  {
    id: "acm",
    what: "Allied Critical Metals, CSE. ACM.V is gedelisted.",
    watch: "CSE-liquiditeit, projectnieuws, VIX, CAD.",
    duiding: "Dunne tape. Koppen alleen met de bedrijfsnaam of de CSE-ticker.",
  },
  {
    id: "yca",
    what: "Yellow Cake, LSE. Houdt U3O8. Print in pence.",
    watch: "U3O8-spot, contracten met Kazatomprom/Cameco-keten, kernbeleid VK/EU/VS, GBP.",
    duiding: "Geen mijn. De thermometer is de IMF-reeks uranium, dollar per pond. Kernbeleid blijft een kop, geen CSV.",
  },
  {
    id: "pbra",
    what: "Petrobras preferente ADR (PBR-A). Olie + Braziliaanse staat.",
    watch: "Brent, dieselcrack, BRL, Braziliaanse politiek/dividendbeleid, VS-rente.",
    duiding: "Twee krachten: het vat (Brent op de vloer) en Brasília. Een oliestijging kan teniet door politiek. Koppen alleen als zij Petrobras of Brent-beleid raken.",
  },
  {
    id: "mpcc",
    what: "MPC Container Ships, Oslo. Spot/korte containervaart.",
    watch: "Vrachttarieven, vlootaanbod, Rode Zee/kanalen, NOK, wereldhandel, M2.",
    duiding: "NOK in de cashlaag is de munthegge, geen extra aandeel. Freight-koppen alleen als ze containers of MPCC noemen.",
  },
  {
    id: "gip",
    what: "Green Impact Partners, TSXV. Energie- en waterinfrastructuur.",
    watch: "Canadese energiebeleid, projectfinanciering, CAD, rente (disconto).",
    duiding: "Geen etiketmachine. Volgen op kasstroom en vergunning, niet op het woord groen.",
  },
  {
    id: "pltr",
    what: "Palantir, Nasdaq. Software, overheids- en bedrijfskontracten.",
    watch: "10-jaars, overheidsbudget VS, risk-on (S&P/VIX), M2, contractnieuws.",
    duiding: "Duration-asset. Stijgende 10-jaars is de macrokop die we wél binnenlaten, naast bedrijfsnieuws.",
  },
  {
    id: "qbts",
    what: "D-Wave Quantum, NYSE. Quantumcomputing, hoge bèta.",
    watch: "Thematische liquiditeit, VIX, 10-jaars, contract-/technieknieuws.",
    duiding: "Verhaal plus multiple. Macro is of de markt duration verdraagt.",
  },
  {
    id: "lwlg",
    what: "Lightwave Logic, Nasdaq. Elektro-optische polymeren.",
    watch: "Datacenter/optica-cyclus, Nasdaq-proxy, financiering, VIX.",
    duiding: "Pre-winst, thematisch. Geen bodem.",
  },
  {
    id: "nsci",
    what: "Nanalysis Scientific, TSXV. Draagbare NMR.",
    watch: "Instrumentatievraag, CAD, Canadese small-cap liquiditeit.",
    duiding: "Laboratoriumapparatuur, geen metaal. Volgen op orderboek, niet op goud.",
  },
  {
    id: "elc",
    what: "Elysee Development, TSXV. Kleine resource-holding.",
    watch: "Portefeuillenieuws, CAD, junior-liquiditeit.",
    duiding: "Geen allocatie. Dunne tape.",
  },
  {
    id: "crym",
    what: "CryoMass, OTC. Extreem dun.",
    watch: "OTC-prints, financiering. VIX als risk-off-signaal.",
    duiding: "De print zegt hier het minst. Extra aandacht = waarschuwing.",
  },
  {
    id: "btc",
    what: "Bitcoin. Enige large-cap in de 10 %.",
    watch: "M2, DXY, Fed, ETF-stromen, S&P/VIX-correlatie, halving-cyclus als context geen wet.",
    duiding: "Liquiditeitsasset. Winst hier gaat eerst naar de basis.",
  },
  {
    id: "xmr",
    what: "Monero. Aangevraagd als xrm. Privacy-token in de 10 %.",
    watch: "BTC-bèta, beursdelistings, regelgeving privacy, liquiditeit.",
    duiding: "Beweegt met BTC, plus een eigen regelgevingskanaal. Dat kanaal heeft geen CSV.",
  },
  {
    id: "gram",
    what: "Gram. Toncoin onder de oude naam. Yahoo GRAM-USD (prev. Toncoin).",
    watch: "Telegram-ecosysteem, BTC-bèta, liquiditeit. Zelfde asset als TON in de piramidetekst.",
    duiding: "In de 10 %. Ton is Gram. Niet TON-USD (ander token).",
  },
  {
    id: "sky",
    what: "Sky USD (Yahoo 33038). Volgen, niet in de 10 %. Niet Champion Homes.",
    watch: "Eigen tape, BTC-bèta. Alleen koppen die dit token raken.",
    duiding: "Geen allocatie tot de groep het in de 10 % zet.",
  },
];

export const NEWS_CHANNELS: NewsChannel[] = [
  {
    id: "edelmetalen",
    label: "Goud en zilver",
    query: "goudprijs OR zilverprijs OR \"gold price\" OR \"real yields\" OR \"TIPS yield\"",
    locale: { hl: "nl", gl: "BE", ceid: "BE:nl" },
    keywords: ["goud", "zilver", "gold", "silver", "tips", "reële", "real yield"],
    dossier: "edelmetalen",
  },
  {
    id: "cash",
    label: "Dollar, euro, frank, kroon",
    query: "EURUSD OR dollarindex OR DXY OR \"Zwitserse frank\" OR \"Noorse kroon\" OR ECB OR Federal Reserve",
    locale: { hl: "nl", gl: "BE", ceid: "BE:nl" },
    keywords: ["euro", "dollar", "dxy", "ecb", "federal reserve", "frank", "kroon", "norges", "snb"],
    dossier: "cash",
  },
  {
    id: "goudproducenten",
    label: "Goudmijners",
    query: "Agnico OR Newmont OR B2Gold OR \"Hecla Mining\" OR \"Aya Gold\" OR \"Triple Flag\" OR \"Tudor Gold\"",
    locale: { hl: "en", gl: "US", ceid: "US:en" },
    keywords: ["agnico", "newmont", "b2gold", "hecla", "aya", "triple flag", "tudor"],
    dossier: "goudproducenten",
  },
  {
    id: "kritieke-grondstoffen",
    label: "Koper, uranium, niobium",
    query: "\"Yellow Cake\" uranium OR \"U3O8\" OR \"Gunnison Copper\" OR NioCorp OR \"Allied Critical Metals\"",
    locale: { hl: "en", gl: "US", ceid: "US:en" },
    keywords: ["yellow cake", "uranium", "u3o8", "gunnison", "niocorp", "allied critical", "copper", "koper"],
    dossier: "kritieke-grondstoffen",
  },
  {
    id: "kasstroom",
    label: "Olie en containers",
    query: "Petrobras OR \"MPC Container\" OR \"container rates\" OR Brent OR \"Green Impact Partners\"",
    locale: { hl: "en", gl: "US", ceid: "US:en" },
    keywords: ["petrobras", "pbr", "container", "freight", "brent", "green impact", "mpcc"],
    dossier: "kasstroom",
  },
  {
    id: "technologie",
    label: "Tech in de 20 %",
    query: "Palantir OR \"D-Wave\" QBTS OR \"Lightwave Logic\" OR Nanalysis",
    locale: { hl: "en", gl: "US", ceid: "US:en" },
    keywords: ["palantir", "d-wave", "qbts", "lightwave", "nanalysis"],
    dossier: "technologie",
  },
  {
    id: "kleine-namen",
    label: "ELC en CRYM",
    query: "\"Elysee Development\" OR CryoMass OR Cryomass",
    locale: { hl: "en", gl: "US", ceid: "US:en" },
    keywords: ["elysee", "cryomass", "cryo"],
    dossier: "kleine-namen",
  },
  {
    id: "crypto",
    label: "BTC, XMR, GRAM",
    query: "Bitcoin OR Monero OR Gram OR Toncoin M2 OR ETF",
    locale: { hl: "en", gl: "US", ceid: "US:en" },
    keywords: ["bitcoin", "btc", "monero", "xmr", "toncoin", "ton", "gram"],
    dossier: "crypto",
  },
];

export function getDossier(slug: string): Dossier | undefined {
  return DOSSIERS.find((item) => item.slug === slug);
}

export function dossierForAsset(assetId: string): Dossier | undefined {
  return DOSSIERS.find((item) => item.assetIds.includes(assetId));
}

export function noteForAsset(assetId: string): AssetNote | undefined {
  return ASSET_NOTES.find((item) => item.id === assetId);
}

export function assetsInDossier(dossier: Dossier) {
  return dossier.assetIds
    .map((id) => WATCHLIST.find((item) => item.id === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
}

export function channelById(id: string): NewsChannel | undefined {
  return NEWS_CHANNELS.find((item) => item.id === id);
}
