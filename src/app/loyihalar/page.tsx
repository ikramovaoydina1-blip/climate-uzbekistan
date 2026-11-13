"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { REGIONS } from "@/lib/data/regions";
import { Icon } from "@/components/Icons";
import { PageHero, Badge, Reveal } from "@/components/ui";

const CATEGORIES = ["suv", "energiya", "qishloq", "shahar", "targ'ibot", "tabiat", "texnologiya", "ilmiy"];
const CAT_LABELS: Record<string, string> = {
  suv: "Suv",
  energiya: "Energiya",
  qishloq: "Qishloq xo‘jaligi",
  shahar: "Shahar",
  "targ'ibot": "Targ‘ibot",
  tabiat: "Tabiat",
  texnologiya: "Texnologiya",
  ilmiy: "Ilmiy",
};

type Proj = {
  id: string;
  title: string;
  category: string;
  region: string;
  description: string;
  orgName: string;
  authorName: string;
  status: string;
  isDemo: boolean;
  ownerId: string | null;
  likes: number;
  createdAt: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Proj[]>([]);
  const [me, setMe] = useState<{ id: string; name: string } | null>(null);
  const [cat, setCat] = useState("all");
  const [region, setRegion] = useState("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"new" | "likes">("new");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/projects?status=own")
      .then((r) => (r.ok ? r.json() : { projects: [] }))
      .then((d) => setProjects(d.projects ?? []))
      .finally(() => setLoaded(true));
    fetch("/api/auth/me").then((r) => (r.ok ? r.json() : { user: null })).then((d) => setMe(d.user));
  }, []);

  const filtered = useMemo(() => {
    let list = projects.filter(
      (p) =>
        p.status === "approved" &&
        (cat === "all" || p.category === cat) &&
        (region === "all" || p.region === region) &&
        (q.trim() === "" ||
          p.title.toLowerCase().includes(q.toLowerCase()) ||
          p.description.toLowerCase().includes(q.toLowerCase()) ||
          p.orgName.toLowerCase().includes(q.toLowerCase()))
    );
    list = [...list].sort((a, b) =>
      sort === "likes" ? b.likes - a.likes : +new Date(b.createdAt) - +new Date(a.createdAt)
    );
    return list;
  }, [projects, cat, region, q, sort]);

  const mine = useMemo(
    () => projects.filter((p) => me && p.ownerId === me.id),
    [projects, me]
  );

  if (!loaded) return null;

  return (
    <main>
      <PageHero
        kicker="Eco loyihalar"
        title="Jamoaviy ekologik loyihalar maydoni"
        lead="Yoshlar, talabalar, maktablar, universitetlar, tadbirkorlar va ekologik tashkilotlar o‘z loyihalarini joylashtiradi, jamoa va hamkor izlaydi. Yangi loyihalar moderatsiyadan o‘tgach e’lon qilinadi."
      >
        <div className="mt-6">
          <Link
            href="/loyihalar/now"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald px-5 py-3 text-sm font-bold text-soft transition-colors hover:bg-emerald-deep"
          >
            <Icon name="plus" className="h-4 w-4" /> Loyiha joylashtirish
          </Link>
        </div>
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 py-10">
        {mine.length > 0 && (
          <div className="mb-8 rounded-xl border border-line bg-beige/50 p-5 dark:border-linedark dark:bg-ink2">
            <h3 className="text-[13px] font-bold uppercase tracking-[0.14em] text-ink/55 dark:text-soft/55">
              Mening loyihalariam ({mine.length})
            </h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {mine.map((p) => (
                <Link key={p.id} href={`/loyihalar/${p.id}`} className="flex items-center gap-3 rounded-lg border border-line bg-white/70 p-3 transition-colors hover:border-emerald dark:border-linedark dark:bg-ink3">
                  <Badge tone={p.status === "approved" ? "ok" : p.status === "pending" ? "warn" : "danger"}>
                    {p.status === "approved" ? "E’lon qilindi" : p.status === "pending" ? "Tekshirilmoqda" : "Rad etildi"}
                  </Badge>
                  <span className="text-[13px] font-bold">{p.title}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setCat("all")}
            className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-bold transition-colors ${cat === "all" ? "border-emerald bg-emerald text-soft" : "border-line text-ink/60 hover:border-emerald dark:border-linedark dark:text-soft/60"}`}
          >
            Barchasi
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-bold transition-colors ${cat === c ? "border-emerald bg-emerald text-soft" : "border-line text-ink/60 hover:border-emerald dark:border-linedark dark:text-soft/60"}`}
            >
              {CAT_LABELS[c]}
            </button>
          ))}
          <select value={region} onChange={(e) => setRegion(e.target.value)} className="ml-auto rounded-lg border border-line bg-white px-3 py-2 text-[12.5px] font-bold outline-none focus:border-emerald dark:border-linedark dark:bg-ink3">
            <option value="all">Barcha hududlar</option>
            <option value="Butun mamlakat">Butun mamlakat</option>
            {REGIONS.map((r) => (
              <option key={r.key} value={r.name}>{r.short}</option>
            ))}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value as "new" | "likes")} className="rounded-lg border border-line bg-white px-3 py-2 text-[12.5px] font-bold outline-none focus:border-emerald dark:border-linedark dark:bg-ink3">
            <option value="new">Eng yangi</option>
            <option value="likes">Eng ko‘p qo‘llab-quvvatlangan</option>
          </select>
          <div className="relative w-full sm:w-56">
            <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40 dark:text-soft/40" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Loyiha qidirish…" className="w-full rounded-lg border border-line bg-white py-2 pl-9 pr-3 text-[13px] font-medium outline-none focus:border-emerald dark:border-linedark dark:bg-ink3" />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-line p-12 text-center dark:border-linedark">
            <Icon name="flask" className="mx-auto h-8 w-8 text-ink/30 dark:text-soft/30" />
            <p className="mt-3 text-sm font-bold text-ink/50 dark:text-soft/50">Bu filtr bo‘yicha loyiha topilmadi</p>
            <p className="mt-1 text-[13px] text-ink/40 dark:text-soft/40">Filtrni o‘zgartiring yoki o‘z loyihangizni joylashtiring.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={Math.min(i * 40, 200)}>
                <Link href={`/loyihalar/${p.id}`} className="group flex h-full flex-col rounded-xl border border-line bg-white/70 p-5 transition-all hover:-translate-y-0.5 hover:border-emerald/60 hover:shadow-md dark:border-linedark dark:bg-ink2">
                  <div className="flex items-center justify-between gap-2">
                    <Badge tone="blue">{CAT_LABELS[p.category] ?? p.category}</Badge>
                    {p.isDemo && <Badge tone="demo">Demo</Badge>}
                  </div>
                  <h3 className="mt-3 font-display text-[15.5px] font-bold leading-snug group-hover:text-emerald">{p.title}</h3>
                  <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-ink/60 dark:text-soft/60">
                    {p.description.slice(0, 130)}{p.description.length > 130 ? "…" : ""}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[12px] font-semibold text-ink/55 dark:border-linedark dark:text-soft/55">
                    <span className="flex items-center gap-1.5">
                      <Icon name="pin" className="h-3.5 w-3.5" /> {p.region}
                    </span>
                    <span className="flex items-center gap-1 font-bold">
                      <Icon name="users" className="h-3.5 w-3.5" /> {p.orgName}
                    </span>
                    <span className="font-bold text-emerald">♥ {p.likes}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
