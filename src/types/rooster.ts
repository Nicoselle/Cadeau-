export const SHIFT_KINDS = ["nacht", "vrij", "ziek", "verlof"] as const;
export type ShiftKind = (typeof SHIFT_KINDS)[number];

export const FILL_MODES = ["iedereen", "beurtelings"] as const;
export type FillMode = (typeof FILL_MODES)[number];

export interface Colleague {
  id: string;
  name: string;
  color: string;
}

export interface Assignment {
  colleagueId: string;
  date: string;
  kind: ShiftKind;
  note: string;
}

export interface RosterSettings {
  startTime: string;
  endTime: string;
  requiredPerNight: number;
  fillMode: FillMode;
}

export interface RosterState {
  version: 1;
  colleagues: Colleague[];
  assignments: Assignment[];
  settings: RosterSettings;
}

export interface NightWindow {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  hours: number;
}

export interface TimesheetRow {
  colleagueId: string;
  colleagueName: string;
  date: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  hours: number;
  kind: ShiftKind;
  note: string;
}

export interface ColleagueHours {
  colleagueId: string;
  colleagueName: string;
  nights: number;
  hours: number;
  sick: number;
  leave: number;
}

export interface NightCoverage {
  date: string;
  assigned: string[];
  required: number;
  covered: boolean;
}
