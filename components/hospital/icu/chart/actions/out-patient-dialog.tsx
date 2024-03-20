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
import { useSelectedDate } from "@/lib/store/selected-date";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { PiSignIn, PiSignOut } from "react-icons/pi";

export default function OutPatientDialog({
  io_id,
  patientName,
  isOut,
}: {
  io_id?: number;
  patientName?: string;
  isOut: boolean;
}) {
  const supabase = createSupabaseBrowserClient();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { selectedDate } = useSelectedDate();

  const handleOut = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("in_and_out")
        .update({
          out_date: isOut ? null : selectedDate,
        })
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
        title: "퇴원처리 중 에러발생",
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
        Icon={isOut ? PiSignIn : PiSignOut}
        description={isOut ? "퇴원취소" : "퇴원"}
        setOpen={setOpen}
      />

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            <span className="text-xl">{patientName}</span>{" "}
            <span className="font-normal">
              {isOut
                ? "의 퇴원을 취소하시겠습니까?"
                : "을(를) 퇴원시키겠습니까?"}
            </span>
          </DialogTitle>
          <DialogDescription>
            {isOut
              ? "퇴원을 취소하시겠습니까?"
              : "퇴원시킨 환자는 다시 입원시킬 수 있습니다."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={handleOut}
            disabled={isSubmitting}
          >
            {isOut ? "퇴원취소" : "퇴원"}

            <AiOutlineLoading3Quarters
              className={cn("ml-2", isSubmitting ? "animate-spin" : "hidden")}
            />
          </Button>
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
