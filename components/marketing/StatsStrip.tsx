const STATS = [
  { value: "6,800+", label: "ideas analyzed" },
  { value: "50+", label: "signals per report" },
  { value: "6", label: "scored factors" },
  { value: "~18%", label: "reach launch-ready" },
];

export default function StatsStrip() {
  return (
    <section className="border-y border-edge bg-panel/40">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 py-10 sm:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-2xl font-semibold text-white sm:text-3xl">
              {s.value}
            </div>
            <div className="mt-1 text-xs uppercase tracking-wide text-zinc-500">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
