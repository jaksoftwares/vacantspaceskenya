// GET specific location type (e.g. county)
import { supabase } from "@/lib/supabaseClient";
import { success, error } from "@/lib/responses";

export async function GET(
  _req: Request,
  { params }: { params: { type: string } }
) {
  const type = params.type.toLowerCase();

  const validTypes = ["county", "constituency", "town", "neighborhood"];
  if (!validTypes.includes(type)) return error("Invalid location type", 400);

  const { data, error: dbError } = await supabase
    .from("locations")
    .select("*")
    .eq("type", type)
    .order("name", { ascending: true });

  if (dbError) return error(dbError.message, 500);
  return success(data);
}
