/* eslint-disable unused-imports/no-unused-vars */
import { DateRange } from "react-day-picker";
import { create } from "zustand";

type IcuMonthRange = {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
};

export const useIcuSearchRange = create<IcuMonthRange>()((set) => ({
  date: {
    from: undefined,
    to: undefined,
  },
  setDate: (date) => set(() => ({ date: { from: date?.from, to: date?.to } })),
}));
