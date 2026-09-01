import type {
  Assignment,
  Colleague,
  ColleagueHours,
  FillMode,
  NightCoverage,
  NightWindow,
  RosterSettings,
  RosterState,
  ShiftKind,
  TimesheetRow,
} from "@/types/rooster";

export const DEFAULT_START_TIME = "21:00";
export const DEFAULT_END_TIME = "08:00";
export const DEFAULT_SHIFT_HOURS = 11;
export const STORAGE_KEY = "cadeau-nachtrooster-v1";

export const COLLEAGUE_COLORS = [
  "#f59e0b",
  "#38bdf8",
  "#a78bfa",
  "#34d399",
  "#fb7185",
  "#f472b6",
  "#22d3ee",
  "#facc15",
] as const;

export const WEEKDAY_SHORT = ["ma", "di", "wo", "do", "vr", "za", "zo"] as const;
export const WEEKDAY_LONG = [
  "maandag",
  "dinsdag",
  "woensdag",
  "donderdag",
  "vrijdag",
  "zaterdag",
  "zondag",
] as const;
export const MONTH_LONG = [
  "januari",
  "februari",
  "maart",
  "april",
  "mei",
  "juni",
  "juli",
  "augustus",
  "september",
  "oktober",
  "november",
  "december",
] as const;

const TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)(?::[0-5]\d)?$/;

export function normalizeTime(value: string): string | null {
  const match = value.trim().match(TIME_PATTERN);
  if (!match) return null;
  return `${match[1]}:${match[2]}`;
}

export function isValidTime(value: string): boolean {
  return normalizeTime(value) !== null;
}

export function hoursBetween(startTime: string, endTime: string): number {
  const start = normalizeTime(startTime);
  const end = normalizeTime(endTime);
  if (!start || !end) {
    throw new Error(`Ongeldige tijd: ${startTime}–${endTime}`);
  }
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);
  let startMinutes = startHour * 60 + startMinute;
  let endMinutes = endHour * 60 + endMinute;
  if (endMinutes <= startMinutes) {
    endMinutes += 24 * 60;
  }
  return (endMinutes - startMinutes) / 60;
}

export function defaultSettings(): RosterSettings {
  return {
    startTime: DEFAULT_START_TIME,
    endTime: DEFAULT_END_TIME,
    requiredPerNight: 1,
    fillMode: "iedereen",
  };
}

export function defaultColleagues(): Colleague[] {
  return [
    { id: "c-nico", name: "Nico", color: COLLEAGUE_COLORS[0] },
    { id: "c-ploeg-1", name: "Ploegmaat 1", color: COLLEAGUE_COLORS[1] },
  ];
}

export function createEmptyRoster(): RosterState {
  return {
    version: 1,
    colleagues: defaultColleagues(),
    assignments: [],
    settings: defaultSettings(),
  };
}

export function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseISODate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) {
    throw new Error(`Ongeldige datum: ${iso}`);
  }
  return new Date(year, month - 1, day);
}

export function addDays(iso: string, days: number): string {
  const date = parseISODate(iso);
  date.setDate(date.getDate() + days);
  return toISODate(date);
}

export function mondayOf(date: Date): Date {
  const local = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const weekday = local.getDay();
  const offset = weekday === 0 ? -6 : 1 - weekday;
  local.setDate(local.getDate() + offset);
  return local;
}

export function weekDates(monday: Date): string[] {
  const start = toISODate(monday);
  return Array.from({ length: 7 }, (_, index) => addDays(start, index));
}

