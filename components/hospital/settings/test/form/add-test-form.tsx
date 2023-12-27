"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import useCurrentHospitalId from "@/hooks/useCurrentHospital";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { addTestFormSchema } from "@/lib/zod/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegCircleQuestion } from "react-icons/fa6";
import * as z from "zod";
import MultiRangeForm from "./multi-range-form";
import { TEST_CATEGORY, TEST_TYPE } from "@/constants/selects";

export default function AddTestForm({ setOpen }: { setOpen: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof addTestFormSchema>>({
    resolver: zodResolver(addTestFormSchema),
    defaultValues: {
      multiRange: [
        {
          species: "canine",
          ranges: [{ gt: "", lt: "" }],
        },
      ],
    },
  });
  const { control, register, handleSubmit, getValues, setValue } = form;

  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const hospitalId = useCurrentHospitalId();

  const onSubmit = async (values: z.infer<typeof addTestFormSchema>) => {
    const {
      type,
      category,
      original_name,
      name,
      unit,
      tag,
      multiRange,
      description,
    } = values;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    setIsSubmitting(true);

    // tests 삽입
    try {
      const { data: tests, error: testsError } = await supabase
        .from("tests")
        .insert({
          hos_id: hospitalId,
          type,
          category,
          original_name,
          name,
          description,
          unit,
          tag,
        })
        .select()
        .single();

      if (testsError) {
        toast({
          variant: "destructive",
          title: testsError.message,
          description: "관리자에게 문의하세요",
        });
        return;
      }

      // test_set 삽입
      const testsId = tests.test_id;

      for (let i = 0; i < multiRange.length; i++) {
        const age = multiRange[i].age;
        const species = multiRange[i].species;

        for (let j = 0; j < multiRange[i].ranges.length; j++) {
          const { description, diagnosis, ge, gt, interpretation, le, lt } =
            multiRange[i].ranges[j];
          const { error: testSetError } = await supabase
            .from("test_set")
            .insert({
              test_id: testsId,
              age,
              species,
              description,
              diagnosis,
              interpretation,
              ge,
              gt,
              le,
              lt,
              order: j,
            })
            .select()
            .single();

          if (testSetError) {
            toast({
              variant: "destructive",
              title: testSetError.message,
              description: "관리자에게 문의하세요",
            });
            return;
          }
        }
      }

      toast({
        title: "검사가 등록되었습니다.",
      });
      router.refresh();
      setOpen(false);
      return;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error, "error while adding a new pet");
    } finally {
      setIsSubmitting(false);
    }
  };

  const [selectedType, setSelectedType] = useState<string | undefined>();

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        {/* 검사 타입 */}
        <FormField
          control={control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-sm font-semibold flex items-center gap-2">
                검사타입*
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger tabIndex={-1} type="button">
                      <FaRegCircleQuestion className="opacity-50" />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      다중범위 : APL, 47미만 낮음, 정상 밤위 47 ~ 254, 254이상
                      높음 <br />
                      선택 : 키트, 양성/음성 <br />
                      다중선택 : 변상태, 혈변 & 점액변 & 설사 <br />
                      서술 : 혈액 도말 검사
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(selectd) => {
                    field.onChange(selectd);
                    setSelectedType(selectd);
                  }}
                  defaultValue={field.value}
                  className="flex gap-6"
                >
                  {TEST_TYPE.map((type) => (
                    <FormItem
                      className="flex items-center space-x-2 space-y-0 text-sm"
                      key={type}
                    >
                      <FormControl>
                        <RadioGroupItem value={type} />
                      </FormControl>
                      <FormLabel>{type}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 검사 카테고리 */}
        <FormField
          control={control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">
                검사 카테고리*
              </FormLabel>
              <Select
                onValueChange={(selectd) => {
                  field.onChange(selectd);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TEST_CATEGORY.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="text-xs"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* 검사명 */}
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold flex items-center gap-2">
                검사명*
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger tabIndex={-1} type="button">
                      <FaRegCircleQuestion className="opacity-50" />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      cPL키트검사, cPL-vcheck 종류 상관없이 모두 cPL
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-sm" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* 원내 검사명 */}
        <FormField
          control={control}
          name="original_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold flex items-center gap-2">
                원내 검사명*
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger tabIndex={-1} type="button">
                      <FaRegCircleQuestion className="opacity-50" />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      검사명과 기계명을 함께 입력 <br />
                      예) CRP-vcheck, CRP-fuji / cPL-IDEXX키트, cPL-vcheck
                      <br />
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-sm" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* 단위 */}
        <FormField
          control={control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold flex items-center gap-2">
                검사 단위*
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-sm" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* 태그 */}
        <FormField
          control={control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold flex items-center gap-2">
                태그(#으로 구분)
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger tabIndex={-1} type="button">
                      <FaRegCircleQuestion className="opacity-50" />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      #CRP#염증수치
                      <br />
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-sm" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {selectedType === "다중범위" && (
          <MultiRangeForm
            control={control}
            register={register}
            getValues={getValues}
            setValue={setValue}
          />
        )}

        {/* {selectedType === "선택" && <SelectForm />} */}
        {/* {selectedType === "다중선택" && <MultiSelectForm />} */}
        {/* {selectedType === "서술" && <DescriptionForm />} */}

        {/* 메모 */}
        <div className="col-span-2">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">메모</FormLabel>
                <FormControl>
                  <Textarea className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4 col-span-2">
          <Button className="font-semibold mt-4 w-full" disabled={isSubmitting}>
            검사 등록
            <AiOutlineLoading3Quarters
              className={cn("ml-2", isSubmitting ? "animate-spin" : "hidden")}
            />
          </Button>
          <Button
            type="button"
            className="font-semibold mt-4 w-full"
            disabled={isSubmitting}
            variant="outline"
            onClick={() => setOpen(false)}
          >
            취소
            <AiOutlineLoading3Quarters
              className={cn("ml-2", isSubmitting ? "animate-spin" : "hidden")}
            />
          </Button>
        </div>
      </form>
    </Form>
  );
}
