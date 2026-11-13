"use client";

import { useEffect, useMemo, useState } from "react";
import { SOLUTIONS, DIRECTION_LABELS, type Solution } from "@/lib/data/solutions";
import { getProblem } from "@/lib/data/problems";
import { Icon } from "@/components/Icons";
import { PageHero, Badge, Reveal, SourceTag } from "@/components/ui";

const DIRS = Object.keys(DIRECTION_LABELS) as Solution["direction"][];

const dirIcons: Record<string, string> = {
  suv: "droplet",
  energiya: "sun",
  qishloq: "wheat",
  shahar: "globe",
};

function SolutionCard({ s, delay }: { s: Solution; delay: number }) {
  const [open, setOpen] = useState(false);
  const problem = getProblem(s.solvesSlugs[0]);
  return (
    <Reveal delay={delay}>
      <article
        id={s.slug}
        className="scroll-mt-24 rounded-xl border border-line bg-white/70 p-5 transition-colors hover:border-emerald/50 dark:border-linedark dark:bg-ink2"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald/10 text-emerald">
              <Icon name={dirIcons[s.direction]} className="h-5 w-5" />
            </span>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-climate">
                {DIRECTION_LABELS[s.direction]}
              </div>
              <h3 className="font-display text-lg font-bold leading-snug">{s.title}</h3>
            </div>
          </div>
          <button
            onClick={() => setOpen(!open)}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
              open ? "border-emerald bg-emerald text-soft" : "border-line text-ink/50 hover:border-emerald dark:border-linedark dark:text-soft/50"
            }`}
            aria-label="Batafsil"
          >
            <Icon name={open ? "x" : "plus"} className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge tone="ok">
            <Icon name="check" className="h-3 w-3" /> Hal qiladi: {s.solves}
          </Badge>
          {s.source && <SourceTag label={s.source} />}
        </div>

        <div className="mt-4 grid gap-3 text-[13px] leading-relaxed text-ink/70 dark:text-soft/70">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/45 dark:text-soft/45">Qanday ishlashi</div>
            {s.how.map((h, i) => (
              <p key={i} className="mt-1.5">{h}</p>
            ))}
          </div>
          {open && (
            <div className="grid gap-3 rounded-lg bg-beige/60 p-4 dark:bg-ink3 sm:grid-cols-2">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/45 dark:text-soft/45">Kimlar amalga oshirishi mumkin</div>
                <p className="mt-1.5">{s.who}</p>
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/45 dark:text-soft/45">Kerakli resurslar</div>
                <ul className="mt-1.5 grid gap-1">
                  {s.resources.map((r) => (
                    <li key={r} className="flex items-start gap-1.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-climate" /> {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-deep dark:text-emerald">Kutilayotgan ekologik foyda</div>
                <ul className="mt-1.5 grid gap-1">
                  {s.benefit.map((b) => (
                    <li key={b} className="flex items-start gap-1.5">
                      <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-danger">Amalgashtirishdagi cheklovlar</div>
                <ul className="mt-1.5 grid gap-1">
                  {s.limits.map((l) => (
                    <li key={l} className="flex items-start gap-1.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-danger" /> {l}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {problem && (
          <a href={`/muammonar/${problem.slug}`} className="mt-4 inline-flex items-center gap-1 text-[12.5px] font-bold text-emerald hover:underline">
            Muammo tahlili: {problem.title} <Icon name="arrow" className="h-3.5 w-3.5" />
          </a>
        )}
      </article>
    </Reveal>
  );
}

export default function SolutionsPage() {
  const [dir, setDir] = useState<Solution["direction"] | "all">("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const d = params.get("yo'nalish");
    if (d && DIRS.includes(d as Solution["direction"])) setDir(d as Solution["direction"]);
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return SOLUTIONS.filter(
      (s) =>
        (dir === "all" || s.direction === dir) &&
        (query === "" ||
          s.title.toLowerCase().includes(query) ||
          s.solves.toLowerCase().includes(query) ||
          s.how.join(" ").toLowerCase().includes(query))
    );
  }, [dir, q]);

  return (
    <main>
      <PageHero
        kicker="Yechimlar laboratoriyasi"
        title="Har bir muammo uchun amaliy yechimlar"
        lead="Suv resurslari, energiya, qishloq xo‘jaligi va shahar ekologiyasi yo‘nalishlarida ishlangan yechimlar katalogi. Har bir yechim: qanday ishlaydi, kimlar amalga oshirishi mumkin, kerakli resurslar, kutilayotgan ekologik foyda va cheklovlar."
      />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setDir("all")}
            className={`rounded-full border px-4 py-2 text-[13px] font-bold transition-colors ${
              dir === "all" ? "border-emerald bg-emerald text-soft" : "border-line text-ink/60 hover:border-emerald hover:text-emerald dark:border-linedark dark:text-soft/60"
            }`}
          >
            Barchasi ({SOLUTIONS.length})
          </button>
          {DIRS.map((d) => (
            <button
              key={d}
              onClick={() => setDir(d)}
              className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-[13px] font-bold transition-colors ${
                dir === d ? "border-emerald bg-emerald text-soft" : "border-line text-ink/60 hover:border-emerald hover:text-emerald dark:border-linedark dark:text-soft/60"
              }`}
            >
              <Icon name={dirIcons[d]} className="h-4 w-4" />
              {DIRECTION_LABELS[d]} ({SOLUTIONS.filter((s) => s.direction === d).length})
            </button>
          ))}
          <div className="relative ml-auto w-full max-w-xs">
            <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40 dark:text-soft/40" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Yechim qidirish…"
              className="w-full rounded-lg border border-line bg-white py-2.5 pl-9 pr-3 text-[13px] font-medium outline-none transition-colors focus:border-emerald dark:border-linedark dark:bg-ink3"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-line p-10 text-center text-sm font-semibold text-ink/50 dark:border-linedark dark:text-soft/50">
            Qidiruv bo‘yicha yechim topilmadi. Boshqa so‘z bilan urinib ko‘ring.
          </div>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {filtered.map((s, i) => (
              <SolutionCard key={s.slug} s={s} delay={Math.min(i * 40, 200)} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
