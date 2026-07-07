import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { mergeRestaurants } from "@/lib/merge";
import { readRestaurants, writeRestaurants } from "@/lib/store";
import { parseRestaurantWorkbook } from "@/lib/xlsx-parse";

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "파일이 필요합니다." }, { status: 400 });
  }

  const buffer = await file.arrayBuffer();
  const rows = parseRestaurantWorkbook(buffer);
  if (rows.length === 0) {
    return NextResponse.json({ error: "엑셀에서 유효한 식당 데이터를 찾지 못했습니다." }, { status: 400 });
  }

  const existing = await readRestaurants();
  const { list, summary } = mergeRestaurants(existing, rows);
  await writeRestaurants(list);

  return NextResponse.json({ ok: true, summary, total: list.length });
}
