import { redirect } from "next/navigation";

import Attraction from "./attraction";
import SignupForm from "./signup-form";
import createSupabaseServerClient from "@/lib/supabase/server";

export default async function SignupPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: vet } = await supabase.from("vets").select("*").single();

  if (!session) {
    redirect("/");
  }

  if (vet) {
    redirect("/");
  }

  return (
    <div className="flex w-full h-screen">
      <SignupForm
        namePlaceholder={session?.user.user_metadata.name}
        avatarUrl={session?.user.user_metadata.avatar_url}
        vetId={session?.user.id}
      />
      <Attraction />
    </div>
  );
}
