// GET, PUT, DELETE specific user
import { supabase } from "@/lib/supabaseClient";
import { UserProfileSchema } from "@/lib/validation";
import { success, error } from "@/lib/responses";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { data, error: dbError } = await supabase
    .from("profiles")
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
    const parsed = UserProfileSchema.partial().parse(body);

    const { data, error: updateError } = await supabase
      .from("profiles")
      .update(parsed)
      .eq("id", params.id)
      .select()
      .single();

    if (updateError) return error(updateError.message, 500);
    return success(data);
  } catch (err: any) {
    return error(err.message || "Invalid update data", 400);
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { error: deleteError } = await supabase
    .from("profiles")
    .delete()
    .eq("id", params.id);

  if (deleteError) return error(deleteError.message, 500);
  return success({ message: "User deleted successfully" });
}
