import { Dialog, DialogContent } from "@/components/ui/dialog";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { TestSet } from "@/types/type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AddTestForm from "../form/add-test-form";
import { TestTableColumn } from "./columns";

type Props = {
  test: TestTableColumn;
  copy?: boolean;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export function EditTestDialog({
  test,
  copy,
  isEditDialogOpen,
  setIsEditDialogOpen,
}: Props) {
  const [testDetail, setTestDetail] = useState<TestSet[]>([]);
  const [refetch, setRefetch] = useState(false);
  const handleTestSetRefetch = () => setRefetch((prev) => !prev);

  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    const getData = async () => {
      const { data: testSet, error: testSetError } = await supabase
        .from("test_set")
        .select()
        .match({ test_id: test.test_id });
      if (!testSetError) {
        setTestDetail(testSet);
      }
    };
    getData();
  }, [supabase, test.test_id, refetch]);

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent
        className="max-w-4xl max-h-[90vh] overflow-y-auto"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <AddTestForm
          copy={copy}
          setOpen={setIsEditDialogOpen}
          edit
          test={test}
          testDetail={testDetail}
          handleTestSetRefetch={handleTestSetRefetch}
        />
      </DialogContent>
    </Dialog>
  );
}
