import { NextResponse } from "next/server";
import { db } from "@/db";
import { users, projects, actions, goals, regionData, sources } from "@/db/schema";
import { getSessionUser } from "@/lib/auth";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getSessionUser();
  if (!user || user.role !== "admin")
    return NextResponse.json({ error: "Ruxsat yo‘q" }, { status: 403 });

  const [u] = await db.select({ c: sql<number>`count(*)` }).from(users);
  const [p] = await db.select({ c: sql<number>`count(*)` }).from(projects);
  const [pend] = await db
    .select({ c: sql<number>`count(*)` })
    .from(projects)
    .where(sql`${projects.status} = 'pending'`);
  const [a] = await db.select({ c: sql<number>`count(*)` }).from(actions);
  const [g] = await db.select({ c: sql<number>`count(*)` }).from(goals);
  const [r] = await db.select({ c: sql<number>`count(*)` }).from(regionData);
  const [s] = await db.select({ c: sql<number>`count(*)` }).from(sources);

  return NextResponse.json({
    stats: {
      users: u.c,
      projects: p.c,
      pending: pend.c,
      actions: a.c,
      goals: g.c,
      regionData: r.c,
      sources: s.c,
    },
  });
}
