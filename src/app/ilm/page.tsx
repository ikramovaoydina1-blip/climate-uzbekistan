import { db } from "@/db";
import { sources } from "@/db/schema";
import { RESEARCH } from "@/lib/data/research";
import { Icon } from "@/components/Icons";
import { PageHero, Reveal, Badge } from "@/components/ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "Ilmiy ma’lumotlar va tadqiqotlar" };

export default async function ResearchPage() {
  const dbSources = await db.select().from(sources).orderBy(sources.createdAt);
  const categories = [...new Set(RESEARCH.map((r) => r.category))];

  return (
    <main>
      <PageHero
        kicker="Ilmiy ma’lumotlar va tadqiqotlar"
        title="Ishonchli manbalar katalogi"
        lead="IPCC, NASA Climate, WMO, UNEP, FAO, World Bank, UNDP O‘zbekiston va boshqa tashkilotlarning ochiq hisobotlari va statistik ma’lumotlari. Har bir ma’lumot uchun manba, sana va to‘g‘ridan-to‘g‘ri havola keltiriladi."
      />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)]">
          <div>
            {categories.map((cat) => (
              <div key={cat} className="mb-8 last:mb-0">
                <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-bold">
                  <span className="h-2 w-2 rounded-full bg-emerald" />
                  {cat}
                </h2>
                <div className="grid gap-3">
                  {RESEARCH.filter((r) => r.category === cat).map((r, i) => (
                    <Reveal key={r.id} delay={Math.min(i * 40, 160)}>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group rounded-xl border border-line bg-white/70 p-5 transition-all hover:-translate-y-0.5 hover:border-emerald/60 hover:shadow-md dark:border-linedark dark:bg-ink2"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <Badge tone="blue">{r.org}</Badge>
                          <span className="text-[12px] font-bold text-ink/40 dark:text-soft/40">{r.year}-yil</span>
                        </div>
                        <h3 className="mt-2.5 font-display text-[15.5px] font-bold leading-snug group-hover:text-emerald">
                          {r.title}
                        </h3>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-ink/60 dark:text-soft/60">{r.summary}</p>
                        <div className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-bold text-emerald">
                          Manbani ochish <Icon name="external" className="h-3.5 w-3.5" />
                        </div>
                      </a>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="rounded-xl border border-line bg-beige/50 p-5 dark:border-linedark dark:bg-ink2">
              <h3 className="font-display text-lg font-bold">Platforma manbalar bazasi</h3>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink/60 dark:text-soft/60">
                Administrator tomonidan saqlanadigan tashkilotlar ro‘yxati — monitoring va AI yordamchi ularga
                tayanch qiladi.
              </p>
              <ul className="mt-4 grid gap-2">
                {dbSources.map((s) => (
                  <li key={s.id} className="rounded-lg border border-line bg-white/70 p-3 dark:border-linedark dark:bg-ink3">
                    <div className="flex items-center justify-between gap-2">
                      <a href={s.url} target="_blank" rel="noreferrer" className="text-[13px] font-bold text-emerald hover:underline">
                        {s.name}
                      </a>
                      <span className="text-[10.5px] font-bold uppercase tracking-wide text-ink/40 dark:text-soft/40">{s.category}</span>
                    </div>
                    {s.note && <div className="mt-0.5 text-[11.5px] text-ink/55 dark:text-soft/55">{s.note}</div>}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 rounded-xl border border-line p-5 dark:border-linedark">
              <Icon name="shield" className="h-5 w-5 text-emerald" />
              <h3 className="mt-2 font-display text-[15px] font-bold">Ayniy (fakt) qoidalari</h3>
              <ul className="mt-2 grid gap-1.5 text-[12.5px] leading-relaxed text-ink/65 dark:text-soft/65">
                <li>• Har bir statistika manba va sana bilan birga keltiriladi</li>
                <li>• Manbasi bo‘lmagan ma’lumot «Ma’lumot mavjud emas» deb ko‘rsatiladi</li>
                <li>• Taxminiy hisoblar (kalkulyator) alohida belgilanadi</li>
                <li>• Demo ma’lumotlar «Demo» belgisi bilan ajratiladi</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
