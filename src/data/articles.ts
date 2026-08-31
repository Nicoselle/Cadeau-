import type { Article } from "@/types/newspaper";

export const articles: Article[] = [
  {
    slug: "reele-rente-houdt-de-bodem",
    kicker: "Voorpagina · Editie 2",
    title: "De reële rente houdt de bodem",
    dek: "Drie cijfers uit dezelfde vloer, nu tegen de piramide gelegd: M2 +5,53 procent, reële tienjaars 2,43 procent, Fed funds 3,63 procent. Geen nieuwe waarneming. Wel een stand.",
    desk: "vs",
    edition: 2,
    published: "2026-08-31",
    author: "Redactie Kapitaalkrant",
    lead: true,
    readingMinutes: 7,
    image: {
      src: "/images/reele-rente-houdt-de-bodem.webp",
      alt: "Een messing weegschaal houdt een goudbaar tegen een oprolde staatsobligatie, voor een stenen piramide van baren en munten.",
      caption:
        "De lange rente weegt tegen de basis. Volgens de vloer blijft de bodem staan.",
    },
    body: [
      {
        type: "p",
        text: "Deze editie haalt geen nieuwe reeks binnen. Juni blijft de laatste M2-waarneming. De tienjaars stopt in onze vloer op 6 augustus. De Fed funds op 14 augustus. De breakeven loopt tot 17 augustus, maar die laatste waarneming heeft geen tienjaars naast zich. Wat wél nieuw is: wij leggen drie bestaande cijfers tegen de piramide, omdat zij goud, kasgeld en crypto raken — en schrijven de stand van 31 augustus op, met datum en herzieningsregel.",
      },
      {
        type: "p",
        text: "Drie vaststellingen. De Amerikaanse geldhoeveelheid groeit nog altijd met 5,53 procent jaar-op-jaar. De uitgelijnde reële tienjaars — DGS10 minus T10YIE op dezelfde datum — staat op 2,43 procent. De effectieve beleidsrente is 3,63 procent, tegen een prijsindex van 3,3 procent. Dat is geen reden om de basis af te breken, en geen reden om de 10 procent crypto tot de bodem te verheffen.",
      },
      {
        type: "p",
        text: "De piramide blijft de weging. Deze editie is de peiling, geen herziening.",
        kind: "duiding",
      },
      { type: "h2", text: "M2 — de kraan die de 40 % en de 10 % raakt" },
      {
        type: "table",
        caption: "Peil 31 augustus 2026. Bonnen: FRED, reeksen in redactie/data. Geen nieuwe H.6 in de vloer.",
        headers: ["Grootheid", "Waarde", "Bon"],
        rows: [
          ["M2-groei j/j (juni 2026)", "+5,53% SA / +5,55% NSA", "FRED M2SL + M2NS"],
          ["M2-groei 6 maanden, op jaarbasis", "+7,3%", "FRED M2SL"],
          ["Laatste waarneming", "23.155,2 — 2026-06-01", "FRED M2SL"],
        ],
      },
      {
        type: "p",
        text: "Editie 1 sloot op 18 augustus en tekende aan dat de volgende H.6 in de kalender op 25 augustus stond. Die bekendmaking staat niet in deze vloer. Wie juni +5,53 procent voor juli verkoopt, verzint een waarneming. Wij doen dat niet. Het teken van juni blijft: de kraan is open; seizoensgecorrigeerd en ongecorrigeerd liggen binnen 0,1 punt van elkaar.",
      },
      {
        type: "p",
        text: "Dat cijfer raakt goud en de cryptolaag, niet het lokale nieuws en niet een willekeurig aandeel. Geldgroei die versnelt terwijl de basis 40 procent edelmetaal is, bevestigt waarom die laag eerst komt. Het maakt van Bitcoin geen fundament.",
        kind: "duiding",
      },
      { type: "h2", text: "Reële tienjaars — 2,43 procent, zelfde datum" },
      {
        type: "table",
        caption: "Uitgelijnd op 6 augustus 2026. Latere T10YIE-waarnemingen zonder DGS10 tellen niet als reële rente.",
        headers: ["Grootheid", "Waarde", "Bon"],
        rows: [
          ["DGS10 (6 augustus)", "4,69%", "FRED DGS10"],
          ["T10YIE (6 augustus)", "2,26%", "FRED T10YIE"],
          ["Reële 10j, uitgelijnd", "2,43%", "berekend: 4,69 − 2,26"],
          ["Hoogste uitgelijnde reële 10j in de vloer", "2,47% — 31 juli", "DGS10 4,75 − T10YIE 2,28"],
          ["T10YIE laatste waarneming", "2,28% — 17 augustus", "FRED T10YIE, geen DGS10 ernaast"],
        ],
      },
      {
        type: "p",
        text: "De laatste breakeven in de vloer is 2,28 procent op 17 augustus. Die dag heeft geen tienjaars. Wie 4,69 minus 2,28 rekent, trekt twee verschillende datums van elkaar af. De regel hier is dezelfde als bij M2: alleen wat op één peil naast elkaar ligt.",
      },
      {
        type: "p",
        text: "2,43 procent reëel over tien jaar is geen straf die de goudlaag ongeldig maakt, en geen vrijbrief om kasgeld te laten vallen. Het is de opportuniteitskost van de basis. Zolang die onder de drie procent blijft, houdt deze editie de 40 procent. De herzieningsregel staat bij de standen: twee edities boven 3,00 procent, of M2 onder 2 procent terwijl de reële beleidsrente boven +1,5 punt blijft.",
        kind: "duiding",
      },
      { type: "h2", text: "Fed funds — 3,63 procent, de cashlaag" },
      {
        type: "table",
        caption: "Peil 31 augustus 2026. Laatste DFF in de vloer: 14 augustus.",
        headers: ["Grootheid", "Waarde", "Bon"],
        rows: [
          ["Fed funds (14 augustus)", "3,63%", "FRED DFF"],
          ["CPI j/j (juli 2026)", "+3,3%", "FRED CPIAUCSL"],
          ["Reële korte rente, ruw", "≈ +0,3 pp", "berekend: 3,63 − 3,3"],
        ],
      },
      {
        type: "p",
        text: "De laag liquide middelen is 30 procent, verdeeld in 50 procent euro, 40 procent dollar, 5 procent frank en 5 procent kroon. Een ruwe reële korte rente van drie tienden is geen jacht op rendement en geen reden om die menging in te wisselen voor looptijd. De dollarkoers op de lijst is de index, geen saldo.",
      },
      {
        type: "p",
        text: "Wat de drie cijfers samen zeggen: de kraan van editie 1 is niet dichtgedraaid, de lange reële rente is niet tot een peil gestegen dat de basis breekt, en de beleidsrente blijft net boven de gemeten inflatie. De bodem houdt. De 20 procent aandelen blijft volgen. De 10 procent crypto blijft de smalste laag.",
        kind: "duiding",
      },
      {
        type: "quote",
        text: "Een stand zonder datum is een stemming. Een stand zonder ongeldigverklaring is een geloof.",
      },
    ],
    steenman: {
      objection:
        "Zonder nieuwe M2-waarneming is dit geen editie, het is een herlezing. 2,43 procent reëel is historisch geen hoge lat voor goud, en +0,3 punt reëel kort is ruis. Wie de piramide al kende, leert hier niets dat 18 augustus niet zei.",
      antwoord:
        "Daarom is het één stuk, geen zes. De winst zit in de stand: gedateerd, met toets, gekoppeld aan drie cijfers die de lagen raken. Wie later zegt dat wij «altijd goud» riepen, kan de herzieningsregel nazien. Dat kon editie 1 nog niet.",
    },
    sources: [
      { label: "FRED M2SL / M2NS", url: "https://fred.stlouisfed.org/series/M2SL", retrieved: "2026-08-31" },
      { label: "FRED DGS10", url: "https://fred.stlouisfed.org/series/DGS10", retrieved: "2026-08-31" },
      { label: "FRED T10YIE", url: "https://fred.stlouisfed.org/series/T10YIE", retrieved: "2026-08-31" },
      { label: "FRED DFF", url: "https://fred.stlouisfed.org/series/DFF", retrieved: "2026-08-31" },
      { label: "FRED CPIAUCSL", url: "https://fred.stlouisfed.org/series/CPIAUCSL", retrieved: "2026-08-31" },
    ],
    figures: [
      { label: "M2 VS j/j", value: "+5,53%", source: "FRED M2SL, juni 2026", kind: "feit" },
      { label: "Reële 10j, uitgelijnd", value: "2,43%", source: "DGS10 − T10YIE, 6 augustus 2026", kind: "feit" },
      { label: "Fed funds", value: "3,63%", source: "FRED DFF, 14 augustus 2026", kind: "feit" },
      { label: "CPI VS j/j", value: "+3,3%", source: "FRED CPIAUCSL, juli 2026", kind: "feit" },
    ],
  },
  {
    slug: "vat-liegt-minder-dan-de-index",
    kicker: "De mening",
    title: "Het vat liegt minder dan de index",
    dek: "De S&P doet alsof hij de wereld is. Brent, koper en uranium zijn de factuur. Een stemming is geen lading.",
    desk: "opinie",
    edition: 2,
    published: "2026-08-31",
    author: "De mening",
    lead: false,
    readingMinutes: 6,
    image: {
      src: "/images/vat-liegt-minder-dan-de-index.webp",
      alt: "Op een eiken tafel staan een deukse oliekannetje, een stuk koperen pijp en een gesloten blik; ernaast een verfrommeld blad met indexcijfers.",
      caption:
        "Stof naast stemming. De index blijft staan; hij is niet langer de enige thermometer.",
    },
    body: [
      {
        type: "p",
        text: "Er hangt in elke beurszaal een cijfer dat zich als de wereld voordoet. Op 17 augustus stond de S&P 500 in onze vloer op 7.745,06. Het is een gemiddelde van Amerikaanse winstverwachtingen, keurig tot op de cent. Wie dat getal «de markt» noemt, maakt van een stemming een landkaart.",
      },
      {
        type: "p",
        text: "De landkaart ziet er anders uit als je het vat, de ton en het pond ernaast legt. Brent sloot op 25 augustus op 88,24 dollar het vat. De laatste augustusdag van 2025 in dezelfde reeks: 67,83. Dat is 30,1 procent jaar-op-jaar. WTI ernaast: 83,90. Koper, wereldprijs van het IMF in juli, 13.542,82 dollar de metrische ton — 38,6 procent boven juli 2025. Uranium, dezelfde bron, 69,23 dollar het pond U3O8, 17,4 procent hoger. Geen van die drie is een sentiment. Het is een factuur voor energie, voor elektrificatie, voor de ketens die daarvan leven.",
      },
      {
        type: "p",
        text: "Een index kan stijgen terwijl het vat duurder wordt, of dalen terwijl koper de rekening schrijft. Dat is geen paradox. Dat is het verschil tussen een stemming en een lading. Wie alleen de stemming herdrukt, herdrukt een beleefdheid.",
        kind: "duiding",
      },
      {
        type: "table",
        caption: "Peil 31 augustus 2026. Bonnen in redactie/data. Olie is een dagreeks; koper en uranium zijn maandreeksen van het IMF.",
        headers: ["Grootheid", "Laatste", "Jaar-op-jaar", "Bon"],
        rows: [
          ["S&P 500", "7.745,06 — 17 augustus", "—", "FRED SP500"],
          ["Brent", "88,24 $ — 25 augustus", "+30,1%", "FRED DCOILBRENTEU"],
          ["WTI", "83,90 $ — 25 augustus", "+30,4%", "FRED DCOILWTICO"],
          ["Koper, ton", "13.542,82 $ — juli", "+38,6%", "FRED PCOPPUSDM"],
          ["Uranium, pond", "69,23 $ — juli", "+17,4%", "FRED PURANUSDM"],
        ],
      },
      {
        type: "p",
        text: "Daarom liggen olie, koper en uranium nu naast de index, niet in zijn plaats. De S&P blijft staan als ruwe maat van risicobereidheid. Wij schrappen hem niet. Wij zetten hem terug waar hij hoort: een thermometer van stemming, naast drie thermometers van stof.",
        kind: "duiding",
      },
      {
        type: "p",
        text: "De Noorse kroon in de cashlaag ademt met het vat. Petrobras ademt ermee — en met Brasília. Gunnison ademt met de ton, niet met de goudmacro. Yellow Cake houdt de cake, delft niet. Dat zijn feiten van de volglijst. Het is geen koopbrief.",
      },
      {
        type: "quote",
        text: "Een index zonder lading is een stemming. Een lading zonder index is nog altijd een lading.",
      },
      {
        type: "p",
        text: "De bodem van de piramide is metaal. De punt is een verhaal. Wie die volgorde omdraait omdat de S&P een hoog cijfer toont, leest de factuur niet. De factuur ligt er, met bon. Dat is de enige beleefdheid die een krant zich mag permitteren.",
        kind: "duiding",
      },
    ],
    steenman: {
      objection:
        "Een maandreeks van het IMF is geen LME-slot, en Brent van 25 augustus is geen koers van vanochtend. De S&P is de enige thermometer die de markt zelf elke dag naziet. Stof ernaast zetten is nostalgisch materialisme.",
      antwoord:
        "Juist daarom staat de etikettering erbij: dagreeks, maandreeks, wereldprijs. De index blijft. Hij is alleen niet langer de enige zin van de zin. Wie een loket wil, legt een tweede reeks naast deze. Wie alleen de stemming herhaalt, heeft geen vloer nodig.",
    },
    sources: [
      { label: "FRED SP500", url: "https://fred.stlouisfed.org/series/SP500", retrieved: "2026-08-31" },
      { label: "FRED DCOILBRENTEU", url: "https://fred.stlouisfed.org/series/DCOILBRENTEU", retrieved: "2026-08-31" },
      { label: "FRED DCOILWTICO", url: "https://fred.stlouisfed.org/series/DCOILWTICO", retrieved: "2026-08-31" },
      { label: "FRED PCOPPUSDM", url: "https://fred.stlouisfed.org/series/PCOPPUSDM", retrieved: "2026-08-31" },
      { label: "FRED PURANUSDM", url: "https://fred.stlouisfed.org/series/PURANUSDM", retrieved: "2026-08-31" },
    ],
    figures: [
      { label: "S&P 500", value: "7.745,06", source: "FRED SP500, 17 augustus 2026", kind: "feit" },
      { label: "Brent", value: "88,24 $", source: "FRED DCOILBRENTEU, 25 augustus 2026", kind: "feit" },
      { label: "Koper, ton", value: "13.542,82 $", source: "FRED PCOPPUSDM, juli 2026", kind: "feit" },
      { label: "Uranium, pond", value: "69,23 $", source: "FRED PURANUSDM, juli 2026", kind: "feit" },
    ],
  },
  {
    slug: "kraan-weer-open",
    kicker: "Voorpagina · Editie 1",
    title: "De kraan weer open, de rekening rondgepompt",
    dek: "In de Verenigde Staten groeit het geld weer terwijl de Fed verlaagt. In de eurozone ligt de korte rente onder de inflatie. In België indexeert de staat — maar alleen tot de centenindex.",
    desk: "vs",
    edition: 1,
    published: "2026-08-18",
    author: "Redactie Kapitaalkrant",
    lead: false,
    readingMinutes: 9,
    image: {
      src: "/images/kraan-weer-open.webp",
      alt: "Een ijzeren kraan stort bankbiljetten in een bassin, terwijl een klein tappunt één rode druppel in een beker laat vallen.",
      caption:
        "De kraan gaat open voor wie al aan tafel zit. De compensatie komt als een gerantsoeneerde druppel.",
    },
    body: [
      {
        type: "p",
        text: "Drie waarnemingen die samen één beweging vormen. In de Verenigde Staten groeit M2 opnieuw met 5,5 procent jaar-op-jaar, de Fed heeft de beleidsrente van 4,33 naar 3,63 procent gebracht, en de CPI staat op 3,3 procent — een jaar eerder was dat 2,7 procent. In de eurozone ligt de korte rente onder de inflatie: wie euro’s aanhoudt, verliest reëel. En in België, inflatiekoploper met 3,6 procent, is in juni 2026 de spilindex overschreden. De staat indexeert in september. Maar niet helemaal.",
      },
      {
        type: "p",
        text: "De geldkraan gaat open. De compensatie voor de gevolgen wordt gerantsoeneerd.",
        kind: "duiding",
      },
      { type: "h2", text: "Verenigde Staten" },
      {
        type: "table",
        caption: "Peil 18 augustus 2026. Bonnen: FRED, reeksen in redactie/data.",
        headers: ["Grootheid", "Waarde", "Bon"],
        rows: [
          ["M2-groei j/j (juni 2026)", "+5,53% SA / +5,55% NSA", "FRED M2SL + M2NS"],
          ["M2-groei 6 maanden geannualiseerd", "+7,3%", "FRED M2SL"],
          ["CPI j/j (juli 2026)", "+3,3% — een jaar eerder +2,7%", "FRED CPIAUCSL"],
          ["Fed funds", "4,33% → 3,63%", "FRED DFF"],
          ["Reële korte rente, ruw", "≈ +0,3%", "berekend: 3,63 − 3,3"],
        ],
      },
      {
        type: "p",
        text: "De 5,5 procent is geen artefact van de methodologiebreuk van 28 juli 2026. Die dag ging de Fed IRA- en Keogh-saldi anders netteren; de seizoensgecorrigeerde reeks werd licht herzien, de ongecorrigeerde niet. Beide reeksen tonen dezelfde versnelling, van ruwweg 4 procent eind 2025 naar 5,5 procent in juni. Dat staat in een apart stuk.",
      },
      { type: "h2", text: "Eurozone" },
      {
        type: "table",
        caption: "Twee lagen: de FRED-reeks loopt tot juni; juli-cijfers zijn ECB-headlines.",
        headers: ["Grootheid", "Waarde", "Bon"],
        rows: [
          ["HICP j/j (juni 2026, reeks)", "+2,7%", "FRED CP0000EZ19M086NEST"],
          ["HICP j/j (juli 2026, headline)", "2,9%", "ECB Data Portal-homepage, 17-08-2026"],
          ["M3-groei (juni 2026, headline)", "+3,3%", "ECB-homepage"],
          ["€STR (14-08-2026, headline)", "2,189%", "ECB-homepage"],
          ["Reële korte rente, ruw", "≈ −0,7%", "berekend: 2,19 − 2,9"],
          ["Overheidsschuld (Q1 2026, headline)", "88,9% bbp", "ECB-homepage"],
        ],
      },
      {
        type: "note",
        text: "De ECB-CSV-API is vanaf deze redactie viermaal dood verklaard. Headlines tellen als bon voor één peilmoment, niet als reproduceerbare reeks. Daarom staat de FRED-spiegel op de marktpagina, en de juli-headline alleen hier.",
      },
      { type: "h2", text: "België" },
      {
        type: "table",
        caption: "Statbel bestat-API, juli 2026, basis 2025 = 100. Etiketten volgens de publicerende instelling.",
        headers: ["Grootheid", "Waarde", "Bon"],
        rows: [
          ["CPI j/j", "+3,56%", "Statbel bestat"],
          ["Kerninflatie (excl. energie en onbewerkte voeding)", "+3,13%", "Statbel-persbericht 30-07-2026"],
          ["Kernmaat excl. energie, voeding, alcohol, tabak", "+3,67%", "bestat-view, eurozone-stijl"],
          ["Energiedragers j/j", "+10,6%", "Statbel bestat"],
          ["Gezondheidsindex j/j", "+3,2%", "Statbel bestat"],
          ["Afgevlakte gezondheidsindex juni / juli", "100,37 / 100,77", "Statbel bestat"],
          ["Spilindex", "100,28 — overschreden juni 2026", "Planbureau + Statbel"],
          ["Indexering uitkeringen en wedden", "september 2026, centenindex", "Programmawet 30-05-2026"],
        ],
      },
      {
        type: "p",
        text: "De officiële Belgische kerninflatie is 3,13 procent, niet 3,7. Dat laatste cijfer hoort bij een andere aggregatie. Beide maten liggen boven 3 procent; het etiket moet erbij.",
        kind: "feit",
      },
      { type: "h2", text: "Wat de drie blokken samen zeggen" },
      {
        type: "p",
        text: "Het patroon is klassiek. De reële rente is naar nul (VS) of eronder (eurozone) gebracht terwijl de geldgroei versnelt. Dat is geen neutraal «normaliseren» maar een nieuwe ronde kredietexpansie. Het nieuwe geld bereikt eerst de staat en de activabezitters, als laatste het loonzakje. De kunstmatig gedrukte rente lokt investeringen uit die bij een eerlijke prijs van sparen niet rendabel waren.",
        kind: "duiding",
      },
      {
        type: "p",
        text: "België maakt zichtbaar wat elders verborgen blijft, omdat het de gevolgen van geldontwaarding wettelijk heeft geïnstitutionaliseerd. Een gezondheidsindex, een afvlakking daarvan, een spilindex als tripwire, en een automatische verhoging drie maanden later. Sinds 2025 is de wachttijd verlengd naar drie maanden, en de centenindex knipt de compensatie af boven 2.000 euro (uitkeringen en pensioenen) respectievelijk 4.000 euro (lonen). De begrenzing is cumulatief: één schijf van 2 procent binnen de matigingsperiode, geen blijvende korting.",
        kind: "duiding",
      },
      {
        type: "quote",
        text: "De staat, die via de inflatiebelasting over de héle geldhoeveelheid int en wiens schuld reëel wegsmelt, compenseert zijn burgers vertraagd en gedeeltelijk — en noemt dat begrotingsdiscipline.",
      },
      {
        type: "p",
        text: "Wie buiten elk indexmechanisme valt — de spaarder, de rentenier, de kleine verhuurder met een verouderd contract — betaalt het gelag volledig. De indexering wekt de schijn dat inflatie een beheerst probleem is. In werkelijkheid pompt ze de rekening rond en verankert ze de verwachting dat 3 tot 4 procent per jaar normaal is. Bij 3,6 procent halveert de koopkracht van een niet-geïndexeerd vermogen in twintig jaar.",
        kind: "duiding",
      },
    ],
    steenman: {
      objection:
        "De Belgische uitschieter is grotendeels een energieschok — energiedragers +10,6 procent — en aanbodschokken zijn geen monetair verschijnsel. 5,5 procent M2-groei is herstel naar trend na de krimp van 2022–2023, geen zondvloed. De Fed verlaagt om een afkoelende arbeidsmarkt. En de centenindex is verdedigbaar sociaal beleid: de laagste inkomens worden volledig gecompenseerd, alleen hogere schijven niet.",
      antwoord:
        "Dat de vonk (energie) van buiten komt, verklaart niet waarom het kruit droog ligt — dat is het werk van jaren geldgroei en een reële rente rond nul. Een staat die zijn eigen compensatiemachine afknipt terwijl de inflatiebelasting volledig doorloopt, bevestigt eerder de diagnose dan dat hij haar weerlegt.",
    },
    sources: [
      { label: "FRED M2SL / M2NS / CPIAUCSL / DFF", url: "https://fred.stlouisfed.org/", retrieved: "2026-08-17" },
      { label: "Statbel bestat-view CPI en gezondheidsindex", url: "https://bestat.statbel.fgov.be/", retrieved: "2026-08-17", vintage: "juli 2026" },
      { label: "Statbel-persbericht 30 juli 2026 (kerninflatie 3,13%)", retrieved: "2026-08-17", vintage: "30-07-2026" },
      { label: "ECB Data Portal-homepage (headlines)", url: "https://data.ecb.europa.eu/", retrieved: "2026-08-17" },
      { label: "Federaal Planbureau, indexcijfer der consumptieprijzen", url: "https://www.plan.be/", retrieved: "2026-08-17" },
      { label: "Programmawet van 30 mei 2026", retrieved: "2026-08-17", vintage: "in werking 01-06-2026" },
    ],
    figures: [
      { label: "M2 VS j/j", value: "+5,5%", source: "FRED M2SL + M2NS, juni 2026", kind: "feit" },
      { label: "CPI VS j/j", value: "+3,3%", source: "FRED CPIAUCSL, juli 2026", kind: "feit" },
      { label: "CPI België j/j", value: "+3,6%", source: "Statbel, juli 2026", kind: "feit" },
      { label: "Kerninflatie BE (Statbel)", value: "+3,13%", source: "Statbel-persbericht 30-07-2026", kind: "feit" },
      { label: "Reële korte rente EZ", value: "≈ −0,7%", source: "berekend uit headlines", kind: "duiding" },
    ],
  },
  {
    slug: "lange-rente-wil-niet-mee",
    kicker: "Markten · Verenigde Staten",
    title: "De lange rente wil niet mee",
    dek: "Sinds de Fed begon te verlagen is de beleidsrente zeventig punten gedaald en de tienjaars drieënzestig punten gestegen. Twee lezingen, één toetsbare inzet.",
    desk: "vs",
    edition: 1,
    published: "2026-08-18",
    author: "Redactie Kapitaalkrant",
    lead: false,
    readingMinutes: 5,
    image: {
      src: "/images/lange-rente.webp",
      alt: "Een locomotief weigert te keren terwijl het spoor de mist in stijgt en een seinarm omlaag wijst.",
      caption:
        "De korte kant zakt. De lange kant blijft staan. Twee lezingen, één meetbaar verschil.",
    },
    body: [
      {
        type: "p",
        text: "Op 17 september 2025, de vooravond van de eerste verlaging, stond de effectieve federal funds rate op 4,33 procent en de tienjaarsrente op 4,06. De curve was omgekeerd: de staat betaalde meer voor geld van morgen dan voor geld van over tien jaar.",
      },
      {
        type: "table",
        caption: "FRED DFF, DGS10 en T10YIE. Laatste tienjaarswaarneming in de vloer: 6 augustus 2026.",
        headers: ["Moment", "Beleidsrente", "Tienjaars", "Spread"],
        rows: [
          ["17-09-2025", "4,33%", "4,06%", "−0,27 pp"],
          ["31-12-2025", "3,64%", "4,18%", "+0,54 pp"],
          ["06-08-2026", "3,63%", "4,69%", "+1,06 pp"],
        ],
      },
      {
        type: "p",
        text: "Sindsdien is de beleidsrente ongeveer zeventig basispunten gedaald en de tienjaars ongeveer drieënzestig basispunten gestegen. De piek van de tienjaars in deze reeks is 4,75 procent op 31 juli 2026. De dertigjaars stond op 14 augustus op 5,25 procent. De breakeven-inflatieverwachting bleef daarbij vlak: 2,2 tot 2,5 procent over de hele periode, laatste stand 2,28 procent — terwijl de gemeten CPI 3,3 procent bedraagt.",
      },
      { type: "h2", text: "Twee lezingen, nog niet beslecht" },
      {
        type: "p",
        text: "De fiscale lezing: de lange kant van de markt weigert de verlaging te volgen en eist een hogere termijnpremie. Wie de staat tien jaar financiert bij deze tekorten en deze geldgroei, wil toe betaald worden. Het gat tussen breakeven (2,3 procent) en gemeten inflatie (3,3 procent) betekent dan niet dat de markt de inflatie laag acht, maar dat de reële component van de lange rente stijgt.",
        kind: "duiding",
      },
      {
        type: "p",
        text: "De disinflatielezing: de markt gelooft oprecht dat de inflatie terugvalt richting 2 tot 2,5 procent, en de stijging van de lange rente weerspiegelt reële groei- of aanbodfactoren, geen wantrouwen.",
        kind: "duiding",
      },
      {
        type: "p",
        text: "Het toetsbare verschil staat in het orakelboek als regel 7. Als lezing één klopt, blijft de spread beleidsrente–tienjaars oplopen zolang de Fed verlaagt. Als lezing twee klopt, topt hij af zodra de inflatiecijfers dalen. Op 31 december 2026 kijken we of de spread groter is dan de +1,06 procentpunt van 6 augustus.",
      },
    ],
    steenman: {
      objection:
        "Een spread van iets meer dan één procentpunt is historisch geen alarm. De tienjaars kan stijgen omdat de groei meevalt, niet omdat beleggers de schatkist wantrouwen. En de reeks DGS10 loopt in onze vloer maar tot 6 augustus — twee weken vóór de peildatum van deze editie.",
      antwoord:
        "Daarom is het een orakelregel met laag vertrouwen, geen voorpaginadiagnose. De beperking van de reeks staat op de marktpagina. Wat we wél hebben, is het feit van de ontkoppeling sinds september 2025. Dat feit verdwijnt niet als de lezing later wordt weerlegd.",
    },
    sources: [
      { label: "FRED DGS10", url: "https://fred.stlouisfed.org/series/DGS10", retrieved: "2026-08-17" },
      { label: "FRED T10YIE", url: "https://fred.stlouisfed.org/series/T10YIE", retrieved: "2026-08-17" },
      { label: "FRED DFF", url: "https://fred.stlouisfed.org/series/DFF", retrieved: "2026-08-17" },
      { label: "FRED DGS30", url: "https://fred.stlouisfed.org/series/DGS30", retrieved: "2026-08-17" },
    ],
    figures: [
      { label: "Spread DGS10 − DFF", value: "+1,06 pp", source: "6 augustus 2026", kind: "feit" },
      { label: "10j breakeven", value: "2,28%", source: "17 augustus 2026", kind: "feit" },
    ],
  },
  {
    slug: "thermometer-werd-betwist",
    kicker: "België · Dossier",
    title: "De thermometer werd betwist, niet de koorts",
    dek: "Op 29 april 2026 kwam de Indexcommissie er voor het eerst sinds 2013 niet uit. Die avond tekende één minister het cijfer dat de koopkracht van miljoenen verschuift.",
    desk: "belgie",
    edition: 1,
    published: "2026-08-18",
    author: "Redactie Kapitaalkrant",
    lead: false,
    readingMinutes: 7,
    image: {
      src: "/images/thermometer.webp",
      alt: "Ambtenaren buigen zich over een grote kwikthermometer op een commissietafel, terwijl de koorts op de achtergrond onbesproken blijft.",
      caption:
        "April 2026: niet de koorts stond ter discussie, maar hoe je de thermometer mag aflezen.",
    },
    body: [
      {
        type: "p",
        text: "Op 29 april 2026 kon de Belgische Indexcommissie geen consensus bereiken over het consumptieprijsindexcijfer van april. Statbel meldde dat het cijfer «voorlopig niet» gepubliceerd kon worden en stuurde het dossier door naar David Clarinval (MR), vicepremier en minister bevoegd voor de consumptieprijsindex. Nog diezelfde avond keurde de minister het cijfer goed. Statbel publiceerde.",
      },
      {
        type: "p",
        text: "Voor het eerst sinds 2013 kwam de commissie er niet uit. In de commissie zitten vertegenwoordigers van werkgevers, vakbonden en experten. Wettelijk moet het cijfer uiterlijk op de laatste werkdag van de maand vastliggen.",
      },
      {
        type: "p",
        text: "De inzet was de energie. De werkgeversorganisaties VBO en Unizo weigerden goed te keuren omdat zij de manier waarop de energieprijzen in de berekening doorwegen onjuist vinden — die prijzen waren in april fors gestegen door de oorlog in het Midden-Oosten. VBO gaf aan met de weigering «een signaal aan de regering» te willen geven. ABVV-voorzitter Bert Engelaar wees naar de werkgevers: die trekken volgens hem plots een al lang ongewijzigde berekening in twijfel.",
      },
      {
        type: "table",
        caption: "Statbel-persbericht, basis 2025 = 100. De energiesprong is nagerekend uit onze eigen reeks.",
        headers: ["Grootheid", "maart 2026", "april 2026"],
        rows: [
          ["Consumptieprijsindex", "101,84", "103,34 (+1,47% op één maand)"],
          ["Inflatie j/j", "1,65%", "4,01%"],
          ["Gezondheidsindex", "101,63", "102,77"],
          ["Afgevlakte gezondheidsindex", "99,38", "99,85 — drempel was 100,28"],
          ["Kerninflatie (Statbel-definitie)", "2,72%", "3,55%"],
          ["HICP-flashraming", "2,2%", "4,3%"],
          ["Energiedragers (onze reeks)", "101,20", "112,59 (+11,25%)"],
        ],
      },
      {
        type: "p",
        text: "Onze berekening reproduceert Statbels maandcijfer exact. Daar zat het hele conflict in: één deelindex die in vier weken meer dan een tiende opschoof, in een land waar dat cijfer automatisch lonen en uitkeringen doorschuift. Het Federaal Planbureau had voor april 3,16 procent geraamd. Het werd 4,01.",
      },
      { type: "h2", text: "Het overleg dat het niet haalde" },
      {
        type: "p",
        text: "Het meningsverschil ging niet alleen over statistiek. Sociale partners — vakbonden én werkgevers samen, wat zeldzaam is — hadden een tegenvoorstel uitgewerkt tegenover de centenindex van de regering. Kern daarvan: de impact van energie zou voortaan meetellen op basis van een twaalfmaandsgemiddelde in plaats van de maandwaarde. De regering veegde dat voorstel van tafel, omdat het de beoogde besparing niet zou halen.",
      },
      {
        type: "p",
        text: "Die besparing is becijferd: de centenindex moet de federale begroting 272 miljoen euro in 2026 opleveren, oplopend tot 883 miljoen in 2029. Een maand later, in de nacht van 28 op 29 mei, stemde de Kamer de maatregel er alsnog door. Op 1 juni was hij wet.",
      },
      {
        type: "p",
        text: "Omdat in België het indexcijfer automatisch koopkracht verschuift, is het meten zelf een verdelingshandeling geworden — en dus een politieke. Zodra de energieprijzen springen, staat niet ter discussie wat de prijzen deden, maar hoe je ze mag optellen.",
        kind: "duiding",
      },
      {
        type: "p",
        text: "Drie observaties. Eén: de thermometer wordt betwist, niet de koorts. Werkgevers vielen de meetmethode aan op het moment dat de meting hun het meest kostte. Dat maakt hun bezwaar niet automatisch onjuist — een maandwaarde van een volatiele component doorgeven aan meerjarige loonafspraken is verdedigbaar te bekritiseren — maar de timing verraadt dat het om de uitkomst ging. Twee: de uitweg was een ministerieel besluit. Toen het corporatistische overleg vastliep, tekende één minister het cijfer af. Drie: het gezamenlijke tegenvoorstel van de partners is precies het standpunt dat het niet haalde.",
        kind: "duiding",
      },
    ],
    steenman: {
      objection:
        "Een minister die een wettelijke deadline haalt is geen staatsgreep, het is de procedure. En energie op twaalfmaandsgemiddelde zetten zou de index trager maken, niet eerlijker — het zou de schok alleen uitsmeren.",
      antwoord:
        "De procedure is het verhaal. Het cijfer dat lonen, uitkeringen en pachten verschuift, wordt in laatste instantie niet door de commissie vastgesteld maar door de minister die de begroting moet halen. Dat is geen complot, het is de institutenkaart. Wie hem eenmaal heeft gezien, leest elk volgend indexcijfer anders.",
    },
    sources: [
      { label: "Statbel: Index Committee failed to reach a consensus, april 2026", retrieved: "2026-08-17" },
      { label: "Statbel-persbericht: Inflation amounts to 4.01%", retrieved: "2026-08-17" },
      { label: "Belga / VRT NWS / Nieuwsblad, 29 april 2026", retrieved: "2026-08-17" },
      { label: "Statbel-reeks energiedragers", retrieved: "2026-08-17" },
    ],
    figures: [
      { label: "CPI-inflatie april 2026", value: "4,01%", source: "Statbel", kind: "feit" },
      { label: "Energiedragers april", value: "+11,25% m/m", source: "eigen reeks", kind: "feit" },
    ],
  },
  {
    slug: "centenindex-is-wet",
    kicker: "België · Wetgeving",
    title: "De centenindex is wet — en knipt één schijf van twee procent",
    dek: "Sinds 1 juni 2026 geldt de Programmawet. Het plafond van 2.000 euro geldt ook voor pensioenen. De twee procent is cumulatief, geen blijvende korting.",
    desk: "belgie",
    edition: 1,
    published: "2026-08-18",
    author: "Redactie Kapitaalkrant",
    lead: false,
    readingMinutes: 6,
    image: {
      src: "/images/centenindex.webp",
      alt: "Een zware schaar knipt één strook uit een lang loonregister, de rest van de rol blijft heel.",
      caption:
        "Eén schijf van twee procent, cumulatief. Daarna loopt de index weer door — tot de volgende periode.",
    },
    body: [
      {
        type: "p",
        text: "Het scherpste openstaande punt van de redactie was dit: is de centenindex in werking, en klopt de modaliteit waarop orakelboekregel 1 steunt? Antwoord: ja. De maatregel is wet en van kracht.",
      },
      {
        type: "table",
        caption: "De wetgevende keten, alle data 2026 tenzij anders vermeld.",
        headers: ["Datum", "Wat"],
        rows: [
          ["najaar 2025", "Regering start werkzaamheden centenindex"],
          ["29-12-2025", "Voorontwerp programmawet naar de Raad van State"],
          ["28-01-2026", "Raad van State brengt advies uit"],
          ["01-03-2026", "Premier De Wever vraagt advies aan NAR en CRB"],
          ["31-03-2026", "Nationale Arbeidsraad, advies 2484"],
          ["28/29-05-2026", "Kamer keurt de programmawet goed, nachtvergadering"],
          ["30-05-2026", "Programmawet ondertekend en gepubliceerd"],
          ["01-06-2026", "Inwerkingtreding; eerste matigingsperiode start"],
          ["24-07-2026", "VVSG: eerste toepassing in september 2026"],
        ],
      },
      {
        type: "p",
        text: "Eerdere berichtgeving van eind april — «de maatregel is nog niet van kracht» — is achterhaald. Het is er in mei alsnog doorgekomen, net op tijd voor 1 juni.",
      },
      { type: "h2", text: "Het mechanisme, zoals nu wettelijk vastligt" },
      {
        type: "p",
        text: "Twee matigingsperiodes: periode 1 vanaf 1 juni 2026; periode 2 vanaf 1 januari 2028, of een door de Koning vastgestelde dag. Grensbedragen: 4.000 euro bruto per maand voor lonen, privé én publiek; 2.000 euro voor uitkeringen én pensioenen. Het grensbedrag van 4.000 euro wordt op 1 januari 2028 eenmalig geïndexeerd volgens de indexoverschrijdingen vanaf 1 juni 2026.",
      },
      {
        type: "p",
        text: "De begrenzing is cumulatief, niet permanent. De matiging loopt tot de indexering binnen de periode in totaal 2 procent heeft bereikt. Daarna wordt het volledige referteloon weer onbeperkt geïndexeerd, tot de start van periode 2. De centenindex knipt dus één schijf van 2 procent af, geen blijvende korting.",
      },
      {
        type: "p",
        text: "Werkgevers in de privésector en autonome overheidsbedrijven storten de helft van het voordeel van de loonmatiging door aan de RSZ — bedoeld om het loonkostenvoordeel gelijk te verdelen tussen overheid en werkgever. De voorlopige geconsolideerde bijdrage wordt volgens de RSZ voor het eerst geïnd in het derde kwartaal van 2027.",
      },
      {
        type: "p",
        text: "In de privésector begonnen in juni tien paritaire comités, ongeveer 52.000 voltijdse jobs. Het grootste comité van het land, PC 200, ruim een half miljoen bedienden, indexeert pas in januari — geraamd op ongeveer 4 procent. Publieke sector en uitkeringen: eerste toepassing in september 2026, drie maanden na de spilindexoverschrijding van juni.",
      },
      {
        type: "note",
        text: "Orakelboekregel 1 blijft open tot 5 oktober 2026. De wetgevende onzekerheid is weg; wat resteert is of september inderdaad 2 procent toepast volgens deze modaliteit.",
      },
    ],
    sources: [
      { label: "Programmawet van 30 mei 2026", retrieved: "2026-08-17" },
      { label: "RSZ, administratieve instructies 2026/2, bijzondere loonmatigingsbijdrage", retrieved: "2026-08-17" },
      { label: "Nationale Arbeidsraad, advies 2484", url: "https://cnt-nar.be/", retrieved: "2026-08-17" },
      { label: "VVSG, 24 juli 2026", retrieved: "2026-08-17" },
      { label: "VRT NWS 29 mei 2026; Deloitte Legal via Lexgo 9 juni 2026", retrieved: "2026-08-17" },
    ],
    figures: [
      { label: "Inwerkingtreding", value: "1 juni 2026", source: "Programmawet", kind: "feit" },
      { label: "Eerste publieke toepassing", value: "september 2026", source: "VVSG / Planbureau", kind: "feit" },
      { label: "Besparing 2026", value: "€272 mln", source: "regering, via aprildossier", kind: "feit" },
    ],
  },
  {
    slug: "meet-de-geldgroei-twee-keer",
    kicker: "Methode · Verenigde Staten",
    title: "Meet de geldgroei twee keer",
    dek: "De Fed wijzigde M2 in juli 2026. Het signaal van 5,5 procent houdt stand in de reeks die die wijziging niet raakt. Daarom meten wij elke seizoensgecorrigeerde reeks altijd dubbel.",
    desk: "methode",
    edition: 1,
    published: "2026-08-18",
    author: "Redactie Kapitaalkrant",
    lead: false,
    readingMinutes: 4,
    image: {
      src: "/images/m2-twee-keer.webp",
      alt: "Twee koperen weegschalen in een telkamer, dezelfde stapel munten twee keer gewogen.",
      caption:
        "M2SL naast M2NS. Wijkt het beeld af, dan is dat het verhaal.",
    },
    body: [
      {
        type: "p",
        text: "Op 23 juni 2026 kondigde de Federal Reserve aan dat vanaf de H.6-release van 28 juli IRA- en Keogh-saldi niet meer op componentniveau maar op aggregaatniveau uit M2 worden genetteerd. Gevolg volgens de Fed: niet-gecorrigeerde M2 blijft ongewijzigd, seizoensgecorrigeerde M2 krijgt kleine revisies.",
      },
      {
        type: "p",
        text: "Ons voorpaginastuk steunt op M2SL — de gecorrigeerde reeks. Dus is getoetst tegen M2NS, de ongecorrigeerde tegenhanger.",
      },
      {
        type: "table",
        caption: "FRED M2SL en M2NS, opgehaald 17 augustus 2026.",
        headers: ["Maat", "juni 2026 j/j", "december 2025 j/j"],
        rows: [
          ["M2SL (gecorrigeerd)", "+5,53%", "+4,04%"],
          ["M2NS (ongecorrigeerd)", "+5,55%", "+4,09%"],
        ],
      },
      {
        type: "p",
        text: "De versnelling van ongeveer 4 naar 5,5 procent staat in beide reeksen, ook in de reeks die de methodologiewijziging niet raakt. Het signaal is geen artefact. Wel geldt: de zesmaands-geannualiseerde 7,3 procent is alleen op gecorrigeerde data zinvol te berekenen — op NSA-data zit er seizoenspatroon in. Dat cijfer blijft dus afhankelijk van de herziene M2SL-reeks. Dat is nu expliciet.",
      },
      {
        type: "p",
        text: "Sindsdien is dit huisregel. Elke seizoensgecorrigeerde reeks wordt vóór duiding naast zijn ongecorrigeerde tegenhanger gelegd. Wijkt het beeld af, dan is dat het verhaal. Hetzelfde geldt voor etiketten: het woord kerninflatie gebruiken wij alleen zoals de publicerende instelling het gebruikt. In België is dat 3,13 procent, niet de eurozone-stijl 3,67.",
        kind: "duiding",
      },
      {
        type: "note",
        text: "De volgende H.6-release in onze kalender was 25 augustus 2026. Deze editie sluit op de vloer van 18 augustus. Een volgende editie verlengt de reeks.",
      },
    ],
    sources: [
      { label: "Federal Reserve H.6-aankondiging 23 juni 2026", url: "https://www.federalreserve.gov/feeds/h6.html", retrieved: "2026-08-17" },
      { label: "FRED M2SL", url: "https://fred.stlouisfed.org/series/M2SL", retrieved: "2026-08-17" },
      { label: "FRED M2NS", url: "https://fred.stlouisfed.org/series/M2NS", retrieved: "2026-08-17" },
    ],
    figures: [
      { label: "M2SL j/j juni 2026", value: "+5,53%", source: "FRED", kind: "feit" },
      { label: "M2NS j/j juni 2026", value: "+5,55%", source: "FRED", kind: "feit" },
    ],
  },
  {
    slug: "euro-onder-water",
    kicker: "Eurozone · Rente",
    title: "Wie euro’s aanhoudt, staat onder water",
    dek: "De reproduceerbare HICP-reeks staat in juni op 2,7 procent. De ECB-headline voor juli is 2,9. De korte rente ligt daaronder.",
    desk: "eurozone",
    edition: 1,
    published: "2026-08-18",
    author: "Redactie Kapitaalkrant",
    lead: false,
    readingMinutes: 4,
    image: {
      src: "/images/euro-onder-water.webp",
      alt: "Eurobiljetten en munten zakken langzaam in stil water, gezien van vlak onder het oppervlak.",
      caption:
        "Korte rente onder de inflatie: wie cash aanhoudt, levert reëel in.",
    },
    body: [
      {
        type: "p",
        text: "Voor de eurozone heeft deze krant twee lagen, en die mogen niet door elkaar lopen. De FRED-spiegel van Eurostat — reeks CP0000EZ19M086NEST — loopt tot juni 2026 en staat op 2,7 procent jaar-op-jaar. De ECB-homepage noemde op 17 augustus een juli-HICP van 2,9 procent, M3-groei van 3,3 procent, een €STR van 2,189 procent en een overheidsschuld van 88,9 procent bbp. Die laatste vier zijn headlines: één peilmoment, geen CSV in onze vloer.",
      },
      {
        type: "p",
        text: "Met de headline-rente en de headline-inflatie is de ruwe reële korte rente ongeveer min 0,7 procent. Met alleen de reeks (juni 2,7 tegen een €STR die toen al onder de 2,2 lag) is het beeld hetzelfde van teken: wie cash aanhoudt, levert in.",
      },
      {
        type: "p",
        text: "Dat is de eurozone-poot van het voorpaginastuk. Wij publiceren hem apart omdat een lezer die alleen de marktpagina opent anders 2,7 ziet, het voorpaginastuk 2,9, en denkt dat één van beide een tikfout is. Het is een verschil van bronlaag.",
        kind: "duiding",
      },
      {
        type: "note",
        text: "De ECB-CSV-API is vanaf deze redactie viermaal getest en viermaal dood. Tot die route leeft, blijft de FRED-spiegel de vloer en de homepage de headline.",
      },
    ],
    steenman: {
      objection:
        "Min 0,7 procent is geen crisis. De ECB mikt op 2 procent inflatie; 2,7 tot 2,9 is de laatste kilometer, geen regimewissel. En headlines wegzetten als minderwaardig is pietluttig als het de officiële publicatie van de bank zelf is.",
      antwoord:
        "De officiële publicatie telt. Daarom staat ze in het stuk. Ze telt alleen niet als reeks, omdat wij haar morgen niet kunnen narekenen zonder opnieuw de homepage te scrapen. Het teken van de reële rente hangt daar niet van af.",
    },
    sources: [
      { label: "FRED CP0000EZ19M086NEST", url: "https://fred.stlouisfed.org/series/CP0000EZ19M086NEST", retrieved: "2026-08-17" },
      { label: "ECB Data Portal-homepage", url: "https://data.ecb.europa.eu/", retrieved: "2026-08-17" },
    ],
    figures: [
      { label: "HICP EZ j/j (reeks, juni)", value: "+2,7%", source: "FRED", kind: "feit" },
      { label: "HICP EZ j/j (headline, juli)", value: "2,9%", source: "ECB-homepage", kind: "feit" },
      { label: "€STR", value: "2,189%", source: "ECB-homepage 14-08-2026", kind: "feit" },
    ],
  },
];
