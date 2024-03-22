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
import useIcuChartTx from "@/hooks/useIcuChartTx";
import { useSelectedDate } from "@/lib/store/selected-date";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { addNextDayChart, cn } from "@/lib/utils";
import { type IcuChartJoined } from "@/types/type";
import { addDays, format, parseISO, subDays } from "date-fns";
import { useMemo, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { PiClipboardText } from "react-icons/pi";

export default function CopyPrevChartDialog({
  selectedChart,
}: {
  selectedChart?: IcuChartJoined;
}) {
  const supabase = createSupabaseBrowserClient();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { icuChart } = useIcuChart();
  const { icuChartTx } = useIcuChartTx();
  const { selectedDate } = useSelectedDate();

  // 전날 icu_chart 정보 가져오기
  const prevDateChart = useMemo(
    () =>
      icuChart
        ?.filter(
          (element) => element.io_id.io_id === selectedChart?.io_id.io_id
        )
        .find((element) => {
          const prevDate = format(
            subDays(parseISO(selectedDate), 1),
            "yyyy-MM-dd"
          );
          return element.target_date === prevDate;
        }),
    [icuChart, selectedChart?.io_id.io_id, selectedDate]
  );

  // 전날 ich_chart_tx 정보 가져오기
  const prevDateChartTx = useMemo(
    () =>
      icuChartTx?.filter(
        (element) => element.icu_chart_id === prevDateChart?.icu_chart_id
      ),
    [icuChartTx, prevDateChart?.icu_chart_id]
  );

  const handleCopy = async () => {
    setIsSubmitting(true);
    try {
      // 해당일의 차트가 있는 경우 삭제
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

      // 전날 icu_chart 정보 삽입
      const { data, error: icuChartCopyError } = await supabase
        .from("icu_chart")
        .insert({
          hos_id: prevDateChart?.hos_id!,
          io_id: prevDateChart?.io_id.io_id!,
          pet_id: prevDateChart?.pet_id.pet_id!,
          target_date: selectedDate,
          caution: prevDateChart?.caution,
          main_vet: prevDateChart?.main_vet.vet_id,
          sub_vet: prevDateChart?.sub_vet?.vet_id,
          memo_a: prevDateChart?.memo_a,
          memo_b: prevDateChart?.memo_b,
          memo_c: prevDateChart?.memo_c,
          target_weight: prevDateChart?.target_weight,
          type: prevDateChart?.type,
        })
        .select("icu_chart_id")
        .single();
      if (icuChartCopyError) {
        toast({
          variant: "destructive",
          title: icuChartCopyError.message,
          description: "관리자에게 문의하세요",
        });
        return;
      }

      // 전날 icu_chart_tx복사
      if (prevDateChartTx && prevDateChartTx.length > 0) {
        const promises = prevDateChartTx.map(async (element) => {
          await supabase.from("icu_chart_tx").insert({
            data_type: element.data_type!,
            icu_chart_id: data.icu_chart_id!,
            io_id: element.io_id.io_id!,
            todo_name: element.todo_name!,
            drug_id: element.drug_id,
            drug_product_id: element.drug_product_id,
            test_id: element.test_id,
            feed_id: element.feed_id,
            test_set_id: element.test_set_id,
            todo: element.todo,
            todo_memo: element.todo_memo,
          });
        });
        await Promise.all(promises);
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
    } catch (error) {
      toast({
        variant: "destructive",
        title: "전일 차트 복사 중 에러발생",
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
        Icon={PiClipboardText}
        description="전일 차트 복사"
        setOpen={setOpen}
      />

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            <span className="text-xl">{selectedChart?.pet_id.name}</span>
            <span className="font-normal">
              의 전일 차트를 복사하시겠습니까?
            </span>
          </DialogTitle>
          <DialogDescription>
            {!selectedChart?.isNext && "이미 작성된 처치내용은 삭제됩니다."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleCopy} disabled={isSubmitting}>
            복사
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
