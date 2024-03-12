"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIcuSearchRange } from "@/lib/store/icu-search-range";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

export default function SearchRange() {
  const { date, setDate } = useIcuSearchRange();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal h-6",
            !date && "text-muted-foreground"
          )}
        >
          <MagnifyingGlassIcon className="mr-2" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "yyyy-MM-dd")} ~ {format(date.to, "MM-dd")}
              </>
            ) : (
              format(date.from, "yyyy-MM-dd")
            )
          ) : (
            <span>검색범위</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          locale={ko}
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
