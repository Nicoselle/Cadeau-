"use client";

import { useEffect, useMemo, useState } from "react";
import { MonthGrid } from "@/components/rooster/month-grid";
import { TeamPanel } from "@/components/rooster/team-panel";
import { TimesheetView } from "@/components/rooster/timesheet-view";
import { usePersistedRoster } from "@/components/rooster/use-persisted-rooster";
import { WeekGrid } from "@/components/rooster/week-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  addColleague,
  clearWeek,
  colleagueHours,
  currentNightDate,
  fillPeriod,
  formatHours,
  formatWeekTitle,
  isValidTime,
  mondayOf,
  monthDates,
  removeColleague,
  renameColleague,
  setAssignmentKind,
  timesheetRows,
  timesheetToCsv,
  toISODate,
  uncoveredDates,
  updateSettings,
  weekDates,
} from "@/lib/rooster";
import type { FillMode, ShiftKind } from "@/types/rooster";
import { FILL_MODES } from "@/types/rooster";

type View = "week" | "maand" | "lijst";

function downloadCsv(filename: string, content: string) {
  const blob = new Blob(["\uFEFF" + content], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function fillModeLabel(mode: FillMode): string {
  switch (mode) {
    case "iedereen":
      return "Iedereen 7/7";
    case "beurtelings":
      return "Beurtelings";
    default: {
      const _never: never = mode;
      return _never;
    }
  }
}

export function RoosterApp() {
  const { state, commit, undo, reset, canUndo, ready } = usePersistedRoster();
  const [view, setView] = useState<View>("week");
  const [anchor, setAnchor] = useState(() => new Date());
  const activeNight = currentNightDate();
  const weekStart = useMemo(() => mondayOf(anchor), [anchor]);

  const week = useMemo(() => weekDates(weekStart), [weekStart]);
  const month = useMemo(
    () => monthDates(anchor.getFullYear(), anchor.getMonth()),
    [anchor],
  );
  const period = view === "maand" ? month : week;
  const hours = useMemo(
    () => colleagueHours(state, period),
    [period, state],
  );
  const rows = useMemo(() => timesheetRows(state, period), [period, state]);
  const gaps = useMemo(() => uncoveredDates(state, period), [period, state]);
  const totalHours = hours.reduce((sum, row) => sum + row.hours, 0);

  function handleFill() {
    commit(fillPeriod(state, period));
  }

  function handleClear() {
    commit(clearWeek(state, period));
  }

  function handleCell(
    colleagueId: string,
    date: string,
    kind: ShiftKind | null,
    note: string,
  ) {
    commit(setAssignmentKind(state, colleagueId, date, kind, note));
  }

  function handleExport() {
    const stamp = view === "maand" ? toISODate(anchor).slice(0, 7) : week[0];
    downloadCsv(`nachtrooster-${stamp}.csv`, timesheetToCsv(rows));
  }

  if (!ready) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-slate-400">
        Rooster laden…
      </div>
    );
  }

  return (
    <div className="rooster-app bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-[88rem] px-4 py-6 sm:px-6">
        <header className="flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
              Nachtdienst · 21:00–08:00 · 7/7
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Nachtrooster uitklaren
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Vul het uurrooster in één klik. Standaardnacht is 21:00 tot 08:00
              (11 uur). Markeer vrij, ziek of verlof — de rest wordt automatisch
              gezet.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 no-print">
            <Button size="lg" onClick={handleFill}>
              Klaar {view === "maand" ? "deze maand" : "deze week"}
            </Button>
            <Button variant="secondary" onClick={handleClear}>
              Periode leegmaken
            </Button>
            <Button variant="outline" onClick={undo} disabled={!canUndo}>
              Ongedaan
            </Button>
          </div>
        </header>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Stat
            label={view === "maand" ? "Uren deze maand" : "Uren deze week"}
            value={`${formatHours(totalHours)}u`}
          />
          <Stat
            label="Nachten gedekt"
            value={`${period.length - gaps.length}/${period.length}`}
            warn={gaps.length > 0}
          />
          <Stat
            label="Open gaten"
            value={String(gaps.length)}
            warn={gaps.length > 0}
          />
        </div>

        <div className="mt-6 flex flex-col gap-3 no-print lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="secondary"
              onClick={() =>
                setAnchor((current) =>
                  view === "maand"
                    ? new Date(current.getFullYear(), current.getMonth() - 1, 1)
                    : new Date(
                        current.getFullYear(),
                        current.getMonth(),
                        current.getDate() - 7,
                      ),
                )
              }
            >
              Vorige
            </Button>
            <p className="min-w-[14rem] text-center text-sm font-semibold capitalize">
              {view === "maand"
                ? new Intl.DateTimeFormat("nl-BE", {
                    month: "long",
                    year: "numeric",
                  }).format(anchor)
                : formatWeekTitle(weekStart)}
            </p>
            <Button
              variant="secondary"
              onClick={() =>
                setAnchor((current) =>
                  view === "maand"
                    ? new Date(current.getFullYear(), current.getMonth() + 1, 1)
                    : new Date(
                        current.getFullYear(),
                        current.getMonth(),
                        current.getDate() + 7,
                      ),
                )
              }
            >
              Volgende
            </Button>
            <Button
              variant="ghost"
              onClick={() => setAnchor(new Date())}
            >
              Vandaag
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["week", "maand", "lijst"] as const).map((option) => (
              <Button
                key={option}
                variant={view === option ? "default" : "outline"}
                onClick={() => setView(option)}
              >
                {option === "week"
                  ? "Week"
                  : option === "maand"
                    ? "Maand"
                    : "Urenlijst"}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[18rem_minmax(0,1fr)]">
          <aside className="space-y-4 no-print">
            <TeamPanel
              colleagues={state.colleagues}
              onAdd={(name) => commit(addColleague(state, name))}
              onRename={(id, name) => commit(renameColleague(state, id, name))}
              onRemove={(id) => commit(removeColleague(state, id))}
            />
            <section className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
              <h2 className="text-sm font-semibold text-slate-100">Instellingen</h2>
              <div className="mt-3 space-y-3">
                <TimeField
                  label="Start (24u)"
                  value={state.settings.startTime}
                  onCommit={(startTime) =>
                    commit(updateSettings(state, { startTime }))
                  }
                />
                <TimeField
                  label="Einde volgende ochtend (24u)"
                  value={state.settings.endTime}
                  onCommit={(endTime) =>
                    commit(updateSettings(state, { endTime }))
                  }
                />
                <label className="block text-xs text-slate-400">
                  Mensen nodig per nacht
                  <Input
                    type="number"
                    min={1}
                    value={state.settings.requiredPerNight}
                    onChange={(event) =>
                      commit(
                        updateSettings(state, {
                          requiredPerNight: Number(event.target.value) || 1,
                        }),
                      )
                    }
                    className="mt-1 border-white/10 bg-slate-950 text-slate-100"
                  />
                </label>
                <label className="block text-xs text-slate-400">
                  Vulwijze
                  <Select
                    value={state.settings.fillMode}
                    onChange={(event) =>
                      commit(
                        updateSettings(state, {
                          fillMode: event.target.value as FillMode,
                        }),
                      )
                    }
                    className="mt-1 border-white/10 bg-slate-950 text-slate-100"
                  >
                    {FILL_MODES.map((mode) => (
                      <option key={mode} value={mode}>
                        {fillModeLabel(mode)}
                      </option>
                    ))}
                  </Select>
                </label>
              </div>
            </section>
            <div className="flex flex-col gap-2">
              <Button variant="outline" onClick={handleExport}>
                Exporteer CSV
              </Button>
              <Button variant="outline" onClick={() => window.print()}>
                Print / PDF
              </Button>
              <Button variant="ghost" onClick={reset}>
                Reset naar standaardploeg
              </Button>
            </div>
          </aside>

          <section className="rounded-xl border border-white/10 bg-slate-900/50 p-3 sm:p-4 print-sheet">
            {view === "week" ? (
              <WeekGrid
                state={state}
                dates={week}
                activeNight={activeNight}
                onChange={handleCell}
              />
            ) : null}
            {view === "maand" ? (
              <MonthGrid state={state} dates={month} activeNight={activeNight} />
            ) : null}
            {view === "lijst" ? (
              <TimesheetView rows={rows} hours={hours} />
            ) : null}
          </section>
        </div>
      </div>
    </div>
  );
}

function TimeField({
  label,
  value,
  onCommit,
}: {
  label: string;
  value: string;
  onCommit: (value: string) => void;
}) {
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  return (
    <label className="block text-xs text-slate-400">
      {label}
      <Input
        type="text"
        inputMode="numeric"
        placeholder="21:00"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={() => {
          if (isValidTime(draft)) onCommit(draft);
          else setDraft(value);
        }}
        className="mt-1 border-white/10 bg-slate-950 text-slate-100"
      />
    </label>
  );
}

function Stat({
  label,
  value,
  warn = false,
}: {
  label: string;
  value: string;
  warn?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p
        className={`mt-1 text-2xl font-bold tabular-nums ${warn ? "text-rose-300" : "text-amber-200"}`}
      >
        {value}
      </p>
    </div>
  );
}
