"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Icon, Logo } from "./Icons";

const NAV = [
  { href: "/muammonar", label: "Muammonar" },
  { href: "/monitoring", label: "Monitoring" },
  { href: "/yechimlar", label: "Yechimlar" },
  { href: "/kalkulyatorlar", label: "Kalkulyatorlar" },
  { href: "/harakatlar", label: "Harakatlar" },
  { href: "/loyihalar", label: "Loyihalar" },
  { href: "/ilm", label: "Ilmiy ma’lumotlar" },
];

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setReady(true);
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("cu_theme", next ? "dark" : "light");
    } catch {}
  };
  if (!ready)
    return (
      <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-line dark:border-linedark" aria-label="Mavzu">
        <span className="h-4 w-4 rounded-full border border-line dark:border-linedark" />
      </button>
    );
  return (
    <button
      onClick={toggle}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink/70 transition-colors hover:border-emerald hover:text-emerald dark:border-linedark dark:text-soft/70 dark:hover:border-emerald dark:hover:text-emerald"
      aria-label="Mavzuni almashtirish"
    >
      <Icon name={dark ? "sun" : "moon"} className="h-4.5 w-4.5" />
    </button>
  );
}

type Me = { id: string; name: string; email: string; role: string } | null;

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<Me | null>(null);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setUser(d?.user ?? null))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-soft/85 backdrop-blur-md dark:border-linedark/80 dark:bg-ink/85">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Bosh sahifa">
          <Logo className="h-9 w-9" />
          <div className="leading-none">
            <div className="font-display text-[15px] font-bold tracking-tight">CLIMATE</div>
            <div className="text-[10px] font-bold tracking-[0.28em] text-emerald">UZBEKISTAN</div>
          </div>
        </Link>

        <nav className="ml-6 hidden items-center gap-0.5 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`rounded-md px-2.5 py-1.5 text-[13px] font-semibold transition-colors ${
                pathname.startsWith(n.href)
                  ? "bg-emerald/10 text-emerald-deep dark:text-emerald"
                  : "text-ink/65 hover:text-ink dark:text-soft/65 dark:hover:text-soft"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/assistant"
            className={`hidden items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-bold transition-colors sm:flex ${
              pathname.startsWith("/assistant")
                ? "bg-forest text-soft dark:bg-emerald dark:text-ink"
                : "text-emerald-deep hover:bg-emerald/10 dark:text-emerald"
            }`}
          >
            <Icon name="spark" className="h-4 w-4" />
            AI yordamchi
          </Link>
          <ThemeToggle />
          {!loaded ? (
            <span className="hidden h-9 w-24 animate-pulse rounded-lg bg-line/60 sm:block dark:bg-linedark/60" />
          ) : user ? (
            <div className="hidden items-center gap-1.5 sm:flex">
              <Link
                href="/kabinet"
                className="flex items-center gap-2 rounded-lg border border-line px-3 py-1.5 text-[13px] font-bold transition-colors hover:border-emerald dark:border-linedark dark:hover:border-emerald"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald text-[11px] font-bold text-soft">
                  {user.name.slice(0, 1).toUpperCase()}
                </span>
                {user.name.split(" ")[0]}
              </Link>
              <button
                onClick={logout}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink/60 hover:border-danger hover:text-danger dark:border-linedark dark:text-soft/60"
                aria-label="Chiqish"
              >
                <Icon name="logout" className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden rounded-lg bg-forest px-4 py-2 text-[13px] font-bold text-soft transition-colors hover:bg-emerald-deep sm:block dark:bg-emerald dark:text-ink dark:hover:bg-emerald/80"
            >
              Kirish
            </Link>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line lg:hidden dark:border-linedark"
            aria-label="Menyu"
          >
            <Icon name={open ? "x" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-soft px-4 py-3 lg:hidden dark:border-linedark dark:bg-ink">
          <nav className="grid gap-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-semibold ${
                  pathname.startsWith(n.href)
                    ? "bg-emerald/10 text-emerald-deep dark:text-emerald"
                    : "text-ink/70 dark:text-soft/70"
                }`}
              >
                {n.label}
              </Link>
            ))}
            <Link href="/assistant" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-bold text-emerald-deep dark:text-emerald">
              ✦ AI yordamchi
            </Link>
            {user ? (
              <>
                <Link href="/kabinet" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-semibold text-ink/70 dark:text-soft/70">
                  Shaxsiy kabinet
                </Link>
                <button onClick={logout} className="rounded-md px-3 py-2 text-left text-sm font-semibold text-danger">
                  Chiqish
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setOpen(false)} className="rounded-md bg-forest px-3 py-2 text-center text-sm font-bold text-soft dark:bg-emerald dark:text-ink">
                Kirish
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-beige/50 dark:border-linedark dark:bg-ink2/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <Logo className="h-8 w-8" />
            <div className="leading-none">
              <div className="font-display text-sm font-bold">CLIMATE UZBEKISTAN</div>
              <div className="mt-1 text-[10px] font-semibold tracking-[0.14em] text-emerald">Bugungi harakat — ertangi kelajak</div>
            </div>
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-ink/60 dark:text-soft/60">
            Iqlim o‘zgarishiga moslashish, salbiy oqibatlarini kamaytirish va ekologik mas’uliyatni oshirishga
            xizmat qiluvchi EcoTech platformasi.
          </p>
        </div>
        <div>
          <div className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-ink/50 dark:text-soft/50">Platforma</div>
          <ul className="grid gap-2 text-[13px] font-semibold text-ink/70 dark:text-soft/70">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-emerald">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-ink/50 dark:text-soft/50">Asosiy manbalar</div>
          <ul className="grid gap-2 text-[13px] font-semibold text-ink/70 dark:text-soft/70">
            <li><a href="https://www.ipcc.ch/" target="_blank" rel="noreferrer" className="hover:text-emerald">IPCC ↗</a></li>
            <li><a href="https://climate.nasa.gov/" target="_blank" rel="noreferrer" className="hover:text-emerald">NASA Climate ↗</a></li>
            <li><a href="https://wmo.int/" target="_blank" rel="noreferrer" className="hover:text-emerald">WMO ↗</a></li>
            <li><a href="https://www.unep.org/" target="_blank" rel="noreferrer" className="hover:text-emerald">UNEP ↗</a></li>
            <li><a href="https://www.worldbank.org/en/country/uzbekistan" target="_blank" rel="noreferrer" className="hover:text-emerald">World Bank ↗</a></li>
            <li><a href="https://www.uzbekistan.undp.org/" target="_blank" rel="noreferrer" className="hover:text-emerald">UNDP O‘zbekiston ↗</a></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-ink/50 dark:text-soft/50">Ma’lumot siyosati</div>
          <p className="text-[13px] leading-relaxed text-ink/60 dark:text-soft/60">
            Platformadagi statistik ma’lumotlar ochiq ilmiy manbalarga (IPCC, WMO, UNEP, FAO, WHO, World Bank, UNDP)
            tayangan. Manbasi bo‘lmagan ma’lumotlar «Ma’lumot mavjud emas» deb ko‘rsatiladi; kalkulyator natijalari
            taxminiy hisobdir va ochiq formulalar asosida hisoblanadi.
          </p>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-[12px] font-medium text-ink/45 dark:border-linedark dark:text-soft/45">
        © {new Date().getFullYear()} CLIMATE UZBEKISTAN — Bugungi harakat, ertangi kelajak.
      </div>
    </footer>
  );
}
