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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import useCurrentHospitalId from "@/hooks/useCurrentHospital";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { addDrugFormSchema } from "@/lib/zod/form-schemas";
import { type DrugDose } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import * as z from "zod";
import { DrugTableColumn } from "../table/columns";
import DrugDoses from "./drug-doses";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  edit?: boolean;
  drug?: DrugTableColumn;
  doseDetail?: DrugDose[];
  copy?: boolean;
};

export default function AddDrugForm({
  setOpen,
  edit,
  drug,
  doseDetail,
  copy,
}: Props) {
  const form = useForm<z.infer<typeof addDrugFormSchema>>({
    resolver: zodResolver(addDrugFormSchema),
    defaultValues: {
      drug_doses: [
        {
          route: "#IV",
          species: "canine",
        },
      ],
    },
  });
  const { control, register, handleSubmit, getValues, setValue } = form;

  useEffect(() => {
    if (edit) {
      setValue("description", drug?.description!);
      setValue("indication", drug?.indication!);
      setValue("name", drug?.name!);
      setValue("side_effect", drug?.side_effect!);
      setValue("classification", drug?.classification!);
      setValue("tag", drug?.tag!);
    }
  }, [
    drug?.classification,
    drug?.description,
    drug?.indication,
    drug?.name,
    drug?.side_effect,
    drug?.tag,
    edit,
    setValue,
  ]);

  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const hospitalId = useCurrentHospitalId();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: z.infer<typeof addDrugFormSchema>) => {
    const {
      drug_doses,
      indication,
      side_effect,
      name,
      tag,
      description,
      classification,
    } = values;

    setIsSubmitting(true);

    const { data: drugs, error: drugsError } = await supabase
      .from("drugs")
      .insert({
        hos_id: hospitalId,
        name,
        description,
        indication,
        side_effect,
        tag,
        classification,
      })
      .select()
      .single();

    if (drugsError) {
      toast({
        variant: "destructive",
        title: drugsError.message,
        description: "관리자에게 문의하세요",
      });
      return;
    }

    // drug_doses 삽입
    const drugId = drugs.id;

    for (let i = 0; i < drug_doses.length; i++) {
      const dose_unit = drug_doses[i].dose_unit;
      const bw_unit = drug_doses[i].bw_unit;
      const cri_unit = drug_doses[i].cri_unit;
      const default_dose = drug_doses[i].default_dose;
      const min_dose = drug_doses[i].min_dose;
      const max_dose = drug_doses[i].max_dose;
      const route = drug_doses[i].route;
      const species = drug_doses[i].species;
      const description = drug_doses[i].description;

      const { error: drugDosesError } = await supabase
        .from("drug_doses")
        .insert({
          drug_id: drugId,
          bw_unit,
          cri_unit,
          default_dose,
          min_dose,
          max_dose,
          species,
          route,
          dose_unit,
          description,
        });

      if (drugDosesError) {
        toast({
          variant: "destructive",
          title: drugDosesError.message,
          description: "관리자에게 문의하세요",
        });
        return;
      }
    }

    // 수정인 경우 원본 drug를 삭제
    if (edit && !copy) {
      await supabase.from("drugs").delete().match({ id: drug?.id });
    }
    toast({
      title:
        edit && !copy ? "약품이 수정되었습니다." : "약품이 등록되었습니다.",
    });
    setIsSubmitting(false);
    setOpen(false);
    router.refresh();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        {/* 약품명 */}
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold flex items-center gap-2">
                약품 원료명*
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
                태그(검색시 사용)
                <FormTooltip title="#furosemide#퓨로세마이드#lasix#라식스" />
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-sm" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* 적용증 */}
        <FormField
          control={control}
          name="indication"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">적용증</FormLabel>
              <FormControl>
                <Textarea {...field} className="h-8 text-sm" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* 부작용 */}
        <FormField
          control={control}
          name="side_effect"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-end">
              <FormLabel className="text-sm font-semibold flex items-center gap-2">
                부작용/금기
              </FormLabel>
              <FormControl>
                <Textarea {...field} className="h-8 text-sm" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* 약품설명 */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">약품설명</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 약품분류 */}
        <FormField
          control={form.control}
          name="classification"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-end">
              <FormLabel className="text-sm font-semibold flex items-center gap-2">
                약품 분류
                <FormTooltip title="#antibiotics#fluoroquinolone" />
              </FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DrugDoses
          doseDetail={doseDetail}
          edit={edit}
          control={control}
          register={register}
          getValues={getValues}
          setValue={setValue}
        />

        <div className="flex gap-4 col-span-2 pt-4">
          <Button className="w-full" disabled={isSubmitting}>
            {edit && !copy ? "약품원료 수정" : "약품원료 등록"}
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
