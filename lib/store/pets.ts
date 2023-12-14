import { Pet } from "@/types/type";
import { create } from "zustand";

type PetState = {
  selectedPet?: Pet;
  setSelectedPet: (pet: Pet) => void;
};

export const useSelectedPet = create<PetState>()((set) => ({
  selectedPet: undefined,
  setSelectedPet: (pet) => set(() => ({ selectedPet: pet })),
}));
