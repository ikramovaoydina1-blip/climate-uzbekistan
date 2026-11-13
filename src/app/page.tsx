import Link from "next/link";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { PROBLEMS } from "@/lib/data/problems";
import { SOLUTIONS, DIRECTION_LABELS } from "@/lib/data/solutions";
import { RESEARCH } from "@/lib/data/research";
import { Icon } from "@/components/Icons";
import { Reveal, Badge, CTA, SectionHead, Stat, CountUp } from "@/components/ui";
import { TempTrendChart } from "@/components/charts";

export const dynamic = "force-dynamic";

const CALCULATORS = [
  { icon: "droplet", name: "Suv iste’moli", desc: "Xonadon suv sarfini o‘lchash" },
  { icon: "calculator", name: "Elektr energiyasi", desc: "KWh, to‘lov va CO2 taxmini" },
  { icon: "cloud", name: "Uglerod izi", desc: "Yillik shaxsiy CO2 byudjeti" },
  { icon: "recycle", name: "Chiqindilar hajmi", desc: "Yillik hajm va qayta ishlash foydasi" },
  { icon: "leaf", name: "Daraxt ekish ta’siri", desc: "CO2 so‘rishining ochiq formulasi" },
];

export default async function HomePage() {
  const projRows = await db
    .select()
    .from(projects)
    .where(eq(projects.status, "approved"))
    .orderBy(desc(projects.likes))
    .limit(3);

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(700px 380px at 12% 0%, rgba(22,134,106,0.14), transparent 60%), radial-gradient(700px 420px at 95% 30%, rgba(74,157,184,0.14), transparent 60%)",
          }}
        />
        <svg
          className="pointer-events-none absolute -right-24 -top-24 h-[520px] w-[520px] opacity-[0.16] dark:opacity-[0.22]"
          viewBox="0 0 400 400"
          fill="none"
          aria-hidden="true"
        >
          {[60, 95, 130, 165, 195].map((r, i) => (
            <circle key={r} cx="200" cy="200" r={r} stroke="#16866A" strokeWidth="1.2" className="contour-line" strokeOpacity={0.9 - i * 0.14} />
          ))}
          <ellipse cx="200" cy="200" rx="195" ry="120" stroke="#4A9DB8" strokeWidth="1" className="contour-line" />
        </svg>

        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 md:py-20 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            <Reveal>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald/10 px-3.5 py-1.5 text-[12px] font-bold text-emerald-deep dark:text-emerald">
                <Icon name="globe" className="h-4 w-4" />
                EcoTech iqlim platformasi — O‘zbekiston
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="font-display text-4xl font-bold leading-[1.06] md:text-6xl">
                Iqlim o‘zgaradi.
                <br />
                <span className="text-emerald">Biz ham harakat</span>
                <br />
                qilishimiz kerak.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/70 dark:text-soft/70 md:text-lg">
                Kelajagimizni himoya qilish uchun bugun ekologik muammolarni anglaymiz, ilmiy yechimlarni
                o‘rganamiz va birgalikda harakat qilamiz.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap gap-3">
                <CTA href="/monitoring" variant="primary">
                  Iqlim holatini o‘rganish <Icon name="arrow" className="h-4 w-4" />
                </CTA>
                <CTA href="/yechimlar" variant="secondary">
                  Yechimlarni kashf etish
                </CTA>
                <CTA href="/harakatlar" variant="ghost">
                  Ekologik harakatga qo‘shilish
                </CTA>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="lg:pt-4">
            <div className="rounded-2xl border border-line bg-white/80 p-5 shadow-sm dark:border-linedark dark:bg-ink2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald">Iqlim pulsi</div>
                  <div className="font-display text-lg font-bold">Milliy harorat o‘zgarishi</div>
                </div>
                <Badge tone="danger">+1,5 °C</Badge>
              </div>
              <div className="mt-2">
                <TempTrendChart />
              </div>
              <div className="mt-2 text-[11px] text-ink/50 dark:text-soft/50">
                1961–1990 o‘rtacha darajasiga nisbatan · Manba: UNDP O‘zbekiston (2021) — taxminiy chiziq
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-4 dark:border-linedark">
                <Stat value="13" label="Kuzatiladigan hudud" />
                <Stat value="10" label="Muammo yo‘nalishi" />
                <Stat value={`${SOLUTIONS.length}`} label="Amaliy yechim" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-line bg-beige/50 dark:border-linedark dark:bg-ink2/60">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
          <Stat value={<CountUp value={1.5} decimals={1} prefix="+" suffix=" °C" />} label="Harorat o‘sishi (1960-yillardan beri)" source="UNDP, 2021" />
          <Stat value={<CountUp value={90} suffix="%" prefix="≈" />} label="Orol dengizi maydonining kamayishi" source="UNEP" />
          <Stat value={<CountUp value={2} suffix="×" prefix="≈" />} label="Markaziy Osiyo isish sur‘ati" source="IPCC AR6" />
          <Stat value={<CountUp value={145} suffix=" Mt" prefix="≈" />} label="Yillik issiqxona gazlari (CO2e)" source="UNFCCC NDC, 2020" />
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead
            kicker="Muammolar markazi"
            title="O‘zbekiston iqlim muammolari"
            lead="Har bir muammo — ilmiy izoh, sabablar, ta’sir, statistika va amaliy yechimlar bilan tahlil qilingan."
          />
          <CTA href="/muammonar" variant="secondary">
            Barcha muammonar <Icon name="arrow" className="h-4 w-4" />
          </CTA>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.slug} delay={Math.min(i * 40, 240)}>
              <Link
                href={`/muammonar/${p.slug}`}
                className="group flex h-full flex-col rounded-xl border border-line bg-white/70 p-5 transition-all hover:-translate-y-0.5 hover:border-emerald/60 hover:shadow-md dark:border-linedark dark:bg-ink2 dark:hover:border-emerald"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ background: `${p.accent}1a`, color: p.accent }}
                  >
                    <Icon name={p.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-[15px] font-bold leading-snug">{p.title}</h3>
                </div>
                <p className="mt-3 flex-1 text-[13px] leading-relaxed text-ink/65 dark:text-soft/65">{p.short}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-bold text-emerald">
                  Tahlil qilish <Icon name="arrow" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="border-y border-line bg-forest text-soft dark:border-linedark">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald">Yechimlar laboratoriyasi</div>
              <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">Muammo — yechim, yechim — harakat</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-soft/70">
                Har bir yechim: qanday ishlaydi, kim amalga oshirishi mumkin, nimalar kerak, ekologik foydasi va
                cheklovlari ochiq keltirilgan.
              </p>
            </div>
            <Link
              href="/yechimlar"
              className="inline-flex items-center gap-2 rounded-lg border border-soft/30 px-5 py-3 text-sm font-bold text-soft transition-colors hover:border-emerald hover:text-emerald"
            >
              Katalogni ochish <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(Object.keys(DIRECTION_LABELS) as (keyof typeof DIRECTION_LABELS)[]).map((d, i) => {
              const count = SOLUTIONS.filter((s) => s.direction === d).length;
              const first = SOLUTIONS.find((s) => s.direction === d)!;
              return (
                <Reveal key={d} delay={i * 60}>
                  <Link
                    href={`/yechimlar?yo'nalish=${d}`}
                    className="flex h-full flex-col rounded-xl border border-soft/15 bg-ink/40 p-5 transition-colors hover:border-emerald"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald">{DIRECTION_LABELS[d]}</span>
                      <Badge tone="blue">{count} ta</Badge>
                    </div>
                    <div className="mt-4 font-display text-lg font-bold leading-snug">{first.title}</div>
                    <div className="mt-2 text-[12.5px] leading-relaxed text-soft/60">{first.benefit[0]}</div>
                    <span className="mt-auto pt-4 text-[12px] font-bold text-emerald">Yechimlar →</span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI + CALC */}
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 lg:grid-cols-2">
        <Reveal>
          <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-emerald/30 bg-ink2 p-7 text-soft">
            <svg className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 opacity-20" viewBox="0 0 24 24" fill="none" stroke="#16866A" strokeWidth="1">
              <path d="M12 2.5 13.9 9l6.6 1.9-6.6 1.9L12 19.5l-1.9-6.7L3.5 10.9 10.1 9Z" />
            </svg>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald">
              <Icon name="spark" className="h-4 w-4" /> AI iqlim yordamchisi
            </div>
            <h3 className="mt-3 max-w-md font-display text-2xl font-bold leading-snug">
              Muammoni tanlang, hududni belgilang — ilmiy asoslangan javob oling
            </h3>
            <p className="mt-3 max-w-md text-[13.5px] leading-relaxed text-soft/65">
              Yordamchi faqat ochiq ilmiy manbalarga (IPCC, UNDP, WMO, UNEP…) tayanshadi, har bir javobda manbalar
              va cheklovlarni ko‘rsatadi. Isbotlanmagan raqamlarni kiritmaydi.
            </p>
            <div className="mt-6">
              <Link
                href="/assistant"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald px-5 py-3 text-sm font-bold text-soft transition-colors hover:bg-emerald-deep"
              >
                Suhbatni boshlash <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="flex h-full flex-col rounded-2xl border border-line bg-white/70 p-7 dark:border-linedark dark:bg-ink2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald">
              <Icon name="calculator" className="h-4 w-4" /> Eco kalkulyatorlar
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold leading-snug">O‘z ta’siringizni ochiq formulalar bilan hisoblang</h3>
            <div className="mt-5 grid flex-1 gap-2.5">
              {CALCULATORS.map((c, ci) => (
                <Link
                  key={c.name}
                  href={`/kalkulyatorlar?t=${ci}`}
                  className="group flex items-center gap-3 rounded-lg border border-line px-4 py-2.5 transition-colors hover:border-emerald dark:border-linedark"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald/10 text-emerald">
                    <Icon name={c.icon} className="h-4.5 w-4.5" />
                  </span>
                  <span>
                    <span className="block text-[13.5px] font-bold">{c.name}</span>
                    <span className="block text-[12px] text-ink/55 dark:text-soft/55">{c.desc}</span>
                  </span>
                  <Icon name="arrow" className="ml-auto h-4 w-4 text-ink/30 transition-transform group-hover:translate-x-0.5 group-hover:text-emerald dark:text-soft/30" />
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ACTIONS + PROJECTS */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-line bg-white/70 p-7 dark:border-linedark dark:bg-ink2">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-emerald">
                <Icon name="target" className="mr-1 inline h-4 w-4 align-[-2px]" />
                Green Action
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold leading-snug">Har bir kichik harakatni qayd eting, natijangizni kuzating</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-ink/65 dark:text-soft/65">
                Suv tejadingiz, LED o‘tkazdingiz, chiqindi saraladingiz — platformada ro‘yxat qiling. Shaxsiy
                maqsadlaringizni belgilang va oylik dinamikangizni grafikda kuzating. Soxta ko‘rsatkichlar yo‘q:
                faqat o‘zingiz bajargan harakatlarni qayd eting.
              </p>
              <div className="mt-6 flex gap-3">
                <CTA href="/harakatlar" variant="primary">Harakatlarim</CTA>
                <CTA href="/register" variant="secondary">Ro‘yxatdan o‘tish</CTA>
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="flex h-full flex-col rounded-2xl border border-line bg-white/70 p-7 dark:border-linedark dark:bg-ink2">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-emerald">
                  <Icon name="flask" className="mr-1 inline h-4 w-4 align-[-2px]" />
                  Eco loyihalar
                </div>
                <Link href="/loyihalar" className="text-[12px] font-bold text-emerald">Barchasi →</Link>
              </div>
              <div className="mt-4 grid flex-1 gap-3">
                {projRows.map((p) => (
                  <Link
                    key={p.id}
                    href={`/loyihalar/${p.id}`}
                    className="group flex items-start gap-3 rounded-lg border border-line p-4 transition-colors hover:border-emerald dark:border-linedark"
                  >
                    <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald" />
                    <span className="flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-[14px] font-bold group-hover:text-emerald">{p.title}</span>
                        {p.isDemo && <Badge tone="demo">Demo</Badge>}
                      </span>
                      <span className="mt-1 block text-[12px] text-ink/55 dark:text-soft/55">
                        {p.orgName} · {p.region}
                      </span>
                    </span>
                    <span className="flex items-center gap-1 text-[12px] font-bold text-ink/50 dark:text-soft/50">
                      ♥ {p.likes}
                    </span>
                  </Link>
                ))}
                {projRows.length === 0 && (
                  <p className="text-sm text-ink/50 dark:text-soft/50">Loyihalar tez orada e’lon qilinadi.</p>
                )}
              </div>
              <p className="mt-4 text-[12px] text-ink/50 dark:text-soft/50">
                Loyihalarni yoshlar, maktablar, universitetlar va tadbirkorlar joylashtiradi — moderatsiyadan o‘tgach
                e’lon qilinadi.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* RESEARCH */}
      <section className="border-t border-line bg-beige/50 dark:border-linedark dark:bg-ink2/60">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHead
              kicker="Ilmiy ma’lumotlar"
              title="Ishonchli manbalar asosida"
              lead="IPCC, NASA, WMO, UNEP, FAO, World Bank, UNDP va boshqa tashkilotlarning ochiq hisobotlari katalogi."
            />
            <CTA href="/ilm" variant="secondary">
              Katalogni ochish <Icon name="arrow" className="h-4 w-4" />
            </CTA>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RESEARCH.slice(0, 4).map((r, i) => (
              <Reveal key={r.id} delay={i * 60}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col rounded-xl border border-line bg-white/80 p-5 transition-all hover:-translate-y-0.5 hover:border-emerald/60 dark:border-linedark dark:bg-ink2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-climate">{r.org}</span>
                    <span className="text-[11px] font-bold text-ink/40 dark:text-soft/40">{r.year}</span>
                  </div>
                  <div className="mt-2 flex-1 text-[13.5px] font-bold leading-snug group-hover:text-emerald">{r.title}</div>
                  <div className="mt-3 inline-flex items-center gap-1 text-[12px] font-bold text-emerald">
                    Ochish <Icon name="external" className="h-3.5 w-3.5" />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-forest p-10 text-center text-soft md:p-14">
            <svg className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 opacity-15" viewBox="0 0 400 400" fill="none" stroke="#16866A">
              {[70, 110, 150, 190].map((r) => (
                <circle key={r} cx="200" cy="200" r={r} strokeWidth="1.2" className="contour-line" />
              ))}
            </svg>
            <h2 className="relative mx-auto max-w-2xl font-display text-3xl font-bold leading-tight md:text-4xl">
              Bugungi harakat — ertangi kelajak.
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-[15px] text-soft/70">
              Iqlim o‘zgarishini faqat muammo sifatida emas — ilm, texnologiya, innovatsiya va jamoaviy harakat
              orqali hal qilish uchun imkoniyat sifatida ko‘ramiz.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <CTA href="/harakatlar" variant="primary">Harakatga qo‘shilish</CTA>
              <a
                href="/loyihalar/now"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-soft/30 px-5 py-3 text-sm font-bold text-soft transition-colors hover:border-emerald hover:text-emerald"
              >
                Loyiha joylashtirish
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
