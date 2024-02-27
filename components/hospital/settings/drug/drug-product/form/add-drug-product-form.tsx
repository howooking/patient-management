import FormTooltip from "@/components/common/form-tooltip";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { DRUG_PRODUCT_TYPE, DrugProductTypeEnum } from "@/constants/selects";
import useCurrentHospitalId from "@/hooks/useCurrentHospital";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { addDrugProductFormSchema } from "@/lib/zod/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import * as z from "zod";
import { DrugProductTableColumn } from "../table/columns";

type Props = {
  drugs: { id: string; name: string }[];
  setOpen: Dispatch<SetStateAction<boolean>>;
  edit?: boolean;
  drugProduct?: DrugProductTableColumn;
  copy?: boolean;
};

export default function AddDrugProductForm({
  drugs,
  setOpen,
  edit,
  drugProduct,
  copy,
}: Props) {
  const form = useForm<z.infer<typeof addDrugProductFormSchema>>({
    resolver: zodResolver(addDrugProductFormSchema),
  });
  const { control, handleSubmit, setValue } = form;

  useEffect(() => {
    if (edit) {
      setValue("company", drugProduct?.company!);
      setValue("description", drugProduct?.description!);
      setValue("name", drugProduct?.name!);
      setValue("drug_id", drugProduct?.drug_id!);
      setValue("mass_unit", drugProduct?.mass_unit!);
      setValue("volume", drugProduct?.volume!);
      setValue("unit", drugProduct?.unit!);
      setValue("type", drugProduct?.type! as DrugProductTypeEnum);
      setValue("price", drugProduct?.price!);
      setValue("tag", drugProduct?.tag!);
    }
  }, [
    drugProduct?.company,
    drugProduct?.description,
    drugProduct?.drug_id,
    drugProduct?.mass_unit,
    drugProduct?.name,
    drugProduct?.price,
    drugProduct?.tag,
    drugProduct?.type,
    drugProduct?.unit,
    drugProduct?.volume,
    edit,
    setValue,
  ]);

  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const hospitalId = useCurrentHospitalId();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (values: z.infer<typeof addDrugProductFormSchema>) => {
    const {
      drug_id,
      name,
      mass_unit,
      description,
      type,
      company,
      unit,
      price,
      tag,
      volume,
    } = values;

    setIsSubmitting(true);
    if (!edit || copy) {
      const { error: drugsError } = await supabase
        .from("drug_products")
        .insert({
          hos_id: hospitalId,
          name,
          description,
          company,
          drug_id,
          mass_unit,
          price,
          tag,
          type,
          unit,
          volume,
        });

      if (drugsError) {
        toast({
          variant: "destructive",
          title: drugsError.message,
          description: "관리자에게 문의하세요",
        });
        return;
      }
    }

    if (edit && !copy) {
      await supabase
        .from("drug_products")
        .update({
          name,
          description,
          company,
          drug_id,
          mass_unit,
          price,
          tag,
          type,
          unit,
          volume,
        })
        .match({ drug_product_id: drugProduct?.drug_product_id });
    }

    toast({
      title:
        edit && !copy ? "제품이 수정되었습니다." : "제품이 등록되었습니다.",
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
        {/* 원료 선택 */}
        <FormField
          control={form.control}
          name="drug_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-sm font-semibold flex items-center gap-2">
                원료명*
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? drugs?.find((drug) => drug.id === field.value)?.name
                        : "약물원료 선택"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                  <Command>
                    <CommandInput placeholder="원료명 검색" className="h-9" />
                    <CommandEmpty>No drugs found.</CommandEmpty>
                    <CommandGroup>
                      {drugs?.map((drug) => (
                        <CommandItem
                          value={drug.name}
                          key={drug.id}
                          onSelect={() => {
                            form.setValue("drug_id", drug.id);
                          }}
                        >
                          {drug.name}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              drug.id === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* 제품명 */}
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold flex items-center gap-2">
                제품명*
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-sm" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* type */}
        <FormField
          control={control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">제품타입*</FormLabel>
              <Select
                onValueChange={(selectd) => {
                  field.onChange(selectd);
                }}
                defaultValue={edit ? drugProduct?.type! : field.value}
              >
                <FormControl>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="타입 선택" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {DRUG_PRODUCT_TYPE.map((category) => (
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

        {/* 태그 */}
        <FormField
          control={control}
          name="tag"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-end">
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

        {/* volue */}
        <FormField
          control={control}
          name="volume"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold flex items-center gap-2">
                volume(한글명?)
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-sm" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* unit */}
        <FormField
          control={control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold flex items-center gap-2">
                단위
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-sm" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* mass_unit */}
        <FormField
          control={control}
          name="mass_unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold flex items-center gap-2">
                mass unit(한글명?)
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-sm" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* 제약회사 */}
        <FormField
          control={control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold flex items-center gap-2">
                제약회사
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-sm" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* 가격 */}
        <FormField
          control={control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold flex items-center gap-2">
                가격
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-sm" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* 제품설명 */}
        <div className="col-span-2">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">
                  제품설명
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    {...field}
                    placeholder="냉장보관, 희석 후 2주 내 사용 등..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4 col-span-2 pt-4">
          <Button className="w-full" disabled={isSubmitting}>
            {edit && !copy ? "제품 수정" : "제품 등록"}
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
