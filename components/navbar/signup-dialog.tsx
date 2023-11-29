"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import LoginDialog from "./login-dialog";
import Link from "next/link";

export default function SignupDialog({ navbar }: { navbar?: boolean }) {
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
        <Button
          variant={navbar ? "default" : "link"}
          className={cn(navbar ? "text-base font-semibold" : "text-sm")}
        >
          {navbar ? "무료로 시작하세요" : "회원가입"}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[300px] pt-14 flex flex-col gap-2">
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
        <div className="flex flex-col mt-4">
          <p className="text-sm break-keep">
            <span className="font-semibold">구글로 회원가입</span> 또는{" "}
            <span className="font-semibold">카카오로 회원가입</span>을 진행할
            경우 Vetterhands의{" "}
            <Link href="#" className="text-primary">
              이용약관
            </Link>{" "}
            및{" "}
            <Link href="#" className="text-primary">
              개인정보정책
            </Link>
            에 동의하게됩니다.
          </p>
          <div className="flex items-center mt-2">
            <span className="text-sm">이미 회원이신가요?</span>
            <LoginDialog />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
