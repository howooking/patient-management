"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function LoginDialog() {
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">로그인</Button>
      </DialogTrigger>
      <DialogContent className="w-[300px] pt-14 items-center flex flex-col gap-2">
        <Button
          onClick={handleGoogleLogin}
          className="flex gap-2 w-full"
          variant="outline"
        >
          <FcGoogle size={20} />
          <span>구글 로그인</span>
        </Button>
        <div>or</div>
        <Button
          onClick={handleKakaoLogin}
          className="flex gap-2 w-full"
          variant="outline"
        >
          <RiKakaoTalkFill size={20} />
          <span>카카오 로그인</span>
        </Button>
        <div className="flex items-center mt-4">
          <span className="text-sm">아직 회원이 아닌가요?</span>
          <Button variant="link" className="text-sm">
            회원가입
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
