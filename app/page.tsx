import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
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

  if (vet?.license_approved) {
    redirect("/color");
  }

  return (
    <div>
      <h1 className="text-3xl">수의사 전문차트 서비스 벳터핸즈입니다.</h1>
    </div>
  );
}
