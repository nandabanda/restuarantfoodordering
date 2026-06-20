"use client";

import { CartLineItem, OrderType, restaurantInfo } from "@/data/orders";
import { BillBreakdown, PaymentMethodId } from "@/data/payments";
import { formatCurrency } from "@/lib/utils";

interface ReceiptPreviewProps {
  billNumber: string;
  cart: CartLineItem[];
  bill: BillBreakdown;
  orderType: OrderType;
  tableNumber: number | null;
  paymentMethod?: PaymentMethodId | string;
  transactionId?: string;
  paidAt?: string;
  variant?: "invoice" | "receipt";
}

export function ReceiptPreview({
  billNumber,
  cart,
  bill,
  orderType,
  tableNumber,
  paymentMethod,
  transactionId,
  paidAt,
  variant = "receipt",
}: ReceiptPreviewProps) {
  const timestamp = paidAt || new Date().toLocaleString("en-IN");

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-6 text-gray-900 shadow-2xl">
      <div className="border-b border-gray-200 pb-4 text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0054A6]">
          <span className="text-lg font-black text-white">S</span>
        </div>
        <h2 className="text-lg font-bold">{restaurantInfo.name}</h2>
        <p className="text-xs text-gray-500">{restaurantInfo.location}</p>
        <p className="text-xs text-gray-500">GSTIN: {restaurantInfo.gstin}</p>
        <p className="mt-2 text-[10px] font-medium uppercase tracking-wide text-[#0054A6]">
          Powered by ServePulse™
        </p>
      </div>

      <div className="border-b border-gray-200 py-3 text-xs text-gray-500">
        <div className="flex justify-between">
          <span>{variant === "invoice" ? "Bill No." : "Receipt No."}</span>
          <span className="font-semibold text-gray-800">{billNumber}</span>
        </div>
        <div className="mt-1 flex justify-between">
          <span>Date & Time</span>
          <span>{timestamp}</span>
        </div>
        <div className="mt-1 flex justify-between capitalize">
          <span>Order Type</span>
          <span>{orderType.replace("-", " ")}</span>
        </div>
        {tableNumber && orderType === "dine-in" && (
          <div className="mt-1 flex justify-between">
            <span>Table</span>
            <span>Table {tableNumber}</span>
          </div>
        )}
      </div>

      <div className="my-4 space-y-2">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="space-y-1 border-t border-gray-200 pt-3 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(bill.subtotal)}</span>
        </div>
        {bill.discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-{formatCurrency(bill.discount)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Service Charge</span>
          <span>{formatCurrency(bill.serviceCharge)}</span>
        </div>
        <div className="flex justify-between">
          <span>GST (5%)</span>
          <span>{formatCurrency(bill.gst)}</span>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-bold">
          <span>Grand Total</span>
          <span>{formatCurrency(bill.grandTotal)}</span>
        </div>
        {paymentMethod && (
          <>
            <div className="flex justify-between pt-2 text-xs text-gray-500">
              <span>Payment Method</span>
              <span className="uppercase">{paymentMethod}</span>
            </div>
            {transactionId && (
              <div className="flex justify-between text-xs text-gray-500">
                <span>Transaction ID</span>
                <span className="font-mono">{transactionId}</span>
              </div>
            )}
            <div className="flex justify-between text-xs font-semibold text-green-600">
              <span>Status</span>
              <span>Paid</span>
            </div>
          </>
        )}
      </div>

      <p className="mt-4 text-center text-xs text-gray-400">
        Thank you for dining with us. Visit again soon!
      </p>
    </div>
  );
}
