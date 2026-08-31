import { describe, expect, it } from "vitest";
import {
  PYRAMID_LAYERS,
  WATCHLIST,
  watchByLayer,
  yahooSymbols,
} from "@/data/watchlist";
import {
  formatTapeChange,
  formatTapePrice,
  parseChartPayload,
} from "@/lib/quotes";

const listed = [
  "goud",
  "zilver",
  "BTC",
  "GRAM",
  "SKY",
  "xrm",
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

describe("volglijst", () => {
  it("volgt elke gevraagde naam precies één keer", () => {
    expect(WATCHLIST).toHaveLength(listed.length);
    expect(WATCHLIST.map((item) => item.listedAs).sort()).toEqual(
      [...listed].sort(),
    );
    expect(new Set(WATCHLIST.map((item) => item.id)).size).toBe(
      WATCHLIST.length,
    );
  });

  it("negeert UI-restafval zoals Select a shortcode", () => {
    expect(JSON.stringify(WATCHLIST).toLowerCase()).not.toContain("shortcode");
    expect(WATCHLIST.some((item) => item.listedAs === "Select a shortcode")).toBe(
      false,
    );
  });

  it("zet de piramide in vijf lagen en vult elke laag", () => {
    expect(PYRAMID_LAYERS).toEqual([
      "bodem",
      "producent",
      "kasstroom",
      "thema",
      "punt",
    ]);
    for (const layer of PYRAMID_LAYERS) {
      expect(watchByLayer(layer).length).toBeGreaterThan(0);
    }
    expect(watchByLayer("bodem").map((item) => item.id)).toEqual([
      "goud",
      "zilver",
    ]);
    expect(watchByLayer("punt").some((item) => item.kind === "crypto")).toBe(
      true,
    );
  });

  it("herleidt lastige tickers tot wat de tape kent", () => {
    const byId = Object.fromEntries(WATCHLIST.map((item) => [item.id, item]));
    expect(byId.xmr?.yahoo).toBe("XMR-USD");
    expect(byId.xmr?.listedAs).toBe("xrm");
    expect(byId.sky?.yahoo).toBe("SKY33038-USD");
    expect(byId.sky?.yahoo).not.toBe("SKY");
    expect(byId.gcu?.yahoo).toBe("GCU.TO");
    expect(byId.acm?.yahoo).toBe("ACM.CN");
    expect(byId.pbra?.yahoo).toBe("PBR-A");
    expect(yahooSymbols()).not.toContain("ACM.V");
    expect(yahooSymbols()).not.toContain("GCU.V");
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
    expect(formatTapeChange(3.529)).toBe("+3,53%");
    expect(formatTapeChange(-1.2)).toBe("-1,20%");
    expect(formatTapePrice(null, "USD")).toBe("—");
  });
});
