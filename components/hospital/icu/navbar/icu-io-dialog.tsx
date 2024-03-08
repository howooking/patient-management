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
import { calculateAge, cn } from "@/lib/utils";
import { Pet } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { ko } from "date-fns/locale";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { PiCat, PiDog } from "react-icons/pi";
import { z } from "zod";
import { VetsOptions } from "../../topbar/pet-dialog/search-tab";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import useCurrentHospitalId from "@/hooks/useCurrentHospital";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  tag: z.string({ required_error: "입원사유를 #로 입력해주세요" }),
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
  main_vet: z.string({ required_error: "주치의를 선택해주세요." }),
  sub_vet: z.string().optional(),
  caution: z.string(),
  group: z.string({ required_error: "과목을 선택해주세요." }),
});

export default function IcuIoDialog({
  pet,
  vetOptions,
}: {
  pet: Pet;
  vetOptions: VetsOptions;
}) {
  const hos_id = useCurrentHospitalId();

  const [ioDialogOpen, setIoDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { caution, date, group, main_vet, tag, sub_vet } = values;

    setIsSubmitting(true);
    try {
      // in_and_out 차트 삽입
      const { data, error: ioError } = await supabase
        .from("in_and_out")
        .insert({
          group,
          hos_id,
          pet_id: pet.pet_id,
          tag,
          in_date: date.from.toDateString(),
          out_due_date: date.to.toDateString(),
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
      const { error: icuChartError } = await supabase.from("icu_chart").insert({
        io_id: data?.io_id!,
        hos_id,
        pet_id: pet.pet_id,
        caution,
        main_vet,
        sub_vet,
        tag,
      });

      if (icuChartError) {
        toast({
          variant: "destructive",
          title: icuChartError.message,
          description: "관리자에게 문의하세요",
        });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setIoDialogOpen(false);
    }
  };

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

            {/* 과목 */}
            <FormField
              control={form.control}
              name="group"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold flex items-center gap-2">
                    과목*
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    // defaultValue={edit ? feed?.type : field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="text-sm h-8">
                        <SelectValue placeholder="과목 선택" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="text-sm">
                      <SelectItem value={"internal"}>내과</SelectItem>
                      <SelectItem value={"surgery"}>외과</SelectItem>
                      <SelectItem value={"hotel"}>호텔링</SelectItem>
                      <SelectItem value={"daily"}>검사대기</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 주의사항 */}
            <FormField
              control={form.control}
              name="caution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold flex items-center gap-2">
                    주의사항
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-8 text-sm"
                      placeholder="물림 주의, 뛰처나옴 주의 등..."
                    />
                  </FormControl>

                  <FormMessage className="text-xs" />
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
