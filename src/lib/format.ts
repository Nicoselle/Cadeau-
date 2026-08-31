export function formatPct(value: number, digits = 1): string {
  const formatted = new Intl.NumberFormat("nl-NL", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    signDisplay: "exceptZero",
  }).format(value);
  return `${formatted}%`;
}

export function formatPlainNumber(value: number, digits = 2): string {
  return new Intl.NumberFormat("nl-NL", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}
