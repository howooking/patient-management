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

export default function NewHospitalFormTab({
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
              <FormLabel className="text-lg font-semibold">병원 이름</FormLabel>
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
        <FormField
          control={form.control}
          name="businessNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">
                사업자 번호
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="5303601377"
                  {...field}
                  className="border-2 h-[40px] px-2"
                />
              </FormControl>
              <FormDescription>
                - 없이 숫자만 입력해주세요. <br /> 사업자등록증 사진을{" "}
                <span className="text-foreground font-semibold">
                  junsgk@gmail.com
                </span>
                으로 보내주세요.
                <br />
                사진은 확인 후 바로 폐기됩니다.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">병원 주소</FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="서울특별시 송파구 삼전로 56"
                  {...field}
                  className="border-2 h-[40px] px-2"
                />
              </FormControl>
              <FormDescription>주소 검색 기능 추가</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">
                병원 전화번호
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="0226514187"
                  {...field}
                  className="border-2 h-[40px] px-2"
                />
              </FormControl>
              <FormDescription>- 없이 숫자만 입력해주세요</FormDescription>
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
