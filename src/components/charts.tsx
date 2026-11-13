"use client";

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { TEMP_TREND, ARAL_AREA } from "@/lib/data/regions";

const axis = { stroke: "currentColor", fontSize: 11, fontWeight: 600 } as const;

export function TempTrendChart() {
  return (
    <div className="h-64 w-full text-ink dark:text-soft">
      <ResponsiveContainer>
        <LineChart data={TEMP_TREND} margin={{ top: 10, right: 12, left: -14, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 6" stroke="currentColor" strokeOpacity={0.12} />
          <XAxis dataKey="year" tick={axis} tickLine={false} axisLine={{ strokeOpacity: 0.2 }} />
          <YAxis tick={axis} tickLine={false} axisLine={false} unit="°" domain={[-1, 2]} />
          <Tooltip formatter={(v) => [`${v} °C`, "O‘zgarish"]} labelStyle={{ color: "inherit" }} />
          <ReferenceLine y={0} stroke="#B4552D" strokeDasharray="4 4" />
          <Line
            type="monotone"
            dataKey="delta"
            stroke="#16866A"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#16866A" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AralChart() {
  return (
    <div className="h-64 w-full text-ink dark:text-soft">
      <ResponsiveContainer>
        <AreaChart data={ARAL_AREA} margin={{ top: 10, right: 12, left: -6, bottom: 0 }}>
          <defs>
            <linearGradient id="aralFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4A9DB8" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#4A9DB8" stopOpacity={0.04} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 6" stroke="currentColor" strokeOpacity={0.12} />
          <XAxis dataKey="year" tick={axis} tickLine={false} axisLine={{ strokeOpacity: 0.2 }} />
          <YAxis tick={axis} tickLine={false} axisLine={false} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
          <Tooltip formatter={(v) => [`${Number(v).toLocaleString()} km²`, "Maydon"]} labelStyle={{ color: "inherit" }} />
          <Area type="monotone" dataKey="area" stroke="#4A9DB8" strokeWidth={2.5} fill="url(#aralFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MonthlyAreaChart({
  data,
  color = "#16866A",
  unit = "",
}: {
  data: { label: string; value: number }[];
  color?: string;
  unit?: string;
}) {
  return (
    <div className="h-56 w-full text-ink dark:text-soft">
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <defs>
            <linearGradient id={`mFill-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.4} />
              <stop offset="100%" stopColor={color} stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 6" stroke="currentColor" strokeOpacity={0.12} />
          <XAxis dataKey="label" tick={axis} tickLine={false} axisLine={{ strokeOpacity: 0.2 }} />
          <YAxis tick={axis} tickLine={false} axisLine={false} />
          <Tooltip
            formatter={(v) => [`${Number(v).toLocaleString()} ${unit}`, "Jami"]}
            labelStyle={{ color: "inherit" }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2.5}
            fill={`url(#mFill-${color.replace("#", "")})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CompareBars({
  data,
  colors = ["#16866A", "#78644C"],
  unit = "",
}: {
  data: { name: string; a: number; b?: number }[];
  colors?: string[];
  unit?: string;
}) {
  return (
    <div className="h-56 w-full text-ink dark:text-soft">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 6" stroke="currentColor" strokeOpacity={0.12} vertical={false} />
          <XAxis dataKey="name" tick={axis} tickLine={false} axisLine={{ strokeOpacity: 0.2 }} />
          <YAxis tick={axis} tickLine={false} axisLine={false} />
          <Tooltip
            formatter={(v, name) => [
              `${Number(v).toLocaleString()} ${unit}`,
              name === "a" ? "Hozirgi" : "Yangi",
            ]}
            labelStyle={{ color: "inherit" }}
          />
          <Bar dataKey="a" radius={[6, 6, 0, 0]} maxBarSize={42}>
            {data.map((_, i) => (
              <Cell key={i} fill={colors[0]} />
            ))}
          </Bar>
          {data.some((d) => d.b !== undefined) && (
            <Bar dataKey="b" radius={[6, 6, 0, 0]} maxBarSize={42}>
              {data.map((_, i) => (
                <Cell key={i} fill={colors[1]} />
              ))}
            </Bar>
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
