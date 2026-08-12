import type { Metadata } from "next";
import Link from "next/link";
import { getProductById } from "@/data/products";
import type { Product } from "@/types/product";
import { SCENARIO_LABELS, TYPE_LABELS } from "@/types/product";
import { CompareEmpty } from "@/components/compare-empty";
import { ResilienceScore } from "@/components/resilience-score";
import { formatShelfLife, formatUSD, formatNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Vergelijken",
  description:
    "Vergelijk 2 tot 4 noodvoedselpakketten naast elkaar op calorieën, houdbaarheid, waterbehoefte, prijs per 100 kcal en Resilience Score.",
};

type Highlight = "min" | "max" | "none";

function cellClass(
  value: number,
  values: number[],
  highlight: Highlight,
): string {
  if (highlight === "none" || values.length < 2) return "";
  const best = highlight === "min" ? Math.min(...values) : Math.max(...values);
  return value === best ? "bg-accent/10 font-semibold text-foreground" : "";
}

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ ids?: string }>;
}) {
  const { ids } = await searchParams;
  const selected: Product[] = (ids ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean)
    .map((id) => getProductById(id))
    .filter((p): p is Product => Boolean(p))
    .slice(0, 4);

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">
          Producten vergelijken
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Waarden gemarkeerd in groen zijn de beste in hun rij.
        </p>
      </div>

      {selected.length === 0 ? (
        <CompareEmpty />
      ) : (
        <CompareTable products={selected} />
      )}

      <div className="mt-6">
        <Link href="/" className="text-sm font-medium text-primary hover:underline">
          ← Terug naar de directory
        </Link>
      </div>
    </div>
  );
}

function CompareTable({ products }: { products: Product[] }) {
  const price100 = products.map((p) => p.pricePer100Kcal);
  const price = products.map((p) => p.priceUSD);
  const totalKcal = products.map((p) => p.totalCalories);
  const kcalDay = products.map((p) => p.caloriesPerDay);
  const protein = products.map((p) => p.totalProteinGrams);
  const shelf = products.map((p) => p.shelfLifeYearsMax);
  const resilience = products.map((p) => p.resilienceScore);
  const water = products.map((p) => p.totalWaterLiters ?? 0);

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <caption className="sr-only">
          Vergelijkingstabel van geselecteerde noodvoedselproducten
        </caption>
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="w-48 bg-muted/60 px-4 py-3 text-left">
              Kenmerk
            </th>
            {products.map((p) => (
              <th
                key={p.id}
                scope="col"
                className="px-4 py-3 text-left align-top"
              >
                <div className="text-xs font-medium uppercase text-muted-foreground">
                  {p.brand}
                </div>
                <Link
                  href={`/product/${p.id}`}
                  className="font-semibold leading-tight hover:text-primary hover:underline"
                >
                  {p.name}
                </Link>
                <div className="mt-2">
                  <ResilienceScore
                    score={p.resilienceScore}
                    size="sm"
                    showLabel={false}
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <Row label="Type">
            {products.map((p) => (
              <Cell key={p.id}>{TYPE_LABELS[p.type]}</Cell>
            ))}
          </Row>
          <Row label="Prijs per 100 kcal">
            {products.map((p, i) => (
              <Cell
                key={p.id}
                className={cellClass(price100[i], price100, "min")}
              >
                {formatUSD(p.pricePer100Kcal)}
              </Cell>
            ))}
          </Row>
          <Row label="Totaalprijs">
            {products.map((p, i) => (
              <Cell key={p.id} className={cellClass(price[i], price, "min")}>
                {formatUSD(p.priceUSD)}
              </Cell>
            ))}
          </Row>
          <Row label="Totale calorieën">
            {products.map((p, i) => (
              <Cell
                key={p.id}
                className={cellClass(totalKcal[i], totalKcal, "max")}
              >
                {formatNumber(p.totalCalories)} kcal
              </Cell>
            ))}
          </Row>
          <Row label="Calorieën per dag">
            {products.map((p, i) => (
              <Cell key={p.id} className={cellClass(kcalDay[i], kcalDay, "max")}>
                {formatNumber(p.caloriesPerDay)} kcal
              </Cell>
            ))}
          </Row>
          <Row label="Porties">
            {products.map((p) => (
              <Cell key={p.id}>{p.servings}</Cell>
            ))}
          </Row>
          <Row label="Dagen voorraad">
            {products.map((p) => (
              <Cell key={p.id}>{p.daysOfSupply}</Cell>
            ))}
          </Row>
          <Row label="Eiwit totaal">
            {products.map((p, i) => (
              <Cell key={p.id} className={cellClass(protein[i], protein, "max")}>
                {p.totalProteinGrams} g
              </Cell>
            ))}
          </Row>
          <Row label="Houdbaarheid">
            {products.map((p, i) => (
              <Cell key={p.id} className={cellClass(shelf[i], shelf, "max")}>
                {formatShelfLife(p.shelfLifeYearsMin, p.shelfLifeYearsMax)}
              </Cell>
            ))}
          </Row>
          <Row label="Water vereist">
            {products.map((p) => (
              <Cell key={p.id}>{p.waterRequired ? "Ja" : "Nee"}</Cell>
            ))}
          </Row>
          <Row label="Waterbehoefte">
            {products.map((p, i) => (
              <Cell
                key={p.id}
                className={
                  p.totalWaterLiters !== null
                    ? cellClass(water[i], water, "min")
                    : ""
                }
              >
                {p.totalWaterLiters !== null ? `${p.totalWaterLiters} L` : "—"}
              </Cell>
            ))}
          </Row>
          <Row label="Heet water verplicht">
            {products.map((p) => (
              <Cell key={p.id}>{p.hotWaterMandatory ? "Ja" : "Nee"}</Cell>
            ))}
          </Row>
          <Row label="Resilience Score">
            {products.map((p, i) => (
              <Cell
                key={p.id}
                className={cellClass(resilience[i], resilience, "max")}
              >
                {p.resilienceScore} / 100
              </Cell>
            ))}
          </Row>
          <Row label="Beschikbaar in EU">
            {products.map((p) => (
              <Cell key={p.id}>{p.availableInEU ? "Ja" : "Nee"}</Cell>
            ))}
          </Row>
          <Row label="Beschikbaar in Zweden">
            {products.map((p) => (
              <Cell key={p.id}>{p.availableInSweden ? "Ja" : "Nee"}</Cell>
            ))}
          </Row>
          <Row label="Scenario's">
            {products.map((p) => (
              <Cell key={p.id}>
                {p.scenarios.map((s) => SCENARIO_LABELS[s]).join(", ")}
              </Cell>
            ))}
          </Row>
        </tbody>
      </table>
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <tr className="border-b border-border last:border-0">
      <th
        scope="row"
        className="bg-muted/40 px-4 py-2.5 text-left font-medium text-muted-foreground"
      >
        {label}
      </th>
      {children}
    </tr>
  );
}

function Cell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={`px-4 py-2.5 tabular-nums ${className}`}>{children}</td>;
}
