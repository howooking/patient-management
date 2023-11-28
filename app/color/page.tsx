import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function page() {
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
    redirect("/login");
  }

  if (!vet) {
    redirect("/signup");
  }

  if (!vet.license_approved) {
    redirect("/wait");
  }

  return (
    <div className="container">
      <h1>이페이지는 로그인사용자만 접근가능함</h1>
      {vet && <pre>{JSON.stringify(vet, null, 2)}</pre>}
      <div className="w-10 h-10 bg-muted"></div>
    </div>
  );
}
