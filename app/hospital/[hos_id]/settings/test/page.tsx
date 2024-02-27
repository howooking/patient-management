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
    .select()
    .match({ hos_id })
    .order("created_at", { ascending: false });

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
