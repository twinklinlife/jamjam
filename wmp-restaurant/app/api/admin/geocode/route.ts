import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { readRestaurants, writeRestaurants } from "@/lib/store";
import type { Restaurant } from "@/lib/types";
import seedData from "@/lib/seed-data.json";

export async function POST() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const bundledByLink = new Map((seedData as Restaurant[]).map((r) => [r.naverLink, r]));

  const restaurants = await readRestaurants();
  let updated = 0;
  const next = restaurants.map((r) => {
    const bundled = bundledByLink.get(r.naverLink);
    if (!bundled) return r;

    const patch: Partial<Restaurant> = {};
    if (bundled.lat !== r.lat || bundled.lng !== r.lng) {
      patch.lat = bundled.lat;
      patch.lng = bundled.lng;
    }
    // Only fill category/signatureMenu when currently blank, so this never clobbers a manual admin edit.
    if (r.category === null && bundled.category !== null) patch.category = bundled.category;
    if (r.signatureMenu === null && bundled.signatureMenu !== null) patch.signatureMenu = bundled.signatureMenu;

    if (Object.keys(patch).length === 0) return r;
    updated++;
    return { ...r, ...patch };
  });

  await writeRestaurants(next);

  return NextResponse.json({ ok: true, updated, total: next.length });
}
