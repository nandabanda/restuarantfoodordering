"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { Header } from "@/components/layout/Header";
import { GlassCard } from "@/components/ui/GlassCard";
import { menuCategories, menuItems } from "@/data/menu";
import { qrMenuStatus } from "@/data/metrics";
import { cn, formatCurrency } from "@/lib/utils";
import {
  Upload,
  Plus,
  QrCode,
  Star,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";
import { useState } from "react";

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filtered =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((m) => m.category === selectedCategory);

  return (
    <AppLayout>
      <Header
        title="Menu Management"
        subtitle="Digital menu editor with Pepsi pairing intelligence"
        badge="Menu Editor"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column: Upload & Add */}
        <div className="space-y-4">
          <GlassCard glow>
            <div className="flex flex-col items-center rounded-xl border-2 border-dashed border-white/10 p-8 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-electric/20">
                <Upload className="h-8 w-8 text-electric-light" />
              </div>
              <h3 className="font-semibold text-white">Upload Menu Photo</h3>
              <p className="mt-2 text-sm text-silver">
                AI-powered menu digitization from photo
              </p>
              <button className="mt-4 rounded-xl bg-electric/20 px-6 py-2.5 text-sm font-medium text-electric-light transition-colors hover:bg-electric/30">
                Choose File
              </button>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-white">
              <Plus className="h-4 w-4 text-electric-light" />
              Add New Item
            </h3>
            <div className="space-y-3">
              {["Item Name", "Price (₹)", "Category", "Description"].map((label) => (
                <div key={label}>
                  <label className="mb-1 block text-xs font-medium text-silver">{label}</label>
                  <input
                    type="text"
                    placeholder={`Enter ${label.toLowerCase()}`}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-silver/50 outline-none focus:border-electric/50"
                  />
                </div>
              ))}
              <button className="w-full rounded-xl pepsi-gradient py-2.5 text-sm font-semibold text-white">
                Add Item
              </button>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white">QR Menu Status</h3>
                <p className="text-xs text-silver">Last updated: {qrMenuStatus.lastUpdated}</p>
              </div>
              <QrCode className="h-8 w-8 text-electric-light" />
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
                Published
              </span>
              <span className="text-sm text-silver">{qrMenuStatus.scansToday} scans today</span>
            </div>
            <button className="mt-4 w-full rounded-xl border border-electric/30 bg-electric/10 py-2.5 text-sm font-medium text-electric-light">
              Republish QR Menu
            </button>
          </GlassCard>
        </div>

        {/* Right: Menu items grid */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("All")}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                selectedCategory === "All"
                  ? "bg-electric text-white"
                  : "bg-white/5 text-silver hover:bg-white/10"
              )}
            >
              All
            </button>
            {menuCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                  selectedCategory === cat
                    ? "bg-electric text-white"
                    : "bg-white/5 text-silver hover:bg-white/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {filtered.map((item) => (
              <GlassCard key={item.id} hover>
                <div className="flex gap-4">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-navy-light text-4xl">
                    {item.image}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-white">{item.name}</h3>
                          {item.isBestseller && (
                            <span className="flex items-center gap-0.5 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-medium text-amber-400">
                              <Star className="h-2.5 w-2.5 fill-amber-400" />
                              Bestseller
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-silver">{item.category}</p>
                      </div>
                      <p className="shrink-0 text-sm font-bold text-electric-light">
                        {formatCurrency(item.price)}
                      </p>
                    </div>
                    <p className="mt-2 line-clamp-2 text-xs text-silver">{item.description}</p>
                    {item.pepsiPairing && (
                      <div className="mt-2 inline-flex items-center gap-1 rounded-lg bg-pepsi-red/10 px-2 py-1 text-[10px] font-medium text-pepsi-red">
                        <Sparkles className="h-3 w-3" />
                        Pairs with {item.pepsiPairing}
                      </div>
                    )}
                    <div className="mt-3 flex gap-2">
                      <button className="flex-1 rounded-lg bg-white/5 py-1.5 text-xs font-medium text-silver hover:bg-white/10">
                        Edit
                      </button>
                      <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-silver hover:bg-white/10">
                        <ImageIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
