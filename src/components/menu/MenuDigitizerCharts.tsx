"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

const tooltipStyle = {
  contentStyle: {
    background: "rgba(15, 31, 61, 0.95)",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    borderRadius: "12px",
    color: "#f1f5f9",
  },
};

const COLORS = ["#0054A6", "#0EA5E9", "#7C3AED", "#00A651", "#FFD100"];

interface CategoryMixChartProps {
  data: { fullName: string; count: number; share: number }[];
}

export function CategoryMixChart({ data }: CategoryMixChartProps) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
        <XAxis dataKey="fullName" stroke="#94A3B8" fontSize={10} angle={-20} textAnchor="end" height={60} />
        <YAxis stroke="#94A3B8" fontSize={12} />
        <Tooltip {...tooltipStyle} formatter={(value, name) => [value, name === "count" ? "Items" : "Share %"]} />
        <Bar dataKey="count" radius={[6, 6, 0, 0]} name="Items">
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

interface PriceLadderChartProps {
  data: { category: string; min: number; avg: number; max: number }[];
}

export function PriceLadderChart({ data }: PriceLadderChartProps) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
        <XAxis dataKey="category" stroke="#94A3B8" fontSize={10} />
        <YAxis stroke="#94A3B8" fontSize={12} tickFormatter={(v) => `₹${v}`} />
        <Tooltip {...tooltipStyle} formatter={(v) => [`₹${v}`, ""]} />
        <Legend />
        <Bar dataKey="min" fill="#475569" name="Min" radius={[2, 2, 0, 0]} />
        <Bar dataKey="avg" fill="#0EA5E9" name="Avg" radius={[2, 2, 0, 0]} />
        <Bar dataKey="max" fill="#0054A6" name="Max" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface ComboOpportunityChartProps {
  data: { category: string; opportunities: number; attachPotential: number }[];
}

export function ComboOpportunityChart({ data }: ComboOpportunityChartProps) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
        <XAxis type="number" stroke="#94A3B8" fontSize={12} />
        <YAxis dataKey="category" type="category" stroke="#94A3B8" fontSize={10} width={90} />
        <Tooltip {...tooltipStyle} />
        <Legend />
        <Bar dataKey="opportunities" fill="#7C3AED" name="Opportunities" radius={[0, 4, 4, 0]} />
        <Bar dataKey="attachPotential" fill="#0EA5E9" name="Attach %" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
