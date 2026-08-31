import Link from "next/link";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50">
      <div className="container flex flex-col gap-3 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          {SITE.name} helpt je nadenken. Het vervangt geen boekhouder of advocaat.
        </p>
        <div className="flex gap-5">
          <Link href="/methode" className="hover:text-foreground">
            Hoe het werkt
          </Link>
          <Link href="/api/v1/briefing" className="hover:text-foreground">
            API
          </Link>
        </div>
      </div>
    </footer>
  );
}
