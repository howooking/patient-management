"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

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
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { CANINE_BREEDS, COLORS, FELINE_BREEDS } from "@/constants/breeds";
import { Calendar } from "@/components/ui/calendar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string(),
  hospitalPetId: z.string(),
  species: z.enum(["canine", "feline"]),
  breed: z.string({ required_error: "품종을 선택해주세요." }),
  gender: z.enum(["cm", "sf", "im", "if", "un"]),
  birth: z.date({ required_error: "출생일을 선택해주세요." }),
  color: z.string().optional(),
  microchipNumber: z.string().optional(),
  memo: z.string().optional(),
});

export default function AddPetTab({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const path = usePathname();
  const hospitalId = path.split("/")[2];

  const { toast } = useToast();

  const [breedOpen, setBreedOpen] = useState(false);

  const [selectiedSpecies, setSelectedSpecies] = useState<string | undefined>(
    undefined
  );
  const BREEDS = selectiedSpecies === "canine" ? CANINE_BREEDS : FELINE_BREEDS;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: undefined,
      hospitalPetId: undefined,
      species: undefined,
      breed: undefined,
      gender: undefined,
      birth: undefined,
      color: undefined,
      microchipNumber: undefined,
      memo: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`${location.origin}/api/new-pet`, {
        method: "POST",
        body: JSON.stringify({ ...values, hospitalId }),
      });

      if (response.ok) {
        toast({
          title: "환자가 등록되었습니다.",
        });
        router.refresh();
        setOpen(false);
        return;
      }

      const data = await response.json();
      toast({
        variant: "destructive",
        title: data.error,
        description: "관리자에게 문의하세요",
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error, "error while adding a new pet");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        {/* 이름 */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">이름*</FormLabel>
              <FormControl>
                <Input required {...field} className="h-8 text-sm" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* 번호 */}
        <FormField
          control={form.control}
          name="hospitalPetId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold flex items-center gap-2">
                환자 번호*
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger tabIndex={-1} type="button">
                      <FaRegCircleQuestion className="opacity-50" />
                    </TooltipTrigger>
                    <TooltipContent>
                      인투벳, 이프렌즈, 우리엔에 등록된 환자번호
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormLabel>
              <FormControl>
                <Input required {...field} className="h-8 text-sm" />
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
            <FormItem>
              <FormLabel className="text-sm font-semibold">종*</FormLabel>
              <Select
                onValueChange={(selectd) => {
                  field.onChange(selectd);
                  setSelectedSpecies(selectd);
                }}
                defaultValue={field.value}
                required
              >
                <FormControl>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="종을 선택해주세요." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="canine" className="text-xs">
                    Canine
                  </SelectItem>
                  <SelectItem value="feline" className="text-xs">
                    Feline
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* 품종 */}
        <FormField
          control={form.control}
          name="breed"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <label className="text-sm font-semibold my-[2px]">품종 *</label>
              <Popover open={breedOpen} onOpenChange={setBreedOpen}>
                <PopoverTrigger asChild disabled={!selectiedSpecies}>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-start text-sm font-normal h-8 border-input border relative",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? BREEDS.find((breed) => breed === field.value)
                        : selectiedSpecies
                        ? "품종을 선택해주세요."
                        : "종을 먼저선택해주세요."}
                      <CaretSortIcon className="h-4 w-4 shrink-0 opacity-50 absolute right-3" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent className="w-[224px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="품종 검색"
                      className="h-8 text-xs"
                    />
                    <CommandEmpty>해당 품종 검색 결과 없음.</CommandEmpty>
                    <ScrollArea className="h-[120px] overflow-auto">
                      <CommandGroup>
                        {BREEDS.map((breed) => (
                          <CommandItem
                            value={breed}
                            key={breed}
                            onSelect={() => {
                              form.setValue("breed", breed);
                              setBreedOpen(false);
                            }}
                            className="text-xs"
                          >
                            {breed}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                breed === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </ScrollArea>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* 성별 */}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">성별*</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                required
              >
                <FormControl>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="성별을 선택해주세요." />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value="cm" className="text-xs">
                    Castrated Male
                  </SelectItem>
                  <SelectItem value="sf" className="text-xs">
                    Spayed Female
                  </SelectItem>
                  <SelectItem value="im" className="text-xs">
                    Intact Male
                  </SelectItem>
                  <SelectItem value="if" className="text-xs">
                    Intact Female
                  </SelectItem>
                  <SelectItem value="un" className="text-xs">
                    Unknown
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* 출생일 */}
        <FormField
          control={form.control}
          name="birth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <label className="text-sm font-semibold my-[2px]">출생일 *</label>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left text-sm font-normal h-8 border border-input",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        <>{format(field.value, "yyyy-MM-dd")}</>
                      ) : (
                        <span>출생일을 선택해주세요.</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    className="text-sm"
                    styles={{
                      caption_label: { display: "none" },
                      dropdown_month: {},
                      dropdown_year: {},
                      button: { fontSize: 14 },
                    }}
                    captionLayout="dropdown-buttons"
                    fromYear={1990}
                    toYear={2023}
                    required
                    showOutsideDays
                    fixedWeeks
                    locale={ko}
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1990-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* 피모색 */}
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">피모 색</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="피모색을 선택해주세요." />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {COLORS.map((color) => (
                    <SelectItem
                      key={color.value}
                      value={color.value}
                      className="text-xs relative"
                    >
                      <div className="flex w-full items-center gap-2">
                        <div
                          className="h-4 w-8 border border-input rounded-md"
                          style={{
                            background:
                              color.hex.length === 1
                                ? color.hex[0]
                                : `linear-gradient(to right, ${color.hex.join(
                                    ", "
                                  )})`,
                          }}
                        />
                        <div>{color.label}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* 마이크로칩 번호*/}
        <FormField
          control={form.control}
          name="microchipNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">
                마이크로칩 번호
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-sm" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* 메모 */}
        <div className="col-span-2">
          <FormField
            control={form.control}
            name="memo"
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

        <Button
          type="submit"
          className="font-semibold mt-4 w-full col-span-2"
          disabled={isSubmitting}
        >
          환자 등록
          <AiOutlineLoading3Quarters
            className={cn("ml-2", isSubmitting ? "animate-spin" : "hidden")}
          />
        </Button>
      </form>
    </Form>
  );
}
