"use client";

import type { ProductType, Scenario } from "@/types/product";
import { SCENARIO_LABELS, TYPE_LABELS, dietLabel } from "@/types/product";
import {
  CALORIES_OPTIONS,
  PRICE_100_OPTIONS,
  SHELF_OPTIONS,
  countActiveFilters,
  type Filters,
} from "@/lib/filtering";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const ALL_TYPES: ProductType[] = ["kit", "bucket", "pouch", "bar", "mre"];
const ALL_SCENARIOS: Scenario[] = [
  "72_HOUR_KIT",
  "BUG_OUT_BAG",
  "SHELTER_IN_PLACE",
  "30_DAY_SUPPLY",
];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
      {children}
    </h3>
  );
}

function toggle<T>(arr: T[], value: T): T[] {
  return arr.includes(value)
    ? arr.filter((v) => v !== value)
    : [...arr, value];
}

export function ProductFilters({
  filters,
  onChange,
  onReset,
  dietOptions,
}: {
  filters: Filters;
  onChange: (next: Filters) => void;
  onReset: () => void;
  dietOptions: string[];
}) {
  const active = countActiveFilters(filters);

  return (
    <aside className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Filters</h2>
        {active > 0 ? (
          <Button variant="ghost" size="sm" onClick={onReset}>
            Wissen ({active})
          </Button>
        ) : null}
      </div>

      <div>
        <FieldLabel>Zoeken</FieldLabel>
        <Input
          type="search"
          placeholder="Merk of productnaam…"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
        />
      </div>

      <div>
        <FieldLabel>Houdbaarheid</FieldLabel>
        <Select
          value={filters.minShelfYears}
          onChange={(e) =>
            onChange({ ...filters, minShelfYears: Number(e.target.value) })
          }
        >
          {SHELF_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <FieldLabel>Calorieën per dag</FieldLabel>
        <Select
          value={filters.minCaloriesPerDay}
          onChange={(e) =>
            onChange({ ...filters, minCaloriesPerDay: Number(e.target.value) })
          }
        >
          {CALORIES_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <FieldLabel>Prijs per 100 kcal</FieldLabel>
        <Select
          value={filters.maxPricePer100Kcal}
          onChange={(e) =>
            onChange({
              ...filters,
              maxPricePer100Kcal: Number(e.target.value),
            })
          }
        >
          {PRICE_100_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <FieldLabel>Type</FieldLabel>
        <div className="space-y-1.5">
          {ALL_TYPES.map((t) => (
            <Checkbox
              key={t}
              id={`type-${t}`}
              checked={filters.types.includes(t)}
              onChange={() =>
                onChange({ ...filters, types: toggle(filters.types, t) })
              }
              label={TYPE_LABELS[t]}
            />
          ))}
        </div>
      </div>

      <div>
        <FieldLabel>Scenario</FieldLabel>
        <div className="space-y-1.5">
          {ALL_SCENARIOS.map((s) => (
            <Checkbox
              key={s}
              id={`scenario-${s}`}
              checked={filters.scenarios.includes(s)}
              onChange={() =>
                onChange({
                  ...filters,
                  scenarios: toggle(filters.scenarios, s),
                })
              }
              label={SCENARIO_LABELS[s]}
            />
          ))}
        </div>
      </div>

      {dietOptions.length > 0 ? (
        <div>
          <FieldLabel>Dieet</FieldLabel>
          <div className="space-y-1.5">
            {dietOptions.map((d) => (
              <Checkbox
                key={d}
                id={`diet-${d}`}
                checked={filters.diets.includes(d)}
                onChange={() =>
                  onChange({ ...filters, diets: toggle(filters.diets, d) })
                }
                label={dietLabel(d)}
              />
            ))}
          </div>
        </div>
      ) : null}

      <div>
        <FieldLabel>Beschikbaarheid</FieldLabel>
        <div className="space-y-1.5">
          <Checkbox
            id="avail-nl"
            checked={filters.nlOnly}
            onChange={(e) => onChange({ ...filters, nlOnly: e.target.checked })}
            label="Beschikbaar in Nederland"
          />
          <Checkbox
            id="avail-be"
            checked={filters.beOnly}
            onChange={(e) => onChange({ ...filters, beOnly: e.target.checked })}
            label="Beschikbaar in België"
          />
          <Checkbox
            id="avail-eu"
            checked={filters.euOnly}
            onChange={(e) => onChange({ ...filters, euOnly: e.target.checked })}
            label="Beschikbaar in EU"
          />
          <Checkbox
            id="avail-se"
            checked={filters.swedenOnly}
            onChange={(e) =>
              onChange({ ...filters, swedenOnly: e.target.checked })
            }
            label="Beschikbaar in Zweden"
          />
        </div>
      </div>
    </aside>
  );
}
