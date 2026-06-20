"use client";

import {
  BillBreakdown,
  PaymentMethodId,
  paymentMethods,
  walletOptions,
} from "@/data/payments";
import { restaurantInfo } from "@/data/orders";
import { cn, formatCurrency } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, QrCode, X } from "lucide-react";
import { useState } from "react";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  bill: BillBreakdown;
  onComplete: (method: PaymentMethodId | string, transactionId: string) => void;
}

export function PaymentModal({ open, onClose, bill, onComplete }: PaymentModalProps) {
  const [method, setMethod] = useState<PaymentMethodId>("upi");
  const [processing, setProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cashReceived, setCashReceived] = useState("");
  const [selectedWallet, setSelectedWallet] = useState(walletOptions[0]);
  const [splitCash, setSplitCash] = useState("");
  const [splitUpi, setSplitUpi] = useState("");
  const [splitCard, setSplitCard] = useState("");

  const cashReceivedNum = parseFloat(cashReceived) || 0;
  const changeDue = Math.max(0, cashReceivedNum - bill.grandTotal);

  const splitTotal =
    (parseFloat(splitCash) || 0) +
    (parseFloat(splitUpi) || 0) +
    (parseFloat(splitCard) || 0);
  const splitValid = Math.abs(splitTotal - bill.grandTotal) < 1;

  const processPayment = (paymentMethod: PaymentMethodId | string) => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onComplete(paymentMethod, `TXN-SP-${Math.floor(900000 + Math.random() * 99999)}`);
    }, 1200);
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-[5%] z-50 mx-auto max-h-[90vh] max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-navy shadow-2xl md:inset-x-auto"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-navy/95 px-5 py-4 backdrop-blur">
              <div>
                <h2 className="text-lg font-bold text-white">Complete Payment</h2>
                <p className="text-sm text-electric-light">{formatCurrency(bill.grandTotal)} due</p>
              </div>
              <button onClick={onClose} className="rounded-lg bg-white/5 p-2 hover:bg-white/10">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5">
              {/* Method tabs */}
              <div className="mb-5 flex gap-1 overflow-x-auto rounded-xl bg-white/[0.03] p-1">
                {paymentMethods.map((pm) => {
                  const Icon = pm.icon;
                  return (
                    <button
                      key={pm.id}
                      onClick={() => setMethod(pm.id)}
                      className={cn(
                        "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all",
                        method === pm.id
                          ? "bg-electric text-white shadow-md"
                          : "text-silver hover:text-white"
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {pm.label}
                    </button>
                  );
                })}
              </div>

              {/* UPI */}
              {method === "upi" && (
                <div className="space-y-4">
                  <div className="flex flex-col items-center rounded-xl border border-white/10 bg-white/[0.02] p-6">
                    <div className="mb-4 flex h-36 w-36 items-center justify-center rounded-xl border-2 border-dashed border-electric/30 bg-electric/5">
                      <QrCode className="h-16 w-16 text-electric-light/50" />
                    </div>
                    <p className="text-sm font-medium text-white">Scan to pay via UPI</p>
                    <p className="mt-1 font-mono text-sm text-electric-light">{restaurantInfo.upiId}</p>
                    <p className="mt-2 text-xs text-silver">Amount: {formatCurrency(bill.grandTotal)}</p>
                  </div>
                  <button
                    onClick={() => processPayment("upi")}
                    disabled={processing}
                    className="flex w-full items-center justify-center gap-2 rounded-xl brand-gradient py-3.5 text-sm font-semibold text-white disabled:opacity-60"
                  >
                    {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    Mark UPI Paid
                  </button>
                </div>
              )}

              {/* Card */}
              {method === "card" && (
                <div className="space-y-3">
                  {[
                    { label: "Card Number", value: cardNumber, setter: setCardNumber, placeholder: "4111 1111 1111 1111" },
                    { label: "Expiry", value: cardExpiry, setter: setCardExpiry, placeholder: "MM/YY" },
                    { label: "CVV", value: cardCvv, setter: setCardCvv, placeholder: "123" },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="mb-1 block text-xs font-medium text-silver">{field.label}</label>
                      <input
                        value={field.value}
                        onChange={(e) => field.setter(e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-silver/40 outline-none focus:border-electric/50"
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => processPayment("card")}
                    disabled={processing || !cardNumber}
                    className="flex w-full items-center justify-center gap-2 rounded-xl brand-gradient py-3.5 text-sm font-semibold text-white disabled:opacity-60"
                  >
                    {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    Process Card Payment
                  </button>
                </div>
              )}

              {/* Cash */}
              {method === "cash" && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-silver">Amount Received</label>
                    <input
                      type="number"
                      value={cashReceived}
                      onChange={(e) => setCashReceived(e.target.value)}
                      placeholder={String(bill.grandTotal)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-lg font-bold text-white outline-none focus:border-electric/50"
                    />
                  </div>
                  <div className="rounded-xl bg-white/[0.04] p-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-silver">Bill Total</span>
                      <span className="text-white">{formatCurrency(bill.grandTotal)}</span>
                    </div>
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-silver">Change Due</span>
                      <span className="font-bold text-emerald-400">
                        {cashReceivedNum >= bill.grandTotal ? formatCurrency(changeDue) : "—"}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => processPayment("cash")}
                    disabled={processing || cashReceivedNum < bill.grandTotal}
                    className="flex w-full items-center justify-center gap-2 rounded-xl brand-gradient py-3.5 text-sm font-semibold text-white disabled:opacity-60"
                  >
                    {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    Mark Cash Paid
                  </button>
                </div>
              )}

              {/* Wallet */}
              {method === "wallet" && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-xs font-medium text-silver">Select Wallet</label>
                    <div className="grid grid-cols-2 gap-2">
                      {walletOptions.map((w) => (
                        <button
                          key={w}
                          onClick={() => setSelectedWallet(w)}
                          className={cn(
                            "rounded-xl border px-3 py-3 text-xs font-medium transition-all",
                            selectedWallet === w
                              ? "border-electric bg-electric/15 text-white"
                              : "border-white/10 text-silver hover:bg-white/5"
                          )}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => processPayment(`wallet:${selectedWallet}`)}
                    disabled={processing}
                    className="flex w-full items-center justify-center gap-2 rounded-xl brand-gradient py-3.5 text-sm font-semibold text-white disabled:opacity-60"
                  >
                    {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    Process Wallet Payment
                  </button>
                </div>
              )}

              {/* Split */}
              {method === "split" && (
                <div className="space-y-3">
                  {[
                    { label: "Cash Amount", value: splitCash, setter: setSplitCash },
                    { label: "UPI Amount", value: splitUpi, setter: setSplitUpi },
                    { label: "Card Amount", value: splitCard, setter: setSplitCard },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="mb-1 block text-xs font-medium text-silver">{field.label}</label>
                      <input
                        type="number"
                        value={field.value}
                        onChange={(e) => field.setter(e.target.value)}
                        placeholder="0"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-electric/50"
                      />
                    </div>
                  ))}
                  <div className="rounded-xl bg-white/[0.04] p-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-silver">Split Total</span>
                      <span className={cn("font-bold", splitValid ? "text-emerald-400" : "text-red-400")}>
                        {formatCurrency(splitTotal)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-silver">Required</span>
                      <span className="text-white">{formatCurrency(bill.grandTotal)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => processPayment("split")}
                    disabled={processing || !splitValid}
                    className="flex w-full items-center justify-center gap-2 rounded-xl brand-gradient py-3.5 text-sm font-semibold text-white disabled:opacity-60"
                  >
                    {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    Complete Split Payment
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
