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
import { orderSummaryMetrics } from "@/data/orders";
import { attachRateTrend, weeklySalesTrend } from "@/data/analytics";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
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
  PlusCircle,
  Clock,
  CheckCircle2,
  Receipt,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const orderSummaryCards = [
  {
    label: "Open Orders",
    value: orderSummaryMetrics.openOrders,
    icon: Clock,
    color: "text-electric-light",
    bg: "bg-electric/10",
  },
  {
    label: "Kitchen Pending",
    value: orderSummaryMetrics.kitchenPending,
    icon: ChefHat,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    label: "Ready for Billing",
    value: orderSummaryMetrics.readyForBilling,
    icon: Receipt,
    color: "text-accent-violet",
    bg: "bg-accent-violet/10",
  },
  {
    label: "Paid Orders Today",
    value: orderSummaryMetrics.paidToday,
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];

export default function RestaurantDashboard() {
  return (
    <AppLayout>
      <Header
        title="Restaurant Dashboard"
        subtitle="Spice Garden Kitchen · Jubilee Hills, Hyderabad · Live operations"
        badge="Owner View"
      />

      {/* Generate New Order CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link href="/pos">
          <GlassCard glow hover className="group cursor-pointer border-electric/20 p-6 md:p-8">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl brand-gradient shadow-lg">
                  <PlusCircle className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white md:text-2xl">Generate New Order</h2>
                  <p className="mt-1 text-sm text-silver">
                    Create order · Send to kitchen · Bill · Collect payment · Print receipt
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform group-hover:scale-[1.02]">
                Open POS
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { label: "Dine-In", href: "/pos?type=dine-in" },
                { label: "Takeaway", href: "/pos?type=takeaway" },
                { label: "Delivery", href: "/pos?type=delivery" },
              ].map((opt) => (
                <Link
                  key={opt.label}
                  href={opt.href}
                  onClick={(e) => e.stopPropagation()}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-silver transition-colors hover:border-electric/30 hover:text-white"
                >
                  {opt.label}
                </Link>
              ))}
            </div>
          </GlassCard>
        </Link>
      </motion.div>

      {/* Active Order Summary */}
      <div className="mb-8">
        <p className="section-label mb-3">Live Orders</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {orderSummaryCards.map((card, i) => (
            <GlassCard key={card.label} delay={0.05 * i} hover>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-silver">{card.label}</p>
                  <p className="mt-1 text-3xl font-bold text-white">{card.value}</p>
                </div>
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.bg}`}>
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <MetricCard title="Today's Sales" value={restaurantMetrics.todaySales} change={restaurantMetrics.salesChange} icon={DollarSign} isCurrency delay={0} />
        <MetricCard title="Bills Generated" value={restaurantMetrics.billsGenerated} change={restaurantMetrics.billsChange} icon={FileText} delay={0.05} />
        <MetricCard title="Footfall" value={restaurantMetrics.footfall} change={restaurantMetrics.footfallChange} icon={Footprints} delay={0.1} />
        <MetricCard title="Avg Order Value" value={restaurantMetrics.avgOrderValue} change={restaurantMetrics.aovChange} icon={ShoppingCart} isCurrency delay={0.15} />
        <MetricCard title="Beverage Attach Rate" value={restaurantMetrics.beverageAttachRate} change={restaurantMetrics.attachChange} icon={Percent} suffix="%" delay={0.2} accent="red" />
        <MetricCard title="Active Tables" value={`${restaurantMetrics.activeTables}/${restaurantMetrics.totalTables}`} icon={Table2} delay={0.25} accent="green" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ChartCard title="Weekly Sales Trend" subtitle="Revenue across the week" delay={0.1}>
          <SalesBarChart data={weeklySalesTrend} />
        </ChartCard>
        <ChartCard title="Beverage Attach Rate Trend" subtitle="6-week performance" delay={0.15}>
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
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-electric">
                  <ChefHat className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">AI Menu Digitizer</p>
                  <p className="text-sm text-silver">Upload, digitize & publish menus</p>
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
