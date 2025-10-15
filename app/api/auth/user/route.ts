import { supabase } from "@/lib/supabaseClient";
import { success, error } from "@/lib/responses";

export async function GET(req: Request) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) return error("Missing authorization token", 401);

  const { data, error: userError } = await supabase.auth.getUser(token);

  if (userError || !data?.user) return error("Invalid or expired token", 401);

  return success(data.user);
}
