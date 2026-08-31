import { describe, expect, it } from "vitest";
import { articles } from "@/data/articles";
import { getArticle } from "@/lib/newspaper";
import {
  EFFECTKETEN_TEST,
  answersCatchUp,
  claimsTemporaryEqualsLevel,
  flattenClaimText,
} from "@/lib/effectketen";

describe("effectketen — tijdelijk in de regel is niet tijdelijk in de portemonnee", () => {
  it("keeps the catch-up test as a house rule", () => {
    expect(EFFECTKETEN_TEST).toMatch(/ingehaald/);
    expect(EFFECTKETEN_TEST).toMatch(/ja, nee, of onbekend/);
  });

  it("forbids claiming a temporary rule means no lasting cut", () => {
    for (const article of articles) {
      const claims = flattenClaimText(article);
      expect(
        claimsTemporaryEqualsLevel(claims),
        `${article.slug} schrijft «geen blijvende korting» zonder inhaal`,
      ).toBe(false);
    }
  });

  it("makes the cents-index piece answer the catch-up question with an example", () => {
    const piece = getArticle("centenindex-is-wet");
    expect(piece).toBeDefined();
    const haystack = JSON.stringify(piece);
    expect(answersCatchUp(haystack)).toBe(true);
    expect(haystack).toContain("5.080");
    expect(haystack).toContain("5.100");
    expect(haystack).toMatch(/geen inhaal|niet ingehaald/i);
    expect(haystack).toMatch(/correctie/i);
    expect(piece?.steenman?.objection).toMatch(/hervat/i);
    expect(piece?.steenman?.antwoord).toMatch(/niet ingehaald|lager loonpad/i);
  });

  it("keeps the kraan from selling the 2 percent cap as temporary money", () => {
    const piece = getArticle("kraan-weer-open");
    const claims = flattenClaimText(piece!);
    expect(claims).toMatch(/centenindex/i);
    expect(answersCatchUp(claims)).toBe(true);
    expect(claimsTemporaryEqualsLevel(claims)).toBe(false);
  });
});
