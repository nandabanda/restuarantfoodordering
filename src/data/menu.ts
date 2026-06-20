export type MenuCategory =
  | "Starters"
  | "Main Course"
  | "Biryani"
  | "Breads"
  | "Beverages"
  | "Desserts"
  | "Combos";

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  image: string;
  description: string;
  isVeg: boolean;
  isBestseller?: boolean;
  beveragePairing?: string;
}

export const menuCategories: MenuCategory[] = [
  "Starters",
  "Main Course",
  "Biryani",
  "Breads",
  "Beverages",
  "Desserts",
  "Combos",
];

export const menuItems: MenuItem[] = [
  {
    id: "m1",
    name: "Chicken 65",
    category: "Starters",
    price: 289,
    image: "🍗",
    description: "Crispy Andhra-style fried chicken",
    isVeg: false,
    isBestseller: true,
    beveragePairing: "Cola Classic",
  },
  {
    id: "m2",
    name: "Paneer Tikka",
    category: "Starters",
    price: 249,
    image: "🧀",
    description: "Smoky tandoori paneer cubes",
    isVeg: true,
    beveragePairing: "Lemon Soda",
  },
  {
    id: "m3",
    name: "Hyderabadi Chicken Biryani",
    category: "Biryani",
    price: 349,
    image: "🍛",
    description: "Dum-cooked aromatic basmati biryani",
    isVeg: false,
    isBestseller: true,
    beveragePairing: "Cola Classic",
  },
  {
    id: "m4",
    name: "Veg Dum Biryani",
    category: "Biryani",
    price: 279,
    image: "🥘",
    description: "Fragrant veg biryani with raita",
    isVeg: true,
    beveragePairing: "Fruit Drink",
  },
  {
    id: "m5",
    name: "Butter Chicken",
    category: "Main Course",
    price: 329,
    image: "🍖",
    description: "Creamy tomato-based curry",
    isVeg: false,
    isBestseller: true,
    beveragePairing: "Cola Classic",
  },
  {
    id: "m6",
    name: "Dal Makhani",
    category: "Main Course",
    price: 249,
    image: "🫘",
    description: "Slow-cooked black lentils",
    isVeg: true,
    beveragePairing: "Lemon Soda",
  },
  {
    id: "m7",
    name: "Garlic Naan",
    category: "Breads",
    price: 69,
    image: "🫓",
    description: "Fresh tandoor garlic naan",
    isVeg: true,
  },
  {
    id: "m8",
    name: "Cola Classic 750ml",
    category: "Beverages",
    price: 60,
    image: "🥤",
    description: "Chilled cola — perfect pairing",
    isVeg: true,
    isBestseller: true,
  },
  {
    id: "m9",
    name: "Lemon Soda 750ml",
    category: "Beverages",
    price: 60,
    image: "🍋",
    description: "Crisp & refreshing lemon soda",
    isVeg: true,
  },
  {
    id: "m10",
    name: "Gulab Jamun",
    category: "Desserts",
    price: 99,
    image: "🍮",
    description: "Warm milk dumplings in syrup",
    isVeg: true,
    beveragePairing: "Orange Sparkle",
  },
  {
    id: "m11",
    name: "Biryani + Cola Classic Combo",
    category: "Combos",
    price: 399,
    image: "⭐",
    description: "Chicken biryani + Cola Classic 750ml",
    isVeg: false,
    isBestseller: true,
    beveragePairing: "Cola Classic",
  },
  {
    id: "m12",
    name: "Family Feast Combo",
    category: "Combos",
    price: 899,
    image: "👨‍👩‍👧‍👦",
    description: "2 Biryanis + 2 Cola Classic + Raita",
    isVeg: false,
    isBestseller: true,
    beveragePairing: "Cola Classic",
  },
];

export const posTables = [
  { id: "t1", number: 1, status: "occupied" as const, guests: 4 },
  { id: "t2", number: 2, status: "available" as const, guests: 0 },
  { id: "t3", number: 3, status: "occupied" as const, guests: 2 },
  { id: "t4", number: 4, status: "available" as const, guests: 0 },
  { id: "t5", number: 5, status: "billing" as const, guests: 3 },
  { id: "t6", number: 6, status: "available" as const, guests: 0 },
  { id: "t7", number: 7, status: "occupied" as const, guests: 6 },
  { id: "t8", number: 8, status: "available" as const, guests: 0 },
];

// ─── AI Menu Digitizer ───────────────────────────────────────────────

export interface DigitizedMenuItem {
  id: string;
  name: string;
  price: number;
  isVeg: boolean;
  isPremium?: boolean;
  beveragePairing?: string;
}

export interface DigitizedMenuCategory {
  id: string;
  name: string;
  icon: string;
  items: DigitizedMenuItem[];
  averagePrice: number;
  topItem: string;
}

