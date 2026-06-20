export const restaurantMetrics = {
  todaySales: 84750,
  salesChange: 12.4,
  billsGenerated: 142,
  billsChange: 8.2,
  footfall: 186,
  footfallChange: 15.1,
  avgOrderValue: 596,
  aovChange: 3.8,
  beverageAttachRate: 68,
  attachChange: 5.2,
  activeTables: 12,
  totalTables: 18,
};

export const topSellingItems = [
  { name: "Hyderabadi Chicken Biryani", orders: 48, revenue: 16752 },
  { name: "Biryani + Cola Classic Combo", orders: 36, revenue: 14364 },
  { name: "Chicken 65", orders: 32, revenue: 9248 },
  { name: "Cola Classic 750ml", orders: 89, revenue: 5340 },
  { name: "Butter Chicken", orders: 24, revenue: 7896 },
];

export const activeOffers = [
  {
    id: "o1",
    title: "Biryani + Cola @ ₹349",
    discount: "₹50 off",
    validUntil: "30 Jun 2026",
    redemptions: 42,
    status: "Active",
  },
  {
    id: "o2",
    title: "Free Beverage with Family Pack",
    discount: "Free beverage",
    validUntil: "15 Jul 2026",
    redemptions: 28,
    status: "Active",
  },
  {
    id: "o3",
    title: "Weekend 15% Off",
    discount: "15% off",
    validUntil: "Every Sat-Sun",
    redemptions: 67,
    status: "Active",
  },
];

export const aiRecommendations = [
  {
    id: "ai1",
    title: "Boost beverage attach at lunch",
    insight: "Only 52% attach rate during 12–3 PM vs 74% at dinner. Push combo prompts on QR menu.",
    impact: "High" as const,
    action: "Enable lunch combo banner",
  },
  {
    id: "ai2",
    title: "Upsell energy drinks with starters",
    insight: "Chicken 65 orders rarely include beverages. Energy drinks pair well with spicy starters.",
    impact: "Medium" as const,
    action: "Add energy drink suggestion on starters",
  },
  {
    id: "ai3",
    title: "Activate table 5 billing",
    insight: "Table 5 has been in billing state for 18 mins. Consider follow-up for faster turnover.",
    impact: "Low" as const,
    action: "Send bill reminder",
  },
];

export const qrMenuStatus = {
  isPublished: true,
  lastUpdated: "18 Jun 2026, 2:30 PM",
  scansToday: 234,
  ordersViaQR: 89,
  conversionRate: 38,
};
