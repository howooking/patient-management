import { redirect } from "next/navigation";

import createSupabaseServerClient from "@/lib/supabase/server";
import Attraction from "@/components/common/attraction";
import FormTabs from "@/components/hospital/new-hospital/form-tabs";

export default async function NewHospital({
  params,
}: {
  params: { query: string };
}) {
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
      <FormTabs query={params.query} />
    </div>
  );
}
