export const pepsiProducts = [
  { id: "pepsi", name: "Pepsi", color: "#0054A6", tagline: "For the Love of It" },
  { id: "pepsi-black", name: "Pepsi Black", color: "#1a1a1a", tagline: "Zero Sugar Boldness" },
  { id: "7up", name: "7UP", color: "#00A651", tagline: "Feel Fresh" },
  { id: "mountain-dew", name: "Mountain Dew", color: "#A4D233", tagline: "Darr Ke Aage Jeet Hai" },
  { id: "mirinda", name: "Mirinda", color: "#FF6600", tagline: "Zing of Orange" },
  { id: "sting", name: "Sting", color: "#FFD100", tagline: "Energy Redefined" },
  { id: "slice", name: "Slice", color: "#FF4500", tagline: "Aam Sutra" },
];

export const pepsiCombos = [
  {
    id: "combo-1",
    name: "Biryani + Pepsi Combo",
    items: ["Chicken Biryani", "Pepsi 750ml"],
    price: 349,
    savings: 49,
    product: "Pepsi",
  },
  {
    id: "combo-2",
    name: "Pizza Feast + 7UP",
    items: ["Medium Margherita", "7UP 750ml"],
    price: 499,
    savings: 79,
    product: "7UP",
  },
  {
    id: "combo-3",
    name: "Spicy Meal + Sting",
    items: ["Paneer Tikka Roll", "Sting Energy"],
    price: 249,
    savings: 39,
    product: "Sting",
  },
  {
    id: "combo-4",
    name: "South Indian Thali + Slice",
    items: ["Mini Meals Thali", "Slice Mango"],
    price: 299,
    savings: 59,
    product: "Slice",
  },
];

export const tradeDeals = [
  { name: "Summer Coolers Push", outlets: 2840, roi: 3.2, status: "Active" },
  { name: "Biryani + Pepsi Bundle", outlets: 1920, roi: 4.1, status: "Active" },
  { name: "QSR Fountain Upgrade", outlets: 890, roi: 2.8, status: "Scaling" },
  { name: "Café Premium Pour", outlets: 560, roi: 3.6, status: "Active" },
];

export const newLaunches = [
  { product: "Pepsi Black 300ml", adoption: 68, target: 75, cities: 42 },
  { product: "Sting Gold Rush", adoption: 54, target: 70, cities: 28 },
  { product: "Slice Fizz", adoption: 41, target: 60, cities: 18 },
];
