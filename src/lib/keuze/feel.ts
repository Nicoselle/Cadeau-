import type { FeelValue, InputType } from "./types";
import { assertNever } from "./types";

const RANGE_RE = /^([\[\(])([^.]*)\.\.([^.?\]]*)([\]\)])$/;
const COMPARE_RE = /^(>=|<=|!=|>|<|=)\s*(.+)$/;
const IN_LIST_RE = /^in\s*\[(.*)\]$/i;

export function coerceValue(raw: string, type: InputType): FeelValue {
  const trimmed = raw.trim();
  if (trimmed === "" || trimmed.toLowerCase() === "null") return null;

  switch (type) {
    case "number": {
      const n = Number(trimmed.replace(",", "."));
      return Number.isFinite(n) ? n : null;
    }
    case "boolean": {
      const lower = trimmed.toLowerCase();
      if (lower === "true" || lower === "ja" || lower === "1") return true;
      if (lower === "false" || lower === "nee" || lower === "0") return false;
      return null;
    }
    case "string":
      return unquote(trimmed);
    default:
      return assertNever(type, "coerceValue");
  }
}

export function parseFeelLiteral(raw: string): FeelValue {
  const trimmed = raw.trim();
  if (trimmed === "" || trimmed === "-" || trimmed.toLowerCase() === "null") {
    return null;
  }
  if (trimmed.toLowerCase() === "true" || trimmed.toLowerCase() === "ja") {
    return true;
  }
  if (trimmed.toLowerCase() === "false" || trimmed.toLowerCase() === "nee") {
    return false;
  }
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  const n = Number(trimmed.replace(",", "."));
  if (Number.isFinite(n) && /^-?\d+(?:[.,]\d+)?$/.test(trimmed)) {
    return n;
  }
  return trimmed;
}

export function resolveCondition(
  condition: string,
  context: Record<string, FeelValue>,
): string {
  return condition.replace(/\$([a-zA-Z_][\w]*)/g, (_, name: string) => {
    const value = context[name];
    if (value === null || value === undefined) return "null";
    if (typeof value === "string") return `"${value}"`;
    return String(value);
  });
}

export function matchCondition(
  condition: string,
  value: FeelValue,
  context: Record<string, FeelValue> = {},
): boolean {
  const raw = resolveCondition(condition, context).trim();
  if (raw === "" || raw === "-" || raw === "*") return true;
  if (value === null) return false;

  const range = raw.match(RANGE_RE);
  if (range) {
    return matchRange(range, value);
  }

  const inList = raw.match(IN_LIST_RE);
  if (inList) {
    const items = splitList(inList[1]).map(parseFeelLiteral);
    return items.some((item) => equals(item, value));
  }

  const cmp = raw.match(COMPARE_RE);
  if (cmp) {
    return compare(cmp[1], value, parseFeelLiteral(cmp[2]));
  }

  return equals(parseFeelLiteral(raw), value);
}

function matchRange(
  match: RegExpMatchArray,
  value: FeelValue,
): boolean {
  if (typeof value !== "number") return false;
  const open = match[1];
  const close = match[4];
  const loRaw = match[2].trim();
  const hiRaw = match[3].trim();
  const lo = loRaw === "" ? Number.NEGATIVE_INFINITY : Number(loRaw.replace(",", "."));
  const hi = hiRaw === "" ? Number.POSITIVE_INFINITY : Number(hiRaw.replace(",", "."));
  if (!Number.isFinite(lo) && lo !== Number.NEGATIVE_INFINITY) return false;
  if (!Number.isFinite(hi) && hi !== Number.POSITIVE_INFINITY) return false;
  const above = open === "[" ? value >= lo : value > lo;
  const below = close === "]" ? value <= hi : value < hi;
  return above && below;
}

function compare(op: string, left: FeelValue, right: FeelValue): boolean {
  if (op === "=") return equals(left, right);
  if (op === "!=") return !equals(left, right);
  if (typeof left !== "number" || typeof right !== "number") return false;
  switch (op) {
    case ">":
      return left > right;
    case ">=":
      return left >= right;
    case "<":
      return left < right;
    case "<=":
      return left <= right;
    default:
      return false;
  }
}

export function equals(a: FeelValue, b: FeelValue): boolean {
  if (typeof a === "string" && typeof b === "string") {
    return a.toLowerCase() === b.toLowerCase();
  }
  return a === b;
}

function unquote(value: string): string {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function splitList(raw: string): string[] {
  return raw
    .split(",")
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
}

export function formatFeel(value: FeelValue): string {
  if (value === null) return "—";
  if (typeof value === "boolean") return value ? "ja" : "nee";
  if (typeof value === "number") {
    return new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 2 }).format(
      value,
    );
  }
  return value;
}
