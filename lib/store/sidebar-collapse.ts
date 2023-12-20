import { create } from "zustand";

type SidebarState = {
  collapse: boolean;
  // eslint-disable-next-line unused-imports/no-unused-vars
  setCollapse: (collapse: boolean) => void;
};

export const useSidebarCollapse = create<SidebarState>()((set) => ({
  collapse: false,
  setCollapse: (collapse) => set(() => ({ collapse })),
}));
