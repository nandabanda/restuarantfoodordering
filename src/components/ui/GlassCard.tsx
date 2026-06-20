"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
  delay?: number;
}

export function GlassCard({
  children,
  className,
  glow = false,
  hover = false,
  delay = 0,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className={cn(
        "glass-card p-6",
        glow && "brand-glow",
        hover && "transition-all duration-300 hover:border-electric-light/25 hover:shadow-lg hover:shadow-electric/10",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
