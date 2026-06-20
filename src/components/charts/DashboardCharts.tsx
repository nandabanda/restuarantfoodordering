"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
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

const COLORS = ["#0054A6", "#0EA5E9", "#E4002B", "#FFD100", "#00A651", "#FF6600"];

interface SalesBarChartProps {
  data: { day: string; sales: number; bills?: number }[];
}

export function SalesBarChart({ data }: SalesBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
        <XAxis dataKey="day" stroke="#94A3B8" fontSize={12} />
        <YAxis stroke="#94A3B8" fontSize={12} tickFormatter={(v) => `₹${v / 1000}K`} />
        <Tooltip {...tooltipStyle} formatter={(value) => [`₹${Number(value).toLocaleString("en-IN")}`, "Sales"]} />
        <Bar dataKey="sales" fill="url(#salesGradient)" radius={[6, 6, 0, 0]} />
        <defs>
          <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#0054A6" />
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  );
}

interface AttachRateLineChartProps {
  data: { week: string; rate: number }[];
}

export function AttachRateLineChart({ data }: AttachRateLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
        <XAxis dataKey="week" stroke="#94A3B8" fontSize={12} />
        <YAxis stroke="#94A3B8" fontSize={12} domain={[50, 80]} tickFormatter={(v) => `${v}%`} />
        <Tooltip {...tooltipStyle} formatter={(value) => [`${value}%`, "Attach Rate"]} />
        <Area
          type="monotone"
          dataKey="rate"
          stroke="#0EA5E9"
          fill="url(#attachGradient)"
          strokeWidth={2}
        />
        <defs>
          <linearGradient id="attachGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#0054A6" stopOpacity={0.05} />
          </linearGradient>
        </defs>
      </AreaChart>
    </ResponsiveContainer>
  );
}

interface DaypartChartProps {
  data: { daypart: string; footfall: number; attachRate: number }[];
}

export function DaypartChart({ data }: DaypartChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
        <XAxis dataKey="daypart" stroke="#94A3B8" fontSize={11} />
        <YAxis yAxisId="left" stroke="#94A3B8" fontSize={12} tickFormatter={(v) => `${v / 1000}K`} />
        <YAxis yAxisId="right" orientation="right" stroke="#94A3B8" fontSize={12} tickFormatter={(v) => `${v}%`} />
        <Tooltip {...tooltipStyle} />
        <Bar yAxisId="left" dataKey="footfall" fill="#0054A6" radius={[4, 4, 0, 0]} name="Footfall" />
        <Line yAxisId="right" type="monotone" dataKey="attachRate" stroke="#E4002B" strokeWidth={2} dot={{ fill: "#E4002B" }} name="Attach Rate" />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface CuisineGrowthChartProps {
  data: { month: string; biryani: number; qsr: number; pizza: number; cafe: number }[];
}

export function CuisineGrowthChart({ data }: CuisineGrowthChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
        <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
        <YAxis stroke="#94A3B8" fontSize={12} />
        <Tooltip {...tooltipStyle} />
        <Legend />
        <Line type="monotone" dataKey="biryani" stroke="#0054A6" strokeWidth={2} name="Biryani" />
        <Line type="monotone" dataKey="qsr" stroke="#E4002B" strokeWidth={2} name="QSR" />
        <Line type="monotone" dataKey="pizza" stroke="#FFD100" strokeWidth={2} name="Pizza" />
        <Line type="monotone" dataKey="cafe" stroke="#0EA5E9" strokeWidth={2} name="Café" />
      </LineChart>
    </ResponsiveContainer>
  );
}

interface SegmentationPieChartProps {
  data: { segment: string; count: number; color: string }[];
}

export function SegmentationPieChart({ data }: SegmentationPieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={4}
          dataKey="count"
          nameKey="segment"
        >
          {data.map((entry, index) => (
            <Cell key={entry.segment} fill={entry.color || COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip {...tooltipStyle} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

interface BeverageStackChartProps {
  data: { cuisine: string; pepsi: number; sting: number; slice: number; other: number }[];
}

export function BeverageStackChart({ data }: BeverageStackChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
        <XAxis dataKey="cuisine" stroke="#94A3B8" fontSize={11} />
        <YAxis stroke="#94A3B8" fontSize={12} tickFormatter={(v) => `${v}%`} />
        <Tooltip {...tooltipStyle} />
        <Legend />
        <Bar dataKey="pepsi" stackId="a" fill="#0054A6" name="Pepsi" />
        <Bar dataKey="sting" stackId="a" fill="#FFD100" name="Sting" />
        <Bar dataKey="slice" stackId="a" fill="#FF4500" name="Slice" />
        <Bar dataKey="other" stackId="a" fill="#475569" name="Other" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface CityBarChartProps {
  data: { city: string; outlets: number; attachRate: number }[];
}

export function CityBarChart({ data }: CityBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
        <XAxis type="number" stroke="#94A3B8" fontSize={12} />
        <YAxis dataKey="city" type="category" stroke="#94A3B8" fontSize={11} width={80} />
        <Tooltip {...tooltipStyle} />
        <Bar dataKey="outlets" fill="url(#cityGradient)" radius={[0, 6, 6, 0]} name="Outlets" />
        <defs>
          <linearGradient id="cityGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0054A6" />
            <stop offset="100%" stopColor="#0EA5E9" />
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  );
}
