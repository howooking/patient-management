import { Dialog, DialogContent } from "@/components/ui/dialog";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { TestSet } from "@/types/type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AddTestForm from "../form/add-test-form";
import { TestTableColumn } from "./columns";

export function EditTestDialog({
  test,
  copy,
  isEditDialogOpen,
  setIsEditDialogOpen,
}: {
  test: TestTableColumn;
  copy?: boolean;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [testDetail, setTestDetail] = useState<TestSet[]>([]);

  const supabase = createSupabaseBrowserClient();

  // TODO: client side error handling
  useEffect(() => {
    const getData = async () => {
      const { data: testSet, error: testSetError } = await supabase
        .from("test_set")
        .select("*")
        .match({ test_id: test.test_id });
      if (!testSetError) {
        setTestDetail(testSet);
      }
    };
    getData();
  }, [supabase, test.test_id]);

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent
        className="min-w-[calc(100vw-40px)] max-h-[90vh] overflow-y-auto"
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
        />
      </DialogContent>
    </Dialog>
  );
}
