import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { parseRestaurantWorkbook } from "../lib/xlsx-parse";
import { writeRestaurants } from "../lib/store";
import { CATEGORIES, type Category, type Restaurant } from "../lib/types";

const SOURCE_XLSX = path.join(__dirname, "source-data", "restaurants.xlsx");
const ENRICHMENT_FILE = path.join(__dirname, "enrichment-result.json");
const SEED_SNAPSHOT_FILE = path.join(__dirname, "..", "lib", "seed-data.json");

interface EnrichmentEntry {
  naverLink: string;
  category: string | null;
  signatureMenu: string | null;
}

function isCategory(value: string | null): value is Category {
  return !!value && (CATEGORIES as readonly string[]).includes(value);
}

async function main() {
  const rows = parseRestaurantWorkbook(fs.readFileSync(SOURCE_XLSX));

  let enrichment: EnrichmentEntry[] = [];
  if (fs.existsSync(ENRICHMENT_FILE)) {
    enrichment = JSON.parse(fs.readFileSync(ENRICHMENT_FILE, "utf-8"));
  }
  const enrichmentByLink = new Map(enrichment.map((e) => [e.naverLink, e]));

  const now = new Date().toISOString();
  const restaurants: Restaurant[] = rows.map((row) => {
    const enriched = enrichmentByLink.get(row.naverLink);
    const category = enriched && isCategory(enriched.category) ? enriched.category : null;
    return {
      id: randomUUID(),
      name: row.name,
      address: row.address,
      naverLink: row.naverLink,
      category,
      signatureMenu: enriched?.signatureMenu ?? null,
      lat: null,
      lng: null,
      updatedAt: now,
    };
  });

  await writeRestaurants(restaurants);
  fs.writeFileSync(SEED_SNAPSHOT_FILE, JSON.stringify(restaurants, null, 2));

  const filled = restaurants.filter((r) => r.category).length;
  console.log(`Seeded ${restaurants.length} restaurants (${filled} with category/menu filled in).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
