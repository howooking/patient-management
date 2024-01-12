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
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { addTestFormSchema } from "@/lib/zod/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegCircleQuestion } from "react-icons/fa6";
import * as z from "zod";
import MultiRangeForm from "./multi-range-form";
import {
  TEST_CATEGORY,
  TEST_TYPE,
  TestCategory,
  TestType,
} from "@/constants/selects";
import MultiSelectForm from "./multi-select-form";
import { TestTableColum } from "../table/columns";
import { TestSet } from "@/types/type";
import useCurrentHospitalId from "@/hooks/useCurrentHospital";

export default function AddTestForm({
  setOpen,
  edit,
  test,
  testDetail,
  copy,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  edit?: boolean;
  test?: TestTableColum;
  testDetail?: TestSet[];
  copy?: boolean;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof addTestFormSchema>>({
    resolver: zodResolver(addTestFormSchema),
    defaultValues: {
      multiRange: [
        {
          species: "canine",
          ranges: [
            {
              gt: undefined,
              ge: undefined,
              lt: undefined,
              le: undefined,
              diagnosis: undefined,
              description: undefined,
              interpretation: undefined,
            },
          ],
        },
      ],
      multiSelect: [
        {
          species: "canine",
          selects: [
            {
              select_value: undefined,
              description: undefined,
              diagnosis: undefined,
              interpretation: undefined,
            },
          ],
        },
      ],
    },
  });
  const { control, register, handleSubmit, getValues, setValue } = form;

  const [selectedType, setSelectedType] = useState<string | undefined>(
    edit ? test?.type! : undefined
  );

  useEffect(() => {
    setValue("category", test?.category as TestCategory);
    setValue("description", test?.description!);
    setValue("name", test?.name!);
    setValue("original_name", test?.original_name!);
    setValue("tag", test?.tag!);
    setValue("type", test?.type! as TestType);
    setValue("unit", test?.unit!);
  }, [
    setValue,
    test?.category,
    test?.description,
    test?.name,
    test?.original_name,
    test?.tag,
    test?.type,
    test?.unit,
  ]);

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
      multiSelect,
      description,
    } = values;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    setIsSubmitting(true);

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

      // multi range
      if (type === "범위") {
        for (let i = 0; i < multiRange.length; i++) {
          const age_min = multiRange[i].age_min;
          const age_max = multiRange[i].age_max;
          const species = multiRange[i].species;
          const reference_range = multiRange[i].reference_range;

          for (let j = 0; j < multiRange[i].ranges.length; j++) {
            const { description, diagnosis, ge, gt, interpretation, le, lt } =
              multiRange[i].ranges[j];
            const { error: testSetError } = await supabase
              .from("test_set")
              .insert({
                test_id: testsId,
                age_min,
                age_max,
                species,
                reference_range,
                description,
                diagnosis,
                interpretation,
                ge,
                gt,
                le,
                lt,
                order: j,
              });

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
      }

      //  select
      if (type === "선택") {
        for (let i = 0; i < multiSelect.length; i++) {
          const age_min = multiSelect[i].age_min;
          const age_max = multiSelect[i].age_max;
          const species = multiSelect[i].species;
          const reference_range = multiSelect[i].reference_range;

          for (let j = 0; j < multiSelect[i].selects.length; j++) {
            const { description, diagnosis, interpretation, select_value } =
              multiSelect[i].selects[j];
            const { error: testSetError } = await supabase
              .from("test_set")
              .insert({
                test_id: testsId,
                age_min,
                age_max,
                species,
                reference_range,
                select_value,
                description,
                diagnosis,
                interpretation,
                order: j,
              });

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
      }

      // 수정인 경우 원본 test를 삭제
      if (edit && !copy) {
        await supabase.from("tests").delete().match({ test_id: test?.test_id });
      }

      toast({
        title:
          edit && !copy ? "검사가 수정되었습니다." : "검사가 등록되었습니다.",
      });
      router.refresh();
      setOpen(false);

      return;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error, "error while adding or editing test");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                {/* <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger tabIndex={-1} type="button">
                      <FaRegCircleQuestion className="opacity-50" />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      범위 : APL, 47미만 낮음, 정상 밤위 47 ~ 254, 254이상 높음
                      <br />
                      선택 : 키트검사 양성/음성
                      <br />
                      다중선택 : 변상태 혈변 & 점액변 & 설사
                      <br />
                      서술 : 혈액 도말 검사
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider> */}
              </FormLabel>
              <FormControl>
                <RadioGroup
                  disabled={edit}
                  onValueChange={(selectd) => {
                    field.onChange(selectd);
                    setSelectedType(selectd);
                  }}
                  defaultValue={edit ? test?.type! : field.value}
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
                defaultValue={edit ? test?.category! : field.value}
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
          name="original_name"
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
          name="name"
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
                검사 단위
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

        {selectedType === "범위" && (
          <MultiRangeForm
            testDetail={testDetail}
            edit={edit}
            control={control}
            register={register}
            getValues={getValues}
            setValue={setValue}
          />
        )}

        {(selectedType === "선택" || selectedType === "다중선택") && (
          <MultiSelectForm
            testDetail={testDetail}
            edit={edit}
            control={control}
            register={register}
            getValues={getValues}
            setValue={setValue}
          />
        )}

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
            {edit && !copy ? "검사 수정" : "검사 등록"}
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
          </Button>
        </div>
      </form>
    </Form>
  );
}
