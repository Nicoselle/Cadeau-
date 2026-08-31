import type {
  CausalExplanation,
  CausalLink,
  Counterfactual,
  DecisionDefinition,
  FeelValue,
} from "./types";
import { formatFeel } from "./feel";

export function explainCausal(
  definition: DecisionDefinition,
  inputs: Record<string, FeelValue>,
): CausalExplanation {
  const drivers = definition.causalGraph
    .filter((link) => link.direction !== "confounds")
    .map((link) => ({
      linkId: link.id,
      cause: link.cause,
      effect: link.effect,
      direction: link.direction,
      mechanism: link.mechanism,
      observedCause: resolveNamed(definition, inputs, link.cause),
    }));

  const warnings = definition.causalGraph
    .filter((link) => link.direction === "confounds" || link.confounders.length > 0)
    .map((link) => confounderWarning(link, inputs));

  return { drivers, warnings };
}

export function runCounterfactuals(
  definition: DecisionDefinition,
  baselineInputs: Record<string, FeelValue>,
  baselineOutputs: Record<string, FeelValue>,
  evaluate: (
    inputs: Record<string, FeelValue>,
  ) => Record<string, FeelValue>,
): Counterfactual[] {
  return definition.inputs
    .filter((input) => input.type === "number")
    .slice(0, 3)
    .flatMap((input) => {
      const current = baselineInputs[input.id];
      if (typeof current !== "number") return [];
      const step = counterfactualStep(current);
      return [
        buildCounterfactual(
          `${input.name} +${formatFeel(step)} ${input.unit ?? ""}`.trim(),
          { [input.id]: current + step },
          baselineInputs,
          baselineOutputs,
          evaluate,
        ),
        buildCounterfactual(
          `${input.name} −${formatFeel(step)} ${input.unit ?? ""}`.trim(),
          { [input.id]: Math.max(0, current - step) },
          baselineInputs,
          baselineOutputs,
          evaluate,
        ),
      ];
    });
}

function buildCounterfactual(
  label: string,
  intervene: Record<string, FeelValue>,
  baselineInputs: Record<string, FeelValue>,
  baselineOutputs: Record<string, FeelValue>,
  evaluate: (inputs: Record<string, FeelValue>) => Record<string, FeelValue>,
): Counterfactual {
  const nextInputs = { ...baselineInputs, ...intervene };
  const output = evaluate(nextInputs);
  const deltas = Object.keys(baselineOutputs).map((outputId) => ({
    outputId,
    from: baselineOutputs[outputId] ?? null,
    to: output[outputId] ?? null,
  }));
  return { label, intervene, output, deltas };
}

function counterfactualStep(value: number): number {
  if (value === 0) return 1;
  if (Math.abs(value) >= 100) return Math.round(value * 0.1);
  if (Math.abs(value) >= 10) return Math.round(value * 0.2);
  return Number((value * 0.25 || 1).toFixed(2));
}

function resolveNamed(
  definition: DecisionDefinition,
  inputs: Record<string, FeelValue>,
  nameOrId: string,
): FeelValue {
  if (nameOrId in inputs) return inputs[nameOrId];
  const input = definition.inputs.find(
    (item) => item.id === nameOrId || item.name === nameOrId,
  );
  if (input) return inputs[input.id] ?? null;
  return nameOrId;
}

function confounderWarning(
  link: CausalLink,
  inputs: Record<string, FeelValue>,
): string {
  const names = [link.cause, ...link.confounders].join(", ");
  const observed = link.confounders
    .map((id) => `${id}=${formatFeel(inputs[id] ?? null)}`)
    .join("; ");
  return `Verband ${link.cause} → ${link.effect} is geen zuivere causale pijl (${names}). ${observed ? `Gezien: ${observed}.` : ""} ${link.mechanism}`.trim();
}
