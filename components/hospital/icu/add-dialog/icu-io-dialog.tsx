import FormTooltip from "@/components/common/form-tooltip";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
import { toast } from "@/components/ui/use-toast";
import { DEFAULT_ICU_CHART } from "@/constants/default-icu-chart";
import useCurrentHospitalId from "@/hooks/useCurrentHospital";
import useHospitalGroup from "@/hooks/useHospitalGroup";
import { useSelectedDate } from "@/lib/store/selected-date";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { calculateAge, calculateDaysFromNow, cn } from "@/lib/utils";
import { addIcuChartFormSchema } from "@/lib/zod/form-schemas";
import { Pet } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { PiCat, PiDog } from "react-icons/pi";
import { z } from "zod";
import { VetsOptions } from "../../topbar/pet-dialog/search-tab";

export default function IcuIoDialog({
  pet,
  vetOptions,
  setDialogOpen,
}: {
  pet: Pet;
  vetOptions: VetsOptions;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const hos_id = useCurrentHospitalId();

  const [ioDialogOpen, setIoDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof addIcuChartFormSchema>>({
    resolver: zodResolver(addIcuChartFormSchema),
    defaultValues: {
      caution: pet.memo ?? "",
      date: {
        from: new Date(),
        to: new Date(),
      },
    },
  });

  const supabase = createSupabaseBrowserClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setSelectedDate } = useSelectedDate();

  const onSubmit = async (values: z.infer<typeof addIcuChartFormSchema>) => {
    const { caution, date, group, main_vet, tag, sub_vet } = values;
    setIsSubmitting(true);
    try {
      // in_and_out 차트 삽입
      const { data: inAndOut, error: ioError } = await supabase
        .from("in_and_out")
        .insert({
          group,
          hos_id,
          pet_id: pet.pet_id,
          tag,
          tag_age: calculateDaysFromNow(pet.birth),
          in_date: format(date.from, "yyyy-MM-dd"),
          out_due_date: format(date.to, "yyyy-MM-dd"),
        })
        .select("io_id")
        .single();

      if (ioError) {
        toast({
          variant: "destructive",
          title: ioError.message,
          description: "관리자에게 문의하세요",
        });
        return;
      }

      //icu_chart 삽입
      /// 삽입 전 최신 몸무게 조회
      const { data: weights, error: weightsError } = await supabase
        .from("test_results")
        .select("result, created_at")
        .match({
          pet_id: pet.pet_id,
          test_id: "5382e813-9151-4fcb-8e99-4de210f9e129", // 체중 test_id
        })
        .order("created_at", { ascending: false });

      if (weightsError) {
        toast({
          variant: "destructive",
          title: weightsError.message,
          description: "관리자에게 문의하세요",
        });
        return;
      }

      const { data: icuChart, error: icuChartError } = await supabase
        .from("icu_chart")
        .insert({
          io_id: inAndOut?.io_id!,
          hos_id,
          pet_id: pet.pet_id,
          caution,
          main_vet,
          sub_vet,
          target_date: format(date.from, "yyyy-MM-dd"),
          target_weight:
            weights.length !== 0
              ? `${weights[0].result}kg(${weights[0].created_at?.slice(0, 10)})`
              : null,
        })
        .select("icu_chart_id")
        .single();

      if (icuChartError) {
        toast({
          variant: "destructive",
          title: icuChartError.message,
          description: "관리자에게 문의하세요",
        });
        return;
      }

      // icu_chart_tx 기본 차트 삽입
      DEFAULT_ICU_CHART.forEach(async (element) => {
        const { error: icuChartTxError } = await supabase
          .from("icu_chart_tx")
          .insert({
            todo_name: element.todoName,
            todo_memo: element.todoMemo,
            data_type: element.dataType,
            io_id: inAndOut.io_id,
            icu_chart_id: icuChart.icu_chart_id,
          });

        if (icuChartTxError) {
          toast({
            variant: "destructive",
            title: icuChartTxError.message,
            description: "관리자에게 문의하세요",
          });
        }
      });

      // 날짜 이동
      setSelectedDate(format(date.from, "yyyy-MM-dd"));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setIoDialogOpen(false);
      setDialogOpen(false);
    }
  };

  const hospitalGroup = useHospitalGroup();

  return (
    <Dialog open={ioDialogOpen} onOpenChange={setIoDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="px-2 py-0.5 h-6">
          입원
        </Button>
      </DialogTrigger>

      <DialogContent>
        <div className="flex gap-2 items-center text-xl font-bold">
          <div className="flex items-center gap-1">
            {pet.species === "canine" ? (
              <PiDog size={30} />
            ) : (
              <PiCat size={30} />
            )}
            <p>
              {pet.name}({pet.breed})
            </p>
          </div>
          <div>{calculateAge(pet.birth)}</div>
          <div>{pet.gender.toUpperCase()}</div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            {/* 태그 */}
            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold flex items-center gap-2">
                    입원 사유*
                    <FormTooltip title="#으로 구분, 검색시 사용됩니다" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-8 text-sm"
                      placeholder="#중성화#발치"
                    />
                  </FormControl>

                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* 입원일 ~ 퇴원예정일 */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm font-semibold flex items-center gap-2">
                    입원일 ~ 퇴원예정일*
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "h-8 w-full text-sm justify-start text-left font-normal",
                          !field.value.from && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, "yyyy-MM-dd")} ~{" "}
                              {format(field.value.to, "MM-dd")}
                            </>
                          ) : (
                            format(field.value.from, "yyyy-MM-dd")
                          )
                        ) : (
                          <span>입퇴원일 선택</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        locale={ko}
                        initialFocus
                        mode="range"
                        defaultMonth={field.value.from}
                        selected={{
                          from: field.value.from,
                          to: field.value.to,
                        }}
                        onSelect={field.onChange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* 주치의 */}
            <FormField
              control={form.control}
              name="main_vet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold flex items-center gap-2">
                    주치의*
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    // defaultValue={edit ? feed?.type : field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="text-sm h-8">
                        <SelectValue placeholder="주치의 선택" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="text-sm">
                      {vetOptions?.map((option) => (
                        <SelectItem key={option.vet_id} value={option.vet_id}>
                          {option.nickname}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* 부주치의 */}
            <FormField
              control={form.control}
              name="sub_vet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold flex items-center gap-2">
                    부주치의
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    // defaultValue={edit ? feed?.type : field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="text-sm h-8">
                        <SelectValue placeholder="부주치의 선택" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="text-sm">
                      {vetOptions?.map((option) => (
                        <SelectItem key={option.vet_id} value={option.vet_id}>
                          {option.nickname}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 그룹 */}
            <FormField
              control={form.control}
              name="group"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold flex items-center gap-2">
                    그룹*
                    <FormTooltip title="스테프설정에서 그룹설정을 할 수 있습니다." />
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="text-sm h-8">
                        <SelectValue placeholder="그룹 선택" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="text-sm">
                      {hospitalGroup.map((element) => (
                        <SelectItem key={element} value={element}>
                          {element}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="col-span-2" disabled={isSubmitting}>
              입원
              <AiOutlineLoading3Quarters
                className={cn("ml-2", isSubmitting ? "animate-spin" : "hidden")}
              />
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
