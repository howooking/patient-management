import { create } from "zustand";

type SelectedIcuChart = {
  selectedIcuChartId: number | undefined;
  // eslint-disable-next-line unused-imports/no-unused-vars
  setSelectedIcuChartId: (id: number) => void;
};

export const useSelectedIchChart = create<SelectedIcuChart>()((set) => ({
  selectedIcuChartId: undefined,
  setSelectedIcuChartId: (id: number) =>
    set(() => ({ selectedIcuChartId: id })),
}));
