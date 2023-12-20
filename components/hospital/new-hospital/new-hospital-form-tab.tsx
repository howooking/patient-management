"use client";

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
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useSelectedPet } from "@/lib/store/pets";
import { newHospitalFormSchema } from "@/lib/zod/form-schemas";

export default function NewHospitalFormTab() {
  const router = useRouter();
  const { toast } = useToast();
  const { setSelectedPet } = useSelectedPet();

  const form = useForm<z.infer<typeof newHospitalFormSchema>>({
    resolver: zodResolver(newHospitalFormSchema),
    defaultValues: {
      name: undefined,
      businessNumber: undefined,
      address: undefined,
      phoneNumber: undefined,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (values: z.infer<typeof newHospitalFormSchema>) => {
    const { address, businessNumber, name, phoneNumber } = values;

    setIsSubmitting(true);

    try {
      const response = await fetch(`${location.origin}/api/new-hospital`, {
        method: "POST",
        body: JSON.stringify({
          type: "real",
          name,
          businessNumber,
          address,
          phoneNumber,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        toast({
          title: "사업자등록증 확인 후 생성이 완료됩니다",
          description: "잠시 후 페이지가 이동합니다.",
        });
        setSelectedPet(null);
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
      // eslint-disable-next-line no-console
      console.error(error, "error while adding a hospital");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  placeholder="벳터핸즈 동물메디컬센터"
                  {...field}
                  className="border-2 h-[40px] px-2"
                />
              </FormControl>
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
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* TODO 주소검색 api */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">병원 주소</FormLabel>
              <FormControl>
                <Input
                  placeholder="서울특별시 송파구 삼전로 56"
                  {...field}
                  className="border-2 h-[40px] px-2"
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">
                병원 전화번호
              </FormLabel>
              <FormControl>
                <Input
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
        <div className="flex gap-2">
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
