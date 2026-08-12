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
  caloriesPerDay: number;
  totalProteinGrams: number;
  shelfLifeYearsMin: number;
  shelfLifeYearsMax: number;
  waterRequired: boolean;
  totalWaterLiters: number | null;
  hotWaterMandatory: boolean;
  priceUSD: number;
  pricePer100Kcal: number;
  dietOptions: string[]; // e.g. "gluten-free", "vegetarian"
  preparation: string;
  scenarios: Scenario[];
  resilienceScore: number; // 0–100
  availableInEU: boolean;
  availableInSweden: boolean;
  affiliateUrl: string;
  lastUpdated: string; // ISO date
}

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
