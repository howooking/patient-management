/* eslint-disable unused-imports/no-unused-vars */
import { Pet } from "@/types/type";
import { create } from "zustand";

type PetState = {
  selectedPet: Pet | null;
  setSelectedPet: (pet: Pet | null) => void;
};

export const useSelectedPet = create<PetState>()((set) => ({
  selectedPet: null,
  setSelectedPet: (pet) => set(() => ({ selectedPet: pet })),
}));
