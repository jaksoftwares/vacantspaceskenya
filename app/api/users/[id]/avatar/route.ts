import { uploadToCloudinary } from "@/lib/cloudinary";
import { supabase } from "@/lib/supabaseClient";
import { success, error } from "@/lib/responses";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await req.formData();
    const file = formData.get("avatar") as File;

    if (!file) return error("No avatar file provided", 400);

    const result: any = await uploadToCloudinary(file);

    const { data, error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: result.secure_url })
      .eq("id", params.id)
      .select()
      .single();

    if (updateError) return error(updateError.message, 500);
    return success(data);
  } catch (err: any) {
    return error(err.message, 400);
  }
}
