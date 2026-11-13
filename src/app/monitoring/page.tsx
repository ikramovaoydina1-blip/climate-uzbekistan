import { db } from "@/db";
import { regionData } from "@/db/schema";
import { UzMap, type DbRow } from "@/components/map";
import { TempTrendChart, AralChart } from "@/components/charts";
import { PageHero, Reveal, Badge, Card } from "@/components/ui";
import { Icon } from "@/components/Icons";

export const dynamic = "force-dynamic";
export const metadata = { title: "O‘zbekiston iqlim monitoringi" };

export default async function MonitoringPage() {
  const rows = await db.select().from(regionData);
  const dbRows: DbRow[] = rows.map((r) => ({
    regionKey: r.regionKey,
    metric: r.metric as DbRow["metric"],
    value: r.value,
    severity: r.severity,
    scope: r.scope,
    source: r.source,
    year: r.year,
    isDemo: r.isDemo,
  }));

  return (
    <main>
      <PageHero
        kicker="O‘zbekiston iqlim monitoringi"
        title="13 hudud bo‘yicha interaktiv monitoring"
        lead="Xaritadan hududni tanlang va harorat, yog‘ingarchilik, suv resurslari, qurg‘oqchilik xavfi hamda havo sifati bo‘yicha ma’lumotlarni ko‘ring. Ishonchli manba bo‘lmagan ma’lumotlar o‘ylab topilmaydi — ular «Ma’lumot mavjud emas» deb ko‘rsatiladi."
      >
        <div className="mt-5 flex flex-wrap gap-2">
          <Badge tone="ok">Ma’lumotli ko‘rsatkichlar</Badge>
          <Badge tone="neutral">Cheklangan / mavjud emas</Badge>
          <Badge tone="demo">Demo ma’lumot — alohida belgilanadi</Badge>
        </div>
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <Reveal>
          <UzMap dbRows={dbRows} />
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold">Milliy harorat dinamikasi</h3>
                  <p className="text-[12.5px] text-ink/55 dark:text-soft/55">
                    1961–1990 o‘rtacha darajasiga nisbatan, °C
                  </p>
                </div>
                <Badge tone="blue">UNDP, 2021</Badge>
              </div>
              <div className="mt-4">
                <TempTrendChart />
              </div>
              <p className="mt-3 text-[11.5px] leading-relaxed text-ink/50 dark:text-soft/50">
                Chiziq milliy o‘rtacha darajadagi taxminiy tendensiyani ifodalaydi; hudud darajasidagi aniq
                harorat dinamikasi uchun milliy gidrometeorologiya ma’lumotlari asosida kengaytiriladi.
              </p>
            </Card>
          </Reveal>
          <Reveal delay={80}>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold">Orol dengizi maydoni</h3>
                  <p className="text-[12.5px] text-ink/55 dark:text-soft/55">
                    km² — 1960-yildan hozirgacha
                  </p>
                </div>
                <Badge tone="blue">UNEP / World Bank</Badge>
              </div>
              <div className="mt-4">
                <AralChart />
              </div>
              <p className="mt-3 text-[11.5px] leading-relaxed text-ink/50 dark:text-soft/50">
                2005-yildan keyingi o‘sish Shimoliy Orol (Ko‘karal to‘g‘oni) suv bilan ta’minlanishi hisobiga;
                umumiy maydon ~90% ga kamaygan.
              </p>
            </Card>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-8 flex items-start gap-3 rounded-xl border border-line bg-beige/60 p-5 dark:border-linedark dark:bg-ink2">
            <Icon name="info" className="mt-0.5 h-5 w-5 shrink-0 text-emerald" />
            <div className="text-[13px] leading-relaxed text-ink/70 dark:text-soft/70">
              <strong>Ma’lumotlar siyosati:</strong> platformada faqat ochiq ilmiy manbalarga (UNDP, IPCC, WMO, UNEP,
              FAO, WHO, World Bank, IQAir) asoslangan ko‘rsatkichlar keltiriladi. Milliy darajadagi ma’lumotlar
              «milliy» belgisi bilan, hudud ma’lumotlari «hudud» belgisi bilan ajratiladi. Ma’lumot bo‘lmagan
              ko‘rsatkichlar neytral rangda va «Ma’lumot mavjud emas» deb ko‘rsatiladi — ular hech qachon o‘ylab
              topilmaydi. Admin paneli orqali qo‘shilgan yangi ma’lumotlar manbasi bilan birga nashr etiladi.
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
