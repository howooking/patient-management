import { Button } from "@/components/ui/button";
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { icuChartCautionFormSchema } from "@/lib/zod/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { z } from "zod";

export default function EditCautionDialog({
  icu_chart_id,
  caution,
}: {
  icu_chart_id?: number;
  caution?: string | null;
}) {
  const form = useForm<z.infer<typeof icuChartCautionFormSchema>>({
    resolver: zodResolver(icuChartCautionFormSchema),
    defaultValues: {
      caution: caution ?? "",
    },
  });

  const supabase = createSupabaseBrowserClient();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (caution) {
      form.reset({
        caution: caution ?? "",
      });
    }
  }, [caution, form]);

  const onSubmit = async (
    values: z.infer<typeof icuChartCautionFormSchema>
  ) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("icu_chart")
        .update({
          caution: values.caution,
        })
        .match({
          icu_chart_id,
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
        title: "주의사항 수정 중 에러발생",
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
        <DialogTitle>주의사항 변경</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="caution"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-8 text-sm"
                      placeholder="물림주의, 사나움"
                    />
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
