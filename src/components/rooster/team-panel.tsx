"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Colleague } from "@/types/rooster";

interface TeamPanelProps {
  colleagues: Colleague[];
  onAdd: (name: string) => void;
  onRename: (id: string, name: string) => void;
  onRemove: (id: string) => void;
}

export function TeamPanel({
  colleagues,
  onAdd,
  onRename,
  onRemove,
}: TeamPanelProps) {
  const [name, setName] = useState("");

  function handleAdd(event: FormEvent) {
    event.preventDefault();
    onAdd(name);
    setName("");
  }

  return (
    <section className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
      <h2 className="text-sm font-semibold text-slate-100">Ploeg</h2>
      <p className="mt-1 text-xs text-slate-400">
        Voeg namen toe. Het rooster blijft lokaal op deze computer.
      </p>
      <ul className="mt-3 space-y-2">
        {colleagues.map((colleague) => (
          <li key={`${colleague.id}-${colleague.name}`} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: colleague.color }}
              aria-hidden="true"
            />
            <Input
              defaultValue={colleague.name}
              aria-label={`Naam ${colleague.name}`}
              onBlur={(event) => onRename(colleague.id, event.target.value)}
              className="h-8 border-white/10 bg-slate-950 text-slate-100"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onRemove(colleague.id)}
              className="text-slate-400 hover:text-rose-200"
            >
              Weg
            </Button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAdd} className="mt-3 flex gap-2">
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Nieuwe naam"
          aria-label="Nieuwe ploeggenoot"
          className="h-8 border-white/10 bg-slate-950 text-slate-100"
        />
        <Button type="submit" size="sm" variant="secondary">
          Toevoegen
        </Button>
      </form>
    </section>
  );
}
