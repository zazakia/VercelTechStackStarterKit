import { createServerSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { UserTable } from "@/components/users/user-table"

export default async function UsersPage() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

  // Check if user has admin privileges
  if (!profile || (profile.role !== "admin" && profile.role !== "super_admin")) {
    redirect("/dashboard")
  }

  const { data: users } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">Manage users and their roles in the system</p>
      </div>

      {users && (
        <UserTable
          users={users}
          onEditUser={(user) => {
            // TODO: Implement edit user functionality
            console.log("Edit user:", user)
          }}
          onDeleteUser={(userId) => {
            // TODO: Implement delete user functionality
            console.log("Delete user:", userId)
          }}
        />
      )}
    </div>
  )
}
