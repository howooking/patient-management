import { Button } from "@/components/ui/button";
import { IoChatboxOutline, IoNotificationsOutline } from "react-icons/io5";
import PetDialog from "./pet-dialog";
import SelectedPet from "./selected-pet";
import { Pet } from "@/types/type";

export default function TopBar({ pets }: { pets: Pet[] }) {
  return (
    <nav className="bg-background border-b border-input sticky top-0 z-40">
      <div className="flex justify-between items-center px-6 py-2">
        <div>
          <SelectedPet />
        </div>
        <div className="flex items-center gap-2">
          <PetDialog />

          <PetDialog search pets={pets} />

          <Button size="icon" variant="ghost" className="rounded-full">
            <IoChatboxOutline size={20} />
          </Button>

          <Button size="icon" variant="ghost" className="rounded-full">
            <IoNotificationsOutline size={20} />
          </Button>
        </div>
      </div>
    </nav>
  );
}
