import Link from "next/link";
import { EDITION } from "@/data/edition";
import { formatNlDate } from "@/lib/newspaper";
import { CADEAU, SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t-[3px] border-foreground">
      <div className="container grid gap-8 border-t border-foreground py-10 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-bold tracking-[-0.02em]">
            {SITE.name}
          </p>
          <p className="mt-2 max-w-sm font-serif text-sm leading-relaxed text-muted-foreground">
            Zelfstandige beleggingskrant. Geen advies, geen
            modelportefeuille. Wel cijfers met bon, duiding met tegenwerping,
            een piramide met volglijst en dossiers, en een orakelboek dat wij
            later zelf toetsen.
          </p>
        </div>
        <div className="text-sm">
          <p className="kicker">Redactie</p>
          <ul className="mt-2 space-y-1 font-serif">
            <li>
              <Link href="/methode" className="hover:text-accent">
                Methode en statuut
              </Link>
            </li>
            <li>
              <Link href="/piramide" className="hover:text-accent">
                Piramide
              </Link>
            </li>
            <li>
              <Link href="/desk/opinie" className="hover:text-accent">
                De mening
              </Link>
            </li>
            <li>
              <Link href="/nazien" className="hover:text-accent">
                Nazien augustus
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
          <p className="kicker mt-5">Andere uitgaven</p>
          <ul className="mt-2 space-y-1 font-serif text-muted-foreground">
            <li>
              <Link href="/lokaal" className="hover:text-accent">
                Lokaal
              </Link>
            </li>
            <li>
              <Link href={CADEAU.path} className="hover:text-accent">
                {CADEAU.shortName}
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-sm md:text-right">
          <p className="kicker">Editie {EDITION.number}</p>
          <p className="mt-2 font-serif">
            Gedateerd {formatNlDate(EDITION.date)}. {EDITION.note}
          </p>
        </div>
      </div>
    </footer>
  );
}
