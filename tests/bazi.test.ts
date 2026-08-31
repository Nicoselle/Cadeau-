import { describe, expect, it } from "vitest";
import {
  computeBazi,
  dayIndex,
  hourBranch,
  monthBranchFromSolarLon,
  yearIndexAfterLichun,
} from "@/lib/engines/bazi";

describe("BaZi pillars", () => {
  it("starts the 1984 Jia Zi cycle after Li Chun", () => {
    const after = yearIndexAfterLichun(new Date("1984-03-01T12:00:00Z"));
    expect(after).toBe(0);
    const twentyTwentyFour = yearIndexAfterLichun(new Date("2024-03-01T12:00:00Z"));
    expect(twentyTwentyFour).toBe(40);
  });

  it("maps Li Chun longitude to the Tiger month", () => {
    expect(monthBranchFromSolarLon(315)).toBe(2);
    expect(monthBranchFromSolarLon(0)).toBe(3);
  });

  it("uses the traditional 23:00 Zi hour", () => {
    expect(hourBranch(23, 30)).toBe(0);
    expect(hourBranch(0, 15)).toBe(0);
    expect(hourBranch(11, 0)).toBe(6);
  });

  it("returns a dominant element and sector list", () => {
    const chart = computeBazi(new Date("1988-06-20T10:00:00Z"), 12, 0);
    expect(chart.dominant).toMatch(/wood|fire|earth|metal|water/);
    expect(chart.sectors.length).toBeGreaterThan(0);
    expect(chart.day.stem).toBeTruthy();
    expect(dayIndex(2000, 1, 1)).toBeGreaterThanOrEqual(0);
  });
});
