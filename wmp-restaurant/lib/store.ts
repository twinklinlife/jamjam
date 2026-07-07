import fs from "node:fs/promises";
import path from "node:path";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { KV_KEY } from "./constants";
import type { Restaurant } from "./types";
import seedData from "./seed-data.json";

declare global {
  interface CloudflareEnv {
    RESTAURANTS_KV?: KVNamespace;
  }
}

const LOCAL_FILE = path.join(process.cwd(), ".data", "restaurants.json");

function getKV(): KVNamespace | null {
  try {
    const ctx = getCloudflareContext();
    return ctx?.env?.RESTAURANTS_KV ?? null;
  } catch {
    return null;
  }
}

export async function readRestaurants(): Promise<Restaurant[]> {
  const kv = getKV();
  if (kv) {
    const raw = await kv.get<Restaurant[]>(KV_KEY, "json");
    if (raw && raw.length > 0) return raw;
    // KV is empty (first deploy) — seed it once from the bundled snapshot.
    const fallback = seedData as Restaurant[];
    await kv.put(KV_KEY, JSON.stringify(fallback));
    return fallback;
  }
  try {
    const raw = await fs.readFile(LOCAL_FILE, "utf-8");
    return JSON.parse(raw) as Restaurant[];
  } catch {
    return [];
  }
}

export async function writeRestaurants(list: Restaurant[]): Promise<void> {
  const kv = getKV();
  if (kv) {
    await kv.put(KV_KEY, JSON.stringify(list));
    return;
  }
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(list, null, 2), "utf-8");
}
