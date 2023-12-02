"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function WaitPage() {
  const router = useRouter();
  const supabae = createSupabaseBrowserClient();
  useEffect(() => {
    supabae.auth.signOut();
    router.refresh();
  }, [router, supabae.auth]);

  return (
    <div>
      junsgk@gmail.com으로 관련자료를 보내주세요. 이미 보내셨다면 조그만
      기다려주세요.
      <Button asChild>
        <Link href="/">홈으로</Link>
      </Button>
    </div>
  );
}
