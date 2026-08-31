"use client";

import { useEffect, useState } from "react";
import {
  PYRAMID_COPY,
  PYRAMID_LAYERS,
  type PyramidLayer,
} from "@/data/watchlist";
import type { WatchBoard, WatchRow } from "@/lib/quotes";
import { formatTapeChange, formatTapePrice } from "@/lib/quotes";

export function WatchBoardView({ initial }: { initial: WatchBoard }) {
  const [board, setBoard] = useState(initial);

  useEffect(() => {
    let cancelled = false;

    async function refresh() {
      try {
        const response = await fetch("/api/v1/volgen", { cache: "no-store" });
        if (!response.ok) return;
        const body = (await response.json()) as {
          data?: {
            as_of: string;
            ok_count: number;
            fail_count: number;
            rows: Array<{
              id: string;
              price: number | null;
              change_pct: number | null;
              currency: string | null;
              tape_name: string | null;
              quote_as_of: string | null;
              ok: boolean;
              error: string | null;
            }>;
          };
        };
        const data = body.data;
        if (!data || cancelled) return;

        setBoard((current) => ({
          ...current,
          asOf: data.as_of,
          okCount: data.ok_count,
          failCount: data.fail_count,
          rows: current.rows.map((row) => {
            const next = data.rows.find((item) => item.id === row.item.id);
            if (!next) return row;
            return {
              item: row.item,
              quote: {
                symbol: row.quote.symbol,
                price: next.price,
                previous: row.quote.previous,
                changePct: next.change_pct,
                currency: next.currency,
                tapeName: next.tape_name,
                asOf: next.quote_as_of,
                ok: next.ok,
                error: next.error ?? undefined,
              },
            };
          }),
        }));
      } catch {
        /* tape mag zwijgen; de namen blijven staan */
      }
    }

    const timer = window.setInterval(refresh, 120_000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div className="space-y-10">
      <PyramidStack rows={board.rows} />
      {PYRAMID_LAYERS.map((layer) => (
        <LayerTable
          key={layer}
          layer={layer}
          rows={board.rows.filter((row) => row.item.layer === layer)}
        />
      ))}
    </div>
  );
}

function PyramidStack({ rows }: { rows: WatchRow[] }) {
  return (
    <section aria-label="Investeringspiramide">
      <div className="mx-auto flex max-w-3xl flex-col-reverse items-center gap-2">
        {PYRAMID_LAYERS.map((layer, index) => {
          const items = rows.filter((row) => row.item.layer === layer);
          const width = 42 + index * 14;
          return (
            <article
              key={layer}
              className="border border-foreground bg-card px-3 py-3 text-center"
              style={{ width: `${width}%`, minWidth: "16rem" }}
            >
              <p className="text-[10px] uppercase tracking-[0.16em] text-accent">
                {PYRAMID_COPY[layer].kicker}
              </p>
              <p className="mt-1 font-display text-lg font-semibold leading-tight">
                {PYRAMID_COPY[layer].label}
              </p>
              <p className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[12px]">
                {items.map((row) => (
                  <span key={row.item.id} className="tabular-nums">
                    <span className="uppercase tracking-[0.08em] text-muted-foreground">
                      {row.item.listedAs}
                    </span>{" "}
                    {formatTapePrice(row.quote.price, row.quote.currency)}
                  </span>
                ))}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function LayerTable({
  layer,
  rows,
}: {
  layer: PyramidLayer;
  rows: WatchRow[];
}) {
  const copy = PYRAMID_COPY[layer];

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold">{copy.label}</h2>
      <p className="mt-2 max-w-3xl font-serif leading-relaxed text-muted-foreground">
        {copy.text}
      </p>
      <div className="mt-5 overflow-x-auto border border-hairline">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="bg-[hsl(36_22%_88%)] text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            <tr>
              <th className="px-3 py-2 font-medium">Naam</th>
              <th className="px-3 py-2 font-medium">Zo geschreven</th>
              <th className="px-3 py-2 font-medium">Tape</th>
              <th className="px-3 py-2 font-medium">Print</th>
              <th className="px-3 py-2 font-medium">Dag</th>
              <th className="px-3 py-2 font-medium">Noot</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.item.id} className="border-t border-hairline">
                <td className="px-3 py-2.5">
                  <p className="font-medium">{row.item.name}</p>
                  <p className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                    {row.item.exchange}
                  </p>
                </td>
                <td className="px-3 py-2.5 font-mono text-xs">
                  {row.item.listedAs}
                </td>
                <td className="px-3 py-2.5 font-mono text-xs">
                  {row.item.yahoo}
                </td>
                <td className="px-3 py-2.5 tabular-nums">
                  {formatTapePrice(row.quote.price, row.quote.currency)}
                </td>
                <td
                  className={`px-3 py-2.5 tabular-nums ${
                    (row.quote.changePct ?? 0) < 0 ? "text-accent" : ""
                  }`}
                >
                  {formatTapeChange(row.quote.changePct)}
                </td>
                <td className="px-3 py-2.5 font-serif text-[13px] leading-snug text-muted-foreground">
                  {row.quote.ok ? row.item.note : row.quote.error ?? row.item.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
