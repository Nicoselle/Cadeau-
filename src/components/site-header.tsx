import Link from "next/link";
import { SITE } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-border/50">
      <div className="container flex items-center justify-between py-5">
        <Link href="/" className="flex items-baseline gap-3">
          <span className="font-serif text-2xl font-medium tracking-tight">{SITE.name}</span>
          <span className="hidden text-sm text-muted-foreground sm:inline">
            {SITE.tagline}
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/methode" className="transition-colors hover:text-foreground">
            Hoe het werkt
          </Link>
          <Link href="/#intake" className="transition-colors hover:text-foreground">
            Begin
          </Link>
        </nav>
      </div>
    </header>
  );
}
