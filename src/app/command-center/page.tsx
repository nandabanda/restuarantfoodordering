"use client";

import {
  AttachRateLineChart,
  BeverageStackChart,
  CityBarChart,
  CohortChart,
  DaypartOrdersChart,
} from "@/components/charts/DashboardCharts";
import { AppLayout } from "@/components/layout/AppLayout";
import { Header } from "@/components/layout/Header";
import { CommandSection, SectionHeader } from "@/components/layout/SectionHeader";
import { AIRecommendationCard } from "@/components/ui/AIRecommendationCard";
import { ChartCard } from "@/components/ui/ChartCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { MetricCard } from "@/components/ui/MetricCard";
import {
  aiActionBoard,
  consumerIntelligence,
  menuIntelligence,
  networkIntelligence,
  tradeIntelligence,
} from "@/data/commandCenter";
import { attachRateTrend, beverageByCuisine } from "@/data/analytics";
import { cityMetrics } from "@/data/restaurants";
import { opportunityPipeline } from "@/data/products";
import { formatNumber } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Building2,
  Footprints,
  Receipt,
  ShoppingCart,
  Store,
  Users,
  Repeat,
  TrendingUp,
  ChefHat,
  Target,
  Megaphone,
  Rocket,
  Brain,
  ArrowUpRight,
} from "lucide-react";

