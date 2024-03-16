import { Input } from "@/components/ui/input";
import { TableCell } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function IcuTableCellInput({
  className,
  result,
  tx_id,
  icu_chart_tx_id,
  io_id,
  time,
}: {
  className?: string;
  result: string;
  tx_id?: number;
  icu_chart_tx_id: number;
  io_id: number;
  time: number;
}) {
  const [input, setInput] = useState(result);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setInput(result);
  }, [result]);

  const supabase = createSupabaseBrowserClient();

  const handleUpdateResult = async () => {
    // tx 삽입
    if (input !== result) {
      setIsSubmitting(true);

      try {
        if (!tx_id) {
          const { data, error } = await supabase
            .from("tx")
            .insert({
              icu_chart_tx_id,
              io_id,
              result: input,
            })
            .select("tx_id")
            .single();

          if (error) {
            toast({
              variant: "destructive",
              title: error.message,
              description: "처치 입력 중 에러발생",
            });
            return;
          }

          const { error: icuChartTxError } = await supabase
            .from("icu_chart_tx")
            .update({
              [`done_${time}`]: data.tx_id,
            })
            .match({ icu_chart_tx_id });

          if (icuChartTxError) {
            toast({
              variant: "destructive",
              title: icuChartTxError.message,
              description: "처치 입력 중 에러발생",
            });
            return;
          }
        } else {
          // tx 수정
          const { error: txUpdateError } = await supabase
            .from("tx")
            .update({
              result: input,
            })
            .match({ tx_id });

          if (txUpdateError) {
            toast({
              variant: "destructive",
              title: txUpdateError.message,
              description: "처치 입력 중 에러발생",
            });
            return;
          }
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "처치 결과 수정 중 에러발생",
          description: "관리자에게 문의하세요.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <TableCell className={cn("p-0 h-2 leading-4", className)}>
      <Input
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            (event.target as HTMLInputElement).blur();
            handleUpdateResult();
          }
        }}
        onBlur={handleUpdateResult}
        disabled={isSubmitting}
        value={isSubmitting ? "저장중..." : input}
        onChange={(event) => setInput(event.target.value)}
        className="rounded-none px-1 focus-visible:border-2 focus-visible:border-rose-400 focus-visible:ring-0"
      />
    </TableCell>
  );
}
