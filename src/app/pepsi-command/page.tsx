"use client";

import {
  AttachRateLineChart,
  BeverageStackChart,
  CityBarChart,
  CuisineGrowthChart,
} from "@/components/charts/DashboardCharts";
import { AppLayout } from "@/components/layout/AppLayout";
import { Header } from "@/components/layout/Header";
import { AIRecommendationCard } from "@/components/ui/AIRecommendationCard";
import { ChartCard } from "@/components/ui/ChartCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { MetricCard } from "@/components/ui/MetricCard";
import { beverageByCuisine, cuisineGrowthTrend } from "@/data/analytics";
import { pepsiCommandMetrics } from "@/data/metrics";
import { newLaunches, tradeDeals } from "@/data/pepsi";
import { cityMetrics } from "@/data/restaurants";
import { attachRateTrend } from "@/data/analytics";
import { formatNumber } from "@/lib/utils";
import {
  Building2,
  FileText,
  Footprints,
  Percent,
  Store,
  TrendingUp,
  Target,
  Rocket,
  MapPin,
  Zap,
} from "lucide-react";

const aiActions = [
  {
    id: "a1",
    title: "Activate Hyderabad trade push",
    insight: "71% attach in biryani belt — 200 outlets below target. Deploy combo bundles.",
    impact: "Critical" as const,
    action: "Launch trade deal",
  },
  {
    id: "a2",
    title: "Café segment Sting activation",
    insight: "Cafés growing 22% but Sting attach only 8%. Premium energy pairing opportunity.",
    impact: "High" as const,
    action: "Deploy café playbook",
  },
  {
    id: "a3",
    title: "QR conversion optimization",
    insight: "38% QR-to-order rate. AI combo prompts can lift to 50%+ across 1,200 outlets.",
    impact: "High" as const,
    action: "Enable AI prompts",
  },
];

export default function PepsiCommandPage() {
  return (
    <AppLayout>
      <Header
        title="Pepsi Command Center"
        subtitle="Enterprise HORECA intelligence · Pan-India operations"
        badge="Enterprise View"
      />

      {/* Hero metrics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-8">
        <MetricCard title="Restaurants Onboarded" value={pepsiCommandMetrics.totalRestaurants} icon={Building2} delay={0} />
        <MetricCard title="Active Outlets" value={pepsiCommandMetrics.activeOutlets} icon={Store} delay={0.05} accent="green" />
        <MetricCard title="Daily Bills" value={pepsiCommandMetrics.dailyBills} icon={FileText} delay={0.1} />
        <MetricCard title="Est. Footfall" value={pepsiCommandMetrics.estimatedFootfall} icon={Footprints} delay={0.15} />
        <MetricCard title="Pepsi Attach Rate" value={pepsiCommandMetrics.pepsiAttachRate} icon={Percent} suffix="%" delay={0.2} accent="red" />
        <MetricCard title="Menu Penetration" value={pepsiCommandMetrics.menuPenetration} icon={Target} suffix="%" delay={0.25} />
        <MetricCard title="New Product Adoption" value={pepsiCommandMetrics.newProductAdoption} icon={Rocket} suffix="%" delay={0.3} accent="purple" />
        <MetricCard title="Promo ROI" value={`${pepsiCommandMetrics.promoROI}x`} icon={TrendingUp} delay={0.35} accent="green" />
      </div>

      {/* Charts row 1 */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ChartCard title="Attach Rate Trend" subtitle="6-week national performance" delay={0.1}>
          <AttachRateLineChart data={attachRateTrend} />
        </ChartCard>
        <ChartCard title="Cuisine Growth Trends" subtitle="Outlet growth by cuisine type" delay={0.15}>
          <CuisineGrowthChart data={cuisineGrowthTrend} />
        </ChartCard>
      </div>

      {/* City map style + beverage attachment */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ChartCard
          title="City-wise HORECA Coverage"
          subtitle="Outlets onboarded across India"
          action={
            <span className="flex items-center gap-1 text-xs text-silver">
              <MapPin className="h-3 w-3" /> 6 cities live
            </span>
          }
          delay={0.2}
        >
          <CityBarChart data={cityMetrics} />
          <div className="mt-4 grid grid-cols-3 gap-2">
            {cityMetrics.slice(0, 6).map((city) => (
              <div key={city.city} className="rounded-lg bg-white/5 p-2 text-center">
                <p className="text-xs font-medium text-white">{city.city}</p>
                <p className="text-[10px] text-silver">{city.attachRate}% attach</p>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Beverage Attachment by Cuisine" subtitle="Product mix across cuisine segments" delay={0.25}>
          <BeverageStackChart data={beverageByCuisine} />
        </ChartCard>
      </div>

      {/* Trade deals + New launches */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <GlassCard delay={0.3}>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
            <Zap className="h-5 w-5 text-pepsi-red" />
            Trade Deal Performance
          </h3>
          <div className="space-y-3">
            {tradeDeals.map((deal) => (
              <div
                key={deal.name}
                className="flex items-center justify-between rounded-xl bg-white/5 p-4"
              >
                <div>
                  <p className="font-medium text-white">{deal.name}</p>
                  <p className="text-xs text-silver">{formatNumber(deal.outlets)} outlets</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-emerald-400">{deal.roi}x ROI</p>
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                    {deal.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard delay={0.35}>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
            <Rocket className="h-5 w-5 text-electric-light" />
            New Launch Tracker
          </h3>
          <div className="space-y-4">
            {newLaunches.map((launch) => (
              <div key={launch.product}>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-medium text-white">{launch.product}</p>
                  <p className="text-sm font-semibold text-electric-light">
                    {launch.adoption}% / {launch.target}%
                  </p>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-electric to-electric-light transition-all"
                    style={{ width: `${(launch.adoption / launch.target) * 100}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-silver">{launch.cities} cities live</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* AI Action Board */}
      <div className="mt-6">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
          <Zap className="h-5 w-5 text-amber-400" />
          AI Action Board
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {aiActions.map((action, i) => (
            <AIRecommendationCard key={action.id} {...action} delay={0.1 * i} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
