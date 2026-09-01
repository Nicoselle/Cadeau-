import Link from "next/link";

export default function RoosterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark min-h-screen bg-slate-950 text-slate-100">
      <header className="no-print sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[88rem] items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/rooster" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-amber-400 text-slate-950">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-sm font-semibold tracking-tight">
                Nachtrooster
              </span>
              <span className="text-[11px] text-slate-400">
                21:00–08:00 · 7/7
              </span>
            </span>
          </Link>
          <p className="hidden text-xs text-slate-400 sm:block">
            Blijft op deze computer. Geen login nodig.
          </p>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
