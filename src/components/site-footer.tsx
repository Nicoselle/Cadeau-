import Link from "next/link";
import { EDITION } from "@/data/edition";
import { formatNlDate } from "@/lib/newspaper";
import { CADEAU, SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t-2 border-foreground bg-[hsl(40_42%_96%)]">
      <div className="container grid gap-8 py-10 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-semibold">{SITE.name}</p>
          <p className="mt-2 max-w-sm font-serif text-sm leading-relaxed text-muted-foreground">
            Zelfstandige investeerderskrant. Geen beleggingsadvies, geen
            modelportefeuille. Wel cijfers met bon, duiding met tegenwerping,
            een volglijst met laatste print, en een orakelboek dat wij later
            zelf toetsen.
          </p>
        </div>
        <div className="text-sm">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Redactie
          </p>
          <ul className="mt-2 space-y-1 font-serif">
            <li>
              <Link href="/methode" className="hover:text-accent">
                Methode en statuut
              </Link>
            </li>
            <li>
              <Link href="/piramide" className="hover:text-accent">
                Piramide en volglijst
              </Link>
            </li>
            <li>
              <Link href="/onderzoek" className="hover:text-accent">
                Onderzoek
              </Link>
            </li>
            <li>
              <Link href="/smc" className="hover:text-accent">
                SMC
              </Link>
            </li>
            <li>
              <Link href="/lokaal" className="hover:text-accent">
                Lokaal
              </Link>
            </li>
            <li>
              <Link href="/lokaal/verhaal" className="hover:text-accent">
                Ondernemersverhaal
              </Link>
            </li>
            <li>
              <Link href="/orakelboek" className="hover:text-accent">
                Orakelboek
              </Link>
            </li>
            <li>
              <Link href="/api/v1/krant" className="hover:text-accent">
                JSON-editie
              </Link>
            </li>
            <li>
              <Link href="/llms.txt" className="hover:text-accent">
                llms.txt
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-sm md:text-right">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Editie {EDITION.number}
          </p>
          <p className="mt-2 font-serif">
            Gedateerd {formatNlDate(EDITION.date)}. {EDITION.note}
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Zusterproject:{" "}
            <Link href={CADEAU.path} className="underline hover:text-foreground">
              {CADEAU.shortName}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
