import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container flex flex-1 flex-col items-center justify-center py-24 text-center">
        <p className="text-sm font-medium text-accent">404</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">
          Pagina niet gevonden
        </h1>
        <p className="mt-2 max-w-md text-muted-foreground">
          Dit product of deze pagina bestaat niet (meer). Ga terug naar de
          directory om alle noodvoedselpakketten te bekijken.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Naar de directory
        </Link>
      </div>
      <SiteFooter />
    </div>
  );
}
