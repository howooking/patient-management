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
import { ICU_CHART_TX_DATA_TYPE } from "@/constants/icu-charT-tx-data-type";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { type IcuChartTxJoined } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { z } from "zod";
import { chartTxFormSchema, INDEX } from "./todo-edit-dialog";

export default function TodoEditDialog({
  chartTx,
}: {
  chartTx: IcuChartTxJoined;
}) {
  const form = useForm<z.infer<typeof chartTxFormSchema>>({
    resolver: zodResolver(chartTxFormSchema),
    defaultValues: {
      todo_name: chartTx.todo_name,
      todo_memo: chartTx.todo_memo ?? "",
      data_type: chartTx.data_type,
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
        .match({ icu_chart_tx_id: chartTx.icu_chart_tx_id });
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
        title: "오더 삭제 중 에러발생",
        description: "관리자에게 문의하세요",
      });
    } finally {
      setIsSubmitting(false);
      setOpen(false);
    }
  };

  const convertToNum = useCallback(
    () => (bool: boolean) => {
      return bool ? 1 : 0;
    },
    []
  );

  const onSubmit = async (values: z.infer<typeof chartTxFormSchema>) => {
    setIsSubmitting(true);
    console.log(values);
    const todo = [
      convertToNum(values.todo_1),
      convertToNum(values.todo_2),
      convertToNum(values.todo_3),
      convertToNum(values.todo_4),
      convertToNum(values.todo_5),
      convertToNum(values.todo_6),
      convertToNum(values.todo_7),
      convertToNum(values.todo_8),
      convertToNum(values.todo_9),
      convertToNum(values.todo_10),
      convertToNum(values.todo_11),
      convertToNum(values.todo_12),
      convertToNum(values.todo_13),
      convertToNum(values.todo_14),
      convertToNum(values.todo_15),
      convertToNum(values.todo_16),
      convertToNum(values.todo_17),
      convertToNum(values.todo_18),
      convertToNum(values.todo_19),
      convertToNum(values.todo_21),
      convertToNum(values.todo_22),
      convertToNum(values.todo_23),
      convertToNum(values.todo_24),
    ];
    console.log(todo);

    try {
      const { error } = await supabase
        .from("icu_chart_tx")
        .update({
          data_type: values.data_type,
          todo_name: values.todo_name,
          todo_memo: values.todo_memo,
        })
        .match({
          icu_chart_tx_id: chartTx.icu_chart_tx_id,
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
        title: "오더 수정 중 에러발생",
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
        <Pencil1Icon className="text-primary cursor-pointer hover:scale-110 transition w-3 h-3 absolute right-2 top-3" />
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogTitle className="font-normal">
          <span className="text-xl font-bold">{chartTx.todo_name}</span> 오더
          변경
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
                    오더 타입 설정
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

            {/* 오더내용 */}
            <FormField
              control={form.control}
              name="todo_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold flex items-center gap-2">
                    오더
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="h-8 text-sm" />
                  </FormControl>

                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* 오더메모 */}
            <FormField
              control={form.control}
              name="todo_memo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold flex items-center gap-2">
                    오더 추가 설명
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="h-8 text-sm" />
                  </FormControl>

                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* 오더 시간 */}
            <div className="text-sm font-semibold">오더 시간 설정</div>
            <div className="flex w-full col-span-2">
              {INDEX.map((element) => (
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
                수정
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
