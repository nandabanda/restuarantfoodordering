export type OrderType = "dine-in" | "takeaway" | "delivery";

export type OrderStatus =
  | "open"
  | "kitchen-pending"
  | "ready-for-billing"
  | "paid";

export type TableStatus = "free" | "occupied" | "billing";

export interface PosMenuItem {
  id: string;
  name: string;
  price: number;
  category: "Food" | "Beverage";
  image: string;
  isVeg: boolean;
}

export interface PosTable {
  id: string;
  number: number;
  status: TableStatus;
  guests: number;
}

export interface CartLineItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const restaurantInfo = {
  name: "Spice Garden Kitchen",
  location: "Jubilee Hills, Hyderabad",
  gstin: "36AABCS1234F1Z8",
  upiId: "restaurant@servepulse",
};

export const orderStatuses = [
  { id: "open", label: "Open Orders", color: "#0EA5E9" },
  { id: "kitchen-pending", label: "Kitchen Pending", color: "#F59E0B" },
  { id: "ready-for-billing", label: "Ready for Billing", color: "#7C3AED" },
  { id: "paid", label: "Paid Orders Today", color: "#10B981" },
] as const;

export const orderSummaryMetrics = {
  openOrders: 6,
  kitchenPending: 4,
  readyForBilling: 3,
  paidToday: 38,
};

export const posMenuItems: PosMenuItem[] = [
  { id: "f1", name: "Pani Puri", price: 89, category: "Food", image: "🥗", isVeg: true },
  { id: "f2", name: "Pav Bhaji", price: 199, category: "Food", image: "🍛", isVeg: true },
  { id: "f3", name: "Chole Bhature", price: 229, category: "Food", image: "🫓", isVeg: true },
  { id: "f4", name: "Masala Dosa", price: 169, category: "Food", image: "🫔", isVeg: true },
  { id: "f5", name: "Paneer Butter Masala", price: 329, category: "Food", image: "🍲", isVeg: true },
  { id: "f6", name: "Jeera Rice", price: 159, category: "Food", image: "🍚", isVeg: true },
  { id: "f7", name: "Veggie Mayo Sandwich", price: 129, category: "Food", image: "🥪", isVeg: true },
  { id: "f8", name: "Dal Makhani", price: 289, category: "Food", image: "🫘", isVeg: true },
  { id: "b1", name: "Cola Classic", price: 60, category: "Beverage", image: "🥤", isVeg: true },
  { id: "b2", name: "Cola Zero", price: 60, category: "Beverage", image: "🥤", isVeg: true },
  { id: "b3", name: "Lemon Soda", price: 60, category: "Beverage", image: "🍋", isVeg: true },
  { id: "b4", name: "Orange Sparkle", price: 60, category: "Beverage", image: "🍊", isVeg: true },
  { id: "b5", name: "Energy Drink", price: 80, category: "Beverage", image: "⚡", isVeg: true },
  { id: "b6", name: "Premium Water", price: 40, category: "Beverage", image: "💧", isVeg: true },
];

export const sampleTables: PosTable[] = Array.from({ length: 12 }, (_, i) => {
  const num = i + 1;
  let status: TableStatus = "free";
  let guests = 0;
  if ([1, 3, 5, 7].includes(num)) {
    status = "occupied";
    guests = num % 3 === 0 ? 4 : 2;
  } else if (num === 9) {
    status = "billing";
    guests = 3;
  }
  return { id: `t${num}`, number: num, status, guests };
});

export const orderTypeOptions = [
  { id: "dine-in" as const, label: "Dine-In", description: "Table service" },
  { id: "takeaway" as const, label: "Takeaway", description: "Pack & go" },
  { id: "delivery" as const, label: "Delivery", description: "Home delivery" },
];

export const posSteps = [
  { id: 1, label: "Order Type" },
  { id: 2, label: "Table" },
  { id: 3, label: "Add Items" },
  { id: 4, label: "Kitchen" },
  { id: 5, label: "Bill" },
  { id: 6, label: "Payment" },
  { id: 7, label: "Receipt" },
];

export function generateKOTNumber(): string {
  return `KOT-${1048 + Math.floor(Math.random() * 50)}`;
}

export function generateBillNumber(): string {
  return `INV-2026-${String(187 + Math.floor(Math.random() * 20)).padStart(4, "0")}`;
}

export function generateTransactionId(): string {
  return `TXN-SP-${Math.floor(900000 + Math.random() * 99999)}`;
}
