"use client";

import { Button } from "@/components/ui/button";
import { useSelectedDate } from "@/lib/store/selected-date";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import IcuDatePicker from "./icu-date-picker";
import { format } from "date-fns";

export default function IcuDateSelector() {
  const { selectedDate, setSelectedDate } = useSelectedDate();

  const incrementDate = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(format(newDate, "yyyy-MM-dd"));
  };

  const decrementDate = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(format(newDate, "yyyy-MM-dd"));
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={decrementDate}
        size="icon"
        variant="outline"
        className="w-6 h-6 rounded-full"
      >
        <ArrowLeftIcon />
      </Button>

      <div className="flex items-center gap-1">
        <span className="text-sm w-20">{selectedDate}</span>
        <IcuDatePicker />
      </div>

      <Button
        onClick={incrementDate}
        size="icon"
        variant="outline"
        className="w-6 h-6 rounded-full"
      >
        <ArrowRightIcon />
      </Button>
    </div>
  );
}
