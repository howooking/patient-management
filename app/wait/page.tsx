"use client";

import Attraction from "@/components/common/attraction";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WaitPage() {
  const router = useRouter();

  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    supabase.auth.signOut();
    router.refresh();
  }, [router, supabase.auth]);

  return (
    <div className="flex w-full h-screen">
      <Attraction />
      <div className="p-20">
        <p>junsgk@gmail.com으로 인증자료를 보내주세요.</p>
        <p>이미 보내셨다면 조금만 기다려주세요.</p>
        <Button asChild>
          <Link href="/">홈으로</Link>
        </Button>
      </div>
    </div>
  );
}
