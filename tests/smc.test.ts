import { describe, expect, it } from "vitest";
import { SMC_UNIVERSE } from "@/data/smc-universe";
import { WATCHLIST } from "@/data/watchlist";
import {
  findFvgs,
  findSweeps,
  findSwings,
  parseOhlcPayload,
  readSmc,
  structureEvents,
  type Candle,
} from "@/lib/smc";

function c(
  date: string,
  open: number,
  high: number,
  low: number,
  close: number,
): Candle {
  return { date, open, high, low, close };
}

describe("SMC-lens", () => {
  it("leest OHLC uit een Yahoo-chart", () => {
    const candles = parseOhlcPayload({
      chart: {
        result: [
          {
            timestamp: [1787803200, 1787889600],
            indicators: {
              quote: [
                {
                  open: [10, 11],
                  high: [12, 13],
                  low: [9, 10],
                  close: [11, 12],
                },
              ],
            },
          },
        ],
      },
    });
    expect(candles).toHaveLength(2);
    expect(candles[0]?.high).toBe(12);
    expect(candles[1]?.date).toBe("2026-08-28");
  });

  it("markeert een swing high en een bullish FVG", () => {
    const candles = [
      c("2026-01-01", 10, 11, 9, 10),
      c("2026-01-02", 10, 10.5, 9.5, 10),
      c("2026-01-03", 10, 14, 10, 13),
      c("2026-01-04", 13, 13.2, 12.5, 13),
      c("2026-01-05", 13, 13.1, 12.8, 13),
      c("2026-01-06", 10, 10.2, 9.8, 10),
      c("2026-01-07", 10, 10.3, 9.7, 10),
      c("2026-01-08", 12.1, 12.4, 12.05, 12.2),
    ];
    const highs = findSwings(candles).filter((swing) => swing.kind === "high");
    expect(highs.some((swing) => swing.date === "2026-01-03")).toBe(true);

    const gaps = findFvgs(candles);
    const bull = gaps.find((gap) => gap.kind === "bullish" && gap.date === "2026-01-08");
    expect(bull).toBeDefined();
    expect(bull?.bottom).toBe(10.2);
    expect(bull?.top).toBe(12.05);
    expect(bull?.filled).toBe(false);
  });

  it("zet BOS omhoog en CHOCH omlaag", () => {
    const candles: Candle[] = [
      c("2026-02-01", 10, 10.4, 9.8, 10.1),
      c("2026-02-02", 10.1, 10.5, 9.9, 10.2),
      c("2026-02-03", 10.2, 12.0, 10.1, 11.8),
      c("2026-02-04", 11.8, 11.9, 11.4, 11.5),
      c("2026-02-05", 11.5, 11.6, 11.2, 11.3),
      c("2026-02-06", 11.3, 11.4, 10.0, 10.2),
      c("2026-02-07", 10.2, 10.6, 10.0, 10.4),
      c("2026-02-08", 10.4, 10.7, 10.2, 10.5),
      c("2026-02-09", 10.5, 14.0, 10.4, 13.6),
      c("2026-02-10", 13.6, 13.8, 13.2, 13.4),
      c("2026-02-11", 13.4, 13.5, 13.0, 13.1),
      c("2026-02-12", 13.1, 13.2, 11.2, 11.4),
      c("2026-02-13", 11.4, 11.8, 11.1, 11.5),
      c("2026-02-14", 11.5, 11.9, 11.3, 11.6),
      c("2026-02-15", 11.6, 15.2, 11.5, 15.0),
      c("2026-02-16", 15.0, 15.1, 14.6, 14.8),
      c("2026-02-17", 14.8, 14.9, 14.4, 14.5),
      c("2026-02-18", 14.5, 14.6, 8.4, 8.6),
      c("2026-02-19", 8.6, 9.0, 8.2, 8.4),
      c("2026-02-20", 8.4, 8.7, 8.0, 8.2),
    ];

    const swings = findSwings(candles);
    const { events } = structureEvents(candles, swings);
    expect(events.some((event) => event.kind === "bos" && event.direction === "up")).toBe(
      true,
    );
    expect(events.some((event) => event.kind === "choch" && event.direction === "down")).toBe(
      true,
    );
  });

  it("ziet een veeg boven een swing high met sluiting terug", () => {
    const candles = [
      c("2026-03-01", 10, 11, 9, 10),
      c("2026-03-02", 10, 12, 10, 11),
      c("2026-03-03", 11, 15, 11, 14),
      c("2026-03-04", 14, 14.2, 13, 13.5),
      c("2026-03-05", 13.5, 13.8, 13, 13.2),
      c("2026-03-06", 13, 16, 12, 12.5),
    ];
    const swings = findSwings(candles, 1, 1);
    const sweeps = findSweeps(candles, swings);
    expect(sweeps.some((sweep) => sweep.kind === "high")).toBe(true);
  });

  it("schrijft een raming, geen order", () => {
    const candles: Candle[] = [];
    for (let i = 0; i < 16; i += 1) {
      const base = 20 + Math.sin(i / 2) * 2 + i * 0.2;
      candles.push(
        c(`2026-04-${String(i + 1).padStart(2, "0")}`, base, base + 1.2, base - 0.8, base + 0.3),
      );
    }
    const reading = readSmc(candles);
    expect(reading.narrative).toMatch(/Raming, geen order/);
    expect(reading.narrative).not.toMatch(/koop/i);
  });

  it("draait de lens alleen op de zwaardere tapes", () => {
    for (const id of SMC_UNIVERSE) {
      expect(WATCHLIST.some((item) => item.id === id)).toBe(true);
    }
    expect(SMC_UNIVERSE).toContain("goud");
    expect(SMC_UNIVERSE).toContain("btc");
    expect(SMC_UNIVERSE).not.toContain("crym");
  });
});
