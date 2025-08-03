import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Building2, Shield, Activity } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", session?.user.id).single()

  // Get some basic stats
  const { count: userCount } = await supabase.from("profiles").select("*", { count: "exact", head: true })

  const { count: orgCount } = await supabase.from("organizations").select("*", { count: "exact", head: true })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {profile?.full_name || profile?.email}!</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCount || 0}</div>
            <p className="text-xs text-muted-foreground">Registered users in the system</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organizations</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orgCount || 0}</div>
            <p className="text-xs text-muted-foreground">Active organizations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Role</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{profile?.role.replace("_", " ")}</div>
            <p className="text-xs text-muted-foreground">Current access level</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{profile?.status}</div>
            <p className="text-xs text-muted-foreground">Account status</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Welcome to Startup Kit</CardTitle>
            <CardDescription>Your modern web application foundation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">This starter kit includes:</p>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Authentication with Supabase</li>
              <li>• Role-based access control</li>
              <li>• User and organization management</li>
              <li>• Modern UI with shadcn/ui</li>
              <li>• TypeScript support</li>
              <li>• Responsive design</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm space-y-2">
              <p>• Update your profile</p>
              <p>• Manage organizations</p>
              {(profile?.role === "admin" || profile?.role === "super_admin") && (
                <>
                  <p>• Manage users</p>
                  <p>• Configure roles</p>
                </>
              )}
              <p>• Adjust settings</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
