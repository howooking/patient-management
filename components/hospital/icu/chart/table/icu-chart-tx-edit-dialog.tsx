import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { ICU_CHART_TX_DATA_TYPE } from "@/constants/icu-chart-tx-data-type";
import { TIME } from "@/constants/time";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { type IcuChartTxJoined } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { z } from "zod";

export const chartTxFormSchema = z.object({
  todo_name: z
    .string({
      required_error: "처치를 입력해주세요.",
    })
    .min(1, { message: "처치를 입력해주세요." }),
  todo_memo: z.string().optional(),
  data_type: z.string({ required_error: "처치타입을 선택해주세요." }),
  todo_1: z.boolean().default(false),
  todo_2: z.boolean().default(false),
  todo_3: z.boolean().default(false),
  todo_4: z.boolean().default(false),
  todo_5: z.boolean().default(false),
  todo_6: z.boolean().default(false),
  todo_7: z.boolean().default(false),
  todo_8: z.boolean().default(false),
  todo_9: z.boolean().default(false),
  todo_10: z.boolean().default(false),
  todo_11: z.boolean().default(false),
  todo_12: z.boolean().default(false),
  todo_13: z.boolean().default(false),
  todo_14: z.boolean().default(false),
  todo_15: z.boolean().default(false),
  todo_16: z.boolean().default(false),
  todo_17: z.boolean().default(false),
  todo_18: z.boolean().default(false),
  todo_19: z.boolean().default(false),
  todo_20: z.boolean().default(false),
  todo_21: z.boolean().default(false),
  todo_22: z.boolean().default(false),
  todo_23: z.boolean().default(false),
  todo_24: z.boolean().default(false),
});

