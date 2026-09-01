import type { Article } from "@/types/newspaper";

/** Open nieuwsbrief, 1 september 2026. Alleen wat gezien is. Geen volglijst, geen allocatie. */
export const CONJUNCTUUR_1_SEPTEMBER: Article = {
  slug: "conjunctuur-1-september",
  kicker: "Conjunctuur-brief · 1 september",
  title: "De tweejaars houdt vrijdag, de lange kant schuift drie punten",
  dek: "CMT van 31 augustus: 2 jaar 4,34 procent, gelijk aan vrijdag. Tien, twintig en dertig jaar +2 tot +3 basispunten. CMT van 1 september bestaat nog niet. Geen nieuwe buybackkalender.",
  desk: "conjunctuur",
  published: "2026-09-01",
  author: "Redactie Kapitaalkrant",
  lead: true,
  readingMinutes: 8,
  image: {
    src: "/images/lange-rente.webp",
    alt: "Een locomotief weigert te keren terwijl het spoor de mist in stijgt en een seinarm omlaag wijst.",
    caption:
      "De korte kant blijft staan. De lange kant schuift. Twee dagen, één tabel, geen weekendrij.",
  },
  body: [
    {
      type: "p",
      text: "Op 1 september 2026, Europe/Brussels, is de laatste Daily Treasury Par Yield Curve die van 31 augustus. De septembertabel van het Treasury geeft No Results Found. Er is geen rij voor 29 of 30 augustus: weekend. Wie een CMT van vandaag verkoopt, verzint een waarneming.",
    },
    {
      type: "p",
      text: "Tegen vrijdag 28 augustus is de tweejaars gelijk. De langere looptijden zijn twee tot drie basispunten hoger. Dat is het feit. Wat het betekent, staat verderop als lezing, niet als feit.",
      kind: "feit",
    },
    {
      type: "table",
      caption:
        "CMT Daily Treasury Par Yield Curve. Bon: Treasury TextView, maand 202608. Geen rij 29/30 augustus. Geen CMT 1 september.",
      headers: ["Looptijd", "28 augustus", "31 augustus", "Verschil"],
      rows: [
        ["2 jaar", "4,34%", "4,34%", "0 bp"],
        ["10 jaar", "4,73%", "4,75%", "+2 bp"],
        ["20 jaar", "5,21%", "5,24%", "+3 bp"],
        ["30 jaar", "5,22%", "5,25%", "+3 bp"],
      ],
    },
    { type: "h2", text: "Buyback: nog altijd het schema van 5 augustus" },
    {
      type: "p",
      text: "De Tentative Buyback Schedule Q3 2026 is nog het PDF van 5 augustus. Liquidity-operaties: 10 tot 20 jaar op 9 en 10 september, maximum 2 miljard. 20 tot 30 jaar op 23 en 24 september, maximum 2 miljard. Cash-management, 1 maand tot 2 jaar, aankondiging 3 en 9 september, maximum 12,5 miljard — dat is een ander loket. De laatste buyback-persmededeling is sb0607 van 19 augustus. Er is geen nieuwe kalender en geen buyback in de nieuwste PR.",
      kind: "feit",
    },
    {
      type: "p",
      text: "De nieuwste Treasury-PR is sb0618, 31 augustus: voorlopige TIC, ongeveer 19,3 biljoen dollar Amerikaanse vorderingen op buitenlands papier (aandelen 15,3; lang 3,6; kort 0,4), tegen 15,8 eind 2024. De finale survey staat op 30 oktober 2026. Dat is geen inkoop van Treasuries.",
      kind: "feit",
    },
    { type: "h2", text: "Schuld: 28 augustus, geen 31 augustus" },
    {
      type: "table",
      caption:
        "Debt to the Penny, Fiscal Data API, gesorteerd op record_date. Geen stand van 31 augustus in de tien jongste rijen die wij zagen.",
      headers: ["Datum", "Totaal", "Publiek", "Intragovernmental"],
      rows: [
        [
          "28 augustus",
          "40.104.097.482.666,58",
          "32.340.688.588.401,83",
          "7.763.408.894.264,75",
        ],
        ["27 augustus", "40.077.529.831.942,94", "—", "—"],
      ],
    },
    {
      type: "p",
      text: "De stand blijft boven 40 biljoen. Wie 31 augustus invult, heeft een rij die deze API ons niet gaf.",
      kind: "feit",
    },
    {
      type: "p",
      text: "Op de homepage van de Belgian Debt Agency: federale schuld 31 juli 574.989.793.704 euro. De Belgische 10-jaars 3,83 procent, datum 31.08.2026. Maandag: 3,81 procent, datum 28.08.2026. OLO-resultaten van 24 augustus gaven HTTP 403; die pagina is niet gezien. Op 1 september stond geen nieuwe OLO-veiling op de homepage.",
      kind: "feit",
    },
    { type: "h2", text: "Olie: twee referenties, geen artikel van vandaag" },
    {
      type: "p",
      text: "CNBC schreef op 31 augustus dat Brent boven de 90 dollar sprong na Larak Island. In dat stuk: WTI-settle 85,76 dollar (+2,8 procent); Brent, gelabeld September delivery, gesloten 90,49 dollar (+2,7 procent). Op 1 september, delayed quotepagina: WTI October 2026 86,97 (vorige 85,76, expiratie 2026-09-22); ICE Brent November 2026 91,48 (vorige 90,49, expiratie 2026-09-30). Er is geen aparte CNBC-pagina van 1 september over Hormuz.",
      kind: "feit",
    },
    {
      type: "table",
      caption:
        "Twee referenties. Artikel-settle 31 augustus versus delayed quote 1 september. Geen live-slot.",
      headers: ["Contract", "31 augustus (artikel)", "1 september (quote, delayed)"],
      rows: [
        ["WTI", "85,76 $ (settle)", "86,97 $ · Oct ’26"],
        ["ICE Brent", "90,49 $ · Sep delivery", "91,48 $ · Nov ’26"],
      ],
    },
    { type: "h2", text: "Goud en zilver: Kitco-bid, geen officieel slot" },
    {
      type: "p",
      text: "Kitco, 1 september ongeveer 07:13 CEST. Goud bid 4.429,70 dollar (−17,40 / −0,39 procent tegen Kitco-vorig slot), ask 4.431,70, range 4.424,80–4.462,40. Zilver bid 66,35 (−0,07 / −0,11 procent), ask 66,60, range 65,97–67,06. Maandagochtend, andere snapshot: goud 4.424,00 / zilver 66,26. Kitco AM 31 augustus near 4.438,20 / zilver 66,860; PM near 4.446,50 / 66,360. Kitco AM van 1 september is niet gezien. Officiële slotkoersen hebben wij niet.",
      kind: "feit",
    },
    { type: "h2", text: "Lezing — niet het feit" },
    {
      type: "p",
      text: "De tweejaars hield de vrijdagprint. Dat de langere looptijden twee tot drie basispunten opschoven, lezen wij als de prijs van tijd na de speech van de voorzitter, niet als een FOMC-besluit. De fed-funds-range blijft 3,50–3,75 tot 15–16 september. Drie punten op de dertigjaars is geen bewijs dat de buyback faalt: 9 september is niet begonnen. TIC 19,3 biljoen is een Amerikaanse vordering op buitenlands papier, geen inkoop van Treasuries. De Belgische 10-jaars plus twee basispunten is een andere emittent. Olie boven de maandagsettle prijst een storing, geen bewijs dat Hormuz dicht is. Goud staat iets boven de maandagochtend en ver onder de vrijdagochtend van 4.582,60.",
      kind: "duiding",
    },
    {
      type: "note",
      text: "Niet gezien, daarom niet ingevuld: CMT 1 september; een buybackkalender met 4 miljard; Debt to the Penny 31 augustus; ISM Manufacturing PMI augustus; Eurostat-flash HICP augustus; S&P Global final PMI; Fed speech-index; BLS JOLTS; ECB-perslijst; Kansas City Fed; Kitco AM 1 september; een CNBC-oliestuk van 1 september; X-tape (API 403). Geen FT, WSJ, Bloomberg, Economist, Statbel of NBB in deze brief.",
    },
    {
      type: "quote",
      text: "Een tabel die No Results Found zegt, is een peil. Een cijfer van een dag die niet bestaat, is dat niet.",
    },
  ],
  steenman: {
    objection:
      "Kitco-bids en delayed CNBC-quotes zijn geen officiële slots. Wie die naast een CMT-tabel zet, mengt een scherm met een overheidstabel. En TIC 19,3 biljoen klinkt als buitenlandse vraag naar Amerikaans papier — dat hoort bij de buyback.",
    antwoord:
      "Daarom staan twee oliereferenties, met datum en etiket, en Kitco als bid/ask, niet als slot. TIC sb0618 is een vordering op buitenlands papier. De buybackkalender is nog het PDF van 5 augustus. Wie die twee tot één verhaal smeedt, verzint een loket.",
  },
  sources: [
    {
      label: "Treasury CMT TextView, augustus 2026",
      url: "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202608&type=daily_treasury_yield_curve",
      retrieved: "2026-09-01",
    },
    {
      label: "Tentative Buyback Schedule Q3 2026",
      url: "https://home.treasury.gov/system/files/221/Tentative-Buyback-ScheduleQ32026.pdf",
      retrieved: "2026-09-01",
      vintage: "publicatie 5 augustus 2026",
    },
    {
      label: "Treasury press releases",
      url: "https://home.treasury.gov/news/press-releases",
      retrieved: "2026-09-01",
    },
    {
      label: "Treasury PR sb0618 (TIC, voorlopig)",
      url: "https://home.treasury.gov/news/press-releases/sb0618",
      retrieved: "2026-09-01",
    },
    {
      label: "Debt to the Penny API",
      url: "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?sort=-record_date&page[size]=10",
      retrieved: "2026-09-01",
    },
    {
      label: "Belgian Debt Agency homepage",
      url: "https://www.debtagency.be/en",
      retrieved: "2026-09-01",
    },
    {
      label: "CNBC, 31 augustus — Brent after Larak Island",
      url: "https://www.cnbc.com/2026/08/31/oil-prices-hormuz-iran-larak-island-centcom.html",
      retrieved: "2026-09-01",
    },
    {
      label: "CNBC quote WTI",
      url: "https://www.cnbc.com/quotes/@CL.1",
      retrieved: "2026-09-01",
    },
    {
      label: "CNBC quote ICE Brent",
      url: "https://www.cnbc.com/quotes/@LCO.1",
      retrieved: "2026-09-01",
    },
    {
      label: "Kitco goud",
      url: "https://www.kitco.com/charts/gold",
      retrieved: "2026-09-01",
    },
    {
      label: "Kitco zilver",
      url: "https://www.kitco.com/charts/silver",
      retrieved: "2026-09-01",
    },
  ],
  figures: [
    { label: "CMT 2j, 31 augustus", value: "4,34%", source: "Treasury CMT", kind: "feit" },
    { label: "CMT 10j, 31 augustus", value: "4,75%", source: "Treasury CMT", kind: "feit" },
    { label: "CMT 30j, 31 augustus", value: "5,25%", source: "Treasury CMT", kind: "feit" },
    { label: "VS-schuld, 28 augustus", value: "40.104.097.482.666,58", source: "Debt to the Penny", kind: "feit" },
    { label: "BE federale schuld, 31 juli", value: "574.989.793.704 €", source: "debtagency.be", kind: "feit" },
    { label: "BE 10j, 31 augustus", value: "3,83%", source: "debtagency.be", kind: "feit" },
    { label: "Brent, 31 augustus artikel", value: "90,49 $", source: "CNBC", kind: "feit" },
    { label: "Goud Kitco bid, 1 sep ~07:13", value: "4.429,70 $", source: "Kitco", kind: "feit" },
  ],
};
