import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
import { Dispatch, SetStateAction } from "react";

export default function SigninTab({
  setActiveTab,
}: {
  setActiveTab: Dispatch<SetStateAction<string>>;
}) {
  const supabase = createClient();

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

  const handleKakaoLogin = async () => {
    supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <>
      <div className="space-y-1">
        <Button
          onClick={handleGoogleLogin}
          className="flex gap-2 w-full"
          variant="outline"
        >
          <FcGoogle size={20} />
          <span>구글로 로그인</span>
        </Button>

        <div className="text-center">or</div>

        <Button
          onClick={handleKakaoLogin}
          className="flex gap-2 w-full"
          variant="outline"
        >
          <RiKakaoTalkFill size={20} />
          <span>카카오로 로그인</span>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm">아직 회원이 아닌가요?</span>
        <Button
          className="text-sm h-auto p-0"
          variant="link"
          onClick={() => setActiveTab("signup")}
        >
          회원가입
        </Button>
      </div>
    </>
  );
}
