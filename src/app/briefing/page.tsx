import type { Metadata } from "next";
import Link from "next/link";
import { buildBriefing } from "@/lib/briefing";
import { formatNlDate } from "@/lib/newspaper";

export const metadata: Metadata = {
  title: "Briefing",
  description:
    "Dagelijkse redactiebriefing van de Kapitaalkrant. Nico beslist om 14 uur; het stuk staat om 15 uur. Geen beleggingsadvies.",
  robots: { index: false, follow: false },
};

export default function BriefingPage() {
  const briefing = buildBriefing();

  return (
    <div className="container py-10">
      <p className="kicker">
        Redactie · {briefing.clock.timezone}
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-[-0.025em] sm:text-5xl">
        Briefing
      </h1>
      <p className="mt-4 max-w-2xl font-serif text-lg text-muted-foreground">
        Om {briefing.clock.briefingHour} uur ligt dit pakket. Om{" "}
        {briefing.clock.decisionHour} uur beslist Nico. Om{" "}
        {briefing.clock.editionHour} uur is het stuk klaar — als hij ja zegt.
        Geen automatische editie.
      </p>

      <section className="mt-10 max-w-3xl border-t-2 border-foreground pt-8">
        <p className="kicker text-muted-foreground">
          Geldende editie
        </p>
        <p className="mt-2 font-display text-2xl font-bold tracking-[-0.02em]">
          {briefing.edition.folio} — {briefing.edition.name}
        </p>
        <p className="mt-2 font-serif text-muted-foreground">
          Gedateerd {formatNlDate(briefing.edition.date)}. Peil{" "}
          {formatNlDate(briefing.edition.asOf)}.
        </p>
      </section>

      <section className="mt-10 max-w-3xl rule-story">
        <p className="kicker">
          {briefing.recommendation === "nieuwe_waarneming"
            ? "Nieuwere waarneming"
            : "Zelfde vloer"}
        </p>
        <p className="mt-3 font-serif leading-relaxed">{briefing.advice}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Vloer</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {briefing.tiles.map((tile) => (
            <article key={tile.id} className="rule-story">
              <p className="kicker text-muted-foreground">
                {tile.label}
              </p>
              <p className="mt-1 font-display text-3xl font-bold tabular-nums">
                {tile.value}
              </p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                {tile.asOf}
                {tile.newerThanEdition ? " · nieuwer dan de editie" : " · zelfde peil"}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-2xl font-semibold">
          Vragen voor 14 uur
        </h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 font-serif leading-relaxed">
          {briefing.questions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ol>
        {briefing.nextOracle ? (
          <p className="mt-6 font-serif text-sm leading-relaxed text-muted-foreground">
            Eerstvolgende orakeltoets: regel {briefing.nextOracle.id} op{" "}
            {formatNlDate(briefing.nextOracle.testDate)}.
          </p>
        ) : null}
        {briefing.decision ? (
          <p className="mt-4 font-serif text-sm text-muted-foreground">
            Laatste vastgelegde beslissing: {briefing.decision.date}
            {briefing.decision.publish ? " — publiceren" : " — geen editie"}.
          </p>
        ) : (
          <p className="mt-4 font-serif text-sm text-muted-foreground">
            Nog geen beslissing in de map. Antwoord in de bot, of als JSON in{" "}
            <code>redactie/beslissingen/</code>.
          </p>
        )}
      </section>

      <p className="mt-12 font-serif text-sm text-muted-foreground">
        <Link href="/methode" className="underline hover:text-accent">
          Methode
        </Link>
        {" · "}
        <Link href="/api/v1/briefing" className="underline hover:text-accent">
          JSON
        </Link>
        {" · "}
        <Link href="/markten" className="underline hover:text-accent">
          Datavloer
        </Link>
        .
      </p>
    </div>
  );
}
