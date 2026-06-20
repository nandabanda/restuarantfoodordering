"use client";

import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-6">
      <p className="section-label mb-2">Intelligence Module</p>
      <h2 className="text-xl font-bold text-white md:text-2xl">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-silver">{subtitle}</p>}
    </div>
  );
}

interface CommandSectionProps {
  children: ReactNode;
  className?: string;
}

export function CommandSection({ children, className }: CommandSectionProps) {
  return (
    <section className={className}>
      {children}
    </section>
  );
}
