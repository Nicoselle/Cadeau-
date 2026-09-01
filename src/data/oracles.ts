import type { OracleClaim } from "@/types/newspaper";

export const oracles: OracleClaim[] = [
  {
    id: 1,
    statement:
      "De sociale uitkeringen en overheidswedden worden in september 2026 met 2% geïndexeerd volgens de centenindex-modaliteit (schijf tot €2.000 voor uitkeringen en pensioenen, €4.000 voor lonen).",
    origin: "Planbureau; Programmawet 30 mei 2026",
    recorded: "2026-08-17",
    expires: "2026-09-30",
    testDate: "2026-10-05",
    outcome: "open",
    confidence: "hoog",
    notes:
      "De wet is in werking sinds 1 juni 2026. Wat resteert is de feitelijke toepassing in september.",
  },
  {
    id: 2,
    statement:
      "De spilindex 102,29 (basis 2025) wordt overschreden in december 2026 (afgevlakte gezondheidsindex december 2026 ≥ 102,29).",
    origin: "Planbureau-raming; drempel bevestigd door Statbel 30-07-2026",
    recorded: "2026-08-17",
    expires: "2027-01-05",
    testDate: "2027-01-10",
    outcome: "open",
    confidence: "midden",
  },
  {
    id: 3,
    statement:
      "De Belgische inflatie (nationale CPI) komt in 2026 gemiddeld uit op 3,4% (±0,3 procentpunt).",
    origin: "Planbureau-raming, vintage 02-06-2026",
    recorded: "2026-08-17",
    expires: "2027-01-15",
    testDate: "2027-01-20",
    outcome: "open",
    confidence: "midden",
  },
  {
    id: 4,
    statement: "De spilindex 104,34 wordt overschreden in oktober 2027.",
    origin: "Planbureau-raming",
    recorded: "2026-08-17",
    expires: "2027-11-05",
    testDate: "2027-11-10",
    outcome: "open",
    confidence: "laag",
  },
  {
    id: 5,
    statement:
      "Zolang de Amerikaanse M2-groei boven 5% j/j blijft en de reële beleidsrente rond of onder nul, zakt de Amerikaanse CPI-inflatie (j/j) niet duurzaam onder 3,0% — geen twee opeenvolgende maanden onder 3,0% vóór januari 2027.",
    origin: "Kapitaalkrant, duiding editie 1",
    recorded: "2026-08-17",
    expires: "2027-01-15",
    testDate: "2027-01-20",
    outcome: "open",
    confidence: "laag",
  },
  {
    id: 6,
    statement:
      "De eurozone-inflatie (HICP j/j) blijft tot en met december 2026 boven de ECB-doelstelling van 2,0%.",
    origin: "Kapitaalkrant, duiding editie 1",
    recorded: "2026-08-17",
    expires: "2027-01-10",
    testDate: "2027-01-15",
    outcome: "open",
    confidence: "midden",
  },
  {
    id: 7,
    statement:
      "De spread tussen de Amerikaanse beleidsrente (DFF) en de tienjaarsrente (DGS10) is op 31 december 2026 groter dan de +1,06 procentpunt van 6 augustus 2026.",
    origin: "Kapitaalkrant, meetnotitie lange rente",
    recorded: "2026-08-17",
    expires: "2026-12-31",
    testDate: "2027-01-05",
    outcome: "open",
    confidence: "laag",
    notes:
      "Bewust als verliesbare inzet: als de spread aftopt wint de disinflatielezing.",
  },
];
