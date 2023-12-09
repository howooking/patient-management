import { redirect } from "next/navigation";

import HospitalNavbar from "@/components/hospital/hopital-navbar/navbar";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import Sidebar from "@/components/sidebar/sidebar";

export default async function SpaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient(true);
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    throw new Error(sessionError.message);
  }

  if (!session) {
    redirect("/");
  }

  const { data: vet, error: vetError } = await supabase
    .from("vets")
    .select(`license_approved`)
    .single();

  if (vetError) {
    if (vetError.code !== "PGRST116") {
      throw new Error(vetError.message);
    }
  }

  if (!vet) {
    redirect("/signup");
  }

  if (!vet.license_approved) {
    redirect("/wait");
  }

  return (
    <div className="flex bg-muted">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto">
        <HospitalNavbar />
        {children}
      </main>
    </div>
  );
}
