import { columns } from "@/components/hospital/settings/hospital/table/columns";
import DataTable from "@/components/ui/data-table";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function HospitalSettingPage({
  params,
}: {
  params: { hos_id: string };
}) {
  const { hos_id } = params;

  const supabase = await createSupabaseServerClient(true);

  const { data: vets, error: vetsError } = await supabase
    .from("hos_vet_mapping")
    .select(
      `
        hospitals (group_list, position_list),
        vets (
          vet_name,
          avatar_url  
        ),
        vet_id,
        vet_approved,
        group,
        position,
        nickname,
        rank
      `
    )
    .match({ hos_id })
    .order("rank", { ascending: true });

  if (vetsError) {
    throw new Error(vetsError.message);
  }

  return (
    <>
      <div className="flex justify-between pb-4">
        <h2 className="text-xl text-primary font-bold">병원직원 설정</h2>
      </div>

      <DataTable columns={columns} data={vets} noSearch />
    </>
  );
}
