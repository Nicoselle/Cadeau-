import { WATCH_SOURCE } from "@/data/watchlist";
import { parseOhlcPayload, type Candle } from "@/lib/smc";

const YAHOO_UA =
  "Mozilla/5.0 (compatible; Kapitaalkrant/1.0; +https://koppel-zeta.vercel.app)";

const cache = new Map<string, { at: number; candles: Candle[]; error?: string }>();
const CACHE_MS = 15 * 60 * 1000;

export async function fetchDailyCandles(symbol: string): Promise<{
  candles: Candle[];
  error?: string;
}> {
  const cached = cache.get(symbol);
  if (cached && Date.now() - cached.at < CACHE_MS) {
    return { candles: cached.candles, error: cached.error };
  }

  const url = `${WATCH_SOURCE.url}${encodeURIComponent(symbol)}?range=6mo&interval=1d`;
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": YAHOO_UA, Accept: "application/json" },
      next: { revalidate: 900 },
    });
    if (!response.ok) throw new Error(`tape ${response.status}`);
    const candles = parseOhlcPayload(await response.json());
    if (candles.length === 0) throw new Error("geen kaarsen");
    cache.set(symbol, { at: Date.now(), candles });
    return { candles };
  } catch (error) {
    const message = error instanceof Error ? error.message : "tape onbereikbaar";
    cache.set(symbol, { at: Date.now(), candles: [], error: message });
    return { candles: [], error: message };
  }
}

export function resetOhlcCacheForTests(): void {
  cache.clear();
}
