import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq, or } from "drizzle-orm";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const user = await getSessionUser();
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const all = searchParams.get("all") === "1"; // faqat admin

  let rows;
  if (all) {
    rows = await db.select().from(projects).orderBy(projects.createdAt);
  } else if (user && status === "own") {
    rows = await db
      .select()
      .from(projects)
      .where(or(eq(projects.status, "approved"), eq(projects.ownerId, user.id)))
      .orderBy(projects.createdAt);
  } else {
    rows = await db
      .select()
      .from(projects)
      .where(eq(projects.status, "approved"))
      .orderBy(projects.createdAt);
  }
  return NextResponse.json({ projects: rows });
}

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Loyiha joylash uchun kirish kerak" }, { status: 401 });
  const body = await req.json().catch(() => null);
  const title = String(body?.title ?? "").trim();
  const category = String(body?.category ?? "").trim();
  const region = String(body?.region ?? "").trim();
  const description = String(body?.description ?? "").trim();
  const orgName = String(body?.orgName ?? "").trim();
  if (title.length < 8)
    return NextResponse.json({ error: "Loyiha nomi kamida 8 belgidan iborat bo‘lsin" }, { status: 400 });
  if (!category || !region)
    return NextResponse.json({ error: "Yo‘nalish va hududni tanlang" }, { status: 400 });
  if (description.length < 40)
    return NextResponse.json({ error: "Tavsif kamida 40 belgidan iborat bo‘lsin" }, { status: 400 });

  const id = randomUUID();
  await db.insert(projects).values({
    id,
    title,
    category,
    region,
    description,
    orgName: orgName || user.name,
    authorName: user.name,
    status: "pending",
    isDemo: false,
    ownerId: user.id,
  });
  return NextResponse.json({ ok: true, id, status: "pending" });
}
