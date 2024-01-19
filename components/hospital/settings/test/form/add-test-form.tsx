import FormTooltip from "@/components/common/form-tooltip";
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
import { toast } from "@/components/ui/use-toast";
import {
  TEST_CATEGORY,
  TEST_TYPE,
  TestCategoryEnum,
  TestTypeEnum,
} from "@/constants/selects";
import useCurrentHospitalId from "@/hooks/useCurrentHospital";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { addTestFormSchema } from "@/lib/zod/form-schemas";
import { type TestSet } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import * as z from "zod";
import { type TestTableColumn } from "../table/columns";
import MultiRangeForm from "./multi-range-form";
import MultiSelectForm from "./multi-select-form";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  edit?: boolean;
  test?: TestTableColumn;
  testDetail?: TestSet[];
  copy?: boolean;
};

export default function AddTestForm({
  setOpen,
  edit,
  test,
  testDetail,
  copy,
}: Props) {
  const form = useForm<z.infer<typeof addTestFormSchema>>({
    resolver: zodResolver(addTestFormSchema),
    defaultValues: {
      multiRange: [
        {
          species: "canine",
          ranges: [
            {
              gt: "",
              ge: "",
              lt: "",
              le: "",
              diagnosis: "",
              description: "",
              interpretation: "",
            },
          ],
        },
      ],
      multiSelect: [
        {
          species: "canine",
          selects: [
            {
              select_value: "",
              description: "",
              diagnosis: "",
              interpretation: "",
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
    if (edit) {
      setValue("category", test?.category as TestCategoryEnum);
      setValue("description", test?.description!);
      setValue("name", test?.name!);
      setValue("original_name", test?.original_name!);
      setValue("tag", test?.tag!);
      setValue("type", test?.type! as TestTypeEnum);
      setValue("unit", test?.unit!);
    }
  }, [
    edit,
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

  const [isSubmitting, setIsSubmitting] = useState(false);
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

    setIsSubmitting(true);

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
    if (type === "선택" || type === "다중선택") {
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
    setIsSubmitting(false);
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
                <FormTooltip title="cPL키트검사, cPL-vcheck 종류 상관없이 모두 cPL" />
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
                <FormTooltip title="CRP-vcheck, CRP-fuji / cPL-IDEXX키트, cPL-vcheck" />
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
                <FormTooltip title="#CRP#염증수치" />
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

        <div className="flex gap-4 col-span-2 pt-4">
          <Button className="w-full" disabled={isSubmitting} type="submit">
            {edit && !copy ? "검사 수정" : "검사 등록"}
            <AiOutlineLoading3Quarters
              className={cn("ml-2", isSubmitting ? "animate-spin" : "hidden")}
            />
          </Button>
          <Button
            type="button"
            className="w-full"
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
