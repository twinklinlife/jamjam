import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { readRestaurants, writeRestaurants } from "@/lib/store";

export async function POST() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const restaurants = await readRestaurants();
  const seen = new Set<string>();
  let fixed = 0;

  const next = restaurants.map((r) => {
    if (!seen.has(r.id)) {
      seen.add(r.id);
      return r;
    }
    fixed++;
    const newId = randomUUID();
    seen.add(newId);
    return { ...r, id: newId };
  });

  if (fixed > 0) {
    await writeRestaurants(next);
  }

  return NextResponse.json({ ok: true, fixed, total: next.length });
}
