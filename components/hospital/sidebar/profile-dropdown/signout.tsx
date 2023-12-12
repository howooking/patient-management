import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

export default function Signout() {
  const signOut = async () => {
    "use server";
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  return (
    <form action={signOut}>
      <Button variant="destructive" className="w-full rounded-sm">
        로그아웃
      </Button>
    </form>
  );
}
