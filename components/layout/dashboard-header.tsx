import { UserNav } from "@/components/auth/user-nav"
import type { Profile } from "@/lib/supabase/types"

interface DashboardHeaderProps {
  user: Profile
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <div className="flex-1">
        <h1 className="text-lg font-semibold">Startup Kit</h1>
      </div>
      <UserNav user={user} />
    </header>
  )
}
