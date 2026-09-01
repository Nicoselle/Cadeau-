"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { EditionBlock } from "@/components/lokaal/edition-block";
import { useLocalSubscription } from "@/lib/local-store";
import { getPlaceBySlug, resolvePlace } from "@/lib/local-places";
import type { PlaceEdition } from "@/types/local";

export function PlaceEditionClient({ slug }: { slug: string }) {
  const place = getPlaceBySlug(slug) ?? resolvePlace(slug);
  const { subscription, save } = useLocalSubscription();
  const [edition, setEdition] = useState<PlaceEdition | null>(null);
  const [loading, setLoading] = useState(false);
  const asked = Boolean(subscription?.plaatsen.includes(slug));

  const load = useCallback(async (plaatsen: string[]) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/v1/lokaal?plaatsen=${encodeURIComponent(plaatsen.join(","))}`,
      );
      const json = (await response.json()) as { data?: PlaceEdition[] };
      setEdition(json.data?.find((item) => item.plaats.slug === slug) ?? null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (!asked) return;
    void load([slug, ...(subscription?.plaatsen ?? [])]);
  }, [asked, slug, subscription, load]);

  if (!place) {
    return (
      <p className="font-serif">
        Deze gemeente kennen we niet.{" "}
        <Link href="/lokaal" className="underline">
          Kies een plaats
        </Link>
        .
      </p>
    );
  }

  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.18em] text-accent">
        Lokaal · {place.country}
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
        {place.name}
      </h1>
      <p className="mt-3 font-serif text-muted-foreground">{place.province}</p>

      {!asked ? (
        <div className="mt-8 max-w-xl border border-foreground p-6">
          <p className="font-serif leading-relaxed">
            Deze editie gaat pas lopen als iemand {place.name} vraagt. Vraag
            de gemeente aan — daarna zoekt de desk automatisch.
          </p>
          <button
            type="button"
            onClick={() => {
              void save([...(subscription?.plaatsen ?? []), slug]);
            }}
            className="mt-5 border border-foreground bg-foreground px-5 py-2 text-[12px] uppercase tracking-[0.14em] text-background"
          >
            Vraag {place.name} aan
          </button>
        </div>
      ) : null}

      {loading ? (
        <p className="mt-8 font-serif text-muted-foreground">De desk zoekt…</p>
      ) : null}
      {edition ? (
        <div className="mt-10">
          <EditionBlock edition={edition} />
        </div>
      ) : null}

      <p className="mt-10 font-serif">
        <Link href="/lokaal/verhaal" className="underline hover:text-accent">
          Ondernemer in {place.name}? Stuur uw verhaal in.
        </Link>
      </p>
    </div>
  );
}
