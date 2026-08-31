"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { EditionBlock } from "@/components/lokaal/edition-block";
import { PlacePicker } from "@/components/lokaal/place-picker";
import { useLocalStories, useLocalSubscription } from "@/lib/local-store";
import type { PlaceEdition } from "@/types/local";

export function LocalDesk() {
  const { subscription, ready, save, clear } = useLocalSubscription();
  const { stories } = useLocalStories();
  const [selected, setSelected] = useState<string[]>([]);
  const [editions, setEditions] = useState<PlaceEdition[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (subscription?.plaatsen) setSelected(subscription.plaatsen);
  }, [subscription]);

  const load = useCallback(async (plaatsen: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/v1/lokaal?plaatsen=${encodeURIComponent(plaatsen.join(","))}`,
      );
      const json = (await response.json()) as { data?: PlaceEdition[]; error?: string };
      if (!response.ok) throw new Error(json.error ?? "zoeken mislukt");
      setEditions(json.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "zoeken mislukt");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!ready || !subscription?.plaatsen.length) return;
    void load(subscription.plaatsen);
  }, [ready, subscription, load]);

  async function onSubscribe(event: React.FormEvent) {
    event.preventDefault();
    if (selected.length === 0) {
      setError("Kies minstens één gemeente.");
      return;
    }
    const next = await save(selected);
    await load(next.plaatsen);
  }

  const waiting = stories.filter((story) => story.status === "wachtkamer");

  return (
    <div className="space-y-12">
      <form onSubmit={onSubscribe} className="max-w-2xl">
        <PlacePicker selected={selected} onChange={setSelected} />
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            className="border border-foreground bg-foreground px-5 py-2 text-[12px] font-medium uppercase tracking-[0.14em] text-background hover:bg-accent hover:border-accent"
          >
            Zoek wat hier gevraagd wordt
          </button>
          {subscription ? (
            <button
              type="button"
              onClick={() => {
                clear();
                setEditions([]);
                setSelected([]);
              }}
              className="text-[12px] uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground"
            >
              Vraag wissen
            </button>
          ) : null}
        </div>
        <p className="mt-4 max-w-xl font-serif text-sm text-muted-foreground">
          Geen redactie die kiest welke stad in de krant komt. U vraagt een
          gemeente; de desk zoekt ondernemersnieuws en laat eigen verhalen
          alleen daar zien.
        </p>
      </form>

      {error ? (
        <p className="border border-accent px-4 py-3 font-serif text-sm">{error}</p>
      ) : null}
      {loading ? (
        <p className="font-serif text-muted-foreground">De desk zoekt…</p>
      ) : null}

      {editions.map((edition) => (
        <EditionBlock key={edition.plaats.slug} edition={edition} />
      ))}

      {!loading && subscription && editions.length === 0 ? (
        <p className="font-serif text-muted-foreground">
          Nog geen editie. Kies een gemeente en laat de desk zoeken.
        </p>
      ) : null}

      {waiting.length > 0 ? (
        <aside className="border border-hairline p-5">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Wachtkamer
          </p>
          <p className="mt-2 font-serif text-sm leading-relaxed">
            {waiting.length} eigen {waiting.length === 1 ? "verhaal wacht" : "verhalen wachten"} tot iemand die gemeente vraagt.
          </p>
        </aside>
      ) : null}

      <p className="font-serif">
        Ondernemer?{" "}
        <Link href="/lokaal/verhaal" className="underline hover:text-accent">
          Stuur uw verhaal in
        </Link>
        . Het wordt automatisch gezet en alleen bezorgd aan wie uw gemeente
        heeft gevraagd.
      </p>
    </div>
  );
}
