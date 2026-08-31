import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { DOSSIERS } from "@/data/dossiers";
import { EDITION } from "@/data/edition";
import { products } from "@/data/products";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(EDITION.asOf);

  const staticRoutes: MetadataRoute.Sitemap = [
    "/",
    "/markten",
    "/orakelboek",
    "/methode",
    "/archief",
    "/lokaal",
    "/lokaal/verhaal",
    "/piramide",
    "/volgen",
    "/onderzoek",
    "/smc",
    "/cadeau",
    "/compare",
    "/desk/vs",
    "/desk/eurozone",
    "/desk/belgie",
    "/desk/methode",
  ].map((path) => ({
    url: path === "/" ? SITE.url : `${SITE.url}${path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE.url}/stuk/${article.slug}`,
    lastModified: new Date(article.published),
    changeFrequency: "monthly",
    priority: article.lead ? 0.9 : 0.8,
  }));

  const dossierRoutes: MetadataRoute.Sitemap = DOSSIERS.map((dossier) => ({
    url: `${SITE.url}/onderzoek/${dossier.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE.url}/product/${product.id}`,
    lastModified: new Date(product.lastUpdated),
    changeFrequency: "weekly",
    priority: 0.4,
  }));

  return [...staticRoutes, ...articleRoutes, ...dossierRoutes, ...productRoutes];
}
