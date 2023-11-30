import { RiKakaoTalkFill } from "react-icons/ri";
import { Button } from "../ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function KakaoSignin() {
  const supabase = createSupabaseBrowserClient();

  const handleKakaoSignin = async () => {
    supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <Button
      onClick={handleKakaoSignin}
      className="flex gap-2 w-full"
      variant="outline"
    >
      <RiKakaoTalkFill size={20} />
      <span>카카오로 로그인</span>
    </Button>
  );
}
