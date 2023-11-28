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
      <p className="text-5xl">5xl(67.36px) 크기</p>
      <p className="text-4xl">4xl(50.56px) 크기</p>
      <p className="text-3xl">3xl(37.92px) 크기</p>
      <p className="text-2xl">2xl(28.48px) 크기</p>
      <p className="text-xl">xl(21.28px) 크기</p>
      <p className="text-base">base(16px) 크기</p>
      <p className="text-sm">sm(12px) 크기</p>
      <div className="flex text-amber-400 gap-6 flex-wrap">
        <div className="border w-28 h-28 bg-background ">background</div>
        <div className="border w-28 h-28 bg-foreground">foreground</div>
        <div className="border w-28 h-28 bg-primary">primary</div>
        <div className="border w-28 h-28 bg-primary-foreground ">
          primary foreground
        </div>
        <div className="border  w-28 h-28 bg-secondary">secondary</div>
        <div className="border w-28 h-28 bg-muted secondary-foreground ">
          secondary foreground
        </div>
        <div className="border w-28 h-28 bg-muted  ">muted</div>
        <div className="border w-28 h-28 bg-foreground">muted-foreground</div>
        <div className="border w-28 h-28 bg-accent ">accent</div>
        <div className="border w-28 h-28 bg-accent-foreground ">
          accent foreground
        </div>
        <div className="border w-28 h-28 bg-destructive">destructive</div>
        <div className="border w-28 h-28 bg-foreground">
          destructive foreground
        </div>
        <div className="border w-28 h-28 bg-border">border</div>
      </div>
    </div>
  );
}
