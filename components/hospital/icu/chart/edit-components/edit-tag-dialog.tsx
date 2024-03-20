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
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { icuChartTagFormSchema } from "@/lib/zod/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { z } from "zod";

export default function EditTagDialog({
  io_id,
  tag,
}: {
  io_id?: number;
  tag?: string | null;
}) {
  const form = useForm<z.infer<typeof icuChartTagFormSchema>>({
    resolver: zodResolver(icuChartTagFormSchema),
    defaultValues: {
      tag: tag ?? "",
    },
  });

  const supabase = createSupabaseBrowserClient();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (tag) {
      form.reset({
        tag: tag ?? "",
      });
    }
  }, [form, tag]);

  const onSubmit = async (values: z.infer<typeof icuChartTagFormSchema>) => {
    setIsSubmitting(true);

    try {
      const { error: icuChartError } = await supabase
        .from("in_and_out")
        .update({
          tag: values.tag,
        })
        .match({
          io_id,
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
        title: "입원사유 수정 중 에러발생",
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
        <DialogTitle>입원사유 변경</DialogTitle>
        <DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="tag"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      입원사유 앞에 #를 반드시 붙여주세요
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-8 text-sm"
                        placeholder="#췌장염"
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
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
