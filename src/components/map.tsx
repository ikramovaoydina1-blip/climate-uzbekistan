"use client";

import { useMemo, useState } from "react";
import {
  REGIONS,
  METRICS,
  SEVERITY_COLORS,
  SEVERITY_LABELS,
  MISSING_COLOR,
  type MetricKey,
  type Region,
  type RegionMetric,
} from "@/lib/data/regions";
import { Badge, EmptyData, Card } from "./ui";
import { Icon } from "./Icons";

export type DbRow = {
  regionKey: string;
  metric: MetricKey | "risks";
  value: string;
  severity: number;
  scope: string;
  source: string;
  year?: number | null;
  isDemo: boolean;
};

function mergedRegion(r: Region, dbRows: DbRow[]): Region {
  if (dbRows.length === 0) return r;
  const rows = dbRows.filter((d) => d.regionKey === r.key);
  if (rows.length === 0) return r;
  const data = { ...r.data };
  let risks = r.risks;
  rows.forEach((d) => {
    if (d.metric === "risks") {
      risks = d.value ? d.value.split("|").map((s) => s.trim()) : null;
      return;
    }
    const metricKey = d.metric as MetricKey;
    if (d.value === "MAVLUD_EMAS") {
      data[metricKey] = null;
    } else {
      data[metricKey] = {
        value: d.value,
        severity: (Math.min(3, Math.max(0, d.severity)) || 0) as 0 | 1 | 2 | 3,
        scope: (d.scope === "milliy" ? "milliy" : "hudud"),
        source: d.source + (d.isDemo ? " (demo)" : ""),
        year: d.year ?? undefined,
      };
    }
  });
  return { ...r, data, risks };
}

function fillFor(m: RegionMetric | null | undefined) {
  if (!m) return "url(#hatch)";
  return SEVERITY_COLORS[m.severity] ?? MISSING_COLOR;
}

