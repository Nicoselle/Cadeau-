import type { Product, ProductType, Scenario } from "@/types/product";

export type SortKey =
  | "resilience-desc"
  | "price100-asc"
  | "price-asc"
  | "kcal-desc"
  | "shelf-desc";

export interface Filters {
  search: string;
  minShelfYears: number; // 0 = any
  minCaloriesPerDay: number; // 0 = any
  maxPricePer100Kcal: number; // 0 = any
  diets: string[]; // product must include ALL selected
  types: ProductType[]; // OR
  scenarios: Scenario[]; // product must include ANY selected
  euOnly: boolean;
  swedenOnly: boolean;
}

export const DEFAULT_FILTERS: Filters = {
  search: "",
  minShelfYears: 0,
  minCaloriesPerDay: 0,
  maxPricePer100Kcal: 0,
  diets: [],
  types: [],
  scenarios: [],
  euOnly: false,
  swedenOnly: false,
};

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "resilience-desc", label: "Resilience Score (hoog → laag)" },
  { value: "price100-asc", label: "Prijs per 100 kcal (laag → hoog)" },
  { value: "price-asc", label: "Totaalprijs (laag → hoog)" },
  { value: "kcal-desc", label: "Totale calorieën (hoog → laag)" },
  { value: "shelf-desc", label: "Houdbaarheid (lang → kort)" },
];

export const SHELF_OPTIONS = [
  { value: 0, label: "Alle" },
  { value: 5, label: "≥ 5 jaar" },
  { value: 10, label: "≥ 10 jaar" },
  { value: 20, label: "≥ 20 jaar" },
  { value: 25, label: "≥ 25 jaar" },
];

export const CALORIES_OPTIONS = [
  { value: 0, label: "Alle" },
  { value: 1200, label: "≥ 1200 kcal" },
  { value: 1800, label: "≥ 1800 kcal" },
  { value: 2000, label: "≥ 2000 kcal" },
  { value: 2400, label: "≥ 2400 kcal" },
];

export const PRICE_100_OPTIONS = [
  { value: 0, label: "Alle" },
  { value: 0.5, label: "≤ $0,50" },
  { value: 1.0, label: "≤ $1,00" },
  { value: 1.5, label: "≤ $1,50" },
  { value: 2.0, label: "≤ $2,00" },
];

export function collectDietOptions(products: Product[]): string[] {
  const set = new Set<string>();
  for (const p of products) for (const d of p.dietOptions) set.add(d);
  return Array.from(set).sort();
}

export function filterProducts(products: Product[], f: Filters): Product[] {
  const query = f.search.trim().toLowerCase();
  return products.filter((p) => {
    if (query) {
      const haystack = `${p.name} ${p.brand}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    if (f.minShelfYears > 0 && p.shelfLifeYearsMax < f.minShelfYears)
      return false;
    if (f.minCaloriesPerDay > 0 && p.caloriesPerDay < f.minCaloriesPerDay)
      return false;
    if (f.maxPricePer100Kcal > 0 && p.pricePer100Kcal > f.maxPricePer100Kcal)
      return false;
    if (f.diets.length > 0 && !f.diets.every((d) => p.dietOptions.includes(d)))
      return false;
    if (f.types.length > 0 && !f.types.includes(p.type)) return false;
    if (
      f.scenarios.length > 0 &&
      !f.scenarios.some((s) => p.scenarios.includes(s))
    )
      return false;
    if (f.euOnly && !p.availableInEU) return false;
    if (f.swedenOnly && !p.availableInSweden) return false;
    return true;
  });
}

export function sortProducts(products: Product[], key: SortKey): Product[] {
  const copy = [...products];
  switch (key) {
    case "resilience-desc":
      return copy.sort((a, b) => b.resilienceScore - a.resilienceScore);
    case "price100-asc":
      return copy.sort((a, b) => a.pricePer100Kcal - b.pricePer100Kcal);
    case "price-asc":
      return copy.sort((a, b) => a.priceUSD - b.priceUSD);
    case "kcal-desc":
      return copy.sort((a, b) => b.totalCalories - a.totalCalories);
    case "shelf-desc":
      return copy.sort((a, b) => b.shelfLifeYearsMax - a.shelfLifeYearsMax);
    default:
      return copy;
  }
}

export function countActiveFilters(f: Filters): number {
  let n = 0;
  if (f.search.trim()) n++;
  if (f.minShelfYears > 0) n++;
  if (f.minCaloriesPerDay > 0) n++;
  if (f.maxPricePer100Kcal > 0) n++;
  n += f.diets.length;
  n += f.types.length;
  n += f.scenarios.length;
  if (f.euOnly) n++;
  if (f.swedenOnly) n++;
  return n;
}
