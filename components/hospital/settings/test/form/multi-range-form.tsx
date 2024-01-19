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
import { addTestFormSchema } from "@/lib/zod/form-schemas";
import { type TestSet } from "@/types/type";
import { useEffect } from "react";
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
import { SPECIES } from "@/constants/selects";

type Props = {
  testDetail?: TestSet[];
  edit?: boolean;
  control: Control<z.infer<typeof addTestFormSchema>>;
  register: UseFormRegister<z.infer<typeof addTestFormSchema>>;
  setValue: UseFormSetValue<z.infer<typeof addTestFormSchema>>;
  getValues: UseFormGetValues<z.infer<typeof addTestFormSchema>>;
};

export default function MultiRangeForm({
  testDetail,
  edit,
  control,
  register,
  setValue,
  getValues,
}: Props) {
  const { fields, remove } = useFieldArray({
    control,
    name: "multiRange",
  });

  useEffect(() => {
    if (edit && testDetail) {
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
            className="border p-2 rounded-md grid grid-cols-2 gap-2 relative"
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
                      age_min: getValues("multiRange")[0].age_min,
                      age_max: getValues("multiRange")[0].age_max,
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
            <div className="flex gap-2">
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
                        className="flex gap-3"
                      >
                        {SPECIES.map((species) => (
                          <FormItem
                            className="flex items-center space-x-1 space-y-0 text-sm"
                            key={species}
                          >
                            <FormControl>
                              <RadioGroupItem value={species} />
                            </FormControl>
                            <FormLabel>{species}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`multiRange.${index}.reference_range`}
                render={() => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-sm font-semibold">
                      참고범위 (최소값~최대값)
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
            </div>

            <div className="flex gap-2">
              <FormField
                control={control}
                name={`multiRange.${index}.age_min`}
                render={() => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      연령
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="이상"
                        className="h-8 text-sm"
                        {...register(`multiRange.${index}.age_min`)}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`multiRange.${index}.age_max`}
                render={() => (
                  <FormItem className="flex items-end">
                    <FormControl>
                      <Input
                        placeholder="이하"
                        className="h-8 text-sm"
                        {...register(`multiRange.${index}.age_max`)}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <Ranges nestIndex={index} control={control} register={register} />
          </div>
        );
      })}
    </div>
  );
}
