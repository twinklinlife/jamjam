import { NextResponse } from "next/server";
import { checkPassword, createSessionToken } from "@/lib/auth";
import { ADMIN_COOKIE_MAX_AGE_SEC, ADMIN_COOKIE_NAME } from "@/lib/constants";

export async function POST(request: Request) {
  const { password } = (await request.json()) as { password?: unknown };

  if (typeof password !== "string" || !checkPassword(password)) {
    return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE_SEC,
  });
  return response;
}
