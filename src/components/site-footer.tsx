import Link from "next/link";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/80">
      <div className="container flex flex-col gap-3 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          {SITE.name} — hulpmiddel bij beslissingen, geen financieel of juridisch advies.
        </p>
        <div className="flex gap-5">
          <Link href="/methode" className="hover:text-foreground">
            Methode
          </Link>
          <Link href="/api/v1/briefing" className="hover:text-foreground">
            API
          </Link>
        </div>
      </div>
    </footer>
  );
}
