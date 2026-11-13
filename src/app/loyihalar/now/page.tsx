"use client";

import { useEffect, useState } from "react";
import { REGIONS } from "@/lib/data/regions";
import { Icon } from "@/components/Icons";
import { PageHero, CTA, inputCls, Field } from "@/components/ui";

const CATEGORIES = [
  { v: "suv", l: "Suv" },
  { v: "energiya", l: "Energiya" },
  { v: "qishloq", l: "Qishloq xo‘jaligi" },
  { v: "shahar", l: "Shahar" },
  { v: "targ'ibot", l: "Targ‘ibot" },
  { v: "tabiat", l: "Tabiat" },
  { v: "texnologiya", l: "Texnologiya" },
  { v: "ilmiy", l: "Ilmiy tadqiqot" },
];

export default function NewProjectPage() {
  const [me, setMe] = useState<{ name: string } | null | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("targ'ibot");
  const [region, setRegion] = useState("Butun mamlakat");
  const [orgName, setOrgName] = useState("");
  const [description, setDescription] = useState("");
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => (r.ok ? r.json() : { user: null })).then((d) => setMe(d.user));
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, category, region, description, orgName }),
    });
    const d = await res.json();
    setBusy(false);
    if (!res.ok) return setErr(d.error || "Xatolik yuz berdi");
    setDone(true);
  };

  if (me === undefined) return null;

  if (!me)
    return (
      <main>
        <PageHero kicker="Eco loyihalar" title="Loyiha joylashtirish" lead="Loyiha joylash uchun hisobda kirish kerak." />
        <div className="mx-auto max-w-md px-4 py-14 text-center">
          <div className="flex justify-center gap-3">
            <CTA href="/login" variant="primary">Kirish</CTA>
            <CTA href="/register" variant="secondary">Ro‘yxatdan o‘tish</CTA>
          </div>
        </div>
      </main>
    );

  if (done)
    return (
      <main>
        <PageHero kicker="Eco loyihalar" title="Loyiha qabul qilindi" lead="Loyihangiz moderatsiya uchun yuborildi." />
        <div className="mx-auto max-w-md px-4 py-14 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald/10 text-emerald">
            <Icon name="check" className="h-7 w-7" />
          </span>
          <p className="mt-4 text-[14px] leading-relaxed text-ink/65 dark:text-soft/65">
            Administrator loyihani ko‘rib chiqgach, u «Loyihalar» bo‘limida e’lon qilinadi. Statusingizni
            «Mening loyihalarim» qatorida kuzata olasiz.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <CTA href="/loyihalar" variant="primary">Loyihalar bo‘limi</CTA>
          </div>
        </div>
      </main>
    );

  return (
    <main>
      <PageHero
        kicker="Eco loyihalar"
        title="Loyihangizni joylashtiring"
        lead="Yoshlar, talabalar, maktablar, universitetlar, tadbirkorlar va ekologik tashkilotlar uchun ochiq maydon. Loyiha tavsifini to‘liq yozing — jamoa va hamkorlar shu asosda qo‘shiladi."
      />
      <div className="mx-auto max-w-2xl px-4 py-10">
        <form onSubmit={submit} className="grid gap-5 rounded-xl border border-line bg-white/70 p-6 dark:border-linedark dark:bg-ink2">
          <Field label="Loyiha nomi" hint="Kamida 8 belgi">
            <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} className={inputCls} placeholder="Masalan: Mahalliy daryo bo‘yida tozalash marafoni" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Yo‘nalish">
              <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls}>
                {CATEGORIES.map((c) => (
                  <option key={c.v} value={c.v}>{c.l}</option>
                ))}
              </select>
            </Field>
            <Field label="Hudud">
              <select value={region} onChange={(e) => setRegion(e.target.value)} className={inputCls}>
                <option value="Butun mamlakat">Butun mamlakat</option>
                {REGIONS.map((r) => (
                  <option key={r.key} value={r.name}>{r.name}</option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Tashkilot / jamoa nomi (ixtiyoriy)">
            <input value={orgName} onChange={(e) => setOrgName(e.target.value)} maxLength={100} className={inputCls} placeholder={me.name} />
          </Field>
          <Field label="Loyiha tavsifi" hint="Kamida 40 belgi: maqsad, metod, kutilayotgan natija, muddat">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              maxLength={3000}
              className={inputCls}
              placeholder="Loyiha qanday muammoni hal qiladi? Kim ishlashini rejalashtirgan? Qanday natija kutilmoqda?"
            />
          </Field>
          {err && <div className="rounded-lg border border-danger/40 bg-danger/10 px-4 py-3 text-[13px] font-bold text-danger">{err}</div>}
          <button
            type="submit"
            disabled={busy}
            className="flex items-center justify-center gap-2 rounded-lg bg-emerald px-5 py-3 text-sm font-bold text-soft transition-colors hover:bg-emerald-deep disabled:opacity-50"
          >
            <Icon name="plus" className="h-4 w-4" />
            {busy ? "Yuborilmoqda…" : "Moderatsiyaga yuborish"}
          </button>
          <p className="text-[11.5px] leading-relaxed text-ink/50 dark:text-soft/50">
            Loyiha administrator tomonidan tekshirilgach e’lon qilinadi. Soxta yoki asossiz ma’lumot joylashtirish
            platforma qoidalariga zid.
          </p>
        </form>
      </div>
    </main>
  );
}
