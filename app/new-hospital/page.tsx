import { redirect } from "next/navigation";

import Attraction from "../../components/common/attraction";
import createSupabaseServerClient from "@/lib/supabase/server";
import FormTabs from "./form-tabs";

export default async function NewHospital() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex w-full h-screen">
      <Attraction />
      <FormTabs />
    </div>
  );
}
