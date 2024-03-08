import { create } from "zustand";

type DateState = {
  selectedDate: Date;
  // eslint-disable-next-line unused-imports/no-unused-vars
  setSelectedDate: (date?: Date) => void;
};

export const useSelectedDate = create<DateState>()((set) => ({
  selectedDate: new Date(),
  setSelectedDate: (newDate) => set(() => ({ selectedDate: newDate })),
}));
