// GET all Kenyan counties / subregions
import { supabase } from "@/lib/supabaseClient";
import { LocationSchema } from "@/lib/validation";
import { success, error } from "@/lib/responses";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const parent_id = searchParams.get("parent_id");

  let query = supabase.from("locations").select("*").order("name", { ascending: true });

  if (type) query = query.eq("type", type);
  if (parent_id) query = query.eq("parent_id", parent_id);

  const { data, error: dbError } = await query;

  if (dbError) return error(dbError.message, 500);
  return success(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = LocationSchema.parse(body);

    // Admin auth check
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    const { data: authData, error: authError } = await supabase.auth.getUser(token);
    if (authError || !authData.user) return error("Unauthorized", 401);

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", authData.user.id)
      .single();

    if (profile?.role !== "admin") return error("Admins only", 403);

    const { data, error: insertError } = await supabase
      .from("locations")
      .insert(parsed)
      .select()
      .single();

    if (insertError) return error(insertError.message, 500);
    return success(data, 201);
  } catch (err: any) {
    return error(err.message, 400);
  }
}
