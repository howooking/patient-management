import { create } from "zustand";

type SelectedIcuChart = {
  selectedIcuIoId: number | undefined;
  // eslint-disable-next-line unused-imports/no-unused-vars
  setSelectedIcuIoId: (id?: number) => void;
};

export const useSelectedIcuIo = create<SelectedIcuChart>()((set) => ({
  selectedIcuIoId: undefined,
  setSelectedIcuIoId: (id?: number) => set(() => ({ selectedIcuIoId: id })),
}));
