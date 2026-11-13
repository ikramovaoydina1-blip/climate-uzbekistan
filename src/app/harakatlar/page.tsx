"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ACTION_TYPES } from "@/lib/actionTypes";
import { Icon } from "@/components/Icons";
import { PageHero, Badge, CTA, Card, inputCls } from "@/components/ui";
import { MonthlyAreaChart } from "@/components/charts";

type ActionRow = { id: string; type: string; value: number; unit: string; note: string | null; createdAt: string };
type GoalRow = { id: string; type: string; targetValue: number; unit: string };
type Me = { id: string; name: string } | null;

export default function ActionsPage() {
  const [me, setMe] = useState<Me | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [actions, setActions] = useState<ActionRow[]>([]);
  const [goals, setGoals] = useState<GoalRow[]>([]);

  const [type, setType] = useState("water");
  const [value, setValue] = useState("");
  const [note, setNote] = useState("");
  const [goalType, setGoalType] = useState("water");
  const [goalTarget, setGoalTarget] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const load = useCallback(async () => {
    const [a, g] = await Promise.all([
      fetch("/api/actions").then((r) => (r.ok ? r.json() : { actions: [] })),
      fetch("/api/goals").then((r) => (r.ok ? r.json() : { goals: [] })),
    ]);
    setActions(a.actions ?? []);
    setGoals(g.goals ?? []);
  }, []);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : { user: null }))
      .then((d) => setMe(d.user))
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (me) load();
  }, [me, load]);

  const totals = useMemo(() => {
    const t: Record<string, number> = {};
    actions.forEach((a) => (t[a.type] = (t[a.type] ?? 0) + a.value));
    return t;
  }, [actions]);

  const monthly = useMemo(() => {
    const map = new Map<string, number>();
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const label = d.toLocaleDateString("uz-UZ", { month: "short" });
      const cnt = actions.filter((a) => a.createdAt.startsWith(key)).length;
      map.set(key, (map.get(key) ?? 0) + cnt);
      map.set(`label-${key}`, 0);
      void label;
    }
    const keys = [...map.keys()].filter((k) => !k.startsWith("label-"));
    return keys.map((k) => ({
      label: new Date(k + "-01").toLocaleDateString("uz-UZ", { month: "short" }),
      value: map.get(k) ?? 0,
    }));
  }, [actions]);

  if (!loaded) return null;

  if (!me) {
    return (
      <main>
        <PageHero
          kicker="Green Action"
          title="Ekologik harakatlaringizni qayd eting"
          lead="Suv tejash, energiya tejash, chiqindi saralash, daraxt parvarish — har bir harakatingizni ro‘yxat qiling, shaxsiy maqsadlar belgilang va oylik dinamikangizni grafikda kuzating. Faqat o‘zingiz bajargan harakatlarni kiriting — platforma soxta ko‘rsatkichlarni qo‘llab-quvvatlamaydi."
        />
        <div className="mx-auto max-w-xl px-4 py-14 text-center">
          <Card className="p-8">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald/10 text-emerald">
              <Icon name="target" className="h-7 w-7" />
            </span>
            <h2 className="mt-4 font-display text-xl font-bold">Shaxsiy kabinetingizga kiring</h2>
            <p className="mt-2 text-[14px] text-ink/60 dark:text-soft/60">
              Harakatlaringizni qayd etish va natijalaringizni kuzatish uchun ro‘yxatdan o‘ting yoki kirish qiling.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <CTA href="/login" variant="primary">Kirish</CTA>
              <CTA href="/register" variant="secondary">Ro‘yxatdan o‘tish</CTA>
            </div>
          </Card>
        </div>
      </main>
    );
  }

  const addAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(""); setMsg("");
    const res = await fetch("/api/actions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, value: Number(value), note: note || null }),
    });
    const d = await res.json();
    if (!res.ok) return setErr(d.error || "Xatolik");
    setMsg("Harakat qayd etildi. Rahmat!");
    setValue(""); setNote("");
    load();
  };

  const addGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(""); setMsg("");
    const t = ACTION_TYPES.find((a) => a.type === goalType)!;
    const res = await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: goalType, targetValue: Number(goalTarget), unit: t.unit }),
    });
    const d = await res.json();
    if (!res.ok) return setErr(d.error || "Xatolik");
    setMsg("Maqsad belgilandi.");
    setGoalTarget("");
    load();
  };

  const removeAction = async (id: string) => {
    await fetch(`/api/actions?id=${id}`, { method: "DELETE" });
    load();
  };
  const removeGoal = async (id: string) => {
    await fetch(`/api/goals?id=${id}`, { method: "DELETE" });
    load();
  };

  const t = ACTION_TYPES.find((a) => a.type === type)!;

  return (
    <main>
      <PageHero
        kicker="Green Action"
        title={`Harakatlarim — ${me.name.split(" ")[0]}`}
        lead="Bajargan ekologik harakatlaringizni qayd eting, maqsadlaringizni belgilang va natijalaringizni kuzating. Qaydlar shunchaki statistika emas — o‘zingiz uchun javobgarlik vositasidir."
      />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="grid gap-6">
            <Card className="p-6">
              <h3 className="font-display text-lg font-bold">Yangi harakat qo‘shish</h3>
              <form onSubmit={addAction} className="mt-4 grid gap-4">
                <select value={type} onChange={(e) => setType(e.target.value)} className={inputCls}>
                  {ACTION_TYPES.map((a) => (
                    <option key={a.type} value={a.type}>{a.label}</option>
                  ))}
                </select>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-[13px] font-bold">Miqdor ({t.unit})</label>
                    <input type="number" min="0" step="0.1" required value={value} onChange={(e) => setValue(e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[13px] font-bold">Izoh (ixtiyoriy)</label>
                    <input value={note} onChange={(e) => setNote(e.target.value)} maxLength={200} className={inputCls} />
                  </div>
                </div>
                <p className="text-[11.5px] leading-relaxed text-ink/50 dark:text-soft/50">{t.impact}</p>
                <button type="submit" className="flex items-center justify-center gap-2 rounded-lg bg-emerald px-5 py-3 text-sm font-bold text-soft transition-colors hover:bg-emerald-deep">
                  <Icon name="plus" className="h-4 w-4" /> Qo‘shish
                </button>
              </form>
            </Card>

            <Card className="p-6">
              <h3 className="font-display text-lg font-bold">Maqsad belgilash</h3>
              <form onSubmit={addGoal} className="mt-4 grid gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <select value={goalType} onChange={(e) => setGoalType(e.target.value)} className={inputCls}>
                    {ACTION_TYPES.map((a) => (
                      <option key={a.type} value={a.type}>{a.label}</option>
                    ))}
                  </select>
                  <input type="number" min="1" step="0.1" required value={goalTarget} onChange={(e) => setGoalTarget(e.target.value)} placeholder="Maqsad miqdori" className={inputCls} />
                </div>
                <button type="submit" className="flex items-center justify-center gap-2 rounded-lg border border-emerald px-5 py-2.5 text-sm font-bold text-emerald transition-colors hover:bg-emerald hover:text-soft">
                  <Icon name="target" className="h-4 w-4" /> Maqsad qo‘shish
                </button>
              </form>
              {goals.length > 0 && (
                <div className="mt-5 grid gap-3">
                  {goals.map((g) => {
                    const done = totals[g.type] ?? 0;
                    const pct = Math.min(100, Math.round((done / g.targetValue) * 100));
                    const gt = ACTION_TYPES.find((a) => a.type === g.type)!;
                    return (
                      <div key={g.id} className="rounded-lg border border-line p-3.5 dark:border-linedark">
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] font-bold">{gt.label}</span>
                          <button onClick={() => removeGoal(g.id)} className="text-ink/40 hover:text-danger dark:text-soft/40" aria-label="Olib tashlash">
                            <Icon name="trash" className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-beige dark:bg-ink3">
                          <div className="h-full rounded-full bg-emerald transition-all" style={{ width: `${pct}%` }} />
                        </div>
                        <div className="mt-1.5 flex justify-between text-[11.5px] font-semibold text-ink/55 dark:text-soft/55">
                          <span>{done.toLocaleString()} {g.unit}</span>
                          <span>maqsad: {g.targetValue} {g.unit} · {pct}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </div>

          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {ACTION_TYPES.map((a) => (
                <Card key={a.type} className="p-4">
                  <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink/45 dark:text-soft/45">{a.label}</div>
                  <div className="mt-1 font-display text-2xl font-bold text-emerald-deep dark:text-emerald">
                    {(totals[a.type] ?? 0).toLocaleString()}
                    <span className="ml-1 text-[12px] font-semibold text-ink/45 dark:text-soft/45">{a.unit}</span>
                  </div>
                </Card>
              ))}
              <Card className="p-4">
                <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink/45 dark:text-soft/45">Umumiy harakat</div>
                <div className="mt-1 font-display text-2xl font-bold">{actions.length}</div>
              </Card>
            </div>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold">Oylik dinamika</h3>
                <Badge tone="blue">So‘nggi 6 oy</Badge>
              </div>
              <div className="mt-4">
                <MonthlyAreaChart data={monthly} unit="harakat" />
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-display text-lg font-bold">Harakatlar tarixi</h3>
              <div className="mt-3 grid max-h-96 gap-2 overflow-y-auto pr-1">
                {actions.length === 0 && (
                  <p className="py-6 text-center text-[13px] font-semibold text-ink/45 dark:text-soft/45">
                    Hali harakat qayd etilmagan. Birinchi qadamni qo‘ying!
                  </p>
                )}
                {[...actions].reverse().map((a) => {
                  const at = ACTION_TYPES.find((x) => x.type === a.type);
                  return (
                    <div key={a.id} className="flex items-start gap-3 rounded-lg border border-line p-3 dark:border-linedark">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald/10 text-emerald">
                        <Icon name={a.type === "water" ? "droplet" : a.type === "energy" ? "calculator" : a.type === "waste" ? "recycle" : a.type === "tree" ? "leaf" : a.type === "event" ? "users" : "book"} className="h-4 w-4" />
                      </span>
                      <div className="flex-1">
                        <div className="text-[13px] font-bold">
                          {at?.label ?? a.type}: {a.value} {a.unit}
                        </div>
                        {a.note && <div className="text-[12px] text-ink/55 dark:text-soft/55">{a.note}</div>}
                        <div className="text-[11px] text-ink/40 dark:text-soft/40">
                          {new Date(a.createdAt).toLocaleDateString("uz-UZ")}
                        </div>
                      </div>
                      <button onClick={() => removeAction(a.id)} className="text-ink/35 hover:text-danger dark:text-soft/35" aria-label="O‘chirish">
                        <Icon name="trash" className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>

        {(msg || err) && (
          <div className={`mt-6 rounded-lg px-4 py-3 text-[13px] font-bold ${err ? "border border-danger/40 bg-danger/10 text-danger" : "border border-emerald/40 bg-emerald/10 text-emerald-deep dark:text-emerald"}`}>
            {err || msg}
          </div>
        )}

        <div className="mt-8 flex items-start gap-3 rounded-xl border border-line bg-beige/60 p-5 dark:border-linedark dark:bg-ink2">
          <Icon name="shield" className="mt-0.5 h-5 w-5 shrink-0 text-emerald" />
          <p className="text-[13px] leading-relaxed text-ink/70 dark:text-soft/70">
            <strong>Soliq qoidalari:</strong> faqat haqiqiy bajarilgan harakatlarni qayd eting. Daraxt
            ko‘rsatkichlari faqat ekilgan va parvarish qilingan daraxtlar uchun kiriladi — platforma tasdiqlanmagan
            ekologik natijalar yaratmaydi. Kvant ko‘rsatkichlari (masalan, CO2 tejash) faqat taxminiy xarakterda
            va shunday belgilanadi.
          </p>
        </div>
        <div className="mt-6">
          <Link href="/kabinet" className="inline-flex items-center gap-2 text-[13px] font-bold text-emerald hover:underline">
            Shaxsiy kabinetingiz <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
