import { VetsOptions } from "@/components/hospital/topbar/pet-dialog/search-tab";
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
  FormLabel,
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
import useCurrentHospitalId from "@/hooks/useCurrentHospital";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { icuChartVetFormSchema } from "@/lib/zod/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { z } from "zod";

export default function EditVetDialog({
  main_vet,
  sub_vet,
  icu_chart_id,
}: {
  main_vet?: string;
  sub_vet?: string;
  icu_chart_id?: number;
}) {
  // 수의사 목록
  const hos_id = useCurrentHospitalId();
  const [vetOptions, setVetOptions] = useState<VetsOptions>(null);
  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    const getVets = async () => {
      const { data: vets } = await supabase
        .from("hos_vet_mapping")
        .select("nickname, vet_id")
        .match({ hos_id })
        .match({ vet_approved: true })
        .order("rank");

      setVetOptions(vets);
    };
    getVets();
  }, [hos_id, supabase]);

  const form = useForm<z.infer<typeof icuChartVetFormSchema>>({
    resolver: zodResolver(icuChartVetFormSchema),
    defaultValues: {
      main_vet,
      sub_vet,
    },
  });

  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: z.infer<typeof icuChartVetFormSchema>) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("icu_chart")
        .update({
          main_vet: values.main_vet,
          sub_vet: values.sub_vet !== "null" ? values.sub_vet : null,
        })
        .match({
          icu_chart_id,
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
        title: "주치의/부주치의 수정 중 에러발생",
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
        <DialogTitle>주치의/부주치의 변경</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* 주치의 */}
            <FormField
              control={form.control}
              name="main_vet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold flex items-center gap-2">
                    주치의*
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={main_vet}
                  >
                    <FormControl>
                      <SelectTrigger className="text-sm h-8">
                        <SelectValue placeholder="주치의 선택" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="text-sm">
                      {vetOptions?.map((option) => (
                        <SelectItem key={option.vet_id} value={option.vet_id}>
                          {option.nickname}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* 부주치의 */}
            <FormField
              control={form.control}
              name="sub_vet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold flex items-center gap-2">
                    부주치의
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={sub_vet}>
                    <FormControl>
                      <SelectTrigger className="text-sm h-8">
                        <SelectValue placeholder="부주치의 선택" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="text-sm">
                      <SelectItem value="null">없음</SelectItem>
                      {vetOptions?.map((option) => (
                        <SelectItem key={option.vet_id} value={option.vet_id}>
                          {option.nickname}
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
      </DialogContent>
    </Dialog>
  );
}
