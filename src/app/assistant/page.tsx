"use client";

import { useEffect, useRef, useState } from "react";
import { PROBLEMS } from "@/lib/data/problems";
import { REGIONS } from "@/lib/data/regions";
import { Icon } from "@/components/Icons";
import { PageHero, Badge, inputCls } from "@/components/ui";

type Msg = { role: "user" | "assistant"; content: string; mode?: string };

function renderAnswer(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const t = line.trim();
    if (!t) return null;
    if (t.startsWith("## "))
      return (
        <h4 key={i} className="mb-1 mt-3 first:mt-0 font-display text-[15px] font-bold text-emerald-deep dark:text-emerald">
          {t.slice(3)}
        </h4>
      );
    if (t.startsWith("• ") || t.startsWith("- "))
      return (
        <div key={i} className="flex items-start gap-2 py-0.5 text-[13.5px] leading-relaxed">
          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />
          <span>{t.slice(2)}</span>
        </div>
      );
    if (t.startsWith("— "))
      return (
        <div key={i} className="py-0.5 pl-4 text-[12px] font-semibold text-ink/55 dark:text-soft/55">
          {t.slice(2)}
        </div>
      );
    return (
      <p key={i} className="py-0.5 text-[13.5px] leading-relaxed">
        {t}
      </p>
    );
  });
}

const SUGGESTIONS = [
  "Aral dengizi inqirozi haqida tushuntirib bering",
  "Farg‘ona viloyati bo‘yicha suv holati qanday?",
  "Voyaga yetgan odam uchun suv tejash rejası tuzing",
  "Maktab talabalari uchun ekologik loyiha g‘oyasi bering",
  "Toshkentda havo sifati nima uchun qishda yomonlashadi?",
  "Uyida uglerod izini qanday kamaytirish mumkin?",
];

export default function AssistantPage() {
  const [problem, setProblem] = useState("");
  const [region, setRegion] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Assalomu alaykum! Men CLIMATE UZBEKISTAN iqlim yordamchisi. Muammoni tushuntirib beraman, hududga mos tavsiyalar beraman va individual harakat rejası tuzishga yordam beraman. Javoblarim faqat ochiq ilmiy manbalarga asoslanadi — isbotlanmagan ma’lumot kiritmayman.",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, busy]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || busy) return;
    setInput("");
    setError("");
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setBusy(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
          context: { problem: problem || undefined, region: region || undefined },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Xatolik yuz berdi");
      setMessages((m) => [...m, { role: "assistant", content: data.answer, mode: data.mode }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Xatolik yuz berdi");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main>
      <PageHero
        kicker="AI iqlim yordamchisi"
        title="Ilimga asoslangan iqlim maslahatchisi"
        lead="Yordamchi muammolarni tushuntiradi, amaliy yechimlar taklif qiladi, hududga mos tavsiyalar beradi va individual ekologik harakat rejası tuzadi. Javoblar har doim manbalar va cheklovlari bilan keltiriladi."
      >
        <div className="mt-5 flex flex-wrap gap-2">
          <select value={problem} onChange={(e) => setProblem(e.target.value)} className={`${inputCls} max-w-xs`}>
            <option value="">Muammo tanlamasdan (umumiy)</option>
            {PROBLEMS.map((p) => (
              <option key={p.slug} value={p.slug}>{p.title}</option>
            ))}
          </select>
          <select value={region} onChange={(e) => setRegion(e.target.value)} className={`${inputCls} max-w-xs`}>
            <option value="">Hudud tanlamasdan</option>
            {REGIONS.map((r) => (
              <option key={r.key} value={r.key}>{r.name}</option>
            ))}
          </select>
        </div>
      </PageHero>

      <div className="mx-auto flex max-w-3xl flex-col px-4 py-10">
        <div className="flex items-center gap-2 rounded-lg border border-line bg-beige/50 px-4 py-2.5 text-[12px] font-semibold text-ink/60 dark:border-linedark dark:bg-ink2 dark:text-soft/60">
          <Icon name="shield" className="h-4 w-4 text-emerald" />
          Ilmiy asos qoidasi: yordamchi ishonchli manbaga ega bo‘lmagan raqam yoki fakt kiritmaydi — bunday hollarda
          «ma’lumot mavjud emas» deydi. Har bir javobda manbalar va cheklovlar ko‘rsatiladi.
        </div>

        <div className="mt-6 grid gap-4">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <div
                className={`max-w-[85%] rounded-2xl px-4.5 py-3.5 ${
                  m.role === "user"
                    ? "bg-forest text-soft dark:bg-emerald dark:text-ink"
                    : "border border-line bg-white/80 dark:border-linedark dark:bg-ink2"
                }`}
              >
                {m.role === "assistant" && (
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald/15 text-emerald">
                      <Icon name="spark" className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/45 dark:text-soft/45">
                      AI yordamchi
                    </span>
                    {m.mode && (
                      <Badge tone={m.mode === "model" ? "blue" : "neutral"}>
                        {m.mode === "model" ? "AI model" : "Oflayn bilimlar bazasi"}
                      </Badge>
                    )}
                  </div>
                )}
                <div className="whitespace-pre-wrap">{renderAnswer(m.content)}</div>
                {m.role === "assistant" && i === messages.length - 1 && (
                  <div className="mt-2 border-t border-line pt-2 text-[11px] text-ink/45 dark:border-linedark dark:text-soft/45">
                    {m.content.includes("Cheklov:") ? "" : "Tavsiyalar ta’limiy xarakterga ega — aniq qarorlar uchun mutaxassis bilan maslahatlashing."}
                  </div>
                )}
              </div>
            </div>
          ))}
          {busy && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 rounded-2xl border border-line bg-white/80 px-4 py-3 dark:border-linedark dark:bg-ink2">
                <span className="h-2 w-2 animate-pulse-soft rounded-full bg-emerald" />
                <span className="h-2 w-2 animate-pulse-soft rounded-full bg-emerald [animation-delay:300ms]" />
                <span className="h-2 w-2 animate-pulse-soft rounded-full bg-emerald [animation-delay:600ms]" />
                <span className="text-[12px] font-semibold text-ink/50 dark:text-soft/50">Tahlil qilinmoqda…</span>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-danger/40 bg-danger/10 px-4 py-3 text-[13px] font-bold text-danger">
            {error}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              disabled={busy}
              className="rounded-full border border-line px-3.5 py-1.5 text-[12px] font-semibold text-ink/60 transition-colors hover:border-emerald hover:text-emerald disabled:opacity-50 dark:border-linedark dark:text-soft/60"
            >
              {s}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="mt-4 flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Savolingizni yozing…"
            className={`${inputCls} flex-1`}
            maxLength={1000}
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="flex items-center gap-2 rounded-lg bg-emerald px-5 py-3 text-sm font-bold text-soft transition-colors hover:bg-emerald-deep disabled:opacity-50"
          >
            <Icon name="arrow" className="h-4 w-4" />
            Yuborish
          </button>
        </form>
        <p className="mt-3 text-[11.5px] leading-relaxed text-ink/45 dark:text-soft/45">
          Model rejimi yoqilganda (server tomonida API kalit mavjud bo‘lsa) javobni tashqi AI model tuzadi;
          aks holda platformaning ilmiy bilimlar bazasi ishlaydi va javobda «Oflayn bilimlar bazasi» belgisi
          qo‘yiladi. Ikkala rejimda ham faqat ma’lum manbalarga tayanch qilinadi.
        </p>
      </div>
    </main>
  );
}
