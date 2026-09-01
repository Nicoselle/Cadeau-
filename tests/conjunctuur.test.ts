import { describe, expect, it } from "vitest";
import { articles } from "@/data/articles";
import { CONJUNCTUUR_1_SEPTEMBER } from "@/data/conjunctuur-1-september";
import { CONJUNCTUUR_1_SEPTEMBER_OCHTEND } from "@/data/conjunctuur-1-september-ochtend";
import { DESK_CLOCK } from "@/lib/desk-clock";
import { serializeEdition } from "@/lib/krant-api";
import { conjunctuurBriefs, getArticle, leadArticle } from "@/lib/newspaper";

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
  it("runs two daily slots at 8:00 and 15:00 Brussels", () => {
    expect(DESK_CLOCK.timezone).toBe("Europe/Brussels");
    expect(DESK_CLOCK.slots.map((slot) => slot.hour)).toEqual([8, 15]);
    const briefs = conjunctuurBriefs();
    expect(briefs.map((item) => item.slot)).toEqual(["namiddag", "ochtend"]);
    expect(getArticle("conjunctuur-1-september-ochtend")?.slot).toBe("ochtend");
    expect(getArticle("conjunctuur-1-september")?.slot).toBe("namiddag");
    expect(leadArticle().slug).toBe("conjunctuur-1-september");
    expect(CONJUNCTUUR_1_SEPTEMBER_OCHTEND.lead).toBe(false);
    expect(CONJUNCTUUR_1_SEPTEMBER_OCHTEND.kicker).toMatch(/8 uur/);
    expect(CONJUNCTUUR_1_SEPTEMBER.kicker).toMatch(/15 uur/);
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
      ochtend: CONJUNCTUUR_1_SEPTEMBER_OCHTEND,
      edition: serializeEdition(),
      articles,
    });
    for (const needle of CLIENT_LEAKS) {
      expect(publicText, needle).not.toContain(needle);
    }
  });
});
