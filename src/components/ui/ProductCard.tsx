"use client";

import { GlassCard } from "./GlassCard";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  gradient: string;
  delay?: number;
}

export function ProductCard({
  title,
  description,
  href,
  icon: Icon,
  gradient,
  delay = 0,
}: ProductCardProps) {
  return (
    <Link href={href}>
      <GlassCard delay={delay} hover className="group h-full cursor-pointer">
        <div
          className={cn(
            "mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg transition-transform group-hover:scale-110",
            gradient
          )}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-electric-light transition-colors">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-silver">{description}</p>
        <div className="mt-4 flex items-center text-sm font-medium text-electric-light opacity-0 transition-opacity group-hover:opacity-100">
          Explore →
        </div>
      </GlassCard>
    </Link>
  );
}
