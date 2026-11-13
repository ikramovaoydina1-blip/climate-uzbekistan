import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { db } from "@/db";
import { projects, projectSupports, users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;
  const rows = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  const project = rows[0];
  if (!project) return NextResponse.json({ error: "Loyiha topilmadi" }, { status: 404 });
  const supporters = await db
    .select({ id: projectSupports.id, name: users.name, role: projectSupports.role })
    .from(projectSupports)
    .innerJoin(users, eq(projectSupports.userId, users.id))
    .where(eq(projectSupports.projectId, id));
  return NextResponse.json({ project, supporters });
}

export async function POST(req: Request, { params }: Params) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Kirish kerak" }, { status: 401 });
  const { id } = await params;
  const body = await req.json().catch(() => null);
  const action = String(body?.action ?? "");

  const rows = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  const project = rows[0];
  if (!project) return NextResponse.json({ error: "Loyiha topilmadi" }, { status: 404 });

  if (action === "join" || action === "leave") {
    const existing = await db
      .select()
      .from(projectSupports)
      .where(and(eq(projectSupports.projectId, id), eq(projectSupports.userId, user.id)))
      .limit(1);
    if (action === "join") {
      if (existing.length === 0) {
        await db.insert(projectSupports).values({
          id: randomUUID(),
          projectId: id,
          userId: user.id,
          role: project.ownerId === user.id ? "founder" : "member",
        });
      }
      return NextResponse.json({ ok: true, joined: true });
    }
    if (existing.length > 0) await db.delete(projectSupports).where(eq(projectSupports.id, existing[0].id));
    return NextResponse.json({ ok: true, joined: false });
  }

  if (action === "like") {
    await db
      .update(projects)
      .set({ likes: project.likes + 1 })
      .where(eq(projects.id, id));
    return NextResponse.json({ ok: true, likes: project.likes + 1 });
  }

  return NextResponse.json({ error: "Noto‘g‘ri amal" }, { status: 400 });
}
