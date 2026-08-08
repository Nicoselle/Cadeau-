import IdeaInput from "@/components/IdeaInput";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pb-20 pt-24 text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-edge bg-panel px-3 py-1 text-xs text-zinc-400">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Proof, not opinions
        </span>

        <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Should you build this idea?
        </h1>
        <p className="mt-5 max-w-xl text-balance text-lg text-zinc-400">
          Live-style analysis of your competitors, market demand, and the blind
          spots you missed — before you spend six months building the wrong thing.
        </p>

        <div className="mt-10 flex justify-center">
          <IdeaInput />
        </div>

        <p className="mt-6 text-xs text-zinc-500">
          Free · No sign-up · Your idea is scored by AI, not a human
        </p>
      </div>
    </section>
  );
}
