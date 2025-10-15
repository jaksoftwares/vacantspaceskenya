//Fetches reviews for a specific listing

import { supabase } from "@/lib/supabaseClient";
import { success, error } from "@/lib/responses";

export async function GET(
  _req: Request,
  { params }: { params: { userId: string } }
) {
  const { data, error: dbError } = await supabase
    .from("reviews")
    .select("*, listings(title)")
    .eq("user_id", params.userId)
    .order("created_at", { ascending: false });

  if (dbError) return error(dbError.message, 500);
  return success(data);
}
