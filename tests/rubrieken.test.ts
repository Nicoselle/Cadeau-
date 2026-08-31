import { describe, expect, it } from "vitest";
import { articles } from "@/data/articles";
import { getArticle } from "@/lib/newspaper";
import { DESK_LABELS, desks, mastheadRubrieken, RUBRIEKEN } from "@/lib/rubrieken";
import type { Desk } from "@/types/newspaper";

describe("meer rubrieken dan landen alleen", () => {
  it("registers nine desks including geld, rente, grondstoffen and titels", () => {
    expect(desks()).toEqual([
      "vs",
      "eurozone",
      "belgie",
      "geld",
      "rente",
      "grondstoffen",
      "titels",
      "opinie",
      "methode",
    ]);
    expect(DESK_LABELS.grondstoffen).toBe("Grondstoffen");
    expect(mastheadRubrieken().map((item) => item.id)).toContain("geld");
    expect(RUBRIEKEN.some((item) => item.href === "/rubrieken")).toBe(false);
    expect(RUBRIEKEN.some((item) => item.href === "/markten")).toBe(true);
  });

  it("gives every desk at least one piece, except methode which keeps the house-rules page", () => {
    for (const desk of desks()) {
      if (desk === "methode") continue;
      expect(
        articles.some((article) => article.desk === desk),
        `rubriek ${desk} is leeg`,
      ).toBe(true);
    }
  });

  it("fills the four new edition-2 desks from the floor", () => {
    const geld = getArticle("juni-blijft-de-editievloer");
    const rente = getArticle("spread-is-van-veertien-augustus");
    const grond = getArticle("vat-koper-pond");
    const titels = getArticle("namen-zonder-koersdoel");

    expect(geld?.desk).toBe("geld");
    expect(JSON.stringify(geld)).toContain("23.155,2");
    expect(JSON.stringify(geld)).toContain("23.115,2");

    expect(rente?.desk).toBe("rente");
    expect(JSON.stringify(rente)).toContain("+1,05");
    expect(JSON.stringify(rente)).not.toMatch(/\+1,04 pp/);

    expect(grond?.desk).toBe("grondstoffen");
    expect(JSON.stringify(grond)).toContain("88,24");
    expect(JSON.stringify(grond)).toContain("13.542,82");

    expect(titels?.desk).toBe("titels");
    expect(JSON.stringify(titels)).toContain("30");
    expect(JSON.stringify(titels)).toMatch(/geen koersdoel/i);
  });

  it("keeps every article desk in the registry", () => {
    const known = new Set(desks());
    for (const article of articles) {
      expect(known.has(article.desk as Desk), article.slug).toBe(true);
    }
  });
});
