import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { readRestaurants, writeRestaurants } from "@/lib/store";
import type { Restaurant } from "@/lib/types";
import seedData from "@/lib/seed-data.json";

export async function POST() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const coordsByLink = new Map(
    (seedData as Restaurant[]).map((r) => [r.naverLink, { lat: r.lat, lng: r.lng }])
  );

  const restaurants = await readRestaurants();
  let updated = 0;
  const next = restaurants.map((r) => {
    const coords = coordsByLink.get(r.naverLink);
    if (coords && (coords.lat !== r.lat || coords.lng !== r.lng)) {
      updated++;
      return { ...r, lat: coords.lat, lng: coords.lng };
    }
    return r;
  });

  await writeRestaurants(next);

  return NextResponse.json({ ok: true, updated, total: next.length });
}
