import Link from "next/link";
import { DATA_LAST_UPDATED } from "@/data/products";
import { LastUpdated } from "@/components/last-updated";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="container flex flex-col gap-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="font-medium text-foreground">{SITE.name}</p>
          <p className="max-w-md">
            Echte producten met retailerlinks voor de Benelux/EU. Prijzen,
            voorraad en sommige specs kunnen wijzigen — controleer bij de
            retailer vóór aankoop.
          </p>
        </div>
        <div className="space-y-1 md:text-right">
          <LastUpdated date={DATA_LAST_UPDATED} />
          <div className="flex gap-3 md:justify-end">
            <Link href="/keuze" className="hover:text-foreground">
              Keuze
            </Link>
            <Link href="/api/v1/products" className="hover:text-foreground">
              JSON API
            </Link>
            <Link href="/sitemap.xml" className="hover:text-foreground">
              Sitemap
            </Link>
            <Link href="/robots.txt" className="hover:text-foreground">
              robots.txt
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
