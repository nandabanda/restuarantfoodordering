"use client";

import { ProductCard } from "@/components/ui/ProductCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { productModules } from "@/data/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  ChefHat,
  Globe,
  Sparkles,
  Store,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

const restaurantValues = [
  { icon: Store, title: "Unified POS & Billing", desc: "Fast checkout with intelligent beverage combo upsell built in" },
  { icon: ChefHat, title: "Digital Menu Management", desc: "Update menus instantly, publish QR in one click" },
  { icon: TrendingUp, title: "Sales Intelligence", desc: "Real-time dashboards for footfall and average ticket size" },
  { icon: Sparkles, title: "AI Recommendations", desc: "Smart prompts to boost beverage attach rates" },
];

const enterpriseValues = [
  { icon: Globe, title: "Pan-India Network Visibility", desc: "Track restaurant performance across cities and cuisine segments" },
  { icon: BarChart3, title: "Attach Rate Analytics", desc: "Monitor beverage penetration by cuisine, city, and daypart" },
  { icon: Zap, title: "Trade Campaign Performance", desc: "Measure promotion ROI and new product adoption" },
  { icon: Users, title: "Consumer Intelligence", desc: "Ordering behavior, cohorts, segmentation & revenue opportunities" },
];

export default function LandingPage() {
  return (
    <div className="hero-gradient grid-pattern min-h-screen">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8 md:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl brand-gradient shadow-lg brand-glow">
            <span className="text-xl font-black text-white">S</span>
          </div>
          <div>
            <p className="text-base font-bold text-white">ServePulse™</p>
            <p className="text-xs text-electric-light">by SYDIAI</p>
          </div>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/restaurant" className="rounded-xl px-4 py-2 text-sm font-medium text-silver transition-colors hover:text-white">
            Restaurant
          </Link>
          <Link href="/command-center" className="rounded-xl brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-electric/20 transition-all hover:scale-[1.02]">
            Command Center
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-6 pb-24 pt-16 md:px-10 md:pt-24">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center">
          <span className="section-label mb-8 inline-flex items-center gap-2 rounded-full border border-electric/25 bg-electric/10 px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Commerce Platform
          </span>
          <h1 className="mx-auto max-w-5xl text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-7xl lg:text-8xl">
            ServePulse<span className="text-electric-light">™</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl font-medium text-white/90 md:text-2xl">
            Restaurant Commerce. Consumer Intelligence. Revenue Growth.
          </p>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-silver md:text-lg">
            An AI-powered platform that helps restaurants manage billing, menus, ordering, promotions, and customer engagement while enabling brands and distributors to unlock consumer, menu, footfall, and outlet intelligence.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/command-center" className="group flex items-center gap-2 rounded-xl brand-gradient px-8 py-4 text-base font-semibold text-white shadow-xl shadow-electric/25 transition-transform hover:scale-[1.02]">
              Open Command Center
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/pos" className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-8 py-4 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white/10">
              Restaurant POS
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-5 md:grid-cols-4">
          {[
            { label: "Restaurants", value: "4,769" },
            { label: "Monthly Orders", value: "2.1M+" },
            { label: "Beverage Attach", value: "64.8%" },
            { label: "Cities Live", value: "6" },
          ].map((stat, i) => (
            <GlassCard key={stat.label} delay={0.1 * i} className="text-center">
              <p className="text-2xl font-bold text-white md:text-3xl">{stat.value}</p>
              <p className="mt-2 text-xs uppercase tracking-wide text-silver">{stat.label}</p>
            </GlassCard>
          ))}
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="mb-12 text-center">
          <p className="section-label mb-3">Platform Modules</p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">Complete Commerce Stack</h2>
          <p className="mx-auto mt-4 max-w-2xl text-silver">End-to-end restaurant operations and enterprise intelligence for brands, distributors, and chains</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productModules.map((mod, i) => (
            <ProductCard key={mod.title} {...mod} delay={0.1 * i} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="grid gap-8 lg:grid-cols-2">
          <GlassCard glow className="p-8 md:p-10">
            <p className="section-label mb-3">For Restaurants</p>
            <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl">Operational Excellence</h2>
            <p className="mb-8 text-silver">Everything a modern restaurant needs to grow revenue and delight customers</p>
            <div className="space-y-4">
              {restaurantValues.map((item) => (
                <div key={item.title} className="flex gap-4 rounded-xl bg-white/[0.03] p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-electric/20">
                    <item.icon className="h-5 w-5 text-electric-light" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-silver">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard glow className="p-8 md:p-10">
            <p className="section-label mb-3">For Brands & Distributors</p>
            <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl">Enterprise Intelligence</h2>
            <p className="mb-8 text-silver">Real-time visibility across your entire restaurant network</p>
            <div className="space-y-4">
              {enterpriseValues.map((item) => (
                <div key={item.title} className="flex gap-4 rounded-xl bg-white/[0.03] p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-violet/20">
                    <item.icon className="h-5 w-5 text-accent-violet" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-silver">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="mb-12 text-center">
          <p className="section-label mb-3">Get Started</p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">Explore the Platform</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Restaurant POS", desc: "Billing, tables, cart & invoice preview", href: "/pos", gradient: "from-blue-600 to-cyan-500" },
            { title: "Consumer App", desc: "Discover restaurants & order with beverage combos", href: "/consumer", gradient: "from-indigo-600 to-purple-500" },
            { title: "Command Center", desc: "Enterprise intelligence & AI action board", href: "/command-center", gradient: "from-violet-600 to-blue-700" },
          ].map((cta, i) => (
            <Link key={cta.title} href={cta.href}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${cta.gradient} p-8 brand-glow transition-transform hover:scale-[1.02]`}>
                <div className="absolute inset-0 bg-black/15" />
                <div className="relative">
                  <h3 className="text-xl font-bold text-white">{cta.title}</h3>
                  <p className="mt-2 text-sm text-white/80">{cta.desc}</p>
                  <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-white">
                    Launch <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/5 py-10 text-center">
        <p className="text-sm text-silver">© 2026 SYDIAI · ServePulse™ · Restaurant Commerce Platform</p>
      </footer>
    </div>
  );
}
