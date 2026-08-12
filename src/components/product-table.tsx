import Link from "next/link";
import type { Product } from "@/types/product";
import { TYPE_LABELS } from "@/types/product";
import { Checkbox } from "@/components/ui/checkbox";
import { formatShelfLife, formatEUR, formatNumber } from "@/lib/utils";

export function ProductTable({
  products,
  isSelected,
  onToggle,
  disableSelect,
}: {
  products: Product[];
  isSelected: (id: string) => boolean;
  onToggle: (id: string) => void;
  disableSelect: boolean;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[820px] border-collapse text-sm">
        <caption className="sr-only">
          Overzicht van noodvoedselproducten met specificaties, prijs en
          Resilience Score
        </caption>
        <thead>
          <tr className="border-b border-border bg-muted/60 text-left">
            <th scope="col" className="w-10 px-3 py-2.5" />
            <th scope="col" className="px-3 py-2.5 font-semibold">
              Product
            </th>
            <th scope="col" className="px-3 py-2.5 font-semibold">
              Type
            </th>
            <th scope="col" className="px-3 py-2.5 text-right font-semibold">
              €/100 kcal
            </th>
            <th scope="col" className="px-3 py-2.5 text-right font-semibold">
              Prijs
            </th>
            <th scope="col" className="px-3 py-2.5 text-right font-semibold">
              Kcal/dag
            </th>
            <th scope="col" className="px-3 py-2.5 text-right font-semibold">
              Houdbaarheid
            </th>
            <th scope="col" className="px-3 py-2.5 text-center font-semibold">
              Water
            </th>
            <th scope="col" className="px-3 py-2.5 text-right font-semibold">
              Resilience
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => {
            const selected = isSelected(p.id);
            return (
              <tr
                key={p.id}
                className="border-b border-border last:border-0 hover:bg-muted/40"
              >
                <td className="px-3 py-2.5">
                  <Checkbox
                    id={`row-compare-${p.id}`}
                    checked={selected}
                    disabled={!selected && disableSelect}
                    onChange={() => onToggle(p.id)}
                    aria-label={`Selecteer ${p.name} om te vergelijken`}
                  />
                </td>
                <td className="px-3 py-2.5">
                  <Link
                    href={`/product/${p.id}`}
                    className="font-medium hover:text-primary hover:underline"
                  >
                    {p.name}
                  </Link>
                  <div className="text-xs text-muted-foreground">{p.brand}</div>
                </td>
                <td className="px-3 py-2.5">{TYPE_LABELS[p.type]}</td>
                <td className="px-3 py-2.5 text-right font-medium tabular-nums">
                  {formatEUR(p.pricePer100Kcal)}
                </td>
                <td className="px-3 py-2.5 text-right tabular-nums">
                  {formatEUR(p.priceEUR)}
                </td>
                <td className="px-3 py-2.5 text-right tabular-nums">
                  {formatNumber(p.caloriesPerDay)}
                </td>
                <td className="px-3 py-2.5 text-right tabular-nums">
                  {formatShelfLife(p.shelfLifeYearsMin, p.shelfLifeYearsMax)}
                </td>
                <td className="px-3 py-2.5 text-center">
                  {p.waterRequired ? "Ja" : "Nee"}
                </td>
                <td className="px-3 py-2.5 text-right font-semibold tabular-nums">
                  {p.resilienceScore}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
