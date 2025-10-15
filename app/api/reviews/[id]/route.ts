// GET, PUT, DELETE single review
import { supabase } from "@/lib/supabaseClient";
import { ReviewSchema } from "@/lib/validation";
import { success, error } from "@/lib/responses";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { data, error: dbError } = await supabase
    .from("reviews")
    .select("*, profiles(full_name, avatar_url)")
    .eq("id", params.id)
    .single();

  if (dbError) return error(dbError.message, 404);
  return success(data);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    const { data: authData, error: authError } = await supabase.auth.getUser(token);
    if (authError || !authData.user) return error("Unauthorized", 401);

    const body = await req.json();
    const parsed = ReviewSchema.partial().parse(body);

    // Ensure review belongs to this user
    const { data: existing } = await supabase
      .from("reviews")
      .select("user_id")
      .eq("id", params.id)
      .single();

    if (!existing) return error("Review not found", 404);
    if (existing.user_id !== authData.user.id) return error("Forbidden", 403);

    const { data, error: updateError } = await supabase
      .from("reviews")
      .update(parsed)
      .eq("id", params.id)
      .select()
      .single();

    if (updateError) return error(updateError.message, 500);
    return success(data);
  } catch (err: any) {
    return error(err.message, 400);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  const { data: authData, error: authError } = await supabase.auth.getUser(token);
  if (authError || !authData.user) return error("Unauthorized", 401);

  const { data: existing } = await supabase
    .from("reviews")
    .select("user_id")
    .eq("id", params.id)
    .single();

  if (!existing) return error("Review not found", 404);

  // Check if admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", authData.user.id)
    .single();

  if (existing.user_id !== authData.user.id && profile?.role !== "admin")
    return error("Forbidden", 403);

  const { error: deleteError } = await supabase
    .from("reviews")
    .delete()
    .eq("id", params.id);

  if (deleteError) return error(deleteError.message, 500);
  return success({ message: "Review deleted successfully" });
}
