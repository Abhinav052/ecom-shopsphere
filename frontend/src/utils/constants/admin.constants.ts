import { Home, LayoutGrid, Rocket, Settings, User } from "lucide-react";

export const AdminSideMenuList = [
  {
    id: 1,
    name: "Dashboard",
    path: "/admin",
    icon: Home,
  },
  {
    id: 2,
    name: "Products",
    path: "/admin/products",
    icon: LayoutGrid,
  },
  {
    id: 3,
    name: "Users",
    path: "/admin/users",
    icon: User,
  },
  {
    id: 4,
    name: "Orders",
    path: "/admin/orders",
    icon: Settings,
  },
  //   {
  //     id: 5,
  //     name: "Sellers",
  //     path: "/admin/sellers",
  //     icon: User,
  //   },
];
