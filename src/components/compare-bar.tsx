"use client";

import Link from "next/link";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";

export function CompareBar({
  selected,
  onRemove,
  onClear,
  max,
}: {
  selected: Product[];
  onRemove: (id: string) => void;
  onClear: () => void;
  max: number;
}) {
  if (selected.length === 0) return null;

  const href = `/compare?ids=${selected.map((p) => p.id).join(",")}`;
  const canCompare = selected.length >= 2;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 shadow-lg backdrop-blur">
      <div className="container flex flex-wrap items-center gap-3 py-3">
        <span className="text-sm font-medium">
          Vergelijken ({selected.length}/{max})
        </span>
        <ul className="flex flex-1 flex-wrap gap-2">
          {selected.map((p) => (
            <li
              key={p.id}
              className="flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-xs"
            >
              <span className="max-w-[160px] truncate">{p.name}</span>
              <button
                type="button"
                onClick={() => onRemove(p.id)}
                className="text-muted-foreground hover:text-foreground"
                aria-label={`Verwijder ${p.name} uit vergelijking`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onClear}>
            Leegmaken
          </Button>
          {canCompare ? (
            <Link
              href={href}
              className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Vergelijk →
            </Link>
          ) : (
            <Button size="sm" disabled>
              Kies min. 2
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
