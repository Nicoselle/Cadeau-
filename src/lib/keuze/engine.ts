import { explainCausal, runCounterfactuals } from "./causal";
import { matchCondition } from "./feel";
import type {
  DecisionDefinition,
  DecisionTable,
  EvaluationResult,
  FeelValue,
  NearMiss,
  NodeResult,
  ReviewPolicy,
  RuleMatch,
} from "./types";
import { assertNever } from "./types";

export function evaluateDecision(
  definition: DecisionDefinition,
  rawInputs: Record<string, FeelValue>,
  options?: {
    actor?: EvaluationResult["trace"]["actor"];
    authority?: string;
    now?: string;
    id?: string;
    skipCounterfactuals?: boolean;
  },
): EvaluationResult {
  const errors: string[] = [];
  const inputs = fillInputs(definition, rawInputs, errors);
  const nodeResults: NodeResult[] = [];
  const firedRules: RuleMatch[] = [];
  const nearMisses: NearMiss[] = [];
  const context: Record<string, FeelValue> = { ...inputs };

  for (const node of topologicalNodes(definition)) {
    switch (node.kind) {
      case "input": {
        const value = context[node.id] ?? null;
        nodeResults.push({
          nodeId: node.id,
          name: node.name,
          kind: node.kind,
          value,
        });
        break;
      }
      case "knowledge": {
        nodeResults.push({
          nodeId: node.id,
          name: node.name,
          kind: node.kind,
          value: node.knowledgeRef ?? node.name,
        });
        break;
      }
      case "causal": {
        nodeResults.push({
          nodeId: node.id,
          name: node.name,
          kind: node.kind,
          value: node.description,
        });
        break;
      }
      case "decision": {
        const table = definition.tables.find((item) => item.id === node.tableId);
        if (!table) {
          errors.push(`Beslissingsknoop ${node.id} mist tabel ${node.tableId}.`);
          break;
        }
        const evaluated = evaluateTable(table, context);
        firedRules.push(...evaluated.fired);
        nearMisses.push(...evaluated.nearMisses);
        errors.push(...evaluated.errors);
        Object.assign(context, evaluated.outputs);
        nodeResults.push({
          nodeId: node.id,
          name: node.name,
          kind: node.kind,
          value: evaluated.outputs,
        });
        break;
      }
      default:
        return assertNever(node.kind, "evaluateDecision.node");
    }
  }

  const outputs = collectOutputs(definition, context);
  const causal = explainCausal(definition, inputs);
  const counterfactuals = options?.skipCounterfactuals
    ? []
    : runCounterfactuals(
        definition,
        inputs,
        outputs,
        (next) =>
          evaluateDecision(definition, next, {
            ...options,
            skipCounterfactuals: true,
          }).trace.outputs,
      );
  const review = assessReview(definition.review, context, outputs);

  return {
    errors,
    trace: {
      id: options?.id ?? makeTraceId(definition.id, options?.now),
      decisionId: definition.id,
      decisionName: definition.name,
      version: definition.version,
      timestamp: options?.now ?? new Date().toISOString(),
      inputs,
      outputs,
      firedRules,
      nearMisses,
      nodeResults,
      causal,
      counterfactuals,
      requiresReview: review.required,
      reviewReason: review.reason,
      actor: options?.actor ?? "system",
      authority: options?.authority ?? definition.owner,
      status: review.required ? "proposed" : "committed",
    },
  };
}

