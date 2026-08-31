import { isSmcUniverse, SMC_UNIVERSE } from "@/data/smc-universe";
import { WATCHLIST, type WatchItem } from "@/data/watchlist";
import { fetchDailyCandles } from "@/lib/ohlc";
import { readSmc, type SmcReading } from "@/lib/smc";

export type SmcCard = {
  item: WatchItem;
  reading: SmcReading;
  candleCount: number;
  error?: string;
};

export async function readSmcFor(id: string): Promise<SmcCard | null> {
  const item = WATCHLIST.find((entry) => entry.id === id);
  if (!item || !isSmcUniverse(item.id)) return null;
  const { candles, error } = await fetchDailyCandles(item.yahoo);
  return {
    item,
    reading: readSmc(candles),
    candleCount: candles.length,
    error,
  };
}

export async function readSmcBoard(ids: string[] = [...SMC_UNIVERSE]): Promise<SmcCard[]> {
  const cards: SmcCard[] = [];
  for (const id of ids) {
    const card = await readSmcFor(id);
    if (card) cards.push(card);
  }
  return cards;
}

export function serializeSmcCard(card: SmcCard) {
  return {
    id: card.item.id,
    name: card.item.name,
    listed_as: card.item.listedAs,
    yahoo: card.item.yahoo,
    layer: card.item.layer,
    bias: card.reading.bias,
    last_event: card.reading.lastEvent,
    narrative: card.reading.narrative,
    candle_count: card.candleCount,
    open_fvg: card.reading.fvgs.filter((gap) => !gap.filled).slice(-2),
    open_ob: card.reading.orderBlocks.filter((block) => !block.filled).slice(-2),
    last_sweep: card.reading.sweeps.at(-1) ?? null,
    error: card.error ?? null,
  };
}
