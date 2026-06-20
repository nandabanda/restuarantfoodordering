"use client";

import { cn } from "@/lib/utils";
import { Bell, Search, User } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}

export function Header({ title, subtitle, badge, className }: HeaderProps) {
  return (
    <header
      className={cn(
        "mb-6 flex flex-col gap-4 border-b border-white/5 pb-6 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="pl-12 lg:pl-0">
        {badge && (
          <span className="mb-2 inline-flex rounded-full bg-electric/20 px-3 py-0.5 text-xs font-medium text-electric-light">
            {badge}
          </span>
        )}
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-silver md:text-base">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 md:flex">
          <Search className="h-4 w-4 text-silver" />
          <input
            type="text"
            placeholder="Search..."
            className="w-40 bg-transparent text-sm text-white placeholder:text-silver/60 outline-none lg:w-56"
          />
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors hover:bg-white/10">
          <Bell className="h-4 w-4 text-silver" />
        </button>
        <button className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 transition-colors hover:bg-white/10">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-electric/30">
            <User className="h-4 w-4 text-electric-light" />
          </div>
          <span className="hidden text-sm font-medium text-white sm:inline">
            Demo User
          </span>
        </button>
      </div>
    </header>
  );
}
