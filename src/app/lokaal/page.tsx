import type { Metadata } from "next";
import { EditionFigure } from "@/components/krant/edition-figure";
import { LocalDesk } from "@/components/lokaal/local-desk";
import { LOKAAL_IMAGE } from "@/data/page-images";

export const metadata: Metadata = {
  title: "Lokaal",
  description:
    "Vraaggerichte lokale ondernemersdesk. Abonnees kiezen een gemeente; de Kapitaalkrant zoekt en zet automatisch.",
};

export default function LocalPage() {
  return (
    <div className="container py-10">
      <p className="text-[11px] uppercase tracking-[0.18em] text-accent">
        Desk · vraaggestuurd
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
        Lokaal
      </h1>
      <p className="mt-4 max-w-2xl font-serif text-lg text-muted-foreground">
        Geen landelijke selectie die toevallig uw stad raakt. U zegt waar u
        lokaal nieuws wilt. Daarna zoekt de desk ondernemersberichten en laat
        zaakvoerders hun eigen verhaal doen — alleen voor wie die gemeente
        vroeg.
      </p>
      <EditionFigure image={LOKAAL_IMAGE} className="mt-8 max-w-3xl" />
      <div className="mt-10">
        <LocalDesk />
      </div>
    </div>
  );
}
