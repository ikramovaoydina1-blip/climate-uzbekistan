import { NextResponse } from "next/server";
import { db } from "@/db";
import { users, actions } from "@/db/schema";
import { eq, and } from "drizzle-orm";
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
  const rows = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt,
    })
    .from(users)
    .orderBy(users.createdAt);
  const counts = await db
    .select({ userId: actions.userId, c: actions.value })
    .from(actions);
  const map = new Map<string, number>();
  counts.forEach((c) => map.set(c.userId, (map.get(c.userId) ?? 0) + 1));
  return NextResponse.json({
    users: rows.map((r) => ({ ...r, actionsCount: map.get(r.id) ?? 0 })),
  });
}

export async function PATCH(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Ruxsat yo‘q" }, { status: 403 });
  const body = await req.json().catch(() => null);
  const id = String(body?.id ?? "");
  const role = String(body?.role ?? "");
  if (!id || !["admin", "user"].includes(role))
    return NextResponse.json({ error: "id va role kerak" }, { status: 400 });
  if (id === admin.id)
    return NextResponse.json({ error: "O‘z rolingizni o‘zgartira olmaysiz" }, { status: 400 });
  await db.update(users).set({ role: role as "admin" | "user" }).where(eq(users.id, id));
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Ruxsat yo‘q" }, { status: 403 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id kerak" }, { status: 400 });
  if (id === admin.id)
    return NextResponse.json({ error: "O‘zingizni o‘chira olmaysiz" }, { status: 400 });
  await db.delete(users).where(and(eq(users.id, id)));
  return NextResponse.json({ ok: true });
}
