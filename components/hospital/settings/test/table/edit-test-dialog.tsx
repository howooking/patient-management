"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import AddTestForm from "../form/add-test-form";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { TestTableColum } from "./columns";
import { TestSet } from "@/types/type";

export function EditTestDialog({ test }: { test: TestTableColum }) {
  const [open, setOpen] = useState(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">수정</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[calc(100vw-40px)] max-h-[90vh] overflow-y-auto">
        <AddTestForm
          setOpen={setOpen}
          edit
          test={test}
          testDetail={testDetail}
        />
      </DialogContent>
    </Dialog>
  );
}
