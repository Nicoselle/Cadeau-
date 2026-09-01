import { describe, expect, it } from "vitest";
import {
  addColleague,
  addDays,
  clearWeek,
  colleagueHours,
  createEmptyRoster,
  currentNightDate,
  fillPeriod,
  formatHours,
  hoursBetween,
  loadRoster,
  mondayOf,
  monthDates,
  nightWindow,
  removeColleague,
  setAssignmentKind,
  timesheetRows,
  timesheetToCsv,
  toISODate,
  uncoveredDates,
  updateSettings,
  weekDates,
} from "@/lib/rooster";
import type { RosterState } from "@/types/rooster";

function rosterWith(
  names: string[],
  patch?: Partial<RosterState>,
): RosterState {
  let state = createEmptyRoster();
  state = { ...state, colleagues: [] };
  for (const name of names) {
    state = addColleague(state, name);
  }
  return { ...state, ...patch, colleagues: patch?.colleagues ?? state.colleagues };
}

describe("hoursBetween", () => {
  it("counts a 21:00–08:00 night as 11 hours", () => {
    expect(hoursBetween("21:00", "08:00")).toBe(11);
  });

  it("accepts time inputs with seconds", () => {
    expect(hoursBetween("21:00:00", "08:00:00")).toBe(11);
  });

  it("counts a same-day shift without wrapping", () => {
    expect(hoursBetween("08:00", "16:00")).toBe(8);
  });

  it("rejects invalid times", () => {
    expect(() => hoursBetween("25:00", "08:00")).toThrow(/Ongeldige tijd/);
  });
});

describe("week and month dates", () => {
  it("starts the week on Monday", () => {
    const sunday = new Date(2026, 8, 6);
    const monday = mondayOf(sunday);
    expect(toISODate(monday)).toBe("2026-08-31");
    expect(weekDates(monday)).toEqual([
      "2026-08-31",
      "2026-09-01",
      "2026-09-02",
      "2026-09-03",
      "2026-09-04",
      "2026-09-05",
      "2026-09-06",
    ]);
  });

  it("lists every night start in a month", () => {
    expect(monthDates(2026, 8)).toHaveLength(30);
    expect(monthDates(2026, 8)[0]).toBe("2026-09-01");
    expect(monthDates(2026, 8).at(-1)).toBe("2026-09-30");
  });
});

describe("currentNightDate", () => {
  it("uses yesterday when the shift is still running before 08:00", () => {
    expect(currentNightDate(new Date(2026, 8, 2, 3, 15))).toBe("2026-09-01");
  });

  it("uses today from 08:00 onward", () => {
    expect(currentNightDate(new Date(2026, 8, 2, 8, 0))).toBe("2026-09-02");
    expect(currentNightDate(new Date(2026, 8, 2, 21, 5))).toBe("2026-09-02");
  });
});

describe("nightWindow", () => {
  it("ends on the next calendar day", () => {
    const window = nightWindow("2026-09-01", "21:00", "08:00");
    expect(window.endDate).toBe("2026-09-02");
    expect(window.hours).toBe(11);
  });
});

describe("fillPeriod", () => {
  const week = weekDates(mondayOf(new Date(2026, 8, 1)));

  it("assigns every colleague every night in iedereen mode", () => {
    const filled = fillPeriod(rosterWith(["Nico", "Anna"]), week, "iedereen");
    expect(filled.assignments).toHaveLength(14);
    expect(
      filled.assignments.every((assignment) => assignment.kind === "nacht"),
    ).toBe(true);
  });

  it("keeps vrij/ziek/verlof when filling", () => {
    let state = rosterWith(["Nico"]);
    const nico = state.colleagues[0].id;
    state = setAssignmentKind(state, nico, week[2], "ziek");
    state = fillPeriod(state, week, "iedereen");
    expect(
      state.assignments.find((row) => row.date === week[2])?.kind,
    ).toBe("ziek");
    expect(state.assignments.filter((row) => row.kind === "nacht")).toHaveLength(
      6,
    );
  });

  it("rotates nights fairly in beurtelings mode", () => {
    let state = rosterWith(["Nico", "Anna", "Bas"]);
    state = updateSettings(state, { requiredPerNight: 1, fillMode: "beurtelings" });
    state = fillPeriod(state, week, "beurtelings");
    const hours = colleagueHours(state, week);
    expect(hours.every((row) => row.nights === 2 || row.nights === 3)).toBe(
      true,
    );
    expect(hours.reduce((sum, row) => sum + row.nights, 0)).toBe(7);
    expect(uncoveredDates(state, week)).toEqual([]);
  });

  it("does not overwrite an existing nacht when filling gaps", () => {
    let state = rosterWith(["Nico", "Anna"]);
    const nico = state.colleagues[0].id;
    state = updateSettings(state, { requiredPerNight: 1, fillMode: "beurtelings" });
    state = setAssignmentKind(state, nico, week[0], "nacht");
    state = fillPeriod(state, week, "beurtelings");
    const firstNight = state.assignments.filter(
      (row) => row.date === week[0] && row.kind === "nacht",
    );
    expect(firstNight).toHaveLength(1);
    expect(firstNight[0].colleagueId).toBe(nico);
  });
});

describe("hours and timesheet", () => {
  it("totals 77 hours for a full 7/7 night week", () => {
    const week = weekDates(mondayOf(new Date(2026, 8, 1)));
    const filled = fillPeriod(rosterWith(["Nico"]), week, "iedereen");
    const hours = colleagueHours(filled, week);
    expect(hours[0]).toMatchObject({ nights: 7, hours: 77 });
  });

  it("exports a Belgian CSV timesheet", () => {
    const week = ["2026-09-01"];
    const filled = fillPeriod(rosterWith(["Nico"]), week, "iedereen");
    const csv = timesheetToCsv(timesheetRows(filled, week));
    expect(csv.split("\n")[0]).toBe(
      "Naam;Nacht van;Start;Einde;Uren;Status;Opmerking",
    );
    expect(csv).toContain("Nico;2026-09-01;2026-09-01 21:00;2026-09-02 08:00;11;Nacht;");
  });

  it("formats fractional hours with a comma", () => {
    expect(formatHours(10.5)).toBe("10,50");
  });
});

describe("team and persistence", () => {
  it("removes a colleague and their assignments", () => {
    let state = fillPeriod(
      rosterWith(["Nico", "Anna"]),
      ["2026-09-01"],
      "iedereen",
    );
    const anna = state.colleagues.find((row) => row.name === "Anna")!.id;
    state = removeColleague(state, anna);
    expect(state.colleagues.map((row) => row.name)).toEqual(["Nico"]);
    expect(state.assignments).toHaveLength(1);
  });

  it("clears a week in one step", () => {
    const week = weekDates(mondayOf(new Date(2026, 8, 1)));
    const filled = fillPeriod(rosterWith(["Nico"]), week, "iedereen");
    expect(clearWeek(filled, week).assignments).toEqual([]);
  });

  it("falls back to a default rooster on corrupt storage", () => {
    const loaded = loadRoster("{not json");
    expect(loaded.colleagues[0].name).toBe("Nico");
    expect(loaded.settings.startTime).toBe("21:00");
  });

  it("keeps stored assignments when loading valid JSON", () => {
    const week = ["2026-09-01"];
    const filled = fillPeriod(rosterWith(["Nico"]), week, "iedereen");
    const loaded = loadRoster(JSON.stringify(filled));
    expect(loaded.assignments).toHaveLength(1);
  });
});

describe("addDays", () => {
  it("crosses month boundaries", () => {
    expect(addDays("2026-08-31", 1)).toBe("2026-09-01");
  });
});
