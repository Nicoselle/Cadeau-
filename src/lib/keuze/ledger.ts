import type {
  ActorKind,
  DecisionOutcome,
  DecisionTrace,
  TraceStatus,
} from "./types";
import { assertNever } from "./types";

export const LEDGER_STORAGE_KEY = "keuze.ledger.v1";

export function commitTrace(
  trace: DecisionTrace,
  actor: ActorKind,
  authority: string,
  note?: string,
): DecisionTrace {
  return {
    ...trace,
    actor,
    authority,
    note,
    status: actor === "human-override" ? "overridden" : "committed",
    timestamp: new Date().toISOString(),
  };
}

export function recordOutcome(
  trace: DecisionTrace,
  actual: string,
  expected: string,
  recordedAt = new Date().toISOString(),
): DecisionTrace {
  const outcome: DecisionOutcome = {
    recordedAt,
    actual,
    expected,
    matched: normalize(actual) === normalize(expected),
  };
  return {
    ...trace,
    outcome,
    status: "outcome-recorded",
  };
}

export function sortLedger(traces: DecisionTrace[]): DecisionTrace[] {
  return [...traces].sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

export function ledgerStats(traces: DecisionTrace[]) {
  const committed = traces.filter((trace) =>
    isClosedStatus(trace.status),
  ).length;
  const reviewed = traces.filter((trace) => trace.actor !== "system").length;
  const withOutcome = traces.filter((trace) => trace.outcome).length;
  const matched = traces.filter((trace) => trace.outcome?.matched).length;
  return {
    total: traces.length,
    committed,
    reviewed,
    withOutcome,
    hitRate: withOutcome === 0 ? null : matched / withOutcome,
  };
}

function isClosedStatus(status: TraceStatus): boolean {
  switch (status) {
    case "committed":
    case "overridden":
    case "outcome-recorded":
      return true;
    case "proposed":
      return false;
    default:
      return assertNever(status, "isClosedStatus");
  }
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function parseStoredLedger(raw: string | null): DecisionTrace[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isTrace);
  } catch {
    return [];
  }
}

function isTrace(value: unknown): value is DecisionTrace {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<DecisionTrace>;
  return (
    typeof record.id === "string" &&
    typeof record.decisionId === "string" &&
    typeof record.timestamp === "string"
  );
}
