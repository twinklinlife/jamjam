import { randomUUID } from "node:crypto";
import type { RawRestaurantRow, Restaurant } from "./types";

function normalizeName(name: string): string {
  return name.trim().replace(/\s+/g, "");
}

export interface MergeSummary {
  added: number;
  removed: number;
  kept: number;
}

export interface MergeResult {
  list: Restaurant[];
  summary: MergeSummary;
}

export function mergeRestaurants(
  existing: Restaurant[],
  incoming: RawRestaurantRow[]
): MergeResult {
  const byLink = new Map(existing.map((r) => [r.naverLink, r]));
  const byName = new Map(existing.map((r) => [normalizeName(r.name), r]));

  const now = new Date().toISOString();
  const list: Restaurant[] = [];
  let added = 0;
  let kept = 0;

  for (const row of incoming) {
    const match = byLink.get(row.naverLink) ?? byName.get(normalizeName(row.name));

    if (match) {
      kept++;
      list.push({
        ...match,
        name: row.name,
        address: row.address,
        naverLink: row.naverLink,
      });
    } else {
      added++;
      list.push({
        id: randomUUID(),
        name: row.name,
        address: row.address,
        naverLink: row.naverLink,
        category: null,
        signatureMenu: null,
        lat: null,
        lng: null,
        updatedAt: now,
      });
    }
  }

  const removed = existing.length - kept;

  return { list, summary: { added, removed, kept } };
}
