import { redirect } from "next/navigation";
import createSupabaseServerClient from "@/lib/supabase/server";
import Sidebar from "../../components/space/sidebar/sidebar";

export default async function SpaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <div className="flex">
      <Sidebar />
      {children}
    </div>
  );
}
