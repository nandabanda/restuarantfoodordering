"use client";

import { GlassCard } from "./GlassCard";
import { Restaurant } from "@/data/restaurants";
import { cn } from "@/lib/utils";
import { MapPin, Star, Clock } from "lucide-react";

interface RestaurantCardProps {
  restaurant: Restaurant;
  delay?: number;
  compact?: boolean;
}

export function RestaurantCard({
  restaurant,
  delay = 0,
  compact = false,
}: RestaurantCardProps) {
  return (
    <GlassCard delay={delay} hover className="group cursor-pointer">
      <div className="flex gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-navy-light text-3xl">
          {restaurant.image}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-white group-hover:text-electric-light transition-colors">
                {restaurant.name}
              </h3>
              <p className="text-sm text-silver">
                {restaurant.cuisine} · {restaurant.city}
              </p>
            </div>
            <div
              className={cn(
                "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
                restaurant.isOpen
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-red-500/20 text-red-400"
              )}
            >
              {restaurant.isOpen ? "Open" : "Closed"}
            </div>
          </div>

          {!compact && (
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-silver">
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                {restaurant.rating}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {restaurant.distance}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {restaurant.pepsiAttachRate}% Pepsi attach
              </span>
            </div>
          )}

          {restaurant.offer && (
            <div className="mt-2 inline-flex rounded-lg bg-pepsi-red/10 px-2 py-1 text-xs font-medium text-pepsi-red">
              {restaurant.offer}
            </div>
          )}

          <div className="mt-2 flex flex-wrap gap-1">
            {restaurant.deliveryModes.map((mode) => (
              <span
                key={mode}
                className="rounded-md bg-white/5 px-2 py-0.5 text-xs capitalize text-silver"
              >
                {mode}
              </span>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
