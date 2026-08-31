import type { Metadata } from "next";
import { StoryForm } from "@/components/lokaal/story-form";

export const metadata: Metadata = {
  title: "Uw verhaal",
  description:
    "Lokale ondernemers sturen hun verhaal in. De Kapitaalkrant zet het automatisch en bezorgt het aan abonnees van die gemeente.",
};

export default function StoryPage() {
  return (
    <div className="container py-10">
      <p className="text-[11px] uppercase tracking-[0.18em] text-accent">
        Lokaal · inzending
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
        Doe uw verhaal
      </h1>
      <p className="mt-4 max-w-2xl font-serif text-lg text-muted-foreground">
        Geen persbericht dat in een bak verdwijnt. U schrijft, de desk zet. Als
        een abonnee uw gemeente heeft gevraagd, staat het verhaal in hun editie.
        Niemand hoeft op een knop te drukken.
      </p>
      <div className="mt-10">
        <StoryForm />
      </div>
    </div>
  );
}
