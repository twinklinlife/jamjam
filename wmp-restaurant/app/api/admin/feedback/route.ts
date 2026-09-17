import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { readFeedback, writeFeedback } from "@/lib/store";

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }
  const feedback = await readFeedback();
  return NextResponse.json([...feedback].reverse());
}

export async function DELETE(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }
  const { id } = (await request.json().catch(() => ({}))) as { id?: string };
  if (!id) {
    return NextResponse.json({ error: "id가 필요합니다." }, { status: 400 });
  }
  const feedback = await readFeedback();
  const next = feedback.filter((f) => f.id !== id);
  await writeFeedback(next);
  return NextResponse.json({ ok: true });
}
