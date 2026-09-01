"use client";

import {
  formatHours,
  formatLongDate,
  shiftKindLabel,
} from "@/lib/rooster";
import type { ColleagueHours, TimesheetRow } from "@/types/rooster";

interface TimesheetViewProps {
  rows: TimesheetRow[];
  hours: ColleagueHours[];
}

export function TimesheetView({ rows, hours }: TimesheetViewProps) {
  if (rows.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-white/15 px-4 py-8 text-center text-sm text-slate-400">
        Nog geen diensten in deze periode. Klik op &quot;Klaar deze week&quot; om
        het rooster in één keer te vullen.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-slate-400">
              <th className="py-2 pr-3 font-medium">Naam</th>
              <th className="py-2 pr-3 font-medium">Nacht van</th>
              <th className="py-2 pr-3 font-medium">Van</th>
              <th className="py-2 pr-3 font-medium">Tot</th>
              <th className="py-2 pr-3 font-medium">Uren</th>
              <th className="py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={`${row.colleagueId}-${row.date}`}
                className="border-b border-white/5"
              >
                <td className="py-2 pr-3 font-medium text-slate-100">
                  {row.colleagueName}
                </td>
                <td className="py-2 pr-3 capitalize text-slate-300">
                  {formatLongDate(row.date)}
                </td>
                <td className="py-2 pr-3 tabular-nums text-slate-300">
                  {row.startDate} {row.startTime}
                </td>
                <td className="py-2 pr-3 tabular-nums text-slate-300">
                  {row.endDate} {row.endTime}
                </td>
                <td className="py-2 pr-3 tabular-nums text-amber-100">
                  {formatHours(row.hours)}
                </td>
                <td className="py-2 text-slate-300">
                  {shiftKindLabel(row.kind)}
                  {row.note ? (
                    <span className="block text-xs text-slate-500">{row.note}</span>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {hours.map((row) => (
          <div
            key={row.colleagueId}
            className="rounded-lg border border-white/10 bg-slate-950/50 p-4"
          >
            <p className="text-sm font-semibold text-slate-100">{row.colleagueName}</p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-amber-200">
              {formatHours(row.hours)}u
            </p>
            <p className="text-xs text-slate-400">
              {row.nights} nachten
              {row.sick ? ` · ${row.sick} ziek` : ""}
              {row.leave ? ` · ${row.leave} verlof` : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
