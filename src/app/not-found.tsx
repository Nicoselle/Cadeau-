import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-medium text-accent">404</p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
        Pagina niet gevonden
      </h1>
      <p className="mt-2 max-w-md font-serif text-muted-foreground">
        Dit stuk of deze pagina bestaat niet. Ga terug naar de voorpagina.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex h-9 items-center justify-center border border-foreground px-4 text-sm font-medium uppercase tracking-[0.12em] hover:bg-foreground hover:text-background"
      >
        Naar de voorpagina
      </Link>
    </div>
  );
}
