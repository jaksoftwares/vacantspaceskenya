// GET one location
import { supabase } from "@/lib/supabaseClient";
import { LocationSchema } from "@/lib/validation";
import { success, error } from "@/lib/responses";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { data, error: dbError } = await supabase
    .from("locations")
    .select("*")
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
    const body = await req.json();
    const parsed = LocationSchema.partial().parse(body);

    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    const { data: authData, error: authError } = await supabase.auth.getUser(token);
    if (authError || !authData.user) return error("Unauthorized", 401);

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", authData.user.id)
      .single();

    if (profile?.role !== "admin") return error("Admins only", 403);

    const { data, error: updateError } = await supabase
      .from("locations")
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

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", authData.user.id)
    .single();

  if (profile?.role !== "admin") return error("Admins only", 403);

  const { error: deleteError } = await supabase
    .from("locations")
    .delete()
    .eq("id", params.id);

  if (deleteError) return error(deleteError.message, 500);
  return success({ message: "Location deleted successfully" });
}
