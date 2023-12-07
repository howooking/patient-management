"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";

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
import Logo from "@/components/common/logo";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  vetName: z.string().min(2, {
    message: "2자 이상 실명을 입력해주세요.",
  }),
  licenseNumber: z.string().refine((data) => /^\d{5}$/.test(data), {
    message: "라이선스 번호는 5자리 숫자입니다.",
  }),
  agree: z
    .boolean()
    .refine((data) => data, { message: "약관에 동의해주세요." }),
});

export default function SignupForm({
  namePlaceholder,
}: {
  namePlaceholder: string;
}) {
  const router = useRouter();

  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vetName: namePlaceholder,
      licenseNumber: "",
      agree: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`${location.origin}/api/signup`, {
        method: "POST",
        body: JSON.stringify({
          vetName: values.vetName,
          licenseNumber: values.licenseNumber,
        }),
      });

      if (response.ok) {
        toast({
          title: `${values.vetName}님 반갑습니다!`,
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
      // eslint-disable-next-line no-console
      console.error(error, "error while signing up");
    } finally {
      setIsSubmitting(false);
    }
  };

  const supabase = createSupabaseBrowserClient();

  return (
    <section className="w-1/2 p-24 space-y-12">
      <div className="flex items-center gap-2">
        <Logo />
        <h2 className="text-2xl">회원가입</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="vetName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  수의사 이름
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="김머머"
                    {...field}
                    className="border-2 h-[52px] px-4"
                  />
                </FormControl>
                <FormDescription>실명 사용이 권장됩니다.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="licenseNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  수의사 면허번호
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="20124"
                    {...field}
                    className="border-2 h-[52px] px-4"
                  />
                </FormControl>
                <FormDescription>
                  면허증 사진을{" "}
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
            name="agree"
            render={({ field }) => (
              <FormItem className="">
                <div className="flex gap-2 rounded-md border-2 border-input p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>
                    Vetterhands{" "}
                    <Link href="/#" className="text-primary">
                      이용약관
                    </Link>{" "}
                    및{" "}
                    <Link href="/#" className="text-primary">
                      개인정보정책
                    </Link>
                    에 동의합니다.
                  </FormLabel>
                </div>
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
              회원가입
              <AiOutlineLoading3Quarters
                className={cn("ml-2", isSubmitting ? "animate-spin" : "hidden")}
              />
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
