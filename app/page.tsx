import Attraction from "@/components/common/attraction";
import Signin from "@/components/signin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createSupabaseServerClient(true);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 로그인 안한 경우
  if (!user) {
    return (
      <div className="flex w-full h-screen">
        <Attraction />
        <Signin />
      </div>
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

  // 회원가입 안한 경우
  if (!vet) {
    redirect("/signup");
  }

  // 면허인증 안한 경우
  if (!vet.license_approved) {
    redirect("/wait");
  }

  // 기본 병원설정 안한 경우
  if (!vet.default_hos_id) {
    redirect("/new-hospital");
  }

  // 기본 설정된 병원 홈으로 이동
  redirect(`/hospital/${vet.default_hos_id}`);
}
