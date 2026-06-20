"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { Header } from "@/components/layout/Header";
import { GlassCard } from "@/components/ui/GlassCard";
import { CartPanel, MobileCartBar } from "@/components/pos/CartPanel";
import { KOTStatusCard } from "@/components/pos/KOTStatusCard";
import { OrderTypeSelector } from "@/components/pos/OrderTypeSelector";
import { PaymentModal } from "@/components/pos/PaymentModal";
import { PaymentSuccess } from "@/components/pos/PaymentSuccess";
import { ReceiptPreview } from "@/components/pos/ReceiptPreview";
import { TableSelector } from "@/components/pos/TableSelector";
import {
  CartLineItem,
  generateBillNumber,
  generateKOTNumber,
  OrderStatus,
  OrderType,
  posMenuItems,
  posSteps,
  restaurantInfo,
  sampleTables,
} from "@/data/orders";
import { calculateBill } from "@/data/payments";
import { cn, formatCurrency } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type ModalView = "none" | "invoice" | "payment" | "success" | "receipt";

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-6 overflow-x-auto">
      <div className="flex min-w-max items-center gap-1">
        {posSteps.map((step, i) => {
          const done = currentStep > step.id;
          const active = currentStep === step.id;
          return (
            <div key={step.id} className="flex items-center">
              <div
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                  done && "bg-emerald-500/15 text-emerald-400",
                  active && "bg-electric/20 text-electric-light ring-1 ring-electric/30",
                  !done && !active && "bg-white/[0.03] text-silver"
                )}
              >
                {done ? <Check className="h-3 w-3" /> : <span className="font-bold">{step.id}</span>}
                <span className="hidden sm:inline">{step.label}</span>
              </div>
              {i < posSteps.length - 1 && (
                <div className={cn("mx-1 h-px w-4 sm:w-8", done ? "bg-emerald-500/40" : "bg-white/10")} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function POSPageClient() {
  const searchParams = useSearchParams();
  const initialType = (searchParams.get("type") as OrderType) || "dine-in";

  const [orderType, setOrderType] = useState<OrderType>(initialType);
  const [selectedTable, setSelectedTable] = useState<number | null>(
    initialType === "dine-in" ? 4 : null
  );
  const [cart, setCart] = useState<CartLineItem[]>([]);
  const [promoApplied, setPromoApplied] = useState(false);
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("open");
  const [kotNumber, setKotNumber] = useState<string | null>(null);
  const [billNumber, setBillNumber] = useState<string | null>(null);
  const [modalView, setModalView] = useState<ModalView>("none");
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("upi");
  const [paidAt, setPaidAt] = useState<string>("");
  const [mobileCartOpen, setMobileCartOpen] = useState(false);
  const [menuFilter, setMenuFilter] = useState<"All" | "Food" | "Beverage">("All");

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const bill = useMemo(
    () => calculateBill(subtotal, { promoApplied }),
    [subtotal, promoApplied]
  );

  const currentStep = useMemo(() => {
    if (modalView === "receipt" || modalView === "success") return 7;
    if (modalView === "payment") return 6;
    if (modalView === "invoice" || orderStatus === "ready-for-billing") return 5;
    if (orderStatus === "kitchen-pending") return 4;
    if (cart.length > 0) return 3;
    if (orderType === "dine-in" && selectedTable) return 2;
    if (orderType !== "dine-in") return 2;
    return 1;
  }, [modalView, orderStatus, cart.length, orderType, selectedTable]);

  const filteredMenu =
    menuFilter === "All"
      ? posMenuItems
      : posMenuItems.filter((m) => m.category === menuFilter);

  const itemCount = cart.reduce((s, i) => s + i.quantity, 0);

  const addItem = (item: (typeof posMenuItems)[0]) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, quantity: c.quantity + delta } : c))
        .filter((c) => c.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const sendToKitchen = () => {
    setKotNumber(generateKOTNumber());
    setOrderStatus("kitchen-pending");
  };

  const generateBill = () => {
    setBillNumber(generateBillNumber());
    setOrderStatus("ready-for-billing");
    setModalView("invoice");
  };

  const completePayment = (method: string, txnId: string) => {
    setPaymentMethod(method);
    setTransactionId(txnId);
    setPaidAt(new Date().toLocaleString("en-IN"));
    setOrderStatus("paid");
    setModalView("success");
  };

  const resetOrder = () => {
    setCart([]);
    setPromoApplied(false);
    setOrderStatus("open");
    setKotNumber(null);
    setBillNumber(null);
    setModalView("none");
    setTransactionId(null);
    setPaymentMethod("upi");
    setPaidAt("");
    setSelectedTable(orderType === "dine-in" ? 4 : null);
  };

  return (
    <AppLayout>
      <Header
        title="POS Billing"
        subtitle={`${restaurantInfo.name} · Order · Kitchen · Billing · Payment`}
        badge="Live POS"
      />

      <StepIndicator currentStep={currentStep} />

      {kotNumber && orderStatus !== "open" && orderStatus !== "paid" && (
        <KOTStatusCard kotNumber={kotNumber} itemCount={itemCount} />
      )}

      {orderStatus === "paid" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3"
        >
          <Check className="h-4 w-4 text-emerald-400" />
          <span className="text-sm font-medium text-emerald-400">Order Paid · {transactionId}</span>
        </motion.div>
      )}

      <div className="grid gap-6 pb-24 lg:grid-cols-3 lg:pb-0">
        <div className="space-y-5 lg:col-span-2">
          <GlassCard>
            <p className="section-label mb-3">Step 1 · Order Type</p>
            <OrderTypeSelector
              value={orderType}
              onChange={(t) => {
                setOrderType(t);
                if (t !== "dine-in") setSelectedTable(null);
                else setSelectedTable(4);
              }}
            />
          </GlassCard>

          {orderType === "dine-in" && (
            <GlassCard>
              <p className="section-label mb-3">Step 2 · Select Table</p>
              <TableSelector
                tables={sampleTables}
                selected={selectedTable}
                onSelect={setSelectedTable}
                disabled={orderStatus === "paid"}
              />
            </GlassCard>
          )}

          <GlassCard glow className="border-electric/20">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 shrink-0 text-accent-violet" />
              <div>
                <p className="font-semibold text-white">Beverage Combo Suggestion</p>
                <p className="text-sm text-silver">Pair Pav Bhaji or Chole Bhature with Cola Classic</p>
                <button
                  onClick={() => {
                    const pb = posMenuItems.find((m) => m.id === "f2");
                    const cola = posMenuItems.find((m) => m.id === "b1");
                    if (pb) addItem(pb);
                    if (cola) addItem(cola);
                  }}
                  className="mt-2 rounded-lg bg-electric/20 px-3 py-1.5 text-xs font-medium text-electric-light"
                >
                  + Add Pav Bhaji + Cola Classic
                </button>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <p className="section-label mb-3">Step 3 · Add Items</p>
            <div className="mb-4 flex gap-2">
              {(["All", "Food", "Beverage"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setMenuFilter(f)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                    menuFilter === f ? "bg-electric text-white" : "bg-white/5 text-silver"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {filteredMenu.map((item) => (
                <motion.button
                  key={item.id}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => addItem(item)}
                  disabled={orderStatus === "paid"}
                  className="glass-card flex flex-col items-center p-4 text-center transition-all hover:border-electric/30 disabled:opacity-50"
                >
                  <span className="text-3xl">{item.image}</span>
                  <p className="mt-2 line-clamp-2 text-sm font-medium text-white">{item.name}</p>
                  <p className="mt-1 text-sm font-bold text-electric-light">
                    {formatCurrency(item.price)}
                  </p>
                  <span className="mt-1 text-[10px] text-silver">{item.category}</span>
                </motion.button>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="hidden lg:block">
          <CartPanel
            cart={cart}
            orderType={orderType}
            tableNumber={selectedTable}
            orderStatus={orderStatus}
            bill={bill}
            promoApplied={promoApplied}
            onTogglePromo={() => setPromoApplied(!promoApplied)}
            onUpdateQty={updateQty}
            onRemove={removeItem}
            onClear={resetOrder}
            onSendKitchen={sendToKitchen}
            onGenerateBill={generateBill}
            onPay={() => setModalView("payment")}
            kotNumber={kotNumber}
          />
        </div>
      </div>

      <CartPanel
        cart={cart}
        orderType={orderType}
        tableNumber={selectedTable}
        orderStatus={orderStatus}
        bill={bill}
        promoApplied={promoApplied}
        onTogglePromo={() => setPromoApplied(!promoApplied)}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        onClear={resetOrder}
        onSendKitchen={sendToKitchen}
        onGenerateBill={generateBill}
        onPay={() => {
          setMobileCartOpen(false);
          setModalView("payment");
        }}
        kotNumber={kotNumber}
        mobileOpen={mobileCartOpen}
        onMobileClose={() => setMobileCartOpen(false)}
      />
      <MobileCartBar
        itemCount={itemCount}
        total={bill.grandTotal}
        onOpen={() => setMobileCartOpen(true)}
      />

      <AnimatePresence>
        {modalView === "invoice" && billNumber && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalView("none")}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-x-4 top-[5%] z-50 mx-auto max-h-[90vh] max-w-md overflow-y-auto md:inset-x-auto"
            >
              <ReceiptPreview
                billNumber={billNumber}
                cart={cart}
                bill={bill}
                orderType={orderType}
                tableNumber={selectedTable}
                variant="invoice"
              />
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setModalView("none")}
                  className="rounded-xl border border-white/10 bg-navy py-3 text-sm font-medium text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => setModalView("payment")}
                  className="rounded-xl brand-gradient py-3 text-sm font-semibold text-white"
                >
                  Proceed to Payment
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <PaymentModal
        open={modalView === "payment"}
        onClose={() => setModalView("none")}
        bill={bill}
        onComplete={(method, txnId) => completePayment(method, txnId)}
      />

      <AnimatePresence>
        {(modalView === "success" || modalView === "receipt") && transactionId && billNumber && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-x-4 top-[5%] z-50 mx-auto max-h-[90vh] max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-navy p-6 md:inset-x-auto"
            >
              {modalView === "success" ? (
                <PaymentSuccess
                  amount={bill.grandTotal}
                  method={paymentMethod}
                  transactionId={transactionId}
                  paidAt={paidAt}
                  onPrint={() => setModalView("receipt")}
                  onWhatsApp={() => alert("Receipt shared via WhatsApp")}
                  onNewOrder={resetOrder}
                />
              ) : (
                <>
                  <ReceiptPreview
                    billNumber={billNumber}
                    cart={cart}
                    bill={bill}
                    orderType={orderType}
                    tableNumber={selectedTable}
                    paymentMethod={paymentMethod}
                    transactionId={transactionId}
                    paidAt={paidAt}
                  />
                  <button
                    onClick={resetOrder}
                    className="mt-4 w-full rounded-xl brand-gradient py-3 text-sm font-semibold text-white"
                  >
                    New Order
                  </button>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </AppLayout>
  );
}
