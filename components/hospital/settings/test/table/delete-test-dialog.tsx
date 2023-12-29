"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { TestTableColum } from "./columns";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";

export function DeleteTestDialog({ test }: { test: TestTableColum }) {
  console.log(test);

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const supabase = createSupabaseBrowserClient();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from("tests")
        .delete()
        .match({ test_id: test.test_id });

      if (error) {
        toast({
          variant: "destructive",
          title: error.message,
          description: "관리자에게 문의하세요",
        });
        return;
      }
      toast({
        title: `${test.name} 검사가 삭제되었습니다.`,
      });
      router.refresh();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error, "error while adding or deleting test");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>삭제</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {test.name} 검사를 삭제하시겠습니까?
          </AlertDialogTitle>
          <AlertDialogDescription>
            삭제 된 데이터는 복구되지 않습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>취소</AlertDialogCancel>
          <AlertDialogAction disabled={isDeleting} onClick={handleDelete}>
            삭제
            <AiOutlineLoading3Quarters
              className={cn("ml-2", isDeleting ? "animate-spin" : "hidden")}
            />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
