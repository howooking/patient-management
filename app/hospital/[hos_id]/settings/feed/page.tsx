import { AddFeedDialog } from "@/components/hospital/settings/feed/form/add-feed-dialog";
import { columns } from "@/components/hospital/settings/feed/table/columns";
import DataTable from "@/components/ui/data-table";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function FeedSettingPage({
  params,
}: {
  params: { hos_id: string };
}) {
  const { hos_id } = params;

  const supabase = await createSupabaseServerClient(true);

  const { data: feeds, error: feedsError } = await supabase
    .from("feeds")
    .select()
    .match({ hos_id });

  if (feedsError) {
    throw new Error(feedsError.message);
  }

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-xl text-primary font-bold">사료 설정</h2>
        <AddFeedDialog />
      </div>

      <DataTable columns={columns} data={feeds} filterColumn="tag" />
    </>
  );
}
