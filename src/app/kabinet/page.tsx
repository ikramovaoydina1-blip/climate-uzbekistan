import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/db";
import { actions, goals, projects, projectSupports } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { getSessionUser } from "@/lib/auth";
import { ACTION_TYPES } from "@/lib/actionTypes";
import { Icon } from "@/components/Icons";
import { PageHero, Badge, CTA, Card } from "@/components/ui";
import { MonthlyAreaChart } from "@/components/charts";

export const dynamic = "force-dynamic";
export const metadata = { title: "Shaxsiy kabinet" };

export default async function CabinetPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/kabinet");

  const [userActions, userGoals, myProjects, joined] = await Promise.all([
    db.select().from(actions).where(eq(actions.userId, user.id)).orderBy(actions.createdAt),
    db.select().from(goals).where(eq(goals.userId, user.id)),
    db.select().from(projects).where(eq(projects.ownerId, user.id)).orderBy(projects.createdAt),
    db
      .select({ id: projectSupports.projectId, role: projectSupports.role })
      .from(projectSupports)
      .where(eq(projectSupports.userId, user.id)),
  ]);

  const totals: Record<string, number> = {};
  userActions.forEach((a) => (totals[a.type] = (totals[a.type] ?? 0) + a.value));

  const monthly = (() => {
    const now = new Date();
    const out: { label: string; value: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      out.push({
        label: d.toLocaleDateString("uz-UZ", { month: "short" }),
        value: userActions.filter((a) => a.createdAt.toISOString().startsWith(key)).length,
      });
    }
    return out;
  })();

  return (
    <main>
      <PageHero kicker="Shaxsiy kabinet" title={`Assalomu alaykum, ${user.name.split(" ")[0]}!`} lead="Profil, ekologik maqsadlar, harakatlar tarixi, loyihalar va AI yordamchi — hammasi bir joyda." />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald font-display text-xl font-bold text-soft">
                {user.name.slice(0, 1).toUpperCase()}
              </span>
              <div>
                <div className="font-display text-lg font-bold">{user.name}</div>
                <div className="text-[12.5px] text-ink/55 dark:text-soft/55">{user.email}</div>
              </div>
              {user.role === "admin" && <Badge tone="warn" className="ml-auto"><Icon name="shield" className="h-3 w-3" /> Admin</Badge>}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2 text-center">
              <div className="rounded-lg bg-beige/60 p-3 dark:bg-ink3">
                <div className="font-display text-xl font-bold">{userActions.length}</div>
                <div className="text-[11px] font-bold text-ink/50 dark:text-soft/50">Harakat</div>
              </div>
              <div className="rounded-lg bg-beige/60 p-3 dark:bg-ink3">
                <div className="font-display text-xl font-bold">{userGoals.length}</div>
                <div className="text-[11px] font-bold text-ink/50 dark:text-soft/50">Maqsad</div>
              </div>
              <div className="rounded-lg bg-beige/60 p-3 dark:bg-ink3">
                <div className="font-display text-xl font-bold">{myProjects.length}</div>
                <div className="text-[11px] font-bold text-ink/50 dark:text-soft/50">Loyiham</div>
              </div>
              <div className="rounded-lg bg-beige/60 p-3 dark:bg-ink3">
                <div className="font-display text-xl font-bold">{joined.length}</div>
                <div className="text-[11px] font-bold text-ink/50 dark:text-soft/50">Jamoam</div>
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              <CTA href="/assistant" variant="primary" className="flex-1">
                <Icon name="spark" className="h-4 w-4" /> AI yordamchi
              </CTA>
              <CTA href="/harakatlar" variant="secondary" className="flex-1">Harakatlar</CTA>
            </div>
          </Card>

          <Card className="p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">Ekologik ko‘rsatkichlarim</h3>
              <Badge tone="blue">Barcha davr</Badge>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {ACTION_TYPES.map((a) => (
                <div key={a.type} className="rounded-lg border border-line p-3 dark:border-linedark">
                  <div className="text-[11px] font-bold uppercase tracking-wide text-ink/45 dark:text-soft/45">{a.label}</div>
                  <div className="mt-0.5 font-display text-xl font-bold text-emerald-deep dark:text-emerald">
                    {(totals[a.type] ?? 0).toLocaleString()}
                    <span className="ml-1 text-[11px] font-semibold text-ink/45 dark:text-soft/45">{a.unit}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <h4 className="text-[13px] font-bold text-ink/60 dark:text-soft/60">So‘nggi 6 oy dinamikasi</h4>
              <MonthlyAreaChart data={monthly} unit="harakat" />
            </div>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">Maqsadlarim</h3>
              <Link href="/harakatlar" className="text-[12.5px] font-bold text-emerald">Boshqarish →</Link>
            </div>
            {userGoals.length === 0 ? (
              <p className="mt-4 text-[13px] font-semibold text-ink/45 dark:text-soft/45">
                Hali maqsad belgilanmagan. Masalan: «oyiga 1500 l suv tejash».
              </p>
            ) : (
              <div className="mt-4 grid gap-3">
                {userGoals.map((g) => {
                  const done = totals[g.type] ?? 0;
                  const pct = Math.min(100, Math.round((done / g.targetValue) * 100));
                  const gt = ACTION_TYPES.find((a) => a.type === g.type);
                  return (
                    <div key={g.id}>
                      <div className="flex justify-between text-[12.5px] font-bold">
                        <span>{gt?.label ?? g.type}</span>
                        <span className="text-ink/50 dark:text-soft/50">{done.toLocaleString()} / {g.targetValue} {g.unit}</span>
                      </div>
                      <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-beige dark:bg-ink3">
                        <div className="h-full rounded-full bg-emerald" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">Mening loyihalaram</h3>
              <Link href="/loyihalar/now" className="text-[12.5px] font-bold text-emerald">Yangi loyiha →</Link>
            </div>
            {myProjects.length === 0 ? (
              <p className="mt-4 text-[13px] font-semibold text-ink/45 dark:text-soft/45">
                Hali loyiha joylashtirmagansiz. G‘oyangizni e’lon qiling va jamoa to‘pling.
              </p>
            ) : (
              <div className="mt-4 grid gap-2">
                {myProjects.map((p) => (
                  <Link key={p.id} href={`/loyihalar/${p.id}`} className="flex items-center gap-3 rounded-lg border border-line p-3 transition-colors hover:border-emerald dark:border-linedark">
                    <Badge tone={p.status === "approved" ? "ok" : p.status === "pending" ? "warn" : "danger"}>
                      {p.status === "approved" ? "E’lon qilindi" : p.status === "pending" ? "Tekshirilmoqda" : "Rad etildi"}
                    </Badge>
                    <span className="text-[13px] font-bold">{p.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </Card>
        </div>

        {user.role === "admin" && (
          <div className="mt-6 flex items-center justify-between rounded-xl border border-amber/40 bg-amber/10 p-5">
            <div className="flex items-center gap-3">
              <Icon name="shield" className="h-6 w-6 text-amber" />
              <div>
                <div className="font-display text-[15px] font-bold">Administrator huquqlari</div>
                <div className="text-[12.5px] text-ink/60 dark:text-soft/60">Statistikalar, loyihalar, foydalanuvchilar va manbalar boshqaruvi</div>
              </div>
            </div>
            <CTA href="/admin" variant="primary">Admin panel</CTA>
          </div>
        )}
      </div>
    </main>
  );
}
