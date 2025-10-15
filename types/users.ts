export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  bio?: string;
  role: "user" | "owner" | "agent" | "admin";
  avatar_url?: string;
  is_verified?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateUserPayload {
  full_name: string;
  email: string;
  phone?: string;
  bio?: string;
  role?: "user" | "owner" | "agent" | "admin";
  avatar?: File | string;
}
