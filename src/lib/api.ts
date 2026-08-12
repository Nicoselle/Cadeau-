import type { Product } from "@/types/product";
import { SCENARIO_LABELS, TYPE_LABELS } from "@/types/product";
import { SITE } from "@/lib/site";

export const ENDPOINT_VERSION = "v1";

export function serializeProduct(p: Product) {
  return {
    id: p.id,
    name: p.name,
    brand: p.brand,
    type: p.type,
    type_label: TYPE_LABELS[p.type],
    url: `${SITE.url}/product/${p.id}`,
    pricing: {
      price_usd: p.priceUSD,
      price_per_100kcal_usd: p.pricePer100Kcal,
      price_per_day_usd:
        Math.round((p.priceUSD / p.daysOfSupply) * 100) / 100,
      price_per_serving_usd:
        Math.round((p.priceUSD / p.servings) * 100) / 100,
      affiliate_url: p.affiliateUrl,
    },
    specifications: {
      servings: p.servings,
      days_of_supply: p.daysOfSupply,
      intended_persons: p.intendedPersons,
      shelf_life_years_min: p.shelfLifeYearsMin,
      shelf_life_years_max: p.shelfLifeYearsMax,
      resilience_score: p.resilienceScore,
      diet_options: p.dietOptions,
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
      "Sample data for prototype/demo purposes. Verify with the supplier before purchasing.",
    ...extra,
  };
}
