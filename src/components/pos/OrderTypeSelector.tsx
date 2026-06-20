"use client";

import { OrderType, orderTypeOptions } from "@/data/orders";
import { cn } from "@/lib/utils";
import { Truck, ShoppingBag, UtensilsCrossed } from "lucide-react";

const icons = {
  "dine-in": UtensilsCrossed,
  takeaway: ShoppingBag,
  delivery: Truck,
};

interface OrderTypeSelectorProps {
  value: OrderType;
  onChange: (type: OrderType) => void;
}

export function OrderTypeSelector({ value, onChange }: OrderTypeSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {orderTypeOptions.map((opt) => {
        const Icon = icons[opt.id];
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={cn(
              "flex flex-col items-center gap-2 rounded-xl border px-3 py-4 transition-all sm:py-5",
              value === opt.id
                ? "border-electric bg-electric/15 text-white shadow-lg shadow-electric/10"
                : "border-white/10 bg-white/[0.02] text-silver hover:border-white/20 hover:bg-white/5"
            )}
          >
            <Icon className={cn("h-5 w-5 sm:h-6 sm:w-6", value === opt.id && "text-electric-light")} />
            <span className="text-sm font-semibold">{opt.label}</span>
            <span className="hidden text-[10px] text-silver sm:block">{opt.description}</span>
          </button>
        );
      })}
    </div>
  );
}
