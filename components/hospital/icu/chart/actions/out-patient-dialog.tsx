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
import useIcuChart from "@/hooks/useIcuChart";
import { useSelectedDate } from "@/lib/store/selected-date";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { type IcuChartJoined } from "@/types/type";
import { useMemo, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { PiSignOut } from "react-icons/pi";

export default function OutPatientDialog({
  selectedChart,
}: {
  selectedChart?: IcuChartJoined;
}) {
  const supabase = createSupabaseBrowserClient();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { selectedDate } = useSelectedDate();
  const { icuChart } = useIcuChart();

  // 마지막날 임시차트id
  const lastTempChartId = useMemo(
    () =>
      icuChart
        ?.filter(
          (element) => element.io_id.io_id === selectedChart?.io_id.io_id
        )
        .find((element) => element.isNext)?.icu_chart_id,
    [icuChart, selectedChart?.io_id.io_id]
  );

  const handleOut = async () => {
    setIsSubmitting(true);
    try {
      const { error: outError } = await supabase
        .from("in_and_out")
        .update({
          out_date: selectedDate,
        })
        .match({ io_id: selectedChart?.io_id.io_id });
      if (outError) {
        toast({
          variant: "destructive",
          title: outError.message,
          description: "관리자에게 문의하세요",
        });
        return;
      }

      // 마지막 임시차트 삭제
      const { error: deleteLastTempChartError } = await supabase
        .from("icu_chart")
        .delete()
        .match({ icu_chart_id: lastTempChartId });

      if (deleteLastTempChartError) {
        toast({
          variant: "destructive",
          title: deleteLastTempChartError.message,
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
        Icon={PiSignOut}
        description={"퇴원"}
        setOpen={setOpen}
      />

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            <span className="text-xl">{selectedChart?.pet_id.name}</span>
            <span className="font-normal">이(가) 퇴원합니다.</span>
          </DialogTitle>
          <DialogDescription>
            퇴원할 경우 취소가 불가능합니다. 퇴원시키겠습니까?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={handleOut}
            disabled={isSubmitting}
          >
            퇴원
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
