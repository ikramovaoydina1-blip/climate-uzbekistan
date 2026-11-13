import Link from "next/link";
import { Icon, Logo } from "@/components/Icons";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <Logo className="h-12 w-12" />
      <h1 className="mt-6 font-display text-4xl font-bold">404</h1>
      <p className="mt-2 text-[14px] leading-relaxed text-ink/60 dark:text-soft/60">
        Sahifa topilmadi. Iqlim muammolari ham shunday aniqlmaydi — bosh sahifadan boshlang.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald px-5 py-3 text-sm font-bold text-soft transition-colors hover:bg-emerald-deep"
      >
        <Icon name="arrow" className="h-4 w-4 rotate-180" /> Bosh sahifaga qaytish
      </Link>
    </main>
  );
}
