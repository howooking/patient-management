import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { DrugTableColumn } from "./columns";

type Props = {
  drug: DrugTableColumn;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export function DeleteDrugDialog({
  drug,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
}: Props) {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const { error } = await supabase
      .from("drugs")
      .delete()
      .match({ id: drug.id });

    if (error) {
      toast({
        variant: "destructive",
        title: error.message,
        description: "관리자에게 문의하세요",
      });
      return;
    }
    toast({
      title: `${drug.name} 약품이 삭제되었습니다.`,
    });
    setIsDeleting(false);
    router.refresh();
  };

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {drug.name} 약물원료를 삭제하시겠습니까?
          </AlertDialogTitle>
          <AlertDialogDescription>
            약물원료를 삭제시 하위 상품이 모두 삭제됩니다.
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
