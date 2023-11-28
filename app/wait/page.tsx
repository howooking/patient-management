"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WaitPage() {
  const router = useRouter();
  const supabae = createClient();
  useEffect(() => {
    supabae.auth.signOut();
    router.refresh();
  }, [router, supabae.auth]);

  return <div>승인대기중입니다.</div>;
}
