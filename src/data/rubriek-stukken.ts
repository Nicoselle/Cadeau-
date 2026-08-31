import type { Article } from "@/types/newspaper";

/** Nieuwe rubrieken van nummer 2. Cijfers uit dezelfde vloer als de peilregel. */
export const RUBRIEK_STUKKEN: Article[] = [
  {
    slug: "juni-blijft-de-editievloer",
    kicker: "Geld · M2",
    title: "Juni blijft de editievloer",
    dek: "De H.6 van 25 augustus herziet juni tot 23.115,2 en zet juli erbij. Die vintage overschrijft de editie niet. Juni blijft 23.155,2 en +5,53 procent.",
    desk: "geld",
    edition: 2,
    published: "2026-08-31",
    author: "Redactie Kapitaalkrant",
    lead: false,
    readingMinutes: 4,
    image: {
      src: "/images/m2-twee-keer.webp",
      alt: "Twee koperen weegschalen in een telkamer, dezelfde stapel munten twee keer gewogen.",
      caption: "Editievloer naast vintage. De revisie wist de eerste weging niet uit.",
    },
    body: [
      {
        type: "p",
        text: "Nummer 1 en nummer 2 rekenen met dezelfde M2-reeks: juni 23.155,2, +5,53 procent jaar-op-jaar seizoensgecorrigeerd, +5,55 ongecorrigeerd. De H.6 van 25 augustus herziet juni tot 23.115,2 en voegt juli toe: 23.218,0, +5,41 procent SA. Die vintage hoort in de dagelijkse mening vanaf 25 augustus. Zij overschrijft de editie niet.",
      },
      {
        type: "table",
        caption: "Twee bestanden, twee juni’s. Geen stille revisie.",
        headers: ["Reeks", "Juni", "Juli", "j/j SA"],
        rows: [
          ["Editievloer M2SL", "23.155,2", "—", "+5,53%"],
          ["Vintage 31 augustus", "23.115,2", "23.218,0", "+5,41%"],
        ],
      },
      {
        type: "p",
        text: "Wie juni +5,53 voor juli verkoopt, verzint een waarneming. Wie de vintage in de editie plakt alsof juni altijd 23.115,2 was, wist een bon. Daarom twee bestanden. De rubriek Geld houdt ze uit elkaar.",
        kind: "duiding",
      },
    ],
    steenman: {
      objection:
        "De Fed zelf heeft juni herzien. De nieuwste vintage is de reeks. Een krant die de oude juni blijft zetten, doet alsof de herziening niet bestaat.",
      antwoord:
        "De herziening bestaat. Zij staat in de vintage en in de mening vanaf 25 augustus. De editie is een peilmoment, geen live-feed. Wie later wil narekenen wat nummer 1 en 2 schreven, moet dezelfde juni vinden.",
    },
    sources: [
      { label: "FRED M2SL editievloer", retrieved: "2026-08-17", vintage: "juni 2026" },
      { label: "FRED M2SL vintage 31 augustus", retrieved: "2026-08-31", vintage: "H.6 25-08-2026" },
    ],
    figures: [
      { label: "M2SL juni, editie", value: "23.155,2", source: "fred_M2SL_2019-2026.csv", kind: "feit" },
      { label: "M2SL j/j juni, editie", value: "+5,53%", source: "zelfde bestand", kind: "feit" },
      { label: "M2SL j/j juli, vintage", value: "+5,41%", source: "fred_M2SL_vintage_2026-08-31.csv", kind: "feit" },
    ],
  },
  {
    slug: "spread-is-van-veertien-augustus",
    kicker: "Rente · Peil",
    title: "De spread is van 14 augustus",
    dek: "De tienjaars sluit in de vloer op 4,67 procent, 27 augustus. De Fed funds op 3,63 procent, 14 augustus. Het verschil van die twee dagen is geen cijfer.",
    desk: "rente",
    edition: 2,
    published: "2026-08-31",
    author: "Redactie Kapitaalkrant",
    lead: false,
    readingMinutes: 4,
    image: {
      src: "/images/lange-rente.webp",
      alt: "Een locomotief weigert te keren terwijl het spoor de mist in stijgt en een seinarm omlaag wijst.",
      caption: "Twee reeksen, twee datums. Het verschil mag alleen op de dag die zij delen.",
    },
    body: [
      {
        type: "p",
        text: "Peildatum publicatie is 31 augustus 2026. Elke reeks houdt haar eigen laatste waarneming. De tienjaars (DGS10) stopt op 27 augustus: 4,67 procent. De breakeven (T10YIE) heeft 28 augustus: 2,31 procent. De Fed funds in onze breekpuntenreeks: 3,63 procent op 14 augustus.",
      },
      {
        type: "table",
        caption: "Afgeleiden alleen op de laatste gemeenschappelijke datum.",
        headers: ["Cijfer", "Datum", "Waarde"],
        rows: [
          ["VS 10-jaars (tegel)", "2026-08-27", "4,67%"],
          ["10j breakeven (tegel)", "2026-08-28", "2,31%"],
          ["Reële 10-jaars", "2026-08-27", "2,34%"],
          ["Spread 10j − Fed funds", "2026-08-14", "+1,05 pp"],
        ],
      },
      {
        type: "p",
        text: "4,67 min 3,63 is +1,04. Dat mengt 27 augustus met 14 augustus. Op 14 augustus stond de tienjaars op 4,68. 4,68 min 3,63 is +1,05. Dat is het cijfer. Nummer 2 houdt de orakelboek-spread van 6 augustus: +1,06 punt op 4,69 min 3,63. Die blijft het peil van de toets, niet deze tegel.",
        kind: "feit",
      },
    ],
    steenman: {
      objection:
        "Een punt of twee maakt voor de lezer niets uit. De laatste tienjaars minus de laatste funds is wat de markt die week voelde.",
      antwoord:
        "Dan schrijf je twee dagen van elkaar af en noemt het een peil. De vloer doet dat niet. Editie 2 toetst nog altijd 6 augustus. Deze rubriek zegt alleen wat de tegel op 31 augustus mag dragen.",
    },
    sources: [
      { label: "FRED DGS10", retrieved: "2026-08-31" },
      { label: "FRED T10YIE", retrieved: "2026-08-31" },
      { label: "FRED DFF breekpunten", retrieved: "2026-08-31" },
    ],
    figures: [
      { label: "DGS10", value: "4,67%", source: "2026-08-27", kind: "feit" },
      { label: "Spread DGS10 − DFF", value: "+1,05 pp", source: "2026-08-14", kind: "feit" },
      { label: "Reële 10j", value: "2,34%", source: "2026-08-27", kind: "feit" },
    ],
  },
  {
    slug: "vat-koper-pond",
    kicker: "Grondstoffen · Datavloer",
    title: "Het vat, het koper en het pond",
    dek: "Brent 88,24 dollar op 25 augustus. Koper 13.542,82 dollar de ton in juli. Uranium 69,23 dollar het pond. Drie reeksen, drie datums.",
    desk: "grondstoffen",
    edition: 2,
    published: "2026-08-31",
    author: "Redactie Kapitaalkrant",
    lead: false,
    readingMinutes: 4,
    image: {
      src: "/images/vat-liegt-minder-dan-de-index.webp",
      alt: "Een olievatenstapel naast een koperrol en een loodkist, in een pakhuis zonder schermen.",
      caption: "Dagreeks naast maandreeks. Het vat is geen index, het koper geen ticker.",
    },
    body: [
      {
        type: "p",
        text: "Olie is een dagreeks. Brent sluit in de vloer op 25 augustus op 88,24 dollar het vat, +30,1 procent jaar-op-jaar. WTI diezelfde dag 83,90 dollar, +30,4 procent. Koper en uranium zijn maandreeksen van het IMF via FRED. Juli: koper 13.542,82 dollar de metrische ton, +38,6 procent; uranium 69,23 dollar het pond U3O8, +17,4 procent.",
      },
      {
        type: "table",
        caption: "Laatste waarneming per reeks, peil 31 augustus 2026.",
        headers: ["Reeks", "Laatste rij", "Waarde", "j/j"],
        rows: [
          ["Brent", "2026-08-25", "88,24 $", "+30,1%"],
          ["WTI", "2026-08-25", "83,90 $", "+30,4%"],
          ["Koper", "2026-07-01", "13.542,82 $", "+38,6%"],
          ["Uranium", "2026-07-01", "69,23 $", "+17,4%"],
        ],
      },
      {
        type: "p",
        text: "De mening van 31 augustus legt het vat tegen de index. Deze rubriek doet dat niet over. Zij zet de drie reeksen naast de piramide: kasstroom (olie), industriële vraag (koper), brandstof voor stroom die de 10 procent raakt (uranium). Geen koersdoel. Yahoo is notering, geen vloer.",
        kind: "duiding",
      },
    ],
    steenman: {
      objection:
        "Een maandreeks tot juli is te oud voor een stuk van 31 augustus. De tape van vandaag weet meer.",
      antwoord:
        "De tape van vandaag is geen reeks in onze vloer. Wie juli-koper voor augustus verkoopt, verzint een rij. De datum staat bij het cijfer.",
    },
    sources: [
      { label: "FRED DCOILBRENTEU", retrieved: "2026-08-31" },
      { label: "FRED DCOILWTICO", retrieved: "2026-08-31" },
      { label: "FRED PCOPPUSDM", retrieved: "2026-08-31" },
      { label: "FRED PURANUSDM", retrieved: "2026-08-31" },
    ],
    figures: [
      { label: "Brent", value: "88,24 $", source: "2026-08-25", kind: "feit" },
      { label: "Koper", value: "13.542,82 $", source: "2026-07-01", kind: "feit" },
      { label: "Uranium", value: "69,23 $", source: "2026-07-01", kind: "feit" },
    ],
  },
  {
    slug: "namen-zonder-koersdoel",
    kicker: "Titels · Piramide",
    title: "Namen zonder koersdoel",
    dek: "Dertig namen op de volglijst, twintig daarvan aandelen. Elke naam heeft een dossier en een stand met datum. Geen «nu kopen».",
    desk: "titels",
    edition: 2,
    published: "2026-08-31",
    author: "Redactie Kapitaalkrant",
    lead: false,
    readingMinutes: 4,
    image: {
      src: "/images/orakel-zegel.webp",
      alt: "Een register met lakzegels, een horloge en een stalen pen.",
      caption: "De lijst is een register, geen orderbriefje.",
    },
    body: [
      {
        type: "p",
        text: "De piramide weegt: 40 procent edelmetalen, 30 procent liquide middelen, 20 procent beursgenoteerde aandelen, 10 procent crypto. Daaronder dertig namen die wij volgen. Twintig daarvan zijn aandelen. Bitcoin, Monero en Gram zitten in de 10 procent. Sky staat op de lijst en telt niet in de weging.",
      },
      {
        type: "p",
        text: "Een stand heeft een datum en een herzieningsregel. Goud, bijvoorbeeld: aanhouden in de basis sinds 31 augustus, herzien als de uitgelijnde reële tienjaars twee edities boven 3,00 procent blijft. Dat is geen koersdoel. De openbare notering komt van de Yahoo-tape; die is geen reeks in de datavloer.",
      },
      {
        type: "p",
        text: "Deze rubriek bestaat zodat de namen niet alleen onder Piramide hangen. Wie alleen de titels wil, komt hier. Wie de weging wil, gaat naar de piramide. Geen adviesrelatie.",
        kind: "duiding",
      },
    ],
    steenman: {
      objection:
        "Een krant die dertig tickers noemt zonder koers is een inhoudsopgave, geen journalistiek.",
      antwoord:
        "De journalistiek zit in de stand: waarom de laag blijft, en wanneer zij valt. Een koersdoel zou advies zijn. Dat doen wij niet.",
    },
    sources: [
      { label: "Volglijst en standen, src/data/watchlist.ts", retrieved: "2026-08-31" },
    ],
    figures: [
      { label: "Namen op de lijst", value: "30", source: "WATCHLIST", kind: "feit" },
      { label: "Aandelen", value: "20", source: "kind === aandeel", kind: "feit" },
    ],
  },
];
