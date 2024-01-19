/* eslint-disable unused-imports/no-unused-vars */
import FormTooltip from "@/components/common/form-tooltip";
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
import { cn } from "@/lib/utils";
import { addDrugFormSchema } from "@/lib/zod/form-schemas";
import { type DrugDose } from "@/types/type";
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

type Props = {
  doseDetail?: DrugDose[];
  edit?: boolean;
  control: Control<z.infer<typeof addDrugFormSchema>>;
  register: UseFormRegister<z.infer<typeof addDrugFormSchema>>;
  setValue: UseFormSetValue<z.infer<typeof addDrugFormSchema>>;
  getValues: UseFormGetValues<z.infer<typeof addDrugFormSchema>>;
};

export default function DrugDoses({
  doseDetail,
  edit,
  control,
  register,
  setValue,
  getValues,
}: Props) {
  const { fields, remove } = useFieldArray({
    control,
    name: "drug_doses",
  });

  useEffect(() => {
    if (edit && doseDetail) {
      if (doseDetail) {
        setValue("drug_doses", [
          {
            route: "",
            species: "canine",
            bw_unit: "",
            cri_unit: "",
            default_dose: "",
            description: "",
            dose_unit: "",
            max_dose: "",
            min_dose: "",
          },
        ]);
      }
      // @ts-expect-error
      setValue("drug_doses", doseDetail);
    }
  }, [doseDetail, edit, setValue]);

  return (
    <div className="col-span-2 gap-2 flex flex-col">
      {fields.map((item, index) => {
        return (
          <div
            key={item.id}
            className="border p-2 rounded-md grid grid-cols-3 gap-2 relative"
          >
            <div className="absolute right-1 top-1">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => {
                  setValue("drug_doses", [
                    ...(getValues().drug_doses || []),
                    {
                      species: getValues("drug_doses")[0].species,
                      route: getValues("drug_doses")[0].route,
                      dose_unit: getValues("drug_doses")[0].dose_unit,
                      description: getValues("drug_doses")[0].description,
                      bw_unit: getValues("drug_doses")[0].bw_unit,
                      cri_unit: getValues("drug_doses")[0].cri_unit,
                      default_dose: getValues("drug_doses")[0].default_dose,
                      max_dose: getValues("drug_doses")[0].max_dose,
                      min_dose: getValues("drug_doses")[0].min_dose,
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
            <FormField
              control={control}
              name={`drug_doses.${index}.species`}
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="text-sm font-semibold">종*</FormLabel>
                  <FormControl>
                    <RadioGroup
                      {...register(`drug_doses.${index}.species`)}
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
              name={`drug_doses.${index}.route`}
              render={({ field }) => (
                <FormItem className="flex flex-col justify-end">
                  <FormLabel className="text-sm font-semibold flex items-center gap-2">
                    투약경로*
                    <FormTooltip title="#IV#SC#IM#ID#PO#patch#etc" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-8 text-sm"
                      {...register(`drug_doses.${index}.route`)}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`drug_doses.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">설명</FormLabel>
                  <FormControl>
                    <Input
                      className="h-8 text-sm"
                      {...register(`drug_doses.${index}.description`)}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`drug_doses.${index}.dose_unit`}
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-sm font-semibold">
                    용량 단위
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="mg"
                      className="h-8 text-sm"
                      {...register(`drug_doses.${index}.dose_unit`)}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`drug_doses.${index}.bw_unit`}
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-sm font-semibold">
                    체중 단위
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="kg"
                      className="h-8 text-sm"
                      {...register(`drug_doses.${index}.bw_unit`)}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`drug_doses.${index}.cri_unit`}
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-sm font-semibold">
                    CRI 단위
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="mg/kg/min"
                      className="h-8 text-sm"
                      {...register(`drug_doses.${index}.cri_unit`)}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`drug_doses.${index}.default_dose`}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-sm font-semibold">
                    기본 용량
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="4"
                      className="h-8 text-sm"
                      {...register(`drug_doses.${index}.default_dose`)}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`drug_doses.${index}.min_dose`}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-sm font-semibold">
                    최소 용량
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="2"
                      className="h-8 text-sm"
                      {...register(`drug_doses.${index}.min_dose`)}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`drug_doses.${index}.max_dose`}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-sm font-semibold">
                    최대용량
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="6"
                      className="h-8 text-sm"
                      {...register(`drug_doses.${index}.max_dose`)}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
        );
      })}
    </div>
  );
}
