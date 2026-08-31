import { describe, expect, it } from "vitest";
import {
  ASSET_STANDS,
  CASH_MIX,
  CRYPTO_ALLOCATION,
  PYRAMID_LAYERS,
  PYRAMID_MANIFEST,
  PYRAMID_WEIGHTS,
  WATCHLIST,
  allocationIds,
  watchByLayer,
  yahooSymbols,
} from "@/data/watchlist";
import {
  formatTapeChange,
  formatTapePrice,
  parseChartPayload,
} from "@/lib/quotes";

const followedTickers = [
  "goud",
  "zilver",
  "BTC",
  "SKY",
  "xrm",
  "GRAM",
  "LWLG",
  "NB",
  "GCU",
  "TUD.V",
  "NSCI.V",
  "ELC.V",
  "CRYM",
  "GIP.V",
  "TFPM",
  "YCA.L",
  "QBTS",
  "PLTR",
  "AYA.TO",
  "HL",
  "AEM",
  "NEM",
  "PBR.A",
  "MPCC.OL",
  "ACM",
  "BTG",
];

describe("safecapital-piramide", () => {
  it("weegt 40 / 30 / 20 / 10 en somt tot honderd", () => {
    expect(PYRAMID_LAYERS).toEqual([
      "edelmetaal",
      "cash",
      "aandelen",
      "crypto",
    ]);
    expect(PYRAMID_WEIGHTS.edelmetaal).toBe(40);
    expect(PYRAMID_WEIGHTS.cash).toBe(30);
    expect(PYRAMID_WEIGHTS.aandelen).toBe(20);
    expect(PYRAMID_WEIGHTS.crypto).toBe(10);
    expect(
      Object.values(PYRAMID_WEIGHTS).reduce((sum, value) => sum + value, 0),
    ).toBe(100);
  });

  it("verdeelt cash als 50 EUR, 40 USD, 5 CHF, 5 NOK", () => {
    expect(CASH_MIX.map((item) => [item.currency, item.shareOfCash])).toEqual([
      ["EUR", 50],
      ["USD", 40],
      ["CHF", 5],
      ["NOK", 5],
    ]);
    expect(CASH_MIX.reduce((sum, item) => sum + item.shareOfCash, 0)).toBe(100);
    expect(allocationIds("cash")).toEqual(["eur", "usd", "chf", "nok"]);
  });

  it("houdt alleen BTC, XMR en GRAM in de cryptolaag", () => {
    expect(CRYPTO_ALLOCATION).toEqual(["btc", "xmr", "gram"]);
    expect(allocationIds("crypto")).toEqual(["btc", "xmr", "gram"]);
    const byId = Object.fromEntries(WATCHLIST.map((item) => [item.id, item]));
    expect(byId.gram?.yahoo).toBe("GRAM-USD");
    expect(byId.gram?.listedAs).toBe("GRAM");
    expect(byId.gram?.name).toMatch(/Gram/);
    expect(byId.sky?.role).toBe("volgen");
    expect(yahooSymbols()).not.toContain("TON-USD");
    expect(yahooSymbols()).not.toContain("TON11419-USD");
  });

  it("zet alle gevolgde aandelen in de laag van 20 %", () => {
    const stocks = watchByLayer("aandelen");
    expect(stocks.every((item) => item.kind === "aandeel")).toBe(true);
    expect(stocks.length).toBe(20);
    expect(watchByLayer("edelmetaal").map((item) => item.id)).toEqual([
      "goud",
      "zilver",
    ]);
  });

  it("behoudt de gevraagde namen en slaat shortcode over", () => {
    const listed = WATCHLIST.map((item) => item.listedAs);
    for (const ticker of followedTickers) {
      expect(listed).toContain(ticker);
    }
    expect(listed).not.toContain("Select a shortcode");
    expect(JSON.stringify(WATCHLIST).toLowerCase()).not.toContain("shortcode");
  });

  it("herleidt lastige tickers tot wat de tape kent", () => {
    const byId = Object.fromEntries(WATCHLIST.map((item) => [item.id, item]));
    expect(byId.xmr?.yahoo).toBe("XMR-USD");
    expect(byId.sky?.yahoo).toBe("SKY33038-USD");
    expect(byId.gcu?.yahoo).toBe("GCU.TO");
    expect(byId.acm?.yahoo).toBe("ACM.CN");
    expect(byId.pbra?.yahoo).toBe("PBR-A");
    expect(yahooSymbols()).not.toContain("ACM.V");
    expect(yahooSymbols()).not.toContain("GCU.V");
  });

  it("draagt huisregels, standen en de SafeCapital-disclaimer", () => {
    expect(PYRAMID_MANIFEST.lead).toMatch(/kapitaal veilig te stellen/);
    expect(PYRAMID_MANIFEST.houseRules).toHaveLength(4);
    expect(PYRAMID_MANIFEST.disclaimer).toMatch(/SafeCapital/);
    expect(PYRAMID_MANIFEST.disclaimer).toMatch(/educatieve/);
    expect(ASSET_STANDS.map((stand) => stand.id)).toEqual([
      "goud",
      "zilver",
      "cash",
      "btc",
      "xmr",
      "gram",
    ]);
  });
});

describe("publieke tape", () => {
  const fixture = {
    chart: {
      result: [
        {
          meta: {
            currency: "USD",
            symbol: "PLTR",
            regularMarketPrice: 186.29,
            chartPreviousClose: 179.94,
            shortName: "Palantir Technologies Inc.",
            regularMarketTime: 1787947200,
          },
        },
      ],
      error: null,
    },
  };

  it("leest prijs en dagsprong uit een Yahoo-chart", () => {
    const quote = parseChartPayload(fixture, "PLTR");
    expect(quote.ok).toBe(true);
    expect(quote.price).toBe(186.29);
    expect(quote.previous).toBe(179.94);
    expect(quote.changePct).toBeCloseTo(((186.29 - 179.94) / 179.94) * 100, 6);
    expect(quote.asOf).toBe("2026-08-28T20:00:00.000Z");
  });

  it("faalt luid als de tape leeg is", () => {
    const quote = parseChartPayload(
      { chart: { result: null, error: { description: "No data found" } } },
      "ACM.V",
    );
    expect(quote.ok).toBe(false);
    expect(quote.price).toBeNull();
    expect(quote.error).toMatch(/No data found/);
  });

  it("zet GBp om naar pond en toont een Nederlandse dagsprong", () => {
    expect(formatTapePrice(585, "GBp")).toBe("5,85 £");
    expect(formatTapePrice(4514.7, "USD")).toBe("4.514,70 $");
    expect(formatTapePrice(0.46, "CAD")).toBe("0,460 CAD");
    expect(formatTapeChange(3.529)).toBe("+3,53%");
    expect(formatTapeChange(-1.2)).toBe("-1,20%");
    expect(formatTapePrice(null, "USD")).toBe("—");
  });
});
