"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/types/product";
import {
  DEFAULT_FILTERS,
  SORT_OPTIONS,
  collectDietOptions,
  filterProducts,
  sortProducts,
  type Filters,
  type SortKey,
} from "@/lib/filtering";
import { ProductFilters } from "@/components/product-filters";
import { ProductCard } from "@/components/product-card";
import { ProductTable } from "@/components/product-table";
import { CompareBar } from "@/components/compare-bar";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const MAX_COMPARE = 4;
const STORAGE_KEY = "cadeau-compare";

export function ProductDirectory({ products }: { products: Product[] }) {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [sortKey, setSortKey] = useState<SortKey>("resilience-desc");
  const [view, setView] = useState<"cards" | "table">("cards");
  const [compareIds, setCompareIds] = useState<string[]>([]);

  // Seed selection from localStorage after mount (avoids hydration mismatch).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setCompareIds(
            parsed
              .filter((id): id is string => typeof id === "string")
              .filter((id) => products.some((p) => p.id === id))
              .slice(0, MAX_COMPARE),
          );
        }
      }
    } catch {
      // ignore malformed storage
    }
  }, [products]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(compareIds));
    } catch {
      // ignore storage write failures
    }
  }, [compareIds]);

  const dietOptions = useMemo(() => collectDietOptions(products), [products]);

  const visible = useMemo(() => {
    return sortProducts(filterProducts(products, filters), sortKey);
  }, [products, filters, sortKey]);

  const selectedProducts = useMemo(
    () =>
      compareIds
        .map((id) => products.find((p) => p.id === id))
        .filter((p): p is Product => Boolean(p)),
    [compareIds, products],
  );

  const disableSelect = compareIds.length >= MAX_COMPARE;

  function toggleCompare(id: string) {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, id];
    });
  }

  return (
    <div className="container py-8">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <div className="lg:sticky lg:top-20 lg:h-fit">
          <ProductFilters
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(DEFAULT_FILTERS)}
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
                onClick={() => setFilters(DEFAULT_FILTERS)}
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
                  selected={compareIds.includes(p.id)}
                  onToggle={toggleCompare}
                  disableSelect={disableSelect}
                />
              ))}
            </div>
          ) : (
            <ProductTable
              products={visible}
              isSelected={(id) => compareIds.includes(id)}
              onToggle={toggleCompare}
              disableSelect={disableSelect}
            />
          )}

          {/* Spacer so the fixed compare bar never covers content */}
          {selectedProducts.length > 0 ? <div className="h-24" /> : null}
        </div>
      </div>

      <CompareBar
        selected={selectedProducts}
        onRemove={toggleCompare}
        onClear={() => setCompareIds([])}
        max={MAX_COMPARE}
      />
    </div>
  );
}
