import { redirect } from "next/navigation";

import SignupForm from "./signup-form";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import Attraction from "@/components/common/attraction";

export default async function SignupPage() {
  const supabase = await createSupabaseServerClient(true);
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    throw new Error(sessionError.message);
  }

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex w-full h-screen">
      <SignupForm namePlaceholder={session?.user.user_metadata.name ?? ""} />
      <Attraction />
    </div>
  );
}
