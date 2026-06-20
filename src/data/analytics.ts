export const footfallByDaypart = [
  { daypart: "Breakfast", footfall: 4200, attachRate: 42 },
  { daypart: "Lunch", footfall: 12400, attachRate: 58 },
  { daypart: "Snacks", footfall: 8600, attachRate: 52 },
  { daypart: "Dinner", footfall: 18200, attachRate: 71 },
  { daypart: "Late Night", footfall: 5400, attachRate: 65 },
];

export const topCuisines = [
  { cuisine: "Biryani", growth: 18, attachRate: 72, outlets: 1240 },
  { cuisine: "QSR", growth: 12, attachRate: 78, outlets: 980 },
  { cuisine: "Pizza", growth: 15, attachRate: 65, outlets: 620 },
  { cuisine: "South Indian", growth: 8, attachRate: 52, outlets: 890 },
  { cuisine: "Chinese", growth: 10, attachRate: 58, outlets: 540 },
  { cuisine: "Café", growth: 22, attachRate: 48, outlets: 410 },
  { cuisine: "Casual Dining", growth: 14, attachRate: 61, outlets: 380 },
];

export const menuOpportunities = [
  { item: "Family Combo Meals", gap: "High demand, low menu presence", potential: "₹2.4Cr" },
  { item: "Beverage Bundles", gap: "Only 34% menus have combos", potential: "₹1.8Cr" },
  { item: "Late Night Snacks", gap: "Sting attach opportunity", potential: "₹90L" },
  { item: "Breakfast Beverages", gap: "Slice under-indexed", potential: "₹1.2Cr" },
];

export const pepsiProductGaps = [
  { product: "Pepsi Black", current: 28, target: 45, gap: 17 },
  { product: "Sting", current: 34, target: 50, gap: 16 },
  { product: "Slice", current: 22, target: 35, gap: 13 },
  { product: "Mirinda", current: 18, target: 30, gap: 12 },
  { product: "Mountain Dew", current: 31, target: 40, gap: 9 },
];

export const consumerBehavior = [
  { behavior: "QR Menu Orders", percentage: 42, trend: "+8%" },
  { behavior: "Combo Selection", percentage: 38, trend: "+12%" },
  { behavior: "Reorder Rate", percentage: 34, trend: "+5%" },
  { behavior: "Pepsi Add-on", percentage: 64, trend: "+6%" },
  { behavior: "Delivery Orders", percentage: 48, trend: "+15%" },
];

export const restaurantSegmentation = [
  { segment: "High Performers", count: 842, attachRate: 78, color: "#0054A6" },
  { segment: "Growth Potential", count: 1560, attachRate: 58, color: "#0EA5E9" },
  { segment: "Needs Activation", count: 980, attachRate: 42, color: "#94A3B8" },
  { segment: "New Onboarded", count: 387, attachRate: 35, color: "#E4002B" },
];

export const beverageByCuisine = [
  { cuisine: "Biryani", pepsi: 45, sting: 12, slice: 8, other: 35 },
  { cuisine: "QSR", pepsi: 62, sting: 18, slice: 5, other: 15 },
  { cuisine: "Pizza", pepsi: 28, sting: 8, slice: 12, other: 52 },
  { cuisine: "South Indian", pepsi: 22, sting: 6, slice: 38, other: 34 },
  { cuisine: "Chinese", pepsi: 35, sting: 10, slice: 15, other: 40 },
  { cuisine: "Café", pepsi: 18, sting: 8, slice: 10, other: 64 },
];

export const cuisineGrowthTrend = [
  { month: "Jan", biryani: 820, qsr: 680, pizza: 420, cafe: 280 },
  { month: "Feb", biryani: 860, qsr: 710, pizza: 440, cafe: 310 },
  { month: "Mar", biryani: 920, qsr: 740, pizza: 470, cafe: 340 },
  { month: "Apr", biryani: 980, qsr: 780, pizza: 510, cafe: 370 },
  { month: "May", biryani: 1050, qsr: 820, pizza: 540, cafe: 390 },
  { month: "Jun", biryani: 1120, qsr: 860, pizza: 580, cafe: 410 },
];

export const aiOpportunities = [
  {
    id: "opp1",
    title: "Hyderabad Biryani Belt Expansion",
    description: "842 outlets with 71% attach — expand trade deals to 200 new biryani outlets.",
    revenue: "₹4.2Cr potential",
    priority: "Critical",
  },
  {
    id: "opp2",
    title: "Café Segment Beverage Push",
    description: "Cafés growing 22% YoY but only 48% attach. Launch Pepsi Black premium pairing.",
    revenue: "₹1.8Cr potential",
    priority: "High",
  },
  {
    id: "opp3",
    title: "Late Night Sting Activation",
    description: "Late night footfall up 15% — Sting attach only 34%. Target QSR & casual dining.",
    revenue: "₹2.1Cr potential",
    priority: "High",
  },
  {
    id: "opp4",
    title: "QR Menu Conversion Boost",
    description: "38% QR-to-order conversion. AI combo prompts can lift to 50%+.",
    revenue: "₹3.5Cr potential",
    priority: "Medium",
  },
];

export const weeklySalesTrend = [
  { day: "Mon", sales: 62000, bills: 98 },
  { day: "Tue", sales: 58000, bills: 92 },
  { day: "Wed", sales: 71000, bills: 118 },
  { day: "Thu", sales: 68000, bills: 108 },
  { day: "Fri", sales: 92000, bills: 156 },
  { day: "Sat", sales: 98000, bills: 168 },
  { day: "Sun", sales: 84750, bills: 142 },
];

export const attachRateTrend = [
  { week: "W1", rate: 58 },
  { week: "W2", rate: 61 },
  { week: "W3", rate: 63 },
  { week: "W4", rate: 65 },
  { week: "W5", rate: 64 },
  { week: "W6", rate: 68 },
];
