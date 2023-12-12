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
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  if (userError) {
    throw new Error(userError.message);
  }

  return (
    <div className="flex w-full h-screen">
      <Attraction />
      <FormTabs query={params.query} />
    </div>
  );
}
