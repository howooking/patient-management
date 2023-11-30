import { redirect } from "next/navigation";

import Navbar from "@/components/navbar/navbar";
import createSupabaseServerClient from "@/lib/supabase/server";

export default async function SpacePage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  const { data: vet } = await supabase
    .from("vets")
    .select("license_approved")
    .single();

  if (sessionError) {
    throw new Error(sessionError.message);
  }

  if (!session) {
    redirect("/");
  }

  if (!vet) {
    redirect("/signup");
  }

  if (!vet.license_approved) {
    redirect("/wait");
  }

  return (
    <>
      <Navbar />
      가입완료된 회원만 보이는 페이지
    </>
  );
}
