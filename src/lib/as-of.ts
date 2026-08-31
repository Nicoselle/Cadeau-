import { observations, lastOnOrBefore, yoyGrowth, monthKey, round1, round2 } from "@/lib/series";
import { formatPlainNumber, formatPct } from "@/lib/format";

export type NamedPrint = {
  id: string;
  label: string;
  date: string;
  value: number;
  display: string;
  seriesFile: string;
};

export type DaySnapshot = {
  date: string;
  prints: NamedPrint[];
  real10y: { date: string; value: number; display: string } | null;
  m2Vintage: "editie" | "2026-08-31";
};

const WEEKDAYS_AUGUST_2026 = [
  "2026-08-03",
  "2026-08-04",
  "2026-08-05",
  "2026-08-06",
  "2026-08-07",
  "2026-08-10",
  "2026-08-11",
  "2026-08-12",
  "2026-08-13",
  "2026-08-14",
  "2026-08-17",
  "2026-08-18",
  "2026-08-19",
  "2026-08-20",
  "2026-08-21",
  "2026-08-24",
  "2026-08-25",
  "2026-08-26",
  "2026-08-27",
  "2026-08-28",
  "2026-08-31",
] as const;

export function augustWeekdays2026(): readonly string[] {
  return WEEKDAYS_AUGUST_2026;
}

function printOf(
  id: string,
  label: string,
  seriesFile: string,
  found: { date: string; value: number } | null,
  digits = 2,
  suffix = "",
): NamedPrint | null {
  if (!found) return null;
  return {
    id,
    label,
    date: found.date,
    value: found.value,
    display: `${formatPlainNumber(found.value, digits)}${suffix}`,
    seriesFile,
  };
}

function alignedReal10y(date: string) {
  const dgs = observations("fred_DGS10_2025-06_2026-08.csv");
  const be = observations("fred_T10YIE_2025-06_2026-08.csv");
  const lastDgs = lastOnOrBefore(dgs, date);
  if (!lastDgs) return null;
  const beSame = be.find((item) => item.date === lastDgs.date);
  if (!beSame) return null;
  const value = round2(lastDgs.value - beSame.value);
  return {
    date: lastDgs.date,
    value,
    display: `${formatPlainNumber(value, 2)}%`,
  };
}

export function snapshotOn(date: string): DaySnapshot {
  const useVintage = date >= "2026-08-25";
  const m2File = useVintage
    ? "fred_M2SL_vintage_2026-08-31.csv"
    : "fred_M2SL_2019-2026.csv";
  const m2nsFile = useVintage
    ? "fred_M2NS_vintage_2026-08-31.csv"
    : "fred_M2NS_2024-2026.csv";

  const m2 = observations(m2File);
  const brent = observations("fred_DCOILBRENTEU_2025-01_2026-08.csv");
  const copper = observations("fred_PCOPPUSDM_2024-01_2026-07.csv");
  const uranium = observations("fred_PURANUSDM_2024-01_2026-07.csv");
  const dgs10 = observations("fred_DGS10_2025-06_2026-08.csv");
  const dff = observations("fred_DFF_breekpunten_2025-2026.csv");
  const spx = observations("fred_SP500_2026-07_2026-08.csv");
  const vix = observations("fred_VIXCLS_2026-07_2026-08.csv");
  const cpi = observations("fred_CPIAUCSL_2019-2026.csv");

  const lastM2 = lastOnOrBefore(m2, date);
  const m2Month = lastM2 ? monthKey(lastM2.date) : undefined;
  const m2Yoy = m2Month ? yoyGrowth(m2, m2Month) : null;
  const m2nsYoy = m2Month ? yoyGrowth(observations(m2nsFile), m2Month) : null;

  const prints = [
    lastM2 && m2Yoy != null
      ? {
          id: "m2",
          label: "M2 VS, j/j",
          date: lastM2.date,
          value: round2(m2Yoy),
          display: `${formatPct(round1(m2Yoy))} SA${m2nsYoy == null ? "" : ` / ${formatPct(round2(m2nsYoy), 2)} NSA`}`,
          seriesFile: m2File,
        }
      : null,
    printOf("dgs10", "VS 10-jaars", "fred_DGS10_2025-06_2026-08.csv", lastOnOrBefore(dgs10, date), 2, "%"),
    printOf("dff", "Fed funds", "fred_DFF_breekpunten_2025-2026.csv", lastOnOrBefore(dff, date), 2, "%"),
    printOf("spx", "S&P 500", "fred_SP500_2026-07_2026-08.csv", lastOnOrBefore(spx, date), 2),
    printOf("vix", "VIX", "fred_VIXCLS_2026-07_2026-08.csv", lastOnOrBefore(vix, date), 2),
    printOf("brent", "Brent, vat", "fred_DCOILBRENTEU_2025-01_2026-08.csv", lastOnOrBefore(brent, date), 2, " $"),
    printOf("koper", "Koper, ton", "fred_PCOPPUSDM_2024-01_2026-07.csv", lastOnOrBefore(copper, date), 2, " $"),
    printOf("uranium", "Uranium, pond", "fred_PURANUSDM_2024-01_2026-07.csv", lastOnOrBefore(uranium, date), 2, " $"),
    printOf("cpi-us", "CPI VS", "fred_CPIAUCSL_2019-2026.csv", lastOnOrBefore(cpi, date), 3),
  ].filter((item): item is NamedPrint => Boolean(item));

  return {
    date,
    prints,
    real10y: alignedReal10y(date),
    m2Vintage: useVintage ? "2026-08-31" : "editie",
  };
}

export function buildAugustLedger(): DaySnapshot[] {
  return augustWeekdays2026().map((date) => snapshotOn(date));
}

export function printById(snapshot: DaySnapshot, id: string): NamedPrint | undefined {
  return snapshot.prints.find((item) => item.id === id);
}

export type AugustPieceRef = {
  href: string;
  slug: string;
  title: string;
};

/** 31 augustus houdt het bestaande stuk; de andere weekdagen hebben een terugwerkende mening. */
export function augustPieceFor(date: string): AugustPieceRef {
  if (date === "2026-08-31") {
    return {
      href: "/stuk/vat-liegt-minder-dan-de-index",
      slug: "vat-liegt-minder-dan-de-index",
      title: "Het vat liegt minder dan de index",
    };
  }
  return {
    href: `/stuk/mening-${date}`,
    slug: `mening-${date}`,
    title: `De mening ${date}`,
  };
}