export function evaluateTable(
  table: DecisionTable,
  context: Record<string, FeelValue>,
): {
  outputs: Record<string, FeelValue>;
  fired: RuleMatch[];
  nearMisses: NearMiss[];
  errors: string[];
} {
  const errors: string[] = [];
  const fired: RuleMatch[] = [];
  const nearMisses: NearMiss[] = [];

  const ranked = [...table.rules].sort(
    (a, b) => (a.priority ?? 100) - (b.priority ?? 100),
  );

  for (const rule of ranked) {
    const failed = table.inputIds.filter((inputId) => {
      const condition = rule.conditions[inputId] ?? "-";
      return !matchCondition(condition, context[inputId] ?? null, context);
    });

    if (failed.length === 0) {
      fired.push({
        ruleId: rule.id,
        label: rule.label,
        tableId: table.id,
        outputs: rule.outputs,
        annotation: rule.annotation,
      });
    } else if (failed.length === 1) {
      nearMisses.push({
        ruleId: rule.id,
        label: rule.label,
        tableId: table.id,
        failedInputs: failed,
      });
    }
  }

  const selected = selectByHitPolicy(table, fired, errors);
  const outputs: Record<string, FeelValue> = {};
  for (const outputId of table.outputIds) {
    outputs[outputId] = selected[0]?.outputs[outputId] ?? null;
  }

  if (table.hitPolicy === "COLLECT") {
    outputs[table.outputIds[0]] = selected
      .map((rule) => rule.outputs[table.outputIds[0]])
      .filter((value) => value !== null)
      .join(" · ");
  }

  return { outputs, fired: selected, nearMisses, errors };
}

function selectByHitPolicy(
  table: DecisionTable,
  fired: RuleMatch[],
  errors: string[],
): RuleMatch[] {
  switch (table.hitPolicy) {
    case "FIRST":
    case "PRIORITY":
      return fired.slice(0, 1);
    case "UNIQUE":
      if (fired.length > 1) {
        errors.push(
          `Tabel ${table.name} eist UNIQUE maar ${fired.length} regels vuren.`,
        );
      }
      return fired.slice(0, 1);
    case "COLLECT":
      return fired;
    default:
      return assertNever(table.hitPolicy, "selectByHitPolicy");
  }
}

function topologicalNodes(definition: DecisionDefinition) {
  const byId = new Map(definition.nodes.map((node) => [node.id, node]));
  const visiting = new Set<string>();
  const visited = new Set<string>();
  const ordered: typeof definition.nodes = [];

  const visit = (id: string) => {
    if (visited.has(id)) return;
    if (visiting.has(id)) {
      throw new Error(`Cyclus in beslissingsgraaf bij ${id}`);
    }
    const node = byId.get(id);
    if (!node) return;
    visiting.add(id);
    for (const dep of node.dependsOn) visit(dep);
    visiting.delete(id);
    visited.add(id);
    ordered.push(node);
  };

  for (const node of definition.nodes) visit(node.id);
  return ordered;
}

function fillInputs(
  definition: DecisionDefinition,
  raw: Record<string, FeelValue>,
  errors: string[],
): Record<string, FeelValue> {
  const inputs: Record<string, FeelValue> = {};
  for (const input of definition.inputs) {
    const value = raw[input.id];
    if (value === undefined || value === null || value === "") {
      errors.push(`Input ${input.name} ontbreekt.`);
      inputs[input.id] = null;
      continue;
    }
    inputs[input.id] = value;
  }
  return inputs;
}

function collectOutputs(
  definition: DecisionDefinition,
  context: Record<string, FeelValue>,
): Record<string, FeelValue> {
  const outputs: Record<string, FeelValue> = {};
  for (const output of definition.outputs) {
    outputs[output.id] = context[output.id] ?? null;
  }
  return outputs;
}

function assessReview(
  policy: ReviewPolicy,
  context: Record<string, FeelValue>,
  outputs: Record<string, FeelValue>,
): { required: boolean; reason: string | null } {
  const expression = policy.requireHumanWhen.trim();
  if (expression === "" || expression === "never") {
    return { required: false, reason: null };
  }

  const [left, op, ...rest] = expression.split(/\s+/);
  const right = rest.join(" ");
  const actual = context[left] ?? outputs[left] ?? null;
  if (!op || right === "") {
    return { required: false, reason: null };
  }

  const required = matchCondition(`${op} ${right}`, actual, {
    ...context,
    ...outputs,
  });
  return {
    required,
    reason: required
      ? `${policy.explanation} (${left} ${op} ${right})`
      : null,
  };
}

function makeTraceId(decisionId: string, now?: string): string {
  const stamp = (now ?? new Date().toISOString()).replace(/[:.]/g, "-");
  return `trc-${decisionId}-${stamp}`;
}
