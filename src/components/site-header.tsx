import Link from "next/link";
import { SITE } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
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
            <span className="text-[11px] text-muted-foreground">
              Noodvoedsel-directory
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/"
            className="rounded-md px-3 py-1.5 font-medium text-foreground hover:bg-muted"
          >
            Directory
          </Link>
          <Link
            href="/compare"
            className="rounded-md px-3 py-1.5 font-medium text-foreground hover:bg-muted"
          >
            Vergelijken
          </Link>
          <Link
            href="/rooster"
            className="rounded-md px-3 py-1.5 font-medium text-foreground hover:bg-muted"
          >
            Nachtrooster
          </Link>
          <Link
            href="/api/v1/products"
            className="rounded-md px-3 py-1.5 font-medium text-muted-foreground hover:bg-muted"
          >
            API
          </Link>
        </nav>
      </div>
    </header>
  );
}
