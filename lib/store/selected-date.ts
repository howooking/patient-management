import { format } from "date-fns";
import { create } from "zustand";

type DateState = {
  selectedDate: string;
  // eslint-disable-next-line unused-imports/no-unused-vars
  setSelectedDate: (date?: string) => void;
};

export const useSelectedDate = create<DateState>()((set) => ({
  selectedDate: format(new Date(), "yyyy-MM-dd"),
  setSelectedDate: (newDate) => set(() => ({ selectedDate: newDate })),
}));
