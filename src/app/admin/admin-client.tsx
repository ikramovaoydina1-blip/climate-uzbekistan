"use client";

import { useState } from "react";
import { REGIONS, METRICS } from "@/lib/data/regions";
import { Icon } from "@/components/Icons";
import { Badge, Card, inputCls } from "@/components/ui";

type Proj = {
  id: string;
  title: string;
  category: string;
  region: string;
  orgName: string;
  authorName: string;
  status: string;
  isDemo: boolean;
  likes: number;
  createdAt: string;
};
type U = { id: string; name: string; email: string; role: string };
type RD = {
  id: string;
  regionKey: string;
  metric: string;
  value: string;
  severity: number;
  scope: string;
  source: string;
  year: number | null;
  isDemo: boolean;
};
type SRC = { id: string; name: string; url: string; category: string; note: string | null };

type Init = {
  stats: { users: number; projects: number; pending: number; actions: number; goals: number; regionData: number; sources: number };
  users: U[];
  projects: Proj[];
  regionData: RD[];
  sources: SRC[];
};

const TABS = [
  { id: "stats", label: "Ko‘rsatkichlar", icon: "chart" },
  { id: "projects", label: "Loyihalar", icon: "flask" },
  { id: "users", label: "Foydalanuvchilar", icon: "users" },
  { id: "data", label: "Hudud ma’lumotlari", icon: "pin" },
  { id: "sources", label: "Manbalar", icon: "book" },
];

async function api(path: string, opts?: RequestInit) {
  const res = await fetch(path, { headers: { "Content-Type": "application/json" }, ...opts });
  const d = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(d.error || "Xatolik");
  return d;
}

