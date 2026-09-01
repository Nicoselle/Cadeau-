"use client";

import { ShiftCell } from "@/components/rooster/shift-cell";
import {
  findAssignment,
  formatDayLabel,
  formatHours,
  hoursBetween,
  nightCoverage,
} from "@/lib/rooster";
import { cn } from "@/lib/utils";
import type { RosterState, ShiftKind } from "@/types/rooster";

interface WeekGridProps {
  state: RosterState;
  dates: string[];
  activeNight: string;
  onChange: (colleagueId: string, date: string, kind: ShiftKind | null, note: string) => void;
}

export function WeekGrid({ state, dates, activeNight, onChange }: WeekGridProps) {
  const hoursLabel = `${formatHours(hoursBetween(state.settings.startTime, state.settings.endTime))}u`;
  const timeRangeLabel = `${state.settings.startTime.slice(0, 5)}–${state.settings.endTime.slice(0, 5)}`;

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[52rem] border-separate border-spacing-1">
        <thead>
          <tr>
            <th className="w-40 px-2 py-2 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
              Ploeg
            </th>
            {dates.map((date) => {
              const coverage = nightCoverage(state, date);
              const isActive = date === activeNight;
              return (
                <th
                  key={date}
                  className={cn(
                    "rounded-md px-2 py-2 text-left text-xs font-medium",
                    isActive ? "bg-amber-400/15 text-amber-100" : "text-slate-300",
                  )}
                >
                  <div className="capitalize">{formatDayLabel(date)}</div>
                  <div
                    className={cn(
                      "mt-0.5 text-[11px] font-normal",
                      coverage.covered ? "text-emerald-300" : "text-rose-300",
                    )}
                  >
                    {coverage.assigned.length}/{coverage.required} gedekt
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {state.colleagues.map((colleague) => (
            <tr key={colleague.id}>
              <th className="rounded-md bg-slate-900/80 px-3 py-2 text-left align-middle">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: colleague.color }}
                    aria-hidden="true"
                  />
                  <span className="text-sm font-semibold text-slate-100">
                    {colleague.name}
                  </span>
                </div>
              </th>
              {dates.map((date) => (
                <td key={date} className="align-stretch">
                  <ShiftCell
                    assignment={findAssignment(state.assignments, colleague.id, date)}
                    hoursLabel={hoursLabel}
                    timeRangeLabel={timeRangeLabel}
                    colleagueName={colleague.name}
                    dayLabel={formatDayLabel(date)}
                    onChange={(kind, note) => onChange(colleague.id, date, kind, note)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
