import { redirect } from "next/navigation";

import Attraction from "@/components/common/attraction";
import FormTabs from "@/components/hospital/new-hospital/form-tabs";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function NewHospital({
  params,
}: {
  params: { query: string };
}) {
  const supabase = await createSupabaseServerClient(true);
  const {
    data: { session },
    error: SessionError,
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  if (SessionError) {
    throw new Error(SessionError.message);
  }

  return (
    <div className="flex w-full h-screen">
      <Attraction />
      <FormTabs query={params.query} />
    </div>
  );
}
