/* eslint-disable unused-imports/no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn, groupMultiRangeTests } from "@/lib/utils";
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  useFieldArray,
} from "react-hook-form";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import * as z from "zod";
import Ranges from "./ranges";
import { addTestFormSchema } from "@/lib/zod/form-schemas";
import { useEffect } from "react";
import { TestSet } from "@/types/type";

export default function MultiRangeForm({
  testDetail,
  edit,
  control,
  register,
  setValue,
  getValues,
}: {
  testDetail: TestSet[];
  edit?: boolean;
  control: Control<z.infer<typeof addTestFormSchema>>;
  register: UseFormRegister<z.infer<typeof addTestFormSchema>>;
  setValue: UseFormSetValue<z.infer<typeof addTestFormSchema>>;
  getValues: UseFormGetValues<z.infer<typeof addTestFormSchema>>;
}) {
  const { fields, remove } = useFieldArray({
    control,
    name: "multiRange",
  });

  useEffect(() => {
    if (edit) {
      const mappedData = groupMultiRangeTests(testDetail);
      setValue("multiRange", mappedData);
    }
  }, [edit, setValue, testDetail]);

  return (
    <div className="col-span-2 gap-2 flex flex-col">
      {fields.map((item, index) => {
        return (
          <div
            key={item.id}
            className="border p-2 rounded-md grid grid-cols-2 gap-4 relative"
          >
            <div className="absolute right-1 top-1">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => {
                  setValue("multiRange", [
                    ...(getValues().multiRange || []),
                    {
                      species: getValues("multiRange")[0].species,
                      age: getValues("multiRange")[0].age,
                      reference_range:
                        getValues("multiRange")[0].reference_range,
                      ranges: [
                        ...getValues("multiRange")[0].ranges.map((range) => ({
                          ge: range.ge,
                          gt: range.gt,
                          le: range.le,
                          lt: range.lt,
                          description: range.description,
                          interpretation: range.interpretation,
                          diagnosis: range.diagnosis,
                        })),
                      ],
                    },
                  ]);
                }}
                className="rounded-full"
              >
                <LuPlus />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => remove(index)}
                className={cn(index === 0 && "hidden", "rounded-full")}
              >
                <LuTrash2 />
              </Button>
            </div>

            {/* 종선택 */}
            <div className="flex gap-4">
              <FormField
                control={control}
                name={`multiRange.${index}.species`}
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-sm font-semibold">종*</FormLabel>
                    <FormControl>
                      <RadioGroup
                        {...register(`multiRange.${index}.species`)}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-6"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0 text-sm">
                          <FormControl>
                            <RadioGroupItem value="canine" />
                          </FormControl>
                          <FormLabel>개</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0 text-sm">
                          <FormControl>
                            <RadioGroupItem value="feline" />
                          </FormControl>
                          <FormLabel>고양이</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0 text-sm">
                          <FormControl>
                            <RadioGroupItem value="both" />
                          </FormControl>
                          <FormLabel>공통</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`multiRange.${index}.age`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      연령
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-8 text-sm"
                        {...register(`multiRange.${index}.age`)}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name={`multiRange.${index}.reference_range`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    정상 참고범위 (최소값~최대값)
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-8 text-sm"
                      {...register(`multiRange.${index}.reference_range`)}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Ranges nestIndex={index} control={control} register={register} />
          </div>
        );
      })}
    </div>
  );
}
