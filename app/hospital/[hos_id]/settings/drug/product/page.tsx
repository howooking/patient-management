import { AddDrugProductDialog } from "@/components/hospital/settings/drug/drug-product/form/add-drug-product-dialog";
import { columns } from "@/components/hospital/settings/drug/drug-product/table/columns";
import DataTable from "@/components/ui/data-table";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function DrugProductSettingPage({
  params,
}: {
  params: { hos_id: string };
}) {
  const { hos_id } = params;

  const supabase = await createSupabaseServerClient(true);

  const { data: drugProducts, error: drugProductsError } = await supabase
    .from("drug_products")
    .select()
    .match({ hos_id })
    .order("created_at", { ascending: false });

  if (drugProductsError) {
    throw new Error(drugProductsError.message);
  }

  const { data: drugs, error: drugsErrors } = await supabase
    .from("drugs")
    .select("id, name")
    .match({ hos_id });

  if (drugsErrors) {
    throw new Error(drugsErrors.message);
  }

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-xl text-primary font-bold">약물제품 설정</h2>
        <AddDrugProductDialog drugs={drugs} />
      </div>

      <DataTable columns={columns} data={drugProducts} filterColumn="tag" />
    </>
  );
}
