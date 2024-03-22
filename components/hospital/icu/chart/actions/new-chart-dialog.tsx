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
import { useSelectedDate } from "@/lib/store/selected-date";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { addNextDayChart, cn } from "@/lib/utils";
import { type IcuChartJoined } from "@/types/type";
import { addDays, format } from "date-fns";
import { useMemo, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { PiArrowCounterClockwise, PiMagicWand } from "react-icons/pi";

export default function NewChartDialog({
  selectedChart,
}: {
  selectedChart?: IcuChartJoined;
}) {
  const supabase = createSupabaseBrowserClient();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { selectedDate } = useSelectedDate();

  const isNext = useMemo(
    () => !!selectedChart?.isNext,
    [selectedChart?.isNext]
  );

  const handleNewChart = async () => {
    setIsSubmitting(true);
    try {
      // 차트 생성
      const { data: icuChart, error: icuChartError } = await supabase
        .from("icu_chart")
        .insert({
          io_id: selectedChart?.io_id.io_id!,
          hos_id: selectedChart?.hos_id!,
          pet_id: selectedChart?.pet_id.pet_id!,
          caution: selectedChart?.caution,
          main_vet: selectedChart?.main_vet.vet_id,
          sub_vet: selectedChart?.sub_vet?.vet_id,
          target_date: selectedDate,
          memo_a: "",
          memo_b: "",
          memo_c: "",
          target_weight: selectedChart?.target_weight,
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

      // 임시 차트인경우만 익일 임시차트 생성
      if (selectedChart?.isNext) {
        addNextDayChart(
          supabase,
          selectedChart?.io_id.io_id!,
          selectedChart?.hos_id!,
          selectedChart?.pet_id.pet_id!,
          selectedChart?.main_vet.vet_id!,
          selectedChart?.sub_vet.vet_id,
          format(addDays(new Date(selectedDate), 1), "yyyy-MM-dd"),
          selectedChart?.target_weight ?? null
        );
      }

      // icu_chart_tx 기본 차트 삽입
      DEFAULT_ICU_CHART.forEach(async (element) => {
        const { error: icuChartTxError } = await supabase
          .from("icu_chart_tx")
          .insert({
            data_type: element.dataType,
            icu_chart_id: icuChart.icu_chart_id,
            io_id: selectedChart?.io_id.io_id!,
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

      // 임시 icu_chart 삭제
      const { error } = await supabase
        .from("icu_chart")
        .delete()
        .match({ icu_chart_id: selectedChart?.icu_chart_id });
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
        Icon={isNext ? PiMagicWand : PiArrowCounterClockwise}
        description={isNext ? "기본차트 생성" : "차트 초기화"}
        setOpen={setOpen}
      />

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            <span className="text-xl">
              {selectedDate}날 {selectedChart?.pet_id.name}
            </span>
            <span className="font-normal">
              의{" "}
              {isNext
                ? "기본차트가 생성됩니다."
                : "처치기록이 모두 초기화됩니다."}
            </span>
          </DialogTitle>
          <DialogDescription>
            {isNext
              ? "환자정보는 자동으로 입력됩니다."
              : "환자정보는 보존됩니다."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={isNext ? "default" : "destructive"}
            onClick={handleNewChart}
            disabled={isSubmitting}
          >
            {isNext ? "생성" : "초기화"}
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
