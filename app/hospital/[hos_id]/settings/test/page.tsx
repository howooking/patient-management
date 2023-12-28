import { AddTestDialog } from "@/components/hospital/settings/test/form/add-test-dialog";
import { columns } from "@/components/hospital/settings/test/table/columns";
import DataTable from "@/components/ui/data-table";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function TestSettingPage({
  params,
}: {
  params: { hos_id: string };
}) {
  const { hos_id } = params;

  const supabase = await createSupabaseServerClient(true);

  const { data: tests, error: testsErrors } = await supabase
    .from("tests")
    .select(
      "test_id, category, name, tag, unit, type, original_name, hos_id, form, description"
    )
    .match({ hos_id });

  if (testsErrors) {
    throw new Error(testsErrors.message);
  }

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-xl text-primary font-bold">검사 설정</h2>
        <AddTestDialog />
      </div>

      <DataTable columns={columns} data={tests} filterColumn="tag" />
    </>
  );
}
