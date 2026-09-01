import type { Article } from "@/types/newspaper";
import { briefSlot } from "@/lib/desk-clock";

const slot = briefSlot("ochtend");

/** Ochtendbrief 1 september 2026, 8:00 Europe/Brussels. Alleen wat toen gezien is. */
export const CONJUNCTUUR_1_SEPTEMBER_OCHTEND: Article = {
  slug: "conjunctuur-1-september-ochtend",
  kicker: slot.kicker,
  title: "Kitco om 07:13, de CMT nog van maandag",
  dek: "Goud bid 4.429,70 rond 07:13 CEST. De laatste Treasury-curve is 31 augustus: tweejaars 4,34, tienjaars 4,75. De septembertabel blijft leeg.",
  desk: "conjunctuur",
  published: "2026-09-01",
  slot: "ochtend",
  author: "Redactie Kapitaalkrant",
  lead: false,
  readingMinutes: 6,
  image: {
    src: "/images/markten-vloer.webp",
    alt: "Een oude ticker en gestapelde registers op een datavloer, geen schermen.",
    caption:
      "Acht uur. De ochtendbid staat. De curve van vandaag nog niet.",
  },
  body: [
    {
      type: "p",
      text: "Dit is de ochtendbrief van 1 september 2026, 8:00 Europe/Brussels. Wat hier staat, is gezien vóór dit slot. De namiddagbrief sluit om 15:00 op dezelfde vloer, tenzij er een nieuwe rij bijkomt. Die rij is er om 8 uur niet.",
    },
    {
      type: "p",
      text: "Kitco, ongeveer 07:13 CEST. Goud bid 4.429,70 dollar (−17,40 / −0,39 procent tegen Kitco-vorig slot), ask 4.431,70, range 4.424,80–4.462,40. Zilver bid 66,35 (−0,07 / −0,11 procent), ask 66,60, range 65,97–67,06. Maandagochtend, andere snapshot: goud 4.424,00 / zilver 66,26. Kitco AM 31 augustus near 4.438,20 / zilver 66,860; PM near 4.446,50 / 66,360. Kitco AM van 1 september is niet gezien. Officiële slots hebben wij niet.",
      kind: "feit",
    },
    {
      type: "table",
      caption:
        "Kitco, 1 september ~07:13 CEST. Geen officieel slot. Geen Kitco AM van vandaag.",
      headers: ["Metaal", "Bid", "Ask", "Range"],
      rows: [
        ["Goud", "4.429,70 $", "4.431,70 $", "4.424,80–4.462,40"],
        ["Zilver", "66,35 $", "66,60 $", "65,97–67,06"],
      ],
    },
    { type: "h2", text: "De curve is nog die van 31 augustus" },
    {
      type: "p",
      text: "De Daily Treasury Par Yield Curve van 1 september bestaat niet. De septembertabel geeft No Results Found. Er is geen rij voor 29 of 30 augustus: weekend. Laatste print: 31 augustus. Tegen vrijdag 28 augustus is de tweejaars gelijk; de lange kant +2 tot +3 basispunten.",
      kind: "feit",
    },
    {
      type: "table",
      caption:
        "CMT Daily Treasury Par Yield Curve. Bon: Treasury TextView, maand 202608.",
      headers: ["Looptijd", "28 augustus", "31 augustus", "Verschil"],
      rows: [
        ["2 jaar", "4,34%", "4,34%", "0 bp"],
        ["10 jaar", "4,73%", "4,75%", "+2 bp"],
        ["20 jaar", "5,21%", "5,24%", "+3 bp"],
        ["30 jaar", "5,22%", "5,25%", "+3 bp"],
      ],
    },
    { type: "h2", text: "Wat verder op de ochtendtafel ligt" },
    {
      type: "p",
      text: "Buybackkalender: nog Tentative-Buyback-ScheduleQ32026.pdf, publicatie 5 augustus. Liquidity 10–20 jaar 9–10 september max 2 miljard; 20–30 jaar 23–24 september max 2 miljard. Cash-management 1 maand–2 jaar, aankondiging 3 en 9 september, max 12,5 miljard — ander loket. Laatste buyback-PR sb0607, 19 augustus. Nieuwste PR sb0618, 31 augustus: TIC voorlopig ±19,3 biljoen (aandelen 15,3; lang 3,6; kort 0,4) tegen 15,8 eind 2024. Finale survey 30 oktober 2026. Geen buyback. Geen nieuw schema.",
      kind: "feit",
    },
    {
      type: "p",
      text: "Debt to the Penny: 28 augustus 40.104.097.482.666,58 (publiek 32.340.688.588.401,83; intra 7.763.408.894.264,75). Vorige print 27 augustus 40.077.529.831.942,94. Geen stand 31 augustus. Nog boven 40 biljoen. Belgian Debt Agency: federale schuld 31 juli 574.989.793.704 euro. Belgische 10-jaars 3,83 procent, datum 31.08.2026; maandag 3,81 procent, datum 28.08.2026. OLO 24 augustus: HTTP 403, niet gezien. Geen nieuwe OLO-veiling op de homepage.",
      kind: "feit",
    },
    {
      type: "p",
      text: "Olie, CNBC 31 augustus: Brent jumps above $90 after Larak Island. Artikel-settle: WTI 85,76 (+2,8 procent); Brent, September delivery, gesloten 90,49 (+2,7 procent). Delayed quotepagina 1 september: WTI Oct ’26 86,97 (prev 85,76, exp 2026-09-22); ICE Brent Nov ’26 91,48 (prev 90,49, exp 2026-09-30). Twee referenties. Geen apart CNBC-stuk van 1 september over Hormuz.",
      kind: "feit",
    },
    {
      type: "p",
      text: "Lezing, niet het feit: de tweejaars hield vrijdag. De +2/+3 bp op de lange kant is de prijs van tijd na de speech van de voorzitter, geen FOMC-besluit. Funds-range 3,50–3,75 tot 15–16 september. Goud iets boven de maandagochtend, ver onder vrijdagochtend 4.582,60.",
      kind: "duiding",
    },
    {
      type: "note",
      text: "Volgende slot: 15:00. Niet gezien: CMT 1 september, Kitco AM 1 september, Debt to the Penny 31 augustus, een buybackkalender met 4 miljard, ISM, Eurostat-flash HICP, JOLTS, Fed speech-index.",
    },
    {
      type: "quote",
      text: "Acht uur weegt wat de nacht naliet. Vijftien uur zegt of de dag een rij bijlegde.",
    },
  ],
  steenman: {
    objection:
      "Een Kitco-bid van 07:13 is geen ochtendeditie. Zonder CMT van vandaag is dit de maandagbrief opnieuw.",
    antwoord:
      "Daarom heet het een ochtendpeil, geen nieuwe curve. De bid heeft een uur. De curve heeft 31 augustus. Wie 4,75 tot 1 september antedateert, liegt.",
  },
  sources: [
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
  ],
  figures: [
    { label: "Goud Kitco bid ~07:13", value: "4.429,70 $", source: "Kitco", kind: "feit" },
    { label: "Zilver Kitco bid ~07:13", value: "66,35 $", source: "Kitco", kind: "feit" },
    { label: "CMT 10j, 31 augustus", value: "4,75%", source: "Treasury CMT", kind: "feit" },
  ],
};
