"use client";

import Logo from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { toast } from "@/components/ui/use-toast";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { signupFormSchema } from "@/lib/zod/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import * as z from "zod";

export default function SignupForm({
  namePlaceholder,
}: {
  namePlaceholder: string;
}) {
  const router = useRouter();

  const supabase = createSupabaseBrowserClient();

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      vetName: namePlaceholder,
      licenseNumber: undefined,
      agree: false,
    },
  });

  const handleGoBack = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (values: z.infer<typeof signupFormSchema>) => {
    setIsSubmitting(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    try {
      const { error } = await supabase.from("vets").insert({
        vet_id: user.id,
        vet_email: user.email as string,
        vet_name: values.vetName,
        license_no: Number(values.licenseNumber),
        avatar_url: user.user_metadata.avatar_url as string,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: error.message,
          description: "관리자에게 문의하세요",
        });
        return;
      }

      toast({
        title: `${values.vetName}님 반갑습니다!`,
        description: "담당자가 면허증 확인 후 가입이 승인됩니다.",
      });
      router.push("/wait");
      return;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "error while signing up",
        description: "관리자에게 문의하세요",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
                    placeholder="김머머"
                    {...field}
                    className="border-2 h-[52px] px-4"
                  />
                </FormControl>
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
            <Button type="button" variant="outline" onClick={handleGoBack}>
              뒤로가기
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
