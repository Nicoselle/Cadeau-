import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StoryCard } from "@/components/krant/story-card";
import { articlesByDesk } from "@/lib/newspaper";
import { DESK_LABELS } from "@/lib/site";
import type { Desk } from "@/types/newspaper";

const DESKS = Object.keys(DESK_LABELS) as Desk[];

export function generateStaticParams() {
  return DESKS.map((desk) => ({ desk }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ desk: string }>;
}): Promise<Metadata> {
  const { desk } = await params;
  const label = DESK_LABELS[desk];
  if (!label) return { title: "Desk niet gevonden" };
  return {
    title: label,
    description: `Stukken over ${label} in de Kapitaalkrant.`,
  };
}

export default async function DeskPage({
  params,
}: {
  params: Promise<{ desk: string }>;
}) {
  const { desk } = await params;
  if (!DESKS.includes(desk as Desk)) notFound();
  const label = DESK_LABELS[desk];
  const items = articlesByDesk(desk as Desk);

  return (
    <div className="container py-10">
      <p className="text-[11px] uppercase tracking-[0.18em] text-accent">
        Rubriek
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
        {label}
      </h1>
      <p className="mt-4 font-serif text-lg text-muted-foreground">
        {items.length} {items.length === 1 ? "stuk" : "stukken"}.
      </p>
      {desk === "opinie" ? (
        <p className="mt-3 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground">
          Augustus 2026 staat weekdag voor weekdag, zonder vooruitkijken.
          Cijfer, waarnemingsdatum en bestand:{" "}
          <Link href="/nazien" className="underline hover:text-accent">
            nazien
          </Link>
          .
        </p>
      ) : null}
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {items.map((article) => (
          <StoryCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
