import { createSupabaseServerClient } from "@/lib/supabase/server";
import HospitalSelect from "./hospital-select";

export default async function HospitalSelectServer() {
  const supabase = await createSupabaseServerClient(true);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: vet } = await supabase
    .from("vets")
    .select(
      `vet_email, 
       vet_name, 
       avatar_url,
       default_hos_id,
       hos_vet_mapping (
        hospitals (
          hos_id,
          name,
          business_approved
        )
       )
      `
    )
    .match({ vet_id: user?.id })
    .single();

  return (
    <HospitalSelect
      defaultHospitalId={vet?.default_hos_id}
      hospitalList={vet?.hos_vet_mapping}
    />
  );
}
