import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addTestFormSchema } from "@/lib/zod/form-schemas";
import { Control, UseFormRegister, useFieldArray } from "react-hook-form";
import { LuMinus, LuPlus } from "react-icons/lu";
import * as z from "zod";

export default function Selects({
  nestIndex,
  control,
  register,
}: {
  nestIndex: number;
  control: Control<z.infer<typeof addTestFormSchema>>;
  register: UseFormRegister<z.infer<typeof addTestFormSchema>>;
}) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `multiSelect.${nestIndex}.selects`,
  });

  return (
    <div className="col-span-2 space-y-1">
      {fields.map((item, k) => {
        return (
          <div key={item.id} className="grid grid-cols-2 gap-2">
            <div className="flex gap-1">
              <Input
                className="h-8 text-sm"
                {...register(
                  `multiSelect.${nestIndex}.selects.${k}.select_value`
                )}
                placeholder="선택지"
              />

              <Input
                className="h-8 text-sm"
                {...register(
                  `multiSelect.${nestIndex}.selects.${k}.interpretation`
                )}
                placeholder="해석"
              />
            </div>
            <div className="flex gap-1 items-center">
              <Input
                className="h-8 text-sm"
                {...register(`multiSelect.${nestIndex}.selects.${k}.diagnosis`)}
                placeholder="진단"
              />
              <Input
                className="h-8 text-sm"
                {...register(
                  `multiSelect.${nestIndex}.selects.${k}.description`
                )}
                placeholder="설명"
              />
              <div className="flex-1 w-20 flex gap-1">
                <Button
                  type="button"
                  onClick={() => remove(k)}
                  size="icon"
                  disabled={k === 0}
                  className="rounded-full w-4 h-4"
                >
                  <LuMinus />
                </Button>

                <Button
                  type="button"
                  onClick={() =>
                    append({
                      select_value: undefined,
                      description: undefined,
                      diagnosis: undefined,
                      interpretation: undefined,
                    })
                  }
                  size="icon"
                  className="rounded-full w-4 h-4"
                >
                  <LuPlus />
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
