/* eslint-disable unused-imports/no-unused-vars */
import { addMonths, subMonths } from "date-fns";
import { DateRange } from "react-day-picker";
import { create } from "zustand";

type IcuMonthRange = {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
};

export const useIcuSearchRange = create<IcuMonthRange>()((set) => ({
  date: {
    from: subMonths(new Date(), 1),
    to: addMonths(new Date(), 1),
  },
  setDate: (date) => set(() => ({ date: { from: date?.from, to: date?.to } })),
}));
