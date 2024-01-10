import HomeNavbar from "@/unused/home-navbar (x)";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createSupabaseServerClient(true);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <>
        <HomeNavbar />
        <p className="pt-16">랜딩페이지</p>
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
    // 회원이 아닌 경우 vet === null이 되는데 이 떄 vetError.code === "PGRST116" 가 발생
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
