// Logout endpoint
import { supabase } from "@/lib/supabaseClient";
import { success, error } from "@/lib/responses";

export async function POST() {
  const { error: logoutError } = await supabase.auth.signOut();

  if (logoutError) return error(logoutError.message, 400);
  return success({ message: "Logout successful" });
}
