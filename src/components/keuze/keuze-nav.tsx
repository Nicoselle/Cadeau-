import Link from "next/link";

const LINKS = [
  { href: "/keuze", label: "Catalogus" },
  { href: "/keuze/ledger", label: "Ledger" },
  { href: "/keuze/architectuur", label: "Architectuur" },
] as const;

export function KeuzeNav({ current }: { current?: string }) {
  return (
    <nav className="flex flex-wrap gap-1 text-sm">
      {LINKS.map((link) => {
        const active = current === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={
              active
                ? "rounded-md bg-primary px-3 py-1.5 font-medium text-primary-foreground"
                : "rounded-md px-3 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
            }
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
