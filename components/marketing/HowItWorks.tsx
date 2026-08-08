const STEPS = [
  {
    n: "01",
    title: "Describe your idea",
    body: "One or two sentences. No forms, no sign-up, no deck required.",
  },
  {
    n: "02",
    title: "The engine analyzes it",
    body: "Claude scores your idea against six factors and drafts a full competitor and market breakdown.",
  },
  {
    n: "03",
    title: "Read the verdict",
    body: "Get a go / caution / no-go call with the evidence — and three pivots to raise your score.",
  },
];

export default function HowItWorks() {
  return (
    <section className="border-t border-edge bg-panel/30">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="mb-12 text-3xl font-semibold tracking-tight text-white">
          How it works
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n}>
              <div className="font-mono text-sm text-accent">{s.n}</div>
              <h3 className="mt-3 text-lg font-medium text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
