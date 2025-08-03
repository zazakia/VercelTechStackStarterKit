"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, Settings, Shield, Building2 } from "lucide-react"
import type { Profile } from "@/lib/supabase/types"

interface DashboardNavProps {
  user: Profile
}

export function DashboardNav({ user }: DashboardNavProps) {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Profile",
      icon: Users,
      href: "/dashboard/profile",
      active: pathname === "/dashboard/profile",
    },
    {
      label: "Organizations",
      icon: Building2,
      href: "/dashboard/organizations",
      active: pathname.startsWith("/dashboard/organizations"),
    },
  ]

  // Add admin routes for admin users
  if (user.role === "admin" || user.role === "super_admin") {
    routes.push(
      {
        label: "User Management",
        icon: Users,
        href: "/dashboard/users",
        active: pathname.startsWith("/dashboard/users"),
      },
      {
        label: "Role Management",
        icon: Shield,
        href: "/dashboard/roles",
        active: pathname.startsWith("/dashboard/roles"),
      },
    )
  }

  routes.push({
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    active: pathname === "/dashboard/settings",
  })

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {routes.map((route) => (
        <Link key={route.href} href={route.href}>
          <Button
            variant={route.active ? "secondary" : "ghost"}
            className={cn("w-full justify-start", route.active && "bg-muted")}
          >
            <route.icon className="mr-2 h-4 w-4" />
            {route.label}
          </Button>
        </Link>
      ))}
    </nav>
  )
}
