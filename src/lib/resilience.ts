import type { ProductInput } from "@/types/product";

/**
 * Resilience Score (v2 — financiële-ROI model).
 *
 * De score weegt hoeveel calorieën je per euro krijgt (60%) en de houdbaarheid
 * (40%), en trekt een logistieke penalty af voor afhankelijkheden (water en/of
 * hittebron). Reproduceerbaar en per onderdeel uitlegbaar aan mens én AI.
 *
 *   E      = totale kcal / prijs            (kcal per euro)
 *   S_roi  = min(E / E_MAX, 1) * 60         (E_MAX = 250 kcal/€)
 *   S_life = (H / H_MAX) * 40               (H_MAX = 25 jaar)
 *   L_p    = (W + F) * -10                  (-10 per afhankelijkheid)
 *   R      = clamp(round(S_roi + S_life + L_p), 0, 100)
 */

export const E_MAX = 250; // hoogst gewaardeerde kcal per euro
export const H_MAX = 25; // maximale industriële houdbaarheid (jaren)
export const ROI_WEIGHT = 60;
export const LIFE_WEIGHT = 40;
export const DEPENDENCY_PENALTY = 10;

export interface ResilienceComponent {
  key: string;
  label: string;
  points: number; // signed bijdrage aan de eindscore
  maxPoints: number; // max haalbare punten (0 voor de penalty: ideaal = geen)
  detail: string;
}

export interface ResilienceResult {
  score: number; // 0–100
  components: ResilienceComponent[];
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export function computeResilience(p: ProductInput): ResilienceResult {
  const water = p.waterRequired ? 1 : 0;
  const heat = p.hotWaterMandatory ? 1 : 0;
  const shelf = p.shelfLifeYearsMax;

  const efficiency = p.totalCalories / p.priceEUR; // kcal per euro
  const roi = Math.min(efficiency / E_MAX, 1) * ROI_WEIGHT;
  const life = (shelf / H_MAX) * LIFE_WEIGHT;
  const penalty = (water + heat) * -DEPENDENCY_PENALTY;

  const score = clamp(Math.round(roi + life + penalty), 0, 100);

  const dependencies = [water ? "water" : null, heat ? "hittebron" : null].filter(
    Boolean,
  ) as string[];

  const components: ResilienceComponent[] = [
    {
      key: "roi",
      label: "Calorie-ROI",
      points: round1(roi),
      maxPoints: ROI_WEIGHT,
      detail: `${Math.round(efficiency)} kcal/€ (doel: ${E_MAX})`,
    },
    {
      key: "life",
      label: "Levensduur",
      points: round1(life),
      maxPoints: LIFE_WEIGHT,
      detail: `${shelf} jaar (doel: ${H_MAX})`,
    },
    {
      key: "logistics",
      label: "Logistieke penalty",
      points: penalty,
      maxPoints: 0,
      detail:
        dependencies.length === 0
          ? "Geen afhankelijkheden"
          : `−${DEPENDENCY_PENALTY} per afhankelijkheid: ${dependencies.join(" + ")}`,
    },
  ];

  return { score, components };
}
