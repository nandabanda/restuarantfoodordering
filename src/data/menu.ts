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
