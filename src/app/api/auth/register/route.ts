import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword, createSession } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim().toLowerCase();
  const password = String(body?.password ?? "");

  if (name.length < 2)
    return NextResponse.json({ error: "Ism kamida 2 belgidan iborat bo‘lsin" }, { status: 400 });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return NextResponse.json({ error: "Email manzil noto‘g‘ri" }, { status: 400 });
  if (password.length < 6)
    return NextResponse.json({ error: "Parol kamida 6 belgidan iborat bo‘lsin" }, { status: 400 });

  const existing = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1);
  if (existing.length > 0)
    return NextResponse.json({ error: "Bunday email allaqachon ro‘yxatdan o‘tgan" }, { status: 409 });

  const id = randomUUID();
  await db.insert(users).values({
    id,
    name,
    email,
    passwordHash: hashPassword(password),
    role: "user",
  });
  await createSession(id);
  return NextResponse.json({ ok: true, user: { id, name, email, role: "user" } });
}
