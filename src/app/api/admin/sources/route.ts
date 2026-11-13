import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { db } from "@/db";
import { sources } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const user = await getSessionUser();
  if (!user || user.role !== "admin") return null;
  return user;
}

export async function GET() {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: "Ruxsat yo‘q" }, { status: 403 });
  const rows = await db.select().from(sources).orderBy(sources.createdAt);
  return NextResponse.json({ sources: rows });
}

export async function POST(req: Request) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: "Ruxsat yo‘q" }, { status: 403 });
  const body = await req.json().catch(() => null);
  const name = String(body?.name ?? "").trim();
  const url = String(body?.url ?? "").trim();
  const category = String(body?.category ?? "umumiy").trim() || "umumiy";
  const note = body?.note ? String(body.note).slice(0, 200) : null;
  if (name.length < 2) return NextResponse.json({ error: "Manba nomi kerak" }, { status: 400 });
  if (!/^https?:\/\/.+/i.test(url))
    return NextResponse.json({ error: "URL http(s) havola bo‘lsin" }, { status: 400 });
  const id = randomUUID();
  await db.insert(sources).values({ id, name, url, category, note });
  return NextResponse.json({ ok: true, id });
}

export async function DELETE(req: Request) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: "Ruxsat yo‘q" }, { status: 403 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id kerak" }, { status: 400 });
  await db.delete(sources).where(eq(sources.id, id));
  return NextResponse.json({ ok: true });
}
