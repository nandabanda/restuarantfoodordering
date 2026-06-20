export const networkIntelligence = {
  totalRestaurants: 4769,
  activeRestaurants: 4234,
  monthlyOrders: 2136000,
  footfall: 8520000,
  averageTicketSize: 486,
  totalChange: 14.2,
  activeChange: 11.8,
  ordersChange: 18.4,
  footfallChange: 16.2,
  ticketChange: 4.6,
};

export const consumerIntelligence = {
  consumerGrowth: 22.4,
  repeatRate: 34.8,
  spendingTrend: 12.6,
  daypartTrends: [
    { daypart: "Breakfast", orders: 8400, spend: 312 },
    { daypart: "Lunch", orders: 28400, spend: 428 },
    { daypart: "Snacks", orders: 16200, spend: 268 },
    { daypart: "Dinner", orders: 42100, spend: 542 },
    { daypart: "Late Night", orders: 9800, spend: 386 },
  ],
  cohorts: [
    { cohort: "Power Users", share: 18, repeatRate: 72, avgSpend: 680 },
    { cohort: "Regulars", share: 34, repeatRate: 48, avgSpend: 420 },
    { cohort: "Occasional", share: 32, repeatRate: 22, avgSpend: 310 },
    { cohort: "New", share: 16, repeatRate: 8, avgSpend: 280 },
  ],
};

export const menuIntelligence = {
  topSellingItems: [
    { name: "Hyderabadi Chicken Biryani", orders: 48200, growth: 18 },
    { name: "Biryani + Cola Combo", orders: 36800, growth: 24 },
    { name: "Butter Chicken", orders: 28400, growth: 12 },
    { name: "Margherita Pizza", orders: 22100, growth: 15 },
    { name: "Cola Classic 750ml", orders: 89400, growth: 8 },
  ],
  menuGaps: [
    { gap: "Family Combo Meals", outlets: 1240, potential: "High" },
    { gap: "Beverage Bundles", outlets: 2180, potential: "Critical" },
    { gap: "Late Night Snacks", outlets: 890, potential: "Medium" },
    { gap: "Breakfast Beverages", outlets: 1560, potential: "High" },
  ],
  crossSellOpportunities: [
    { trigger: "Biryani Orders", suggestion: "Cola Classic pairing", uplift: "18%" },
    { trigger: "Spicy Starters", suggestion: "Energy Drink upsell", uplift: "14%" },
    { trigger: "Pizza Orders", suggestion: "Lemon Soda bundle", uplift: "22%" },
    { trigger: "South Indian Meals", suggestion: "Fruit Drink add-on", uplift: "16%" },
  ],
  comboPerformance: [
    { combo: "Biryani + Cola", conversion: 42, attachRate: 68 },
    { combo: "Pizza + Lemon Soda", conversion: 38, attachRate: 61 },
    { combo: "Meal + Energy", conversion: 28, attachRate: 54 },
    { combo: "Thali + Fruit Drink", conversion: 35, attachRate: 58 },
  ],
  cuisineGrowth: [
    { cuisine: "Biryani", growth: 18, outlets: 1240 },
    { cuisine: "QSR", growth: 12, outlets: 980 },
    { cuisine: "Pizza", growth: 15, outlets: 620 },
    { cuisine: "Café", growth: 22, outlets: 410 },
    { cuisine: "South Indian", growth: 8, outlets: 890 },
  ],
};

export const tradeIntelligence = {
  campaignPerformance: [
    { campaign: "Summer Coolers Push", roi: 3.2, outlets: 2840, spend: "₹2.4Cr" },
    { campaign: "Biryani + Cola Bundle", roi: 4.1, outlets: 1920, spend: "₹1.8Cr" },
    { campaign: "QSR Fountain Upgrade", roi: 2.8, outlets: 890, spend: "₹1.2Cr" },
    { campaign: "Café Premium Pour", roi: 3.6, outlets: 560, spend: "₹90L" },
  ],
  productLaunches: [
    { product: "Cola Zero 300ml", adoption: 68, target: 75, cities: 42 },
    { product: "Energy Drink Gold", adoption: 54, target: 70, cities: 28 },
    { product: "Fruit Drink Fizz", adoption: 41, target: 60, cities: 18 },
    { product: "Premium Water 1L", adoption: 36, target: 55, cities: 24 },
  ],
  outletActivations: {
    total: 387,
    thisMonth: 124,
    pending: 82,
    completed: 305,
  },
  promotionROI: 3.4,
  beverageAttachRate: 64.8,
  menuPenetration: 78.2,
  productAdoption: 58.4,
};

export const aiActionBoard = [
  {
    id: "ai1",
    title: "Low beverage attach during dinner",
    insight: "124 restaurants have low beverage attach rates during dinner hours. Targeted combo prompts can lift attach by 12–18%.",
    impact: "Critical" as const,
    action: "Deploy dinner attach playbook",
    metric: "124 outlets",
  },
  {
    id: "ai2",
    title: "Hyderabad biryani combo gap",
    insight: "Hyderabad biryani outlets show strong growth but weak combo conversion. Bundle pricing can unlock ₹4.2Cr potential.",
    impact: "High" as const,
    action: "Launch biryani combo campaign",
    metric: "842 outlets",
  },
  {
    id: "ai3",
    title: "Premium café sparkling trend",
    insight: "Premium cafés are over-indexing on sparkling beverages. Expand premium pour program to 410 café outlets.",
    impact: "High" as const,
    action: "Scale café premium program",
    metric: "+22% growth",
  },
  {
    id: "ai4",
    title: "Menu expansion opportunities",
    insight: "82 outlets present menu expansion opportunities — missing family combos and beverage bundles.",
    impact: "Medium" as const,
    action: "Activate menu gap outreach",
    metric: "82 outlets",
  },
];
