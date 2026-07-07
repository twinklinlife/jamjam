import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME } from "./constants";

function getSecret(): string {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) {
    throw new Error("ADMIN_PASSWORD env var is not set");
  }
  return secret;
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function checkPassword(submitted: string): boolean {
  const secret = getSecret();
  return safeEqual(submitted, secret);
}

export function createSessionToken(): string {
  const secret = getSecret();
  const value = "ok";
  const mac = createHmac("sha256", secret).update(value).digest("hex");
  return `${value}.${mac}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const secret = getSecret();
  const [value, mac] = token.split(".");
  if (!value || !mac) return false;
  const expected = createHmac("sha256", secret).update(value).digest("hex");
  return safeEqual(mac, expected);
}

export async function isAdminRequest(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(ADMIN_COOKIE_NAME)?.value);
}
