"use client";

import {
  digitizedMenuCategories,
  qrPreviewCombo,
  uploadedMenuPreview,
} from "@/data/menu";
import { cn, formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import { Plus, Smartphone, Sparkles } from "lucide-react";
import { useState } from "react";

export function QRMenuPreview() {
  const [activeTab, setActiveTab] = useState(digitizedMenuCategories[0].id);
  const activeCategory = digitizedMenuCategories.find((c) => c.id === activeTab)!;

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-background shadow-2xl shadow-electric/10">
        {/* Mobile header */}
        <div className="bg-gradient-to-br from-electric to-navy-light px-4 pb-5 pt-6">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
              <span className="text-sm font-black text-white">S</span>
            </div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-medium text-white">
              Table 12
            </span>
          </div>
          <h3 className="text-lg font-bold text-white">{uploadedMenuPreview.restaurantName}</h3>
          <p className="text-xs text-white/70">{uploadedMenuPreview.location}</p>
          <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-medium text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            QR Menu Live
          </div>
        </div>

        {/* No app message */}
        <div className="mx-3 -mt-2.5 rounded-lg border border-white/10 bg-navy-light/90 px-3 py-2 backdrop-blur">
          <div className="flex items-center gap-2">
            <Smartphone className="h-3.5 w-3.5 shrink-0 text-electric-light" />
            <p className="text-[10px] text-silver">
              <span className="font-medium text-white">No app download required.</span> Order from browser.
            </p>
          </div>
        </div>

        {/* Combo prompt */}
        <div className="mx-3 mt-3 rounded-xl border border-electric/20 bg-electric/5 p-3">
          <div className="flex items-start gap-2">
            <Sparkles className="h-4 w-4 shrink-0 text-electric-light" />
            <div>
              <p className="text-xs font-semibold text-white">{qrPreviewCombo.title}</p>
              <p className="text-[10px] text-silver">{qrPreviewCombo.description}</p>
              <p className="mt-1 text-sm font-bold text-electric-light">
                {formatCurrency(qrPreviewCombo.price)}{" "}
                <span className="text-[10px] font-normal line-through text-silver">
                  {formatCurrency(qrPreviewCombo.originalPrice)}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Category tabs */}
        <div className="mt-3 flex gap-1.5 overflow-x-auto px-3 pb-1">
          {digitizedMenuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1 text-[10px] font-medium transition-all",
                activeTab === cat.id ? "bg-electric text-white" : "bg-white/5 text-silver"
              )}
            >
              {cat.icon} {cat.name.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="max-h-64 space-y-2 overflow-y-auto p-3">
          {activeCategory.items.slice(0, 5).map((item) => (
            <motion.div
              key={item.id}
              layout
              className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-2.5"
            >
              <div>
                <p className="text-xs font-medium text-white">{item.name}</p>
                <p className="text-[10px] text-silver">{item.isVeg ? "🟢 Veg" : "🔴 Non-Veg"}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-electric-light">{formatCurrency(item.price)}</span>
                <button className="flex h-6 w-6 items-center justify-center rounded-md bg-electric/20">
                  <Plus className="h-3 w-3 text-electric-light" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Place order */}
        <div className="border-t border-white/5 p-3">
          <button className="w-full rounded-xl brand-gradient py-2.5 text-xs font-semibold text-white">
            Place Order · 0 items
          </button>
        </div>
      </div>
    </div>
  );
}
