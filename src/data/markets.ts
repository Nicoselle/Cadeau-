import { EDITION } from "@/data/edition";
import {
  annualizedGrowth,
  lastObservation,
  observations,
  round1,
  round2,
  sparkValues,
  yoyGrowth,
} from "@/lib/series";
import { formatPct, formatPlainNumber } from "@/lib/format";
import type { MarketTile } from "@/types/newspaper";

export type MarketBoard = {
  asOf: string;
  tiles: MarketTile[];
  notes: string[];
};

export function getMarketBoard(): MarketBoard {
  const m2sl = observations("fred_M2SL_2019-2026.csv");
  const m2ns = observations("fred_M2NS_2024-2026.csv");
  const cpiUs = observations("fred_CPIAUCSL_2019-2026.csv");
  const hicpEz = observations("fred_HICP_EZ_2019-2026.csv");
  const hicpBe = observations("fred_HICP_BE_2019-2026.csv");
  const dff = observations("fred_DFF_breekpunten_2025-2026.csv");
  const dgs10 = observations("fred_DGS10_2025-06_2026-08.csv");
  const dgs30 = observations("fred_DGS30_2026-07_2026-08.csv");
  const breakeven = observations("fred_T10YIE_2025-06_2026-08.csv");
  const spx = observations("fred_SP500_2026-07_2026-08.csv");
  const vix = observations("fred_VIXCLS_2026-07_2026-08.csv");
  const beCpi = observations(
    "statbel_cpi_gezondheidsindex_2025-07_2026-07.csv",
    "globale_index",
  );
  const beHealth = observations(
    "statbel_cpi_gezondheidsindex_2025-07_2026-07.csv",
    "gezondheidsindex",
  );
  const beSmoothed = observations(
    "statbel_cpi_gezondheidsindex_2025-07_2026-07.csv",
    "afgevlakte_gezondheidsindex",
  );
  const debt = observations("treasury_debt_to_penny_2026-08.csv", "total_public_debt_usd");
  const brent = observations("fred_DCOILBRENTEU_2025-01_2026-08.csv");
  const wti = observations("fred_DCOILWTICO_2025-01_2026-08.csv");
  const copper = observations("fred_PCOPPUSDM_2024-01_2026-07.csv");
  const uranium = observations("fred_PURANUSDM_2024-01_2026-07.csv");

  const m2Yoy = yoyGrowth(m2sl);
  const m2nsYoy = yoyGrowth(m2ns);
  const m2Ann6 = annualizedGrowth(m2sl, 6);
  const cpiYoy = yoyGrowth(cpiUs);
  const ezYoy = yoyGrowth(hicpEz);
  const beFredYoy = yoyGrowth(hicpBe);
  const beNatYoy = yoyGrowth(beCpi);
  const beHealthYoy = yoyGrowth(beHealth);

  const lastDff = lastObservation(dff);
  const lastDgs10 = lastObservation(dgs10);
  const lastDgs30 = lastObservation(dgs30);
  const lastBe = lastObservation(breakeven);
  const lastSpx = lastObservation(spx);
  const lastVix = lastObservation(vix);
  const lastDebt = lastObservation(debt);
  const lastSmoothed = lastObservation(beSmoothed);
  const lastBrent = lastObservation(brent);
  const lastWti = lastObservation(wti);
  const lastCopper = lastObservation(copper);
  const lastUranium = lastObservation(uranium);
  const brentYoy = yoyGrowth(brent);
  const wtiYoy = yoyGrowth(wti);
  const copperYoy = yoyGrowth(copper);
  const uraniumYoy = yoyGrowth(uranium);

  const spread =
    lastDff && lastDgs10 ? lastDgs10.value - lastDff.value : null;

  const tiles: MarketTile[] = [
    {
      id: "m2",
      label: "M2 VS, j/j",
      value: m2Yoy == null ? "—" : formatPct(round1(m2Yoy)),
      detail: `SA ${m2Yoy == null ? "—" : formatPct(round2(m2Yoy), 2)} · NSA ${m2nsYoy == null ? "—" : formatPct(round2(m2nsYoy), 2)}${m2Ann6 == null ? "" : ` · 6m ann. ${formatPct(round1(m2Ann6 * 100))}`}`,
      seriesFile: "fred_M2SL_2019-2026.csv",
      asOf: lastObservation(m2sl)?.date ?? EDITION.asOf,
      spark: sparkValues(m2sl, 24),
    },
    {
      id: "cpi-us",
      label: "CPI VS, j/j",
      value: cpiYoy == null ? "—" : formatPct(round1(cpiYoy)),
      detail: "FRED CPIAUCSL, seizoensgecorrigeerd. Oktober 2025 ontbreekt in de bron.",
      seriesFile: "fred_CPIAUCSL_2019-2026.csv",
      asOf: lastObservation(cpiUs)?.date ?? EDITION.asOf,
      spark: sparkValues(cpiUs, 24),
    },
    {
      id: "hicp-ez",
      label: "HICP eurozone, j/j",
      value: ezYoy == null ? "—" : formatPct(round1(ezYoy)),
      detail: "FRED-spiegel van Eurostat, t/m juni. ECB-homepage noemde juli 2,9% — dat is een headline, geen reeks in onze vloer.",
      seriesFile: "fred_HICP_EZ_2019-2026.csv",
      asOf: lastObservation(hicpEz)?.date ?? EDITION.asOf,
      spark: sparkValues(hicpEz, 24),
    },
    {
      id: "cpi-be",
      label: "CPI België, j/j",
      value: beNatYoy == null ? "—" : formatPct(round1(beNatYoy)),
      detail: `Nationale CPI. Gezondheidsindex ${beHealthYoy == null ? "—" : formatPct(round1(beHealthYoy))} · HICP-spiegel juni ${beFredYoy == null ? "—" : formatPct(round1(beFredYoy))}`,
      seriesFile: "statbel_cpi_gezondheidsindex_2025-07_2026-07.csv",
      asOf: lastObservation(beCpi)?.date ?? EDITION.asOf,
      spark: sparkValues(beCpi, 13),
    },
    {
      id: "spil",
      label: "Afgevlakte gezondheidsindex",
      value: lastSmoothed ? formatPlainNumber(lastSmoothed.value, 2) : "—",
      detail: "Spilindex 100,28 overschreden in juni 2026. Volgende drempel 102,29.",
      seriesFile: "statbel_cpi_gezondheidsindex_2025-07_2026-07.csv",
      asOf: lastSmoothed?.date ?? EDITION.asOf,
      spark: sparkValues(beSmoothed, 13),
    },
    {
      id: "dff",
      label: "Fed funds",
      value: lastDff ? `${formatPlainNumber(lastDff.value, 2)}%` : "—",
      detail: "Effectieve beleidsrente. Verlaagd van 4,33% (september 2025) naar 3,63%.",
      seriesFile: "fred_DFF_breekpunten_2025-2026.csv",
      asOf: lastDff?.date ?? EDITION.asOf,
      spark: sparkValues(dff, 19),
    },
    {
      id: "dgs10",
      label: "VS 10-jaars",
      value: lastDgs10 ? `${formatPlainNumber(lastDgs10.value, 2)}%` : "—",
      detail: spread == null ? "Tienjaars staatsrente." : `Spread t.o.v. Fed funds ${formatPct(round2(spread), 2)}`,
      seriesFile: "fred_DGS10_2025-06_2026-08.csv",
      asOf: lastDgs10?.date ?? EDITION.asOf,
      spark: sparkValues(dgs10, 40),
    },
    {
      id: "dgs30",
      label: "VS 30-jaars",
      value: lastDgs30 ? `${formatPlainNumber(lastDgs30.value, 2)}%` : "—",
      detail: "Lange kant van de curve.",
      seriesFile: "fred_DGS30_2026-07_2026-08.csv",
      asOf: lastDgs30?.date ?? EDITION.asOf,
      spark: sparkValues(dgs30, 33),
    },
    {
      id: "breakeven",
      label: "10j breakeven",
      value: lastBe ? `${formatPlainNumber(lastBe.value, 2)}%` : "—",
      detail: "Marktverwachting inflatie over tien jaar. Gemeten CPI ligt hoger.",
      seriesFile: "fred_T10YIE_2025-06_2026-08.csv",
      asOf: lastBe?.date ?? EDITION.asOf,
      spark: sparkValues(breakeven, 40),
    },
    {
      id: "spx",
      label: "S&P 500",
      value: lastSpx ? formatPlainNumber(lastSpx.value, 2) : "—",
      detail: "Dagslot, FRED SP500.",
      seriesFile: "fred_SP500_2026-07_2026-08.csv",
      asOf: lastSpx?.date ?? EDITION.asOf,
      spark: sparkValues(spx, 34),
    },
    {
      id: "vix",
      label: "VIX",
      value: lastVix ? formatPlainNumber(lastVix.value, 2) : "—",
      detail: "Impliciete volatiliteit.",
      seriesFile: "fred_VIXCLS_2026-07_2026-08.csv",
      asOf: lastVix?.date ?? EDITION.asOf,
      spark: sparkValues(vix, 32),
    },
    {
      id: "brent",
      label: "Brent, vat",
      value: lastBrent ? `${formatPlainNumber(lastBrent.value, 2)} $` : "—",
      detail: `EIA via FRED, dagslot. Jaar-op-jaar ${brentYoy == null ? "—" : formatPct(round1(brentYoy))}${lastWti ? ` · WTI ${formatPlainNumber(lastWti.value, 2)} $` : ""}${wtiYoy == null ? "" : ` (${formatPct(round1(wtiYoy))} j/j)`}.`,
      seriesFile: "fred_DCOILBRENTEU_2025-01_2026-08.csv",
      asOf: lastBrent?.date ?? EDITION.asOf,
      spark: sparkValues(brent, 40),
    },
    {
      id: "koper",
      label: "Koper, ton",
      value: lastCopper ? `${formatPlainNumber(lastCopper.value, 2)} $` : "—",
      detail: `IMF-wereldprijs via FRED, maandreeks, dollar per metrische ton. Jaar-op-jaar ${copperYoy == null ? "—" : formatPct(round1(copperYoy))}.`,
      seriesFile: "fred_PCOPPUSDM_2024-01_2026-07.csv",
      asOf: lastCopper?.date ?? EDITION.asOf,
      spark: sparkValues(copper, 24),
    },
    {
      id: "uranium",
      label: "Uranium, pond",
      value: lastUranium ? `${formatPlainNumber(lastUranium.value, 2)} $` : "—",
      detail: `IMF-wereldprijs via FRED, maandreeks, dollar per pond (U3O8). Jaar-op-jaar ${uraniumYoy == null ? "—" : formatPct(round1(uraniumYoy))}.`,
      seriesFile: "fred_PURANUSDM_2024-01_2026-07.csv",
      asOf: lastUranium?.date ?? EDITION.asOf,
      spark: sparkValues(uranium, 24),
    },
    {
      id: "ust-debt",
      label: "VS-staatsschuld",
      value: lastDebt ? `${formatPlainNumber(lastDebt.value / 1e12, 2)} bln $` : "—",
      detail: "Treasury Debt to the Penny, totaal.",
      seriesFile: "treasury_debt_to_penny_2026-08.csv",
      asOf: lastDebt?.date ?? EDITION.asOf,
      spark: sparkValues(debt, 5),
    },
  ];

  return {
    asOf: EDITION.asOf,
    tiles,
    notes: [
      "Elk cijfer is herberekend uit de opgeslagen CSV in redactie/data. Geen live-feed.",
      "Seizoensgecorrigeerde reeksen worden altijd naast hun ongecorrigeerde tegenhanger gelegd.",
      "Bekendmakingen van de ECB-startpagina (M3, €STR, juli-HICP) staan in de stukken als bekendmaking, niet als reeks.",
      "Olie is een dagreeks (Brent en WTI). Koper en uranium zijn maandreeksen van het IMF.",
    ],
  };
}
