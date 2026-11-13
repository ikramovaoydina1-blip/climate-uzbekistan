import Link from "next/link";
import { PROBLEMS } from "@/lib/data/problems";
import { Icon } from "@/components/Icons";
import { PageHero, Reveal, Badge } from "@/components/ui";

export const metadata = { title: "Iqlim muammolari markazi" };

export default function ProblemsPage() {
  return (
    <main>
      <PageHero
        kicker="Iqlim muammolari markazi"
        title="O‘zbekiston uchun 10 asosiy iqlim muammosi"
        lead="Har bir muammo ilmiy izoh, sabablar, mamlakatga ta’siri, eng ko‘p zarar ko‘rayotgan sohalar, ishonchli statistika va amaliy yechimlar bilan tahlil qilingan. Barcha raqamlar ochiq manbalarga havola qilinadi."
      />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-4 md:grid-cols-2">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.slug} delay={Math.min(i * 40, 200)}>
              <Link
                href={`/muammonar/${p.slug}`}
                className="group flex h-full flex-col rounded-xl border border-line bg-white/70 p-6 transition-all hover:-translate-y-0.5 hover:border-emerald/60 hover:shadow-md dark:border-linedark dark:bg-ink2 dark:hover:border-emerald"
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: `${p.accent}1a`, color: p.accent }}
                  >
                    <Icon name={p.icon} className="h-6 w-6" />
                  </span>
                  <Badge tone="neutral">{p.solutionSlugs.length} ta yechim</Badge>
                </div>
                <h2 className="mt-4 font-display text-xl font-bold leading-snug group-hover:text-emerald">{p.title}</h2>
                <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-ink/65 dark:text-soft/65">{p.short}</p>
                <div className="mt-4 flex items-center justify-between border-t border-line pt-4 dark:border-linedark">
                  <span className="text-[12px] font-semibold text-ink/50 dark:text-soft/50">
                    {p.stats.length} ta statistika · {p.sources.length} ta manba
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-emerald">
                    Tahlil <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
