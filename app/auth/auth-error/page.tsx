import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function AuthErrorPage() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">로그인 중에 오류발생</h2>
      <Button asChild>
        <Link href="/">홈으로</Link>
      </Button>
    </main>
  );
}
