"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Product } from "@/types/product";
import {
  DEFAULT_FILTERS,
  DEFAULT_SORT,
  SORT_OPTIONS,
  collectDietOptions,
  filterProducts,
  filtersFromQuery,
  filtersToQuery,
  sortProducts,
  type Filters,
  type SortKey,
} from "@/lib/filtering";
import { useCompare } from "@/lib/compare";
import { ProductFilters } from "@/components/product-filters";
import { ProductCard } from "@/components/product-card";
import { ProductTable } from "@/components/product-table";
import { CompareBar } from "@/components/compare-bar";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function ProductDirectory({ products }: { products: Product[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const productIds = useMemo(() => products.map((p) => p.id), [products]);

  const initial = useMemo(
    () => filtersFromQuery(new URLSearchParams(searchParams.toString())),
    // Seed once from the URL on mount; later changes are driven by state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const [filters, setFilters] = useState<Filters>(initial.filters);
  const [sortKey, setSortKey] = useState<SortKey>(initial.sort);
  const [view, setView] = useState<"cards" | "table">("cards");

  const compare = useCompare(productIds);

  // Reflect filters + sort in the URL so a filtered view is shareable.
  const firstSync = useRef(true);
  useEffect(() => {
    const query = filtersToQuery(filters, sortKey);
    const url = query ? `${pathname}?${query}` : pathname;
    if (firstSync.current) {
      firstSync.current = false;
      const current = searchParams.toString();
      if (current === query) return; // avoid a redundant initial replace
    }
    router.replace(url, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sortKey]);

  const dietOptions = useMemo(() => collectDietOptions(products), [products]);

  const visible = useMemo(
    () => sortProducts(filterProducts(products, filters), sortKey),
    [products, filters, sortKey],
  );

  const selectedProducts = useMemo(
    () =>
      compare.ids
        .map((id) => products.find((p) => p.id === id))
        .filter((p): p is Product => Boolean(p)),
    [compare.ids, products],
  );

  return (
    <div className="container py-8">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <div className="lg:sticky lg:top-20 lg:h-fit">
          <ProductFilters
            filters={filters}
            onChange={setFilters}
            onReset={() => {
              setFilters(DEFAULT_FILTERS);
              setSortKey(DEFAULT_SORT);
            }}
            dietOptions={dietOptions}
          />
        </div>

        <div className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground" aria-live="polite">
              <span className="font-semibold text-foreground">
                {visible.length}
              </span>{" "}
              van {products.length} producten
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <label className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Sorteer</span>
                <Select
                  className="w-auto"
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value as SortKey)}
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
              </label>
              <div className="flex overflow-hidden rounded-md border border-border">
                <button
                  type="button"
                  onClick={() => setView("cards")}
                  aria-pressed={view === "cards"}
                  className={`px-3 py-1.5 text-sm ${
                    view === "cards"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background hover:bg-muted"
                  }`}
                >
                  Cards
                </button>
                <button
                  type="button"
                  onClick={() => setView("table")}
                  aria-pressed={view === "table"}
                  className={`px-3 py-1.5 text-sm ${
                    view === "table"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background hover:bg-muted"
                  }`}
                >
                  Tabel
                </button>
              </div>
            </div>
          </div>

          {visible.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-12 text-center">
              <p className="font-medium">Geen producten gevonden</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Pas de filters aan om meer resultaten te zien.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setFilters(DEFAULT_FILTERS);
                  setSortKey(DEFAULT_SORT);
                }}
              >
                Filters wissen
              </Button>
            </div>
          ) : view === "cards" ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  selected={compare.isSelected(p.id)}
                  onToggle={compare.toggle}
                  disableSelect={compare.isFull}
                />
              ))}
            </div>
          ) : (
            <ProductTable
              products={visible}
              isSelected={compare.isSelected}
              onToggle={compare.toggle}
              disableSelect={compare.isFull}
            />
          )}

          {/* Spacer so the fixed compare bar never covers content */}
          {selectedProducts.length > 0 ? <div className="h-24" /> : null}
        </div>
      </div>

      <CompareBar
        selected={selectedProducts}
        onRemove={compare.remove}
        onClear={compare.clear}
        max={4}
      />
    </div>
  );
}
