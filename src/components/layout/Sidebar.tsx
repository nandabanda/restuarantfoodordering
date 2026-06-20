"use client";

import { navItems } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavContent = () => (
    <>
      <div className="mb-10 px-2">
        <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl brand-gradient shadow-lg">
            <span className="text-lg font-black text-white">S</span>
          </div>
          <div>
            <p className="text-sm font-bold leading-tight text-white">ServePulse™</p>
            <p className="text-[11px] text-electric-light">Commerce Platform</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "border border-electric/30 bg-electric/15 text-white shadow-lg shadow-electric/10"
                  : "text-silver hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className={cn("h-4 w-4", isActive && "text-electric-light")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-xl border border-white/5 bg-white/[0.03] p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-silver">Powered by</p>
        <p className="text-sm font-bold text-white">SYDIAI</p>
        <p className="mt-0.5 text-xs text-silver">Restaurant Intelligence</p>
      </div>
    </>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl glass-card lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-white/5 lg:bg-navy/40 lg:p-5 lg:backdrop-blur-xl">
        <NavContent />
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/5 bg-navy p-5 lg:hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg bg-white/5"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
              <NavContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
