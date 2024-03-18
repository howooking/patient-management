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
import { DEFAULT_ICU_CHART } from "@/constants/default-icu-chart";
import useLatestWeight from "@/hooks/useLatestWeight";
import { useSelectedDate } from "@/lib/store/selected-date";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { type IcuChartJoined } from "@/types/type";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { PiArrowCounterClockwise } from "react-icons/pi";

export default function ResetChartDialog({
  selectedIo,
}: {
  selectedIo?: IcuChartJoined;
}) {
  const supabase = createSupabaseBrowserClient();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { selectedDate } = useSelectedDate();
  const { latestWeight, weighedDate } = useLatestWeight(
    selectedIo?.pet_id.pet_id
  );
  const handleOut = async () => {
    setIsSubmitting(true);
    try {
      // 해당일 icu_chart 삭제
      const { error } = await supabase
        .from("icu_chart")
        .delete()
        .match({ icu_chart_id: selectedIo?.icu_chart_id });
      if (error) {
        toast({
          variant: "destructive",
          title: error.message,
          description: "관리자에게 문의하세요",
        });
        return;
      }

      // 기본 차트 생성
      const { data: icuChart, error: icuChartError } = await supabase
        .from("icu_chart")
        .insert({
          io_id: selectedIo?.io_id.io_id!,
          hos_id: selectedIo?.hos_id!,
          pet_id: selectedIo?.pet_id.pet_id!,
          caution: selectedIo?.caution,
          main_vet: selectedIo?.main_vet.vet_id,
          sub_vet: selectedIo?.sub_vet?.vet_id ?? null,
          target_date: selectedDate,
          memo_a: selectedIo?.memo_a,
          memo_b: selectedIo?.memo_b,
          memo_c: selectedIo?.memo_c,
          target_weight: latestWeight
            ? `${latestWeight}kg(${weighedDate})`
            : null,
        })
        .select("icu_chart_id")
        .single();

      if (icuChartError) {
        toast({
          variant: "destructive",
          title: icuChartError.message,
          description: "관리자에게 문의하세요",
        });
        return;
      }

      // icu_chart_tx 기본 차트 삽입
      DEFAULT_ICU_CHART.forEach(async (element) => {
        const { error: icuChartTxError } = await supabase
          .from("icu_chart_tx")
          .insert({
            data_type: element.dataType,
            icu_chart_id: icuChart.icu_chart_id,
            io_id: selectedIo?.io_id.io_id!,
            todo_name: element.todoName,
            todo_memo: element.todoMemo,
          });

        if (icuChartTxError) {
          toast({
            variant: "destructive",
            title: icuChartTxError.message,
            description: "관리자에게 문의하세요",
          });
          return;
        }
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "차트 초기화 중 에러발생",
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
        Icon={PiArrowCounterClockwise}
        description="차트 초기화"
        setOpen={setOpen}
      />

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            <span className="text-xl">
              {selectedDate}일 {selectedIo?.pet_id.name}
            </span>{" "}
            <span className="font-normal">
              의 처치기록이 모두 초기화됩니다.
            </span>
          </DialogTitle>
          <DialogDescription>
            초기화된 차트는 복구가 불가능합니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={handleOut}
            disabled={isSubmitting}
          >
            초기화
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
