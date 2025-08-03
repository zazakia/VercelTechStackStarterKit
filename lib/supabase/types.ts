export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: "super_admin" | "admin" | "manager" | "user"
          status: "active" | "inactive" | "suspended"
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: "super_admin" | "admin" | "manager" | "user"
          status?: "active" | "inactive" | "suspended"
        }
        Update: {
          full_name?: string | null
          avatar_url?: string | null
          role?: "super_admin" | "admin" | "manager" | "user"
          status?: "active" | "inactive" | "suspended"
          updated_at?: string
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          logo_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          slug: string
          description?: string | null
          logo_url?: string | null
        }
        Update: {
          name?: string
          slug?: string
          description?: string | null
          logo_url?: string | null
          updated_at?: string
        }
      }
      organization_members: {
        Row: {
          id: string
          organization_id: string
          user_id: string
          role: "super_admin" | "admin" | "manager" | "user"
          joined_at: string
        }
        Insert: {
          organization_id: string
          user_id: string
          role?: "super_admin" | "admin" | "manager" | "user"
        }
        Update: {
          role?: "super_admin" | "admin" | "manager" | "user"
        }
      }
    }
  }
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
export type Organization = Database["public"]["Tables"]["organizations"]["Row"]
export type OrganizationMember = Database["public"]["Tables"]["organization_members"]["Row"]
