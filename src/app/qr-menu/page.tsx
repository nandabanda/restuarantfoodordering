"use client";

import { menuCategories, menuItems } from "@/data/menu";
import { cn, formatCurrency } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, ShoppingBag, Sparkles, Smartphone } from "lucide-react";
import { useState } from "react";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function QRMenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [showCombo, setShowCombo] = useState(true);
  const tableNumber = 7;

  const filtered =
    selectedCategory === "All"
      ? menuItems.filter((m) => m.category !== "Combos")
      : menuItems.filter((m) => m.category === selectedCategory);

  const addItem = (item: (typeof menuItems)[0]) => {
    setOrder((prev) => {
      const existing = prev.find((o) => o.id === item.id);
      if (existing) {
        return prev.map((o) =>
          o.id === item.id ? { ...o, quantity: o.quantity + 1 } : o
        );
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setOrder((prev) =>
      prev
        .map((o) => (o.id === id ? { ...o, quantity: o.quantity + delta } : o))
        .filter((o) => o.quantity > 0)
    );
  };

  const total = order.reduce((sum, o) => sum + o.price * o.quantity, 0);
  const itemCount = order.reduce((sum, o) => sum + o.quantity, 0);

  return (
    <div className="mx-auto min-h-screen max-w-lg bg-background">
      {/* Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0054A6] to-[#0F1F3D] px-4 pb-6 pt-8">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <span className="text-lg font-black text-white">P</span>
            </div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
              Table {tableNumber}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white">Paradise Biryani</h1>
          <p className="text-sm text-white/70">Hyderabad · Authentic Dum Biryani</p>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Open · QR Menu Active
          </div>
        </div>
      </div>

      {/* No app download */}
      <div className="mx-4 -mt-3 rounded-xl border border-white/10 bg-navy-light/80 p-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <Smartphone className="h-5 w-5 shrink-0 text-electric-light" />
          <p className="text-xs text-silver">
            <span className="font-medium text-white">No app download needed.</span> Scan, browse & order directly from your browser.
          </p>
        </div>
      </div>

      {/* Beverage combo prompt */}
      <AnimatePresence>
        {showCombo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-4 mt-4 overflow-hidden rounded-xl border border-electric/20 bg-electric/5 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-3">
                <Sparkles className="h-5 w-5 shrink-0 text-electric-light" />
                <div>
                  <p className="text-sm font-semibold text-white">Beverage Combo Deal!</p>
                  <p className="text-xs text-silver">Biryani + Cola Classic @ ₹349 — Save ₹50</p>
                  <button
                    onClick={() => {
                      addItem(menuItems.find((m) => m.id === "m11")!);
                      setShowCombo(false);
                    }}
                    className="mt-2 rounded-lg bg-electric/20 px-3 py-1 text-xs font-medium text-electric-light"
                  >
                    Add Combo
                  </button>
                </div>
              </div>
              <button onClick={() => setShowCombo(false)} className="text-xs text-silver">
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categories */}
      <div className="sticky top-0 z-10 border-b border-white/5 bg-background/95 px-4 py-3 backdrop-blur">
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setSelectedCategory("All")}
            className={cn(
              "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium",
              selectedCategory === "All" ? "bg-electric text-white" : "bg-white/5 text-silver"
            )}
          >
            All
          </button>
          {menuCategories.filter((c) => c !== "Combos").map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium",
                selectedCategory === cat ? "bg-electric text-white" : "bg-white/5 text-silver"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu items */}
      <div className="space-y-3 p-4 pb-32">
        {filtered.map((item) => (
          <motion.div
            key={item.id}
            layout
            className="flex gap-3 rounded-xl border border-white/5 bg-navy-light/50 p-3"
          >
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white/5 text-2xl">
              {item.image}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="line-clamp-1 text-xs text-silver">{item.description}</p>
                </div>
                <p className="shrink-0 text-sm font-bold text-electric-light">
                  {formatCurrency(item.price)}
                </p>
              </div>
              {item.beveragePairing && (
                <p className="mt-1 text-[10px] text-electric-light">🥤 Pairs with {item.beveragePairing}</p>
              )}
              <button
                onClick={() => addItem(item)}
                className="mt-2 rounded-lg bg-electric/20 px-4 py-1 text-xs font-medium text-electric-light"
              >
                Add to Order
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating order bar */}
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-navy/95 p-4 backdrop-blur-xl"
          >
            <div className="mx-auto max-w-lg">
              <div className="mb-3 max-h-24 space-y-1 overflow-y-auto">
                {order.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <span className="text-white">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(item.id, -1)} className="flex h-6 w-6 items-center justify-center rounded bg-white/10">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-4 text-center text-white">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="flex h-6 w-6 items-center justify-center rounded bg-electric/30">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="flex w-full items-center justify-between rounded-xl brand-gradient px-5 py-3.5 font-semibold text-white shadow-lg">
                <span className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Place Order · {itemCount} items
                </span>
                <span>{formatCurrency(total)}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
