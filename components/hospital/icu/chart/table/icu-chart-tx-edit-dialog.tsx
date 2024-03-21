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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { ICU_CHART_TX_DATA_TYPE } from "@/constants/icu-chart-tx-data-type";
import { TIME } from "@/constants/time";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { chartTxFormSchema } from "@/lib/zod/form-schemas";
import { type IcuChartTxJoined } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { z } from "zod";

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
  });

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

  const handleIcuChartTx = async (
    values: z.infer<typeof chartTxFormSchema>
  ) => {
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

  const [startTime, setStartTime] = useState<string | undefined>(undefined);
  const [timeTerm, setTimeTerm] = useState<string | undefined>(undefined);

  useEffect(() => {
    const start = Number(startTime);
    const term = Number(timeTerm);

    const indicesToSetTrue = [];
    for (let i = start; i <= 24; i += term) {
      indicesToSetTrue.push(i);
    }

    for (let i = 1; i <= 24; i++) {
      form.setValue(
        `todo_${i}` as keyof z.infer<typeof chartTxFormSchema>,
        indicesToSetTrue.includes(i)
      );
    }
  }, [form, startTime, timeTerm]);

  // Reset form when opening or closing dialog
  useEffect(() => {
    form.reset({
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
    });
    setStartTime(undefined);
    setTimeTerm(undefined);
  }, [chartTx, form, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {edit ? (
          <>
            <Pencil1Icon className="text-primary cursor-pointer hover:scale-110 transition w-3 h-3 absolute right-2 top-3" />
          </>
        ) : (
          <>
            <div className="h-6 px-2 bg-primary text-white flex items-center justify-center rounded-md hover:bg-primary/70">
              추가
            </div>
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
            onSubmit={form.handleSubmit(handleIcuChartTx)}
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
            <div className="text-sm font-semibold flex gap-2 items-center">
              <div>처치 시간 설정</div>
              <div>
                <Select onValueChange={setStartTime} value={startTime}>
                  <SelectTrigger className="h-6">
                    <SelectValue placeholder="시작시간" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {TIME.map((element) => (
                        <SelectItem
                          value={element.toString()}
                          key={element}
                          className="h-6 text-sm"
                        >
                          {element}시 시작
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select onValueChange={setTimeTerm} value={timeTerm}>
                  <SelectTrigger className="h-6">
                    <SelectValue placeholder="시간간격" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>시간간격</SelectLabel>
                      {["1", "2", "3", "4", "6", "8", "12", "24"].map(
                        (element) => (
                          <SelectItem
                            value={element.toString()}
                            key={element}
                            className="h-6 text-sm"
                          >
                            {element}시간 간격
                          </SelectItem>
                        )
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex w-full col-span-2">
              {TIME.map((element) => (
                <FormField
                  key={element}
                  control={form.control}
                  name={`todo_${element}`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        className={cn(
                          "border h-8 w-full flex items-center justify-center cursor-pointer hover:opacity-70 transition",
                          field.value ? "bg-green-200" : "bg-red-100"
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
