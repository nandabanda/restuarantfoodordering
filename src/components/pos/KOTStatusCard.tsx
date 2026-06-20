"use client";

import { motion } from "framer-motion";
import { Check, ChefHat } from "lucide-react";

interface KOTStatusCardProps {
  kotNumber: string;
  itemCount: number;
  onDismiss?: () => void;
}

export function KOTStatusCard({ kotNumber, itemCount }: KOTStatusCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4 flex items-center gap-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/20">
        <ChefHat className="h-5 w-5 text-amber-400" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-white">Order sent to kitchen</p>
        <p className="text-xs text-silver">
          {kotNumber} · {itemCount} items · Status: Kitchen Pending
        </p>
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20">
        <Check className="h-4 w-4 text-emerald-400" />
      </div>
    </motion.div>
  );
}
