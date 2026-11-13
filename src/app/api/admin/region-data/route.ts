import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { db } from "@/db";
import { regionData } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { getSessionUser } from "@/lib/auth";
import { REGIONS, METRICS } from "@/lib/data/regions";

export const dynamic = "force-dynamic";

const VALID_METRICS = [...METRICS.map((m) => m.key), "risks"];

async function requireAdmin() {
  const user = await getSessionUser();
  if (!user || user.role !== "admin") return null;
  return user;
}

export async function GET() {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: "Ruxsat yo‘q" }, { status: 403 });
  const rows = await db.select().from(regionData);
  return NextResponse.json({ rows });
}

export async function POST(req: Request) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: "Ruxsat yo‘q" }, { status: 403 });
  const body = await req.json().catch(() => null);
  const regionKey = String(body?.regionKey ?? "");
  const metric = String(body?.metric ?? "");
  const value = String(body?.value ?? "").trim();
  const severity = Number(body?.severity ?? 1);
  const scope = body?.scope === "milliy" ? "milliy" : "hudud";
  const source = String(body?.source ?? "").trim() || "Kiritilmagan manba";
  const year = body?.year ? Number(body.year) : null;
  const isDemo = Boolean(body?.isDemo);

  if (!REGIONS.some((r) => r.key === regionKey))
    return NextResponse.json({ error: "Hudud tanlanmagan" }, { status: 400 });
  if (!VALID_METRICS.includes(metric))
    return NextResponse.json({ error: "Ko‘rsatkich tanlanmagan" }, { status: 400 });
  if (!value) return NextResponse.json({ error: "Qiymat kerak" }, { status: 400 });

  // region+metric bo'yicha mavjud qator bo'lsa yangilash (MAVLUD_EMAS = ma'lumot yo'q)
  const existing = await db
    .select()
    .from(regionData)
    .where(and(eq(regionData.regionKey, regionKey), eq(regionData.metric, metric)))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(regionData)
      .set({ value, severity: Math.min(3, Math.max(0, severity)), scope, source, year, isDemo, updatedAt: new Date() })
      .where(eq(regionData.id, existing[0].id));
    return NextResponse.json({ ok: true, id: existing[0].id });
  }

  const id = randomUUID();
  await db.insert(regionData).values({ id, regionKey, metric, value, severity, scope, source, year, isDemo });
  return NextResponse.json({ ok: true, id });
}

export async function DELETE(req: Request) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: "Ruxsat yo‘q" }, { status: 403 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id kerak" }, { status: 400 });
  await db.delete(regionData).where(eq(regionData.id, id));
  return NextResponse.json({ ok: true });
}
