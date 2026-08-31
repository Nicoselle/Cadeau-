import type { BriefingResponse } from "@/types/briefing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COHORT_LABEL = {
  oldest: "oudste in de klas",
  middle: "midden van de klas",
  youngest: "jongste in de klas",
} as const;

const TYPE_LABEL = {
  initiator: "Aanjager",
  "classic-builder": "Uitvoerder",
  "express-builder": "Snelle uitvoerder",
  advisor: "Gids",
  evaluator: "Waarnemer",
} as const;

const ENV_LABEL = {
  solo: "Alleen of met één vaste hulp",
  partnership: "Vennoot of duo",
  "small-group": "Kern van drie tot vijf",
  "large-group": "Grotere organisatie",
} as const;

const ELEMENT_LABEL = {
  wood: "Groei en mensen",
  fire: "Zichtbaarheid en tempo",
  earth: "Stabiliteit en vastgoed",
  metal: "Precisie en geldstromen",
  water: "Distributie en relaties",
} as const;

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1 border-t border-border/70 pt-3 first:border-t-0 first:pt-0">
      <p className="type-kicker">{label}</p>
      <p className="text-sm leading-relaxed">{value}</p>
    </div>
  );
}

function Prose({ text }: { text: string }) {
  return (
    <div className="space-y-4">
      {text.split("\n\n").map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className="text-base leading-relaxed text-muted-foreground">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export function BriefingReport({ result }: { result: BriefingResponse }) {
  const { briefing, layers, location, input } = result;

  return (
    <div className="space-y-12">
      <section className="space-y-5">
        <p className="type-kicker">Dossier · {input.fullName}</p>
        <h1 className="max-w-4xl text-3xl font-semibold tracking-tight sm:text-5xl">
          {briefing.headline}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {briefing.lede}
        </p>
        <p className="text-sm text-muted-foreground">
          {location.city} · {input.birthDate} · betrouwbaarheid {briefing.confidence}/100
        </p>
      </section>

      <section className="max-w-3xl space-y-4">
        <p className="type-kicker">01 · Diagnose</p>
        <h2 className="text-2xl font-semibold tracking-tight">Wat dit over jou zegt</h2>
        <Prose text={briefing.narrative} />
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Jouw rol</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed text-muted-foreground">
            {briefing.role}
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
            <CardTitle className="text-base">Geld</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed text-muted-foreground">
            {briefing.riskStrategy}
          </CardContent>
        </Card>
      </section>

      <section className="space-y-5">
        <div className="max-w-3xl space-y-2">
          <p className="type-kicker">02 · Voorbeelden</p>
          <h2 className="text-2xl font-semibold tracking-tight">Zo ziet dit eruit in het echt</h2>
          <p className="text-muted-foreground">
            Drie manieren om dit te zetten in {briefing.sector.toLowerCase()}.
            Zelfde rol, dezelfde schaal.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {briefing.examples.map((example, index) => (
            <Card key={example.title}>
              <CardHeader>
                <p className="type-kicker">{String(index + 1).padStart(2, "0")}</p>
                <CardTitle className="text-lg">{example.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                {example.story}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="max-w-3xl space-y-2">
          <p className="type-kicker">03 · Eerste 90 dagen</p>
          <h2 className="text-2xl font-semibold tracking-tight">Stappen die je kunt uitvoeren</h2>
          <p className="text-muted-foreground">
            Geen presentatie. Een volgorde. Doe ze zo, ook als week twee saaier is dan week één.
          </p>
        </div>
        <ol className="space-y-4">
          {briefing.steps.map((step, index) => (
            <li key={step.title} className="rounded-lg border border-border bg-card p-5">
              <p className="type-kicker">
                {String(index + 1).padStart(2, "0")} · {step.window}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hoe jij beslist</CardTitle>
          </CardHeader>
          <CardContent>
            <Prose text={briefing.decisionProtocol} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Wat dit jaar vraagt</CardTitle>
          </CardHeader>
          <CardContent>
            <Prose text={briefing.timing} />
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Wie je als eerste aanwerft</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              {briefing.hiringMandate.map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Wat je laat liggen</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              {briefing.avoid.map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {briefing.paradoxes.length > 0 ? (
        <section className="space-y-4">
          <p className="type-kicker">Spanning in het patroon</p>
          <h2 className="text-2xl font-semibold tracking-tight">Dit is geen fout</h2>
          {briefing.paradoxes.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                {item.explanation}
              </CardContent>
            </Card>
          ))}
        </section>
      ) : null}

      <section className="space-y-4">
        <p className="type-kicker">04 · Bewijs</p>
        <h2 className="text-xl font-semibold tracking-tight">Waar de vier bronnen het over eens zijn</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Cohort</CardTitle>
            </CardHeader>
            <CardContent>
              <Metric label="Positie" value={COHORT_LABEL[layers.rae.cohortPosition]} />
              <Metric label="Peildatum" value={layers.rae.cutoffLabel} />
              <Metric label="Risicobereidheid" value={`${layers.rae.riskAppetite}/100`} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Sector</CardTitle>
            </CardHeader>
            <CardContent>
              <Metric label="Hoofdlijn" value={ELEMENT_LABEL[layers.bazi.dominant]} />
              <Metric label="Sector" value={layers.bazi.sectors.slice(0, 3).join(" · ")} />
              <Metric
                label="Wat ontbreekt"
                value={
                  layers.bazi.missing.length
                    ? layers.bazi.missing.map((item) => ELEMENT_LABEL[item]).join(" · ")
                    : "geen duidelijk gat"
                }
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Drijfveer</CardTitle>
            </CardHeader>
            <CardContent>
              <Metric label="Levenspad" value={String(layers.numerology.lifePath)} />
              <Metric label="Expressie" value={String(layers.numerology.expression)} />
              <Metric label="Persoonlijk jaar" value={String(layers.numerology.personalYear)} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Organisatie</CardTitle>
            </CardHeader>
            <CardContent>
              <Metric
                label="Rol"
                value={TYPE_LABEL[layers.design.careerType]}
              />
              <Metric label="Schaal" value={ENV_LABEL[layers.design.environment]} />
              <Metric
                label="Wat jij meebrengt"
                value={layers.design.skills.slice(0, 4).join(" · ") || "geen duidelijke kern"}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      <p className="text-xs leading-relaxed text-muted-foreground">
        {layers.design.approximationNotes.join(" ")} De klaspositie rust op onderzoek.
        De andere drie bronnen zijn werkhypotheses, geen wet.
      </p>
    </div>
  );
}
