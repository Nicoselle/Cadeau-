import { describe, expect, it } from "vitest";
import { articles } from "@/data/articles";
import { CONJUNCTUUR_1_SEPTEMBER } from "@/data/conjunctuur-1-september";
import { serializeEdition } from "@/lib/krant-api";
import { getArticle, leadArticle } from "@/lib/newspaper";

const CLIENT_LEAKS = [
  "SEALSQ",
  "target allocation",
  "Otium",
  "LWLG",
  "Nasdaq:SPCX",
  "robotica-moat",
  "24,5 miljoen",
];

describe("conjunctuur-brief 1 september 2026", () => {
  it("is the public lead and stays off the Safe Capital tape", () => {
    const brief = getArticle("conjunctuur-1-september");
    expect(brief).toBeDefined();
    expect(leadArticle().slug).toBe("conjunctuur-1-september");
    expect(brief?.desk).toBe("conjunctuur");
    expect(brief?.published).toBe("2026-09-01");
    expect(brief?.lead).toBe(true);
  });

  it("prints the CMT prints that were seen, not 1 September", () => {
    const text = JSON.stringify(CONJUNCTUUR_1_SEPTEMBER);
    expect(text).toContain("4,34");
    expect(text).toContain("4,75");
    expect(text).toContain("5,24");
    expect(text).toContain("5,25");
    expect(text).toContain("+2 bp");
    expect(text).toContain("+3 bp");
    expect(text).toMatch(/No Results Found/);
    expect(text).toMatch(/CMT van 1 september bestaat nog niet|Geen CMT 1 september/);
  });

  it("keeps buyback, penny debt, Belgian 10-year and the two oil prints", () => {
    const text = JSON.stringify(CONJUNCTUUR_1_SEPTEMBER);
    expect(text).toContain("Tentative");
    expect(text).toContain("sb0618");
    expect(text).toContain("19,3");
    expect(text).toContain("40.104.097.482.666,58");
    expect(text).toContain("574.989.793.704");
    expect(text).toContain("3,83");
    expect(text).toContain("90,49");
    expect(text).toContain("86,97");
    expect(text).toContain("4.429,70");
    expect(text).toContain("https://home.treasury.gov/news/press-releases/sb0618");
    expect(text).toContain("https://www.kitco.com/charts/gold");
  });

  it("labels the chair-speech reading as duiding, not a new print", () => {
    const readings = CONJUNCTUUR_1_SEPTEMBER.body.filter(
      (block) => block.type === "p" && block.kind === "duiding",
    );
    expect(readings.length).toBeGreaterThan(0);
    expect(JSON.stringify(readings)).toMatch(/lezing|prijs van tijd|3,50–3,75/i);
  });

  it("does not invent unseen series or leak the client layer", () => {
    const publicText = JSON.stringify({
      brief: CONJUNCTUUR_1_SEPTEMBER,
      edition: serializeEdition(),
      articles,
    });
    for (const needle of CLIENT_LEAKS) {
      expect(publicText, needle).not.toContain(needle);
    }
  });
});
