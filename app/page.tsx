import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import Navbar from "@/components/home-navbar/navbar";

export default async function Home() {
  const supabase = await createSupabaseServerClient(true);

  // RLS로 로그인 한 수의사데이터만 가져옴(클라단에서 session정보를 몰라도 된다)
  const { data: vet, error: vetError } = await supabase
    .from("vets")
    .select("license_approved")
    .single();

  if (vet && !vet.license_approved) {
    redirect("/wait");
  }

  if (vet && vet.license_approved) {
    redirect("/hospital");
  }

  if (vetError) {
    // vet이 null 이 경우 vetError가 발생하며 code가 "PGRST116"임
    if (vetError.code !== "PGRST116") {
      throw new Error("error while fetching vet data in home page");
    }
  }

  return (
    <>
      <Navbar />
      <h1 className="pt-16">안녕하세요</h1>
    </>
  );
}
