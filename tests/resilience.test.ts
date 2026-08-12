import { describe, it, expect } from "vitest";
import { computeResilience } from "@/lib/resilience";
import type { ProductInput } from "@/types/product";

const base: ProductInput = {
  id: "t",
  name: "Test",
  brand: "Test",
  type: "kit",
  servings: 10,
  daysOfSupply: 3,
  intendedPersons: 1,
  totalCalories: 6000,
  totalProteinGrams: 150,
  shelfLifeYearsMin: 25,
  shelfLifeYearsMax: 25,
  waterRequired: true,
  totalWaterLiters: 5,
  hotWaterMandatory: false,
  priceEUR: 60,
  dietOptions: [],
  preparation: "",
  scenarios: ["72_HOUR_KIT"],
  availableInEU: true,
  availableInNetherlands: true,
  availableInBelgium: true,
  availableInSweden: false,
  affiliateUrl: "https://example.com/affiliate/test",
  lastUpdated: "2026-08-01",
};

describe("computeResilience", () => {
  it("returns a score between 0 and 100", () => {
    const r = computeResilience(base);
    expect(r.score).toBeGreaterThanOrEqual(0);
    expect(r.score).toBeLessThanOrEqual(100);
  });

  it("component weights sum to 1", () => {
    const r = computeResilience(base);
    const total = r.components.reduce((s, c) => s + c.weight, 0);
    expect(total).toBeCloseTo(1, 5);
  });

  it("ready-to-eat products score higher on water independence than hot-water ones", () => {
    const readyToEat = computeResilience({
      ...base,
      waterRequired: false,
      totalWaterLiters: null,
    });
    const hotWater = computeResilience({
      ...base,
      waterRequired: true,
      hotWaterMandatory: true,
    });
    expect(readyToEat.score).toBeGreaterThan(hotWater.score);
  });

  it("longer shelf life increases the score", () => {
    const short = computeResilience({ ...base, shelfLifeYearsMax: 5 });
    const long = computeResilience({ ...base, shelfLifeYearsMax: 25 });
    expect(long.score).toBeGreaterThan(short.score);
  });
});
