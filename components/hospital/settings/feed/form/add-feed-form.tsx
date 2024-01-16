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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegCircleQuestion } from "react-icons/fa6";
import * as z from "zod";
import { FeedTableColumn } from "../table/columns";

export const addFeedFormSchema = z.object({
  name: z.string({ required_error: "사료명을 입력해주세요." }),
  price: z.string().optional(),
  tag: z.string({ required_error: "사료명을 입력해주세요." }),
  type: z.enum(["wet", "dry", "liquid", "half-dry"], {
    required_error: "사료명을 입력해주세요.",
  }),
  calory: z.string({ required_error: "칼로리를 입력해주세요." }),
  volume: z.string({ required_error: "사료 용량을 입력해주세요." }),
  unit: z.string({ required_error: "사료단위를 입력해주세요." }),
  species: z.enum(["canine", "feline", "both"], {
    required_error: "사료명을 입력해주세요.",
  }),
  description: z.string().optional(),
});

export default function AddFeedForm({
  setOpen,
  edit,
  feed,
  copy,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  edit?: boolean;
  feed?: FeedTableColumn;
  copy?: boolean;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof addFeedFormSchema>>({
    resolver: zodResolver(addFeedFormSchema),
  });
  const { control, register, handleSubmit, getValues, setValue } = form;

  useEffect(() => {
    setValue("calory", feed?.calory!);
    setValue("description", feed?.description!);
    setValue("name", feed?.name!);
    setValue("price", feed?.price!);
    setValue("price", feed?.price!);
    setValue("species", feed?.species as "canine" | "feline" | "both");
    setValue("tag", feed?.tag!);
    setValue("type", feed?.type! as "wet" | "dry" | "liquid" | "half-dry");
    setValue("unit", feed?.unit!);
    setValue("volume", feed?.volume!);
  }, [
    feed?.calory,
    feed?.description,
    feed?.name,
    feed?.price,
    feed?.species,
    feed?.tag,
    feed?.type,
    feed?.unit,
    feed?.volume,
    setValue,
  ]);

  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const hospitalId = useCurrentHospitalId();

  const onSubmit = async (values: z.infer<typeof addFeedFormSchema>) => {
    const {
      type,
      name,
      unit,
      tag,
      description,
      calory,
      species,
      volume,
      price,
    } = values;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    setIsSubmitting(true);

    const { error: feedError } = await supabase
      .from("feeds")
      .insert({
        hos_id: hospitalId,
        species,
        calory,
        description,
        name,
        price,
        tag,
        type,
        unit,
        volume,
      })
      .select()
      .single();

    if (feedError) {
      toast({
        variant: "destructive",
        title: feedError.message,
        description: "관리자에게 문의하세요",
      });
      return;
    }

    // 수정인 경우 원본 test를 삭제
    if (edit && !copy) {
      await supabase.from("feeds").delete().match({ id: feed?.id });
    }

    toast({
      title:
        edit && !copy ? "검사가 수정되었습니다." : "검사가 등록되었습니다.",
    });

    setIsSubmitting(false);
    router.refresh();
    setOpen(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        {/* 검사명 */}
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold flex items-center gap-2">
                사료명*
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
                태그*
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger tabIndex={-1} type="button">
                      <FaRegCircleQuestion className="opacity-50" />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      #힐스#로우펫#저지방
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

        {/* 종 */}
        <FormField
          control={form.control}
          name="species"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-sm font-semibold flex items-center gap-2">
                종
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={edit ? feed?.species : field.value}
                  className="flex space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="canine" />
                    </FormControl>
                    <FormLabel className="font-normal">강아지용</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="feline" />
                    </FormControl>
                    <FormLabel className="font-normal">고양이용</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="both" />
                    </FormControl>
                    <FormLabel className="font-normal">공용</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 사료 타입  */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold flex items-center gap-2">
                사료 타입*
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={edit ? feed?.type : field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="사료타입 선택" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="dry">건식</SelectItem>
                  <SelectItem value="wet">습식</SelectItem>
                  <SelectItem value="liquid">액체</SelectItem>
                  <SelectItem value="half-dry">반건식</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* 단위 */}
        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold flex items-center gap-2">
                단위*
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger tabIndex={-1} type="button">
                      <FaRegCircleQuestion className="opacity-50" />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      고체 g, 액체 ml
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={edit ? feed?.unit : field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="단위 선택" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="g">g</SelectItem>
                  <SelectItem value="ml">ml</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* 칼로리 */}
        <FormField
          control={control}
          name="calory"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold flex items-center gap-2">
                칼로리*
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger tabIndex={-1} type="button">
                      <FaRegCircleQuestion className="opacity-50" />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      1kcal/g인 경우 1
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

        {/* 양 */}
        <FormField
          control={control}
          name="volume"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold flex items-center gap-2">
                사료량*
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger tabIndex={-1} type="button">
                      <FaRegCircleQuestion className="opacity-50" />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      i/d low fat 3kg인 경우 3000
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

        {/* 메모 */}
        <div className="col-span-2">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">
                  사료 설명
                </FormLabel>
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
            {edit && !copy ? "사료 수정" : "사료 등록"}
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
