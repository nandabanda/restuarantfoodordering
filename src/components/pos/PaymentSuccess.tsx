"use client";

import { PaymentMethodId } from "@/data/payments";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle, Printer, RotateCcw } from "lucide-react";

interface PaymentSuccessProps {
  amount: number;
  method: PaymentMethodId | string;
  transactionId: string;
  paidAt: string;
  onPrint: () => void;
  onWhatsApp: () => void;
  onNewOrder: () => void;
}

export function PaymentSuccess({
  amount,
  method,
  transactionId,
  paidAt,
  onPrint,
  onWhatsApp,
  onNewOrder,
}: PaymentSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
        <CheckCircle2 className="h-9 w-9 text-emerald-400" />
      </div>
      <h3 className="text-xl font-bold text-white">Payment Successful</h3>
      <p className="mt-1 text-sm text-silver">Order status updated to Paid</p>

      <div className="mt-6 space-y-3 rounded-xl bg-white/[0.04] p-4 text-left">
        <div className="flex justify-between text-sm">
          <span className="text-silver">Amount Paid</span>
          <span className="font-bold text-white">{formatCurrency(amount)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-silver">Payment Method</span>
          <span className="font-medium capitalize text-white">{method}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-silver">Transaction ID</span>
          <span className="font-mono text-xs text-electric-light">{transactionId}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-silver">Timestamp</span>
          <span className="text-white">{paidAt}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-silver">Status</span>
          <span className="font-semibold text-emerald-400">Paid</span>
        </div>
      </div>

      <div className="mt-6 grid gap-2 sm:grid-cols-3">
        <button
          onClick={onPrint}
          className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-white hover:bg-white/10"
        >
          <Printer className="h-4 w-4" /> Print Receipt
        </button>
        <button
          onClick={onWhatsApp}
          className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-white hover:bg-white/10"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp Receipt
        </button>
        <button
          onClick={onNewOrder}
          className="flex items-center justify-center gap-2 rounded-xl brand-gradient py-3 text-sm font-semibold text-white"
        >
          <RotateCcw className="h-4 w-4" /> New Order
        </button>
      </div>
    </motion.div>
  );
}
