import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { articles } from "@/data/articles";
import { oracles } from "@/data/oracles";
import { getMarketBoard } from "@/data/markets";
import { serializeArticle, serializeEdition } from "@/lib/krant-api";
import { getArticle, latestOpinion, leadArticle } from "@/lib/newspaper";
import {
  annualizedGrowth,
  observations,
  round1,
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
    expect(leadArticle().slug).toBe("conjunctuur-brief-1-september");
    expect(leadArticle().edition).toBe(3);
  });

  it("keeps the Statbel core-inflation label 3,13% in editie 1", () => {
    const piece = getArticle("kraan-weer-open");
    expect(piece).toBeDefined();
    const haystack = JSON.stringify(piece);
    expect(haystack).toContain("3,13");
    expect(haystack).not.toContain("kerninflatie van 3,7");
  });

  it("peilt editie 2 against the same floor, not a new print", () => {
    const lead = getArticle("reele-rente-houdt-de-bodem");
    expect(lead).toBeDefined();
    const haystack = JSON.stringify(lead);
    expect(haystack).toContain("5,53");
    expect(haystack).toContain("2,43");
    expect(haystack).toContain("3,63");
    expect(haystack).toMatch(/zelfde datum|uitgelijnd/i);
    expect(
      articles.filter((article) => article.edition === 1 && article.desk !== "opinie"),
    ).toHaveLength(6);
    expect(
      articles.filter((article) => article.edition === 2 && article.desk !== "opinie"),
    ).toHaveLength(1);
  });

  it("keeps a daily Knack-style opinion on the floor", () => {
    const piece = latestOpinion();
    expect(piece?.slug).toBe("vat-liegt-minder-dan-de-index");
    expect(piece?.desk).toBe("opinie");
    expect(piece?.lead).toBe(false);
    expect(piece?.author).toBe("De mening");
    const haystack = JSON.stringify(piece);
    expect(haystack).toContain("88,24");
    expect(haystack).toContain("13.542,82");
    expect(haystack).not.toMatch(/vijf dingen|in 3 punten/i);
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
    expect(board.tiles.find((tile) => tile.id === "brent")?.value).toContain("88,24");
    expect(board.tiles.find((tile) => tile.id === "koper")?.value).toContain("13.542,82");
    expect(board.tiles.find((tile) => tile.id === "uranium")?.value).toContain("69,23");
  });

  it("reproduces last oil, copper and uranium prints from the floor", () => {
    const brent = observations("fred_DCOILBRENTEU_2025-01_2026-08.csv");
    const wti = observations("fred_DCOILWTICO_2025-01_2026-08.csv");
    const copper = observations("fred_PCOPPUSDM_2024-01_2026-07.csv");
    const uranium = observations("fred_PURANUSDM_2024-01_2026-07.csv");
    expect(brent.at(-1)).toEqual({ date: "2026-08-25", value: 88.24 });
    expect(wti.at(-1)).toEqual({ date: "2026-08-25", value: 83.9 });
    expect(copper.at(-1)).toEqual({ date: "2026-07-01", value: 13542.82 });
    expect(uranium.at(-1)).toEqual({ date: "2026-07-01", value: 69.23 });
    expect(round1(yoyGrowth(brent, "2026-08") ?? 0)).toBe(30.1);
    expect(round1(yoyGrowth(copper, "2026-07") ?? 0)).toBe(38.6);
    expect(round1(yoyGrowth(uranium, "2026-07") ?? 0)).toBe(17.4);
  });

  it("serializes the edition for the public API", () => {
    const edition = serializeEdition();
    expect(edition.meta.publication).toBe("Kapitaalkrant");
    expect(edition.articles).toHaveLength(articles.length);
    expect(serializeArticle(articles[0]).url).toContain("/stuk/");
  });
});
