export type CuisineType =
  | "Biryani"
  | "QSR"
  | "Café"
  | "Chinese"
  | "South Indian"
  | "Pizza"
  | "Casual Dining";

export type City =
  | "Hyderabad"
  | "Bangalore"
  | "Mumbai"
  | "Delhi NCR"
  | "Pune"
  | "Chennai";

export interface Restaurant {
  id: string;
  name: string;
  cuisine: CuisineType;
  city: City;
  rating: number;
  distance: string;
  offer?: string;
  image: string;
  beverageAttachRate: number;
  isOpen: boolean;
  deliveryModes: ("dine-in" | "takeaway" | "delivery")[];
}

export const restaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Paradise Biryani",
    cuisine: "Biryani",
    city: "Hyderabad",
    rating: 4.6,
    distance: "1.2 km",
    offer: "Free beverage with Family Pack",
    image: "🍛",
    beverageAttachRate: 72,
    isOpen: true,
    deliveryModes: ["dine-in", "takeaway", "delivery"],
  },
  {
    id: "r2",
    name: "Meghana Foods",
    cuisine: "Biryani",
    city: "Bangalore",
    rating: 4.5,
    distance: "2.4 km",
    offer: "Biryani + Cola @ ₹349",
    image: "🥘",
    beverageAttachRate: 68,
    isOpen: true,
    deliveryModes: ["dine-in", "takeaway", "delivery"],
  },
  {
    id: "r3",
    name: "Social Offline",
    cuisine: "Casual Dining",
    city: "Mumbai",
    rating: 4.4,
    distance: "3.1 km",
    offer: "20% off on combos",
    image: "🍽️",
    beverageAttachRate: 61,
    isOpen: true,
    deliveryModes: ["dine-in", "takeaway"],
  },
  {
    id: "r4",
    name: "Karim's",
    cuisine: "Biryani",
    city: "Delhi NCR",
    rating: 4.7,
    distance: "0.8 km",
    offer: "Beverage Combo Deal",
    image: "🍖",
    beverageAttachRate: 74,
    isOpen: true,
    deliveryModes: ["dine-in", "takeaway", "delivery"],
  },
  {
    id: "r5",
    name: "Vaishali",
    cuisine: "South Indian",
    city: "Pune",
    rating: 4.3,
    distance: "1.5 km",
    offer: "Fruit Drink with Breakfast",
    image: "🥞",
    beverageAttachRate: 55,
    isOpen: true,
    deliveryModes: ["dine-in", "takeaway"],
  },
  {
    id: "r6",
    name: "Mainland China",
    cuisine: "Chinese",
    city: "Chennai",
    rating: 4.5,
    distance: "4.2 km",
    offer: "Lemon Soda with Dim Sum",
    image: "🥟",
    beverageAttachRate: 58,
    isOpen: true,
    deliveryModes: ["dine-in", "delivery"],
  },
  {
    id: "r7",
    name: "Café Coffee Day",
    cuisine: "Café",
    city: "Bangalore",
    rating: 4.1,
    distance: "0.5 km",
    offer: "Cola Zero pairing",
    image: "☕",
    beverageAttachRate: 49,
    isOpen: true,
    deliveryModes: ["dine-in", "takeaway"],
  },
  {
    id: "r8",
    name: "Domino's Pizza",
    cuisine: "Pizza",
    city: "Mumbai",
    rating: 4.2,
    distance: "2.0 km",
    offer: "Pizza + Lemon Soda @ ₹499",
    image: "🍕",
    beverageAttachRate: 65,
    isOpen: true,
    deliveryModes: ["delivery", "takeaway"],
  },
  {
    id: "r9",
    name: "McDonald's",
    cuisine: "QSR",
    city: "Delhi NCR",
    rating: 4.0,
    distance: "1.8 km",
    offer: "Meal + Cola upgrade",
    image: "🍔",
    beverageAttachRate: 78,
    isOpen: true,
    deliveryModes: ["dine-in", "takeaway", "delivery"],
  },
  {
    id: "r10",
    name: "Saravana Bhavan",
    cuisine: "South Indian",
    city: "Chennai",
    rating: 4.4,
    distance: "2.7 km",
    offer: "Fruit Drink with Meals",
    image: "🍚",
    beverageAttachRate: 52,
    isOpen: false,
    deliveryModes: ["dine-in", "takeaway"],
  },
];

export const cuisineFilters = [
  "All",
  "Biryani",
  "QSR",
  "Café",
  "Chinese",
  "South Indian",
  "Pizza",
  "Casual Dining",
] as const;

export const cities: City[] = [
  "Hyderabad",
  "Bangalore",
  "Mumbai",
  "Delhi NCR",
  "Pune",
  "Chennai",
];

export const cityMetrics = [
  { city: "Hyderabad", outlets: 842, attachRate: 71, bills: 12400 },
  { city: "Bangalore", outlets: 756, attachRate: 68, bills: 11200 },
  { city: "Mumbai", outlets: 920, attachRate: 64, bills: 14800 },
  { city: "Delhi NCR", outlets: 1105, attachRate: 69, bills: 16200 },
  { city: "Pune", outlets: 534, attachRate: 62, bills: 7800 },
  { city: "Chennai", outlets: 612, attachRate: 58, bills: 8900 },
];
