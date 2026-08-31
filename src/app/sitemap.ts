import type { MetadataRoute } from "next";
import { products, DATA_LAST_UPDATED } from "@/data/products";
import { decisions, KEUZE_UPDATED } from "@/data/keuze/catalog";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(DATA_LAST_UPDATED);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE.url}/compare`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE.url}/keuze`,
      lastModified: new Date(KEUZE_UPDATED),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}/keuze/ledger`,
      lastModified: new Date(KEUZE_UPDATED),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${SITE.url}/keuze/architectuur`,
      lastModified: new Date(KEUZE_UPDATED),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...decisions.map((decision) => ({
      url: `${SITE.url}/keuze/${decision.id}`,
      lastModified: new Date(KEUZE_UPDATED),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE.url}/product/${p.id}`,
    lastModified: new Date(p.lastUpdated),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
