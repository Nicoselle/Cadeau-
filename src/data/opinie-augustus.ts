import type { Article, ArticleImage } from "@/types/newspaper";
import { snapshotOn, printById, type DaySnapshot } from "@/lib/as-of";

const IMAGES: ArticleImage[] = [
  {
    src: "/images/thermometer.webp",
    alt: "Een oude kwikthermometer ligt op een stapel koerslijsten.",
    caption: "De thermometer meet. Hij beveelt niets.",
  },
  {
    src: "/images/markten-vloer.webp",
    alt: "Een houten vloer met krijtstrepen en losse munten.",
    caption: "De vloer is het rekenblad, geen ticker.",
  },
  {
    src: "/images/vat-liegt-minder-dan-de-index.webp",
    alt: "Oliekannetje, koperen pijp en een verfrommeld blad met indexcijfers.",
    caption: "Stof naast stemming.",
  },
  {
    src: "/images/lange-rente.webp",
    alt: "Een lange liniaal over een renteblad.",
    caption: "Alleen dezelfde datum telt als reële rente.",
  },
  {
    src: "/images/kraan-weer-open.webp",
    alt: "Een messing kraan boven een stenen bak.",
    caption: "De kraan is een reeks, geen kop.",
  },
];

type Spec = {
  date: string;
  title: string;
  dek: string;
  grafieken: string[];
  objection: string;
  antwoord: string;
};

