"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WaitPage() {
  const router = useRouter();
  const supabae = createClient();
  useEffect(() => {
    supabae.auth.signOut();
    router.refresh();
  }, [router, supabae.auth]);

  return (
    <div>
      승인대기중입니다.
      <Button asChild>
        <Link href="/">홈으로 돌아가기</Link>
      </Button>
    </div>
  );
}
