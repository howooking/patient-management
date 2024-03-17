import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TooltipIconButton from "@/components/ui/tooltip-icon-button";
import { toast } from "@/components/ui/use-toast";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { PiTrash } from "react-icons/pi";

export default function DeleteIoDialog({
  io_id,
  patientName,
}: {
  io_id?: number;
  patientName?: string;
}) {
  const supabase = createSupabaseBrowserClient();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("in_and_out")
        .delete()
        .match({ io_id });
      if (error) {
        toast({
          variant: "destructive",
          title: error.message,
          description: "관리자에게 문의하세요",
        });
        return;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "입원 기록 삭제 중 에러발생",
        description: "관리자에게 문의하세요",
      });
    } finally {
      setIsSubmitting(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipIconButton
        Icon={PiTrash}
        description="입원기록 삭제"
        setOpen={setOpen}
      />

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            <span className="text-xl">{patientName}</span>{" "}
            <span className="font-normal">
              의 모든 기록을 삭제하시겠습니까?
            </span>
          </DialogTitle>
          <DialogDescription>
            입원기간동안의 모든 정보가 삭제되며 복원되지 않습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isSubmitting}
          >
            입원기록 삭제
            <AiOutlineLoading3Quarters
              className={cn("ml-2", isSubmitting ? "animate-spin" : "hidden")}
            />
          </Button>
          <DialogClose>
            <Button variant="outline">취소</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
