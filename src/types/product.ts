export type ProductType = "kit" | "bucket" | "pouch" | "bar" | "mre";

export type Scenario =
  | "SHELTER_IN_PLACE"
  | "BUG_OUT_BAG"
  | "72_HOUR_KIT"
  | "30_DAY_SUPPLY";

export interface Product {
  id: string;
  name: string;
  brand: string;
  type: ProductType;
  servings: number;
  daysOfSupply: number;
  intendedPersons: number;
  totalCalories: number;
  caloriesPerDay: number; // derived: totalCalories / daysOfSupply
  totalProteinGrams: number;
  shelfLifeYearsMin: number;
  shelfLifeYearsMax: number;
  waterRequired: boolean;
  totalWaterLiters: number | null;
  hotWaterMandatory: boolean;
  priceEUR: number;
  pricePer100Kcal: number; // derived (EUR): priceEUR / totalCalories * 100
  dietOptions: string[]; // e.g. "gluten-free", "vegetarian"
  preparation: string;
  scenarios: Scenario[];
  resilienceScore: number; // derived: 0–100, see lib/resilience.ts
  availableInEU: boolean;
  availableInNetherlands: boolean;
  availableInBelgium: boolean;
  availableInSweden: boolean;
  retailer: string; // name of the shop the link points to
  affiliateUrl: string; // real retailer product page (wrap with your affiliate program)
  lastUpdated: string; // ISO date
}

/** Raw product facts. Derived fields are computed in src/data/products.ts. */
export type ProductInput = Omit<
  Product,
  "caloriesPerDay" | "pricePer100Kcal" | "resilienceScore"
>;

export const SCENARIO_LABELS: Record<Scenario, string> = {
  SHELTER_IN_PLACE: "Shelter in place",
  BUG_OUT_BAG: "Bug-out bag",
  "72_HOUR_KIT": "72-uurs kit",
  "30_DAY_SUPPLY": "30-dagen voorraad",
};

export const TYPE_LABELS: Record<ProductType, string> = {
  kit: "Kit",
  bucket: "Emmer",
  pouch: "Zak",
  bar: "Reep",
  mre: "MRE",
};

export const DIET_LABELS: Record<string, string> = {
  "gluten-free": "Glutenvrij",
  vegetarian: "Vegetarisch",
  vegan: "Veganistisch",
  "dairy-free": "Lactosevrij",
};

export function dietLabel(slug: string): string {
  return DIET_LABELS[slug] ?? slug;
}
