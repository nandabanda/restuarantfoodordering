"use client";

import { BillBreakdown } from "@/data/payments";
import { formatCurrency } from "@/lib/utils";
import { Tag } from "lucide-react";
import { cn } from "@/lib/utils";

interface BillSummaryProps {
  bill: BillBreakdown;
  promoApplied: boolean;
  onTogglePromo: () => void;
  compact?: boolean;
}

export function BillSummary({ bill, promoApplied, onTogglePromo, compact }: BillSummaryProps) {
  return (
    <div className={cn("space-y-2", compact ? "text-sm" : "")}>
      <div className="flex justify-between text-silver">
        <span>Subtotal</span>
        <span>{formatCurrency(bill.subtotal)}</span>
      </div>
      <button
        onClick={onTogglePromo}
        className={cn(
          "flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-all",
          promoApplied
            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
            : "border-white/10 bg-white/[0.02] text-silver hover:bg-white/5"
        )}
      >
        <Tag className="h-3.5 w-3.5" />
        {promoApplied ? "COMBO10 Applied (10% off)" : "Apply COMBO10 Discount"}
      </button>
      {bill.discount > 0 && (
        <div className="flex justify-between text-emerald-400">
          <span>Discount</span>
          <span>-{formatCurrency(bill.discount)}</span>
        </div>
      )}
      <div className="flex justify-between text-silver">
        <span>Service Charge (5%)</span>
        <span>{formatCurrency(bill.serviceCharge)}</span>
      </div>
      <div className="flex justify-between text-silver">
        <span>GST (5%)</span>
        <span>{formatCurrency(bill.gst)}</span>
      </div>
      <div className="flex justify-between border-t border-white/10 pt-3 text-lg font-bold text-white">
        <span>Grand Total</span>
        <span>{formatCurrency(bill.grandTotal)}</span>
      </div>
    </div>
  );
}
