const FEATURES = [
  {
    title: "Viability score",
    body: "A single 0–100 verdict built from six weighted factors — market, demand, competition, moat, business model, and risk.",
  },
  {
    title: "Competitor intel",
    body: "Up to eight competitors mapped with positioning, funding, pricing, and the weak spot a new entrant can exploit.",
  },
  {
    title: "Market sizing",
    body: "Bottom-up TAM / SAM / SOM with the methodology behind each number, ready to drop into a deck.",
  },
  {
    title: "Demand signals",
    body: "Where real people are already feeling this pain — communities, search trends, and review sites.",
  },
  {
    title: "Blind spots",
    body: "The risks most likely to kill the idea, ranked by severity, so nothing ambushes you post-launch.",
  },
  {
    title: "Smart pivots",
    body: "Three concrete pivots that would raise your score, each with an estimated lift.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="mb-12 max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight text-white">
          A reality check in one scan
        </h2>
        <p className="mt-3 text-zinc-400">
          One score you can act on, with the working shown behind every section.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-edge bg-panel p-6 transition hover:border-accent/40"
          >
            <h3 className="text-lg font-medium text-white">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {f.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
