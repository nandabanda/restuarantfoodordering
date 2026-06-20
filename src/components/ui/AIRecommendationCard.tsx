"use client";

import { GlassCard } from "./GlassCard";
import { cn } from "@/lib/utils";
import { Sparkles, ArrowRight } from "lucide-react";

interface AIRecommendationCardProps {
  title: string;
  insight: string;
  impact: "High" | "Medium" | "Low" | "Critical";
  action: string;
  delay?: number;
}

const impactStyles = {
  Critical: "bg-pepsi-red/20 text-pepsi-red border-pepsi-red/30",
  High: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Medium: "bg-electric/20 text-electric-light border-electric/30",
  Low: "bg-silver/10 text-silver border-silver/20",
};

export function AIRecommendationCard({
  title,
  insight,
  impact,
  action,
  delay = 0,
}: AIRecommendationCardProps) {
  return (
    <GlassCard delay={delay} hover className="group">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-electric">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <span
          className={cn(
            "rounded-full border px-2.5 py-0.5 text-xs font-medium",
            impactStyles[impact]
          )}
        >
          {impact} Impact
        </span>
      </div>
      <h3 className="mb-2 font-semibold text-white">{title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-silver">{insight}</p>
      <button className="flex w-full items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-sm font-medium text-electric-light transition-colors hover:bg-white/10">
        {action}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
    </GlassCard>
  );
}
