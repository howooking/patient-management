import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { RiKakaoTalkFill } from "react-icons/ri";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export default function SignupTab({
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
          <span>구글로 회원가입</span>
        </Button>

        <div className="text-center">or</div>

        <Button
          onClick={handleKakaoLogin}
          className="flex gap-2 w-full"
          variant="outline"
        >
          <RiKakaoTalkFill size={20} />
          <span>카카오로 회원가입</span>
        </Button>
      </div>

      <p className="text-sm break-keep">
        <span className="font-semibold">구글로 회원가입</span> 또는{" "}
        <span className="font-semibold">카카오로 회원가입</span>을 진행할 경우
        Vetterhands의{" "}
        <Link href="#" className="text-primary">
          이용약관
        </Link>{" "}
        및{" "}
        <Link href="#" className="text-primary">
          개인정보정책
        </Link>
        에 동의하게됩니다.
      </p>

      <div className="flex items-center gap-2">
        <span className="text-sm">이미 회원이신가요?</span>
        <Button
          className="text-sm h-auto p-0"
          variant="link"
          onClick={() => setActiveTab("signin")}
        >
          로그인
        </Button>
      </div>
    </>
  );
}
