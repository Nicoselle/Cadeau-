import fs from "node:fs";
import path from "node:path";

export type Observation = { date: string; value: number };

export function dataDir(): string {
  return path.join(process.cwd(), "redactie", "data");
}

export function parseCsv(text: string): { headers: string[]; rows: string[][] } {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter((line) => line.length > 0 && !line.startsWith("#"));

  if (lines.length === 0) {
    return { headers: [], rows: [] };
  }

  const rows = lines.map(splitCsvLine);
  const headers = rows[0] ?? [];
  return { headers, rows: rows.slice(1) };
}

function splitCsvLine(line: string): string[] {
  const out: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (ch === "," && !inQuotes) {
      out.push(current);
      current = "";
      continue;
    }
    current += ch;
  }
  out.push(current);
  return out;
}

export function readCsvFile(filename: string): { headers: string[]; rows: string[][] } {
  const text = fs.readFileSync(path.join(dataDir(), filename), "utf8");
  return parseCsv(text);
}

export function monthKey(date: string): string {
  return date.slice(0, 7);
}

export function observations(filename: string, column?: string): Observation[] {
  const { headers, rows } = readCsvFile(filename);
  if (headers.length < 2) return [];

  const index = column ? headers.indexOf(column) : 1;
  if (index < 0) {
    throw new Error(`kolom '${column}' niet gevonden in ${filename}`);
  }

  const out: Observation[] = [];
  for (const row of rows) {
    const rawDate = row[0]?.trim();
    const rawValue = row[index]?.trim();
    if (!rawDate || !rawValue) continue;
    const value = Number(rawValue);
    if (!Number.isFinite(value)) continue;
    out.push({ date: rawDate, value });
  }
  return out;
}

export function lastObservation(series: Observation[]): Observation | null {
  return series.at(-1) ?? null;
}

/** Laatste waarneming met datum ≤ peil. Maandreeksen `YYYY-MM` tellen als de eerste van die maand. */
export function lastOnOrBefore(
  series: Observation[],
  date: string,
): Observation | null {
  let found: Observation | null = null;
  for (const item of series) {
    const key = item.date.length === 7 ? `${item.date}-01` : item.date;
    if (key <= date) found = item;
  }
  return found;
}

export function valueOnMonth(
  series: Observation[],
  month: string,
): number | null {
  const matches = series.filter((item) => monthKey(item.date) === month);
  return matches.at(-1)?.value ?? null;
}

export function yoyGrowth(series: Observation[], month?: string): number | null {
  const perMonth = new Map<string, number>();
  for (const item of series) {
    perMonth.set(monthKey(item.date), item.value);
  }

  const target = month ?? (series.at(-1) ? monthKey(series[series.length - 1].date) : null);
  if (!target) return null;

  const current = perMonth.get(target);
  const [year, mon] = target.split("-");
  const previous = perMonth.get(`${Number(year) - 1}-${mon}`);
  if (current == null || previous == null || previous === 0) return null;
  return (current / previous - 1) * 100;
}

export function annualizedGrowth(series: Observation[], months: number): number | null {
  const perMonth = new Map<string, number>();
  for (const item of series) {
    perMonth.set(monthKey(item.date), item.value);
  }
  const keys = [...perMonth.keys()].sort();
  if (keys.length < months + 1) return null;
  const endKey = keys[keys.length - 1];
  const startKey = keys[keys.length - 1 - months];
  const end = perMonth.get(endKey);
  const start = perMonth.get(startKey);
  if (end == null || start == null || start === 0) return null;
  return (end / start) ** (12 / months) - 1;
}

export function sparkValues(series: Observation[], n = 24): number[] {
  return series.slice(-n).map((item) => item.value);
}

export function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
