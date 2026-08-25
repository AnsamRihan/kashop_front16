import {
  UserRoundPen,
  Bell,
  Package ,
} from "lucide-react"

export const userMenuItems = [
  {
    key: "profile",
    path: "/profile",
    icon: UserRoundPen,
  },
  {
    key: "orders",
    path: "/profile/orders",
    icon: Package ,
  },
  {
    key: "notifications",
    path: "#",
    icon: Bell,
  },
]