export const digitizedMenuCategories: DigitizedMenuCategory[] = [
  {
    id: "snacks-chaat",
    name: "Snacks & Chaat",
    icon: "🥗",
    averagePrice: 150,
    topItem: "Chole Bhature",
    items: [
      { id: "sc1", name: "Pani Puri", price: 89, isVeg: true },
      { id: "sc2", name: "Kurmuri Choupaty Bhel", price: 89, isVeg: true },
      { id: "sc3", name: "Dahi Samosa", price: 109, isVeg: true },
      { id: "sc4", name: "Dahi Papdi Chaat", price: 109, isVeg: true },
      { id: "sc5", name: "Dahi Vada", price: 109, isVeg: true },
      { id: "sc6", name: "Dahi Puri", price: 109, isVeg: true },
      { id: "sc7", name: "Aloo Tikki Chole", price: 139, isVeg: true, beveragePairing: "Lemon Soda" },
      { id: "sc8", name: "Chole Samosa", price: 129, isVeg: true },
      { id: "sc9", name: "Raj Kachori", price: 159, isVeg: true, isPremium: true },
      { id: "sc10", name: "Pav Bhaji", price: 199, isVeg: true, isPremium: true, beveragePairing: "Cola Classic" },
      { id: "sc11", name: "Cheese Pav Bhaji", price: 219, isVeg: true, isPremium: true, beveragePairing: "Cola Classic" },
      { id: "sc12", name: "Chole Bhature", price: 229, isVeg: true, isPremium: true, beveragePairing: "Cola Classic" },
    ],
  },
  {
    id: "sandwiches",
    name: "Sandwiches",
    icon: "🥪",
    averagePrice: 166,
    topItem: "Paneer Tikka Sandwich",
    items: [
      { id: "sw1", name: "Veggie Mayo Sandwich Grilled", price: 129, isVeg: true },
      { id: "sw2", name: "Paneer Tikka Sandwich Grilled", price: 169, isVeg: true },
      { id: "sw3", name: "Corn & Spinach Sandwich Grilled", price: 159, isVeg: true },
      { id: "sw4", name: "Bombay Masala Toastie", price: 159, isVeg: true },
      { id: "sw5", name: "Paneer Tikka Sandwich", price: 189, isVeg: true, isPremium: true },
      { id: "sw6", name: "Grilled with Cheese", price: 179, isVeg: true },
      { id: "sw7", name: "Bombay Masala Toastie with Cheese", price: 179, isVeg: true },
    ],
  },
  {
    id: "south-indian",
    name: "South Indian",
    icon: "🫔",
    averagePrice: 154,
    topItem: "Cheese Mysore Masala Dosa",
    items: [
      { id: "si1", name: "Plain Dosa", price: 129, isVeg: true },
      { id: "si2", name: "Masala Dosa", price: 169, isVeg: true, beveragePairing: "Fruit Drink" },
      { id: "si3", name: "Mysore Masala Dosa", price: 179, isVeg: true },
      { id: "si4", name: "Cheese Plain Dosa", price: 169, isVeg: true },
      { id: "si5", name: "Cheese Masala Dosa", price: 189, isVeg: true, isPremium: true },
      { id: "si6", name: "Cheese Mysore Masala Dosa", price: 199, isVeg: true, isPremium: true },
      { id: "si7", name: "Idli Sambhar", price: 99, isVeg: true, beveragePairing: "Premium Water" },
      { id: "si8", name: "Vada Sambhar", price: 109, isVeg: true },
      { id: "si9", name: "Idli Vada Sambhar", price: 109, isVeg: true },
      { id: "si10", name: "Onion Uttapam", price: 129, isVeg: true },
      { id: "si11", name: "Onion Tomato Uttapam", price: 129, isVeg: true },
      { id: "si12", name: "Vegetable Uttapam", price: 149, isVeg: true },
    ],
  },
  {
    id: "indian-main",
    name: "Indian Main Course",
    icon: "🍛",
    averagePrice: 309,
    topItem: "Paneer Butter Masala",
    items: [
      { id: "im1", name: "Dal Fry", price: 249, isVeg: true },
      { id: "im2", name: "Dal Makhani", price: 289, isVeg: true, isPremium: true, beveragePairing: "Lemon Soda" },
      { id: "im3", name: "Mix Vegetable", price: 289, isVeg: true },
      { id: "im4", name: "Paneer Butter Masala", price: 329, isVeg: true, isPremium: true, beveragePairing: "Premium Water" },
      { id: "im5", name: "Paneer Takatak", price: 329, isVeg: true, isPremium: true, beveragePairing: "Premium Water" },
      { id: "im6", name: "Palak Paneer", price: 329, isVeg: true, isPremium: true },
      { id: "im7", name: "Kadhai Paneer", price: 329, isVeg: true, isPremium: true },
      { id: "im8", name: "Paneer Tikka Masala", price: 329, isVeg: true, isPremium: true, beveragePairing: "Cola Classic" },
    ],
  },
  {
    id: "rice",
    name: "Rice",
    icon: "🍚",
    averagePrice: 149,
    topItem: "Peas Rice",
    items: [
      { id: "ri1", name: "Curd Rice", price: 129, isVeg: true },
      { id: "ri2", name: "Lemon Rice", price: 129, isVeg: true },
      { id: "ri3", name: "Steam Rice", price: 149, isVeg: true },
      { id: "ri4", name: "Ghee Rice", price: 159, isVeg: true },
      { id: "ri5", name: "Jeera Rice", price: 159, isVeg: true },
      { id: "ri6", name: "Peas Rice", price: 169, isVeg: true },
    ],
  },
];

