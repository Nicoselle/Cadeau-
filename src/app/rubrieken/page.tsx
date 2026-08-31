import type { Metadata } from "next";
import Link from "next/link";
import { StoryCard } from "@/components/krant/story-card";
import { articlesByDesk } from "@/lib/newspaper";
import { RUBRIEKEN } from "@/lib/rubrieken";

export const metadata: Metadata = {
  title: "Rubrieken",
  description:
    "Alle rubrieken van de Kapitaalkrant: landen, geld, rente, grondstoffen, titels, mening, markten en de piramide.",
};

export default function RubriekenPage() {
  return (
    <div className="container py-10">
      <p className="kicker">Inhoudsopgave</p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-[-0.025em] sm:text-5xl">
        Rubrieken
      </h1>
      <p className="mt-4 max-w-2xl font-serif text-lg text-muted-foreground">
        Meer dan een landenbalk. Geld, rente, grondstoffen en titels hebben
        hun eigen plank. Markten blijft de vloer; de piramide de weging.
      </p>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {RUBRIEKEN.map((rubriek) => {
          const latest = rubriek.desk
            ? articlesByDesk(rubriek.desk)[0]
            : undefined;
          const count = rubriek.desk
            ? articlesByDesk(rubriek.desk).length
            : null;
          return (
            <section key={rubriek.id} className="rule-story">
              <p className="kicker">{count == null ? "Pagina" : "Rubriek"}</p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.02em]">
                <Link href={rubriek.href} className="hover:text-accent">
                  {rubriek.label}
                </Link>
              </h2>
              <p className="mt-3 font-serif text-[15px] leading-relaxed text-muted-foreground">
                {rubriek.blurb}
              </p>
              {count != null ? (
                <p className="mt-2 font-sans text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
                  {count} {count === 1 ? "stuk" : "stukken"}
                </p>
              ) : null}
              {latest ? (
                <div className="mt-6">
                  <StoryCard article={latest} size="compact" />
                </div>
              ) : (
                <p className="mt-4">
                  <Link
                    href={rubriek.href}
                    className="text-sm font-medium uppercase tracking-[0.12em] underline hover:text-accent"
                  >
                    Naar {rubriek.label}
                  </Link>
                </p>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
