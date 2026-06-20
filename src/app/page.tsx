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
  { icon: Store, title: "Unified POS & Billing", desc: "Fast checkout with Pepsi combo upsell built in" },
  { icon: ChefHat, title: "Digital Menu Management", desc: "Update menus instantly, publish QR in one click" },
  { icon: TrendingUp, title: "Sales Intelligence", desc: "Real-time dashboards for footfall and AOV" },
  { icon: Sparkles, title: "AI Recommendations", desc: "Smart prompts to boost beverage attach rates" },
];

const pepsiValues = [
  { icon: Globe, title: "Pan-India HORECA Visibility", desc: "4,700+ restaurants across 6 major cities" },
  { icon: BarChart3, title: "Attach Rate Analytics", desc: "Track Pepsi product penetration by cuisine & city" },
  { icon: Zap, title: "Trade Deal Performance", desc: "Measure promo ROI and new launch adoption" },
  { icon: Users, title: "Consumer Intelligence", desc: "Ordering behavior, segmentation & opportunities" },
];

export default function LandingPage() {
  return (
    <div className="hero-gradient grid-pattern min-h-screen">
      {/* Nav */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 md:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl pepsi-gradient shadow-lg pepsi-glow">
            <span className="text-xl font-black text-white">P</span>
          </div>
          <div>
            <p className="text-base font-bold text-white">Pepsi HORECA Pulse</p>
            <p className="text-xs text-electric-light">by PepsiCo India</p>
          </div>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/restaurant"
            className="rounded-xl px-4 py-2 text-sm font-medium text-silver transition-colors hover:text-white"
          >
            Restaurant
          </Link>
          <Link
            href="/pepsi-command"
            className="rounded-xl bg-electric px-4 py-2 text-sm font-medium text-white transition-all hover:bg-electric-light"
          >
            Command Center
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-12 md:px-8 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-4 py-1.5 text-sm font-medium text-electric-light">
            <Sparkles className="h-4 w-4" />
            Enterprise HORECA Platform · Demo
          </span>
          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
            Restaurant Commerce &{" "}
            <span className="pepsi-gradient-text">HORECA Intelligence OS</span>{" "}
            for Pepsi India
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-silver md:text-xl">
            Billing. QR Menus. Ordering. Promotions. Trade Deals. Consumer Intelligence.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/pos"
              className="group flex items-center gap-2 rounded-xl pepsi-gradient px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-electric/25 transition-transform hover:scale-105"
            >
              Launch Restaurant POS
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/pepsi-command"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              Pepsi Command Center
            </Link>
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4"
        >
          {[
            { label: "Restaurants", value: "4,769" },
            { label: "Daily Bills", value: "71K+" },
            { label: "Pepsi Attach", value: "64.8%" },
            { label: "Cities Live", value: "6" },
          ].map((stat, i) => (
            <GlassCard key={stat.label} delay={0.1 * i} className="text-center">
              <p className="text-2xl font-bold text-white md:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs text-silver md:text-sm">{stat.label}</p>
            </GlassCard>
          ))}
        </motion.div>
      </section>

      {/* Product Modules */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">Product Modules</h2>
          <p className="mt-3 text-silver">End-to-end HORECA commerce stack for restaurants and Pepsi enterprise teams</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productModules.map((mod, i) => (
            <ProductCard key={mod.title} {...mod} delay={0.1 * i} />
          ))}
        </div>
      </section>

      {/* Value sections */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <GlassCard glow className="p-8">
            <h2 className="mb-2 text-2xl font-bold text-white">Value for Restaurants</h2>
            <p className="mb-6 text-silver">Everything a modern Indian restaurant needs to grow</p>
            <div className="space-y-4">
              {restaurantValues.map((item) => (
                <div key={item.title} className="flex gap-4 rounded-xl bg-white/5 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-electric/20">
                    <item.icon className="h-5 w-5 text-electric-light" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-sm text-silver">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard glow className="p-8">
            <h2 className="mb-2 text-2xl font-bold text-white">Value for Pepsi</h2>
            <p className="mb-6 text-silver">Enterprise-grade HORECA intelligence at scale</p>
            <div className="space-y-4">
              {pepsiValues.map((item) => (
                <div key={item.title} className="flex gap-4 rounded-xl bg-white/5 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-pepsi-red/20">
                    <item.icon className="h-5 w-5 text-pepsi-red" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-sm text-silver">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* CTA Cards */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">Explore the Demo</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Restaurant POS",
              desc: "Billing, tables, cart & invoice preview",
              href: "/pos",
              gradient: "from-blue-600 to-cyan-500",
            },
            {
              title: "Consumer App",
              desc: "Discover restaurants & order with Pepsi combos",
              href: "/consumer",
              gradient: "from-indigo-600 to-purple-500",
            },
            {
              title: "Pepsi Command Center",
              desc: "Enterprise HORECA intelligence dashboard",
              href: "/pepsi-command",
              gradient: "from-red-600 to-blue-700",
            },
          ].map((cta, i) => (
            <Link key={cta.title} href={cta.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${cta.gradient} p-8 pepsi-glow transition-transform hover:scale-[1.02]`}
              >
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative">
                  <h3 className="text-xl font-bold text-white">{cta.title}</h3>
                  <p className="mt-2 text-sm text-white/80">{cta.desc}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-white">
                    Open Demo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center">
        <p className="text-sm text-silver">
          © 2026 PepsiCo India · Pepsi HORECA Pulse · Demo Application
        </p>
      </footer>
    </div>
  );
}
