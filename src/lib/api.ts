import type { Product } from "@/types/product";
import { SCENARIO_LABELS, TYPE_LABELS } from "@/types/product";
import { computeResilience } from "@/lib/resilience";
import { SITE } from "@/lib/site";

export const ENDPOINT_VERSION = "v1";

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function serializeProduct(p: Product) {
  const resilience = computeResilience(p);
  return {
    id: p.id,
    name: p.name,
    brand: p.brand,
    type: p.type,
    type_label: TYPE_LABELS[p.type],
    url: `${SITE.url}/product/${p.id}`,
    pricing: {
      currency: "EUR",
      price_eur: p.priceEUR,
      price_per_100kcal_eur: p.pricePer100Kcal,
      cost_per_2000kcal_eur: round2((p.priceEUR / p.totalCalories) * 2000),
      price_per_day_eur: round2(p.priceEUR / p.daysOfSupply),
      price_per_serving_eur: round2(p.priceEUR / p.servings),
      retailer: p.retailer,
      affiliate_url: p.affiliateUrl,
    },
    specifications: {
      servings: p.servings,
      days_of_supply: p.daysOfSupply,
      intended_persons: p.intendedPersons,
      shelf_life_years_min: p.shelfLifeYearsMin,
      shelf_life_years_max: p.shelfLifeYearsMax,
      resilience_score: p.resilienceScore,
      resilience_breakdown: resilience.components.map((c) => ({
        key: c.key,
        label: c.label,
        points: c.points,
        max_points: c.maxPoints,
        detail: c.detail,
      })),
      diet_options: p.dietOptions,
      available_in_netherlands: p.availableInNetherlands,
      available_in_belgium: p.availableInBelgium,
      available_in_eu: p.availableInEU,
      available_in_sweden: p.availableInSweden,
    },
    nutritional_data: {
      total_calories: p.totalCalories,
      calories_per_day: p.caloriesPerDay,
      total_protein_grams: p.totalProteinGrams,
    },
    preparation_requirements: {
      water_required: p.waterRequired,
      total_water_liters: p.totalWaterLiters,
      hot_water_mandatory: p.hotWaterMandatory,
      instructions: p.preparation,
    },
    suitability_scenarios: p.scenarios.map((s) => ({
      code: s,
      label: SCENARIO_LABELS[s],
    })),
    last_updated: p.lastUpdated,
  };
}

export function apiMeta(lastUpdated: string, extra?: Record<string, unknown>) {
  return {
    status: "ok",
    last_updated: lastUpdated,
    endpoint_version: ENDPOINT_VERSION,
    disclaimer:
      "Real Benelux/EU products with live retailer links. Prices, stock and some specs (e.g. protein) may be estimated or change over time — verify on the retailer page before purchasing.",
    ...extra,
  };
}
