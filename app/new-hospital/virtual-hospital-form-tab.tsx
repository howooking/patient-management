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
  name: z.string(),
  businessNumber: z
    .string()
    .refine((data) => !data.includes("-"), {
      message: "- 없이 숫자만 입력해주세요",
    })
    .refine((data) => /^\d{10}$/.test(data), {
      message: "사업자 등록번호는 10자리 숫자 입니다.",
    }),
  address: z.string(),
  phone: z.string(),
});

export default function VirtualHospitalFormTab({
  namePlaceholder,
}: {
  namePlaceholder?: string;
}) {
  const router = useRouter();

  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      businessNumber: "",
      address: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`${location.origin}/api/signup`, {
        method: "POST",
        body: JSON.stringify({
          vetName: values.name,
          licenseNumber: values.businessNumber,
        }),
      });

      if (response.ok) {
        toast({
          title: `${values.name}님 반갑습니다!`,
          description: "담당자 면허증 확인 후 가입이 승인됩니다.",
        });
        router.push("/wait");
        return;
      }

      const data = await response.json();
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
                  placeholder="벳터핸즈 동물메디컬센터"
                  {...field}
                  className="border-2 h-[40px] px-2"
                />
              </FormControl>
              <FormDescription>풀네임 사용이 권장됩니다.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            variant="outline"
            asChild
            onClick={() => supabase.auth.signOut()}
          >
            <Link href="/">뒤로가기</Link>
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