export default function CommandCenterPage() {
  return (
    <AppLayout>
      <Header
        title="Command Center"
        subtitle="Real-time network, consumer, menu, and trade intelligence across your restaurant ecosystem"
        badge="Enterprise Intelligence"
      />

      {/* Hero strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 rounded-2xl border border-electric/20 bg-gradient-to-r from-electric/10 via-navy-light/50 to-accent-violet/10 p-6 md:p-8 brand-glow"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="section-label mb-2">ServePulse™ Intelligence</p>
            <h2 className="text-2xl font-bold text-white md:text-3xl">Executive Overview</h2>
            <p className="mt-2 max-w-xl text-sm text-silver">
              {networkIntelligence.activeRestaurants.toLocaleString("en-IN")} active restaurants ·{" "}
              {formatNumber(networkIntelligence.monthlyOrders)} monthly orders ·{" "}
              {tradeIntelligence.beverageAttachRate}% beverage attach
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="rounded-xl bg-white/[0.04] px-5 py-3 text-center">
              <p className="text-2xl font-bold text-emerald-400">{tradeIntelligence.promotionROI}x</p>
              <p className="text-[10px] uppercase tracking-wide text-silver">Promo ROI</p>
            </div>
            <div className="rounded-xl bg-white/[0.04] px-5 py-3 text-center">
              <p className="text-2xl font-bold text-electric-light">{consumerIntelligence.repeatRate}%</p>
              <p className="text-[10px] uppercase tracking-wide text-silver">Repeat Rate</p>
            </div>
            <div className="rounded-xl bg-white/[0.04] px-5 py-3 text-center">
              <p className="text-2xl font-bold text-accent-violet">{tradeIntelligence.productAdoption}%</p>
              <p className="text-[10px] uppercase tracking-wide text-silver">Product Adoption</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 1. Network Intelligence */}
      <CommandSection className="mb-14">
        <SectionHeader title="Network Intelligence" subtitle="Restaurant network performance and operational metrics" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <MetricCard title="Total Restaurants" value={networkIntelligence.totalRestaurants} change={networkIntelligence.totalChange} icon={Building2} compact delay={0} />
          <MetricCard title="Active Restaurants" value={networkIntelligence.activeRestaurants} change={networkIntelligence.activeChange} icon={Store} accent="green" compact delay={0.05} />
          <MetricCard title="Monthly Orders" value={networkIntelligence.monthlyOrders} change={networkIntelligence.ordersChange} icon={Receipt} compact delay={0.1} />
          <MetricCard title="Footfall" value={networkIntelligence.footfall} change={networkIntelligence.footfallChange} icon={Footprints} compact delay={0.15} />
          <MetricCard title="Avg Ticket Size" value={networkIntelligence.averageTicketSize} change={networkIntelligence.ticketChange} icon={ShoppingCart} isCurrency accent="purple" compact delay={0.2} />
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <ChartCard title="City Network Coverage" subtitle="Active outlets by city" delay={0.1}>
            <CityBarChart data={cityMetrics} />
          </ChartCard>
          <ChartCard title="Beverage Attach Trend" subtitle="6-week network performance" delay={0.15}>
            <AttachRateLineChart data={attachRateTrend} />
          </ChartCard>
        </div>
      </CommandSection>

      {/* 2. Consumer Intelligence */}
      <CommandSection className="mb-14">
        <SectionHeader title="Consumer Intelligence" subtitle="Consumer growth, behavior, and cohort analysis" />
        <div className="grid gap-4 sm:grid-cols-3">
          <MetricCard title="Consumer Growth" value={consumerIntelligence.consumerGrowth} suffix="%" icon={Users} accent="green" compact delay={0} />
          <MetricCard title="Repeat Rate" value={consumerIntelligence.repeatRate} suffix="%" icon={Repeat} accent="purple" compact delay={0.05} />
          <MetricCard title="Spending Trend" value={consumerIntelligence.spendingTrend} suffix="%" icon={TrendingUp} compact delay={0.1} />
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <ChartCard title="Daypart Order Trends" subtitle="Order volume by time of day" delay={0.1}>
            <DaypartOrdersChart data={consumerIntelligence.daypartTrends} />
          </ChartCard>
          <ChartCard title="Consumer Cohorts" subtitle="Share and repeat rate by segment" delay={0.15}>
            <CohortChart data={consumerIntelligence.cohorts} />
            <div className="mt-4 grid grid-cols-2 gap-2">
              {consumerIntelligence.cohorts.map((c) => (
                <div key={c.cohort} className="rounded-lg bg-white/[0.03] p-3">
                  <p className="text-xs font-medium text-white">{c.cohort}</p>
                  <p className="text-[10px] text-silver">Avg spend ₹{c.avgSpend}</p>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </CommandSection>

      {/* 3. Menu Intelligence */}
      <CommandSection className="mb-14">
        <SectionHeader title="Menu Intelligence" subtitle="Menu performance, gaps, and cross-sell opportunities" />
        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard delay={0.1}>
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-white">
              <ChefHat className="h-4 w-4 text-electric-light" />
              Top Selling Items
            </h3>
            <div className="space-y-3">
              {menuIntelligence.topSellingItems.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between rounded-xl bg-white/[0.03] p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-electric/20 text-xs font-bold text-electric-light">{i + 1}</span>
                    <div>
                      <p className="text-sm font-medium text-white">{item.name}</p>
                      <p className="text-xs text-silver">{formatNumber(item.orders)} orders</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-400">+{item.growth}%</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <div className="space-y-6">
            <GlassCard delay={0.15}>
              <h3 className="mb-4 font-semibold text-white">Menu Gaps</h3>
              <div className="space-y-2">
                {menuIntelligence.menuGaps.map((gap) => (
                  <div key={gap.gap} className="flex items-center justify-between rounded-xl bg-white/[0.03] p-3">
                    <span className="text-sm text-white">{gap.gap}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-silver">{gap.outlets} outlets</span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${gap.potential === "Critical" ? "bg-accent-red/20 text-accent-red" : "bg-electric/20 text-electric-light"}`}>
                        {gap.potential}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard delay={0.2}>
              <h3 className="mb-4 font-semibold text-white">Cross-Sell Opportunities</h3>
              <div className="space-y-2">
                {menuIntelligence.crossSellOpportunities.map((opp) => (
                  <div key={opp.trigger} className="flex items-center justify-between rounded-xl bg-white/[0.03] p-3">
                    <div>
                      <p className="text-sm font-medium text-white">{opp.trigger}</p>
                      <p className="text-xs text-silver">{opp.suggestion}</p>
                    </div>
                    <span className="text-sm font-semibold text-emerald-400">{opp.uplift}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <GlassCard delay={0.25}>
            <h3 className="mb-4 font-semibold text-white">Combo Performance</h3>
            <div className="space-y-3">
              {menuIntelligence.comboPerformance.map((combo) => (
                <div key={combo.combo}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-medium text-white">{combo.combo}</span>
                    <span className="text-electric-light">{combo.conversion}% conversion</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-electric to-electric-light" style={{ width: `${combo.attachRate}%` }} />
                  </div>
                  <p className="mt-1 text-[10px] text-silver">{combo.attachRate}% attach rate</p>
                </div>
              ))}
            </div>
          </GlassCard>
          <ChartCard title="Cuisine Growth" subtitle="Outlet growth by cuisine segment" delay={0.3}>
            <div className="space-y-3">
              {menuIntelligence.cuisineGrowth.map((c) => (
                <div key={c.cuisine} className="flex items-center justify-between rounded-xl bg-white/[0.03] p-3">
                  <span className="text-sm font-medium text-white">{c.cuisine}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-silver">{c.outlets} outlets</span>
                    <span className="text-sm font-semibold text-emerald-400">+{c.growth}%</span>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </CommandSection>

      {/* 4. Trade Intelligence */}
      <CommandSection className="mb-14">
        <SectionHeader title="Trade Intelligence" subtitle="Campaign performance, launches, and revenue pipeline" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard title="Promotion ROI" value={`${tradeIntelligence.promotionROI}x`} icon={Target} accent="green" compact delay={0} />
          <MetricCard title="Beverage Attach" value={tradeIntelligence.beverageAttachRate} suffix="%" icon={TrendingUp} compact delay={0.05} />
          <MetricCard title="Menu Penetration" value={tradeIntelligence.menuPenetration} suffix="%" icon={ChefHat} accent="purple" compact delay={0.1} />
          <MetricCard title="Product Adoption" value={tradeIntelligence.productAdoption} suffix="%" icon={Rocket} accent="red" compact delay={0.15} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <GlassCard delay={0.1}>
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-white">
              <Megaphone className="h-4 w-4 text-electric-light" />
              Campaign Performance
            </h3>
            <div className="space-y-3">
              {tradeIntelligence.campaignPerformance.map((c) => (
                <div key={c.campaign} className="flex items-center justify-between rounded-xl bg-white/[0.03] p-4">
                  <div>
                    <p className="font-medium text-white">{c.campaign}</p>
                    <p className="text-xs text-silver">{formatNumber(c.outlets)} outlets · {c.spend}</p>
                  </div>
                  <p className="text-lg font-bold text-emerald-400">{c.roi}x</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard delay={0.15}>
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-white">
              <Rocket className="h-4 w-4 text-accent-violet" />
              Product Launch Tracking
            </h3>
            <div className="space-y-4">
              {tradeIntelligence.productLaunches.map((launch) => (
                <div key={launch.product}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-medium text-white">{launch.product}</span>
                    <span className="font-semibold text-electric-light">{launch.adoption}% / {launch.target}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-electric to-accent-violet" style={{ width: `${(launch.adoption / launch.target) * 100}%` }} />
                  </div>
                  <p className="mt-1 text-xs text-silver">{launch.cities} cities live</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <GlassCard delay={0.2}>
            <h3 className="mb-4 font-semibold text-white">Outlet Activations</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/[0.03] p-4 text-center">
                <p className="text-2xl font-bold text-white">{tradeIntelligence.outletActivations.total}</p>
                <p className="text-[10px] uppercase text-silver">Total</p>
              </div>
              <div className="rounded-xl bg-white/[0.03] p-4 text-center">
                <p className="text-2xl font-bold text-emerald-400">{tradeIntelligence.outletActivations.thisMonth}</p>
                <p className="text-[10px] uppercase text-silver">This Month</p>
              </div>
              <div className="rounded-xl bg-white/[0.03] p-4 text-center">
                <p className="text-2xl font-bold text-electric-light">{tradeIntelligence.outletActivations.completed}</p>
                <p className="text-[10px] uppercase text-silver">Completed</p>
              </div>
              <div className="rounded-xl bg-white/[0.03] p-4 text-center">
                <p className="text-2xl font-bold text-amber-400">{tradeIntelligence.outletActivations.pending}</p>
                <p className="text-[10px] uppercase text-silver">Pending</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard delay={0.25} className="lg:col-span-2">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-white">
              <ArrowUpRight className="h-4 w-4 text-emerald-400" />
              Opportunity Pipeline
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {opportunityPipeline.map((opp) => (
                <div key={opp.name} className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <div className="flex items-start justify-between">
                    <p className="font-medium text-white">{opp.name}</p>
                    <span className="rounded-full bg-electric/20 px-2 py-0.5 text-[10px] font-medium text-electric-light">{opp.stage}</span>
                  </div>
                  <p className="mt-2 text-lg font-bold text-emerald-400">{opp.value}</p>
                  <p className="text-xs text-silver">{opp.outlets} outlets</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="mt-6">
          <ChartCard title="Beverage Attachment by Cuisine" subtitle="Product mix across cuisine segments" delay={0.3}>
            <BeverageStackChart data={beverageByCuisine} />
          </ChartCard>
        </div>
      </CommandSection>

      {/* AI Action Board */}
      <CommandSection>
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-electric">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="section-label">AI Action Center</p>
            <h2 className="text-xl font-bold text-white md:text-2xl">Recommended Actions</h2>
            <p className="text-sm text-silver">AI-driven insights to maximize revenue across your network</p>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {aiActionBoard.map((action, i) => (
            <AIRecommendationCard key={action.id} {...action} delay={0.1 * i} />
          ))}
        </div>
      </CommandSection>
    </AppLayout>
  );
}
