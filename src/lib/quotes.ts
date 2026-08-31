import { WATCH_SOURCE, WATCHLIST, type WatchItem } from "@/data/watchlist";
import { formatPlainNumber } from "@/lib/newspaper";

export type TapeQuote = {
  symbol: string;
  price: number | null;
  previous: number | null;
  changePct: number | null;
  currency: string | null;
  tapeName: string | null;
  asOf: string | null;
  ok: boolean;
  error?: string;
};

export type WatchRow = {
  item: WatchItem;
  quote: TapeQuote;
};

export type WatchBoard = {
  asOf: string;
  source: typeof WATCH_SOURCE;
  rows: WatchRow[];
  okCount: number;
  failCount: number;
};

type ChartMeta = {
  currency?: string;
  symbol?: string;
  regularMarketPrice?: number;
  previousClose?: number;
  chartPreviousClose?: number;
  shortName?: string;
  longName?: string;
  regularMarketTime?: number;
};

type ChartPayload = {
  chart?: {
    result?: Array<{ meta?: ChartMeta } | null>;
    error?: { code?: string; description?: string } | null;
  };
};

const YAHOO_UA =
  "Mozilla/5.0 (compatible; Kapitaalkrant/1.0; +https://koppel-zeta.vercel.app)";

export function parseChartPayload(payload: unknown, symbol: string): TapeQuote {
  const body = payload as ChartPayload;
  const error = body.chart?.error;
  const meta = body.chart?.result?.[0]?.meta;

  if (error?.description || !meta) {
    return {
      symbol,
      price: null,
      previous: null,
      changePct: null,
      currency: null,
      tapeName: null,
      asOf: null,
      ok: false,
      error: error?.description ?? "geen resultaat op de tape",
    };
  }

  const price = finiteOrNull(meta.regularMarketPrice);
  const previous = finiteOrNull(meta.previousClose ?? meta.chartPreviousClose);
  const changePct =
    price !== null && previous !== null && previous !== 0
      ? ((price - previous) / previous) * 100
      : null;

  return {
    symbol: meta.symbol ?? symbol,
    price,
    previous,
    changePct,
    currency: meta.currency ?? null,
    tapeName: meta.shortName ?? meta.longName ?? null,
    asOf: unixToIso(meta.regularMarketTime),
    ok: price !== null,
    error: price === null ? "geen laatste print" : undefined,
  };
}

function finiteOrNull(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function unixToIso(value: unknown): string | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return new Date(value * 1000).toISOString();
}

export async function fetchTapeQuote(symbol: string): Promise<TapeQuote> {
  const url = `${WATCH_SOURCE.url}${encodeURIComponent(symbol)}?range=5d&interval=1d`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": YAHOO_UA,
        Accept: "application/json",
      },
      next: { revalidate: WATCH_SOURCE.cacheSeconds },
    });

    if (!response.ok) {
      return {
        symbol,
        price: null,
        previous: null,
        changePct: null,
        currency: null,
        tapeName: null,
        asOf: null,
        ok: false,
        error: `tape ${response.status}`,
      };
    }

    return parseChartPayload(await response.json(), symbol);
  } catch {
    return {
      symbol,
      price: null,
      previous: null,
      changePct: null,
      currency: null,
      tapeName: null,
      asOf: null,
      ok: false,
      error: "tape onbereikbaar",
    };
  }
}

export async function fetchWatchBoard(
  items: WatchItem[] = WATCHLIST,
): Promise<WatchBoard> {
  const quotes = await mapPool(items, 8, (item) => fetchTapeQuote(item.yahoo));
  const rows = items.map((item, index) => ({
    item,
    quote: quotes[index] ?? emptyQuote(item.yahoo),
  }));

  const stamps = rows
    .map((row) => row.quote.asOf)
    .filter((value): value is string => Boolean(value))
    .sort();

  return {
    asOf: stamps.at(-1) ?? new Date().toISOString(),
    source: WATCH_SOURCE,
    rows,
    okCount: rows.filter((row) => row.quote.ok).length,
    failCount: rows.filter((row) => !row.quote.ok).length,
  };
}

function emptyQuote(symbol: string): TapeQuote {
  return {
    symbol,
    price: null,
    previous: null,
    changePct: null,
    currency: null,
    tapeName: null,
    asOf: null,
    ok: false,
    error: "geen print",
  };
}

async function mapPool<T, R>(
  items: T[],
  size: number,
  worker: (item: T) => Promise<R>,
): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let cursor = 0;

  async function run(): Promise<void> {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      out[index] = await worker(items[index] as T);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(size, items.length) }, () => run()),
  );
  return out;
}

export function formatTapePrice(
  price: number | null,
  currency: string | null,
): string {
  if (price === null) return "—";

  if (currency === "GBp") {
    return `${formatPlainNumber(price / 100, 2)} £`;
  }

  const digits = price >= 10 ? 2 : price >= 0.1 ? 3 : 6;
  const number = formatPlainNumber(price, digits);
  if (!currency || currency === "USD") return `${number} $`;
  return `${number} ${currency}`;
}

export function formatTapeChange(changePct: number | null): string {
  if (changePct === null) return "—";
  const digits = Math.abs(changePct) >= 10 ? 1 : 2;
  const formatted = new Intl.NumberFormat("nl-NL", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    signDisplay: "exceptZero",
  }).format(changePct);
  return `${formatted}%`;
}

export function serializeWatchBoard(board: WatchBoard) {
  return {
    as_of: board.asOf,
    source: board.source,
    ok_count: board.okCount,
    fail_count: board.failCount,
    rows: board.rows.map((row) => ({
      id: row.item.id,
      name: row.item.name,
      listed_as: row.item.listedAs,
      yahoo: row.item.yahoo,
      layer: row.item.layer,
      kind: row.item.kind,
      exchange: row.item.exchange,
      note: row.item.note,
      price: row.quote.price,
      price_label: formatTapePrice(row.quote.price, row.quote.currency),
      change_pct: row.quote.changePct,
      change_label: formatTapeChange(row.quote.changePct),
      currency: row.quote.currency,
      tape_name: row.quote.tapeName,
      quote_as_of: row.quote.asOf,
      ok: row.quote.ok,
      error: row.quote.error ?? null,
    })),
  };
}
