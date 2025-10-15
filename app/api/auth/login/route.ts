// Supabase email/password login
import { supabase } from "@/lib/supabaseClient";
import { AuthLoginSchema } from "@/lib/validation";
import { success, error } from "@/lib/responses";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = AuthLoginSchema.parse(body);
    const { email, password } = parsed;

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) return error(loginError.message, 401);

    return success({
      message: "Login successful",
      session: data.session,
      user: data.user,
    });
  } catch (err: any) {
    return error(err.message || "Invalid login credentials", 400);
  }
}
