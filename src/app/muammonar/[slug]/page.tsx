import Link from "next/link";
import { notFound } from "next/navigation";
import { PROBLEMS, getProblem } from "@/lib/data/problems";
import { SOLUTIONS } from "@/lib/data/solutions";
import { Icon } from "@/components/Icons";
import { Reveal, Badge, SourceTag, CTA } from "@/components/ui";

export function generateStaticParams() {
  return PROBLEMS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProblem(slug);
  return { title: p ? p.title : "Muammo topilmadi" };
}

export default async function ProblemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProblem(slug);
  if (!p) notFound();

  const idx = PROBLEMS.findIndex((x) => x.slug === p.slug);
  const prev = PROBLEMS[(idx - 1 + PROBLEMS.length) % PROBLEMS.length];
  const next = PROBLEMS[(idx + 1) % PROBLEMS.length];
  const solutions = SOLUTIONS.filter((s) => p.solutionSlugs.includes(s.slug));

  return (
    <main>
      <div
        className="border-b border-line"
        style={{ background: `linear-gradient(120deg, ${p.accent}14, transparent 55%)` }}
      >
        <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
          <Link href="/muammonar" className="mb-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-emerald">
            <Icon name="arrow" className="h-4 w-4 rotate-180" /> Barcha muammonar
          </Link>
          <div className="flex items-start gap-4">
            <span
              className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl sm:flex"
              style={{ background: `${p.accent}1a`, color: p.accent }}
            >
              <Icon name={p.icon} className="h-8 w-8" />
            </span>
            <div>
              <h1 className="font-display text-3xl font-bold leading-tight md:text-5xl">{p.title}</h1>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink/70 dark:text-soft/70">{p.short}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10">
        {/* STAT */}
        <Reveal>
          <div className="grid gap-3 sm:grid-cols-3">
            {p.stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-line bg-white/70 p-4 dark:border-linedark dark:bg-ink2">
                <div className="font-display text-2xl font-bold text-emerald-deep dark:text-emerald">{s.value}</div>
                <div className="mt-1 text-[12.5px] font-semibold leading-snug text-ink/70 dark:text-soft/70">{s.label}</div>
                <div className="mt-2">
                  <SourceTag label={s.source + (s.year ? `, ${s.year}` : "")} />
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div>
            <Reveal>
              <h2 className="font-display text-2xl font-bold">Ilmiy izoh</h2>
              {p.science.map((para, i) => (
                <p key={i} className="mt-4 text-[14.5px] leading-relaxed text-ink/75 dark:text-soft/75">
                  {para}
                </p>
              ))}
            </Reveal>

            <Reveal>
              <h2 className="mt-10 font-display text-2xl font-bold">Sabablari</h2>
              <ul className="mt-4 grid gap-2.5">
                {p.causes.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 rounded-lg border border-line bg-white/60 p-3 text-[13.5px] font-semibold dark:border-linedark dark:bg-ink2">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: p.accent }} />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="mt-10 font-display text-2xl font-bold">O‘zbekiston uchun ta’siri</h2>
              <ul className="mt-4 grid gap-2.5">
                {p.uzImpact.map((u) => (
                  <li key={u} className="flex items-start gap-2.5 text-[13.5px] font-semibold leading-relaxed">
                    <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
                    {u}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <div className="rounded-xl border border-line bg-beige/60 p-5 dark:border-linedark dark:bg-ink2">
                <h3 className="font-display text-lg font-bold">Eng ko‘p zarar ko‘rayotgan sohalar</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.sectors.map((s) => (
                    <Badge key={s} tone="neutral">{s}</Badge>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <div className="mt-4 rounded-xl border border-line p-5 dark:border-linedark">
                <h3 className="font-display text-lg font-bold">Foydalanilgan manbalar</h3>
                <ul className="mt-3 grid gap-2.5">
                  {p.sources.map((s) => (
                    <li key={s.url}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-[13px] font-bold text-emerald hover:underline"
                      >
                        {s.name} <Icon name="external" className="h-3.5 w-3.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-4 rounded-xl bg-forest p-5 text-soft">
                <h3 className="font-display text-lg font-bold">Nima qilish mumkin?</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-soft/70">
                  Bu muammo bo‘yicha platformada {solutions.length} ta amaliy yechim ishlangan.
                </p>
                <div className="mt-4">
                  <CTA href="/yechimlar" variant="primary">Yechimlarni ko‘rish</CTA>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* SOLUTIONS */}
        <Reveal>
          <h2 className="mt-12 font-display text-2xl font-bold">Amaliy yechimlar</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {solutions.map((s) => (
              <Link
                key={s.slug}
                href={`/yechimlar#${s.slug}`}
                className="group rounded-xl border border-line bg-white/70 p-4 transition-colors hover:border-emerald/60 dark:border-linedark dark:bg-ink2"
              >
                <div className="text-[14px] font-bold group-hover:text-emerald">{s.title}</div>
                <div className="mt-1.5 text-[12.5px] leading-relaxed text-ink/60 dark:text-soft/60">{s.how[0]}</div>
              </Link>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 dark:border-linedark">
          <Link href={`/muammonar/${prev.slug}`} className="text-[13px] font-bold text-emerald hover:underline">
            ← {prev.title}
          </Link>
          <Link href={`/muammonar/${next.slug}`} className="text-[13px] font-bold text-emerald hover:underline">
            {next.title} →
          </Link>
        </div>
      </div>
    </main>
  );
}
