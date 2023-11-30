import { redirect } from "next/navigation";

import createSupabaseServerClient from "@/lib/supabase/server";
import { Button } from "../ui/button";

export default function Signout() {
  const signOut = async () => {
    "use server";
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  return (
    <form action={signOut}>
      <Button variant="destructive" className="w-full h-7 text-sm">
        로그아웃
      </Button>
    </form>
  );
}
