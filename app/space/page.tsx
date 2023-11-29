import Navbar from "@/components/navbar/navbar";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SpacePage() {
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
