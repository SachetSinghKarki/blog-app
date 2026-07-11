import {
  Home,
  PenSquare,
  Bookmark,
  MessageCircle,
  Settings,
  User,
  Bell,
} from "lucide-react";

export const dashboardNavigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Write",
    href: "/dashboard/write",
    icon: PenSquare,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
  title: "Notifications",
  href: "/dashboard/notifications",
  icon: Bell,
},
  {
    title: "Bookmarks",
    href: "/dashboard/bookmarks",
    icon: Bookmark,
  },
  {
    title: "Chat",
    href: "/dashboard/chat",
    icon: MessageCircle,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },

] as const;