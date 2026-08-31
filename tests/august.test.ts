import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { articles } from "@/data/articles";
import { AUGUST_OPINION_DATES, AUGUST_OPINIONS } from "@/data/opinie-augustus";
import {
  augustPieceFor,
  augustWeekdays2026,
  buildAugustLedger,
  printById,
  snapshotOn,
} from "@/lib/as-of";
import { getArticle, latestOpinion } from "@/lib/newspaper";
import { lastOnOrBefore, observations, yoyGrowth, round2 } from "@/lib/series";

function isoFromSource(source: string): string | null {
  const matches = source.match(/\d{4}-\d{2}-\d{2}/g);
  return matches?.at(-1) ?? null;
}

describe("augustus 2026 — peil zonder vooruitkijken", () => {
  it("takes the last observation on or before the peil", () => {
    const series = [
      { date: "2026-08-03", value: 1 },
      { date: "2026-08-05", value: 2 },
      { date: "2026-08-07", value: 3 },
    ];
    expect(lastOnOrBefore(series, "2026-08-04")).toEqual({
      date: "2026-08-03",
      value: 1,
    });
    expect(lastOnOrBefore(series, "2026-08-05")).toEqual({
      date: "2026-08-05",
      value: 2,
    });
    expect(lastOnOrBefore(series, "2026-08-10")).toEqual({
      date: "2026-08-07",
      value: 3,
    });
  });

  it("lists the 21 weekdays from 3 through 31 August", () => {
    const days = augustWeekdays2026();
    expect(days).toHaveLength(21);
    expect(days[0]).toBe("2026-08-03");
    expect(days.at(-1)).toBe("2026-08-31");
    expect(days).not.toContain("2026-08-01");
    expect(days).not.toContain("2026-08-02");
    expect(days).not.toContain("2026-08-29");
    expect(days).not.toContain("2026-08-30");
    expect(buildAugustLedger()).toHaveLength(21);
  });

  it("keeps June M2 on the edition floor until the H.6 of 25 August", () => {
    const before = snapshotOn("2026-08-24");
    const after = snapshotOn("2026-08-25");
    const m2Before = printById(before, "m2");
    const m2After = printById(after, "m2");

    expect(before.m2Vintage).toBe("editie");
    expect(m2Before?.date).toBe("2026-06-01");
    expect(m2Before?.value).toBe(5.53);
    expect(m2Before?.seriesFile).toBe("fred_M2SL_2019-2026.csv");

    expect(after.m2Vintage).toBe("2026-08-31");
    expect(m2After?.date).toBe("2026-07-01");
    expect(m2After?.value).toBe(5.41);
    expect(m2After?.seriesFile).toBe("fred_M2SL_vintage_2026-08-31.csv");

    const editionJune = observations("fred_M2SL_2019-2026.csv").find(
      (item) => item.date === "2026-06-01",
    );
    const vintageJune = observations("fred_M2SL_vintage_2026-08-31.csv").find(
      (item) => item.date === "2026-06-01",
    );
    expect(editionJune?.value).toBe(23155.2);
    expect(vintageJune?.value).toBe(23115.2);
    expect(round2(yoyGrowth(observations("fred_M2SL_2019-2026.csv"), "2026-06") ?? 0)).toBe(
      5.53,
    );
  });

  it("never prints an observation after the peil date", () => {
    for (const day of buildAugustLedger()) {
      for (const print of day.prints) {
        const key = print.date.length === 7 ? `${print.date}-01` : print.date;
        expect(key <= day.date, `${print.id} ${print.date} > ${day.date}`).toBe(
          true,
        );
      }
      if (day.real10y) {
        expect(day.real10y.date <= day.date).toBe(true);
      }
    }
  });

  it("writes twenty weekday opinions and keeps 31 August as the existing piece", () => {
    expect(AUGUST_OPINIONS).toHaveLength(20);
    expect(AUGUST_OPINION_DATES).not.toContain("2026-08-31");
    expect(AUGUST_OPINION_DATES.at(-1)).toBe("2026-08-28");
    expect(latestOpinion()?.slug).toBe("vat-liegt-minder-dan-de-index");
    expect(getArticle("mening-2026-08-31")).toBeUndefined();
    expect(articles.filter((article) => article.desk === "opinie")).toHaveLength(
      21,
    );
  });

  it("fills each August opinion from that day's snapshot only", () => {
    for (const piece of AUGUST_OPINIONS) {
      const snap = snapshotOn(piece.published);
      expect(piece.slug).toBe(`mening-${piece.published}`);
      expect(piece.desk).toBe("opinie");
      expect(piece.author).toBe("De mening");
      expect(piece.lead).toBe(false);

      const table = piece.body.find((block) => block.type === "table");
      expect(table && table.type === "table").toBe(true);
      if (table && table.type === "table") {
        for (const row of table.rows) {
          const observed = row[2];
          expect(observed <= piece.published, `${piece.slug} ${observed}`).toBe(
            true,
          );
        }
      }

      for (const figure of piece.figures) {
        const observed = isoFromSource(figure.source);
        if (observed) {
          expect(observed <= piece.published, figure.source).toBe(true);
        }
        if (figure.label === "M2 VS, j/j") {
          expect(figure.value).toBe(printById(snap, "m2")?.display);
        }
        if (figure.label === "Brent, vat") {
          expect(figure.value).toBe(printById(snap, "brent")?.display);
        }
        if (figure.label === "S&P 500") {
          expect(figure.value).toBe(printById(snap, "spx")?.display);
        }
      }
    }
  });

  it("does not leak the July M2 print into the 24 August opinion", () => {
    const piece = getArticle("mening-2026-08-24");
    expect(piece).toBeDefined();
    const haystack = JSON.stringify(piece);
    expect(haystack).not.toContain("5,41");
    expect(haystack).not.toContain("23218");
    expect(haystack).not.toContain("fred_M2SL_vintage_2026-08-31");
    expect(haystack).toContain("fred_M2SL_2019-2026.csv");
  });

  it("does not invent a 31 August print in the 28 August opinion", () => {
    const piece = getArticle("mening-2026-08-28");
    expect(piece).toBeDefined();
    const haystack = JSON.stringify(piece);
    expect(haystack).not.toMatch(/2026-08-31,\s/);
    expect(haystack).not.toContain("observation_date,2026-08-31");
    const table = piece?.body.find((block) => block.type === "table");
    if (table && table.type === "table") {
      for (const row of table.rows) {
        expect(row[2] <= "2026-08-28").toBe(true);
      }
    }
  });

  it("keeps the committed ledger in lockstep with the live snapshot", () => {
    const file = path.join(
      process.cwd(),
      "redactie",
      "mening",
      "2026-08-ledger.json",
    );
    expect(existsSync(file)).toBe(true);
    const stored = JSON.parse(readFileSync(file, "utf8")) as {
      days: ReturnType<typeof buildAugustLedger>;
    };
    expect(stored.days).toEqual(buildAugustLedger());
  });

  it("points 31 August at the existing opinion", () => {
    expect(augustPieceFor("2026-08-31").slug).toBe(
      "vat-liegt-minder-dan-de-index",
    );
    expect(augustPieceFor("2026-08-18").slug).toBe("mening-2026-08-18");
  });
});
