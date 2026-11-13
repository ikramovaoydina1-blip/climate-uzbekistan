"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon, Logo } from "@/components/Icons";
import { inputCls, Field } from "@/components/ui";

function RegisterForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/kabinet";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const d = await res.json();
    setBusy(false);
    if (!res.ok) return setErr(d.error || "Ro‘yxatdan o‘tishda xatolik");
    router.push(next);
    router.refresh();
  };

  return (
    <main className="mx-auto grid min-h-[70vh] max-w-md place-items-center px-4 py-14">
      <div className="w-full">
        <div className="mb-6 flex items-center gap-3">
          <Logo className="h-10 w-10" />
          <div>
            <div className="font-display text-lg font-bold">CLIMATE UZBEKISTAN</div>
            <div className="text-[11px] font-bold tracking-[0.16em] text-emerald">Hisob yaratish</div>
          </div>
        </div>
        <form onSubmit={submit} className="grid gap-4 rounded-xl border border-line bg-white/70 p-6 dark:border-linedark dark:bg-ink2">
          <Field label="Ism va familiya">
            <input required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} placeholder="Ismingiz" />
          </Field>
          <Field label="Email">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="siz@email.uz" />
          </Field>
          <Field label="Parol" hint="Kamida 6 belgi">
            <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} placeholder="••••••••" />
          </Field>
          {err && <div className="rounded-lg border border-danger/40 bg-danger/10 px-4 py-2.5 text-[13px] font-bold text-danger">{err}</div>}
          <button type="submit" disabled={busy} className="flex items-center justify-center gap-2 rounded-lg bg-emerald px-5 py-3 text-sm font-bold text-soft transition-colors hover:bg-emerald-deep disabled:opacity-50">
            {busy ? "Yaratilmoqda…" : "Ro‘yxatdan o‘tish"}
            <Icon name="arrow" className="h-4 w-4" />
          </button>
          <p className="text-center text-[13px] font-semibold text-ink/55 dark:text-soft/55">
            Hisobingiz bormi?{" "}
            <Link href={`/login?next=${encodeURIComponent(next)}`} className="font-bold text-emerald hover:underline">
              Kirish
            </Link>
          </p>
        </form>
        <p className="mt-4 text-center text-[11.5px] leading-relaxed text-ink/45 dark:text-soft/45">
          Ro‘yxatdan o‘tish orqali ma’lumotlar siyosatiga rozilik bildirasiz. Ma’lumotlaringiz faqat
          platforma faoliyati uchun ishlatiladi.
        </p>
      </div>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
