"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

export default function Login() {
  const supabase = createClient();
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async function () {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        setError(error.message);
        return;
      }
      if (user) {
        setUser(user);
      }
    };
    getUser();
  }, []);

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

  if (user) {
    return <>이미 로그인함</>;
  }
  return (
    <div className="space-y-2">
      <Button
        type="button"
        onClick={handleGoogleLogin}
        className="flex gap-2 w-full"
        variant="outline"
      >
        <FcGoogle size={20} />
        <span>구글 로그인</span>
      </Button>
      <Button
        type="button"
        onClick={handleKakaoLogin}
        className="flex gap-2 w-full"
        variant="outline"
      >
        <RiKakaoTalkFill size={20} />
        <span>카카오 로그인</span>
      </Button>
    </div>
  );
}
