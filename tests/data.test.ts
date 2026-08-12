import { describe, it, expect } from "vitest";
import { products } from "@/data/products";
import { serializeProduct } from "@/lib/api";

describe("product data integrity", () => {
  it("has unique ids", () => {
    const ids = products.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("derives caloriesPerDay from totalCalories / daysOfSupply", () => {
    for (const p of products) {
      expect(p.caloriesPerDay).toBe(
        Math.round(p.totalCalories / p.daysOfSupply),
      );
    }
  });

  it("derives pricePer100Kcal from priceEUR and totalCalories", () => {
    for (const p of products) {
      const expected =
        Math.round((p.priceEUR / p.totalCalories) * 100 * 100) / 100;
      expect(p.pricePer100Kcal).toBe(expected);
    }
  });

  it("has consistent water fields", () => {
    for (const p of products) {
      if (!p.waterRequired) {
        expect(p.totalWaterLiters).toBeNull();
        expect(p.hotWaterMandatory).toBe(false);
      }
    }
  });

  it("keeps the documented Mountain House specs", () => {
    const mh = products.find((p) => p.id === "mh-83608");
    expect(mh).toBeDefined();
    expect(mh!.totalCalories).toBe(5118);
    expect(mh!.caloriesPerDay).toBe(1706);
    expect(mh!.servings).toBe(18);
  });
});

describe("serializeProduct", () => {
  it("exposes the required API sections in EUR", () => {
    const dto = serializeProduct(products[0]);
    expect(dto.pricing.currency).toBe("EUR");
    expect(dto.pricing).toHaveProperty("price_eur");
    expect(dto.pricing).toHaveProperty("price_per_100kcal_eur");
    expect(dto.pricing).toHaveProperty("cost_per_2000kcal_eur");
    expect(dto.specifications).toHaveProperty("available_in_netherlands");
    expect(dto.specifications).toHaveProperty("available_in_belgium");
    expect(Array.isArray(dto.specifications.resilience_breakdown)).toBe(true);
    expect(dto.nutritional_data).toHaveProperty("total_calories");
    expect(dto.preparation_requirements).toHaveProperty("water_required");
    expect(Array.isArray(dto.suitability_scenarios)).toBe(true);
  });
});
