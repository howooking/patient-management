import { create } from "zustand";

interface HospitalState {
  hospital?: string | null;
  setHospital: (hospital: string | null | undefined) => void;
}

export const useHospital = create<HospitalState>()((set) => ({
  hospital: undefined,
  setHospital: (hospital) => set(() => ({ hospital })),
}));