const SPECS: Spec[] = [
  {
    date: "2026-08-03",
    title: "De maand opent met een beleefde index",
    dek: "Maandag. De S&P staat op {spx}. Het vat op {brent}. Wie alleen het eerste leest, begint de maand al met een leugen van schaal.",
    grafieken: [
      "De eerste week van augustus begint niet met een onthulling. Zij begint met een gewoonte: {spx} als synoniem van «de markt». Op dezelfde dag sluit Brent op {brent}. De tienjaars staat op {dgs10}. De uitgelijnde reële tienjaars is {real10y}, berekend op {real10yDate}. M2 blijft de juniwaarneming: {m2}. Geen van die cijfers is vanmiddag verzonnen.",
      "Een beleefde index is gevaarlijk omdat hij volledig is. Hij heeft decimalen. Hij heeft een datum. Hij ontbreekt aan lading. Het vat heeft die lading wél, en zwijgt in de koppen die alleen de S&P herhalen.",
      "Wij schrijven de opening op, niet omdat 3 augustus een breekpunt is, maar omdat een maand zonder begin later een mythe wordt. Dit is de vloer van de maandag. Meer niet.",
    ],
    objection: "Een maandagcijfer is ruis. Wacht tot vrijdag.",
    antwoord: "Ruis die je niet opschrijft, wordt later een gevoel. De datum staat erbij. Vrijdag mag ons corrigeren.",
  },
  {
    date: "2026-08-04",
    title: "De index springt, het vat zakt",
    dek: "Dinsdag: S&P naar {spx}, Brent naar {brent}. Wie die twee optelt, kan niet rekenen.",
    grafieken: [
      "Gisteren was de S&P 7.600,50 en het vat 88,90 dollar. Vandaag is de index {spx} en Brent {brent}. Dat is geen gemeenschappelijke beweging. Dat is een ontkoppeling van één etmaal.",
      "De tienjaars zakt naar {dgs10}. De uitgelijnde reële rente is {real10y}. De VIX {vix}. Wie «risk-on» roept omdat de index stijgt, moet het vat uitleggen. Wie «olie zwak» roept, moet de index uitleggen. Wij roepen niets. Wij leggen ze naast elkaar.",
      "Een krant die alleen de winnaar van de dag herhaalt, kiest een kamp. Deze krant kiest de tafel.",
    ],
    objection: "Eén dag ontkoppeling is geen verhaal.",
    antwoord: "Het is een feit. Het verhaal begint pas als wij het feit wegwuiven.",
  },
  {
    date: "2026-08-05",
    title: "Stilte is ook een cijfer",
    dek: "Woensdag beweegt bijna niets. Dat is geen reden om te zwijgen. Dat is een reden om de vloer te herhalen.",
    grafieken: [
      "Brent {brent}, S&P {spx}, tienjaars {dgs10}, reële tienjaars {real10y}. De VIX {vix}. Wie een opiniestuk eist dat elke dag een omwenteling belooft, vraagt om een verzinsel.",
      "De vroegere weekbladadem kende de stille pagina. Zij was geen leegte. Zij was de weigering om van een tiende punt een drama te maken.",
      "M2 blijft juni: {m2}. Fed funds {dff}, laatste breekpunt 14 juli tot nader order. Stilte in de beleidsrente is geen nieuws dat verdwijnt omdat het saai is.",
    ],
    objection: "Dan kun je die dag beter overslaan.",
    antwoord: "Overslaan is een keuze die later onzichtbaar wordt. Daarom staat woensdag in het ledger.",
  },
  {
    date: "2026-08-06",
    title: "Tweeënveertig honderdsten, dezelfde dag",
    dek: "De uitgelijnde reële tienjaars is {real10y} op {real10yDate}. Dat is het cijfer van editie 2 — hier al zichtbaar, zonder nieuwe M2.",
    grafieken: [
      "DGS10 {dgs10}, breakeven op dezelfde datum. Reële tienjaars {real10y}. Brent is {brent}. De S&P {spx}. Wie 4,69 min een latere breakeven rekent, trekt twee dagen van elkaar af. Dat doen wij niet.",
      "Dit is het peil dat later in het voorpaginastuk van 31 augustus terugkomt. Het stond hier al, op 6 augustus, met bon. Terugwerkende kracht is geen herschrijven. Het is laten zien dat het cijfer niet uit de lucht viel.",
      "Het vat op bijna negentig dollar naast een reële rente van {real10y} is geen kooporder. Het is de opportuniteitskost van de basis, en de factuur van de energie, op één dag.",
    ],
    objection: "Dan verklapt u editie 2.",
    antwoord: "Editie 2 verklapt de vloer. De vloer was er eerst.",
  },
  {
    date: "2026-08-07",
    title: "De vrijdag die niets bewees",
    dek: "S&P {spx}, vat {brent}, tienjaars {dgs10}. Een week is geen vonnis.",
    grafieken: [
      "De eerste week sluit met een index die hoger staat dan maandag en een vat dat lager staat dan maandag. {spx} tegenover 7.600,50. {brent} tegenover 88,90. Bewijzen doet dat niets, behalve dat de twee thermometers niet dezelfde koorts meten.",
      "Reële tienjaars {real10y}. VIX {vix}. Wie het weekend ingaat met één getal in het hoofd, heeft de week verspild.",
      "Wij bewaren de vrijdag omdat de mythe van «de week» later een richting verzint die er op 7 augustus niet was.",
    ],
    objection: "Een weekoverzicht hoort in een tabel, niet in een mening.",
    antwoord: "De tabel staat in het ledger. De mening is dat de week geen kampioen had.",
  },
  {
    date: "2026-08-10",
    title: "Tweeënnegentig dollar is geen tik",
    dek: "Brent {brent}. Gisteren vrijdag 87,62. Dat is geen afronding. Dat is een andere factuur.",
    grafieken: [
      "Het vat springt naar {brent}. De S&P blijft in de buurt van {spx}. De tienjaars {dgs10}, reële rente {real10y}. Wie deze maandag «rustig» noemt omdat de index niet schreeuwt, leest de verkeerde regel.",
      "Olie van 87 naar 92 in één handelssprong is het soort beweging die een index later pas in de winstverwachting van anderen opneemt. De lading is er eerst.",
      "Wij schrijven het op de dag zelf. Niet volgende week, als 92 alweer «normaal» heet.",
    ],
    objection: "EIA-reeksen herzien. 92 kan morgen 90 zijn.",
    antwoord: "Dan staat de herziening in de reeks. Vandaag staat 92,74 in de vloer, datum 10 augustus.",
  },
  {
    date: "2026-08-11",
    title: "Drieënnegentig, en de index kijkt weg",
    dek: "Brent {brent}. S&P {spx}. De factuur stijgt. De stemming daalt een fractie.",
    grafieken: [
      "Het vat zet door naar {brent}. De S&P {spx}. Dat is geen drama in de index, en wél een andere wereldprijs voor een vat ruwe.",
      "Tienjaars {dgs10}, reële {real10y}, VIX {vix}. De Noorse kroon in de cashlaag ademt met dit vat. Petrobras ook — en Brasília. Dat is een feit van de volglijst, geen order.",
      "Wie 93 dollar «ingeprisd» noemt, heeft een model. Wij hebben een reeks.",
    ],
    objection: "Zonder crack spread is het vat een half verhaal.",
    antwoord: "Een half verhaal met bon is beter dan een heel verhaal zonder. De crack staat niet in de vloer. Het vat wel.",
  },
  {
    date: "2026-08-12",
    title: "De VIX zakt, de factuur blijft",
    dek: "VIX {vix}. Brent {brent}. Kalmte in de opties is geen korting op het vat.",
    grafieken: [
      "De impliciete volatiliteit zakt naar {vix}. Het vat blijft boven de tweeënnegentig: {brent}. De S&P {spx}. Wie kalmte in de VIX vertaalt als «alles goedkoop», leest een verzekeringsprijs als een kassabon.",
      "Reële tienjaars {real10y}. M2 nog altijd juni: {m2}. Geen nieuwe kraan. Geen nieuwe prijsindex.",
      "De vroegere Knack had een hekel aan het woord rust als het een slordigheid verborg. Vandaag is de slordigheid: het vat vergeten omdat de VIX daalt.",
    ],
    objection: "De VIX meet geen olie.",
    antwoord: "Precies. Daarom mogen zij niet elkaars plaats innemen.",
  },
  {
    date: "2026-08-13",
    title: "Een record dat het vat niet nodig had",
    dek: "S&P {spx}. Brent {brent}. De index viert. De factuur blijft hoog.",
    grafieken: [
      "De S&P zet {spx}. Dat is het hoogste slot in onze augustusreeks tot hier. Brent {brent} — geen instorting, geen feest. Tienjaars {dgs10}, reële {real10y}.",
      "Een record naast een vat van tweeënnegentig dollar is geen bewijs dat de wereld goedkoop is. Het is bewijs dat de stemming een eigen ladder heeft.",
      "Wij noteren het record omdat het later als sfeer zal worden herinnerd. De sfeer is {spx}. De factuur is {brent}.",
    ],
    objection: "Records zijn nieuws. Olie die niet beweegt is geen nieuws.",
    antwoord: "Niet bewegen terwijl de index een record zet, is het nieuws.",
  },
  {
    date: "2026-08-14",
    title: "De Fed funds staan stil. Dat is het bericht.",
    dek: "Nieuw breekpunt: {dff} op 14 augustus. Zelfde peil. Geen verlaging. Geen verhoging.",
    grafieken: [
      "Het breekpuntenbestand krijgt een nieuwe regel: {dff} op 14 augustus. Dat is geen beleidswending. Het is de bevestiging dat de effectieve rente blijft waar zij sinds juni al rondhing.",
      "Brent {brent}, S&P {spx}, VIX {vix}, tienjaars {dgs10}, reële {real10y}. De cashlaag van dertig procent heeft geen nieuw argument gekregen om tot looptijd te vluchten.",
      "Stilstand in de beleidsrente naast een vat boven de tweeënnegentig is een zin. Geen koopzin. Een zin.",
    ],
    objection: "Een ongewijzigde DFF is geen opiniestuk waard.",
    antwoord: "Ongewijzigd terwijl het vat hoog blijft, is precies wat later «wij wisten het» wordt. Nu staat het er.",
  },
  {
    date: "2026-08-17",
    title: "De maandag na het record",
    dek: "S&P terug naar {spx}. Vat {brent}. Het feest van donderdag heeft geen vervolgplicht.",
    grafieken: [
      "Na 7.798,99 op 13 augustus staat de S&P {spx}. Brent {brent}. Tienjaars {dgs10}, reële rente {real10y} — de hoogste uitgelijnde reële rente van deze week tot hier.",
      "Dit is de dag van editie 1 plus één, in de kalender. De vloer van 17 augustus is de vloer waarop het eerste nummer sloot voor rente en index, niet voor het vat. Het vat stond toen al boven de tweeënnegentig. Wie dat later «onbekend» noemt, heeft de reeks niet gelezen.",
      "Wij kijken niet vooruit naar 31 augustus. Wij kijken naar 17 augustus. Dat is de enige eerlijke terugwerkende kracht.",
    ],
    objection: "U gebruikt kennis van editie 2.",
    antwoord: "De zin over 31 augustus is een waarschuwing, geen cijfer. De cijfers hier zijn van 17 augustus.",
  },
  {
    date: "2026-08-18",
    title: "Vijfennegentig dollar, en de index struikelt",
    dek: "Brent {brent}. S&P {spx}. VIX {vix}. De factuur piekt in de week; de stemming niet.",
    grafieken: [
      "Het vat zet {brent}. Dat is de hoogste slotnotering van de week tot vanavond. De S&P zakt naar {spx}. De VIX {vix}. Wie nog beweert dat «de markt» één getal is, moet deze dinsdag uitleggen.",
      "Tienjaars {dgs10}, reële {real10y}. Editie 1 verscheen vandaag. Zij had het vat nog niet op de vloer. Dat gat is nu zichtbaar: 95,29 dollar bestond, en stond niet in het nummer.",
      "Terugwerkende kracht is hier geen opsmuk. Het is de correctie van een blinde vlek, met bon.",
    ],
    objection: "Dan was editie 1 onaf.",
    antwoord: "Editie 1 was af op de reeksen die zij had. Het vat ontbrak. Daarom ligt het er nu, ook op 18 augustus.",
  },
  {
    date: "2026-08-19",
    title: "De reële rente geeft een duimbreed",
    dek: "Uitgelijnd {real10y} op {real10yDate}. Brent {brent}. De basis krijgt lucht. Het vat niet veel.",
    grafieken: [
      "De tienjaars zakt naar {dgs10}. De uitgelijnde reële rente naar {real10y} — het laagste peil van augustus tot hier. Brent {brent}, terug van 95,29. S&P {spx}.",
      "Wie goud alleen als tegenwicht van de reële rente leest, ziet vandaag een iets vriendelijker cijfer. Wie het vat leest, ziet nog altijd meer dan negentig dollar. Beide zinnen zijn waar. Geen van beide is een order.",
      "2,35 procent is geen nieuwe wet. Het is een woensdag.",
    ],
    objection: "2,35 of 2,43 is ruis.",
    antwoord: "Dan moet u de herzieningsregel van de standen lezen. Onder de drie blijft de 40 procent staan. De ruis wordt bijgehouden, niet weggestopt.",
  },
  {
    date: "2026-08-20",
    title: "De index hoest, het vat niet",
    dek: "S&P {spx}. VIX {vix}. Brent {brent}. Risk-off zonder oliekorting.",
    grafieken: [
      "De S&P zakt naar {spx}. De VIX springt naar {vix} — de hoogste van de maand tot hier. Brent {brent}, opnieuw omhoog. Dat is de klassieke ontkenning van het sprookje dat olie en aandelen altijd samen ademen.",
      "Tienjaars {dgs10}, reële {real10y}. Fed funds {dff}. Geen beleidsverandering. Wel een andere prijs voor angst in de opties, en een andere prijs voor het vat.",
      "Wie deze donderdag «de markt is zwak» noemt, moet zeggen welke.",
    ],
    objection: "Eén VIX-dag is geen regime.",
    antwoord: "Wij roepen geen regime uit. Wij weigeren de dag te wissen.",
  },
  {
    date: "2026-08-21",
    title: "Zesennegentig: de piek van de factuur",
    dek: "Brent {brent}. Dat is de hoogste dag in onze augustusreeks. De S&P {spx}.",
    grafieken: [
      "Het vat sluit op {brent}. Tienjaars {dgs10} — de hoogste nominale 10-jaars van de week. Reële rente {real10y}. S&P {spx}. Wie 96,92 later afdoet als een uitschieter, moet eerst toegeven dat de uitschieter in de vloer staat.",
      "Een piek is geen voorspelling van de volgende piek. Het is een maximum tot de volgende waarneming. Vandaag is die waarneming 96,92.",
      "De punt van de piramide houdt van verhalen. De basis houdt van facturen. Deze vrijdag is een factuur.",
    ],
    objection: "Na 96 komt altijd 90. Dat weet iedereen.",
    antwoord: "Iedereen die dat «weet» zonder datum, handelt in geheugen. Wij handelen in de reeks.",
  },
  {
    date: "2026-08-24",
    title: "Wie 96 zag, moet 92 ook zien",
    dek: "Brent terug naar {brent}. S&P {spx}. De piek van vrijdag is geen vloer.",
    grafieken: [
      "Het vat zakt naar {brent}. Dat is vier dollar onder vrijdag. De S&P {spx}. VIX {vix}. Tienjaars {dgs10}, reële {real10y}.",
      "Een mening die 96,92 vierde en 92,71 verzwijgt, is een folder. De vroegere Knack had folders niet nodig. Zij had een geheugen van vijf dagen.",
      "M2 is nog altijd juni. Morgen, als de kalender klopt, komt de H.6. Wij grijpen daar niet op vooruit. Wij schrijven 24 augustus.",
    ],
    objection: "U hint al naar de H.6.",
    antwoord: "De kalender stond sinds juli. Een datum noemen is geen cijfer verzinnen. Het julicijfer staat hier niet.",
  },
  {
    date: "2026-08-25",
    title: "De H.6 is er. Het vat ook.",
    dek: "Juli-M2 {m2}. Brent {brent}. Twee nieuwe zinnen op één dag, uit twee reeksen.",
    grafieken: [
      "De H.6 van 25 augustus zet juli in de vintage: {m2}, waarneming 2026-07-01. Dat is lager dan de junikop van 5,5 procent in de editievloer. FRED herzag juni zelf; die revisie staat in de vintage, niet stilletjes in editie 1. Brent sluit {brent} — de terugval van 96,92 naar 88,24 in vier handelssessies.",
      "Tienjaars {dgs10}, reële rente {real10y}. S&P {spx}. Wie alleen «M2 blijft ruim» leest, mist de herziening. Wie alleen «olie crasht» leest, mist dat 88 nog altijd boven eind augustus 2025 ligt.",
      "Twee thermometers, één dag. Geen van beide is een order. Beide hebben een bon van 25 augustus.",
    ],
    objection: "Juni herschrijven is een stille revisie.",
    antwoord: "Juni in de editievloer blijft 23.155,2 en +5,53. De vintage van 31 augustus staat ernaast. Dat is het tegenovergestelde van stil.",
  },
  {
    date: "2026-08-26",
    title: "Juli is geen juni",
    dek: "De kraan van juli is {m2}. Wie 5,53 blijft roepen, leest een oude maand.",
    grafieken: [
      "Een dag na de H.6 is het verleidelijk om het oude etiket te plakken. Het nieuwe etiket is {m2}. Brent blijft de slot van gisteren, {brent}, want 26 augustus heeft in de oliereeks nog geen nieuwere rij. S&P {spx}. Tienjaars {dgs10}, reële {real10y}.",
      "5,4 is geen 5,5. Het verschil is klein en het is niet niets. Wie decimalen wegcijfert zodra zij ongelegen komen, houdt een prediking over, geen vloer.",
      "NSA ernaast, in dezelfde vintage. Als die twee uiteen gaan lopen, is dát het stuk. Vandaag lopen zij mee.",
    ],
    objection: "0,1 punt is geen opiniestuk.",
    antwoord: "0,1 punt plus een herziene juni plus een vat dat 8 dollar zakte: dat is wel een dag.",
  },
  {
    date: "2026-08-27",
    title: "Het vat houdt 88, de index krabbelt",
    dek: "S&P {spx}. Brent nog altijd {brent}. Twee dagen zonder nieuwe olierij is geen bewijs van rust.",
    grafieken: [
      "De S&P zet {spx}. Brent heeft geen jongere waarneming dan 25 augustus: {brent}. Tienjaars {dgs10}, reële {real10y}. VIX {vix}.",
      "Een index die opveert terwijl het vat stilstaat in de reeks, is een bekend schouwspel. Het bewijst niet dat de factuur betaald is. Het bewijst dat de stemming een eigen kalender heeft.",
      "M2 juli {m2}. De kraan is open, iets minder wijd in de kop dan juni in de editie. De basis blijft de basis tot de herzieningsregel anders zegt.",
    ],
    objection: "Geen nieuwe olierij betekent dat u oude olie verkoopt.",
    antwoord: "De datum staat erbij: 25 augustus. Wie 27 augustus als 88,24 verkoopt zonder datum, liegt. Met datum is het een laatste slot.",
  },
  {
    date: "2026-08-28",
    title: "De vrijdag sluit met een onafgewerkt vat",
    dek: "S&P {spx}. Brent laatst {brent} (25 augustus). Het weekend krijgt geen nieuwe EIA-rij in onze vloer.",
    grafieken: [
      "De maand eindigt bijna. De S&P sluit de vrijdag op {spx}. Het vat blijft de 25ste. Tienjaars tot 27 augustus: {dgs10}, reële {real10y}. M2 juli {m2}.",
      "Een onafgewerkte reeks is geen schande. Het is de normale toestand van een krant die weigert het weekend te verzinnen. Maandag 31 augustus krijgt de mening die de index terugzet naast het vat, het koper en het uranium — met de cijfers die dan bekend zijn.",
      "Tot die tijd is 28 augustus dit: een index zonder verse lading, en een lading zonder vers slot. Beide zinnen zijn waar.",
    ],
    objection: "Dan is dit stuk een aankondiging van 31 augustus.",
    antwoord: "De aankondiging noemt geen cijfer van 31 augustus. Die dag heeft haar eigen stuk, met haar eigen bon.",
  },
];

