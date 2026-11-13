import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { db } from "@/db";
import { goals } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Kirish kerak" }, { status: 401 });
  const rows = await db.select().from(goals).where(eq(goals.userId, user.id));
  return NextResponse.json({ goals: rows });
}

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Kirish kerak" }, { status: 401 });
  const body = await req.json().catch(() => null);
  const type = String(body?.type ?? "");
  const targetValue = Number(body?.targetValue ?? NaN);
  const unit = String(body?.unit ?? "");
  if (!type || !Number.isFinite(targetValue) || targetValue <= 0 || targetValue > 1_000_000)
    return NextResponse.json({ error: "Maqsad turi va maqsad qiymati kerak" }, { status: 400 });

  const id = randomUUID();
  await db.insert(goals).values({ id, userId: user.id, type, targetValue, unit });
  return NextResponse.json({ ok: true, id });
}

export async function DELETE(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Kirish kerak" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id kerak" }, { status: 400 });
  await db.delete(goals).where(eq(goals.id, id));
  return NextResponse.json({ ok: true });
}
