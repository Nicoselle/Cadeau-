export const BRIEF_SLOT_IDS = ["ochtend", "namiddag"] as const;

export type BriefSlotId = (typeof BRIEF_SLOT_IDS)[number];

export type BriefSlot = {
  id: BriefSlotId;
  hour: 8 | 15;
  label: string;
  kicker: string;
};

export const DESK_CLOCK = {
  timezone: "Europe/Brussels",
  slots: [
    { id: "ochtend", hour: 8, label: "8 uur", kicker: "Ochtendbrief · 8 uur" },
    {
      id: "namiddag",
      hour: 15,
      label: "15 uur",
      kicker: "Namiddagbrief · 15 uur",
    },
  ] satisfies readonly BriefSlot[],
} as const;

export function briefSlot(id: BriefSlotId): BriefSlot {
  switch (id) {
    case "ochtend":
      return DESK_CLOCK.slots[0];
    case "namiddag":
      return DESK_CLOCK.slots[1];
    default: {
      const _exhaustive: never = id;
      throw new Error(`onbekend briefslot: ${_exhaustive}`);
    }
  }
}

export function slotHourLabel(id: BriefSlotId): string {
  return `${briefSlot(id).hour}:00`;
}
