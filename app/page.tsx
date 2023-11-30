import { redirect } from "next/navigation";

import Navbar from "@/components/navbar/navbar";
import createSupabaseServerClient from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createSupabaseServerClient();

  const { data: vet } = await supabase
    .from("vets")
    .select("license_approved")
    .single();

  if (vet?.license_approved) {
    redirect("/space");
  }

  return (
    <>
      <Navbar />
      <h1 className="pt-20">수의사 전문차트 서비스 벳터핸즈입니다.</h1>
    </>
  );
}
