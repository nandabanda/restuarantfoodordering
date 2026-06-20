import { LucideIcon, Banknote, CreditCard, Smartphone, Wallet, Split } from "lucide-react";

export type PaymentMethodId = "upi" | "card" | "cash" | "wallet" | "split";

export const taxConfig = {
  foodGstRate: 0.05,
  serviceChargeRate: 0.05,
  promoDiscountRate: 0.1,
  promoCode: "COMBO10",
};

export const paymentMethods: {
  id: PaymentMethodId;
  label: string;
  icon: LucideIcon;
  description: string;
}[] = [
  { id: "upi", label: "UPI", icon: Smartphone, description: "Scan & pay via UPI" },
  { id: "card", label: "Card", icon: CreditCard, description: "Debit or credit card" },
  { id: "cash", label: "Cash", icon: Banknote, description: "Cash at counter" },
  { id: "wallet", label: "Wallet", icon: Wallet, description: "Digital wallet" },
  { id: "split", label: "Split Payment", icon: Split, description: "Multiple methods" },
];

export const walletOptions = [
  "Paytm Wallet",
  "PhonePe Wallet",
  "Amazon Pay",
  "ServePulse Wallet",
];

export const mockTransactions = [
  {
    id: "TXN-SP-928174",
    amount: 847,
    method: "UPI",
    status: "Paid",
    time: "2:34 PM",
  },
  {
    id: "TXN-SP-928173",
    amount: 1249,
    method: "Card",
    status: "Paid",
    time: "2:18 PM",
  },
  {
    id: "TXN-SP-928172",
    amount: 599,
    method: "Cash",
    status: "Paid",
    time: "1:52 PM",
  },
];

export interface BillBreakdown {
  subtotal: number;
  discount: number;
  serviceCharge: number;
  gst: number;
  grandTotal: number;
}

export function calculateBill(
  subtotal: number,
  options: { promoApplied?: boolean; serviceChargeEnabled?: boolean } = {}
): BillBreakdown {
  const { promoApplied = false, serviceChargeEnabled = true } = options;
  const discount = promoApplied ? Math.round(subtotal * taxConfig.promoDiscountRate) : 0;
  const afterDiscount = subtotal - discount;
  const serviceCharge = serviceChargeEnabled
    ? Math.round(afterDiscount * taxConfig.serviceChargeRate)
    : 0;
  const taxable = afterDiscount + serviceCharge;
  const gst = Math.round(taxable * taxConfig.foodGstRate);
  const grandTotal = taxable + gst;

  return { subtotal, discount, serviceCharge, gst, grandTotal };
}
