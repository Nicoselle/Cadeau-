import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { ALLOCATION, ALLOCATION_MANIFEST } from "@/data/allocation";
import { articles } from "@/data/articles";
import { getArticle, leadArticle } from "@/lib/newspaper";
import { TAPE_NOTES } from "@/data/tape-notes";

const unseen = [
  "ISM",
  "flash HICP",
  "S&P Global",
  "JOLTS",
  "Kansas City",
  "CoinGecko",
  "Bloomberg",
  "Statbel",
  "NioCorp",
  "leefotium",
];

describe("conjunctuur-brief 1 september", () => {
  it("is the public lead and keeps facts away from unseen prints", () => {
    const lead = leadArticle();
    expect(lead.slug).toBe("conjunctuur-brief-1-september");
    expect(lead.edition).toBe(3);
    expect(lead.published).toBe("2026-09-01");
    const haystack = JSON.stringify(lead);
    expect(haystack).toContain("4,34");
    expect(haystack).toContain("4,75");
    expect(haystack).toContain("5,25");
    expect(haystack).toContain("40.104.097.482.666,58");
    expect(haystack).toContain("574.989.793.704");
    expect(haystack).toContain("3,83");
    expect(haystack).toContain("86,97");
    expect(haystack).toContain("4.429,70");
    expect(haystack).toContain("sb0618");
    expect(haystack).toMatch(/duiding/);
    expect(haystack).not.toMatch(/40\/30\/20\/10|40 procent edelmetalen/);
    expect(haystack).not.toMatch(/\bLWLG\b|\bPLTR\b|\bTSLA\b/);
    for (const token of unseen) {
      expect(haystack, token).not.toContain(token);
    }
    expect(getArticle("reele-rente-houdt-de-bodem")?.lead).toBe(false);
    expect(articles.filter((article) => article.lead)).toHaveLength(1);
  });

  it("keeps allocation A–G behind the gate, not Brecht 40/30/20/10", () => {
    expect(ALLOCATION.map((sleeve) => sleeve.id)).toEqual([
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
    ]);
    expect(ALLOCATION[0]?.band).toBe("20–25%");
    expect(ALLOCATION[6]?.band).toBe("0%");
    expect(ALLOCATION_MANIFEST.doctrine).toMatch(/niet de 40\/30\/20\/10/i);
    expect(TAPE_NOTES.some((note) => note.id === "laes")).toBe(true);
    expect(TAPE_NOTES.some((note) => note.kind === "niet-gezien")).toBe(true);
  });

  it("does not advertise the pyramid or watchlist on public chrome", () => {
    const files = [
      "src/app/page.tsx",
      "src/components/site-header.tsx",
      "src/components/site-footer.tsx",
      "src/app/methode/page.tsx",
      "src/app/markten/page.tsx",
      "src/lib/site.ts",
    ];
    const haystack = files
      .map((file) => readFileSync(path.join(process.cwd(), file), "utf8"))
      .join("\n");
    expect(haystack).not.toMatch(/40 procent edelmetalen|40 % — edelmetalen/);
    expect(haystack).not.toMatch(/40\/30\/20\/10/);
    expect(haystack).not.toContain("WatchTape");
    expect(haystack).not.toContain('href="/piramide"');
    expect(haystack).not.toMatch(/De piramide van SafeCapital/);
  });
});
