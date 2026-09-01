"use client";

import {
  formatDayLabel,
  nightCoverage,
  parseISODate,
  weekdayIndex,
} from "@/lib/rooster";
import { cn } from "@/lib/utils";
import type { RosterState } from "@/types/rooster";

interface MonthGridProps {
  state: RosterState;
  dates: string[];
  activeNight: string;
}

export function MonthGrid({ state, dates, activeNight }: MonthGridProps) {
  const leadingBlanks = dates.length === 0 ? 0 : weekdayIndex(dates[0]);
  const cells: Array<string | null> = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...dates,
  ];

  return (
    <div>
      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase tracking-wide text-slate-400">
        {["ma", "di", "wo", "do", "vr", "za", "zo"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="min-h-[6.5rem]" />;
          }
          const coverage = nightCoverage(state, date);
          const names = coverage.assigned
            .map((id) => state.colleagues.find((colleague) => colleague.id === id)?.name)
            .filter((name): name is string => Boolean(name));
          return (
            <div
              key={date}
              className={cn(
                "min-h-[6.5rem] rounded-md border p-2",
                date === activeNight
                  ? "border-amber-400/50 bg-amber-400/10"
                  : "border-white/10 bg-slate-950/50",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-100">
                  {parseISODate(date).getDate()}
                </span>
                <span
                  className={cn(
                    "text-[11px]",
                    coverage.covered ? "text-emerald-300" : "text-rose-300",
                  )}
                >
                  {coverage.assigned.length}/{coverage.required}
                </span>
              </div>
              <p className="mt-1 text-[11px] capitalize text-slate-400">
                {formatDayLabel(date)}
              </p>
              <ul className="mt-1 space-y-0.5">
                {names.slice(0, 3).map((name) => (
                  <li key={name} className="truncate text-[11px] text-amber-100">
                    {name}
                  </li>
                ))}
                {names.length > 3 ? (
                  <li className="text-[11px] text-slate-400">+{names.length - 3}</li>
                ) : null}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
