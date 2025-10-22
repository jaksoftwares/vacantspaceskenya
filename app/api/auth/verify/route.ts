// Handle email or phone verification
import { supabase } from "@/lib/supabaseClient";
import { success, error } from "@/lib/responses";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, type } = body;

    if (!token || !type) {
      return error("Token and type are required", 400);
    }

    const { data, error: verifyError } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: type as any,
    });

    if (verifyError) return error(verifyError.message, 400);

    return success({
      message: "Verification successful",
      user: data.user,
      session: data.session,
    });
  } catch (err: any) {
    return error(err.message || "Verification failed", 400);
  }
}
