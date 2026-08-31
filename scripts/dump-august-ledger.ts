import { mkdirSync, writeFileSync } from "node:fs";
import { buildAugustLedger } from "../src/lib/as-of";

const ledger = buildAugustLedger();
for (const day of ledger) {
  const bits = day.prints.map((p) => `${p.id}=${p.display}@${p.date}`);
  const r = day.real10y
    ? `real10y=${day.real10y.display}@${day.real10y.date}`
    : "real10y=—";
  console.log(day.date, "m2v=" + day.m2Vintage, r);
  console.log(" ", bits.join(" | "));
}
mkdirSync("redactie/mening", { recursive: true });
writeFileSync(
  "redactie/mening/2026-08-ledger.json",
  `${JSON.stringify(
    {
      pulled: "2026-08-31",
      rule: "Laatste waarneming ≤ peildatum. M2-juli alleen vanaf 2026-08-25 (H.6). Juni-revisie staat in de vintage, niet in de editievloer.",
      days: ledger,
    },
    null,
    2,
  )}\n`,
);
console.log("wrote", ledger.length, "days");
