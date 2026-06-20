"use client";

import { PosTable } from "@/data/orders";
import { cn } from "@/lib/utils";

interface TableSelectorProps {
  tables: PosTable[];
  selected: number | null;
  onSelect: (tableNumber: number) => void;
  disabled?: boolean;
}

const statusStyles = {
  free: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
  occupied: "border-electric/40 bg-electric/10 text-electric-light",
  billing: "border-amber-500/40 bg-amber-500/10 text-amber-400",
};

const statusLabels = {
  free: "Free",
  occupied: "Occupied",
  billing: "Billing",
};

export function TableSelector({ tables, selected, onSelect, disabled }: TableSelectorProps) {
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-3 text-[10px] text-silver">
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Free</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-electric-light" /> Occupied</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-400" /> Billing</span>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
        {tables.map((table) => (
          <button
            key={table.id}
            disabled={disabled}
            onClick={() => onSelect(table.number)}
            className={cn(
              "flex flex-col items-center justify-center rounded-xl border py-3 transition-all",
              selected === table.number
                ? "border-electric bg-electric/20 text-white shadow-lg shadow-electric/20 ring-2 ring-electric/30"
                : statusStyles[table.status],
              disabled && "opacity-50"
            )}
          >
            <span className="text-sm font-bold">T{table.number}</span>
            <span className="text-[9px] opacity-80">{statusLabels[table.status]}</span>
            {table.guests > 0 && <span className="text-[9px] opacity-60">{table.guests}p</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
