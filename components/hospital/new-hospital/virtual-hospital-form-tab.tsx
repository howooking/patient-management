"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "병원 이름은 두글자 이상으로 만들어주세요." }),
});

export default function VirtualHospitalFormTab() {
  const router = useRouter();

  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`${location.origin}/api/new-hospital`, {
        method: "POST",
        body: JSON.stringify({
          name: values.name,
          type: "virtual",
        }),
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        toast({
          title: "가상 병원이 생성되었습니다.",
        });
        router.replace(`/hospital/${data.hospitalId}`);
        router.refresh();
        return;
      }

      toast({
        variant: "destructive",
        title: data.error,
        description: "관리자에게 문의하세요",
      });
    } catch (error) {
      console.error(error, "error while signing up");
    } finally {
      setIsSubmitting(false);
    }
  };

  const supabase = createSupabaseBrowserClient();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">
                가상병원 이름
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="나만의 공간"
                  {...field}
                  className="border-2 h-[40px] px-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            뒤로가기
          </Button>

          <Button
            type="submit"
            className="font-semibold"
            disabled={isSubmitting}
          >
            병원등록
            <AiOutlineLoading3Quarters
              className={cn("ml-2", isSubmitting ? "animate-spin" : "hidden")}
            />
          </Button>
        </div>
      </form>
    </Form>
  );
}
