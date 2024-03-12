/* eslint-disable unused-imports/no-unused-vars */
import { create } from "zustand";

type IcuGroupFilter = {
  group?: string;
  setGroup: (group: string) => void;
};

export const useIcuGroupFilter = create<IcuGroupFilter>()((set) => ({
  group: "그룹",
  setGroup: (group) => set(() => ({ group })),
}));
