export type FeelValue = number | string | boolean | null;

export type DecisionMode = "support" | "augment" | "automate";

export type HitPolicy = "UNIQUE" | "FIRST" | "COLLECT" | "PRIORITY";

export type NodeKind = "input" | "knowledge" | "decision" | "causal";

export type InputType = "number" | "string" | "boolean";

export type CausalDirection = "increases" | "decreases" | "confounds";

export type ActorKind = "system" | "human" | "human-override";

export type TraceStatus = "proposed" | "committed" | "overridden" | "outcome-recorded";

export interface DecisionInput {
  id: string;
  name: string;
  type: InputType;
  unit?: string;
  description: string;
  freshnessDays?: number;
}

export interface DecisionOutput {
  id: string;
  name: string;
  type: InputType;
  description: string;
}

export interface DecisionRule {
  id: string;
  label: string;
  conditions: Record<string, string>;
  outputs: Record<string, FeelValue>;
  priority?: number;
  annotation?: string;
}

export interface DecisionTable {
  id: string;
  name: string;
  hitPolicy: HitPolicy;
  inputIds: string[];
  outputIds: string[];
  rules: DecisionRule[];
}

export interface DecisionNode {
  id: string;
  name: string;
  kind: NodeKind;
  description: string;
  dependsOn: string[];
  tableId?: string;
  knowledgeRef?: string;
}

export interface CausalLink {
  id: string;
  cause: string;
  effect: string;
  direction: CausalDirection;
  elasticity: number;
  mechanism: string;
  confounders: string[];
}

export interface KnowledgeSource {
  id: string;
  title: string;
  kind: "policy" | "regulation" | "domain-model" | "expert";
  citation: string;
}

export interface ReviewPolicy {
  requireHumanWhen: string;
  escalationRole: string;
  explanation: string;
}

export interface DecisionDefinition {
  id: string;
  name: string;
  domain: string;
  mode: DecisionMode;
  owner: string;
  version: string;
  summary: string;
  inputs: DecisionInput[];
  outputs: DecisionOutput[];
  nodes: DecisionNode[];
  tables: DecisionTable[];
  causalGraph: CausalLink[];
  knowledge: KnowledgeSource[];
  review: ReviewPolicy;
  sampleInputs: Record<string, FeelValue>;
}

export interface RuleMatch {
  ruleId: string;
  label: string;
  tableId: string;
  outputs: Record<string, FeelValue>;
  annotation?: string;
}

export interface NearMiss {
  ruleId: string;
  label: string;
  tableId: string;
  failedInputs: string[];
}

export interface NodeResult {
  nodeId: string;
  name: string;
  kind: NodeKind;
  value: Record<string, FeelValue> | FeelValue;
}

export interface CausalExplanation {
  drivers: Array<{
    linkId: string;
    cause: string;
    effect: string;
    direction: CausalDirection;
    mechanism: string;
    observedCause: FeelValue;
  }>;
  warnings: string[];
}

export interface Counterfactual {
  label: string;
  intervene: Record<string, FeelValue>;
  output: Record<string, FeelValue>;
  deltas: Array<{
    outputId: string;
    from: FeelValue;
    to: FeelValue;
  }>;
}

export interface DecisionTrace {
  id: string;
  decisionId: string;
  decisionName: string;
  version: string;
  timestamp: string;
  inputs: Record<string, FeelValue>;
  outputs: Record<string, FeelValue>;
  firedRules: RuleMatch[];
  nearMisses: NearMiss[];
  nodeResults: NodeResult[];
  causal: CausalExplanation;
  counterfactuals: Counterfactual[];
  requiresReview: boolean;
  reviewReason: string | null;
  actor: ActorKind;
  authority: string;
  status: TraceStatus;
  note?: string;
  outcome?: DecisionOutcome;
}

export interface DecisionOutcome {
  recordedAt: string;
  actual: string;
  expected: string;
  matched: boolean;
}

export interface EvaluationResult {
  trace: DecisionTrace;
  errors: string[];
}

export function assertNever(value: never, context: string): never {
  throw new Error(`Onbehandelde variant in ${context}: ${String(value)}`);
}
