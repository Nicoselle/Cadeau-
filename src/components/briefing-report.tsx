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

function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] || "daar";
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1 border-t border-border/50 pt-3 first:border-t-0 first:pt-0">
      <p className="type-label text-muted-foreground">{label}</p>
      <p className="text-base leading-relaxed">{value}</p>
    </div>
  );
}

function Prose({ text }: { text: string }) {
  return (
    <div className="space-y-4">
      {text.split("\n\n").map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className="text-lg leading-relaxed text-muted-foreground">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export function BriefingReport({ result }: { result: BriefingResponse }) {
  const { briefing, layers, location, input } = result;
  const name = firstName(input.fullName);

  return (
    <div className="space-y-16">
      <section className="space-y-5">
        <p className="type-kicker">
          Voor {name} · {location.city}
        </p>
        <h1 className="max-w-3xl text-4xl font-medium leading-[1.15] tracking-tight sm:text-5xl">
          {briefing.headline}
        </h1>
        <p className="max-w-2xl text-xl leading-relaxed text-muted-foreground">
          {briefing.lede}
        </p>
      </section>

      <section className="max-w-3xl space-y-5">
        <p className="type-kicker">Eerst dit</p>
        <h2 className="text-3xl font-medium tracking-tight">Zo zit jij in elkaar</h2>
        <Prose text={briefing.narrative} />
      </section>

      <section className="grid gap-5 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Jouw rol</CardTitle>
          </CardHeader>
          <CardContent className="text-base leading-relaxed text-muted-foreground">
            {briefing.role}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Met wie</CardTitle>
          </CardHeader>
          <CardContent className="text-base leading-relaxed text-muted-foreground">
            {briefing.structure}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Met geld</CardTitle>
          </CardHeader>
          <CardContent className="text-base leading-relaxed text-muted-foreground">
            {briefing.riskStrategy}
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <div className="max-w-3xl space-y-2">
          <p className="type-kicker">Drie voorbeelden</p>
          <h2 className="text-3xl font-medium tracking-tight">Zaken die hierbij passen</h2>
          <p className="text-lg text-muted-foreground">
            Niet als wet. Als richting, in {briefing.sector.toLowerCase()}.
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {briefing.examples.map((example, index) => (
            <Card key={example.title}>
              <CardHeader>
                <p className="type-kicker">{index + 1}</p>
                <CardTitle>{example.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-base leading-relaxed text-muted-foreground">
                {example.story}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="max-w-3xl space-y-2">
          <p className="type-kicker">De eerste maanden</p>
          <h2 className="text-3xl font-medium tracking-tight">Doe het in deze volgorde</h2>
          <p className="text-lg text-muted-foreground">
            Week twee mag saaier zijn dan week één. Dat is het punt.
          </p>
        </div>
        <ol className="space-y-4">
          {briefing.steps.map((step, index) => (
            <li key={step.title} className="soft-card flex gap-5 p-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 font-serif text-lg text-primary">
                {index + 1}
              </span>
              <div>
                <p className="type-kicker">{step.window}</p>
                <h3 className="mt-1 font-serif text-xl font-medium">{step.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hoe jij het best beslist</CardTitle>
          </CardHeader>
          <CardContent>
            <Prose text={briefing.decisionProtocol} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Wat dit jaar van je vraagt</CardTitle>
          </CardHeader>
          <CardContent>
            <Prose text={briefing.timing} />
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Wie je er het eerst bij haalt</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-base leading-relaxed text-muted-foreground">
              {briefing.hiringMandate.map((item) => (
                <li key={item} className="pl-1">
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Wat je beter laat liggen</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-base leading-relaxed text-muted-foreground">
              {briefing.avoid.map((item) => (
                <li key={item} className="pl-1">
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {briefing.paradoxes.length > 0 ? (
        <section className="space-y-5">
          <p className="type-kicker">Geen tegenstelling om je druk over te maken</p>
          <h2 className="text-3xl font-medium tracking-tight">Dat mag naast elkaar bestaan</h2>
          {briefing.paradoxes.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-base leading-relaxed text-muted-foreground">
                {item.explanation}
              </CardContent>
            </Card>
          ))}
        </section>
      ) : null}

      <section className="space-y-5">
        <p className="type-kicker">Waar het vandaan komt</p>
        <h2 className="text-3xl font-medium tracking-tight">De vier bronnen, in het kort</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">De klas</CardTitle>
            </CardHeader>
            <CardContent>
              <Metric label="Jij was" value={COHORT_LABEL[layers.rae.cohortPosition]} />
              <Metric label="Schoolpeildatum" value={layers.rae.cutoffLabel} />
              <Metric label="Risico" value={`${layers.rae.riskAppetite} op 100`} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">De markt</CardTitle>
            </CardHeader>
            <CardContent>
              <Metric label="Hoofdlijn" value={ELEMENT_LABEL[layers.bazi.dominant]} />
              <Metric label="Sectoren" value={layers.bazi.sectors.slice(0, 3).join(", ")} />
              <Metric
                label="Wat je erbij zoekt"
                value={
                  layers.bazi.missing.length
                    ? layers.bazi.missing.map((item) => ELEMENT_LABEL[item]).join(", ")
                    : "niets dat er structureel ontbreekt"
                }
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Jouw drijfveer</CardTitle>
            </CardHeader>
            <CardContent>
              <Metric label="Levenspad" value={String(layers.numerology.lifePath)} />
              <Metric label="Expressie" value={String(layers.numerology.expression)} />
              <Metric label="Dit jaar" value={`jaar ${layers.numerology.personalYear} in de cyclus`} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">De ploeg</CardTitle>
            </CardHeader>
            <CardContent>
              <Metric label="Rol" value={TYPE_LABEL[layers.design.careerType]} />
              <Metric label="Schaal" value={ENV_LABEL[layers.design.environment]} />
              <Metric
                label="Wat jij meebrengt"
                value={layers.design.skills.slice(0, 4).join(", ") || "geen duidelijke kern"}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {layers.design.approximationNotes.join(" ")} De klaspositie rust op
        onderzoek. De rest is een werkhypothese — geen wet, wel een bruikbaar
        gesprek.
      </p>
    </div>
  );
}
