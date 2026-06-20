"use client";

import { GlassCard } from "./GlassCard";
import { Tag, Calendar } from "lucide-react";

interface OfferCardProps {
  title: string;
  discount: string;
  validUntil: string;
  redemptions?: number;
  status?: string;
  delay?: number;
}

export function OfferCard({
  title,
  discount,
  validUntil,
  redemptions,
  status = "Active",
  delay = 0,
}: OfferCardProps) {
  return (
    <GlassCard delay={delay} hover className="relative overflow-hidden">
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-pepsi-red/10 blur-2xl" />
      <div className="relative">
        <div className="mb-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
            {status}
          </span>
          <Tag className="h-4 w-4 text-pepsi-red" />
        </div>
        <h3 className="mb-1 text-base font-semibold text-white">{title}</h3>
        <p className="mb-3 text-sm font-medium text-electric-light">{discount}</p>
        <div className="flex items-center justify-between text-xs text-silver">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {validUntil}
          </span>
          {redemptions !== undefined && (
            <span>{redemptions} redemptions</span>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
