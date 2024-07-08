import { Home, LayoutGrid, Rocket, Settings, User } from "lucide-react";

export const SideMenuList = [
  {
    id: 1,
    name: "Dashboard",
    path: "/seller",
    icon: Home,
  },
  {
    id: 2,
    name: "Orders",
    path: "/seller/orders",
    icon: Rocket,
  },
  {
    id: 3,
    name: "Products",
    path: "/seller/products",
    icon: LayoutGrid,
  },
  {
    id: 4,
    name: "Payouts",
    path: "/seller/payouts",
    icon: Settings,
  },
  {
    id: 5,
    name: "User",
    path: "/seller/profile",
    icon: User,
  },
];
