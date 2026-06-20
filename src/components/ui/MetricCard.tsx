"use client";

import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import { GlassCard } from "./GlassCard";
import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  prefix?: string;
  suffix?: string;
  isCurrency?: boolean;
  delay?: number;
  accent?: "blue" | "red" | "green" | "purple";
  compact?: boolean;
}

const accentColors = {
  blue: "from-electric to-electric-light",
  red: "from-accent-red to-orange-500",
  green: "from-emerald-500 to-teal-400",
  purple: "from-violet-500 to-purple-400",
};

export function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  prefix,
  suffix,
  isCurrency,
  delay = 0,
  accent = "blue",
  compact = false,
}: MetricCardProps) {
  const displayValue =
    typeof value === "number"
      ? isCurrency
        ? formatCurrency(value)
        : formatNumber(value)
      : value;

  return (
    <GlassCard delay={delay} hover className="relative overflow-hidden">
      <div
        className={cn(
          "absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br opacity-10 blur-2xl",
          accentColors[accent]
        )}
      />
      <div className="relative flex items-start justify-between gap-3">
        <div className="space-y-1.5">
          <p className="text-xs font-medium uppercase tracking-wide text-silver">{title}</p>
          <p className={cn("font-bold tracking-tight text-white", compact ? "text-xl md:text-2xl" : "text-2xl md:text-3xl")}>
            {prefix}
            {displayValue}
            {suffix}
          </p>
          {change !== undefined && (
            <div
              className={cn(
                "flex items-center gap-1 text-xs font-medium",
                change >= 0 ? "text-emerald-400" : "text-red-400"
              )}
            >
              {change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {Math.abs(change)}% vs prior period
            </div>
          )}
        </div>
        <div className={cn("flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg", compact ? "h-10 w-10" : "h-11 w-11", accentColors[accent])}>
          <Icon className={cn("text-white", compact ? "h-4 w-4" : "h-5 w-5")} />
        </div>
      </div>
    </GlassCard>
  );
}
