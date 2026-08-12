import Link from "next/link";
import type { Product } from "@/types/product";
import { SCENARIO_LABELS, TYPE_LABELS, dietLabel } from "@/types/product";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ResilienceScore } from "@/components/resilience-score";
import { formatShelfLife, formatEUR, formatNumber } from "@/lib/utils";

export function ProductCard({
  product,
  selected,
  onToggle,
  disableSelect,
}: {
  product: Product;
  selected: boolean;
  onToggle: (id: string) => void;
  disableSelect: boolean;
}) {
  return (
    <Card className="flex flex-col transition-shadow hover:shadow-md">
      <CardHeader className="gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {product.brand}
            </p>
            <Link
              href={`/product/${product.id}`}
              className="mt-0.5 block font-semibold leading-tight hover:text-primary hover:underline"
            >
              {product.name}
            </Link>
          </div>
          <ResilienceScore score={product.resilienceScore} showLabel={false} />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="secondary">{TYPE_LABELS[product.type]}</Badge>
          {product.availableInNetherlands ? (
            <Badge variant="accent">NL</Badge>
          ) : null}
          {product.availableInBelgium ? (
            <Badge variant="accent">BE</Badge>
          ) : null}
          {product.availableInEU && !product.availableInNetherlands && !product.availableInBelgium ? (
            <Badge variant="accent">EU</Badge>
          ) : null}
          {product.dietOptions.map((d) => (
            <Badge key={d} variant="outline">
              {dietLabel(d)}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div>
            <dt className="text-xs text-muted-foreground">Prijs / 100 kcal</dt>
            <dd className="font-semibold tabular-nums">
              {formatEUR(product.pricePer100Kcal)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Totaalprijs</dt>
            <dd className="font-semibold tabular-nums">
              {formatEUR(product.priceEUR)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Kcal / dag</dt>
            <dd className="tabular-nums">
              {formatNumber(product.caloriesPerDay)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Houdbaarheid</dt>
            <dd className="tabular-nums">
              {formatShelfLife(
                product.shelfLifeYearsMin,
                product.shelfLifeYearsMax,
              )}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Totale kcal</dt>
            <dd className="tabular-nums">
              {formatNumber(product.totalCalories)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Water nodig</dt>
            <dd>
              {product.waterRequired
                ? product.totalWaterLiters
                  ? `Ja · ${product.totalWaterLiters} L`
                  : "Ja"
                : "Nee"}
            </dd>
          </div>
        </dl>

        <div className="flex flex-wrap gap-1.5">
          {product.scenarios.map((s) => (
            <Badge key={s} variant="outline" className="text-[11px]">
              {SCENARIO_LABELS[s]}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
          <Checkbox
            id={`compare-${product.id}`}
            checked={selected}
            disabled={!selected && disableSelect}
            onChange={() => onToggle(product.id)}
            label="Vergelijk"
          />
          <Link
            href={`/product/${product.id}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            Details →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
