import { NextResponse } from "next/server";
import { readRestaurants } from "@/lib/store";

export async function GET() {
  const restaurants = await readRestaurants();
  return NextResponse.json(restaurants);
}
