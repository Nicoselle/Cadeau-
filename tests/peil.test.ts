import { describe, expect, it } from "vitest";
import { EDITION, PEIL_RULE, PUBLICATION_AS_OF } from "@/data/edition";
import { getMarketBoard } from "@/data/markets";
import { snapshotOn } from "@/lib/as-of";
import {
  lastCommonDate,
  lastOnOrBefore,
  observations,
  round2,
  valueOnDate,
} from "@/lib/series";

describe("peilregel publicatie 1 september 2026", () => {
  it("fixes the publication as-of at 1 September 2026", () => {
    expect(PUBLICATION_AS_OF).toBe("2026-09-01");
    expect(EDITION.asOf).toBe("2026-09-01");
    expect(PEIL_RULE).toMatch(/1 september 2026/);
    expect(PEIL_RULE).toMatch(/lastOnOrBefore/);
    expect(PEIL_RULE).toMatch(/lastCommonDate/);
    expect(PEIL_RULE).toMatch(/gemeenschappelijke datum/);
    expect(getMarketBoard().asOf).toBe("2026-09-01");
  });

  it("takes the last common date, not the last date of one series", () => {
    const left = [
      { date: "2026-08-25", value: 1 },
      { date: "2026-08-27", value: 2 },
    ];
    const right = [
      { date: "2026-08-25", value: 10 },
      { date: "2026-08-28", value: 11 },
    ];
    expect(lastCommonDate([left, right], "2026-08-31")).toBe("2026-08-25");
    expect(lastCommonDate([left, right], "2026-08-24")).toBeNull();
  });

  it("aligns the real 10-year on the last shared print, not 28 August", () => {
    const dgs = observations("fred_DGS10_2025-06_2026-08.csv");
    const be = observations("fred_T10YIE_2025-06_2026-08.csv");
    const common = lastCommonDate([dgs, be], PUBLICATION_AS_OF);
    expect(common).toBe("2026-08-27");
    expect(lastOnOrBefore(dgs, PUBLICATION_AS_OF)?.date).toBe("2026-08-27");
    expect(lastOnOrBefore(be, PUBLICATION_AS_OF)?.date).toBe("2026-08-28");

    const real = snapshotOn(PUBLICATION_AS_OF).real10y;
    expect(real?.date).toBe("2026-08-27");
    expect(real?.value).toBe(round2(4.67 - 2.33));
    expect(valueOnDate(be, "2026-08-28")).toBe(2.31);
  });

  it("computes the funds-ten-year spread on 14 August, not 27 August", () => {
    const dgs = observations("fred_DGS10_2025-06_2026-08.csv");
    const dff = observations("fred_DFF_breekpunten_2025-2026.csv");
    const common = lastCommonDate([dgs, dff], PUBLICATION_AS_OF);
    expect(common).toBe("2026-08-14");
    expect(valueOnDate(dgs, common!)).toBe(4.68);
    expect(valueOnDate(dff, common!)).toBe(3.63);

    const board = getMarketBoard();
    const tenYear = board.tiles.find((tile) => tile.id === "dgs10");
    expect(tenYear?.asOf).toBe("2026-08-27");
    expect(tenYear?.value).toContain("4,67");
    expect(tenYear?.detail).toContain("2026-08-14");
    expect(tenYear?.detail).toContain("+1,05");
    expect(tenYear?.detail).not.toContain("+1,04");
  });

  it("lets tiles keep their own observation dates under the publication peil", () => {
    const board = getMarketBoard();
    const dates = new Set(board.tiles.map((tile) => tile.asOf));
    expect(dates.size).toBeGreaterThan(1);
    expect(board.tiles.every((tile) => tile.asOf <= PUBLICATION_AS_OF)).toBe(
      true,
    );
    expect(board.notes[0]).toBe(PEIL_RULE);
  });
});
