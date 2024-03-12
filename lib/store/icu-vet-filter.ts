/* eslint-disable unused-imports/no-unused-vars */
import { create } from "zustand";

type IcuVetFilter = {
  vet: string;
  setVet: (vet: string) => void;
};

export const useIcuVetFilter = create<IcuVetFilter>()((set) => ({
  vet: "0",
  setVet: (vet) => set(() => ({ vet })),
}));
