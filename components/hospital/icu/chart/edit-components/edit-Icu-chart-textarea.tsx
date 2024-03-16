import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function EditIcuChartTextarea({
  text,
  memoType,
  icu_chart_id,
}: {
  text?: string | null;
  memoType: string;
  icu_chart_id?: number;
}) {
  const [input, setInput] = useState(text ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setInput(text ?? "");
  }, [text]);

  const supabase = createSupabaseBrowserClient();
  const handleUpdateMemo = async () => {
    if (text !== input) {
      setIsSubmitting(true);
      try {
        const { error } = await supabase
          .from("icu_chart")
          .update({
            [`memo_${memoType}`]: input,
          })
          .match({ icu_chart_id });
        if (error) {
          toast({
            variant: "destructive",
            title: error.message,
            description: "관리자에게 문의하세요.",
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "메모 수정 중 에러발생",
          description: "관리자에게 문의하세요.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Textarea
      disabled={isSubmitting}
      onBlur={handleUpdateMemo}
      rows={10}
      value={isSubmitting ? "저장 중..." : input}
      onChange={(event) => setInput(event.target.value)}
      className={
        "w-full mt-1 p-1 text-xs focus-visible:ring-2 focus-visible:ring-rose-400 break-keep"
      }
    />
  );
}
