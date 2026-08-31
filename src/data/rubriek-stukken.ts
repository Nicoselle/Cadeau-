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
    readingMinutes: 8,
    image: {
      src: "/images/m2-twee-keer.webp",
      alt: "Twee koperen weegschalen in een telkamer, dezelfde stapel munten twee keer gewogen.",
      caption: "Editievloer naast vintage. De revisie wist de eerste weging niet uit.",
    },
    body: [
      {
        type: "p",
        text: "Nummer 1 en nummer 2 rekenen met dezelfde M2-reeks: juni 23.155,2, +5,53 procent jaar-op-jaar seizoensgecorrigeerd, +5,55 ongecorrigeerd. De zesmaands-groei op jaarbasis is +7,3 procent. De H.6 van 25 augustus herziet juni tot 23.115,2 en voegt juli toe: 23.218,0, +5,41 procent SA. Die vintage hoort in de dagelijkse mening vanaf 25 augustus. Zij overschrijft de editie niet.",
      },
      {
        type: "p",
        text: "Twee bestanden, twee juni’s. Wie later narekent wat deze krant op 18 en 31 augustus schreef, moet dezelfde 23.155,2 vinden. Wie de vintage in de editie plakt alsof juni altijd 23.115,2 was, wist een bon. Daarom houdt deze rubriek ze uit elkaar.",
        kind: "feit",
      },
      {
        type: "table",
        caption:
          "Twee bestanden, twee juni’s. Geen stille revisie. Bonnen: fred_M2SL_2019-2026.csv en fred_M2SL_vintage_2026-08-31.csv.",
        headers: ["Reeks", "Juni", "Juli", "j/j SA", "j/j NSA"],
        rows: [
          ["Editievloer M2SL", "23.155,2", "—", "+5,53%", "+5,55%"],
          ["Vintage 31 augustus", "23.115,2", "23.218,0", "+5,41%", "—"],
        ],
      },
      { type: "h2", text: "Wat de H.6 van 25 augustus deed" },
      {
        type: "p",
        text: "Editie 1 sloot op 18 augustus en tekende aan dat de volgende H.6 in de kalender op 25 augustus stond. Die bekendmaking is er. FRED herzag juni zelf — van 23.155,2 naar 23.115,2 — en zette juli ernaast. Het teken van juli in die vintage is +5,41 procent seizoensgecorrigeerd. Dat is lager dan de junikop van 5,5 procent in de editievloer. Het is geen reden om juni te herschrijven.",
      },
      {
        type: "p",
        text: "De dagelijkse mening vanaf 25 augustus draagt de vintage. Nummer 2, het orakelboek en de standen van de piramide blijven op de editievloer. Goud bijvoorbeeld: M2 groeit +5,53 procent jaar-op-jaar terwijl de uitgelijnde reële tienjaars 2,43 procent is. Die zin is van 6 augustus en van juni. Zij wordt niet stilletjes een zin van juli.",
        kind: "feit",
      },
      {
        type: "note",
        text: "De methodologiebreuk van 28 juli 2026 — IRA- en Keogh-saldi anders netteren — staat in het methodestuk van editie 1. Deze rubriek herhaalt die toets niet. Zij houdt twee junibestanden uit elkaar.",
      },
      { type: "h2", text: "Twee keer meten blijft de huisregel" },
      {
        type: "p",
        text: "Op 23 juni 2026 kondigde de Federal Reserve aan dat vanaf de H.6-release van 28 juli IRA- en Keogh-saldi niet meer op componentniveau maar op aggregaatniveau uit M2 worden genetteerd. Gevolg volgens de Fed: niet-gecorrigeerde M2 blijft ongewijzigd, seizoensgecorrigeerde M2 krijgt kleine revisies. Daarom ligt M2SL altijd naast M2NS. Dat stuk heet Meet de geldgroei twee keer. Het hoeft hier niet over.",
      },
      {
        type: "table",
        caption: "FRED M2SL en M2NS, editievloer, opgehaald 17 augustus 2026. Zelfde toets als in het methodestuk.",
        headers: ["Maat", "juni 2026 j/j", "december 2025 j/j"],
        rows: [
          ["M2SL (gecorrigeerd)", "+5,53%", "+4,04%"],
          ["M2NS (ongecorrigeerd)", "+5,55%", "+4,09%"],
        ],
      },
      {
        type: "p",
        text: "De versnelling van ongeveer 4 naar 5,5 procent staat in beide reeksen, ook in de reeks die de methodologiewijziging niet raakt. Het signaal van juni is geen artefact. De zesmaands-geannualiseerde 7,3 procent is alleen op gecorrigeerde data zinvol te berekenen — op NSA-data zit er seizoenspatroon in. Dat cijfer blijft dus afhankelijk van de herziene M2SL-reeks. Dat staat al in editie 1. Het blijft waar.",
        kind: "feit",
      },
      { type: "h2", text: "Wat de kraan nog altijd zegt" },
      {
        type: "p",
        text: "De Amerikaanse prijsindex staat op +3,3 procent in juli. De Fed funds op 3,63 procent, 14 augustus. Een ruwe reële korte rente van drie tienden. De kraan van editie 1 is niet dichtgedraaid: seizoensgecorrigeerd en ongecorrigeerd liggen binnen 0,1 punt van elkaar. Geldgroei die versnelt terwijl de basis 40 procent edelmetaal is, bevestigt waarom die laag eerst komt. Het maakt van Bitcoin geen fundament.",
        kind: "duiding",
      },
      {
        type: "p",
        text: "Wie juni +5,53 voor juli verkoopt, verzint een waarneming. Wie de vintage in de editie plakt alsof juni altijd 23.115,2 was, wist een bon. De rubriek Geld houdt ze uit elkaar. De volgende H.6 verlengt de vintage, niet het peil van nummer 1 en 2.",
        kind: "duiding",
      },
      {
        type: "quote",
        text: "Een revisie die de eerste weging uitwist, is geen peil. Het is een wisactie.",
      },
    ],
    steenman: {
      objection:
        "De Fed zelf heeft juni herzien. De nieuwste vintage is de reeks. Een krant die de oude juni blijft zetten, doet alsof de herziening niet bestaat. Juli +5,41 is wat de lezer nu nodig heeft, niet een cijfer van 18 augustus.",
      antwoord:
        "De herziening bestaat. Zij staat in de vintage en in de mening vanaf 25 augustus. De editie is een peilmoment, geen live-feed. Wie later wil narekenen wat nummer 1 en 2 schreven, moet dezelfde juni vinden. Juli hoort in het dagelijkse stuk, niet stilletjes in de voorpagina van 31 augustus.",
    },
    sources: [
      { label: "FRED M2SL editievloer", url: "https://fred.stlouisfed.org/series/M2SL", retrieved: "2026-08-17", vintage: "juni 2026" },
      { label: "FRED M2NS editievloer", url: "https://fred.stlouisfed.org/series/M2NS", retrieved: "2026-08-17" },
      { label: "FRED M2SL vintage 31 augustus", retrieved: "2026-08-31", vintage: "H.6 25-08-2026" },
      { label: "Federal Reserve H.6-aankondiging 23 juni 2026", url: "https://www.federalreserve.gov/feeds/h6.html", retrieved: "2026-08-17" },
    ],
    figures: [
      { label: "M2SL juni, editie", value: "23.155,2", source: "fred_M2SL_2019-2026.csv", kind: "feit" },
      { label: "M2SL j/j juni, editie", value: "+5,53%", source: "zelfde bestand", kind: "feit" },
      { label: "M2NS j/j juni, editie", value: "+5,55%", source: "fred_M2NS_2024-2026.csv", kind: "feit" },
      { label: "M2SL 6m ann., editie", value: "+7,3%", source: "fred_M2SL_2019-2026.csv", kind: "feit" },
      { label: "M2SL juni, vintage", value: "23.115,2", source: "fred_M2SL_vintage_2026-08-31.csv", kind: "feit" },
      { label: "M2SL j/j juli, vintage", value: "+5,41%", source: "zelfde vintage", kind: "feit" },
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
    readingMinutes: 8,
    image: {
      src: "/images/lange-rente.webp",
      alt: "Een locomotief weigert te keren terwijl het spoor de mist in stijgt en een seinarm omlaag wijst.",
      caption: "Twee reeksen, twee datums. Het verschil mag alleen op de dag die zij delen.",
    },
    body: [
      {
        type: "p",
        text: "Peildatum publicatie is 31 augustus 2026. Elke reeks houdt haar eigen laatste waarneming. De tienjaars (DGS10) stopt op 27 augustus: 4,67 procent. De dertigjaars (DGS30) diezelfde dag: 5,19 procent. De breakeven (T10YIE) heeft 28 augustus: 2,31 procent. De Fed funds in onze breekpuntenreeks: 3,63 procent op 14 augustus.",
      },
      {
        type: "p",
        text: "Afgeleiden — reële tienjaars, spread tegen de funds — mogen alleen op de laatste gemeenschappelijke datum. Dat is de peilregel van 31 augustus. Wie de laatste tienjaars van de laatste funds aftrekt, mengt twee dagen en noemt het een peil.",
        kind: "feit",
      },
      {
        type: "table",
        caption: "Tegels op 31 augustus 2026. Afgeleiden alleen op de laatste gemeenschappelijke datum.",
        headers: ["Cijfer", "Datum", "Waarde", "Regel"],
        rows: [
          ["VS 10-jaars (tegel)", "2026-08-27", "4,67%", "lastOnOrBefore"],
          ["VS 30-jaars (tegel)", "2026-08-27", "5,19%", "lastOnOrBefore"],
          ["10j breakeven (tegel)", "2026-08-28", "2,31%", "lastOnOrBefore"],
          ["Reële 10-jaars", "2026-08-27", "2,34%", "4,67 − 2,33"],
          ["Spread 10j − Fed funds", "2026-08-14", "+1,05 pp", "4,68 − 3,63"],
        ],
      },
      { type: "h2", text: "Waarom +1,05 en niet het verschil van twee dagen" },
      {
        type: "p",
        text: "4,67 min 3,63 is +1,04. Dat mengt 27 augustus met 14 augustus. Op 14 augustus stond de tienjaars op 4,68. 4,68 min 3,63 is +1,05. Dat is het cijfer. De tegel van de tienjaars mag 4,67 dragen. De tegel van de spread mag dat cijfer niet van 3,63 aftrekken.",
        kind: "feit",
      },
      {
        type: "p",
        text: "De dertigjaars volgt dezelfde regel. Op 14 augustus stond hij op 5,25 procent — dat cijfer stond al in editie 1. Op 27 augustus sluit hij in de vloer op 5,19. Wie 5,19 van 3,63 aftrekt, doet opnieuw twee dagen. Wij doen dat niet.",
      },
      { type: "h2", text: "De reële tienjaars van 27 augustus" },
      {
        type: "p",
        text: "De laatste breakeven in de vloer is 2,31 procent op 28 augustus. Die dag heeft geen tienjaars. Wie 4,67 minus 2,31 rekent, trekt twee verschillende datums van elkaar af. Op 27 augustus, de laatste dag die beide reeksen delen, staat de breakeven op 2,33. 4,67 min 2,33 is 2,34. Dat is de reële tienjaars van de tegel.",
        kind: "feit",
      },
      {
        type: "p",
        text: "2,34 procent reëel over tien jaar is geen straf die de goudlaag ongeldig maakt, en geen vrijbrief om kasgeld te laten vallen. Het is de opportuniteitskost van de basis op 27 augustus. De ongeldigverklaring van goud blijft twee edities boven 3,00 procent, of M2 onder 2 procent terwijl DFF minus CPI boven +1,5 punt blijft. Eén tegel van 2,34 is geen herziening.",
        kind: "duiding",
      },
      { type: "h2", text: "Editie 2 blijft 6 augustus" },
      {
        type: "p",
        text: "Nummer 2 houdt de orakelboek-spread van 6 augustus: +1,06 punt op 4,69 min 3,63. De uitgelijnde reële tienjaars van die dag is 2,43 procent — 4,69 min 2,26. Die blijven het peil van de toets. Deze rubriek zegt alleen wat de tegel op 31 augustus mag dragen.",
      },
      {
        type: "table",
        caption: "FRED DFF, DGS10, DGS30, T10YIE. Editie 2 toetst 6 augustus. De tegel volgt de peilregel.",
        headers: ["Moment", "Beleidsrente", "Tienjaars", "Dertigjaars", "Spread 10j − funds"],
        rows: [
          ["17-09-2025", "4,33%", "4,06%", "—", "−0,27 pp"],
          ["06-08-2026", "3,63%", "4,69%", "5,22%", "+1,06 pp"],
          ["14-08-2026", "3,63%", "4,68%", "5,25%", "+1,05 pp"],
          ["27-08-2026", "—", "4,67%", "5,19%", "geen gemeenschappelijke funds"],
        ],
      },
      {
        type: "p",
        text: "Sinds 17 september 2025, de vooravond van de eerste verlaging, is de beleidsrente van 4,33 naar 3,63 gegaan en de tienjaars van 4,06 naar 4,69 op 6 augustus. Die ontkoppeling stond in De lange rente wil niet mee. Twee lezingen blijven open: fiscale termijnpremie, of disinflatie. Het toetsbare verschil staat in het orakelboek als regel 7. Op 31 december 2026 kijken we of de spread groter is dan de +1,06 procentpunt van 6 augustus. Deze tegel herschrijft die inzet niet.",
        kind: "duiding",
      },
      {
        type: "quote",
        text: "Twee dagen van elkaar aftrekken is geen peil. Het is een som van twee kalenders.",
      },
    ],
    steenman: {
      objection:
        "Een punt of twee maakt voor de lezer niets uit. De laatste tienjaars minus de laatste funds is wat de markt die week voelde. 2,34 in plaats van 2,43 is ruis, geen rubriek.",
      antwoord:
        "Dan schrijf je twee dagen van elkaar af en noemt het een peil. De vloer doet dat niet. Editie 2 toetst nog altijd 6 augustus. Deze rubriek zegt alleen wat de tegel op 31 augustus mag dragen — en waarom +1,05 de enige spread is die die tegel mag zetten.",
    },
    sources: [
      { label: "FRED DGS10", url: "https://fred.stlouisfed.org/series/DGS10", retrieved: "2026-08-31" },
      { label: "FRED DGS30", url: "https://fred.stlouisfed.org/series/DGS30", retrieved: "2026-08-31" },
      { label: "FRED T10YIE", url: "https://fred.stlouisfed.org/series/T10YIE", retrieved: "2026-08-31" },
      { label: "FRED DFF breekpunten", url: "https://fred.stlouisfed.org/series/DFF", retrieved: "2026-08-31" },
    ],
    figures: [
      { label: "DGS10", value: "4,67%", source: "2026-08-27", kind: "feit" },
      { label: "DGS30", value: "5,19%", source: "2026-08-27", kind: "feit" },
      { label: "T10YIE", value: "2,31%", source: "2026-08-28", kind: "feit" },
      { label: "Reële 10j", value: "2,34%", source: "2026-08-27", kind: "feit" },
      { label: "Spread DGS10 − DFF", value: "+1,05 pp", source: "2026-08-14", kind: "feit" },
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
    readingMinutes: 8,
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
        type: "p",
        text: "De mening van 31 augustus legt het vat tegen de index. Die S&P sloot in onze vloer op 7.745,06, 17 augustus. Deze rubriek doet die vergelijking niet over. Zij zet de drie reeksen naast de piramide: kasstroom, industriële vraag, brandstof voor stroom die de 10 procent raakt. Geen koersdoel.",
        kind: "duiding",
      },
      {
        type: "table",
        caption:
          "Laatste waarneming per reeks, peil 31 augustus 2026. Olie is EIA via FRED; koper en uranium zijn IMF-wereldprijzen via FRED.",
        headers: ["Reeks", "Laatste rij", "Waarde", "j/j", "Eenheid"],
        rows: [
          ["Brent", "2026-08-25", "88,24 $", "+30,1%", "vat"],
          ["WTI", "2026-08-25", "83,90 $", "+30,4%", "vat"],
          ["Koper", "2026-07-01", "13.542,82 $", "+38,6%", "metrische ton"],
          ["Uranium", "2026-07-01", "69,23 $", "+17,4%", "pond U3O8"],
        ],
      },
      { type: "h2", text: "Het vat — kasstroom" },
      {
        type: "p",
        text: "Brent en WTI liggen als dagreeks. De laatste augustusdag van 2025 in dezelfde Brent-reeks: 67,83. Van daar naar 88,24 is 30,1 procent. Dat is een factuur voor energie, geen stemming. De Noorse kroon in de cashlaag — vijf procent van de 30 procent liquide — ademt met het vat. Petrobras ademt ermee, en met Brasília. MPC Container Ships noteert in Oslo; vrachttarieven hebben nog geen reeks in onze vloer.",
      },
      {
        type: "p",
        text: "Het vat is geen order. Een stijging van Brent kan teniet door politiek in het gastland. Koppen horen alleen als zij Petrobras, MPCC of Green Impact Partners raken. Yahoo is notering, geen vloer. Wie 25 augustus als 31 augustus verkoopt zonder datum, liegt. Met datum is het een laatste slot.",
        kind: "duiding",
      },
      { type: "h2", text: "Het koper — industriële vraag" },
      {
        type: "p",
        text: "Koper is een maandreeks van het IMF, dollar per metrische ton. Juli 13.542,82, +38,6 procent tegen juli 2025. Dat is geen LME-slot en geen ticker van vanochtend. Gunnison Copper beweegt met deze prijs, niet met de goudmacro. De Toronto-notering is GCU.TO; GCU.V op Yahoo is een ander instrument, geen koper.",
      },
      {
        type: "p",
        text: "NioCorp (Elk Creek: niobium, scandium, titanium) heeft nog geen eigen reeks in de vloer. Allied Critical Metals noteert op de CSE, niet het gedeliste ACM.V en niet het cryptotoken. Dunne CSE- en TSX-namen gapen harder als de VIX opspringt. Dat is een feit van de tape, geen weging.",
        kind: "feit",
      },
      { type: "h2", text: "Het pond — brandstof, geen basis" },
      {
        type: "p",
        text: "Uranium, dezelfde IMF-bron, 69,23 dollar het pond U3O8 in juli, +17,4 procent. Yellow Cake houdt de cake, delft niet. De koers op Yahoo staat in pence. Kernbeleid en netcongestie blijven koppen, geen CSV. De 10 procent crypto ademt met stroom en met M2; het pond is een thermometer van die brandstof, geen tweede basis.",
      },
      {
        type: "note",
        text: "Een maandreeks tot juli is de laatste rij die wij hebben. Wie juli-koper voor augustus verkoopt, verzint een rij. De datum staat bij het cijfer. Wie een LME-slot of een makelaarsspot wil, legt een tweede reeks naast deze.",
      },
      {
        type: "p",
        text: "Drie lagen, drie datums. Kasstroom (olie) raakt de 20 procent en een rand van de cashlaag. Industriële vraag (koper) raakt Gunnison, niet de 40 procent. Brandstof (uranium) raakt Yellow Cake en, via stroom, de smalste laag. Geen van de drie is een koopbrief. De bodem van de piramide blijft metaal.",
        kind: "duiding",
      },
      {
        type: "quote",
        text: "Een lading zonder index is nog altijd een lading. Een ticker zonder reeks is een scherm.",
      },
    ],
    steenman: {
      objection:
        "Een maandreeks tot juli is te oud voor een stuk van 31 augustus. De tape van vandaag weet meer. En het vat tegen de piramide leggen is de mening van 31 augustus overdoen.",
      antwoord:
        "De tape van vandaag is geen reeks in onze vloer. Wie juli-koper voor augustus verkoopt, verzint een rij. De mening legt het vat tegen de S&P. Deze rubriek legt drie reeksen tegen de lagen — kasstroom, industrie, brandstof — en stopt daar.",
    },
    sources: [
      { label: "FRED DCOILBRENTEU", url: "https://fred.stlouisfed.org/series/DCOILBRENTEU", retrieved: "2026-08-31" },
      { label: "FRED DCOILWTICO", url: "https://fred.stlouisfed.org/series/DCOILWTICO", retrieved: "2026-08-31" },
      { label: "FRED PCOPPUSDM", url: "https://fred.stlouisfed.org/series/PCOPPUSDM", retrieved: "2026-08-31" },
      { label: "FRED PURANUSDM", url: "https://fred.stlouisfed.org/series/PURANUSDM", retrieved: "2026-08-31" },
    ],
    figures: [
      { label: "Brent", value: "88,24 $", source: "2026-08-25", kind: "feit" },
      { label: "WTI", value: "83,90 $", source: "2026-08-25", kind: "feit" },
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
    readingMinutes: 8,
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
        text: "Deze rubriek bestaat zodat de namen niet alleen onder Piramide hangen. Wie alleen de titels wil, komt hier. Wie de weging wil, gaat naar de piramide. Geen adviesrelatie. Geen «nu kopen».",
        kind: "duiding",
      },
      {
        type: "table",
        caption: "Dertig namen, vier lagen. Stand 31 augustus 2026. Geen weging per titel.",
        headers: ["Laag", "Weging", "Wat erin zit", "Rol"],
        rows: [
          ["Edelmetalen", "40%", "Goud, zilver", "allocatie"],
          ["Liquide middelen", "30%", "EUR 50 / USD 40 / CHF 5 / NOK 5", "allocatie"],
          ["Aandelen", "20%", "twintig namen, geen weging per titel", "volgen"],
          ["Crypto", "10%", "BTC, XMR, GRAM — Sky volgt, telt niet", "allocatie + volgen"],
        ],
      },
      { type: "h2", text: "Wat een stand is" },
      {
        type: "p",
        text: "Een stand heeft een datum en een herzieningsregel. Goud, bijvoorbeeld: aanhouden in de basis sinds 31 augustus. These: M2 groeit +5,53 procent jaar-op-jaar terwijl de uitgelijnde reële tienjaars 2,43 procent is — DGS10 4,69 minus T10YIE 2,26, 6 augustus. Ongeldigverklaring: twee opeenvolgende edities boven 3,00 procent reëel, of M2SL jaar-op-jaar onder 2 procent terwijl DFF minus CPIAUCSL boven +1,5 punt blijft. Dat is geen koersdoel.",
      },
      {
        type: "p",
        text: "Zilver deelt de toets met goud. De 40 procent splitsen wij niet op één waarneming. Liquide middelen: 50 procent euro, 40 procent dollar, 5 procent frank, 5 procent kroon. Herziening van de menging als de ruwe reële korte rente in de Verenigde Staten twee edities onder −1,0 punt blijft, of als de groep de 30 procent zelf wijzigt. De openbare notering komt van de Yahoo-tape; die is geen reeks in de datavloer.",
        kind: "feit",
      },
      {
        type: "quote",
        text: "Een stand zonder datum is een stemming. Een stand zonder ongeldigverklaring is een geloof.",
      },
      { type: "h2", text: "Twintig aandelen, geen weging per titel" },
      {
        type: "p",
        text: "De 20 procent komt pas als de 70 procent eronder staat. Agnico Eagle, Newmont en B2Gold zijn producenten. Hecla en Aya zijn zwaarder zilver. Triple Flag int royalty en streaming, geen eigen groeve. Tudor Gold is exploratie, Treaty Creek. Een miner is geen goudbaar. AISC, reservecijfers, hedging en politiek in het gastland horen in het dossier, niet in de tape.",
      },
      {
        type: "p",
        text: "Kritieke grondstoffen: Gunnison Copper in Toronto, NioCorp op Elk Creek, Yellow Cake met de cake, Allied Critical Metals op de CSE. Kasstroom: Petrobras als preferente ADR, MPC Container Ships in Oslo, Green Impact Partners op de TSXV. Technologie: Palantir, D-Wave, Lightwave Logic, Nanalysis. Kleine, dunne tapes: Elysee en CryoMass — volgen omdat de groep het vroeg, niet omdat zij de piramide dragen.",
      },
      {
        type: "p",
        text: "Een titel valt af als de beursnotering verdwijnt, niet op één dagkoers. Wij herzien de 20 procent als de groep de piramide zelf wijzigt. Extra aandacht voor miners is hefboomonderzoek, geen tweede basis.",
        kind: "duiding",
      },
      { type: "h2", text: "De 10 procent blijft de punt" },
      {
        type: "p",
        text: "Alleen Bitcoin, Monero en Gram zitten in de 10 procent. Gram is Toncoin; één notering, GRAM-USD, geen twee munten. xrm is Monero; de tape kent XMR. Sky blijft op de volglijst — Yahoo «Sky USD», niet Champion Homes — en telt niet mee in de weging. Winst in deze laag verstevigt eerst edelmetaal en kasgeld. De punt blijft de punt.",
      },
      {
        type: "p",
        text: "Huisregels, ongewijzigd. Wie winst neemt, verstevigt eerst de basis. Nooit in één keer in of uit een aandeel. Nooit met het laatste geld, en alleen met geld dat u bereid bent volledig te verliezen. Noch hebzucht, noch angst mag de feiten vertroebelen. Dat is geen kooporder.",
        kind: "duiding",
      },
      {
        type: "note",
        text: "Niets hierin is financieel advies, noch een aanbeveling om te kopen of te verkopen. SafeCapital is geen erkende beleggingsadviseur. Beleggen brengt risico’s mee, waaronder verlies van kapitaal.",
      },
    ],
    steenman: {
      objection:
        "Een krant die dertig tickers noemt zonder koers is een inhoudsopgave, geen journalistiek. Zonder «nu kopen» of een doel is er niets te lezen.",
      antwoord:
        "De journalistiek zit in de stand: waarom de laag blijft, en wanneer zij valt. Een koersdoel zou advies zijn. Dat doen wij niet. De namen staan hier zodat de titels een rubriek hebben, niet zodat de tape een order wordt.",
    },
    sources: [
      { label: "Volglijst en standen, src/data/watchlist.ts", retrieved: "2026-08-31" },
      { label: "Dossiers, src/data/dossiers.ts", retrieved: "2026-08-31" },
    ],
    figures: [
      { label: "Namen op de lijst", value: "30", source: "WATCHLIST", kind: "feit" },
      { label: "Aandelen", value: "20", source: "kind === aandeel", kind: "feit" },
      { label: "Weging edelmetaal", value: "40%", source: "PYRAMID_WEIGHTS", kind: "feit" },
      { label: "Crypto in de 10 %", value: "BTC · XMR · GRAM", source: "CRYPTO_ALLOCATION", kind: "feit" },
    ],
  },
];
