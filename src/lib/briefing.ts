import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { EDITION } from "@/data/edition";
import { getMarketBoard } from "@/data/markets";
import { oracles } from "@/data/oracles";
import type { MarketTile } from "@/types/newspaper";

export const DESK_CLOCK = {
  timezone: "Europe/Brussels",
  briefingHour: 13,
  decisionHour: 14,
  editionHour: 15,
} as const;

export type TileDelta = {
  id: string;
  label: string;
  value: string;
  asOf: string;
  seriesFile: string;
  newerThanEdition: boolean;
};

export type EditorialDecision = {
  date: string;
  timezone: "Europe/Brussels";
  publish: boolean;
  leadThesis: string;
  tiles: string[];
  standen: "houden" | "herzien";
  orakel: string;
  notes: string;
  opinion: boolean;
  opinionThesis: string;
};

export type Briefing = {
  clock: typeof DESK_CLOCK;
  edition: {
    number: number;
    name: string;
    folio: string;
    date: string;
    asOf: string;
  };
  tiles: TileDelta[];
  newer: TileDelta[];
  nextOracle: {
    id: number;
    testDate: string;
    statement: string;
  } | null;
  recommendation: "nieuwe_waarneming" | "zelfde_vloer";
  advice: string;
  questions: string[];
  decision: EditorialDecision | null;
};

const DECISIONS_DIR = path.join(process.cwd(), "redactie", "beslissingen");

export function tileDelta(tile: MarketTile, editionAsOf: string): TileDelta {
  return {
    id: tile.id,
    label: tile.label,
    value: tile.value,
    asOf: tile.asOf,
    seriesFile: tile.seriesFile,
    newerThanEdition: tile.asOf > editionAsOf,
  };
}

export function buildBriefing(): Briefing {
  const board = getMarketBoard();
  const tiles = board.tiles.map((tile) => tileDelta(tile, EDITION.asOf));
  const newer = tiles.filter((tile) => tile.newerThanEdition);
  const open = oracles
    .filter((claim) => claim.outcome === "open")
    .slice()
    .sort((a, b) => a.testDate.localeCompare(b.testDate));
  const next = open[0];
  const recommendation = newer.length > 0 ? "nieuwe_waarneming" : "zelfde_vloer";

  return {
    clock: DESK_CLOCK,
    edition: {
      number: EDITION.number,
      name: EDITION.name,
      folio: EDITION.folio,
      date: EDITION.date,
      asOf: EDITION.asOf,
    },
    tiles,
    newer,
    nextOracle: next
      ? { id: next.id, testDate: next.testDate, statement: next.statement }
      : null,
    recommendation,
    advice:
      recommendation === "nieuwe_waarneming"
        ? `Er ligt ${newer.length === 1 ? "een nieuwere waarneming" : `${newer.length} nieuwere waarnemingen`} dan peil ${EDITION.asOf}. Dat is geen editie. Om ${DESK_CLOCK.decisionHour} uur beslist Nico.`
        : `Geen tegel is nieuwer dan peil ${EDITION.asOf}. Zelfde vloer als ${EDITION.folio}. Alleen een editie als Nico een nieuwe stelling heeft — zoals nummer 2.`,
    questions: [
      "Opiniestuk, in de adem van de vroegere Knack (één stelling, geen lijstje)? ja — standaard / nee",
      "Zo ja: de stelling van De mening, in één zin.",
      `Publiceren we ook een nieuwe genummerde editie (nr. ${EDITION.number + 1})? ja / nee`,
      "Zo ja: wat is de stelling van het voorpaginastuk, in één zin?",
      "Welke drie tegels zijn de peil? (id's, geen verzonnen cijfers)",
      "Blijven de standen staan, of herzien? houden / herzien",
      "Orakelboek: ongewijzigd, toetsen, of een nieuwe regel?",
    ],
    decision: latestDecision(),
  };
}

export function decisionsDir(): string {
  return DECISIONS_DIR;
}

export function parseDecision(raw: unknown): EditorialDecision | null {
  if (!raw || typeof raw !== "object") return null;
  const item = raw as Record<string, unknown>;
  if (typeof item.date !== "string") return null;
  if (item.timezone !== "Europe/Brussels") return null;
  if (typeof item.publish !== "boolean") return null;
  if (typeof item.leadThesis !== "string") return null;
  if (!Array.isArray(item.tiles) || item.tiles.some((id) => typeof id !== "string")) {
    return null;
  }
  if (item.standen !== "houden" && item.standen !== "herzien") return null;
  if (typeof item.orakel !== "string") return null;
  if (typeof item.notes !== "string") return null;
  return {
    date: item.date,
    timezone: "Europe/Brussels",
    publish: item.publish,
    leadThesis: item.leadThesis,
    tiles: item.tiles,
    standen: item.standen,
    orakel: item.orakel,
    notes: item.notes,
    opinion: typeof item.opinion === "boolean" ? item.opinion : true,
    opinionThesis: typeof item.opinionThesis === "string" ? item.opinionThesis : "",
  };
}

export function loadDecision(filename: string): EditorialDecision | null {
  const file = path.join(DECISIONS_DIR, filename);
  if (!existsSync(file)) return null;
  try {
    return parseDecision(JSON.parse(readFileSync(file, "utf8")));
  } catch {
    return null;
  }
}

export function latestDecision(): EditorialDecision | null {
  if (!existsSync(DECISIONS_DIR)) return null;
  const names = readdirSync(DECISIONS_DIR)
    .filter((name) => name.endsWith(".json") && name !== "voorbeeld.json")
    .sort();
  for (const name of names.slice().reverse()) {
    const parsed = loadDecision(name);
    if (parsed) return parsed;
  }
  return null;
}

export function serializeBriefing() {
  const briefing = buildBriefing();
  return {
    meta: {
      status: "ok" as const,
      endpoint: "/api/v1/briefing",
      endpoint_version: "v1",
      last_updated: briefing.edition.asOf,
    },
    clock: briefing.clock,
    edition: briefing.edition,
    recommendation: briefing.recommendation,
    advice: briefing.advice,
    newer: briefing.newer,
    tiles: briefing.tiles,
    next_oracle: briefing.nextOracle,
    questions: briefing.questions,
    decision: briefing.decision,
    rule: "Alleen Nico beslist om 14:00 Europe/Brussels. De bot schrijft daarna, publiceert niet.",
  };
}