export function AdminPanel({ initialData }: { initialData: Init }) {
  const [tab, setTab] = useState("stats");
  const [data, setData] = useState<Init>(initialData);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const flash = (m: string) => {
    setMsg(m);
    setErr("");
    setTimeout(() => setMsg(""), 3000);
  };
  const fail = (e: unknown) => {
    setErr(e instanceof Error ? e.message : "Xatolik");
    setMsg("");
  };

  const setProjectStatus = async (id: string, status: string) => {
    try {
      await api("/api/admin/projects", { method: "PATCH", body: JSON.stringify({ id, status }) });
      setData((d) => ({ ...d, projects: d.projects.map((p) => (p.id === id ? { ...p, status } : p)), stats: { ...d.stats, pending: d.projects.filter((p) => p.status === "pending").map((p) => p.id).includes(id) ? d.stats.pending - 1 : d.stats.pending + (status === "pending" ? 1 : 0) } }));
      flash("Loyiha statusi yangilandi");
    } catch (e) {
      fail(e);
    }
  };

  const delProject = async (id: string) => {
    if (!confirm("Loyihani o‘chirishni tasdiqlaysizmi?")) return;
    try {
      await api(`/api/admin/projects?id=${id}`, { method: "DELETE" });
      setData((d) => ({ ...d, projects: d.projects.filter((p) => p.id !== id), stats: { ...d.stats, projects: d.stats.projects - 1 } }));
      flash("Loyiha o‘chirildi");
    } catch (e) {
      fail(e);
    }
  };

  const setRole = async (id: string, role: string) => {
    try {
      await api("/api/admin/users", { method: "PATCH", body: JSON.stringify({ id, role }) });
      setData((d) => ({ ...d, users: d.users.map((u) => (u.id === id ? { ...u, role } : u)) }));
      flash("Rol yangilandi");
    } catch (e) {
      fail(e);
    }
  };

  const delUser = async (id: string) => {
    if (!confirm("Foydalanuvchini va uning ma’lumotlarini o‘chirishni tasdiqlaysizmi?")) return;
    try {
      await api(`/api/admin/users?id=${id}`, { method: "DELETE" });
      setData((d) => ({ ...d, users: d.users.filter((u) => u.id !== id), stats: { ...d.stats, users: d.stats.users - 1 } }));
      flash("Foydalanuvchi o‘chirildi");
    } catch (e) {
      fail(e);
    }
  };

  const saveRegionData = async (form: RD & { id?: string }) => {
    try {
      await api("/api/admin/region-data", {
        method: "POST",
        body: JSON.stringify(form),
      });
      const rows = await api("/api/admin/region-data");
      setData((d) => ({ ...d, regionData: rows.rows as RD[] }));
      flash("Hudud ma’lumoti saqlandi");
    } catch (e) {
      fail(e);
    }
  };

  const delRegionData = async (id: string) => {
    if (!confirm("Qatorni o‘chirishni tasdiqlaysizmi?")) return;
    try {
      await api(`/api/admin/region-data?id=${id}`, { method: "DELETE" });
      setData((d) => ({ ...d, regionData: d.regionData.filter((r) => r.id !== id) }));
      flash("Qator o‘chirildi");
    } catch (e) {
      fail(e);
    }
  };

  const addSource = async (form: { name: string; url: string; category: string; note: string }) => {
    try {
      await api("/api/admin/sources", { method: "POST", body: JSON.stringify(form) });
      const d = await api("/api/admin/sources");
      setData((x) => ({ ...x, sources: d.sources as SRC[] }));
      flash("Manba qo‘shildi");
    } catch (e) {
      fail(e);
    }
  };

  const delSource = async (id: string) => {
    if (!confirm("Manbani o‘chirishni tasdiqlaysizmi?")) return;
    try {
      await api(`/api/admin/sources?id=${id}`, { method: "DELETE" });
      setData((d) => ({ ...d, sources: d.sources.filter((s) => s.id !== id) }));
      flash("Manba o‘chirildi");
    } catch (e) {
      fail(e);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-[13px] font-bold transition-colors ${
              tab === t.id ? "border-emerald bg-emerald text-soft" : "border-line text-ink/60 hover:border-emerald dark:border-linedark dark:text-soft/60"
            }`}
          >
            <Icon name={t.icon} className="h-4 w-4" />
            {t.label}
            {t.id === "projects" && data.stats.pending > 0 && (
              <span className={`rounded-full px-1.5 text-[11px] ${tab === t.id ? "bg-soft/20" : "bg-amber/20 text-amber"}`}>
                {data.stats.pending}
              </span>
            )}
          </button>
        ))}
      </div>

      {(msg || err) && (
        <div className={`mt-4 rounded-lg px-4 py-2.5 text-[13px] font-bold ${err ? "border border-danger/40 bg-danger/10 text-danger" : "border border-emerald/40 bg-emerald/10 text-emerald-deep dark:text-emerald"}`}>
          {err || msg}
        </div>
      )}

      {tab === "stats" && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { l: "Foydalanuvchilar", v: data.stats.users },
            { l: "Loyihalar", v: data.stats.projects },
            { l: "Tekshiruvdagi loyihalar", v: data.stats.pending, warn: true },
            { l: "Qayd etilgan harakatlar", v: data.stats.actions },
            { l: "Maqsadlar", v: data.stats.goals },
            { l: "Hudud ma’lumotlari", v: data.stats.regionData },
            { l: "Manbalar", v: data.stats.sources },
          ].map((s) => (
            <Card key={s.l} className="p-5">
              <div className="text-[12px] font-bold uppercase tracking-wide text-ink/50 dark:text-soft/50">{s.l}</div>
              <div className={`mt-1 font-display text-3xl font-bold ${s.warn && (s.v as number) > 0 ? "text-amber" : "text-emerald-deep dark:text-emerald"}`}>
                {s.v}
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "projects" && (
        <div className="mt-6 grid gap-3">
          {data.projects.map((p) => (
            <Card key={p.id} className="p-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[14px] font-bold">{p.title}</span>
                    <Badge tone={p.status === "approved" ? "ok" : p.status === "pending" ? "warn" : "danger"}>
                      {p.status === "approved" ? "E’lon qilindi" : p.status === "pending" ? "Tekshirilmoqda" : "Rad etildi"}
                    </Badge>
                    {p.isDemo && <Badge tone="demo">Demo</Badge>}
                  </div>
                  <div className="mt-1 text-[12px] text-ink/55 dark:text-soft/55">
                    {p.orgName} · {p.region} · {p.category} · ♥ {p.likes} · {new Date(p.createdAt).toLocaleDateString("uz-UZ")}
                  </div>
                </div>
                <div className="flex gap-2">
                  {p.status !== "approved" && (
                    <button onClick={() => setProjectStatus(p.id, "approved")} className="rounded-lg bg-emerald px-3.5 py-2 text-[12px] font-bold text-soft hover:bg-emerald-deep">
                      Tasdiqlash
                    </button>
                  )}
                  {p.status !== "rejected" && (
                    <button onClick={() => setProjectStatus(p.id, "rejected")} className="rounded-lg border border-amber/50 px-3.5 py-2 text-[12px] font-bold text-amber hover:bg-amber/10">
                      Rad etish
                    </button>
                  )}
                  {p.status !== "pending" && (
                    <button onClick={() => setProjectStatus(p.id, "pending")} className="rounded-lg border border-line px-3.5 py-2 text-[12px] font-bold text-ink/60 hover:border-emerald dark:border-linedark dark:text-soft/60">
                      Qayta ko‘rib chiqish
                    </button>
                  )}
                  <button onClick={() => delProject(p.id)} className="rounded-lg border border-danger/40 px-3 py-2 text-[12px] font-bold text-danger hover:bg-danger/10" aria-label="O‘chirish">
                    <Icon name="trash" className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
          {data.projects.length === 0 && <p className="text-sm text-ink/50 dark:text-soft/50">Loyihalar yo‘q.</p>}
        </div>
      )}

      {tab === "users" && (
        <Card className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-[13px]">
            <thead>
              <tr className="border-b border-line text-[11px] uppercase tracking-wide text-ink/45 dark:border-linedark dark:text-soft/45">
                <th className="px-4 py-3">Ism</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Rol</th>
                <th className="px-4 py-3 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((u) => (
                <tr key={u.id} className="border-b border-line/60 last:border-0 dark:border-linedark/60">
                  <td className="px-4 py-3 font-bold">{u.name}</td>
                  <td className="px-4 py-3 text-ink/60 dark:text-soft/60">{u.email}</td>
                  <td className="px-4 py-3">
                    <select
                      value={u.role}
                      onChange={(e) => setRole(u.id, e.target.value)}
                      className="rounded-lg border border-line bg-white px-2.5 py-1.5 text-[12px] font-bold outline-none focus:border-emerald dark:border-linedark dark:bg-ink3"
                    >
                      <option value="user">Foydalanuvchi</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => delUser(u.id)} className="rounded-lg border border-danger/40 px-2.5 py-1.5 text-[12px] font-bold text-danger hover:bg-danger/10">
                      O‘chirish
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {tab === "data" && (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <DataForm onSave={saveRegionData} />
          <Card className="p-5">
            <h3 className="font-display text-[15px] font-bold">Mavjud qatorlar ({data.regionData.length})</h3>
            <div className="mt-3 grid max-h-[420px] gap-2 overflow-y-auto pr-1">
              {data.regionData.map((r) => (
                <div key={r.id} className="rounded-lg border border-line p-3 dark:border-linedark">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[12.5px] font-bold">
                      {REGIONS.find((x) => x.key === r.regionKey)?.short ?? r.regionKey} · {r.metric}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {r.isDemo && <Badge tone="demo">Demo</Badge>}
                      <button onClick={() => delRegionData(r.id)} className="text-ink/35 hover:text-danger dark:text-soft/35" aria-label="O‘chirish">
                        <Icon name="trash" className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-1 text-[12px] text-ink/60 dark:text-soft/60">{r.value}</div>
                  <div className="mt-0.5 text-[11px] text-ink/45 dark:text-soft/45">
                    {r.scope} · xavf: {r.severity} · {r.source}
                    {r.year ? ` · ${r.year}` : ""}
                  </div>
                </div>
              ))}
              {data.regionData.length === 0 && <p className="text-[13px] text-ink/50 dark:text-soft/50">Hali qo‘shilgan qatorlar yo‘q.</p>}
            </div>
          </Card>
        </div>
      )}

      {tab === "sources" && (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <SourceForm onSave={addSource} />
          <Card className="p-5">
            <h3 className="font-display text-[15px] font-bold">Manbalar ({data.sources.length})</h3>
            <div className="mt-3 grid max-h-[420px] gap-2 overflow-y-auto pr-1">
              {data.sources.map((s) => (
                <div key={s.id} className="flex items-center gap-3 rounded-lg border border-line p-3 dark:border-linedark">
                  <div className="min-w-0 flex-1">
                    <a href={s.url} target="_blank" rel="noreferrer" className="text-[13px] font-bold text-emerald hover:underline">
                      {s.name}
                    </a>
                    <div className="text-[11px] text-ink/50 dark:text-soft/50">
                      {s.category}
                      {s.note ? ` — ${s.note}` : ""}
                    </div>
                  </div>
                  <button onClick={() => delSource(s.id)} className="text-ink/35 hover:text-danger dark:text-soft/35" aria-label="O‘chirish">
                    <Icon name="trash" className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function DataForm({ onSave }: { onSave: (f: RD & { id?: string }) => Promise<void> }) {
  const [regionKey, setRegionKey] = useState("toshkent-shahri");
  const [metric, setMetric] = useState("air");
  const [value, setValue] = useState("");
  const [severity, setSeverity] = useState(1);
  const [scope, setScope] = useState("hudud");
  const [source, setSource] = useState("");
  const [year, setYear] = useState("");
  const [isDemo, setIsDemo] = useState(false);
  const [busy, setBusy] = useState(false);

  return (
    <Card className="p-5">
      <h3 className="font-display text-[15px] font-bold">Hudud ma’lumoti kiritish / yangilash</h3>
      <p className="mt-1 text-[12px] text-ink/55 dark:text-soft/55">
        Bir hudud + ko‘rsatkich uchun faqat bitta qator saqlanadi (takrori kirilsa yangilanadi).
      </p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          await onSave({
            id: "",
            regionKey,
            metric,
            value,
            severity,
            scope,
            source,
            year: year ? Number(year) : null,
            isDemo,
          });
          setBusy(false);
          setValue("");
        }}
        className="mt-4 grid gap-3"
      >
        <div className="grid grid-cols-2 gap-3">
          <select value={regionKey} onChange={(e) => setRegionKey(e.target.value)} className={inputCls}>
            {REGIONS.map((r) => (
              <option key={r.key} value={r.key}>{r.short}</option>
            ))}
          </select>
          <select value={metric} onChange={(e) => setMetric(e.target.value)} className={inputCls}>
            {METRICS.map((m) => (
              <option key={m.key} value={m.key}>{m.label}</option>
            ))}
            <option value="risks">Ekologik xavflar (| bilan ajratib)</option>
          </select>
        </div>
        <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Ma’lumot qiymati" className={inputCls} />
        <div className="grid grid-cols-3 gap-3">
          <select value={severity} onChange={(e) => setSeverity(Number(e.target.value))} className={inputCls}>
            <option value={0}>Xavf: past</option>
            <option value={1}>Xavf: o‘rtacha</option>
            <option value={2}>Xavf: yuqori</option>
            <option value={3}>Xavf: juda yuqori</option>
          </select>
          <select value={scope} onChange={(e) => setScope(e.target.value)} className={inputCls}>
            <option value="hudud">Hudud darajasi</option>
            <option value="milliy">Milliy daraja</option>
          </select>
          <input value={year} onChange={(e) => setYear(e.target.value.replace(/\D/g, ""))} placeholder="Yil" className={inputCls} />
        </div>
        <input value={source} onChange={(e) => setSource(e.target.value)} placeholder="Manba (masalan: UNDP, 2021)" className={inputCls} />
        <label className="flex items-center gap-2 text-[13px] font-bold">
          <input type="checkbox" checked={isDemo} onChange={(e) => setIsDemo(e.target.checked)} className="h-4 w-4 accent-emerald" />
          Demo ma’lumot deb belgilash
        </label>
        <button type="submit" disabled={busy || !value.trim()} className="rounded-lg bg-emerald px-5 py-2.5 text-sm font-bold text-soft hover:bg-emerald-deep disabled:opacity-50">
          {busy ? "Saqlanmoqda…" : "Saqlash"}
        </button>
      </form>
    </Card>
  );
}

function SourceForm({ onSave }: { onSave: (f: { name: string; url: string; category: string; note: string }) => Promise<void> }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("umumiy");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <Card className="p-5">
      <h3 className="font-display text-[15px] font-bold">Yangi manba kiritish</h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          await onSave({ name, url, category, note });
          setBusy(false);
          setName("");
          setUrl("");
          setNote("");
        }}
        className="mt-4 grid gap-3"
      >
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Manba nomi (masalan: IPCC)" className={inputCls} />
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://…" className={inputCls} />
        <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Kategoriya" className={inputCls} />
        <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Izoh (ixtiyoriy)" className={inputCls} />
        <button type="submit" disabled={busy || !name.trim() || !url.trim()} className="rounded-lg bg-emerald px-5 py-2.5 text-sm font-bold text-soft hover:bg-emerald-deep disabled:opacity-50">
          {busy ? "Qo‘shilmoqda…" : "Manba qo‘shish"}
        </button>
      </form>
    </Card>
  );
}
