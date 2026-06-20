"use client";

import {
  DaypartChart,
  SegmentationPieChart,
} from "@/components/charts/DashboardCharts";
import { AppLayout } from "@/components/layout/AppLayout";
import { Header } from "@/components/layout/Header";
import { AIRecommendationCard } from "@/components/ui/AIRecommendationCard";
import { ChartCard } from "@/components/ui/ChartCard";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  aiOpportunities,
  consumerBehavior,
  footfallByDaypart,
  menuOpportunities,
  productGaps,
  restaurantSegmentation,
  topCuisines,
} from "@/data/analytics";
import { cn } from "@/lib/utils";
import { TrendingUp, AlertTriangle, Users, Brain } from "lucide-react";

export default function InsightsPage() {
  return (
    <AppLayout>
      <Header
        title="Deep Analytics"
        subtitle="HORECA intelligence · Consumer behavior · AI opportunity engine"
        badge="Analytics"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Footfall by Daypart" subtitle="Traffic & beverage attach rate by time of day" delay={0}>
          <DaypartChart data={footfallByDaypart} />
        </ChartCard>

        <ChartCard title="Restaurant Segmentation" subtitle="Performance tiers across network" delay={0.05}>
          <SegmentationPieChart data={restaurantSegmentation} />
        </ChartCard>
      </div>

      {/* Top cuisines */}
      <div className="mt-6">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
          <TrendingUp className="h-5 w-5 text-emerald-400" />
          Top Cuisines
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {topCuisines.map((cuisine, i) => (
            <GlassCard key={cuisine.cuisine} delay={0.05 * i} hover>
              <p className="font-semibold text-white">{cuisine.cuisine}</p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-lg font-bold text-emerald-400">+{cuisine.growth}%</p>
                  <p className="text-[10px] text-silver">Growth</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-electric-light">{cuisine.attachRate}%</p>
                  <p className="text-[10px] text-silver">Attach</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{cuisine.outlets}</p>
                  <p className="text-[10px] text-silver">Outlets</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Menu opportunities */}
        <GlassCard delay={0.1}>
          <h3 className="mb-4 flex items-center gap-2 font-semibold text-white">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
            Top Menu Opportunities
          </h3>
          <div className="space-y-3">
            {menuOpportunities.map((opp) => (
              <div key={opp.item} className="rounded-xl bg-white/5 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-white">{opp.item}</p>
                    <p className="mt-1 text-xs text-silver">{opp.gap}</p>
                  </div>
                  <span className="shrink-0 rounded-lg bg-emerald-500/20 px-2 py-1 text-xs font-semibold text-emerald-400">
                    {opp.potential}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Product gaps */}
        <GlassCard delay={0.15}>
          <h3 className="mb-4 font-semibold text-white">Product Gaps</h3>
          <div className="space-y-4">
            {productGaps.map((product) => (
              <div key={product.product}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-white">{product.product}</span>
                  <span className="text-silver">
                    {product.current}% → {product.target}%
                  </span>
                </div>
                <div className="relative h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-electric/40"
                    style={{ width: `${product.target}%` }}
                  />
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-electric to-electric-light"
                    style={{ width: `${product.current}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-accent-violet">Gap: {product.gap}pp to target</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Consumer behavior */}
      <div className="mt-6">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
          <Users className="h-5 w-5 text-electric-light" />
          Consumer Ordering Behavior
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {consumerBehavior.map((item, i) => (
            <GlassCard key={item.behavior} delay={0.05 * i} className="text-center">
              <p className="text-3xl font-bold text-white">{item.percentage}%</p>
              <p className="mt-1 text-sm text-silver">{item.behavior}</p>
              <p className={cn("mt-1 text-xs font-medium", item.trend.startsWith("+") ? "text-emerald-400" : "text-red-400")}>
                {item.trend}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* AI Opportunity Engine */}
      <div className="mt-6">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
          <Brain className="h-5 w-5 text-violet-400" />
          AI Opportunity Engine
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {aiOpportunities.map((opp, i) => (
            <GlassCard key={opp.id} delay={0.1 * i} hover glow={opp.priority === "Critical"}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[10px] font-medium",
                      opp.priority === "Critical"
                        ? "bg-accent-red/20 text-accent-red"
                        : opp.priority === "High"
                          ? "bg-orange-500/20 text-orange-400"
                          : "bg-electric/20 text-electric-light"
                    )}
                  >
                    {opp.priority}
                  </span>
                  <h4 className="mt-2 font-semibold text-white">{opp.title}</h4>
                  <p className="mt-2 text-sm text-silver">{opp.description}</p>
                </div>
              </div>
              <p className="mt-4 text-sm font-bold text-emerald-400">{opp.revenue}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="mt-6">
        <div className="grid gap-4 md:grid-cols-2">
          {aiOpportunities.slice(0, 2).map((opp, i) => (
            <AIRecommendationCard
              key={opp.id}
              title={opp.title}
              insight={opp.description}
              impact={opp.priority === "Critical" ? "Critical" : opp.priority === "High" ? "High" : "Medium"}
              action={`Activate — ${opp.revenue}`}
              delay={0.1 * i}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
