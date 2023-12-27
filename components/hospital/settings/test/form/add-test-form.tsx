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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegCircleQuestion } from "react-icons/fa6";
import * as z from "zod";
import MultiRangeForm from "./multi-range-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

export const TEST_CATEGORY = [
  "혈액",
  "소변",
  "바이탈",
  "신체검사",
  "관절검사",
  "신경계검사",
  "안과",
  "치과",
  "방사선",
  "복부초음파",
  "심장초음파",
  "세포",
  "병리",
  "조영검사",
  "CT",
  "MRI",
] as const;

export const TEST_TYPE = ["다중범위", "선택", "다중선택", "서술"] as const;

export const addTestFormSchema = z.object({
  type: z.enum(TEST_TYPE, {
    required_error: "검사 타입을 선택해주세요.",
  }),
  category: z.enum(TEST_CATEGORY, {
    required_error: "검사 카테고리를 선택해주세요.",
  }),
  name: z.string({ required_error: "원내검사명을 입력해주세요." }),
  original_name: z.string({ required_error: "본래의 검사명을 입력해주세요." }),

  multiRange: z.array(
    z.object({
      species: z.enum(["canine", "feline", "both"]),
      age: z.string().optional(),

      ranges: z.array(
        z.object({
          ge: z.string().optional(),
          gt: z.string().optional(),
          lt: z.string().optional(),
          le: z.string().optional(),
          interpretation: z.string().optional(),
          diagnosis: z.string().optional(),
          description: z.string().optional(),
        })
      ),
    })
  ),

  memo: z.string().optional(),
});

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

  const onSubmit = (data: z.infer<typeof addTestFormSchema>) =>
    console.log("data", data);

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
            name="memo"
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
