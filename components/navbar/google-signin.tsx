import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

export default function GoogleSignin({ signup }: { signup?: boolean }) {
  const supabase = createSupabaseBrowserClient();

  const handleGoogleLogin = async () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      className="flex gap-2 w-full"
      variant="outline"
    >
      <FcGoogle size={20} />
      <span>구글로 {signup ? "회원가입" : "로그인"}</span>
    </Button>
  );
}
