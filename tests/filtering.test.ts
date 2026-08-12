import { describe, it, expect } from "vitest";
import {
  DEFAULT_FILTERS,
  DEFAULT_SORT,
  filterProducts,
  filtersFromQuery,
  filtersToQuery,
  sortProducts,
  type Filters,
} from "@/lib/filtering";
import { products } from "@/data/products";

describe("filterProducts", () => {
  it("returns all products with default filters", () => {
    expect(filterProducts(products, DEFAULT_FILTERS)).toHaveLength(
      products.length,
    );
  });

  it("filters by minimum shelf life (uses max years)", () => {
    const f: Filters = { ...DEFAULT_FILTERS, minShelfYears: 25 };
    const out = filterProducts(products, f);
    expect(out.length).toBeGreaterThan(0);
    expect(out.every((p) => p.shelfLifeYearsMax >= 25)).toBe(true);
  });

  it("filters by max price per 100 kcal", () => {
    const f: Filters = { ...DEFAULT_FILTERS, maxPricePer100Kcal: 0.5 };
    const out = filterProducts(products, f);
    expect(out.every((p) => p.pricePer100Kcal <= 0.5)).toBe(true);
  });

  it("requires ALL selected diets (AND semantics)", () => {
    const f: Filters = { ...DEFAULT_FILTERS, diets: ["vegetarian"] };
    const out = filterProducts(products, f);
    expect(out.every((p) => p.dietOptions.includes("vegetarian"))).toBe(true);
  });

  it("matches ANY selected scenario (OR semantics)", () => {
    const f: Filters = { ...DEFAULT_FILTERS, scenarios: ["BUG_OUT_BAG"] };
    const out = filterProducts(products, f);
    expect(out.every((p) => p.scenarios.includes("BUG_OUT_BAG"))).toBe(true);
  });

  it("filters by Netherlands availability", () => {
    const f: Filters = { ...DEFAULT_FILTERS, nlOnly: true };
    const out = filterProducts(products, f);
    expect(out.length).toBeGreaterThan(0);
    expect(out.every((p) => p.availableInNetherlands)).toBe(true);
  });

  it("search matches brand or name, case-insensitive", () => {
    const f: Filters = { ...DEFAULT_FILTERS, search: "mountain" };
    const out = filterProducts(products, f);
    expect(out).toHaveLength(1);
    expect(out[0].brand).toBe("Mountain House");
  });
});

describe("sortProducts", () => {
  it("sorts by price per 100 kcal ascending", () => {
    const out = sortProducts(products, "price100-asc");
    for (let i = 1; i < out.length; i++) {
      expect(out[i].pricePer100Kcal).toBeGreaterThanOrEqual(
        out[i - 1].pricePer100Kcal,
      );
    }
  });

  it("sorts by resilience score descending", () => {
    const out = sortProducts(products, "resilience-desc");
    for (let i = 1; i < out.length; i++) {
      expect(out[i].resilienceScore).toBeLessThanOrEqual(
        out[i - 1].resilienceScore,
      );
    }
  });

  it("does not mutate the input array", () => {
    const before = products.map((p) => p.id);
    sortProducts(products, "kcal-desc");
    expect(products.map((p) => p.id)).toEqual(before);
  });
});

describe("URL round-trip", () => {
  it("serialises and parses filters back to the same value", () => {
    const f: Filters = {
      ...DEFAULT_FILTERS,
      search: "wise",
      minShelfYears: 25,
      maxPricePer100Kcal: 1,
      diets: ["vegetarian"],
      types: ["kit", "pouch"],
      scenarios: ["BUG_OUT_BAG"],
      nlOnly: true,
      beOnly: true,
    };
    const query = filtersToQuery(f, "price-asc");
    const parsed = filtersFromQuery(new URLSearchParams(query));
    expect(parsed.filters).toEqual(f);
    expect(parsed.sort).toBe("price-asc");
  });

  it("empty filters produce an empty query and default sort", () => {
    const query = filtersToQuery(DEFAULT_FILTERS, DEFAULT_SORT);
    expect(query).toBe("");
    const parsed = filtersFromQuery(new URLSearchParams(query));
    expect(parsed.filters).toEqual(DEFAULT_FILTERS);
    expect(parsed.sort).toBe(DEFAULT_SORT);
  });

  it("ignores unknown enum values in the URL", () => {
    const parsed = filtersFromQuery(
      new URLSearchParams("type=kit,bogus&sort=nonsense"),
    );
    expect(parsed.filters.types).toEqual(["kit"]);
    expect(parsed.sort).toBe(DEFAULT_SORT);
  });
});
