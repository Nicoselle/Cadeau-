"use client";

import { useMemo, useState } from "react";
import { SUGGESTED_PLACES } from "@/data/local-places";
import { getPlaceBySlug, searchPlaces } from "@/lib/local-places";
import type { Place } from "@/types/local";

export function PlacePicker({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (slugs: string[]) => void;
}) {
  const [query, setQuery] = useState("");
  const matches = useMemo(() => searchPlaces(query, 7), [query]);

  function toggle(place: Place) {
    if (selected.includes(place.slug)) {
      onChange(selected.filter((slug) => slug !== place.slug));
    } else {
      onChange([...selected, place.slug]);
    }
    setQuery("");
  }

  const chips = selected
    .map((slug) => getPlaceBySlug(slug) ?? { slug, name: slug, country: "BE" as const, province: "" });

  return (
    <div>
      <label className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground" htmlFor="plaats-zoek">
        Waar wilt u lokaal nieuws?
      </label>
      <input
        id="plaats-zoek"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Typ een gemeente — Gent, Tilburg, Knokke-Heist…"
        className="mt-2 h-11 w-full border border-foreground bg-card px-3 font-serif text-base outline-none focus:ring-2 focus:ring-ring"
      />
      {query.trim().length > 0 ? (
        <ul className="border border-t-0 border-foreground bg-card">
          {matches.length === 0 ? (
            <li className="px-3 py-2 font-serif text-sm text-muted-foreground">
              Geen treffer in de catalogus. U kunt een dorp later alsnog insturen via uw verhaal.
            </li>
          ) : (
            matches.map((place) => (
              <li key={place.slug}>
                <button
                  type="button"
                  onClick={() => toggle(place)}
                  className="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-muted"
                >
                  <span className="font-serif">{place.name}</span>
                  <span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                    {place.province} · {place.country}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      ) : (
        <div className="mt-3 flex flex-wrap gap-2">
          {SUGGESTED_PLACES.map((slug) => {
            const place = getPlaceBySlug(slug);
            if (!place) return null;
            const active = selected.includes(slug);
            return (
              <button
                key={slug}
                type="button"
                onClick={() => toggle(place)}
                className={`border px-3 py-1 text-[12px] uppercase tracking-[0.12em] ${
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-hairline hover:border-foreground"
                }`}
              >
                {place.name}
              </button>
            );
          })}
        </div>
      )}
      {chips.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {chips.map((place) => (
            <li key={place.slug}>
              <button
                type="button"
                onClick={() => onChange(selected.filter((slug) => slug !== place.slug))}
                className="border border-foreground px-2 py-1 font-serif text-sm"
              >
                {place.name} ×
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
