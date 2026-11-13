import Link from "next/link";
import { db } from "@/db";
import { users, projects, regionData, sources, actions, goals } from "@/db/schema";
import { getSessionUser } from "@/lib/auth";
import { PageHero, CTA } from "@/components/ui";
import { AdminPanel } from "./admin-client";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin panel" };

export default async function AdminPage() {
  const user = await getSessionUser();
  if (!user) {
    return (
      <main className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Kirish kerak</h1>
        <p className="mt-2 text-sm text-ink/60 dark:text-soft/60">Admin panelga kirish uchun hisobingizda turing.</p>
        <div className="mt-6 flex justify-center">
          <CTA href="/login?next=/admin" variant="primary">Kirish</CTA>
        </div>
      </main>
    );
  }
  if (user.role !== "admin") {
    return (
      <main className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Ruxsat yo‘q</h1>
        <p className="mt-2 text-sm text-ink/60 dark:text-soft/60">
          Bu bo‘lim faqat administratorlar uchun. Huquqlar server tomonida tekshiriladi.
        </p>
        <div className="mt-6 flex justify-center">
          <CTA href="/kabinet" variant="primary">Kabinetga qaytish</CTA>
        </div>
      </main>
    );
  }

  const [allUsers, allProjects, allRegionData, allSources] = await Promise.all([
    db.select().from(users).orderBy(users.createdAt),
    db.select().from(projects).orderBy(projects.createdAt),
    db.select().from(regionData),
    db.select().from(sources).orderBy(sources.createdAt),
  ]);
  const actionsCount = await db.select().from(actions);
  const goalsCount = await db.select().from(goals);

  return (
    <main>
      <PageHero
        kicker="Admin panel"
        title="Platformani boshqarish"
        lead="Iqlim statistikalarini boshqarish, ma’lumotlarni yangilash, manbalar kiritish, loyihalar moderatsiyasi va foydalanuvchi faoliyati. Barcha huquqlar server tomonida tekshiriladi."
      />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <AdminPanel
          initialData={{
            stats: {
              users: allUsers.length,
              projects: allProjects.length,
              pending: allProjects.filter((p) => p.status === "pending").length,
              actions: actionsCount.length,
              goals: goalsCount.length,
              regionData: allRegionData.length,
              sources: allSources.length,
            },
            users: allUsers.map((u) => ({ id: u.id, name: u.name, email: u.email, role: u.role })),
            projects: allProjects.map((p) => ({ ...p, createdAt: p.createdAt.toISOString() })),
            regionData: allRegionData,
            sources: allSources,
          }}
        />
        <p className="mt-8 text-[11.5px] text-ink/45 dark:text-soft/45">
          {user.name} ({user.email}) sifatida boshqaruv. <Link href="/kabinet" className="font-bold text-emerald">Kabinetga qaytish</Link>
        </p>
      </div>
    </main>
  );
}
