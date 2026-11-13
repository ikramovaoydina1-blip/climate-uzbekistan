"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("reveal-visible");
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1300,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started.current) return;
        started.current = true;
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent =
            prefix + value * eased * Math.pow(10, decimals) * Math.pow(10, -decimals) + suffix;
          el.textContent =
            prefix + (value * eased).toLocaleString("uz-UZ", { maximumFractionDigits: decimals }) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, decimals, prefix, suffix, duration]);
  return (
    <span ref={ref}>
      {prefix}
      {(0).toLocaleString("uz-UZ", { maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

type BadgeTone = "ok" | "warn" | "danger" | "neutral" | "blue" | "demo";
const badgeTones: Record<BadgeTone, string> = {
  ok: "bg-emerald/10 text-emerald-deep dark:text-emerald border-emerald/30",
  warn: "bg-amber/10 text-amber border-amber/40",
  danger: "bg-danger/10 text-danger border-danger/30",
  neutral: "bg-earth/10 text-earth border-earth/30 dark:text-beige/80",
  blue: "bg-climate/10 text-climate border-climate/30",
  demo: "bg-ink/5 text-ink/70 border-ink/20 dark:bg-soft/10 dark:text-soft/70 dark:border-soft/20",
};

export function Badge({
  tone = "neutral",
  children,
  className = "",
}: {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${badgeTones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function SourceTag({ label, url }: { label: string; url?: string }) {
  const cls =
    "inline-flex items-center gap-1 rounded-md border border-line bg-beige/50 px-2 py-0.5 text-[11px] font-medium text-earth dark:border-linedark dark:bg-ink3 dark:text-beige/70";
  if (url)
    return (
      <a href={url} target="_blank" rel="noreferrer" className={cls}>
        {label} ↗
      </a>
    );
  return <span className={cls}>{label}</span>;
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl border border-line bg-white/70 dark:border-linedark dark:bg-ink2 ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionHead({
  kicker,
  title,
  lead,
  className = "",
}: {
  kicker: string;
  title: string;
  lead?: string;
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald">{kicker}</div>
      <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">{title}</h2>
      {lead ? <p className="mt-3 text-[15px] leading-relaxed text-ink/70 dark:text-soft/70">{lead}</p> : null}
    </div>
  );
}

export function EmptyData({ label = "Ma‘lumot mavjud emas" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[13px] italic text-ink/45 dark:text-soft/45">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M8.5 12h7" />
      </svg>
      {label}
    </span>
  );
}

export function PageHero({
  kicker,
  title,
  lead,
  children,
}: {
  kicker: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-line bg-beige/40 dark:border-linedark dark:bg-ink2/60">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald">{kicker}</div>
        <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.08] md:text-5xl">{title}</h1>
        {lead ? <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/70 dark:text-soft/70">{lead}</p> : null}
        {children}
      </div>
    </div>
  );
}

export function Stat({
  value,
  label,
  source,
  big = false,
}: {
  value: ReactNode;
  label: string;
  source?: string;
  big?: boolean;
}) {
  return (
    <div>
      <div className={`font-display font-bold text-emerald-deep dark:text-emerald ${big ? "text-5xl" : "text-3xl"}`}>
        {value}
      </div>
      <div className="mt-1 text-sm font-semibold text-ink/80 dark:text-soft/80">{label}</div>
      {source ? <div className="mt-0.5 text-[11px] text-ink/50 dark:text-soft/50">Manba: {source}</div> : null}
    </div>
  );
}

export function CTA({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  const styles =
    variant === "primary"
      ? "bg-emerald text-soft hover:bg-emerald-deep shadow-sm"
      : variant === "secondary"
        ? "border border-ink/20 text-ink hover:border-emerald hover:text-emerald dark:border-soft/30 dark:text-soft dark:hover:border-emerald dark:hover:text-emerald"
        : "text-emerald-deep hover:bg-emerald/10 dark:text-emerald";
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold transition-colors ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-bold text-ink/80 dark:text-soft/80">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-[11px] text-ink/50 dark:text-soft/50">{hint}</span> : null}
    </label>
  );
}

export const inputCls =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm font-medium text-ink outline-none transition-colors focus:border-emerald dark:border-linedark dark:bg-ink3 dark:text-soft";
