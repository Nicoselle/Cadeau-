import { describe, expect, it } from "vitest";
import { SAFE_CLIENT, SAFE_NAMES, SAFE_SLEEVES } from "@/data/safe-capital";
import { articles } from "@/data/articles";
import { serializeEdition } from "@/lib/krant-api";
import { authorizeSafe } from "@/lib/safe-auth";

function basic(user: string, password: string): string {
  return `Basic ${btoa(`${user}:${password}`)}`;
}

describe("Safe Capital-poort", () => {
  it("fails closed when the password is missing or empty", () => {
    const header = basic("safe", "geheim");
    expect(authorizeSafe(header, undefined)).toBe(false);
    expect(authorizeSafe(header, "")).toBe(false);
    expect(authorizeSafe(null, "geheim")).toBe(false);
    expect(authorizeSafe("Bearer geheim", "geheim")).toBe(false);
  });

  it("accepts only the configured password", () => {
    const password = "alleen-nico";
    expect(authorizeSafe(basic("wie", password), password)).toBe(true);
    expect(authorizeSafe(basic("wie", "fout"), password)).toBe(false);
  });

  it("holds the Otium sleeves, not a 40/30/20/10 pyramid", () => {
    expect(SAFE_SLEEVES.map((sleeve) => sleeve.id)).toEqual([
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
    ]);
    expect(SAFE_SLEEVES.find((sleeve) => sleeve.id === "A")?.range).toBe(
      "20–25%",
    );
    expect(SAFE_SLEEVES.find((sleeve) => sleeve.id === "G")?.range).toBe("0%");
    expect(JSON.stringify(SAFE_SLEEVES)).not.toMatch(/40 %|40%/);
    expect(SAFE_CLIENT.disclaimer).toMatch(/geen financieel advies/i);
  });

  it("lists the requested names and the one new IR print", () => {
    const listed = SAFE_NAMES.map((item) => item.listedAs);
    expect(listed).toContain("LWLG");
    expect(listed).toContain("CSE:ACM");
    expect(listed).toContain("Nasdaq:SPCX");
    expect(listed).toContain("Nasdaq:LAES");
    expect(SAFE_NAMES).toHaveLength(27);
    const sealsq = SAFE_NAMES.find((item) => item.id === "laes");
    expect(sealsq?.tape).toContain("24,5");
    expect(sealsq?.tape).toMatch(/geen orderboek/i);
    expect(SAFE_NAMES.find((item) => item.id === "acm")?.note).toMatch(/AECOM/);
    expect(SAFE_NAMES.find((item) => item.id === "sky")?.note).toMatch(
      /niet NYSE:SKY/,
    );
  });

  it("keeps the client layer out of the public edition payload", () => {
    const publicText = JSON.stringify({
      articles,
      edition: serializeEdition(),
    });
    expect(publicText).not.toContain("Safe Capital");
    expect(publicText).not.toContain("Nasdaq:LAES");
    expect(publicText).not.toContain("24,5 miljoen");
    expect(publicText).not.toContain("robotica-moat");
    expect(publicText).not.toContain("target allocation");
  });
});
