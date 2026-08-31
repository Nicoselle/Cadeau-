export { evaluateDecision, evaluateTable } from "./engine";
export { explainCausal, runCounterfactuals } from "./causal";
export {
  coerceValue,
  equals,
  formatFeel,
  matchCondition,
  parseFeelLiteral,
  resolveCondition,
} from "./feel";
export {
  LEDGER_STORAGE_KEY,
  commitTrace,
  ledgerStats,
  parseStoredLedger,
  recordOutcome,
  sortLedger,
} from "./ledger";
export type {
  ActorKind,
  CausalExplanation,
  CausalLink,
  Counterfactual,
  DecisionDefinition,
  DecisionInput,
  DecisionMode,
  DecisionOutcome,
  DecisionTable,
  DecisionTrace,
  EvaluationResult,
  FeelValue,
  HitPolicy,
  KnowledgeSource,
  NearMiss,
  NodeKind,
  RuleMatch,
  TraceStatus,
} from "./types";
export { assertNever } from "./types";
