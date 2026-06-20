"use client";

import { GlassCard } from "./GlassCard";
import { cn } from "@/lib/utils";
import { Sparkles, ArrowRight } from "lucide-react";

interface AIRecommendationCardProps {
  title: string;
  insight: string;
  impact: "High" | "Medium" | "Low" | "Critical";
  action: string;
  metric?: string;
  delay?: number;
}

const impactStyles = {
  Critical: "bg-accent-red/20 text-accent-red border-accent-red/30",
  High: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Medium: "bg-electric/20 text-electric-light border-electric/30",
  Low: "bg-silver/10 text-silver border-silver/20",
};

export function AIRecommendationCard({
  title,
  insight,
  impact,
  action,
  metric,
  delay = 0,
}: AIRecommendationCardProps) {
  return (
    <GlassCard delay={delay} hover glow={impact === "Critical"} className="group">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-electric">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className={cn("rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide", impactStyles[impact])}>
            {impact}
          </span>
          {metric && <span className="text-xs font-medium text-electric-light">{metric}</span>}
        </div>
      </div>
      <h3 className="mb-2 text-base font-semibold leading-snug text-white">{title}</h3>
      <p className="mb-5 text-sm leading-relaxed text-silver">{insight}</p>
      <button className="flex w-full items-center justify-between rounded-xl bg-white/5 px-4 py-2.5 text-sm font-medium text-electric-light transition-colors hover:bg-white/10">
        {action}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
    </GlassCard>
  );
}
