import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { db } from "@/db";
import { actions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSessionUser } from "@/lib/auth";
import { actionType } from "@/lib/actionTypes";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Kirish kerak" }, { status: 401 });
  const rows = await db
    .select()
    .from(actions)
    .where(eq(actions.userId, user.id))
    .orderBy(actions.createdAt);
  return NextResponse.json({ actions: rows });
}

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Kirish kerak" }, { status: 401 });
  const body = await req.json().catch(() => null);
  const type = String(body?.type ?? "");
  const value = Number(body?.value ?? NaN);
  const note = body?.note ? String(body.note).slice(0, 300) : null;
  const t = actionType(type);
  if (!t) return NextResponse.json({ error: "Noto‘g‘ri harakat turi" }, { status: 400 });
  if (!Number.isFinite(value) || value <= 0 || value > 1_000_000)
    return NextResponse.json({ error: "Qiymat musbat raqam bo‘lsin" }, { status: 400 });

  const id = randomUUID();
  await db.insert(actions).values({ id, userId: user.id, type, value, unit: t.unit, note });
  return NextResponse.json({ ok: true, id });
}

export async function DELETE(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Kirish kerak" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id kerak" }, { status: 400 });
  await db.delete(actions).where(eq(actions.id, id));
  return NextResponse.json({ ok: true });
}
