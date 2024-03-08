import { Pet } from "@/types/type";
import IcuDateSelector from "./icu-date-selector";
import IcuPatientsList from "./icu-patients-list";

export default function IcuNavbar({ pets }: { pets: Pet[] }) {
  return (
    <nav className="fixed flex items-center gap-4 bg-white z-50 top-2.5">
      <IcuDateSelector />

      <IcuPatientsList pets={pets} />
    </nav>
  );
}
