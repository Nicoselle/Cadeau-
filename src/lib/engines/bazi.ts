import type { BaziResult, Element, Pillar } from "@/types/briefing";
import { gregorianToJdn } from "@/lib/engines/calendar";

const STEMS = ["Jia", "Yi", "Bing", "Ding", "Wu", "Ji", "Geng", "Xin", "Ren", "Gui"] as const;
const STEM_LABELS = [
  "Yang Hout",
  "Yin Hout",
  "Yang Vuur",
  "Yin Vuur",
  "Yang Aarde",
  "Yin Aarde",
  "Yang Metaal",
  "Yin Metaal",
  "Yang Water",
  "Yin Water",
] as const;
const STEM_ELEMENTS: Element[] = [
  "wood", "wood", "fire", "fire", "earth", "earth", "metal", "metal", "water", "water",
];

const BRANCHES = ["Zi", "Chou", "Yin", "Mao", "Chen", "Si", "Wu", "Wei", "Shen", "You", "Xu", "Hai"] as const;
const BRANCH_LABELS = [
  "Rat", "Os", "Tijger", "Konijn", "Draak", "Slang",
  "Paard", "Geit", "Aap", "Haan", "Hond", "Varken",
] as const;
const BRANCH_ELEMENTS: Element[] = [
  "water", "earth", "wood", "wood", "earth", "fire",
  "fire", "earth", "metal", "metal", "earth", "water",
];

const MONTH_STEM_START = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0];
const HOUR_STEM_START = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8];

export const ELEMENT_SECTORS: Record<Element, string[]> = {
  wood: ["opleidingen", "managementconsultancy", "personeelsbeleid", "leiderschapstrajecten"],
  fire: ["evenementen", "pers en reputatie", "slimme software", "energie", "horeca"],
  earth: ["onroerend goed", "projectontwikkeling", "bouw", "verzekeringen", "risicobeheer"],
  metal: ["banken", "financiële software", "accountancy", "ingenieurswerk", "apparatuur"],
  water: ["logistiek", "webwinkel en groothandel", "telecom", "havenhandel", "dranken"],
};

function pillar(stemIndex: number, branchIndex: number): Pillar {
  const stem = ((stemIndex % 10) + 10) % 10;
  const branch = ((branchIndex % 12) + 12) % 12;
  return {
    stem: STEMS[stem],
    stemLabel: STEM_LABELS[stem],
    branch: BRANCHES[branch],
    branchLabel: BRANCH_LABELS[branch],
    element: STEM_ELEMENTS[stem],
  };
}

export function solarLongitudeApprox(date: Date): number {
  const y = date.getUTCFullYear();
  const start = Date.UTC(y, 0, 1);
  const dayOfYear = (date.getTime() - start) / 86_400_000;
  return (280.46 + 0.9856474 * dayOfYear) % 360;
}

export function yearIndexAfterLichun(date: Date): number {
  const lon = solarLongitudeApprox(date);
  let year = date.getUTCFullYear();
  if (lon < 315 && date.getUTCMonth() < 2) {
    year -= 1;
  }
  return ((year - 1984) % 60 + 60) % 60;
}

export function monthBranchFromSolarLon(lon: number): number {
  const adjusted = (lon - 315 + 360) % 360;
  const idx = Math.floor(adjusted / 30);
  return [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1][idx] ?? 2;
}

export function dayIndex(year: number, month: number, day: number): number {
  const jdn = gregorianToJdn(year, month, day);
  return ((jdn + 49) % 60 + 60) % 60;
}

export function hourBranch(hour: number, minute: number): number {
  const total = hour + minute / 60;
  if (total >= 23 || total < 1) return 0;
  return Math.floor((total + 1) / 2);
}

export function computeBazi(utcDate: Date, localHour: number, localMinute: number): BaziResult {
  const yearIdx = yearIndexAfterLichun(utcDate);
  const yearStem = yearIdx % 10;
  const yearBranch = yearIdx % 12;

  const lon = solarLongitudeApprox(utcDate);
  const monthBranch = monthBranchFromSolarLon(lon);
  const yinOffset = (monthBranch - 2 + 12) % 12;
  const monthStem = MONTH_STEM_START[yearStem] + yinOffset;

  const dayIdx = dayIndex(utcDate.getUTCFullYear(), utcDate.getUTCMonth() + 1, utcDate.getUTCDate());
  const dayStem = dayIdx % 10;
  const dayBranch = dayIdx % 12;

  const hBranch = hourBranch(localHour, localMinute);
  const hourStem = HOUR_STEM_START[dayStem] + hBranch;

  const year = pillar(yearStem, yearBranch);
  const month = pillar(monthStem, monthBranch);
  const day = pillar(dayStem, dayBranch);
  const hour = pillar(hourStem, hBranch);

  const pillars = [year, month, day, hour];
  const counts: Record<Element, number> = {
    wood: 0,
    fire: 0,
    earth: 0,
    metal: 0,
    water: 0,
  };

  for (const item of pillars) {
    counts[item.element] += 2;
    counts[BRANCH_ELEMENTS[BRANCHES.indexOf(item.branch as (typeof BRANCHES)[number])]] += 1;
  }

  const ranked = (Object.entries(counts) as [Element, number][]).sort((a, b) => b[1] - a[1]);
  const dominant = ranked[0][0];
  const missing = ranked.filter(([, value]) => value === 0).map(([element]) => element);

  return {
    year,
    month,
    day,
    hour,
    dayMaster: day.element,
    counts,
    dominant,
    missing,
    sectors: ELEMENT_SECTORS[dominant],
  };
}
