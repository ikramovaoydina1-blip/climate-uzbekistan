import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { projects, projectSupports, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Icon } from "@/components/Icons";
import { Badge, CTA } from "@/components/ui";
import { ProjectActions } from "./actions-client";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = await db.select({ title: projects.title }).from(projects).where(eq(projects.id, id)).limit(1);
  return { title: rows[0]?.title ?? "Loyiha topilmadi" };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  const p = rows[0];
  if (!p) notFound();

  const supporters = await db
    .select({ name: users.name, role: projectSupports.role })
    .from(projectSupports)
    .innerJoin(users, eq(projectSupports.userId, users.id))
    .where(eq(projectSupports.projectId, id));

  return (
    <main>
      <div className="border-b border-line bg-beige/40 dark:border-linedark dark:bg-ink2/60">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <Link href="/loyihalar" className="mb-5 inline-flex items-center gap-1.5 text-[13px] font-bold text-emerald">
            <Icon name="arrow" className="h-4 w-4 rotate-180" /> Barcha loyihalar
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="blue">{p.category}</Badge>
            {p.isDemo && <Badge tone="demo">Demo ma’lumot</Badge>}
            <Badge tone={p.status === "approved" ? "ok" : "warn"}>
              {p.status === "approved" ? "E’lon qilindi" : p.status === "pending" ? "Tekshirilmoqda" : "Rad etildi"}
            </Badge>
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">{p.title}</h1>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-semibold text-ink/60 dark:text-soft/60">
            <span className="flex items-center gap-1.5"><Icon name="users" className="h-4 w-4 text-emerald" /> {p.orgName}</span>
            <span className="flex items-center gap-1.5"><Icon name="pin" className="h-4 w-4 text-emerald" /> {p.region}</span>
            <span className="flex items-center gap-1.5"><Icon name="edit" className="h-4 w-4 text-emerald" /> {p.authorName}</span>
            <span className="flex items-center gap-1.5"><Icon name="chart" className="h-4 w-4 text-emerald" /> {new Date(p.createdAt).toLocaleDateString("uz-UZ")}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div>
            <h2 className="font-display text-xl font-bold">Loyiha tavsifi</h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink/75 dark:text-soft/75">{p.description}</p>

            <h2 className="mt-8 font-display text-xl font-bold">Jamoada</h2>
            <div className="mt-3 grid gap-2">
              <div className="flex items-center gap-3 rounded-lg border border-line bg-white/70 p-3 dark:border-linedark dark:bg-ink2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald text-[13px] font-bold text-soft">
                  {p.authorName.slice(0, 1)}
                </span>
                <div>
                  <div className="text-[13.5px] font-bold">{p.authorName}</div>
                  <div className="text-[11.5px] text-ink/50 dark:text-soft/50">Tashabbuskori</div>
                </div>
                <Badge tone="ok" className="ml-auto">Tashabbuskor</Badge>
              </div>
              {supporters.map((s) => (
                <div key={s.name} className="flex items-center gap-3 rounded-lg border border-line bg-white/70 p-3 dark:border-linedark dark:bg-ink2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-climate text-[13px] font-bold text-soft">
                    {s.name.slice(0, 1)}
                  </span>
                  <div>
                    <div className="text-[13.5px] font-bold">{s.name}</div>
                    <div className="text-[11.5px] text-ink/50 dark:text-soft/50">Ishtirokchi</div>
                  </div>
                  <Badge tone="blue" className="ml-auto">{s.role === "partner" ? "Hamkor" : "Ishtirokchi"}</Badge>
                </div>
              ))}
              {supporters.length === 0 && (
                <p className="text-[13px] font-semibold text-ink/45 dark:text-soft/45">Hali ishtirokchi yo‘q — birinchi bo‘lib qo‘shiling!</p>
              )}
            </div>
          </div>

          <div>
            <div className="rounded-xl border border-line bg-white/70 p-5 dark:border-linedark dark:bg-ink2">
              <h3 className="font-display text-lg font-bold">Hamkor bo‘lish</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink/60 dark:text-soft/60">
                Loyiha jamoasiga qo‘shiling yoki qo‘llab-quvvatlash bilan yordam bering. Natijalar loyiha
                tashabbuskorlari tomonidan platformada taqdim etiladi.
              </p>
              <ProjectActions projectId={p.id} initialLikes={p.likes} isOwner={p.ownerId !== null} />
            </div>

            <div className="mt-4 rounded-xl bg-forest p-5 text-soft">
              <h3 className="font-display text-lg font-bold">O‘z loyihangiz bormi?</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-soft/70">
                G‘oyangizni joylashtiring, jamoa biriktiring va natijalaringizni taqdim eting.
              </p>
              <div className="mt-4">
                <CTA href="/loyihalar/now" variant="primary">Loyiha joylashtirish</CTA>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
