"use client";

import { AttachRateLineChart, SalesBarChart } from "@/components/charts/DashboardCharts";
import { AppLayout } from "@/components/layout/AppLayout";
import { Header } from "@/components/layout/Header";
import { AIRecommendationCard } from "@/components/ui/AIRecommendationCard";
import { ChartCard } from "@/components/ui/ChartCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { MetricCard } from "@/components/ui/MetricCard";
import { OfferCard } from "@/components/ui/OfferCard";
import {
  activeOffers,
  aiRecommendations,
  qrMenuStatus,
  restaurantMetrics,
  topSellingItems,
} from "@/data/metrics";
import { attachRateTrend, weeklySalesTrend } from "@/data/analytics";
import { formatCurrency } from "@/lib/utils";
import {
  DollarSign,
  FileText,
  Footprints,
  Percent,
  QrCode,
  ShoppingCart,
  Table2,
  TrendingUp,
  ChefHat,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function RestaurantDashboard() {
  return (
    <AppLayout>
      <Header
        title="Restaurant Dashboard"
        subtitle="Paradise Biryani · Hyderabad · Live operations overview"
        badge="Owner View"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <MetricCard title="Today's Sales" value={restaurantMetrics.todaySales} change={restaurantMetrics.salesChange} icon={DollarSign} isCurrency delay={0} />
        <MetricCard title="Bills Generated" value={restaurantMetrics.billsGenerated} change={restaurantMetrics.billsChange} icon={FileText} delay={0.05} />
        <MetricCard title="Footfall" value={restaurantMetrics.footfall} change={restaurantMetrics.footfallChange} icon={Footprints} delay={0.1} />
        <MetricCard title="Avg Order Value" value={restaurantMetrics.avgOrderValue} change={restaurantMetrics.aovChange} icon={ShoppingCart} isCurrency delay={0.15} />
        <MetricCard title="Pepsi Attach Rate" value={restaurantMetrics.pepsiAttachRate} change={restaurantMetrics.attachChange} icon={Percent} suffix="%" delay={0.2} accent="red" />
        <MetricCard title="Active Tables" value={`${restaurantMetrics.activeTables}/${restaurantMetrics.totalTables}`} icon={Table2} delay={0.25} accent="green" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ChartCard title="Weekly Sales Trend" subtitle="Revenue across the week" delay={0.1}>
          <SalesBarChart data={weeklySalesTrend} />
        </ChartCard>
        <ChartCard title="Pepsi Attach Rate Trend" subtitle="6-week performance" delay={0.15}>
          <AttachRateLineChart data={attachRateTrend} />
        </ChartCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <GlassCard delay={0.2} className="lg:col-span-1">
          <h3 className="mb-4 text-lg font-semibold text-white">Top Selling Items</h3>
          <div className="space-y-3">
            {topSellingItems.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-electric/20 text-xs font-bold text-electric-light">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white">{item.name}</p>
                    <p className="text-xs text-silver">{item.orders} orders</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-white">{formatCurrency(item.revenue)}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Active Offers</h3>
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </div>
          {activeOffers.map((offer, i) => (
            <OfferCard key={offer.id} {...offer} delay={0.1 * i} />
          ))}
        </div>

        <div className="space-y-4">
          <GlassCard delay={0.25}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">QR Menu Status</h3>
              <QrCode className="h-5 w-5 text-electric-light" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-silver">Status</span>
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                  {qrMenuStatus.isPublished ? "Published" : "Draft"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-silver">Scans Today</span>
                <span className="text-sm font-semibold text-white">{qrMenuStatus.scansToday}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-silver">QR Orders</span>
                <span className="text-sm font-semibold text-white">{qrMenuStatus.ordersViaQR}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-silver">Conversion</span>
                <span className="text-sm font-semibold text-electric-light">{qrMenuStatus.conversionRate}%</span>
              </div>
            </div>
            <Link
              href="/qr-menu"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-electric/20 py-2.5 text-sm font-medium text-electric-light transition-colors hover:bg-electric/30"
            >
              View QR Menu <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </GlassCard>

          <Link href="/menu">
            <GlassCard hover delay={0.3} className="cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500">
                  <ChefHat className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Menu Management</p>
                  <p className="text-sm text-silver">Edit items, categories & Pepsi pairings</p>
                </div>
              </div>
            </GlassCard>
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-4 text-lg font-semibold text-white">AI Recommendations</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {aiRecommendations.map((rec, i) => (
            <AIRecommendationCard key={rec.id} {...rec} delay={0.1 * i} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
