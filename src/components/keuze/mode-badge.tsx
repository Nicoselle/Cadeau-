import { Badge } from "@/components/ui/badge";
import type { DecisionMode } from "@/lib/keuze";
import { assertNever } from "@/lib/keuze";

const LABELS: Record<DecisionMode, string> = {
  support: "Ondersteunen",
  augment: "Augmenteren",
  automate: "Automatiseren",
};

export function ModeBadge({ mode }: { mode: DecisionMode }) {
  switch (mode) {
    case "automate":
      return <Badge variant="accent">{LABELS[mode]}</Badge>;
    case "augment":
      return <Badge>{LABELS[mode]}</Badge>;
    case "support":
      return <Badge variant="outline">{LABELS[mode]}</Badge>;
    default:
      return assertNever(mode, "ModeBadge");
  }
}

export function modeLabel(mode: DecisionMode): string {
  return LABELS[mode];
}
