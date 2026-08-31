import { describe, expect, it } from "vitest";
import {
  computeNumerology,
  lifePathFromDate,
  personalYearFrom,
  reduceNumber,
} from "@/lib/engines/numerology";

describe("numerology", () => {
  it("keeps master numbers", () => {
    expect(reduceNumber(11)).toBe(11);
    expect(reduceNumber(22)).toBe(22);
    expect(reduceNumber(29)).toBe(11);
    expect(reduceNumber(10)).toBe(1);
  });

  it("computes a known life path", () => {
    expect(lifePathFromDate("1975-06-15")).toBe(7);
    expect(lifePathFromDate("1988-11-22")).toBe(5);
  });

  it("computes expression from a stripped name", () => {
    const result = computeNumerology("Jan de Vries", "1980-01-01", new Date("2026-01-01T00:00:00Z"));
    expect(result.expression).toBeGreaterThan(0);
    expect(result.soulUrge).toBeGreaterThan(0);
    expect(result.personality).toBeGreaterThan(0);
    expect(result.lifePath).toBe(2);
  });

  it("marks 2026 as a personal year independently of masters", () => {
    expect(personalYearFrom("1988-03-04", 2026)).toBe(8);
  });
});
