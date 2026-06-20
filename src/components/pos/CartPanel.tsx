"use client";

import { CartLineItem, OrderStatus, OrderType } from "@/data/orders";
import { BillBreakdown } from "@/data/payments";
import { cn, formatCurrency } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChefHat,
  Minus,
  Plus,
  Receipt,
  Trash2,
  CreditCard,
  X,
} from "lucide-react";
import { BillSummary } from "./BillSummary";

interface CartPanelProps {
  cart: CartLineItem[];
  orderType: OrderType;
  tableNumber: number | null;
  orderStatus: OrderStatus;
  bill: BillBreakdown;
  promoApplied: boolean;
  onTogglePromo: () => void;
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onSendKitchen: () => void;
  onGenerateBill: () => void;
  onPay: () => void;
  kotNumber: string | null;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function CartPanel({
  cart,
  orderType,
  tableNumber,
  orderStatus,
  bill,
  promoApplied,
  onTogglePromo,
  onUpdateQty,
  onRemove,
  onClear,
  onSendKitchen,
  onGenerateBill,
  onPay,
  kotNumber,
  mobileOpen,
  onMobileClose,
}: CartPanelProps) {
  const canSendKitchen = cart.length > 0 && orderStatus === "open";
  const canGenerateBill =
    cart.length > 0 &&
    orderStatus !== "paid" &&
    (orderStatus === "kitchen-pending" || orderStatus === "ready-for-billing" || orderStatus === "open");
  const canPay = orderStatus === "ready-for-billing" && cart.length > 0;

  const content = (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Order Cart</h3>
          <p className="text-xs capitalize text-silver">
            {orderType.replace("-", " ")}
            {tableNumber && orderType === "dine-in" ? ` · Table ${tableNumber}` : ""}
          </p>
        </div>
        {onMobileClose && (
          <button onClick={onMobileClose} className="rounded-lg bg-white/5 p-2 lg:hidden">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <p className="py-10 text-center text-sm text-silver">Add items from the menu</p>
      ) : (
        <div className="max-h-52 space-y-2 overflow-y-auto lg:max-h-64">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                className="rounded-xl bg-white/[0.04] p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">{item.name}</p>
                    <p className="text-xs text-silver">
                      {formatCurrency(item.price)} × {item.quantity} ={" "}
                      <span className="font-semibold text-electric-light">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="shrink-0 text-silver hover:text-red-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => onUpdateQty(item.id, -1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQty(item.id, 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-electric/30"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {cart.length > 0 && (
        <>
          <div className="mt-4 border-t border-white/10 pt-4">
            <BillSummary bill={bill} promoApplied={promoApplied} onTogglePromo={onTogglePromo} compact />
          </div>

          <div className="mt-4 space-y-2">
            <button
              onClick={onSendKitchen}
              disabled={!canSendKitchen}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 py-3 text-sm font-semibold text-amber-400 transition-all hover:bg-amber-500/20 disabled:opacity-40"
            >
              <ChefHat className="h-4 w-4" />
              Send to Kitchen
            </button>
            <button
              onClick={onGenerateBill}
              disabled={!canGenerateBill}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-electric/30 bg-electric/10 py-3 text-sm font-semibold text-electric-light transition-all hover:bg-electric/20 disabled:opacity-40"
            >
              <Receipt className="h-4 w-4" />
              Generate Bill
            </button>
            <button
              onClick={onPay}
              disabled={!canPay}
              className="flex w-full items-center justify-center gap-2 rounded-xl brand-gradient py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.01] disabled:opacity-40 disabled:hover:scale-100"
            >
              <CreditCard className="h-4 w-4" />
              Complete Payment
            </button>
          </div>

          {cart.length > 0 && orderStatus === "open" && (
            <button
              onClick={onClear}
              className="mt-2 w-full py-2 text-xs text-silver hover:text-red-400"
            >
              Clear Cart
            </button>
          )}
        </>
      )}
    </>
  );

  return (
    <>
      {/* Desktop sticky */}
      <div className="hidden lg:block">
        <div className="glass-card sticky top-4 p-5">{content}</div>
      </div>

      {/* Mobile drawer */}
      <div className="lg:hidden">
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onMobileClose}
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 28 }}
                className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-white/10 bg-navy p-5"
              >
                {content}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export function MobileCartBar({
  itemCount,
  total,
  onOpen,
}: {
  itemCount: number;
  total: number;
  onOpen: () => void;
}) {
  if (itemCount === 0) return null;

  return (
    <button
      onClick={onOpen}
      className="fixed inset-x-4 bottom-4 z-30 flex items-center justify-between rounded-xl brand-gradient px-5 py-4 shadow-xl lg:hidden"
    >
      <span className="text-sm font-semibold text-white">{itemCount} items in cart</span>
      <span className="text-sm font-bold text-white">{formatCurrency(total)} · View</span>
    </button>
  );
}
