export const products = [
  { id: "cola-classic", name: "Cola Classic", color: "#0054A6", tagline: "The Original Refresh" },
  { id: "cola-zero", name: "Cola Zero", color: "#1a1a1a", tagline: "Zero Sugar, Full Flavor" },
  { id: "lemon-soda", name: "Lemon Soda", color: "#00A651", tagline: "Crisp & Bright" },
  { id: "orange-sparkle", name: "Orange Sparkle", color: "#FF6600", tagline: "Zesty Citrus Burst" },
  { id: "energy-drink", name: "Energy Drink", color: "#FFD100", tagline: "Power Through" },
  { id: "fruit-drink", name: "Fruit Drink", color: "#FF4500", tagline: "Real Fruit Taste" },
  { id: "premium-water", name: "Premium Water", color: "#0EA5E9", tagline: "Pure Hydration" },
];

export const beverageCombos = [
  {
    id: "combo-1",
    name: "Biryani + Cola Classic Combo",
    items: ["Chicken Biryani", "Cola Classic 750ml"],
    price: 349,
    savings: 49,
    product: "Cola Classic",
  },
  {
    id: "combo-2",
    name: "Pizza Feast + Lemon Soda",
    items: ["Medium Margherita", "Lemon Soda 750ml"],
    price: 499,
    savings: 79,
    product: "Lemon Soda",
  },
  {
    id: "combo-3",
    name: "Spicy Meal + Energy Drink",
    items: ["Paneer Tikka Roll", "Energy Drink"],
    price: 249,
    savings: 39,
    product: "Energy Drink",
  },
  {
    id: "combo-4",
    name: "South Indian Thali + Fruit Drink",
    items: ["Mini Meals Thali", "Fruit Drink Mango"],
    price: 299,
    savings: 59,
    product: "Fruit Drink",
  },
];

export const tradeDeals = [
  { name: "Summer Coolers Push", outlets: 2840, roi: 3.2, status: "Active" },
  { name: "Biryani + Cola Bundle", outlets: 1920, roi: 4.1, status: "Active" },
  { name: "QSR Fountain Upgrade", outlets: 890, roi: 2.8, status: "Scaling" },
  { name: "Café Premium Pour", outlets: 560, roi: 3.6, status: "Active" },
];

export const newLaunches = [
  { product: "Cola Zero 300ml", adoption: 68, target: 75, cities: 42 },
  { product: "Energy Drink Gold", adoption: 54, target: 70, cities: 28 },
  { product: "Fruit Drink Fizz", adoption: 41, target: 60, cities: 18 },
];

export const opportunityPipeline = [
  { name: "Hyderabad Biryani Belt", value: "₹4.2Cr", stage: "Qualified", outlets: 200 },
  { name: "Café Premium Activation", value: "₹1.8Cr", stage: "Discovery", outlets: 410 },
  { name: "Late Night Energy Push", value: "₹2.1Cr", stage: "In Progress", outlets: 980 },
  { name: "QR Conversion Boost", value: "₹3.5Cr", stage: "Qualified", outlets: 1200 },
];
