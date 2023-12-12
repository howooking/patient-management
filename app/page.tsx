import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import Navbar from "@/components/home-navbar/navbar";

export default async function Home() {
  const supabase = await createSupabaseServerClient(true);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <>
        <Navbar />
        <h1 className="pt-16">안녕하세요</h1>
      </>
    );
  }

  const { data: vet, error: vetError } = await supabase
    .from("vets")
    .select("license_approved, default_hos_id")
    .match({ vet_id: user.id })
    .single();

  // supabase 에러
  if (vetError) {
    // 회원이 아닌 경우 vetError.code === "PGRST116" 제외
    if (vetError.code !== "PGRST116") throw new Error(vetError.message);
  }

  if (!vet) {
    redirect("/signup");
  }

  if (!vet.license_approved) {
    redirect("/wait");
  }

  if (!vet.default_hos_id) {
    redirect("/new-hospital");
  }

  redirect(`/hospital/${vet.default_hos_id}`);
}
