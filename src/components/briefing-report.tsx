import type { BriefingResponse } from "@/types/briefing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COHORT_LABEL = {
  oldest: "relatief oudste",
  middle: "midden-cohort",
  youngest: "relatief jongste",
} as const;

const TYPE_LABEL = {
  initiator: "Initiator",
  "classic-builder": "Classic Builder",
  "express-builder": "Express Builder",
  advisor: "Advisor",
  evaluator: "Evaluator",
} as const;

const ENV_LABEL = {
  solo: "Solo",
  partnership: "Partnerschap",
  "small-group": "Kleine groep (3–5)",
  "large-group": "Grote groep",
} as const;

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1 border-t border-border/70 pt-3 first:border-t-0 first:pt-0">
      <p className="type-kicker">{label}</p>
      <p className="text-sm leading-relaxed">{value}</p>
    </div>
  );
}

export function BriefingReport({ result }: { result: BriefingResponse }) {
  const { briefing, layers, location, input } = result;

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <p className="type-kicker">Dossier · {input.fullName}</p>
        <h1 className="max-w-4xl text-3xl font-semibold tracking-tight sm:text-5xl">
          {briefing.headline}
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          {location.city} · {input.birthDate} · betrouwbaarheid {briefing.confidence}/100
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Rol</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed text-muted-foreground">
            {briefing.role}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Sector</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed text-muted-foreground">
            {briefing.sector}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Schaal</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed text-muted-foreground">
            {briefing.structure}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Risico & financiering</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed text-muted-foreground">
            {briefing.riskStrategy}
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Actieplan</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 text-sm leading-relaxed">
            {briefing.actionPlan.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="type-kicker w-6 shrink-0 pt-0.5">{String(index + 1).padStart(2, "0")}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Besluitvorming</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed text-muted-foreground">
            {briefing.decisionProtocol}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Timing</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed text-muted-foreground">
            {briefing.timing}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Eerste aannames</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            {briefing.hiringMandate.map((item) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {briefing.paradoxes.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Paradoxen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {briefing.paradoxes.map((item) => (
              <div key={item.title}>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {item.explanation}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Bewijs · cohort</CardTitle>
          </CardHeader>
          <CardContent>
            <Metric label="Positie" value={COHORT_LABEL[layers.rae.cohortPosition]} />
            <Metric label="Peildatum" value={layers.rae.cutoffLabel} />
            <Metric label="Risicobereidheid" value={`${layers.rae.riskAppetite}/100`} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Bewijs · sector</CardTitle>
          </CardHeader>
          <CardContent>
            <Metric label="Dominant" value={layers.bazi.day.stemLabel} />
            <Metric label="Industrie" value={layers.bazi.sectors.slice(0, 3).join(" · ")} />
            <Metric
              label="Ontbrekend"
              value={layers.bazi.missing.length ? layers.bazi.missing.join(", ") : "geen"}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Bewijs · drijfveer</CardTitle>
          </CardHeader>
          <CardContent>
            <Metric label="Levenspad" value={String(layers.numerology.lifePath)} />
            <Metric label="Expressie" value={String(layers.numerology.expression)} />
            <Metric label="Persoonlijk jaar" value={String(layers.numerology.personalYear)} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Bewijs · organisatie</CardTitle>
          </CardHeader>
          <CardContent>
            <Metric label="Type" value={`${TYPE_LABEL[layers.design.careerType]} · ${layers.design.profile}`} />
            <Metric label="Schaalcode" value={ENV_LABEL[layers.design.environment]} />
            <Metric
              label="Skills"
              value={layers.design.skills.slice(0, 4).join(" · ") || "geen kernpoorten actief"}
            />
          </CardContent>
        </Card>
      </section>

      <p className="text-xs leading-relaxed text-muted-foreground">
        {layers.design.approximationNotes.join(" ")} De sociologische laag is empirisch.
        BaZi, numerologie en BG5 zijn gestructureerde heuristieken, geen causale wetten.
      </p>
    </div>
  );
}
