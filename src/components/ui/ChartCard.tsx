"use client";

import { GlassCard } from "./GlassCard";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
  delay?: number;
}

export function ChartCard({
  title,
  subtitle,
  children,
  className,
  action,
  delay = 0,
}: ChartCardProps) {
  return (
    <GlassCard delay={delay} className={cn("flex flex-col", className)}>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {subtitle && <p className="mt-0.5 text-sm text-silver">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="flex-1 min-h-[200px]">{children}</div>
    </GlassCard>
  );
}
