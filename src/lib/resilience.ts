import type { ProductInput } from "@/types/product";

/**
 * Transparent Resilience Score.
 *
 * Instead of a hand-assigned number, the score is derived from five weighted
 * components, each normalised to 0–100. This makes the score reproducible and
 * explainable to both people and AI agents.
 *
 * Targets used for normalisation:
 * - Shelf life: 25 years = full marks
 * - Calorie adequacy: 2000 kcal/person/day = full marks
 * - Protein adequacy: 50 g/person/day = full marks
 */

export interface ResilienceComponent {
  key: string;
  label: string;
  score: number; // 0–100
  weight: number; // 0–1, weights sum to 1
  detail: string;
}

export interface ResilienceResult {
  score: number; // 0–100
  components: ResilienceComponent[];
}

const CALORIE_TARGET = 2000;
const PROTEIN_TARGET = 50;
const SHELF_TARGET = 25;

function clamp01(n: number): number {
  return Math.max(0, Math.min(1, n));
}

export function computeResilience(p: ProductInput): ResilienceResult {
  const caloriesPerDay = p.totalCalories / p.daysOfSupply;
  const proteinPerDay = p.totalProteinGrams / p.daysOfSupply;

  const shelf = clamp01(p.shelfLifeYearsMax / SHELF_TARGET);
  const calories = clamp01(caloriesPerDay / CALORIE_TARGET);
  const protein = clamp01(proteinPerDay / PROTEIN_TARGET);

  // Water independence: no water needed is ideal; hot water is the hardest.
  const water = !p.waterRequired ? 1 : p.hotWaterMandatory ? 0.3 : 0.6;

  // Readiness: can it be eaten with little/no preparation?
  const readiness = !p.waterRequired ? 1 : p.hotWaterMandatory ? 0.2 : 0.7;

  const components: ResilienceComponent[] = [
    {
      key: "shelf",
      label: "Houdbaarheid",
      score: Math.round(shelf * 100),
      weight: 0.3,
      detail: `${p.shelfLifeYearsMax} jaar (doel: ${SHELF_TARGET})`,
    },
    {
      key: "calories",
      label: "Calorie-adequaatheid",
      score: Math.round(calories * 100),
      weight: 0.2,
      detail: `${Math.round(caloriesPerDay)} kcal/dag (doel: ${CALORIE_TARGET})`,
    },
    {
      key: "water",
      label: "Wateronafhankelijkheid",
      score: Math.round(water * 100),
      weight: 0.2,
      detail: p.waterRequired
        ? p.hotWaterMandatory
          ? "Heet water/koken vereist"
          : "Koud water volstaat"
        : "Geen water nodig",
    },
    {
      key: "readiness",
      label: "Kant-en-klaar",
      score: Math.round(readiness * 100),
      weight: 0.15,
      detail: !p.waterRequired
        ? "Direct eetbaar"
        : p.hotWaterMandatory
          ? "Bereiding met warmtebron"
          : "Weken in koud water mogelijk",
    },
    {
      key: "protein",
      label: "Eiwit-adequaatheid",
      score: Math.round(protein * 100),
      weight: 0.15,
      detail: `${Math.round(proteinPerDay)} g/dag (doel: ${PROTEIN_TARGET})`,
    },
  ];

  const weighted =
    shelf * 0.3 +
    calories * 0.2 +
    water * 0.2 +
    readiness * 0.15 +
    protein * 0.15;

  return {
    score: Math.round(weighted * 100),
    components,
  };
}