export const digitizationSteps = [
  { id: 1, label: "Upload Menu", description: "Import JPG, PNG, or PDF" },
  { id: 2, label: "Extract Items", description: "AI reads menu text & prices" },
  { id: 3, label: "Classify Categories", description: "Auto-group into sections" },
  { id: 4, label: "Generate QR Menu", description: "Build mobile-ready menu" },
  { id: 5, label: "Recommend Combos", description: "Identify beverage bundles" },
];

export const uploadedMenuPreview = {
  restaurantName: "Spice Garden Kitchen",
  location: "Jubilee Hills, Hyderabad",
  fileName: "spice-garden-menu-2026.pdf",
  fileSize: "2.4 MB",
  pages: 3,
  uploadedAt: "20 Jun 2026, 10:42 AM",
  cuisine: "Multi-Cuisine · Vegetarian",
};

export const menuInsights = {
  totalMenuItems: 45,
  categoriesDetected: 5,
  averageMenuPrice: 178,
  premiumItems: 14,
  comboOpportunities: 18,
  beverageGapScore: "High" as const,
};

export const categoryMixData = digitizedMenuCategories.map((cat) => ({
  category: cat.name.split(" ")[0] === "Indian" ? "Main Course" : cat.name.split(" & ")[0] || cat.name,
  fullName: cat.name,
  count: cat.items.length,
  share: Math.round((cat.items.length / 45) * 100),
}));

export const priceLadderData = digitizedMenuCategories.map((cat) => ({
  category: cat.name.length > 14 ? cat.name.slice(0, 12) + "…" : cat.name,
  min: Math.min(...cat.items.map((i) => i.price)),
  avg: cat.averagePrice,
  max: Math.max(...cat.items.map((i) => i.price)),
}));

export const comboOpportunityData = [
  { category: "Snacks & Chaat", opportunities: 6, attachPotential: 72 },
  { category: "Sandwiches", opportunities: 3, attachPotential: 58 },
  { category: "South Indian", opportunities: 5, attachPotential: 64 },
  { category: "Main Course", opportunities: 4, attachPotential: 78 },
  { category: "Rice", opportunities: 2, attachPotential: 52 },
];

export const comboRecommendations = [
  {
    id: "cr1",
    title: "Pav Bhaji & Chole Bhature beverage pairing",
    insight: "Add beverage pairing to Pav Bhaji and Chole Bhature — highest attach potential in chaat category.",
    impact: "High" as const,
    action: "Enable combo prompts",
    daypart: "All day",
  },
  {
    id: "cr2",
    title: "South Indian breakfast combo",
    insight: "Create South Indian breakfast combo between 8 AM and 11 AM — Idli/Vada + Premium Water bundle.",
    impact: "High" as const,
    action: "Schedule breakfast combo",
    daypart: "8 AM – 11 AM",
  },
  {
    id: "cr3",
    title: "Paneer main course bundle",
    insight: "Bundle Paneer Main Course with Premium Water or Lemon Soda — 4 premium items ready for pairing.",
    impact: "Critical" as const,
    action: "Create main course bundle",
    daypart: "Lunch & Dinner",
  },
  {
    id: "cr4",
    title: "Evening chaat combo",
    insight: "Launch evening chaat combo from 5 PM to 8 PM — Raj Kachori + beverage at ₹249.",
    impact: "Medium" as const,
    action: "Activate evening promo",
    daypart: "5 PM – 8 PM",
  },
  {
    id: "cr5",
    title: "Family meal combos",
    insight: "Add family meal combos for Indian Main Course + Rice + Beverage — unlock ₹350+ ticket size.",
    impact: "High" as const,
    action: "Design family packs",
    daypart: "Weekends",
  },
];

export const qrPreviewCombo = {
  title: "Pav Bhaji + Cola Classic",
  description: "Save ₹40 on this combo",
  price: 239,
  originalPrice: 279,
};

export const allDigitizedItems = digitizedMenuCategories.flatMap((cat) =>
  cat.items.map((item) => ({ ...item, category: cat.name, categoryIcon: cat.icon }))
);
