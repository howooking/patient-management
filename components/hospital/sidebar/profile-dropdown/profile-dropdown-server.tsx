import { createSupabaseServerClient } from "@/lib/supabase/server";
import ProfileDropdown from "./profile-dropdown";

export default async function ProfileDropdownServer() {
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
    <ProfileDropdown
      name={vet?.vet_name}
      src={vet?.avatar_url}
      email={vet?.vet_email}
      hospitalList={vet?.hos_vet_mapping}
    />
  );
}
