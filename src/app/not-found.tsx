import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-4xl font-medium tracking-tight">Deze pagina bestaat niet</h1>
      <p className="mt-3 max-w-md text-lg text-muted-foreground">
        Geen zorgen. Begin opnieuw vanaf de start.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center rounded-full bg-primary px-7 text-base font-medium text-primary-foreground"
      >
        Terug naar Azimut
      </Link>
    </div>
  );
}