function fill(template: string, snap: DaySnapshot): string {
  const map: Record<string, string> = {
    real10y: snap.real10y?.display ?? "—",
    real10yDate: snap.real10y?.date ?? "—",
  };
  for (const print of snap.prints) {
    map[print.id] = print.display;
  }
  return template.replace(/\{(\w+)\}/g, (_, key: string) => map[key] ?? `{${key}}`);
}

function sourcesFor(snap: DaySnapshot) {
  const seen = new Set<string>();
  const out: Article["sources"] = [];
  for (const print of snap.prints) {
    if (seen.has(print.seriesFile)) continue;
    seen.add(print.seriesFile);
    out.push({
      label: print.seriesFile,
      retrieved: "2026-08-31",
      vintage: `${print.id} ${print.date}`,
    });
  }
  return out;
}

function figuresFor(snap: DaySnapshot): Article["figures"] {
  const wanted = ["m2", "dgs10", "brent", "spx"];
  const extra = snap.real10y
    ? [
        {
          label: "Reële 10j, uitgelijnd",
          value: snap.real10y.display,
          source: `DGS10 − T10YIE, ${snap.real10y.date}`,
          kind: "feit" as const,
        },
      ]
    : [];
  return [
    ...wanted
      .map((id) => printById(snap, id))
      .filter((item): item is NonNullable<typeof item> => Boolean(item))
      .map((item) => ({
        label: item.label,
        value: item.display,
        source: `${item.seriesFile}, ${item.date}`,
        kind: "feit" as const,
      })),
    ...extra,
  ];
}

