"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const EXAMPLES = [
  "An AI tool that validates startup ideas before you build",
  "A marketplace for renting camera gear between creators",
  "A meal-prep subscription for people with chronic illness",
];

export default function IdeaInput({ autoFocus = false }: { autoFocus?: boolean }) {
  const router = useRouter();
  const [idea, setIdea] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit() {
    const trimmed = idea.trim();
    if (!trimmed) {
      setError("Describe your idea in a sentence or two.");
      return;
    }
    router.push(`/validate?idea=${encodeURIComponent(trimmed)}`);
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="rounded-2xl border border-edge bg-panel p-2 shadow-2xl shadow-black/40 focus-within:border-accent/60">
        <textarea
          autoFocus={autoFocus}
          value={idea}
          onChange={(e) => {
            setIdea(e.target.value);
            if (error) setError(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit();
          }}
          rows={3}
          maxLength={600}
          placeholder="Describe your startup idea in a sentence or two…"
          className="w-full resize-none bg-transparent px-4 py-3 text-base text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
        />
        <div className="flex items-center justify-between gap-3 px-2 pb-1">
          <span className="text-xs text-zinc-500">{idea.length}/600</span>
          <button
            onClick={submit}
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-accent-soft"
          >
            Get my verdict →
          </button>
        </div>
      </div>

      {error ? (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      ) : (
        <div className="mt-3 flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => setIdea(ex)}
              className="rounded-full border border-edge px-3 py-1 text-xs text-zinc-400 transition hover:border-accent/50 hover:text-zinc-200"
            >
              {ex}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
