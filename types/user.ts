// Type definitions for users/agents
export interface UserProfile {
  id: string;
  email: string;
  full_name?: string | null;
  phone?: string | null;
  role?: "owner" | "agent" | "developer" | "student" | "admin";
  avatar_url?: string | null;
  verification_status?: "unverified" | "phone_verified" | "verified";
  created_at?: string;
  updated_at?: string;
}
