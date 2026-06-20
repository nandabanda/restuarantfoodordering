import {
  BarChart3,
  ChefHat,
  Home,
  LayoutDashboard,
  QrCode,
  ShoppingBag,
  Store,
  Zap,
} from "lucide-react";

export const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Restaurant", href: "/restaurant", icon: LayoutDashboard },
  { label: "POS Billing", href: "/pos", icon: Store },
  { label: "Menu Manager", href: "/menu", icon: ChefHat },
  { label: "QR Menu", href: "/qr-menu", icon: QrCode },
  { label: "Consumer App", href: "/consumer", icon: ShoppingBag },
  { label: "Pepsi Command", href: "/pepsi-command", icon: Zap },
  { label: "Insights", href: "/insights", icon: BarChart3 },
];

export const productModules = [
  {
    title: "Restaurant POS",
    description: "Lightning-fast billing, table management, and Pepsi combo upsell at checkout.",
    href: "/pos",
    icon: Store,
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    title: "QR Menu & Ordering",
    description: "Contactless digital menus with instant ordering — no app download required.",
    href: "/qr-menu",
    icon: QrCode,
    gradient: "from-indigo-600 to-blue-500",
  },
  {
    title: "Consumer Discovery",
    description: "Nearby restaurants, Pepsi combo offers, and seamless reorder experiences.",
    href: "/consumer",
    icon: ShoppingBag,
    gradient: "from-sky-600 to-teal-500",
  },
  {
    title: "Pepsi Command Center",
    description: "Enterprise HORECA intelligence — attach rates, trade deals, and AI actions.",
    href: "/pepsi-command",
    icon: Zap,
    gradient: "from-red-600 to-blue-700",
  },
];
