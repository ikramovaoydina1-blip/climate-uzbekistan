import { NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const user = await getSessionUser();
  if (!user || user.role !== "admin") return null;
  return user;
}

export async function PATCH(req: Request) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: "Ruxsat yo‘q" }, { status: 403 });
  const body = await req.json().catch(() => null);
  const id = String(body?.id ?? "");
  const status = String(body?.status ?? "");
  if (!id || !["approved", "rejected", "pending"].includes(status))
    return NextResponse.json({ error: "id va status (approved/rejected/pending) kerak" }, { status: 400 });
  await db
    .update(projects)
    .set({ status: status as "approved" | "rejected" | "pending" })
    .where(eq(projects.id, id));
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: "Ruxsat yo‘q" }, { status: 403 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id kerak" }, { status: 400 });
  await db.delete(projects).where(eq(projects.id, id));
  return NextResponse.json({ ok: true });
}
