import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { FEEDBACK_MAX_LENGTH } from "@/lib/constants";
import { readFeedback, writeFeedback } from "@/lib/store";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { text?: unknown };
  const text = typeof body.text === "string" ? body.text.trim() : "";

  if (!text) {
    return NextResponse.json({ error: "내용을 입력해주세요." }, { status: 400 });
  }
  if (text.length > FEEDBACK_MAX_LENGTH) {
    return NextResponse.json(
      { error: `${FEEDBACK_MAX_LENGTH}자 이내로 작성해주세요.` },
      { status: 400 }
    );
  }

  const feedback = await readFeedback();
  feedback.push({ id: randomUUID(), text, createdAt: new Date().toISOString() });
  await writeFeedback(feedback);

  return NextResponse.json({ ok: true });
}
