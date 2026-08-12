import type { Product, ProductType, Scenario } from "@/types/product";

export type SortKey =
  | "resilience-desc"
  | "price100-asc"
  | "price-asc"
  | "kcal-desc"
  | "shelf-desc";

export const DEFAULT_SORT: SortKey = "resilience-desc";

export interface Filters {
  search: string;
  minShelfYears: number; // 0 = any
  minCaloriesPerDay: number; // 0 = any
  maxPricePer100Kcal: number; // 0 = any
  diets: string[]; // product must include ALL selected
  types: ProductType[]; // OR
  scenarios: Scenario[]; // product must include ANY selected
  euOnly: boolean;
  nlOnly: boolean;
  beOnly: boolean;
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
  nlOnly: false,
  beOnly: false,
  swedenOnly: false,
};

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "resilience-desc", label: "Resilience Score (hoog → laag)" },
  { value: "price100-asc", label: "Prijs per 100 kcal (laag → hoog)" },
  { value: "price-asc", label: "Totaalprijs (laag → hoog)" },
  { value: "kcal-desc", label: "Totale calorieën (hoog → laag)" },
  { value: "shelf-desc", label: "Houdbaarheid (lang → kort)" },
];

const SORT_KEYS = new Set<SortKey>(SORT_OPTIONS.map((o) => o.value));

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
  { value: 0.5, label: "≤ € 0,50" },
  { value: 1.0, label: "≤ € 1,00" },
  { value: 1.5, label: "≤ € 1,50" },
  { value: 2.0, label: "≤ € 2,00" },
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
    if (f.nlOnly && !p.availableInNetherlands) return false;
    if (f.beOnly && !p.availableInBelgium) return false;
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
      return copy.sort((a, b) => a.priceEUR - b.priceEUR);
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
  if (f.nlOnly) n++;
  if (f.beOnly) n++;
  if (f.swedenOnly) n++;
  return n;
}

const VALID_TYPES: ProductType[] = ["kit", "bucket", "pouch", "bar", "mre"];
const VALID_SCENARIOS: Scenario[] = [
  "72_HOUR_KIT",
  "BUG_OUT_BAG",
  "SHELTER_IN_PLACE",
  "30_DAY_SUPPLY",
];

/** Serialise filters + sort into a compact, shareable query string. */
export function filtersToQuery(f: Filters, sort: SortKey): string {
  const p = new URLSearchParams();
  if (f.search.trim()) p.set("q", f.search.trim());
  if (f.minShelfYears > 0) p.set("shelf", String(f.minShelfYears));
  if (f.minCaloriesPerDay > 0) p.set("kcal", String(f.minCaloriesPerDay));
  if (f.maxPricePer100Kcal > 0) p.set("price", String(f.maxPricePer100Kcal));
  if (f.diets.length) p.set("diet", f.diets.join(","));
  if (f.types.length) p.set("type", f.types.join(","));
  if (f.scenarios.length) p.set("scenario", f.scenarios.join(","));
  if (f.euOnly) p.set("eu", "1");
  if (f.nlOnly) p.set("nl", "1");
  if (f.beOnly) p.set("be", "1");
  if (f.swedenOnly) p.set("se", "1");
  if (sort !== DEFAULT_SORT) p.set("sort", sort);
  return p.toString();
}

function csv<T extends string>(value: string | null, valid: T[]): T[] {
  if (!value) return [];
  return value
    .split(",")
    .map((s) => s.trim())
    .filter((s): s is T => (valid as string[]).includes(s));
}

/** Parse filters + sort from URL search params (inverse of filtersToQuery). */
export function filtersFromQuery(params: URLSearchParams): {
  filters: Filters;
  sort: SortKey;
} {
  const num = (key: string) => {
    const n = Number(params.get(key));
    return Number.isFinite(n) && n > 0 ? n : 0;
  };
  const sortParam = params.get("sort") as SortKey | null;
  return {
    filters: {
      search: params.get("q") ?? "",
      minShelfYears: num("shelf"),
      minCaloriesPerDay: num("kcal"),
      maxPricePer100Kcal: num("price"),
      diets: csv(params.get("diet"), [
        "gluten-free",
        "vegetarian",
        "vegan",
        "dairy-free",
      ]),
      types: csv(params.get("type"), VALID_TYPES),
      scenarios: csv(params.get("scenario"), VALID_SCENARIOS),
      euOnly: params.get("eu") === "1",
      nlOnly: params.get("nl") === "1",
      beOnly: params.get("be") === "1",
      swedenOnly: params.get("se") === "1",
    },
    sort: sortParam && SORT_KEYS.has(sortParam) ? sortParam : DEFAULT_SORT,
  };
}