export function UzMap({ dbRows = [] }: { dbRows?: DbRow[] }) {
  const [metric, setMetric] = useState<MetricKey>("temperature");
  const [selected, setSelected] = useState<string>("qoraqalpogiston");
  const [tip, setTip] = useState<{ x: number; y: number; text: string } | null>(null);

  const regions = useMemo(() => REGIONS.map((r) => mergedRegion(r, dbRows)), [dbRows]);
  const sel = regions.find((r) => r.key === selected) ?? regions[0];
  const metricLabel = METRICS.find((m) => m.key === metric)?.label ?? "";

  const onMove = (e: React.MouseEvent, name: string, m: RegionMetric | null | undefined) => {
    const rect = (e.currentTarget as SVGElement).ownerSVGElement?.getBoundingClientRect();
    if (!rect) return;
    const val = m ? m.value : "Ma’lumot mavjud emas";
    setTip({ x: e.clientX - rect.left, y: e.clientY - rect.top, text: `${name} — ${val}` });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <Card className="p-4 md:p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[13px] font-bold text-ink/60 dark:text-soft/60">Ko‘rsatkich:</span>
          {METRICS.map((m) => (
            <button
              key={m.key}
              onClick={() => setMetric(m.key)}
              className={`rounded-full border px-3 py-1.5 text-[12px] font-bold transition-colors ${
                metric === m.key
                  ? "border-emerald bg-emerald text-soft"
                  : "border-line text-ink/60 hover:border-emerald hover:text-emerald dark:border-linedark dark:text-soft/60"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <svg viewBox="40 0 850 690" className="w-full" role="img" aria-label="O‘zbekiston hududiy xaritasi (soddalashtirilgan)">
            <defs>
              <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect width="8" height="8" fill={MISSING_COLOR} opacity="0.35" />
                <line x1="0" y1="0" x2="0" y2="8" stroke={MISSING_COLOR} strokeWidth="2.5" opacity="0.7" />
              </pattern>
            </defs>
            {regions.map((r) => {
              const m = r.data[metric] ?? null;
              const isSel = r.key === selected;
              const common = {
                fill: fillFor(m),
                stroke: isSel ? "var(--color-climate)" : "var(--color-soft)",
                strokeWidth: isSel ? 3.5 : 1.5,
                className: "map-region dark:[&]:stroke-ink",
                tabIndex: 0,
                role: "button" as const,
                "aria-label": r.name,
                onClick: () => setSelected(r.key),
                onKeyDown: (e: React.KeyboardEvent) => e.key === "Enter" && setSelected(r.key),
                onMouseMove: (e: React.MouseEvent) => onMove(e, r.short, m),
                onMouseLeave: () => setTip(null),
              };
              return (
                <g key={r.key}>
                  {r.polygon ? (
                    <polygon points={r.polygon} {...common} />
                  ) : r.circle ? (
                    <circle cx={r.circle.cx} cy={r.circle.cy} r={r.circle.r} {...common} />
                  ) : null}
                  <text
                    x={r.label.x}
                    y={r.label.y}
                    textAnchor="middle"
                    className="pointer-events-none select-none"
                    fontSize="13"
                    fontWeight="700"
                    fill="currentColor"
                    opacity={isSel ? 1 : 0.85}
                  >
                    {r.short}
                  </text>
                </g>
              );
            })}
          </svg>
          {tip && (
            <div
              className="pointer-events-none absolute z-10 max-w-[260px] rounded-lg border border-line bg-white px-3 py-2 text-[12px] font-semibold shadow-lg dark:border-linedark dark:bg-ink3"
              style={{ left: Math.min(tip.x + 14, 999), top: tip.y + 14 }}
            >
              {tip.text}
            </div>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] font-semibold text-ink/60 dark:text-soft/60">
            {SEVERITY_LABELS.map((l, i) => (
              <span key={l} className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-sm" style={{ background: SEVERITY_COLORS[i] }} /> {l}
              </span>
            ))}
            <span className="flex items-center gap-1.5">
              <span
                className="h-3 w-3 rounded-sm"
                style={{
                  background: `repeating-linear-gradient(45deg, ${MISSING_COLOR}, ${MISSING_COLOR} 2px, transparent 2px, transparent 5px)`,
                }}
              />{" "}
              Ma’lumot mavjud emas
            </span>
          </div>
          <p className="mt-2 text-[11px] text-ink/45 dark:text-soft/45">
            Xarita soddalashtirilgan sxema ko‘rinishida; ranglar tanlangan ko‘rsatkich bo‘yicha xavf darajasini ko‘rsatadi.
          </p>
        </div>
      </Card>

      <Card className="flex flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald">{metricLabel}</div>
            <h3 className="font-display text-xl font-bold">{sel.name}</h3>
          </div>
          <Icon name="pin" className="h-5 w-5 text-emerald" />
        </div>

        <div className="mt-4 grid gap-2.5">
          {METRICS.map((m) => {
            const d = sel.data[m.key] ?? null;
            return (
              <div
                key={m.key}
                className={`rounded-lg border p-3 ${
                  metric === m.key
                    ? "border-emerald/50 bg-emerald/5"
                    : "border-line dark:border-linedark"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12px] font-bold text-ink/60 dark:text-soft/60">{m.label}</span>
                  {d ? (
                    <Badge tone={d.severity >= 2 ? "danger" : d.severity === 1 ? "warn" : "ok"}>
                      {SEVERITY_LABELS[d.severity]}
                    </Badge>
                  ) : null}
                </div>
                <div className="mt-1 text-[13px] font-semibold leading-snug">
                  {d ? d.value : <EmptyData />}
                </div>
                {d && (
                  <div className="mt-1.5 text-[11px] text-ink/50 dark:text-soft/50">
                    {d.scope === "milliy" ? "Milliy darajadagi ma’lumot" : "Hudud darajasidagi ma’lumot"} · {d.source}
                    {d.year ? `, ${d.year}` : ""}
                  </div>
                )}
              </div>
            );
          })}

          <div className="rounded-lg border border-line p-3 dark:border-linedark">
            <div className="text-[12px] font-bold text-ink/60 dark:text-soft/60">Ekologik xavflar</div>
            {sel.risks ? (
              <ul className="mt-1.5 grid gap-1">
                {sel.risks.map((r) => (
                  <li key={r} className="flex items-start gap-1.5 text-[13px] font-semibold">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-danger" /> {r}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-1.5">
                <EmptyData />
              </div>
            )}
          </div>
        </div>

        <div className="mt-auto pt-4">
          <div className="rounded-lg bg-beige/70 p-3 text-[11.5px] leading-relaxed text-ink/60 dark:bg-ink3 dark:text-soft/60">
            <Icon name="info" className="mr-1 inline h-3.5 w-3.5 align-[-2px]" />
            Ma’lumotlar faqat ochiq ilmiy manbalarga asoslanadi. Ma’lumot bo‘lmagan ko‘rsatkichlar ular o‘ylab
            topilmaydi va «Ma’lumot mavjud emas» deb ko‘rsatiladi.
          </div>
        </div>
      </Card>
    </div>
  );
}
