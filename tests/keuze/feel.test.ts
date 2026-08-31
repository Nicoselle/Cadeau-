import { describe, expect, it } from "vitest";
import {
  coerceValue,
  formatFeel,
  matchCondition,
  parseFeelLiteral,
  resolveCondition,
} from "@/lib/keuze";

describe("FEEL-subset", () => {
  it("parses literals", () => {
    expect(parseFeelLiteral("12,5")).toBe(12.5);
    expect(parseFeelLiteral('"hoog"')).toBe("hoog");
    expect(parseFeelLiteral("ja")).toBe(true);
    expect(parseFeelLiteral("null")).toBeNull();
  });

  it("matches comparisons, ranges and lists", () => {
    expect(matchCondition(">= 10", 12)).toBe(true);
    expect(matchCondition("< 10", 12)).toBe(false);
    expect(matchCondition("[14..28]", 20)).toBe(true);
    expect(matchCondition("[14..28]", 14)).toBe(true);
    expect(matchCondition("(14..28]", 14)).toBe(false);
    expect(matchCondition('in ["hoog", "midden"]', "hoog")).toBe(true);
    expect(matchCondition("-", "x")).toBe(true);
  });

  it("resolves $references against context", () => {
    expect(resolveCondition(">= $spilindex", { spilindex: 132.52 })).toBe(
      ">= 132.52",
    );
    expect(matchCondition(">= $spilindex", 133.1, { spilindex: 132.52 })).toBe(
      true,
    );
    expect(matchCondition(">= $spilindex", 130, { spilindex: 132.52 })).toBe(
      false,
    );
  });

  it("coerces typed form values", () => {
    expect(coerceValue("2,13", "number")).toBe(2.13);
    expect(coerceValue("ja", "boolean")).toBe(true);
    expect(coerceValue('"midden"', "string")).toBe("midden");
  });

  it("formats values for Dutch UI", () => {
    expect(formatFeel(true)).toBe("ja");
    expect(formatFeel(null)).toBe("—");
    expect(formatFeel(2.13)).toBe("2,13");
  });
});
