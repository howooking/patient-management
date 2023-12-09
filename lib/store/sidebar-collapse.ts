import { create } from "zustand";

type SidebarState = {
  collapse: boolean;
  setCollapse: (collapse: boolean) => void;
};

export const useSidebarCollapse = create<SidebarState>()((set) => ({
  collapse: false,
  setCollapse: (collapse) => set(() => ({ collapse })),
}));
