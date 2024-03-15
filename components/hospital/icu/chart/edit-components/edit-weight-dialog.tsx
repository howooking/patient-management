import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
import { toast } from "@/components/ui/use-toast";
import useCurrentHospitalId from "@/hooks/useCurrentHospital";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { z } from "zod";

export const icuChartTargetWeightFormSchema = z.object({
  weight: z
    .string({
      required_error: "체중을 입력해주세요",
    })
    .min(1, { message: "체중을 입력해주세요" }),
});

export default function EditWeightDialog({
  pet_id,
  icu_chart_id,
}: {
  pet_id?: number;
  icu_chart_id?: number;
}) {
  const form = useForm<z.infer<typeof icuChartTargetWeightFormSchema>>({
    resolver: zodResolver(icuChartTargetWeightFormSchema),
    defaultValues: {
      weight: undefined,
    },
  });

  const supabase = createSupabaseBrowserClient();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hos_id = useCurrentHospitalId();

  const onSubmit = async (
    values: z.infer<typeof icuChartTargetWeightFormSchema>
  ) => {
    setIsSubmitting(true);
    try {
      const { data: testResult, error: testResultError } = await supabase
        .from("test_results")
        .insert({
          result: values.weight,
          hos_id,
          pet_id,
          test_id: "5382e813-9151-4fcb-8e99-4de210f9e129",
        })
        .select("created_at")
        .single();

      if (testResultError) {
        toast({
          variant: "destructive",
          title: testResultError.message,
          description: "관리자에게 문의하세요",
        });
        return;
      }

      const { error: icuChartError } = await supabase
        .from("icu_chart")
        .update({
          target_weight: `${values.weight}kg(${testResult.created_at?.slice(
            0,
            10
          )})`,
        })
        .match({
          icu_chart_id,
        });

      if (icuChartError) {
        toast({
          variant: "destructive",
          title: icuChartError.message,
          description: "관리자에게 문의하세요",
        });
        return;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "체중 수정 중 에러 발생",
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
        <DialogTitle>체중 변경</DialogTitle>
        <DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      kg을 생략한 숫자만 입력해주세요
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="h-8 text-sm" />
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
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
