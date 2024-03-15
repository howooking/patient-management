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
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import useHospitalGroup from "@/hooks/useHospitalGroup";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { z } from "zod";

export const icuChartGroupFormSchema = z.object({
  group: z.string({ required_error: "주치의를 선택해주세요." }),
});

export default function EditGroupDialog({
  io_id,
  group,
}: {
  io_id?: number;
  group?: string;
}) {
  const hospitalGroup = useHospitalGroup();

  const form = useForm<z.infer<typeof icuChartGroupFormSchema>>({
    resolver: zodResolver(icuChartGroupFormSchema),
    defaultValues: {
      group,
    },
  });

  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createSupabaseBrowserClient();

  const onSubmit = async (values: z.infer<typeof icuChartGroupFormSchema>) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("in_and_out")
        .update({
          group: values.group,
        })
        .match({
          io_id,
        });
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
        title: "그룹 수정 중 에러발생",
        description: "관리자에게 문의하세요.",
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
        <DialogTitle>그룹 변경</DialogTitle>
        <DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="group"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={group}>
                      <FormControl>
                        <SelectTrigger className="text-sm h-8">
                          <SelectValue placeholder="주치의 선택" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="text-sm">
                        {hospitalGroup?.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
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
