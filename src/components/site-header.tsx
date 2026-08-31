import Link from "next/link";
import { SITE } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-border/80">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-baseline gap-3">
          <span className="text-lg font-semibold tracking-tight">{SITE.name}</span>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            {SITE.tagline}
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/methode" className="hover:text-foreground">
            Methode
          </Link>
          <Link href="/#intake" className="hover:text-foreground">
            Dossier
          </Link>
        </nav>
      </div>
    </header>
  );
}
