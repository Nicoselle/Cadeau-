import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center py-24 text-center">
      <p className="type-kicker">404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">Pagina niet gevonden</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        Dit pad bestaat niet. Ga terug naar de intake.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
      >
        Naar Azimut
      </Link>
    </div>
  );
}
