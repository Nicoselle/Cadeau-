import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { articles } from "@/data/articles";
import { oracles } from "@/data/oracles";
import { getMarketBoard } from "@/data/markets";
import { serializeArticle, serializeEdition } from "@/lib/krant-api";
import { getArticle, leadArticle } from "@/lib/newspaper";
import {
  annualizedGrowth,
  observations,
  round2,
  yoyGrowth,
} from "@/lib/series";

describe("series", () => {
  it("reproduces M2SL year-on-year for June 2026", () => {
    const series = observations("fred_M2SL_2019-2026.csv");
    expect(round2(yoyGrowth(series, "2026-06") ?? 0)).toBe(5.53);
  });

  it("keeps M2NS within 0.1pp of the SA signal", () => {
    const sa = yoyGrowth(observations("fred_M2SL_2019-2026.csv"), "2026-06");
    const nsa = yoyGrowth(observations("fred_M2NS_2024-2026.csv"), "2026-06");
    expect(sa).not.toBeNull();
    expect(nsa).not.toBeNull();
    expect(Math.abs((sa ?? 0) - (nsa ?? 0))).toBeLessThan(0.1);
  });

  it("reproduces US CPI year-on-year for July 2026", () => {
    const series = observations("fred_CPIAUCSL_2019-2026.csv");
    expect(round2(yoyGrowth(series, "2026-07") ?? 0)).toBe(3.3);
  });

  it("reproduces Belgian national CPI year-on-year", () => {
    const series = observations(
      "statbel_cpi_gezondheidsindex_2025-07_2026-07.csv",
      "globale_index",
    );
    expect(round2(yoyGrowth(series, "2026-07") ?? 0)).toBe(3.56);
  });

  it("annualizes six-month M2 growth near 7.3%", () => {
    const series = observations("fred_M2SL_2019-2026.csv");
    const growth = annualizedGrowth(series, 6);
    expect(growth).not.toBeNull();
    expect(round2((growth ?? 0) * 100)).toBe(7.28);
  });
});

describe("editie", () => {
  it("gives every article an editorial image that exists on disk", () => {
    for (const article of articles) {
      expect(article.image.src).toMatch(/^\/images\/.+\.webp$/);
      const file = path.join(process.cwd(), "public", article.image.src);
      expect(existsSync(file), article.image.src).toBe(true);
    }
  });

  it("has unique article slugs", () => {
    const slugs = articles.map((article) => article.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has exactly one lead story", () => {
    expect(articles.filter((article) => article.lead)).toHaveLength(1);
    expect(leadArticle().slug).toBe("conjunctuur-1-september");
  });

  it("uses the Statbel core-inflation label 3,13% in the first edition piece", () => {
    const kraan = getArticle("kraan-weer-open");
    const haystack = JSON.stringify(kraan);
    expect(haystack).toContain("3,13");
    expect(haystack).not.toContain("kerninflatie van 3,7");
  });

  it("looks up articles by slug", () => {
    expect(getArticle("centenindex-is-wet")?.title).toMatch(/centenindex/i);
    expect(getArticle("bestaat-niet")).toBeUndefined();
  });

  it("keeps seven open oracle claims", () => {
    expect(oracles).toHaveLength(7);
    expect(oracles.every((claim) => claim.outcome === "open")).toBe(true);
    expect(oracles.map((claim) => claim.id).sort()).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("builds a market board from stored series", () => {
    const board = getMarketBoard();
    expect(board.tiles.length).toBeGreaterThanOrEqual(10);
    expect(board.tiles.every((tile) => tile.value !== "—")).toBe(true);
    expect(board.tiles.find((tile) => tile.id === "m2")?.value).toContain("5,5");
  });

  it("serializes the edition for the public API", () => {
    const edition = serializeEdition();
    expect(edition.meta.publication).toBe("Kapitaalkrant");
    expect(edition.articles).toHaveLength(articles.length);
    expect(serializeArticle(articles[0]).url).toContain("/stuk/");
  });
});