export function monthDates(year: number, monthIndex: number): string[] {
  const dates: string[] = [];
  const cursor = new Date(year, monthIndex, 1);
  while (cursor.getMonth() === monthIndex) {
    dates.push(toISODate(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return dates;
}

export function currentNightDate(now = new Date()): string {
  if (now.getHours() < 8) {
    const previous = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1,
    );
    return toISODate(previous);
  }
  return toISODate(now);
}

export function nightWindow(
  startDate: string,
  startTime: string,
  endTime: string,
): NightWindow {
  return {
    startDate,
    endDate: addDays(startDate, 1),
    startTime,
    endTime,
    hours: hoursBetween(startTime, endTime),
  };
}

export function weekdayIndex(iso: string): number {
  const weekday = parseISODate(iso).getDay();
  return weekday === 0 ? 6 : weekday - 1;
}

export function formatDayLabel(iso: string): string {
  const date = parseISODate(iso);
  return `${WEEKDAY_SHORT[weekdayIndex(iso)]} ${date.getDate()}`;
}

export function formatLongDate(iso: string): string {
  const date = parseISODate(iso);
  return `${WEEKDAY_LONG[weekdayIndex(iso)]} ${date.getDate()} ${MONTH_LONG[date.getMonth()]}`;
}

export function formatWeekTitle(monday: Date): string {
  const dates = weekDates(monday);
  const start = parseISODate(dates[0]);
  const end = parseISODate(dates[6]);
  const sameMonth = start.getMonth() === end.getMonth();
  const startLabel = sameMonth
    ? `${start.getDate()}`
    : `${start.getDate()} ${MONTH_LONG[start.getMonth()]}`;
  return `${startLabel}–${end.getDate()} ${MONTH_LONG[end.getMonth()]} ${end.getFullYear()}`;
}

export function assignmentKey(colleagueId: string, date: string): string {
  return `${colleagueId}::${date}`;
}

export function findAssignment(
  assignments: Assignment[],
  colleagueId: string,
  date: string,
): Assignment | undefined {
  return assignments.find(
    (assignment) =>
      assignment.colleagueId === colleagueId && assignment.date === date,
  );
}

export function upsertAssignment(
  state: RosterState,
  next: Assignment,
): RosterState {
  const without = state.assignments.filter(
    (assignment) =>
      assignmentKey(assignment.colleagueId, assignment.date) !==
      assignmentKey(next.colleagueId, next.date),
  );
  return { ...state, assignments: [...without, next] };
}

export function removeAssignment(
  state: RosterState,
  colleagueId: string,
  date: string,
): RosterState {
  return {
    ...state,
    assignments: state.assignments.filter(
      (assignment) =>
        assignmentKey(assignment.colleagueId, assignment.date) !==
        assignmentKey(colleagueId, date),
    ),
  };
}

export function setAssignmentKind(
  state: RosterState,
  colleagueId: string,
  date: string,
  kind: ShiftKind | null,
  note = "",
): RosterState {
  if (kind === null) {
    return removeAssignment(state, colleagueId, date);
  }
  const existing = findAssignment(state.assignments, colleagueId, date);
  return upsertAssignment(state, {
    colleagueId,
    date,
    kind,
    note: note || existing?.note || "",
  });
}

function isProtectedKind(kind: ShiftKind | undefined): boolean {
  return kind === "vrij" || kind === "ziek" || kind === "verlof";
}

export function clearWeek(state: RosterState, dates: string[]): RosterState {
  const dateSet = new Set(dates);
  return {
    ...state,
    assignments: state.assignments.filter(
      (assignment) => !dateSet.has(assignment.date),
    ),
  };
}

function workingColleagueIds(state: RosterState, date: string): string[] {
  return state.colleagues
    .filter((colleague) => {
      const assignment = findAssignment(
        state.assignments,
        colleague.id,
        date,
      );
      return !isProtectedKind(assignment?.kind);
    })
    .map((colleague) => colleague.id);
}

function assignNacht(
  state: RosterState,
  colleagueId: string,
  date: string,
): RosterState {
  const existing = findAssignment(state.assignments, colleagueId, date);
  if (existing?.kind === "nacht") return state;
  if (isProtectedKind(existing?.kind)) return state;
  return upsertAssignment(state, {
    colleagueId,
    date,
    kind: "nacht",
    note: existing?.note ?? "",
  });
}

function fillEveryone(state: RosterState, dates: string[]): RosterState {
  let next = state;
  for (const date of dates) {
    for (const colleague of state.colleagues) {
      next = assignNacht(next, colleague.id, date);
    }
  }
  return next;
}

function fillRoundRobin(state: RosterState, dates: string[]): RosterState {
  const required = Math.max(1, state.settings.requiredPerNight);
  const nightCounts = new Map(
    state.colleagues.map((colleague) => [
      colleague.id,
      state.assignments.filter(
        (assignment) =>
          assignment.colleagueId === colleague.id &&
          assignment.kind === "nacht",
      ).length,
    ]),
  );

  let next = state;
  for (const date of dates) {
    const available = workingColleagueIds(next, date);
    const alreadyOn = available.filter(
      (id) => findAssignment(next.assignments, id, date)?.kind === "nacht",
    );
    const needed = Math.max(0, Math.min(required, available.length) - alreadyOn.length);
    if (needed === 0) continue;

    const candidates = available
      .filter((id) => !alreadyOn.includes(id))
      .sort((a, b) => {
        const countDiff = (nightCounts.get(a) ?? 0) - (nightCounts.get(b) ?? 0);
        if (countDiff !== 0) return countDiff;
        return (
          next.colleagues.findIndex((colleague) => colleague.id === a) -
          next.colleagues.findIndex((colleague) => colleague.id === b)
        );
      })
      .slice(0, needed);

    for (const colleagueId of candidates) {
      next = assignNacht(next, colleagueId, date);
      nightCounts.set(colleagueId, (nightCounts.get(colleagueId) ?? 0) + 1);
    }
  }
  return next;
}

export function fillPeriod(
  state: RosterState,
  dates: string[],
  mode: FillMode = state.settings.fillMode,
): RosterState {
  if (state.colleagues.length === 0 || dates.length === 0) return state;
  switch (mode) {
    case "iedereen":
      return fillEveryone(state, dates);
    case "beurtelings":
      return fillRoundRobin(state, dates);
    default: {
      const _never: never = mode;
      return _never;
    }
  }
}

export function nightCoverage(
  state: RosterState,
  date: string,
): NightCoverage {
  const assigned = state.assignments
    .filter((assignment) => assignment.date === date && assignment.kind === "nacht")
    .map((assignment) => assignment.colleagueId);
  const required = Math.max(1, state.settings.requiredPerNight);
  return {
    date,
    assigned,
    required,
    covered: assigned.length >= required,
  };
}

export function periodCoverage(
  state: RosterState,
  dates: string[],
): NightCoverage[] {
  return dates.map((date) => nightCoverage(state, date));
}

export function uncoveredDates(state: RosterState, dates: string[]): string[] {
  return periodCoverage(state, dates)
    .filter((night) => !night.covered)
    .map((night) => night.date);
}

export function colleagueHours(
  state: RosterState,
  dates: string[],
): ColleagueHours[] {
  const dateSet = new Set(dates);
  const hours = hoursBetween(state.settings.startTime, state.settings.endTime);
  return state.colleagues.map((colleague) => {
    const rows = state.assignments.filter(
      (assignment) =>
        assignment.colleagueId === colleague.id && dateSet.has(assignment.date),
    );
    const nights = rows.filter((row) => row.kind === "nacht").length;
    return {
      colleagueId: colleague.id,
      colleagueName: colleague.name,
      nights,
      hours: nights * hours,
      sick: rows.filter((row) => row.kind === "ziek").length,
      leave: rows.filter((row) => row.kind === "verlof").length,
    };
  });
}

export function totalWorkedHours(hours: ColleagueHours[]): number {
  return hours.reduce((sum, row) => sum + row.hours, 0);
}

export function timesheetRows(
  state: RosterState,
  dates: string[],
): TimesheetRow[] {
  const dateSet = new Set(dates);
  const colleagues = new Map(
    state.colleagues.map((colleague) => [colleague.id, colleague]),
  );
  return state.assignments
    .filter((assignment) => dateSet.has(assignment.date))
    .slice()
    .sort((a, b) => {
      const dateDiff = a.date.localeCompare(b.date);
      if (dateDiff !== 0) return dateDiff;
      return a.colleagueId.localeCompare(b.colleagueId);
    })
    .flatMap((assignment) => {
      const colleague = colleagues.get(assignment.colleagueId);
      if (!colleague) return [];
      const window = nightWindow(
        assignment.date,
        state.settings.startTime,
        state.settings.endTime,
      );
      return [
        {
          colleagueId: colleague.id,
          colleagueName: colleague.name,
          date: assignment.date,
          startDate: window.startDate,
          endDate: window.endDate,
          startTime: window.startTime,
          endTime: window.endTime,
          hours: assignment.kind === "nacht" ? window.hours : 0,
          kind: assignment.kind,
          note: assignment.note,
        },
      ];
    });
}

export function shiftKindLabel(kind: ShiftKind): string {
  switch (kind) {
    case "nacht":
      return "Nacht";
    case "vrij":
      return "Vrij";
    case "ziek":
      return "Ziek";
    case "verlof":
      return "Verlof";
    default: {
      const _never: never = kind;
      return _never;
    }
  }
}

export function timesheetToCsv(rows: TimesheetRow[]): string {
  const header = [
    "Naam",
    "Nacht van",
    "Start",
    "Einde",
    "Uren",
    "Status",
    "Opmerking",
  ];
  const lines = rows.map((row) =>
    [
      row.colleagueName,
      row.date,
      `${row.startDate} ${row.startTime}`,
      `${row.endDate} ${row.endTime}`,
      formatHours(row.hours),
      shiftKindLabel(row.kind),
      row.note,
    ]
      .map(csvCell)
      .join(";"),
  );
  return [header.join(";"), ...lines].join("\n");
}

export function formatHours(hours: number): string {
  if (Number.isInteger(hours)) return String(hours);
  return hours.toFixed(2).replace(".", ",");
}

function csvCell(value: string): string {
  if (/[;"\n]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`;
  }
  return value;
}

export function nextColleagueColor(existing: Colleague[]): string {
  const used = new Set(existing.map((colleague) => colleague.color));
  const unused = COLLEAGUE_COLORS.find((color) => !used.has(color));
  return unused ?? COLLEAGUE_COLORS[existing.length % COLLEAGUE_COLORS.length];
}

export function createColleague(name: string, existing: Colleague[]): Colleague {
  return {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `c-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: name.trim(),
    color: nextColleagueColor(existing),
  };
}

export function addColleague(state: RosterState, name: string): RosterState {
  const trimmed = name.trim();
  if (!trimmed) return state;
  return {
    ...state,
    colleagues: [...state.colleagues, createColleague(trimmed, state.colleagues)],
  };
}

export function renameColleague(
  state: RosterState,
  colleagueId: string,
  name: string,
): RosterState {
  const trimmed = name.trim();
  if (!trimmed) return state;
  return {
    ...state,
    colleagues: state.colleagues.map((colleague) =>
      colleague.id === colleagueId ? { ...colleague, name: trimmed } : colleague,
    ),
  };
}

export function removeColleague(state: RosterState, colleagueId: string): RosterState {
  return {
    ...state,
    colleagues: state.colleagues.filter((colleague) => colleague.id !== colleagueId),
    assignments: state.assignments.filter(
      (assignment) => assignment.colleagueId !== colleagueId,
    ),
  };
}

export function updateSettings(
  state: RosterState,
  patch: Partial<RosterSettings>,
): RosterState {
  const startTime = normalizeTime(patch.startTime ?? state.settings.startTime);
  const endTime = normalizeTime(patch.endTime ?? state.settings.endTime);
  if (!startTime || !endTime) {
    return state;
  }
  const requiredPerNight = patch.requiredPerNight ?? state.settings.requiredPerNight;
  return {
    ...state,
    settings: {
      ...state.settings,
      ...patch,
      startTime,
      endTime,
      requiredPerNight: Math.max(1, Math.floor(requiredPerNight)),
    },
  };
}

export function isRosterState(value: unknown): value is RosterState {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<RosterState>;
  return (
    record.version === 1 &&
    Array.isArray(record.colleagues) &&
    Array.isArray(record.assignments) &&
    !!record.settings &&
    typeof record.settings.startTime === "string" &&
    typeof record.settings.endTime === "string"
  );
}

export function loadRoster(raw: string | null): RosterState {
  if (!raw) return createEmptyRoster();
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRosterState(parsed)) return createEmptyRoster();
    return {
      version: 1,
      colleagues: parsed.colleagues,
      assignments: parsed.assignments,
      settings: { ...defaultSettings(), ...parsed.settings },
    };
  } catch {
    return createEmptyRoster();
  }
}
