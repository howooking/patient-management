import { cookies } from "next/headers";
import Attraction from "./attraction";
import SignupForm from "./signup-form";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  const { data: vet } = await supabase
    .from("vets")
    .select("*")
    .eq("vet_id", session?.user.email)
    .single();

  if (!session) {
    redirect("/");
  }

  if (vet) {
    redirect("/");
  }

  return (
    <div className="flex w-full h-screen">
      <SignupForm
        namePlaceholder={session.user.user_metadata.name}
        avatarUrl={session?.user.user_metadata.avatar_url}
        vetId={session?.user.email}
      />
      <Attraction />
    </div>
  );
}
