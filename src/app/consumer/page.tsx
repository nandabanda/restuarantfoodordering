"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { Header } from "@/components/layout/Header";
import { GlassCard } from "@/components/ui/GlassCard";
import { RestaurantCard } from "@/components/ui/RestaurantCard";
import { cuisineFilters, restaurants } from "@/data/restaurants";
import { pepsiCombos } from "@/data/pepsi";
import { cn, formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  MapPin,
  RotateCcw,
  Sparkles,
  Truck,
  UtensilsCrossed,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";

type DeliveryMode = "all" | "dine-in" | "takeaway" | "delivery";

export default function ConsumerPage() {
  const [selectedCuisine, setSelectedCuisine] = useState<string>("All");
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("all");

  const filtered = restaurants.filter((r) => {
    const cuisineMatch = selectedCuisine === "All" || r.cuisine === selectedCuisine;
    const modeMatch =
      deliveryMode === "all" || r.deliveryModes.includes(deliveryMode);
    return cuisineMatch && modeMatch && r.isOpen;
  });

  const orderAgain = restaurants.slice(0, 3);

  return (
    <AppLayout>
      <Header
        title="Discover & Order"
        subtitle="Find nearby restaurants with Pepsi combo offers"
        badge="Consumer App"
      />

      {/* Location bar */}
      <GlassCard className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric/20">
            <MapPin className="h-5 w-5 text-electric-light" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Hitech City, Hyderabad</p>
            <p className="text-xs text-silver">Showing restaurants within 5 km</p>
          </div>
        </div>
      </GlassCard>

      {/* Delivery mode toggle */}
      <div className="mb-6 flex gap-2">
        {([
          { id: "all" as const, icon: Sparkles, label: "All" },
          { id: "dine-in" as const, icon: UtensilsCrossed, label: "Dine-in" },
          { id: "takeaway" as const, icon: ShoppingBag, label: "Takeaway" },
          { id: "delivery" as const, icon: Truck, label: "Delivery" },
        ]).map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setDeliveryMode(id)}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-all",
              deliveryMode === id
                ? "bg-electric text-white shadow-lg shadow-electric/20"
                : "bg-white/5 text-silver hover:bg-white/10"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Pepsi combo offers */}
      <div className="mb-6">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
          <Sparkles className="h-5 w-5 text-pepsi-red" />
          Pepsi Combo Offers
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {pepsiCombos.map((combo, i) => (
            <motion.div
              key={combo.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="w-64 shrink-0 rounded-xl border border-electric/20 bg-gradient-to-br from-electric/10 to-pepsi-red/5 p-4"
            >
              <span className="rounded-full bg-pepsi-red/20 px-2 py-0.5 text-[10px] font-medium text-pepsi-red">
                Save ₹{combo.savings}
              </span>
              <h3 className="mt-2 font-semibold text-white">{combo.name}</h3>
              <p className="mt-1 text-xs text-silver">{combo.items.join(" + ")}</p>
              <p className="mt-2 text-lg font-bold text-electric-light">
                {formatCurrency(combo.price)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Order again */}
      <div className="mb-6">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
          <RotateCcw className="h-5 w-5 text-electric-light" />
          Order Again
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {orderAgain.map((r, i) => (
            <GlassCard key={r.id} delay={0.05 * i} hover className="cursor-pointer">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{r.image}</span>
                <div>
                  <p className="font-semibold text-white">{r.name}</p>
                  <p className="text-xs text-silver">Chicken Biryani + Pepsi</p>
                  <p className="text-sm font-medium text-electric-light">₹349</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Cuisine filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        {cuisineFilters.map((cuisine) => (
          <button
            key={cuisine}
            onClick={() => setSelectedCuisine(cuisine)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              selectedCuisine === cuisine
                ? "bg-electric text-white"
                : "bg-white/5 text-silver hover:bg-white/10"
            )}
          >
            {cuisine}
          </button>
        ))}
      </div>

      {/* Restaurant list */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((restaurant, i) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} delay={0.05 * i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <GlassCard className="py-12 text-center">
          <p className="text-silver">No restaurants match your filters. Try adjusting cuisine or mode.</p>
        </GlassCard>
      )}
    </AppLayout>
  );
}
