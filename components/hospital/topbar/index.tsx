import { Button } from "@/components/ui/button";
import { IoChatboxOutline, IoNotificationsOutline } from "react-icons/io5";
import PetDialog from "./pet-dialog";
import SelectedPet from "./selected-pet";
import SettingButton from "./setting-button";

export default function TopBar() {
  return (
    <nav className=" bg-background shadow-sm sticky top-0">
      <div className="flex justify-between items-center px-6 py-2">
        <div>
          <SelectedPet />
        </div>
        <div className="flex items-center gap-2">
          <PetDialog />

          <PetDialog search />

          <Button size="icon" variant="ghost" className="rounded-full">
            <IoChatboxOutline size={20} />
          </Button>

          <Button size="icon" variant="ghost" className="rounded-full">
            <IoNotificationsOutline size={20} />
          </Button>

          <SettingButton />
        </div>
      </div>
    </nav>
  );
}
