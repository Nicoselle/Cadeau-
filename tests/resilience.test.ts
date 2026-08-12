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
  retailer: "TestShop",
  affiliateUrl: "https://example.com/product/test",
  lastUpdated: "2026-08-01",
};

describe("computeResilience (v2 ROI model)", () => {
  it("returns a score between 0 and 100", () => {
    const r = computeResilience(base);
    expect(r.score).toBeGreaterThanOrEqual(0);
    expect(r.score).toBeLessThanOrEqual(100);
  });

  it("scores a max-ROI, max-shelf, no-dependency product at 100", () => {
    // E = 2500/10 = 250 → ROI capped at 60; H = 25 → 40; no penalty
    const r = computeResilience({
      ...base,
      totalCalories: 2500,
      priceEUR: 10,
      shelfLifeYearsMax: 25,
      waterRequired: false,
      hotWaterMandatory: false,
    });
    expect(r.score).toBe(100);
  });

  it("subtracts 10 points per logistical dependency (water + heat)", () => {
    const ready = {
      ...base,
      totalCalories: 2500,
      priceEUR: 10,
      shelfLifeYearsMax: 25,
      waterRequired: false,
      hotWaterMandatory: false,
    };
    expect(computeResilience(ready).score).toBe(100);
    // needs water only → −10
    expect(
      computeResilience({ ...ready, waterRequired: true }).score,
    ).toBe(90);
    // needs water + heat source → −20
    expect(
      computeResilience({
        ...ready,
        waterRequired: true,
        hotWaterMandatory: true,
      }).score,
    ).toBe(80);
  });

  it("rewards more calories per euro", () => {
    const cheap = computeResilience({ ...base, priceEUR: 10 });
    const expensive = computeResilience({ ...base, priceEUR: 200 });
    expect(cheap.score).toBeGreaterThan(expensive.score);
  });

  it("longer shelf life increases the score", () => {
    const short = computeResilience({ ...base, shelfLifeYearsMax: 5 });
    const long = computeResilience({ ...base, shelfLifeYearsMax: 25 });
    expect(long.score).toBeGreaterThan(short.score);
  });

  it("clamps a hopeless product to 0 rather than going negative", () => {
    const r = computeResilience({
      ...base,
      totalCalories: 100,
      priceEUR: 50,
      shelfLifeYearsMax: 1,
      waterRequired: true,
      hotWaterMandatory: true,
    });
    expect(r.score).toBe(0);
  });

  it("exposes the ROI, life and penalty contributions", () => {
    const r = computeResilience({
      ...base,
      waterRequired: true,
      hotWaterMandatory: true,
    });
    expect(r.components.map((c) => c.key)).toEqual(["roi", "life", "logistics"]);
    const penalty = r.components.find((c) => c.key === "logistics");
    expect(penalty?.points).toBe(-20);
  });
});
