import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { icuChartIoDateFormSchema } from "@/lib/zod/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { z } from "zod";

export default function EditIoDateDialog({
  io_id,
  in_date,
  out_due_date,
}: {
  io_id?: number;
  in_date?: string;
  out_due_date?: string;
}) {
  const form = useForm<z.infer<typeof icuChartIoDateFormSchema>>({
    resolver: zodResolver(icuChartIoDateFormSchema),
    defaultValues: {
      date: {
        from: new Date(in_date!),
        to: new Date(out_due_date!),
      },
    },
  });

  useEffect(() => {
    if (in_date && out_due_date) {
      form.reset({
        date: {
          from: new Date(in_date),
          to: new Date(out_due_date),
        },
      });
    }
  }, [in_date, out_due_date, form]);

  const supabase = createSupabaseBrowserClient();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: z.infer<typeof icuChartIoDateFormSchema>) => {
    setIsSubmitting(true);

    try {
      const { error: inAndOutError } = await supabase
        .from("in_and_out")
        .update({
          in_date: format(values.date.from, "yyyy-MM-dd"),
          out_due_date: format(values.date.to, "yyyy-MM-dd"),
        })
        .match({
          io_id,
        });
      if (inAndOutError) {
        toast({
          variant: "destructive",
          title: inAndOutError.message,
          description: "관리자에게 문의하세요",
        });
        return;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "입퇴원일 수정 중 에러발생",
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
        <Pencil1Icon className="absolute top-2 right-2 text-primary cursor-pointer hover:scale-110 transition" />
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogTitle>입원일, 퇴원예정일 변경</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* 입원일 ~ 퇴원예정일 */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm font-semibold flex items-center gap-2">
                    입원일 ~ 퇴원예정일*
                  </FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant={"outline"}
                          className={cn(
                            "h-8 w-full text-sm justify-start text-left font-normal",
                            !field.value.from && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value.from ? (
                            field.value.to ? (
                              <>
                                {format(field.value.from, "yyyy-MM-dd")} ~{" "}
                                {format(field.value.to, "MM-dd")}
                              </>
                            ) : (
                              format(field.value.from, "yyyy-MM-dd")
                            )
                          ) : (
                            <span>입퇴원일 선택</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          locale={ko}
                          initialFocus
                          mode="range"
                          defaultMonth={field.value.from}
                          selected={{
                            from: field.value.from,
                            to: field.value.to,
                          }}
                          onSelect={field.onChange}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className="flex gap-2 justify-end">
              <Button disabled={isSubmitting}>
                수정
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