export default function IcuChartTxDialog({
  chartTx,
  edit,
  io_id,
  icu_chart_id,
}: {
  chartTx?: IcuChartTxJoined;
  edit?: boolean;
  io_id?: number;
  icu_chart_id?: number;
}) {
  const form = useForm<z.infer<typeof chartTxFormSchema>>({
    resolver: zodResolver(chartTxFormSchema),
    defaultValues: {
      todo_name: chartTx?.todo_name,
      todo_memo: chartTx?.todo_memo ?? "",
      data_type: chartTx?.data_type,
      todo_1: chartTx?.todo[0] === "1",
      todo_2: chartTx?.todo[1] === "1",
      todo_3: chartTx?.todo[2] === "1",
      todo_4: chartTx?.todo[3] === "1",
      todo_5: chartTx?.todo[4] === "1",
      todo_6: chartTx?.todo[5] === "1",
      todo_7: chartTx?.todo[6] === "1",
      todo_8: chartTx?.todo[7] === "1",
      todo_9: chartTx?.todo[8] === "1",
      todo_10: chartTx?.todo[9] === "1",
      todo_11: chartTx?.todo[10] === "1",
      todo_12: chartTx?.todo[11] === "1",
      todo_13: chartTx?.todo[12] === "1",
      todo_14: chartTx?.todo[13] === "1",
      todo_15: chartTx?.todo[14] === "1",
      todo_16: chartTx?.todo[15] === "1",
      todo_17: chartTx?.todo[16] === "1",
      todo_18: chartTx?.todo[17] === "1",
      todo_19: chartTx?.todo[18] === "1",
      todo_20: chartTx?.todo[19] === "1",
      todo_21: chartTx?.todo[20] === "1",
      todo_22: chartTx?.todo[21] === "1",
      todo_23: chartTx?.todo[22] === "1",
      todo_24: chartTx?.todo[23] === "1",
    },
  });

  // useEffect(() => {
  //   form.reset();
  // }, [form]);

  const supabase = createSupabaseBrowserClient();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDeleteChartTx = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("icu_chart_tx")
        .delete()
        .match({ icu_chart_tx_id: chartTx?.icu_chart_tx_id });
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
        title: "처치 삭제 중 에러발생",
        description: "관리자에게 문의하세요",
      });
    } finally {
      setIsSubmitting(false);
      setOpen(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof chartTxFormSchema>) => {
    setIsSubmitting(true);
    const todo = [
      values.todo_1 ? "1" : "0",
      values.todo_2 ? "1" : "0",
      values.todo_3 ? "1" : "0",
      values.todo_4 ? "1" : "0",
      values.todo_5 ? "1" : "0",
      values.todo_6 ? "1" : "0",
      values.todo_7 ? "1" : "0",
      values.todo_8 ? "1" : "0",
      values.todo_9 ? "1" : "0",
      values.todo_10 ? "1" : "0",
      values.todo_11 ? "1" : "0",
      values.todo_12 ? "1" : "0",
      values.todo_13 ? "1" : "0",
      values.todo_14 ? "1" : "0",
      values.todo_15 ? "1" : "0",
      values.todo_16 ? "1" : "0",
      values.todo_17 ? "1" : "0",
      values.todo_18 ? "1" : "0",
      values.todo_19 ? "1" : "0",
      values.todo_20 ? "1" : "0",
      values.todo_21 ? "1" : "0",
      values.todo_22 ? "1" : "0",
      values.todo_23 ? "1" : "0",
      values.todo_24 ? "1" : "0",
    ];

    // 수정
    try {
      const { error } = await supabase.from("icu_chart_tx").upsert({
        data_type: values.data_type,
        todo_name: values.todo_name,
        todo_memo: values.todo_memo,
        todo,
        icu_chart_id: edit ? chartTx?.icu_chart_id! : icu_chart_id!,
        io_id: edit ? chartTx?.io_id.io_id! : io_id!,
        icu_chart_tx_id: chartTx?.icu_chart_tx_id,
      });

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
        title: "처치 수정 중 에러발생",
        description: "관리자에게 문의하세요",
      });
    } finally {
      setIsSubmitting(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {edit ? (
          <>
            <Pencil1Icon className="text-primary cursor-pointer hover:scale-110 transition w-3 h-3 absolute right-2 top-3" />
          </>
        ) : (
          <>
            <Button size="sm" className="h-6 px-2">
              추가
            </Button>
          </>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogTitle>
          <span className="text-xl">{chartTx?.todo_name}</span> 처치{" "}
          {edit ? "변경" : "추가"}
        </DialogTitle>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            <FormField
              control={form.control}
              name="data_type"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="text-sm font-semibold flex items-center gap-2">
                    처치 타입 설정
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-2"
                    >
                      {ICU_CHART_TX_DATA_TYPE.map((element) => (
                        <FormItem
                          key={element.value}
                          className="flex items-center space-x-1 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={element.value} />
                          </FormControl>
                          <FormLabel className="cursor-pointer">
                            {element.title}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 처치내용 */}
            <FormField
              control={form.control}
              name="todo_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold flex items-center gap-2">
                    처치명
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="h-8 text-sm" />
                  </FormControl>

                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* 처치메모 */}
            <FormField
              control={form.control}
              name="todo_memo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold flex items-center gap-2">
                    처치 메모
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="h-8 text-sm" />
                  </FormControl>

                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* 처치 시간 */}
            <div className="text-sm font-semibold">처치 시간 설정</div>
            <div className="flex w-full col-span-2">
              {TIME.map((element) => (
                <FormField
                  key={element}
                  control={form.control}
                  name={`todo_${element}` as "todo_1"}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        className={cn(
                          "border h-8 w-full flex items-center justify-center cursor-pointer hover:opacity-70 transition",
                          field.value ? "bg-green-200" : "bg-red-200"
                        )}
                      >
                        {element}
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          className="hidden"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <div className="flex gap-2 col-span-2 justify-end">
              <Button disabled={isSubmitting}>
                {edit ? "수정" : "추가"}
                <AiOutlineLoading3Quarters
                  className={cn(
                    "ml-2",
                    isSubmitting ? "animate-spin" : "hidden"
                  )}
                />
              </Button>
              <Button
                type="button"
                onClick={handleDeleteChartTx}
                disabled={isSubmitting}
                variant="destructive"
                className={edit ? "block" : "hidden"}
              >
                삭제
                <AiOutlineLoading3Quarters
                  className={cn(
                    "ml-2",
                    isSubmitting ? "animate-spin" : "hidden"
                  )}
                />
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  닫기
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
