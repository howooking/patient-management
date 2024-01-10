import { AddDrugDialog } from "@/components/hospital/settings/drug/form/add-drug-dialog";
import { AddDrugProductDialog } from "@/components/hospital/settings/drug/form/add-drug-product-dialog";
import { columns } from "@/components/hospital/settings/drug/table/columns";
import DataTable from "@/components/ui/data-table";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function DrugSettingPage({
  params,
}: {
  params: { hos_id: string };
}) {
  const { hos_id } = params;

  const supabase = await createSupabaseServerClient(true);

  const { data: drugs, error: drugsErrors } = await supabase
    .from("drugs")
    .select("*")
    .match({ hos_id });

  if (drugsErrors) {
    throw new Error(drugsErrors.message);
  }

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-xl text-primary font-bold">약물 설정</h2>
        <div className="space-x-2">
          <AddDrugDialog />
          <AddDrugProductDialog />
        </div>
      </div>

      <DataTable columns={columns} data={drugs} filterColumn="tag" />
    </>
  );
}
