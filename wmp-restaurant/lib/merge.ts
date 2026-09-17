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

function groupBy<T>(items: T[], keyFn: (item: T) => string): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const key = keyFn(item);
    const group = map.get(key);
    if (group) group.push(item);
    else map.set(key, [item]);
  }
  return map;
}

export function mergeRestaurants(
  existing: Restaurant[],
  incoming: RawRestaurantRow[]
): MergeResult {
  // Grouped (not a 1:1 Map) because the source spreadsheet can legitimately have
  // multiple rows sharing one naverLink (e.g. a kiosk/QR-order variant of the same
  // place) — each must still be paired with its own distinct existing restaurant
  // (and thus keep its own unique id) rather than all collapsing onto one.
  const byLink = groupBy(existing, (r) => r.naverLink);
  const byName = groupBy(existing, (r) => normalizeName(r.name));

  const now = new Date().toISOString();
  const list: Restaurant[] = [];
  let added = 0;
  let kept = 0;

  for (const row of incoming) {
    const match = byLink.get(row.naverLink)?.shift() ?? byName.get(normalizeName(row.name))?.shift();

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