export function buildAugustOpinion(spec: Spec): Article {
  const snap = snapshotOn(spec.date);
  const image = IMAGES[Number(spec.date.slice(-2)) % IMAGES.length]!;
  return {
    slug: `mening-${spec.date}`,
    kicker: "De mening",
    title: fill(spec.title, snap),
    dek: fill(spec.dek, snap),
    desk: "opinie",
    edition: spec.date < "2026-08-18" ? 1 : 2,
    published: spec.date,
    author: "De mening",
    lead: false,
    readingMinutes: 5,
    image,
    body: [
      ...spec.grafieken.map((text, index) => ({
        type: "p" as const,
        text: fill(text, snap),
        kind: index === spec.grafieken.length - 1 ? ("duiding" as const) : undefined,
      })),
      {
        type: "table" as const,
        caption: `Peil ${spec.date}. Laatste waarneming ≤ die dag. M2-vintage: ${snap.m2Vintage}.`,
        headers: ["Grootheid", "Waarde", "Waarneming", "Bestand"],
        rows: snap.prints.map((print) => [
          print.label,
          print.display,
          print.date,
          print.seriesFile,
        ]),
      },
    ],
    steenman: {
      objection: spec.objection,
      antwoord: spec.antwoord,
    },
    sources: sourcesFor(snap),
    figures: figuresFor(snap),
  };
}

export const AUGUST_OPINIONS: Article[] = SPECS.map(buildAugustOpinion);

export const AUGUST_OPINION_DATES = SPECS.map((spec) => spec.date);
