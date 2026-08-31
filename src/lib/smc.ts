export type Candle = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

export type Swing = {
  index: number;
  date: string;
  price: number;
  kind: "high" | "low";
};

export type SmcEvent = {
  date: string;
  kind: "bos" | "choch";
  direction: "up" | "down";
  level: number;
};

export type GapZone = {
  date: string;
  kind: "bullish" | "bearish";
  top: number;
  bottom: number;
  filled: boolean;
};

export type LiquiditySweep = {
  date: string;
  kind: "high" | "low";
  level: number;
};

export type SmcReading = {
  bias: "bull" | "bear" | "range";
  lastEvent: SmcEvent | null;
  swings: Swing[];
  fvgs: GapZone[];
  orderBlocks: GapZone[];
  sweeps: LiquiditySweep[];
  narrative: string;
};

export function parseOhlcPayload(payload: unknown): Candle[] {
  const body = payload as {
    chart?: {
      result?: Array<{
        timestamp?: number[];
        indicators?: { quote?: Array<Record<string, Array<number | null>>> };
      }>;
    };
  };
  const result = body.chart?.result?.[0];
  const times = result?.timestamp ?? [];
  const quote = result?.indicators?.quote?.[0] ?? {};
  const out: Candle[] = [];

  for (let i = 0; i < times.length; i += 1) {
    const open = quote.open?.[i];
    const high = quote.high?.[i];
    const low = quote.low?.[i];
    const close = quote.close?.[i];
    if (
      typeof open !== "number" ||
      typeof high !== "number" ||
      typeof low !== "number" ||
      typeof close !== "number"
    ) {
      continue;
    }
    out.push({
      date: new Date(times[i] * 1000).toISOString().slice(0, 10),
      open,
      high,
      low,
      close,
    });
  }
  return out;
}

export function findSwings(
  candles: Candle[],
  left = 2,
  right = 2,
): Swing[] {
  const swings: Swing[] = [];
  for (let i = left; i < candles.length - right; i += 1) {
    const candle = candles[i];
    if (!candle) continue;
    const window = candles.slice(i - left, i + right + 1);
    const isHigh = window.every((item) => item.high <= candle.high);
    const isLow = window.every((item) => item.low >= candle.low);
    const uniqueHigh = window.filter((item) => item.high === candle.high).length === 1;
    const uniqueLow = window.filter((item) => item.low === candle.low).length === 1;
    if (isHigh && uniqueHigh) {
      swings.push({ index: i, date: candle.date, price: candle.high, kind: "high" });
    }
    if (isLow && uniqueLow) {
      swings.push({ index: i, date: candle.date, price: candle.low, kind: "low" });
    }
  }
  return swings;
}

export function findFvgs(candles: Candle[]): GapZone[] {
  const gaps: GapZone[] = [];
  for (let i = 2; i < candles.length; i += 1) {
    const left = candles[i - 2];
    const right = candles[i];
    if (!left || !right) continue;
    if (left.high < right.low) {
      gaps.push({
        date: right.date,
        kind: "bullish",
        top: right.low,
        bottom: left.high,
        filled: laterFills(candles, i + 1, left.high, right.low),
      });
    }
    if (left.low > right.high) {
      gaps.push({
        date: right.date,
        kind: "bearish",
        top: left.low,
        bottom: right.high,
        filled: laterFills(candles, i + 1, right.high, left.low),
      });
    }
  }
  return gaps;
}

function laterFills(
  candles: Candle[],
  from: number,
  bottom: number,
  top: number,
): boolean {
  return candles.slice(from).some((candle) => candle.low <= top && candle.high >= bottom);
}

export function structureEvents(
  candles: Candle[],
  swings: Swing[],
): { bias: SmcReading["bias"]; events: SmcEvent[] } {
  const events: SmcEvent[] = [];
  let bias: SmcReading["bias"] = "range";
  let brokenHigh = -1;
  let brokenLow = -1;

  for (let i = 0; i < candles.length; i += 1) {
    const candle = candles[i];
    if (!candle) continue;
    const priorHigh = lastSwing(swings, i, "high");
    const priorLow = lastSwing(swings, i, "low");
    if (priorHigh && candle.close > priorHigh.price && priorHigh.index !== brokenHigh) {
      events.push({
        date: candle.date,
        kind: bias === "bear" ? "choch" : "bos",
        direction: "up",
        level: priorHigh.price,
      });
      bias = "bull";
      brokenHigh = priorHigh.index;
    } else if (priorLow && candle.close < priorLow.price && priorLow.index !== brokenLow) {
      events.push({
        date: candle.date,
        kind: bias === "bull" ? "choch" : "bos",
        direction: "down",
        level: priorLow.price,
      });
      bias = "bear";
      brokenLow = priorLow.index;
    }
  }

  return { bias, events };
}

