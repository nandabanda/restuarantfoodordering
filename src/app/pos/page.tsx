"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { Header } from "@/components/layout/Header";
import { GlassCard } from "@/components/ui/GlassCard";
import { menuItems, posTables } from "@/data/menu";
import { beverageCombos } from "@/data/products";
import { cn, formatCurrency } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Minus,
  Plus,
  Trash2,
  Receipt,
  CreditCard,
  Banknote,
  Smartphone,
  Sparkles,
  Tag,
} from "lucide-react";
import { useState } from "react";

type OrderMode = "dine-in" | "takeaway" | "delivery";
type PaymentMethod = "cash" | "upi" | "card";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const TAX_RATE = 0.05;
const PROMO_DISCOUNT = 0.1;

export default function POSPage() {
  const [selectedTable, setSelectedTable] = useState<number | null>(2);
  const [orderMode, setOrderMode] = useState<OrderMode>("dine-in");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [promoApplied, setPromoApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [showInvoice, setShowInvoice] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(menuItems.map((m) => m.category)))];

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((m) => m.category === selectedCategory);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = promoApplied ? subtotal * PROMO_DISCOUNT : 0;
  const taxable = subtotal - discount;
  const tax = taxable * TAX_RATE;
  const total = taxable + tax;

  const addToCart = (item: (typeof menuItems)[0]) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, quantity: c.quantity + delta } : c))
        .filter((c) => c.quantity > 0)
    );
  };

  const addCombo = (combo: (typeof beverageCombos)[0]) => {
    setCart((prev) => [
      ...prev,
      { id: combo.id, name: combo.name, price: combo.price, quantity: 1 },
    ]);
  };

  const tableStatusColor = {
    available: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
    occupied: "border-electric/40 bg-electric/10 text-electric-light",
    billing: "border-amber-500/40 bg-amber-500/10 text-amber-400",
  };

  return (
    <AppLayout>
      <Header
        title="POS Billing"
        subtitle="Paradise Biryani · Fast checkout with intelligent beverage upsell"
        badge="Live POS"
      />

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Left: Tables & Menu */}
        <div className="space-y-6 xl:col-span-2">
          {/* Table selection */}
          <GlassCard>
            <h3 className="mb-3 text-sm font-semibold text-white">Select Table</h3>
            <div className="flex flex-wrap gap-2">
              {posTables.map((table) => (
                <button
                  key={table.id}
                  onClick={() => setSelectedTable(table.number)}
                  className={cn(
                    "flex h-14 w-14 flex-col items-center justify-center rounded-xl border text-sm font-semibold transition-all",
                    selectedTable === table.number
                      ? "border-electric bg-electric/20 text-white shadow-lg shadow-electric/20"
                      : tableStatusColor[table.status]
                  )}
                >
                  <span>T{table.number}</span>
                  {table.guests > 0 && (
                    <span className="text-[10px] opacity-70">{table.guests}p</span>
                  )}
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Order mode */}
          <div className="flex gap-2">
            {(["dine-in", "takeaway", "delivery"] as OrderMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setOrderMode(mode)}
                className={cn(
                  "flex-1 rounded-xl py-2.5 text-sm font-medium capitalize transition-all",
                  orderMode === mode
                    ? "bg-electric text-white shadow-lg shadow-electric/20"
                    : "bg-white/5 text-silver hover:bg-white/10"
                )}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Beverage combo recommendation */}
          <GlassCard glow className="border-electric/20">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-violet/20">
                <Sparkles className="h-5 w-5 text-accent-violet" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white">Beverage Combo Recommendation</p>
                <p className="text-sm text-silver">Boost attach rate — suggest with every biryani order</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {beverageCombos.slice(0, 2).map((combo) => (
                    <button
                      key={combo.id}
                      onClick={() => addCombo(combo)}
                      className="rounded-lg bg-electric/20 px-3 py-1.5 text-xs font-medium text-electric-light transition-colors hover:bg-electric/30"
                    >
                      + {combo.name} ({formatCurrency(combo.price)})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                  selectedCategory === cat
                    ? "bg-electric text-white"
                    : "bg-white/5 text-silver hover:bg-white/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu tiles */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {filteredItems.map((item) => (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => addToCart(item)}
                className="glass-card flex flex-col items-center p-4 text-center transition-all hover:border-electric/30 hover:shadow-lg hover:shadow-electric/10"
              >
                <span className="text-3xl">{item.image}</span>
                <p className="mt-2 text-sm font-medium text-white line-clamp-2">{item.name}</p>
                <p className="mt-1 text-sm font-semibold text-electric-light">
                  {formatCurrency(item.price)}
                </p>
                {item.isVeg && (
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" title="Veg" />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right: Cart & Bill */}
        <div className="space-y-4">
          <GlassCard className="sticky top-4">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Cart {selectedTable && `· Table ${selectedTable}`}
            </h3>

            {cart.length === 0 ? (
              <p className="py-8 text-center text-sm text-silver">Tap menu items to add</p>
            ) : (
              <div className="max-h-64 space-y-2 overflow-y-auto">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center justify-between rounded-xl bg-white/5 p-3"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-white">{item.name}</p>
                        <p className="text-xs text-silver">{formatCurrency(item.price)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg bg-electric/30"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Promo */}
            <button
              onClick={() => setPromoApplied(!promoApplied)}
              className={cn(
                "mt-4 flex w-full items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all",
                promoApplied
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                  : "border-white/10 bg-white/5 text-silver hover:bg-white/10"
              )}
            >
              <Tag className="h-4 w-4" />
              {promoApplied ? "COMBO10 Applied (10% off)" : "Apply COMBO10 Promo"}
            </button>

            {/* Totals */}
            <div className="mt-4 space-y-2 border-t border-white/10 pt-4 text-sm">
              <div className="flex justify-between text-silver">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-silver">
                <span>GST (5%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-white">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Payment methods */}
            <div className="mt-4">
              <p className="mb-2 text-xs font-medium text-silver">Payment Method</p>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { id: "cash" as const, icon: Banknote, label: "Cash" },
                  { id: "upi" as const, icon: Smartphone, label: "UPI" },
                  { id: "card" as const, icon: CreditCard, label: "Card" },
                ]).map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setPaymentMethod(id)}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-xl py-2.5 text-xs font-medium transition-all",
                      paymentMethod === id
                        ? "bg-electric/20 text-electric-light border border-electric/30"
                        : "bg-white/5 text-silver hover:bg-white/10"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowInvoice(true)}
              disabled={cart.length === 0}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl brand-gradient py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100"
            >
              <Receipt className="h-4 w-4" />
              Generate Bill
            </button>

            {cart.length > 0 && (
              <button
                onClick={() => setCart([])}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-2 text-xs text-silver hover:text-red-400"
              >
                <Trash2 className="h-3 w-3" /> Clear Cart
              </button>
            )}
          </GlassCard>
        </div>
      </div>

      {/* Invoice Preview Modal */}
      <AnimatePresence>
        {showInvoice && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInvoice(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-x-4 top-[10%] z-50 mx-auto max-w-md rounded-2xl bg-white p-6 text-gray-900 shadow-2xl md:inset-x-auto"
            >
              <div className="border-b border-gray-200 pb-4 text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0054A6]">
                  <span className="text-lg font-black text-white">P</span>
                </div>
                <h2 className="text-lg font-bold">Paradise Biryani</h2>
                <p className="text-xs text-gray-500">Hyderabad · GSTIN: 36AABCP1234F1Z5</p>
                <p className="mt-1 text-xs text-gray-500">
                  Table {selectedTable} · {orderMode} · {new Date().toLocaleString("en-IN")}
                </p>
              </div>
              <div className="my-4 space-y-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="space-y-1 border-t border-gray-200 pt-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>COMBO10 Discount</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Payment</span>
                  <span className="uppercase">{paymentMethod}</span>
                </div>
              </div>
              <p className="mt-4 text-center text-xs text-gray-400">
                Thank you! Enjoy your meal 🥤
              </p>
              <button
                onClick={() => {
                  setShowInvoice(false);
                  setCart([]);
                }}
                className="mt-4 w-full rounded-xl bg-[#0054A6] py-3 text-sm font-semibold text-white"
              >
                Done & New Order
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </AppLayout>
  );
}
