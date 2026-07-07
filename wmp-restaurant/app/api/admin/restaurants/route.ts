import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { readRestaurants, writeRestaurants } from "@/lib/store";
import { CATEGORIES, type Category } from "@/lib/types";

function isCategory(value: unknown): value is Category {
  return typeof value === "string" && (CATEGORIES as readonly string[]).includes(value);
}

export async function PATCH(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const body = await request.json();
  const { id, category, signatureMenu } = body as {
    id?: string;
    category?: string | null;
    signatureMenu?: string | null;
  };

  if (!id) {
    return NextResponse.json({ error: "id가 필요합니다." }, { status: 400 });
  }
  if (category !== null && category !== undefined && !isCategory(category)) {
    return NextResponse.json({ error: "올바르지 않은 카테고리입니다." }, { status: 400 });
  }

  const restaurants = await readRestaurants();
  const index = restaurants.findIndex((r) => r.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "식당을 찾을 수 없습니다." }, { status: 404 });
  }

  const updated = {
    ...restaurants[index],
    ...(category !== undefined ? { category } : {}),
    ...(signatureMenu !== undefined ? { signatureMenu } : {}),
    updatedAt: new Date().toISOString(),
  };
  restaurants[index] = updated;
  await writeRestaurants(restaurants);

  return NextResponse.json(updated);
}
