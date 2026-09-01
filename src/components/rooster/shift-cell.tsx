"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { shiftKindLabel } from "@/lib/rooster";
import type { Assignment, ShiftKind } from "@/types/rooster";
import { SHIFT_KINDS } from "@/types/rooster";

const KIND_STYLES: Record<ShiftKind, string> = {
  nacht: "border-amber-400/40 bg-amber-400/15 text-amber-100",
  vrij: "border-white/10 bg-white/5 text-slate-300",
  ziek: "border-rose-400/40 bg-rose-500/15 text-rose-100",
  verlof: "border-sky-400/40 bg-sky-500/15 text-sky-100",
};

interface ShiftCellProps {
  assignment: Assignment | undefined;
  hoursLabel: string;
  timeRangeLabel: string;
  colleagueName: string;
  dayLabel: string;
  onChange: (kind: ShiftKind | null, note: string) => void;
}

export function ShiftCell({
  assignment,
  hoursLabel,
  timeRangeLabel,
  colleagueName,
  dayLabel,
  onChange,
}: ShiftCellProps) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState(assignment?.note ?? "");
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    setNote(assignment?.note ?? "");
  }, [assignment?.note]);

  useEffect(() => {
    if (!open) return;
    function handlePointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const kind = assignment?.kind;
  const label = kind ? shiftKindLabel(kind) : "Leeg";

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${colleagueName} ${dayLabel}: ${label}`}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "flex h-full min-h-[4.5rem] w-full flex-col items-start justify-center rounded-md border px-2 py-1.5 text-left transition-colors",
          kind ? KIND_STYLES[kind] : "border-dashed border-white/15 bg-slate-950/40 text-slate-400",
        )}
      >
        <span className="text-sm font-semibold">{kind ? label : "—"}</span>
        <span className="text-[11px] opacity-80">
          {kind === "nacht" ? `${timeRangeLabel} · ${hoursLabel}` : kind ? "geen uren" : "tik om te zetten"}
        </span>
        {assignment?.note ? (
          <span className="mt-0.5 line-clamp-1 text-[11px] opacity-70">
            {assignment.note}
          </span>
        ) : null}
      </button>
      {open ? (
        <div
          id={menuId}
          role="dialog"
          aria-label={`Dienst ${colleagueName} ${dayLabel}`}
          className="absolute left-0 top-full z-20 mt-1 w-56 rounded-lg border border-white/10 bg-slate-900 p-2 shadow-xl"
        >
          <div className="grid grid-cols-2 gap-1">
            {SHIFT_KINDS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option, note);
                  setOpen(false);
                }}
                className={cn(
                  "rounded-md border px-2 py-1.5 text-xs font-medium",
                  KIND_STYLES[option],
                )}
              >
                {shiftKindLabel(option)}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              onChange(null, "");
              setOpen(false);
            }}
            className="mt-1 w-full rounded-md border border-white/10 px-2 py-1.5 text-xs text-slate-300 hover:bg-white/5"
          >
            Leegmaken
          </button>
          <label className="mt-2 block text-[11px] text-slate-400">
            Opmerking
            <input
              value={note}
              onChange={(event) => setNote(event.target.value)}
              onBlur={() => {
                if (kind) onChange(kind, note);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" && kind) {
                  onChange(kind, note);
                  setOpen(false);
                }
              }}
              className="mt-1 h-8 w-full rounded-md border border-white/10 bg-slate-950 px-2 text-xs text-slate-100"
              placeholder="bv. ruil met Anna"
            />
          </label>
        </div>
      ) : null}
    </div>
  );
}
