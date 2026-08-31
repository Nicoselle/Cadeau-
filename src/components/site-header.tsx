import Link from "next/link";
import { MarketTape } from "@/components/krant/market-tape";
import { EDITION } from "@/data/edition";
import { getMarketBoard } from "@/data/markets";
import { formatNlDate, formatWeekday } from "@/lib/newspaper";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "/", label: "Voorpagina" },
  { href: "/markten", label: "Markten" },
  { href: "/piramide", label: "Piramide" },
  { href: "/desk/belgie", label: "België" },
  { href: "/orakelboek", label: "Orakelboek" },
  { href: "/methode", label: "Methode" },
  { href: "/archief", label: "Archief" },
];

export function SiteHeader() {
  const board = getMarketBoard();

  return (
    <header className="bg-background">
      <div className="container">
        <div className="flex items-center justify-between gap-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          <p>
            {formatWeekday(EDITION.date)} {formatNlDate(EDITION.date)}
          </p>
          <p className="hidden sm:block">
            Jaargang 1 · {EDITION.folio} · Brussel
          </p>
          <p>Peil {formatNlDate(EDITION.asOf, "short")}</p>
        </div>

        <div className="border-y-[3px] border-foreground">
          <div className="border-y border-foreground py-4 text-center sm:py-5">
            <Link href="/" className="block">
              <p className="font-display text-[clamp(2.2rem,7vw,4.4rem)] font-bold leading-none tracking-[-0.035em]">
                {SITE.name}
              </p>
            </Link>
            <p className="mt-2 font-serif text-sm italic text-muted-foreground sm:text-[15px]">
              {SITE.tagline}
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em]">
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
      <MarketTape tiles={board.tiles} />
    </header>
  );
}
