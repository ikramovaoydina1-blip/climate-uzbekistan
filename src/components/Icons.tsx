import type { ReactNode } from "react";

const P: Record<string, ReactNode> = {
  thermometer: (
    <>
      <path d="M14 4a2 2 0 0 0-4 0v9.5a4 4 0 1 0 4 0Z" />
      <path d="M12 9v6" />
    </>
  ),
  droplet: <path d="M12 3c3.6 4.2 6 7.3 6 10.2A6 6 0 0 1 6 13.2C6 10.3 8.4 7.2 12 3Z" />,
  wind: (
    <>
      <path d="M3 8h10a3 3 0 1 0-3-3" />
      <path d="M3 12h15a3 3 0 1 1-3 3" />
      <path d="M3 16h6" />
    </>
  ),
  waves: (
    <>
      <path d="M2 9c1.7-1.6 3.8-1.6 5.5 0s3.8 1.6 5.5 0 3.8-1.6 5.5 0 2.6 1.2 3.5 0" />
      <path d="M2 15c1.7-1.6 3.8-1.6 5.5 0s3.8 1.6 5.5 0 3.8-1.6 5.5 0 2.6 1.2 3.5 0" />
    </>
  ),
  factory: (
    <>
      <path d="M3 21V10l5 3.2V10l5 3.2V10l5 3.2V7.5A1.5 1.5 0 0 0 16.5 6h-1" />
      <path d="M3 21h18" />
    </>
  ),
  mountain: <path d="M3 20 9.5 5.5 14 14l2.5-4L21 20Z" />,
  leaf: (
    <>
      <path d="M5 20C5 10.5 10.5 5 20 5c0 9.5-5.5 15-15 15Z" />
      <path d="M5 20c3.5-6 7.5-10 12-12" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M19.4 4.6l-1.8 1.8M6.4 17.6l-1.8 1.8" />
    </>
  ),
  wheat: (
    <>
      <path d="M12 22V8" />
      <path d="M12 12c-3 0-4.8-1.8-4.8-4.8C10.2 7.2 12 9 12 12Z" />
      <path d="M12 12c3 0 4.8-1.8 4.8-4.8C13.8 7.2 12 9 12 12Z" />
      <path d="M12 16.5c-3 0-4.8-1.8-4.8-4.8 3 0 4.8 1.8 4.8 4.8Z" />
      <path d="M12 16.5c3 0 4.8-1.8 4.8-4.8-3 0-4.8 1.8-4.8 4.8Z" />
      <path d="M12 8c-1.5 0-2.5-1-2.5-2.5C11 5.5 12 6.5 12 8Z" />
      <path d="M12 8c1.5 0 2.5-1 2.5-2.5C13 5.5 12 6.5 12 8Z" />
    </>
  ),
  cloud: <path d="M6.5 18h10a4 4 0 0 0 .8-7.9A6 6 0 0 0 6.3 12 3.5 3.5 0 0 0 6.5 18Z" />,
  flask: (
    <>
      <path d="M9.5 3h5" />
      <path d="M10.5 3v5.5L4.8 19a2 2 0 0 0 1.8 3h10.8a2 2 0 0 0 1.8-3l-5.7-10.5V3" />
      <path d="M7.5 14.5h9" />
    </>
  ),
  calculator: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8.5 7.5h7" />
      <path d="M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 15.5h.01M12 15.5h.01M15.5 15.5v.01M15.5 12v6" />
    </>
  ),
  chart: (
    <>
      <path d="M4 4v16h16" />
      <path d="M8 16v-5M12 16V8M16 16v-3" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
      <path d="M16 4.8a3.5 3.5 0 0 1 0 6.4" />
      <path d="M17.5 14.8c2.1.7 3.5 2.4 3.5 4.7" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  book: (
    <>
      <path d="M4 19.5V5a2 2 0 0 1 2-2h14v15H6a2 2 0 0 0-2 1.5Z" />
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5L20 6.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  moon: <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />,
  menu: <path d="M4 6.5h16M4 12h16M4 17.5h16" />,
  logout: (
    <>
      <path d="M9.5 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.5" />
      <path d="m15.5 16.5 4.5-4.5-4.5-4.5M20 12H9.5" />
    </>
  ),
  spark: (
    <>
      <path d="M12 2.5 13.9 9l6.6 1.9-6.6 1.9L12 19.5l-1.9-6.7L3.5 10.9 10.1 9Z" />
      <path d="M19 16.5l.9 2.9 2.9.9-2.9.9-.9 2.9-.9-2.9-2.9-.9 2.9-.9Z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.5 4.5 5.8v6c0 5 3.2 8.4 7.5 9.7 4.3-1.3 7.5-4.7 7.5-9.7v-6Z" />
      <path d="m8.8 11.8 2.3 2.3 4.2-4.3" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16" />
      <path d="M9.5 7V4.5h5V7" />
      <path d="m6 7 .9 13h10.2L18 7" />
      <path d="M10 11v5.5M14 11v5.5" />
    </>
  ),
  edit: <path d="M4 20h4.5L20 8.5 15.5 4 4 15.5Z" />,
  external: (
    <>
      <path d="M14 5h5v5" />
      <path d="M19 5 10.5 13.5" />
      <path d="M19 13.5V19H5V5h5.5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  filter: <path d="M4 5.5h16l-6.2 7v5.3L10 20v-7.2Z" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14.5 14.5 0 0 1 0 18 14.5 14.5 0 0 1 0-18Z" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10.5V17M12 7.2v.1" />
    </>
  ),
  recycle: (
    <>
      <path d="m7 19-3-5 4-7" />
      <path d="m17 19 3-5-2-3.5" />
      <path d="M9.5 6.5 12 3l4 7h-3" />
      <path d="M10 19h7" />
    </>
  ),
};

export function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {P[name] ?? P.leaf}
    </svg>
  );
}

export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="17.5" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-emerald" />
      <path
        d="M11.5 27.5C11.5 18 17 12.5 27.5 12.5c0 9.5-5.5 15-16 15Z"
        fill="currentColor"
        className="text-forest dark:text-emerald"
      />
      <path
        d="M11.5 27.5c3.5-6 7.5-10 12.5-12.5"
        fill="none"
        stroke="var(--color-soft)"
        className="dark:stroke-ink"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
