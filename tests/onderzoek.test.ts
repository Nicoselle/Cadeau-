import { describe, expect, it } from "vitest";
import {
  ASSET_NOTES,
  DOSSIERS,
  NEWS_CHANNELS,
  dossierForAsset,
  noteForAsset,
} from "@/data/dossiers";
import { getMarketBoard } from "@/data/markets";
import { WATCHLIST } from "@/data/watchlist";
import { scoreHeadline } from "@/lib/macro-news";
import { parseRssItems } from "@/lib/local-search";
import { macroImpact } from "@/lib/research";

describe("onderzoeksdossiers", () => {
  it("dekt elke gevolgde naam met een dossier en een noot", () => {
    for (const item of WATCHLIST) {
      expect(dossierForAsset(item.id), item.id).toBeDefined();
      expect(noteForAsset(item.id), item.id).toBeDefined();
    }
    expect(ASSET_NOTES).toHaveLength(WATCHLIST.length);
    const covered = DOSSIERS.flatMap((dossier) => dossier.assetIds);
    expect(new Set(covered).size).toBe(WATCHLIST.length);
  });

  it("koppelt drivers alleen aan bestaande vloer-tegels", () => {
    const tileIds = new Set(getMarketBoard().tiles.map((tile) => tile.id));
    for (const dossier of DOSSIERS) {
      for (const driver of dossier.drivers) {
        expect(tileIds.has(driver.tileId), driver.tileId).toBe(true);
      }
    }
  });

  it("legt M2 en de 10-jaars op de piramide, niet op lokaal nieuws", () => {
    const impact = macroImpact(getMarketBoard());
    const m2 = impact.find((row) => row.tile.id === "m2");
    expect(m2?.hits.some((hit) => hit.slug === "edelmetalen")).toBe(true);
    expect(m2?.hits.some((hit) => hit.slug === "crypto")).toBe(true);
    expect(impact.find((row) => row.tile.id === "brent")?.hits.some((hit) => hit.slug === "kasstroom")).toBe(true);
    expect(impact.find((row) => row.tile.id === "koper")?.hits.some((hit) => hit.slug === "kritieke-grondstoffen")).toBe(true);
    expect(impact.find((row) => row.tile.id === "uranium")?.hits.some((hit) => hit.slug === "kritieke-grondstoffen")).toBe(true);
    expect(impact.every((row) => row.hits.length > 0)).toBe(true);
  });

  it("laat een kop alleen door als die het dossier raakt", () => {
    const goud = NEWS_CHANNELS.find((item) => item.id === "edelmetalen");
    expect(goud).toBeDefined();
    expect(
      scoreHeadline(goud!, {
        title: "Goudprijs stijgt na reële rente",
        description: "TIPS",
      }),
    ).toBeGreaterThanOrEqual(1);
    expect(
      scoreHeadline(goud!, {
        title: "Club wint de wedstrijd",
        description: "voetbal",
      }),
    ).toBe(0);
  });

  it("leest RSS-koppen als titel, bron en link", () => {
    const xml = `<?xml version="1.0"?><rss><channel>
      <item>
        <title>Brent stijgt, Petrobras onder druk - Reuters</title>
        <link>https://example.com/pbr</link>
        <pubDate>Mon, 31 Aug 2026 08:00:00 GMT</pubDate>
        <source>Reuters</source>
        <description>Olie</description>
      </item>
    </channel></rss>`;
    const items = parseRssItems(xml);
    expect(items[0]?.title).toMatch(/Petrobras/i);
    expect(items[0]?.url).toBe("https://example.com/pbr");
    expect(items[0]?.source).toBe("Reuters");
  });
});
