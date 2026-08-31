"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocalStories, useLocalSubscription } from "@/lib/local-store";
import type { EntrepreneurStory } from "@/types/local";

export function StoryForm() {
  const { subscription } = useLocalSubscription();
  const { remember } = useLocalStories();
  const [author, setAuthor] = useState("");
  const [company, setCompany] = useState("");
  const [plaats, setPlaats] = useState("");
  const [title, setTitle] = useState("");
  const [website, setWebsite] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [story, setStory] = useState<EntrepreneurStory | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/v1/lokaal/verhaal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author,
          company,
          plaats,
          title,
          website,
          body,
          extraDemand: subscription?.plaatsen ?? [],
        }),
      });
      const json = (await response.json()) as {
        data?: EntrepreneurStory;
        error?: string;
      };
      if (!response.ok || !json.data) {
        throw new Error(json.error ?? "Insturen mislukt");
      }
      remember(json.data);
      setStory(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Insturen mislukt");
    } finally {
      setBusy(false);
    }
  }

  if (story) {
    return (
      <div className="max-w-2xl">
        <p className="text-[11px] uppercase tracking-[0.16em] text-accent">
          {story.status === "gepubliceerd" ? "Gezet en bezorgd" : "In de wachtkamer"}
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold">{story.title}</h2>
        <p className="mt-4 font-serif leading-relaxed">{story.body}</p>
        {story.refusal ? (
          <p className="mt-6 border border-hairline bg-card px-4 py-3 font-serif text-sm">
            {story.refusal}
          </p>
        ) : (
          <p className="mt-6 font-serif text-sm text-muted-foreground">
            Abonnees die {story.plaatsName} vroegen, zien dit nu in hun lokale
            editie.
          </p>
        )}
        <Link
          href={`/lokaal/${story.plaatsSlug}`}
          className="mt-6 inline-block text-[12px] uppercase tracking-[0.14em] underline hover:text-accent"
        >
          Naar de editie van {story.plaatsName}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-5">
      <Field label="Uw naam" htmlFor="author">
        <input
          id="author"
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="mt-1.5 w-full border border-foreground bg-card px-3 py-2 font-serif text-[1.02rem] outline-none"
        />
      </Field>
      <Field label="Naam van de zaak" htmlFor="company">
        <input
          id="company"
          required
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="mt-1.5 w-full border border-foreground bg-card px-3 py-2 font-serif text-[1.02rem] outline-none"
        />
      </Field>
      <Field label="Gemeente" htmlFor="plaats">
        <input
          id="plaats"
          required
          value={plaats}
          onChange={(e) => setPlaats(e.target.value)}
          placeholder="Gent, Roeselare, Maastricht…"
          className="mt-1.5 w-full border border-foreground bg-card px-3 py-2 font-serif text-[1.02rem] outline-none"
        />
      </Field>
      <Field label="Kop (mag leeg blijven)" htmlFor="title">
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1.5 w-full border border-foreground bg-card px-3 py-2 font-serif text-[1.02rem] outline-none"
        />
      </Field>
      <Field label="Website (niet verplicht)" htmlFor="website">
        <input
          id="website"
          type="url"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="mt-1.5 w-full border border-foreground bg-card px-3 py-2 font-serif text-[1.02rem] outline-none"
        />
      </Field>
      <Field label="Uw verhaal" htmlFor="body">
        <textarea
          id="body"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={10}
          placeholder="Wat is er gebeurd, wat maakt de zaak, wat wilt u dat een lezer in uw stad weet?"
          className="mt-1.5 min-h-48 w-full border border-foreground bg-card px-3 py-3 font-serif text-[1.02rem] outline-none"
        />
      </Field>
      {error ? (
        <p className="border border-accent px-4 py-3 font-serif text-sm">{error}</p>
      ) : null}
      <button
        type="submit"
        disabled={busy}
        className="border border-foreground bg-foreground px-5 py-2 text-[12px] font-medium uppercase tracking-[0.14em] text-background disabled:opacity-50"
      >
        {busy ? "Zetten…" : "Zet het verhaal"}
      </button>
      <p className="font-serif text-sm text-muted-foreground">
        Geen redactie die goedkeurt. De desk weigert alleen spam en te korte
        teksten. Publicatie volgt automatisch als iemand uw gemeente heeft
        gevraagd — of als u die zelf volgt.
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