function lastSwing(
  swings: Swing[],
  beforeIndex: number,
  kind: Swing["kind"],
): Swing | null {
  for (let i = swings.length - 1; i >= 0; i -= 1) {
    const swing = swings[i];
    if (swing && swing.index < beforeIndex && swing.kind === kind) return swing;
  }
  return null;
}

export function findSweeps(
  candles: Candle[],
  swings: Swing[],
): LiquiditySweep[] {
  const sweeps: LiquiditySweep[] = [];
  for (let i = 0; i < candles.length; i += 1) {
    const candle = candles[i];
    if (!candle) continue;
    const high = lastSwing(swings, i, "high");
    const low = lastSwing(swings, i, "low");
    if (high && candle.high > high.price && candle.close < high.price) {
      sweeps.push({ date: candle.date, kind: "high", level: high.price });
    }
    if (low && candle.low < low.price && candle.close > low.price) {
      sweeps.push({ date: candle.date, kind: "low", level: low.price });
    }
  }
  return sweeps;
}

export function findOrderBlocks(
  candles: Candle[],
  events: SmcEvent[],
): GapZone[] {
  const blocks: GapZone[] = [];
  for (const event of events) {
    const index = candles.findIndex((candle) => candle.date === event.date);
    if (index < 1) continue;
    const wantDown = event.direction === "up";
    let found: Candle | null = null;
    for (let i = index - 1; i >= Math.max(0, index - 8); i -= 1) {
      const candle = candles[i];
      if (!candle) continue;
      const down = candle.close < candle.open;
      if (wantDown === down) {
        found = candle;
        break;
      }
    }
    if (!found) continue;
    const top = Math.max(found.open, found.close);
    const bottom = Math.min(found.open, found.close);
    blocks.push({
      date: found.date,
      kind: event.direction === "up" ? "bullish" : "bearish",
      top,
      bottom,
      filled: laterFills(candles, index, bottom, top),
    });
  }
  return blocks;
}

export function readSmc(candles: Candle[]): SmcReading {
  if (candles.length < 8) {
    return {
      bias: "range",
      lastEvent: null,
      swings: [],
      fvgs: [],
      orderBlocks: [],
      sweeps: [],
      narrative: "Te weinig kaarsen voor een structuurlezing.",
    };
  }

  const swings = findSwings(candles);
  const { bias, events } = structureEvents(candles, swings);
  const fvgs = findFvgs(candles);
  const orderBlocks = findOrderBlocks(candles, events);
  const sweeps = findSweeps(candles, swings);
  const lastEvent = events.at(-1) ?? null;
  const openFvg = [...fvgs].reverse().find((gap) => !gap.filled) ?? null;
  const openOb = [...orderBlocks].reverse().find((block) => !block.filled) ?? null;
  const lastSweep = sweeps.at(-1) ?? null;

  return {
    bias,
    lastEvent,
    swings: swings.slice(-8),
    fvgs: fvgs.slice(-6),
    orderBlocks: orderBlocks.slice(-4),
    sweeps: sweeps.slice(-4),
    narrative: narrate(bias, lastEvent, openFvg, openOb, lastSweep),
  };
}

function narrate(
  bias: SmcReading["bias"],
  event: SmcEvent | null,
  fvg: GapZone | null,
  block: GapZone | null,
  sweep: LiquiditySweep | null,
): string {
  const parts: string[] = [];
  if (bias === "range") {
    parts.push("Dagkaart: nog geen duidelijke bias.");
  } else {
    const word = bias === "bull" ? "bullish" : "bearish";
    parts.push(`Dagkaart: bias ${word}.`);
  }
  if (event) {
    const label = event.kind === "choch" ? "karakterwissel (CHOCH)" : "breuk van structuur (BOS)";
    const dir = event.direction === "up" ? "omhoog" : "omlaag";
    parts.push(`Laatste ${label} ${dir} op ${event.date}.`);
  }
  if (fvg) {
    parts.push(
      `Open FVG (${fvg.kind}) van ${round(fvg.bottom)} tot ${round(fvg.top)}, gezet ${fvg.date}.`,
    );
  }
  if (block) {
    parts.push(
      `Orderblok (${block.kind}) ${round(block.bottom)}–${round(block.top)}, kaars ${block.date}.`,
    );
  }
  if (sweep) {
    parts.push(
      `Laatste liquiditeitsveeg van ${sweep.kind === "high" ? "hoogtes" : "laagtes"} op ${sweep.date}.`,
    );
  }
  parts.push("Raming, geen order. SMC is één lens op de tape.");
  return parts.join(" ");
}

function round(value: number): string {
  if (value >= 100) return value.toFixed(1);
  if (value >= 1) return value.toFixed(3);
  return value.toFixed(5);
}
