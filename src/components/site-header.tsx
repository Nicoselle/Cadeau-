import Link from "next/link";
import { SITE } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="container flex min-h-16 flex-wrap items-center justify-between gap-x-3 gap-y-2 py-2">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
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
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-sm font-semibold tracking-tight">
              {SITE.shortName}
            </span>
            <span className="hidden text-[11px] text-muted-foreground sm:block">
              Noodvoedsel-directory
            </span>
          </span>
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-1 text-sm">
          <Link
            href="/"
            className="hidden rounded-md px-3 py-1.5 font-medium text-foreground hover:bg-muted sm:inline-flex"
          >
            Directory
          </Link>
          <Link
            href="/compare"
            className="rounded-md px-2 py-1.5 font-medium text-foreground hover:bg-muted sm:px-3"
          >
            Vergelijken
          </Link>
          <Link
            href="/keuze"
            className="rounded-md px-2 py-1.5 font-medium text-foreground hover:bg-muted sm:px-3"
          >
            Keuze
          </Link>
          <Link
            href="/api/v1/products"
            className="hidden rounded-md px-3 py-1.5 font-medium text-muted-foreground hover:bg-muted md:inline-flex"
          >
            API
          </Link>
        </nav>
      </div>
    </header>
  );
}
