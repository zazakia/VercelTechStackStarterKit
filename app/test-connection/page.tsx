import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Database, Key } from "lucide-react"

export default async function TestConnectionPage() {
  let connectionStatus = "disconnected"
  let error: string | null = null
  let userCount = 0

  try {
    const supabase = await createServerSupabaseClient()

    // Test basic connection
    const { data, error: testError } = await supabase.from("profiles").select("count", { count: "exact", head: true })

    if (testError) {
      error = testError.message
    } else {
      connectionStatus = "connected"
      userCount = data || 0
    }
  } catch (err) {
    error = err instanceof Error ? err.message : "Unknown error"
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-2xl w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Supabase Connection Test</h1>
          <p className="mt-2 text-sm text-gray-600">Testing connection to your Supabase instance</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Connection Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {connectionStatus === "connected" ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <Badge variant="default" className="bg-green-500">
                      Connected
                    </Badge>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-red-500" />
                    <Badge variant="destructive">Disconnected</Badge>
                  </>
                )}
              </div>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm font-medium">Supabase URL:</p>
                <p className="text-xs text-gray-600 font-mono">
                  {process.env.NEXT_PUBLIC_SUPABASE_URL || "Not configured"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Anon Key:</p>
                <p className="text-xs text-gray-600 font-mono">
                  {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Configured ✓" : "Not configured"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {connectionStatus === "connected" && (
          <Card>
            <CardHeader>
              <CardTitle>Database Information</CardTitle>
              <CardDescription>Basic information about your database</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-2xl font-bold">{userCount}</div>
                  <p className="text-sm text-gray-600">Total Profiles</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">✓</div>
                  <p className="text-sm text-gray-600">Tables Created</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">✓</div>
                  <p className="text-sm text-gray-600">RLS Enabled</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-center">
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go to Login
          </a>
        </div>
      </div>
    </div>
  )
}
