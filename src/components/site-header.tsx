import Link from "next/link";
import { EDITION } from "@/data/edition";
import { formatNlDate, formatWeekday } from "@/lib/newspaper";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "/", label: "Voorpagina" },
  { href: "/markten", label: "Markten" },
  { href: "/desk/belgie", label: "België" },
  { href: "/lokaal", label: "Lokaal" },
  { href: "/orakelboek", label: "Orakelboek" },
  { href: "/methode", label: "Methode" },
  { href: "/archief", label: "Archief" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-hairline bg-[hsl(40_42%_96%)]">
      <div className="container">
        <div className="flex items-center justify-between gap-4 py-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <p>
            {formatWeekday(EDITION.date)} {formatNlDate(EDITION.date)}
          </p>
          <p className="hidden sm:block">{EDITION.folio} · {EDITION.name}</p>
          <p>Peil {formatNlDate(EDITION.asOf, "short")}</p>
        </div>
        <div className="border-y-2 border-foreground py-4 text-center">
          <Link href="/" className="block">
            <p className="font-display text-[clamp(2.4rem,8vw,5.4rem)] font-semibold leading-none tracking-[-0.03em]">
              {SITE.name}
            </p>
          </Link>
          <p className="mt-2 font-serif text-sm italic text-muted-foreground sm:text-base">
            {SITE.tagline}
          </p>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 py-3 text-[13px] font-medium uppercase tracking-[0.14em]">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
